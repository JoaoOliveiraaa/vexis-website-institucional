import { createClient } from "@/lib/supabase/server"
import { ProjectForm } from "@/components/project-form"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic'

export default async function NewProjectPage() {
  console.log("[SERVER][v0] NewProjectPage - Starting")

  try {
    console.log("[SERVER][v0] NewProjectPage - Creating Supabase client")
    const supabase = await createClient()

    console.log("[SERVER][v0] NewProjectPage - Getting user")
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    console.log("[SERVER][v0] NewProjectPage - User:", user?.email, "Error:", userError)

    if (userError) {
      console.error("[SERVER][v0] NewProjectPage - Error getting user:", userError)
      redirect("/auth/login")
    }

    if (!user) {
      console.log("[SERVER][v0] NewProjectPage - No user found, redirecting to login")
      redirect("/auth/login")
    }

    console.log("[SERVER][v0] NewProjectPage - Rendering form for user:", user.id)

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Novo Projeto</h1>
          <p className="text-slate-600 dark:text-slate-400">Crie um novo projeto para gerenciar</p>
        </div>

        <ProjectForm currentUserId={user.id} />
      </div>
    )
  } catch (error) {
    console.error("[SERVER][v0] NewProjectPage - Unexpected error:", error)
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Novo Projeto</h1>
          <p className="text-slate-600 dark:text-slate-400">Crie um novo projeto para gerenciar</p>
        </div>

        <ProjectForm currentUserId="" />
      </div>
    )
  }
}
