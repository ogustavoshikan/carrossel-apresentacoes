import React from 'react';
import { Quote } from 'lucide-react';
import SmartElement from '../smart-element';
import SlideHeader, { SlideFooterPlaceholder } from '../slide-header';

/**
 * ─────────────────────────────────────────────────────────────────
 * HELPERS LOCAIS DE RENDERIZAÇÃO
 * ─────────────────────────────────────────────────────────────────
 */

function ImageBg({ imageUrl, imagePosition, imageScale, className = '' }) {
  if (!imageUrl) return null;
  return (
    <div
      className={`absolute inset-0 bg-cover bg-no-repeat ${className}`}
      style={{
        backgroundImage: `url('${imageUrl}')`,
        backgroundPosition: `center ${imagePosition ?? 50}%`,
        transform: `scale(${imageScale ?? 1})`,
      }}
    />
  );
}

function BrandTag({ handle, brandAvatar, color, align = 'left', className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : ''} ${className}`}>
      {brandAvatar ? (
        <img src={brandAvatar} alt="avatar" className="w-5 h-5 rounded-full object-cover" />
      ) : (
        <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
      )}
      <span className="font-text font-black tracking-[0.25em] text-[10px] uppercase text-zinc-500 truncate">
        @{handle}
      </span>
    </div>
  );
}

/**
 * ─────────────────────────────────────────────────────────────────
 * VARIANTES (1 a 11)
 * ─────────────────────────────────────────────────────────────────
 */

function QuoteVariant1(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
  const tScale = titleScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };
  const isSel = (f) => selectedElement?.slideIndex === index && selectedElement?.field === f;

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col p-16 justify-center relative overflow-hidden">
      <ImageBg imageUrl={data.imageUrl} imagePosition={data.imagePosition} imageScale={data.imageScale} className="opacity-40 blur-md scale-110" />
      
      <div className="absolute left-0 top-1/4 bottom-1/4 w-3 rounded-r-xl" style={{fontFamily: textFont,  backgroundColor: brandColor }} />
      
      <Quote className="w-12 h-12 mb-8 text-white/20 relative z-10" />
      
      <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={isSel('titulo')} onSelectElement={onSelectElement} className="mb-8 pl-4 relative z-10">
        <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-title font-black text-white outline-none leading-tight" style={{ fontSize: `${40 * tScale}px` }}>"{data.titulo}"</h2>
      </SmartElement>
      
      <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={isSel('texto_apoio')} onSelectElement={onSelectElement} className="pl-4 relative z-10">
        <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-text italic text-zinc-500 outline-none block" style={{fontFamily: textFont,  fontSize: '20px' }}>{data.texto_apoio}</span>
      </SmartElement>
      
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} hideDot={true} />
    </div>
  );
}

function QuoteVariant2(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
  const tScale = titleScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };
  const isSel = (f) => selectedElement?.slideIndex === index && selectedElement?.field === f;

  return (
    <div className="w-full h-full bg-black flex flex-col p-16 justify-center text-center relative overflow-hidden">
      {data.imageUrl && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.08]">
          <ImageBg imageUrl={data.imageUrl} imagePosition={data.imagePosition} imageScale={data.imageScale} className="absolute inset-0" />
        </div>
      )}

      
      <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={isSel('titulo')} onSelectElement={onSelectElement} className="relative z-10 mb-10">
        <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-title font-bold text-white outline-none" style={{ fontSize: `${42 * tScale}px`, lineHeight: '1.2' }}>"{data.titulo}"</h2>
      </SmartElement>
      
      <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={isSel('texto_apoio')} onSelectElement={onSelectElement} className="relative z-10">
        <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-text font-black text-[14px] tracking-widest uppercase outline-none block" style={{fontFamily: textFont,  color: brandColor }}>{data.texto_apoio}</span>
      </SmartElement>
      
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} hideDot={true} />
    </div>
  );
}

function QuoteVariant3(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
  const tScale = titleScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };
  const isSel = (f) => selectedElement?.slideIndex === index && selectedElement?.field === f;

  return (
    <div className="w-full h-full flex flex-col p-16 justify-center text-center relative overflow-hidden" style={{ backgroundColor: brandColor }}>
      <ImageBg imageUrl={data.imageUrl} imagePosition={data.imagePosition} imageScale={data.imageScale} />
      <div className="absolute inset-0 bg-black/40 z-[1]" style={{ mixBlendMode: 'multiply' }} />

      <Quote className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 text-black/10 z-[2] pointer-events-none" />
      
      <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={isSel('titulo')} onSelectElement={onSelectElement} className="relative z-10 mb-12">
        <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-title font-black text-white outline-none tracking-tight" style={{ fontSize: `${44 * tScale}px`, lineHeight: '1.1' }}>"{data.titulo}"</h2>
      </SmartElement>
      
      <div className="w-full flex justify-center relative z-10 mb-4 pointer-events-none">
        <div className="w-12 h-1 bg-surface-input/300" />
      </div>
      
      <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={isSel('texto_apoio')} onSelectElement={onSelectElement} className="relative z-10">
        <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-text italic text-white/90 outline-none block" style={{fontFamily: textFont,  fontSize: '22px' }}>{data.texto_apoio}</span>
      </SmartElement>
      
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} brandColor="rgba(255,255,255,0.7)" hideDot={true} />
    </div>
  );
}

function QuoteVariant4(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
  const tScale = titleScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };
  const isSel = (f) => selectedElement?.slideIndex === index && selectedElement?.field === f;

  return (
    <div className="w-full h-full flex overflow-hidden relative bg-[#050505]">
      <div className="w-1/3 h-full relative border-r border-white/5 opacity-80">
        <ImageBg imageUrl={data.imageUrl} imagePosition={data.imagePosition} imageScale={data.imageScale} />
      </div>
      <div className="w-2/3 h-full p-10 flex flex-col justify-center relative">
        <Quote className="w-10 h-10 mb-6 relative z-10" style={{ color: brandColor }} />
        
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={isSel('titulo')} onSelectElement={onSelectElement} className="mb-8 relative z-10">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-title italic text-white outline-none" style={{ fontSize: `${28 * tScale}px`, lineHeight: '1.3' }}>{data.titulo}</h2>
        </SmartElement>
        
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={isSel('texto_apoio')} onSelectElement={onSelectElement} className="relative z-10">
          <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-text font-bold text-[10px] tracking-widest uppercase text-zinc-500 outline-none block">{data.texto_apoio}</span>
        </SmartElement>
      </div>
      
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} hideDot={true} />
    </div>
  );
}

function QuoteVariant5(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
  const tScale = titleScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };
  const isSel = (f) => selectedElement?.slideIndex === index && selectedElement?.field === f;

  return (
    <div className="w-full h-full bg-[#020202] flex flex-col p-12 justify-center relative overflow-hidden">
      <ImageBg imageUrl={data.imageUrl} imagePosition={data.imagePosition} imageScale={data.imageScale} />
      <div className="absolute inset-0 bg-black/60 z-[0]" />
      
      <div className="border border-white/10 rounded-3xl p-10 relative z-10 bg-black/40 backdrop-blur-sm">
        <div className="absolute -top-6 px-4 bg-[#020202]" style={{fontFamily: textFont,  left: '32px' }}>
          <Quote className="w-12 h-12" style={{ color: brandColor }} />
        </div>
        
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={isSel('titulo')} onSelectElement={onSelectElement} className="mb-8 mt-4 relative z-10">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-title text-white outline-none leading-relaxed" style={{ fontSize: `${26 * tScale}px` }}>{data.titulo}</h2>
        </SmartElement>
        
        <div className="flex items-center gap-4 border-t border-white/10 pt-6">
          <div className="w-5 h-5 rounded-full bg-zinc-800 shrink-0" style={{fontFamily: titleFont,  backgroundColor: brandColor }} />
          <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={isSel('texto_apoio')} onSelectElement={onSelectElement} className="relative z-10 flex-1">
            <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-text font-bold text-xs tracking-widest uppercase text-white outline-none block truncate">{data.texto_apoio}</span>
          </SmartElement>
        </div>
      </div>
      
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} hideDot={true} />
    </div>
  );
}

function QuoteVariant6(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
  const tScale = titleScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };
  const isSel = (f) => selectedElement?.slideIndex === index && selectedElement?.field === f;

  return (
    <div className="w-full h-full bg-zinc-900 flex flex-col p-12 relative overflow-hidden">
      <ImageBg imageUrl={data.imageUrl} imagePosition={data.imagePosition} imageScale={data.imageScale} />
      <div className="absolute inset-0 bg-zinc-900/80 z-[0]" />
      
      <div className="absolute top-0 left-0 right-0 h-4 z-10" style={{fontFamily: textFont,  backgroundColor: brandColor }} />
      
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} hideDot={true} />
      
      <div className="flex-1 flex flex-col justify-center relative z-10">
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={isSel('texto_apoio')} onSelectElement={onSelectElement} className="mb-8">
          <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-text font-black text-[14px] tracking-widest uppercase text-zinc-400 outline-none block">{data.texto_apoio}</span>
        </SmartElement>
        
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={isSel('titulo')} onSelectElement={onSelectElement}>
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-text text-white outline-none leading-snug" style={{ fontSize: `${38 * tScale}px` }}>"{data.titulo}"</h2>
        </SmartElement>
      </div>
    </div>
  );
}

function QuoteVariant7(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
  const tScale = titleScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };
  const isSel = (f) => selectedElement?.slideIndex === index && selectedElement?.field === f;

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col p-10 justify-center items-center relative overflow-hidden">
      <ImageBg imageUrl={data.imageUrl} imagePosition={data.imagePosition} imageScale={data.imageScale} />
      <div className="absolute inset-0 bg-black/60 z-[0]" />
      
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} hideDot={true} />
      
      <div className="w-full bg-white text-black p-10 border-4 border-zinc-700 shadow-[12px_12px_0_0_rgba(255,255,255,0.1)] relative z-10">
        <div className="absolute -top-5 -left-5 bg-black p-2 rounded-sm" style={{fontFamily: textFont,  backgroundColor: brandColor }}>
          <Quote className="w-10 h-10 text-white" />
        </div>
        
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={isSel('titulo')} onSelectElement={onSelectElement} className="mb-6 mt-2 relative z-10 w-full">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-title font-black tracking-tight outline-none" style={{ fontSize: `${30 * tScale}px`, lineHeight: '1.1' }}>{data.titulo}</h2>
        </SmartElement>
        
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={isSel('texto_apoio')} onSelectElement={onSelectElement} className="relative z-10">
          <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-text italic outline-none block" style={{fontFamily: textFont,  fontSize: '18px', color: 'rgba(0,0,0,0.6)' }}>— {data.texto_apoio}</span>
        </SmartElement>
      </div>
    </div>
  );
}

function QuoteVariant8(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
  const tScale = titleScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };
  const isSel = (f) => selectedElement?.slideIndex === index && selectedElement?.field === f;

  return (
    <div className="w-full h-full bg-[#050505] flex overflow-hidden relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} hideDot={true} />
      
      <div className="w-[20%] h-full flex items-center justify-center relative z-10" style={{ backgroundColor: brandColor }}>
        <div className="transform -rotate-90 origin-center whitespace-nowrap w-max min-w-max text-center">
            <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={isSel('texto_apoio')} onSelectElement={onSelectElement} className="inline-block relative z-10 whitespace-nowrap">
              <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-text font-black text-black tracking-[0.2em] uppercase outline-none inline-block text-lg whitespace-nowrap">
                {data.texto_apoio}
              </span>
            </SmartElement>
        </div>
      </div>
      
      <div className="w-[80%] h-full flex items-center p-12 bg-[#020202] relative">
        <ImageBg imageUrl={data.imageUrl} imagePosition={data.imagePosition} imageScale={data.imageScale} />
        <div className="absolute inset-0 bg-[#020202]/80 z-[0]" />
        
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={isSel('titulo')} onSelectElement={onSelectElement} className="relative z-10">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-text italic font-bold text-white outline-none leading-relaxed" style={{ fontSize: `${32 * tScale}px` }}>"{data.titulo}"</h2>
        </SmartElement>
      </div>
    </div>
  );
}

function QuoteVariant9(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
  const tScale = titleScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };
  const isSel = (f) => selectedElement?.slideIndex === index && selectedElement?.field === f;

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col p-12 justify-center relative overflow-hidden text-center">
      <ImageBg imageUrl={data.imageUrl} imagePosition={data.imagePosition} imageScale={data.imageScale} className="opacity-40 blur-md scale-110" />
      
      
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} hideDot={true} />
      
      <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={isSel('titulo')} onSelectElement={onSelectElement} className="mb-10 relative z-10 w-full">
        <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-title font-bold outline-none leading-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-zinc-500" style={{ fontSize: `${42 * tScale}px` }}>"{data.titulo}"</h2>
      </SmartElement>
      
      <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={isSel('texto_apoio')} onSelectElement={onSelectElement} className="relative z-10">
        <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-text font-black text-[12px] tracking-widest uppercase outline-none block" style={{fontFamily: textFont,  color: brandColor }}>— {data.texto_apoio}</span>
      </SmartElement>
    </div>
  );
}

function QuoteVariant10(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
  const tScale = titleScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };
  const isSel = (f) => selectedElement?.slideIndex === index && selectedElement?.field === f;

  return (
    <div className="w-full h-full bg-[#080808] flex flex-col p-10 justify-center relative overflow-hidden">
      <ImageBg imageUrl={data.imageUrl} imagePosition={data.imagePosition} imageScale={data.imageScale} />
      <div className="absolute inset-0 bg-black/70 z-[0]" />
      
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} hideDot={true} />
      
      <div className="w-full bg-surface-input/30 backdrop-blur-md border border-white/10 rounded-3xl rounded-bl-none p-10 relative mb-6 shadow-xl z-10">
        <Quote className="absolute top-6 right-6 w-8 h-8 text-white/10 pointer-events-none" />
        
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={isSel('titulo')} onSelectElement={onSelectElement} className="relative z-10 w-[90%]">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-title font-bold text-white outline-none leading-relaxed" style={{ fontSize: `${28 * tScale}px` }}>{data.titulo}</h2>
        </SmartElement>
      </div>
      
      <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={isSel('texto_apoio')} onSelectElement={onSelectElement} className="pl-6 relative z-10">
        <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-text text-zinc-400 italic outline-none block" style={{fontFamily: textFont,  fontSize: '18px' }}>{data.texto_apoio}</span>
      </SmartElement>
    </div>
  );
}

function QuoteVariant11(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
  const tScale = titleScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };
  const isSel = (f) => selectedElement?.slideIndex === index && selectedElement?.field === f;

  return (
    <div className="w-full h-full bg-[#E5E5E5] flex flex-col p-10 relative overflow-hidden text-black border-[12px] border-white">
      <ImageBg imageUrl={data.imageUrl} imagePosition={data.imagePosition} imageScale={data.imageScale} />
      <div className="absolute inset-0 bg-[#E5E5E5]/90 z-[0]" />
      
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} hideDot={true} />
      
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[400px] font-text font-black text-black/5 pointer-events-none leading-none select-none z-0">"</div>
      
      <div className="flex-1 flex flex-col justify-center pl-16 relative z-10 border-l-2 ml-10" style={{fontFamily: textFont,  borderColor: brandColor }}>
        <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={isSel('titulo')} onSelectElement={onSelectElement} className="mb-8 relative z-10">
          <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-title italic font-bold text-black outline-none leading-snug" style={{ fontSize: `${36 * tScale}px` }}>{data.titulo}</h2>
        </SmartElement>
        
        <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={isSel('texto_apoio')} onSelectElement={onSelectElement} className="relative z-10">
          <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-text font-black text-[11px] tracking-[0.2em] uppercase text-zinc-600 outline-none block">{data.texto_apoio}</span>
        </SmartElement>
      </div>
    </div>
  );
}

function QuoteVariant12({ data, index, slideCount, brandHandle, brandAvatar, brandColor, isVerified, titleScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showBrandHandle, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo }) {
  const tScale = titleScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };
  const isSel = (f) => selectedElement?.slideIndex === index && selectedElement?.field === f;

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col p-12 justify-center items-center relative overflow-hidden">
      {/* Cabeçalho Padronizado: Handle + Selo + Contador */}
      <SlideHeader data={data} 
        slideIndex={index} 
        onActionStart={onActionStart} 
        selectedElement={selectedElement} 
        onSelectElement={onSelectElement} 
        index={index + 1} 
        total={slideCount} 
        brandHandle={brandHandle} 
        showBrandHandle={showBrandHandle} 
        brandAvatar={brandAvatar} 
        brandColor={brandColor} 
        isVerified={isVerified} 
        showSlideCounter={showSlideCounter} 
        slideCounterPosition={slideCounterPosition} 
        hideDot={true} brandLogo={brandLogo} showBrandLogo={showBrandLogo} />

      {/* Background Premium: Gradiente de profundidade com luz suave da cor da marca */}
      <div className="absolute inset-0 bg-neutral-950 z-[0]" />
      <div className="absolute -top-[20%] -right-[20%] w-[80%] h-[80%] rounded-full blur-[120px] opacity-20" style={{fontFamily: textFont,  backgroundColor: brandColor }} />
      <div className="absolute -bottom-[20%] -left-[20%] w-[80%] h-[80%] rounded-full blur-[120px] opacity-10" style={{ backgroundColor: brandColor }} />
      
      {/* Pattern de luxo sutil */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 w-full max-w-[460px]">
        {/* Balão de Depoimento - Estilo Glassmorphism White */}
        <div className="bg-white rounded-[3rem] rounded-bl-none p-12 shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative mb-10 border-b-[12px]" style={{ borderColor: `${brandColor}CC` }}>
          <Quote className="absolute -top-5 -left-5 w-14 h-14 p-3 bg-black rounded-2xl text-white border-4 border-white shadow-2xl" style={{ backgroundColor: brandColor }} />
          
          <SmartElement slideIndex={index} field="titulo" position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={isSel('titulo')} onSelectElement={onSelectElement} className="relative z-10 w-full">
            <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)} className="font-title italic font-bold text-zinc-900 outline-none leading-relaxed tracking-tight" style={{ fontSize: `${26 * tScale}px` }}>
              "{data.titulo}"
            </h2>
          </SmartElement>
        </div>

        {/* Perfil do Cliente Estilizado */}
        <div className="flex items-center gap-5 pl-6">
          <div className="relative">
            <div className="absolute inset-0 rounded-full blur-md opacity-50" style={{fontFamily: titleFont,  backgroundColor: brandColor }} />
            <div className="w-16 h-16 rounded-full border-4 border-white/10 shadow-2xl overflow-hidden shrink-0 relative z-10">
              {data.imageUrl ? (
                <img src={data.imageUrl} alt="client" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-white/20 uppercase font-black text-[8px]">No Photo</div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col">
            <SmartElement slideIndex={index} field="texto_apoio" position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart} isSelected={isSel('texto_apoio')} onSelectElement={onSelectElement}>
              <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)} className="font-text font-black text-base tracking-[0.1em] uppercase text-white outline-none block">
                {data.texto_apoio}
              </span>
            </SmartElement>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-3 h-[1px] bg-zinc-600" />
              <span className="font-text text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-black">Cliente Satisfeito</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * ─────────────────────────────────────────────────────────────────
 * EXPORT E MAPEAMENTO
 * ─────────────────────────────────────────────────────────────────
 */

export const QUOTE_VARIANT_COMPONENTS = {
  1: QuoteVariant1,
  2: QuoteVariant2,
  3: QuoteVariant3,
  4: QuoteVariant4,
  5: QuoteVariant5,
  6: QuoteVariant6,
  7: QuoteVariant7,
  8: QuoteVariant8,
  9: QuoteVariant9,
  10: QuoteVariant10,
  11: QuoteVariant11,
  12: QuoteVariant12,
};

export const QUOTE_VARIANT_META = [
  { id: 0, name: 'Original', description: 'Layout quote padrão centralizado', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_quote0.png' },
  { id: 1, name: 'Classic Dark', description: 'Escuro com ícone de aspas e detalhe lateral', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_quote1.png' },
  { id: 2, name: 'Blur Movie', description: 'Imagem desfocada com gradiente e logo', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_quote2.png' },
  { id: 3, name: 'Brand Main', description: 'Fundo da cor da marca com citação centralizada e gigante', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_quote3.png' },
  { id: 4, name: 'Side Dark', description: 'Imagem escura na esquerda, texto claro na direita', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_quote4.png' },
  { id: 5, name: 'Bento Card', description: 'Card vidro com ícone deslocado no topo', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_quote5.png' },
  { id: 6, name: 'Simple Top', description: 'Simples com detalhe na barra superior', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_quote6.png' },
  { id: 7, name: 'White Box', description: 'Card branco com bordas brutais flutuantes', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_quote7.png' },
  { id: 8, name: 'Vertical Auth', description: 'Sidebar esticada colorida com autor rotacionado', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_quote8.png' },
  { id: 9, name: 'Gradient Text', description: 'Texto gigante com preenchimento em gradiente brilhante', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_quote9.png' },
  { id: 10, name: 'Glass Card', description: 'Card vidro desfocado em fundo fotográfico', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_quote10.png' },
  { id: 11, name: 'Light Print', description: 'Estilo editorial impresso com citação ao fundo', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_quote11.png' },
  { id: 12, name: 'Social Proof', description: 'Depoimento premium com balão e avatar', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_quote12.png' }
];


