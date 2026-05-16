"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Qu'est-ce que l'optimisation pour la recherche IA ?",
    answer: "L'optimisation pour la recherche IA est le processus d'optimisation de votre contenu pour apparaître dans les réponses générées par l'IA provenant de plateformes comme ChatGPT, Perplexity, Gemini et Claude. Alors que de plus en plus d'utilisateurs se tournent vers les assistants IA pour obtenir des informations, il est crucial de s'assurer que votre marque et votre contenu sont correctement représentés dans ces réponses.",
  },
  {
    question: "Comment RankFlow AI suit-il la visibilité IA ?",
    answer: "Nous utilisons une technologie propriétaire pour surveiller les principales plateformes IA et suivre quand et comment votre marque ou contenu est mentionné dans les réponses générées par l'IA. Nos rapports montrent les scores de visibilité, la fréquence des mentions, l'analyse des sentiments et des recommandations d'amélioration.",
  },
  {
    question: "Puis-je intégrer RankFlow AI avec mes outils existants ?",
    answer: "Oui ! RankFlow AI s'intègre avec des outils populaires comme Google Search Console, Google Analytics, Ahrefs, SEMrush et bien d'autres. Nos forfaits Growth et Scale incluent également un accès API complet pour des intégrations personnalisées.",
  },
  {
    question: "Combien de temps faut-il pour voir des résultats ?",
    answer: "La plupart des clients voient des améliorations dans leurs métriques SEO dans les 4 à 8 semaines. Les améliorations de visibilité IA peuvent être plus rapides, montrant souvent des résultats dans les 2 à 4 semaines lorsque vous optimisez votre contenu pour la consommation IA.",
  },
  {
    question: "Proposez-vous un essai gratuit ?",
    answer: "Oui, tous les forfaits incluent un essai gratuit de 14 jours avec un accès complet à toutes les fonctionnalités. Aucune carte de crédit requise pour commencer. Vous pouvez mettre à niveau, rétrograder ou annuler à tout moment.",
  },
  {
    question: "Quelles options de support sont disponibles ?",
    answer: "Les forfaits Starter incluent un support par email avec un temps de réponse de 24 heures. Les forfaits Growth bénéficient d'un support prioritaire avec un temps de réponse de 4 heures. Les forfaits Scale incluent un gestionnaire de compte dédié et des sessions de formation personnalisées.",
  },
]

export function FAQSection() {
  return (
    <section className="py-20 sm:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm uppercase tracking-wider text-accent mb-4 block">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Questions fréquemment posées
          </h2>
          <p className="text-lg text-muted-foreground">
            Tout ce que vous devez savoir sur RankFlow AI.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-border/50 rounded-xl px-6 bg-card/20 data-[state=open]:bg-card/40 transition-colors"
              >
                <AccordionTrigger className="text-left text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
