# Especificação Técnica: Arquitetura Definitiva V1 do Canvas Editor

Olá! Aqui é a **Alice**, atuando como sua **Arquiteta Principal**.

Abaixo apresento a especificação arquitetural definitiva para a **Versão 1 (V1) do Canvas Editor**, projetado como uma evolução direta e gradativa da página atualmente chamada **"Auto-Post"**. Este plano serve como o mapa de engenharia sênior que guiará todo o desenvolvimento subsequente, garantindo performance, modularidade e total ausência de acoplamentos rígidos.

---

## 1. Estrutura Completa de Pastas do Projeto

Para garantir que o editor cresça de forma escalável e limpa, utilizaremos uma organização modular baseada em responsabilidades claras sob a pasta `src/`:

```
src/
├── types/
│   └── editor.d.ts                 # Tipagens globais do Canvas (Project, Page, Element, etc.)
├── stores/
│   ├── useCanvasStore.js           # Store Zustand principal (Páginas, Elementos, Zoom, Fundo)
│   ├── useSelectionStore.js        # Store Zustand de seleção (IDs ativos, ferramentas de controle)
│   └── useHistoryStore.js          # Store Zustand/Middleware para controle de Undo/Redo (Snapshots)
├── hooks/
│   ├── useCanvasEvents.js          # Interceptador de atalhos de teclado (Ctrl+Z, Del, setas, etc.)
│   └── useKonvaTransformer.js      # Gerenciador dinâmico do nó Transformer do Konva
├── services/
│   ├── exportService.js            # Compilador e gerador de arquivos de imagem em alta definição
│   ├── templateParser.js           # Tradutor/Adaptador de templates legados JSX para JSON Canvas
│   └── serialization.js            # Mecanismo de importação/exportação estrutural (JSON)
├── components/
│   └── editor/                     # Subdiretório isolado para componentes React (Fases Futuras)
│       ├── sidebar/                # Painel esquerdo de ferramentas (Text, Shapes, Uploads)
│       ├── workspace/              # Área central (Konva Stage, Layers, Rulers)
│       ├── properties/             # Painel direito (Inspector contextual de propriedades)
│       └── shared/                 # Componentes genéricos compartilhados (color picker, sliders)
```

---

## 2. Módulos do Sistema e Responsabilidades

*   **Módulo de Estado (State Management)**: Gerencia a reatividade dos dados. Não possui lógica gráfica. É o cérebro que decide o que existe em cada slide.
*   **Módulo Gráfico (Graphics Engine)**: Responsável por interpretar a árvore de dados do Zustand e desenhar as formas 2D na tela via WebGL/Canvas 2D utilizando o wrapper `React-Konva`.
*   **Módulo de Interação (User Interactions)**: Orquestra eventos físicos de mouse/touch (arrasto, redimensionamento, rotação, multi-seleção e guias magnéticas).
*   **Módulo de Propriedades (Inspector)**: Interface rica que analisa o elemento em foco e exibe controles estritos para sua respectiva estilização.
*   **Módulo de Histórico (History Manager)**: Cria pontos de restauração sem impactar a memória do navegador, definindo regras estritas de transições de estado.
*   **Módulo de Portabilidade (Template Adapter)**: Camada de compilação encarregada de ler arquivos estruturais antigos e convertê-los nas novas coordenadas absolutas do Canvas.

---

## 3. Zustand Stores & Responsabilidades Estritas

Para maximizar o desempenho em tempo de execução (evitando gargalos de renderização total do DOM), dividiremos o estado em três stores Zustand desacopladas:

```
                  +-----------------------------------+
                  |           ZUSTAND STORES          |
                  +-----------------------------------+
                                    |
         +--------------------------+--------------------------+
         |                          |                          |
         v                          v                          v
+------------------+       +------------------+       +------------------+
|  useCanvasStore  |       |useSelectionStore |       |  useHistoryStore |
+------------------+       +------------------+       +------------------+
| - Pages (Slides) |       | - Selected IDs   |       | - Past Snapshots |
| - Elements Array |       | - Active Tool    |       | - Future Stack   |
| - Active Page ID |       | - Bounding Box   |       | - Undo() / Redo()|
| - Zoom Level     |       +------------------+       +------------------+
+------------------+
```

### A. `useCanvasStore` (Store Gráfica de Dados)
*   **Responsabilidade**: Manter a árvore estrutural do projeto.
*   **Campos de Estado**:
    *   `pages`: Array ordenado de slides.
    *   `activePageId`: ID da página em edição no momento.
    *   `zoom`: Multiplicador decimal de renderização (ex: `0.75` para 75%).
    *   `canvasBg`: Fundo padrão do projeto.
*   **Ações Core**:
    *   `addElement(pageId, element)` / `updateElement(pageId, elementId, updates)` / `deleteElement(pageId, elementId)`.
    *   `addPage(index?)` / `duplicatePage(pageId)` / `removePage(pageId)` / `reorderPages(indexA, indexB)`.

### B. `useSelectionStore` (Store de Interação)
*   **Responsabilidade**: Gerenciar o estado de focos, eixos e seleção ativa do usuário.
*   **Campos de Estado**:
    *   `selectedElementIds`: Coleção do tipo `Set<string>` contendo as IDs dos elementos sob foco (suporta multi-seleção nativamente).
    *   `activeTool`: Ferramenta selecionada no menu (ex: `'select'`, `'hand'`, `'text'`, `'shape'`).
*   **Ações Core**:
    *   `selectElement(elementId, isShiftPressed)`: Adiciona/remove IDs baseado em interações compostas.
    *   `clearSelection()`: Limpa todos os focos do canvas.
    *   `setActiveTool(toolType)`: Altera a ação do cursor físico.

### C. `useHistoryStore` (Pilha de Restauração)
*   **Responsabilidade**: Gerenciar a linha do tempo das ações do usuário.
*   **Campos de Estado**:
    *   `past`: Array de snapshots anteriores (pilha LIFO com limite estrito de 50 estados).
    *   `future`: Array de snapshots futuros para controle de Redo.
*   **Ações Core**:
    *   `saveSnapshot(pages)`: Registra um ponto de salvamento.
    *   `undo()` / `redo()` / `clearHistory()`.

---

## 4. Fluxo de Comunicação entre Módulos

O fluxo de dados segue uma via de mão única rígida (Unidirectional Data Flow):

```
[ Ação do Usuário ]
        |
        v
[ Interface / Canvas Event ] ---> Dispara ação no Zustand (CanvasStore / SelectionStore)
        |
        v
[ Zustand Store Atualizada ] ---> Emite alteração
        |
        +---> Re-renderiza nós no Canvas (React-Konva)
        |
        +---> Inspector atualiza controles de estilização (Properties Panel)
        |
        +---> Após término da ação (ex: DragEnd), salva snapshot no useHistoryStore
```

1.  **Inserção**: Usuário clica em "+ Texto" na Sidebar -> Dispara `addElement` na `useCanvasStore` -> Store atualiza -> Canvas adiciona o nó correspondente e o seleciona automaticamente.
2.  **Seleção**: Usuário clica no elemento no Canvas -> O evento disparado no Konva atualiza `selectedElementIds` no `useSelectionStore` -> O `Inspector` à direita identifica a alteração de ID, recupera as propriedades do elemento selecionado e redesenha o painel de propriedades específico daquele nó.
3.  **Edição**: Usuário altera o tamanho da fonte no Inspector -> Dispara `updateElement` na `useCanvasStore` -> Canvas redesenha o texto imediatamente -> Ao disparar `onBlur` ou soltar o controle deslizante, a store do histórico é notificada e gera um novo snapshot na pilha.

---

## 5. Tipagem e Esquemas de Dados Globais (V1)

```typescript
// Entidade principal que engloba o projeto ativo
export interface Project {
  id: string;
  name: string;
  width: number;             // Padrão: 1080
  height: number;            // Padrão: 1350 (4:5)
  pages: Page[];
}

// Representação de uma página/slide no carrossel
export interface Page {
  id: string;
  name: string;
  background: {
    type: 'color' | 'gradient' | 'image';
    color?: string;
    gradient?: {
      angle: number;
      stops: Array<{ offset: number; color: string }>;
    };
    imageUrl?: string;
  };
  elements: CanvasElement[];
}

// Tipo básico para qualquer objeto renderizado no Canvas
export interface BaseElement {
  id: string;
  name: string;
  type: 'text' | 'shape' | 'image';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;          // Em graus (0 a 360)
  scaleX: number;
  scaleY: number;
  opacity: number;           // Entre 0 e 1
  locked: boolean;
  zIndex: number;
}

// Elemento especializado em Texto
export interface TextElement extends BaseElement {
  type: 'text';
  textProps: {
    content: string;
    fontSize: number;
    fontFamily: string;
    color: string;
    fontWeight: 'normal' | 'bold' | '500' | '600' | '700' | '800';
    fontStyle: 'normal' | 'italic';
    textDecoration: 'none' | 'underline';
    align: 'left' | 'center' | 'right' | 'justify';
    lineHeight: number;
    letterSpacing: number;
  };
}

// Elemento especializado em Imagens
export interface ImageElement extends BaseElement {
  type: 'image';
  imageProps: {
    src: string;
    isAIGenerated: boolean;
    filters?: {
      blur?: number;
      brightness?: number;
      contrast?: number;
    };
    crop?: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  };
}

// Elemento especializado em Formas Geométricas
export interface ShapeElement extends BaseElement {
  type: 'shape';
  shapeProps: {
    type: 'rectangle' | 'circle' | 'line' | 'star';
    fill: string;
    stroke: string;
    strokeWidth: number;
    cornerRadius?: number;  // Exclusivo para retângulos
  };
}

// Tipo composto para unificação
export type CanvasElement = TextElement | ImageElement | ShapeElement;

// Camada representada na árvore de ordenação visual (Layers List)
export interface Layer {
  elementId: string;
  name: string;
  type: CanvasElement['type'];
  locked: boolean;
  visible: boolean;
}
```

---

## 6. Estratégia Avançada de Undo/Redo

Para evitar vazamentos de memória e sobrecarga de CPU por re-renderizações infinitas, a pilha de histórico usará a técnica de **Snapshots com Throttle (Debounce/Coalescing)**.

*   **Pilha Estrita**: Limitada a 50 itens. Ao alcançar 50, o item mais antigo da pilha `past` é descartado automaticamente.
*   **Snapshots Inteligentes (Evitando micro-mudanças)**:
    *   Durante a alteração de valores dinâmicos (ex: arrastar uma forma pela tela ou deslizar o controle de opacidade), o sistema **NÃO** salva snapshots.
    *   O salvamento é disparado estritamente no final de eventos compostos:
        *   `onDragEnd` e `onTransformEnd` (Konva).
        *   `onMouseUp` em controles deslizantes (Sliders) da interface de propriedades.
        *   `onBlur` em inputs numéricos ou de texto livre do Inspector.
*   **Clone Profundo Estruturado**: Utilização de `structuredClone(pages)` nativo para garantir integridade absoluta dos dados na restauração sem links por referência de ponteiros de memória de arrays no Javascript.

---

## 7. Estratégia de Serialização (Save/Load)

*   **Formato de Salvamento**: JSON nativo padronizado de acordo com o esquema da interface `Project`.
*   **Serialização**: Método puro `exportToJSON(project: Project)` que extrai o estado atualizado das stores e gera um arquivo com codificação UTF-8 simples.
*   **Desserialização e Validação**:
    *   Método `importFromJSON(jsonString: string)`.
    *   Antes de hidratar a store, um componente validador (JSON Schema Validator) varre as chaves obrigatórias. Se as propriedades essenciais estiverem ausentes ou corrompidas, a importação é rejeitada com fallback seguro e notificação amigável para o usuário.
*   **Arquivos de Mídia**: O JSON não armazena bytes binários de imagens. Imagens locais arrastadas são convertidas temporariamente em URLs locais pelo método `URL.createObjectURL(file)`, e substituídas por links CDN definitivos pós-upload no banco de dados.

---

## 8. Estratégia de Exportação de Imagens e PDF

Dada a restrição de que o Canvas do Konva renderizado na tela é redimensionado proporcionalmente pelo nível de zoom e tamanho do monitor do usuário, usaremos a estratégia do **Headless Compiler**:

1.  **Fidelidade Nominal**: A proporção é fixada (ex: **1080x1350px** para 4:5).
2.  **Renderizador Offscreen**:
    *   Ao disparar a exportação, o `exportService` monta um componente invisível `<Stage>` na memória (`document.createElement('div')`), configurado com a resolução UHD nativa final (ex: multiplicada por `2x` para gerar **2160x2700px**).
    *   Este Stage invisível é populado com os dados da página selecionada.
3.  **Compilação em Lote (Batch)**:
    *   O serviço itera sequencialmente sobre a lista de `pages`.
    *   Utiliza `stage.toDataURL({ type: 'image/png', pixelRatio: 2 })` para obter cada slide em alta definição e livre de borrões.
4.  **Embalamento de Arquivos**:
    *   As imagens PNG individuais são inseridas em uma pasta temporária do navegador.
    *   Compactadas em um arquivo `.zip` usando a biblioteca cliente `jszip` e oferecidas para download imediato.

---

## 9. Integração Futura das 300+ Variantes JSX Legadas

A compatibilidade com nossos mais de 300 designs existentes é o ponto crítico do projeto. Seguiremos um fluxo de **Renderização Híbrida Gradual**:

```
Fase 1: Mapeamento de Fundo Estático (Overlay Híbrido)
- O layout JSX original é renderizado em HTML puro no background do carrossel (DOM comum).
- O Canvas do Konva flutua por cima como uma camada transparente.
- O usuário adiciona novos elementos que se mesclam visualmente sobre o design estático.

Fase 2: Motor de Compilação Estática (JSX to JSON Parser)
- Escreveremos um script utilitário (`templateParser.js`) que analisa a estrutura da folha de estilos de cada componente JSX legado.
- Esse parser mapeia as caixas de texto com seus estilos associados e as imagens originais para objetos do tipo `CanvasElement`.
- O carrossel passa a rodar inteiramente no motor nativo 2D do Konva, liberando edição irrestrita de todos os textos do design legado.
```

---

## 10. Matriz de Mitigação de Riscos Técnicos V1

1.  **Lag de Renderização de Textos Dinâmicos**:
    *   *Risco*: A cada letra digitada pelo usuário, o redesenho constante da caixa de texto no Canvas pode causar pequenos atrasos.
    *   *Mitigação*: Durante a digitação, o nó do canvas é ocultado temporariamente e um elemento HTML comum `<textarea>` perfeitamente posicionado por cima gerencia a entrada. O nó do canvas é atualizado e exibido novamente apenas no `onBlur` do input de texto.
2.  **Carregamento e Latência de Fontes Google Fonts**:
    *   *Risco*: Exportar um canvas antes que a fonte estilizada esteja completamente carregada pelo navegador resulta na renderização da imagem final com fontes padrão sem estilização (fallback Arial/Sans-Serif).
    *   *Mitigação*: O motor de exportação aguardará o carregamento assíncrono do documento através da API nativa `document.fonts.load()` antes de renderizar os pixels e disparar o download.

---

Esta é a especificação arquitetural final para revisão, chefe. Com esta estrutura de dados e divisão de stores em Zustand, temos uma fundação impecável para iniciar o desenvolvimento do nosso novo Canvas Editor de forma robusta e otimizada! 🚀💎🎨
