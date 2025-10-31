import { createClient } from "@/lib/supabase/server"
import { notFound, redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Pencil, Clock, User, FolderKanban, Users } from "lucide-react"
import Link from "next/link"
import { TaskComments } from "@/components/task-comments"
import { DeleteTaskButton } from "@/components/delete-task-button"

const priorityColors = {
  low: "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
  medium: "bg-blue-200 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  high: "bg-orange-200 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
  urgent: "bg-red-200 text-red-700 dark:bg-red-900 dark:text-red-300",
}

const priorityLabels = {
  low: "Baixa",
  medium: "Média",
  high: "Alta",
  urgent: "Urgente",
}

const statusLabels = {
  backlog: "Backlog",
  todo: "A Fazer",
  in_progress: "Em Progresso",
  review: "Revisão",
  done: "Concluído",
}

export default async function TaskDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  if (id === "new") {
    redirect("/tarefas/tasks/new")
  }

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: task } = await supabase
    .from("tasks")
    .select(
      `
      *,
      assigned_to_profile:profiles!tasks_assigned_to_fkey(id, full_name),
      created_by_profile:profiles!tasks_created_by_fkey(id, full_name),
      project:projects(id, name)
    `,
    )
    .eq("id", id)
    .single()

  if (!task) {
    notFound()
  }

  const { data: assignees } = await supabase
    .from("task_assignees")
    .select(`
      user_id,
      user:profiles(id, full_name)
    `)
    .eq("task_id", id)

  const assignedUsers = assignees?.map((a) => a.user) || []

  const { data: comments } = await supabase
    .from("task_comments")
    .select(
      `
      *,
      user:profiles(id, full_name)
    `,
    )
    .eq("task_id", id)
    .order("created_at", { ascending: true })

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  const canDelete = task.created_by === user.id || profile?.role === "admin"

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">{task.title}</h1>
          <p className="text-slate-600 dark:text-slate-400">Detalhes da tarefa</p>
        </div>
        <div className="flex gap-2">
          <Link href={`/tarefas/tasks/${id}/edit`}>
            <Button variant="outline">
              <Pencil className="h-4 w-4 mr-2" />
              Editar
            </Button>
          </Link>
          {canDelete && <DeleteTaskButton taskId={id} />}
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle>Informações da Tarefa</CardTitle>
            <div className="flex gap-2">
              <Badge>{statusLabels[task.status as keyof typeof statusLabels]}</Badge>
              <Badge className={priorityColors[task.priority as keyof typeof priorityColors]}>
                {priorityLabels[task.priority as keyof typeof priorityLabels]}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {task.description && (
            <div>
              <h3 className="font-semibold mb-2 text-slate-900 dark:text-slate-50">Descrição</h3>
              <p className="text-slate-600 dark:text-slate-400">{task.description}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-6">
            {assignedUsers.length > 0 && (
              <div className="flex items-start gap-3 col-span-2">
                <Users className="h-5 w-5 text-slate-400 mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Atribuído a</p>
                  <div className="flex flex-wrap gap-2">
                    {assignedUsers.map((assignee: any) => (
                      <div
                        key={assignee.id}
                        className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-full px-3 py-1"
                      >
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs bg-slate-200 dark:bg-slate-700">
                            {assignee.full_name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")
                              .toUpperCase()
                              .slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-slate-900 dark:text-slate-50">
                          {assignee.full_name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {task.due_date && (
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Data de Vencimento</p>
                  <p className="font-medium text-slate-900 dark:text-slate-50 mt-1">
                    {new Date(task.due_date).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>
            )}

            {task.project && (
              <div className="flex items-center gap-3">
                <FolderKanban className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Projeto</p>
                  <Link href={`/tarefas/projects/${task.project.id}`}>
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline mt-1">
                      {task.project.name}
                    </p>
                  </Link>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Criado por</p>
                <p className="font-medium text-slate-900 dark:text-slate-50 mt-1">
                  {task.created_by_profile.full_name}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-500">
              Criado em {new Date(task.created_at).toLocaleString("pt-BR")}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500">
              Atualizado em {new Date(task.updated_at).toLocaleString("pt-BR")}
            </p>
          </div>
        </CardContent>
      </Card>

      <TaskComments taskId={id} comments={comments || []} currentUserId={user.id} />
    </div>
  )
}
