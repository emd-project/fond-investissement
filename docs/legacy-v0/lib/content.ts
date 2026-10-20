import fs from "node:fs";
import path from "node:path";
import { Marked, type Tokens } from "marked";
import type { PillarId } from "./site";

export type PageType = "fiche" | "comparatif" | "outil" | "page" | "blog" | "pilier" | "glossaire";

export type Faq = { q: string; a: string };
export type Source = { label: string; url: string };

export type Meta = {
  slug: string;
  type: PageType;
  pillar?: PillarId;
  title: string; // balise <title> sans le suffixe du site
  description: string;
  h1: string;
  chapo: string;
  eyebrow?: string;
  published: string; // AAAA-MM-JJ
  updated?: string;
  faq?: Faq[];
  sources?: Source[];
  todo?: { faire: string[]; eviter: string[] };
  related?: string[];
  disclosure?: string;
  tool?: "dilution";
  order?: number;
  card?: string; // résumé court pour les listes
};

export type Doc = Meta & {
  html: string;
  toc: { id: string; text: string }[];
  words: number;
  minutes: number;
};

const ROOT = process.cwd();
const DIRS: Record<"pages" | "blog", string> = {
  pages: path.join(ROOT, "content/pages"),
  blog: path.join(ROOT, "content/blog"),
};

export function slugify(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripTags(s: string) {
  return s
    .replace(/<[^>]+>/g, "")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderTodo(todo: Meta["todo"], md: Marked) {
  if (!todo) return "";
  const li = (items: string[], mark: string) =>
    items.map((i) => `<li><span aria-hidden="true">${mark}</span>${md.parseInline(i)}</li>`).join("");
  return `<div class="todo"><div class="todo-col todo-do"><p class="todo-title">À faire</p><ul>${li(
    todo.faire,
    "›",
  )}</ul></div><div class="todo-col todo-avoid"><p class="todo-title">À éviter</p><ul>${li(
    todo.eviter,
    "×",
  )}</ul></div></div>`;
}

// Blocs ::: maison : :::note Titre / :::steps / :::key
function preprocess(src: string, md: Marked, meta: Meta) {
  let out = src.replace(/^<!-- faire-eviter -->$/m, () => renderTodo(meta.todo, md));
  out = out.replace(/^:::(note|key|steps)(?: (.*))?\n([\s\S]*?)^:::$/gm, (_m, kind: string, title: string | undefined, body: string) => {
    if (kind === "steps") {
      const items = body
        .trim()
        .split("\n")
        .map((l) => l.replace(/^\d+\.\s*/, "").trim())
        .filter(Boolean)
        .map((l) => {
          const [head, ...rest] = l.split(" : ");
          return `<li><strong>${md.parseInline(head)}</strong>${rest.length ? `<span>${md.parseInline(rest.join(" : "))}</span>` : ""}</li>`;
        })
        .join("");
      return `<ol class="steps">${items}</ol>`;
    }
    const t = title ? `<p class="box-title">${escapeHtml(title)}</p>` : "";
    return `<aside class="box box-${kind}">${t}${md.parse(body.trim())}</aside>`;
  });
  return out;
}

function render(meta: Meta, body: string) {
  const toc: { id: string; text: string }[] = [];
  const md = new Marked({ gfm: true });
  md.use({
    renderer: {
      heading(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, token: Tokens.Heading) {
        const inner = this.parser.parseInline(token.tokens);
        const text = stripTags(inner);
        const id = slugify(text);
        if (token.depth === 2) toc.push({ id, text });
        return `<h${token.depth} id="${id}">${inner}</h${token.depth}>\n`;
      },
      table(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, token: Tokens.Table) {
        const head = token.header.map((c) => `<th scope="col">${this.parser.parseInline(c.tokens)}</th>`).join("");
        const rows = token.rows
          .map((r) => `<tr>${r.map((c) => `<td>${this.parser.parseInline(c.tokens)}</td>`).join("")}</tr>`)
          .join("");
        return `<div class="table-wrap"><table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>`;
      },
      link(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, token: Tokens.Link) {
        const inner = this.parser.parseInline(token.tokens);
        const ext = /^https?:\/\//.test(token.href);
        const rel = ext ? ` rel="nofollow noopener noreferrer" target="_blank"` : "";
        return `<a href="${token.href}"${rel}>${inner}${ext ? '<span class="ext" aria-hidden="true">↗</span>' : ""}</a>`;
      },
    },
  });
  const html = md.parse(preprocess(body, md, meta)) as string;
  const words = stripTags(html).split(/\s+/).filter(Boolean).length + (meta.faq ?? []).reduce((n, f) => n + f.a.split(/\s+/).length, 0);
  return { html, toc, words, minutes: Math.max(3, Math.round(words / 220)) };
}

function parseFile(file: string): Doc {
  const raw = fs.readFileSync(file, "utf8");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`Frontmatter manquant : ${file}`);
  const meta = JSON.parse(m[1]) as Meta;
  return { ...meta, ...render(meta, m[2]) };
}

let cache: { pages: Doc[]; blog: Doc[] } | null = null;

function load() {
  if (cache) return cache;
  const read = (dir: string) =>
    fs.existsSync(dir)
      ? fs
          .readdirSync(dir)
          .filter((f) => f.endsWith(".md"))
          .map((f) => parseFile(path.join(dir, f)))
      : [];
  cache = { pages: read(DIRS.pages), blog: read(DIRS.blog) };
  return cache;
}

export const allPages = () => load().pages;
export const allBlog = () => [...load().blog].sort((a, b) => b.published.localeCompare(a.published));
export const getPage = (slug: string) => allPages().find((p) => p.slug === slug);
export const getPost = (slug: string) => load().blog.find((p) => p.slug === slug);

export const pagesInPillar = (id: PillarId) =>
  allPages()
    .filter((p) => p.pillar === id && !["page", "pilier"].includes(p.type))
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

export function hrefFor(slug: string) {
  if (getPost(slug)) return `/blog/${slug}/`;
  return `/${slug}/`;
}

export function findDoc(slug: string) {
  return getPage(slug) ?? getPost(slug);
}

export const lastUpdate = () =>
  [...allPages(), ...allBlog()].map((d) => d.updated ?? d.published).sort().at(-1) ?? "2026-10-15";
