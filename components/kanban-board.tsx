"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { AlertCircle, Clock } from "lucide-react"
import Link from "next/link"

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

interface KanbanBoardProps {
  tasks: Task[]
  users: { id: string; full_name: string; email: string }[]
  currentUserId: string
  taskAssignees?: { task_id: string; user: { id: string; full_name: string } }[]
}

const columns = [
  { id: "backlog", title: "Backlog", color: "bg-slate-100 dark:bg-slate-800" },
  { id: "todo", title: "A Fazer", color: "bg-blue-50 dark:bg-blue-950" },
  { id: "in_progress", title: "Em Progresso", color: "bg-yellow-50 dark:bg-yellow-950" },
  { id: "review", title: "Revisão", color: "bg-purple-50 dark:bg-purple-950" },
  { id: "done", title: "Concluído", color: "bg-green-50 dark:bg-green-950" },
]

const priorityColors = {
  low: "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
  medium: "bg-blue-200 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  high: "bg-orange-200 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
  urgent: "bg-red-200 text-red-700 dark:bg-red-900 dark:text-red-300",
}

const priorityLabels = {
  low: "Baixa",
  medium: "Média",
  high: "Alta",
  urgent: "Urgente",
}

export function KanbanBoard({ tasks, users, currentUserId, taskAssignees = [] }: KanbanBoardProps) {
  const [draggedTask, setDraggedTask] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = async (status: string) => {
    if (!draggedTask) return

    await supabase.from("tasks").update({ status, updated_at: new Date().toISOString() }).eq("id", draggedTask)

    setDraggedTask(null)
    router.refresh()
  }

  const getTasksByStatus = (status: string) => {
    return tasks.filter((task) => task.status === status)
  }

  const isOverdue = (dueDate: string | null) => {
    if (!dueDate) return false
    return new Date(dueDate) < new Date()
  }

  const getTaskAssignees = (taskId: string) => {
    return taskAssignees.filter((a) => a.task_id === taskId).map((a) => a.user)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {columns.map((column) => (
        <div
          key={column.id}
          className={cn("rounded-lg p-4 min-h-[500px]", column.color)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(column.id)}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900 dark:text-slate-50">{column.title}</h3>
            <Badge variant="secondary" className="text-xs">
              {getTasksByStatus(column.id).length}
            </Badge>
          </div>
          <div className="space-y-3">
            {getTasksByStatus(column.id).map((task) => {
              const assignees = getTaskAssignees(task.id)

              return (
                <Link key={task.id} href={`/tarefas/tasks/${task.id}`}>
                  <Card
                    draggable
                    onDragStart={() => handleDragStart(task.id)}
                    className="cursor-move hover:shadow-md transition-shadow"
                  >
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-sm font-medium line-clamp-2">{task.title}</CardTitle>
                        <Badge className={cn("text-xs", priorityColors[task.priority as keyof typeof priorityColors])}>
                          {priorityLabels[task.priority as keyof typeof priorityLabels]}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-2 space-y-3">
                      {task.description && (
                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">{task.description}</p>
                      )}
                      <div className="flex items-center justify-between">
                        {assignees.length > 0 && (
                          <div className="flex items-center -space-x-2">
                            {assignees.slice(0, 3).map((assignee) => (
                              <Avatar key={assignee.id} className="h-6 w-6 border-2 border-white dark:border-slate-800">
                                <AvatarFallback className="text-xs bg-slate-200 dark:bg-slate-700">
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
                              <div className="h-6 w-6 rounded-full bg-slate-300 dark:bg-slate-600 border-2 border-white dark:border-slate-800 flex items-center justify-center">
                                <span className="text-xs font-medium">+{assignees.length - 3}</span>
                              </div>
                            )}
                          </div>
                        )}
                        {task.due_date && (
                          <div
                            className={cn(
                              "flex items-center gap-1 text-xs",
                              isOverdue(task.due_date)
                                ? "text-red-600 dark:text-red-400"
                                : "text-slate-600 dark:text-slate-400",
                            )}
                          >
                            {isOverdue(task.due_date) ? (
                              <AlertCircle className="h-3 w-3" />
                            ) : (
                              <Clock className="h-3 w-3" />
                            )}
                            {new Date(task.due_date).toLocaleDateString("pt-BR")}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
