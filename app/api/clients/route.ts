import { NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { authenticateUser, errorResponse, successResponse } from "@/lib/api/auth"
import { createClientSchema, validateData } from "@/lib/api/validation"
import { readRateLimit, apiRateLimit, rateLimitByUser } from "@/lib/api/rate-limit"
import { sanitizeObject, validatePayloadSize, containsForbiddenWords } from "@/lib/api/sanitize"
import { logSuccess, logFailure } from "@/lib/api/audit-log"
import { applySecurityHeaders } from "@/lib/api/security-headers"

export async function GET(request: NextRequest) {
  const rateLimitResult = await readRateLimit(request)
  if (rateLimitResult) return applySecurityHeaders(rateLimitResult, true)

  const userOrError = await authenticateUser(request)
  if (userOrError instanceof Response) {
    await logFailure(null, "read", "clients", "Não autenticado", undefined, request)
    return applySecurityHeaders(userOrError, true)
  }

  const userRateLimit = rateLimitByUser(userOrError.id)
  if (userRateLimit) return applySecurityHeaders(userRateLimit, true)

  try {
    const supabase = await createClient()
    
    const { data: clients, error } = await supabase
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[SECURITY] Error fetching clients:", error)
      await logFailure(userOrError.id, "read", "clients", error.message, undefined, request)
      return applySecurityHeaders(errorResponse("Erro ao buscar clientes", 500), true)
    }

    await logSuccess(userOrError.id, "read", "clients", null, { count: clients?.length || 0 }, request)
    return applySecurityHeaders(successResponse(clients), true)
  } catch (error) {
    console.error("[SECURITY] Unexpected error:", error)
    await logFailure(userOrError.id, "read", "clients", error instanceof Error ? error.message : "Erro desconhecido", undefined, request)
    return applySecurityHeaders(errorResponse("Erro interno do servidor", 500), true)
  }
}

export async function POST(request: NextRequest) {
  const rateLimitResult = await apiRateLimit(request)
  if (rateLimitResult) return applySecurityHeaders(rateLimitResult, true)

  const userOrError = await authenticateUser(request)
  if (userOrError instanceof Response) {
    await logFailure(null, "create", "clients", "Não autenticado", undefined, request)
    return applySecurityHeaders(userOrError, true)
  }

  const userRateLimit = rateLimitByUser(userOrError.id, { windowMs: 60000, maxRequests: 30 })
  if (userRateLimit) return applySecurityHeaders(userRateLimit, true)

  try {
    const body = await request.json()
    validatePayloadSize(body, 50)

    const sanitizedBody = sanitizeObject(body)

    if (sanitizedBody.name && containsForbiddenWords(sanitizedBody.name)) {
      await logFailure(userOrError.id, "create", "clients", "Conteúdo proibido detectado", { name: sanitizedBody.name }, request)
      return applySecurityHeaders(errorResponse("Conteúdo inválido detectado", 400), true)
    }

    const validatedData = validateData(createClientSchema, sanitizedBody)
    
    const supabase = await createClient()
    
    const { data: client, error } = await supabase
      .from("clients")
      .insert({
        ...validatedData,
        created_by: userOrError.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error("[SECURITY] Error creating client:", error)
      await logFailure(userOrError.id, "create", "clients", error.message, validatedData, request)
      return applySecurityHeaders(errorResponse("Erro ao criar cliente", 500), true)
    }

    await logSuccess(userOrError.id, "create", "clients", client.id, { name: client.name }, request)
    return applySecurityHeaders(successResponse(client, 201), true)
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
    
    await logFailure(userOrError.id, "create", "clients", errorMessage, undefined, request)
    return applySecurityHeaders(errorResponse(errorMessage, statusCode), true)
  }
}
