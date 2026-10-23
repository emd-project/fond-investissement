/**
 * lib/i18n/article-slugs.ts — mapping bidirectionnel des slugs d'articles entre locales.
 *
 * Rempli au fil de la publication (la tâche de rédaction quotidienne ajoute une entrée par
 * article). Slug naturel par langue (SEO) → on a besoin du mapping pour :
 *  - le sélecteur de langue (savoir où rediriger, JAMAIS une 404)
 *  - hreflang (pointer vers les bonnes alternates, et seulement si elles existent)
 *  - les redirects (taper un slug FR sur /en/... → bon slug EN)
 *
 * cf. skills/seo-geo-redaction/references/mirror-i18n.md
 */

/** Slugs d'articles FR → EN. Ex : 'meilleure-voiture-electrique-2026': 'best-electric-car-2026' */
export const articleSlugFrToEn: Record<string, string> = {
  // Articles repris du site d'origine (portage EMD du 20/10/2026), puis la tâche quotidienne.
  'comprendre-les-fonds-d-investissement': 'how-investment-funds-work',
  'fonds-de-placement-ou-fonds-d-investissement': 'placement-fund-vs-investment-fund',
  'private-equity-capital-risque-capital-developpement': 'private-equity-venture-growth-capital',
  'fonds-evergreen-ou-fonds-ferme': 'evergreen-vs-closed-end-fund',
  'invest-public-ou-fonds-prive': 'public-invest-vs-private-fund',
  'glossaire-du-financement-d-entreprise': 'business-financing-glossary',
  'lever-des-fonds-pme-etapes': 'how-to-raise-capital-sme',
  'preparer-une-levee-de-fonds': 'preparing-a-funding-round',
  'valoriser-une-pme': 'valuing-an-sme',
  'lettre-d-intention-et-term-sheet': 'letter-of-intent-and-term-sheet',
  'due-diligence': 'due-diligence-what-funds-check',
  'convention-d-actionnaires': 'shareholders-agreement',
  'clauses-de-sortie-tag-drag-leaver': 'exit-clauses-tag-drag-leaver',
  'anti-dilution-et-ratchet': 'anti-dilution-and-ratchet',
  'le-fonds-au-capital': 'a-fund-on-your-cap-table',
  'un-fonds-veut-40-pour-cent-de-mon-capital': 'fund-wants-40-percent-of-my-company',
  'fonds-propres-dette-et-quasi-capital': 'equity-debt-and-quasi-equity',
  'dette-bancaire-ou-fonds-propres': 'bank-debt-or-equity',
  'pret-subordonne': 'subordinated-loan',
  'la-banque-refuse-de-financer-mon-extension': 'bank-refuses-to-fund-my-expansion',
  'reprendre-ou-transmettre-une-pme': 'buying-or-selling-an-sme-with-a-fund',
  'management-buy-out-mbo': 'management-buy-out-mbo',
  'management-buy-in-mbi': 'management-buy-in-mbi',
  'owner-buy-out-obo': 'owner-buy-out-obo',
  'retraite-dans-quatre-ans-fonds-evergreen-ou-ferme': 'retiring-in-four-years-evergreen-or-closed-fund',
  'start-up-scale-up-et-biotech': 'funding-start-ups-scale-ups-biotech',
  'financer-une-biotech': 'funding-a-biotech-belgium',
  'tax-shelter-start-up-scale-up': 'tax-shelter-start-ups-scale-ups',
  'fonds-et-aides-par-region': 'funds-and-public-financing-by-region',
  'invests-wallons': 'walloon-invests',
  'financer-son-entreprise-a-bruxelles': 'financing-a-business-in-brussels',
  'stock-options-et-warrants-en-belgique': 'stock-options-and-warrants-belgium',
  'dette-mezzanine': 'mezzanine-debt',
}

/** Réciproque EN → FR (dérivée automatiquement). */
export const articleSlugEnToFr: Record<string, string> = Object.fromEntries(
  Object.entries(articleSlugFrToEn).map(([fr, en]) => [en, fr]),
)

/**
 * Slug équivalent dans la locale cible, ou `null` si aucune traduction connue.
 * `null` = signal au sélecteur de langue de retomber sur l'accueil (jamais une 404).
 */
export function articleSlugInOrNull(slug: string, from: string, to: string): string | null {
  if (from === to) return slug
  if (from === 'fr' && to === 'en') return articleSlugFrToEn[slug] ?? null
  if (from === 'en' && to === 'fr') return articleSlugEnToFr[slug] ?? null
  return null // autres paires (NL/DE…) : étendre ici si le site ajoute des locales
}

/** Variante tolérante : même slug en dernier recours (pour hreflang best-effort). */
export function translateArticleSlug(slug: string, from: string, to: string): string {
  return articleSlugInOrNull(slug, from, to) ?? slug
}
