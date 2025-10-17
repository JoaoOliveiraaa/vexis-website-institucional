"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ChevronRight } from "lucide-react"
import { useState } from "react"

const services = [
  {
    title: "Landing Pages",
    href: "/servicos/landing-pages",
    description: "Páginas otimizadas para conversão e captação de leads",
  },
  {
    title: "Sites Institucionais",
    href: "/servicos/sites-institucionais",
    description: "Presença digital profissional para sua empresa",
  },
  {
    title: "E-commerce",
    href: "/servicos/ecommerce",
    description: "Lojas virtuais completas e integradas",
  },
  {
    title: "Aplicativos",
    href: "/servicos/aplicativos",
    description: "Apps mobile e web personalizados",
  },
  {
    title: "Sistemas Personalizados",
    href: "/servicos/sistemas",
    description: "ERP, CRM, estoque, agendamento e mais",
  },
  {
    title: "Identidade Visual",
    href: "/servicos/identidade-visual",
    description: "Logo, paleta de cores, tipografia e branding",
  },
  {
    title: "Tráfego Pago",
    href: "/servicos/trafego-pago",
    description: "Gestão de campanhas Google Ads e Meta Ads",
  },
  {
    title: "Redes Sociais",
    href: "/servicos/redes-sociais",
    description: "Gestão de Instagram, Facebook, TikTok e WhatsApp",
  },
  {
    title: "Fotografia & Vídeo",
    href: "/servicos/midia",
    description: "Cobertura de eventos e produção audiovisual",
  },
]

export function ModernHeader() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-ueQtNpKhisOy3kQnA35pKR2Dhl8NJQ.jpg"
            alt="VEXIS Logo"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="font-heading text-xl font-bold">VEXIS</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  Início
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Serviços</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[600px] gap-3 p-4 md:grid-cols-2">
                  {services.map((service) => (
                    <li key={service.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={service.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none text-foreground">{service.title}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground group-hover:text-foreground">
                            {service.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/portfolio" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  Portfólio
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/sobre" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  Sobre
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/contato" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  Contato
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          <Button asChild className="hidden lg:inline-flex">
            <a href="https://wa.me/5516997741702" target="_blank" rel="noopener noreferrer">
              Solicitar Orçamento
              <ChevronRight className="ml-2 h-4 w-4" />
            </a>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/"
                  className="text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Início
                </Link>

                <div className="space-y-2">
                  <p className="text-lg font-medium">Serviços</p>
                  <div className="pl-4 space-y-2">
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  href="/portfolio"
                  className="text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Portfólio
                </Link>

                <Link
                  href="/sobre"
                  className="text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Sobre
                </Link>

                <Link
                  href="/contato"
                  className="text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Contato
                </Link>

                <Button asChild className="mt-4">
                  <a href="https://wa.me/5516997741702" target="_blank" rel="noopener noreferrer">
                    Solicitar Orçamento
                  </a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
