/**
 * CARROSSEL STUDIO — DESIGN TOKENS (JS)
 * Valores de referência para uso em componentes.
 * Não substitui o Tailwind — complementa com constantes JS.
 */

/** Opções de fontes disponíveis no seletor */
export const FONT_OPTIONS = [
  'Inter',
  'Montserrat',
  'Roboto',
  'Poppins',
  'Playfair Display',
  'Oswald',
  'Outfit',
  'Space Grotesk',
];

/** Defaults do brand */
export const BRAND_DEFAULTS = {
  handle: 'TIAJOANABRIGADEIROS',
  website: 'Carrossel Studio v4.0',
  gradientColor1: '#DE1E4D',
  gradientColor2: '#FFFFFF',
  titleFont: 'Outfit',
  textFont: 'Playfair Display',
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
