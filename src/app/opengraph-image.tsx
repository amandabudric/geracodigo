export { ogSize as size, ogContentType as contentType } from '@/lib/og-image'
export const runtime = 'edge'
export const alt = 'GeraCode — Gerador de Código de Barras e QR Code Pix'

import { makeOGImage } from '@/lib/og-image'

export default function OGImage() {
  return makeOGImage(
    'Gerador de Código de Barras e QR Code Pix',
    'Ferramentas gratuitas para lojistas brasileiros. Sem cadastro, sem servidor.'
  )
}
