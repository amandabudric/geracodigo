'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import QRCode from 'qrcode'
import { generatePixPayload, PixParams } from '@/lib/pix'

type KeyType = PixParams['keyType']

const KEY_TYPE_LABELS: Record<KeyType, string> = {
  CPF: 'CPF',
  CNPJ: 'CNPJ',
  EMAIL: 'E-mail',
  TELEFONE: 'Telefone',
  ALEATORIA: 'Chave aleatória (UUID)',
}

export default function PixGenerator() {
  const [keyType, setKeyType] = useState<KeyType>('EMAIL')
  const [key, setKey] = useState('')
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [value, setValue] = useState('')
  const [txid, setTxid] = useState('')
  const [description, setDescription] = useState('')
  const [payload, setPayload] = useState('')
  const [qrDataUrl, setQrDataUrl] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const generate = useCallback(async () => {
    if (!key.trim() || !name.trim() || !city.trim()) {
      setPayload('')
      setQrDataUrl('')
      setIsValid(false)
      setError('')
      return
    }
    try {
      const numValue = value ? parseFloat(value) : undefined
      const pix = generatePixPayload({
        keyType,
        key: key.trim(),
        name: name.trim(),
        city: city.trim(),
        value: numValue,
        txid: txid.trim() || undefined,
        description: description.trim() || undefined,
      })
      setPayload(pix)
      const dataUrl = await QRCode.toDataURL(pix, {
        width: 400,
        margin: 2,
        color: { dark: '#000000', light: '#ffffff' },
      })
      setQrDataUrl(dataUrl)
      setIsValid(true)
      setError('')
    } catch (e) {
      setError('Erro ao gerar QR Code. Verifique os dados.')
      setIsValid(false)
    }
  }, [keyType, key, name, city, value, txid, description])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(generate, 300)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [generate])

  const handleCopy = async () => {
    if (!payload) return
    await navigator.clipboard.writeText(payload)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadPng = () => {
    if (!qrDataUrl) return
    const a = document.createElement('a')
    a.href = qrDataUrl
    a.download = 'qr-pix.png'
    a.click()
  }

  const handleDownloadSvg = async () => {
    if (!payload) return
    const svgString = await QRCode.toString(payload, { type: 'svg', width: 400, margin: 2 })
    const blob = new Blob([svgString], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'qr-pix.svg'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Form */}
      <div className="flex-1 bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Dados do Pix</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de chave Pix</label>
            <select
              value={keyType}
              onChange={e => setKeyType(e.target.value as KeyType)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {(Object.keys(KEY_TYPE_LABELS) as KeyType[]).map(k => (
                <option key={k} value={k}>{KEY_TYPE_LABELS[k]}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Chave Pix</label>
            <input
              type="text"
              value={key}
              onChange={e => setKey(e.target.value)}
              placeholder={
                keyType === 'CPF' ? '000.000.000-00' :
                keyType === 'CNPJ' ? '00.000.000/0000-00' :
                keyType === 'EMAIL' ? 'exemplo@email.com' :
                keyType === 'TELEFONE' ? '+5511999998888' :
                'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do recebedor <span className="text-gray-400">(máx. 25 chars)</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value.slice(0, 25))}
              placeholder="Seu Nome ou Empresa"
              maxLength={25}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cidade <span className="text-gray-400">(máx. 15 chars)</span>
            </label>
            <input
              type="text"
              value={city}
              onChange={e => setCity(e.target.value.slice(0, 15))}
              placeholder="São Paulo"
              maxLength={15}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Valor (R$) <span className="text-gray-400">(opcional — deixe vazio para valor aberto)</span>
            </label>
            <input
              type="number"
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Identificador da transação <span className="text-gray-400">(opcional, máx. 25 chars)</span>
            </label>
            <input
              type="text"
              value={txid}
              onChange={e => setTxid(e.target.value.slice(0, 25))}
              placeholder="PEDIDO001"
              maxLength={25}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição <span className="text-gray-400">(opcional, máx. 40 chars)</span>
            </label>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value.slice(0, 40))}
              placeholder="Pagamento do pedido"
              maxLength={40}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-900 self-start">Preview do QR Code</h2>
          {qrDataUrl ? (
            <>
              <img src={qrDataUrl} alt="QR Code Pix" className="w-48 h-48 rounded-lg" />
              {isValid && (
                <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full text-xs font-semibold">
                  ✓ QR válido — testado com o padrão Banco Central
                </span>
              )}
              <div className="flex gap-2 w-full">
                <button
                  onClick={handleDownloadPng}
                  className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  Download PNG
                </button>
                <button
                  onClick={handleDownloadSvg}
                  className="flex-1 bg-white border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors"
                >
                  Download SVG
                </button>
              </div>
            </>
          ) : (
            <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm text-center px-4">
              {error || 'Preencha os campos para gerar o QR Code'}
            </div>
          )}
        </div>

        {payload && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-700">Payload BR Code</h3>
              <button
                onClick={handleCopy}
                className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                  copied
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {copied ? '✓ Copiado!' : 'Copiar payload'}
              </button>
            </div>
            <textarea
              readOnly
              value={payload}
              className="w-full text-xs font-mono bg-gray-50 border border-gray-200 rounded-lg p-3 h-24 resize-none focus:outline-none"
            />
          </div>
        )}
      </div>
    </div>
  )
}
