import type { Metadata } from 'next'
import PixGenerator from './PixGenerator'
import AdSlot from '@/components/AdSlot'
import FAQSection from '@/components/FAQSection'
import SchemaMarkup from '@/components/SchemaMarkup'

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Gerador de QR Code Pix',
    description: 'Gere QR Code para pagamento via Pix com chave CPF, CNPJ, e-mail ou aleatória. Payload BR Code EMV válido, gerado no navegador sem cadastro.',
    url: 'https://www.geracodigo.com.br/gerador-de-qr-code-pix',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
    author: { '@type': 'Organization', name: 'GeraCode', url: 'https://www.geracodigo.com.br' },
    inLanguage: 'pt-BR',
    isAccessibleForFree: true,
    featureList: ['QR Code Pix estático', 'Payload BR Code EMV', 'CPF, CNPJ, e-mail, telefone, chave aleatória', 'Download PNG e SVG', 'Preview em tempo real', '100% client-side'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Como gerar QR Code Pix para cobranças',
    description: 'Passo a passo para criar um QR Code Pix estático válido com payload BR Code.',
    totalTime: 'PT2M',
    inLanguage: 'pt-BR',
    tool: { '@type': 'HowToTool', name: 'GeraCode — Gerador de QR Code Pix' },
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Informe sua chave Pix', text: 'Selecione o tipo de chave (CPF, CNPJ, e-mail, telefone ou aleatória) e insira o valor da chave cadastrada no seu banco.', url: 'https://www.geracodigo.com.br/gerador-de-qr-code-pix#passo-1' },
      { '@type': 'HowToStep', position: 2, name: 'Preencha nome, cidade e valor', text: 'Digite o nome do recebedor (até 25 caracteres), a cidade e opcionalmente um valor fixo.', url: 'https://www.geracodigo.com.br/gerador-de-qr-code-pix#passo-2' },
      { '@type': 'HowToStep', position: 3, name: 'Baixe o QR Code', text: 'Faça download em PNG ou SVG e use onde quiser.', url: 'https://www.geracodigo.com.br/gerador-de-qr-code-pix#passo-3' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'GeraCode', item: 'https://www.geracodigo.com.br' },
      { '@type': 'ListItem', position: 2, name: 'Gerador de QR Code Pix', item: 'https://www.geracodigo.com.br/gerador-de-qr-code-pix' },
    ],
  },
]

export const metadata: Metadata = {
  title: 'Gerador de QR Code Pix Grátis — Crie seu QR Pix Online | GeraCode',
  description: 'Gere QR Code para pagamento via Pix com chave CPF, CNPJ, e-mail ou aleatória. Payload BR Code gerado no seu navegador, sem cadastro.',
  alternates: { canonical: 'https://geracodigo.com.br/gerador-de-qr-code-pix' },
}

export default function PixPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SchemaMarkup schema={schemas} />
      <div className="flex justify-center mb-6">
        <AdSlot slot="pix-top" format="horizontal" />
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gerador de QR Code Pix</h1>
        <p className="text-gray-600">Gere QR Code Pix estático válido (payload BR Code EMV, padrão Banco Central do Brasil)</p>
        <p className="text-sm text-indigo-600 mt-1">🔒 Gerado direto no seu navegador — seus dados nunca saem do seu computador</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          <PixGenerator />
        </div>
        <aside className="lg:w-[300px] flex flex-col gap-6">
          <AdSlot slot="pix-sidebar" format="rectangle" />
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
            <p className="font-semibold mb-1">ℹ️ Cobranças Estáticas</p>
            <p>Este QR gera cobranças estáticas (sem confirmação automática). Para cobranças com notificação, use a API Pix do seu banco.</p>
          </div>
        </aside>
      </div>

      <div className="flex justify-center mt-8">
        <AdSlot slot="pix-bottom" format="horizontal" />
      </div>

      {/* Como usar */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Como gerar QR Code Pix</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: '1', title: 'Informe sua chave Pix', desc: 'Selecione o tipo (CPF, CNPJ, e-mail, telefone ou chave aleatória) e insira o valor da chave cadastrada no seu banco.' },
            { step: '2', title: 'Preencha nome e cidade', desc: 'Digite o nome do recebedor (até 25 caracteres) e a cidade. Opcionalmente, defina um valor fixo e descrição da cobrança.' },
            { step: '3', title: 'Baixe o QR Code', desc: 'O QR Code é gerado instantaneamente no seu navegador. Faça download em PNG ou SVG e use onde quiser.' },
          ].map(({ step, title, desc }) => (
            <div key={step} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 font-bold text-lg flex items-center justify-center mb-4">{step}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* O que é */}
      <section className="mt-16 bg-white rounded-xl border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">O que é o QR Code Pix?</h2>
        <div className="prose prose-gray max-w-none text-gray-600 space-y-4">
          <p>O <strong>QR Code Pix</strong> é uma forma de receber pagamentos instantâneos pelo sistema Pix do Banco Central do Brasil. Ao escanear o QR Code com qualquer aplicativo bancário, o pagador é direcionado automaticamente para a tela de pagamento com os dados do recebedor preenchidos.</p>
          <p>O payload gerado segue o padrão <strong>BR Code EMV</strong>, especificação oficial do Banco Central, compatível com todos os bancos e fintechs participantes do Pix no Brasil — incluindo Nubank, Itaú, Bradesco, Caixa, Banco do Brasil, Inter, PagSeguro, Mercado Pago e outros.</p>
          <p>O GeraCode gera <strong>QR Codes estáticos</strong>, ideais para cobranças com valor fixo ou aberto (o pagador digita o valor). Para cobranças dinâmicas com confirmação automática e geração de comprovante, é necessário utilizar a API Pix do seu banco.</p>
        </div>
      </section>

      <FAQSection items={[
        { question: 'O QR Code Pix gerado aqui é válido?', answer: 'Sim. O payload segue o padrão BR Code EMV definido pelo Banco Central do Brasil. O QR Code é testado com o algoritmo CRC16 e funciona em todos os bancos participantes do Pix.' },
        { question: 'Meus dados ficam salvos em algum servidor?', answer: 'Não. Todo o processamento acontece no seu navegador (client-side). Nenhum dado — chave Pix, nome, valor — é enviado para servidores externos.' },
        { question: 'Qual é a diferença entre QR Code estático e dinâmico?', answer: 'O QR Code estático, gerado aqui, é fixo e pode ser usado múltiplas vezes. O QR Code dinâmico é gerado pela API do banco para cada cobrança, com controle de pagamento e notificação automática.' },
        { question: 'Posso usar este QR Code no meu e-commerce?', answer: 'Sim, para cobranças simples. Basta inserir o QR Code como imagem no seu site ou imprimir para uso físico. Para integração automática com confirmação de pedido, use a API Pix do seu banco.' },
        { question: 'O gerador funciona para Pix com CPF, CNPJ, e-mail e telefone?', answer: 'Sim, todos os tipos de chave Pix são suportados: CPF, CNPJ, e-mail, telefone (com +55) e chave aleatória (UUID).' },
      ]} />
    </div>
  )
}
