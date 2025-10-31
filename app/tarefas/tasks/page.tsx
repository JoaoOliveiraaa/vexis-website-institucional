import { createClient } from "@/lib/supabase/server"
import { TasksTable } from "@/components/tasks-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default async function TasksPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Fetch all tasks
  const { data: tasks } = await supabase
    .from("tasks")
    .select(
      `
      *,
      assigned_to_profile:profiles!tasks_assigned_to_fkey(id, full_name),
      created_by_profile:profiles!tasks_created_by_fkey(id, full_name)
    `,
    )
    .order("created_at", { ascending: false })

  const { data: allAssignees } = await supabase.from("task_assignees").select(`
      task_id,
      user:profiles(id, full_name)
    `)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tarefas</h1>
          <p className="text-muted-foreground">Gerencie suas tarefas</p>
        </div>
        <Link href="/tarefas/tasks/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nova Tarefa
          </Button>
        </Link>
      </div>

      <TasksTable tasks={tasks || []} taskAssignees={allAssignees || []} />
    </div>
  )
}
