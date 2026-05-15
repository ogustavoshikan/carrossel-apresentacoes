# Carrossel Studio — v4.0 Gold Edition 🎨✨

**Carrossel Studio** é a ferramenta definitiva para criação de carrosséis premium para Instagram, focado em alta conversão e design de elite. Desenvolvido para transformar temas e ideias em narrativas visuais sofisticadas através de Inteligência Artificial generativa v4.0.

---

## 🚀 O que é o Carrossel Studio?

O Carrossel Studio - Criação Inteligente de Conteúdo é a evolução de uma ferramenta pensada para diretores de arte, criadores de conteúdo e marcas que não abrem mão da qualidade. Ele automatiza a criação de carrosséis complexos, cuidando do copywriting (tom de voz irônico, ácido e premium) e da composição visual.

### Principais Diferenciais:
- **IA Generativa Dual**: Suporte nativo para **Google Gemini** e **OpenAI (GPT-4o)** para textos, e **Imagen/DALL-E** para imagens.
- **Ecossistema de Design**: Mais de 115 variações de design distribuídas em 7 categorias de layouts.
- **Design System Centralizado**: Controle total sobre tipografia (Outfit, Playfair Display, etc.), cores de marca e bordas.
- **Exportação de Alta Qualidade**: Exportação direta para PNG pronta para publicação.
- **Workflow Inteligente**: Gere um carrossel inteiro em segundos ou monte slide por slide manualmente.

---

## 🛠️ Stack Tecnológica

- **Framework**: [React 19](https://react.dev/) (Última versão, alta performance)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Estilização**: [Tailwind CSS 3.4](https://tailwindcss.com/) com tokens customizados.
- **Utilitário de Classes**: `cn()` via `clsx` + `tailwind-merge` (padrão para classes condicionais).
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Exportação**: `html-to-image` (Carregamento on-demand para performance)
- **APIs de Imagem**: Unsplash, Pexels, Pixabay integrados.

---

## 📐 Estrutura do Projeto

```bash
src/
├── components/
│   ├── sidebar/       # Controles de configuração e seleção de layouts
│   ├── slides/        # Implementação visual e variantes (Cover, Split, etc.)
│   ├── workspace/     # Toolbar, visualizador em tempo real e editores inline
│   └── ...            # SplashScreenCinematic, Modais de Configuração
├── hooks/             # Custom hooks (ex: useDragResize para manipulação visual)
├── lib/               # O "Coração" do design: tokens, favoritos e templates
├── services/          # Conectores de IA (Gemini/OpenAI) e busca de imagens
└── App.jsx            # Orquestrador de estado e interface principal
```

---

## 💎 Inventário de Layouts e Variantes

O Carrossel Studio possui uma biblioteca vasta de designs pré-configurados. Cada layout principal possui múltiplas variantes que podem ser alternadas instantaneamente.

| Layout | Descrição | Variantes | Arquivo de Referência |
| :--- | :--- | :---: | :--- |
| **Cover** | Slide de abertura de alto impacto | **46** | `cover-variants.jsx` |
| **Content Split** | Divisão imagem/texto informativa | **30** | `split-variants.jsx` |
| **List** | Listas e benefícios estruturados | **30** | `list-variants.jsx` |
| **Comparison** | Tabela "Mercado vs Sua Marca" | **23** | `comparison-variants.jsx` |
| **CTA** | Call to Action (Fechamento) | **18** | `cta-variants.jsx` |
| **Big Number** | Foco em dados e estatísticas | **13** | `bignumber-variants.jsx` |
| **Quote** | Citações e frases de autoridade | **12** | `quote-variants.jsx` |

---

## ⚙️ Configuração e Instalação

### Pré-requisitos
- Node.js (v18 ou superior)
- Chave de API do Google Gemini ou OpenAI (configuráveis no Settings dentro do App)

### Instalação
1. Clone o repositório:
   ```bash
   git clone [url-do-repositorio]
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

---

## 💡 Como Usar (Referência para IA e Devs)

1.  **Orquestração de Variantes**: Para trocar o design de um slide, altere a propriedade `variantIndex` no estado do slide. Cada componente de slide (ex: `SlideCover`) consome sua respectiva variante de `cover-variants.jsx`.
2.  **Modo IA**: O serviço `ai.js` utiliza prompts otimizados para sugerir layouts baseados no conteúdo.
3.  **Personalização de Marca**: O objeto `BRAND_DEFAULTS` em `lib/design-tokens.js` define o estado inicial de handle, cores e fontes.
4.  **Edição Direta**: Componentes usam `contentEditable` com sincronização via `onTextChange`.

---

## 📄 Notas de Legado

- O arquivo `carrossel_premium_doces.jsx` na raiz é mantido apenas como referência histórica do monólito original que deu origem a esta arquitetura modular v4.0.

---

Desenvolvido com ❤️ pela **Equipe Carrossel Studio**.
