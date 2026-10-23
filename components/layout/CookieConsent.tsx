'use client'

/**
 * CookieConsent — bandeau cookies RGPD (FR + EN), monté dans app/layout.tsx
 * (root layout : sert / et /en).
 *
 * - Aucun traceur non essentiel avant consentement : <Analytics /> (Vercel) n'est
 *   rendu QUE si le visiteur a cliqué « Accepter / Accept ».
 * - Refuser est aussi simple qu'accepter (deux boutons de même poids).
 * - Choix mémorisé dans localStorage (`cookie-consent` = 'accepted' | 'declined').
 *   Stockage indisponible → le bandeau réapparaît, rien n'est chargé.
 * - Retrait du consentement : `openCookieSettings()` (cf. CookieSettingsButton,
 *   posé sur /confidentialite et /en/privacy) rouvre le bandeau.
 * - Locale déduite du chemin (/en/... → EN, sinon locale par défaut FR).
 * - Masqué sur /admin (interface de gestion, pas de visiteurs).
 * - Discret : bas-gauche, max 400 px, left/right 16 → pas de scroll horizontal à 320 px.
 */

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Analytics } from '@vercel/analytics/next'
import { niche, legalPath } from '@/niche.config'

type Consent = 'accepted' | 'declined'

const STORAGE_KEY = 'cookie-consent'
const OPEN_EVENT = 'cookie-consent:open'

const COPY: Record<string, { text: string; policy: string; accept: string; decline: string; label: string }> = {
  fr: {
    label: 'Cookies',
    text: 'Ce site n’utilise que des cookies nécessaires, plus une mesure d’audience anonyme si vous l’acceptez.',
    policy: 'Politique de confidentialité',
    accept: 'Accepter',
    decline: 'Refuser',
  },
  en: {
    label: 'Cookies',
    text: 'This site only uses essential cookies, plus anonymous audience measurement if you agree.',
    policy: 'Privacy policy',
    accept: 'Accept',
    decline: 'Decline',
  },
}

function readConsent(): Consent | null {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY)
    return v === 'accepted' || v === 'declined' ? v : null
  } catch {
    return null
  }
}

function writeConsent(v: Consent) {
  try {
    window.localStorage.setItem(STORAGE_KEY, v)
  } catch {
    /* stockage indisponible : le choix vaut pour la session en cours */
  }
}

/** Rouvre le bandeau (retrait / modification du consentement). */
export function openCookieSettings() {
  try {
    window.dispatchEvent(new Event(OPEN_EVENT))
  } catch {
    /* noop */
  }
}

function localeOf(pathname: string): string {
  const seg = pathname.split('/').filter(Boolean)[0]
  if (seg && seg !== niche.defaultLocale && niche.locales.includes(seg)) return seg
  return niche.defaultLocale
}

export function CookieConsent() {
  const pathname = usePathname() || '/'
  const [consent, setConsent] = useState<Consent | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const stored = readConsent()
    setConsent(stored)
    setOpen(stored === null)
    const onOpen = () => setOpen(true)
    window.addEventListener(OPEN_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_EVENT, onOpen)
  }, [])

  const choose = (v: Consent) => {
    writeConsent(v)
    setConsent(v)
    setOpen(false)
  }

  const isAdmin = pathname.startsWith('/admin')
  const locale = localeOf(pathname)
  const c = COPY[locale] ?? COPY.en
  const policyHref = legalPath(locale, 'privacy')

  const btn = {
    flex: '1 1 0',
    minWidth: 0,
    padding: '9px 14px',
    borderRadius: 'var(--radius-full, 100px)',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    lineHeight: 1.2,
  } as const

  return (
    <>
      {consent === 'accepted' && <Analytics />}
      {open && !isAdmin && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label={c.label}
          lang={locale}
          style={{
            position: 'fixed',
            left: 16,
            right: 16,
            bottom: 16,
            zIndex: 1000,
            maxWidth: 400,
            boxSizing: 'border-box',
            padding: '16px 18px',
            borderRadius: 14,
            background: 'var(--bg-surface, #FFFDF8)',
            color: 'var(--ink, var(--text-primary, #1E1A24))',
            border: '1px solid var(--line, rgba(0,0,0,0.12))',
            boxShadow: '0 8px 28px rgba(0,0,0,0.14)',
            fontSize: '14px',
            lineHeight: 1.5,
            overflowWrap: 'break-word',
          }}
        >
          <p style={{ margin: '0 0 12px' }}>
            {c.text}{' '}
            <Link href={policyHref} style={{ color: 'inherit', textDecoration: 'underline' }}>
              {c.policy}
            </Link>
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => choose('declined')}
              style={{
                ...btn,
                background: 'transparent',
                color: 'inherit',
                border: '1px solid currentColor',
              }}
            >
              {c.decline}
            </button>
            <button
              type="button"
              onClick={() => choose('accepted')}
              style={{
                ...btn,
                background: 'var(--accent-1, #6B2760)',
                color: '#fff',
                border: '1px solid var(--accent-1, #6B2760)',
              }}
            >
              {c.accept}
            </button>
          </div>
        </div>
      )}
    </>
  )
}

/** Bouton « Gérer les cookies / Cookie settings » : rouvre le bandeau. */
export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      style={{
        marginTop: 12,
        padding: '8px 16px',
        borderRadius: 'var(--radius-full, 100px)',
        fontSize: '15px',
        fontWeight: 600,
        cursor: 'pointer',
        background: 'transparent',
        color: 'var(--ink, inherit)',
        border: '1px solid currentColor',
      }}
    >
      {label}
    </button>
  )
}
