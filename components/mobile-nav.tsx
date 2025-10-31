"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  CheckSquare,
  FolderKanban,
  Users,
  DollarSign,
  Settings,
  UserCog,
  Building2,
  BarChart3,
  Plug,
} from "lucide-react"
import Image from "next/image"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"

interface MobileNavProps {
  userRole: string
}

export function MobileNav({ userRole }: MobileNavProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const navItems = [
    {
      title: "Dashboard",
      href: "/tarefas",
      icon: LayoutDashboard,
    },
    {
      title: "Tarefas",
      href: "/tarefas/tasks",
      icon: CheckSquare,
    },
    {
      title: "Projetos",
      href: "/tarefas/projects",
      icon: FolderKanban,
    },
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
  ]

  const adminItems = [
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
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%281%29-wOYbYYaL7fwcyhIZM308jfylREAGrO.png"
              alt="Vexis Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-br from-primary via-[oklch(0.6_0.19_240)] to-accent bg-clip-text text-transparent">
                Vexis
              </h1>
              <p className="text-sm text-muted-foreground">Gestão Interna</p>
            </div>
          </div>
        </div>
        <nav className="px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-l-2 border-primary"
                    : "text-muted-foreground hover:bg-accent/10 hover:text-accent",
                )}
              >
                <Icon className="h-5 w-5" />
                {item.title}
              </Link>
            )
          })}
          {userRole === "admin" && (
            <>
              <div className="my-4 border-t" />
              {adminItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-l-2 border-primary"
                        : "text-muted-foreground hover:bg-accent/10 hover:text-accent",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.title}
                  </Link>
                )
              })}
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
