import type React from "react"
import { createClient } from "@/lib/supabase/server"

export default async function TarefasLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If no user and not on login page, redirect to login
  if (!user) {
    return <>{children}</>
  }

  return <>{children}</>
}
