import { NextRequest, NextResponse } from "next/server"

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

// Armazenamento em memória (para produção, use Redis)
const rateLimitStore: RateLimitStore = {}

// Limpar entradas antigas a cada 5 minutos
setInterval(() => {
  const now = Date.now()
  Object.keys(rateLimitStore).forEach((key) => {
    if (rateLimitStore[key].resetTime < now) {
      delete rateLimitStore[key]
    }
  })
}, 5 * 60 * 1000)

interface RateLimitConfig {
  windowMs: number // Janela de tempo em ms
  maxRequests: number // Máximo de requisições
}

/**
 * Rate limiter simples baseado em IP
 * Para produção, considere usar Redis ou um serviço como Upstash
 */
export function rateLimit(config: RateLimitConfig = { windowMs: 60000, maxRequests: 60 }) {
  return async (request: NextRequest): Promise<NextResponse | null> => {
    // Pegar IP do usuário
    const ip = 
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown"

    const key = `rate_limit:${ip}`
    const now = Date.now()

    // Verificar se existe entrada para este IP
    if (!rateLimitStore[key] || rateLimitStore[key].resetTime < now) {
      // Criar nova entrada
      rateLimitStore[key] = {
        count: 1,
        resetTime: now + config.windowMs,
      }
      return null // Permitir requisição
    }

    // Incrementar contador
    rateLimitStore[key].count++

    // Verificar limite
    if (rateLimitStore[key].count > config.maxRequests) {
      const resetIn = Math.ceil((rateLimitStore[key].resetTime - now) / 1000)
      
      return NextResponse.json(
        {
          error: "Muitas requisições. Tente novamente mais tarde.",
          retryAfter: resetIn,
        },
        {
          status: 429, // Too Many Requests
          headers: {
            "Retry-After": resetIn.toString(),
            "X-RateLimit-Limit": config.maxRequests.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": new Date(rateLimitStore[key].resetTime).toISOString(),
          },
        }
      )
    }

    // Requisição permitida, adicionar headers informativos
    const remaining = config.maxRequests - rateLimitStore[key].count
    request.headers.set("X-RateLimit-Limit", config.maxRequests.toString())
    request.headers.set("X-RateLimit-Remaining", remaining.toString())
    request.headers.set("X-RateLimit-Reset", new Date(rateLimitStore[key].resetTime).toISOString())

    return null // Permitir requisição
  }
}

/**
 * Rate limiter por usuário autenticado
 */
export function rateLimitByUser(userId: string, config: RateLimitConfig = { windowMs: 60000, maxRequests: 100 }) {
  const key = `rate_limit_user:${userId}`
  const now = Date.now()

  if (!rateLimitStore[key] || rateLimitStore[key].resetTime < now) {
    rateLimitStore[key] = {
      count: 1,
      resetTime: now + config.windowMs,
    }
    return null
  }

  rateLimitStore[key].count++

  if (rateLimitStore[key].count > config.maxRequests) {
    const resetIn = Math.ceil((rateLimitStore[key].resetTime - now) / 1000)
    return NextResponse.json(
      {
        error: "Limite de requisições excedido",
        retryAfter: resetIn,
      },
      { 
        status: 429,
        headers: {
          "Retry-After": resetIn.toString(),
        }
      }
    )
  }

  return null
}

/**
 * Rate limiter especial para operações sensíveis (login, signup)
 */
export const strictRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  maxRequests: 5, // 5 tentativas
})

/**
 * Rate limiter padrão para APIs
 */
export const apiRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  maxRequests: 60, // 60 requisições por minuto
})

/**
 * Rate limiter mais permissivo para leitura
 */
export const readRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  maxRequests: 120, // 120 requisições por minuto
})

