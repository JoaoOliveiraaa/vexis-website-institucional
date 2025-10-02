export type UserRole = "admin" | "user"

export type TaskStatus = "pending" | "in_progress" | "completed" | "cancelled"
export type TaskPriority = "low" | "medium" | "high" | "urgent"

export type LeadStatus = "new" | "contacted" | "qualified" | "proposal" | "negotiation" | "won" | "lost"

export interface User {
  id: string
  email: string
  full_name: string
  role: UserRole
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  title: string
  description: string | null
  status: TaskStatus
  priority: TaskPriority
  assigned_to: string | null
  created_by: string | null
  due_date: string | null
  created_at: string
  updated_at: string
  assigned_user?: User
  created_user?: User
}

export interface Lead {
  id: string
  name: string
  email: string | null
  phone: string | null
  company: string | null
  status: LeadStatus
  source: string | null
  assigned_to: string | null
  created_by: string | null
  created_at: string
  updated_at: string
  assigned_user?: User
  created_user?: User
}

export interface LeadConversation {
  id: string
  lead_id: string
  user_id: string
  message: string
  created_at: string
  user?: User
}

export interface TaskComment {
  id: string
  task_id: string
  user_id: string
  comment: string
  created_at: string
  user?: User
}
