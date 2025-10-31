"use client"

import { useMemo } from "react"
import { Line, LineChart, Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { format, startOfMonth, subMonths } from "date-fns"
import { ptBR } from "date-fns/locale"

interface ReportsChartsProps {
  type: "financial" | "productivity" | "clients"
  data: any[]
}

export function ReportsCharts({ type, data }: ReportsChartsProps) {
  const chartData = useMemo(() => {
    if (type === "financial") {
      // Group by month
      const last6Months = Array.from({ length: 6 }, (_, i) => {
        const date = subMonths(new Date(), 5 - i)
        return startOfMonth(date)
      })

      return last6Months.map((month) => {
        const monthStr = format(month, "yyyy-MM")
        const monthRecords = data.filter((r) => r.date?.startsWith(monthStr))

        const receita = monthRecords.filter((r) => r.type === "receita").reduce((sum, r) => sum + r.amount, 0)

        const despesa = monthRecords.filter((r) => r.type === "despesa").reduce((sum, r) => sum + r.amount, 0)

        return {
          month: format(month, "MMM", { locale: ptBR }),
          receita,
          despesa,
          lucro: receita - despesa,
        }
      })
    }

    if (type === "productivity") {
      const statusCount = data.reduce(
        (acc, task) => {
          acc[task.status] = (acc[task.status] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      )

      return Object.entries(statusCount).map(([status, count]) => ({
        status: status.charAt(0).toUpperCase() + status.slice(1),
        count,
      }))
    }

    if (type === "clients") {
      // Group by month
      const last6Months = Array.from({ length: 6 }, (_, i) => {
        const date = subMonths(new Date(), 5 - i)
        return startOfMonth(date)
      })

      return last6Months.map((month) => {
        const monthStr = format(month, "yyyy-MM")
        const newClients = data.filter((c) => c.created_at?.startsWith(monthStr)).length

        return {
          month: format(month, "MMM", { locale: ptBR }),
          novos: newClients,
        }
      })
    }

    return []
  }, [type, data])

  if (type === "financial") {
    return (
      <ChartContainer
        config={{
          receita: {
            label: "Receita",
            color: "hsl(var(--chart-1))",
          },
          despesa: {
            label: "Despesa",
            color: "hsl(var(--chart-2))",
          },
          lucro: {
            label: "Lucro",
            color: "hsl(var(--chart-3))",
          },
        }}
        className="h-[400px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Line type="monotone" dataKey="receita" stroke="var(--color-receita)" strokeWidth={2} />
            <Line type="monotone" dataKey="despesa" stroke="var(--color-despesa)" strokeWidth={2} />
            <Line type="monotone" dataKey="lucro" stroke="var(--color-lucro)" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    )
  }

  if (type === "productivity") {
    const COLORS = [
      "hsl(var(--chart-1))",
      "hsl(var(--chart-2))",
      "hsl(var(--chart-3))",
      "hsl(var(--chart-4))",
      "hsl(var(--chart-5))",
    ]

    return (
      <ChartContainer
        config={{
          count: {
            label: "Tarefas",
          },
        }}
        className="h-[400px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="count" fill="hsl(var(--chart-1))" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    )
  }

  if (type === "clients") {
    return (
      <ChartContainer
        config={{
          novos: {
            label: "Novos Clientes",
            color: "hsl(var(--chart-1))",
          },
        }}
        className="h-[400px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Line type="monotone" dataKey="novos" stroke="var(--color-novos)" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    )
  }

  return null
}
