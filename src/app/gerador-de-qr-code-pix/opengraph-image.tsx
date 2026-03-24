export { ogSize as size, ogContentType as contentType } from '@/lib/og-image'
export const runtime = 'edge'
export const alt = 'Gerador de QR Code Pix Grátis — GeraCode'

import { makeOGImage } from '@/lib/og-image'

export default function OGImage() {
  return makeOGImage(
    'Gerador de QR Code Pix Grátis',
    'Payload BR Code EMV válido. CPF, CNPJ, e-mail ou chave aleatória. Sem cadastro.',
    '#10b981'
  )
}
