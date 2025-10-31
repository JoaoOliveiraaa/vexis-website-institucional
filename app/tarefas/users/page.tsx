import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { UserCog, Mail, Calendar, Shield, User } from "lucide-react"
import Link from "next/link"

export default async function UsersPage() {
  const supabase = await createClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Check if user is admin
  const { data: currentUserProfile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (currentUserProfile?.role !== "admin") {
    redirect("/tarefas")
  }

  // Fetch all users
  const { data: users, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching users:", error)
  }

  const allUsers = users || []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Usuários</h1>
          <p className="text-muted-foreground">Gerencie os usuários do sistema</p>
        </div>
      </div>

      <div className="grid gap-4">
        {allUsers.map((profile) => {
          const initials = profile.full_name
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)

          return (
            <Card key={profile.id}>
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{profile.full_name}</h3>
                      <Badge variant={profile.role === "admin" ? "default" : "secondary"}>
                        {profile.role === "admin" ? (
                          <Shield className="mr-1 h-3 w-3" />
                        ) : (
                          <User className="mr-1 h-3 w-3" />
                        )}
                        {profile.role === "admin" ? "Admin" : "Usuário"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {profile.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Criado em {new Date(profile.created_at).toLocaleDateString("pt-BR")}
                      </div>
                    </div>
                  </div>
                </div>
                <Link href={`/tarefas/users/${profile.id}/edit`}>
                  <Button variant="outline" size="sm">
                    <UserCog className="mr-2 h-4 w-4" />
                    Editar
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}

        {allUsers.length === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Nenhum usuário encontrado</CardTitle>
              <CardDescription>Não há usuários cadastrados no sistema.</CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  )
}
