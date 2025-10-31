"use client"

import { useState } from "react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Edit, Trash2, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface Client {
  id: string
  name: string
  email: string | null
  phone: string | null
  company: string | null
  status: string
  client_type: string
  created_at: string
  created_by_profile?: {
    full_name: string
  }
}

interface ClientsTableProps {
  clients: Client[]
}

export function ClientsTable({ clients }: ClientsTableProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este cliente?")) return

    setIsDeleting(id)
    const supabase = createClient()

    const { error } = await supabase.from("clients").delete().eq("id", id)

    if (error) {
      console.error("Error deleting client:", error)
      alert("Erro ao excluir cliente")
    } else {
      router.refresh()
    }

    setIsDeleting(null)
  }

  const statusColors = {
    ativo: "bg-green-500/10 text-green-500 border-green-500/20",
    inativo: "bg-gray-500/10 text-gray-500 border-gray-500/20",
    inadimplente: "bg-red-500/10 text-red-500 border-red-500/20",
  }

  if (clients.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-card">
        <p className="text-muted-foreground">Nenhum cliente cadastrado ainda.</p>
        <Link href="/tarefas/clients/new">
          <Button className="mt-4">Cadastrar Primeiro Cliente</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="border rounded-lg bg-card overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="text-foreground min-w-[150px]">Nome</TableHead>
            <TableHead className="text-foreground min-w-[120px]">Tipo</TableHead>
            <TableHead className="text-foreground min-w-[180px]">Contato</TableHead>
            <TableHead className="text-foreground min-w-[100px]">Status</TableHead>
            <TableHead className="text-foreground min-w-[120px]">Cadastrado em</TableHead>
            <TableHead className="text-right text-foreground min-w-[80px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>
                <div>
                  <p className="font-medium text-foreground">{client.name}</p>
                  {client.company && <p className="text-sm text-muted-foreground">{client.company}</p>}
                </div>
              </TableCell>
              <TableCell className="text-foreground whitespace-nowrap">
                {client.client_type === "pessoa_fisica" ? "Pessoa Física" : "Pessoa Jurídica"}
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  {client.email && <p className="text-foreground truncate max-w-[200px]">{client.email}</p>}
                  {client.phone && <p className="text-muted-foreground whitespace-nowrap">{client.phone}</p>}
                </div>
              </TableCell>
              <TableCell>
                <Badge className={statusColors[client.status as keyof typeof statusColors]}>{client.status}</Badge>
              </TableCell>
              <TableCell className="text-muted-foreground whitespace-nowrap">
                {new Date(client.created_at).toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/tarefas/clients/${client.id}`} className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        Ver Detalhes
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/tarefas/clients/${client.id}/edit`} className="flex items-center gap-2">
                        <Edit className="h-4 w-4" />
                        Editar
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(client.id)}
                      disabled={isDeleting === client.id}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      {isDeleting === client.id ? "Excluindo..." : "Excluir"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
