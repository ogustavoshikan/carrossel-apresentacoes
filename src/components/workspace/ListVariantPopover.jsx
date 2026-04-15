import React, { useRef, useEffect } from 'react';
import { X, Shuffle } from 'lucide-react';
import { LIST_VARIANT_META } from '../slides/list-variants';

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
      </div>
    ),
    // 1: Dark Check / ghost numbers
    1: (
      <div className="w-full h-full flex flex-col pt-1.5 px-1.5 gap-[2px] rounded-[3px] overflow-hidden bg-[#050505]">
         <div className="w-[60%] h-[2.5px] bg-white rounded-full mb-1" />
         {[...Array(3)].map((_, i) => (
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
        <div className="flex items-center justify-between mb-3 relative">
          <div className="flex items-center gap-2 pr-12">
            <h4 className="text-[11px] font-outfit font-black uppercase tracking-widest text-zinc-400">
              Layouts de Lista
            </h4>
            <span className="text-[10px] font-mono text-zinc-600 truncate max-w-[120px]">
              {LIST_VARIANT_META.find(v => v.id === currentVariantIndex)?.nome || 'Desconhecida'}
            </span>
          </div>
          <div className="absolute -right-2 -top-2 flex items-center gap-0.5">
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                const randomIndex = Math.floor(Math.random() * LIST_VARIANT_META.length);
                onSelect(LIST_VARIANT_META[randomIndex].id); 
              }} 
              className="text-zinc-500 hover:text-white transition-colors p-1 rounded-md hover:bg-zinc-800"
              title="Variante Aleatória"
            >
              <Shuffle size={14} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="text-zinc-500 hover:text-white transition-colors p-1 rounded-md hover:bg-zinc-800">
              <X size={14} />
            </button>
          </div>
        </div>

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

