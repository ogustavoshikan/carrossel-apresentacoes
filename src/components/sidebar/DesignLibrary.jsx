import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { LAYOUT_META, LAYOUT_ICONS } from '../../lib/layout-templates';
import { VARIANT_THUMBNAILS } from '../../lib/variant-thumbnails';

// Loaders dinâmicos — cada aba carrega seu arquivo só quando selecionada
const META_LOADERS = {
  'cover':         () => import('../slides/cover-variants').then(m => m.COVER_VARIANT_META),
  'content-split': () => import('../slides/split-variants').then(m => m.SPLIT_VARIANT_META),
  'big-number':    () => import('../slides/bignumber-variants').then(m => m.BIGNUMBER_VARIANT_META),
  'quote':         () => import('../slides/quote-variants').then(m => m.QUOTE_VARIANT_META),
  'comparison':    () => import('../slides/comparison-variants').then(m => m.COMPARISON_VARIANT_META),
  'cta':           () => import('../slides/cta-variants').then(m => m.CTA_VARIANT_META),
  'list':          () => import('../slides/list-variants').then(m => m.LIST_VARIANT_META),
  'sequence':      () => import('../slides/sequence-variants').then(m => m.SEQUENCE_VARIANT_META),
  'cover-extra':   () => import('../slides/cover-extra-variants').then(m => m.COVER_EXTRA_VARIANT_META),
  'cta-extra':     () => import('../slides/cta-extra-variants').then(m => m.CTA_EXTRA_VARIANT_META),
  'content-extra': () => import('../slides/content-extra-variants').then(m => m.CONTENT_EXTRA_VARIANT_META),
};

// Cache em memória — evita re-importar ao trocar de aba
const metaCache = {};

/**
 * DesignThumbnail — Renderiza o mini wireframe de uma variante específica.
 * Utiliza a biblioteca centralizada para garantir consistência em todos os layouts.
 */
function DesignThumbnail({ theme, variantId, brandColor, brandAvatar, thumbnailUrl }) {
  // Se houver uma URL de thumbnail real, prioriza ela
  if (thumbnailUrl) {
    return (
      <img
        src={thumbnailUrl}
        alt={`Variante ${variantId}`}
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />
    );
  }

  const themeVariants = VARIANT_THUMBNAILS[theme];

  if (!themeVariants) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-zinc-900">
         <div className="w-4 h-4 border border-zinc-700 rounded" />
      </div>
    );
  }

  const ThumbnailComponent = themeVariants[variantId];

  if (ThumbnailComponent) {
    return <ThumbnailComponent brandColor={brandColor} brandAvatar={brandAvatar} />;
  }

  // Fallback para quando a variante específica não tem um wireframe (usa o ícone do tema)
  return (
    <div className="w-full h-full flex items-center justify-center bg-zinc-900/50 p-4 opacity-20">
       {LAYOUT_ICONS[theme]}
    </div>
  );
}

export default function DesignLibrary({ onAddSlide, brandColor, brandAvatar, slidesCount }) {
  const [selectedTheme, setSelectedTheme] = useState('cover');
  const [variants, setVariants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (metaCache[selectedTheme]) {
      setVariants(metaCache[selectedTheme]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setVariants([]);
    const loader = META_LOADERS[selectedTheme];
    if (!loader) { setIsLoading(false); return; }
    loader().then(meta => {
      metaCache[selectedTheme] = meta;
      setVariants(meta);
      setIsLoading(false);
    });
  }, [selectedTheme]);

  // Divide os layouts em duas linhas (7 na primeira, o resto na segunda)
  const firstRow = LAYOUT_META.slice(0, 7);
  const secondRow = LAYOUT_META.slice(7);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Seletor de Temas (Duas Linhas) */}
      <div className="sticky top-[-24px] z-30 bg-[#000000]/95 backdrop-blur-xl py-3 -mx-6 px-6 border-b border-white/5 flex flex-col gap-2">
        {/* Primeira Linha (7 Principais) */}
        <div className="grid grid-cols-7 gap-1 bg-surface-dark/40 p-1.5 rounded-2xl border border-white/5 shadow-inner">
          {firstRow.map((theme) => {
            const isActive = selectedTheme === theme.key;
            return (
              <button
                key={theme.key}
                onClick={() => {
                  setSelectedTheme(theme.key);
                  const scrollContainer = document.getElementById('sidebar-scroll-container');
                  if (scrollContainer) scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex flex-col items-center justify-center py-2.5 rounded-xl transition-colors relative group outline-none select-none ${
                  isActive 
                    ? 'bg-zinc-900 text-white' 
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                }`}
                title={theme.label}
              >
                <div className={`w-5 h-6 mb-1.5 transition-transform group-hover:scale-110 overflow-hidden rounded-[2px] ${isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-70'}`}>
                   {theme.thumbnailUrl ? (
                     <img src={theme.thumbnailUrl} alt={theme.label} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                   ) : (
                     LAYOUT_ICONS[theme.key]
                   )}
                </div>
                <span className="text-[7px] font-black uppercase tracking-tighter w-full text-center px-0.5 leading-tight whitespace-pre-line">
                  {theme.label}
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

        {/* Segunda Linha (Novos Layouts) */}
        {secondRow.length > 0 && (
          <div className="grid grid-cols-7 gap-1 bg-surface-dark/40 p-1.5 rounded-2xl border border-white/5 shadow-inner">
            {secondRow.map((theme) => {
              const isActive = selectedTheme === theme.key;
              return (
                <button
                  key={theme.key}
                  onClick={() => {
                    setSelectedTheme(theme.key);
                    const scrollContainer = document.getElementById('sidebar-scroll-container');
                    if (scrollContainer) scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`flex flex-col items-center justify-center py-2.5 rounded-xl transition-colors relative group outline-none select-none ${
                    isActive 
                      ? 'bg-zinc-900 text-white' 
                      : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                  }`}
                  title={theme.label}
                >
                  <div className={`w-5 h-6 mb-1.5 transition-transform group-hover:scale-110 overflow-hidden rounded-[2px] ${isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-70'}`}>
                    {theme.thumbnailUrl ? (
                      <img src={theme.thumbnailUrl} alt={theme.label} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                    ) : (
                      LAYOUT_ICONS[theme.key]
                    )}
                  </div>
                  <span className="text-[7px] font-black uppercase tracking-tighter w-full text-center px-0.5 leading-tight whitespace-pre-line">
                    {theme.label}
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
            {/* Espaçadores para manter o grid alinhado se necessário */}
            {Array.from({ length: 7 - secondRow.length }).map((_, i) => (
              <div key={`spacer-${i}`} className="py-2.5" />
            ))}
          </div>
        )}
      </div>

      {/* Grid de Variantes (2 Colunas) */}
      <div className="grid grid-cols-2 gap-4 pb-4">
        {variants.map((variant, index) => (
          <div
            key={variant.id}
            onClick={() => onAddSlide(selectedTheme, slidesCount, variant.id)}
            className="group relative flex flex-col bg-surface-dark border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all cursor-pointer active:scale-95 shadow-xl"
          >
            {/* Área da Miniatura */}
            <div className="aspect-[4/5] relative bg-black/40 group-hover:bg-black/20 transition-colors overflow-hidden">
               <div className="w-full h-full transform group-hover:scale-105 group-hover:-rotate-1 transition-all duration-300">
                  <DesignThumbnail 
                    theme={selectedTheme} 
                    variantId={variant.id} 
                    brandColor={brandColor} 
                    brandAvatar={brandAvatar}
                    thumbnailUrl={variant.thumbnailUrl}
                  />
               </div>
            </div>
            
            {/* Label da Variante + Index */}
            <div className="p-2.5 border-t border-white/5 bg-zinc-900/50 backdrop-blur-sm relative">
               {/* Index Badge (#00, #01...) */}
               <span className="absolute left-2.5 bottom-2.5 text-[12px] italic font-black text-white/30 group-hover:text-white/60 transition-colors">
                  #{String(index).padStart(2, '0')}
               </span>
               
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
      
      {isLoading && (
        <div className="grid grid-cols-2 gap-4 pb-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-[4/5] bg-zinc-900/60 rounded-2xl animate-pulse" />
          ))}
        </div>
      )}

      {!isLoading && variants.length === 0 && (
         <div className="py-20 text-center">
            <p className="text-[10px] uppercase font-black tracking-widest text-white/10">Nenhum design encontrado</p>
         </div>
      )}
    </div>
  );
}
