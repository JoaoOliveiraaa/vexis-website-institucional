import Image from "next/image"
import { Github, Linkedin, Twitter, MessageCircle } from "lucide-react"
import Link from "next/link"

export function Footer() {
  const whatsappMessage = encodeURIComponent("Oi, vim do site e quero mais informações")
  const whatsappLink = `https://wa.me/5516997741702?text=${whatsappMessage}`

  return (
    <footer className="border-t border-border/40 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="space-y-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Vexis Logo"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
              <span className="text-lg font-semibold">Vexis</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Transformando ideias em realidade digital com excelência e inovação.
            </p>
            <p className="text-xs text-muted-foreground">CNPJ: 61.139.836/0001-86</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Serviços</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/servicos/landing-pages"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Landing Pages
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos/sites-institucionais"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sites Institucionais
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos/e-commerce"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  E-commerce
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos/aplicativos"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Aplicativos
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos/sistemas-personalizados"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sistemas Personalizados
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos/identidade-visual"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Identidade Visual
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos/trafego-pago"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Tráfego Pago
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos/redes-sociais"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Redes Sociais
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos/fotografia-video"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Fotografia & Vídeo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#sobre" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/projetos" className="text-muted-foreground hover:text-foreground transition-colors">
                  Projetos
                </Link>
              </li>
              <li>
                <Link href="/automacao-ia" className="text-muted-foreground hover:text-foreground transition-colors">
                  IA & Automação
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contato" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/documentacao" className="text-muted-foreground hover:text-foreground transition-colors">
                  Documentação
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:contatooficialvexis@gmail.com"
                  className="text-muted-foreground hover:text-foreground transition-colors break-all"
                >
                  contatooficialvexis@gmail.com
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="font-semibold mb-3 text-sm">Redes Sociais</h4>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Vexis. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
