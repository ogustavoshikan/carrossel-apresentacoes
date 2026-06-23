import React from 'react';
import {
  Sparkles,
  Upload,
  Loader2,
  List,
} from 'lucide-react';
import SlideRenderer from '../slide-renderer';
import { SLIDE_DIMENSIONS } from '../../lib/design-tokens';

/** Remove tags HTML de strings (campos que podem conter foreColor via execCommand) */
const stripTags = (str) => str ? str.replace(/<[^>]*>/g, '') : '';

/**
 * Retorna o label amigável de um layout.
 */
const LAYOUT_LABELS = {
  'cover':         'Capa',
  'content-split': 'Conteúdo',
  'big-number':    'Número de Impacto',
  'quote':         'Citação',
  'comparison':    'Comparação',
  'list':          'Lista',
  'cta':           'CTA',
  'sequence':      'Sequência',
  'cover-extra':   'Capa Extra',
  'content-extra': 'Conteúdo Extra',
};

// Scale do preview ao lado: 1.0 = tamanho nativo do slide (400×500)
const PREVIEW_SCALE = 1.0;
const PREVIEW_W = Math.round(SLIDE_DIMENSIONS.width * PREVIEW_SCALE);
const PREVIEW_H = Math.round(SLIDE_DIMENSIONS.height * PREVIEW_SCALE);

/**
 * TextEditor — Modo de edição centralizada de conteúdo dos slides.
 * Layout: coluna de campos à esquerda + preview em tempo real do slide à direita.
 */
export default function TextEditor({
  slides,
  slideCount,
  brandColor,
  brandHandle,
  showBrandHandle,
  brandAvatar,
  brandLogo,
  showBrandLogo,
  isVerified,
  titleScale,
  textScale,
  titleFont,
  textFont,
  tagFont,
  showSlideCounter,
  slideCounterPosition,
  onTextChange,
  onImageUpload,
  onImagePosition,
  onImagePositionX,
  onImageScale,
  onGenerateImage,
  loadingImages,
}) {
  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      {slides.map((slide, index) => (
        <div
          key={index}
          className="cs-card overflow-hidden"
        >
          {/* Header */}
          <div className="bg-surface-dark px-5 py-3.5 border-b border-border-subtle flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-black text-white rotate-3 shadow-lg shrink-0"
                style={{ backgroundColor: brandColor }}
              >
                {slide.slide}
              </div>
              <span className="text-label-xs font-bold text-zinc-500 border border-border-hover px-2.5 py-0.5 rounded-md bg-surface-input uppercase tracking-widest">
                {LAYOUT_LABELS[slide.layout] || slide.layout}
              </span>
            </div>
          </div>

          {/* Body: DOIS COLUNAS — campos à esquerda, preview à direita */}
          <div className="flex items-stretch divide-x divide-border-subtle">

            {/* ─── COLUNA ESQUERDA: campos de edição ─── */}
            <div className="flex-1 min-w-0 p-5 space-y-4 overflow-hidden">

              {/* Tag */}
              {slide.tag !== undefined && (
                <label className="block">
                  <span className="cs-label">Tag / Categoria</span>
                  <input
                    type="text"
                    className="cs-input rounded-lg px-3.5 py-2.5 text-xs font-outfit"
                    value={slide.tag || ''}
                    onChange={(e) => onTextChange(index, 'tag', e.target.value)}
                    placeholder="Ex: DICA, RESULTADO..."
                  />
                </label>
              )}

              {/* Título */}
              {slide.titulo !== undefined && (
                <label className="block">
                  <span className="cs-label">Headline / Título</span>
                  <textarea
                    className="cs-textarea rounded-lg px-3.5 py-3 resize-y min-h-[60px] font-outfit font-black text-base"
                    value={stripTags(slide.titulo || '')}
                    onChange={(e) => onTextChange(index, 'titulo', e.target.value)}
                    placeholder="Título principal do slide..."
                  />
                </label>
              )}

              {/* Texto de Apoio */}
              {slide.texto_apoio !== undefined && (
                <label className="block">
                  <span className="cs-label">Texto de Apoio / Copy</span>
                  <textarea
                    className="cs-textarea rounded-lg px-3.5 py-3 resize-y min-h-[72px]"
                    value={stripTags(slide.texto_apoio || '')}
                    onChange={(e) => onTextChange(index, 'texto_apoio', e.target.value)}
                    placeholder="Texto descritivo, copy ou subtítulo..."
                  />
                </label>
              )}

              {/* Items — Lista, Comparação e outros layouts com array */}
              {slide.items && slide.items.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <List className="w-3 h-3 text-zinc-500" />
                    <span className="cs-label mb-0">Itens do Slide</span>
                  </div>
                  <div className="space-y-2 p-3 border border-border-subtle rounded-lg bg-surface-input/30">
                    {slide.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="grid grid-cols-[72px_1fr] gap-2 items-center">
                        <input
                          type="text"
                          className="cs-input rounded-md px-2.5 py-1.5 text-[11px] font-black uppercase tracking-wider text-center"
                          value={item.label || ''}
                          onChange={(e) => {
                            const newItems = [...slide.items];
                            newItems[itemIdx] = { ...newItems[itemIdx], label: e.target.value };
                            onTextChange(index, 'items', newItems);
                          }}
                          placeholder="Label"
                        />
                        <input
                          type="text"
                          className="cs-input rounded-md px-2.5 py-1.5 text-[11px]"
                          value={item.text !== undefined ? (item.text || '') : (item.value || '')}
                          onChange={(e) => {
                            const newItems = [...slide.items];
                            const fieldKey = item.text !== undefined ? 'text' : 'value';
                            newItems[itemIdx] = { ...newItems[itemIdx], [fieldKey]: e.target.value };
                            onTextChange(index, 'items', newItems);
                          }}
                          placeholder="Conteúdo do item..."
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Visual / Imagem */}
              <div className="pt-2 border-t border-border-subtle space-y-3">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                  <span className="cs-label mb-0">Visual (Sugestão IA)</span>
                </div>

                {slide.sugestao_visual && (
                  <p className="text-[10px] text-zinc-500 font-mono leading-relaxed">
                    {typeof slide.sugestao_visual === 'string'
                      ? slide.sugestao_visual
                      : JSON.stringify(slide.sugestao_visual)}
                  </p>
                )}

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      const prompt = typeof slide.sugestao_visual === 'string'
                        ? slide.sugestao_visual
                        : (slide.sugestao_visual ? JSON.stringify(slide.sugestao_visual) : 'premium luxury object');
                      onGenerateImage(index, prompt);
                    }}
                    disabled={loadingImages[index]}
                    className="flex items-center gap-1.5 text-[10px] uppercase py-1.5 px-3 rounded-lg transition-colors font-bold border"
                    style={{
                      backgroundColor: `${brandColor}15`,
                      color: brandColor,
                      borderColor: `${brandColor}30`,
                    }}
                  >
                    {loadingImages[index]
                      ? <Loader2 className="w-3 h-3 animate-spin" />
                      : <Sparkles className="w-3 h-3" />
                    }
                    {loadingImages[index] ? 'Gerando...' : 'Gerar com IA'}
                  </button>

                  <label className="cs-btn-ghost cursor-pointer">
                    <Upload className="w-3 h-3" />
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => onImageUpload(index, e)}
                    />
                  </label>
                </div>

                {/* Sliders de imagem — exibidos apenas se há imagem */}
                {slide.imageUrl && (
                  <div className="space-y-3 pt-1">
                    {/* Posição Y */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="cs-label mb-0 text-[10px]">Posição Y</label>
                        <span className="text-[9px] text-zinc-500 font-mono">{slide.imagePosition ?? 50}%</span>
                      </div>
                      <input type="range" min="0" max="100" value={slide.imagePosition ?? 50}
                        onChange={(e) => onImagePosition(index, e.target.value)} className="cs-range" />
                    </div>
                    {/* Posição X */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="cs-label mb-0 text-[10px]">Posição X</label>
                        <span className="text-[9px] text-zinc-500 font-mono">{slide.imagePositionX ?? 50}%</span>
                      </div>
                      <input type="range" min="0" max="100" value={slide.imagePositionX ?? 50}
                        onChange={(e) => onImagePositionX(index, e.target.value)} className="cs-range" />
                    </div>
                    {/* Escala */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="cs-label mb-0 text-[10px]">Escala</label>
                        <span className="text-[9px] text-zinc-500 font-mono">{slide.imageScale ?? 1}x</span>
                      </div>
                      <input type="range" min="1" max="3" step="0.05" value={slide.imageScale ?? 1}
                        onChange={(e) => onImageScale(index, e.target.value)} className="cs-range" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ─── COLUNA DIREITA: preview em tempo real ─── */}
            <div
              className="shrink-0 flex flex-col items-center justify-center bg-zinc-950/50 px-4 py-5 gap-3"
              style={{ width: PREVIEW_W + 32 }}
            >
              <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-600">Preview</span>

              {/* Slide miniaturizado com transform scale */}
              <div
                className="overflow-hidden rounded-lg shadow-xl ring-1 ring-white/5"
                style={{ width: PREVIEW_W, height: PREVIEW_H }}
              >
                <div
                  style={{
                    width: SLIDE_DIMENSIONS.width,
                    height: SLIDE_DIMENSIONS.height,
                    transform: `scale(${PREVIEW_SCALE})`,
                    transformOrigin: 'top left',
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                >
                  <SlideRenderer
                    data={slide}
                    index={index}
                    slideCount={slideCount}
                    brandHandle={brandHandle}
                    showBrandHandle={showBrandHandle}
                    brandAvatar={brandAvatar}
                    brandLogo={brandLogo}
                    showBrandLogo={showBrandLogo}
                    brandColor={brandColor}
                    isVerified={isVerified}
                    titleScale={titleScale}
                    textScale={textScale}
                    titleFont={titleFont}
                    textFont={textFont}
                    tagFont={tagFont}
                    showMetrics={false}
                    showSlideCounter={showSlideCounter}
                    slideCounterPosition={slideCounterPosition}
                    onActionStart={() => {}}
                    onTextChange={() => {}}
                    onItemChange={() => {}}
                    onSelectElement={() => {}}
                    selectedElement={null}
                  />
                </div>
              </div>
            </div>

          </div>{/* fim das duas colunas */}
        </div>
      ))}
    </div>
  );
}
