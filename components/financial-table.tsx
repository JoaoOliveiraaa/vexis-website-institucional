"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Pencil, Search } from "lucide-react"
import Link from "next/link"
import { DeleteFinancialRecordButton } from "@/components/delete-financial-record-button"

interface FinancialRecord {
  id: string
  type: string
  category: string
  amount: number
  description: string | null
  date: string
  created_by_profile: { id: string; full_name: string }
  project: { id: string; name: string } | null
}

interface FinancialTableProps {
  records: FinancialRecord[]
}

export function FinancialTable({ records }: FinancialTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const categories = Array.from(new Set(records.map((r) => r.category)))

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || record.type === typeFilter
    const matchesCategory = categoryFilter === "all" || record.category === categoryFilter

    return matchesSearch && matchesType && matchesCategory
  })

  return (
    <Card className="border border-border/60 bg-card/95 shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-base lg:text-lg text-card-foreground">Registros Financeiros</CardTitle>
        <p className="text-sm text-muted-foreground">
          Filtre por tipo, categoria ou descrição para acompanhar lançamentos com precisão.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por descrição ou categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 rounded-2xl border-border/60 bg-background pl-10"
            />
          </div>
          <div className="flex items-center gap-3">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="h-10 w-40 rounded-2xl border-border/60 bg-background">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="income">Receitas</SelectItem>
                <SelectItem value="expense">Despesas</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="h-10 w-44 rounded-2xl border-border/60 bg-background">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Badge variant="outline" className="gap-2 rounded-full border-border/60 bg-background px-3 py-1 text-xs">
              <Filter className="h-3.5 w-3.5" />
              Ajuste os filtros para refinar os resultados
            </Badge>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-2">
            <thead className="rounded-2xl bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="rounded-l-2xl px-4 py-3 text-left">Data</th>
                <th className="px-4 py-3 text-left">Tipo</th>
                <th className="px-4 py-3 text-left">Categoria</th>
                <th className="px-4 py-3 text-left">Descrição</th>
                <th className="px-4 py-3 text-left">Projeto</th>
                <th className="px-4 py-3 text-right">Valor</th>
                <th className="rounded-r-2xl px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr
                  key={record.id}
                  className="rounded-2xl border border-border/60 bg-card/95 text-sm shadow-sm transition hover:-translate-y-[1px] hover:bg-accent/5"
                >
                  <td className="rounded-l-2xl px-4 py-3 font-medium text-card-foreground">
                    {new Date(record.date).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      className={
                        record.type === "income"
                          ? "border border-emerald-500/40 bg-emerald-500/10 text-emerald-500"
                          : "border border-rose-500/40 bg-rose-500/10 text-rose-500"
                      }
                    >
                      {record.type === "income" ? "Receita" : "Despesa"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-card-foreground">{record.category}</td>
                  <td className="px-4 py-3 text-muted-foreground">{record.description || "-"}</td>
                  <td className="px-4 py-3 text-primary">
                    {record.project ? (
                      <Link href={`/tarefas/projects/${record.project.id}`} className="hover:underline">
                        {record.project.name}
                      </Link>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                  <td
                    className={`px-4 py-3 text-right font-semibold ${
                      record.type === "income" ? "text-emerald-500" : "text-rose-500"
                    }`}
                  >
                    {record.type === "income" ? "+" : "-"}R${" "}
                    {Number(record.amount).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="rounded-r-2xl px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/tarefas/financial/${record.id}/edit`}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <DeleteFinancialRecordButton recordId={record.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredRecords.length === 0 && (
          <div className="rounded-2xl border border-dashed border-primary/30 bg-card/90 py-10 text-center text-sm text-muted-foreground">
            Nenhum registro encontrado
          </div>
        )}
      </CardContent>
    </Card>
  )
}
