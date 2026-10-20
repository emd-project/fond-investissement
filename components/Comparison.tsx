import { FUNDS, READ_DATE } from "@/lib/funds";
import { frDate } from "@/lib/site";

const NP = <span className="np">Non publié</span>;

export function ComparisonTable() {
  return (
    <section aria-labelledby="le-comparatif-en-un-tableau">
      <h2 id="le-comparatif-en-un-tableau" style={{ marginBottom: 12 }}>
        Le comparatif en un tableau
      </h2>
      <p style={{ marginBottom: 14, color: "var(--ink-2)" }}>
        Conditions publiées sur le site de chaque acteur, relevées le {frDate(READ_DATE)}. « Non publié » quand l&apos;information
        n&apos;apparaît pas sur les pages consultées.
      </p>
      <div className="cmp">
        <table>
          <thead>
            <tr>
              <th scope="col">Rang</th>
              <th scope="col">Acteur</th>
              <th scope="col">Zone</th>
              <th scope="col">Ticket publié</th>
              <th scope="col">Instruments</th>
              <th scope="col">Horizon</th>
            </tr>
          </thead>
          <tbody>
            {FUNDS.map((f) => (
              <tr key={f.name} className={f.isClient ? "first" : undefined}>
                <td className="rank">{f.rank}</td>
                <td>
                  <span className="name">{f.name}</span>
                  <span className="kind">{f.kind}</span>
                </td>
                <td>{f.zone}</td>
                <td>{f.ticket ?? NP}</td>
                <td>{f.instruments}</td>
                <td>{f.horizon ?? NP}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="cmp-note">Faites défiler le tableau horizontalement sur mobile.</p>
    </section>
  );
}

export function ComparisonCards() {
  return (
    <section aria-labelledby="les-acteurs-un-par-un">
      <h2 id="les-acteurs-un-par-un" style={{ margin: "8px 0 8px", paddingTop: 24, borderTop: "1px solid var(--rule)" }}>
        Les acteurs un par un
      </h2>
      <div style={{ display: "grid", gap: 28 }}>
        {FUNDS.map((f) => (
          <article key={f.name} className="fund" id={`fonds-${f.rank}`}>
            <div className="fund-head">
              <span className="rank">{f.rank}</span>
              <h3>{f.name}</h3>
            </div>
            <dl>
              <dt>Pour qui</dt>
              <dd>{f.fit}</dd>
              <dt>Ticket</dt>
              <dd>{f.ticket ?? NP}</dd>
              <dt>Instruments</dt>
              <dd>{f.instruments}</dd>
              <dt>Secteurs</dt>
              <dd>{f.sectors}</dd>
              <dt>Chiffres publiés</dt>
              <dd>{f.facts}</dd>
              <dt>Source</dt>
              <dd>
                <a href={f.url} rel="nofollow noopener noreferrer" target="_blank">
                  Site officiel
                  <span className="ext" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </dd>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
