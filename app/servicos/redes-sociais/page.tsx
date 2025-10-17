import { ModernHeader } from "@/components/modern-header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Instagram, Facebook, MessageCircle, Users } from "lucide-react"

export default function RedesSociaisPage() {
  const features = [
    "Gestão de Instagram",
    "Gestão de Facebook",
    "Gestão de TikTok",
    "Gestão de WhatsApp Business",
    "Criação de conteúdo",
    "Design de posts e stories",
    "Planejamento de calendário editorial",
    "Copywriting estratégico",
    "Interação com seguidores",
    "Análise de métricas",
    "Relatórios mensais",
    "Estratégias de crescimento",
  ]

  const benefits = [
    {
      icon: Instagram,
      title: "Presença Constante",
      description: "Mantenha suas redes sempre ativas com conteúdo relevante e engajador.",
    },
    {
      icon: Users,
      title: "Engajamento Real",
      description: "Crie conexão genuína com seu público e construa uma comunidade fiel.",
    },
    {
      icon: MessageCircle,
      title: "Atendimento Ágil",
      description: "Responda rapidamente seus clientes e não perca oportunidades de venda.",
    },
    {
      icon: Facebook,
      title: "Alcance Ampliado",
      description: "Expanda sua presença digital e alcance novos clientes potenciais.",
    },
  ]

  return (
    <main className="min-h-screen">
      <ModernHeader />

      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-[#0D1B2A] via-[#1B2A3A] to-background">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute top-10 left-10 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4" variant="secondary">
                Redes Sociais
              </Badge>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance text-white">
                Gestão <span className="text-primary text-white">Profissional</span> de Redes Sociais
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8 text-pretty">
                Gerenciamos suas redes sociais com estratégia, criatividade e foco em resultados. Cresça sua presença
                digital e engaje seu público.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <a href="https://wa.me/5516997741702" target="_blank" rel="noopener noreferrer">
                    Solicitar Orçamento
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/portfolio">Ver Trabalhos</a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-8 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                    <Instagram className="w-12 h-12 text-primary" />
                  </div>
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                    <Facebook className="w-12 h-12 text-primary" />
                  </div>
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                    <MessageCircle className="w-12 h-12 text-primary" />
                  </div>
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <Users className="w-12 h-12 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Por Que Investir em Redes Sociais?</h2>
            <p className="text-lg text-muted-foreground">
              As redes sociais são essenciais para construir relacionamento com seu público e gerar vendas
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
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">O Que Fazemos</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Gestão completa das suas redes sociais com estratégia, criação de conteúdo e análise de resultados.
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
                <h3 className="font-heading text-2xl font-bold mb-4">Pronto para Crescer nas Redes?</h3>
                <p className="mb-6 opacity-90">
                  Entre em contato e receba uma proposta personalizada. Vamos criar uma estratégia que gera resultados
                  reais!
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
