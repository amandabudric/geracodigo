# GeraCode — Skills de SEO para Claude Code

## Estrutura

```
geracode-skills/
├── CLAUDE.md                              # Contexto do projeto (vai na raiz do repo)
├── README.md                              # Este arquivo
└── skills/
    ├── seo-schema-audit/
    │   └── SKILL.md                       # Auditoria e geração de JSON-LD
    ├── seo-content-expander/
    │   └── SKILL.md                       # Pesquisa de keywords e briefs de conteúdo
    ├── seo-geo-audit/
    │   └── SKILL.md                       # Visibilidade em LLMs (GEO/LLMO)
    └── seo-competitor-monitor/
        └── SKILL.md                       # Análise competitiva
```

## Instalação

### Opção 1: Skills globais (disponíveis em qualquer projeto)

```bash
# Copiar skills para o diretório global do Claude Code
cp -r skills/seo-schema-audit ~/.claude/skills/
cp -r skills/seo-content-expander ~/.claude/skills/
cp -r skills/seo-geo-audit ~/.claude/skills/
cp -r skills/seo-competitor-monitor ~/.claude/skills/
```

### Opção 2: Skills no projeto (disponíveis só no repo do GeraCode)

```bash
# Na raiz do repo do GeraCode:
mkdir -p .claude/skills
cp -r skills/* .claude/skills/

# Copiar também o CLAUDE.md para a raiz
cp CLAUDE.md ./CLAUDE.md
```

### Configurar CLAUDE.md

O `CLAUDE.md` vai na **raiz do repositório** do GeraCode. Ele dá contexto ao Claude Code sobre o projeto inteiro.

```bash
cp CLAUDE.md /caminho/do/repo/geracode/CLAUDE.md
```

## MCP Servers recomendados

Para maximizar o potencial das skills, configure estes MCP servers no seu `.claude/mcp.json` ou `.mcp.json` do projeto:

```json
{
  "mcpServers": {
    "gsc": {
      "command": "python",
      "args": ["caminho/para/mcp-gsc/gsc_server.py"],
      "env": {
        "GSC_CREDENTIALS_PATH": "caminho/para/credentials.json",
        "GSC_SKIP_OAUTH": "true"
      }
    },
    "technical-seo": {
      "type": "url",
      "url": "https://mcp.technicalseomcp.com/sse"
    }
  }
}
```

**Outros MCP servers compatíveis:**
- SEMrush MCP (oficial) — para keyword research e competitive analysis
- GA4 MCP (Google oficial) — para dados de analytics
- Ahrefs MCP (`@ahrefs/mcp`) — para backlinks e keyword data

## Como usar

Depois de instalar, basta pedir ao Claude Code no terminal:

```
# Schema audit
"Audita o schema markup da página /gerador-de-qr-code-pix e gera JSON-LD otimizado"

# Content expansion
"Gera um brief de conteúdo para a keyword 'como gerar código de barras EAN-13 para Shopee'"

# GEO audit
"Faz um audit de GEO para as queries principais do GeraCode"

# Competitor analysis
"Analisa o que o pix.ae está fazendo de diferente em SEO"
```

## Atualizações

Estas skills foram criadas em março/2026. Para manter atualizadas:
- Revisar os clusters de keywords trimestralmente
- Atualizar a lista de concorrentes conforme novos players surgirem
- Ajustar os sinais de GEO conforme as práticas evoluem
- Adicionar novos schemas conforme Google suportar novos tipos
