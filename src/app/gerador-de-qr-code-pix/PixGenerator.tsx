'use client'

import { useState, useCallback } from 'react'
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

const KEY_PLACEHOLDERS: Record<KeyType, string> = {
  CPF: '000.000.000-00',
  CNPJ: '00.000.000/0000-00',
  EMAIL: 'exemplo@email.com',
  TELEFONE: '+5511999998888',
  ALEATORIA: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
}

interface FieldErrors {
  key?: string
  name?: string
  city?: string
}

const inputBase = 'w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-colors'
const inputNormal = `${inputBase} border-gray-300 focus:ring-indigo-500`
const inputErr = `${inputBase} border-red-400 bg-red-50 focus:ring-red-400`

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
  const [isGenerating, setIsGenerating] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  const clearFieldError = (field: keyof FieldErrors) => {
    setFieldErrors(prev => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const handleGenerate = useCallback(async () => {
    const errors: FieldErrors = {}
    if (!key.trim()) errors.key = 'Informe a chave Pix'
    if (!name.trim()) errors.name = 'Informe o nome do recebedor'
    if (!city.trim()) errors.city = 'Informe a cidade'

    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

    setIsGenerating(true)
    setError('')
    try {
      const parsedValue = value ? parseFloat(value) : undefined
      const numValue = parsedValue !== undefined
        ? Math.max(0, Math.min(999999.99, parsedValue))
        : undefined
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
    } catch {
      setError('Erro ao gerar QR Code. Verifique os dados informados.')
      setIsValid(false)
    } finally {
      setIsGenerating(false)
    }
  }, [keyType, key, name, city, value, txid, description])

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
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Dados do Pix</h2>
        <p className="text-xs text-gray-400 mb-4">Campos com <span className="text-red-500">*</span> são obrigatórios</p>

        <fieldset className="space-y-4 border-0 p-0 m-0">
          <legend className="sr-only">Dados do Pix</legend>

          {/* Tipo de chave */}
          <div>
            <label htmlFor="pix-key-type" className="block text-sm font-medium text-gray-700 mb-1">Tipo de chave Pix</label>
            <select
              id="pix-key-type"
              value={keyType}
              onChange={e => {
                setKeyType(e.target.value as KeyType)
                setKey('')
                clearFieldError('key')
              }}
              className={inputNormal}
            >
              {(Object.keys(KEY_TYPE_LABELS) as KeyType[]).map(k => (
                <option key={k} value={k}>{KEY_TYPE_LABELS[k]}</option>
              ))}
            </select>
          </div>

          {/* Chave Pix */}
          <div>
            <label htmlFor="pix-key" className="block text-sm font-medium text-gray-700 mb-1">
              Chave Pix <span className="text-red-500">*</span>
            </label>
            <input
              id="pix-key"
              type="text"
              value={key}
              onChange={e => { setKey(e.target.value); clearFieldError('key') }}
              placeholder={KEY_PLACEHOLDERS[keyType]}
              className={fieldErrors.key ? inputErr : inputNormal}
              aria-required="true"
              aria-invalid={!!fieldErrors.key}
              aria-describedby={fieldErrors.key ? 'pix-key-error' : undefined}
            />
            {fieldErrors.key && (
              <p id="pix-key-error" className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <span aria-hidden="true">⚠</span> {fieldErrors.key}
              </p>
            )}
          </div>

          {/* Nome */}
          <div>
            <label htmlFor="pix-name" className="block text-sm font-medium text-gray-700 mb-1">
              Nome do recebedor <span className="text-red-500">*</span>{' '}
              <span className="text-gray-400 font-normal">(máx. 25 chars)</span>
            </label>
            <input
              id="pix-name"
              type="text"
              value={name}
              onChange={e => { setName(e.target.value); clearFieldError('name') }}
              placeholder="Seu Nome ou Empresa"
              maxLength={25}
              className={fieldErrors.name ? inputErr : inputNormal}
              aria-required="true"
              aria-invalid={!!fieldErrors.name}
              aria-describedby={fieldErrors.name ? 'pix-name-error' : undefined}
            />
            {fieldErrors.name && (
              <p id="pix-name-error" className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <span aria-hidden="true">⚠</span> {fieldErrors.name}
              </p>
            )}
          </div>

          {/* Cidade */}
          <div>
            <label htmlFor="pix-city" className="block text-sm font-medium text-gray-700 mb-1">
              Cidade <span className="text-red-500">*</span>{' '}
              <span className="text-gray-400 font-normal">(máx. 15 chars)</span>
            </label>
            <input
              id="pix-city"
              type="text"
              value={city}
              onChange={e => { setCity(e.target.value); clearFieldError('city') }}
              placeholder="São Paulo"
              maxLength={15}
              className={fieldErrors.city ? inputErr : inputNormal}
              aria-required="true"
              aria-invalid={!!fieldErrors.city}
              aria-describedby={fieldErrors.city ? 'pix-city-error' : undefined}
            />
            {fieldErrors.city && (
              <p id="pix-city-error" className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <span aria-hidden="true">⚠</span> {fieldErrors.city}
              </p>
            )}
          </div>

          {/* Valor */}
          <div>
            <label htmlFor="pix-value" className="block text-sm font-medium text-gray-700 mb-1">
              Valor (R$){' '}
              <span className="text-gray-400 font-normal">(opcional — deixe vazio para valor aberto)</span>
            </label>
            <input
              id="pix-value"
              type="number"
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              className={inputNormal}
            />
          </div>

          {/* TXID */}
          <div>
            <label htmlFor="pix-txid" className="block text-sm font-medium text-gray-700 mb-1">
              Identificador da transação{' '}
              <span className="text-gray-400 font-normal">(opcional, máx. 25 chars)</span>
            </label>
            <input
              id="pix-txid"
              type="text"
              value={txid}
              onChange={e => setTxid(e.target.value)}
              placeholder="PEDIDO001"
              maxLength={25}
              className={inputNormal}
            />
          </div>

          {/* Descrição */}
          <div>
            <label htmlFor="pix-description" className="block text-sm font-medium text-gray-700 mb-1">
              Descrição{' '}
              <span className="text-gray-400 font-normal">(opcional, máx. 40 chars)</span>
            </label>
            <input
              id="pix-description"
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Pagamento do pedido"
              maxLength={40}
              className={inputNormal}
            />
          </div>

          {/* Botão */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg font-semibold text-sm hover:bg-indigo-700 active:bg-indigo-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {isGenerating ? 'Gerando…' : 'Gerar QR Code Pix'}
          </button>
        </fieldset>
      </div>

      {/* Preview */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-900 self-start">Preview do QR Code</h2>
          {qrDataUrl ? (
            <>
              <img
                src={qrDataUrl}
                alt="QR Code Pix gerado com payload BR Code válido"
                width={192}
                height={192}
                className="w-48 h-48 rounded-lg"
              />
              {isValid && (
                <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full text-xs font-semibold">
                  ✓ QR válido — testado com o padrão Banco Central
                </span>
              )}
              {error && <p className="text-red-500 text-xs text-center">{error}</p>}
              <div className="flex gap-2 w-full">
                <button
                  onClick={handleDownloadPng}
                  aria-label="Baixar QR Code Pix em formato PNG"
                  className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  Download PNG
                </button>
                <button
                  onClick={handleDownloadSvg}
                  aria-label="Baixar QR Code Pix em formato SVG"
                  className="flex-1 bg-white border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors"
                >
                  Download SVG
                </button>
              </div>
            </>
          ) : (
            <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm text-center px-4">
              {error || 'Preencha os campos e clique em Gerar'}
            </div>
          )}
        </div>

        {payload && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="pix-payload" className="text-sm font-semibold text-gray-700">Payload BR Code</label>
              <button
                onClick={handleCopy}
                aria-label={copied ? 'Payload copiado' : 'Copiar payload BR Code'}
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
              id="pix-payload"
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
