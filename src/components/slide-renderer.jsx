import React from 'react';
import SlideCover from './slides/SlideCover';
import SlideContentSplit from './slides/SlideContentSplit';
import SlideBigNumber from './slides/SlideBigNumber';
import SlideQuote from './slides/SlideQuote';
import SlideComparison from './slides/SlideComparison';
import SlideList from './slides/SlideList';
import SlideCTA from './slides/SlideCTA';
import SlideSequence from './slides/SlideSequence';

/**
 * SlideRenderer — Mapeia o layout do slide para o componente correto.
 * Substitui o switch/case monolítico de renderVisualCard.
 */

import SmartElement from './smart-element';

const LAYOUT_MAP = {
  'cover': SlideCover,
  'cover-18': SlideCover,
  'cover-19': SlideCover,
  'cover-20': SlideCover,
  'cover-21': SlideCover,
  'cover-22': SlideCover,
  'cover-23': SlideCover,
  'cover-24': SlideCover,
  'cover-25': SlideCover,
  'cover-26': SlideCover,
  'cover-27': SlideCover,
  'cover-28': SlideCover,
  'cover-29': SlideCover,
  'cover-30': SlideCover,
  'cover-31': SlideCover,
  'cover-32': SlideCover,
  'cover-33': SlideCover,
  'cover-34': SlideCover,
  'cover-35': SlideCover,
  'cover-36': SlideCover,
  'cover-37': SlideCover,
  'cover-38': SlideCover,
  'cover-39': SlideCover,
  'cover-40': SlideCover,
  'cover-41': SlideCover,
  'cover-42': SlideCover,
  'cover-43': SlideCover,
  'cover-44': SlideCover,
  'content-split': SlideContentSplit,
  'big-number': SlideBigNumber,
  'quote': SlideQuote,
  'comparison': SlideComparison,
  'list': SlideList,
  'cta': SlideCTA,
  'cta-extra': SlideCTA,
  'sequence': SlideSequence,
};


export default function SlideRenderer({
  data,
  index,
  slideCount,
  brandHandle,
  showBrandHandle,
  brandAvatar,
  brandLogo,
  showBrandLogo,
  brandColor,
  isVerified,
  titleScale,
  textScale,
  titleFont: globalTitleFont,
  textFont: globalTextFont,
  tagFont: globalTagFont,
  showMetrics,
  onActionStart,
  onTextChange,
  onItemChange,
  selectedElement,
  onSelectElement,
  showSlideCounter,
  slideCounterPosition,
}) {
  const Component = LAYOUT_MAP[data.layout];
  if (!Component) return null;

  // Variáveis de fonte específicas do slide ou globais
  const slideStyles = {
    '--font-title': data.titleFont || globalTitleFont,
    '--font-text': data.textFont || globalTextFont,
    '--font-tag': data.tagFont || globalTagFont || globalTitleFont,
  };

  return (
    <div className="w-full h-full relative" style={slideStyles}>
      <Component
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
        titleFont={data.titleFont || globalTitleFont}
        textFont={data.textFont || globalTextFont}
        tagFont={data.tagFont || globalTagFont || globalTitleFont}
        showMetrics={showMetrics}
        onActionStart={onActionStart}
        onTextChange={onTextChange}
        onItemChange={onItemChange}
        selectedElement={selectedElement}
        onSelectElement={onSelectElement}
        showSlideCounter={showSlideCounter}
        slideCounterPosition={slideCounterPosition}
      />

      {/* Camada Global de Clones (Duplicação T5.3) */}
      {data.clonedFields && data.clonedFields.length > 0 && (
         <div className="absolute inset-0 pointer-events-none overflow-hidden z-40">
           {data.clonedFields.map(clone => {
             const Tag = clone.type;
             const posKey = clone.id;
             const isSel = selectedElement?.slideIndex === index && selectedElement?.field === posKey;
             
             return (
               <div key={posKey} className="absolute left-0 top-0">
                 <SmartElement
                    slideIndex={index}
                    field={posKey}
                    position={data.positions?.[posKey] || {x: 0, y: 0, scale: 1, rotation: 0}}
                    showMetrics={showMetrics}
                    onActionStart={onActionStart}
                    isSelected={isSel}
                    onSelectElement={onSelectElement}
                 >
                    <Tag
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => onTextChange(index, posKey, e.currentTarget.innerText)}
                      className={`${clone.className} pointer-events-auto`}
                      style={clone.style}
                      // Não injetamos style direto aqui porque o próprio SmartElement 
                      // aplica cloneElement nas props.style para os componentes (cor, size, line-height)
                    >
                      {data[posKey] !== undefined ? data[posKey] : ''}
                    </Tag>
                 </SmartElement>
               </div>
             );
           })}
         </div>
      )}
    </div>
  );
}
