import React from 'react';
import { Zap, Heart, Bookmark, Share2 } from 'lucide-react';
import SmartElement from '../smart-element';
import { CTA_VARIANT_COMPONENTS, ImageBg } from './cta-variants';

/**
 * SlideCTA — Layout "cta" (sempre o último slide).
 * Ícone Zap + título + texto + botão + social icons.
 */
export default function SlideCTA(props) {
  const {
    data,
    index,
    brandColor,
    titleScale,
    textScale,
    showMetrics,
    onActionStart,
    onTextChange,
    selectedElement,
    onSelectElement,
  } = props;

  // Se houver uma variante selecionada (> 0), usa o componente correspondente
  const ctaVariantIndex = data.ctaVariantIndex || 0;
  if (ctaVariantIndex > 0 && CTA_VARIANT_COMPONENTS[ctaVariantIndex]) {
    const VariantComponent = CTA_VARIANT_COMPONENTS[ctaVariantIndex];
    return <VariantComponent {...props} />;
  }

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div
      className="w-full h-full flex flex-col p-16 items-center justify-center text-center text-white relative overflow-hidden"
      style={{ backgroundColor: brandColor }}
    >
      {/* Background Image Setup */}
      <div className="absolute inset-0 opacity-40 blur-md scale-110 pointer-events-none">
        <ImageBg
          data={data}
          slideIndex={index}
          imageUrl={data.imageUrl}
          imagePosition={data.imagePosition}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'}
          onSelectElement={onSelectElement}
          className="w-full h-full"
        />
      </div>

      {/* Decorative line */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[140%] rotate-12 border-[1px] border-white/40" />
      </div>

      {/* Icon */}
      <div className="w-20 h-20 bg-black rounded-slide-sm flex items-center justify-center mb-10 rotate-6 shadow-2xl relative z-10 pointer-events-none">
        <Zap className="w-10 h-10" style={{ color: brandColor }} fill="currentColor" />
      </div>

      <SmartElement
        slideIndex={index}
        field="titulo"
        position={pos('titulo')}
        showMetrics={showMetrics}
        onActionStart={onActionStart}
        isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
        onSelectElement={onSelectElement}
        className="mb-6 relative z-10 w-full"
      >
        <h2
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
          className="font-outfit font-black text-white leading-[0.95] tracking-tighter outline-none"
          style={{ fontSize: `${36 * sTitle}px` }}
        >
          {data.titulo}
        </h2>
      </SmartElement>

      <SmartElement
        slideIndex={index}
        field="texto_apoio"
        position={pos('texto_apoio')}
        showMetrics={showMetrics}
        onActionStart={onActionStart}
        isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
        onSelectElement={onSelectElement}
        className="mb-12 relative z-10"
      >
        <p
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
          className="font-playfair text-white/90 leading-relaxed max-w-[340px] italic outline-none block"
          style={{ fontSize: `${20 * sText}px` }}
        >
          {data.texto_apoio}
        </p>
      </SmartElement>

      <SmartElement
        slideIndex={index}
        field="tag"
        position={pos('tag')}
        showMetrics={showMetrics}
        onActionStart={onActionStart}
        isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'tag'}
        onSelectElement={onSelectElement}
        className="w-full max-w-[300px] relative z-10"
      >
        <button
          className="w-full py-6 bg-white font-outfit font-black text-[12px] uppercase tracking-[0.4em] rounded-2xl shadow-2xl hover:bg-black hover:text-white transition-all duration-500 pointer-events-none"
          style={{ color: brandColor }}
        >
          {data.tag || 'CLIQUE AQUI'}
        </button>
      </SmartElement>

      {/* Social icons */}
      <div className="mt-16 flex gap-10 items-center text-white/50 relative z-10 pointer-events-none">
        <div className="flex flex-col items-center gap-2 group transition-all hover:scale-110">
          <Heart className="w-5 h-5" />
          <span className="text-[8px] font-black tracking-widest uppercase">Love</span>
        </div>
        <div className="flex flex-col items-center gap-2 group transition-all hover:scale-110">
          <Bookmark className="w-5 h-5" />
          <span className="text-[8px] font-black tracking-widest uppercase">Save</span>
        </div>
        <div className="flex flex-col items-center gap-2 group transition-all hover:scale-110">
          <Share2 className="w-5 h-5" />
          <span className="text-[8px] font-black tracking-widest uppercase">Share</span>
        </div>
      </div>
    </div>
  );
}
