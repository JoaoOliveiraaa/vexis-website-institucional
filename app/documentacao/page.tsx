import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Code, Rocket, Shield, Zap, Users, CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function DocumentacaoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Documentação</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Guias completos sobre nossos processos, metodologias e melhores práticas para garantir o sucesso do seu
                projeto digital.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                    <Rocket className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Início Rápido</h3>
                  <p className="text-muted-foreground mb-4">
                    Aprenda como iniciar seu projeto conosco em poucos passos simples.
                  </p>
                  <Link href="#inicio-rapido" className="text-primary hover:underline inline-flex items-center gap-1">
                    Ver guia <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                    <Code className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Metodologia</h3>
                  <p className="text-muted-foreground mb-4">
                    Conheça nossa metodologia ágil e como trabalhamos em cada etapa.
                  </p>
                  <Link href="#metodologia" className="text-primary hover:underline inline-flex items-center gap-1">
                    Ver guia <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Segurança</h3>
                  <p className="text-muted-foreground mb-4">
                    Entenda como garantimos a segurança dos seus dados e projetos.
                  </p>
                  <Link href="#seguranca" className="text-primary hover:underline inline-flex items-center gap-1">
                    Ver guia <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>

            <Card id="inicio-rapido" className="mb-8">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Rocket className="h-6 w-6" />
                  </div>
                  <h2 className="text-3xl font-bold">Início Rápido</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Como começar seu projeto</h3>
                    <ol className="space-y-4">
                      <li className="flex gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold flex-shrink-0">
                          1
                        </span>
                        <div>
                          <strong>Primeiro Contato:</strong> Entre em contato via WhatsApp, e-mail ou formulário.
                          Conte-nos sobre sua ideia ou necessidade.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold flex-shrink-0">
                          2
                        </span>
                        <div>
                          <strong>Consultoria Gratuita:</strong> Agendamos uma reunião para entender profundamente seu
                          projeto, objetivos e público-alvo.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold flex-shrink-0">
                          3
                        </span>
                        <div>
                          <strong>Proposta Detalhada:</strong> Elaboramos uma proposta completa com escopo, cronograma,
                          investimento e forma de pagamento.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold flex-shrink-0">
                          4
                        </span>
                        <div>
                          <strong>Aprovação e Início:</strong> Após aprovação da proposta e pagamento da entrada,
                          iniciamos o desenvolvimento imediatamente.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold flex-shrink-0">
                          5
                        </span>
                        <div>
                          <strong>Acompanhamento:</strong> Você recebe atualizações regulares e participa ativamente das
                          validações em cada etapa.
                        </div>
                      </li>
                    </ol>
                  </div>

                  <div className="bg-muted/50 p-6 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      Dica Importante
                    </h4>
                    <p className="text-muted-foreground">
                      Quanto mais detalhes você fornecer sobre seu projeto no primeiro contato, mais precisa será nossa
                      proposta e mais rápido poderemos iniciar!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card id="metodologia" className="mb-8">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Code className="h-6 w-6" />
                  </div>
                  <h2 className="text-3xl font-bold">Nossa Metodologia</h2>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Desenvolvimento Ágil</h3>
                    <p className="text-muted-foreground mb-4">
                      Trabalhamos com metodologia ágil, dividindo o projeto em sprints e entregas incrementais. Isso
                      permite maior flexibilidade e garante que você acompanhe cada etapa do desenvolvimento.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg">Fase 1: Planejamento</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">Levantamento de requisitos</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">Definição de escopo</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">Arquitetura da solução</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">Wireframes e protótipos</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg">Fase 2: Design</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">Identidade visual</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">Interface do usuário (UI)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">Experiência do usuário (UX)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">Aprovação do cliente</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg">Fase 3: Desenvolvimento</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">Codificação front-end</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">Desenvolvimento back-end</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">Integrações de APIs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">Testes contínuos</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg">Fase 4: Entrega</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">Testes finais</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">Deploy em produção</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">Treinamento da equipe</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">Documentação técnica</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card id="seguranca" className="mb-8">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h2 className="text-3xl font-bold">Segurança e Privacidade</h2>
                </div>

                <div className="space-y-6">
                  <p className="text-muted-foreground">
                    A segurança dos seus dados e do seu projeto é nossa prioridade máxima. Implementamos as melhores
                    práticas de segurança em todos os nossos desenvolvimentos.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Proteção de Dados</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          Criptografia SSL/TLS em todas as comunicações
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          Conformidade com LGPD
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          Backups automáticos e redundantes
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          Armazenamento seguro de credenciais
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold">Desenvolvimento Seguro</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          Validação e sanitização de dados
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          Proteção contra SQL Injection e XSS
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          Autenticação e autorização robustas
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          Auditoria de código e testes de segurança
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-6 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Confidencialidade
                    </h4>
                    <p className="text-muted-foreground">
                      Todos os projetos são protegidos por acordo de confidencialidade (NDA). Suas ideias, dados e
                      informações comerciais estão completamente seguras conosco.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Users className="h-6 w-6" />
                  </div>
                  <h2 className="text-3xl font-bold">Suporte e Manutenção</h2>
                </div>

                <div className="space-y-6">
                  <p className="text-muted-foreground">
                    Nosso relacionamento não termina na entrega do projeto. Oferecemos suporte contínuo para garantir
                    que sua solução esteja sempre funcionando perfeitamente.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-2">Garantia</h4>
                      <p className="text-3xl font-bold text-primary mb-2">30 dias</p>
                      <p className="text-sm text-muted-foreground">Correção de bugs sem custo adicional</p>
                    </div>

                    <div className="text-center p-6 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-2">Suporte Técnico</h4>
                      <p className="text-3xl font-bold text-primary mb-2">24/7</p>
                      <p className="text-sm text-muted-foreground">Disponível para emergências</p>
                    </div>

                    <div className="text-center p-6 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-2">Atualizações</h4>
                      <p className="text-3xl font-bold text-primary mb-2">Mensais</p>
                      <p className="text-sm text-muted-foreground">Melhorias e novas funcionalidades</p>
                    </div>
                  </div>

                  <div className="text-center pt-6">
                    <Button asChild size="lg">
                      <Link href="/contato">Fale com Nossa Equipe</Link>
                    </Button>
                  </div>
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
