import { createClient } from "@/lib/supabase/server"
import { notFound, redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Pencil, Calendar, DollarSign, TrendingUp, CheckSquare } from "lucide-react"
import Link from "next/link"
import { DeleteProjectButton } from "@/components/delete-project-button"

const statusColors = {
  planning: "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
  active: "bg-green-200 text-green-700 dark:bg-green-900 dark:text-green-300",
  on_hold: "bg-yellow-200 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  completed: "bg-blue-200 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  cancelled: "bg-red-200 text-red-700 dark:bg-red-900 dark:text-red-300",
}

const statusLabels = {
  planning: "Planejamento",
  active: "Ativo",
  on_hold: "Em Espera",
  completed: "Concluído",
  cancelled: "Cancelado",
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  if (id === "new") {
    redirect("/tarefas/projects/new")
  }

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/tarefas/auth/login")
  }

  const { data: project } = await supabase
    .from("projects")
    .select(
      `
      *,
      created_by_profile:profiles!projects_created_by_fkey(id, full_name)
    `,
    )
    .eq("id", id)
    .single()

  if (!project) {
    notFound()
  }

  // Get tasks for this project
  const { data: tasks } = await supabase
    .from("tasks")
    .select("id, title, status, priority")
    .eq("project_id", id)
    .order("created_at", { ascending: false })

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  const canDelete = project.created_by === user.id || profile?.role === "admin"

  const budgetUsed = project.budget ? (Number(project.spent) / Number(project.budget)) * 100 : 0

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">{project.name}</h1>
          <p className="text-slate-600 dark:text-slate-400">Detalhes do projeto</p>
        </div>
        <div className="flex gap-2">
          <Link href={`/tarefas/projects/${id}/edit`}>
            <Button variant="outline">
              <Pencil className="h-4 w-4 mr-2" />
              Editar
            </Button>
          </Link>
          {canDelete && <DeleteProjectButton projectId={id} />}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle>Informações do Projeto</CardTitle>
              <Badge className={statusColors[project.status as keyof typeof statusColors]}>
                {statusLabels[project.status as keyof typeof statusLabels]}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {project.description && (
              <div>
                <h3 className="font-semibold mb-2 text-slate-900 dark:text-slate-50">Descrição</h3>
                <p className="text-slate-600 dark:text-slate-400">{project.description}</p>
              </div>
            )}

            <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              {project.start_date && (
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Data de Início</p>
                    <p className="font-medium text-slate-900 dark:text-slate-50">
                      {new Date(project.start_date).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
              )}

              {project.end_date && (
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Data de Término</p>
                    <p className="font-medium text-slate-900 dark:text-slate-50">
                      {new Date(project.end_date).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Progresso e Orçamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-slate-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">Progresso do Projeto</span>
                </div>
                <span className="text-lg font-bold text-slate-900 dark:text-slate-50">{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-3" />
            </div>

            {project.budget && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-slate-400" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">Orçamento Utilizado</span>
                  </div>
                  <span className="text-lg font-bold text-slate-900 dark:text-slate-50">{budgetUsed.toFixed(1)}%</span>
                </div>
                <Progress value={budgetUsed} className="h-3" />
                <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                  <span>Gasto: R$ {Number(project.spent).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                  <span>Total: R$ {Number(project.budget).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5" />
              Tarefas do Projeto ({tasks?.length || 0})
            </CardTitle>
            <Link href={`/tarefas/tasks/new?project=${id}`}>
              <Button size="sm">Adicionar Tarefa</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {tasks && tasks.length > 0 ? (
            <div className="space-y-2">
              {tasks.map((task) => (
                <Link key={task.id} href={`/tarefas/tasks/${task.id}`}>
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                    <span className="font-medium text-slate-900 dark:text-slate-50">{task.title}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {task.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-slate-500 dark:text-slate-500 py-8">
              Nenhuma tarefa vinculada a este projeto ainda.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
