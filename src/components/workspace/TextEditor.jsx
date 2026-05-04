import React from 'react';
import {
  Sparkles,
  Upload,
  Loader2,
} from 'lucide-react';

/**
 * TextEditor — Modo de edição de texto/estrutura dos slides.
 */
export default function TextEditor({
  slides,
  brandColor,
  onTextChange,
  onImageUpload,
  onImagePosition,
  onImagePositionX,
  onImageScale,
  onGenerateImage,
  loadingImages,
}) {
  return (
    <div className="grid gap-6 max-w-4xl mx-auto">
      {slides.map((slide, index) => (
        <div
          key={index}
          className="cs-card relative group"
        >
          {/* Header */}
          <div className="bg-surface-dark px-6 py-4 border-b border-border-subtle flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-black text-white rotate-3 shadow-lg"
                style={{ backgroundColor: brandColor }}
              >
                {slide.slide}
              </div>
              <span className="text-label-xs font-bold text-zinc-500 border border-border-hover px-3 py-1 rounded-md bg-surface-input uppercase tracking-widest">
                {slide.layout}
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8 space-y-5">
            <label className="block">
              <span className="cs-label">Headline / Título</span>
              <input
                type="text"
                className="cs-input rounded-xl px-5 py-4 text-lg font-outfit font-black"
                value={slide.titulo || ''}
                onChange={(e) => onTextChange(index, 'titulo', e.target.value)}
              />
            </label>
            <label className="block">
              <span className="cs-label">Texto / Copy</span>
              <textarea
                className="cs-textarea rounded-xl px-5 py-4 resize-y min-h-[100px]"
                value={slide.texto_apoio || ''}
                onChange={(e) => onTextChange(index, 'texto_apoio', e.target.value)}
              />
            </label>
            {slide.tag !== undefined && (
              <label className="block">
                <span className="cs-label">Tag / Label</span>
                <input
                  type="text"
                  className="cs-input rounded-xl px-5 py-3 text-sm font-outfit"
                  value={slide.tag || ''}
                  onChange={(e) => onTextChange(index, 'tag', e.target.value)}
                />
              </label>
            )}
            {slide.items && (
              <div className="p-4 border border-border-subtle rounded-xl bg-surface-input/50">
                <span className="cs-label mb-3 block">
                  Itens do Slide (Visualmente Editáveis)
                </span>
                <p className="text-xs text-zinc-600 font-mono">
                  Dica do Studio: Para arrays/listas complexas, altere os textos diretamente no modo
                  "Preview Final" clicando neles. É mais seguro.
                </p>
              </div>
            )}
          </div>

          {/* Footer — Visual Suggestion + Actions */}
          <div className="bg-surface-dark px-6 py-5 border-t border-border-subtle flex items-start gap-4">
            <Sparkles className="w-5 h-5 shrink-0 mt-0.5 text-zinc-600" />
            <div className="w-full">
              <p className="cs-label mb-1">Visual (Sugestão IA)</p>
              {slide.sugestao_visual && (
                <p className="text-xs text-zinc-500 font-mono mb-4">
                  {typeof slide.sugestao_visual === 'string' 
                    ? slide.sugestao_visual 
                    : JSON.stringify(slide.sugestao_visual)}
                </p>
              )}

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    const prompt = typeof slide.sugestao_visual === 'string' 
                      ? slide.sugestao_visual 
                      : (slide.sugestao_visual ? JSON.stringify(slide.sugestao_visual) : 'premium luxury object');
                    onGenerateImage(index, prompt);
                  }}
                  disabled={loadingImages[index]}
                  className="flex items-center gap-2 text-label-xs uppercase py-2 px-4 rounded-lg transition-colors font-bold border"
                  style={{
                    backgroundColor: `${brandColor}15`,
                    color: brandColor,
                    borderColor: `${brandColor}30`,
                  }}
                >
                  {loadingImages[index] ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5" />
                  )}
                  {loadingImages[index] ? 'Generating...' : 'Generate AI Image'}
                </button>

                <label className="cs-btn-ghost">
                  <Upload className="w-3.5 h-3.5" />
                  Upload Manual
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => onImageUpload(index, e)}
                  />
                </label>
              </div>

              {slide.imageUrl && (
                <div className="mt-5 pt-4 border-t border-border-subtle w-full max-w-sm space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="cs-label mb-0">Posição da Imagem (X)</label>
                      <span className="text-[10px] text-zinc-500 font-mono">
                        {slide.imagePositionX ?? 50}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={slide.imagePositionX ?? 50}
                      onChange={(e) => onImagePositionX(index, e.target.value)}
                      className="cs-range"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="cs-label mb-0">Posição da Imagem (Y)</label>
                      <span className="text-[10px] text-zinc-500 font-mono">
                        {slide.imagePosition ?? 50}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={slide.imagePosition ?? 50}
                      onChange={(e) => onImagePosition(index, e.target.value)}
                      className="cs-range"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="cs-label mb-0">Escala da Imagem</label>
                      <span className="text-[10px] text-zinc-500 font-mono">
                        {slide.imageScale ?? 1}x
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="3"
                      step="0.05"
                      value={slide.imageScale ?? 1}
                      onChange={(e) => onImageScale(index, e.target.value)}
                      className="cs-range"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

