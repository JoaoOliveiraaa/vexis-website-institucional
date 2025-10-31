import type React from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardNav } from "@/components/dashboard-nav"
import { DashboardHeader } from "@/components/dashboard-header"

export default async function TarefasLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/tarefas/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardNav userRole={profile?.role || "user"} />
      <div className="flex-1 flex flex-col">
        <DashboardHeader user={user} profile={profile} />
        <main className="flex-1 p-4 lg:p-6 bg-background">{children}</main>
      </div>
    </div>
  )
}
