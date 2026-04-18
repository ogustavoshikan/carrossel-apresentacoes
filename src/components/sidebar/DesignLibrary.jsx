import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { LAYOUT_META, LAYOUT_ICONS } from '../../lib/layout-templates';
import { COVER_VARIANT_META } from '../slides/cover-variants';
import { SPLIT_VARIANT_META } from '../slides/split-variants';
import { BIGNUMBER_VARIANT_META } from '../slides/bignumber-variants';
import { QUOTE_VARIANT_META } from '../slides/quote-variants';
import { COMPARISON_VARIANT_META } from '../slides/comparison-variants';
import { CTA_VARIANT_META } from '../slides/cta-variants';
import { LIST_VARIANT_META } from '../slides/list-variants';

import { VARIANT_THUMBNAILS } from '../../lib/variant-thumbnails';

/**
 * DesignThumbnail — Renderiza o mini wireframe de uma variante específica.
 * Utiliza a biblioteca centralizada para garantir consistência em todos os layouts.
 */
function DesignThumbnail({ theme, variantId, brandColor }) {
  const themeVariants = VARIANT_THUMBNAILS[theme];
  
  if (!themeVariants) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-zinc-900 rounded-[3px]">
         <div className="w-4 h-4 border border-zinc-700 rounded" />
      </div>
    );
  }

  const ThumbnailComponent = themeVariants[variantId];

  if (ThumbnailComponent) {
    return <ThumbnailComponent brandColor={brandColor} />;
  }

  // Fallback para quando a variante específica não tem um wireframe (usa o ícone do tema)
  return (
    <div className="w-full h-full flex items-center justify-center bg-zinc-900/50 rounded-[3px] p-4 opacity-20">
       {LAYOUT_ICONS[theme]}
    </div>
  );
}

export default function DesignLibrary({ onAddSlide, brandColor, slidesCount }) {
  const [selectedTheme, setSelectedTheme] = useState('cover');

  // Mapeamento de metadados das variantes
  const THEME_METAS = {
    cover: COVER_VARIANT_META,
    'content-split': SPLIT_VARIANT_META,
    'big-number': BIGNUMBER_VARIANT_META,
    quote: QUOTE_VARIANT_META,
    comparison: COMPARISON_VARIANT_META,
    cta: CTA_VARIANT_META,
    list: LIST_VARIANT_META,
  };

  const variants = THEME_METAS[selectedTheme] || [];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Seletor de Temas (7 Botões) */}
      <div className="grid grid-cols-7 gap-1 bg-surface-dark/40 p-1.5 rounded-2xl border border-white/5 shadow-inner">
        {LAYOUT_META.map((theme) => {
          const isActive = selectedTheme === theme.key;
          return (
            <button
              key={theme.key}
              onClick={() => setSelectedTheme(theme.key)}
              className={`flex flex-col items-center justify-center py-2.5 rounded-xl transition-all relative group ${
                isActive 
                  ? 'bg-zinc-800 text-white shadow-lg border border-white/10 ring-1 ring-white/5' 
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
              }`}
              title={theme.label}
            >
              <div className={`w-5 h-6 mb-1.5 transition-transform group-hover:scale-110 ${isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-70'}`}>
                 {LAYOUT_ICONS[theme.key]}
              </div>
              <span className="text-[7px] font-black uppercase tracking-tighter w-full text-center px-0.5 truncate">
                {theme.label.split(' ')[0]}
              </span>
              {isActive && (
                <div 
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)]" 
                  style={{ backgroundColor: brandColor }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Grid de Variantes (2 Colunas) */}
      <div className="grid grid-cols-2 gap-4 pb-4">
        {variants.map((variant) => (
          <div
            key={variant.id}
            onClick={() => onAddSlide(selectedTheme, slidesCount, variant.id)}
            className="group relative flex flex-col bg-surface-dark border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all cursor-pointer active:scale-95 shadow-xl"
          >
            {/* Área da Miniatura */}
            <div className="aspect-[4/5] flex items-center justify-center p-5 bg-black/40 group-hover:bg-black/20 transition-colors">
               <div className="w-20 h-28 transform group-hover:scale-110 group-hover:-rotate-2 transition-all duration-300 shadow-2xl">
                  <DesignThumbnail theme={selectedTheme} variantId={variant.id} brandColor={brandColor} />
               </div>
            </div>
            
            {/* Label da Variante */}
            <div className="p-2.5 border-t border-white/5 bg-zinc-900/50 backdrop-blur-sm">
               <span className="text-[9px] uppercase text-zinc-500 tracking-[0.15em] font-black block text-center truncate group-hover:text-white transition-colors">
                  {variant.name || `Variante ${variant.id}`}
               </span>
            </div>
            
            {/* Hover Overlay Feedback */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
               <div 
                 className="w-10 h-10 rounded-full flex items-center justify-center shadow-2xl scale-50 group-hover:scale-100 transition-transform duration-300"
                 style={{ backgroundColor: brandColor }}
               >
                  <Plus size={20} className="text-white" strokeWidth={3} />
               </div>
            </div>
          </div>
        ))}
      </div>
      
      {variants.length === 0 && (
         <div className="py-20 text-center">
            <p className="text-[10px] uppercase font-black tracking-widest text-white/10">Nenhum design encontrado</p>
         </div>
      )}
    </div>
  );
}
