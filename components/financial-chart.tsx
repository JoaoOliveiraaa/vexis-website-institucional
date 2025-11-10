"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { useMemo } from "react"

interface FinancialRecord {
  id: string
  type: string
  amount: number
  date: string
  category: string
}

interface FinancialChartProps {
  records: FinancialRecord[]
}

export function FinancialChart({ records }: FinancialChartProps) {
  const chartData = useMemo(() => {
    // Group by month
    const monthlyData = new Map<string, { income: number; expense: number }>()

    records.forEach((record) => {
      const date = new Date(record.date)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`

      if (!monthlyData.has(monthKey)) {
        monthlyData.set(monthKey, { income: 0, expense: 0 })
      }

      const data = monthlyData.get(monthKey)!
      if (record.type === "income") {
        data.income += Number(record.amount)
      } else {
        data.expense += Number(record.amount)
      }
    })

    // Convert to array and sort by date
    return Array.from(monthlyData.entries())
      .map(([month, data]) => ({
        month: new Date(month + "-01").toLocaleDateString("pt-BR", { month: "short", year: "numeric" }),
        income: data.income,
        expense: data.expense,
      }))
      .sort((a, b) => a.month.localeCompare(b.month))
      .slice(-6)
  }, [records])

  return (
    <Card className="border border-border/60 bg-card/95 shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-base lg:text-lg text-card-foreground">
          Receitas vs Despesas (Últimos 6 Meses)
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Compare o fluxo financeiro mensal para ajustar investimentos e cortes.
        </p>
      </CardHeader>
      <CardContent className="pt-4">
        <ChartContainer
          id="financial-bar"
          config={{
            income: { label: "Receitas", color: "var(--primary)" },
            expense: { label: "Despesas", color: "var(--accent)" },
          }}
          className="h-[320px] w-full"
        >
          <BarChart data={chartData} barGap={12}>
            <defs>
              <linearGradient id="financialIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-income)" stopOpacity={0.9} />
                <stop offset="95%" stopColor="var(--color-income)" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="financialExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-expense)" stopOpacity={0.9} />
                <stop offset="95%" stopColor="var(--color-expense)" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" className="stroke-border/60" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `R$ ${value / 1000}k`} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => `R$ ${Number(value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
                  hideLabel
                />
              }
            />
            <ChartLegend
              verticalAlign="top"
              align="right"
              content={<ChartLegendContent className="pb-4 justify-end" />}
            />
            <Bar dataKey="income" fill="url(#financialIncome)" radius={[12, 12, 4, 4]} />
            <Bar dataKey="expense" fill="url(#financialExpense)" radius={[12, 12, 4, 4]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
