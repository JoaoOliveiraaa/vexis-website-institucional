import { NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { authenticateUser, errorResponse, successResponse } from "@/lib/api/auth"
import { createFinancialRecordSchema, validateData } from "@/lib/api/validation"
import { readRateLimit, apiRateLimit, rateLimitByUser } from "@/lib/api/rate-limit"
import { sanitizeObject, validatePayloadSize, containsForbiddenWords } from "@/lib/api/sanitize"
import { logSuccess, logFailure } from "@/lib/api/audit-log"
import { applySecurityHeaders } from "@/lib/api/security-headers"

export async function GET(request: NextRequest) {
  const rateLimitResult = await readRateLimit(request)
  if (rateLimitResult) return applySecurityHeaders(rateLimitResult, true)

  const userOrError = await authenticateUser(request)
  if (userOrError instanceof Response) {
    await logFailure(null, "read", "financial_records", "Não autenticado", undefined, request)
    return applySecurityHeaders(userOrError, true)
  }

  const userRateLimit = rateLimitByUser(userOrError.id)
  if (userRateLimit) return applySecurityHeaders(userRateLimit, true)

  try {
    const supabase = await createClient()
    
    const { data: records, error } = await supabase
      .from("financial_records")
      .select("*")
      .order("date", { ascending: false })

    if (error) {
      console.error("[SECURITY] Error fetching financial records:", error)
      await logFailure(userOrError.id, "read", "financial_records", error.message, undefined, request)
      return applySecurityHeaders(errorResponse("Erro ao buscar registros financeiros", 500), true)
    }

    await logSuccess(userOrError.id, "read", "financial_records", null, { count: records?.length || 0 }, request)
    return applySecurityHeaders(successResponse(records), true)
  } catch (error) {
    console.error("[SECURITY] Unexpected error:", error)
    await logFailure(userOrError.id, "read", "financial_records", error instanceof Error ? error.message : "Erro desconhecido", undefined, request)
    return applySecurityHeaders(errorResponse("Erro interno do servidor", 500), true)
  }
}

export async function POST(request: NextRequest) {
  const rateLimitResult = await apiRateLimit(request)
  if (rateLimitResult) return applySecurityHeaders(rateLimitResult, true)

  const userOrError = await authenticateUser(request)
  if (userOrError instanceof Response) {
    await logFailure(null, "create", "financial_records", "Não autenticado", undefined, request)
    return applySecurityHeaders(userOrError, true)
  }

  const userRateLimit = rateLimitByUser(userOrError.id, { windowMs: 60000, maxRequests: 30 })
  if (userRateLimit) return applySecurityHeaders(userRateLimit, true)

  try {
    const body = await request.json()
    validatePayloadSize(body, 50)

    const sanitizedBody = sanitizeObject(body)

    if (sanitizedBody.description && containsForbiddenWords(sanitizedBody.description)) {
      await logFailure(userOrError.id, "create", "financial_records", "Conteúdo proibido detectado", { description: sanitizedBody.description }, request)
      return applySecurityHeaders(errorResponse("Conteúdo inválido detectado", 400), true)
    }

    const validatedData = validateData(createFinancialRecordSchema, sanitizedBody)
    
    const supabase = await createClient()
    
    const { data: record, error } = await supabase
      .from("financial_records")
      .insert({
        ...validatedData,
        created_by: userOrError.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error("[SECURITY] Error creating financial record:", error)
      await logFailure(userOrError.id, "create", "financial_records", error.message, validatedData, request)
      return applySecurityHeaders(errorResponse("Erro ao criar registro financeiro", 500), true)
    }

    await logSuccess(userOrError.id, "create", "financial_records", record.id, { 
      description: record.description,
      amount: record.amount 
    }, request)
    return applySecurityHeaders(successResponse(record, 201), true)
  } catch (error) {
    console.error("[SECURITY] Unexpected error:", error)
    
    let errorMessage = "Erro interno do servidor"
    let statusCode = 500

    if (error instanceof Error) {
      if (error.name === "ZodError") {
        errorMessage = error.message
        statusCode = 400
      } else if (error.message.includes("Payload muito grande")) {
        errorMessage = error.message
        statusCode = 413
      }
    }
    
    await logFailure(userOrError.id, "create", "financial_records", errorMessage, undefined, request)
    return applySecurityHeaders(errorResponse(errorMessage, statusCode), true)
  }
}
