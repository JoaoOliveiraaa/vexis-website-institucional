import { NextResponse } from "next/server"

/**
 * Adiciona headers de segurança à resposta
 */
export function addSecurityHeaders(response: NextResponse): NextResponse {
  // Previne clickjacking
  response.headers.set("X-Frame-Options", "DENY")
  
  // Previne MIME type sniffing
  response.headers.set("X-Content-Type-Options", "nosniff")
  
  // Proteção XSS para navegadores antigos
  response.headers.set("X-XSS-Protection", "1; mode=block")
  
  // Controla referrer
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  
  // Permissions Policy (substitui Feature-Policy)
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()"
  )
  
  // Content Security Policy (CSP)
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ")
  
  response.headers.set("Content-Security-Policy", csp)
  
  // HSTS (HTTP Strict Transport Security) - apenas em produção com HTTPS
  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload"
    )
  }
  
  return response
}

/**
 * Headers específicos para API
 */
export function addApiHeaders(response: NextResponse): NextResponse {
  // CORS headers (ajuste conforme necessário)
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")
  
  // Cache control
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, private")
  response.headers.set("Pragma", "no-cache")
  response.headers.set("Expires", "0")
  
  return response
}

/**
 * Remove headers sensíveis
 */
export function removeSensitiveHeaders(response: NextResponse): NextResponse {
  response.headers.delete("X-Powered-By")
  response.headers.delete("Server")
  
  return response
}

/**
 * Aplica todos os headers de segurança
 */
export function applySecurityHeaders(response: NextResponse, isApi: boolean = false): NextResponse {
  let secureResponse = addSecurityHeaders(response)
  secureResponse = removeSensitiveHeaders(secureResponse)
  
  if (isApi) {
    secureResponse = addApiHeaders(secureResponse)
  }
  
  return secureResponse
}

