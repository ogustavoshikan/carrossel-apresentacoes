import React, { useRef, useState } from 'react';
import {
  Copy,
  CheckCircle2,
  Settings2,
  RotateCcw,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Download,
  Plus
} from 'lucide-react';
import AddSlidePopover from './AddSlidePopover';
import SlideRenderer from '../slide-renderer';
import { SLIDE_DIMENSIONS } from '../../lib/design-tokens';
import ImageSourceDropdown from './ImageSourceDropdown';

/**
 * VisualPreview — Grid horizontal de cards visuais com controles por slide.
 */
export default function VisualPreview({
  slides,
  slideCount,
  brandHandle,
  brandColor,
  isVerified,
  titleScale,
  textScale,
  showMetrics,
  onActionStart,
  onTextChange,
  onItemChange,
  onImageUpload,
  onImagePosition,
  onImageScale,
  onImageFromUrl,
  onCopySlide,
  onExportSlide,
  onResetPositions,
  onRemoveSlide,
  onDuplicateSlide,
  copiedIndex,
  selectedElement,
  onSelectElement,
  onMoveSlide,
  onAddSlide,
  isExporting,
}) {
  const scrollRef = useRef(null);
  // índice do gap entre slides com o popover aberto (-1 = nenhum)
  const [openAddIndex, setOpenAddIndex] = useState(-1);

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -400, behavior: 'smooth' });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 400, behavior: 'smooth' });

  return (
    <div className="relative w-full group/nav">
      <button 
        onClick={scrollLeft}
        className="absolute left-2 top-1/3 -translate-y-1/2 z-50 w-10 h-10 bg-surface-card border border-border-subtle rounded-full flex items-center justify-center text-white opacity-0 group-hover/nav:opacity-100 transition-opacity disabled:opacity-0 shadow-2xl"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button 
        onClick={scrollRight}
        className="absolute right-2 top-1/3 -translate-y-1/2 z-50 w-10 h-10 bg-surface-card border border-border-subtle rounded-full flex items-center justify-center text-white opacity-0 group-hover/nav:opacity-100 transition-opacity disabled:opacity-0 shadow-2xl"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-10 overflow-x-auto pb-12 pt-4 px-4 snap-x snap-mandatory items-center min-h-[600px]"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#333 transparent' }}
      >
      {slides.map((slide, index) => (
        <React.Fragment key={`slide-wrapper-${index}`}>
        <div
          className="flex flex-col gap-6 shrink-0 snap-center transition-all duration-300 relative group/slide"
        >
          {/* Botão Remover Slide Flutuante */}
          {onRemoveSlide && (
            <button
              onClick={() => onRemoveSlide(index)}
              className="absolute -top-3 -right-3 z-50 w-8 h-8 bg-surface-dark border border-border-subtle hover:border-red-500/50 rounded-full flex items-center justify-center text-zinc-500 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover/slide:opacity-100 transition-all shadow-xl"
              title="Remover Slide"
            >
              <X className="w-4 h-4" />
            </button>
          )}

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
              isVerified={isVerified}
              titleScale={titleScale}
              textScale={textScale}
              showMetrics={showMetrics}
              onActionStart={onActionStart}
              onTextChange={onTextChange}
              onItemChange={onItemChange}
              selectedElement={selectedElement}
              onSelectElement={onSelectElement}
            />
          </div>

          {/* Controls */}
          <div className="flex flex-col gap-3" style={{ width: SLIDE_DIMENSIONS.width }}>
            <div className="w-full flex justify-between items-center mb-1 px-1">
               <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                 Layout: {slide.layout}
               </span>
               <span
                 id={`metrics-${index}`}
                 className="text-[10px] font-mono text-emerald-500/80 tracking-wider transition-all"
               >
                 {/* O hook useDragResize irá injetar [ X Y W H ] aqui parando re-renders colaterais */}
               </span>
            </div>

              <button
                 onClick={(e) => { e.stopPropagation(); onSelectElement(index, null); }}
                 className="w-full flex items-center justify-center gap-2 text-label-xs uppercase bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-500 py-3 rounded-xl transition-colors font-bold border border-emerald-500/30"
               >
                 <Settings2 className="w-4 h-4" />
                 Editar Textos / Visual
               </button>

              <div className="flex gap-3 w-full">
                <ImageSourceDropdown
                  slideIndex={index}
                  onImageUpload={onImageUpload}
                  onImageFromUrl={onImageFromUrl}
                  brandColor={brandColor}
                />

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

               <button
                onClick={() => onExportSlide && onExportSlide(index)}
                className="flex-1 flex items-center justify-center gap-2 text-label-xs uppercase text-white py-3.5 px-4 rounded-xl transition-all font-black shadow-lg bg-emerald-600 hover:bg-emerald-500"
              >
                <Download className="w-4 h-4" />
                Salvar
              </button>
            </div>

            {onDuplicateSlide && (
               <button
                 onClick={() => onDuplicateSlide(index)}
                 className="w-full flex items-center justify-center gap-2 text-label-xs uppercase bg-surface-input hover:bg-white/5 text-zinc-400 py-3 rounded-xl transition-colors font-bold border border-border-hover mt-1"
               >
                 <Copy className="w-3.5 h-3.5" />
                 Duplicar Slide
               </button>
            )}

            {Object.keys(slide.positions || {}).length > 0 && (
              <button
                onClick={() => onResetPositions(index)}
                className="w-full flex items-center justify-center gap-2 text-label-xs uppercase bg-red-950/20 hover:bg-red-900/40 text-red-500 py-3 rounded-xl transition-colors border border-red-900/30 font-bold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Resetar Posições
              </button>
            )}

            {slide.imageUrl && (
              <div className="bg-surface-input border border-border-subtle rounded-xl p-4 space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="alice-label mb-0">Posição da Imagem (Y)</label>
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
                
                <div className="w-full h-px bg-white/5" />

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="alice-label mb-0">Tamanho da Imagem (Escala)</label>
                    <span className="text-[10px] text-zinc-600 font-mono">
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
                    className="alice-range"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Controle de Reordenação + Botão Adicionar (Inter-Slides) */}
        {!isExporting && index < slides.length - 1 && onMoveSlide && (
             <div className="relative w-0 flex justify-center items-center z-40 -ml-1">
        <div className="absolute flex flex-col gap-2">

           {/* Botão + para inserir slide após este */}
           {onAddSlide && (
             <div className="relative flex justify-center">
               <button
                 onClick={(e) => { e.stopPropagation(); setOpenAddIndex(openAddIndex === index ? -1 : index); }}
                 className="w-8 h-8 rounded-full bg-surface-card border border-border-subtle flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all shadow-xl active:scale-95 opacity-30 hover:opacity-100"
                 title="Inserir slide aqui"
               >
                 <Plus className="w-3.5 h-3.5" />
               </button>
               {openAddIndex === index && (
                 <AddSlidePopover
                   insertIndex={index + 1}
                   onAddSlide={onAddSlide}
                   onClose={() => setOpenAddIndex(-1)}
                   brandColor={brandColor}
                 />
               )}
             </div>
           )}

           <button 
             onClick={() => onMoveSlide(index + 1, index)} 
             className="w-10 h-10 rounded-full bg-surface-card border border-border-subtle flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all shadow-xl active:scale-95 hover:border-white/20 opacity-30 hover:opacity-100"
             title="Mover slide para a Esquerda"
           >
             <ArrowLeft className="w-4 h-4" />
           </button>
           <button 
             onClick={() => onMoveSlide(index, index + 1)} 
             className="w-10 h-10 rounded-full bg-surface-card border border-border-subtle flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all shadow-xl active:scale-95 hover:border-white/20 opacity-30 hover:opacity-100"
             title="Mover slide para a Direita"
           >
             <ArrowRight className="w-4 h-4" />
           </button>
        </div>
             </div>
          )}
        </React.Fragment>
      ))}
      </div>
    </div>
  );
}
