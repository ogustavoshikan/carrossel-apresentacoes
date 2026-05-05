import React, { useRef, useEffect } from 'react';
import { COVER_EXTRA_VARIANT_META } from '../slides/cover-extra-variants';
import VariantPopoverHeader from './VariantPopoverHeader';
import VariantThumbnail from './VariantThumbnail';
import { cn } from '../../lib/utils';

/**
 * CoverExtraVariantPopover — Grid visual com mini-wireframes das variantes de Capas Extras.
 * Segue o mesmo padrão do CoverVariantPopover, mas usa os IDs 101-104.
 */
export default function CoverExtraVariantPopover({
  currentVariantIndex,
  onSelect,
  onClose,
  brandColor,
  brandAvatar
}) {
  const popoverRef = useRef(null);

  // Click outside → fecha
  useEffect(() => {
    const handleClick = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  return (
    <div
      ref={popoverRef}
      className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-bottom-2 duration-150"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-zinc-950/95 backdrop-blur-xl border border-zinc-800/80 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-4 min-w-[280px]">
        {/* Header */}
        <VariantPopoverHeader
          label="Variante da Capa Extra"
          activeLabel={COVER_EXTRA_VARIANT_META.find(v => v.id === currentVariantIndex)?.name || 'Padrão'}
          onClose={onClose}
        />

        {/* Grid de variantes */}
        <div className="grid grid-cols-4 gap-2.5 max-h-[320px] overflow-y-auto pr-1.5 custom-scrollbar">
          {COVER_EXTRA_VARIANT_META.map((variant) => (
            <button
              key={variant.id}
              onClick={() => {
                onSelect(variant.id);
              }}
              className="flex flex-col items-center gap-1.5 group mb-2"
              title={variant.description}
            >
              <VariantThumbnail
                type="cover-extra"
                variantId={variant.id}
                brandColor={brandColor}
                brandAvatar={brandAvatar}
                thumbnailUrl={variant.thumbnailUrl}
                isSelected={currentVariantIndex === variant.id}
              />
              <span className={cn(
                'text-[8px] font-medium transition-colors leading-tight text-center',
                currentVariantIndex === variant.id ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'
              )}>
                {variant.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
