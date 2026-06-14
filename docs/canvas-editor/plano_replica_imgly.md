# Plano de Criação: Réplica Premium do IMG.LY Design Editor (Sem Custos)

Olá! Aqui é a **Alice**. 

O editor do **IMG.LY** é espetacular! Eles possuem uma das melhores experiências visuais e de usabilidade de design na web atualmente. 

No entanto, há um ponto técnico importante: **o CreativeEditor SDK da IMG.LY é um software comercial proprietário**. Para utilizá-lo profissionalmente no app sem marcas d'água de demonstração ou limites, é necessária uma licença comercial que custa milhares de dólares por ano.

### A Boa Notícia: Podemos replicar essa experiência 100% de graça!
Como o nosso app já possui o motor matemático de movimentação, escala, rotação e edição de texto em tempo real (via `SmartElement` e `useDragResize`), **nós não precisamos do SDK fechado deles**. Nós podemos construir a mesma casca visual ultra-premium, os mesmos painéis, ferramentas e barras flutuantes usando **React + Tailwind CSS nativos**.

Abaixo, detalho como vamos estruturar o nosso **Editor Livre (Design Studio)** inspirado no design deles, integrado diretamente na aba que seria o "Auto-Post".

---

## 1. Mapeamento da Interface Premium (Estilo IMG.LY)

A interface do IMG.LY é elegante por ser escura (Dark Theme), minimalista e com forte foco no contraste. Vamos estruturá-la em 4 grandes blocos:

```
[ Barra Superior: Zoom, Desfazer, Exportar ]
+-----------------------------------------------------------+
| [Ferramentas] | [Gaveta]   | [Canvas Central] | [Ajustes] |
| - Modelos     | - Formas   |                  | - Fonte   |
| - Texto       | - Ícones   |   (Slide 4:5)    | - Cor     |
| - Mídia       | - Cores    |                  | - Bordas  |
| - Ajustes     |            |                  |           |
+-----------------------------------------------------------+
```

### A. Barra Superior (Ações Globais)
* **Desfazer / Refazer (Undo/Redo)**: Ações rápidas para desfazer o último movimento ou edição.
* **Indicador de Zoom**: Ajuste fino visual (50%, 75%, 100%, Ajustar à tela).
* **Botão "Limpar Canvas"**: Para recomeçar do zero.
* **Botão "Exportar PNG"**: Dispara a nossa biblioteca de conversão DOM-para-Imagem.

### B. Barra Lateral de Ferramentas (Esquerda)
Uma barra ultra-fina (estilo dock) com ícones premium do *Lucide React*:
1. **Modelos (Layouts)**: Templates de fundo rápidos.
2. **Textos**: Adicionar blocos de Título, Subtítulo ou Texto de Apoio.
3. **Formas (Elementos)**: Adicionar Retângulos, Círculos, Linhas, Cartões e Balões.
4. **Mídia (Uploads)**: Para inserir imagens do usuário ou buscar links.
5. **Ajustes de Canvas**: Cor do fundo do slide (sólido ou gradiente).

Quando o usuário clica em um desses botões, abre-se uma **"Gaveta" (Drawer)** lateral moderna contendo as opções (ex: as formas geométricas clicáveis, as opções de fontes, etc.).

### C. Canvas Central (Área de Trabalho)
* Um fundo escuro `#0A0A0A` com efeito de grade sutil.
* O slide posicionado no centro com uma sombra suave (`shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]`) e bordas perfeitas de 4:5 (formato padrão de posts).
* Renderização limpa de todos os elementos dinâmicos adicionados.

### D. Painel Lateral de Propriedades (Direita)
O grande segredo do IMG.LY é que **este painel é dinâmico (contextual)**. Ele muda com base no que está selecionado:
* **Nenhum elemento selecionado**: Mostra as configurações globais do slide (Cor de fundo, gradiente, tamanho da página).
* **Elemento de Texto selecionado**: Mostra controles de Família da Fonte, Tamanho, Cor do Texto, Negrito/Itálico, Alinhamento e Espaçamento.
* **Elemento de Forma selecionado**: Mostra Cor de Preenchimento, Cor da Borda, Espessura da Borda, Raio da Borda (Border Radius) e Opacidade.
* **Elemento de Imagem selecionado**: Mostra ajuste de escala, borda arredondada e substituição de imagem.

---

## 2. Arquitetura de Estados no React (`EditorLivre.jsx`)

Para manter o código performático e livre de bugs, criaremos um novo arquivo principal em `src/components/EditorLivre.jsx`:

```javascript
// Esboço conceitual do estado do editor livre
const [elements, setElements] = useState([
  {
    id: 'txt-1',
    type: 'text',
    content: 'Dê dois cliques para editar',
    x: 100, y: 150, scale: 1, rotation: 0,
    style: { color: '#FFFFFF', fontSize: '32px', fontFamily: 'Inter', fontWeight: 'bold' }
  },
  {
    id: 'shape-1',
    type: 'shape',
    shapeType: 'rectangle',
    x: 80, y: 320, scale: 1, rotation: 0,
    style: { backgroundColor: '#DE1E4D', width: '200px', height: '100px', borderRadius: '12px' }
  }
]);

const [selectedElementId, setSelectedElementId] = useState(null);
const [zoom, setZoom] = useState(1);
const [canvasBg, setCanvasBg] = useState('#050505');
```

---

## 3. Próximos Passos Incrementais

Para criarmos essa réplica perfeita sem custos adicionais de SDKs de terceiros:

1. **Passo 1: Criar o layout visual (`EditorLivre.jsx`)**: 
   Montaremos a casca do IMG.LY (Barra lateral esquerda, Canvas central, Painel lateral direito de propriedades e Barra superior).
2. **Passo 2: Conectar a Rota na Sidebar**:
   Substituiremos a rota "Auto-Post" na `GlobalSidebar.jsx` para apontar diretamente para esta nova página, renomeando o ícone para **"Editor"** ou **"Design Livre"**.
3. **Passo 3: Mapear os Controles de Elementos**:
   Conectaremos o `SmartElement` para renderizar as formas e textos e fazer o painel direito atualizar instantaneamente os estilos do elemento ativo.
