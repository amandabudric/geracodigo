import Link from 'next/link'
import type { Metadata } from 'next'
import SchemaMarkup from '@/components/SchemaMarkup'

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'GeraCode',
  url: 'https://www.geracodigo.com.br',
  description: 'Gerador gratuito de código de barras e QR Code Pix para lojistas brasileiros',
  inLanguage: 'pt-BR',
}

export const metadata: Metadata = {
  title: 'GeraCode — Gerador de Código de Barras e QR Code Pix Grátis',
  description: 'Gerador de código de barras e QR Code Pix para lojistas brasileiros. Gerado direto no seu navegador — seus dados nunca saem do seu computador.',
  alternates: { canonical: 'https://geracodigo.com.br' },
}

const tools = [
  {
    href: '/gerador-de-qr-code-pix',
    title: 'QR Code Pix',
    description: 'Gere QR Code para pagamento via Pix com chave CPF, CNPJ, e-mail ou aleatória. Payload BR Code 100% válido.',
    badge: 'Mais popular',
    badgeColor: 'bg-green-100 text-green-800',
    icon: '📱',
  },
  {
    href: '/gerador-de-codigo-de-barras',
    title: 'Código de Barras',
    description: 'EAN-13, EAN-8, Code 128, Code 39, UPC-A e ISBN. Download PNG e SVG.',
    badge: null,
    badgeColor: '',
    icon: '|||',
  },
  {
    href: '/gerador-de-ean',
    title: 'EAN-13 / EAN-8',
    description: 'Gerador dedicado para EAN-13 e EAN-8. Ideal para produtos, e-commerce e varejo.',
    badge: null,
    badgeColor: '',
    icon: '🏷️',
  },
  {
    href: '/gerador-de-qr-code',
    title: 'QR Code Genérico',
    description: 'Gere QR Code para links, textos e qualquer conteúdo. Color picker incluso.',
    badge: null,
    badgeColor: '',
    icon: '⬛',
  },
]

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SchemaMarkup schema={websiteSchema} />
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Gerador de Código de Barras e QR Code Pix
        </h1>
        <p className="text-xl text-gray-600 mb-2">Para lojistas brasileiros</p>
        <p className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium">
          🔒 Gerado direto no seu navegador — seus dados nunca saem do seu computador
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-16">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-indigo-300 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{tool.icon}</span>
              {tool.badge && (
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${tool.badgeColor}`}>
                  {tool.badge}
                </span>
              )}
            </div>
            <h2 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 mb-2">
              {tool.title}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">{tool.description}</p>
          </Link>
        ))}
      </div>

      <section className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Por que usar o GeraCode?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="flex flex-col gap-2">
            <span className="text-2xl">🔒</span>
            <h3 className="font-semibold text-gray-900">100% Privado</h3>
            <p className="text-sm text-gray-500">Tudo gerado no seu navegador. Nenhum dado é enviado para servidores.</p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-2xl">⚡</span>
            <h3 className="font-semibold text-gray-900">Instantâneo</h3>
            <p className="text-sm text-gray-500">Preview em tempo real. Sem espera, sem cadastro, sem complicação.</p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-2xl">🇧🇷</span>
            <h3 className="font-semibold text-gray-900">Feito para o Brasil</h3>
            <p className="text-sm text-gray-500">QR Code Pix com payload BR Code no padrão Banco Central do Brasil.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
