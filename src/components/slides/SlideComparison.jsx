import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import SmartElement from '../smart-element';
import SlideHeader, { SlideFooterPlaceholder } from '../slide-header';
import { COMPARISON_VARIANT_COMPONENTS } from './comparison-variants';

/**
 * SlideComparison — Layout "comparison".
 * Título + lista de comparação com highlight.
 */
export default function SlideComparison(props) {
  const {
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
  } = props;

  // Renderiza variante se selecionada
  const variantIndex = data.comparisonVariantIndex || 0;
  if (variantIndex > 0 && COMPARISON_VARIANT_COMPONENTS[variantIndex]) {
    const VariantComponent = COMPARISON_VARIANT_COMPONENTS[variantIndex];
    return <VariantComponent {...props} />;
  }

  const sTitle = titleScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full bg-surface-dark flex flex-col p-10 pb-10 rounded-slide">
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
      <div className="flex-1 flex flex-col justify-start pt-12 pb-8 min-h-0">
        <SmartElement
          slideIndex={index}
          field="titulo"
          position={pos('titulo')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-4"
        >
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black text-white tracking-tighter outline-none line-clamp-2 overflow-hidden"
            style={{ fontSize: `${32 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartElement>

        <div className="space-y-2 mt-2">
          {(() => {
            const items = data.items || [{ label: 'Mercado', value: 'Qualidade comum', highlight: false }, { label: 'Nós', value: 'Excelência garantida', highlight: true }];
            const leftItems = items.filter(it => !it.highlight);
            const rightItems = items.filter(it => it.highlight);
            const rowCount = Math.max(leftItems.length, rightItems.length, 1);
            
            return Array.from({ length: rowCount }).map((_, i) => {
              const left = leftItems[i];
              const right = rightItems[i];
  
              return (
                <div key={i} className="flex gap-3 w-full">
                {left && (
                  <div className="w-1/2 flex flex-col p-3 rounded-slide-sm border bg-surface-input/30 border-white/5 opacity-40 justify-center">
                    <span
                      contentEditable suppressContentEditableWarning
                      onBlur={(e) => onItemChange(index, items.indexOf(left) !== -1 ? items.indexOf(left) : items.length, 'label', e.currentTarget.innerText)}
                      className="font-outfit font-black text-[9px] tracking-widest uppercase outline-none block line-clamp-1 overflow-hidden text-zinc-500 mb-0.5"
                    >
                      {left.label}
                    </span>
                    <span
                      contentEditable suppressContentEditableWarning
                      onBlur={(e) => onItemChange(index, items.indexOf(left) !== -1 ? items.indexOf(left) : items.length, 'value', e.currentTarget.innerText)}
                      className="font-playfair text-[15px] outline-none block line-clamp-2 overflow-hidden text-zinc-400 italic"
                    >
                      {left.value}
                    </span>
                  </div>
                )}
                {right && (
                  <div className="w-1/2 flex justify-between items-center p-3 rounded-slide-sm border shadow-xl transition-all duration-150" style={{ backgroundColor: `${brandColor}15`, borderColor: `${brandColor}40` }}>
                    <div className="flex flex-col flex-1 pr-3">
                      <span
                        contentEditable suppressContentEditableWarning
                        onBlur={(e) => onItemChange(index, items.indexOf(right) !== -1 ? items.indexOf(right) : items.length, 'label', e.currentTarget.innerText)}
                        className="font-outfit font-black text-[9px] tracking-widest uppercase outline-none block line-clamp-1 overflow-hidden mb-0.5"
                        style={{ color: brandColor }}
                      >
                        {right.label}
                      </span>
                      <span
                        contentEditable suppressContentEditableWarning
                        onBlur={(e) => onItemChange(index, items.indexOf(right) !== -1 ? items.indexOf(right) : items.length, 'value', e.currentTarget.innerText)}
                        className="font-playfair text-[15px] outline-none block line-clamp-2 overflow-hidden text-white font-bold"
                      >
                        {right.value}
                      </span>
                    </div>
                    <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: brandColor }} />
                  </div>
                )}
              </div>
            );
          });
        })()}
        </div>
      </div>
      <SlideFooterPlaceholder />
    </div>
  );
}


