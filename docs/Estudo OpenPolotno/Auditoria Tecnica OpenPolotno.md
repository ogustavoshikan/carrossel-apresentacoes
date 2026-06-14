# Auditoria Técnica Completa do Repositório OpenPolotno

Este documento apresenta uma análise técnica detalhada do projeto [OpenPolotno](https://github.com/therutvikp/OpenPolotno) para subsidiar as decisões de engenharia do **Carrossel Studio**.

---

## 🔍 Parte 1 — Dependências da Polotno

Não existe **nenhuma dependência de pacotes npm proprietários** da Polotno no [package.json](file:///C:/Users/Gustavo/apps/Carrossel%20Studio/docs/Estudo_OpenPolotno_Repo/package.json).

O OpenPolotno é uma reimplementação do zero em código aberto. No entanto, foram encontradas duas referências diretas de tráfego/marca da Polotno no código-fonte do repositório:

| Arquivo | Linha | Ocorrência | Finalidade | Impacto |
| :--- | :--- | :--- | :--- | :--- |
| `src/side-panel/videos-panel.tsx` | 14 | `https://api.polotno.com/api/pexels/videos/...` | Proxy de busca de vídeos populares/pesquisas no Pexels. | Depende da infraestrutura do Polotno para obter vídeos populares no painel lateral. |
| `src/utils/api.ts` | 3 | `export const URL_BASE = 'https://api.polotno.com';` | Domínio central de proxy para todas as consultas de recursos do editor. | Dependência total de rede com a Polotno para recursos. |

---

## 📡 Parte 2 — Chamadas de API

O OpenPolotno utiliza os servidores da Polotno (`api.polotno.com`) como um proxy HTTP unificado para serviços de mídias e ferramentas de inteligência artificial.

### 📋 Mapeamento de Endpoints (`src/utils/api.ts`)

* `unsplashList`: `/api/get-unsplash` (Listagem e pesquisa do Unsplash)
* `unsplashDownload`: `/api/download-unsplash` (Métricas de download)
* `svgapiList`: `/api/get-svgapi` (Busca de vetores gráficos)
* `iconscoutList`/`iconscoutDownload`: `/api/get-iconscout` (Ícones Iconscout)
* `nounProjectList`: `/api/get-nounproject` (Ícones Noun Project)
* `templateList`: `/api/get-templates` (Templates públicos da Polotno)
* `googleFontsList`: `/api/get-google-fonts` (Metadados das Google Fonts)
* `googleFontImage`: `/google-fonts-previews/black/...` (Imagens de prévia das fontes)
* `textTemplateList`: `/api/get-text-templates` (Combinações estéticas de textos)
* `removeBackground`: `/api/remove-image-background` (Remoção de fundo com IA)
* `aiText`: `/api/ai/text` (Assistente de escrita por IA)
* `raeditorShapesList`: `/api/get-basic-shapes` (Obtenção de shapes geométricos)

> [!IMPORTANT]
> **Veredito sobre APIs Proprietárias:**
> **SIM**, existem chamadas de API ativas para `polotno.com` e `api.polotno.com`. As requisições do editor transitam por esses servidores usando uma validação contornada no frontend do cliente.

---

## 🎨 Parte 3 — Canvas Engine

### 🕹️ Tecnologia Utilizada
O Canvas utiliza **Konva** (via `react-konva` e a biblioteca original `konva`). Não há uso do SDK compilado e fechado da Polotno.

### 📐 Mapa Arquitetural Completo
1. **UI:** Camada React de barras de ferramentas, painéis laterais e onboarding (`SidePanel`, `Toolbar`, `PagesTimeline`).
2. **Store:** Árvore de modelos reativos gerenciada por **MobX** e **MobX State Tree (MST)** ([store.ts](file:///C:/Users/Gustavo/apps/Carrossel%20Studio/docs/Estudo_OpenPolotno_Repo/src/model/store.ts)). Mantém páginas, fontes, áudios e elementos em memória.
3. **Canvas:** O `WorkspaceCanvas` ([workspace-canvas.tsx](file:///C:/Users/Gustavo/apps/Carrossel%20Studio/docs/Estudo_OpenPolotno_Repo/src/canvas/workspace-canvas.tsx)) gerencia o contêiner de renderização, zoom físico (`scale`) e réguas dinâmicas.
4. **Renderer:** O componente `Page` ([page.tsx](file:///C:/Users/Gustavo/apps/Carrossel%20Studio/docs/Estudo_OpenPolotno_Repo/src/canvas/page.tsx)) instancia o `<Stage>` e `<Layer>` do `react-konva`. Os nós do MST são despachados no componente `Element` ([element.tsx](file:///C:/Users/Gustavo/apps/Carrossel%20Studio/docs/Estudo_OpenPolotno_Repo/src/canvas/element.tsx)) que renderiza textos, imagens, vídeos, GIFs ou formas usando classes nativas do Konva (`Text`, `Image`, `Rect`, etc.).
5. **Export:** Compila os elementos visuais de volta em arquivos físicos locais.

---

## 💾 Parte 4 — Sistema de Estado

* **Tecnologia:** `mobx` e `mobx-state-tree` (MST).
* **Natureza da Store:** **Store própria**. Trata-se de uma reimplementação/réplica aberta baseada nos conceitos estruturais do Polotno SDK, mas desenvolvida de forma independente no repositório.

---

## 📤 Parte 5 — Exportação

* **Formatos:** PNG, JPG, PDF, SVG, GIF, HTML.
* **Mecanismo de Processamento:** **(A) 100% Localmente**.
  - As imagens PNG e JPG e a animação em GIF são geradas renderizando os elementos locais em um canvas HTML5 invisível no navegador e extraindo os dados binários via `canvas.toBlob()`.
  - O PDF é montado na máquina do usuário através da biblioteca `jsPDF`.
  - O SVG e HTML são gerados convertendo a estrutura de objetos JSON da página local para tags textuais correspondentes via javascript no cliente.

---

## 🗂️ Parte 6 — Templates

* Os templates são **totalmente independentes** de chamadas de API ou servidores da Polotno para sua renderização visual.
* O sistema salva o estado reativo do editor em snapshots JSON estruturados por meio do método `store.toJSON()` e os reconstrói usando `store.loadJSON(json)`. 
* O formato é inteiramente compatível com os esquemas de dados da Polotno tradicional.

---

## 🌐 Parte 7 — Recursos Externos

Integrações com APIs e serviços de terceiros (Unsplash, Pexels, Google Fonts, Iconscout, Noun Project, Remove Background, IA) passam pela API oficial da Polotno. Todas as integrações são **tecnicamente opcionais** para o funcionamento da engine visual do Canvas (que funciona offline com imagens locais), mas são exigidas para popular os painéis laterais.

---

## ⚖️ Parte 8 — Licenciamento

1. **Qual licença o projeto utiliza?** Licença **MIT** (Copyright (c) 2026 therutvikp).
2. **Permite uso comercial?** Sim, totalmente.
3. **Permite modificação?** Sim, totalmente.
4. **Permite distribuição?** Sim, totalmente (mantendo o copyright).
5. **Existe dependência com obrigação de licenciamento com a Polotno?**
   - **Engine de Código:** **Não**. Sendo código MIT e independente do SDK compilado proprietário, não há taxas ou obrigações sobre o software.
   - **APIs de Infraestrutura:** **Sim (Alto Risco)**. Usar comercialmente a rota `api.polotno.com` contornando a validação de chave do frontend configura tráfego clandestino em servidores privados alheios. Isso expõe o Carrossel Studio a bloqueios de rede instantâneos e potenciais processos judiciais por violação de propriedade industrial.

---

## 🛡️ Parte 9 — Risco de Vendor Lock-in

* **Classificação de Dependência:** **(B) Parcialmente dependente da Polotno**.
* **Justificativa:** O core de desenho, edição de páginas e exportação é livre e independente offline. A única dependência reside nas consultas de mídias, remoção de fundo e IA, que requerem a substituição dos proxies da Polotno por endpoints próprios.

---

## 🚀 Parte 10 — Viabilidade para Produção

* **Veredito de Viabilidade:** **Requer refatoração moderada**.
* **Justificativa:** O OpenPolotno provê uma base técnica espetacular, reativa e completa para o Canvas do Carrossel Studio. As únicas adaptações obrigatórias para colocar o editor no ar comercialmente de forma 100% ética e legal são parametrizar os proxies de buscas de fotos/vídeos e tipografia para chaves de desenvolvedor dedicadas do próprio Carrossel Studio, e remover logs e referências que citem a marca e os programadores da Polotno.

---

### 🚨 Veredito Final de Uso Comercial

<br>

<div align="center">
  <h3><strong>"Pode ser usado após modificações"</strong></h3>
</div>
