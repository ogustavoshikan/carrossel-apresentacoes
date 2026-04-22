/**
 * ALICE STUDIO — TEMPLATES DE LAYOUT
 * Templates padrão para inserção manual de slides no canvas.
 * Campos obrigatórios de cada layout, pré-preenchidos com placeholders.
 */

export const LAYOUT_TEMPLATES = {
  cover: {
    layout: 'cover',
    titulo: 'TÍTULO\nDE IMPACTO',
    texto_apoio: 'Subtítulo descritivo e convidativo',
    sugestao_visual: 'Imagem de destaque do produto',
    imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1080',
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
      { label: 'Mercado', value: 'Qualidade comum', highlight: false },
      { label: 'Nós', value: 'Excelência garantida', highlight: true },
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
 * @returns {object} - objeto de slide pronto para inserção
 */
export function createSlideFromTemplate(layoutType, slideNumber) {
  const template = LAYOUT_TEMPLATES[layoutType];
  if (!template) {
    console.warn(`[layout-templates] Layout desconhecido: "${layoutType}"`);
    return null;
  }
  return {
    ...JSON.parse(JSON.stringify(template)), // deep clone
    slide: slideNumber,
  };
}

/** Lista dos 7 layouts com metadados de exibição */
export const LAYOUT_META = [
  { key: 'cover',         label: 'Capa',           description: 'Slide de abertura com imagem de fundo' },
  { key: 'content-split', label: 'Conteúdo',        description: 'Imagem + tag + título + texto' },
  { key: 'big-number',    label: 'Número de Impacto', description: 'Estatística ou dado de destaque' },
  { key: 'quote',         label: 'Citação',         description: 'Frase de impacto com autor' },
  { key: 'comparison',    label: 'Comparação',      description: 'Mercado vs Marca em tabela' },
  { key: 'list',          label: 'Lista',           description: 'Lista estruturada com bullets' },
  { key: 'cta',           label: 'CTA',             description: 'Call to action — slide de fechamento' },
];
