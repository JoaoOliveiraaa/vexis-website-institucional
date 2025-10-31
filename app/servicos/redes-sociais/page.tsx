import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Instagram, Facebook, MessageCircle, TrendingUp, Calendar, BarChart3, Users } from "lucide-react"
import Link from "next/link"

export default function RedesSociaisPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 mb-6">
              <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Redes Sociais
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Gestão de Instagram, Facebook, TikTok e WhatsApp
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Presença estratégica nas redes sociais para engajar seu público e fortalecer sua marca
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="#contato">Solicitar Orçamento</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/projetos">Ver Projetos</Link>
              </Button>
            </div>
          </div>

          {/* O que é Gestão de Redes Sociais */}
          <section className="mb-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Sua Marca nas Redes Sociais</h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Gestão de redes sociais vai muito além de postar fotos bonitas. É criar uma estratégia de conteúdo que
                engaja, educa e converte seguidores em clientes. É estar presente onde seu público está, construindo
                relacionamento e autoridade no mercado.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Na Vexi, gerenciamos suas redes sociais de forma estratégica e profissional. Criamos conteúdo relevante,
                respondemos comentários, analisamos métricas e ajustamos a estratégia continuamente para garantir que
                sua marca se destaque e cresça nas plataformas.
              </p>
            </div>
          </section>

          {/* Plataformas */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center">Plataformas que Gerenciamos</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: Instagram,
                  title: "Instagram",
                  description: "Feed, Stories, Reels e IGTV com conteúdo visual estratégico para engajamento",
                },
                {
                  icon: Facebook,
                  title: "Facebook",
                  description: "Posts, vídeos e interação com comunidade para alcance e conversão",
                },
                {
                  icon: TrendingUp,
                  title: "TikTok",
                  description: "Vídeos virais e trends para alcançar público jovem e engajado",
                },
                {
                  icon: MessageCircle,
                  title: "WhatsApp Business",
                  description: "Atendimento profissional, catálogo de produtos e automação",
                },
              ].map((platform, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <platform.icon className="h-10 w-10 mb-4 text-purple-600" />
                  <h3 className="text-xl font-semibold mb-2">{platform.title}</h3>
                  <p className="text-muted-foreground">{platform.description}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Benefícios */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center">Por que investir em Gestão de Redes Sociais?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Users,
                  title: "Alcance Orgânico",
                  description: "Chegue a milhares de pessoas sem gastar com anúncios",
                },
                {
                  icon: TrendingUp,
                  title: "Crescimento da Marca",
                  description: "Construa autoridade e reconhecimento no mercado",
                },
                {
                  icon: MessageCircle,
                  title: "Relacionamento",
                  description: "Crie conexão genuína com seu público",
                },
                {
                  icon: BarChart3,
                  title: "Insights Valiosos",
                  description: "Entenda melhor seu público através das métricas",
                },
                {
                  icon: Check,
                  title: "Credibilidade",
                  description: "Perfis ativos transmitem profissionalismo",
                },
                {
                  icon: Calendar,
                  title: "Consistência",
                  description: "Presença constante mantém sua marca relevante",
                },
              ].map((benefit, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <benefit.icon className="h-10 w-10 mb-4 text-purple-600" />
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* O que está incluído */}
          <section className="mb-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">O que está incluído</h2>
              <div className="space-y-4">
                {[
                  "Planejamento estratégico de conteúdo mensal",
                  "Criação de posts (design e copywriting)",
                  "Produção de Stories diários",
                  "Criação de Reels e vídeos curtos",
                  "Calendário editorial organizado",
                  "Agendamento de publicações",
                  "Monitoramento e resposta de comentários",
                  "Gestão de mensagens diretas",
                  "Análise de métricas e insights",
                  "Relatório mensal de performance",
                  "Pesquisa de hashtags estratégicas",
                  "Interação com seguidores e comunidade",
                  "Acompanhamento de tendências",
                  "Sugestões de melhorias contínuas",
                  "Reunião mensal de alinhamento",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Processo */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center">Nosso Processo</h2>
            <div className="grid md:grid-cols-5 gap-6">
              {[
                {
                  step: "01",
                  title: "Diagnóstico",
                  description: "Analisamos suas redes e definimos objetivos",
                },
                {
                  step: "02",
                  title: "Estratégia",
                  description: "Criamos plano de conteúdo e calendário editorial",
                },
                {
                  step: "03",
                  title: "Produção",
                  description: "Criamos posts, stories e vídeos de qualidade",
                },
                {
                  step: "04",
                  title: "Publicação",
                  description: "Agendamos e publicamos nos melhores horários",
                },
                {
                  step: "05",
                  title: "Análise",
                  description: "Monitoramos métricas e otimizamos estratégia",
                },
              ].map((process, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-3">
                    {process.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{process.title}</h3>
                  <p className="text-sm text-muted-foreground">{process.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Final */}
          <section className="text-center">
            <Card className="p-12 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border-purple-500/20">
              <h2 className="text-3xl font-bold mb-4">Pronto para crescer nas redes sociais?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Vamos criar uma presença digital forte e engajada para sua marca
              </p>
              <Button size="lg" asChild>
                <a href="#contato">Solicitar Orçamento Gratuito</a>
              </Button>
            </Card>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
