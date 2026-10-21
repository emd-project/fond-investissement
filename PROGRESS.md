# PROGRESS — fonds-investissement.be

## 2026-10-22 — Article : stock options et warrants (tâche planifiée, run 1)

- **Règle 0bis** : classement seed publié le 20/10 (moins de 7 jours) → article normal, pas de classement ce run. Prochain classement éligible à partir du 27/10 (`invests-wallons` ou le plus prioritaire des 4 `planned`).
- **Pilier traité** : 5 · L'entreprise innovante → cat. `start-up-et-scale-up` (la plus mince, 3 articles → 4). Run précédent (portage) : `fonds-par-region`.
- **Forme** : guide pratique (étapes numérotées, 5/7 H2 en question) · **FAQ : 6 questions** · **TL;DR : 5 puces** (précédent : décryptage, FAQ 3, TL;DR 3).
- **Slugs** : FR `/blog/start-up-et-scale-up/stock-options-et-warrants-en-belgique` · EN `/en/blog/start-up-et-scale-up/stock-options-and-warrants-belgium` · mapping ajouté dans `lib/i18n/article-slugs.ts`.
- **Seeds Cuik** (BE 2056 puis FR 2250, language 1002) : `warrants start-up belgique`, `levée de fonds seed`, `spin-off universitaire financement`, `aide r&d wallonie`, `stock options belgique`. Requête retenue : `stock options belgique` (20/mois BE, 10 FR).
- **Grappe couverte** : stock options belgique · stock option fiscalité belgique · taxation stock options belgique · warrants start-up (H2 + FAQ).
- **SERP** : top Google.be tenu par Osborne Clarke (EN), IBFD, Guberna, Securex, cabinets comptables ; aucun ne traduit le plan en points de capital cédés par le fondateur ni ne cumule procédure CSA en SRL + réforme 2026. Différenciateur : calcul pool pre-money / post-money (2,5 points), calcul d'impôt à l'attribution 18 % / 9 %, plafond ATN 20 % (loi du 15/07/2026) et taxe plus-values 10 % (loi du 6/04/2026, circulaire 2026/C/74).
- **Acteurs cités** : EVS (rapport du conseil du 2/04/2025, 250 000 warrants, 1,74 %) et Nyxoah (rapport du 27/07/2026, 1 000 000 de droits, 0,95 % dilué), relevés le 21/10/2026 ; SPF Finances (tag). ORSA non cité (rien de publié par ORSA sur les plans d'options).
- **Liens d'autorité (dofollow)** : CSA sur ejustice, rapports EVS et Nyxoah, Securex (plafond 20 %), taxruling.be (circulaire 2026/C/74). Aucun lien produit.
- **Mots (corps hors tableaux)** : FR ≈ 1 530 · EN ≈ 1 500. Légèrement au-dessus de la fourchette du guide pratique.
- **Plan réalimenté** : 0 entrée non publiée → 8 entrées `planned` ajoutées à `content/site-plan.json` (prêt convertible, mezzanine, crowdfunding, crédit vendeur et earn-out, holding de reprise, augmentation de capital SRL, liquidation préférentielle, business angels pour PME industrielle).
- **Vérifs** : `tsc` ✓ · `vitest` ✓ (119 passés, 7 sautés) · compilation MDX FR + EN ✓ · zéro tiret cadratin / demi-cadratin · liens internes vers routes existantes.
- **Bloqué : cover non générée.** Le pont vers l'outil d'image (nano-mentionbox) s'est déconnecté pendant le run ; `featureImage` pointe provisoirement sur `/images/categories/start-up-et-scale-up.webp` (même image que l'in-content). À faire : générer `public/blog/start-up-et-scale-up/stock-options-et-warrants-en-belgique/stock-options-et-warrants-en-belgique-cover.webp` (prompt prévu : « Founder and three employees at oak table, brass lamp, violet ink stamp, Belgian workshop, no text, no logos, no watermark ») et remettre ce chemin dans les deux MDX.
- **À vérifier** : la dérogation ONSS des options (renvoyée au secrétariat social dans l'article) ; la loi plus-values fait l'objet de recours à la Cour constitutionnelle.

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
