"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, AreaChart, Area, BarChart, Bar } from "recharts"

interface TasksChartProps {
  data: { status: string; count: number }[]
}

export function TasksStatusChart({ data }: TasksChartProps) {
  const statusMap: Record<
    string,
    { label: string; color: string }
  > = {
    backlog: { label: "Backlog", color: "hsl(221 83% 53%)" },
    todo: { label: "A Fazer", color: "hsl(199 89% 48%)" },
    in_progress: { label: "Em Progresso", color: "hsl(283 83% 53%)" },
    review: { label: "Revisão", color: "hsl(27 96% 61%)" },
    done: { label: "Concluído", color: "hsl(153 60% 45%)" },
  }

  const chartConfig = Object.fromEntries(
    Object.entries(statusMap).map(([key, value]) => [
      key,
      {
        label: value.label,
        color: value.color,
      },
    ]),
  )

  const chartData = data
    .map((item) => ({
      status: item.status,
      label: statusMap[item.status]?.label ?? item.status,
      value: item.count,
      fill: `var(--color-${item.status})`,
    }))
    .filter((item) => item.value > 0)

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-base lg:text-lg text-card-foreground">Tarefas por Status</CardTitle>
        <p className="text-sm text-muted-foreground">
          Visualize a distribuição do fluxo de trabalho e equilibre sua equipe.
        </p>
      </CardHeader>
      <CardContent>
        <ChartContainer
          id="tasks-status"
          config={chartConfig}
          className="mx-auto h-[260px] w-full max-w-[360px]"
        >
          <PieChart>
            <Pie
              data={chartData}
              innerRadius={60}
              outerRadius={105}
              paddingAngle={3}
              cornerRadius={8}
              dataKey="value"
            >
              {chartData.map((entry) => (
                <Cell key={entry.status} fill={entry.fill} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent nameKey="label" hideLabel />} />
            <ChartLegend
              verticalAlign="bottom"
              height={36}
              content={<ChartLegendContent className="pt-4 text-xs sm:text-sm" />}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

interface RevenueChartProps {
  data: { month: string; revenue: number; expenses: number }[]
}

export function RevenueChart({ data }: RevenueChartProps) {
  const chartConfig = {
    revenue: {
      label: "Receita",
      color: "hsl(161 94% 30%)",
    },
    expenses: {
      label: "Despesas",
      color: "hsl(343 81% 58%)",
    },
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-base lg:text-lg text-card-foreground">
          Receita vs Despesas (Últimos 6 Meses)
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Acompanhe o fluxo financeiro com comparativo visual entre entradas e saídas.
        </p>
      </CardHeader>
      <CardContent>
        <ChartContainer
          id="revenue-chart"
          config={chartConfig}
          className="h-[280px] w-full"
        >
          <AreaChart data={data}>
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="fillExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-expenses)" stopOpacity={0.7} />
                <stop offset="95%" stopColor="var(--color-expenses)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" className="stroke-border/60" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `R$ ${value / 1000}k`} />
            <ChartTooltip
              content={<ChartTooltipContent formatter={(value) => `R$ ${Number(value).toLocaleString("pt-BR")}`} />}
            />
            <ChartLegend verticalAlign="top" align="right" content={<ChartLegendContent className="pb-4" />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="var(--color-revenue)"
              fill="url(#fillRevenue)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="var(--color-expenses)"
              fill="url(#fillExpenses)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

interface LeadsChartProps {
  data: { status: string; count: number }[]
}

export function LeadsStatusChart({ data }: LeadsChartProps) {
  const statusMap: Record<string, { label: string; color: string }> = {
    new: { label: "Novo", color: "hsl(199 89% 48%)" },
    contacted: { label: "Contatado", color: "hsl(283 83% 53%)" },
    qualified: { label: "Qualificado", color: "hsl(27 96% 61%)" },
    proposal: { label: "Proposta", color: "hsl(221 83% 53%)" },
    negotiation: { label: "Negociação", color: "hsl(153 60% 45%)" },
    won: { label: "Ganho", color: "hsl(161 94% 30%)" },
    lost: { label: "Perdido", color: "hsl(343 81% 58%)" },
  }

  const chartConfig = Object.fromEntries(
    Object.entries(statusMap).map(([key, value]) => [
      key,
      {
        label: value.label,
        color: value.color,
      },
    ]),
  )

  const chartData = data.map((item) => ({
    status: item.status,
    name: statusMap[item.status]?.label ?? item.status,
    count: item.count,
    fill: `var(--color-${item.status})`,
  }))

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-base lg:text-lg text-card-foreground">Leads por Status</CardTitle>
        <p className="text-sm text-muted-foreground">
          Entenda rapidamente como está a saúde do funil comercial.
        </p>
      </CardHeader>
      <CardContent>
        <ChartContainer
          id="leads-status"
          config={chartConfig}
          className="h-[280px] w-full"
        >
          <BarChart data={chartData} barSize={22}>
            <defs>
              {chartData.map((item) => (
                <linearGradient
                  key={item.status}
                  id={`barGradient-${item.status}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="10%" stopColor={statusMap[item.status]?.color ?? "var(--color-count)"} stopOpacity={0.9} />
                  <stop offset="100%" stopColor={statusMap[item.status]?.color ?? "var(--color-count)"} stopOpacity={0.2} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="4 4" className="stroke-border/60" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
            <Bar
              dataKey="count"
              radius={[10, 10, 10, 10]}
              name="Leads"
              label={{ position: "top", fill: "currentColor", fontSize: 12 }}
            >
              {chartData.map((entry) => (
                <Cell key={entry.status} fill={`url(#barGradient-${entry.status})`} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
