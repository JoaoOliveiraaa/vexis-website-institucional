import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Globe, Target, Smartphone, Settings, Palette, Camera, Users, Wrench } from "lucide-react"

const services = [
  {
    icon: Zap,
    title: "Landing Pages",
    description:
      "Páginas de alta conversão focadas em resultados e geração de leads qualificados com design otimizado.",
  },
  {
    icon: Globe,
    title: "Sites Institucionais",
    description: "Websites profissionais que transmitem credibilidade e fortalecem sua marca no mercado digital.",
  },
  {
    icon: Smartphone,
    title: "Aplicativos",
    description: "Apps móveis e web personalizados para otimizar processos e melhorar a experiência do usuário.",
  },
  {
    icon: Settings,
    title: "Micro SaaS",
    description:
      "Desenvolvimento de sistemas especializados para automatizar e escalar operações específicas do seu negócio.",
  },
  {
    icon: Palette,
    title: "Identidade Visual",
    description: "Criação completa de logo, paleta de cores, tipografia e elementos visuais para fortalecer sua marca.",
  },
  {
    icon: Target,
    title: "Tráfego Pago",
    description: "Campanhas estratégicas no Google Ads e Meta Ads para maximizar ROI e alcançar seu público-alvo.",
  },
  {
    icon: Users,
    title: "Redes Sociais",
    description:
      "Gestão profissional de Instagram, Facebook, TikTok e WhatsApp para engajar e converter sua audiência.",
  },
  {
    icon: Camera,
    title: "Fotografia e Vídeos",
    description: "Produção audiovisual de eventos corporativos e conteúdo promocional de alta qualidade.",
  },
  {
    icon: Wrench,
    title: "Suporte Técnico",
    description: "Montagem, manutenção e suporte especializado para equipamentos de TI e infraestrutura tecnológica.",
  },
]

export function ServicesSection() {
  return (
    <section id="servicos" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 geometric-pattern opacity-30"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-secondary/10 to-primary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">Nossos Serviços</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Soluções completas e especializadas para transformar sua presença digital e acelerar o crescimento do seu
            negócio com tecnologia de ponta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-500 border-border hover:border-secondary/30 bg-card/80 backdrop-blur-sm hover:scale-105 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-secondary/20 to-transparent rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-primary/20 to-transparent rounded-tr-full"></div>

              <CardHeader className="text-center pb-6 relative z-10">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:from-secondary/30 group-hover:to-primary/30 transition-all duration-300 shadow-lg">
                  <service.icon className="h-10 w-10 text-secondary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground group-hover:text-secondary transition-colors duration-300">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-center text-muted-foreground leading-relaxed text-base">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-primary to-secondary p-1 rounded-full">
            <div className="bg-background rounded-full px-8 py-4">
              <p className="text-lg font-semibold text-foreground">Pronto para transformar seu negócio?</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
