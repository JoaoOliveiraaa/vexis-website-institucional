import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckSquare, FolderKanban, Users, DollarSign, AlertCircle, TrendingUp, Clock } from "lucide-react"
import { TasksStatusChart, RevenueChart, LeadsStatusChart } from "@/components/dashboard-charts"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createClient()

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

  const stats = [
    {
      title: "Tarefas Ativas",
      value: tasksCount || 0,
      icon: CheckSquare,
      color: "text-primary",
      bgColor: "bg-primary/10",
      href: "/tarefas/tarefas/tasks",
    },
    {
      title: "Projetos",
      value: projectsCount || 0,
      icon: FolderKanban,
      color: "text-accent-foreground",
      bgColor: "bg-accent/20",
      href: "/tarefas/tarefas/projects",
    },
    {
      title: "Clientes",
      value: clientsCount || 0,
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
      href: "/tarefas/tarefas/clients",
    },
    {
      title: "Saldo",
      value: `R$ ${balance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: "text-accent-foreground",
      bgColor: "bg-accent/20",
      href: "/tarefas/tarefas/financial",
    },
  ]

  return (
    <div className="space-y-4 lg:space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm lg:text-base text-muted-foreground">Visão geral do sistema de gestão</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-3 lg:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.title} href={stat.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-xl lg:text-2xl font-bold text-card-foreground">{stat.value}</div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:gap-6 grid-cols-1 lg:grid-cols-2">
        <TasksStatusChart data={tasksChartData} />
        <LeadsStatusChart data={leadsChartData} />
      </div>

      <RevenueChart data={monthlyData} />

      {/* Alerts and Activities */}
      <div className="grid gap-4 lg:gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base lg:text-lg text-card-foreground flex items-center gap-2">
              <Clock className="h-4 w-4 lg:h-5 lg:w-5" />
              Tarefas Próximas do Vencimento
            </CardTitle>
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
        <Card>
          <CardHeader>
            <CardTitle className="text-base lg:text-lg text-card-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4 lg:h-5 lg:w-5" />
              Atividades Recentes
            </CardTitle>
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
              <Link href="/tarefas/tarefas/tasks/new">
                <Badge className="cursor-pointer hover:bg-primary/80">Criar Tarefa</Badge>
              </Link>
              <Link href="/tarefas/tarefas/projects/new">
                <Badge className="cursor-pointer hover:bg-primary/80">Criar Projeto</Badge>
              </Link>
              <Link href="/tarefas/tarefas/leads/new">
                <Badge className="cursor-pointer hover:bg-primary/80">Criar Lead</Badge>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
