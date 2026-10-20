import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DocView from "@/components/DocView";
import JsonLd from "@/components/JsonLd";
import { allBlog, getPost } from "@/lib/content";
import { abs } from "@/lib/site";
import { articleLd, breadcrumbLd, faqLd, graph } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return allBlog().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = getPost(slug);
  if (!doc) return {};
  const path = `/blog/${slug}/`;
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: path },
    openGraph: { title: doc.h1, description: doc.description, url: abs(path), type: "article", publishedTime: doc.published },
  };
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getPost(slug);
  if (!doc) notFound();
  const path = `/blog/${slug}/`;
  const crumbs = [
    { name: "Accueil", path: "/" },
    { name: "Blog", path: "/blog/" },
    { name: doc.h1, path },
  ];
  return (
    <>
      <JsonLd data={graph(articleLd(doc, path, "BlogPosting"), breadcrumbLd(crumbs), faqLd(doc))} />
      <DocView doc={doc} path={path} crumbs={crumbs} />
    </>
  );
}
