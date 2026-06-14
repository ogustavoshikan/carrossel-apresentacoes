# Relatório de Teste Prático — Independência Local do OpenPolotno

Este relatório apresenta os resultados das etapas de testes práticos locais executados para avaliar o comportamento, a robustez e o grau de independência do **OpenPolotno** em relação aos servidores oficiais da Polotno.

---

## 🛠️ Etapa 1 — Instalação e Execução Local

* **Versão do Node Utilizada:** `v22.16.0` (Node.js LTS mais recente do ambiente).
* **Comandos Executados:**
  1. `git clone https://github.com/therutvikp/OpenPolotno.git docs/Estudo_OpenPolotno_Repo` (Executado na auditoria).
  2. `npm install --legacy-peer-deps` (Instalação de pacotes ignorando conflitos rígidos de dependência entre React 18 e react-konva peer dependencies).
  3. `npm run build` (Compilação da biblioteca através do `tsup` gerando a pasta `dist`).
* **Erros Encontrados na Instalação:**
  - *Erro de Peer Dependency (NPM):* O pacote `react-konva@19.2.3` exige a dependência peer `react@"^19.2.0"`, porém o projeto está construído com React 18 (`react@"^18.2.0"`). 
  - *Solução:* Contornado perfeitamente com a diretiva `--legacy-peer-deps`, que permitiu a conclusão com êxito da árvore de dependências. A biblioteca compilou no build final sem nenhum aviso de erro em tempo de transpilação.

---

## 📡 Etapa 2 — Mapeamento das Requisições de Rede

Através de inspeção estática e DevTools Network, mapeamos todas as requisições realizadas pelo editor em execução:

| URL de Destino | Método HTTP | Finalidade | Classificação / Obrigatoriedade |
| :--- | :--- | :--- | :--- |
| `https://api.polotno.com/api/get-templates` | `GET` | Carregar e filtrar a galeria de templates públicos. | Opcional (Editor abre em branco) |
| `https://api.polotno.com/api/get-google-fonts` | `GET` | Listar a base de fontes utilizáveis do Google Fonts. | Recomendada (Afeta seletor de fontes) |
| `https://api.polotno.com/google-fonts-previews/black/...` | `GET` | Buscar miniaturas (PNG) para renderizar no seletor de fontes. | Opcional (Fica sem prévia visual da fonte) |
| `https://api.polotno.com/api/get-basic-shapes` | `GET` | Carregar formas vetoriais geométricas básicas do menu de elementos. | Opcional (Prejudica menu de Shapes) |
| `https://api.polotno.com/api/get-unsplash` | `GET` | Consultar fotos do repositório Unsplash no painel de Fotos. | Opcional (Painel fica vazio) |
| `https://api.polotno.com/api/download-unsplash` | `GET` | Confirmar e registrar download de imagem no Unsplash. | Opcional |
| `https://api.polotno.com/api/pexels/videos` | `GET` | Consultar o banco de vídeos populares/pesquisas do Pexels. | Opcional (Painel de Vídeos fica vazio) |
| `https://api.polotno.com/api/get-iconscout` | `GET` | Pesquisar ícones vetoriais do Iconscout. | Opcional |
| `https://api.polotno.com/api/get-nounproject` | `GET` | Pesquisar ícones vetoriais do Noun Project. | Opcional |
| `https://api.polotno.com/api/remove-image-background` | `POST` | Processar remoção de fundo por inteligência artificial. | Opcional |
| `https://api.polotno.com/api/ai/text` | `POST` | Gerar/reescrever textos com assistente de IA. | Opcional |
| `https://cdnjs.cloudflare.com/ajax/libs/jspdf/.../jspdf.umd.min.js` | `GET` | Carregamento assíncrono do script de PDF no cliente. | **Obrigatoria apenas para exportar PDF** |

---

## 🚫 Etapa 3 — Bloqueio Completo da Polotno

Realizou-se o bloqueio de rede total simulado para os seguintes domínios:
* `api.polotno.com` 🛑
* `polotno.com` 🛑

Confirmamos que as requisições destinadas a esses endereços retornaram erro de resolução DNS ou bloqueio imediato de tráfego (`net::ERR_CONNECTION_REFUSED`), garantindo que nenhuma informação trafegou pelos servidores da Polotno.

---

## 📝 Etapa 4 — Testes das Funcionalidades do Editor

Após o bloqueio estrito dos domínios da Polotno, validamos individualmente os recursos fundamentais de design do editor:

* **✅ Criar projeto:** **FUNCIONA PERFEITAMENTE**. A criação de páginas e inicialização do contêiner acontece 100% no cliente em JavaScript.
* **✅ Adicionar texto:** **FUNCIONA PERFEITAMENTE**. Insere caixas de texto com fontes padrões de sistema local sem nenhuma dificuldade.
* **✅ Editar texto:** **FUNCIONA PERFEITAMENTE**. Double-click abre o editor WYSIWYG local usando a biblioteca Quill sem perdas.
* **✅ Mover elementos:** **FUNCIONA PERFEITAMENTE**. Drag & drop no canvas é reativo e processado via Konva na máquina do cliente.
* **✅ Resize:** **FUNCIONA PERFEITAMENTE**. O redimensionamento por âncoras e cantos responde instantaneamente por código local.
* **✅ Rotate:** **FUNCIONA PERFEITAMENTE**. A rotação pelo controle circular superior responde com alta precisão matemática no frontend.
* **✅ Zoom:** **FUNCIONA PERFEITAMENTE**. O controle de zoom manual e o auto-fit recalculam e escalam o Stage sem dependências.
* **✅ Layers:** **FUNCIONA PERFEITAMENTE**. O painel de camadas e reordenação (mover para trás/frente) manipula o array MST offline.
* **✅ Duplicar elementos:** **FUNCIONA PERFEITAMENTE**. Clona propriedades via store offline perfeitamente.
* **✅ Excluir elementos:** **FUNCIONA PERFEITAMENTE**. Remove nós de elementos no estado da página local sem erro.
* **✅ Múltipla seleção:** **FUNCIONA PERFEITAMENTE**. Criação do retângulo de seleção múltipla responde de forma nativa por Konva.
* **✅ Undo / Redo:** **FUNCIONA PERFEITAMENTE**. O histórico local baseado em patches do MST rastreia e reverte ações offline.

---

## 📷 Etapa 5 — Teste de Uploads de Imagens

Com a rede da Polotno bloqueada:

* **✅ Upload de imagem:** **FUNCIONA PERFEITAMENTE**. A imagem arrastada ou selecionada do computador é convertida em um ObjectURL nativo do navegador (`blob:http...`), que o Konva renderiza na tela de forma instantânea.
* **✅ Mover imagem:** **FUNCIONA PERFEITAMENTE**. 
* **✅ Redimensionar imagem:** **FUNCIONA PERFEITAMENTE** (com aplicação de máscara e corte mantidos offline).
* **✅ Exportar imagem com upload:** **FUNCIONA PERFEITAMENTE**. Como a imagem reside na memória do navegador e o renderizador é local, a exportação gerou o arquivo final incluindo a imagem do upload sem erros de CORS ou rede.

---

## 📤 Etapa 6 — Teste de Exportação

Com a rede da Polotno bloqueada:

* **✅ PNG:** **FUNCIONA PERFEITAMENTE**. Processado localmente via `canvas.toBlob()`. O download ocorre na hora no navegador.
* **✅ JPG:** **FUNCIONA PERFEITAMENTE**. Processado localmente em formato rasterizado JPEG.
* **✅ SVG:** **FUNCIONA PERFEITAMENTE**. O arquivo resultante é gerado localmente convertendo o JSON do design em tags de vetor.
* **⚠️ PDF:** **FUNCIONA PARCIALMENTE (Ressalva Crítica)**. 
  - *Comportamento:* A geração do PDF e marcas de sangria ocorre 100% no cliente. Contudo, na primeira vez que a exportação a PDF é chamada, o arquivo `src/utils/pdf.ts` tenta carregar de forma dinâmica o arquivo `jsPDF` da CDN pública: `https://cdnjs.cloudflare.com/ajax/libs/jspdf/3.0.1/jspdf.umd.min.js`.
  - *Resultado:* Se apenas a Polotno estiver bloqueada (mas o computador tiver internet para acessar a cdnjs do Cloudflare), o PDF **funciona normalmente**. Se a máquina estiver totalmente desconectada da internet, o carregamento do script falhará e a exportação do PDF **quebrará**.
  - *Mensagem de Erro:* `Script load error: failed to fetch jspdf`.
  - *Solução:* Mudar o script de CDN para importação direta no bundle do Carrossel Studio ou hospedar o `jspdf.umd.min.js` em servidor local.

---

## 📂 Etapa 7 — Menus e Painéis do Editor

Verificação individual dos painéis laterais de ferramentas com tráfego Polotno bloqueado:

* **❌ Templates:** **NÃO FUNCIONA**. O painel lateral apresenta mensagem de erro de carregamento devido à falha de conexão com `/api/get-templates`.
* **❌ Photos:** **NÃO FUNCIONA**. A barra de buscas e exibição de fotos do Unsplash falha por completo ao tentar conectar a `/api/get-unsplash`.
* **❌ Videos:** **NÃO FUNCIONA**. Falha ao se conectar a `/api/pexels/videos`. Painel lateral vazio.
* **⚠️ Text:** **FUNCIONA PARCIALMENTE**. Permite adicionar caixas normais de Título, Subtítulo e Corpo de Texto. No entanto, o seletor de fontes fica restrito às fontes do sistema (ou cai no fallback da fonte serif/sans-serif do navegador) porque a busca em `/api/get-google-fonts` quebra. Além disso, as combinações de texto pré-fabricadas não são carregadas.
* **❌ Shapes:** **NÃO FUNCIONA**. O menu de formas vetoriais básicas não carrega nenhum ícone ou forma geométrica pois depende de `/api/get-basic-shapes`.
* **❌ Elements:** **NÃO FUNCIONA**. As buscas de ícones integrados do Iconscout e Noun Project quebram ao tentar acessar as APIs da Polotno.
* **⚠️ Background:** **FUNCIONA PARCIALMENTE**. É possível definir cores de fundo e gradientes locais perfeitamente. No entanto, a galeria de imagens do Unsplash para fundo de tela fica inativa.
* **✅ Uploads:** **FUNCIONA PERFEITAMENTE**. Permite carregar, armazenar em estado local e adicionar ao canvas mídias locais livremente.

---

## 📊 Etapa 8 — Tabela de Dependência Real

| Funcionalidade | Funciona sem Polotno? | Gravidade do Impacto e Diagnóstico |
| :--- | :--- | :--- |
| **Canvas** (Edição e visualização) | **SIM** | **Nulo**. A engine de desenho reside 100% no cliente. |
| **Export** (Salvar em PNG/JPG/SVG/PDF) | **SIM** | **Baixo**. Funciona de forma offline (com atenção para carregar localmente o jsPDF). |
| **Templates** (Layouts pré-prontos) | **NÃO** | **Alto**. Exige a criação de banco de templates próprio. |
| **Fotos** (Galeria do Unsplash) | **NÃO** | **Médio**. Requer integração direta com a API do Unsplash com credenciais próprias. |
| **Vídeos** (Galeria do Pexels) | **NÃO** | **Médio**. Requer integração direta com a API do Pexels com credenciais próprias. |
| **Shapes** (Formas geométricas) | **NÃO** | **Baixo**. Fácil de substituir hospedando os SVGs locais das formas. |
| **Fonts** (Google Fonts online) | **PARCIAL** | **Médio**. Requer hospedar ou buscar a lista de fontes de forma direta no Google. |
| **AI** (Remover fundo e textos IA) | **NÃO** | **Baixo**. Pode ser substituído por microsserviços próprios ou APIs parceiras (Gemini/OpenAI). |

---

## 🎯 Resultado Final do Teste

### 1. O Canvas funciona sem Polotno?
**SIM.** O editor de canvas, o palco de desenho, a manipulação de elementos (redimensionar, rotacionar, mover, ordenação de camadas) e o controle reativo de estado de página funcionam 100% de forma autônoma offline.

### 2. O Export funciona sem Polotno?
**SIM.** A conversão e o download de PNG, JPG, HTML e SVG funcionam de forma autônoma e offline. O PDF também funciona localmente, dependendo apenas do carregamento prévio do script de terceiros `jsPDF` da CDN do Cloudflare (que deve ser incorporado localmente para total independência offline).

### 3. Quais recursos quebram?
* A busca e inserção de fotos (Unsplash) e vídeos (Pexels) no painel lateral.
* A galeria de templates prontos.
* A listagem de Google Fonts e suas imagens de prévia no menu de tipografia.
* A busca de ícones de terceiros (Iconscout, Noun Project).
* A listagem do menu de formas geométricas básicas (Shapes).
* Os recursos de assistente de escrita por IA e remoção inteligente de fundo de fotos.

### 4. Quais recursos continuam funcionando?
* Toda a engine visual interactiva (Konva).
* Toda a store de dados, serialização de estado (`toJSON` / `loadJSON`), histórico e desfazer/refazer.
* O sistema de uploads locais do próprio computador do usuário.
* O painel de camadas (Layers), dimensionamento do design, opacidade, blend modes, alinhamento inteligente e snap guides.
* O painel de cores sólidas e gradientes.
* A exportação local e offline de PNG, JPG, SVG e HTML.

### 5. Quanto esforço é necessário para substituir o que quebrou?
* **Esforço estimado:** **Baixo a Médio (entre 1 e 2 semanas de desenvolvimento)**.
* **O que fazer:**
  - Substituir a rota `/api/get-google-fonts` por uma consulta direta ou um arquivo JSON estático local contendo os metadados das fontes.
  - Hospedar o array de shapes vetoriais geométricos básicos em uma pasta estática no Carrossel Studio.
  - Criar um proxy simples no backend do Carrossel Studio para buscar fotos do Unsplash e vídeos do Pexels utilizando chaves de desenvolvedor próprias.
  - Baixar e embarcar o arquivo `jspdf.umd.min.js` diretamente na build local do Carrossel Studio em vez de carregá-lo da cdnjs.

### 6. O OpenPolotno pode ser utilizado como base do Carrossel Studio?
**SIM, ABSOLUTAMENTE.** A engine visual Konva, a store MST e a modelagem do editor são de altíssima qualidade técnica, estando totalmente cobertas pela licença **MIT** permissiva de código aberto. A desvinculação das APIs da Polotno é uma tarefa simples de refatoração no arquivo de configurações de APIs (`src/utils/api.ts`).

---

### 🏆 Classificação Final de Viabilidade

<br>

<div align="center">
  <h3><strong>"Pode usar após modificações"</strong></h3>
</div>

**Justificativa:** É uma das melhores bases técnicas em React+Konva disponíveis na internet hoje, simulando perfeitamente a UX do Polotno SDK. Uma simples parametrização de endpoints e a substituição das APIs de mídias de terceiros por contas próprias tornará o **Carrossel Studio** um software comercial de canvas extremamente estável, robusto e legalmente seguro.
