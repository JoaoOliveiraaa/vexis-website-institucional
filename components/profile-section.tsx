import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SettingsForm } from "@/components/settings-form"

interface ProfileSectionProps {
  profile: {
    id: string
    email: string
    full_name: string
    role: string
    niche?: string | null
  }
}

export function ProfileSection({ profile }: ProfileSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações Pessoais</CardTitle>
        <CardDescription>Atualize seu nome e informações de perfil</CardDescription>
      </CardHeader>
      <CardContent>
        <SettingsForm profile={profile} />
      </CardContent>
    </Card>
  )
}
