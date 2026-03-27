import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const BASE = 'https://www.geracodigo.com.br'

const pages: Array<{
  path: string
  lastModified: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}> = [
  { path: '', lastModified: '2026-03-27', changeFrequency: 'weekly', priority: 1 },
  { path: '/gerador-de-qr-code-pix', lastModified: '2026-03-27', changeFrequency: 'weekly', priority: 0.95 },
  { path: '/gerador-de-codigo-de-barras', lastModified: '2026-03-27', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/gerador-de-ean', lastModified: '2026-03-01', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/gerador-de-qr-code', lastModified: '2026-03-01', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/leitor-de-codigo-de-barras', lastModified: '2026-03-27', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/gerador-de-sku', lastModified: '2026-03-27', changeFrequency: 'weekly', priority: 0.75 },
  { path: '/sobre', lastModified: '2026-03-01', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/privacidade', lastModified: '2026-01-15', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/termos', lastModified: '2026-01-15', changeFrequency: 'yearly', priority: 0.3 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, lastModified, changeFrequency, priority }) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(lastModified),
    changeFrequency,
    priority,
  }))
}
