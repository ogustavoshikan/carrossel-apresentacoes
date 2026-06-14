# Relatório de Auditoria: Escalabilidade V2 do Canvas Editor

Olá! Aqui é a **Alice**, atuando como sua **Staff Graphics & System Architect**.

Abaixo apresento a **Auditoria de Escalabilidade V2** para o nosso Canvas Editor. O objetivo desta auditoria é analisar se a arquitetura desenhada nas stores e tipagens da **Fase 0** e no planejamento da **Fase 1** possui elasticidade suficiente para suportar recursos avançados de design a nível de mercado (como Adobe Express, Figma e Canva) sem a necessidade de refatorações destrutivas futuras.

---

## 1. O que está Correto (Fundações Sólidas) ✅

*   **Sistema de Layers baseada em Ordem de Array**:
    *   *Por que está correto*: No canvas do Konva, o empilhamento 2D segue a ordem de declaração dos nós. Usar a indexação do array `elements` para zIndex é o padrão da indústria gráfica. No painel lateral de Camadas (Layers Panel), basta renderizar a lista em ordem reversa (o último elemento do array, que é o que fica no topo do canvas, aparece no topo da lista visual).
*   **Decouplagem de UI e Negócio (`useUIStore` vs `useCanvasStore`)**:
    *   Esta decisão foi o divisor de águas. O estado visual (menus fechados, aba ativa, réguas, cursor) pode flutuar e ser modificado a 60fps sem tocar nas coordenadas dos elementos ou sujar a pilha de histórico.
*   **Preparação de Grupos via `parentId`**:
    *   Adicionar o campo `parentId` na especificação V1 garante que, quando implementarmos agrupamentos aninhados na V2, a árvore de dados continuará intacta. O motor apenas agrupará nós que compartilham o mesmo pai lógico em um contêiner `<Group>` do Konva.
*   **Multi-slide Escalável por Stage Único**:
    *   A premissa estabelecida na auditoria de Fase 0 (renderizar apenas o slide ativo no Stage físico e cachear as miniaturas em formato leve de imagem) garante que o app escale para **50 slides** com consumo estável de memória RAM.

---

## 2. O que Precisa ser Ajustado Agora (V1) ⚙️

*   **Tipagem Flexível de Efeitos Gráficos em `BaseElement`**:
    *   *Inconsistência*: Nossa tipagem atual em `src/types/editor.ts` não possui chaves genéricas de efeitos visuais (sombras, bordas, filtros). Se começarmos a desenhar elementos sem prever essas chaves de forma estruturada, a V2 exigirá migração de dados de todos os carrosséis salvos.
    *   *Ajuste Técnico*: Adicionar um campo opcional `effects?: ElementEffects` na interface `BaseElement` para acomodar sombras e bordas desde já de forma opcional.

---

## 3. O que Pode Esperar para a V2 (Evoluções Seguras) ⏳

*   **Biblioteca com Milhares de Assets (Badges, SVGs, Ícones)**:
    *   *Por que pode esperar*: O JSON dos elementos armazena apenas metadados (como uma URL estática do asset). Um painel com milhares de ícones só exige lazy-loading e paginação de API do lado do servidor (banco de dados), não afetando a store local do Zustand.
*   **Snap Guides Avançados (Colisão Relativa)**:
    *   A atração magnética em relação a outros elementos da tela exige iterações exponenciais no arraste (`O(N^2)`). Pode esperar a V2, pois as guias básicas de centro e bordas de página cobrem 90% da ergonomia de V1.
*   **Nested Groups (Grupos dentro de Grupos)**:
    *   Embora a tipagem `parentId` suporte isso de forma infinita (um grupo pode ser filho de outro grupo), a interface gráfica para selecionar elementos dentro de subgrupos (clique profundo) exige gerenciamento complexo de cliques que deve ser programado na V2.

---

## 4. O que Pode Gerar Dívida Técnica Futura (Pontos de Atenção) ⚠️

*   **Redundância de Google Fonts (Latência de Rede)**:
    *   *Risco*: Se cada nó de texto forçar de forma independente o download do arquivo de fonte (Google Fonts), teremos requisições redundantes de rede e piscadas (`FOUC - Flash of Unstyled Text`).
    *   *Mitigação*: Na V2, precisaremos de um **Font Registry Service** global (uma classe singleton ou hook especializado) que registra quais fontes já estão ativas no documento e impede downloads duplicados.
*   **Dessincronização de zIndex Híbrido (Templates + Canvas)**:
    *   *Risco*: Na estratégia híbrida aprovada, o template JSX roda no fundo (HTML) e os elementos livres rodam por cima (Konva). O usuário **nunca** conseguirá enviar um elemento livre para trás de um elemento do próprio template original do fundo.
    *   *Mitigação*: Este é um comportamento aceito para o MVP V1. No entanto, é uma dívida técnica consciente que só será eliminada na Fase 8 pós-MVP, quando implementarmos o parser automático que converte os elementos do template em nós nativos do Canvas.

---

## 5. Nota Geral da Arquitetura de 0 a 10 🏆

### **Nota: 9.5 / 10** (Excelente)

A arquitetura do Canvas Editor do **Carrossel Studio** está extremamente robusta e profissional. A separação estrita de stores no Zustand, o planejamento de renderização imperativa com Konva Refs e a estratégia híbrida de overlay criam uma fundação altamente otimizada, performática e livre de royalties. 

Com as mitigações aplicadas, o sistema está pronto para ser desenvolvido com segurança absoluta contra retrabalhos.

*Alice, Staff Architect.*
