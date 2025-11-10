import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Plus, Calendar, DollarSign, ArrowUpRight, LineChart, MapPin, Rocket } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export const dynamic = 'force-dynamic'

const statusColors = {
  planning: "bg-gradient-to-br from-primary/15 via-[oklch(0.6_0.19_240)]/15 to-accent/15 text-primary",
  active: "bg-gradient-to-br from-primary/15 via-[oklch(0.6_0.19_240)]/15 to-accent/15 text-primary",
  on_hold: "bg-gradient-to-br from-primary/15 via-[oklch(0.6_0.19_240)]/15 to-accent/15 text-primary",
  completed: "bg-gradient-to-br from-primary/15 via-[oklch(0.6_0.19_240)]/15 to-accent/15 text-primary",
  cancelled: "bg-gradient-to-br from-primary/15 via-[oklch(0.6_0.19_240)]/15 to-accent/15 text-primary",
}

const statusLabels = {
  planning: "Planejamento",
  active: "Ativo",
  on_hold: "Em Espera",
  completed: "Concluído",
  cancelled: "Cancelado",
}
const brandGradient = "from-primary via-[oklch(0.6_0.19_240)] to-accent"

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

  const totalBudget =
    projects?.reduce((acc, project) => acc + (project.budget ? Number(project.budget) : 0), 0) ?? 0

  const progressAverage =
    projects && projects.length > 0
      ? Math.round(projects.reduce((acc, project) => acc + (project.progress || 0), 0) / projects.length)
      : 0

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/95 via-[oklch(0.6_0.19_240)]/90 to-accent/95 px-8 py-10 text-white shadow-lg">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_60%)] opacity-70" />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <Badge variant="outline" className="border-white/30 bg-white/10 text-white backdrop-blur">
              Portfólio Estratégico
            </Badge>
            <h1 className="text-3xl font-semibold tracking-tight lg:text-4xl">
              Construa, acompanhe e entregue projetos sem perder o ritmo.
            </h1>
            <p className="max-w-2xl text-sm text-white/80 lg:text-base">
              Centralize escopo, orçamento e progresso em uma visão unificada. Atribua responsáveis, monitore riscos e
              mantenha stakeholders sempre atualizados.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-white/80">
              <div className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2">
                <LineChart className="h-4 w-4" />
                {progressAverage}% progresso médio
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2">
                <DollarSign className="h-4 w-4" />
                Orçamento total R$ {totalBudget.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-6 text-sm text-white/80 backdrop-blur-lg lg:max-w-sm">
            <p className="text-base font-semibold text-white">Dica rápida</p>
            <p>
              Priorize os projetos “Em espera” com alto orçamento para maximizar resultado do trimestre.
            </p>
            <Link
              href="/tarefas/projects/new"
              className="inline-flex items-center gap-2 text-sm font-medium text-white transition hover:opacity-80"
            >
              Criar novo projeto
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-foreground">Visão geral dos projetos</h2>
          <p className="text-sm text-muted-foreground">Acompanhe entregas, cronogramas e orçamento disponível.</p>
        </div>
        <Link href="/tarefas/projects/new">
          <Button className="shadow-lg">
            <Plus className="mr-2 h-4 w-4" />
            Novo projeto
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Object.entries(statusLabels).map(([status, label]) => {
          const count = projects?.filter((project) => project.status === status).length ?? 0
          return (
            <Card key={status} className="border border-border/60 bg-card/95 shadow-sm">
              <CardContent className="flex flex-col gap-3 px-5 py-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
                  <div
                    className={cn("rounded-xl bg-gradient-to-br px-3 py-1 text-xs font-semibold text-white shadow", brandGradient)}
                  >
                    {label}
                  </div>
                </div>
                <p className="text-2xl font-semibold text-card-foreground">{count}</p>
                <p className="text-sm text-muted-foreground">
                  {status === "planning"
                    ? "Escopos alimentados com priorização inicial."
                    : status === "active"
                      ? "Iniciativas em execução e com squads alocados."
                      : status === "on_hold"
                        ? "Itens aguardando decisão ou recursos."
                        : status === "completed"
                          ? "Entregas finalizadas neste ciclo."
                          : "Projetos interrompidos ou arquivados."}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects?.map((project) => (
          <Link key={project.id} href={`/tarefas/projects/${project.id}`}>
            <Card className="group relative h-full overflow-hidden border border-border/60 bg-card/95 shadow-sm transition hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-[oklch(0.6_0.19_240)]/10 to-accent/10 opacity-0 transition group-hover:opacity-100" />
              <CardHeader className="relative">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg text-card-foreground line-clamp-2">{project.name}</CardTitle>
                  <Badge className={statusColors[project.status as keyof typeof statusColors]}>
                    {statusLabels[project.status as keyof typeof statusLabels]}
                  </Badge>
                </div>
                {project.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                )}
              </CardHeader>
              <CardContent className="relative space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progresso</span>
                    <span className="font-medium text-foreground">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="grid gap-3 rounded-2xl border border-border/60 bg-card/80 p-4 text-sm text-muted-foreground">
                  {project.start_date && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>Início: {new Date(project.start_date).toLocaleDateString("pt-BR")}</span>
                    </div>
                  )}
                  {project.end_date && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>Entrega prevista: {new Date(project.end_date).toLocaleDateString("pt-BR")}</span>
                    </div>
                  )}
                  {project.budget && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <span>
                        Orçamento: R$ {Number(project.budget).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  )}
                  {project.created_by_profile && (
                    <div className="flex items-center gap-2">
                      <Rocket className="h-4 w-4 text-primary" />
                      <span>Responsável: {project.created_by_profile.full_name}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}

        {(!projects || projects.length === 0) && (
          <div className="col-span-full">
            <Card className="border border-dashed border-primary/40 bg-card/90">
              <CardContent className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                <p className="max-w-md text-sm text-muted-foreground">
                  Nenhum projeto cadastrado ainda. Crie as primeiras iniciativas e acompanhe o progresso de ponta a ponta.
                </p>
                <Link href="/tarefas/projects/new">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Criar primeiro projeto
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

