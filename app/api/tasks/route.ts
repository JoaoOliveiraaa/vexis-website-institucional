import { NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { authenticateUser, errorResponse, successResponse } from "@/lib/api/auth"
import { createTaskSchema, validateData } from "@/lib/api/validation"
import { readRateLimit, apiRateLimit, rateLimitByUser } from "@/lib/api/rate-limit"
import { sanitizeObject, validatePayloadSize, containsForbiddenWords } from "@/lib/api/sanitize"
import { logSuccess, logFailure } from "@/lib/api/audit-log"
import { applySecurityHeaders } from "@/lib/api/security-headers"

/**
 * GET /api/tasks - List all tasks (WITH SECURITY)
 */
export async function GET(request: NextRequest) {
  // 1. Rate Limiting
  const rateLimitResult = await readRateLimit(request)
  if (rateLimitResult) return applySecurityHeaders(rateLimitResult, true)

  // 2. Authentication
  const userOrError = await authenticateUser(request)
  if (userOrError instanceof Response) {
    await logFailure(null, "read", "tasks", "Não autenticado", undefined, request)
    return applySecurityHeaders(userOrError, true)
  }

  // 3. User rate limit
  const userRateLimit = rateLimitByUser(userOrError.id)
  if (userRateLimit) return applySecurityHeaders(userRateLimit, true)

  try {
    const supabase = await createClient()
    
    const { data: tasks, error } = await supabase
      .from("tasks")
      .select(`
        *,
        assigned_to_profile:profiles!tasks_assigned_to_fkey(id, full_name),
        created_by_profile:profiles!tasks_created_by_fkey(id, full_name)
      `)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[SECURITY] Error fetching tasks:", error)
      await logFailure(userOrError.id, "read", "tasks", error.message, undefined, request)
      return applySecurityHeaders(errorResponse("Erro ao buscar tarefas", 500), true)
    }

    await logSuccess(userOrError.id, "read", "tasks", null, { count: tasks?.length || 0 }, request)
    return applySecurityHeaders(successResponse(tasks), true)
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
 * POST /api/tasks - Create new task (WITH SECURITY)
 */
export async function POST(request: NextRequest) {
  // 1. Rate Limiting (more restrictive for writes)
  const rateLimitResult = await apiRateLimit(request)
  if (rateLimitResult) return applySecurityHeaders(rateLimitResult, true)

  // 2. Authentication
  const userOrError = await authenticateUser(request)
  if (userOrError instanceof Response) {
    await logFailure(null, "create", "tasks", "Não autenticado", undefined, request)
    return applySecurityHeaders(userOrError, true)
  }

  // 3. User rate limit (stricter for create operations)
  const userRateLimit = rateLimitByUser(userOrError.id, { windowMs: 60000, maxRequests: 30 })
  if (userRateLimit) return applySecurityHeaders(userRateLimit, true)

  try {
    // 4. Parse and validate payload size
    const body = await request.json()
    validatePayloadSize(body, 50) // Max 50KB

    // 5. Sanitize input
    const sanitizedBody = sanitizeObject(body)

    // 6. Check forbidden words
    if (sanitizedBody.title && containsForbiddenWords(sanitizedBody.title)) {
      await logFailure(userOrError.id, "create", "tasks", "Conteúdo proibido detectado", { title: sanitizedBody.title }, request)
      return applySecurityHeaders(errorResponse("Conteúdo inválido detectado", 400), true)
    }

    // 7. Validate with Zod
    const validatedData = validateData(createTaskSchema, sanitizedBody)
    
    const supabase = await createClient()
    
    // 8. Create task
    const { data: task, error: taskError } = await supabase
      .from("tasks")
      .insert({
        title: validatedData.title,
        description: validatedData.description,
        status: validatedData.status,
        priority: validatedData.priority,
        assigned_to: validatedData.assigned_to,
        project_id: validatedData.project_id,
        due_date: validatedData.due_date,
        created_by: userOrError.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (taskError) {
      console.error("[SECURITY] Error creating task:", taskError)
      await logFailure(userOrError.id, "create", "tasks", taskError.message, validatedData, request)
      return applySecurityHeaders(errorResponse("Erro ao criar tarefa", 500), true)
    }

    // 9. Handle task assignees
    if (validatedData.assignee_ids && validatedData.assignee_ids.length > 0) {
      const assignees = validatedData.assignee_ids.map((userId) => ({
        task_id: task.id,
        user_id: userId,
      }))

      const { error: assignError } = await supabase.from("task_assignees").insert(assignees)

      if (assignError) {
        console.error("[SECURITY] Error creating task assignees:", assignError)
        // Don't fail the request, just log
      }
    }

    // 10. Log success
    await logSuccess(userOrError.id, "create", "tasks", task.id, { title: task.title }, request)

    // 11. Return with security headers
    return applySecurityHeaders(successResponse(task, 201), true)
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
      } else if (error.message.includes("inválido")) {
        errorMessage = error.message
        statusCode = 400
      }
    }
    
    await logFailure(userOrError.id, "create", "tasks", errorMessage, undefined, request)
    return applySecurityHeaders(errorResponse(errorMessage, statusCode), true)
  }
}

