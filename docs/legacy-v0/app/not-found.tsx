import Link from "next/link";

export const metadata = { title: "Page introuvable", robots: { index: false } };

export default function NotFound() {
  return (
    <div className="doc">
      <header className="doc-head">
        <p className="eyebrow">Erreur 404</p>
        <h1>Cette page n&apos;existe pas, ou plus.</h1>
        <p className="chapo">
          Elle a peut-être changé d&apos;adresse. Le plan du site liste toutes les pages, sujet par sujet.
        </p>
        <p>
          <Link className="btn btn-primary" href="/toutes-les-pages/">
            Voir toutes les pages
          </Link>
        </p>
      </header>
    </div>
  );
}
