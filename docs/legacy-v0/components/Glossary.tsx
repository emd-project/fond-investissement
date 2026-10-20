import { slugify } from "@/lib/content";
import { abs } from "@/lib/site";

export const TERMS: { term: string; def: string; see?: string }[] = [
  { term: "Anti-dilution (clause d')", def: "Clause qui protège un investisseur si une levée future se fait à une valorisation plus basse que la sienne : il reçoit des actions supplémentaires ou un prix ajusté. La version « moyenne pondérée » est plus douce pour les fondateurs que la version « full ratchet ».", see: "anti-dilution-et-ratchet" },
  { term: "Business angel", def: "Personne physique qui investit son propre argent dans une jeune entreprise, souvent pour des montants de quelques dizaines à quelques centaines de milliers d'euros, et apporte son expérience." },
  { term: "Capital-développement", def: "Investissement en fonds propres dans une entreprise déjà rentable qui finance une nouvelle étape : capacité de production, acquisition, internationalisation.", see: "private-equity-capital-risque-capital-developpement" },
  { term: "Capital-risque (venture capital)", def: "Investissement en fonds propres dans une entreprise jeune et innovante, dont le modèle n'est pas encore rentable. Le risque est élevé, la part du capital demandée aussi.", see: "private-equity-capital-risque-capital-developpement" },
  { term: "Capital-transmission", def: "Intervention d'un fonds lors d'un changement d'actionnaire : reprise par les cadres (MBO), par un repreneur externe (MBI), ou recomposition de l'actionnariat familial.", see: "management-buy-out-mbo" },
  { term: "Cap table (table de capitalisation)", def: "Tableau qui liste les actionnaires, le nombre et la catégorie d'actions de chacun, avant et après chaque levée." },
  { term: "Clause d'agrément", def: "Clause qui soumet l'entrée d'un nouvel actionnaire à l'accord des actionnaires ou du conseil. Dans une SRL, le Code des sociétés (art. 5:63) prévoit un agrément par défaut pour les cessions à des tiers." },
  { term: "Closing", def: "Moment où l'opération est réalisée : signature des actes définitifs, versement des fonds, émission ou transfert des actions." },
  { term: "Convention d'actionnaires", def: "Contrat entre actionnaires qui organise la gouvernance, les transferts d'actions et la sortie. Contrairement aux statuts, elle n'est pas publiée.", see: "convention-d-actionnaires" },
  { term: "Crédit vendeur", def: "Partie du prix de cession que le vendeur accepte d'être payée plus tard, souvent sur plusieurs années. Il réduit le besoin de financement du repreneur et engage le vendeur dans la réussite de la reprise.", see: "management-buy-out-mbo" },
  { term: "Data room", def: "Ensemble organisé des documents de l'entreprise (juridiques, financiers, sociaux, commerciaux) mis à disposition de l'investisseur pendant la due diligence.", see: "due-diligence" },
  { term: "Dilution", def: "Baisse du pourcentage de capital détenu par un actionnaire lorsque de nouvelles actions sont émises au profit d'un autre.", see: "calculateur-de-dilution" },
  { term: "Drag along (sortie forcée)", def: "Clause qui permet à des actionnaires majoritaires, au-delà d'un seuil fixé, d'obliger les minoritaires à vendre aux mêmes conditions qu'eux lorsqu'un acheteur veut 100 % du capital.", see: "clauses-de-sortie-tag-drag-leaver" },
  { term: "Due diligence", def: "Audit mené par l'investisseur avant de s'engager : comptes, contrats, litiges, fiscalité, social, propriété intellectuelle, parfois environnement.", see: "due-diligence" },
  { term: "EBITDA", def: "Résultat d'exploitation avant amortissements, intérêts et impôts. Indicateur courant de la capacité d'une entreprise à générer de la trésorerie, souvent utilisé pour valoriser une PME rentable." },
  { term: "Evergreen (fonds)", def: "Fonds sans durée de vie fixée à l'avance. Il n'est pas obligé de revendre ses participations à une date donnée pour rembourser ses propres investisseurs.", see: "fonds-evergreen-ou-fonds-ferme" },
  { term: "Fonds fermé", def: "Fonds dont la durée de vie est fixée dès sa création. À l'approche du terme, il doit céder ses participations pour restituer l'argent à ses souscripteurs.", see: "fonds-evergreen-ou-fonds-ferme" },
  { term: "Fonds propres", def: "Ressources apportées par les actionnaires (capital, primes d'émission) et bénéfices laissés dans l'entreprise. Ils ne se remboursent pas selon un échéancier.", see: "dette-bancaire-ou-fonds-propres" },
  { term: "Good leaver / bad leaver", def: "Clause qui fixe le prix auquel un associé-dirigeant qui quitte l'entreprise doit céder ses actions : prix de marché s'il part dans des circonstances admises (good leaver), prix réduit s'il part en faute ou trop tôt (bad leaver).", see: "clauses-de-sortie-tag-drag-leaver" },
  { term: "Invest", def: "En Wallonie, société d'investissement à ancrage provincial ou sous-régional, souvent issue d'un partenariat entre la Région et des actionnaires privés. Exemples : Noshaq, Sambrinvest, Namur Invest, Invest.BW, IMBC.", see: "invest-public-ou-fonds-prive" },
  { term: "Lettre d'intention (LOI)", def: "Document qui fixe les grandes lignes d'une opération avant la due diligence : prix ou valorisation, montant, conditions, calendrier, exclusivité. Elle est en principe non contraignante, sauf certaines clauses.", see: "lettre-d-intention-et-term-sheet" },
  { term: "LBO (leveraged buy-out)", def: "Rachat d'une entreprise par une société holding qui s'endette pour payer une partie du prix. La dette est remboursée grâce aux dividendes que l'entreprise rachetée verse à la holding.", see: "management-buy-out-mbo" },
  { term: "MBI (management buy-in)", def: "Reprise d'une entreprise par un ou plusieurs dirigeants venus de l'extérieur, souvent avec l'appui d'un fonds.", see: "management-buy-in-mbi" },
  { term: "MBO (management buy-out)", def: "Reprise d'une entreprise par ses propres cadres, via une holding qui combine leur apport, de la dette bancaire et souvent un investisseur en capital.", see: "management-buy-out-mbo" },
  { term: "Mezzanine", def: "Financement situé entre la dette bancaire et le capital : prêt subordonné, souvent assorti d'un droit de conversion ou d'une rémunération variable. Plus cher qu'un crédit, moins dilutif qu'une augmentation de capital.", see: "pret-subordonne" },
  { term: "OBO (owner buy-out)", def: "Opération par laquelle le dirigeant-actionnaire cède une partie de ses actions à une holding dont il reste actionnaire, aux côtés d'un investisseur, pour transformer une partie de la valeur de l'entreprise en liquidités.", see: "owner-buy-out-obo" },
  { term: "Post-money", def: "Valorisation de l'entreprise juste après la levée : valorisation pre-money plus le montant levé.", see: "calculateur-de-dilution" },
  { term: "Pre-money", def: "Valorisation de l'entreprise retenue avant l'entrée du nouvel investisseur. C'est elle qui détermine le pourcentage qu'il obtient.", see: "valoriser-une-pme" },
  { term: "Préemption (droit de)", def: "Droit pour les actionnaires existants d'acheter en priorité les actions qu'un associé veut céder, au même prix que celui proposé par le tiers." },
  { term: "Prêt convertible", def: "Prêt qui peut être transformé en actions selon des conditions fixées au départ, souvent lors de la levée suivante.", see: "pret-subordonne" },
  { term: "Prêt subordonné", def: "Prêt remboursé après les autres dettes en cas de difficulté. Les banques le traitent souvent comme des quasi-fonds propres, ce qui facilite l'obtention d'un crédit.", see: "pret-subordonne" },
  { term: "Quasi-fonds propres", def: "Financements qui ne sont pas du capital mais que les prêteurs assimilent partiellement à des fonds propres : prêt subordonné, obligation convertible, mezzanine.", see: "dette-bancaire-ou-fonds-propres" },
  { term: "Ratchet", def: "Mécanisme qui ajuste la part d'un actionnaire selon la performance réelle ou le prix d'une opération future. Côté fondateurs, il peut récompenser l'atteinte d'objectifs ; côté investisseur, il le protège d'une baisse de valeur.", see: "anti-dilution-et-ratchet" },
  { term: "Tag along (sortie conjointe)", def: "Droit pour un minoritaire de vendre ses actions aux mêmes conditions que le majoritaire lorsque celui-ci cède le contrôle.", see: "clauses-de-sortie-tag-drag-leaver" },
  { term: "Tax shelter start-up / scale-up", def: "Réduction d'impôt pour les particuliers qui souscrivent des actions nouvelles d'une petite entreprise : 30 % ou 45 % pour une entreprise de moins de 4 ans, 25 % pour une entreprise en croissance de 5 à 10 ans, dans la limite de 100 000 € par an et par personne.", see: "tax-shelter-start-up-scale-up" },
  { term: "Term sheet", def: "Liste des principales conditions d'un investissement : valorisation, montant, catégorie d'actions, droits de l'investisseur, gouvernance, clauses de sortie. Elle prépare la convention d'actionnaires.", see: "lettre-d-intention-et-term-sheet" },
  { term: "Valorisation", def: "Valeur attribuée aux actions de l'entreprise lors d'une opération. Elle résulte de méthodes de calcul (multiples, flux de trésorerie actualisés, actif net) et d'une négociation.", see: "valoriser-une-pme" },
];

export function glossaryLd(path: string) {
  return {
    "@type": "DefinedTermSet",
    "@id": `${abs(path)}#termes`,
    name: "Glossaire du financement d'entreprise",
    inLanguage: "fr-BE",
    hasDefinedTerm: TERMS.map((t) => ({
      "@type": "DefinedTerm",
      "@id": `${abs(path)}#${slugify(t.term)}`,
      name: t.term,
      description: t.def,
    })),
  };
}

export default function Glossary() {
  const letters = Array.from(new Set(TERMS.map((t) => t.term[0].toUpperCase())));
  return (
    <section className="glossary" aria-labelledby="les-termes-de-a-a-z">
      <h2 id="les-termes-de-a-a-z" style={{ marginBottom: 10 }}>
        Les termes de A à Z
      </h2>
      <p style={{ fontFamily: "var(--f-mono)", fontSize: "0.85rem", marginBottom: 12 }}>
        {letters.map((l, i) => (
          <span key={l}>
            {i ? " · " : ""}
            <a href={`#${slugify(TERMS.find((t) => t.term[0].toUpperCase() === l)!.term)}`}>{l}</a>
          </span>
        ))}
      </p>
      <dl>
        {TERMS.map((t) => (
          <div key={t.term} id={slugify(t.term)}>
            <dt>{t.term}</dt>
            <dd>
              {t.def}
              {t.see ? (
                <>
                  {" "}
                  <a href={`/${t.see}/`}>Lire la fiche</a>
                </>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
