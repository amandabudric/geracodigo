'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/gerador-de-codigo-de-barras', label: 'Código de Barras', shortLabel: 'Barras' },
  { href: '/gerador-de-ean', label: 'EAN-13 / EAN-8', shortLabel: 'EAN' },
  { href: '/gerador-de-qr-code-pix', label: 'QR Code Pix', shortLabel: 'Pix' },
  { href: '/gerador-de-qr-code', label: 'QR Code', shortLabel: 'QR' },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-indigo-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium"
      >
        Pular para o conteúdo
      </a>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-indigo-600">GeraCode</span>
            </Link>
            <nav
              className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600"
              aria-label="Navegação principal"
            >
              <ul role="list" className="flex items-center gap-6">
                {navLinks.map(({ href, label }) => {
                  const isActive = pathname === href
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        aria-current={isActive ? 'page' : undefined}
                        className={`transition-colors ${
                          isActive
                            ? 'text-indigo-600 font-semibold'
                            : 'hover:text-indigo-600'
                        }`}
                      >
                        {label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
            <nav
              className="md:hidden flex items-center gap-3 text-xs font-medium text-gray-600"
              aria-label="Navegação mobile"
            >
              <ul role="list" className="flex items-center gap-3">
                {navLinks.map(({ href, shortLabel }) => {
                  const isActive = pathname === href
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        aria-current={isActive ? 'page' : undefined}
                        className={`transition-colors ${
                          isActive
                            ? 'text-indigo-600 font-bold'
                            : 'hover:text-indigo-600'
                        }`}
                      >
                        {shortLabel}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}
