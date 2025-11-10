"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LogOut, Search, User, Download } from "lucide-react"
import { useRouter } from "next/navigation"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import { ThemeToggle } from "@/components/theme-toggle"
import { NotificationsDropdown } from "@/components/notifications-dropdown"
import { MobileNav } from "@/components/mobile-nav"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"

interface DashboardHeaderProps {
  user: SupabaseUser
  profile: {
    full_name: string
    email: string
    role: string
    niche?: string | null
  } | null
}

export function DashboardHeader({ user, profile }: DashboardHeaderProps) {
  const router = useRouter()
  const supabase = createClient()
  const [searchTerm, setSearchTerm] = useState("")
  const [isExporting, setIsExporting] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/auth/login")
    router.refresh()
  }

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!searchTerm.trim()) return
    router.push(`/tarefas/search?q=${encodeURIComponent(searchTerm.trim())}`)
    setSearchTerm("")
  }

  const handleExport = async () => {
    try {
      setIsExporting(true)
      const response = await fetch("/api/reports/export")

      if (!response.ok) {
        throw new Error("Falha ao gerar relatório")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `vexis-relatorio-${new Date().toISOString().slice(0, 10)}.pdf`
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
      toast({
        title: "Relatório exportado",
        description: "O PDF com o resumo do dashboard foi baixado.",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Erro ao exportar",
        description: "Não foi possível gerar o relatório em PDF.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const initials =
    profile?.full_name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U"

  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-3 lg:gap-4">
        <MobileNav userRole={profile?.role || "user"} />
        <div>
          <h2 className="text-base lg:text-lg font-semibold">Sistema de Gestão</h2>
          {profile?.niche && (
            <p className="text-xs text-muted-foreground capitalize">{profile.niche}</p>
          )}
        </div>
      </div>
      <div className="hidden md:flex flex-1 items-center justify-center px-6">
        <form
          onSubmit={handleSearch}
          className="flex w-full max-w-xl items-center rounded-lg border border-input bg-background px-3 text-sm shadow-sm"
        >
          <Search className="mr-2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Pesquisar por tarefas, projetos, leads..."
            className="h-9 border-0 px-0 focus-visible:ring-0"
          />
        </form>
      </div>
      <div className="flex items-center gap-1 lg:gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          disabled={isExporting}
          className="hidden sm:inline-flex"
        >
          <Download className="mr-2 h-4 w-4" />
          {isExporting ? "Gerando..." : "Exportar PDF"}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleExport}
          disabled={isExporting}
          className="sm:hidden"
        >
          <Download className="h-4 w-4" />
        </Button>
        <ThemeToggle />
        <NotificationsDropdown />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 lg:h-10 lg:w-10 rounded-full">
              <Avatar>
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{profile?.full_name || "Usuário"}</p>
                <p className="text-xs text-muted-foreground">{profile?.email || user.email}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {(profile?.role || "user") + (profile?.niche ? ` • ${profile.niche}` : "")}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Perfil
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
