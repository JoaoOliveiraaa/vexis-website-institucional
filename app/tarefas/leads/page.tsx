import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardLayout } from "@/components/dashboard-layout"
import { LeadsTable } from "@/components/leads-table"
import { CreateLeadDialog } from "@/components/create-lead-dialog"

export default async function LeadsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/tarefas/login")
  }

  const { data: userData } = await supabase.from("users").select("*").eq("id", user.id).single()

  if (!userData) {
    redirect("/tarefas/login")
  }

  // Get all leads with user information
  const { data: leads } = await supabase
    .from("leads")
    .select(
      `
      *,
      assigned_user:assigned_to(id, full_name, email),
      created_user:created_by(id, full_name, email)
    `,
    )
    .order("created_at", { ascending: false })

  // Get all users for assignment
  const { data: users } = await supabase.from("users").select("id, full_name, email")

  return (
    <DashboardLayout user={userData}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Leads</h1>
            <p className="text-slate-600 mt-1">Gerencie potenciais clientes e conversas</p>
          </div>
          <CreateLeadDialog users={users || []} currentUserId={user.id} />
        </div>

        <LeadsTable leads={leads || []} users={users || []} currentUserId={user.id} />
      </div>
    </DashboardLayout>
  )
}
