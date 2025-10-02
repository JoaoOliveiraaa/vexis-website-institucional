import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Tentar fazer uma query simples
    const { data, error } = await supabase.from("users").select("count").limit(1)

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        hint: "A tabela 'users' pode não existir. Execute o setup primeiro.",
      })
    }

    return NextResponse.json({
      success: true,
      message: "Conexão estabelecida com sucesso",
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    })
  }
}
