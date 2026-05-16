"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, Loader2 } from "lucide-react"
import type { PlanKey } from "@/lib/stripe-config"

const plans: { name: string; price: string; description: string; features: string[]; highlighted: boolean; planId: PlanKey }[] = [
  {
    name: "Starter",
    price: "49€",
    description: "Parfait pour les petites équipes qui débutent en SEO",
    planId: "starter",
    features: [
      "Jusqu'à 1 000 mots-clés suivis",
      "5 concurrents surveillés",
      "Rapports de visibilité IA basiques",
      "Audits SEO hebdomadaires",
      "Support par email",
    ],
    highlighted: false,
  },
  {
    name: "Growth",
    price: "149€",
    description: "Pour les équipes en croissance sérieuses sur la domination SEO",
    planId: "growth",
    features: [
      "Jusqu'à 10 000 mots-clés suivis",
      "25 concurrents surveillés",
      "Rapports de visibilité IA avancés",
      "Audits SEO quotidiens",
      "Suggestions de contenu",
      "Accès API",
      "Support prioritaire",
    ],
    highlighted: true,
  },
  {
    name: "Scale",
    price: "399€",
    description: "Pour les entreprises avec des besoins SEO avancés",
    planId: "scale",
    features: [
      "Mots-clés illimités",
      "Concurrents illimités",
      "Rapports de visibilité IA personnalisés",
      "Audits SEO en temps réel",
      "Génération de contenu IA",
      "Accès API complet",
      "Gestionnaire de compte dédié",
      "Intégrations personnalisées",
    ],
    highlighted: false,
  },
]

export function PricingSection() {
  const [loadingPlan, setLoadingPlan] = useState<PlanKey | null>(null)

  async function handleCheckout(planId: PlanKey) {
    if (loadingPlan) return
    setLoadingPlan(planId)

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      })

      const data = await res.json()

      if (!res.ok || !data.url) {
        console.error('Erreur checkout:', data)
        return
      }

      window.location.href = data.url
    } catch (err) {
      console.error('Erreur réseau:', err)
    } finally {
      setLoadingPlan(null)
    }
  }

  return (
    <section id="pricing" className="py-20 sm:py-32 relative">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px] opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-wider text-accent mb-4 block">Tarifs</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Des tarifs simples et transparents
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {"Choisissez le forfait qui convient à votre équipe. Tous les forfaits incluent un essai gratuit de 14 jours."}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div
                className={`relative h-full p-6 sm:p-8 rounded-2xl border transition-all duration-300 ${
                  plan.highlighted
                    ? "border-accent/50 bg-card/50 backdrop-blur-sm shadow-lg shadow-accent/10"
                    : "border-border/50 bg-card/30 backdrop-blur-sm hover:border-border"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                      Le plus populaire
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">/mois</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.highlighted ? "" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                  variant={plan.highlighted ? "default" : "outline"}
                  disabled={loadingPlan !== null}
                  onClick={() => handleCheckout(plan.planId)}
                >
                  {loadingPlan === plan.planId ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Redirection…
                    </>
                  ) : (
                    "Commencer"
                  )}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
