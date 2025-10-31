import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserEditForm } from "@/components/user-edit-form"

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  if (id === "new") {
    redirect("/tarefas/users")
  }

  const supabase = await createClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/tarefas/auth/login")
  }

  // Check if user is admin
  const { data: currentUserProfile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (currentUserProfile?.role !== "admin") {
    redirect("/tarefas")
  }

  // Fetch user to edit
  const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", id).single()

  if (error || !profile) {
    redirect("/tarefas/users")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Editar Usuário</h1>
        <p className="text-muted-foreground">Altere as informações e permissões do usuário</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Usuário</CardTitle>
          <CardDescription>Atualize o nome e role do usuário</CardDescription>
        </CardHeader>
        <CardContent>
          <UserEditForm profile={profile} />
        </CardContent>
      </Card>
    </div>
  )
}
