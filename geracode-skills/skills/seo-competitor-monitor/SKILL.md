---
name: seo-competitor-monitor
description: "Monitora e analisa concorrentes do GeraCode em SEO, conteúdo e presença digital. Use esta skill sempre que o usuário mencionar 'concorrente', 'competidor', 'competitor', 'análise competitiva', 'benchmark', 'gap analysis', 'o que o concorrente está fazendo', ou quiser comparar o GeraCode com outros geradores de código de barras ou QR Code. Também use para identificar oportunidades que concorrentes estão explorando e o GeraCode não."
---

# SEO Competitor Monitor — GeraCode

Skill para monitorar, analisar e extrair insights dos concorrentes diretos do GeraCode.

## Concorrentes mapeados

### Diretos (mesma funcionalidade)
| Concorrente | URL | Foco |
|---|---|---|
| Gerador de Código de Barras | geradordecodigodebarras.com.br | Código de barras genérico |
| Pix.ae | pix.ae | QR Code Pix |
| QR Code Pix | qrcode-pix.com | QR Code Pix |
| BR Barcode | br-barcode.com | Código de barras |
| Gerador de Code | geradordecode.com | Multi-formato |

### Indiretos (ferramentas internacionais ou SaaS)
| Concorrente | URL | Foco |
|---|---|---|
| Barcode Generator (TEC-IT) | barcode.tec-it.com | Multi-formato internacional |
| QR Code Generator | qr-code-generator.com | QR Code internacional |
| Canva (funcionalidade QR) | canva.com | Design + QR Code |

## Workflow: Análise competitiva completa

### Passo 1 — Crawl da estrutura do concorrente

Para cada concorrente:

1. **Fetch homepage** via `web_fetch`
2. **Mapear páginas**:
   - Quantas ferramentas/páginas de produto
   - Tem blog? Quantos posts?
   - Tem FAQ? Página "Sobre"?
   - Tem schema markup?
3. **Registrar**:
   ```markdown
   ## [Concorrente]
   - Páginas de ferramenta: [N]
   - Blog posts: [N estimado]
   - Schema: [tipos encontrados]
   - Diferencial: [o que tem que o GeraCode não]
   - Fraqueza: [onde o GeraCode é melhor]
   ```

### Passo 2 — Comparação de keywords (com SEMrush MCP)

Se SEMrush MCP disponível:
1. Rodar Keyword Gap: GeraCode vs top 3 concorrentes
2. Filtrar keywords onde concorrente rankeia e GeraCode não
3. Classificar por: volume, KD, intent
4. Identificar "low-hanging fruit": volume > 100, KD < 30, intent informacional

Se MCP não disponível:
1. Pesquisar via `web_search` as keywords dos clusters do content-expander
2. Verificar quais concorrentes aparecem no top 10
3. Anotar posições relativas

### Passo 3 — Análise de conteúdo

Para cada concorrente com blog/conteúdo:
1. Listar os top posts (títulos e temas)
2. Identificar formatos que usam (tutorial, lista, comparação, glossário)
3. Verificar se têm FAQ, schema, internal linking
4. Mapear gaps: conteúdos que eles cobrem e o GeraCode não

### Passo 4 — Análise técnica rápida

Para cada concorrente:
1. Verificar Core Web Vitals via web_search (PageSpeed Insights)
2. Checar se é HTTPS
3. Verificar mobile-friendliness
4. Checar robots.txt (permitem bots de IA?)
5. Verificar sitemap.xml

### Passo 5 — Análise de backlinks (com SEMrush/Ahrefs MCP)

Se MCP disponível:
1. Comparar perfis de backlink
2. Identificar domínios que linkam para concorrentes mas não para o GeraCode
3. Priorizar oportunidades de outreach

## Formato de relatório

```markdown
# Análise Competitiva — GeraCode
**Data**: [data]
**Concorrentes analisados**: [lista]

## Resumo executivo
- GeraCode está [à frente / atrás / par] em [aspecto]
- Maior gap: [descrição]
- Maior vantagem: [descrição]
- Top 3 ações recomendadas: [lista]

## Comparação página a página
| Aspecto | GeraCode | Concorrente A | Concorrente B |
|---|---|---|---|
| Ferramentas | 4 | X | Y |
| Blog posts | 0 | X | Y |
| Schema markup | ❌/✅ | ❌/✅ | ❌/✅ |
| FAQ | ❌/✅ | ❌/✅ | ❌/✅ |
| CWV (mobile) | X | X | X |
| Bots IA permitidos | ❌/✅ | ❌/✅ | ❌/✅ |

## Keyword gaps
[tabela com keywords que concorrentes têm e GeraCode não]

## Content gaps
[lista de conteúdos que concorrentes publicaram e GeraCode pode replicar/superar]

## Oportunidades de ação
| Prioridade | Ação | Benchmark (quem faz bem) | Impacto | Esforço |
|---|---|---|---|---|
| P0 | [ação] | [concorrente] | Alto | Baixo |

## Vantagens competitivas do GeraCode a reforçar
- 100% client-side (privacidade)
- QR Code Pix com payload BR Code válido
- [outras]
```

## Monitoramento contínuo

Quando solicitado, criar um checklist de monitoramento mensal:

```markdown
## Checklist mensal de monitoramento competitivo
- [ ] Verificar se concorrentes lançaram novas ferramentas
- [ ] Checar novos blog posts dos concorrentes
- [ ] Re-testar queries de GEO (quem é citado?)
- [ ] Comparar posições para keywords core
- [ ] Verificar se algum concorrente ganhou featured snippet que era do GeraCode
- [ ] Checar novos backlinks dos concorrentes
```

## Regras

- Nunca copiar conteúdo de concorrentes — apenas identificar temas e gaps
- Focar em oportunidades acionáveis, não em listas exaustivas
- Sempre contextualizar: "concorrente X faz Y, mas o GeraCode pode fazer melhor porque Z"
- Priorizar por impacto × esforço
- Manter tom analítico, sem denegrir concorrentes
