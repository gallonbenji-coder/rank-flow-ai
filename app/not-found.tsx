"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Home, ArrowLeft, Search, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[128px]" />
      </div>

      <div className="relative mx-auto max-w-2xl px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 404 Number with animated gradient */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mb-8"
          >
            <span className="text-[150px] md:text-[200px] font-bold leading-none bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              404
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-foreground mb-4"
          >
            Page introuvable
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-muted-foreground mb-8 max-w-md mx-auto"
          >
            Oups ! La page que vous recherchez semble avoir disparu dans les méandres du web. 
            Elle a peut-être été déplacée ou supprimée.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button asChild size="lg">
              <Link href="/" className="gap-2">
                <Home className="h-4 w-4" />
                Retour à l&apos;accueil
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact" className="gap-2">
                <Mail className="h-4 w-4" />
                Nous contacter
              </Link>
            </Button>
          </motion.div>

          {/* Helpful links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8"
          >
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Pages populaires
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/#fonctionnalites"
                className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/50 p-4 text-left transition-all hover:border-primary/50 hover:bg-primary/5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Search className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Fonctionnalités</p>
                  <p className="text-sm text-muted-foreground">Découvrez nos outils</p>
                </div>
              </Link>
              
              <Link
                href="/#tarifs"
                className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/50 p-4 text-left transition-all hover:border-primary/50 hover:bg-primary/5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Tarifs</p>
                  <p className="text-sm text-muted-foreground">Voir nos offres</p>
                </div>
              </Link>
              
              <Link
                href="/contact"
                className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/50 p-4 text-left transition-all hover:border-primary/50 hover:bg-primary/5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Contact</p>
                  <p className="text-sm text-muted-foreground">Demander une démo</p>
                </div>
              </Link>
              
              <Link
                href="/#faq"
                className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/50 p-4 text-left transition-all hover:border-primary/50 hover:bg-primary/5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <path d="M12 17h.01" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">FAQ</p>
                  <p className="text-sm text-muted-foreground">Questions fréquentes</p>
                </div>
              </Link>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-sm text-muted-foreground"
          >
            Si vous pensez qu&apos;il s&apos;agit d&apos;une erreur,{" "}
            <Link href="/contact" className="text-primary hover:underline">
              contactez-nous
            </Link>
            .
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}
