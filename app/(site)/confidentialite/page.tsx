/**
 * /confidentialite — Politique de confidentialité (style Voltéo).
 * Responsable du traitement en dur : MentionBox SRL (même entité pour tous les sites EMD).
 * noindex : page légale.
 */

import type { Metadata } from 'next'
import { niche } from '@/niche.config'
import { CookieSettingsButton } from '@/components/layout/CookieConsent'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://www.${niche.domain}`

export const metadata: Metadata = {
  title: `Politique de confidentialité | ${niche.siteName}`,
  description: `Politique de confidentialité du site ${niche.siteName}.`,
  robots: { index: false, follow: false },
  alternates: {
    canonical: `${SITE_URL}/confidentialite`,
    languages: {
      fr: `${SITE_URL}/confidentialite`,
      en: `${SITE_URL}/en/privacy`,
      'x-default': `${SITE_URL}/confidentialite`,
    },
  },
}

const h2 = { fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: 'var(--ink)', margin: '0 0 14px' } as const
const block = { fontSize: '16px', color: 'var(--ink-2)', lineHeight: 1.75 } as const
const list = { ...block, paddingLeft: 24, marginTop: 12 } as const
const strong = { color: 'var(--ink)' } as const

export default function ConfidentialitePage() {
  return (
    <main id="main-content" className="section">
      <div className="wrap" style={{ maxWidth: 760 }}>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: 'var(--ink)', lineHeight: 1.1, marginBottom: 40 }}>
          Politique de confidentialité
        </h1>

        <section style={{ marginBottom: 36 }}>
          <h2 style={h2}>Responsable du traitement</h2>
          <div style={block}>
            <p>Société : MentionBox SRL (BE 0784.700.405)</p>
            <p>Siège social : Rue Blanche-Eau 15, 6950 Nassogne, Belgique</p>
            <p>Email : emd@mentionbox.be</p>
            <p>Site : {niche.siteName} — https://{niche.domain}</p>
          </div>
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={h2}>Données collectées</h2>
          <p style={block}>{niche.siteName} collecte un minimum de données, strictement nécessaires au fonctionnement du site :</p>
          <ul style={list}>
            <li><strong style={strong}>Mesure d&rsquo;audience :</strong> données de navigation anonymisées (pages visitées, durée de session) via Vercel Analytics, uniquement si vous l&rsquo;avez acceptée.</li>
            <li><strong style={strong}>Formulaires CMS :</strong> si vous utilisez un formulaire de contact, les informations fournies (nom, email, message) sont collectées pour traiter votre demande.</li>
          </ul>
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={h2}>Cookies</h2>
          <p style={block}>Ce site utilise des cookies strictement nécessaires et, avec votre accord, une mesure d&rsquo;audience. Rien de non essentiel n&rsquo;est chargé avant votre choix dans le bandeau cookies :</p>
          <ul style={list}>
            <li><strong style={strong}>Vercel Analytics :</strong> mesure d&rsquo;audience anonymisée, sans tracking publicitaire.</li>
            <li><strong style={strong}>Session CMS :</strong> cookie de session pour l&rsquo;interface d&rsquo;administration, le cas échéant.</li>
          </ul>
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={h2}>Base légale et consentement</h2>
          <p style={block}>La mesure d&rsquo;audience repose sur votre consentement (article 6.1.a du RGPD) : Vercel Analytics ne se charge qu&rsquo;après un clic sur « Accepter ». Les cookies strictement nécessaires et le traitement des demandes de contact reposent sur notre intérêt légitime à faire fonctionner le site et à vous répondre (article 6.1.f).</p>
          <p style={{ ...block, marginTop: 12 }}>Vous pouvez retirer ou modifier votre consentement à tout moment, sans justification. Le retrait ne remet pas en cause les mesures faites avant.</p>
          <CookieSettingsButton label="Gérer mes cookies" />
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={h2}>Durée de conservation</h2>
          <p style={block}>Les données analytiques sont conservées pendant 24 mois maximum. Les données issues des formulaires de contact sont conservées le temps nécessaire au traitement de votre demande, puis supprimées.</p>
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={h2}>Vos droits</h2>
          <p style={block}>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul style={list}>
            <li>Droit d&rsquo;accès à vos données personnelles</li>
            <li>Droit de rectification des données inexactes</li>
            <li>Droit de suppression de vos données</li>
            <li>Droit d&rsquo;opposition au traitement</li>
            <li>Droit à la portabilité de vos données</li>
            <li>Droit de retirer votre consentement à tout moment</li>
          </ul>
          <p style={{ ...block, marginTop: 12 }}>Pour exercer ces droits, contactez-nous à l&rsquo;adresse e-mail indiquée ci-dessus. Vous pouvez également introduire une réclamation auprès de l&rsquo;Autorité de protection des données (APD/GBA) en Belgique.</p>
        </section>

        <section>
          <h2 style={h2}>Contact</h2>
          <p style={block}>Pour toute question relative à cette politique, contactez-nous par email à emd@mentionbox.be.</p>
        </section>
      </div>
    </main>
  )
}
