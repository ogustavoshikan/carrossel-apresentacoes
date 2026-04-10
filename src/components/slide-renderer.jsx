import React from 'react';
import SlideCover from './slides/SlideCover';
import SlideContentSplit from './slides/SlideContentSplit';
import SlideBigNumber from './slides/SlideBigNumber';
import SlideQuote from './slides/SlideQuote';
import SlideComparison from './slides/SlideComparison';
import SlideList from './slides/SlideList';
import SlideCTA from './slides/SlideCTA';

/**
 * SlideRenderer — Mapeia o layout do slide para o componente correto.
 * Substitui o switch/case monolítico de renderVisualCard.
 */

const LAYOUT_MAP = {
  cover: SlideCover,
  'content-split': SlideContentSplit,
  'big-number': SlideBigNumber,
  quote: SlideQuote,
  comparison: SlideComparison,
  list: SlideList,
  cta: SlideCTA,
};

export default function SlideRenderer({
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
  onItemChange,
  selectedElement,
  onSelectElement,
  showSlideCounter,
  slideCounterPosition,
}) {
  const Component = LAYOUT_MAP[data.layout];
  if (!Component) return null;

  return (
    <Component
      data={data}
      index={index}
      slideCount={slideCount}
      brandHandle={brandHandle}
      brandAvatar={brandAvatar}
      brandColor={brandColor}
      isVerified={isVerified}
      titleScale={titleScale}
      textScale={textScale}
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
