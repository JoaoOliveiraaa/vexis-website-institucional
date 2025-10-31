import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  Calendar,
  Wrench,
  MessageSquare,
  Clock,
  Users,
  CheckCircle2,
  Zap,
  Bot,
  BarChart3,
  Settings,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

export default function AutomacaoIAPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="bg-gradient-to-r from-purple-500/10 via-violet-500/10 to-cyan-500/10 border-purple-500/20 text-purple-700 dark:text-purple-300">
              <Sparkles className="h-3 w-3 mr-1" />
              Inteligência Artificial & Automação
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Automatize seu negócio com{" "}
              <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent">
                Inteligência Artificial
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Sistemas completos de automação integrados com IA para otimizar processos, melhorar o atendimento ao
              cliente e aumentar a eficiência do seu negócio.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button size="lg" asChild>
                <Link href="/#contato">
                  Solicitar Demonstração
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/#contato">Falar com Especialista</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Sistemas Disponíveis */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Sistemas Prontos para Entrega</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Soluções completas desenvolvidas com N8N e IA, prontas para implementação imediata no seu negócio
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Sistema de Agendamento */}
            <Card className="border-2 hover:border-purple-500/50 transition-all">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/10 to-cyan-500/10">
                    <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-2xl">Sistema de Agendamento Inteligente</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Para barbearias, salões de beleza, clínicas e estabelecimentos de serviços
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Zap className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    Funcionalidades Principais
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        <strong>Agendamento Automatizado:</strong> Clientes agendam via WhatsApp, site ou redes sociais
                        com confirmação instantânea
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        <strong>IA Conversacional:</strong> Assistente virtual responde dúvidas, sugere horários e
                        gerencia remarcações automaticamente
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        <strong>Lembretes Inteligentes:</strong> Notificações automáticas por WhatsApp 24h e 2h antes do
                        agendamento
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        <strong>Gestão de Agenda:</strong> Painel completo para visualizar, editar e gerenciar todos os
                        agendamentos
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        <strong>Histórico de Clientes:</strong> Registro completo de atendimentos anteriores e
                        preferências
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        <strong>Relatórios e Análises:</strong> Métricas de ocupação, horários de pico e performance do
                        negócio
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Bot className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    Tecnologias Utilizadas
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">N8N Workflow</Badge>
                    <Badge variant="secondary">OpenAI GPT</Badge>
                    <Badge variant="secondary">WhatsApp API</Badge>
                    <Badge variant="secondary">Google Calendar</Badge>
                    <Badge variant="secondary">Banco de Dados</Badge>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-semibold flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    Benefícios
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-purple-600 dark:bg-purple-400" />
                      Redução de 80% no tempo gasto com agendamentos
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-purple-600 dark:bg-purple-400" />
                      Diminuição de faltas com lembretes automáticos
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-purple-600 dark:bg-purple-400" />
                      Atendimento 24/7 sem necessidade de equipe adicional
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-purple-600 dark:bg-purple-400" />
                      Melhor experiência do cliente com respostas instantâneas
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Sistema de Oficina */}
            <Card className="border-2 hover:border-cyan-500/50 transition-all">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10">
                    <Wrench className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <CardTitle className="text-2xl">Sistema de Gestão para Oficinas</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Controle completo de ordens de serviço com comunicação automatizada via IA
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Zap className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    Funcionalidades Principais
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        <strong>Ordem de Serviço Digital:</strong> Criação, edição e acompanhamento completo de OS com
                        fotos, diagnósticos e orçamentos
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        <strong>Comunicação Automatizada:</strong> IA envia atualizações automáticas via WhatsApp sobre
                        status do veículo
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        <strong>Notificações Inteligentes:</strong> Cliente recebe updates quando o serviço inicia,
                        durante execução e ao finalizar
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        <strong>Aprovação de Orçamentos:</strong> Cliente aprova serviços adicionais diretamente pelo
                        WhatsApp
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        <strong>Gestão de Estoque:</strong> Controle de peças, produtos e materiais utilizados em cada
                        serviço
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        <strong>Histórico Completo:</strong> Registro de todos os serviços realizados em cada veículo
                        com fotos e detalhes
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        <strong>Dashboard Gerencial:</strong> Visão completa de serviços em andamento, finalizados e
                        faturamento
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Bot className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    Tecnologias Utilizadas
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">N8N Automation</Badge>
                    <Badge variant="secondary">IA Generativa</Badge>
                    <Badge variant="secondary">WhatsApp Business</Badge>
                    <Badge variant="secondary">Sistema Web</Badge>
                    <Badge variant="secondary">Cloud Storage</Badge>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-semibold flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    Benefícios
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-cyan-600 dark:bg-cyan-400" />
                      Transparência total no andamento dos serviços
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-cyan-600 dark:bg-cyan-400" />
                      Redução de ligações e questionamentos dos clientes
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-cyan-600 dark:bg-cyan-400" />
                      Aumento da confiança e satisfação do cliente
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-cyan-600 dark:bg-cyan-400" />
                      Organização completa de todas as ordens de serviço
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Por que escolher nossas soluções */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Por que escolher a Vexis?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experiência comprovada em automação e inteligência artificial para negócios
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Clock className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-2" />
                  <CardTitle>Implementação Rápida</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Sistemas prontos para entrega imediata. Configuração e treinamento em até 7 dias úteis.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Settings className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-2" />
                  <CardTitle>Totalmente Personalizável</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Adaptamos o sistema às necessidades específicas do seu negócio, incluindo sua identidade visual.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-2" />
                  <CardTitle>Suporte Dedicado</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Equipe especializada disponível para suporte técnico, treinamento e atualizações contínuas.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Como Funciona</h2>
              <p className="text-lg text-muted-foreground">Processo simples e transparente</p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Análise e Demonstração</h3>
                  <p className="text-muted-foreground">
                    Agendamos uma reunião para entender suas necessidades e demonstrar o sistema funcionando em tempo
                    real.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Personalização</h3>
                  <p className="text-muted-foreground">
                    Adaptamos o sistema com suas cores, logo e fluxos específicos do seu negócio.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Implementação e Treinamento</h3>
                  <p className="text-muted-foreground">
                    Instalamos o sistema, integramos com seus canais e treinamos sua equipe para uso completo.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Suporte Contínuo</h3>
                  <p className="text-muted-foreground">
                    Acompanhamos os resultados, realizamos ajustes e fornecemos suporte técnico sempre que necessário.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="border-2 border-purple-500/20 bg-gradient-to-br from-purple-500/5 via-violet-500/5 to-cyan-500/5">
            <CardContent className="p-8 md:p-12 text-center space-y-6">
              <div className="inline-flex p-3 rounded-full bg-gradient-to-br from-purple-500/10 to-cyan-500/10 mb-4">
                <MessageSquare className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Pronto para Automatizar seu Negócio?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Agende uma demonstração gratuita e veja na prática como nossos sistemas de IA podem transformar a
                eficiência do seu negócio.
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <Button size="lg" asChild>
                  <Link href="/#contato">
                    Agendar Demonstração Gratuita
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Falar no WhatsApp
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}
