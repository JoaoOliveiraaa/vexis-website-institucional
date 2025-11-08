import { NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { authenticateUser, errorResponse, successResponse, canModifyResource } from "@/lib/api/auth"
import { updateLeadSchema, validateData } from "@/lib/api/validation"
import { readRateLimit, apiRateLimit } from "@/lib/api/rate-limit"
import { sanitizeObject, validatePayloadSize, sanitizeUuid } from "@/lib/api/sanitize"
import { logSuccess, logFailure } from "@/lib/api/audit-log"
import { applySecurityHeaders } from "@/lib/api/security-headers"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const rateLimitResult = await readRateLimit(request)
  if (rateLimitResult) return applySecurityHeaders(rateLimitResult, true)

  const userOrError = await authenticateUser(request)
  if (userOrError instanceof Response) {
    await logFailure(null, "read", "leads", "Não autenticado", undefined, request)
    return applySecurityHeaders(userOrError, true)
  }

  try {
    const { id } = await params
    sanitizeUuid(id)
    
    const supabase = await createClient()
    
    const { data: lead, error } = await supabase
      .from("leads")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        await logFailure(userOrError.id, "read", "leads", "Lead não encontrado", { id }, request)
        return applySecurityHeaders(errorResponse("Lead não encontrado", 404), true)
      }
      console.error("[SECURITY] Error fetching lead:", error)
      await logFailure(userOrError.id, "read", "leads", error.message, { id }, request)
      return applySecurityHeaders(errorResponse("Erro ao buscar lead", 500), true)
    }

    await logSuccess(userOrError.id, "read", "leads", id, { name: lead.name }, request)
    return applySecurityHeaders(successResponse(lead), true)
  } catch (error) {
    console.error("[SECURITY] Unexpected error:", error)
    await logFailure(userOrError.id, "read", "leads", error instanceof Error ? error.message : "Erro desconhecido", undefined, request)
    return applySecurityHeaders(errorResponse("Erro interno do servidor", 500), true)
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const rateLimitResult = await apiRateLimit(request)
  if (rateLimitResult) return applySecurityHeaders(rateLimitResult, true)

  const userOrError = await authenticateUser(request)
  if (userOrError instanceof Response) {
    await logFailure(null, "update", "leads", "Não autenticado", undefined, request)
    return applySecurityHeaders(userOrError, true)
  }

  try {
    const { id } = await params
    sanitizeUuid(id)

    const body = await request.json()
    validatePayloadSize(body, 50)

    const sanitizedBody = sanitizeObject(body)
    const validatedData = validateData(updateLeadSchema, { ...sanitizedBody, id })
    
    const supabase = await createClient()
    
    const { data: existingLead, error: fetchError } = await supabase
      .from("leads")
      .select("created_by")
      .eq("id", id)
      .single()

    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        await logFailure(userOrError.id, "update", "leads", "Lead não encontrado", { id }, request)
        return applySecurityHeaders(errorResponse("Lead não encontrado", 404), true)
      }
      console.error("[SECURITY] Error fetching lead:", fetchError)
      await logFailure(userOrError.id, "update", "leads", fetchError.message, { id }, request)
      return applySecurityHeaders(errorResponse("Erro ao verificar lead", 500), true)
    }

    if (!canModifyResource(userOrError, existingLead.created_by)) {
      await logFailure(userOrError.id, "update", "leads", "Sem permissão", { id }, request)
      return applySecurityHeaders(errorResponse("Sem permissão para modificar este lead", 403), true)
    }

    const { data: lead, error: updateError } = await supabase
      .from("leads")
      .update({
        ...validatedData,
        id: undefined,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (updateError) {
      console.error("[SECURITY] Error updating lead:", updateError)
      await logFailure(userOrError.id, "update", "leads", updateError.message, validatedData, request)
      return applySecurityHeaders(errorResponse("Erro ao atualizar lead", 500), true)
    }

    await logSuccess(userOrError.id, "update", "leads", id, { name: lead.name }, request)
    return applySecurityHeaders(successResponse(lead), true)
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
    
    await logFailure(userOrError.id, "update", "leads", errorMessage, undefined, request)
    return applySecurityHeaders(errorResponse(errorMessage, statusCode), true)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const rateLimitResult = await apiRateLimit(request)
  if (rateLimitResult) return applySecurityHeaders(rateLimitResult, true)

  const userOrError = await authenticateUser(request)
  if (userOrError instanceof Response) {
    await logFailure(null, "delete", "leads", "Não autenticado", undefined, request)
    return applySecurityHeaders(userOrError, true)
  }

  try {
    const { id } = await params
    sanitizeUuid(id)
    
    const supabase = await createClient()
    
    const { data: existingLead, error: fetchError } = await supabase
      .from("leads")
      .select("created_by, name")
      .eq("id", id)
      .single()

    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        await logFailure(userOrError.id, "delete", "leads", "Lead não encontrado", { id }, request)
        return applySecurityHeaders(errorResponse("Lead não encontrado", 404), true)
      }
      console.error("[SECURITY] Error fetching lead:", fetchError)
      await logFailure(userOrError.id, "delete", "leads", fetchError.message, { id }, request)
      return applySecurityHeaders(errorResponse("Erro ao verificar lead", 500), true)
    }

    if (!canModifyResource(userOrError, existingLead.created_by)) {
      await logFailure(userOrError.id, "delete", "leads", "Sem permissão", { id, name: existingLead.name }, request)
      return applySecurityHeaders(errorResponse("Sem permissão para deletar este lead", 403), true)
    }

    const { error: deleteError } = await supabase.from("leads").delete().eq("id", id)

    if (deleteError) {
      console.error("[SECURITY] Error deleting lead:", deleteError)
      await logFailure(userOrError.id, "delete", "leads", deleteError.message, { id }, request)
      return applySecurityHeaders(errorResponse("Erro ao deletar lead", 500), true)
    }

    await logSuccess(userOrError.id, "delete", "leads", id, { name: existingLead.name }, request)
    return applySecurityHeaders(successResponse({ message: "Lead deletado com sucesso" }), true)
  } catch (error) {
    console.error("[SECURITY] Unexpected error:", error)
    await logFailure(userOrError.id, "delete", "leads", error instanceof Error ? error.message : "Erro desconhecido", undefined, request)
    return applySecurityHeaders(errorResponse("Erro interno do servidor", 500), true)
  }
}
