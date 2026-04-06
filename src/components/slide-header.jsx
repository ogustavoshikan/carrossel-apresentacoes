import React from 'react';

/**
 * SlideHeader — Header padrão dos slides com handle e contador.
 *
 * @param {object} props
 * @param {number} props.index - Número do slide (1-based)
 * @param {number} props.total - Total de slides
 * @param {string} props.brandHandle - Handle do brand
 * @param {string} props.brandColor - Cor do brand
 * @param {boolean} [props.dark=false] - Modo claro (para slides brancos)
 */
export default function SlideHeader({ index, total, brandHandle, brandColor, dark = false }) {
  return (
    <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-50 pointer-events-none">
      <div className="flex items-center gap-3">
        <div
          className={`w-2.5 h-2.5 rounded-full ${dark ? 'bg-black' : ''}`}
          style={{ backgroundColor: dark ? '#000' : brandColor }}
        />
        <span
          className={`font-outfit font-black tracking-[0.25em] text-[10px] uppercase ${
            dark ? 'text-black/60' : 'text-zinc-500'
          }`}
        >
          @{brandHandle}
        </span>
      </div>
      <div
        className={`font-outfit font-bold text-[11px] px-3 py-1.5 rounded-lg border backdrop-blur-xl ${
          dark
            ? 'bg-black/5 text-black border-black/10'
            : 'bg-white/5 text-zinc-400 border-white/10'
        }`}
      >
        {index} <span className="opacity-30 mx-1">/</span> {total}
      </div>
    </div>
  );
}

/**
 * SlideFooterPlaceholder — Espaçador do footer dos slides.
 */
export function SlideFooterPlaceholder() {
  return <div className="h-10 w-full pointer-events-none" />;
}
