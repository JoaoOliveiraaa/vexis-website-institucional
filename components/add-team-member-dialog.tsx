"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  full_name: z.string().min(3, "Informe o nome completo"),
  email: z.string().email("Informe um email válido"),
  role: z.enum(["user", "admin"]),
  niche: z.string().optional(),
})

interface AddTeamMemberDialogProps {
  trigger: ReactNode
}

export function AddTeamMemberDialog({ trigger }: AddTeamMemberDialogProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formValues, setFormValues] = useState({
    full_name: "",
    email: "",
    role: "user",
    niche: "",
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const parseResult = formSchema.safeParse(formValues)

    if (!parseResult.success) {
      const message =
        parseResult.error.errors.map((err) => err.message).join("\n") || "Preencha os dados corretamente."
      toast({ title: "Dados inválidos", description: message, variant: "destructive" })
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/team/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      })

      if (!response.ok) {
        const result = await response.json().catch(() => null)
        throw new Error(result?.error || "Não foi possível adicionar o membro.")
      }

      toast({
        title: "Convite enviado!",
        description: "O membro recebeu um email para acessar o painel. Nicho atualizado com sucesso.",
      })
      setFormValues({ full_name: "", email: "", role: "user", niche: "" })
      setOpen(false)
      router.refresh()
    } catch (error) {
      console.error("[AddTeamMemberDialog] submit error", error)
      toast({
        title: "Erro ao convidar",
        description:
          error instanceof Error
            ? error.message
            : "Não foi possível enviar o convite agora. Tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(value) => !loading && setOpen(value)}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Adicionar membro ao time</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="full_name">Nome completo</Label>
            <Input
              id="full_name"
              value={formValues.full_name}
              onChange={(event) => setFormValues((current) => ({ ...current, full_name: event.target.value }))}
              placeholder="Fulano da Silva"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formValues.email}
              onChange={(event) => setFormValues((current) => ({ ...current, email: event.target.value }))}
              placeholder="email@empresa.com"
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="role">Permissão</Label>
              <Select
                value={formValues.role}
                onValueChange={(value) => setFormValues((current) => ({ ...current, role: value as "user" | "admin" }))}
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="Selecione a permissão" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Usuário</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="niche">Nicho / área</Label>
              <Input
                id="niche"
                value={formValues.niche}
                onChange={(event) => setFormValues((current) => ({ ...current, niche: event.target.value }))}
                placeholder="Desenvolvimento, Marketing..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Convidar membro"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

