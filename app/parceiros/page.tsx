import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Handshake, Target, TrendingUp, Award, Mail } from "lucide-react"
import Link from "next/link"

export default function ParceirosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-6">
                <Handshake className="h-4 w-4" />
                Parcerias
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                Nossos Parceiros
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Colaboramos com empresas de excelência para entregar as melhores soluções 
                e criar valor para nossos clientes.
              </p>
            </div>
          </div>
        </section>

        {/* Parceiros Atuais */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Empresas Parceiras</h2>
            
            <div className="grid md:grid-cols-1 gap-8 max-w-3xl mx-auto">
              <Card className="border-2 hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className="h-24 w-24 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                        <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]">
                          HT
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">HardTeck Ibaté</h3>
                      <p className="text-muted-foreground mb-4">
                        Parceria estratégica em soluções de hardware e infraestrutura tecnológica. 
                        A HardTeck Ibaté é referência em equipamentos e suporte técnico, 
                        complementando perfeitamente nossas soluções de software.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                          Hardware
                        </span>
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                          Infraestrutura
                        </span>
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                          Suporte Técnico
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-6">
                Estamos sempre abertos a novas parcerias que agreguem valor aos nossos clientes
              </p>
            </div>
          </div>
        </section>

        {/* Benefícios da Parceria */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/20">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Por que ser nosso parceiro?</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto mb-4">
                    <Target className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Novos Mercados</h3>
                  <p className="text-sm text-muted-foreground">
                    Acesso a novos clientes e oportunidades de negócio
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto mb-4">
                    <TrendingUp className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Crescimento</h3>
                  <p className="text-sm text-muted-foreground">
                    Cresça junto com projetos inovadores e desafiadores
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto mb-4">
                    <Handshake className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Colaboração</h3>
                  <p className="text-sm text-muted-foreground">
                    Trabalhe com uma equipe experiente e apaixonada
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto mb-4">
                    <Award className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Excelência</h3>
                  <p className="text-sm text-muted-foreground">
                    Compromisso com qualidade e resultados excepcionais
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Tipos de Parcerias */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Tipos de Parcerias</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Tecnologia</h3>
                  <p className="text-muted-foreground mb-4">
                    Empresas de software, hardware, cloud computing e infraestrutura tecnológica.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Integração de soluções</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Revenda de produtos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Desenvolvimento conjunto</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Comercial</h3>
                  <p className="text-muted-foreground mb-4">
                    Agências, consultorias e empresas que podem indicar e revender nossos serviços.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Programa de afiliados</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Comissões atrativas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Suporte comercial</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Estratégica</h3>
                  <p className="text-muted-foreground mb-4">
                    Parcerias de longo prazo para desenvolvimento de projetos e soluções conjuntas.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Projetos colaborativos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Compartilhamento de recursos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Crescimento mútuo</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA - Torne-se um Parceiro */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/20 to-background">
          <div className="container mx-auto max-w-4xl">
            <Card className="border-2 border-primary/20">
              <CardContent className="p-8 md:p-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto mb-6">
                  <Mail className="h-8 w-8" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Interessado em ser nosso parceiro?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Vamos conversar sobre como podemos trabalhar juntos para criar soluções 
                  incríveis e crescer nossos negócios.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/contato">
                    <Button size="lg" className="w-full sm:w-auto">
                      Entre em Contato
                    </Button>
                  </Link>
                  <a href="mailto:contatooficialvexis@gmail.com">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Enviar E-mail
                    </Button>
                  </a>
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

