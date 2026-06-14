# Roadmap de Engenharia: V1 do Canvas Editor (Evolução do Auto-Post)

Olá! Aqui é a **Alice**, atuando como sua **Arquiteta Principal**.

Abaixo apresento o **Roadmap Executivo e Técnico Definitivo para a Versão 1 (V1) do Canvas Editor**. Este documento estabelece a ordem exata de implementação passo a passo, integrando todos os ajustes arquiteturais aprovados: **adoção obrigatória de TypeScript (.ts/.tsx)**, a introdução da **`useUIStore`**, a **Estratégia Híbrida de Overlay** como caminho oficial e a desobstrução do parser de templates na fase inicial de MVP.

---

## 📅 Visão Geral das Fases

```
[ Fase 0: Fundação TS & Stores ] ===> [ Fase 1: Canvas Core (Konva) ] ===> [ Fase 2: CRUD de Elementos ]
                                                                                   |
[ Fase 5: Layers & zIndex ]      <=== [ Fase 4: Inspector Contextual ] <=== [ Fase 3: Multi-Page (Slides) ]
             |
[ Fase 6: Histórico (Snapshots) ] ===> [ Fase 7: Exportador Offscreen ] ===> [ Fase 8: Overlay Híbrido JSX ]
```

---

## 🛠️ Detalhamento das Fases de Implementação

---

### ## Fase 0: Fundação
* **Objetivo**: Configurar o ambiente TypeScript e estabelecer os alicerces de dados (Zustand Stores) completamente desacoplados de regras visuais.
* **Módulos / Entregas**:
  * Criação da estrutura física de diretórios no repositório.
  * Escrita das tipagens definitivas em TypeScript (`src/types/editor.ts`).
  * Implementação da **`useCanvasStore.ts`**: Mantém o estado lógico dos slides e elementos geométricos.
  * Implementação da **`useSelectionStore.ts`**: Mantém os IDs selecionados e atalhos de seleção rápida.
  * Implementação da nova **`useUIStore.ts`**: Mantém estados exclusivos de controle de UI (Drawer aberto/fechado, abas ativas, tema, exibição de réguas e modais).
  * Implementação da base de serialização em `src/services/serialization.ts`.
* **Dependências**: Nenhuma (é o ponto zero).
* **Riscos**: Acoplamento acidental de tipos. Um tipo de dados mal estruturado nesta fase exigirá refatoração severa nas fases 2 e 4.
* **Critérios de Conclusão**:
  * [ ] Todos os arquivos `.ts` criados, sem nenhum tipo genérico `any` implícito.
  * [ ] Stores Zustand inicializadas e rodando sem erros de compilação.
  * [ ] Teste lógico unitário provando que atualizar a `useUIStore` não altera ou redesenha dados da `useCanvasStore`.

---

### ## Fase 1: Canvas Core
* **Objetivo**: Inicializar o motor gráfico `React-Konva` e gerenciar a física de arrasto, rotação, zoom e focos visuais com redimensionamento nativo.
* **Módulos / Entregas**:
  * Configuração do componente container `<Stage>` e do nó principal `<Layer>`.
  * Implementação do hook `useKonvaTransformer.ts` para conectar o nó `<Transformer>` ao elemento marcado na `useSelectionStore`.
  * Criação da física de zoom e movimentação (Pan) utilizando atalhos do mouse e teclado (barra de espaço + arrasto).
  * Conexão dos manipuladores de eventos (`onDragEnd`, `onTransformEnd`) para atualizar as coordenadas geográficas na `useCanvasStore`.
* **Dependências**: Fase 0 concluída com sucesso.
* **Riscos**: Baixo desempenho gráfico (lag ou jitter) durante o arraste e redimensionamento composto via Transformer.
* **Critérios de Conclusão**:
  * [ ] Palco do canvas inicializado com foco centralizado.
  * [ ] O nó Transformer anexa-se perfeitamente a qualquer elemento simulado.
  * [ ] Coordenadas atualizadas em tempo real na store ao finalizar transformações, sem gerar loops de render.

---

### ## Fase 2: Elementos (CRUD)
* **Objetivo**: Habilitar a inserção física de blocos no Canvas (Textos, Imagens e Formas Geométricas) e a capacidade de criá-los, atualizá-los e removê-los.
* **Módulos / Entregas**:
  * Implementação da lógica de fábrica (`elementFactory`) para gerar IDs únicos e instanciar novos nós com tipagem estrita (`TextElement`, `ShapeElement`, `ImageElement`).
  * Conectores de inserção de texto no centro do viewport.
  * Mapeamento de upload de imagem local via `Blob/URL.createObjectURL` para renderização imediata do nó de imagem.
  * Suporte estrito a remoção via teclas `Delete` / `Backspace` capturadas pelo hook `useCanvasEvents.ts`.
* **Dependências**: Fase 1 concluída.
* **Riscos**: Vazamento de memória ao lidar com uploads de imagens repetidos sem revogar os objetos URL criados localmente.
* **Critérios de Conclusão**:
  * [ ] Usuário consegue adicionar dinamicamente Texto, Formas (retângulo/círculo) e Imagens.
  * [ ] Exclusão de múltiplos elementos selecionados funcionando com uma única tecla de atalho.
  * [ ] Atualização de propriedades básicas via console/store refletindo instantaneamente no Canvas.

---

### ## Fase 3: Multi-Page (Slides do Carrossel)
* **Objetivo**: Implementar o fluxo sequencial multipáginas necessário para carrosséis, permitindo a organização, ordenação e replicação rápida de slides.
* **Módulos / Entregas**:
  * Lógica de empilhamento de páginas na `useCanvasStore.ts`.
  * Desenvolvimento da física de reordenação estrutural das páginas (Drag and Drop lógico).
  * Lógica de duplicação profunda (`duplicatePage`), garantindo novas IDs exclusivas para todos os elementos internos clonados.
  * Ajuste de visibilidade da página ativa e renderização sequencial no painel do Workspace.
* **Dependências**: Fase 2 concluída.
* **Riscos**: Estouro de pilha ou duplicação de IDs idênticas ao clonar slides complexos (o que quebra a reatividade do Transformer).
* **Critérios de Conclusão**:
  * [ ] Capacidade de alternar o slide ativo na viewport.
  * [ ] Duplicação gerando clones independentes com novas IDs.
  * [ ] Array de páginas reordenado na store mantendo a integridade de todas as posições dos elementos internos.

---

### ## Fase 4: Inspector (Painel de Propriedades Contextual)
* **Objetivo**: Conectar o painel lateral direito de estilização para modificar os atributos estéticos exatos do elemento sob foco de forma rápida e segura.
* **Módulos / Entregas**:
  * Acoplamento do painel à `useSelectionStore` para identificar o tipo do nó ativo.
  * Mapeamento contextual de controles:
    *   **Se Texto**: Família da fonte, cor, alinhamento, espaçamento de linhas/letras, negrito, itálico.
    *   **Se Forma**: Cor de preenchimento, espessura e cor da borda, raio da borda (border-radius).
    *   **Se Imagem**: Filtros básicos, raio de borda e substituição rápida.
    *   **Se Fundo**: Cor sólida do slide ou gradientes.
  * Implementação de otimização de entrada (mudanças estéticas síncronas rápidas e commit definitivo no evento `onBlur`).
* **Dependências**: Fase 3 concluída.
* **Riscos**: Lentidão na digitação de campos devido a renderizações sucessivas disparadas a cada letra modificada nos inputs.
* **Critérios de Conclusão**:
  * [ ] Painel lateral exibe apenas controles aplicáveis ao tipo do elemento selecionado.
  * [ ] Alteração de propriedades (cor, tamanho, fonte) redesenhando o canvas sem latência perceptível.
  * [ ] Quando nada estiver selecionado, exibe controles globais de fundo do slide.

---

### ## Fase 5: Layers Panel (Gerenciador de Camadas)
* **Objetivo**: Exibir a hierarquia visual dos elementos no slide ativo, permitindo reordenar o empilhamento (zIndex), bloquear e ocultar camadas.
* **Módulos / Entregas**:
  * Mapeamento do array de elementos em uma lista física ordenada de camadas.
  * Ações de reordenação lógica: "Trazer para a Frente", "Enviar para Trás", "Avançar Camada", "Recuar Camada".
  * Lógica de bloqueio estrito (`locked: true`): Elementos bloqueados não podem ser selecionados ou movidos pelo mouse no Canvas, apenas destravados pelo painel de camadas.
  * Lógica de invisibilidade temporária (`visible: false`).
* **Dependências**: Fase 4 concluída.
* **Riscos**: Complexidade de UX ao gerenciar dezenas de camadas no mesmo slide sem nomes amigáveis por padrão.
* **Critérios de Conclusão**:
  * [ ] Usuário consegue travar e ocultar elementos individualmente.
  * [ ] A ordem de camadas mostrada no painel dita de forma exata a renderização do zIndex físico no Stage do Konva.
  * [ ] Renomeação de camada na lista refletindo nas propriedades do nó.

---

### ## Fase 6: Histórico (Undo/Redo)
* **Objetivo**: Implementar o motor de linha do tempo de edições, permitindo desfazer e refazer ações com proteção contra vazamento de memória.
* **Módulos / Entregas**:
  * Configuração da pilha dupla (`past` / `future`) na `useHistoryStore.ts`.
  * Filtro de eventos: Bloquear gravação durante movimentos contínuos (mouse down / drag).
  * Gatilho de snapshots automatizados estritamente nos términos físicos de interação (`onDragEnd`, `onTransformEnd`, `onBlur`).
  * Implementação de atalhos globais de teclado (Ctrl+Z e Ctrl+Y/Ctrl+Shift+Z) no hook `useCanvasEvents.ts`.
* **Dependências**: Fase 5 concluída.
* **Riscos**: Estouro de memória heap do navegador ao salvar snapshots profundos de imagens pesadas em base64.
* **Critérios de Conclusão**:
  * [ ] Teclas de atalho revertendo e restaurando ações em tempo real.
  * [ ] Limite rígido de 50 estados na pilha de histórico funcionando corretamente.
  * [ ] O arraste contínuo de um elemento gera apenas **um** snapshot final no término do arraste, não centenas.

---

### ## Fase 7: Exportação
* **Objetivo**: Desenvolver o motor de compilação offline de imagens de alta definição e download unificado em formato ZIP.
* **Módulos / Entregas**:
  * Desenvolvimento do `exportService.ts`.
  * Criação do compilador em background (Offscreen Canvas / Hidden Stage) configurado com resolução UHD (`pixelRatio: 2` de 1080x1350px).
  * Mecanismo de exportação sequencial em lote (Batch Rendering) de todas as páginas existentes no projeto.
  * Integração com a biblioteca de compressão client-side `jszip` para gerar o arquivo `.zip` e gatilho de download nativo do navegador.
* **Dependências**: Fase 6 concluída.
* **Riscos**: Borrões de escala (pixels pixelados) ou fontes customizadas não carregadas saindo erradas nas imagens PNG finais.
* **Critérios de Conclusão**:
  * [ ] Exportador aguarda o download completo das Google Fonts antes de disparar a gravação.
  * [ ] Download do pacote ZIP contendo todas as páginas em formato PNG de alta resolução funcionando nativamente.
  * [ ] Zero lag visual no Workspace durante o processo de exportação em lote.

---

### ## Fase 8: Integração Híbrida com Templates Existentes
* **Objetivo**: Consolidar a evolução da página Auto-Post sem quebrar as 300+ variantes JSX existentes, permitindo seu funcionamento nativo com camadas livres por cima.
* **Módulos / Entregas**:
  * **Configuração de Overlay Híbrido**: O slide legado JSX é renderizado como fundo estático e o Canvas do Konva é sobreposto de forma transparente sobre ele.
  * Ajuste do exportador para renderizar simultaneamente o DOM HTML do layout estático e o canvas transparente, unificando os pixels na imagem final.
  * Definição de roadmap futuro de mapeamento JSON automatizado (JSX parser) para a fase pós-V1.
* **Dependências**: Fase 7 concluída.
* **Riscos**: Falhas de alinhamento milimétrico entre o elemento HTML renderizado em background e o canvas transparente de overlay.
* **Critérios de Conclusão**:
  * [ ] As 300+ variantes existentes renderizam normalmente na nova página evolucionada do editor.
  * [ ] Novos elementos livres (formas, textos e imagens do usuário) podem ser posicionados e escalados por cima do template com precisão.
  * [ ] A exportação final do slide mescla o template estático de fundo e as novas camadas superiores em uma única imagem coesa e nítida.

---

## 🎯 Resumo da Estratégia de Desenvolvimento

Seguindo este roadmap de forma incremental, garantimos que **nunca quebraremos o produto existente** e que cada fase nascerá estruturada sob **TypeScript** rígido. O editor livre evoluirá a página Auto-Post de maneira segura, mantendo os 300 templates JSX ativos via **Overlay Híbrido** e pavimentando o caminho para um design dinâmico, moderno e flexível.

Esta é a especificação do roadmap de engenharia final para a sua revisão técnica, chefe! 🚀🎨💎
