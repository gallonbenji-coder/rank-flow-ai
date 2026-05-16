"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
  {
    quote: "RankFlow AI a transformé notre stratégie SEO. Nous sommes passés de la page 3 à la position 1 pour nos mots-clés principaux en seulement 3 mois. Les rapports de visibilité IA sont révolutionnaires.",
    author: "Sophie Martin",
    role: "VP Marketing",
    company: "TechScale France",
  },
  {
    quote: "Enfin, un outil qui comprend l'importance de la recherche IA. Notre marque apparaît maintenant dans les réponses ChatGPT et Perplexity, générant 40% de leads qualifiés en plus.",
    author: "Marc Dupont",
    role: "Responsable Croissance",
    company: "DataFlow Systems",
  },
  {
    quote: "Les fonctionnalités d'automatisation seules nous font économiser plus de 20 heures par semaine. Le suivi du ROI m'aide à justifier notre budget SEO auprès de la direction avec des chiffres de revenus réels.",
    author: "Émilie Bernard",
    role: "Directrice Digitale",
    company: "CloudBase Solutions",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-32 border-t border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-wider text-accent mb-4 block">Témoignages</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Adoré par les équipes growth
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez ce que les leaders marketing disent de RankFlow AI.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="h-full p-6 sm:p-8 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-chart-4 text-chart-4" />
                  ))}
                </div>
                <blockquote className="text-foreground mb-6 leading-relaxed">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-sm font-semibold text-accent">
                      {testimonial.author.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
