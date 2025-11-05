import { createClient } from "@/lib/supabase/server"
import { LeadForm } from "@/components/lead-form"
import { notFound, redirect } from "next/navigation"

export default async function EditLeadPage({ params }: { params: { id: string } }) {
  const { id } = params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: lead } = await supabase.from("leads").select("*").eq("id", id).single()

  if (!lead) {
    notFound()
  }

  const { data: users } = await supabase.from("profiles").select("id, full_name, email")

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Editar Lead</h1>
        <p className="text-slate-600 dark:text-slate-400">Atualize as informações do lead</p>
      </div>

      <LeadForm users={users || []} currentUserId={user.id} lead={lead} />
    </div>
  )
}
