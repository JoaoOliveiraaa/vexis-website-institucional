"use client"

import { Card } from "@/components/ui/card"
import { Code2, Lightbulb, Rocket, Users } from "lucide-react"

const values = [
  {
    icon: Lightbulb,
    title: "Inovação",
    description: "Buscamos constantemente novas tecnologias e abordagens para entregar soluções de ponta",
  },
  {
    icon: Code2,
    title: "Excelência Técnica",
    description: "Código limpo, arquitetura sólida e as melhores práticas de desenvolvimento",
  },
  {
    icon: Users,
    title: "Foco no Cliente",
    description: "Seu sucesso é nossa prioridade. Trabalhamos lado a lado para alcançar seus objetivos",
  },
  {
    icon: Rocket,
    title: "Agilidade",
    description: "Entregas rápidas e iterativas, adaptando-nos às suas necessidades em tempo real",
  },
]

export function AboutSection() {
  return (
    <section id="sobre" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-balance">Quem Somos</h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Somos uma equipe apaixonada por tecnologia, dedicada a criar experiências digitais excepcionais que fazem a
            diferença
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {values.map((value, index) => (
            <Card
              key={index}
              className="p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <value.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
