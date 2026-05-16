"use client"

import { motion } from "framer-motion"
import { TrendingUp, Award, Sparkles, Clock, BarChart3 } from "lucide-react"

const benefits = [
  {
    icon: TrendingUp,
    title: "Augmentez le trafic organique",
    description: "Attirez plus de visiteurs qualifiés sur votre site avec des stratégies SEO basées sur les données et du contenu optimisé par l'IA.",
  },
  {
    icon: Award,
    title: "Montez dans les classements Google",
    description: "Grimpez dans les résultats de recherche avec des insights actionnables, des audits techniques et l'analyse des concurrents.",
  },
  {
    icon: Sparkles,
    title: "Soyez découvert dans les réponses IA",
    description: "Optimisez votre contenu pour apparaître dans ChatGPT, Perplexity, Gemini et autres plateformes IA.",
  },
  {
    icon: Clock,
    title: "Gagnez du temps avec l'automatisation",
    description: "Automatisez les tâches SEO répétitives et concentrez-vous sur la stratégie pendant que notre plateforme fait le gros du travail.",
  },
  {
    icon: BarChart3,
    title: "Mesurez facilement le ROI",
    description: "Suivez l'impact sur le revenu avec des analyses complètes qui connectent les efforts SEO aux résultats business.",
  },
]

export function BenefitsSection() {
  return (
    <section className="py-20 sm:py-32 border-t border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm uppercase tracking-wider text-accent mb-4 block">Avantages</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Itération plus rapide.
              <br />
              Plus d&apos;innovation.
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {"La plateforme pour un progrès rapide. Laissez votre équipe se concentrer sur le déploiement de fonctionnalités plutôt que sur la gestion de l'infrastructure avec le SEO automatisé, les tests intégrés et les analyses intégrées."}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group flex gap-4 p-4 rounded-xl border border-border/30 bg-card/20 hover:bg-card/40 hover:border-accent/30 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <benefit.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-1">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
