import { NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { authenticateUser, errorResponse, successResponse, canModifyResource } from "@/lib/api/auth"
import { updateProjectSchema, validateData } from "@/lib/api/validation"
import { readRateLimit, apiRateLimit } from "@/lib/api/rate-limit"
import { sanitizeObject, validatePayloadSize, sanitizeUuid } from "@/lib/api/sanitize"
import { logSuccess, logFailure } from "@/lib/api/audit-log"
import { applySecurityHeaders } from "@/lib/api/security-headers"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const rateLimitResult = await readRateLimit(request)
  if (rateLimitResult) return applySecurityHeaders(rateLimitResult, true)

  const userOrError = await authenticateUser(request)
  if (userOrError instanceof Response) {
    await logFailure(null, "read", "projects", "Não autenticado", undefined, request)
    return applySecurityHeaders(userOrError, true)
  }

  try {
    const { id } = await params
    sanitizeUuid(id)
    
    const supabase = await createClient()
    
    const { data: project, error } = await supabase
      .from("projects")
      .select(`
        *,
        client:clients(id, name)
      `)
      .eq("id", id)
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        await logFailure(userOrError.id, "read", "projects", "Projeto não encontrado", { id }, request)
        return applySecurityHeaders(errorResponse("Projeto não encontrado", 404), true)
      }
      console.error("[SECURITY] Error fetching project:", error)
      await logFailure(userOrError.id, "read", "projects", error.message, { id }, request)
      return applySecurityHeaders(errorResponse("Erro ao buscar projeto", 500), true)
    }

    await logSuccess(userOrError.id, "read", "projects", id, { name: project.name }, request)
    return applySecurityHeaders(successResponse(project), true)
  } catch (error) {
    console.error("[SECURITY] Unexpected error:", error)
    await logFailure(userOrError.id, "read", "projects", error instanceof Error ? error.message : "Erro desconhecido", undefined, request)
    return applySecurityHeaders(errorResponse("Erro interno do servidor", 500), true)
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const rateLimitResult = await apiRateLimit(request)
  if (rateLimitResult) return applySecurityHeaders(rateLimitResult, true)

  const userOrError = await authenticateUser(request)
  if (userOrError instanceof Response) {
    await logFailure(null, "update", "projects", "Não autenticado", undefined, request)
    return applySecurityHeaders(userOrError, true)
  }

  try {
    const { id } = await params
    sanitizeUuid(id)

    const body = await request.json()
    validatePayloadSize(body, 50)

    const sanitizedBody = sanitizeObject(body)
    const validatedData = validateData(updateProjectSchema, { ...sanitizedBody, id })
    
    const supabase = await createClient()
    
    const { data: existingProject, error: fetchError } = await supabase
      .from("projects")
      .select("created_by")
      .eq("id", id)
      .single()

    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        await logFailure(userOrError.id, "update", "projects", "Projeto não encontrado", { id }, request)
        return applySecurityHeaders(errorResponse("Projeto não encontrado", 404), true)
      }
      console.error("[SECURITY] Error fetching project:", fetchError)
      await logFailure(userOrError.id, "update", "projects", fetchError.message, { id }, request)
      return applySecurityHeaders(errorResponse("Erro ao verificar projeto", 500), true)
    }

    if (!canModifyResource(userOrError, existingProject.created_by)) {
      await logFailure(userOrError.id, "update", "projects", "Sem permissão", { id }, request)
      return applySecurityHeaders(errorResponse("Sem permissão para modificar este projeto", 403), true)
    }

    const { data: project, error: updateError } = await supabase
      .from("projects")
      .update({
        ...validatedData,
        id: undefined,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (updateError) {
      console.error("[SECURITY] Error updating project:", updateError)
      await logFailure(userOrError.id, "update", "projects", updateError.message, validatedData, request)
      return applySecurityHeaders(errorResponse("Erro ao atualizar projeto", 500), true)
    }

    await logSuccess(userOrError.id, "update", "projects", id, { name: project.name }, request)
    return applySecurityHeaders(successResponse(project), true)
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
    
    await logFailure(userOrError.id, "update", "projects", errorMessage, undefined, request)
    return applySecurityHeaders(errorResponse(errorMessage, statusCode), true)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const rateLimitResult = await apiRateLimit(request)
  if (rateLimitResult) return applySecurityHeaders(rateLimitResult, true)

  const userOrError = await authenticateUser(request)
  if (userOrError instanceof Response) {
    await logFailure(null, "delete", "projects", "Não autenticado", undefined, request)
    return applySecurityHeaders(userOrError, true)
  }

  try {
    const { id } = await params
    sanitizeUuid(id)
    
    const supabase = await createClient()
    
    const { data: existingProject, error: fetchError } = await supabase
      .from("projects")
      .select("created_by, name")
      .eq("id", id)
      .single()

    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        await logFailure(userOrError.id, "delete", "projects", "Projeto não encontrado", { id }, request)
        return applySecurityHeaders(errorResponse("Projeto não encontrado", 404), true)
      }
      console.error("[SECURITY] Error fetching project:", fetchError)
      await logFailure(userOrError.id, "delete", "projects", fetchError.message, { id }, request)
      return applySecurityHeaders(errorResponse("Erro ao verificar projeto", 500), true)
    }

    if (!canModifyResource(userOrError, existingProject.created_by)) {
      await logFailure(userOrError.id, "delete", "projects", "Sem permissão", { id, name: existingProject.name }, request)
      return applySecurityHeaders(errorResponse("Sem permissão para deletar este projeto", 403), true)
    }

    const { error: deleteError } = await supabase.from("projects").delete().eq("id", id)

    if (deleteError) {
      console.error("[SECURITY] Error deleting project:", deleteError)
      await logFailure(userOrError.id, "delete", "projects", deleteError.message, { id }, request)
      return applySecurityHeaders(errorResponse("Erro ao deletar projeto", 500), true)
    }

    await logSuccess(userOrError.id, "delete", "projects", id, { name: existingProject.name }, request)
    return applySecurityHeaders(successResponse({ message: "Projeto deletado com sucesso" }), true)
  } catch (error) {
    console.error("[SECURITY] Unexpected error:", error)
    await logFailure(userOrError.id, "delete", "projects", error instanceof Error ? error.message : "Erro desconhecido", undefined, request)
    return applySecurityHeaders(errorResponse("Erro interno do servidor", 500), true)
  }
}
