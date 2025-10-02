import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardStats } from "@/components/dashboard-stats"

export default async function TarefasPage() {
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

  // Get statistics
  const { count: tasksCount } = await supabase.from("tasks").select("*", { count: "exact", head: true })

  const { count: leadsCount } = await supabase.from("leads").select("*", { count: "exact", head: true })

  const { count: usersCount } = await supabase.from("users").select("*", { count: "exact", head: true })

  const { count: myTasksCount } = await supabase
    .from("tasks")
    .select("*", { count: "exact", head: true })
    .eq("assigned_to", user.id)

  return (
    <DashboardLayout user={userData}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1">Bem-vindo ao sistema de gerenciamento Vexis</p>
        </div>

        <DashboardStats
          tasksCount={tasksCount || 0}
          leadsCount={leadsCount || 0}
          usersCount={usersCount || 0}
          myTasksCount={myTasksCount || 0}
          isAdmin={userData.role === "admin"}
        />
      </div>
    </DashboardLayout>
  )
}
