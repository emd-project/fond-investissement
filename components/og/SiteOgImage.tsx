/**
 * components/og/SiteOgImage.tsx — image OpenGraph du site, LOCALE-AWARE.
 *
 * Une seule implémentation, montée par deux routes de convention Next :
 *  - app/opengraph-image.tsx      → locale par défaut (FR)
 *  - app/en/opengraph-image.tsx   → /en et ses descendants
 *
 * POURQUOI DEUX ROUTES. `opengraph-image` s'applique à un SEGMENT et à ses
 * enfants. Tant que la seule route vivait à la racine, TOUTES les pages /en
 * héritaient d'une image dont le titre — `niche.tagline` — était français :
 * chaque partage social d'une page anglaise sortait en français. Le fichier dans
 * `app/en/` remplace l'héritage pour cette branche et rien d'autre.
 *
 * La grande ligne est du CONTENU DE CONFIG → `nicheL(locale, 'tagline')`
 * (lib/niche-l10n.ts, repli silencieux sur la base). La ligne de services est du
 * vocabulaire d'INTERFACE → `tl(locale, 'tools.*.eyebrow')`, dont les valeurs FR
 * sont mot pour mot celles qui étaient en dur ici. `dealWord` reste tel quel :
 * c'est le mot de la niche, il n'a pas de dimension de locale.
 *
 * Couleurs = palette du SITE (jamais celles du template en dur).
 *
 * 2026-10-21 (emd-fix-ux) : version SUR MESURE de fonds-investissement.be.
 *  - L'eyebrow `{domain} · {year}` plantait Satori (3 nœuds texte dans un div
 *    sans display:flex → réponse vide sur /opengraph-image). Tout bloc à
 *    plusieurs enfants est désormais en `display: 'flex'`, le texte en chaîne unique.
 *  - Plus de barre en dégradé (effects: 'none'), plus de filigrane ★ : un double
 *    filet d'acte et le tampon du site (même tracé que Nav.tsx).
 *  - La ligne de services ne cite que les outils RÉELLEMENT actifs.
 */
import { ImageResponse } from 'next/og'
import { niche, simulatorEnabled, dealsEnabled } from '@/niche.config'
import { nicheL } from '@/lib/niche-l10n'
import { tl } from '@/lib/i18n'
import { CLASSEMENT_SLUGS } from '@/lib/classement'

export const OG_SIZE = { width: 1200, height: 630 }

/** Texte alternatif de l'image, dans la locale demandée. */
export function ogAlt(locale: string): string {
  return `${niche.siteName} — ${nicheL(locale, 'tagline')}`
}

export function renderSiteOgImage(locale: string): ImageResponse {
  const p = niche.palette
  const services = [
    ...(niche.comparator.enabled ? [tl(locale, 'tools.comparator.eyebrow')] : []),
    ...(CLASSEMENT_SLUGS.length > 0 ? [tl(locale, 'nav.rankings')] : []),
    ...(niche.quiz.enabled ? [tl(locale, 'tools.quiz.eyebrow')] : []),
    ...(simulatorEnabled() ? [tl(locale, 'tools.simulator.eyebrow')] : []),
    ...(dealsEnabled() ? [niche.dealWord.charAt(0).toUpperCase() + niche.dealWord.slice(1)] : []),
  ].join(' · ')

  return new ImageResponse(
    (
      <div
        style={{
          background: p.bgPrimary,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '72px 80px',
          position: 'relative',
        }}
      >
        {/* Double filet d'acte, en aplat */}
        <div style={{ position: 'absolute', top: 36, left: 80, right: 80, height: 2, background: p.accent1, display: 'flex' }} />
        <div style={{ position: 'absolute', top: 42, left: 80, right: 80, height: 1, background: p.accent1, display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: 42, left: 80, right: 80, height: 1, background: p.accent1, display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: 36, left: 80, right: 80, height: 2, background: p.accent1, display: 'flex' }} />

        {/* Marque : tampon + nom */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 36 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              background: p.accent1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 22,
            }}
          >
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke={p.bgSurface} strokeWidth="2" />
              <circle cx="12" cy="12" r="5.5" stroke={p.bgSurface} strokeWidth="1.4" />
              <path d="M8.5 12h7" stroke={p.bgSurface} strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div style={{ display: 'flex', fontSize: 34, fontWeight: 700, color: p.textPrimary }}>
            {niche.siteName}
          </div>
        </div>

        {/* Promesse */}
        <div
          style={{
            display: 'flex',
            fontSize: 56,
            fontWeight: 700,
            color: p.textPrimary,
            lineHeight: 1.12,
            marginBottom: 28,
            maxWidth: 1000,
          }}
        >
          {nicheL(locale, 'tagline')}
        </div>

        {/* Outils réellement actifs + domaine */}
        <div style={{ display: 'flex', fontSize: 24, color: p.textSecondary }}>
          {services ? `${services} · ${niche.domain}` : niche.domain}
        </div>
      </div>
    ),
    OG_SIZE
  )
}
