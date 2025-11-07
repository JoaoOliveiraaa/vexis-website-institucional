import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  Calendar, 
  DollarSign, 
  Users, 
  BarChart3, 
  MessageCircle, 
  Zap,
  CheckCircle2,
  Sparkles
} from "lucide-react"
import Link from "next/link"

export default function AgendeBeautyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Breadcrumb */}
          <Link
            href="/projetos"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para Projetos
          </Link>

          {/* Hero Section */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Badge className="bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] text-white border-0">
                Sistema + IA
              </Badge>
              <Badge variant="outline" className="border-primary text-primary">
                <Sparkles className="h-3 w-3 mr-1" />
                Destaque
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Agende Beauty
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl text-pretty leading-relaxed">
              Sistema completo de agendamento para salões de beleza com automação via WhatsApp, 
              gestão financeira integrada e controle total de funcionários e serviços.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              <span className="px-3 py-1.5 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                Next.js
              </span>
              <span className="px-3 py-1.5 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                TypeScript
              </span>
              <span className="px-3 py-1.5 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                N8N
              </span>
              <span className="px-3 py-1.5 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                WhatsApp API
              </span>
              <span className="px-3 py-1.5 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                PostgreSQL
              </span>
              <span className="px-3 py-1.5 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                IA & Automação
              </span>
            </div>

            <div className="aspect-video relative overflow-hidden rounded-lg bg-muted border">
              <img
                src="/agendebeauty.png"
                alt="Agende Beauty Dashboard"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Sobre o Projeto */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Sobre o Projeto</h2>
            <Card>
              <CardContent className="p-6 md:p-8">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  O <strong className="text-foreground">Agende Beauty</strong> é uma solução completa desenvolvida 
                  especialmente para salões de beleza que buscam modernizar e automatizar seus processos. 
                  Desenvolvido inteiramente em <strong className="text-foreground">Next.js</strong>, o sistema 
                  oferece uma experiência intuitiva tanto para os profissionais quanto para os clientes.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Uma das principais inovações do projeto é a integração com <strong className="text-foreground">N8N</strong>, 
                  permitindo automação completa de agendamentos via WhatsApp. Os clientes podem agendar, 
                  reagendar ou cancelar serviços diretamente pelo WhatsApp, recebendo confirmações e lembretes 
                  automáticos, tudo gerenciado por fluxos de automação inteligentes.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  O sistema conta com módulos completos de gestão financeira, relatórios detalhados de desempenho, 
                  controle de funcionários e suas agendas individuais, além de um dashboard analítico que fornece 
                  insights valiosos para tomada de decisões estratégicas.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Funcionalidades Principais */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Funcionalidades Principais</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Sistema de Agendamento</h3>
                      <p className="text-muted-foreground">
                        Gestão completa de agendamentos com calendário intuitivo, visualização por 
                        profissional, bloqueio de horários e gestão de disponibilidade em tempo real.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                      <MessageCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Automação via WhatsApp</h3>
                      <p className="text-muted-foreground">
                        Integração completa com N8N para automação de agendamentos, confirmações, 
                        lembretes e notificações via WhatsApp, reduzindo faltas e melhorando a comunicação.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                      <DollarSign className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Gestão Financeira</h3>
                      <p className="text-muted-foreground">
                        Controle completo de receitas, despesas, comissões de profissionais, formas de 
                        pagamento e fluxo de caixa com relatórios detalhados.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Gestão de Funcionários</h3>
                      <p className="text-muted-foreground">
                        Cadastro de profissionais, gestão de serviços oferecidos, controle de horários, 
                        férias, folgas e acompanhamento de desempenho individual.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                      <BarChart3 className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Relatórios e Analytics</h3>
                      <p className="text-muted-foreground">
                        Dashboard com métricas em tempo real, relatórios de desempenho, serviços mais 
                        procurados, faturamento por período e análise de crescimento.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                      <Zap className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Automação Inteligente</h3>
                      <p className="text-muted-foreground">
                        Fluxos automatizados para lembretes de aniversário, confirmações de presença, 
                        pesquisas de satisfação e campanhas de marketing personalizadas.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Tecnologias Utilizadas */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Tecnologias Utilizadas</h2>
            <Card>
              <CardContent className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      Frontend
                    </h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Next.js 14 com App Router</li>
                      <li>• TypeScript para type-safety</li>
                      <li>• Tailwind CSS para estilização</li>
                      <li>• Shadcn/ui para componentes</li>
                      <li>• React Hook Form para formulários</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      Backend & Integrações
                    </h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• PostgreSQL para banco de dados</li>
                      <li>• Prisma ORM</li>
                      <li>• N8N para automações</li>
                      <li>• WhatsApp Business API</li>
                      <li>• API REST para integrações</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Resultados */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Resultados e Impacto</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary mb-2">85%</div>
                  <p className="text-muted-foreground">Redução em faltas de clientes</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary mb-2">3x</div>
                  <p className="text-muted-foreground">Mais eficiência operacional</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <p className="text-muted-foreground">Automação de confirmações</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA */}
          <section>
            <Card className="bg-gradient-to-br from-primary/5 via-primary/10 to-accent/5 border-primary/20">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="text-3xl font-bold mb-4">Interessado em uma solução similar?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Desenvolvemos sistemas personalizados com automação e IA para transformar 
                  o seu negócio. Vamos conversar sobre o seu projeto!
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/contato">
                    <Button size="lg" className="w-full sm:w-auto">
                      Fale Conosco
                    </Button>
                  </Link>
                  <Link href="/projetos">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Ver Mais Projetos
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

