import React from 'react';
import { Bookmark, Send, Heart, MessageCircle, CheckCircle2, Instagram, Link2, Sparkles, Share2, ArrowRight, Check, Star, Quote, ChevronRight, CornerRightDown, Feather, CornerDownRight, MoreHorizontal, Crown } from 'lucide-react';
import SmartElement from '../smart-element';
import SlideHeader from '../slide-header';
import { ImageBg } from './cta-variants';

export const CTA_EXTRA_VARIANT_META = [
  {
    id: 101,
    name: 'The Dark Luxury',
    description: 'Foco absoluto em salvar o post. Ícone gigante, fundo escuro.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra101.png' // Add proper thumbnail later
  },
  {
    id: 102,
    name: 'The Editorial Index',
    description: 'Limpo, claro, estruturado como o índice de uma revista de luxo.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra102.png'
  },
  {
    id: 103,
    name: 'The Action Receipt',
    description: 'Estética muito em alta. Engaja visualmente e cria senso de urgência/exclusividade.',
    thumbnailUrl: 'https://wpkufemy?zwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra103.png'
  },
  {
    id: 104,
    name: 'The Cinematic Glass',
    description: 'Altamente visual. Usa a foto do produto por trás de um bloco desfocado.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra104.png'
  },
  {
    id: 105,
    name: 'The Velvet Gradient',
    description: 'Profundo, sem linhas duras, puramente baseado em cor e luz.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra105.png'
  },
  {
    id: 106,
    name: 'The Pure Glass',
    description: 'Imagem de fundo total, com um desfoque massivo no centro. Zero linhas visíveis.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra106.png'
  },
  {
    id: 107,
    name: 'The Minimalist Path',
    description: 'Fundo off-white, sem margens, sem caixas. Apenas hierarquia tipográfica.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra107.png'
  },
  {
    id: 108,
    name: 'The Eclipse',
    description: 'Foco total no vazio. Um círculo iluminado que atrai o olhar.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra108.png'
  },
  {
    id: 109,
    name: 'The Solid Contrast',
    description: 'Zero efeitos. Fundo preto puro, tipografia branca impecável.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra109.png'
  },
  {
    id: 110,
    name: 'The Clean Magazine',
    description: 'Flat design absoluto. Foto de um lado, bloco sólido do outro. Sem sombras.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra-110.png'
  },
  {
    id: 111,
    name: 'The Flat Crimson',
    description: 'Um bloco de cor maciço. Nada de blurs, sombras ou texturas.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra111.png'
  },
  {
    id: 112,
    name: 'The Absolute Void',
    description: 'Muito espaço em branco, tipografia limpa, hierarquia pura.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra112.png'
  },
  {
    id: 113,
    name: 'The Swiss Split',
    description: 'Metade cor sólida, metade off-white. Contraste absoluto.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra113.png'
  },
  {
    id: 114,
    name: 'The Pure Typography',
    description: 'Apenas texto. Layout focado em opções de ação limpas.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra114.png'
  },
  {
    id: 115,
    name: 'The Dictionary Entry',
    description: 'Estética clínica e purista. Como um verbete de dicionário.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra115.png'
  },
  {
    id: 116,
    name: 'The Strict Grid',
    description: 'Informação organizada em linhas finas absolutas.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra116.png'
  },
  {
    id: 117,
    name: 'The Poetic Serif',
    description: 'Fundo claro, letras gigantes e itálicos delicados.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra117.png'
  },
  {
    id: 118,
    name: 'The Elegant Sentence',
    description: 'As ações estão embutidas diretamente no texto.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra118.png'
  },
  {
    id: 119,
    name: 'The Minimalist List',
    description: 'Editorial fashion. Números delicados, texto preciso.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra116.png'
  },
  {
    id: 120,
    name: 'The Floating Words',
    description: 'Escuro, dramático, usando a quebra de linha para criar arte.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra120.png'
  },
  {
    id: 121,
    name: 'The Delicate Shift',
    description: 'Tema escuro. As palavras deslizam e revelam o ícone elegantemente.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra121.png'
  },
  {
    id: 122,
    name: 'The Light Whisper',
    description: 'Tema claro. Letras minúsculas gigantes.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra122.png'
  },
  {
    id: 123,
    name: 'The Staggered Elegance',
    description: 'Palavras espalhadas pelo eixo X. Traz movimento à leitura.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra123.png'
  },
  {
    id: 124,
    name: 'The Absolute Focus',
    description: 'Uma única frase monumental.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra124.png'
  },
  {
    id: 125,
    name: 'The Classic Cream',
    description: 'Fundo creme, imagem superior, tipografia serifada enorme.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra125.png'
  },
  {
    id: 126,
    name: 'The Framed Split',
    description: 'Borda grossa colorida, imagem com margens, divisão de cards na base.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra126.png'
  },
  {
    id: 127,
    name: 'The Dark Line',
    description: 'Dark mode absoluto, separador fino, tipografia limpa.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra127.png'
  },
  {
    id: 128,
    name: 'The Red Sidebar',
    description: 'Barra lateral vibrante, imagem dominante.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra128.png'
  },
  {
    id: 129,
    name: 'The Overlap Badge',
    description: 'Card flutuante sobre imagem escurecida, badge circular de ação.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra129.png'
  },
  {
    id: 130,
    name: 'The Floating Center',
    description: 'Fundo creme, imagem central arredondada com sombra suave.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra130.png'
  },
  {
    id: 131,
    name: 'The Split Overlap',
    description: 'Topo sólido colorido, imagem rompendo a linha de divisão.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra131.png'
  },
  {
    id: 132,
    name: 'The Square Action',
    description: 'Design limpo, botões quadrados e tipografia impactante.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra132.png'
  },
  {
    id: 133,
    name: 'The Action Overlap',
    description: 'Fundo imagem escura com card de encerramento e ícone flutuante.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra133.png'
  },
  {
    id: 134,
    name: 'The Floating Conclusion',
    description: 'Fundo creme, caixa de interação central flutuante com sombra suave.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra134.png'
  },
  {
    id: 135,
    name: 'The Header Break Action',
    description: 'Topo colorido com bloco de ação cortando a linha de divisão.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra135.png'
  },
  {
    id: 136,
    name: 'The Sharp Minimal',
    description: 'Design ultra clean com lista elegante e botão quadrado vibrante.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra136.png'
  },
  {
    id: 137,
    name: 'The Red Sidebar Action',
    description: 'Barra lateral vibrante à esquerda, card central com cantos curvos e sombra.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra137.png'
  },
  {
    id: 138,
    name: 'The Triptych Split',
    description: 'Fundo creme no topo, 3 fatias de imagem na base com botão flutuante.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra138.png'
  },
  {
    id: 139,
    name: 'The Elegant Frame',
    description: 'Moldura fina dupla, imagem isolada e tipografia serifada sofisticada.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra139.png'
  },
  {
    id: 140,
    name: 'The Red Pillar',
    description: 'Pilar colorido na base com botão sólido e tipografia monumental.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra140.png'
  },
  {
    id: 141,
    name: 'The Red Sidebar Conclusion',
    description: 'Barra lateral vibrante, foco tipográfico monumental e lista de ações.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra141.png'
  },
  {
    id: 142,
    name: 'The Triptych Action Pillars',
    description: 'Design tríptico com 3 pilares de ação sólidos (Gostar, Partilhar, Salvar).',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra142.png'
  },
  {
    id: 143,
    name: 'The Elegant Conclusion Frame',
    description: 'Moldura fina, foto de perfil centralizada e estética de galeria de arte.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra143.png'
  },
  {
    id: 144,
    name: 'The Minimalist Synthesis',
    description: 'Topo colorido fino, tipografia mista e grid de ações baseada em linhas.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra144.png'
  },
  {
    id: 145,
    name: 'The Crimson Base',
    description: 'Topo creme com imagem central e base vermelha sólida para ação.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra145.png'
  },
  {
    id: 146,
    name: 'The Overlap Pill',
    description: 'Design dividido no topo com pílula de ação sobrepondo a divisão.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra146.png'
  },
  {
    id: 147,
    name: 'The Dashed VIP',
    description: 'Moldura escura com card creme interno e linha tracejada sofisticada.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra147.png'
  },
  {
    id: 148,
    name: 'The Vertical Synthesis',
    description: 'Faixa lateral colorida e síntese visual focada em conversão.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra148.png'
  },
  {
    id: 149,
    name: 'The Frosted Closure',
    description: 'Fundo imagem total com card central glassmorphism focado em salvar.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra149.png'
  },
  {
    id: 150,
    name: 'The Elegant Line',
    description: 'Design escuro minimalista com linha divisória fina e botão lateral.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra150.png'
  },
  {
    id: 151,
    name: 'The Crown Vignette',
    description: 'Vinheta dramática, ícone de coroa vibrante e tipografia monumental.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra151.png'
  },
  {
    id: 152,
    name: 'The Dark Minimalist Synthesis',
    description: 'Lista de ações sutil sobre fundo escuro com detalhe circular colorido.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra152.png'
  },
  {
    id: 153,
    name: 'The Crimson Top Action',
    description: 'Bloco colorido dominante no topo, foto central e imagem na base.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra153.png'
  },
  {
    id: 154,
    name: 'The White Split Closure',
    description: 'Fundo branco limpo, tipografia pesada e linha de acento vertical.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra154.png'
  },
  {
    id: 155,
    name: 'The Red Bottom Overlap',
    description: 'Imagem no topo, bloco colorido na base e perfil sobrepondo a divisão.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra155.png'
  },
  {
    id: 156,
    name: 'The Synthesis Block',
    description: 'Borda grossa colorida, foco central massivo na ação e divisões geométricas.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra156.png'
  },
  {
    id: 157,
    name: 'The Velvet Touch',
    description: 'Fundo carmesim profundo, texto claro e elegante.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra157.png'
  },
  {
    id: 158,
    name: 'The Golden Ratio',
    description: 'Proporções perfeitas, linhas finas, branco absoluto.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra158.png'
  },
  {
    id: 159,
    name: 'The Monolith',
    description: 'Preto absoluto, impacto tipográfico massivo.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra159.png'
  },
  {
    id: 160,
    name: 'The Glass Echo',
    description: 'Imagem de fundo total, desfoque de vidro maciço, elementos cristalinos.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra160.png'
  },
  {
    id: 161,
    name: 'The Bold Invitation',
    description: 'Divisão horizontal, vermelho vibrante e off-white.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra161.png'
  },
  {
    id: 162,
    name: 'The Pure Typography',
    description: 'A tipografia limpa, minimalismo absoluto.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra162.png'
  },
  {
    id: 163,
    name: 'The Whisper',
    description: 'Cinza asfalto, minimalismo absoluto, foco gigante na ação.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra163.png'
  },
  {
    id: 164,
    name: 'The Final Cut',
    description: 'Corte diagonal, tensão visual, preto e vermelho.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20CTA%20Extras/designs_cta-extra164.png'
  }
];

export function CTAVariant101(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-[#0c0a09] flex flex-col items-center justify-center p-8 text-center border border-white/5">
      <div className="absolute top-0 left-0 w-full h-[40%] pointer-events-none" style={{ background: `linear-gradient(to bottom, ${brandColor}1a, transparent)` }} />
      
      <div className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center mb-8 border pointer-events-none" style={{ backgroundColor: `${brandColor}1a`, borderColor: `${brandColor}33`, boxShadow: `0 0 40px ${brandColor}33` }}>
        <Bookmark className="w-8 h-8" strokeWidth={1.5} style={{ color: brandColor }} />
      </div>

      <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="mb-6 relative z-10 w-full">
        <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-normal text-white leading-[0.9] outline-none whitespace-pre-line" style={{ fontSize: `${76 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
          {data.titulo}
        </h2>
      </SmartElement>

      <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="mb-12 relative z-10 max-w-[80%]">
        <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-white/50 uppercase tracking-widest leading-relaxed outline-none whitespace-pre-line" style={{ fontSize: `${17 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
          {data.texto_apoio}
        </p>
      </SmartElement>

      <div className="relative z-10 w-full bg-white/5 border border-white/10 rounded-2xl p-4 flex justify-between items-center backdrop-blur-sm pointer-events-none mt-auto">
        <div className="flex gap-4">
          <Heart className="w-6 h-6 text-white/70" strokeWidth={1.5} />
          <MessageCircle className="w-6 h-6 text-white/70" strokeWidth={1.5} />
          <Send className="w-6 h-6 text-white/70" strokeWidth={1.5} />
        </div>
        <Bookmark className="w-6 h-6 text-white fill-white" strokeWidth={1.5} />
      </div>
    </div>
  );
}

export function CTAVariant102(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, brandHandle, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-[#EBE9E1] flex flex-col p-8 border border-black/5">
      <div className="flex justify-between items-center border-b border-[#1a1a1a]/10 pb-4 mb-8 pointer-events-none">
        <SmartElement slideIndex={index} field="badge_text" position={pos('badge_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'badge_text'} onSelectElement={onSelectElement} className="pointer-events-auto">
          <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)} className="font-outfit font-black text-[#1a1a1a] text-[10px] tracking-[0.3em] uppercase outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>
            {data.badge_text || 'Fim de Leitura'}
          </span>
        </SmartElement>
        <CheckCircle2 className="w-4 h-4" style={{ color: brandColor }} />
      </div>

      <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="mb-8 w-full">
        <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-black text-[#1a1a1a] leading-none tracking-tighter outline-none whitespace-pre-line" style={{ fontSize: `${73 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
          {data.titulo}
        </h2>
      </SmartElement>

      <div className="flex flex-col gap-6 flex-1 pointer-events-none">
        <div className="flex items-start gap-4">
          <div className="mt-1 w-6 h-6 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center">
            <Bookmark className="w-3 h-3 text-[#1a1a1a]" />
          </div>
          <div className="pointer-events-auto">
            <SmartElement slideIndex={index} field="cta_text" position={pos('cta_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'cta_text'} onSelectElement={onSelectElement} className="mb-1">
              <h3 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)} className="font-outfit font-bold text-[#1a1a1a] text-sm uppercase tracking-widest outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.cta_text || 'Guardar'}</h3>
            </SmartElement>
            <SmartElement slideIndex={index} field="studio_text" position={pos('studio_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'studio_text'} onSelectElement={onSelectElement}>
              <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'studio_text', e.currentTarget.innerText)} className="font-outfit text-zinc-600 text-sm outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.studio_text || 'Salve a coleção no seu arquivo.'}</p>
            </SmartElement>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="mt-1 w-6 h-6 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center">
            <Send className="w-3 h-3 text-[#1a1a1a]" />
          </div>
          <div className="pointer-events-auto">
            <SmartElement slideIndex={index} field="insta_ready" position={pos('insta_ready')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'insta_ready'} onSelectElement={onSelectElement} className="mb-1">
              <h3 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'insta_ready', e.currentTarget.innerText)} className="font-outfit font-bold text-[#1a1a1a] text-sm uppercase tracking-widest outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.insta_ready || 'Partilhar'}</h3>
            </SmartElement>
            <SmartElement slideIndex={index} field="slide_call" position={pos('slide_call')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'slide_call'} onSelectElement={onSelectElement}>
              <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'slide_call', e.currentTarget.innerText)} className="font-outfit text-zinc-600 text-sm outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.slide_call || 'Envie a quem lhe deve este post.'}</p>
            </SmartElement>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="mt-1 w-6 h-6 rounded-full border flex items-center justify-center" style={{ backgroundColor: brandColor, borderColor: brandColor }}>
            <Link2 className="w-3 h-3 text-white" />
          </div>
          <div>
            <SmartElement slideIndex={index} field="cta_button" position={pos('cta_button')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'cta_button'} onSelectElement={onSelectElement} className="mb-1 pointer-events-auto">
              <h3 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'cta_button', e.currentTarget.innerText)} className="font-outfit font-bold text-[#1a1a1a] text-sm uppercase tracking-widest outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.cta_button || 'Encomendar'}</h3>
            </SmartElement>
            <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="pointer-events-auto">
              <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-zinc-600 outline-none" style={{ fontSize: `${14 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>{data.texto_apoio}</p>
            </SmartElement>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-[#1a1a1a]/10 flex justify-between items-center pointer-events-none">
        <span className="font-outfit text-zinc-400 text-[10px] uppercase tracking-widest font-bold" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>@{brandHandle}</span>
      </div>
    </div>
  );
}

export function CTAVariant103(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, brandHandle, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full flex flex-col p-6" style={{ backgroundColor: brandColor }}>
      <div className="w-full h-full bg-[#FDFBF7] rounded-sm shadow-xl flex flex-col relative overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-transparent to-transparent" style={{ backgroundImage: `radial-gradient(circle at 4px 0px, ${brandColor} 4px, transparent 5px)`, backgroundSize: '12px 10px', backgroundPosition: '0px 0px', backgroundRepeat: 'repeat-x', top: '-4px' }}></div>

        <div className="p-8 flex-1 flex flex-col pointer-events-auto">
          <div className="text-center mb-8 pointer-events-none">
            <Instagram className="w-6 h-6 text-[#1a1a1a] mx-auto mb-3" />
            <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="mb-1 w-full pointer-events-auto">
              <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-black text-[#1a1a1a] tracking-[0.2em] uppercase outline-none" style={{ fontSize: `${20 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
                {data.titulo || 'RECIBO DE VALOR'}
              </h2>
            </SmartElement>
            <p className="font-outfit text-zinc-400 text-[9px] uppercase tracking-widest" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>
              ID: {Math.floor(Math.random() * 90000) + 10000} • {brandHandle}
            </p>
          </div>

          <div className="flex-1 flex flex-col gap-4 border-y-2 border-dashed border-zinc-200 py-6 mb-6 pointer-events-none">
            <div className="flex justify-between items-center font-outfit text-[10px] text-zinc-400 uppercase tracking-widest mb-2">
              <SmartElement slideIndex={index} field="badge_text" position={pos('badge_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'badge_text'} onSelectElement={onSelectElement} className="pointer-events-auto">
                <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)} className="outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.badge_text || 'Ação'}</span>
              </SmartElement>
              <SmartElement slideIndex={index} field="studio_text" position={pos('studio_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'studio_text'} onSelectElement={onSelectElement} className="pointer-events-auto">
                <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'studio_text', e.currentTarget.innerText)} className="outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.studio_text || 'Status'}</span>
              </SmartElement>
            </div>
            
            <div className="flex justify-between items-end">
              <SmartElement slideIndex={index} field="insta_ready" position={pos('insta_ready')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'insta_ready'} onSelectElement={onSelectElement} className="pointer-events-auto">
                <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'insta_ready', e.currentTarget.innerText)} className="font-outfit font-bold text-[#1a1a1a] text-lg outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.insta_ready || 'Deixar o Like'}</span>
              </SmartElement>
              <SmartElement slideIndex={index} field="slide_call" position={pos('slide_call')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'slide_call'} onSelectElement={onSelectElement} className="pointer-events-auto">
                <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'slide_call', e.currentTarget.innerText)} className="font-outfit font-bold text-[10px] uppercase tracking-widest outline-none" style={{ color: brandColor, fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.slide_call || 'Pendente'}</span>
              </SmartElement>
            </div>
            <div className="flex justify-between items-end">
              <SmartElement slideIndex={index} field="cta_text" position={pos('cta_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'cta_text'} onSelectElement={onSelectElement} className="pointer-events-auto">
                <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)} className="font-outfit font-bold text-[#1a1a1a] text-lg outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.cta_text || 'Salvar Post'}</span>
              </SmartElement>
              <SmartElement slideIndex={index} field="citacao" position={pos('citacao')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'citacao'} onSelectElement={onSelectElement} className="pointer-events-auto">
                <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'citacao', e.currentTarget.innerText)} className="font-outfit font-bold text-[10px] uppercase tracking-widest outline-none" style={{ color: brandColor, fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.citacao || 'Recomendado'}</span>
              </SmartElement>
            </div>
            <div className="flex justify-between items-end">
              <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="pointer-events-auto">
                <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit font-bold text-[#1a1a1a] outline-none" style={{ fontSize: `${18 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>{data.texto_apoio || 'Enviar a um Amigo'}</span>
              </SmartElement>
              <SmartElement slideIndex={index} field="cta_button" position={pos('cta_button')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'cta_button'} onSelectElement={onSelectElement} className="pointer-events-auto">
                <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'cta_button', e.currentTarget.innerText)} className="font-outfit font-bold text-[10px] uppercase tracking-widest outline-none" style={{ color: brandColor, fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.cta_button || 'Obrigatório'}</span>
              </SmartElement>
            </div>
          </div>

          <div className="mt-auto text-center pointer-events-none">
            <div className="w-full flex justify-center mb-4">
               <div className="flex gap-[2px] h-8 items-center justify-center opacity-60">
                 {[...Array(25)].map((_, i) => (
                   <div key={i} className="bg-[#1a1a1a] h-full" style={{ width: `${Math.random() * 4 + 1}px` }}></div>
                 ))}
               </div>
            </div>
            <SmartElement slideIndex={index} field="autor" position={pos('autor')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'autor'} onSelectElement={onSelectElement} className="pointer-events-auto">
              <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'autor', e.currentTarget.innerText)} className="font-outfit font-bold text-[#1a1a1a] text-[8px] uppercase tracking-[0.3em] outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>
                {data.autor || 'OBRIGADO PELA ATENÇÃO'}
              </p>
            </SmartElement>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CTAVariant104(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, brandHandle, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-black flex flex-col items-center justify-center ring-1 ring-white/10">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0 opacity-80" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <span className="font-outfit font-black text-white/80 text-[10px] tracking-[0.3em] uppercase drop-shadow-md" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>
          {brandHandle}
        </span>
      </div>

      <div className="relative z-10 w-[85%] bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-8 flex flex-col items-center text-center shadow-2xl">
        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6 pointer-events-none">
          <Bookmark className="w-5 h-5 text-white" fill="currentColor" />
        </div>

        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="mb-4 w-full relative z-10">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair italic font-medium text-white outline-none whitespace-pre-line" style={{ fontSize: `${45 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
            {data.titulo}
          </h2>
        </SmartElement>
        
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="mb-8 w-full relative z-10">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-white/70 uppercase tracking-[0.2em] leading-relaxed outline-none" style={{ fontSize: `${14 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
            {data.texto_apoio}
          </p>
        </SmartElement>

        <div className="w-full flex items-center justify-center gap-6 border-t border-white/10 pt-6 pointer-events-none">
          <div className="flex flex-col items-center gap-2">
             <Heart className="w-5 h-5 text-white" />
             <SmartElement slideIndex={index} field="badge_text" position={pos('badge_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'badge_text'} onSelectElement={onSelectElement} className="pointer-events-auto">
                <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)} className="font-outfit text-[8px] text-white uppercase tracking-widest outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.badge_text || 'Curte'}</span>
             </SmartElement>
          </div>
          <div className="flex flex-col items-center gap-2">
             <MessageCircle className="w-5 h-5 text-white" />
             <SmartElement slideIndex={index} field="studio_text" position={pos('studio_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'studio_text'} onSelectElement={onSelectElement} className="pointer-events-auto">
                <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'studio_text', e.currentTarget.innerText)} className="font-outfit text-[8px] text-white uppercase tracking-widest outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.studio_text || 'Comente'}</span>
             </SmartElement>
          </div>
          <div className="flex flex-col items-center gap-2">
             <Send className="w-5 h-5 text-white" />
             <SmartElement slideIndex={index} field="insta_ready" position={pos('insta_ready')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'insta_ready'} onSelectElement={onSelectElement} className="pointer-events-auto">
                <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'insta_ready', e.currentTarget.innerText)} className="font-outfit text-[8px] text-white uppercase tracking-widest outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.insta_ready || 'Compartilhe'}</span>
             </SmartElement>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CTAVariant105(props) {
  const { data, index, brandColor, titleFont, textFont, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0 };

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col items-center justify-center text-center bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-[#4a0818] via-[#24030a] to-[#0a0002] z-0" />
      <div className="absolute top-0 right-0 w-[80%] h-[80%] rounded-full blur-[100px] opacity-20" style={{ backgroundColor: brandColor }} />
      <div className="absolute bottom-0 left-0 w-[80%] h-[80%] bg-white rounded-full blur-[120px] opacity-5 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center w-full px-8">
        <Sparkles className="w-6 h-6 text-white/50 mb-8 pointer-events-none" strokeWidth={1.5} />

        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="mb-4 relative z-10 w-full">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-normal text-white leading-[1.1] outline-none whitespace-pre-line" style={{ fontSize: `${51 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
            {data.titulo}
          </h2>
        </SmartElement>

        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="mb-12 relative z-10 max-w-[80%]">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-white/50 uppercase tracking-[0.3em] leading-relaxed outline-none whitespace-pre-line" style={{ fontSize: `${10 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
            {data.texto_apoio}
          </p>
        </SmartElement>

        <div className="relative cursor-pointer pointer-events-none">
          <div className="absolute inset-0 rounded-full blur-xl opacity-20" style={{ backgroundColor: brandColor }}></div>
          <div className="relative w-16 h-16 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10">
            <Bookmark className="w-6 h-6 text-white" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 w-full flex justify-center z-10 pointer-events-none">
        <div className="flex gap-6 opacity-60">
          <Heart className="w-6 h-6 text-white" strokeWidth={1.5} />
          <MessageCircle className="w-6 h-6 text-white" strokeWidth={1.5} />
          <Share2 className="w-6 h-6 text-white" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}

export function CTAVariant106(props) {
  const { data, index, titleFont, textFont, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, brandHandle, showBrandHandle } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0 };

  return (
    <div className="w-full h-full relative overflow-hidden bg-black flex flex-col items-center justify-center">
      <div className="absolute inset-0 z-0 pointer-events-none">
         <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="w-[120%] h-[120%] bg-black/30 backdrop-blur-[40px] rounded-full" style={{ maskImage: 'radial-gradient(circle, black 40%, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 70%)' }}></div>
      </div>

      <div className="relative z-20 flex flex-col items-center text-center px-8 w-full">
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="mb-3 w-full relative z-20">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-normal text-white leading-tight outline-none whitespace-pre-line" style={{ fontSize: `${64 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
            {data.titulo}
          </h2>
        </SmartElement>

        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="mb-8 w-full relative z-20">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-white/70 uppercase tracking-widest outline-none whitespace-pre-line" style={{ fontSize: `${14 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
            {data.texto_apoio}
          </p>
        </SmartElement>

        <div className="flex flex-col gap-5 w-full max-w-[200px] pointer-events-none">
          <div className="flex items-center justify-between w-full">
            <SmartElement slideIndex={index} field="badge_text" position={pos('badge_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'badge_text'} onSelectElement={onSelectElement} className="pointer-events-auto">
              <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)} className="font-outfit text-white/90 text-sm uppercase tracking-widest outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.badge_text || 'Salvar'}</span>
            </SmartElement>
            <Bookmark className="w-6 h-6 text-white" strokeWidth={1.5} />
          </div>
          <div className="flex items-center justify-between w-full">
            <SmartElement slideIndex={index} field="studio_text" position={pos('studio_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'studio_text'} onSelectElement={onSelectElement} className="pointer-events-auto">
              <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'studio_text', e.currentTarget.innerText)} className="font-outfit text-white/50 text-sm uppercase tracking-widest outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.studio_text || 'Partilhar'}</span>
            </SmartElement>
            <Send className="w-6 h-6 text-white/50" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {showBrandHandle && brandHandle && (
        <div className="absolute top-8 w-full text-center z-20 pointer-events-none">
          <span className="font-outfit text-white/50 text-[10px] uppercase tracking-[0.4em]" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>@{brandHandle}</span>
        </div>
      )}
    </div>
  );
}

export function CTAVariant107(props) {
  const { data, index, brandColor, titleFont, textFont, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0 };

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#FDFBF7] flex flex-col justify-between p-8">
      
      <div className="relative z-10 mt-4">
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="mb-4 w-full">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair italic font-medium text-[#1a1a1a] leading-none outline-none whitespace-pre-line" style={{ fontSize: `${64 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
            {data.titulo}
          </h2>
        </SmartElement>
        
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="w-full">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-zinc-400 uppercase tracking-[0.3em] outline-none whitespace-pre-line" style={{ fontSize: `${14 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
            {data.texto_apoio}
          </p>
        </SmartElement>
      </div>

      <div className="flex flex-col gap-8 w-full pl-4 mb-4 relative z-10 pointer-events-none">
        <div className="flex items-start gap-6">
          <span className="font-playfair italic text-5xl leading-none opacity-50" style={{ color: brandColor, fontFamily: data.tagFont || data.textFont || 'Outfit' }}>1</span>
          <div className="pt-2 pointer-events-auto">
            <SmartElement slideIndex={index} field="badge_text" position={pos('badge_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'badge_text'} onSelectElement={onSelectElement} className="mb-1">
              <h3 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)} className="font-outfit font-bold text-[#1a1a1a] text-lg uppercase tracking-widest outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.badge_text || 'Arquivar'}</h3>
            </SmartElement>
            <SmartElement slideIndex={index} field="studio_text" position={pos('studio_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'studio_text'} onSelectElement={onSelectElement}>
              <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'studio_text', e.currentTarget.innerText)} className="font-outfit text-zinc-500 text-sm outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.studio_text || 'Salve no seu dispositivo.'}</p>
            </SmartElement>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <span className="font-playfair italic text-5xl leading-none opacity-50" style={{ color: brandColor, fontFamily: data.tagFont || data.textFont || 'Outfit' }}>2</span>
          <div className="pt-2 pointer-events-auto">
            <SmartElement slideIndex={index} field="insta_ready" position={pos('insta_ready')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'insta_ready'} onSelectElement={onSelectElement} className="mb-1">
              <h3 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'insta_ready', e.currentTarget.innerText)} className="font-outfit font-bold text-[#1a1a1a] text-lg uppercase tracking-widest outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.insta_ready || 'Distribuir'}</h3>
            </SmartElement>
            <SmartElement slideIndex={index} field="slide_call" position={pos('slide_call')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'slide_call'} onSelectElement={onSelectElement}>
              <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'slide_call', e.currentTarget.innerText)} className="font-outfit text-zinc-500 text-sm outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.slide_call || 'Envie a um apreciador.'}</p>
            </SmartElement>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-end items-end relative z-10 pointer-events-none mb-4">
        <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center border border-black/5">
          <Bookmark className="w-6 h-6 text-[#1a1a1a]" strokeWidth={1.5} />
        </div>
      </div>

    </div>
  );
}

export function CTAVariant108(props) {
  const { data, index, brandHandle, titleFont, textFont, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showBrandHandle } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0 };

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#050505] flex flex-col items-center justify-center p-8">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[380px] h-[380px] bg-zinc-900 rounded-full z-0 overflow-hidden pointer-events-none">
         <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0 opacity-30 mix-blend-luminosity" />
         <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#050505] to-transparent" />
      </div>
      
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl z-0 pointer-events-none" />

      <div className="relative z-10 mt-[40%] flex flex-col items-center w-full">
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="mb-3 relative z-10 text-center w-full">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-normal text-[#EBE9E1] leading-none outline-none whitespace-pre-line" style={{ fontSize: `${48 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
            {data.titulo}
          </h2>
        </SmartElement>
        
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="mb-10 relative z-10 text-center w-full">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-zinc-500 uppercase tracking-[0.4em] outline-none whitespace-pre-line" style={{ fontSize: `${12 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
            {data.texto_apoio}
          </p>
        </SmartElement>

        <div className="flex gap-4 items-center pointer-events-none relative z-10">
          <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md pointer-events-auto">
            <Bookmark className="w-5 h-5 text-white" fill="currentColor" />
            <SmartElement slideIndex={index} field="badge_text" position={pos('badge_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'badge_text'} onSelectElement={onSelectElement}>
              <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)} className="font-outfit font-bold text-white text-[12px] uppercase tracking-widest outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.badge_text || 'Salvar'}</span>
            </SmartElement>
          </div>
          <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center backdrop-blur-md">
            <Send className="w-5 h-5 text-white" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-10 opacity-40 pointer-events-none">
        <SmartElement slideIndex={index} field="studio_text" position={pos('studio_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'studio_text'} onSelectElement={onSelectElement} className="pointer-events-auto">
          <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'studio_text', e.currentTarget.innerText)} className="font-outfit text-white text-[10px] uppercase tracking-widest outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.studio_text || 'Final'}</span>
        </SmartElement>
        {showBrandHandle && brandHandle && (
          <span className="font-outfit text-white text-[10px] uppercase tracking-widest" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>@{brandHandle}</span>
        )}
      </div>

    </div>
  );
}

export function CTAVariant109(props) {
  const { data, index, brandColor, titleFont, textFont, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0 };

  return (
    <div className="w-full h-full relative bg-[#050505] overflow-hidden flex flex-col justify-between p-8 border border-white/10">
      
      <div className="flex justify-between items-start w-full pointer-events-none">
        <SmartElement slideIndex={index} field="badge_text" position={pos('badge_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'badge_text'} onSelectElement={onSelectElement} className="pointer-events-auto">
          <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)} className="font-outfit font-medium text-white/50 text-[10px] tracking-[0.3em] uppercase outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>
            {data.badge_text || 'Encerramento'}
          </span>
        </SmartElement>
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: brandColor }} />
      </div>

      <div className="flex flex-col">
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="mb-6 w-full">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-normal text-white leading-[1.1] tracking-tight outline-none whitespace-pre-line" style={{ fontSize: `${72 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
            {data.titulo}
          </h2>
        </SmartElement>
        
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="w-full max-w-[80%]">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-white/60 leading-relaxed font-light outline-none whitespace-pre-line" style={{ fontSize: `${16 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
            {data.texto_apoio}
          </p>
        </SmartElement>
      </div>

      <div className="flex flex-col gap-4 mt-8 pointer-events-none">
        <div className="flex items-center justify-between border-b border-white/20 pb-4">
          <SmartElement slideIndex={index} field="cta_text" position={pos('cta_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'cta_text'} onSelectElement={onSelectElement} className="pointer-events-auto">
            <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)} className="font-outfit text-white text-xs uppercase tracking-widest outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.cta_text || 'Salvar Coleção'}</span>
          </SmartElement>
          <Bookmark className="w-5 h-5 text-white" strokeWidth={1.5} />
        </div>
        <div className="flex items-center justify-between pb-2">
          <SmartElement slideIndex={index} field="insta_ready" position={pos('insta_ready')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'insta_ready'} onSelectElement={onSelectElement} className="pointer-events-auto">
            <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'insta_ready', e.currentTarget.innerText)} className="font-outfit text-white/50 text-xs uppercase tracking-widest outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.insta_ready || 'Enviar Recomendação'}</span>
          </SmartElement>
          <Send className="w-5 h-5 text-white/50" strokeWidth={1.5} />
        </div>
      </div>

    </div>
  );
}

export function CTAVariant110(props) {
  const { data, index, brandColor, brandHandle, titleFont, textFont, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showBrandHandle } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0 };

  return (
    <div className="w-full h-full relative bg-[#FDFBF7] overflow-hidden flex flex-col ring-1 ring-black/5">
      
      <div className="h-[45%] w-full bg-zinc-200 relative overflow-hidden pointer-events-none">
        <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0" />
      </div>

      <div className="flex-1 flex flex-col p-8 bg-[#FDFBF7]">
        <div className="mb-auto">
          <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="mb-3 w-full">
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair italic font-medium text-[#1a1a1a] leading-none outline-none whitespace-pre-line" style={{ fontSize: `${56 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
              {data.titulo}
            </h2>
          </SmartElement>
          <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="w-full">
            <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-zinc-500 uppercase tracking-[0.2em] font-medium outline-none whitespace-pre-line" style={{ fontSize: `${14 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
              {data.texto_apoio}
            </p>
          </SmartElement>
        </div>

        <div className="w-full flex items-center justify-between text-white p-4 pointer-events-auto" style={{ backgroundColor: brandColor }}>
          <SmartElement slideIndex={index} field="cta_text" position={pos('cta_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'cta_text'} onSelectElement={onSelectElement}>
            <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)} className="font-outfit font-bold text-[12px] uppercase tracking-widest outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>
              {data.cta_text || 'Guardar no Arquivo'}
            </span>
          </SmartElement>
          <Bookmark className="w-5 h-5 text-white" strokeWidth={1.5} />
        </div>
        
        <div className="w-full flex justify-between items-end mt-6 pointer-events-none">
          <span className="font-outfit text-zinc-400 text-[10px] uppercase tracking-widest font-bold" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>
            {showBrandHandle && brandHandle ? `@${brandHandle}` : ''}
          </span>
          <div className="flex gap-4">
            <Heart className="w-5 h-5 text-zinc-400" strokeWidth={1.5} />
            <MessageCircle className="w-5 h-5 text-zinc-400" strokeWidth={1.5} />
          </div>
        </div>
      </div>

    </div>
  );
}

export function CTAVariant111(props) {
  const { data, index, brandColor, brandHandle, titleFont, textFont, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showBrandHandle } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0 };

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col items-center justify-center p-8 text-center" style={{ backgroundColor: brandColor }}>
      
      <div className="w-full border-t border-b border-white/20 py-8 flex flex-col items-center justify-center flex-1 my-8">
        
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="mb-6 w-full">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-normal text-white leading-[1.1] outline-none whitespace-pre-line" style={{ fontSize: `${72 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
            {data.titulo}
          </h2>
        </SmartElement>
        
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="mb-10 max-w-[80%]">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-white/80 uppercase tracking-[0.2em] leading-relaxed outline-none whitespace-pre-line" style={{ fontSize: `${16 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
            {data.texto_apoio}
          </p>
        </SmartElement>

        <div className="bg-white flex items-center gap-3 px-6 py-3 pointer-events-auto" style={{ color: brandColor }}>
          <Bookmark className="w-5 h-5" fill="currentColor" />
          <SmartElement slideIndex={index} field="cta_text" position={pos('cta_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'cta_text'} onSelectElement={onSelectElement}>
            <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)} className="font-outfit font-bold text-[12px] uppercase tracking-widest outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.cta_text || 'Salvar Post'}</span>
          </SmartElement>
        </div>

      </div>

      <div className="w-full flex justify-between items-center opacity-70 pointer-events-none">
        <SmartElement slideIndex={index} field="badge_text" position={pos('badge_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'badge_text'} onSelectElement={onSelectElement} className="pointer-events-auto">
          <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)} className="font-outfit text-white text-[10px] tracking-[0.3em] uppercase outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.badge_text || 'Fim'}</span>
        </SmartElement>
        {showBrandHandle && brandHandle && (
          <span className="font-outfit text-white text-[10px] tracking-[0.3em] uppercase" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>@{brandHandle}</span>
        )}
      </div>

    </div>
  );
}

export function CTAVariant112(props) {
  const { data, index, brandColor, titleFont, textFont, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0 };

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#FDFBF7] flex flex-col p-8 ring-1 ring-black/5">
      
      <div className="w-full flex justify-between items-start mb-auto pointer-events-none">
        <Check className="w-6 h-6" strokeWidth={1.5} style={{ color: brandColor }} />
        <SmartElement slideIndex={index} field="badge_text" position={pos('badge_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'badge_text'} onSelectElement={onSelectElement} className="pointer-events-auto">
          <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)} className="font-outfit font-bold text-zinc-300 text-[10px] uppercase tracking-[0.4em] outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>
            {data.badge_text || 'Concluído'}
          </span>
        </SmartElement>
      </div>

      <div className="flex flex-col">
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="mb-6 w-full">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-normal text-[#1a1a1a] leading-none outline-none whitespace-pre-line" style={{ fontSize: `${80 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
            {data.titulo}
          </h2>
        </SmartElement>

        <ul className="flex flex-col gap-6 mb-12 pointer-events-none">
          <li className="flex items-center gap-4 font-outfit text-[#1a1a1a] uppercase tracking-widest" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>
            <Bookmark className="w-5 h-5 text-zinc-300" strokeWidth={1.5} />
            <SmartElement slideIndex={index} field="cta_text" position={pos('cta_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'cta_text'} onSelectElement={onSelectElement} className="pointer-events-auto">
              <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)} className="outline-none" style={{ fontSize: `${16 * sText}px`, fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.cta_text || 'Guardar na Coleção'}</span>
            </SmartElement>
          </li>
          <li className="flex items-center gap-4 font-outfit text-[#1a1a1a] uppercase tracking-widest" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>
            <Send className="w-5 h-5 text-zinc-300" strokeWidth={1.5} />
            <SmartElement slideIndex={index} field="insta_ready" position={pos('insta_ready')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'insta_ready'} onSelectElement={onSelectElement} className="pointer-events-auto">
              <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'insta_ready', e.currentTarget.innerText)} className="outline-none" style={{ fontSize: `${16 * sText}px`, fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.insta_ready || 'Enviar para uma Amiga'}</span>
            </SmartElement>
          </li>
        </ul>
        
        <div className="flex items-center gap-3 pointer-events-none">
          <div className="w-12 h-12 border border-[#1a1a1a] flex items-center justify-center">
            <ArrowRight className="w-5 h-5 text-[#1a1a1a]" />
          </div>
          <SmartElement slideIndex={index} field="cta_button" position={pos('cta_button')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'cta_button'} onSelectElement={onSelectElement} className="pointer-events-auto">
            <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'cta_button', e.currentTarget.innerText)} className="font-outfit text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-medium outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.cta_button || 'Fazer meu Pedido'}</span>
          </SmartElement>
        </div>
      </div>

    </div>
  );
}

export function CTAVariant113(props) {
  const { data, index, brandColor, titleFont, textFont, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0 };

  return (
    <div className="w-full h-full relative bg-[#FDFBF7] overflow-hidden flex flex-col border-none">
      
      <div className="w-full h-[50%] p-8 flex flex-col justify-end pointer-events-none" style={{ backgroundColor: brandColor }}>
        <div className="mb-auto flex justify-between items-center w-full">
          <SmartElement slideIndex={index} field="badge_text" position={pos('badge_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'badge_text'} onSelectElement={onSelectElement} className="pointer-events-auto">
            <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)} className="font-outfit font-black text-white/80 text-[10px] tracking-[0.3em] uppercase outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>
              {data.badge_text || 'Ação'}
            </span>
          </SmartElement>
          <div className="w-1.5 h-1.5 bg-white rounded-none" />
        </div>
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="w-full pointer-events-auto">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-normal text-white leading-[0.85] tracking-tight outline-none whitespace-pre-line" style={{ fontSize: `${98 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
            {data.titulo}
          </h2>
        </SmartElement>
      </div>

      <div className="w-full h-[50%] p-8 flex flex-col justify-between">
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="w-full max-w-[80%]">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-zinc-600 leading-relaxed font-medium outline-none whitespace-pre-line" style={{ fontSize: `${20 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
            {data.texto_apoio}
          </p>
        </SmartElement>

        <div className="mt-auto flex flex-col gap-1 pointer-events-none">
          <div className="w-full flex items-center justify-between py-4 border-b border-zinc-200">
            <SmartElement slideIndex={index} field="cta_text" position={pos('cta_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'cta_text'} onSelectElement={onSelectElement} className="pointer-events-auto">
              <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)} className="font-outfit font-bold text-[#1a1a1a] text-[11px] uppercase tracking-widest outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.cta_text || 'Salvar Referência'}</span>
            </SmartElement>
            <Bookmark className="w-4 h-4 text-[#1a1a1a]" strokeWidth={2} />
          </div>
          <div className="w-full flex items-center justify-between py-4">
            <SmartElement slideIndex={index} field="insta_ready" position={pos('insta_ready')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'insta_ready'} onSelectElement={onSelectElement} className="pointer-events-auto">
              <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'insta_ready', e.currentTarget.innerText)} className="font-outfit font-bold text-zinc-400 text-[11px] uppercase tracking-widest outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.insta_ready || 'Partilhar'}</span>
            </SmartElement>
            <Send className="w-4 h-4 text-zinc-400" strokeWidth={2} />
          </div>
        </div>
      </div>

    </div>
  );
}

export function CTAVariant114(props) {
  const { data, index, brandColor, brandHandle, titleFont, textFont, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showBrandHandle } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0 };

  return (
    <div className="w-full h-full relative bg-[#050505] overflow-hidden flex flex-col p-8">
      
      <div className="flex-1 flex flex-col justify-center pointer-events-none">
        <h2 className="font-playfair font-normal text-[#EBE9E1] leading-[0.9] tracking-tighter mb-12 pointer-events-none outline-none" style={{ fontSize: `${90 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
          <SmartElement slideIndex={index} field="badge_text" position={pos('badge_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'badge_text'} onSelectElement={onSelectElement} className="pointer-events-auto">
            <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)} className="font-outfit opacity-70 outline-none inline-block align-middle" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>
              {data.badge_text || 'Curtir'}
            </span>
            <Star className="w-6 h-6 ml-4 inline-block align-middle opacity-70" strokeWidth={1.5} />
          </SmartElement>
          <SmartElement slideIndex={index} field="insta_ready" position={pos('insta_ready')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'insta_ready'} onSelectElement={onSelectElement} className="pointer-events-auto">
            <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'insta_ready', e.currentTarget.innerText)} className="font-outfit opacity-70 outline-none inline-block align-middle" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>
              {data.insta_ready || 'Enviar'}
            </span>
            <Send className="w-6 h-6 ml-4 inline-block align-middle opacity-70" strokeWidth={1.5} />
          </SmartElement>
          <SmartElement slideIndex={index} field="cta_text" position={pos('cta_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'cta_text'} onSelectElement={onSelectElement} className="pointer-events-auto">
            <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)} className="font-outfit outline-none inline-block align-middle" style={{ color: brandColor, fontFamily: data.tagFont || data.textFont || 'Outfit' }}>
              {data.cta_text || 'Salvar'}
            </span>
            <Bookmark className="w-6 h-6 ml-4 inline-block align-middle" fill="currentColor" style={{ color: brandColor }} />
          </SmartElement>
        </h2>
        
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="w-full pointer-events-auto">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-white/50 uppercase tracking-[0.3em] font-medium outline-none whitespace-pre-line" style={{ fontSize: `${16 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
            {data.texto_apoio}
          </p>
        </SmartElement>
      </div>

      <div className="w-full flex justify-between items-end border-t border-white/20 pt-6 pointer-events-none">
        {showBrandHandle && brandHandle ? (
          <span className="font-outfit text-white/40 text-[9px] tracking-widest uppercase font-bold" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>@{brandHandle}</span>
        ) : (
          <span className="font-outfit text-white/40 text-[9px] tracking-widest uppercase font-bold" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}></span>
        )}
        <span className="font-outfit text-white/40 text-[9px] tracking-widest uppercase font-bold" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>Fim</span>
      </div>

    </div>
  );
}

export function CTAVariant115(props) {
  const { data, index, brandColor, titleFont, textFont, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0 };

  return (
    <div className="w-full h-full relative bg-[#FDFBF7] overflow-hidden flex flex-col p-10">
      
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement}>
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-black text-[#1a1a1a] outline-none whitespace-pre-line" style={{ fontSize: `${51 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
              {data.titulo}
            </h2>
          </SmartElement>
          <span className="font-outfit text-zinc-400 text-sm italic" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>subst. f.</span>
        </div>
        <p className="font-outfit text-zinc-500 text-xs tracking-widest" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>/re.fe.rên.ci.a/</p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex items-start gap-4">
          <span className="font-outfit font-bold text-sm" style={{ color: brandColor, fontFamily: data.tagFont || data.textFont || 'Outfit' }}>1.</span>
          <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="w-full">
            <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-[#1a1a1a] leading-snug outline-none whitespace-pre-line" style={{ fontSize: `${24 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
              {data.texto_apoio}
            </p>
          </SmartElement>
        </div>
        <div className="flex items-start gap-4 pointer-events-auto">
          <span className="font-outfit font-bold text-sm" style={{ color: brandColor, fontFamily: data.tagFont || data.textFont || 'Outfit' }}>2.</span>
          <SmartElement slideIndex={index} field="citacao" position={pos('citacao')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'citacao'} onSelectElement={onSelectElement} className="w-full">
            <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'citacao', e.currentTarget.innerText)} className="font-outfit text-[#1a1a1a] leading-snug outline-none whitespace-pre-line" style={{ fontSize: `${24 * sText}px`, fontFamily: data.tagFont || data.textFont || 'Outfit' }}>
              {data.citacao || 'O ato de salvar este post para não perder o contacto com o verdadeiro luxo.'}
            </p>
          </SmartElement>
        </div>
      </div>

      <div className="mt-auto flex justify-between items-center w-full pointer-events-none">
        <div className="w-12 h-[1px] bg-[#1a1a1a]"></div>
        <Bookmark className="w-5 h-5 text-[#1a1a1a]" strokeWidth={1.5} />
      </div>

    </div>
  );
}

export function CTAVariant116(props) {
  const { data, index, brandColor, website, titleFont, textFont, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0 };

  return (
    <div className="w-full h-full relative bg-[#EBE9E1] overflow-hidden flex flex-col px-6 py-10">
      
      <div className="mb-16">
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="mb-4 w-full">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-normal text-[#1a1a1a] leading-none outline-none whitespace-pre-line" style={{ fontSize: `${48 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
            {data.titulo}
          </h2>
        </SmartElement>
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="w-full">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-zinc-500 uppercase tracking-[0.2em] font-bold outline-none whitespace-pre-line" style={{ fontSize: `${10 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
            {data.texto_apoio}
          </p>
        </SmartElement>
      </div>

      <div className="flex flex-col w-full pointer-events-none">
        
        <div className="w-full flex items-center justify-between border-t border-[#1a1a1a]/20 py-5">
          <div className="flex items-center gap-4 pointer-events-auto">
            <span className="font-outfit text-zinc-400 text-xs" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>01</span>
            <SmartElement slideIndex={index} field="cta_text" position={pos('cta_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'cta_text'} onSelectElement={onSelectElement}>
              <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)} className="font-outfit font-bold text-[#1a1a1a] text-[11px] uppercase tracking-widest outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.cta_text || 'Guardar Post'}</span>
            </SmartElement>
          </div>
          <Bookmark className="w-4 h-4 text-[#1a1a1a]" strokeWidth={1.5} />
        </div>

        <div className="w-full flex items-center justify-between border-t border-[#1a1a1a]/20 py-5">
          <div className="flex items-center gap-4 pointer-events-auto">
            <span className="font-outfit text-zinc-400 text-xs" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>02</span>
            <SmartElement slideIndex={index} field="insta_ready" position={pos('insta_ready')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'insta_ready'} onSelectElement={onSelectElement}>
              <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'insta_ready', e.currentTarget.innerText)} className="font-outfit font-bold text-[#1a1a1a] text-[11px] uppercase tracking-widest outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.insta_ready || 'Partilhar'}</span>
            </SmartElement>
          </div>
          <Send className="w-4 h-4 text-[#1a1a1a]" strokeWidth={1.5} />
        </div>

        <div className="w-full flex items-center justify-between border-t border-b border-[#1a1a1a]/20 py-5">
          <div className="flex items-center gap-4 pointer-events-auto">
            <span className="font-outfit text-zinc-400 text-xs" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>03</span>
            <SmartElement slideIndex={index} field="cta_button" position={pos('cta_button')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'cta_button'} onSelectElement={onSelectElement}>
              <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'cta_button', e.currentTarget.innerText)} className="font-outfit font-bold text-[#1a1a1a] text-[11px] uppercase tracking-widest outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.cta_button || 'Aceder ao Menu'}</span>
            </SmartElement>
          </div>
          <ChevronRight className="w-4 h-4 text-[#1a1a1a]" strokeWidth={1.5} />
        </div>

      </div>

      <div className="mt-auto flex justify-center pointer-events-none">
        <span className="font-outfit text-zinc-400 text-[8px] uppercase tracking-[0.4em]" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>
          {website || "MEUSITE.COM.BR"}
        </span>
      </div>

    </div>
  );
}

export function CTAVariant117(props) {
  const { data, index, brandColor, website, titleFont, textFont, titleScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0 };

  return (
    <div className="w-full h-full relative bg-[#FDFBF7] overflow-hidden flex flex-col p-10 border border-black/5">
      
      <div className="flex justify-between items-start w-full opacity-40 pointer-events-none">
        <Feather className="w-4 h-4 text-[#1a1a1a]" strokeWidth={1} />
        <SmartElement slideIndex={index} field="badge_text" position={pos('badge_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'badge_text'} onSelectElement={onSelectElement} className="pointer-events-auto">
          <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)} className="font-outfit font-light text-[9px] tracking-[0.4em] uppercase outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>
            {data.badge_text || 'O Epílogo'}
          </span>
        </SmartElement>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center text-center mt-8">
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="mb-12 w-full">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-light text-[#1a1a1a] leading-[0.8] tracking-tighter outline-none whitespace-pre-line" style={{ fontSize: `${81 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
            {data.titulo}
          </h2>
        </SmartElement>
        
        <div className="flex flex-col gap-6 w-full items-center pointer-events-none">
          <div className="flex items-center gap-3 opacity-60 pointer-events-auto">
            <SmartElement slideIndex={index} field="cta_text" position={pos('cta_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'cta_text'} onSelectElement={onSelectElement}>
              <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)} className="font-outfit italic text-[22px] text-[#1a1a1a] outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.cta_text || 'Guardar na coleção'}</span>
            </SmartElement>
            <Bookmark className="w-5 h-5 text-[#1a1a1a]" strokeWidth={1} />
          </div>
          <div className="flex items-center gap-3 opacity-60 pointer-events-auto">
            <SmartElement slideIndex={index} field="insta_ready" position={pos('insta_ready')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'insta_ready'} onSelectElement={onSelectElement}>
              <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'insta_ready', e.currentTarget.innerText)} className="font-outfit italic text-[22px] text-[#1a1a1a] outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.insta_ready || 'Partilhar a doçura'}</span>
            </SmartElement>
            <Send className="w-5 h-5 text-[#1a1a1a]" strokeWidth={1} />
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center border-t border-[#1a1a1a]/10 pt-6 mt-auto pointer-events-none">
        <span className="font-outfit text-[#1a1a1a]/40 text-[8px] tracking-[0.4em] uppercase" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>
          {website || "MEUSITE.COM.BR"}
        </span>
      </div>

    </div>
  );
}

export function CTAVariant118(props) {
  const { data, index, brandColor, brandHandle, titleFont, textFont, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showBrandHandle } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0 };

  return (
    <div className="w-full h-full relative bg-[#050505] overflow-hidden flex flex-col p-10">
      
      <div className="flex-1 flex flex-col justify-center">
        <Quote className="w-6 h-6 text-white/20 mb-8 pointer-events-none" strokeWidth={1} />
        
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="w-full">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit font-light text-[#EBE9E1] leading-[1.3] tracking-tight outline-none whitespace-pre-line" style={{ fontSize: `${40 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
            {data.texto_apoio || 'Se a excelência lhe agrada, sinta-se livre para guardar este manifesto e partilhá-lo com quem tem bom gosto.'}
          </h2>
        </SmartElement>
      </div>

      <div className="w-full flex justify-between items-end pb-2 pointer-events-none">
        <div className="w-12 h-[1px] bg-white/20"></div>
        {showBrandHandle && brandHandle && (
          <span className="font-outfit font-light text-white/40 text-[9px] tracking-widest uppercase" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>
            @{brandHandle}
          </span>
        )}
      </div>

    </div>
  );
}

export function CTAVariant119(props) {
  const { data, index, brandColor, website, titleFont, textFont, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0 };

  return (
    <div className="w-full h-full relative bg-[#EBE9E1] overflow-hidden flex flex-col px-10 py-12">
      
      <div className="mb-auto">
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="w-full">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair italic font-medium text-[#1a1a1a] leading-none mb-4 outline-none whitespace-pre-line" style={{ fontSize: `${51 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
            {data.titulo}
          </h2>
        </SmartElement>
      </div>

      <div className="flex flex-col gap-10 w-full my-auto pointer-events-none">
        
        <div className="flex items-start gap-6">
          <span className="font-outfit font-light text-zinc-400 text-lg" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>01</span>
          <div className="flex flex-col gap-1 mt-1 pointer-events-auto">
            <SmartElement slideIndex={index} field="cta_text" position={pos('cta_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'cta_text'} onSelectElement={onSelectElement}>
              <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)} className="font-outfit font-medium text-[#1a1a1a] text-2xl inline-block align-middle outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>
                {data.cta_text || 'Arquivar'}
              </span>
              <Bookmark className="w-4 h-4 ml-3 inline-block align-middle" strokeWidth={1.5} />
            </SmartElement>
            <SmartElement slideIndex={index} field="studio_text" position={pos('studio_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'studio_text'} onSelectElement={onSelectElement}>
              <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'studio_text', e.currentTarget.innerText)} className="font-outfit font-light text-zinc-500 text-[10px] uppercase tracking-widest outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>
                {data.studio_text || 'Para memórias futuras'}
              </span>
            </SmartElement>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <span className="font-outfit font-light text-zinc-400 text-lg" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>02</span>
          <div className="flex flex-col gap-1 mt-1 pointer-events-auto">
            <SmartElement slideIndex={index} field="insta_ready" position={pos('insta_ready')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'insta_ready'} onSelectElement={onSelectElement}>
              <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'insta_ready', e.currentTarget.innerText)} className="font-outfit font-medium text-[#1a1a1a] text-2xl inline-block align-middle outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>
                {data.insta_ready || 'Distribuir'}
              </span>
              <Send className="w-4 h-4 ml-3 inline-block align-middle" strokeWidth={1.5} />
            </SmartElement>
            <SmartElement slideIndex={index} field="slide_call" position={pos('slide_call')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'slide_call'} onSelectElement={onSelectElement}>
              <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'slide_call', e.currentTarget.innerText)} className="font-outfit font-light text-zinc-500 text-[10px] uppercase tracking-widest outline-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>
                {data.slide_call || 'Para paladares refinados'}
              </span>
            </SmartElement>
          </div>
        </div>

      </div>

      <div className="mt-auto flex justify-end pointer-events-none">
        <span className="font-outfit text-zinc-400 text-[8px] uppercase tracking-[0.4em]" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>
          {website || "MEUSITE.COM.BR"}
        </span>
      </div>

    </div>
  );
}

export function CTAVariant120(props) {
  const { data, index, brandColor, titleFont, textFont, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0 };

  return (
    <div className="w-full h-full relative bg-[#0c0a09] overflow-hidden flex flex-col justify-between p-10 border-t-2 border-b-2 border-white/5">
      
      <div className="flex justify-start pointer-events-none">
        <div className="w-2 h-2 rounded-full opacity-50" style={{ backgroundColor: brandColor }} />
      </div>

      <div className="flex flex-col items-end text-right gap-6 pointer-events-none">
        <div className="opacity-30 flex flex-col items-end pointer-events-auto">
          <Heart className="w-6 h-6 text-white mb-2" strokeWidth={1} />
          <SmartElement slideIndex={index} field="badge_text" position={pos('badge_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'badge_text'} onSelectElement={onSelectElement}>
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)} className="font-outfit font-light text-white text-5xl tracking-tighter outline-none" style={{ fontSize: `${73 * sTitle}px`, fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.badge_text || 'Amar'}</h2>
          </SmartElement>
        </div>
        
        <div className="opacity-30 flex flex-col items-end pointer-events-auto">
          <Send className="w-6 h-6 text-white mb-2" strokeWidth={1} />
          <SmartElement slideIndex={index} field="insta_ready" position={pos('insta_ready')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'insta_ready'} onSelectElement={onSelectElement}>
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'insta_ready', e.currentTarget.innerText)} className="font-outfit font-light text-white text-5xl tracking-tighter outline-none" style={{ fontSize: `${73 * sTitle}px`, fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.insta_ready || 'Enviar'}</h2>
          </SmartElement>
        </div>
        
        <div className="flex flex-col items-end pointer-events-auto" style={{ color: brandColor }}>
          <Bookmark className="w-6 h-6 mb-2" fill="currentColor" strokeWidth={1} />
          <SmartElement slideIndex={index} field="cta_text" position={pos('cta_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'cta_text'} onSelectElement={onSelectElement}>
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)} className="font-outfit italic font-medium text-white text-6xl tracking-tighter outline-none" style={{ fontSize: `${85 * sTitle}px`, fontFamily: data.tagFont || data.textFont || 'Outfit' }}>{data.cta_text || 'Salvar'}</h2>
          </SmartElement>
        </div>
      </div>

      <div className="flex justify-start items-end">
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="w-full">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit font-light text-white/30 uppercase tracking-widest outline-none whitespace-pre-line" style={{ fontSize: `${21 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
            {data.texto_apoio || 'Fim da Experiência'}
          </p>
        </SmartElement>
      </div>

    </div>
  );
}

export function CTAVariant121(props) {
  const { data, index, brandColor, brandHandle, titleFont, textFont, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showBrandHandle } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0 };

  return (
    <div className="w-full h-full relative bg-[#050505] overflow-hidden flex flex-col p-10 border border-white/5">
      
      <div className="flex-1 flex flex-col justify-center gap-8 pointer-events-none">
        
        <div className="group/action flex items-center pointer-events-auto">
          <Heart className="w-6 h-6 text-white opacity-0" strokeWidth={1} />
          <SmartElement slideIndex={index} field="badge_text" position={pos('badge_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'badge_text'} onSelectElement={onSelectElement}>
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)} className="font-outfit font-light text-[#EBE9E1] tracking-tighter opacity-40 outline-none" style={{ fontSize: `${56 * sTitle}px`, fontFamily: data.tagFont || data.textFont || 'Outfit' }}>
              {data.badge_text || 'Apreciar'}
            </h2>
          </SmartElement>
        </div>

        <div className="group/action flex items-center pointer-events-auto">
          <Send className="w-6 h-6 text-white opacity-0" strokeWidth={1} />
          <SmartElement slideIndex={index} field="insta_ready" position={pos('insta_ready')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'insta_ready'} onSelectElement={onSelectElement}>
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'insta_ready', e.currentTarget.innerText)} className="font-outfit font-light text-[#EBE9E1] tracking-tighter opacity-40 outline-none" style={{ fontSize: `${56 * sTitle}px`, fontFamily: data.tagFont || data.textFont || 'Outfit' }}>
              {data.insta_ready || 'Partilhar'}
            </h2>
          </SmartElement>
        </div>

        <div className="group/action flex items-center pointer-events-auto" style={{ color: brandColor }}>
          <Bookmark className="w-6 h-6 opacity-0" fill="currentColor" strokeWidth={1} />
          <SmartElement slideIndex={index} field="cta_text" position={pos('cta_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'cta_text'} onSelectElement={onSelectElement}>
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)} className="font-outfit italic font-medium tracking-tighter outline-none" style={{ fontSize: `${64 * sTitle}px`, fontFamily: data.tagFont || data.textFont || 'Outfit' }}>
              {data.cta_text || 'Eternizar'}
            </h2>
          </SmartElement>
        </div>

      </div>

      <div className="w-full flex justify-between items-end border-t border-white/10 pt-6">
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="w-auto">
          <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-white/30 uppercase font-bold tracking-[0.4em] outline-none whitespace-pre-line" style={{ fontSize: `${8 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
            {data.texto_apoio || 'Instruções Finais'}
          </span>
        </SmartElement>
        {showBrandHandle && brandHandle && (
          <span className="font-outfit text-white/30 text-[8px] tracking-[0.4em] uppercase font-bold pointer-events-none" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>@{brandHandle}</span>
        )}
      </div>

    </div>
  );
}

export function CTAVariant122(props) {
  const { data, index, brandColor, website, titleFont, textFont, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0 };

  return (
    <div className="w-full h-full relative bg-[#FDFBF7] overflow-hidden flex flex-col p-10 border border-black/5">
      
      <div className="flex justify-between items-start w-full opacity-30 pointer-events-none">
        <Feather className="w-5 h-5 text-[#1a1a1a]" strokeWidth={1} />
      </div>

      <div className="flex-1 flex flex-col justify-center items-end text-right gap-4 pointer-events-none">
        
        <div className="flex items-center gap-6 group/word pointer-events-auto">
          <SmartElement slideIndex={index} field="badge_text" position={pos('badge_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'badge_text'} onSelectElement={onSelectElement}>
            <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)} className="font-outfit italic font-light text-[#1a1a1a] tracking-tighter opacity-30 group-hover/word:opacity-100 outline-none" style={{ fontSize: `${64 * sTitle}px`, fontFamily: data.tagFont || data.textFont || 'Outfit' }}>
              {data.badge_text || 'admirar.'}
            </span>
          </SmartElement>
          <Star className="w-5 h-5 opacity-0" strokeWidth={1.5} style={{ color: brandColor }} />
        </div>

        <div className="flex items-center gap-6 group/word pointer-events-auto">
          <SmartElement slideIndex={index} field="insta_ready" position={pos('insta_ready')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'insta_ready'} onSelectElement={onSelectElement}>
            <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'insta_ready', e.currentTarget.innerText)} className="font-outfit italic font-light text-[#1a1a1a] tracking-tighter opacity-30 group-hover/word:opacity-100 outline-none" style={{ fontSize: `${64 * sTitle}px`, fontFamily: data.tagFont || data.textFont || 'Outfit' }}>
              {data.insta_ready || 'enviar.'}
            </span>
          </SmartElement>
          <Send className="w-5 h-5 opacity-0" strokeWidth={1.5} style={{ color: brandColor }} />
        </div>

        <div className="flex items-center gap-6 group/word pointer-events-auto" style={{ color: brandColor }}>
          <SmartElement slideIndex={index} field="cta_text" position={pos('cta_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'cta_text'} onSelectElement={onSelectElement}>
            <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)} className="font-outfit italic font-medium tracking-tighter outline-none" style={{ fontSize: `${72 * sTitle}px`, fontFamily: data.tagFont || data.textFont || 'Outfit' }}>
              {data.cta_text || 'guardar.'}
            </span>
          </SmartElement>
          <Bookmark className="w-6 h-6 opacity-0" fill="currentColor" strokeWidth={1.5} />
        </div>

      </div>

      <div className="w-full flex justify-start items-end border-t border-[#1a1a1a]/10 pt-6 pointer-events-none">
        <span className="font-outfit text-[#1a1a1a]/40 text-[8px] tracking-[0.4em] uppercase font-bold" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>
          {website || "MEUSITE.COM.BR"}
        </span>
      </div>

    </div>
  );
}

export function CTAVariant123(props) {
  const { data, index, brandColor, titleFont, textFont, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0 };

  return (
    <div className="w-full h-full relative bg-[#0c0a09] overflow-hidden flex flex-col p-10">
      
      <div className="flex-1 flex flex-col justify-center pointer-events-none">
        
        <div className="group/item self-start flex items-center gap-4 mb-4 pointer-events-auto">
          <SmartElement slideIndex={index} field="badge_text" position={pos('badge_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'badge_text'} onSelectElement={onSelectElement}>
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)} className="font-outfit font-normal text-white opacity-30 tracking-tight outline-none" style={{ fontSize: `${56 * sTitle}px`, fontFamily: data.tagFont || data.textFont || 'Outfit' }}>
              {data.badge_text || 'Curtir'}
            </h2>
          </SmartElement>
          <Heart className="w-6 h-6 text-white opacity-0" strokeWidth={1.5} />
        </div>

        <div className="group/item self-center flex items-center gap-4 mb-4 pointer-events-auto">
          <SmartElement slideIndex={index} field="insta_ready" position={pos('insta_ready')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'insta_ready'} onSelectElement={onSelectElement}>
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'insta_ready', e.currentTarget.innerText)} className="font-outfit font-normal text-white opacity-30 tracking-tight outline-none" style={{ fontSize: `${56 * sTitle}px`, fontFamily: data.tagFont || data.textFont || 'Outfit' }}>
              {data.insta_ready || 'Enviar'}
            </h2>
          </SmartElement>
          <Send className="w-6 h-6 text-white opacity-0" strokeWidth={1.5} />
        </div>

        <div className="group/item self-end flex items-center gap-4 pointer-events-auto" style={{ color: brandColor }}>
          <SmartElement slideIndex={index} field="cta_text" position={pos('cta_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'cta_text'} onSelectElement={onSelectElement}>
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)} className="font-outfit italic font-medium tracking-tight outline-none" style={{ fontSize: `${64 * sTitle}px`, fontFamily: data.tagFont || data.textFont || 'Outfit' }}>
              {data.cta_text || 'Salvar'}
            </h2>
          </SmartElement>
          <Bookmark className="w-8 h-8 opacity-0" fill="currentColor" strokeWidth={1.5} />
        </div>

      </div>

      <div className="w-full flex justify-between items-end border-t border-white/10 pt-6">
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="w-auto">
          <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-white/30 uppercase font-bold tracking-[0.4em] outline-none whitespace-pre-line" style={{ fontSize: `${8 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
            {data.texto_apoio || 'Desfecho'}
          </span>
        </SmartElement>
        <ArrowRight className="w-4 h-4 text-white/30 pointer-events-none" />
      </div>

    </div>
  );
}

export function CTAVariant124(props) {
  const { data, index, brandColor, titleFont, textFont, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0 };

  return (
    <div className="w-full h-full relative bg-[#050505] overflow-hidden flex flex-col p-10 border-l border-r border-white/5">
      
      <div className="w-8 h-[1px] mb-auto pointer-events-none" style={{ backgroundColor: brandColor }}></div>

      <div className="my-auto">
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="mb-10 w-full">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-light text-white leading-[0.9] tracking-tighter outline-none whitespace-pre-line" style={{ fontSize: `${98 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
            {data.titulo}
          </h2>
        </SmartElement>

        <div className="flex flex-col gap-5 pointer-events-none">
          <div className="flex items-center gap-4 group/action pointer-events-auto">
            <Bookmark className="w-4 h-4" strokeWidth={1.5} fill={brandColor} style={{ color: brandColor }} />
            <SmartElement slideIndex={index} field="cta_text" position={pos('cta_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'cta_text'} onSelectElement={onSelectElement}>
              <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)} className="font-outfit font-light text-white uppercase tracking-[0.3em] outline-none" style={{ fontSize: `${18 * sText}px`, fontFamily: data.tagFont || data.textFont || 'Outfit' }}>
                {data.cta_text || 'Arquivar Coleção'}
              </span>
            </SmartElement>
          </div>
          <div className="flex items-center gap-4 group/action pointer-events-auto">
            <Send className="w-4 h-4 text-white/40" strokeWidth={1.5} />
            <SmartElement slideIndex={index} field="insta_ready" position={pos('insta_ready')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'insta_ready'} onSelectElement={onSelectElement}>
              <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'insta_ready', e.currentTarget.innerText)} className="font-outfit font-light text-white/40 uppercase tracking-[0.3em] outline-none" style={{ fontSize: `${18 * sText}px`, fontFamily: data.tagFont || data.textFont || 'Outfit' }}>
                {data.insta_ready || 'Enviar a um amigo'}
              </span>
            </SmartElement>
          </div>
        </div>
      </div>

      <div className="mt-auto flex justify-end pointer-events-none">
        <CornerDownRight className="w-5 h-5 text-white/20" strokeWidth={1} />
      </div>

    </div>
  );
}

export function CTAVariant125(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, brandAvatar } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-[#F4F1EB] flex flex-col overflow-hidden border border-black/5">
      <SlideHeader {...props} index={index + 1} />
      
      <div className="w-full h-[55%] relative p-4 pb-0">
        <div className="w-full h-full rounded-t-xl overflow-hidden relative shadow-sm">
          <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0" />
        </div>
      </div>

      <div className="flex-1 flex flex-col p-8 pt-6 relative">
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="mb-4 w-full">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-black text-[#1a1a1a] leading-[0.8] tracking-tighter outline-none whitespace-pre-line" style={{ fontSize: `${72 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
            {data.titulo}
          </h2>
        </SmartElement>
        
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="max-w-[180px]">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-zinc-500 uppercase tracking-[0.2em] font-medium leading-relaxed outline-none whitespace-pre-line" style={{ fontSize: `${9 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
            {data.texto_apoio}
          </p>
        </SmartElement>

        <div className="mt-auto flex justify-between items-end w-full border-t border-zinc-200 pt-4 pointer-events-none">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full overflow-hidden border border-zinc-300">
              {brandAvatar ? (
                <img src={brandAvatar} alt="profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-zinc-200" />
              )}
            </div>
            <span className="font-outfit font-bold text-zinc-400 text-[8px] tracking-[0.2em] uppercase">
              @{brandHandle}
            </span>
          </div>

          <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg pointer-events-auto" style={{ backgroundColor: brandColor }}>
            <Bookmark className="w-4 h-4 text-white" fill="currentColor" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CTAVariant126(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, brandAvatar } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-[#F4F1EB] overflow-hidden flex flex-col p-3 border-[8px]" style={{ borderColor: brandColor }}>
      <SlideHeader {...props} index={index + 1} hideDot />

      <div className="w-full h-[55%] rounded-xl overflow-hidden relative shadow-sm mb-3">
        <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0" />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-2 pointer-events-none">
          <div className="w-4 h-4 rounded-full overflow-hidden">
            {brandAvatar ? (
              <img src={brandAvatar} alt="profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-zinc-200" />
            )}
          </div>
          <span className="font-outfit font-bold text-[#1a1a1a] text-[8px] uppercase tracking-widest">
            Ação Final
          </span>
        </div>
      </div>

      <div className="flex-1 flex gap-3 w-full">
        <div className="w-[45%] h-full rounded-xl p-4 flex flex-col justify-center items-center text-center relative overflow-hidden pointer-events-none" style={{ backgroundColor: brandColor }}>
          <Bookmark className="absolute -right-4 -bottom-4 w-20 h-20 text-white opacity-10" fill="currentColor" />
          <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="pointer-events-auto z-10">
            <h3 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair italic text-white text-2xl mb-2 outline-none whitespace-pre-line" style={{ fontSize: `${24 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
              {data.titulo || 'Salvar'}
            </h3>
          </SmartElement>
          <CheckCircle2 className="w-5 h-5 text-white/50 relative z-10" />
        </div>

        <div className="flex-1 h-full bg-[#1a1a1a] rounded-xl p-4 flex flex-col justify-between pointer-events-none">
          <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="pointer-events-auto">
            <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-white/70 uppercase tracking-widest leading-relaxed outline-none whitespace-pre-line" style={{ fontSize: `${9 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
              {data.texto_apoio}
            </p>
          </SmartElement>
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center self-end">
            <Send className="w-4 h-4 text-[#1a1a1a]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CTAVariant127(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, brandAvatar } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-[#0A0A0A] overflow-hidden flex flex-col">
      <SlideHeader {...props} index={index + 1} dark />

      <div className="w-full h-[55%] relative">
        <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0 opacity-80" />
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2 pointer-events-none">
          <div className="w-3 h-3 rounded-full overflow-hidden">
            {brandAvatar ? (
              <img src={brandAvatar} alt="profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-zinc-800" />
            )}
          </div>
          <span className="font-outfit text-white text-[8px] uppercase tracking-widest">{brandHandle}</span>
        </div>
      </div>

      <div className="w-full h-1" style={{ backgroundColor: brandColor }}></div>

      <div className="flex-1 flex flex-col p-8 pt-6 relative">
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="mb-4 w-full">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-black text-white leading-[0.8] tracking-tighter outline-none whitespace-pre-line" style={{ fontSize: `${64 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
            {data.titulo}
          </h2>
        </SmartElement>
        
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="max-w-[200px]">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-zinc-500 uppercase tracking-[0.2em] font-medium leading-relaxed outline-none whitespace-pre-line" style={{ fontSize: `${10 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
            {data.texto_apoio}
          </p>
        </SmartElement>

        <div className="mt-auto flex justify-between items-end w-full border-t border-white/10 pt-4 pointer-events-none">
          <MoreHorizontal className="w-5 h-5 text-zinc-600" />
          <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(222,30,77,0.4)] pointer-events-auto" style={{ backgroundColor: brandColor, boxShadow: `0 0 20px ${brandColor}66` }}>
            <Bookmark className="w-4 h-4 text-white" fill="currentColor" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CTAVariant128(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, brandAvatar } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-[#050505] overflow-hidden flex">
      <SlideHeader {...props} index={index + 1} dark />

      <div className="w-[35%] h-full flex flex-col justify-between p-4 relative z-10 shadow-[10px_0_30px_rgba(0,0,0,0.3)]" style={{ backgroundColor: brandColor }}>
        <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center pointer-events-none">
          <CheckCircle2 className="w-4 h-4 text-white" />
        </div>

        <div className="my-auto pointer-events-none">
          <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="pointer-events-auto">
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-outfit font-black text-white leading-[0.8] tracking-tighter outline-none whitespace-pre-line" style={{ fontSize: `${36 * sTitle}px`, fontFamily: data.titleFont || 'Outfit' }}>
              {data.titulo || 'SALVAR'}
            </h2>
          </SmartElement>
        </div>

        <div className="flex items-center gap-2 pointer-events-none">
          <span className="font-outfit font-bold text-white text-[8px] uppercase tracking-widest">Ação</span>
          <ArrowRight className="w-3 h-3 text-white" />
        </div>
      </div>

      <div className="w-[65%] h-full relative overflow-hidden">
        <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0" />
        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute top-4 right-4 flex items-center gap-2 pointer-events-none">
          <span className="font-outfit font-bold text-white text-[8px] uppercase tracking-widest drop-shadow-md">
            @{brandHandle}
          </span>
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/50 shadow-md">
            {brandAvatar ? (
              <img src={brandAvatar} alt="profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-zinc-800" />
            )}
          </div>
        </div>

        <div className="absolute bottom-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white pointer-events-none">
          <Bookmark className="w-5 h-5" fill="currentColor" />
        </div>
      </div>
    </div>
  );
}

export function CTAVariant129(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-[#1a1a1a] overflow-hidden flex flex-col" style={{ backgroundColor: brandColor }}>
      <SlideHeader {...props} index={index + 1} dark hideDot />

      <div className="h-[60%] w-full relative">
        <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0" />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="absolute top-4 left-4 border border-white/30 px-3 py-1 bg-white/10 backdrop-blur-sm pointer-events-none">
          <span className="font-outfit font-bold text-white text-[8px] uppercase tracking-widest">{brandHandle}</span>
        </div>
      </div>

      <div className="relative z-10 w-[90%] mx-auto bg-[#F4F1EB] -mt-12 rounded-t-lg rounded-b-lg shadow-2xl p-6 flex flex-col h-[40%] border-b-4 border-[#1a1a1a]">
        <div className="absolute -top-6 right-6 w-12 h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center shadow-lg pointer-events-none">
          <Bookmark className="w-5 h-5 text-white" fill="currentColor" />
        </div>

        <div className="mt-2 flex-1">
          <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement}>
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-black text-[#1a1a1a] leading-none mb-2 outline-none whitespace-pre-line" style={{ fontSize: `${32 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
              {data.titulo || 'SALVAR'}
            </h2>
          </SmartElement>
          
          <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement}>
            <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-zinc-500 leading-relaxed outline-none whitespace-pre-line" style={{ fontSize: `${10 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
              {data.texto_apoio}
            </p>
          </SmartElement>
        </div>

        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-zinc-200 pointer-events-none">
          <div className="w-6 h-6 bg-[#DE1E4D]/10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${brandColor}1a` }}>
            <ArrowRight className="w-3 h-3 text-[#DE1E4D]" style={{ color: brandColor }} />
          </div>
          <span className="font-outfit font-bold text-[#1a1a1a] text-[10px] uppercase tracking-widest">
            Partilhar Coleção
          </span>
        </div>
      </div>
    </div>
  );
}

export function CTAVariant130(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-[#EBE7E0] overflow-hidden flex flex-col items-center justify-center p-8 border border-zinc-200">
      <SlideHeader {...props} index={index + 1} hideDot />

      <div className="absolute top-8 text-center flex flex-col items-center w-full px-8">
        <span className="font-outfit font-bold text-[#DE1E4D] text-[8px] tracking-[0.3em] uppercase mb-4 flex items-center gap-2" style={{ color: brandColor }}>
          <div className="w-1 h-1 bg-[#DE1E4D] rounded-full" style={{ backgroundColor: brandColor }} />
          @{brandHandle}
          <div className="w-1 h-1 bg-[#DE1E4D] rounded-full" style={{ backgroundColor: brandColor }} />
        </span>
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="w-full">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair italic font-bold text-[#1a1a1a] leading-none tracking-tight outline-none whitespace-pre-line" style={{ fontSize: `${48 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
            {data.titulo || 'A Coleção'}
          </h2>
        </SmartElement>
      </div>

      <div className="w-[85%] aspect-[4/3] rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.15)] relative mt-16">
        <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0" />
      </div>

      <div className="absolute bottom-8 w-full px-8 flex justify-between items-end pointer-events-none">
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="max-w-[120px] pointer-events-auto">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit font-medium text-zinc-500 uppercase tracking-widest leading-tight outline-none whitespace-pre-line" style={{ fontSize: `${9 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
            {data.texto_apoio || 'Guarde o seu favorito.'}
          </p>
        </SmartElement>

        <div className="flex gap-2 pointer-events-auto">
          <div className="bg-[#1a1a1a] p-3 rounded-full shadow-lg" style={{ backgroundColor: brandColor }}>
            <Bookmark className="w-4 h-4 text-white" fill="currentColor" />
          </div>
          <div className="bg-white p-3 rounded-full shadow-sm">
            <Send className="w-4 h-4 text-[#1a1a1a]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CTAVariant131(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, brandAvatar } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-gradient-to-b from-white to-[#F4F1EB] overflow-hidden flex flex-col">
      <SlideHeader {...props} index={index + 1} hideDot />

      <div className="h-[25%] w-full bg-[#DE1E4D] px-6 py-6 flex justify-between items-start relative z-0" style={{ backgroundColor: brandColor }}>
        <div className="w-6 h-6 rounded-full overflow-hidden border border-white/30">
          {brandAvatar ? (
            <img src={brandAvatar} alt="profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-white/20" />
          )}
        </div>
        <span className="font-outfit font-bold text-white text-[8px] uppercase tracking-widest">
          FINALIZAR
        </span>
      </div>

      <div className="relative z-10 w-[85%] mx-auto -mt-16 aspect-[4/3] rounded-xl overflow-hidden shadow-2xl bg-zinc-200">
        <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0" />
      </div>

      <div className="flex-1 px-8 pt-8 flex flex-col">
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement}>
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-black text-[#1a1a1a] leading-none mb-2 outline-none whitespace-pre-line" style={{ fontSize: `${40 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
            {data.titulo || 'SALVAR'}
          </h2>
        </SmartElement>

        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement}>
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-zinc-500 outline-none whitespace-pre-line" style={{ fontSize: `${12 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
            {data.texto_apoio || 'Arquive a sua seleção definitiva.'}
          </p>
        </SmartElement>

        <div className="mt-auto mb-8 flex justify-between items-center w-full border-t border-zinc-200 pt-6 pointer-events-none">
          <span className="font-outfit font-bold text-zinc-400 text-[8px] tracking-[0.2em] uppercase">
            @{brandHandle}
          </span>
          <div className="w-12 h-12 rounded-full border border-[#DE1E4D] flex items-center justify-center pointer-events-auto" style={{ borderColor: brandColor }}>
            <Bookmark className="w-5 h-5 text-[#DE1E4D]" style={{ color: brandColor }} fill="currentColor" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CTAVariant132(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, brandAvatar } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-[#F4F1EB] overflow-hidden flex flex-col border border-black/5">
      <SlideHeader {...props} index={index + 1} hideDot />

      <div className="px-8 pt-8 pb-4 flex justify-between items-center pointer-events-none">
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="pointer-events-auto">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-outfit font-black text-[#1a1a1a] tracking-tighter uppercase outline-none whitespace-pre-line" style={{ fontSize: `${30 * sTitle}px`, fontFamily: data.titleFont || 'Outfit' }}>
            {data.titulo || 'GUARDAR'}
          </h2>
        </SmartElement>
        <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-200">
          {brandAvatar ? (
            <img src={brandAvatar} alt="profile" className="w-full h-full object-cover grayscale" />
          ) : (
            <div className="w-full h-full bg-zinc-300" />
          )}
        </div>
      </div>

      <div className="w-full h-[45%] relative my-auto">
        <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0" />
      </div>

      <div className="px-8 pb-8 pt-6 flex flex-col">
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="mb-6">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-playfair italic text-[#1a1a1a] font-medium outline-none whitespace-pre-line leading-snug" style={{ fontSize: `${18 * sText}px`, fontFamily: data.textFont || 'Playfair Display' }}>
            {data.texto_apoio || 'Mantenha a excelência no seu arquivo pessoal.'}
          </p>
        </SmartElement>

        <div className="flex justify-between items-center pointer-events-none">
          <span className="font-outfit font-bold text-zinc-400 text-[8px] tracking-[0.2em] uppercase">
            @{brandHandle}
          </span>

          <div className="flex gap-2 pointer-events-auto">
            <div className="w-10 h-10 rounded-sm flex items-center justify-center shadow-md" style={{ backgroundColor: brandColor }}>
              <Bookmark className="w-4 h-4 text-white" fill="currentColor" />
            </div>
            <div className="w-10 h-10 bg-white rounded-sm flex items-center justify-center shadow-sm">
              <Send className="w-4 h-4 text-[#1a1a1a]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CTAVariant133(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-[#DE1E4D] overflow-hidden flex flex-col" style={{ backgroundColor: brandColor }}>
      <SlideHeader {...props} index={index + 1} dark hideDot />

      <div className="h-[55%] w-full relative">
        <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0" />
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
        <div className="absolute top-6 left-6 border border-white/20 px-3 py-1 bg-black/40 backdrop-blur-md pointer-events-none">
          <span className="font-outfit font-bold text-white text-[8px] uppercase tracking-widest">
            FIM DO CONTEÚDO
          </span>
        </div>
      </div>

      <div className="relative z-10 w-[85%] mx-auto bg-[#FDFBF7] -mt-16 rounded-xl shadow-2xl p-6 pb-8 flex flex-col h-[40%] border-b-[8px] border-[#DE1E4D]" style={{ borderBottomColor: brandColor }}>
        <div className="absolute -top-6 right-8 w-12 h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center shadow-lg pointer-events-none">
          <Bookmark className="w-5 h-5 text-white" fill="currentColor" />
        </div>

        <div className="mt-4 flex-1">
          <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement}>
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-black text-[#1a1a1a] leading-none mb-2 outline-none whitespace-pre-line uppercase" style={{ fontSize: `${30 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
              {data.titulo || 'O Veredito'}
            </h2>
          </SmartElement>
          
          <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement}>
            <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-zinc-500 leading-relaxed outline-none whitespace-pre-line" style={{ fontSize: `${12 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
              {data.texto_apoio || 'A excelência merece um lugar cativo no seu arquivo. Toque no ícone acima para salvar.'}
            </p>
          </SmartElement>
        </div>

        <div className="flex items-center gap-3 mt-auto pt-4 pointer-events-none">
          <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
            <Send className="w-3 h-3 text-[#1a1a1a]" />
          </div>
          <span className="font-outfit font-bold text-[#1a1a1a] text-[10px] uppercase tracking-widest">
            Enviar Recomendaçao
          </span>
        </div>
      </div>
    </div>
  );
}

export function CTAVariant134(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, brandAvatar } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-[#F4F1EB] overflow-hidden flex flex-col items-center justify-center p-8 border border-zinc-200">
      <SlideHeader {...props} index={index + 1} hideDot />

      <div className="absolute top-10 flex flex-col items-center pointer-events-none">
        <span className="font-outfit font-bold text-[#DE1E4D] text-[8px] tracking-[0.3em] uppercase mb-1" style={{ color: brandColor }}>
          @{brandHandle}
        </span>
        <div className="flex gap-1">
          <div className="w-1 h-1 bg-zinc-300 rounded-full" />
          <div className="w-1 h-1 bg-zinc-300 rounded-full" />
          <div className="w-1 h-1 bg-[#DE1E4D] rounded-full" style={{ backgroundColor: brandColor }} />
        </div>
      </div>

      <div className="w-full bg-white rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-8 flex flex-col items-center text-center mt-8 pointer-events-none">
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="pointer-events-auto">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair italic font-medium text-[#1a1a1a] leading-none mb-4 outline-none whitespace-pre-line" style={{ fontSize: `${56 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
            {data.titulo || 'Eternize.'}
          </h2>
        </SmartElement>
        
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="pointer-events-auto mb-8">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-zinc-500 uppercase tracking-[0.2em] font-medium outline-none whitespace-pre-line" style={{ fontSize: `${10 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
            {data.texto_apoio || 'Faça desta seleção a sua referência.'}
          </p>
        </SmartElement>

        <div className="flex w-full gap-3 pointer-events-auto">
          <div className="flex-1 bg-[#1a1a1a] text-white py-3 rounded-xl flex items-center justify-center gap-2" style={{ backgroundColor: brandColor }}>
            <Bookmark className="w-4 h-4" fill="currentColor" />
            <span className="font-outfit font-bold text-[10px] uppercase tracking-widest">Salvar</span>
          </div>
          <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center">
            <Send className="w-4 h-4 text-[#1a1a1a]" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 w-full flex justify-center pointer-events-none">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
          {brandAvatar ? (
            <img src={brandAvatar} alt="profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-zinc-200" />
          )}
        </div>
      </div>
    </div>
  );
}

export function CTAVariant135(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, brandAvatar } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-gradient-to-b from-white to-[#F9F8F5] overflow-hidden flex flex-col">
      <SlideHeader {...props} index={index + 1} hideDot />

      <div className="h-[30%] w-full bg-[#DE1E4D] px-6 py-6 flex justify-between items-start relative z-0" style={{ backgroundColor: brandColor }}>
        <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20 pointer-events-none">
          <CheckCircle2 className="w-3 h-3 text-white" />
          <span className="font-outfit font-bold text-white text-[8px] uppercase tracking-widest">
            COLEÇÃO 001
          </span>
        </div>
      </div>

      <div className="relative z-10 w-[85%] mx-auto -mt-20 bg-white rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] p-6 border border-zinc-100 flex flex-col pointer-events-none">
        <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-md mx-auto -mt-12 bg-white">
          {brandAvatar ? (
            <img src={brandAvatar} alt="profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-zinc-200" />
          )}
        </div>

        <div className="text-center mt-4 mb-6">
          <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="pointer-events-auto">
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-black text-[#1a1a1a] leading-none mb-1 outline-none whitespace-pre-line uppercase" style={{ fontSize: `${30 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
              {data.titulo || 'A CHEF RECOMENDA'}
            </h2>
          </SmartElement>
          
          <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="pointer-events-auto">
            <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-zinc-500 uppercase tracking-widest outline-none whitespace-pre-line" style={{ fontSize: `${10 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
              {data.texto_apoio || 'Não perca esta referência de vista.'}
            </p>
          </SmartElement>
        </div>

        <div className="bg-zinc-50 rounded-lg p-2 flex justify-between items-center pointer-events-auto">
          <span className="font-outfit font-bold text-[#1a1a1a] text-[10px] uppercase tracking-widest pl-2">
            Adicionar ao Arquivo
          </span>
          <div className="w-8 h-8 bg-white rounded-md shadow-sm flex items-center justify-center" style={{ backgroundColor: `${brandColor}1a` }}>
            <Bookmark className="w-4 h-4" style={{ color: brandColor }} />
          </div>
        </div>
      </div>

      <div className="mt-auto mb-8 flex justify-end px-8 pointer-events-none">
        <div className="w-10 h-10 rounded-full border border-[#DE1E4D] flex items-center justify-center pointer-events-auto" style={{ borderColor: brandColor }}>
          <ArrowRight className="w-4 h-4 text-[#DE1E4D]" style={{ color: brandColor }} />
        </div>
      </div>
    </div>
  );
}

export function CTAVariant136(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-[#FDFBF7] overflow-hidden flex flex-col p-10 border border-black/5">
      <SlideHeader {...props} index={index + 1} hideDot />

      <div className="flex justify-between items-start w-full mb-12 pointer-events-none">
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="pointer-events-auto">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-outfit font-black text-[#1a1a1a] tracking-tighter uppercase outline-none whitespace-pre-line" style={{ fontSize: `${24 * sTitle}px`, fontFamily: data.titleFont || 'Outfit' }}>
            {data.titulo || 'O FINAL'}
          </h2>
        </SmartElement>
        <div className="w-5 h-5 border border-zinc-300 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-3 h-3 text-[#DE1E4D]" style={{ color: brandColor }} />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center pointer-events-none">
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="pointer-events-auto mb-8">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-playfair italic text-[#1a1a1a] font-medium leading-snug outline-none whitespace-pre-line" style={{ fontSize: `${24 * sText}px`, fontFamily: data.textFont || 'Playfair Display' }}>
            {data.texto_apoio || 'O bom gosto exige ser arquivado. Escolha o seu próximo passo.'}
          </p>
        </SmartElement>

        <div className="flex flex-col gap-4 border-l-2 border-zinc-200 pl-4">
          <div className="flex items-center gap-3">
            <Bookmark className="w-4 h-4 text-zinc-400" />
            <span className="font-outfit font-bold text-[#1a1a1a] text-[10px] uppercase tracking-widest">
              Salvar Coleção
            </span>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <Send className="w-4 h-4 text-zinc-400" />
            <span className="font-outfit font-bold text-zinc-500 text-[10px] uppercase tracking-widest">
              Enviar a Conhecidos
            </span>
          </div>
        </div>
      </div>

      <div className="mt-auto flex justify-between items-end w-full pointer-events-none">
        <span className="font-outfit font-bold text-zinc-400 text-[8px] tracking-[0.2em] uppercase">
          @{brandHandle}
        </span>
        
        <div className="w-10 h-10 bg-[#DE1E4D] rounded-sm flex items-center justify-center shadow-md pointer-events-auto" style={{ backgroundColor: brandColor }}>
          <Bookmark className="w-4 h-4 text-white" fill="currentColor" />
        </div>
      </div>
    </div>
  );
}

export function CTAVariant137(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, brandAvatar } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-[#F4F1EB] flex overflow-hidden border border-black/5">
      <SlideHeader {...props} index={index + 1} hideDot />
      
      <div className="w-[15%] h-full flex flex-col justify-between items-center py-8 relative z-20" style={{ backgroundColor: brandColor }}>
        <CheckCircle2 className="w-4 h-4 text-white/80" />
        <span className="font-outfit font-bold text-white/50 text-[8px] tracking-[0.3em] uppercase -rotate-90 whitespace-nowrap">
          AÇÃO FINAL
        </span>
      </div>

      <div className="w-[85%] h-full p-8 flex flex-col justify-center relative">
        <div className="w-full bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col relative z-10">
          <div className="h-32 relative">
            <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0 opacity-40 grayscale" />
            <div className="absolute -bottom-6 left-6 w-12 h-12 rounded-full border-4 border-white overflow-hidden shadow-sm">
              {brandAvatar ? (
                <img src={brandAvatar} alt="profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-zinc-200" />
              )}
            </div>
          </div>

          <div className="p-8 pt-10 pb-10">
            <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement}>
              <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-black text-[#1a1a1a] leading-none mb-2 outline-none whitespace-pre-line" style={{ fontSize: `${32 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
                {data.titulo || 'SALVAR'}
              </h2>
            </SmartElement>
            
            <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement}>
              <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-zinc-500 leading-relaxed outline-none whitespace-pre-line" style={{ fontSize: `${11 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
                {data.texto_apoio || 'Mantenha este padrão de qualidade na sua coleção.'}
              </p>
            </SmartElement>

            <div className="flex items-center gap-2 mt-6 cursor-pointer pointer-events-none" style={{ color: brandColor }}>
              <Bookmark className="w-5 h-5" fill="currentColor" />
              <span className="font-outfit font-bold text-[10px] uppercase tracking-widest">
                Arquivar Post
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between items-end px-2 pointer-events-none">
          <span className="font-outfit font-bold text-zinc-400 text-[8px] uppercase tracking-widest">
            @{brandHandle}
          </span>
          <ArrowRight className="w-4 h-4" style={{ color: brandColor }} />
        </div>
      </div>
    </div>
  );
}

export function CTAVariant138(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, brandAvatar } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-[#F4F1EB] overflow-hidden flex flex-col border border-black/5">
      <SlideHeader {...props} index={index + 1} hideDot />

      <div className="h-[45%] w-full p-10 flex flex-col justify-between relative z-10 border-b-4 border-white">
        <div className="flex justify-between items-start w-full pointer-events-none">
          <span className="font-outfit font-bold text-[#1a1a1a] text-[8px] tracking-[0.2em] uppercase border-b border-[#1a1a1a] pb-1">
            @{brandHandle}
          </span>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-200">
            {brandAvatar ? (
              <img src={brandAvatar} alt="profile" className="w-full h-full object-cover grayscale" />
            ) : (
              <div className="w-full h-full bg-zinc-100" />
            )}
          </div>
        </div>

        <div>
          <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement}>
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-black text-[#1a1a1a] leading-[0.8] mb-2 outline-none whitespace-pre-line" style={{ fontSize: `${64 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
              {data.titulo || 'GUARDE.'}
            </h2>
          </SmartElement>
          <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement}>
            <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-zinc-400 text-[10px] uppercase tracking-[0.2em] font-medium outline-none" style={{ fontSize: `${10 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
              {data.texto_apoio || 'A excelência dividida.'}
            </span>
          </SmartElement>
        </div>
      </div>

      <div className="h-[55%] w-full flex gap-1 bg-white relative">
        <div className="flex-1 h-full relative overflow-hidden">
          <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0" />
        </div>
        <div className="flex-1 h-full relative overflow-hidden">
          <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0" />
        </div>
        <div className="flex-1 h-full relative overflow-hidden">
          <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0" />
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-8 py-3 rounded-full shadow-2xl flex items-center gap-2 pointer-events-none" style={{ backgroundColor: brandColor }}>
          <Bookmark className="w-3 h-3 text-white" fill="currentColor" />
          <span className="font-outfit font-bold text-white text-[10px] uppercase tracking-widest">
            SALVAR
          </span>
        </div>
      </div>
    </div>
  );
}

export function CTAVariant139(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, brandAvatar } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-white overflow-hidden flex flex-col p-4 border border-black/5">
      <SlideHeader {...props} index={index + 1} hideDot />

      <div className="flex-1 border border-zinc-100 p-6 flex flex-col relative">
        <div className="flex justify-between items-center w-full mb-8 pointer-events-none">
          <span className="font-outfit text-zinc-300 text-[8px] tracking-[0.3em] uppercase">
            AÇÃO FINAL
          </span>
          <div className="w-1.5 h-1.5 rotate-45 border border-zinc-200" />
        </div>

        <div className="w-full aspect-[4/3] relative overflow-hidden mb-10 shadow-sm rounded-sm">
          <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0 opacity-90" />
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 flex items-center gap-2 rounded-sm pointer-events-none border border-black/5">
            <div className="w-4 h-4 rounded-full overflow-hidden">
              {brandAvatar ? (
                <img src={brandAvatar} alt="profile" className="w-full h-full object-cover grayscale" />
              ) : (
                <div className="w-full h-full bg-zinc-200" />
              )}
            </div>
            <span className="font-outfit font-bold text-[#1a1a1a] text-[7px] uppercase tracking-widest">
              @{brandHandle}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center text-center mt-auto pb-6">
          <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement}>
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair italic font-medium text-[#1a1a1a] leading-[0.9] mb-6 outline-none whitespace-pre-line" style={{ fontSize: `${48 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
              {data.titulo || 'Eternize o\nSabor'}
            </h2>
          </SmartElement>

          <div className="flex items-center gap-8 mt-4 pointer-events-none">
            <div className="flex flex-col items-center gap-2 text-zinc-300">
              <Bookmark className="w-5 h-5" />
              <span className="font-outfit text-[8px] uppercase tracking-widest">Salvar</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-zinc-300">
              <Share2 className="w-5 h-5" />
              <span className="font-outfit text-[8px] uppercase tracking-widest">Enviar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CTAVariant140(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, brandAvatar } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-[#FDFBF7] overflow-hidden flex flex-col border border-black/5">
      <SlideHeader {...props} index={index + 1} hideDot />

      <div className="flex-1 p-10 flex flex-col relative z-10">
        <div className="flex justify-between items-start pointer-events-none">
          <div className="w-14 h-14 rounded-full overflow-hidden border border-zinc-100 shadow-md bg-white p-0.5">
            {brandAvatar ? (
              <img src={brandAvatar} alt="profile" className="w-full h-full object-cover rounded-full grayscale" />
            ) : (
              <div className="w-full h-full bg-zinc-100 rounded-full" />
            )}
          </div>
          <span className="font-outfit font-bold text-zinc-300 text-[8px] uppercase tracking-[0.2em] mt-2">
            @{brandHandle}
          </span>
        </div>

        <div className="mt-16">
          <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement}>
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-black text-[#1a1a1a] leading-[0.8] tracking-tighter mb-6 outline-none whitespace-pre-line" style={{ fontSize: `${72 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
              {data.titulo || 'NÃO\nPERCA.'}
            </h2>
          </SmartElement>
          <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement}>
            <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-zinc-500 text-xs max-w-[200px] leading-relaxed outline-none whitespace-pre-line" style={{ fontSize: `${12 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
              {data.texto_apoio || 'As melhores referências devem ficar arquivadas.'}
            </p>
          </SmartElement>
        </div>
      </div>

      <div className="h-[35%] w-full p-10 flex justify-between items-end relative" style={{ backgroundColor: brandColor }}>
        <div className="absolute -top-8 left-10 bg-white text-[#1a1a1a] p-5 rounded-full shadow-2xl pointer-events-none">
          <Bookmark className="w-6 h-6" style={{ color: brandColor }} fill="currentColor" />
        </div>
        
        <span className="font-outfit font-bold text-white/50 text-[10px] tracking-widest uppercase">
          Toque para Salvar
        </span>
        <ArrowRight className="w-5 h-5 text-white" />
      </div>
    </div>
  );
}

export function CTAVariant141(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, brandAvatar } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-[#F4F1EB] flex overflow-hidden border border-black/5">
      <SlideHeader {...props} index={index + 1} hideDot />
      
      <div className="w-[15%] h-full flex flex-col justify-between items-center py-8 z-10 shadow-[10px_0_20px_rgba(0,0,0,0.05)]" style={{ backgroundColor: brandColor }}>
        <CheckCircle2 className="w-5 h-5 text-white/90" />
        <span className="font-outfit font-bold text-white/70 text-[10px] tracking-[0.4em] uppercase -rotate-90 whitespace-nowrap">
          Vol. Final
        </span>
      </div>

      <div className="w-[85%] h-full p-8 flex flex-col justify-center relative">
        <div className="absolute top-8 right-8 w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
          {brandAvatar ? (
            <img src={brandAvatar} alt="profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-zinc-200" />
          )}
        </div>

        <div className="mb-10 mt-12">
          <span className="font-outfit font-black text-[10px] tracking-widest uppercase mb-2 block" style={{ color: brandColor }}>
            Ação Requerida
          </span>
          <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement}>
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-black text-[#1a1a1a] leading-[0.9] tracking-tight mb-4 outline-none whitespace-pre-line" style={{ fontSize: `${52 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
              {data.titulo || 'GUARDE A\nREFERÊNCIA'}
            </h2>
          </SmartElement>
          
          <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement}>
            <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-zinc-500 text-xs leading-relaxed max-w-[200px] outline-none whitespace-pre-line" style={{ fontSize: `${12 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
              {data.texto_apoio || 'Para quando a vontade bater, a excelência estar à distância de um clique.'}
            </p>
          </SmartElement>
        </div>

        <div className="flex flex-col gap-3 pointer-events-none">
          <div className="w-full bg-white border border-zinc-200 p-4 rounded-xl flex items-center justify-between shadow-sm pointer-events-auto">
            <div className="flex items-center gap-3">
              <Bookmark className="w-5 h-5" style={{ color: brandColor }} fill="currentColor" strokeWidth={1} />
              <span className="font-outfit font-bold text-[#1a1a1a] text-[11px] uppercase tracking-widest">       
                Salvar Coleção
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-300" />     
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-zinc-200 w-full flex justify-between items-center pointer-events-none">
          <span className="font-outfit font-bold text-zinc-400 text-[8px] uppercase tracking-[0.3em]">
            @{brandHandle}
          </span>
          <MoreHorizontal className="w-4 h-4 text-zinc-300 pr-2" />
        </div>
      </div>
    </div>
  );
}

export function CTAVariant142(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-[#F4F1EB] overflow-hidden flex flex-col border border-black/5">
      <SlideHeader {...props} index={index + 1} hideDot />

      <div className="h-[40%] w-full p-8 flex flex-col justify-center relative z-10 border-b-4 border-white">     
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center border-b border-[#1a1a1a]/10 pb-2 pointer-events-none">
          <span className="font-outfit font-bold text-[#1a1a1a] text-[8px] tracking-[0.3em] uppercase">
            @{brandHandle}
          </span>
        </div>

        <div className="mt-4">
          <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement}>
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-black text-[#1a1a1a] leading-[0.85] tracking-tighter mb-2 outline-none whitespace-pre-line" style={{ fontSize: `${56 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
              {data.titulo || 'O VEREDITO'}
            </h2>
          </SmartElement>
          
          <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement}>
            <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-zinc-500 text-[9px] uppercase tracking-[0.2em] font-medium outline-none" style={{ fontSize: `${9 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
              {data.texto_apoio || 'A sua interação importa.'}
            </span>
          </SmartElement>
        </div>
      </div>

      <div className="h-[60%] w-full flex gap-1 bg-white relative">
        <div className="flex-1 h-full bg-zinc-100 flex flex-col items-center justify-end pb-8 pointer-events-none">
          <Heart className="w-6 h-6 text-[#1a1a1a] mb-4" strokeWidth={1.5} />
          <span className="font-outfit font-bold text-[#1a1a1a] text-[9px] uppercase tracking-widest -rotate-90 origin-bottom translate-y-12">
            Gostar
          </span>
        </div>

        <div className="flex-1 h-full bg-[#1a1a1a] flex flex-col items-center justify-end pb-8 pointer-events-none">
          <Send className="w-6 h-6 text-white mb-4" strokeWidth={1.5} />
          <span className="font-outfit font-bold text-white text-[9px] uppercase tracking-widest -rotate-90 origin-bottom translate-y-12">
            Partilhar
          </span>
        </div>

        <div className="flex-1 h-full flex flex-col items-center justify-end pb-8 pointer-events-none" style={{ backgroundColor: brandColor }}>
          <Bookmark className="w-6 h-6 text-white mb-4" fill="currentColor" strokeWidth={1} />
          <span className="font-outfit font-bold text-white text-[9px] uppercase tracking-widest -rotate-90 origin-bottom translate-y-12">
            Salvar
          </span>
        </div>
      </div>
    </div>
  );
}

export function CTAVariant143(props) {
  const { data, index, brandColor, brandHandle, brandWebsite, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, brandAvatar } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-white overflow-hidden flex flex-col p-5 border border-black/5">
      <SlideHeader {...props} index={index + 1} hideDot />

      <div className="flex-1 border border-zinc-200 p-6 flex flex-col relative justify-between">
        <div className="flex justify-between items-center w-full pointer-events-none">
          <span className="font-outfit text-zinc-400 text-[8px] tracking-[0.4em] uppercase">
            COLEÇÃO ARQUIVADA
          </span>
          <Diamond className="w-3 h-3 text-zinc-300" strokeWidth={1.5} />
        </div>

        <div className="flex flex-col items-center text-center my-auto">
          <div className="w-20 h-20 rounded-full overflow-hidden border border-zinc-200 shadow-sm mb-6">
            {brandAvatar ? (
              <img src={brandAvatar} alt="profile" className="w-full h-full object-cover grayscale" />
            ) : (
              <div className="w-full h-full bg-zinc-100" />
            )}
          </div>

          <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement}>
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair italic font-medium text-[#1a1a1a] leading-[0.9] mb-4 outline-none whitespace-pre-line" style={{ fontSize: `${48 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
              {data.titulo || 'O Fim da\nExposição'}
            </h2>
          </SmartElement>
          
          <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement}>
            <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-zinc-500 text-[10px] leading-relaxed max-w-[200px] uppercase tracking-widest mb-8 outline-none whitespace-pre-line" style={{ fontSize: `${10 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
              {data.texto_apoio || 'Para aceder a esta galeria novamente, guarde o post.'}
            </p>
          </SmartElement>

          <div className="bg-[#1a1a1a] text-white px-8 py-3 rounded-full flex items-center gap-3 shadow-lg pointer-events-none" style={{ backgroundColor: brandColor }}>
            <Bookmark className="w-4 h-4" fill="currentColor" strokeWidth={1} />
            <span className="font-outfit font-bold text-[10px] uppercase tracking-widest">Salvar Referência</span>
          </div>
        </div>

        <div className="flex justify-center w-full pt-6 border-t border-zinc-100 pointer-events-none">
          <span className="font-outfit font-bold text-zinc-300 text-[8px] uppercase tracking-[0.4em]">
            {brandWebsite || 'TIJOANA.COM.BR'}
          </span>
        </div>
      </div>
    </div>
  );
}

export function CTAVariant144(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, brandAvatar } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-[#FDFBF7] overflow-hidden flex flex-col border border-zinc-100">
      <SlideHeader {...props} index={index + 1} hideDot />
      
      <div className="h-2 w-full" style={{ backgroundColor: brandColor }}></div>

      <div className="flex-1 p-8 flex flex-col relative z-10">
        <div className="flex justify-between items-center mb-12 pointer-events-none">
          <span className="font-outfit font-bold text-zinc-400 text-[8px] uppercase tracking-[0.3em]">
            @{brandHandle}
          </span>
          <div className="w-6 h-6 rounded-full overflow-hidden border border-zinc-200">
            {brandAvatar ? (
              <img src={brandAvatar} alt="profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-zinc-100" />
            )}
          </div>
        </div>

        <div className="mb-auto">
          <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement}>
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-black text-[#1a1a1a] leading-[0.8] tracking-tighter mb-4 outline-none whitespace-pre-line" style={{ fontSize: `${64 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
              {data.titulo || 'GUARDE.'}
            </h2>
          </SmartElement>
          <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement}>
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-playfair italic font-medium leading-[0.8] tracking-tighter outline-none whitespace-pre-line" style={{ fontSize: `${40 * sText}px`, fontFamily: data.titleFont || 'Playfair Display', color: brandColor }}>
              {data.texto_apoio || 'Para o futuro.'}
            </h2>
          </SmartElement>
        </div>

        <div className="flex flex-col w-full border-t border-[#1a1a1a]/10 pointer-events-none">
          <div className="flex justify-between items-center py-5 border-b border-[#1a1a1a]/10 pointer-events-auto">
            <div className="flex items-center gap-4 pl-2">
              <Bookmark className="w-5 h-5" style={{ color: brandColor }} strokeWidth={1.5} />
              <span className="font-outfit font-bold text-[#1a1a1a] text-xs uppercase tracking-widest">
                Arquivar Coleção
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-300 pr-2" />
          </div>

          <div className="flex justify-between items-center py-5 border-b border-[#1a1a1a]/10 pointer-events-auto">
            <div className="flex items-center gap-4 pl-2">
              <Send className="w-5 h-5 text-zinc-400" strokeWidth={1.5} />
              <span className="font-outfit font-bold text-zinc-500 text-xs uppercase tracking-widest">
                Partilhar com Amigos
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-300 pr-2" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CTAVariant145(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, brandAvatar } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-[#F4F1EB] flex flex-col overflow-hidden border border-black/5">
      <SlideHeader {...props} index={index + 1} hideDot />
      
      <div className="h-[20%] w-full flex items-center justify-center relative px-8">
        <div className="w-12 h-[1px] absolute left-8 top-10" style={{ backgroundColor: brandColor }} />
        <span className="font-outfit font-bold text-[8px] tracking-[0.3em] uppercase absolute left-8 top-12" style={{ color: brandColor }}>
          A COLEÇÃO
        </span>
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement}>
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-black text-[#1a1a1a] mt-6 outline-none whitespace-pre-line uppercase" style={{ fontSize: `${40 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
            {data.titulo || 'GUARDE'}
          </h2>
        </SmartElement>
      </div>

      <div className="h-[40%] w-full relative overflow-hidden">
        <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0" />
      </div>

      <div className="h-[40%] w-full p-8 flex flex-col justify-between" style={{ backgroundColor: brandColor }}>
        <div>
          <h3 className="font-outfit font-black text-white text-xl uppercase tracking-widest mb-2">
            ARQUIVO PESSOAL
          </h3>
          <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement}>
            <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-playfair italic text-white/80 outline-none whitespace-pre-line" style={{ fontSize: `${14 * sText}px`, fontFamily: data.textFont || 'Playfair Display' }}>
              {data.texto_apoio || 'A excelência merece ser salva.'}
            </p>
          </SmartElement>
        </div>

        <div className="flex justify-between items-end w-full pointer-events-none">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full overflow-hidden border border-white/30">
              {brandAvatar ? (
                <img src={brandAvatar} alt="profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-white/20" />
              )}
            </div>
            <span className="font-outfit font-bold text-white/70 text-[8px] uppercase tracking-widest">
              @{brandHandle}
            </span>
          </div>

          <div className="p-2 rounded-full text-white pointer-events-auto">
            <Bookmark className="w-5 h-5" fill="currentColor" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CTAVariant146(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-[#F4F1EB] overflow-hidden flex flex-col border border-black/5">
      <SlideHeader {...props} index={index + 1} hideDot />

      <div className="h-[50%] w-full flex relative">
        <div className="w-[35%] h-full p-6 flex flex-col justify-between items-start" style={{ backgroundColor: brandColor }}>
          <LayoutGrid className="w-4 h-4 text-white/50" />
          <span className="font-outfit font-bold text-white/80 text-[8px] tracking-[0.3em] uppercase -rotate-90 origin-bottom-left ml-2 mb-8 whitespace-nowrap">
            FINALIZAR
          </span>
        </div>
        <div className="w-[65%] h-full relative overflow-hidden">
          <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0" />
        </div>
      </div>

      <div className="h-[50%] w-full p-8 flex flex-col justify-between relative">
        <div className="absolute -top-6 right-8 rounded-b-xl rounded-t-sm p-4 shadow-lg cursor-pointer hover:scale-105 transition-transform pointer-events-auto" style={{ backgroundColor: brandColor }}>
          <Bookmark className="w-6 h-6 text-white" fill="currentColor" />
        </div>

        <div className="mt-4">
          <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement}>
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-black text-[#1a1a1a] mb-1 outline-none whitespace-pre-line uppercase" style={{ fontSize: `${40 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
              {data.titulo || 'SALVAR'}
            </h2>
          </SmartElement>
          <span className="font-outfit font-bold text-zinc-400 text-[10px] uppercase tracking-widest">
            Ação Necessária
          </span>
        </div>

        <div className="flex justify-between items-end w-full border-b border-zinc-300 pb-4 pointer-events-none">
          <span className="font-outfit font-bold text-[#1a1a1a] text-[9px] uppercase tracking-widest">
            @{brandHandle}
          </span>
          <div className="flex items-center gap-1">
            <span className="font-outfit font-bold text-[9px] uppercase tracking-widest" style={{ color: brandColor }}>
              ENVIAR
            </span>
            <ArrowRight className="w-3 h-3" style={{ color: brandColor }} /> 
          </div>
        </div>
      </div>
    </div>
  );
}

export function CTAVariant147(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, brandAvatar } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-gradient-to-br from-[#4a0818] to-[#1a0208] overflow-hidden flex flex-col p-4 border border-black/5">
      <div className="w-full h-full bg-[#F4F1EB] rounded-sm p-4 flex flex-col shadow-2xl relative">
        <SlideHeader {...props} index={index + 1} hideDot />

        <div className="h-[45%] w-full relative overflow-hidden rounded-sm mb-6">
          <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0" />
        </div>

        <div className="flex-1 flex flex-col px-4">
          <div className="px-2 py-1 w-fit mb-4" style={{ backgroundColor: brandColor }}>
            <span className="font-outfit font-black text-white text-[7px] uppercase tracking-widest">
              AÇÃO VIP
            </span>
          </div>

          <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement}>
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-black text-[#1a1a1a] mb-2 outline-none whitespace-pre-line uppercase" style={{ fontSize: `${40 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
              {data.titulo || 'GUARDE.'}
            </h2>
          </SmartElement>
          
          <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement}>
            <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-zinc-500 uppercase tracking-[0.2em] font-medium leading-relaxed outline-none whitespace-pre-line" style={{ fontSize: `${9 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
              {data.texto_apoio || 'Subtítulo focado em convencer o utilizador a arquivar a coleção.'}
            </p>
          </SmartElement>
        </div>

        <div className="w-full border-t border-dashed border-zinc-300 mt-auto pt-4 px-4 flex justify-between items-center pointer-events-none">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full overflow-hidden">
              {brandAvatar ? (
                <img src={brandAvatar} alt="profile" className="w-full h-full object-cover grayscale" />
              ) : (
                <div className="w-full h-full bg-zinc-200" />
              )}
            </div>
            <span className="font-outfit font-bold text-[#1a1a1a] text-[8px] uppercase tracking-widest">
              {brandHandle}
            </span>
          </div>

          <div className="flex gap-3 pointer-events-auto">
            <Bookmark className="w-4 h-4" style={{ color: brandColor }} fill="currentColor" />
            <Send className="w-4 h-4 text-zinc-400" />      
          </div>
        </div>
      </div>
    </div>
  );
}

export function CTAVariant148(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, brandAvatar } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-[#F4F1EB] overflow-hidden flex border border-black/5">
      <div className="w-[20%] h-full flex flex-col items-center justify-between py-8 z-10 shadow-lg" style={{ backgroundColor: brandColor }}>
        <CheckCircle2 className="w-5 h-5 text-white/80" />
        <span className="font-outfit font-bold text-white/50 text-[10px] tracking-[0.4em] uppercase -rotate-90 whitespace-nowrap">
          Conclusão
        </span>
      </div>

      <div className="w-[80%] h-full flex flex-col justify-between relative">
        <SlideHeader {...props} index={index + 1} hideDot />

        <div className="h-[40%] w-full relative overflow-hidden">
          <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F4F1EB] to-transparent" />
        </div>

        <div className="flex-1 p-8 pt-0 flex flex-col justify-end">
          <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement}>
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-black text-[#1a1a1a] mb-2 outline-none whitespace-pre-line uppercase" style={{ fontSize: `${40 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
              {data.titulo || 'SALVAR'}
            </h2>
          </SmartElement>
          
          <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement}>
            <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-zinc-500 text-xs mb-8 outline-none whitespace-pre-line" style={{ fontSize: `${12 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
              {data.texto_apoio || 'Não deixe esta referência perder-se no feed.'}
            </p>
          </SmartElement>

          <div className="flex items-center gap-4 bg-white border border-zinc-200 px-4 py-3 rounded-xl cursor-pointer transition-colors group/btn pointer-events-auto">
            <Bookmark className="w-5 h-5 text-[#1a1a1a] group-hover/btn:text-[#DE1E4D] transition-colors" style={{ color: brandColor }} strokeWidth={1.5} />
            <span className="font-outfit font-bold text-[#1a1a1a] text-[10px] uppercase tracking-widest group-hover/btn:text-[#DE1E4D] transition-colors">
              Arquivar Coleção
            </span>
          </div>
        </div>

        <div className="absolute top-10 right-8 pointer-events-none">
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm">
            {brandAvatar ? (
              <img src={brandAvatar} alt="profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-zinc-200" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CTAVariant149(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-[#EBE9E1] overflow-hidden flex flex-col items-center justify-center border border-black/5">
      <SlideHeader {...props} index={index + 1} dark hideDot />

      <div className="absolute inset-0 z-0">
        <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0" />
      </div>

      <div className="relative z-10 w-[85%] aspect-square bg-white/20 backdrop-blur-2xl border border-white/40 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center shadow-2xl transition-transform duration-500 group-hover:-translate-y-2 pointer-events-none">
        <Sparkles className="w-6 h-6 text-white mb-6" strokeWidth={1.5} />

        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="pointer-events-auto">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair italic font-medium text-white leading-none mb-2 drop-shadow-md outline-none whitespace-pre-line" style={{ fontSize: `${40 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
            {data.titulo || 'Eternize.'}
          </h2>
        </SmartElement>
        
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="pointer-events-auto mb-8">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-white/90 text-[10px] uppercase tracking-[0.2em] font-medium outline-none whitespace-pre-line" style={{ fontSize: `${10 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
            {data.texto_apoio || 'Guarde esta referência.'}
          </p>
        </SmartElement>

        <div className="bg-white/30 backdrop-blur-md border border-white/50 px-8 py-3 rounded-full flex items-center gap-3 shadow-lg pointer-events-auto" style={{ backgroundColor: `${brandColor}4D` }}>
          <Bookmark className="w-4 h-4 text-white" fill="currentColor" />
          <span className="font-outfit font-bold text-white text-[10px] uppercase tracking-widest">Salvar</span>
        </div>
      </div>

      <div className="absolute bottom-10 w-full text-center z-10 pointer-events-none">
        <span className="font-outfit font-bold text-white/80 text-[8px] tracking-[0.3em] uppercase drop-shadow-md">
          @{brandHandle}
        </span>
      </div>
    </div>
  );
}

export function CTAVariant150(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, brandAvatar } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-[#0A0A0A] overflow-hidden flex flex-col border border-black/5">
      <SlideHeader {...props} index={index + 1} dark hideDot />

      <div className="h-[60%] w-full relative z-0">
        <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
      </div>

      <div className="flex-1 bg-[#0A0A0A] relative z-10 p-10 flex flex-col justify-end">
        <div className="flex items-center gap-4 mb-6 pointer-events-none">
          <div className="w-8 h-[1px]" style={{ backgroundColor: brandColor }} />
          <span className="font-outfit font-bold text-white/50 text-[8px] uppercase tracking-[0.3em]">
            O PRÓXIMO PASSO
          </span>
        </div>

        <div className="flex justify-between items-end w-full pb-6 border-b border-white/10">
          <div>
            <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement}>
              <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-normal text-white leading-none mb-2 outline-none whitespace-pre-line" style={{ fontSize: `${56 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
                {data.titulo || 'SALVAR'}
              </h2>
            </SmartElement>
            
            <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement}>
              <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-white/40 text-[10px] uppercase tracking-widest outline-none" style={{ fontSize: `${10 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
                {data.texto_apoio || 'A Coleção Definitiva'}
              </span>
            </SmartElement>
          </div>

          <div className="w-14 h-14 rounded-full border flex items-center justify-center shadow-lg transition-transform hover:scale-105 pointer-events-auto" style={{ borderColor: brandColor }}>
            <Bookmark className="w-6 h-6" style={{ color: brandColor }} fill="currentColor" strokeWidth={1} />
          </div>
        </div>

        <div className="pt-6 flex items-center gap-3 pointer-events-none">
          <div className="w-6 h-6 rounded-full overflow-hidden border border-white/20 grayscale">
            {brandAvatar ? (
              <img src={brandAvatar} alt="profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-zinc-800" />
            )}
          </div>
          <span className="font-outfit text-white/30 text-[8px] tracking-[0.2em] uppercase">@{brandHandle}</span>
        </div>
      </div>
    </div>
  );
}

export function CTAVariant151(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-[#050505] overflow-hidden flex flex-col items-center justify-center border border-black/5">
      <SlideHeader {...props} index={index + 1} dark hideDot />

      <div className="absolute inset-0 z-0">
        <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0 opacity-30 mix-blend-luminosity transition-transform duration-1000 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_85%)]" />    
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center w-full px-8 mt-12 pointer-events-none">
        <Crown className="w-8 h-8 mb-8" style={{ color: brandColor }} strokeWidth={1.5} />

        <span className="font-outfit text-white/40 text-[9px] uppercase tracking-[0.4em] mb-4">
          A OBRA-PRIMA
        </span>

        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="pointer-events-auto mb-16">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-normal text-white leading-none outline-none whitespace-pre-line" style={{ fontSize: `${64 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
            {data.titulo || 'ARQUIVE'}
          </h2>
        </SmartElement>

        <div className="flex items-center gap-8 pointer-events-auto">
          <span className="font-outfit font-bold text-white/70 text-[10px] uppercase tracking-[0.3em]">
            GUARDAR POST
          </span>
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white transition-colors hover:bg-white hover:text-[#1a1a1a]">
            <Bookmark className="w-5 h-5" fill="currentColor" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 w-full text-center z-10 pointer-events-none">
        <span className="font-outfit text-white/30 text-[8px] tracking-[0.4em] uppercase">
          @{brandHandle}
        </span>
      </div>
    </div>
  );
}

export function CTAVariant152(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, brandAvatar } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-[#0c0a09] overflow-hidden flex flex-col p-10 border border-white/5">
      <SlideHeader {...props} index={index + 1} dark hideDot />

      <div className="flex justify-between items-center w-full opacity-30 mb-auto pointer-events-none">
        <span className="font-outfit text-white text-[8px] tracking-[0.4em] uppercase">
          Fim
        </span>
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: brandColor }} />
      </div>

      <div className="flex flex-col relative z-10 pointer-events-none">
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="pointer-events-auto mb-10">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair italic font-light text-white leading-[1] outline-none whitespace-pre-line" style={{ fontSize: `${56 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
            {data.titulo || 'Eternizar o\nSabor.'}
          </h2>
        </SmartElement>

        <div className="flex flex-col gap-6 border-l border-white/10 pl-6">
          <div className="flex items-center gap-4 cursor-pointer group/item pointer-events-auto">
            <Bookmark className="w-5 h-5 text-white/40 transition-colors group-hover/item:text-white" style={{ color: selectedElement?.field === 'cta_save' ? brandColor : undefined }} strokeWidth={1.5} />
            <span className="font-outfit text-white/60 text-[11px] uppercase tracking-[0.2em] transition-colors group-hover/item:text-white">
              Adicionar à Coleção
            </span>
          </div>
          <div className="flex items-center gap-4 cursor-pointer group/item pointer-events-auto">
            <Share2 className="w-5 h-5 text-white/40 transition-colors group-hover/item:text-white" style={{ color: selectedElement?.field === 'cta_share' ? brandColor : undefined }} strokeWidth={1.5} />
            <span className="font-outfit text-white/60 text-[11px] uppercase tracking-[0.2em] transition-colors group-hover/item:text-white">
              Enviar Referência
            </span>
          </div>
        </div>
      </div>

      <div className="mt-auto flex justify-end items-center gap-4 border-t border-white/10 pt-8 pointer-events-none">
        <span className="font-outfit font-bold text-white/40 text-[9px] uppercase tracking-widest">
          {brandHandle}
        </span>
        <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 grayscale shadow-lg">
          {brandAvatar ? (
            <img src={brandAvatar} alt="profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-zinc-800" />
          )}
        </div>
      </div>
    </div>
  );
}

export function CTAVariant153(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, brandAvatar } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-white overflow-hidden flex flex-col border border-black/5">
      <SlideHeader {...props} index={index + 1} hideDot />
      
      <div className="h-[60%] w-full flex flex-col items-center justify-center p-8 relative z-10 shadow-md" style={{ backgroundColor: brandColor }}>
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm mb-4">
          {brandAvatar ? (
            <img src={brandAvatar} alt="profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-white/20" />
          )}
        </div>

        <span className="font-outfit font-black text-white text-[10px] uppercase tracking-widest mb-1 opacity-90">
          AÇÃO REQUERIDA
        </span>

        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement}>
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-outfit font-black text-white leading-[0.9] tracking-tighter uppercase text-center mb-4 outline-none whitespace-pre-line" style={{ fontSize: `${56 * sTitle}px`, fontFamily: data.titleFont || 'Outfit' }}>
            {data.titulo || 'SALVAR\nAGORA'}
          </h2>
        </SmartElement>

        <div className="absolute -bottom-6 flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg pointer-events-auto">
          <Bookmark className="w-5 h-5" style={{ color: brandColor }} fill="currentColor" />
        </div>
      </div>

      <div className="h-[40%] w-full relative overflow-hidden">
        <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

        <div className="absolute bottom-6 w-full flex justify-between items-center px-6 pointer-events-none">
          <span className="font-outfit font-bold text-white/80 text-[8px] uppercase tracking-widest">
            @{brandHandle}
          </span>
          <Send className="w-4 h-4 text-white/80" />
        </div>
      </div>
    </div>
  );
}

export function CTAVariant154(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, brandAvatar } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-white overflow-hidden flex flex-col border border-black/10">
      <SlideHeader {...props} index={index + 1} hideDot />

      <div className="h-[60%] w-full p-8 flex flex-col justify-center relative z-10">
        <div className="flex items-center gap-3 mb-8 pointer-events-none">
          <div className="w-8 h-8 rounded-full overflow-hidden shadow-sm border border-zinc-200">
            {brandAvatar ? (
              <img src={brandAvatar} alt="profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-zinc-100" />
            )}
          </div>
          <span className="font-outfit font-bold text-zinc-400 text-[10px] uppercase tracking-widest">
            FINALIZAR
          </span>
        </div>

        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement}>
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-outfit font-black text-[#1a1a1a] leading-[0.85] tracking-tighter uppercase mb-4 outline-none whitespace-pre-line" style={{ fontSize: `${60 * sTitle}px`, fontFamily: data.titleFont || 'Outfit' }}>
            {data.titulo || 'ARQUIVE\nO POST'}
          </h2>
        </SmartElement>

        <div className="flex items-start gap-3 pl-1">
          <div className="w-[2px] h-8 shrink-0" style={{ backgroundColor: brandColor }}></div>
          <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement}>
            <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-zinc-500 text-xs font-medium max-w-[200px] outline-none whitespace-pre-line" style={{ fontSize: `${12 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
              {data.texto_apoio || 'Mantenha a qualidade sempre acessível no seu perfil.'}
            </p>
          </SmartElement>
        </div>
      </div>

      <div className="h-[40%] w-full relative overflow-hidden flex flex-col justify-end">
        <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0" />
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        
        <div className="relative z-20 bg-white/10 backdrop-blur-md border-t border-white/20 p-4 flex justify-between items-center transition-colors hover:bg-black/40 pointer-events-auto">
          <span className="font-outfit font-bold text-white text-[10px] uppercase tracking-widest">
            Toque para Salvar
          </span>
          <Bookmark className="w-4 h-4 text-white" strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}

export function CTAVariant155(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, brandAvatar } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-white overflow-hidden flex flex-col border border-black/5">
      <SlideHeader {...props} index={index + 1} dark hideDot />

      <div className="h-[50%] w-full relative overflow-hidden">
        <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0" />
      </div>

      <div className="h-[50%] w-full relative flex flex-col p-8 pt-10" style={{ backgroundColor: brandColor }}>
        <div className="absolute -top-6 left-8 w-12 h-12 rounded-full overflow-hidden border-2 bg-white shadow-lg z-20 pointer-events-none" style={{ borderColor: brandColor }}>
          {brandAvatar ? (
            <img src={brandAvatar} alt="profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-white/20" />
          )}
        </div>

        <span className="font-outfit font-black text-white/80 text-[9px] uppercase tracking-widest mb-1">
          O VEREDITO
        </span>

        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement}>
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-outfit font-black text-white leading-none tracking-tighter uppercase mb-4 outline-none whitespace-pre-line" style={{ fontSize: `${48 * sTitle}px`, fontFamily: data.titleFont || 'Outfit' }}>
            {data.titulo || 'GUARDE A\nCOLEÇÃO'}
          </h2>
        </SmartElement>

        <div className="mt-auto flex items-center justify-between pointer-events-none">
          <div className="flex gap-3 pointer-events-auto">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
              <Bookmark className="w-4 h-4" style={{ color: brandColor }} fill="currentColor" />
            </div>
            <div className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center text-white">
              <Share2 className="w-4 h-4" />
            </div>
          </div>
          <span className="font-outfit font-bold text-white/50 text-[8px] uppercase tracking-widest">
            @{brandHandle}
          </span>
        </div>
      </div>
    </div>
  );
}

export function CTAVariant156(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, brandAvatar } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-white overflow-hidden flex flex-col border-[10px]" style={{ borderColor: brandColor }}>
      <SlideHeader {...props} index={index + 1} hideDot />

      <div className="w-full h-[55%] relative overflow-hidden border-b-4 border-[#1a1a1a]">
        <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700" />
        
        <div className="absolute top-4 left-4 text-white px-3 py-1 font-outfit font-black text-[10px] uppercase tracking-widest shadow-md pointer-events-none" style={{ backgroundColor: brandColor }}>
          SALVAR POST
        </div>
      </div>

      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex justify-between items-start pointer-events-none">
          <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="pointer-events-auto">
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-outfit font-black text-[#1a1a1a] leading-[0.8] tracking-tighter outline-none whitespace-pre-line uppercase" style={{ fontSize: `${48 * sTitle}px`, fontFamily: data.titleFont || 'Outfit' }}>
              {data.titulo || 'NÃO\nPERCA.'}
            </h2>
          </SmartElement>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-200 shadow-sm">
            {brandAvatar ? (
              <img src={brandAvatar} alt="profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-zinc-100" />
            )}
          </div>
        </div>

        <div className="w-full flex justify-between items-center transition-colors bg-zinc-50 border border-zinc-200 p-3 hover:border-zinc-400 pointer-events-auto">
          <div className="flex flex-col">
            <span className="font-outfit font-bold text-[#1a1a1a] text-[10px] uppercase tracking-widest pl-2">      
              Adicionar ao Arquivo
            </span>
            <span className="font-outfit text-zinc-400 text-[8px] uppercase tracking-[0.2em] pl-2">
              @{brandHandle}
            </span>
          </div>
          <Bookmark className="w-5 h-5" style={{ color: brandColor }} fill="currentColor" strokeWidth={1} />
        </div>
      </div>
    </div>
  );
}

export function CTAVariant157(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-[#900d2d] overflow-hidden flex flex-col p-10 border border-white/10" style={{ backgroundColor: brandColor }}>
      <SlideHeader {...props} index={index + 1} dark hideDot />
      
      <div className="flex justify-between items-start opacity-60 pointer-events-none">
        <Sparkles className="w-4 h-4 text-white" strokeWidth={1.5} />
        <span className="font-outfit text-white text-[8px] uppercase tracking-[0.3em]">Exclusivo</span>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center text-center mt-8 pointer-events-none">
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="pointer-events-auto">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-medium text-white leading-[0.9] mb-6 outline-none whitespace-pre-line" style={{ fontSize: `${56 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
            {data.titulo || 'A Essência.'}
          </h2>
        </SmartElement>
        
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="pointer-events-auto">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-white/70 text-[10px] uppercase tracking-widest font-medium max-w-[200px] mb-8 outline-none whitespace-pre-line" style={{ fontSize: `${10 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
            {data.texto_apoio || 'Guarde o requinte para a sua próxima celebração.'}
          </p>
        </SmartElement>

        <div className="flex gap-4 pointer-events-auto">
          <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-xl hover:scale-110 transition-transform" style={{ color: brandColor }}>
            <Bookmark className="w-5 h-5" fill="currentColor" />
          </div>
        </div>
      </div>

      <div className="mt-auto flex justify-center border-t border-white/20 pt-6 pointer-events-none">
        <span className="font-outfit text-white/50 text-[9px] uppercase tracking-[0.4em]">@{brandHandle}</span>  
      </div>
    </div>
  );
}

export function CTAVariant158(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, brandAvatar } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-white overflow-hidden flex flex-col p-8 border border-zinc-200">
      <SlideHeader {...props} index={index + 1} hideDot />
      
      <div className="w-full h-full border border-zinc-200 p-6 flex flex-col relative">
        <div className="flex items-center gap-3 mb-auto pointer-events-none">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-200">
            {brandAvatar ? (
              <img src={brandAvatar} alt="profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-zinc-100" />
            )}
          </div>
          <span className="font-outfit font-bold text-zinc-400 text-[8px] uppercase tracking-widest">A Curadoria</span>
        </div>

        <div className="my-auto text-left pointer-events-none">
          <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="pointer-events-auto">
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-outfit font-black text-[#1a1a1a] uppercase tracking-tighter mb-2 outline-none whitespace-pre-line" style={{ fontSize: `${36 * sTitle}px`, fontFamily: data.titleFont || 'Outfit' }}>
              {data.titulo || 'ARQUIVO'}
            </h2>
          </SmartElement>
          
          <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="pointer-events-auto">
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-playfair italic text-zinc-500 mb-6 outline-none whitespace-pre-line" style={{ fontSize: `${24 * sText}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
              {data.texto_apoio || 'Indispensável.'}
            </h2>
          </SmartElement>

          <div className="flex items-center gap-3 cursor-pointer group/action w-fit pointer-events-auto">
            <Bookmark className="w-4 h-4" style={{ color: brandColor }} fill="currentColor" />
            <span className="font-outfit font-bold text-[#1a1a1a] text-[10px] uppercase tracking-widest group-hover/action:text-[#DE1E4D] transition-colors" style={{ color: selectedElement?.field === 'cta_btn' ? brandColor : undefined }}>
              Salvar o Padrão
            </span>
          </div>
        </div>

        <div className="mt-auto flex justify-end pointer-events-none">
          <ArrowRight className="w-4 h-4 text-zinc-300" />
        </div>
      </div>
    </div>
  );
}

export function CTAVariant159(props) {
  const { data, index, brandColor, brandHandle, brandWebsite, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-[#050505] overflow-hidden flex flex-col">
      <SlideHeader {...props} index={index + 1} dark hideDot />
      
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10 pointer-events-none">
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="pointer-events-auto">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-outfit font-black text-white leading-[0.8] tracking-tighter uppercase text-center mb-4 outline-none whitespace-pre-line" style={{ fontSize: `${80 * sTitle}px`, fontFamily: data.titleFont || 'Outfit' }}>
            {data.titulo || 'NÃO\nPERCA'}
          </h2>
        </SmartElement>
        
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="pointer-events-auto">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-playfair italic text-xl text-center mb-10 outline-none whitespace-pre-line" style={{ fontSize: `${20 * sText}px`, fontFamily: data.titleFont || 'Playfair Display', color: brandColor }}>
            {data.texto_apoio || 'A sua nova referência.'}
          </p>
        </SmartElement>

        <div className="flex items-center justify-between w-full border-t border-white/10 pt-6">
          <span className="font-outfit font-bold text-white/30 text-[9px] uppercase tracking-widest">
            {brandWebsite}
          </span>
          <div className="flex gap-4 pointer-events-auto">
            <Send className="w-5 h-5 text-white/50 hover:text-white cursor-pointer transition-colors" />
            <Bookmark className="w-5 h-5 hover:scale-110 cursor-pointer transition-transform" style={{ color: brandColor }} fill="currentColor" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CTAVariant160(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-[#0c0a09] overflow-hidden flex flex-col items-center justify-center border border-black/5">
      <SlideHeader {...props} index={index + 1} dark hideDot />
      
      <div className="absolute inset-0 z-0">
        <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0 opacity-70" />
        <div className="absolute inset-0 backdrop-blur-xl bg-black/40" />
      </div>

      <div className="relative z-10 text-center w-full px-10 pointer-events-none">
        <Feather className="w-5 h-5 text-white/70 mx-auto mb-6" strokeWidth={1} />
        
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="pointer-events-auto">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-medium text-white text-4xl mb-4 drop-shadow-lg outline-none whitespace-pre-line" style={{ fontSize: `${36 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
            {data.titulo || 'Eternize.'}
          </h2>
        </SmartElement>

        <div className="w-12 h-[1px] mx-auto mb-8" style={{ backgroundColor: brandColor }}></div>

        <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-full px-6 py-3 flex items-center justify-between cursor-pointer hover:bg-white hover:text-black transition-colors text-white pointer-events-auto group/btn">
          <span className="font-outfit font-bold text-[10px] uppercase tracking-widest group-hover/btn:text-black">Salvar</span>
          <Bookmark className="w-4 h-4 group-hover/btn:text-black" fill="currentColor" />
        </div>
      </div>

      <div className="absolute bottom-10 w-full text-center z-10 pointer-events-none">
        <span className="font-outfit text-white/30 text-[8px] tracking-[0.3em] uppercase drop-shadow-md">
          @{brandHandle}
        </span>
      </div>
    </div>
  );
}

export function CTAVariant161(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, brandAvatar } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-[#FDFBF7] overflow-hidden flex flex-col">
      <SlideHeader {...props} index={index + 1} hideDot />
      
      <div className="h-[50%] w-full flex flex-col items-center justify-center relative p-8 pointer-events-none" style={{ backgroundColor: brandColor }}>        
        <CheckCircle2 className="w-6 h-6 text-white/50 mb-4" />
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="pointer-events-auto">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-outfit font-black text-white leading-none tracking-tighter uppercase outline-none whitespace-pre-line" style={{ fontSize: `${48 * sTitle}px`, fontFamily: data.titleFont || 'Outfit' }}>
            {data.titulo || 'GUARDE'}
          </h2>
        </SmartElement>
      </div>

      <div className="h-[50%] w-full flex flex-col justify-between p-8 pointer-events-none">
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="pointer-events-auto">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-playfair italic text-zinc-500 text-lg leading-snug outline-none whitespace-pre-line" style={{ fontSize: `${18 * sText}px`, fontFamily: data.textFont || 'Playfair Display' }}>
            {data.texto_apoio || 'Uma experiência visual e de sabor que merece um lugar na sua coleção.'}
          </p>
        </SmartElement>

        <div className="flex justify-between items-end border-t border-zinc-200 pt-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full overflow-hidden grayscale border border-zinc-300">
              {brandAvatar ? (
                <img src={brandAvatar} alt="profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-zinc-100" />
              )}
            </div>
            <span className="font-outfit font-bold text-zinc-300 text-[8px] uppercase tracking-widest">@{brandHandle}</span>
          </div>
          <div className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#DE1E4D] transition-colors shadow-md pointer-events-auto" style={{ backgroundColor: brandColor }}>
            <Bookmark className="w-4 h-4 text-white" fill="currentColor" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CTAVariant162(props) {
  const { data, index, brandColor, brandHandle, brandWebsite, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-[#FDFBF7] overflow-hidden flex flex-col p-10 border border-black/5">
      <SlideHeader {...props} index={index + 1} hideDot />
      
      <div className="flex justify-between items-start w-full opacity-40 pointer-events-none">
        <Feather className="w-4 h-4 text-[#1a1a1a]" strokeWidth={1} />
        <span className="font-outfit font-light text-[9px] tracking-[0.4em] uppercase">O Epílogo</span>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center text-center mt-8 pointer-events-none">
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="pointer-events-auto">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-light text-[#1a1a1a] leading-[0.8] tracking-tighter mb-12 outline-none whitespace-pre-line" style={{ fontSize: `${60 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>    
            {data.titulo || 'Aprecie.\nEternize.'}
          </h2>
        </SmartElement>

        <div className="flex flex-col gap-6 w-full items-center">
          <div className="flex items-center gap-3 cursor-pointer group/action opacity-60 hover:opacity-100 transition-opacity pointer-events-auto">
            <span className="font-playfair italic text-2xl text-[#1a1a1a]">Guardar na coleção</span>
            <Bookmark className="w-5 h-5 text-[#1a1a1a]" strokeWidth={1} />
          </div>
          <div className="flex items-center gap-3 cursor-pointer group/action opacity-60 hover:opacity-100 transition-opacity pointer-events-auto">
            <span className="font-playfair italic text-2xl text-[#1a1a1a]">Partilhar a doçura</span>
            <Send className="w-5 h-5 text-[#1a1a1a]" strokeWidth={1} />
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center border-t border-[#1a1a1a]/10 pt-6 mt-auto pointer-events-none">
        <span className="font-outfit text-[#1a1a1a]/40 text-[8px] tracking-[0.4em] uppercase">{brandWebsite}</span>
      </div>
    </div>
  );
}

export function CTAVariant163(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-[#111] overflow-hidden flex flex-col items-center justify-center p-8 border border-white/5">
      <SlideHeader {...props} index={index + 1} dark hideDot />
      
      <div className="w-20 h-20 rounded-full border flex items-center justify-center mb-8 cursor-pointer hover:bg-white transition-colors group/btn shadow-[0_0_30px_rgba(222,30,77,0.2)] pointer-events-auto" style={{ borderColor: brandColor, boxShadow: `0 0 30px ${brandColor}33` }}>
        <Bookmark className="w-8 h-8 group-hover/btn:text-[#111] transition-colors" style={{ color: brandColor }} fill="currentColor" />
      </div>

      <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="pointer-events-auto text-center">
        <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair italic font-medium text-white mb-2 outline-none whitespace-pre-line" style={{ fontSize: `${30 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
          {data.titulo || 'O seu arquivo.'}
        </h2>
      </SmartElement>
      
      <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="pointer-events-auto text-center">
        <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-zinc-500 text-[10px] uppercase tracking-[0.3em] font-bold outline-none whitespace-pre-line" style={{ fontSize: `${10 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
          {data.texto_apoio || 'Guarde o padrão de qualidade.'}
        </p>
      </SmartElement>

      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center opacity-30 pointer-events-none">
        <span className="font-outfit text-white text-[8px] tracking-widest uppercase">@{brandHandle}</span>
        <ArrowRight className="w-4 h-4 text-white" />
      </div>
    </div>
  );
}

export function CTAVariant164(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-[#050505] overflow-hidden flex flex-col border border-white/5">
      <SlideHeader {...props} index={index + 1} dark hideDot />
      
      <div className="absolute inset-0 z-0 pointer-events-none [clip-path:polygon(0_0,100%_0,100%_35%,0_65%)] transition-all duration-700 group-hover:opacity-80" style={{ backgroundColor: brandColor }} />        
      
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-10">
        <div className="text-right pointer-events-none">
          <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="pointer-events-auto">
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-outfit font-black text-white uppercase tracking-tighter mb-1 outline-none whitespace-pre-line" style={{ fontSize: `${40 * sTitle}px`, fontFamily: data.titleFont || 'Outfit' }}>
              {data.titulo || 'AÇÃO'}
            </h2>
          </SmartElement>
          <span className="font-playfair italic text-white/80 text-sm">Final.</span>
        </div>

        <div className="mt-auto pt-12 border-t border-white/10">
          <div className="flex items-center gap-4 cursor-pointer group/action mb-6 w-fit pointer-events-auto">
            <Bookmark className="w-5 h-5" style={{ color: brandColor }} fill="currentColor" />
            <span className="font-outfit font-bold text-white text-[11px] uppercase tracking-[0.2em] group-hover/action:text-[#DE1E4D] transition-colors" style={{ color: selectedElement?.field === 'cta_save' ? brandColor : undefined }}>
              Salvar Postagem
            </span>
          </div>
          <div className="flex items-center gap-4 cursor-pointer group/action w-fit pointer-events-auto">
            <Send className="w-5 h-5 text-zinc-600 group-hover/action:text-white transition-colors" />
            <span className="font-outfit font-bold text-zinc-500 text-[11px] uppercase tracking-[0.2em] group-hover/action:text-white transition-colors">
              Enviar a Amigos
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export const CTA_EXTRA_VARIANT_COMPONENTS = {
  101: CTAVariant101,
  102: CTAVariant102,
  103: CTAVariant103,
  104: CTAVariant104,
  105: CTAVariant105,
  106: CTAVariant106,
  107: CTAVariant107,
  108: CTAVariant108,
  109: CTAVariant109,
  110: CTAVariant110,
  111: CTAVariant111,
  112: CTAVariant112,
  113: CTAVariant113,
  114: CTAVariant114,
  115: CTAVariant115,
  116: CTAVariant116,
  117: CTAVariant117,
  118: CTAVariant118,
  119: CTAVariant119,
  120: CTAVariant120,
  121: CTAVariant121,
  122: CTAVariant122,
  123: CTAVariant123,
  124: CTAVariant124,
  125: CTAVariant125,
  126: CTAVariant126,
  127: CTAVariant127,
  128: CTAVariant128,
  129: CTAVariant129,
  130: CTAVariant130,
  131: CTAVariant131,
  132: CTAVariant132,
  133: CTAVariant133,
  134: CTAVariant134,
  135: CTAVariant135,
  136: CTAVariant136,
  137: CTAVariant137,
  138: CTAVariant138,
  139: CTAVariant139,
  140: CTAVariant140,
  141: CTAVariant141,
  142: CTAVariant142,
  143: CTAVariant143,
  144: CTAVariant144,
  145: CTAVariant145,
  146: CTAVariant146,
  147: CTAVariant147,
  148: CTAVariant148,
  149: CTAVariant149,
  150: CTAVariant150,
  151: CTAVariant151,
  152: CTAVariant152,
  153: CTAVariant153,
  154: CTAVariant154,
  155: CTAVariant155,
  156: CTAVariant156,
  157: CTAVariant157,
  158: CTAVariant158,
  159: CTAVariant159,
  160: CTAVariant160,
  161: CTAVariant161,
  162: CTAVariant162,
  163: CTAVariant163,
  164: CTAVariant164,
};
