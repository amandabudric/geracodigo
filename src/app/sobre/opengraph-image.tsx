import { makeOGImage, ogSize, ogContentType } from '@/lib/og-image'

export const size = ogSize
export const contentType = ogContentType
export const runtime = 'edge'
export const alt = 'Sobre o GeraCode | Ferramentas Gratuitas para Lojistas'

export default function OGImage() {
  return makeOGImage(
    'Sobre o GeraCode',
    'Ferramentas gratuitas e 100% privadas para lojistas e empreendedores brasileiros.'
  )
}
