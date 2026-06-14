# Relatório Técnico: Arquitetura do Canvas Editor Profissional

Olá! Aqui é a **Alice**, atuando como sua **Arquiteta Principal**.

Abaixo apresento a análise arquitetural profunda das referências (**Polotno Studio** e **IMG.LY CreativeEditor SDK**), desenhando a arquitetura ideal de especificação para o nosso novo **Canvas Editor**, integrado nativamente ao **Carrossel Studio** com nossa stack definida: **React, React-Konva, Zustand, Tailwind e Framer Motion**.

---

## 1. Visão Geral & Escopo do MVP

O objetivo não é recriar o Canva por completo, mas construir um **motor de design profissional focado em carrosséis**, capaz de carregar e manipular nossos mais de 300 templates existentes, permitindo que o usuário customize elementos, adicione novas camadas (formas, textos, imagens livres), duplique páginas e exporte tudo em alta resolução.

```
+-----------------------------------------------------------------------------------+
|                                  CARROSSEL STUDIO                                 |
+-----------------------------------------------------------------------------------+
|                                  [ ZUSTAND STORE ]                                |
|   +-------------------+  +---------------------+  +---------------------------+   |
|   |   Páginas/Slides  |  | Elementos/Camadas   |  | Histórico (Undo / Redo)   |   |
|   +-------------------+  +---------------------+  +---------------------------+   |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                                   WORKSPACE UI                                    |
|   +-----------------------+ +--------------------+ +--------------------------+   |
|   | Menu Lateral (Tabs)   | | Canvas (Stage)     | | Painel de Propriedades   |   |
|   |  - Templates          | |  - React-Konva     | |  - Tipo: Texto           |   |
|   |  - Elementos (Formas) | |  - Transformer     | |  - Tipo: Forma           |   |
|   |  - Texto / Uploads    | |  - Framer Motion   | |  - Tipo: Fundo           |   |
|   +-----------------------+ +--------------------+ +--------------------------+   |
+-----------------------------------------------------------------------------------+
```

---

## 2. Análise Comparativa de Referências

### Polotno Studio
* **Core Tecnológico**: React + MobX + `react-konva`.
* **Filosofia de Design**: Minimalista, focado em facilidade de uso direta. Cada elemento do canvas (texto, imagem, forma) é mapeado como um nó reativo MobX.
* **Pontos Fortes**: A renderização via Konva permite manipulação nativa de vetores, manipulação matemática e exportação de altíssima fidelidade sem gargalos de reconciliação no DOM. O uso de `Transformer` do Konva para redimensionamento e rotação é impecável.
* **Pontos Fracos**: Acoplamento forte com MobX. O ecossistema de templates do Polotno é proprietário e difícil de customizar além do escopo básico.

### IMG.LY CreativeEditor SDK (CE.SDK)
* **Core Tecnológico**: Engine nativa (escrita em C++/WebAssembly para alto desempenho gráfico) com wrapper em React.
* **Filosofia de Design**: Abstração total baseada no conceito de **"Blocks"** (árvore de nós hierárquica). Todo objeto visual (shapes, text, pages, layouts) é um bloco genérico com propriedades estritas.
* **Pontos Fortes**: Separação completa da interface visual (UI) do motor de renderização gráfica. Modularidade incrível baseada em plugins que interceptam ações (Events e Hooks).
* **Pontos Fracos**: Complexidade gigantesca para customizações leves, custo de licenciamento proibitivo e dificuldade para integrar layouts customizados em JSX que não foram estruturados na árvore proprietária deles.

### O Padrão Ouro para o Nosso App:
Seguiremos a **simplicidade arquitetural do Polotno** (utilizando canvas nativo via `React-Konva` e abstração de seleção com `Transformer`), acoplado à **estética premium de propriedades contextuais e design system modular do IMG.LY**, orquestrado de forma leve pelo **Zustand** e animado pelo **Framer Motion**.

---

## 3. Arquitetura de Estado (Zustand)

O Zustand controlará de forma centralizada o estado síncrono do canvas. Em editores visuais, o estado precisa ser altamente otimizado para evitar re-renderizações desnecessárias.

### Estrutura do Estado (JSON Schema):
```typescript
interface CanvasElement {
  id: string;
  type: 'text' | 'shape' | 'image';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  opacity: number;
  locked: boolean;
  zIndex: number;
  
  // Propriedades específicas de Texto
  textProps?: {
    content: string;
    fontSize: number;
    fontFamily: string;
    color: string;
    fontWeight: string;
    fontStyle: string;
    align: 'left' | 'center' | 'right';
  };

  // Propriedades específicas de Forma
  shapeProps?: {
    type: 'rectangle' | 'circle' | 'line';
    fill: string;
    stroke: string;
    strokeWidth: number;
    cornerRadius?: number;
  };

  // Propriedades específicas de Imagem
  imageProps?: {
    src: string;
    crop?: { x: number; y: number; width: number; height: number };
  };
}

interface CanvasPage {
  id: string;
  background: {
    type: 'color' | 'gradient' | 'image';
    value: string;
  };
  elements: CanvasElement[];
}

interface CanvasStore {
  pages: CanvasPage[];
  activePageId: string;
  selectedElementId: string | null;
  zoom: number;
  
  // Ações de Página
  addPage: () => void;
  removePage: (id: string) => void;
  duplicatePage: (id: string) => void;
  reorderPages: (activeId: string, overId: string) => void;

  // Ações de Elemento
  addElement: (element: Omit<CanvasElement, 'id' | 'zIndex'>) => void;
  updateElement: (id: string, updates: Partial<CanvasElement>) => void;
  deleteElement: (id: string) => void;
  
  // Ações Globais
  setSelectedElementId: (id: string | null) => void;
  setZoom: (zoom: number) => void;
}
```

> [!TIP]
> **Por que Zustand em vez de Context API ou Redux?**
> A renderização no Canvas do React-Konva durante o arrasto ou rotação dispara centenas de atualizações por segundo. A Context API causaria renderização total do DOM do React em toda a aplicação. O Zustand nos permite ler frações específicas do estado (com seletores `useStore(state => state.selectedElementId)`) e atualizar o canvas de forma isolada, gerando performance de 60fps.

---

## 4. Organização do Editor e Painéis (UX/UI com Tailwind & Framer Motion)

A interface será dividida em zonas de foco, inspirada na ergonomia do Polotno e na estética sofisticada (dark glassmorphism) do IMG.LY:

1. **Barra Lateral Fina (Toolbox Menu)**: 
   Fundo `#000000`/`#050505` estável com ícones minimalistas. Ao clicar em um ícone (ex: Texto), dispara a expansão de uma gaveta flutuante.
2. **Gaveta de Opções (Drawer Panel) via Framer Motion**:
   Uma prateleira lateral que desliza suavemente (`animate={{ width: 280, opacity: 1 }}`) para frente ou para trás, contendo os elementos específicos que podem ser arrastados para o canvas (lista de formas, blocos de texto estilizados, galeria de imagens).
3. **Área de Visualização Central (Workspace Stage)**:
   * Fundo escuro com uma grade de pontos sutil.
   * O `Stage` do `react-konva` centralizado, redimensionável de acordo com o nível de zoom.
   * Suporte a navegação por páginas verticais (empilhadas) ou horizontais (foco em slide único com setas).
4. **Painel de Controle Flutuante (Toolbar Contextual)**:
   Uma barra de propriedades elegante, posicionada acima do Canvas ou na lateral direita. Ela aparece de forma fluida quando um elemento é selecionado e exibe as ferramentas de formatação exatas daquele tipo de elemento.

---

## 5. Sistemas Fundamentais do Canvas

### A. Sistema de Páginas (Multi-slide)
Diferente de um editor de peça única, o nosso core é focado em **Carrosséis sequenciais (slides)**.
* Cada slide no array de `pages` possui dimensões estritas de renderização de **1080x1350px (proporção 4:5)** ou **1080x1080px (1:1)**.
* O Canvas central exibirá a página ativa. Uma trilha de miniaturas (thumbnails) na parte inferior ou lateral permite a rápida navegação, reordenação (drag & drop de slides) e duplicação rápida.

### B. Sistema de Elementos e Layers
* **Agrupamento lógico**: Como o Canvas do Konva utiliza renderização indexada, a ordem física no array `elements` dita a ordem visual de empilhamento (Z-Index).
* **Z-Index**: Ações rápidas de "Trazer para a Frente" (`push` do elemento para o final do array) ou "Enviar para Trás" (`unshift` para o início do array).
* **Foco e Redimensionamento (`Transformer` do Konva)**:
  * Um único nó `<Transformer>` dinâmico na árvore do `React-Konva` se anexará ao elemento selecionado (`selectedElementId`).
  * Ele gerencia os handles visuais de rotação, escala e distorção. As alterações matemáticas de arrasto e transformação do Transformer atualizam diretamente as propriedades de posição do Zustand no evento `onDragEnd` e `onTransformEnd`.

### C. Motor de Histórico (Undo/Redo)
Um editor profissional exige controle completo de histórico de edições. Implementaremos um padrão de **snapshots** utilizando o conceito de pilha dupla (Stack).
* **Como funciona**: Uma pilha contendo os estados passados (`past`) e futuros (`future`).
* **Zustand Middleware**: Podemos criar ou utilizar o middleware de histórico para salvar cópias profundas da lista de `pages` a cada alteração finalizada (por exemplo, no término de um arrasto `onDragEnd`, e não *durante* o arrasto, para evitar estouro de memória).

### D. Exportação de Alta Fidelidade (Export)
* O Konva possui uma API nativa `stage.toDataURL({ pixelRatio: 2 })` ou `stage.toCanvas()`.
* **Alta Qualidade**: Multiplicando o `pixelRatio` por `2` ou `3`, conseguimos exportar o slide (com tamanho nominal de 1080x1350) em resolução UHD real (2160x2700px ou 3240x4050px) para garantir zero ruído ou pixels aparentes ao subir para o Instagram.
* **Multi-Página**: Para exportar o carrossel completo, a engine do exportador itera sobre o array `pages`, renderiza temporariamente cada página no canvas invisível de background, extrai o blob da imagem e agrupa todas em um arquivo `.zip` para download instantâneo.

---

## 6. O Desafio Crítico: Portabilidade dos 300+ Templates JSX Legados

Este é o maior desafio técnico da arquitetura. Nossos mais de 300 templates existentes estão escritos em arquivos estáticos JSX estruturados em HTML/CSS (dentro de `src/components/slides/...`).
Como o `React-Konva` opera inteiramente desenhando formas 2D no Canvas 2D do navegador, **ele não compreende código JSX HTML convencional**.

Temos três rotas de engenharia para resolver essa compatibilidade:

```
Roteamento de Templates Legados:

[ Template Legado JSX ]
          |
          +--> Rota A: Parser Estático JSON (Ideal) 
          |    (Varre os nós JSX, extrai posições/fontes/cores e converte em CanvasElement)
          |
          +--> Rota B: Renderização Híbrida (DOM + Canvas)
          |    (Fundo estático é HTML estático; Elementos livres flutuam em Canvas por cima)
          |
          +--> Rota C: Renderização em Imagem (Fallback)
               (Gera um snapshot raster do template e insere como fundo bloqueado no canvas)
```

### Rota A: O Engine de Parser Estático JSON (Abordagem Polotno/IMG.LY) - *Recomendada*
Em vez de renderizar o JSX estático diretamente no Konva, criamos um **mapeador (Adapter)**. Cada variante existente em nosso app é convertida estruturalmente em uma lista de posições e elementos nativos.
* **Como funciona**: Mapeamos os slots do layout legado (ex: `titulo`, `subtitulo`, `avatar`, `imagem_principal`) em elementos padrão do Zustand. Ao selecionar um template "Fast Company", o Zustand é populado com os elementos exatos com suas fontes e posições originais, porém agora convertidos em objetos de Canvas manipuláveis.
* **Prós**: Flexibilidade total de edição. O usuário pode deletar o título, mover a foto e trocar a cor de fundo de um layout pronto de forma nativa.
* **Contras**: Exige mapeamento detalhado da estrutura dos 300 layouts legados para o novo formato de dados JSON do editor.

### Rota B: Renderização Híbrida (DOM + Canvas)
Mantemos o slide estático renderizado em HTML/CSS no fundo, e o `React-Konva` atua como um "overlay" transparente por cima, permitindo apenas adicionar e arrastar novos elementos customizados sobre o template pronto.
* **Prós**: Altíssima velocidade de entrega, reaproveitamento instantâneo de 100% dos 300 layouts legados sem alterar uma única linha de código deles.
* **Contras**: O usuário não consegue manipular os elementos nativos do layout do fundo (não pode arrastar o título original do template, apenas elementos que ele mesmo adicionar por cima).

### Rota C: Renderização Baseada em Imagem (Snapshot Raster)
O app gera uma imagem (raster PNG) do template estático JSX e insere essa imagem como o fundo fixo (Background Layer) do Canvas. O usuário então pode desenhar, adicionar formas e digitar textos livres sobre este fundo estático.
* **Prós**: Extremamente simples de implementar.
* **Contras**: Perda de flexibilidade na edição dos textos originais do template pronto.

---

## 7. Comparativo Arquitetural: Polotno vs. IMG.LY no Contexto do App

| Aspecto | Polotno Studio | IMG.LY CE.SDK | Nossa Proposta Híbrida |
| :--- | :--- | :--- | :--- |
| **Biblioteca Gráfica** | React-Konva | Motor C++/WebAssembly | **React-Konva** (Fácil, livre e alta performance) |
| **Gerência de Estado** | MobX State Tree | API de Blocos Engine | **Zustand** (Leve, flexível e performático) |
| **Licenciamento** | Comercial / Restrito | Comercial de alto custo | **100% Open-Source e Gratuito** |
| **Foco de Interface** | Design Rápido / Cartões | Enterprise / Flexível | **Foco em Carrosséis Sociais Premium** |
| **Portabilidade de Temas** | Difícil integração | Alta complexidade | **Parser JSON de layouts JSX** |

---

## 8. Escopo Recomendado para o MVP (Fase Inicial)

Para construirmos o nosso editor de forma segura e incremental, a primeira entrega (MVP) deve focar em:

1. **Casca Visual Premium**: Construção do layout com a Barra Lateral Inteligente (Tailwind) e animações suaves de abertura (Framer Motion).
2. **Setup do Zustand e Canvas Central**: Inicialização da store e montagem do `<Stage>` de Konva capaz de renderizar um slide dinâmico e o seletor `<Transformer>`.
3. **Mapeamento de 3 Elementos Core**:
   * **Texto**: Capacidade de inserir um bloco de texto, configurar fonte (Google Fonts nativo), tamanho e cor.
   * **Forma (Shape)**: Desenhar e colorir retângulos (com border-radius) e círculos.
   * **Upload**: Renderizar imagens arrastadas do computador no canvas.
4. **Implementação da Rota Híbrida (DOM + Canvas)** ou **Rota C (Snapshot como Fundo)** para garantir suporte instantâneo às variantes existentes antes de avançarmos para o parser completo de todas as 300 variantes.

---

## 9. Riscos de Implementação & Mitigação

1. **Risco de Performance de Renderização (Lag)**:
   * *Problema*: À medida que o usuário adiciona dezenas de formas geométricas complexas ou imagens de alta resolução, o Canvas pode perder FPS durante o arraste de elementos.
   * *Mitigação*: Utilizar o seletor isolado de estado do Zustand e aplicar propriedades de otimização nativas do Konva (como `perfectDrawEnabled: false` durante o arraste e `transformsEnabled: "position"`).
2. **Renderização de Fontes Customizadas (Google Fonts)**:
   * *Problema*: Fontes externas carregadas sob demanda podem não renderizar instantaneamente no Canvas, gerando desalinhamento de texto ou fontes padrão invisíveis durante a exportação.
   * *Mitigação*: Implementar um carregador de fontes assíncrono (WebFontLoader) que garante que a família de fonte selecionada esteja completamente baixada e renderizada na memória do navegador antes de forçar o redesenho do Canvas.
