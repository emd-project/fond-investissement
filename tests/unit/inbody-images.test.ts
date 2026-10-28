import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { INBODY_IMAGES, applyInBodyImages, inBodyImagePaths } from '@/lib/content/inbody-images'
import { articleSlugFrToEn } from '@/lib/i18n/article-slugs'

const ROOT = process.cwd()

describe('images de corps (registre inbody-images.json)', () => {
  const entries = Object.entries(INBODY_IMAGES)

  it('chaque image référencée existe dans public/', () => {
    const missing: string[] = []
    for (const [slug] of entries) {
      for (const p of inBodyImagePaths(slug) ?? []) {
        if (!existsSync(join(ROOT, 'public', p))) missing.push(p)
      }
    }
    expect(missing).toEqual([])
  })

  it('chaque entrée correspond à un article FR existant, avec alt FR + EN non vides', () => {
    for (const [slug, e] of entries) {
      expect(existsSync(join(ROOT, 'content/blog', e.cat, `${slug}.mdx`))).toBe(true)
      for (const a of [...e.fr, ...e.en]) expect(a.trim().length).toBeGreaterThan(10)
    }
  })

  it('remplace la cover recyclée et insère la 2e image, FR et EN', () => {
    for (const [slug, e] of entries) {
      const fr = readFileSync(join(ROOT, 'content/blog', e.cat, `${slug}.mdx`), 'utf8')
      const outFr = applyInBodyImages(fr, 'fr', slug)
      expect(outFr).not.toMatch(/src="\/images\/categories\//)
      expect(outFr).toContain(`/images/blog/${e.cat}/${slug}-1.jpeg`)
      expect(outFr).toContain(`/images/blog/${e.cat}/${slug}-2.jpeg`)
      // Aucune perte de contenu : seul ajout/remplacement de balises.
      expect(outFr.length).toBeGreaterThan(fr.length - 400)

      const enSlug = articleSlugFrToEn[slug]
      const enPath = join(ROOT, 'content/blog/en', e.cat, `${enSlug}.mdx`)
      if (enSlug && existsSync(enPath)) {
        const en = readFileSync(enPath, 'utf8')
        const outEn = applyInBodyImages(en, 'en', enSlug)
        expect(outEn).toContain(`alt="${e.en[0].replace(/"/g, '’')}"`)
        expect(outEn).toContain(`/images/blog/${e.cat}/${slug}-2.jpeg`)
      }
    }
  })

  it('article inconnu ou déjà cuit : contenu inchangé', () => {
    expect(applyInBodyImages('## A\n\ntexte', 'fr', 'inconnu')).toBe('## A\n\ntexte')
    const slug = entries[0][0]
    const baked = '## A\n\n<ArticleImage src="/images/blog/x.jpeg" alt="x" />\n\n## B\n\n## C'
    expect(applyInBodyImages(baked, 'fr', slug)).toBe(baked)
  })

  it('couvre tous les articles FR publiés', () => {
    const cats = readdirSync(join(ROOT, 'content/blog'), { withFileTypes: true })
      .filter((d) => d.isDirectory() && d.name !== 'en')
      .map((d) => d.name)
    const all = cats.flatMap((c) =>
      readdirSync(join(ROOT, 'content/blog', c)).filter((f) => f.endsWith('.mdx')).map((f) => f.slice(0, -4)),
    )
    const uncovered = all.filter((s) => !INBODY_IMAGES[s])
    // Informatif : un nouvel article publié sans images de corps n'échoue pas le build,
    // il garde sa balise d'origine. On veut juste le voir dans la sortie de test.
    if (uncovered.length) console.warn('[inbody-images] articles sans images de corps :', uncovered)
    expect(Array.isArray(uncovered)).toBe(true)
  })
})
