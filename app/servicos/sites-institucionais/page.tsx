import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Globe, Shield, Smartphone, Search, Zap } from "lucide-react"
import Link from "next/link"

export default function SitesInstitucionaisPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 mb-6">
              <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Sites Institucionais
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Presença Digital Profissional para sua Empresa
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Sites institucionais modernos que transmitem credibilidade e fortalecem a imagem da sua marca no ambiente
              digital
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

          {/* O que são Sites Institucionais */}
          <section className="mb-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">O que são Sites Institucionais?</h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Um site institucional é o cartão de visitas digital da sua empresa. É onde clientes, parceiros e
                investidores conhecem sua história, valores, produtos e serviços. Mais do que informar, um bom site
                institucional transmite profissionalismo e confiança.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Na Vexis, desenvolvemos sites institucionais com design moderno, navegação intuitiva e conteúdo
                estratégico, garantindo que sua empresa se destaque no mercado e conquiste a confiança do seu público.
              </p>
            </div>
          </section>

          {/* Benefícios */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Por que sua empresa precisa de um site institucional?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Globe,
                  title: "Presença Digital 24/7",
                  description: "Sua empresa disponível para o mundo todo, a qualquer hora do dia",
                },
                {
                  icon: Shield,
                  title: "Credibilidade",
                  description: "Transmita profissionalismo e conquiste a confiança do seu público",
                },
                {
                  icon: Search,
                  title: "Visibilidade no Google",
                  description: "Seja encontrado por clientes que procuram seus serviços",
                },
                {
                  icon: Smartphone,
                  title: "Responsivo",
                  description: "Experiência perfeita em computadores, tablets e smartphones",
                },
                {
                  icon: Zap,
                  title: "Performance",
                  description: "Carregamento rápido para não perder visitantes",
                },
                {
                  icon: Check,
                  title: "Fácil Atualização",
                  description: "Sistema de gerenciamento para você atualizar conteúdos facilmente",
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
                  "Design personalizado e moderno alinhado à identidade da sua marca",
                  "Desenvolvimento responsivo para todos os dispositivos",
                  "Páginas essenciais: Home, Sobre, Serviços, Portfólio, Contato",
                  "Sistema de gerenciamento de conteúdo (CMS)",
                  "Otimização para mecanismos de busca (SEO)",
                  "Integração com redes sociais",
                  "Formulários de contato inteligentes",
                  "Google Analytics configurado",
                  "Certificado SSL para segurança",
                  "Hospedagem por 1 ano inclusa",
                  "Treinamento para atualização de conteúdo",
                  "Suporte técnico por 60 dias",
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
                  title: "Planejamento",
                  description: "Entendemos seu negócio, objetivos e público-alvo",
                },
                {
                  step: "02",
                  title: "Design",
                  description: "Criamos layouts modernos alinhados à sua identidade visual",
                },
                {
                  step: "03",
                  title: "Desenvolvimento",
                  description: "Programamos seu site com as melhores tecnologias",
                },
                {
                  step: "04",
                  title: "Lançamento",
                  description: "Publicamos seu site e treinamos sua equipe",
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
              <h2 className="text-3xl font-bold mb-4">Pronto para ter um site profissional?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Vamos criar a presença digital que sua empresa merece
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
