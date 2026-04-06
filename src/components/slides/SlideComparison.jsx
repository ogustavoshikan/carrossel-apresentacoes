import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import SmartElement from '../smart-element';
import SlideHeader, { SlideFooterPlaceholder } from '../slide-header';

/**
 * SlideComparison — Layout "comparison".
 * Título + lista de comparação com highlight.
 */
export default function SlideComparison({
  data,
  index,
  slideCount,
  brandHandle,
  brandColor,
  titleScale,
  showMetrics,
  onActionStart,
  onTextChange,
  onItemChange,
}) {
  const sTitle = titleScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full bg-surface-dark flex flex-col p-10 pb-20">
      <SlideHeader
        index={index + 1}
        total={slideCount}
        brandHandle={brandHandle}
        brandColor={brandColor}
      />
      <div className="flex-1 flex flex-col justify-center pt-8">
        <SmartElement
          slideIndex={index}
          field="titulo"
          position={pos('titulo')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          className="mb-10"
        >
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black text-white tracking-tighter outline-none"
            style={{ fontSize: `${32 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartElement>

        <div className="space-y-4">
          {(data.items || [{ label: 'A', value: 'B', highlight: false }]).map((item, i) => (
            <div
              key={i}
              className={`flex justify-between items-center p-6 rounded-slide-sm border transition-all duration-500 ${
                item.highlight ? 'shadow-xl' : 'bg-white/5 border-white/5 opacity-40'
              }`}
              style={
                item.highlight
                  ? { backgroundColor: `${brandColor}15`, borderColor: `${brandColor}40` }
                  : {}
              }
            >
              <div className="flex flex-col gap-0.5 w-full">
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => onItemChange(index, i, 'label', e.currentTarget.innerText)}
                  className={`font-outfit font-black text-[10px] tracking-widest uppercase outline-none block ${
                    !item.highlight ? 'text-zinc-500' : ''
                  }`}
                  style={item.highlight ? { color: brandColor } : {}}
                >
                  {item.label}
                </span>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => onItemChange(index, i, 'value', e.currentTarget.innerText)}
                  className={`font-playfair text-lg outline-none block ${
                    item.highlight ? 'text-white font-bold' : 'text-zinc-400 italic'
                  }`}
                >
                  {item.value}
                </span>
              </div>
              {item.highlight && (
                <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: brandColor }} />
              )}
            </div>
          ))}
        </div>
      </div>
      <SlideFooterPlaceholder />
    </div>
  );
}
