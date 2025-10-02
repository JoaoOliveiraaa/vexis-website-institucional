"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath("/tarefas")
  redirect("/tarefas/login")
}

export async function getCurrentUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data: userData } = await supabase.from("users").select("*").eq("id", user.id).single()

  return userData
}

export async function createUser(email: string, password: string, fullName: string, role: "admin" | "user") {
  const supabase = await createClient()

  // Check if current user is admin
  const currentUser = await getCurrentUser()
  if (!currentUser || currentUser.role !== "admin") {
    throw new Error("Apenas administradores podem criar usuários")
  }

  // Create auth user
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })

  if (authError) {
    throw new Error(authError.message)
  }

  if (!authData.user) {
    throw new Error("Erro ao criar usuário")
  }

  // Create user in users table
  const { error: userError } = await supabase.from("users").insert({
    id: authData.user.id,
    email,
    full_name: fullName,
    role,
  })

  if (userError) {
    // Rollback auth user creation
    await supabase.auth.admin.deleteUser(authData.user.id)
    throw new Error(userError.message)
  }

  revalidatePath("/tarefas/admin/usuarios")
  return authData.user
}
