import React, { useEffect, useRef } from 'react';
import { X, Star } from 'lucide-react';

/**
 * FavoritesPopover — Painel flutuante para acesso rápido aos slides favoritados.
 * Permite inserir um design favorito diretamente no canvas.
 */
export default function FavoritesPopover({ favorites = [], insertIndex, onAddFavorite, onClose, brandColor }) {
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

  return (
    <div
      ref={ref}
      className="absolute z-[200] top-full mt-3 left-1/2 -translate-x-1/2 w-[300px] bg-surface-card border border-border-subtle rounded-2xl shadow-2xl p-4 animate-in fade-in slide-in-from-top-2 duration-150"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
            Meus Favoritos
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-surface-input/50 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid dos favoritos */}
      <div className="grid grid-cols-2 gap-3 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
        {favorites.length === 0 ? (
          <div className="col-span-2 py-10 flex flex-col items-center justify-center gap-3 bg-black/20 rounded-xl border border-dashed border-white/5">
            <Star className="w-6 h-6 text-zinc-800" />
            <p className="text-[9px] text-zinc-600 uppercase font-black tracking-widest text-center px-4">
              Nenhum slide salvo nos favoritos ainda
            </p>
          </div>
        ) : (
          favorites.map((fav) => (
            <button
              key={fav.id}
              onClick={() => {
                onAddFavorite(fav.slideData, insertIndex);
                // onClose();
              }}
              className="group flex flex-col bg-surface-input border border-border-subtle rounded-xl overflow-hidden hover:border-brand/50 transition-all active:scale-95 text-left"
            >
              {/* Preview da Imagem */}
              <div 
                className="aspect-video w-full bg-cover bg-center bg-zinc-900 relative group-hover:opacity-80 transition-opacity"
                style={{ 
                  backgroundImage: fav.slideData.imageUrl ? `url(${fav.slideData.imageUrl})` : 'none' 
                }}
              >
                {!fav.slideData.imageUrl && (
                  <div className="absolute inset-0 flex items-center justify-center text-[7px] font-black uppercase tracking-tighter text-zinc-700">
                    {fav.slideData.layout}
                  </div>
                )}
              </div>
              
              {/* Nome do Favorito */}
              <div className="p-2 bg-black/20">
                <span className="text-[8px] font-bold text-zinc-400 group-hover:text-white truncate block uppercase tracking-wider">
                  {fav.slideData.customFavoriteName || fav.slideData.titulo || 'Favorito s/ nome'}
                </span>
              </div>
            </button>
          ))
        )}
      </div>

      {/* Footer hint */}
      <p className="text-[9px] text-zinc-600 text-center mt-4 italic font-medium">
        Escolha um favorito para inserir após este slide
      </p>
    </div>
  );
}
