import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Users, Award, Zap, Target, Shield } from "lucide-react"

const values = [
  {
    icon: CheckCircle,
    title: "Compromisso",
    description: "Honramos todos os prazos e entregas acordadas com nossos clientes.",
  },
  {
    icon: Users,
    title: "Parceria",
    description: "Trabalhamos como uma extensão da sua equipe, focados no seu sucesso.",
  },
  {
    icon: Award,
    title: "Qualidade",
    description: "Entregamos soluções de alta qualidade que superam expectativas.",
  },
  {
    icon: Zap,
    title: "Resultados",
    description: "Nosso foco está sempre nos resultados e no crescimento do seu negócio.",
  },
  {
    icon: Target,
    title: "Precisão",
    description: "Estratégias direcionadas e personalizadas para cada cliente.",
  },
  {
    icon: Shield,
    title: "Confiança",
    description: "Transparência total em todos os processos e comunicação.",
  },
]

export function AboutSection() {
  return (
    <section id="sobre" className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 geometric-pattern opacity-20"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-secondary/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-secondary/10 rounded-full px-4 py-2 mb-4">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span className="text-sm font-medium text-secondary">Sobre Nós</span>
              </div>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-8 text-balance">
              Sobre a <span className="text-secondary">VEXIS</span>
            </h2>

            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
              <p>
                A VEXIS é uma empresa especializada em tecnologia digital, focada em entregar soluções que realmente
                fazem a diferença no crescimento dos nossos clientes.
              </p>
              <p>
                Nossa missão é transformar ideias em resultados concretos através de estratégias digitais eficazes,
                desenvolvimento de alta qualidade e um atendimento que prioriza a confiança e a transparência.
              </p>
              <p>
                Trabalhamos com empresas de todos os portes, desde startups até grandes corporações, sempre com o mesmo
                compromisso: entregar excelência e superar expectativas.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">5+</div>
                <div className="text-sm text-muted-foreground">Anos de Experiência</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Projetos Concluídos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">98%</div>
                <div className="text-sm text-muted-foreground">Clientes Satisfeitos</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-xl transition-all duration-500 border-border hover:border-secondary/30 bg-card/80 backdrop-blur-sm hover:scale-105 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-secondary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <CardContent className="p-0 relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-secondary/30 group-hover:to-primary/30 transition-all duration-300">
                    <value.icon className="h-8 w-8 text-secondary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-secondary transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
