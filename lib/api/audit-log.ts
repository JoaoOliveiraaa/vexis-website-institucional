import { createClient } from "@/lib/supabase/server"

export type AuditAction = 
  | "create"
  | "update"
  | "delete"
  | "read"
  | "login"
  | "logout"
  | "failed_login"
  | "permission_denied"
  | "rate_limit_exceeded"

export interface AuditLogEntry {
  user_id: string | null
  action: AuditAction
  resource_type: string // 'task', 'client', 'project', etc.
  resource_id: string | null
  details?: any
  ip_address?: string
  user_agent?: string
  status: "success" | "failure"
  error_message?: string
}

/**
 * Registra uma ação no log de auditoria
 */
export async function logAudit(entry: AuditLogEntry): Promise<void> {
  try {
    // Por enquanto, apenas console.log
    // Em produção, salve no banco de dados
    console.log("[AUDIT LOG]", {
      timestamp: new Date().toISOString(),
      ...entry,
    })

    // Opcional: Salvar no Supabase
    // const supabase = await createClient()
    // await supabase.from("audit_logs").insert({
    //   user_id: entry.user_id,
    //   action: entry.action,
    //   resource_type: entry.resource_type,
    //   resource_id: entry.resource_id,
    //   details: entry.details,
    //   ip_address: entry.ip_address,
    //   user_agent: entry.user_agent,
    //   status: entry.status,
    //   error_message: entry.error_message,
    //   created_at: new Date().toISOString(),
    // })
  } catch (error) {
    // Não deixar erro no log quebrar a aplicação
    console.error("[AUDIT LOG ERROR]", error)
  }
}

/**
 * Helper para logar ações de sucesso
 */
export async function logSuccess(
  userId: string | null,
  action: AuditAction,
  resourceType: string,
  resourceId?: string | null,
  details?: any,
  request?: Request
): Promise<void> {
  await logAudit({
    user_id: userId,
    action,
    resource_type: resourceType,
    resource_id: resourceId || null,
    details,
    ip_address: request?.headers.get("x-forwarded-for") || request?.headers.get("x-real-ip") || undefined,
    user_agent: request?.headers.get("user-agent") || undefined,
    status: "success",
  })
}

/**
 * Helper para logar ações de falha
 */
export async function logFailure(
  userId: string | null,
  action: AuditAction,
  resourceType: string,
  errorMessage: string,
  details?: any,
  request?: Request
): Promise<void> {
  await logAudit({
    user_id: userId,
    action,
    resource_type: resourceType,
    resource_id: null,
    details,
    ip_address: request?.headers.get("x-forwarded-for") || request?.headers.get("x-real-ip") || undefined,
    user_agent: request?.headers.get("user-agent") || undefined,
    status: "failure",
    error_message: errorMessage,
  })
}

/**
 * Schema para criar tabela de audit_logs (execute no Supabase)
 * 
 * CREATE TABLE IF NOT EXISTS audit_logs (
 *   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   user_id UUID REFERENCES profiles(id),
 *   action VARCHAR(50) NOT NULL,
 *   resource_type VARCHAR(50) NOT NULL,
 *   resource_id UUID,
 *   details JSONB,
 *   ip_address VARCHAR(50),
 *   user_agent TEXT,
 *   status VARCHAR(20) NOT NULL,
 *   error_message TEXT,
 *   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
 * );
 * 
 * CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
 * CREATE INDEX idx_audit_logs_action ON audit_logs(action);
 * CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);
 * CREATE INDEX idx_audit_logs_resource ON audit_logs(resource_type, resource_id);
 */

