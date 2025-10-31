"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
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
        Receitas: data.income,
        Despesas: data.expense,
      }))
      .sort((a, b) => a.month.localeCompare(b.month))
      .slice(-6) // Last 6 months
  }, [records])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Receitas vs Despesas (Últimos 6 Meses)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
            <XAxis dataKey="month" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value: number) => `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
            />
            <Legend />
            <Bar dataKey="Receitas" fill="hsl(142, 76%, 36%)" radius={[8, 8, 0, 0]} />
            <Bar dataKey="Despesas" fill="hsl(0, 84%, 60%)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
