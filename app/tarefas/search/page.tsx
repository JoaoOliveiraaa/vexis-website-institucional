import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export const dynamic = "force-dynamic"

type SearchPageProps = {
  searchParams?: { q?: string }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams?.q?.trim() || ""

  if (!query) {
    return (
      <div className="space-y-4 lg:space-y-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Pesquisa</h1>
          <p className="text-sm lg:text-base text-muted-foreground">
            Digite na barra superior do painel para encontrar tarefas, projetos, leads ou clientes.
          </p>
        </div>
        <Card className="border-dashed">
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            Nenhum termo fornecido. Use a pesquisa para agilizar sua rotina.
          </CardContent>
        </Card>
      </div>
    )
  }

  const supabase = await createClient()

  const wildcard = `%${query}%`

  const [{ data: tasks }, { data: projects }, { data: leads }, { data: clients }] = await Promise.all([
    supabase
      .from("tasks")
      .select("id, title, status, priority")
      .ilike("title", wildcard)
      .limit(6),
    supabase
      .from("projects")
      .select("id, name, status")
      .ilike("name", wildcard)
      .limit(6),
    supabase
      .from("leads")
      .select("id, name, status, email")
      .ilike("name", wildcard)
      .limit(6),
    supabase
      .from("clients")
      .select("id, name, company, email")
      .ilike("name", wildcard)
      .limit(6),
  ])

  const hasResults = [tasks, projects, leads, clients].some((collection) => collection && collection.length > 0)

  return (
    <div className="space-y-4 lg:space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Resultados para “{query}”</h1>
        <p className="text-sm lg:text-base text-muted-foreground">
          Mostrando itens relevantes dentro do seu ecossistema de gestão.
        </p>
      </div>

      {hasResults ? (
        <div className="grid gap-4 lg:gap-6 grid-cols-1 xl:grid-cols-2">
          <ResultCard
            title="Tarefas"
            href="/tarefas/tasks"
            emptyText="Nenhuma tarefa encontrada."
            items={tasks?.map((task) => ({
              id: task.id,
              title: task.title,
              subtitle: task.status,
              badge: task.priority === "high" ? "Alta" : task.priority === "medium" ? "Média" : "Baixa",
              badgeVariant: task.priority === "high" ? "destructive" : "secondary",
            })) || []}
          />
          <ResultCard
            title="Projetos"
            href="/tarefas/projects"
            emptyText="Nenhum projeto corresponde ao termo."
            items={projects?.map((project) => ({
              id: project.id,
              title: project.name,
              subtitle: project.status,
              badge: project.status,
              badgeVariant: "outline",
            })) || []}
          />
          <ResultCard
            title="Leads"
            href="/tarefas/leads"
            emptyText="Nenhum lead encontrado."
            items={leads?.map((lead) => ({
              id: lead.id,
              title: lead.name,
              subtitle: lead.email,
              badge: lead.status,
              badgeVariant: "secondary",
            })) || []}
          />
          <ResultCard
            title="Clientes"
            href="/tarefas/clients"
            emptyText="Nenhum cliente encontrado."
            items={clients?.map((client) => ({
              id: client.id,
              title: client.name,
              subtitle: client.company || client.email,
              badge: client.company ? "Conta ativa" : undefined,
              badgeVariant: "outline",
            })) || []}
          />
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            Nenhum resultado encontrado. Altere os termos ou tente algo mais específico.
          </CardContent>
        </Card>
      )}
    </div>
  )
}

type ResultCardProps = {
  title: string
  href: string
  items: {
    id: string
    title: string
    subtitle?: string | null
    badge?: string
    badgeVariant?: "default" | "secondary" | "destructive" | "outline"
  }[]
  emptyText: string
}

function ResultCard({ title, href, items, emptyText }: ResultCardProps) {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        <Link href={href} className="text-xs font-medium text-primary underline-offset-4 hover:underline">
          Ver tudo
        </Link>
      </CardHeader>
      <CardContent className={cn("space-y-3", items.length === 0 && "text-sm text-muted-foreground")}>
        {items.length === 0
          ? emptyText
          : items.map((item) => (
              <Link
                key={item.id}
                href={href}
                className="flex items-center justify-between rounded-md border border-transparent px-3 py-2 transition-colors hover:border-border hover:bg-accent/10"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  {item.subtitle && <p className="text-xs text-muted-foreground">{item.subtitle}</p>}
                </div>
                {item.badge && (
                  <Badge variant={item.badgeVariant || "secondary"} className="text-[11px]">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
      </CardContent>
    </Card>
  )
}

