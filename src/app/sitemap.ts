import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://geracodigo.com.br'
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/gerador-de-qr-code-pix`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.95 },
    { url: `${base}/gerador-de-codigo-de-barras`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/gerador-de-ean`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/gerador-de-qr-code`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]
}
