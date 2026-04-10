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
  const { data, index, slideCount, brandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [{ label: 'Comum', value: 'Item A', highlight: false }, { label: 'Premium', value: 'Item B', highlight: true }];

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col p-10 relative overflow-hidden">
      <SlideHeader index={index + 1} total={slideCount} brandHandle={brandHandle} brandColor={brandColor} isVerified={isVerified} />
      
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
  const { data, index, slideCount, brandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [];
  const normalItems = items.filter(it => !it.highlight);
  const highlightItems = items.filter(it => it.highlight);
  
  const mercadoLabel = normalItems[0]?.label || 'Mercado';
  const brandLabel = highlightItems[0]?.label || brandHandle || 'Sua Marca';

  return (
    <div className="w-full h-full flex flex-row overflow-hidden relative">
      <div className="w-1/2 h-full bg-zinc-900 p-8 pt-24 flex flex-col border-r border-black/20">
        <h3 className="font-outfit font-black text-zinc-600 tracking-widest uppercase text-xs mb-8">{mercadoLabel}</h3>
        <div className="space-y-6 flex-1 overflow-y-auto">
          {normalItems.map((item, i) => (
            <div key={i} className="pb-4 border-b border-white/5">
              <span 
                contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(item), 'value', e.currentTarget.innerText)}
                className="block font-playfair text-zinc-400 text-lg leading-tight"
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/2 h-full p-8 pt-24 flex flex-col" style={{ backgroundColor: brandColor }}>
        <h3 className="font-outfit font-black text-black/50 tracking-widest uppercase text-xs mb-8 line-clamp-1">{brandLabel}</h3>
        <div className="space-y-6 flex-1 overflow-y-auto">
          {highlightItems.map((item, i) => (
            <div key={i} className="pb-4 border-b border-black/10">
              <span 
                contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(item), 'value', e.currentTarget.innerText)}
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
        <SlideHeader index={index + 1} total={slideCount} brandHandle={brandHandle} brandColor={brandColor} isVerified={isVerified} />
      </div>
      {/* Title is hidden in this variant as per layout, but we could add if needed. Keeping true to mockup. */}
    </div>
  );
}

export function ComparisonVariant3(props) {
  const { data, index, slideCount, brandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [];
  const midPoint = Math.ceil(items.length / 2);
  const leftItems = items.filter(it => !it.highlight);
  const rightItems = items.filter(it => it.highlight);
  // Match row by row
  const rowCount = Math.max(leftItems.length, rightItems.length);

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col p-10 relative overflow-hidden">
      <SlideHeader index={index + 1} total={slideCount} brandHandle={brandHandle} brandColor={brandColor} isVerified={isVerified} />
      
      <div className="flex-1 flex flex-col justify-center pt-8 overflow-hidden">
        <ComparisonTitle 
          data={data} index={index} scale={sTitle} 
          onActionStart={onActionStart} onTextChange={onTextChange} 
          selectedElement={selectedElement} onSelectElement={onSelectElement}
          wrapperClasses="mb-10 text-center shrink-0"
        />

        <div className="bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-6 flex-1 overflow-y-auto shadow-2xl flex flex-col justify-start">
          {Array.from({ length: rowCount }).map((_, i) => {
            const left = leftItems[i];
            const right = rightItems[i];
            const leftIndex = items.indexOf(left);
            const rightIndex = items.indexOf(right);

            return (
              <div key={i} className="flex items-center justify-between py-5 border-b border-white/5 last:border-0 gap-4 shrink-0">
                <div className="flex-1 text-right">
                  {left && (
                    <span 
                      contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, leftIndex, 'value', e.currentTarget.innerText)}
                      className="font-playfair text-zinc-500 text-sm line-clamp-2"
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
                      className="font-outfit font-bold text-white text-base line-clamp-2" style={{ color: brandColor }}
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
  const { data, index, slideCount, brandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [];

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col p-10 relative overflow-hidden">
      <SlideHeader index={index + 1} total={slideCount} brandHandle={brandHandle} brandColor={brandColor} isVerified={isVerified} />
      
      <div className="flex-1 flex flex-col justify-center pt-8 overflow-hidden">
        <ComparisonTitle 
          data={data} index={index} scale={sTitle} 
          onActionStart={onActionStart} onTextChange={onTextChange} 
          selectedElement={selectedElement} onSelectElement={onSelectElement}
          wrapperClasses="mb-8 shrink-0" align="text-left"
        />

        <div className="grid grid-cols-2 gap-4 flex-1 overflow-y-auto pr-1">
          {items.map((item, i) => (
            <div 
              key={i} 
              className={`p-5 rounded-2xl flex flex-col justify-between border ${item.highlight ? 'bg-white text-black shadow-xl' : 'bg-transparent text-white border-white/20'}`}
              style={item.highlight ? { borderColor: 'white' } : {}}
            >
              <span 
                contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)}
                className={`font-outfit font-black text-[9px] tracking-widest uppercase mb-4 ${item.highlight ? '' : 'text-zinc-500'}`}
                style={item.highlight ? { color: brandColor } : {}}
              >
                {item.label}
              </span>
              <span 
                contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'value', e.currentTarget.innerText)}
                className={`font-playfair text-sm leading-snug line-clamp-3 ${item.highlight ? 'font-bold' : 'italic text-zinc-400'}`}
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
  const { data, index, slideCount, brandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [];
  const normalItems = items.filter(it => !it.highlight);
  const highlightItems = items.filter(it => it.highlight);

  const mercadoLabel = normalItems[0]?.label || 'Mercado';
  const brandLabel = highlightItems[0]?.label || brandHandle || 'Alice Standard';

  return (
    <div className="w-full h-full bg-[#E5E5E5] flex flex-col p-10 relative overflow-hidden text-black">
      <SlideHeader index={index + 1} total={slideCount} brandHandle={brandHandle} brandColor="#000000" isVerified={isVerified} />
      
      <div className="flex-1 flex flex-col pt-16 overflow-hidden relative">
        <ComparisonTitle 
          data={data} index={index} scale={sTitle} 
          onActionStart={onActionStart} onTextChange={onTextChange} 
          selectedElement={selectedElement} onSelectElement={onSelectElement}
          wrapperClasses="mb-10 text-center shrink-0" color="text-black"
        />

        <div className="relative flex-1">
          <div className="absolute top-0 left-4 right-12 bottom-12 bg-white border border-black/10 rounded-3xl p-8 shadow-md transform -rotate-3 z-0 blur-[1px] flex flex-col gap-4 opacity-50 overflow-hidden">
            <h4 className="font-outfit font-black text-xs tracking-widest uppercase text-zinc-400">{mercadoLabel}</h4>
            {normalItems.map((item, i) => (
              <span key={i} className="font-playfair italic text-zinc-500 text-sm border-b border-black/5 pb-2 truncate">{item.value}</span>
            ))}
          </div>
          <div className="absolute top-12 left-12 right-4 bottom-0 bg-black rounded-3xl p-8 shadow-2xl z-10 flex flex-col gap-4 transform rotate-2 overflow-hidden">
            <h4 className="font-outfit font-black text-xs tracking-widest uppercase text-white" style={{ color: brandColor }}>{brandLabel}</h4>
            {highlightItems.map((item, i) => (
              <span key={i} className="font-playfair font-bold text-white text-lg border-b border-white/10 pb-4 truncate">{item.value}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ComparisonVariant6(props) {
  const { data, index, slideCount, brandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [];
  
  const leftItems = items.filter(it => !it.highlight);
  const rightItems = items.filter(it => it.highlight);
  const rowCount = Math.max(leftItems.length, rightItems.length);

  return (
    <div className="w-full h-full bg-[#020202] flex flex-col p-10 relative overflow-hidden">
      <SlideHeader index={index + 1} total={slideCount} brandHandle={brandHandle} brandColor={brandColor} isVerified={isVerified} />
      
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

        <div className="space-y-6 flex-1 overflow-y-auto pr-2">
          {Array.from({ length: rowCount }).map((_, i) => {
            const left = leftItems[i];
            const right = rightItems[i];
            return (
              <div key={i} className="flex flex-col gap-2">
                <span className="font-outfit font-black text-[10px] tracking-widest uppercase text-zinc-600">
                  {(left?.label || 'Comum')} vs {(right?.label || 'Premium')}
                </span>
                {left && (
                  <span className="font-playfair text-zinc-500 text-base line-through decoration-zinc-700 decoration-2">{left.value}</span>
                )}
                {right && (
                  <span className="font-playfair font-bold text-white text-xl" style={{ color: brandColor }}>{right.value}</span>
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
  const { data, index, slideCount, brandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [];
  
  const leftItems = items.filter(it => !it.highlight);
  const rightItems = items.filter(it => it.highlight);
  const rowCount = Math.max(leftItems.length, rightItems.length);
  
  const mercadoLabel = leftItems[0]?.label || 'Mercado';
  const brandLabel = rightItems[0]?.label || brandHandle || 'Alice';

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col p-10 relative overflow-hidden">
      <SlideHeader index={index + 1} total={slideCount} brandHandle={brandHandle} brandColor={brandColor} isVerified={isVerified} />
      
      <div className="flex-1 flex flex-col justify-center pt-8 overflow-hidden">
        <ComparisonTitle 
          data={data} index={index} scale={sTitle} 
          onActionStart={onActionStart} onTextChange={onTextChange} 
          selectedElement={selectedElement} onSelectElement={onSelectElement}
          wrapperClasses="mb-8 text-center shrink-0"
        />

        <div className="flex-1 overflow-y-auto text-sm border border-white/10 rounded-2xl bg-zinc-900/50 flex flex-col">
          <div className="flex border-b border-white/10 bg-black/40 shrink-0">
            <div className="w-1/2 p-4 text-center font-outfit font-bold text-[10px] uppercase tracking-widest text-zinc-500">{mercadoLabel}</div>
            <div className="w-1/2 p-4 text-center font-outfit font-bold text-[10px] uppercase tracking-widest text-white border-l border-white/10" style={{ backgroundColor: `${brandColor}20`, color: brandColor }}>{brandLabel}</div>
          </div>
          <div className="overflow-y-auto flex-1">
            {Array.from({ length: rowCount }).map((_, i) => {
              const left = leftItems[i];
              const right = rightItems[i];
              return (
                <div key={i} className="flex border-b border-white/5 last:border-0 items-stretch min-h-[60px]">
                  <div className="w-1/2 p-4 text-center flex items-center justify-center gap-2">
                    {left && (
                      <>
                        <X className="w-4 h-4 text-zinc-600 shrink-0" />
                        <span className="font-playfair text-zinc-400 text-sm line-clamp-2">{left.value}</span>
                      </>
                    )}
                  </div>
                  <div className="w-1/2 p-4 text-center border-l border-white/5 flex items-center justify-center gap-2 bg-[#0A0A0A]">
                    {right && (
                      <>
                        <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: brandColor }} />
                        <span className="font-playfair font-bold text-white text-sm line-clamp-2">{right.value}</span>
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
  const { data, index, slideCount, brandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [];
  const normalItems = items.filter(it => !it.highlight);
  const highlightItems = items.filter(it => it.highlight);
  const mercadoLabel = normalItems[0]?.label || 'Mercado';
  const brandLabel = highlightItems[0]?.label || brandHandle || 'Padrão';

  return (
    <div className="w-full h-full bg-[#080808] flex flex-col p-10 relative overflow-hidden">
      <SlideHeader index={index + 1} total={slideCount} brandHandle={brandHandle} brandColor={brandColor} isVerified={isVerified} />
      
      <ComparisonTitle 
        data={data} index={index} scale={sTitle} 
        onActionStart={onActionStart} onTextChange={onTextChange} 
        selectedElement={selectedElement} onSelectElement={onSelectElement}
        wrapperClasses="mb-6 shrink-0 mt-8 z-20" align="text-left"
      />

      <div className="flex-1 relative overflow-hidden mt-4">
        <div className="absolute top-4 left-0 w-4/5 bottom-20 bg-zinc-900 border border-zinc-700 rounded-3xl p-6 shadow-md z-0 opacity-60 overflow-y-auto">
          <h4 className="font-outfit font-bold text-xs uppercase tracking-widest text-zinc-500 mb-4">{mercadoLabel}</h4>
          <ul className="space-y-3">
            {normalItems.map((item, i) => (
              <li key={i} className="font-playfair text-zinc-400 text-sm">• {item.value}</li>
            ))}
          </ul>
        </div>
        <div className="absolute top-16 right-0 w-4/5 bottom-8 rounded-3xl p-6 shadow-2xl z-10 flex flex-col" style={{ backgroundColor: brandColor }}>
          <h4 className="font-outfit font-black text-xs uppercase tracking-widest text-black/50 mb-4 shrink-0">{brandLabel}</h4>
          <ul className="space-y-4 overflow-y-auto flex-1">
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
  const { data, index, slideCount, brandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [];
  const normalItems = items.filter(it => !it.highlight);
  const highlightItems = items.filter(it => it.highlight);
  
  return (
    <div className="w-full h-full bg-[#050505] flex relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full p-8 z-50">
        <SlideHeader index={index + 1} total={slideCount} brandHandle={brandHandle} brandColor={brandColor} isVerified={isVerified} />
      </div>
      <div className="absolute inset-0 bg-zinc-900 clip-diagonal z-0" style={{ clipPath: 'polygon(0px 0px, 45% 0px, 55% 100%, 0px 100%)' }}></div>
      
      <div className="absolute inset-0 z-10 flex flex-col p-10 pt-20 pointer-events-none">
        <ComparisonTitle 
          data={data} index={index} scale={sTitle} 
          onActionStart={onActionStart} onTextChange={onTextChange} 
          selectedElement={selectedElement} onSelectElement={onSelectElement}
          wrapperClasses="mb-10 text-center pointer-events-auto"
        />

        <div className="flex-1 flex pointer-events-auto overflow-y-auto">
          <div className="w-1/2 pr-6 flex flex-col gap-6 items-end text-right">
            {normalItems.map((item, i) => (
              <div key={i} className="w-full">
                <h4 className="font-outfit font-black text-[9px] uppercase tracking-widest text-zinc-600 mb-1 line-clamp-1">{item.label}</h4>
                <p 
                  contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(item), 'value', e.currentTarget.innerText)}
                  className="font-playfair text-zinc-400 text-sm"
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
          <div className="w-1/2 pl-6 flex flex-col gap-6 items-start text-left pt-12">
            {highlightItems.map((item, i) => (
              <div key={i} className="w-full">
                <h4 className="font-outfit font-black text-[9px] uppercase tracking-widest mb-1 line-clamp-1" style={{ color: brandColor }}>{item.label}</h4>
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
  const { data, index, slideCount, brandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [];
  const normalItems = items.filter(it => !it.highlight);
  const highlightItems = items.filter(it => it.highlight);
  
  const mercadoLabel = normalItems[0]?.label || 'Mercado';
  const brandLabel = highlightItems[0]?.label || brandHandle || 'Alice Mode';

  return (
    <div className="w-full h-full bg-[#080808] flex flex-col p-10 relative overflow-hidden items-center text-center">
      <div className="absolute top-0 left-0 w-full p-8 z-50 w-full text-left">
        <SlideHeader index={index + 1} total={slideCount} brandHandle={brandHandle} brandColor={brandColor} isVerified={isVerified} />
      </div>
      
      <ComparisonTitle 
        data={data} index={index} scale={sTitle} 
        onActionStart={onActionStart} onTextChange={onTextChange} 
        selectedElement={selectedElement} onSelectElement={onSelectElement}
        wrapperClasses="mb-10 shrink-0 mt-8"
      />

      <div className="w-64 h-12 bg-[#050505] rounded-full border border-white/10 flex items-center p-1 mb-8 shadow-inner shrink-0">
        <div className="flex-1 text-[10px] font-outfit font-bold uppercase tracking-widest text-zinc-600 line-clamp-1 truncate px-2">{mercadoLabel}</div>
        <div className="flex-1 h-full rounded-full flex items-center justify-center text-[10px] font-outfit font-bold uppercase tracking-widest text-white shadow-md line-clamp-1 truncate px-2" style={{ backgroundColor: brandColor }}>{brandLabel}</div>
      </div>
      
      <div className="w-full flex-1 bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-center gap-6 overflow-y-auto">
        {highlightItems.map((item, i) => (
          <div key={i} className="flex items-center gap-4 text-left">
            <CheckCircle2 className="w-6 h-6 shrink-0" style={{ color: brandColor }} />
            <span 
              contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(item), 'value', e.currentTarget.innerText)}
              className="font-playfair font-bold text-white text-lg line-clamp-2"
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
  const { data, index, slideCount, brandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [];
  
  const leftItems = items.filter(it => !it.highlight);
  const rightItems = items.filter(it => it.highlight);
  const rowCount = Math.max(leftItems.length, rightItems.length);

  return (
    <div className="w-full h-full bg-[#E5E5E5] flex flex-col p-12 relative overflow-hidden text-black">
      <div className="absolute top-0 left-0 w-full p-8 z-50">
        <SlideHeader index={index + 1} total={slideCount} brandHandle={brandHandle} brandColor="#000000" isVerified={isVerified} />
      </div>
      
      <ComparisonTitle 
        data={data} index={index} scale={sTitle} 
        onActionStart={onActionStart} onTextChange={onTextChange} 
        selectedElement={selectedElement} onSelectElement={onSelectElement}
        wrapperClasses="mb-12 shrink-0 mt-4" align="text-left" color="text-black"
      />

      <div className="flex-1 flex flex-col justify-start space-y-12 overflow-y-auto pt-4">
        {Array.from({ length: rowCount }).map((_, i) => {
          const left = leftItems[i];
          const right = rightItems[i];
          return (
            <div key={i} className="relative w-full border-b border-black/10 pb-2 flex-shrink-0">
              {left && (
                <span className="font-outfit font-bold text-black/30 text-xl uppercase tracking-wider line-through decoration-red-500 decoration-4 block line-clamp-1 mr-4">
                  {left.value}
                </span>
              )}
              {right && (
                <span className="absolute -top-6 right-0 font-playfair italic font-bold text-2xl transform -rotate-2 max-w-[60%] text-right line-clamp-2 bg-[#E5E5E5] pl-2" style={{ color: brandColor }}>
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
