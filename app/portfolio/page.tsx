import { ModernHeader } from "@/components/modern-header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Image from "next/image"

export default function PortfolioPage() {
  const projects = [
    {
      title: "E-commerce de Moda",
      category: "E-commerce",
      description: "Loja virtual completa com integração de pagamento, gestão de estoque e painel administrativo.",
      image: "/modern-ecommerce-fashion-website.jpg",
      tags: ["Next.js", "Stripe", "Tailwind CSS"],
    },
    {
      title: "Landing Page SaaS",
      category: "Landing Page",
      description: "Página de conversão otimizada para produto SaaS com formulários integrados e analytics.",
      image: "/saas-landing-page.png",
      tags: ["React", "TypeScript", "Analytics"],
    },
    {
      title: "Dashboard Analytics",
      category: "Sistema",
      description: "Sistema de análise de dados com gráficos interativos e relatórios personalizados.",
      image: "/analytics-dashboard.png",
      tags: ["Dashboard", "Charts", "API"],
    },
    {
      title: "Site Institucional Corporativo",
      category: "Site Institucional",
      description: "Website corporativo moderno com CMS integrado e área de notícias.",
      image: "/corporate-institutional-website.jpg",
      tags: ["CMS", "SEO", "Responsive"],
    },
    {
      title: "App Mobile E-commerce",
      category: "Aplicativo",
      description: "Aplicativo mobile para iOS e Android com experiência de compra otimizada.",
      image: "/mobile-ecommerce-app-design.jpg",
      tags: ["React Native", "Mobile", "UX"],
    },
    {
      title: "Campanha de Marketing Digital",
      category: "Tráfego Pago",
      description: "Gestão completa de campanhas Google Ads e Meta Ads com ROI de 400%.",
      image: "/digital-marketing-campaign-results.jpg",
      tags: ["Google Ads", "Meta Ads", "ROI"],
    },
  ]

  const categories = [
    "Todos",
    "E-commerce",
    "Landing Page",
    "Sistema",
    "Site Institucional",
    "Aplicativo",
    "Tráfego Pago",
  ]

  return (
    <main className="min-h-screen">
      <ModernHeader />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-background" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4" variant="secondary">
              Nosso Portfólio
            </Badge>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Projetos que <span className="text-primary">Transformam Negócios</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty">
              Conheça alguns dos projetos que desenvolvemos e os resultados que alcançamos para nossos clientes em
              diferentes segmentos e indústrias.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-3">
                    {project.category}
                  </Badge>
                  <h3 className="font-heading text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="w-full group/btn">
                    Ver Detalhes
                    <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Seu Projeto Pode Ser o Próximo</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Entre em contato e vamos discutir como podemos transformar suas ideias em realidade
            </p>
            <Button size="lg" asChild>
              <a href="https://wa.me/5516997741702" target="_blank" rel="noopener noreferrer">
                Solicitar Orçamento
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
