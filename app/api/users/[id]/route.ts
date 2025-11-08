import { NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { authenticateUser, errorResponse, successResponse, isAdmin } from "@/lib/api/auth"
import { updateUserSchema, validateData } from "@/lib/api/validation"
import { readRateLimit, apiRateLimit } from "@/lib/api/rate-limit"
import { sanitizeObject, validatePayloadSize, sanitizeUuid } from "@/lib/api/sanitize"
import { logSuccess, logFailure } from "@/lib/api/audit-log"
import { applySecurityHeaders } from "@/lib/api/security-headers"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const rateLimitResult = await readRateLimit(request)
  if (rateLimitResult) return applySecurityHeaders(rateLimitResult, true)

  const userOrError = await authenticateUser(request)
  if (userOrError instanceof Response) {
    await logFailure(null, "read", "profiles", "Não autenticado", undefined, request)
    return applySecurityHeaders(userOrError, true)
  }

  try {
    const { id } = await params
    sanitizeUuid(id)
    
    // Users can view their own profile or admin can view any profile
    if (userOrError.id !== id && !isAdmin(userOrError)) {
      await logFailure(userOrError.id, "read", "profiles", "Sem permissão", { targetUserId: id }, request)
      return applySecurityHeaders(errorResponse("Sem permissão para visualizar este perfil", 403), true)
    }
    
    const supabase = await createClient()
    
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        await logFailure(userOrError.id, "read", "profiles", "Perfil não encontrado", { id }, request)
        return applySecurityHeaders(errorResponse("Perfil não encontrado", 404), true)
      }
      console.error("[SECURITY] Error fetching profile:", error)
      await logFailure(userOrError.id, "read", "profiles", error.message, { id }, request)
      return applySecurityHeaders(errorResponse("Erro ao buscar perfil", 500), true)
    }

    await logSuccess(userOrError.id, "read", "profiles", id, { name: profile.full_name }, request)
    return applySecurityHeaders(successResponse(profile), true)
  } catch (error) {
    console.error("[SECURITY] Unexpected error:", error)
    await logFailure(userOrError.id, "read", "profiles", error instanceof Error ? error.message : "Erro desconhecido", undefined, request)
    return applySecurityHeaders(errorResponse("Erro interno do servidor", 500), true)
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const rateLimitResult = await apiRateLimit(request)
  if (rateLimitResult) return applySecurityHeaders(rateLimitResult, true)

  const userOrError = await authenticateUser(request)
  if (userOrError instanceof Response) {
    await logFailure(null, "update", "profiles", "Não autenticado", undefined, request)
    return applySecurityHeaders(userOrError, true)
  }

  try {
    const { id } = await params
    sanitizeUuid(id)

    // Users can update their own profile or admin can update any profile
    if (userOrError.id !== id && !isAdmin(userOrError)) {
      await logFailure(userOrError.id, "update", "profiles", "Sem permissão", { targetUserId: id }, request)
      return applySecurityHeaders(errorResponse("Sem permissão para modificar este perfil", 403), true)
    }

    const body = await request.json()
    validatePayloadSize(body, 50)

    const sanitizedBody = sanitizeObject(body)
    
    // Only admins can change roles
    if (sanitizedBody.role && !isAdmin(userOrError)) {
      await logFailure(userOrError.id, "update", "profiles", "Tentativa de alterar role sem permissão", { 
        targetUserId: id,
        attemptedRole: sanitizedBody.role 
      }, request)
      return applySecurityHeaders(errorResponse("Sem permissão para alterar role", 403), true)
    }

    const validatedData = validateData(updateUserSchema, { ...sanitizedBody, id })
    
    const supabase = await createClient()

    const { data: profile, error: updateError } = await supabase
      .from("profiles")
      .update({
        ...validatedData,
        id: undefined,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (updateError) {
      console.error("[SECURITY] Error updating profile:", updateError)
      await logFailure(userOrError.id, "update", "profiles", updateError.message, validatedData, request)
      return applySecurityHeaders(errorResponse("Erro ao atualizar perfil", 500), true)
    }

    await logSuccess(userOrError.id, "update", "profiles", id, { 
      name: profile.full_name,
      role: profile.role 
    }, request)
    return applySecurityHeaders(successResponse(profile), true)
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
    
    await logFailure(userOrError.id, "update", "profiles", errorMessage, undefined, request)
    return applySecurityHeaders(errorResponse(errorMessage, statusCode), true)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const rateLimitResult = await apiRateLimit(request)
  if (rateLimitResult) return applySecurityHeaders(rateLimitResult, true)

  const userOrError = await authenticateUser(request)
  if (userOrError instanceof Response) {
    await logFailure(null, "delete", "profiles", "Não autenticado", undefined, request)
    return applySecurityHeaders(userOrError, true)
  }

  try {
    const { id } = await params
    sanitizeUuid(id)
    
    // Only admins can delete user profiles
    if (!isAdmin(userOrError)) {
      await logFailure(userOrError.id, "delete", "profiles", "Sem permissão", { targetUserId: id }, request)
      return applySecurityHeaders(errorResponse("Sem permissão para deletar perfis", 403), true)
    }

    // Prevent admin from deleting themselves
    if (userOrError.id === id) {
      await logFailure(userOrError.id, "delete", "profiles", "Tentativa de auto-exclusão", { id }, request)
      return applySecurityHeaders(errorResponse("Você não pode deletar seu próprio perfil", 400), true)
    }
    
    const supabase = await createClient()
    
    const { data: existingProfile, error: fetchError } = await supabase
      .from("profiles")
      .select("full_name, email")
      .eq("id", id)
      .single()

    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        await logFailure(userOrError.id, "delete", "profiles", "Perfil não encontrado", { id }, request)
        return applySecurityHeaders(errorResponse("Perfil não encontrado", 404), true)
      }
      console.error("[SECURITY] Error fetching profile:", fetchError)
      await logFailure(userOrError.id, "delete", "profiles", fetchError.message, { id }, request)
      return applySecurityHeaders(errorResponse("Erro ao verificar perfil", 500), true)
    }

    const { error: deleteError } = await supabase.from("profiles").delete().eq("id", id)

    if (deleteError) {
      console.error("[SECURITY] Error deleting profile:", deleteError)
      await logFailure(userOrError.id, "delete", "profiles", deleteError.message, { id }, request)
      return applySecurityHeaders(errorResponse("Erro ao deletar perfil", 500), true)
    }

    await logSuccess(userOrError.id, "delete", "profiles", id, { 
      name: existingProfile.full_name,
      email: existingProfile.email 
    }, request)
    return applySecurityHeaders(successResponse({ message: "Perfil deletado com sucesso" }), true)
  } catch (error) {
    console.error("[SECURITY] Unexpected error:", error)
    await logFailure(userOrError.id, "delete", "profiles", error instanceof Error ? error.message : "Erro desconhecido", undefined, request)
    return applySecurityHeaders(errorResponse("Erro interno do servidor", 500), true)
  }
}
