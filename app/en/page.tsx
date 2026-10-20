/**
 * /en — English home. Mirror of app/(site)/page.tsx.
 *
 * Both share the SAME locale-aware variant components via <HomeRouter> — no more
 * inline EN duplicate. The variant is resolved from niche.config (lib/variants.ts);
 * copy is localised through tl('en', …), articles via the EN mirror, URLs prefixed /en.
 *
 * Metadata: title/description come from `nicheL('en', …)` — the locale dimension of
 * niche.config (lib/niche-l10n.ts). Without an `localized.en` block they fall back to
 * the base values, which is exactly what this page served before.
 */
import type { Metadata } from 'next'
import { HomeRouter } from '@/components/home/HomeRouter'
import { niche } from '@/niche.config'
import { nicheL } from '@/lib/niche-l10n'
import voiceProfile from '@/content/voice-profile.json'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://www.${niche.domain}`

export const revalidate = 3600

export function generateMetadata(): Metadata {
  return {
    // homeTitle.en (content/voice-profile.json) — written in English, not translated.
    title: { absolute: voiceProfile.homeTitle.en },
    description: nicheL('en', 'subtitle'),
    alternates: {
      canonical: `${SITE_URL}/en`,
      languages: {
        fr: `${SITE_URL}/`,
        en: `${SITE_URL}/en`,
        'x-default': `${SITE_URL}/`,
      },
    },
    openGraph: {
      title: voiceProfile.homeTitle.en,
      description: nicheL('en', 'subtitle'),
      url: `${SITE_URL}/en`,
      siteName: niche.siteName,
      type: 'website',
      locale: 'en',
    },
  }
}

export default function HomePageEn() {
  return <HomeRouter locale="en" />
}
