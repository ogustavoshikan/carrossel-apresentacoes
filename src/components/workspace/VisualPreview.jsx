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
    <div className="absolute -top-12 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150 ease-out bg-zinc-100 text-zinc-900 font-medium text-xs px-2.5 py-1.5 rounded shadow-xl pointer-events-none whitespace-nowrap z-50">
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
import CtaVariantPopover from './CtaVariantPopover';
import { ListVariantPopover } from './ListVariantPopover';
import SlideRenderer from '../slide-renderer';
import { SLIDE_DIMENSIONS } from '../../lib/design-tokens';
import ImageSourceDropdown from './ImageSourceDropdown';
import { COVER_VARIANT_META } from '../slides/cover-variants';
import { SPLIT_VARIANT_META } from '../slides/split-variants';
import { BIGNUMBER_VARIANT_META } from '../slides/bignumber-variants';
import { QUOTE_VARIANT_META } from '../slides/quote-variants';
import { COMPARISON_VARIANT_META } from '../slides/comparison-variants';
import { CTA_VARIANT_META } from '../slides/cta-variants';
import { LIST_VARIANT_META } from '../slides/list-variants';

/**
 * VisualPreview — Grid horizontal de cards visuais com controles por slide.
 */
export default function VisualPreview({
  slides,
  slideCount,
  brandHandle,
  showBrandHandle,
  brandAvatar,
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
  onCtaVariantChange,
  onListVariantChange,
  isExporting,
  onRemoveImage,
  showSlideCounter,
  slideCounterPosition,
}) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
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

  const handleRandomVariant = (index, layout) => {
    let metas = [];
    let handler = null;

    switch (layout) {
      case 'cover':
        metas = COVER_VARIANT_META;
        handler = onCoverVariantChange;
        break;
      case 'content-split':
        metas = SPLIT_VARIANT_META;
        handler = onSplitVariantChange;
        break;
      case 'big-number':
        metas = BIGNUMBER_VARIANT_META;
        handler = onBigNumberVariantChange;
        break;
      case 'quote':
        metas = QUOTE_VARIANT_META;
        handler = onQuoteVariantChange;
        break;
      case 'comparison':
        metas = COMPARISON_VARIANT_META;
        handler = onComparisonVariantChange;
        break;
      case 'cta':
        metas = CTA_VARIANT_META;
        handler = onCtaVariantChange;
        break;
      case 'list':
        metas = LIST_VARIANT_META;
        handler = onListVariantChange;
        break;
      default:
        return;
    }

    if (handler && metas.length > 0) {
      const randomIndex = Math.floor(Math.random() * metas.length);
      const variantId = metas[randomIndex].id;
      handler(index, variantId);
      handleActionFeedback(`Variante: ${variantId === 0 ? 'Original' : variantId}`);
    }
  };

  const scrollLeftNav = () => scrollRef.current?.scrollBy({ left: -(SLIDE_DIMENSIONS.width + 40), behavior: 'smooth' });
  const scrollRightNav = () => scrollRef.current?.scrollBy({ left: (SLIDE_DIMENSIONS.width + 40), behavior: 'smooth' });
  
  const handleScroll = (e) => {
    const slideWidth = SLIDE_DIMENSIONS.width + 40; // 40px is gap-10
    const newIndex = Math.round(e.target.scrollLeft / slideWidth);
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < slides.length) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <div className="relative w-full">
      {/* Toast Notification Premium */}
      <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-150 ease-out ${toast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="bg-zinc-100 text-zinc-900 px-4 py-2.5 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.1)] flex items-center gap-2 text-sm font-bold border border-white/20">
          <CheckCircle2 size={16} className="text-[#DE1E4D]" />
          <span>{toast}</span>
        </div>
      </div>

      {/* Navegação: Floating Dock Minimalista */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[150] pointer-events-auto">
        <div className="flex items-center gap-4 px-4 py-2 bg-zinc-900/90 backdrop-blur-md rounded-full border border-white/10 shadow-2xl">
          <button
            onClick={scrollLeftNav}
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`transition-all duration-300 rounded-full ${
                  i === activeIndex
                    ? 'w-6 h-2 bg-rose-500'
                    : 'w-2 h-2 bg-zinc-700'
                }`}
              />
            ))}
          </div>

          <button
            onClick={scrollRightNav}
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-10 overflow-x-auto pb-12 pt-2 px-4 snap-x snap-mandatory items-start min-h-[600px] custom-scrollbar relative"
      >

      {slides.map((slide, index) => (

        <React.Fragment key={`slide-wrapper-${index}`}>
        <div
          className={`flex flex-col gap-6 shrink-0 snap-center transition-all duration-150 relative group/slide ${openVariantIndex === index ? 'z-50' : 'z-10'}`}
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
              showBrandHandle={showBrandHandle}
              brandAvatar={brandAvatar}
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
              showSlideCounter={showSlideCounter}
              slideCounterPosition={slideCounterPosition}
            />
          </div>

          {/* Controls */}
          <div className="bg-[#080808] border border-zinc-800/60 rounded-xl p-4 shadow-lg flex flex-col" style={{ width: SLIDE_DIMENSIONS.width }}>
            <div className="flex justify-between items-center mb-3">
               <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest bg-surface-input px-2 py-0.5 rounded-full border border-white/10">
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
              onClick={(e) => { e.stopPropagation(); onSelectElement(index, null); handleActionFeedback('Abrindo Editor'); }}
              className="w-full bg-zinc-800/40 hover:bg-zinc-800 border border-zinc-700/50 text-zinc-300 hover:text-white py-2.5 rounded-lg text-sm font-medium transition-all duration-150 active:scale-[0.98] flex justify-center items-center gap-2 group mb-3"
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

                  <div className="flex items-center gap-1.5">
                    {/* Botão Aleatório (Shuffle) fora do popover */}
                    {['cover', 'content-split', 'big-number', 'quote', 'comparison', 'cta', 'list'].includes(slide.layout) && (
                      <Tooltip text="Variante Aleatória">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleRandomVariant(index, slide.layout); }}
                          className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-all active:scale-90"
                        >
                          <Shuffle size={18} />
                        </button>
                      </Tooltip>
                    )}

                    {/* Trocar Variante — apenas para slides cover */}
                    {slide.layout === 'cover' && onCoverVariantChange && (
                      <div className="relative">
                        <button
                          onClick={(e) => { e.stopPropagation(); setOpenVariantIndex(openVariantIndex === index ? -1 : index); }}
                          className="bg-zinc-800/60 hover:bg-zinc-700 border border-zinc-700/50 hover:border-zinc-600 text-zinc-400 hover:text-white px-2.5 py-1.5 rounded-md text-sm font-medium transition-all duration-150 active:scale-95 flex items-center"
                        >
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
                          className="bg-zinc-800/60 hover:bg-zinc-700 border border-zinc-700/50 hover:border-zinc-600 text-zinc-400 hover:text-white px-2.5 py-1.5 rounded-md text-sm font-medium transition-all duration-150 active:scale-95 flex items-center"
                        >
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
                          className="bg-zinc-800/60 hover:bg-zinc-700 border border-zinc-700/50 hover:border-zinc-600 text-zinc-400 hover:text-white px-2.5 py-1.5 rounded-md text-sm font-medium transition-all duration-150 active:scale-95 flex items-center"
                        >
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
                          className="bg-zinc-800/60 hover:bg-zinc-700 border border-zinc-700/50 hover:border-zinc-600 text-zinc-400 hover:text-white px-2.5 py-1.5 rounded-md text-sm font-medium transition-all duration-150 active:scale-95 flex items-center"
                        >
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
                          className="bg-zinc-800/60 hover:bg-zinc-700 border border-zinc-700/50 hover:border-zinc-600 text-zinc-400 hover:text-white px-2.5 py-1.5 rounded-md text-sm font-medium transition-all duration-150 active:scale-95 flex items-center"
                        >
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

                    {/* Trocar Variante — apenas para slides cta */}
                    {slide.layout === 'cta' && onCtaVariantChange && (
                      <div className="relative">
                        <button
                          onClick={(e) => { e.stopPropagation(); setOpenVariantIndex(openVariantIndex === index ? -1 : index); }}
                          className="bg-zinc-800/60 hover:bg-zinc-700 border border-zinc-700/50 hover:border-zinc-600 text-zinc-400 hover:text-white px-2.5 py-1.5 rounded-md text-sm font-medium transition-all duration-150 active:scale-95 flex items-center"
                        >
                          Variante
                        </button>
                        {openVariantIndex === index && (
                          <CtaVariantPopover
                            currentVariantIndex={slide.ctaVariantIndex || 0}
                            onSelect={(variantId) => {
                              onCtaVariantChange(index, variantId);
                              handleActionFeedback(`Variante: ${variantId === 0 ? 'Original' : variantId}`);
                            }}
                            onClose={() => setOpenVariantIndex(-1)}
                            brandColor={brandColor}
                          />
                        )}
                      </div>
                    )}

                    {/* Trocar Variante — apenas para slides list */}
                    {slide.layout === 'list' && onListVariantChange && (
                      <div className="relative">
                        <button
                          onClick={(e) => { e.stopPropagation(); setOpenVariantIndex(openVariantIndex === index ? -1 : index); }}
                          className="bg-zinc-800/60 hover:bg-zinc-700 border border-zinc-700/50 hover:border-zinc-600 text-zinc-400 hover:text-white px-2.5 py-1.5 rounded-md text-sm font-medium transition-all duration-150 active:scale-95 flex items-center"
                        >
                          Variante
                        </button>
                        {openVariantIndex === index && (
                          <ListVariantPopover
                            currentVariantIndex={slide.listVariantIndex || 0}
                            onSelect={(variantId) => {
                              onListVariantChange(index, variantId);
                              handleActionFeedback(`Variante: ${variantId === 0 ? 'Original' : variantId}`);
                            }}
                            onClose={() => setOpenVariantIndex(-1)}
                            brandColor={brandColor}
                          />
                        )}
                      </div>
                    )}

                    <button onClick={(e) => { e.stopPropagation(); onExportSlide && onExportSlide(index); handleActionFeedback('Exportação Iniciada'); }} className="bg-[#DE1E4D] hover:bg-[#ff245a] hover:shadow-[0_0_20px_rgba(222,30,77,0.4)] text-white px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-150 active:scale-95 flex items-center gap-2">
                      <Save size={16} />
                      Salvar
                    </button>
                  </div>
            </div>

            {/* Elemento 4: Painel de Sliders (Y, Escala, Reset) */}
            {(() => {
              // Detectar quantos slots de imagem o variant usa
              const MULTI_IMAGE_SLOTS = {
                'content-split': { 27: 4, 28: 2, 29: 2, 30: 2, 31: 2 },
              };
              const variantKey = slide.layout === 'content-split' ? (slide.splitVariantIndex || 0) : 0;
              const totalSlots = MULTI_IMAGE_SLOTS[slide.layout]?.[variantKey] || 1;

              const urlFor = (s) => s === 1 ? 'imageUrl' : `imageUrl${s}`;
              const posFor = (s) => s === 1 ? 'imagePosition' : `imagePosition${s}`;
              const scaleFor = (s) => s === 1 ? 'imageScale' : `imageScale${s}`;
              const slotLabels = ['Principal', '2ª Imagem', '3ª Imagem', '4ª Imagem'];

              // Verificar se tem pelo menos uma imagem ativa
              const hasAnyImage = Array.from({ length: totalSlots }, (_, i) => slide[urlFor(i + 1)]).some(Boolean);
              const hasPositions = Object.keys(slide.positions || {}).length > 0;

              if (!hasAnyImage && !hasPositions) return null;

              return (
                <div className="bg-[#0f0f0f] border border-zinc-800/80 rounded-lg p-3 mt-4 relative space-y-4">
                  {Array.from({ length: totalSlots }, (_, idx) => {
                    const slot = idx + 1;
                    const imageUrl = slide[urlFor(slot)];
                    if (!imageUrl) return null;
                    const imagePosition = slide[posFor(slot)] ?? 50;
                    const imageScale = slide[scaleFor(slot)] ?? 1;
                    const label = totalSlots > 1 ? slotLabels[idx] : null;

                    return (
                      <div key={slot} className={slot > 1 ? 'border-t border-zinc-800/60 pt-4' : ''}>
                        {label && (
                          <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-600 block mb-3">{label}</span>
                        )}
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <label className="text-xs font-medium text-zinc-400 mb-0">Posição da Imagem (Y)</label>
                            <span className="text-[10px] text-zinc-600 font-mono">{imagePosition}%</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={imagePosition}
                            onChange={(e) => onImagePosition(index, e.target.value, slot)}
                            className="alice-range"
                          />
                        </div>

                        <div className="w-full h-px bg-surface-input/30 my-2" />

                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <label className="text-xs font-medium text-zinc-400 mb-0">Tamanho da Imagem (Escala)</label>
                            <span className="text-[10px] text-zinc-600 font-mono">{imageScale}x</span>
                          </div>
                          <input
                            type="range"
                            min="1"
                            max="3"
                            step="0.05"
                            value={imageScale}
                            onChange={(e) => onImageScale(index, e.target.value, slot)}
                            className="alice-range"
                          />
                        </div>

                        {onRemoveImage && (
                          <button
                            onClick={(e) => { e.stopPropagation(); onRemoveImage(index, slot); }}
                            className="w-full py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 hover:border-rose-500/40 transition-all flex items-center justify-center gap-1.5 mt-2"
                          >
                            <X size={12} />
                            Remover {label || 'Imagem'}
                          </button>
                        )}
                      </div>
                    );
                  })}

                  {/* Resetar Posições */}
                  {(hasPositions || (slide.imagePosition !== undefined && slide.imagePosition !== 50) || (slide.imageScale !== undefined && slide.imageScale !== 1)) && (
                    <div className={hasAnyImage ? "pt-2 border-t border-white/5" : ""}>
                      <button
                        onClick={(e) => { e.stopPropagation(); onResetPositions(index); handleActionFeedback('Posições Resetadas'); }}
                        className="w-full flex items-center justify-center gap-2 py-1.5 text-xs font-medium text-[#DE1E4D] hover:text-white bg-[#DE1E4D]/10 hover:bg-[#DE1E4D] rounded-md transition-colors border border-[#DE1E4D]/20 active:scale-[0.98]"
                      >
                        <RotateCcw size={12} />
                        Resetar Posições
                      </button>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
        
        {/* Controle de Reordenação + Botão Adicionar (Inter-Slides) */}
        {!isExporting && index < slides.length - 1 && onMoveSlide && (
             <div className="relative w-0 flex justify-center z-[100] -ml-1" style={{ marginTop: SLIDE_DIMENSIONS.height / 2 }}>
        <div className="absolute flex flex-col gap-2 -translate-y-1/2">

           {/* Botão + para inserir slide após este */}
           {onAddSlide && (
             <div className="relative flex justify-center">
               <button
                 onClick={(e) => { e.stopPropagation(); setOpenAddIndex(openAddIndex === index ? -1 : index); }}
                 className="w-8 h-8 rounded-full bg-surface-card border border-border-subtle flex items-center justify-center text-zinc-500 hover:text-white hover:bg-surface-input/50 hover:border-white/20 transition-all shadow-xl active:scale-95 opacity-30 hover:opacity-100"
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
             className="w-10 h-10 rounded-full bg-surface-card border border-border-subtle flex items-center justify-center text-zinc-400 hover:text-white hover:bg-surface-input/50 transition-all shadow-xl active:scale-95 hover:border-white/20 opacity-30 hover:opacity-100"
             title="Mover slide para a Esquerda"
           >
             <ArrowLeft className="w-4 h-4" />
           </button>
           <button 
             onClick={() => onMoveSlide(index, index + 1)} 
             className="w-10 h-10 rounded-full bg-surface-card border border-border-subtle flex items-center justify-center text-zinc-400 hover:text-white hover:bg-surface-input/50 transition-all shadow-xl active:scale-95 hover:border-white/20 opacity-30 hover:opacity-100"
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

