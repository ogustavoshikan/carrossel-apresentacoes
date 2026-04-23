import React, { useRef, useEffect } from 'react';
import { Calendar, Shuffle } from 'lucide-react';
import { CTA_VARIANT_META } from '../slides/cta-variants';
import VariantPopoverHeader from './VariantPopoverHeader';

/**
 * CtaVariantPopover — Grid visual com mini-wireframes de cada variante de CTA.
 */

function VariantThumbnail({ variantId, brandColor, isSelected }) {
  const accent = brandColor;
  const dark = '#18181b';

  const layouts = {
    // 0: Original — fundo cor da marca, icon zap
    0: (
      <div className="w-full h-full flex flex-col justify-center items-center rounded-[3px] overflow-hidden p-1 gap-1" style={{ background: accent }}>
        <div className="w-4 h-4 bg-black rounded-sm flex items-center justify-center rotate-6" />
        <div className="w-[80%] h-[2px] bg-white rounded-full mt-1" />
        <div className="w-[60%] h-[1.5px] bg-white/70 rounded-full" />
        <div className="w-[70%] h-[4px] bg-white rounded-full mt-1" />
      </div>
    ),
    // 1: Minimal - circle A
    1: (
      <div className="w-full h-full flex flex-col justify-center items-center rounded-[3px] overflow-hidden p-1 gap-1 relative" style={{ background: '#050505' }}>
        <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: accent }} />
        <div className="w-5 h-5 rounded-full border flex items-center justify-center p-[1px]" style={{ borderColor: accent }}>
           <div className="w-full h-full bg-zinc-800 rounded-full" />
        </div>
        <div className="w-[80%] h-[2.5px] bg-white rounded-full mt-0.5" />
        <div className="w-[60%] h-[1.5px] bg-zinc-500 rounded-full" />
        <div className="w-[90%] h-[3.5px] rounded-full mt-1" style={{ background: accent }} />
      </div>
    ),
    // 2: Split Background
    2: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden relative" style={{ background: '#050505' }}>
        <div className="h-1/2 w-full bg-zinc-700" />
        <div className="h-1/2 w-full flex flex-col justify-center items-center p-1 gap-0.5 relative pt-3">
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#050505] rounded-full border border-black flex items-center justify-center">
             <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
          </div>
          <div className="w-[80%] h-[2px] bg-white rounded-full" />
          <div className="w-[60%] h-[1.5px] bg-zinc-500 rounded-full" />
          <div className="w-[90%] h-[3px] rounded bg-white mt-0.5 -mb-1" style={{ background: accent }} />
        </div>
      </div>
    ),
    // 3: Blur Neon Center
    3: (
      <div className="w-full h-full flex flex-col justify-center items-center rounded-[3px] overflow-hidden p-1 gap-1 relative" style={{ background: '#020202' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full opacity-40 blur-sm" style={{ background: accent }} />
        <div className="w-[90%] h-[3px] bg-white rounded-full relative z-10" />
        <div className="w-[60%] h-[1.5px] bg-white/70 rounded-full relative z-10" />
        <div className="w-[80%] h-[3px] rounded-full mt-1 relative z-10 bg-black border border-white/20 p-[1px] flex justify-center">
            <div className="w-full h-full bg-white/20 rounded-full" />
        </div>
      </div>
    ),
    // 4: Card Ticket
    4: (
      <div className="w-full h-full flex flex-col justify-center items-center rounded-[3px] overflow-hidden p-1 relative" style={{ background: '#050505' }}>
        <div className="w-[90%] bg-[#E5E5E5] rounded flex flex-col">
           <div className="p-1 border-b border-dashed border-zinc-500 flex flex-col items-center gap-0.5">
             <div className="w-[80%] h-[1.5px] bg-black rounded-full" />
             <div className="w-[60%] h-[1px] bg-zinc-600 rounded-full" />
           </div>
           <div className="p-1 bg-white flex flex-col items-center gap-0.5">
              <div className="w-[90%] h-[0.5px] bg-zinc-300 rounded-full" />
              <div className="w-[90%] h-[3px] rounded-sm mt-0.5" style={{ background: accent }} />
           </div>
        </div>
      </div>
    ),
    // 5: Blur Tilt
    5: (
      <div className="w-full h-full flex flex-col justify-center items-center rounded-[3px] overflow-hidden p-1 gap-1 bg-zinc-800">
        <div className="w-[90%] h-[85%] bg-surface-input/30 border border-white/20 rounded p-1 flex flex-col items-center justify-center gap-0.5 -rotate-2">
           <div className="w-4 h-4 rounded-full flex items-center justify-center mb-0.5 p-[2px]" style={{ background: accent }}>
             <div className="w-[50%] h-[50%] border-t border-r border-white rotate-45" />
           </div>
           <div className="w-[90%] h-[1.5px] bg-white rounded-full" />
           <div className="w-[60%] h-[1px] bg-white/70 rounded-full" />
           <div className="w-[90%] h-[2.5px] bg-white rounded-sm mt-0.5" />
        </div>
      </div>
    ),
    // 6: Clean Typo
    6: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden p-1 justify-between relative" style={{ background: '#020202' }}>
        <div className="w-full flex items-center gap-0.5 mt-0.5 px-0.5">
          <div className="w-1 h-1 rounded-full" style={{ background: accent }} />
          <div className="w-4 h-[1px] bg-zinc-500 rounded-full" />
        </div>
        <div className="flex-1 flex flex-col justify-center items-center gap-1 w-full">
           <div className="w-[90%] h-[3px] bg-white rounded-full" />
           <div className="w-[70%] h-[1.5px] bg-zinc-500 rounded-full" />
        </div>
        <div className="w-full h-[3.5px] rounded-sm mt-1" style={{ background: accent }} />
      </div>
    ),
    // 7: App Calendar
    7: (
      <div className="w-full h-full flex flex-col justify-center items-center rounded-[3px] overflow-hidden p-1 relative" style={{ background: '#050505' }}>
        <div className="w-[90%] mt-2 bg-[#0A0A0A] border border-white/20 rounded p-1.5 flex flex-col items-center gap-1 relative">
           <div className="absolute -top-1.5 left-1 w-3 h-3 bg-black border border-white/20 rounded p-[2px]" style={{ color: accent }}>
              <div className="w-full h-full bg-current opacity-50 rounded-[1px]" />
           </div>
           <div className="w-[90%] h-[1.5px] bg-white rounded-full mt-1" />
           <div className="w-[60%] h-[1px] bg-zinc-500 rounded-full" />
           <div className="w-full flex gap-[1px] mt-0.5 opacity-50">
             {[...Array(6)].map((_, i) => <div key={i} className="h-1 flex-1 bg-zinc-700" style={i===3 ? { background: accent }: {}} />)}
           </div>
           <div className="w-[90%] h-[2.5px] bg-white rounded mt-0.5" />
        </div>
      </div>
    ),
    // 8: Hacker Text Base
    8: (
      <div className="w-full h-full flex flex-col items-center justify-center rounded-[3px] overflow-hidden p-1.5 gap-1.5" style={{ background: '#000000' }}>
         <div className="w-[90%] h-[3px] bg-gradient-to-r from-white to-zinc-600 rounded-full" />
         <div className="w-[70%] h-[1.5px] bg-zinc-600 rounded-full" />
         <div className="w-full h-[3px] border border-dashed rounded-sm mt-0.5" style={{ borderColor: accent }} />
      </div>
    )
  };

  return (
    <div
      className={`relative w-11 h-14 rounded-md overflow-hidden transition-all duration-150 cursor-pointer ring-2 flex-shrink-0 ${
        isSelected
          ? 'ring-offset-1 ring-offset-zinc-950 scale-110'
          : 'ring-transparent hover:ring-zinc-600 hover:scale-105'
      }`}
      style={isSelected ? { '--tw-ring-color': accent } : {}}
    >
      {layouts[variantId]}
    </div>
  );
}

export default function CtaVariantPopover({ currentVariantIndex, onSelect, onClose, brandColor }) {
  const popoverRef = useRef(null);

  // Click outside → fecha
  useEffect(() => {
    const handleClick = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  return (
    <div
      ref={popoverRef}
      className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-bottom-2 duration-150"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-zinc-950/95 backdrop-blur-xl border border-zinc-800/80 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-4 min-w-[280px]">
        {/* Header */}
        <VariantPopoverHeader
          label="Variante CTA"
          activeLabel={CTA_VARIANT_META.find(v => v.id === currentVariantIndex)?.title || 'Desconhecida'}
          onClose={onClose}
        />

        {/* Grid de variantes com Scroll */}
        <div className="grid grid-cols-4 gap-2.5 max-h-[320px] overflow-y-auto pr-1.5 custom-scrollbar">
          {CTA_VARIANT_META.map((variant) => (
            <button
              key={variant.id}
              onClick={() => {
                onSelect(variant.id);
              }}
              className="flex flex-col items-center gap-1.5 group mb-2"
              title={variant.desc}
            >
              <VariantThumbnail
                variantId={variant.id}
                brandColor={brandColor}
                isSelected={currentVariantIndex === variant.id}
              />
              <span className={`text-[8px] font-medium transition-colors leading-tight text-center ${
                currentVariantIndex === variant.id ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'
              }`}>
                {variant.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

