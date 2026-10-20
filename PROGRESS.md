# PROGRESS — fonds-investissement.be

## 2026-10-20 — Remise au format EMD (provision)

Site repris d'une version maison (archivée dans `docs/legacy-v0/`), reconstruit sur `emd-template` en suivant `emd-provision-sites`.

- **Phase 1** : Cuik BE (2056) + FR (2250) ; concurrents lus : wallonie-entreprendre.be (profondeur 4), 1819.brussels, orsafund.be. `content/site-plan.json` (7 clusters, 6 catégories, 1 classement seed + 4 planned), `content/voice-profile.json` (Cédric H.).
- **Phase 2** : DA « acte notarié et registre des parts », accent #6B2760, Manrope, home `marche`. Registres `emd-methodo` écrits (voice, DA, home-titles).
- **Phase 3** : classement `fonds-investissement-pme` FR/EN, comparateur, `/choisir` ; 31 articles portés en FR + EN (62 MDX, 916 à 2 161 mots par fichier) ; mapping `lib/i18n/article-slugs.ts` ; `content/piliers.md` ; `public/llms.txt`. `tsc` ✓ · `vitest` ✓ (119 passés, 7 sautés) · `next build` ✓ (polices Google simulées en local, le bac à sable n'y a pas accès).
- **Phase 4** : Vercel `fond-investissement` → https://fond-investissement.vercel.app (home vérifiée : H1 et contenu en HTML serveur) · `sites.csv` « Configuré », domaine laissé « À acheter » (DNS : NXDOMAIN, probablement libre, à confirmer au WHOIS) · `provisioned-log.csv` · tâche `fond-investissement-article-daily` (cloud, un jour sur deux à 00h20, jours pairs) · PROGRESS-OUTILS n°23 · images : 6 couvertures de catégorie, portrait auteur, 31 covers d'articles (WebP).

### Journal de portage (pour la rotation)
| Catégorie | Articles | Formes |
|---|---|---|
| comprendre-les-fonds | 6 | enquête, décryptage, réponse rapide ×2, face-à-face ×2 |
| lever-des-fonds | 10 | guide pratique ×5, réponse rapide ×3, décryptage ×2 |
| fonds-propres-ou-dette | 4 | enquête, face-à-face, décryptage, guide pratique |
| reprise-et-transmission | 5 | guide pratique, réponse rapide ×2, décryptage, face-à-face |
| start-up-et-scale-up | 3 | réponse rapide, enquête, décryptage |
| fonds-par-region | 3 | réponse rapide ×2, décryptage |

Dernier article de la série (pour la règle « pas deux formes identiques de suite ») : `fonds-par-region/financer-son-entreprise-a-bruxelles` — décryptage, FAQ 3, TL;DR 3.

### Revue à faire
- **URLs à ouvrir** : `/`, `/classement/fonds-investissement-pme`, `/blog/lever-des-fonds/anti-dilution-et-ratchet`, `/blog`, `/en`.
- **Parti pris annoncé** : papier ivoire vergé, encre violette de tampon, filets de table de capitalisation — vérifier que le rendu ne lit pas « violet décoratif ».
- **Tiré** : famille comparateur / home marche ; palette Éditorial mutée (bordeaux 3° → 309,7°, or → laiton) ; Manrope ; effets 1.6, 3.4, 5.5, 3.2, 5.2 ; effects none, cards bordered ; shape rounded, border hairline, shadow flat.
- **Contrastes** (clair / sombre) : texte 15,30 / 15,65 · secondaire 8,39 / 9,36 · muted 5,32 / 6,20 (4,78 / 5,09 sur surface-2) · accent-1 9,02 / 7,68 · bouton 10,08 / 7,68.
- **Divergence** : écart de teinte minimal 47,6° (meilleure-carte-bancaire.be), fonds #F6F2E9/#FFFDF8 distincts, typo hors fenêtre des 8 derniers.
- **Dette** :
  - sources externes **non rouvertes** pendant le portage (le fetch web demandait une autorisation restée sans réponse) : les chiffres viennent du relevé du collègue du 15/10/2026, à revérifier à la prochaine mise à jour du classement ;
  - `reprise-et-transmission/owner-buy-out-obo` cite la loi belge sur les plus-values (2026) via RSM et l'OECCBB, pas via le texte de loi ;
  - `/en/choisir` en 404 (moteur), quiz et simulateur éteints ;
  - outil « calculateur de dilution » en file (PROGRESS-OUTILS n°23) ;
  - covers à relire : quelques-unes portent du pseudo-texte généré (tableau blanc de `financer-son-entreprise-a-bruxelles`, documents de `fonds-de-placement-ou-fonds-d-investissement` et `pret-subordonne`, calendrier de `fonds-evergreen-ou-fonds-ferme`) ;
  - branche `img-staging` (images sources) non supprimée côté GitHub : à effacer à la main.
