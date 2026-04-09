import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { LAYOUT_META } from '../../lib/layout-templates';

/**
 * Mini wireframes SVG para cada layout — ícones visuais minimalistas.
 */
const LAYOUT_ICONS = {
  cover: (
    <svg viewBox="0 0 40 50" fill="none" className="w-full h-full">
      <rect width="40" height="50" rx="3" fill="#1a1a2e" />
      <rect x="4" y="4" width="32" height="24" rx="2" fill="#2a2a4e" />
      <rect x="8" y="32" width="24" height="4" rx="1" fill="#5b5bdb" />
      <rect x="12" y="39" width="16" height="2.5" rx="1" fill="#3a3a5e" />
      <rect x="14" y="43" width="12" height="2" rx="1" fill="#2a2a4e" />
    </svg>
  ),
  'content-split': (
    <svg viewBox="0 0 40 50" fill="none" className="w-full h-full">
      <rect width="40" height="50" rx="3" fill="#1a1a2e" />
      <rect x="4" y="4" width="32" height="20" rx="2" fill="#2a2a4e" />
      <rect x="6" y="28" width="10" height="2.5" rx="1" fill="#5b5bdb" />
      <rect x="4" y="33" width="32" height="3" rx="1" fill="#3a3a5e" />
      <rect x="4" y="38" width="28" height="2.5" rx="1" fill="#3a3a5e" />
      <rect x="4" y="43" width="20" height="2.5" rx="1" fill="#3a3a5e" />
    </svg>
  ),
  'big-number': (
    <svg viewBox="0 0 40 50" fill="none" className="w-full h-full">
      <rect width="40" height="50" rx="3" fill="#1a1a2e" />
      <rect x="4" y="4" width="32" height="14" rx="2" fill="#2a2a4e" />
      <rect x="8" y="22" width="24" height="12" rx="2" fill="#5b5bdb" opacity="0.4" />
      <rect x="12" y="25" width="16" height="6" rx="1" fill="#5b5bdb" />
      <rect x="8" y="38" width="24" height="2.5" rx="1" fill="#3a3a5e" />
      <rect x="10" y="43" width="20" height="2" rx="1" fill="#2a2a4e" />
    </svg>
  ),
  quote: (
    <svg viewBox="0 0 40 50" fill="none" className="w-full h-full">
      <rect width="40" height="50" rx="3" fill="#1a1a2e" />
      <text x="7" y="22" fontSize="18" fill="#5b5bdb" fontFamily="serif">"</text>
      <rect x="8" y="24" width="24" height="2.5" rx="1" fill="#4a4a7e" />
      <rect x="8" y="29" width="20" height="2.5" rx="1" fill="#4a4a7e" />
      <rect x="8" y="34" width="22" height="2.5" rx="1" fill="#4a4a7e" />
      <rect x="14" y="41" width="12" height="2" rx="1" fill="#3a3a5e" />
    </svg>
  ),
  comparison: (
    <svg viewBox="0 0 40 50" fill="none" className="w-full h-full">
      <rect width="40" height="50" rx="3" fill="#1a1a2e" />
      <rect x="4" y="6" width="32" height="3" rx="1" fill="#5b5bdb" />
      <rect x="4" y="14" width="32" height="6" rx="1" fill="#2a2a4e" />
      <rect x="4" y="22" width="32" height="6" rx="1" fill="#3b1f3b" />
      <rect x="24" y="23.5" width="10" height="3" rx="1" fill="#c084fc" />
      <rect x="4" y="30" width="32" height="6" rx="1" fill="#2a2a4e" />
      <rect x="4" y="38" width="32" height="6" rx="1" fill="#3b1f3b" />
      <rect x="24" y="39.5" width="10" height="3" rx="1" fill="#c084fc" />
    </svg>
  ),
  list: (
    <svg viewBox="0 0 40 50" fill="none" className="w-full h-full">
      <rect width="40" height="50" rx="3" fill="#1a1a2e" />
      <rect x="4" y="5" width="24" height="3" rx="1" fill="#5b5bdb" />
      <circle cx="8" cy="17" r="2.5" fill="#5b5bdb" />
      <rect x="13" y="15.5" width="22" height="2" rx="1" fill="#3a3a5e" />
      <circle cx="8" cy="25" r="2.5" fill="#5b5bdb" />
      <rect x="13" y="23.5" width="18" height="2" rx="1" fill="#3a3a5e" />
      <circle cx="8" cy="33" r="2.5" fill="#5b5bdb" />
      <rect x="13" y="31.5" width="20" height="2" rx="1" fill="#3a3a5e" />
      <circle cx="8" cy="41" r="2.5" fill="#5b5bdb" />
      <rect x="13" y="39.5" width="16" height="2" rx="1" fill="#3a3a5e" />
    </svg>
  ),
  cta: (
    <svg viewBox="0 0 40 50" fill="none" className="w-full h-full">
      <rect width="40" height="50" rx="3" fill="#1a1a2e" />
      <rect x="8" y="8" width="24" height="4" rx="1" fill="#5b5bdb" />
      <rect x="4" y="16" width="32" height="2.5" rx="1" fill="#3a3a5e" />
      <rect x="6" y="21" width="28" height="2.5" rx="1" fill="#3a3a5e" />
      <rect x="8" y="33" width="24" height="9" rx="3" fill="#5b5bdb" />
      <rect x="12" y="36" width="16" height="3" rx="1" fill="#fff" opacity="0.7" />
    </svg>
  ),
};

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
          className="w-6 h-6 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid dos layouts */}
      <div className="grid grid-cols-3 gap-2.5">
        {LAYOUT_META.map(({ key, label, description }) => (
          <button
            key={key}
            onClick={() => handleSelect(key)}
            title={description}
            className="group flex flex-col items-center gap-2 p-2 rounded-xl border border-border-subtle hover:border-brand/60 bg-surface-input hover:bg-white/5 transition-all duration-150 hover:scale-[1.03] active:scale-95"
          >
            {/* Miniatura SVG */}
            <div className="w-10 h-[50px] opacity-80 group-hover:opacity-100 transition-opacity">
              {LAYOUT_ICONS[key]}
            </div>
            {/* Label */}
            <span className="text-[10px] font-bold text-zinc-400 group-hover:text-white transition-colors text-center leading-tight">
              {label}
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
