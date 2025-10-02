import { NextResponse } from "next/server"

export async function GET() {
  const requiredEnvVars = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  }

  const missing = Object.entries(requiredEnvVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key)

  return NextResponse.json({
    success: missing.length === 0,
    missing,
    present: Object.keys(requiredEnvVars).filter((key) => requiredEnvVars[key as keyof typeof requiredEnvVars]),
  })
}
