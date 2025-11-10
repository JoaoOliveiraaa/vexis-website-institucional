import { NextResponse } from "next/server"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"

const inviteSchema = z.object({
  email: z.string().email(),
  full_name: z.string().min(3).max(120),
  role: z.enum(["admin", "user"]).default("user"),
  niche: z.string().max(120).optional(),
})

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 })
    }

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "forbidden" }, { status: 403 })
    }

    const payload = await request.json()
    const parsed = inviteSchema.safeParse(payload)

    if (!parsed.success) {
      return NextResponse.json({ error: "invalid_payload", details: parsed.error.flatten() }, { status: 400 })
    }

    const { email, full_name, role, niche } = parsed.data
    const adminClient = createAdminClient()

    const { data: existingUserData } = await adminClient.auth.admin.getUserByEmail(email)
    let targetUserId = existingUserData?.user?.id

    if (!targetUserId) {
      const { data: inviteData, error: inviteError } = await adminClient.auth.admin.inviteUserByEmail(email, {
        data: { full_name },
      })

      if (inviteError) {
        console.error("[team/invite] invite error", inviteError)
        return NextResponse.json({ error: "invite_failed" }, { status: 500 })
      }

      targetUserId = inviteData.user?.id
    }

    if (!targetUserId) {
      return NextResponse.json({ error: "user_not_created" }, { status: 500 })
    }

    const { error: upsertError } = await adminClient.from("profiles").upsert(
      {
        id: targetUserId,
        email,
        full_name,
        role,
        niche: niche?.trim() ? niche.trim() : null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" },
    )

    if (upsertError) {
      console.error("[team/invite] upsert profile error", upsertError)
      return NextResponse.json({ error: "profile_upsert_failed" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[team/invite] unexpected error", error)
    return NextResponse.json({ error: "unexpected_error" }, { status: 500 })
  }
}

