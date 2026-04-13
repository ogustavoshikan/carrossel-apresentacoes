import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { SPLIT_VARIANT_META } from '../slides/split-variants';

/**
 * SplitVariantPopover — Grid visual com mini-wireframes de cada variante de content-split.
 * Abre acima do botão "Variante".
 */

// ─── Mini Wireframes ────────────────────────────────────────
function VariantThumbnail({ variantId, brandColor, isSelected }) {
  const accent = brandColor;
  const img = '#3f3f46';
  const dark = '#18181b';

  const layouts = {
    // 0: Original — imagem arredondada + tag + título + texto
    0: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden p-1.5 gap-1" style={{ background: dark }}>
        <div className="w-full h-[45%] rounded-lg" style={{ background: img }} />
        <div className="flex items-center gap-1">
          <div className="w-2 h-[1.5px] rounded-full" style={{ background: accent }} />
          <div className="w-3 h-[1.5px] rounded-full opacity-60" style={{ background: accent }} />
        </div>
        <div className="w-[70%] h-[3px] bg-white/80 rounded-full" />
        <div className="w-[55%] h-[2px] bg-zinc-500/60 rounded-full" />
      </div>
    ),
    // 1: Hero Top — imagem maior + tag + título + texto
    1: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden p-1.5 gap-1" style={{ background: '#050505' }}>
        <div className="w-full h-[50%] rounded-xl" style={{ background: img }} />
        <div className="flex items-center gap-1">
          <div className="w-2 h-[1.5px] rounded-full" style={{ background: accent }} />
          <div className="w-3 h-[1.5px] rounded-full opacity-60" style={{ background: accent }} />
        </div>
        <div className="w-[65%] h-[3px] bg-white/80 rounded-full" />
        <div className="w-[45%] h-[2px] bg-zinc-500/60 rounded-full" />
        <div className="w-[55%] h-[2px] bg-zinc-500/40 rounded-full" />
      </div>
    ),
    // 2: Side Split — imagem lateral esquerda + texto direita
    2: (
      <div className="w-full h-full flex rounded-[3px] overflow-hidden" style={{ background: dark }}>
        <div className="w-[45%] h-full border-r border-white/10" style={{ background: img }} />
        <div className="flex-1 p-1.5 flex flex-col justify-center gap-1">
          <div className="w-[80%] h-[1.5px] rounded-full bg-white/20" />
          <div className="w-[70%] h-[3px] bg-white/80 rounded-full" />
          <div className="w-[90%] h-[3px] bg-white/80 rounded-full" />
          <div className="w-[55%] h-[2px] bg-zinc-500/60 rounded-full mt-0.5" />
        </div>
      </div>
    ),
    // 3: Text Top — texto superior + imagem inferior
    3: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden" style={{ background: dark }}>
        <div className="h-[50%] border-b border-white/10 p-1.5 flex flex-col justify-center gap-1">
          <div className="w-3 h-[1.5px] rounded-full" style={{ background: accent }} />
          <div className="w-[70%] h-[3px] bg-white/80 rounded-full" />
          <div className="w-[55%] h-[2px] bg-zinc-500/60 rounded-full" />
        </div>
        <div className="h-[50%]" style={{ background: img }} />
      </div>
    ),
    // 4: Bento Grid — grid 2 colunas
    4: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden p-1 gap-1" style={{ background: '#050505' }}>
        <div className="w-full h-[35%] rounded-md bg-white/5 border border-white/10 flex flex-col justify-center px-1 gap-0.5">
          <div className="w-[30%] h-[1.5px] bg-zinc-600 rounded-full" />
          <div className="w-[60%] h-[2.5px] bg-white/70 rounded-full" />
        </div>
        <div className="flex-1 flex gap-1">
          <div className="flex-1 rounded-md border border-white/10" style={{ background: img }} />
          <div className="flex-1 rounded-md bg-white/5 border border-white/10 p-1 flex flex-col justify-center gap-1">
            <div className="w-full h-[1.5px] bg-zinc-500/60 rounded-full" />
            <div className="w-[80%] h-[1.5px] bg-zinc-500/50 rounded-full" />
            <div className="w-3 h-3 rounded-full mt-0.5 shrink-0" style={{ background: accent }} />
          </div>
        </div>
      </div>
    ),
    // 5: Brutalist — bordas grossas, preto/cinza
    5: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden border-[2px] border-black" style={{ background: '#E5E5E5' }}>
        <div className="h-[50%] bg-black p-1 flex flex-col justify-end border-b-[2px] border-black">
          <div className="w-[70%] h-[3px] bg-white/90 rounded-full" />
          <div className="w-[55%] h-[2.5px] bg-white/90 rounded-full mt-0.5" />
        </div>
        <div className="h-[50%] flex">
          <div className="w-1/2 p-1 flex flex-col justify-center gap-0.5 border-r-[2px] border-black">
            <div className="w-full h-[1.5px] bg-black/60 rounded-full" />
            <div className="w-[80%] h-[1.5px] bg-black/50 rounded-full" />
          </div>
          <div className="w-1/2" style={{ background: img }} />
        </div>
      </div>
    ),
    // 7: Fashion Overlap
    7: (
      <div className="w-full h-full flex items-center justify-center rounded-[3px] overflow-hidden p-2 relative" style={{ background: '#0A0A0A' }}>
        <div className="w-full h-[80%] bg-white rounded-xl shadow-lg flex flex-col items-center justify-center p-1.5 gap-1 relative">
           <div className="w-[30%] h-[1.5px] rounded-full" style={{ background: accent }} />
           <div className="w-[80%] h-[3px] bg-black/80 rounded-full" />
           <div className="w-[60%] h-[1.5px] bg-black/20 rounded-full" />
           <div className="absolute -top-2 -right-1 w-5 h-5 rounded-full border border-white shadow-md overflow-hidden" style={{ background: img }} />
        </div>
      </div>
    ),
  };

  return (
    <div
      className={`w-11 h-14 rounded-md overflow-hidden transition-all duration-200 cursor-pointer ring-2 ${
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

export default function SplitVariantPopover({ currentVariantIndex, onSelect, onClose, brandColor }) {
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
      className="absolute bottom-full mb-3 left-0 z-[60] animate-in fade-in slide-in-from-bottom-2 duration-200"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-zinc-950/95 backdrop-blur-xl border border-zinc-800/80 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-4 min-w-[280px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 relative">
          <div className="flex items-center gap-2">
            <h4 className="text-[11px] font-outfit font-black uppercase tracking-widest text-zinc-400">
              Variante do Split
            </h4>
            <span className="text-[10px] font-mono text-zinc-600 truncate max-w-[100px]">
              {currentVariantIndex === 0 ? 'Original' : SPLIT_VARIANT_META.find(v => v.id === currentVariantIndex)?.name}
            </span>
          </div>
          <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="text-zinc-500 hover:text-white transition-colors p-1 rounded-md hover:bg-zinc-800 absolute -right-2 -top-2">
            <X size={14} />
          </button>
        </div>

        {/* Grid de variantes */}
        <div className="grid grid-cols-4 gap-2.5">
          {SPLIT_VARIANT_META.map((variant) => (
            <button
              key={variant.id}
              onClick={() => {
                onSelect(variant.id);
              }}
              className="flex flex-col items-center gap-1.5 group"
              title={variant.description}
            >
              <VariantThumbnail
                variantId={variant.id}
                brandColor={brandColor}
                isSelected={currentVariantIndex === variant.id}
              />
              <span className={`text-[8px] font-medium transition-colors leading-tight text-center ${
                currentVariantIndex === variant.id ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'
              }`}>
                {variant.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
