export { ogSize as size, ogContentType as contentType } from '@/lib/og-image'
export const runtime = 'edge'
export const alt = 'Gerador de EAN-13 e EAN-8 Grátis — GeraCode'

import { makeOGImage } from '@/lib/og-image'

export default function OGImage() {
  return makeOGImage(
    'Gerador de EAN-13 e EAN-8 Grátis',
    'Crie códigos EAN para produtos, e-commerce e varejo. Download imediato.',
    '#f59e0b'
  )
}
