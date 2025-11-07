import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Quote, Building2, User } from "lucide-react"
import Link from "next/link"

const depoimentos = [
  {
    nome: "Carlos Silva",
    cargo: "Proprietário",
    empresa: "Bella Estética & Beleza",
    foto: "/placeholder-user.jpg",
    rating: 5,
    texto: "O sistema de agendamento da Vexis transformou completamente meu salão! A automação via WhatsApp reduziu drasticamente as faltas e minha equipe agora consegue focar no atendimento. O investimento se pagou em menos de 3 meses. Recomendo muito!",
    projeto: "Agende Beauty",
    data: "Novembro 2024"
  },
  {
    nome: "Roberto Mendes",
    cargo: "Diretor",
    empresa: "Auto Center Mendes",
    foto: "/placeholder-user.jpg",
    rating: 5,
    texto: "Antes do Oficina System, passávamos horas atendendo ligações de clientes perguntando sobre seus carros. Agora tudo é automatizado via WhatsApp. Os clientes adoram receber as atualizações e nossa produtividade aumentou muito. Excelente trabalho da Vexis!",
    projeto: "Oficina System",
    data: "Outubro 2024"
  },
  {
    nome: "Mariana Costa",
    cargo: "CEO",
    empresa: "EcoVida Produtos Naturais",
    foto: "/placeholder-user.jpg",
    rating: 5,
    texto: "Precisávamos de um e-commerce que refletisse a essência da nossa marca. A Vexis entregou um site lindo, rápido e com todas as funcionalidades que precisávamos. O suporte pós-lançamento é impecável. Nossa conversão aumentou 180%!",
    projeto: "E-commerce",
    data: "Setembro 2024"
  },
  {
    nome: "Dr. Fernando Oliveira",
    cargo: "Médico",
    empresa: "Clínica Dr. Oliveira",
    foto: "/placeholder-user.jpg",
    rating: 5,
    texto: "O site institucional e o sistema de agendamento online que a Vexis desenvolveu modernizaram completamente nossa clínica. Os pacientes elogiam a facilidade de marcar consultas e o design profissional passou muito mais credibilidade. Superou nossas expectativas!",
    projeto: "Site Institucional + Sistema",
    data: "Agosto 2024"
  },
  {
    nome: "Ana Paula Santos",
    cargo: "Gerente de Marketing",
    empresa: "TechStart Inovação",
    foto: "/placeholder-user.jpg",
    rating: 5,
    texto: "Contratamos a Vexis para desenvolver nossa landing page e fazer a gestão de tráfego pago. O resultado foi incrível: taxa de conversão de 12% e custo por lead reduzido em 60%. A equipe é muito profissional e atenciosa. Já estamos planejando novos projetos juntos!",
    projeto: "Landing Page + Tráfego",
    data: "Julho 2024"
  },
  {
    nome: "José Carlos Ribeiro",
    cargo: "Proprietário",
    empresa: "Prime Fitness Academia",
    foto: "/placeholder-user.jpg",
    rating: 5,
    texto: "O aplicativo mobile que a Vexis criou para nossa academia revolucionou a experiência dos nossos alunos. Treinos personalizados, controle de frequência e gamificação. A retenção de alunos aumentou 45% após o lançamento. Valeu cada centavo!",
    projeto: "Aplicativo Mobile",
    data: "Junho 2024"
  }
]

export default function DepoimentosPage() {
  const avaliacaoMedia = 5
  const totalAvaliacoes = depoimentos.length

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        {/* Hero */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-6">
                <Quote className="h-4 w-4" />
                Depoimentos
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                O que nossos clientes dizem
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Veja a experiência de empresas e profissionais que confiaram na Vexis 
                para transformar suas ideias em realidade digital
              </p>

              {/* Rating Summary */}
              <div className="flex items-center justify-center gap-8 mt-8 flex-wrap">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-3xl font-bold">{avaliacaoMedia.toFixed(1)}/5</p>
                  <p className="text-sm text-muted-foreground">Avaliação Média</p>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="text-center">
                  <p className="text-3xl font-bold">{totalAvaliacoes}+</p>
                  <p className="text-sm text-muted-foreground">Clientes Satisfeitos</p>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="text-center">
                  <p className="text-3xl font-bold">100%</p>
                  <p className="text-sm text-muted-foreground">Recomendariam</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8">
              {depoimentos.map((depoimento, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 space-y-4">
                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      {[...Array(depoimento.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Texto */}
                    <div className="relative">
                      <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/20" />
                      <p className="text-muted-foreground leading-relaxed pl-6">
                        {depoimento.texto}
                      </p>
                    </div>

                    {/* Projeto */}
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {depoimento.projeto}
                    </Badge>

                    {/* Autor */}
                    <div className="flex items-center gap-4 pt-4 border-t">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                          <User className="h-6 w-6 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{depoimento.nome}</p>
                        <p className="text-sm text-muted-foreground">
                          {depoimento.cargo}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Building2 className="h-3 w-3" />
                          <span>{depoimento.empresa}</span>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {depoimento.data}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Estatísticas */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/20">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Resultados que Falam por Si</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Números reais de projetos entregues pela Vexis
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <p className="text-4xl font-bold text-primary mb-2">50+</p>
                  <p className="text-muted-foreground">Projetos Entregues</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <p className="text-4xl font-bold text-primary mb-2">98%</p>
                  <p className="text-muted-foreground">Taxa de Satisfação</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <p className="text-4xl font-bold text-primary mb-2">150%</p>
                  <p className="text-muted-foreground">Crescimento Médio</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <p className="text-4xl font-bold text-primary mb-2">24/7</p>
                  <p className="text-muted-foreground">Suporte Disponível</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <Card className="bg-gradient-to-br from-primary/5 via-primary/10 to-accent/5 border-primary/20">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="text-3xl font-bold mb-4">Seja o Próximo Case de Sucesso</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Junte-se aos nossos clientes satisfeitos e transforme seu negócio com 
                  soluções digitais de excelência
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/contato">
                    <Button size="lg" className="w-full sm:w-auto">
                      Iniciar Meu Projeto
                    </Button>
                  </Link>
                  <Link href="/projetos">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Ver Projetos
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

