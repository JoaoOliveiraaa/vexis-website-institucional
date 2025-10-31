import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, TrendingUp, TrendingDown, DollarSign } from "lucide-react"
import Link from "next/link"
import { FinancialChart } from "@/components/financial-chart"
import { FinancialTable } from "@/components/financial-table"

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Financeiro</h1>
          <p className="text-muted-foreground">Controle suas receitas e despesas</p>
        </div>
        <Link href="/tarefas/tarefas/financial/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Registro
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Receitas Totais</CardTitle>
            <div className="p-2 rounded-lg bg-green-50 dark:bg-green-950">
              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              R$ {totalIncome.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Despesas Totais</CardTitle>
            <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950">
              <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              R$ {totalExpense.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Saldo</CardTitle>
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950">
              <DollarSign className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${balance >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
            >
              R$ {balance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Mês Atual</CardTitle>
            <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950">
              <DollarSign className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${monthIncome - monthExpense >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
            >
              R$ {(monthIncome - monthExpense).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>
      </div>

      <FinancialChart records={records || []} />

      <FinancialTable records={records || []} />
    </div>
  )
}
