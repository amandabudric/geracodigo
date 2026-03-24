'use client'

import { useState, useRef } from 'react'
import JsBarcode from 'jsbarcode'

const FORMATS = [
  { value: 'EAN13', label: 'EAN-13' },
  { value: 'EAN8', label: 'EAN-8' },
  { value: 'CODE128', label: 'Code 128' },
  { value: 'CODE39', label: 'Code 39' },
  { value: 'UPC', label: 'UPC-A' },
  { value: 'ISBN', label: 'ISBN' },
]

const LIMIT = 5
const SESSION_KEY = 'barcode_count'

export default function BarcodeGenerator() {
  const [input, setInput] = useState('')
  const [format, setFormat] = useState('EAN13')
  const [error, setError] = useState('')
  const [generated, setGenerated] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)

  const getCount = () => parseInt(sessionStorage.getItem(SESSION_KEY) || '0', 10)
  const incCount = () => sessionStorage.setItem(SESSION_KEY, (getCount() + 1).toString())

  const generate = () => {
    if (getCount() >= LIMIT) {
      setShowModal(true)
      return
    }
    if (!input.trim()) {
      setError('Digite um valor para o código de barras.')
      return
    }
    try {
      JsBarcode(svgRef.current, input.trim(), {
        format,
        lineColor: '#000',
        width: 2,
        height: 80,
        displayValue: true,
      })
      setGenerated(true)
      setError('')
      incCount()
    } catch (e) {
      setError('Valor inválido para o formato selecionado.')
      setGenerated(false)
    }
  }

  const downloadSvg = () => {
    if (!svgRef.current) return
    const serializer = new XMLSerializer()
    const svgStr = serializer.serializeToString(svgRef.current)
    const blob = new Blob([svgStr], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'codigo-de-barras.svg'
    a.click()
    URL.revokeObjectURL(url)
  }

  const downloadPng = () => {
    if (!svgRef.current) return
    const serializer = new XMLSerializer()
    const svgStr = serializer.serializeToString(svgRef.current)
    const canvas = document.createElement('canvas')
    canvas.width = 400
    canvas.height = 200
    const ctx = canvas.getContext('2d')!
    const img = new Image()
    const blob = new Blob([svgStr], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    img.onload = () => {
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, 400, 200)
      ctx.drawImage(img, 0, 0, 400, 200)
      URL.revokeObjectURL(url)
      const a = document.createElement('a')
      a.href = canvas.toDataURL('image/png')
      a.download = 'codigo-de-barras.png'
      a.click()
    }
    img.src = url
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Formato</label>
            <select
              value={format}
              onChange={e => setFormat(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {FORMATS.map(f => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valor</label>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={format === 'EAN13' ? '7891234567890' : 'Digite o valor...'}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
          <button
            onClick={generate}
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Gerar Código de Barras
          </button>
        </div>

        <div className="border border-gray-100 rounded-lg p-4 bg-gray-50 flex flex-col items-center gap-4 min-h-[160px] justify-center">
          <svg ref={svgRef} className={generated ? '' : 'hidden'} />
          {!generated && (
            <p className="text-gray-400 text-sm">O código de barras aparecerá aqui</p>
          )}
        </div>

        {generated && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={downloadPng}
              className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Download PNG
            </button>
            <button
              onClick={downloadSvg}
              className="flex-1 bg-white border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors"
            >
              Download SVG
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full text-center shadow-xl">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Limite atingido</h2>
            <p className="text-gray-600 mb-6">Você gerou {LIMIT} códigos nesta sessão. Entre na lista de espera para acesso ilimitado.</p>
            <input
              type="email"
              placeholder="seu@email.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors mb-3">
              Entrar na lista de espera
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  )
}
