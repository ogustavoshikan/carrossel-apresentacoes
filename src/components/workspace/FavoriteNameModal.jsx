import React, { useState, useEffect } from 'react';
import { Star, X } from 'lucide-react';

export default function FavoriteNameModal({ isOpen, defaultName, onConfirm, onCancel }) {
  const [name, setName] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName(defaultName || '');
    }
  }, [isOpen, defaultName]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div 
        className="w-full max-w-sm bg-surface-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto animate-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-5 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center shrink-0 border border-yellow-500/20">
              <Star className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">Salvar Favorito</h3>
              <p className="text-[10px] text-zinc-400 uppercase tracking-widest mt-0.5">Nomeie este modelo de slide</p>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <input
              type="text"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onConfirm(name);
                if (e.key === 'Escape') onCancel();
              }}
              className="w-full bg-surface-input border border-border-hover focus:border-white/30 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors"
              placeholder="Ex: Capa com Imagem Full"
              />
              </div>
              </div>

              <div className="p-4 bg-surface-input/50 border-t border-white/5 flex gap-2 justify-end">
              <button
              onClick={onCancel}
              className="px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white hover:bg-surface-input/50 rounded-lg transition-colors border border-transparent hover:border-white/10"          >
            Cancelar
          </button>
          <button 
            onClick={() => onConfirm(name)}
            className="px-5 py-2 text-[11px] font-bold uppercase tracking-widest text-emerald-950 bg-emerald-500 hover:bg-emerald-400 rounded-lg transition-colors shadow-lg shadow-emerald-500/20"
          >
            Salvar Favorito
          </button>
        </div>
      </div>
    </div>
  );
}

