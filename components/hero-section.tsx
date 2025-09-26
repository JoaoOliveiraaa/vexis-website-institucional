import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-primary text-primary-foreground overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/90" />
      <div className="absolute inset-0 geometric-bg opacity-40" />

      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-secondary/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-secondary/30 to-transparent rounded-lg rotate-45 animate-bounce delay-500"></div>
      <div className="absolute bottom-1/3 right-1/3 w-16 h-16 bg-gradient-to-tl from-secondary/40 to-transparent rounded-full animate-ping delay-700"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-secondary/30">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary-foreground/90">
                Tecnologia • Estratégia • Resultados
              </span>
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 text-balance leading-tight">
            Tecnologia que{" "}
            <span className="bg-gradient-to-r from-secondary to-secondary/80 bg-clip-text text-transparent">
              converte
            </span>
            <br />
            <span className="text-4xl sm:text-5xl lg:text-6xl">Estratégia que escala</span>
          </h1>

          <p className="text-xl sm:text-2xl text-primary-foreground/90 mb-12 max-w-3xl mx-auto text-pretty leading-relaxed">
            Desenvolvemos soluções digitais completas para escalar seu negócio com confiança e resultados mensuráveis.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-10 py-4 rounded-full shadow-2xl hover:shadow-secondary/25 transition-all duration-300 group"
            >
              Fale Conosco
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-10 py-4 bg-transparent rounded-full backdrop-blur-sm hover:border-secondary/50 transition-all duration-300 group"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Ver Portfólio
            </Button>
          </div>

          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-primary-foreground/70">
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">50+</div>
              <div className="text-sm">Projetos Entregues</div>
            </div>
            <div className="w-px h-8 bg-primary-foreground/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">98%</div>
              <div className="text-sm">Satisfação</div>
            </div>
            <div className="w-px h-8 bg-primary-foreground/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">24h</div>
              <div className="text-sm">Suporte</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
