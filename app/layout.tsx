import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import voiceProfile from '@/content/voice-profile.json'
import { Analytics } from '@vercel/analytics/next'
import { niche } from '@/niche.config'
import { t } from '@/lib/i18n'
import { PermutationStyle } from '@/components/layout/PermutationStyle'
import './globals.css'
import './styles/volteo.css'
// Tokens de chrome (invariants light/dark) — après volteo.css (qui définit
// --spark), avant les layouts qui les consomment (marche, fil).
import './styles/volteo-chrome.css'
// Échelle typo & rythme vertical — INERTE tant que la passe 1 n'a pas câblé
// les font-size (cf. docs/DA-PASSE-1.md). Ne déclare que des custom properties.
import './styles/volteo-scale.css'
import './styles/volteo-magazine.css'
import './styles/volteo-marche.css'
import './styles/volteo-fil.css'
import './styles/volteo-hub.css'
import './styles/volteo-article.css'
import './styles/volteo-comparateur.css'
import './styles/volteo-motion.css'
// Overrides du template — dernier des fichiers PARTAGÉS.
import './styles/volteo-overrides.css'
// DA du site — DOIT rester le TOUT DERNIER import : c'est le seul fichier
// propre à ce site (effets de titre, cartes, ambiances, animations).
// Vide dans le template, rempli à l'init. Cf. docs/DA-EFFETS.md.
import './styles/da-site.css'

// ── Fonts — tirées par suggestFonts('fonds-investissement.be', 'marche', exclusion des
//    8 derniers sites du registre) : paire « manrope » (mono-famille, géométrique).
//    Une seule famille chargée, deux variables : display et texte partagent Manrope.
const fontPrimary = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--next-font-primary',
  adjustFontFallback: true,
  preload: true,
  display: 'swap',
})

const fontDisplay = Manrope({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--next-font-display',
  adjustFontFallback: true,
  preload: false,
  display: 'swap',
})

// ── Méta-titre de la home ───────────────────────────────────────────────
// Marque EN TÊTE, puis une promesse concrète. À RÉÉCRIRE À LA MAIN à l'init du
// site : ce repli marque + tagline est un dépannage, pas un titre SEO — une
// tagline est une phrase éditoriale. Cible ≤ 60 caractères, tiret simple `-`,
// jamais de tiret cadratin. Ex. : « Meilleure Banque - Repérer la banque la
// moins chère ».
// Titre de home décidé par `copywriter` (content/voice-profile.json → homeTitle.fr),
// inscrit au registre central emd-methodo/registry/home-titles.md. Recopié tel quel.
const HOME_TITLE = voiceProfile.homeTitle.fr

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? `https://www.${niche.domain}`
  ),
  // IMPORTANT — anti double-marque : les pages incluent DÉJÀ le nom du site dans
  // leur <title> (ex. "Comparateur 2026 | MonSite"). Le template ne doit donc PAS
  // le rajouter (`%s | MonSite` produirait "… | MonSite | MonSite"). On laisse `%s`
  // qui rend le titre de la page tel quel. `default` (home, sans title propre) garde la marque.
  title: {
    template: '%s',
    default: HOME_TITLE,
  },
  description: niche.tagline,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: '/',
    ...(niche.locales.length > 1 ? {
      languages: Object.fromEntries(
        niche.locales.map((locale) => [locale, `https://www.${niche.domain}/${locale === niche.defaultLocale ? '' : locale}`])
      ),
    } : {}),
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: niche.tagline,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="fr"
      className={`js ${fontPrimary.variable} ${fontDisplay.variable}`}
    >
      {/* Script inline : applique data-theme avant tout rendu pour éviter le flash */}
      <head>
        <PermutationStyle />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-to-content">
          {t('common.skipToContent')}
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
