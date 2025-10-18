import { ModernHeader } from "@/components/modern-header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Database, Calendar, Package, Users, FileText, BarChart3, Settings, Zap } from "lucide-react"

export default function SistemasPage() {
  const systems = [
    {
      icon: Package,
      title: "Sistema de Estoque",
      description:
        "Controle completo de entrada, saída, movimentação e inventário de produtos com alertas automáticos.",
    },
    {
      icon: Calendar,
      title: "Sistema de Agendamento",
      description: "Gestão de agendas, horários, recursos e notificações automáticas para clientes e equipe.",
    },
    {
      icon: Users,
      title: "CRM Personalizado",
      description: "Gestão de relacionamento com clientes, pipeline de vendas e automação de follow-ups.",
    },
    {
      icon: FileText,
      title: "Sistema de Pedidos",
      description: "Gestão completa de pedidos, orçamentos, propostas comerciais e acompanhamento de status.",
    },
    {
      icon: BarChart3,
      title: "Dashboard Analytics",
      description: "Painéis personalizados com métricas, KPIs e relatórios em tempo real para tomada de decisão.",
    },
    {
      icon: Database,
      title: "ERP Customizado",
      description: "Sistema integrado para gestão financeira, fiscal, compras, vendas e recursos humanos.",
    },
  ]

  const features = [
    "Desenvolvimento sob medida para seu negócio",
    "Interface intuitiva e fácil de usar",
    "Integração com sistemas existentes",
    "Banco de dados seguro e escalável",
    "Relatórios e dashboards personalizados",
    "Controle de permissões e usuários",
    "Backup automático de dados",
    "Suporte técnico dedicado",
    "Atualizações e melhorias contínuas",
    "Treinamento da equipe incluído",
    "Hospedagem em nuvem segura",
    "Acesso via web e mobile",
  ]

  const benefits = [
    {
      icon: Zap,
      title: "Automação de Processos",
      description: "Elimine tarefas manuais e repetitivas, economizando tempo e reduzindo erros operacionais.",
    },
    {
      icon: Settings,
      title: "Totalmente Personalizável",
      description: "Sistema desenvolvido especificamente para atender as necessidades únicas do seu negócio.",
    },
    {
      icon: BarChart3,
      title: "Decisões Baseadas em Dados",
      description: "Relatórios e dashboards que fornecem insights valiosos para gestão estratégica.",
    },
    {
      icon: Database,
      title: "Escalável e Seguro",
      description: "Infraestrutura robusta que cresce com seu negócio mantendo a segurança dos dados.",
    },
  ]

  return (
    <main className="min-h-screen">
      <ModernHeader />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-[#0D1B2A] via-[#1B2A3A] to-background">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute top-10 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4" variant="secondary">
              Sistemas Personalizados
            </Badge>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance text-white">
              Sistemas Sob Medida para <span className="text-primary text-white">Otimizar seu Negócio</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 text-pretty">
              Desenvolvemos sistemas personalizados de gestão, estoque, agendamento, CRM e muito mais. Soluções
              completas que automatizam processos e impulsionam a eficiência da sua empresa.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="https://wa.me/5516997741702" target="_blank" rel="noopener noreferrer">
                  Solicitar Orçamento
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/contato">Agendar Consultoria</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Systems Grid */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Tipos de Sistemas que Desenvolvemos</h2>
            <p className="text-lg text-muted-foreground">
              Soluções completas e personalizadas para diferentes necessidades empresariais
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {systems.map((system, index) => {
              const Icon = system.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading text-xl font-bold mb-2">{system.title}</h3>
                    <p className="text-muted-foreground text-sm">{system.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Vantagens dos Nossos Sistemas</h2>
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
      <section className="py-20">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
              <CardContent className="p-8">
                <h3 className="font-heading text-2xl font-bold mb-4">
                  Transforme sua Gestão com um Sistema Personalizado
                </h3>
                <p className="mb-6 opacity-90">
                  Agende uma consultoria gratuita e descubra como um sistema sob medida pode revolucionar a eficiência e
                  produtividade da sua empresa.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 flex-shrink-0" />
                    <span>Análise gratuita das suas necessidades</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 flex-shrink-0" />
                    <span>Proposta personalizada sem compromisso</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 flex-shrink-0" />
                    <span>Demonstração de sistemas similares</span>
                  </li>
                </ul>
                <Button size="lg" className="w-full bg-background text-foreground hover:bg-background/90" asChild>
                  <a href="https://wa.me/5516997741702" target="_blank" rel="noopener noreferrer">
                    Agendar Consultoria Gratuita
                  </a>
                </Button>
              </CardContent>
            </Card>

            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">O Que Está Incluído</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Cada sistema que desenvolvemos é completo e inclui tudo que você precisa para começar a usar
                imediatamente.
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
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
