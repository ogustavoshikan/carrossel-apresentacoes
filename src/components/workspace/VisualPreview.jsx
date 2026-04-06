import React from 'react';
import {
  Upload,
  Copy,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';
import SlideRenderer from '../slide-renderer';
import { SLIDE_DIMENSIONS } from '../../lib/design-tokens';

/**
 * VisualPreview — Grid horizontal de cards visuais com controles por slide.
 */
export default function VisualPreview({
  slides,
  slideCount,
  brandHandle,
  brandColor,
  titleScale,
  textScale,
  showMetrics,
  onActionStart,
  onTextChange,
  onItemChange,
  onImageUpload,
  onImagePosition,
  onCopySlide,
  onResetPositions,
  copiedIndex,
}) {
  return (
    <div
      className="flex gap-10 overflow-x-auto pb-12 pt-4 px-4 snap-x snap-mandatory items-center min-h-[600px]"
      style={{ scrollbarWidth: 'thin', scrollbarColor: '#333 transparent' }}
    >
      {slides.map((slide, index) => (
        <div
          key={`visual-${index}`}
          className="flex flex-col gap-6 shrink-0 snap-center transition-all duration-300"
        >
          {/* Slide Card */}
          <div
            id={`slide-card-${index}`}
            style={{ width: SLIDE_DIMENSIONS.width, height: SLIDE_DIMENSIONS.height }}
            className="shadow-slide rounded-slide overflow-hidden shrink-0 bg-black ring-1 ring-white/10 relative"
          >
            <SlideRenderer
              data={slide}
              index={index}
              slideCount={slideCount}
              brandHandle={brandHandle}
              brandColor={brandColor}
              titleScale={titleScale}
              textScale={textScale}
              showMetrics={showMetrics}
              onActionStart={onActionStart}
              onTextChange={onTextChange}
              onItemChange={onItemChange}
            />
          </div>

          {/* Controls */}
          <div className="flex flex-col gap-3" style={{ width: SLIDE_DIMENSIONS.width }}>
            <div className="flex gap-3 w-full">
              <label className="alice-btn-ghost flex-1 py-3.5 rounded-xl shadow-lg">
                <Upload className="w-4 h-4" />
                Foto
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onImageUpload(index, e)}
                />
              </label>

              <button
                onClick={() => onCopySlide(index)}
                className="flex-[2] flex items-center justify-center gap-2 text-label-xs uppercase text-white py-3.5 px-4 rounded-xl transition-all font-black shadow-lg hover:brightness-110"
                style={{ backgroundColor: brandColor }}
              >
                {copiedIndex === index ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {copiedIndex === index ? 'Copiado!' : 'Copiar Textos'}
              </button>
            </div>

            {Object.keys(slide.positions || {}).length > 0 && (
              <button
                onClick={() => onResetPositions(index)}
                className="w-full flex items-center justify-center gap-2 text-label-xs uppercase bg-red-950/20 hover:bg-red-900/40 text-red-500 py-3 rounded-xl transition-colors border border-red-900/30 font-bold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Positions
              </button>
            )}

            {slide.imageUrl && (
              <div className="bg-surface-input border border-border-subtle rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="alice-label mb-0">Image Offset Y</label>
                  <span className="text-[10px] text-zinc-600 font-mono">
                    {slide.imagePosition ?? 50}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={slide.imagePosition ?? 50}
                  onChange={(e) => onImagePosition(index, e.target.value)}
                  className="alice-range"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
