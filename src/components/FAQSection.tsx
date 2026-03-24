interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  items: FAQItem[]
}

export default function FAQSection({ items }: FAQSectionProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <section className="mt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Perguntas Frequentes</h2>
      <div className="space-y-4">
        {items.map((item, i) => (
          <details
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-6 group"
          >
            <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center gap-4">
              {item.question}
              <span className="text-indigo-500 text-xl shrink-0 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-4 text-gray-600 leading-relaxed">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
