import React from 'react';
import { CheckCircle2, Star, Check } from 'lucide-react';
import SmartElement from '../smart-element';
import SlideHeader from '../slide-header';

// ==========================================
// HELPERS
// ==========================================

const SmartEl = SmartElement;

function TextWrapper({ field, index, onTextChange, as: Component = 'div', className, style, children, ...props }) {
  return (
    <Component
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => onTextChange && onTextChange(index, field, e.currentTarget.innerText)}
      className={`outline-none ${className || ''}`}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
}

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
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition} hideDot={true} />
      
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
              <div 
                contentEditable 
                suppressContentEditableWarning 
                onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)}
                className="font-outfit font-black text-base opacity-30 mt-1 outline-none" 
                style={{ color: brandColor }}
              >
                {item.label || `0${i + 1}`}
              </div>
              <div className="flex-1 border-b border-white/5 pb-4">

                <p contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)} className="font-playfair text-zinc-400 text-sm leading-snug outline-none line-clamp-2 mt-1">{item.text}</p>
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
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition} hideDot={true} />
      
      <div className="flex-1 flex flex-col pt-6 overflow-hidden">
        <ListTitle data={data} index={index} scale={sTitle} onActionStart={onActionStart} onTextChange={onTextChange} selectedElement={selectedElement} onSelectElement={onSelectElement} align="text-center" wrapperClasses="mb-3 shrink-0 text-center w-full" />
        
        <div className="grid grid-cols-1 gap-2 flex-1 overflow-hidden flex flex-col justify-center">
          {items.map((item, i) => (
            <div key={i} className="p-3 rounded-r-2xl shadow-xl flex flex-col justify-center group" style={{ backgroundColor: `${brandColor}15`, borderLeft: `4px solid ${brandColor}`, border: `1px solid ${brandColor}40`, borderLeftWidth: '4px', borderLeftColor: brandColor }}>
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
    <div className="w-full h-full bg-[#050505] flex flex-col p-10 relative">
      <div className="absolute inset-0 bg-cover opacity-10 grayscale overflow-hidden" style={{ backgroundImage: `url('${data.imageUrl || ''}')`, backgroundPosition: 'center 50%' }}></div>
      <div className="absolute inset-0 pointer-events-none z-[60]">
        <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition} hideDot={true} />
      </div>
      
      <div className="flex-1 flex flex-col justify-center pt-8 relative z-10">
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
    <div className="w-full h-full bg-[#080808] flex flex-col p-10 relative">
      <div className="absolute inset-0 pointer-events-none z-[60]"><SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition} hideDot={true} /></div>
      
      <div className="flex-1 flex flex-col justify-center pt-6">
        <ListTitle data={data} index={index} scale={sTitle * 0.8} onActionStart={onActionStart} onTextChange={onTextChange} selectedElement={selectedElement} onSelectElement={onSelectElement} align="text-center border-b border-white/10 pb-3 inline-block" wrapperClasses="mb-3 shrink-0 text-center w-full flex justify-center" />
        
        <div className="flex-1 overflow-y-auto flex flex-col justify-center items-center relative py-2 w-full">
          <div className="absolute top-0 bottom-0 w-px bg-surface-input/30 left-1/2 -translate-x-1/2 pointer-events-none"></div>
          {items.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={i} className={`w-full flex items-center mb-2 last:mb-0 relative z-10 group ${isLeft ? 'justify-start' : 'justify-end'}`}>
                <div className={`w-[45%] p-3 rounded-2xl shadow-xl ${isLeft ? 'text-right' : 'text-left'}`} style={{ backgroundColor: `${brandColor}15`, borderColor: `${brandColor}40`, border: `1px solid ${brandColor}40` }}>
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
    <div className="w-full h-full bg-[#050505] flex flex-col p-10 relative">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition} hideDot={true} />
      
      <div className="flex-1 flex flex-col justify-center pt-8">
        <ListTitle data={data} index={index} scale={sTitle * 1.05} onActionStart={onActionStart} onTextChange={onTextChange} selectedElement={selectedElement} onSelectElement={onSelectElement} align="text-left" wrapperClasses="mb-8 shrink-0 w-full" />
        
        <div className="relative flex-1 flex flex-col pt-2 pb-4 overflow-y-visible">
          {items.map((item, i) => {
            const isFirst = i === 0;
            return (
              <div key={i} className="relative w-full bg-zinc-900 border border-white/10 rounded-[1.5rem] p-5 shadow-2xl transition-all group" style={{ marginTop: isFirst ? '0px' : '-1rem', zIndex: 10 - i, transform: `scale(${1 - (i * 0.02)})` }}>
                <div className="flex justify-between items-center mb-1">
                  <h4 contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)} className="font-outfit font-bold text-white text-[11px] uppercase tracking-widest outline-none line-clamp-1">{item.label}</h4>
                  <span 
                    contentEditable 
                    suppressContentEditableWarning 
                    onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)}
                    className="font-outfit font-black text-lg opacity-20 outline-none"
                  >
                    {item.label || `0${i + 1}`}
                  </span>
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
    <div className="w-full h-full bg-[#080808] flex flex-col p-8 relative">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition} hideDot={true} />
      
      <div className="flex-1 flex flex-col pt-12">
        <ListTitle data={data} index={index} scale={sTitle * 1.05} onActionStart={onActionStart} onTextChange={onTextChange} selectedElement={selectedElement} onSelectElement={onSelectElement} align="text-left" wrapperClasses="mb-6 shrink-0 w-full" />
        
        <div className="flex-1 grid grid-cols-2 grid-rows-3 gap-3">
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
    <div className="w-full h-full bg-[#050505] flex flex-col p-10 relative">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition} hideDot={true} />
      
      <div className="flex-1 flex flex-col justify-center pt-4">
        <ListTitle data={data} index={index} scale={sTitle * 0.85} onActionStart={onActionStart} onTextChange={onTextChange} selectedElement={selectedElement} onSelectElement={onSelectElement} align="text-left" wrapperClasses="mb-3 shrink-0 w-full" />
        
        <div className="flex-1 pr-2 relative flex flex-col justify-center">
          <div className="absolute top-0 bottom-0 left-4 w-1 bg-surface-input/30 pointer-events-none"></div>
          <div className="space-y-3 relative z-10 overflow-y-auto">
            {items.map((item, i) => (
              <div key={i} className="flex gap-5 items-center group">
                <div className="w-8 h-8 rounded-full bg-black border-4 border-[#050505] flex items-center justify-center shrink-0 z-10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: brandColor }}></div>
                </div>
                <div className="p-2.5 rounded-xl flex-1" style={{ backgroundColor: `${brandColor}15`, border: `1px solid ${brandColor}40` }}>
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
    <div className="w-full h-full bg-[#080808] flex flex-col p-10 relative">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition} hideDot={true} />
      
      <div className="flex-1 flex flex-col justify-center pt-8">
        <ListTitle data={data} index={index} scale={sTitle * 1.05} onActionStart={onActionStart} onTextChange={onTextChange} selectedElement={selectedElement} onSelectElement={onSelectElement} align="text-left" wrapperClasses="mb-6 shrink-0 w-full" />
        
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {items.map((item, i) => (
            <div key={i} className="rounded-2xl p-5 relative flex flex-col justify-center min-h-[90px] group" style={{ backgroundColor: `${brandColor}15`, border: `1px solid ${brandColor}40` }}>
              <div 
                contentEditable 
                suppressContentEditableWarning 
                onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)}
                className="absolute -right-4 -bottom-6 font-outfit font-black text-[100px] leading-none outline-none" 
                style={{ color: brandColor, opacity: 0.15 }}
              >
                {item.label || `0${i + 1}`}
              </div>
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
    <div className="w-full h-full bg-[#050505] flex flex-col p-8 relative">
      {data.imageUrl && (
        <div className="absolute inset-0 bg-cover blur-md scale-110 overflow-hidden" style={{ backgroundImage: `url(${data.imageUrl})`, backgroundPosition: `center ${data.imagePosition ?? 50}%`, opacity: 0.4 }} />
      )}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition} hideDot={true} />
      
      <div className="flex-1 flex flex-col pt-12 relative z-10">
        <ListTitle data={data} index={index} scale={sTitle} onActionStart={onActionStart} onTextChange={onTextChange} selectedElement={selectedElement} onSelectElement={onSelectElement} align="text-center" wrapperClasses="mb-6 shrink-0 text-center w-full" />
        
        <div className="flex-1 grid grid-cols-2 gap-3 overflow-y-auto pr-1">
          {items.map((item, i) => (
            <div key={i} className="bg-gradient-to-br from-zinc-900 to-black rounded-2xl p-5 border border-white/10 flex flex-col justify-center group">
              <div 
                contentEditable 
                suppressContentEditableWarning 
                onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)}
                className="w-6 h-6 rounded-full flex items-center justify-center font-outfit font-black text-[10px] text-white mb-3 shrink-0 outline-none" 
                style={{ backgroundColor: brandColor }}
              >
                {item.label || `${i + 1}`}
              </div>
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
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition} hideDot={true} />
      
      <ListTitle data={data} index={index} scale={sTitle * 1.1} onActionStart={onActionStart} onTextChange={onTextChange} selectedElement={selectedElement} onSelectElement={onSelectElement} align="text-left" wrapperClasses="mb-8 shrink-0 mt-8 w-full" />
      
      <div className="flex-1 flex flex-col space-y-4 pr-1 overflow-y-auto">
        {items.map((item, i) => (
          <div key={i} className="rounded-2xl p-4 shadow-lg flex items-center gap-4 group" style={{ marginLeft: `${Math.min(i * 15, 60)}px`, backgroundColor: `${brandColor}15`, border: `1px solid ${brandColor}40` }}>
            <div 
              contentEditable 
              suppressContentEditableWarning 
              onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)}
              className="w-10 h-10 rounded-full flex items-center justify-center font-outfit font-black text-xs shrink-0 outline-none" 
              style={{ color: brandColor, border: `1.5px solid ${brandColor}60`, backgroundColor: '#000000' }}
            >
              {item.label || `0${i + 1}`}
            </div>
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
      {data.imageUrl && (
        <div className="absolute inset-0 bg-cover blur-md scale-110" style={{ backgroundImage: `url(${data.imageUrl})`, backgroundPosition: `center ${data.imagePosition ?? 50}%`, opacity: 0.4 }} />
      )}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition} hideDot={true} />
      
      <ListTitle data={data} index={index} scale={sTitle * 1.25} onActionStart={onActionStart} onTextChange={onTextChange} selectedElement={selectedElement} onSelectElement={onSelectElement} align="text-center" wrapperClasses="mb-4 shrink-0 mt-4 w-full relative z-10" />
      
      <div className="flex-1 flex flex-wrap content-start justify-center gap-2 overflow-hidden pt-2 w-full relative z-10">
        <div className="flex flex-wrap justify-center gap-2 mb-1">
          {items.map((item, i) => (
            <div key={`badge-${i}`} className="rounded-full px-4 py-2 flex items-center gap-3 shadow-lg group" style={{ backgroundColor: '#000000', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: brandColor }}></div>
              <span contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)} className="font-outfit font-bold text-[10px] uppercase tracking-widest text-white outline-none block max-w-[150px] truncate">{item.label}</span>
            </div>
          ))}
        </div>
        
        <div className="w-full mt-2 space-y-2">
          {items.map((item, i) => (
            <div key={`text-${i}`} className="w-full p-3 rounded-3xl group text-center" style={{ backgroundColor: `${brandColor}15`, border: `1px solid ${brandColor}40` }}>
              <p contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)} className="font-playfair text-zinc-400 text-sm italic outline-none line-clamp-2">{item.text}</p>
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
    <div className="w-full h-full bg-[#050505] flex flex-col p-10 relative">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition} hideDot={true} />
      
      <div className="flex-1 flex flex-col justify-center pt-8">
        <ListTitle data={data} index={index} scale={sTitle * 1.1} onActionStart={onActionStart} onTextChange={onTextChange} selectedElement={selectedElement} onSelectElement={onSelectElement} align="text-left" wrapperClasses="mb-10 shrink-0 w-full" />
        
        <div className="space-y-4 flex-1 pr-2 flex flex-col justify-center">
          {items.map((item, i) => (
            <div key={i} className="flex gap-5 items-center p-4 rounded-2xl transition-all group" style={{ backgroundColor: `${brandColor}15`, border: `1px solid ${brandColor}40` }}>
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
    <div className="w-full h-full bg-[#080808] flex flex-col p-10 relative overflow-hidden">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition} hideDot={true} />
      
      <div className="flex-1 flex flex-col justify-center pt-8">
        <ListTitle data={data} index={index} scale={sTitle * 1.2} onActionStart={onActionStart} onTextChange={onTextChange} selectedElement={selectedElement} onSelectElement={onSelectElement} align="text-left" wrapperClasses="mb-6 shrink-0 w-full" />
        
        <div className="space-y-6 flex-1 pr-2 pt-12 flex flex-col justify-center">
          {items.map((item, i) => (
            <div key={i} className="relative flex flex-col justify-center min-h-[60px] group">
              {/* Ajustado posicionamento para não cortar o número */}
              <div 
                contentEditable 
                suppressContentEditableWarning 
                onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)}
                className="absolute -left-4 -top-12 font-outfit font-black text-[100px] leading-none opacity-10 outline-none select-none italic" 
                style={{ color: brandColor }}
              >
                {item.label || `0${i + 1}`}
              </div>
              <div className="relative z-10 pl-12 border-l-2" style={{ borderColor: brandColor }}>
                <h4 contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)} className="font-outfit font-black text-white text-lg uppercase tracking-tighter mb-1 outline-none line-clamp-1">{item.label}</h4>
                <p contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)} className="font-playfair text-zinc-400 text-sm leading-relaxed outline-none line-clamp-3 italic break-words max-w-[90%]">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ListVariant14(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, textScale, onTextChange, onItemChange, onActionStart, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const items = data.items || [];
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full p-10 flex flex-col overflow-hidden bg-zinc-50 relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} hideDot={true} />
      <div className="flex-1 flex flex-col min-h-0 pt-6">
        <SmartEl 
          slideIndex={index} 
          field="badge_text" 
          position={data.positions?.badge_text || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'badge_text'}
          onSelectElement={onSelectElement}
          className="shrink-0"
        >
          <TextWrapper {...tw} as="span" field="badge_text" className="italic text-2xl mb-1 block font-playfair" style={{ color: brandColor }}>
            {data.badge_text || 'Destaque'}
          </TextWrapper>
        </SmartEl>
        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-6 shrink-0"
        >
          <TextWrapper {...tw} as="h2" field="titulo" className="font-black text-[#1a1a1a] leading-tight tracking-tight font-outfit" style={{ fontSize: `${28 * sTitle}px` }}>
            {data.titulo}
          </TextWrapper>
        </SmartEl>
        <div className="flex-1 overflow-hidden flex flex-col gap-4 justify-center">
          {items.slice(0, 4).map((item, i) => (
            <div key={i} className="flex gap-3 items-start border-b border-zinc-300/50 pb-3 last:border-0 shrink-0">
              <span 
                contentEditable 
                suppressContentEditableWarning 
                onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)}
                className="font-bold text-lg mt-0.5 shrink-0 font-outfit outline-none" 
                style={{ color: brandColor }}
              >
                {item.label || `0${i + 1}.`}
              </span>
              <p 
                contentEditable 
                suppressContentEditableWarning 
                onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)}
                className="text-zinc-800 leading-snug flex-1 outline-none font-playfair" 
                style={{ fontSize: `${15 * sText}px` }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ListVariant15(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, textScale, onTextChange, onItemChange, onActionStart, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const items = data.items || [];
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full p-10 flex flex-col overflow-hidden bg-zinc-900 text-white relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} dark hideDot={true} />
      <div className="flex-1 flex flex-col min-h-0 pt-8">
        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-8 shrink-0 text-center"
        >
          <TextWrapper {...tw} as="h2" field="titulo" className="font-black leading-tight tracking-tight font-outfit" style={{ fontSize: `${28 * sTitle}px` }}>
            {data.titulo}
          </TextWrapper>
        </SmartEl>
        <div className="flex-1 overflow-hidden flex flex-col gap-0 px-4 relative justify-center">
          <div className="absolute left-[27px] top-4 bottom-8 w-[2px] bg-white/20 z-0" />
          {items.slice(0, 4).map((item, i) => (
            <div key={i} className="flex gap-4 items-start pb-6 shrink-0 relative z-10">
              <div 
                contentEditable 
                suppressContentEditableWarning 
                onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)}
                className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-4 border-[#1a1a1a] text-[10px] font-bold font-outfit outline-none" 
                style={{ backgroundColor: brandColor }}
              >
                {item.label || i + 1}
              </div>
              <p 
                contentEditable 
                suppressContentEditableWarning 
                onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)}
                className="text-zinc-300 leading-snug flex-1 mt-0.5 outline-none font-playfair" 
                style={{ fontSize: `${14 * sText}px` }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ListVariant16(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, textScale, onTextChange, onItemChange, onActionStart, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const items = data.items || [];
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full p-10 flex flex-col overflow-hidden bg-zinc-50 relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} hideDot={true} />
      <div className="flex-1 flex flex-col min-h-0 pt-8">
        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-6 shrink-0"
        >
          <TextWrapper {...tw} as="h2" field="titulo" className="font-black text-[#1a1a1a] leading-tight tracking-tight font-outfit" style={{ fontSize: `${24 * sTitle}px` }}>
            {data.titulo}
          </TextWrapper>
        </SmartEl>
        <div className="grid grid-cols-2 gap-3 flex-1 min-h-0 content-center">
          {items.slice(0, 4).map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm flex flex-col border border-zinc-100 overflow-hidden">
              <span 
                contentEditable 
                suppressContentEditableWarning 
                onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)}
                className="text-xl opacity-20 font-black mb-1 shrink-0 font-outfit outline-none" 
                style={{ color: brandColor }}
              >
                {item.label || `0${i + 1}`}
              </span>
              <p 
                contentEditable 
                suppressContentEditableWarning 
                onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)}
                className="text-zinc-700 leading-tight flex-1 outline-none font-outfit" 
                style={{ fontSize: `${14 * sText}px` }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ListVariant17(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, textScale, onTextChange, onItemChange, onActionStart, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const items = data.items || [];
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full p-10 flex flex-col overflow-hidden bg-zinc-50 relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} hideDot={true} />
      <div className="mt-8 mb-6 shrink-0">
        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
        >
          <TextWrapper {...tw} as="h2" field="titulo" className="font-black text-[#1a1a1a] leading-tight font-outfit" style={{ fontSize: `${28 * sTitle}px` }}>
            {data.titulo}
          </TextWrapper>
        </SmartEl>
      </div>
      <div className="flex-1 flex flex-col justify-evenly min-h-0">
        {items.slice(0, 4).map((item, i) => (
          <div key={i} className="flex gap-4 items-center relative pl-10 shrink-0">
            <span 
              contentEditable 
              suppressContentEditableWarning 
              onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)}
              className="absolute left-0 text-5xl font-black opacity-10 top-1/2 -translate-y-1/2 font-outfit outline-none" 
              style={{ color: brandColor }}
            >
              {item.label || i + 1}
            </span>
            <p 
              contentEditable 
              suppressContentEditableWarning 
              onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)}
              className="text-zinc-800 leading-snug font-medium z-10 outline-none font-playfair" 
              style={{ fontSize: `${15 * sText}px` }}
            >
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ListVariant18(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, textScale, onTextChange, onItemChange, onActionStart, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const items = data.items || [];
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full p-10 flex flex-col overflow-hidden bg-zinc-900 text-white relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} dark hideDot={true} />
      <div className="flex items-center gap-4 mb-8 shrink-0 pt-8">
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 shrink-0">
          <Check className="w-6 h-6 text-white" />
        </div>
        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="flex-1"
        >
          <TextWrapper {...tw} as="h2" field="titulo" className="font-black leading-tight font-outfit" style={{ fontSize: `${24 * sTitle}px` }}>
            {data.titulo}
          </TextWrapper>
        </SmartEl>
      </div>
      <div className="flex-1 flex flex-col gap-4 min-h-0 justify-center">
        {items.slice(0, 4).map((item, i) => (
          <div key={i} className="flex gap-4 items-start bg-zinc-800/50 p-5 rounded-xl border border-zinc-700/50 shrink-0">
            <div className="w-6 h-6 rounded bg-zinc-700 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 text-white" />
            </div>
            <p 
              contentEditable 
              suppressContentEditableWarning 
              onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)}
              className="text-zinc-300 leading-snug outline-none font-playfair" 
              style={{ fontSize: `${14 * sText}px` }}
            >
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ListVariant19(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, textScale, onTextChange, onItemChange, onActionStart, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const items = data.items || [];
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full p-10 flex flex-col overflow-hidden bg-zinc-50 relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} hideDot={true} />
      <SmartEl 
        slideIndex={index} 
        field="titulo" 
        position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
        onActionStart={onActionStart}
        isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
        onSelectElement={onSelectElement}
        className="mb-8 shrink-0 text-center pt-8"
      >
        <TextWrapper {...tw} as="h2" field="titulo" className="font-black text-[#1a1a1a] leading-tight font-outfit" style={{ fontSize: `${28 * sTitle}px` }}>
          {data.titulo}
        </TextWrapper>
      </SmartEl>
      <div className="flex-1 flex flex-col gap-4 justify-center min-h-0">
        {items.slice(0, 4).map((item, i) => (
          <div key={i} className="bg-white border-l-4 p-5 shadow-sm shrink-0" style={{ borderColor: brandColor }}>
            <p 
              contentEditable 
              suppressContentEditableWarning 
              onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)}
              className="text-zinc-800 font-bold uppercase tracking-widest text-[11px] mb-1 font-outfit outline-none"
            >
              {item.label || `Item 0${i + 1}`}
            </p>
            <p 
              contentEditable 
              suppressContentEditableWarning 
              onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)}
              className="text-zinc-600 leading-snug outline-none font-playfair" 
              style={{ fontSize: `${14 * sText}px` }}
            >
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ListVariant20(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, textScale, onTextChange, onItemChange, onActionStart, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const items = data.items || [];
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full p-12 flex flex-col overflow-hidden bg-zinc-50 relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} hideDot={true} />
      <SmartEl 
        slideIndex={index} 
        field="titulo" 
        position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
        onActionStart={onActionStart}
        isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
        onSelectElement={onSelectElement}
        className="mb-8 shrink-0"
      >
        <TextWrapper {...tw} as="h2" field="titulo" className="font-black text-[#1a1a1a] leading-tight font-outfit" style={{ fontSize: `${32 * sTitle}px` }}>
          {data.titulo}
        </TextWrapper>
      </SmartEl>
      <div className="flex-1 overflow-hidden flex flex-col justify-around relative pl-8">
        <div className="absolute left-[13px] top-4 bottom-8 w-[2px] bg-zinc-200 z-0" />
        {items.slice(0, 4).map((item, i) => (
          <div key={i} className="flex gap-6 items-center relative z-10 shrink-0 py-2">
            <div className="w-4 h-4 rounded-full border-4 shrink-0 bg-white" style={{ borderColor: brandColor }} />
            <p 
              contentEditable 
              suppressContentEditableWarning 
              onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)}
              className="text-zinc-800 leading-snug font-medium outline-none font-playfair" 
              style={{ fontSize: `${16 * sText}px` }}
            >
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ListVariant21(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, textScale, onTextChange, onItemChange, onActionStart, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const items = data.items || [];
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full p-10 flex flex-col overflow-hidden bg-zinc-50 relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} hideDot={true} />
      <div className="flex-1 flex flex-col min-h-0 pt-8">
        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-6 shrink-0"
        >
          <TextWrapper {...tw} as="h2" field="titulo" className="font-black text-[#1a1a1a] leading-tight tracking-tight font-outfit" style={{ fontSize: `${32 * sTitle}px` }}>
            {data.titulo}
          </TextWrapper>
        </SmartEl>
        <div className="flex-1 flex flex-col gap-6 justify-center min-h-0">
          {items.slice(0, 4).map((item, i) => (
            <div key={i} className="flex gap-4 items-start shrink-0">
              <div className="w-2 h-2 rounded-full mt-2.5 shrink-0" style={{ backgroundColor: brandColor }} />
              <div className="flex flex-col gap-1 flex-1">
                <p 
                  contentEditable 
                  suppressContentEditableWarning 
                  onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)}
                  className="text-zinc-800 leading-snug font-bold outline-none font-outfit" 
                  style={{ fontSize: `${16 * sText}px` }}
                >
                  {item.text}
                </p>
                <div className="w-full h-[1px] bg-zinc-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ListVariant22(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, textScale, onTextChange, onItemChange, onActionStart, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const items = data.items || [];
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex overflow-hidden bg-zinc-50 relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} hideDot={true} />
      <div className="w-[35%] h-full shrink-0 relative overflow-hidden bg-zinc-200">
        <div className="absolute inset-0 bg-zinc-300 opacity-50" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
           <div className="w-32 h-32 rounded-full border-8 border-black" />
        </div>
      </div>
      <div className="flex-1 p-10 flex flex-col min-h-0">
        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-6 shrink-0 pt-8"
        >
          <TextWrapper {...tw} as="h2" field="titulo" className="font-black text-[#1a1a1a] leading-tight font-outfit" style={{ fontSize: `${28 * sTitle}px` }}>
            {data.titulo}
          </TextWrapper>
        </SmartEl>
        <div className="flex-1 flex flex-col justify-center min-h-0">
          {items.slice(0, 4).map((item, i) => (
            <div key={i} className="flex gap-3 items-center border-b border-zinc-300/50 py-3 last:border-0 shrink-0">
              <span 
                contentEditable 
                suppressContentEditableWarning 
                onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)}
                className="font-bold text-lg shrink-0 font-outfit outline-none" 
                style={{ color: brandColor }}
              >
                {item.label || '—'}
              </span>
              <p 
                contentEditable 
                suppressContentEditableWarning 
                onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)}
                className="text-zinc-800 leading-snug font-medium flex-1 outline-none font-playfair" 
                style={{ fontSize: `${15 * sText}px` }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ListVariant23(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, textScale, onTextChange, onItemChange, onActionStart, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const items = data.items || [];
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full p-10 flex flex-col overflow-hidden bg-zinc-50 relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} hideDot={true} />
      <SmartEl 
        slideIndex={index} 
        field="titulo" 
        position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
        onActionStart={onActionStart}
        isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
        onSelectElement={onSelectElement}
        className="mb-8 shrink-0 pt-8"
      >
        <TextWrapper {...tw} as="h2" field="titulo" className="font-black text-[#1a1a1a] leading-tight font-outfit" style={{ fontSize: `${32 * sTitle}px` }}>
          {data.titulo}
        </TextWrapper>
      </SmartEl>
      <div className="flex-1 flex flex-col gap-3 min-h-0 justify-center">
        {items.slice(0, 4).map((item, i) => {
          const isSelected = i === 1; // Destaque na segunda posição conforme documento
          return (
            <div 
              key={i} 
              className={`p-5 rounded-xl flex items-center shadow-sm shrink-0 border transition-all ${
                isSelected ? 'text-white scale-105 z-10' : 'bg-white text-zinc-600 border-zinc-200'
              }`}
              style={isSelected ? { backgroundColor: brandColor, borderColor: brandColor } : {}}
            >
              <span 
                contentEditable 
                suppressContentEditableWarning 
                onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)}
                className={`font-black text-xl mr-6 font-outfit outline-none ${isSelected ? 'opacity-50' : 'opacity-20'}`} 
                style={!isSelected ? { color: brandColor } : {}}
              >
                {item.label || `0${i + 1}`}
              </span>
              <p 
                contentEditable 
                suppressContentEditableWarning 
                onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)}
                className="leading-tight font-medium outline-none flex-1 font-playfair" 
                style={{ fontSize: `${15 * sText}px` }}
              >
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ListVariant24(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, textScale, onTextChange, onItemChange, onActionStart, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const items = data.items || [];
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full p-12 flex flex-col overflow-hidden bg-zinc-50 relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} hideDot={true} />
      <SmartEl 
        slideIndex={index} 
        field="titulo" 
        position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
        onActionStart={onActionStart}
        isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
        onSelectElement={onSelectElement}
        className="mb-10 shrink-0 text-right"
      >
        <TextWrapper {...tw} as="h2" field="titulo" className="font-black text-[#1a1a1a] leading-tight uppercase font-outfit" style={{ fontSize: `${32 * sTitle}px` }}>
          {data.titulo}
        </TextWrapper>
      </SmartEl>
      <div className="flex-1 flex flex-col justify-center gap-6 min-h-0">
        {items.slice(0, 4).map((item, i) => (
          <div key={i} className="flex flex-col shrink-0" style={{ paddingLeft: `${i * 1.5}rem` }}>
            <div className="w-6 h-[2.5px] mb-2" style={{ backgroundColor: brandColor }} />
            <p 
              contentEditable 
              suppressContentEditableWarning 
              onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)}
              className="text-[#1a1a1a] font-bold leading-tight outline-none font-outfit" 
              style={{ fontSize: `${16 * sText}px` }}
            >
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ListVariant25(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, textScale, onTextChange, onItemChange, onActionStart, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const items = data.items || [];
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full p-10 flex flex-col overflow-hidden bg-zinc-50 relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} hideDot={true} />
      <SmartEl 
        slideIndex={index} 
        field="titulo" 
        position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
        onActionStart={onActionStart}
        isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
        onSelectElement={onSelectElement}
        className="mb-8 shrink-0 text-center pt-8"
      >
        <TextWrapper {...tw} as="h2" field="titulo" className="font-black text-[#1a1a1a] leading-tight font-outfit" style={{ fontSize: `${28 * sTitle}px` }}>
          {data.titulo}
        </TextWrapper>
      </SmartEl>
      <div className="grid grid-cols-2 gap-5 flex-1 min-h-0 content-center">
        {items.slice(0, 4).map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm flex flex-col items-center text-center justify-center border border-zinc-100 transition-transform hover:scale-105">
            <div 
              contentEditable 
              suppressContentEditableWarning 
              onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)}
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mb-4 shadow-md font-outfit text-lg outline-none" 
              style={{ backgroundColor: brandColor }}
            >
              {item.label || `0${i + 1}`}
            </div>
            <p 
              contentEditable 
              suppressContentEditableWarning 
              onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)}
              className="text-zinc-700 leading-tight font-medium outline-none font-playfair" 
              style={{ fontSize: `${14 * sText}px` }}
            >
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ListVariant26(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, textScale, onTextChange, onItemChange, onActionStart, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const items = data.items || [];
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex overflow-hidden bg-zinc-50 relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} dark hideDot={true} />
      <div className="w-[35%] h-full p-10 flex flex-col justify-between shrink-0" style={{ backgroundColor: brandColor }}>
        <div>
          <SmartEl 
            slideIndex={index} 
            field="badge_text" 
            position={data.positions?.badge_text || { x: 0, y: 0, scale: 1 }}
            onActionStart={onActionStart}
            isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'badge_text'}
            onSelectElement={onSelectElement}
            className="mt-12 mb-2"
          >
            <TextWrapper {...tw} as="span" field="badge_text" className="font-bold text-[11px] uppercase tracking-[0.2em] text-white/70 font-outfit">
              {data.badge_text || 'Resumo'}
            </TextWrapper>
          </SmartEl>
          <SmartEl 
            slideIndex={index} 
            field="titulo" 
            position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
            onActionStart={onActionStart}
            isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
            onSelectElement={onSelectElement}
          >
            <TextWrapper {...tw} as="h2" field="titulo" className="font-black text-white leading-tight uppercase tracking-tighter font-outfit" style={{ fontSize: `${32 * sTitle}px` }}>
              {data.titulo}
            </TextWrapper>
          </SmartEl>
        </div>
        <div className="w-12 h-1 bg-white/30 rounded-full" />
      </div>
      <div className="w-[65%] h-full p-10 flex flex-col justify-center gap-6">
        {items.slice(0, 4).map((item, i) => (
          <div key={i} className="flex flex-col border-b border-zinc-300 pb-4 last:border-0 shrink-0">
            <span 
              contentEditable 
              suppressContentEditableWarning 
              onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)}
              className="font-black text-xl mb-1 font-outfit outline-none" 
              style={{ color: brandColor }}
            >
              {item.label || `0${i + 1}`}
            </span>
            <p 
              contentEditable 
              suppressContentEditableWarning 
              onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)}
              className="text-zinc-800 leading-snug font-medium outline-none font-playfair" 
              style={{ fontSize: `${16 * sText}px` }}
            >
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ListVariant27(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, textScale, onTextChange, onItemChange, onActionStart, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const items = data.items || [];
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-white relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} hideDot={true} />
      <div className="h-[40%] w-full relative shrink-0 bg-zinc-300">
        <div className="absolute inset-0 bg-zinc-200 flex items-center justify-center">
          <SmartEl 
            slideIndex={index} 
            field="studio_text" 
            position={data.positions?.studio_text || { x: 0, y: 0, scale: 1 }}
            onActionStart={onActionStart}
            isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'studio_text'}
            onSelectElement={onSelectElement}
          >
            <TextWrapper {...tw} as="span" field="studio_text" className="text-zinc-400 font-outfit text-xs">
              {data.studio_text || 'Espaço para Imagem'}
            </TextWrapper>
          </SmartEl>
        </div>
        <div className="absolute bottom-4 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-lg border border-white/50">
          <SmartEl 
            slideIndex={index} 
            field="titulo" 
            position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
            onActionStart={onActionStart}
            isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
            onSelectElement={onSelectElement}
          >
            <TextWrapper {...tw} as="h2" field="titulo" className="font-black text-[#1a1a1a] leading-none uppercase tracking-tighter font-outfit" style={{ fontSize: `${24 * sTitle}px` }}>
              {data.titulo}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>
      <div className="flex-1 p-6 grid grid-cols-2 gap-4 min-h-0 bg-white content-center">
        {items.slice(0, 4).map((item, i) => (
          <div key={i} className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100 flex flex-col justify-center shadow-sm relative overflow-hidden shrink-0">
            <div 
              contentEditable 
              suppressContentEditableWarning 
              onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)}
              className="absolute -right-2 -bottom-2 font-black text-6xl opacity-5 font-outfit outline-none" 
              style={{ color: brandColor }}
            >
              {item.label || i + 1}
            </div>
            <p 
              contentEditable 
              suppressContentEditableWarning 
              onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)}
              className="text-zinc-700 leading-snug font-medium relative z-10 outline-none font-playfair" 
              style={{ fontSize: `${13 * sText}px` }}
            >
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ListVariant28(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, textScale, onTextChange, onItemChange, onActionStart, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const items = data.items || [];
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full p-10 flex flex-col overflow-hidden bg-black text-white relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} dark hideDot={true} />
      <div className="pt-8">
        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-8 shrink-0"
        >
          <TextWrapper {...tw} as="h2" field="titulo" className="font-black text-white leading-tight uppercase tracking-tighter font-outfit" style={{ fontSize: `${32 * sTitle}px` }}>
            {data.titulo}
          </TextWrapper>
        </SmartEl>
      </div>
      <div className="flex-1 flex flex-col justify-center gap-6 min-h-0 pl-2">
        {items.slice(0, 4).map((item, i) => (
          <div key={i} className="relative flex items-center shrink-0">
            <span 
              contentEditable 
              suppressContentEditableWarning 
              onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)}
              className="absolute -left-6 font-black text-7xl opacity-20 -translate-y-1 font-outfit outline-none" 
              style={{ color: brandColor }}
            >
              {item.label || i + 1}
            </span>
            <div className="relative z-10 bg-zinc-900/80 backdrop-blur p-4 rounded-xl border-l-4 shadow-xl w-full" style={{ borderColor: brandColor }}>
              <p 
                contentEditable 
                suppressContentEditableWarning 
                onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)}
                className="text-zinc-200 leading-snug outline-none font-playfair" 
                style={{ fontSize: `${14 * sText}px` }}
              >
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ListVariant29(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, textScale, onTextChange, onItemChange, onActionStart, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const items = data.items || [];
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full relative p-10 flex flex-col overflow-hidden bg-zinc-900 text-white">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} dark hideDot={true} />
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-zinc-800 opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />
      </div>
      <div className="relative z-10 flex flex-col h-full pt-8">
        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-6 shrink-0 text-center mt-2"
        >
          <TextWrapper {...tw} as="h2" field="titulo" className="font-black text-white leading-tight uppercase tracking-tighter drop-shadow-xl font-outfit" style={{ fontSize: `${30 * sTitle}px` }}>
            {data.titulo}
          </TextWrapper>
        </SmartEl>
        <div className="flex-1 flex flex-col gap-3 min-h-0 justify-center">
          {items.slice(0, 4).map((item, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center gap-4 shrink-0">
              <div 
                contentEditable 
                suppressContentEditableWarning 
                onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)}
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 border border-white/30 font-outfit outline-none" 
                style={{ backgroundColor: brandColor }}
              >
                {item.label || `0${i + 1}`}
              </div>
              <p 
                contentEditable 
                suppressContentEditableWarning 
                onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)}
                className="text-white/90 leading-snug font-medium outline-none font-playfair" 
                style={{ fontSize: `${13 * sText}px` }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ListVariant30(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, textScale, onTextChange, onItemChange, onActionStart, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const items = data.items || [];
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full p-12 flex flex-col overflow-hidden items-center justify-center bg-zinc-50 relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} hideDot={true} />
      <SmartEl 
        slideIndex={index} 
        field="badge_text" 
        position={data.positions?.badge_text || { x: 0, y: 0, scale: 1 }}
        onActionStart={onActionStart}
        isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'badge_text'}
        onSelectElement={onSelectElement}
        className="mb-2 shrink-0"
      >
        <TextWrapper {...tw} as="span" field="badge_text" className="font-bold text-[10px] uppercase tracking-[0.2em] font-outfit" style={{ color: brandColor }}>
          {data.badge_text || 'Destaque'}
        </TextWrapper>
      </SmartEl>
      <SmartEl 
        slideIndex={index} 
        field="titulo" 
        position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
        onActionStart={onActionStart}
        isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
        onSelectElement={onSelectElement}
        className="mb-8 shrink-0 text-center"
      >
        <TextWrapper {...tw} as="h2" field="titulo" className="font-black text-[#1a1a1a] leading-none uppercase tracking-tighter font-outfit" style={{ fontSize: `${36 * sTitle}px` }}>
          {data.titulo}
        </TextWrapper>
      </SmartEl>
      <div className="w-full flex flex-col gap-3 min-h-0">
        {items.slice(0, 4).map((item, i) => (
          <div key={i} className="bg-white rounded-full px-6 py-4 flex items-center gap-4 shadow-sm border border-zinc-200 shrink-0 mx-2 hover:scale-[1.02] transition-transform group">
            <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: brandColor }} />
            <p 
              contentEditable 
              suppressContentEditableWarning 
              onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)}
              className="text-zinc-800 leading-snug font-medium flex-1 outline-none font-playfair" 
              style={{ fontSize: `${14 * sText}px` }}
            >
              {item.text}
            </p>
          </div>
        ))}
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
  14: ListVariant14,
  15: ListVariant15,
  16: ListVariant16,
  17: ListVariant17,
  18: ListVariant18,
  19: ListVariant19,
  20: ListVariant20,
  21: ListVariant21,
  22: ListVariant22,
  23: ListVariant23,
  24: ListVariant24,
  25: ListVariant25,
  26: ListVariant26,
  27: ListVariant27,
  28: ListVariant28,
  29: ListVariant29,
  30: ListVariant30,
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
  { id: 14, nome: 'Premium Tag', badge: 'PREMIUM' },
  { id: 15, nome: 'Dark Path', badge: 'PREMIUM' },
  { id: 16, nome: 'Card Grid', badge: 'NEW' },
  { id: 17, nome: 'Ghost Numbers', badge: null },
  { id: 18, nome: 'Expert Checklist', badge: 'PRO' },
  { id: 19, nome: 'Side Border', badge: null },
  { id: 20, nome: 'Clean Timeline', badge: 'NEW' },
  { id: 21, nome: 'Elegant List', badge: null },
  { id: 22, nome: 'Split Abstract', badge: 'PRO' },
  { id: 23, nome: 'Focus Highlight', badge: 'NEW' },
  { id: 24, nome: 'Stepped Right', badge: null },
  { id: 25, nome: 'Rounded Grid', badge: 'PRO' },
  { id: 26, nome: 'Split Premium', badge: 'PREMIUM' },
  { id: 27, nome: 'Gallery List', badge: 'PRO' },
  { id: 28, nome: 'Dark Numbers', badge: 'PREMIUM' },
  { id: 29, nome: 'Glass Cards', badge: 'NEW' },
  { id: 30, nome: 'Pill Shape', badge: null },
];

