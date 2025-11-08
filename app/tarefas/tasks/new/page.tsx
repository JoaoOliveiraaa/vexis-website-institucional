import { createClient } from "@/lib/supabase/server"
import { TaskForm } from "@/components/task-form"
import { redirect } from "next/navigation"

export default async function NewTaskPage() {
  console.log("[v0] NewTaskPage - Starting")

  let supabase
  try {
    supabase = await createClient()
    console.log("[v0] Supabase client created successfully")
  } catch (error) {
    console.error("[v0] Error creating Supabase client:", error)
    redirect("/auth/login")
  }

  let user
  try {
    const {
      data: { user: userData },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError) {
      console.error("[v0] Error getting user:", userError)
      redirect("/auth/login")
    }

    if (!userData) {
      console.log("[v0] No user found, redirecting to login")
      redirect("/auth/login")
    }

    user = userData
    console.log("[v0] User authenticated:", user.email)
  } catch (error) {
    console.error("[v0] Unexpected error getting user:", error)
    redirect("/auth/login")
  }

  let users: { id: string; full_name: string; email: string }[] = []
  let projects: { id: string; name: string }[] = []

  // Fetch users
  try {
    console.log("[v0] Fetching users from profiles table")
    const { data: usersData, error: usersError } = await supabase
      .from("profiles")
      .select("id, full_name, email")
      .order("full_name")

    if (usersError) {
      console.error("[v0] Error fetching users:", usersError.message, usersError.code)
    } else {
      users = usersData || []
      console.log("[v0] Successfully fetched", users.length, "users")
    }
  } catch (error) {
    console.error("[v0] Unexpected error fetching users:", error)
    // Continue with empty users array
  }

  // Fetch projects
  try {
    console.log("[v0] Fetching projects from projects table")
    const { data: projectsData, error: projectsError } = await supabase
      .from("projects")
      .select("id, name")
      .order("name")

    if (projectsError) {
      console.error("[v0] Error fetching projects:", projectsError.message, projectsError.code)
    } else {
      projects = projectsData || []
      console.log("[v0] Successfully fetched", projects.length, "projects")
    }
  } catch (error) {
    console.error("[v0] Unexpected error fetching projects:", error)
    // Continue with empty projects array
  }

  console.log("[v0] Rendering TaskForm with", users.length, "users and", projects.length, "projects")

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Nova Tarefa</h1>
        <p className="text-slate-600 dark:text-slate-400">Crie uma nova tarefa para o sistema</p>
      </div>

      <TaskForm users={users} projects={projects} currentUserId={user.id} />
    </div>
  )
}
