import { ModernHeader } from "@/components/modern-header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Camera, Video, ImageIcon, Sparkles } from "lucide-react"

export default function MidiaPage() {
  const features = [
    "Fotografia de eventos corporativos",
    "Cobertura de festas e celebrações",
    "Fotografia de produtos",
    "Vídeos institucionais",
    "Vídeos promocionais",
    "Edição profissional",
    "Tratamento de imagens",
    "Entrega em alta resolução",
    "Direitos de uso comercial",
    "Equipamentos profissionais",
    "Equipe experiente",
    "Prazos de entrega rápidos",
  ]

  const benefits = [
    {
      icon: Camera,
      title: "Fotografia Profissional",
      description: "Registre momentos importantes com qualidade e criatividade.",
    },
    {
      icon: Video,
      title: "Produção de Vídeos",
      description: "Conte histórias envolventes através de vídeos de alta qualidade.",
    },
    {
      icon: ImageIcon,
      title: "Edição Avançada",
      description: "Tratamento e edição profissional para resultados impecáveis.",
    },
    {
      icon: Sparkles,
      title: "Conteúdo Exclusivo",
      description: "Material visual único para destacar sua marca.",
    },
  ]

  return (
    <main className="min-h-screen">
      <ModernHeader />

      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-[#0D1B2A] via-[#1B2A3A] to-background">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-red-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4" variant="secondary">
                Fotografia & Vídeo
              </Badge>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance text-white">
                Produções <span className="text-primary text-white">Audiovisuais</span> de Alta Qualidade
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8 text-pretty">
                Cobertura profissional de eventos, fotografia de produtos e produção de vídeos institucionais e
                promocionais para sua empresa.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <a href="https://wa.me/5516997741702" target="_blank" rel="noopener noreferrer">
                    Solicitar Orçamento
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/portfolio">Ver Trabalhos</a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-8 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
                    <Camera className="w-12 h-12 text-primary" />
                  </div>
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-red-500/20 to-pink-500/20 flex items-center justify-center">
                    <Video className="w-12 h-12 text-primary" />
                  </div>
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-primary" />
                  </div>
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Nossos Serviços</h2>
            <p className="text-lg text-muted-foreground">
              Produções audiovisuais completas para eventos, produtos e conteúdo institucional
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
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">O Que Oferecemos</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Serviços completos de fotografia e vídeo com equipamentos profissionais e equipe experiente.
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
                <h3 className="font-heading text-2xl font-bold mb-4">Pronto para Registrar seu Evento?</h3>
                <p className="mb-6 opacity-90">
                  Entre em contato e receba uma proposta personalizada. Vamos criar conteúdo visual de alta qualidade
                  para você!
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
