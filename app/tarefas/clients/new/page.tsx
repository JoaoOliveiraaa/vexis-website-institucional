import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ClientForm } from "@/components/client-form"

export default async function NewClientPage() {
  console.log("[v0] NewClientPage - Starting to render")

  try {
    const supabase = await createClient()

    console.log("[v0] NewClientPage - Checking authentication")
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError) {
      console.error("[v0] NewClientPage - Auth error:", authError)
      redirect("/auth/login")
    }

    if (!user) {
      console.log("[v0] NewClientPage - No user found, redirecting to login")
      redirect("/auth/login")
    }

    console.log("[v0] NewClientPage - User authenticated:", user.email)

    return (
      <div className="max-w-2xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Novo Cliente</h1>
          <p className="text-muted-foreground">Cadastre um novo cliente no sistema</p>
        </div>

        <ClientForm />
      </div>
    )
  } catch (error) {
    console.error("[v0] NewClientPage - Unexpected error:", error)
    redirect("/auth/login")
  }
}
