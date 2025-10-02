import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(request: Request) {
  try {
    const { userId } = await request.json()

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({
        success: false,
        error: "Service role key não configurada",
      })
    }

    // Criar cliente admin
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Buscar usuário na tabela users
    const { data: dbUser, error: dbError } = await supabaseAdmin.from("users").select("*").eq("id", userId).single()

    if (dbError || !dbUser) {
      return NextResponse.json({
        success: false,
        error: "Usuário não encontrado na tabela users",
      })
    }

    // Criar usuário no Auth com a mesma senha padrão
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: dbUser.email,
      password: "Admin@123456",
      email_confirm: true,
      user_metadata: {
        full_name: dbUser.full_name,
        role: dbUser.role,
      },
    })

    if (authError) {
      return NextResponse.json({
        success: false,
        error: authError.message,
      })
    }

    // Atualizar o ID na tabela users se necessário
    if (authUser.user && authUser.user.id !== userId) {
      await supabaseAdmin.from("users").update({ id: authUser.user.id }).eq("id", userId)
    }

    return NextResponse.json({
      success: true,
      message: "Usuário sincronizado com sucesso",
      authUser: {
        id: authUser.user?.id,
        email: authUser.user?.email,
      },
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    })
  }
}
