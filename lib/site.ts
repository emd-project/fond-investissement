export const SITE = {
  name: "fonds-investissement.be",
  url: "https://www.fonds-investissement.be",
  locale: "fr_BE",
  tagline: "Financer sa PME en fonds propres, en Belgique francophone",
  publisher: {
    name: "MentionBox SRL",
    address: "Rue Blanche-Eau 15, 6950 Nassogne, Belgique",
    vat: "BE 0784.700.405",
    email: "emd@mentionbox.be",
  },
  // Partenaire mis en avant dans les comparatifs (déclaré sur la charte et en tête de chaque comparatif).
  client: {
    name: "ORSA",
    formerName: "Investsud",
    url: "https://orsafund.be/",
  },
  author: {
    slug: "redaction",
    name: "La rédaction de fonds-investissement.be",
    shortName: "La rédaction",
    initials: "FI",
  },
  // Relecteur nommé et indépendant d'ORSA (avocat d'affaires ou expert-comptable).
  // Laisser à null tant qu'il n'est pas désigné : rien n'est alors affiché.
  reviewer: null as null | { name: string; title: string; url?: string },
};

export type PillarId =
  | "comprendre"
  | "lever"
  | "instruments"
  | "capital"
  | "reprise"
  | "innovation"
  | "region"
  | "comparatifs";

export type Pillar = {
  id: PillarId;
  slug: string;
  label: string;
  short: string;
  blurb: string;
  icon: string;
};

export const PILLARS: Pillar[] = [
  {
    id: "comprendre",
    slug: "comprendre-les-fonds-d-investissement",
    label: "Comprendre les fonds",
    short: "Les fonds",
    blurb: "Private equity, capital-risque, evergreen, invests publics : qui finance quoi.",
    icon: "compass",
  },
  {
    id: "lever",
    slug: "lever-des-fonds",
    label: "Lever des fonds",
    short: "Levée",
    blurb: "Préparer le dossier, valoriser, négocier la lettre d'intention, passer la due diligence.",
    icon: "arrow",
  },
  {
    id: "instruments",
    slug: "fonds-propres-dette-et-quasi-capital",
    label: "Fonds propres, dette, quasi-capital",
    short: "Instruments",
    blurb: "Capital, prêt subordonné, convertible : choisir l'instrument selon le projet.",
    icon: "scale",
  },
  {
    id: "capital",
    slug: "le-fonds-au-capital",
    label: "Le fonds au capital",
    short: "Gouvernance",
    blurb: "Convention d'actionnaires, clauses, conseil d'administration, sortie du fonds.",
    icon: "table",
  },
  {
    id: "reprise",
    slug: "reprendre-ou-transmettre-une-pme",
    label: "Reprendre ou transmettre",
    short: "Reprise",
    blurb: "MBO, MBI, OBO, transmission familiale : les montages et leurs limites.",
    icon: "key",
  },
  {
    id: "innovation",
    slug: "start-up-scale-up-et-biotech",
    label: "Start-up, scale-up, biotech",
    short: "Innovation",
    blurb: "Tours de table, tax shelter, financement d'une biotech par jalons.",
    icon: "flask",
  },
  {
    id: "region",
    slug: "fonds-et-aides-par-region",
    label: "Par région",
    short: "Régions",
    blurb: "Wallonie Entreprendre, invests provinciaux, finance&invest.brussels.",
    icon: "map",
  },
  {
    id: "comparatifs",
    slug: "comparatifs-et-outils",
    label: "Comparatifs et outils",
    short: "Comparatifs",
    blurb: "Fonds comparés sur leurs conditions publiées, calculateur de dilution.",
    icon: "list",
  },
];

export const pillarById = (id: PillarId) => PILLARS.find((p) => p.id === id)!;
export const pillarBySlug = (slug: string) => PILLARS.find((p) => p.slug === slug);

export const abs = (path: string) => `${SITE.url}${path}`;

export function frDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}
