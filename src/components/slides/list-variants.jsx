import React from 'react';
import { CheckCircle2, Star } from 'lucide-react';
import SmartElement from '../smart-element';
import SlideHeader from '../slide-header';

// ==========================================
// HELPERS
// ==========================================

const ListTitle = ({ data, index, scale, onActionStart, onTextChange, selectedElement, onSelectElement, align = 'text-left', color = 'text-white', wrapperClasses = 'mb-10 text-left shrink-0', className = '' }) => {
  return (
    <div className={wrapperClasses}>
      <SmartElement
        slideIndex={index}
        field="titulo"
        position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
        onActionStart={onActionStart}
        isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
        onSelectElement={onSelectElement}
        className="w-full"
      >
        <h2
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onTextChange && onTextChange(index, 'titulo', e.currentTarget.innerText)}
          className={`font-outfit font-black ${color} tracking-tighter leading-none outline-none line-clamp-2 overflow-hidden ${align} ${className}`}
          style={{ fontSize: `${30 * scale}px` }}
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

export function ListVariant1(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [{ label: 'Item', text: 'Text' }];

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col p-10 relative overflow-hidden">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition} />
      
      <div className="flex-1 flex flex-col justify-center pt-8 overflow-hidden">
        <div className="flex items-center gap-5 mb-10 shrink-0">
          <div className="w-12 h-12 border rounded-[1rem] flex items-center justify-center shrink-0" style={{ backgroundColor: `${brandColor}15`, borderColor: `${brandColor}30` }}>
            <CheckCircle2 className="w-7 h-7" style={{ color: brandColor }} />
          </div>
          <ListTitle data={data} index={index} scale={sTitle} onActionStart={onActionStart} onTextChange={onTextChange} selectedElement={selectedElement} onSelectElement={onSelectElement} wrapperClasses="w-full" />
        </div>
        
        <div className="space-y-6 flex-1 overflow-y-auto pr-2">
          {items.map((item, i) => (
            <div key={i} className="flex gap-6 items-start group">
              <div className="font-outfit font-black text-base opacity-30 mt-1 pointer-events-none" style={{ color: brandColor }}>0{i + 1}</div>
              <div className="flex-1 border-b border-white/5 pb-4">
                <h4 contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)} className="font-outfit font-bold text-white text-[14px] uppercase tracking-widest mb-1 outline-none line-clamp-1">{item.label}</h4>
                <p contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)} className="font-playfair text-zinc-400 text-sm leading-snug outline-none line-clamp-2">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ListVariant2(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [{ label: 'Item', text: 'Text' }];

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col p-10 relative overflow-hidden">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition} />
      
      <div className="flex-1 flex flex-col pt-6 overflow-hidden">
        <ListTitle data={data} index={index} scale={sTitle} onActionStart={onActionStart} onTextChange={onTextChange} selectedElement={selectedElement} onSelectElement={onSelectElement} align="text-center" wrapperClasses="mb-3 shrink-0 text-center w-full" />
        
        <div className="grid grid-cols-1 gap-2 flex-1 overflow-hidden flex flex-col justify-center">
          {items.map((item, i) => (
            <div key={i} className="bg-[#0A0A0A] border-l-4 p-3 rounded-r-2xl shadow-xl flex flex-col justify-center group" style={{ borderLeftColor: brandColor }}>
              <h4 contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)} className="font-outfit font-black text-white text-[11px] uppercase tracking-widest mb-1 outline-none line-clamp-1">{item.label}</h4>
              <p contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)} className="font-playfair text-zinc-400 text-xs line-clamp-2 outline-none">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ListVariant3(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [{ label: 'Item', text: 'Text' }];

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col p-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-cover opacity-10 grayscale" style={{ backgroundImage: `url('${data.imageUrl || ''}')`, backgroundPosition: 'center 50%' }}></div>
      <div className="absolute inset-0 pointer-events-none z-[60]">
        <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition} />
      </div>
      
      <div className="flex-1 flex flex-col justify-center pt-8 relative z-10 overflow-hidden">
        <ListTitle data={data} index={index} scale={sTitle * 1.2} onActionStart={onActionStart} onTextChange={onTextChange} selectedElement={selectedElement} onSelectElement={onSelectElement} align="text-left drop-shadow-md" wrapperClasses="mb-10 shrink-0 w-full" />
        
        <div className="relative pl-6 border-l-2 flex-1 overflow-y-auto space-y-8" style={{ borderColor: `${brandColor}40` }}>
          {items.map((item, i) => (
            <div key={i} className="relative group">
              <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full border-2 border-[#050505]" style={{ backgroundColor: brandColor }}></div>
              <h4 contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)} className="font-outfit font-bold text-white text-base mb-1 outline-none line-clamp-1">{item.label}</h4>
              <p contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)} className="font-playfair text-zinc-300 text-sm leading-relaxed outline-none line-clamp-3">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ListVariant4(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [{ label: 'Item', text: 'Text' }];

  return (
    <div className="w-full h-full bg-[#080808] flex flex-col p-10 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-[60]"><SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition} /></div>
      
      <div className="flex-1 flex flex-col justify-center pt-6 overflow-hidden">
        <ListTitle data={data} index={index} scale={sTitle * 0.8} onActionStart={onActionStart} onTextChange={onTextChange} selectedElement={selectedElement} onSelectElement={onSelectElement} align="text-center border-b border-white/10 pb-3 inline-block" wrapperClasses="mb-3 shrink-0 text-center w-full flex justify-center" />
        
        <div className="flex-1 overflow-y-auto flex flex-col justify-center items-center relative py-2 w-full">
          <div className="absolute top-0 bottom-0 w-px bg-surface-input/30 left-1/2 -translate-x-1/2 pointer-events-none"></div>
          {items.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={i} className={`w-full flex items-center mb-2 last:mb-0 relative z-10 group ${isLeft ? 'justify-start' : 'justify-end'}`}>
                <div className={`w-[45%] bg-[#0A0A0A] p-3 rounded-2xl border border-white/5 shadow-xl ${isLeft ? 'text-right' : 'text-left'}`}>
                  <h4 contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)} className="font-outfit font-bold text-white text-[9px] uppercase tracking-widest mb-1 outline-none line-clamp-1" style={{ color: brandColor }}>{item.label}</h4>
                  <p contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)} className="font-playfair text-zinc-400 text-[11px] leading-snug outline-none line-clamp-3">{item.text}</p>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 border-[#080808]" style={{ backgroundColor: brandColor }}></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function ListVariant5(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [{ label: 'Item', text: 'Text' }];

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col p-10 relative overflow-hidden">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition} />
      
      <div className="flex-1 flex flex-col justify-center pt-8 overflow-hidden">
        <ListTitle data={data} index={index} scale={sTitle * 1.05} onActionStart={onActionStart} onTextChange={onTextChange} selectedElement={selectedElement} onSelectElement={onSelectElement} align="text-left" wrapperClasses="mb-8 shrink-0 w-full" />
        
        <div className="relative flex-1 flex flex-col pt-2 pb-4 overflow-y-visible">
          {items.map((item, i) => {
            const isFirst = i === 0;
            return (
              <div key={i} className="relative w-full bg-zinc-900 border border-white/10 rounded-[1.5rem] p-5 shadow-2xl transition-all group" style={{ marginTop: isFirst ? '0px' : '-1rem', zIndex: 10 - i, transform: `scale(${1 - (i * 0.02)})` }}>
                <div className="flex justify-between items-center mb-1">
                  <h4 contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)} className="font-outfit font-bold text-white text-[11px] uppercase tracking-widest outline-none line-clamp-1">{item.label}</h4>
                  <span className="font-outfit font-black text-lg opacity-20 pointer-events-none">0{i + 1}</span>
                </div>
                <p contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)} className="font-playfair text-zinc-400 text-sm outline-none line-clamp-2">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function ListVariant6(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [{ label: 'Item', text: 'Text' }];

  return (
    <div className="w-full h-full bg-[#080808] flex flex-col p-8 relative overflow-hidden">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition} />
      
      <div className="flex-1 flex flex-col pt-12 overflow-hidden">
        <ListTitle data={data} index={index} scale={sTitle * 1.05} onActionStart={onActionStart} onTextChange={onTextChange} selectedElement={selectedElement} onSelectElement={onSelectElement} align="text-left" wrapperClasses="mb-6 shrink-0 w-full" />
        
        <div className="flex-1 grid grid-cols-2 grid-rows-3 gap-3 overflow-hidden">
          {items.map((item, i) => {
            const isFirst = i === 0;
            return (
              <div key={i} className={`bg-zinc-900 rounded-[1.5rem] p-5 flex flex-col justify-between border border-white/5 hover:border-white/20 transition-all group ${isFirst ? 'col-span-2 row-span-2 bg-gradient-to-br from-zinc-900 to-black' : 'col-span-1 row-span-1'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-3 h-3 fill-current" style={{ color: brandColor }} />
                  <h4 contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)} className={`font-outfit font-bold text-white uppercase tracking-widest outline-none line-clamp-1 ${isFirst ? 'text-xs' : 'text-[9px]'}`}>{item.label}</h4>
                </div>
                <p contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)} className={`font-playfair text-zinc-400 leading-relaxed outline-none ${isFirst ? 'text-base line-clamp-4' : 'text-xs line-clamp-3'}`}>{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function ListVariant7(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [{ label: 'Item', text: 'Text' }];

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col p-10 relative overflow-hidden">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition} />
      
      <div className="flex-1 flex flex-col justify-center pt-4 overflow-hidden">
        <ListTitle data={data} index={index} scale={sTitle * 0.85} onActionStart={onActionStart} onTextChange={onTextChange} selectedElement={selectedElement} onSelectElement={onSelectElement} align="text-left" wrapperClasses="mb-3 shrink-0 w-full" />
        
        <div className="flex-1 overflow-hidden pr-2 relative flex flex-col justify-center">
          <div className="absolute top-0 bottom-0 left-4 w-1 bg-surface-input/30 pointer-events-none"></div>
          <div className="space-y-3 relative z-10 overflow-y-auto">
            {items.map((item, i) => (
              <div key={i} className="flex gap-5 items-center group">
                <div className="w-8 h-8 rounded-full bg-black border-4 border-[#050505] flex items-center justify-center shrink-0 z-10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: brandColor }}></div>
                </div>
                <div className="bg-zinc-900 p-2.5 rounded-xl flex-1 border border-white/5">
                  <h4 contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)} className="font-outfit font-bold text-white text-[11px] uppercase tracking-widest mb-1 outline-none line-clamp-1">{item.label}</h4>
                  <p contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)} className="font-playfair text-zinc-400 text-xs line-clamp-2 outline-none">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ListVariant8(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [{ label: 'Item', text: 'Text' }];

  return (
    <div className="w-full h-full bg-[#080808] flex flex-col p-10 relative overflow-hidden">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition} />
      
      <div className="flex-1 flex flex-col justify-center pt-8 overflow-hidden">
        <ListTitle data={data} index={index} scale={sTitle * 1.05} onActionStart={onActionStart} onTextChange={onTextChange} selectedElement={selectedElement} onSelectElement={onSelectElement} align="text-left" wrapperClasses="mb-6 shrink-0 w-full" />
        
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {items.map((item, i) => (
            <div key={i} className="bg-surface-input/30 rounded-2xl p-5 relative overflow-hidden border border-white/5 flex flex-col justify-center min-h-[90px] group">
              <div className="absolute -right-4 -bottom-6 font-outfit font-black text-white/5 text-[100px] leading-none pointer-events-none">0{i + 1}</div>
              <h4 contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)} className="font-outfit font-bold text-white text-xs uppercase tracking-widest mb-1 relative z-10 outline-none line-clamp-1" style={{ color: brandColor }}>{item.label}</h4>
              <p contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)} className="font-playfair text-zinc-300 text-sm relative z-10 outline-none line-clamp-2">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ListVariant9(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [{ label: 'Item', text: 'Text' }];

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col p-8 relative overflow-hidden">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition} />
      
      <div className="flex-1 flex flex-col pt-12 overflow-hidden">
        <ListTitle data={data} index={index} scale={sTitle} onActionStart={onActionStart} onTextChange={onTextChange} selectedElement={selectedElement} onSelectElement={onSelectElement} align="text-center" wrapperClasses="mb-6 shrink-0 text-center w-full" />
        
        <div className="flex-1 grid grid-cols-2 gap-3 overflow-y-auto pr-1">
          {items.map((item, i) => (
            <div key={i} className="bg-gradient-to-br from-zinc-900 to-black rounded-2xl p-5 border border-white/10 flex flex-col justify-center group">
              <div className="w-6 h-6 rounded-full flex items-center justify-center font-outfit font-black text-[10px] text-white mb-3 shrink-0 pointer-events-none" style={{ backgroundColor: brandColor }}>{i + 1}</div>
              <h4 contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)} className="font-outfit font-bold text-white text-[10px] uppercase tracking-widest mb-1 leading-snug outline-none line-clamp-1">{item.label}</h4>
              <p contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)} className="font-playfair text-zinc-400 text-[11px] line-clamp-3 outline-none">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ListVariant10(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [{ label: 'Item', text: 'Text' }];

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col p-10 relative overflow-hidden">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition} />
      
      <ListTitle data={data} index={index} scale={sTitle * 1.1} onActionStart={onActionStart} onTextChange={onTextChange} selectedElement={selectedElement} onSelectElement={onSelectElement} align="text-left" wrapperClasses="mb-8 shrink-0 mt-8 w-full" />
      
      <div className="flex-1 flex flex-col space-y-4 pr-1 overflow-y-auto">
        {items.map((item, i) => (
          <div key={i} className="bg-surface-input/30 border border-white/10 rounded-2xl p-4 shadow-lg flex items-center gap-4 group" style={{ marginLeft: `${Math.min(i * 15, 60)}px` }}>
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center font-outfit font-black text-xs border border-white/10 text-zinc-400 shrink-0 pointer-events-none">0{i + 1}</div>
            <div className="flex-1">
              <h4 contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)} className="font-outfit font-bold text-[11px] uppercase tracking-widest mb-1 text-white outline-none line-clamp-1">{item.label}</h4>
              <p contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)} className="font-playfair text-zinc-400 text-xs line-clamp-2 outline-none">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ListVariant11(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [{ label: 'Item', text: 'Text' }];

  return (
    <div className="w-full h-full bg-zinc-950 flex flex-col p-10 relative overflow-hidden items-center text-center">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition} />
      
      <ListTitle data={data} index={index} scale={sTitle * 1.25} onActionStart={onActionStart} onTextChange={onTextChange} selectedElement={selectedElement} onSelectElement={onSelectElement} align="text-center" wrapperClasses="mb-8 shrink-0 mt-8 w-full" />
      
      <div className="flex-1 flex flex-wrap content-start justify-center gap-2 overflow-hidden pt-2 w-full">
        <div className="flex flex-wrap justify-center gap-2 mb-1">
          {items.map((item, i) => (
            <div key={`badge-${i}`} className="bg-[#050505] border border-zinc-800 rounded-full px-4 py-2 flex items-center gap-3 shadow-lg group">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: brandColor }}></div>
              <span contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)} className="font-outfit font-bold text-[10px] uppercase tracking-widest text-white outline-none block max-w-[150px] truncate">{item.label}</span>
            </div>
          ))}
        </div>
        
        <div className="w-full mt-2 space-y-2">
          {items.map((item, i) => (
            <div key={`text-${i}`} className="w-full p-3 border border-zinc-800 rounded-3xl bg-[#020202] group text-center">
              <p contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)} className="font-playfair text-zinc-400 text-sm italic outline-none">"{item.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ListVariant12(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [{ label: 'Item', text: 'Text' }];

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col p-10 relative overflow-hidden">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition} />
      
      <div className="flex-1 flex flex-col justify-center pt-8 overflow-hidden">
        <ListTitle data={data} index={index} scale={sTitle * 1.1} onActionStart={onActionStart} onTextChange={onTextChange} selectedElement={selectedElement} onSelectElement={onSelectElement} align="text-left" wrapperClasses="mb-10 shrink-0 w-full" />
        
        <div className="space-y-4 flex-1 overflow-hidden pr-2 flex flex-col justify-center">
          {items.map((item, i) => (
            <div key={i} className="flex gap-5 items-center bg-surface-input/30 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-all group overflow-hidden">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-lg" style={{ backgroundColor: `${brandColor}20`, border: `1px solid ${brandColor}40` }}>
                <CheckCircle2 className="w-4 h-4" style={{ color: brandColor }} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)} className="font-outfit font-black text-white text-[12px] uppercase tracking-[0.15em] outline-none line-clamp-1 truncate">{item.label}</h4>
                <p contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)} className="font-playfair text-zinc-400 text-xs leading-snug outline-none line-clamp-3 italic break-words max-w-full">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ListVariant13(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [{ label: 'Item', text: 'Text' }];

  return (
    <div className="w-full h-full bg-[#080808] flex flex-col p-12 relative overflow-hidden">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition} />
      
      <div className="flex-1 flex flex-col justify-center pt-8 overflow-hidden">
        <ListTitle data={data} index={index} scale={sTitle * 1.2} onActionStart={onActionStart} onTextChange={onTextChange} selectedElement={selectedElement} onSelectElement={onSelectElement} align="text-left" wrapperClasses="mb-12 shrink-0 w-full" />
        
        <div className="space-y-12 flex-1 overflow-hidden pr-2 pt-10 flex flex-col justify-center">
          {items.map((item, i) => (
            <div key={i} className="relative flex flex-col justify-center min-h-[60px] group">
              {/* Ajustado posicionamento para não cortar o número */}
              <div className="absolute -left-4 -top-12 font-outfit font-black text-[100px] leading-none opacity-10 pointer-events-none select-none italic" style={{ color: brandColor }}>0{i + 1}</div>
              <div className="relative z-10 pl-12 border-l-2" style={{ borderColor: brandColor }}>
                <h4 contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)} className="font-outfit font-black text-white text-lg uppercase tracking-tighter mb-1 outline-none line-clamp-1">{item.label}</h4>
                <p contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)} className="font-playfair text-zinc-400 text-sm leading-relaxed outline-none line-clamp-2 italic break-words max-w-[90%]">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// EXPORTS & METADATA
// ==========================================

export const LIST_VARIANT_COMPONENTS = {
  1: ListVariant1,
  2: ListVariant2,
  3: ListVariant3,
  4: ListVariant4,
  5: ListVariant5,
  6: ListVariant6,
  7: ListVariant7,
  8: ListVariant8,
  9: ListVariant9,
  10: ListVariant10,
  11: ListVariant11,
  12: ListVariant12,
  13: ListVariant13,
};

export const LIST_VARIANT_META = [
  { id: 0, nome: 'Original', badge: 'Padrão' },
  { id: 1, nome: 'Dark Check', badge: null },
  { id: 2, nome: 'Side Bar', badge: null },
  { id: 3, nome: 'Bullet Minimal', badge: null },
  { id: 4, nome: 'Timeline', badge: 'PRO' },
  { id: 5, nome: 'Stacked', badge: null },
  { id: 6, nome: 'Bento Grid', badge: 'PRO' },
  { id: 7, nome: 'Line Connect', badge: null },
  { id: 8, nome: 'Big Numbers', badge: null },
  { id: 9, nome: 'Grid Mode', badge: null },
  { id: 10, nome: 'Staggered', badge: null },
  { id: 11, nome: 'Badges', badge: 'PRO' },
  { id: 12, nome: 'Checklist Gold', badge: 'NEW' },
  { id: 13, nome: 'Step-by-Step', badge: 'NEW' },
];

