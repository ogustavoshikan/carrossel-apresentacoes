import React, { useRef, useEffect } from 'react';
import { Shuffle } from 'lucide-react';
import { QUOTE_VARIANT_META } from '../slides/quote-variants';
import VariantPopoverHeader from './VariantPopoverHeader';
import { cn } from '../../lib/utils';

/**
 * QuoteVariantPopover — Grid visual com mini-wireframes de cada variante de quote.
 */

// ─── Mini Wireframes ────────────────────────────────────────
function VariantThumbnail({ variantId, brandColor, isSelected }) {
  const accent = brandColor;
  const dark = '#18181b';
  const img = '#3f3f46';

  const layouts = {
    // 0: Original — centralizado fundo branco
    0: (
      <div className="w-full h-full flex flex-col justify-center items-center rounded-[3px] overflow-hidden p-1.5 gap-1.5" style={{ background: '#f4f4f5' }}>
        <div className="w-4 h-4 text-zinc-300">"</div>
        <div className="w-3 h-[2px] rounded-full" style={{ background: accent }} />
        <div className="w-[80%] h-[2.5px] bg-zinc-800 rounded-full" />
        <div className="w-[60%] h-[2px] bg-zinc-400 rounded-full mt-0.5" />
      </div>
    ),
    // 1: Classic dark
    1: (
      <div className="w-full h-full flex flex-col justify-center rounded-[3px] overflow-hidden p-1.5 pl-2.5 gap-1" style={{ background: '#050505' }}>
        <div className="absolute left-0 top-1/4 bottom-1/4 w-[2px] rounded-r-md" style={{ background: accent }} />
        <div className="text-zinc-700 leading-none" style={{ fontSize: '10px' }}>"</div>
        <div className="w-[80%] h-[2.5px] bg-white rounded-full mt-0.5" />
        <div className="w-[50%] h-[2px] bg-zinc-500 rounded-full" />
      </div>
    ),
    // 2: Blur Movie
    2: (
      <div className="w-full h-full flex flex-col justify-center items-center rounded-[3px] overflow-hidden p-1.5 gap-1" style={{ background: '#050505' }}>
        <div className="w-[90%] h-[2.5px] bg-white rounded-full" />
        <div className="w-[60%] h-[2.5px] bg-white rounded-full" />
        <div className="w-[40%] h-[2px] rounded-full mt-1" style={{ background: accent }} />
      </div>
    ),
    // 3: Brand Main
    3: (
      <div className="w-full h-full flex flex-col justify-center items-center rounded-[3px] overflow-hidden p-1.5 gap-1" style={{ background: accent }}>
        <div className="w-[80%] h-[3px] bg-white rounded-full" />
        <div className="w-[50%] h-[3px] bg-white rounded-full" />
        <div className="w-4 h-[1px] bg-surface-input/300 rounded-full mt-0.5" />
        <div className="w-[40%] h-[1.5px] bg-white/90 rounded-full" />
      </div>
    ),
    // 4: Side Dark
    4: (
      <div className="w-full h-full flex rounded-[3px] overflow-hidden" style={{ background: dark }}>
        <div className="w-[30%] h-full bg-zinc-700/50" />
        <div className="w-[70%] h-full flex flex-col justify-center p-1.5 gap-1">
          <div className="w-2 h-2 rounded-sm" style={{ background: accent }} />
          <div className="w-[85%] h-[2px] bg-white rounded-full mt-0.5" />
          <div className="w-[45%] h-[1.5px] bg-zinc-500 rounded-full mt-0.5" />
        </div>
      </div>
    ),
    // 5: Bento Card
    5: (
      <div className="w-full h-full flex flex-col justify-center items-center rounded-[3px] overflow-hidden p-1.5" style={{ background: '#020202' }}>
        <div className="w-[90%] h-[80%] border border-white/20 rounded bg-surface-input/30 p-1 flex flex-col items-center justify-center gap-1.5 relative">
          <div className="absolute -top-1.5 w-3 h-3 bg-[#020202] rounded-sm flex items-center justify-center" style={{ left: '2px' }}>
            <div className="w-1.5 h-1.5 rounded-sm" style={{ background: accent }} />
          </div>
          <div className="w-[80%] h-[2px] bg-white rounded-full" />
          <div className="w-[50%] h-[1.5px] bg-zinc-500 rounded-full mt-1" />
        </div>
      </div>
    ),
    // 6: Simple Top
    6: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden p-1.5 justify-center gap-1.5" style={{ background: '#18181b' }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: accent }} />
        <div className="w-[40%] h-[1.5px] bg-zinc-500 rounded-full mt-1" />
        <div className="w-[90%] h-[2.5px] bg-white rounded-full" />
        <div className="w-[60%] h-[2.5px] bg-white rounded-full" />
      </div>
    ),
    // 7: White Box
    7: (
      <div className="w-full h-full flex flex-col justify-center items-center rounded-[3px] overflow-hidden p-1.5" style={{ background: '#050505' }}>
        <div className="w-[80%] h-[80%] bg-white rounded border border-zinc-500 p-1 flex flex-col items-center justify-center gap-1 relative shadow-[2px_2px_0_0_rgba(255,255,255,0.2)]">
          <div className="absolute -top-1 -left-1 w-2.5 h-2.5 rounded-[1px]" style={{ background: accent }} />
          <div className="w-[80%] h-[2px] bg-black rounded-full" />
          <div className="w-[50%] h-[1px] bg-zinc-500 rounded-full" />
        </div>
      </div>
    ),
    // 8: Vertical Auth
    8: (
      <div className="w-full h-full flex rounded-[3px] overflow-hidden" style={{ background: '#050505' }}>
        <div className="w-[20%] h-full flex items-center justify-center" style={{ background: accent }}>
          <div className="w-[1px] h-[60%] bg-black/40 rounded-full" />
        </div>
        <div className="w-[80%] h-full bg-[#020202] flex items-center p-1.5">
          <div className="w-[80%] h-[2.5px] bg-white rounded-full" />
        </div>
      </div>
    ),
    // 9: Gradient Text
    9: (
      <div className="w-full h-full flex flex-col items-center justify-center rounded-[3px] overflow-hidden p-1.5 gap-1.5" style={{ background: '#050505' }}>
        <div className="w-[90%] h-[3.5px] bg-gradient-to-r from-white to-zinc-600 rounded-full" />
        <div className="w-[60%] h-[3.5px] bg-gradient-to-r from-white to-zinc-600 rounded-full" />
        <div className="w-[40%] h-[1.5px] rounded-full mt-1" style={{ background: accent }} />
      </div>
    ),
    // 10: Glass Card
    10: (
      <div className="w-full h-full flex flex-col justify-center rounded-[3px] overflow-hidden p-1.5 gap-1" style={{ background: '#080808' }}>
        <div className="w-[90%] bg-surface-input/30 border border-white/20 p-1.5 rounded-sm rounded-bl-none flex items-center">
           <div className="w-[70%] h-[2px] bg-white rounded-full" />
        </div>
        <div className="w-[40%] h-[1.5px] bg-zinc-500 rounded-full ml-1" />
      </div>
    ),
    // 11: Light Print
    11: (
      <div className="w-full h-full flex flex-col justify-center border-[2px] border-white rounded-[3px] overflow-hidden p-1.5 gap-1" style={{ background: '#E5E5E5' }}>
        <div className="flex gap-1 items-center pl-1 border-l" style={{ borderColor: accent }}>
           <div className="flex flex-col gap-1 w-full relative">
             <div className="w-[80%] h-[2.5px] bg-black rounded-full" />
             <div className="w-[50%] h-[2.5px] bg-black rounded-full" />
             <div className="w-[40%] h-[1.5px] bg-zinc-500 rounded-full mt-0.5" />
           </div>
        </div>
      </div>
    ),
    // 12: Client Photo
    12: (
      <div className="w-full h-full flex flex-col justify-center rounded-[3px] overflow-hidden p-1.5 gap-1.5" style={{ background: '#050505' }}>
        <div className="w-[85%] h-[2px] bg-white rounded-full self-center" />
        <div className="w-[60%] h-[2px] bg-white rounded-full self-center" />
        <div className="flex items-center gap-1 mt-1">
           <div className="w-4 h-4 rounded-full" style={{ background: img }} />
           <div className="flex flex-col gap-0.5">
             <div className="w-6 h-[1.5px] bg-white/80 rounded-full" />
             <div className="w-4 h-[1px] bg-zinc-500 rounded-full" />
           </div>
        </div>
      </div>
    )
  };

  return (
    <div
      className={cn(
        'relative w-11 h-14 rounded-md overflow-hidden transition-all duration-150 cursor-pointer ring-2 flex-shrink-0',
        isSelected
          ? 'ring-offset-1 ring-offset-zinc-950 scale-110'
          : 'ring-transparent hover:ring-zinc-600 hover:scale-105'
      )}
      style={isSelected ? { '--tw-ring-color': accent } : {}}
    >
      {layouts[variantId]}
    </div>
  );
}

export default function QuoteVariantPopover({ currentVariantIndex, onSelect, onClose, brandColor }) {
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
      <div className="bg-zinc-950/95 backdrop-blur-xl border border-zinc-800/80 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-4 min-w-[320px] max-w-[380px]">
        {/* Header */}
        <VariantPopoverHeader
          label="Variante Quote"
          activeLabel={QUOTE_VARIANT_META.find(v => v.id === currentVariantIndex)?.name || 'Desconhecida'}
          onClose={onClose}
        />

        {/* Grid de variantes com Scroll */}
        <div className="grid grid-cols-4 gap-2.5 max-h-[320px] overflow-y-auto pr-1.5 custom-scrollbar">
          {QUOTE_VARIANT_META.map((variant) => (
            <button
              key={variant.id}
              onClick={() => {
                onSelect(variant.id);
              }}
              className="flex flex-col items-center gap-1.5 group mb-2"
              title={variant.description}
            >
              <VariantThumbnail
                variantId={variant.id}
                brandColor={brandColor}
                isSelected={currentVariantIndex === variant.id}
              />
              <span className={cn(
                'text-[8px] font-medium transition-colors leading-tight text-center',
                currentVariantIndex === variant.id ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'
              )}>
                {variant.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

