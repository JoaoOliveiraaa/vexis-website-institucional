import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import Link from "next/link"

export default function FAQPage() {
  const whatsappMessage = encodeURIComponent("Oi, vim do site e quero mais informações")
  const whatsappLink = `https://wa.me/5516997741702?text=${whatsappMessage}`

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Perguntas Frequentes</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Encontre respostas para as dúvidas mais comuns sobre nossos serviços e processos.
              </p>
            </div>

            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-6">Geral</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>O que é a Vexis?</AccordionTrigger>
                    <AccordionContent>
                      A Vexis é uma empresa especializada em soluções digitais completas, oferecendo desde
                      desenvolvimento de sites e aplicativos até automação com inteligência artificial, identidade
                      visual e marketing digital. Nosso objetivo é transformar ideias em realidade digital com
                      excelência e inovação.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>Quais tipos de projetos vocês desenvolvem?</AccordionTrigger>
                    <AccordionContent>
                      Desenvolvemos uma ampla gama de projetos: landing pages, sites institucionais, e-commerce,
                      aplicativos mobile e web, sistemas personalizados (ERP, CRM, gestão), identidade visual completa,
                      campanhas de tráfego pago, gestão de redes sociais, produção audiovisual e soluções de automação
                      com IA.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>Quanto tempo leva para desenvolver um projeto?</AccordionTrigger>
                    <AccordionContent>
                      O prazo varia conforme a complexidade do projeto. Uma landing page pode ficar pronta em 1-2
                      semanas, enquanto um sistema completo pode levar de 2 a 6 meses. Durante a consultoria inicial,
                      fornecemos um cronograma detalhado específico para seu projeto.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>Vocês oferecem suporte após a entrega?</AccordionTrigger>
                    <AccordionContent>
                      Sim! Todos os nossos projetos incluem período de garantia e suporte técnico. Além disso,
                      oferecemos planos de manutenção contínua para garantir que sua solução esteja sempre atualizada e
                      funcionando perfeitamente.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-6">Desenvolvimento</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="dev-1">
                    <AccordionTrigger>Quais tecnologias vocês utilizam?</AccordionTrigger>
                    <AccordionContent>
                      Trabalhamos com as tecnologias mais modernas do mercado: React, Next.js, Node.js, TypeScript para
                      desenvolvimento web; React Native e Flutter para apps mobile; N8N para automação; e integrações
                      com diversas APIs de IA. Escolhemos a stack ideal para cada projeto.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="dev-2">
                    <AccordionTrigger>O site será responsivo (mobile-friendly)?</AccordionTrigger>
                    <AccordionContent>
                      Absolutamente! Todos os nossos projetos são desenvolvidos com design responsivo, garantindo
                      perfeita visualização e usabilidade em smartphones, tablets e desktops. O mobile-first é
                      prioridade em nossos desenvolvimentos.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="dev-3">
                    <AccordionTrigger>Posso solicitar alterações durante o desenvolvimento?</AccordionTrigger>
                    <AccordionContent>
                      Sim! Trabalhamos com metodologia ágil e apresentamos o projeto em etapas. Você pode solicitar
                      ajustes e melhorias durante todo o processo. Alterações significativas que fujam do escopo
                      original podem impactar prazo e investimento.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="dev-4">
                    <AccordionTrigger>Vocês fazem integração com outros sistemas?</AccordionTrigger>
                    <AccordionContent>
                      Sim! Realizamos integrações com ERPs, CRMs, gateways de pagamento, APIs de terceiros, plataformas
                      de e-mail marketing, sistemas de gestão e muito mais. Nossa expertise em automação permite
                      conectar diferentes ferramentas de forma eficiente.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-6">IA & Automação</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="ia-1">
                    <AccordionTrigger>O que são os sistemas de automação com IA?</AccordionTrigger>
                    <AccordionContent>
                      São soluções que utilizam inteligência artificial para automatizar processos do seu negócio.
                      Oferecemos sistemas prontos como agendamento inteligente para salões e barbearias, e gestão de
                      oficinas com comunicação automática com clientes. Tudo desenvolvido com N8N e IA.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="ia-2">
                    <AccordionTrigger>Como funciona o sistema de agendamento com IA?</AccordionTrigger>
                    <AccordionContent>
                      O sistema permite que clientes agendem serviços via WhatsApp ou site, com confirmação automática,
                      lembretes inteligentes e gestão completa da agenda. A IA entende solicitações em linguagem natural
                      e gerencia conflitos de horário automaticamente.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="ia-3">
                    <AccordionTrigger>Posso personalizar os sistemas prontos?</AccordionTrigger>
                    <AccordionContent>
                      Sim! Nossos sistemas prontos são totalmente customizáveis. Podemos adaptar funcionalidades,
                      adicionar integrações específicas e ajustar a interface conforme as necessidades do seu negócio.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-6">Investimento & Pagamento</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="inv-1">
                    <AccordionTrigger>Como funciona o orçamento?</AccordionTrigger>
                    <AccordionContent>
                      Após entender suas necessidades em uma consultoria inicial gratuita, elaboramos uma proposta
                      detalhada com escopo, cronograma e investimento. O valor varia conforme complexidade,
                      funcionalidades e prazo do projeto.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="inv-2">
                    <AccordionTrigger>Quais são as formas de pagamento?</AccordionTrigger>
                    <AccordionContent>
                      Aceitamos pagamento via PIX, transferência bancária e cartão de crédito (parcelado). Geralmente
                      dividimos o pagamento em etapas: entrada no início, parcelas durante o desenvolvimento e saldo
                      final na entrega.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="inv-3">
                    <AccordionTrigger>Há custos adicionais após a entrega?</AccordionTrigger>
                    <AccordionContent>
                      Além do desenvolvimento, podem existir custos de hospedagem, domínio e certificado SSL (geralmente
                      R$ 20-100/mês). Planos de manutenção e suporte contínuo são opcionais. Deixamos tudo transparente
                      no orçamento inicial.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-semibold mb-4">Não encontrou sua resposta?</h2>
                <p className="text-muted-foreground mb-6">
                  Entre em contato conosco e teremos prazer em esclarecer todas as suas dúvidas.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg">
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Falar no WhatsApp
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/contato">Página de Contato</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
