# Plano de Implementação - Carrossel Studio

Este documento contém a análise de viabilidade, matriz de complexidade e o checklist de execução para as melhorias solicitadas no `Features & Correções.txt`.

## 1. Análise de Viabilidade Técnica

Abaixo está a análise sobre cada solicitação perante a arquitetura atual (React 19 + Tailwind CSS + Context/State unificado):

1. **Seções Expansíveis (Accordion) na Sidebar:**
   - **Viabilidade:** Totalmente viável.
   - **Impacto:** Exige componentizar os grupos lógicos de controles já existentes em `<ConfigSidebar />` usando um novo componente de `CollapsibleSection` ou `Accordion` simples, sem alterar a lógica principal de dados, apenas a UI de organização.

2. **Controle Direcional (Estilo D-Pad) no Inspetor de Propriedades:**
   - **Viabilidade:** Totalmente viável.
   - **Impacto:** Mínimo. Envolve desenhar um novo componente UI minimalista (botões cima/baixo/esquerda/direita) no `PropertyInspector`, que irá reutilizar as funções de `handleElementTransform` que já editam o eixo X e Y. Pode coexistir perfeitamente com os inputs manuais que já estão rodando.

3. **Ícones de Informação (Tooltips) para Controles da Sidebar:**
   - **Viabilidade:** Totalmente viável.
   - **Impacto:** Baixíssimo. Trata-se de adicionar um ícone `Info` (`lucide-react`) com um elemento "tooltip" flutuante renderizado ao passar o mouse. Único ponto de cautela é garantir que o `z-index` e posicionamento visual da tooltip não sejam cortados pelo limite de scroll da Sidebar.

4. **Botões de Reordenação (< e >) entre os Slides:**
   - **Viabilidade:** Totalmente viável.
   - **Impacto:** Moderado-Alto. Exige colocar UI interativa intercalada na listagem de slides no componente principal de visualização (`VisualPreview` / `Workspace`). Afetará a função principal do estado global que manipula o array de slides (`moveSlide(fromIndex, toIndex)`). Exigirá cuidado para não interromper os cálculos de exportação com botões visíveis, sendo necessário ocultá-los ao exportar a imagem.

---

## 2. Matriz de Complexidade

| ID | Tarefa | Complexidade | Racional da Classificação |
|:---|:---|:---:|:---|
| 3 | **Ícones de Informação (Tooltips) na Sidebar** | **Baixa** | Adição de ícones `Info` (lucide-react), labels dinâmicas (hover/tooltip puramente visual CSS/Tailwind). Não afeta estado da aplicação. |
| 1 | **Seções Expansíveis (Accordion) na Sidebar** | **Média** | Requer criação de novo sub-componente gerenciador de estado local (aberto/fechado) e refatoração visual do JSX na `ConfigSidebar` para englobar os _inputs_ logicamente. |
| 2 | **Controle Direcional (D-Pad) no Inspetor** | **Média** | Construção de um componente interativo com design minimalista, ligando _onClick_ aos mapeamentos de transformação já existentes (`updateElement`). |
| 4 | **Botões de Reordenação de Slides (< e >)** | **Alta** | Mudança estrutural no _Workspace_ na disposição visual (renderizar botões nos gaps), bem como criação de _Action_ de movimentação de elementos dentro do _Array_ principal sem causar dessincronização do slide ativo no momento ou interferir no html-to-image. |

---

## 3. Checklist de Execução e Plano Seguro

Para respeitar as diretrizes de **preservar os componentes funcionando** e ser **seguro / incremental**, executaremos os itens do mais simples para o mais complexo. Você aprova uma etapa, nós implementamos, testamos localmente e então vamos para a seguinte.

### Fase 1: Ajustes Visuais e de UI (Baixo Risco)
- [x] **1.1. Tooltips de Informação (Tarefa 3)**
  - Criar um micro-componente `Tooltip` ou usar HTML simples com group-hover.
  - Injetar ao lado das labels "Tamanho Título", "Tamanho Texto", "Bordas do Card" e "Bordas Internas (Imagens)".

### Fase 2: Organização de UI/UX Existente (Médio Risco)
- [x] **2.1. Seções Expansíveis da Sidebar (Tarefa 1)**
  - Criar componente `CollapsibleSection` (com estado de expandido/recolhido).
  - Envolver os agrupamentos existentes ("HANDLE até CORPO TEXTO", "TAMANHO até BORDAS") na `ConfigSidebar`.
  
- [x] **2.2. D-Pad Direcional no Property Inspector (Tarefa 2)**
  - Criar Componente `DirectionalPad` (UI em formato direcional).
  - Ligar eventos de click aos métodos de posição X e Y.
  - Inserir no `PropertyInspector` abaixo de Escala.

### Fase 3: Manipulação do Estado Central (Risco Alto)
- [x] **3.1 Lógica do Array de Slides e Reordenação (Tarefa 4)**
  - Criar método no Contexto da aplicação para reordenar elementos `moveSlide(from, to)`.
  - Injetar no `VisualPreview` os botões `>` e `<` de forma harmoniosa no espaçamento.
  - Implementar verificação para esconder esses botões caso esteja exportando as imagens (`isExporting = true`).

---

> [!NOTE] 
> Todo código produzido manterá 100% da identidade visual Premium do projeto (cores, ícones Lucide React, e classes do design system).
