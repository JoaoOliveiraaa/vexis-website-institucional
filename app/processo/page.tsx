import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  MessageCircle,
  FileSearch,
  Pencil,
  Code,
  TestTube,
  Rocket,
  HeadphonesIcon,
  CheckCircle2,
  Clock,
  Users,
  Target
} from "lucide-react"
import Link from "next/link"

const etapas = [
  {
    numero: 1,
    titulo: "Contato Inicial & Briefing",
    icon: MessageCircle,
    duracao: "1-2 dias",
    descricao: "Nosso processo começa com uma conversa para entender suas necessidades, objetivos e visão do projeto.",
    atividades: [
      "Reunião inicial (presencial ou online)",
      "Compreensão do negócio e público-alvo",
      "Levantamento de requisitos funcionais",
      "Definição de objetivos e KPIs",
      "Análise de referências e concorrentes"
    ],
    entregaveis: ["Documento de briefing", "Escopo preliminar"]
  },
  {
    numero: 2,
    titulo: "Análise & Proposta",
    icon: FileSearch,
    duracao: "2-3 dias",
    descricao: "Analisamos profundamente o projeto e criamos uma proposta detalhada com escopo, cronograma e investimento.",
    atividades: [
      "Análise técnica de viabilidade",
      "Definição da arquitetura e tecnologias",
      "Elaboração do escopo detalhado",
      "Estimativa de prazos por fase",
      "Cálculo de investimento"
    ],
    entregaveis: ["Proposta comercial completa", "Cronograma do projeto", "Orçamento detalhado"]
  },
  {
    numero: 3,
    titulo: "Design & Prototipagem",
    icon: Pencil,
    duracao: "1-2 semanas",
    descricao: "Criamos wireframes e protótipos de alta fidelidade para validar a experiência do usuário antes do desenvolvimento.",
    atividades: [
      "Criação de wireframes e fluxos",
      "Design da interface (UI)",
      "Prototipação interativa",
      "Definição da identidade visual",
      "Apresentação e ajustes"
    ],
    entregaveis: ["Protótipo navegável", "Guia de estilo", "Assets de design"]
  },
  {
    numero: 4,
    titulo: "Desenvolvimento",
    icon: Code,
    duracao: "2-8 semanas",
    descricao: "Transformamos o design em código, desenvolvendo a solução com as melhores práticas e tecnologias modernas.",
    atividades: [
      "Configuração do ambiente de desenvolvimento",
      "Desenvolvimento frontend e backend",
      "Integração de APIs e serviços",
      "Implementação de funcionalidades",
      "Code review e otimização"
    ],
    entregaveis: ["Entregas incrementais a cada sprint", "Código documentado", "Acesso ao ambiente de homologação"]
  },
  {
    numero: 5,
    titulo: "Testes & Qualidade",
    icon: TestTube,
    duracao: "3-5 dias",
    descricao: "Realizamos testes rigorosos para garantir que tudo funcione perfeitamente em diferentes dispositivos e cenários.",
    atividades: [
      "Testes funcionais e de usabilidade",
      "Testes de performance e carga",
      "Testes em múltiplos dispositivos",
      "Correção de bugs identificados",
      "Validação com o cliente"
    ],
    entregaveis: ["Relatório de testes", "Ajustes e correções", "Aprovação final"]
  },
  {
    numero: 6,
    titulo: "Lançamento",
    icon: Rocket,
    duracao: "1-2 dias",
    descricao: "Colocamos seu projeto no ar com toda a infraestrutura necessária, garantindo uma migração suave e segura.",
    atividades: [
      "Deploy em ambiente de produção",
      "Configuração de domínio e SSL",
      "Migração de dados (se aplicável)",
      "Testes pós-deploy",
      "Treinamento da equipe"
    ],
    entregaveis: ["Projeto no ar", "Documentação técnica", "Credenciais de acesso", "Treinamento"]
  },
  {
    numero: 7,
    titulo: "Suporte & Manutenção",
    icon: HeadphonesIcon,
    duracao: "Contínuo",
    descricao: "Oferecemos suporte contínuo, monitoramento e atualizações para garantir que seu projeto esteja sempre funcionando perfeitamente.",
    atividades: [
      "Período de garantia incluído",
      "Monitoramento de performance",
      "Correção de bugs (se houver)",
      "Suporte técnico",
      "Planos de manutenção contínua"
    ],
    entregaveis: ["Suporte pós-lançamento", "Relatórios de performance", "Atualizações de segurança"]
  }
]

const diferenciais = [
  {
    icon: Users,
    titulo: "Comunicação Transparente",
    descricao: "Você acompanha cada etapa do projeto com reuniões regulares e acesso ao nosso board de desenvolvimento"
  },
  {
    icon: Clock,
    titulo: "Entregas no Prazo",
    descricao: "Trabalhamos com metodologia ágil e cronogramas realistas para garantir entregas pontuais"
  },
  {
    icon: Target,
    titulo: "Foco em Resultados",
    descricao: "Não desenvolvemos apenas código, criamos soluções que geram resultados mensuráveis para seu negócio"
  },
  {
    icon: CheckCircle2,
    titulo: "Qualidade Garantida",
    descricao: "Código limpo, testes rigorosos e as melhores práticas de desenvolvimento em cada projeto"
  }
]

export default function ProcessoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        {/* Hero */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-6">
                <Target className="h-4 w-4" />
                Nosso Processo
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                Como Trabalhamos
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Um processo transparente e eficiente, desenvolvido para garantir que seu projeto 
                seja entregue com excelência, no prazo e dentro do orçamento
              </p>
            </div>
          </div>
        </section>

        {/* Timeline das Etapas */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-5xl">
            <div className="space-y-12">
              {etapas.map((etapa, index) => (
                <div key={index} className="relative">
                  {/* Linha conectora */}
                  {index < etapas.length - 1 && (
                    <div className="absolute left-8 top-20 h-full w-0.5 bg-border hidden md:block" />
                  )}

                  <Card className="hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Ícone e Número */}
                        <div className="flex-shrink-0">
                          <div className="relative">
                            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl font-bold">
                              {etapa.numero}
                            </div>
                            <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <etapa.icon className="h-5 w-5 text-primary" />
                            </div>
                          </div>
                        </div>

                        {/* Conteúdo */}
                        <div className="flex-1 space-y-4">
                          <div className="flex items-start justify-between gap-4 flex-wrap">
                            <div>
                              <h3 className="text-2xl font-bold mb-2">{etapa.titulo}</h3>
                              <p className="text-muted-foreground">{etapa.descricao}</p>
                            </div>
                            <Badge className="bg-primary/10 text-primary border-primary/20">
                              <Clock className="h-3 w-3 mr-1" />
                              {etapa.duracao}
                            </Badge>
                          </div>

                          <div className="grid md:grid-cols-2 gap-6 pt-4">
                            {/* Atividades */}
                            <div>
                              <h4 className="font-semibold mb-3 flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                                Atividades
                              </h4>
                              <ul className="space-y-2">
                                {etapa.atividades.map((atividade, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <span className="text-primary mt-1">•</span>
                                    <span>{atividade}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Entregáveis */}
                            <div>
                              <h4 className="font-semibold mb-3 flex items-center gap-2">
                                <Rocket className="h-4 w-4 text-primary" />
                                Entregáveis
                              </h4>
                              <ul className="space-y-2">
                                {etapa.entregaveis.map((entregavel, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <span className="text-primary mt-1">✓</span>
                                    <span>{entregavel}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/20">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nossos Diferenciais</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                O que nos torna diferentes e garante o sucesso do seu projeto
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {diferenciais.map((diferencial, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex justify-center">
                      <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center">
                        <diferencial.icon className="h-7 w-7 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-semibold">{diferencial.titulo}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {diferencial.descricao}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Metodologia Ágil */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <Card>
              <CardContent className="p-8 md:p-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4">Metodologia Ágil</h2>
                  <p className="text-muted-foreground">
                    Trabalhamos com sprints semanais ou quinzenais, permitindo ajustes contínuos 
                    e entregas incrementais
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">1-2</div>
                    <p className="text-sm text-muted-foreground">Semanas por Sprint</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">24h</div>
                    <p className="text-sm text-muted-foreground">Tempo de Resposta</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">100%</div>
                    <p className="text-sm text-muted-foreground">Transparência</p>
                  </div>
                </div>

                <div className="mt-8 p-6 rounded-lg bg-muted/50 space-y-3">
                  <h3 className="font-semibold">O que você recebe:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Acesso ao board de desenvolvimento (Trello ou Jira)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Reuniões semanais de acompanhamento</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Demonstrações ao vivo das funcionalidades</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Canal direto de comunicação (WhatsApp/Slack)</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <Card className="bg-gradient-to-br from-primary/5 via-primary/10 to-accent/5 border-primary/20">
              <CardContent className="p-8 md:p-12 text-center">
                <Rocket className="h-12 w-12 text-primary mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-4">Pronto para Começar?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Agende uma reunião sem compromisso e vamos discutir como podemos 
                  transformar sua ideia em realidade
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/contato">
                    <Button size="lg" className="w-full sm:w-auto">
                      Iniciar Meu Projeto
                    </Button>
                  </Link>
                  <Link href="/faq">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Ver Perguntas Frequentes
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

