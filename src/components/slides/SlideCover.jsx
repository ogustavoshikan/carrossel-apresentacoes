import React from 'react';
import { Image as ImageIcon, ArrowRight } from 'lucide-react';
import SmartElement from '../smart-element';
import SlideHeader from '../slide-header';
import { COVER_VARIANT_COMPONENTS } from './cover-variants';
import { COVER_EXTRA_VARIANT_COMPONENTS } from './cover-extra-variants';

/**
 * SlideCover — Layout "cover" (sempre slide 1).
 * Imagem superior + título grande + texto de apoio.
 * Suporta variantes visuais via data.coverVariantIndex.
 */
export default function SlideCover({
  data,
  index,
  brandColor,
  brandHandle,
  brandAvatar,
  titleScale,
  textScale,
  showMetrics,
  onActionStart,
  onTextChange,
  selectedElement,
  onSelectElement,
  showBrandHandle,
  slideCount,
  isVerified,
  brandLogo,
  showBrandLogo,
}) {
  // Delegação para variante visual (1-22)
  let variantIndex = data.coverVariantIndex || 0;

  // Suporte a layouts nomeados como 'cover-18', 'cover-19', etc.
  if (variantIndex === 0 && data.layout && data.layout.startsWith('cover-')) {
    const layoutIdx = parseInt(data.layout.replace('cover-', ''));
    if (!isNaN(layoutIdx)) {
      variantIndex = layoutIdx;
    }
  }

  // Props comuns compartilhadas por todas as variantes
  const commonVariantProps = {
    data, index, brandColor, brandHandle, showBrandHandle,
    brandAvatar, brandLogo, showBrandLogo, isVerified,
    titleScale, textScale, showMetrics, onActionStart,
    onTextChange, selectedElement, onSelectElement, slideCount,
  };

  // Variantes de Capas Extras (IDs 101+)
  if (variantIndex >= 101 && COVER_EXTRA_VARIANT_COMPONENTS[variantIndex]) {
    const ExtraComponent = COVER_EXTRA_VARIANT_COMPONENTS[variantIndex];
    return <ExtraComponent {...commonVariantProps} />;
  }

  // Variantes de Capas principais (IDs 1-99)
  if (variantIndex > 0 && COVER_VARIANT_COMPONENTS[variantIndex]) {
    const VariantComponent = COVER_VARIANT_COMPONENTS[variantIndex];
    return <VariantComponent {...commonVariantProps} />;
  }

  // Layout original (variante 0)
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="relative w-full h-full bg-[#080808] flex flex-col overflow-hidden">
      <SlideHeader 
        data={data} 
        slideIndex={index} 
        onActionStart={onActionStart} 
        selectedElement={selectedElement} 
        onSelectElement={onSelectElement}
        index={index + 1}
        total={slideCount}
        brandHandle={brandHandle} 
        showBrandHandle={false}
        showSlideCounter={false}
        brandAvatar={brandAvatar}
        brandLogo={brandLogo}
        showBrandLogo={showBrandLogo}
        brandColor={brandColor}
        isVerified={isVerified}
        hideDot={true}
      />
      {/* Hero image top */}
      <div className="absolute top-0 left-0 w-full h-[55%] overflow-hidden">
        {data.imageUrl ? (
            <div
              className="absolute inset-0 bg-cover"
              style={{
                backgroundImage: `url(${data.imageUrl})`,
                backgroundPosition: `${data.imagePositionX ?? 50}% ${data.imagePosition ?? 50}%`,
                transform: `scale(${data.imageScale ?? 1})`,
                transformOrigin: 'top center',
              }}
            />
        ) : (
          <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center opacity-50">
            <ImageIcon className="w-8 h-8 text-zinc-700" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/10 to-transparent pointer-events-none" />
      </div>

      {/* Content area */}
      <div
        className="flex-1 mt-[55%] p-10 flex flex-col justify-between relative"
        style={{ backgroundColor: brandColor }}
      >
        <div className="absolute -top-[31px] left-10">
          <SmartElement
            slideIndex={index}
            field="titulo"
            position={pos('titulo')}
            showMetrics={showMetrics}
            onActionStart={onActionStart}
            isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
            onSelectElement={onSelectElement}
            className="mb-8"
          >
            <h2
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black text-white tracking-tighter drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] whitespace-pre-line outline-none"
              style={{ fontSize: `${96 * sTitle}px`, lineHeight: 0.8 }}
            >
              {data.titulo}
            </h2>
          </SmartElement>
        </div>

        <div className="mt-12">
          <SmartElement
          slideIndex={index}
          field="texto_apoio"
          position={pos('texto_apoio')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
          className="max-w-[70%]"
        >    <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text italic text-white max-w-[320px] mb-6 outline-none"
              style={{ fontSize: `${30 * sText}px`, lineHeight: 1.1 }}
            >
              {data.texto_apoio}
            </p>
          </SmartElement>
          <div className="w-20 h-[3px] bg-surface-input/300" />
        </div>

        <div className="flex justify-end items-end pb-4 relative z-10">

          <div className="flex items-center gap-3 bg-black/20 px-6 py-3 rounded-2xl backdrop-blur-2xl border border-white/10 relative z-10 pointer-events-auto">
            <SmartElement
              slideIndex={index}
              field="slide_call"
              position={pos('slide_call')}
              showMetrics={showMetrics}
              onActionStart={onActionStart}
              isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'slide_call'}
              onSelectElement={onSelectElement}
            >
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'slide_call', e.currentTarget.innerText)}
                className="text-[11px] font-text font-black text-white tracking-widest uppercase outline-none block"
              >
                {data.slide_call || 'Deslizar'}
              </span>
            </SmartElement>
            <ArrowRight className="w-4 h-4 text-white shrink-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}


