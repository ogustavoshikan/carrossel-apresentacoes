import React from 'react';
import { X } from 'lucide-react';

/**
 * VariantPopoverHeader — Header padrão dos popovers de variante.
 * Contém: label do tipo de layout, nome da variante atual e botão de fechar.
 *
 * @param {string}   label        - Título do tipo de layout (ex: "Variante da Capa")
 * @param {string}   [activeLabel] - Nome da variante selecionada atualmente
 * @param {function} onClose      - Callback de fechar o popover
 */
export default function VariantPopoverHeader({ label, activeLabel, onClose }) {
  return (
    <div className="flex items-center justify-between mb-3 relative">
      <div className="flex items-center gap-2 pr-12">
        <h4 className="text-[11px] font-outfit font-black uppercase tracking-widest text-zinc-400">
          {label}
        </h4>
        {activeLabel && (
          <span className="text-[10px] font-mono text-zinc-600 truncate max-w-[120px]">
            {activeLabel}
          </span>
        )}
      </div>
      <div className="absolute -right-2 -top-2 flex items-center gap-0.5">
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="text-zinc-500 hover:text-white transition-colors p-1 rounded-md hover:bg-zinc-800"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
