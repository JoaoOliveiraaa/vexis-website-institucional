"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FinancialRecordFormProps {
  projects: { id: string; name: string }[]
  currentUserId: string
  record?: {
    id: string
    type: string
    category: string
    amount: number
    description: string | null
    date: string
    project_id: string | null
  }
}

export function FinancialRecordForm({ projects, currentUserId, record }: FinancialRecordFormProps) {
  const [type, setType] = useState(record?.type || "income")
  const [category, setCategory] = useState(record?.category || "")
  const [amount, setAmount] = useState(record?.amount.toString() || "")
  const [description, setDescription] = useState(record?.description || "")
  const [date, setDate] = useState(record?.date.split("T")[0] || new Date().toISOString().split("T")[0])
  const [projectId, setProjectId] = useState(record?.project_id || "none")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const recordData = {
        type,
        category,
        amount: Number.parseFloat(amount),
        description: description || null,
        date: new Date(date).toISOString(),
        project_id: projectId === "none" ? null : projectId,
        updated_at: new Date().toISOString(),
      }

      if (record) {
        const { error } = await supabase.from("financial_records").update(recordData).eq("id", record.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from("financial_records").insert({
          ...recordData,
          created_by: currentUserId,
        })
        if (error) throw error
      }

      router.push("/tarefas/financial")
      router.refresh()
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Erro ao salvar registro")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{record ? "Editar Registro" : "Novo Registro"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="type">Tipo *</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Receita</SelectItem>
                <SelectItem value="expense">Despesa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Categoria *</Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Ex: Vendas, Marketing, Salários"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Valor (R$) *</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o registro financeiro"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Data *</Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectId">Projeto</Label>
              <Select value={projectId} onValueChange={setProjectId}>
                <SelectTrigger id="projectId">
                  <SelectValue placeholder="Selecione um projeto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Nenhum</SelectItem>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : record ? "Atualizar Registro" : "Criar Registro"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
