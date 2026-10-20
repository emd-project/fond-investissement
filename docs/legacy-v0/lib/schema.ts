import { SITE, abs } from "./site";
import type { Doc } from "./content";

export const publisherLd = {
  "@type": "Organization",
  "@id": `${SITE.url}/#editeur`,
  name: SITE.publisher.name,
  url: SITE.url,
  email: SITE.publisher.email,
  address: SITE.publisher.address,
  vatID: SITE.publisher.vat,
};

export const authorLd = {
  "@type": "Organization",
  "@id": `${SITE.url}/#redaction`,
  name: SITE.author.name,
  url: abs(`/auteurs/${SITE.author.slug}/`),
  parentOrganization: { "@id": `${SITE.url}/#editeur` },
};

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function faqLd(doc: Pick<Doc, "faq">) {
  if (!doc.faq?.length) return null;
  return {
    "@type": "FAQPage",
    mainEntity: doc.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleLd(doc: Doc, path: string, kind: "Article" | "BlogPosting" = "Article") {
  const base: Record<string, unknown> = {
    "@type": kind,
    "@id": `${abs(path)}#article`,
    headline: doc.h1,
    description: doc.description,
    inLanguage: "fr-BE",
    datePublished: doc.published,
    dateModified: doc.updated ?? doc.published,
    mainEntityOfPage: abs(path),
    author: authorLd,
    publisher: publisherLd,
    wordCount: doc.words,
    image: abs("/og.png"),
  };
  if (SITE.reviewer) {
    base.reviewedBy = { "@type": "Person", name: SITE.reviewer.name, jobTitle: SITE.reviewer.title, url: SITE.reviewer.url };
  }
  if (doc.sources?.length) base.citation = doc.sources.map((s) => s.label);
  if (kind === "BlogPosting") {
    base.speakable = { "@type": "SpeakableSpecification", cssSelector: [".chapo", ".answer-first"] };
  }
  return base;
}

export function graph(...nodes: (Record<string, unknown> | null)[]) {
  return { "@context": "https://schema.org", "@graph": nodes.filter(Boolean) };
}
