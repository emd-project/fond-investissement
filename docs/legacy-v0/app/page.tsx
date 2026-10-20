import Link from "next/link";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import { allBlog, allPages, lastUpdate, pagesInPillar } from "@/lib/content";
import { PILLARS, SITE, abs, frDate } from "@/lib/site";
import { publisherLd } from "@/lib/schema";

export const metadata = {
  title: { absolute: "Fonds d'investissement en Belgique : financer sa PME en fonds propres" },
  description:
    "Fonds d'investissement en Belgique : lever des fonds propres, choisir entre capital et prêt subordonné, reprendre une PME. Guide pour les dirigeants en Wallonie et à Bruxelles.",
  alternates: { canonical: "/" },
};

const SITUATIONS = [
  {
    n: "Situation 01",
    title: "La banque ne suit pas tout mon projet",
    text: "Une extension, une ligne de production, une acquisition : le crédit couvre une partie, il manque des fonds propres pour que la banque suive le reste.",
    links: [
      ["Dette bancaire ou fonds propres", "/dette-bancaire-ou-fonds-propres/"],
      ["Le prêt subordonné", "/pret-subordonne/"],
      ["La banque refuse mon extension", "/blog/la-banque-refuse-de-financer-mon-extension/"],
    ],
  },
  {
    n: "Situation 02",
    title: "Un fonds va entrer à mon capital",
    text: "Vous avez un premier contact, une lettre d'intention arrive. Ce qu'il faut préparer, négocier et faire écrire avant de signer.",
    links: [
      ["Préparer une levée de fonds", "/preparer-une-levee-de-fonds/"],
      ["Lettre d'intention et term sheet", "/lettre-d-intention-et-term-sheet/"],
      ["La convention d'actionnaires", "/convention-d-actionnaires/"],
    ],
  },
  {
    n: "Situation 03",
    title: "Je reprends ou je transmets une PME",
    text: "Cadres qui rachètent, repreneur externe, dirigeant qui veut sécuriser une partie de son patrimoine : les montages et le rôle du fonds.",
    links: [
      ["Le MBO, reprise par les cadres", "/management-buy-out-mbo/"],
      ["Le MBI, repreneur externe", "/management-buy-in-mbi/"],
      ["L'OBO, sécuriser sans vendre", "/owner-buy-out-obo/"],
    ],
  },
] as const;

export default function Home() {
  const pages = allPages().filter((p) => !["page", "pilier"].includes(p.type));
  const posts = allBlog().slice(0, 3);
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#site`,
        name: SITE.name,
        url: abs("/"),
        inLanguage: "fr-BE",
        description: "Guide du financement en fonds propres pour les dirigeants de PME en Belgique francophone.",
        publisher: { "@id": `${SITE.url}/#editeur` },
      },
      publisherLd,
    ],
  };

  return (
    <>
      <JsonLd data={ld} />
      <section className="hero">
        <div className="hero-grid">
          <div>
            <p className="eyebrow">Financement d&apos;entreprise · Wallonie et Bruxelles</p>
            <h1 style={{ marginTop: 14 }}>Faire entrer un fonds sans perdre la main sur son entreprise.</h1>
            <p className="lead">
              Capital, prêt subordonné, reprise par les cadres, convention d&apos;actionnaires : chaque page explique une situation de
              dirigeant et la marche à suivre, avec le Code des sociétés et les sources officielles en appui.
            </p>
            <div className="hero-cta">
              <Link className="btn btn-primary" href="/comprendre-les-fonds-d-investissement/">
                Comprendre les fonds
              </Link>
              <Link className="btn" href="/top-fonds-d-investissement-pme-wallonie/">
                Voir le comparatif
              </Link>
            </div>
            <p className="stats">
              <span>
                <b>{pages.length}</b> pages
              </span>
              <span>
                <b>{PILLARS.length}</b> sujets
              </span>
              <span>
                MàJ <b>{frDate(lastUpdate())}</b>
              </span>
              <span>
                <b>0 €</b>, sans inscription
              </span>
            </p>
          </div>
          <aside className="termsheet" aria-label="Lexique d'une levée en un coup d'œil">
            <header>
              <span>Term sheet · repères</span>
              <span>PME</span>
            </header>
            <dl>
              <dt>Ticket fonds PME</dt>
              <dd>100 k€ – 5 M€</dd>
              <dt>Instrument sans dilution</dt>
              <dd>prêt subordonné</dd>
              <dt>Horizon fonds fermé</dt>
              <dd>fixé à la création</dd>
              <dt>Horizon fonds evergreen</dt>
              <dd>sans échéance</dd>
              <dt>Tax shelter scale-up</dt>
              <dd>25 %</dd>
              <dt>Base légale</dt>
              <dd>Code des sociétés (CSA)</dd>
            </dl>
          </aside>
        </div>
      </section>

      <section className="section" aria-labelledby="sujets">
        <div className="section-head">
          <h2 id="sujets">Par où entrer dans le sujet</h2>
          <p>{pages.length} pages, toutes datées et sourcées</p>
        </div>
        <div className="pillars">
          {PILLARS.map((p) => (
            <Link key={p.id} href={`/${p.slug}/`}>
              <Icon name={p.icon} />
              <h3>{p.label}</h3>
              <p>{p.blurb}</p>
              <span className="count">{pagesInPillar(p.id).length} pages</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="situations">
        <div className="section-head">
          <h2 id="situations">Trois situations qui amènent la plupart des lecteurs</h2>
        </div>
        <div className="situations">
          {SITUATIONS.map((s) => (
            <div key={s.n} className="situation">
              <span className="num">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <ul>
                {s.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="band" aria-labelledby="instruments">
        <div className="band-inner">
          <div>
            <p className="eyebrow" style={{ color: "#9fe0cf" }}>
              Fonds propres, dette, quasi-capital
            </p>
            <h2 id="instruments" style={{ marginTop: 10 }}>
              Trois façons de financer le même projet
            </h2>
            <p>
              Le choix de l&apos;instrument compte autant que le choix de l&apos;investisseur. Il décide de ce que vous remboursez, de
              ce que vous cédez et de ce que votre banque accepte de prêter à côté.
            </p>
            <Link className="btn" href="/dette-bancaire-ou-fonds-propres/">
              Comparer les instruments
            </Link>
          </div>
          <div className="table-scroll" style={{ overflowX: "auto" }}>
            <table className="instr">
              <thead>
                <tr>
                  <th scope="col">Instrument</th>
                  <th scope="col">Remboursement</th>
                  <th scope="col">Dilution</th>
                  <th scope="col">Vu par la banque</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Crédit bancaire</td>
                  <td>Échéances fixes</td>
                  <td>Aucune</td>
                  <td>Dette</td>
                </tr>
                <tr>
                  <td>Prêt subordonné</td>
                  <td>Souvent in fine ou différé</td>
                  <td>Aucune</td>
                  <td>Quasi-fonds propres</td>
                </tr>
                <tr>
                  <td>Prêt convertible</td>
                  <td>Ou conversion en actions</td>
                  <td>Si conversion</td>
                  <td>Quasi-fonds propres</td>
                </tr>
                <tr>
                  <td>Augmentation de capital</td>
                  <td>Aucun</td>
                  <td>Oui</td>
                  <td>Fonds propres</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="regions">
        <div className="section-head">
          <h2 id="regions">Ce qui change selon la région</h2>
          <Link href="/fonds-et-aides-par-region/">Tous les acteurs par région</Link>
        </div>
        <div className="regions">
          <div>
            <h3>Partout en Belgique</h3>
            <p>
              Le droit des sociétés est fédéral : le Code des sociétés et des associations (CSA) régit les augmentations de capital, les
              clauses de cession et les conventions d&apos;actionnaires. Le tax shelter relève du SPF Finances.
            </p>
          </div>
          <div>
            <h3>Wallonie</h3>
            <p>
              Wallonie Entreprendre et un réseau d&apos;invests provinciaux (Noshaq, Sambrinvest, Namur Invest, Invest.BW, IMBC)
              co-investissent avec des fonds privés comme ORSA.
            </p>
          </div>
          <div>
            <h3>Bruxelles</h3>
            <p>
              finance&amp;invest.brussels prête, garantit et prend des participations jusqu&apos;à 5 M€ pour les PME, en
              co-investissement.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="terrain">
        <div className="section-head">
          <h2 id="terrain">Sur le terrain</h2>
          <Link href="/blog/">Tous les billets du blog</Link>
        </div>
        <ul className="posts">
          {posts.map((p) => (
            <li key={p.slug}>
              <span className="date">Blog · {frDate(p.published)}</span>
              <h3>
                <Link href={`/blog/${p.slug}/`}>{p.h1}</Link>
              </h3>
              <p>{p.chapo}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section" aria-labelledby="placement">
        <div className="box" style={{ maxWidth: 820 }}>
          <p className="box-title" id="placement">
            Vous cherchez à placer votre épargne ?
          </p>
          <p>
            Ce site s&apos;adresse aux entreprises qui cherchent des fonds. Pour comprendre les fonds de placement (sicav, OPC, ETF),
            lisez <Link href="/fonds-de-placement-ou-fonds-d-investissement/">notre page d&apos;orientation</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
