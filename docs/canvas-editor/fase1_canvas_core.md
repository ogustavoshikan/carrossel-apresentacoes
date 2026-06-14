# Planejamento Técnico: Fase 1 - Canvas Core

Olá! Aqui é a **Alice**, atuando como sua **Staff Graphics Engineer**.

Abaixo apresento a especificação técnica detalhada para a **Fase 1: Canvas Core**. Este documento define toda a árvore de componentes, o fluxo de renderização de alto desempenho e a matemática operacional por trás de interações fundamentais como Zoom, Pan, Multi-seleção e Snap Guides.

---

## 1. Estrutura de Componentes React & Konva

A interface gráfica do editor livre será organizada sob uma hierarquia rígida de componentes TypeScript (.tsx) para garantir desacoplamento e facilidade de manutenção:

```
[ CanvasEditorPage ] (Página evolucionada do Auto-Post)
 ├── [ SidebarPanel ] (Barra lateral esquerda de ferramentas)
 │    └── [ SidebarDrawer ] (Gaveta de opções: Shapes, Text, etc.)
 ├── [ Workspace ] (Container central com barra de rolagem e eixos)
 │    ├── [ RulersLayer ] (Réguas de medição de pixel horizontais/verticais)
 │    └── [ StageContainer ] (Controlador responsivo de escala e viewport)
 │         └── <Stage> (React-Konva)
 │              ├── <Layer id="background-layer"> (Fundo do slide)
 │              ├── <Layer id="canvas-layer">
 │              │    ├── [ CanvasElementsLoop ] (Loop de renderização de nós)
 │              │    │    ├── <Text> (Para TextElement)
 │              │    │    ├── <Rect> / <Circle> (Para ShapeElement)
 │              │    │    └── <Image> (Para ImageElement)
 │              │    └── [ SelectionTransformer ] (Nó de âncoras Transformer)
 │              └── <Layer id="guides-layer">
 │                   └── [ GuidesLayer ] (Linhas guias magnéticas de colisão)
 └── [ PropertiesPanel ] (Inspector de ajustes contextuais à direita)
```

### Detalhamento das Responsabilidades dos Componentes:
*   **`CanvasEditorPage`**: O frame principal. Gerencia o layout em colunas (Sidebar, Workspace, Inspector) e escuta eventos de atalhos globais de teclado via `useCanvasEvents.ts`.
*   **`Workspace`**: O frame de contenção da área central. Gerencia as dimensões do viewport e abriga as réguas laterais.
*   **`StageContainer`**: Controla os multiplicadores de escala (zoom) e deslocamento (pan) aplicando estilos CSS de transformação 3D para manter o palco centrado e otimizado via hardware.
*   **`CanvasLayer`**: A camada principal do Konva. Realiza o mapeamento direto das entidades contidas no array `elements` da página ativa.
*   **`SelectionTransformer`**: Wrapper do nó `<Transformer>` do Konva. Monitora as referências ativas dos nós selecionados para desenhar a caixa delimitadora de ajuste de escala e rotação.
*   **`GuidesLayer`**: Camada transparente superior dedicada estritamente a desenhar linhas pontilhadas de colisão (`<Line>`) durante ações de snapping.
*   **`RulersLayer`**: Componente HTML leve que renderiza réguas graduadas com base no zoom e deslocamento atuais do Stage.

---

## 2. Fluxo de Renderização: Declarativo vs. Imperativo

Em editores gráficos interativos, misturar renderização declarativa pura do React com loops rápidos de mouse gera atrasos (lags) intoleráveis. Por isso, adotamos uma **arquitetura híbrida de renderização**:

```
[ Ação Contínua: Arraste de Elemento ]
        |
        +---> Fluxo Imperativo (Ref-based - 60fps constantes)
        |     - Konva atualiza o elemento via manipulação direta de Refs: node.x(), node.y()
        |     - Zustand NÃO é atualizado a cada pixel de movimento
        |     - React NÃO re-renderiza o DOM ou outros elementos
        |
[ Ação Concluída: MouseUp / DragEnd ]
        |
        +---> Fluxo Declarativo (Zustand Sync - Consistência de Dados)
              - CanvasStore recebe coordenadas finais: updateElement(id, { x, y })
              - O estado é persistido
              - useHistoryStore captura snapshot
```

### O que será DECLARATIVO:
*   Criação e remoção de elementos (adicionar nó de texto, deletar forma).
*   Propriedades estéticas de preenchimento (cor do texto, fontes, opacidade, raio de borda, travas).
*   Ordem de empilhamento física do array de páginas e elementos (zIndex).
*   Configurações globais (Zoom nominal, cor de fundo do slide, abas de UI).

### O que será IMPERATIVO (via Refs):
*   Coordenadas de translação (`x`, `y`) durante o arrasto contínuo do mouse.
*   Valores de redimensionamento e rotação (`scaleX`, `scaleY`, `rotation`) durante a manipulação ativa das alças do `Transformer`.
*   Deslocamento de palco (Pan) durante a navegação com barra de espaço.

---

## 3. Matemática e Fluxo de Operações do Core

### A. Fluxo de Seleção e Multi-Selection
*   **Click Simples**: Dispara `onClick`/`onTap` no nó gráfico do Konva -> Atualiza `selectedElementIds` com uma única ID no Zustand.
*   **Shift + Click**: Verifica se a ID clicada já existe no `Set` de seleção. Se sim, remove; se não, adiciona a ID ao conjunto mantendo as anteriores.
*   **Box Selection (Drag-Select)**:
    1.  Ao clicar e arrastar em uma área vazia, o Stage captura as coordenadas de início (`x1`, `y1`) e atuais (`x2`, `y2`).
    2.  Desenha-se um retângulo delimitador pontilhado na tela.
    3.  A cada tick do mouse, o sistema calcula a colisão por intersecção retangular simples (AABB):
        ```typescript
        const elementRect = elementNode.getClientRect();
        const selectionRect = {
          x: Math.min(x1, x2),
          y: Math.min(y1, y2),
          width: Math.abs(x1 - x2),
          height: Math.abs(y1 - y2)
        };
        
        // Verifica se há sobreposição geométrica
        const isIntersecting = !(
          elementRect.x > selectionRect.x + selectionRect.width ||
          elementRect.x + elementRect.width < selectionRect.x ||
          elementRect.y > selectionRect.y + selectionRect.height ||
          elementRect.y + elementRect.height < selectionRect.y
        );
        ```
    4.  Ao soltar o mouse, todos os elementos que colidiram são injetados de uma só vez em `selectedElementIds`.

### B. Fluxo de Zoom Otimizado
*   **Zoom por Botão (Presets)**: Multiplica o zoom nominal por escalas fixas.
*   **Fit to Screen (Ajuste à Tela)**:
    *   Calcula a largura da área visível da tela (`containerWidth`, `containerHeight`).
    *   Mapeia o tamanho real do slide (**1080x1350px**).
    *   Define a escala ideal com margem de segurança (respiro de 40px):
        ```typescript
        const scaleX = (containerWidth - 80) / 1080;
        const scaleY = (containerHeight - 80) / 1350;
        const fitScale = Math.min(scaleX, scaleY);
        setZoom(fitScale);
        ```
*   **Ctrl + Mouse Wheel Zoom (Foco no Cursor)**:
    *   Para garantir que o zoom amplie exatamente onde o mouse está posicionado (como no Figma), recalculamos a posição `(x, y)` do Stage em relação à coordenada do cursor do mouse `(pointerX, pointerY)` no momento do scroll, aplicando a diferença de escala.

### C. Fluxo de Pan (Navegação)
*   **Atalho Space + Drag**:
    *   O hook `useCanvasEvents.ts` escuta a tecla `Space` pressionada -> Atualiza o cursor para `grab` via `useUIStore`.
    *   Ao arrastar o mouse pressionado, move-se imperativamente o Stage atualizando `stage.x()` e `stage.y()` com base no deslocamento (`dx`, `dy`).

### D. Snap Guides (Guias Magnéticas)
Durante o arrasto do nó ativo, mapeamos suas coordenadas contra as bordas do Canvas (**1080x1350px**):

```
+---------------------- 1080px ----------------------+
|  [ Margem Superior Snap: 40px ]                    |
|                                                    |
|            |                                       |
|  - - - - - o - - - - -   [ Linha Horizontal 50% ]  |
|            |                                       |
|                                                    |
|  [ Margem Inferior Snap: 1310px ]                  |
+----------------------------------------------------+
             |
   [ Linha Vertical 50% ]
```

*   **Matemática de Colisão**:
    *   Centro Horizontal do Slide: `540px`
    *   Centro Vertical do Slide: `675px`
    *   Margens de Segurança: `40px` (Esquerda/Topo) e `1040px`/`1310px` (Direita/Base).
    *   Se o elemento arrastado chegar a uma distância inferior a **5px** de qualquer uma dessas linhas (limiar de atração), ele "trava" no valor exato do snap e uma linha pontilhada vermelha é renderizada no `GuidesLayer`. O elemento se solta do snap somente quando o deslocamento do mouse do usuário ultrapassa o limiar de atração de 5px.

---

## 4. Estratégia de Performance (Garantindo 60fps)

1.  **`transformsEnabled: "position"`**:
    *   Forçamos o Konva a calcular apenas posições absolutas nos nós de elementos (`Rect`, `Text`, etc.), desativando transformações complexas de matrizes do canvas 2D quando não aplicáveis.
2.  **Cache de Imagens**:
    *   Os nós de `<Image>` serão cacheados em memória assim que carregados. Qualquer filtro de opacidade, brilho ou contraste será aplicado sobre o cache em vez de re-compilar a imagem original a cada quadro de movimentação.
3.  **Desativação de Snaps Complexos na V1**:
    *   Garantimos snaps rápidos de página. Snaps relativos entre múltiplos nós (que exigiriam iterações exponenciais complexas baseadas na distância de todos os nós presentes na tela a cada pixel movido) ficam reservados para a V2.

---

Esta é a especificação técnica para a **Fase 1: Canvas Core**, chefe! Com estas diretrizes matemáticas e fluxo de renderização imperativa via Refs, temos o mapa completo para criar um motor visual profissional, performático e robusto. 🚀💎🎨
