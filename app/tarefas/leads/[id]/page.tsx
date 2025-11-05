import { createClient } from "@/lib/supabase/server"
import { notFound, redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { DeleteLeadButton } from "@/components/delete-lead-button"
import { Pencil, Mail, Phone, Building2, DollarSign, FileText, User } from "lucide-react"

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

export default async function LeadDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params

  if (id === "new") {
    redirect("/tarefas/leads/new")
  }

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: lead } = await supabase
    .from("leads")
    .select(
      `
      *,
      assigned_to_profile:profiles!leads_assigned_to_fkey(id, full_name),
      created_by_profile:profiles!leads_created_by_fkey(id, full_name)
    `,
    )
    .eq("id", id)
    .single()

  if (!lead) {
    notFound()
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  const canDelete = lead.created_by === user.id || profile?.role === "admin"

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-xl bg-slate-200 dark:bg-slate-700">
              {lead.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">{lead.name}</h1>
            {lead.company && <p className="text-slate-600 dark:text-slate-400">{lead.company}</p>}
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/tarefas/leads/${id}/edit`}>
            <Button variant="outline">
              <Pencil className="h-4 w-4 mr-2" />
              Editar
            </Button>
          </Link>
          {canDelete && <DeleteLeadButton leadId={id} />}
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle>Informações do Lead</CardTitle>
            <Badge className={statusColors[lead.status as keyof typeof statusColors]}>
              {statusLabels[lead.status as keyof typeof statusLabels]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {lead.email && (
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Email</p>
                  <a
                    href={`mailto:${lead.email}`}
                    className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {lead.email}
                  </a>
                </div>
              </div>
            )}

            {lead.phone && (
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Telefone</p>
                  <a
                    href={`tel:${lead.phone}`}
                    className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {lead.phone}
                  </a>
                </div>
              </div>
            )}

            {lead.company && (
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Empresa</p>
                  <p className="font-medium text-slate-900 dark:text-slate-50">{lead.company}</p>
                </div>
              </div>
            )}

            {lead.value && (
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Valor Estimado</p>
                  <p className="font-medium text-slate-900 dark:text-slate-50">
                    R$ {Number(lead.value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            )}

            {lead.source && (
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Origem</p>
                  <p className="font-medium text-slate-900 dark:text-slate-50">{lead.source}</p>
                </div>
              </div>
            )}

            {lead.assigned_to_profile && (
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Responsável</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs bg-slate-200 dark:bg-slate-700">
                        {lead.assigned_to_profile.full_name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-slate-900 dark:text-slate-50">
                      {lead.assigned_to_profile.full_name}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {lead.notes && (
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold mb-2 text-slate-900 dark:text-slate-50">Observações</h3>
              <p className="text-slate-600 dark:text-slate-400 whitespace-pre-wrap">{lead.notes}</p>
            </div>
          )}

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-500">
              Criado em {new Date(lead.created_at).toLocaleString("pt-BR")}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500">
              Atualizado em {new Date(lead.updated_at).toLocaleString("pt-BR")}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500">Criado por {lead.created_by_profile.full_name}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
