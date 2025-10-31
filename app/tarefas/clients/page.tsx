import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, Users, UserCheck, AlertCircle, DollarSign } from "lucide-react"
import { ClientsTable } from "@/components/clients-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function ClientsPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect("/auth/login")
  }

  const { data: clients, error: clientsError } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false })

  if (clientsError) {
    console.error("[v0] ClientsPage - Error fetching clients:", clientsError)
  }

  const { data: contracts } = await supabase.from("client_contracts").select("*")

  const { data: payments } = await supabase
    .from("client_payments")
    .select("*")
    .gte("due_date", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString())
    .lte("due_date", new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString())

  const totalClients = clients?.length || 0
  const activeClients = clients?.filter((c) => c.status === "ativo").length || 0
  const defaultingClients = clients?.filter((c) => c.status === "inadimplente").length || 0

  const monthlyRevenue =
    payments
      ?.filter((p) => p.status === "pago")
      .reduce((sum, p) => sum + (p.amount || 0), 0)
      .toFixed(2) || "0.00"

  const activeContracts = contracts?.filter((c) => c.status === "ativo") || []
  const pendingPayments = payments?.filter((p) => p.status === "pendente") || []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Clientes</h1>
          <p className="text-muted-foreground">Gerencie seus clientes, contratos e mensalidades</p>
        </div>
        <Link href="/tarefas/clients/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Cliente
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalClients}</div>
            <p className="text-xs text-muted-foreground">Cadastrados no sistema</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeClients}</div>
            <p className="text-xs text-muted-foreground">Com contratos ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inadimplentes</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{defaultingClients}</div>
            <p className="text-xs text-muted-foreground">Requerem atenção</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">R$ {monthlyRevenue}</div>
            <p className="text-xs text-muted-foreground">Recebido este mês</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="clients" className="space-y-4">
        <TabsList>
          <TabsTrigger value="clients">Clientes ({totalClients})</TabsTrigger>
          <TabsTrigger value="contracts">Contratos ({activeContracts.length})</TabsTrigger>
          <TabsTrigger value="payments">Mensalidades ({pendingPayments.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="clients" className="space-y-4">
          <ClientsTable clients={clients || []} />
        </TabsContent>

        <TabsContent value="contracts" className="space-y-4">
          <ContractsTable contracts={activeContracts} />
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <PaymentsTable payments={pendingPayments} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ContractsTable({ contracts }: { contracts: any[] }) {
  if (contracts.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-card">
        <p className="text-muted-foreground">Nenhum contrato ativo no momento.</p>
      </div>
    )
  }

  return (
    <div className="border rounded-lg bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Serviço</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Valor Mensal</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Início</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Vencimento</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((contract) => (
              <tr key={contract.id} className="border-t">
                <td className="px-4 py-3 text-foreground">{contract.service_name}</td>
                <td className="px-4 py-3 text-foreground">R$ {contract.monthly_value?.toFixed(2)}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(contract.start_date).toLocaleDateString("pt-BR")}
                </td>
                <td className="px-4 py-3 text-muted-foreground">Dia {contract.payment_day}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-600 border border-green-500/20">
                    {contract.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function PaymentsTable({ payments }: { payments: any[] }) {
  if (payments.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-card">
        <p className="text-muted-foreground">Nenhuma mensalidade pendente.</p>
      </div>
    )
  }

  return (
    <div className="border rounded-lg bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Vencimento</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Valor</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Pagamento</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-t">
                <td className="px-4 py-3 text-foreground">{new Date(payment.due_date).toLocaleDateString("pt-BR")}</td>
                <td className="px-4 py-3 text-foreground">R$ {payment.amount?.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      payment.status === "pago"
                        ? "bg-green-500/10 text-green-600 border border-green-500/20"
                        : payment.status === "atrasado"
                          ? "bg-red-500/10 text-red-600 border border-red-500/20"
                          : "bg-yellow-500/10 text-yellow-600 border border-yellow-500/20"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {payment.paid_at ? new Date(payment.paid_at).toLocaleDateString("pt-BR") : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
