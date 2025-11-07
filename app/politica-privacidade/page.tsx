import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Lock, Eye, UserCheck, Database, FileText } from "lucide-react"

export default function PoliticaPrivacidadePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-primary/10">
                <Shield className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Política de Privacidade</h1>
            <p className="text-lg text-muted-foreground">
              Última atualização: {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          </div>

          {/* Resumo */}
          <Card className="mb-8 border-primary/20">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                Resumo da Política
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A Vexis respeita sua privacidade e está comprometida em proteger seus dados pessoais. 
                Esta política explica como coletamos, usamos, armazenamos e protegemos suas informações 
                em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018).
              </p>
            </CardContent>
          </Card>

          {/* Seções */}
          <div className="space-y-8">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Database className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">1. Informações que Coletamos</h2>
              </div>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">1.1. Dados Fornecidos por Você</h3>
                    <p className="text-muted-foreground mb-2">
                      Coletamos informações que você nos fornece diretamente ao:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                      <li>Preencher formulários de contato</li>
                      <li>Solicitar orçamentos</li>
                      <li>Candidatar-se a vagas de emprego</li>
                      <li>Interagir conosco via e-mail ou WhatsApp</li>
                    </ul>
                    <p className="text-muted-foreground mt-3">
                      <strong>Dados coletados:</strong> Nome, e-mail, telefone, empresa, cargo, 
                      mensagem, currículo (para candidaturas) e outras informações fornecidas voluntariamente.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">1.2. Dados Coletados Automaticamente</h3>
                    <p className="text-muted-foreground mb-2">
                      Quando você visita nosso site, podemos coletar automaticamente:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                      <li>Endereço IP</li>
                      <li>Tipo de navegador e dispositivo</li>
                      <li>Páginas visitadas e tempo de permanência</li>
                      <li>Origem do acesso (URL de referência)</li>
                      <li>Cookies e tecnologias similares</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">2. Como Usamos suas Informações</h2>
              </div>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-3">
                    Utilizamos seus dados pessoais para os seguintes propósitos:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Responder às suas solicitações de contato e orçamentos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Fornecer nossos serviços e suporte técnico</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Processar candidaturas de emprego</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Enviar comunicações sobre nossos serviços (com seu consentimento)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Melhorar nosso site e experiência do usuário</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Cumprir obrigações legais e regulatórias</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Prevenir fraudes e garantir a segurança</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Lock className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">3. Compartilhamento de Dados</h2>
              </div>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <p className="text-muted-foreground">
                    A Vexis não vende, aluga ou comercializa seus dados pessoais. 
                    Podemos compartilhar suas informações apenas nas seguintes situações:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Prestadores de Serviços:</strong> Com empresas que nos auxiliam 
                        (hospedagem, e-mail, analytics), sob contrato de confidencialidade
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Parceiros de Negócios:</strong> Quando necessário para execução 
                        de projetos contratados
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Obrigações Legais:</strong> Quando exigido por lei ou autoridades competentes
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Com seu Consentimento:</strong> Em outras situações, mediante sua autorização expressa
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">4. Segurança dos Dados</h2>
              </div>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-3">
                    Implementamos medidas técnicas e organizacionais adequadas para proteger 
                    seus dados pessoais contra acesso não autorizado, perda, destruição ou alteração:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Criptografia SSL/TLS para transmissão de dados</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Servidores seguros e atualizados</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Controle de acesso restrito aos dados</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Backups regulares e seguros</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Monitoramento contínuo de segurança</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <UserCheck className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">5. Seus Direitos (LGPD)</h2>
              </div>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-3">
                    De acordo com a LGPD, você tem os seguintes direitos em relação aos seus dados pessoais:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Confirmação e Acesso:</strong> Saber se tratamos seus dados e acessá-los</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Correção:</strong> Solicitar correção de dados incompletos ou desatualizados</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Anonimização ou Bloqueio:</strong> Solicitar anonimização ou bloqueio de dados</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Eliminação:</strong> Solicitar exclusão de dados desnecessários ou tratados em desconformidade</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Portabilidade:</strong> Solicitar portabilidade dos dados a outro fornecedor</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Revogação do Consentimento:</strong> Retirar seu consentimento a qualquer momento</span>
                    </li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    Para exercer seus direitos, entre em contato conosco através do e-mail:{" "}
                    <a href="mailto:contatooficialvexis@gmail.com" className="text-primary hover:underline">
                      contatooficialvexis@gmail.com
                    </a>
                  </p>
                </CardContent>
              </Card>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">6. Retenção de Dados</h2>
              </div>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">
                    Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as 
                    finalidades para as quais foram coletados, incluindo requisitos legais, contábeis 
                    ou de relatórios. Quando não forem mais necessários, seus dados serão excluídos 
                    ou anonimizados de forma segura.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">7. Cookies</h2>
              </div>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-3">
                    Utilizamos cookies e tecnologias similares para melhorar sua experiência no site:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Cookies Essenciais:</strong> Necessários para funcionamento básico do site</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Cookies de Desempenho:</strong> Coletam informações sobre uso do site</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Cookies de Funcionalidade:</strong> Lembram suas preferências</span>
                    </li>
                  </ul>
                  <p className="text-muted-foreground mt-3">
                    Você pode gerenciar cookies através das configurações do seu navegador.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">8. Alterações nesta Política</h2>
              </div>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">
                    Podemos atualizar esta Política de Privacidade periodicamente. Quaisquer alterações 
                    serão publicadas nesta página com a data de atualização. Recomendamos que você 
                    revise esta política regularmente para se manter informado.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">9. Contato</h2>
              </div>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">
                    Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos 
                    seus dados pessoais, entre em contato:
                  </p>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>Vexis - Soluções Digitais</strong></p>
                    <p>CNPJ: 61.139.836/0001-86</p>
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

