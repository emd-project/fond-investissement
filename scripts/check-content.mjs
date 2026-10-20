// Vérifie le contenu : frontmatter JSON, liens internes, slugs "related", renvois du glossaire, longueurs title/description.
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (dir) =>
  fs.readdirSync(path.join(root, dir)).filter((f) => f.endsWith(".md")).map((f) => {
    const raw = fs.readFileSync(path.join(root, dir, f), "utf8");
    const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!m) throw new Error(`Frontmatter manquant : ${f}`);
    return { file: `${dir}/${f}`, meta: JSON.parse(m[1]), body: m[2] };
  });

const pages = read("content/pages");
const blog = read("content/blog");
const routes = new Set(["/", "/blog/", "/toutes-les-pages/", "/auteurs/redaction/", "/blog/rss.xml", "/llms.txt", "/sitemap.xml"]);
for (const p of pages) routes.add(`/${p.meta.slug}/`);
for (const p of blog) routes.add(`/blog/${p.meta.slug}/`);
const slugs = new Set([...pages, ...blog].map((p) => p.meta.slug));

let errors = 0;
const err = (msg) => { errors++; console.log("✗", msg); };

for (const p of [...pages, ...blog]) {
  const { meta, body, file } = p;
  if (`${meta.slug}.md` !== path.basename(file)) err(`${file} : slug ≠ nom de fichier`);
  if (meta.title.length > 70) err(`${file} : title ${meta.title.length} car.`);
  if (meta.description.length > 165) err(`${file} : description ${meta.description.length} car.`);
  const links = [...body.matchAll(/\]\((\/[^)#\s]*)(#[^)]*)?\)/g), ...JSON.stringify(meta).matchAll(/href=\\"(\/[^"\\#]*)/g)].map((m) => m[1]);
  for (const l of links) if (!routes.has(l)) err(`${file} : lien interne cassé ${l}`);
  for (const r of meta.related ?? []) if (!slugs.has(r)) err(`${file} : related inconnu ${r}`);
  if (body.includes("<!-- faire-eviter -->") && !meta.todo) err(`${file} : marqueur faire-eviter sans todo`);
  if (meta.todo && !body.includes("<!-- faire-eviter -->")) err(`${file} : todo sans marqueur`);
}

// Liens codés en dur dans les composants et l'accueil
for (const f of ["app/page.tsx", "components/Header.tsx", "components/Footer.tsx", "app/toutes-les-pages/page.tsx", "components/DocView.tsx"]) {
  const src = fs.readFileSync(path.join(root, f), "utf8");
  for (const m of src.matchAll(/(?:href=|\[\s*"[^"]*",\s*)"(\/[^"#]*)/g)) if (!routes.has(m[1])) err(`${f} : lien ${m[1]}`);
}
const gl = fs.readFileSync(path.join(root, "components/Glossary.tsx"), "utf8");
for (const m of gl.matchAll(/see: "([^"]+)"/g)) if (!slugs.has(m[1])) err(`Glossaire : renvoi inconnu ${m[1]}`);
const terms = [...gl.matchAll(/\{ term: "/g)].length;

console.log(`${pages.length} pages, ${blog.length} billets, ${terms} termes de glossaire, ${errors} erreur(s)`);
process.exit(errors ? 1 : 0);
