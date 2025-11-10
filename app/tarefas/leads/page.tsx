import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { ArrowUpRight, DollarSign, Mail, Phone, GitBranch, Plus, Sparkles, Users } from "lucide-react"
import { cn } from "@/lib/utils"

export const dynamic = 'force-dynamic'

const statusColors = {
  new: "bg-blue-200 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  contacted: "bg-purple-200 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  qualified: "bg-yellow-200 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  proposal: "bg-orange-200 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
  negotiation: "bg-indigo-200 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300",
  won: "bg-green-200 text-green-700 dark:bg-green-900 dark:text-green-300",
  lost: "bg-red-200 text-red-700 dark:bg-red-900 dark:text-red-300",
}

const statusLabels = {
  new: "Novo",
  contacted: "Contatado",
  qualified: "Qualificado",
  proposal: "Proposta",
  negotiation: "Negociação",
  won: "Ganho",
  lost: "Perdido",
}

export default async function LeadsPage() {
  const supabase = await createClient()

  let leads: any[] | null = null
  try {
    const { data, error } = await supabase
      .from("leads")
      .select(
        `
        *,
        assigned_to_profile:profiles!leads_assigned_to_fkey(id, full_name),
        created_by_profile:profiles!leads_created_by_fkey(id, full_name)
      `,
      )
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[LeadsPage] Error fetching leads:", error)
    }
    leads = data || []
  } catch (err) {
    console.error("[LeadsPage] Exception fetching leads:", err)
    leads = []
  }

  // Calculate stats
  const totalValue = leads?.reduce((sum, lead) => sum + (Number(lead.value) || 0), 0) || 0
  const wonLeads = leads?.filter((lead) => lead.status === "won") || []
  const wonValue = wonLeads.reduce((sum, lead) => sum + (Number(lead.value) || 0), 0)

  const brandGradient = "from-primary via-[oklch(0.6_0.19_240)] to-accent"

  const leadStats = [
    {
      title: "Total de Leads",
      value: leads?.length || 0,
      description: "Leads em todas as etapas do funil.",
      icon: Users,
      accent: brandGradient,
    },
    {
      title: "Valor Total",
      value: `R$ ${totalValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
      description: "Somatório das oportunidades cadastradas.",
      icon: DollarSign,
      accent: brandGradient,
    },
    {
      title: "Leads Ganhos",
      value: `R$ ${wonValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
      description: "Receita potencial convertida em clientes.",
      icon: GitBranch,
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
              Pipeline Comercial
            </Badge>
            <h1 className="text-3xl font-semibold tracking-tight lg:text-4xl">
              Transforme conexão em relacionamento e relacionamento em vendas.
            </h1>
            <p className="max-w-2xl text-sm text-white/80 lg:text-base">
              Automatize follow-ups, visualize gargalos do funil e acompanhe o valor potencial de cada oportunidade com
              dados centralizados.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-white/80">
              <div className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2">
                <Sparkles className="h-4 w-4" />
                {leads?.length || 0} oportunidades monitoradas
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2">
                <DollarSign className="h-4 w-4" />
                Potencial: R$ {totalValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-6 text-sm text-white/80 backdrop-blur-lg lg:max-w-sm">
            <p className="text-base font-semibold text-white">Próximo passo</p>
            <p>
              Revisite leads qualificados que ainda não receberam proposta e ajuste a cadência de contato.
            </p>
            <Link
              href="/tarefas/leads/new"
              className="inline-flex items-center gap-2 text-sm font-medium text-white transition hover:opacity-80"
            >
              Adicionar novo lead
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-foreground">Panorama do funil</h2>
          <p className="text-sm text-muted-foreground">
            Analise os pontos fortes e gargalos do ciclo comercial.
          </p>
        </div>
        <Link href="/tarefas/leads/new">
          <Button className="shadow-lg">
            <Plus className="mr-2 h-4 w-4" />
            Novo lead
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {leadStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="border border-border/60 bg-card/95 shadow-sm">
              <CardContent className="flex flex-col gap-3 px-5 py-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-semibold text-card-foreground">{stat.value}</p>
                  </div>
                  <div className={cn("rounded-2xl bg-gradient-to-br p-2 text-white shadow-lg", stat.accent)}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {leads?.map((lead) => (
          <Link key={lead.id} href={`/tarefas/leads/${lead.id}`}>
            <Card className="group relative h-full overflow-hidden border border-border/60 bg-card/95 shadow-sm transition hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-[oklch(0.6_0.19_240)]/10 to-accent/10 opacity-0 transition group-hover:opacity-100" />
              <CardHeader className="relative">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border border-border/80 bg-muted">
                      <AvatarFallback className="bg-gradient-to-br from-slate-200 to-slate-300 text-sm font-semibold text-slate-700">
                        {lead.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base text-card-foreground">{lead.name}</CardTitle>
                      {lead.company && <p className="text-xs text-muted-foreground uppercase">{lead.company}</p>}
                    </div>
                  </div>
                  <Badge className={statusColors[lead.status as keyof typeof statusColors]}>
                    {statusLabels[lead.status as keyof typeof statusLabels]}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="relative space-y-3 text-sm">
                {lead.email && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{lead.email}</span>
                  </div>
                )}
                {lead.phone && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{lead.phone}</span>
                  </div>
                )}
                {lead.value && (
                  <div className="flex items-center gap-2 text-foreground font-semibold">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <span>R$ {Number(lead.value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                  </div>
                )}
                {lead.assigned_to_profile && (
                  <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-card/80 p-3 text-xs text-muted-foreground">
                    <Avatar className="h-6 w-6 border border-border/80">
                      <AvatarFallback className="text-[10px] bg-muted">
                        {lead.assigned_to_profile.full_name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{lead.assigned_to_profile.full_name}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}

        {(!leads || leads.length === 0) && (
          <div className="col-span-full">
            <Card className="border border-dashed border-primary/40 bg-card/90">
              <CardContent className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                <p className="max-w-md text-sm text-muted-foreground">
                  Nenhum lead cadastrado. Cadastre novos contatos e acompanhe a jornada até a conversão.
                </p>
                <Link href="/tarefas/leads/new">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Criar primeiro lead
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
