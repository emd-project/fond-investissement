import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DocView from "@/components/DocView";
import JsonLd from "@/components/JsonLd";
import DilutionCalculator from "@/components/DilutionCalculator";
import { ComparisonCards, ComparisonTable } from "@/components/Comparison";
import Glossary, { glossaryLd } from "@/components/Glossary";
import { allPages, getPage, pagesInPillar } from "@/lib/content";
import { abs, pillarById, pillarBySlug } from "@/lib/site";
import { articleLd, breadcrumbLd, faqLd, graph } from "@/lib/schema";
import { comparisonLd } from "@/lib/funds";

export const dynamicParams = false;

export function generateStaticParams() {
  return allPages().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = getPage(slug);
  if (!doc) return {};
  const path = `/${slug}/`;
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: path },
    openGraph: { title: doc.h1, description: doc.description, url: abs(path), type: "article" },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getPage(slug);
  if (!doc) notFound();
  const path = `/${slug}/`;

  const crumbs = [{ name: "Accueil", path: "/" }];
  const pillar = doc.pillar ? pillarById(doc.pillar) : null;
  if (pillar && doc.type !== "pilier") crumbs.push({ name: pillar.label, path: `/${pillar.slug}/` });
  crumbs.push({ name: doc.card ?? doc.h1, path });

  if (doc.type === "pilier") {
    const p = pillarBySlug(slug)!;
    const items = pagesInPillar(p.id);
    const ld = graph(
      breadcrumbLd(crumbs),
      {
        "@type": "CollectionPage",
        "@id": `${abs(path)}#page`,
        name: doc.h1,
        description: doc.description,
        url: abs(path),
        inLanguage: "fr-BE",
        hasPart: items.map((d) => ({ "@type": "Article", headline: d.h1, url: abs(`/${d.slug}/`) })),
      },
      faqLd(doc),
    );
    return (
      <>
        <JsonLd data={ld} />
        <DocView doc={doc} path={path} crumbs={crumbs}>
          <section aria-labelledby="pages-du-sujet">
            <h2 id="pages-du-sujet" style={{ marginBottom: 12 }}>
              Les pages de ce sujet
            </h2>
            <ul className="index-list">
              {items.map((d) => (
                <li key={d.slug}>
                  <Link href={`/${d.slug}/`}>
                    <span className="il-title">{d.h1}</span>
                    <span className="il-meta">{d.minutes} min</span>
                    <span className="il-desc">{d.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </DocView>
      </>
    );
  }

  const ld = graph(
    breadcrumbLd(crumbs),
    doc.type === "page" ? { "@type": "WebPage", name: doc.h1, url: abs(path), description: doc.description } : articleLd(doc, path),
    faqLd(doc),
    doc.type === "comparatif" ? comparisonLd() : null,
    doc.type === "glossaire" ? glossaryLd(path) : null,
  );

  return (
    <>
      <JsonLd data={ld} />
      <DocView doc={doc} path={path} crumbs={crumbs} after={doc.type === "comparatif" ? <ComparisonCards /> : null}>
        {doc.type === "comparatif" ? <ComparisonTable /> : null}
        {doc.tool === "dilution" ? <DilutionCalculator /> : null}
        {doc.type === "glossaire" ? <Glossary /> : null}
      </DocView>
    </>
  );
}
