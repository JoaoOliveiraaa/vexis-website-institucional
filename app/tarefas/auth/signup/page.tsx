"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (password !== repeatPassword) {
      setError("As senhas não coincidem")
      setIsLoading(false)
      return
    }

    try {
      const redirectTo = `${window.location.origin}/tarefas`

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectTo,
          data: {
            full_name: fullName,
            role: "user",
          },
        },
      })
      if (error) throw error
      router.push("/tarefas/auth/signup-success")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Erro ao criar conta")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center p-6 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.45_0.15_240)] via-[oklch(0.5_0.18_220)] to-[oklch(0.55_0.2_200)] z-0" />

      {/* Animated gradient orbs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob z-0 pointer-events-none" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-accent/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 z-0 pointer-events-none" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[oklch(0.6_0.19_240)]/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 z-0 pointer-events-none" />

      <div className="relative w-full max-w-md z-50">
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl" />
              <div className="relative bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-2xl">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%281%29-wOYbYYaL7fwcyhIZM308jfylREAGrO.png"
                  alt="Vexis Logo"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-br from-white via-white/95 to-white/90 bg-clip-text text-transparent mb-2">
                Vexis
              </h1>
              <p className="text-sm text-white/80 font-medium">Sistema de Gestão Interna</p>
            </div>
          </div>

          <Card className="border-white/20 bg-white/95 backdrop-blur-xl shadow-2xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Criar sua conta</CardTitle>
              <CardDescription>Preencha os dados abaixo para começar</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp}>
                <div className="flex flex-col gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="fullName">Nome Completo</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Seu nome"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="h-11"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="repeat-password">Repetir Senha</Label>
                    <Input
                      id="repeat-password"
                      type="password"
                      required
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                      className="h-11"
                    />
                  </div>
                  {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">{error}</div>
                  )}
                  <Button
                    type="submit"
                    className="w-full h-11 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                    disabled={isLoading}
                  >
                    {isLoading ? "Criando conta..." : "Criar conta"}
                  </Button>
                </div>
                <div className="mt-6 text-center text-sm text-muted-foreground">
                  Já tem uma conta?{" "}
                  <Link href="/tarefas/auth/login" className="font-medium text-primary hover:underline underline-offset-4">
                    Fazer login
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
