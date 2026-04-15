# Implementation Plan: Correções de UI, Animações e Ajustes Visuais

## 1. Objective
Implementar correções de interface e otimizações de performance baseadas no arquivo `Features & Correções.txt` e nas imagens de referência, garantindo fluidez e uma melhor experiência de usuário no painel lateral.

## 2. Scope & Impact
- **Painel Lateral (`GlobalSidebar.jsx` e `ConfigSidebar.jsx`):** Interceptar cliques em "Auto-Post" e "Mídia" para exibir um aviso de "Em breve!" em vez de navegar para telas inacabadas.
- **Animações (Global):** Limitar o tempo máximo das transições do Tailwind (ex: `duration-200`, `duration-300`, `duration-500`) para `duration-150` em todo o projeto, e ajustar `index.css`.
- **Ajustes Visuais:**
  - Remover "Lapso Branco" ajustando as cores de fundo nas transições do painel lateral.
  - Desgrudar a barra vertical indicadora de item ativo (`left-0` para `left-1` ou via margem) no `GlobalSidebar`.
  - **Remover completamente** a sombra (`shadow-lg`) da bolinha interna do Toggle Switch no `ConfigSidebar`.

## 3. Implementation Steps

### Fase 1: Avisos "Em breve!" (Auto-Post e Mídia) [CONCLUÍDO]
- **Modificar `src/App.jsx`:** Adicionada função `handleComingSoon` e repassada via props.
- **Modificar `src/components/GlobalSidebar.jsx`:** Itens interceptados e redirecionados para o alerta.
- **Modificar `src/components/sidebar/ConfigSidebar.jsx`:** Abas interceptadas.

### Fase 2: Otimização de Animações (Limite 150ms) [CONCLUÍDO]
- **Substituição Global:** Todas as classes `duration-200` até `duration-1000` foram convertidas para `duration-150` via script de automação em todos os arquivos `.jsx`.

### Fase 3: Correções Visuais Direcionadas [EM CONCLUSÃO]
- **Correção "Lapso Branco":** Substituindo `bg-white/[0.02]` por `bg-surface-input` ou `bg-surface-dark`.
- **Correção "Barra Vertical":** Alterado `left-0` para `left-1` e `rounded-r-full` para `rounded-full` no `GlobalSidebar`.
- **Correção "Toggle Shadow":** Removida a classe `shadow-lg` de todos os seletores de switch.

## 4. Verification & Testing
1. **Verificação de Clique:** Confirmado alerta "Em breve!".
2. **Verificação de Performance:** App operando com transições de 150ms.
3. **Verificação Visual:** Confirmada barra flutuante e remoção de sombras.