import Link from "next/link";
import type { ReactNode } from "react";
import type { Doc } from "@/lib/content";
import { findDoc, hrefFor, pagesInPillar } from "@/lib/content";
import { SITE, frDate, pillarById } from "@/lib/site";

type Crumb = { name: string; path: string };

export default function DocView({
  doc,
  path,
  crumbs,
  children,
  after,
}: {
  doc: Doc;
  path: string;
  crumbs: Crumb[];
  children?: ReactNode;
  after?: ReactNode;
}) {
  const pillar = doc.pillar ? pillarById(doc.pillar) : null;
  const siblings = pillar ? pagesInPillar(pillar.id).filter((d) => d.slug !== doc.slug).slice(0, 4) : [];
  const related = (doc.related ?? [])
    .map((s) => findDoc(s))
    .filter((d): d is Doc => Boolean(d))
    .filter((d) => !siblings.some((s) => s.slug === d.slug));
  const updated = doc.updated && doc.updated !== doc.published ? doc.updated : null;

  return (
    <article className="doc">
      <nav className="crumbs" aria-label="Fil d'Ariane">
        <ol>
          {crumbs.map((c, i) => (
            <li key={c.path}>
              {i < crumbs.length - 1 ? <Link href={c.path}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}
            </li>
          ))}
        </ol>
      </nav>

      <header className="doc-head">
        <p className="eyebrow">{doc.eyebrow ?? pillar?.label ?? (doc.type === "blog" ? "Sur le terrain" : "Le site")}</p>
        <h1>{doc.h1}</h1>
        <p className="chapo">{doc.chapo}</p>
        <div className="byline">
          <span className="avatar" aria-hidden="true">
            {SITE.author.initials}
          </span>
          <span>
            Par <Link href={`/auteurs/${SITE.author.slug}/`}>{SITE.author.shortName}</Link>
            {SITE.reviewer ? (
              <>
                {" "}
                · relu par {SITE.reviewer.name}, {SITE.reviewer.title}
              </>
            ) : null}
            <br />
            <span className="muted">
              Publié le <time dateTime={doc.published}>{frDate(doc.published)}</time>
              {updated ? (
                <>
                  {" "}
                  · mis à jour le <time dateTime={updated}>{frDate(updated)}</time>
                </>
              ) : null}{" "}
              · {doc.minutes} min de lecture
            </span>
          </span>
        </div>
      </header>

      <div className="doc-grid">
        <aside className="doc-aside">
          {doc.toc.length > 2 ? (
            <details className="toc" open>
              <summary>Sur cette page</summary>
              <ol>
                {doc.toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`}>{t.text}</a>
                  </li>
                ))}
                {doc.faq?.length ? (
                  <li>
                    <a href="#questions-frequentes">Questions fréquentes</a>
                  </li>
                ) : null}
              </ol>
            </details>
          ) : null}
          {doc.tool !== "dilution" && doc.slug !== "calculateur-de-dilution" ? (
            <div className="aside-tool">
              <p className="aside-label">Outil lié</p>
              <p>Combien de capital cédez-vous ? Simulez une levée en trois chiffres.</p>
              <Link href="/calculateur-de-dilution/">Ouvrir le calculateur</Link>
            </div>
          ) : null}
        </aside>

        <div className="doc-body">
          {doc.disclosure ? (
            <aside className="disclosure">
              <p className="box-title">À savoir avant de lire</p>
              <p>{doc.disclosure}</p>
            </aside>
          ) : null}

          {children}

          <div className="prose" dangerouslySetInnerHTML={{ __html: doc.html }} />

          {after}

          {doc.faq?.length ? (
            <section className="faq" aria-labelledby="questions-frequentes">
              <h2 id="questions-frequentes">Questions fréquentes</h2>
              {doc.faq.map((f) => (
                <details key={f.q}>
                  <summary>
                    <h3>{f.q}</h3>
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </section>
          ) : null}

          {doc.sources?.length ? (
            <section className="sources" aria-labelledby="sources">
              <h2 id="sources">Sources consultées</h2>
              <ul>
                {doc.sources.map((s) =>
                  // Comme sur le site modèle : un seul lien vers le client, depuis le comparatif. Ses pages sont citées en texte.
                  s.url.includes(new URL(SITE.client.url).hostname) ? (
                    <li key={s.url}>
                      {s.label} ({s.url.replace(/^https?:\/\//, "").replace(/\/$/, "")})
                    </li>
                  ) : (
                    <li key={s.url}>
                      <a href={s.url} rel="nofollow noopener noreferrer" target="_blank">
                        {s.label}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </section>
          ) : null}

          {siblings.length || related.length ? (
            <section className="next-read" aria-labelledby="a-lire-ensuite">
              <h2 id="a-lire-ensuite">{pillar ? `À lire ensuite` : "Pour aller plus loin"}</h2>
              <ul className="cards">
                {[...related, ...siblings].slice(0, 6).map((d) => (
                  <li key={d.slug}>
                    <Link href={hrefFor(d.slug)}>
                      <span className="card-kicker">{d.pillar ? pillarById(d.pillar).short : "Blog"}</span>
                      <span className="card-title">{d.h1}</span>
                      <span className="card-meta">{d.minutes} min</span>
                    </Link>
                  </li>
                ))}
              </ul>
              {pillar ? (
                <p className="pillar-link">
                  Cette page fait partie du sujet <Link href={`/${pillar.slug}/`}>{pillar.label}</Link>.
                </p>
              ) : null}
            </section>
          ) : null}

          <footer className="doc-foot">
            <p>
              Information générale sur le droit et les pratiques en Belgique. Elle ne remplace pas l&apos;avis d&apos;un
              avocat, d&apos;un réviseur, d&apos;un expert-comptable ou d&apos;un conseiller financier sur votre dossier.
            </p>
            <p className="cite">
              Citer cette page : <code>{`${SITE.name.replace(/^/, "")}${path}`}</code>
            </p>
            <p>
              <Link href="/charte-editoriale/#signaler-une-erreur">Signaler une erreur</Link> ·{" "}
              <Link href="/charte-editoriale/">Charte éditoriale</Link>
            </p>
          </footer>
        </div>
      </div>
    </article>
  );
}
