import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import SmartElement from '../smart-element';
import SlideHeader, { SlideFooterPlaceholder } from '../slide-header';

/**
 * SlideContentSplit — Layout "content-split".
 * Imagem arredondada + tag + título + texto.
 */
export default function SlideContentSplit({
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
  selectedElement,
  onSelectElement,
}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full bg-surface-dark flex flex-col p-10 pb-16 relative">
      <SlideHeader
        index={index + 1}
        total={slideCount}
        brandHandle={brandHandle}
        brandColor={brandColor}
      />
      <div className="flex-1 flex flex-col justify-center pt-10">
        <SmartElement
          slideIndex={index}
          field="imagem"
          position={pos('imagem')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'imagem'}
          onSelectElement={onSelectElement}
          className="relative w-full h-60 rounded-slide-inner overflow-hidden mb-8 ring-1 ring-white/10 shadow-2xl"
        >
          {data.imageUrl ? (
            <div
              className="absolute inset-0 bg-cover"
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
        </SmartElement>

        <div className="flex items-center gap-3 mb-4">
          <div className="h-[2px] w-8" style={{ backgroundColor: brandColor }} />
          <SmartElement
            slideIndex={index}
            field="tag"
            position={pos('tag')}
            showMetrics={showMetrics}
            onActionStart={onActionStart}
            isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'tag'}
            onSelectElement={onSelectElement}
          >
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="font-outfit font-bold text-tag tracking-[0.4em] uppercase outline-none"
              style={{ color: brandColor }}
            >
              {data.tag || 'TAG'}
            </span>
          </SmartElement>
        </div>

        <SmartElement
          slideIndex={index}
          field="titulo"
          position={pos('titulo')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-6"
        >
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black text-white tracking-tighter outline-none"
            style={{ fontSize: `${32 * sTitle}px`, lineHeight: 1.1 }}
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
        >
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-playfair text-zinc-400 outline-none antialiased"
            style={{ fontSize: `${18 * sText}px`, lineHeight: 1.6 }}
          >
            {data.texto_apoio}
          </p>
        </SmartElement>
      </div>
      <SlideFooterPlaceholder />
    </div>
  );
}
