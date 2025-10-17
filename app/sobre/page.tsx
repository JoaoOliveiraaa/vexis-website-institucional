import { ModernHeader } from "@/components/modern-header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Users, Lightbulb, Award, TrendingUp, Shield } from "lucide-react"

export default function SobrePage() {
  const values = [
    {
      icon: Target,
      title: "Foco em Resultados",
      description:
        "Cada projeto é desenvolvido com métricas claras e objetivos mensuráveis para garantir o sucesso do seu negócio.",
    },
    {
      icon: Users,
      title: "Parceria Estratégica",
      description:
        "Trabalhamos lado a lado com nossos clientes, entendendo profundamente suas necessidades e desafios.",
    },
    {
      icon: Lightbulb,
      title: "Inovação Constante",
      description: "Utilizamos as tecnologias mais modernas e práticas atualizadas do mercado digital.",
    },
    {
      icon: Award,
      title: "Qualidade Premium",
      description: "Comprometimento com excelência em cada detalhe, desde o design até a implementação técnica.",
    },
    {
      icon: TrendingUp,
      title: "Crescimento Sustentável",
      description: "Soluções escaláveis que acompanham o crescimento do seu negócio a longo prazo.",
    },
    {
      icon: Shield,
      title: "Confiança e Transparência",
      description: "Comunicação clara, prazos realistas e total transparência em todas as etapas do projeto.",
    },
  ]

  const stats = [
    { number: "50+", label: "Projetos Entregues" },
    { number: "98%", label: "Satisfação dos Clientes" },
    { number: "5+", label: "Anos de Experiência" },
    { number: "24/7", label: "Suporte Disponível" },
  ]

  return (
    <main className="min-h-screen">
      <ModernHeader />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-[#0D1B2A] via-[#1B2A3A] to-background">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4" variant="secondary">
              Sobre a VEXIS
            </Badge>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Transformando Ideias em <span className="text-primary">Soluções Digitais</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty">
              Somos uma empresa especializada em desenvolvimento web, design e marketing digital, comprometida em
              impulsionar o crescimento dos nossos clientes através de soluções tecnológicas inovadoras e estratégias
              digitais eficazes.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-heading text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4" variant="outline">
                Nossa Missão
              </Badge>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Capacitar Empresas no Mundo Digital</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Na VEXIS, acreditamos que toda empresa merece ter uma presença digital forte e profissional. Nossa
                  missão é democratizar o acesso a soluções tecnológicas de alta qualidade, oferecendo serviços que vão
                  desde o desenvolvimento de websites e aplicativos até estratégias completas de marketing digital.
                </p>
                <p>
                  Combinamos expertise técnica com visão estratégica para criar soluções que não apenas impressionam
                  visualmente, mas também geram resultados concretos para o seu negócio. Cada projeto é tratado com
                  dedicação e atenção aos detalhes, garantindo que sua marca se destaque no mercado digital.
                </p>
                <p>
                  Trabalhamos com as tecnologias mais modernas e seguimos as melhores práticas do mercado, sempre
                  focados em entregar valor real e mensurável para nossos clientes.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-8 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <Target className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold">Foco no Cliente</h3>
                  <p className="text-muted-foreground">Seu sucesso é nossa prioridade</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-[#0D1B2A]/50 to-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4" variant="secondary">
              Nossos Valores
            </Badge>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">O Que Nos Move</h2>
            <p className="text-lg text-muted-foreground">
              Princípios que guiam cada decisão e projeto que desenvolvemos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading text-xl font-bold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
            <CardContent className="p-12 text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Pronto para Transformar seu Negócio?</h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Entre em contato conosco e descubra como podemos ajudar sua empresa a alcançar novos patamares no mundo
                digital.
              </p>
              <a
                href="https://wa.me/5516997741702"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-background text-foreground px-8 py-3 text-base font-medium hover:bg-background/90 transition-colors"
              >
                Fale Conosco
              </a>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  )
}
