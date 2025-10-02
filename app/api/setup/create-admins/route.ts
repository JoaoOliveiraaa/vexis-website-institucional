import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const adminUsers = [
  {
    email: "admin1@vexis.com",
    password: "Admin@123456",
    full_name: "Administrador 1",
  },
  {
    email: "admin2@vexis.com",
    password: "Admin@123456",
    full_name: "Administrador 2",
  },
  {
    email: "admin3@vexis.com",
    password: "Admin@123456",
  },
]

export async function POST() {
  try {
    console.log("[v0] Iniciando criação de usuários admin...")
    console.log("[v0] Supabase URL:", supabaseUrl)
    console.log("[v0] Service Key presente:", !!supabaseServiceKey)

    if (!supabaseServiceKey || supabaseServiceKey === "your_supabase_service_role_key_here") {
      console.error("[v0] SUPABASE_SERVICE_ROLE_KEY não está configurada corretamente")
      return NextResponse.json(
        {
          error: "SUPABASE_SERVICE_ROLE_KEY não configurada. Use /tarefas/primeiro-acesso para criar o primeiro admin.",
          results: adminUsers.map((u) => ({
            email: u.email,
            success: false,
            error: "Service role key não configurada",
          })),
        },
        { status: 400 },
      )
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    const results = []

    for (const user of adminUsers) {
      try {
        console.log(`[v0] Criando usuário: ${user.email}`)

        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email: user.email,
          password: user.password,
          email_confirm: true,
        })

        if (authError) {
          console.error(`[v0] Erro ao criar auth para ${user.email}:`, authError)
          results.push({ email: user.email, success: false, error: authError.message })
          continue
        }

        console.log(`[v0] Auth criado para ${user.email}, ID: ${authData.user.id}`)

        const { error: dbError } = await supabase.from("users").insert({
          id: authData.user.id,
          email: user.email,
          full_name: user.full_name,
          role: "admin",
        })

        if (dbError) {
          console.error(`[v0] Erro ao criar registro DB para ${user.email}:`, dbError)
          results.push({ email: user.email, success: false, error: dbError.message })
          continue
        }

        console.log(`[v0] Usuário ${user.email} criado com sucesso!`)
        results.push({ email: user.email, success: true, userId: authData.user.id })
      } catch (error) {
        console.error(`[v0] Erro inesperado ao criar ${user.email}:`, error)
        results.push({
          email: user.email,
          success: false,
          error: error instanceof Error ? error.message : "Erro desconhecido",
        })
      }
    }

    console.log("[v0] Resultados finais:", results)
    return NextResponse.json({ results })
  } catch (error) {
    console.error("[v0] Erro geral ao criar admins:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Erro ao criar usuários admin",
        hint: "Tente usar /tarefas/primeiro-acesso para criar o primeiro admin",
      },
      { status: 500 },
    )
  }
}
