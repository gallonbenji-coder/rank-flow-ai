export const PLANS = {
  starter: {
    name: 'Starter',
    priceId: process.env.STRIPE_PRICE_STARTER!,
    amount: 4900,
  },
  growth: {
    name: 'Growth',
    priceId: process.env.STRIPE_PRICE_GROWTH!,
    amount: 14900,
  },
  scale: {
    name: 'Scale',
    priceId: process.env.STRIPE_PRICE_SCALE!,
    amount: 39900,
  },
} as const

export type PlanKey = keyof typeof PLANS
