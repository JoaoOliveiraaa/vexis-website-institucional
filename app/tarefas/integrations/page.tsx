import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WebhooksSection } from "@/components/webhooks-section"
import { ApiKeysSection } from "@/components/api-keys-section"
import { IntegrationsDocumentation } from "@/components/integrations-documentation"
import { Webhook, Key, BookOpen, Zap } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function IntegrationsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Buscar estatísticas
  const { data: webhooks } = await supabase.from("webhooks").select("*").eq("created_by", user.id)

  const { data: apiKeys } = await supabase.from("api_keys").select("*").eq("created_by", user.id)

  const { data: recentLogs } = await supabase
    .from("webhook_logs")
    .select("*, webhooks!inner(*)")
    .eq("webhooks.created_by", user.id)
    .order("created_at", { ascending: false })
    .limit(10)

  const activeWebhooks = webhooks?.filter((w) => w.active).length || 0
  const activeApiKeys = apiKeys?.filter((k) => k.active).length || 0
  const totalRequests = recentLogs?.length || 0
  const successRate =
    recentLogs && recentLogs.length > 0
      ? Math.round(
          (recentLogs.filter((log) => log.response_status && log.response_status < 400).length / recentLogs.length) *
            100,
        )
      : 0

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Integrações</h1>
        <p className="text-muted-foreground mt-1">Gerencie webhooks, API keys e integrações com IA</p>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Webhooks Ativos</CardTitle>
            <Webhook className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{activeWebhooks}</div>
            <p className="text-xs text-muted-foreground">{webhooks?.length || 0} total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Keys</CardTitle>
            <Key className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{activeApiKeys}</div>
            <p className="text-xs text-muted-foreground">{apiKeys?.length || 0} total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Requisições</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalRequests}</div>
            <p className="text-xs text-muted-foreground">Últimas 24h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Sucesso</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{successRate}%</div>
            <p className="text-xs text-muted-foreground">Últimas requisições</p>
          </CardContent>
        </Card>
      </div>

      {/* Abas de conteúdo */}
      <Tabs defaultValue="webhooks" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="docs">Documentação</TabsTrigger>
        </TabsList>

        <TabsContent value="webhooks" className="space-y-4">
          <WebhooksSection userId={user.id} initialWebhooks={webhooks || []} />
        </TabsContent>

        <TabsContent value="api-keys" className="space-y-4">
          <ApiKeysSection userId={user.id} initialApiKeys={apiKeys || []} />
        </TabsContent>

        <TabsContent value="docs" className="space-y-4">
          <IntegrationsDocumentation />
        </TabsContent>
      </Tabs>
    </div>
  )
}

