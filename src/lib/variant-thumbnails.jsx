import React from 'react';

const img = '#3f3f46';
const dark = '#18181b';
const num = '#ffffff';

export const VARIANT_THUMBNAILS = {
  cover: {
    0: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden" style={{ background: dark }}>
        <div className="h-[53%]" style={{ background: img }} />
        <div className="flex-1" style={{ background: accent + 'CC' }}>
          <div className="mt-1.5 ml-1.5 w-[60%] h-[3px] bg-white/80 rounded-full" />
          <div className="mt-1 ml-1.5 w-[40%] h-[2px] bg-white/40 rounded-full" />
        </div>
      </div>
    ),
    1: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden" style={{ background: dark }}>
        <div className="h-[50%]" style={{ background: img }} />
        <div className="flex-1 relative" style={{ background: accent + 'CC' }}>
          <div className="absolute -top-2 left-1 w-[65%] h-[3px] bg-white/90 rounded-full" />
          <div className="absolute -top-0.5 left-1 w-[45%] h-[3px] bg-white/90 rounded-full" />
          <div className="mt-3 ml-1 w-[50%] h-[2px] bg-white/40 rounded-full" />
          <div className="mt-0.5 ml-1 w-[30%] h-[1.5px] bg-white/30 rounded-full" />
        </div>
      </div>
    ),
    2: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden relative" style={{ background: img }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="mt-auto relative z-10 p-1.5">
          <div className="w-[3px] h-[3px] rounded-full mb-1" style={{ background: accent }} />
          <div className="w-[70%] h-[3px] bg-white/80 rounded-full" />
          <div className="mt-0.5 w-[50%] h-[2px] bg-white/40 rounded-full" />
        </div>
      </div>
    ),
    3: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden relative" style={{ background: '#27272a' }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="mt-auto relative z-10 p-1.5">
          <div className="w-4 h-[2px] mb-1.5 rounded-full" style={{ background: accent }} />
          <div className="w-[75%] h-[3px] bg-white/80 rounded-full" />
          <div className="mt-1 w-[55%] h-[2px] bg-white/40 rounded-full border-l" style={{ borderColor: 'rgba(255,255,255,0.3)' }} />
        </div>
      </div>
    ),
    4: ({ brandColor: accent }) => (
      <div className="w-full h-full flex items-center justify-center " style={{ background: '#d4d4d8' }}>
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
    5: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden" style={{ background: dark }}>
        <div className="h-[55%]" style={{ background: img }} />
        <div className="flex-1 -mt-1 rounded-t-xl p-1.5" style={{ background: accent + 'CC' }}>
          <div className="w-[65%] h-[3px] bg-white/80 rounded-full" />
          <div className="mt-0.5 w-[45%] h-[2px] bg-white/40 rounded-full" />
        </div>
      </div>
    ),
    6: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col items-center  overflow-hidden pt-3 gap-1.5" style={{ background: dark }}>
        <div className="w-[75%] h-[45%] rounded-t-full rounded-b-lg overflow-hidden" style={{ background: img }} />
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-8 h-[3px] bg-white/80 rounded-full" />
          <div className="w-6 h-[2px] bg-zinc-500/60 rounded-full" />
        </div>
      </div>
    ),
    7: ({ brandColor: accent }) => (
      <div className="w-full h-full flex items-center justify-center  overflow-hidden relative" style={{ background: dark }}>
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
    8: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-center  overflow-hidden relative" style={{ background: '#27272a' }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="relative z-10 p-2">
          <div className="w-[70%] h-[3px] bg-white/80 rounded-full" />
          <div className="mt-1.5 w-[55%] h-[2px] bg-white/40 rounded-full pl-1 border-l-2" style={{ borderColor: accent }} />
        </div>
      </div>
    ),
    9: ({ brandColor: accent }) => (
      <div className="w-full h-full flex items-center justify-center  overflow-hidden" style={{ background: dark }}>
        <div className="w-[80%] h-[55%] bg-white rounded-lg border-2 flex flex-col items-center justify-center gap-0.5 p-1" style={{ borderColor: accent }}>
          <div className="w-3 h-[1.5px] rounded-full" style={{ background: accent }} />
          <div className="w-[65%] h-[3px] bg-black/70 rounded-full" />
          <div className="w-[45%] h-[2px] bg-black/30 rounded-full" />
        </div>
      </div>
    ),
    10: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden relative" style={{ background: '#27272a' }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        <div className="mt-auto relative z-10 p-1.5 flex flex-col items-center gap-0.5">
          <div className="w-8 h-[3px] bg-white/80 rounded-full" />
          <div className="w-6 h-[2px] bg-white/40 rounded-full" />
        </div>
      </div>
    ),
    11: ({ brandColor: accent }) => (
      <div className="w-full h-full flex items-center justify-center  p-2 relative" style={{ background: dark }}>
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
    12: ({ brandColor: accent }) => (
      <div className="w-full h-full  overflow-hidden relative" style={{ background: img }}>
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 origin-bottom-left -rotate-12 translate-y-1/2 w-[150%]" style={{ background: accent }} />
        <div className="absolute bottom-2 left-1.5 w-[70%] h-[3px] bg-white rounded-full" />
      </div>
    ),
    13: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden relative" style={{ background: dark }}>
        <div className="h-[55%]" style={{ background: img }} />
        <div className="h-[45%]" style={{ background: accent }}>
           <div className="mt-4 ml-1.5 w-[40%] h-[2px] bg-white/40 rounded-full" />
        </div>
        <div className="absolute top-[45%] left-1.5 w-[75%] h-[4px] bg-white/90 rounded-full shadow-lg" />
      </div>
    ),
    14: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden" style={{ background: accent }}>
        <div className="flex-1 p-1.5">
          <div className="w-3 h-[1.5px] bg-surface-input/300 mb-1" />
          <div className="w-[80%] h-[3px] bg-white rounded-full" />
          <div className="mt-1 w-[40%] h-[2px] bg-white/60 rounded-full" />
        </div>
        <div className="h-[30%] border-t-[2px] border-zinc-200" style={{ background: img }} />
      </div>
    ),
    15: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden p-1" style={{ background: accent }}>
        <div className="flex-1 flex flex-col bg-zinc-950 rounded-[2px] overflow-hidden">
          <div className="h-[60%]" style={{ background: img }} />
          <div className="flex-1 bg-white flex flex-col items-center justify-center gap-0.5">
            <div className="w-[60%] h-[2px] bg-black/80 rounded-full" />
            <div className="w-[40%] h-[1.5px] bg-black/30 rounded-full" />
          </div>
        </div>
      </div>
    ),
    16: ({ brandColor: accent }) => (
      <div className="w-full h-full  overflow-hidden relative" style={{ background: img }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute inset-0 opacity-40" style={{ background: `linear-gradient(to top, ${accent}, transparent)` }} />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[70%] flex flex-col items-center gap-1">
          <div className="w-full h-[3px] bg-white rounded-full" />
          <div className="w-[60%] h-[2px] bg-white/40 rounded-full" />
        </div>
      </div>
    ),
    17: ({ brandColor: accent }) => (
      <div className="w-full h-full flex  overflow-hidden" style={{ background: '#EBE9E1' }}>
        <div className="w-[55%] p-1.5 flex flex-col justify-center gap-1">
          <div className="w-3 h-[1.5px]" style={{ background: accent }} />
          <div className="w-[85%] h-[3px] bg-black/80 rounded-full" />
          <div className="w-[50%] h-[2px] bg-black/20 rounded-full" />
        </div>
        <div className="w-[45%]" style={{ background: img }} />
      </div>
    ),
    18: ({ brandColor: accent }) => (
      <div className="w-full h-full  overflow-hidden relative flex items-center justify-center" style={{ background: dark }}>
        <div className="absolute inset-0 opacity-40" style={{ background: img }} />
        <div className="absolute w-6 h-6 rounded-full blur-md opacity-60" style={{ background: accent }} />
        <div className="w-[80%] h-[50%] bg-surface-input/30 backdrop-blur-[2px] border border-white/20 rounded-lg flex flex-col items-center justify-center gap-1 relative z-10">
           <div className="w-[60%] h-[2.5px] bg-white/90 rounded-full" />
           <div className="w-[40%] h-[1.5px] bg-white/40 rounded-full" />
        </div>
      </div>
    ),
    19: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden p-1.5" style={{ background: '#fff' }}>
        <div className="flex-1 rounded-t-full rounded-b-md border-[2px]" style={{ background: img, borderColor: accent }} />
        <div className="h-6 flex flex-col items-center justify-center gap-1">
          <div className="w-[70%] h-[2.5px] bg-black/80 rounded-full" />
          <div className="w-[40%] h-[1.5px]" style={{ background: accent }} />
        </div>
      </div>
    ),
    20: ({ brandColor: accent }) => (
      <div className="w-full h-full flex items-center justify-center  overflow-hidden relative" style={{ background: '#fff' }}>
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
    21: ({ brandColor: accent }) => (
      <div className="w-full h-full  overflow-hidden relative flex flex-col justify-end p-2" style={{ background: accent }}>
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
    22: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden p-1.5 bg-white">
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
    23: ({ brandColor: accent }) => (
      <div className="w-full h-full flex  overflow-hidden relative" style={{ background: '#fff' }}>
        <div className="w-[40%] h-full flex flex-col justify-between p-1" style={{ background: accent }}>
           <div className="w-[1px] h-4 bg-white/40 ml-0.5 mt-2" />
           <div className="w-2 h-[1.5px] bg-white/60 mb-1" />
        </div>
        <div className="flex-1 h-full opacity-60" style={{ background: img }} />
        <div className="absolute top-1/2 left-2 w-[80%] h-[4px] bg-white rounded-full shadow-lg -translate-y-1/2" />
      </div>
    ),
    24: ({ brandColor: accent }) => (
      <div className="w-full h-full  overflow-hidden p-2 flex flex-col relative bg-white border border-zinc-100">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(90deg, ${accent} 1px, transparent 1px)`, backgroundSize: '6px 6px' }} />
        <div className="flex justify-between items-center mb-auto relative z-10">
           <div className="w-3 h-3 rounded-full border border-zinc-300" />
           <div className="w-4 h-[1px] bg-zinc-300" />
        </div>
        <div className="w-full h-[4px] bg-black/80 rounded-full mb-2 relative z-10" />
        <div className="w-full h-[30%] border-t" style={{ background: img, borderColor: accent }} />
      </div>
    ),
    25: ({ brandColor: accent }) => (
      <div className="w-full h-full  overflow-hidden relative flex items-center justify-center" style={{ background: dark }}>
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
    26: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden relative" style={{ background: '#fff' }}>
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
    27: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden relative" style={{ background: '#fff' }}>
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
    28: ({ brandColor: accent }) => (
      <div className="w-full h-full flex  overflow-hidden bg-white relative">
        <div className="w-[60%] h-full p-2 flex flex-col justify-center z-10">
          <div className="w-[80%] h-[4px] bg-zinc-800 rounded-full mb-1.5" />
          <div className="w-[60%] h-[2px] bg-zinc-400 rounded-full" />
        </div>
        <div className="absolute right-0 top-0 w-[45%] h-full bg-zinc-200 z-0">
          <div className="w-full h-full" style={{ background: img }} />
        </div>
      </div>
    ),
    29: ({ brandColor: accent }) => (
      <div className="w-full h-full flex p-1.5 gap-1.5  overflow-hidden bg-white relative">
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
    30: ({ brandColor: accent }) => (
      <div className="w-full h-full flex  overflow-hidden bg-white relative">
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
    31: ({ brandColor: accent }) => (
      <div className="w-full h-full flex  overflow-hidden bg-white">
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
    32: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden bg-white relative p-1">
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
    33: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden bg-black">
        <div className="h-[45%]" style={{ background: img }} />
        <div className="flex-1 p-1" style={{ background: accent }}>
          <div className="w-[70%] h-[2.5px] bg-white rounded-full mb-1" />
          <div className="w-full h-[0.5px] bg-white/40 mb-1" />
          <div className="w-[50%] h-[1.5px] bg-white/60 rounded-full" />
        </div>
      </div>
    ),
    34: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col items-center justify-center  overflow-hidden relative" style={{ background: img }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col items-center gap-1">
          <div className="w-8 h-[3px] bg-white rounded-full" />
          <div className="w-6 h-[1.5px] bg-white/60 rounded-full" />
        </div>
        <div className="absolute bottom-1 w-6 h-2 rounded-full bg-white/20 border border-white/10" />
      </div>
    ),
    35: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden relative" style={{ background: dark }}>
        <div className="h-[70%]" style={{ background: img }} />
        <div className="absolute bottom-0 w-full h-[40%] bg-white rounded-t-lg p-1 flex flex-col justify-center gap-0.5 shadow-lg">
          <div className="w-[40%] h-[1px]" style={{ background: accent }} />
          <div className="w-[70%] h-[2.5px] bg-black/80 rounded-full" />
        </div>
      </div>
    ),
    36: ({ brandColor: accent }) => (
      <div className="w-full h-full flex  overflow-hidden" style={{ background: '#EBE9E1' }}>
        <div className="w-[55%] p-1.5 flex flex-col justify-center gap-1">
          <div className="w-[85%] h-[3px] bg-black/80 rounded-full" />
          <div className="w-[60%] h-[2.5px] bg-zinc-400 rounded-full" />
        </div>
        <div className="w-[45%]" style={{ background: img }} />
      </div>
    ),
    37: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col p-1.5  overflow-hidden" style={{ background: accent }}>
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
    38: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-end p-1.5  overflow-hidden relative" style={{ background: img }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <div className="relative z-10 flex flex-col gap-1">
          <div className="w-4 h-[1px]" style={{ background: accent }} />
          <div className="w-[75%] h-[3px] bg-white rounded-full" />
          <div className="w-[60%] h-[1.5px] bg-zinc-300 rounded-full" />
        </div>
      </div>
    ),
    39: ({ brandColor: accent }) => (
      <div className="w-full h-full flex  overflow-hidden bg-zinc-900">
        <div className="flex-1 opacity-40" style={{ background: img }} />
        <div className="w-3 h-full shrink-0 flex items-center justify-center" style={{ background: accent }}>
           <div className="w-[1.5px] h-[70%] bg-white/40 rounded-full" />
        </div>
      </div>
    ),
    40: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden relative bg-white">
        <div className="h-[65%] w-full" style={{ background: img }} />
        <div className="flex-1 w-full bg-zinc-900" />
        <div className="absolute top-[45%] left-1/2 -translate-x-1/2 w-[80%] h-[40%] bg-white/90 rounded-md shadow-sm border border-white/50 p-1 flex flex-col justify-center gap-1">
           <div className="w-[70%] h-[3px] bg-black rounded-full" />
           <div className="w-[50%] h-[1.5px] bg-zinc-400 rounded-full" />
        </div>
      </div>
    ),
    41: ({ brandColor: accent }) => (
      <div className="w-full h-full  overflow-hidden relative grayscale" style={{ background: img }}>
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute top-4 -left-2 w-[120%] h-6 bg-zinc-900 border-y-[1.5px] shadow-md -rotate-6 flex items-center px-4" style={{ borderColor: accent }}>
           <div className="w-[60%] h-[3px] bg-white rounded-full" />
        </div>
        <div className="absolute bottom-1 left-1.5 w-8 h-3 bg-zinc-900 border-l-[2px]" style={{ borderColor: accent }} />
      </div>
    ),
    42: ({ brandColor: accent }) => (
      <div className="w-full h-full p-1 bg-white flex flex-col gap-1  overflow-hidden">
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
    43: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col items-center justify-center p-1 bg-white  overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 flex flex-col gap-0.5 justify-center">
           {[...Array(6)].map((_, i) => (
             <div key={i} className="w-[120%] h-[2px]" style={{ background: accent }} />
           ))}
        </div>
        <div className="w-[70%] h-[75%] rounded-md border-[1.5px] border-white shadow-md relative z-10" style={{ background: img }} />
        <div className="absolute bottom-1 right-1 w-6 h-2 bg-white rounded-full border border-zinc-100 shadow-sm" />
      </div>
    ),
    44: ({ brandColor: accent }) => (
      <div className="w-full h-full bg-white  overflow-hidden relative">
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full opacity-40" style={{ background: img }} />
        <div className="absolute top-4 -right-2 w-8 h-8 rounded-full opacity-60 shadow-sm" style={{ background: img }} />
        <div className="absolute bottom-1 right-2 w-10 h-10 rounded-full shadow-md" style={{ background: img }} />
        <div className="absolute bottom-6 left-1 w-[60%] flex flex-col gap-1 z-10">
           <div className="w-[80%] h-[2.5px] bg-black rounded-full" />
           <div className="w-[50%] h-[1.5px] bg-zinc-400 rounded-full" />
        </div>
      </div>
    ),
    45: ({ brandColor: accent }) => (
      <div className="w-full h-full flex  overflow-hidden relative p-0.5 gap-0.5" style={{ background: dark }}>
        <div className="flex-1 h-full rounded-sm" style={{ background: img }} />
        <div className="flex-1 h-full rounded-sm" style={{ background: img }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-3 rounded-full shadow-lg flex items-center justify-center px-1" style={{ background: accent }}>
           <div className="w-full h-[1.5px] bg-white rounded-full" />
        </div>
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[80%] h-3 bg-zinc-900 rounded-full flex items-center justify-between px-1 border border-zinc-700">
           <div className="w-[60%] h-[1px] bg-white/60" />
           <div className="w-1.5 h-1.5 border-t border-r border-white rotate-45 scale-[0.6]" />
        </div>
      </div>
    ),
    46: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden relative p-0.5 gap-0.5" style={{ background: dark }}>
        <div className="flex-1 w-full rounded-sm" style={{ background: img }} />
        <div className="flex-1 w-full rounded-sm" style={{ background: img }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-3 rounded-full shadow-lg flex items-center justify-center px-1" style={{ background: accent }}>
           <div className="w-full h-[1.5px] bg-white rounded-full" />
        </div>
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[80%] h-3 bg-zinc-900 rounded-full flex items-center justify-between px-1 border border-zinc-700">
           <div className="w-[60%] h-[1px] bg-white/60" />
           <div className="w-1.5 h-1.5 border-t border-r border-white rotate-45 scale-[0.6]" />
        </div>
      </div>
    ),
  },
  'content-split': {
    0: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden p-1.5 gap-1" style={{ background: dark }}>
        <div className="w-full h-[45%] rounded-lg" style={{ background: img }} />
        <div className="flex items-center gap-1">
          <div className="w-2 h-[1.5px] rounded-full" style={{ background: accent }} />
          <div className="w-3 h-[1.5px] rounded-full opacity-60" style={{ background: accent }} />
        </div>
        <div className="w-[70%] h-[3px] bg-white/80 rounded-full" />
        <div className="w-[55%] h-[2px] bg-zinc-500/60 rounded-full" />
      </div>
    ),
    1: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden p-1.5 gap-1" style={{ background: '#050505' }}>
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
    2: ({ brandColor: accent }) => (
      <div className="w-full h-full flex  overflow-hidden" style={{ background: dark }}>
        <div className="w-[45%] h-full border-r border-white/10" style={{ background: img }} />
        <div className="flex-1 p-1.5 flex flex-col justify-center gap-1">
          <div className="w-[80%] h-[1.5px] rounded-full bg-white/20" />
          <div className="w-[70%] h-[3px] bg-white/80 rounded-full" />
          <div className="w-[90%] h-[3px] bg-white/80 rounded-full" />
          <div className="w-[55%] h-[2px] bg-zinc-500/60 rounded-full mt-0.5" />
        </div>
      </div>
    ),
    3: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden" style={{ background: dark }}>
        <div className="h-[50%] border-b border-white/10 p-1.5 flex flex-col justify-center gap-1">
          <div className="w-3 h-[1.5px] rounded-full" style={{ background: accent }} />
          <div className="w-[70%] h-[3px] bg-white/80 rounded-full" />
          <div className="w-[55%] h-[2px] bg-zinc-500/60 rounded-full" />
        </div>
        <div className="h-[50%]" style={{ background: img }} />
      </div>
    ),
    4: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden p-1 gap-1" style={{ background: '#050505' }}>
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
    5: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden border-[2px] border-black" style={{ background: '#E5E5E5' }}>
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
    7: ({ brandColor: accent }) => (
      <div className="w-full h-full flex items-center justify-center  overflow-hidden p-2 relative" style={{ background: '#0A0A0A' }}>
        <div className="w-full h-[80%] bg-white rounded-xl shadow-lg flex flex-col items-center justify-center p-1.5 gap-1 relative">
           <div className="w-[30%] h-[1.5px] rounded-full" style={{ background: accent }} />
           <div className="w-[80%] h-[3px] bg-black/80 rounded-full" />
           <div className="w-[60%] h-[1.5px] bg-black/20 rounded-full" />
           <div className="absolute -top-2 -right-1 w-5 h-5 rounded-full border border-white shadow-md overflow-hidden" style={{ background: img }} />
        </div>
      </div>
    ),
    8: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden p-1.5 gap-1 bg-[#FAFAFA]">
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
    9: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col items-center p-1 relative  overflow-hidden" style={{ background: '#F4F4F5' }}>
        <div className="w-6 h-6 rounded-full mt-1 border-[1.5px] border-white shadow-sm z-10 shrink-0" style={{ background: img }} />
        <div className="w-[90%] h-[45%] bg-white border border-black/5 rounded-md -mt-2 p-1 flex flex-col items-center gap-1 justify-end pb-1.5">
           <div className="w-[80%] h-[2px] rounded-full mt-0.5" style={{ background: accent }} />
           <div className="w-[60%] h-[2px] rounded-full" style={{ background: accent }} />
           <div className="w-[70%] h-[1px] bg-zinc-400 mt-0.5" />
        </div>
      </div>
    ),
    10: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col items-center  overflow-hidden p-1 bg-[#E8E8E8]">
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
    11: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col relative  overflow-hidden bg-[#FAFAFA]">
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
    12: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col items-center  overflow-hidden" style={{ background: accent }}>
        <div className="w-[60%] h-[2px] bg-white rounded-full mt-3" />
        <div className="w-[40%] h-[2px] bg-white rounded-full mt-0.5" />
        <div className="w-[26px] h-[26px] rounded-full mt-1.5 border-[1.5px] border-white/20 shrink-0" style={{ background: img }} />
        <div className="w-[80%] h-[1.5px] bg-white/70 rounded-full mt-1.5" />
        <div className="w-[50%] h-[1.5px] bg-white/70 rounded-full mt-0.5" />
      </div>
    ),
    13: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden p-1 border-[1.5px]" style={{ background: '#ffffff', borderColor: accent }}>
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
    14: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden p-1 relative bg-[#FAFAFA]">
        <div className="w-[85%] h-[45%] absolute top-2 right-1 rounded-sm border border-white z-0" style={{ background: img }} />
        <div className="relative mt-auto w-[90%] bg-white border border-black/5 rounded px-1 py-1.5 flex flex-col gap-0.5 shadow-sm z-10 -ml-0.5">
          <div className="w-[30%] h-[1.5px] rounded-full" style={{ background: accent }} />
          <div className="w-[80%] h-[2px] bg-zinc-800 rounded-full mt-0.5" />
          <div className="w-[90%] h-[1.5px] bg-zinc-500 rounded-full" />
          <div className="w-[60%] h-[1.5px] bg-zinc-500 rounded-full" />
        </div>
      </div>
    ),
    15: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col items-center  overflow-hidden p-1 bg-[#FAFAFA]">
        <div className="w-full h-[45%] rounded-t-full rounded-b-[2px] mb-1 shrink-0" style={{ background: img }} />
        <div className="flex flex-col items-center w-full gap-0.5 mt-0.5">
          <div className="w-[30%] h-[1.5px] rounded-full mb-0.5" style={{ background: accent }} />
          <div className="w-[70%] h-[2px] bg-zinc-800 rounded-full" />
          <div className="w-[90%] h-[1.5px] bg-zinc-500 rounded-full mt-0.5" />
          <div className="w-[50%] h-[1.5px] bg-zinc-500 rounded-full" />
        </div>
      </div>
    ),
    16: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden p-1 bg-[#FAFAFA]">
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
    17: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col items-center justify-center  overflow-hidden p-1 relative bg-[#18181b]">
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
    18: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden bg-white">
        <div className="w-full h-[50%] border-b-[2px] shrink-0" style={{ background: img, borderColor: accent }} />
        <div className="flex-1 flex flex-col p-1.5 gap-1 border-t border-black/5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] pt-2">
          <div className="w-[90%] h-[2px] bg-zinc-800 rounded-full" />
          <div className="w-[70%] h-[2px] bg-zinc-800 rounded-full" />
          <div className="w-full h-[1.5px] bg-zinc-500 rounded-full mt-0.5" />
          <div className="w-[85%] h-[1.5px] bg-zinc-500 rounded-full" />
        </div>
      </div>
    ),
    19: ({ brandColor: accent }) => (
      <div className="w-full h-full flex items-center justify-center  overflow-hidden bg-[#18181b] relative p-1">
        <div className="w-[60%] h-[70%] absolute top-1 left-1 rounded-sm" style={{ background: img }} />
        <div className="w-[60%] h-[50%] absolute bottom-1 right-1 bg-surface-input/30 backdrop-blur-md rounded-sm border border-white/10 p-1 flex flex-col justify-center z-10 shadow-sm">
            <div className="w-[30%] h-[1.5px] rounded-full mb-0.5" style={{ background: accent }} />
            <div className="w-[80%] h-[2px] bg-white/90 rounded-full" />
            <div className="w-[90%] h-[1px] bg-zinc-400 rounded-full mt-0.5" />
        </div>
      </div>
    ),
    20: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden bg-white">
        <div className="h-[45%] w-full shrink-0" style={{ background: img }} />
        <div className="flex-1 flex flex-col p-1.5 justify-center gap-0.5 pb-2">
           <div className="w-[80%] h-[2px] bg-zinc-800 rounded-full" />
           <div className="w-[60%] h-[2px] bg-zinc-800 rounded-full" />
           <div className="w-[30%] h-[1.5px] rounded-full mt-0.5" style={{ background: accent }} />
        </div>
      </div>
    ),
    21: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden p-1 bg-[#FAFAFA] relative">
        <div className="w-[calc(100%-8px)] h-[60%] rounded-md absolute top-1 left-1" style={{ background: img }} />
        <div className="w-[85%] h-[40%] bg-white border border-black/5 rounded-md shadow-[0_2px_4px_rgba(0,0,0,0.05)] absolute bottom-1 left-1/2 -translate-x-1/2 flex flex-col justify-center items-center p-1 gap-0.5 z-10">
          <div className="w-[30%] h-[1.5px] rounded-full" style={{ background: accent }} />
          <div className="w-[80%] h-[2px] bg-zinc-800 rounded-full" />
          <div className="w-[60%] h-[1px] bg-zinc-500 rounded-full mt-0.5" />
        </div>
      </div>
    ),
    22: ({ brandColor: accent }) => (
      <div className="w-full h-full flex items-center justify-center  overflow-hidden p-1 relative" style={{ background: accent }}>
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
    23: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden bg-[#18181b]">
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
    24: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col items-center  overflow-hidden bg-[#FAFAFA] p-1.5">
        <div className="w-[75%] h-[50%] rounded-full shrink-0 shadow-sm border border-black/5" style={{ background: img }} />
        <div className="flex flex-col items-center w-full mt-1.5 gap-0.5">
           <div className="w-[30%] h-[1.5px] rounded-full mb-0.5" style={{ background: accent }} />
           <div className="w-[80%] h-[2px] bg-zinc-800 rounded-full" />
           <div className="w-[50%] h-[1.5px] bg-zinc-500 rounded-full" />
        </div>
      </div>
    ),
    25: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden relative bg-[#18181b]">
        <div className="absolute top-0 left-0 right-0 h-[65%]" style={{ background: img, clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)' }} />
        <div className="absolute bottom-1 left-1.5 flex flex-col gap-0.5 z-10 w-full pl-0.5">
           <div className="w-[20%] h-[1.5px] rounded-full" style={{ background: accent }} />
           <div className="w-[70%] h-[2px] bg-white/90 rounded-full" />
           <div className="w-[50%] h-[1.5px] bg-surface-input/300 rounded-full mt-0.5" />
        </div>
      </div>
    ),
    26: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-center items-center  overflow-hidden relative bg-[#18181b]">
        <div className="absolute inset-0 opacity-60" style={{ background: img }} />
        <div className="z-10 flex flex-col items-center justify-center p-1 w-full gap-0.5">
           <div className="w-[30%] h-[2px] rounded-full mb-0.5" style={{ background: accent }} />
           <div className="w-[90%] h-[2.5px] bg-white rounded-full" />
           <div className="w-[60%] h-[2.5px] bg-white rounded-full" />
           <div className="w-[80%] h-[1.5px] bg-white/70 rounded-full mt-0.5" />
        </div>
      </div>
    ),
    27: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden p-0.5 gap-0.5" style={{ background: dark }}>
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
    28: ({ brandColor: accent }) => (
      <div className="w-full h-full flex  overflow-hidden relative" style={{ background: dark }}>
        <div className="w-1/2 h-full border-r border-white/5" style={{ background: img }} />
        <div className="w-1/2 h-full" style={{ background: img }} />
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[80%] h-[45%] bg-white/95 rounded-md p-1 flex flex-col gap-0.5 justify-center">
           <div className="w-[30%] h-[1px]" style={{ background: accent }} />
           <div className="w-full h-[2.5px] bg-zinc-800 rounded-full" />
           <div className="w-[80%] h-[1px] bg-zinc-400 rounded-full" />
        </div>
      </div>
    ),
    29: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden relative" style={{ background: dark }}>
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
    30: ({ brandColor: accent }) => (
      <div className="w-full h-full flex  overflow-hidden relative p-0.5 gap-0.5" style={{ background: dark }}>
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
    31: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden relative p-0.5 gap-0.5" style={{ background: dark }}>
        <div className="flex-1 w-full rounded-sm" style={{ background: img }} />
        <div className="flex-1 w-full rounded-sm" style={{ background: img }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-4 rounded-full border border-white/20 shadow-lg flex items-center justify-center px-1" style={{ background: accent }}>
           <div className="w-full h-[2px] bg-white/80 rounded-full" />
        </div>
      </div>
    ),
  },
  'big-number': {
    0: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden p-1.5 gap-1" style={{ background: dark }}>
        <div className="w-[75%] h-[28%] rounded" style={{ background: num, opacity: 0.9 }} />
        <div className="px-1.5 py-0.5 rounded self-start" style={{ background: accent, maxWidth: '65%' }}>
          <div className="w-8 h-[2px] rounded-full bg-white/80" />
        </div>
        <div className="w-[80%] h-[2px] bg-white/30 rounded-full" />
        <div className="w-[65%] h-[2px] bg-white/20 rounded-full" />
        <div className="flex-1 w-full rounded-lg mt-0.5" style={{ background: img }} />
      </div>
    ),
    1: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden p-1.5 gap-1" style={{ background: '#050505' }}>
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
    2: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col items-center justify-center  overflow-hidden" style={{ background: '#080808' }}>
        <div className="absolute opacity-5 font-black text-white" style={{ fontSize: '40px' }}>N</div>
        <div className="w-[60%] h-[30%] rounded mb-1" style={{ background: accent, opacity: 0.9 }} />
        <div className="px-2 py-0.5 rounded-full border border-white/20">
          <div className="w-8 h-[1.5px] bg-white/60 rounded-full" />
        </div>
        <div className="w-[55%] h-[1.5px] bg-zinc-600 rounded-full mt-1" />
      </div>
    ),
    3: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden" style={{ background: '#050505' }}>
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
    4: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col items-center justify-center  overflow-hidden p-1.5" style={{ background: '#050505' }}>
        <div className="absolute opacity-5 font-black text-white text-[32px] leading-none pointer-events-none">N</div>
        <div className="w-full bg-black/40 rounded-lg border border-white/10 p-1.5 flex flex-col gap-1">
          <div className="w-[40%] h-[1.5px] rounded-full" style={{ background: accent }} />
          <div className="w-[80%] h-[2px] bg-white/70 rounded-full" />
          <div className="w-[65%] h-[1.5px] bg-white/40 rounded-full" />
        </div>
      </div>
    ),
    5: ({ brandColor: accent }) => (
      <div className="w-full h-full flex  overflow-hidden" style={{ background: '#080808' }}>
        <div className="w-[45%] h-full flex items-center justify-end p-1">
          <div className="w-[60%] h-[35%] rounded" style={{ background: accent, opacity: 0.9 }} />
        </div>
        <div className="flex-1 h-full p-1.5 flex flex-col justify-center gap-1 border-l border-white/10" style={{ background: '#27272a' }}>
          <div className="w-[50%] h-[1.5px] bg-surface-input/300 rounded-full" />
          <div className="w-[80%] h-[1.5px] bg-zinc-500/60 rounded-full" />
          <div className="w-full h-6 rounded-lg mt-0.5" style={{ background: img }} />
        </div>
      </div>
    ),
    6: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden p-1.5 gap-1" style={{ background: '#050505' }}>
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-full shrink-0" style={{ background: accent }} />
          <div className="w-[50%] h-[2px] bg-white/70 rounded-full" />
        </div>
        <div className="flex-1 w-full rounded-lg border border-white/10 p-1 flex flex-col justify-center gap-0.5" style={{ background: '#0A0A0A' }}>
          <div className="w-[80%] h-[1.5px] bg-surface-input/300 rounded-full" />
          <div className="w-[65%] h-[1.5px] bg-white/30 rounded-full" />
        </div>
      </div>
    ),
    7: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col items-center justify-center  overflow-hidden p-1.5 gap-1" style={{ background: '#020202' }}>
        <div className="w-[70%] h-[30%] rounded" style={{ background: `linear-gradient(135deg, ${img}, ${accent})`, opacity: 0.9 }} />
        <div className="w-[40%] h-[1.5px] rounded-full" style={{ background: accent }} />
        <div className="w-[65%] h-[1.5px] bg-zinc-600 rounded-full" />
        <div className="w-[55%] h-[1.5px] bg-zinc-700 rounded-full" />
      </div>
    ),
    8: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden p-1.5 relative" style={{ background: '#080808' }}>
        <div className="absolute right-0 top-[20%] opacity-80 font-black text-transparent border-r-0"
          style={{ WebkitTextStroke: `1px ${accent}`, fontSize: '32px', lineHeight: 1 }}>N</div>
        <div className="flex-1 flex flex-col justify-end gap-1">
          <div className="w-[75%] h-12 rounded-lg" style={{ background: img }} />
          <div className="w-[50%] h-[1.5px] bg-white/40 rounded-full" />
          <div className="w-[75%] h-[1.5px] bg-white/25 rounded-full" />
        </div>
      </div>
    ),
    9: ({ brandColor: accent }) => (
      <div className="w-full h-full flex  overflow-hidden">
        <div className="w-[22%] h-full flex items-center justify-center border-r border-white/10" style={{ background: accent }}>
          <div className="w-[1.5px] h-[60%] bg-white/80 rounded-full" />
        </div>
        <div className="flex-1 p-1.5 flex flex-col justify-center gap-1">
          <div className="w-[45%] h-[1.5px] bg-zinc-600 rounded-full" />
          <div className="w-[85%] h-[2px] bg-white/70 rounded-full" />
          <div className="w-[75%] h-[1.5px] bg-surface-input/300 rounded-full" />
          <div className="w-[60%] h-[1.5px] bg-white/30 rounded-full" />
        </div>
      </div>
    ),
    10: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden relative">
        <div className="h-[50%]" style={{ background: img, opacity: 0.6 }} />
        <div className="h-[50%]" style={{ background: accent }} />
        <div className="absolute left-1.5 top-[35%] font-black text-white leading-none" style={{ fontSize: '20px', lineHeight: 1 }}>N</div>
      </div>
    ),
    11: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden p-1 gap-1" style={{ background: '#020202' }}>
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
    12: ({ brandColor: accent }) => (
      <div className="w-full h-full flex  overflow-hidden p-2 gap-2" style={{ background: '#050505' }}>
        <div className="flex items-center justify-center">
          <div className="w-4 h-6 rounded-[2px]" style={{ background: accent, opacity: 0.9, boxShadow: `0 4px 8px ${accent}40` }} />
        </div>
        <div className="flex-1 bg-surface-input/30 backdrop-blur-[2px] border border-white/10 rounded-lg p-1.5 flex flex-col justify-center gap-1">
           <div className="w-4 h-[1px] bg-zinc-500 rounded-full" />
           <div className="w-[85%] h-[1.5px] bg-white/70 rounded-full" />
        </div>
      </div>
    ),
    13: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col items-center justify-center  overflow-hidden p-2 relative" style={{ background: '#080808' }}>
        <div className="absolute inset-0 opacity-10 blur-xl rounded-full scale-110" style={{ background: accent }} />
        <div className="w-6 h-8 bg-white rounded-[2px] mb-2 relative z-10 shadow-lg" />
        <div className="w-4 h-[1px] rounded-full relative z-10" style={{ background: accent }} />
        <div className="w-[70%] h-[1.5px] bg-zinc-600 rounded-full mt-1 relative z-10" />
      </div>
    ),
  },
  quote: {
    0: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-center items-center  overflow-hidden p-1.5 gap-1.5" style={{ background: '#f4f4f5' }}>
        <div className="w-4 h-4 text-zinc-300">"</div>
        <div className="w-3 h-[2px] rounded-full" style={{ background: accent }} />
        <div className="w-[80%] h-[2.5px] bg-zinc-800 rounded-full" />
        <div className="w-[60%] h-[2px] bg-zinc-400 rounded-full mt-0.5" />
      </div>
    ),
    1: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-center  overflow-hidden p-1.5 pl-2.5 gap-1" style={{ background: '#050505' }}>
        <div className="absolute left-0 top-1/4 bottom-1/4 w-[2px] rounded-r-md" style={{ background: accent }} />
        <div className="text-zinc-700 leading-none" style={{ fontSize: '10px' }}>"</div>
        <div className="w-[80%] h-[2.5px] bg-white rounded-full mt-0.5" />
        <div className="w-[50%] h-[2px] bg-zinc-500 rounded-full" />
      </div>
    ),
    2: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-center items-center  overflow-hidden p-1.5 gap-1" style={{ background: '#050505' }}>
        <div className="w-[90%] h-[2.5px] bg-white rounded-full" />
        <div className="w-[60%] h-[2.5px] bg-white rounded-full" />
        <div className="w-[40%] h-[2px] rounded-full mt-1" style={{ background: accent }} />
      </div>
    ),
    3: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-center items-center  overflow-hidden p-1.5 gap-1" style={{ background: accent }}>
        <div className="w-[80%] h-[3px] bg-white rounded-full" />
        <div className="w-[50%] h-[3px] bg-white rounded-full" />
        <div className="w-4 h-[1px] bg-surface-input/300 rounded-full mt-0.5" />
        <div className="w-[40%] h-[1.5px] bg-white/90 rounded-full" />
      </div>
    ),
    4: ({ brandColor: accent }) => (
      <div className="w-full h-full flex  overflow-hidden" style={{ background: dark }}>
        <div className="w-[30%] h-full bg-zinc-700/50" />
        <div className="w-[70%] h-full flex flex-col justify-center p-1.5 gap-1">
          <div className="w-2 h-2 rounded-sm" style={{ background: accent }} />
          <div className="w-[85%] h-[2px] bg-white rounded-full mt-0.5" />
          <div className="w-[45%] h-[1.5px] bg-zinc-500 rounded-full mt-0.5" />
        </div>
      </div>
    ),
    5: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-center items-center  overflow-hidden p-1.5" style={{ background: '#020202' }}>
        <div className="w-[90%] h-[80%] border border-white/20 rounded bg-surface-input/30 p-1 flex flex-col items-center justify-center gap-1.5 relative">
          <div className="absolute -top-1.5 w-3 h-3 bg-[#020202] rounded-sm flex items-center justify-center" style={{ left: '2px' }}>
            <div className="w-1.5 h-1.5 rounded-sm" style={{ background: accent }} />
          </div>
          <div className="w-[80%] h-[2px] bg-white rounded-full" />
          <div className="w-[50%] h-[1.5px] bg-zinc-500 rounded-full mt-1" />
        </div>
      </div>
    ),
    6: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden p-1.5 justify-center gap-1.5" style={{ background: '#18181b' }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: accent }} />
        <div className="w-[40%] h-[1.5px] bg-zinc-500 rounded-full mt-1" />
        <div className="w-[90%] h-[2.5px] bg-white rounded-full" />
        <div className="w-[60%] h-[2.5px] bg-white rounded-full" />
      </div>
    ),
    7: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-center items-center  overflow-hidden p-1.5" style={{ background: '#050505' }}>
        <div className="w-[80%] h-[80%] bg-white rounded border border-zinc-500 p-1 flex flex-col items-center justify-center gap-1 relative shadow-[2px_2px_0_0_rgba(255,255,255,0.2)]">
          <div className="absolute -top-1 -left-1 w-2.5 h-2.5 rounded-[1px]" style={{ background: accent }} />
          <div className="w-[80%] h-[2px] bg-black rounded-full" />
          <div className="w-[50%] h-[1px] bg-zinc-500 rounded-full" />
        </div>
      </div>
    ),
    8: ({ brandColor: accent }) => (
      <div className="w-full h-full flex  overflow-hidden" style={{ background: '#050505' }}>
        <div className="w-[20%] h-full flex items-center justify-center" style={{ background: accent }}>
          <div className="w-[1px] h-[60%] bg-black/40 rounded-full" />
        </div>
        <div className="w-[80%] h-full bg-[#020202] flex items-center p-1.5">
          <div className="w-[80%] h-[2.5px] bg-white rounded-full" />
        </div>
      </div>
    ),
    9: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col items-center justify-center  overflow-hidden p-1.5 gap-1.5" style={{ background: '#050505' }}>
        <div className="w-[90%] h-[3.5px] bg-gradient-to-r from-white to-zinc-600 rounded-full" />
        <div className="w-[60%] h-[3.5px] bg-gradient-to-r from-white to-zinc-600 rounded-full" />
        <div className="w-[40%] h-[1.5px] rounded-full mt-1" style={{ background: accent }} />
      </div>
    ),
    10: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-center  overflow-hidden p-1.5 gap-1" style={{ background: '#080808' }}>
        <div className="w-[90%] bg-surface-input/30 border border-white/20 p-1.5 rounded-sm rounded-bl-none flex items-center">
           <div className="w-[70%] h-[2px] bg-white rounded-full" />
        </div>
        <div className="w-[40%] h-[1.5px] bg-zinc-500 rounded-full ml-1" />
      </div>
    ),
    11: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-center border-[2px] border-white  overflow-hidden p-1.5 gap-1" style={{ background: '#E5E5E5' }}>
        <div className="flex gap-1 items-center pl-1 border-l" style={{ borderColor: accent }}>
           <div className="flex flex-col gap-1 w-full relative">
             <div className="w-[80%] h-[2.5px] bg-black rounded-full" />
             <div className="w-[50%] h-[2.5px] bg-black rounded-full" />
             <div className="w-[40%] h-[1.5px] bg-zinc-500 rounded-full mt-0.5" />
           </div>
        </div>
      </div>
    ),
    12: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-center  overflow-hidden p-1.5 gap-1.5" style={{ background: '#050505' }}>
        <div className="w-[85%] h-[2px] bg-white rounded-full self-center" />
        <div className="w-[60%] h-[2px] bg-white rounded-full self-center" />
        <div className="flex items-center gap-1 mt-1">
           <div className="w-4 h-4 rounded-full" style={{ background: img }} />
           <div className="flex flex-col gap-0.5">
             <div className="w-6 h-[1.5px] bg-white/80 rounded-full" />
             <div className="w-4 h-[1px] bg-zinc-500 rounded-full" />
           </div>
        </div>
      </div>
    )
  },
  comparison: {
    0: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col pt-1.5 px-1.5 gap-1  overflow-hidden" style={{ background: '#1c1c1c' }}>
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
    1: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-center items-center  overflow-hidden p-1.5 gap-1" style={{ background: '#050505' }}>
         <div className="w-full flex-1 flex flex-col gap-0.5">
           <div className="w-full p-1 rounded-[2px] bg-surface-input/30 opacity-50 flex" />
           <div className="w-full p-1 rounded-[2px] shadow-xl flex" style={{ background: `${accent}15` }} />
           <div className="w-full p-1 rounded-[2px] bg-surface-input/30 opacity-50 flex" />
         </div>
      </div>
    ),
    2: ({ brandColor: accent }) => (
      <div className="w-full h-full flex  overflow-hidden">
         <div className="w-1/2 h-full bg-zinc-900 border-r border-black/20 p-1" />
         <div className="w-1/2 h-full p-1" style={{ background: accent }} />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-black rounded-full" />
      </div>
    ),
    3: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-center items-center  overflow-hidden p-1.5 gap-1" style={{ background: '#050505' }}>
         <div className="w-full flex-1 bg-[#0A0A0A] border border-white/10 rounded-[4px] flex flex-col items-center justify-center gap-1">
            <div className="w-full flex items-center justify-center gap-1 border-b border-white/5 pb-0.5">
              <div className="w-2 h-[1px] bg-zinc-600 rounded-full" />
              <div className="w-px h-2 bg-white/20" />
              <div className="w-2 h-[1.5px] rounded-full" style={{ background: accent }} />
            </div>
         </div>
      </div>
    ),
    4: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-center  overflow-hidden p-1.5 gap-1" style={{ background: '#050505' }}>
         <div className="grid grid-cols-2 gap-1 w-full flex-1">
           <div className="rounded-[2px] border border-white/20" />
           <div className="rounded-[2px] bg-white shadow-xl" />
           <div className="rounded-[2px] border border-white/20" />
           <div className="rounded-[2px] bg-white shadow-xl" />
         </div>
      </div>
    ),
    5: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden p-1 gap-1" style={{ background: '#E5E5E5' }}>
         <div className="relative flex-1 w-full mt-1">
            <div className="absolute inset-0.5 bg-white border border-black/10  shadow-sm transform -rotate-6" />
            <div className="absolute inset-x-1 bottom-0 top-2 bg-black  shadow-lg transform rotate-3" />
         </div>
      </div>
    ),
    6: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden p-1.5 gap-1" style={{ background: '#020202' }}>
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
    7: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-center items-center  overflow-hidden p-1.5 gap-1" style={{ background: '#050505' }}>
         <div className="w-full flex-1 border border-white/10  flex flex-col overflow-hidden">
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
    8: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden p-1.5 gap-1" style={{ background: '#080808' }}>
         <div className="relative flex-1 w-full mt-1">
           <div className="absolute left-0 top-0 bottom-2 w-[70%] bg-zinc-900 border border-zinc-700 " />
           <div className="absolute right-0 top-2 bottom-0 w-[70%] " style={{ background: accent }} />
         </div>
      </div>
    ),
    9: ({ brandColor: accent }) => (
      <div className="w-full h-full flex  overflow-hidden relative" style={{ background: '#050505' }}>
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
    10: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col items-center justify-center  overflow-hidden p-1.5 gap-1" style={{ background: '#080808' }}>
         <div className="w-[80%] h-2 bg-[#050505] rounded-full border border-white/10 flex p-[1px]">
           <div className="w-1/2" />
           <div className="w-1/2 rounded-full" style={{ background: accent }} />
         </div>
         <div className="w-full flex-1 bg-surface-input/30 border border-white/10 " />
      </div>
    ),
    11: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden p-1.5 gap-1.5" style={{ background: '#E5E5E5' }}>
         <div className="w-full h-[3px] border-b border-black/10 relative mt-2">
            <div className="w-[60%] h-[1.5px] bg-zinc-400 line-through decoration-red-500" />
            <div className="absolute -top-1.5 right-0 w-[50%] h-[2px] transform -rotate-2" style={{ background: accent }} />
         </div>
      </div>
    ),
    13: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden bg-white">
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
    14: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden relative">
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
    15: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col p-1 gap-1  overflow-hidden bg-white">
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
    16: ({ brandColor: accent }) => (
      <div className="w-full h-full flex  overflow-hidden relative">
        <div className="w-1/2 h-full bg-zinc-400" />
        <div className="w-1/2 h-full bg-zinc-800 border-l border-white" />
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[70%] h-2.5 bg-white/90 rounded-full border border-white/50" />
        <div className="absolute bottom-2 left-1 w-3 h-[1px] bg-white/40" />
        <div className="absolute bottom-2 right-1 w-3 h-[1px] bg-white/60" />
      </div>
    ),
    17: ({ brandColor: accent }) => (
      <div className="w-full h-full bg-zinc-900  overflow-hidden relative">
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
    18: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col items-center justify-center p-1.5 bg-black  overflow-hidden relative">
        <div className="absolute inset-0 opacity-40" style={{ background: img }} />
        <div className="w-[80%] h-[1.5px] bg-white rounded-full mb-2 z-10" />
        <div className="w-full flex flex-col gap-1 z-10">
           <div className="w-[85%] h-5 bg-white/10 border border-white/20 rounded-sm -ml-1" />
           <div className="w-[85%] h-5 bg-white/90 border rounded-sm ml-1" style={{ borderColor: accent }} />
        </div>
      </div>
    ),
    19: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col items-center justify-center p-1.5 bg-white  overflow-hidden relative">
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
    20: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden bg-black">
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
    21: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col p-1 gap-1  overflow-hidden bg-black">
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
    22: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden bg-black">
        <div className="h-1/2 w-full bg-zinc-800 relative">
           <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white/20" />
        </div>
        <div className="h-1/2 w-full relative" style={{ background: accent }}>
           <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white/40" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-2.5 bg-black rounded-full border border-zinc-800" />
      </div>
    ),
    23: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col items-center justify-center p-1.5 bg-black  overflow-hidden relative">
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
    24: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col p-2 gap-2  overflow-hidden bg-black relative">
        <div className="absolute inset-0 opacity-20" style={{ background: img }} />
        <div className="w-[60%] h-[1.5px] bg-white rounded-full self-center z-10" />
        <div className="flex-1 flex flex-col gap-2 z-10 justify-center">
           <div className="w-full h-[1px] bg-white/20 border-l-2 border-white/10" />
           <div className="w-full h-[1px] bg-white/40 border-l-2" style={{ borderColor: accent }} />
        </div>
      </div>
    )
  },
  list: {
    0: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col pt-1.5 px-1.5 gap-[2px]  overflow-hidden bg-[#050505]">
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
    1: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col pt-1.5 px-1.5 gap-[2px]  overflow-hidden bg-[#050505]">
         <div className="w-[60%] h-[2.5px] bg-white rounded-full mb-1" />
         {[...Array(4)].map((_, i) => (
           <div key={i} className="flex gap-1 items-center border-b border-white/10 pb-[1px]">
             <div className="w-1.5 h-2 bg-white/20 rounded-[1px]" />
             <div className="flex-1 h-[1.5px] bg-surface-input/300 rounded-full" />
           </div>
         ))}
      </div>
    ),
    2: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-center gap-1  overflow-hidden bg-[#050505] p-1">
         {[...Array(3)].map((_, i) => (
           <div key={i} className="w-full h-[8px] bg-[#0A0A0A] border-l-[1.5px] rounded-r-sm p-[1px] flex flex-col gap-[1px]" style={{ borderLeftColor: accent }}>
             <div className="w-[60%] h-[1px] bg-white rounded-full" />
             <div className="w-[80%] h-[1px] bg-white/40 rounded-full" />
           </div>
         ))}
      </div>
    ),
    3: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-center px-2 border-l border-white/20 ml-1  bg-[#050505] gap-1.5 relative">
         {[...Array(3)].map((_, i) => (
           <div key={i} className="relative w-full h-[6px] bg-surface-input/30 rounded-sm p-[1px]">
             <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-1 h-1 rounded-full border-[1px] border-black" style={{ background: accent }} />
             <div className="w-[90%] h-[1.5px] bg-surface-input/300 rounded-full" />
           </div>
         ))}
      </div>
    ),
    4: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-center relative  bg-[#080808] p-1 gap-1">
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
    5: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-end pt-2 pb-1 px-1  bg-[#050505] relative">
         <div className="absolute top-2 w-[85%] left-1/2 -translate-x-1/2 h-[12px] bg-zinc-800 rounded-sm scale-90" />
         <div className="absolute top-4 w-[90%] left-1/2 -translate-x-1/2 h-[14px] bg-zinc-800 rounded-sm scale-95" />
         <div className="relative w-full h-[18px] bg-zinc-800 rounded-sm border border-white/20 shadow-xl" />
      </div>
    ),
    6: ({ brandColor: accent }) => (
      <div className="w-full h-full  bg-[#080808] p-1 flex flex-col">
         <div className="flex-1 grid grid-cols-2 grid-rows-3 gap-[2px]">
           <div className="col-span-2 row-span-2 bg-zinc-800 rounded-[2px]" />
           <div className="col-span-1 row-span-1 bg-zinc-800 rounded-[2px]" />
           <div className="col-span-1 row-span-1 bg-zinc-800 rounded-[2px]" />
         </div>
      </div>
    ),
    7: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-center relative  bg-[#050505] p-1 gap-1 pl-2.5">
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
    8: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-center  bg-[#080808] p-1 gap-1">
         {[...Array(3)].map((_, i) => (
           <div key={i} className="w-full h-[10px] bg-surface-input/30 rounded-[2px] relative overflow-hidden flex items-center px-1">
              <div className="w-[60%] h-[1.5px]" style={{ background: accent }} />
              <div className="absolute -right-1 -bottom-1 w-4 h-4 bg-white/20 rounded-full" />
           </div>
         ))}
      </div>
    ),
    9: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-center  bg-[#050505] p-1">
         <div className="grid grid-cols-2 gap-1 w-full relative">
           {[...Array(4)].map((_, i) => (
             <div key={i} className="h-[12px] bg-zinc-800 rounded-[2px] flex items-center p-[1px]">
                <div className="w-1.5 h-1.5 rounded-full ml-[1px]" style={{ background: accent }} />
             </div>
           ))}
         </div>
      </div>
    ),
    10: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-center  bg-[#050505] p-1 gap-0.5">
         {[...Array(3)].map((_, i) => (
           <div key={i} className="w-[70%] h-[8px] bg-surface-input/30 rounded-[2px] flex items-center px-[1px] gap-0.5" style={{ marginLeft: `${i * 10}%` }}>
              <div className="w-1.5 h-1.5 bg-black rounded-full" />
              <div className="w-3 h-[1.5px] bg-white/60 rounded-full" />
           </div>
         ))}
      </div>
    ),
    11: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col items-center justify-center  bg-zinc-950 p-1 gap-1.5">
         <div className="flex gap-[2px] justify-center">
           <div className="w-[12px] h-[4px] bg-zinc-900 border border-zinc-800 rounded-full flex items-center p-[1px]">
             <div className="w-[1.5px] h-[1.5px] rounded-full" style={{ background: accent }} />
           </div>
           <div className="w-[14px] h-[4px] bg-zinc-900 border border-zinc-800 rounded-full flex items-center p-[1px]">
             <div className="w-[1.5px] h-[1.5px] rounded-full" style={{ background: accent }} />
           </div>
         </div>
         <div className="w-[90%] h-[12px] bg-zinc-900 border border-zinc-800  flex items-center justify-center px-1">
           <div className="w-[80%] h-[1px] bg-surface-input/300" />
         </div>
      </div>
    ),
    12: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-center  bg-zinc-950 p-1.5 gap-1.5">
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
    13: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-center  bg-[#080808] p-1.5 gap-2 relative overflow-hidden">
         {[...Array(3)].map((_, i) => (
           <div key={i} className="relative flex flex-col justify-center pl-4 border-l" style={{ borderColor: accent }}>
             <div className="absolute -left-1 -top-1 opacity-10 font-black text-[14px]" style={{ color: accent }}>{i+1}</div>
             <div className="w-[70%] h-[1.5px] bg-white/80 mb-0.5" />
             <div className="w-[40%] h-[1px] bg-white/30" />
           </div>
         ))}
      </div>
    ),
    14: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col pt-1 px-1.5 gap-1  overflow-hidden bg-zinc-50">
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
    15: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col pt-2 px-1.5 gap-2  overflow-hidden bg-zinc-900 relative">
        <div className="absolute left-[7px] top-4 bottom-4 w-[0.5px] bg-white/20" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-2 items-center relative z-10">
            <div className="w-1.5 h-1.5 rounded-full border border-black" style={{ background: accent }} />
            <div className="flex-1 h-[1px] bg-zinc-600" />
          </div>
        ))}
      </div>
    ),
    16: ({ brandColor: accent }) => (
      <div className="w-full h-full p-1  bg-zinc-100 grid grid-cols-2 gap-1 content-center">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-4 bg-white rounded-[1px] border border-zinc-200 p-0.5">
            <div className="w-1.5 h-1.5 bg-zinc-200" />
          </div>
        ))}
      </div>
    ),
    17: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col p-1.5 gap-2  overflow-hidden bg-zinc-50 justify-center">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-2 items-center relative">
            <span className="text-[12px] font-black opacity-10" style={{ color: accent }}>{i+1}</span>
            <div className="flex-1 h-[1px] bg-zinc-300" />
          </div>
        ))}
      </div>
    ),
    18: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col p-1.5 gap-1.5  overflow-hidden bg-zinc-900 justify-center">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-1.5 items-center bg-zinc-800 p-0.5 rounded-[1px] border border-zinc-700">
            <div className="w-1.5 h-1.5 bg-zinc-600 rounded-[1px]" />
            <div className="flex-1 h-[1px] bg-zinc-500" />
          </div>
        ))}
      </div>
    ),
    19: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col p-1.5 gap-1.5  overflow-hidden bg-zinc-50 justify-center">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex flex-col gap-0.5 bg-white border-l border-zinc-200 p-0.5" style={{ borderLeftColor: accent }}>
            <div className="w-3 h-[0.5px] bg-zinc-400" />
            <div className="w-5 h-[1px] bg-zinc-800" />
          </div>
        ))}
      </div>
    ),
    20: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col p-2 gap-2  overflow-hidden bg-zinc-50 relative justify-center">
        <div className="absolute left-[10.5px] top-2 bottom-2 w-[0.5px] bg-zinc-200" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-2 items-center relative z-10">
            <div className="w-1.5 h-1.5 rounded-full border border-white" style={{ borderColor: accent }} />
            <div className="flex-1 h-[1px] bg-zinc-400" />
          </div>
        ))}
      </div>
    ),
    21: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col p-2 gap-2  overflow-hidden bg-zinc-50 justify-center">
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
    22: ({ brandColor: accent }) => (
      <div className="w-full h-full flex  overflow-hidden bg-zinc-50">
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
    23: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col p-1.5 gap-1  overflow-hidden bg-zinc-50 justify-center">
        <div className="h-3 bg-white border border-zinc-200 rounded-[2px]" />
        <div className="h-4 rounded-[2px] flex items-center px-1 shadow-sm" style={{ background: accent }}>
           <div className="w-full h-[1px] bg-white/40" />
        </div>
        <div className="h-3 bg-white border border-zinc-200 rounded-[2px]" />
      </div>
    ),
    24: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col p-1.5 gap-1.5  overflow-hidden bg-zinc-50">
        <div className="w-[40%] h-[1.5px] bg-zinc-800 self-end mb-1" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex flex-col gap-1" style={{ paddingLeft: `${i * 4}px` }}>
            <div className="w-2 h-[1px]" style={{ background: accent }} />
            <div className="w-5 h-[1px] bg-zinc-300" />
          </div>
        ))}
      </div>
    ),
    25: ({ brandColor: accent }) => (
      <div className="w-full h-full p-1  bg-zinc-50 grid grid-cols-2 gap-1 content-center">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-5 bg-white rounded-[4px] border border-zinc-100 flex flex-col items-center justify-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ background: accent }} />
            <div className="w-3 h-[0.5px] bg-zinc-200" />
          </div>
        ))}
      </div>
    ),
    26: ({ brandColor: accent }) => (
      <div className="w-full h-full flex  overflow-hidden bg-zinc-50">
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
    27: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden bg-white">
        <div className="h-[40%] bg-zinc-200" />
        <div className="flex-1 p-1.5 grid grid-cols-2 gap-1 content-center">
           {[...Array(4)].map((_, i) => (
             <div key={i} className="h-4 bg-zinc-50 border border-zinc-100 rounded-[2px]" />
           ))}
        </div>
      </div>
    ),
    28: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col p-1.5 gap-1.5  overflow-hidden bg-black justify-center">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-2 items-center">
            <span className="text-[12px] font-black opacity-30" style={{ color: accent }}>{i+1}</span>
            <div className="flex-1 h-[1.5px] bg-zinc-800 border-l border-white" style={{ borderLeftColor: accent }} />
          </div>
        ))}
      </div>
    ),
    29: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col p-1.5 gap-1  overflow-hidden bg-zinc-900 justify-center">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-4 bg-white/10 border border-white/20 rounded-[4px] flex items-center px-1">
             <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
          </div>
        ))}
      </div>
    ),
    30: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col p-1.5 gap-1  overflow-hidden bg-zinc-50 justify-center">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-4 bg-white border border-zinc-200 rounded-full flex items-center px-2 gap-1.5">
             <div className="w-1 h-1 rounded-full" style={{ background: accent }} />
             <div className="flex-1 h-[1px] bg-zinc-200" />
          </div>
        ))}
      </div>
    )
  },
  cta: {
    0: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-center items-center  overflow-hidden p-1 gap-1" style={{ background: accent }}>
        <div className="w-4 h-4 bg-black rounded-sm flex items-center justify-center rotate-6" />
        <div className="w-[80%] h-[2px] bg-white rounded-full mt-1" />
        <div className="w-[60%] h-[1.5px] bg-white/70 rounded-full" />
        <div className="w-[70%] h-[4px] bg-white rounded-full mt-1" />
      </div>
    ),
    1: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-center items-center  overflow-hidden p-1 gap-1 relative" style={{ background: '#050505' }}>
        <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: accent }} />
        <div className="w-5 h-5 rounded-full border flex items-center justify-center p-[1px]" style={{ borderColor: accent }}>
           <div className="w-full h-full bg-zinc-800 rounded-full" />
        </div>
        <div className="w-[80%] h-[2.5px] bg-white rounded-full mt-0.5" />
        <div className="w-[60%] h-[1.5px] bg-zinc-500 rounded-full" />
        <div className="w-[90%] h-[3.5px] rounded-full mt-1" style={{ background: accent }} />
      </div>
    ),
    2: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden relative" style={{ background: '#050505' }}>
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
    3: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-center items-center  overflow-hidden p-1 gap-1 relative" style={{ background: '#020202' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full opacity-40 blur-sm" style={{ background: accent }} />
        <div className="w-[90%] h-[3px] bg-white rounded-full relative z-10" />
        <div className="w-[60%] h-[1.5px] bg-white/70 rounded-full relative z-10" />
        <div className="w-[80%] h-[3px] rounded-full mt-1 relative z-10 bg-black border border-white/20 p-[1px] flex justify-center">
            <div className="w-full h-full bg-white/20 rounded-full" />
        </div>
      </div>
    ),
    4: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-center items-center  overflow-hidden p-1 relative" style={{ background: '#050505' }}>
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
    5: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-center items-center  overflow-hidden p-1 gap-1 bg-zinc-800">
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
    6: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden p-1 justify-between relative" style={{ background: '#020202' }}>
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
    7: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-center items-center  overflow-hidden p-1 relative" style={{ background: '#050505' }}>
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
    8: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col items-center justify-center  overflow-hidden p-1.5 gap-1.5" style={{ background: '#000000' }}>
         <div className="w-[90%] h-[3px] bg-gradient-to-r from-white to-zinc-600 rounded-full" />
         <div className="w-[70%] h-[1.5px] bg-zinc-600 rounded-full" />
         <div className="w-full h-[3px] border border-dashed rounded-sm mt-0.5" style={{ borderColor: accent }} />
      </div>
    ),
    9: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-center items-center  overflow-hidden p-1 gap-1" style={{ background: accent }}>
        <div className="w-[85%] h-[3px] bg-white rounded-full" />
        <div className="w-[65%] h-[1.5px] bg-white/70 rounded-full" />
        <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center mt-1">
          <div className="w-2 h-[1.5px] bg-black/60 rounded-full" />
        </div>
        <div className="w-[50%] h-[1px] bg-white/40 rounded-full mt-1" />
      </div>
    ),
    10: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-center items-center  overflow-hidden p-1 gap-1 bg-black relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="text-white font-black text-[18px] tracking-tighter">CTA</div>
        </div>
        <div className="w-4 h-4 rounded-full relative z-10" style={{ background: accent }} />
        <div className="w-[75%] h-[2px] bg-white rounded-full relative z-10" />
        <div className="w-[50%] h-[1.5px] bg-white/50 rounded-full relative z-10" />
        <div className="w-[60%] h-[1.5px] border-b border-white relative z-10 mt-0.5" />
      </div>
    ),
    11: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col items-center  overflow-hidden p-1 bg-zinc-100">
        <div className="w-6 h-6 rounded-full border-[1.5px] border-white shadow-sm mt-1 shrink-0" style={{ background: '#3f3f46' }} />
        <div className="flex flex-col items-center gap-0.5 mt-1">
          <div className="w-[70%] h-[2px] bg-black/80 rounded-full" />
          <div className="w-[55%] h-[1.5px] bg-zinc-500 rounded-full" />
        </div>
        <div className="w-full mt-auto flex justify-between items-center px-1 pb-1 border-t border-zinc-300 pt-0.5">
          <div className="w-[40%] h-[1px] bg-zinc-400 rounded-full" />
          <div className="flex gap-0.5">
            <div className="w-1.5 h-1.5 rounded-sm bg-zinc-300" />
            <div className="w-1.5 h-1.5 rounded-sm bg-zinc-300" />
          </div>
        </div>
      </div>
    ),
    12: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-center items-center  overflow-hidden p-1 gap-1 bg-zinc-900">
        <div className="w-[80%] h-[2.5px] bg-white rounded-full" />
        <div className="w-[60%] h-[1.5px] bg-zinc-500 rounded-full" />
        <div className="w-[90%] h-[3px] rounded-sm mt-1" style={{ background: accent }} />
        <div className="w-[90%] h-[3px] rounded-sm bg-zinc-700 border border-zinc-600" />
      </div>
    ),
    13: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-center items-center  overflow-hidden p-1 gap-1 bg-zinc-100">
        <div className="w-[80%] h-[3px] bg-black rounded-full" />
        <div className="w-[60%] h-[1.5px] bg-zinc-500 rounded-full" />
        <div className="w-[1px] h-2 bg-zinc-400 mt-0.5" />
        <div className="w-4 h-4 rounded-full mt-0.5" style={{ background: accent }} />
      </div>
    ),
    14: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-center items-center  overflow-hidden p-1 gap-1 relative" style={{ background: accent + 'CC' }}>
        <div className="absolute inset-1 border border-white/20 rounded-[6px]" />
        <div className="w-4 h-4 rounded-full bg-white/10 border border-dashed relative z-10" style={{ borderColor: accent }} />
        <div className="w-[75%] h-[2px] bg-white rounded-full relative z-10" />
        <div className="w-[50%] h-[1.5px] bg-white/60 rounded-full relative z-10" />
        <div className="w-[60%] h-[2.5px] rounded-full border border-white/30 bg-white/10 relative z-10 mt-0.5" />
      </div>
    ),
    15: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-end  overflow-hidden p-1 pb-1.5 relative" style={{ background: accent }}>
        <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-white/30 blur-sm" />
        <div className="w-full bg-white/10 border border-white/30 rounded-[4px] p-1 flex flex-col gap-0.5 relative z-10 backdrop-blur-sm">
          <div className="w-[85%] h-[2px] bg-white rounded-full" />
          <div className="w-[60%] h-[1.5px] bg-white/70 rounded-full" />
          <div className="w-full h-[3px] bg-white rounded-sm mt-0.5" />
        </div>
      </div>
    ),
    16: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-center items-center  overflow-hidden p-1" style={{ background: accent }}>
        <div className="w-[85%] h-[85%] border border-dashed border-white/50 rounded flex flex-col items-center justify-center gap-0.5 p-1">
          <div className="w-[60%] h-[2.5px] bg-white rounded-full" />
          <div className="w-[45%] h-[1.5px] bg-white/70 rounded-full" />
          <div className="w-[50%] h-[3px] bg-white rounded-full mt-0.5" />
        </div>
      </div>
    ),
    17: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col justify-center items-center  overflow-hidden p-1 gap-1 bg-black">
        <div className="w-[85%] h-[3px] bg-white rounded-full" />
        <div className="w-[65%] h-[1.5px] bg-zinc-600 rounded-full" />
        <div className="w-[55%] h-[3.5px] rounded-full mt-1" style={{ background: accent, boxShadow: `0 0 4px ${accent}` }} />
      </div>
    ),
    18: ({ brandColor: accent }) => (
      <div className="w-full h-full flex items-center justify-center  overflow-hidden relative" style={{ background: accent }}>
        <div className="w-[55%] h-[65%] bg-white p-[3px] rotate-3 shadow-md flex flex-col z-10">
          <div className="flex-1 rounded-[1px]" style={{ background: '#3f3f46' }} />
          <div className="h-2 flex items-center px-1 justify-between">
            <div className="w-3 h-[1px] bg-black/30" />
            <div className="w-1.5 h-1.5 border-r border-t border-black/40 rotate-45 scale-50" />
          </div>
        </div>
        <div className="absolute top-1 left-1 w-[55%] -rotate-6 z-20">
          <div className="w-full h-[3px] bg-white rounded-full shadow-sm" />
        </div>
      </div>
    ),
    19: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col p-1.5  overflow-hidden justify-between" style={{ background: accent }}>
        <div className="flex flex-col gap-1 mt-4 items-center">
          <div className="w-[80%] h-[3px] bg-white rounded-full" />
          <div className="w-[60%] h-[2px] bg-white/60 rounded-full" />
        </div>
        <div className="h-4 w-full bg-white/20 backdrop-blur-sm rounded-md flex items-center justify-between px-1 shadow-sm">
          <div className="flex gap-[2px]">
            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
          </div>
          <div className="w-2 h-2 rounded-sm bg-white" />
        </div>
      </div>
    ),
    20: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col items-center justify-center  overflow-hidden p-2 relative bg-zinc-200">
        <div className="w-[80%] h-[80%] bg-white p-1 pb-4 shadow-lg rotate-2 flex flex-col border border-white">
          <div className="flex-1 rounded-sm" style={{ background: accent }} />
          <div className="mt-1 h-[2px] w-1/2 bg-zinc-100 rounded-full" />
        </div>
      </div>
    ),
    21: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden p-2 justify-center" style={{ background: accent }}>
        <div className="w-4 h-4 bg-zinc-900 rounded-full mb-2 flex items-center justify-center">
          <div className="w-2 h-2 bg-white/40 rounded-sm" />
        </div>
        <div className="w-[90%] h-[4px] bg-white rounded-full mb-1" />
        <div className="w-[60%] h-[2px] bg-white/60 rounded-full" />
        <div className="mt-auto flex gap-1">
          <div className="h-3 flex-1 bg-zinc-900/40 rounded-sm" />
          <div className="h-3 flex-1 bg-zinc-900/40 rounded-sm" />
          <div className="h-3 flex-1 bg-zinc-900/40 rounded-sm" />
        </div>
      </div>
    ),
    22: ({ brandColor: accent }) => (
      <div className="w-full h-full flex  overflow-hidden bg-white">
        <div className="flex-1 h-full p-2 flex flex-col justify-center" style={{ background: accent }}>
          <div className="w-[90%] h-[4px] bg-white rounded-full mb-1" />
          <div className="w-[60%] h-[2px] bg-white/60 rounded-full" />
        </div>
        <div className="w-3 h-full bg-zinc-950 flex flex-col items-center justify-center gap-2 py-2">
          <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
        </div>
      </div>
    ),
    23: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col p-2  overflow-hidden bg-zinc-100">
        <div className="flex flex-col gap-1 mb-auto">
          <div className="w-[80%] h-[4px] bg-zinc-900 rounded-full" />
          <div className="w-[60%] h-[2px] bg-zinc-400 rounded-full" />
        </div>
        <div className="flex justify-between items-end mt-4">
          <div className="w-8 h-3 bg-zinc-900 rounded-full" />
          <div className="grid grid-cols-2 gap-0.5">
            <div className="w-3 h-3 bg-white border border-zinc-200 rounded-sm" />
            <div className="w-3 h-3 bg-white border border-zinc-200 rounded-sm" />
            <div className="w-3 h-3 bg-white border border-zinc-200 rounded-sm" />
            <div className="w-3 h-3 rounded-sm" style={{ background: accent }} />
          </div>
        </div>
      </div>
    ),
    24: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden relative">
        <div className="absolute inset-0 grayscale opacity-40" style={{ background: img }} />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex-1 flex flex-col justify-end p-2 pb-6">
          <div className="w-[90%] h-[4px] bg-white rounded-full mb-1 shadow-md" />
          <div className="w-[60%] h-[2px] bg-white/60 rounded-full shadow-sm" />
        </div>
        <div className="absolute bottom-2 left-[-10%] right-[-10%] h-4 bg-white/20 backdrop-blur-md rotate-[-3deg] flex items-center justify-center gap-2 border-y border-white/20 shadow-lg">
          <div className="flex gap-2 rotate-[3deg]">
            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <div className="w-2 h-2 rounded-sm" style={{ background: accent }} />
          </div>
        </div>
      </div>
    ),
    25: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col p-2  overflow-hidden bg-white relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none">
          <div className="w-12 h-12 rounded-sm" style={{ background: accent }} />
        </div>
        <div className="flex flex-col items-center justify-center flex-1 text-center gap-1 z-10">
          <div className="w-[80%] h-[4px] bg-zinc-900 rounded-full" />
          <div className="w-[60%] h-[2px] bg-zinc-400 rounded-full" />
        </div>
        <div className="h-6 w-full bg-zinc-900 rounded-xl flex items-center justify-between px-2 shadow-lg z-10 mt-auto">
          <div className="flex gap-[2px]">
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-white flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
          </div>
        </div>
      </div>
    ),
    26: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden bg-white">
        <div className="h-[65%] flex flex-col justify-center px-1.5 gap-1">
          <div className="w-[80%] h-[2.5px] bg-zinc-900 rounded-full" />
          <div className="w-[50%] h-[1.5px] bg-zinc-400 rounded-full" />
        </div>
        <div className="flex-1 bg-zinc-950 border-t-[1.5px] flex items-center justify-around px-1" style={{ borderColor: accent }}>
          <div className="w-2 h-2 rounded-full bg-white/10" />
          <div className="w-2 h-2 rounded-full bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: accent }} />
        </div>
      </div>
    ),
    27: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col p-1.5 relative overflow-hidden bg-zinc-900 justify-between">
        <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[70%] rotate-[-10deg] opacity-80" style={{ background: accent }} />
        <div className="relative z-10 w-[70%] h-[3px] bg-white rounded-full mt-4" />
        <div className="relative z-10 w-[85%] h-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md self-end flex items-center justify-between px-1">
           <div className="flex gap-[1px]">
             <div className="w-1 h-1 rounded-full bg-white/40" />
             <div className="w-1 h-1 rounded-full bg-white/40" />
           </div>
           <div className="w-2 h-2 rounded-full bg-white/80" />
        </div>
      </div>
    ),
    28: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col items-center justify-center  overflow-hidden bg-zinc-950 p-2 relative">
        <div className="w-[80%] aspect-[4/5] rounded-[4px] rotate-6 absolute" style={{ background: accent }} />
        <div className="w-[80%] aspect-[4/5] rounded-[4px] bg-zinc-900 border border-zinc-700 relative flex flex-col p-1 gap-1">
          <div className="w-[80%] h-[2px] bg-white/90 rounded-full" />
          <div className="w-[50%] h-[1px] bg-zinc-500 rounded-full" />
          <div className="mt-auto flex gap-0.5 justify-between">
            <div className="w-2 h-2 bg-white/10 rounded-[1px]" />
            <div className="w-2 h-2 bg-white/10 rounded-[1px]" />
            <div className="w-2 h-2 rounded-[1px]" style={{ background: accent }} />
          </div>
        </div>
      </div>
    ),
    29: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden bg-zinc-950 p-1 border-[3px]" style={{ borderColor: accent }}>
        <div className="flex-1 flex flex-col justify-center items-center gap-1">
          <div className="w-[70%] h-[3px] bg-white rounded-full" />
          <div className="w-[50%] h-[1.5px] bg-zinc-500 rounded-full" />
        </div>
        <div className="h-[2px] w-full bg-zinc-800 mb-1" />
        <div className="flex justify-between items-center px-1 pb-0.5">
          <div className="w-2 h-1 bg-white/20 rounded-full" />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
        </div>
      </div>
    ),
    30: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden bg-zinc-950 p-2 relative">
        <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full opacity-60" style={{ background: accent }} />
        <div className="relative z-10 w-[70%] h-[4px] bg-white rounded-full mt-4" />
        <div className="relative z-10 w-[60%] h-[2px] bg-white/60 rounded-full mt-1" />
        <div className="mt-auto w-[75%] h-4 bg-zinc-900 border border-zinc-800 rounded-md flex items-center justify-between px-1 relative z-10">
           <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
           <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
        </div>
      </div>
    ),
    31: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden relative">
        <div className="h-[60%] w-full" style={{ background: accent }} />
        <div className="h-[40%] w-full bg-[#111]" />
        <div className="absolute top-[60%] left-1 right-1 -translate-y-1/2 h-4 bg-white rounded-md shadow-md flex items-center justify-between px-1 border border-zinc-200">
           <div className="flex gap-0.5">
             <div className="w-1 h-1 rounded-full bg-zinc-300" />
             <div className="w-1 h-1 rounded-full bg-zinc-300" />
           </div>
           <div className="w-1.5 h-1.5 rounded-sm" style={{ background: accent }} />
        </div>
      </div>
    ),
    32: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden bg-[#050505] p-2">
        <div className="flex-1 rounded-xl flex flex-col justify-center items-center gap-1 shadow-inner p-1" style={{ background: accent }}>
          <div className="w-[80%] h-[3px] bg-white rounded-full" />
          <div className="w-[60%] h-[1.5px] bg-white/60 rounded-full" />
        </div>
        <div className="flex justify-between items-center pt-1 px-1">
          <div className="w-[50%] h-[1px] bg-zinc-700 rounded-full" />
          <div className="w-2 h-2 rounded-full bg-white/10" />
        </div>
      </div>
    ),
    33: ({ brandColor: accent }) => (
      <div className="w-full h-full flex  overflow-hidden bg-black relative">
        <div className="flex-1" style={{ background: img }} />
        <div className="w-[25%] h-full bg-white/10 backdrop-blur-sm border-l border-white/20 flex flex-col items-center justify-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
          <div className="w-3 h-3 rounded-full shadow-lg" style={{ background: accent }} />
        </div>
        <div className="absolute left-1 top-1/2 -translate-y-1/2 w-[60%] flex flex-col gap-1">
          <div className="w-full h-[3px] bg-white rounded-full shadow-lg" />
          <div className="w-[70%] h-[1.5px] bg-white/60 rounded-full" />
        </div>
      </div>
    ),
    34: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col items-center justify-center  overflow-hidden relative" style={{ background: img }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col items-center gap-1">
          <div className="w-8 h-[3px] bg-white rounded-full shadow-lg" />
          <div className="w-6 h-[1.5px] bg-white/60 rounded-full" />
        </div>
        <div className="absolute bottom-1 w-[70%] h-3 bg-white/90 rounded-full border border-white flex items-center justify-around px-1">
           <div className="w-1 h-1 rounded-full bg-zinc-400" />
           <div className="w-1 h-1 rounded-full bg-zinc-400" />
           <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
        </div>
      </div>
    ),
    35: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden relative" style={{ background: img }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute bottom-1 left-1 right-1 h-5 bg-zinc-900 border border-white/10 rounded-md p-1 flex justify-between items-center shadow-lg">
           <div className="flex gap-[1px]">
             <div className="w-1.5 h-1.5 rounded-sm bg-white/10" />
             <div className="w-1.5 h-1.5 rounded-sm bg-white/10" />
           </div>
           <div className="w-2.5 h-2.5 rounded-sm shadow-md" style={{ background: accent }} />
        </div>
        <div className="absolute top-[55%] left-2 w-[70%] flex flex-col gap-1">
          <div className="w-full h-[3px] bg-white rounded-full" />
          <div className="w-[60%] h-[1.5px] bg-white/60 rounded-full" />
        </div>
      </div>
    ),
    36: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden relative" style={{ background: img }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="mt-auto p-1.5 flex flex-col items-center gap-1">
          <div className="w-[80%] h-[3px] bg-white rounded-full shadow-lg" />
          <div className="w-[60%] h-[1.5px] bg-white/60 rounded-full mb-4" />
        </div>
        <div className="absolute bottom-1.5 left-1.5 right-1.5 h-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center px-1 shadow-lg">
           <div className="w-2.5 h-2.5 rounded-full border border-white/40 shrink-0" style={{ background: accent }} />
           <div className="flex-1" />
           <div className="w-2.5 h-2.5 rounded-full" style={{ background: accent }} />
        </div>
      </div>
    ),
    37: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden bg-[#EBE9E1]">
        <div className="h-[40%]" style={{ background: img }} />
        <div className="flex-1 bg-black p-1.5 flex flex-col justify-end relative">
          <div className="w-[80%] h-[3px] bg-white rounded-full mb-1" />
          <div className="w-[50%] h-[1.5px] bg-zinc-500 rounded-full" />
          <div className="absolute top-0 right-1.5 w-4 h-4 rounded-sm border-[1.5px] -translate-y-1/2 rotate-3" style={{ background: img, borderColor: accent }} />
          <div className="flex justify-between items-center mt-auto border-t border-white/10 pt-1">
             <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
             <div className="w-2 h-2 rounded-full" style={{ background: accent }} />
          </div>
        </div>
      </div>
    ),
    38: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col p-1  overflow-hidden relative" style={{ background: accent }}>
        <div className="flex-1 bg-white rounded-lg mt-2 p-1.5 flex flex-col items-center justify-center gap-1 shadow-md relative z-10">
          <div className="w-4 h-4 rounded-full bg-zinc-200 -mt-3 border-[1.5px] border-white shadow-sm" />
          <div className="w-3 h-1 bg-black rounded-full mt-0.5" />
          <div className="w-[80%] h-[2px] bg-zinc-800 rounded-full" />
          <div className="w-[60%] h-[1px] bg-zinc-400 rounded-full" />
          <div className="w-full flex gap-1 mt-auto">
             <div className="flex-1 h-2 bg-zinc-100 rounded-[2px]" />
             <div className="flex-[2] h-2 rounded-[2px]" style={{ background: accent }} />
          </div>
        </div>
      </div>
    ),
    39: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col p-1.5  overflow-hidden relative" style={{ background: accent }}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="flex-1 flex flex-col items-center justify-center gap-1 relative z-10">
          <div className="w-5 h-5 rounded-full border border-white/20 bg-white/10 flex items-center justify-center" />
          <div className="w-[70%] h-[2.5px] bg-white rounded-full mt-1 shadow-sm" />
          <div className="w-[50%] h-[1.5px] bg-white/60 rounded-full" />
        </div>
        <div className="w-full h-4 bg-zinc-900 rounded-lg flex items-center justify-between px-1.5 shadow-lg relative z-10">
           <div className="flex gap-[2px]">
             <div className="w-1 h-1 rounded-full bg-white/20" />
             <div className="w-1 h-1 rounded-full bg-white/20" />
           </div>
           <div className="w-2 h-2 rounded-full bg-white flex items-center justify-center">
              <div className="w-1 h-1 rounded-full" style={{ background: accent }} />
           </div>
        </div>
      </div>
    ),
    40: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden relative bg-white">
        <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[65%] rotate-[-10deg] shadow-md" style={{ background: accent }} />
        <div className="flex-1 flex flex-col justify-center p-2 relative z-10 gap-1.5">
           <div className="flex items-center gap-1 mt-2">
              <div className="w-4 h-4  bg-black/20 border border-white/30" />
              <div className="flex flex-col gap-[1px]">
                 <div className="w-2 h-[0.5px] bg-white/60" />
                 <div className="w-4 h-[1px] bg-white" />
              </div>
           </div>
           <div className="w-[85%] h-[3px] bg-white rounded-full shadow-sm mt-1" />
           <div className="w-[60%] h-[1.5px] bg-white/80 rounded-full" />
        </div>
        <div className="w-full flex gap-1 p-1.5 mt-auto relative z-10">
           <div className="flex-1 h-3 bg-zinc-100 rounded-full" />
           <div className="flex-[2] h-3 rounded-full flex items-center justify-center px-1" style={{ background: accent }}>
              <div className="w-full h-[0.5px] bg-white/40" />
           </div>
        </div>
      </div>
    ),
    41: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden bg-black relative">
        <div className="h-1/2 w-full flex flex-col justify-end p-1.5" style={{ background: accent }}>
           <div className="w-[80%] h-[3px] bg-white rounded-full shadow-md" />
        </div>
        <div className="h-1/2 w-full p-1.5 flex flex-col justify-between">
           <div className="w-[70%] h-[1.5px] bg-zinc-600 rounded-full" />
           <div className="w-full h-4 bg-zinc-900 border border-white/5 rounded-md flex items-center justify-between px-1">
              <div className="w-3 h-[1px] bg-white/20" />
              <div className="w-2 h-2 rounded-sm" style={{ background: accent }} />
           </div>
        </div>
        <div className="absolute top-1/2 right-1 -translate-y-1/2 w-5 h-5 rounded-lg bg-zinc-800 border-[1.5px] border-black rotate-6 shadow-xl" />
      </div>
    ),
    42: ({ brandColor: accent }) => (
      <div className="w-full h-full flex flex-col  overflow-hidden bg-zinc-900 relative">
        <div className="h-[40%] w-full opacity-40" style={{ background: img }} />
        <div className="flex-1 bg-black rounded-t-xl -mt-2 p-1.5 flex flex-col items-center gap-1 relative z-10 border-t border-white/10" style={{ background: accent }}>
           <div className="w-5 h-5 rounded-full bg-zinc-800 border-2 -mt-4 border-black/20" style={{ borderColor: accent }} />
           <div className="w-[80%] h-[2.5px] bg-white rounded-full mt-1 shadow-md" />
           <div className="w-[60%] h-[1.5px] bg-white/60 rounded-full" />
           <div className="w-full h-4 bg-white/10 backdrop-blur-sm rounded-md mt-auto flex items-center justify-between px-1 border border-white/10">
              <div className="w-3 h-[1px] bg-white/20" />
              <div className="w-2.5 h-2.5 rounded-sm bg-white" />
           </div>
        </div>
      </div>
    ),

  }
};
