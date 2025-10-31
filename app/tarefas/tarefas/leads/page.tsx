import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, Mail, Phone, DollarSign } from "lucide-react"
import Link from "next/link"

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

  const { data: leads } = await supabase
    .from("leads")
    .select(
      `
      *,
      assigned_to_profile:profiles!leads_assigned_to_fkey(id, full_name),
      created_by_profile:profiles!leads_created_by_fkey(id, full_name)
    `,
    )
    .order("created_at", { ascending: false })

  // Calculate stats
  const totalValue = leads?.reduce((sum, lead) => sum + (Number(lead.value) || 0), 0) || 0
  const wonLeads = leads?.filter((lead) => lead.status === "won") || []
  const wonValue = wonLeads.reduce((sum, lead) => sum + (Number(lead.value) || 0), 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leads</h1>
          <p className="text-muted-foreground">Gerencie seus leads e oportunidades</p>
        </div>
        <Link href="/tarefas/tarefas/leads/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Lead
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{leads?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Valor Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              R$ {totalValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Leads Ganhos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent-foreground">
              R$ {wonValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {leads?.map((lead) => (
          <Link key={lead.id} href={`/tarefas/leads/${lead.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-muted">
                        {lead.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{lead.name}</CardTitle>
                      {lead.company && <p className="text-sm text-muted-foreground">{lead.company}</p>}
                    </div>
                  </div>
                  <Badge className={statusColors[lead.status as keyof typeof statusColors]}>
                    {statusLabels[lead.status as keyof typeof statusLabels]}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {lead.email && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{lead.email}</span>
                  </div>
                )}
                {lead.phone && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{lead.phone}</span>
                  </div>
                )}
                {lead.value && (
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <DollarSign className="h-4 w-4" />
                    <span>R$ {Number(lead.value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                  </div>
                )}
                {lead.assigned_to_profile && (
                  <div className="flex items-center gap-2 pt-2 border-t">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs bg-muted">
                        {lead.assigned_to_profile.full_name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{lead.assigned_to_profile.full_name}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}

        {(!leads || leads.length === 0) && (
          <div className="col-span-full">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground mb-4">Nenhum lead encontrado</p>
                <Link href="/tarefas/tarefas/leads/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Primeiro Lead
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
