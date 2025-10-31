import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Target, TrendingUp, DollarSign, BarChart3, Zap, Users } from "lucide-react"
import Link from "next/link"

export default function TrafegoPagoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 mb-6">
              <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Tráfego Pago
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Gestão de Campanhas Google Ads e Meta Ads
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Atraia clientes qualificados e aumente suas vendas com campanhas de anúncios estratégicas e otimizadas
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

          {/* O que é Tráfego Pago */}
          <section className="mb-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">O que é Tráfego Pago?</h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Tráfego pago é a estratégia de investir em anúncios online para atrair visitantes qualificados para seu
                site, loja virtual ou landing page. Através de plataformas como Google Ads e Meta Ads (Facebook e
                Instagram), você alcança exatamente quem está procurando seus produtos ou serviços.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Na Vexi, gerenciamos suas campanhas de tráfego pago de forma estratégica, otimizando cada centavo
                investido para gerar o máximo de resultados. Criamos anúncios persuasivos, segmentamos o público certo e
                acompanhamos métricas em tempo real para garantir o melhor ROI.
              </p>
            </div>
          </section>

          {/* Plataformas */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center">Plataformas que Trabalhamos</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-4">Google Ads</h3>
                <p className="text-muted-foreground mb-6">
                  Apareça no topo do Google quando clientes procuram por seus produtos ou serviços. Inclui Rede de
                  Pesquisa, Display, YouTube e Shopping.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Anúncios na Pesquisa do Google</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Google Shopping para e-commerce</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Rede de Display (banners em sites)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Anúncios em vídeo no YouTube</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Remarketing para recuperar visitantes</span>
                  </li>
                </ul>
              </Card>
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-4">Meta Ads (Facebook e Instagram)</h3>
                <p className="text-muted-foreground mb-6">
                  Alcance seu público-alvo nas redes sociais mais populares do Brasil com anúncios visuais e segmentação
                  avançada por interesses e comportamentos.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Anúncios no Feed do Facebook</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Stories e Reels do Instagram</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Segmentação por interesses e comportamento</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Públicos personalizados e lookalike</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Catálogo de produtos dinâmico</span>
                  </li>
                </ul>
              </Card>
            </div>
          </section>

          {/* Benefícios */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center">Por que investir em Tráfego Pago?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Zap,
                  title: "Resultados Rápidos",
                  description: "Comece a receber visitantes e vendas em poucos dias",
                },
                {
                  icon: Target,
                  title: "Segmentação Precisa",
                  description: "Alcance exatamente quem tem interesse no seu produto",
                },
                {
                  icon: DollarSign,
                  title: "ROI Mensurável",
                  description: "Acompanhe cada centavo investido e o retorno gerado",
                },
                {
                  icon: TrendingUp,
                  title: "Escalabilidade",
                  description: "Aumente o investimento conforme os resultados aparecem",
                },
                {
                  icon: BarChart3,
                  title: "Dados em Tempo Real",
                  description: "Métricas detalhadas para otimização contínua",
                },
                {
                  icon: Users,
                  title: "Alcance Massivo",
                  description: "Milhões de pessoas podem ver seus anúncios",
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
                  "Análise do negócio e definição de objetivos",
                  "Pesquisa de palavras-chave e público-alvo",
                  "Criação de campanhas estratégicas",
                  "Desenvolvimento de anúncios persuasivos",
                  "Criação de criativos (imagens e vídeos)",
                  "Configuração de conversões e tracking",
                  "Otimização diária das campanhas",
                  "Testes A/B de anúncios e landing pages",
                  "Ajuste de lances e orçamentos",
                  "Remarketing para recuperar visitantes",
                  "Relatórios semanais de performance",
                  "Reuniões mensais de resultados",
                  "Suporte via WhatsApp",
                  "Recomendações estratégicas contínuas",
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
                  title: "Estratégia",
                  description: "Definimos objetivos, público e orçamento",
                },
                {
                  step: "02",
                  title: "Configuração",
                  description: "Criamos campanhas e anúncios nas plataformas",
                },
                {
                  step: "03",
                  title: "Lançamento",
                  description: "Ativamos as campanhas e começamos a gerar tráfego",
                },
                {
                  step: "04",
                  title: "Otimização",
                  description: "Ajustamos diariamente para melhorar resultados",
                },
                {
                  step: "05",
                  title: "Relatórios",
                  description: "Apresentamos métricas e insights estratégicos",
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
              <h2 className="text-3xl font-bold mb-4">Pronto para aumentar suas vendas?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Vamos criar campanhas de tráfego pago que geram resultados reais
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
