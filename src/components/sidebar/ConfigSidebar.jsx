import React from 'react';
import {
  Settings,
  Settings2,
  LayoutTemplate,
  Lightbulb,
  BadgeCheck,
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
} from 'lucide-react';
import { FONT_SCALE_RANGE, SLIDE_COUNT_RANGE, FONT_OPTIONS } from '../../lib/design-tokens';
import LayoutSelector from './LayoutSelector';

const CollapsibleSection = ({ title, defaultOpen = true, children }) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  return (
    <div className="bg-surface-card border border-border-subtle rounded-xl overflow-hidden mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-3.5 bg-white/5 hover:bg-white/10 transition-colors"
      >
        <span className="text-[11px] font-bold tracking-widest uppercase text-zinc-400">{title}</span>
        {isOpen ? <ChevronDown className="w-4 h-4 text-zinc-500" /> : <ChevronRight className="w-4 h-4 text-zinc-500" />}
      </button>
      {isOpen && (
        <div className="p-4 pt-0 flex flex-col gap-4 mt-3">
          {children}
        </div>
      )}
    </div>
  );
};

/**
 * ConfigSidebar — Sidebar de configurações do Alice Studio.
 * Contém: Alice Setup (handle, cor, verificado, fontes) + Master Prompt + geração.
 */
export default function ConfigSidebar({
  width,
  brandHandle,
  setBrandHandle,
  brandAvatar,
  setBrandAvatar,
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
  onImageScale,
  onRemoveImage,
  titleFont,
  setTitleFont,
  textFont,
  setTextFont,
  favorites,
  onUseFavorite,
  onRemoveFavorite,
  onInjectSlide,
  isInjecting,
  showSlideCounter,
  setShowSlideCounter,
  slideCounterPosition,
  setSlideCounterPosition,
}) {
  const isInspectorActive = !!selectedElement;
  const [activeTab, setActiveTab] = React.useState('ajustes');

  if (isInspectorActive) {
    const slide = slides[selectedElement.slideIndex] || {};

    // Múltiplos Focos (Todo o Slide)
    if (!selectedElement.field) {
      return (
        <aside 
          className="alice-sidebar-resizable h-full border-r border-border-subtle bg-surface-dark p-6 lg:p-8 flex flex-col gap-4 overflow-y-auto custom-scrollbar z-40 relative"
          style={{ '--sidebar-width': `${width}px` }}
        >
          <div className="flex justify-between items-center bg-black/20 p-2 rounded-lg mb-1 border border-border-subtle">
            <h3 className="text-white font-outfit font-black tracking-wide text-sm flex items-center gap-2 uppercase px-2">
              <Settings2 className="w-4 h-4 text-emerald-500" />
              Edição (Slide {selectedElement.slideIndex + 1})
            </h3>
            <button 
              onClick={() => setSelectedElement(null)}
              className="text-zinc-500 hover:text-white transition-colors bg-white/5 rounded-full p-1 border border-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {/* === Bloco de Imagem do Slide (sempre no topo) === */}
            <div className="bg-surface-card border border-border-subtle p-4 rounded-xl flex flex-col gap-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Imagem do Slide</span>
              {slide.imageUrl ? (
                <div className="flex flex-col gap-3">
                  <div
                    className="w-full h-28 rounded-lg overflow-hidden bg-zinc-900 relative"
                    style={{
                      backgroundImage: `url(${slide.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: `center ${slide.imagePosition ?? 50}%`,
                    }}
                  >
                    <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                      <Upload className="w-5 h-5 text-white" />
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => onImageUpload(selectedElement.slideIndex, e)} />
                    </label>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-600">Posição Y</span>
                      <span className="text-[9px] font-mono text-zinc-500">{slide.imagePosition ?? 50}%</span>
                    </div>
                    <input type="range" min="0" max="100" value={slide.imagePosition ?? 50} onChange={(e) => onImagePosition(selectedElement.slideIndex, e.target.value)} className="alice-range w-full" />
                  </div>
                  {onImageScale && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-600">Escala</span>
                        <span className="text-[9px] font-mono text-zinc-500">{slide.imageScale ?? 1}x</span>
                      </div>
                      <input type="range" min="1" max="3" step="0.05" value={slide.imageScale ?? 1} onChange={(e) => onImageScale(selectedElement.slideIndex, e.target.value)} className="alice-range w-full" />
                    </div>
                  )}
                  {onRemoveImage && (
                    <button
                      onClick={() => onRemoveImage(selectedElement.slideIndex)}
                      className="w-full py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 hover:border-rose-500/40 transition-all flex items-center justify-center gap-1.5"
                    >
                      <X className="w-3 h-3" />
                      Remover Imagem
                    </button>
                  )}
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center gap-2 h-20 border-2 border-dashed border-border-subtle rounded-lg text-zinc-600 hover:text-zinc-400 hover:border-zinc-600 transition-colors cursor-pointer">
                  <ImageIcon className="w-5 h-5" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Adicionar Imagem</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => onImageUpload(selectedElement.slideIndex, e)} />
                </label>
              )}
            </div>

            {['titulo', 'texto_apoio', 'citacao', 'autor', 'dado_destaque', 'contexto_dado', 'slide_call', 'insta_ready', 'cta_text', 'cta_button'].map(key => {
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
                    className="alice-textarea min-h-20 w-full p-3 font-outfit text-sm text-zinc-200"
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
                    className="alice-input font-bold"
                 />
                 <textarea 
                    value={item.text || ''}
                    onChange={(e) => {
                      const newItems = [...slide.items];
                      newItems[idx].text = e.target.value;
                      setSlides(prev => prev.map((s, i) => i === selectedElement.slideIndex ? {...s, items: newItems} : s));
                    }}
                    className="alice-textarea min-h-20 w-full p-3 font-playfair text-sm text-zinc-300 italic"
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
          
          const newValue = typeof valueOrFn === 'function' ? valueOrFn(currentPos[prop]) : valueOrFn;
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

    // Função para incremento contínuo ao segurar botão (com disparo imediato ao clicar)
    const startAutoScroll = (prop, delta) => {
      updateProp(prop, v => v + delta);
      const interval = setInterval(() => {
        updateProp(prop, v => v + delta);
      }, 50);
      const stop = () => {
        clearInterval(interval);
        window.removeEventListener('mouseup', stop);
        window.removeEventListener('touchend', stop);
      };
      window.addEventListener('mouseup', stop);
      window.addEventListener('touchend', stop);
    };

    return (
      <aside 
        className="alice-sidebar-resizable h-full border-r border-border-subtle bg-surface-dark p-6 lg:p-8 flex flex-col gap-8 overflow-y-auto custom-scrollbar z-40 relative"
        style={{ '--sidebar-width': `${width}px` }}
      >
        <div className="flex items-center gap-3 underline-offset-4 decoration-white/20 mb-[-1rem]">
           <button 
             onClick={() => setSelectedElement(null)}
             className="text-zinc-500 hover:text-white transition-colors bg-white/5 rounded-full p-1"
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
             <span className="text-[11px] font-mono font-bold text-white bg-white/10 px-2 py-0.5 rounded">{selectedElement.field}</span>
           </div>
           
           <div className="flex flex-col gap-3 w-full">
              <div className="flex flex-col gap-2">
                <button
                   onClick={() => setSelectedElement({ slideIndex: selectedElement.slideIndex, field: null })}
                   className="alice-btn-ghost w-full py-3.5 rounded-xl shadow-lg border-border-hover border flex justify-center items-center gap-2 text-label-xs uppercase"
                >
                  <Settings2 className="w-4 h-4" />
                  Editar 
                </button>
                <p className="text-[9px] text-zinc-500 text-center font-bold tracking-tight px-2 leading-tight">
                  Clique acima para editar todos os conteúdos de texto deste slide simultaneamente.
                </p>
              </div>

              <div className="bg-surface-input px-3 py-2 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">Posição X</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateProp('x', 0)}
                      title="Resetar X"
                      className="w-5 h-5 flex items-center justify-center bg-white/5 hover:bg-rose-500/20 rounded text-zinc-600 hover:text-rose-400 transition-colors select-none active:scale-90"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                    <button 
                      onMouseDown={() => startAutoScroll('x', -1)}
                      onTouchStart={() => startAutoScroll('x', -1)}
                      className="w-5 h-5 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded text-zinc-400 hover:text-white transition-colors text-[10px] font-bold select-none active:scale-90"
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
                      className="w-5 h-5 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded text-zinc-400 hover:text-white transition-colors text-[10px] font-bold select-none active:scale-90"
                    >
                      +
                    </button>
                  </div>
                </div>
                  <input 
                    type="range"
                    min="-500"
                    max="500"
                    step="any"
                    value={pos?.x || 0}
                    onChange={(e) => updateProp('x', Math.round(Number(e.target.value)))}
                    className="alice-range w-full"
                  />
              </div>

              <div className="bg-surface-input px-3 py-2 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">Posição Y</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateProp('y', 0)}
                      title="Resetar Y"
                      className="w-5 h-5 flex items-center justify-center bg-white/5 hover:bg-rose-500/20 rounded text-zinc-600 hover:text-rose-400 transition-colors select-none active:scale-90"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                    <button 
                      onMouseDown={() => startAutoScroll('y', -1)}
                      onTouchStart={() => startAutoScroll('y', -1)}
                      className="w-5 h-5 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded text-zinc-400 hover:text-white transition-colors text-[10px] font-bold select-none active:scale-90"
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
                      className="w-5 h-5 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded text-zinc-400 hover:text-white transition-colors text-[10px] font-bold select-none active:scale-90"
                    >
                      +
                    </button>
                  </div>
                </div>
                  <input 
                    type="range"
                    min="-500"
                    max="500"
                    step="any"
                    value={pos?.y || 0}
                    onChange={(e) => updateProp('y', Math.round(Number(e.target.value)))}
                    className="alice-range w-full"
                  />
              </div>

              <div className="bg-surface-input px-3 py-2 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                   <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">Escala</span>
                   <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateProp('scale', 1)}
                        title="Resetar Escala"
                        className="w-5 h-5 flex items-center justify-center bg-white/5 hover:bg-rose-500/20 rounded text-zinc-600 hover:text-rose-400 transition-colors select-none active:scale-90"
                      >
                        <RotateCcw className="w-3 h-3" />
                      </button>
                      <button 
                        onMouseDown={() => startAutoScroll('scale', -0.01)}
                        onTouchStart={() => startAutoScroll('scale', -0.01)}
                        className="w-5 h-5 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded text-zinc-400 hover:text-white transition-colors text-[10px] font-bold select-none active:scale-90"
                      >
                        -
                      </button>
                      <span className="text-[10px] font-mono text-zinc-200 min-w-[40px] text-center">
                        {pos.scale?.toFixed(2)}x
                      </span>
                      <button 
                        onMouseDown={() => startAutoScroll('scale', 0.01)}
                        onTouchStart={() => startAutoScroll('scale', 0.01)}
                        className="w-5 h-5 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded text-zinc-400 hover:text-white transition-colors text-[10px] font-bold select-none active:scale-90"
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
                   className="alice-range w-full"
                />
              </div>
              {(() => {
                const isSpecialElement = selectedElement.field === 'handle' || selectedElement.field === 'counter';
                return (
                  <div className={`mt-2 flex ${isSpecialElement ? 'gap-2' : ''}`}>
                    {/* Direcional Minimalista */}
                    <div className={`bg-surface-input px-2 py-4 rounded-lg flex flex-col items-center justify-center space-y-3 ${isSpecialElement ? 'flex-1' : 'w-full'}`}>
                      <div className="flex items-center justify-between w-full px-1">
                        <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-600">{isSpecialElement ? 'Direcional' : 'Direcional Minimalista'}</span>
                        <button
                          onClick={() => { updateProp('x', 0); updateProp('y', 0); updateProp('scale', 1); }}
                          title="Resetar posição e escala"
                          className="w-5 h-5 flex items-center justify-center bg-white/5 hover:bg-rose-500/20 rounded text-zinc-600 hover:text-rose-400 transition-colors select-none active:scale-90"
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

                    {/* Controle Grid 3x3 (apenas para Handle e Counter) */}
                    {isSpecialElement && (
                       <div className="bg-surface-input px-2 py-4 rounded-lg flex flex-col items-center justify-center space-y-3 flex-1">
                         <div className="flex items-center justify-between w-full px-1">
                           <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-600">Posição</span>
                         </div>
                         <div className="grid grid-cols-3 gap-1 w-fit">
                           {[
                             'top-left', 'top-center', 'top-right',
                             'center-left', 'center-center', 'center-right',
                             'bottom-left', 'bottom-center', 'bottom-right'
                           ].map(alignKey => {
                             const currentAlign = pos.align || (selectedElement.field === 'handle' ? 'top-left' : 'top-right');
                             const isActive = currentAlign === alignKey;
                             return (
                               <button
                                 key={alignKey}
                                 onClick={() => updateProp('align', alignKey)}
                                 className={`w-8 h-8 rounded-lg flex justify-center items-center transition-all outline-none ${
                                   isActive
                                     ? 'border border-opacity-50 shadow-[0_0_15px_rgba(0,0,0,0.3)]'
                                     : 'bg-white/5 border border-transparent hover:bg-white/10'
                                 }`}
                                 style={isActive ? { borderColor: gradientColor1, backgroundColor: `${gradientColor1}15` } : {}}
                               >
                                 <div 
                                   className={`w-1.5 h-1.5 rounded-full ${isActive ? 'shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'bg-zinc-600'}`}
                                   style={isActive ? { backgroundColor: gradientColor1 } : {}}
                                 />
                               </button>
                             );
                           })}
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
                  onClick={() => updateProp('bold', !pos.bold)}
                  className={`flex-1 py-2 rounded flex justify-center items-center transition-all border ${pos.bold ? 'bg-white/10 border-white/20 text-white' : 'bg-surface-input border-transparent text-zinc-500 hover:text-zinc-300'}`}
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => updateProp('italic', !pos.italic)}
                  className={`flex-1 py-2 rounded flex justify-center items-center transition-all border ${pos.italic ? 'bg-white/10 border-white/20 text-white' : 'bg-surface-input border-transparent text-zinc-500 hover:text-zinc-300'}`}
                >
                  <Italic className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => updateProp('underline', !pos.underline)}
                  className={`flex-1 py-2 rounded flex justify-center items-center transition-all border ${pos.underline ? 'bg-white/10 border-white/20 text-white' : 'bg-surface-input border-transparent text-zinc-500 hover:text-zinc-300'}`}
                >
                  <Underline className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => updateProp('uppercase', !pos.uppercase)}
                  className={`flex-1 py-2 rounded flex justify-center items-center transition-all border ${pos.uppercase ? 'bg-white/10 border-white/20 text-white' : 'bg-surface-input border-transparent text-zinc-500 hover:text-zinc-300'}`}
                >
                  <Type className="w-4 h-4" />
                </button>
             </div>

             <div className="flex gap-2 mb-4 bg-surface-input p-1 rounded-lg">
                {['left', 'center', 'right', 'justify'].map(align => (
                  <button 
                    key={align}
                    onClick={() => updateProp('align', align)}
                    className={`flex-1 py-1.5 rounded flex justify-center items-center transition-all ${pos.align === align || (!pos.align && align === 'left') ? 'bg-zinc-700 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    {align === 'left' && <AlignLeft className="w-3.5 h-3.5" />}
                    {align === 'center' && <AlignCenter className="w-3.5 h-3.5" />}
                    {align === 'right' && <AlignRight className="w-3.5 h-3.5" />}
                    {align === 'justify' && <AlignJustify className="w-3.5 h-3.5" />}
                  </button>
                ))}
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
                  <div className="flex items-center bg-surface-input rounded p-1 gap-1">
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
                  <div className="flex items-center bg-surface-input rounded p-1 gap-1">
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
                  </div>
               </div>
             </div>
           </div>

            <div className="mt-4 pt-4 border-t border-border-subtle">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-600 block">Conteúdo</span>
                <button 
                   onClick={() => setSelectedElement({ slideIndex: selectedElement.slideIndex, field: null })}
                   className="text-[9px] uppercase tracking-widest font-bold text-zinc-400 hover:text-white transition-colors"
                >
                   Ver Tudo
                </button>
              </div>
              <textarea 
                value={slide[selectedElement.field] || ''}
                disabled={!Object.keys(slide).includes(selectedElement.field)}
                onChange={(e) => {
                  setSlides(prev => prev.map((s, i) => i === selectedElement.slideIndex ? {...s, [selectedElement.field]: e.target.value} : s));
                }}
                className={`alice-textarea min-h-20 w-full p-3 font-outfit text-sm text-white ${!Object.keys(slide).includes(selectedElement.field) ? 'opacity-50 cursor-not-allowed' : ''}`}
                placeholder={!Object.keys(slide).includes(selectedElement.field) ? 'Esse texto não é editável textualmente por aqui.' : ''}
              />
            </div>
        </div>
      </aside>
    );
  }
  return (
    <div className="flex h-full alice-sidebar-resizable border-r border-border-subtle bg-surface-dark z-40 relative" style={{ '--sidebar-width': `${width}px`, width: `${width}px` }}>
      {/* NavBar */}
      <div className="w-[72px] shrink-0 border-r border-border-subtle bg-black/20 flex flex-col items-center py-6 px-2 gap-4 z-50">
        <button 
          onClick={() => setActiveTab('ajustes')}
          className={`flex flex-col items-center justify-center gap-1.5 w-full py-3 rounded-xl transition-all ${activeTab === 'ajustes' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:bg-white/5 hover:text-zinc-300'}`}
        >
          <Settings2 size={24} />
          <span className="text-[9px] font-bold tracking-wide mt-1">Ajustes</span>
        </button>
        <button 
          onClick={() => setActiveTab('layouts')}
          className={`flex flex-col items-center justify-center gap-1.5 w-full py-3 rounded-xl transition-all ${activeTab === 'layouts' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:bg-white/5 hover:text-zinc-300'}`}
        >
          <LayoutTemplate size={24} />
          <span className="text-[9px] font-bold tracking-wide mt-1">Layouts</span>
        </button>
        <div className="w-8 h-px bg-white/10 my-2" />
        <button 
          onClick={() => setActiveTab('midia')}
          className={`flex flex-col items-center justify-center gap-1.5 w-full py-3 rounded-xl transition-all ${activeTab === 'midia' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:bg-white/5 hover:text-zinc-300'}`}
        >
          <ImageIcon size={24} />
          <span className="text-[9px] font-bold tracking-wide mt-1">Mídia</span>
        </button>

        <div className="mt-auto pb-2 w-full">
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="p-3 w-full flex justify-center rounded-xl transition-all text-zinc-500 hover:bg-white/5 hover:text-white"
            title="Adapters & API"
          >
            <Settings size={24} />
          </button>
        </div>
      </div>

      {/* Content Panel */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-6">
          {activeTab === 'ajustes' && (
            <>
              {/* === Section: Alice Setup === */}
              <h3 className="alice-section-title">
                <Settings2 className="w-4 h-4" style={{ color: gradientColor1 }} />
                Direção Criativa
              </h3>

        <CollapsibleSection title="HANDLE A CORPO / TEXTO">
          {/* Handle + Verified + Counter */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="alice-label">Handle (Arroba)</label>
              <div className="flex gap-2 w-full">
                {/* Avatar Uploader com botão limpar */}
                <div className="relative shrink-0">
                  <label className="w-10 h-10 bg-surface-input border border-border-subtle rounded-lg flex items-center justify-center cursor-pointer hover:border-white/20 transition-colors relative overflow-hidden group block">
                    {brandAvatar ? (
                      <img src={brandAvatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-4 h-4 text-zinc-500" />
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Upload className="w-3 h-3 text-white" />
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
                      className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-zinc-800 border border-zinc-600 rounded-full flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors z-10"
                      title="Remover foto"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  )}
                </div>
                
                <input
                  type="text"
                  value={brandHandle}
                  onChange={(e) => setBrandHandle(e.target.value)}
                  className="alice-input flex-1 min-w-0"
                />
                <button
                  onClick={() => setShowBrandHandle(!showBrandHandle)}
                  className={`h-10 px-3 rounded-lg border text-[11px] uppercase tracking-widest font-bold transition-all flex items-center justify-center shrink-0 ${
                    showBrandHandle
                      ? ''
                      : 'bg-surface-input border-border-subtle text-zinc-500'
                  }`}
                  style={
                    showBrandHandle
                      ? {
                          backgroundColor: `${gradientColor1}20`,
                          borderColor: `${gradientColor1}50`,
                          color: gradientColor1,
                        }
                      : {}
                  }
                >
                  {showBrandHandle ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {/* Selo Verificado */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase font-bold tracking-widest text-zinc-400 flex items-center gap-1.5">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  Selo Verificado
                </span>
                <button
                  role="switch"
                  aria-checked={isVerified}
                  onClick={() => setIsVerified(!isVerified)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isVerified ? 'bg-[color:var(--toggle-active)]' : 'bg-zinc-700'
                  }`}
                  style={{ '--toggle-active': gradientColor1 }}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      isVerified ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Contador */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase font-bold tracking-widest text-zinc-400">
                  Contador
                </span>
                <button
                  role="switch"
                  aria-checked={showSlideCounter}
                  onClick={() => setShowSlideCounter(!showSlideCounter)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    showSlideCounter ? 'bg-[color:var(--toggle-active)]' : 'bg-zinc-700'
                  }`}
                  style={{ '--toggle-active': gradientColor1 }}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      showSlideCounter ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Fontes em linha única */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[9px] uppercase font-bold tracking-widest text-zinc-600 mb-1 block">Fonte Título</label>
              <select
                value={titleFont}
                onChange={(e) => setTitleFont(e.target.value)}
                className="alice-input text-xs py-1.5 w-full"
              >
                {FONT_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[9px] uppercase font-bold tracking-widest text-zinc-600 mb-1 block">Corpo / Texto</label>
              <select
                value={textFont}
                onChange={(e) => setTextFont(e.target.value)}
                className="alice-input text-xs py-1.5 w-full"
              >
                {FONT_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="TAMANHO TÍTULO A BORDAS" defaultOpen={false}>
          {/* Scale: Título */}
          <div>
            <label className="alice-label flex items-center justify-between w-full">
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
              className="alice-range w-full"
            />
          </div>

          {/* Scale: Texto */}
          <div>
            <label className="alice-label flex items-center justify-between w-full">
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
              className="alice-range w-full"
            />
          </div>

          {/* Scale: Border Radius */}
          <div>
            <label className="alice-label flex items-center justify-between w-full">
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
              className="alice-range w-full"
            />
          </div>

          <div>
            <label className="alice-label flex items-center justify-between w-full">
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
              className="alice-range w-full"
            />
          </div>
        </CollapsibleSection>

        <div className="h-px bg-white/5 w-full" />

        {/* === Section: Master Prompt === */}
        <div className="space-y-4">
          <label className="alice-section-title">
            <Lightbulb className="w-4 h-4" style={{ color: gradientColor1 }} />
            Briefing
          </label>
          <textarea
            className="alice-textarea h-32"
            placeholder="Descreva a estratégia. Ex: 5 motivos polêmicos sobre a confeitaria gourmet tradicional..."
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          />

          </div>
            </>
          )}

          {activeTab === 'layouts' && (
             <div className="space-y-4">
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

          {activeTab === 'midia' && (
             <div className="flex-1 h-full min-h-[200px] flex flex-col items-center justify-center">
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest bg-white/5 border border-white/10 px-4 py-2 rounded-lg flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Em breve!
                </p>
             </div>
          )}
        </div>

        {/* Rodapé Fixo */}
        <div className="shrink-0 p-6 lg:p-8 pt-6 border-t border-border-subtle bg-surface-dark space-y-4 z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.6)]">
            {/* Slide Count */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="alice-label mb-0">Slides a Gerar</label>
                <span
                  className="font-bold px-2 py-0.5 rounded text-xs"
                  style={{
                    backgroundColor: `${gradientColor1}20`,
                    color: gradientColor1,
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
                className="alice-range w-full"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="mt-4 p-4 bg-red-950/30 border border-red-900/50 rounded-xl flex items-start gap-3 text-red-400 text-xs font-mono">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={onGenerate}
              disabled={isGenerating}
              className="alice-btn-primary mt-6 !mb-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Processando...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> GERAR CARROSSEL
                </>
              )}
            </button>
        </div>
      </div>
    </div>
  );
}
