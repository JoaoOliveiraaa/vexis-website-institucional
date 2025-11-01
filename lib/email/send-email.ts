"use server"

import { createClient } from "@/lib/supabase/server"

export async function sendEmail(to: string, subject: string, html: string) {
  // Verificar se o usuário tem notificações por email habilitadas
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    console.log("[v0] Cannot send email: user not authenticated")
    return { success: false, error: "User not authenticated" }
  }

  // Buscar preferências do usuário
  const { data: preferences } = await supabase
    .from("user_preferences")
    .select("email_notifications")
    .eq("user_id", user.id)
    .single()

  if (!preferences?.email_notifications) {
    console.log("[v0] Email notifications disabled for user:", user.email)
    return { success: false, error: "Email notifications disabled" }
  }

  // Por enquanto, apenas logamos que o email seria enviado
  // Para implementar de verdade, você precisaria integrar com um serviço como Resend
  console.log("[v0] Email would be sent:", {
    to,
    subject,
    from: "Vexis <noreply@vexis.com>",
  })

  // Registrar na tabela de notificações
  await supabase.from("notifications").insert({
    user_id: user.id,
    type: "email",
    title: subject,
    message: "Email enviado",
    read: false,
  })

  return { success: true }
}

export async function notifyTaskAssigned(userId: string, taskTitle: string, assignedBy: string, dueDate: string) {
  const supabase = await createClient()

  // Buscar preferências e email do usuário
  const { data: preferences } = await supabase
    .from("user_preferences")
    .select("notify_task_assigned, email_notifications")
    .eq("user_id", userId)
    .single()

  if (!preferences?.notify_task_assigned || !preferences?.email_notifications) {
    return { success: false, error: "Notifications disabled" }
  }

  // Buscar email do usuário
  const { data: profile } = await supabase.from("profiles").select("email").eq("id", userId).single()

  if (!profile?.email) {
    return { success: false, error: "User email not found" }
  }

  const { emailTemplates } = await import("./templates")
  const template = emailTemplates.taskAssigned(taskTitle, assignedBy, dueDate)

  return sendEmail(profile.email, template.subject, template.html)
}

export async function notifyTaskDueSoon(userId: string, taskTitle: string, dueDate: string) {
  const supabase = await createClient()

  const { data: preferences } = await supabase
    .from("user_preferences")
    .select("notify_task_due, email_notifications")
    .eq("user_id", userId)
    .single()

  if (!preferences?.notify_task_due || !preferences?.email_notifications) {
    return { success: false, error: "Notifications disabled" }
  }

  const { data: profile } = await supabase.from("profiles").select("email").eq("id", userId).single()

  if (!profile?.email) {
    return { success: false, error: "User email not found" }
  }

  const { emailTemplates } = await import("./templates")
  const template = emailTemplates.taskDueSoon(taskTitle, dueDate)

  return sendEmail(profile.email, template.subject, template.html)
}

export async function notifyPaymentOverdue(userId: string, clientName: string, amount: string, dueDate: string) {
  const supabase = await createClient()

  const { data: preferences } = await supabase
    .from("user_preferences")
    .select("notify_payment_overdue, email_notifications")
    .eq("user_id", userId)
    .single()

  if (!preferences?.notify_payment_overdue || !preferences?.email_notifications) {
    return { success: false, error: "Notifications disabled" }
  }

  const { data: profile } = await supabase.from("profiles").select("email").eq("id", userId).single()

  if (!profile?.email) {
    return { success: false, error: "User email not found" }
  }

  const { emailTemplates } = await import("./templates")
  const template = emailTemplates.paymentOverdue(clientName, amount, dueDate)

  return sendEmail(profile.email, template.subject, template.html)
}

export async function notifyNewLead(userId: string, leadName: string, leadEmail: string, leadPhone: string) {
  const supabase = await createClient()

  const { data: preferences } = await supabase
    .from("user_preferences")
    .select("notify_new_lead, email_notifications")
    .eq("user_id", userId)
    .single()

  if (!preferences?.notify_new_lead || !preferences?.email_notifications) {
    return { success: false, error: "Notifications disabled" }
  }

  const { data: profile } = await supabase.from("profiles").select("email").eq("id", userId).single()

  if (!profile?.email) {
    return { success: false, error: "User email not found" }
  }

  const { emailTemplates } = await import("./templates")
  const template = emailTemplates.newLead(leadName, leadEmail, leadPhone)

  return sendEmail(profile.email, template.subject, template.html)
}
