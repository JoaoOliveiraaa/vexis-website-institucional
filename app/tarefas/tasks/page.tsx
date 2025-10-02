import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardLayout } from "@/components/dashboard-layout"
import { TasksTable } from "@/components/tasks-table"
import { CreateTaskDialog } from "@/components/create-task-dialog"

export default async function TasksPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/tarefas/login")
  }

  const { data: userData } = await supabase.from("users").select("*").eq("id", user.id).single()

  if (!userData) {
    redirect("/tarefas/login")
  }

  // Get all tasks with user information
  const { data: tasks } = await supabase
    .from("tasks")
    .select(
      `
      *,
      assigned_user:assigned_to(id, full_name, email),
      created_user:created_by(id, full_name, email)
    `,
    )
    .order("created_at", { ascending: false })

  // Get all users for assignment
  const { data: users } = await supabase.from("users").select("id, full_name, email")

  return (
    <DashboardLayout user={userData}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Tarefas</h1>
            <p className="text-slate-600 mt-1">Gerencie todas as tarefas do sistema</p>
          </div>
          <CreateTaskDialog users={users || []} currentUserId={user.id} />
        </div>

        <TasksTable tasks={tasks || []} users={users || []} currentUserId={user.id} />
      </div>
    </DashboardLayout>
  )
}
