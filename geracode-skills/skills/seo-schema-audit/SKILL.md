---
name: seo-schema-audit
description: "Audita e gera JSON-LD schema markup para as páginas do GeraCode. Use esta skill sempre que o usuário mencionar 'schema', 'structured data', 'dados estruturados', 'JSON-LD', 'Rich Results', 'rich snippets', ou pedir para melhorar a aparência do site nos resultados de busca. Também use quando o usuário quiser auditar schema existente, validar markup, ou gerar novos schemas para páginas de ferramentas, tutoriais ou FAQ."
---

# SEO Schema Audit — GeraCode

Skill para auditar, gerar e validar schema markup (JSON-LD) otimizado para as páginas do GeraCode.

## Quando usar

- Auditar schema markup existente em qualquer página do GeraCode
- Gerar JSON-LD novo para páginas de ferramentas, blog posts ou landing pages
- Validar schema contra as especificações do Google
- Preparar páginas para Rich Results (Software App, HowTo, FAQ, Breadcrumb)

## Schema types relevantes para o GeraCode

### 1. SoftwareApplication (para cada ferramenta)

Aplicar em: `/gerador-de-codigo-de-barras`, `/gerador-de-ean`, `/gerador-de-qr-code-pix`, `/gerador-de-qr-code`

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "[Nome da ferramenta]",
  "description": "[Descrição focada em benefício + keyword principal]",
  "url": "https://www.geracodigo.com.br/[slug]",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "BRL"
  },
  "author": {
    "@type": "Organization",
    "name": "GeraCode",
    "url": "https://www.geracodigo.com.br"
  },
  "inLanguage": "pt-BR",
  "isAccessibleForFree": true
}
```

**Campos opcionais de alto impacto** (adicionar quando houver dados):
- `aggregateRating` — se implementar sistema de avaliação
- `screenshot` — URL de imagem da interface da ferramenta
- `featureList` — lista de funcionalidades (ex: "Download PNG e SVG", "Preview em tempo real")

### 2. HowTo (para tutoriais e guias)

Aplicar em: posts de blog ou seções educacionais.

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como gerar [tipo de código] para [caso de uso]",
  "description": "[Descrição do tutorial]",
  "step": [
    {
      "@type": "HowToStep",
      "name": "[Título do passo]",
      "text": "[Instrução detalhada]",
      "url": "https://www.geracodigo.com.br/[slug]#passo-1"
    }
  ],
  "tool": {
    "@type": "HowToTool",
    "name": "GeraCode — Gerador de Código de Barras"
  },
  "totalTime": "PT2M",
  "inLanguage": "pt-BR"
}
```

### 3. FAQPage (para seções de FAQ)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Pergunta]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Resposta]"
      }
    }
  ]
}
```

### 4. WebSite + SearchAction (para a home)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "GeraCode",
  "url": "https://www.geracodigo.com.br",
  "description": "Gerador gratuito de código de barras e QR Code Pix para lojistas brasileiros",
  "inLanguage": "pt-BR"
}
```

### 5. BreadcrumbList (todas as páginas internas)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "GeraCode",
      "item": "https://www.geracodigo.com.br"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "[Nome da página]",
      "item": "https://www.geracodigo.com.br/[slug]"
    }
  ]
}
```

## Workflow de auditoria

Ao auditar schema existente:

1. **Fetch** a página alvo com `web_fetch` ou via MCP browser
2. **Extrair** todos os blocos `<script type="application/ld+json">` do HTML
3. **Validar** contra os templates acima — checar:
   - Campos obrigatórios presentes
   - URLs absolutas (não relativas)
   - `@context` correto
   - Tipos compatíveis com Rich Results do Google
   - Sem campos deprecated
4. **Comparar** com concorrentes — fetch schema dos top 3 resultados para a keyword principal
5. **Gerar relatório** com:
   - Status atual (✅ OK / ⚠️ Parcial / ❌ Ausente) por página
   - JSON-LD pronto para copiar e implementar
   - Prioridade de implementação (impacto estimado no CTR)

## Validação externa

Após gerar o schema, orientar o usuário a validar em:
- https://validator.schema.org/
- https://search.google.com/test/rich-results

## Regras

- Todo JSON-LD deve ser válido e pronto para colar no `<head>` da página
- Usar sempre `"inLanguage": "pt-BR"`
- Preços sempre em BRL, valor "0" para ferramentas gratuitas
- Não inventar dados — se não houver `aggregateRating`, não incluir
- Manter schema enxuto — só o que o Google efetivamente usa para Rich Results
