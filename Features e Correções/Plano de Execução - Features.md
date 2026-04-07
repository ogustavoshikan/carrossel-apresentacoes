# Plano de Execução - Features e Correções

Após uma rigorosa análise técnica do arquivo de requisitos, confirmo que **todas as 11 solicitações são viáveis de serem implementadas**. A arquitetura React do Alice Studio permite estender essas funcionalidades de forma organizada, embora algumas demandem maior foco em performance e estado global.

Abaixo, categorizo cada pedido com base em seu grau de complexidade na nossa stack (React + Tailwind + Custom Hooks), criando um roteiro pragmático para atacarmos os pontos e aplicarmos o checklist conforme executamos cada etapa.

---

## 🟢 Nível Baixo (Low Effort / Quick Wins)
Alterações de interface e ações diretas que exigem pouco ou nenhum refatoramento de estados complexos.

- [x] **1. Tradução Completa (UI 100% PT-BR)**
  *Ajuste nos arquivos de componentes para matar falhas de localização (labels, modais, placeholders, tools).*
- [x] **4. Botões de Navegação do Carrossel**
  *Criação das setas Direita/Esquerda para rolar horizontalmente o contêiner de visualização principal.*
- [x] **6. Excluir Slide (Botão 'X' Flutuante)**
  *Botão interativo absolutamente posicionado sobre cada card que chama uma remoção no array do estado central.*
- [x] **7. Exibição da Label do Layout Adotado**
  *Estilização de um indicativo elegante (ex: Layout: Content-Split) do tipo de estrutura abaixo de cada slide.*
- [x] **11. Navbar Superior Recolhível (Toggle Mode)**
  *Implementar um controle de retração para esconder o cabeçalho superior para ganhar espaço vertical.*

---

## 🟡 Nível Médio (Medium Effort)
Demandam refatoração em componentes existentes e criação de novos métodos para funcionalidades mais profundas.

- [x] **2. Download Slide Específico com Diálogo de Salvar (`showSaveFilePicker`)**
  *Requer alterar a lógica de `export.js` para um modal específico ou API que solicita o caminho do arquivo, invés de forçar download na raiz, além do trigger respectivo em cada slide.*
- [x] **8. Elementos Estáticos da Capa Tornados Editáveis**
  *Refatorar o layout "cover" para amarrar textos como "DESLIZAR" e "Instagram Ready" aos eventos globais do App, e não mais serem *hardcoded*.*
- [x] **9. Controles Manuais (Resize Slider) da Máscara da Imagem**
  *Menu rápido sob o slide contendo input range para aumentar/diminuir apenas a região da imagem ou overlay do card respectivo.*

---

## 🔴 Nível Alto (High Effort & Complexity)
Requerem reestruturação do "Data Flow" (modo que a informação viaja entre componentes). Exigem alta atenção para que a aplicação não sofra quedas bruscas de performance ao re-renderizar em tempo real.

- [x] **3. Range Sliders para Personalização Isolada (Título, Headline)**
  *Desacoplar o atual redimensionamento global para um específico e embutir propriedades em cada objeto de "slide" (escalas, posições finas por id) injetando do menu inferior as edições contextuais.*
- [x] **5. Seleção e Edição Inteligente no Painel Esquerdo (Inspetor de Propriedades)**
  *Lógica "On Click no Canvas -> Muda Sidebar Config Sidebar Inspector". Criar painel esquerdo contextual de propriedades do item clicado para modificar Cor, Negrito, Alinhamento, etc., sincronizado com o Master State.*
- [x] **10. Info-Tag de Coordenadas Globais [X, Y, L, A] em Tempo Real**
  *Fazer os hooks de `useDragResize` injetarem ou comunicarem assincronamente as strings (top, left, width, height) para a view de baixo do slide de maneira eficiente parando re-renders colaterais indesejáveis.*

---

**Nota ao Usuário:** A sua aprovação é necessária. Podemos iniciar a prioridade que preferir. Sugiro limparmos e fazermos o deploy dos Quick Wins (Níveis Baixos e subirmos progressivamente de nível). Como deseja prosseguir?
