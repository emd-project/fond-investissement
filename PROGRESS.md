# PROGRESS — fonds-investissement.be

## 2026-10-28 — Classement : invests wallons (tâche planifiée, run 4)

- **Règle 0bis** : dernier classement publié le 20/10 (8 jours) et 4 classements `planned` → **classement à la place de l'article**. Retenu : `invests-wallons` (premier du plan, aucun champ `priority`). Restent `planned` : `fonds-capital-risque-belgique`, `reseaux-business-angels`, `fonds-reprise-pme` (prochain éligible à partir du 04/11).
- **Pilier** : 6 · À qui s'adresser (cat. de rattachement `fonds-par-region`, aucun MDX publié ce run). Run précédent : pilier 8, `lever-des-fonds`.
- **Forme** : classement (pas une des cinq formes d'article ; la rotation des formes reprend au prochain article, à comparer avec face-à-face / réponse rapide / guide pratique) · **FAQ : 7 questions** · **TL;DR : 4 puces** · 5 sections H2 toutes en question · 5 critères · 13 sources datées.
- **Slugs** : FR `/classement/invests-wallons` · EN `/en/classement/invests-wallons`. Dérivés (classement de segment) : famille `invests-wallons` ajoutée à `comparateurs.json` + `.en` (`/comparer/invests-wallons`, FR + EN) et entrée `choisir.json` (`/choisir/invests-wallons`, FR ; `/en/choisir` reste en 404 faute de quiz EN). `site-plan.json` : classement passé en `published`, nœuds comparateur et choisir ajoutés.
- **Items (9)** : 1 ORSA (90) · 2 Namur Invest (88) · 3 Invest.BW (84) · 4 Noshaq (81) · 5 Carbon ex-Sambrinvest (79) · 6 Wapinvest (77) · 7 Ostbelgieninvest (75) · 8 IMBC (68) · 9 Luxembourg Développement (64). Score : transparence 35, palette d'instruments 25, capacité publiée 20, zone 10, statut 10. ORSA en tête avec mention de partenariat dans l'intro et la FAQ.
- **Mots (rendu HTML, hors scripts)** : FR ≈ 3 180 · EN ≈ 2 960 (JSON seul : FR ≈ 2 700).
- **Seeds Cuik** (BE 2056 puis FR 2250, language 1002) : `invest provincial`, `invests wallons`, `noshaq`, `sambrinvest`, `namur invest`. Head générique à 0 en BE comme en FR ; demande portée par les noms propres (noshaq, sambrinvest, namur invest / « we invest namur »). Variantes couvertes : liste des invests par province, ticket minimum, capital ou prêt, fusion des invests, Sambrinvest devenu Carbon, statut public/privé, durée du prêt subordonné.
- **SERP** : en tête, 1890.be (liste sans tickets ni dates), CRISP (Courrier hebdomadaire 1996), vocabulairepolitique.be, question parlementaire sur la fusion. Aucune page ne compare tickets, instruments et durées publiés par invest. Différenciateur : neuf fiches datées, moyenne Wapinvest calculée (33,9 M€ / 133 dossiers = ≈ 255 000 €), renommage Carbon du 20/10/2026, découpage communal d'Ostbelgieninvest et de Wapinvest.
- **Nouveaux faits relevés le 28/10/2026** : Sambrinvest → **Carbon** le 20/10/2026 (DG Grégoire Dupuis, 220 M€ de projets 2026-2029, 30 communes de Charleroi Métropole ; carbon-fund.be) ; Wapinvest (seuil 15 000 €, 2024 : 165 dossiers étudiés, 133 acceptés, 33,9 M€, encours 150,5 M€, 60 % privé / 40 % WE) ; Ostbelgieninvest (4 instruments, subordonné ≤ 10 ans, court 3 mois à 3 ans) ; LDE2 (2017, ≈ 7,98 M€, FEDER) ; Parlement wallon 16/04 et 12/05/2025 (9 invests, objectif de rationalisation, 30 M€/an d'avances).
- **Liens d'autorité** (rendus par le template) : Parlement de Wallonie, 1890.be, sites des invests, rapport annuel Wapinvest, fiche IDELUX. Aucun lien produit.
- **Image** : aucune génération (règle classement), couverture de catégorie réutilisée par le template.
- **Vérifs** : `tsc` ✓ · `vitest` ✓ (119 passés, 7 sautés) · `next build --webpack` ✓ (polices Google simulées, le bac à sable n'y a pas accès ; Turbopack refuse le mock) · H1 et contenu présents dans le HTML serveur FR et EN · JSON-LD `ItemList` + `FAQPage` + `BreadcrumbList` · zéro tiret cadratin / demi-cadratin dans les données ajoutées · aucune amorce « Ce que / Ce qui ».
- **À faire** : l'article `fonds-par-region/invests-wallons` (FR + EN) cite encore « Sambrinvest » et dit que Luxembourg et Wallonie picarde manquent au relevé : à mettre à jour (Carbon, Wapinvest, Luxembourg Développement, Ostbelgieninvest) et à mailler vers `/classement/invests-wallons`. Même mise à jour du nom Carbon à prévoir dans le classement seed, le comparateur seed et `/choisir/fonds-investissement-pme`.
- **À vérifier** : carbon-fund.be, wapinvest.be, ostbelgieninvest.be, idelux.be lus via leurs pages indexées ; orsafund.be, namurinvest.be, investbw.be, noshaq.be et imbc.be non rouverts (fetch non autorisé), conditions reprises du relevé du 15/10/2026 et datées comme telles.

## 2026-10-26 — Article : rachat des parts du fonds (tâche planifiée, run 3)

- **Règle 0bis** : dernier classement publié le 20/10 (6 jours) → article normal. Prochain classement éligible au prochain run (≥ 27/10).
- **Pilier traité** : 8 · Questions pures (vide jusqu'ici) → cat. `lever-des-fonds` (10 → 11 articles). Run précédent : pilier 3, `fonds-propres-ou-dette` ; avant : pilier 5, `start-up-et-scale-up`. Les deux entrées « question » du plan (`un-fonds-peut-il-me-forcer-a-vendre`, `le-fonds-a-t-il-un-droit-de-veto`) écartées pour ce run : trop recouvrantes avec `clauses-de-sortie-tag-drag-leaver` et `le-fonds-au-capital` (doublon de traitement) ; elles restent `planned`, à reprendre sous un angle neuf.
- **Forme** : face-à-face (trois voies de rachat comparées, tableau central ; 4/8 H2 en question) · **FAQ : 5 questions** · **TL;DR : 4 puces** (précédents : réponse rapide FAQ 7 / TL;DR 6 ; guide pratique FAQ 6 / TL;DR 5). Liste à puces hors TL;DR : conditions du rachat d'actions propres (CSA) + 5 clauses à écrire à l'entrée.
- **Slugs** : FR `/blog/lever-des-fonds/rachat-de-parts-sociales-du-fonds` · EN `/en/blog/lever-des-fonds/buying-back-the-funds-shares` · mapping ajouté dans `lib/i18n/article-slugs.ts` · entrée `published` ajoutée à `content/site-plan.json`.
- **Seeds Cuik** (BE 2056 puis FR 2250, language 1002) : `racheter les parts d'un associé`, `rachat d'actions propres srl`, `sortie d'un investisseur`, `rachat de parts sociales`, `droit de veto actionnaire`. Requête retenue : `rachat de parts sociales` (la plus forte de la grappe hors SCI). `droit de veto actionnaire`, `sortie d'un investisseur`, `rachat d'actions propres srl` : 0 en BE comme en FR.
- **Grappe couverte** : rachat de parts sociales · rachat de parts sociales par la société elle-même · rachat de parts sociales par une holding · financement rachat de parts sociales · réduction de capital par rachat (annulation) · rachat forcé / obligation de rachat (FAQ put) · racheter les parts d'un associé.
- **SERP** : Google.be tenu par des pages françaises (LegalPlace, Legalstart, LegalVision, JDN, swim.legal) sur la SARL/SAS ; rien sur le CSA belge ni sur la sortie d'un fonds. Différenciateur : cas chiffré 600 000 € pour 30 % → 1,5 M€ après 7 ans ; voie personnelle ≈ 3,06 M€ distribués (précompte 30 %, fonds servi à 30 %) ; holding 1,5 M€ sur 7 ans à 5 % (hypothèse) = 259 230 €/an, 864 100 € à distribuer si la holding ne détient que 30 % ; plancher de TRI 12 % = 1,33 M€ contre 1,05 M€ de valeur (+26 %), 10 % = 1,17 M€.
- **Acteurs cités** (relevé du 15/10/2026, ticket + instrument + zone) : ORSA, Invest.BW, Theodorus ; PMV signalé hors relevé. ORSA cité factuellement (evergreen, conditions de rachat non publiées).
- **Liens d'autorité (dofollow)** : CSA sur ejustice, Baker Tilly Belgique (rachat d'actions propres, seuil fiscal 20 %), OECCBB (A. Haelterman, boni de rachat et régime plus-values 2026). Aucun lien produit.
- **Maillage** : clauses de sortie, OBO, valoriser une PME, classement, comparateur (FR et EN).
- **Mots (corps, tableaux compris)** : FR ≈ 1 580 · EN ≈ 1 490.
- **Image** : cover générée (v1, sans texte lisible), WebP 1280×720 ; source déposée sur la branche `img-staging`. In-content : couverture de catégorie réutilisée.
- **Plan** : 13 entrées non publiées → pas de réalimentation.
- **Vérifs** : `tsc` ✓ · `vitest` ✓ (119 passés, 7 sautés) · compilation MDX FR + EN ✓ · zéro tiret cadratin / demi-cadratin · aucune amorce « Ce que / Ce qui ».
- **À vérifier** : orsafund.be, investbw.be et theodorus.be non rouverts (autorisation de fetch restée sans réponse) : conditions reprises du relevé du 15/10/2026, datées comme telles. Traitement fiscal du boni de rachat côté fonds vendeur non chiffré (renvoyé à l'expert-comptable / ruling).

## 2026-10-23 — Article : dette mezzanine (tâche planifiée, run 2)

- **Règle 0bis** : dernier classement publié le 20/10 (moins de 7 jours) → article normal. Prochain classement éligible à partir du 27/10.
- **Pilier traité** : 3 · L'instrument → cat. `fonds-propres-ou-dette` (4 → 5 articles). Run précédent : pilier 5, `start-up-et-scale-up`.
- **Forme** : réponse rapide (6/7 H2 en question) · **FAQ : 7 questions** · **TL;DR : 6 puces** (précédent : guide pratique, FAQ 6, TL;DR 5 ; avant : décryptage). Tableaux : calcul de coût, acteurs relevés, « cas → que faire ». Liste à puces hors TL;DR : 4 points à faire écrire sur le kicker.
- **Slugs** : FR `/blog/fonds-propres-ou-dette/dette-mezzanine` · EN `/en/blog/fonds-propres-ou-dette/mezzanine-debt` · mapping ajouté dans `lib/i18n/article-slugs.ts`. Entrée `financement-mezzanine` du plan renommée `dette-mezzanine` et passée en `published`.
- **Seeds Cuik** (BE 2056 puis FR 2250, language 1002) : `crowdfunding entreprise belgique`, `crowdlending pme`, `prêt convertible`, `financement mezzanine`, `prêt participatif`. Requête retenue : `dette mezzanine` / `capital mezzanine` (la plus forte de la grappe en BE et en FR). `crowdfunding entreprise belgique` et `crowdlending pme` : 0 en BE comme en FR (à re-miner avec d'autres formulations avant d'écrire l'entrée du plan).
- **Grappe couverte** : dette mezzanine · financement mezzanine (définition) · capital mezzanine · fonds mezzanine · equity kicker mezzanine · dette unitranche vs mezzanine · mezzanine LBO / PME (H2 + FAQ).
- **SERP** : Google.be tenu par unquote (EN), France Épargne, pages françaises de définition ; aucune page ne chiffre le coût total (cash + PIK + kicker) face au prêt subordonné public belge. Différenciateur : calcul sur 1 M€ / 6 ans (mezzanine 15,7 % pour le prêteur, ≈ 1,13 M€ de coût ; prêt subordonné WE ≈ 131 000 € ; fonds à 20 % = 1 M€), tableau des acteurs belges avec date de relevé, lecture par région (PMV / WE + invests + ORSA / finance&invest.brussels).
- **Acteurs cités** : Mezzanine Partners (PMV + Capital@rent ; FSMA), Muzinich, Kartesia (P. Van De Velde, 2021), Wallonie Entreprendre, ORSA (Smart Bond, relevé du 15/10), Invest.BW (relevé du 15/10), finance&invest.brussels.
- **Liens d'autorité (dofollow)** : guichet.public.lu, kmu.admin.ch (SECO), fiche prêt subordonné Wallonie Entreprendre, FSMA (Mezzanine Partners 2). Aucun lien produit.
- **Mots (corps hors tableaux)** : FR ≈ 1 120 · EN ≈ 1 100.
- **Image** : cover générée (v2 ; la v1 portait du pseudo-texte « LOAN AGREEMENT », rejetée), convertie en WebP 1280×720. In-content : couverture de catégorie réutilisée.
- **Plan réalimenté** : 7 entrées non publiées après ce run → 6 entrées `planned` ajoutées (sortie forcée, droit de veto, garantie Wallonie Entreprendre, vocabulaire de la valorisation, donation d'entreprise par région, family office).
- **À vérifier** : orsafund.be et investbw.be non rouverts ce run (autorisation de fetch restée sans réponse) : conditions reprises du relevé du 15/10/2026, datées comme telles dans l'article. Taux de Mezzanine Partners et Muzinich non publiés.

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
