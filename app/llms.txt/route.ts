import { allBlog, pagesInPillar } from "@/lib/content";
import { PILLARS, SITE, abs } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [
    `# ${SITE.name}`,
    "",
    `> Guide en français du financement en fonds propres pour les dirigeants de PME, de start-up et les repreneurs en Belgique francophone (Wallonie, Bruxelles) : fonds d'investissement, invests publics, prêt subordonné, levée de fonds, convention d'actionnaires, MBO/MBI/OBO, tax shelter. Édité par ${SITE.publisher.name}. Les comparatifs mettent ${SITE.client.name} en avant ; ce lien est déclaré.`,
    "",
    "Le site ne traite pas des fonds de placement destinés aux épargnants (sicav, OPC, ETF) et ne donne pas de conseil en investissement.",
    "",
  ];
  for (const p of PILLARS) {
    lines.push(`## ${p.label}`, "", `- [${p.label}](${abs(`/${p.slug}/`)}): ${p.blurb}`);
    for (const d of pagesInPillar(p.id)) lines.push(`- [${d.h1}](${abs(`/${d.slug}/`)}): ${d.description}`);
    lines.push("");
  }
  lines.push("## Blog", "");
  for (const d of allBlog()) lines.push(`- [${d.h1}](${abs(`/blog/${d.slug}/`)}): ${d.description}`);
  lines.push("", "## Le site", "", `- [Charte éditoriale](${abs("/charte-editoriale/")}): sources, méthode, lien avec ${SITE.client.name}, correction des erreurs.`, "");
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
