"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"

interface Task {
  id: string
  title: string
  description: string | null
  status: string
  priority: string
  assigned_to: string | null
  created_by: string
  due_date: string | null
  created_at: string
  assigned_to_profile: { id: string; full_name: string } | null
  created_by_profile: { id: string; full_name: string }
}

interface TasksTableProps {
  tasks: Task[]
  taskAssignees?: { task_id: string; user: { id: string; full_name: string } }[]
}

const statusLabels = {
  backlog: "Backlog",
  todo: "A Fazer",
  in_progress: "Em Progresso",
  review: "Revisão",
  done: "Concluído",
}

const statusColors = {
  backlog: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  todo: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  in_progress: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  review: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  done: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
}

const priorityLabels = {
  low: "Baixa",
  medium: "Média",
  high: "Alta",
  urgent: "Urgente",
}

const priorityColors = {
  low: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  medium: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  high: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
  urgent: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
}

export function TasksTable({ tasks, taskAssignees = [] }: TasksTableProps) {
  const router = useRouter()
  const supabase = createClient()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const getTaskAssignees = (taskId: string) => {
    return taskAssignees.filter((a) => a.task_id === taskId).map((a) => a.user)
  }

  const handleDelete = async (taskId: string) => {
    if (!confirm("Tem certeza que deseja excluir esta tarefa?")) return

    setDeletingId(taskId)
    await supabase.from("tasks").delete().eq("id", taskId)
    setDeletingId(null)
    router.refresh()
  }

  const isOverdue = (dueDate: string | null) => {
    if (!dueDate) return false
    return new Date(dueDate) < new Date()
  }

  return (
    <div className="overflow-x-auto rounded-2xl">
      <Table className="min-w-full border-separate border-spacing-y-2">
        <TableHeader>
          <TableRow className="rounded-2xl bg-muted/30 hover:bg-muted/40">
            <TableHead className="min-w-[150px]">Título</TableHead>
            <TableHead className="min-w-[120px]">Status</TableHead>
            <TableHead className="min-w-[100px]">Prioridade</TableHead>
            <TableHead className="min-w-[150px]">Responsáveis</TableHead>
            <TableHead className="min-w-[120px]">Vencimento</TableHead>
            <TableHead className="text-right min-w-[80px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length === 0 ? (
            <TableRow className="rounded-xl bg-card/80">
              <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                Nenhuma tarefa encontrada
              </TableCell>
            </TableRow>
          ) : (
            tasks.map((task) => {
              const assignees = getTaskAssignees(task.id)

              return (
                <TableRow
                  key={task.id}
                  className="rounded-2xl border border-border/60 bg-card/95 shadow-sm transition hover:-translate-y-[1px] hover:bg-accent/5"
                >
                  <TableCell className="font-medium">
                    <Link href={`/tarefas/tasks/${task.id}`} className="hover:underline">
                      {task.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "text-xs whitespace-nowrap",
                        statusColors[task.status as keyof typeof statusColors],
                      )}
                    >
                      {statusLabels[task.status as keyof typeof statusLabels]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "text-xs whitespace-nowrap",
                        priorityColors[task.priority as keyof typeof priorityColors],
                      )}
                    >
                      {priorityLabels[task.priority as keyof typeof priorityLabels]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {assignees.length > 0 ? (
                      <div className="flex items-center -space-x-2">
                        {assignees.slice(0, 3).map((assignee) => (
                          <Avatar key={assignee.id} className="h-7 w-7 border-2 border-background">
                            <AvatarFallback className="text-xs">
                              {assignee.full_name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()
                                .slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {assignees.length > 3 && (
                          <div className="h-7 w-7 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                            <span className="text-xs font-medium">+{assignees.length - 3}</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground whitespace-nowrap">Não atribuído</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {task.due_date ? (
                      <span
                        className={cn(
                          "text-sm whitespace-nowrap",
                          isOverdue(task.due_date) ? "text-destructive font-medium" : "text-muted-foreground",
                        )}
                      >
                        {new Date(task.due_date).toLocaleDateString("pt-BR")}
                      </span>
                    ) : (
                      <span className="text-sm text-muted-foreground whitespace-nowrap">Sem prazo</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/tarefas/tasks/${task.id}`} className="flex items-center">
                            <Eye className="h-4 w-4 mr-2" />
                            Ver detalhes
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/tarefas/tasks/${task.id}/edit`} className="flex items-center">
                            <Pencil className="h-4 w-4 mr-2" />
                            Editar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(task.id)}
                          disabled={deletingId === task.id}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </div>
  )
}
