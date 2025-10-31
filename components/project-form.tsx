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
import { Slider } from "@/components/ui/slider"

interface ProjectFormProps {
  currentUserId: string
  project?: {
    id: string
    name: string
    description: string | null
    status: string
    start_date: string | null
    end_date: string | null
    budget: number | null
    spent: number | null
    progress: number
  }
}

export function ProjectForm({ currentUserId, project }: ProjectFormProps) {
  const [name, setName] = useState(project?.name || "")
  const [description, setDescription] = useState(project?.description || "")
  const [status, setStatus] = useState(project?.status || "planning")
  const [startDate, setStartDate] = useState(project?.start_date?.split("T")[0] || "")
  const [endDate, setEndDate] = useState(project?.end_date?.split("T")[0] || "")
  const [budget, setBudget] = useState(project?.budget?.toString() || "")
  const [spent, setSpent] = useState(project?.spent?.toString() || "0")
  const [progress, setProgress] = useState([project?.progress || 0])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const projectData = {
        name,
        description: description || null,
        status,
        start_date: startDate ? new Date(startDate).toISOString() : null,
        end_date: endDate ? new Date(endDate).toISOString() : null,
        budget: budget ? Number.parseFloat(budget) : null,
        spent: spent ? Number.parseFloat(spent) : 0,
        progress: progress[0],
        updated_at: new Date().toISOString(),
      }

      if (project) {
        const { error } = await supabase.from("projects").update(projectData).eq("id", project.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from("projects").insert({
          ...projectData,
          created_by: currentUserId,
        })
        if (error) throw error
      }

      router.push("/tarefas/projects")
      router.refresh()
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Erro ao salvar projeto")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{project ? "Editar Projeto" : "Novo Projeto"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Projeto *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o nome do projeto"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o projeto"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="planning">Planejamento</SelectItem>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="on_hold">Em Espera</SelectItem>
                <SelectItem value="completed">Concluído</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Data de Início</Label>
              <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">Data de Término</Label>
              <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Orçamento (R$)</Label>
              <Input
                id="budget"
                type="number"
                step="0.01"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="spent">Gasto (R$)</Label>
              <Input
                id="spent"
                type="number"
                step="0.01"
                value={spent}
                onChange={(e) => setSpent(e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="progress">Progresso</Label>
              <span className="text-sm font-medium text-slate-900 dark:text-slate-50">{progress[0]}%</span>
            </div>
            <Slider id="progress" value={progress} onValueChange={setProgress} max={100} step={5} className="py-4" />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : project ? "Atualizar Projeto" : "Criar Projeto"}
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
