import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Página não encontrada',
  description: 'A página que você procura não existe ou foi movida. Acesse as ferramentas gratuitas do GeraCode.',
  robots: { index: false, follow: true },
}

const tools = [
  { href: '/gerador-de-qr-code-pix', label: 'QR Code Pix' },
  { href: '/gerador-de-codigo-de-barras', label: 'Código de Barras' },
  { href: '/gerador-de-ean', label: 'EAN-13 / EAN-8' },
  { href: '/gerador-de-qr-code', label: 'QR Code' },
  { href: '/leitor-de-codigo-de-barras', label: 'Leitor de Código' },
  { href: '/gerador-de-sku', label: 'Gerador de SKU' },
]

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <span className="block text-6xl font-bold text-indigo-600 mb-4" aria-hidden="true">404</span>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Página não encontrada</h1>
      <p className="text-gray-600 mb-8">
        A página que você procura não existe ou foi movida. Que tal usar uma das nossas ferramentas?
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto mb-8">
        {tools.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:border-indigo-300 hover:text-indigo-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            {label}
          </Link>
        ))}
      </div>
      <Link
        href="/"
        className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
      >
        Voltar ao início
      </Link>
    </div>
  )
}
