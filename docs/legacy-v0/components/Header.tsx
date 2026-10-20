import Link from "next/link";
import { PILLARS } from "@/lib/site";
import { pagesInPillar } from "@/lib/content";

export default function Header() {
  return (
    <header className="site-header">
      <div className="head">
        <Link className="logo" href="/" aria-label="fonds-investissement.be, accueil">
          <span className="logo-mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>
            fonds-investissement<b>.be</b>
          </span>
        </Link>
        <nav className="mainnav" aria-label="Navigation principale">
          <ul>
            <li className="has-mega">
              <Link href="/toutes-les-pages/">
                Le guide <span aria-hidden="true">▾</span>
              </Link>
              <div className="mega" role="group" aria-label="Sujets du guide">
                <div className="mega-grid">
                  {PILLARS.map((p) => (
                    <div key={p.id} className="mega-col">
                      <Link className="mega-title" href={`/${p.slug}/`}>
                        {p.label}
                      </Link>
                      <ul>
                        {pagesInPillar(p.id)
                          .slice(0, 5)
                          .map((d) => (
                            <li key={d.slug}>
                              <Link href={`/${d.slug}/`}>{d.card ?? d.h1}</Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </li>
            <li>
              <Link href="/top-fonds-d-investissement-pme-wallonie/">Comparatif</Link>
            </li>
            <li>
              <Link href="/calculateur-de-dilution/">Calculateur</Link>
            </li>
            <li>
              <Link href="/blog/">Blog</Link>
            </li>
            <li>
              <Link href="/glossaire-du-financement-d-entreprise/">Glossaire</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
