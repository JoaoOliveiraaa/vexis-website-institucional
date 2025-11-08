"use client"

import type React from "react"

import { Moon, Sun, ChevronDown, Sparkles, Menu } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const services = [
  {
    title: "Landing Pages",
    description: "Páginas otimizadas para conversão e captação de leads",
    href: "/servicos/landing-pages",
  },
  {
    title: "Sites Institucionais",
    description: "Presença digital profissional para sua empresa",
    href: "/servicos/sites-institucionais",
  },
  {
    title: "E-commerce",
    description: "Lojas virtuais completas e integradas",
    href: "/servicos/e-commerce",
  },
  {
    title: "Aplicativos",
    description: "Apps mobile e web personalizados",
    href: "/servicos/aplicativos",
  },
  {
    title: "Sistemas Personalizados",
    description: "ERP, CRM, estoque, agendamento e mais",
    href: "/servicos/sistemas-personalizados",
  },
  {
    title: "Identidade Visual",
    description: "Logo, paleta de cores, tipografia e branding",
    href: "/servicos/identidade-visual",
  },
  {
    title: "Tráfego Pago",
    description: "Gestão de campanhas Google Ads e Meta Ads",
    href: "/servicos/trafego-pago",
  },
  {
    title: "Redes Sociais",
    description: "Gestão de Instagram, Facebook, TikTok e WhatsApp",
    href: "/servicos/redes-sociais",
  },
  {
    title: "Fotografia & Vídeo",
    description: "Cobertura de eventos e produção audiovisual",
    href: "/servicos/fotografia-video",
  },
]

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    if (isHomePage) {
      e.preventDefault()
      const element = document.querySelector(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
    setMobileMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Vexis Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <span className="text-xl font-semibold tracking-tight">Vexis</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/#sobre"
              onClick={(e) => handleNavigation(e, "#sobre")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sobre
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors outline-none">
                Serviços
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[320px]">
                {services.map((service, index) => (
                  <DropdownMenuItem key={index} asChild>
                    <Link href={service.href} className="flex flex-col items-start gap-1 p-3">
                      <div className="font-medium">{service.title}</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">{service.description}</div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/automacao-ia" className="relative text-sm font-medium transition-all group">
              <span className="relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gradient-to-r from-purple-500/10 via-violet-500/10 to-cyan-500/10 dark:from-purple-500/20 dark:via-violet-500/20 dark:to-cyan-500/20 border border-purple-500/20 dark:border-purple-500/30 hover:border-purple-500/40 dark:hover:border-purple-500/50 transition-all">
                <Sparkles className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-cyan-600 dark:from-purple-400 dark:via-violet-400 dark:to-cyan-400 bg-clip-text text-transparent font-semibold">
                  IA & Automação
                </span>
              </span>
            </Link>
            <Link
              href="/projetos"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Projetos
            </Link>
            <Link
              href="/#contato"
              onClick={(e) => handleNavigation(e, "#contato")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Contato
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="h-9 w-9"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span className="sr-only">Alternar tema</span>
              </Button>
            )}
            <Button className="hidden sm:inline-flex" asChild>
              <Link href="/#contato" onClick={(e) => handleNavigation(e, "#contato")}>
                Fale Conosco
              </Link>
            </Button>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="mb-6">
                  <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2">
                  <Link
                    href="/#sobre"
                    onClick={(e) => handleNavigation(e, "#sobre")}
                    className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-3 rounded-md hover:bg-accent"
                  >
                    Sobre
                  </Link>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="services" className="border-none">
                      <AccordionTrigger className="text-base font-medium text-muted-foreground hover:text-foreground px-4 py-3 hover:no-underline hover:bg-accent rounded-md">
                        Serviços
                      </AccordionTrigger>
                      <AccordionContent className="pb-0">
                        <div className="flex flex-col gap-1 pl-4 mt-2">
                          {services.map((service, index) => (
                            <Link
                              key={index}
                              href={service.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex flex-col gap-1 py-3 px-4 text-sm hover:text-foreground transition-colors rounded-md hover:bg-accent"
                            >
                              <div className="font-medium">{service.title}</div>
                              <div className="text-xs text-muted-foreground leading-relaxed">{service.description}</div>
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Link
                    href="/automacao-ia"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 mx-4 my-2 py-3 px-4 rounded-md bg-gradient-to-r from-purple-500/10 via-violet-500/10 to-cyan-500/10 dark:from-purple-500/20 dark:via-violet-500/20 dark:to-cyan-500/20 border border-purple-500/20 dark:border-purple-500/30"
                  >
                    <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-cyan-600 dark:from-purple-400 dark:via-violet-400 dark:to-cyan-400 bg-clip-text text-transparent font-semibold">
                      IA & Automação
                    </span>
                  </Link>

                  <Link
                    href="/projetos"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-3 rounded-md hover:bg-accent"
                  >
                    Projetos
                  </Link>

                  <Link
                    href="/#contato"
                    onClick={(e) => handleNavigation(e, "#contato")}
                    className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-3 rounded-md hover:bg-accent"
                  >
                    Contato
                  </Link>

                  <Button className="mt-6 mx-4 w-auto" asChild>
                    <Link href="/#contato" onClick={(e) => handleNavigation(e, "#contato")}>
                      Fale Conosco
                    </Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
