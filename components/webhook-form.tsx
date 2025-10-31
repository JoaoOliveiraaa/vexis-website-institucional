"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { createClient } from "@/lib/supabase/client"

interface Webhook {
  id: string
  name: string
  url: string
  events: string[]
  active: boolean
}

interface WebhookFormProps {
  userId: string
  webhook?: Webhook | null
  onClose: () => void
  onSuccess: () => void
}

const AVAILABLE_EVENTS = [
  { id: "task.created", label: "Tarefa Criada" },
  { id: "task.updated", label: "Tarefa Atualizada" },
  { id: "task.deleted", label: "Tarefa Excluída" },
  { id: "project.created", label: "Projeto Criado" },
  { id: "project.updated", label: "Projeto Atualizado" },
  { id: "client.created", label: "Cliente Criado" },
  { id: "payment.received", label: "Pagamento Recebido" },
  { id: "payment.overdue", label: "Pagamento Atrasado" },
]

export function WebhookForm({ userId, webhook, onClose, onSuccess }: WebhookFormProps) {
  const [name, setName] = useState(webhook?.name || "")
  const [url, setUrl] = useState(webhook?.url || "")
  const [selectedEvents, setSelectedEvents] = useState<string[]>(webhook?.events || [])
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const secret = webhook?.id || crypto.randomUUID()

    const data = {
      name,
      url,
      events: selectedEvents,
      secret,
      created_by: userId,
    }

    const { error } = webhook
      ? await supabase.from("webhooks").update(data).eq("id", webhook.id)
      : await supabase.from("webhooks").insert(data)

    setLoading(false)

    if (!error) {
      onSuccess()
    }
  }

  const toggleEvent = (eventId: string) => {
    setSelectedEvents((prev) => (prev.includes(eventId) ? prev.filter((e) => e !== eventId) : [...prev, eventId]))
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{webhook ? "Editar Webhook" : "Novo Webhook"}</DialogTitle>
            <DialogDescription>Configure um webhook para receber notificações de eventos</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Meu Webhook"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://api.exemplo.com/webhook"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Eventos</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {AVAILABLE_EVENTS.map((event) => (
                  <div key={event.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={event.id}
                      checked={selectedEvents.includes(event.id)}
                      onCheckedChange={() => toggleEvent(event.id)}
                    />
                    <label
                      htmlFor={event.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {event.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading || selectedEvents.length === 0}>
              {loading ? "Salvando..." : webhook ? "Atualizar" : "Criar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
