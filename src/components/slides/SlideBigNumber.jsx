import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import SmartElement from '../smart-element';
import SlideHeader, { SlideFooterPlaceholder } from '../slide-header';

/**
 * SlideBigNumber — Layout "big-number".
 * Número grande + tag + texto + imagem inferior.
 */
export default function SlideBigNumber({
  data,
  index,
  slideCount,
  brandHandle,
  brandColor,
  titleScale,
  textScale,
  showMetrics,
  onActionStart,
  onTextChange,
}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full bg-surface-dark flex flex-col p-10 pb-16 relative overflow-hidden">
      <SlideHeader
        index={index + 1}
        total={slideCount}
        brandHandle={brandHandle}
        brandColor={brandColor}
      />
      <div className="flex-1 flex flex-col justify-center relative z-10 pt-8">
        <SmartElement
          slideIndex={index}
          field="titulo"
          position={pos('titulo')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          className="flex items-baseline mb-[-10px]"
        >
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black text-white tracking-tighter leading-none outline-none"
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
          className="mb-10 max-w-[95%]"
        >
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-playfair text-zinc-300 outline-none"
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
          className="w-full h-40 rounded-slide-inner overflow-hidden border border-white/5 shadow-2xl relative"
        >
          {data.imageUrl ? (
            <div
              className="w-full h-full bg-cover grayscale"
              style={{
                backgroundImage: `url(${data.imageUrl})`,
                backgroundPosition: `center ${data.imagePosition ?? 50}%`,
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
