import { ModernHeader } from "@/components/modern-header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Target, TrendingUp, DollarSign, BarChart } from "lucide-react"

export default function TrafegoPagoPage() {
  const features = [
    "Google Ads (Search, Display, Shopping)",
    "Meta Ads (Facebook e Instagram)",
    "TikTok Ads",
    "LinkedIn Ads",
    "YouTube Ads",
    "Criação de campanhas estratégicas",
    "Otimização de conversões",
    "Remarketing avançado",
    "Testes A/B contínuos",
    "Relatórios detalhados",
    "Análise de ROI",
    "Gestão de orçamento",
  ]

  const benefits = [
    {
      icon: Target,
      title: "Público Qualificado",
      description: "Alcance exatamente as pessoas certas no momento certo.",
    },
    {
      icon: TrendingUp,
      title: "Resultados Rápidos",
      description: "Comece a gerar leads e vendas desde o primeiro dia.",
    },
    {
      icon: DollarSign,
      title: "ROI Otimizado",
      description: "Maximize o retorno sobre cada real investido em anúncios.",
    },
    {
      icon: BarChart,
      title: "Métricas Claras",
      description: "Acompanhe resultados em tempo real com relatórios detalhados.",
    },
  ]

  return (
    <main className="min-h-screen">
      <ModernHeader />

      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-[#0D1B2A] via-[#1B2A3A] to-background">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4" variant="secondary">
                Tráfego Pago
              </Badge>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance text-white">
                Gere <span className="text-primary text-white">Leads e Vendas</span> com Anúncios Online
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8 text-pretty">
                Gestão profissional de campanhas de tráfego pago no Google Ads, Meta Ads e outras plataformas. Maximize
                seu ROI com estratégias comprovadas.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <a href="https://wa.me/5516997741702" target="_blank" rel="noopener noreferrer">
                    Solicitar Orçamento
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/contato">Falar com Especialista</a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-8 flex items-center justify-center">
                <TrendingUp className="w-48 h-48 text-primary/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Vantagens do Tráfego Pago</h2>
            <p className="text-lg text-muted-foreground">
              Invista em anúncios online e alcance resultados mensuráveis e escaláveis para seu negócio
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
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Plataformas e Serviços</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Gestão completa de campanhas nas principais plataformas de anúncios online, com estratégias
                personalizadas para seu negócio.
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
                <h3 className="font-heading text-2xl font-bold mb-4">Pronto para Escalar suas Vendas?</h3>
                <p className="mb-6 opacity-90">
                  Entre em contato e receba uma análise gratuita. Vamos criar campanhas que geram resultados reais para
                  seu negócio!
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
