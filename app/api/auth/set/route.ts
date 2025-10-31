import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function POST(req: NextRequest) {
  try {
    const { access_token, refresh_token } = await req.json()

    if (!access_token || !refresh_token) {
      return NextResponse.json({ error: "Missing tokens" }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: "Supabase env not configured" },
        { status: 500 },
      )
    }

    const res = NextResponse.json({ ok: true })

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options?: Parameters<typeof res.cookies.set>[2]) {
          res.cookies.set(name, value, options)
        },
        remove(name: string, options?: Parameters<typeof res.cookies.set>[2]) {
          res.cookies.set(name, "", { ...options, maxAge: 0 })
        },
      },
    })

    await supabase.auth.setSession({ access_token, refresh_token })

    return res
  } catch (error) {
    return NextResponse.json({ error: "Failed to set session" }, { status: 500 })
  }
}


