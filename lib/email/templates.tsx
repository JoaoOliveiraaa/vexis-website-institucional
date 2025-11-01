export const emailTemplates = {
    taskAssigned: (taskTitle: string, assignedBy: string, dueDate: string) => ({
      subject: `Nova tarefa atribuída: ${taskTitle}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
              .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
              .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Nova Tarefa Atribuída</h1>
              </div>
              <div class="content">
                <p>Olá,</p>
                <p><strong>${assignedBy}</strong> atribuiu uma nova tarefa para você:</p>
                <h2 style="color: #3b82f6;">${taskTitle}</h2>
                <p><strong>Prazo:</strong> ${dueDate}</p>
                <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/tarefas/tasks" class="button">Ver Tarefa</a>
              </div>
              <div class="footer">
                <p>Vexis - Sistema de Gestão Interna</p>
              </div>
            </div>
          </body>
        </html>
      `,
    }),
  
    taskDueSoon: (taskTitle: string, dueDate: string) => ({
      subject: `Lembrete: Tarefa vencendo em breve - ${taskTitle}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
              .button { display: inline-block; background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
              .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>⚠️ Tarefa Vencendo em Breve</h1>
              </div>
              <div class="content">
                <p>Olá,</p>
                <p>A seguinte tarefa está próxima do vencimento:</p>
                <h2 style="color: #f59e0b;">${taskTitle}</h2>
                <p><strong>Prazo:</strong> ${dueDate}</p>
                <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/tarefas/tasks" class="button">Ver Tarefa</a>
              </div>
              <div class="footer">
                <p>Vexis - Sistema de Gestão Interna</p>
              </div>
            </div>
          </body>
        </html>
      `,
    }),
  
    paymentOverdue: (clientName: string, amount: string, dueDate: string) => ({
      subject: `Pagamento em atraso - ${clientName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
              .button { display: inline-block; background: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
              .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🚨 Pagamento em Atraso</h1>
              </div>
              <div class="content">
                <p>Olá,</p>
                <p>O pagamento do cliente <strong>${clientName}</strong> está em atraso:</p>
                <p><strong>Valor:</strong> ${amount}</p>
                <p><strong>Vencimento:</strong> ${dueDate}</p>
                <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/tarefas/clients" class="button">Ver Cliente</a>
              </div>
              <div class="footer">
                <p>Vexis - Sistema de Gestão Interna</p>
              </div>
            </div>
          </body>
        </html>
      `,
    }),
  
    newLead: (leadName: string, leadEmail: string, leadPhone: string) => ({
      subject: `Novo Lead: ${leadName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
              .button { display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
              .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>✨ Novo Lead Cadastrado</h1>
              </div>
              <div class="content">
                <p>Olá,</p>
                <p>Um novo lead foi cadastrado no sistema:</p>
                <h2 style="color: #10b981;">${leadName}</h2>
                <p><strong>Email:</strong> ${leadEmail}</p>
                <p><strong>Telefone:</strong> ${leadPhone}</p>
                <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/tarefas/leads" class="button">Ver Lead</a>
              </div>
              <div class="footer">
                <p>Vexis - Sistema de Gestão Interna</p>
              </div>
            </div>
          </body>
        </html>
      `,
    }),
  }
  