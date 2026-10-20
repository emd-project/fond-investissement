import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { allBlog } from "@/lib/content";
import { abs, frDate } from "@/lib/site";
import { breadcrumbLd, graph } from "@/lib/schema";

export const metadata = {
  title: "Blog : situations de dirigeants face aux fonds",
  description:
    "Le blog de fonds-investissement.be : des situations concrètes de dirigeants de PME face à une banque, un fonds ou une reprise, et la marche à suivre en Belgique.",
  alternates: { canonical: "/blog/" },
};

export default function BlogIndex() {
  const posts = allBlog();
  const ld = graph(breadcrumbLd([{ name: "Accueil", path: "/" }, { name: "Blog", path: "/blog/" }]), {
    "@type": "Blog",
    name: "Sur le terrain",
    url: abs("/blog/"),
    blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.h1, url: abs(`/blog/${p.slug}/`), datePublished: p.published })),
  });
  return (
    <div className="doc">
      <JsonLd data={ld} />
      <nav className="crumbs" aria-label="Fil d'Ariane">
        <ol>
          <li>
            <Link href="/">Accueil</Link>
          </li>
          <li>
            <span aria-current="page">Blog</span>
          </li>
        </ol>
      </nav>
      <header className="doc-head">
        <p className="eyebrow">Sur le terrain</p>
        <h1>Une situation, une décision à prendre</h1>
        <p className="chapo">
          Chaque billet part d&apos;un cas que rencontrent les dirigeants de PME : une banque qui hésite, un fonds qui demande trop,
          une retraite qui approche. Nous comparons les options et disons laquelle nous choisirions.
        </p>
      </header>
      <ul className="index-list" style={{ maxWidth: 860, marginTop: 24 }}>
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}/`}>
              <span className="il-title">{p.h1}</span>
              <span className="il-meta">{frDate(p.published)}</span>
              <span className="il-desc">{p.chapo}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
