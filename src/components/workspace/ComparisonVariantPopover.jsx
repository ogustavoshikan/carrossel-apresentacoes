import React, { useRef, useEffect } from 'react';
import { Shuffle } from 'lucide-react';
import { COMPARISON_VARIANT_META } from '../slides/comparison-variants';
import VariantPopoverHeader from './VariantPopoverHeader';

/**
 * ComparisonVariantPopover — Grid visual com mini-wireframes de cada variante de comparison.
 */

// ─── Mini Wireframes ────────────────────────────────────────
function VariantThumbnail({ variantId, brandColor, isSelected }) {
  const accent = brandColor;
  const dark = '#18181b';

  const layouts = {
    // 0: Original
    0: (
      <div className="w-full h-full flex flex-col pt-1.5 px-1.5 gap-1 rounded-[3px] overflow-hidden" style={{ background: '#1c1c1c' }}>
         <div className="w-[60%] h-[2px] bg-white rounded-full" />
         <div className="w-full mt-1 flex flex-col gap-1">
           <div className="w-full p-0.5 rounded-[1px] bg-surface-input/30 flex justify-between">
              <div className="w-1/2 h-[1px] bg-zinc-500 rounded-full" />
           </div>
           <div className="w-full p-0.5 rounded-[1px] flex justify-between shadow-[0_1px_2px_rgba(0,0,0,0.5)]" style={{ background: accent }}>
              <div className="w-1/2 h-[1px] bg-white rounded-full" />
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
           </div>
         </div>
      </div>
    ),
    // 1: Variante 1
    1: (
      <div className="w-full h-full flex flex-col justify-center items-center rounded-[3px] overflow-hidden p-1.5 gap-1" style={{ background: '#050505' }}>
         <div className="w-full flex-1 flex flex-col gap-0.5">
           <div className="w-full p-1 rounded-[2px] bg-surface-input/30 opacity-50 flex" />
           <div className="w-full p-1 rounded-[2px] shadow-xl flex" style={{ background: `${accent}15` }} />
           <div className="w-full p-1 rounded-[2px] bg-surface-input/30 opacity-50 flex" />
         </div>
      </div>
    ),
    // 2: Variante 2
    2: (
      <div className="w-full h-full flex rounded-[3px] overflow-hidden">
         <div className="w-1/2 h-full bg-zinc-900 border-r border-black/20 p-1" />
         <div className="w-1/2 h-full p-1" style={{ background: accent }} />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-black rounded-full" />
      </div>
    ),
    // 3: Variante 3
    3: (
      <div className="w-full h-full flex flex-col justify-center items-center rounded-[3px] overflow-hidden p-1.5 gap-1" style={{ background: '#050505' }}>
         <div className="w-full flex-1 bg-[#0A0A0A] border border-white/10 rounded-[4px] flex flex-col items-center justify-center gap-1">
            <div className="w-full flex items-center justify-center gap-1 border-b border-white/5 pb-0.5">
              <div className="w-2 h-[1px] bg-zinc-600 rounded-full" />
              <div className="w-px h-2 bg-white/20" />
              <div className="w-2 h-[1.5px] rounded-full" style={{ background: accent }} />
            </div>
         </div>
      </div>
    ),
    // 4: Variante 4
    4: (
      <div className="w-full h-full flex flex-col justify-center rounded-[3px] overflow-hidden p-1.5 gap-1" style={{ background: '#050505' }}>
         <div className="grid grid-cols-2 gap-1 w-full flex-1">
           <div className="rounded-[2px] border border-white/20" />
           <div className="rounded-[2px] bg-white shadow-xl" />
           <div className="rounded-[2px] border border-white/20" />
           <div className="rounded-[2px] bg-white shadow-xl" />
         </div>
      </div>
    ),
    // 5: Variante 5
    5: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden p-1 gap-1" style={{ background: '#E5E5E5' }}>
         <div className="relative flex-1 w-full mt-1">
            <div className="absolute inset-0.5 bg-white border border-black/10 rounded-[3px] shadow-sm transform -rotate-6" />
            <div className="absolute inset-x-1 bottom-0 top-2 bg-black rounded-[3px] shadow-lg transform rotate-3" />
         </div>
      </div>
    ),
    // 6: Variante 6
    6: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden p-1.5 gap-1" style={{ background: '#020202' }}>
         <div className="w-[60%] h-[4px] border-l-[1px] pl-0.5 mt-1 flex items-center" style={{ borderColor: accent }}>
           <div className="w-[80%] h-[1.5px] bg-white" />
         </div>
         <div className="w-full flex flex-col mt-1 gap-1">
           <div className="w-full flex">
             <div className="w-3 h-[1px] bg-zinc-500 line-through" />
           </div>
           <div className="w-full flex">
             <div className="w-4 h-[1.5px] rounded-full" style={{ background: accent }} />
           </div>
         </div>
      </div>
    ),
    // 7: Variante 7
    7: (
      <div className="w-full h-full flex flex-col justify-center items-center rounded-[3px] overflow-hidden p-1.5 gap-1" style={{ background: '#050505' }}>
         <div className="w-full flex-1 border border-white/10 rounded-[3px] flex flex-col overflow-hidden">
           <div className="flex h-1.5 bg-black/40">
             <div className="w-1/2" />
             <div className="w-1/2 border-l border-white/10" style={{ background: `${accent}20` }} />
           </div>
           <div className="flex h-2.5 border-b border-white/5">
             <div className="w-1/2" />
             <div className="w-1/2 border-l border-white/5 bg-[#0A0A0A]" />
           </div>
         </div>
      </div>
    ),
    // 8: Variante 8
    8: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden p-1.5 gap-1" style={{ background: '#080808' }}>
         <div className="relative flex-1 w-full mt-1">
           <div className="absolute left-0 top-0 bottom-2 w-[70%] bg-zinc-900 border border-zinc-700 rounded-[3px]" />
           <div className="absolute right-0 top-2 bottom-0 w-[70%] rounded-[3px]" style={{ background: accent }} />
         </div>
      </div>
    ),
    // 9: Variante 9
    9: (
      <div className="w-full h-full flex rounded-[3px] overflow-hidden relative" style={{ background: '#050505' }}>
         <div className="absolute inset-0 bg-zinc-900" style={{ clipPath: 'polygon(0px 0px, 45% 0px, 55% 100%, 0px 100%)' }} />
         <div className="absolute inset-0 flex p-1">
            <div className="w-1/2 h-full flex flex-col items-end justify-center gap-1 pr-[1px]">
               <div className="w-[80%] h-[1px] bg-zinc-600" />
            </div>
            <div className="w-1/2 h-full flex flex-col items-start justify-center gap-1 pl-[1px] mt-2">
               <div className="w-[80%] h-[1.5px]" style={{ background: accent }} />
            </div>
         </div>
      </div>
    ),
    // 10: Variante 10
    10: (
      <div className="w-full h-full flex flex-col items-center justify-center rounded-[3px] overflow-hidden p-1.5 gap-1" style={{ background: '#080808' }}>
         <div className="w-[80%] h-2 bg-[#050505] rounded-full border border-white/10 flex p-[1px]">
           <div className="w-1/2" />
           <div className="w-1/2 rounded-full" style={{ background: accent }} />
         </div>
         <div className="w-full flex-1 bg-surface-input/30 border border-white/10 rounded-[3px]" />
      </div>
    ),
    // 11: Variante 11
    11: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden p-1.5 gap-1.5" style={{ background: '#E5E5E5' }}>
         <div className="w-full h-[3px] border-b border-black/10 relative mt-2">
            <div className="w-[60%] h-[1.5px] bg-zinc-400 line-through decoration-red-500" />
            <div className="absolute -top-1.5 right-0 w-[50%] h-[2px] transform -rotate-2" style={{ background: accent }} />
         </div>
      </div>
    ),
    // 13: Variante 13
    13: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden bg-white">
        <div className="h-[30%] w-full border-b border-zinc-100 flex flex-col items-center justify-center gap-0.5">
           <div className="w-[60%] h-[1.5px] bg-black rounded-full" />
        </div>
        <div className="flex-1 flex w-full relative">
           <div className="w-1/2 h-full bg-zinc-900 flex flex-col items-center pt-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500/40" />
           </div>
           <div className="w-1/2 h-full flex flex-col items-center pt-2" style={{ background: accent }}>
              <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
           </div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-sm flex items-center justify-center">
              <div className="w-[60%] h-[1px]" style={{ background: accent }} />
           </div>
        </div>
      </div>
    ),
    // 14: Variante 14
    14: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden relative">
        <div className="h-1/2 w-full bg-zinc-900 flex flex-col items-center justify-center gap-1">
           <div className="w-[50%] h-[1.5px] bg-white/20 rounded-full" />
        </div>
        <div className="h-1/2 w-full flex flex-col items-center justify-center gap-1" style={{ background: accent }}>
           <div className="w-[50%] h-[1.5px] bg-white/40 rounded-full" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-3 bg-white rounded-full shadow-md border border-zinc-900 flex items-center justify-center px-1">
           <div className="w-full h-[1px] bg-black rounded-full" />
        </div>
      </div>
    ),
    // 15: Variante 15
    15: (
      <div className="w-full h-full flex flex-col p-1 gap-1 rounded-[3px] overflow-hidden bg-white">
        <div className="w-[60%] h-[1.5px] bg-black rounded-full self-center my-1" />
        <div className="flex-1 flex flex-col gap-1">
           <div className="w-full h-6 bg-red-50 rounded-sm border border-red-100 p-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
           </div>
           <div className="w-full h-6 rounded-sm border p-0.5" style={{ background: `${accent}10`, borderColor: `${accent}30` }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
           </div>
        </div>
      </div>
    ),
    // 16: Variante 16
    16: (
      <div className="w-full h-full flex rounded-[3px] overflow-hidden relative">
        <div className="w-1/2 h-full bg-zinc-400" />
        <div className="w-1/2 h-full bg-zinc-800 border-l border-white" />
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[70%] h-2.5 bg-white/90 rounded-full border border-white/50" />
        <div className="absolute bottom-2 left-1 w-3 h-[1px] bg-white/40" />
        <div className="absolute bottom-2 right-1 w-3 h-[1px] bg-white/60" />
      </div>
    ),
    // 17: Variante 17
    17: (
      <div className="w-full h-full bg-zinc-900 rounded-[3px] overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[150%] h-[150%] origin-top-right rotate-[-30deg] translate-x-[20%] translate-y-[-10%]" style={{ background: accent }} />
        <div className="absolute inset-0 p-1.5 flex flex-col justify-between">
           <div className="w-[60%] h-[2px] bg-white rounded-full" />
           <div className="flex w-full justify-between pb-1">
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="w-3 h-3 rounded-full bg-white/40" />
           </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-sm" />
      </div>
    ),
    // 18: Variante 18
    18: (
      <div className="w-full h-full flex flex-col items-center justify-center p-1.5 bg-black rounded-[3px] overflow-hidden relative">
        <div className="absolute inset-0 opacity-40 bg-zinc-700" />
        <div className="w-[80%] h-[1.5px] bg-white rounded-full mb-2 z-10" />
        <div className="w-full flex flex-col gap-1 z-10">
           <div className="w-[85%] h-5 bg-white/10 border border-white/20 rounded-sm -ml-1" />
           <div className="w-[85%] h-5 bg-white/90 border rounded-sm ml-1" style={{ borderColor: accent }} />
        </div>
      </div>
    ),
    // 19: Variante 19
    19: (
      <div className="w-full h-full flex flex-col items-center justify-center p-1.5 bg-white rounded-[3px] overflow-hidden relative">
        <div className="w-[60%] h-[1.5px] bg-black rounded-full absolute top-4" />
        <div className="flex w-full mt-4 h-full">
           <div className="w-1/2 border-r border-zinc-200 flex flex-col items-center pt-2">
              <div className="w-3 h-[1px] bg-zinc-300" />
           </div>
           <div className="w-1/2 flex flex-col items-center pt-2">
              <div className="w-3 h-[1px]" style={{ background: accent }} />
           </div>
        </div>
      </div>
    ),
    // 20: Variante 20
    20: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden bg-black">
        <div className="h-[30%] w-full flex flex-col items-center justify-center gap-0.5">
           <div className="w-[60%] h-[1.5px] bg-white rounded-full" />
        </div>
        <div className="flex-1 flex w-full">
           <div className="w-1/2 h-full bg-zinc-900 flex flex-col items-center pt-2">
              <div className="w-2 h-2 rounded-full bg-white/20" />
           </div>
           <div className="w-1/2 h-full flex flex-col items-center pt-2" style={{ background: accent }}>
              <div className="w-2 h-2 rounded-full bg-white/40" />
           </div>
        </div>
      </div>
    ),
    // 21: Variante 21
    21: (
      <div className="w-full h-full flex flex-col p-1 gap-1 rounded-[3px] overflow-hidden bg-black">
        <div className="w-[50%] h-[1.5px] bg-white/20 rounded-full self-center my-1" />
        <div className="flex-1 flex flex-col gap-1">
           <div className="w-full h-6 bg-zinc-900 rounded-sm border border-zinc-800 p-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
           </div>
           <div className="w-full h-6 rounded-sm p-0.5" style={{ background: accent }}>
              <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
           </div>
        </div>
      </div>
    ),
    // 22: Variante 22
    22: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden bg-black">
        <div className="h-1/2 w-full bg-zinc-800 relative">
           <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white/20" />
        </div>
        <div className="h-1/2 w-full relative" style={{ background: accent }}>
           <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white/40" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-2.5 bg-black rounded-full border border-zinc-800" />
      </div>
    ),
    // 23: Variante 23
    23: (
      <div className="w-full h-full flex flex-col items-center justify-center p-1.5 bg-black rounded-[3px] overflow-hidden relative">
        <div className="w-[40%] h-[1px] bg-white/20 absolute top-3" />
        <div className="flex w-full mt-4 h-full">
           <div className="w-1/2 border-r border-zinc-800 flex flex-col items-center pt-2">
              <div className="w-3 h-[1px] bg-white/10" />
           </div>
           <div className="w-1/2 flex flex-col items-center pt-2">
              <div className="w-3 h-[1px]" style={{ background: accent }} />
           </div>
        </div>
      </div>
    ),
    // 24: Variante 24
    24: (
      <div className="w-full h-full flex flex-col p-2 gap-2 rounded-[3px] overflow-hidden bg-black relative">
        <div className="absolute inset-0 opacity-20 bg-zinc-700" />
        <div className="w-[60%] h-[1.5px] bg-white rounded-full self-center z-10" />
        <div className="flex-1 flex flex-col gap-2 z-10 justify-center">
           <div className="w-full h-[1px] bg-white/20 border-l-2 border-white/10" />
           <div className="w-full h-[1px] bg-white/40 border-l-2" style={{ borderColor: accent }} />
        </div>
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

export default function ComparisonVariantPopover({ currentVariantIndex, onSelect, onClose, brandColor }) {
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
          label="Variante Comparison"
          activeLabel={COMPARISON_VARIANT_META.find(v => v.id === currentVariantIndex)?.nome || 'Desconhecida'}
          onClose={onClose}
        />

        {/* Grid de variantes com Scroll */}
        <div className="grid grid-cols-4 gap-2.5 max-h-[320px] overflow-y-auto pr-1.5 custom-scrollbar">
          {COMPARISON_VARIANT_META.map((variant) => (
            <button
              key={variant.id}
              onClick={() => {
                onSelect(variant.id);
              }}
              className="flex flex-col items-center gap-1.5 group mb-2"
              title={variant.nome}
            >
              <VariantThumbnail
                variantId={variant.id}
                brandColor={brandColor}
                isSelected={currentVariantIndex === variant.id}
              />
              <span className={`text-[8px] font-medium transition-colors leading-tight text-center ${
                currentVariantIndex === variant.id ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'
              }`}>
                {variant.nome}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

