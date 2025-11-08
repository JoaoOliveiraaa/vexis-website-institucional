import { NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { authenticateUser, errorResponse, successResponse, canModifyResource } from "@/lib/api/auth"
import { updateTaskSchema, validateData } from "@/lib/api/validation"
import { readRateLimit, apiRateLimit, rateLimitByUser } from "@/lib/api/rate-limit"
import { sanitizeObject, validatePayloadSize, sanitizeUuid } from "@/lib/api/sanitize"
import { logSuccess, logFailure } from "@/lib/api/audit-log"
import { applySecurityHeaders } from "@/lib/api/security-headers"

/**
 * GET /api/tasks/[id] - Get single task (WITH SECURITY)
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  // 1. Rate Limiting
  const rateLimitResult = await readRateLimit(request)
  if (rateLimitResult) return applySecurityHeaders(rateLimitResult, true)

  // 2. Authentication
  const userOrError = await authenticateUser(request)
  if (userOrError instanceof Response) {
    await logFailure(null, "read", "tasks", "Não autenticado", undefined, request)
    return applySecurityHeaders(userOrError, true)
  }

  try {
    const { id } = await params
    
    // 3. Validate UUID
    sanitizeUuid(id)
    
    const supabase = await createClient()
    
    const { data: task, error } = await supabase
      .from("tasks")
      .select(`
        *,
        assigned_to_profile:profiles!tasks_assigned_to_fkey(id, full_name),
        created_by_profile:profiles!tasks_created_by_fkey(id, full_name),
        project:projects(id, name)
      `)
      .eq("id", id)
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        await logFailure(userOrError.id, "read", "tasks", "Tarefa não encontrada", { id }, request)
        return applySecurityHeaders(errorResponse("Tarefa não encontrada", 404), true)
      }
      console.error("[SECURITY] Error fetching task:", error)
      await logFailure(userOrError.id, "read", "tasks", error.message, { id }, request)
      return applySecurityHeaders(errorResponse("Erro ao buscar tarefa", 500), true)
    }

    await logSuccess(userOrError.id, "read", "tasks", id, { title: task.title }, request)
    return applySecurityHeaders(successResponse(task), true)
  } catch (error) {
    console.error("[SECURITY] Unexpected error:", error)
    await logFailure(
      userOrError.id,
      "read",
      "tasks",
      error instanceof Error ? error.message : "Erro desconhecido",
      undefined,
      request
    )
    return applySecurityHeaders(errorResponse("Erro interno do servidor", 500), true)
  }
}

/**
 * PATCH /api/tasks/[id] - Update task (WITH SECURITY)
 */
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  // 1. Rate Limiting
  const rateLimitResult = await apiRateLimit(request)
  if (rateLimitResult) return applySecurityHeaders(rateLimitResult, true)

  // 2. Authentication
  const userOrError = await authenticateUser(request)
  if (userOrError instanceof Response) {
    await logFailure(null, "update", "tasks", "Não autenticado", undefined, request)
    return applySecurityHeaders(userOrError, true)
  }

  // 3. User rate limit
  const userRateLimit = rateLimitByUser(userOrError.id, { windowMs: 60000, maxRequests: 30 })
  if (userRateLimit) return applySecurityHeaders(userRateLimit, true)

  try {
    const { id } = await params
    
    // 4. Validate UUID
    sanitizeUuid(id)

    // 5. Parse and validate payload
    const body = await request.json()
    validatePayloadSize(body, 50)

    // 6. Sanitize
    const sanitizedBody = sanitizeObject(body)

    // 7. Validate with Zod
    const validatedData = validateData(updateTaskSchema, { ...sanitizedBody, id })
    
    const supabase = await createClient()
    
    // 8. Check if task exists and get owner
    const { data: existingTask, error: fetchError } = await supabase
      .from("tasks")
      .select("created_by")
      .eq("id", id)
      .single()

    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        await logFailure(userOrError.id, "update", "tasks", "Tarefa não encontrada", { id }, request)
        return applySecurityHeaders(errorResponse("Tarefa não encontrada", 404), true)
      }
      console.error("[SECURITY] Error fetching task:", fetchError)
      await logFailure(userOrError.id, "update", "tasks", fetchError.message, { id }, request)
      return applySecurityHeaders(errorResponse("Erro ao verificar tarefa", 500), true)
    }

    // 9. Check permissions
    if (!canModifyResource(userOrError, existingTask.created_by)) {
      await logFailure(userOrError.id, "update", "tasks", "Sem permissão", { id }, request)
      return applySecurityHeaders(errorResponse("Sem permissão para modificar esta tarefa", 403), true)
    }

    // 10. Update task
    const { data: task, error: updateError } = await supabase
      .from("tasks")
      .update({
        title: validatedData.title,
        description: validatedData.description,
        status: validatedData.status,
        priority: validatedData.priority,
        assigned_to: validatedData.assigned_to,
        project_id: validatedData.project_id,
        due_date: validatedData.due_date,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (updateError) {
      console.error("[SECURITY] Error updating task:", updateError)
      await logFailure(userOrError.id, "update", "tasks", updateError.message, validatedData, request)
      return applySecurityHeaders(errorResponse("Erro ao atualizar tarefa", 500), true)
    }

    // 11. Handle task assignees if provided
    if (validatedData.assignee_ids !== undefined) {
      await supabase.from("task_assignees").delete().eq("task_id", id)

      if (validatedData.assignee_ids.length > 0) {
        const assignees = validatedData.assignee_ids.map((userId) => ({
          task_id: id,
          user_id: userId,
        }))

        const { error: assignError } = await supabase.from("task_assignees").insert(assignees)
        if (assignError) {
          console.error("[SECURITY] Error updating task assignees:", assignError)
        }
      }
    }

    // 12. Log success
    await logSuccess(userOrError.id, "update", "tasks", id, { title: task.title }, request)
    return applySecurityHeaders(successResponse(task), true)
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
      } else if (error.message.includes("Payload muito grande")) {
        errorMessage = error.message
        statusCode = 413
      }
    }
    
    await logFailure(userOrError.id, "update", "tasks", errorMessage, undefined, request)
    return applySecurityHeaders(errorResponse(errorMessage, statusCode), true)
  }
}

/**
 * DELETE /api/tasks/[id] - Delete task (WITH SECURITY)
 */
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  // 1. Rate Limiting
  const rateLimitResult = await apiRateLimit(request)
  if (rateLimitResult) return applySecurityHeaders(rateLimitResult, true)

  // 2. Authentication
  const userOrError = await authenticateUser(request)
  if (userOrError instanceof Response) {
    await logFailure(null, "delete", "tasks", "Não autenticado", undefined, request)
    return applySecurityHeaders(userOrError, true)
  }

  try {
    const { id } = await params
    
    // 3. Validate UUID
    sanitizeUuid(id)
    
    const supabase = await createClient()
    
    // 4. Check if task exists and get owner
    const { data: existingTask, error: fetchError } = await supabase
      .from("tasks")
      .select("created_by, title")
      .eq("id", id)
      .single()

    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        await logFailure(userOrError.id, "delete", "tasks", "Tarefa não encontrada", { id }, request)
        return applySecurityHeaders(errorResponse("Tarefa não encontrada", 404), true)
      }
      console.error("[SECURITY] Error fetching task:", fetchError)
      await logFailure(userOrError.id, "delete", "tasks", fetchError.message, { id }, request)
      return applySecurityHeaders(errorResponse("Erro ao verificar tarefa", 500), true)
    }

    // 5. Check permissions
    if (!canModifyResource(userOrError, existingTask.created_by)) {
      await logFailure(userOrError.id, "delete", "tasks", "Sem permissão", { id, title: existingTask.title }, request)
      return applySecurityHeaders(errorResponse("Sem permissão para deletar esta tarefa", 403), true)
    }

    // 6. Delete task assignees first
    await supabase.from("task_assignees").delete().eq("task_id", id)

    // 7. Delete task
    const { error: deleteError } = await supabase.from("tasks").delete().eq("id", id)

    if (deleteError) {
      console.error("[SECURITY] Error deleting task:", deleteError)
      await logFailure(userOrError.id, "delete", "tasks", deleteError.message, { id }, request)
      return applySecurityHeaders(errorResponse("Erro ao deletar tarefa", 500), true)
    }

    // 8. Log success
    await logSuccess(userOrError.id, "delete", "tasks", id, { title: existingTask.title }, request)
    return applySecurityHeaders(successResponse({ message: "Tarefa deletada com sucesso" }), true)
  } catch (error) {
    console.error("[SECURITY] Unexpected error:", error)
    await logFailure(
      userOrError.id,
      "delete",
      "tasks",
      error instanceof Error ? error.message : "Erro desconhecido",
      undefined,
      request
    )
    return applySecurityHeaders(errorResponse("Erro interno do servidor", 500), true)
  }
}
