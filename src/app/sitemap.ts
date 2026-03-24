import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.geracodigo.com.br'
  const lastModified = new Date('2026-03-24')
  return [
    { url: base, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/gerador-de-qr-code-pix`, lastModified, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${base}/gerador-de-codigo-de-barras`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/gerador-de-ean`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/gerador-de-qr-code`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
  ]
}
