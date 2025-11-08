import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileSection } from "@/components/profile-section"
import { SecuritySection } from "@/components/security-section"
import { NotificationsSection } from "@/components/notifications-section"
import { PreferencesSection } from "@/components/preferences-section"

export default async function SettingsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile) {
    redirect("/auth/login")
  }

  // Buscar preferências do usuário
  const { data: preferences } = await supabase.from("user_preferences").select("*").eq("user_id", user.id).single()

  // Buscar histórico de login (últimos 10)
  const { data: loginHistory } = await supabase
    .from("login_history")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(10)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">Gerencie suas informações pessoais, segurança e preferências</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="preferences">Preferências</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <ProfileSection profile={profile} />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <SecuritySection loginHistory={loginHistory || []} />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <NotificationsSection preferences={preferences} userId={user.id} />
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <PreferencesSection preferences={preferences} userId={user.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

