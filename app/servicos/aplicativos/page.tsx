import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Smartphone, Zap, Users, Cloud, Code, Layers } from "lucide-react"
import Link from "next/link"

export default function AplicativosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 mb-6">
              <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Aplicativos
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Apps Mobile e Web Personalizados
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Aplicativos nativos e web apps sob medida para transformar sua ideia em realidade digital
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

          {/* O que são Aplicativos */}
          <section className="mb-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Aplicativos que Transformam Negócios</h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Aplicativos mobile e web são ferramentas poderosas para conectar sua empresa aos clientes de forma
                direta e personalizada. Seja para iOS, Android ou web, um app bem desenvolvido oferece experiências
                únicas, aumenta o engajamento e abre novos canais de receita.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Na Vexis, desenvolvemos aplicativos personalizados usando as tecnologias mais modernas do mercado, como
                React Native para apps nativos e Progressive Web Apps (PWA) para experiências web que funcionam como
                apps. Transformamos sua visão em um produto digital de alta qualidade.
              </p>
            </div>
          </section>

          {/* Benefícios */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center">Por que desenvolver um aplicativo?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Smartphone,
                  title: "Presença no Bolso",
                  description: "Seu negócio sempre à mão dos seus clientes, a um toque de distância",
                },
                {
                  icon: Users,
                  title: "Engajamento",
                  description: "Notificações push e experiências personalizadas aumentam o engajamento",
                },
                {
                  icon: Zap,
                  title: "Performance",
                  description: "Apps nativos oferecem velocidade e fluidez superiores",
                },
                {
                  icon: Cloud,
                  title: "Funciona Offline",
                  description: "Recursos disponíveis mesmo sem conexão com internet",
                },
                {
                  icon: Code,
                  title: "Integração Nativa",
                  description: "Acesso a câmera, GPS, sensores e recursos do dispositivo",
                },
                {
                  icon: Layers,
                  title: "Multiplataforma",
                  description: "Um código para iOS, Android e Web com React Native",
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

          {/* Tipos de Apps */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center">Tipos de Aplicativos que Desenvolvemos</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-4">Apps Nativos</h3>
                <p className="text-muted-foreground mb-4">
                  Aplicativos desenvolvidos especificamente para iOS e Android usando React Native, oferecendo
                  performance máxima e acesso completo aos recursos do dispositivo.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Publicação na App Store e Google Play</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Performance superior</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Acesso a recursos nativos</span>
                  </li>
                </ul>
              </Card>
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-4">Progressive Web Apps (PWA)</h3>
                <p className="text-muted-foreground mb-4">
                  Aplicações web que funcionam como apps nativos, sem necessidade de instalação pelas lojas, com
                  recursos offline e notificações push.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Sem necessidade de aprovação nas lojas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Atualizações instantâneas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Funciona em qualquer dispositivo</span>
                  </li>
                </ul>
              </Card>
            </div>
          </section>

          {/* O que está incluído */}
          <section className="mb-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">O que está incluído</h2>
              <div className="space-y-4">
                {[
                  "Análise e planejamento completo do projeto",
                  "Design de interface (UI) e experiência do usuário (UX)",
                  "Desenvolvimento para iOS e Android (React Native) ou PWA",
                  "Integração com APIs e serviços externos",
                  "Sistema de autenticação e segurança",
                  "Painel administrativo web",
                  "Notificações push",
                  "Armazenamento em nuvem",
                  "Testes em dispositivos reais",
                  "Publicação nas lojas (App Store e Google Play)",
                  "Documentação técnica completa",
                  "Treinamento da equipe",
                  "Suporte técnico por 90 dias",
                  "Manutenção e atualizações",
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
                  title: "Discovery",
                  description: "Entendemos sua ideia e definimos funcionalidades",
                },
                {
                  step: "02",
                  title: "Prototipagem",
                  description: "Criamos protótipos interativos para validação",
                },
                {
                  step: "03",
                  title: "Design",
                  description: "Desenvolvemos a interface visual do app",
                },
                {
                  step: "04",
                  title: "Desenvolvimento",
                  description: "Programamos todas as funcionalidades",
                },
                {
                  step: "05",
                  title: "Lançamento",
                  description: "Publicamos nas lojas e monitoramos",
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
              <h2 className="text-3xl font-bold mb-4">Pronto para criar seu aplicativo?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Vamos transformar sua ideia em um app de sucesso
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
