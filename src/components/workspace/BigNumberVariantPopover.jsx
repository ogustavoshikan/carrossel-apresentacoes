import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { BIGNUMBER_VARIANT_META } from '../slides/bignumber-variants';

/**
 * BigNumberVariantPopover — Grid visual com mini-wireframes de cada variante de big-number.
 * Abre acima do botão "Variante".
 */

// ─── Mini Wireframes ────────────────────────────────────────
function VariantThumbnail({ variantId, brandColor, isSelected }) {
  const accent = brandColor;
  const img = '#3f3f46';
  const dark = '#18181b';
  const num = '#ffffff';

  const layouts = {
    // 0: Original — número grande + tag + texto + imagem inferior
    0: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden p-1.5 gap-1" style={{ background: dark }}>
        <div className="w-[75%] h-[28%] rounded" style={{ background: num, opacity: 0.9 }} />
        <div className="px-1.5 py-0.5 rounded self-start" style={{ background: accent, maxWidth: '65%' }}>
          <div className="w-8 h-[2px] rounded-full bg-white/80" />
        </div>
        <div className="w-[80%] h-[2px] bg-white/30 rounded-full" />
        <div className="w-[65%] h-[2px] bg-white/20 rounded-full" />
        <div className="flex-1 w-full rounded-lg mt-0.5" style={{ background: img }} />
      </div>
    ),
    // 1: Dark Stack — número + pill + texto + imagem
    1: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden p-1.5 gap-1" style={{ background: '#050505' }}>
        <div className="w-[70%] h-[28%] rounded" style={{ color: '#fff', background: 'transparent' }}>
          <div className="w-full h-full rounded" style={{ background: num, opacity: 0.88 }} />
        </div>
        <div className="px-1.5 py-0.5 rounded-sm self-start" style={{ background: accent }}>
          <div className="w-6 h-[1.5px] rounded-full bg-white" />
        </div>
        <div className="w-[70%] h-[1.5px] bg-white/25 rounded-full" />
        <div className="flex-1 w-full rounded-xl mt-0.5" style={{ background: img }} />
      </div>
    ),
    // 2: Phantom — número centrado com ghost
    2: (
      <div className="w-full h-full flex flex-col items-center justify-center rounded-[3px] overflow-hidden" style={{ background: '#080808' }}>
        <div className="absolute opacity-5 font-black text-white" style={{ fontSize: '40px' }}>N</div>
        <div className="w-[60%] h-[30%] rounded mb-1" style={{ background: accent, opacity: 0.9 }} />
        <div className="px-2 py-0.5 rounded-full border border-white/20">
          <div className="w-8 h-[1.5px] bg-white/60 rounded-full" />
        </div>
        <div className="w-[55%] h-[1.5px] bg-zinc-600 rounded-full mt-1" />
      </div>
    ),
    // 3: Color Block — bloco colorido superior + escuro inferior
    3: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden" style={{ background: '#050505' }}>
        <div className="h-[45%] flex items-end justify-end p-1" style={{ background: accent }}>
          <div className="w-[65%] h-[65%] rounded" style={{ background: 'rgba(255,255,255,0.9)' }} />
        </div>
        <div className="flex-1 p-1.5 flex flex-col justify-center gap-1">
          <div className="w-[40%] h-[1.5px] bg-zinc-600 rounded-full" />
          <div className="w-[80%] h-[2px] bg-white/70 rounded-full" />
          <div className="w-[65%] h-[1.5px] bg-white/40 rounded-full" />
        </div>
      </div>
    ),
    // 4: Glass Card — número outline + card glass
    4: (
      <div className="w-full h-full flex flex-col items-center justify-center rounded-[3px] overflow-hidden p-1.5" style={{ background: '#050505' }}>
        <div className="absolute opacity-5 font-black text-white text-[32px] leading-none pointer-events-none">N</div>
        <div className="w-full bg-black/40 rounded-lg border border-white/10 p-1.5 flex flex-col gap-1">
          <div className="w-[40%] h-[1.5px] rounded-full" style={{ background: accent }} />
          <div className="w-[80%] h-[2px] bg-white/70 rounded-full" />
          <div className="w-[65%] h-[1.5px] bg-white/40 rounded-full" />
        </div>
      </div>
    ),
    // 5: Side Panel — número esquerda + painel direita
    5: (
      <div className="w-full h-full flex rounded-[3px] overflow-hidden" style={{ background: '#080808' }}>
        <div className="w-[45%] h-full flex items-center justify-end p-1">
          <div className="w-[60%] h-[35%] rounded" style={{ background: accent, opacity: 0.9 }} />
        </div>
        <div className="flex-1 h-full p-1.5 flex flex-col justify-center gap-1 border-l border-white/10" style={{ background: '#27272a' }}>
          <div className="w-[50%] h-[1.5px] bg-white/50 rounded-full" />
          <div className="w-[80%] h-[1.5px] bg-zinc-500/60 rounded-full" />
          <div className="w-full h-6 rounded-lg mt-0.5" style={{ background: img }} />
        </div>
      </div>
    ),
    // 6: Circle Badge — círculo + tag + card
    6: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden p-1.5 gap-1" style={{ background: '#050505' }}>
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-full shrink-0" style={{ background: accent }} />
          <div className="w-[50%] h-[2px] bg-white/70 rounded-full" />
        </div>
        <div className="flex-1 w-full rounded-lg border border-white/10 p-1 flex flex-col justify-center gap-0.5" style={{ background: '#0A0A0A' }}>
          <div className="w-[80%] h-[1.5px] bg-white/50 rounded-full" />
          <div className="w-[65%] h-[1.5px] bg-white/30 rounded-full" />
        </div>
      </div>
    ),
    // 7: Texture Fill — número com bg-clip image
    7: (
      <div className="w-full h-full flex flex-col items-center justify-center rounded-[3px] overflow-hidden p-1.5 gap-1" style={{ background: '#020202' }}>
        <div className="w-[70%] h-[30%] rounded" style={{ background: `linear-gradient(135deg, ${img}, ${accent})`, opacity: 0.9 }} />
        <div className="w-[40%] h-[1.5px] rounded-full" style={{ background: accent }} />
        <div className="w-[65%] h-[1.5px] bg-zinc-600 rounded-full" />
        <div className="w-[55%] h-[1.5px] bg-zinc-700 rounded-full" />
      </div>
    ),
    // 8: Outline Float — número outline + imagem + texto
    8: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden p-1.5" style={{ background: '#080808' }}>
        <div className="absolute right-0 top-[20%] opacity-80 font-black text-transparent border-r-0"
          style={{ WebkitTextStroke: `1px ${accent}`, fontSize: '32px', lineHeight: 1 }}>N</div>
        <div className="flex-1 flex flex-col justify-end gap-1">
          <div className="w-[75%] h-12 rounded-lg" style={{ background: img }} />
          <div className="w-[50%] h-[1.5px] bg-white/40 rounded-full" />
          <div className="w-[75%] h-[1.5px] bg-white/25 rounded-full" />
        </div>
      </div>
    ),
    // 9: Sidebar Ribbon — faixa lateral + texto
    9: (
      <div className="w-full h-full flex rounded-[3px] overflow-hidden">
        <div className="w-[22%] h-full flex items-center justify-center border-r border-white/10" style={{ background: accent }}>
          <div className="w-[1.5px] h-[60%] bg-white/80 rounded-full" />
        </div>
        <div className="flex-1 p-1.5 flex flex-col justify-center gap-1">
          <div className="w-[45%] h-[1.5px] bg-zinc-600 rounded-full" />
          <div className="w-[85%] h-[2px] bg-white/70 rounded-full" />
          <div className="w-[75%] h-[1.5px] bg-white/50 rounded-full" />
          <div className="w-[60%] h-[1.5px] bg-white/30 rounded-full" />
        </div>
      </div>
    ),
    // 10: Magazine Split — imagem superior + número sobreposto + cor inferior
    10: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden relative">
        <div className="h-[50%]" style={{ background: img, opacity: 0.6 }} />
        <div className="h-[50%]" style={{ background: accent }} />
        <div className="absolute left-1.5 top-[35%] font-black text-white leading-none" style={{ fontSize: '20px', lineHeight: 1 }}>N</div>
      </div>
    ),
    // 11: Bento Grid — grid com cards
    11: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden p-1 gap-1" style={{ background: '#020202' }}>
        <div
          className="w-full h-[40%] rounded-xl flex items-center justify-center"
          style={{ background: accent }}
        >
          <div className="w-[40%] h-[55%] rounded" style={{ background: 'rgba(255,255,255,0.9)' }} />
        </div>
        <div className="flex-1 flex gap-1">
          <div className="flex-1 rounded-xl border border-white/10 p-1 flex flex-col justify-center" style={{ background: '#0A0A0A' }}>
            <div className="w-full h-[1.5px] bg-zinc-600 rounded-full" />
          </div>
          <div className="flex-1 rounded-xl border border-white/10 p-1 flex flex-col justify-center gap-0.5" style={{ background: '#27272a' }}>
            <div className="w-full h-[1.5px] bg-zinc-500 rounded-full" />
            <div className="w-[70%] h-[1.5px] bg-zinc-600 rounded-full" />
          </div>
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

export default function BigNumberVariantPopover({ currentVariantIndex, onSelect, onClose, brandColor }) {
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
      <div className="bg-zinc-950/95 backdrop-blur-xl border border-zinc-800/80 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-4 min-w-[320px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 relative">
          <div className="flex items-center gap-2">
            <h4 className="text-[11px] font-outfit font-black uppercase tracking-widest text-zinc-400">
              Variante do Big-Number
            </h4>
            <span className="text-[10px] font-mono text-zinc-600 truncate max-w-[100px]">
              {currentVariantIndex === 0 ? 'Original' : BIGNUMBER_VARIANT_META.find(v => v.id === currentVariantIndex)?.name}
            </span>
          </div>
          <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="text-zinc-500 hover:text-white transition-colors p-1 rounded-md hover:bg-zinc-800 absolute -right-2 -top-2">
            <X size={14} />
          </button>
        </div>

        {/* Grid de variantes */}
        <div className="grid grid-cols-4 gap-2.5">
          {BIGNUMBER_VARIANT_META.map((variant) => (
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
