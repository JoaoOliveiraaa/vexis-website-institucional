"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"

interface SettingsFormProps {
  profile: {
    id: string
    email: string
    full_name: string
    role: string
  }
}

export function SettingsForm({ profile }: SettingsFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fullName, setFullName] = useState(profile.full_name)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const supabase = createClient()

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          updated_at: new Date().toISOString(),
        })
        .eq("id", profile.id)

      if (error) throw error

      alert("Informações atualizadas com sucesso!")
      router.refresh()
    } catch (error) {
      console.error("[v0] Error updating profile:", error)
      alert("Erro ao atualizar informações. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={profile.email} disabled />
        <p className="text-sm text-muted-foreground">O email não pode ser alterado</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="full_name">Nome Completo</Label>
        <Input id="full_name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Permissão</Label>
        <Input id="role" value={profile.role === "admin" ? "Admin" : "Usuário"} disabled />
        <p className="text-sm text-muted-foreground">Apenas administradores podem alterar permissões</p>
      </div>

      <Button type="submit" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Salvar Alterações
      </Button>
    </form>
  )
}
