import { createClient } from "@/lib/supabase/server"
import { ProjectForm } from "@/components/project-form"
import { notFound, redirect } from "next/navigation"

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/tarefas/auth/login")
  }

  const { data: project } = await supabase.from("projects").select("*").eq("id", id).single()

  if (!project) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Editar Projeto</h1>
        <p className="text-slate-600 dark:text-slate-400">Atualize as informações do projeto</p>
      </div>

      <ProjectForm currentUserId={user.id} project={project} />
    </div>
  )
}
