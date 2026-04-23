import React, { useRef, useEffect } from 'react';
import { Shuffle } from 'lucide-react';
import { SPLIT_VARIANT_META } from '../slides/split-variants';
import VariantPopoverHeader from './VariantPopoverHeader';
import { cn } from '../../lib/utils';

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
        <div className="w-full h-[35%] rounded-md bg-surface-input/30 border border-white/10 flex flex-col justify-center px-1 gap-0.5">
          <div className="w-[30%] h-[1.5px] bg-zinc-600 rounded-full" />
          <div className="w-[60%] h-[2.5px] bg-white/70 rounded-full" />
        </div>
        <div className="flex-1 flex gap-1">
          <div className="flex-1 rounded-md border border-white/10" style={{ background: img }} />
          <div className="flex-1 rounded-md bg-surface-input/30 border border-white/10 p-1 flex flex-col justify-center gap-1">
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
    // 8: Image Top Split
    8: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden p-1.5 gap-1 bg-[#FAFAFA]">
        <div className="w-full h-[40%] rounded-md" style={{ background: img }} />
        <div className="flex gap-1.5 mt-0.5">
          <div className="w-3 h-2 rounded-sm shrink-0" style={{ background: accent }} />
          <div className="flex-1 flex flex-col gap-0.5 pt-0.5">
             <div className="w-[90%] h-[2px] bg-zinc-800 rounded-full" />
             <div className="w-[60%] h-[2px] bg-zinc-800 rounded-full" />
          </div>
        </div>
        <div className="flex flex-col gap-0.5 mt-0.5">
          <div className="w-full h-[1px] bg-zinc-400 rounded-full" />
          <div className="w-[85%] h-[1px] bg-zinc-400 rounded-full" />
          <div className="w-[40%] h-[1px] bg-zinc-400 rounded-full" />
        </div>
      </div>
    ),
    // 9: Circle Top
    9: (
      <div className="w-full h-full flex flex-col items-center p-1 relative rounded-[3px] overflow-hidden" style={{ background: '#F4F4F5' }}>
        <div className="w-6 h-6 rounded-full mt-1 border-[1.5px] border-white shadow-sm z-10 shrink-0" style={{ background: img }} />
        <div className="w-[90%] h-[45%] bg-white border border-black/5 rounded-md -mt-2 p-1 flex flex-col items-center gap-1 justify-end pb-1.5">
           <div className="w-[80%] h-[2px] rounded-full mt-0.5" style={{ background: accent }} />
           <div className="w-[60%] h-[2px] rounded-full" style={{ background: accent }} />
           <div className="w-[70%] h-[1px] bg-zinc-400 mt-0.5" />
        </div>
      </div>
    ),
    // 10: Polaroid Tilt
    10: (
      <div className="w-full h-full flex flex-col items-center rounded-[3px] overflow-hidden p-1 bg-[#E8E8E8]">
        <div className="w-7 h-8 bg-white shadow-sm flex flex-col p-0.5 mt-1 -rotate-[5deg]">
           <div className="w-full h-5" style={{ background: img }} />
           <div className="flex justify-between mt-[2px]">
             <div className="w-2 h-[1px] bg-zinc-300" />
             <div className="w-[2px] h-[2px] rounded-full" style={{ background: accent }} />
           </div>
        </div>
        <div className="flex flex-col items-center gap-0.5 mt-1.5 w-full pt-0.5">
           <div className="w-[70%] h-[2px] bg-zinc-800 rounded-full" />
           <div className="w-[50%] h-[2px] bg-zinc-800 rounded-full" />
           <div className="w-[80%] h-[1px] bg-zinc-500 mt-0.5 rounded-full" />
           <div className="w-[60%] h-[1px] bg-zinc-500 rounded-full" />
        </div>
      </div>
    ),
    // 11: Overlap Card
    11: (
      <div className="w-full h-full flex flex-col relative rounded-[3px] overflow-hidden bg-[#FAFAFA]">
        <div className="w-full h-[55%] shrink-0" style={{ background: img }} />
        <div className="w-[110%] flex-1 bg-white rounded-tr-xl -mt-2 z-10 border-t border-black/5 shadow-sm p-1.5 flex flex-col gap-0.5">
           <div className="flex items-center gap-1 mb-0.5">
             <div className="w-1 h-1 rounded-full" style={{ background: accent }} />
             <div className="w-3 h-[1.5px] bg-zinc-300 rounded-full" />
           </div>
           <div className="w-[80%] h-[2px] bg-zinc-800 rounded-full" />
           <div className="w-[60%] h-[2px] bg-zinc-800 rounded-full mt-0.5" />
           <div className="w-[90%] h-[1px] bg-zinc-400 rounded-full" />
        </div>
      </div>
    ),
    // 12: Dark Centered
    12: (
      <div className="w-full h-full flex flex-col items-center rounded-[3px] overflow-hidden" style={{ background: accent }}>
        <div className="w-[60%] h-[2px] bg-white rounded-full mt-3" />
        <div className="w-[40%] h-[2px] bg-white rounded-full mt-0.5" />
        <div className="w-[26px] h-[26px] rounded-full mt-1.5 border-[1.5px] border-white/20 shrink-0" style={{ background: img }} />
        <div className="w-[80%] h-[1.5px] bg-white/70 rounded-full mt-1.5" />
        <div className="w-[50%] h-[1.5px] bg-white/70 rounded-full mt-0.5" />
      </div>
    ),
    // 13: Thin Border Split
    13: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden p-1 border-[1.5px]" style={{ background: '#ffffff', borderColor: accent }}>
        <div className="flex justify-between items-end mb-1 mt-1">
          <div className="w-[50%] h-[2px] bg-zinc-800 rounded-full" />
          <div className="w-[20%] h-[2px] rounded-full opacity-30" style={{ background: accent }} />
        </div>
        <div className="w-full h-[40%] rounded-sm mb-1" style={{ background: img }} />
        <div className="flex flex-col gap-0.5 pl-0.5">
          <div className="w-[90%] h-[1.5px] bg-zinc-500 rounded-full" />
          <div className="w-[60%] h-[1.5px] bg-zinc-500 rounded-full" />
        </div>
      </div>
    ),
    // 14: Floating Element
    14: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden p-1 relative bg-[#FAFAFA]">
        <div className="w-[85%] h-[45%] absolute top-2 right-1 rounded-sm border border-white z-0" style={{ background: img }} />
        <div className="relative mt-auto w-[90%] bg-white border border-black/5 rounded px-1 py-1.5 flex flex-col gap-0.5 shadow-sm z-10 -ml-0.5">
          <div className="w-[30%] h-[1.5px] rounded-full" style={{ background: accent }} />
          <div className="w-[80%] h-[2px] bg-zinc-800 rounded-full mt-0.5" />
          <div className="w-[90%] h-[1.5px] bg-zinc-500 rounded-full" />
          <div className="w-[60%] h-[1.5px] bg-zinc-500 rounded-full" />
        </div>
      </div>
    ),
    // 15: Arch View
    15: (
      <div className="w-full h-full flex flex-col items-center rounded-[3px] overflow-hidden p-1 bg-[#FAFAFA]">
        <div className="w-full h-[45%] rounded-t-full rounded-b-[2px] mb-1 shrink-0" style={{ background: img }} />
        <div className="flex flex-col items-center w-full gap-0.5 mt-0.5">
          <div className="w-[30%] h-[1.5px] rounded-full mb-0.5" style={{ background: accent }} />
          <div className="w-[70%] h-[2px] bg-zinc-800 rounded-full" />
          <div className="w-[90%] h-[1.5px] bg-zinc-500 rounded-full mt-0.5" />
          <div className="w-[50%] h-[1.5px] bg-zinc-500 rounded-full" />
        </div>
      </div>
    ),
    // 16: Frame Bottom Card
    16: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden p-1 bg-[#FAFAFA]">
        <div className="w-full h-[45%] relative mb-1.5 mt-0.5 shrink-0">
          <div className="absolute top-0 right-1 bottom-[2px] left-0 rounded-br-[10px] rounded-tl-[2px] z-10 border border-white" style={{ background: img }} />
          <div className="absolute bottom-0 right-0 w-4 h-4 rounded-br-[12px] z-0" style={{ background: accent }} />
        </div>
        <div className="flex flex-col gap-0.5 pl-0.5">
          <div className="w-[20%] h-[1.5px] rounded-full mb-0.5" style={{ background: accent }} />
          <div className="w-[80%] h-[2px] bg-zinc-800 rounded-full" />
          <div className="w-[90%] h-[1.5px] bg-zinc-500 rounded-full mt-0.5" />
          <div className="w-[60%] h-[1.5px] bg-zinc-500 rounded-full" />
        </div>
      </div>
    ),
    // 17: Diagonal Shift
    17: (
      <div className="w-full h-full flex flex-col items-center justify-center rounded-[3px] overflow-hidden p-1 relative bg-[#18181b]">
        <div className="w-[85%] h-[40%] rounded-[2px] -rotate-6 z-10 border border-zinc-700 mt-1" style={{ background: img }} />
        <div className="w-[95%] bg-white rounded-[2px] rotate-2 -mt-2.5 z-20 flex flex-col px-1 pt-1 pb-1.5 gap-0.5 shadow-sm">
          <div className="flex items-center gap-1 mb-0.5">
            <div className="w-1 h-1 rounded-full shrink-0" style={{ background: accent }} />
            <div className="w-[30%] h-[1px] rounded-full bg-zinc-400" />
          </div>
          <div className="w-[80%] h-[1.5px] bg-zinc-800 rounded-full" />
          <div className="w-[90%] h-[1.5px] bg-zinc-500 rounded-full mt-0.5" />
          <div className="w-[60%] h-[1.5px] bg-zinc-500 rounded-full" />
        </div>
      </div>
    ),
    // 18: Edge Half View
    18: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden bg-white">
        <div className="w-full h-[50%] border-b-[2px] shrink-0" style={{ background: img, borderColor: accent }} />
        <div className="flex-1 flex flex-col p-1.5 gap-1 border-t border-black/5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] pt-2">
          <div className="w-[90%] h-[2px] bg-zinc-800 rounded-full" />
          <div className="w-[70%] h-[2px] bg-zinc-800 rounded-full" />
          <div className="w-full h-[1.5px] bg-zinc-500 rounded-full mt-0.5" />
          <div className="w-[85%] h-[1.5px] bg-zinc-500 rounded-full" />
        </div>
      </div>
    ),
    // 19: Offset Grid
    19: (
      <div className="w-full h-full flex items-center justify-center rounded-[3px] overflow-hidden bg-[#18181b] relative p-1">
        <div className="w-[60%] h-[70%] absolute top-1 left-1 rounded-sm" style={{ background: img }} />
        <div className="w-[60%] h-[50%] absolute bottom-1 right-1 bg-surface-input/30 backdrop-blur-md rounded-sm border border-white/10 p-1 flex flex-col justify-center z-10 shadow-sm">
            <div className="w-[30%] h-[1.5px] rounded-full mb-0.5" style={{ background: accent }} />
            <div className="w-[80%] h-[2px] bg-white/90 rounded-full" />
            <div className="w-[90%] h-[1px] bg-zinc-400 rounded-full mt-0.5" />
        </div>
      </div>
    ),
    // 20: Clean Split
    20: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden bg-white">
        <div className="h-[45%] w-full shrink-0" style={{ background: img }} />
        <div className="flex-1 flex flex-col p-1.5 justify-center gap-0.5 pb-2">
           <div className="w-[80%] h-[2px] bg-zinc-800 rounded-full" />
           <div className="w-[60%] h-[2px] bg-zinc-800 rounded-full" />
           <div className="w-[30%] h-[1.5px] rounded-full mt-0.5" style={{ background: accent }} />
        </div>
      </div>
    ),
    // 21: Floating Text
    21: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden p-1 bg-[#FAFAFA] relative">
        <div className="w-[calc(100%-8px)] h-[60%] rounded-md absolute top-1 left-1" style={{ background: img }} />
        <div className="w-[85%] h-[40%] bg-white border border-black/5 rounded-md shadow-[0_2px_4px_rgba(0,0,0,0.05)] absolute bottom-1 left-1/2 -translate-x-1/2 flex flex-col justify-center items-center p-1 gap-0.5 z-10">
          <div className="w-[30%] h-[1.5px] rounded-full" style={{ background: accent }} />
          <div className="w-[80%] h-[2px] bg-zinc-800 rounded-full" />
          <div className="w-[60%] h-[1px] bg-zinc-500 rounded-full mt-0.5" />
        </div>
      </div>
    ),
    // 22: Text Frame
    22: (
      <div className="w-full h-full flex items-center justify-center rounded-[3px] overflow-hidden p-1 relative" style={{ background: accent }}>
        <div className="w-full h-full border-[1.5px] border-white/30 rounded-sm flex flex-col p-1 relative z-10">
           <div className="w-full h-[40%] bg-black/20 rounded-[2px]" style={{ background: img }} />
           <div className="flex-1 flex flex-col justify-end gap-0.5 pb-0.5">
             <div className="w-[80%] h-[2px] bg-white rounded-full" />
             <div className="w-[90%] h-[1.5px] bg-white/70 rounded-full mt-0.5" />
             <div className="w-[50%] h-[1.5px] bg-white/70 rounded-full" />
           </div>
        </div>
      </div>
    ),
    // 23: Overlap Bottom
    23: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden bg-[#18181b]">
        <div className="w-full h-[55%] relative shrink-0">
           <div className="w-full h-full rounded-b-md" style={{ background: img }} />
        </div>
        <div className="flex-1 flex flex-col items-center -mt-2 z-10 px-1">
           <div className="w-full bg-white rounded-sm p-1 flex flex-col items-center shadow-lg gap-0.5">
             <div className="w-[60%] h-[2px] bg-zinc-800 rounded-full" />
             <div className="w-[30%] h-[1.5px] rounded-full mt-0.5" style={{ background: accent }} />
           </div>
        </div>
      </div>
    ),
    // 24: Pill Shape
    24: (
      <div className="w-full h-full flex flex-col items-center rounded-[3px] overflow-hidden bg-[#FAFAFA] p-1.5">
        <div className="w-[75%] h-[50%] rounded-full shrink-0 shadow-sm border border-black/5" style={{ background: img }} />
        <div className="flex flex-col items-center w-full mt-1.5 gap-0.5">
           <div className="w-[30%] h-[1.5px] rounded-full mb-0.5" style={{ background: accent }} />
           <div className="w-[80%] h-[2px] bg-zinc-800 rounded-full" />
           <div className="w-[50%] h-[1.5px] bg-zinc-500 rounded-full" />
        </div>
      </div>
    ),
    // 25: Diagonal Split
    25: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden relative bg-[#18181b]">
        <div className="absolute top-0 left-0 right-0 h-[65%]" style={{ background: img, clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)' }} />
        <div className="absolute bottom-1 left-1.5 flex flex-col gap-0.5 z-10 w-full pl-0.5">
           <div className="w-[20%] h-[1.5px] rounded-full" style={{ background: accent }} />
           <div className="w-[70%] h-[2px] bg-white/90 rounded-full" />
           <div className="w-[50%] h-[1.5px] bg-surface-input/300 rounded-full mt-0.5" />
        </div>
      </div>
    ),
    // 26: Hero Cover
    26: (
      <div className="w-full h-full flex flex-col justify-center items-center rounded-[3px] overflow-hidden relative bg-[#18181b]">
        <div className="absolute inset-0 opacity-60" style={{ background: img }} />
        <div className="z-10 flex flex-col items-center justify-center p-1 w-full gap-0.5">
           <div className="w-[30%] h-[2px] rounded-full mb-0.5" style={{ background: accent }} />
           <div className="w-[90%] h-[2.5px] bg-white rounded-full" />
           <div className="w-[60%] h-[2.5px] bg-white rounded-full" />
           <div className="w-[80%] h-[1.5px] bg-white/70 rounded-full mt-0.5" />
        </div>
      </div>
    ),
    // 27: Grid Mirror 4-Way
    27: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden p-0.5 gap-0.5" style={{ background: dark }}>
        <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-0.5">
          <div style={{ background: img }} />
          <div style={{ background: img }} />
          <div style={{ background: img }} />
          <div style={{ background: img }} />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-4 rounded-full border border-white/20 shadow-lg flex items-center justify-center px-1" style={{ background: accent }}>
           <div className="w-full h-[2px] bg-white/80 rounded-full" />
        </div>
      </div>
    ),
    // 28: Split Side Mirror
    28: (
      <div className="w-full h-full flex rounded-[3px] overflow-hidden relative" style={{ background: dark }}>
        <div className="w-1/2 h-full border-r border-white/5" style={{ background: img }} />
        <div className="w-1/2 h-full" style={{ background: img }} />
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[80%] h-[45%] bg-white/95 rounded-md p-1 flex flex-col gap-0.5 justify-center">
           <div className="w-[30%] h-[1px]" style={{ background: accent }} />
           <div className="w-full h-[2.5px] bg-zinc-800 rounded-full" />
           <div className="w-[80%] h-[1px] bg-zinc-400 rounded-full" />
        </div>
      </div>
    ),
    // 29: Horizontal Mirror Strip
    29: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden relative" style={{ background: dark }}>
        <div className="h-1/2 w-full border-b border-white/5" style={{ background: img }} />
        <div className="h-1/2 w-full" style={{ background: img }} />
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 h-4 border-y border-white flex items-center justify-center" style={{ background: accent }}>
           <div className="w-[70%] h-[2.5px] bg-white rounded-full" />
        </div>
        <div className="absolute bottom-1 right-1 w-[45%] h-[25%] bg-white/95 rounded-sm p-1 flex items-center">
           <div className="w-full h-[1px] bg-zinc-400 rounded-full" />
        </div>
      </div>
    ),
    // 30: Vertical Mirror Pill
    30: (
      <div className="w-full h-full flex rounded-[3px] overflow-hidden relative p-0.5 gap-0.5" style={{ background: dark }}>
        <div className="flex-1 h-full rounded-sm" style={{ background: img }} />
        <div className="flex-1 h-full rounded-sm" style={{ background: img }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-4 rounded-full border border-white/20 shadow-lg flex items-center justify-center px-1" style={{ background: accent }}>
           <div className="w-full h-[2px] bg-white/80 rounded-full" />
        </div>
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[50%] h-2 bg-white/90 rounded-full flex items-center justify-center">
           <div className="w-[60%] h-[1px] bg-zinc-800 rounded-full" />
        </div>
      </div>
    ),
    // 31: Horizontal Mirror Pill
    31: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden relative p-0.5 gap-0.5" style={{ background: dark }}>
        <div className="flex-1 w-full rounded-sm" style={{ background: img }} />
        <div className="flex-1 w-full rounded-sm" style={{ background: img }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-4 rounded-full border border-white/20 shadow-lg flex items-center justify-center px-1" style={{ background: accent }}>
           <div className="w-full h-[2px] bg-white/80 rounded-full" />
        </div>
      </div>
    ),
  };

  return (
    <div
      className={`relative w-11 h-14 rounded-md overflow-hidden transition-all duration-150 cursor-pointer ring-2 ${
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
      className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-bottom-2 duration-150"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-zinc-950/95 backdrop-blur-xl border border-zinc-800/80 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-4 min-w-[280px]">
        {/* Header */}
        <VariantPopoverHeader
          label="Variante do Split"
          activeLabel={currentVariantIndex === 0 ? 'Original' : SPLIT_VARIANT_META.find(v => v.id === currentVariantIndex)?.name}
          onClose={onClose}
        />

        {/* Grid de variantes com Scroll */}
        <div className="grid grid-cols-4 gap-2.5 max-h-[320px] overflow-y-auto pr-1.5 custom-scrollbar">
          {SPLIT_VARIANT_META.map((variant) => (
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

