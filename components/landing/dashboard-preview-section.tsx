"use client"

import { motion } from "framer-motion"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { TrendingUp, Globe, Brain, Gauge } from "lucide-react"

const trafficData = [
  { month: "Jan", organic: 4200, ai: 800 },
  { month: "Fév", organic: 5100, ai: 1200 },
  { month: "Mar", organic: 6800, ai: 2100 },
  { month: "Avr", organic: 8200, ai: 3400 },
  { month: "Mai", organic: 11500, ai: 5200 },
  { month: "Juin", organic: 15800, ai: 7800 },
]

const keywordData = [
  { keyword: "Outils IA", position: 3, change: "+5" },
  { keyword: "Logiciel SEO", position: 1, change: "+2" },
  { keyword: "Optimisation contenu", position: 2, change: "+8" },
  { keyword: "Suivi de rang", position: 4, change: "+3" },
  { keyword: "Recherche IA", position: 1, change: "nouveau" },
]

export function DashboardPreviewSection() {
  return (
    <section className="py-20 sm:py-32 relative">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] opacity-50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-wider text-accent mb-4 block">Tableau de bord</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            {"Des analyses puissantes à portée de main"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Suivez vos performances SEO et votre visibilité IA avec des tableaux de bord beaux et actionnables.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm p-4 sm:p-6 lg:p-8"
        >
          {/* Mini Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { icon: TrendingUp, label: "Trafic organique", value: "127,4K", change: "+23,5%" },
              { icon: Globe, label: "Mots-clés Top 10", value: "2 847", change: "+156" },
              { icon: Brain, label: "Visibilité IA", value: "94%", change: "+12%" },
              { icon: Gauge, label: "Score SEO", value: "87/100", change: "+5" },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-xl bg-secondary/30 border border-border/30">
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className="w-4 h-4 text-accent" />
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-chart-3">{stat.change}</p>
              </div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Traffic Chart */}
            <div className="p-4 sm:p-6 rounded-xl bg-secondary/20 border border-border/30">
              <h3 className="text-lg font-semibold text-foreground mb-4">Évolution du trafic</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trafficData}>
                    <defs>
                      <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.70 0.18 270)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="oklch(0.70 0.18 270)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorAI" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.65 0.15 200)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="oklch(0.65 0.15 200)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.01 270)" />
                    <XAxis dataKey="month" stroke="oklch(0.65 0 0)" fontSize={12} />
                    <YAxis stroke="oklch(0.65 0 0)" fontSize={12} />
                    <Area
                      type="monotone"
                      dataKey="organic"
                      stroke="oklch(0.70 0.18 270)"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorOrganic)"
                    />
                    <Area
                      type="monotone"
                      dataKey="ai"
                      stroke="oklch(0.65 0.15 200)"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorAI)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <span className="text-sm text-muted-foreground">Trafic organique</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-chart-2" />
                  <span className="text-sm text-muted-foreground">Référencements IA</span>
                </div>
              </div>
            </div>

            {/* Keywords Table */}
            <div className="p-4 sm:p-6 rounded-xl bg-secondary/20 border border-border/30">
              <h3 className="text-lg font-semibold text-foreground mb-4">Meilleurs mots-clés positionnés</h3>
              <div className="space-y-3">
                {keywordData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/20">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-sm font-semibold text-accent">
                        #{item.position}
                      </span>
                      <span className="text-sm font-medium text-foreground">{item.keyword}</span>
                    </div>
                    <span className={`text-sm font-medium ${item.change === "nouveau" ? "text-chart-4" : "text-chart-3"}`}>
                      {item.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
