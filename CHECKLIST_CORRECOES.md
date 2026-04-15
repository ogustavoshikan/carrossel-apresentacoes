# Checklist Técnico - Carrossel Studio (REVISÃO RIGOROSA)

Este documento marca o progresso das correções solicitadas.

## 🚀 Progresso

- [x] **1. Remoção de Shadow no Toggle "ON/OFF"** (Baixa)
  - [x] Removida sombra do botão `ON/OFF` do Brand Handle no `ConfigSidebar.jsx`.
  - [x] Garantido `shadow-none` em todos os switches de toggle.
- [x] **2. Correção da Barra Vertical no Item Ativo** (Baixa)
  - [x] Barra indicadora no `GlobalSidebar.jsx` movida de `left-1` para `left-2` (desgrudada da borda).
- [x] **3. Remoção do Lapso Visual Branco** (Baixa)
  - [x] Substituídos backgrounds `bg-white/5` e `bg-white/10` por `bg-surface-input` variants em todo o projeto via script robusto.
- [x] **4. Telas "Em breve!" (Auto-Post e Mídia)** (Média)
  - [x] Implementado componente `ComingSoon.jsx` e integrado ao `App.jsx`.
- [x] **5. Otimização Global de Animações (Limite 150ms)** (Média)
  - [x] Todas as classes `duration-` superiores a 150ms foram convertidas para `duration-150` via script global em todos os arquivos `.jsx`.

---
*Alice Studio v3.2 - Sistema de Qualidade (Revisado)*
