import { createClient } from "@/lib/supabase/server"
import { TaskForm } from "@/components/task-form"
import { notFound, redirect } from "next/navigation"

export default async function EditTaskPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: task } = await supabase.from("tasks").select("*").eq("id", id).single()

  if (!task) {
    notFound()
  }

  const { data: assignees } = await supabase.from("task_assignees").select("user_id").eq("task_id", id)

  const assignedUsers = assignees?.map((a) => a.user_id) || []

  const { data: users } = await supabase.from("profiles").select("id, full_name, email")
  const { data: projects } = await supabase.from("projects").select("id, name")

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Editar Tarefa</h1>
        <p className="text-slate-600 dark:text-slate-400">Atualize as informações da tarefa</p>
      </div>

      <TaskForm
        users={users || []}
        projects={projects || []}
        currentUserId={user.id}
        task={task}
        assignedUsers={assignedUsers}
      />
    </div>
  )
}
