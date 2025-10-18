import { ModernHeader } from "@/components/modern-header"
import { Footer } from "@/components/footer"
import { ContactSection } from "@/components/contact-section"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContatoPage() {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "contatooficialvexis@gmail.com",
      link: "mailto:contatooficialvexis@gmail.com",
    },
    {
      icon: Phone,
      title: "WhatsApp",
      content: "+55 16 99774-1702",
      link: "https://wa.me/5516997741702",
    },
    {
      icon: MapPin,
      title: "Localização",
      content: "São Paulo, Brasil",
      link: null,
    },
    {
      icon: Clock,
      title: "Horário",
      content: "Seg - Sex: 9h às 18h",
      link: null,
    },
  ]

  return (
    <main className="min-h-screen">
      <ModernHeader />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-background" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

        <div className="container relative mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4" variant="secondary">
              Entre em Contato
            </Badge>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Vamos Conversar Sobre <span className="text-primary">Seu Projeto</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty">
              Estamos prontos para ouvir suas ideias e transformá-las em soluções digitais que impulsionam seu negócio.
              Entre em contato conosco!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              const content = info.link ? (
                <a
                  href={info.link}
                  target={info.link.startsWith("http") ? "_blank" : undefined}
                  rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-primary hover:underline"
                >
                  {info.content}
                </a>
              ) : (
                <span className="text-muted-foreground">{info.content}</span>
              )

              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading font-bold mb-2">{info.title}</h3>
                    <div className="text-sm">{content}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactSection />

      <Footer />
    </main>
  )
}
