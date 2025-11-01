import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PasswordChangeForm } from "@/components/password-change-form"
import { LoginHistoryTable } from "@/components/login-history-table"

interface SecuritySectionProps {
  loginHistory: Array<{
    id: string
    ip_address: string | null
    user_agent: string | null
    location: string | null
    success: boolean
    created_at: string
  }>
}

export function SecuritySection({ loginHistory }: SecuritySectionProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Alterar Senha</CardTitle>
          <CardDescription>Atualize sua senha de acesso</CardDescription>
        </CardHeader>
        <CardContent>
          <PasswordChangeForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Acessos</CardTitle>
          <CardDescription>Veja os últimos acessos à sua conta</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginHistoryTable history={loginHistory} />
        </CardContent>
      </Card>
    </div>
  )
}
