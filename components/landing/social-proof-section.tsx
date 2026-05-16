"use client"

import { motion } from "framer-motion"

const companies = [
  { name: "Acme Corp", logo: "ACME" },
  { name: "TechFlow", logo: "TechFlow" },
  { name: "DataSync", logo: "DataSync" },
  { name: "CloudBase", logo: "CloudBase" },
  { name: "GrowthLab", logo: "GrowthLab" },
  { name: "ScaleUp", logo: "ScaleUp" },
]

export function SocialProofSection() {
  return (
    <section className="py-16 sm:py-20 border-t border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-sm uppercase tracking-wider text-muted-foreground">
            {"Les équipes leaders nous font confiance"}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center"
        >
          {companies.map((company, i) => (
            <div
              key={i}
              className="flex items-center justify-center"
            >
              <span className="text-xl sm:text-2xl font-bold text-muted-foreground/50 hover:text-muted-foreground transition-colors">
                {company.logo}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            { value: "300%", label: "d'augmentation SEO" },
            { value: "20 jours", label: "économisés par mois" },
            { value: "98%", label: "plus rapide à ranker" },
            { value: "6×", label: "plus de visibilité IA" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-foreground mb-2">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
