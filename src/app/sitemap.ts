import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.geracodigo.com.br'
  const lastUpdate = new Date('2026-03-25')
  return [
    { url: base, lastModified: lastUpdate, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/gerador-de-qr-code-pix`, lastModified: lastUpdate, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${base}/gerador-de-codigo-de-barras`, lastModified: lastUpdate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/gerador-de-ean`, lastModified: lastUpdate, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${base}/gerador-de-qr-code`, lastModified: lastUpdate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/leitor-de-codigo-de-barras`, lastModified: lastUpdate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/gerador-de-sku`, lastModified: lastUpdate, changeFrequency: 'weekly', priority: 0.75 },
    { url: `${base}/sobre`, lastModified: lastUpdate, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/termos-e-privacidade`, lastModified: lastUpdate, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
