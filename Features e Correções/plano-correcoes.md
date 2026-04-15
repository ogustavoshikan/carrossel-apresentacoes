# Plano de Implementação e Correções do Carrossel Studio

Este documento detalha o plano de execução para resolver os apontamentos listados no arquivo `Features & Correções.txt`.

## Análise de Viabilidade

Todos os pontos são viáveis e não requerem mudanças estruturais drásticas.
A adição de telas de "Em breve!" no painel principal afetará principalmente a camada de exibição condicional (Workspace) quando as opções da barra lateral forem ativadas, em vez de simplesmente disparar uma notificação.
A redução das transições será focada em ajustes de classes CSS do Tailwind, priorizando a estabilidade visual.

## Matriz de Complexidade

- **Baixa**: Exibir tela centralizada "Em breve!" para o menu "Auto-Post".
- **Baixa**: Exibir tela centralizada "Em breve!" para o menu "Mídia".
- **Média**: Adaptação global das configurações de animação e duração (ex: classes do tailwind `duration-*`) para um tempo máximo em torno de 150ms sem perder a fluidez elegante da UI.

## Proposta de Execução (Checklist)

- [ ] **1. Ajuste do Comportamento - "Auto-Post"**
  - [ ] Interceptar a ação de clique do "Auto-Post" na Sidebar.
  - [ ] Desativar o toast (notificação pequena) da ação.
  - [ ] Renderizar no container principal uma View (Empty State) escrita "Em breve!" usando o layout system do painel.
- [ ] **2. Ajuste do Comportamento - "Mídia"**
  - [ ] Interceptar a ação de clique do "Mídia" na Sidebar.
  - [ ] Desativar o toast correspondente.
  - [ ] Reutilizar a View descrita acima para renderizar "Em breve!" no espaço do Workspace.
- [ ] **3. Normalização das Animações para <= 150ms**
  - [ ] Buscar no projeto as classes Tailwind excessivamente longas (ex: `duration-300`, `duration-500`, `duration-700`, `duration-1000`).
  - [ ] Substituir massivamente as ocorrências problemáticas por classes balanceadas (ex: `duration-150` padrão tailwind caso configurado ou customizações para o meio termo em MS, normalmente `duration-150`).
  - [ ] Validar sliders, popovers e modais (headless ui/radix/shadcn) para garantir que permaneçam snappys e suaves.
- [ ] **4. Remoção do Lapso Visual Branco (Focus/Active) nos Botões Superiores**
  - [ ] Inspecionar os botões do menu ("Direção", "Layouts", "Post", "Mídia").
  - [ ] Remover ou sobrescrever propriedades de foco/outline (ex: `focus:ring-white`, `focus:bg-white/10` ou outline nativo) que causam a tela piscar ou foco indesejado.
- [ ] **5. Correção da Barra Vertical no Hover (Canto Esquerdo)**
  - [ ] Inspecionar os containers do painel esquerdo na área de scroll.
  - [ ] Identificar e corrigir o possível brilho de scrollbar customizada (`::-webkit-scrollbar`) ou borda de `hover:` que aparece colada à esquerda.
- [ ] **6. Remoção de Shadow no Toggle "ON/OFF"**
  - [ ] Localizar o botão/toggle correspondente à ativação do "Handle (Arroba)".
  - [ ] Remover a classe de sombra (ex: `shadow-md`, `drop-shadow` ou sombras coloridas) mantendo apenas o background state.

---
*Plano atualizado com os 3 novos pontos visuais inseridos. Em execução.*
