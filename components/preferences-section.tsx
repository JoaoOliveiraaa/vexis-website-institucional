"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { Loader2, Palette, Type, CheckCircle2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PreferencesSectionProps {
  preferences: {
    theme: string
    font_size: string
  } | null
  userId: string
}

export function PreferencesSection({ preferences, userId }: PreferencesSectionProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [theme, setTheme] = useState(preferences?.theme ?? "system")
  const [fontSize, setFontSize] = useState(preferences?.font_size ?? "medium")

  const handleSave = async () => {
    setLoading(true)
    try {
      const supabase = createClient()

      const { error } = await supabase.from("user_preferences").upsert(
        {
          user_id: userId,
          theme,
          font_size: fontSize,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" },
      )

      if (error) throw error

      // Aplicar tema imediatamente
      if (theme === "dark") {
        document.documentElement.classList.add("dark")
        localStorage.setItem("theme", "dark")
      } else if (theme === "light") {
        document.documentElement.classList.remove("dark")
        localStorage.setItem("theme", "light")
      } else {
        localStorage.removeItem("theme")
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        if (systemTheme) {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
      }

      // Aplicar tamanho de fonte
      document.documentElement.style.fontSize = fontSize === "small" ? "14px" : fontSize === "large" ? "18px" : "16px"

      alert("Preferências salvas com sucesso!")
      router.refresh()
    } catch (error) {
      console.error("[v0] Error saving preferences:", error)
      alert("Erro ao salvar preferências. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Aparência
          </CardTitle>
          <CardDescription>Personalize a aparência do sistema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="theme">Tema</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger id="theme">
                <SelectValue placeholder="Selecione o tema" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Claro</SelectItem>
                <SelectItem value="dark">Escuro</SelectItem>
                <SelectItem value="system">Sistema</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Escolha entre tema claro, escuro ou seguir as configurações do sistema
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="h-5 w-5" />
            Tipografia
          </CardTitle>
          <CardDescription>Ajuste o tamanho do texto para melhor legibilidade</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="font_size">Tamanho da Fonte</Label>
            <Select value={fontSize} onValueChange={setFontSize}>
              <SelectTrigger id="font_size">
                <SelectValue placeholder="Selecione o tamanho" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Pequeno</SelectItem>
                <SelectItem value="medium">Médio</SelectItem>
                <SelectItem value="large">Grande</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">Ajuste o tamanho do texto em todo o sistema</p>
          </div>

          <Button onClick={handleSave} disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Salvar Preferências
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
