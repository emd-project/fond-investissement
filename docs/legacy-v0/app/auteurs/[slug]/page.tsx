import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { allBlog, allPages, hrefFor } from "@/lib/content";
import { SITE, abs, frDate } from "@/lib/site";
import { authorLd, breadcrumbLd, graph, publisherLd } from "@/lib/schema";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ slug: SITE.author.slug }];
}

export const metadata = {
  title: "La rédaction : qui écrit les fiches",
  description:
    "Qui rédige les fiches de fonds-investissement.be, avec quelles sources et quelle méthode : textes du Code des sociétés, sources officielles, conditions publiées par les fonds.",
  alternates: { canonical: `/auteurs/${SITE.author.slug}/` },
};

export default async function Author({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug !== SITE.author.slug) notFound();
  const path = `/auteurs/${slug}/`;
  const docs = [...allPages().filter((p) => !["page", "pilier"].includes(p.type)), ...allBlog()].sort((a, b) =>
    (b.updated ?? b.published).localeCompare(a.updated ?? a.published),
  );
  const crumbs = [
    { name: "Accueil", path: "/" },
    { name: SITE.author.shortName, path },
  ];
  return (
    <div className="doc">
      <JsonLd data={graph({ ...authorLd, description: "Rédaction des fiches et du blog de fonds-investissement.be.", url: abs(path) }, publisherLd, breadcrumbLd(crumbs))} />
      <nav className="crumbs" aria-label="Fil d'Ariane">
        <ol>
          <li>
            <Link href="/">Accueil</Link>
          </li>
          <li>
            <span aria-current="page">{SITE.author.shortName}</span>
          </li>
        </ol>
      </nav>
      <header className="doc-head">
        <p className="eyebrow">Auteur</p>
        <h1>{SITE.author.name}</h1>
        <p className="chapo">
          La rédaction de {SITE.name} est assurée par l&apos;équipe éditoriale de {SITE.publisher.name}. Chaque fiche part du Code
          des sociétés et des associations, des textes publiés par le SPF Finances, la FSMA et les outils régionaux, et des conditions
          que les fonds publient eux-mêmes. Les pages sont datées et listent leurs sources.
        </p>
        <p>
          <Link href="/charte-editoriale/">Lire la charte éditoriale</Link>
        </p>
      </header>
      <section className="section" style={{ paddingInline: 0, paddingTop: 32 }}>
        <h2 style={{ marginBottom: 12 }}>Les pages signées</h2>
        <ul className="index-list" style={{ maxWidth: 860 }}>
          {docs.map((d) => (
            <li key={d.slug}>
              <Link href={hrefFor(d.slug)}>
                <span className="il-title">{d.h1}</span>
                <span className="il-meta">{frDate(d.updated ?? d.published)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
