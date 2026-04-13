import React, { useRef, useEffect } from 'react';
import { X, Shuffle } from 'lucide-react';
import { COMPARISON_VARIANT_META } from '../slides/comparison-variants';

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
           <div className="w-full p-0.5 rounded-[1px] bg-white/10 flex justify-between">
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
           <div className="w-full p-1 rounded-[2px] bg-white/5 opacity-50 flex" />
           <div className="w-full p-1 rounded-[2px] shadow-xl flex" style={{ background: `${accent}15` }} />
           <div className="w-full p-1 rounded-[2px] bg-white/5 opacity-50 flex" />
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
         <div className="w-full flex-1 bg-white/5 border border-white/10 rounded-[3px]" />
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
    )
  };

  return (
    <div
      className={`w-11 h-14 rounded-md overflow-hidden transition-all duration-200 cursor-pointer ring-2 flex-shrink-0 ${
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
      className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-bottom-2 duration-200"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-zinc-950/95 backdrop-blur-xl border border-zinc-800/80 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-4 min-w-[320px] max-w-[380px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 relative">
          <div className="flex items-center gap-2 pr-12">
            <h4 className="text-[11px] font-outfit font-black uppercase tracking-widest text-zinc-400">
              Variante Comparison
            </h4>
            <span className="text-[10px] font-mono text-zinc-600 truncate max-w-[120px]">
              {COMPARISON_VARIANT_META.find(v => v.id === currentVariantIndex)?.nome || 'Desconhecida'}
            </span>
          </div>
          <div className="absolute -right-2 -top-2 flex items-center gap-0.5">
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                const randomIndex = Math.floor(Math.random() * COMPARISON_VARIANT_META.length);
                onSelect(COMPARISON_VARIANT_META[randomIndex].id); 
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
