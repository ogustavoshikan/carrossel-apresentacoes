import React from 'react';

/**
 * Mini wireframes SVG — reutilizados em diversos componentes do Alice Studio.
 */
export const LAYOUT_ICONS = {
  cover: (
    <svg viewBox="0 0 40 50" fill="none" className="w-full h-full">
      <rect width="40" height="50" rx="3" fill="#1a1a2e" />
      <rect x="4" y="4" width="32" height="24" rx="2" fill="#2a2a4e" />
      <rect x="8" y="32" width="24" height="4" rx="1" fill="#5b5bdb" />
      <rect x="12" y="39" width="16" height="2.5" rx="1" fill="#3a3a5e" />
      <rect x="14" y="43" width="12" height="2" rx="1" fill="#2a2a4e" />
    </svg>
  ),
  'content-split': (
    <svg viewBox="0 0 40 50" fill="none" className="w-full h-full">
      <rect width="40" height="50" rx="3" fill="#1a1a2e" />
      <rect x="4" y="4" width="32" height="20" rx="2" fill="#2a2a4e" />
      <rect x="6" y="28" width="10" height="2.5" rx="1" fill="#5b5bdb" />
      <rect x="4" y="33" width="32" height="3" rx="1" fill="#3a3a5e" />
      <rect x="4" y="38" width="28" height="2.5" rx="1" fill="#3a3a5e" />
      <rect x="4" y="43" width="20" height="2.5" rx="1" fill="#3a3a5e" />
    </svg>
  ),
  'big-number': (
    <svg viewBox="0 0 40 50" fill="none" className="w-full h-full">
      <rect width="40" height="50" rx="3" fill="#1a1a2e" />
      <rect x="4" y="4" width="32" height="14" rx="2" fill="#2a2a4e" />
      <rect x="8" y="22" width="24" height="12" rx="2" fill="#5b5bdb" opacity="0.4" />
      <rect x="12" y="25" width="16" height="6" rx="1" fill="#5b5bdb" />
      <rect x="8" y="38" width="24" height="2.5" rx="1" fill="#3a3a5e" />
      <rect x="10" y="43" width="20" height="2" rx="1" fill="#2a2a4e" />
    </svg>
  ),
  quote: (
    <svg viewBox="0 0 40 50" fill="none" className="w-full h-full">
      <rect width="40" height="50" rx="3" fill="#1a1a2e" />
      <text x="7" y="22" fontSize="18" fill="#5b5bdb" fontFamily="serif">"</text>
      <rect x="8" y="24" width="24" height="2.5" rx="1" fill="#4a4a7e" />
      <rect x="8" y="29" width="20" height="2.5" rx="1" fill="#4a4a7e" />
      <rect x="8" y="34" width="22" height="2.5" rx="1" fill="#4a4a7e" />
      <rect x="14" y="41" width="12" height="2" rx="1" fill="#3a3a5e" />
    </svg>
  ),
  comparison: (
    <svg viewBox="0 0 40 50" fill="none" className="w-full h-full">
      <rect width="40" height="50" rx="3" fill="#1a1a2e" />
      <rect x="4" y="6" width="32" height="3" rx="1" fill="#5b5bdb" />
      <rect x="4" y="14" width="32" height="6" rx="1" fill="#2a2a4e" />
      <rect x="4" y="22" width="32" height="6" rx="1" fill="#3b1f3b" />
      <rect x="24" y="23.5" width="10" height="3" rx="1" fill="#c084fc" />
      <rect x="4" y="30" width="32" height="6" rx="1" fill="#2a2a4e" />
      <rect x="4" y="38" width="32" height="6" rx="1" fill="#3b1f3b" />
      <rect x="24" y="39.5" width="10" height="3" rx="1" fill="#c084fc" />
    </svg>
  ),
  list: (
    <svg viewBox="0 0 40 50" fill="none" className="w-full h-full">
      <rect width="40" height="50" rx="3" fill="#1a1a2e" />
      <rect x="4" y="5" width="24" height="3" rx="1" fill="#5b5bdb" />
      <circle cx="8" cy="17" r="2.5" fill="#5b5bdb" />
      <rect x="13" y="15.5" width="22" height="2" rx="1" fill="#3a3a5e" />
      <circle cx="8" cy="25" r="2.5" fill="#5b5bdb" />
      <rect x="13" y="23.5" width="18" height="2" rx="1" fill="#3a3a5e" />
      <circle cx="8" cy="33" r="2.5" fill="#5b5bdb" />
      <rect x="13" y="31.5" width="20" height="2" rx="1" fill="#3a3a5e" />
      <circle cx="8" cy="41" r="2.5" fill="#5b5bdb" />
      <rect x="13" y="39.5" width="16" height="2" rx="1" fill="#3a3a5e" />
    </svg>
  ),
  cta: (
    <svg viewBox="0 0 40 50" fill="none" className="w-full h-full">
      <rect width="40" height="50" rx="3" fill="#1a1a2e" />
      <rect x="8" y="8" width="24" height="4" rx="1" fill="#5b5bdb" />
      <rect x="4" y="16" width="32" height="2.5" rx="1" fill="#3a3a5e" />
      <rect x="6" y="21" width="28" height="2.5" rx="1" fill="#3a3a5e" />
      <rect x="8" y="33" width="24" height="9" rx="3" fill="#5b5bdb" />
      <rect x="12" y="36" width="16" height="3" rx="1" fill="#fff" opacity="0.7" />
    </svg>
  ),
};

/**
 * ALICE STUDIO — TEMPLATES DE LAYOUT
 * Templates padrão para inserção manual de slides no canvas.
 * Campos obrigatórios de cada layout, pré-preenchidos com placeholders.
 */

export const LAYOUT_TEMPLATES = {
  cover: {
    layout: 'cover',
    titulo: 'TÍTULO DE\nIMPACTO',
    texto_apoio: 'Subtítulo descritivo e convidativo',
    sugestao_visual: 'Imagem de destaque do produto',
    imageUrl: 'https://passaportefeliz.com.br/wp-content/uploads/2020/09/Trufas-de-Chocolate.jpg',
    tag: '',
    items: [],
  },

  'content-split': {
    layout: 'content-split',
    titulo: 'Título do Conteúdo',
    texto_apoio: 'Descrição detalhada e envolvente do conteúdo deste slide.',
    sugestao_visual: 'Foto do produto em destaque',
    imageUrl: 'https://images.unsplash.com/photo-1578985543812-78c002c033b4?q=80&w=1080',
    tag: 'DICA',
    items: [],
  },

  'big-number': {
    layout: 'big-number',
    titulo: '100%',
    texto_apoio: 'Descrição do número de impacto e o que ele representa.',
    sugestao_visual: 'Imagem relacionada ao dado',
    imageUrl: 'https://images.unsplash.com/photo-1532499016263-125a25e81196?q=80&w=1080',
    tag: 'RESULTADO',
    items: [],
  },

  quote: {
    layout: 'quote',
    titulo: 'A frase de impacto que gera conexão emocional com o público.',
    texto_apoio: 'Autor ou fonte da citação',
    sugestao_visual: '',
    imageUrl: '',
    tag: '',
    items: [],
  },

  comparison: {
    layout: 'comparison',
    titulo: 'A diferença que faz toda a diferença',
    texto_apoio: '',
    sugestao_visual: '',
    imageUrl: '',
    tag: '',
    items: [
      { label: 'O COMUM', value: 'Usa achocolatado cheio de açúcar e gordura vegetal hidrogenada.', highlight: false },
      { label: 'O PREMIUM', value: 'Usa cacau 100% belga e manteiga de verdade, derretendo na boca.', highlight: true },
      { label: 'Mercado', value: 'Ingredientes genéricos', highlight: false },
      { label: 'Nós', value: 'Ingredientes premium', highlight: true },
    ],
  },

  list: {
    layout: 'list',
    titulo: 'Por que escolher?',
    texto_apoio: '',
    sugestao_visual: '',
    imageUrl: '',
    tag: '',
    items: [
      { label: '01', text: 'Primeiro benefício de destaque' },
      { label: '02', text: 'Segundo benefício importante' },
      { label: '03', text: 'Terceiro diferencial exclusivo' },
      { label: '04', text: 'Quarto item de texto' },
    ],
  },

  cta: {
    layout: 'cta',
    titulo: 'Pronto para experimentar?',
    texto_apoio: 'Não perca mais tempo. A qualidade que você merece está a um clique de distância.',
    sugestao_visual: '',
    imageUrl: '',
    tag: 'ENCOMENDAR',
    items: [],
  },
};

/**
 * Retorna um template de slide para o layout especificado,
 * já com o campo `slide` definido pela posição de inserção.
 * @param {string} layoutType - chave do layout (ex: 'cover', 'content-split')
 * @param {number} slideNumber - número do slide (1-indexed)
 * @param {number} variantIndex - (opcional) index da variante visual
 * @returns {object} - objeto de slide pronto para inserção
 */
export function createSlideFromTemplate(layoutType, slideNumber, variantIndex = 0) {
  const template = LAYOUT_TEMPLATES[layoutType];
  if (!template) {
    console.warn(`[layout-templates] Layout desconhecido: "${layoutType}"`);
    return null;
  }

  const slide = {
    ...JSON.parse(JSON.stringify(template)), // deep clone
    slide: slideNumber,
  };

  // Mapeia o layout para o campo de variante correspondente no Alice Studio
  const variantFields = {
    'cover': 'coverVariantIndex',
    'content-split': 'splitVariantIndex',
    'big-number': 'bigNumberVariantIndex',
    'quote': 'quoteVariantIndex',
    'comparison': 'comparisonVariantIndex',
    'cta': 'ctaVariantIndex',
    'list': 'listVariantIndex',
  };

  const field = variantFields[layoutType];
  if (field && variantIndex !== undefined) {
    slide[field] = variantIndex;
  }

  // Pre-configura imagem de fundo para variantes específicas de CTA
  if (layoutType === 'cta' && [0, 1, 2, 3, 4, 5, 6, 7, 8, 12, 14].includes(variantIndex)) {
    slide.imageUrl = 'https://images.pexels.com/photos/9285189/pexels-photo-9285189.jpeg';
  }

  return slide;
}

/** Lista dos 7 layouts com metadados de exibição */
export const LAYOUT_META = [
  { 
    key: 'cover', 
    label: 'Capa', 
    description: 'Slide de abertura com imagem de fundo',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/TIAJOANABRIGADEIROS_slide_1%20(14).png'
  },
  { 
    key: 'content-split', 
    label: 'Conteúdo', 
    description: 'Imagem + tag + título + texto',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/wireframe_menu_content-split.png'
  },
  { 
    key: 'big-number', 
    label: 'Número de Impacto', 
    description: 'Estatística ou dado de destaque',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/wireframe_menu_big-number.png'
  },
  { 
    key: 'quote', 
    label: 'Citação', 
    description: 'Frase de impacto com autor',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/wireframe_menu_quote.png'
  },
  { 
    key: 'comparison', 
    label: 'Comparação', 
    description: 'Mercado vs Marca em tabela',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/wireframe_menu_comparison.png'
  },
  { 
    key: 'list', 
    label: 'Lista', 
    description: 'Lista estruturada com bullets',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/wireframe_menu_List.png'
  },
  { 
    key: 'cta', 
    label: 'CTA', 
    description: 'Call to action — slide de fechamento',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/wireframe_menu_CTA.png'
  },
];
