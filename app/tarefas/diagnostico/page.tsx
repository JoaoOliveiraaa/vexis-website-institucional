"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, XCircle, Loader2, RefreshCw, UserPlus } from "lucide-react"

interface DiagnosticResult {
  check: string
  status: "success" | "error" | "loading"
  message: string
  details?: any
}

export default function DiagnosticoPage() {
  const [results, setResults] = useState<DiagnosticResult[]>([])
  const [loading, setLoading] = useState(true)
  const [dbUsers, setDbUsers] = useState<any[]>([])
  const [authUsers, setAuthUsers] = useState<any[]>([])
  const [syncing, setSyncing] = useState<string | null>(null)

  const runDiagnostics = async () => {
    setLoading(true)
    setResults([])

    const checks: DiagnosticResult[] = []

    // Verificar variáveis de ambiente
    checks.push({
      check: "Variáveis de Ambiente",
      status: "loading",
      message: "Verificando...",
    })
    setResults([...checks])

    try {
      const envResponse = await fetch("/api/diagnostico/env")
      const envData = await envResponse.json()

      checks[0] = {
        check: "Variáveis de Ambiente",
        status: envData.success ? "success" : "error",
        message: envData.success ? "Todas as variáveis configuradas" : "Variáveis faltando",
        details: envData,
      }
      setResults([...checks])
    } catch (error) {
      checks[0] = {
        check: "Variáveis de Ambiente",
        status: "error",
        message: "Erro ao verificar variáveis",
      }
      setResults([...checks])
    }

    // Verificar conexão com Supabase
    checks.push({
      check: "Conexão Supabase",
      status: "loading",
      message: "Verificando...",
    })
    setResults([...checks])

    try {
      const connResponse = await fetch("/api/diagnostico/connection")
      const connData = await connResponse.json()

      checks[1] = {
        check: "Conexão Supabase",
        status: connData.success ? "success" : "error",
        message: connData.success ? "Conexão estabelecida" : "Falha na conexão",
        details: connData,
      }
      setResults([...checks])
    } catch (error) {
      checks[1] = {
        check: "Conexão Supabase",
        status: "error",
        message: "Erro ao conectar",
      }
      setResults([...checks])
    }

    // Verificar usuários na tabela
    checks.push({
      check: "Usuários na Tabela",
      status: "loading",
      message: "Verificando...",
    })
    setResults([...checks])

    try {
      const usersResponse = await fetch("/api/diagnostico/users")
      const usersData = await usersResponse.json()

      checks[2] = {
        check: "Usuários na Tabela",
        status: usersData.success ? "success" : "error",
        message: usersData.success ? `${usersData.count} usuários na tabela` : "Nenhum usuário encontrado",
        details: usersData,
      }
      setDbUsers(usersData.users || [])
      setResults([...checks])
    } catch (error) {
      checks[2] = {
        check: "Usuários na Tabela",
        status: "error",
        message: "Erro ao verificar usuários",
      }
      setResults([...checks])
    }

    checks.push({
      check: "Usuários no Auth",
      status: "loading",
      message: "Verificando...",
    })
    setResults([...checks])

    try {
      const authResponse = await fetch("/api/diagnostico/auth-users")
      const authData = await authResponse.json()

      checks[3] = {
        check: "Usuários no Auth",
        status: authData.success ? "success" : "error",
        message: authData.success ? `${authData.count} usuários no Auth` : authData.message || "Erro ao verificar",
        details: authData,
      }
      setAuthUsers(authData.authUsers || [])
      setResults([...checks])
    } catch (error) {
      checks[3] = {
        check: "Usuários no Auth",
        status: "error",
        message: "Erro ao verificar usuários no Auth",
      }
      setResults([...checks])
    }

    setLoading(false)
  }

  const syncUser = async (userId: string) => {
    setSyncing(userId)
    try {
      const response = await fetch("/api/diagnostico/sync-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      })

      const data = await response.json()

      if (data.success) {
        alert("Usuário sincronizado com sucesso! Senha: Admin@123456")
        runDiagnostics()
      } else {
        alert(`Erro: ${data.error}`)
      }
    } catch (error) {
      alert("Erro ao sincronizar usuário")
    } finally {
      setSyncing(null)
    }
  }

  useEffect(() => {
    runDiagnostics()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl">Diagnóstico do Sistema</CardTitle>
          <CardDescription>Verificação do status de configuração e conectividade</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            {results.map((result, index) => (
              <Alert
                key={index}
                variant={result.status === "error" ? "destructive" : "default"}
                className={result.status === "success" ? "border-green-200 bg-green-50" : ""}
              >
                <div className="flex items-start gap-3">
                  {result.status === "loading" && <Loader2 className="h-5 w-5 animate-spin mt-0.5" />}
                  {result.status === "success" && <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />}
                  {result.status === "error" && <XCircle className="h-5 w-5 mt-0.5" />}
                  <div className="flex-1">
                    <div className="font-semibold">{result.check}</div>
                    <AlertDescription className="mt-1">{result.message}</AlertDescription>
                    {result.details && (
                      <pre className="mt-2 text-xs overflow-auto bg-slate-900 text-slate-100 p-2 rounded max-h-40">
                        {JSON.stringify(result.details, null, 2)}
                      </pre>
                    )}
                  </div>
                </div>
              </Alert>
            ))}
          </div>

          {dbUsers.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sincronização de Usuários</CardTitle>
                <CardDescription>Usuários na tabela que não existem no Auth podem ser sincronizados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {dbUsers.map((user) => {
                    const existsInAuth = authUsers.some((au) => au.email === user.email)
                    return (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-3 border rounded-lg bg-slate-50"
                      >
                        <div>
                          <div className="font-medium">{user.email}</div>
                          <div className="text-sm text-slate-600">
                            {user.full_name} - {user.role}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {existsInAuth ? (
                            <span className="text-sm text-green-600 flex items-center gap-1">
                              <CheckCircle2 className="h-4 w-4" />
                              No Auth
                            </span>
                          ) : (
                            <Button size="sm" onClick={() => syncUser(user.id)} disabled={syncing === user.id}>
                              {syncing === user.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <>
                                  <UserPlus className="h-4 w-4 mr-1" />
                                  Criar no Auth
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-3">
            <Button onClick={runDiagnostics} disabled={loading} className="flex-1">
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Executar Novamente
            </Button>
            <Button asChild variant="outline">
              <a href="/tarefas/setup">Voltar para Setup</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
