import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

function makeSupabaseAdmin() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  )
}

// ─── GET /api/waitlist — public count ────────────────────────────────────────

export async function GET() {
  try {
    const supabase = makeSupabaseAdmin()
    const { count } = await supabase
      .from('waitlist')
      .select('id', { count: 'exact', head: true })

    return NextResponse.json({ count: count ?? 0 })
  } catch {
    return NextResponse.json({ count: 0 })
  }
}

// ─── POST /api/waitlist — subscribe ──────────────────────────────────────────

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const email: string = body?.email?.trim().toLowerCase()

  // Basic email validation
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Adresse e-mail invalide.' }, { status: 400 })
  }

  const supabase = makeSupabaseAdmin()

  // Insert — ignore duplicate (already registered)
  const { error } = await supabase
    .from('waitlist')
    .insert({ email })

  if (error) {
    // Unique violation = already registered
    if (error.code === '23505') {
      const { count } = await supabase
        .from('waitlist')
        .select('id', { count: 'exact', head: true })
      return NextResponse.json({ success: true, count: count ?? 0, alreadyRegistered: true })
    }
    return NextResponse.json({ error: 'Une erreur est survenue. Réessayez.' }, { status: 500 })
  }

  // Return updated count
  const { count } = await supabase
    .from('waitlist')
    .select('id', { count: 'exact', head: true })

  return NextResponse.json({ success: true, count: count ?? 0 })
}
