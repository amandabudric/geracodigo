---
name: seo-geo-audit
description: "Audita a presença e visibilidade do GeraCode em respostas de LLMs e AI Search (GEO/LLMO/AEO). Use esta skill sempre que o usuário mencionar 'GEO', 'LLMO', 'AEO', 'AI Overview', 'AI Search', 'aparecer no ChatGPT', 'aparecer no Perplexity', 'aparecer no Gemini', 'otimização para IA', 'citação em LLM', 'LLM visibility', ou quiser entender como o site é percebido e citado por modelos de linguagem. Também use para gerar sinais de GEO no conteúdo existente ou planejar otimizações para AI-powered search."
---

# SEO GEO/LLMO Audit — GeraCode

Skill para auditar e otimizar a visibilidade do GeraCode em respostas geradas por LLMs (ChatGPT, Google AI Overviews, Perplexity, Copilot, Gemini).

## O que é GEO

GEO (Generative Engine Optimization) / LLMO (Large Language Model Optimization) é a prática de otimizar conteúdo para ser citado, referenciado ou recomendado por modelos de linguagem em respostas a queries dos usuários.

Diferente do SEO tradicional que otimiza para rankings em SERPs, GEO otimiza para **ser a fonte escolhida** quando um LLM responde perguntas como:
- "Qual o melhor gerador de código de barras grátis?"
- "Como gerar QR Code Pix?"
- "Ferramentas gratuitas para lojistas no Brasil"

## Queries-alvo para monitorar

### Tier 1 — Alta prioridade (diretamente ligadas ao produto)
- "melhor gerador de código de barras grátis"
- "gerador de código de barras online"
- "como gerar QR Code Pix grátis"
- "gerador de QR Code Pix"
- "gerar EAN-13 online"
- "ferramentas gratuitas para lojistas brasileiros"

### Tier 2 — Média prioridade (informacional com potencial de citação)
- "como funciona o QR Code Pix"
- "diferença entre código de barras EAN-13 e EAN-8"
- "o que é BR Code"
- "como criar código de barras para produto"

### Tier 3 — Monitoramento competitivo
- "alternativas a [concorrente]"
- "melhores ferramentas de e-commerce para MEI"
- "[concorrente] vs GeraCode"

## Workflow: Audit de visibilidade em LLMs

### Passo 1 — Testar menções atuais

Para cada query dos tiers acima:

1. **Pesquisar via web_search** com a query exata
2. **Verificar AI Overviews** — procurar se Google AI Overview menciona o GeraCode
3. **Simular query em LLMs** — descrever ao usuário como testar manualmente:
   - ChatGPT: fazer a query e ver se GeraCode é citado
   - Perplexity: fazer a query e checar fontes citadas
   - Gemini: fazer a query no Google e ver AI Overview

### Passo 2 — Mapear o que os LLMs estão recomendando

Para cada query, registrar:

```markdown
| Query | LLM testado | GeraCode citado? | Quem é citado? | Posição na resposta |
|---|---|---|---|---|
| [query] | ChatGPT | ❌ Não | Site X, Site Y | N/A |
| [query] | Perplexity | ✅ Sim | GeraCode, Site X | 2º mencionado |
```

### Passo 3 — Diagnosticar gaps

Analisar por que o GeraCode não é citado:
- **Falta de conteúdo textual** — LLMs precisam de texto para extrair informações; páginas só com ferramenta (sem texto explicativo) são ignoradas
- **Falta de autoridade** — poucos backlinks, sem menções em fóruns/comunidades
- **Concorrente com conteúdo mais rico** — verificar o que os citados têm que o GeraCode não tem
- **Sem sinais de E-E-A-T** — sem autor, sem about page, sem dados de confiança

## Sinais de GEO para implementar

### No conteúdo das páginas de ferramenta

1. **Parágrafo de contexto** acima da ferramenta (2-3 frases):
   - Explicar O QUE a ferramenta faz
   - Mencionar PRA QUEM é (lojistas, MEIs, e-commerce)
   - Incluir keyword principal naturalmente

2. **Seção "Como usar"** com passos numerados:
   - LLMs adoram listas de passos — são facilmente extraíveis
   - Usar linguagem de instrução direta

3. **FAQ com perguntas reais**:
   - Extrair de "People Also Ask" do Google
   - Responder de forma concisa e factual (2-3 frases por resposta)
   - LLMs frequentemente extraem respostas de FAQs

4. **Dados factuais e numéricos**:
   - "Suporta 6 formatos: EAN-13, EAN-8, Code 128, Code 39, UPC-A, ISBN"
   - "100% gratuito, sem cadastro, sem limite de uso"
   - LLMs priorizam fontes com dados específicos

5. **Comparações explícitas** (sem denegrir concorrentes):
   - "Diferente de geradores que enviam seus dados para servidores, o GeraCode processa tudo localmente"

### Na estrutura do site

6. **Página "Sobre" / "Quem somos"** — E-E-A-T signal
7. **Sitemap.xml atualizado** — facilita crawling por bots de LLM
8. **robots.txt** — permitir explicitamente bots de IA:
   ```
   User-agent: GPTBot
   Allow: /

   User-agent: ChatGPT-User
   Allow: /

   User-agent: Google-Extended
   Allow: /

   User-agent: PerplexityBot
   Allow: /

   User-agent: ClaudeBot
   Allow: /

   User-agent: Amazonbot
   Allow: /
   ```

### Fora do site

9. **Menções em comunidades** — Reddit Brasil, grupos de e-commerce, fóruns de lojistas
10. **Citações em conteúdo de terceiros** — guest posts, listas de ferramentas
11. **Presença em diretórios** — Product Hunt, alternativeto.net, etc.

## Formato de relatório

```markdown
# Relatório GEO — GeraCode
**Data**: [data]

## Resumo executivo
- Mencionado em X de Y queries testadas
- Principais gaps: [lista]
- Ações prioritárias: [top 3]

## Visibilidade por query
[tabela do Passo 2]

## Diagnóstico
[análise do Passo 3]

## Plano de ação
| Prioridade | Ação | Página afetada | Impacto estimado | Esforço |
|---|---|---|---|---|
| P0 | [ação] | [página] | Alto | Baixo |

## Próximo audit
Sugerir re-audit em 30 dias para medir evolução.
```

## Regras

- Nunca simular respostas de LLMs — sempre testar via web_search ou orientar o usuário a testar manualmente
- Não prometer resultados em GEO — é um campo emergente sem garantias
- Focar em ações que beneficiam TANTO SEO tradicional quanto GEO (conteúdo de qualidade, E-E-A-T, dados estruturados)
- Manter registro histórico para comparar evolução entre audits
- Considerar que o site é client-side — sugestões de conteúdo devem ser implementáveis em HTML estático
