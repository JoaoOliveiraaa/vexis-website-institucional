import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Palette, Type, Sparkles, FileText, ImageIcon, Layers } from "lucide-react"
import Link from "next/link"

export default function IdentidadeVisualPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 mb-6">
              <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Identidade Visual
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Logo, Paleta de Cores, Tipografia e Branding
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Identidade visual completa para sua marca se destacar e ser memorável no mercado
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="#contato">Solicitar Orçamento</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/projetos">Ver Projetos</Link>
              </Button>
            </div>
          </div>

          {/* O que é Identidade Visual */}
          <section className="mb-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">A Cara da sua Marca</h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Identidade visual é muito mais do que um logo bonito. É o conjunto de elementos visuais que representam
                sua marca e a tornam reconhecível: logotipo, cores, tipografia, padrões gráficos e aplicações. É a
                personalidade visual do seu negócio.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Na Vexi, criamos identidades visuais completas e coerentes, que transmitem os valores da sua marca e
                criam conexão emocional com seu público. Do conceito à aplicação, desenvolvemos uma identidade que faz
                sua marca ser lembrada.
              </p>
            </div>
          </section>

          {/* Componentes */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center">Componentes da Identidade Visual</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Sparkles,
                  title: "Logotipo",
                  description: "Símbolo único e memorável que representa sua marca",
                },
                {
                  icon: Palette,
                  title: "Paleta de Cores",
                  description: "Cores estratégicas que transmitem a personalidade da marca",
                },
                {
                  icon: Type,
                  title: "Tipografia",
                  description: "Fontes que complementam e reforçam a identidade",
                },
                {
                  icon: Layers,
                  title: "Padrões Gráficos",
                  description: "Elementos visuais complementares e texturas",
                },
                {
                  icon: ImageIcon,
                  title: "Iconografia",
                  description: "Conjunto de ícones personalizados para a marca",
                },
                {
                  icon: FileText,
                  title: "Manual da Marca",
                  description: "Guia completo de aplicação da identidade visual",
                },
              ].map((component, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <component.icon className="h-10 w-10 mb-4 text-purple-600" />
                  <h3 className="text-xl font-semibold mb-2">{component.title}</h3>
                  <p className="text-muted-foreground">{component.description}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Por que investir */}
          <section className="mb-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Por que investir em Identidade Visual?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Reconhecimento</h3>
                  <p className="text-muted-foreground">
                    Uma identidade forte torna sua marca facilmente reconhecível e memorável
                  </p>
                </Card>
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Profissionalismo</h3>
                  <p className="text-muted-foreground">Transmite credibilidade e seriedade para clientes e parceiros</p>
                </Card>
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Diferenciação</h3>
                  <p className="text-muted-foreground">
                    Destaque-se da concorrência com uma identidade única e autêntica
                  </p>
                </Card>
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Consistência</h3>
                  <p className="text-muted-foreground">
                    Mantenha coerência visual em todos os pontos de contato com o cliente
                  </p>
                </Card>
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Valor Percebido</h3>
                  <p className="text-muted-foreground">
                    Uma marca bem construída permite precificar melhor seus produtos
                  </p>
                </Card>
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Conexão Emocional</h3>
                  <p className="text-muted-foreground">Crie vínculo emocional com seu público através do design</p>
                </Card>
              </div>
            </div>
          </section>

          {/* O que está incluído */}
          <section className="mb-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">O que está incluído</h2>
              <div className="space-y-4">
                {[
                  "Pesquisa de mercado e análise de concorrentes",
                  "Briefing completo para entender a essência da marca",
                  "Desenvolvimento de 3 conceitos de logotipo",
                  "Refinamento e finalização do logo escolhido",
                  "Versões do logo (colorida, monocromática, negativa)",
                  "Paleta de cores completa (primárias e secundárias)",
                  "Definição de tipografia (fontes principais e complementares)",
                  "Padrões gráficos e elementos visuais",
                  "Conjunto de ícones personalizados",
                  "Manual da marca completo (brandbook)",
                  "Arquivos em diversos formatos (AI, EPS, PNG, SVG, PDF)",
                  "Mockups de aplicação da identidade",
                  "Cartão de visitas digital",
                  "Assinatura de e-mail",
                  "Revisões ilimitadas até aprovação final",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Processo */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center">Nosso Processo</h2>
            <div className="grid md:grid-cols-5 gap-6">
              {[
                {
                  step: "01",
                  title: "Imersão",
                  description: "Entendemos seu negócio, valores e público-alvo",
                },
                {
                  step: "02",
                  title: "Pesquisa",
                  description: "Analisamos mercado, concorrentes e referências",
                },
                {
                  step: "03",
                  title: "Criação",
                  description: "Desenvolvemos conceitos e alternativas de logo",
                },
                {
                  step: "04",
                  title: "Refinamento",
                  description: "Aperfeiçoamos o conceito escolhido",
                },
                {
                  step: "05",
                  title: "Entrega",
                  description: "Finalizamos e entregamos todos os arquivos",
                },
              ].map((process, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-3">
                    {process.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{process.title}</h3>
                  <p className="text-sm text-muted-foreground">{process.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Final */}
          <section className="text-center">
            <Card className="p-12 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border-purple-500/20">
              <h2 className="text-3xl font-bold mb-4">Pronto para criar uma marca memorável?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Vamos desenvolver a identidade visual perfeita para o seu negócio
              </p>
              <Button size="lg" asChild>
                <a href="#contato">Solicitar Orçamento Gratuito</a>
              </Button>
            </Card>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
