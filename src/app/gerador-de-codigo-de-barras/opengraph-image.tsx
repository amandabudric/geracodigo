export { ogSize as size, ogContentType as contentType } from '@/lib/og-image'
export const runtime = 'edge'
export const alt = 'Gerador de Código de Barras Grátis — GeraCode'

import { makeOGImage } from '@/lib/og-image'

export default function OGImage() {
  return makeOGImage(
    'Gerador de Código de Barras Grátis',
    'EAN-13, EAN-8, Code 128, Code 39, UPC-A e ISBN. Download PNG e SVG.',
    '#4f46e5'
  )
}
