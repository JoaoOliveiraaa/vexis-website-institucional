"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react"

interface SetupResult {
  step: string
  success: boolean
  details?: any
  error?: string
}

export default function SetupPage() {
  const [status, setStatus] = useState<"idle" | "running" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [results, setResults] = useState<SetupResult[]>([])

  const runSetup = async () => {
    setStatus("running")
    setMessage("Executando scripts de configuração...")
    setResults([])

    try {
      console.log("[v0] Iniciando execução do script SQL...")
      const sqlResponse = await fetch("/api/setup/run-sql", {
        method: "POST",
      })

      const sqlData = await sqlResponse.json()
      console.log("[v0] Resposta SQL:", sqlData)

      if (!sqlResponse.ok) {
        setResults((prev) => [...prev, { step: "SQL", success: false, error: sqlData.error || "Erro desconhecido" }])
        throw new Error("Erro ao executar script SQL")
      }

      setResults((prev) => [...prev, { step: "SQL", success: true, details: sqlData }])
      setMessage("Banco de dados configurado! Criando usuários admin...")

      console.log("[v0] Iniciando criação de usuários admin...")
      const usersResponse = await fetch("/api/setup/create-admins", {
        method: "POST",
      })

      const usersData = await usersResponse.json()
      console.log("[v0] Resposta criação de usuários:", usersData)

      if (!usersResponse.ok) {
        setResults((prev) => [
          ...prev,
          { step: "Usuários", success: false, error: usersData.error || "Erro desconhecido" },
        ])
        throw new Error("Erro ao criar usuários admin")
      }

      setResults((prev) => [...prev, { step: "Usuários", success: true, details: usersData }])

      setStatus("success")
      setMessage("Setup concluído com sucesso!")
    } catch (error) {
      console.error("[v0] Erro no setup:", error)
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "Erro desconhecido")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Configuração Inicial - Vexis</CardTitle>
          <CardDescription>
            Execute este setup uma única vez para configurar o banco de dados e criar os usuários admin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Problemas com o setup?</strong> Se a criação de usuários falhar, use o{" "}
              <a href="/tarefas/primeiro-acesso" className="underline font-medium">
                método alternativo de primeiro acesso
              </a>
              .
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-lg space-y-2">
              <h3 className="font-semibold text-sm">O que será criado:</h3>
              <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
                <li>Tabelas do banco de dados (users, tasks, leads, etc.)</li>
                <li>Políticas de segurança (Row Level Security)</li>
                <li>3 usuários administradores</li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
              <h3 className="font-semibold text-sm text-amber-900 mb-2">Credenciais dos Admin:</h3>
              <div className="text-sm text-amber-800 space-y-2">
                <div>
                  <p className="font-medium">Admin 1:</p>
                  <p>Email: admin1@vexis.com</p>
                  <p>Senha: Admin@123456</p>
                </div>
                <div>
                  <p className="font-medium">Admin 2:</p>
                  <p>Email: admin2@vexis.com</p>
                  <p>Senha: Admin@123456</p>
                </div>
                <div>
                  <p className="font-medium">Admin 3:</p>
                  <p>Email: admin3@vexis.com</p>
                  <p>Senha: Admin@123456</p>
                </div>
              </div>
            </div>
          </div>

          {status !== "idle" && (
            <Alert variant={status === "error" ? "destructive" : "default"}>
              {status === "running" && <Loader2 className="h-4 w-4 animate-spin" />}
              {status === "success" && <CheckCircle2 className="h-4 w-4 text-green-600" />}
              {status === "error" && <AlertCircle className="h-4 w-4" />}
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          {results.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Resultados:</h3>
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg text-sm ${
                    result.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {result.success ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    )}
                    <span className="font-medium">{result.step}</span>
                  </div>
                  {result.error && <p className="text-red-700 mt-1">{result.error}</p>}
                  {result.details && (
                    <pre className="mt-2 text-xs overflow-auto">{JSON.stringify(result.details, null, 2)}</pre>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-3">
            <Button onClick={runSetup} disabled={status === "running" || status === "success"} className="flex-1">
              {status === "running" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {status === "success" ? "Setup Concluído" : "Executar Setup"}
            </Button>

            {status === "success" && (
              <Button asChild variant="outline">
                <a href="/tarefas/login">Ir para Login</a>
              </Button>
            )}
          </div>

          <div className="flex gap-3">
            <Button asChild variant="secondary" className="flex-1">
              <a href="/tarefas/diagnostico">Verificar Status do Sistema</a>
            </Button>
            <Button asChild variant="outline" className="flex-1 bg-transparent">
              <a href="/tarefas/primeiro-acesso">Primeiro Acesso</a>
            </Button>
          </div>

          <p className="text-xs text-slate-500 text-center">
            ⚠️ Execute este setup apenas uma vez. Após a conclusão, altere as senhas dos administradores.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
