import "server-only"
import { createServerClient } from "@supabase/ssr"
import type { SupabaseClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

export function createClient(): SupabaseClient {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Supabase não configurado: defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY",
    )
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      async get(name: string) {
        const store = await cookies()
        return store.get(name)?.value
      },
      async set(name: string, value: string, options?: Parameters<Awaited<ReturnType<typeof cookies>>["set"]>[2]) {
        const store = await cookies()
        store.set(name, value, options)
      },
      async remove(name: string, options?: Parameters<Awaited<ReturnType<typeof cookies>>["set"]>[2]) {
        const store = await cookies()
        store.set(name, "", { ...options, maxAge: 0 })
      },
    },
  })
}


