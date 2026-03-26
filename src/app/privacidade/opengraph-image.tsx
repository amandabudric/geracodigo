import { makeOGImage, ogSize, ogContentType } from '@/lib/og-image'

export const size = ogSize
export const contentType = ogContentType
export const runtime = 'edge'
export const alt = 'Política de Privacidade | GeraCode'

export default function OGImage() {
  return makeOGImage(
    'Política de Privacidade',
    'Saiba como o GeraCode trata seus dados. Processamento 100% local, sem coleta de dados pessoais.'
  )
}
