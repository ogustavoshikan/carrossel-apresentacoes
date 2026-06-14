# Auditoria de Experiência de Uso (UX): Canvas Editor Profissional

Olá! Aqui é a **Alice**, atuando como sua **Staff UX Engineer**.

Abaixo apresento a **Auditoria de UX e Comportamento Operacional** definitiva para a Versão 1 (V1) do Canvas Editor. O foco desta auditoria é puramente a ergonomia do criador, atalhos universais de design e as micro-interações que separam um editor amador de uma ferramenta de calibre profissional como o Figma, Canva ou Polotno.

> [!IMPORTANT]
> **Correção de Premissa (CORS & Imagens)**:
> Esta auditoria descarta qualquer tipo de solução baseada em "bypass de segurança de CORS". Fica estabelecido oficialmente que as imagens externas manipuladas pelo editor dependerão estritamente de:
> 1. Assets hospedados sob controladoria própria no banco de dados / Storage do app.
> 2. Imagens externas carregadas com cabeçalhos CORS compatíveis (`crossOrigin = "anonymous"`).
> 3. Uso de um servidor de **Proxy Controlado** próprio do Carrossel Studio quando a imagem de origem não possuir cabeçalhos adequados.

---

## 🗺️ Tabela Geral de Recursos de UX e Priorização

| Recurso de UX | Descrição | Impacto | Dificuldade | Prioridade |
| :--- | :--- | :--- | :--- | :--- |
| **Snap Guides Básicos** | Alinhamento magnético ao centro e bordas da página. | ⭐ Altíssimo | 🟢 Baixa | **Obrigatório V1** |
| **Snap Guides Avançados** | Guias magnéticas de alinhamento e distância entre múltiplos nós. | ⭐ Médio | 🔴 Alta | **Pode esperar V2** |
| **Atalhos Básicos** | Delete, Backspace, Ctrl+Z, Ctrl+Shift+Z, Ctrl+C/V/D, Esc. | ⭐ Altíssimo | 🟢 Baixa | **Obrigatório V1** |
| **Atalhos Avançados** | Shift + setas (Nudge 10px), Ctrl+A (Selecionar tudo). | ⭐ Alto | 🟢 Baixa | **Obrigatório V1** |
| **Multi-Selection** | Shift+Click e seleção combinada. | ⭐ Alto | 🟡 Média | **Obrigatório V1** |
| **Box Selection** | Arrastar retângulo pontilhado em áreas vazias para agrupar foco. | ⭐ Alto | 🟡 Média | **Recomendado V1** |
| **Grouping / Ungroup** | Criação de subgrupos lógicos (Ctrl+G / Ctrl+Shift+G). | ⭐ Alto | 🔴 Alta | **Pode esperar V2** |
| **Camadas (Rename/Lock/Hide)**| Painel rápido para gerenciar visibilidade e travas. | ⭐ Alto | 🟢 Baixa | **Obrigatório V1** |
| **Arrasto de Camadas** | Reordenação visual da árvore por clique e arraste (D&D). | ⭐ Médio | 🟡 Média | **Pode esperar V2** |
| **Clipboard entre Páginas** | Copiar nó de um slide e colar no outro nas coordenadas idênticas. | ⭐ Altíssimo | 🟢 Baixa | **Obrigatório V1** |
| **Alinhamento Rápido** | Botões de alinhar à esquerda, direita, topo, base e centros. | ⭐ Altíssimo | 🟢 Baixa | **Obrigatório V1** |
| **Distribuição Espacial** | Espaçamento uniforme automático em lote de 3+ elementos. | ⭐ Médio | 🟡 Média | **Pode esperar V2** |
| **Zoom: Fit to Screen** | Botão para enquadrar perfeitamente a página de acordo com a tela. | ⭐ Altíssimo | 🟢 Baixa | **Obrigatório V1** |
| **Zoom: Ctrl + Scroll** | Roda do mouse ampliando/reduzindo no ponto do cursor. | ⭐ Alto | 🟡 Média | **Recomendado V1** |
| **Navegação (Pan)** | Barra de espaço + arrasto com mão, ou scroll do mouse vertical. | ⭐ Médio | 🟢 Baixa | **Recomendado V1** |

---

## 🔍 Detalhamento das Áreas Críticas de Análise

### 1. Snap Guides (Guias Magnéticas)
*   **Comportamento nas Referências**:
    *   *Figma/Canva*: Ao mover um nó, linhas guias magenta cruzam a tela quando eixos centrais ou bordas entram em colisão com o Canvas ou com outros elementos do mesmo slide.
    *   *Polotno/IMG.LY*: Oferece guias básicas focadas nas bordas da página ativa e centro geométrico.
*   **Comportamento Proposto para V1**:
    *   **Guias de Página (Obrigatório V1)**: Ao arrastar um nó, ele deve "engatar" (snap) ao alcançar as posições de 50% (centro vertical), 50% (centro horizontal) e as bordas de margem de segurança do slide (ex: 40px das laterais). Linhas vermelhas tracejadas devem ser renderizadas pelo Konva no exato instante do snap.
    *   **Guias entre Nós (Pode esperar V2)**: Guias relativas que ligam o Elemento A ao Elemento B.
*   **Impacto**: Reduz drasticamente o tempo necessário para centralizar títulos ou alinhar blocos de texto, aumentando a percepção de precisão profissional.

---

### 2. Keyboard Shortcuts (Atalhos de Teclado)
Para evitar frustração de designers experientes, o mapeamento de atalhos globais no Hook `useCanvasEvents.ts` deve seguir convenções universais:

*   **Obrigatórios para V1**:
    *   `Delete` / `Backspace` -> Remove o elemento ativo da seleção.
    *   `Ctrl+C` / `Ctrl+V` -> Copia/Cola elementos na memória interna.
    *   `Ctrl+D` -> Duplica instantaneamente (cria cópia com deslocamento de +20px em x e y).
    *   `Ctrl+Z` / `Ctrl+Shift+Z` -> Undo e Redo (desfazer/refazer).
    *   `Ctrl+A` -> Seleciona todos os nós editáveis da página ativa.
    *   `Esc` -> Remove o foco de qualquer nó e limpa a `selectedElementIds`.
    *   `Arrow Keys` -> Move elementos em incrementos de 1px (2px no atual, mudaremos para 1px para melhor pixel-perfect).
    *   `Shift + Arrow Keys` -> Move em blocos rápidos de 10px (comumente usado no Figma/Canva para design ágil).
*   **Impacto**: Fator número 1 na produtividade do criador.

---

### 3. Multi-Selection (Seleção Múltipla)
*   **Shift + Click (Obrigatório V1)**:
    *   Clicar em um elemento sem pressionar Shift seleciona apenas ele.
    *   Clicar em um elemento pressionando Shift adiciona ou remove ele do conjunto `selectedElementIds` no Zustand. O nó `<Transformer>` engloba a caixa delimitadora combinada de todos os nós ativos.
*   **Box Selection / Drag Select (Recomendado V1)**:
    *   Ao clicar e arrastar em uma área vazia do Canvas, desenha-se um retângulo delimitador pontilhado. Todos os elementos cujos limites geométricos colidirem (intersecção) com este retângulo são adicionados à seleção ao soltar o mouse.
*   **Impacto**: Essencial para mover blocos inteiros (título + subtítulo) sem a necessidade de agrupamento estrito.

---

### 4. Grouping (Agrupamento lógicos: Ctrl+G)
*   **Comportamento Figma/Canva**: Agrupar cria um nó pai lógico. Mover o pai move todos os filhos proporcionalmente; redimensionar o pai escala todos os filhos.
*   **Preparação Arquitetural**:
    *   Mesmo sendo relegado para a **V2**, nossa tipagem do Zustand (`CanvasElement`) nascerá com a propriedade opcional `parentId?: string | null`. 
    *   Isso garante que, no futuro, possamos agrupar sem quebrar a renderização, bastando injetar nós cuja coordenada x/y passe a ser calculada de forma relativa ao nó pai do grupo, e não absoluta no canvas.
*   **Impacto**: Alta complexidade de implementação no MVP; melhor focar em multi-seleção de elementos soltos para a V1.

---

### 5. Layers Management (Lista de Camadas)
*   **Renomear (Obrigatório V1)**: Duplo clique na camada na lista lateral abre um input simples de texto para customizar o nome amigável do nó (ex: "Título Principal").
*   **Bloqueio e Visibilidade (Obrigatório V1)**: Ícones de cadeado e olho. Elementos travados não podem ser arrastados ou selecionados no canvas físico (evita cliques acidentais em fundos e formas grandes), apenas destravados pelo painel de camadas.
*   **Drag & Drop de Camadas (Pode esperar V2)**:
    *   Mover a camada visualmente na lista lateral para trocar a ordem física de empilhamento.
    *   *Solução Simples para V1*: Botões Rápidos "Avançar Camada" e "Recuar Camada" no menu de propriedades. Isso atende perfeitamente ao MVP, reduzindo a complexidade de arrasto de componentes na árvore da interface.

---

### 6. Clipboard (Área de Transferência)
*   **Persistência Interna**: O elemento copiado é armazenado em formato JSON na memória da `useSelectionStore`.
*   **Cópia Sequencial entre Páginas (Obrigatório V1)**:
    *   Se o usuário copia o Título do Slide 1 (ID `txt-1`, coordenadas `x: 100`, `y: 120`), navega para o Slide 2 e aperta `Ctrl+V`, o texto deve ser inserido no Slide 2 nas **mesmas coordenadas originais** (`x: 100`, `y: 120`).
    *   Se ele colar o texto no **mesmo slide** onde copiou, aplica-se o deslocamento padrão de +20px em x e y para evitar sobreposição total.
*   **Impacto**: Fator crítico de consistência visual na criação de carrosséis.

---

### 7. Alignment & Distribution (Alinhamento e Distribuição)
*   **Alinhamento de Um Elemento (Obrigatório V1)**:
    *   Alinha o elemento em relação às bordas geométricas do slide ativo.
    *   Botões de alinhamento: Esquerda (`x: margin`), Direita (`x: canvasWidth - elementWidth - margin`), Topo (`y: margin`), Base, Centro Horizontal e Centro Vertical.
*   **Alinhamento de Múltiplos Elementos (Obrigatório V1)**:
    *   Se 2 ou mais elementos estiverem selecionados, o alinhamento é feito em relação à caixa delimitadora combinada (Bounding Box) dos elementos ativos (ex: alinhar todos pela esquerda do elemento mais à esquerda).
*   **Distribuição Espacial (Pode esperar V2)**: Espaçamento uniforme automático em lote de 3+ elementos.
*   **Impacto**: Essencial para layouts limpos e profissionais.

---

### 8. Zoom UX & Pan (Navegação Espacial)
*   **Enquadramento Automático (Obrigatório V1)**: Botão "Fit to Screen" (Ajustar à tela) que calcula a largura da viewport visível do usuário e ajusta a escala do Stage para que o slide caiba perfeitamente com 50px de margem de respiro.
*   **Ctrl + Scroll (Recomendado V1)**: Segurar a tecla Control e usar a roda de rolagem do mouse amplia ou reduz o zoom no ponto exato onde o cursor do mouse está posicionado (padrão Figma/Canva).
*   **Barra de Espaço + Drag (Recomendado V1)**: Segurar a barra de espaço transforma o cursor em uma mão segurando (`grabbing`). O arraste do mouse permite mover livremente a tela do workspace (Pan).

---

## ⚖️ Veredicto e Roadmap de Implementação de UX (Foco V1)

Para garantir que o editor seja percebido imediatamente como uma ferramenta de **design profissional de alto nível**, a ordem estrita de implementação dos recursos de experiência deve seguir a sequência abaixo, acoplada às Fases do Roadmap Técnico:

```
[ PASSO 1: Focos e Seleção ] ---> Shift + Click, Bounding Box e Atalhos Básicos (Del/Esc/Setas)
                                                |
                                                v
[ PASSO 2: Alinhamento Estrito ] ---> Margens de Segurança, Botões de Alinhamento Rápido e Guias Básicas de Centro
                                                |
                                                v
[ PASSO 3: Multi-Page Clipboard ] ---> Cópia exata de elementos entre slides com preservação de coordenadas
                                                |
                                                v
[ PASSO 4: Refinamento Espacial ] ---> Zoom "Fit to Screen" e navegação de Stage responsiva
```

---

## 🚫 Recursos que NÃO valem a pena implementar (Descarte)

1.  **Agrupamentos Aninhados Infinitos (Figma Frame inside Frame)**:
    *   *Por quê?* Exige re-cálculos de coordenadas locais e complexidade gigantesca na árvore do Zustand. Criadores de carrosséis precisam apenas de movimentos rápidos. Multi-seleção simples resolve 95% do uso.
2.  **Vetorização Manual (Pen Tool)**:
    *   *Por quê?* O Carrossel Studio é focado em montagem de conteúdo de alta conversão. Criação de curvas de Bezier e vetores complexos do zero deve ser descartada; os usuários importam imagens/SVGs prontos ou usam formas geométricas básicas (retângulos/círculos).

---

Aprovando esta auditoria de comportamento operacional de UX, garantimos a excelência ergonômica do novo editor do Carrossel Studio, chefe! O que achou? 🚀💎🎨
