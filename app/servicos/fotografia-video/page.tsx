import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Camera, Video, Sparkles, Film, ImageIcon, Play } from "lucide-react"
import Link from "next/link"

export default function FotografiaVideoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 mb-6">
              <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Fotografia & Vídeo
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Cobertura de Eventos e Produção Audiovisual
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Conteúdo visual profissional para elevar a comunicação da sua marca
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

          {/* O que oferecemos */}
          <section className="mb-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Conteúdo Visual que Impacta</h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Em um mundo cada vez mais visual, fotos e vídeos de qualidade profissional são essenciais para destacar
                sua marca. Seja para registrar eventos importantes, criar conteúdo para redes sociais ou produzir vídeos
                institucionais, o conteúdo audiovisual é o que mais engaja e converte.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Na Vexi, oferecemos serviços completos de fotografia e produção de vídeo, desde a cobertura de eventos
                corporativos até a criação de conteúdo estratégico para marketing digital. Nossa equipe transforma
                momentos em memórias e ideias em conteúdo visual impactante.
              </p>
            </div>
          </section>

          {/* Serviços */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center">Nossos Serviços</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Camera,
                  title: "Fotografia de Eventos",
                  description: "Cobertura completa de eventos corporativos, lançamentos e confraternizações",
                },
                {
                  icon: Video,
                  title: "Vídeos Institucionais",
                  description: "Vídeos profissionais sobre sua empresa, produtos e serviços",
                },
                {
                  icon: Film,
                  title: "Produção de Conteúdo",
                  description: "Vídeos e fotos para redes sociais, campanhas e marketing",
                },
                {
                  icon: ImageIcon,
                  title: "Fotografia de Produtos",
                  description: "Fotos profissionais de produtos para e-commerce e catálogos",
                },
                {
                  icon: Play,
                  title: "Vídeos Publicitários",
                  description: "Comerciais e anúncios em vídeo para campanhas de marketing",
                },
                {
                  icon: Sparkles,
                  title: "Edição e Pós-Produção",
                  description: "Tratamento de imagens e edição profissional de vídeos",
                },
              ].map((service, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <service.icon className="h-10 w-10 mb-4 text-purple-600" />
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Tipos de Produção */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center">Tipos de Produção</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8">
                <Camera className="h-12 w-12 mb-4 text-purple-600" />
                <h3 className="text-2xl font-bold mb-4">Fotografia</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Eventos corporativos e sociais</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Fotografia de produtos (e-commerce)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Retratos corporativos e headshots</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Fotografia de ambientes e instalações</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Banco de imagens personalizado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Tratamento e edição profissional</span>
                  </li>
                </ul>
              </Card>
              <Card className="p-8">
                <Video className="h-12 w-12 mb-4 text-purple-600" />
                <h3 className="text-2xl font-bold mb-4">Vídeo</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Vídeos institucionais e corporativos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Comerciais e vídeos publicitários</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Conteúdo para redes sociais (Reels, TikTok)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Depoimentos e cases de sucesso</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Cobertura de eventos ao vivo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Edição, motion graphics e legendas</span>
                  </li>
                </ul>
              </Card>
            </div>
          </section>

          {/* O que está incluído */}
          <section className="mb-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">O que está incluído</h2>
              <div className="space-y-4">
                {[
                  "Planejamento e roteiro da produção",
                  "Equipamentos profissionais (câmeras, lentes, iluminação, áudio)",
                  "Equipe especializada (fotógrafo, cinegrafista, assistentes)",
                  "Captação de imagens em alta resolução",
                  "Gravação de vídeos em 4K",
                  "Edição e tratamento profissional",
                  "Correção de cores e iluminação",
                  "Trilha sonora e efeitos sonoros (vídeos)",
                  "Motion graphics e animações (vídeos)",
                  "Legendas e closed captions",
                  "Entrega em múltiplos formatos",
                  "Galeria online para visualização",
                  "Direitos de uso comercial",
                  "Revisões incluídas",
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
                  title: "Briefing",
                  description: "Entendemos suas necessidades e objetivos",
                },
                {
                  step: "02",
                  title: "Planejamento",
                  description: "Criamos roteiro e definimos locações e equipe",
                },
                {
                  step: "03",
                  title: "Produção",
                  description: "Realizamos a captação de fotos e vídeos",
                },
                {
                  step: "04",
                  title: "Pós-Produção",
                  description: "Editamos e finalizamos o material",
                },
                {
                  step: "05",
                  title: "Entrega",
                  description: "Disponibilizamos os arquivos finais",
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
              <h2 className="text-3xl font-bold mb-4">Pronto para criar conteúdo visual impactante?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Vamos produzir fotos e vídeos profissionais para sua marca
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
