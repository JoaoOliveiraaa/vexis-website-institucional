import { LoginForm } from "@/components/login-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login - Sistema Vexis",
  description: "Acesse o sistema de gerenciamento de tarefas e leads da Vexis",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Vexis</h1>
          <p className="text-slate-600">Sistema de Gerenciamento</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
