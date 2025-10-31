import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin, Clock, MessageCircle } from "lucide-react"

export default function ContatoPage() {
  const whatsappMessage = encodeURIComponent("Oi, vim do site e quero mais informações")
  const whatsappLink = `https://wa.me/5516997741702?text=${whatsappMessage}`

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Entre em Contato</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Estamos prontos para transformar suas ideias em realidade digital. Fale conosco e descubra como podemos
                ajudar seu negócio.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-6">Informações de Contato</h2>

                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <MessageCircle className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">WhatsApp</h3>
                          <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            +55 16 99774-1702
                          </a>
                          <p className="text-sm text-muted-foreground mt-1">
                            Resposta rápida e atendimento personalizado
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Mail className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">E-mail</h3>
                          <a
                            href="mailto:contatooficialvexis@gmail.com"
                            className="text-muted-foreground hover:text-primary transition-colors break-all"
                          >
                            contatooficialvexis@gmail.com
                          </a>
                          <p className="text-sm text-muted-foreground mt-1">Envie sua mensagem detalhada</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Horário de Atendimento</h3>
                          <p className="text-muted-foreground">Segunda a Sexta: 9h às 18h</p>
                          <p className="text-muted-foreground">Sábado: 9h às 13h</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">CNPJ</h3>
                          <p className="text-muted-foreground">61.139.836/0001-86</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Por que escolher a Vexis?</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span>Atendimento personalizado e consultivo</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span>Soluções sob medida para seu negócio</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span>Tecnologia de ponta e inovação constante</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span>Suporte contínuo e manutenção garantida</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-6">Envie sua Mensagem</h2>

                  <form className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="nome" className="text-sm font-medium">
                          Nome *
                        </label>
                        <Input id="nome" placeholder="Seu nome completo" required />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="empresa" className="text-sm font-medium">
                          Empresa
                        </label>
                        <Input id="empresa" placeholder="Nome da empresa" />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          E-mail *
                        </label>
                        <Input id="email" type="email" placeholder="seu@email.com" required />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="telefone" className="text-sm font-medium">
                          Telefone *
                        </label>
                        <Input id="telefone" type="tel" placeholder="(00) 00000-0000" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="servico" className="text-sm font-medium">
                        Serviço de Interesse
                      </label>
                      <select
                        id="servico"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <option value="">Selecione um serviço</option>
                        <option value="landing-pages">Landing Pages</option>
                        <option value="sites">Sites Institucionais</option>
                        <option value="ecommerce">E-commerce</option>
                        <option value="apps">Aplicativos</option>
                        <option value="sistemas">Sistemas Personalizados</option>
                        <option value="identidade">Identidade Visual</option>
                        <option value="trafego">Tráfego Pago</option>
                        <option value="redes">Redes Sociais</option>
                        <option value="foto-video">Fotografia & Vídeo</option>
                        <option value="ia">IA & Automação</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="mensagem" className="text-sm font-medium">
                        Mensagem *
                      </label>
                      <Textarea
                        id="mensagem"
                        placeholder="Conte-nos sobre seu projeto ou necessidade..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      Enviar Mensagem
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Ao enviar este formulário, você concorda com nossa política de privacidade.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
