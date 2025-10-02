import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createServiceClient } from "@/lib/supabase/service"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const service = createServiceClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
    }

    // Check if user is admin
    const { data: userData } = await service.from("users").select("role").eq("id", user.id).single()

    if (!userData || userData.role !== "admin") {
      return NextResponse.json({ error: "Sem permissão" }, { status: 403 })
    }

    const { email, password, fullName, role } = await request.json()

    // Create auth user using admin API
    const { data: newUser, error: authError } = await service.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    if (!newUser.user) {
      return NextResponse.json({ error: "Erro ao criar usuário" }, { status: 500 })
    }

    // Create user in users table
    const { error: userError } = await service.from("users").insert({
      id: newUser.user.id,
      email,
      full_name: fullName,
      role,
    })

    if (userError) {
      // Rollback auth user
      await service.auth.admin.deleteUser(newUser.user.id)
      return NextResponse.json({ error: userError.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, user: newUser.user })
  } catch (error) {
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
