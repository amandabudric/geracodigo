export { ogSize as size, ogContentType as contentType } from '@/lib/og-image'
export const runtime = 'edge'
export const alt = 'Gerador de QR Code Grátis — GeraCode'

import { makeOGImage } from '@/lib/og-image'

export default function OGImage() {
  return makeOGImage(
    'Gerador de QR Code Grátis',
    'Links, textos, Pix e qualquer conteúdo. Color picker incluso. Sem cadastro.',
    '#0ea5e9'
  )
}
