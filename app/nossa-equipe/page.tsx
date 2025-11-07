import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Code, Palette, BarChart3, Linkedin, Github, Mail } from "lucide-react"
import Link from "next/link"

const equipe = [
  {
    nome: "João Oliveira",
    cargo: "CEO & Founder",
    especialidade: "Visão Estratégica & Liderança",
    foto: "/placeholder-user.jpg",
    bio: "Fundador da Vexis com visão empreendedora e paixão por tecnologia. Lidera a empresa com foco em inovação e excelência no atendimento ao cliente.",
    habilidades: ["Gestão", "Estratégia", "Inovação", "Liderança"],
    linkedin: "#",
    github: "#",
    email: "joao@vexis.com.br"
  },
  {
    nome: "Luigi Falconi",
    cargo: "CTO & CoFounder",
    especialidade: "Marketing & Desenvolvimento",
    foto: "/placeholder-user.jpg",
    bio: "Cofundador da Vexis com expertise em desenvolvimento e marketing digital. Combina conhecimento técnico com estratégias de crescimento para impulsionar resultados.",
    habilidades: ["Next.js", "React", "Marketing Digital", "Growth"],
    linkedin: "#",
    github: "#",
    email: "luigi@vexis.com.br"
  },
  {
    nome: "Lucas Salaro",
    cargo: "CTO & CoFounder",
    especialidade: "Comercial & Tecnologia",
    foto: "/placeholder-user.jpg",
    bio: "Cofundador da Vexis com forte atuação comercial e técnica. Especialista em entender necessidades dos clientes e transformá-las em soluções tecnológicas eficientes.",
    habilidades: ["Vendas", "Consultoria", "Desenvolvimento", "Gestão de Projetos"],
    linkedin: "#",
    github: "#",
    email: "lucas@vexis.com.br"
  },
  {
    nome: "Luiz Eduardo",
    cargo: "Gestor de Automações",
    especialidade: "IA & Automação",
    foto: "/placeholder-user.jpg",
    bio: "Especialista em automação e inteligência artificial. Responsável por desenvolver e implementar soluções de automação que otimizam processos e aumentam eficiência.",
    habilidades: ["N8N", "IA", "Automação", "Integração de APIs"],
    linkedin: "#",
    github: "#",
    email: "luiz@vexis.com.br"
  },
  {
    nome: "Ana Costa",
    cargo: "Head of Design",
    especialidade: "UI/UX Designer",
    foto: "/placeholder-user.jpg",
    bio: "Designer criativa com olhar atento aos detalhes. Especializada em criar experiências memoráveis e interfaces intuitivas que encantam usuários.",
    habilidades: ["Figma", "UI/UX", "Branding", "Design Systems"],
    linkedin: "#",
    github: "#",
    email: "ana@vexis.com.br"
  },
  {
    nome: "Pedro Silva",
    cargo: "Full Stack Developer",
    especialidade: "Desenvolvimento Web",
    foto: "/placeholder-user.jpg",
    bio: "Desenvolvedor full stack apaixonado por criar soluções robustas e escaláveis. Especialista em React, Next.js e Node.js com foco em performance.",
    habilidades: ["React", "Next.js", "Node.js", "TypeScript"],
    linkedin: "#",
    github: "#",
    email: "pedro@vexis.com.br"
  }
]

const valores = [
  {
    icon: Code,
    titulo: "Excelência Técnica",
    descricao: "Comprometidos com código limpo, boas práticas e tecnologias de ponta"
  },
  {
    icon: Users,
    titulo: "Trabalho em Equipe",
    descricao: "Colaboração e comunicação clara são a base do nosso sucesso"
  },
  {
    icon: Palette,
    titulo: "Criatividade",
    descricao: "Pensamos fora da caixa para criar soluções inovadoras e únicas"
  },
  {
    icon: BarChart3,
    titulo: "Foco em Resultados",
    descricao: "Seu sucesso é nossa prioridade, trabalhamos orientados a dados e métricas"
  }
]

export default function NossaEquipePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        {/* Hero */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-6">
                <Users className="h-4 w-4" />
                Nossa Equipe
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                Conheça quem vai cuidar do seu projeto
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Uma equipe de especialistas apaixonados por tecnologia, design e inovação, 
                prontos para transformar suas ideias em realidade
              </p>
            </div>
          </div>
        </section>

        {/* Membros da Equipe */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {equipe.map((membro, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardContent className="p-6 space-y-4">
                    {/* Foto */}
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="h-32 w-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <Users className="h-16 w-16 text-primary" />
                        </div>
                        <div className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center border-4 border-background">
                          <Code className="h-5 w-5" />
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="text-center space-y-1">
                      <h3 className="text-xl font-bold">{membro.nome}</h3>
                      <p className="text-sm font-medium text-primary">{membro.cargo}</p>
                      <p className="text-sm text-muted-foreground">{membro.especialidade}</p>
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-muted-foreground leading-relaxed text-center">
                      {membro.bio}
                    </p>

                    {/* Habilidades */}
                    <div className="flex flex-wrap gap-2 justify-center pt-2">
                      {membro.habilidades.map((habilidade, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {habilidade}
                        </Badge>
                      ))}
                    </div>

                    {/* Social */}
                    <div className="flex items-center justify-center gap-3 pt-4 border-t">
                      <a
                        href={membro.linkedin}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-primary transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                      <a
                        href={membro.github}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-primary transition-colors"
                        aria-label="GitHub"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                      <a
                        href={`mailto:${membro.email}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-primary transition-colors"
                        aria-label="Email"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/20">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nossos Valores</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Os princípios que guiam nosso trabalho e definem quem somos
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {valores.map((valor, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex justify-center">
                      <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center">
                        <valor.icon className="h-7 w-7 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-semibold">{valor.titulo}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {valor.descricao}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Estatísticas da Equipe */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nossa Experiência em Números</h2>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <p className="text-4xl font-bold text-primary mb-2">35+</p>
                  <p className="text-muted-foreground">Anos de Experiência Combinada</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <p className="text-4xl font-bold text-primary mb-2">15+</p>
                  <p className="text-muted-foreground">Tecnologias Dominadas</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <p className="text-4xl font-bold text-primary mb-2">50+</p>
                  <p className="text-muted-foreground">Projetos Entregues</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <p className="text-4xl font-bold text-primary mb-2">100%</p>
                  <p className="text-muted-foreground">Dedicação ao Cliente</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA - Junte-se a nós */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <Card className="bg-gradient-to-br from-primary/5 via-primary/10 to-accent/5 border-primary/20">
              <CardContent className="p-8 md:p-12 text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-4">Quer Fazer Parte da Equipe?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Estamos sempre em busca de talentos apaixonados por tecnologia. 
                  Confira nossas vagas abertas e venha crescer conosco!
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/trabalhe-conosco">
                    <Button size="lg" className="w-full sm:w-auto">
                      Ver Vagas Abertas
                    </Button>
                  </Link>
                  <Link href="/contato">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Fale Conosco
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

