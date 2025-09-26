import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"

const portfolioItems = [
  {
    title: "E-commerce Fashion",
    description: "Loja virtual completa com sistema de pagamento integrado e gestão de estoque.",
    image: "/modern-ecommerce-fashion-website.jpg",
    category: "E-commerce",
  },
  {
    title: "Landing Page SaaS",
    description: "Página de conversão para software B2B com foco em geração de leads.",
    image: "/saas-landing-page.png",
    category: "Landing Page",
  },
  {
    title: "Site Institucional",
    description: "Website corporativo para empresa de consultoria com design profissional.",
    image: "/corporate-institutional-website.jpg",
    category: "Site Institucional",
  },
  {
    title: "Dashboard Analytics",
    description: "Painel de controle para análise de dados e métricas de performance.",
    image: "/analytics-dashboard.png",
    category: "Analytics",
  },
  {
    title: "Campanha Tráfego Pago",
    description: "Estratégia completa de Google Ads com ROI de 300% em 3 meses.",
    image: "/digital-marketing-campaign-results.jpg",
    category: "Tráfego Pago",
  },
  {
    title: "App Mobile E-commerce",
    description: "Aplicativo mobile para loja virtual com experiência otimizada.",
    image: "/mobile-ecommerce-app-design.jpg",
    category: "E-commerce",
  },
]

export function PortfolioSection() {
  return (
    <section id="portfolio" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">Nosso Portfólio</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Conheça alguns dos projetos que desenvolvemos e os resultados alcançados para nossos clientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <Card
              key={index}
              className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border hover:border-accent/20"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ExternalLink className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {item.category}
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
