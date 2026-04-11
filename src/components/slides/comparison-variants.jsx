import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import SmartElement from '../smart-element';
import SlideHeader from '../slide-header';

// ==========================================
// HELPERS
// ==========================================

const ComparisonTitle = ({ data, index, scale, onActionStart, onTextChange, selectedElement, onSelectElement, align = 'text-left', color = 'text-white', wrapperClasses = 'mb-10 text-center shrink-0', className = '' }) => {
  return (
    <div className={wrapperClasses}>
      <SmartElement
        slideIndex={index}
        field="titulo"
        position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
        onActionStart={onActionStart}
        isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
        onSelectElement={onSelectElement}
      >
        <h2
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onTextChange && onTextChange(index, 'titulo', e.currentTarget.innerText)}
          className={`font-outfit font-black ${color} tracking-tighter outline-none ${align} ${className}`}
          style={{ fontSize: `${36 * scale}px` }}
        >
          {data.titulo}
        </h2>
      </SmartElement>
    </div>
  );
};

// ==========================================
// VARIANTS
// ==========================================

export function ComparisonVariant1(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [{ label: 'Comum', value: 'Item A', highlight: false }, { label: 'Premium', value: 'Item B', highlight: true }];

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col p-10 relative overflow-hidden">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandColor={brandColor} isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}

              />
      
      <div className="flex-1 flex flex-col justify-center pt-6 overflow-hidden">
        <ComparisonTitle 
          data={data} index={index} scale={sTitle} 
          onActionStart={onActionStart} onTextChange={onTextChange} 
          selectedElement={selectedElement} onSelectElement={onSelectElement}
          wrapperClasses="mb-3 shrink-0"
          className="text-white"
        />

        <div className="space-y-1.5 overflow-hidden flex-1 pr-2 flex flex-col justify-center">
          {items.map((item, i) => (
            <div 
              key={i} 
              className={`flex justify-between items-center p-3.5 rounded-2xl border transition-all ${
                item.highlight ? 'shadow-xl' : 'bg-white/5 border-white/5 opacity-50'
              }`}
              style={item.highlight ? { backgroundColor: `${brandColor}15`, borderColor: `${brandColor}40` } : {}}
            >
              <div className="flex flex-col w-full">
                <span 
                  contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)}
                  className={`font-outfit font-black text-[9px] tracking-widest uppercase block ${!item.highlight ? 'text-zinc-500' : ''}`}
                  style={item.highlight ? { color: brandColor } : {}}
                >
                  {item.label}
                </span>
                <span 
                  contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'value', e.currentTarget.innerText)}
                  className={`font-playfair text-base block truncate line-clamp-2 ${item.highlight ? 'text-white font-bold' : 'text-zinc-400 italic'}`}
                >
                  {item.value}
                </span>
              </div>
              {item.highlight && (
                <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: brandColor }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ComparisonVariant2(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [];
  const normalItems = items.filter(it => !it.highlight).slice(0, 5);
  const highlightItems = items.filter(it => it.highlight).slice(0, 5);
  
  const mercadoLabel = normalItems[0]?.label || 'Mercado';
  const brandLabel = highlightItems[0]?.label || brandHandle || 'Sua Marca';

  return (
    <div className="w-full h-full flex flex-row overflow-hidden relative">
      <div className="w-1/2 h-full bg-zinc-900 p-8 pt-24 flex flex-col border-r border-black/20">
        <h3 contentEditable suppressContentEditableWarning className="font-outfit font-black text-zinc-600 tracking-widest uppercase text-xs mb-8">{mercadoLabel}</h3>
        <div className="space-y-6 flex-1 overflow-hidden">
          {normalItems.map((item, i) => (
            <div key={i} className="pb-4 border-b border-white/5">
              <span 
                contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(item) !== -1 ? items.indexOf(item) : items.length, 'value', e.currentTarget.innerText)}
                className="block font-playfair text-zinc-400 text-lg leading-tight"
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/2 h-full p-8 pt-24 flex flex-col" style={{ backgroundColor: brandColor }}>
        <h3 contentEditable suppressContentEditableWarning className="font-outfit font-black text-black/50 tracking-widest uppercase text-xs mb-8 line-clamp-1">{brandLabel}</h3>
        <div className="space-y-6 flex-1 overflow-hidden">
          {highlightItems.map((item, i) => (
            <div key={i} className="pb-4 border-b border-black/10">
              <span 
                contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(item) !== -1 ? items.indexOf(item) : items.length, 'value', e.currentTarget.innerText)}
                className="block font-playfair font-bold text-white text-lg leading-tight drop-shadow-md"
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#020202] rounded-full flex items-center justify-center font-outfit font-black text-white border-4 border-[#020202] z-10 text-xs shrink-0">VS</div>
      <div className="absolute top-0 left-0 w-full p-8">
        <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandColor={brandColor} isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}

              />
      </div>
      {/* Title is hidden in this variant as per layout, but we could add if needed. Keeping true to mockup. */}
    </div>
  );
}

export function ComparisonVariant3(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [];
  const midPoint = Math.ceil(items.length / 2);
  const leftItems = items.filter(it => !it.highlight);
  const rightItems = items.filter(it => it.highlight);
  // Match row by row
  const rowCount = Math.max(leftItems.length, rightItems.length);

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col p-10 relative overflow-hidden">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandColor={brandColor} isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}

              />
      
      <div className="flex-1 flex flex-col justify-center pt-8 overflow-hidden">
        <ComparisonTitle 
          data={data} index={index} scale={sTitle} 
          onActionStart={onActionStart} onTextChange={onTextChange} 
          selectedElement={selectedElement} onSelectElement={onSelectElement}
          wrapperClasses="mb-10 text-center shrink-0"
        />

        <div className="bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-6 flex-1 overflow-hidden shadow-2xl flex flex-col justify-start">
          {Array.from({ length: rowCount }).map((_, i) => {
            const left = leftItems[i];
            const right = rightItems[i];
            const leftIndex = items.indexOf(left);
            const rightIndex = items.indexOf(right);

            return (
              <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 gap-4 shrink-0">
                <div className="flex-1 text-right">
                  {left && (
                    <span 
                      contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, leftIndex, 'value', e.currentTarget.innerText)}
                      className="font-playfair text-zinc-500 text-sm"
                    >
                      {left.value}
                    </span>
                  )}
                </div>
                <div className="w-px h-8 bg-white/10 shrink-0"></div>
                <div className="flex-1 text-left">
                  {right && (
                    <span 
                      contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, rightIndex, 'value', e.currentTarget.innerText)}
                      className="font-outfit font-bold text-white text-base" style={{ color: brandColor }}
                    >
                      {right.value}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function ComparisonVariant4(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [];
  
  let baseNormal = items.filter(i => !i.highlight);
  let baseHighlight = items.filter(i => i.highlight);
  while (baseNormal.length < 2) baseNormal.push({ label: 'Categoria', value: 'Texto comum' });
  while (baseHighlight.length < 2) baseHighlight.push({ label: 'Destaque', value: 'Texto destaque', highlight: true });
  const itemsDisp = [baseNormal[0], baseHighlight[0], baseNormal[1], baseHighlight[1]];

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col p-10 relative overflow-hidden">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandColor={brandColor} isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}

              />
      
      <div className="flex-1 flex flex-col justify-center pt-8 overflow-hidden">
        <ComparisonTitle 
          data={data} index={index} scale={sTitle} 
          onActionStart={onActionStart} onTextChange={onTextChange} 
          selectedElement={selectedElement} onSelectElement={onSelectElement}
          wrapperClasses="mb-8 shrink-0" align="text-left"
        />

        <div className="grid grid-cols-2 gap-4 flex-1 overflow-hidden pr-1">
          {itemsDisp.map((item, i) => (
            <div 
              key={i} 
              className={`p-4 rounded-2xl h-full flex flex-col items-center justify-center text-center overflow-hidden border ${item.highlight ? 'bg-white text-black shadow-xl' : 'bg-transparent text-white border-white/20'}`}
              style={item.highlight ? { borderColor: 'white' } : {}}
            >
              <span 
                contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(item), 'label', e.currentTarget.innerText)}
                className={`font-outfit font-black text-[9px] tracking-widest uppercase mb-2 ${item.highlight ? '' : 'text-zinc-500'}`}
                style={item.highlight ? { color: brandColor } : {}}
              >
                {item.label}
              </span>
              <span 
                contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(item), 'value', e.currentTarget.innerText)}
                className={`font-playfair text-sm leading-snug ${item.highlight ? 'font-bold' : 'italic text-zinc-400'}`}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ComparisonVariant5(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [];
  const normalItems = items.filter(it => !it.highlight);
  const highlightItems = items.filter(it => it.highlight);

  const mercadoLabel = normalItems[0]?.label || 'Mercado';
  const brandLabel = highlightItems[0]?.label || brandHandle || 'Alice Standard';

  return (
    <div className="w-full h-full bg-[#E5E5E5] flex flex-col p-10 relative overflow-hidden text-black">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandColor="#000000" isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}

              />
      
      <div className="flex-1 flex flex-col pt-16 overflow-hidden relative">
        <ComparisonTitle 
          data={data} index={index} scale={sTitle} 
          onActionStart={onActionStart} onTextChange={onTextChange} 
          selectedElement={selectedElement} onSelectElement={onSelectElement}
          wrapperClasses="mb-10 text-center shrink-0" color="text-black"
        />

        <div className="relative flex-1">
          <div className="absolute top-0 left-4 right-12 bottom-20 bg-white border border-black/10 rounded-3xl p-8 shadow-md transform -rotate-3 z-0 blur-[1px] flex flex-col gap-4 opacity-50 overflow-hidden">
            <h4 contentEditable suppressContentEditableWarning className="font-outfit font-black text-xs tracking-widest uppercase text-zinc-400">{mercadoLabel}</h4>
            {normalItems.map((item, i) => (
              <span key={i} contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(item), 'value', e.currentTarget.innerText)} className="font-playfair italic text-zinc-500 text-sm border-b border-black/5 pb-2">{item.value}</span>
            ))}
          </div>
          <div className="absolute top-20 left-12 right-4 bottom-0 bg-black rounded-3xl p-8 shadow-2xl z-10 flex flex-col gap-4 transform rotate-2 overflow-hidden">
            <h4 contentEditable suppressContentEditableWarning className="font-outfit font-black text-xs tracking-widest uppercase text-white" style={{ color: brandColor }}>{brandLabel}</h4>
            {highlightItems.map((item, i) => (
              <span key={i} contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(item), 'value', e.currentTarget.innerText)} className="font-playfair font-bold text-white text-lg border-b border-white/10 pb-4">{item.value}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ComparisonVariant6(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [];
  
  const leftItems = items.filter(it => !it.highlight);
  const rightItems = items.filter(it => it.highlight);
  const rowCount = Math.max(leftItems.length, rightItems.length);

  return (
    <div className="w-full h-full bg-[#020202] flex flex-col p-10 relative overflow-hidden">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandColor={brandColor} isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}

              />
      
      <div className="flex-1 flex flex-col justify-center pt-8 overflow-hidden">
        <div className="mb-10 shrink-0">
          <SmartElement slideIndex={index} field="titulo" position={data.positions?.titulo || {x:0, y:0, scale:1}} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement}>
            <h2 
              contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange && onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-outfit font-black text-white tracking-tighter outline-none border-l-4 pl-4"
              style={{ fontSize: `${36 * sTitle}px`, borderColor: brandColor }}
            >
              {data.titulo}
            </h2>
          </SmartElement>
        </div>

        <div className="space-y-6 flex-1 overflow-hidden pr-2">
          {Array.from({ length: rowCount }).map((_, i) => {
            const left = leftItems[i];
            const right = rightItems[i];
            return (
              <div key={i} className="flex flex-col gap-2">
                <span className="font-outfit font-black text-[10px] tracking-widest uppercase text-zinc-600">
                  <span contentEditable suppressContentEditableWarning onBlur={(e) => left && onItemChange && onItemChange(index, items.indexOf(left) !== -1 ? items.indexOf(left) : items.length, 'label', e.currentTarget.innerText)}>{left?.label || 'Comum'}</span> vs <span contentEditable suppressContentEditableWarning onBlur={(e) => right && onItemChange && onItemChange(index, items.indexOf(right) !== -1 ? items.indexOf(right) : items.length, 'label', e.currentTarget.innerText)}>{right?.label || 'Premium'}</span>
                </span>
                {left && (
                  <span contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(left) !== -1 ? items.indexOf(left) : items.length, 'value', e.currentTarget.innerText)} className="font-playfair text-zinc-500 text-base line-through decoration-zinc-700 decoration-2">{left.value}</span>
                )}
                {right && (
                  <span contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(right) !== -1 ? items.indexOf(right) : items.length, 'value', e.currentTarget.innerText)} className="font-playfair font-bold text-white text-xl" style={{ color: brandColor }}>{right.value}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function ComparisonVariant7(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [];
  
  let leftItems = items.filter(it => !it.highlight);
  let rightItems = items.filter(it => it.highlight);
  while (leftItems.length < 3) leftItems.push({ label: 'Categoria', value: 'Adicione...' });
  while (rightItems.length < 3) rightItems.push({ label: 'Categoria', value: 'Adicione...', highlight: true });
  leftItems = leftItems.slice(0, 3);
  rightItems = rightItems.slice(0, 3);
  const rowCount = 3;
  
  const mercadoLabel = leftItems[0]?.label || 'Mercado';
  const brandLabel = rightItems[0]?.label || brandHandle || 'Alice';

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col p-10 relative overflow-hidden">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandColor={brandColor} isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}

              />
      
      <div className="flex-1 flex flex-col justify-center pt-8 overflow-hidden">
        <ComparisonTitle 
          data={data} index={index} scale={sTitle} 
          onActionStart={onActionStart} onTextChange={onTextChange} 
          selectedElement={selectedElement} onSelectElement={onSelectElement}
          wrapperClasses="mb-8 text-center shrink-0"
        />

        <div className="flex-1 overflow-hidden text-sm border border-white/10 rounded-2xl bg-zinc-900/50 flex flex-col">
          <div className="flex border-b border-white/10 bg-black/40 shrink-0">
            <div contentEditable suppressContentEditableWarning className="w-1/2 p-4 text-center font-outfit font-bold text-[10px] uppercase tracking-widest text-zinc-500">{mercadoLabel}</div>
            <div contentEditable suppressContentEditableWarning className="w-1/2 p-4 text-center font-outfit font-bold text-[10px] uppercase tracking-widest text-white border-l border-white/10" style={{ backgroundColor: `${brandColor}20`, color: brandColor }}>{brandLabel}</div>
          </div>
          <div className="overflow-hidden flex-1">
            {Array.from({ length: rowCount }).map((_, i) => {
              const left = leftItems[i];
              const right = rightItems[i];
              return (
                <div key={i} className="flex border-b border-white/5 last:border-0 items-stretch h-1/3 min-h-[60px]">
                  <div className="w-1/2 p-2 px-4 text-center flex items-center justify-center gap-2">
                    {left && (
                      <>
                        <X className="w-4 h-4 text-zinc-600 shrink-0" />
                        <span contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(left) !== -1 ? items.indexOf(left) : items.length, 'value', e.currentTarget.innerText)} className="font-playfair text-zinc-400 text-sm">{left.value}</span>
                      </>
                    )}
                  </div>
                  <div className="w-1/2 p-2 px-4 text-center border-l border-white/5 flex items-center justify-center gap-2 bg-[#0A0A0A]">
                    {right && (
                      <>
                        <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: brandColor }} />
                        <span contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(right) !== -1 ? items.indexOf(right) : items.length, 'value', e.currentTarget.innerText)} className="font-playfair font-bold text-white text-sm">{right.value}</span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ComparisonVariant8(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [];
  const normalItems = items.filter(it => !it.highlight);
  const highlightItems = items.filter(it => it.highlight);
  const mercadoLabel = normalItems[0]?.label || 'Mercado';
  const brandLabel = highlightItems[0]?.label || brandHandle || 'Padrão';

  return (
    <div className="w-full h-full bg-[#080808] flex flex-col p-10 relative overflow-hidden">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandColor={brandColor} isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}

              />
      
      <ComparisonTitle 
        data={data} index={index} scale={sTitle} 
        onActionStart={onActionStart} onTextChange={onTextChange} 
        selectedElement={selectedElement} onSelectElement={onSelectElement}
        wrapperClasses="mb-6 shrink-0 mt-8 z-20" align="text-left"
      />

      <div className="flex-1 relative overflow-hidden mt-4">
        <div className="absolute top-0 left-0 w-[85%] bottom-28 bg-zinc-900 border border-zinc-700 rounded-3xl p-6 shadow-md z-0 opacity-60 overflow-hidden">
          <h4 contentEditable suppressContentEditableWarning className="font-outfit font-bold text-xs uppercase tracking-widest text-zinc-500 mb-4">{mercadoLabel}</h4>
          <ul className="space-y-3">
            {normalItems.map((item, i) => (
              <li key={i} contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(item), 'value', e.currentTarget.innerText)} className="font-playfair text-zinc-400 text-sm">• {item.value}</li>
            ))}
          </ul>
        </div>
        <div className="absolute top-28 right-0 w-[85%] bottom-0 rounded-3xl p-6 shadow-2xl z-10 flex flex-col" style={{ backgroundColor: brandColor }}>
          <h4 contentEditable suppressContentEditableWarning className="font-outfit font-black text-xs uppercase tracking-widest text-black/50 mb-4 shrink-0">{brandLabel}</h4>
          <ul className="space-y-4 overflow-hidden flex-1">
            {highlightItems.map((item, i) => (
              <li key={i} className="flex gap-2 items-start">
                <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                <span className="font-playfair font-bold text-white text-base leading-snug">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function ComparisonVariant9(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [];
  const normalItems = items.filter(it => !it.highlight);
  const highlightItems = items.filter(it => it.highlight);
  
  return (
    <div className="w-full h-full bg-[#050505] flex relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full p-8 z-50">
        <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandColor={brandColor} isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}

              />
      </div>
      <div className="absolute inset-0 bg-zinc-900 clip-diagonal z-0" style={{ clipPath: 'polygon(0px 0px, 45% 0px, 55% 100%, 0px 100%)' }}></div>
      
      <div className="absolute inset-0 z-10 flex flex-col p-10 pt-20 pointer-events-none">
        <ComparisonTitle 
          data={data} index={index} scale={sTitle} 
          onActionStart={onActionStart} onTextChange={onTextChange} 
          selectedElement={selectedElement} onSelectElement={onSelectElement}
          wrapperClasses="mb-10 text-center pointer-events-auto"
        />

        <div className="flex-1 flex pointer-events-auto overflow-hidden">
          <div className="w-1/2 pr-6 flex flex-col gap-5 items-end text-right pt-16">
            {normalItems.map((item, i) => (
              <div key={i} className="w-full">
                <h4 contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(item), 'label', e.currentTarget.innerText)} className="font-outfit font-black text-[9px] uppercase tracking-widest text-zinc-600 mb-1">{item.label}</h4>
                <p 
                  contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(item), 'value', e.currentTarget.innerText)}
                  className="font-playfair text-zinc-400 text-sm"
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
          <div className="w-1/2 pl-6 flex flex-col gap-6 items-start text-left pt-2 pb-4">
            {highlightItems.map((item, i) => (
              <div key={i} className="w-full drop-shadow-xl z-20">
                <h4 contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(item), 'label', e.currentTarget.innerText)} className="font-outfit font-black text-[9px] uppercase tracking-widest mb-1" style={{ color: brandColor }}>{item.label}</h4>
                <p 
                  contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(item), 'value', e.currentTarget.innerText)}
                  className="font-playfair font-bold text-white text-base"
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ComparisonVariant10(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [];
  const normalItems = items.filter(it => !it.highlight);
  const highlightItems = items.filter(it => it.highlight);
  
  const mercadoLabel = normalItems[0]?.label || 'Mercado';
  const brandLabel = highlightItems[0]?.label || brandHandle || 'Alice Mode';

  return (
    <div className="w-full h-full bg-[#080808] flex flex-col p-10 relative overflow-hidden items-center text-center">
      <div className="absolute top-0 left-0 w-full p-8 z-50 w-full text-left">
        <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandColor={brandColor} isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}

              />
      </div>
      
      <ComparisonTitle 
        data={data} index={index} scale={sTitle} 
        onActionStart={onActionStart} onTextChange={onTextChange} 
        selectedElement={selectedElement} onSelectElement={onSelectElement}
        wrapperClasses="mb-10 shrink-0 mt-8"
      />

      <div className="w-64 h-12 bg-[#050505] rounded-full border border-white/10 flex items-center p-1 mb-8 shadow-inner shrink-0">
        <div contentEditable suppressContentEditableWarning className="flex-1 text-[10px] font-outfit font-bold uppercase tracking-widest text-zinc-600 px-2 leading-tight">{mercadoLabel}</div>
        <div contentEditable suppressContentEditableWarning className="flex-1 h-full rounded-full flex items-center justify-center text-[10px] font-outfit font-bold uppercase tracking-widest text-white shadow-md px-2 leading-tight" style={{ backgroundColor: brandColor }}>{brandLabel}</div>
      </div>
      
      <div className="w-full flex-1 bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-center gap-6 overflow-hidden">
        {highlightItems.map((item, i) => (
          <div key={i} className="flex items-center gap-4 text-left">
            <CheckCircle2 className="w-6 h-6 shrink-0" style={{ color: brandColor }} />
            <span 
              contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(item), 'value', e.currentTarget.innerText)}
              className="font-playfair font-bold text-white text-lg"
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ComparisonVariant11(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [];
  
  let leftItems = items.filter(it => !it.highlight);
  let rightItems = items.filter(it => it.highlight);
  while (leftItems.length < 3) leftItems.push({ label: 'Categoria', value: 'Falha Comum' });
  while (rightItems.length < 3) rightItems.push({ label: 'Categoria', value: 'Solução', highlight: true });
  leftItems = leftItems.slice(0, 3);
  rightItems = rightItems.slice(0, 3);
  const rowCount = 3;

  return (
    <div className="w-full h-full bg-[#E5E5E5] flex flex-col p-12 relative overflow-hidden text-black">
      <div className="absolute top-0 left-0 w-full p-8 z-50">
        <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandColor="#000000" isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}

              />
      </div>
      
      <ComparisonTitle 
        data={data} index={index} scale={sTitle} 
        onActionStart={onActionStart} onTextChange={onTextChange} 
        selectedElement={selectedElement} onSelectElement={onSelectElement}
        wrapperClasses="mb-12 shrink-0 mt-4 z-10" align="text-left" color="text-black"
      />

      <div className="flex-1 flex flex-col justify-center space-y-12 overflow-hidden pt-4 pb-4">
        {Array.from({ length: rowCount }).map((_, i) => {
          const left = leftItems[i];
          const right = rightItems[i];
          return (
            <div key={i} className="relative w-full border-b border-black/10 pb-2 flex-shrink-0">
              {left && (
                <span contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(left) !== -1 ? items.indexOf(left) : items.length, 'value', e.currentTarget.innerText)} className="font-outfit font-bold text-black/30 text-xl uppercase tracking-wider line-through decoration-red-500 decoration-4 block mr-4 z-0">
                  {left.value}
                </span>
              )}
              {right && (
                <span contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(right) !== -1 ? items.indexOf(right) : items.length, 'value', e.currentTarget.innerText)} className="absolute -top-6 right-0 font-playfair italic font-bold text-2xl transform -rotate-2 w-3/4 max-w-[70%] text-right bg-[#E5E5E5] pl-4 z-10" style={{ color: brandColor }}>
                  {right.value}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// EXPORTS & METADATA
// ==========================================

export const COMPARISON_VARIANT_COMPONENTS = {
  1: ComparisonVariant1,
  2: ComparisonVariant2,
  3: ComparisonVariant3,
  4: ComparisonVariant4,
  5: ComparisonVariant5,
  6: ComparisonVariant6,
  7: ComparisonVariant7,
  8: ComparisonVariant8,
  9: ComparisonVariant9,
  10: ComparisonVariant10,
  11: ComparisonVariant11,
};

export const COMPARISON_VARIANT_META = [
  { id: 0, nome: 'Original', badge: 'Padrão' },
  { id: 1, nome: 'Elegante', badge: null },
  { id: 2, nome: 'Split View', badge: null },
  { id: 3, nome: 'Tabela', badge: null },
  { id: 4, nome: 'Grid Mode', badge: null },
  { id: 5, nome: 'Cartões', badge: null },
  { id: 6, nome: 'Strike Bold', badge: null },
  { id: 7, nome: 'Specs', badge: 'PRO' },
  { id: 8, nome: 'Pop Out', badge: null },
  { id: 9, nome: 'Diagonal', badge: null },
  { id: 10, nome: 'Toggle', badge: null },
  { id: 11, nome: 'Correção', badge: 'PRO' },
];

