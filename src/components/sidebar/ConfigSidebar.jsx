import React, { useRef } from 'react';
import { cn } from '../../lib/utils';
import {
  Settings,
  Settings2,
  LayoutTemplate,
  Lightbulb,
  BadgeCheck,
  Link,
  Loader2,
  Send,
  AlertCircle,
  Sparkles,
  Upload,
  Image as ImageIcon,
  X,
  Bold,
  Italic,
  Underline,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Info,
  ChevronDown,
  ChevronRight,
  RotateCcw,
  Copy,
  Trash2,
  ArrowUp,
} from 'lucide-react';
import { FONT_SCALE_RANGE, SLIDE_COUNT_RANGE, FONT_OPTIONS } from '../../lib/design-tokens';
import { CONTENT_LIBRARY } from '../../lib/content-library';
import LayoutSelector from './LayoutSelector';
import DesignLibrary from './DesignLibrary';

const CollapsibleSection = ({ title, defaultOpen = true, children }) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  return (
    <div className="bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden mb-4 backdrop-blur-md transition-all duration-150">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-surface-input/30 hover:bg-surface-input transition-colors outline-none focus:outline-none focus-visible:outline-none"
      >
        <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/40">{title}</span>
        {isOpen ? <ChevronDown className="w-4 h-4 text-white/20" /> : <ChevronRight className="w-4 h-4 text-white/20" />}
      </button>
      {isOpen && (
        <div className="p-5 flex flex-col gap-5 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
};

/**
 * ConfigSidebar — Sidebar de configurações do Carrossel Studio.
 * Contém: Carrossel Setup (handle, cor, verificado, fontes) + Master Prompt + geração.
 */
export default function ConfigSidebar({
  width,
  activeTab,
  setActiveTab,
  brandHandle,
  setBrandHandle,
  brandAvatar,
  setBrandAvatar,
  brandLogo,
  setBrandLogo,
  showBrandLogo,
  setShowBrandLogo,
  showBrandHandle,
  setShowBrandHandle,
  isVerified,
  setIsVerified,
  gradientColor1,
  setGradientColor1,
  titleSizeScale,
  setTitleSizeScale,
  textSizeScale,
  setTextSizeScale,
  cardBorderRadius,
  setCardBorderRadius,
  imageBorderRadius,
  setImageBorderRadius,
  // Prompt state
  theme,
  setTheme,
  contextUrls = [],
  setContextUrls,
  creativeContext = {},
  setCreativeContext,
  slideCount,
  setSlideCount,
  layoutSelection,
  setLayoutSelection,
  // Actions
  onGenerate,
  isGenerating,
  error,
  setIsSettingsOpen,
  selectedElement,
  setSelectedElement,
  slides,
  setSlides,
  onImageUpload,
  onImagePosition,
  onImagePositionX,
  onImageScale,
  onRemoveImage,
  titleFont,
  setTitleFont,
  textFont,
  setTextFont,
  tagFont,
  setTagFont,
  favorites,
  onUseFavorite,
  onRemoveFavorite,
  onInjectSlide,
  isInjecting,
  onAddSlide,
  showSlideCounter,
  setShowSlideCounter,
  slideCounterPosition,
  setSlideCounterPosition,
}) {
  const isInspectorActive = !!selectedElement;
  const savedSelection = useRef(null);
  const selectionColorInputRef = useRef(null);
  const [showContentLib, setShowContentLib] = React.useState(false);
  const [activeNiche, setActiveNiche] = React.useState('confeitaria');
  const [selectionColor, setSelectionColor] = React.useState('');

  const scrollContainerRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  const handleScroll = (e) => {
    if (e.target.scrollTop > 300) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Salva a seleção nativa antes de qualquer clique roubar o foco do contentEditable
  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && !sel.isCollapsed) {
      savedSelection.current = sel.getRangeAt(0).cloneRange();
    } else {
      savedSelection.current = null;
    }
  };

  // Aplica formatação RTF na seleção salva, ou fullblock se não houver seleção parcial
  const applyRichFormat = (command, updateFallback) => {
    const saved = savedSelection.current;
    if (saved) {
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(saved);
      document.execCommand(command, false, null);
      savedSelection.current = null;
    } else {
      // Fallback: aplica no bloco inteiro (comportamento original)
      updateFallback();
    }
  };

  if (isInspectorActive) {
    const slide = slides[selectedElement.slideIndex] || {};

    // Múltiplos Focos (Todo o Slide)
    if (!selectedElement.field) {
      return (
        <aside 
          className="cs-sidebar-resizable h-full border-r border-white/5 bg-black/95 p-6 lg:p-8 flex flex-col gap-6 overflow-y-auto custom-scrollbar z-40 relative"
          style={{ '--sidebar-width': `${width}px`, width: `${width}px` }}>

          <header className="flex justify-between items-center mb-2">
            <div className="flex flex-col">
              <span 
                className="text-[10px] font-black tracking-[0.2em] uppercase"
                style={{ color: gradientColor1 }}
              >
                Inspetor
              </span>
              <h2 className="text-xl font-black text-white tracking-tighter uppercase leading-none">Slide <span className="text-white/40">#{selectedElement.slideIndex + 1}</span></h2>
            </div>
            <button 
              onClick={() => setSelectedElement(null)}
              className="p-2 hover:bg-surface-input/50 rounded-xl transition-colors text-white/40 hover:text-white"
            >
              <X size={20} />
            </button>
          </header>

          <div className="h-px bg-surface-input/50 w-full -my-2" />

          {/* Botões de Ação do Slide */}
          <div className="grid grid-cols-2 gap-3 -mt-2">
             <button 
                onClick={() => {
                   const cloned = JSON.parse(JSON.stringify(slides[selectedElement.slideIndex]));
                   setSlides(prev => {
                      const updated = [...prev];
                      updated.splice(selectedElement.slideIndex + 1, 0, cloned);
                      return updated.map((s, i) => ({ ...s, slide: i + 1 }));
                   });
                }}
                className="flex items-center justify-center gap-2 py-3 bg-surface-input hover:bg-surface-input/50 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white/70 transition-all"
             >
                <Copy size={14} /> Duplicar
             </button>
             <button 
                onClick={() => {
                   setSlides(prev => prev.filter((_, i) => i !== selectedElement.slideIndex).map((s, i) => ({ ...s, slide: i + 1 })));
                   setSelectedElement(null);
                }}
                className="flex items-center justify-center gap-2 py-3 bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 rounded-xl text-[10px] font-bold uppercase tracking-widest text-red-400 transition-all"
             >
                <Trash2 size={14} /> Excluir
             </button>
          </div>

          <div className="flex justify-between items-center bg-black/20 p-2 rounded-lg mb-1 border border-border-subtle">
            <h3 className="text-white font-outfit font-black tracking-wide text-sm flex items-center gap-2 uppercase px-2">
              <Settings2 className="w-4 h-4 text-emerald-500" />
              Edição (Slide {selectedElement.slideIndex + 1})
            </h3>
            <button 
              onClick={() => setSelectedElement(null)}
              className="text-zinc-500 hover:text-white transition-colors bg-surface-input rounded-full p-1 border border-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {/* === Bloco de Tipografia do Slide === */}
            <CollapsibleSection title="TIPOGRAFIA DO SLIDE" defaultOpen={true}>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-[9px] uppercase font-bold tracking-widest text-zinc-600 mb-1 block">Fonte Título</label>
                  <select
                    value={slide.titleFont || ''}
                    onChange={(e) => {
                      setSlides(prev => prev.map((s, i) => i === selectedElement.slideIndex ? {...s, titleFont: e.target.value} : s));
                    }}
                    className="cs-input text-xs py-[0.675rem] w-full"
                  >
                    <option value="">(Padrão Global)</option>
                    {FONT_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[9px] uppercase font-bold tracking-widest text-zinc-600 mb-1 block">Fonte Texto Apoio</label>
                  <select
                    value={slide.textFont || ''}
                    onChange={(e) => {
                      setSlides(prev => prev.map((s, i) => i === selectedElement.slideIndex ? {...s, textFont: e.target.value} : s));
                    }}
                    className="cs-input text-xs py-[0.675rem] w-full"
                  >
                    <option value="">(Padrão Global)</option>
                    {FONT_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[9px] uppercase font-bold tracking-widest text-zinc-600 mb-1 block">Fonte Tag</label>
                  <select
                    value={slide.tagFont || ''}
                    onChange={(e) => {
                      setSlides(prev => prev.map((s, i) => i === selectedElement.slideIndex ? {...s, tagFont: e.target.value} : s));
                    }}
                    className="cs-input text-xs py-[0.675rem] w-full"
                  >
                    <option value="">(Padrão Global)</option>
                    {FONT_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
              </div>
            </CollapsibleSection>

            {/* === Bloco de Imagem(ns) do Slide === */}
            {(() => {
              // Mapeamento de quantos slots de imagem cada variant suporta
              const MULTI_IMAGE_SLOTS = {
                'content-split': { 27: 4, 28: 2, 29: 2, 30: 2, 31: 2 },
              };
              const variantKey = slide.layout === 'content-split' ? (slide.splitVariantIndex || 0) : 0;
              const totalSlots = MULTI_IMAGE_SLOTS[slide.layout]?.[variantKey] || 1;

              const urlFor = (s) => s === 1 ? 'imageUrl' : `imageUrl${s}`;
              const posFor = (s) => s === 1 ? 'imagePosition' : `imagePosition${s}`;
              const posForX = (s) => s === 1 ? 'imagePositionX' : `imagePositionX${s}`;
              const scaleFor = (s) => s === 1 ? 'imageScale' : `imageScale${s}`;

              const slotLabels = ['Principal', '2ª Imagem', '3ª Imagem', '4ª Imagem'];

              return Array.from({ length: totalSlots }, (_, idx) => {
                const slot = idx + 1;
                const currentUrl = slide[urlFor(slot)];
                const currentPos = slide[posFor(slot)] ?? 50;
                const currentPosX = slide[posForX(slot)] ?? 50;
                const currentScale = slide[scaleFor(slot)] ?? 1;
                const label = totalSlots > 1 ? slotLabels[idx] : 'Imagem do Slide';

                return (
                  <div key={slot} className="bg-surface-card border border-border-subtle p-4 rounded-xl flex flex-col gap-3">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">{label}</span>
                    {currentUrl ? (
                      <div className="flex flex-col gap-3">
                        <div
                          className="w-full h-28 rounded-lg overflow-hidden bg-zinc-900 relative"
                          style={{
                            backgroundImage: `url(${currentUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: `${currentPosX}% ${currentPos}%`,
                          }}
                        >
                          <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                            <Upload className="w-5 h-5 text-white" />
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => onImageUpload(selectedElement.slideIndex, e, slot)} />
                          </label>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-600">Posição X</span>
                            <span className="text-[9px] font-mono text-zinc-500">{currentPosX}%</span>
                          </div>
                          <input type="range" min="0" max="100" value={currentPosX} onChange={(e) => onImagePositionX(selectedElement.slideIndex, e.target.value, slot)} className="cs-range w-full" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-600">Posição Y</span>
                            <span className="text-[9px] font-mono text-zinc-500">{currentPos}%</span>
                          </div>
                          <input type="range" min="0" max="100" value={currentPos} onChange={(e) => onImagePosition(selectedElement.slideIndex, e.target.value, slot)} className="cs-range w-full" />
                        </div>
                        {onImageScale && (
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-600">Escala</span>
                              <span className="text-[9px] font-mono text-zinc-500">{currentScale}x</span>
                            </div>
                            <input type="range" min="1" max="3" step="0.05" value={currentScale} onChange={(e) => onImageScale(selectedElement.slideIndex, e.target.value, slot)} className="cs-range w-full" />
                          </div>
                        )}
                        {onRemoveImage && (
                          <button
                            onClick={() => onRemoveImage(selectedElement.slideIndex, slot)}
                            className="w-full py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 hover:border-rose-500/40 transition-all flex items-center justify-center gap-1.5"
                          >
                            <X className="w-3 h-3" />
                            Remover {totalSlots > 1 ? label : 'Imagem'}
                          </button>
                        )}
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center gap-2 h-20 border-2 border-dashed border-border-subtle rounded-lg text-zinc-600 hover:text-zinc-400 hover:border-zinc-600 transition-colors cursor-pointer">
                        <ImageIcon className="w-5 h-5" />
                        <span className="text-[9px] font-bold uppercase tracking-widest">
                          {totalSlots > 1 ? `Adicionar ${label}` : 'Adicionar Imagem'}
                        </span>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => onImageUpload(selectedElement.slideIndex, e, slot)} />
                      </label>
                    )}
                  </div>
                );
              });
            })()}

            {['titulo', 'texto_apoio', 'citacao', 'autor', 'dado_destaque', 'contexto_dado', 'slide_call', 'insta_ready', 'cta_text', 'cta_button', 'badge_text', 'studio_text'].map(key => {
              if (slide[key] === undefined) return null;
              return (
                <div key={key} className="bg-surface-card border border-border-subtle p-4 rounded-xl flex flex-col gap-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">{key.replace('_', ' ')}</span>
                    <button 
                      onClick={() => setSelectedElement({ slideIndex: selectedElement.slideIndex, field: key })}
                      className="text-[9px] uppercase tracking-widest font-bold text-zinc-400 hover:text-white px-2 py-1 rounded bg-black/40 border border-white/5 transition-colors"
                    >
                      Props Design
                    </button>
                  </div>
                  <textarea 
                    value={slide[key] || ''}
                    onChange={(e) => {
                      setSlides(prev => prev.map((s, i) => i === selectedElement.slideIndex ? {...s, [key]: e.target.value} : s));
                    }}
                    className="cs-textarea min-h-20 w-full p-3 font-outfit text-sm text-zinc-200"
                  />
                </div>
              );
            })}

            {slide.items && slide.items.map((item, idx) => (
              <div key={idx} className="bg-surface-card border border-border-subtle p-4 rounded-xl flex flex-col gap-3">
                 <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 mt-1 block">Item Lista {idx + 1}</span>
                 <input 
                    value={item.label || ''}
                    onChange={(e) => {
                      const newItems = [...slide.items];
                      newItems[idx].label = e.target.value;
                      setSlides(prev => prev.map((s, i) => i === selectedElement.slideIndex ? {...s, items: newItems} : s));
                    }}
                    className="cs-input font-bold"
                 />
                 <textarea 
                    value={item.text || ''}
                    onChange={(e) => {
                      const newItems = [...slide.items];
                      newItems[idx].text = e.target.value;
                      setSlides(prev => prev.map((s, i) => i === selectedElement.slideIndex ? {...s, items: newItems} : s));
                    }}
                    className="cs-textarea min-h-20 w-full p-3 font-playfair text-sm text-zinc-300 italic"
                 />
              </div>
            ))}
          </div>
        </aside>
      );
    }

    const pos = slide.positions?.[selectedElement.field] || { x: 0, y: 0, scale: 1 };
    
    // Atualizar uma propriedade específica do elemento no Master State
    const updateProp = (prop, valueOrFn) => {
      setSlides(prev => prev.map((s, i) => {
        if (i === selectedElement.slideIndex) {
          const rawPos = s.positions?.[selectedElement.field] || {};
          const currentPos = {
            x: rawPos.x ?? 0,
            y: rawPos.y ?? 0,
            scale: rawPos.scale ?? 1,
            ...rawPos
          };
          
          const getValueFallback = (p) => {
            if (currentPos[p] !== undefined) return currentPos[p];
            if (p === 'lineHeight') return 1.0;
            if (p === 'letterSpacing') return 0;
            return undefined;
          };
          
          const newValue = typeof valueOrFn === 'function' ? valueOrFn(getValueFallback(prop)) : valueOrFn;
          return {
            ...s,
            positions: {
              ...(s.positions || {}),
              [selectedElement.field]: {
                ...currentPos,
                [prop]: newValue
              }
            }
          };
        }
        return s;
      }));
    };

    // Função para incremento contínuo ao segurar botão (clique = 1 passo, segurar = scroll contínuo)
    const startAutoScroll = (prop, delta) => {
      updateProp(prop, v => v + delta); // passo único imediato no clique

      let interval = null;
      const timeout = setTimeout(() => {
        // Só inicia o scroll contínuo se o botão ainda estiver pressionado
        interval = setInterval(() => {
          updateProp(prop, v => v + delta);
        }, 50);
      }, 300); // aguarda 300ms antes de entrar em modo contínuo

      const stop = () => {
        clearTimeout(timeout);
        clearInterval(interval);
        window.removeEventListener('mouseup', stop);
        window.removeEventListener('touchend', stop);
      };
      window.addEventListener('mouseup', stop);
      window.addEventListener('touchend', stop);
    };

    return (
      <aside 
        className="cs-sidebar-resizable h-full border-r border-border-subtle bg-surface-dark p-6 lg:p-8 flex flex-col gap-8 overflow-y-auto custom-scrollbar z-40 relative"
        style={{ '--sidebar-width': `${width}px` }}
      >
        <div className="flex items-center gap-3 underline-offset-4 decoration-white/20 mb-[-1rem]">
           <button 
             onClick={() => setSelectedElement(null)}
             className="text-zinc-500 hover:text-white transition-colors bg-surface-input/50 rounded-full p-1"
           >
             <X className="w-4 h-4" />
           </button>
           <h3 className="text-white font-outfit font-black tracking-wide text-sm flex items-center gap-2">
             <Settings2 className="w-4 h-4 text-rose-500" />
             Inspetor de Propriedades
           </h3>
        </div>

        <div className="bg-surface-card border border-border-subtle p-4 rounded-xl flex flex-col gap-2">
           <div className="flex justify-between items-center bg-black/20 p-2 rounded-lg">
             <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Campo</span>
             <span className="text-[11px] font-mono font-bold text-white bg-surface-input px-2 py-0.5 rounded">{selectedElement.field}</span>
           </div>
           
           <div className="flex flex-col gap-3 w-full">
              <div className="flex flex-col gap-2">
                <button
                   onClick={() => setSelectedElement({ slideIndex: selectedElement.slideIndex, field: null })}
                   className="cs-btn-ghost w-full py-3.5 rounded-xl shadow-lg border-border-hover border flex justify-center items-center gap-2 text-label-xs uppercase"
                >
                  <Settings2 className="w-4 h-4" />
                  Editar 
                </button>
                <p className="text-[9px] text-zinc-500 text-center font-bold tracking-tight px-2 leading-tight">
                  Clique acima para editar todos os conteúdos de texto deste slide simultaneamente.
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-border-subtle">
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-600 mb-3 block">Ações do Elemento</span>
                <div className="flex gap-2">
                   <button
                      onClick={() => {
                         const {slideIndex, field} = selectedElement;
                         const smartEl = document.getElementById(`smart-${slideIndex}-${field}`);
                         const textNode = smartEl?.querySelector('[contenteditable]');
                         if (!textNode) return;

                         const cloneId = `clone_${Date.now()}`;
                         const cloneData = {
                           id: cloneId,
                           sourceField: field,
                           type: textNode.tagName.toLowerCase(),
                           className: textNode.className.replace('outline-none', '').trim(),
                           style: {
                             fontSize: textNode.style.fontSize,
                             lineHeight: textNode.style.lineHeight,
                             letterSpacing: textNode.style.letterSpacing,
                             textTransform: textNode.style.textTransform,
                             fontFamily: window.getComputedStyle(textNode).fontFamily
                           }
                         };
                         
                         setSlides(prev => prev.map((s, i) => {
                             if(i !== slideIndex) return s;
                             const originalText = s[field] || textNode.innerText;
                             const originalPos = s.positions?.[field] || {};
                             
                             const slideCard = document.getElementById(`slide-card-${slideIndex}`);
                             let startX = 0;
                             let startY = 0;
                             
                             if (slideCard) {
                                 const slideRect = slideCard.getBoundingClientRect();
                                 const elRect = smartEl.getBoundingClientRect();
                                 const scaleFactor = slideRect.width / slideCard.offsetWidth;
                                 
                                 const unscaledW = smartEl.offsetWidth;
                                 const unscaledH = smartEl.offsetHeight;
                                 
                                 const unscaledCenterX = (elRect.left + elRect.width / 2 - slideRect.left) / scaleFactor;
                                 const unscaledCenterY = (elRect.top + elRect.height / 2 - slideRect.top) / scaleFactor;
                                 
                                 startX = unscaledCenterX - unscaledW / 2;
                                 startY = unscaledCenterY - unscaledH / 2;
                             }
                             
                             return {
                                ...s,
                                [cloneId]: originalText,
                                clonedFields: [...(s.clonedFields || []), cloneData],
                                positions: {
                                   ...(s.positions || {}),
                                   [cloneId]: { 
                                       ...originalPos, // keep color, italic, etc.
                                       rotation: (originalPos.rotation || 0),
                                       scale: (originalPos.scale || 1), 
                                       x: startX, 
                                       y: startY + 60
                                   }
                                }
                             };
                         }));
                         setTimeout(() => setSelectedElement({ slideIndex, field: cloneId }), 50);
                      }}
                      className="cs-btn-ghost flex-1 py-3.5 rounded-xl shadow-lg border-border-hover border flex justify-center items-center gap-2 text-label-xs uppercase"
                   >
                      <Copy className="w-4 h-4" /> Duplicar Camada
                   </button>
                   
                   {selectedElement.field && selectedElement.field.startsWith('clone_') && (
                       <button
                          onClick={() => {
                             const {slideIndex, field} = selectedElement;
                             setSlides(prev => prev.map((s, i) => {
                                 if (i !== slideIndex) return s;
                                 const newClonedFields = (s.clonedFields || []).filter(c => c.id !== field);
                                 const { [field]: textToRemove, ...restSlide } = s;
                                 const { [field]: posToRemove, ...restPositions } = s.positions || {};
                                 return {
                                     ...restSlide,
                                     clonedFields: newClonedFields,
                                     positions: restPositions
                                 };
                             }));
                             setSelectedElement({ slideIndex: selectedElement.slideIndex, field: null });
                          }}
                          className="px-4 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 rounded-xl transition-all flex items-center justify-center"
                          title="Remover Camada Clonada"
                       >
                          <Trash2 className="w-4 h-4" />
                       </button>
                   )}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border-subtle">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-600 block">Conteúdo</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={async () => {
                        if (!['titulo', 'texto_apoio', 'cta_text', 'citacao'].includes(selectedElement.field)) return;
                        // Simulação de chamada de IA ou uso da biblioteca como fallback rápido
                        const niche = 'confeitaria';
                        const options = CONTENT_LIBRARY[niche]?.[selectedElement.field] || [];
                        if (options.length > 0) {
                          const random = options[Math.floor(Math.random() * options.length)];
                          setSlides(prev => prev.map((s, i) => i === selectedElement.slideIndex ? {...s, [selectedElement.field]: random} : s));
                        }
                      }}
                      className="text-[9px] uppercase tracking-widest font-bold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20"
                    >
                      <Sparkles className="w-3 h-3" /> IA
                    </button>
                    <button 
                      onClick={() => setShowContentLib(!showContentLib)}
                      className={cn(
                        "text-[9px] uppercase tracking-widest font-bold transition-colors flex items-center gap-1 px-2 py-0.5 rounded border",
                        showContentLib 
                          ? "text-white bg-rose-500 border-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.3)]" 
                          : "text-rose-400 hover:text-rose-300 bg-rose-500/10 border-rose-500/20"
                      )}
                    >
                      <LayoutTemplate className="w-3 h-3" /> Lib
                    </button>
                    <button 
                       onClick={() => setSelectedElement({ slideIndex: selectedElement.slideIndex, field: null })}
                       className="text-[9px] uppercase tracking-widest font-bold text-zinc-400 hover:text-white transition-colors"
                    >
                       Ver Tudo
                    </button>
                  </div>
                </div>
                <textarea 
                  value={slide[selectedElement.field] || ''}
                  disabled={!['titulo', 'texto_apoio', 'citacao', 'autor', 'dado_destaque', 'contexto_dado', 'slide_call', 'insta_ready', 'cta_text', 'cta_button', 'badge_text', 'studio_text'].includes(selectedElement.field)}
                  onChange={(e) => {
                    setSlides(prev => prev.map((s, i) => i === selectedElement.slideIndex ? {...s, [selectedElement.field]: e.target.value} : s));
                  }}
                  className={cn(
                    'cs-textarea min-h-20 w-full p-3 font-outfit text-sm text-white',
                    !['titulo', 'texto_apoio', 'citacao', 'autor', 'dado_destaque', 'contexto_dado', 'slide_call', 'insta_ready', 'cta_text', 'cta_button', 'badge_text', 'studio_text'].includes(selectedElement.field) && 'opacity-50 cursor-not-allowed'
                  )}
                  placeholder={!['titulo', 'texto_apoio', 'citacao', 'autor', 'dado_destaque', 'contexto_dado', 'slide_call', 'insta_ready', 'cta_text', 'cta_button', 'badge_text', 'studio_text'].includes(selectedElement.field) ? 'Esse texto não é editável textualmente por aqui.' : 'Insira o texto...'}
                />

                {showContentLib && (
                  <div className="bg-zinc-950 border border-rose-500/20 rounded-xl p-4 mt-3 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[9px] uppercase font-black tracking-widest text-white/40">Biblioteca de Sugestões</span>
                      <select 
                        value={activeNiche}
                        onChange={(e) => setActiveNiche(e.target.value)}
                        className="bg-surface-input text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-white/5 outline-none text-rose-400"
                      >
                        {Object.keys(CONTENT_LIBRARY).map(key => (
                          <option key={key} value={key}>{CONTENT_LIBRARY[key].name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="max-h-[200px] overflow-y-auto custom-scrollbar flex flex-col gap-2 pr-1">
                      {(CONTENT_LIBRARY[activeNiche]?.[selectedElement.field] || []).map((phrase, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setSlides(prev => prev.map((s, idx) => idx === selectedElement.slideIndex ? {...s, [selectedElement.field]: phrase} : s));
                            setShowContentLib(false);
                          }}
                          className="text-left p-3 rounded-lg bg-surface-input/50 hover:bg-surface-input border border-white/5 hover:border-rose-500/30 transition-all group"
                        >
                          <p className="text-[11px] text-zinc-400 group-hover:text-white line-clamp-3 leading-relaxed">
                            {phrase}
                          </p>
                        </button>
                      ))}
                      {(!(CONTENT_LIBRARY[activeNiche]?.[selectedElement.field]) || CONTENT_LIBRARY[activeNiche][selectedElement.field].length === 0) && (
                        <div className="py-8 text-center">
                          <p className="text-[9px] text-zinc-600 uppercase font-black tracking-widest opacity-50">
                            Nenhuma frase disponível para "{selectedElement.field}" neste nicho.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-surface-input px-3 py-2 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">Posição X</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateProp('x', 0)}
                      title="Resetar X"
                      className="w-5 h-5 flex items-center justify-center bg-surface-input/50 hover:bg-rose-500/20 rounded text-zinc-600 hover:text-rose-400 transition-colors select-none active:scale-90"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                    <button 
                      onMouseDown={() => startAutoScroll('x', -1)}
                      onTouchStart={() => startAutoScroll('x', -1)}
                      className="w-5 h-5 flex items-center justify-center bg-surface-input/50 hover:bg-surface-input rounded text-zinc-400 hover:text-white transition-colors text-[10px] font-bold select-none active:scale-90"
                    >
                      -
                    </button>
                    <input 
                      id="config-pos-x"
                      type="number" 
                      step="1"
                      value={Math.round(pos?.x || 0)}
                      onChange={(e) => updateProp('x', Number(e.target.value))}
                      className="w-10 bg-transparent text-white font-mono text-xs outline-none text-center"
                    />
                    <button 
                      onMouseDown={() => startAutoScroll('x', 1)}
                      onTouchStart={() => startAutoScroll('x', 1)}
                      className="w-5 h-5 flex items-center justify-center bg-surface-input/50 hover:bg-surface-input rounded text-zinc-400 hover:text-white transition-colors text-[10px] font-bold select-none active:scale-90"
                    >
                      +
                    </button>
                  </div>
                </div>
                  <input 
                    type="range"
                    min="-200"
                    max="200"
                    step="any"
                    value={pos?.x || 0}
                    onChange={(e) => updateProp('x', Math.round(parseFloat(e.target.value)))}
                    className="cs-range w-full"
                  />
              </div>

              <div className="bg-surface-input px-3 py-2 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">Posição Y</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateProp('y', 0)}
                      title="Resetar Y"
                      className="w-5 h-5 flex items-center justify-center bg-surface-input/50 hover:bg-rose-500/20 rounded text-zinc-600 hover:text-rose-400 transition-colors select-none active:scale-90"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                    <button 
                      onMouseDown={() => startAutoScroll('y', -1)}
                      onTouchStart={() => startAutoScroll('y', -1)}
                      className="w-5 h-5 flex items-center justify-center bg-surface-input/50 hover:bg-surface-input rounded text-zinc-400 hover:text-white transition-colors text-[10px] font-bold select-none active:scale-90"
                    >
                      -
                    </button>
                    <input 
                      id="config-pos-y"
                      type="number" 
                      step="1"
                      value={Math.round(pos?.y || 0)}
                      onChange={(e) => updateProp('y', Number(e.target.value))}
                      className="w-10 bg-transparent text-white font-mono text-xs outline-none text-center"
                    />
                    <button 
                      onMouseDown={() => startAutoScroll('y', 1)}
                      onTouchStart={() => startAutoScroll('y', 1)}
                      className="w-5 h-5 flex items-center justify-center bg-surface-input/50 hover:bg-surface-input rounded text-zinc-400 hover:text-white transition-colors text-[10px] font-bold select-none active:scale-90"
                    >
                      +
                    </button>
                  </div>
                </div>
                  <input 
                    type="range"
                    min="-200"
                    max="200"
                    step="any"
                    value={pos?.y || 0}
                    onChange={(e) => updateProp('y', Math.round(parseFloat(e.target.value)))}
                    className="cs-range w-full"
                  />
              </div>

              <div className="bg-surface-input px-3 py-2 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                   <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">Tamanho do Texto</span>
                   <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateProp('scale', 1)}
                        title="Resetar Tamanho"
                        className="w-5 h-5 flex items-center justify-center bg-surface-input/50 hover:bg-rose-500/20 rounded text-zinc-600 hover:text-rose-400 transition-colors select-none active:scale-90"
                      >
                        <RotateCcw className="w-3 h-3" />
                      </button>
                      <button 
                        onMouseDown={() => startAutoScroll('scale', -0.01)}
                        onTouchStart={() => startAutoScroll('scale', -0.01)}
                        className="w-5 h-5 flex items-center justify-center bg-surface-input/50 hover:bg-surface-input rounded text-zinc-400 hover:text-white transition-colors text-[10px] font-bold select-none active:scale-90"
                      >
                        -
                      </button>
                      <span className="text-[10px] font-mono text-zinc-200 min-w-[40px] text-center">
                        {pos.scale?.toFixed(2)}x
                      </span>
                      <button 
                        onMouseDown={() => startAutoScroll('scale', 0.01)}
                        onTouchStart={() => startAutoScroll('scale', 0.01)}
                        className="w-5 h-5 flex items-center justify-center bg-surface-input/50 hover:bg-surface-input rounded text-zinc-400 hover:text-white transition-colors text-[10px] font-bold select-none active:scale-90"
                      >
                        +
                      </button>
                   </div>
                </div>
                <input
                   type="range"
                   min="0.3"
                   max="5"
                   step="any"
                   value={pos.scale || 1}
                   onChange={(e) => updateProp('scale', parseFloat(e.target.value))}
                   className="cs-range w-full"
                />
              </div>

              {selectedElement.field === 'logo' && (
                <div className="bg-surface-input px-3 py-2 rounded-lg space-y-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">Transparência</span>
                    <span className="text-[10px] font-mono text-zinc-200">
                      {Math.round((pos.opacity ?? 1) * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={pos.opacity ?? 1}
                    onChange={(e) => updateProp('opacity', parseFloat(e.target.value))}
                    className="cs-range w-full"
                  />
                </div>
              )}

              {(() => {
                const isSpecialElement = selectedElement.field === 'handle' || selectedElement.field === 'counter' || selectedElement.field === 'logo';
                return (
                  <div className={cn('mt-2 flex', isSpecialElement && 'gap-2')}>
                    {/* Direcional Minimalista */}
                    <div className={cn('bg-surface-input px-2 py-4 rounded-lg flex flex-col items-center justify-center space-y-3', isSpecialElement ? 'flex-1' : 'w-full')}>
                      <div className="flex items-center justify-between w-full px-1">
                        <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-600">{isSpecialElement ? 'Direcional' : 'Direcional Minimalista'}</span>
                        <button
                          onClick={() => { updateProp('x', 0); updateProp('y', 0); updateProp('scale', 1); }}
                          title="Resetar posição e tamanho"
                          className="w-5 h-5 flex items-center justify-center bg-surface-input/50 hover:bg-rose-500/20 rounded text-zinc-600 hover:text-rose-400 transition-colors select-none active:scale-90"
                        >
                          <RotateCcw className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-1 w-fit">
                         <div />
                         <button 
                           onMouseDown={() => startAutoScroll('y', -1)} 
                           onTouchStart={() => startAutoScroll('y', -1)}
                           className="w-8 h-8 flex justify-center items-center rounded-t-lg active:scale-95 transition-all outline-none border border-white/20 pb-0.5 hover:brightness-110 opacity-90 hover:opacity-100 shadow-md"
                           style={{ backgroundColor: gradientColor1 }}
                         >
                           <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[6px] border-transparent border-b-white/90" />
                         </button>
                         <div />
                         
                         <button 
                           onMouseDown={() => startAutoScroll('x', -1)} 
                           onTouchStart={() => startAutoScroll('x', -1)}
                           className="w-8 h-8 flex justify-center items-center rounded-l-lg active:scale-95 transition-all outline-none border border-white/20 pr-0.5 hover:brightness-110 opacity-90 hover:opacity-100 shadow-md"
                           style={{ backgroundColor: gradientColor1 }}
                         >
                           <div className="w-0 h-0 border-t-[5px] border-b-[5px] border-r-[6px] border-transparent border-r-white/90" />
                         </button>
                         <div className="w-8 h-8 bg-zinc-950 rounded-sm border border-white/10 flex items-center justify-center shadow-inner">
                           <div className="w-2.5 h-2.5 rounded-full bg-zinc-800/80 shadow" />
                         </div>
                         <button 
                           onMouseDown={() => startAutoScroll('x', 1)} 
                           onTouchStart={() => startAutoScroll('x', 1)}
                           className="w-8 h-8 flex justify-center items-center rounded-r-lg active:scale-95 transition-all outline-none border border-white/20 pl-0.5 hover:brightness-110 opacity-90 hover:opacity-100 shadow-md"
                           style={{ backgroundColor: gradientColor1 }}
                         >
                           <div className="w-0 h-0 border-t-[5px] border-b-[5px] border-l-[6px] border-transparent border-l-white/90" />
                         </button>
                         
                         <div />
                         <button 
                           onMouseDown={() => startAutoScroll('y', 1)} 
                           onTouchStart={() => startAutoScroll('y', 1)}
                           className="w-8 h-8 flex justify-center items-center rounded-b-lg active:scale-95 transition-all outline-none border border-white/20 pt-0.5 hover:brightness-110 opacity-90 hover:opacity-100 shadow-md"
                           style={{ backgroundColor: gradientColor1 }}
                         >
                           <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-transparent border-t-white/90" />
                         </button>
                         <div />
                      </div>
                    </div>

                    {/* Controle Grid 3x3 (apenas para Handle, Counter e Logo) */}
                    {isSpecialElement && (
                      <div className="flex flex-col gap-2 flex-1">
                        <div className="bg-surface-input px-3 py-3 rounded-lg flex items-center justify-between">
                           <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-600">
                             Visibilidade Local
                           </span>
                           <button
                             role="switch"
                             aria-checked={!slide[selectedElement.field === 'handle' ? 'hideHandle' : selectedElement.field === 'counter' ? 'hideCounter' : 'hideLogo']}
                             onClick={() => {
                               const key = selectedElement.field === 'handle' ? 'hideHandle' : selectedElement.field === 'counter' ? 'hideCounter' : 'hideLogo';
                               setSlides(prev => prev.map((s, i) => i === selectedElement.slideIndex ? { ...s, [key]: !s[key] } : s));
                             }}
                             className={cn(
                                'relative inline-flex h-[18px] w-[34px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-150 ease-in-out focus:outline-none',
                                !slide[selectedElement.field === 'handle' ? 'hideHandle' : selectedElement.field === 'counter' ? 'hideCounter' : 'hideLogo'] ? 'bg-[color:var(--toggle-active)]' : 'bg-zinc-700'
                              )}
                              style={{ '--toggle-active': gradientColor1 }}
                           >
                             <span
                               className={cn(
                                 'pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-none ring-0 transition duration-150 ease-in-out',
                                 !slide[selectedElement.field === 'handle' ? 'hideHandle' : selectedElement.field === 'counter' ? 'hideCounter' : 'hideLogo'] ? 'translate-x-4' : 'translate-x-0'
                               )}
                             />
                           </button>
                        </div>

                        <div className="bg-zinc-900 px-2 py-4 rounded-lg flex flex-col items-center justify-center space-y-3">
                          <div className="flex items-center justify-between w-full px-1">
                            <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-600">Posição</span>
                          </div>
                          <div className="grid grid-cols-3 gap-1 w-fit">
                            {[
                              'top-left', 'top-center', 'top-right',
                              'center-left', 'center-center', 'center-right',
                              'bottom-left', 'bottom-center', 'bottom-right'
                            ].map(alignKey => {
                              const defaultAlignMap = { handle: 'top-left', counter: 'top-right', logo: 'top-center' };
                              const currentAlign = pos.align || defaultAlignMap[selectedElement.field] || 'top-left';
                              const isActive = currentAlign === alignKey;
                              return (
                                <button
                                  key={alignKey}
                                  onClick={() => updateProp('align', alignKey)}
                                  className={cn(
                                    'w-8 h-8 rounded-lg flex justify-center items-center transition-all outline-none',
                                    isActive
                                      ? 'border border-opacity-50 shadow-[0_0_15px_rgba(0,0,0,0.3)]'
                                      : 'bg-zinc-900/50 border border-transparent hover:bg-zinc-900'
                                  )}
                                  style={isActive ? { borderColor: gradientColor1, backgroundColor: `${gradientColor1}15` } : {}}
                                >
                                  <div 
                                    className={cn('w-1.5 h-1.5 rounded-full', isActive ? 'shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'bg-zinc-600')}
                                    style={isActive ? { backgroundColor: gradientColor1 } : {}}
                                  />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
           </div>

           <div className="mt-4 pt-4 border-t border-border-subtle">
             <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-600 mb-3 block">Formatação de Texto</span>
             
             <div className="flex gap-2 mb-4">
                <button 
                  onMouseDown={(e) => { e.preventDefault(); saveSelection(); }}
                  onClick={() => applyRichFormat('bold', () => updateProp('bold', !pos.bold))}
                  className={cn('flex-1 py-2 rounded flex justify-center items-center transition-all border', pos.bold ? 'bg-surface-input border-white/20 text-white' : 'bg-surface-input border-transparent text-zinc-500 hover:text-zinc-300')}
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button 
                  onMouseDown={(e) => { e.preventDefault(); saveSelection(); }}
                  onClick={() => applyRichFormat('italic', () => updateProp('italic', !pos.italic))}
                  className={cn('flex-1 py-2 rounded flex justify-center items-center transition-all border', pos.italic ? 'bg-surface-input border-white/20 text-white' : 'bg-surface-input border-transparent text-zinc-500 hover:text-zinc-300')}
                >
                  <Italic className="w-4 h-4" />
                </button>
                <button 
                  onMouseDown={(e) => { e.preventDefault(); saveSelection(); }}
                  onClick={() => applyRichFormat('underline', () => updateProp('underline', !pos.underline))}
                  className={cn('flex-1 py-2 rounded flex justify-center items-center transition-all border', pos.underline ? 'bg-surface-input border-white/20 text-white' : 'bg-surface-input border-transparent text-zinc-500 hover:text-zinc-300')}
                >
                  <Underline className="w-4 h-4" />
                </button>
                <button 
                  onMouseDown={(e) => { e.preventDefault(); saveSelection(); }}
                  onClick={() => applyRichFormat('strikeThrough', () => updateProp('uppercase', !pos.uppercase))}
                  className={cn('flex-1 py-2 rounded flex justify-center items-center transition-all border', pos.uppercase ? 'bg-surface-input border-white/20 text-white' : 'bg-surface-input border-transparent text-zinc-500 hover:text-zinc-300')}
                >
                  <Type className="w-4 h-4" />
                </button>
             </div>

             <div className="flex gap-2 mb-4 bg-surface-input p-1 rounded-lg">
                {['left', 'center', 'right', 'justify'].map(align => (
                  <button 
                    key={align}
                    onClick={() => updateProp('align', align)}
                    className={cn('flex-1 py-1.5 rounded flex justify-center items-center transition-all', pos.align === align || (!pos.align && align === 'left') ? 'bg-zinc-700 text-white shadow' : 'text-zinc-500 hover:text-zinc-300')}
                  >
                    {align === 'left' && <AlignLeft className="w-3.5 h-3.5" />}
                    {align === 'center' && <AlignCenter className="w-3.5 h-3.5" />}
                    {align === 'right' && <AlignRight className="w-3.5 h-3.5" />}
                    {align === 'justify' && <AlignJustify className="w-3.5 h-3.5" />}
                  </button>
                ))}
             </div>

              {/* Cor do Texto Selecionado — abaixo do alinhamento, acima de Cor do Texto */}
              <div className="mb-3">
                <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-600 block mb-2">Cor do Texto Selecionado</label>
                <div className="relative flex items-center bg-surface-input rounded p-1 gap-1">
                  <label
                    className="flex-shrink-0 cursor-pointer"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      const sel = window.getSelection();
                      if (sel && sel.rangeCount > 0 && !sel.isCollapsed) {
                        savedSelection.current = sel.getRangeAt(0).cloneRange();
                      }
                    }}
                    onClick={() => selectionColorInputRef.current?.click()}
                  >
                    <input
                      ref={selectionColorInputRef}
                      type="color"
                      value={selectionColor || '#ffffff'}
                      onChange={(e) => {
                        setSelectionColor(e.target.value);
                        const saved = savedSelection.current;
                        if (saved) {
                          const sel = window.getSelection();
                          sel.removeAllRanges();
                          sel.addRange(saved);
                          document.execCommand('styleWithCSS', false, true);
                          document.execCommand('foreColor', false, e.target.value);
                          const updated = window.getSelection();
                          if (updated && updated.rangeCount > 0 && !updated.isCollapsed) {
                            savedSelection.current = updated.getRangeAt(0).cloneRange();
                          }
                        }
                      }}
                      className="absolute w-0 h-0 opacity-0 pointer-events-none"
                    />
                    <span
                      className="inline-block w-4 h-4 rounded-sm border border-white/20 shadow-sm"
                      style={{ backgroundColor: selectionColor || '#ffffff' }}
                    />
                  </label>
                  <input
                    type="text"
                    value={selectionColor}
                    placeholder="No slide, dê duplo clique e selecione a palavra"
                    onChange={(e) => {
                      setSelectionColor(e.target.value);
                      if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) {
                        const saved = savedSelection.current;
                        if (saved) {
                          const sel = window.getSelection();
                          sel.removeAllRanges();
                          sel.addRange(saved);
                          document.execCommand('styleWithCSS', false, true);
                          document.execCommand('foreColor', false, e.target.value);
                          const updated = window.getSelection();
                          if (updated && updated.rangeCount > 0 && !updated.isCollapsed) {
                            savedSelection.current = updated.getRangeAt(0).cloneRange();
                          }
                        }
                      }
                    }}
                    className="flex-1 bg-transparent text-xs font-mono text-zinc-300 px-1 outline-none uppercase"
                  />
                </div>
              </div>

             <div className="grid grid-cols-2 gap-3">
               <div>
                    <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-600 block mb-2 flex justify-between">
                      <span className="flex items-center gap-1.5">
                        <input
                          type="color"
                          value={pos.color || '#ffffff'}
                          onChange={(e) => updateProp('color', e.target.value)}
                          className="w-3 h-3 rounded-sm cursor-pointer border-0 p-0 bg-transparent block"
                          title="Escolher cor"
                        />
                        Cor do Texto
                      </span>
                    </label>
                  <div className="relative flex items-center bg-surface-input rounded p-1 gap-1">
                    <label className="flex-shrink-0 cursor-pointer">
                      <input
                        type="color"
                        value={pos.color || '#ffffff'}
                        onChange={(e) => updateProp('color', e.target.value)}
                        className="absolute w-0 h-0 opacity-0 pointer-events-none"
                      />
                      <span
                        className="inline-block w-4 h-4 rounded-sm border border-white/20 shadow-sm"
                        style={{ backgroundColor: pos.color || '#ffffff' }}
                      />
                    </label>
                    <input 
                      type="text" 
                      value={pos.color || ''}
                      placeholder="#FFF"
                      onChange={(e) => updateProp('color', e.target.value)}
                      className="flex-1 bg-transparent text-xs font-mono text-zinc-300 px-1 outline-none uppercase"
                    />
                    {pos.color && (
                      <button
                        onClick={() => updateProp('color', undefined)}
                        title="Resetar cor do texto"
                        className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-zinc-700 hover:bg-rose-500 border border-black/40 rounded-full flex items-center justify-center text-white shadow transition-colors z-10"
                      >
                        <X className="w-2 h-2" />
                      </button>
                    )}
                  </div>
               </div>
               <div>
                    <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-600 block mb-2 flex justify-between">
                      <span className="flex items-center gap-1.5">
                        <input
                          type="color"
                          value={pos.bgColor || '#000000'}
                          onChange={(e) => updateProp('bgColor', e.target.value)}
                          className="w-3 h-3 rounded-sm cursor-pointer border-0 p-0 bg-transparent block"
                          title="Escolher cor"
                        />
                        Cor do Fundo
                      </span>
                    </label>
                  <div className="relative flex items-center bg-surface-input rounded p-1 gap-1">
                    <label className="flex-shrink-0 cursor-pointer">
                      <input
                        type="color"
                        value={pos.bgColor || '#000000'}
                        onChange={(e) => updateProp('bgColor', e.target.value)}
                        className="absolute w-0 h-0 opacity-0 pointer-events-none"
                      />
                      <span
                        className="inline-block w-4 h-4 rounded-sm border border-white/20 shadow-sm"
                        style={{ backgroundColor: pos.bgColor || '#000000' }}
                      />
                    </label>
                    <input 
                      type="text" 
                      value={pos.bgColor || ''}
                      placeholder="Nenhum"
                      onChange={(e) => updateProp('bgColor', e.target.value)}
                      className="flex-1 bg-transparent text-xs font-mono text-zinc-300 px-1 outline-none uppercase"
                    />
                    {pos.bgColor && (
                      <button
                        onClick={() => updateProp('bgColor', undefined)}
                        title="Resetar cor do fundo"
                        className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-zinc-700 hover:bg-rose-500 border border-black/40 rounded-full flex items-center justify-center text-white shadow transition-colors z-10"
                      >
                        <X className="w-2 h-2" />
                      </button>
                    )}
                  </div>
               </div>
             </div>

              <div className="space-y-3 mt-4">
                <div className="bg-surface-input px-3 py-2 rounded-lg space-y-2">
                  <div className="flex justify-between items-center">
                     <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">Entrelinhas</span>
                     <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateProp('lineHeight', undefined)}
                          title="Resetar"
                          className="w-5 h-5 flex items-center justify-center bg-surface-input hover:bg-rose-500/20 rounded text-zinc-600 hover:text-rose-400 transition-colors select-none active:scale-90"
                        >
                          <RotateCcw className="w-3 h-3" />
                        </button>
                        <button 
                          onMouseDown={() => startAutoScroll('lineHeight', -0.05)}
                          onTouchStart={() => startAutoScroll('lineHeight', -0.05)}
                          className="w-5 h-5 flex items-center justify-center bg-surface-input hover:bg-surface-input/50 rounded text-zinc-400 hover:text-white transition-colors text-[10px] font-bold select-none active:scale-90"
                        >
                          -
                        </button>
                        <span className="text-[10px] font-mono text-zinc-200 min-w-[40px] text-center">
                          {(pos.lineHeight !== undefined ? pos.lineHeight : 1.0).toFixed(2)}x
                        </span>
                        <button 
                          onMouseDown={() => startAutoScroll('lineHeight', 0.05)}
                          onTouchStart={() => startAutoScroll('lineHeight', 0.05)}
                          className="w-5 h-5 flex items-center justify-center bg-surface-input hover:bg-surface-input/50 rounded text-zinc-400 hover:text-white transition-colors text-[10px] font-bold select-none active:scale-90"
                        >
                          +
                        </button>
                     </div>
                  </div>
                  <input
                     type="range"
                     min="0.5"
                     max="2.5"
                     step="any"
                     value={pos.lineHeight !== undefined ? pos.lineHeight : 1.0}
                     onChange={(e) => updateProp('lineHeight', parseFloat(e.target.value))}
                     className="cs-range w-full"
                  />
                </div>

                <div className="bg-surface-input px-3 py-2 rounded-lg space-y-2">
                  <div className="flex justify-between items-center">
                     <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">Espaçamento Letras</span>
                     <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateProp('letterSpacing', 0)}
                          title="Resetar"
                          className="w-5 h-5 flex items-center justify-center bg-surface-input/50 hover:bg-rose-500/20 rounded text-zinc-600 hover:text-rose-400 transition-colors select-none active:scale-90"
                        >
                          <RotateCcw className="w-3 h-3" />
                        </button>
                        <button 
                          onMouseDown={() => startAutoScroll('letterSpacing', -0.5)}
                          onTouchStart={() => startAutoScroll('letterSpacing', -0.5)}
                          className="w-5 h-5 flex items-center justify-center bg-surface-input/50 hover:bg-surface-input rounded text-zinc-400 hover:text-white transition-colors text-[10px] font-bold select-none active:scale-90"
                        >
                          -
                        </button>
                        <span className="text-[10px] font-mono text-zinc-200 min-w-[40px] text-center">
                          {(pos.letterSpacing || 0).toFixed(1)}
                        </span>
                        <button 
                          onMouseDown={() => startAutoScroll('letterSpacing', 0.5)}
                          onTouchStart={() => startAutoScroll('letterSpacing', 0.5)}
                          className="w-5 h-5 flex items-center justify-center bg-surface-input/50 hover:bg-surface-input rounded text-zinc-400 hover:text-white transition-colors text-[10px] font-bold select-none active:scale-90"
                        >
                          +
                        </button>
                     </div>
                  </div>
                  <input
                     type="range"
                     min="-10"
                     max="50"
                     step="any"
                     value={pos.letterSpacing || 0}
                     onChange={(e) => updateProp('letterSpacing', parseFloat(e.target.value))}
                     className="cs-range w-full"
                  />
                </div>
              </div>
            </div>

        </div>
      </aside>
    );
  }
  return (
    <div className="flex h-full cs-sidebar-resizable border-r border-white/5 bg-black/95 z-40 relative" style={{ '--sidebar-width': `${width}px`, width: `${width}px` }}>
      
      {/* Content Panel */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Horizontal Tabs (Premium) */}
        <div className="flex items-center gap-1 p-2 bg-surface-dark/40 border-b border-white/5 shrink-0">
          {[
            { id: 'ajustes', label: 'Direção', icon: Settings2 },
            { id: 'designs', label: 'Designs', icon: LayoutTemplate },
            { id: 'autopost', label: 'Post', icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl outline-none ring-0 border-none transition-none',
                  isActive
                    ? 'bg-zinc-900 text-white border'
                    : 'text-white/30 hover:text-white/60 hover:bg-zinc-900/80'
                )}
                style={isActive ? { borderColor: `${gradientColor1}40` } : {}}
              >
                <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div 
          id="sidebar-scroll-container"
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8"
        >
          {activeTab === 'ajustes' && (
            <>
              {/* === Section: CS Setup === */}
              <h3 className="text-[10px] font-black tracking-[0.3em] uppercase text-white/20 flex items-center gap-2 mb-2">
                <Settings2 className="w-3.5 h-3.5" style={{ color: gradientColor1 }} />
                Direção Criativa
              </h3>

              <CollapsibleSection title="IDENTIDADE VISUAL">
                {/* Handle + Verified + Counter */}
                <div className="flex flex-col gap-5">
                  <div>
                    <label className="text-[10px] font-bold tracking-widest text-white/40 uppercase mb-2 block">Handle (Arroba)</label>
                    <div className="flex gap-3 w-full">
                      {/* Avatar Uploader com botão limpar */}
                      <div className="relative shrink-0">
                        <label className="w-12 h-12 bg-surface-input border border-white/5 rounded-xl flex items-center justify-center cursor-pointer hover:border-white/20 transition-all relative overflow-hidden group block">
                          {brandAvatar ? (
                            <img src={brandAvatar} alt="Avatar" className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="w-5 h-5 text-white/20" />
                          )}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <Upload className="w-4 h-4 text-white" />
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (ev) => setBrandAvatar(ev.target.result);
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                        {brandAvatar && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setBrandAvatar(null);
                            }}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 border border-black/50 rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110 z-10"
                            style={{ backgroundColor: gradientColor1 }}
                            title="Remover foto"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                      
                      <input
                        type="text"
                        value={brandHandle}
                        onChange={(e) => setBrandHandle(e.target.value)}
                        className="cs-input flex-1 min-w-0 !rounded-xl !border-white/5 !bg-surface-input"
                        placeholder="@seuhandle"
                      />
                      <button
                        onClick={() => setShowBrandHandle(!showBrandHandle)}
                        className={cn(
                          'h-[48px] px-4 rounded-xl border text-[10px] uppercase tracking-widest font-black transition-all flex items-center justify-center shrink-0',
                          showBrandHandle
                            ? 'bg-surface-input border-white/10 text-white'
                            : 'bg-surface-input/30 border-white/5 text-white/20'
                        )}
                        style={
                          showBrandHandle
                            ? {
                                backgroundColor: `${gradientColor1}15`,
                                borderColor: `${gradientColor1}30`,
                                color: gradientColor1,
                              }
                            : {}
                        }
                      >
                        {showBrandHandle ? 'ON' : 'OFF'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold tracking-widest text-white/40 uppercase mb-2 block">Logo Automática</label>
                    <div className="flex gap-3 w-full">
                      {/* Logo Uploader com botão limpar */}
                      <div className="relative shrink-0">
                        <label className="w-12 h-12 bg-surface-input border border-white/5 rounded-xl flex items-center justify-center cursor-pointer hover:border-white/20 transition-all relative overflow-hidden group block">
                          {brandLogo ? (
                            <img src={brandLogo} alt="Logo" className="w-full h-full object-contain p-1" />
                          ) : (
                            <ImageIcon className="w-5 h-5 text-white/20" />
                          )}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <Upload className="w-4 h-4 text-white" />
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (ev) => setBrandLogo(ev.target.result);
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                        {brandLogo && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setBrandLogo(null);
                            }}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 border border-black/50 rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110 z-10"
                            style={{ backgroundColor: gradientColor1 }}
                            title="Remover logo"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0 bg-surface-input rounded-xl border border-white/5 p-3 flex items-center">
                         <span className="text-[10px] text-white/20 uppercase font-black tracking-widest truncate">
                           {brandLogo ? 'Logo Carregada' : 'Adicione sua logo'}
                         </span>
                      </div>

                      <button
                        onClick={() => setShowBrandLogo(!showBrandLogo)}
                        className={cn(
                          'h-[48px] px-4 rounded-xl border text-[10px] uppercase tracking-widest font-black transition-all flex items-center justify-center shrink-0',
                          showBrandLogo
                            ? 'bg-surface-input border-white/10 text-white'
                            : 'bg-surface-input/30 border-white/5 text-white/20'
                        )}
                        style={
                          showBrandLogo
                            ? {
                                backgroundColor: `${gradientColor1}15`,
                                borderColor: `${gradientColor1}30`,
                                color: gradientColor1,
                              }
                            : {}
                        }
                      >
                        {showBrandLogo ? 'ON' : 'OFF'}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[1.1rem]">
                    {/* Selo Verificado */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 flex items-center gap-1.5">
                        <BadgeCheck className="w-3.5 h-3.5" />
                        Selo Verificado
                      </span>
                      <button
                        role="switch"
                        aria-checked={isVerified}
                        onClick={() => setIsVerified(!isVerified)}
                        className={cn(
                          'relative inline-flex h-[18px] w-[34px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-150 ease-in-out focus:outline-none',
                          isVerified ? 'bg-[color:var(--toggle-active)]' : 'bg-zinc-700'
                        )}
                        style={{ '--toggle-active': gradientColor1 }}
                      >
                        <span
                          className={cn(
                            'pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-none ring-0 transition duration-150 ease-in-out',
                            isVerified ? 'translate-x-4' : 'translate-x-0'
                          )}
                        />
                      </button>
                    </div>

                    {/* Contador */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">
                        Contador
                      </span>
                      <button
                        role="switch"
                        aria-checked={showSlideCounter}
                        onClick={() => setShowSlideCounter(!showSlideCounter)}
                        className={cn(
                          'relative inline-flex h-[18px] w-[34px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-150 ease-in-out focus:outline-none',
                          showSlideCounter ? 'bg-[color:var(--toggle-active)]' : 'bg-zinc-700'
                        )}
                        style={{ '--toggle-active': gradientColor1 }}
                      >
                        <span
                          className={cn(
                            'pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-none ring-0 transition duration-150 ease-in-out',
                            showSlideCounter ? 'translate-x-4' : 'translate-x-0'
                          )}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Fontes em linha única */}
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[8px] uppercase font-bold tracking-widest text-zinc-600 mb-1 block">Título</label>
                    <select
                      value={titleFont}
                      onChange={(e) => setTitleFont(e.target.value)}
                      className="cs-input text-[10px] py-[0.675rem] w-full px-2"
                    >
                      {FONT_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[8px] uppercase font-bold tracking-widest text-zinc-600 mb-1 block">Corpo</label>
                    <select
                      value={textFont}
                      onChange={(e) => setTextFont(e.target.value)}
                      className="cs-input text-[10px] py-[0.675rem] w-full px-2"
                    >
                      {FONT_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[8px] uppercase font-bold tracking-widest text-zinc-600 mb-1 block">Tag</label>
                    <select
                      value={tagFont}
                      onChange={(e) => setTagFont(e.target.value)}
                      className="cs-input text-[10px] py-[0.675rem] w-full px-2"
                    >
                      {FONT_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                </div>
              </CollapsibleSection>

              <CollapsibleSection title="TAMANHO TÍTULO A BORDAS" defaultOpen={false}>
                {/* Scale: Título */}
                <div>
                  <label className="cs-label flex items-center justify-between w-full">
                    <span>Tamanho Título: {titleSizeScale}%</span>
                    <div className="group relative cursor-help">
                      <Info className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                      <div className="absolute bottom-full mb-1.5 right-0 hidden group-hover:block w-48 bg-black/95 border border-white/10 shadow-xl text-zinc-300 text-[10px] p-2 rounded-lg z-[60] normal-case tracking-normal font-normal">
                        Ajusta globalmente o tamanho das fontes dos títulos principais dos slides.
                      </div>
                    </div>
                  </label>
                  <input
                    type="range"
                    min={FONT_SCALE_RANGE.min}
                    max={FONT_SCALE_RANGE.max}
                    value={titleSizeScale}
                    onChange={(e) => setTitleSizeScale(e.target.value)}
                    className="cs-range w-full"
                  />
                </div>

                {/* Scale: Texto */}
                <div>
                  <label className="cs-label flex items-center justify-between w-full">
                    <span>Tamanho Texto: {textSizeScale}%</span>
                    <div className="group relative cursor-help">
                      <Info className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                      <div className="absolute bottom-full mb-1.5 right-0 hidden group-hover:block w-48 bg-black/95 border border-white/10 shadow-xl text-zinc-300 text-[10px] p-2 rounded-lg z-[60] normal-case tracking-normal font-normal">
                        Define a proporção de tamanho de fontes para os textos de apoio e parágrafos.
                      </div>
                    </div>
                  </label>
                  <input
                    type="range"
                    min={FONT_SCALE_RANGE.min}
                    max={FONT_SCALE_RANGE.max}
                    value={textSizeScale}
                    onChange={(e) => setTextSizeScale(e.target.value)}
                    className="cs-range w-full"
                  />
                </div>

                {/* Scale: Border Radius */}
                <div>
                  <label className="cs-label flex items-center justify-between w-full">
                    <span>Bordas do Card: {cardBorderRadius}px</span>
                    <div className="group relative cursor-help">
                      <Info className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                      <div className="absolute bottom-full mb-1.5 right-0 hidden group-hover:block w-52 bg-black/95 border border-white/10 shadow-xl text-zinc-300 text-[10px] p-2 rounded-lg z-[60] normal-case tracking-normal font-normal">
                        Arredondamento dos cantos externos do formato do carrossel e shapes de fundo.
                      </div>
                    </div>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    value={cardBorderRadius}
                    onChange={(e) => setCardBorderRadius(Number(e.target.value))}
                    className="cs-range w-full"
                  />
                </div>

                <div>
                  <label className="cs-label flex items-center justify-between w-full">
                    <span>Bordas Internas: {imageBorderRadius}px</span>
                    <div className="group relative cursor-help">
                      <Info className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                      <div className="absolute bottom-full mb-1.5 right-0 hidden group-hover:block w-52 bg-black/95 border border-white/10 shadow-xl text-zinc-300 text-[10px] p-2 rounded-lg z-[60] normal-case tracking-normal font-normal">
                        Controla o quão arredondadas serão as imagens de cover e avatares dentro dos slides.
                      </div>
                    </div>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="80"
                    value={imageBorderRadius}
                    onChange={(e) => setImageBorderRadius(Number(e.target.value))}
                    className="cs-range w-full"
                  />
                </div>
              </CollapsibleSection>

              <div className="h-px bg-surface-input/50 w-full" />

              {/* === Section: Contexto Criativo === */}
              <CollapsibleSection title="CONTEXTO CRIATIVO" defaultOpen={false}>
                <p className="text-[9px] text-zinc-500 font-medium leading-relaxed -mt-1">
                  Todos os campos são opcionais. O que for preenchido enriquece o prompt enviado à IA.
                </p>

                {/* Público-alvo */}
                <div>
                  <label className="cs-label">Público-alvo</label>
                  <input
                    type="text"
                    className="cs-input w-full"
                    placeholder="Ex: Mães, presentes corporativos..."
                    value={creativeContext.publicoAlvo || ''}
                    onChange={(e) => setCreativeContext({ ...creativeContext, publicoAlvo: e.target.value })}
                  />
                </div>

                {/* Faixa Etária */}
                <div>
                  <label className="cs-label">Faixa Etária</label>
                  <input
                    type="text"
                    className="cs-input w-full"
                    placeholder="Ex: 25–45 anos"
                    value={creativeContext.faixaEtaria || ''}
                    onChange={(e) => setCreativeContext({ ...creativeContext, faixaEtaria: e.target.value })}
                  />
                </div>

                {/* Tom de Voz + Objetivo lado a lado */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] uppercase font-bold tracking-widest text-zinc-600 mb-1 block">Tom de Voz</label>
                    <select
                      className="cs-input text-xs py-[0.675rem] w-full"
                      value={creativeContext.tom || ''}
                      onChange={(e) => setCreativeContext({ ...creativeContext, tom: e.target.value })}
                    >
                      <option value="">— Selecione —</option>
                      <option value="Sofisticado e premium">Sofisticado</option>
                      <option value="Inspirador e empático">Inspirador</option>
                      <option value="Direto e objetivo">Direto</option>
                      <option value="Educativo e didático">Educativo</option>
                      <option value="Leve e divertido">Divertido</option>
                      <option value="Ácido e irônico">Ácido / Irônico</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[9px] uppercase font-bold tracking-widest text-zinc-600 mb-1 block">Objetivo</label>
                    <select
                      className="cs-input text-xs py-[0.675rem] w-full"
                      value={creativeContext.objetivo || ''}
                      onChange={(e) => setCreativeContext({ ...creativeContext, objetivo: e.target.value })}
                    >
                      <option value="">— Selecione —</option>
                      <option value="Vender / Converter">Vender</option>
                      <option value="Gerar engajamento">Engajar</option>
                      <option value="Educar a audiência">Educar</option>
                      <option value="Posicionar a marca">Posicionar</option>
                      <option value="Nutrir o relacionamento">Nutrir</option>
                    </select>
                  </div>
                </div>

                {/* Diferenciais */}
                <div>
                  <label className="cs-label">Diferenciais da Marca</label>
                  <textarea
                    className="cs-textarea h-16"
                    placeholder="Ex: Ingredientes premium, embalagem artesanal, produção limitada..."
                    value={creativeContext.diferenciais || ''}
                    onChange={(e) => setCreativeContext({ ...creativeContext, diferenciais: e.target.value })}
                  />
                </div>

                {/* CTA */}
                <div>
                  <label className="cs-label">Call to Action</label>
                  <input
                    type="text"
                    className="cs-input w-full"
                    placeholder="Ex: Mande mensagem para encomendar"
                    value={creativeContext.chamadaAcao || ''}
                    onChange={(e) => setCreativeContext({ ...creativeContext, chamadaAcao: e.target.value })}
                  />
                </div>
              </CollapsibleSection>

              <div className="h-px bg-surface-input/50 w-full" />

              {/* === Section: Master Prompt === */}
              <div className="space-y-4">
                <label className="cs-section-title">
                  <Lightbulb className="w-4 h-4" style={{ color: gradientColor1 }} />
                  Briefing
                </label>
                <textarea
                  className="cs-textarea h-32"
                  placeholder="Descreva a estratégia. Ex: 5 motivos polêmicos sobre a confeitaria gourmet tradicional..."
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                />
              </div>

              {/* === Section: URL Context (Gemini) === */}
              <div className="space-y-4">
                <label className="cs-section-title">
                  <Link className="w-4 h-4" style={{ color: gradientColor1 }} />
                  Contexto de URL
                </label>
                <p className="text-[9px] text-zinc-500 leading-relaxed font-medium -mt-2">
                  Adicione links (sites, artigos, PDFs públicos) para que a IA use como referência. Máx 20.
                </p>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="cs-input flex-1 text-xs"
                    placeholder="Cole a URL aqui..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const url = e.target.value.trim();
                        if (url && contextUrls.length < 20) {
                          setContextUrls([...contextUrls, url]);
                          e.target.value = '';
                        }
                      }
                    }}
                  />
                  <button 
                    className="p-2 bg-surface-input/50 rounded-lg hover:bg-surface-input transition-colors"
                    onClick={(e) => {
                      const input = e.currentTarget.previousSibling;
                      const url = input.value.trim();
                      if (url && contextUrls.length < 20) {
                        setContextUrls([...contextUrls, url]);
                        input.value = '';
                      }
                    }}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                {contextUrls.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {contextUrls.map((url, i) => (
                      <div key={i} className="flex items-center gap-2 bg-surface-input/40 border border-white/5 px-2 py-1 rounded-lg text-[9px] text-zinc-400 group/url">
                        <span className="max-w-[120px] truncate">{url}</span>
                        <button 
                          onClick={() => setContextUrls(contextUrls.filter((_, idx) => idx !== i))}
                          className="text-zinc-600 hover:text-rose-400 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === 'designs' && (
             <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col gap-1 px-1">
                   <h4 className="text-[11px] font-black uppercase tracking-widest text-white/40">Biblioteca de Designs</h4>
                   <p className="text-[9px] text-zinc-500 leading-relaxed font-medium">Escolha um estilo para injetar diretamente ao fim do carrossel.</p>
                </div>
                <DesignLibrary
                  onAddSlide={onAddSlide}
                  brandColor={gradientColor1}
                  brandAvatar={brandAvatar}
                  slidesCount={slides.length}
                />             </div>
          )}

          {activeTab === 'autopost' && (
             <div className="space-y-6 animate-fade-in">
               <div className="space-y-4">
                  <div className="flex flex-col gap-1 px-1">
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-white/40">Estratégia do Post</h4>
                    <p className="text-[9px] text-zinc-500 leading-relaxed font-medium">Defina o briefing e a distribuição dos layouts para geração via IA.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="cs-section-title">
                      <Lightbulb className="w-4 h-4" style={{ color: gradientColor1 }} />
                      Briefing
                    </label>
                    <textarea
                      className="cs-textarea h-32"
                      placeholder="Descreva a estratégia. Ex: 5 motivos polêmicos sobre a confeitaria gourmet tradicional..."
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                    />
                  </div>

                  {/* === Section: URL Context (Gemini) === */}
                  <div className="space-y-4">
                    <label className="cs-section-title">
                      <Link className="w-4 h-4" style={{ color: gradientColor1 }} />
                      Contexto de URL
                    </label>
                    <p className="text-[9px] text-zinc-500 leading-relaxed font-medium -mt-2">
                      Adicione links (sites, artigos, PDFs públicos) para que a IA use como referência. Máx 20.
                    </p>
                    
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="cs-input flex-1 text-xs"
                        placeholder="Cole a URL aqui..."
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const url = e.target.value.trim();
                            if (url && contextUrls.length < 20) {
                              setContextUrls([...contextUrls, url]);
                              e.target.value = '';
                            }
                          }
                        }}
                      />
                      <button 
                        className="p-2 bg-surface-input/50 rounded-lg hover:bg-surface-input transition-colors"
                        onClick={(e) => {
                          const input = e.currentTarget.previousSibling;
                          const url = input.value.trim();
                          if (url && contextUrls.length < 20) {
                            setContextUrls([...contextUrls, url]);
                            input.value = '';
                          }
                        }}
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>

                    {contextUrls.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {contextUrls.map((url, i) => (
                          <div key={i} className="flex items-center gap-2 bg-surface-input/40 border border-white/5 px-2 py-1 rounded-lg text-[9px] text-zinc-400 group/url">
                            <span className="max-w-[120px] truncate">{url}</span>
                            <button 
                              onClick={() => setContextUrls(contextUrls.filter((_, idx) => idx !== i))}
                              className="text-zinc-600 hover:text-rose-400 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
               </div>

               <div className="h-px bg-surface-input/50 w-full" />

               {setLayoutSelection && (
                 <CollapsibleSection title="DISTRIBUIÇÃO DE LAYOUTS" defaultOpen={true}>
                   <LayoutSelector
                     layoutSelection={layoutSelection}
                     setLayoutSelection={setLayoutSelection}
                     slideCount={slideCount}
                     brandColor={gradientColor1}
                     favorites={favorites}
                     onUseFavorite={onUseFavorite}
                     onRemoveFavorite={onRemoveFavorite}
                     onInjectSlide={onInjectSlide}
                     isInjecting={isInjecting}
                   />
                 </CollapsibleSection>
               )}
             </div>
          )}
        </div>

          {/* Scroll to Top Button */}
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="absolute bottom-[200px] right-6 w-8 h-8 bg-zinc-800/40 text-white/50 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/5 hover:bg-zinc-700/80 hover:text-white hover:scale-105 transition-all z-50 animate-in fade-in zoom-in"
              title="Voltar ao topo"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          )}

        {/* Rodapé Fixo */}
        <div className="shrink-0 p-6 border-t border-white/5 bg-[#000000]/40 space-y-5 z-40">
            {/* Slide Count */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-[10px] font-black tracking-[0.2em] uppercase text-white/40">Slides a Gerar</label>
                <span
                  className="font-bold px-3 py-1 rounded-lg text-xs"
                  style={{
                    backgroundColor: `${gradientColor1}15`,
                    color: gradientColor1,
                    border: `1px solid ${gradientColor1}30`
                  }}
                >
                  {slideCount}
                </span>
              </div>
              <input
                type="range"
                min={SLIDE_COUNT_RANGE.min}
                max={SLIDE_COUNT_RANGE.max}
                value={slideCount}
                onChange={(e) => setSlideCount(parseInt(e.target.value))}
                className="cs-range w-full"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="p-4 bg-red-950/20 border border-red-900/30 rounded-2xl flex items-start gap-3 text-red-400 text-[10px] font-bold uppercase tracking-wider animate-fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={onGenerate}
              disabled={isGenerating}
              className="group relative w-full overflow-hidden bg-white text-black py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:scale-[1.02] active:scale-95 transition-all duration-150 shadow-[0_0_30px_rgba(255,255,255,0.1)] outline-none focus:outline-none focus-visible:outline-none"
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150" 
                style={{ background: `linear-gradient(to right, ${gradientColor1}, ${gradientColor1}CC)` }}
              />
              <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-white transition-colors">
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Sincronizando...
                  </>
                ) : (
                  <>
                    <Send size={14} /> Gerar Carrossel
                  </>
                )}
              </span>
            </button>
        </div>
      </div>
    </div>
  );
}
