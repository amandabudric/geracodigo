'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Algo deu errado</h1>
      <p className="text-gray-600 mb-8">
        Ocorreu um erro inesperado. Tente novamente ou volte para a página inicial.
      </p>
      <div className="flex gap-4 justify-center">
        <button
          onClick={reset}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          Tentar novamente
        </button>
        <Link
          href="/"
          className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  )
}
