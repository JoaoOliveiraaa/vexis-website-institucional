import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Database, Workflow, BarChart3, Users, Calendar, Package } from "lucide-react"
import Link from "next/link"

export default function SistemasPersonalizadosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 mb-6">
              <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Sistemas Personalizados
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              ERP, CRM, Estoque, Agendamento e Mais
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Sistemas sob medida para automatizar e otimizar os processos do seu negócio
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

          {/* O que são Sistemas Personalizados */}
          <section className="mb-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Soluções Sob Medida para seu Negócio</h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Sistemas personalizados são softwares desenvolvidos especificamente para atender as necessidades únicas
                do seu negócio. Diferente de soluções prontas, eles são moldados aos seus processos, integrando
                diferentes áreas da empresa e automatizando tarefas repetitivas.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Na Vexis, desenvolvemos sistemas completos de gestão empresarial (ERP), relacionamento com clientes
                (CRM), controle de estoque, agendamento, faturamento e qualquer outra solução que sua empresa precise
                para operar com máxima eficiência.
              </p>
            </div>
          </section>

          {/* Tipos de Sistemas */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center">Sistemas que Desenvolvemos</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Database,
                  title: "ERP",
                  description: "Sistema integrado de gestão empresarial para controlar todas as áreas do negócio",
                },
                {
                  icon: Users,
                  title: "CRM",
                  description: "Gestão de relacionamento com clientes, vendas e funil comercial",
                },
                {
                  icon: Package,
                  title: "Controle de Estoque",
                  description: "Gestão completa de produtos, entradas, saídas e inventário",
                },
                {
                  icon: Calendar,
                  title: "Agendamento",
                  description: "Sistema de marcação de horários, consultas e reservas online",
                },
                {
                  icon: BarChart3,
                  title: "Business Intelligence",
                  description: "Dashboards e relatórios para análise de dados e tomada de decisão",
                },
                {
                  icon: Workflow,
                  title: "Automação de Processos",
                  description: "Workflows personalizados para automatizar tarefas repetitivas",
                },
              ].map((system, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <system.icon className="h-10 w-10 mb-4 text-purple-600" />
                  <h3 className="text-xl font-semibold mb-2">{system.title}</h3>
                  <p className="text-muted-foreground">{system.description}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Benefícios */}
          <section className="mb-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Benefícios de um Sistema Personalizado</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Eficiência Operacional</h3>
                  <p className="text-muted-foreground">
                    Automatize processos manuais, reduza erros e aumente a produtividade da sua equipe
                  </p>
                </Card>
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Integração Total</h3>
                  <p className="text-muted-foreground">
                    Conecte todas as áreas da empresa em um único sistema integrado
                  </p>
                </Card>
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Decisões Baseadas em Dados</h3>
                  <p className="text-muted-foreground">
                    Relatórios e dashboards em tempo real para tomada de decisões estratégicas
                  </p>
                </Card>
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Escalabilidade</h3>
                  <p className="text-muted-foreground">Sistema que cresce junto com seu negócio, sem limitações</p>
                </Card>
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Redução de Custos</h3>
                  <p className="text-muted-foreground">
                    Elimine múltiplas ferramentas e licenças com uma solução única
                  </p>
                </Card>
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Vantagem Competitiva</h3>
                  <p className="text-muted-foreground">Processos otimizados que diferenciam sua empresa no mercado</p>
                </Card>
              </div>
            </div>
          </section>

          {/* O que está incluído */}
          <section className="mb-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">O que está incluído</h2>
              <div className="space-y-4">
                {[
                  "Análise completa dos processos atuais da empresa",
                  "Levantamento de requisitos e funcionalidades",
                  "Modelagem de banco de dados personalizada",
                  "Desenvolvimento de interface intuitiva e responsiva",
                  "Painel administrativo completo",
                  "Sistema de permissões e níveis de acesso",
                  "Relatórios e dashboards personalizados",
                  "Integração com sistemas existentes (APIs)",
                  "Backup automático de dados",
                  "Segurança e criptografia de informações",
                  "Testes completos de funcionalidade",
                  "Treinamento da equipe",
                  "Documentação técnica e manual do usuário",
                  "Suporte técnico por 120 dias",
                  "Manutenção e atualizações contínuas",
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
                  description: "Mapeamos processos e identificamos necessidades",
                },
                {
                  step: "02",
                  title: "Planejamento",
                  description: "Definimos arquitetura e funcionalidades do sistema",
                },
                {
                  step: "03",
                  title: "Desenvolvimento",
                  description: "Programamos o sistema em sprints ágeis",
                },
                {
                  step: "04",
                  title: "Testes",
                  description: "Validamos todas as funcionalidades com sua equipe",
                },
                {
                  step: "05",
                  title: "Implantação",
                  description: "Colocamos em produção e treinamos usuários",
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
              <h2 className="text-3xl font-bold mb-4">Pronto para otimizar seus processos?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Vamos desenvolver o sistema perfeito para o seu negócio
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
