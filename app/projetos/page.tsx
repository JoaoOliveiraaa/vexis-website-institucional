"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, ArrowLeft } from "lucide-react"
import Link from "next/link"

const allProjects = [
  {
    title: "Agende Beauty",
    description: "Sistema completo de agendamento para salões de beleza com automação via WhatsApp e gestão integrada",
    image: "/agendebeauty.png",
    tags: ["Next.js", "N8N", "IA", "WhatsApp API"],
    category: "Sistema + IA",
    link: "/projetos/agende-beauty",
    featured: true,
  },
  {
    title: "Oficina System",
    description: "Sistema de gestão para oficinas mecânicas com controle de estoque, ordens de serviço e automação",
    image: "/oficinasystem.png",
    tags: ["Next.js", "IA", "WhatsApp API", "Automação"],
    category: "Sistema + IA",
    link: "/projetos/oficina-system",
    featured: true,
  },
  {
    title: "E-commerce Platform",
    description: "Plataforma completa de e-commerce com gestão de produtos, pagamentos e logística integrada",
    image: "/modern-ecommerce-dashboard.png",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    category: "E-commerce",
  },
  {
    title: "Healthcare App",
    description: "Aplicativo de saúde para agendamento de consultas e telemedicina com prontuário eletrônico",
    image: "/healthcare-mobile-app.jpg",
    tags: ["React Native", "Node.js", "PostgreSQL", "WebRTC"],
    category: "Aplicativo",
  },
  {
    title: "Analytics Dashboard",
    description: "Dashboard de analytics em tempo real com visualizações interativas e relatórios personalizados",
    image: "/analytics-dashboard-dark.jpg",
    tags: ["React", "D3.js", "WebSocket", "Redis"],
    category: "Sistema",
  },
  {
    title: "Sistema de Gestão Escolar",
    description: "ERP completo para gestão de instituições de ensino com módulos de matrícula, financeiro e pedagógico",
    image: "/school-management-dashboard.png",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Tailwind"],
    category: "Sistema",
  },
  {
    title: "App de Delivery",
    description: "Aplicativo de delivery com rastreamento em tempo real, pagamentos integrados e gestão de pedidos",
    image: "/food-delivery-app-interface.png",
    tags: ["React Native", "Firebase", "Google Maps", "Stripe"],
    category: "Aplicativo",
  },
  {
    title: "Loja Virtual de Moda",
    description: "E-commerce de moda com lookbook interativo, provador virtual e recomendações personalizadas",
    image: "/fashion-ecommerce-website.png",
    tags: ["Next.js", "Shopify", "AI", "Tailwind"],
    category: "E-commerce",
  },
  {
    title: "CRM Imobiliário",
    description: "Sistema de gestão de relacionamento com clientes para imobiliárias com funil de vendas e automações",
    image: "/real-estate-crm-dashboard.jpg",
    tags: ["React", "Node.js", "MongoDB", "WhatsApp API"],
    category: "Sistema",
  },
  {
    title: "Portal de Notícias",
    description: "Portal de notícias com CMS personalizado, sistema de comentários e newsletter automatizada",
    image: "/news-portal-website.png",
    tags: ["Next.js", "Sanity", "Vercel", "SendGrid"],
    category: "Site",
  },
  {
    title: "App Fitness",
    description: "Aplicativo de treinos personalizados com acompanhamento de evolução e planos nutricionais",
    image: "/fitness-app-workout-tracker.jpg",
    tags: ["React Native", "Firebase", "HealthKit", "Charts"],
    category: "Aplicativo",
  },
]

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para Home
            </Link>

            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
                Nossos Projetos
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground text-pretty leading-relaxed">
                Explore nossa coleção de projetos, aplicativos e serviços desenvolvidos com excelência e tecnologia de
                ponta
              </p>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProjects.map((project, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border/50 flex flex-col"
              >
                <div className="aspect-video relative overflow-hidden bg-muted">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                  <Badge className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm">{project.category}</Badge>
                </div>
                <div className="p-6 space-y-4 flex-1 flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {project.link ? (
                    <Link href={project.link} className="w-full">
                      <Button variant="ghost" className="w-full group mt-auto">
                        Ver Detalhes
                        <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  ) : (
                    <Button variant="ghost" className="w-full group mt-auto" disabled>
                      Ver Detalhes
                      <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <Card className="p-12 bg-gradient-to-br from-primary/5 via-primary/10 to-accent/5 border-primary/20">
              <h2 className="text-3xl font-bold mb-4">Tem um projeto em mente?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Vamos transformar sua ideia em realidade com tecnologia de ponta e design excepcional
              </p>
              <Link href="/#contato">
                <Button size="lg" className="text-base px-8">
                  Fale Conosco
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
