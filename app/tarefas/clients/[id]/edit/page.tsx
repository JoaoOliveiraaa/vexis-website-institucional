import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import { ClientForm } from "@/components/client-form"

export default async function EditClientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: client, error } = await supabase.from("clients").select("*").eq("id", id).single()

  if (error || !client) {
    notFound()
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Editar Cliente</h1>
        <p className="text-muted-foreground">Atualize as informações do cliente</p>
      </div>

      <ClientForm client={client} />
    </div>
  )
}
