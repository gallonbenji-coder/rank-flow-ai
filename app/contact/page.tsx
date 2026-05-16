"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Send, Calendar, Mail, Phone, Building2, User, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Contact() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    message: "",
    requestType: "demo"
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Redirect to thank you page
    router.push("/merci")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[128px]" />
        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-accent/20 blur-[128px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            href="/" 
            className="mb-8 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à l&apos;accueil
          </Link>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left column - Info */}
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Demandez une démo personnalisée
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Découvrez comment RankFlow AI peut transformer votre visibilité en ligne. 
                Notre équipe vous contactera sous 24h pour organiser une démonstration adaptée à vos besoins.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Démo personnalisée de 30 min</h3>
                    <p className="text-muted-foreground">
                      Un expert vous présente la plateforme avec vos propres données
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Audit gratuit de votre visibilité</h3>
                    <p className="text-muted-foreground">
                      Recevez un rapport complet sur votre présence SEO et IA
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Réponse sous 24h</h3>
                    <p className="text-muted-foreground">
                      Notre équipe vous recontacte rapidement pour fixer un créneau
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6">
                <p className="text-sm text-muted-foreground mb-2">Vous préférez nous contacter directement ?</p>
                <div className="space-y-2">
                  <a href="mailto:contact@rankflow.ai" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                    <Mail className="h-4 w-4" />
                    contact@rankflow.ai
                  </a>
                  <a href="tel:+33100000000" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                    <Phone className="h-4 w-4" />
                    +33 1 00 00 00 00
                  </a>
                </div>
              </div>
            </div>

            {/* Right column - Form */}
            <div>
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                onSubmit={handleSubmit}
                className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8"
              >
                <div className="mb-6">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Type de demande
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, requestType: "demo" }))}
                      className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                        formData.requestType === "demo"
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-background text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      Demander une démo
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, requestType: "contact" }))}
                      className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                        formData.requestType === "contact"
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-background text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      Question générale
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="text-sm font-medium text-foreground mb-2 block">
                      Prénom *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="pl-10"
                        placeholder="Jean"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="lastName" className="text-sm font-medium text-foreground mb-2 block">
                      Nom *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="pl-10"
                        placeholder="Dupont"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="email" className="text-sm font-medium text-foreground mb-2 block">
                    Email professionnel *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="jean.dupont@entreprise.fr"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="phone" className="text-sm font-medium text-foreground mb-2 block">
                    Téléphone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="+33 6 00 00 00 00"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 mt-4">
                  <div>
                    <label htmlFor="company" className="text-sm font-medium text-foreground mb-2 block">
                      Entreprise *
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        required
                        value={formData.company}
                        onChange={handleChange}
                        className="pl-10"
                        placeholder="Mon Entreprise"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="website" className="text-sm font-medium text-foreground mb-2 block">
                      Site web
                    </label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://monsite.fr"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="message" className="text-sm font-medium text-foreground mb-2 block">
                    Votre message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                    placeholder="Parlez-nous de vos objectifs SEO et de votre projet..."
                  />
                </div>

                <div className="mt-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-muted-foreground">
                      J&apos;accepte que mes données soient traitées conformément à la{" "}
                      <Link href="/confidentialite" className="text-primary hover:underline">
                        politique de confidentialité
                      </Link>{" "}
                      pour répondre à ma demande. *
                    </span>
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 w-full h-12 text-base font-semibold"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Envoi en cours...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-5 w-5" />
                      Envoyer ma demande
                    </span>
                  )}
                </Button>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  En soumettant ce formulaire, vous acceptez d&apos;être contacté par notre équipe commerciale.
                </p>
              </motion.form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
