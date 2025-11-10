import { createClient } from "@/lib/supabase/server"
import { TasksTable } from "@/components/tasks-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ChevronRight, Plus, Rocket, Sparkles } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function TasksPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Fetch all tasks
  const { data: tasksData } = await supabase
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

  const tasks = tasksData || []
  const brandGradient = "from-primary via-[oklch(0.6_0.19_240)] to-accent"

  const tasksByStatus = tasks.reduce<Record<string, number>>((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1
    return acc
  }, {})

  const quickStats = [
    {
      key: "backlog",
      label: "Backlog",
      description: "Ideias recém-priorizadas para triagem.",
      accent: brandGradient,
    },
    {
      key: "todo",
      label: "A Fazer",
      description: "Itens prontos para entrar na sprint.",
      accent: brandGradient,
    },
    {
      key: "in_progress",
      label: "Em Progresso",
      description: "Demandas sendo executadas agora.",
      accent: brandGradient,
    },
    {
      key: "review",
      label: "Revisão",
      description: "Tarefas aguardando validação final.",
      accent: brandGradient,
    },
    {
      key: "done",
      label: "Concluído",
      description: "Entregas finalizadas e aprovadas.",
      accent: brandGradient,
    },
  ]

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/95 via-[oklch(0.6_0.19_240)]/90 to-accent/95 px-8 py-10 text-white shadow-lg">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_60%)] opacity-70" />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <Badge variant="outline" className="border-white/30 bg-white/10 text-white backdrop-blur">
              Board de execução
            </Badge>
            <h1 className="text-3xl font-semibold tracking-tight lg:text-4xl">
              Orquestre tarefas com mais visibilidade e ritmo.
            </h1>
            <p className="max-w-2xl text-sm text-white/80 lg:text-base">
              Agrupe entregas por squads, monitore prioridades e aprove delegações em segundos. Use filtros
              e automações para que nada fique esquecido.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-white/80">
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                <Sparkles className="h-4 w-4" />
                Automação de follow-up disponível
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                <Rocket className="h-4 w-4" />
                {tasks.length} tarefas monitoradas
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-6 text-sm text-white/80 backdrop-blur-lg lg:max-w-sm">
            <p className="text-base font-semibold text-white">Ponto rápido</p>
            <p>
              Priorize as tarefas em revisão e ajuste a capacidade da sprint atual para evitar gargalos nos próximos
              dias.
            </p>
            <Link
              href="/tarefas/tasks/new"
              className="inline-flex items-center gap-2 text-sm font-medium text-white transition hover:opacity-80"
            >
              Criar nova tarefa
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-foreground">Resumo da Sprint</h2>
          <p className="text-sm text-muted-foreground">
            Visualize o andamento geral e mergulhe nos detalhes do board.
          </p>
        </div>
        <Link href="/tarefas/tasks/new">
          <Button className="shadow-lg">
            <Plus className="mr-2 h-4 w-4" />
            Nova tarefa
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {quickStats.map((stat) => (
          <Card key={stat.key} className="border border-border/60 bg-card/95 shadow-sm">
            <CardContent className="flex flex-col gap-3 px-5 py-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-semibold text-card-foreground">
                    {tasksByStatus[stat.key] || 0}
                  </p>
                </div>
                <div
                  className={`rounded-xl bg-gradient-to-br ${brandGradient} px-3 py-1 text-xs font-semibold text-white shadow`}
                >
                  {stat.label}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border border-border/60 bg-card/95 shadow-sm">
        <CardContent className="p-0">
          <TasksTable tasks={tasks} taskAssignees={allAssignees || []} />
        </CardContent>
      </Card>
    </div>
  )
}

