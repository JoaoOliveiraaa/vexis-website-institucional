import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CheckSquare,
  FolderKanban,
  Users,
  DollarSign,
  AlertCircle,
  TrendingUp,
  Clock,
  ArrowUpRight,
} from "lucide-react"
import { TasksStatusChart, RevenueChart, LeadsStatusChart } from "@/components/dashboard-charts"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AddTeamMemberDialog } from "@/components/add-team-member-dialog"

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: currentProfile } = await supabase.from("profiles").select("role").eq("id", user?.id ?? "").single()

  const [
    { count: tasksCount },
    { count: projectsCount },
    { count: leadsCount },
    { count: clientsCount },
    { data: financialData },
    { data: tasksData },
    { data: leadsData },
    { data: recentActivities },
    { data: upcomingTasks },
    { data: overdueClients },
    { data: teamMembers },
  ] = await Promise.all([
    supabase.from("tasks").select("*", { count: "exact", head: true }),
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase.from("clients").select("*", { count: "exact", head: true }),
    supabase.from("financial_records").select("type, amount, date").order("date", { ascending: false }),
    supabase.from("tasks").select("status").order("created_at", { ascending: false }),
    supabase.from("leads").select("status").order("created_at", { ascending: false }),
    supabase.from("tasks").select("id, title, status, created_at").order("created_at", { ascending: false }).limit(5),
    supabase
      .from("tasks")
      .select("id, title, due_date, priority")
      .gte("due_date", new Date().toISOString())
      .lte("due_date", new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString())
      .order("due_date", { ascending: true })
      .limit(5),
    supabase.from("clients").select("id, name, client_contracts!inner(client_payments(status, due_date))").limit(5),
    supabase.from("profiles").select("id, full_name, email, niche, role").order("full_name"),
  ])

  // Calculate financial metrics
  const totalIncome =
    financialData?.filter((r) => r.type === "income").reduce((sum, r) => sum + Number(r.amount), 0) || 0
  const totalExpense =
    financialData?.filter((r) => r.type === "expense").reduce((sum, r) => sum + Number(r.amount), 0) || 0
  const balance = totalIncome - totalExpense

  // Calculate monthly revenue for chart (last 6 months)
  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const date = new Date()
    date.setMonth(date.getMonth() - (5 - i))
    const monthStr = date.toISOString().slice(0, 7)

    const revenue =
      financialData
        ?.filter((r) => r.type === "income" && r.date?.startsWith(monthStr))
        .reduce((sum, r) => sum + Number(r.amount), 0) || 0

    const expenses =
      financialData
        ?.filter((r) => r.type === "expense" && r.date?.startsWith(monthStr))
        .reduce((sum, r) => sum + Number(r.amount), 0) || 0

    return {
      month: date.toLocaleDateString("pt-BR", { month: "short" }),
      revenue,
      expenses,
    }
  })

  // Calculate tasks by status
  const tasksByStatus =
    tasksData?.reduce((acc: Record<string, number>, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1
      return acc
    }, {}) || {}

  const tasksChartData = Object.entries(tasksByStatus).map(([status, count]) => ({
    status,
    count: count as number,
  }))

  // Calculate leads by status
  const leadsByStatus =
    leadsData?.reduce((acc: Record<string, number>, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1
      return acc
    }, {}) || {}

  const leadsChartData = Object.entries(leadsByStatus).map(([status, count]) => ({
    status,
    count: count as number,
  }))

  const brandGradient = "from-primary via-[oklch(0.6_0.19_240)] to-accent"

  const stats = [
    {
      title: "Tarefas em andamento",
      value: tasksCount || 0,
      description: "Itens ativos distribuídos no fluxo de trabalho.",
      icon: CheckSquare,
      accent: brandGradient,
      href: "/tarefas/tasks",
    },
    {
      title: "Projetos ativos",
      value: projectsCount || 0,
      description: "Roadmaps monitorados pela equipe de operações.",
      icon: FolderKanban,
      accent: brandGradient,
      href: "/tarefas/projects",
    },
    {
      title: "Clientes engajados",
      value: clientsCount || 0,
      description: "Contas com relacionamento e entregas recentes.",
      icon: Users,
      accent: brandGradient,
      href: "/tarefas/clients",
    },
    {
      title: "Saldo financeiro",
      value: `R$ ${balance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
      description: "Receitas menos despesas consolidadas.",
      icon: DollarSign,
      accent: brandGradient,
      href: "/tarefas/financial",
    },
  ]

  const canManageTeam = currentProfile?.role === "admin"

  return (
    <div className="space-y-4 lg:space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm lg:text-base text-muted-foreground">Visão geral do sistema de gestão</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.title} href={stat.href}>
              <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/95 p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${stat.accent} opacity-10 transition-opacity duration-200 group-hover:opacity-25`}
                />
                <div className="relative flex flex-col gap-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-semibold text-card-foreground">{stat.value}</p>
                    </div>
                    <div
                      className={`rounded-2xl bg-gradient-to-br ${stat.accent} p-2 text-white shadow-lg transition-transform duration-200 group-hover:scale-105`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{stat.description}</span>
                    <ArrowUpRight className="h-4 w-4 text-primary opacity-70 transition group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:gap-6 grid-cols-1 xl:grid-cols-2">
        <TasksStatusChart data={tasksChartData} />
        <LeadsStatusChart data={leadsChartData} />
      </div>

      <div className="grid gap-4 lg:gap-6 grid-cols-1 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RevenueChart data={monthlyData} />
        </div>
        <Card className="xl:col-span-1">
          <CardHeader className="space-y-1">
            <CardTitle className="text-base lg:text-lg text-card-foreground">Insights Rápidos</CardTitle>
            <p className="text-sm text-muted-foreground">
              Picos de receitas e prioridades que merecem atenção esta semana.
            </p>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="rounded-xl border border-border/60 p-4">
              <p className="text-xs uppercase tracking-wide text-primary">Financeiro</p>
              <p className="mt-1 font-medium text-card-foreground">Receita acima da meta mensal</p>
              <p className="mt-2">
                O saldo atual mantém uma margem positiva. Considere reinvestir parte do excedente em campanhas.
              </p>
            </div>
            <div className="rounded-xl border border-border/60 p-4">
              <p className="text-xs uppercase tracking-wide text-primary">Projetos</p>
              <p className="mt-1 font-medium text-card-foreground">Projetos prontos para revisão</p>
              <p className="mt-2">
                Há entregas aguardando feedback. Sincronize com o time de revisão para evitar gargalos.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts and Activities */}
      <div className="grid gap-4 lg:gap-6 grid-cols-1 xl:grid-cols-3">
        {/* Upcoming Tasks */}
        <Card className="xl:col-span-1 border border-border/60 bg-card/95 shadow-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-base lg:text-lg text-card-foreground flex items-center gap-2">
              <Clock className="h-4 w-4 lg:h-5 lg:w-5" />
              Tarefas Próximas do Vencimento
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Garanta que os prazos críticos estejam sob controle nesta semana.
            </p>
          </CardHeader>
          <CardContent>
            {upcomingTasks && upcomingTasks.length > 0 ? (
              <div className="space-y-3">
                {upcomingTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-border pb-2 last:border-0"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{task.title}</p>
                      <p className="text-xs text-muted-foreground">
                        Vence em: {new Date(task.due_date).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <Badge variant={task.priority === "high" ? "destructive" : "secondary"} className="w-fit">
                      {task.priority === "high" ? "Alta" : task.priority === "medium" ? "Média" : "Baixa"}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Nenhuma tarefa próxima do vencimento.</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="xl:col-span-1 border border-border/60 bg-card/95 shadow-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-base lg:text-lg text-card-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4 lg:h-5 lg:w-5" />
              Atividades Recentes
            </CardTitle>
            <p className="text-sm text-muted-foreground">Veja o que acabou de acontecer nos quadros de operação.</p>
          </CardHeader>
          <CardContent>
            {recentActivities && recentActivities.length > 0 ? (
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-border pb-2 last:border-0"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.created_at).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <Badge className="w-fit">
                      {activity.status === "backlog"
                        ? "Backlog"
                        : activity.status === "todo"
                          ? "A Fazer"
                          : activity.status === "in_progress"
                            ? "Em Progresso"
                            : activity.status === "review"
                              ? "Revisão"
                              : "Concluído"}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Nenhuma atividade recente.</p>
            )}
          </CardContent>
        </Card>

        {/* Team Members */}
        <Card className="xl:col-span-1 border border-border/60 bg-card/95 shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between gap-3">
            <div>
              <CardTitle className="text-base lg:text-lg text-card-foreground">Time & Nichos</CardTitle>
              <p className="text-sm text-muted-foreground">
                Pessoas convidadas para colaborar e suas frentes de atuação.
              </p>
            </div>
            <div className="flex items-center gap-2">
              {canManageTeam && (
                <AddTeamMemberDialog
                  trigger={
                    <Button size="sm" variant="outline">
                      Adicionar
                    </Button>
                  }
                />
              )}
              {canManageTeam && (
                <Link
                  href="/tarefas/users"
                  className="text-xs font-medium text-primary underline-offset-4 hover:underline"
                >
                  Gerenciar
                </Link>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {teamMembers && teamMembers.length > 0 ? (
              <div className="space-y-3">
                {teamMembers.slice(0, 6).map((member) => (
                  <div key={member.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{member.full_name || "Usuário"}</p>
                      <p className="text-xs text-muted-foreground">{member.email}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="mb-1">
                        {member.niche ?? "Sem nicho"}
                      </Badge>
                      <p className="text-[11px] uppercase tracking-tight text-muted-foreground">
                        {member.role === "admin" ? "Admin" : "Colaborador"}
                      </p>
                    </div>
                  </div>
                ))}
                {teamMembers.length > 6 && (
                  <p className="text-xs text-muted-foreground">
                    +{teamMembers.length - 6} membros adicionais cadastrados
                  </p>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 rounded-md border border-dashed border-primary/40 p-6 text-center">
                <p className="text-xs text-muted-foreground">
                  Convide membros para colaborarem com você em diferentes nichos.
                </p>
                {canManageTeam && (
                  <AddTeamMemberDialog
                    trigger={
                      <Button size="sm" variant="default">
                        Convidar agora
                      </Button>
                    }
                  />
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {leadsCount === 0 && tasksCount === 0 && (
        <Card className="border-amber-500/50 bg-amber-500/10">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Bem-vindo ao Sistema Vexis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Comece criando suas primeiras tarefas, projetos ou leads para aproveitar ao máximo o sistema.
            </p>
            <div className="flex gap-2">
              <Link href="/tarefas/tasks/new">
                <Badge className="cursor-pointer hover:bg-primary/80">Criar Tarefa</Badge>
              </Link>
              <Link href="/tarefas/projects/new">
                <Badge className="cursor-pointer hover:bg-primary/80">Criar Projeto</Badge>
              </Link>
              <Link href="/tarefas/leads/new">
                <Badge className="cursor-pointer hover:bg-primary/80">Criar Lead</Badge>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

