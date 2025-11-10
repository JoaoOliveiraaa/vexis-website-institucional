"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getDashboardSections } from "@/lib/dashboard-menu"
import { Menu, Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileNavProps {
  userRole: string
}

export function MobileNav({ userRole }: MobileNavProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  const sections = useMemo(() => {
    if (!query.trim()) return getDashboardSections(userRole)
    const q = query.toLowerCase()
    return getDashboardSections(userRole)
      .map((section) => ({
        ...section,
        items: section.items.filter(
          (item) =>
            item.title.toLowerCase().includes(q) ||
            section.niche.toLowerCase().includes(q) ||
            (item.description && item.description.toLowerCase().includes(q)),
        ),
      }))
      .filter((section) => section.items.length > 0)
  }, [query, userRole])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[18rem] p-0">
        <div className="border-b px-5 py-4">
          <div className="flex items-center gap-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%281%29-wOYbYYaL7fwcyhIZM308jfylREAGrO.png"
              alt="Vexis Logo"
              width={36}
              height={36}
              className="rounded-md object-contain"
            />
            <div>
              <h1 className="text-xl font-semibold bg-gradient-to-br from-primary via-[oklch(0.6_0.19_240)] to-accent bg-clip-text text-transparent">
                Vexis Hub
              </h1>
              <p className="text-xs text-muted-foreground">Central de operações</p>
            </div>
          </div>
          <div className="mt-4 flex items-center rounded-lg border border-input bg-background px-3 text-sm">
            <Search className="mr-2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar"
              className="h-9 border-0 px-0 focus-visible:ring-0"
            />
          </div>
        </div>
        <nav className="space-y-6 overflow-y-auto px-3 py-4">
          {sections.map((section) => (
            <div key={section.title} className="space-y-1">
              <div className="px-2">
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground/80">
                  {section.title}
                </p>
                <p className="text-xs font-medium text-primary/80">{section.niche}</p>
              </div>
              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-gradient-to-r from-primary/15 to-accent/15 text-primary"
                        : "text-muted-foreground hover:bg-accent/10 hover:text-foreground",
                    )}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="flex-1">
                      <span className="block font-medium">{item.title}</span>
                      {item.description && (
                        <span className="text-xs text-muted-foreground">{item.description}</span>
                      )}
                    </span>
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
