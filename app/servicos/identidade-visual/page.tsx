import { ModernHeader } from "@/components/modern-header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Palette, Type, ImageIcon, Sparkles } from "lucide-react"

export default function IdentidadeVisualPage() {
  const features = [
    "Criação de logotipo profissional",
    "Paleta de cores estratégica",
    "Tipografia personalizada",
    "Manual de identidade visual",
    "Versões do logo (colorido, P&B, negativo)",
    "Aplicações em mockups",
    "Cartão de visitas",
    "Papel timbrado",
    "Assinatura de email",
    "Posts para redes sociais",
    "Arquivos em alta resolução",
    "Formatos vetoriais editáveis",
  ]

  const benefits = [
    {
      icon: Palette,
      title: "Identidade Única",
      description: "Design exclusivo que representa perfeitamente os valores da sua marca.",
    },
    {
      icon: Type,
      title: "Consistência Visual",
      description: "Manual completo para manter a identidade em todas as aplicações.",
    },
    {
      icon: ImageIcon,
      title: "Versatilidade",
      description: "Logo adaptável para diferentes mídias e tamanhos.",
    },
    {
      icon: Sparkles,
      title: "Profissionalismo",
      description: "Transmita credibilidade e destaque-se da concorrência.",
    },
  ]

  return (
    <main className="min-h-screen">
      <ModernHeader />

      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-[#0D1B2A] via-[#1B2A3A] to-background">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4" variant="secondary">
                Identidade Visual
              </Badge>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance text-white">
                Crie uma <span className="text-primary">Marca Memorável</span> e Profissional
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8 text-pretty">
                Desenvolvemos identidades visuais completas que transmitem os valores da sua marca e criam conexão com
                seu público-alvo.
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
                <Palette className="w-48 h-48 text-primary/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Por Que Investir em Identidade Visual?</h2>
            <p className="text-lg text-muted-foreground">
              Uma identidade visual forte é essencial para se destacar no mercado e criar conexão com seu público
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
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">O Que Você Recebe</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Pacote completo de identidade visual com todos os elementos necessários para aplicar sua marca em
                qualquer mídia.
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
                <h3 className="font-heading text-2xl font-bold mb-4">Pronto para Criar sua Marca?</h3>
                <p className="mb-6 opacity-90">
                  Entre em contato e receba uma proposta personalizada. Vamos criar uma identidade visual que representa
                  perfeitamente seu negócio!
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
