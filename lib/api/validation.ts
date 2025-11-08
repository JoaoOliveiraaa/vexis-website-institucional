import { z } from "zod"

// Task schemas
export const createTaskSchema = z.object({
  title: z.string().min(1, "Título é obrigatório").max(200, "Título muito longo"),
  description: z.string().max(2000, "Descrição muito longa").optional().nullable(),
  status: z.enum(["backlog", "todo", "in_progress", "review", "done"]),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  assigned_to: z.string().uuid().optional().nullable(),
  project_id: z.string().uuid().optional().nullable(),
  due_date: z.string().datetime().optional().nullable(),
  assignee_ids: z.array(z.string().uuid()).optional(),
})

export const updateTaskSchema = createTaskSchema.partial().extend({
  id: z.string().uuid(),
})

// Client schemas
export const createClientSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(200, "Nome muito longo"),
  email: z.string().email("Email inválido").optional().nullable(),
  phone: z.string().max(20, "Telefone muito longo").optional().nullable(),
  company: z.string().max(200, "Nome da empresa muito longo").optional().nullable(),
  document: z.string().max(20, "Documento muito longo").optional().nullable(),
  client_type: z.enum(["pessoa_fisica", "pessoa_juridica"]),
  status: z.enum(["ativo", "inativo", "inadimplente"]),
  address: z.string().max(300, "Endereço muito longo").optional().nullable(),
  city: z.string().max(100, "Cidade muito longo").optional().nullable(),
  state: z.string().max(2, "Estado inválido").optional().nullable(),
  zip_code: z.string().max(10, "CEP muito longo").optional().nullable(),
  notes: z.string().max(2000, "Observações muito longas").optional().nullable(),
})

export const updateClientSchema = createClientSchema.partial().extend({
  id: z.string().uuid(),
})

// Project schemas
export const createProjectSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(200, "Nome muito longo"),
  description: z.string().max(2000, "Descrição muito longa").optional().nullable(),
  status: z.enum(["planning", "in_progress", "on_hold", "completed", "cancelled"]),
  client_id: z.string().uuid().optional().nullable(),
  start_date: z.string().datetime().optional().nullable(),
  end_date: z.string().datetime().optional().nullable(),
  budget: z.number().positive("Orçamento deve ser positivo").optional().nullable(),
})

export const updateProjectSchema = createProjectSchema.partial().extend({
  id: z.string().uuid(),
})

// Lead schemas
export const createLeadSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(200, "Nome muito longo"),
  email: z.string().email("Email inválido").optional().nullable(),
  phone: z.string().max(20, "Telefone muito longo").optional().nullable(),
  company: z.string().max(200, "Nome da empresa muito longo").optional().nullable(),
  status: z.enum(["novo", "contatado", "qualificado", "proposta", "ganho", "perdido"]),
  source: z.string().max(100, "Fonte muito longa").optional().nullable(),
  notes: z.string().max(2000, "Observações muito longas").optional().nullable(),
  estimated_value: z.number().positive("Valor estimado deve ser positivo").optional().nullable(),
})

export const updateLeadSchema = createLeadSchema.partial().extend({
  id: z.string().uuid(),
})

// Financial record schemas
export const createFinancialRecordSchema = z.object({
  description: z.string().min(1, "Descrição é obrigatória").max(200, "Descrição muito longa"),
  amount: z.number().positive("Valor deve ser positivo"),
  type: z.enum(["income", "expense"]),
  category: z.string().max(100, "Categoria muito longa").optional().nullable(),
  date: z.string().datetime(),
  payment_method: z.string().max(50, "Método de pagamento muito longo").optional().nullable(),
  client_id: z.string().uuid().optional().nullable(),
  project_id: z.string().uuid().optional().nullable(),
  notes: z.string().max(2000, "Observações muito longas").optional().nullable(),
})

export const updateFinancialRecordSchema = createFinancialRecordSchema.partial().extend({
  id: z.string().uuid(),
})

// User schemas
export const updateUserSchema = z.object({
  id: z.string().uuid(),
  full_name: z.string().min(1, "Nome é obrigatório").max(200, "Nome muito longo"),
  role: z.enum(["user", "admin"]),
})

// Helper function to validate data
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): T {
  return schema.parse(data)
}

