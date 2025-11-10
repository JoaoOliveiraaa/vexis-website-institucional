import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileSection } from "@/components/profile-section"
import { SecuritySection } from "@/components/security-section"
import { NotificationsSection } from "@/components/notifications-section"
import { PreferencesSection } from "@/components/preferences-section"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck } from "lucide-react"

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
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-indigo-950 via-slate-950 to-background px-8 py-10 text-white shadow-lg">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_55%)] opacity-60" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <Badge variant="outline" className="border-white/30 bg-white/10 text-white backdrop-blur">
              Personalize sua experiência
            </Badge>
            <h1 className="text-3xl font-semibold tracking-tight lg:text-4xl">
              Ajuste perfil, segurança e preferências em um só lugar.
            </h1>
            <p className="max-w-2xl text-sm text-white/80 lg:text-base">
              Atualize seus dados, configure autenticação reforçada, defina o que deseja receber e deixe o hub do seu jeito.
            </p>
          </div>
          <div className="flex flex-col gap-3 rounded-2xl border border-white/20 bg-white/10 p-6 text-sm text-white/80 backdrop-blur-lg lg:max-w-sm">
            <p className="text-base font-semibold text-white">Último acesso</p>
            <p>
              {loginHistory && loginHistory.length > 0
                ? new Date(loginHistory[0].created_at).toLocaleString("pt-BR")
                : "Ainda sem registros."}
            </p>
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-wide">
              <ShieldCheck className="h-4 w-4" />
              Segurança ativa
            </div>
          </div>
        </div>
      </section>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="inline-flex gap-2 rounded-full border border-border/60 bg-card/70 p-1 text-sm">
          <TabsTrigger value="profile" className="rounded-full px-4 py-2">
            Perfil
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-full px-4 py-2">
            Segurança
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-full px-4 py-2">
            Notificações
          </TabsTrigger>
          <TabsTrigger value="preferences" className="rounded-full px-4 py-2">
            Preferências
          </TabsTrigger>
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

