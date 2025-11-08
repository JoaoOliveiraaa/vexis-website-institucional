import { createClient } from "@/lib/supabase/server"
import { LeadForm } from "@/components/lead-form"
import { redirect } from "next/navigation"

export default async function NewLeadPage() {
  console.log("[SERVER][v0] NewLeadPage - Starting")

  const supabase = await createClient()
  console.log("[SERVER][v0] NewLeadPage - Supabase client created")

  let user
  try {
    const { data, error } = await supabase.auth.getUser()
    console.log("[SERVER][v0] NewLeadPage - Auth check result:", { hasUser: !!data.user, error })

    if (error) {
      console.error("[SERVER][v0] NewLeadPage - Auth error:", error)
      redirect("/auth/login")
    }

    user = data.user

    if (!user) {
      console.log("[SERVER][v0] NewLeadPage - No user, redirecting to login")
      redirect("/auth/login")
    }
  } catch (error) {
    console.error("[SERVER][v0] NewLeadPage - Exception during auth check:", error)
    redirect("/auth/login")
  }

  let users = []
  try {
    console.log("[SERVER][v0] NewLeadPage - Fetching users")
    const { data, error } = await supabase.from("profiles").select("id, full_name, email")

    if (error) {
      console.error("[SERVER][v0] NewLeadPage - Error fetching users:", error)
    } else {
      console.log("[SERVER][v0] NewLeadPage - Users fetched:", data?.length || 0)
      users = data || []
    }
  } catch (error) {
    console.error("[SERVER][v0] NewLeadPage - Exception fetching users:", error)
  }

  console.log("[SERVER][v0] NewLeadPage - Rendering form")

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Novo Lead</h1>
        <p className="text-slate-600 dark:text-slate-400">Adicione um novo lead ao CRM</p>
      </div>

      <LeadForm users={users} currentUserId={user.id} />
    </div>
  )
}
