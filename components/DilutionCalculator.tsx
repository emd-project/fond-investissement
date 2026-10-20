"use client";

import { useId, useMemo, useState } from "react";

const eur = new Intl.NumberFormat("fr-BE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const pct = new Intl.NumberFormat("fr-BE", { style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 1 });

function toNumber(v: string) {
  const n = Number(v.replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

export default function DilutionCalculator() {
  const id = useId();
  const [pre, setPre] = useState("4000000");
  const [raise, setRaise] = useState("1000000");
  const [stake, setStake] = useState("100");
  const [pool, setPool] = useState("0");

  const r = useMemo(() => {
    const preMoney = toNumber(pre);
    const amount = toNumber(raise);
    const myStake = Math.min(toNumber(stake), 100) / 100;
    const poolPct = Math.min(toNumber(pool), 50) / 100;
    const post = preMoney + amount;
    if (post <= 0) return null;
    const investor = amount / post;
    // Le pool d'options est créé avant l'entrée de l'investisseur (pool « pre-money ») : il dilue les actionnaires existants seuls.
    const existingAfter = 1 - investor;
    const mineAfter = myStake * existingAfter * (1 - poolPct);
    const poolAfter = existingAfter * poolPct;
    const myValueBefore = preMoney * myStake;
    const myValueAfter = post * mineAfter;
    return { preMoney, amount, post, investor, mineAfter, poolAfter, myStake, myValueBefore, myValueAfter };
  }, [pre, raise, stake, pool]);

  return (
    <div className="calc">
      <div className="calc-inputs">
        <label htmlFor={`${id}-pre`}>
          Valorisation avant levée (pre-money)
          <span className="calc-field">
            <input id={`${id}-pre`} inputMode="numeric" value={pre} onChange={(e) => setPre(e.target.value)} />
            <span>€</span>
          </span>
        </label>
        <label htmlFor={`${id}-raise`}>
          Montant levé en capital
          <span className="calc-field">
            <input id={`${id}-raise`} inputMode="numeric" value={raise} onChange={(e) => setRaise(e.target.value)} />
            <span>€</span>
          </span>
        </label>
        <label htmlFor={`${id}-stake`}>
          Votre part du capital aujourd&apos;hui
          <span className="calc-field">
            <input id={`${id}-stake`} inputMode="decimal" value={stake} onChange={(e) => setStake(e.target.value)} />
            <span>%</span>
          </span>
        </label>
        <label htmlFor={`${id}-pool`}>
          Plan d&apos;options créé avant l&apos;entrée (facultatif)
          <span className="calc-field">
            <input id={`${id}-pool`} inputMode="decimal" value={pool} onChange={(e) => setPool(e.target.value)} />
            <span>%</span>
          </span>
        </label>
      </div>

      {r ? (
        <div className="calc-out" aria-live="polite">
          <div className="calc-kpis">
            <div>
              <span>Valorisation après levée</span>
              <b>{eur.format(r.post)}</b>
            </div>
            <div>
              <span>Part de l&apos;investisseur</span>
              <b>{pct.format(r.investor)}</b>
            </div>
            <div>
              <span>Votre part après levée</span>
              <b>{pct.format(r.mineAfter)}</b>
            </div>
          </div>
          <div className="bar" role="img" aria-label={`Répartition après levée : vous ${pct.format(r.mineAfter)}, investisseur ${pct.format(r.investor)}`}>
            <span className="bar-me" style={{ width: `${r.mineAfter * 100}%` }} />
            <span className="bar-other" style={{ width: `${Math.max(0, 1 - r.mineAfter - r.investor - r.poolAfter) * 100}%` }} />
            <span className="bar-pool" style={{ width: `${r.poolAfter * 100}%` }} />
            <span className="bar-inv" style={{ width: `${r.investor * 100}%` }} />
          </div>
          <ul className="bar-legend">
            <li><i className="bar-me" /> Vous</li>
            <li><i className="bar-other" /> Autres actionnaires existants</li>
            <li><i className="bar-pool" /> Plan d&apos;options</li>
            <li><i className="bar-inv" /> Nouvel investisseur</li>
          </ul>
          <p className="calc-text">
            Avec une valorisation pre-money de {eur.format(r.preMoney)} et {eur.format(r.amount)} levés, l&apos;investisseur détient{" "}
            {pct.format(r.investor)} du capital. Votre part passe de {pct.format(r.myStake)} à {pct.format(r.mineAfter)}. Sa valeur
            théorique passe de {eur.format(r.myValueBefore)} à {eur.format(r.myValueAfter)} : vous détenez un pourcentage plus
            petit d&apos;une entreprise qui vaut plus, puisque l&apos;argent levé est entré dans la société.
          </p>
        </div>
      ) : (
        <p className="calc-text">Indiquez une valorisation et un montant pour voir le résultat.</p>
      )}
    </div>
  );
}
