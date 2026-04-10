import React from 'react';
import { Zap, Heart, Bookmark, Share2, Check, ArrowUpRight, Calendar, MousePointer2, Image as ImageIcon } from 'lucide-react';
import SmartElement from '../smart-element';

// ─── Helper: ImageBg ────────────────────────────────────────
// Renderiza o background de imagem ou placeholder.
export function ImageBg({ data, className = '', style = {}, slideIndex, imageUrl, imagePosition, containerClassName, placeholderText, children }) {
  const url = imageUrl || data?.imageUrl;
  const position = imagePosition ?? data?.imagePosition ?? 50;
  
  if (url) {
    return (
      <div
        className={`bg-cover ${className} ${containerClassName || ''}`}
        style={{
          backgroundImage: `url(${url})`,
          backgroundPosition: `center ${position}%`,
          transform: `scale(${data?.imageScale ?? 1})`,
          transformOrigin: 'center center',
          ...style,
        }}
      >
        {children}
      </div>
    );
  }
  return (
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
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, brandHandle } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col p-16 items-center justify-center text-center relative overflow-hidden">
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
      <div className="w-24 h-24 rounded-full border-2 p-1 mb-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-shadow duration-500 hover:shadow-[0_0_60px_rgba(0,0,0,0.8)]" style={{ borderColor: brandColor }}>
        <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden">
          <span className="font-outfit font-black text-2xl uppercase" style={{ color: brandColor }}>
            {brandHandle?.[0] || 'A'}
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
        className="mb-6 w-full relative z-10"
      >
        <h2
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
          className="font-outfit font-black text-white leading-[1.1] tracking-tighter outline-none"
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
          className="font-playfair text-zinc-400 outline-none"
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
          className="w-full py-5 font-outfit font-black text-[12px] uppercase tracking-widest rounded-full text-white transition-all shadow-xl pointer-events-none"
          style={{ backgroundColor: brandColor }}
        >
          {data.tag || 'RESERVE SUA DATA'}
        </button>
      </SmartElement>
    </div>
  );
}

// ==========================================
// Variante 2: Split Background
// ==========================================
export function CTAVariant2(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden bg-[#050505]">
      <div className="h-1/2 w-full relative">
        <ImageBg
          slideIndex={index}
          imageUrl={data.imageUrl}
          imagePosition={data.imagePosition}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'}
          onSelectElement={onSelectElement}
        />
      </div>
      <div className="h-1/2 w-full flex flex-col p-10 justify-center items-center text-center relative z-10">
        <div className="absolute -top-12 w-24 h-24 bg-[#050505] rounded-full flex items-center justify-center border-8 border-[#050505] z-10">
          <Check className="w-8 h-8" style={{ color: brandColor }} />
        </div>
        
        <SmartElement
          slideIndex={index}
          field="titulo"
          position={pos('titulo')}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-4 mt-4 w-full relative z-10"
        >
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black text-white tracking-tight leading-none outline-none"
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
          className="mb-8 relative z-10"
        >
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-playfair text-zinc-400 outline-none text-sm"
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
          className="w-full relative z-10"
        >
          <button
            className="w-full py-4 font-outfit font-black text-[10px] uppercase tracking-widest rounded-lg text-white transition-all shadow-xl pointer-events-none"
            style={{ backgroundColor: brandColor }}
          >
            {data.tag || 'RESERVE SUA DATA'}
          </button>
        </SmartElement>
      </div>
    </div>
  );
}

// ==========================================
// Variante 3: Neon Glow Central
// ==========================================
export function CTAVariant3(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full flex flex-col p-10 relative overflow-hidden bg-[#020202] justify-center items-center text-center">
      <div className="absolute inset-0 opacity-40 blur-xl scale-110 pointer-events-none">
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
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full opacity-30 blur-[100px] pointer-events-none z-0" 
        style={{ backgroundColor: brandColor }}
      ></div>
      
      <SmartElement
        slideIndex={index}
        field="titulo"
        position={pos('titulo')}
        showMetrics={showMetrics}
        onActionStart={onActionStart}
        isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
        onSelectElement={onSelectElement}
        className="mb-6 relative z-10 w-full"
      >
        <h2
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
          className="font-outfit font-black text-white tracking-tighter leading-[0.9] outline-none"
          style={{ fontSize: `${50 * sTitle}px` }}
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
        className="mb-10 relative z-10 w-full px-4"
      >
        <p
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
          className="font-playfair italic text-white/70 outline-none block"
          style={{ fontSize: `${20 * sText}px` }}
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
        className="w-[80%] relative z-10"
      >
        <div className="p-1 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent">
          <button className="w-full py-5 font-outfit font-black text-xs uppercase tracking-widest rounded-full bg-black text-white border border-white/10 hover:bg-white hover:text-black transition-all pointer-events-none">
            {data.tag || 'RESERVE SUA DATA'}
          </button>
        </div>
      </SmartElement>
    </div>
  );
}

// ==========================================
// Variante 4: Card Destacado
// ==========================================
export function CTAVariant4(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col justify-center items-center p-8 relative overflow-hidden">
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
              className="font-outfit font-black text-black tracking-tighter leading-none outline-none"
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
              className="font-playfair italic text-zinc-600 outline-none"
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
              className="w-full py-4 font-outfit font-black text-white text-[10px] uppercase tracking-widest rounded-xl shadow-lg pointer-events-none"
              style={{ backgroundColor: brandColor }}
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
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full flex flex-col p-10 justify-center items-center relative overflow-hidden bg-zinc-900">
      <div className="absolute inset-0 scale-110 opacity-60">
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
      
      <div className="relative z-10 w-[95%] bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[2rem] p-8 py-10 shadow-2xl flex flex-col items-center text-center transform -rotate-2 hover:rotate-0 transition-transform duration-500">
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
            className="font-outfit font-black text-white tracking-tight leading-none outline-none"
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
            className="font-playfair text-white/80 outline-none text-sm"
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
          <button className="w-full py-4 bg-white text-black font-outfit font-black text-[10px] uppercase tracking-widest rounded-xl shadow-xl pointer-events-none">
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
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, brandHandle } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full bg-[#020202] flex flex-col p-10 relative overflow-hidden justify-between text-center">
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
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: brandColor }}></div>
          <span className="font-outfit font-black tracking-[0.25em] text-[10px] uppercase text-zinc-500">
            {brandHandle || '@SEUPERFIL'}
          </span>
        </div>
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
            className="font-outfit font-black text-white tracking-tighter leading-[0.9] outline-none"
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
            className="font-playfair text-zinc-500 outline-none block mx-auto max-w-[85%]"
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
          className="w-full py-6 font-outfit font-black text-[14px] uppercase tracking-[0.4em] rounded-2xl text-white transition-all shadow-[0_0_40px_rgba(0,0,0,0.5)] hover:scale-105 pointer-events-none"
          style={{ backgroundColor: brandColor }}
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
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, brandHandle } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col p-10 relative overflow-hidden items-center justify-center">
      <div className="absolute inset-0 opacity-25 blur-sm scale-105 pointer-events-none">
        <ImageBg
          data={data}
          slideIndex={index}
          imageUrl={data.imageUrl}
          imagePosition={data.imagePosition}
          showMetrics={showMetrics}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'image'}
          onSelectElement={onSelectElement}
          className="w-full h-full grayscale"
        />
      </div>
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-50 pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: brandColor }}></div>
          <span className="font-outfit font-black tracking-[0.25em] text-[10px] uppercase text-zinc-500">
             {brandHandle || '@SEUPERFIL'}
          </span>
        </div>
      </div>
      
      <div className="w-full bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-8 pt-10 shadow-2xl relative mt-8 flex flex-col items-center text-center">
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
            className="font-outfit font-black text-white tracking-tight leading-none outline-none"
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
            className="font-playfair text-zinc-400 text-sm outline-none"
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
          <button className="w-full py-4 rounded-xl font-outfit font-black text-[10px] uppercase tracking-widest text-black bg-white flex items-center justify-center gap-2 hover:bg-zinc-200 pointer-events-none">
            <MousePointer2 className="w-4 h-4" /> {data.tag || 'RESERVE SUA DATA'}
          </button>
        </SmartElement>
      </div>
    </div>
  );
}

// ==========================================
// Variante 8: Hacker/Tech Start
// ==========================================
export function CTAVariant8(props) {
  const { data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const pos = (field) => data.positions?.[field] || { x: 0, y: 0, scale: 1 };

  return (
    <div className="w-full h-full bg-black flex flex-col p-12 relative overflow-hidden justify-center text-center font-mono border-4 border-solid" style={{ borderColor: 'transparent' /* Pode ser atualizada dinamicamente com brandColor dependendo da estética */ }}>
      <div className="absolute inset-0 opacity-20 grayscale pointer-events-none">
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
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
      
      <SmartElement
        slideIndex={index}
        field="titulo"
        position={pos('titulo')}
        showMetrics={showMetrics}
        onActionStart={onActionStart}
        isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
        onSelectElement={onSelectElement}
        className="mb-8 z-10 relative w-full"
      >
        <h2
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
          className="font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500 tracking-tighter outline-none uppercase leading-[1.1]"
          style={{ fontSize: `${45 * sTitle}px` }}
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
        className="mb-12 z-10 relative w-full"
      >
        <p
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
          className="text-zinc-400 outline-none text-xs block mx-auto max-w-[80%]"
          style={{ fontSize: `${12 * sText}px` }}
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
        className="w-full z-10 relative"
      >
        <button
          className="w-full py-4 border-2 border-dashed bg-black font-bold text-xs uppercase tracking-widest transition-all hover:bg-white hover:text-black pointer-events-none"
          style={{ borderColor: brandColor, color: brandColor }}
        >
          {data.tag || 'RESERVE SUA DATA'}
        </button>
      </SmartElement>
    </div>
  );
}

// ==========================================
// Export Map & Meta
// ==========================================
export const CTA_VARIANT_COMPONENTS = {
  1: CTAVariant1,
  2: CTAVariant2,
  3: CTAVariant3,
  4: CTAVariant4,
  5: CTAVariant5,
  6: CTAVariant6,
  7: CTAVariant7,
  8: CTAVariant8,
};

export const CTA_VARIANT_META = [
  { id: 0, title: 'Classic (Original)', desc: 'Layout padrão com ícone Zap' },
  { id: 1, title: 'Minimal', desc: 'Focado no texto e inicial' },
  { id: 2, title: 'Split Image', desc: 'Metade imagem, metade call to action' },
  { id: 3, title: 'Neon Glow', desc: 'Fundo escuro com brilho neon' },
  { id: 4, title: 'Ticket Card', desc: 'Card destacado estilo ticket picotado' },
  { id: 5, title: 'Blur Tilt', desc: 'Efeito de desfoque e rotação suave' },
  { id: 6, title: 'Clean Typographic', desc: 'Layout minimalista puramente tipográfico' },
  { id: 7, title: 'App Interface', desc: 'Design lembrando uma interface de agendamento' },
  { id: 8, title: 'Tech Start', desc: 'Visual mais dark com bordas tracejadas e gradiente' },
];

