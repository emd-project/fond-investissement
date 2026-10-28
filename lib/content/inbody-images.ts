/**
 * Images de corps propres — câblage au rendu (fix UX 2026-10-21 → 2026-10-28).
 *
 * Contexte : chaque article MDX contenait UNE seule <ArticleImage>, qui recyclait la
 * cover de sa catégorie (`/images/categories/<cat>.webp`) avec un alt décrivant une
 * scène absente de l'image. Deux images 16:9 propres par article FR ont été générées
 * sous `public/images/blog/<cat>/<slug-fr>-1|2.jpeg` (partagées par la version EN).
 *
 * Ce module, appelé par ArticleView AVANT compileMDX :
 *  1. remplace la balise <ArticleImage src="/images/categories/…"> par l'image n° 1 ;
 *  2. insère l'image n° 2 avant un H2 du milieu de l'article (au moins une section
 *     d'écart avec l'image n° 1).
 * Les alt décrivent l'image réelle, dans la locale de la page.
 *
 * Le registre `content/data/inbody-images.json` est indexé par slug FR ; la version EN
 * est résolue via `articleSlugEnToFr`. Article absent du registre → contenu inchangé.
 * `tests/unit/inbody-images.test.ts` vérifie que chaque fichier référencé existe.
 *
 * Choix assumé : câblage au rendu plutôt que réécriture des MDX (garde-fous §1 : pas
 * de réécriture de dizaines d'articles entiers pour une ligne chacun). Une passe ayant
 * un accès git pourra « cuire » les balises dans les MDX et supprimer ce module.
 */
import registry from '@/content/data/inbody-images.json'
import { articleSlugEnToFr } from '@/lib/i18n/article-slugs'

export type InBodyEntry = {
  /** Slug de catégorie (dossier de `public/images/blog/`). */
  cat: string
  /** [alt image 1, alt image 2] en FR. */
  fr: [string, string]
  /** [alt image 1, alt image 2] en EN. */
  en: [string, string]
}

export const INBODY_IMAGES = registry as unknown as Record<string, InBodyEntry>

export function inBodyImagePaths(frSlug: string): [string, string] | null {
  const e = INBODY_IMAGES[frSlug]
  if (!e) return null
  const base = `/images/blog/${e.cat}/${frSlug}`
  return [`${base}-1.jpeg`, `${base}-2.jpeg`]
}

const RECYCLED_COVER = /<ArticleImage\s+[^>]*src="\/images\/categories\/[^"]+"[^>]*\/>/

/** Attribut MDX sûr (pas de guillemet double, pas de chevrons). */
const attr = (s: string) => s.replace(/"/g, '’').replace(/[<>{}]/g, '')

const tag = (src: string, alt: string) => `<ArticleImage src="${src}" alt="${attr(alt)}" />`

/** Index (en caractères) des lignes `## ` hors blocs de code. */
function h2Offsets(content: string): number[] {
  const out: number[] = []
  let inFence = false
  let pos = 0
  for (const line of content.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence
    else if (!inFence && /^## /.test(line)) out.push(pos)
    pos += line.length + 1
  }
  return out
}

export function applyInBodyImages(content: string, locale: string, slug: string): string {
  const frSlug = locale === 'fr' ? slug : articleSlugEnToFr[slug]
  if (!frSlug) return content
  const entry = INBODY_IMAGES[frSlug]
  const paths = inBodyImagePaths(frSlug)
  if (!entry || !paths) return content
  const alts = locale === 'fr' ? entry.fr : entry.en

  const m = RECYCLED_COVER.exec(content)
  if (!m) return content // déjà « cuit » dans le MDX ou balise absente : on ne touche à rien
  const img1 = tag(paths[0], alts[0])
  let out = content.slice(0, m.index) + img1 + content.slice(m.index + m[0].length)
  const img1At = m.index

  // Image n° 2 : avant un H2 situé au milieu des sections qui suivent l'image n° 1
  // (jamais le H2 qui la suit immédiatement) ; à défaut, au milieu de celles qui précèdent.
  const h2 = h2Offsets(out)
  const after = h2.filter((o) => o > img1At)
  const before = h2.filter((o) => o < img1At)
  let at: number | undefined
  if (after.length >= 2) at = after[Math.max(1, Math.floor(after.length / 2))]
  else if (before.length >= 2) at = before[Math.max(1, Math.floor((before.length - 1) / 2))]
  if (at === undefined) return out
  out = out.slice(0, at) + tag(paths[1], alts[1]) + '\n\n' + out.slice(at)
  return out
}
