import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Plus, Calendar, DollarSign } from "lucide-react"
import Link from "next/link"

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

export default async function ProjectsPage() {
  const supabase = await createClient()

  const { data: projects } = await supabase
    .from("projects")
    .select(
      `
      *,
      created_by_profile:profiles!projects_created_by_fkey(id, full_name)
    `,
    )
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projetos</h1>
          <p className="text-muted-foreground">Gerencie seus projetos e acompanhe o progresso</p>
        </div>
        <Link href="/tarefas/tarefas/projects/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Projeto
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects?.map((project) => (
          <Link key={project.id} href={`/tarefas/projects/${project.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg line-clamp-2">{project.name}</CardTitle>
                  <Badge className={statusColors[project.status as keyof typeof statusColors]}>
                    {statusLabels[project.status as keyof typeof statusLabels]}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {project.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progresso</span>
                    <span className="font-medium text-foreground">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="space-y-2 pt-2 border-t">
                  {project.start_date && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Início: {new Date(project.start_date).toLocaleDateString("pt-BR")}</span>
                    </div>
                  )}
                  {project.budget && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <DollarSign className="h-4 w-4" />
                      <span>
                        Orçamento: R$ {Number(project.budget).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}

        {(!projects || projects.length === 0) && (
          <div className="col-span-full">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground mb-4">Nenhum projeto encontrado</p>
                <Link href="/tarefas/tarefas/projects/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Primeiro Projeto
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
