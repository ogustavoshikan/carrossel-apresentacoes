import React from 'react';
import { Zap, Heart, Bookmark, Share2, Check, ArrowUpRight, Calendar, MousePointer2, Image as ImageIcon, ArrowRight, Store, Share, MessageCircle, Send } from 'lucide-react';
import SmartElement from '../smart-element';
import SlideHeader from '../slide-header';

// ─── Helper: ImageBg ────────────────────────────────────────
// Renderiza o background de imagem ou placeholder.
export function ImageBg({ data, className = '', style = {}, slideIndex, imageUrl, imagePosition, imagePositionX, containerClassName, placeholderText, children }) {
  const url = imageUrl || data?.imageUrl;
  const positionY = imagePosition ?? data?.imagePosition ?? 50;
  const positionX = imagePositionX ?? data?.imagePositionX ?? 50;

  if (url) {
    return (
      <div
        className={`bg-cover ${className} ${containerClassName || ''}`}
        style={{
          backgroundImage: `url(${url})`,
          backgroundPosition: `${positionX}% ${positionY}%`,
          transform: `scale(${data?.imageScale ?? 1})`,
          transformOrigin: 'center center',
          ...style,
        }}
      >
        {children}
      </div>
    );
  }  return (
    <div className={`bg-zinc-900 flex items-center justify-center opacity-50 ${className} ${containerClassName || ''}`} style={style}>
      {placeholderText && <span className="text-zinc-500 text-xs">{placeholderText}</span>}
      {children}
    </div>
  );
}

// ==========================================
// Variante 1: Minimalista e Focada
// ==========================================
export function CTAVariant1(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, brandHandle, slideCount , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col p-16 items-center justify-center text-center relative">
      
      <div className="absolute inset-0 opacity-40 blur-md scale-110 pointer-events-none">
        <ImageBg
          data={data}
          slideIndex={index}
          imageUrl={data.imageUrl}
          imagePosition={data.imagePosition}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'}
          onSelectElement={onSelectElement}
          className="w-full h-full"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-1 z-10" style={{ backgroundColor: brandColor }}></div>
      <div className="w-24 h-24 rounded-full border-2 p-1 mb-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-shadow duration-150 hover:shadow-[0_0_60px_rgba(0,0,0,0.8)]" style={{ borderColor: brandColor }}>
        <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden">
          <span className="font-text font-black text-2xl uppercase" style={{fontFamily: textFont,  color: brandColor }}>
          </span>        </div>
      </div>
      
      <SmartElement
        slideIndex={index}
        field="titulo"
        position={pos('titulo')}
        showMetrics={showMetrics}
        onActionStart={onActionStart}
        isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
        onSelectElement={onSelectElement}
        className="mb-6 w-full relative z-10"
      >
        <h2
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
          className="font-title font-black text-white leading-[1.1] tracking-tighter outline-none"
          style={{ fontSize: `${38 * sTitle}px` }}
        >
          {data.titulo}
        </h2>
      </SmartElement>
      
      <SmartElement
        slideIndex={index}
        field="texto_apoio"
        position={pos('texto_apoio')}
        showMetrics={showMetrics}
        onActionStart={onActionStart}
        isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
        onSelectElement={onSelectElement}
        className="mb-12 relative z-10"
      >
        <p
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
          className="font-text text-zinc-400 outline-none"
          style={{ fontSize: `${18 * sText}px` }}
        >
          {data.texto_apoio}
        </p>
      </SmartElement>

      <SmartElement
        slideIndex={index}
        field="tag"
        position={pos('tag')}
        showMetrics={showMetrics}
        onActionStart={onActionStart}
        isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'tag'}
        onSelectElement={onSelectElement}
        className="w-full relative z-10"
      >
        <button
          className="w-full py-5 font-tag font-black text-[12px] uppercase tracking-widest rounded-full text-white transition-all shadow-xl pointer-events-none"
          style={{fontFamily: titleFont,  backgroundColor: brandColor }}
        >
          {data.tag || 'RESERVE SUA DATA'}
        </button>
      </SmartElement>
    </div>
  );
}

// ==========================================
// Variante 4: Card Destacado
// ==========================================
export function CTAVariant4(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col justify-center items-center p-8 relative">
      <div className="absolute inset-0 opacity-40 blur-lg scale-110 pointer-events-none">
        <ImageBg
          data={data}
          slideIndex={index}
          imageUrl={data.imageUrl}
          imagePosition={data.imagePosition}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'}
          onSelectElement={onSelectElement}
          className="w-full h-full"
        />
      </div>
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      
      <div className="w-full bg-[#E5E5E5] rounded-3xl flex flex-col relative shadow-2xl z-10">
        <div className="absolute top-[45%] -left-4 w-8 h-8 bg-[#050505] rounded-full -translate-y-1/2 z-10"></div>
        <div className="absolute top-[45%] -right-4 w-8 h-8 bg-[#050505] rounded-full -translate-y-1/2 z-10"></div>
        
        <div className="p-10 border-b-2 border-dashed border-zinc-400 flex flex-col items-center text-center">
          <SmartElement
            slideIndex={index}
            field="titulo"
            position={pos('titulo')}
            showMetrics={showMetrics}
            onActionStart={onActionStart}
            isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
            onSelectElement={onSelectElement}
            className="mb-4 relative z-10 w-full"
          >
            <h2
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black text-black tracking-tighter leading-none outline-none"
              style={{ fontSize: `${38 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartElement>
          
          <SmartElement
            slideIndex={index}
            field="texto_apoio"
            position={pos('texto_apoio')}
            showMetrics={showMetrics}
            onActionStart={onActionStart}
            isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
            onSelectElement={onSelectElement}
            className="relative z-10 w-full"
          >
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text italic text-zinc-600 outline-none"
              style={{ fontSize: `${16 * sText}px` }}
            >
              {data.texto_apoio}
            </p>
          </SmartElement>
        </div>
        
        <div className="px-8 pb-8 pt-6 bg-white flex flex-col items-center text-center rounded-b-3xl">
          <div className="w-full flex gap-1 justify-center mb-6 opacity-40 pointer-events-none">
            <div className="h-8 bg-black w-2 px-[2px]"></div>
            <div className="h-8 bg-black w-1 px-[2px]"></div>
            <div className="h-8 bg-black w-2 px-[1px]"></div>
            <div className="h-8 bg-black w-1 px-[2px]"></div>
            <div className="h-8 bg-black w-2 px-[2px]"></div>
            <div className="h-8 bg-black w-1 px-[1px]"></div>
            <div className="h-8 bg-black w-2 px-[2px]"></div>
            <div className="h-8 bg-black w-1 px-[2px]"></div>
            <div className="h-8 bg-black w-2 px-[1px]"></div>
            <div className="h-8 bg-black w-1 px-[2px]"></div>
            <div className="h-8 bg-black w-2 px-[2px]"></div>
            <div className="h-8 bg-black w-1 px-[1px]"></div>
            <div className="h-8 bg-black w-2 px-[2px]"></div>
          </div>
          
          <SmartElement
            slideIndex={index}
            field="tag"
            position={pos('tag')}
            showMetrics={showMetrics}
            onActionStart={onActionStart}
            isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'tag'}
            onSelectElement={onSelectElement}
            className="w-full relative z-10"
          >
            <button
              className="w-full py-4 font-tag font-black text-white text-[10px] uppercase tracking-widest rounded-xl shadow-lg pointer-events-none"
              style={{fontFamily: titleFont,  backgroundColor: brandColor }}
            >
              {data.tag || 'RESERVE SUA DATA'}
            </button>
          </SmartElement>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Variante 5: Blur & Tilt
// ==========================================
export function CTAVariant5(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full flex flex-col p-10 justify-center items-center relative bg-black">
      {data.imageUrl && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.08]">
          <ImageBg data={data} className="absolute inset-0" />
        </div>
      )}
      <div className="absolute inset-0 scale-110 opacity-60 z-10">
        <ImageBg
          slideIndex={index}
          imageUrl={data.imageUrl}
          imagePosition={data.imagePosition}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'}
          onSelectElement={onSelectElement}
          containerClassName="blur-md"
        />
      </div>
      
      <div className="relative z-10 w-[95%] bg-surface-input/30 backdrop-blur-3xl border border-white/20 rounded-[2rem] p-8 py-10 shadow-2xl flex flex-col items-center text-center transform -rotate-2 hover:rotate-0 transition-transform duration-150">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-inner pointer-events-none" style={{ backgroundColor: brandColor }}>
          <ArrowUpRight className="w-8 h-8 text-white" />
        </div>
        
        <SmartElement
          slideIndex={index}
          field="titulo"
          position={pos('titulo')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-4 relative z-10 w-full"
        >
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black text-white tracking-tight leading-none outline-none"
            style={{ fontSize: `${36 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartElement>
        
        <SmartElement
          slideIndex={index}
          field="texto_apoio"
          position={pos('texto_apoio')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
          className="mb-8 relative z-10 w-full"
        >
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-white/80 outline-none text-sm"
            style={{ fontSize: `${14 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartElement>

        <SmartElement
          slideIndex={index}
          field="tag"
          position={pos('tag')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'tag'}
          onSelectElement={onSelectElement}
          className="w-[90%] relative z-10"
        >
          <button className="w-full py-4 bg-white text-black font-tag font-black text-[10px] uppercase tracking-widest rounded-xl shadow-xl pointer-events-none">
            {data.tag || 'RESERVE SUA DATA'}
          </button>
        </SmartElement>
      </div>
    </div>
  );
}

// ==========================================
// Variante 6: Clean Tipográfico
// ==========================================
export function CTAVariant6(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, brandHandle , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full bg-[#020202] flex flex-col p-10 relative justify-between text-center">
      <div className="absolute inset-0 opacity-30 blur-md scale-110 pointer-events-none">
        <ImageBg
          data={data}
          slideIndex={index}
          imageUrl={data.imageUrl}
          imagePosition={data.imagePosition}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'}
          onSelectElement={onSelectElement}
          className="w-full h-full"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />

      <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-50 pointer-events-none">
      </div>
      
      <div className="flex-1 flex flex-col justify-center items-center mt-8">
        <SmartElement
          slideIndex={index}
          field="titulo"
          position={pos('titulo')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-6 w-full relative z-10"
        >
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black text-white tracking-tighter leading-[0.9] outline-none"
            style={{ fontSize: `${48 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartElement>
        
        <SmartElement
          slideIndex={index}
          field="texto_apoio"
          position={pos('texto_apoio')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
          className="relative z-10 w-full mx-auto"
        >
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-zinc-500 outline-none block mx-auto max-w-[85%]"
            style={{ fontSize: `${18 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartElement>
      </div>

      <SmartElement
        slideIndex={index}
        field="tag"
        position={pos('tag')}
        showMetrics={showMetrics}
        onActionStart={onActionStart}
        isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'tag'}
        onSelectElement={onSelectElement}
        className="w-full relative z-10"
      >
        <button
          className="w-full py-6 font-tag font-black text-[14px] uppercase tracking-[0.4em] rounded-2xl text-white transition-all shadow-[0_0_40px_rgba(0,0,0,0.5)] hover:scale-105 pointer-events-none"
          style={{fontFamily: titleFont,  backgroundColor: brandColor }}
        >
          {data.tag || 'CLIQUE AQUI'}
        </button>
      </SmartElement>
    </div>
  );
}

// ==========================================
// Variante 7: Interface/App Look
// ==========================================
export function CTAVariant7(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, brandHandle , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full bg-black flex flex-col p-10 relative items-center justify-center">
      {data.imageUrl && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.08]">
          <ImageBg data={data} className="absolute inset-0" />
        </div>
      )}

      <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-50 pointer-events-none">
      </div>
      
      <div className="w-full bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-8 pt-10 shadow-2xl relative z-10 mt-8 flex flex-col items-center text-center">
        <Calendar 
          className="absolute -top-6 left-8 w-12 h-12 p-3 bg-black border border-white/10 rounded-xl pointer-events-none" 
          style={{ color: brandColor }} 
        />
        
        <SmartElement
          slideIndex={index}
          field="titulo"
          position={pos('titulo')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-4 mt-6 relative z-10 w-full"
        >
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black text-white tracking-tight leading-none outline-none"
            style={{ fontSize: `${30 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartElement>
        
        <SmartElement
          slideIndex={index}
          field="texto_apoio"
          position={pos('texto_apoio')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
          className="mb-8 relative z-10 w-full"
        >
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-zinc-400 text-sm outline-none"
            style={{ fontSize: `${14 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartElement>
        
        <div className="grid grid-cols-7 gap-2 mb-8 opacity-40 pointer-events-none w-full">
          {[...Array(14)].map((_, i) => (
             <div key={i} className={`h-6 rounded ${i === 8 ? '' : 'bg-zinc-800'}`} style={i === 8 ? { backgroundColor: brandColor } : {}}></div>
          ))}
        </div>
        
        <SmartElement
          slideIndex={index}
          field="tag"
          position={pos('tag')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'tag'}
          onSelectElement={onSelectElement}
          className="w-full relative z-10"
        >
          <button className="w-full py-4 rounded-xl font-tag font-black text-[10px] uppercase tracking-widest text-black bg-white flex items-center justify-center gap-2 hover:bg-zinc-200 pointer-events-none">
            <MousePointer2 className="w-4 h-4" /> {data.tag || 'RESERVE SUA DATA'}
          </button>
        </SmartElement>
      </div>
    </div>
  );
}

// ==========================================
// Variante 9: Arrow Solid
// ==========================================
export function CTAVariant9(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };
  const gradientColor1 = brandColor;

  return (
    <div className="w-full h-full p-8 flex flex-col justify-center" style={{ backgroundColor: gradientColor1, color: 'white' }}>
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <SmartElement
          slideIndex={index} field="titulo"
          position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement} className="mb-6 w-full shrink-0"
        >
          <h2 contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-text font-black leading-[0.9] tracking-tighter uppercase outline-none"
            style={{ fontSize: `${48 * sTitle}px` }}>
            {data.titulo}
          </h2>
        </SmartElement>
        <SmartElement
          slideIndex={index} field="texto_apoio"
          position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement} className="mb-8 w-full shrink-0"
        >
          <p contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="text-white/90 font-medium leading-relaxed outline-none"
            style={{ fontSize: `${16 * sText}px` }}>
            {data.texto_apoio}
          </p>
        </SmartElement>
        <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shrink-0 shadow-xl pointer-events-none">
          <ArrowRight className="w-8 h-8" />
        </div>
      </div>
      <div className="w-full text-center mt-auto shrink-0 pt-4 pointer-events-none">
        <span className="font-text font-bold tracking-[0.2em] text-[10px] uppercase text-white/50">LINK NA BIO</span>
      </div>
    </div>
  );
}

// ==========================================
// Variante 12: Dark Double CTA
// ==========================================
export function CTAVariant12(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };
  const gradientColor1 = brandColor;

  return (
    <div className="w-full h-full p-8 flex flex-col justify-center bg-black" style={{fontFamily: textFont,  color: 'white' }}>
      {data.imageUrl && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.08]">
          <ImageBg data={data} className="absolute inset-0" />
        </div>
      )}
      <div className="flex-1 flex flex-col justify-center items-center text-center relative z-10">
        <SmartElement
          slideIndex={index} field="titulo"
          position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement} className="mb-4 w-full shrink-0"
        >
          <h2 contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black leading-tight outline-none"
            style={{ fontSize: `${36 * sTitle}px` }}>
            {data.titulo}
          </h2>
        </SmartElement>
        <SmartElement
          slideIndex={index} field="texto_apoio"
          position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement} className="mb-10 w-[90%] shrink-0"
        >
          <p contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-zinc-400 leading-relaxed outline-none"
            style={{ fontSize: `${15 * sText}px` }}>
            {data.texto_apoio}
          </p>
        </SmartElement>
        <div className="w-full flex flex-col gap-3 shrink-0 pointer-events-none">
          <div className="w-full py-4 rounded-xl flex items-center justify-center gap-2 font-text font-bold uppercase tracking-widest text-xs" style={{fontFamily: textFont,  backgroundColor: gradientColor1 }}>
            <Bookmark className="w-4 h-4" /> Salvar Post
          </div>
          <div className="w-full py-4 rounded-xl flex items-center justify-center gap-2 font-text font-bold uppercase tracking-widest text-xs border border-zinc-700 bg-zinc-800">
            <Share className="w-4 h-4" /> Enviar Direct
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Variante 14: Store Dashed Border
// ==========================================
export function CTAVariant14(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };
  const gradientColor1 = brandColor;
  const gradientColor2 = brandColor + 'CC';

  return (
    <div className="w-full h-full p-6 flex flex-col justify-center items-center text-white relative bg-black">
      {data.imageUrl && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.08]">
          <ImageBg data={data} className="absolute inset-0" />
        </div>
      )}
      <div className="absolute inset-4 border border-white/10 rounded-[40px] pointer-events-none z-10" />
      <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 shrink-0 relative z-10 pointer-events-none" style={{ backgroundColor: brandColor }}>
        <Store className="w-8 h-8 text-white" />
        <div className="absolute -inset-2 border border-dashed rounded-full" style={{ borderColor: gradientColor1 }} />
      </div>
      <SmartElement
        slideIndex={index} field="titulo"
        position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart}
        isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
        onSelectElement={onSelectElement} className="mb-4 w-full text-center shrink-0 relative z-10"
      >
        <h2 contentEditable suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
          className="font-title font-black leading-[1.1] tracking-tight outline-none"
          style={{ fontSize: `${28 * sTitle}px` }}>
          {data.titulo}
        </h2>
      </SmartElement>
      <SmartElement
        slideIndex={index} field="texto_apoio"
        position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart}
        isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
        onSelectElement={onSelectElement} className="mb-10 w-[85%] text-center shrink-0 relative z-10"
      >
        <p contentEditable suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
          className="font-text text-zinc-300 leading-relaxed outline-none"
          style={{ fontSize: `${14 * sText}px` }}>
          {data.texto_apoio}
        </p>
      </SmartElement>
      <div className="px-6 py-3 rounded-full text-xs font-text font-bold tracking-widest uppercase cursor-pointer shrink-0 pointer-events-none relative z-10" style={{ backgroundColor: brandColor }}>Enviar Mensagem</div>
    </div>
  );
}

// ==========================================
// Variante 16: VIP Dashed Border
// ==========================================
export function CTAVariant16(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };
  const gradientColor1 = brandColor;

  return (
    <div className="w-full h-full p-8 flex flex-col justify-center items-center" style={{fontFamily: textFont,  backgroundColor: gradientColor1, color: 'white' }}>
      <div className="w-full flex-1 border-2 border-dashed border-white/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center relative">
        <div className="absolute top-1/2 -left-4 w-8 h-8 rounded-full pointer-events-none" style={{ backgroundColor: gradientColor1 }} />
        <div className="absolute top-1/2 -right-4 w-8 h-8 rounded-full pointer-events-none" style={{ backgroundColor: gradientColor1 }} />
        <Store className="w-10 h-10 mb-6 opacity-80 pointer-events-none" />
        <SmartElement
          slideIndex={index} field="titulo"
          position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement} className="mb-4 shrink-0"
        >
          <h2 contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black leading-tight uppercase tracking-widest outline-none"
            style={{ fontSize: `${32 * sTitle}px` }}>
            {data.titulo}
          </h2>
        </SmartElement>
        <SmartElement
          slideIndex={index} field="texto_apoio"
          position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement} className="mb-8 shrink-0"
        >
          <p contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-white/80 leading-relaxed font-medium outline-none"
            style={{ fontSize: `${15 * sText}px` }}>
            {data.texto_apoio}
          </p>
        </SmartElement>
        <div className="bg-white text-black px-6 py-2 rounded-full text-[10px] font-text font-bold uppercase tracking-widest mt-auto pointer-events-none">Acesso Vip</div>
      </div>
    </div>
  );
}

// ==========================================
// Variante 18: Polaroid Tilt
// ==========================================
export function CTAVariant18(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };
  const gradientColor1 = brandColor;
  const imgUrl = data?.imageUrl;

  return (
    <div className="w-full h-full p-6 flex flex-col items-center justify-center relative" style={{fontFamily: textFont,  backgroundColor: gradientColor1 }}>
      <div className="bg-white p-4 pb-6 shadow-2xl rotate-3 w-[85%] relative z-10 flex flex-col pointer-events-none">
        <div className="w-full aspect-square bg-zinc-200 relative mb-4 border border-zinc-100">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${imgUrl})`, backgroundPosition: 'center 50%' }} />
        </div>
        <div className="flex justify-between items-center px-2">
          <span className="font-text font-bold text-[#1a1a1a] text-xs uppercase tracking-widest">LINK NA BIO</span>
          <ArrowRight className="w-4 h-4 text-[#1a1a1a]" />
        </div>
      </div>
      <div className="absolute top-12 left-6 z-20 -rotate-6 w-[80%]">
        <SmartElement
          slideIndex={index} field="titulo"
          position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
        >
          <h2 contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black text-white leading-tight drop-shadow-lg outline-none"
            style={{ fontSize: `${36 * sTitle}px` }}>
            {data.titulo}
          </h2>
        </SmartElement>
      </div>
    </div>
  );
}

// ==========================================
// Variante 19: Social Blur Footer
// ==========================================
export function CTAVariant19(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, slideCount , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full flex flex-col p-8 relative" style={{fontFamily: textFont,  backgroundColor: brandColor, color: 'white' }}>
      
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <SmartElement
          slideIndex={index} field="titulo"
          position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement} className="w-full mb-6 shrink-0"
        >
          <h2 contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black leading-[0.9] tracking-tighter uppercase outline-none"
            style={{ fontSize: `${48 * sTitle}px` }}>
            {data.titulo}
          </h2>
        </SmartElement>
        <SmartElement
          slideIndex={index} field="texto_apoio"
          position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement} className="w-[85%] shrink-0"
        >
          <p contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="text-white/90 font-medium leading-relaxed outline-none"
            style={{ fontSize: `${16 * sText}px` }}>
            {data.texto_apoio}
          </p>
        </SmartElement>
      </div>
      <div className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-4 flex justify-between items-center shadow-lg mt-auto shrink-0 pointer-events-none">
        <div className="flex gap-6 pl-4">
          <Heart className="w-7 h-7 text-white" />
          <MessageCircle className="w-7 h-7 text-white" />
          <Send className="w-7 h-7 text-white" />
        </div>
        <div className="pr-4 border-l border-white/20 pl-4">
          <Bookmark className="w-7 h-7 text-white" fill="currentColor" />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Variante 20: Floating Polaroid
// ==========================================
export function CTAVariant20(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, slideCount , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-zinc-200 relative">
      <div className="absolute top-6 left-6 right-6">
        
      </div>
      <div className="w-[90%] bg-white p-4 pb-8 shadow-[0_20px_50px_rgba(0,0,0,0.2)] rotate-2 border border-white relative z-10 flex flex-col mt-8">
        <div className="w-full aspect-square relative mb-6 p-8 flex flex-col justify-center items-center text-center shadow-inner rounded-md" style={{fontFamily: titleFont,  backgroundColor: brandColor }}>
          <SmartElement
            slideIndex={index} field="titulo"
            position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart}
            isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
            onSelectElement={onSelectElement} className="w-full shrink-0 mb-4"
          >
            <h2 contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-text font-black text-white leading-tight uppercase tracking-tighter outline-none"
              style={{ fontSize: `${36 * sTitle}px` }}>
              {data.titulo}
            </h2>
          </SmartElement>
          <SmartElement
            slideIndex={index} field="texto_apoio"
            position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart}
            isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
            onSelectElement={onSelectElement} className="w-[95%] shrink-0"
          >
            <p contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="text-white/90 font-medium leading-snug outline-none"
              style={{ fontSize: `${14 * sText}px` }}>
              {data.texto_apoio}
            </p>
          </SmartElement>
        </div>
        <div className="flex justify-between items-center px-4 w-full pointer-events-none">
          <div className="flex gap-5">
            <Heart className="w-6 h-6 text-zinc-400" />
            <MessageCircle className="w-6 h-6 text-zinc-400" />
            <Send className="w-6 h-6 text-zinc-400" />
          </div>
          <Bookmark className="w-6 h-6" style={{fontFamily: textFont,  color: brandColor }} fill="currentColor" />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Variante 21: Dark Bookmark Focus
// ==========================================
export function CTAVariant21(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, slideCount , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full p-8 flex flex-col relative" style={{ backgroundColor: brandColor }}>
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-black/20 rounded-full blur-[80px] pointer-events-none z-0" />
      <div className="relative z-10">
        
      </div>
      <div className="flex-1 flex flex-col justify-center items-start relative z-10">
        <div className="text-white p-4 rounded-full mb-8 shadow-xl inline-flex pointer-events-none" style={{ backgroundColor: 'rgb(255 255 255 / 0.1)' }}>
          <Bookmark className="w-8 h-8" fill="currentColor" />
        </div>
        <SmartElement
          slideIndex={index} field="titulo"
          position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement} className="w-full shrink-0 mb-4"
        >
          <h2 contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-text font-black text-white leading-[0.85] uppercase tracking-tighter outline-none"
            style={{ fontSize: `${52 * sTitle}px` }}>
            {data.titulo}
          </h2>
        </SmartElement>
        <SmartElement
          slideIndex={index} field="texto_apoio"
          position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement} className="w-[85%] shrink-0 mb-12"
        >
          <p contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="text-white/80 font-medium leading-snug outline-none"
            style={{ fontSize: `${16 * sText}px` }}>
            {data.texto_apoio}
          </p>
        </SmartElement>
        <div className="flex gap-4 items-center w-full mt-auto pointer-events-none">
          <div className="flex-1 h-16 rounded-2xl flex items-center justify-center shadow-lg" style={{ backgroundColor: 'rgb(255 255 255 / 0.1)' }}>
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 h-16 rounded-2xl flex items-center justify-center shadow-lg" style={{ backgroundColor: 'rgb(255 255 255 / 0.1)' }}>
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 h-16 rounded-2xl flex items-center justify-center shadow-lg" style={{ backgroundColor: 'rgb(255 255 255 / 0.1)' }}>
            <Send className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Variante 22: Editorial Side Sidebar
// ==========================================
export function CTAVariant22(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, slideCount , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full flex bg-white relative">
      <div className="flex-1 p-8 flex flex-col justify-center relative z-10" style={{fontFamily: textFont,  backgroundColor: brandColor }}>
        
        <div style={{ paddingTop: '60px' }}>
          <SmartElement
            slideIndex={index} field="titulo"
            position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart}
            isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
            onSelectElement={onSelectElement} className="w-full shrink-0 mb-6 mt-10"
          >
            <h2 contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-text font-black text-white leading-[0.9] uppercase tracking-tighter outline-none"
              style={{ fontSize: `${46 * sTitle}px` }}>
              {data.titulo}
            </h2>
          </SmartElement>
          <SmartElement
            slideIndex={index} field="texto_apoio"
            position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart}
            isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
            onSelectElement={onSelectElement} className="w-[90%] shrink-0"
          >
            <p contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="text-white/90 font-medium leading-relaxed outline-none"
              style={{ fontSize: `${15 * sText}px` }}>
              {data.texto_apoio}
            </p>
          </SmartElement>
        </div>
        <div className="mt-auto pt-8 pointer-events-none">
          <span className="text-white/60 font-text font-bold uppercase tracking-widest text-[9px]">NÃO ESQUEÇA DE SALVAR</span>
        </div>
      </div>
      <div className="w-20 shrink-0 h-full flex flex-col items-center justify-center gap-8 py-8 relative z-20 pointer-events-none" style={{ backgroundColor: brandColor + '21' }}>
        <Heart className="w-7 h-7 opacity-80" style={{ color: brandColor }} />
        <MessageCircle className="w-7 h-7 opacity-80" style={{ color: brandColor }} />
        <Send className="w-7 h-7 opacity-80" style={{ color: brandColor }} />
        <div className="w-8 h-[2px] bg-white/20 my-2" />
        <Bookmark className="w-7 h-7 opacity-100" fill="currentColor" style={{ color: brandColor }} />
      </div>
    </div>
  );
}

// ==========================================
// Variante 23: Bento Social Grid
// ==========================================
export function CTAVariant23(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, slideCount , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full p-8 flex flex-col justify-between bg-zinc-100 relative">
      <div className="relative z-10">
        
      </div>
      <div className="flex flex-col mt-4 mb-auto w-[90%] z-10" style={{ paddingTop: '80px' }}>
        <SmartElement
          slideIndex={index} field="titulo"
          position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement} className="mb-4 w-full shrink-0"
        >
          <h2 contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black text-[#1a1a1a] leading-none uppercase tracking-tighter outline-none"
            style={{ fontSize: `${48 * sTitle}px` }}>
            {data.titulo}
          </h2>
        </SmartElement>
        <SmartElement
          slideIndex={index} field="texto_apoio"
          position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement} className="w-[85%] shrink-0"
        >
          <p contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="text-zinc-600 font-medium leading-relaxed outline-none"
            style={{ fontSize: `${15 * sText}px` }}>
            {data.texto_apoio}
          </p>
        </SmartElement>
      </div>
      <div className="flex justify-between items-end mt-auto w-full z-10 pointer-events-none">
        <div className="flex items-center gap-2 mb-2 text-white px-5 py-2.5 rounded-full shadow-lg" style={{ backgroundColor: brandColor }}>
          <Bookmark className="w-3 h-3" />
          <span className="font-text font-bold text-[10px] tracking-widest uppercase">Salve este post</span>
        </div>
        <div className="grid grid-cols-2 gap-3 shrink-0">
          <div className="w-14 h-14 rounded-2xl bg-white shadow-[0_10px_20px_rgba(0,0,0,0.05)] border border-zinc-200 flex items-center justify-center">
            <Heart className="w-6 h-6 text-zinc-400" />
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white shadow-[0_10px_20px_rgba(0,0,0,0.05)] border border-zinc-200 flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-zinc-400" />
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white shadow-[0_10px_20px_rgba(0,0,0,0.05)] border border-zinc-200 flex items-center justify-center">
            <Send className="w-6 h-6 text-zinc-400" />
          </div>
          <div className="w-14 h-14 rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.2)] flex items-center justify-center" style={{fontFamily: textFont,  backgroundColor: brandColor }}>
            <Bookmark className="w-6 h-6 text-white" fill="currentColor" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Variante 24: Cinema Overlay Action
// ==========================================
export function CTAVariant24(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, slideCount , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };
  const imgUrl = data?.imageUrl;

  return (
    <div className="w-full h-full relative bg-black">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{ backgroundImage: `url(${imgUrl})`, backgroundPosition: 'center 50%' }} />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-8 pb-12">
        
        <div className="flex-1 flex flex-col justify-end pb-8" style={{ marginBottom: '95px' }}>
          <SmartElement
            slideIndex={index} field="titulo"
            position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart}
            isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
            onSelectElement={onSelectElement} className="w-full mb-3 shrink-0"
          >
            <h2 contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black text-white leading-none uppercase tracking-tighter drop-shadow-xl outline-none"
              style={{ fontSize: `${46 * sTitle}px` }}>
              {data.titulo}
            </h2>
          </SmartElement>
          <SmartElement
            slideIndex={index} field="texto_apoio"
            position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart}
            isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
            onSelectElement={onSelectElement} className="w-[85%] shrink-0"
          >
            <p contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="text-white/90 font-medium leading-relaxed drop-shadow-md outline-none"
              style={{ fontSize: `${15 * sText}px` }}>
              {data.texto_apoio}
            </p>
          </SmartElement>
        </div>
      </div>
      <div className="absolute bottom-8 left-[-10%] right-[-10%] h-24 bg-white/10 backdrop-blur-xl border-y border-white/20 rotate-[-3deg] z-20 flex items-center justify-center gap-8 shadow-[0_20px_40px_rgba(0,0,0,0.5)] pointer-events-none">
        <div className="flex items-center gap-8 rotate-[3deg]">
          <Heart className="w-7 h-7 text-white opacity-80" />
          <MessageCircle className="w-7 h-7 text-white opacity-80" />
          <Send className="w-7 h-7 text-white opacity-80" />
          <div className="w-px h-8 bg-white/30 mx-2" />
          <Bookmark className="w-8 h-8 opacity-100 drop-shadow-lg" style={{fontFamily: titleFont,  color: brandColor }} fill="currentColor" />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Variante 25: Giant Icon Watermark
// ==========================================
export function CTAVariant25(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, slideCount , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };
  const bgBase = '#FFFFFF';

  return (
    <div className="w-full h-full p-8 flex flex-col relative" style={{ backgroundColor: bgBase }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center pointer-events-none z-0 opacity-[0.04]">
        <Bookmark className="w-[400px] h-[400px]" style={{ color: brandColor }} fill="currentColor" />
      </div>
      <div className="relative z-10">
        
      </div>
      <div className="flex-1 flex flex-col justify-center items-center text-center relative z-10 mt-8 mb-4">
        <SmartElement
          slideIndex={index} field="titulo"
          position={pos('titulo')} showMetrics={showMetrics} onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement} className="w-full mb-6 shrink-0"
        >
          <h2 contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-text font-black leading-[0.9] uppercase tracking-tighter text-[#1a1a1a] outline-none"
            style={{ fontSize: `${52 * sTitle}px` }}>
            {data.titulo}
          </h2>
        </SmartElement>
        <SmartElement
          slideIndex={index} field="texto_apoio"
          position={pos('texto_apoio')} showMetrics={showMetrics} onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement} className="w-[90%] shrink-0"
        >
          <p contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="text-zinc-600 font-medium leading-relaxed outline-none"
            style={{ fontSize: `${16 * sText}px` }}>
            {data.texto_apoio}
          </p>
        </SmartElement>
      </div>
      <div className="w-full rounded-3xl p-5 flex justify-between items-center relative z-20 shadow-2xl mt-auto pointer-events-none" style={{fontFamily: textFont,  backgroundColor: brandColor }}>
        <div className="flex gap-4 pl-2">
          <div className="p-2 rounded-full bg-white/10">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div className="p-2 rounded-full bg-white/10">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div className="p-2 rounded-full bg-white/10">
            <Send className="w-5 h-5 text-white" />
          </div>
        </div>
        <div className="flex items-center gap-3 pr-2 border-l border-white/20 pl-4">
          <span className="font-text font-bold text-[9px] uppercase tracking-widest text-white/50">SALVAR</span>
          <div className="p-2 rounded-full bg-white text-black shadow-lg">
            <Bookmark className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Variante 26: Modern Split Actions
// ==========================================
export function CTAVariant26(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, slideCount , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full flex flex-col relative bg-white">
      <div className="h-[65%] w-full p-8 flex flex-col justify-center relative z-10 shrink-0">
        
        <SmartElement
          slideIndex={index}
          field="titulo"
          position={pos('titulo')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="w-full mb-4 shrink-0 mt-8"
        >
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black text-[#1a1a1a] leading-none uppercase tracking-tighter outline-none"
            style={{ fontSize: `${42 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartElement>
        <SmartElement
          slideIndex={index}
          field="texto_apoio"
          position={pos('texto_apoio')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
          className="w-full shrink-0"
        >
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-zinc-600 font-medium leading-relaxed outline-none"
            style={{ fontSize: `${15 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartElement>
      </div>
      <div className="flex-1 w-full bg-zinc-950 p-8 flex flex-col justify-center relative z-20 border-t-[6px]" style={{fontFamily: textFont,  borderColor: brandColor }}>
        <div className="w-full flex justify-between items-center max-w-[85%] mx-auto">
          <div className="flex flex-col items-center gap-2 cursor-pointer group">
            <div className="w-14 h-14 rounded-full flex items-center justify-center group-hover:scale-110 transition-all" style={{ backgroundColor: brandColor }}>
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="font-text font-bold text-[8px] tracking-[0.2em] uppercase text-zinc-500 group-hover:text-white transition-colors">Curta</span>
          </div>
          <div className="flex flex-col items-center gap-2 cursor-pointer group">
            <div className="w-14 h-14 rounded-full flex items-center justify-center group-hover:scale-110 transition-all" style={{fontFamily: textFont,  backgroundColor: brandColor }}>
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <span className="font-text font-bold text-[8px] tracking-[0.2em] uppercase text-zinc-500 group-hover:text-white transition-colors">Comente</span>
          </div>
          <div className="flex flex-col items-center gap-2 cursor-pointer group">
            <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform" style={{fontFamily: textFont,  backgroundColor: brandColor }}>
              <Bookmark className="w-6 h-6 text-white" fill="currentColor" />
            </div>
            <span className="font-text font-bold text-[8px] tracking-[0.2em] uppercase text-white">Salve</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Variante 27: Glass Floating
// ==========================================
export function CTAVariant27(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, slideCount , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full relative bg-[#111] text-white">
      <div className="absolute top-[-50%] left-[-20%] w-[150%] h-[120%] rotate-[-15deg] shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-0" style={{fontFamily: textFont,  backgroundColor: brandColor }} />
      <div className="relative z-10 p-8 h-full flex flex-col justify-between">
        
        <div className="mt-8 mb-auto max-w-[90%]">
          <SmartElement
            slideIndex={index}
            field="titulo"
            position={pos('titulo')}
            showMetrics={showMetrics}
            onActionStart={onActionStart}
            isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
            onSelectElement={onSelectElement}
            className="w-full mb-4 shrink-0"
          >
            <h2
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black leading-[0.9] tracking-tighter uppercase drop-shadow-xl outline-none"
              style={{ fontSize: `${46 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartElement>
          <SmartElement
            slideIndex={index}
            field="texto_apoio"
            position={pos('texto_apoio')}
            showMetrics={showMetrics}
            onActionStart={onActionStart}
            isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
            onSelectElement={onSelectElement}
            className="w-[85%] shrink-0"
          >
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text text-white/90 font-medium leading-relaxed drop-shadow-md outline-none"
              style={{ fontSize: `${15 * sText}px` }}
            >
              {data.texto_apoio}
            </p>
          </SmartElement>
        </div>
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-3xl flex justify-between items-center shadow-2xl self-end w-[85%]">
          <div className="flex gap-4">
            <Heart className="w-6 h-6 text-white hover:scale-110 transition-transform cursor-pointer" />
            <MessageCircle className="w-6 h-6 text-white hover:scale-110 transition-transform cursor-pointer" />
            <Send className="w-6 h-6 text-white hover:scale-110 transition-transform cursor-pointer" />
          </div>
          <div className="w-px h-6 bg-white/30 mx-2" />
          <Bookmark className="w-7 h-7 hover:scale-110 transition-transform cursor-pointer" style={{fontFamily: textFont,  color: brandColor }} fill="currentColor" />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Variante 28: Tilted Card
// ==========================================
export function CTAVariant28(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, slideCount , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full relative bg-zinc-950 flex flex-col items-center justify-center p-8">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] blur-[80px] opacity-60 z-0 pointer-events-none" style={{ backgroundColor: brandColor }} />
      <div className="absolute top-6 left-6 right-6 z-20">
        
      </div>
      <div className="w-[90%] aspect-[4/5] rounded-[30px] rotate-6 absolute z-10 shadow-2xl" style={{ backgroundColor: brandColor }} />
      <div className="w-[90%] aspect-[4/5] rounded-[30px] bg-zinc-900 border border-zinc-700 relative z-20 p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-white mt-8">
        <div>
          <SmartElement
            slideIndex={index}
            field="titulo"
            position={pos('titulo')}
            showMetrics={showMetrics}
            onActionStart={onActionStart}
            isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
            onSelectElement={onSelectElement}
            className="w-full mb-4 shrink-0"
          >
            <h2
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black leading-none tracking-tighter uppercase outline-none"
              style={{ fontSize: `${38 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartElement>
          <SmartElement
            slideIndex={index}
            field="texto_apoio"
            position={pos('texto_apoio')}
            showMetrics={showMetrics}
            onActionStart={onActionStart}
            isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
            onSelectElement={onSelectElement}
            className="w-full shrink-0"
          >
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text text-zinc-400 font-medium leading-snug outline-none"
              style={{ fontSize: `${14 * sText}px` }}
            >
              {data.texto_apoio}
            </p>
          </SmartElement>
        </div>
        <div className="mt-auto grid grid-cols-4 gap-2">
          <div className="bg-white/5 rounded-xl aspect-square flex items-center justify-center hover:bg-white/10 transition-colors border border-white/5">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div className="bg-white/5 rounded-xl aspect-square flex items-center justify-center hover:bg-white/10 transition-colors border border-white/5">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div className="bg-white/5 rounded-xl aspect-square flex items-center justify-center hover:bg-white/10 transition-colors border border-white/5">
            <Send className="w-5 h-5 text-white" />
          </div>
          <div className="rounded-xl aspect-square flex items-center justify-center shadow-lg border border-white/20" style={{fontFamily: textFont,  backgroundColor: brandColor }}>
            <Bookmark className="w-5 h-5 text-white" fill="currentColor" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Variante 29: Bold Frame
// ==========================================
export function CTAVariant29(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, slideCount , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full relative bg-[#050505] text-white flex flex-col p-8 border-[16px]" style={{ borderColor: brandColor }}>
      <div className="relative z-10">
        
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <SmartElement
          slideIndex={index}
          field="titulo"
          position={pos('titulo')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="w-full mb-6 shrink-0 text-center"
        >
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black leading-[0.85] tracking-tighter uppercase outline-none"
            style={{ fontSize: `${44 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartElement>
        <SmartElement
          slideIndex={index}
          field="texto_apoio"
          position={pos('texto_apoio')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
          className="w-[90%] mx-auto shrink-0 text-center mb-10"
        >
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-zinc-500 font-bold leading-relaxed outline-none"
            style={{ fontSize: `${14 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartElement>
        <div className="w-full border-t border-zinc-800 pt-6 flex justify-between items-center px-4">
          <div className="flex gap-6">
            <Heart className="w-6 h-6 text-zinc-500 hover:text-white transition-colors cursor-pointer" />
            <MessageCircle className="w-6 h-6 text-zinc-500 hover:text-white transition-colors cursor-pointer" />
            <Send className="w-6 h-6 text-zinc-500 hover:text-white transition-colors cursor-pointer" />
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform">
            <span className="font-text font-bold text-[10px] tracking-widest uppercase text-white">SALVAR</span>
            <Bookmark className="w-6 h-6" style={{fontFamily: textFont,  color: brandColor }} fill="currentColor" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Variante 31: Floating Bar
// ==========================================
export function CTAVariant31(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, slideCount , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full flex flex-col relative">
      <div className="h-[60%] w-full p-8 flex flex-col justify-end pb-12 relative z-0 shadow-2xl" style={{ backgroundColor: brandColor }}>
        <div className="absolute top-6 left-6 right-6">
          
        </div>
        <SmartElement
          slideIndex={index}
          field="titulo"
          position={pos('titulo')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="w-full shrink-0"
        >
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black text-white leading-[0.9] tracking-tighter uppercase outline-none"
            style={{ fontSize: `${52 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartElement>
      </div>
      <div className="h-[40%] w-full bg-[#111] p-8 pt-12 flex flex-col justify-start relative z-0">
        <SmartElement
          slideIndex={index}
          field="texto_apoio"
          position={pos('texto_apoio')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
          className="w-[85%] shrink-0"
        >
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-zinc-400 font-medium leading-snug outline-none"
            style={{ fontSize: `${15 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartElement>
      </div>
      <div className="absolute top-[60%] left-8 right-8 -translate-y-1/2 bg-white rounded-2xl p-4 flex justify-between items-center shadow-[0_15px_40px_rgba(0,0,0,0.5)] z-20 border border-zinc-200">
        <div className="flex gap-6 pl-4">
          <Heart className="w-6 h-6 text-[#1a1a1a] hover:scale-110 transition-transform cursor-pointer" />
          <MessageCircle className="w-6 h-6 text-[#1a1a1a] hover:scale-110 transition-transform cursor-pointer" />
          <Send className="w-6 h-6 text-[#1a1a1a] hover:scale-110 transition-transform cursor-pointer" />
        </div>
        <div className="pr-4 pl-4 border-l border-zinc-200">
          <Bookmark className="w-7 h-7 hover:scale-110 transition-transform cursor-pointer" style={{fontFamily: textFont,  color: brandColor }} fill="currentColor" />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Variante 32: Centered Impact
// ==========================================
export function CTAVariant32(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, slideCount , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full flex flex-col p-6 bg-[#050505] text-white">
      
      <div className="flex-1 mt-4 mb-4 rounded-[40px] flex flex-col p-8 justify-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative" style={{ backgroundColor: brandColor }}>
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay overflow-hidden rounded-[40px]" />
        <SmartElement
          slideIndex={index}
          field="titulo"
          position={pos('titulo')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="w-full mb-6 shrink-0 relative z-10"
        >
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black leading-none tracking-tighter uppercase drop-shadow-md outline-none"
            style={{ fontSize: `${42 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartElement>
        <SmartElement
          slideIndex={index}
          field="texto_apoio"
          position={pos('texto_apoio')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
          className="w-[95%] mx-auto shrink-0 relative z-10"
        >
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text font-medium leading-snug text-white/90 outline-none"
            style={{ fontSize: `${15 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartElement>
      </div>
      <div className="flex justify-between items-center px-4 pt-2 pb-2">
        <span className="font-text font-bold text-[10px] tracking-[0.2em] uppercase text-zinc-500">Arraste para o lado e descubra</span>
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-zinc-800 transition-colors cursor-pointer">
            <Heart className="w-4 h-4 text-white" />
          </div>
          <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-zinc-800 transition-colors cursor-pointer">
            <Bookmark className="w-4 h-4 text-white" fill="currentColor" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Variante 33: Sidebar Actions Glossy
// ==========================================
export function CTAVariant33(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, slideCount , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full flex relative bg-black text-white">
      <div className="absolute inset-0 z-0">
        <ImageBg
          data={data}
          slideIndex={index}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
      </div>
      <div className="w-[75%] h-full p-8 flex flex-col justify-center relative z-10 pr-6">
        <div className="absolute top-6 left-6">
          
        </div>
        <SmartElement
          slideIndex={index}
          field="titulo"
          position={pos('titulo')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="w-full mb-6 shrink-0 mt-8"
        >
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black leading-[0.85] tracking-tighter uppercase drop-shadow-xl outline-none"
            style={{ fontSize: `${44 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartElement>
        <SmartElement
          slideIndex={index}
          field="texto_apoio"
          position={pos('texto_apoio')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
          className="w-[90%] shrink-0"
        >
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-white/90 font-bold leading-snug drop-shadow-md outline-none"
            style={{ fontSize: `${15 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartElement>
      </div>
      <div className="w-[25%] h-full bg-black/40 backdrop-blur-xl border-l border-white/20 flex flex-col items-center justify-center gap-8 relative z-20 shadow-[-20px_0_50px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col items-center gap-2 group cursor-pointer opacity-70 hover:opacity-100 transition-all">
          <Heart className="w-6 h-6 text-white group-hover:text-red-400 transition-all" />
          <span className="font-text font-bold text-[8px] uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">Curtir</span>
        </div>
        <div className="flex flex-col items-center gap-2 group cursor-pointer opacity-70 hover:opacity-100 transition-all">
          <MessageCircle className="w-6 h-6 text-white group-hover:text-blue-400 transition-all" />
          <span className="font-text font-bold text-[8px] uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">Comentar</span>
        </div>
        <div className="flex flex-col items-center gap-2 group cursor-pointer opacity-70 hover:opacity-100 transition-all">
          <Send className="w-6 h-6 text-white group-hover:text-green-400 transition-all" />
          <span className="font-text font-bold text-[8px] uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">Enviar</span>
        </div>
        <div className="w-8 h-px bg-white/20 my-2" />
        <div className="flex flex-col items-center gap-2 group cursor-pointer">
          <div className="p-3 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform" style={{fontFamily: textFont,  backgroundColor: brandColor }}>
            <Bookmark className="w-6 h-6 text-white" fill="currentColor" />
          </div>
          <span className="font-text font-bold text-[8px] uppercase tracking-widest text-white">Salvar</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Variante 34: Floating Capsule Actions
// ==========================================
export function CTAVariant34(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, slideCount , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full relative bg-black text-white">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <ImageBg
          data={data}
          slideIndex={index}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
      </div>
      <div className="relative z-10 flex flex-col h-full p-8 pb-32 justify-center text-center">
        <div className="absolute top-6 left-6 right-6">
          
        </div>
        <SmartElement
          slideIndex={index}
          field="titulo"
          position={pos('titulo')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="w-full mb-4 shrink-0 mt-8"
        >
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black leading-[0.9] tracking-tighter uppercase drop-shadow-xl outline-none"
            style={{ fontSize: `${44 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartElement>
        <SmartElement
          slideIndex={index}
          field="texto_apoio"
          position={pos('texto_apoio')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
          className="w-[85%] mx-auto shrink-0"
        >
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-white/90 font-bold leading-relaxed drop-shadow-md outline-none"
            style={{ fontSize: `${15 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartElement>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur text-[#1a1a1a] rounded-full px-8 py-3 flex items-center gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.4)] z-20 border border-white">
        <Heart className="w-6 h-6 hover:text-red-500 hover:scale-110 transition-all cursor-pointer" />
        <MessageCircle className="w-6 h-6 hover:text-blue-500 hover:scale-110 transition-all cursor-pointer" />
        <Send className="w-6 h-6 hover:text-green-500 hover:scale-110 transition-all cursor-pointer" />
        <div className="w-px h-6 bg-zinc-300 mx-1" />
        <div className="flex items-center gap-2 cursor-pointer group">
          <span className="font-text font-bold text-[10px] uppercase tracking-widest text-zinc-500 group-hover:text-black transition-colors">SALVAR</span>
          <Bookmark className="w-6 h-6 group-hover:scale-110 transition-transform" style={{fontFamily: textFont,  color: brandColor }} fill="currentColor" />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Variante 35: Bottom Dock Premium
// ==========================================
export function CTAVariant35(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, slideCount , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full relative bg-black flex flex-col text-white">
      <div className="absolute inset-0 z-0">
        <ImageBg
          data={data}
          slideIndex={index}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/30" />
      </div>
      <div className="relative z-10 flex-1 flex flex-col p-8 justify-end pb-24">
        <div className="absolute top-6 left-6 right-6">
          
        </div>
        <SmartElement
          slideIndex={index}
          field="titulo"
          position={pos('titulo')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-4 text-center shrink-0"
        >
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black text-white leading-tight uppercase tracking-tighter drop-shadow-xl outline-none"
            style={{ fontSize: `${38 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartElement>
        <SmartElement
          slideIndex={index}
          field="texto_apoio"
          position={pos('texto_apoio')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
          className="w-[90%] mx-auto text-center shrink-0"
        >
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-white/90 font-bold leading-relaxed drop-shadow-md outline-none"
            style={{ fontSize: `${15 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartElement>
      </div>
      <div className="absolute bottom-6 left-8 right-8 bg-[#111]/90 backdrop-blur-md rounded-2xl p-3 flex justify-between items-center border border-white/20 shadow-2xl z-20">
        <div className="flex gap-2">
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
            <Send className="w-5 h-5 text-white" />
          </div>
        </div>
        <div className="flex items-center gap-3 pr-2 cursor-pointer group">
          <span className="font-text font-bold text-[9px] tracking-[0.2em] uppercase text-zinc-400 group-hover:text-white transition-colors">SALVAR</span>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform" style={{fontFamily: textFont,  backgroundColor: brandColor }}>
            <Bookmark className="w-5 h-5 text-white" fill="currentColor" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Variante 36: Creator Bar Profile
// ==========================================
export function CTAVariant36(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, slideCount, brandHandle , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full relative bg-black text-white">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <ImageBg
          data={data}
          slideIndex={index}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/80" />
      </div>
      <div className="relative z-10 flex flex-col h-full p-8 pb-32 justify-between">
        
        <div className="flex flex-col mt-auto text-center">
          <SmartElement
            slideIndex={index}
            field="titulo"
            position={pos('titulo')}
            showMetrics={showMetrics}
            onActionStart={onActionStart}
            isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
            onSelectElement={onSelectElement}
            className="w-full mb-3 shrink-0"
          >
            <h2
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black leading-[0.9] tracking-tighter uppercase drop-shadow-2xl outline-none"
              style={{ fontSize: `${40 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartElement>
          <SmartElement
            slideIndex={index}
            field="texto_apoio"
            position={pos('texto_apoio')}
            showMetrics={showMetrics}
            onActionStart={onActionStart}
            isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
            onSelectElement={onSelectElement}
            className="w-[90%] mx-auto shrink-0"
          >
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text text-white/80 font-medium leading-relaxed drop-shadow-md outline-none"
              style={{ fontSize: `${14 * sText}px` }}
            >
              {data.texto_apoio}
            </p>
          </SmartElement>
        </div>
      </div>
      <div className="absolute bottom-8 left-6 right-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full p-2 flex items-center shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-20">
        <div className="flex items-center gap-3 flex-1 pl-2">
          <div className="w-12 h-12 rounded-full border-2 overflow-hidden shrink-0 shadow-lg" style={{fontFamily: textFont,  borderColor: brandColor }}>
            <div className="w-full h-full bg-zinc-700 flex items-center justify-center">
              <Store className="w-5 h-5 text-white/50" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-text font-bold text-[10px] tracking-widest uppercase text-white/60">CRIADOR</span>
            <span className="font-text font-black text-xs text-white truncate w-24">
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 pr-2 shrink-0">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
            <Heart className="w-4 h-4 text-white" />
          </div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-105 transition-transform" style={{fontFamily: textFont,  backgroundColor: brandColor }}>
            <Bookmark className="w-4 h-4 text-white" fill="currentColor" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Variante 37: Modern Split Round
// ==========================================
export function CTAVariant37(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, slideCount , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full flex flex-col relative bg-[#EBE9E1]">
      <div className="h-[45%] w-full relative z-0">
        <ImageBg
          data={data}
          slideIndex={index}
          className="absolute inset-0"
        />
        <div className="absolute top-6 left-6 right-6">
        </div>
      </div>
      <div className="h-[55%] w-full bg-black text-white p-8 flex flex-col justify-end pt-12 relative z-0 rounded-t-[40px] shadow-[0_-20px_40px_rgba(0,0,0,0.3)] -mt-6">
        <SmartElement
          slideIndex={index}
          field="titulo"
          position={pos('titulo')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="w-full mb-4 shrink-0"
        >
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black leading-[0.9] tracking-tighter uppercase text-white outline-none"
            style={{ fontSize: `${38 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartElement>
        <SmartElement
          slideIndex={index}
          field="texto_apoio"
          position={pos('texto_apoio')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
          className="w-[90%] shrink-0 mb-6"
        >
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-zinc-400 font-medium leading-relaxed outline-none"
            style={{ fontSize: `${15 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartElement>
        <div className="flex justify-between items-center w-full mt-auto border-t border-white/10 pt-4">
          <div className="flex gap-4">
            <Heart className="w-6 h-6 text-white/50 hover:text-white cursor-pointer transition-colors" />
            <MessageCircle className="w-6 h-6 text-white/50 hover:text-white cursor-pointer transition-colors" />
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform group">
            <span className="font-text font-bold text-[10px] tracking-widest uppercase text-white/50 group-hover:text-white transition-colors">SALVAR</span>
            <Bookmark className="w-6 h-6" style={{fontFamily: textFont,  color: brandColor }} fill="currentColor" />
          </div>
        </div>
      </div>
      <div className="absolute top-[45%] right-8 -translate-y-1/2 w-24 h-24 rounded-2xl border-4 overflow-hidden z-20 shadow-xl rotate-3 bg-zinc-800" style={{ borderColor: brandColor }}>
        <div className="w-full h-full flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-white/30" />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Variante 38: Rounded Card Premium
// ==========================================
export function CTAVariant38(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, slideCount, brandHandle , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full flex flex-col p-6 relative" style={{ backgroundColor: brandColor }}>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-black/20 rounded-full blur-[60px] pointer-events-none z-0" />
      <div className="relative z-10">
        
      </div>
      <div className="flex-1 bg-white rounded-3xl mt-4 p-6 flex flex-col items-center justify-center text-center shadow-2xl relative z-10">
        <div className="w-24 h-24 rounded-full border-[6px] border-white shadow-xl overflow-hidden mb-6 bg-zinc-200 -mt-16 ring-4 ring-black/5">
          <div className="w-full h-full bg-zinc-100 flex items-center justify-center">
            <Store className="w-8 h-8 text-zinc-300" />
          </div>
        </div>

        <SmartElement
          slideIndex={index}
          field="titulo"
          position={pos('titulo')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="w-full mb-3 shrink-0"
        >
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black text-[#1a1a1a] leading-none tracking-tighter uppercase outline-none"
            style={{ fontSize: `${34 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartElement>
        <SmartElement
          slideIndex={index}
          field="texto_apoio"
          position={pos('texto_apoio')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
          className="w-[90%] mx-auto shrink-0 mb-8"
        >
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-zinc-500 font-medium leading-snug outline-none"
            style={{ fontSize: `${14 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartElement>
        <div className="w-full flex gap-3 mt-auto">
          <div className="flex-1 h-12 rounded-xl bg-zinc-100 flex items-center justify-center hover:bg-zinc-200 transition-colors cursor-pointer border border-zinc-200">
            <MessageCircle className="w-5 h-5 text-zinc-600" />
          </div>
          <div className="flex-[2] h-12 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-[1.02] transition-transform text-white" style={{fontFamily: textFont,  backgroundColor: brandColor }}>
            <Bookmark className="w-4 h-4" fill="currentColor" />
            <span className="font-text font-bold text-[10px] uppercase tracking-widest">SALVAR POST</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Variante 39: Overlay Glass Profile
// ==========================================
export function CTAVariant39(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, slideCount, brandHandle , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full flex flex-col p-8 relative" style={{fontFamily: textFont,  backgroundColor: brandColor }}>
      <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
      <div className="relative z-10">
        
      </div>
      <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10 mt-8">
        <div className="w-28 h-28 rounded-full border-[8px] border-white/20 shadow-2xl overflow-hidden mb-6 relative">
          <div className="w-full h-full bg-white/20 flex items-center justify-center">
            <Store className="w-8 h-8 text-white/50" />
          </div>
        </div>
        <span className="font-text font-bold text-[10px] uppercase tracking-[0.3em] mb-4 text-white/70">
        </span>
        <SmartElement
          slideIndex={index}
          field="titulo"
          position={pos('titulo')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="w-full mb-4 shrink-0"
        >
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black text-white leading-none tracking-tighter uppercase drop-shadow-xl outline-none"
            style={{ fontSize: `${40 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartElement>
        <SmartElement
          slideIndex={index}
          field="texto_apoio"
          position={pos('texto_apoio')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
          className="w-[90%] mx-auto shrink-0 mb-8"
        >
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-white/90 font-medium leading-relaxed outline-none"
            style={{ fontSize: `${15 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartElement>
      </div>
      <div className="w-full bg-[#1a1a1a] rounded-3xl p-4 flex justify-between items-center shadow-2xl relative z-10">
        <div className="flex gap-4 pl-4">
          <Heart className="w-6 h-6 text-white hover:text-red-400 transition-colors cursor-pointer" />
          <MessageCircle className="w-6 h-6 text-white hover:text-blue-400 transition-colors cursor-pointer" />
        </div>
        <div className="flex items-center gap-3 pr-2 cursor-pointer group">
          <span className="font-text font-bold text-[10px] uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">SALVAR</span>
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform text-[#1a1a1a]">
            <Bookmark className="w-5 h-5" fill="currentColor" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Variante 40: Split Tilt Profile
// ==========================================
export function CTAVariant40(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, slideCount, brandHandle , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full flex flex-col relative bg-white">
      <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[80%] rotate-[-10deg] shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-0" style={{fontFamily: textFont,  backgroundColor: brandColor }} />
      <div className="relative z-10 p-8 pb-0">
        
      </div>
      <div className="flex-1 flex flex-col p-8 justify-center relative z-10 text-white">
        <div className="flex items-center gap-5 mb-8">
          <div className="w-20 h-20 rounded-2xl border-4 border-white/30 shadow-xl overflow-hidden bg-black/20 backdrop-blur-sm shrink-0 -rotate-3">
            <div className="w-full h-full flex items-center justify-center">
              <Store className="w-6 h-6 text-white/50" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-text font-bold text-[10px] tracking-widest uppercase text-white/60 mb-1">CRIADOR</span>
            <span className="font-text font-black text-lg text-white">
            </span>
          </div>
        </div>
        <SmartElement
          slideIndex={index}
          field="titulo"
          position={pos('titulo')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="w-full mb-4 shrink-0"
        >
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black leading-[0.9] tracking-tighter uppercase drop-shadow-md outline-none"
            style={{ fontSize: `${42 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartElement>
        <SmartElement
          slideIndex={index}
          field="texto_apoio"
          position={pos('texto_apoio')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
          className="w-[90%] shrink-0"
        >
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-white/90 font-medium leading-relaxed outline-none"
            style={{ fontSize: `${15 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartElement>
      </div>
      <div className="w-full p-8 pt-0 flex items-center gap-4 relative z-10 mt-auto">
        <div className="flex-1 h-14 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-zinc-200 transition-colors cursor-pointer border border-zinc-200 shadow-inner">
          <MessageCircle className="w-6 h-6 text-zinc-600" />
        </div>
        <div className="flex-[2] h-14 rounded-full flex items-center justify-center gap-3 cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:scale-[1.02] transition-transform text-white" style={{fontFamily: textFont,  backgroundColor: brandColor }}>
          <span className="font-text font-bold text-[11px] uppercase tracking-[0.2em]">SALVAR POST</span>
          <Bookmark className="w-5 h-5" fill="currentColor" />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Variante 41: Vertical Color Block
// ==========================================
export function CTAVariant41(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, slideCount , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full flex flex-col relative bg-black text-white">
      <div className="h-[50%] w-full flex flex-col p-8 pb-16 relative z-0" style={{fontFamily: textFont,  backgroundColor: brandColor }}>
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
        <div className="relative z-10">
          
        </div>
        <SmartElement
          slideIndex={index}
          field="titulo"
          position={pos('titulo')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="w-full mb-2 shrink-0 mt-auto relative z-10"
        >
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black leading-none tracking-tighter uppercase drop-shadow-lg outline-none"
            style={{ fontSize: `${42 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartElement>
      </div>
      <div className="h-[50%] w-full flex flex-col p-8 pt-16 relative z-0 border-t-2 border-white/10">
        <SmartElement
          slideIndex={index}
          field="texto_apoio"
          position={pos('texto_apoio')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
          className="w-[90%] shrink-0 mb-auto"
        >
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-zinc-400 font-medium leading-relaxed outline-none"
            style={{ fontSize: `${15 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartElement>
        <div className="flex justify-between items-center w-full mt-auto bg-[#111] p-3 rounded-2xl border border-white/10 shadow-xl">
          <div className="flex gap-4 pl-3">
            <Heart className="w-6 h-6 text-white/50 hover:text-white cursor-pointer transition-colors" />
            <MessageCircle className="w-6 h-6 text-white/50 hover:text-white cursor-pointer transition-colors" />
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform group bg-white/5 px-4 py-2 rounded-xl border border-white/10">
            <span className="font-text font-bold text-[10px] tracking-widest uppercase text-white/70 group-hover:text-white transition-colors">SALVAR</span>
            <Bookmark className="w-5 h-5" style={{fontFamily: textFont,  color: brandColor }} fill="currentColor" />
          </div>
        </div>
      </div>
      <div className="absolute top-1/2 right-8 -translate-y-1/2 w-24 h-24 rounded-[2rem] border-[6px] border-black overflow-hidden z-20 shadow-2xl bg-zinc-800 rotate-6">
        <div className="w-full h-full flex items-center justify-center">
          <Store className="w-8 h-8 text-white/30" />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Variante 42: Center Focus Round
// ==========================================
export function CTAVariant42(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, slideCount , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full relative text-white flex flex-col">
      <div className="h-[35%] w-full relative shrink-0">
        <ImageBg
          data={data}
          slideIndex={index}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent" />
        <div className="absolute top-6 left-6 right-6">
          
        </div>
      </div>
      <div className="flex-1 w-full relative z-10 flex flex-col justify-end p-8 pb-12 rounded-t-[50px] shadow-[0_-20px_60px_rgba(0,0,0,0.5)] -mt-12 border-t-2 border-white/20" style={{ backgroundColor: brandColor }}>
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full border-[6px] shadow-2xl overflow-hidden bg-zinc-800 shrink-0" style={{ borderColor: brandColor }}>
          <div className="w-full h-full flex items-center justify-center">
            <Store className="w-8 h-8 text-white/50" />
          </div>
        </div>
        <SmartElement
          slideIndex={index}
          field="titulo"
          position={pos('titulo')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="w-full mb-4 mt-8 shrink-0 text-center"
        >
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black leading-[0.9] tracking-tighter uppercase drop-shadow-xl outline-none"
            style={{ fontSize: `${42 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartElement>
        <SmartElement
          slideIndex={index}
          field="texto_apoio"
          position={pos('texto_apoio')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
          className="w-[90%] mx-auto shrink-0 text-center mb-10 flex-1"
        >
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-white/90 font-bold leading-snug drop-shadow-md outline-none"
            style={{ fontSize: `${15 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartElement>
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 flex justify-between items-center border border-white/20 shadow-xl mt-auto shrink-0">
          <div className="flex gap-2 pl-2">
            <Heart className="w-6 h-6 text-white hover:scale-110 transition-transform cursor-pointer" />
            <MessageCircle className="w-6 h-6 text-white hover:scale-110 transition-transform cursor-pointer ml-3" />
          </div>
          <div className="flex items-center gap-2 cursor-pointer group bg-white text-[#111] px-5 py-2.5 rounded-xl shadow-lg hover:scale-105 transition-transform">
            <span className="font-text font-black text-[10px] tracking-widest uppercase">SALVAR</span>
            <Bookmark className="w-4 h-4" fill="currentColor" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Export Map & Meta
// ==========================================
export const CTA_VARIANT_COMPONENTS = {
  1: CTAVariant1,
  4: CTAVariant4,
  5: CTAVariant5,
  6: CTAVariant6,
  7: CTAVariant7,
  9: CTAVariant9,
  12: CTAVariant12,
  14: CTAVariant14,
  16: CTAVariant16,
  18: CTAVariant18,
  19: CTAVariant19,
  20: CTAVariant20,
  21: CTAVariant21,
  22: CTAVariant22,
  23: CTAVariant23,
  24: CTAVariant24,
  25: CTAVariant25,
  26: CTAVariant26,
  27: CTAVariant27,
  28: CTAVariant28,
  29: CTAVariant29,
  31: CTAVariant31,
  32: CTAVariant32,
  33: CTAVariant33,
  34: CTAVariant34,
  35: CTAVariant35,
  36: CTAVariant36,
  37: CTAVariant37,
  38: CTAVariant38,
  39: CTAVariant39,
  40: CTAVariant40,
  41: CTAVariant41,
  42: CTAVariant42,
};

export const CTA_VARIANT_META = [
  { id: 0, name: 'Classic (Original)', title: 'Classic (Original)', description: 'Layout padrão com ícone Zap', desc: 'Layout padrão com ícone Zap' },
  { id: 1, name: 'Minimal', title: 'Minimal', description: 'Focado no texto e inicial', desc: 'Focado no texto e inicial' },
  { id: 4, name: 'Ticket Card', title: 'Ticket Card', description: 'Card destacado estilo ticket picotado', desc: 'Card destacado estilo ticket picotado' },
  { id: 5, name: 'Blur Tilt', title: 'Blur Tilt', description: 'Efeito de desfoque e rotação suave', desc: 'Efeito de desfoque e rotação suave' },
  { id: 6, name: 'Clean Typographic', title: 'Clean Typographic', description: 'Layout minimalista puramente tipográfico', desc: 'Layout minimalista puramente tipográfico' },
  { id: 7, name: 'App Interface', title: 'App Interface', description: 'Design lembrando uma interface de agendamento', desc: 'Design lembrando uma interface de agendamento' },
  { id: 9, name: 'Arrow Solid', title: 'Arrow Solid', description: 'Fundo sólido com botão seta circular central', desc: 'Fundo sólido com botão seta circular central' },
  { id: 12, name: 'Dark Double CTA', title: 'Dark Double CTA', description: 'Fundo escuro com dois botões de ação paralelos', desc: 'Fundo escuro com dois botões de ação paralelos' },
  { id: 14, name: 'Store Dashed', title: 'Store Dashed', description: 'Ícone de loja com borda tracejada e botão outline', desc: 'Ícone de loja com borda tracejada e botão outline' },
  { id: 16, name: 'VIP Border', title: 'VIP Border', description: 'Borda tracejada estilo ingresso com acesso VIP', desc: 'Borda tracejada estilo ingresso com acesso VIP' },
  { id: 18, name: 'Polaroid Tilt', title: 'Polaroid Tilt', description: 'Foto estilo polaroid inclinada sobre fundo colorido', desc: 'Foto estilo polaroid inclinada sobre fundo colorido' },
  { id: 19, name: 'Social Blur', title: 'Social Blur', description: 'Rodapé com blur e ícones sociais destacados', desc: 'Rodapé com blur e ícones sociais destacados' },
  { id: 20, name: 'Floating Polaroid', title: 'Floating Polaroid', description: 'Card polaroid rotacionado sobre fundo claro', desc: 'Card polaroid rotacionado sobre fundo claro' },
  { id: 21, name: 'Bookmark Focus', title: 'Bookmark Focus', description: 'Destaque no ícone de salvar com fundo escuro', desc: 'Destaque no ícone de salvar com fundo escuro' },
  { id: 22, name: 'Editorial Side', title: 'Editorial Side', description: 'Layout de revista com barra lateral de ações', desc: 'Layout de revista com barra lateral de ações' },
  { id: 23, name: 'Bento Grid', title: 'Bento Grid', description: 'Grade estilo bento com ações e botão de arraste', desc: 'Grade estilo bento com ações e botão de arraste' },
  { id: 24, name: 'Cinema Overlay', title: 'Cinema Overlay', description: 'Overlay cinematográfico sobre imagem de fundo', desc: 'Overlay cinematográfico sobre imagem de fundo' },
  { id: 25, name: 'Giant Watermark', title: 'Giant Watermark', description: 'Marca d\'água gigante com ícone de salvar ao fundo', desc: 'Marca d\'água gigante com ícone de salvar ao fundo' },
  { id: 26, name: 'Modern Split Actions', title: 'Modern Split Actions', description: 'Layout dividido com ações em destaque no rodapé', desc: 'Layout dividido com ações em destaque no rodapé' },
  { id: 27, name: 'Glass Floating', title: 'Glass Floating', description: 'Design minimalista com barra de ações flutuante em glassmorphism', desc: 'Design minimalista com barra de ações flutuante em glassmorphism' },
  { id: 28, name: 'Tilted Card', title: 'Tilted Card', description: 'Card inclinado com efeito de profundidade e brilho neon', desc: 'Card inclinado com efeito de profundidade e brilho neon' },
  { id: 29, name: 'Bold Frame', title: 'Bold Frame', description: 'Moldura espessa na cor da marca com foco centralizado', desc: 'Moldura espessa na cor da marca com foco centralizado' },
  { id: 31, name: 'Floating Bar', title: 'Floating Bar', description: 'Divisão de cores contrastantes com barra de ações centralizada', desc: 'Divisão de cores contrastantes com barra de ações centralizada' },
  { id: 32, name: 'Centered Impact', title: 'Centered Impact', description: 'Card central de alto impacto sobre fundo dark', desc: 'Card central de alto impacto sobre fundo dark' },
  { id: 33, name: 'Sidebar Glossy', title: 'Sidebar Glossy', description: 'Barra lateral de ações com fundo glassmorphism e gradiente suave', desc: 'Barra lateral de ações com fundo glassmorphism e gradiente suave' },
  { id: 34, name: 'Floating Capsule', title: 'Floating Capsule', description: 'Cápsula flutuante de ações em glassmorphism claro', desc: 'Cápsula flutuante de ações em glassmorphism claro' },
  { id: 35, name: 'Bottom Dock', title: 'Bottom Dock', description: 'Dock inferior com ações e destaque no botão salvar', desc: 'Dock inferior com ações e destaque no botão salvar' },
  { id: 36, name: 'Creator Bar', title: 'Creator Bar', description: 'Barra de criador com perfil circular e ações rápidas', desc: 'Barra de criador com perfil circular e ações rápidas' },
  { id: 37, name: 'Split Modern', title: 'Split Modern', description: 'Layout dividido moderno com topo arredondado e imagem flutuante', desc: 'Layout dividido moderno com topo arredondado e imagem flutuante' },
  { id: 38, name: 'Rounded Card Premium', title: 'Rounded Card Premium', description: 'Card branco arredondado sobre fundo colorido com perfil centralizado', desc: 'Card branco arredondado sobre fundo colorido com perfil centralizado' },
  { id: 39, name: 'Overlay Glass Profile', title: 'Overlay Glass Profile', description: 'Layout com gradiente e barra de ações dark no rodapé', desc: 'Layout com gradiente e barra de ações dark no rodapé' },
  { id: 40, name: 'Split Tilt Profile', title: 'Split Tilt Profile', description: 'Divisão diagonal com perfil em destaque e botões arredondados', desc: 'Divisão diagonal com perfil em destaque e botões arredondados' },
  { id: 41, name: 'Vertical Color Block', title: 'Vertical Color Block', description: 'Blocos de cores verticais com perfil flutuante lateral', desc: 'Blocos de cores verticais com perfil flutuante lateral' },
  { id: 42, name: 'Center Focus Round', title: 'Center Focus Round', description: 'Topo com imagem e corpo colorido arredondado com foco no perfil', desc: 'Topo com imagem e corpo colorido arredondado com foco no perfil' },
];






