import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Buscar usuários admin
    const { data: users, error } = await supabase.from("users").select("*").eq("role", "admin")

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        hint: "Execute o setup para criar os usuários admin",
      })
    }

    // Buscar usuários do Auth
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers()

    if (authError) {
      return NextResponse.json({
        success: false,
        error: authError.message,
      })
    }

    return NextResponse.json({
      success: users && users.length > 0,
      count: users?.length || 0,
      users: users?.map((u) => ({ id: u.id, email: u.email, full_name: u.full_name, role: u.role })),
      authUsersCount: authUsers.users.length,
      authUsers: authUsers.users.map((u) => ({ id: u.id, email: u.email })),
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    })
  }
}
