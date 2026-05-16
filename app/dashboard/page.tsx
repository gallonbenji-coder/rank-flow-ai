'use client'

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts'
import {
  TrendingUp,
  TrendingDown,
  KeyRound,
  Globe,
  Zap,
} from 'lucide-react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { Badge } from '@/components/ui/badge'

// ─── Mockup data ────────────────────────────────────────────────────────────

const trafficData = [
  { month: 'Jan', trafic: 18200, leads: 210 },
  { month: 'Fév', trafic: 19800, leads: 238 },
  { month: 'Mar', trafic: 21400, leads: 256 },
  { month: 'Avr', trafic: 22100, leads: 274 },
  { month: 'Mai', trafic: 23500, leads: 295 },
  { month: 'Juin', trafic: 24832, leads: 312 },
]

const positionsData = [
  { range: '1–3', mots: 124 },
  { range: '4–10', mots: 723 },
  { range: '11–20', mots: 1240 },
  { range: '21–50', mots: 2180 },
  { range: '50+', mots: 3420 },
]

const topKeywords = [
  { keyword: 'logiciel seo automatique', position: 1, volume: 2400, trend: 'up' },
  { keyword: 'optimisation seo ia', position: 2, volume: 1900, trend: 'up' },
  { keyword: 'suivi positions google', position: 3, volume: 3200, trend: 'stable' },
  { keyword: 'audit seo automatique', position: 4, volume: 1600, trend: 'up' },
  { keyword: 'visibilité chatgpt seo', position: 6, volume: 880, trend: 'up' },
  { keyword: 'rankflow avis', position: 8, volume: 560, trend: 'down' },
]

const trafficConfig: ChartConfig = {
  trafic: { label: 'Trafic organique', color: 'oklch(0.75 0.18 270)' },
  leads: { label: 'Leads', color: 'oklch(0.65 0.15 200)' },
}

const positionsConfig: ChartConfig = {
  mots: { label: 'Mots-clés', color: 'oklch(0.70 0.18 270)' },
}

// ─── KPI cards ───────────────────────────────────────────────────────────────

const kpis = [
  {
    label: 'Trafic organique',
    value: '24 832',
    delta: '+18,2 %',
    positive: true,
    sub: 'visites ce mois',
    icon: Globe,
  },
  {
    label: 'Mots-clés Top 10',
    value: '847',
    delta: '+124',
    positive: true,
    sub: 'positions gagnées',
    icon: KeyRound,
  },
  {
    label: 'Score SEO global',
    value: '78 / 100',
    delta: '+5 pts',
    positive: true,
    sub: 'vs mois dernier',
    icon: Zap,
  },
  {
    label: 'Visibilité IA',
    value: '62 %',
    delta: '+8,3 %',
    positive: true,
    sub: 'ChatGPT · Perplexity · Gemini',
    icon: TrendingUp,
  },
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function OverviewPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      {/* Header */}
      <header className="flex items-center gap-3">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-4" />
        <div>
          <h1 className="text-lg font-semibold text-foreground">
            Vue d'ensemble
          </h1>
          <p className="text-xs text-muted-foreground">
            Données des 30 derniers jours
          </p>
        </div>
      </header>

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <Card
            key={kpi.label}
            className="border-border/50 bg-card/50 backdrop-blur-sm"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription className="text-xs font-medium uppercase tracking-wide">
                {kpi.label}
              </CardDescription>
              <div className="flex size-8 items-center justify-center rounded-lg bg-accent/10">
                <kpi.icon className="size-4 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <span
                  className={
                    kpi.positive ? 'text-emerald-400' : 'text-destructive'
                  }
                >
                  {kpi.positive ? (
                    <TrendingUp className="inline size-3 mr-0.5" />
                  ) : (
                    <TrendingDown className="inline size-3 mr-0.5" />
                  )}
                  {kpi.delta}
                </span>
                {kpi.sub}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-5">
        {/* Area chart — traffic */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">Évolution du trafic</CardTitle>
            <CardDescription>
              Trafic organique et leads — 6 derniers mois
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={trafficConfig} className="h-56 w-full">
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="gTrafic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-trafic)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-trafic)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-leads)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-leads)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11 }}
                  width={48}
                  tickFormatter={(v) =>
                    v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v
                  }
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="trafic"
                  stroke="var(--color-trafic)"
                  strokeWidth={2}
                  fill="url(#gTrafic)"
                />
                <Area
                  type="monotone"
                  dataKey="leads"
                  stroke="var(--color-leads)"
                  strokeWidth={2}
                  fill="url(#gLeads)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Bar chart — keyword positions */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Distribution des positions</CardTitle>
            <CardDescription>Mots-clés par plage de position</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={positionsConfig} className="h-56 w-full">
              <BarChart data={positionsData} layout="vertical" barSize={14}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis
                  type="number"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11 }}
                  tickFormatter={(v) =>
                    v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v
                  }
                />
                <YAxis
                  dataKey="range"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11 }}
                  width={36}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="mots"
                  fill="var(--color-mots)"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top keywords table */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base">Top mots-clés</CardTitle>
          <CardDescription>
            Vos meilleures positions sur Google ce mois-ci
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Mot-clé
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Position
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Volume / mois
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Tendance
                  </th>
                </tr>
              </thead>
              <tbody>
                {topKeywords.map((kw, i) => (
                  <tr
                    key={kw.keyword}
                    className={
                      i < topKeywords.length - 1
                        ? 'border-b border-border/30'
                        : ''
                    }
                  >
                    <td className="px-6 py-3 font-medium text-foreground">
                      {kw.keyword}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex size-7 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent">
                        {kw.position}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-muted-foreground">
                      {kw.volume.toLocaleString('fr-FR')}
                    </td>
                    <td className="px-6 py-3 text-right">
                      {kw.trend === 'up' && (
                        <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20">
                          <TrendingUp className="mr-1 size-3" /> Hausse
                        </Badge>
                      )}
                      {kw.trend === 'down' && (
                        <Badge className="bg-destructive/15 text-destructive border-destructive/20 hover:bg-destructive/20">
                          <TrendingDown className="mr-1 size-3" /> Baisse
                        </Badge>
                      )}
                      {kw.trend === 'stable' && (
                        <Badge variant="secondary">Stable</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
