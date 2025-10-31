"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from "recharts"

interface TasksChartProps {
  data: { status: string; count: number }[]
}

export function TasksStatusChart({ data }: TasksChartProps) {
  const COLORS = {
    backlog: "hsl(var(--muted))",
    todo: "hsl(var(--primary))",
    in_progress: "hsl(var(--accent))",
    review: "hsl(220 70% 50%)",
    done: "hsl(142 76% 36%)",
  }

  const chartData = data.map((item) => ({
    name:
      item.status === "backlog"
        ? "Backlog"
        : item.status === "todo"
          ? "A Fazer"
          : item.status === "in_progress"
            ? "Em Progresso"
            : item.status === "review"
              ? "Revisão"
              : "Concluído",
    value: item.count,
    fill: COLORS[item.status as keyof typeof COLORS] || "hsl(var(--muted))",
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base lg:text-lg text-card-foreground">Tarefas por Status</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            value: {
              label: "Tarefas",
              color: "hsl(var(--primary))",
            },
          }}
          className="h-[250px] lg:h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

interface RevenueChartProps {
  data: { month: string; revenue: number; expenses: number }[]
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base lg:text-lg text-card-foreground">
          Receita vs Despesas (Últimos 6 Meses)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            revenue: {
              label: "Receita",
              color: "hsl(var(--primary))",
            },
            expenses: {
              label: "Despesas",
              color: "hsl(var(--destructive))",
            },
          }}
          className="h-[250px] lg:h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" name="Receita" strokeWidth={2} />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="hsl(var(--destructive))"
                name="Despesas"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

interface LeadsChartProps {
  data: { status: string; count: number }[]
}

export function LeadsStatusChart({ data }: LeadsChartProps) {
  const chartData = data.map((item) => ({
    name:
      item.status === "new"
        ? "Novo"
        : item.status === "contacted"
          ? "Contatado"
          : item.status === "qualified"
            ? "Qualificado"
            : item.status === "proposal"
              ? "Proposta"
              : item.status === "negotiation"
                ? "Negociação"
                : item.status === "won"
                  ? "Ganho"
                  : "Perdido",
    count: item.count,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base lg:text-lg text-card-foreground">Leads por Status</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            count: {
              label: "Leads",
              color: "hsl(var(--accent))",
            },
          }}
          className="h-[250px] lg:h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" fill="hsl(var(--accent))" name="Leads" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
