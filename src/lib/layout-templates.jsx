import React from 'react';

/**
 * Mini wireframes SVG — reutilizados em diversos componentes do Carrossel Studio.
 */
export const LAYOUT_ICONS = {
  cover: (
    <svg viewBox="0 0 40 50" fill="none" className="w-full h-full">
      <rect width="40" height="50" fill="#1a1a2e" />
      <rect x="4" y="4" width="32" height="24" rx="2" fill="#2a2a4e" />
      <rect x="8" y="32" width="24" height="4" rx="1" fill="#5b5bdb" />
      <rect x="12" y="39" width="16" height="2.5" rx="1" fill="#3a3a5e" />
      <rect x="14" y="43" width="12" height="2" rx="1" fill="#2a2a4e" />
    </svg>
  ),
  'content-split': (
    <svg viewBox="0 0 40 50" fill="none" className="w-full h-full">
      <rect width="40" height="50" fill="#1a1a2e" />
      <rect x="4" y="4" width="32" height="20" rx="2" fill="#2a2a4e" />
      <rect x="6" y="28" width="10" height="2.5" rx="1" fill="#5b5bdb" />
      <rect x="4" y="33" width="32" height="3" rx="1" fill="#3a3a5e" />
      <rect x="4" y="38" width="28" height="2.5" rx="1" fill="#3a3a5e" />
      <rect x="4" y="43" width="20" height="2.5" rx="1" fill="#3a3a5e" />
    </svg>
  ),
  'big-number': (
    <svg viewBox="0 0 40 50" fill="none" className="w-full h-full">
      <rect width="40" height="50" fill="#1a1a2e" />
      <rect x="4" y="4" width="32" height="14" rx="2" fill="#2a2a4e" />
      <rect x="8" y="22" width="24" height="12" rx="2" fill="#5b5bdb" opacity="0.4" />
      <rect x="12" y="25" width="16" height="6" rx="1" fill="#5b5bdb" />
      <rect x="8" y="38" width="24" height="2.5" rx="1" fill="#3a3a5e" />
      <rect x="10" y="43" width="20" height="2" rx="1" fill="#2a2a4e" />
    </svg>
  ),
  quote: (
    <svg viewBox="0 0 40 50" fill="none" className="w-full h-full">
      <rect width="40" height="50" fill="#1a1a2e" />
      <text x="7" y="22" fontSize="18" fill="#5b5bdb" fontFamily="serif">"</text>
      <rect x="8" y="24" width="24" height="2.5" rx="1" fill="#4a4a7e" />
      <rect x="8" y="29" width="20" height="2.5" rx="1" fill="#4a4a7e" />
      <rect x="8" y="34" width="22" height="2.5" rx="1" fill="#4a4a7e" />
      <rect x="14" y="41" width="12" height="2" rx="1" fill="#3a3a5e" />
    </svg>
  ),
  comparison: (
    <svg viewBox="0 0 40 50" fill="none" className="w-full h-full">
      <rect width="40" height="50" fill="#1a1a2e" />
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
      <rect width="40" height="50" fill="#1a1a2e" />
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
      <rect width="40" height="50" fill="#1a1a2e" />
      <rect x="8" y="8" width="24" height="4" rx="1" fill="#5b5bdb" />
      <rect x="4" y="16" width="32" height="2.5" rx="1" fill="#3a3a5e" />
      <rect x="6" y="21" width="28" height="2.5" rx="1" fill="#3a3a5e" />
      <rect x="8" y="33" width="24" height="9" rx="3" fill="#5b5bdb" />
      <rect x="12" y="36" width="16" height="3" rx="1" fill="#fff" opacity="0.7" />
    </svg>
  ),
  sequence: (
    <svg viewBox="0 0 40 50" fill="none" className="w-full h-full">
      <rect width="40" height="50" fill="#1a1a2e" />
      <rect x="4" y="38" width="32" height="2" rx="1" fill="#3a3a5e" />
      <rect x="4" y="38" width="12" height="2" rx="1" fill="#5b5bdb" />
      <rect x="4" y="10" width="24" height="5" rx="1" fill="#2a2a4e" />
      <rect x="4" y="18" width="32" height="3" rx="1" fill="#5b5bdb" />
      <rect x="4" y="24" width="28" height="2" rx="1" fill="#3a3a5e" />
      <rect x="4" y="28" width="20" height="2" rx="1" fill="#3a3a5e" />
    </svg>
  ),
  'cover-extra': (
    <svg viewBox="0 0 40 50" fill="none" className="w-full h-full">
      <rect width="40" height="50" fill="#1a1a2e" />
      <rect x="4" y="4" width="32" height="26" rx="2" fill="#2a2a4e" />
      <rect x="4" y="4" width="32" height="26" rx="2" fill="none" stroke="#5b5bdb" strokeWidth="1.5" />
      <rect x="8" y="28" width="24" height="4" rx="1" fill="#5b5bdb" />
      <rect x="6" y="35" width="14" height="2" rx="1" fill="#3a3a5e" />
      <rect x="6" y="40" width="10" height="2" rx="1" fill="#2a2a4e" />
      <circle cx="32" cy="42" r="4" fill="#5b5bdb" />
    </svg>
  ),
  'cta-extra': (
    <svg viewBox="0 0 40 50" fill="none" className="w-full h-full">
      <rect width="40" height="50" fill="#1a1a2e" />
      <rect x="8" y="8" width="24" height="4" rx="1" fill="#5b5bdb" />
      <rect x="4" y="16" width="32" height="2.5" rx="1" fill="#3a3a5e" />
      <rect x="6" y="21" width="28" height="2.5" rx="1" fill="#3a3a5e" />
      <rect x="8" y="33" width="24" height="9" rx="3" fill="none" stroke="#5b5bdb" strokeWidth="1.5" />
      <rect x="12" y="36" width="16" height="3" rx="1" fill="#fff" opacity="0.4" />
    </svg>
  ),
};

/**
 * CARROSSEL STUDIO — TEMPLATES DE LAYOUT
 * Templates padrão para inserção manual de slides no canvas.
 * Campos obrigatórios de cada layout, pré-preenchidos com placeholders.
 */

export const LAYOUT_TEMPLATES = {
  cover: {
    layout: 'cover',
    titulo: 'TÍTULO DE\nIMPACTO',
    texto_apoio: 'Subtítulo descritivo e convidativo',
    sugestao_visual: 'Imagem de destaque do produto',
    imageUrl: 'https://passaportefeliz.com.br/wp-content/uploads/2020/09/Trufas-de-Chocolate-750x1000.jpg',
    tag: '',
    items: [],
  },

  'content-split': {
    layout: 'content-split',
    titulo: 'Título do Conteúdo',
    texto_apoio: 'Descrição detalhada e envolvente do conteúdo deste slide.',
    sugestao_visual: 'Foto do produto em destaque',
    imageUrl: 'https://images.weserv.nl/?url=https://www.contioutra.com/content/uploads/2025/06/Qual-e-o-doce-mais-gostoso-do-mundo--696x418.png',
    tag: 'DICA',
    items: [],
  },

  'big-number': {
    layout: 'big-number',
    titulo: '100%',
    texto_apoio: 'Descrição do número de impacto e o que ele representa.',
    sugestao_visual: 'Imagem relacionada ao dado',
    imageUrl: 'https://passaportefeliz.com.br/wp-content/uploads/2020/09/Trufas-de-Chocolate-750x1000.jpg',
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
    titulo: 'Qualidade Superior',
    texto_apoio: '',
    sugestao_visual: '',
    imageUrl: '',
    tag: '',
    items: [
      { label: 'O COMUM', value: 'Achocolatado com açúcar', highlight: false },
      { label: 'O PREMIUM', value: 'Cacau 100% + manteiga', highlight: true },
      { label: 'Mercado', value: 'Gordura hidrogenada', highlight: false },
      { label: 'Nós', value: 'Sabor real de chocolate', highlight: true },
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
    imageUrl: 'https://passaportefeliz.com.br/wp-content/uploads/2020/09/Trufas-de-Chocolate-750x1000.jpg',
    tag: 'ENCOMENDAR',
    items: [],
  },

  sequence: {
    layout: 'sequence',
    titulo: 'O PASSO\nPRINCIPAL',
    texto_apoio: 'Descreva aqui o processo detalhado desta etapa da sua sequência.',
    sugestao_visual: '',
    imageUrl: '',
    tag: 'DICA',
    items: [],
  },

  'cover-extra': {
    layout: 'cover',
    titulo: 'TOP 5',
    texto_apoio: 'Subtítulo descritivo e convidativo',
    sugestao_visual: 'Imagem de destaque do produto',
    imageUrl: 'https://passaportefeliz.com.br/wp-content/uploads/2020/09/Trufas-de-Chocolate-750x1000.jpg',
    tag: '',
    items: [],
  },

  'cta-extra': {
    layout: 'cta',
    titulo: 'A sua\nReferência.',
    texto_apoio: 'Se a excelência lhe agrada, sinta-se livre para guardar este manifesto e partilhá-lo com quem tem bom gosto.',
    sugestao_visual: '',
    imageUrl: 'https://passaportefeliz.com.br/wp-content/uploads/2020/09/Trufas-de-Chocolate-750x1000.jpg',
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

  // Mapeia o layout para o campo de variante correspondente no Carrossel Studio
  const variantFields = {
    'cover': 'coverVariantIndex',
    'cover-extra': 'coverVariantIndex',
    'content-split': 'splitVariantIndex',
    'big-number': 'bigNumberVariantIndex',
    'quote': 'quoteVariantIndex',
    'comparison': 'comparisonVariantIndex',
    'cta': 'ctaVariantIndex',
    'cta-extra': 'ctaVariantIndex',
    'list': 'listVariantIndex',
    'sequence': 'sequenceVariantIndex',
  };

  const field = variantFields[layoutType];
  if (field && variantIndex !== undefined) {
    slide[field] = variantIndex;
  }

  // Pre-configura texto específico para a variante 120 de CTA Extra
  if (layoutType === 'cta-extra' && variantIndex === 120) {
    slide.texto_apoio = 'Fim da Experiência';
  }

  // Pre-configura texto específico para a variante 142 de CTA Extra
  if (layoutType === 'cta-extra' && variantIndex === 142) {
    slide.titulo = 'AÇÃO FINAL';
    slide.texto_apoio = 'A sua interação importa.';
  }

  // Pre-configura imagem de fundo para variantes específicas de Capa (Cover) ou CTA
  if ((layoutType === 'cover' || layoutType === 'cta' || layoutType === 'cover-extra' || layoutType === 'cta-extra') && [4, 5, 53, 60, 61, 109, 118, 119, 125, 126, 127, 130, 133, 135, 138, 140, 143, 149].includes(variantIndex)) {
    slide.imageUrl = 'https://images.weserv.nl/?url=https://www.contioutra.com/content/uploads/2025/06/Qual-e-o-doce-mais-gostoso-do-mundo--696x418.png';
  }

  // Pre-configura imagem de fundo específica para as variantes solicitadas (Dia das Mães)
  if ((layoutType === 'cover' || layoutType === 'cta' || layoutType === 'cover-extra' || layoutType === 'cta-extra') && [2, 3, 12, 14, 17, 23, 33, 35, 36, 49, 51].includes(variantIndex)) {
    slide.imageUrl = 'https://images.weserv.nl/?url=https://minhasreceitinhas.com.br/wp-content/uploads/2023/04/receitas-de-docinhos-caseiros-dia-das-maes-1.jpg';
  }

  if ((layoutType === 'cover' || layoutType === 'cta' || layoutType === 'cover-extra' || layoutType === 'cta-extra') && [0, 1, 7, 8, 40, 41, 42, 48, 55, 56, 102, 103, 106, 112, 113, 116, 128, 129, 131, 132, 134, 136, 137, 139, 141, 142, 144, 145, 146, 147, 152, 154, 158, 161, 162].includes(variantIndex)) {
    slide.imageUrl = 'https://images.weserv.nl/?url=https://tudosobrebrigadeirogourmet.com/wp-content/uploads/2016/11/13-receitas-de-brigadeiros-gourmet-faceis.webp';
  }

  if ((layoutType === 'cover' || layoutType === 'cta' || layoutType === 'cover-extra' || layoutType === 'cta-extra') && [24, 101, 104, 107, 110, 115, 117, 120, 121, 137, 140, 141, 145, 146, 148, 150, 151, 153, 155, 156, 157, 159, 160, 163, 164].includes(variantIndex)) {
    slide.imageUrl = 'https://images.weserv.nl/?url=https://tudosobrebrigadeirogourmet.com/wp-content/uploads/2018/02/ganhar-dinheiro-vendendo-brigadeiro.webp';
  }


  if ((layoutType === 'cover' || layoutType === 'cover-extra') && [105, 108, 111, 114].includes(variantIndex)) {
    slide.imageUrl = 'https://images.weserv.nl/?url=https://blogdeconfeitaria.com/wp-content/uploads/2024/10/caixa-brigadeiros-gourmet-variados-venda.jpg';
  }

  if ((layoutType === 'cover' || layoutType === 'cover-extra' || layoutType === 'cta' || layoutType === 'cta-extra') && [6, 11, 18, 20, 32, 34, 37, 38, 43, 50, 52, 57, 58, 59, 123, 126, 129].includes(variantIndex)) {
    slide.imageUrl = 'https://images.weserv.nl/?url=https://blogdeconfeitaria.com/wp-content/uploads/2024/10/brigadeiro-leite-ninho-com-nutella.jpg';
  }

  // Pre-configura imagem de fundo para variantes específicas de Quote
  if (layoutType === 'quote' && [1, 2, 4, 5, 6, 7, 8, 9, 10].includes(variantIndex)) {
    slide.imageUrl = 'https://passaportefeliz.com.br/wp-content/uploads/2020/09/Trufas-de-Chocolate-750x1000.jpg';
  }

  // Pre-configura imagem de fundo para Split Variants (content-split)
  if (layoutType === 'content-split') {
    const splitIndicesToUpdate = [0, 1, 3, 7, 8, 9, 12, 13, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 40, 42, 43, 44, 45, 48, 50, 51, 52, 54, 56, 57, 59, 60, 61, 67, 69, 70, 72, 74];
    const newSpecialIndices = [36, 38, 41, 47, 53, 58, 62, 68, 71, 73, 75];
    const motherDayIndices = [46, 63];

    if (splitIndicesToUpdate.includes(variantIndex)) {
      slide.imageUrl = 'https://images.weserv.nl/?url=https://www.contioutra.com/content/uploads/2025/06/Qual-e-o-doce-mais-gostoso-do-mundo--696x418.png';
    } else if (newSpecialIndices.includes(variantIndex)) {
      slide.imageUrl = 'https://tudosobrebrigadeirogourmet.com/wp-content/uploads/2016/11/13-receitas-de-brigadeiros-gourmet-faceis.webp';
    } else if (motherDayIndices.includes(variantIndex)) {
      slide.imageUrl = 'https://minhasreceitinhas.com.br/wp-content/uploads/2023/04/receitas-de-docinhos-caseiros-dia-das-maes-1.jpg';
    } else {
      slide.imageUrl = 'https://passaportefeliz.com.br/wp-content/uploads/2020/09/Trufas-de-Chocolate-750x1000.jpg';
    }
  }

  // Pre-configura imagem de fundo para Big Number Variants
  if (layoutType === 'big-number') {
    slide.imageUrl = 'https://passaportefeliz.com.br/wp-content/uploads/2020/09/Trufas-de-Chocolate-750x1000.jpg';
  }

  // Pre-configura imagem de fundo para variantes específicas de Sequência (Image Anchor, Editorial Split, Cinematic Step, Image Frame, Magazine Bleed, Cinematic Panel, Clean Polaroid, Single Frame, Float Top, Float Bottom e Editorial Capsule)
  if (layoutType === 'sequence' && (variantIndex === 10 || variantIndex === 11 || variantIndex === 12 || variantIndex === 13 || variantIndex === 14 || variantIndex === 18 || variantIndex === 21 || variantIndex === 22 || variantIndex === 25 || variantIndex === 26 || variantIndex === 27)) {
    slide.imageUrl = 'https://tudosobrebrigadeirogourmet.com/wp-content/uploads/2016/11/13-receitas-de-brigadeiros-gourmet-faceis.webp';
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
  {
    key: 'cover-extra',
    label: 'Capas\nExtras',
    description: 'Capas extras com estilos e fontes alternativos',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras104.png'
  },
  {
    key: 'sequence',
    label: 'Sequência',
    description: 'Passo a passo ou fluxo de conteúdo',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence12.png'
  },
  {
    key: 'cta-extra',
    label: 'CTAs\nExtras',
    description: 'CTAs extras com estilos e fontes alternativos',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA/designs_cta18.png'
  },
];
