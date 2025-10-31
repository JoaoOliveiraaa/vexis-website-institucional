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
import { Copy } from "lucide-react"

interface ApiKeyFormProps {
  userId: string
  onClose: () => void
  onSuccess: () => void
}

const AVAILABLE_PERMISSIONS = [
  { id: "read:tasks", label: "Ler Tarefas" },
  { id: "write:tasks", label: "Criar/Editar Tarefas" },
  { id: "read:projects", label: "Ler Projetos" },
  { id: "write:projects", label: "Criar/Editar Projetos" },
  { id: "read:clients", label: "Ler Clientes" },
  { id: "write:clients", label: "Criar/Editar Clientes" },
  { id: "read:financial", label: "Ler Financeiro" },
  { id: "write:financial", label: "Criar/Editar Financeiro" },
]

export function ApiKeyForm({ userId, onClose, onSuccess }: ApiKeyFormProps) {
  const [name, setName] = useState("")
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [generatedKey, setGeneratedKey] = useState<string | null>(null)
  const supabase = createClient()

  const generateApiKey = () => {
    return `vx_${crypto.randomUUID().replace(/-/g, "")}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const apiKey = generateApiKey()

    const { error } = await supabase.from("api_keys").insert({
      name,
      key: apiKey,
      permissions: selectedPermissions,
      created_by: userId,
    })

    setLoading(false)

    if (!error) {
      setGeneratedKey(apiKey)
    }
  }

  const togglePermission = (permissionId: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId) ? prev.filter((p) => p !== permissionId) : [...prev, permissionId],
    )
  }

  const copyToClipboard = () => {
    if (generatedKey) {
      navigator.clipboard.writeText(generatedKey)
    }
  }

  if (generatedKey) {
    return (
      <Dialog open onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>API Key Criada com Sucesso!</DialogTitle>
            <DialogDescription>
              Copie sua API key agora. Por segurança, ela não será exibida novamente.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
              <code className="flex-1 text-sm break-all">{generatedKey}</code>
              <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Guarde esta chave em um local seguro. Você não poderá visualizá-la novamente.
            </p>
          </div>

          <DialogFooter>
            <Button onClick={onSuccess}>Entendi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Nova API Key</DialogTitle>
            <DialogDescription>Crie uma nova chave de API para integração com sistemas externos</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Minha Integração"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Permissões</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {AVAILABLE_PERMISSIONS.map((permission) => (
                  <div key={permission.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={permission.id}
                      checked={selectedPermissions.includes(permission.id)}
                      onCheckedChange={() => togglePermission(permission.id)}
                    />
                    <label
                      htmlFor={permission.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {permission.label}
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
            <Button type="submit" disabled={loading || selectedPermissions.length === 0}>
              {loading ? "Criando..." : "Criar API Key"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
