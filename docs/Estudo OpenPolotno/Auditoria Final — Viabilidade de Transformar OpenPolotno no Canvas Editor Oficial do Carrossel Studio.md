# Auditoria Final — Viabilidade de Transformar o OpenPolotno no Canvas Editor Oficial do Carrossel Studio

Este documento apresenta o relatório final consolidado de viabilidade técnica, arquitetural e jurídica para a adoção do **OpenPolotno** como a engine principal e oficial de canvas do **Carrossel Studio**.

---

## 🎯 Objetivo da Auditoria
Determinar com precisão e base empírica todas as dependências de rede, serviços externos e vulnerabilidades proprietárias que ainda conectam o OpenPolotno aos servidores da Polotno, traçando um plano de ação definitivo para desvincular o produto e torná-lo **100% autônomo, seguro e livre de royalties**.

---

## 📡 1. Chamadas de Rede e Conexões com `api.polotno.com`

Mapeamos todas as conexões HTTP ativas direcionadas aos servidores da Polotno no código-fonte:

| Arquivo de Origem | Linha | Endpoint Chamado | Finalidade | Grau de Risco |
| :--- | :--- | :--- | :--- | :--- |
| [api.ts](file:///C:/Users/Gustavo/apps/Carrossel%20Studio/docs/Estudo_OpenPolotno_Repo/src/utils/api.ts#L3) | 3 | `export const URL_BASE = 'https://api.polotno.com';` | Define o domínio central de proxy para todas as consultas. | 🚨 **Alto** (Ponto de falha único se houver bloqueio de CORS/IP) |
| [api.ts](file:///C:/Users/Gustavo/apps/Carrossel%20Studio/docs/Estudo_OpenPolotno_Repo/src/utils/api.ts#L22) | 22 | `/api/get-unsplash` | Consultar e buscar fotos da Unsplash. | 🟡 **Médio** (Quebra o painel de Fotos) |
| [api.ts](file:///C:/Users/Gustavo/apps/Carrossel%20Studio/docs/Estudo_OpenPolotno_Repo/src/utils/api.ts#L24) | 24 | `/api/get-svgapi` | Consultar vetores da SVG API. | 🟢 **Baixo** (Quebra menu de vetores) |
| [api.ts](file:///C:/Users/Gustavo/apps/Carrossel%20Studio/docs/Estudo_OpenPolotno_Repo/src/utils/api.ts#L26) | 26 | `/api/get-iconscout` | Buscar ícones no Iconscout. | 🟢 **Baixo** |
| [api.ts](file:///C:/Users/Gustavo/apps/Carrossel%20Studio/docs/Estudo_OpenPolotno_Repo/src/utils/api.ts#L28) | 28 | `/api/get-nounproject` | Buscar ícones no Noun Project. | 🟢 **Baixo** |
| [api.ts](file:///C:/Users/Gustavo/apps/Carrossel%20Studio/docs/Estudo_OpenPolotno_Repo/src/utils/api.ts#L30) | 30 | `/api/get-templates` | Consultar biblioteca de templates públicos. | 🟡 **Médio** (Quebra painel de Templates) |
| [api.ts](file:///C:/Users/Gustavo/apps/Carrossel%20Studio/docs/Estudo_OpenPolotno_Repo/src/utils/api.ts#L31) | 31 | `/api/get-google-fonts` | Listar catálogo de Google Fonts. | 🟡 **Médio** (Prejudica o seletor de tipografia) |
| [api.ts](file:///C:/Users/Gustavo/apps/Carrossel%20Studio/docs/Estudo_OpenPolotno_Repo/src/utils/api.ts#L32) | 32 | `/google-fonts-previews/black/...` | Baixar imagens PNG de prévia das fontes. | 🟢 **Baixo** |
| [api.ts](file:///C:/Users/Gustavo/apps/Carrossel%20Studio/docs/Estudo_OpenPolotno_Repo/src/utils/api.ts#L33) | 33 | `/api/get-text-templates` | Listar combinações estéticas de fontes. | 🟢 **Baixo** |
| [api.ts](file:///C:/Users/Gustavo/apps/Carrossel%20Studio/docs/Estudo_OpenPolotno_Repo/src/utils/api.ts#L34) | 34 | `/api/remove-image-background` | Processar remoção de fundo por inteligência artificial. | 🟢 **Baixo** (Recurso opcional) |
| [api.ts](file:///C:/Users/Gustavo/apps/Carrossel%20Studio/docs/Estudo_OpenPolotno_Repo/src/utils/api.ts#L35) | 35 | `/api/ai/text` | Chamar assistente de escrita por IA. | 🟢 **Baixo** (Recurso opcional) |
| [api.ts](file:///C:/Users/Gustavo/apps/Carrossel%20Studio/docs/Estudo_OpenPolotno_Repo/src/utils/api.ts#L40) | 40 | `/api/get-basic-shapes` | Buscar as formas geométricas vetorizadas básicas. | 🟡 **Médio** (Menu de Shapes fica em branco) |
| [videos-panel.tsx](file:///C:/Users/Gustavo/apps/Carrossel%20Studio/docs/Estudo_OpenPolotno_Repo/src/side-panel/videos-panel.tsx#L14) | 14 | `/api/pexels/videos/...` | Consultar biblioteca de vídeos do Pexels. | 🟢 **Baixo** (Quebra painel de vídeos) |

---

## 🛠️ 2. Mapeamento de Serviços Externos de Terceiros

Avaliamos a obrigatoriedade e a possibilidade de substituição direta das integrações do editor:

* **Unsplash (Fotos) & Pexels (Vídeos):** **Opcionais e 100% Substituíveis.** Em produção comercial, basta criarmos contas gratuitas de desenvolvedores nas plataformas oficiais e apontarmos as requisições HTTP do frontend para rotas de proxy no nosso backend contendo a **nossa própria API Key**.
* **Google Fonts (Fontes):** **Opcional e 100% Substituível.** Mapeável criando um JSON estático de metadados de fontes no projeto e carregando os arquivos físicos `.ttf`/`.woff2` diretamente dos servidores de CDN do Google (que são públicos e gratuitos).
* **Remove.bg (Remoção de Fundo) & OpenAI/Gemini (IA):** **Opcionais.** Podem ser integrados diretamente a microsserviços próprios ou APIs parceiras usando chaves do Carrossel Studio no backend.

---

## 📂 3. Diagnóstico de Funcionamento da Sidebar

Analisamos o impacto do bloqueio dos servidores da Polotno sobre cada menu lateral e o grau de dificuldade para substituí-los:

| Menu Lateral | Funciona sem Polotno? | O que precisa ser substituído para funcionar de forma autônoma? | Grau de Dificuldade |
| :--- | :---: | :--- | :---: |
| **Templates** | **NÃO** | Criar tabela no Supabase para salvar e listar nossos próprios arquivos JSON de designs (`toJSON` / `loadJSON`). | 🟢 **BAIXO** |
| **Photos** | **NÃO** | Criar proxy simples no backend integrado com nossa API Key gratuita do Unsplash. | 🟡 **MÉDIO** |
| **Videos** | **NÃO** | Criar proxy simples no backend integrado com nossa API Key gratuita do Pexels. | 🟡 **MÉDIO** |
| **Text** | **PARCIAL** | *Funciona:* Caixas de texto simples com fontes de sistema. *Quebra:* Listagem e prévia de Google Fonts. Substituir por JSON estático de fontes e renderização via CSS. | 🟢 **BAIXO** |
| **Elements** | **NÃO** | Substituir buscas de ícones integrando localmente com a biblioteca **Lucide-React** (que já usamos no projeto). | 🟢 **BAIXO** |
| **Shapes** | **NÃO** | Baixar as formas geométricas básicas (círculos, retângulos, setas) e hospedá-las na pasta `/public/shapes/`. | 🟢 **BAIXO** |
| **Uploads** | **SIM** | **100% Funcional offline.** Opcionalmente acoplável com o Supabase Storage para salvar os arquivos de forma permanente na nuvem. | 🟢 **BAIXO** |
| **Background** | **PARCIAL** | *Funciona:* Cores sólidas e gradientes locais. *Quebra:* Galeria de imagens do Unsplash para plano de fundo. | 🟢 **BAIXO** |

---

## 🔤 4. Auditoria de Carregamento de Fontes

* **Como carrega:** O OpenPolotno carrega fontes tipográficas de forma totalmente reativa no cliente. O arquivo [fonts.ts](file:///C:/Users/Gustavo/apps/Carrossel%20Studio/docs/Estudo_OpenPolotno_Repo/src/utils/fonts.ts) gerencia a injeção dinâmica de tags `@font-face` diretamente no cabeçalho do DOM do navegador.
* **De onde vêm os arquivos físicos:** Os arquivos binários de fontes (`.woff2`, `.ttf`) **não vêm da Polotno**. Eles vêm diretamente da CDN pública do Google (`https://fonts.gstatic.com/...`). A Polotno apenas fornece o catálogo (lista) e miniaturas PNG de pré-visualização.
* **Existe dependência real?** **Não.** A dependência é apenas de catálogo e miniaturas.
* **Estratégia do Carrossel Studio:**
  1. Hospedar a lista das fontes em formato JSON localmente na nossa pasta estática.
  2. Mapear a prévia da fonte no seletor de tipografia aplicando a regra CSS `font-family` diretamente no elemento de texto, eliminando por completo a necessidade de carregar imagens de prévia em PNG da Polotno.
  3. Mapear fontes personalizadas enviadas pelo usuário, funcionalidade suportada de forma nativa offline pelo OpenPolotno.

---

## 📐 5. Shapes e Elements (Formas e Ícones)

* **De onde vêm:** As formas geométricas básicas não estão no código-fonte. Elas são baixadas sob demanda da API da Polotno (`/api/get-basic-shapes`).
* **Como substituir:**
  * Baixar as formas clássicas (círculos, triângulos, estrelas, retângulos) e salvá-las como arquivos `.svg` na pasta `/public/shapes/` do Carrossel Studio.
  * Carregar o menu de elementos mapeando essa biblioteca local de SVGs.
  * Para ícones, renderizar a biblioteca de ícones offline do Lucide-React diretamente na sidebar de elementos.

---

## 💾 6. Uploads de Mídias

* **Análise técnica:** **Livre de dependências.** 
* **Funcionamento:** Quando o usuário realiza um upload (imagem, SVG, vídeo), o editor gera uma URL de blob em memória do navegador (`URL.createObjectURL(file)`) que permite ao Konva ler e pintar o elemento no Stage instantaneamente. Para salvar de forma estável em produção, basta fazer a ponte com a API do **Supabase Storage** para enviar e salvar o arquivo de forma permanente no bucket na nuvem.

---

## 📤 7. Mecanismos de Exportação (PNG, JPG, PDF, SVG)

* **Análise técnica:** **100% Locais, Autônomos e Offline.** 
* **Funcionamento:** A exportação de arquivos é feita no próprio cliente. PNG/JPG usam chamadas nativas de extração do elemento canvas (`canvas.toBlob()`). O SVG/HTML converte os metadados JSON no cliente. O PDF usa a biblioteca `jsPDF` injetada dinamicamente via CDN do Cloudflare (`cdnjs`).
* **Pontos de Atenção:** Devemos embutir o script do `jsPDF` diretamente no bundle local de compilação do Carrossel Studio, removendo a dependência da CDN externa para total independência offline.
* **Licença:** Sem royalties ou licenças ativas exigidas.

---

## 🎨 8. Engine de Renderização do Canvas

* **Análise técnica:** **100% Independente, Local e offline.** 
* **Funcionamento:** Toda a lógica de desenho do palco (Stage e Layers), manipulação e redimensionamento por âncoras (Transformer), rotação, snap guides de alinhamento inteligente e o gerenciamento de histórico de desfazer/refazer (MST UndoManager) ocorrem de forma autônoma em Javascript local.
* **Evidências:** O arquivo [page.tsx](file:///C:/Users/Gustavo/apps/Carrossel%20Studio/docs/Estudo_OpenPolotno_Repo/src/canvas/page.tsx) instancia o `<Stage>` e a `<Layer>` do `react-konva` e o `Transformer` do Konva de forma direta, livre de qualquer importação de pacotes fechados da Polotno.

---

## 💎 9. Recursos Premium da Polotno

Mapeamos a substituição das ferramentas premium da Polotno para produção comercial:

| Recurso Premium Polotno | Existe no OpenPolotno? | Como substituir de forma independente no Carrossel Studio |
| :--- | :---: | :--- |
| **Biblioteca de Templates** | Não | Integrar com tabelas personalizadas de designs no Supabase. |
| **AI Text Writer** | Sim (via API Polotno) | Apontar rota de backend para chamar a API oficial do **Google Gemini** com nossa API Key. |
| **Remove Background** | Sim (via API Polotno) | Conectar com API Key própria do *remove.bg* ou rodar modelos WASM locais de remoção gratuita. |
| **Busca de Fotos / Vídeos** | Sim (via API Polotno) | Conectar diretamente às APIs do Unsplash e Pexels com credenciais próprias de desenvolvedor. |
| **Ícones Iconscout / Noun** | Sim (via API Polotno) | Substituir por ícones do **Lucide-React** locais e biblioteca FontAwesome. |

---

## 🏁 10. Veredito Final de Viabilidade Técnica e Jurídica

<br>

<div align="center">
  <h3><strong>Podemos usar o OpenPolotno como base do Canvas Editor do Carrossel Studio?</strong></h3>
  <h1><strong>SIM</strong></h1>
</div>

<br>

### 🛠️ O que precisará ser substituído:
1. Parametrizar a classe `URLS` ([api.ts](file:///C:/Users/Gustavo/apps/Carrossel%20Studio/docs/Estudo_OpenPolotno_Repo/src/utils/api.ts)) para apontar para rotas do nosso backend (com chaves de API do Unsplash, Pexels e Gemini).
2. Hospedar localmente na pasta `/public` os arquivos de formas geométricas (Shapes) e a lista estática de Google Fonts em JSON.
3. Importar a biblioteca `jsPDF` localmente no bundle de compilação em vez de chamá-la da CDN.
4. Ajustar as referências da marca "Polotno / Anton" para o Carrossel Studio em logs de tratamento de erros.

### ⏱️ Prazo de Implementação e Trabalho Estimado:
* **Prazo:** **5 a 7 dias de trabalho** por um único desenvolvedor sênior para ter o sistema 100% parametrizado, testado e em produção comercial de forma independente.

### 🛡️ Classificação de Risco Técnico:
<br>
<div align="center">
  <h3><strong>BAIXO</strong></h3>
</div>

### ⚖️ Bloqueios Jurídicos ou Técnicos Identificados:
* **Jurídico:** **Nenhum.** O projeto OpenPolotno está legitimamente licenciado sob os termos permissivos da licença **MIT**, o que concede total direito legal para uso comercial, modificações profundas e distribuição gratuita e sem royalties.
* **Técnico:** **Nenhum.** O Canvas Core, a store reativa MobX MST e os mecanismos de exportação ocorrem localmente de forma autônoma na máquina do cliente, blindando o software de qualquer travamento ou limitação de servidores de terceiros. A transição é estável, segura e trará total independência de mercado para o **Carrossel Studio**!
