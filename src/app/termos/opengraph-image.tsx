import { makeOGImage, ogSize, ogContentType } from '@/lib/og-image'

export const size = ogSize
export const contentType = ogContentType
export const runtime = 'edge'
export const alt = 'Termos de Uso | GeraCode'

export default function OGImage() {
  return makeOGImage(
    'Termos de Uso',
    'Condições de uso das ferramentas gratuitas de geração de código de barras e QR Code.'
  )
}
