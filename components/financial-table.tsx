"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pencil, Search } from "lucide-react"
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
    <Card>
      <CardHeader>
        <CardTitle>Registros Financeiros</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Buscar por descrição ou categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="income">Receitas</SelectItem>
              <SelectItem value="expense">Despesas</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
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
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-900">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400">Data</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400">Tipo</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400">
                    Categoria
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400">
                    Descrição
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400">
                    Projeto
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-slate-600 dark:text-slate-400">Valor</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-slate-600 dark:text-slate-400">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                    <td className="px-4 py-3 text-sm text-slate-900 dark:text-slate-50">
                      {new Date(record.date).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        className={
                          record.type === "income"
                            ? "bg-green-200 text-green-700 dark:bg-green-900 dark:text-green-300"
                            : "bg-red-200 text-red-700 dark:bg-red-900 dark:text-red-300"
                        }
                      >
                        {record.type === "income" ? "Receita" : "Despesa"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-900 dark:text-slate-50">{record.category}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                      {record.description || "-"}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {record.project ? (
                        <Link
                          href={`/tarefas/projects/${record.project.id}`}
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {record.project.name}
                        </Link>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td
                      className={`px-4 py-3 text-sm font-medium text-right ${record.type === "income" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      {record.type === "income" ? "+" : "-"}R${" "}
                      {Number(record.amount).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/tarefas/financial/${record.id}/edit`}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
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
            <div className="text-center py-12">
              <p className="text-slate-600 dark:text-slate-400">Nenhum registro encontrado</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
