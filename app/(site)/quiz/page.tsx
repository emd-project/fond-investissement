/**
 * /quiz — NEUTRALISÉ sur ce site (fonds-investissement.be).
 * Une seule famille de comparateur à l'init (fonds-investissement-pme) : toutes les
 * réponses aboutiraient à la même page. Mieux vaut pas de quiz qu'un quiz qui ment.
 * Raison écrite dans content/site-plan.json (asset quiz, disabledReason) et DECISIONS.md.
 */
import { notFound } from 'next/navigation'

export default function Page() {
  notFound()
}
