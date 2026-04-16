import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import SmartElement from '../smart-element';
import SlideHeader, { SlideFooterPlaceholder } from '../slide-header';
import { LIST_VARIANT_COMPONENTS } from './list-variants';

/**
 * SlideList — Layout "list".
 * Ícone + título + lista numerada com label/text.
 */
export default function SlideList({
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
  onItemChange,
  selectedElement,
  onSelectElement,
  showBrandHandle,
  showSlideCounter,
  slideCounterPosition,
}) {
  const variantIndex = data.listVariantIndex || 0;

  if (variantIndex > 0 && LIST_VARIANT_COMPONENTS[variantIndex]) {
    const VariantComponent = LIST_VARIANT_COMPONENTS[variantIndex];
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
        showMetrics={showMetrics}
        onActionStart={onActionStart}
        onTextChange={onTextChange}
        onItemChange={onItemChange}
        selectedElement={selectedElement}
        onSelectElement={onSelectElement}
        showSlideCounter={showSlideCounter}
        slideCounterPosition={slideCounterPosition}
      />
    );
  }

  const sTitle = titleScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col p-10 pb-10 relative overflow-hidden">
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
      <div className="flex-1 flex flex-col justify-center pt-2">
        <div className="flex items-center gap-5 mb-10 shrink-0">
          <div
            className="w-12 h-12 border rounded-[1rem] flex items-center justify-center shrink-0 pointer-events-none"
            style={{
              backgroundColor: `${brandColor}15`,
              borderColor: `${brandColor}30`,
            }}
          >
            <CheckCircle2 className="w-7 h-7" style={{ color: brandColor }} />
          </div>
          <SmartElement
            slideIndex={index}
            field="titulo"
            position={pos('titulo')}
            showMetrics={showMetrics}
            onActionStart={onActionStart}
            isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
            onSelectElement={onSelectElement}
            className="w-full"
          >
            <h2
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-outfit font-black text-white tracking-tighter leading-none outline-none line-clamp-2 overflow-hidden"
              style={{ fontSize: `${30 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartElement>
        </div>

        <div className="space-y-8 flex-1 overflow-y-auto pr-2">
          {(data.items || [{ label: 'Item', text: 'Text' }]).map((item, i) => (
            <div key={i} className="flex gap-6 items-start group">
              <div
                className="font-outfit font-black text-base opacity-30 transition-opacity pointer-events-none mt-1"
                style={{ color: brandColor }}
              >
                0{i + 1}
              </div>
              <div className="flex-1 border-b border-white/10 pb-4">
                <h4
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => onItemChange(index, i, 'label', e.currentTarget.innerText)}
                  className="font-outfit font-bold text-white text-[14px] uppercase tracking-[0.2em] mb-2 outline-none block line-clamp-1"
                >
                  {item.label}
                </h4>
                <p
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => onItemChange(index, i, 'text', e.currentTarget.innerText)}
                  className="font-playfair text-zinc-400 text-base leading-snug outline-none block line-clamp-2"
                >
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SlideFooterPlaceholder />
    </div>
  );
}


