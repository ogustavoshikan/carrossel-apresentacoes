/**
 * CARROSSEL STUDIO — DESIGN TOKENS (JS)
 * Valores de referência para uso em componentes.
 * Não substitui o Tailwind — complementa com constantes JS.
 */

/** Opções de fontes disponíveis no seletor */
export const FONT_OPTIONS = [
  // Sans-Serif (Modernas e Limpas)
  'Alexandria',
  'Arial MT Pro',
  'DM Sans',
  'Inter',
  'Josefin Sans',
  'Montserrat',
  'Montserrat Alternates',
  'Open Sans',
  'Outfit',
  'Poppins',
  'Public Sans',
  'Raleway',
  'Roboto',
  'Space Grotesk',
  'Tenor Sans',
  // Display / Impacto
  'Anton',
  'Bebas Neue',
  'Oswald',
  // Serifadas (Elegantes / Premium / Luxo)
  'Belleza',
  'Bodoni Moda',
  'Cardo',
  'Cinzel',
  'Cormorant Garamond',
  'Crimson Text',
  'DM Serif Display',
  'EB Garamond',
  'Forum',
  'Fraunces',
  'Gloock',
  'Italiana',
  'Libre Baskerville',
  'Libre Caslon Display',
  'Lora',
  'Marcellus',
  'Merriweather',
  'Playfair Display',
  'Prata',
  'Spectral',
];

/** Fontes que são locais ou do sistema e não devem ser requisitadas ao Google Fonts */
export const SYSTEM_FONTS = [
  'Arial MT Pro',
];

/** Mapeamento de pesos válidos por família para evitar erro 400 na API do Google Fonts */
export const GOOGLE_FONTS_WEIGHTS = {
  'Alexandria': '300;400;500;600;700',
  'Anton': '400',
  'Bebas Neue': '400',
  'Belleza': '400',
  'Bodoni Moda': '400..900',
  'Cardo': '400;700',
  'Cinzel': '400;700;900',
  'Cormorant Garamond': '300..700',
  'Crimson Text': '400;600;700',
  'DM Sans': '400;700',
  'DM Serif Display': '400',
  'EB Garamond': '400..800',
  'Forum': '400',
  'Fraunces': '9..144,300..900',
  'Gloock': '400',
  'Inter': '300;400;500;600',
  'Italiana': '400',
  'Josefin Sans': '100..700',
  'Libre Baskerville': '400;700',
  'Libre Caslon Display': '400',
  'Lora': '400..700',
  'Marcellus': '400',
  'Merriweather': '400;700',
  'Montserrat': '300..700',
  'Montserrat Alternates': '300..700',
  'Open Sans': '300;400;700',
  'Oswald': '300;400;500;600;700',
  'Outfit': '400;500;700;800;900',
  'Poppins': '300;400;500;600;700',
  'Public Sans': '300;400;500;600;700',
  'Raleway': '300;400;500;600;700',
  'Roboto': '300;400;500;700',
  'Space Grotesk': '300;400;500;600;700',
  'Spectral': '200..800',
  'Tenor Sans': '400',
};

/** Defaults do brand */
export const BRAND_DEFAULTS = {
  handle: 'MARICONFEITARIA',
  website: 'Carrossel Studio - Criação Inteligente de Conteúdo',
  gradientColor1: '#DE1E4D',
  gradientColor2: '#FFFFFF',
  titleFont: 'Outfit',
  textFont: 'Playfair Display',
  headerFont: 'Inter',
  isVerified: true,
  swipeText: 'Deslize para adoçar o dia',
};

/** Dimensões do card de slide */
export const SLIDE_DIMENSIONS = {
  width: 400,
  height: 500,
};

/** Limites de escala do slide count */
export const SLIDE_COUNT_RANGE = {
  min: 4,
  max: 10,
  default: 6,
};

/** Scale range para tipografia */
export const FONT_SCALE_RANGE = {
  min: 50,
  max: 150,
  default: 100,
};
