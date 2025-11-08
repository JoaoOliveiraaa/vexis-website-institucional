import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export interface AuthenticatedUser {
  id: string
  email: string
  role: string
}

/**
 * Middleware to authenticate user and get profile
 */
export async function authenticateUser(request: NextRequest): Promise<AuthenticatedUser | NextResponse> {
  try {
    const supabase = await createClient()
    
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    // Get user profile with role
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, email, role")
      .eq("id", user.id)
      .single()

    if (profileError || !profile) {
      return NextResponse.json({ error: "Perfil não encontrado" }, { status: 404 })
    }

    return {
      id: profile.id,
      email: profile.email,
      role: profile.role,
    }
  } catch (error) {
    console.error("Error authenticating user:", error)
    return NextResponse.json({ error: "Erro ao autenticar" }, { status: 500 })
  }
}

/**
 * Check if user is admin
 */
export function requireAdmin(user: AuthenticatedUser): boolean {
  return user.role === "admin"
}

/**
 * Validate that user can modify a resource
 * For now, admins can modify everything, users can only modify their own resources
 */
export function canModifyResource(user: AuthenticatedUser, resourceOwnerId: string): boolean {
  return user.role === "admin" || user.id === resourceOwnerId
}

/**
 * Create error response
 */
export function errorResponse(message: string, status: number = 400): NextResponse {
  return NextResponse.json({ error: message }, { status })
}

/**
 * Create success response
 */
export function successResponse<T>(data: T, status: number = 200): NextResponse {
  return NextResponse.json(data, { status })
}

