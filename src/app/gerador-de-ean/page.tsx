import type { Metadata } from 'next'
import EanGenerator from './EanGenerator'
import FAQSection from '@/components/FAQSection'
import SchemaMarkup from '@/components/SchemaMarkup'

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Gerador de EAN-13 e EAN-8',
    description: 'Crie códigos EAN-13 e EAN-8 para produtos, e-commerce e varejo. Geração instantânea no navegador, download imediato em PNG e SVG.',
    url: 'https://www.geracodigo.com.br/gerador-de-ean',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
    author: { '@type': 'Organization', name: 'GeraCode', url: 'https://www.geracodigo.com.br' },
    inLanguage: 'pt-BR',
    isAccessibleForFree: true,
    featureList: ['EAN-13', 'EAN-8', 'Validação automática do dígito verificador', 'Download PNG e SVG', '100% client-side'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Como gerar código EAN-13 para produto',
    description: 'Passo a passo para criar código EAN-13 ou EAN-8 para produtos de varejo.',
    totalTime: 'PT2M',
    inLanguage: 'pt-BR',
    tool: { '@type': 'HowToTool', name: 'GeraCode — Gerador de EAN' },
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Escolha EAN-13 ou EAN-8', text: 'EAN-13 para a maioria dos produtos. EAN-8 para embalagens pequenas.', url: 'https://www.geracodigo.com.br/gerador-de-ean#passo-1' },
      { '@type': 'HowToStep', position: 2, name: 'Digite o número EAN', text: 'Informe todos os dígitos incluindo o dígito verificador (último dígito).', url: 'https://www.geracodigo.com.br/gerador-de-ean#passo-2' },
      { '@type': 'HowToStep', position: 3, name: 'Baixe em PNG ou SVG', text: 'Faça download imediato para usar em embalagens, etiquetas ou sistemas de PDV.', url: 'https://www.geracodigo.com.br/gerador-de-ean#passo-3' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'GeraCode', item: 'https://www.geracodigo.com.br' },
      { '@type': 'ListItem', position: 2, name: 'Gerador de EAN-13 e EAN-8', item: 'https://www.geracodigo.com.br/gerador-de-ean' },
    ],
  },
]

export const metadata: Metadata = {
  title: 'Gerador de EAN-13 e EAN-8 Grátis Online | GeraCode',
  description: 'Crie códigos EAN-13 e EAN-8 para produtos, e-commerce e varejo. Geração instantânea no navegador, download imediato.',
  alternates: { canonical: 'https://geracodigo.com.br/gerador-de-ean' },
}

export default function EanPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SchemaMarkup schema={schemas} />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gerador de EAN-13 e EAN-8</h1>
        <p className="text-gray-600">Crie códigos EAN para produtos, e-commerce e varejo. Geração instantânea no navegador.</p>
        <p className="text-sm text-indigo-600 mt-1">🔒 Gerado direto no seu navegador — seus dados nunca saem do seu computador</p>
      </div>
      <EanGenerator />

      {/* Como usar */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Como gerar código EAN</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: '1', title: 'Escolha EAN-13 ou EAN-8', desc: 'EAN-13 tem 13 dígitos e é o padrão para a maioria dos produtos. EAN-8 tem 8 dígitos e é usado em embalagens pequenas.' },
            { step: '2', title: 'Digite o número', desc: 'Informe todos os dígitos do código, incluindo o dígito verificador (último dígito). O sistema valida automaticamente.' },
            { step: '3', title: 'Baixe em PNG ou SVG', desc: 'Faça download imediato para usar em embalagens, etiquetas ou sistemas de PDV.' },
          ].map(({ step, title, desc }) => (
            <div key={step} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 font-bold text-lg flex items-center justify-center mb-4">{step}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* O que é */}
      <section className="mt-16 bg-white rounded-xl border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">O que é o código EAN?</h2>
        <div className="text-gray-600 space-y-4">
          <p>O <strong>EAN (European Article Number)</strong> é o sistema de codificação de produtos mais usado no mundo. No Brasil, é administrado pela <strong>GS1 Brasil</strong> e presente em praticamente todos os produtos vendidos no varejo.</p>
          <p>O <strong>EAN-13</strong> possui 13 dígitos: os três primeiros identificam o país (789 ou 790 para o Brasil), os próximos identificam o fabricante, depois o produto, e o último é o dígito verificador calculado automaticamente.</p>
          <p>O <strong>EAN-8</strong> é uma versão abreviada para embalagens com pouco espaço. Segue a mesma lógica, mas com apenas 8 dígitos.</p>
          <p><strong>Atenção:</strong> para comercializar produtos em redes varejistas (supermercados, farmácias etc.), os códigos EAN precisam ser registrados oficialmente na GS1 Brasil, que atribui um prefixo exclusivo à sua empresa.</p>
        </div>
      </section>

      <FAQSection items={[
        { question: 'Qual a diferença entre EAN-13 e EAN-8?', answer: 'EAN-13 usa 13 dígitos e é o padrão para a maioria dos produtos de consumo. EAN-8 usa 8 dígitos e foi criado para embalagens pequenas onde não há espaço para 13 dígitos, como balas, chicletes e cosméticos compactos.' },
        { question: 'Preciso registrar o EAN na GS1 para vender no varejo?', answer: 'Sim. Para vender em supermercados, farmácias e grandes redes varejistas, o código EAN deve ser registrado na GS1 Brasil. O GeraCode é ideal para testes, uso interno e e-commerce próprio.' },
        { question: 'Como calcular o dígito verificador do EAN-13?', answer: 'O dígito verificador é o 13° dígito, calculado com base nos 12 anteriores usando o algoritmo de módulo 10. Ferramentas online e a própria GS1 fornecem calculadoras. Nosso gerador valida automaticamente.' },
        { question: 'O código gerado funciona em leitores de código de barras?', answer: 'Sim, desde que o número informado seja válido. O código gerado em PNG ou SVG pode ser impresso e lido por qualquer leitor de código de barras compatível com EAN.' },
        { question: 'Posso usar EAN-13 para vender no Mercado Livre?', answer: 'Sim. O Mercado Livre aceita EAN-13 como identificador de produto no cadastro. Para itens novos, o código EAN ajuda o sistema a identificar o produto automaticamente.' },
      ]} />
    </div>
  )
}
