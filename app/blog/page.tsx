import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Calendar, Clock, ArrowRight, TrendingUp } from "lucide-react"
import Link from "next/link"

const posts = [
  {
    slug: "como-ia-pode-automatizar-seu-negocio",
    titulo: "Como a IA Pode Automatizar Seu Negócio em 2024",
    resumo: "Descubra as principais formas de usar inteligência artificial para automatizar processos, reduzir custos e aumentar a eficiência do seu negócio.",
    categoria: "IA & Automação",
    autor: "João Silva",
    data: "15 Nov 2024",
    tempoLeitura: "8 min",
    imagem: "/blog/ia-automacao-negocio.jpg",
    destaque: true
  },
  {
    slug: "nextjs-14-novidades",
    titulo: "Next.js 14: O Que Mudou e Por Que Você Deve Usar",
    resumo: "Explore as novidades do Next.js 14, incluindo melhorias de performance, Server Actions e o novo Turbopack.",
    categoria: "Desenvolvimento",
    autor: "Maria Santos",
    data: "12 Nov 2024",
    tempoLeitura: "6 min",
    imagem: "/blog/nextjs-14-novidades.jpg",
    destaque: false
  },
  {
    slug: "design-system-empresarial",
    titulo: "Como Criar um Design System para sua Empresa",
    resumo: "Guia completo para desenvolver um design system escalável que mantenha consistência visual em todos os seus produtos digitais.",
    categoria: "Design",
    autor: "Ana Costa",
    data: "10 Nov 2024",
    tempoLeitura: "10 min",
    imagem: "/blog/design-system-empresarial.jpg",
    destaque: false
  },
  {
    slug: "n8n-automacao-workflows",
    titulo: "N8N: Automação de Workflows Sem Código",
    resumo: "Aprenda a usar o N8N para criar automações poderosas conectando diferentes ferramentas e serviços sem escrever uma linha de código.",
    categoria: "Automação",
    autor: "Carlos Mendes",
    data: "8 Nov 2024",
    tempoLeitura: "7 min",
    imagem: "/blog/n8n-automacao-workflows.webp",
    destaque: false
  },
  {
    slug: "seo-para-desenvolvedores",
    titulo: "SEO para Desenvolvedores: Guia Completo 2024",
    resumo: "Tudo que desenvolvedores precisam saber sobre SEO técnico, desde meta tags até Core Web Vitals e performance.",
    categoria: "Marketing",
    autor: "Pedro Oliveira",
    data: "5 Nov 2024",
    tempoLeitura: "12 min",
    imagem: "/blog/seo-desenvolvedores.jpg",
    destaque: false
  },
  {
    slug: "typescript-para-iniciantes",
    titulo: "TypeScript para Iniciantes: Do Zero ao Avançado",
    resumo: "Um guia prático para quem está começando com TypeScript, cobrindo desde tipos básicos até generics e utility types.",
    categoria: "Desenvolvimento",
    autor: "Maria Santos",
    data: "1 Nov 2024",
    tempoLeitura: "15 min",
    imagem: "/blog/typescript-iniciantes.jpg",
    destaque: false
  }
]

const categorias = [
  { nome: "Todos", count: posts.length },
  { nome: "IA & Automação", count: posts.filter(p => p.categoria === "IA & Automação").length },
  { nome: "Desenvolvimento", count: posts.filter(p => p.categoria === "Desenvolvimento").length },
  { nome: "Design", count: posts.filter(p => p.categoria === "Design").length },
  { nome: "Marketing", count: posts.filter(p => p.categoria === "Marketing").length },
  { nome: "Automação", count: posts.filter(p => p.categoria === "Automação").length }
]

export default function BlogPage() {
  const postDestaque = posts.find(p => p.destaque)
  const outrosPosts = posts.filter(p => !p.destaque)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        {/* Hero */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-6">
                <BookOpen className="h-4 w-4" />
                Blog Vexis
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                Insights sobre Tecnologia e Inovação
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Artigos, tutoriais e novidades sobre desenvolvimento web, IA, automação, 
                design e marketing digital
              </p>
            </div>
          </div>
        </section>

        {/* Categorias */}
        <section className="px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="container mx-auto max-w-6xl">
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {categorias.map((cat, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors whitespace-nowrap"
                    >
                      {cat.nome} ({cat.count})
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Post em Destaque */}
        {postDestaque && (
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-6xl">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold">Em Destaque</h2>
              </div>

              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="aspect-video md:aspect-square relative overflow-hidden bg-muted">
                    <img
                      src={postDestaque.imagem}
                      alt={postDestaque.titulo}
                      className="object-cover w-full h-full"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                      {postDestaque.categoria}
                    </Badge>
                  </div>
                  <CardContent className="p-6 md:p-8 flex flex-col justify-center">
                    <div className="space-y-4">
                      <h3 className="text-2xl md:text-3xl font-bold">
                        {postDestaque.titulo}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {postDestaque.resumo}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {postDestaque.data}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {postDestaque.tempoLeitura}
                        </span>
                      </div>
                      <Link href={`/blog/${postDestaque.slug}`}>
                        <Button className="group">
                          Ler Artigo
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Outros Posts */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold mb-8">Últimos Artigos</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {outrosPosts.map((post, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
                  <div className="aspect-video relative overflow-hidden bg-muted">
                    <img
                      src={post.imagem}
                      alt={post.titulo}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm">
                      {post.categoria}
                    </Badge>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-1">
                    <div className="flex-1 space-y-3">
                      <h3 className="text-xl font-bold line-clamp-2">
                        {post.titulo}
                      </h3>
                      <p className="text-muted-foreground line-clamp-3 text-sm">
                        {post.resumo}
                      </p>
                    </div>
                    <div className="pt-4 space-y-3">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {post.data}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.tempoLeitura}
                        </span>
                      </div>
                      <Link href={`/blog/${post.slug}`} className="block">
                        <Button variant="ghost" className="w-full group">
                          Ler mais
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <Card className="bg-gradient-to-br from-primary/5 via-primary/10 to-accent/5 border-primary/20">
              <CardContent className="p-8 md:p-12 text-center">
                <BookOpen className="h-12 w-12 text-primary mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-4">Não Perca Nenhum Conteúdo</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Receba os melhores artigos sobre tecnologia, desenvolvimento e inovação 
                  diretamente no seu e-mail
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Seu melhor e-mail"
                    className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                  <Button size="lg" className="w-full sm:w-auto whitespace-nowrap">
                    Assinar Grátis
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Sem spam. Cancele quando quiser.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

