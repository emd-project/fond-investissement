import { abs } from "./site";

// Relevé du 15.10.2026, sur les sites officiels de chaque acteur. Une valeur non trouvée = "non publié".
export const READ_DATE = "2026-10-15";

export type Fund = {
  rank: number;
  name: string;
  kind: string; // statut tel que publié
  zone: string;
  ticket: string | null;
  instruments: string;
  horizon: string | null;
  sectors: string;
  facts: string; // chiffres publiés par l'acteur lui-même
  fit: string; // pour qui
  url: string;
  sources: string[];
  isClient?: boolean;
};

export const FUNDS: Fund[] = [
  {
    rank: 1,
    name: "ORSA (ex-Investsud)",
    kind: "Fonds d'investissement wallon, evergreen",
    zone: "Wallonie",
    ticket: "500 000 € à 2 500 000 €",
    instruments: "Capital, quasi-capital, Smart Bond (prêt subordonné de 5 à 10 ans, sans dilution, rémunération en partie liée à l'EBITDA)",
    horizon: "Pas d'horizon de sortie imposé (fonds ouvert evergreen)",
    sectors: "Industrie (production, équipement, construction) et innovation (santé, digital, durabilité), biotech",
    facts: "Actif depuis 1985, plus de 300 entreprises accompagnées, plus de 120 M€ sous gestion",
    fit: "PME wallonnes de 20 à 150 collaborateurs : développement, reprise, transmission ; start-up, scale-up et biotech ancrées en Wallonie",
    url: "https://orsafund.be/a-propos/",
    sources: ["https://orsafund.be/", "https://orsafund.be/a-propos/", "https://orsafund.be/financer-ma-pme/", "https://orsafund.be/expertises/orsa-smart-bond/"],
    isClient: true,
  },
  {
    rank: 2,
    name: "Namur Invest",
    kind: "Société d'investissement privée à vocation commerciale (60 % privé, 40 % Région wallonne via Wallonie Entreprendre)",
    zone: "Province de Namur",
    ticket: "100 000 € à 2,5 M€ en général",
    instruments: "Participation ouverte ou fermée, prêts convertible, subordonné, chirographaire, garanti, bullet, leasing immobilier",
    horizon: null,
    sectors: "Généraliste ; agroalimentaire, tourisme, santé et écoconstruction bien représentés",
    facts: "Portefeuille réparti à environ 20 % en capital et 80 % en dette ; trois à quatre interventions par entreprise en moyenne",
    fit: "PME implantées en province de Namur, y compris pour des montants inférieurs à 500 000 €",
    url: "https://namurinvest.be/",
    sources: ["https://namurinvest.be/nos-solutions-de-financement/reponsesaux-questions-courantes/"],
  },
  {
    rank: 3,
    name: "Invest.BW (ex-Nivelinvest)",
    kind: "Invest du Brabant wallon",
    zone: "Brabant wallon",
    ticket: "Jusqu'à 2,5 M€ au total, en un ou plusieurs tours",
    instruments: "Prise de participation, prêt subordonné ou mezzanine, prêt convertible",
    horizon: "Interventions typiquement de 5 à 10 ans",
    sectors: "Généraliste ; start-up technologiques de moins de 9 ans",
    facts: "Ne finance jamais seul la totalité du besoin : intervention aux côtés d'autres investisseurs ou de la banque",
    fit: "PME et start-up du Brabant wallon qui ne sont pas en difficulté",
    url: "https://investbw.be/",
    sources: ["https://investbw.be/partenariat/"],
  },
  {
    rank: 4,
    name: "Sambrinvest",
    kind: "Partenariat public-privé",
    zone: "Charleroi Métropole",
    ticket: null,
    instruments: "Capital à risque, prêts subordonnés, convertibles ou participatifs, prêts ordinaires",
    horizon: null,
    sectors: "Secteurs prioritaires définis par l'invest, dont les sciences de la vie",
    facts: "Plus de 35 ans d'expérience, près de 300 PME en portefeuille, plus de 200 M€ sous gestion",
    fit: "Start-up, PME en croissance ou en transmission de la région de Charleroi",
    url: "https://www.sambrinvest.be/fr/",
    sources: ["https://www.sambrinvest.be/fr/qui-sommes-nous/", "https://www.sambrinvest.be/fr/nos-solutions-de-financement/"],
  },
  {
    rank: 5,
    name: "Noshaq (ex-Meusinvest)",
    kind: "Invest de la province de Liège, groupe de plusieurs sociétés",
    zone: "Province de Liège",
    ticket: null,
    instruments: "Participations en capital, prêts, leasings immobiliers et mobiliers selon les entités du groupe",
    horizon: null,
    sectors: "Sept secteurs prioritaires",
    facts: "120 M€ d'investissements décidés par an en moyenne sur les cinq dernières années ; 60 collaborateurs",
    fit: "Entreprises liégeoises, de la start-up à la PME établie",
    url: "https://noshaq.be/",
    sources: ["https://noshaq.be/", "https://noshaq.be/a-propos/structure-du-groupe/"],
  },
  {
    rank: 6,
    name: "IMBC",
    kind: "Société de financement pour PME",
    zone: "Mons, Borinage et Centre",
    ticket: null,
    instruments: "Non précisé sur les pages consultées",
    horizon: null,
    sectors: "PME, sociétés innovantes, spin-offs et artisans",
    facts: "Intervient de la création à la transmission",
    fit: "Entreprises de la région de Mons, du Borinage et du Centre",
    url: "https://www.imbc.be/",
    sources: ["https://www.imbc.be/", "https://www.imbc.be/about/"],
  },
  {
    rank: 7,
    name: "Wallonie Entreprendre (WE)",
    kind: "Outil financier public de la Région wallonne",
    zone: "Wallonie",
    ticket: null,
    instruments: "Capital, prêts, garanties ; financement des invests provinciaux",
    horizon: null,
    sectors: "Tous secteurs",
    facts: "Portefeuille valorisé à 4,1 Md€ ; 1 Md€ investi dans les invests, qui financent eux-mêmes les PME de proximité",
    fit: "Dossiers wallons qui dépassent un invest local, ou qui combinent prêt, garantie et capital",
    url: "https://www.wallonie-entreprendre.be/fr/",
    sources: ["https://www.wallonie-entreprendre.be/fr/a-propos/", "https://www.wallonie-entreprendre.be/fr/financements/capital/"],
  },
  {
    rank: 8,
    name: "finance&invest.brussels",
    kind: "Outil financier public de la Région de Bruxelles-Capitale",
    zone: "Région de Bruxelles-Capitale",
    ticket: "Jusqu'à 5 M€ pour les PME, en co-investissement",
    instruments: "Prêts, garanties, prises de participation, prêt proxi (via la filiale brusoc)",
    horizon: null,
    sectors: "Tous secteurs, des indépendants aux scale-ups",
    facts: "Intervient en complément des banques et des fonds privés",
    fit: "Entreprises établies à Bruxelles",
    url: "https://finance.brussels/",
    sources: ["https://finance.brussels/"],
  },
  {
    rank: 9,
    name: "Theodorus",
    kind: "Fonds d'amorçage lié à l'ULB (plusieurs fonds, dont un evergreen)",
    zone: "Belgique, avec ouverture vers le Canada (Theodorus IV)",
    ticket: "250 000 € au premier investissement, jusqu'à 2,5 M€ (Theodorus IV : 500 000 € à 2,5 M€)",
    instruments: "Capital, seed et early stage",
    horizon: "Fonds fermés de 12 à 14 ans (Theodorus II et III) ; Theodorus I est evergreen",
    sectors: "Biotech, medtech, digital, ingénierie",
    facts: "Plus de 70 M€ sous gestion",
    fit: "Spin-offs et start-up deep tech au stade de l'amorçage",
    url: "https://theodorus.be/",
    sources: ["https://theodorus.be/about-us/"],
  },
];

export function comparisonLd() {
  return {
    "@type": "ItemList",
    name: "Fonds d'investissement pour PME en Wallonie et à Bruxelles",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: FUNDS.length,
    itemListElement: FUNDS.map((f) => ({
      "@type": "ListItem",
      position: f.rank,
      item: { "@type": "Organization", name: f.name, url: f.url, areaServed: f.zone },
    })),
  };
}

export const fundsPageUrl = abs("/top-fonds-d-investissement-pme-wallonie/");
