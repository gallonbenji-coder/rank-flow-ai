'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles, Search, Download, AlertCircle,
  Brain, Target, Star, ChevronRight, Loader2,
  TrendingUp, TrendingDown, Minus,
} from 'lucide-react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import type { VisibilityResult } from '@/lib/ai-visibility'

// ─── Score gauge ──────────────────────────────────────────────────────────────

function ScoreGauge({ score }: { score: number }) {
  const color =
    score >= 70 ? 'text-emerald-400' :
    score >= 40 ? 'text-amber-400' :
    'text-red-400'

  const label =
    score >= 70 ? 'Excellente visibilité' :
    score >= 40 ? 'Visibilité modérée' :
    'Visibilité faible'

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative flex items-center justify-center size-36">
        <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor"
            className="text-border/40" strokeWidth="8" />
          <circle cx="50" cy="50" r="40" fill="none"
            stroke="currentColor"
            className={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 40}`}
            strokeDashoffset={`${2 * Math.PI * 40 * (1 - score / 100)}`}
            style={{ transition: 'stroke-dashoffset 1s ease' }}
          />
        </svg>
        <div className="flex flex-col items-center">
          <span className={`text-4xl font-bold ${color}`}>{score}</span>
          <span className="text-xs text-muted-foreground">/100</span>
        </div>
      </div>
      <Badge
        className={
          score >= 70 ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' :
          score >= 40 ? 'bg-amber-500/15 text-amber-400 border-amber-500/20' :
          'bg-red-500/15 text-red-400 border-red-500/20'
        }
      >
        {label}
      </Badge>
    </div>
  )
}

// ─── Section card ─────────────────────────────────────────────────────────────

const sectionIcons = {
  notoriete: Brain,
  pertinence: Target,
  reputation: Star,
}

function SectionCard({
  sectionKey,
  section,
}: {
  sectionKey: 'notoriete' | 'pertinence' | 'reputation'
  section: VisibilityResult['sections']['notoriete']
}) {
  const [expanded, setExpanded] = useState(false)
  const Icon = sectionIcons[sectionKey]
  const pct = Math.round((section.score / section.maxScore) * 100)

  const color =
    pct >= 70 ? 'text-emerald-400' :
    pct >= 40 ? 'text-amber-400' :
    'text-red-400'

  const progressColor =
    pct >= 70 ? '[&>div]:bg-emerald-400' :
    pct >= 40 ? '[&>div]:bg-amber-400' :
    '[&>div]:bg-red-400'

  const TrendIcon = pct >= 70 ? TrendingUp : pct >= 40 ? Minus : TrendingDown

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-accent/10">
              <Icon className="size-4 text-accent" />
            </div>
            <div>
              <CardTitle className="text-sm">{section.label}</CardTitle>
              <CardDescription className="text-xs">{section.description}</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendIcon className={`size-4 ${color}`} />
            <span className={`text-lg font-bold ${color}`}>
              {section.score}
              <span className="text-xs text-muted-foreground font-normal">/{section.maxScore}</span>
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Progress value={pct} className={`h-2 bg-border/40 ${progressColor}`} />
        <button
          onClick={() => setExpanded(v => !v)}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronRight className={`size-3 transition-transform ${expanded ? 'rotate-90' : ''}`} />
          Voir la réponse de l'IA
        </button>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <p className="text-xs text-muted-foreground leading-relaxed rounded-lg bg-muted/30 border border-border/40 p-3 italic">
                "{section.response}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

// ─── Usage badge ──────────────────────────────────────────────────────────────

function UsageBadge({ used, limit, planId }: { used: number; limit: number; planId: string }) {
  const isUnlimited = limit === -1
  const remaining = isUnlimited ? '∞' : `${limit - used} restante${limit - used > 1 ? 's' : ''}`
  const isLow = !isUnlimited && (limit - used) <= 1

  return (
    <Badge
      className={
        isLow
          ? 'bg-amber-500/15 text-amber-400 border-amber-500/20'
          : 'bg-accent/10 text-accent border-accent/20'
      }
    >
      <Sparkles className="size-3 mr-1" />
      {isUnlimited ? 'Analyses illimitées' : `${remaining} ce mois`}
      {!isUnlimited && (
        <span className="ml-1 opacity-60">· Plan {planId}</span>
      )}
    </Badge>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AIVisibilityPage() {
  const [brand, setBrand] = useState('')
  const [service, setService] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<VisibilityResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [usage, setUsage] = useState<{ used: number; limit: number; planId: string } | null>(null)
  const reportRef = useRef<HTMLDivElement>(null)

  // Load usage on mount
  useState(() => {
    fetch('/api/ai-visibility')
      .then(r => r.json())
      .then(data => { if (!data.error) setUsage(data) })
      .catch(() => {})
  })

  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault()
    if (!brand.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('/api/ai-visibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brand: brand.trim(), service: service.trim() || brand.trim() }),
      })

      const data = await res.json()

      if (!res.ok) {
        if (res.status === 429) {
          setError(`Limite mensuelle atteinte (${data.limit} analyses/mois pour le plan ${data.planId}). Passez à un plan supérieur pour continuer.`)
        } else {
          setError(data.error ?? 'Une erreur est survenue.')
        }
        return
      }

      setResult(data)
      // Refresh usage
      fetch('/api/ai-visibility')
        .then(r => r.json())
        .then(d => { if (!d.error) setUsage(d) })
        .catch(() => {})
    } catch {
      setError('Impossible de contacter le serveur. Vérifiez votre connexion.')
    } finally {
      setLoading(false)
    }
  }

  function handleExportPDF() {
    window.print()
  }

  return (
    <>
      {/* Print styles */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #ai-report, #ai-report * { visibility: visible; }
          #ai-report { position: fixed; inset: 0; padding: 2rem; }
          .no-print { display: none !important; }
          .print-break { page-break-inside: avoid; }
        }
      `}</style>

      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
        {/* Header */}
        <header className="flex items-center gap-3 no-print">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-4" />
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Brain className="size-5 text-accent" />
              AI Visibility Checker
            </h1>
            <p className="text-xs text-muted-foreground">
              Mesurez comment les IA connaissent et recommandent votre marque
            </p>
          </div>
          {usage && (
            <UsageBadge used={usage.used} limit={usage.limit} planId={usage.planId} />
          )}
        </header>

        {/* Search form */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm no-print">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Analyser une marque</CardTitle>
            <CardDescription>
              Entrez le nom de votre marque ou domaine pour obtenir votre score de visibilité IA
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAnalyze} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 space-y-1.5">
                <Label htmlFor="brand" className="text-xs">Nom de la marque / domaine</Label>
                <Input
                  id="brand"
                  placeholder="ex: RankFlow AI, apple.com, Notion…"
                  value={brand}
                  onChange={e => setBrand(e.target.value)}
                  className="bg-input border-border"
                  disabled={loading}
                />
              </div>
              <div className="flex-1 space-y-1.5">
                <Label htmlFor="service" className="text-xs">Service associé <span className="text-muted-foreground">(optionnel)</span></Label>
                <Input
                  id="service"
                  placeholder="ex: logiciel SEO, gestion de projet…"
                  value={service}
                  onChange={e => setService(e.target.value)}
                  className="bg-input border-border"
                  disabled={loading}
                />
              </div>
              <div className="flex items-end">
                <Button
                  type="submit"
                  disabled={loading || !brand.trim()}
                  className="h-10 px-6 w-full sm:w-auto"
                >
                  {loading ? (
                    <><Loader2 className="mr-2 size-4 animate-spin" />Analyse…</>
                  ) : (
                    <><Search className="mr-2 size-4" />Analyser</>
                  )}
                </Button>
              </div>
            </form>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 flex items-start gap-2 text-sm text-destructive-foreground bg-destructive/15 border border-destructive/30 rounded-lg px-4 py-3"
                >
                  <AlertCircle className="size-4 mt-0.5 shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Loading skeleton */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4 no-print"
            >
              {[1, 2, 3].map(i => (
                <div key={i} className="h-28 rounded-xl bg-card/50 border border-border/50 animate-pulse" />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {result && !loading && (
            <motion.div
              id="ai-report"
              ref={reportRef}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              {/* Score overview */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm print-break">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">
                        Rapport — {result.brand}
                      </CardTitle>
                      <CardDescription>
                        Analysé le {new Date(result.analyzedAt).toLocaleDateString('fr-FR', {
                          day: 'numeric', month: 'long', year: 'numeric',
                        })}
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleExportPDF}
                      className="no-print border-border/50 hover:bg-accent/10 hover:text-accent hover:border-accent/30"
                    >
                      <Download className="mr-2 size-4" />
                      Exporter PDF
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row items-center gap-8">
                  <ScoreGauge score={result.score} />
                  <div className="flex-1 space-y-3 w-full">
                    {(Object.entries(result.sections) as [keyof typeof result.sections, VisibilityResult['sections']['notoriete']][]).map(([key, section]) => {
                      const pct = Math.round((section.score / section.maxScore) * 100)
                      const barColor =
                        pct >= 70 ? '[&>div]:bg-emerald-400' :
                        pct >= 40 ? '[&>div]:bg-amber-400' :
                        '[&>div]:bg-red-400'
                      return (
                        <div key={key} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">{section.label}</span>
                            <span className="font-medium text-foreground">{section.score}/{section.maxScore}</span>
                          </div>
                          <Progress value={pct} className={`h-1.5 bg-border/40 ${barColor}`} />
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* 3 sections */}
              <div className="grid gap-4 md:grid-cols-3">
                {(Object.entries(result.sections) as [keyof typeof result.sections, VisibilityResult['sections']['notoriete']][]).map(([key, section]) => (
                  <SectionCard key={key} sectionKey={key} section={section} />
                ))}
              </div>

              {/* Recommendations */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm print-break">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingUp className="size-4 text-accent" />
                    Recommandations pour améliorer votre score
                  </CardTitle>
                  <CardDescription>
                    Actions concrètes pour augmenter votre visibilité dans les IA
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {result.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex size-5 items-center justify-center rounded-full bg-accent/20 text-accent text-xs font-bold shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <p className="text-sm text-muted-foreground leading-relaxed">{rec}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Plan limits reminder */}
              {usage && usage.limit !== -1 && (
                <p className="text-center text-xs text-muted-foreground no-print">
                  {usage.limit - usage.used} analyse{usage.limit - usage.used > 1 ? 's' : ''} restante{usage.limit - usage.used > 1 ? 's' : ''} ce mois sur votre plan {usage.planId}.{' '}
                  <a href="/dashboard/billing" className="text-accent hover:underline">
                    Passer à un plan supérieur →
                  </a>
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {!result && !loading && !error && (
          <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-accent/10 border border-accent/20">
              <Brain className="size-8 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Aucune analyse encore</p>
              <p className="mt-1 text-xs text-muted-foreground max-w-xs">
                Entrez le nom de votre marque ci-dessus pour découvrir comment les IA vous perçoivent.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
