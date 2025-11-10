import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReportsCharts } from "@/components/reports-charts"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  BarChart3,
  Rocket,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export const dynamic = 'force-dynamic'

export default async function ReportsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch financial data
  const { data: financialRecords } = await supabase
    .from("financial_records")
    .select("*")
    .order("date", { ascending: false })

  const totalRevenue = financialRecords?.filter((r) => r.type === "receita" || r.type === "income").reduce((sum, r) => sum + r.amount, 0) || 0

  const totalExpenses =
    financialRecords?.filter((r) => r.type === "despesa" || r.type === "expense").reduce((sum, r) => sum + r.amount, 0) || 0

  const profit = totalRevenue - totalExpenses

  // Fetch tasks data
  const { data: tasks } = await supabase.from("tasks").select("*")

  const completedTasks = tasks?.filter((t) => t.status === "done").length || 0
  const pendingTasks = tasks?.filter((t) => t.status !== "done" && t.status !== "cancelado").length || 0

  // Fetch clients data
  const { data: clients } = await supabase.from("clients").select("*")

  const activeClients = clients?.filter((c) => c.status === "ativo").length || 0
  const totalClients = clients?.length || 0

  const brandGradient = "from-primary via-[oklch(0.6_0.19_240)] to-accent"

  const overviewCards = [
    {
      title: "Receita total",
      value: new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(totalRevenue),
      description: "Entradas consolidadas no período analisado.",
      icon: DollarSign,
      accent: brandGradient,
      pill: "Financeiro",
    },
    {
      title: "Lucro líquido",
      value: new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(profit),
      description: "Receitas menos despesas acumuladas.",
      icon: TrendingUp,
      accent: brandGradient,
      pill: profit >= 0 ? "Positivo" : "Atenção",
    },
    {
      title: "Tarefas concluídas",
      value: completedTasks,
      description: `${pendingTasks} tarefas ainda em andamento.`,
      icon: CheckCircle2,
      accent: brandGradient,
      pill: "Operações",
    },
    {
      title: "Clientes ativos",
      value: activeClients,
      description: `Base total com ${totalClients} contas.`,
      icon: Users,
      accent: brandGradient,
      pill: "Relacionamento",
    },
  ]

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/95 via-[oklch(0.6_0.19_240)]/90 to-accent/95 px-8 py-10 text-white shadow-lg">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_60%)] opacity-70" />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <Badge variant="outline" className="border-white/30 bg-white/10 text-white backdrop-blur">
              Central de Insights
            </Badge>
            <h1 className="text-3xl font-semibold tracking-tight lg:text-4xl">
              Conecte marketing, operações e finanças numa só narrativa de resultados.
            </h1>
            <p className="max-w-2xl text-sm text-white/80 lg:text-base">
              Explore indicadores-chave, identifique tendências e priorize decisões com os relatórios estratégicos do
              seu hub interno.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-white/80">
              <div className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2">
                <BarChart3 className="h-4 w-4" />
                Performance consolidada do trimestre
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2">
                <Rocket className="h-4 w-4" />
                KPIs integrados de squads e financeiro
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-6 text-sm text-white/80 backdrop-blur-lg lg:max-w-sm">
            <p className="text-base font-semibold text-white">Próxima ação</p>
            <p>
              Ajuste o plano mensal com base nos insights de lucro e produtividade para potencializar o próximo ciclo.
            </p>
            <Link
              href="/tarefas/reports"
              className="inline-flex items-center gap-2 text-sm font-medium text-white transition hover:opacity-80"
            >
              Baixar relatório completo
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-foreground">Indicadores gerais</h2>
          <p className="text-sm text-muted-foreground">
            Acompanhe as principais métricas que conectam negócios e entrega.
          </p>
        </div>
        <Button className="shadow-lg" asChild>
          <Link href="/tarefas/financial/new">
            Registrar movimento financeiro
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewCards.map((card) => {
          const Icon = card.icon
          return (
            <Card key={card.title} className="border border-border/60 bg-card/95 shadow-sm">
              <CardContent className="flex flex-col gap-3 px-5 py-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {card.title}
                    </p>
                    <p className="text-2xl font-semibold text-card-foreground">{card.value}</p>
                  </div>
                  <div className={cn("rounded-2xl bg-gradient-to-br p-2 text-white shadow-lg", card.accent)}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{card.description}</span>
                  <Badge variant="outline" className="rounded-full border-border/60 bg-background px-2 py-1 text-[10px]">
                    {card.pill}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Tabs defaultValue="financial" className="space-y-5">
        <TabsList className="inline-flex gap-2 rounded-full border border-border/60 bg-card/70 p-1 text-sm">
          <TabsTrigger value="financial" className="rounded-full px-4 py-2">
            Financeiro
          </TabsTrigger>
          <TabsTrigger value="productivity" className="rounded-full px-4 py-2">
            Produtividade
          </TabsTrigger>
          <TabsTrigger value="clients" className="rounded-full px-4 py-2">
            Clientes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="financial" className="space-y-4">
          <Card className="border border-border/60 bg-card/95 shadow-sm">
            <CardHeader>
              <CardTitle>Análise Financeira</CardTitle>
              <CardDescription>Receitas, despesas e lucro ao longo do tempo</CardDescription>
            </CardHeader>
            <CardContent>
              <ReportsCharts type="financial" data={financialRecords || []} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="productivity" className="space-y-4">
          <Card className="border border-border/60 bg-card/95 shadow-sm">
            <CardHeader>
              <CardTitle>Produtividade</CardTitle>
              <CardDescription>Análise de tarefas e projetos</CardDescription>
            </CardHeader>
            <CardContent>
              <ReportsCharts type="productivity" data={tasks || []} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients" className="space-y-4">
          <Card className="border border-border/60 bg-card/95 shadow-sm">
            <CardHeader>
              <CardTitle>Análise de Clientes</CardTitle>
              <CardDescription>Crescimento e retenção de clientes</CardDescription>
            </CardHeader>
            <CardContent>
              <ReportsCharts type="clients" data={clients || []} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

