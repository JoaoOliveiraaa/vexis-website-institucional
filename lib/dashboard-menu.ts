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
  UserCheck,
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
      },
      {
        title: "Minhas tarefas",
        href: "/tarefas/tasks/my",
        icon: UserCheck,
      },
      {
        title: "Projetos",
        href: "/tarefas/projects",
        icon: FolderKanban,
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
      },
      {
        title: "Clientes",
        href: "/tarefas/clients",
        icon: Building2,
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
      },
      {
        title: "Relatórios",
        href: "/tarefas/reports",
        icon: BarChart3,
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
    },
    {
      title: "Usuários",
      href: "/tarefas/users",
      icon: UserCog,
    },
    {
      title: "Configurações",
      href: "/tarefas/settings",
      icon: Settings,
    },
  ],
}

export const getDashboardSections = (userRole: string): DashboardSection[] => {
  if (userRole === "admin") {
    return [...baseSections, adminSection]
  }
  return baseSections
}

