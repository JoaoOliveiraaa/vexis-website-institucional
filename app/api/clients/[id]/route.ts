import { NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { authenticateUser, errorResponse, successResponse, canModifyResource } from "@/lib/api/auth"
import { updateClientSchema, validateData } from "@/lib/api/validation"
import { readRateLimit, apiRateLimit } from "@/lib/api/rate-limit"
import { sanitizeObject, validatePayloadSize, sanitizeUuid } from "@/lib/api/sanitize"
import { logSuccess, logFailure } from "@/lib/api/audit-log"
import { applySecurityHeaders } from "@/lib/api/security-headers"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const rateLimitResult = await readRateLimit(request)
  if (rateLimitResult) return applySecurityHeaders(rateLimitResult, true)

  const userOrError = await authenticateUser(request)
  if (userOrError instanceof Response) {
    await logFailure(null, "read", "clients", "Não autenticado", undefined, request)
    return applySecurityHeaders(userOrError, true)
  }

  try {
    const { id } = await params
    sanitizeUuid(id)
    
    const supabase = await createClient()
    
    const { data: client, error } = await supabase
      .from("clients")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        await logFailure(userOrError.id, "read", "clients", "Cliente não encontrado", { id }, request)
        return applySecurityHeaders(errorResponse("Cliente não encontrado", 404), true)
      }
      console.error("[SECURITY] Error fetching client:", error)
      await logFailure(userOrError.id, "read", "clients", error.message, { id }, request)
      return applySecurityHeaders(errorResponse("Erro ao buscar cliente", 500), true)
    }

    await logSuccess(userOrError.id, "read", "clients", id, { name: client.name }, request)
    return applySecurityHeaders(successResponse(client), true)
  } catch (error) {
    console.error("[SECURITY] Unexpected error:", error)
    await logFailure(userOrError.id, "read", "clients", error instanceof Error ? error.message : "Erro desconhecido", undefined, request)
    return applySecurityHeaders(errorResponse("Erro interno do servidor", 500), true)
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const rateLimitResult = await apiRateLimit(request)
  if (rateLimitResult) return applySecurityHeaders(rateLimitResult, true)

  const userOrError = await authenticateUser(request)
  if (userOrError instanceof Response) {
    await logFailure(null, "update", "clients", "Não autenticado", undefined, request)
    return applySecurityHeaders(userOrError, true)
  }

  try {
    const { id } = await params
    sanitizeUuid(id)

    const body = await request.json()
    validatePayloadSize(body, 50)

    const sanitizedBody = sanitizeObject(body)
    const validatedData = validateData(updateClientSchema, { ...sanitizedBody, id })
    
    const supabase = await createClient()
    
    const { data: existingClient, error: fetchError } = await supabase
      .from("clients")
      .select("created_by")
      .eq("id", id)
      .single()

    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        await logFailure(userOrError.id, "update", "clients", "Cliente não encontrado", { id }, request)
        return applySecurityHeaders(errorResponse("Cliente não encontrado", 404), true)
      }
      console.error("[SECURITY] Error fetching client:", fetchError)
      await logFailure(userOrError.id, "update", "clients", fetchError.message, { id }, request)
      return applySecurityHeaders(errorResponse("Erro ao verificar cliente", 500), true)
    }

    if (!canModifyResource(userOrError, existingClient.created_by)) {
      await logFailure(userOrError.id, "update", "clients", "Sem permissão", { id }, request)
      return applySecurityHeaders(errorResponse("Sem permissão para modificar este cliente", 403), true)
    }

    const { data: client, error: updateError } = await supabase
      .from("clients")
      .update({
        ...validatedData,
        id: undefined,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (updateError) {
      console.error("[SECURITY] Error updating client:", updateError)
      await logFailure(userOrError.id, "update", "clients", updateError.message, validatedData, request)
      return applySecurityHeaders(errorResponse("Erro ao atualizar cliente", 500), true)
    }

    await logSuccess(userOrError.id, "update", "clients", id, { name: client.name }, request)
    return applySecurityHeaders(successResponse(client), true)
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
    
    await logFailure(userOrError.id, "update", "clients", errorMessage, undefined, request)
    return applySecurityHeaders(errorResponse(errorMessage, statusCode), true)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const rateLimitResult = await apiRateLimit(request)
  if (rateLimitResult) return applySecurityHeaders(rateLimitResult, true)

  const userOrError = await authenticateUser(request)
  if (userOrError instanceof Response) {
    await logFailure(null, "delete", "clients", "Não autenticado", undefined, request)
    return applySecurityHeaders(userOrError, true)
  }

  try {
    const { id } = await params
    sanitizeUuid(id)
    
    const supabase = await createClient()
    
    const { data: existingClient, error: fetchError } = await supabase
      .from("clients")
      .select("created_by, name")
      .eq("id", id)
      .single()

    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        await logFailure(userOrError.id, "delete", "clients", "Cliente não encontrado", { id }, request)
        return applySecurityHeaders(errorResponse("Cliente não encontrado", 404), true)
      }
      console.error("[SECURITY] Error fetching client:", fetchError)
      await logFailure(userOrError.id, "delete", "clients", fetchError.message, { id }, request)
      return applySecurityHeaders(errorResponse("Erro ao verificar cliente", 500), true)
    }

    if (!canModifyResource(userOrError, existingClient.created_by)) {
      await logFailure(userOrError.id, "delete", "clients", "Sem permissão", { id, name: existingClient.name }, request)
      return applySecurityHeaders(errorResponse("Sem permissão para deletar este cliente", 403), true)
    }

    const { error: deleteError } = await supabase.from("clients").delete().eq("id", id)

    if (deleteError) {
      console.error("[SECURITY] Error deleting client:", deleteError)
      await logFailure(userOrError.id, "delete", "clients", deleteError.message, { id }, request)
      return applySecurityHeaders(errorResponse("Erro ao deletar cliente", 500), true)
    }

    await logSuccess(userOrError.id, "delete", "clients", id, { name: existingClient.name }, request)
    return applySecurityHeaders(successResponse({ message: "Cliente deletado com sucesso" }), true)
  } catch (error) {
    console.error("[SECURITY] Unexpected error:", error)
    await logFailure(userOrError.id, "delete", "clients", error instanceof Error ? error.message : "Erro desconhecido", undefined, request)
    return applySecurityHeaders(errorResponse("Erro interno do servidor", 500), true)
  }
}
