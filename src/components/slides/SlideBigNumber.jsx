import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import SmartElement from '../smart-element';
import SlideHeader, { SlideFooterPlaceholder } from '../slide-header';
import { BIGNUMBER_VARIANT_COMPONENTS } from './bignumber-variants';

/**
 * SlideBigNumber — Layout "big-number".
 * Número grande + tag + texto + imagem inferior.
 * Suporta variantes visuais via data.bigNumberVariantIndex.
 */
export default function SlideBigNumber({
  data,
  index,
  slideCount,
  brandHandle,
  brandAvatar,
  brandColor,
  isVerified,
  titleScale,
  textScale,
  showMetrics,
  onActionStart,
  onTextChange,
  selectedElement,
  onSelectElement,
  showSlideCounter,
  slideCounterPosition,
}) {
  // Delegação para variante visual (1-11)
  const variantIndex = data.bigNumberVariantIndex || 0;
  if (variantIndex > 0 && BIGNUMBER_VARIANT_COMPONENTS[variantIndex]) {
    const VariantComponent = BIGNUMBER_VARIANT_COMPONENTS[variantIndex];
    return (
      <VariantComponent
        data={data}
        index={index}
        slideCount={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        isVerified={isVerified}
        titleScale={titleScale}
        textScale={textScale}
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

  // Layout original (variante 0)
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full bg-surface-dark flex flex-col p-10 pb-16 relative overflow-hidden">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1}
        total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        isVerified={isVerified}
        showSlideCounter={showSlideCounter}
        slideCounterPosition={slideCounterPosition}

              />
      <div className="flex-1 flex flex-col justify-center relative z-10 pt-6">
        <SmartElement
          slideIndex={index}
          field="titulo"
          position={pos('titulo')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="flex items-baseline mb-[-10px]"
        >
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black text-white tracking-tighter leading-none outline-none truncate max-w-full block"
            style={{ fontSize: `${130 * sTitle}px` }}
          >
            {data.titulo}
          </span>
        </SmartElement>

        <SmartElement
          slideIndex={index}
          field="tag"
          position={pos('tag')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'tag'}
          onSelectElement={onSelectElement}
          className="mb-8"
        >
          <div
            className="px-6 py-2 inline-block self-start rounded-md shadow-2xl"
            style={{ backgroundColor: brandColor }}
          >
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="font-outfit font-bold text-white text-[12px] tracking-[0.3em] uppercase outline-none block"
            >
              {data.tag || 'LABEL'}
            </span>
          </div>
        </SmartElement>

        <SmartElement
          slideIndex={index}
          field="texto_apoio"
          position={pos('texto_apoio')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
          className="mb-10 max-w-[95%]"
        >
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-playfair text-zinc-300 outline-none line-clamp-3 overflow-hidden"
            style={{ fontSize: `${20 * sText}px`, lineHeight: 1.6 }}
          >
            {data.texto_apoio}
          </p>
        </SmartElement>

        <SmartElement
          slideIndex={index}
          field="imagem"
          position={pos('imagem')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'imagem'}
          onSelectElement={onSelectElement}
          className="w-full h-40 rounded-slide-inner overflow-hidden border border-white/5 shadow-2xl relative"
        >
          {data.imageUrl ? (
            <div
              className="w-full h-full bg-cover grayscale"
              style={{
                backgroundImage: `url(${data.imageUrl})`,
                backgroundPosition: `center ${data.imagePosition ?? 50}%`,
                transform: `scale(${data.imageScale ?? 1})`,
                transformOrigin: 'top center',
              }}
            />
          ) : (
            <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center opacity-50">
              <ImageIcon className="w-8 h-8 text-zinc-700" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        </SmartElement>
      </div>
      <SlideFooterPlaceholder />
    </div>
  );
}

