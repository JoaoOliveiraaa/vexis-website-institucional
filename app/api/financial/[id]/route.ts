import { NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { authenticateUser, errorResponse, successResponse, canModifyResource } from "@/lib/api/auth"
import { updateFinancialRecordSchema, validateData } from "@/lib/api/validation"
import { readRateLimit, apiRateLimit } from "@/lib/api/rate-limit"
import { sanitizeObject, validatePayloadSize, sanitizeUuid } from "@/lib/api/sanitize"
import { logSuccess, logFailure } from "@/lib/api/audit-log"
import { applySecurityHeaders } from "@/lib/api/security-headers"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const rateLimitResult = await readRateLimit(request)
  if (rateLimitResult) return applySecurityHeaders(rateLimitResult, true)

  const userOrError = await authenticateUser(request)
  if (userOrError instanceof Response) {
    await logFailure(null, "read", "financial_records", "Não autenticado", undefined, request)
    return applySecurityHeaders(userOrError, true)
  }

  try {
    const { id } = await params
    sanitizeUuid(id)
    
    const supabase = await createClient()
    
    const { data: record, error } = await supabase
      .from("financial_records")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        await logFailure(userOrError.id, "read", "financial_records", "Registro não encontrado", { id }, request)
        return applySecurityHeaders(errorResponse("Registro financeiro não encontrado", 404), true)
      }
      console.error("[SECURITY] Error fetching financial record:", error)
      await logFailure(userOrError.id, "read", "financial_records", error.message, { id }, request)
      return applySecurityHeaders(errorResponse("Erro ao buscar registro financeiro", 500), true)
    }

    await logSuccess(userOrError.id, "read", "financial_records", id, { 
      description: record.description,
      amount: record.amount 
    }, request)
    return applySecurityHeaders(successResponse(record), true)
  } catch (error) {
    console.error("[SECURITY] Unexpected error:", error)
    await logFailure(userOrError.id, "read", "financial_records", error instanceof Error ? error.message : "Erro desconhecido", undefined, request)
    return applySecurityHeaders(errorResponse("Erro interno do servidor", 500), true)
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const rateLimitResult = await apiRateLimit(request)
  if (rateLimitResult) return applySecurityHeaders(rateLimitResult, true)

  const userOrError = await authenticateUser(request)
  if (userOrError instanceof Response) {
    await logFailure(null, "update", "financial_records", "Não autenticado", undefined, request)
    return applySecurityHeaders(userOrError, true)
  }

  try {
    const { id } = await params
    sanitizeUuid(id)

    const body = await request.json()
    validatePayloadSize(body, 50)

    const sanitizedBody = sanitizeObject(body)
    const validatedData = validateData(updateFinancialRecordSchema, { ...sanitizedBody, id })
    
    const supabase = await createClient()
    
    const { data: existingRecord, error: fetchError } = await supabase
      .from("financial_records")
      .select("created_by")
      .eq("id", id)
      .single()

    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        await logFailure(userOrError.id, "update", "financial_records", "Registro não encontrado", { id }, request)
        return applySecurityHeaders(errorResponse("Registro financeiro não encontrado", 404), true)
      }
      console.error("[SECURITY] Error fetching financial record:", fetchError)
      await logFailure(userOrError.id, "update", "financial_records", fetchError.message, { id }, request)
      return applySecurityHeaders(errorResponse("Erro ao verificar registro financeiro", 500), true)
    }

    if (!canModifyResource(userOrError, existingRecord.created_by)) {
      await logFailure(userOrError.id, "update", "financial_records", "Sem permissão", { id }, request)
      return applySecurityHeaders(errorResponse("Sem permissão para modificar este registro", 403), true)
    }

    const { data: record, error: updateError } = await supabase
      .from("financial_records")
      .update({
        ...validatedData,
        id: undefined,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (updateError) {
      console.error("[SECURITY] Error updating financial record:", updateError)
      await logFailure(userOrError.id, "update", "financial_records", updateError.message, validatedData, request)
      return applySecurityHeaders(errorResponse("Erro ao atualizar registro financeiro", 500), true)
    }

    await logSuccess(userOrError.id, "update", "financial_records", id, { 
      description: record.description,
      amount: record.amount 
    }, request)
    return applySecurityHeaders(successResponse(record), true)
  } catch (error) {
    console.error("[SECURITY] Unexpected error:", error)
    
    let errorMessage = "Erro interno do servidor"
    let statusCode = 500

    if (error instanceof Error) {
      if (error.name === "ZodError") {
        errorMessage = error.message
        statusCode = 400
      } else if (error.message.includes("UUID inválido")) {
        errorMessage = error.message
        statusCode = 400
      }
    }
    
    await logFailure(userOrError.id, "update", "financial_records", errorMessage, undefined, request)
    return applySecurityHeaders(errorResponse(errorMessage, statusCode), true)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const rateLimitResult = await apiRateLimit(request)
  if (rateLimitResult) return applySecurityHeaders(rateLimitResult, true)

  const userOrError = await authenticateUser(request)
  if (userOrError instanceof Response) {
    await logFailure(null, "delete", "financial_records", "Não autenticado", undefined, request)
    return applySecurityHeaders(userOrError, true)
  }

  try {
    const { id } = await params
    sanitizeUuid(id)
    
    const supabase = await createClient()
    
    const { data: existingRecord, error: fetchError } = await supabase
      .from("financial_records")
      .select("created_by, description, amount")
      .eq("id", id)
      .single()

    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        await logFailure(userOrError.id, "delete", "financial_records", "Registro não encontrado", { id }, request)
        return applySecurityHeaders(errorResponse("Registro financeiro não encontrado", 404), true)
      }
      console.error("[SECURITY] Error fetching financial record:", fetchError)
      await logFailure(userOrError.id, "delete", "financial_records", fetchError.message, { id }, request)
      return applySecurityHeaders(errorResponse("Erro ao verificar registro financeiro", 500), true)
    }

    if (!canModifyResource(userOrError, existingRecord.created_by)) {
      await logFailure(userOrError.id, "delete", "financial_records", "Sem permissão", { 
        id,
        description: existingRecord.description,
        amount: existingRecord.amount 
      }, request)
      return applySecurityHeaders(errorResponse("Sem permissão para deletar este registro", 403), true)
    }

    const { error: deleteError } = await supabase.from("financial_records").delete().eq("id", id)

    if (deleteError) {
      console.error("[SECURITY] Error deleting financial record:", deleteError)
      await logFailure(userOrError.id, "delete", "financial_records", deleteError.message, { id }, request)
      return applySecurityHeaders(errorResponse("Erro ao deletar registro financeiro", 500), true)
    }

    await logSuccess(userOrError.id, "delete", "financial_records", id, { 
      description: existingRecord.description,
      amount: existingRecord.amount 
    }, request)
    return applySecurityHeaders(successResponse({ message: "Registro financeiro deletado com sucesso" }), true)
  } catch (error) {
    console.error("[SECURITY] Unexpected error:", error)
    await logFailure(userOrError.id, "delete", "financial_records", error instanceof Error ? error.message : "Erro desconhecido", undefined, request)
    return applySecurityHeaders(errorResponse("Erro interno do servidor", 500), true)
  }
}
