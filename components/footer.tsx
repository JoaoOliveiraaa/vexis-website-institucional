import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-ueQtNpKhisOy3kQnA35pKR2Dhl8NJQ.jpg"
                alt="VEXIS Logo"
                width={32}
                height={32}
                className="rounded"
              />
              <span className="text-xl font-bold">VEXIS</span>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed max-w-md">
              Tecnologia que converte. Estratégia que escala. Desenvolvemos soluções digitais para escalar seu negócio
              com confiança.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Serviços</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>Analytics</li>
              <li>E-commerce</li>
              <li>Landing Pages</li>
              <li>Sites Institucionais</li>
              <li>Tráfego Pago</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-2 text-primary-foreground/80">
              <p>vexiscontato@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60">© 2025 VEXIS. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
