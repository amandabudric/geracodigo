import { crc16 } from './crc16'
import { normalize } from './normalize'

function emvField(id: string, value: string): string {
  const len = value.length.toString().padStart(2, '0')
  return id + len + value
}

export interface PixParams {
  keyType: 'CPF' | 'CNPJ' | 'EMAIL' | 'TELEFONE' | 'ALEATORIA'
  key: string
  name: string
  city: string
  value?: number
  txid?: string
  description?: string
}

function normalizePixKey(keyType: PixParams['keyType'], key: string): string {
  if (keyType === 'CPF' || keyType === 'CNPJ') {
    return key.replace(/\D/g, '')
  }
  return key
}

export function generatePixPayload(params: PixParams): string {
  const { keyType, key, name, city, value, txid, description } = params

  const normalizedKey = normalizePixKey(keyType, key)
  const normalizedName = normalize(name).slice(0, 25)
  const normalizedCity = normalize(city).slice(0, 15)
  const txidValue = (txid && txid.trim()) ? txid.trim().slice(0, 25) : '***'

  // ID 00
  const f00 = emvField('00', '01')

  // ID 26 — Merchant Account Information
  const gui = emvField('00', 'br.gov.bcb.pix')
  const keyField = emvField('01', normalizedKey)
  let descField = ''
  if (description) {
    const maxDescLen = Math.max(0, Math.min(40, 99 - gui.length - keyField.length - 4))
    if (maxDescLen > 0) {
      descField = emvField('02', normalize(description).slice(0, maxDescLen))
    }
  }
  const f26 = emvField('26', gui + keyField + descField)

  // ID 52
  const f52 = emvField('52', '0000')

  // ID 53
  const f53 = emvField('53', '986')

  // ID 54
  const f54 = value && value > 0 ? emvField('54', value.toFixed(2)) : ''

  // ID 58
  const f58 = emvField('58', 'BR')

  // ID 59
  const f59 = emvField('59', normalizedName)

  // ID 60
  const f60 = emvField('60', normalizedCity)

  // ID 62
  const f62 = emvField('62', emvField('05', txidValue))

  const payloadWithoutCrc = f00 + f26 + f52 + f53 + f54 + f58 + f59 + f60 + f62 + '6304'
  const checksum = crc16(payloadWithoutCrc)

  return payloadWithoutCrc + checksum
}
