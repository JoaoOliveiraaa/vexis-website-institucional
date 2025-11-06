import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReportsCharts } from "@/components/reports-charts"
import { TrendingUp, TrendingDown, DollarSign, Users, CheckCircle2, Clock } from "lucide-react"

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

  const totalRevenue = financialRecords?.filter((r) => r.type === "receita").reduce((sum, r) => sum + r.amount, 0) || 0

  const totalExpenses = financialRecords?.filter((r) => r.type === "despesa").reduce((sum, r) => sum + r.amount, 0) || 0

  const profit = totalRevenue - totalExpenses

  // Fetch tasks data
  const { data: tasks } = await supabase.from("tasks").select("*")

  const completedTasks = tasks?.filter((t) => t.status === "done").length || 0
  const pendingTasks = tasks?.filter((t) => t.status !== "done" && t.status !== "cancelado").length || 0

  // Fetch clients data
  const { data: clients } = await supabase.from("clients").select("*")

  const activeClients = clients?.filter((c) => c.status === "ativo").length || 0
  const totalClients = clients?.length || 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
        <p className="text-muted-foreground">Análise detalhada do desempenho da empresa</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              Todas as receitas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(profit)}
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              {profit >= 0 ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              Receita - Despesas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tarefas Concluídas</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasks}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <Clock className="h-3 w-3" />
              {pendingTasks} pendentes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeClients}</div>
            <p className="text-xs text-muted-foreground">de {totalClients} total</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports */}
      <Tabs defaultValue="financial" className="space-y-4">
        <TabsList>
          <TabsTrigger value="financial">Financeiro</TabsTrigger>
          <TabsTrigger value="productivity">Produtividade</TabsTrigger>
          <TabsTrigger value="clients">Clientes</TabsTrigger>
        </TabsList>

        <TabsContent value="financial" className="space-y-4">
          <Card>
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
          <Card>
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
          <Card>
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
