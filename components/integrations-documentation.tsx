import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Code, Lightbulb, Zap } from "lucide-react"

export function IntegrationsDocumentation() {
  return (
    <div className="space-y-6">
      <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertTitle>Integrações com IA em Desenvolvimento</AlertTitle>
        <AlertDescription>
          Estamos preparando integrações avançadas com IA para análise de clientes, previsão de inadimplência, automação
          de tarefas e muito mais. Em breve você poderá conectar modelos de IA diretamente ao sistema.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="webhooks" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="webhooks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Como usar Webhooks
              </CardTitle>
              <CardDescription>Receba notificações em tempo real quando eventos ocorrem no sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">1. Criar um Webhook</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Configure um endpoint que receberá as notificações:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                  <li>Nome: identificação do webhook</li>
                  <li>URL: endpoint que receberá os eventos (deve ser HTTPS)</li>
                  <li>Eventos: selecione quais eventos deseja receber</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">2. Formato do Payload</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Cada webhook enviará um POST com o seguinte formato:
                </p>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
                  {`{
  "event": "task.created",
  "timestamp": "2025-01-31T10:30:00Z",
  "data": {
    "id": "uuid",
    "title": "Nova Tarefa",
    "status": "A Fazer",
    "priority": "Alta",
    "created_by": "user_id"
  }
}`}
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">3. Validação de Segurança</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Cada requisição inclui um header <code>X-Webhook-Secret</code> com o secret do webhook para validação.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">4. Eventos Disponíveis</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                  <li>
                    <code>task.created</code> - Nova tarefa criada
                  </li>
                  <li>
                    <code>task.updated</code> - Tarefa atualizada
                  </li>
                  <li>
                    <code>task.deleted</code> - Tarefa excluída
                  </li>
                  <li>
                    <code>project.created</code> - Novo projeto criado
                  </li>
                  <li>
                    <code>client.created</code> - Novo cliente cadastrado
                  </li>
                  <li>
                    <code>payment.received</code> - Pagamento recebido
                  </li>
                  <li>
                    <code>payment.overdue</code> - Pagamento atrasado
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Como usar a API
              </CardTitle>
              <CardDescription>Integre seu sistema com a API REST do Vexis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">1. Autenticação</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Inclua sua API key no header de todas as requisições:
                </p>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
                  {`Authorization: Bearer vx_sua_api_key_aqui`}
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">2. Base URL</h4>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
                  {`https://seu-dominio.com/api/v1`}
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">3. Endpoints Disponíveis</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Tarefas</p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                      <li>
                        <code>GET /tasks</code> - Listar tarefas
                      </li>
                      <li>
                        <code>POST /tasks</code> - Criar tarefa
                      </li>
                      <li>
                        <code>GET /tasks/:id</code> - Obter tarefa
                      </li>
                      <li>
                        <code>PUT /tasks/:id</code> - Atualizar tarefa
                      </li>
                      <li>
                        <code>DELETE /tasks/:id</code> - Excluir tarefa
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Projetos</p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                      <li>
                        <code>GET /projects</code> - Listar projetos
                      </li>
                      <li>
                        <code>POST /projects</code> - Criar projeto
                      </li>
                      <li>
                        <code>GET /projects/:id</code> - Obter projeto
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Clientes</p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                      <li>
                        <code>GET /clients</code> - Listar clientes
                      </li>
                      <li>
                        <code>POST /clients</code> - Criar cliente
                      </li>
                      <li>
                        <code>GET /clients/:id</code> - Obter cliente
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">4. Exemplo de Requisição</h4>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
                  {`curl -X POST https://seu-dominio.com/api/v1/tasks \\
  -H "Authorization: Bearer vx_sua_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Nova Tarefa via API",
    "description": "Descrição da tarefa",
    "priority": "Alta",
    "status": "A Fazer"
  }'`}
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">5. Resposta de Sucesso</h4>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
                  {`{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Nova Tarefa via API",
    "status": "A Fazer",
    "created_at": "2025-01-31T10:30:00Z"
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
