import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { PLANS, type PlanKey } from '@/lib/stripe-config'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)

  if (!body?.planId || !(body.planId in PLANS)) {
    return NextResponse.json({ error: 'Plan invalide' }, { status: 400 })
  }

  const planId = body.planId as PlanKey
  const plan = PLANS[planId]

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: plan.priceId, quantity: 1 }],
    ...(user?.email ? { customer_email: user.email } : {}),
    metadata: {
      userId: user?.id ?? '',
      planId,
    },
    subscription_data: {
      metadata: {
        userId: user?.id ?? '',
        planId,
      },
    },
    success_url: `${baseUrl}/merci?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/#pricing`,
    allow_promotion_codes: true,
    locale: 'fr',
  })

  return NextResponse.json({ url: session.url })
}
