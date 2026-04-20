import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { LAYOUT_META, LAYOUT_ICONS } from '../../lib/layout-templates';

/**
 * AddSlidePopover — Painel flutuante com os 7 layouts para inserção manual de slides.
 * Exibe mini wireframes SVG + nome do layout + descrição.
 *
 * Props:
 *  - insertIndex {number} — índice onde o novo slide será inserido (após o slide de referência)
 *  - onAddSlide {function} — callback(layoutType, insertIndex)
 *  - onClose {function} — fecha o popover
 *  - brandColor {string} — cor primária para highlights
 */
export default function AddSlidePopover({ insertIndex, onAddSlide, onClose, brandColor }) {
  const ref = useRef(null);

  // Fecha ao clicar fora
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Fecha com Escape
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  function handleSelect(layoutKey) {
    onAddSlide(layoutKey, insertIndex);
    onClose();
  }

  return (
    <div
      ref={ref}
      className="absolute z-[200] top-full mt-3 left-1/2 -translate-x-1/2 w-[340px] bg-surface-card border border-border-subtle rounded-2xl shadow-2xl p-4 animate-in fade-in slide-in-from-top-2 duration-150"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
          Inserir layout
        </span>
        <button
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-surface-input/50 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid dos layouts */}
      <div className="grid grid-cols-3 gap-x-4 gap-y-6">
        {LAYOUT_META.map((meta) => (
          <button
            key={meta.key}
            onClick={() => handleSelect(meta.key)}
            title={meta.description}
            className="group flex flex-col items-center gap-2.5 transition-all active:scale-95"
          >
            {/* Card com Miniatura */}
            <div className="w-full aspect-[4/5] flex items-center justify-center p-2 rounded-xl border border-border-subtle group-hover:border-brand/60 bg-surface-input group-hover:bg-surface-input/50 transition-all duration-150 group-hover:scale-[1.03] overflow-hidden shadow-lg">
              <div className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity overflow-hidden rounded-[3px]">
                {meta.thumbnailUrl ? (
                  <img src={meta.thumbnailUrl} alt={meta.label} className="w-full h-full object-cover" />
                ) : (
                  LAYOUT_ICONS[meta.key]
                )}
              </div>
            </div>

            {/* Label - Agora fora do retângulo */}
            <span className="text-[9px] font-black uppercase tracking-[0.15em] text-zinc-500 group-hover:text-white transition-colors text-center leading-tight">
              {meta.label}
            </span>
          </button>
        ))}
      </div>

      {/* Footer hint */}
      <p className="text-[10px] text-zinc-600 text-center mt-4">
        O slide será inserido após o slide atual
      </p>
    </div>
  );
}

