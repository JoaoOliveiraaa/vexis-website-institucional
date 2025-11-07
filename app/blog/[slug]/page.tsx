import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, Share2, User } from "lucide-react"
import Link from "next/link"

// Dados dos posts (em produção, viriam de um CMS ou banco de dados)
const postsData: Record<string, any> = {
  "como-ia-pode-automatizar-seu-negocio": {
    titulo: "Como a IA Pode Automatizar Seu Negócio em 2024",
    resumo: "Descubra as principais formas de usar inteligência artificial para automatizar processos, reduzir custos e aumentar a eficiência do seu negócio.",
    categoria: "IA & Automação",
    autor: "João Silva",
    data: "15 Nov 2024",
    tempoLeitura: "8 min",
    imagem: "/blog/ia-automacao-negocio.jpg",
    conteudo: `
A inteligência artificial deixou de ser ficção científica e se tornou uma ferramenta essencial para empresas de todos os tamanhos. Neste artigo, vamos explorar como você pode usar IA para automatizar processos e impulsionar seu negócio.

## O Que É Automação com IA?

Automação com IA vai além dos scripts tradicionais. Ela utiliza machine learning e processamento de linguagem natural para tomar decisões inteligentes, aprender com padrões e se adaptar a novas situações sem intervenção humana constante.

### Principais Benefícios

- **Redução de Custos:** Automatize tarefas repetitivas e libere sua equipe para atividades estratégicas
- **Disponibilidade 24/7:** Sistemas de IA funcionam ininterruptamente
- **Escalabilidade:** Processe milhares de solicitações simultaneamente
- **Precisão:** Reduza erros humanos em processos operacionais

## Casos de Uso Práticos

### 1. Atendimento ao Cliente com Chatbots

Chatbots inteligentes podem responder perguntas frequentes, agendar serviços e até resolver problemas simples sem necessidade de atendentes humanos. Na Vexis, implementamos soluções de chatbot que:

- Entendem linguagem natural
- Aprendem com cada interação
- Integram com sistemas de gestão
- Transferem para humanos quando necessário

### 2. Automação de Agendamentos

Nosso sistema **Agende Beauty** é um exemplo perfeito de como IA pode revolucionar agendamentos:

- Clientes agendam via WhatsApp naturalmente
- Confirmações e lembretes automáticos
- Gestão inteligente de conflitos
- Análise de padrões de agendamento

### 3. Gestão de Ordens de Serviço

O **Oficina System** mostra como IA pode melhorar a comunicação com clientes:

- Notificações automáticas sobre status do serviço
- Aprovações de orçamento via WhatsApp
- Histórico inteligente de manutenções
- Previsão de necessidades futuras

## Tecnologias Que Usamos

### N8N - Orquestração de Workflows

O N8N permite criar automações complexas conectando diferentes serviços sem código. É perfeito para:

- Integrar WhatsApp, e-mail, CRM e outros sistemas
- Criar fluxos condicionais inteligentes
- Agendar tarefas automatizadas
- Processar dados em larga escala

### OpenAI e IA Generativa

Modelos como GPT-4 permitem criar assistentes que:

- Compreendem contexto e nuances
- Geram respostas naturais e personalizadas
- Aprendem com feedback
- Se adaptam ao tom da marca

## Como Começar

### Passo 1: Identifique Processos Repetitivos

Liste todas as tarefas que sua equipe repete diariamente:
- Responder as mesmas perguntas
- Enviar confirmações e lembretes
- Atualizar status em sistemas
- Gerar relatórios

### Passo 2: Avalie o ROI

Calcule quanto tempo e dinheiro cada processo consome. Mesmo automações simples podem economizar centenas de horas mensais.

### Passo 3: Comece Pequeno

Não tente automatizar tudo de uma vez. Escolha um processo, automatize, teste, ajuste e expanda gradualmente.

### Passo 4: Monitore e Otimize

Use analytics para acompanhar a performance das automações e fazer melhorias contínuas.

## Casos de Sucesso

### Salão de Beleza - 85% Menos Faltas

Após implementar nosso sistema de agendamento com IA, um salão de beleza reduziu faltas em 85% através de lembretes inteligentes e confirmações automatizadas.

### Oficina Mecânica - 90% Satisfação

Uma oficina aumentou a satisfação dos clientes para 90% ao automatizar comunicações sobre status dos veículos via WhatsApp.

## Investimento e Retorno

Automações com IA têm se tornado cada vez mais acessíveis. Na Vexis, oferecemos:

- **Sistemas Prontos:** Implementação rápida com ROI em 2-3 meses
- **Soluções Personalizadas:** Desenvolvidas para necessidades específicas
- **Planos de Manutenção:** Suporte contínuo e atualizações

## Próximos Passos

A IA não é mais um luxo, é uma necessidade competitiva. Empresas que não automatizarem processos ficarão para trás.

**Quer saber como podemos automatizar seu negócio?** Entre em contato conosco para uma análise gratuita dos seus processos e uma demonstração dos nossos sistemas.

## Conclusão

A automação com IA é uma jornada, não um destino. Comece pequeno, aprenda com os resultados e expanda gradualmente. Os benefícios em eficiência, redução de custos e satisfação do cliente fazem o investimento valer muito a pena.

---

**Sobre o Autor:** João Silva é CEO da Vexis e especialista em automação com IA, com mais de 8 anos de experiência ajudando empresas a digitalizarem seus processos.
    `
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = postsData[params.slug]

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Post não encontrado</h1>
            <Link href="/blog">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        {/* Breadcrumb */}
        <section className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="container mx-auto max-w-4xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para o Blog
            </Link>
          </div>
        </section>

        {/* Hero do Post */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <div className="space-y-6 mb-8">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                {post.categoria}
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold text-balance">
                {post.titulo}
              </h1>

              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                {post.resumo}
              </p>

              <div className="flex items-center gap-6 text-sm text-muted-foreground flex-wrap">
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {post.autor}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {post.data}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {post.tempoLeitura} de leitura
                </span>
              </div>

              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Compartilhar
                </Button>
              </div>
            </div>

            {/* Imagem destaque */}
            <div className="aspect-video relative overflow-hidden rounded-lg bg-muted mb-12">
              <img
                src={post.imagem}
                alt={post.titulo}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </section>

        {/* Conteúdo */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-3xl">
            <article className="prose prose-lg dark:prose-invert max-w-none">
              <div 
                dangerouslySetInnerHTML={{ __html: post.conteudo.replace(/\n/g, '<br/>') }}
                className="space-y-4 text-muted-foreground leading-relaxed"
                style={{
                  whiteSpace: 'pre-wrap'
                }}
              />
            </article>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 sm:px-6 lg:px-8 mt-16">
          <div className="container mx-auto max-w-3xl">
            <Card className="bg-gradient-to-br from-primary/5 via-primary/10 to-accent/5 border-primary/20">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Gostou do conteúdo?</h3>
                <p className="text-muted-foreground mb-6">
                  Entre em contato conosco e descubra como podemos ajudar seu negócio 
                  com nossas soluções de automação e IA
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/contato">
                    <Button size="lg">
                      Falar com Especialista
                    </Button>
                  </Link>
                  <Link href="/automacao-ia">
                    <Button size="lg" variant="outline">
                      Ver Soluções com IA
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Posts relacionados */}
        <section className="px-4 sm:px-6 lg:px-8 mt-16">
          <div className="container mx-auto max-w-4xl">
            <h3 className="text-2xl font-bold mb-8">Leia Também</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/blog">
                <Card className="hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <Badge className="mb-3">Desenvolvimento</Badge>
                    <h4 className="font-bold mb-2">Next.js 14: Novidades e Recursos</h4>
                    <p className="text-sm text-muted-foreground">
                      Descubra as principais mudanças do Next.js 14...
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/blog">
                <Card className="hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <Badge className="mb-3">Automação</Badge>
                    <h4 className="font-bold mb-2">N8N: Workflows Sem Código</h4>
                    <p className="text-sm text-muted-foreground">
                      Aprenda a criar automações poderosas com N8N...
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

