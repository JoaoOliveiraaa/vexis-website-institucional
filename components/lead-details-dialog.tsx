"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { Lead, User, LeadConversation } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, MessageSquare, Send } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

interface LeadDetailsDialogProps {
  lead: Lead
  users: User[]
  currentUserId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LeadDetailsDialog({ lead, users, currentUserId, open, onOpenChange }: LeadDetailsDialogProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [conversations, setConversations] = useState<LeadConversation[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [formData, setFormData] = useState({
    name: lead.name,
    email: lead.email || "",
    phone: lead.phone || "",
    company: lead.company || "",
    status: lead.status,
    source: lead.source || "",
    assigned_to: lead.assigned_to || null,
  })
  const router = useRouter()

  useEffect(() => {
    if (open) {
      fetchConversations()
    }
  }, [open, lead.id])

  const fetchConversations = async () => {
    try {
      const response = await fetch(`/api/leads/${lead.id}/conversations`)
      const data = await response.json()
      setConversations(data.conversations || [])
    } catch (err) {
      console.error("Error fetching conversations:", err)
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          assigned_to: formData.assigned_to || null,
          email: formData.email || null,
          phone: formData.phone || null,
          company: formData.company || null,
          source: formData.source || null,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao atualizar lead")
      }

      router.refresh()
      onOpenChange(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao atualizar lead")
    } finally {
      setLoading(false)
    }
  }

  const handleAddMessage = async () => {
    if (!newMessage.trim()) return

    try {
      const response = await fetch(`/api/leads/${lead.id}/conversations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newMessage, user_id: currentUserId }),
      })

      if (response.ok) {
        setNewMessage("")
        fetchConversations()
      }
    } catch (err) {
      console.error("Error adding message:", err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalhes do Lead</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleUpdate} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Empresa</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="source">Origem</Label>
              <Input
                id="source"
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value as any })}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">Novo</SelectItem>
                  <SelectItem value="contacted">Contatado</SelectItem>
                  <SelectItem value="qualified">Qualificado</SelectItem>
                  <SelectItem value="proposal">Proposta</SelectItem>
                  <SelectItem value="negotiation">Negociação</SelectItem>
                  <SelectItem value="won">Ganho</SelectItem>
                  <SelectItem value="lost">Perdido</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assigned_to">Atribuir a</Label>
              <Select
                value={formData.assigned_to}
                onValueChange={(value) => setFormData({ ...formData, assigned_to: value })}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um usuário" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={null}>Não atribuído</SelectItem>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.full_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="h-5 w-5 text-slate-600" />
              <h3 className="text-lg font-semibold text-slate-900">Histórico de Conversas</h3>
            </div>

            <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
              {conversations.map((conversation) => (
                <div key={conversation.id} className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-medium text-slate-900">
                      {(conversation.user as any)?.full_name || "Usuário"}
                    </span>
                    <span className="text-xs text-slate-600">
                      {formatDistanceToNow(new Date(conversation.created_at), { addSuffix: true, locale: ptBR })}
                    </span>
                  </div>
                  <p className="text-slate-700 whitespace-pre-wrap">{conversation.message}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Textarea
                placeholder="Adicionar nota sobre a conversa..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                rows={3}
              />
              <Button type="button" onClick={handleAddMessage} className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Adicionar Nota
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                "Salvar Alterações"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
