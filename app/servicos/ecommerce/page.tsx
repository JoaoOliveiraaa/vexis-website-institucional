import { ModernHeader } from "@/components/modern-header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, ShoppingCart, CreditCard, Package, TrendingUp } from "lucide-react"

export default function EcommercePage() {
  const features = [
    "Catálogo de produtos completo",
    "Carrinho de compras inteligente",
    "Múltiplas formas de pagamento",
    "Integração com gateways de pagamento",
    "Sistema de gestão de estoque",
    "Painel administrativo completo",
    "Cálculo automático de frete",
    "Cupons de desconto",
    "Sistema de avaliações",
    "Relatórios de vendas detalhados",
    "Integração com redes sociais",
    "Email marketing automatizado",
  ]

  const benefits = [
    {
      icon: ShoppingCart,
      title: "Vendas 24/7",
      description: "Sua loja aberta o tempo todo, vendendo enquanto você dorme.",
    },
    {
      icon: CreditCard,
      title: "Pagamentos Seguros",
      description: "Integração com principais gateways de pagamento do mercado.",
    },
    {
      icon: Package,
      title: "Gestão Completa",
      description: "Controle total de produtos, estoque, pedidos e entregas.",
    },
    {
      icon: TrendingUp,
      title: "Escalabilidade",
      description: "Plataforma que cresce junto com seu negócio.",
    },
  ]

  return (
    <main className="min-h-screen">
      <ModernHeader />

      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-[#0D1B2A] via-[#1B2A3A] to-background">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute top-10 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4" variant="secondary">
                E-commerce
              </Badge>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance text-white">
                Loja Virtual <span className="text-primary">Completa</span> para seu Negócio
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8 text-pretty">
                Desenvolvemos lojas virtuais profissionais e completas, com todos os recursos necessários para vender
                online com segurança e eficiência.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <a href="https://wa.me/5516997741702" target="_blank" rel="noopener noreferrer">
                    Solicitar Orçamento
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/portfolio">Ver Exemplos</a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-8 flex items-center justify-center">
                <ShoppingCart className="w-48 h-48 text-primary/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Vantagens do E-commerce</h2>
            <p className="text-lg text-muted-foreground">
              Expanda seu negócio e alcance clientes em todo o Brasil com uma loja virtual profissional
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow border-2">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading text-lg font-bold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Recursos Incluídos</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Sua loja virtual completa com todos os recursos necessários para vender online com sucesso.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
              <CardContent className="p-8">
                <h3 className="font-heading text-2xl font-bold mb-4">Pronto para Vender Online?</h3>
                <p className="mb-6 opacity-90">
                  Entre em contato e receba uma proposta personalizada para sua loja virtual. Vamos criar um e-commerce
                  que vende!
                </p>
                <Button size="lg" className="w-full bg-background text-foreground hover:bg-background/90" asChild>
                  <a href="https://wa.me/5516997741702" target="_blank" rel="noopener noreferrer">
                    Falar com Especialista
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
