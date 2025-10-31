import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  if (id === "new") {
    redirect("/tarefas/clients/new")
  }

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/tarefas/auth/login")
  }

  // Fetch client details
  const { data: client, error: clientError } = await supabase
    .from("clients")
    .select(
      `
      *,
      created_by_profile:profiles!clients_created_by_fkey(full_name)
    `,
    )
    .eq("id", id)
    .single()

  if (clientError || !client) {
    notFound()
  }

  // Fetch client contracts
  const { data: contracts } = await supabase
    .from("client_contracts")
    .select("*")
    .eq("client_id", id)
    .order("created_at", { ascending: false })

  const statusColors = {
    ativo: "bg-green-500/10 text-green-500 border-green-500/20",
    inativo: "bg-gray-500/10 text-gray-500 border-gray-500/20",
    inadimplente: "bg-red-500/10 text-red-500 border-red-500/20",
  }

  const contractStatusColors = {
    ativo: "bg-green-500/10 text-green-500 border-green-500/20",
    cancelado: "bg-red-500/10 text-red-500 border-red-500/20",
    suspenso: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/tarefas/tarefas/clients">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{client.name}</h1>
            <p className="text-muted-foreground">Detalhes do cliente</p>
          </div>
        </div>
        <Link href={`/tarefas/clients/${id}/edit`}>
          <Button className="gap-2">
            <Edit className="h-4 w-4" />
            Editar
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge className={statusColors[client.status as keyof typeof statusColors]}>{client.status}</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tipo</p>
              <p className="text-foreground">
                {client.client_type === "pessoa_fisica" ? "Pessoa Física" : "Pessoa Jurídica"}
              </p>
            </div>
            {client.email && (
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-foreground">{client.email}</p>
              </div>
            )}
            {client.phone && (
              <div>
                <p className="text-sm text-muted-foreground">Telefone</p>
                <p className="text-foreground">{client.phone}</p>
              </div>
            )}
            {client.company && (
              <div>
                <p className="text-sm text-muted-foreground">Empresa</p>
                <p className="text-foreground">{client.company}</p>
              </div>
            )}
            {client.document && (
              <div>
                <p className="text-sm text-muted-foreground">CPF/CNPJ</p>
                <p className="text-foreground">{client.document}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Endereço</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {client.address && (
              <div>
                <p className="text-sm text-muted-foreground">Logradouro</p>
                <p className="text-foreground">{client.address}</p>
              </div>
            )}
            {client.city && (
              <div>
                <p className="text-sm text-muted-foreground">Cidade</p>
                <p className="text-foreground">{client.city}</p>
              </div>
            )}
            {client.state && (
              <div>
                <p className="text-sm text-muted-foreground">Estado</p>
                <p className="text-foreground">{client.state}</p>
              </div>
            )}
            {client.zip_code && (
              <div>
                <p className="text-sm text-muted-foreground">CEP</p>
                <p className="text-foreground">{client.zip_code}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {client.notes && (
        <Card>
          <CardHeader>
            <CardTitle>Observações</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground whitespace-pre-wrap">{client.notes}</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Contratos e Serviços</CardTitle>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Contrato
          </Button>
        </CardHeader>
        <CardContent>
          {contracts && contracts.length > 0 ? (
            <div className="space-y-4">
              {contracts.map((contract) => (
                <div key={contract.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{contract.service_name}</p>
                    {contract.service_description && (
                      <p className="text-sm text-muted-foreground">{contract.service_description}</p>
                    )}
                    <div className="flex items-center gap-2">
                      <Badge className={contractStatusColors[contract.status as keyof typeof contractStatusColors]}>
                        {contract.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">Vencimento: dia {contract.payment_day}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-foreground">R$ {Number(contract.monthly_value).toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">por mês</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">Nenhum contrato cadastrado</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
