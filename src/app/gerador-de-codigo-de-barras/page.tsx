import type { Metadata } from 'next'
import BarcodeGenerator from './BarcodeGenerator'
import AdSlot from '@/components/AdSlot'
import FAQSection from '@/components/FAQSection'
import SchemaMarkup from '@/components/SchemaMarkup'

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Gerador de Código de Barras',
    description: 'Gere códigos EAN-13, EAN-8, Code 128, Code 39, UPC-A e ISBN direto no navegador. Sem cadastro, sem servidor. Download PNG e SVG.',
    url: 'https://www.geracodigo.com.br/gerador-de-codigo-de-barras',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
    author: { '@type': 'Organization', name: 'GeraCode', url: 'https://www.geracodigo.com.br' },
    inLanguage: 'pt-BR',
    isAccessibleForFree: true,
    featureList: ['EAN-13', 'EAN-8', 'Code 128', 'Code 39', 'UPC-A', 'ISBN', 'Download PNG e SVG', 'Preview em tempo real', '100% client-side'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Como gerar código de barras para produtos',
    description: 'Passo a passo para criar código de barras EAN-13, Code 128 e outros formatos.',
    totalTime: 'PT2M',
    inLanguage: 'pt-BR',
    tool: { '@type': 'HowToTool', name: 'GeraCode — Gerador de Código de Barras' },
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Escolha o formato', text: 'Selecione o padrão: EAN-13 para varejo, Code 128 para uso geral, Code 39 para logística, UPC-A para o mercado americano.', url: 'https://www.geracodigo.com.br/gerador-de-codigo-de-barras#passo-1' },
      { '@type': 'HowToStep', position: 2, name: 'Digite o valor', text: 'Insira o número ou texto a codificar. Para EAN-13, use 13 dígitos numéricos.', url: 'https://www.geracodigo.com.br/gerador-de-codigo-de-barras#passo-2' },
      { '@type': 'HowToStep', position: 3, name: 'Baixe o código', text: 'Clique em Gerar e faça download em PNG ou SVG.', url: 'https://www.geracodigo.com.br/gerador-de-codigo-de-barras#passo-3' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'GeraCode', item: 'https://www.geracodigo.com.br' },
      { '@type': 'ListItem', position: 2, name: 'Gerador de Código de Barras', item: 'https://www.geracodigo.com.br/gerador-de-codigo-de-barras' },
    ],
  },
]

export const metadata: Metadata = {
  title: 'Gerador de Código de Barras Grátis — EAN-13, Code 128 | GeraCode',
  description: 'Gere códigos EAN-13, EAN-8, Code 128 e mais direto no navegador. Sem cadastro, sem servidor. Download PNG e SVG.',
  openGraph: {
    title: 'Gerador de Código de Barras Grátis — EAN-13, Code 128 | GeraCode',
    description: 'Gere códigos EAN-13, EAN-8, Code 128 e mais direto no navegador. Sem cadastro, sem servidor. Download PNG e SVG.',
    url: 'https://www.geracodigo.com.br/gerador-de-codigo-de-barras',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'GeraCode',
    images: [{ url: '/gerador-de-codigo-de-barras/opengraph-image', width: 1200, height: 630, alt: 'Gerador de Código de Barras Grátis — GeraCode' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gerador de Código de Barras Grátis | GeraCode',
    description: 'EAN-13, EAN-8, Code 128, Code 39, UPC-A e ISBN. Download PNG e SVG. Sem cadastro.',
    images: ['/gerador-de-codigo-de-barras/opengraph-image'],
  },
}

export default function BarcodePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <link rel="canonical" href="https://www.geracodigo.com.br/gerador-de-codigo-de-barras" />
      <SchemaMarkup schema={schemas} />
      <div className="flex justify-center mb-6">
        <AdSlot slot="barcode-top" format="horizontal" />
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gerador de Código de Barras</h1>
        <p className="text-gray-600">EAN-13, EAN-8, Code 128, Code 39, UPC-A e ISBN — direto no seu navegador</p>
        <p className="text-sm text-indigo-600 mt-1">🔒 Gerado direto no seu navegador — seus dados nunca saem do seu computador</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          <BarcodeGenerator />
        </div>
        <aside className="lg:w-[300px]">
          <AdSlot slot="barcode-sidebar" format="rectangle" />
        </aside>
      </div>

      <div className="flex justify-center mt-8">
        <AdSlot slot="barcode-bottom" format="horizontal" />
      </div>

      {/* Como usar */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Como gerar código de barras</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: '1', title: 'Escolha o formato', desc: 'Selecione o padrão do código de barras: EAN-13 para produtos de varejo, Code 128 para uso geral, Code 39 para logística, UPC-A para o mercado americano, entre outros.' },
            { step: '2', title: 'Digite o valor', desc: 'Insira o número ou texto que deseja codificar. Para EAN-13, use 13 dígitos numéricos. Para Code 128, qualquer texto é aceito.' },
            { step: '3', title: 'Baixe o código', desc: 'Clique em "Gerar" e faça o download em PNG (para impressão) ou SVG (para uso em softwares de edição sem perda de qualidade).' },
          ].map(({ step, title, desc }) => (
            <article key={step} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold text-lg flex items-center justify-center mb-4" aria-hidden="true">{step}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* O que é */}
      <section className="mt-16 bg-white rounded-xl border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Formatos de código de barras suportados</h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
          <div>
            <dt className="font-semibold text-gray-900 mb-1">EAN-13</dt>
            <dd className="text-sm">Padrão internacional para produtos de consumo. Usado em supermercados, farmácias e varejo em geral. Composto por 13 dígitos numéricos.</dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900 mb-1">EAN-8</dt>
            <dd className="text-sm">Versão compacta do EAN-13, usada em embalagens pequenas onde não há espaço para 13 dígitos. Comum em cosméticos e alimentos.</dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900 mb-1">Code 128</dt>
            <dd className="text-sm">Alta densidade de dados, suporta letras, números e caracteres especiais. Muito usado em logística, etiquetas de envio e controle de estoque.</dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900 mb-1">Code 39</dt>
            <dd className="text-sm">Formato antigo e amplamente suportado. Usado em identificação de ativos, crachás e ambientes industriais.</dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900 mb-1">UPC-A</dt>
            <dd className="text-sm">Padrão norte-americano com 12 dígitos. Equivalente ao EAN-13 sem o primeiro dígito. Necessário para vender no mercado dos EUA.</dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900 mb-1">ISBN</dt>
            <dd className="text-sm">Identificação internacional de livros. Baseado no EAN-13 com prefixo 978 ou 979. Obrigatório para publicações comerciais.</dd>
          </div>
        </dl>
      </section>

      <FAQSection items={[
        { question: 'Qual formato de código de barras devo usar para meu produto?', answer: 'Para produtos vendidos em supermercados e varejo brasileiro, use EAN-13. Para controle interno de estoque, Code 128 é mais flexível pois aceita letras e números. Para exportar para os EUA, use UPC-A.' },
        { question: 'O código de barras gerado é aceito em supermercados?', answer: 'O formato gerado (EAN-13, por exemplo) é tecnicamente válido, mas para vender em redes varejistas você precisa registrar o código na GS1 Brasil, que atribui um prefixo exclusivo à sua empresa.' },
        { question: 'Posso baixar o código de barras em SVG?', answer: 'Sim. O formato SVG é vetorial e pode ser redimensionado sem perda de qualidade, ideal para uso em embalagens, etiquetas e materiais gráficos profissionais.' },
        { question: 'Há limite de gerações gratuitas?', answer: 'O plano gratuito permite 5 gerações por sessão. Após isso, você pode entrar na lista de espera para acesso ilimitado.' },
        { question: 'Os dados do meu produto ficam salvos?', answer: 'Não. O código é gerado diretamente no seu navegador sem enviar nenhuma informação para servidores. Seus dados de produto são completamente privados.' },
      ]} />
    </div>
  )
}
