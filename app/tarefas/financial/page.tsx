import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, TrendingUp, TrendingDown, DollarSign, ArrowUpRight, PiggyBank, Wallet } from "lucide-react"
import Link from "next/link"
import { FinancialChart } from "@/components/financial-chart"
import { FinancialTable } from "@/components/financial-table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export const dynamic = 'force-dynamic'

export default async function FinancialPage() {
  const supabase = await createClient()

  const { data: records } = await supabase
    .from("financial_records")
    .select(
      `
      *,
      created_by_profile:profiles!financial_records_created_by_fkey(id, full_name),
      project:projects(id, name)
    `,
    )
    .order("date", { ascending: false })

  // Calculate totals
  const totalIncome = records?.filter((r) => r.type === "income").reduce((sum, r) => sum + Number(r.amount), 0) || 0
  const totalExpense = records?.filter((r) => r.type === "expense").reduce((sum, r) => sum + Number(r.amount), 0) || 0
  const balance = totalIncome - totalExpense

  // Get current month data
  const now = new Date()
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const monthRecords = records?.filter((r) => new Date(r.date) >= currentMonthStart) || []
  const monthIncome = monthRecords.filter((r) => r.type === "income").reduce((sum, r) => sum + Number(r.amount), 0)
  const monthExpense = monthRecords.filter((r) => r.type === "expense").reduce((sum, r) => sum + Number(r.amount), 0)

  const brandGradient = "from-primary via-[oklch(0.6_0.19_240)] to-accent"

  const metrics = [
    {
      title: "Receitas totais",
      value: `R$ ${totalIncome.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
      description: "Entradas consolidadas desde o início.",
      icon: TrendingUp,
      accent: brandGradient,
    },
    {
      title: "Despesas totais",
      value: `R$ ${totalExpense.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
      description: "Saídas mapeadas no período.",
      icon: TrendingDown,
      accent: brandGradient,
    },
    {
      title: "Saldo geral",
      value: `R$ ${balance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
      description: "Resultado entre entradas e saídas.",
      icon: DollarSign,
      accent: brandGradient,
    },
    {
      title: "Resultado do mês",
      value: `R$ ${(monthIncome - monthExpense).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
      description: "Performance financeira deste mês.",
      icon: DollarSign,
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
              Controle Financeiro
            </Badge>
            <h1 className="text-3xl font-semibold tracking-tight lg:text-4xl">
              Planeje o caixa, projete cenários e mantenha a saúde financeira no radar.
            </h1>
            <p className="max-w-2xl text-sm text-white/80 lg:text-base">
              Acompanhe receitas, despesas e resultados por período. Use dados para decisões rápidas, direcionando
              investimentos com mais segurança.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-white/80">
              <div className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2">
                <PiggyBank className="h-4 w-4" />
                Saldo atual {balance >= 0 ? "positivo" : "negativo"} de R$ {balance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2">
                <Wallet className="h-4 w-4" />
                Mês atual {monthIncome - monthExpense >= 0 ? "superavitário" : "deficitário"}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-6 text-sm text-white/80 backdrop-blur-lg lg:max-w-sm">
            <p className="text-base font-semibold text-white">Dica financeira</p>
            <p>
              Reforce a previsibilidade criando uma reserva equivalente a três meses das despesas fixas.
            </p>
            <Link
              href="/tarefas/financial/new"
              className="inline-flex items-center gap-2 text-sm font-medium text-white transition hover:opacity-80"
            >
              Registrar lançamento
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-foreground">Resumo financeiro</h2>
          <p className="text-sm text-muted-foreground">
            Indicadores principais para manter o fluxo de caixa saudável.
          </p>
        </div>
        <Link href="/tarefas/financial/new">
          <Button className="shadow-lg">
            <Plus className="mr-2 h-4 w-4" />
            Novo registro
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <Card key={metric.title} className="border border-border/60 bg-card/95 shadow-sm">
              <CardContent className="flex flex-col gap-3 px-5 py-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-semibold text-card-foreground">{metric.value}</p>
                  </div>
                  <div className={cn("rounded-2xl bg-gradient-to-br p-2 text-white shadow-lg", metric.accent)}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{metric.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <FinancialChart records={records || []} />

      <FinancialTable records={records || []} />
    </div>
  )
}

