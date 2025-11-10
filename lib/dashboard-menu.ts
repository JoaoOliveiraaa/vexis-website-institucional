import type React from "react"
import {
  LayoutDashboard,
  CheckSquare,
  FolderKanban,
  Users,
  Building2,
  DollarSign,
  BarChart3,
  Plug,
  UserCog,
  Settings,
} from "lucide-react"

export type DashboardNavItem = {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  description?: string
  badge?: string
}

export type DashboardSection = {
  title: string
  niche: string
  items: DashboardNavItem[]
}

export const baseSections: DashboardSection[] = [
  {
    title: "Visão Geral",
    niche: "Planejamento",
    items: [
      {
        title: "Dashboard",
        href: "/tarefas",
        icon: LayoutDashboard,
        description: "Resumo geral de operações, finanças e equipe",
      },
    ],
  },
  {
    title: "Operações",
    niche: "Desenvolvimento",
    items: [
      {
        title: "Tarefas",
        href: "/tarefas/tasks",
        icon: CheckSquare,
        description: "Tarefas de projetos",
      },
      {
        title: "Projetos",
        href: "/tarefas/projects",
        icon: FolderKanban,
        description: "Projetos e organização de tarefas",
      },
    ],
  },
  {
    title: "Relacionamento",
    niche: "Marketing & Comercial",
    items: [
      {
        title: "Leads",
        href: "/tarefas/leads",
        icon: Users,
        description: "Leads de clientes",
      },
      {
        title: "Clientes",
        href: "/tarefas/clients",
        icon: Building2,
        description: "Gestão de contratos, contatos e feedbacks",
      },
    ],
  },
  {
    title: "Financeiro",
    niche: "Administrativo",
    items: [
      {
        title: "Financeiro",
        href: "/tarefas/financial",
        icon: DollarSign,
        description: "Fluxo de caixa, despesas e recebíveis",
      },
      {
        title: "Relatórios",
        href: "/tarefas/reports",
        icon: BarChart3,
        description: "KPIs, indicadores e insights avançados",
      },
    ],
  },
]

export const adminSection: DashboardSection = {
  title: "Administração",
  niche: "Diretoria",
  items: [
    {
      title: "Integrações",
      href: "/tarefas/integrations",
      icon: Plug,
      description: "Conecte ferramentas externas e automações",
    },
    {
      title: "Usuários",
      href: "/tarefas/users",
      icon: UserCog,
      description: "Convites, permissões e estrutura da equipe",
    },
    {
      title: "Configurações",
      href: "/tarefas/settings",
      icon: Settings,
      description: "Preferências gerais e identidade da conta",
    },
  ],
}

export const getDashboardSections = (userRole: string): DashboardSection[] => {
  if (userRole === "admin") {
    return [...baseSections, adminSection]
  }
  return baseSections
}

