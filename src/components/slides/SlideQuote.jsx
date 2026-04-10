import React from 'react';
import { Quote } from 'lucide-react';
import SmartElement from '../smart-element';
import SlideHeader, { SlideFooterPlaceholder } from '../slide-header';
import { QUOTE_VARIANT_COMPONENTS } from './quote-variants';

/**
 * SlideQuote — Layout "quote".
 * Fundo branco, citação grande, autor.
 */
export default function SlideQuote({
  data,
  index,
  slideCount,
  brandHandle,
  brandAvatar,
  brandColor,
  isVerified,
  titleScale,
  showMetrics,
  onActionStart,
  onTextChange,
  selectedElement,
  onSelectElement,
  showSlideCounter,
  slideCounterPosition,
}) {
  const variantIndex = data.quoteVariantIndex || 0;

  // Se for variante > 0, delega pro componente de variante
  if (variantIndex > 0 && QUOTE_VARIANT_COMPONENTS[variantIndex]) {
    const VariantComponent = QUOTE_VARIANT_COMPONENTS[variantIndex];
    return (
      <VariantComponent
        data={data}
        index={index}
        slideCount={slideCount}
        brandHandle={brandHandle}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        isVerified={isVerified}
        titleScale={titleScale}
        showMetrics={showMetrics}
        onActionStart={onActionStart}
        onTextChange={onTextChange}
        selectedElement={selectedElement}
        onSelectElement={onSelectElement}
        showSlideCounter={showSlideCounter}
        slideCounterPosition={slideCounterPosition}

              />
    );
  }

  // Fallback: Layout Original (variante 0)
  const sTitle = titleScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full bg-white flex flex-col p-16 pb-20 text-black items-center justify-center text-center relative">
      <Quote
        className="absolute top-24 w-56 h-56 -z-0 pointer-events-none"
        style={{ color: `${brandColor}15` }}
        fill="currentColor"
      />

      <div className="w-16 h-1.5 mb-12 relative z-10" style={{ backgroundColor: brandColor }} />

      <SmartElement
        slideIndex={index}
        field="titulo"
        position={pos('titulo')}
        showMetrics={showMetrics}
        onActionStart={onActionStart}
        isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
        onSelectElement={onSelectElement}
        className="mb-12 relative z-10 w-full"
      >
        <h2
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
          className="font-playfair italic font-bold text-zinc-900 tracking-tight outline-none"
          style={{ fontSize: `${36 * sTitle}px`, lineHeight: 1.2 }}
        >
          "{data.titulo}"
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
        className="relative z-10"
      >
        <span
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
          className="font-outfit font-black text-[12px] tracking-[0.4em] uppercase text-zinc-400 outline-none block"
        >
          — {data.texto_apoio} —
        </span>
      </SmartElement>

      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1}
        total={slideCount}
        brandHandle={brandHandle}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        isVerified={isVerified}
        dark
        showSlideCounter={showSlideCounter}
        slideCounterPosition={slideCounterPosition}

              />
      <SlideFooterPlaceholder />
    </div>
  );
}

