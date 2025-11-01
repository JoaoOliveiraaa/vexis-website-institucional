"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { Loader2, Bell, Mail, CheckCircle2 } from "lucide-react"

interface NotificationsSectionProps {
  preferences: {
    email_notifications: boolean
    notify_task_assigned: boolean
    notify_task_due: boolean
    notify_payment_overdue: boolean
    notify_new_lead: boolean
    notify_project_update: boolean
  } | null
  userId: string
}

export function NotificationsSection({ preferences, userId }: NotificationsSectionProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState({
    email_notifications: preferences?.email_notifications ?? true,
    notify_task_assigned: preferences?.notify_task_assigned ?? true,
    notify_task_due: preferences?.notify_task_due ?? true,
    notify_payment_overdue: preferences?.notify_payment_overdue ?? true,
    notify_new_lead: preferences?.notify_new_lead ?? true,
    notify_project_update: preferences?.notify_project_update ?? true,
  })

  const handleSave = async () => {
    setLoading(true)
    try {
      const supabase = createClient()

      const { error } = await supabase.from("user_preferences").upsert(
        {
          user_id: userId,
          ...settings,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" },
      )

      if (error) throw error

      alert("Preferências de notificações salvas com sucesso!")
      router.refresh()
    } catch (error) {
      console.error("[v0] Error saving notification preferences:", error)
      alert("Erro ao salvar preferências. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Notificações por Email
          </CardTitle>
          <CardDescription>Configure quando você deseja receber notificações por email</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email_notifications" className="text-base">
                Ativar notificações por email
              </Label>
              <p className="text-sm text-muted-foreground">Receba atualizações importantes por email</p>
            </div>
            <Switch
              id="email_notifications"
              checked={settings.email_notifications}
              onCheckedChange={(checked) => setSettings({ ...settings, email_notifications: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Tipos de Notificações
          </CardTitle>
          <CardDescription>Escolha quais eventos devem gerar notificações</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notify_task_assigned" className="text-base">
                Tarefas atribuídas
              </Label>
              <p className="text-sm text-muted-foreground">Quando uma tarefa for atribuída a você</p>
            </div>
            <Switch
              id="notify_task_assigned"
              checked={settings.notify_task_assigned}
              onCheckedChange={(checked) => setSettings({ ...settings, notify_task_assigned: checked })}
              disabled={!settings.email_notifications}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notify_task_due" className="text-base">
                Tarefas próximas do vencimento
              </Label>
              <p className="text-sm text-muted-foreground">Quando uma tarefa estiver próxima do prazo</p>
            </div>
            <Switch
              id="notify_task_due"
              checked={settings.notify_task_due}
              onCheckedChange={(checked) => setSettings({ ...settings, notify_task_due: checked })}
              disabled={!settings.email_notifications}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notify_payment_overdue" className="text-base">
                Pagamentos atrasados
              </Label>
              <p className="text-sm text-muted-foreground">Quando um cliente estiver inadimplente</p>
            </div>
            <Switch
              id="notify_payment_overdue"
              checked={settings.notify_payment_overdue}
              onCheckedChange={(checked) => setSettings({ ...settings, notify_payment_overdue: checked })}
              disabled={!settings.email_notifications}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notify_new_lead" className="text-base">
                Novos leads
              </Label>
              <p className="text-sm text-muted-foreground">Quando um novo lead for cadastrado</p>
            </div>
            <Switch
              id="notify_new_lead"
              checked={settings.notify_new_lead}
              onCheckedChange={(checked) => setSettings({ ...settings, notify_new_lead: checked })}
              disabled={!settings.email_notifications}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notify_project_update" className="text-base">
                Atualizações de projetos
              </Label>
              <p className="text-sm text-muted-foreground">Quando houver mudanças em projetos</p>
            </div>
            <Switch
              id="notify_project_update"
              checked={settings.notify_project_update}
              onCheckedChange={(checked) => setSettings({ ...settings, notify_project_update: checked })}
              disabled={!settings.email_notifications}
            />
          </div>

          <Button onClick={handleSave} disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Salvar Preferências
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
