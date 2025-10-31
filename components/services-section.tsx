"use client"

import { Card } from "@/components/ui/card"
import { Globe, Smartphone, Database, Palette, Cloud, Shield } from "lucide-react"

const services = [
  {
    icon: Globe,
    title: "Desenvolvimento Web",
    description: "Sites e aplicações web modernas, responsivas e de alta performance",
  },
  {
    icon: Smartphone,
    title: "Apps Mobile",
    description: "Aplicativos nativos e híbridos para iOS e Android",
  },
  {
    icon: Database,
    title: "Backend & APIs",
    description: "Arquiteturas escaláveis e APIs robustas para seus sistemas",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Interfaces intuitivas e experiências memoráveis para seus usuários",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "Infraestrutura em nuvem e automação de processos",
  },
  {
    icon: Shield,
    title: "Segurança",
    description: "Proteção de dados e conformidade com as melhores práticas",
  },
]

export function ServicesSection() {
  return (
    <section id="servicos" className="py-24 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-balance">
            Nossos Serviços
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Oferecemos soluções completas para transformar sua visão em realidade
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border/50"
            >
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
