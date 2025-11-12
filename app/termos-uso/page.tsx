import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, AlertCircle, Scale, Users } from "lucide-react"

export default function TermosUsoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-primary/10">
                <Scale className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Termos de Uso</h1>
            <p className="text-lg text-muted-foreground">
              Última atualização: {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          </div>

          {/* Introdução */}
          <Card className="mb-8 border-primary/20">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                Introdução
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Bem-vindo ao site da Vexis. Ao acessar e usar este site, você concorda em cumprir 
                e estar vinculado aos seguintes termos e condições de uso. Se você não concordar 
                com alguma parte destes termos, por favor, não utilize nosso site.
              </p>
            </CardContent>
          </Card>

          {/* Seções */}
          <div className="space-y-8">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">1. Aceitação dos Termos</h2>
              </div>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">
                    Ao acessar e usar o site da Vexis, você aceita e concorda em ficar vinculado 
                    aos termos e condições deste acordo. Estes termos se aplicam a todos os visitantes, 
                    usuários e outras pessoas que acessam ou usam o serviço.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">2. Descrição dos Serviços</h2>
              </div>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <p className="text-muted-foreground">
                    A Vexis oferece serviços de desenvolvimento de soluções digitais, incluindo mas não limitado a:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Desenvolvimento de sites e aplicações web</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Desenvolvimento de aplicativos mobile</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Sistemas personalizados e automação com IA</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Identidade visual e design</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Marketing digital e gestão de mídias sociais</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">3. Uso Aceitável</h2>
              </div>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <p className="text-muted-foreground mb-3">
                    Você concorda em usar o site apenas para fins legais e de maneira que não infrinja 
                    os direitos de terceiros. É proibido:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Usar o site de forma que cause danos ou interrupções</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Tentar obter acesso não autorizado a qualquer parte do site</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Reproduzir, duplicar ou copiar material sem autorização</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Transmitir vírus ou códigos maliciosos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Coletar dados de outros usuários sem consentimento</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">4. Propriedade Intelectual</h2>
              </div>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-3">
                    Todo o conteúdo deste site, incluindo mas não limitado a textos, gráficos, logos, 
                    ícones, imagens, clipes de áudio e software, é propriedade da Vexis ou de seus 
                    fornecedores de conteúdo e é protegido por leis de direitos autorais brasileiras 
                    e internacionais.
                  </p>
                  <p className="text-muted-foreground">
                    O uso não autorizado de qualquer material pode violar leis de direitos autorais, 
                    marcas registradas e outras leis aplicáveis.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">5. Orçamentos e Contratos</h2>
              </div>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <p className="text-muted-foreground">
                    Orçamentos fornecidos através do site ou outros canais de comunicação são válidos 
                    pelo prazo especificado no próprio documento. A contratação de serviços está sujeita a:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Aprovação da proposta comercial</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Assinatura de contrato de prestação de serviços</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Pagamento conforme condições acordadas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Fornecimento de informações e materiais necessários</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">6. Pagamentos e Cancelamentos</h2>
              </div>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div>
                    <h3 className="font-semibold mb-2">6.1. Formas de Pagamento</h3>
                    <p className="text-muted-foreground">
                      Aceitamos pagamentos via PIX, transferência bancária e cartão de crédito. 
                      As condições de pagamento serão estabelecidas no contrato específico de cada projeto.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">6.2. Política de Cancelamento</h3>
                    <p className="text-muted-foreground">
                      Cancelamentos devem ser comunicados por escrito. Valores já pagos referentes a 
                      trabalhos realizados não serão reembolsados. Políticas específicas de cancelamento 
                      podem variar conforme o contrato do projeto.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">7. Garantias e Suporte</h2>
              </div>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-3">
                    Todos os projetos entregues pela Vexis incluem período de garantia para correção 
                    de bugs e problemas técnicos, conforme especificado no contrato. O suporte técnico 
                    e manutenção contínua estão disponíveis mediante contratação de plano específico.
                  </p>
                  <p className="text-muted-foreground">
                    A garantia não cobre alterações de escopo, novas funcionalidades ou problemas 
                    causados por modificações não autorizadas no código ou sistema.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">8. Limitação de Responsabilidade</h2>
              </div>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-3">
                    A Vexis não se responsabiliza por:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Interrupções ou erros no acesso ao site</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Danos indiretos, incidentais ou consequenciais</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Perda de dados ou informações</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Links para sites de terceiros</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">9. Confidencialidade</h2>
              </div>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">
                    A Vexis se compromete a manter confidenciais todas as informações fornecidas 
                    pelos clientes durante a contratação e execução de projetos. Informações 
                    confidenciais não serão compartilhadas com terceiros sem autorização prévia, 
                    exceto quando necessário para execução do projeto ou exigido por lei.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">10. Alterações nos Termos</h2>
              </div>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">
                    A Vexis reserva-se o direito de modificar estes termos de uso a qualquer momento. 
                    As alterações entrarão em vigor imediatamente após sua publicação no site. 
                    O uso continuado do site após tais modificações constituirá sua aceitação dos 
                    novos termos.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Scale className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">11. Lei Aplicável</h2>
              </div>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">
                    Estes termos de uso serão regidos e interpretados de acordo com as leis do Brasil. 
                    Qualquer disputa relacionada a estes termos será submetida à jurisdição exclusiva 
                    dos tribunais brasileiros.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">12. Contato</h2>
              </div>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">
                    Se você tiver dúvidas sobre estes Termos de Uso, entre em contato:
                  </p>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>Vexis - Soluções Digitais</strong></p>
                    <p>CNPJ: 61.139.825/0001-86</p>
                    <p>
                      E-mail:{" "}
                      <a href="mailto:contatooficialvexis@gmail.com" className="text-primary hover:underline">
                        contatooficialvexis@gmail.com
                      </a>
                    </p>
                    <p>
                      WhatsApp:{" "}
                      <a href="https://wa.me/5516997741702" className="text-primary hover:underline">
                        +55 16 99774-1702
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

