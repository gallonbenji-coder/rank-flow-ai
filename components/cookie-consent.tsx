"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Cookie, X, Settings, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

type CookiePreferences = {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  preferences: boolean
}

const COOKIE_CONSENT_KEY = "rankflow_cookie_consent"
const COOKIE_PREFERENCES_KEY = "rankflow_cookie_preferences"

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  })

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!consent) {
      // Show banner after a small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const saveConsent = (acceptAll: boolean) => {
    const newPreferences = acceptAll
      ? { necessary: true, analytics: true, marketing: true, preferences: true }
      : preferences

    localStorage.setItem(COOKIE_CONSENT_KEY, "true")
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(newPreferences))
    setIsVisible(false)

    // Here you would typically initialize analytics/marketing scripts based on preferences
    if (newPreferences.analytics) {
      // Initialize analytics (Google Analytics, etc.)
      console.log("Analytics cookies accepted")
    }
    if (newPreferences.marketing) {
      // Initialize marketing cookies (Facebook Pixel, etc.)
      console.log("Marketing cookies accepted")
    }
  }

  const handleAcceptAll = () => {
    saveConsent(true)
  }

  const handleRejectAll = () => {
    setPreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    })
    saveConsent(false)
  }

  const handleSavePreferences = () => {
    saveConsent(false)
  }

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === "necessary") return // Necessary cookies can't be disabled
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="mx-auto max-w-4xl rounded-2xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl">
            {!showDetails ? (
              // Simple banner
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Cookie className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Nous respectons votre vie privée
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et personnaliser le contenu. 
                      Vous pouvez accepter tous les cookies ou personnaliser vos préférences.{" "}
                      <Link href="/confidentialite" className="text-primary hover:underline">
                        En savoir plus
                      </Link>
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button onClick={handleAcceptAll} size="sm">
                        Tout accepter
                      </Button>
                      <Button onClick={handleRejectAll} variant="outline" size="sm">
                        Tout refuser
                      </Button>
                      <Button
                        onClick={() => setShowDetails(true)}
                        variant="ghost"
                        size="sm"
                        className="gap-2"
                      >
                        <Settings className="h-4 w-4" />
                        Personnaliser
                      </Button>
                    </div>
                  </div>
                  <button
                    onClick={handleRejectAll}
                    className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Fermer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ) : (
              // Detailed preferences panel
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <Settings className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Paramètres des cookies
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  {/* Necessary cookies */}
                  <div className="flex items-start justify-between gap-4 rounded-xl border border-border/50 bg-background/50 p-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-foreground">Cookies essentiels</h4>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          Requis
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Nécessaires au fonctionnement du site. Ils permettent la navigation et l&apos;accès aux zones sécurisées.
                      </p>
                    </div>
                    <div className="flex h-6 w-11 shrink-0 items-center rounded-full bg-primary px-1 cursor-not-allowed opacity-70">
                      <div className="h-4 w-4 rounded-full bg-white translate-x-5" />
                    </div>
                  </div>

                  {/* Analytics cookies */}
                  <div className="flex items-start justify-between gap-4 rounded-xl border border-border/50 bg-background/50 p-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Cookies analytiques</h4>
                      <p className="text-sm text-muted-foreground">
                        Nous aident à comprendre comment vous utilisez le site pour améliorer votre expérience.
                      </p>
                    </div>
                    <button
                      onClick={() => togglePreference("analytics")}
                      className={`flex h-6 w-11 shrink-0 items-center rounded-full px-1 transition-colors ${
                        preferences.analytics ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      <div
                        className={`h-4 w-4 rounded-full bg-white transition-transform ${
                          preferences.analytics ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Marketing cookies */}
                  <div className="flex items-start justify-between gap-4 rounded-xl border border-border/50 bg-background/50 p-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Cookies marketing</h4>
                      <p className="text-sm text-muted-foreground">
                        Utilisés pour vous proposer des publicités pertinentes et mesurer l&apos;efficacité de nos campagnes.
                      </p>
                    </div>
                    <button
                      onClick={() => togglePreference("marketing")}
                      className={`flex h-6 w-11 shrink-0 items-center rounded-full px-1 transition-colors ${
                        preferences.marketing ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      <div
                        className={`h-4 w-4 rounded-full bg-white transition-transform ${
                          preferences.marketing ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Preferences cookies */}
                  <div className="flex items-start justify-between gap-4 rounded-xl border border-border/50 bg-background/50 p-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Cookies de préférences</h4>
                      <p className="text-sm text-muted-foreground">
                        Permettent de mémoriser vos choix (langue, région) pour une expérience personnalisée.
                      </p>
                    </div>
                    <button
                      onClick={() => togglePreference("preferences")}
                      className={`flex h-6 w-11 shrink-0 items-center rounded-full px-1 transition-colors ${
                        preferences.preferences ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      <div
                        className={`h-4 w-4 rounded-full bg-white transition-transform ${
                          preferences.preferences ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border/50">
                  <Link
                    href="/confidentialite"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Politique de confidentialité
                  </Link>
                  <div className="flex items-center gap-3">
                    <Button onClick={handleRejectAll} variant="outline" size="sm">
                      Tout refuser
                    </Button>
                    <Button onClick={handleSavePreferences} size="sm" className="gap-2">
                      <Check className="h-4 w-4" />
                      Enregistrer mes choix
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
