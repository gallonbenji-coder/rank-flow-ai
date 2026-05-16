"use client"

import { motion } from "framer-motion"
import { Search, TrendingUp, FileText, Eye, Brain, BarChart3 } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "Optimisation recherche IA",
    description: "Soyez découvert dans les réponses de ChatGPT, Perplexity, Gemini et Claude grâce à notre moteur de visibilité IA.",
  },
  {
    icon: TrendingUp,
    title: "Suivi de positionnement SEO",
    description: "Suivez vos positions de mots-clés sur Google, Bing et autres moteurs de recherche en temps réel.",
  },
  {
    icon: FileText,
    title: "Suggestions de contenu automatisées",
    description: "Obtenez des recommandations de contenu alimentées par l'IA pour améliorer votre score SEO et votre potentiel de classement.",
  },
  {
    icon: Eye,
    title: "Surveillance des concurrents",
    description: "Surveillez les stratégies SEO de vos concurrents et gardez une longueur d'avance avec des insights actionnables.",
  },
  {
    icon: Search,
    title: "Intelligence des mots-clés",
    description: "Découvrez des mots-clés à fort impact avec volume de recherche, difficulté et scores de pertinence IA.",
  },
  {
    icon: BarChart3,
    title: "Rapports de visibilité IA",
    description: "Des rapports complets montrant la présence de votre marque dans les réponses générées par l'IA.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-wider text-accent mb-4 block">Fonctionnalités</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Tout ce dont vous avez besoin pour dominer la recherche
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {"Une boîte à outils complète pour l'optimisation SEO et la visibilité sur les recherches IA en une seule plateforme puissante."}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="group h-full p-6 sm:p-8 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/50 hover:border-accent/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
