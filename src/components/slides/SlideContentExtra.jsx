import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import SmartElement from '../smart-element';
import SlideHeader, { SlideFooterPlaceholder } from '../slide-header';
import { CONTENT_EXTRA_VARIANT_COMPONENTS } from './content-extra-variants';

/**
 * SlideContentExtra — Layout "content-extra".
 * Menu de Conteúdos Extras e variantes customizadas.
 */
export default function SlideContentExtra({
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
  showBrandHandle,
  showSlideCounter,
  slideCounterPosition,
  brandLogo,
  showBrandLogo,
}) {
  const variantIndex = data.contentExtraVariantIndex || 252;
  
  if (variantIndex > 0 && CONTENT_EXTRA_VARIANT_COMPONENTS[variantIndex]) {
    const VariantComponent = CONTENT_EXTRA_VARIANT_COMPONENTS[variantIndex];
    return (
      <VariantComponent
        data={data}
        index={index}
        slideCount={slideCount}
        brandHandle={brandHandle}
        showBrandHandle={showBrandHandle}
        brandAvatar={brandAvatar}
        brandLogo={brandLogo}
        showBrandLogo={showBrandLogo}
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

  // Layout de fallback (Variante base)
  const sTitle = titleScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full bg-surface-dark flex flex-col pt-10 pb-16 px-[32px] relative" style={{ borderBottom: `10px solid ${brandColor}` }}>
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1}
        total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandAvatar={brandAvatar}
        brandLogo={brandLogo}
        showBrandLogo={showBrandLogo}
        brandColor={brandColor}
        isVerified={isVerified}
        showSlideCounter={showSlideCounter}
        slideCounterPosition={slideCounterPosition}
        hideDot={true}
        handleColor="#636363"
        counterColor="#636363"
        counterBg="#080808"
      />
      <div className="flex-1 flex flex-col justify-center pt-6">
        <SmartElement
          slideIndex={index}
          field="titulo"
          position={pos('titulo')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-[14px]"
        >
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black text-white tracking-tighter outline-none line-clamp-2 overflow-hidden"
            style={{ fontSize: `${32 * sTitle}px`, lineHeight: 1.1 }}
          >
            {data.titulo}
          </h2>
        </SmartElement>
      </div>
      <SlideFooterPlaceholder />
    </div>
  );
}
