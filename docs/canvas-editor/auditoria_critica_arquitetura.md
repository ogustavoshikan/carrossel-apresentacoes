# Auditoria Técnica e Crítica de Arquitetura: Canvas Editor V1

Olá! Aqui é a **Alice**, atuando como sua **Staff Engineer**.

Realizei uma análise extremamente rigorosa de todos os pontos definidos no documento de arquitetura (`arquitetura_v1_definitiva.md`) e no roadmap (`canvas_editor_v1_roadmap.md`). Sob a ótica de engenharia avançada (desenho técnico de ferramentas como Figma e Polotno), identifiquei **6 problemas arquiteturais críticos** que poderiam gerar graves retrabalhos, lentidões de renderização ou quebras de produção se não mitigados antes do início da implementação.

Abaixo, apresento a auditoria detalhada com o impacto de cada problema, sua gravidade e a respectiva solução proposta de nível sênior.

---

## 🗺️ Mapa de Problemas Detectados e Classificação

```
+-----------------------------------------------------------------------------------------+
|                                   MATRIZ DE GRAVIDADE                                   |
+-----------------------------------------------------------------------------------------+
| [Crescimento de Memória] -- Médio      | [Dessincronização de Textos] -- Grave          |
| [Engasgo de Drag & Drop] -- Crítico    | [Tainted Canvas (CORS Export)] -- Crítico     |
| [Vazamento de Stages]   -- Grave       | [Reconciliação do zIndex]    -- Recomendado    |
+-----------------------------------------------------------------------------------------+
```

---

## 🔍 Detalhamento Técnico das Inconsistências Arquiteturais

---

### 1. Gargalo de Performance: Re-renderização total do Stage do Konva em Mudanças de Estado
*   **O Problema**: Na especificação atual, o arraste de um elemento atualiza as propriedades `x` e `y` na store do Zustand a cada movimento do mouse. Como o `React-Konva` reage a atualizações de estado do React, isso causará re-renderizações totais da árvore virtual do Stage dezenas de vezes por segundo. Com slides complexos (mais de 15 elementos, imagens de alta resolução), isso gerará engasgos visíveis e quedas drásticas de FPS.
*   **Impacto**: Cursor travando, movimento arrastado e experiência de uso frustrante.
*   **Gravidade**: 🔴 **Crítico**
*   **Solução Proposta (Obrigatório antes do desenvolvimento)**:
    *   **Atualização Imperativa durante Interações (Ref-based Drag)**: Durante o arraste ativo (`onDrag` / `onTransform`), o elemento do Konva é atualizado diretamente na GPU via manipulação imperativa de referências do JavaScript (`nodeRef.current.x(newX)`).
    *   A store Zustand **NÃO** deve ser atualizada durante o movimento. A store do Zustand só será persistida de forma síncrona uma única vez no final da interação (no evento `onDragEnd` e `onTransformEnd`), garantindo uma performance suave a 60fps constantes.
*   **Classificação**: ⚠️ **Obrigatório antes do desenvolvimento**

---

### 2. Tainted Canvas: Erros de Segurança (CORS) na Exportação do Overlay Híbrido
*   **O Problema**: A estratégia de "Overlay Híbrido" (Fase 8) define que o template JSX legado roda embaixo, com o canvas de elementos do Konva sobreposto transparentemente. Ao exportar a imagem final, se o template de background carregar quaisquer imagens externas (ex: CDNs, imagens do Unsplash ou assets do usuário) sem cabeçalhos CORS explícitos e sem a propriedade `crossOrigin="anonymous"`, o navegador ativará a segurança de "tainted canvas". Isso bloqueará o método `toDataURL` do Stage, impedindo a geração de PNGs.
*   **Impacto**: O fluxo de exportação quebrará com um erro de segurança de Script no console, inviabilizando downloads.
*   **Gravidade**: 🔴 **Crítico**
*   **Solução Proposta (Obrigatório antes do desenvolvimento)**:
    *   Todas as imagens do template e do Canvas precisam passar obrigatoriamente por um helper de higienização que insere `crossOrigin = "anonymous"`.
    *   Para o overlay híbrido, utilizaremos um serviço de compilação gráfica via `modern-screenshot` ou `html2canvas` configurado explicitamente para aceitar cabeçalhos CORS e usar proxy de fallback para imagens sem suporte.
*   **Classificação**: ⚠️ **Obrigatório antes do desenvolvimento**

---

### 3. Dessincronização de Caixa de Texto (Font Loading Glitch)
*   **O Problema**: O cálculo de quebra de linhas automática (text wrapping) do Konva depende da medição física exata dos caracteres da fonte selecionada. Se renderizarmos um texto com uma Google Font antes que o arquivo `.woff2` esteja baixado e interpretado pelo navegador, o Konva calculará a caixa com a fonte padrão do sistema (Arial/Times). Quando a fonte estilizada carregar segundos depois, o Konva **não** recalculará o tamanho automaticamente, fazendo com que os textos fiquem estourados ou desalinhados.
*   **Impacto**: Slides renderizados com fontes erradas, textos sobrepondo imagens ou saindo borrados na exportação final.
*   **Gravidade**: 🟠 **Grave**
*   **Solução Proposta (Obrigatório antes do desenvolvimento)**:
    *   Não inicializar o nó de texto no canvas até que `document.fonts.load(fontSize + ' ' + fontFamily)` seja resolvido.
    *   Implementar um gatilho de re-observação de fontes: após a store carregar fontes sob demanda, forçar o comando de limpeza de cache físico do nó de texto do Konva (`textNode.destroyCache()`) e disparar o redesenho (`stage.batchDraw()`).
*   **Classificação**: ⚠️ **Obrigatório antes do desenvolvimento**

---

### 4. Sobrecarga de Estágios do Konva (Memory Leak no Multi-page)
*   **O Problema**: O Konva renderiza elementos dentro de um Stage, que cria múltiplos elementos `<canvas>` físicos no DOM. Se o usuário tiver um carrossel longo de 10 páginas e renderizarmos 10 Stages completos do Konva ao mesmo tempo em uma lista vertical, o consumo de RAM/GPU do navegador disparará, fazendo com que o app trave em celulares ou computadores antigos.
*   **Impacto**: Falha catastrófica de memória, travamento da aba do navegador e lentidão geral do app.
*   **Gravidade**: 🟠 **Grave**
*   **Solução Proposta (Obrigatório antes do desenvolvimento)**:
    *   **Stage Único Ativo + Viewport Caching**: Apenas **um** nó de Stage Konva central será montado fisicamente na viewport para edição ativa da página selecionada (`activePageId`).
    *   As miniaturas e trilhas de slides na barra inferior ou lateral serão renderizadas como imagens estáticas simples (Raster DataURLs), geradas silenciosamente e cacheadas apenas no momento em que o slide ativo é trocado, mantendo a árvore DOM extremamente leve.
*   **Classificação**: ⚠️ **Obrigatório antes do desenvolvimento**

---

### 5. Histórico Excessivo: Crescimento Indevido da Heap de Memória
*   **O Problema**: A utilização de `structuredClone` (Fase 6) para duplicar toda a estrutura tridimensional de páginas e elementos no Zustand a cada alteração finalizada gera cópias profundas em excesso na memória RAM. Em sessões longas com muitas páginas contendo grandes strings base64 de imagens ou blobs temporários, a memória do sistema inflará rapidamente.
*   **Impacto**: Perda progressiva de velocidade de processamento na aba até o travamento.
*   **Gravidade**: 🟡 **Recomendado**
*   **Solução Proposta (Pode esperar V2 se limitarmos estritamente no MVP)**:
    *   Para a V1 (MVP), implementaremos o clone profundo porém com um limitador estrito de **30 estados** no histórico, excluindo chaves pesadas como strings binárias de imagens brutas (que devem ser mantidas em referências globais de cache externo fora da store de histórico).
    *   Na V2, migraremos a pilha de snapshots para **JSON Patches delta** (salvando apenas a diferença/diff entre o estado A e B em vez de uma cópia total do projeto).
*   **Classificação**: 💡 **Recomendado para V1 / Pode esperar V2 se mitigado**

---

### 6. Dessincronização do zIndex no React-Konva
*   **O Problema**: No DOM convencional, o empilhamento é controlado via propriedade CSS `z-index`. No Konva, o empilhamento 2D é determinado estritamente pela **ordem dos nós** na árvore do Stage. Se controlarmos o zIndex apenas por uma propriedade numérica na store (`zIndex: number`), teremos que reordenar constantemente o array físico de elementos para que o React renderize as tags na ordem exata.
*   **Impacto**: Elementos de texto flutuando atrás de imagens de forma inconsistente ao alterar as ordens no Zustand.
*   **Gravidade**: 🟡 **Recomendado**
*   **Solução Proposta (Recomendado)**:
    *   Eliminar a propriedade numérica redundante `zIndex` de cada elemento na store.
    *   O zIndex será ditado **unicamente e exclusivamente** pelo índice físico e ordenação posicional do elemento dentro do array `elements` da página ativa. Mover uma camada para cima significa simplesmente trocar os elementos de posição no array (`arrayMove`), simplificando a lógica do Zustand e eliminando re-cálculos matemáticos.
*   **Classificação**: 💡 **Recomendado**

---

## 🎯 Conclusão da Auditoria de Engenharia Staff

Aprovando estas correções, evitamos que o projeto nasça com "vícios de arquitetura" que exigiriam re-arquiteturas completas na metade do ciclo de desenvolvimento. O editor nascerá com performance blindada a 60fps, sem vazamento de memória com estágios e seguro contra barreiras de segurança CORS na exportação.

Esta é a auditoria técnica crítica para a sua revisão final, chefe! 🚀💎🎨
