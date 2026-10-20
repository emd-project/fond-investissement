import Link from "next/link";
import { PILLARS, SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="foot">
        <div className="foot-col foot-about">
          <p className="logo logo-small">
            fonds-investissement<b>.be</b>
          </p>
          <p>
            Guide du financement en fonds propres pour les dirigeants de PME, de start-up et les repreneurs, en Wallonie et à
            Bruxelles. Édité par {SITE.publisher.name}.
          </p>
        </div>
        <nav className="foot-col" aria-label="Les sujets">
          <p className="foot-title">Les sujets</p>
          <ul>
            {PILLARS.map((p) => (
              <li key={p.id}>
                <Link href={`/${p.slug}/`}>{p.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="foot-col" aria-label="Repères">
          <p className="foot-title">Repères</p>
          <ul>
            <li>
              <Link href="/glossaire-du-financement-d-entreprise/">Glossaire</Link>
            </li>
            <li>
              <Link href="/calculateur-de-dilution/">Calculateur de dilution</Link>
            </li>
            <li>
              <Link href="/fonds-de-placement-ou-fonds-d-investissement/">Vous cherchez un placement ?</Link>
            </li>
            <li>
              <Link href="/toutes-les-pages/">Toutes les pages</Link>
            </li>
          </ul>
        </nav>
        <nav className="foot-col" aria-label="Le site">
          <p className="foot-title">Le site</p>
          <ul>
            <li>
              <Link href="/charte-editoriale/">Charte éditoriale</Link>
            </li>
            <li>
              <Link href="/charte-editoriale/#signaler-une-erreur">Signaler une erreur</Link>
            </li>
            <li>
              <Link href="/mentions-legales/">Mentions légales</Link>
            </li>
          </ul>
        </nav>
      </div>
      <p className="foot-legal">
        © {new Date().getFullYear()} {SITE.name} · Informations générales, pas un conseil en investissement, juridique ou fiscal
        individuel. Le site met {SITE.client.name} en avant dans ses comparatifs ; ce lien est déclaré dans la{" "}
        <Link href="/charte-editoriale/">charte éditoriale</Link>.
      </p>
    </footer>
  );
}
