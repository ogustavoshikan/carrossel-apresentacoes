import React from 'react';
import { Shuffle } from 'lucide-react';
import { VARIANT_THUMBNAILS } from '../../lib/variant-thumbnails';
import { cn } from '../../lib/utils';

/**
 * VariantThumbnail — Componente compartilhado para renderizar miniaturas de variantes.
 * Suporta thumbnails reais (URLs) ou mini-wireframes (React).
 */
export default function VariantThumbnail({ 
  type, 
  variantId, 
  brandColor, 
  brandAvatar, 
  thumbnailUrl, 
  isSelected 
}) {
  const themeVariants = VARIANT_THUMBNAILS[type];
  const ThumbnailComponent = themeVariants?.[variantId];

  return (
    <div className={cn(
      "w-12 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 relative group-hover:scale-105",
      isSelected 
        ? "ring-2 ring-offset-2 ring-offset-zinc-950 shadow-[0_0_20px_rgba(0,0,0,0.4)]" 
        : "border-zinc-800/50 group-hover:border-zinc-700"
    )}
    style={{ borderColor: isSelected ? brandColor : undefined }}
    >
       {thumbnailUrl ? (
         <img
           src={thumbnailUrl}
           alt={`Variant ${variantId}`}
           className="w-full h-full object-cover"
         />
       ) : ThumbnailComponent ? (
         <ThumbnailComponent brandColor={brandColor} brandAvatar={brandAvatar} />
       ) : (
         <div className="w-full h-full flex items-center justify-center bg-zinc-900">
            <Shuffle className="w-4 h-4 text-zinc-700" />
         </div>
       )}
       
       {isSelected && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
             <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          </div>
       )}
    </div>
  );
}
