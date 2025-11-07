import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  Package, 
  FileText, 
  DollarSign, 
  BarChart3, 
  MessageCircle, 
  Wrench,
  CheckCircle2,
  Sparkles,
  Bell
} from "lucide-react"
import Link from "next/link"

export default function OficinaSystemPage() {
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
              Oficina System
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl text-pretty leading-relaxed">
              Sistema completo de gestão para oficinas mecânicas com controle de estoque, ordens de serviço, 
              gestão financeira e automação via WhatsApp para manter clientes sempre informados.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              <span className="px-3 py-1.5 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                Next.js
              </span>
              <span className="px-3 py-1.5 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                TypeScript
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
              <span className="px-3 py-1.5 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                Prisma ORM
              </span>
            </div>

            <div className="aspect-video relative overflow-hidden rounded-lg bg-muted border">
              <img
                src="/oficinasystem.png"
                alt="Oficina System Dashboard"
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
                  O <strong className="text-foreground">Oficina System</strong> é uma solução robusta desenvolvida 
                  especificamente para oficinas mecânicas que buscam modernizar sua gestão e melhorar a experiência 
                  do cliente. Construído com <strong className="text-foreground">Next.js</strong> e tecnologias de 
                  ponta, o sistema oferece controle total sobre todos os aspectos operacionais da oficina.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Uma das características mais inovadoras do sistema é a <strong className="text-foreground">automação 
                  via WhatsApp</strong> que mantém os clientes sempre informados sobre o status de seus veículos. 
                  Sempre que uma ordem de serviço é atualizada - seja iniciada, em andamento, aguardando peças ou 
                  finalizada - o cliente recebe automaticamente uma notificação no WhatsApp com todas as informações 
                  relevantes.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  O sistema conta com módulos completos de controle de estoque de peças, gestão de ordens de serviço 
                  com histórico detalhado, relatórios financeiros abrangentes e dashboard analítico que fornece 
                  insights sobre o desempenho da oficina, permitindo tomadas de decisão baseadas em dados reais.
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
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Ordens de Serviço</h3>
                      <p className="text-muted-foreground">
                        Gestão completa de OS com status em tempo real, histórico de serviços, peças utilizadas, 
                        mão de obra, prazos e aprovações de orçamento.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                      <Package className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Controle de Estoque</h3>
                      <p className="text-muted-foreground">
                        Sistema completo de gestão de peças e produtos com controle de entrada e saída, 
                        estoque mínimo, alertas de reposição e relatórios de movimentação.
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
                        Notificações automáticas para clientes a cada atualização de status da OS, 
                        aprovação de orçamentos e avisos quando o veículo está pronto para retirada.
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
                        Controle completo de receitas e despesas, contas a pagar e receber, fluxo de caixa, 
                        formas de pagamento e conciliação bancária.
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
                        Dashboard com métricas em tempo real, relatórios de faturamento, serviços mais 
                        realizados, performance da equipe e análise de crescimento.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                      <Wrench className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Gestão de Mecânicos</h3>
                      <p className="text-muted-foreground">
                        Cadastro de mecânicos, distribuição de serviços, acompanhamento de produtividade 
                        e controle de comissões por serviço realizado.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Fluxo de Automação */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Fluxo de Automação WhatsApp</h2>
            <Card>
              <CardContent className="p-6 md:p-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground flex-shrink-0 text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">OS Criada</h4>
                      <p className="text-sm text-muted-foreground">
                        Cliente recebe confirmação com número da OS, descrição do serviço e prazo estimado
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground flex-shrink-0 text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Diagnóstico Realizado</h4>
                      <p className="text-sm text-muted-foreground">
                        Notificação com detalhes do problema encontrado e orçamento para aprovação
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground flex-shrink-0 text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Serviço em Andamento</h4>
                      <p className="text-sm text-muted-foreground">
                        Atualizações sobre o progresso do reparo e se aguardando peças
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground flex-shrink-0 text-sm font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Serviço Concluído</h4>
                      <p className="text-sm text-muted-foreground">
                        Notificação informando que o veículo está pronto para retirada com valor final
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
                      <li>• Recharts para gráficos</li>
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
                      <li>• WhatsApp Business API</li>
                      <li>• Webhooks para automações</li>
                      <li>• API REST segura</li>
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
                  <div className="text-4xl font-bold text-primary mb-2">90%</div>
                  <p className="text-muted-foreground">Satisfação dos clientes</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary mb-2">4x</div>
                  <p className="text-muted-foreground">Mais eficiência na gestão</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <p className="text-muted-foreground">Rastreabilidade de OS</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA */}
          <section>
            <Card className="bg-gradient-to-br from-primary/5 via-primary/10 to-accent/5 border-primary/20">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="text-3xl font-bold mb-4">Precisa de um sistema similar?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Desenvolvemos soluções personalizadas com automação inteligente para otimizar 
                  a gestão do seu negócio. Entre em contato e vamos conversar!
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

