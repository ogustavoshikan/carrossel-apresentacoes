import React, { useRef, useEffect } from 'react';
import { COVER_VARIANT_META } from '../slides/cover-variants';

/**
 * CoverVariantPopover — Grid visual com mini-wireframes de cada variante.
 * Abre acima do botão "Trocar Variante".
 */

// ─── Mini Wireframes ────────────────────────────────────────
// Representações visuais abstratas de cada layout de capa.
function VariantThumbnail({ variantId, brandColor, isSelected }) {
  const accent = brandColor;
  const img = '#3f3f46';
  const dark = '#18181b';

  const layouts = {
    // 0: Original — image top + color block + CTA bottom
    0: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden" style={{ background: dark }}>
        <div className="h-[53%]" style={{ background: img }} />
        <div className="flex-1" style={{ background: accent + 'CC' }}>
          <div className="mt-1.5 ml-1.5 w-[60%] h-[3px] bg-white/80 rounded-full" />
          <div className="mt-1 ml-1.5 w-[40%] h-[2px] bg-white/40 rounded-full" />
        </div>
      </div>
    ),
    // 1: Color Split — similar but title overlaps
    1: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden" style={{ background: dark }}>
        <div className="h-[50%]" style={{ background: img }} />
        <div className="flex-1 relative" style={{ background: accent + 'CC' }}>
          <div className="absolute -top-2 left-1 w-[65%] h-[3px] bg-white/90 rounded-full" />
          <div className="absolute -top-0.5 left-1 w-[45%] h-[3px] bg-white/90 rounded-full" />
          <div className="mt-3 ml-1 w-[50%] h-[2px] bg-white/40 rounded-full" />
          <div className="mt-0.5 ml-1 w-[30%] h-[1.5px] bg-white/30 rounded-full" />
        </div>
      </div>
    ),
    // 2: Cinemático — full bg + bottom text
    2: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden relative" style={{ background: img }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="mt-auto relative z-10 p-1.5">
          <div className="w-[3px] h-[3px] rounded-full mb-1" style={{ background: accent }} />
          <div className="w-[70%] h-[3px] bg-white/80 rounded-full" />
          <div className="mt-0.5 w-[50%] h-[2px] bg-white/40 rounded-full" />
        </div>
      </div>
    ),
    // 3: Blur Editorial — blur bg + accent bar + title
    3: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden relative" style={{ background: '#27272a' }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="mt-auto relative z-10 p-1.5">
          <div className="w-4 h-[2px] mb-1.5 rounded-full" style={{ background: accent }} />
          <div className="w-[75%] h-[3px] bg-white/80 rounded-full" />
          <div className="mt-1 w-[55%] h-[2px] bg-white/40 rounded-full border-l" style={{ borderColor: 'rgba(255,255,255,0.3)' }} />
        </div>
      </div>
    ),
    // 4: Moldura — white frame + centered
    4: (
      <div className="w-full h-full flex items-center justify-center rounded-[3px]" style={{ background: '#d4d4d8' }}>
        <div className="w-[85%] h-[85%] border-2 border-white rounded-[2px] flex flex-col items-center justify-between py-1.5 overflow-hidden relative" style={{ background: '#000' }}>
          <div className="absolute inset-0 opacity-40" style={{ background: img }} />
          <div className="relative z-10 px-1 py-0.5 bg-white rounded-[1px]">
            <div className="w-3 h-[1.5px] bg-black/60" />
          </div>
          <div className="relative z-10 flex flex-col items-center gap-0.5">
            <div className="w-[60%] h-[3px] bg-white/80 rounded-full" />
            <div className="w-[40%] h-[2px] bg-white/50 rounded-full" />
          </div>
        </div>
      </div>
    ),
    // 5: Rounded Split — top image + rounded color block
    5: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden" style={{ background: dark }}>
        <div className="h-[55%]" style={{ background: img }} />
        <div className="flex-1 -mt-1 rounded-t-xl p-1.5" style={{ background: accent + 'CC' }}>
          <div className="w-[65%] h-[3px] bg-white/80 rounded-full" />
          <div className="mt-0.5 w-[45%] h-[2px] bg-white/40 rounded-full" />
        </div>
      </div>
    ),
    // 6: Arco — arch image + centered text
    6: (
      <div className="w-full h-full flex flex-col items-center rounded-[3px] overflow-hidden pt-3 gap-1.5" style={{ background: dark }}>
        <div className="w-[75%] h-[45%] rounded-t-full rounded-b-lg overflow-hidden" style={{ background: img }} />
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-8 h-[3px] bg-white/80 rounded-full" />
          <div className="w-6 h-[2px] bg-zinc-500/60 rounded-full" />
        </div>
      </div>
    ),
    // 7: Polaroid — tilted white card
    7: (
      <div className="w-full h-full flex items-center justify-center rounded-[3px] overflow-hidden relative" style={{ background: dark }}>
        <div className="w-[65%] h-[65%] bg-white rounded-[2px] p-[3px] rotate-[-4deg] shadow-lg flex flex-col">
          <div className="flex-1 rounded-[1px]" style={{ background: img }} />
          <div className="h-2.5 flex items-center justify-center">
            <div className="w-4 h-[1px] bg-black/20" />
          </div>
        </div>
        <div className="absolute bottom-1.5 left-1 z-10">
          <div className="w-[70%] h-[3px] bg-white/80 rounded-full" />
        </div>
      </div>
    ),
    // 8: Acento Lateral — centered text + border-left
    8: (
      <div className="w-full h-full flex flex-col justify-center rounded-[3px] overflow-hidden relative" style={{ background: '#27272a' }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="relative z-10 p-2">
          <div className="w-[70%] h-[3px] bg-white/80 rounded-full" />
          <div className="mt-1.5 w-[55%] h-[2px] bg-white/40 rounded-full pl-1 border-l-2" style={{ borderColor: accent }} />
        </div>
      </div>
    ),
    // 9: Spotlight — white card center
    9: (
      <div className="w-full h-full flex items-center justify-center rounded-[3px] overflow-hidden" style={{ background: dark }}>
        <div className="w-[80%] h-[55%] bg-white rounded-lg border-2 flex flex-col items-center justify-center gap-0.5 p-1" style={{ borderColor: accent }}>
          <div className="w-3 h-[1.5px] rounded-full" style={{ background: accent }} />
          <div className="w-[65%] h-[3px] bg-black/70 rounded-full" />
          <div className="w-[45%] h-[2px] bg-black/30 rounded-full" />
        </div>
      </div>
    ),
    // 10: Bottom Minimal — blur bg + bottom centered text
    10: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden relative" style={{ background: '#27272a' }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        <div className="mt-auto relative z-10 p-1.5 flex flex-col items-center gap-0.5">
          <div className="w-8 h-[3px] bg-white/80 rounded-full" />
          <div className="w-6 h-[2px] bg-white/40 rounded-full" />
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
      style={isSelected ? { ringColor: accent, '--tw-ring-color': accent } : {}}
    >
      {layouts[variantId]}
    </div>
  );
}

export default function CoverVariantPopover({ currentVariantIndex, onSelect, onClose, brandColor }) {
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
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-[11px] font-outfit font-black uppercase tracking-widest text-zinc-400">
            Variante da Capa
          </h4>
          <span className="text-[10px] font-mono text-zinc-600">
            {currentVariantIndex === 0 ? 'Original' : COVER_VARIANT_META.find(v => v.id === currentVariantIndex)?.name}
          </span>
        </div>

        {/* Grid de variantes */}
        <div className="grid grid-cols-4 gap-2.5">
          {COVER_VARIANT_META.map((variant) => (
            <button
              key={variant.id}
              onClick={() => {
                onSelect(variant.id);
                onClose();
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
