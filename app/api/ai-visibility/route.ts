import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createServerClient } from '@supabase/ssr'
import { calculateScores, PLAN_LIMITS } from '@/lib/ai-visibility'

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function callClaude(prompt: string): Promise<string> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 400,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Anthropic API error: ${res.status} — ${err}`)
  }

  const data = await res.json()
  return (data.content?.[0]?.text ?? '').trim()
}

function makeSupabaseAdmin() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  )
}

// ─── POST /api/ai-visibility ──────────────────────────────────────────────────

export async function POST(request: Request) {
  // 1. Auth
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
  }

  // 2. Body validation
  const body = await request.json().catch(() => null)
  const brand: string = body?.brand?.trim()
  const service: string = body?.service?.trim() ?? brand

  if (!brand || brand.length < 2) {
    return NextResponse.json({ error: 'Nom de marque invalide' }, { status: 400 })
  }

  // 3. Check plan & usage limit
  const admin = makeSupabaseAdmin()

  const { data: subscription } = await admin
    .from('subscriptions')
    .select('plan_id, status')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .maybeSingle()

  const planId = subscription?.plan_id ?? 'free'
  const limit = PLAN_LIMITS[planId] ?? PLAN_LIMITS.free

  if (limit !== -1) {
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const { count } = await admin
      .from('ai_visibility_checks')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', startOfMonth.toISOString())

    if ((count ?? 0) >= limit) {
      return NextResponse.json(
        { error: 'Limite mensuelle atteinte', limit, planId },
        { status: 429 }
      )
    }
  }

  // 4. Call Anthropic — 3 prompts in parallel
  const [notorieteResponse, pertinenceResponse, reputationResponse] = await Promise.all([
    callClaude(`Connais-tu la marque ou l'entreprise "${brand}" ? Décris-la en 2 phrases maximum. Si tu ne la connais pas, dis-le clairement.`),
    callClaude(`Si quelqu'un cherche "${service}", est-ce que tu mentionnerais "${brand}" dans ta réponse ? Réponds par oui ou non, puis explique brièvement pourquoi.`),
    callClaude(`Quelle est la réputation en ligne de "${brand}" d'après ce que tu sais ? Donne une évaluation brève et objective.`),
  ])

  // 5. Calculate scores
  const result = calculateScores(brand, notorieteResponse, pertinenceResponse, reputationResponse)
  result.service = service

  // 6. Save to Supabase (best-effort — table may not exist yet)
  try {
    await admin.from('ai_visibility_checks').insert({
      user_id: user.id,
      brand,
      service,
      score: result.score,
      result,
    })
  } catch {
    // Table not created yet — continue without saving
  }

  return NextResponse.json(result)
}

// ─── GET /api/ai-visibility — usage count ────────────────────────────────────

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
  }

  const admin = makeSupabaseAdmin()

  const { data: subscription } = await admin
    .from('subscriptions')
    .select('plan_id, status')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .maybeSingle()

  const planId = subscription?.plan_id ?? 'free'
  const limit = PLAN_LIMITS[planId] ?? PLAN_LIMITS.free

  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const usageResult = await admin
    .from('ai_visibility_checks')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .gte('created_at', startOfMonth.toISOString())

  const count = usageResult.count ?? 0

  return NextResponse.json({ used: count, limit, planId })
}
