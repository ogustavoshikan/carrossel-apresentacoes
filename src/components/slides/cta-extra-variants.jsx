import React from 'react';
import { Bookmark, Send, Heart, MessageCircle, CheckCircle2, Instagram, Link2, Sparkles, Share2, ArrowRight, Check, Star, Quote, ChevronRight, CornerRightDown } from 'lucide-react';
import SmartElement from '../smart-element';
import { ImageBg } from './cta-variants';

export const CTA_EXTRA_VARIANT_META = [
  {
    id: 101,
    name: 'The Dark Luxury',
    description: 'Foco absoluto em salvar o post. Ícone gigante, fundo escuro.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/wireframe_menu_CTA.png' // Add proper thumbnail later
  },
  {
    id: 102,
    name: 'The Editorial Index',
    description: 'Limpo, claro, estruturado como o índice de uma revista de luxo.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/wireframe_menu_CTA.png'
  },
  {
    id: 103,
    name: 'The Action Receipt',
    description: 'Estética muito em alta. Engaja visualmente e cria senso de urgência/exclusividade.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/wireframe_menu_CTA.png'
  },
  {
    id: 104,
    name: 'The Cinematic Glass',
    description: 'Altamente visual. Usa a foto do produto por trás de um bloco desfocado.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/wireframe_menu_CTA.png'
  },
  {
    id: 105,
    name: 'The Velvet Gradient',
    description: 'Profundo, sem linhas duras, puramente baseado em cor e luz.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/wireframe_menu_CTA.png'
  },
  {
    id: 106,
    name: 'The Pure Glass',
    description: 'Imagem de fundo total, com um desfoque massivo no centro. Zero linhas visíveis.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/wireframe_menu_CTA.png'
  },
  {
    id: 107,
    name: 'The Minimalist Path',
    description: 'Fundo off-white, sem margens, sem caixas. Apenas hierarquia tipográfica.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/wireframe_menu_CTA.png'
  },
  {
    id: 108,
    name: 'The Eclipse',
    description: 'Foco total no vazio. Um círculo iluminado que atrai o olhar.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/wireframe_menu_CTA.png'
  },
  {
    id: 109,
    name: 'The Solid Contrast',
    description: 'Zero efeitos. Fundo preto puro, tipografia branca impecável.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/wireframe_menu_CTA.png'
  },
  {
    id: 110,
    name: 'The Clean Magazine',
    description: 'Flat design absoluto. Foto de um lado, bloco sólido do outro. Sem sombras.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/wireframe_menu_CTA.png'
  },
  {
    id: 111,
    name: 'The Flat Crimson',
    description: 'Um bloco de cor maciço. Nada de blurs, sombras ou texturas.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/wireframe_menu_CTA.png'
  },
  {
    id: 112,
    name: 'The Absolute Void',
    description: 'Muito espaço em branco, tipografia limpa, hierarquia pura.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/wireframe_menu_CTA.png'
  },
  {
    id: 113,
    name: 'The Swiss Split',
    description: 'Metade cor sólida, metade off-white. Contraste absoluto.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/wireframe_menu_CTA.png'
  },
  {
    id: 114,
    name: 'The Pure Typography',
    description: 'Apenas texto. Layout focado em opções de ação limpas.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/wireframe_menu_CTA.png'
  },
  {
    id: 115,
    name: 'The Dictionary Entry',
    description: 'Estética clínica e purista. Como um verbete de dicionário.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/wireframe_menu_CTA.png'
  },
  {
    id: 116,
    name: 'The Strict Grid',
    description: 'Informação organizada em linhas finas absolutas.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/wireframe_menu_CTA.png'
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
      
      <div className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center mb-8 border pointer-events-none transition-colors duration-500" style={{ backgroundColor: `${brandColor}1a`, borderColor: `${brandColor}33`, boxShadow: `0 0 40px ${brandColor}33` }}>
        <Bookmark className="w-8 h-8 transition-colors" strokeWidth={1.5} style={{ color: brandColor }} />
      </div>

      <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="mb-6 relative z-10 w-full">
        <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-normal text-white leading-[0.9] outline-none whitespace-pre-line" style={{ fontSize: `${76 * sTitle}px`, fontFamily: titleFont }}>
          {data.titulo}
        </h2>
      </SmartElement>

      <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="mb-12 relative z-10 max-w-[80%]">
        <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-white/50 uppercase tracking-widest leading-relaxed outline-none whitespace-pre-line" style={{ fontSize: `${17 * sText}px`, fontFamily: textFont }}>
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
        <span className="font-outfit font-black text-[#1a1a1a] text-[10px] tracking-[0.3em] uppercase">Fim de Leitura</span>
        <CheckCircle2 className="w-4 h-4" style={{ color: brandColor }} />
      </div>

      <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="mb-8 w-full">
        <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-black text-[#1a1a1a] leading-none tracking-tighter outline-none whitespace-pre-line" style={{ fontSize: `${73 * sTitle}px`, fontFamily: titleFont }}>
          {data.titulo}
        </h2>
      </SmartElement>

      <div className="flex flex-col gap-6 flex-1 pointer-events-none">
        <div className="flex items-start gap-4">
          <div className="mt-1 w-6 h-6 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center">
            <Bookmark className="w-3 h-3 text-[#1a1a1a]" />
          </div>
          <div>
            <h3 className="font-outfit font-bold text-[#1a1a1a] text-sm uppercase tracking-widest mb-1">Guardar</h3>
            <p className="font-playfair text-zinc-600 text-sm">Salve a coleção no seu arquivo.</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="mt-1 w-6 h-6 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center">
            <Send className="w-3 h-3 text-[#1a1a1a]" />
          </div>
          <div>
            <h3 className="font-outfit font-bold text-[#1a1a1a] text-sm uppercase tracking-widest mb-1">Partilhar</h3>
            <p className="font-playfair text-zinc-600 text-sm">Envie a quem lhe deve este post.</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="mt-1 w-6 h-6 rounded-full border flex items-center justify-center" style={{ backgroundColor: brandColor, borderColor: brandColor }}>
            <Link2 className="w-3 h-3 text-white" />
          </div>
          <div>
            <SmartElement slideIndex={index} field="tag" position={pos('tag')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'tag'} onSelectElement={onSelectElement} className="mb-1 pointer-events-auto">
              <h3 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)} className="font-outfit font-bold text-[#1a1a1a] text-sm uppercase tracking-widest outline-none" style={{ fontFamily: tagFont }}>{data.tag || 'Encomendar'}</h3>
            </SmartElement>
            <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="pointer-events-auto">
              <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-playfair text-zinc-600 outline-none" style={{ fontSize: `${14 * sText}px`, fontFamily: textFont }}>{data.texto_apoio}</p>
            </SmartElement>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-[#1a1a1a]/10 flex justify-between items-center pointer-events-none">
        <span className="font-outfit text-zinc-400 text-[10px] uppercase tracking-widest font-bold">@{brandHandle}</span>
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
              <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-outfit font-black text-[#1a1a1a] tracking-[0.2em] uppercase outline-none" style={{ fontSize: `${20 * sTitle}px`, fontFamily: titleFont }}>
                {data.titulo || 'RECIBO DE VALOR'}
              </h2>
            </SmartElement>
            <p className="font-outfit text-zinc-400 text-[9px] uppercase tracking-widest">
              ID: {Math.floor(Math.random() * 90000) + 10000} • {brandHandle}
            </p>
          </div>

          <div className="flex-1 flex flex-col gap-4 border-y-2 border-dashed border-zinc-200 py-6 mb-6 pointer-events-none">
            <div className="flex justify-between items-center font-outfit text-[10px] text-zinc-400 uppercase tracking-widest mb-2">
              <span>Ação</span>
              <span>Status</span>
            </div>
            
            <div className="flex justify-between items-end">
              <span className="font-playfair font-bold text-[#1a1a1a] text-lg">Deixar o Like</span>
              <span className="font-outfit font-bold text-[10px] uppercase tracking-widest" style={{ color: brandColor }}>Pendente</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="font-playfair font-bold text-[#1a1a1a] text-lg">Salvar Post</span>
              <span className="font-outfit font-bold text-[10px] uppercase tracking-widest" style={{ color: brandColor }}>Recomendado</span>
            </div>
            <div className="flex justify-between items-end">
              <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="pointer-events-auto">
                <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-playfair font-bold text-[#1a1a1a] outline-none" style={{ fontSize: `${18 * sText}px`, fontFamily: textFont }}>{data.texto_apoio || 'Enviar a um Amigo'}</span>
              </SmartElement>
              <SmartElement slideIndex={index} field="tag" position={pos('tag')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'tag'} onSelectElement={onSelectElement} className="pointer-events-auto">
                <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)} className="font-outfit font-bold text-[10px] uppercase tracking-widest outline-none" style={{ color: brandColor, fontFamily: tagFont }}>{data.tag || 'Obrigatório'}</span>
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
            <p className="font-outfit font-bold text-[#1a1a1a] text-[8px] uppercase tracking-[0.3em]">
              OBRIGADO PELA ATENÇÃO
            </p>
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
        <span className="font-outfit font-black text-white/80 text-[10px] tracking-[0.3em] uppercase drop-shadow-md">
          {brandHandle}
        </span>
      </div>

      <div className="relative z-10 w-[85%] bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-8 flex flex-col items-center text-center shadow-2xl">
        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6 pointer-events-none">
          <Bookmark className="w-5 h-5 text-white" fill="currentColor" />
        </div>

        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="mb-4 w-full relative z-10">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair italic font-medium text-white outline-none whitespace-pre-line" style={{ fontSize: `${45 * sTitle}px`, fontFamily: titleFont }}>
            {data.titulo}
          </h2>
        </SmartElement>
        
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="mb-8 w-full relative z-10">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-white/70 uppercase tracking-[0.2em] leading-relaxed outline-none" style={{ fontSize: `${14 * sText}px`, fontFamily: textFont }}>
            {data.texto_apoio}
          </p>
        </SmartElement>

        <div className="w-full flex items-center justify-center gap-6 border-t border-white/10 pt-6 pointer-events-none">
          <div className="flex flex-col items-center gap-2">
             <Heart className="w-5 h-5 text-white" />
             <span className="font-outfit text-[8px] text-white uppercase tracking-widest">Curte</span>
          </div>
          <div className="flex flex-col items-center gap-2">
             <MessageCircle className="w-5 h-5 text-white" />
             <span className="font-outfit text-[8px] text-white uppercase tracking-widest">Comente</span>
          </div>
          <div className="flex flex-col items-center gap-2">
             <Send className="w-5 h-5 text-white" />
             <span className="font-outfit text-[8px] text-white uppercase tracking-widest">Compartilhe</span>
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
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-normal text-white leading-[1.1] outline-none whitespace-pre-line" style={{ fontSize: `${51 * sTitle}px`, fontFamily: titleFont }}>
            {data.titulo}
          </h2>
        </SmartElement>

        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="mb-12 relative z-10 max-w-[80%]">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-white/50 uppercase tracking-[0.3em] leading-relaxed outline-none whitespace-pre-line" style={{ fontSize: `${10 * sText}px`, fontFamily: textFont }}>
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
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-normal text-white leading-tight outline-none whitespace-pre-line" style={{ fontSize: `${64 * sTitle}px`, fontFamily: titleFont }}>
            {data.titulo}
          </h2>
        </SmartElement>

        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="mb-8 w-full relative z-20">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-white/70 uppercase tracking-widest outline-none whitespace-pre-line" style={{ fontSize: `${14 * sText}px`, fontFamily: textFont }}>
            {data.texto_apoio}
          </p>
        </SmartElement>

        <div className="flex flex-col gap-5 w-full max-w-[200px] pointer-events-none">
          <div className="flex items-center justify-between w-full">
            <span className="font-outfit text-white/90 text-sm uppercase tracking-widest">Salvar</span>
            <Bookmark className="w-6 h-6 text-white" strokeWidth={1.5} />
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="font-outfit text-white/50 text-sm uppercase tracking-widest">Partilhar</span>
            <Send className="w-6 h-6 text-white/50" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {showBrandHandle && brandHandle && (
        <div className="absolute top-8 w-full text-center z-20 pointer-events-none">
          <span className="font-outfit text-white/50 text-[10px] uppercase tracking-[0.4em]">@{brandHandle}</span>
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
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair italic font-medium text-[#1a1a1a] leading-none outline-none whitespace-pre-line" style={{ fontSize: `${64 * sTitle}px`, fontFamily: titleFont }}>
            {data.titulo}
          </h2>
        </SmartElement>
        
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="w-full">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-zinc-400 uppercase tracking-[0.3em] outline-none whitespace-pre-line" style={{ fontSize: `${14 * sText}px`, fontFamily: textFont }}>
            {data.texto_apoio}
          </p>
        </SmartElement>
      </div>

      <div className="flex flex-col gap-8 w-full pl-4 mb-4 relative z-10 pointer-events-none">
        <div className="flex items-start gap-6">
          <span className="font-playfair italic text-5xl leading-none opacity-50" style={{ color: brandColor }}>1</span>
          <div className="pt-2">
            <h3 className="font-outfit font-bold text-[#1a1a1a] text-lg uppercase tracking-widest mb-1">Arquivar</h3>
            <p className="font-playfair text-zinc-500 text-sm">Salve no seu dispositivo.</p>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <span className="font-playfair italic text-5xl leading-none opacity-50" style={{ color: brandColor }}>2</span>
          <div className="pt-2">
            <h3 className="font-outfit font-bold text-[#1a1a1a] text-lg uppercase tracking-widest mb-1">Distribuir</h3>
            <p className="font-playfair text-zinc-500 text-sm">Envie a um apreciador.</p>
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
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-normal text-[#EBE9E1] leading-none outline-none whitespace-pre-line" style={{ fontSize: `${48 * sTitle}px`, fontFamily: titleFont }}>
            {data.titulo}
          </h2>
        </SmartElement>
        
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="mb-10 relative z-10 text-center w-full">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-zinc-500 uppercase tracking-[0.4em] outline-none whitespace-pre-line" style={{ fontSize: `${12 * sText}px`, fontFamily: textFont }}>
            {data.texto_apoio}
          </p>
        </SmartElement>

        <div className="flex gap-4 items-center pointer-events-none relative z-10">
          <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md">
            <Bookmark className="w-5 h-5 text-white" fill="currentColor" />
            <span className="font-outfit font-bold text-white text-[12px] uppercase tracking-widest">Salvar</span>
          </div>
          <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center backdrop-blur-md">
            <Send className="w-5 h-5 text-white" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-10 opacity-40 pointer-events-none">
        <span className="font-outfit text-white text-[10px] uppercase tracking-widest">Final</span>
        {showBrandHandle && brandHandle && (
          <span className="font-outfit text-white text-[10px] uppercase tracking-widest">@{brandHandle}</span>
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
        <span className="font-outfit font-medium text-white/50 text-[10px] tracking-[0.3em] uppercase">
          Encerramento
        </span>
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: brandColor }} />
      </div>

      <div className="flex flex-col">
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="mb-6 w-full">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-normal text-white leading-[1.1] tracking-tight outline-none whitespace-pre-line" style={{ fontSize: `${72 * sTitle}px`, fontFamily: titleFont }}>
            {data.titulo}
          </h2>
        </SmartElement>
        
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="w-full max-w-[80%]">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-white/60 leading-relaxed font-light outline-none whitespace-pre-line" style={{ fontSize: `${16 * sText}px`, fontFamily: textFont }}>
            {data.texto_apoio}
          </p>
        </SmartElement>
      </div>

      <div className="flex flex-col gap-4 mt-8 pointer-events-none">
        <div className="flex items-center justify-between border-b border-white/20 pb-4">
          <span className="font-outfit text-white text-xs uppercase tracking-widest">Salvar Coleção</span>
          <Bookmark className="w-5 h-5 text-white" strokeWidth={1.5} />
        </div>
        <div className="flex items-center justify-between pb-2">
          <span className="font-outfit text-white/50 text-xs uppercase tracking-widest">Enviar Recomendação</span>
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
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair italic font-medium text-[#1a1a1a] leading-none outline-none whitespace-pre-line" style={{ fontSize: `${56 * sTitle}px`, fontFamily: titleFont }}>
              {data.titulo}
            </h2>
          </SmartElement>
          <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="w-full">
            <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-zinc-500 uppercase tracking-[0.2em] font-medium outline-none whitespace-pre-line" style={{ fontSize: `${14 * sText}px`, fontFamily: textFont }}>
              {data.texto_apoio}
            </p>
          </SmartElement>
        </div>

        <div className="w-full flex items-center justify-between text-white p-4 pointer-events-none" style={{ backgroundColor: brandColor }}>
          <span className="font-outfit font-bold text-[12px] uppercase tracking-widest">
            Guardar no Arquivo
          </span>
          <Bookmark className="w-5 h-5 text-white" strokeWidth={1.5} />
        </div>
        
        <div className="w-full flex justify-between items-end mt-6 pointer-events-none">
          <span className="font-outfit text-zinc-400 text-[10px] uppercase tracking-widest font-bold">
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
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-normal text-white leading-[1.1] outline-none whitespace-pre-line" style={{ fontSize: `${72 * sTitle}px`, fontFamily: titleFont }}>
            {data.titulo}
          </h2>
        </SmartElement>
        
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="mb-10 max-w-[80%]">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-white/80 uppercase tracking-[0.2em] leading-relaxed outline-none whitespace-pre-line" style={{ fontSize: `${16 * sText}px`, fontFamily: textFont }}>
            {data.texto_apoio}
          </p>
        </SmartElement>

        <div className="bg-white flex items-center gap-3 px-6 py-3 pointer-events-none" style={{ color: brandColor }}>
          <Bookmark className="w-5 h-5" fill="currentColor" />
          <span className="font-outfit font-bold text-[12px] uppercase tracking-widest">Salvar Post</span>
        </div>

      </div>

      <div className="w-full flex justify-between items-center opacity-70 pointer-events-none">
        <span className="font-outfit text-white text-[10px] tracking-[0.3em] uppercase">Fim</span>
        {showBrandHandle && brandHandle && (
          <span className="font-outfit text-white text-[10px] tracking-[0.3em] uppercase">@{brandHandle}</span>
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
        <span className="font-outfit font-bold text-zinc-300 text-[10px] uppercase tracking-[0.4em]">
          Concluído
        </span>
      </div>

      <div className="flex flex-col">
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="mb-6 w-full">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-normal text-[#1a1a1a] leading-none outline-none whitespace-pre-line" style={{ fontSize: `${80 * sTitle}px`, fontFamily: titleFont }}>
            {data.titulo}
          </h2>
        </SmartElement>

        <ul className="flex flex-col gap-6 mb-12 pointer-events-none">
          <li className="flex items-center gap-4 font-outfit text-[#1a1a1a] uppercase tracking-widest">
            <Bookmark className="w-5 h-5 text-zinc-300" strokeWidth={1.5} />
            <span style={{ fontSize: `${16 * sText}px`, fontFamily: textFont }}>Guardar na Coleção</span>
          </li>
          <li className="flex items-center gap-4 font-outfit text-[#1a1a1a] uppercase tracking-widest">
            <Send className="w-5 h-5 text-zinc-300" strokeWidth={1.5} />
            <span style={{ fontSize: `${16 * sText}px`, fontFamily: textFont }}>Enviar para uma Amiga</span>
          </li>
        </ul>
        
        <div className="flex items-center gap-3 pointer-events-none">
          <div className="w-12 h-12 border border-[#1a1a1a] flex items-center justify-center">
            <ArrowRight className="w-5 h-5 text-[#1a1a1a]" />
          </div>
          <span className="font-outfit text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-medium">Fazer meu Pedido</span>
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
          <span className="font-outfit font-black text-white/80 text-[10px] tracking-[0.3em] uppercase">
            Ação
          </span>
          <div className="w-1.5 h-1.5 bg-white rounded-none" />
        </div>
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement} className="w-full pointer-events-auto">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-normal text-white leading-[0.85] tracking-tight outline-none whitespace-pre-line" style={{ fontSize: `${72 * sTitle}px`, fontFamily: titleFont }}>
            {data.titulo}
          </h2>
        </SmartElement>
      </div>

      <div className="w-full h-[50%] p-8 flex flex-col justify-between">
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="w-full max-w-[80%]">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-zinc-600 leading-relaxed font-medium outline-none whitespace-pre-line" style={{ fontSize: `${12 * sText}px`, fontFamily: textFont }}>
            {data.texto_apoio}
          </p>
        </SmartElement>

        <div className="mt-auto flex flex-col gap-1 pointer-events-none">
          <div className="w-full flex items-center justify-between py-4 border-b border-zinc-200">
            <span className="font-outfit font-bold text-[#1a1a1a] text-[11px] uppercase tracking-widest">Salvar Referência</span>
            <Bookmark className="w-4 h-4 text-[#1a1a1a]" strokeWidth={2} />
          </div>
          <div className="w-full flex items-center justify-between py-4">
            <span className="font-outfit font-bold text-zinc-400 text-[11px] uppercase tracking-widest">Partilhar</span>
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
        <h2 className="font-playfair font-normal text-[#EBE9E1] leading-[0.9] tracking-tighter mb-12 pointer-events-auto outline-none" style={{ fontSize: `${64 * sTitle}px`, fontFamily: titleFont }}>
          <span className="opacity-40 flex items-center gap-4 mb-2">
            Curtir <Star className="w-6 h-6" strokeWidth={1.5} />
          </span>
          <span className="opacity-40 flex items-center gap-4 mb-2">
            Enviar <Send className="w-6 h-6" strokeWidth={1.5} />
          </span>
          <span className="flex items-center gap-4" style={{ color: brandColor }}>
            Salvar <Bookmark className="w-6 h-6" fill="currentColor" />
          </span>
        </h2>
        
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="w-full pointer-events-auto">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-white/50 uppercase tracking-[0.3em] font-medium outline-none whitespace-pre-line" style={{ fontSize: `${10 * sText}px`, fontFamily: textFont }}>
            {data.texto_apoio}
          </p>
        </SmartElement>
      </div>

      <div className="w-full flex justify-between items-end border-t border-white/20 pt-6 pointer-events-none">
        {showBrandHandle && brandHandle ? (
          <span className="font-outfit text-white/40 text-[9px] tracking-widest uppercase font-bold">@{brandHandle}</span>
        ) : (
          <span className="font-outfit text-white/40 text-[9px] tracking-widest uppercase font-bold"></span>
        )}
        <span className="font-outfit text-white/40 text-[9px] tracking-widest uppercase font-bold">Fim</span>
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
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-black text-[#1a1a1a] outline-none whitespace-pre-line" style={{ fontSize: `${36 * sTitle}px`, fontFamily: titleFont }}>
              {data.titulo}
            </h2>
          </SmartElement>
          <span className="font-outfit text-zinc-400 text-sm italic">subst. f.</span>
        </div>
        <p className="font-outfit text-zinc-500 text-xs tracking-widest">/re.fe.rên.ci.a/</p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex items-start gap-4">
          <span className="font-outfit font-bold text-sm" style={{ color: brandColor }}>1.</span>
          <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="w-full">
            <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-playfair text-[#1a1a1a] leading-snug outline-none whitespace-pre-line" style={{ fontSize: `${18 * sText}px`, fontFamily: textFont }}>
              {data.texto_apoio}
            </p>
          </SmartElement>
        </div>
        <div className="flex items-start gap-4 pointer-events-none">
          <span className="font-outfit font-bold text-sm" style={{ color: brandColor }}>2.</span>
          <p className="font-playfair text-[#1a1a1a] leading-snug" style={{ fontSize: `${18 * sText}px`, fontFamily: textFont }}>
            O ato de <span className="font-bold border-b-2 border-[#1a1a1a] pb-0.5">salvar este post</span> para não perder o contacto com o verdadeiro luxo.
          </p>
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
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-playfair font-normal text-[#1a1a1a] leading-none outline-none whitespace-pre-line" style={{ fontSize: `${48 * sTitle}px`, fontFamily: titleFont }}>
            {data.titulo}
          </h2>
        </SmartElement>
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'} onSelectElement={onSelectElement} className="w-full">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-outfit text-zinc-500 uppercase tracking-[0.2em] font-bold outline-none whitespace-pre-line" style={{ fontSize: `${10 * sText}px`, fontFamily: textFont }}>
            {data.texto_apoio}
          </p>
        </SmartElement>
      </div>

      <div className="flex flex-col w-full pointer-events-none">
        
        <div className="w-full flex items-center justify-between border-t border-[#1a1a1a]/20 py-5">
          <div className="flex items-center gap-4">
            <span className="font-outfit text-zinc-400 text-xs">01</span>
            <span className="font-outfit font-bold text-[#1a1a1a] text-[11px] uppercase tracking-widest">Guardar Post</span>
          </div>
          <Bookmark className="w-4 h-4 text-[#1a1a1a]" strokeWidth={1.5} />
        </div>

        <div className="w-full flex items-center justify-between border-t border-[#1a1a1a]/20 py-5">
          <div className="flex items-center gap-4">
            <span className="font-outfit text-zinc-400 text-xs">02</span>
            <span className="font-outfit font-bold text-[#1a1a1a] text-[11px] uppercase tracking-widest">Partilhar</span>
          </div>
          <Send className="w-4 h-4 text-[#1a1a1a]" strokeWidth={1.5} />
        </div>

        <div className="w-full flex items-center justify-between border-t border-b border-[#1a1a1a]/20 py-5">
          <div className="flex items-center gap-4">
            <span className="font-outfit text-zinc-400 text-xs">03</span>
            <span className="font-outfit font-bold text-[#1a1a1a] text-[11px] uppercase tracking-widest">Aceder ao Menu</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#1a1a1a]" strokeWidth={1.5} />
        </div>

      </div>

      <div className="mt-auto flex justify-center pointer-events-none">
        <span className="font-outfit text-zinc-400 text-[8px] uppercase tracking-[0.4em]">
          {website || "MEUSITE.COM.BR"}
        </span>
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
};
