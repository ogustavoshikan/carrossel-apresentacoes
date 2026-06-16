import React from 'react';
import { Bookmark, Send, Heart, MessageCircle, CheckCircle2, Instagram, Link2, Sparkles, Share2, ArrowRight, Check, Star, Quote, ChevronRight, CornerRightDown, Feather, CornerDownRight, MoreHorizontal, Crown, BookmarkPlus, MoveRight, Diamond, Cookie, Store, LayoutGrid } from 'lucide-react';
import SmartElement from '../smart-element';
import SlideHeader from '../slide-header';
import { ImageBg } from './cta-variants';

export const CTA_EXTRA_VARIANT_META = [
  {
    id: 101,
    name: 'The Dark Luxury',
    description: 'Foco absoluto em salvar o post. Ícone gigante, fundo escuro.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra101.png' // Add proper thumbnail later
  },
  {
    id: 102,
    name: 'The Editorial Index',
    description: 'Limpo, claro, estruturado como o índice de uma revista de luxo.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra102.png'
  },
  {
    id: 104,
    name: 'The Cinematic Glass',
    description: 'Altamente visual. Usa a foto do produto por trás de um bloco desfocado.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra104.png'
  },
  {
    id: 109,
    name: 'The Solid Contrast',
    description: 'Zero efeitos. Fundo preto puro, tipografia branca impecável.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra109.png'
  },
  {
    id: 110,
    name: 'The Clean Magazine',
    description: 'Flat design absoluto. Foto de um lado, bloco sólido do outro. Sem sombras.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra-110.png'
  },
  {
    id: 111,
    name: 'The Flat Crimson',
    description: 'Um bloco de cor maciço. Nada de blurs, sombras ou texturas.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra111.png'
  },
  {
    id: 113,
    name: 'The Swiss Split',
    description: 'Metade cor sólida, metade off-white. Contraste absoluto.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra113.png'
  },
  {
    id: 114,
    name: 'The Pure Typography',
    description: 'Apenas texto. Layout focado em opções de ação limpas.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra114.png'
  },

  {
    id: 117,
    name: 'The Poetic Serif',
    description: 'Fundo claro, letras gigantes e itálicos delicados.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra117.png'
  },
  {
    id: 118,
    name: 'The Elegant Sentence',
    description: 'As ações estão embutidas diretamente no texto.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra118.png'
  },
  {
    id: 120,
    name: 'The Floating Words',
    description: 'Escuro, dramático, usando a quebra de linha para criar arte.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra120.png'
  },
  {
    id: 122,
    name: 'The Light Whisper',
    description: 'Tema claro. Letras minúsculas gigantes.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra122.png'
  },
  {
    id: 124,
    name: 'The Absolute Focus',
    description: 'Uma única frase monumental.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra124.png'
  },
  {
    id: 126,
    name: 'The Framed Split',
    description: 'Borda grossa colorida, imagem com margens, divisão de cards na base.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra126.png'
  },
  {
    id: 127,
    name: 'The Dark Line',
    description: 'Dark mode absoluto, separador fino, tipografia limpa.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra127.png'
  },
  {
    id: 128,
    name: 'The Red Sidebar',
    description: 'Barra lateral vibrante, imagem dominante.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra128.png'
  },
  {
    id: 129,
    name: 'The Overlap Badge',
    description: 'Card flutuante sobre imagem escurecida, badge circular de ação.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra129.png'
  },
  {
    id: 130,
    name: 'The Floating Center',
    description: 'Fundo creme, imagem central arredondada com sombra suave.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra130.png'
  },
  {
    id: 131,
    name: 'The Split Overlap',
    description: 'Topo sólido colorido, imagem rompendo a linha de divisão.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra131.png'
  },
  {
    id: 132,
    name: 'The Square Action',
    description: 'Design limpo, botões quadrados e tipografia impactante.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra132.png'
  },
  {
    id: 133,
    name: 'The Action Overlap',
    description: 'Fundo imagem escura com card de encerramento e ícone flutuante.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra133.png'
  },
  {
    id: 136,
    name: 'The Sharp Minimal',
    description: 'Design ultra clean com lista elegante e botão quadrado vibrante.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra136.png'
  },
  {
    id: 139,
    name: 'The Elegant Frame',
    description: 'Moldura fina dupla, imagem isolada e tipografia serifada sofisticada.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra139.png'
  },
  {
    id: 140,
    name: 'The Red Pillar',
    description: 'Pilar colorido na base com botão sólido e tipografia monumental.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra140.png'
  },
  {
    id: 141,
    name: 'The Red Sidebar Conclusion',
    description: 'Barra lateral vibrante, foco tipográfico monumental e lista de ações.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra141.png'
  },
  {
    id: 142,
    name: 'The Triptych Action Pillars',
    description: 'Design tríptico com 3 pilares de ação sólidos (Gostar, Partilhar, Salvar).',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra142.png'
  },
  {
    id: 143,
    name: 'The Elegant Conclusion Frame',
    description: 'Moldura fina, foto de perfil centralizada e estética de galeria de arte.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra143.png'
  },
  {
    id: 144,
    name: 'The Minimalist Synthesis',
    description: 'Topo colorido fino, tipografia mista e grid de ações baseada em linhas.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra144.png'
  },
  {
    id: 145,
    name: 'The Crimson Base',
    description: 'Topo creme com imagem central e base vermelha sólida para ação.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra145.png'
  },
  {
    id: 146,
    name: 'The Overlap Pill',
    description: 'Design dividido no topo com pílula de ação sobrepondo a divisão.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra146.png'
  },
  {
    id: 151,
    name: 'The Crown Vignette',
    description: 'Vinheta dramática, ícone de coroa vibrante e tipografia monumental.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra151.png'
  },
  {
    id: 153,
    name: 'The Crimson Top Action',
    description: 'Bloco colorido dominante no topo, foto central e imagem na base.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra153.png'
  },
  {
    id: 155,
    name: 'The Red Bottom Overlap',
    description: 'Imagem no topo, bloco colorido na base e perfil sobrepondo a divisão.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra155.png'
  },
  {
    id: 156,
    name: 'The Synthesis Block',
    description: 'Borda grossa colorida, foco central massivo na ação e divisões geométricas.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra156.png'
  },
  {
    id: 158,
    name: 'The Golden Ratio',
    description: 'Proporções perfeitas, linhas finas, branco absoluto.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra158.png'
  },
  {
    id: 160,
    name: 'The Glass Echo',
    description: 'Imagem de fundo total, desfoque de vidro maciço, elementos cristalinos.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra160.png'
  },
  {
    id: 162,
    name: 'The Pure Typography',
    description: 'A tipografia limpa, minimalismo absoluto.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra162.png'
  },
  {
    id: 165,
    name: 'The Hovering Squares',
    description: 'Três botões quadrados flutuantes na base sobre fundo creme. Elegância editorial.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra165.png'
  },
  {
    id: 166,
    name: 'The Floating Pills',
    description: 'Pílulas horizontais empilhadas substituindo blocos pesados. Elegância máxima.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra166.png'
  },
  {
    id: 167,
    name: 'Organic Coffee',
    description: 'Layout arqueado com estética rústica de café orgânico e tipografia manual elegante.'
  },
  {
    id: 168,
    name: 'Premium Coffee',
    description: 'Design de luxo com coroa, citação itálica e faixa horizontal com ícones sofisticados.'
  },
  {
    id: 169,
    name: 'Descubra Nosso Cardápio',
    description: 'Estilo cafeteria de luxo com coroa, citação itálica e faixa central com ícones de confeitaria finos.'
  },
  {
    id: 170,
    name: 'Sweet Treat Haven',
    description: 'Design de donuts dividido 50/50 em tons pasteis com botão de ação arredondado na base.'
  },
  {
    id: 171,
    name: 'Bella Doceria para Festa',
    description: 'Painel mostarda com design split em tons de rosa e verde para exibição de doces festivos.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra171.png'
  },
  {
    id: 172,
    name: 'Orçamento Festa Especial',
    description: 'Layout rosa vibrante com marcas dágua de caligrafia, foco em orçamentos rápidos e contatos.',
    thumbnailUrl: '/thumbnails/Thumbnails%20CTA%20Extras/designs_cta-extra172.png'
  },
  {
    id: 173,
    name: 'Delícia Pedido Rápido',
    description: 'Card central elegante com sobreposição de imagem recortada e botão de encomenda destacado.'
  },
  {
    id: 174,
    name: 'Pink Pie Frosting',
    description: 'Design rosa vibrante com formas interligadas creme e chantilly nos cantos com máscara de recorte.'
  },
  {
    id: 175,
    name: 'Torta de Frutas Real',
    description: 'Design rosa suave com imagem central de torta recortada por máscara crimpada ondulada.'
  },
  {
    id: 176,
    name: 'Holiday Bake Sale',
    description: 'Design promocional natalino com topo amarelo, base de cookies e card central rotacionado.'
  },
  {
    id: 177,
    name: 'Croissant Offer',
    description: 'Design terracota com topo creme xadrez e grade de 3 croissants circulares com filtros.'
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
          <span className="font-outfit font-light text-white/40 text-[9px] tracking-widest uppercase translate-y-[3px]" style={{ fontFamily: data.tagFont || data.textFont || 'Outfit' }}>
            @{brandHandle}
          </span>
        )}
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
    <div className="w-full h-full relative bg-[#050505] overflow-hidden flex flex-col justify-between p-10 border-t-2 border-b-2 border-white/5">
      
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

export function CTAVariant126(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, brandAvatar } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-[#F4F1EB] overflow-hidden flex flex-col p-3">
      <SlideHeader {...props} showBrandHandle={false} showSlideCounter={false} index={index + 1} hideDot />

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
          <Bookmark className="absolute right-0 bottom-0 w-[3rem] h-[3rem] text-white opacity-10" fill="currentColor" />
          <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="pointer-events-auto z-10">
            <h3 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair italic text-white text-2xl mb-2 outline-none whitespace-pre-line" style={{ fontSize: `${24 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
              {data.titulo || 'Salvar'}
            </h3>
          </SmartElement>
          <CheckCircle2 className="w-5 h-5 text-white/50 relative z-10" />
        </div>

        <div className="flex-1 h-full bg-[#1a1a1a] rounded-xl p-4 flex flex-col justify-center items-center text-center relative overflow-hidden pointer-events-none">
          <Send className="absolute right-0 bottom-0 w-[3rem] h-[3rem] text-white opacity-10" />
          <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="pointer-events-auto z-10">
            <h3 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-playfair italic text-white text-2xl mb-2 outline-none whitespace-pre-line" style={{ fontSize: `${24 * sText}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
              {data.texto_apoio || 'Compartilhar'}
            </h3>
          </SmartElement>
          <Send className="w-5 h-5 text-white/50 relative z-10" />
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
      <SlideHeader {...props} showBrandHandle={false} showSlideCounter={false} index={index + 1} dark />

      <div className="w-full h-[55%] relative overflow-hidden">
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
      <SlideHeader {...props} showBrandHandle={false} showSlideCounter={false} index={index + 1} dark />

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
      <SlideHeader {...props} showBrandHandle={false} showSlideCounter={false} index={index + 1} dark hideDot />

      <div className="h-[60%] w-full relative">
        <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0" />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        <div className="absolute top-4 left-4 border border-white/30 px-3 py-1 bg-white/10 backdrop-blur-sm pointer-events-none">
          <span className="font-outfit font-bold text-white text-[8px] uppercase tracking-widest">{brandHandle}</span>
        </div>
      </div>

      <div className="relative z-10 w-[90%] mx-auto bg-[#F4F1EB] -mt-12 rounded-t-lg rounded-b-lg shadow-2xl p-6 flex flex-col h-[40%] border-b-4 border-[#1a1a1a]">
        <div className="absolute -top-6 right-6 w-12 h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center shadow-lg pointer-events-none" style={{ backgroundColor: brandColor }}>
          <Bookmark className="w-5 h-5 text-white" fill="currentColor" />
        </div>

        <div className="mt-2 flex-1">
          <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement}>
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-black text-[#1a1a1a] leading-none mb-2 outline-none whitespace-pre-line" style={{ fontSize: `${36 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
              {data.titulo || 'SALVAR'}
            </h2>
          </SmartElement>
          
          <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement}>
            <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-zinc-500 leading-relaxed outline-none whitespace-pre-line" style={{ fontSize: `${20 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
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
      <SlideHeader {...props} showBrandHandle={false} showSlideCounter={false} index={index + 1} hideDot />

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

      <div 
        className="w-[85%] aspect-[4/3] rounded-[2rem] overflow-hidden relative mt-16 border-[4px] border-white"
        style={{ boxShadow: `0 20px 40px ${brandColor}33` }}
      >
        <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0" />
      </div>

      <div className="absolute bottom-8 w-full px-8 flex justify-between items-end pointer-events-none">
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="max-w-[120px] pointer-events-auto">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit font-medium text-zinc-500 uppercase tracking-widest leading-tight outline-none whitespace-pre-line" style={{ fontSize: `${10 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
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
      <SlideHeader {...props} showBrandHandle={false} showSlideCounter={false} index={index + 1} hideDot />

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

      <div 
        className="relative z-10 w-[85%] mx-auto -mt-16 aspect-[4/3] rounded-xl overflow-hidden bg-zinc-200 border-[4px] border-white"
        style={{ boxShadow: `0 20px 40px ${brandColor}33` }}
      >
        <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0" />
      </div>

      <div className="flex-1 px-8 pt-8 flex flex-col">
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement}>
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-black text-[#1a1a1a] leading-none mb-2 outline-none whitespace-pre-line" style={{ fontSize: `${50 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
            {data.titulo || 'SALVAR'}
          </h2>
        </SmartElement>

        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement}>
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-zinc-500 outline-none whitespace-pre-line" style={{ fontSize: `${18 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
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
      <SlideHeader {...props} showBrandHandle={false} showSlideCounter={false} index={index + 1} hideDot />

      <div className="px-8 pt-8 pb-4 flex justify-between items-center pointer-events-none">
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="pointer-events-auto">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-outfit font-black text-[#1a1a1a] tracking-tighter uppercase outline-none whitespace-pre-line" style={{ fontSize: `${47 * sTitle}px`, fontFamily: data.titleFont || 'Outfit' }}>
            {data.titulo || 'GUARDAR'}
          </h2>
        </SmartElement>
        <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-200">
          {brandAvatar ? (
            <img src={brandAvatar} alt="profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-zinc-300" />
          )}
        </div>
      </div>

      <div className="w-full h-[45%] relative my-auto overflow-hidden">
        <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0" />
      </div>

      <div className="px-8 pb-8 pt-6 flex flex-col">
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="mb-6">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-playfair italic text-[#1a1a1a] font-medium outline-none whitespace-pre-line leading-snug" style={{ fontSize: `${28 * sText}px`, fontFamily: data.textFont || 'Playfair Display' }}>
            {data.texto_apoio || 'Mantenha a excelência no seu arquivo pessoal.'}
          </p>
        </SmartElement>

        <div className="flex justify-between items-center pointer-events-none">
          <span className="font-outfit font-bold text-zinc-400 text-[8px] tracking-[0.2em] uppercase">
            @{brandHandle}
          </span>

          <div className="flex gap-2 pointer-events-auto">
            <div className="w-10 h-10 rounded-[25px] flex items-center justify-center shadow-md" style={{ backgroundColor: brandColor }}>
              <Bookmark className="w-4 h-4 text-white" fill="currentColor" />
            </div>
            <div className="w-10 h-10 bg-white rounded-[25px] flex items-center justify-center shadow-sm">
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
      <SlideHeader {...props} showBrandHandle={false} showSlideCounter={false} index={index + 1} dark hideDot />

      <div className="h-[55%] w-full relative overflow-hidden">
        <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0" />
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        <div className="absolute top-6 left-6 border border-white/20 px-3 py-1 bg-black/40 backdrop-blur-md pointer-events-none">
          <span className="font-outfit font-bold text-white text-[8px] uppercase tracking-widest">
            FIM DO CONTEÚDO
          </span>
        </div>
      </div>

      <div className="relative z-10 w-[90%] mx-auto bg-[#FDFBF7] -mt-12 rounded-xl shadow-2xl p-6 pb-8 flex flex-col h-[40%] border-b-[8px] border-[#DE1E4D]" style={{ borderBottomColor: brandColor }}>
        <div className="absolute -top-6 right-8 w-12 h-12 rounded-full flex items-center justify-center shadow-lg pointer-events-none" style={{ backgroundColor: brandColor }}>
          <Bookmark className="w-5 h-5 text-white" fill="currentColor" />
        </div>

        <div className="mt-4 flex-1">
          <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement}>
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-black text-[#1a1a1a] leading-none mb-2 outline-none whitespace-pre-line uppercase" style={{ fontSize: `${40 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
              {data.titulo || 'O Veredito'}
            </h2>
          </SmartElement>
          
          <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement}>
            <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-zinc-500 leading-relaxed outline-none whitespace-pre-line" style={{ fontSize: `${19 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
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

export function CTAVariant136(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, brandAvatar } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-[#FDFBF7] overflow-hidden flex flex-col p-10 border border-black/5">
      <SlideHeader {...props} showBrandHandle={false} showSlideCounter={false} index={index + 1} hideDot />

      <div className="flex justify-between items-start w-full mb-12 pointer-events-none">
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="pointer-events-auto">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-outfit font-black text-[#1a1a1a] tracking-tighter uppercase outline-none whitespace-pre-line" style={{ fontSize: `${34 * sTitle}px`, fontFamily: data.titleFont || 'Outfit' }}>
            {data.titulo || 'O FINAL'}
          </h2>
        </SmartElement>
        <div className="w-10 h-10 border border-zinc-200 rounded-full overflow-hidden">
          {brandAvatar ? (
            <img src={brandAvatar} alt="profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-zinc-100" />
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center pointer-events-none">
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="pointer-events-auto mb-8">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-playfair italic text-[#1a1a1a] font-medium leading-snug outline-none whitespace-pre-line" style={{ fontSize: `${29 * sText}px`, fontFamily: data.textFont || 'Playfair Display' }}>
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
        
        <div className="w-10 h-10 bg-[#DE1E4D] rounded-[25px] flex items-center justify-center shadow-md pointer-events-auto" style={{ backgroundColor: brandColor }}>
          <Bookmark className="w-4 h-4 text-white" fill="currentColor" />
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
      <SlideHeader {...props} showBrandHandle={false} showSlideCounter={false} index={index + 1} hideDot />

      <div className="flex-1 border border-zinc-100 p-6 flex flex-col relative">
        <div className="flex justify-between items-center w-full mb-8 pointer-events-none">
          <span className="font-outfit text-[#1a1a1a] text-[8px] tracking-[0.3em] uppercase">
            AÇÃO FINAL
          </span>
          <div className="w-1.5 h-1.5 rotate-45 border border-[#1a1a1a]" />
        </div>

        <div className="w-full aspect-[4/3] relative overflow-hidden mb-10 shadow-sm rounded-[25px] border-[4px] border-white">
          <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0 opacity-100" />
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 flex items-center gap-2 rounded-sm pointer-events-none border border-black/5">
            <div className="w-4 h-4 rounded-full overflow-hidden">
              {brandAvatar ? (
                <img src={brandAvatar} alt="profile" className="w-full h-full object-cover" />
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
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair italic font-medium text-[#1a1a1a] leading-[0.9] mb-6 outline-none whitespace-pre-line -translate-y-[15px]" style={{ fontSize: `${58 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
              {data.titulo || 'Eternize o\nSabor'}
            </h2>
          </SmartElement>

          <div className="flex items-center gap-6 -mt-4 pointer-events-none">
            <div className="flex flex-col items-center gap-2 text-[#1A1A1A]">
              <Heart className="w-5 h-5" />
              <span className="font-outfit text-[8px] uppercase tracking-widest">Curtir</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-[#1A1A1A]">
              <MessageCircle className="w-5 h-5" />
              <span className="font-outfit text-[8px] uppercase tracking-widest">Comentar</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-[#1A1A1A]">
              <Send className="w-5 h-5" />
              <span className="font-outfit text-[8px] uppercase tracking-widest">Compartilhar</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-[#1A1A1A]">
              <Bookmark className="w-5 h-5" />
              <span className="font-outfit text-[8px] uppercase tracking-widest">Salvar</span>
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
    <div className="group relative w-full h-full bg-[#FDFBF7] overflow-hidden flex flex-col">
      <SlideHeader {...props} showBrandHandle={false} showSlideCounter={false} index={index + 1} hideDot />

      <div className="flex-1 p-10 flex flex-col relative z-10">
        <div className="flex justify-between items-start pointer-events-none">
          <div className="w-14 h-14 rounded-full overflow-hidden border border-zinc-100 shadow-md bg-white p-0.5">
            {brandAvatar ? (
              <img src={brandAvatar} alt="profile" className="w-full h-full object-cover rounded-full" />
            ) : (
              <div className="w-full h-full bg-zinc-100 rounded-full" />
            )}
          </div>
          <span className="font-outfit font-bold text-zinc-300 text-[8px] uppercase tracking-[0.2em] mt-2">
            @{brandHandle}
          </span>
        </div>

        <div className="mt-16 -translate-y-[25px]">
          <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement}>
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-black text-[#1a1a1a] leading-[0.8] tracking-tighter mb-6 outline-none whitespace-pre-line" style={{ fontSize: `${80 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
              {data.titulo || 'NÃO\nPERCA.'}
            </h2>
          </SmartElement>
          <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement}>
            <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-zinc-500 text-xs max-w-[200px] leading-relaxed outline-none whitespace-pre-line" style={{ fontSize: `${23 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
              {data.texto_apoio || 'As melhores referências devem ficar arquivadas.'}
            </p>
          </SmartElement>
        </div>
      </div>

      <div className="h-[35%] w-full p-10 flex justify-between items-end relative" style={{ backgroundColor: brandColor }}>
        <div className="absolute -top-8 left-10 text-white p-5 rounded-full shadow-2xl pointer-events-none" style={{ backgroundColor: brandColor }}>
          <Bookmark className="w-6 h-6" fill="currentColor" />
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
      <SlideHeader {...props} showBrandHandle={false} showSlideCounter={false} index={index + 1} hideDot />
      
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
      <SlideHeader {...props} showBrandHandle={false} showSlideCounter={false} index={index + 1} hideDot />

      <div className="h-[40%] w-full p-8 flex flex-col justify-center relative z-10 border-b-4 border-[#EBE9E1] bg-white">     
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center border-b border-[#1a1a1a]/10 pb-2 pointer-events-none">
          <span className="font-outfit font-bold text-[#1a1a1a] text-[8px] tracking-[0.3em] uppercase">
            @{brandHandle}
          </span>
        </div>

        <div className="mt-4">
          <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement}>
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-black text-[#1a1a1a] leading-[0.85] tracking-tighter mb-2 outline-none whitespace-pre-line" style={{ fontSize: `${56 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
              {data.titulo || 'AÇÃO FINAL'}
            </h2>
          </SmartElement>
          
          <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement}>
            <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-zinc-500 text-[17px] uppercase tracking-[0.2em] font-medium outline-none" style={{ fontSize: `${17 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
              {data.texto_apoio || 'A sua interação importa.'}
            </span>
          </SmartElement>
        </div>
      </div>

      <div className="h-[60%] w-full flex gap-1 bg-white relative">
        <div className="flex-1 h-full bg-zinc-100 flex flex-col items-center justify-end pb-8 pointer-events-none">
          <Heart className="w-6 h-6 text-[#1a1a1a] mb-4" strokeWidth={1.5} />
          <span className="font-outfit font-bold text-[#1a1a1a] text-[9px] uppercase tracking-widest">
            Gostar
          </span>
        </div>

        <div className="flex-1 h-full bg-[#1a1a1a] flex flex-col items-center justify-end pb-8 pointer-events-none">
          <Send className="w-6 h-6 text-white mb-4" strokeWidth={1.5} />
          <span className="font-outfit font-bold text-white text-[9px] uppercase tracking-widest">
            Partilhar
          </span>
        </div>

        <div className="flex-1 h-full flex flex-col items-center justify-end pb-8 pointer-events-none" style={{ backgroundColor: brandColor }}>
          <Bookmark className="w-6 h-6 text-white mb-4" fill="currentColor" strokeWidth={1} />
          <span className="font-outfit font-bold text-white text-[9px] uppercase tracking-widest">
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
      <SlideHeader {...props} showBrandHandle={false} showSlideCounter={false} index={index + 1} hideDot />

      <div className="flex-1 border border-zinc-200 p-6 flex flex-col relative justify-between">
        <div className="flex justify-between items-center w-full pointer-events-none">
          <span className="font-outfit text-[#1A1A1A] text-[8px] tracking-[0.4em] uppercase">
            COLEÇÃO ARQUIVADA
          </span>
          <Store className="w-4 h-4" style={{ color: brandColor }} fill="currentColor" strokeWidth={1.5} />
        </div>

        <div className="flex flex-col items-center text-center my-auto">
          <div className="w-20 h-20 rounded-full overflow-hidden border border-zinc-200 shadow-sm mb-6">
            {brandAvatar ? (
              <img src={brandAvatar} alt="profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-zinc-100" />
            )}
          </div>

          <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement}>
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair italic font-medium text-[#1a1a1a] leading-[0.9] mb-4 outline-none whitespace-pre-line" style={{ fontSize: `${58 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
              {data.titulo || 'O Fim da\nExposição'}
            </h2>
          </SmartElement>
          
          <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement}>
            <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-zinc-500 text-[14px] leading-relaxed max-w-[200px] uppercase tracking-widest mb-8 outline-none whitespace-pre-line" style={{ fontSize: `${14 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
              {data.texto_apoio || 'Para aceder a esta galeria novamente, guarde o post.'}
            </p>
          </SmartElement>

          <div className="bg-[#1a1a1a] text-white px-8 py-3 rounded-full flex items-center gap-3 shadow-lg pointer-events-none" style={{ backgroundColor: brandColor }}>
            <Bookmark className="w-4 h-4" fill="currentColor" strokeWidth={1} />
            <span className="font-outfit font-bold text-[10px] uppercase tracking-widest">Salvar Referência</span>
          </div>
        </div>

        <div className="flex justify-center w-full pt-6 border-t border-zinc-100 pointer-events-none">
          <span className="font-outfit font-bold text-[#1A1A1A] text-[8px] uppercase tracking-[0.4em]">
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
      <SlideHeader {...props} showBrandHandle={false} showSlideCounter={false} index={index + 1} hideDot />
      
      <div className="h-2 w-full" style={{ backgroundColor: brandColor }}></div>

      <div className="flex-1 p-8 flex flex-col relative z-10">
        <div className="flex justify-between items-center mb-12 pointer-events-none">
          <span className="font-outfit font-bold text-zinc-400 text-[8px] uppercase tracking-[0.3em]">
            @{brandHandle}
          </span>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-200">
            {brandAvatar ? (
              <img src={brandAvatar} alt="profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-zinc-100" />
            )}
          </div>
        </div>

        <div className="mb-auto">
          <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement}>
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-black text-[#1a1a1a] leading-[0.8] tracking-tighter mb-4 outline-none whitespace-pre-line" style={{ fontSize: `${74 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
              {data.titulo || 'GUARDE.'}
            </h2>
          </SmartElement>
          <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement}>
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-playfair italic font-medium leading-[0.8] tracking-tighter outline-none whitespace-pre-line" style={{ fontSize: `${44 * sText}px`, fontFamily: data.titleFont || 'Playfair Display', color: brandColor }}>
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
    <div className="group relative w-full h-full bg-[#F4F1EB] flex flex-col overflow-hidden">
      <SlideHeader {...props} showBrandHandle={false} showSlideCounter={false} index={index + 1} hideDot />
      
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

      <div className="h-[40%] w-full relative overflow-hidden border-b-[8px] border-white">
        <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0" />
      </div>

      <div className="h-[40%] w-full p-8 flex flex-col justify-between" style={{ backgroundColor: brandColor }}>
        <div>
          <SmartElement slideIndex={index} field="badge_text" position={pos('badge_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'badge_text'} onSelectElement={onSelectElement}>
            <h3 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)} className="font-outfit font-black text-white text-xl uppercase tracking-widest mb-2 outline-none">
              {data.badge_text || 'ARQUIVO PESSOAL'}
            </h3>
          </SmartElement>
          <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement}>
            <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-playfair italic text-white/80 outline-none whitespace-pre-line" style={{ fontSize: `${18 * sText}px`, fontFamily: data.textFont || 'Playfair Display' }}>
              {data.texto_apoio || 'A excelência merece ser salva.'}
            </p>
          </SmartElement>
        </div>

        <div className="flex justify-between items-end w-full pointer-events-none">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/30">
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
      <SlideHeader {...props} showBrandHandle={false} showSlideCounter={false} index={index + 1} hideDot />

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

export function CTAVariant151(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-[#050505] overflow-hidden flex flex-col items-center justify-center border border-black/5">
      <SlideHeader {...props} showBrandHandle={false} showSlideCounter={false} index={index + 1} dark hideDot />

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

export function CTAVariant153(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, brandAvatar } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-white overflow-hidden flex flex-col">
      <SlideHeader {...props} showBrandHandle={false} showSlideCounter={false} index={index + 1} hideDot />
      
      <div className="h-[50%] w-full flex flex-col items-center justify-center p-8 relative z-10 shadow-md" style={{ backgroundColor: brandColor }}>
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

      <div className="h-[50%] w-full relative overflow-hidden border-t-[8px] border-white">
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

  export function CTAVariant155(props) {  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, brandAvatar } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-white overflow-hidden flex flex-col">
      <SlideHeader {...props} showBrandHandle={false} showSlideCounter={false} index={index + 1} dark hideDot />

      <div className="h-[50%] w-full relative overflow-hidden">
        <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0" />
      </div>

      <div className="h-[50%] w-full relative flex flex-col p-8 pt-10 border-t-[8px] border-white" style={{ backgroundColor: brandColor }}>
        <div className="absolute -top-6 left-8 w-12 h-12 rounded-full overflow-hidden border-[3px] border-white bg-white shadow-lg z-20 pointer-events-none">
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
            <div className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center text-white">
              <Heart className="w-4 h-4" />
            </div>
            <div className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center text-white">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center text-white">
              <Send className="w-4 h-4" />
            </div>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
              <Bookmark className="w-4 h-4" style={{ color: brandColor }} fill="currentColor" />
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
    <div className="group relative w-full h-full bg-white overflow-hidden flex flex-col">
      <SlideHeader {...props} showBrandHandle={false} showSlideCounter={false} index={index + 1} hideDot />

      <div className="w-full h-[55%] relative overflow-hidden border-b-[8px]" style={{ borderBottomColor: brandColor }}>
        <ImageBg data={data} slideIndex={index} imageUrl={data.imageUrl} imagePosition={data.imagePosition} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'} onSelectElement={onSelectElement} className="absolute inset-0 transition-all duration-700" />
        
        <div className="absolute top-4 left-4 text-white px-3 py-1 font-outfit font-black text-[10px] uppercase tracking-widest shadow-md pointer-events-none" style={{ backgroundColor: brandColor }}>
          SALVAR POST
        </div>
      </div>

      <div className="flex-1 bg-white p-6 flex flex-col justify-between border-t-[8px] border-white">
        <div className="flex justify-between items-start pointer-events-none">
          <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="pointer-events-auto">
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-outfit font-black text-[#1a1a1a] leading-[0.8] tracking-tighter outline-none whitespace-pre-line uppercase" style={{ fontSize: `${48 * sTitle}px`, fontFamily: data.titleFont || 'Outfit' }}>
              {data.titulo || 'NÃO\nPERCA.'}
            </h2>
          </SmartElement>
          <div 
            className="w-10 h-10 rounded-full overflow-hidden border border-zinc-200"
            style={{ boxShadow: `0 4px 12px ${brandColor}33` }}
          >
            {brandAvatar ? (
              <img src={brandAvatar} alt="profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-zinc-100" />
            )}
          </div>
        </div>

        <div className="w-full flex justify-between items-center transition-colors bg-zinc-50 border border-zinc-200 p-3 hover:border-zinc-400 pointer-events-auto rounded-[15px]">
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

  export function CTAVariant158(props) {  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, brandAvatar } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-white overflow-hidden flex flex-col p-8 border border-zinc-200">
      <SlideHeader {...props} showBrandHandle={false} showSlideCounter={false} index={index + 1} hideDot />
      
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

  export function CTAVariant160(props) {  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-[#0c0a09] overflow-hidden flex flex-col items-center justify-center border border-black/5">
      <SlideHeader {...props} showBrandHandle={false} showSlideCounter={false} index={index + 1} dark hideDot />
      
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

  export function CTAVariant162(props) {  const { data, index, brandColor, brandHandle, brandWebsite, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="group relative w-full h-full bg-[#FDFBF7] overflow-hidden flex flex-col p-10 border border-black/5">
      <SlideHeader {...props} showBrandHandle={false} showSlideCounter={false} index={index + 1} hideDot />
      
      <div className="flex justify-between items-start w-full pointer-events-none">
        <Store className="w-4 h-4" style={{ color: brandColor }} fill="currentColor" strokeWidth={1.5} />
        <span className="font-outfit font-light text-[9px] tracking-[0.4em] uppercase opacity-40">O Epílogo</span>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center text-center mt-8 pointer-events-none">
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="pointer-events-auto">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-light text-[#1a1a1a] leading-[0.8] tracking-tighter mb-12 outline-none whitespace-pre-line" style={{ fontSize: `${70 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>    
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

// ==========================================
// CTA 165: THE HOVERING SQUARES
// Três botões quadrados flutuantes na base sobre fundo creme.
// ==========================================
export function CTAVariant165(props) {
  const { data, index, brandColor, brandAvatar, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full relative bg-[#ffffff] flex flex-col overflow-hidden">

      {/* Topo: Handle + Foto */}
      <div className="w-full flex justify-between items-start p-8 pb-0 pointer-events-none">
        <div className="flex flex-col gap-3">
          <SmartElement slideIndex={index} field="badge_text" position={pos('badge_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'badge_text'} onSelectElement={onSelectElement} className="pointer-events-auto">
            <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)} className="font-outfit font-bold text-[#1a1a1a] text-[8px] tracking-[0.2em] uppercase border-b border-[#1a1a1a]/20 pb-1 outline-none">
              {data.badge_text || `@${brandHandle}`}
            </span>
          </SmartElement>
          <div className="w-10 h-10 rounded-full border border-[#1a1a1a]/10 overflow-hidden shadow-sm pointer-events-auto">
            <img 
              src={brandAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&auto=format&fit=crop'} 
              className="w-full h-full object-cover" 
              alt="Profile" 
            />
          </div>
        </div>
      </div>

      {/* Centro: Título + Subtítulo */}
      <div className="flex-1 p-8 flex flex-col justify-center overflow-hidden">
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="mb-2 w-full">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-black text-[#1a1a1a] leading-none tracking-tighter outline-none whitespace-pre-line break-words max-w-full" style={{ fontSize: `${60 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
            {data.titulo}
          </h2>
        </SmartElement>
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="w-full">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-zinc-500 uppercase tracking-[0.2em] font-medium outline-none whitespace-pre-line break-words max-w-full min-w-0" style={{ fontSize: `${14 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
            {data.texto_apoio}
          </p>
        </SmartElement>
      </div>

      {/* Base: 3 botões quadrados */}
      <div className="w-full flex justify-between items-end p-6 gap-2 mt-auto pointer-events-none">
        <div className="flex-1 aspect-square bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-zinc-100 flex flex-col items-center justify-center gap-2">
          <Heart className="w-5 h-5 text-[#1a1a1a]" strokeWidth={1.5} />
          <SmartElement slideIndex={index} field="cta_text" position={pos('cta_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'cta_text'} onSelectElement={onSelectElement} className="pointer-events-auto">
            <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)} className="font-outfit font-bold text-[#1a1a1a] text-[8px] uppercase tracking-widest outline-none">{data.cta_text || 'Curta'}</span>
          </SmartElement>
        </div>

        <div className="flex-1 aspect-square bg-[#1a1a1a] rounded-xl shadow-[0_10px_30px_rgba(26,26,26,0.2)] flex flex-col items-center justify-center gap-2">
          <MessageCircle className="w-5 h-5 text-white" strokeWidth={1.5} />
          <SmartElement slideIndex={index} field="insta_ready" position={pos('insta_ready')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'insta_ready'} onSelectElement={onSelectElement} className="pointer-events-auto">
            <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'insta_ready', e.currentTarget.innerText)} className="font-outfit font-bold text-white text-[8px] uppercase tracking-widest outline-none">{data.insta_ready || 'Comente'}</span>
          </SmartElement>
        </div>

        <div className="flex-1 aspect-square rounded-xl flex flex-col items-center justify-center gap-2" style={{ backgroundColor: brandColor, boxShadow: `0 10px 30px ${brandColor}33` }}>
          <Send className="w-5 h-5 text-white" strokeWidth={1.5} />
          <SmartElement slideIndex={index} field="studio_text" position={pos('studio_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'studio_text'} onSelectElement={onSelectElement} className="pointer-events-auto">
            <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'studio_text', e.currentTarget.innerText)} className="font-outfit font-bold text-white text-[8px] uppercase tracking-widest outline-none">{data.studio_text || 'Compartilhe'}</span>
          </SmartElement>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// CTA 166: THE FLOATING PILLS
// Pílulas horizontais empilhadas. Elegância máxima.
// ==========================================
export function CTAVariant166(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full relative bg-[#FDFBF7] flex flex-col p-8 overflow-hidden">

      {/* Topo */}
      <div className="flex justify-between items-center w-full mb-8 pointer-events-none">
        <SmartElement slideIndex={index} field="badge_text" position={pos('badge_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'badge_text'} onSelectElement={onSelectElement} className="pointer-events-auto">
          <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)} className="font-outfit font-bold text-zinc-400 text-[8px] tracking-[0.3em] uppercase outline-none">{data.badge_text || 'O VEREDITO'}</span>
        </SmartElement>
      </div>

      {/* Título */}
      <div className="mb-8">
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="mb-3 w-full">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair italic font-medium text-[#1a1a1a] leading-none outline-none whitespace-pre-line break-words max-w-full" style={{ fontSize: `${52 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
            {data.titulo}
          </h2>
        </SmartElement>
        <div className="w-8 h-[2px]" style={{ backgroundColor: brandColor }} />
      </div>

      <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="mb-auto w-full max-w-[80%] min-w-0">
        <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-zinc-500 leading-relaxed outline-none whitespace-pre-line break-words" style={{ fontSize: `${14 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
          {data.texto_apoio}
        </p>
      </SmartElement>

      {/* Pílulas de Ação */}
      <div className="flex flex-col gap-3 w-full mt-auto pointer-events-none">
        <div className="w-full bg-white border border-zinc-200 p-4 rounded-full flex items-center justify-between">
          <SmartElement slideIndex={index} field="cta_text" position={pos('cta_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'cta_text'} onSelectElement={onSelectElement} className="pointer-events-auto pl-2">
            <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)} className="font-outfit font-bold text-[#1a1a1a] text-[10px] uppercase tracking-widest outline-none">{data.cta_text || 'Deixar um Gosto'}</span>
          </SmartElement>
          <Heart className="w-4 h-4 text-[#1a1a1a]" strokeWidth={1.5} />
        </div>

        <div className="w-full bg-[#1a1a1a] p-4 rounded-full flex items-center justify-between">
          <SmartElement slideIndex={index} field="insta_ready" position={pos('insta_ready')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'insta_ready'} onSelectElement={onSelectElement} className="pointer-events-auto pl-2">
            <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'insta_ready', e.currentTarget.innerText)} className="font-outfit font-bold text-white text-[10px] uppercase tracking-widest outline-none">{data.insta_ready || 'Partilhar a Obra'}</span>
          </SmartElement>
          <Send className="w-4 h-4 text-white" strokeWidth={1.5} />
        </div>

        <div className="w-full p-4 rounded-full flex items-center justify-between" style={{ backgroundColor: brandColor }}>
          <SmartElement slideIndex={index} field="studio_text" position={pos('studio_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'studio_text'} onSelectElement={onSelectElement} className="pointer-events-auto pl-2">
            <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'studio_text', e.currentTarget.innerText)} className="font-outfit font-bold text-white text-[10px] uppercase tracking-widest outline-none">{data.studio_text || 'Salvar Coleção'}</span>
          </SmartElement>
          <Bookmark className="w-4 h-4 text-white" fill="currentColor" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// CTA 167: ORGANIC COFFEE
// Layout arqueado com portal, estética rústica e elegante de café.
// ==========================================
export function CTAVariant167(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  const parts = (data.titulo || 'Organic\nCoffee').split('\n');
  const part1 = parts[0] || 'Organic';
  const part2 = parts[1] || 'Coffee';

  return (
    <div className="relative w-full h-full bg-[#3c2215] flex flex-col justify-between py-10 px-8 font-outfit select-none text-[#faf1ea] overflow-hidden border border-white/10">
      
      {/* Bloco Superior: Duas colunas */}
      <div className="flex justify-between items-start gap-4 z-10 pointer-events-none">
        {/* Título Elegante no Canto Esquerdo */}
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="pointer-events-auto text-left leading-none">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', `${e.currentTarget.innerText}\n${part2}`)} className="font-hand text-[#FAF1EA] text-[52px] leading-[0.8] tracking-normal mb-1 block outline-none" style={{ fontSize: `${62 * sTitle}px`, fontFamily: 'Charmonman, cursive' }}>
            {part1}
          </h2>
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', `${part1}\n${e.currentTarget.innerText}`)} className="font-serif text-white text-[42px] font-bold tracking-tight block outline-none" style={{ fontSize: `${42 * sTitle}px`, fontFamily: 'Playfair Display, serif' }}>
            {part2}
          </h2>
        </SmartElement>

        {/* Parágrafo Descritivo no Canto Direito */}
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="pointer-events-auto flex-1 max-w-[200px] text-right">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="text-[13.5px] text-[#ebd9c8] font-light leading-relaxed tracking-wide text-justify outline-none" style={{ fontSize: `${15.5 * sText}px`, fontFamily: data.textFont || 'Outfit, sans-serif' }}>
            {data.texto_apoio || 'Organic coffee is coffee produced without the aid of artificial chemical substances, such as certain additives or some pesticides and herbicides.'}
          </p>
        </SmartElement>
      </div>

      {/* Arco Central (Portal) contendo o Moka Pot premium */}
      <div className="relative flex-1 w-full mx-auto my-6 flex items-end justify-center z-10 pointer-events-none">
        {/* Sombra suave abaixo do portal */}
        <div className="absolute w-[92%] h-[calc(100%-70px)] bg-black/35 blur-xl rounded-t-full translate-y-2 pointer-events-none" />
        
        {/* O Arco com clipping de borda e borda fina */}
        <div className="w-[90%] h-[calc(100%-70px)] rounded-t-[10rem] overflow-hidden border border-white/10 bg-zinc-950 relative pointer-events-auto">
          <ImageBg 
            data={data}
            slideIndex={index}
            imageUrl={data.imageUrl || "https://images.unsplash.com/photo-1545665225-b23b99e4d45e?q=80&w=800&auto=format&fit=crop"}
            imagePosition={data.imagePosition}
            showMetrics={showMetrics}
            onActionStart={onActionStart}
            isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'}
            onSelectElement={onSelectElement}
            className="w-full h-full cursor-pointer"
            placeholderText="Adicione uma Imagem"
          />
          {/* Gradiente interno suave do arco */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Botão de Rodapé Retangular Minimalista */}
      <div className="flex justify-center z-10 pointer-events-none">
        <SmartElement slideIndex={index} field="cta_text" position={pos('cta_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'cta_text'} onSelectElement={onSelectElement} className="pointer-events-auto">
          <button contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)} className="bg-[#b3a195] hover:bg-[#FAF1EA] text-[#3c2215] font-outfit font-bold text-[11px] uppercase tracking-[0.2em] py-3 px-12 rounded-xs shadow-lg transition-colors outline-none">
            {data.cta_text || 'Buy Now!'}
          </button>
        </SmartElement>
      </div>

    </div>
  );
}

// ==========================================
// CTA 168: PREMIUM COFFEE
// Layout de luxo com coroa, citação itálica e faixa horizontal com ícones sofisticados.
// ==========================================
export function CTAVariant168(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  const parts = (data.titulo || 'PREMIUM\nCOFFEE').split('\n');
  const part1 = parts[0] || 'PREMIUM';
  const part2 = parts[1] || 'COFFEE';

  return (
    <div className="relative w-full h-full bg-[#1c1917] flex flex-col justify-between py-10 px-8 font-outfit select-none text-[#ebd9c8] overflow-hidden border border-white/10">
      
      {/* Fundo sutil de cafeteria premium para dar profundidade de produto de luxo */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ImageBg 
          data={data}
          slideIndex={index}
          imageUrl={data.imageUrl || "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800&auto=format&fit=crop"}
          imagePosition={data.imagePosition}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'}
          onSelectElement={onSelectElement}
          className="absolute inset-0 w-full h-full opacity-20 filter blur-sm cursor-pointer pointer-events-auto"
          placeholderText="Adicione uma Imagem"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1c1917]/95 via-transparent to-[#1c1917]/95" />
      </div>

      {/* Linha Tracejada Inset */}
      <div className="absolute inset-4 border border-dashed border-[#ebd9c8]/25 rounded-2xl pointer-events-none z-0" />

      {/* Bloco Superior: Logotipo de coroa + Café */}
      <div className="relative z-10 flex flex-col items-center text-center mt-2 pointer-events-none">
        {/* Crown SVG */}
        <div className="text-[#ebd9c8] mb-4">
          <svg className="w-10 h-10 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/>
            <path d="M3 20h18" strokeWidth="2"/>
          </svg>
        </div>

        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="pointer-events-auto flex flex-col items-center">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', `${e.currentTarget.innerText}\n${part2}`)} className="text-[#ebd9c8] text-[26px] tracking-[0.3em] font-light leading-none uppercase outline-none" style={{ fontSize: `${26 * sTitle}px` }}>
            {part1}
          </h2>
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', `${part1}\n${e.currentTarget.innerText}`)} className="text-white text-[38px] tracking-[0.1em] font-black leading-none uppercase mt-1 outline-none" style={{ fontSize: `${38 * sTitle}px` }}>
            {part2}
          </h2>
        </SmartElement>

        {/* Linha separadora horizontal dourada */}
        <div className="w-28 h-[1px] bg-[#ebd9c8]/40 my-4" />

        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="pointer-events-auto">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-serif italic text-white text-[13px] tracking-wide outline-none" style={{ fontSize: `${13 * sText}px`, fontFamily: 'Playfair Display, serif' }}>
            {data.texto_apoio || '"A better way to enjoy coffee"'}
          </p>
        </SmartElement>
      </div>

      {/* Faixa Horizontal de Ícones de Linha */}
      <div className="relative z-10 w-[108%] -mx-[4%] bg-[#ebd9c8] py-4 px-6 flex justify-around items-center shadow-lg border-y border-[#d4b295]">
        
        {/* Ícone 1: Saco de café */}
        <svg viewBox="0 0 24 24" fill="none" stroke="#3c1d0f" strokeWidth="1.5" className="w-8 h-8 opacity-85 hover:scale-110 transition-transform">
          <path d="M6 3h12l1 4H5l1-4z" />
          <path d="M5 7h14v13a1 1 0 01-1 1H6a1 1 0 01-1-1V7z" />
          <circle cx="12" cy="14" r="2.5" />
          <line x1="10.5" y1="14" x2="13.5" y2="14" />
        </svg>

        {/* Ícone 2: Copo gelado com canudo */}
        <svg viewBox="0 0 24 24" fill="none" stroke="#3c1d0f" strokeWidth="1.5" className="w-8 h-8 opacity-85 hover:scale-110 transition-transform">
          <path d="M6 7h12l-1.5 13.5a1 1 0 01-1 .5h-7a1 1 0 01-1-.5L6 7z" />
          <path d="M5 7h14a1 1 0 001-1v0a1 1 0 00-1-1H5A1 1 0 004 6v0a1 1 0 001 1z" />
          <line x1="12" y1="5" x2="15" y2="2" strokeLinecap="round" />
        </svg>

        {/* Ícone 3: xícara quente */}
        <svg viewBox="0 0 24 24" fill="none" stroke="#3c1d0f" strokeWidth="1.5" className="w-8 h-8 opacity-85 hover:scale-110 transition-transform">
          <path d="M5 8h12a1 1 0 011 1v6a4 4 0 01-4 4H9a4 4 0 01-4-4V8z" />
          <path d="M17 10h2a2 2 0 012 2v1a2 2 0 01-2 2h-2" />
          <path d="M9 4c0-1 .5-2 1-2s1 1 1 2M13 4c0-1 .5-2 1-2s1 1 1 2" />
        </svg>

        {/* Ícone 4: Copo de papel viagem */}
        <svg viewBox="0 0 24 24" fill="none" stroke="#3c1d0f" strokeWidth="1.5" className="w-8 h-8 opacity-85 hover:scale-110 transition-transform">
          <path d="M6 6l1.5 14a1 1 0 001 .9h7a1 1 0 001-.9L18 6" />
          <path d="M5 6h14l-1-2H6L5 6z" />
          <rect x="8" y="10" width="8" height="3" rx="0.5" />
        </svg>

        {/* Ícone 5: Donut */}
        <svg viewBox="0 0 24 24" fill="none" stroke="#3c1d0f" strokeWidth="1.5" className="w-8 h-8 opacity-85 hover:scale-110 transition-transform">
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="2.5" />
          <line x1="8" y1="8" x2="8.5" y2="8.5" />
          <line x1="15.5" y1="8" x2="16" y2="8.5" />
          <line x1="15.5" y1="15.5" x2="16" y2="15" />
        </svg>

      </div>

      {/* Bloco Inferior: Oferta de Desconto */}
      <div className="relative z-10 text-center pb-2 pointer-events-none">
        <SmartElement slideIndex={index} field="cta_text" position={pos('cta_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'cta_text'} onSelectElement={onSelectElement} className="pointer-events-auto inline-block">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)} className="text-[#ebd9c8] font-outfit text-sm font-bold tracking-[0.25em] uppercase hover:text-white transition-colors cursor-pointer outline-none">
            {data.cta_text || 'GET 25% OFF'}
          </p>
        </SmartElement>
      </div>

    </div>
  );
}

// ==========================================
// CTA 169: DESCUBRA NOSSO CARDÁPIO
// Estilo cafeteria de luxo com coroa, citação itálica e faixa central com ícones de confeitaria finos.
// ==========================================
export function CTAVariant169(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  const parts = (data.titulo || 'DESCUBRA\nNOSSO CARDÁPIO').split('\n');
  const part1 = parts[0] || 'DESCUBRA';
  const part2 = parts[1] || 'NOSSO CARDÁPIO';

  return (
    <div className="relative w-full h-full bg-[#1c1412] flex flex-col justify-between py-10 px-8 font-outfit select-none text-[#ebd9c8] overflow-hidden rounded-[2rem] shadow-2xl border border-white/10">
      
      {/* Fundo borrado premium da cafeteria */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ImageBg 
          data={data}
          slideIndex={index}
          imageUrl={data.imageUrl || "https://images.unsplash.com/photo-1511018556340-d16986a1c194?q=80&w=800&auto=format&fit=crop"}
          imagePosition={data.imagePosition}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'}
          onSelectElement={onSelectElement}
          className="absolute inset-0 w-full h-full opacity-20 filter blur-[2px] cursor-pointer pointer-events-auto"
          placeholderText="Adicione uma Imagem"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1c1412]/95 via-transparent to-[#1c1412]/95" />
      </div>

      {/* Elemento Superior: Coroa + Títulos */}
      <div className="relative z-10 flex flex-col items-center text-center mt-2 pointer-events-none">
        
        {/* Coroa Realista do Logo */}
        <div className="text-[#ebd9c8] mb-4">
          <svg className="w-11 h-11 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/>
            <path d="M3 20h18" strokeWidth="2"/>
          </svg>
        </div>

        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="pointer-events-auto flex flex-col items-center">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', `${e.currentTarget.innerText}\n${part2}`)} className="font-serif text-white text-[28px] md:text-[32px] font-bold tracking-wide leading-none uppercase outline-none whitespace-pre-line break-words max-w-full" style={{ fontSize: `${28 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
            {part1}
          </h2>
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', `${part1}\n${e.currentTarget.innerText}`)} className="font-serif text-white text-[28px] md:text-[32px] font-bold tracking-wide leading-none uppercase mt-1 outline-none whitespace-pre-line break-words max-w-full" style={{ fontSize: `${28 * sTitle}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
            {part2}
          </h2>
        </SmartElement>

        <SmartElement slideIndex={index} field="badge_text" position={pos('badge_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'badge_text'} onSelectElement={onSelectElement} className="pointer-events-auto mt-3">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)} className="text-[#ebd9c8] text-[9.5px] font-bold tracking-[0.3em] uppercase outline-none" style={{ fontFamily: data.textFont || 'Outfit' }}>
            {data.badge_text || 'VISITE O LINK NA NOSSA BIO'}
          </p>
        </SmartElement>

        {/* Divisor dourado sutil */}
        <div className="w-20 h-[1px] bg-[#ebd9c8]/30 my-4" />

        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="pointer-events-auto max-w-[200px]">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-serif italic text-white/90 text-sm leading-relaxed outline-none" style={{ fontSize: `${14 * sText}px`, fontFamily: data.titleFont || 'Playfair Display' }}>
            {data.texto_apoio || '"Faça seu pedido agora e coroe seu dia."'}
          </p>
        </SmartElement>
      </div>

      {/* Faixa Central Beige com Ícones de Confeitaria Finos */}
      <div className="relative z-10 w-[108%] -mx-[4%] bg-[#ebd9c8] py-4 px-6 flex justify-around items-center shadow-lg border-y border-[#d4b295]">
        
        {/* Ícone 1: Fatia de bolo */}
        <svg viewBox="0 0 24 24" fill="none" stroke="#1c1412" strokeWidth="1.5" className="w-8 h-8 opacity-85 hover:scale-110 transition-transform">
          <path d="M2 20h20l-1-7-9-6-9 4-1 9z" />
          <path d="M12 7v13" strokeDasharray="2 2" />
          <circle cx="12" cy="4" r="1.5" fill="#1c1412" />
        </svg>

        {/* Ícone 2: Saco de confeitar */}
        <svg viewBox="0 0 24 24" fill="none" stroke="#1c1412" strokeWidth="1.5" className="w-8 h-8 opacity-85 hover:scale-110 transition-transform">
          <path d="M5 5l14 14-2.5 2.5L3.5 8.5 5 5z" />
          <path d="M19 19l2 2" />
          <path d="M7 7c2 2 2 4 4 6" strokeDasharray="1.5 1.5" />
        </svg>

        {/* Ícone 3: Macarons */}
        <svg viewBox="0 0 24 24" fill="none" stroke="#1c1412" strokeWidth="1.5" className="w-8 h-8 opacity-85 hover:scale-110 transition-transform">
          <rect x="6" y="5" width="12" height="4" rx="2" />
          <rect x="6" y="10" width="12" height="4" rx="2" />
          <rect x="6" y="15" width="12" height="4" rx="2" />
        </svg>

        {/* Ícone 4: Donut */}
        <svg viewBox="0 0 24 24" fill="none" stroke="#1c1412" strokeWidth="1.5" className="w-8 h-8 opacity-85 hover:scale-110 transition-transform">
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="2.5" />
          <line x1="8" y1="8" x2="8.5" y2="8.5" />
          <line x1="16" y1="8" x2="15.5" y2="8.5" />
          <line x1="8" y1="16" x2="8.5" y2="15.5" />
          <line x1="16" y1="16" x2="15.5" y2="15.5" />
        </svg>

        {/* Ícone 5: Bolo de casamento */}
        <svg viewBox="0 0 24 24" fill="none" stroke="#1c1412" strokeWidth="1.5" className="w-8 h-8 opacity-85 hover:scale-110 transition-transform">
          <rect x="5" y="16" width="14" height="4" rx="0.5" />
          <rect x="7" y="10" width="10" height="6" rx="0.5" />
          <rect x="9" y="5" width="6" height="5" rx="0.5" />
          <circle cx="12" cy="3" r="1" fill="#1c1412" />
        </svg>
      </div>

      {/* Bloco Inferior: Rodapé Promocional */}
      <div className="relative z-10 text-center pb-2 px-2 flex flex-col gap-1.5 pointer-events-none">
        <SmartElement slideIndex={index} field="cta_text" position={pos('cta_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'cta_text'} onSelectElement={onSelectElement} className="pointer-events-auto">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)} className="text-[#ebd9c8] font-outfit text-[10.5px] font-bold tracking-widest leading-relaxed outline-none whitespace-pre-line" style={{ fontSize: `${10.5 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
            {data.cta_text || 'E APROVEITE 25% OFF NA PRIMEIRA COMPRA COM O CUPOM: CONFEITARIA25'}
          </p>
        </SmartElement>
        
        <SmartElement slideIndex={index} field="studio_text" position={pos('studio_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'studio_text'} onSelectElement={onSelectElement} className="pointer-events-auto">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'studio_text', e.currentTarget.innerText)} className="text-white/60 font-outfit text-[9px] font-light tracking-[0.2em] outline-none whitespace-pre-line" style={{ fontSize: `${9 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
            {data.studio_text || 'NÃO PERCA A CHANCE: LINK NA BIO'}
          </p>
        </SmartElement>
      </div>

      {/* Sparkle brilhando no canto inferior direito */}
      <div className="absolute bottom-6 right-6 text-white/40 animate-pulse pointer-events-none">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/>
        </svg>
      </div>
    </div>
  );
}

// ==========================================
// CTA 170: SWEET TREAT HAVEN
// Design de donuts dividido 50/50 em tons pasteis com botão redondo na base.
// ==========================================
export function CTAVariant170(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  const bgColor = brandColor || '#f2afb9';

  return (
    <div className="relative w-full h-full bg-[#f2afb9] flex select-none font-outfit overflow-hidden rounded-[2rem] shadow-2xl border border-white/10" style={{ backgroundColor: bgColor }}>
      
      {/* Informações textuais da esquerda */}
      <div className="w-[50%] h-full p-6 flex flex-col justify-center text-left relative z-10" style={{ backgroundColor: bgColor }}>
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="mb-5 w-full">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="text-[#374151] font-outfit font-black text-3xl md:text-[2.6rem] leading-[0.9] tracking-tighter uppercase outline-none whitespace-pre-line break-words" style={{ fontSize: `${38 * sTitle}px`, fontFamily: data.titleFont || 'Outfit' }}>
            {data.titulo || "SWEET\nTREAT\nHAVEN"}
          </h2>
        </SmartElement>
        
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="max-w-[140px]">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="text-[#374151]/80 text-[11px] md:text-[12.5px] font-light leading-snug tracking-wide text-justify outline-none whitespace-pre-line" style={{ fontSize: `${12.5 * sText}px`, fontFamily: data.textFont || 'Outfit' }}>
            {data.texto_apoio || 'satisfy your sweet cravings with our doughnut delights'}
          </p>
        </SmartElement>
      </div>

      {/* Donuts de imagem na direita com sutil gradiente interno */}
      <div className="flex-1 h-full bg-[#fefaf6] relative overflow-hidden flex items-center justify-center pointer-events-auto">
        <ImageBg 
          data={data}
          slideIndex={index}
          imageUrl={data.imageUrl || "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=800&auto=format&fit=crop"}
          imagePosition={data.imagePosition}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'}
          onSelectElement={onSelectElement}
          className="absolute inset-0 w-full h-full cursor-pointer"
          placeholderText="Adicione uma Imagem"
        />
        <div className="absolute inset-0 w-4 z-10 pointer-events-none" style={{ background: `linear-gradient(to right, ${bgColor}, transparent)` }} />
      </div>

      {/* Botão de Rodapé arredondado de CTA */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <SmartElement slideIndex={index} field="cta_text" position={pos('cta_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'cta_text'} onSelectElement={onSelectElement} className="pointer-events-auto">
          <button contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)} className="hover:bg-white text-[#374151] font-outfit font-bold text-[10.5px] uppercase tracking-[0.2em] py-3.5 px-8 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.15)] border-2 border-[#374151] whitespace-nowrap outline-none" style={{ backgroundColor: bgColor }}>
            {data.cta_text || 'VISIT US TODAY'}
          </button>
        </SmartElement>
      </div>

    </div>
  );
}

// ==========================================
// CTA 171: BELLA DOCERIA - PARA FESTA
// Design dividido verticalmente com painel amarelo mostarda na esquerda e split colorido na direita.
// ==========================================
export function CTAVariant171(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  const parts = (data.titulo || 'Procurando o\nKit Festa\nideal?').split('\n');
  const part1 = parts[0] || 'Procurando o';
  const part2 = parts[1] || 'Kit Festa';
  const part3 = parts[2] || 'ideal?';

  const bellaCakePlaceholder = "https://images.unsplash.com/photo-1562777717-b61eb8f16b28?q=80&w=600&auto=format&fit=crop";

  return (
    <div className="relative w-full h-full flex font-outfit select-none overflow-hidden bg-white shadow-2xl group">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Alfa+Slab+One&family=Charmonman:wght@700&family=Calistoga&display=swap');
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-display { font-family: 'Alfa Slab One', cursive; }
        .font-hand { font-family: 'Charmonman', cursive; }
        .font-calistoga { font-family: 'Calistoga', serif; }
      `}} />

      {/* LEFT PANEL: Amarelo Mostarda */}
      <div className="w-[50%] h-full flex flex-col items-center justify-start pt-14 pb-8 relative z-10 px-3 text-center pointer-events-none" style={{ backgroundColor: brandColor || '#dfa828' }}>
        
        {/* Top Text Group */}
        <div className="flex flex-col items-center relative z-10 w-full pointer-events-auto">
          <SmartElement slideIndex={index} field="titulo_part1" position={pos('titulo_part1')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo_part1'} onSelectElement={onSelectElement} className="w-full flex justify-center">
            <h3 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', `${e.currentTarget.innerText}\n${part2}\n${part3}`)} className="text-[#ffffff] font-calistoga text-[14px] leading-none mb-1.5 tracking-tight whitespace-nowrap outline-none" style={{ fontSize: `${45 * sTitle}px`, fontFamily: 'Calistoga, serif' }}>
              {part1}
            </h3>
          </SmartElement>
          <SmartElement slideIndex={index} field="titulo_part2" position={pos('titulo_part2')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo_part2'} onSelectElement={onSelectElement} className="w-full flex justify-center">
            <h1 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', `${part1}\n${e.currentTarget.innerText}\n${part3}`)} className="text-[#ffffff] font-calistoga text-[26px] leading-[0.95] tracking-tight whitespace-nowrap outline-none" style={{ fontSize: `${45 * sTitle}px`, fontFamily: 'Calistoga, serif' }}>
              {part2}
            </h1>
          </SmartElement>
          <SmartElement slideIndex={index} field="titulo_part3" position={pos('titulo_part3')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo_part3'} onSelectElement={onSelectElement} className="w-full flex justify-center">
            <h3 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', `${part1}\n${part2}\n${e.currentTarget.innerText}`)} className="text-[#ffffff] font-calistoga text-[15px] leading-none mt-1 tracking-tight whitespace-nowrap outline-none" style={{ fontSize: `${45 * sTitle}px`, fontFamily: 'Calistoga, serif' }}>
              {part3}
            </h3>
          </SmartElement>
        </div>

        {/* Divider Box (Nós te ajudamos!) */}
        <div className="relative z-10 py-1.5 px-1 mt-6 mb-5 w-[85%] pointer-events-auto">
          <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement}>
            <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="text-white text-[10px] font-medium tracking-wide outline-none" style={{ fontSize: `${30 * sText}px` }}>
              {data.texto_apoio || 'Nós te ajudamos!'}
            </p>
          </SmartElement>
        </div>

        {/* CTA Bottom (Nos chame no direct!) */}
        <div className="relative z-10 w-[85%] pointer-events-auto">
          <SmartElement slideIndex={index} field="cta_text" position={pos('cta_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'cta_text'} onSelectElement={onSelectElement}>
            <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)} className="text-[#c82079] font-black text-[10px] uppercase tracking-widest leading-snug outline-none" style={{ fontSize: `${21 * sText}px` }}>
              {data.cta_text || 'NOS CHAME NO DIRECT!'}
            </p>
          </SmartElement>
        </div>

        {/* Logo Bottom Left */}
        <div className="relative z-10 mt-auto flex flex-col items-center justify-center pointer-events-auto">
          <SmartElement slideIndex={index} field="studio_text" position={pos('studio_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'studio_text'} onSelectElement={onSelectElement} className="flex flex-col items-center">
             <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'studio_text', e.currentTarget.innerText)} className="font-hand text-white text-[32px] leading-[0.6] tracking-tight pr-2 outline-none" style={{ fontFamily: 'Charmonman, cursive' }}>
               {data.studio_text || brandHandle || 'Bella'}
             </h2>
             <span className="font-black text-white text-[6px] tracking-[0.25em] uppercase mt-1">
               Confeitaria
             </span>
          </SmartElement>
        </div>

      </div>

      {/* SVG Pattern: Dona Jura Fitas */}
      <svg viewBox="0 0 1026.6 1350" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0 1020 C 15 1025, 96 1040, 78 1169 L 76 1169 C 72 1120, 15 1112, 0 1100 Z" fill="#ffd9e233" />
        <path d="M 0 1116 C 22 1129, 79 1149, 58 1224 L 54 1233 C 25 1268, -5 1208, 0 1194 Z" fill="#ffd9e233" />
        <path d="M 8 1248 C 20 1282, 56 1302, 53 1343 L 52 1341 C 11 1279, -32 1322, 0 1216 Z" fill="#ffd9e233" />
        <path d="M 157 1041 C 209 1117, 111 1191, 98 1135 L 99 1131 C 108 1100, 155 1076, 146 1023 Z" fill="#ffd9e233" />
        <path d="M 57 1050 C 38 1027, 58 1010, 64 1017 L 65 1019 C 71 1035, 64 1027, 71 1063 Z" fill="#ffd9e233" />
        <path d="M 96 1133 C 133 1033, 90 1021, 76 1049 L 76 1049 C 73 1079, 98 1090, 94 1133 Z" fill="#ffd9e233" />
        <path d="M 120 1087 C 160 1037, 131 1009, 118 1030 L 122 1027 C 107 1034, 127 1060, 119 1084 Z" fill="#ffd9e233" />
        <path d="M 180 1089 C 233 1032, 190 1007, 176 1026 L 179 1023 C 150 1039, 192 1070, 179 1086 Z" fill="#ffd9e233" />
        <path d="M 214 1184 C 249 1277, 185 1283, 180 1260 L 180 1254 C 180 1242, 218 1228, 211 1185 Z" fill="#ffd9e233" />
        <path d="M 219 1283 C 298 1348, 193 1430, 171 1413 L 186 1398 C 176 1369, 257 1342, 217 1284 Z" fill="#ffd9e233" />
        <path d="M 285 1118 C 329 1244, 262 1253, 258 1218 L 258 1214 C 262 1181, 284 1162, 283 1118 Z" fill="#ffd9e233" />
        <path d="M 303 1194 C 348 1307, 255 1274, 290 1238 L 295 1230 C 284 1246, 307 1222, 301 1194 Z" fill="#ffd9e233" />
        <path d="M 268 1060 C 308 1214, 206 1216, 221 1161 L 225 1153 C 248 1126, 266 1111, 266 1060 Z" fill="#ffd9e233" />
        <path d="M 302 1277 C 329 1394, 206 1353, 281 1308 L 261 1324 C 285 1298, 304 1308, 297 1276 Z" fill="#ffd9e233" />
        <path d="M 256 1029 C 252 1178, 164 1160, 181 1102 L 188 1091 C 210 1066, 246 1057, 252 1031 Z" fill="#ffd9e233" />
        <path d="M 210 1068 C 223 1040, 255 1041, 240 1025 L 243 1031 C 236 1009, 211 1020, 208 1068 Z" fill="#ffd9e233" />
        <path d="M 231 1137 C 193 1200, 174 1154, 191 1150 L 193 1149 C 216 1145, 216 1143, 230 1135 Z" fill="#ffd9e233" />
        <path d="M 176 1117 C 181 1179, 123 1158, 156 1137 L 152 1140 C 161 1133, 167 1129, 174 1116 Z" fill="#ffd9e233" />
        <path d="M 410 1237 C 461 1375, 317 1385, 374 1308 L 378 1304 C 416 1265, 405 1256, 407 1237 Z" fill="#ffd9e233" />
        <path d="M 440 1152 C 498 1226, 375 1253, 403 1206 L 406 1204 C 446 1188, 443 1170, 437 1153 Z" fill="#ffd9e233" />
        <path d="M 289 1028 C 323 1072, 381 1089, 410 1059 L 415 1050 C 431 985, 334 1045, 314 1036 Z" fill="#ffd9e233" />
        <path d="M 459 1296 C 449 1350, 536 1416, 412 1397 L 420 1385 C 423 1344, 449 1318, 457 1296 Z" fill="#ffd9e233" />
        <path d="M 275 1024 C 267 1116, 360 1213, 388 1142 L 388 1139 C 386 1086, 316 1081, 289 1041 Z" fill="#ffd9e233" />
        <path d="M 301 1143 C 301 1226, 372 1297, 400 1262 L 402 1258 C 410 1214, 347 1206, 313 1160 Z" fill="#ffd9e233" />
        <path d="M 312 1313 C 308 1408, 400 1502, 425 1431 L 425 1428 C 423 1375, 353 1352, 327 1334 Z" fill="#ffd9e233" />
        <path d="M 241 1195 C 208 1254, 248 1326, 290 1299 L 293 1295 C 305 1269, 251 1261, 244 1216 Z" fill="#ffd9e233" />
        <path d="M 302 1339 C 275 1358, 306 1473, 348 1446 L 351 1442 C 363 1416, 309 1408, 302 1363 Z" fill="#ffd9e233" />
        <path d="M 316 1308 C 321 1235, 320 1295, 321 1230 L 340 1254 C 386 1293, 362 1366, 317 1314 Z" fill="#ffd9e233" />
        <path d="M 417 1340 C 387 1360, 377 1366, 388 1369 L 395 1371 C 402 1374, 409 1368, 418 1341 Z" fill="#ffd9e233" />
        <path d="M 519 1320 C 519 1359, 529 1350, 475 1350 L 472 1350 C 453 1312, 472 1277, 474 1254 Z" fill="#ffd9e233" />
        <path d="M 471 1131 C 441 1190, 471 1239, 493 1218 L 494 1216 C 503 1188, 481 1198, 474 1153 Z" fill="#ffd9e233" />
        <path d="M 355 1085 C 387 1118, 435 1113, 446 1101 L 450 1096 C 464 1050, 397 1090, 374 1086 Z" fill="#ffd9e233" />
        <path d="M 388 1115 C 421 1145, 450 1162, 465 1137 L 467 1134 C 475 1098, 430 1114, 407 1115 Z" fill="#ffd9e233" />
        <path d="M 424 1067 C 477 1047, 493 1072, 510 1064 L 518 1059 C 536 1004, 453 1011, 422 1064 Z" fill="#ffd9e233" />
        <path d="M 462 1071 C 466 1079, 502 1109, 519 1096 L 519 1077 C 520 1040, 514 1096, 463 1068 Z" fill="#ffd9e233" />
        <path d="M 504 1104 C 507 1104, 521 1113, 519 1111 L 519 1096 C 520 1099, 512 1104, 505 1101 Z" fill="#ffd9e233" />
        <path d="M 325 1166 C 353 1193, 424 1209, 434 1168 L 434 1161 C 415 1114, 375 1197, 326 1165 Z" fill="#ffd9e233" />
        <path d="M 453 1080 C 476 1106, 476 1156, 519 1156 L 519 1118 C 494 1116, 480 1086, 454 1079 Z" fill="#ffd9e233" />
        <path d="M 480 1144 C 480 1146, 490 1176, 519 1198 L 519 1164 C 499 1162, 490 1152, 482 1143 Z" fill="#ffd9e233" />
        <path d="M 488 1182 C 485 1184, 499 1187, 519 1224 L 519 1201 C 507 1194, 541 1216, 490 1181 Z" fill="#ffd9e233" />
        <path d="M 425 1335 C 435 1292, 437 1316, 465 1270 L 468 1264 C 494 1207, 416 1158, 423 1335 Z" fill="#ffd9e233" />
        <path d="M 519 1296 C 519 1253, 519 1277, 519 1256 L 519 1246 C 518 1191, 428 1228, 519 1298 Z" fill="#ffd9e233" />
        <path d="M 83 1199 C 79 1142, 108 1150, 112 1160 L 113 1163 C 114 1175, 94 1177, 85 1199 Z" fill="#ffd9e233" />
        <path d="M 69 1311 C 40 1170, 196 1119, 207 1199 L 207 1202 C 191 1271, 94 1205, 71 1311 Z" fill="#ffd9e233" />
        <path d="M 77 1350 C 75 1229, 172 1237, 188 1283 L 189 1289 C 188 1324, 153 1325, 119 1350 Z" fill="#ffd9e233" />
        <path d="M 150 1350 C 159 1342, 174 1334, 186 1309 L 190 1303 C 203 1289, 233 1310, 213 1350 Z" fill="#ffd9e233" />
        <path d="M 37 1247 C 58 1238, 65 1300, 62 1327 L 58 1326 C 65 1305, 5 1263, 39 1246 Z" fill="#ffd9e233" />
        <path d="M -3 1355 C 0 1310, 24 1322, 33 1333 L 32 1332 C 77 1373, 10 1345, -3 1354 Z" fill="#ffd9e233" />
        <path d="M 26 1427 C 22 1370, 51 1378, 55 1388 L 56 1391 C 57 1403, 54 1398, 28 1427 Z" fill="#ffd9e233" />
      </svg>

      {/* RIGHT PANEL: Bolo & Fundo Split */}
      <div className="w-[50%] h-full relative pointer-events-auto">
        <ImageBg 
          data={data}
          slideIndex={index}
          imageUrl={data.imageUrl || bellaCakePlaceholder}
          imagePosition={data.imagePosition}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'}
          onSelectElement={onSelectElement}
          className="w-full h-full cursor-pointer"
          placeholderText="Adicione uma Imagem"
        />
      </div>
    </div>
  );
}

// ==========================================
// CTA 172: ORÇAMENTO FESTA
// Design de orçamento de bolo de festa com marcas d'água no fundo e botões e detalhes sofisticados.
// ==========================================
export function CTAVariant172(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  const chocolateCakeWhole = "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=600&auto=format&fit=crop";

  return (
    <div className="relative w-full h-full bg-[#fcaebb] flex flex-col font-outfit select-none overflow-hidden text-[#2a1b18] shadow-2xl">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Lobster&family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Alfa+Slab+One&family=Charmonman:wght@700&display=swap');
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-display { font-family: 'Alfa Slab One', cursive; }
        .font-hand { font-family: 'Charmonman', cursive; }
        .font-lobster { font-family: 'Lobster', cursive; }
      `}} />

      {/* Background Text (Faint Script) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] flex items-center justify-center pointer-events-none z-0">
        <span className="font-hand text-[200px] text-[#f89dae] leading-none transform -rotate-12 opacity-40 select-none" style={{ fontFamily: 'Charmonman, cursive' }}>
          Doçura
        </span>
      </div>

      {/* Header Typography */}
      <div className="relative z-20 flex flex-col items-center mt-12 px-4 pointer-events-none">
        <SmartElement slideIndex={index} field="badge_text" position={pos('badge_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'badge_text'} onSelectElement={onSelectElement} className="pointer-events-auto">
          <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)} className="relative -left-[15px] text-[8px] font-bold tracking-[0.1em] uppercase text-[#2a1b18] mb-[-4px] outline-none" style={{ fontSize: `${19 * sText}px` }}>
            {data.badge_text || "SOLICITE SEU"}
          </span>
        </SmartElement>
        
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="pointer-events-auto">
          <h1 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-display text-[42px] leading-[0.85] tracking-tight text-[#2a1b18] -ml-2 drop-shadow-sm outline-none" style={{ fontSize: `${65 * sTitle}px`, fontFamily: 'Alfa Slab One, cursive' }}>
            {data.titulo || "Orçamento"}
          </h1>
        </SmartElement>

        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="pointer-events-auto">
          <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="relative left-[25px] text-[8px] font-bold tracking-[0.1em] uppercase text-[#2a1b18] mt-1.5 ml-14 outline-none" style={{ fontSize: `${18 * sText}px` }}>
            {data.texto_apoio || "PARA SUA FESTA DE ANIVERSÁRIO"}
          </span>
        </SmartElement>
      </div>

      {/* Main Subject: Chocolate Cake */}
      <div className="relative z-10 flex-1 flex items-center justify-center mt-1 pointer-events-auto">
        <div className="w-[60%] aspect-[1.1] relative transition-transform duration-700">
          <ImageBg 
            data={data}
            slideIndex={index}
            imageUrl={data.imageUrl || chocolateCakeWhole}
            imagePosition={data.imagePosition}
            showMetrics={showMetrics}
            onActionStart={onActionStart}
            isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'}
            onSelectElement={onSelectElement}
            className="w-full h-full drop-shadow-[0_25px_30px_rgba(42,27,24,0.4)] rounded-[3rem] cursor-pointer"
            placeholderText="Adicione uma Imagem"
          />
        </div>
      </div>

      {/* Footer Section */}
      <div className="relative z-20 flex flex-col items-center pb-6 mt-2 pointer-events-none">
        
        {/* Dark Pill Button */}
        <SmartElement slideIndex={index} field="cta_text" position={pos('cta_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'cta_text'} onSelectElement={onSelectElement} className="pointer-events-auto">
          <button contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)} className="bg-[#1c1210] text-[#fcaebb] px-10 py-3.5 rounded-full text-[12px] font-bold tracking-widest hover:bg-black transition-colors shadow-xl mb-6 outline-none">
            {data.cta_text || "entre em contato!"}
          </button>
        </SmartElement>

        {/* Contact & Address Footer */}
        <div className="w-[90%] flex items-center justify-between border-t border-[#2a1b18]/15 pt-4 px-1 pointer-events-auto">
          
          {/* WhatsApp */}
          <div className="flex items-center gap-1.5 flex-1">
            <svg className="w-4 h-4 text-[#2a1b18] fill-[#2a1b18] shrink-0" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-4.846c1.6.95 3.16 1.449 4.814 1.451 5.4 0 9.794-4.35 9.797-9.7 0-2.592-1.01-5.029-2.846-6.866-1.836-1.836-4.274-2.846-6.86-2.848-5.394 0-9.79 4.352-9.794 9.702-.001 1.705.452 3.37 1.31 4.8l-.993 3.63 3.769-.974zm11.516-7.078c-.313-.156-1.85-.909-2.137-1.013-.287-.105-.497-.156-.708.156-.21.313-.815 1.013-.997 1.221-.183.208-.365.234-.678.078-1.572-.787-2.613-1.371-3.66-3.17-.278-.475.278-.44.795-1.472.087-.174.043-.327-.021-.453-.064-.127-.525-1.264-.72-1.734-.19-.459-.384-.396-.525-.403-.136-.007-.292-.008-.448-.008-.156 0-.41.059-.625.293-.215.234-.82.801-.82 1.953s.84 2.266.957 2.422c.117.156 1.653 2.508 4 3.508.558.232 1.002.371 1.344.48.56.177 1.069.152 1.472.092.45-.067 1.85-.75 2.112-1.439.262-.688.262-1.277.183-1.402-.078-.125-.287-.208-.6-.364z" />
            </svg>
            <SmartElement slideIndex={index} field="studio_text" position={pos('studio_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'studio_text'} onSelectElement={onSelectElement} className="flex flex-col leading-[1]">
              <span className="text-[7.5px] font-medium text-[#2a1b18] block">WhatsApp</span>
              <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'studio_text', e.currentTarget.innerText)} className="text-[8.5px] font-black tracking-tight outline-none block">{data.studio_text || "84 9 9999 0000"}</span>
            </SmartElement>
          </div>

          {/* Address */}
          <div className="flex items-center justify-center gap-1 flex-[1.2] border-x border-[#2a1b18]/20 px-2">
            <svg className="w-[14px] h-[14px] text-[#2a1b18] shrink-0 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <div className="flex flex-col items-center text-center leading-[1]">
              <SmartElement slideIndex={index} field="insta_ready" position={pos('insta_ready')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'insta_ready'} onSelectElement={onSelectElement} className="w-full">
                <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'insta_ready', e.currentTarget.innerText)} className="text-[7px] font-medium text-[#2a1b18] truncate max-w-[90px] block outline-none">{data.insta_ready || "Rua do Doce, 123"}</span>
              </SmartElement>
              <SmartElement slideIndex={index} field="slide_call" position={pos('slide_call')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'slide_call'} onSelectElement={onSelectElement} className="w-full">
                <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'slide_call', e.currentTarget.innerText)} className="text-[7px] font-medium text-[#2a1b18] truncate max-w-[90px] block outline-none">{data.slide_call || "Bairro das Festas - Cidade/UF"}</span>
              </SmartElement>
            </div>
          </div>
          
          {/* Delivery Logos */}
          <div className="flex items-center gap-1.5 flex-1 justify-end shrink-0">
            <span className="font-display italic text-[11px] tracking-tighter text-[#2a1b18]">iFood</span>
            <div className="leading-none text-center">
              <span className="text-[7px] font-black block text-[#2a1b18]">UBER</span>
              <span className="text-[9.5px] font-black block text-[#2a1b18]">eats</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

// ==========================================
// CTA 173: DELÍCIA PEDIDO
// Card de pedido de delícias confeitaria com sobreposição de imagem de bolo realista na base.
// ==========================================
export function CTAVariant173(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  const pinkVintageCake = "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=600&auto=format&fit=crop";

  return (
    <div className="relative w-full h-full bg-[#3c1b22] flex flex-col font-outfit select-none overflow-hidden text-[#111] rounded-[2rem] shadow-2xl border border-white/10">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Lobster&family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Alfa+Slab+One&family=Charmonman:wght@700&display=swap');
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-display { font-family: 'Alfa Slab One', cursive; }
        .font-hand { font-family: 'Charmonman', cursive; }
        .font-lobster { font-family: 'Lobster', cursive; }
      `}} />

      {/* Fundo com Pattern Sutil */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 15c-3-5-10-7-15-2-5 5-5 12 0 17l15 15 15-15c5-5 5-12 0-17-5-5-12-3-15 2z' fill='none' stroke='%23ffffff' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M22 25h16M25 30h10' stroke='%23ffffff' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
             backgroundSize: '80px 80px'
           }}
      />

      {/* Arroba Topo */}
      <div className="relative z-10 w-full text-center mt-6">
        <span className="text-white text-[12px] font-medium tracking-wide">
          {brandHandle || "@seuarroba"}
        </span>
      </div>

      {/* Area Central: Card e Imagem */}
      <div className="relative flex-1 flex flex-col items-center w-full mt-4">
        
        {/* Card Principal */}
        <div className="relative w-[85%] bg-[#fde5da] rounded-[1.5rem] mt-6 px-6 pt-10 pb-12 shadow-[0_15px_30px_rgba(0,0,0,0.4)] z-20 flex flex-col items-center text-center pointer-events-none">
          
          {/* Ícone sobreposto no topo do card */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#fc6c65] w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transform rotate-3 border-2 border-[#3c1b22]/10 pointer-events-none">
            <svg className="w-6 h-6 text-[#3c1b22]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6M10 16h4" />
            </svg>
          </div>

          {/* Texto do Card com Destaques */}
          <div className="text-[20px] leading-[1.1] font-medium text-[#111] tracking-tight pointer-events-auto w-full">
            <SmartElement slideIndex={index} field="badge_text" position={pos('badge_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'badge_text'} onSelectElement={onSelectElement} className="inline">
              <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)} className="outline-none inline-block mr-1">
                {data.badge_text || "Toda"}
              </span>
            </SmartElement>

            <SmartElement slideIndex={index} field="studio_text" position={pos('studio_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'studio_text'} onSelectElement={onSelectElement} className="inline">
              <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'studio_text', e.currentTarget.innerText)} className="text-[#fc6c65] font-bold outline-none inline-block">
                {data.studio_text || "delícia"}
              </span>
            </SmartElement>
            
            <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="block mt-1">
              <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="block whitespace-pre-line outline-none leading-[1.1]" style={{ fontSize: `${20 * sTitle}px` }}>
                {data.titulo || "merece\nser saboreada...\nE a sua está só a um"}
              </span>
            </SmartElement>

            <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="block mt-1">
              <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="block text-[#fc6c65] font-bold outline-none" style={{ fontSize: `${20 * sText}px` }}>
                {data.texto_apoio || "pedido de distância!"}
              </span>
            </SmartElement>
          </div>

          {/* Botão em Pílula Sobrepondo a Base do Card */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-full flex justify-center px-4 pointer-events-auto">
            <SmartElement slideIndex={index} field="cta_text" position={pos('cta_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'cta_text'} onSelectElement={onSelectElement} className="w-full">
              <button contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)} className="bg-[#fc6c65] text-white w-full py-2.5 rounded-full text-[13px] font-bold tracking-wide shadow-[0_8px_20px_rgba(252,108,101,0.4)] transition-transform outline-none">
                {data.cta_text || "Faça já sua encomenda!"}
              </button>
            </SmartElement>
          </div>

        </div>

        {/* Imagem do Bolo de Cereja (Fundo) */}
        <div className="absolute bottom-[-10%] w-[110%] aspect-[1.1] z-10 flex justify-center pointer-events-auto">
          <ImageBg 
            data={data}
            slideIndex={index}
            imageUrl={data.imageUrl || pinkVintageCake}
            imagePosition={data.imagePosition}
            showMetrics={showMetrics}
            onActionStart={onActionStart}
            isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'}
            onSelectElement={onSelectElement}
            className="w-full h-full bg-contain bg-no-repeat bg-center drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)] cursor-pointer"
            placeholderText="Adicione uma Imagem"
          />
        </div>

      </div>

    </div>
  );
}

// ==========================================
// CTA 174: PINK PIE FROSTING
// Design rosa vibrante com formas interligadas creme e chantilly nos cantos com máscara de recorte.
// ==========================================
export function CTAVariant174(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  const parts = (data.titulo || "Nossos cupcakes,\nbolos e brownies\nestão esperando\npor você!").split('\n');
  const line1 = parts[0] || "Nossos cupcakes,";
  const line2 = parts[1] || "bolos e brownies";
  const line3 = parts[2] || "estão esperando";
  const line4 = parts[3] || "por você!";

  const line3Parts = line3.split(' ');
  const line3Start = line3Parts[0] || "estão";
  const line3Bold = line3Parts.slice(1).join(' ') || "esperando";

  return (
    <div className="relative w-full h-full bg-[#f93892] flex flex-col items-center justify-center font-outfit select-none overflow-hidden text-white shadow-2xl">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Alfa+Slab+One&family=Charmonman:wght@700&display=swap');
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-display { font-family: 'Alfa Slab One', cursive; }
        .font-hand { font-family: 'Charmonman', cursive; }
      `}} />

      {/* Formas Geométricas de Fundo (Interlocking) */}
      <div className="absolute top-0 right-0 w-[58%] h-[35%] bg-[#fbf8ea] rounded-bl-[3rem] pointer-events-none z-0 shadow-[-5px_5px_20px_rgba(249,56,146,0.5)]" />
      <div className="absolute bottom-0 left-0 w-[55%] h-[32%] bg-[#fbf8ea] rounded-tr-[3rem] pointer-events-none z-0 shadow-[5px_-5px_20px_rgba(249,56,146,0.5)]" />

      {/* Ponto de luz no canto superior esquerdo */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.60)_0%,_rgba(255,255,255,0.20)_35%,_transparent_75%)] pointer-events-none z-10" />

      {/* Ponto de luz no centro */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.18)_0%,_transparent_70%)] pointer-events-none z-10" />


      {/* Textos Centralizados */}
      <div className="relative z-20 text-center flex flex-col items-center justify-center mt-2 w-[90%] pointer-events-auto">
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="w-full">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="text-[26px] font-light leading-[1.25] tracking-tight text-white drop-shadow-sm outline-none whitespace-pre-line" style={{ fontSize: `${26 * sTitle}px` }}>
            {line1}<br/>
            {line2}<br/>
            {line3Start} <span className="font-bold tracking-normal">{line3Bold}</span><br/>
            {line4}
          </p>
        </SmartElement>
      </div>

      {/* Logo Bottom Center */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center gap-1.5 z-20 opacity-100 pointer-events-auto">
        <svg className="w-[22px] h-[22px] fill-current text-white shrink-0" viewBox="0 0 24 24">
          <path d="M12 2C9.5 2 7.2 3.8 6.5 6.2c-.4.1-.7.2-1 .5-.9.9-1 2.3-.3 3.3.6.9 1.6 1.1 2.5 1h.1L8.5 20c.1.6.6 1 1.2 1h4.6c.6 0 1.1-.4 1.2-1l.7-9h.1c.9.1 1.9-.1 2.5-1 .7-1 .6-2.4-.3-3.3-.3-.3-.6-.4-1-.5C16.8 3.8 14.5 2 12 2zm0 2c1.7 0 3.2 1.2 3.6 2.8.2 1.1.2 2.2-1.3 2.2-1.6 0-1.8 1.4-1.8 2 0 1.1-.9 2-2 2s-2-.9-2-2c0-.6-.2-2-1.8-2-1.5 0-1.5-1.1-1.3-2.2C7.8 5.2 9.3 4 12 4zm-1.8 8h3.6l-.6 7h-2.4l-.6-7z" />
        </svg>
        <SmartElement slideIndex={index} field="studio_text" position={pos('studio_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'studio_text'} onSelectElement={onSelectElement}>
          <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'studio_text', e.currentTarget.innerText)} className="font-outfit font-medium text-[20px] tracking-tight lowercase mt-0.5 outline-none block">
            {data.studio_text || brandHandle || "pink pie"}
          </span>
        </SmartElement>
      </div>

    </div>
  );
}

// ==========================================
// CTA 175: TORTA DE FRUTAS REAL
// Design rosa suave com imagem central de torta recortada por máscara ondulada em formato de torta.
// ==========================================
export function CTAVariant175(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  const berryPieTopDown = "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=600&auto=format&fit=crop";

  return (
    <div className="relative w-full h-full bg-[#fdaeb8] flex flex-col font-outfit select-none overflow-hidden text-[#362728] rounded-[2rem] shadow-2xl border border-white/10">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Lobster&family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Alfa+Slab+One&family=Charmonman:wght@700&display=swap');
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-display { font-family: 'Alfa Slab One', cursive; }
        .font-hand { font-family: 'Charmonman', cursive; }
        .font-lobster { font-family: 'Lobster', cursive; }
      `}} />

      {/* Main Pie Image with Wavy Cutout Mask */}
      <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[140%] aspect-square z-10 pointer-events-auto" style={{ filter: 'drop-shadow(0px 25px 25px rgba(0,0,0,0.45))' }}>
         <div className="w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out" style={{
            WebkitMaskImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 100 10 C 115 10 120 20 130 15 C 140 10 145 25 155 25 C 165 25 175 35 180 45 C 185 55 175 65 185 75 C 195 85 185 95 190 105 C 195 115 185 120 185 130 C 185 140 170 145 165 155 C 160 165 150 160 140 170 C 130 180 125 175 115 185 C 105 195 95 185 85 185 C 75 185 70 195 60 185 C 50 175 40 180 35 170 C 30 160 20 165 15 155 C 10 145 15 135 10 125 C 5 115 15 105 10 95 C 5 85 15 75 15 65 C 15 55 5 45 15 35 C 25 25 35 30 45 20 C 55 10 65 20 75 15 C 85 10 90 10 100 10 Z'/%3E%3C/svg%3E")`,
            maskImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 100 10 C 115 10 120 20 130 15 C 140 10 145 25 155 25 C 165 25 175 35 180 45 C 185 55 175 65 185 75 C 195 85 185 95 190 105 C 195 115 185 120 185 130 C 185 140 170 145 165 155 C 160 165 150 160 140 170 C 130 180 125 175 115 185 C 105 195 95 185 85 185 C 75 185 70 195 60 185 C 50 175 40 180 35 170 C 30 160 20 165 15 155 C 10 145 15 135 10 125 C 5 115 15 105 10 95 C 5 85 15 75 15 65 C 15 55 5 45 15 35 C 25 25 35 30 45 20 C 55 10 65 20 75 15 C 85 10 90 10 100 10 Z'/%3E%3C/svg%3E")`,
            WebkitMaskSize: '100% 100%',
            maskSize: '100% 100%',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat'
         }}>
           <ImageBg 
             data={data}
             slideIndex={index}
             imageUrl={data.imageUrl || berryPieTopDown}
             imagePosition={data.imagePosition}
             showMetrics={showMetrics}
             onActionStart={onActionStart}
             isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'}
             onSelectElement={onSelectElement}
             className="w-full h-full bg-cover scale-[1.12] mt-[2%] cursor-pointer"
             placeholderText="Adicione uma Imagem"
           />
         </div>
      </div>

      {/* Typography Area - Centered below pie */}
      <div className="flex-1 flex flex-col items-center justify-end text-center px-6 z-20 pb-20 mt-[80%] pointer-events-none">
        <SmartElement slideIndex={index} field="badge_text" position={pos('badge_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'badge_text'} onSelectElement={onSelectElement} className="pointer-events-auto">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)} className="text-[20px] font-medium tracking-tight text-[#362728] leading-none mb-1 outline-none">
            {data.badge_text || "Venha provar nossas"}
          </h2>
        </SmartElement>
        
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="pointer-events-auto">
          <h1 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-lobster text-[38px] tracking-wide text-[#362728] leading-[0.9] drop-shadow-sm mb-4 outline-none" style={{ fontSize: `${38 * sTitle}px`, fontFamily: 'Lobster, cursive' }}>
            {data.titulo || "Tortas variadas"}
          </h1>
        </SmartElement>

        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="pointer-events-auto">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="text-[12px] font-medium leading-[1.3] max-w-[260px] text-[#362728]/90 whitespace-pre-line outline-none" style={{ fontSize: `${12 * sText}px` }}>
            {data.texto_apoio || "Desde as tradicionais tortas de frutas\naté as opções mais cremosas."}
          </p>
        </SmartElement>
      </div>

      {/* Absolute Footer */}
      <div className="absolute bottom-6 w-full px-4 z-20 pointer-events-none">
        <div className="flex items-center justify-between pointer-events-auto">
          
          {/* Left: WhatsApp */}
          <div className="flex items-center gap-1.5 flex-[0.9]">
            <div className="w-[18px] h-[18px] border-2 border-[#362728] rounded-full flex items-center justify-center shrink-0">
              <svg className="w-2.5 h-2.5 fill-current text-[#362728]" viewBox="0 0 24 24"><path d="M12.031 21.171l-1.353-.086c-1.84-.117-3.567-.803-5.02-1.996L4.544 20l.965-1.127c-1.168-1.405-1.802-3.136-1.83-4.945-.04-2.584 1.057-4.986 2.92-6.505C8.423 5.926 10.984 5.3 13.56 5.67c2.563.367 4.78 1.776 6.096 3.967 1.309 2.18 1.488 4.793.491 7.127-.991 2.32-2.906 4.08-5.32 4.908-1.597.545-3.342.6-4.966.155l-1.83-.5z" /></svg>
            </div>
            <SmartElement slideIndex={index} field="studio_text" position={pos('studio_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'studio_text'} onSelectElement={onSelectElement} className="flex flex-col leading-[1]">
              <span className="text-[7.5px] font-medium text-[#362728]">WhatsApp</span>
              <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'studio_text', e.currentTarget.innerText)} className="text-[8.5px] font-bold tracking-tight text-[#362728] outline-none">{data.studio_text || "84 9 9999 0000"}</span>
            </SmartElement>
          </div>

          {/* Center: Address */}
          <div className="flex items-center gap-1 flex-[1.3] pl-2 border-l border-[#362728]/15">
            <svg className="w-[14px] h-[14px] text-[#362728] shrink-0 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <div className="flex flex-col leading-[1]">
              <SmartElement slideIndex={index} field="insta_ready" position={pos('insta_ready')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'insta_ready'} onSelectElement={onSelectElement} className="w-full">
                <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'insta_ready', e.currentTarget.innerText)} className="text-[7.5px] font-medium text-[#362728] truncate max-w-[100px] block outline-none">{data.insta_ready || "Rua Antônio Carlos Barreto"}</span>
              </SmartElement>
              <SmartElement slideIndex={index} field="slide_call" position={pos('slide_call')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'slide_call'} onSelectElement={onSelectElement} className="w-full">
                <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'slide_call', e.currentTarget.innerText)} className="text-[7.5px] font-medium text-[#362728] truncate max-w-[100px] block outline-none">{data.slide_call || "Bairro Paulo Freire"}</span>
              </SmartElement>
            </div>
          </div>
          
          {/* Right: Delivery Logos */}
          <div className="flex items-center gap-1.5 pl-2 flex-[0.8] justify-end shrink-0">
            <span className="font-display italic text-[11px] tracking-tighter text-[#362728]">iFood</span>
            <div className="leading-none text-center">
              <span className="text-[5px] font-black block text-[#362728]">UBER</span>
              <span className="text-[7px] font-black block text-[#362728]">eats</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

// ==========================================
// CTA 176: HOLIDAY BAKE SALE
// Design promocional natalino com topo amarelo, base de cookies e card central rotacionado.
// ==========================================
export function CTAVariant176(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  const parts = (data.titulo || "Holiday\nBake Sale").split('\n');
  const holidayTitle1 = parts[0] || "Holiday";
  const holidayTitle2 = parts[1] || "Bake Sale";

  const holidayCookies = "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=600&auto=format&fit=crop";

  return (
    <div className="relative w-full h-full flex flex-col font-outfit select-none overflow-hidden bg-[#ffd381] shadow-2xl">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Lobster&family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Alfa+Slab+One&family=Charmonman:wght@700&display=swap');
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-display { font-family: 'Alfa Slab One', cursive; }
        .font-hand { font-family: 'Charmonman', cursive; }
        .font-lobster { font-family: 'Lobster', cursive; }
      `}} />

      {/* Fundo Metade Superior (Amarelo) */}
      <div className="h-[48%] w-full bg-[#ffd381] z-0 pointer-events-none" />
      
      {/* Fundo Metade Inferior (Biscoitos) */}
      <div className="h-[52%] w-full relative z-0 pointer-events-auto">
        <ImageBg 
          data={data}
          slideIndex={index}
          imageUrl={data.imageUrl || holidayCookies}
          imagePosition={data.imagePosition}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'}
          onSelectElement={onSelectElement}
          className="w-full h-full bg-cover cursor-pointer"
          placeholderText="Adicione uma Imagem"
        />
      </div>

      {/* Bloco Central Branco/Creme */}
      <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] bg-[#fffcf5] flex flex-col items-center justify-center px-4 py-10 shadow-2xl z-10 pointer-events-none rounded-[15px]">
        
        {/* Títulos em Cursive */}
        <div className="flex flex-col items-center mb-8 w-full text-[#5a3825] pointer-events-auto">
          <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="w-full flex flex-col items-center">
            <h1 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', `${e.currentTarget.innerText}\n${holidayTitle2}`)} className="font-lobster text-[56px] leading-[0.7] tracking-normal drop-shadow-sm transform -rotate-2 outline-none whitespace-nowrap" style={{ fontSize: `${56 * sTitle}px`, fontFamily: 'Lobster, cursive' }}>
              {holidayTitle1}
            </h1>
            <h1 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', `${holidayTitle1}\n${e.currentTarget.innerText}`)} className="font-lobster text-[64px] leading-[0.8] tracking-normal drop-shadow-sm transform -rotate-2 ml-4 mt-2 outline-none whitespace-nowrap" style={{ fontSize: `${64 * sTitle}px`, fontFamily: 'Lobster, cursive' }}>
              {holidayTitle2}
            </h1>
          </SmartElement>
        </div>

        {/* Subtítulo Sans-Serif */}
        <div className="pointer-events-auto">
          <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement}>
            <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit font-bold text-[14px] tracking-wide text-black text-center px-2 outline-none" style={{ fontSize: `${14 * sText}px` }}>
              {data.texto_apoio || "UP TO 50% OFF on EVERYTHING!"}
            </p>
          </SmartElement>
        </div>

      </div>

    </div>
  );
}

// ==========================================
// CTA 177: CROISSANT OFFER
// Design terracota com topo creme xadrez e grade de 3 croissants circulares com filtros.
// ==========================================
export function CTAVariant177(props) {
  const { data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  const croissantStraw = "https://images.unsplash.com/photo-1623341214825-9f4f963727da?q=80&w=400&auto=format&fit=crop";
  const croissantPlain = "https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?q=80&w=400&auto=format&fit=crop";
  const croissantBlue = "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=400&auto=format&fit=crop";

  return (
    <div className="relative w-full h-full flex flex-col font-outfit select-none overflow-hidden bg-[#923c1d] rounded-[2rem] shadow-2xl border border-white/10">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Lobster&family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Alfa+Slab+One&family=Charmonman:wght@700&display=swap');
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-display { font-family: 'Alfa Slab One', cursive; }
        .font-hand { font-family: 'Charmonman', cursive; }
        .font-lobster { font-family: 'Lobster', cursive; }
      `}} />

      {/* Top Half (Off-white with diagonal grid pattern) */}
      <div className="absolute top-0 left-0 w-full h-[55%] bg-[#f4f2ef] z-0 pointer-events-none" 
           style={{ 
             backgroundImage: `linear-gradient(45deg, #e5e0d8 25%, transparent 25%, transparent 75%, #e5e0d8 75%, #e5e0d8), linear-gradient(45deg, #e5e0d8 25%, transparent 25%, transparent 75%, #e5e0d8 75%, #e5e0d8)`,
             backgroundSize: `40px 40px`,
             backgroundPosition: `0 0, 20px 20px`,
             opacity: 0.6
           }}
      />

      {/* Top Typography Content */}
      <div className="relative z-10 flex flex-col items-center pt-10 px-4 text-center pointer-events-none">
        <SmartElement slideIndex={index} field="badge_text" position={pos('badge_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'badge_text'} onSelectElement={onSelectElement} className="pointer-events-auto">
          <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)} className="font-display text-[#e29b49] text-[18px] tracking-tight mb-[-5px] outline-none" style={{ fontFamily: 'Alfa Slab One, cursive' }}>
            {data.badge_text || "SPECIAL OFFER"}
          </span>
        </SmartElement>
        
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="pointer-events-auto">
          <h1 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-display text-[#923c1d] text-[65px] leading-[0.85] tracking-tighter outline-none" style={{ fontSize: `${65 * sTitle}px`, fontFamily: 'Alfa Slab One, cursive' }}>
            {data.titulo || "TODAY!"}
          </h1>
        </SmartElement>

        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="pointer-events-auto">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-[#923c1d] text-[13px] font-medium leading-[1.2] mt-4 whitespace-pre-line tracking-tight outline-none" style={{ fontSize: `${13 * sText}px` }}>
            {data.texto_apoio || "Warm croissant straight from the oven\nFlaky, golden, and buttery perfection"}
          </p>
        </SmartElement>
      </div>

      {/* Wavy Divider separating top and bottom */}
      <div className="absolute top-[48%] left-0 w-full z-20 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-8 text-[#923c1d] fill-current">
           <path d="M0,60 C150,120 300,0 450,60 C600,120 750,0 900,60 C1050,120 1200,0 1200,60 L1200,120 L0,120 Z" />
        </svg>
      </div>

      {/* Bottom Half (Terracotta) */}
      <div className="relative z-30 flex-1 flex flex-col justify-end pb-8 pointer-events-none">
        
        {/* Croissants Grid */}
        <div className="flex justify-between items-start w-full px-5 mb-8 pointer-events-auto">
          
          {/* Item 1 */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-[85%] aspect-square rounded-full overflow-hidden flex items-center justify-center mb-3">
               <img src={croissantStraw} className="w-[120%] h-[120%] object-cover object-center drop-shadow-[0_10px_10px_rgba(0,0,0,0.4)] mix-blend-luminosity" style={{ filter: 'sepia(1) hue-rotate(15deg) saturate(3)' }} alt="Strawberry Croissant" />
            </div>
            <SmartElement slideIndex={index} field="studio_text" position={pos('studio_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'studio_text'} onSelectElement={onSelectElement}>
              <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'studio_text', e.currentTarget.innerText)} className="text-[#f4f2ef] font-outfit font-light text-[10px] text-center px-1 whitespace-pre-line leading-tight outline-none block">
                {data.studio_text || "Strawberry Cream"}
              </span>
            </SmartElement>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-[85%] aspect-square rounded-full overflow-hidden flex items-center justify-center mb-3">
               <ImageBg 
                 data={data}
                 slideIndex={index}
                 imageUrl={data.imageUrl || croissantPlain}
                 imagePosition={data.imagePosition}
                 showMetrics={showMetrics}
                 onActionStart={onActionStart}
                 isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'}
                 onSelectElement={onSelectElement}
                 className="w-full h-full bg-cover drop-shadow-[0_10px_10px_rgba(0,0,0,0.4)] mix-blend-luminosity cursor-pointer"
                 style={{ filter: 'sepia(1) hue-rotate(15deg) saturate(3)' }}
                 placeholderText="Sesame"
               />
            </div>
            <SmartElement slideIndex={index} field="insta_ready" position={pos('insta_ready')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'insta_ready'} onSelectElement={onSelectElement}>
              <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'insta_ready', e.currentTarget.innerText)} className="text-[#f4f2ef] font-outfit font-light text-[10px] text-center px-1 whitespace-pre-line leading-tight outline-none block">
                {data.insta_ready || "Sesame"}
              </span>
            </SmartElement>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-[85%] aspect-square rounded-full overflow-hidden flex items-center justify-center mb-3">
               <img src={croissantBlue} className="w-[120%] h-[120%] object-cover object-center drop-shadow-[0_10px_10px_rgba(0,0,0,0.4)] mix-blend-luminosity" style={{ filter: 'sepia(1) hue-rotate(15deg) saturate(3)' }} alt="Blueberry Croissant" />
            </div>
            <SmartElement slideIndex={index} field="slide_call" position={pos('slide_call')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'slide_call'} onSelectElement={onSelectElement}>
              <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'slide_call', e.currentTarget.innerText)} className="text-[#f4f2ef] font-outfit font-light text-[10px] text-center px-1 whitespace-pre-line leading-tight outline-none block">
                {data.slide_call || "Blueberry Cream"}
              </span>
            </SmartElement>
          </div>

        </div>

        {/* Button */}
        <div className="flex justify-center w-full pointer-events-auto">
          <SmartElement slideIndex={index} field="cta_text" position={pos('cta_text')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'cta_text'} onSelectElement={onSelectElement}>
            <button contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)} className="border-2 border-[#e29b49] text-[#e29b49] font-display text-[12px] px-8 py-2.5 rounded-full hover:bg-[#e29b49] hover:text-[#923c1d] transition-colors shadow-sm tracking-wide outline-none" style={{ fontFamily: 'Alfa Slab One, cursive' }}>
              {data.cta_text || "ORDER NOW"}
            </button>
          </SmartElement>
        </div>

      </div>

    </div>
  );
}


  export const CTA_EXTRA_VARIANT_COMPONENTS = {  101: CTAVariant101,
  102: CTAVariant102,
  104: CTAVariant104,
  109: CTAVariant109,
  110: CTAVariant110,
  111: CTAVariant111,
  113: CTAVariant113,
  114: CTAVariant114,
  117: CTAVariant117,
  118: CTAVariant118,
  120: CTAVariant120,
  122: CTAVariant122,
  124: CTAVariant124,
  126: CTAVariant126,
  127: CTAVariant127,
  128: CTAVariant128,
  129: CTAVariant129,
  130: CTAVariant130,
  131: CTAVariant131,
  132: CTAVariant132,
  133: CTAVariant133,
  136: CTAVariant136,
  139: CTAVariant139,
  140: CTAVariant140,
  141: CTAVariant141,
  142: CTAVariant142,
  143: CTAVariant143,
  144: CTAVariant144,
  145: CTAVariant145,
  146: CTAVariant146,
  151: CTAVariant151,
  153: CTAVariant153,
  155: CTAVariant155,
  156: CTAVariant156,
  158: CTAVariant158,
  160: CTAVariant160,
  162: CTAVariant162,
  165: CTAVariant165,
  166: CTAVariant166,
  167: CTAVariant167,
  168: CTAVariant168,
  169: CTAVariant169,
  170: CTAVariant170,
  171: CTAVariant171,
  172: CTAVariant172,
  173: CTAVariant173,
  174: CTAVariant174,
  175: CTAVariant175,
  176: CTAVariant176,
  177: CTAVariant177,
};
