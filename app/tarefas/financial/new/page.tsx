import { createClient } from "@/lib/supabase/server"
import { FinancialRecordForm } from "@/components/financial-record-form"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic'

export default async function NewFinancialRecordPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: projects } = await supabase.from("projects").select("id, name")

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Novo Registro Financeiro</h1>
        <p className="text-slate-600 dark:text-slate-400">Adicione uma receita ou despesa</p>
      </div>

      <FinancialRecordForm projects={projects || []} currentUserId={user.id} />
    </div>
  )
}

