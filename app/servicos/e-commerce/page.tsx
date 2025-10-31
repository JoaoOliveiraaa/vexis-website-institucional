import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, ShoppingCart, CreditCard, Package, TrendingUp, Lock, Smartphone } from "lucide-react"
import Link from "next/link"

export default function EcommercePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 mb-6">
              <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                E-commerce
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Lojas Virtuais Completas e Integradas
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Plataformas de e-commerce robustas e escaláveis para você vender online com segurança e eficiência
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

          {/* O que é E-commerce */}
          <section className="mb-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Sua Loja Virtual Completa</h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Um e-commerce é muito mais do que um site com produtos. É uma plataforma completa de vendas online que
                precisa gerenciar catálogo, estoque, pagamentos, entregas, clientes e muito mais. Tudo isso funcionando
                de forma integrada e segura.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Na Vexis, desenvolvemos lojas virtuais personalizadas com as melhores tecnologias do mercado, integrando
                gateways de pagamento, sistemas de frete, ERPs e todas as ferramentas necessárias para você vender
                online com sucesso.
              </p>
            </div>
          </section>

          {/* Benefícios */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center">Por que investir em um E-commerce?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: ShoppingCart,
                  title: "Vendas 24/7",
                  description: "Sua loja aberta todos os dias, a qualquer hora, sem limites geográficos",
                },
                {
                  icon: TrendingUp,
                  title: "Escalabilidade",
                  description: "Cresça seu negócio sem limitações físicas de espaço ou localização",
                },
                {
                  icon: CreditCard,
                  title: "Múltiplas Formas de Pagamento",
                  description: "Aceite cartões, PIX, boleto e parcelamento sem juros",
                },
                {
                  icon: Package,
                  title: "Gestão Integrada",
                  description: "Controle estoque, pedidos e entregas em um só lugar",
                },
                {
                  icon: Lock,
                  title: "Segurança",
                  description: "Proteção de dados e transações com certificados SSL e PCI",
                },
                {
                  icon: Smartphone,
                  title: "Mobile First",
                  description: "Experiência otimizada para compras pelo celular",
                },
              ].map((benefit, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <benefit.icon className="h-10 w-10 mb-4 text-purple-600" />
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* O que está incluído */}
          <section className="mb-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">O que está incluído</h2>
              <div className="space-y-4">
                {[
                  "Design personalizado e responsivo para todos os dispositivos",
                  "Catálogo de produtos com categorias e filtros avançados",
                  "Sistema de busca inteligente",
                  "Carrinho de compras otimizado",
                  "Integração com gateways de pagamento (Mercado Pago, PagSeguro, Stripe)",
                  "Cálculo automático de frete (Correios, transportadoras)",
                  "Painel administrativo completo",
                  "Gestão de estoque e produtos",
                  "Sistema de cupons e promoções",
                  "Área do cliente com histórico de pedidos",
                  "Integração com Google Analytics e Facebook Pixel",
                  "Otimização para SEO",
                  "Certificado SSL incluso",
                  "Treinamento completo da plataforma",
                  "Suporte técnico por 90 dias",
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
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Planejamento",
                  description: "Definimos funcionalidades, integrações e estratégia de vendas",
                },
                {
                  step: "02",
                  title: "Design & UX",
                  description: "Criamos uma experiência de compra intuitiva e atrativa",
                },
                {
                  step: "03",
                  title: "Desenvolvimento",
                  description: "Programamos e integramos todos os sistemas necessários",
                },
                {
                  step: "04",
                  title: "Testes & Lançamento",
                  description: "Testamos tudo e lançamos sua loja pronta para vender",
                },
              ].map((process, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                    {process.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{process.title}</h3>
                  <p className="text-muted-foreground">{process.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Final */}
          <section className="text-center">
            <Card className="p-12 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border-purple-500/20">
              <h2 className="text-3xl font-bold mb-4">Pronto para vender online?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Vamos criar a loja virtual perfeita para o seu negócio
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
