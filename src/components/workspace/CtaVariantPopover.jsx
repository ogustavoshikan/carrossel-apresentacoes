import React, { useRef, useEffect } from 'react';
import { Calendar, Shuffle } from 'lucide-react';
import { CTA_VARIANT_META } from '../slides/cta-variants';
import VariantPopoverHeader from './VariantPopoverHeader';
import { cn } from '../../lib/utils';

/**
 * CtaVariantPopover — Grid visual com mini-wireframes de cada variante de CTA.
 */

function VariantThumbnail({ variantId, brandColor, isSelected }) {
  const accent = brandColor;
  const dark = '#18181b';

  const layouts = {
    // 0: Original — fundo cor da marca, icon zap
    0: (
      <div className="w-full h-full flex flex-col justify-center items-center rounded-[3px] overflow-hidden p-1 gap-1" style={{ background: accent }}>
        <div className="w-4 h-4 bg-black rounded-sm flex items-center justify-center rotate-6" />
        <div className="w-[80%] h-[2px] bg-white rounded-full mt-1" />
        <div className="w-[60%] h-[1.5px] bg-white/70 rounded-full" />
        <div className="w-[70%] h-[4px] bg-white rounded-full mt-1" />
      </div>
    ),
    // 1: Minimal - circle A
    1: (
      <div className="w-full h-full flex flex-col justify-center items-center rounded-[3px] overflow-hidden p-1 gap-1 relative" style={{ background: '#050505' }}>
        <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: accent }} />
        <div className="w-5 h-5 rounded-full border flex items-center justify-center p-[1px]" style={{ borderColor: accent }}>
           <div className="w-full h-full bg-zinc-800 rounded-full" />
        </div>
        <div className="w-[80%] h-[2.5px] bg-white rounded-full mt-0.5" />
        <div className="w-[60%] h-[1.5px] bg-zinc-500 rounded-full" />
        <div className="w-[90%] h-[3.5px] rounded-full mt-1" style={{ background: accent }} />
      </div>
    ),
    // 2: Split Background
    2: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden relative" style={{ background: '#050505' }}>
        <div className="h-1/2 w-full bg-zinc-700" />
        <div className="h-1/2 w-full flex flex-col justify-center items-center p-1 gap-0.5 relative pt-3">
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#050505] rounded-full border border-black flex items-center justify-center">
             <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
          </div>
          <div className="w-[80%] h-[2px] bg-white rounded-full" />
          <div className="w-[60%] h-[1.5px] bg-zinc-500 rounded-full" />
          <div className="w-[90%] h-[3px] rounded bg-white mt-0.5 -mb-1" style={{ background: accent }} />
        </div>
      </div>
    ),
    // 3: Blur Neon Center
    3: (
      <div className="w-full h-full flex flex-col justify-center items-center rounded-[3px] overflow-hidden p-1 gap-1 relative" style={{ background: '#020202' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full opacity-40 blur-sm" style={{ background: accent }} />
        <div className="w-[90%] h-[3px] bg-white rounded-full relative z-10" />
        <div className="w-[60%] h-[1.5px] bg-white/70 rounded-full relative z-10" />
        <div className="w-[80%] h-[3px] rounded-full mt-1 relative z-10 bg-black border border-white/20 p-[1px] flex justify-center">
            <div className="w-full h-full bg-white/20 rounded-full" />
        </div>
      </div>
    ),
    // 4: Card Ticket
    4: (
      <div className="w-full h-full flex flex-col justify-center items-center rounded-[3px] overflow-hidden p-1 relative" style={{ background: '#050505' }}>
        <div className="w-[90%] bg-[#E5E5E5] rounded flex flex-col">
           <div className="p-1 border-b border-dashed border-zinc-500 flex flex-col items-center gap-0.5">
             <div className="w-[80%] h-[1.5px] bg-black rounded-full" />
             <div className="w-[60%] h-[1px] bg-zinc-600 rounded-full" />
           </div>
           <div className="p-1 bg-white flex flex-col items-center gap-0.5">
              <div className="w-[90%] h-[0.5px] bg-zinc-300 rounded-full" />
              <div className="w-[90%] h-[3px] rounded-sm mt-0.5" style={{ background: accent }} />
           </div>
        </div>
      </div>
    ),
    // 5: Blur Tilt
    5: (
      <div className="w-full h-full flex flex-col justify-center items-center rounded-[3px] overflow-hidden p-1 gap-1 bg-zinc-800">
        <div className="w-[90%] h-[85%] bg-surface-input/30 border border-white/20 rounded p-1 flex flex-col items-center justify-center gap-0.5 -rotate-2">
           <div className="w-4 h-4 rounded-full flex items-center justify-center mb-0.5 p-[2px]" style={{ background: accent }}>
             <div className="w-[50%] h-[50%] border-t border-r border-white rotate-45" />
           </div>
           <div className="w-[90%] h-[1.5px] bg-white rounded-full" />
           <div className="w-[60%] h-[1px] bg-white/70 rounded-full" />
           <div className="w-[90%] h-[2.5px] bg-white rounded-sm mt-0.5" />
        </div>
      </div>
    ),
    // 6: Clean Typo
    6: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden p-1 justify-between relative" style={{ background: '#020202' }}>
        <div className="w-full flex items-center gap-0.5 mt-0.5 px-0.5">
          <div className="w-1 h-1 rounded-full" style={{ background: accent }} />
          <div className="w-4 h-[1px] bg-zinc-500 rounded-full" />
        </div>
        <div className="flex-1 flex flex-col justify-center items-center gap-1 w-full">
           <div className="w-[90%] h-[3px] bg-white rounded-full" />
           <div className="w-[70%] h-[1.5px] bg-zinc-500 rounded-full" />
        </div>
        <div className="w-full h-[3.5px] rounded-sm mt-1" style={{ background: accent }} />
      </div>
    ),
    // 7: App Calendar
    7: (
      <div className="w-full h-full flex flex-col justify-center items-center rounded-[3px] overflow-hidden p-1 relative" style={{ background: '#050505' }}>
        <div className="w-[90%] mt-2 bg-[#0A0A0A] border border-white/20 rounded p-1.5 flex flex-col items-center gap-1 relative">
           <div className="absolute -top-1.5 left-1 w-3 h-3 bg-black border border-white/20 rounded p-[2px]" style={{ color: accent }}>
              <div className="w-full h-full bg-current opacity-50 rounded-[1px]" />
           </div>
           <div className="w-[90%] h-[1.5px] bg-white rounded-full mt-1" />
           <div className="w-[60%] h-[1px] bg-zinc-500 rounded-full" />
           <div className="w-full flex gap-[1px] mt-0.5 opacity-50">
             {[...Array(6)].map((_, i) => <div key={i} className="h-1 flex-1 bg-zinc-700" style={i===3 ? { background: accent }: {}} />)}
           </div>
           <div className="w-[90%] h-[2.5px] bg-white rounded mt-0.5" />
        </div>
      </div>
    ),
    // 8: Hacker Text Base
    8: (
      <div className="w-full h-full flex flex-col items-center justify-center rounded-[3px] overflow-hidden p-1.5 gap-1.5" style={{ background: '#000000' }}>
         <div className="w-[90%] h-[3px] bg-gradient-to-r from-white to-zinc-600 rounded-full" />
         <div className="w-[70%] h-[1.5px] bg-zinc-600 rounded-full" />
         <div className="w-full h-[3px] border border-dashed rounded-sm mt-0.5" style={{ borderColor: accent }} />
      </div>
    ),
    9: (
      <div className="w-full h-full flex flex-col justify-center items-center rounded-[3px] overflow-hidden p-1 gap-1" style={{ background: accent }}>
        <div className="w-[85%] h-[3px] bg-white rounded-full" />
        <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center mt-1">
          <div className="w-2 h-[1.5px] bg-black/60 rounded-full" />
        </div>
      </div>
    ),
    10: (
      <div className="w-full h-full flex flex-col justify-center items-center rounded-[3px] overflow-hidden p-1 gap-1 bg-black relative">
        <div className="w-4 h-4 rounded-full" style={{ background: accent }} />
        <div className="w-[75%] h-[2px] bg-white rounded-full" />
      </div>
    ),
    11: (
      <div className="w-full h-full flex flex-col items-center rounded-[3px] overflow-hidden p-1 bg-zinc-100">
        <div className="w-6 h-6 rounded-full mt-1 shrink-0" style={{ background: '#3f3f46' }} />
        <div className="w-[70%] h-[2px] bg-black/80 rounded-full mt-1" />
      </div>
    ),
    12: (
      <div className="w-full h-full flex flex-col justify-center items-center rounded-[3px] overflow-hidden p-1 gap-1 bg-zinc-900">
        <div className="w-[80%] h-[2.5px] bg-white rounded-full" />
        <div className="w-[90%] h-[3px] rounded-sm mt-1" style={{ background: accent }} />
      </div>
    ),
    13: (
      <div className="w-full h-full flex flex-col justify-center items-center rounded-[3px] overflow-hidden p-1 gap-1 bg-zinc-100">
        <div className="w-[80%] h-[3px] bg-black rounded-full" />
        <div className="w-4 h-4 rounded-full mt-0.5" style={{ background: accent }} />
      </div>
    ),
    14: (
      <div className="w-full h-full flex flex-col justify-center items-center rounded-[3px] overflow-hidden p-1 gap-1 relative" style={{ background: accent + 'CC' }}>
        <div className="w-4 h-4 rounded-full bg-white/10 border border-dashed" style={{ borderColor: accent }} />
        <div className="w-[75%] h-[2px] bg-white rounded-full" />
      </div>
    ),
    15: (
      <div className="w-full h-full flex flex-col justify-end rounded-[3px] overflow-hidden p-1 pb-1.5 relative" style={{ background: accent }}>
        <div className="w-full bg-white/10 border border-white/30 rounded-[4px] p-1 flex flex-col gap-0.5">
          <div className="w-[85%] h-[2px] bg-white rounded-full" />
          <div className="w-full h-[3px] bg-white rounded-sm mt-0.5" />
        </div>
      </div>
    ),
    16: (
      <div className="w-full h-full flex flex-col justify-center items-center rounded-[3px] overflow-hidden p-1" style={{ background: accent }}>
        <div className="w-[85%] h-[85%] border border-dashed border-white/50 rounded flex flex-col items-center justify-center gap-0.5 p-1">
          <div className="w-[60%] h-[2.5px] bg-white rounded-full" />
          <div className="w-[50%] h-[3px] bg-white rounded-full mt-0.5" />
        </div>
      </div>
    ),
    17: (
      <div className="w-full h-full flex flex-col justify-center items-center rounded-[3px] overflow-hidden p-1 gap-1 bg-black">
        <div className="w-[85%] h-[3px] bg-white rounded-full" />
        <div className="w-[55%] h-[3.5px] rounded-full mt-1" style={{ background: accent }} />
      </div>
    ),
    18: (
      <div className="w-full h-full flex items-center justify-center rounded-[3px] overflow-hidden relative" style={{ background: accent }}>
        <div className="w-[55%] h-[65%] bg-white p-[3px] rotate-3 shadow-md flex flex-col">
          <div className="flex-1 rounded-[1px]" style={{ background: '#3f3f46' }} />
        </div>
      </div>
    ),
    19: (
      <div className="w-full h-full flex flex-col p-1 rounded-[3px] overflow-hidden justify-between" style={{ background: accent }}>
        <div className="flex flex-col gap-0.5 mt-2 items-center">
          <div className="w-[80%] h-[2.5px] bg-white rounded-full" />
          <div className="w-[60%] h-[1.5px] bg-white/60 rounded-full" />
        </div>
        <div className="h-4 w-full bg-white/20 backdrop-blur-sm rounded-md flex items-center justify-between px-1 shadow-sm">
          <div className="flex gap-[1.5px]">
            <div className="w-1 h-1 rounded-full bg-white/60" />
            <div className="w-1 h-1 rounded-full bg-white/60" />
          </div>
          <div className="w-2 h-2 rounded-sm bg-white" />
        </div>
      </div>
    ),
    20: (
      <div className="w-full h-full flex flex-col items-center justify-center rounded-[3px] overflow-hidden p-1.5 relative bg-zinc-200">
        <div className="w-[80%] h-[85%] bg-white p-1 pb-3 shadow-lg rotate-2 flex flex-col border border-white">
          <div className="flex-1 rounded-sm" style={{ background: accent }} />
          <div className="mt-1 h-[1.5px] w-1/2 bg-zinc-100 rounded-full" />
        </div>
      </div>
    ),
    21: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden p-1 justify-center" style={{ background: accent }}>
        <div className="w-3 h-3 bg-zinc-900 rounded-full mb-1 flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-white/40 rounded-sm" />
        </div>
        <div className="w-[90%] h-[3px] bg-white rounded-full mb-1" />
        <div className="mt-auto flex gap-0.5">
          <div className="h-2 flex-1 bg-zinc-900/40 rounded-sm" />
          <div className="h-2 flex-1 bg-zinc-900/40 rounded-sm" />
        </div>
      </div>
    ),
    22: (
      <div className="w-full h-full flex rounded-[3px] overflow-hidden bg-white">
        <div className="flex-1 h-full p-1.5 flex flex-col justify-center" style={{ background: accent }}>
          <div className="w-[90%] h-[3px] bg-white rounded-full mb-0.5" />
          <div className="w-[60%] h-[1.5px] bg-white/60 rounded-full" />
        </div>
        <div className="w-2.5 h-full bg-zinc-950 flex flex-col items-center justify-center gap-1.5 py-2">
          <div className="w-1 h-1 rounded-full bg-white/40" />
          <div className="w-1 h-1 rounded-full bg-white/80" />
        </div>
      </div>
    ),
    23: (
      <div className="w-full h-full flex flex-col p-1 rounded-[3px] overflow-hidden bg-zinc-100">
        <div className="flex flex-col gap-0.5">
          <div className="w-[80%] h-[3px] bg-zinc-900 rounded-full" />
          <div className="w-[60%] h-[1.5px] bg-zinc-400 rounded-full" />
        </div>
        <div className="flex justify-between items-end mt-auto">
          <div className="w-6 h-2.5 bg-zinc-900 rounded-full" />
          <div className="grid grid-cols-2 gap-0.5">
            <div className="w-2 h-2 bg-white border border-zinc-200 rounded-sm" />
            <div className="w-2 h-2 rounded-sm" style={{ background: accent }} />
          </div>
        </div>
      </div>
    ),
    24: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden relative">
        <div className="absolute inset-0 bg-zinc-700 opacity-40" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex-1 flex flex-col justify-end p-1 pb-4">
          <div className="w-[90%] h-[3px] bg-white rounded-full mb-0.5 shadow-md" />
          <div className="w-[60%] h-[1.5px] bg-white/60 rounded-full shadow-sm" />
        </div>
        <div className="absolute bottom-1.5 left-[-10%] right-[-10%] h-3 bg-white/20 backdrop-blur-md rotate-[-3deg] flex items-center justify-center gap-1.5 border-y border-white/20 shadow-lg">
          <div className="flex gap-1.5 rotate-[3deg]">
            <div className="w-1 h-1 rounded-full bg-white/60" />
            <div className="w-1.5 h-1.5 rounded-sm" style={{ background: accent }} />
          </div>
        </div>
      </div>
    ),
    25: (
      <div className="w-full h-full flex flex-col p-1 rounded-[3px] overflow-hidden bg-white relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.05]">
          <div className="w-8 h-8 rounded-sm" style={{ background: accent }} />
        </div>
        <div className="flex flex-col items-center justify-center flex-1 gap-0.5 z-10">
          <div className="w-[80%] h-[3px] bg-zinc-900 rounded-full" />
          <div className="w-[60%] h-[1.5px] bg-zinc-400 rounded-full" />
        </div>
        <div className="h-4 w-full bg-zinc-900 rounded-lg flex items-center justify-between px-1.5 shadow-lg z-10 mt-auto">
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <div className="w-2 h-2 rounded-full bg-white flex items-center justify-center">
            <div className="w-1 h-1 rounded-full" style={{ background: accent }} />
          </div>
        </div>
      </div>
    ),
    // 26: Modern Split Actions
    26: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden bg-white">
        <div className="h-[65%] flex flex-col justify-center px-1 gap-0.5">
          <div className="w-[80%] h-[2px] bg-zinc-900 rounded-full" />
          <div className="w-[50%] h-[1px] bg-zinc-400 rounded-full" />
        </div>
        <div className="flex-1 bg-zinc-950 border-t-[1.5px] flex items-center justify-around px-0.5" style={{ borderColor: accent }}>
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="w-2 h-2 rounded-full" style={{ background: accent }} />
        </div>
      </div>
    ),
    // 27: Glass Floating
    27: (
      <div className="w-full h-full flex flex-col p-1 relative overflow-hidden bg-zinc-900 justify-between">
        <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[70%] rotate-[-10deg] opacity-80" style={{ background: accent }} />
        <div className="relative z-10 w-[70%] h-[2px] bg-white rounded-full mt-2" />
        <div className="relative z-10 w-[90%] h-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-sm self-end flex items-center justify-between px-1">
           <div className="w-1 h-1 rounded-full bg-white/40" />
           <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
        </div>
      </div>
    ),
    // 28: Tilted Card
    28: (
      <div className="w-full h-full flex flex-col items-center justify-center rounded-[3px] overflow-hidden bg-zinc-950 p-1 relative">
        <div className="w-[80%] aspect-[4/5] rounded-[3px] rotate-6 absolute" style={{ background: accent }} />
        <div className="w-[80%] aspect-[4/5] rounded-[3px] bg-zinc-900 border border-zinc-700 relative flex flex-col p-0.5 gap-0.5">
          <div className="w-[80%] h-[1.5px] bg-white/90 rounded-full" />
          <div className="mt-auto flex gap-0.5 justify-end">
            <div className="w-1.5 h-1.5 rounded-[1px]" style={{ background: accent }} />
          </div>
        </div>
      </div>
    ),
    // 29: Bold Frame
    29: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden bg-zinc-950 p-0.5 border-[3px]" style={{ borderColor: accent }}>
        <div className="flex-1 flex flex-col justify-center items-center gap-0.5">
          <div className="w-[70%] h-[2px] bg-white rounded-full" />
          <div className="w-[50%] h-[1px] bg-zinc-500 rounded-full" />
        </div>
        <div className="flex justify-end px-0.5 pb-0.5">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
        </div>
      </div>
    ),
    // 30: Corner Glow
    30: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden bg-zinc-950 p-1 relative">
        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full opacity-60" style={{ background: accent }} />
        <div className="relative z-10 w-[70%] h-[3px] bg-white rounded-full mt-2" />
        <div className="mt-auto w-[80%] h-3 bg-zinc-900 border border-zinc-800 rounded-sm flex items-center justify-between px-1 relative z-10">
           <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
        </div>
      </div>
    ),
    // 31: Floating Bar
    31: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden relative">
        <div className="h-[60%] w-full" style={{ background: accent }} />
        <div className="h-[40%] w-full bg-[#111]" />
        <div className="absolute top-[60%] left-0.5 right-0.5 -translate-y-1/2 h-3 bg-white rounded-sm shadow-md flex items-center justify-between px-0.5">
           <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
        </div>
      </div>
    ),
    // 32: Centered Impact
    32: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden bg-[#050505] p-1">
        <div className="flex-1 rounded-lg flex flex-col justify-center items-center gap-0.5 p-0.5" style={{ background: accent }}>
          <div className="w-[80%] h-[2px] bg-white rounded-full" />
          <div className="w-[60%] h-[1px] bg-white/60 rounded-full" />
        </div>
        <div className="flex justify-end pt-0.5 px-0.5">
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
        </div>
      </div>
    ),
    // 33: Sidebar Glossy
    33: (
      <div className="w-full h-full flex rounded-[3px] overflow-hidden bg-black relative">
        <div className="flex-1 opacity-20" style={{ background: accent }} />
        <div className="w-[25%] h-full bg-white/10 border-l border-white/20 flex flex-col items-center justify-center gap-1.5">
          <div className="w-1 h-1 rounded-full bg-white/40" />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
        </div>
        <div className="absolute left-1 top-1/2 -translate-y-1/2 w-[60%] flex flex-col gap-1">
          <div className="w-full h-[2px] bg-white rounded-full" />
          <div className="w-[70%] h-[1px] bg-white/60 rounded-full" />
        </div>
      </div>
    ),
    // 34: Floating Capsule
    34: (
      <div className="w-full h-full flex flex-col items-center justify-center rounded-[3px] overflow-hidden relative bg-zinc-900">
        <div className="flex flex-col items-center gap-1">
          <div className="w-6 h-[2px] bg-white rounded-full" />
          <div className="w-4 h-[1px] bg-white/60 rounded-full" />
        </div>
        <div className="absolute bottom-1 w-[70%] h-2.5 bg-white/90 rounded-full flex items-center justify-around px-1">
           <div className="w-1 h-1 rounded-full bg-zinc-400" />
           <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
        </div>
      </div>
    ),
    // 35: Bottom Dock
    35: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden relative bg-zinc-800">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute bottom-1 left-1 right-1 h-4 bg-zinc-900 border border-white/10 rounded-md flex justify-between items-center px-1">
           <div className="w-1 h-1 rounded-sm bg-white/10" />
           <div className="w-2.5 h-2.5 rounded-sm shadow-md" style={{ background: accent }} />
        </div>
        <div className="absolute top-[45%] left-1.5 w-[70%] flex flex-col gap-1">
          <div className="w-full h-[2px] bg-white rounded-full" />
          <div className="w-[60%] h-[1px] bg-white/60 rounded-full" />
        </div>
      </div>
    ),
    // 36: Creator Bar
    36: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden relative bg-zinc-900">
        <div className="mt-auto p-1.5 flex flex-col items-center gap-1">
          <div className="w-[80%] h-[2px] bg-white rounded-full shadow-lg" />
          <div className="w-[60%] h-[1px] bg-white/60 rounded-full mb-3" />
        </div>
        <div className="absolute bottom-1 left-1 right-1 h-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center px-1 shadow-lg">
           <div className="w-2 h-2 rounded-full border border-white/40 shrink-0" style={{ background: accent }} />
           <div className="flex-1" />
           <div className="w-2 h-2 rounded-full" style={{ background: accent }} />
        </div>
      </div>
    ),
    // 37: Split Modern
    37: (
      <div className="w-full h-full flex flex-col rounded-[3px] overflow-hidden bg-[#EBE9E1]">
        <div className="h-[40%] bg-zinc-400" />
        <div className="flex-1 bg-black p-1 flex flex-col justify-end relative">
          <div className="w-[80%] h-[2px] bg-white rounded-full mb-0.5" />
          <div className="w-[50%] h-[1px] bg-zinc-500 rounded-full mb-1" />
          <div className="absolute top-0 right-1 w-3 h-3 rounded-sm border -translate-y-1/2 rotate-3" style={{ background: accent, borderColor: 'white' }} />
        </div>
      </div>
    ),

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

export default function CtaVariantPopover({ currentVariantIndex, onSelect, onClose, brandColor }) {
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
          label="Variante CTA"
          activeLabel={CTA_VARIANT_META.find(v => v.id === currentVariantIndex)?.name || 'Desconhecida'}
          onClose={onClose}
        />

        {/* Grid de variantes com Scroll */}
        <div className="grid grid-cols-4 gap-2.5 max-h-[320px] overflow-y-auto pr-1.5 custom-scrollbar">
          {CTA_VARIANT_META.map((variant) => (
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

