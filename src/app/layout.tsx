import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const GA_ID = 'G-R41LY0MFHT'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GeraCode — Gerador de Código de Barras e QR Code Pix',
  description: 'Gerador de código de barras e QR Code Pix para lojistas brasileiros. Gerado direto no seu navegador — seus dados nunca saem do seu computador.',
  metadataBase: new URL('https://geracodigo.com.br'),
  openGraph: {
    siteName: 'GeraCode',
    locale: 'pt_BR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
