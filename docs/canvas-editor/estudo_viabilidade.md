# Estudo de Viabilidade Técnica e Estratégica: Evolução para Editor Canvas Livre

Olá! Aqui é a **Alice**. Analisei com muito cuidado o estado atual da arquitetura de código do nosso **Carrossel Studio** e preparei um estudo aprofundado sobre como podemos romper a limitação de designs "prontos" e evoluir para um ambiente de edição dinâmico e flexível no estilo **Canva**, aproveitando ao máximo o que já temos construído.

---

## 1. O Cenário Atual e Nossas Forças
Hoje, o app já possui uma base técnica incrivelmente sofisticada para manipulação visual no frontend:
* **`SmartElement` (`src/components/smart-element.jsx`)**: Já controla manipulações complexas como **Drag (arrastar)**, **Scale (escala)**, **Rotation (rotação)** e **Edição de Texto RTF** em tempo real com duplo clique.
* **Multi-seleção**: Já suportamos Ctrl+A e Shift+Click para selecionar e mover múltiplos elementos ao mesmo tempo (via teclas de seta ou mouse).
* **Exportação robusta**: O fluxo em `src/services/export.js` renderiza o DOM em PNG, o que significa que qualquer elemento renderizado via HTML/CSS absoluto será exportado com precisão matemática.

**A Limitação Técnica Atual:**
Os slides são baseados em layouts fixos (`SlideCover`, `SlideContentSplit`, etc.) definidos em pastas e arquivos estáticos. As chaves de conteúdo do estado de um slide (`title`, `subtitle`, `tag`, `imageUrl`) e suas posições associadas no objeto `positions` são atreladas a campos pré-definidos pelo template.

---

## 2. Onde Implementar? Estúdio Unificado vs. Nova Página

Analisando a experiência do usuário (UX) e o valor de mercado do produto, temos duas abordagens para posicionar essa funcionalidade no app:

### Opção A: Integração Direta no "Studio" (Altamente Recomendada) 🌟
Em vez de separar a criação livre em outra página, expandimos o próprio **Studio** para suportar slides livres (do zero) misturados com slides de templates.

* **Como funcionaria**:
  1. O usuário clica em "Adicionar Slide" e escolhe a opção **"Slide em Branco / Canvas Livre"**.
  2. Na barra lateral (`ConfigSidebar.jsx`), adicionamos uma aba chamada **"Elementos"** (ativa apenas quando um slide livre ou elemento customizado estiver em foco).
  3. Nessa aba, o usuário pode clicar em botões como: *"+ Texto"*, *"+ Retângulo"*, *"+ Círculo"*, *"+ Ícone"* ou *"+ Imagem"*.
  4. Esses elementos aparecem no slide como novos `SmartElement`s flutuantes que podem ser arrastados, escalados, coloridos e deletados.
* **Vantagens**:
  * **Coesão Absoluta (UX)**: O usuário pode misturar layouts de alta conversão gerados por IA (como uma Capa incrível) com slides altamente customizados criados por ele no mesmo carrossel.
  * **Preservação do Auto-Post**: Mantemos a aba **Auto-Post** com seu propósito original de altíssimo valor (Agendamento, Integração com API do Instagram para publicação direta e calendário de postagens), o que eleva a percepção do app de "editor de imagem" para "plataforma de marketing".

### Opção B: Reposicionar o "Auto-Post" como "Editor Livre" (Canva)
Transformamos o item de menu "Auto-Post" em um **"Design Studio"** ou **"Editor Livre"**.

* **Como funcionaria**:
  * Substituímos o componente de *coming-soon* por um grande espaço de trabalho de tela cheia.
  * À esquerda, um painel completo de elementos (Formas, Objetos, Uploads).
  * No centro, uma área limpa de canvas que opera 100% de forma livre.
* **Vantagens**:
  * Tela de trabalho muito mais ampla e livre das amarras do fluxo sequencial do carrossel do Studio.
  * Ideal se o foco for criar peças de imagem única (ex: stories, posts simples, cartões) que não seguem o formato de carrossel contínuo.
* **Desvantagens**:
  * Perda do recurso de automação/agendamento futura (ou necessidade de criar um quinto botão no menu).
  * Fragmentação da experiência: o usuário não consegue facilmente mover um slide customizado feito no Editor Livre para dentro de seu carrossel no Studio.

---

## 3. Arquitetura de Estado Proposta (Como Programar Isso)

Para suportar elementos livres sem quebrar os templates existentes, podemos evoluir a estrutura de dados de cada slide para aceitar um array de `elements`.

### Modelo de Dados Atual:
```json
{
  "id": "slide-1",
  "layout": "cover",
  "variant": 2,
  "title": "Como criar conteúdo",
  "text": "Texto descritivo...",
  "positions": {
    "title": { "x": 0, "y": 0, "scale": 1, "rotation": 0 }
  }
}
```

### Novo Modelo de Dados Híbrido:
```json
{
  "id": "slide-1",
  "layout": "freeform", // Indica que é um slide livre
  "background": {
    "type": "color",
    "value": "#1A1A1A"
  },
  "elements": [
    {
      "id": "el-1029",
      "type": "text",
      "content": "Título Customizado",
      "style": { "color": "#FFFFFF", "fontSize": "48px", "fontWeight": "bold" },
      "x": 40,
      "y": 80,
      "scale": 1.1,
      "rotation": 0
    },
    {
      "id": "el-1030",
      "type": "shape",
      "shapeType": "rectangle",
      "style": { "backgroundColor": "#DE1E4D", "width": "200px", "height": "100px", "borderRadius": "8px" },
      "x": 120,
      "y": 300,
      "scale": 1,
      "rotation": 15
    }
  ]
}
```

---

## 4. Plano de Implementação Incremental (Passo a Passo)

Caso decida avançar com este upgrade de escopo, faremos isso de forma estritamente incremental para evitar qualquer quebra no app:

### Fase 1: Motor de Renderização Livre (`VisualPreview` + `SlideRenderer`)
* Criar um componente genérico chamado `SlideFreeform.jsx` que recebe o array de `elements` e mapeia cada um dentro de um wrapper `SmartElement`.
* Adaptar o `SlideRenderer` para identificar o layout `"freeform"` e renderizar este novo componente.

### Fase 2: Painel de Controle de Elementos
* Adicionar a aba "Elementos" na barra lateral.
* Desenvolver controles para:
  * **Adicionar Texto**: Insere um bloco de texto básico no centro do slide ativo.
  * **Adicionar Formas**: Botões rápidos para Retângulo, Círculo, Linha e Estrelas.
  * **Configurar Aparência**: Controles de cor de preenchimento (picker), opacidade, raio de borda (border-radius) e bordas.

### Fase 3: Gerenciamento de Camadas (zIndex) e Exclusão
* Como em um app de design real, o usuário precisará decidir quem fica na frente. Implementar um mini seletor para "Trazer para Frente" / "Enviar para Trás" que manipula o índice no array de elementos do slide.
* Suporte para tecla `Delete` ou `Backspace` para excluir o elemento selecionado no canvas.
