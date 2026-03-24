'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import QRCode from 'qrcode'

const SIZES = [200, 300, 400, 500]
const LIMIT = 5
const SESSION_KEY = 'qr_count'

export default function QrGenerator() {
  const [input, setInput] = useState('')
  const [size, setSize] = useState(300)
  const [darkColor, setDarkColor] = useState('#000000')
  const [lightColor, setLightColor] = useState('#ffffff')
  const [qrDataUrl, setQrDataUrl] = useState('')
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [waitlistEmail, setWaitlistEmail] = useState('')
  const [waitlistSent, setWaitlistSent] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const getCount = () => parseInt(sessionStorage.getItem(SESSION_KEY) || '0', 10)
  const incCount = () => sessionStorage.setItem(SESSION_KEY, (getCount() + 1).toString())

  const generate = useCallback(async () => {
    if (!input.trim()) { setQrDataUrl(''); setError(''); return }
    if (getCount() >= LIMIT) { setShowModal(true); return }
    try {
      const url = await QRCode.toDataURL(input.trim(), {
        width: size,
        margin: 2,
        color: { dark: darkColor, light: lightColor },
      })
      setQrDataUrl(url)
      setError('')
      incCount()
    } catch {
      setError('Erro ao gerar QR Code.')
    }
  }, [input, size, darkColor, lightColor])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(generate, 300)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [generate])

  const downloadPng = () => {
    if (!qrDataUrl) return
    const a = document.createElement('a')
    a.href = qrDataUrl
    a.download = 'qrcode.png'
    a.click()
  }

  const downloadSvg = async () => {
    if (!input.trim()) return
    const svgStr = await QRCode.toString(input.trim(), { type: 'svg', width: size, margin: 2 })
    const blob = new Blob([svgStr], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'qrcode.svg'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <div>
            <label htmlFor="qr-content" className="block text-sm font-medium text-gray-700 mb-1">Conteúdo</label>
            <textarea
              id="qr-content"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="https://seusite.com.br ou qualquer texto..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 h-24 resize-none"
            />
          </div>
          <div>
            <label htmlFor="qr-size" className="block text-sm font-medium text-gray-700 mb-1">Tamanho</label>
            <select
              id="qr-size"
              value={size}
              onChange={e => setSize(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {SIZES.map(s => <option key={s} value={s}>{s}×{s}px</option>)}
            </select>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="dark-color" className="block text-sm font-medium text-gray-700 mb-1">Cor escura</label>
              <div className="flex gap-2 items-center">
                <input id="dark-color" type="color" value={darkColor} onChange={e => setDarkColor(e.target.value)} aria-describedby="dark-color-hex" className="h-8 w-10 rounded border border-gray-300 cursor-pointer" />
                <span id="dark-color-hex" className="text-xs text-gray-500 font-mono">{darkColor}</span>
              </div>
            </div>
            <div className="flex-1">
              <label htmlFor="light-color" className="block text-sm font-medium text-gray-700 mb-1">Cor de fundo</label>
              <div className="flex gap-2 items-center">
                <input id="light-color" type="color" value={lightColor} onChange={e => setLightColor(e.target.value)} aria-describedby="light-color-hex" className="h-8 w-10 rounded border border-gray-300 cursor-pointer" />
                <span id="light-color-hex" className="text-xs text-gray-500 font-mono">{lightColor}</span>
              </div>
            </div>
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
        </div>

        <div className="flex-1 bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-900 self-start">Preview</h2>
          {qrDataUrl ? (
            <>
              <img src={qrDataUrl} alt="Preview do QR Code gerado" width={200} height={200} className="rounded-lg max-w-[200px]" />
              <div className="flex gap-2 w-full">
                <button onClick={downloadPng} aria-label="Baixar QR Code em formato PNG" className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">Download PNG</button>
                <button onClick={downloadSvg} aria-label="Baixar QR Code em formato SVG" className="flex-1 bg-white border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors">Download SVG</button>
              </div>
            </>
          ) : (
            <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm text-center px-4">
              Digite algo para gerar o QR Code
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full text-center shadow-xl" role="alertdialog" aria-modal="true" aria-labelledby="modal-title-qr" aria-describedby="modal-desc-qr">
            <h2 id="modal-title-qr" className="text-xl font-bold text-gray-900 mb-2">Limite atingido</h2>
            <p id="modal-desc-qr" className="text-gray-600 mb-6">Você gerou {LIMIT} QR Codes nesta sessão. Entre na lista de espera para acesso ilimitado.</p>
            {waitlistSent ? (
              <p className="text-green-600 font-medium mb-3">✓ Email registrado! Entraremos em contato em breve.</p>
            ) : (
              <>
                <label htmlFor="waitlist-email-qr" className="sr-only">Email para lista de espera</label>
                <input
                  id="waitlist-email-qr"
                  type="email"
                  value={waitlistEmail}
                  onChange={e => setWaitlistEmail(e.target.value)}
                  placeholder="seu@email.com"
                  aria-label="Email para entrar na lista de espera"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={() => { if (waitlistEmail.trim()) setWaitlistSent(true) }}
                  disabled={!waitlistEmail.trim()}
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Entrar na lista de espera
                </button>
              </>
            )}
            <button onClick={() => { setShowModal(false); setWaitlistEmail(''); setWaitlistSent(false) }} className="text-sm text-gray-500 hover:text-gray-700">Fechar</button>
          </div>
        </div>
      )}
    </>
  )
}
