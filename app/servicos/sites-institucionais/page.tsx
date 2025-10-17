import { ModernHeader } from "@/components/modern-header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Building2, Globe, Shield, Sparkles } from "lucide-react"

export default function SitesInstitucionaisPage() {
  const features = [
    "Design profissional e moderno",
    "Responsivo para todos os dispositivos",
    "SEO otimizado",
    "Painel administrativo intuitivo",
    "Integração com redes sociais",
    "Formulários de contato",
    "Google Analytics integrado",
    "Certificado SSL incluído",
    "Hospedagem de alta performance",
    "Suporte técnico contínuo",
  ]

  const benefits = [
    {
      icon: Building2,
      title: "Credibilidade Profissional",
      description: "Transmita confiança e profissionalismo com um site institucional de alta qualidade.",
    },
    {
      icon: Globe,
      title: "Presença Digital 24/7",
      description: "Seu negócio disponível para clientes em potencial a qualquer hora, em qualquer lugar.",
    },
    {
      icon: Shield,
      title: "Segurança Garantida",
      description: "Proteção completa com certificado SSL e backups automáticos regulares.",
    },
    {
      icon: Sparkles,
      title: "Design Personalizado",
      description: "Layout exclusivo que reflete a identidade e valores da sua empresa.",
    },
  ]

  return (
    <main className="min-h-screen">
      <ModernHeader />

      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-[#0D1B2A] via-[#1B2A3A] to-background">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4" variant="secondary">
                Sites Institucionais
              </Badge>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance text-white">
                Presença Digital <span className="text-primary">Profissional</span> para sua Empresa
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8 text-pretty">
                Desenvolvemos sites institucionais completos que transmitem credibilidade, apresentam seus serviços e
                fortalecem sua marca no ambiente digital.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <a href="https://wa.me/5516997741702" target="_blank" rel="noopener noreferrer">
                    Solicitar Orçamento
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/portfolio">Ver Portfólio</a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-8 flex items-center justify-center">
                <Building2 className="w-48 h-48 text-primary/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Por Que Ter um Site Institucional?</h2>
            <p className="text-lg text-muted-foreground">
              Um site institucional é essencial para estabelecer credibilidade e alcançar novos clientes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow border-2">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading text-lg font-bold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">O Que Está Incluído</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Cada site institucional desenvolvido pela VEXIS inclui todos os recursos necessários para uma presença
                digital completa e profissional.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
              <CardContent className="p-8">
                <h3 className="font-heading text-2xl font-bold mb-4">Pronto para Ter seu Site Institucional?</h3>
                <p className="mb-6 opacity-90">
                  Entre em contato e receba uma proposta personalizada. Vamos criar um site que representa perfeitamente
                  sua empresa!
                </p>
                <Button size="lg" className="w-full bg-background text-foreground hover:bg-background/90" asChild>
                  <a href="https://wa.me/5516997741702" target="_blank" rel="noopener noreferrer">
                    Falar com Especialista
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
