"use client"

import { useState, useEffect, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Sparkles, CheckCircle2, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// ─── Types ────────────────────────────────────────────────────────────────────

interface WaitlistButtonProps {
  children: ReactNode
  variant?: "default" | "outline" | "secondary" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

// ─── Modal content ────────────────────────────────────────────────────────────

function WaitlistForm({ onSuccess }: { onSuccess: (count: number) => void }) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    fetch("/api/waitlist")
      .then((r) => r.json())
      .then((d) => { if (typeof d.count === "number") setCount(d.count) })
      .catch(() => {})
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? "Une erreur est survenue.")
        return
      }

      onSuccess(data.count ?? (count ?? 0) + 1)
    } catch {
      setError("Impossible de contacter le serveur. Réessayez.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-2">
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-destructive-foreground bg-destructive/15 border border-destructive/30 rounded-lg px-4 py-2.5"
        >
          {error}
        </motion.p>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="waitlist-email">Adresse e-mail</Label>
        <Input
          id="waitlist-email"
          type="email"
          placeholder="vous@exemple.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-input border-border h-11"
          required
          disabled={loading}
          autoFocus
        />
      </div>

      <Button
        type="submit"
        className="w-full h-11 font-medium"
        disabled={loading || !email.trim()}
      >
        {loading ? (
          <><Loader2 className="mr-2 size-4 animate-spin" />Inscription en cours…</>
        ) : (
          <>Je veux accès en priorité<ArrowRight className="ml-2 size-4" /></>
        )}
      </Button>

      {/* Counter */}
      <div className="flex items-center justify-center gap-2 pt-1">
        <Users className="size-3.5 text-muted-foreground" />
        <p className="text-xs text-muted-foreground text-center">
          {count !== null ? (
            <><span className="font-semibold text-foreground">{count.toLocaleString("fr-FR")}</span> personne{count > 1 ? "s" : ""} déjà inscrite{count > 1 ? "s" : ""}</>
          ) : (
            <span className="inline-block w-16 h-3 bg-muted/50 rounded animate-pulse" />
          )}
        </p>
      </div>
    </form>
  )
}

function WaitlistSuccess({ count }: { count: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center text-center py-4 gap-4"
    >
      <div className="flex size-16 items-center justify-center rounded-full bg-accent/15 border border-accent/25">
        <CheckCircle2 className="size-8 text-accent" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground">Vous êtes sur la liste !</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Vous serez parmi les premiers notifiés au lancement.
        </p>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Users className="size-3.5" />
        <span>
          <span className="font-semibold text-foreground">{count.toLocaleString("fr-FR")}</span> personnes dans la liste
        </span>
      </div>
    </motion.div>
  )
}

// ─── Exported button + modal ──────────────────────────────────────────────────

export function WaitlistButton({ children, variant = "default", size = "default", className }: WaitlistButtonProps) {
  const [open, setOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const [finalCount, setFinalCount] = useState(0)

  function handleSuccess(count: number) {
    setFinalCount(count)
    setSuccess(true)
  }

  function handleOpenChange(v: boolean) {
    setOpen(v)
    if (!v) {
      // reset after close animation
      setTimeout(() => setSuccess(false), 300)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          {children}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md border-border/50 bg-card">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-lg">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-accent/15 rounded-full blur-[80px] opacity-50" />
        </div>

        <div className="relative z-10">
          <DialogHeader className="space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs text-accent">
                <Sparkles className="size-3" />
                Early Access
              </span>
            </div>
            <DialogTitle className="text-xl font-bold text-foreground">
              Rejoignez la liste d'attente
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
              Soyez parmi les premiers à mesurer votre visibilité dans ChatGPT, Google et Perplexity.
            </DialogDescription>
          </DialogHeader>

          <AnimatePresence mode="wait">
            {success ? (
              <WaitlistSuccess key="success" count={finalCount} />
            ) : (
              <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <WaitlistForm onSuccess={handleSuccess} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}
