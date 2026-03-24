import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-indigo-600">GeraCode</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="/gerador-de-codigo-de-barras" className="hover:text-indigo-600 transition-colors">
              Código de Barras
            </Link>
            <Link href="/gerador-de-ean" className="hover:text-indigo-600 transition-colors">
              EAN-13 / EAN-8
            </Link>
            <Link href="/gerador-de-qr-code-pix" className="hover:text-indigo-600 transition-colors font-semibold text-indigo-600">
              QR Code Pix
            </Link>
            <Link href="/gerador-de-qr-code" className="hover:text-indigo-600 transition-colors">
              QR Code
            </Link>
          </nav>
          <nav className="md:hidden flex items-center gap-3 text-xs font-medium text-gray-600">
            <Link href="/gerador-de-codigo-de-barras" className="hover:text-indigo-600">Barras</Link>
            <Link href="/gerador-de-qr-code-pix" className="hover:text-indigo-600 text-indigo-600 font-bold">Pix</Link>
            <Link href="/gerador-de-qr-code" className="hover:text-indigo-600">QR</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
