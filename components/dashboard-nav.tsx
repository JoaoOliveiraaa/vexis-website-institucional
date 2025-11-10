"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { getDashboardSections } from "@/lib/dashboard-menu"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"

interface DashboardNavProps {
  userRole: string
}

export function DashboardNav({ userRole }: DashboardNavProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [navSearch, setNavSearch] = useState("")

  useEffect(() => {
    if (typeof window === "undefined") return
    const stored = window.localStorage.getItem("vexis-sidebar-collapsed")
    if (stored) {
      setCollapsed(stored === "true")
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    window.localStorage.setItem("vexis-sidebar-collapsed", String(collapsed))
  }, [collapsed])

  const menuSections = useMemo(() => {
    const sections = getDashboardSections(userRole)
    if (!navSearch.trim()) {
      return sections
    }
    const query = navSearch.toLowerCase()
    return sections
      .map((section) => ({
        ...section,
        items: section.items.filter(
          (item) =>
            item.title.toLowerCase().includes(query) ||
            section.niche.toLowerCase().includes(query) ||
            (item.description && item.description.toLowerCase().includes(query)),
        ),
      }))
      .filter((section) => section.items.length > 0)
  }, [navSearch, userRole])

  return (
    <aside
      className={cn(
        "hidden lg:flex h-screen sticky top-0 flex-col border-r bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 transition-all duration-300",
        collapsed ? "w-20" : "w-72",
      )}
    >
      <div className="p-5 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%281%29-wOYbYYaL7fwcyhIZM308jfylREAGrO.png"
            alt="Vexis Logo"
            width={36}
            height={36}
            className="object-contain rounded-md"
          />
          {!collapsed && (
            <div className="space-y-0.5">
              <h1 className="text-xl font-semibold bg-gradient-to-br from-primary via-[oklch(0.6_0.19_240)] to-accent bg-clip-text text-transparent">
                Vexis Hub
              </h1>
              <p className="text-xs text-muted-foreground">Central de operações</p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0"
          onClick={() => setCollapsed((prev) => !prev)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {!collapsed && (
        <div className="px-4 py-3">
          <label className="relative flex h-10 items-center rounded-lg border border-input bg-background px-3 text-sm">
            <Search className="mr-2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              value={navSearch}
              onChange={(event) => setNavSearch(event.target.value)}
              placeholder="Busque por páginas, nichos..."
              className="h-8 border-0 px-0 focus-visible:ring-0"
            />
          </label>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {menuSections.map((section) => (
          <div key={section.title} className="space-y-2">
            {!collapsed && (
              <div className="px-2">
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground/80">
                  {section.title}
                </p>
                <p className="text-xs font-medium text-primary/80">{section.niche}</p>
              </div>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                const content = (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all duration-150",
                      isActive
                        ? "bg-gradient-to-r from-primary/15 to-accent/15 text-primary shadow-sm"
                        : "text-muted-foreground hover:bg-accent/10 hover:text-foreground",
                      collapsed ? "justify-center" : "justify-start",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-md border border-transparent bg-primary/10 text-primary transition-all duration-150",
                        isActive && "border-primary bg-primary/20 text-primary-foreground",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    {!collapsed && (
                      <span className="flex-1 text-left leading-tight">
                        <span className="block font-medium">{item.title}</span>
                        {item.description && (
                          <span className="text-xs text-muted-foreground/80">{item.description}</span>
                        )}
                      </span>
                    )}
                    {item.badge && !collapsed && (
                      <span className="rounded-full bg-accent/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-foreground">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )

                if (!collapsed) {
                  return content
                }

                return (
                  <Tooltip key={item.href} delayDuration={100}>
                    <TooltipTrigger asChild>{content}</TooltipTrigger>
                    <TooltipContent side="right" className="max-w-[220px]">
                      <div className="space-y-1">
                        <p className="font-semibold text-sm">{item.title}</p>
                        {item.description && (
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        )}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                )
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  )
}
