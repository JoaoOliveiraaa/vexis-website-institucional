import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET() {
  try {
    const supabase = await createClient()

    const [
      { count: tasksCount },
      { count: projectsCount },
      { count: leadsCount },
      { count: clientsCount },
      { data: financialData },
      { data: teamMembers },
    ] = await Promise.all([
      supabase.from("tasks").select("*", { count: "exact", head: true }),
      supabase.from("projects").select("*", { count: "exact", head: true }),
      supabase.from("leads").select("*", { count: "exact", head: true }),
      supabase.from("clients").select("*", { count: "exact", head: true }),
      supabase.from("financial_records").select("type, amount"),
      supabase.from("profiles").select("full_name, niche, role").order("full_name"),
    ])

    const totalIncome =
      financialData?.filter((record) => record.type === "income").reduce((sum, record) => sum + Number(record.amount), 0) ||
      0
    const totalExpense =
      financialData?.filter((record) => record.type === "expense").reduce((sum, record) => sum + Number(record.amount), 0) ||
      0
    const balance = totalIncome - totalExpense

    const now = new Date()

    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage()
    const { width, height } = page.getSize()
    const margin = 50
    let yPosition = height - margin

    const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

    const drawText = (text: string, options?: { size?: number; font?: typeof regularFont; color?: ReturnType<typeof rgb> }) => {
      const size = options?.size ?? 12
      const font = options?.font ?? regularFont
      const color = options?.color ?? rgb(0, 0, 0)

      const lines = text.split("\n")
      lines.forEach((line) => {
        page.drawText(line, {
          x: margin,
          y: yPosition,
          size,
          font,
          color,
        })
        yPosition -= size + 6
      })
      yPosition -= 4
    }

    const drawSpacer = (amount = 12) => {
      yPosition -= amount
    }

    drawText("Relatório Executivo - Vexis Hub", { size: 20, font: boldFont })
    drawSpacer()
    drawText(`Gerado em: ${now.toLocaleString("pt-BR")}`, { size: 12, color: rgb(0.35, 0.35, 0.35) })
    drawSpacer(20)

    drawText("Visão Geral", { size: 14, font: boldFont })
    drawSpacer(6)
    drawText(`Total de tarefas: ${tasksCount ?? 0}`)
    drawText(`Projetos ativos: ${projectsCount ?? 0}`)
    drawText(`Leads cadastrados: ${leadsCount ?? 0}`)
    drawText(`Clientes ativos: ${clientsCount ?? 0}`)
    drawSpacer(16)

    drawText("Resumo Financeiro", { size: 14, font: boldFont })
    drawSpacer(6)
    drawText(`Receitas acumuladas: R$ ${totalIncome.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`)
    drawText(`Despesas acumuladas: R$ ${totalExpense.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`)
    drawText(`Saldo atual: R$ ${balance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`)
    drawSpacer(16)

    drawText("Equipe & Nichos", { size: 14, font: boldFont })
    drawSpacer(6)

    if (teamMembers && teamMembers.length > 0) {
      teamMembers.forEach((member) => {
        drawText(
          `• ${member.full_name || "Usuário"} — ${member.niche || "Sem nicho"} (${member.role === "admin" ? "Admin" : "Colaborador"})`,
          { size: 11 },
        )
      })
    } else {
      drawText("Nenhum membro cadastrado.", { size: 11 })
    }

    drawSpacer(18)
    drawText("Gerado automaticamente pelo painel interno Vexis para apoio à tomada de decisão.", {
      size: 10,
      color: rgb(0.45, 0.45, 0.45),
    })

    const pdfBytes = await pdfDoc.save()

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="relatorio-vexis-${now.toISOString().slice(0, 10)}.pdf"`,
      },
    })
  } catch (error) {
    console.error("[reports/export] error generating pdf", error)
    return new NextResponse(JSON.stringify({ error: "failed_to_generate_pdf" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

