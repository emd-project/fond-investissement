# DECISIONS — fonds-investissement.be

Repo `emd-project/fond-investissement`. Remis au format EMD le 20/10/2026, sur la base `emd-template`.

## Reprise d'un site existant

- **Point de départ.** Un collègue avait monté le site en Next.js maison, hors méthodo : composants propres, contenu en `.md` à frontmatter JSON, auteur « la rédaction », pas de miroir EN, pas de DA tirée, pas de registre. **Son code et son contenu sont archivés tels quels dans `docs/legacy-v0/`**, exclus du typecheck et du lint. Rien n'a été perdu.
- **Ce qui a été gardé.** Tous ses faits : le relevé des 9 fonds du 15/10/2026 (`docs/legacy-v0/lib/funds.ts`), le classement et sa déclaration de transparence ORSA, les 33 pages et 3 billets, leurs FAQ et leurs sources. Les 31 articles éditoriaux ont été portés en MDX EMD (FR + EN), enrichis jusqu'au plancher GEO (TL;DR, FAQ, tableau, liste, ≥ 900 mots par locale) sans ajouter de chiffre non sourcé.
- **Ce qui n'a pas été porté en page.** `comparatifs-et-outils` (rôle tenu par le hub `/classement`), `charte-editoriale` (méthode et divulgation portées par le classement et la page auteur : le moteur n'a pas de route standalone EN, une page FR seule casserait la parité), `mentions-legales` (socle EMD commun), `calculateur-de-dilution` (mis en file dans `emd-methodo/PROGRESS-OUTILS.md`, outil n°23, avec le composant d'origine comme point de départ).
- **Seed.** La doctrine veut un seul article seed à l'init. Ici 31 articles existaient déjà : ils sont publiés d'emblée. La tâche quotidienne reprend la rotation à partir de là (cf. `content/piliers.md`, état du corpus).

## Positionnement
- **Angle** : le dirigeant de PME wallonne ou bruxelloise face à un fonds — ce qu'il cède, à qui, à quel prix, pour combien de temps. Seul site du réseau sur le financement en fonds propres d'une entreprise ; « fonds de placement » est hors angle (territoire de `comparer-compte-epargne.be`).
- **ORSA (ex-Investsud)** est le partenaire mis en avant, comme sur le site d'origine. Il reste #1 du classement, justifié par ses conditions publiées, avec la mention de transparence en tête de page. Les mentions « 100 % indépendant » du template ont été retirées des libellés FR/EN (incompatibles avec un partenaire déclaré).

## Architecture (content/site-plan.json)
- 6 catégories : `comprendre-les-fonds`, `lever-des-fonds` (catégorie pratique : dossier, valorisation, term sheet, due diligence, pacte), `fonds-propres-ou-dette`, `reprise-et-transmission`, `start-up-et-scale-up`, `fonds-par-region`.
- Classement seed `fonds-investissement-pme` (9 items, ~2 200 mots FR / ~2 000 EN), comparateur et `/choisir` dérivés.
- 4 classements `planned` : `invests-wallons`, `fonds-capital-risque-belgique`, `reseaux-business-angels`, `fonds-reprise-pme`.
- **Quiz désactivé** : une seule famille de comparateur, toutes les réponses mèneraient à la même page. Routes `/quiz` FR et EN neutralisées en `notFound()`.
- **Simulateur désactivé** : aucune série de prix sourcée ; l'outil pertinent est le calculateur de dilution (file PROGRESS-OUTILS).
- **`/en/choisir` rend 404** : comportement du moteur (le bloc éditorial `/choisir` n'est pas localisé EN et le quiz est éteint). À traiter côté template si on veut la page EN.

## Voix (content/voice-profile.json)
- Auteur **Cédric H.** (prénom libre au registre), « je » + « vous », factuel, du côté du dirigeant. Signature : chaque clause traduite en pourcentage de capital. Règle unique : aucun fonds sans ticket, instrument et zone publiés et datés.
- Titre de home FR « Fonds d'Investissement - Lever sans perdre la main » (50 c.), EN « Belgian SME Funds - Raise capital, keep control » (46 c.), inscrits à `registry/home-titles.md`.

## DA (content/da-report.json)
- **Parti pris** : acte notarié et registre des parts — papier ivoire vergé, encre violette de tampon, filets de table de capitalisation.
- Famille `comparateur` → home `marche`. Permutations tirées : rounded / hairline / flat. `effects` forcé de `subtle` à `none` (DA papier, aucun voile coloré), `cards: bordered`.
- Palette : direction Éditorial mutée, accent-1 #6B2760 (309,7°), écart minimal 47,6° aux 8 derniers sites. Typo Manrope (tirage `suggestFonts`, exclusion des 8 derniers).
- 5 effets : chiffres tabulaires, grain papier, tableaux zébrés, filet séparateur, sélection à l'encre.
- Favicon monogramme v1 (F blanc sur #6B2760) ; logo de nav remplacé par un tampon d'acte.

## Écarts au template, assumés
- `MarcheHome` : le titre du hero passe de `<h2>` à `<h1>` (la home n'avait aucun H1). À remonter au template.
- Home `marche` : l'en-tête « Au classement » affiche `excerpt` (et non l'intro longue) et sa colonne passe de 440 à 760 px (`da-site.css`, seule règle de largeur du fichier, demandée le 20/10). Page classement : l'intro est rendue paragraphe par paragraphe.
- `ComparateurSelector` : un `prix` à 0 s'affiche « — » au lieu de « 0 € » (ticket non publié). À remonter au template.
- Titre `/choisir` : « + quiz » seulement si le quiz est actif.
- `tests/unit/niche-l10n.test.tsx` : le bloc « template sans `localized` » est sauté quand le site déclare `localized.en`.
- `npm run lint` échoue sur 8 erreurs **héritées du template** (CMS, deals, Nav) : non corrigées ici, le template échoue à l'identique.
