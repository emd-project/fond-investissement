import type { MetadataRoute } from "next";
import { allBlog, allPages, lastUpdate } from "@/lib/content";
import { SITE, abs } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const last = lastUpdate();
  return [
    { url: abs("/"), lastModified: last },
    ...allPages().map((p) => ({ url: abs(`/${p.slug}/`), lastModified: p.updated ?? p.published })),
    { url: abs("/blog/"), lastModified: allBlog()[0]?.published ?? last },
    ...allBlog().map((p) => ({ url: abs(`/blog/${p.slug}/`), lastModified: p.updated ?? p.published })),
    { url: abs("/toutes-les-pages/"), lastModified: last },
    { url: abs(`/auteurs/${SITE.author.slug}/`), lastModified: last },
  ];
}
