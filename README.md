# GeraCode

Plataforma gratuita com ferramentas de geração de códigos para lojistas brasileiros. 100% processado no navegador — nenhum dado é enviado a servidores.

**Produção:** [www.geracodigo.com.br](https://www.geracodigo.com.br)

## Ferramentas

| Ferramenta | Rota | Descrição |
|---|---|---|
| Código de Barras | `/gerador-de-codigo-de-barras` | 12 formatos (Code128, EAN-13, UPC-A, ITF-14, etc.) com modo lote |
| EAN | `/gerador-de-ean` | EAN-13 e EAN-8 com cálculo automático do dígito verificador |
| QR Code | `/gerador-de-qr-code` | QR Code genérico com cores e tamanho personalizáveis |
| QR Code Pix | `/gerador-de-qr-code-pix` | Pix estático com todos os tipos de chave (CPF, CNPJ, e-mail, telefone, aleatória) |
| Leitor | `/leitor-de-codigo-de-barras` | Leitura de códigos de barras e QR Code via câmera |
| SKU | `/gerador-de-sku` | Gerador de SKU com regras configuráveis |

## Tech Stack

- **Framework:** Next.js 16 (App Router, React 19)
- **Estilo:** Tailwind CSS v4
- **Testes:** Vitest
- **Lint:** ESLint 9 + eslint-config-next
- **Git hooks:** Husky + lint-staged
- **Deploy:** Vercel

## Pré-requisitos

- Node.js >= 20
- npm >= 10

## Setup local

```bash
# 1. Clone o repositório
git clone https://github.com/amandabudric/geracodigo.git
cd geracodigo

# 2. Instale as dependências
npm ci

# 3. Copie as variáveis de ambiente
cp .env.example .env.local

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:3000`.

## Scripts disponíveis

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento com hot reload |
| `npm run build` | Build de produção |
| `npm run start` | Serve o build de produção localmente |
| `npm run lint` | Roda ESLint em todo o projeto |
| `npm run test` | Roda os testes unitários (Vitest) |
| `npm run test:watch` | Testes em modo watch |
| `npm run typecheck` | Verifica tipos TypeScript |

## Estrutura do projeto

```
src/
├── app/                          # Rotas (App Router)
│   ├── gerador-de-codigo-de-barras/
│   ├── gerador-de-ean/
│   ├── gerador-de-qr-code/
│   ├── gerador-de-qr-code-pix/
│   ├── gerador-de-sku/
│   ├── leitor-de-codigo-de-barras/
│   ├── sobre/
│   ├── termos-e-privacidade/
│   ├── layout.tsx                # Layout raiz
│   ├── page.tsx                  # Landing page
│   ├── sitemap.ts                # Sitemap dinâmico
│   └── robots.ts                 # robots.txt
├── components/                   # Componentes reutilizáveis
├── lib/                          # Utilitários e lógica de negócio
└── types/                        # Definições de tipos TypeScript
```

## Variáveis de ambiente

| Variável | Obrigatória | Descrição |
|---|---|---|
| `NEXT_PUBLIC_ADSENSE_CLIENT` | Não | ID do Google AdSense (`ca-pub-...`) |
| `NEXT_PUBLIC_GA_ID` | Não | ID do Google Analytics 4 (`G-...`) — desnecessário se configurado via DNS |

## Fluxo de desenvolvimento

### Branches

- `master` — branch de produção; deploy automático na Vercel a cada push

### Antes de commitar

O Husky executa `lint-staged` automaticamente no pre-commit, que roda `eslint --fix` em todos os arquivos `.ts` e `.tsx` alterados.

### Checklist para novas features

1. Crie os arquivos na rota correspondente em `src/app/`
2. Adicione a rota no `sitemap.ts`
3. Crie o `opengraph-image.tsx` para a rota
4. Adicione o link na landing page (`src/app/page.tsx`)
5. Rode `npm run typecheck` e `npm run test` antes de fazer push
6. Rode `npm run build` para garantir que o build de produção funciona

### Convenção de commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: adiciona gerador de SKU
fix: corrige cálculo do dígito verificador EAN-8
refactor: extrai lógica de download para src/lib/download.ts
docs: atualiza README com nova ferramenta
```

## Testes

Os testes ficam ao lado dos arquivos que testam (`*.test.ts`):

```
src/lib/pix.ts              → src/lib/pix.test.ts
src/lib/ean-check-digit.ts  → src/lib/ean-check-digit.test.ts
src/lib/sku-generator.ts    → src/lib/sku-generator.test.ts
src/lib/barcode-history.ts  → src/lib/barcode-history.test.ts
```

```bash
npm run test          # roda uma vez
npm run test:watch    # modo watch para desenvolvimento
```

## Deploy

O deploy é automático via Vercel, conectado ao branch `master` do GitHub. Cada push no `master` gera um novo deploy de produção.

Para preview de PRs, a Vercel gera URLs de preview automaticamente.

## Licença

Projeto privado. Todos os direitos reservados.
