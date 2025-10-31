import { createClient } from "@/lib/supabase/server"
import { FinancialRecordForm } from "@/components/financial-record-form"
import { notFound, redirect } from "next/navigation"

export default async function EditFinancialRecordPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/tarefas/auth/login")
  }

  const { data: record } = await supabase.from("financial_records").select("*").eq("id", id).single()

  if (!record) {
    notFound()
  }

  const { data: projects } = await supabase.from("projects").select("id, name")

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Editar Registro Financeiro</h1>
        <p className="text-slate-600 dark:text-slate-400">Atualize as informações do registro</p>
      </div>

      <FinancialRecordForm projects={projects || []} currentUserId={user.id} record={record} />
    </div>
  )
}
