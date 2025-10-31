import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Zap, Target, TrendingUp, Users, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function LandingPagesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 mb-6">
              <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Landing Pages
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Páginas que Convertem Visitantes em Clientes
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Landing pages otimizadas para maximizar conversões e captar leads qualificados para o seu negócio
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

          {/* O que são Landing Pages */}
          <section className="mb-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">O que são Landing Pages?</h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Landing pages são páginas web estrategicamente projetadas com um único objetivo: converter visitantes em
                leads ou clientes. Diferente de sites tradicionais, elas eliminam distrações e focam em uma única ação,
                seja capturar e-mails, gerar vendas ou promover um produto específico.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Na Vexis, criamos landing pages de alta performance com design moderno, copywriting persuasivo e
                otimização para conversão, garantindo que cada visitante tenha a melhor experiência possível e seja
                guiado naturalmente para a ação desejada.
              </p>
            </div>
          </section>

          {/* Benefícios */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center">Por que investir em Landing Pages?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Target,
                  title: "Foco em Conversão",
                  description: "Design e conteúdo estratégicos para guiar o visitante até a ação desejada",
                },
                {
                  icon: TrendingUp,
                  title: "Alta Taxa de Conversão",
                  description: "Otimização contínua para maximizar resultados e ROI das suas campanhas",
                },
                {
                  icon: Zap,
                  title: "Carregamento Rápido",
                  description: "Performance otimizada para não perder visitantes por lentidão",
                },
                {
                  icon: Users,
                  title: "Captação de Leads",
                  description: "Formulários estratégicos para construir sua base de contatos qualificados",
                },
                {
                  icon: BarChart3,
                  title: "Métricas Detalhadas",
                  description: "Acompanhamento completo de conversões e comportamento dos visitantes",
                },
                {
                  icon: Check,
                  title: "Responsivo",
                  description: "Experiência perfeita em todos os dispositivos e tamanhos de tela",
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
                  "Design moderno e responsivo para todos os dispositivos",
                  "Copywriting persuasivo focado em conversão",
                  "Formulários otimizados para captação de leads",
                  "Integração com ferramentas de e-mail marketing (Mailchimp, RD Station, etc)",
                  "Otimização de SEO para melhor ranqueamento",
                  "Velocidade de carregamento otimizada",
                  "Integração com Google Analytics e Facebook Pixel",
                  "Testes A/B para otimização contínua",
                  "Certificado SSL para segurança",
                  "Suporte técnico por 30 dias",
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
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Briefing",
                  description: "Entendemos seu negócio, público-alvo e objetivos de conversão",
                },
                {
                  step: "02",
                  title: "Estratégia",
                  description: "Definimos a estrutura, copywriting e elementos de conversão",
                },
                {
                  step: "03",
                  title: "Design & Desenvolvimento",
                  description: "Criamos a landing page com design moderno e código otimizado",
                },
                {
                  step: "04",
                  title: "Testes & Lançamento",
                  description: "Testamos tudo e lançamos sua página pronta para converter",
                },
              ].map((process, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                    {process.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{process.title}</h3>
                  <p className="text-muted-foreground">{process.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Final */}
          <section className="text-center">
            <Card className="p-12 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border-purple-500/20">
              <h2 className="text-3xl font-bold mb-4">Pronto para aumentar suas conversões?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Vamos criar uma landing page de alta performance para o seu negócio
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
