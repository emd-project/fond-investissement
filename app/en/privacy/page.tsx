/**
 * /en/privacy — Privacy policy (EN mirror of /confidentialite, Voltéo style).
 * Static. noindex: legal page. GDPR rights copy mirrors the FR version.
 */

import type { Metadata } from 'next'
import { niche } from '@/niche.config'
import { CookieSettingsButton } from '@/components/layout/CookieConsent'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://www.${niche.domain}`

export function generateMetadata(): Metadata {
  return {
    title: `Privacy policy | ${niche.siteName}`,
    description: `Privacy policy for ${niche.siteName}.`,
    robots: { index: false, follow: false },
    alternates: {
      canonical: `${SITE_URL}/en/privacy`,
      languages: {
        fr: `${SITE_URL}/confidentialite`,
        en: `${SITE_URL}/en/privacy`,
        'x-default': `${SITE_URL}/confidentialite`,
      },
    },
  }
}

const h2 = { fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: 'var(--ink)', margin: '0 0 14px' } as const
const block = { fontSize: '16px', color: 'var(--ink-2)', lineHeight: 1.75 } as const
const list = { ...block, paddingLeft: 24, marginTop: 12 } as const
const strong = { color: 'var(--ink)' } as const

export default function PrivacyPage() {
  return (
    <main id="main-content" className="section">
      <div className="wrap" style={{ maxWidth: 760 }}>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: 'var(--ink)', lineHeight: 1.1, marginBottom: 40 }}>
          Privacy policy
        </h1>

        <section style={{ marginBottom: 36 }}>
          <h2 style={h2}>Data controller</h2>
          <div style={block}>
            <p>Company: MentionBox SRL, a private limited company under Belgian law (BE 0784.700.405)</p>
            <p>Registered office: Rue Blanche-Eau 15, 6950 Nassogne, Belgium</p>
            <p>Email: emd@mentionbox.be</p>
            <p>Site: {niche.siteName} — https://{niche.domain}</p>
          </div>
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={h2}>Data collected</h2>
          <p style={block}>{niche.siteName} collects the minimum data strictly necessary for the site to work:</p>
          <ul style={list}>
            <li><strong style={strong}>Audience measurement:</strong> anonymised browsing data (pages visited, session duration) via Vercel Analytics, only if you have accepted it.</li>
            <li><strong style={strong}>CMS forms:</strong> if you use a contact form, the information provided (name, email, message) is collected to handle your request.</li>
          </ul>
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={h2}>Cookies</h2>
          <p style={block}>This site uses strictly necessary cookies and, with your consent, audience measurement. Nothing non-essential loads before you make a choice in the cookie banner:</p>
          <ul style={list}>
            <li><strong style={strong}>Vercel Analytics:</strong> anonymised audience measurement, with no advertising tracking.</li>
            <li><strong style={strong}>CMS session:</strong> a session cookie for the admin interface, where applicable.</li>
          </ul>
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={h2}>Legal basis and consent</h2>
          <p style={block}>Audience measurement relies on your consent (Article 6(1)(a) GDPR): Vercel Analytics only loads after you click &ldquo;Accept&rdquo;. Strictly necessary cookies and the handling of contact requests rely on our legitimate interest in running the site and answering you (Article 6(1)(f)).</p>
          <p style={{ ...block, marginTop: 12 }}>You can withdraw or change your consent at any time, without giving a reason. Withdrawal does not affect measurement made before it.</p>
          <CookieSettingsButton label="Manage cookies" />
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={h2}>Retention period</h2>
          <p style={block}>Analytics data is kept for a maximum of 24 months. Data from contact forms is kept only for as long as needed to handle your request, then deleted.</p>
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={h2}>Your rights</h2>
          <p style={block}>In accordance with the GDPR, you have the following rights:</p>
          <ul style={list}>
            <li>Right of access to your personal data</li>
            <li>Right to rectification of inaccurate data</li>
            <li>Right to erasure of your data</li>
            <li>Right to object to processing</li>
            <li>Right to data portability</li>
            <li>Right to withdraw your consent at any time</li>
          </ul>
          <p style={{ ...block, marginTop: 12 }}>To exercise these rights, contact us at the address above. You may also lodge a complaint with the Belgian Data Protection Authority (APD/GBA).</p>
        </section>

        <section>
          <h2 style={h2}>Contact</h2>
          <p style={block}>For any question about this policy, contact us by email at emd@mentionbox.be.</p>
        </section>
      </div>
    </main>
  )
}
