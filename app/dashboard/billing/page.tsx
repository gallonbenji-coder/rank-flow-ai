import { Check, Sparkles, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PLANS } from '@/lib/stripe-config'

const PLAN_FEATURES: Record<string, string[]> = {
  starter: [
    "Jusqu'à 1 000 mots-clés suivis",
    '5 concurrents surveillés',
    'Rapports de visibilité IA basiques',
    'Audits SEO hebdomadaires',
    'Support par email',
  ],
  growth: [
    "Jusqu'à 10 000 mots-clés suivis",
    '25 concurrents surveillés',
    'Rapports de visibilité IA avancés',
    'Audits SEO quotidiens',
    'Suggestions de contenu',
    'Accès API',
    'Support prioritaire',
  ],
  scale: [
    'Mots-clés illimités',
    'Concurrents illimités',
    'Rapports de visibilité IA personnalisés',
    'Audits SEO en temps réel',
    'Génération de contenu IA',
    'Accès API complet',
    'Gestionnaire de compte dédié',
    'Intégrations personnalisées',
  ],
}

function formatPrice(amount: number) {
  return `${(amount / 100).toLocaleString('fr-FR')} €`
}

export default async function BillingPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user!.id)
    .maybeSingle()

  const activePlanId = subscription?.plan_id as keyof typeof PLANS | null
  const activePlan = activePlanId ? PLANS[activePlanId] : null
  const features = activePlanId ? PLAN_FEATURES[activePlanId] : []

  const renewDate = subscription?.current_period_end
    ? new Date(subscription.current_period_end).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      {/* Header */}
      <header className="flex items-center gap-3">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-4" />
        <div>
          <h1 className="text-lg font-semibold text-foreground">Facturation</h1>
          <p className="text-xs text-muted-foreground">
            Gérez votre abonnement et vos paiements
          </p>
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Current plan */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div>
                <CardTitle className="text-base">Plan actuel</CardTitle>
                <CardDescription>
                  {activePlan
                    ? 'Votre abonnement est actif.'
                    : 'Aucun abonnement actif.'}
                </CardDescription>
              </div>
              {subscription?.status && (
                <Badge
                  className={
                    subscription.status === 'active'
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20'
                      : 'bg-destructive/15 text-destructive border-destructive/20'
                  }
                >
                  {subscription.status === 'active' ? 'Actif' : subscription.status}
                </Badge>
              )}
            </CardHeader>

            {activePlan ? (
              <>
                <CardContent className="space-y-4">
                  {/* Plan name + price */}
                  <div className="flex items-baseline gap-2">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-accent/15">
                      <Sparkles className="size-5 text-accent" />
                    </div>
                    <div className="ml-1">
                      <p className="text-xl font-bold text-foreground">
                        {activePlan.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(activePlan.amount)} / mois
                        {renewDate && ` · Renouvellement le ${renewDate}`}
                      </p>
                    </div>
                  </div>

                  <Separator className="opacity-50" />

                  {/* Features */}
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="flex flex-wrap gap-3 border-t border-border/30 pt-4">
                  <Button asChild>
                    <Link href="/#pricing">
                      Changer de plan
                      <ArrowUpRight className="ml-1.5 size-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="border-border/50">
                    Télécharger les factures
                  </Button>
                </CardFooter>
              </>
            ) : (
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Vous n'avez pas encore d'abonnement. Choisissez un plan pour
                  accéder à toutes les fonctionnalités de RankFlow AI.
                </p>
                <Button asChild>
                  <Link href="/#pricing">
                    Voir les plans
                    <ArrowUpRight className="ml-1.5 size-4" />
                  </Link>
                </Button>
              </CardContent>
            )}
          </Card>
        </div>

        {/* Billing info sidebar */}
        <div className="flex flex-col gap-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sm">Résumé</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plan</span>
                <span className="font-medium text-foreground">
                  {activePlan?.name ?? '—'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Montant</span>
                <span className="font-medium text-foreground">
                  {activePlan ? formatPrice(activePlan.amount) + ' / mois' : '—'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Statut</span>
                <span className="font-medium text-foreground capitalize">
                  {subscription?.status ?? '—'}
                </span>
              </div>
              {renewDate && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Renouvellement</span>
                  <span className="font-medium text-foreground">{renewDate}</span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sm">Besoin d'aide ?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                Pour toute question sur votre facturation, contactez notre
                support.
              </p>
              <Button asChild variant="outline" className="w-full border-border/50 text-xs">
                <Link href="/contact">Contacter le support</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
