/**
 * Sanitização de inputs para prevenir XSS e injeção
 */

/**
 * Remove caracteres perigosos de strings
 */
export function sanitizeString(input: string): string {
  if (typeof input !== "string") return ""
  
  return input
    .trim()
    // Remove null bytes
    .replace(/\0/g, "")
    // Remove caracteres de controle
    .replace(/[\x00-\x1F\x7F]/g, "")
    // Limita tamanho
    .slice(0, 10000)
}

/**
 * Sanitiza HTML (remove tags perigosas)
 */
export function sanitizeHtml(input: string): string {
  if (typeof input !== "string") return ""
  
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
}

/**
 * Valida e sanitiza email
 */
export function sanitizeEmail(email: string): string {
  if (typeof email !== "string") return ""
  
  const sanitized = email.toLowerCase().trim()
  
  // Validação básica de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(sanitized)) {
    throw new Error("Email inválido")
  }
  
  return sanitized
}

/**
 * Sanitiza números
 */
export function sanitizeNumber(input: any): number {
  const num = Number(input)
  
  if (isNaN(num) || !isFinite(num)) {
    throw new Error("Número inválido")
  }
  
  return num
}

/**
 * Sanitiza UUID
 */
export function sanitizeUuid(uuid: string): string {
  if (typeof uuid !== "string") {
    throw new Error("UUID inválido")
  }
  
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  
  if (!uuidRegex.test(uuid)) {
    throw new Error("UUID inválido")
  }
  
  return uuid.toLowerCase()
}

/**
 * Remove SQL injection patterns
 */
export function sanitizeSql(input: string): string {
  if (typeof input !== "string") return ""
  
  // Lista de padrões perigosos
  const dangerousPatterns = [
    /(\bSELECT\b|\bINSERT\b|\bUPDATE\b|\bDELETE\b|\bDROP\b|\bCREATE\b|\bALTER\b)/gi,
    /(\bUNION\b|\bJOIN\b)/gi,
    /(--|\/\*|\*\/|;)/g,
    /(\bOR\b|\bAND\b)\s+[\d\w]+=[\d\w]+/gi,
  ]
  
  let sanitized = input
  dangerousPatterns.forEach(pattern => {
    sanitized = sanitized.replace(pattern, "")
  })
  
  return sanitized.trim()
}

/**
 * Sanitiza objeto completo (recursivo)
 */
export function sanitizeObject(obj: any): any {
  if (obj === null || obj === undefined) return obj
  
  if (typeof obj === "string") {
    return sanitizeString(obj)
  }
  
  if (typeof obj === "number") {
    return sanitizeNumber(obj)
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item))
  }
  
  if (typeof obj === "object") {
    const sanitized: any = {}
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        sanitized[key] = sanitizeObject(obj[key])
      }
    }
    return sanitized
  }
  
  return obj
}

/**
 * Previne path traversal
 */
export function sanitizePath(path: string): string {
  if (typeof path !== "string") return ""
  
  return path
    .replace(/\.\./g, "") // Remove ..
    .replace(/[\/\\]{2,}/g, "/") // Remove múltiplas barras
    .replace(/^[\/\\]/, "") // Remove barra inicial
}

/**
 * Lista de palavras proibidas (exemplo)
 */
const FORBIDDEN_WORDS = [
  "drop table",
  "delete from",
  "<script",
  "javascript:",
  "onerror=",
  "onload=",
]

/**
 * Verifica se contém palavras proibidas
 */
export function containsForbiddenWords(input: string): boolean {
  if (typeof input !== "string") return false
  
  const lowerInput = input.toLowerCase()
  return FORBIDDEN_WORDS.some(word => lowerInput.includes(word))
}

/**
 * Valida tamanho do payload
 */
export function validatePayloadSize(data: any, maxSizeKb: number = 100): void {
  const size = new Blob([JSON.stringify(data)]).size / 1024
  
  if (size > maxSizeKb) {
    throw new Error(`Payload muito grande. Máximo: ${maxSizeKb}KB, Recebido: ${size.toFixed(2)}KB`)
  }
}

