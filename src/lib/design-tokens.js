/**
 * CARROSSEL STUDIO — DESIGN TOKENS (JS)
 * Valores de referência para uso em componentes.
 * Não substitui o Tailwind — complementa com constantes JS.
 */

/** Opções de fontes disponíveis no seletor */
export const FONT_OPTIONS = [
  // Sans-Serif (Modernas e Limpas)
  'Inter',
  'Josefin Sans',
  'Montserrat',
  'Montserrat Alternates',
  'Outfit',
  'Poppins',
  'Raleway',
  'Roboto',
  'Space Grotesk',
  'Tenor Sans',
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
  'Oswald',
  'Playfair Display',
  'Prata',
  'Spectral',
];

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
