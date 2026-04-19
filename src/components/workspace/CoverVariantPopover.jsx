import React, { useRef, useEffect } from 'react';
import { X, Shuffle } from 'lucide-react';
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
            <div className="w-[40%] h-[2px] bg-surface-input/300 rounded-full" />
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
    // 11: Luxury Frame — image in white frame
    11: (
      <div className="w-full h-full flex items-center justify-center rounded-[3px] p-2 relative" style={{ background: dark }}>
        <div className="absolute inset-0 opacity-20 blur-md" style={{ background: accent }} />
        <div className="w-full h-full bg-white p-1 shadow-lg rounded-[1px] flex flex-col relative z-10">
          <div className="flex-1" style={{ background: img }} />
          <div className="h-2 flex items-center justify-center">
            <div className="w-4 h-[1px] bg-black/20" />
          </div>
        </div>
        <div className="absolute bottom-1 w-[70%] h-[3px] bg-white rounded-full z-20" />
      </div>
    ),
    // 12: Diagonal Slice
    12: (
      <div className="w-full h-full rounded-[3px] overflow-hidden relative" style={{ background: img }}>
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 origin-bottom-left -rotate-12 translate-y-1/2 w-[150%]" style={{ background: accent }} />
        <div className="absolute bottom-2 left-1.5 w-[70%] h-[3px] bg-white rounded-full" />
      </div>
    ),
    // 13: Bold Overlay
    13: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden relative" style={{ background: dark }}>
        <div className="h-[55%]" style={{ background: img }} />
        <div className="h-[45%]" style={{ background: accent }}>
           <div className="mt-4 ml-1.5 w-[40%] h-[2px] bg-white/40 rounded-full" />
        </div>
        <div className="absolute top-[45%] left-1.5 w-[75%] h-[4px] bg-white/90 rounded-full shadow-lg" />
      </div>
    ),
    // 14: Top Block
    14: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden" style={{ background: accent }}>
        <div className="flex-1 p-1.5">
          <div className="w-3 h-[1.5px] bg-surface-input/300 mb-1" />
          <div className="w-[80%] h-[3px] bg-white rounded-full" />
          <div className="mt-1 w-[40%] h-[2px] bg-white/60 rounded-full" />
        </div>
        <div className="h-[30%] border-t-[2px] border-zinc-200" style={{ background: img }} />
      </div>
    ),
    // 15: Center Card
    15: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden p-1" style={{ background: accent }}>
        <div className="flex-1 flex flex-col bg-zinc-950 rounded-[2px] overflow-hidden">
          <div className="h-[60%]" style={{ background: img }} />
          <div className="flex-1 bg-white flex flex-col items-center justify-center gap-0.5">
            <div className="w-[60%] h-[2px] bg-black/80 rounded-full" />
            <div className="w-[40%] h-[1.5px] bg-black/30 rounded-full" />
          </div>
        </div>
      </div>
    ),
    // 16: Bottom Gradient
    16: (
      <div className="w-full h-full rounded-[3px] overflow-hidden relative" style={{ background: img }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute inset-0 opacity-40" style={{ background: `linear-gradient(to top, ${accent}, transparent)` }} />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[70%] flex flex-col items-center gap-1">
          <div className="w-full h-[3px] bg-white rounded-full" />
          <div className="w-[60%] h-[2px] bg-white/40 rounded-full" />
        </div>
      </div>
    ),
    // 17: Minimal Side
    17: (
      <div className="w-full h-full flex rounded-[3px] overflow-hidden" style={{ background: '#EBE9E1' }}>
        <div className="w-[55%] p-1.5 flex flex-col justify-center gap-1">
          <div className="w-3 h-[1.5px]" style={{ background: accent }} />
          <div className="w-[85%] h-[3px] bg-black/80 rounded-full" />
          <div className="w-[50%] h-[2px] bg-black/20 rounded-full" />
        </div>
        <div className="w-[45%]" style={{ background: img }} />
      </div>
    ),
    // 18: Glassmorphism Center
    18: (
      <div className="w-full h-full rounded-[3px] overflow-hidden relative flex items-center justify-center" style={{ background: dark }}>
        <div className="absolute inset-0 opacity-40" style={{ background: img }} />
        <div className="absolute w-6 h-6 rounded-full blur-md opacity-60" style={{ background: accent }} />
        <div className="w-[80%] h-[50%] bg-surface-input/30 backdrop-blur-[2px] border border-white/20 rounded-lg flex flex-col items-center justify-center gap-1 relative z-10">
           <div className="w-[60%] h-[2.5px] bg-white/90 rounded-full" />
           <div className="w-[40%] h-[1.5px] bg-white/40 rounded-full" />
        </div>
      </div>
    ),
    // 19: Arch Featured
    19: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden p-1.5" style={{ background: '#fff' }}>
        <div className="flex-1 rounded-t-full rounded-b-md border-[2px]" style={{ background: img, borderColor: accent }} />
        <div className="h-6 flex flex-col items-center justify-center gap-1">
          <div className="w-[70%] h-[2.5px] bg-black/80 rounded-full" />
          <div className="w-[40%] h-[1.5px]" style={{ background: accent }} />
        </div>
      </div>
    ),
    // 20: Rotating Polaroid
    20: (
      <div className="w-full h-full flex items-center justify-center rounded-[3px] overflow-hidden relative" style={{ background: '#fff' }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '4px 4px' }} />
        <div className="w-[70%] h-[75%] bg-white shadow-md rotate-2 p-1 flex flex-col border border-zinc-100">
           <div className="flex-1 bg-zinc-100" style={{ background: img }} />
           <div className="h-3 flex items-center justify-center">
             <div className="w-[60%] h-[1.5px] bg-black/20" />
           </div>
        </div>
        <div className="absolute bottom-2 left-1 w-8 h-3 shadow-sm rotate-[-4deg]" style={{ background: accent }} />
      </div>
    ),
    // 21: Diagonal Edge
    21: (
      <div className="w-full h-full rounded-[3px] overflow-hidden relative flex flex-col justify-end p-2" style={{ background: accent }}>
        <div className="absolute top-0 right-0 w-[140%] h-[60%] bg-black origin-top-right -rotate-12 overflow-hidden shadow-lg border-b-[2px] border-white">
          <div className="absolute inset-0 opacity-60" style={{ background: img }} />
        </div>
        <div className="relative z-10">
          <div className="w-[85%] h-[4px] bg-white rounded-full mb-1.5" />
          <div className="flex items-center gap-1">
            <div className="w-3 h-[1.5px] bg-white" />
            <div className="w-[40%] h-[1.5px] bg-white/60 rounded-full" />
          </div>
        </div>
      </div>
    ),
    // 22: Header Minimal
    22: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden p-1.5 bg-white">
        <div className="flex justify-between items-center w-full">
           <div className="w-4 h-[1px] bg-zinc-200" />
           <div className="w-1 h-1 rounded-full bg-zinc-300" />
        </div>
        <div className="flex-1 flex flex-col justify-center relative">
          <div className="absolute -left-2 w-6 h-6 rounded-full blur-md opacity-30" style={{ background: accent }} />
          <div className="w-full h-[4px] bg-black rounded-full mb-1" />
          <div className="w-[50%] h-[2px] rounded-full" style={{ background: accent }} />
        </div>
      </div>
    ),
    // 23: Vertical Split
    23: (
      <div className="w-full h-full flex rounded-[3px] overflow-hidden relative" style={{ background: '#fff' }}>
        <div className="w-[40%] h-full flex flex-col justify-between p-1" style={{ background: accent }}>
           <div className="w-[1px] h-4 bg-white/40 ml-0.5 mt-2" />
           <div className="w-2 h-[1.5px] bg-white/60 mb-1" />
        </div>
        <div className="flex-1 h-full opacity-60" style={{ background: img }} />
        <div className="absolute top-1/2 left-2 w-[80%] h-[4px] bg-white rounded-full shadow-lg -translate-y-1/2" />
      </div>
    ),
    // 24: Grid Process
    24: (
      <div className="w-full h-full rounded-[3px] overflow-hidden p-2 flex flex-col relative bg-white border border-zinc-100">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(90deg, ${accent} 1px, transparent 1px)`, backgroundSize: '6px 6px' }} />
        <div className="flex justify-between items-center mb-auto relative z-10">
           <div className="w-3 h-3 rounded-full border border-zinc-300" />
           <div className="w-4 h-[1px] bg-zinc-300" />
        </div>
        <div className="w-full h-[4px] bg-black/80 rounded-full mb-2 relative z-10" />
        <div className="w-full h-[30%] border-t" style={{ background: img, borderColor: accent }} />
      </div>
    ),
    // 25: Frosted Float
    25: (
      <div className="w-full h-full rounded-[3px] overflow-hidden relative flex items-center justify-center" style={{ background: dark }}>
        <div className="absolute inset-0 opacity-50 blur-[1px]" style={{ background: img }} />
        <div className="w-[85%] h-[75%] bg-white/20 backdrop-blur-[2px] border border-white/30 rounded-lg p-1.5 flex flex-col justify-between shadow-xl">
           <div className="flex justify-between items-center">
             <div className="w-3 h-[1px] bg-white/60" />
             <div className="w-2 h-[1px] bg-white/40" />
           </div>
           <div className="flex flex-col items-center gap-0.5">
             <div className="w-4 h-[1.5px] bg-white/60 rounded-full" />
             <div className="w-[80%] h-[3px] bg-white rounded-full" />
           </div>
           <div className="w-3 h-3 rounded-full bg-white/20 border border-white/10 self-center" />
        </div>
      </div>
    ),
    // 26: Overlay Volume
    26: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden relative" style={{ background: '#fff' }}>
        <div className="h-[55%] relative" style={{ background: accent }}>
           <div className="absolute top-1.5 left-1.5 w-4 h-[2px] bg-white/40" />
        </div>
        <div className="h-[45%]" style={{ background: img }} />
        <div className="absolute top-1/2 left-1.5 w-[85%] flex flex-col gap-1.5 -translate-y-1/2">
           <div className="w-full h-[4px] bg-white rounded-full shadow-lg" />
           <div className="w-[60%] h-[3px] bg-white rounded-full shadow-md" />
        </div>
      </div>
    ),
    // 27: Slanted New
    27: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden relative" style={{ background: '#fff' }}>
        <div className="absolute inset-0 h-[70%] bg-zinc-800" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 65%, 0 85%)' }}>
          <div className="absolute inset-0 opacity-60" style={{ background: img }} />
        </div>
        <div className="relative z-10 p-1.5 flex flex-col h-full">
           <div className="w-3 h-3 rounded-full bg-white shadow-sm flex items-center justify-center">
             <div className="w-1.5 h-1.5 bg-black rounded-full" />
           </div>
           <div className="mt-auto flex flex-col items-end gap-0.5 mb-4">
             <div className="w-[40%] h-[1.5px] bg-zinc-400 rounded-full" />
             <div className="w-[85%] h-[3.5px] bg-black rounded-full" />
           </div>
           <div className="w-full h-[1px] bg-zinc-200" />
        </div>
      </div>
    ),
    // 28: Right Image Text Left
    28: (
      <div className="w-full h-full flex rounded-[3px] overflow-hidden bg-white relative">
        <div className="w-[60%] h-full p-2 flex flex-col justify-center z-10">
          <div className="w-[80%] h-[4px] bg-zinc-800 rounded-full mb-1.5" />
          <div className="w-[60%] h-[2px] bg-zinc-400 rounded-full" />
        </div>
        <div className="absolute right-0 top-0 w-[45%] h-full bg-zinc-200 z-0">
          <div className="w-full h-full" style={{ background: img }} />
        </div>
      </div>
    ),
    // 29: Framed Left Image
    29: (
      <div className="w-full h-full flex p-1.5 gap-1.5 rounded-[3px] overflow-hidden bg-white relative">
        <div className="w-[50%] h-full pb-2">
          <div className="w-full h-full rounded-sm" style={{ background: img }} />
        </div>
        <div className="w-[50%] h-full flex flex-col justify-center">
          <div className="w-[90%] h-[4px] bg-zinc-800 rounded-full mb-2" />
          <div className="flex items-center gap-1 mb-1">
            <div className="w-1 h-1 rounded-full" style={{ background: accent }} />
            <div className="w-[60%] h-[2px] bg-zinc-400 rounded-full" />
          </div>
          <div className="w-[75%] h-[2px] bg-zinc-800 rounded-full mt-1" />
        </div>
      </div>
    ),
    // 30: Social Icons Overlay
    30: (
      <div className="w-full h-full flex rounded-[3px] overflow-hidden bg-white relative">
        <div className="w-[30%] h-full" style={{ background: img }} />
        <div className="w-[70%] h-full flex flex-col p-1.5 justify-between">
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="w-[80%] h-[4px] bg-zinc-800 rounded-full mb-2" />
            <div className="w-[70%] h-[2px] bg-zinc-400 rounded-full" />
            <div className="w-[60%] h-[2px] bg-zinc-400 rounded-full mt-0.5" />
          </div>
          <div className="w-full flex justify-end gap-0.5 mt-auto pb-0.5 pr-0.5">
            <div className="w-1.5 h-1.5 rounded-full border border-zinc-300" />
            <div className="w-1.5 h-1.5 rounded-full border border-zinc-300" />
            <div className="w-1.5 h-1.5 rounded-full border border-zinc-300" />
          </div>
        </div>
      </div>
    ),
    // 31: List Bullet Stars
    31: (
      <div className="w-full h-full flex rounded-[3px] overflow-hidden bg-white">
        <div className="w-[55%] h-full p-1.5 flex flex-col justify-center z-10">
          <div className="w-[85%] h-[4px] rounded-full mb-2" style={{ background: accent }} />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 rounded-full" style={{ background: accent }} />
              <div className="w-[70%] h-[1.5px] bg-zinc-600 rounded-full" />
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 rounded-full" style={{ background: accent }} />
              <div className="w-[80%] h-[1.5px] bg-zinc-600 rounded-full" />
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 rounded-full" style={{ background: accent }} />
              <div className="w-[60%] h-[1.5px] bg-zinc-600 rounded-full" />
            </div>
          </div>
        </div>
        <div className="w-[45%] h-full" style={{ background: img }} />
      </div>
    ),
    // 32: Repeated Text Background
    32: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden bg-white relative p-1">
        <div className="absolute inset-0 opacity-20 flex flex-col gap-0.5 p-1">
          <div className="w-[90%] mx-auto h-[2px] rounded-full" style={{ background: accent }} />
          <div className="w-[90%] mx-auto h-[2px] rounded-full" style={{ background: accent }} />
          <div className="w-[90%] mx-auto h-[2px] rounded-full" style={{ background: accent }} />
          <div className="w-[90%] mx-auto h-[2px] rounded-full" style={{ background: accent }} />
        </div>
        <div className="mt-auto h-[60%] w-full rounded-t-md rounded-b-sm relative shadow-sm border-[1.5px] border-white z-10">
           <div className="absolute inset-0 rounded-[1px]" style={{ background: img }} />
        </div>
        <div className="w-[90%] mx-auto h-[8px] bg-white/90 rounded-sm shadow-sm relative z-20 -mt-1 flex items-center justify-between px-1">
           <div className="w-[50%] h-[1.5px] bg-zinc-800 rounded-full" />
           <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
        </div>
      </div>
    ),
    // 33: Gradient Footer
    33: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden bg-black">
        <div className="h-[45%]" style={{ background: img }} />
        <div className="flex-1 p-1" style={{ background: accent }}>
          <div className="w-[70%] h-[2.5px] bg-white rounded-full mb-1" />
          <div className="w-full h-[0.5px] bg-white/40 mb-1" />
          <div className="w-[50%] h-[1.5px] bg-white/60 rounded-full" />
        </div>
      </div>
    ),
    // 34: Center Focus
    34: (
      <div className="w-full h-full flex flex-col items-center justify-center rounded-[3px] overflow-hidden relative" style={{ background: img }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col items-center gap-1">
          <div className="w-8 h-[3px] bg-white rounded-full" />
          <div className="w-6 h-[1.5px] bg-white/60 rounded-full" />
        </div>
        <div className="absolute bottom-1 w-6 h-2 rounded-full bg-white/20 border border-white/10" />
      </div>
    ),
    // 35: Curve Card
    35: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden relative" style={{ background: dark }}>
        <div className="h-[70%]" style={{ background: img }} />
        <div className="absolute bottom-0 w-full h-[40%] bg-white rounded-t-lg p-1 flex flex-col justify-center gap-0.5 shadow-lg">
          <div className="w-[40%] h-[1px]" style={{ background: accent }} />
          <div className="w-[70%] h-[2.5px] bg-black/80 rounded-full" />
        </div>
      </div>
    ),
    // 36: Magazine Split
    36: (
      <div className="w-full h-full flex rounded-[3px] overflow-hidden" style={{ background: '#EBE9E1' }}>
        <div className="w-[55%] p-1.5 flex flex-col justify-center gap-1">
          <div className="w-[85%] h-[3px] bg-black/80 rounded-full" />
          <div className="w-[60%] h-[1.5px] bg-zinc-400 rounded-full" />
        </div>
        <div className="w-[45%]" style={{ background: img }} />
      </div>
    ),
    // 37: Modern Frame
    37: (
      <div className="w-full h-full flex flex-col p-1.5 rounded-[3px] overflow-hidden" style={{ background: accent }}>
        <div className="flex-1 rounded-md border border-white/20 shadow-sm" style={{ background: img }} />
        <div className="mt-1 flex justify-between items-center">
          <div className="flex flex-col gap-0.5">
            <div className="w-6 h-[2px] bg-white rounded-full" />
            <div className="w-4 h-[1px] bg-white/60 rounded-full" />
          </div>
          <div className="w-3 h-3 rounded-full bg-white" />
        </div>
      </div>
    ),
    // 38: Gradient Bottom
    38: (
      <div className="w-full h-full flex flex-col justify-end p-1.5 rounded-[3px] overflow-hidden relative" style={{ background: img }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <div className="relative z-10 flex flex-col gap-1">
          <div className="w-4 h-[1px]" style={{ background: accent }} />
          <div className="w-[75%] h-[3px] bg-white rounded-full" />
          <div className="w-[60%] h-[1.5px] bg-zinc-300 rounded-full" />
        </div>
      </div>
    ),
    // 39: Side Strip
    39: (
      <div className="w-full h-full flex rounded-[3px] overflow-hidden bg-zinc-900">
        <div className="flex-1 opacity-40" style={{ background: img }} />
        <div className="w-3 h-full shrink-0 flex items-center justify-center" style={{ background: accent }}>
           <div className="w-[1.5px] h-[70%] bg-white/40 rounded-full" />
        </div>
      </div>
    ),
    // 40: Floating Card Center
    40: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden relative bg-white">
        <div className="h-[65%] w-full" style={{ background: img }} />
        <div className="flex-1 w-full bg-zinc-900" />
        <div className="absolute top-[45%] left-1/2 -translate-x-1/2 w-[80%] h-[40%] bg-white/90 rounded-md shadow-sm border border-white/50 p-1 flex flex-col justify-center gap-1">
           <div className="w-[70%] h-[3px] bg-black rounded-full" />
           <div className="w-[50%] h-[1.5px] bg-zinc-400 rounded-full" />
        </div>
      </div>
    ),
    // 41: Slanted Banner
    41: (
      <div className="w-full h-full rounded-[3px] overflow-hidden relative grayscale" style={{ background: img }}>
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute top-4 -left-2 w-[120%] h-6 bg-zinc-900 border-y-[1.5px] shadow-md -rotate-6 flex items-center px-4" style={{ borderColor: accent }}>
           <div className="w-[60%] h-[3px] bg-white rounded-full" />
        </div>
        <div className="absolute bottom-1 left-1.5 w-8 h-3 bg-zinc-900 border-l-[2px]" style={{ borderColor: accent }} />
      </div>
    ),
    // 42: Upper Frame Title
    42: (
      <div className="w-full h-full p-1 bg-white flex flex-col gap-1 rounded-[3px] overflow-hidden">
        <div className="flex-1 rounded-sm relative overflow-hidden" style={{ background: img }}>
           <div className="absolute top-0 left-0 w-full h-6 bg-black/40 p-1">
              <div className="w-[60%] h-[2.5px] bg-white rounded-full" />
           </div>
        </div>
        <div className="h-4 w-full flex items-center justify-between px-1">
           <div className="w-4 h-[1px] bg-zinc-200" />
           <div className="w-3 h-3 rounded-full border border-zinc-200" />
        </div>
      </div>
    ),
  };

  return (
    <div
      className={`w-11 h-14 rounded-md overflow-hidden transition-all duration-150 cursor-pointer ring-2 ${
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
      className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-bottom-2 duration-150"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-zinc-950/95 backdrop-blur-xl border border-zinc-800/80 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-4 min-w-[280px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 relative">
          <div className="flex items-center gap-2 pr-12">
            <h4 className="text-[11px] font-outfit font-black uppercase tracking-widest text-zinc-400">
              Variante da Capa
            </h4>
            <span className="text-[10px] font-mono text-zinc-600 truncate max-w-[100px]">
              {currentVariantIndex === 0 ? 'Original' : COVER_VARIANT_META.find(v => v.id === currentVariantIndex)?.name}
            </span>
          </div>
          <div className="absolute -right-2 -top-2 flex items-center gap-0.5">
            <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="text-zinc-500 hover:text-white transition-colors p-1 rounded-md hover:bg-zinc-800">
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Grid de variantes com Scroll */}
        <div className="grid grid-cols-4 gap-2.5 max-h-[320px] overflow-y-auto pr-1.5 custom-scrollbar">
          {COVER_VARIANT_META.map((variant) => (
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

