---
{
  "slug": "anti-dilution-et-ratchet",
  "type": "fiche",
  "pillar": "capital",
  "order": 3,
  "card": "Anti-dilution et ratchet",
  "title": "Anti-dilution et ratchet : comprendre ces clauses avant de signer",
  "description": "Anti-dilution (full ratchet, moyenne pondérée) et ratchet de performance : fonctionnement, exemple chiffré, effet sur le fondateur et points à négocier.",
  "h1": "Anti-dilution et ratchet : qui paie si la valeur baisse, qui gagne si elle monte",
  "chapo": "La clause d'anti-dilution protège l'investisseur si une levée future se fait à une valorisation plus basse que la sienne. Le ratchet ajuste les parts selon la performance réelle. Les deux peuvent déplacer plusieurs points de capital, souvent au détriment du fondateur.",
  "published": "2026-10-15",
  "todo": {
    "faire": [
      "Demander une anti-dilution en moyenne pondérée plutôt qu'en full ratchet.",
      "Exclure de l'anti-dilution les émissions liées au plan d'options et aux conversions prévues.",
      "Simuler l'effet de la clause sur la table de capitalisation avec une levée à la baisse."
    ],
    "eviter": [
      "Accepter une anti-dilution sans limite de durée.",
      "Lier un ratchet à un indicateur que le fonds peut influencer seul.",
      "Négocier la valorisation sans regarder ces clauses."
    ]
  },
  "faq": [
    { "q": "Qu'est-ce qu'une levée « down round » ?", "a": "C'est une levée réalisée à un prix par action inférieur à celui de la levée précédente. C'est le cas qui déclenche les clauses d'anti-dilution." },
    { "q": "Full ratchet ou moyenne pondérée, quelle différence ?", "a": "Le full ratchet ramène le prix de l'investisseur au nouveau prix bas, quel que soit le montant levé. La moyenne pondérée tient compte du montant levé à bas prix et produit un ajustement beaucoup plus modéré." },
    { "q": "Un ratchet peut-il profiter au fondateur ?", "a": "Oui. Un ratchet de performance peut prévoir que les fondateurs reçoivent des actions supplémentaires si des objectifs sont atteints. Il sert alors à combler un écart de valorisation entre le dirigeant et le fonds." }
  ],
  "related": ["valoriser-une-pme", "calculateur-de-dilution", "lettre-d-intention-et-term-sheet"]
}
---
## L'anti-dilution : se protéger d'une baisse de valeur

L'investisseur entre à un prix par action. Si l'entreprise lève plus tard des fonds à un prix plus bas, la valeur de sa participation baisse. La clause d'anti-dilution compense cette baisse, en général par l'attribution d'actions supplémentaires ou par l'ajustement d'un ratio de conversion.

Elle ne joue pas lors d'une levée à prix égal ou supérieur : la dilution « normale » d'une levée au même prix n'est pas compensée.

## Full ratchet et moyenne pondérée : un exemple

Cas construit pour l'exemple : un fonds a investi 1 M€ à 10 € par action, soit 100 000 actions. Une nouvelle levée se fait à 5 € par action.

| Mécanisme | Principe | Prix de référence ajusté du fonds | Effet |
|---|---|---|---|
| Aucune clause | Le fonds subit la baisse comme les autres | 10 € | Pas d'action supplémentaire |
| Moyenne pondérée | Le prix est ajusté en tenant compte du montant levé à bas prix | Entre 5 € et 10 €, selon le montant de la nouvelle levée | Quelques actions supplémentaires |
| Full ratchet | Le prix du fonds est ramené au nouveau prix | 5 € | Le fonds reçoit de quoi détenir 200 000 actions, soit 100 000 de plus |

Les actions supplémentaires du fonds sont prises sur la part des autres actionnaires, en pratique les fondateurs. Avec un full ratchet, une petite levée de secours à bas prix peut coûter très cher au fondateur.

## Le ratchet de performance

Le ratchet sert aussi à résoudre un désaccord de valorisation. Le dirigeant estime l'entreprise à 6 M€, le fonds à 4 M€. Ils s'accordent sur une formule : la part du fonds est calculée sur 4 M€, mais si l'EBITDA atteint un objectif dans deux ans, le dirigeant récupère une partie du capital, ce qui revient à valoriser l'entreprise plus haut.

Pour qu'il soit juste :

- l'indicateur doit être défini précisément (EBITDA normalisé, méthode comptable) ;
- le dirigeant doit garder les moyens d'atteindre l'objectif ;
- le calcul doit être vérifiable par un tiers.

<!-- faire-eviter -->

## Ce qu'il faut faire simuler

Avant de signer, demandez à votre conseil une table de capitalisation qui montre trois cas : levée suivante à la hausse, au même prix, à la baisse. Le [calculateur de dilution](/calculateur-de-dilution/) donne l'effet d'une levée simple ; l'effet des clauses demande un calcul sur mesure.
