"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-ueQtNpKhisOy3kQnA35pKR2Dhl8NJQ.jpg"
                alt="VEXIS Logo"
                className="w-8 h-8 object-contain"
              />
            </div>
            <span className="text-2xl font-bold text-foreground tracking-tight">VEXIS</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-foreground hover:text-secondary transition-colors duration-300 font-medium">
              Home
            </a>
            <a
              href="#servicos"
              className="text-foreground hover:text-secondary transition-colors duration-300 font-medium"
            >
              Serviços
            </a>
            <a
              href="#portfolio"
              className="text-foreground hover:text-secondary transition-colors duration-300 font-medium"
            >
              Portfólio
            </a>
            <a
              href="#sobre"
              className="text-foreground hover:text-secondary transition-colors duration-300 font-medium"
            >
              Sobre
            </a>
            <a
              href="#contato"
              className="text-foreground hover:text-secondary transition-colors duration-300 font-medium"
            >
              Contato
            </a>
          </nav>

          <div className="hidden md:block">
            <Button className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:from-primary/90 hover:to-secondary/90 px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              Solicitar Orçamento
            </Button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} className="text-foreground" /> : <Menu size={24} className="text-foreground" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-border/50 bg-background/95 backdrop-blur-md">
            <nav className="flex flex-col space-y-4">
              <a
                href="#home"
                className="text-foreground hover:text-secondary transition-colors duration-300 font-medium py-2"
              >
                Home
              </a>
              <a
                href="#servicos"
                className="text-foreground hover:text-secondary transition-colors duration-300 font-medium py-2"
              >
                Serviços
              </a>
              <a
                href="#portfolio"
                className="text-foreground hover:text-secondary transition-colors duration-300 font-medium py-2"
              >
                Portfólio
              </a>
              <a
                href="#sobre"
                className="text-foreground hover:text-secondary transition-colors duration-300 font-medium py-2"
              >
                Sobre
              </a>
              <a
                href="#contato"
                className="text-foreground hover:text-secondary transition-colors duration-300 font-medium py-2"
              >
                Contato
              </a>
              <Button className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:from-primary/90 hover:to-secondary/90 w-full mt-4 rounded-full">
                Solicitar Orçamento
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
