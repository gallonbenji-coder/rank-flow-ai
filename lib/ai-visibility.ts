// ─── Types ───────────────────────────────────────────────────────────────────

export interface SectionResult {
  score: number
  maxScore: number
  response: string
  label: string
  description: string
}

export interface VisibilityResult {
  score: number
  brand: string
  service: string
  analyzedAt: string
  sections: {
    notoriete: SectionResult
    pertinence: SectionResult
    reputation: SectionResult
  }
  recommendations: string[]
}

// ─── Plan limits ─────────────────────────────────────────────────────────────

export const PLAN_LIMITS: Record<string, number> = {
  free:    1,
  starter: 10,
  growth:  50,
  scale:   -1, // unlimited
}

// ─── Scoring helpers ─────────────────────────────────────────────────────────

const NEGATIVE_PATTERNS = [
  "je ne connais pas",
  "je n'ai pas d'information",
  "je n'ai pas d'informations",
  "aucune information",
  "inconnu",
  "ne dispose pas",
  "marque fictive",
  "pas d'information",
  "je ne dispose",
  "i don't have",
  "not aware",
  "no information",
  "not familiar",
  "don't know",
]

const PERTINENCE_POSITIVE = [
  "oui", "mentionnerais", "recommand", "suggér", "certainement",
  "absolument", "bien sûr", "effectivement", "probablement",
  "would mention", "would recommend", "yes,", "yes i",
]

const REPUTATION_POSITIVE = [
  "bonne réputation", "excellente réputation", "réputé", "bien connu",
  "populaire", "fiable", "solide", "positif", "reconnu", "crédible",
  "good reputation", "well-known", "trusted", "reliable", "positive",
]

const REPUTATION_NEGATIVE = [
  "mauvaise réputation", "controversé", "problème", "arnaque",
  "négatif", "critiqué", "bad reputation", "controversial", "scam",
]

function hasAny(text: string, patterns: string[]): boolean {
  const lower = text.toLowerCase()
  return patterns.some(p => lower.includes(p))
}

function scoreSection(response: string, positivePatterns: string[], negativeExtra: string[], maxScore: number): number {
  if (hasAny(response, NEGATIVE_PATTERNS) || hasAny(response, negativeExtra)) {
    // Unknown brand → 0–18 % of max
    return Math.round(maxScore * 0.12)
  }
  if (hasAny(response, positivePatterns)) {
    // Strong positive signal → 78–95 % of max
    const bonus = Math.min(response.length / 400, 0.17)
    return Math.round(maxScore * (0.78 + bonus))
  }
  // Neutral / partial knowledge → 42–68 % of max
  const lengthFactor = Math.min(response.length / 500, 0.26)
  return Math.round(maxScore * (0.42 + lengthFactor))
}

// ─── Main scorer ─────────────────────────────────────────────────────────────

export function calculateScores(
  brand: string,
  notorieteResponse: string,
  pertinenceResponse: string,
  reputationResponse: string
): VisibilityResult {
  const notorieteScore  = scoreSection(notorieteResponse,  [], [], 33)
  const pertinenceScore = scoreSection(pertinenceResponse, PERTINENCE_POSITIVE, [], 33)
  const reputationScore = scoreSection(reputationResponse, REPUTATION_POSITIVE, REPUTATION_NEGATIVE, 34)

  const total = notorieteScore + pertinenceScore + reputationScore

  const recommendations = buildRecommendations(brand, notorieteScore, pertinenceScore, reputationScore)

  return {
    score: total,
    brand,
    service: '',
    analyzedAt: new Date().toISOString(),
    sections: {
      notoriete: {
        score: notorieteScore,
        maxScore: 33,
        response: notorieteResponse,
        label: 'Notoriété IA',
        description: 'Les IA connaissent-elles votre marque ?',
      },
      pertinence: {
        score: pertinenceScore,
        maxScore: 33,
        response: pertinenceResponse,
        label: 'Pertinence',
        description: 'Les IA vous recommandent-elles ?',
      },
      reputation: {
        score: reputationScore,
        maxScore: 34,
        response: reputationResponse,
        label: 'Réputation',
        description: 'Comment les IA vous décrivent-elles ?',
      },
    },
    recommendations,
  }
}

// ─── Recommendations ─────────────────────────────────────────────────────────

function buildRecommendations(
  brand: string,
  notoriete: number,
  pertinence: number,
  reputation: number
): string[] {
  const recs: string[] = []

  if (notoriete < 14) {
    recs.push(
      `Créez du contenu éducatif sur ${brand} : articles de blog, études de cas, pages Wikipedia, communiqués de presse. Plus les IA indexent d'informations fiables sur vous, mieux elles vous connaîtront.`
    )
    recs.push(
      "Renforcez votre présence sur des sources d'autorité (LinkedIn, Crunchbase, sites sectoriels) pour que les modèles d'IA associent votre marque à des entités vérifiables."
    )
  } else if (notoriete < 22) {
    recs.push(
      `${brand} est partiellement connue des IA. Publiez régulièrement du contenu structuré (FAQ, How-to, données chiffrées) pour consolider cette reconnaissance.`
    )
  }

  if (pertinence < 14) {
    recs.push(
      "Positionnez-vous comme une référence dans votre domaine : créez du contenu qui répond aux questions précises de vos clients cibles, pour que les IA vous citent naturellement en réponse à ces requêtes."
    )
  } else if (pertinence < 22) {
    recs.push(
      "Optimisez votre contenu pour l'AEO (Answer Engine Optimization) : structurez vos pages avec des questions/réponses claires, des données vérifiables et des sources citées."
    )
  }

  if (reputation < 14) {
    recs.push(
      "Travaillez activement votre e-réputation : encouragez vos clients satisfaits à laisser des avis sur Google, Trustpilot et G2. Les IA agrègent ces signaux pour évaluer la réputation d'une marque."
    )
  } else if (reputation < 24) {
    recs.push(
      "Amplifiez les mentions positives de votre marque : partenariats avec des influenceurs sectoriels, relations presse, témoignages clients publiés sur des sites tiers reconnus."
    )
  }

  // General AEO recommendations
  recs.push(
    "Adoptez une stratégie AEO (AI Engine Optimization) : structurez votre contenu en blocs question/réponse, utilisez du balisage Schema.org et maintenez des informations à jour sur votre site."
  )

  return recs.slice(0, 4)
}
