import React, { useRef, useState, useEffect } from 'react';
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
  Plus,
  Star,
  PenLine,
  CopyPlus,
  Save,
  Shuffle,
  Image as ImageIcon
} from 'lucide-react';

const Tooltip = ({ children, text }) => (
  <div className="group relative flex items-center justify-center">
    {children}
    <div className="absolute -top-12 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out bg-zinc-100 text-zinc-900 font-medium text-xs px-2.5 py-1.5 rounded shadow-xl pointer-events-none whitespace-nowrap z-50">
      {text}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-100 rotate-45"></div>
    </div>
  </div>
);
import AddSlidePopover from './AddSlidePopover';
import CoverVariantPopover from './CoverVariantPopover';
import SplitVariantPopover from './SplitVariantPopover';
import BigNumberVariantPopover from './BigNumberVariantPopover';
import QuoteVariantPopover from './QuoteVariantPopover';
import ComparisonVariantPopover from './ComparisonVariantPopover';
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
  onFavoriteSlide,
  copiedIndex,
  selectedElement,
  onSelectElement,
  onMoveSlide,
  onAddSlide,
  onCoverVariantChange,
  onSplitVariantChange,
  onBigNumberVariantChange,
  onQuoteVariantChange,
  onComparisonVariantChange,
  isExporting,
}) {
  const scrollRef = useRef(null);
  const [openAddIndex, setOpenAddIndex] = useState(-1);
  const [openVariantIndex, setOpenVariantIndex] = useState(-1);
  const [favoritedIndices, setFavoritedIndices] = useState({});
  const [toast, setToast] = useState(null);

  const handleActionFeedback = (actionName) => {
    setToast(actionName);
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleFavoriteClick = async (index) => {
    if (onFavoriteSlide) {
      const success = await onFavoriteSlide(index);
      if (success) {
        setFavoritedIndices(prev => ({ ...prev, [index]: true }));
        handleActionFeedback('Slide Favoritado');
        setTimeout(() => {
          setFavoritedIndices(prev => ({ ...prev, [index]: false }));
        }, 2000);
      }
    }
  };

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -400, behavior: 'smooth' });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 400, behavior: 'smooth' });

  return (
    <div className="relative w-full group/nav">
      {/* Toast Notification Premium */}
      <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 ease-out ${toast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="bg-zinc-100 text-zinc-900 px-4 py-2.5 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.1)] flex items-center gap-2 text-sm font-bold border border-white/20">
          <CheckCircle2 size={16} className="text-[#DE1E4D]" />
          <span>{toast}</span>
        </div>
      </div>

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
        className="flex gap-10 overflow-x-auto pb-12 pt-4 px-4 snap-x snap-mandatory items-center min-h-[600px] custom-scrollbar"
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

              <div className="flex flex-col gap-3">
                <button
                  onClick={(e) => { e.stopPropagation(); onSelectElement(index, null); handleActionFeedback('Abrindo Editor'); }}
                  className="w-full bg-zinc-800/40 hover:bg-zinc-800 border border-zinc-700/50 text-zinc-300 hover:text-white py-2.5 rounded-lg text-sm font-medium transition-all duration-200 active:scale-[0.98] flex justify-center items-center gap-2 group"
                >
                  <PenLine size={16} className="text-zinc-500 group-hover:text-[#DE1E4D] transition-colors" />
                  Editar Textos / Visual
                </button>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-800/50 mt-1">
                  <div className="flex items-center gap-0.5">
                    <Tooltip text="Alterar Foto">
                      <ImageSourceDropdown
                        slideIndex={index}
                        onImageUpload={onImageUpload}
                        onImageFromUrl={onImageFromUrl}
                        brandColor={brandColor}
                        variant="icon"
                      />
                    </Tooltip>
                    
                    <Tooltip text="Copiar Textos">
                      <button onClick={(e) => { e.stopPropagation(); onCopySlide(index); handleActionFeedback('Textos Copiados'); }} className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-all active:scale-90">
                        {copiedIndex === index ? <CheckCircle2 size={18} className="text-green-400" /> : <Copy size={18} />}
                      </button>
                    </Tooltip>
                    
                    {onDuplicateSlide && (
                      <>
                        <div className="w-px h-4 bg-zinc-800/80 mx-1"></div>
                        
                        <Tooltip text="Duplicar Slide">
                          <button onClick={(e) => { e.stopPropagation(); onDuplicateSlide(index); handleActionFeedback('Slide Duplicado'); }} className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-all active:scale-90">
                            <CopyPlus size={18} />
                          </button>
                        </Tooltip>
                      </>
                    )}
                    
                    {onFavoriteSlide && (
                      <Tooltip text={favoritedIndices[index] ? "Salvo!" : "Favoritar"}>
                        <button onClick={(e) => { e.stopPropagation(); handleFavoriteClick(index); }} className={`p-2 rounded-md transition-all active:scale-90 ${favoritedIndices[index] ? 'text-amber-500 bg-amber-400/10' : 'text-zinc-400 hover:text-amber-400 hover:bg-amber-400/10'}`}>
                          <Star size={18} />
                        </button>
                      </Tooltip>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Trocar Variante — apenas para slides cover */}
                    {slide.layout === 'cover' && onCoverVariantChange && (
                      <div className="relative">
                        <button
                          onClick={(e) => { e.stopPropagation(); setOpenVariantIndex(openVariantIndex === index ? -1 : index); }}
                          className="bg-zinc-800/60 hover:bg-zinc-700 border border-zinc-700/50 hover:border-zinc-600 text-zinc-400 hover:text-white px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 active:scale-95 flex items-center gap-1.5"
                        >
                          <Shuffle size={14} />
                          Variante
                        </button>
                        {openVariantIndex === index && (
                          <CoverVariantPopover
                            currentVariantIndex={slide.coverVariantIndex || 0}
                            onSelect={(variantId) => {
                              onCoverVariantChange(index, variantId);
                              handleActionFeedback(`Variante: ${variantId === 0 ? 'Original' : variantId}`);
                            }}
                            onClose={() => setOpenVariantIndex(-1)}
                            brandColor={brandColor}
                          />
                        )}
                      </div>
                    )}

                    {/* Trocar Variante — apenas para slides content-split */}
                    {slide.layout === 'content-split' && onSplitVariantChange && (
                      <div className="relative">
                        <button
                          onClick={(e) => { e.stopPropagation(); setOpenVariantIndex(openVariantIndex === index ? -1 : index); }}
                          className="bg-zinc-800/60 hover:bg-zinc-700 border border-zinc-700/50 hover:border-zinc-600 text-zinc-400 hover:text-white px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 active:scale-95 flex items-center gap-1.5"
                        >
                          <Shuffle size={14} />
                          Variante
                        </button>
                        {openVariantIndex === index && (
                          <SplitVariantPopover
                            currentVariantIndex={slide.splitVariantIndex || 0}
                            onSelect={(variantId) => {
                              onSplitVariantChange(index, variantId);
                              handleActionFeedback(`Variante: ${variantId === 0 ? 'Original' : variantId}`);
                            }}
                            onClose={() => setOpenVariantIndex(-1)}
                            brandColor={brandColor}
                          />
                        )}
                      </div>
                    )}

                    {/* Trocar Variante — apenas para slides big-number */}
                    {slide.layout === 'big-number' && onBigNumberVariantChange && (
                      <div className="relative">
                        <button
                          onClick={(e) => { e.stopPropagation(); setOpenVariantIndex(openVariantIndex === index ? -1 : index); }}
                          className="bg-zinc-800/60 hover:bg-zinc-700 border border-zinc-700/50 hover:border-zinc-600 text-zinc-400 hover:text-white px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 active:scale-95 flex items-center gap-1.5"
                        >
                          <Shuffle size={14} />
                          Variante
                        </button>
                        {openVariantIndex === index && (
                          <BigNumberVariantPopover
                            currentVariantIndex={slide.bigNumberVariantIndex || 0}
                            onSelect={(variantId) => {
                              onBigNumberVariantChange(index, variantId);
                              handleActionFeedback(`Variante: ${variantId === 0 ? 'Original' : variantId}`);
                            }}
                            onClose={() => setOpenVariantIndex(-1)}
                            brandColor={brandColor}
                          />
                        )}
                      </div>
                    )}

                    {/* Trocar Variante — apenas para slides quote */}
                    {slide.layout === 'quote' && onQuoteVariantChange && (
                      <div className="relative">
                        <button
                          onClick={(e) => { e.stopPropagation(); setOpenVariantIndex(openVariantIndex === index ? -1 : index); }}
                          className="bg-zinc-800/60 hover:bg-zinc-700 border border-zinc-700/50 hover:border-zinc-600 text-zinc-400 hover:text-white px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 active:scale-95 flex items-center gap-1.5"
                        >
                          <Shuffle size={14} />
                          Variante
                        </button>
                        {openVariantIndex === index && (
                          <QuoteVariantPopover
                            currentVariantIndex={slide.quoteVariantIndex || 0}
                            onSelect={(variantId) => {
                              onQuoteVariantChange(index, variantId);
                              handleActionFeedback(`Variante: ${variantId === 0 ? 'Original' : variantId}`);
                            }}
                            onClose={() => setOpenVariantIndex(-1)}
                            brandColor={brandColor}
                          />
                        )}
                      </div>
                    )}

                    {/* Trocar Variante — apenas para slides comparison */}
                    {slide.layout === 'comparison' && onComparisonVariantChange && (
                      <div className="relative">
                        <button
                          onClick={(e) => { e.stopPropagation(); setOpenVariantIndex(openVariantIndex === index ? -1 : index); }}
                          className="bg-zinc-800/60 hover:bg-zinc-700 border border-zinc-700/50 hover:border-zinc-600 text-zinc-400 hover:text-white px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 active:scale-95 flex items-center gap-1.5"
                        >
                          <Shuffle size={14} />
                          Variante
                        </button>
                        {openVariantIndex === index && (
                          <ComparisonVariantPopover
                            currentVariantIndex={slide.comparisonVariantIndex || 0}
                            onSelect={(variantId) => {
                              onComparisonVariantChange(index, variantId);
                              handleActionFeedback(`Variante: ${variantId === 0 ? 'Original' : variantId}`);
                            }}
                            onClose={() => setOpenVariantIndex(-1)}
                            brandColor={brandColor}
                          />
                        )}
                      </div>
                    )}

                    <button onClick={(e) => { e.stopPropagation(); onExportSlide && onExportSlide(index); handleActionFeedback('Exportação Iniciada'); }} className="bg-[#DE1E4D] hover:bg-[#ff245a] hover:shadow-[0_0_20px_rgba(222,30,77,0.4)] text-white px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 active:scale-95 flex items-center gap-2">
                      <Save size={16} />
                      Salvar
                    </button>
                  </div>
                </div>
              </div>

              {/* Resetar Posições (Aparece se tiver edições de posição ou imagem) */}
              {(Object.keys(slide.positions || {}).length > 0 || (slide.imagePosition !== undefined && slide.imagePosition !== 50) || (slide.imageScale !== undefined && slide.imageScale !== 1)) && (
                <div className="transition-all duration-300 ease-in-out overflow-hidden max-h-10 mt-3 opacity-100">
                  <button
                    onClick={(e) => { e.stopPropagation(); onResetPositions(index); handleActionFeedback('Posições Resetadas'); }}
                    className="w-full flex items-center justify-center gap-2 py-1.5 text-xs font-medium text-[#DE1E4D] hover:text-white bg-[#DE1E4D]/10 hover:bg-[#DE1E4D] rounded-md transition-colors border border-[#DE1E4D]/20 active:scale-[0.98]"
                  >
                    <RotateCcw size={12} />
                    Resetar Posições
                  </button>
                </div>
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
