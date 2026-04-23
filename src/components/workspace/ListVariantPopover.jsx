import React, { useRef, useEffect } from 'react';
import { Shuffle } from 'lucide-react';
import { LIST_VARIANT_META } from '../slides/list-variants';
import VariantPopoverHeader from './VariantPopoverHeader';
import { cn } from '../../lib/utils';

function VariantThumbnail({ variantId, brandColor, isSelected }) {
  const accent = brandColor;
  
  const layouts = {
    // 0: Original
    0: (
      <div className="w-full h-full flex flex-col pt-1.5 px-1.5 gap-[2px] rounded-[3px] overflow-hidden bg-[#050505]">
         <div className="w-[60%] h-[2.5px] bg-white rounded-full mb-1" />
         <div className="flex gap-1 items-start">
           <div className="w-2 h-2 rounded-[2px]" style={{ background: accent }} />
           <div className="w-[70%] h-[1.5px] bg-surface-input/300 rounded-full mt-0.5" />
         </div>
         <div className="flex gap-1 items-start">
           <div className="w-2 h-2 rounded-[2px]" style={{ background: accent }} />
           <div className="w-[80%] h-[1.5px] bg-surface-input/300 rounded-full mt-0.5" />
         </div>
         <div className="flex gap-1 items-start">
           <div className="w-2 h-2 rounded-[2px]" style={{ background: accent }} />
           <div className="w-[60%] h-[1.5px] bg-surface-input/300 rounded-full mt-0.5" />
         </div>
         <div className="flex gap-1 items-start">
           <div className="w-2 h-2 rounded-[2px]" style={{ background: accent }} />
           <div className="w-[75%] h-[1.5px] bg-surface-input/300 rounded-full mt-0.5" />
         </div>
      </div>
    ),
    // 1: Dark Check / ghost numbers
    1: (
      <div className="w-full h-full flex flex-col pt-1.5 px-1.5 gap-[2px] rounded-[3px] overflow-hidden bg-[#050505]">
         <div className="w-[60%] h-[2.5px] bg-white rounded-full mb-1" />
         {[...Array(4)].map((_, i) => (
           <div key={i} className="flex gap-1 items-center border-b border-white/10 pb-[1px]">
             <div className="w-1.5 h-2 bg-white/20 rounded-[1px]" />
             <div className="flex-1 h-[1.5px] bg-surface-input/300 rounded-full" />
           </div>
         ))}
      </div>
    ),
    // 2: Side Bar (border left color)
    2: (
      <div className="w-full h-full flex flex-col justify-center gap-1 rounded-[3px] overflow-hidden bg-[#050505] p-1">
         {[...Array(3)].map((_, i) => (
           <div key={i} className="w-full h-[8px] bg-[#0A0A0A] border-l-[1.5px] rounded-r-sm p-[1px] flex flex-col gap-[1px]" style={{ borderLeftColor: accent }}>
             <div className="w-[60%] h-[1px] bg-white rounded-full" />
             <div className="w-[80%] h-[1px] bg-white/40 rounded-full" />
           </div>
         ))}
      </div>
    ),
    // 3: Circular Bullet (Bullet Minimal)
    3: (
      <div className="w-full h-full flex flex-col justify-center px-2 border-l border-white/20 ml-1 rounded-[3px] bg-[#050505] gap-1.5 relative">
         {[...Array(3)].map((_, i) => (
           <div key={i} className="relative w-full h-[6px] bg-surface-input/30 rounded-sm p-[1px]">
             <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-1 h-1 rounded-full border-[1px] border-black" style={{ background: accent }} />
             <div className="w-[90%] h-[1.5px] bg-surface-input/300 rounded-full" />
           </div>
         ))}
      </div>
    ),
    // 4: Timeline
    4: (
      <div className="w-full h-full flex flex-col justify-center relative rounded-[3px] bg-[#080808] p-1 gap-1">
         <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/20" />
         {[...Array(3)].map((_, i) => {
           const isLeft = i % 2 === 0;
           return (
             <div key={i} className={`flex w-full items-center ${isLeft ? 'justify-start' : 'justify-end'} relative`}>
               <div className={`w-[45%] h-[6px] bg-[#0A0A0A] rounded-[2px] border border-white/10`} />
               <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full border-[1px] border-black" style={{ background: accent }} />
             </div>
           );
         })}
      </div>
    ),
    // 5: Stacked
    5: (
      <div className="w-full h-full flex flex-col justify-end pt-2 pb-1 px-1 rounded-[3px] bg-[#050505] relative">
         <div className="absolute top-2 w-[85%] left-1/2 -translate-x-1/2 h-[12px] bg-zinc-800 rounded-sm scale-90" />
         <div className="absolute top-4 w-[90%] left-1/2 -translate-x-1/2 h-[14px] bg-zinc-800 rounded-sm scale-95" />
         <div className="relative w-full h-[18px] bg-zinc-800 rounded-sm border border-white/20 shadow-xl" />
      </div>
    ),
    // 6: Bento Grid
    6: (
      <div className="w-full h-full rounded-[3px] bg-[#080808] p-1 flex flex-col">
         <div className="flex-1 grid grid-cols-2 grid-rows-3 gap-[2px]">
           <div className="col-span-2 row-span-2 bg-zinc-800 rounded-[2px]" />
           <div className="col-span-1 row-span-1 bg-zinc-800 rounded-[2px]" />
           <div className="col-span-1 row-span-1 bg-zinc-800 rounded-[2px]" />
         </div>
      </div>
    ),
    // 7: Line Connect
    7: (
      <div className="w-full h-full flex flex-col justify-center relative rounded-[3px] bg-[#050505] p-1 gap-1 pl-2.5">
         <div className="absolute left-[5px] top-1 bottom-1 w-[1.5px] bg-white/20" />
         {[...Array(3)].map((_, i) => (
           <div key={i} className="flex w-full items-center gap-1 relative">
             <div className="absolute -left-[9px] w-2 h-2 rounded-full border-[1px] border-black bg-zinc-800 flex items-center justify-center">
                <div className="w-0.5 h-0.5 rounded-full" style={{ background: accent }} />
             </div>
             <div className="flex-1 h-[8px] bg-zinc-800 rounded-[2px]" />
           </div>
         ))}
      </div>
    ),
    // 8: Big Numbers (ghost background)
    8: (
      <div className="w-full h-full flex flex-col justify-center rounded-[3px] bg-[#080808] p-1 gap-1">
         {[...Array(3)].map((_, i) => (
           <div key={i} className="w-full h-[10px] bg-surface-input/30 rounded-[2px] relative overflow-hidden flex items-center px-1">
              <div className="w-[60%] h-[1.5px]" style={{ background: accent }} />
              <div className="absolute -right-1 -bottom-1 w-4 h-4 bg-white/20 rounded-full" />
           </div>
         ))}
      </div>
    ),
    // 9: Grid Mode
    9: (
      <div className="w-full h-full flex flex-col justify-center rounded-[3px] bg-[#050505] p-1">
         <div className="grid grid-cols-2 gap-1 w-full relative">
           {[...Array(4)].map((_, i) => (
             <div key={i} className="h-[12px] bg-zinc-800 rounded-[2px] flex items-center p-[1px]">
                <div className="w-1.5 h-1.5 rounded-full ml-[1px]" style={{ background: accent }} />
             </div>
           ))}
         </div>
      </div>
    ),
    // 10: Staggered
    10: (
      <div className="w-full h-full flex flex-col justify-center rounded-[3px] bg-[#050505] p-1 gap-0.5">
         {[...Array(3)].map((_, i) => (
           <div key={i} className="w-[70%] h-[8px] bg-surface-input/30 rounded-[2px] flex items-center px-[1px] gap-0.5" style={{ marginLeft: `${i * 10}%` }}>
              <div className="w-1.5 h-1.5 bg-black rounded-full" />
              <div className="w-3 h-[1.5px] bg-white/60 rounded-full" />
           </div>
         ))}
      </div>
    ),
    // 11: Badges
    11: (
      <div className="w-full h-full flex flex-col items-center justify-center rounded-[3px] bg-zinc-950 p-1 gap-1.5">
         <div className="flex gap-[2px] justify-center">
           <div className="w-[12px] h-[4px] bg-zinc-900 border border-zinc-800 rounded-full flex items-center p-[1px]">
             <div className="w-[1.5px] h-[1.5px] rounded-full" style={{ background: accent }} />
           </div>
           <div className="w-[14px] h-[4px] bg-zinc-900 border border-zinc-800 rounded-full flex items-center p-[1px]">
             <div className="w-[1.5px] h-[1.5px] rounded-full" style={{ background: accent }} />
           </div>
         </div>
         <div className="w-[90%] h-[12px] bg-zinc-900 border border-zinc-800 rounded-[3px] flex items-center justify-center px-1">
           <div className="w-[80%] h-[1px] bg-surface-input/300" />
         </div>
      </div>
    ),
    // 12: Checklist Gold
    12: (
      <div className="w-full h-full flex flex-col justify-center rounded-[3px] bg-zinc-950 p-1.5 gap-1.5">
         {[...Array(3)].map((_, i) => (
           <div key={i} className="flex items-center gap-1.5">
             <div className="w-2.5 h-2.5 rounded-full flex items-center justify-center" style={{ background: `${accent}20`, border: `0.5px solid ${accent}40` }}>
               <div className="w-1 h-1 rounded-full" style={{ background: accent }} />
             </div>
             <div className="flex-1 flex flex-col gap-0.5">
               <div className="w-[80%] h-[1px] bg-white/80" />
               <div className="w-[40%] h-[0.5px] bg-white/30" />
             </div>
           </div>
         ))}
      </div>
    ),
    // 13: Step-by-Step
    13: (
      <div className="w-full h-full flex flex-col justify-center rounded-[3px] bg-[#080808] p-1.5 gap-2 relative overflow-hidden">
         {[...Array(3)].map((_, i) => (
           <div key={i} className="relative flex flex-col justify-center pl-4 border-l" style={{ borderColor: accent }}>
             <div className="absolute -left-1 -top-1 opacity-10 font-black text-[14px]" style={{ color: accent }}>{i+1}</div>
             <div className="w-[70%] h-[1.5px] bg-white/80 mb-0.5" />
             <div className="w-[40%] h-[1px] bg-white/30" />
           </div>
         ))}
      </div>
    ),
    // 14: Premium Tag
    14: (
      <div className="w-full h-full flex flex-col pt-1 px-1.5 gap-1 rounded-[3px] overflow-hidden bg-zinc-50">
        <div className="w-3 h-1 rounded-full" style={{ background: accent }} />
        <div className="w-[70%] h-1 bg-zinc-800 rounded-full" />
        <div className="flex flex-col gap-1 mt-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-1 items-center border-b border-zinc-200 pb-0.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
              <div className="flex-1 h-[1px] bg-zinc-300" />
            </div>
          ))}
        </div>
      </div>
    ),
    // 15: Dark Path
    15: (
      <div className="w-full h-full flex flex-col pt-2 px-1.5 gap-2 rounded-[3px] overflow-hidden bg-zinc-900 relative">
        <div className="absolute left-[7px] top-4 bottom-4 w-[0.5px] bg-white/20" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-2 items-center relative z-10">
            <div className="w-1.5 h-1.5 rounded-full border border-black" style={{ background: accent }} />
            <div className="flex-1 h-[1px] bg-zinc-600" />
          </div>
        ))}
      </div>
    ),
    // 16: Card Grid
    16: (
      <div className="w-full h-full p-1 rounded-[3px] bg-zinc-100 grid grid-cols-2 gap-1 content-center">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-4 bg-white rounded-[1px] border border-zinc-200 p-0.5">
            <div className="w-1.5 h-1.5 bg-zinc-200" />
          </div>
        ))}
      </div>
    ),
    // 17: Ghost Numbers
    17: (
      <div className="w-full h-full flex flex-col p-1.5 gap-2 rounded-[3px] overflow-hidden bg-zinc-50 justify-center">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-2 items-center relative">
            <span className="text-[12px] font-black opacity-10" style={{ color: accent }}>{i+1}</span>
            <div className="flex-1 h-[1px] bg-zinc-300" />
          </div>
        ))}
      </div>
    ),
    // 18: Expert Checklist
    18: (
      <div className="w-full h-full flex flex-col p-1.5 gap-1.5 rounded-[3px] overflow-hidden bg-zinc-900 justify-center">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-1.5 items-center bg-zinc-800 p-0.5 rounded-[1px] border border-zinc-700">
            <div className="w-1.5 h-1.5 bg-zinc-600 rounded-[1px]" />
            <div className="flex-1 h-[1px] bg-zinc-500" />
          </div>
        ))}
      </div>
    ),
    // 19: Side Border
    19: (
      <div className="w-full h-full flex flex-col p-1.5 gap-1.5 rounded-[3px] overflow-hidden bg-zinc-50 justify-center">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex flex-col gap-0.5 bg-white border-l border-zinc-200 p-0.5" style={{ borderLeftColor: accent }}>
            <div className="w-3 h-[0.5px] bg-zinc-400" />
            <div className="w-5 h-[1px] bg-zinc-800" />
          </div>
        ))}
      </div>
    ),
    // 20: Clean Timeline
    20: (
      <div className="w-full h-full flex flex-col p-2 gap-2 rounded-[3px] overflow-hidden bg-zinc-50 relative justify-center">
        <div className="absolute left-[10.5px] top-2 bottom-2 w-[0.5px] bg-zinc-200" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-2 items-center relative z-10">
            <div className="w-1.5 h-1.5 rounded-full border border-white" style={{ borderColor: accent }} />
            <div className="flex-1 h-[1px] bg-zinc-400" />
          </div>
        ))}
      </div>
    ),
    // 21: Elegant List
    21: (
      <div className="w-full h-full flex flex-col p-2 gap-2 rounded-[3px] overflow-hidden bg-zinc-50 justify-center">
        <div className="w-[60%] h-[1.5px] bg-zinc-800 mb-1" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full" style={{ background: accent }} />
              <div className="flex-1 h-[1px] bg-zinc-300" />
            </div>
            <div className="w-full h-[0.5px] bg-zinc-200" />
          </div>
        ))}
      </div>
    ),
    // 22: Split Abstract
    22: (
      <div className="w-full h-full flex rounded-[3px] overflow-hidden bg-zinc-50">
        <div className="w-[30%] h-full bg-zinc-200 flex items-center justify-center">
           <div className="w-4 h-4 rounded-full border border-zinc-400" />
        </div>
        <div className="flex-1 flex flex-col p-1.5 justify-center gap-1.5">
           {[...Array(3)].map((_, i) => (
             <div key={i} className="flex items-center gap-1">
               <div className="w-1.5 h-[0.5px] bg-zinc-400" style={{ background: accent }} />
               <div className="flex-1 h-[1px] bg-zinc-300" />
             </div>
           ))}
        </div>
      </div>
    ),
    // 23: Focus Highlight
    23: (
      <div className="w-full h-full flex flex-col p-1.5 gap-1 rounded-[3px] overflow-hidden bg-zinc-50 justify-center">
        <div className="h-3 bg-white border border-zinc-200 rounded-[2px]" />
        <div className="h-4 rounded-[2px] flex items-center px-1 shadow-sm" style={{ background: accent }}>
           <div className="w-full h-[1px] bg-white/40" />
        </div>
        <div className="h-3 bg-white border border-zinc-200 rounded-[2px]" />
      </div>
    ),
    // 24: Stepped Right
    24: (
      <div className="w-full h-full flex flex-col p-1.5 gap-1.5 rounded-[3px] overflow-hidden bg-zinc-50">
        <div className="w-[40%] h-[1.5px] bg-zinc-800 self-end mb-1" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex flex-col gap-1" style={{ paddingLeft: `${i * 4}px` }}>
            <div className="w-2 h-[1px]" style={{ background: accent }} />
            <div className="w-5 h-[1px] bg-zinc-300" />
          </div>
        ))}
      </div>
    ),
    // 25: Rounded Grid
    25: (
      <div className="w-full h-full p-1 rounded-[3px] bg-zinc-50 grid grid-cols-2 gap-1 content-center">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-5 bg-white rounded-[4px] border border-zinc-100 flex flex-col items-center justify-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ background: accent }} />
            <div className="w-3 h-[0.5px] bg-zinc-200" />
          </div>
        ))}
      </div>
    ),
    // 26: Split Premium
    26: (
      <div className="w-full h-full flex rounded-[3px] overflow-hidden bg-zinc-50">
        <div className="w-[35%] h-full flex flex-col p-1 gap-1" style={{ background: accent }}>
           <div className="w-2 h-[0.5px] bg-white/40" />
           <div className="w-4 h-[1px] bg-white" />
        </div>
        <div className="flex-1 flex flex-col p-1.5 justify-center gap-1.5">
           {[...Array(3)].map((_, i) => (
             <div key={i} className="border-b border-zinc-200 pb-0.5">
               <div className="w-2 h-[1px]" style={{ background: accent }} />
             </div>
           ))}
        </div>
      </div>
    ),
    // 27: Gallery List
    27: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden bg-white">
        <div className="h-[40%] bg-zinc-200" />
        <div className="flex-1 p-1.5 grid grid-cols-2 gap-1 content-center">
           {[...Array(4)].map((_, i) => (
             <div key={i} className="h-4 bg-zinc-50 border border-zinc-100 rounded-[2px]" />
           ))}
        </div>
      </div>
    ),
    // 28: Dark Numbers
    28: (
      <div className="w-full h-full flex flex-col p-1.5 gap-1.5 rounded-[3px] overflow-hidden bg-black justify-center">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-2 items-center">
            <span className="text-[12px] font-black opacity-30" style={{ color: accent }}>{i+1}</span>
            <div className="flex-1 h-[1.5px] bg-zinc-800 border-l border-white" style={{ borderLeftColor: accent }} />
          </div>
        ))}
      </div>
    ),
    // 29: Glass Cards
    29: (
      <div className="w-full h-full flex flex-col p-1.5 gap-1 rounded-[3px] overflow-hidden bg-zinc-900 justify-center">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-4 bg-white/10 border border-white/20 rounded-[4px] flex items-center px-1">
             <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
          </div>
        ))}
      </div>
    ),
    // 30: Pill Shape
    30: (
      <div className="w-full h-full flex flex-col p-1.5 gap-1 rounded-[3px] overflow-hidden bg-zinc-50 justify-center">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-4 bg-white border border-zinc-200 rounded-full flex items-center px-2 gap-1.5">
             <div className="w-1 h-1 rounded-full" style={{ background: accent }} />
             <div className="flex-1 h-[1px] bg-zinc-200" />
          </div>
        ))}
      </div>
    )
  };

  return (
    <div
      className={`w-11 h-14 rounded-md overflow-hidden transition-all duration-150 cursor-pointer ring-2 flex-shrink-0 relative ${
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

export function ListVariantPopover({ currentVariantIndex, onSelect, onClose, brandColor }) {
  const popoverRef = useRef(null);

  // Click outside to close
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
          label="Layouts de Lista"
          activeLabel={LIST_VARIANT_META.find(v => v.id === currentVariantIndex)?.nome || 'Desconhecida'}
          onClose={onClose}
        />

        {/* Grid de variantes com Scroll */}
        <div className="grid grid-cols-4 gap-2.5 max-h-[320px] overflow-y-auto pr-1.5 custom-scrollbar">
          {LIST_VARIANT_META.map((variant) => (
            <button
              key={variant.id}
              onClick={() => {
                onSelect(variant.id);
              }}
              className="flex flex-col items-center gap-1.5 group relative mb-2"
              title={variant.nome}
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
                {variant.nome}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

