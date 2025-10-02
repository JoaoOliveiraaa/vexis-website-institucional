import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({
        success: false,
        error: "Service role key não configurada",
        message: "SUPABASE_SERVICE_ROLE_KEY não encontrada no .env.local",
      })
    }

    // Criar cliente admin com service role
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Listar usuários do Auth
    const { data: authUsers, error: authError } = await supabaseAdmin.auth.admin.listUsers()

    if (authError) {
      return NextResponse.json({
        success: false,
        error: authError.message,
        authUsers: [],
      })
    }

    return NextResponse.json({
      success: true,
      count: authUsers.users.length,
      authUsers: authUsers.users.map((u) => ({
        id: u.id,
        email: u.email,
        created_at: u.created_at,
        confirmed_at: u.confirmed_at,
      })),
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      authUsers: [],
    })
  }
}
