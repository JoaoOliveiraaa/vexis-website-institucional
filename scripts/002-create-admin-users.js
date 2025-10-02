const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')
const { createClient } = require("@supabase/supabase-js")

function loadEnv() {
  const candidates = ['.env.local', '.env']
  for (const fileName of candidates) {
    const fullPath = path.resolve(process.cwd(), fileName)
    if (fs.existsSync(fullPath)) {
      dotenv.config({ path: fullPath })
      console.log(`🔧 Variáveis carregadas de ${fileName}`)
      return
    }
  }
  dotenv.config()
  console.log('🔧 Variáveis carregadas com dotenv (padrão)')
}

loadEnv()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  const missing = []
  if (!supabaseUrl) missing.push('NEXT_PUBLIC_SUPABASE_URL')
  if (!supabaseServiceKey) missing.push('SUPABASE_SERVICE_ROLE_KEY')
  console.error(`❌ Variáveis de ambiente ausentes: ${missing.join(', ')}`)
  console.error("Coloque-as no arquivo .env.local ou .env na raiz do projeto.")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Configure os 3 usuários admin aqui
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
    full_name: "Administrador 3",
  },
]

async function createAdminUsers() {
  console.log("🚀 Iniciando criação de usuários admin...\n")

  for (const user of adminUsers) {
    try {
      console.log(`📝 Criando usuário: ${user.email}`)

      // Criar usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true,
      })

      if (authError) {
        console.error(`❌ Erro ao criar usuário ${user.email}:`, authError.message)
        continue
      }

      console.log(`✅ Usuário criado no Auth: ${authData.user.id}`)

      // Criar registro na tabela users
      const { error: dbError } = await supabase.from("users").insert({
        id: authData.user.id,
        email: user.email,
        full_name: user.full_name,
        role: "admin",
      })

      if (dbError) {
        console.error(`❌ Erro ao criar registro na tabela users:`, dbError.message)
        continue
      }

      console.log(`✅ Usuário ${user.email} criado com sucesso!`)
      console.log(`   Email: ${user.email}`)
      console.log(`   Senha: ${user.password}`)
      console.log(`   Role: admin\n`)
    } catch (error) {
      console.error(`❌ Erro inesperado ao criar ${user.email}:`, error)
    }
  }

  console.log("✨ Processo concluído!")
  console.log("\n📋 Resumo das credenciais criadas:")
  console.log("─────────────────────────────────────")
  adminUsers.forEach((user, index) => {
    console.log(`\nAdmin ${index + 1}:`)
    console.log(`  Email: ${user.email}`)
    console.log(`  Senha: ${user.password}`)
  })
  console.log("\n⚠️  IMPORTANTE: Altere as senhas após o primeiro login!")
}

createAdminUsers()
