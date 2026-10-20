import { allBlog } from "@/lib/content";
import { SITE, abs } from "@/lib/site";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function GET() {
  const items = allBlog()
    .map(
      (p) => `    <item>
      <title>${esc(p.h1)}</title>
      <link>${abs(`/blog/${p.slug}/`)}</link>
      <guid>${abs(`/blog/${p.slug}/`)}</guid>
      <pubDate>${new Date(`${p.published}T08:00:00Z`).toUTCString()}</pubDate>
      <description>${esc(p.description)}</description>
    </item>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(SITE.name)} · Sur le terrain</title>
    <link>${abs("/blog/")}</link>
    <description>Situations de dirigeants de PME face aux fonds, aux banques et aux reprises.</description>
    <language>fr-BE</language>
${items}
  </channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
