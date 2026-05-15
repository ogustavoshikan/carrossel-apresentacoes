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
  brandLogo,
  showBrandLogo = true,
  brandColor,
  isVerified = false,
  dark = false,
  showSlideCounter = true,
  counterBg,
  handleColor,
  counterColor,
  data,
  slideIndex,
  onActionStart,
  selectedElement,
  onSelectElement,
  hideDot = false,
}) {
  const handleAlign = data?.positions?.handle?.align || 'top-left';
  const counterAlign = data?.positions?.counter?.align || 'top-right';
  const logoAlign = data?.positions?.logo?.align || 'top-center';

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
  const isSelectedLogo = selectedElement?.slideIndex === slideIndex && selectedElement?.field === 'logo';

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
      <div 
        className="flex items-center gap-3 select-none"
        style={handleColor ? { color: handleColor } : {}}
      >
        {brandAvatar ? (
          <img 
            src={brandAvatar} 
            alt="avatar" 
            className="w-6 h-6 rounded-full object-cover" 
            crossOrigin="anonymous"
          />
        ) : !hideDot ? (
          <div
            className={`w-2.5 h-2.5 rounded-full ${dark ? 'bg-black' : ''}`}
            style={{ backgroundColor: dark ? '#000' : brandColor }}
          />
        ) : null}
        <div className="flex items-center gap-1.5">
          <span className="font-text font-black tracking-[0.25em] text-[10px] uppercase flex items-center">
            <span className="mr-[1px]">@</span>
            {brandHandle ? (brandHandle.startsWith('@') ? brandHandle.substring(1) : brandHandle) : 'studio'}
          </span>
          {isVerified && (
            <BadgeCheck
              className="w-3.5 h-3.5 shrink-0"
              style={{ color: brandColor }}
            />
          )}
        </div>
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
        className={`font-text font-bold text-[11px] px-3 py-1.5 rounded-lg border select-none -translate-y-[8px] relative overflow-hidden ${
          dark
            ? 'bg-black/5 border-black/10'
            : 'bg-surface-input/30 border-white/10'
        }`}
        style={{ 
          ...(counterBg ? { backgroundColor: counterBg, borderColor: 'transparent' } : {}),
          ...(counterColor ? { color: counterColor } : {})
        }}
      >
        {/* Camada de Blur isolada para evitar bug no download PNG (html-to-image) */}
        {!counterBg && <div className="absolute inset-0 backdrop-blur-xl -z-10" />}
        <span className="relative z-10">
          {index} <span className="opacity-30 mx-1">/</span> {total}
        </span>
      </div>
    </SmartElement>
  ) : null;

  const logoEl = (showBrandLogo && brandLogo && !data?.hideLogo) ? (
    <SmartElement
      slideIndex={slideIndex}
      field="logo"
      position={data?.positions?.logo || { x: 0, y: 0, scale: 1, opacity: 1 }}
      onActionStart={onActionStart}
      isSelected={isSelectedLogo}
      onSelectElement={onSelectElement}
      className={`pointer-events-auto ${isSelectedLogo ? 'z-[110]' : 'z-[100]'}`}
    >
      <div 
        className="flex items-center justify-center select-none"
        style={{ opacity: data?.positions?.logo?.opacity ?? 1 }}
      >
        <img 
          src={brandLogo} 
          alt="brand logo" 
          className="max-w-[120px] max-h-[60px] object-contain drop-shadow-lg" 
          crossOrigin="anonymous"
        />
      </div>
    </SmartElement>
  ) : null;

  return (
    <>
      <div className={`absolute pointer-events-none flex w-max max-w-full ${getAlignClasses(handleAlign)} z-[100]`}>
        {handleEl}
      </div>
      {counterEl && (
        <div className={`absolute pointer-events-none flex w-max max-w-full ${getAlignClasses(counterAlign)} z-[100]`}>
          {counterEl}
        </div>
      )}
      {logoEl && (
        <div className={`absolute pointer-events-none flex w-max max-w-full ${getAlignClasses(logoAlign)} z-[100]`}>
          {logoEl}
        </div>
      )}
    </>
  );
}

export function SlideFooterPlaceholder() {
  return <div className="h-10 w-full pointer-events-none" />;
}

