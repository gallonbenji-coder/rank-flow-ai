"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-accent/20 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-chart-2/20 rounded-full blur-[100px] opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-sm text-accent">
            <Sparkles className="w-4 h-4" />
            {"Plus de 500 équipes growth nous font confiance"}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 text-balance"
        >
          Dominez Google et
          <br />
          <span className="text-muted-foreground">les moteurs de recherche IA</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 text-pretty"
        >
          {"Optimisez automatiquement votre SEO et votre visibilité sur les recherches IA pour générer plus de trafic organique et de leads. Une plateforme pour Google, ChatGPT, Perplexity, Gemini et Claude."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" className="h-12 px-8 text-base font-medium" asChild>
            <Link href="/signup">
              Essai gratuit
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-8 text-base font-medium border-border/50 bg-secondary/50 hover:bg-secondary" asChild>
            <Link href="/contact">Réserver une démo</Link>
          </Button>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 sm:mt-20"
        >
          <div className="relative mx-auto max-w-5xl">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
            <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-2 shadow-2xl shadow-accent/5">
              <div className="rounded-lg bg-background/80 border border-border/30 overflow-hidden">
                <DashboardMockup />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function DashboardMockup() {
  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-accent" />
          </div>
          <span className="font-semibold text-foreground">Tableau de bord RankFlow</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-chart-3" />
          <span className="text-sm text-muted-foreground">{"Tous les systèmes opérationnels"}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Trafic organique", value: "127,4K", change: "+23%" },
          { label: "Mots-clés positionnés", value: "2 847", change: "+156" },
          { label: "Visibilité IA", value: "94%", change: "+12%" },
          { label: "Score SEO", value: "87/100", change: "+5" },
        ].map((stat, i) => (
          <div key={i} className="p-4 rounded-lg bg-secondary/30 border border-border/30">
            <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
            <p className="text-xl sm:text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-chart-3">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Chart placeholder */}
      <div className="h-32 sm:h-48 rounded-lg bg-secondary/20 border border-border/30 flex items-end justify-around p-4 gap-2">
        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((height, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-gradient-to-t from-accent/50 to-accent/20"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  )
}
