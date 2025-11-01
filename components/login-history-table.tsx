import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, Monitor } from "lucide-react"

interface LoginHistoryTableProps {
  history: Array<{
    id: string
    ip_address: string | null
    user_agent: string | null
    location: string | null
    success: boolean
    created_at: string
  }>
}

export function LoginHistoryTable({ history }: LoginHistoryTableProps) {
  if (history.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Monitor className="mx-auto h-12 w-12 mb-2 opacity-50" />
        <p>Nenhum histórico de acesso disponível</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>IP</TableHead>
            <TableHead className="hidden md:table-cell">Dispositivo</TableHead>
            <TableHead className="hidden lg:table-cell">Localização</TableHead>
            <TableHead>Data</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((login) => (
            <TableRow key={login.id}>
              <TableCell>
                {login.success ? (
                  <Badge variant="default" className="gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Sucesso
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="gap-1">
                    <XCircle className="h-3 w-3" />
                    Falha
                  </Badge>
                )}
              </TableCell>
              <TableCell className="font-mono text-sm">{login.ip_address || "N/A"}</TableCell>
              <TableCell className="hidden md:table-cell text-sm">
                {login.user_agent ? login.user_agent.substring(0, 50) + "..." : "N/A"}
              </TableCell>
              <TableCell className="hidden lg:table-cell">{login.location || "N/A"}</TableCell>
              <TableCell className="text-sm">
                {formatDistanceToNow(new Date(login.created_at), { addSuffix: true, locale: ptBR })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
