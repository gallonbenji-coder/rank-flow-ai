"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import Link from "next/link"
import { Eye, EyeOff, Loader2, Sparkles, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"

const schema = z.object({
  fullName: z.string().min(2, "Veuillez entrer votre nom complet"),
  email: z.string().email("Adresse e-mail invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(/[A-Z]/, "Au moins une majuscule")
    .regex(/[0-9]/, "Au moins un chiffre"),
})

type FormData = z.infer<typeof schema>

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    setServerError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { full_name: data.fullName },
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (error) {
      setServerError(
        error.message === "User already registered"
          ? "Un compte existe déjà avec cet e-mail."
          : "Une erreur est survenue. Veuillez réessayer."
      )
      return
    }

    setSuccess(true)
  }

  if (success) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-accent/20 rounded-full blur-[120px] opacity-40" />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 w-full max-w-md text-center"
        >
          <div className="rounded-xl border border-border bg-card p-10 shadow-lg shadow-black/20">
            <div className="flex justify-center mb-4">
              <span className="flex items-center justify-center w-16 h-16 rounded-full bg-accent/15 border border-accent/25">
                <CheckCircle2 className="w-8 h-8 text-accent" />
              </span>
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Vérifiez votre boîte mail</h2>
            <p className="text-sm text-muted-foreground">
              Un lien de confirmation vous a été envoyé. Cliquez dessus pour activer votre compte et accéder à votre tableau de bord.
            </p>
            <Link
              href="/login"
              className="inline-block mt-6 text-sm text-accent hover:text-accent/80 font-medium transition-colors"
            >
              Retour à la connexion
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-accent/20 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[oklch(0.60_0.20_300)]/15 rounded-full blur-[100px] opacity-30" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo / brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-sm text-accent">
              <Sparkles className="w-3.5 h-3.5" />
              RankFlow AI
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Créer votre compte</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Commencez gratuitement, sans carte bancaire
          </p>
        </div>

        {/* Card */}
        <div className="rounded-xl border border-border bg-card p-8 shadow-lg shadow-black/20">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            {serverError && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-destructive-foreground bg-destructive/15 border border-destructive/30 rounded-lg px-4 py-2.5"
              >
                {serverError}
              </motion.p>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="fullName">Nom complet</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Jean Dupont"
                autoComplete="name"
                {...register("fullName")}
                className="bg-input border-border placeholder:text-muted-foreground/50"
              />
              {errors.fullName && (
                <p className="text-xs text-destructive-foreground">{errors.fullName.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="vous@exemple.com"
                autoComplete="email"
                {...register("email")}
                className="bg-input border-border placeholder:text-muted-foreground/50"
              />
              {errors.email && (
                <p className="text-xs text-destructive-foreground">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="8 caractères minimum"
                  autoComplete="new-password"
                  {...register("password")}
                  className="bg-input border-border pr-10 placeholder:text-muted-foreground/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive-foreground">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-11 font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Création en cours…
                </>
              ) : (
                "Créer mon compte"
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              En créant un compte, vous acceptez nos{" "}
              <Link href="/cgv" className="text-accent hover:text-accent/80 transition-colors">
                CGV
              </Link>{" "}
              et notre{" "}
              <Link href="/confidentialite" className="text-accent hover:text-accent/80 transition-colors">
                politique de confidentialité
              </Link>
              .
            </p>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Déjà un compte ?{" "}
            <Link
              href="/login"
              className="text-accent hover:text-accent/80 font-medium transition-colors"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
