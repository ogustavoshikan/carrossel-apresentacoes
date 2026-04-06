# Alice Studio — v3.2 Final

Editor premium de carrosséis para Instagram com IA generativa (Gemini + Imagen).

## Stack

- **React 19** + **Vite 6**
- **Tailwind CSS 3.4** com tokens de design customizados
- **Lucide React** para ícones
- **html-to-image** para exportação PNG (carregado on demand)

## Estrutura

```
src/
├── lib/              # Tokens de design + utilitários
├── hooks/            # Custom hooks (useDragResize)
├── services/         # Integração com APIs (IA + Exportação)
├── components/
│   ├── slides/       # 7 layouts de slide (Cover, ContentSplit, etc.)
│   ├── sidebar/      # ConfigSidebar
│   ├── workspace/    # Toolbar, VisualPreview, TextEditor, EmptyState
│   ├── smart-element.jsx
│   ├── slide-header.jsx
│   └── slide-renderer.jsx
└── App.jsx           # Orquestrador principal
```

## Desenvolvimento

```bash
npm install
npm run dev
```

## Arquivo Legacy

- `carrossel_premium_doces.jsx` — Monólito original (backup/referência).
