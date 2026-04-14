import React from 'react';
import { BadgeCheck } from 'lucide-react';
import SmartElement from './smart-element';

/**
 * SlideHeader — Header padrão dos slides com handle e contador.
 */
export default function SlideHeader({
  index,
  total,
  brandHandle,
  showBrandHandle = true,
  brandAvatar,
  brandColor,
  isVerified = false,
  dark = false,
  showSlideCounter = true,
  data,
  slideIndex,
  onActionStart,
  selectedElement,
  onSelectElement,
}) {
  const handleAlign = data?.positions?.handle?.align || 'top-left';
  const counterAlign = data?.positions?.counter?.align || 'top-right';

  const getAlignClasses = (align) => {
    switch (align) {
      case 'top-left': return 'top-0 left-0 p-5 justify-start items-start';
      case 'top-center': return 'top-0 left-1/2 -translate-x-1/2 p-5 justify-center items-start';
      case 'top-right': return 'top-0 right-0 p-5 justify-end items-start';
      case 'center-left': return 'top-1/2 -translate-y-1/2 left-0 p-5 justify-start items-center';
      case 'center-center': return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 justify-center items-center';
      case 'center-right': return 'top-1/2 -translate-y-1/2 right-0 p-5 justify-end items-center';
      case 'bottom-left': return 'bottom-0 left-0 p-5 justify-start items-end';
      case 'bottom-center': return 'bottom-0 left-1/2 -translate-x-1/2 p-5 justify-center items-end';
      case 'bottom-right': return 'bottom-0 right-0 p-5 justify-end items-end';
      default: return 'top-0 left-0 p-5 justify-start items-start';
    }
  };

  const isSelectedHandle = selectedElement?.slideIndex === slideIndex && selectedElement?.field === 'handle';
  const isSelectedCounter = selectedElement?.slideIndex === slideIndex && selectedElement?.field === 'counter';

  const handleEl = (showBrandHandle && !data?.hideHandle) ? (
    <SmartElement
      slideIndex={slideIndex}
      field="handle"
      position={data?.positions?.handle || { x: 0, y: 0, scale: 1 }}
      onActionStart={onActionStart}
      isSelected={isSelectedHandle}
      onSelectElement={onSelectElement}
      className={`pointer-events-auto ${isSelectedHandle ? 'z-[60]' : 'z-50'}`}
    >
      <div className="flex items-center gap-3 select-none">
        {brandAvatar ? (
          <img src={brandAvatar} alt="avatar" className="w-6 h-6 rounded-full object-cover" />
        ) : (
          <div
            className={`w-2.5 h-2.5 rounded-full ${dark ? 'bg-black' : ''}`}
            style={{ backgroundColor: dark ? '#000' : brandColor }}
          />
        )}
        <span
          className={`font-outfit font-black tracking-[0.25em] text-[10px] uppercase ${
            dark ? 'text-black' : 'text-zinc-500'
          }`}
        >
          @{brandHandle}
        </span>
        {isVerified && (
          <BadgeCheck
            className="w-3.5 h-3.5"
            style={{ color: brandColor }}
          />
        )}
      </div>
    </SmartElement>
  ) : null;

  const counterEl = (showSlideCounter && !data?.hideCounter) ? (
    <SmartElement
      slideIndex={slideIndex}
      field="counter"
      position={data?.positions?.counter || { x: 0, y: 0, scale: 1 }}
      onActionStart={onActionStart}
      isSelected={isSelectedCounter}
      onSelectElement={onSelectElement}
      className={`pointer-events-auto ${isSelectedCounter ? 'z-[60]' : 'z-50'}`}
    >
      <div
        className={`font-outfit font-bold text-[11px] px-3 py-1.5 rounded-lg border backdrop-blur-xl select-none -translate-y-[8px] ${
          dark
            ? 'bg-black/5 text-black border-black/10'
            : 'bg-white/5 text-zinc-400 border-white/10'
        }`}
      >
        {index} <span className="opacity-30 mx-1">/</span> {total}
      </div>
    </SmartElement>
  ) : null;

  return (
    <>
      <div className={`absolute pointer-events-none flex w-max max-w-full ${getAlignClasses(handleAlign)} z-[55]`}>
        {handleEl}
      </div>
      {counterEl && (
        <div className={`absolute pointer-events-none flex w-max max-w-full ${getAlignClasses(counterAlign)} z-[55]`}>
          {counterEl}
        </div>
      )}
    </>
  );
}

export function SlideFooterPlaceholder() {
  return <div className="h-10 w-full pointer-events-none" />;
}
