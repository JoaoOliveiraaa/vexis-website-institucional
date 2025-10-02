# Configuração Local - Sistema de Tarefas Vexis

## Passo 1: Obter as Variáveis de Ambiente

Você tem duas opções para obter as variáveis de ambiente:

### Opção A: Usar Vercel CLI (Recomendado - Mais Rápido)

\`\`\`bash
# Instale o Vercel CLI (se ainda não tiver)
npm i -g vercel

# Faça login
vercel login

# Link o projeto
vercel link

# Baixe as variáveis de ambiente
vercel env pull .env.local
\`\`\`

### Opção B: Copiar Manualmente do Vercel

1. Acesse seu projeto no Vercel: https://vercel.com
2. Vá em **Settings** → **Environment Variables**
3. Copie os valores das seguintes variáveis:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `DATABASE_URL`

4. Crie o arquivo `.env.local` na raiz do projeto e cole os valores

## Passo 2: Instalar Dependências e Iniciar

\`\`\`bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev
\`\`\`

## Passo 3: Configurar o Banco de Dados

Você tem **3 opções** para criar o banco de dados e os usuários admin:

### 🎯 Opção 1: Primeiro Acesso (RECOMENDADO - Funciona Sempre)

Esta opção **não precisa** da `SUPABASE_SERVICE_ROLE_KEY` e funciona em qualquer ambiente:

1. Acesse: http://localhost:3000/tarefas/primeiro-acesso
2. Preencha os dados do primeiro administrador
3. Clique em "Criar Primeiro Admin"
4. Faça login com as credenciais criadas
5. Use o painel admin para criar outros usuários

**Vantagens:**
- Não precisa de service role key
- Funciona em desenvolvimento e produção
- Você escolhe as credenciais
- Mais seguro

### 🔧 Opção 2: Setup Automático (Requer Service Role Key)

Se você tem a `SUPABASE_SERVICE_ROLE_KEY` configurada:

1. Acesse: http://localhost:3000/tarefas/setup
2. Clique em "Executar Setup"
3. Aguarde a conclusão
4. Faça login com uma das credenciais padrão:
   - **Email:** admin1@vexis.com | **Senha:** Admin@123456
   - **Email:** admin2@vexis.com | **Senha:** Admin@123456
   - **Email:** admin3@vexis.com | **Senha:** Admin@123456

### 📝 Opção 3: Script Manual

Execute o script SQL diretamente:

\`\`\`bash
# Execute o script de criação do banco
node scripts/001-create-schema.sql

# Depois use a Opção 1 (Primeiro Acesso) para criar o admin
\`\`\`

## Passo 4: Fazer Login

Acesse: http://localhost:3000/tarefas/login

Use as credenciais que você criou na Opção 1, ou as credenciais padrão da Opção 2.

## Comandos Úteis

\`\`\`bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Rodar produção localmente
npm start

# Verificar status do sistema
# Acesse: http://localhost:3000/tarefas/diagnostico
\`\`\`

## Troubleshooting

### ❌ Erro: "Your project's URL and Key are required"

**Solução:**
- Verifique se o arquivo `.env.local` existe na raiz do projeto
- Confirme que as variáveis `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` estão preenchidas
- Reinicie o servidor após adicionar as variáveis: `npm run dev`

### ❌ Erro: "Email ou senha incorretos" ao fazer login

**Solução:**
1. Acesse http://localhost:3000/tarefas/diagnostico para verificar o status
2. Se não houver usuários criados, use a **Opção 1 (Primeiro Acesso)**
3. Acesse http://localhost:3000/tarefas/primeiro-acesso
4. Crie o primeiro admin
5. Tente fazer login novamente

### ❌ Erro: "fetch failed" ao executar o setup

**Solução:**
- Este erro acontece quando a `SUPABASE_SERVICE_ROLE_KEY` não está configurada ou está incorreta
- **Use a Opção 1 (Primeiro Acesso)** que não precisa desta chave
- Ou verifique se a service role key está correta no `.env.local`

### ❌ Tabelas não existem no banco de dados

**Solução:**
1. Acesse http://localhost:3000/tarefas/setup
2. Clique em "Executar Setup" (isso cria as tabelas)
3. Depois use http://localhost:3000/tarefas/primeiro-acesso para criar o admin

### 🔍 Verificar Status do Sistema

Acesse http://localhost:3000/tarefas/diagnostico para ver:
- Status das variáveis de ambiente
- Conexão com Supabase
- Usuários criados no sistema
- Tabelas do banco de dados

## Estrutura do Projeto

\`\`\`
/app
  /tarefas
    /login          → Página de login
    /setup          → Setup automático (precisa service role key)
    /primeiro-acesso → Criar primeiro admin (não precisa service role key)
    /diagnostico    → Verificar status do sistema
    /admin
      /usuarios     → Gerenciar usuários (apenas admin)
    /tasks          → Gerenciar tarefas
    /leads          → Gerenciar leads
/scripts
  001-create-schema.sql → Script SQL para criar tabelas
  002-create-admin-users.js → Script para criar admins
\`\`\`

## Próximos Passos

Após fazer login como admin, você pode:

1. **Criar novos usuários**: Acesse `/tarefas/admin/usuarios`
2. **Gerenciar tarefas**: Acesse `/tarefas/tasks`
3. **Gerenciar leads**: Acesse `/tarefas/leads`
4. **Alterar sua senha**: (funcionalidade a ser implementada)

## Segurança

⚠️ **IMPORTANTE:**
- Altere as senhas padrão imediatamente após o primeiro login
- Nunca compartilhe a `SUPABASE_SERVICE_ROLE_KEY`
- Use senhas fortes para todos os usuários
- O arquivo `.env.local` está no `.gitignore` e não deve ser commitado
