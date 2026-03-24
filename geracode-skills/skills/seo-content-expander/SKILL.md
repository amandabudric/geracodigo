---
name: seo-content-expander
description: "Pesquisa keywords long-tail, gera briefs de conteúdo e planeja expansão editorial para o GeraCode. Use esta skill sempre que o usuário mencionar 'conteúdo', 'blog', 'artigo', 'tutorial', 'brief', 'pauta', 'keyword research', 'pesquisa de palavras-chave', 'long-tail', 'calendário editorial', ou quiser expandir o site com novas páginas para capturar tráfego orgânico. Também use quando pedir ideias de conteúdo, análise de oportunidades de keyword, ou planejamento de content hub."
---

# SEO Content Expander — GeraCode

Skill para pesquisar oportunidades de conteúdo, gerar briefs estruturados e planejar expansão editorial focada em tráfego orgânico para o GeraCode.

## Contexto do site

O GeraCode tem hoje ~5 páginas de ferramenta e nenhum conteúdo editorial. O potencial de long-tail é enorme porque:
- Lojistas BR buscam "como fazer X" antes de usar uma ferramenta
- Keywords de "como gerar código de barras para [marketplace]" têm volume relevante e baixa concorrência
- Conteúdo educacional é citado por LLMs em respostas de AI Search

## Clusters de conteúdo prioritários

### Cluster 1: Código de Barras para E-commerce
- como gerar código de barras para produto
- código de barras EAN-13 o que é
- como cadastrar código de barras na Shopee / Mercado Livre / Amazon
- diferença entre EAN-13 e EAN-8
- código de barras para MEI
- como imprimir etiqueta com código de barras

### Cluster 2: QR Code Pix para Negócios
- como gerar QR Code Pix estático
- QR Code Pix para MEI
- como colocar QR Code Pix no balcão / cardápio
- diferença entre Pix estático e dinâmico
- QR Code Pix para loja online
- como receber Pix por QR Code no e-commerce

### Cluster 3: QR Code Geral
- como criar QR Code para link
- QR Code para cardápio digital
- QR Code para redes sociais
- QR Code para Wi-Fi
- como personalizar QR Code com cor e logo

### Cluster 4: Guias Técnicos
- o que é Code 128 vs Code 39
- padrão BR Code do Banco Central
- como funciona o payload Pix
- UPC-A vs EAN-13 diferenças
- ISBN como gerar

## Workflow: Pesquisa de keywords

1. **Se SEMrush MCP disponível**:
   - Usar Keyword Magic Tool para expandir seed keywords dos clusters acima
   - Filtrar por: volume > 100/mês, KD < 40, intent = informational
   - Cruzar com Keyword Gap vs concorrentes

2. **Se GSC MCP disponível**:
   - Puxar queries onde GeraCode já aparece (impressões > 0, posição > 10)
   - Identificar quick wins: impressões altas + posição 8-20

3. **Se nenhum MCP disponível**:
   - Usar web_search para pesquisar "autocomplete" e "People Also Ask"
   - Pesquisar nos concorrentes quais páginas de blog eles têm
   - Cruzar com Google Trends para sazonalidade

## Workflow: Gerar brief de conteúdo

Para cada keyword/tema aprovado, gerar um brief com esta estrutura:

```markdown
# Brief: [Título do artigo]

## Meta
- **Keyword principal**: [keyword]
- **Keywords secundárias**: [lista]
- **Search intent**: [informacional / transacional / navegacional]
- **Volume estimado**: [X/mês]
- **URL sugerida**: /blog/[slug]

## Estrutura do artigo
- **Title tag**: [max 60 chars, keyword no início]
- **Meta description**: [max 155 chars, CTA incluso]
- **H1**: [pode diferir do title tag]

### Outline
- H2: [seção 1]
  - Pontos a cobrir: ...
- H2: [seção 2]
  - Pontos a cobrir: ...
- H2: FAQ (perguntas frequentes)
  - Q: [pergunta 1]
  - Q: [pergunta 2]

## Internal links
- Linkar para: [página de ferramenta relevante do GeraCode]
- Anchor text sugerido: [texto]

## CTA principal
- Direcionar para: [URL da ferramenta]
- Copy sugerido: [ex: "Gere seu código de barras EAN-13 grátis agora"]

## Schema sugerido
- HowTo (se tutorial)
- FAQPage (se tiver FAQ)
- Article / BlogPosting

## Referências para o redator
- [links de fontes confiáveis para embasar o conteúdo]
```

## Workflow: Calendário editorial

Quando solicitado um calendário:

1. Priorizar por: volume × (1/KD) × relevância para conversão
2. Agrupar por cluster (publicar cluster completo antes de ir para o próximo)
3. Sugerir frequência realista (1-2 posts/semana para site solo)
4. Incluir datas de publicação sugeridas
5. Marcar posts pillar vs posts satélite

## Formato de entrega

- **Lista de keywords**: tabela com keyword, volume, KD, intent, cluster, prioridade
- **Briefs**: um arquivo markdown por brief, ou todos em um documento
- **Calendário**: tabela com data, título, cluster, keyword, URL, status

## Regras

- Todo conteúdo sugerido deve linkar para pelo menos uma ferramenta do GeraCode (conversão)
- Nunca sugerir conteúdo que contradiga a USP de privacidade do site
- Focar em pt-BR, termos que lojistas brasileiros realmente usam
- Preferir keywords com intent transacional ou informacional com viés de ação
- Incluir FAQs em todos os briefs (alimenta Rich Results + GEO)
