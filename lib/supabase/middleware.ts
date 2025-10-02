import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("[v0] Missing Supabase environment variables. Please check your .env.local file.")

    // Allow access to setup page even without env vars
    if (request.nextUrl.pathname.startsWith("/tarefas/setup")) {
      return NextResponse.next()
    }

    // Redirect to a helpful error page
    const url = request.nextUrl.clone()
    url.pathname = "/tarefas/setup"
    return NextResponse.redirect(url)
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({
          request,
        })
        cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
      },
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect /tarefas routes - require authentication
  if (
    request.nextUrl.pathname.startsWith("/tarefas") &&
    !user &&
    !request.nextUrl.pathname.startsWith("/tarefas/login") &&
    !request.nextUrl.pathname.startsWith("/tarefas/setup")
  ) {
    const url = request.nextUrl.clone()
    url.pathname = "/tarefas/login"
    return NextResponse.redirect(url)
  }

  // Redirect authenticated users away from login page
  if (request.nextUrl.pathname.startsWith("/tarefas/login") && user) {
    const url = request.nextUrl.clone()
    url.pathname = "/tarefas"
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
