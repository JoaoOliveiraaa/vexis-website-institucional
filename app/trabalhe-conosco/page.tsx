import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, Users, Rocket, Heart, Upload } from "lucide-react"

export default function TrabalheConoscoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-6">
                <Briefcase className="h-4 w-4" />
                Carreiras
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                Trabalhe Conosco
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Faça parte de uma equipe inovadora que está transformando ideias em realidade digital. 
                Venha crescer conosco!
              </p>
            </div>
          </div>
        </section>

        {/* Cultura e Valores */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Nossa Cultura</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto mb-4">
                    <Rocket className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Inovação</h3>
                  <p className="text-muted-foreground">
                    Incentivamos a criatividade e o pensamento fora da caixa. 
                    Aqui, suas ideias são valorizadas e podem virar realidade.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto mb-4">
                    <Users className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Colaboração</h3>
                  <p className="text-muted-foreground">
                    Trabalhamos como uma família, compartilhando conhecimento 
                    e crescendo juntos em cada projeto.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto mb-4">
                    <Heart className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Paixão</h3>
                  <p className="text-muted-foreground">
                    Amamos o que fazemos e buscamos pessoas que também tenham 
                    paixão por tecnologia e inovação.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/20">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">O que Oferecemos</h2>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-3">
                <span className="text-primary text-xl mt-1">✓</span>
                <div>
                  <h3 className="font-semibold mb-1">Ambiente Criativo</h3>
                  <p className="text-muted-foreground">Escritório moderno e inspirador para você dar o seu melhor</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-primary text-xl mt-1">✓</span>
                <div>
                  <h3 className="font-semibold mb-1">Crescimento Profissional</h3>
                  <p className="text-muted-foreground">Oportunidades de desenvolvimento e aprendizado contínuo</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-primary text-xl mt-1">✓</span>
                <div>
                  <h3 className="font-semibold mb-1">Projetos Desafiadores</h3>
                  <p className="text-muted-foreground">Trabalhe com tecnologias modernas em projetos inovadores</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-primary text-xl mt-1">✓</span>
                <div>
                  <h3 className="font-semibold mb-1">Flexibilidade</h3>
                  <p className="text-muted-foreground">Horários flexíveis e possibilidade de trabalho remoto</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-primary text-xl mt-1">✓</span>
                <div>
                  <h3 className="font-semibold mb-1">Equipe Talentosa</h3>
                  <p className="text-muted-foreground">Trabalhe com profissionais apaixonados e experientes</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-primary text-xl mt-1">✓</span>
                <div>
                  <h3 className="font-semibold mb-1">Remuneração Competitiva</h3>
                  <p className="text-muted-foreground">Salário compatível com o mercado e benefícios</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Formulário de Candidatura */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Candidate-se Agora</h2>
              <p className="text-muted-foreground">
                Preencha o formulário abaixo e envie seu currículo. 
                Entraremos em contato em breve!
              </p>
            </div>

            <Card>
              <CardContent className="p-6 md:p-8">
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="nome" className="text-sm font-medium">
                        Nome Completo *
                      </label>
                      <Input id="nome" placeholder="Seu nome completo" required />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        E-mail *
                      </label>
                      <Input id="email" type="email" placeholder="seu@email.com" required />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="telefone" className="text-sm font-medium">
                        Telefone *
                      </label>
                      <Input id="telefone" type="tel" placeholder="(00) 00000-0000" required />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="cargo" className="text-sm font-medium">
                        Área de Interesse *
                      </label>
                      <select
                        id="cargo"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        required
                      >
                        <option value="">Selecione uma área</option>
                        <option value="desenvolvimento">Desenvolvimento Web</option>
                        <option value="mobile">Desenvolvimento Mobile</option>
                        <option value="design">Design UI/UX</option>
                        <option value="marketing">Marketing Digital</option>
                        <option value="gestao">Gestão de Projetos</option>
                        <option value="comercial">Comercial</option>
                        <option value="outro">Outra Área</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="linkedin" className="text-sm font-medium">
                      LinkedIn
                    </label>
                    <Input id="linkedin" placeholder="https://linkedin.com/in/seu-perfil" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="portfolio" className="text-sm font-medium">
                      Portfolio / GitHub
                    </label>
                    <Input id="portfolio" placeholder="https://github.com/seu-usuario" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="mensagem" className="text-sm font-medium">
                      Apresentação *
                    </label>
                    <Textarea
                      id="mensagem"
                      placeholder="Conte um pouco sobre você, suas experiências e por que quer trabalhar na Vexis..."
                      rows={6}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="curriculo" className="text-sm font-medium">
                      Currículo (PDF) *
                    </label>
                    <div className="flex items-center gap-2">
                      <Input id="curriculo" type="file" accept=".pdf" required />
                      <Upload className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Enviar Candidatura
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Ao enviar este formulário, você concorda com nossa política de privacidade 
                    e com o tratamento dos seus dados pessoais.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

