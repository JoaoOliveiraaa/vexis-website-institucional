import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardLayout } from "@/components/dashboard-layout"
import { UsersTable } from "@/components/users-table"
import { CreateUserDialog } from "@/components/create-user-dialog"

export default async function UsuariosPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/tarefas/login")
  }

  const { data: userData } = await supabase.from("users").select("*").eq("id", user.id).single()

  if (!userData || userData.role !== "admin") {
    redirect("/tarefas")
  }

  const { data: users } = await supabase.from("users").select("*").order("created_at", { ascending: false })

  return (
    <DashboardLayout user={userData}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Usuários</h1>
            <p className="text-slate-600 mt-1">Gerencie os usuários do sistema</p>
          </div>
          <CreateUserDialog />
        </div>

        <UsersTable users={users || []} />
      </div>
    </DashboardLayout>
  )
}
