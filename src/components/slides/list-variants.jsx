import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import SmartElement from '../smart-element';
import SlideHeader from '../slide-header';

// ─── Helper: ImageBg ────────────────────────────────────────
function ImageBg({ data, className = '', style = {}, children }) {
  if (!data?.imageUrl) return children || null;
  
  // Normaliza a escala: aceita 1.5 ou 150
  const rawScale = data.imageScale ?? 1;
  const scale = rawScale > 5 ? rawScale / 100 : rawScale;
  
  return (
    <div 
      className={`bg-cover transition-all duration-500 ${className}`}
      style={{ 
        backgroundImage: `url("${data.imageUrl}")`,
        backgroundPosition: `${data.imagePositionX ?? 50}% ${data.imagePosition ?? 50}%`,
        transform: `scale(${scale})`,
        ...style 
      }}
    >
      {children}
    </div>
  );
}

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
          className={`font-text font-black ${color} tracking-tighter leading-none outline-none line-clamp-2 overflow-hidden ${align} ${className}`}
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

export function ListVariant8(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const items = data.items || [{ label: 'Item', text: 'Text' }];

  return (
    <div className="w-full h-full bg-surface-dark flex flex-col p-10 relative">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition} hideDot={true} brandLogo={props.brandLogo} showBrandLogo={props.showBrandLogo} />
      
      <div className="flex-1 flex flex-col justify-center pt-8">
        <ListTitle data={data} index={index} scale={sTitle * 1.05} onActionStart={onActionStart} onTextChange={onTextChange} selectedElement={selectedElement} onSelectElement={onSelectElement} align="text-left" wrapperClasses="mb-6 shrink-0 w-full" />
        
        <div className="flex-1 overflow-hidden space-y-2 pr-1">
          {items.map((item, i) => (
            <div key={i} className="rounded-2xl p-4 relative flex flex-col justify-center min-h-[75px] group" style={{ backgroundColor: '#000000', border: `1px solid ${brandColor}40` }}>
              <div 
                contentEditable 
                suppressContentEditableWarning 
                onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)}
                className="absolute -right-4 -bottom-4 font-title font-black text-[80px] leading-none outline-none" 
                style={{fontFamily: titleFont,  color: brandColor, opacity: 0.15 }}
              >
                {item.label || `0${i + 1}`}
              </div>
              <p contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)} className="font-title text-zinc-300 text-sm relative z-10 outline-none line-clamp-2">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ListVariant13(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const items = data.items || [{ label: 'Item', text: 'Text' }];

  return (
    <div className="w-full h-full bg-surface-dark flex flex-col p-10 relative">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition} hideDot={true} brandLogo={props.brandLogo} showBrandLogo={props.showBrandLogo} />
      
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
                className="absolute -left-4 -top-12 font-text font-black text-[100px] leading-none opacity-10 outline-none select-none italic" 
                style={{fontFamily: textFont,  color: brandColor }}
              >
                {item.label || `0${i + 1}`}
              </div>
              <div className="relative z-10 pl-12 border-l-2" style={{ borderColor: brandColor }}>
                <p contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)} className="font-text text-zinc-400 text-sm leading-relaxed outline-none line-clamp-3 italic break-words max-w-[90%]">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ListVariant14(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, textScale, onTextChange, onItemChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const items = data.items || [];
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full p-10 flex flex-col bg-zinc-50 relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} hideDot={true} counterBg="#EDEDED" handleColor="#1a1a1a" counterColor="#1a1a1a" />
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
          <TextWrapper {...tw} as="span" field="badge_text" className="italic text-2xl mb-1 block font-tag" style={{fontFamily: tagFont,  color: brandColor }}>
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
          <TextWrapper {...tw} as="h2" field="titulo" className="font-black text-[#1a1a1a] leading-tight tracking-tight font-title" style={{ fontSize: `${28 * sTitle}px` }}>
            {data.titulo}
          </TextWrapper>
        </SmartEl>
        <div className="flex-1 flex flex-col gap-4 justify-center">
          {items.slice(0, 4).map((item, i) => (
            <div key={i} className="flex gap-3 items-start border-b border-zinc-300/50 pb-3 last:border-0 shrink-0">
              <span 
                contentEditable 
                suppressContentEditableWarning 
                onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)}
                className="font-bold text-lg mt-0.5 shrink-0 font-text outline-none" 
                style={{fontFamily: textFont,  color: brandColor }}
              >
                {item.label || `0${i + 1}.`}
              </span>
              <p 
                contentEditable 
                suppressContentEditableWarning 
                onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)}
                className="text-zinc-800 leading-snug flex-1 outline-none font-text" 
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

export function ListVariant16(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, textScale, onTextChange, onItemChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const items = data.items || [];
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full p-10 flex flex-col bg-zinc-50 relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} hideDot={true} counterBg="#EDEDED" handleColor="#1a1a1a" counterColor="#1a1a1a" />
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
          <TextWrapper {...tw} as="h2" field="titulo" className="font-black text-[#1a1a1a] leading-tight tracking-tight font-title" style={{ fontSize: `${24 * sTitle}px` }}>
            {data.titulo}
          </TextWrapper>
        </SmartEl>
        <div className="grid grid-cols-2 gap-3 flex-1 min-h-0 content-center">
          {items.slice(0, 4).map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm flex flex-col border border-zinc-100">
              <span 
                contentEditable 
                suppressContentEditableWarning 
                onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)}
                className="text-xl opacity-20 font-black mb-1 shrink-0 font-text outline-none" 
                style={{fontFamily: textFont,  color: brandColor }}
              >
                {item.label || `0${i + 1}`}
              </span>
              <p 
                contentEditable 
                suppressContentEditableWarning 
                onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)}
                className="text-zinc-700 leading-tight flex-1 outline-none font-text" 
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, textScale, onTextChange, onItemChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const items = data.items || [];
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full p-10 flex flex-col bg-zinc-50 relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} hideDot={true} counterBg="#EDEDED" handleColor="#1a1a1a" counterColor="#1a1a1a" />
      <div className="mt-8 mb-6 shrink-0">
        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
        >
          <TextWrapper {...tw} as="h2" field="titulo" className="font-black text-[#1a1a1a] leading-tight font-title" style={{ fontSize: `${28 * sTitle}px` }}>
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
              className="absolute left-0 text-5xl font-black opacity-10 top-1/2 -translate-y-1/2 font-text outline-none" 
              style={{fontFamily: textFont,  color: brandColor }}
            >
              {item.label || i + 1}
            </span>
            <p 
              contentEditable 
              suppressContentEditableWarning 
              onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)}
              className="text-zinc-800 leading-snug font-medium z-10 outline-none font-text" 
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

export function ListVariant23(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, textScale, onTextChange, onItemChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const items = data.items || [];
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full p-10 flex flex-col bg-zinc-50 relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} hideDot={true} counterBg="#EDEDED" handleColor="#1a1a1a" counterColor="#1a1a1a" />
      <SmartEl 
        slideIndex={index} 
        field="titulo" 
        position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
        onActionStart={onActionStart}
        isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
        onSelectElement={onSelectElement}
        className="mb-8 shrink-0 pt-8"
      >
        <TextWrapper {...tw} as="h2" field="titulo" className="font-black text-[#1a1a1a] leading-tight font-title" style={{ fontSize: `${32 * sTitle}px` }}>
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
                className={`font-black text-xl mr-6 font-text outline-none ${isSelected ? 'opacity-50' : 'opacity-20'}`} 
                style={!isSelected ? { color: brandColor } : {}}
              >
                {item.label || `0${i + 1}`}
              </span>
              <p 
                contentEditable 
                suppressContentEditableWarning 
                onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)}
                className="leading-tight font-medium outline-none flex-1 font-text" 
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

export function ListVariant25(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, textScale, onTextChange, onItemChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const items = data.items || [];
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full p-10 flex flex-col bg-zinc-50 relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} hideDot={true} counterBg="#EDEDED" handleColor="#1a1a1a" counterColor="#1a1a1a" />
      <SmartEl 
        slideIndex={index} 
        field="titulo" 
        position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
        onActionStart={onActionStart}
        isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
        onSelectElement={onSelectElement}
        className="mb-8 shrink-0 text-center pt-8"
      >
        <TextWrapper {...tw} as="h2" field="titulo" className="font-black text-[#1a1a1a] leading-tight font-title" style={{ fontSize: `${28 * sTitle}px` }}>
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
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mb-4 shadow-md font-text text-lg outline-none" 
              style={{fontFamily: textFont,  backgroundColor: brandColor }}
            >
              {item.label || `0${i + 1}`}
            </div>
            <p 
              contentEditable 
              suppressContentEditableWarning 
              onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)}
              className="text-zinc-700 leading-tight font-medium outline-none font-text" 
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, textScale, onTextChange, onItemChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const items = data.items || [];
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex bg-zinc-50 relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} hideDot={true} counterBg="#EDEDED" handleColor="#1a1a1a" counterColor="#1a1a1a" />
      <div className="w-[35%] h-full p-10 flex flex-col justify-between shrink-0" style={{fontFamily: textFont,  backgroundColor: brandColor }}>
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
            <TextWrapper {...tw} as="span" field="badge_text" className="font-bold text-[11px] uppercase tracking-[0.2em] text-white/70 font-tag">
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
            <TextWrapper {...tw} as="h2" field="titulo" className="font-black text-white leading-tight uppercase tracking-tighter font-title" style={{ fontSize: `${32 * sTitle}px` }}>
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
              className="font-black text-xl mb-1 font-text outline-none" 
              style={{fontFamily: titleFont,  color: brandColor }}
            >
              {item.label || `0${i + 1}`}
            </span>
            <p 
              contentEditable 
              suppressContentEditableWarning 
              onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)}
              className="text-zinc-800 leading-snug font-medium outline-none font-text" 
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, textScale, onTextChange, onItemChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const items = data.items || [];
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-col bg-white relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} hideDot={true} />
      <div className={`h-[40%] w-full relative shrink-0 overflow-hidden ${!data.imageUrl ? 'bg-zinc-300' : ''}`}>
        <SmartEl 
          slideIndex={index} 
          field="imagem" 
          position={data.positions?.imagem || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'imagem'}
          onSelectElement={onSelectElement}
          className="w-full h-full"
        >
          <ImageBg data={data} className="absolute inset-0" />
        </SmartEl>

        {!data.imageUrl && (
          <div className="absolute inset-0 bg-zinc-200 flex items-center justify-center">
            <SmartEl 
              slideIndex={index} 
              field="studio_text" 
              position={data.positions?.studio_text || { x: 0, y: 0, scale: 1 }}
              onActionStart={onActionStart}
              isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'studio_text'}
              onSelectElement={onSelectElement}
            >
              <TextWrapper {...tw} as="span" field="studio_text" className="text-zinc-400 font-text text-xs">
                {data.studio_text || 'Espaço para Imagem'}
              </TextWrapper>
            </SmartEl>
          </div>
        )}
        <div className="absolute bottom-4 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-lg border border-white/50 z-20">
          <SmartEl 
            slideIndex={index} 
            field="titulo" 
            position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
            onActionStart={onActionStart}
            isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
            onSelectElement={onSelectElement}
          >
            <TextWrapper {...tw} as="h2" field="titulo" className="font-black text-[#1a1a1a] leading-none uppercase tracking-tighter font-title" style={{ fontSize: `${24 * sTitle}px` }}>
              {data.titulo}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>
      <div className="flex-1 p-6 grid grid-cols-2 gap-4 min-h-0 bg-white content-center">
        {items.slice(0, 4).map((item, i) => (
          <div key={i} className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100 flex flex-col justify-center shadow-sm relative shrink-0">
            <div 
              contentEditable 
              suppressContentEditableWarning 
              onBlur={(e) => onItemChange && onItemChange(index, i, 'label', e.currentTarget.innerText)}
              className="absolute -right-2 -bottom-2 font-black text-6xl opacity-5 font-text outline-none" 
              style={{fontFamily: textFont,  color: brandColor }}
            >
              {item.label || i + 1}
            </div>
            <p 
              contentEditable 
              suppressContentEditableWarning 
              onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)}
              className="text-zinc-700 leading-snug font-medium relative z-10 outline-none font-text" 
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

export function ListVariant29(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, textScale, onTextChange, onItemChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const items = data.items || [];
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full relative p-10 flex flex-col bg-black text-white">
      {data.imageUrl && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.08] overflow-hidden">
          <ImageBg data={data} className="absolute inset-0" />
        </div>
      )}
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} hideDot={true} />
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
          <TextWrapper {...tw} as="h2" field="titulo" className="font-black text-white leading-tight uppercase tracking-tighter drop-shadow-xl font-title" style={{ fontSize: `${30 * sTitle}px` }}>
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
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 border border-white/30 font-text outline-none" 
                style={{fontFamily: textFont,  backgroundColor: brandColor }}
              >
                {item.label || `0${i + 1}`}
              </div>
              <p 
                contentEditable 
                suppressContentEditableWarning 
                onBlur={(e) => onItemChange && onItemChange(index, i, 'text', e.currentTarget.innerText)}
                className="text-white/90 leading-snug font-medium outline-none font-text" 
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

// ==========================================
// EXPORTS & METADATA
// ==========================================

export const LIST_VARIANT_COMPONENTS = {
  8: ListVariant8,
  13: ListVariant13,
  14: ListVariant14,
  16: ListVariant16,
  17: ListVariant17,
  23: ListVariant23,
  25: ListVariant25,
  26: ListVariant26,
  27: ListVariant27,
  29: ListVariant29,
};

export const LIST_VARIANT_META = [
  { id: 8, nome: 'Big Numbers', badge: null },
  { id: 13, nome: 'Step-by-Step', badge: 'NEW' },
  { id: 14, nome: 'Premium Tag', badge: 'PREMIUM' },
  { id: 16, nome: 'Card Grid', badge: 'NEW' },
  { id: 17, nome: 'Ghost Numbers', badge: null },
  { id: 23, nome: 'Focus Highlight', badge: 'NEW' },
  { id: 25, nome: 'Rounded Grid', badge: 'PRO' },
  { id: 26, nome: 'Split Premium', badge: 'PREMIUM' },
  { id: 27, nome: 'Gallery List', badge: 'PRO' },
  { id: 29, nome: 'Glass Cards', badge: 'NEW' },
];
