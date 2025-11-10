import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ClientsTable } from "@/components/clients-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertCircle,
  ArrowUpRight,
  DollarSign,
  HandCoins,
  HeartHandshake,
  Plus,
  ShieldCheck,
  Users,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export const dynamic = 'force-dynamic'

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

  const brandGradient = "from-primary via-[oklch(0.6_0.19_240)] to-accent"

  const cards = [
    {
      title: "Total de clientes",
      value: totalClients,
      description: "Contas cadastradas e mapeadas.",
      icon: Users,
      accent: brandGradient,
    },
    {
      title: "Clientes ativos",
      value: activeClients,
      description: "Contratos vigentes em execução.",
      icon: ShieldCheck,
      accent: brandGradient,
    },
    {
      title: "Inadimplentes",
      value: defaultingClients,
      description: "Foco de follow-up financeiro.",
      icon: AlertCircle,
      accent: brandGradient,
    },
    {
      title: "Receita mensal",
      value: `R$ ${monthlyRevenue}`,
      description: "Pagamentos confirmados no período.",
      icon: HandCoins,
      accent: brandGradient,
    },
  ]

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/95 via-[oklch(0.6_0.19_240)]/90 to-accent/95 px-8 py-10 text-white shadow-lg">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_60%)] opacity-70" />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <Badge variant="outline" className="border-white/30 bg-white/10 text-white backdrop-blur">
              Saúde da carteira
            </Badge>
            <h1 className="text-3xl font-semibold tracking-tight lg:text-4xl">
              Cultive relacionamentos sólidos e garanta o ciclo de receita previsível.
            </h1>
            <p className="max-w-2xl text-sm text-white/80 lg:text-base">
              Visão centralizada de contratos, tickets e faturamento. Antecipe riscos, personalize o atendimento e
              impulsione a retenção.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-white/80">
              <div className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2">
                <HeartHandshake className="h-4 w-4" />
                {activeClients} contas em acompanhamento
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2">
                <DollarSign className="h-4 w-4" />
                R$ {monthlyRevenue} recebidos no mês
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-6 text-sm text-white/80 backdrop-blur-lg lg:max-w-sm">
            <p className="text-base font-semibold text-white">Ação recomendada</p>
            <p>
              Reveja os contratos com pagamento pendente e programe um contato personalizado com cada responsável.
            </p>
            <Link
              href="/tarefas/clients/new"
              className="inline-flex items-center gap-2 text-sm font-medium text-white transition hover:opacity-80"
            >
              Adicionar novo cliente
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-foreground">Panorama da base</h2>
          <p className="text-sm text-muted-foreground">
            Confira indicadores-chave para um relacionamento de longo prazo.
          </p>
        </div>
        <Link href="/tarefas/clients/new">
          <Button className="gap-2 shadow-lg">
            <Plus className="h-4 w-4" />
            Novo cliente
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Card key={card.title} className="border border-border/60 bg-card/95 shadow-sm">
              <CardContent className="flex flex-col gap-3 px-5 py-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {card.title}
                    </p>
                    <p className="text-2xl font-semibold text-card-foreground">{card.value}</p>
                  </div>
                  <div className={cn("rounded-2xl bg-gradient-to-br p-2 text-white shadow-lg", card.accent)}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Tabs defaultValue="clients" className="space-y-5">
        <TabsList className="inline-flex gap-2 rounded-full border border-border/60 bg-card/70 p-1 text-sm">
          <TabsTrigger value="clients" className="rounded-full px-4 py-2">
            Clientes ({totalClients})
          </TabsTrigger>
          <TabsTrigger value="contracts" className="rounded-full px-4 py-2">
            Contratos ({activeContracts.length})
          </TabsTrigger>
          <TabsTrigger value="payments" className="rounded-full px-4 py-2">
            Mensalidades ({pendingPayments.length})
          </TabsTrigger>
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
      <Card className="border border-dashed border-primary/40 bg-card/90">
        <CardContent className="py-10 text-center text-sm text-muted-foreground">
          Nenhum contrato ativo no momento.
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden border border-border/60 bg-card/95 shadow-sm">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-1">
            <thead className="bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left">Serviço</th>
                <th className="px-4 py-3 text-left">Valor mensal</th>
                <th className="px-4 py-3 text-left">Início</th>
                <th className="px-4 py-3 text-left">Vencimento</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract) => (
                <tr key={contract.id} className="rounded-2xl border border-border/60 bg-card/90 text-sm">
                  <td className="px-4 py-3 font-medium text-card-foreground">{contract.service_name}</td>
                  <td className="px-4 py-3 text-card-foreground">
                    R$ {contract.monthly_value?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(contract.start_date).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">Dia {contract.payment_day}</td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="border-emerald-500/40 bg-emerald-500/10 text-emerald-500">
                      {contract.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

function PaymentsTable({ payments }: { payments: any[] }) {
  if (payments.length === 0) {
    return (
      <Card className="border border-dashed border-primary/40 bg-card/90">
        <CardContent className="py-10 text-center text-sm text-muted-foreground">
          Nenhuma mensalidade pendente.
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden border border-border/60 bg-card/95 shadow-sm">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-1">
            <thead className="bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left">Vencimento</th>
                <th className="px-4 py-3 text-left">Valor</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Pagamento</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="rounded-2xl border border-border/60 bg-card/90 text-sm">
                  <td className="px-4 py-3 text-card-foreground">
                    {new Date(payment.due_date).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-4 py-3 text-card-foreground">
                    R$ {payment.amount?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant="outline"
                      className={cn(
                        "border px-2 py-1",
                        payment.status === "pago"
                          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-500"
                          : payment.status === "atrasado"
                            ? "border-red-500/40 bg-red-500/10 text-red-500"
                            : "border-amber-500/40 bg-amber-500/10 text-amber-500",
                      )}
                    >
                      {payment.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {payment.paid_at ? new Date(payment.paid_at).toLocaleDateString("pt-BR") : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

