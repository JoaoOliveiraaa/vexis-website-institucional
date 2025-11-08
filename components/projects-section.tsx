"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const projects = [
  {
    title: "E-commerce Platform",
    description: "Plataforma completa de e-commerce com gestão de produtos, pagamentos e logística",
    image: "/modern-ecommerce-dashboard.png",
    tags: ["Next.js", "TypeScript", "Stripe"],
  },
  {
    title: "Healthcare App",
    description: "Aplicativo de saúde para agendamento de consultas e telemedicina",
    image: "/healthcare-mobile-app.jpg",
    tags: ["React Native", "Node.js", "PostgreSQL"],
  },
  {
    title: "Analytics Dashboard",
    description: "Dashboard de analytics em tempo real com visualizações interativas",
    image: "/analytics-dashboard-dark.jpg",
    tags: ["React", "D3.js", "WebSocket"],
  },
]

export function ProjectsSection() {
  return (
    <section id="projetos" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-balance">
            Projetos em Destaque
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Conheça alguns dos projetos que desenvolvemos com excelência
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border/50"
            >
              <div className="aspect-video relative overflow-hidden bg-muted">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                  quality={85}
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button variant="ghost" className="w-full group">
                  Ver Projeto
                  <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/projetos">
            <Button size="lg" variant="outline" className="group bg-transparent">
              Ver Todos os Projetos
              <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
