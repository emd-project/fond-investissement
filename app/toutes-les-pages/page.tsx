import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { allBlog, pagesInPillar } from "@/lib/content";
import { PILLARS } from "@/lib/site";
import { breadcrumbLd, graph } from "@/lib/schema";

export const metadata = {
  title: "Toutes les pages sur les fonds d'investissement",
  description:
    "Toutes les pages du guide, sujet par sujet : comprendre les fonds, lever des fonds, prêt subordonné, convention d'actionnaires, reprise de PME, tax shelter, invests wallons.",
  alternates: { canonical: "/toutes-les-pages/" },
};

export default function AllPages() {
  const crumbs = [
    { name: "Accueil", path: "/" },
    { name: "Toutes les pages", path: "/toutes-les-pages/" },
  ];
  return (
    <div className="doc">
      <JsonLd data={graph(breadcrumbLd(crumbs))} />
      <nav className="crumbs" aria-label="Fil d'Ariane">
        <ol>
          <li>
            <Link href="/">Accueil</Link>
          </li>
          <li>
            <span aria-current="page">Toutes les pages</span>
          </li>
        </ol>
      </nav>
      <header className="doc-head">
        <p className="eyebrow">Plan du site</p>
        <h1>Toutes les pages, sujet par sujet</h1>
      </header>
      <div className="all-pages" style={{ paddingTop: 32 }}>
        {PILLARS.map((p) => (
          <section key={p.id}>
            <h2>
              <Link href={`/${p.slug}/`} style={{ color: "inherit", textDecoration: "none" }}>
                {p.label}
              </Link>
            </h2>
            <ul>
              {pagesInPillar(p.id).map((d) => (
                <li key={d.slug}>
                  <Link href={`/${d.slug}/`}>{d.h1}</Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <section>
          <h2>
            <Link href="/blog/" style={{ color: "inherit", textDecoration: "none" }}>
              Blog
            </Link>
          </h2>
          <ul>
            {allBlog().map((d) => (
              <li key={d.slug}>
                <Link href={`/blog/${d.slug}/`}>{d.h1}</Link>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Le site</h2>
          <ul>
            <li>
              <Link href="/fonds-de-placement-ou-fonds-d-investissement/">Fonds de placement ou fonds d&apos;investissement ?</Link>
            </li>
            <li>
              <Link href="/charte-editoriale/">Charte éditoriale</Link>
            </li>
            <li>
              <Link href="/auteurs/redaction/">La rédaction</Link>
            </li>
            <li>
              <Link href="/mentions-legales/">Mentions légales</Link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
