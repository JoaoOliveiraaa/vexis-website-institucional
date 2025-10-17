import { ModernHeader } from "@/components/modern-header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Zap, Target, TrendingUp, Sparkles } from "lucide-react"

export default function LandingPagesPage() {
  const features = [
    "Design otimizado para conversão",
    "Formulários de captura de leads",
    "Integração com ferramentas de email marketing",
    "Páginas de agradecimento personalizadas",
    "A/B testing para otimização contínua",
    "Analytics e rastreamento de conversões",
    "Responsivo para todos os dispositivos",
    "SEO otimizado para melhor ranqueamento",
    "Carregamento ultra-rápido",
    "Copywriting persuasivo",
  ]

  const benefits = [
    {
      icon: Target,
      title: "Foco em Conversão",
      description:
        "Cada elemento é estrategicamente posicionado para maximizar as conversões e capturar leads qualificados.",
    },
    {
      icon: Zap,
      title: "Performance Otimizada",
      description:
        "Landing pages ultra-rápidas que carregam em menos de 2 segundos, melhorando a experiência do usuário.",
    },
    {
      icon: TrendingUp,
      title: "Resultados Mensuráveis",
      description:
        "Acompanhe métricas importantes como taxa de conversão, origem do tráfego e comportamento dos visitantes.",
    },
    {
      icon: Sparkles,
      title: "Design Impactante",
      description: "Layouts modernos e profissionais que transmitem credibilidade e capturam a atenção do seu público.",
    },
  ]

  return (
    <main className="min-h-screen">
      <ModernHeader />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-[#0D1B2A] via-[#1B2A3A] to-background">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute top-10 right-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4" variant="secondary">
                Landing Pages
              </Badge>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance text-white">
                Páginas que <span className="text-primary">Convertem Visitantes em Clientes</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8 text-pretty">
                Desenvolvemos landing pages estratégicas e otimizadas para capturar leads, promover produtos e maximizar
                suas conversões. Cada página é criada com foco em resultados mensuráveis.
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
                <div className="text-center space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-background/80 backdrop-blur rounded-lg p-4">
                      <div className="text-3xl font-bold text-primary">85%</div>
                      <div className="text-sm text-muted-foreground">Taxa de Conversão</div>
                    </div>
                    <div className="bg-background/80 backdrop-blur rounded-lg p-4">
                      <div className="text-3xl font-bold text-primary">2s</div>
                      <div className="text-sm text-muted-foreground">Tempo de Carga</div>
                    </div>
                    <div className="bg-background/80 backdrop-blur rounded-lg p-4">
                      <div className="text-3xl font-bold text-primary">100%</div>
                      <div className="text-sm text-muted-foreground">Responsivo</div>
                    </div>
                    <div className="bg-background/80 backdrop-blur rounded-lg p-4">
                      <div className="text-3xl font-bold text-primary">SEO</div>
                      <div className="text-sm text-muted-foreground">Otimizado</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Por Que Escolher Nossas Landing Pages?</h2>
            <p className="text-lg text-muted-foreground">
              Combinamos design estratégico com tecnologia de ponta para criar páginas que realmente convertem
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
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

      {/* Features Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">O Que Está Incluído</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Cada landing page que desenvolvemos inclui todos os recursos necessários para garantir o máximo de
                conversões e resultados para seu negócio.
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
                <h3 className="font-heading text-2xl font-bold mb-4">Pronto para Aumentar suas Conversões?</h3>
                <p className="mb-6 opacity-90">
                  Entre em contato conosco e receba uma proposta personalizada para sua landing page. Vamos criar uma
                  página que realmente converte!
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
