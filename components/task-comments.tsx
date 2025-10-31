"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Trash2 } from "lucide-react"

interface Comment {
  id: string
  content: string
  created_at: string
  user_id: string
  user: {
    id: string
    full_name: string
  }
}

interface TaskCommentsProps {
  taskId: string
  comments: Comment[]
  currentUserId: string
}

export function TaskComments({ taskId, comments, currentUserId }: TaskCommentsProps) {
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setIsLoading(true)

    try {
      const { error } = await supabase.from("task_comments").insert({
        task_id: taskId,
        user_id: currentUserId,
        content: content.trim(),
      })

      if (error) throw error

      setContent("")
      router.refresh()
    } catch (error) {
      console.error("Error adding comment:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (commentId: string) => {
    try {
      const { error } = await supabase.from("task_comments").delete().eq("id", commentId)

      if (error) throw error

      router.refresh()
    } catch (error) {
      console.error("Error deleting comment:", error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comentários ({comments.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Adicione um comentário..."
            rows={3}
          />
          <Button type="submit" disabled={isLoading || !content.trim()}>
            {isLoading ? "Enviando..." : "Adicionar Comentário"}
          </Button>
        </form>

        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-900">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs bg-slate-200 dark:bg-slate-700">
                  {comment.user.full_name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <span className="font-medium text-sm text-slate-900 dark:text-slate-50">
                      {comment.user.full_name}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-500 ml-2">
                      {new Date(comment.created_at).toLocaleString("pt-BR")}
                    </span>
                  </div>
                  {comment.user_id === currentUserId && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(comment.id)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">{comment.content}</p>
              </div>
            </div>
          ))}
          {comments.length === 0 && (
            <p className="text-center text-sm text-slate-500 dark:text-slate-500 py-8">
              Nenhum comentário ainda. Seja o primeiro a comentar!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
