import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "Vexis | Desenvolvimento de Software e Soluções Digitais",
  description: "Transformando ideias em realidade digital com excelência e inovação. Desenvolvimento web, apps mobile, sistemas personalizados e automação com IA.",
  generator: "Vexis",
  keywords: ["desenvolvimento web", "apps mobile", "sistemas personalizados", "automação", "IA", "Next.js", "React"],
  authors: [{ name: "Vexis" }],
  icons: {
    icon: "/faviconwhite.png",
    apple: "/faviconwhite.png",
  },
  openGraph: {
    title: "Vexis | Desenvolvimento de Software e Soluções Digitais",
    description: "Transformando ideias em realidade digital com excelência e inovação",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vexis | Desenvolvimento de Software",
    description: "Transformando ideias em realidade digital",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const isDark = theme === 'dark' || (!theme && prefersDark);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
