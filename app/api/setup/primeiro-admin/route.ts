import { createServiceClient } from "@/lib/supabase/service"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password, fullName } = await request.json()

    console.log("[v0] Criando primeiro admin via service role...")
    console.log("[v0] Email:", email)

    // Criar cliente Supabase (service role)
    const supabase = createServiceClient()

    // Primeiro, verificar se já existe algum usuário admin
    const { data: existingUsers, error: checkError } = await supabase
      .from("users")
      .select("id")
      .eq("role", "admin")
      .limit(1)

    if (checkError) {
      console.error("[v0] Erro ao verificar usuários existentes:", checkError)
      // Continuar mesmo com erro, pois a tabela pode não existir ainda
    }

    if (existingUsers && existingUsers.length > 0) {
      return NextResponse.json(
        { success: false, error: "Já existe um usuário admin. Use a página de login." },
        { status: 400 },
      )
    }

    // Criar usuário via Admin API (requer service role key)
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
      },
    })

    if (authError) {
      console.error("[v0] Erro ao criar auth:", authError)
      return NextResponse.json({ success: false, error: authError.message }, { status: 400 })
    }

    if (!authData.user) {
      return NextResponse.json({ success: false, error: "Usuário não foi criado" }, { status: 400 })
    }

    console.log("[v0] Auth criado, ID:", authData.user.id)

    // Inserir na tabela users como admin (service client ignora RLS)
    const { error: dbError } = await supabase.from("users").insert({
      id: authData.user.id,
      email: email,
      full_name: fullName,
      role: "admin",
    })

    if (dbError) {
      console.error("[v0] Erro ao inserir na tabela users:", dbError)
      return NextResponse.json({ success: false, error: dbError.message }, { status: 400 })
    }

    console.log("[v0] Primeiro admin criado com sucesso!")

    return NextResponse.json({
      success: true,
      message: "Primeiro admin criado com sucesso!",
      userId: authData.user.id,
    })
  } catch (error) {
    console.error("[v0] Erro geral:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Erro desconhecido" },
      { status: 500 },
    )
  }
}
