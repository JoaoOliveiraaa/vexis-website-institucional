import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckSquare, Users, UserCircle, ClipboardList } from "lucide-react"

interface DashboardStatsProps {
  tasksCount: number
  leadsCount: number
  usersCount: number
  myTasksCount: number
  isAdmin: boolean
}

export function DashboardStats({ tasksCount, leadsCount, usersCount, myTasksCount, isAdmin }: DashboardStatsProps) {
  const stats = [
    {
      title: "Minhas Tarefas",
      value: myTasksCount,
      icon: ClipboardList,
      description: "Tarefas atribuídas a você",
    },
    {
      title: "Total de Tarefas",
      value: tasksCount,
      icon: CheckSquare,
      description: "Todas as tarefas do sistema",
    },
    {
      title: "Leads",
      value: leadsCount,
      icon: Users,
      description: "Potenciais clientes",
    },
  ]

  if (isAdmin) {
    stats.push({
      title: "Usuários",
      value: usersCount,
      icon: UserCircle,
      description: "Usuários cadastrados",
    })
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            <p className="text-xs text-slate-600 mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
