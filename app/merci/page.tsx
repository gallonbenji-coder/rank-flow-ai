"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { CheckCircle2, ArrowRight, Calendar, Mail, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"

export default function Merci() {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (!showConfetti) {
      setShowConfetti(true)
      // Fire confetti
      const duration = 3000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min
      }

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return clearInterval(interval)
        }

        const particleCount = 50 * (timeLeft / duration)
        
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b']
        })
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b']
        })
      }, 250)

      return () => clearInterval(interval)
    }
  }, [showConfetti])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[128px]" />
      </div>

      <div className="relative mx-auto max-w-2xl px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10"
          >
            <CheckCircle2 className="h-12 w-12 text-primary" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-foreground mb-4"
          >
            Merci pour votre demande !
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-muted-foreground mb-8"
          >
            Nous avons bien reçu votre message. Un membre de notre équipe vous contactera 
            dans les prochaines 24 heures pour organiser votre démonstration personnalisée.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 mb-8"
          >
            <h2 className="text-xl font-semibold text-foreground mb-6">
              En attendant, voici ce qui va se passer :
            </h2>
            
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                  1
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Email de confirmation</h3>
                  <p className="text-sm text-muted-foreground">
                    Vous allez recevoir un email récapitulatif de votre demande
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                  2
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Prise de contact sous 24h</h3>
                  <p className="text-sm text-muted-foreground">
                    Un expert RankFlow vous appellera pour comprendre vos besoins
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                  3
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Démo personnalisée</h3>
                  <p className="text-sm text-muted-foreground">
                    Nous organiserons une démonstration adaptée à votre secteur
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="lg">
              <Link href="/" className="gap-2">
                <Home className="h-4 w-4" />
                Retour à l&apos;accueil
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/#fonctionnalites" className="gap-2">
                Découvrir les fonctionnalités
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground"
          >
            <a href="mailto:contact@rankflow.ai" className="flex items-center gap-2 hover:text-foreground transition-colors">
              <Mail className="h-4 w-4" />
              contact@rankflow.ai
            </a>
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Réponse sous 24h
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
