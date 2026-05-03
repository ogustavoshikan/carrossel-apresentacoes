import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import SmartElement from '../smart-element';
import SlideHeader, { SlideFooterPlaceholder } from '../slide-header';

// ============================================================
// CARROSSEL STUDIO — BIG-NUMBER VARIANTS (1-11)
// Cada variante recebe as mesmas props do SlideBigNumber e
// renderiza um layout visual diferente, preservando dados dinâmicos.
// ============================================================

// ─── Helper: SmartField ──────────────────────────────────────
function SmartField({ data, index, field, showMetrics, onActionStart, selectedElement, onSelectElement, className, children, position }) {
  const basePos = data.positions?.[field] || { x: 0, y: 0, scale: 1 };
  const pos = position ? { ...basePos, ...position } : basePos;
  
  return (
    <SmartElement
      slideIndex={index}
      field={field}
      position={pos}
      showMetrics={showMetrics}
      onActionStart={onActionStart}
      isSelected={selectedElement?.slideIndex === index && selectedElement?.field === field}
      onSelectElement={onSelectElement}
      className={className}
    >
      {children}
    </SmartElement>
  );
}

// ─── Helper: ImageBg ────────────────────────────────────────
function ImageBg({ data, className = '', style = {}, children }) {
  if (data.imageUrl) {
    return (
      <div
        className={`bg-cover ${className}`}
        style={{
          backgroundImage: `url(${data.imageUrl})`,
          backgroundPosition: `center ${data.imagePosition ?? 50}%`,
          transform: `scale(${data.imageScale ?? 1})`,
          transformOrigin: 'center center',
          ...style,
        }}
      >
        {children}
      </div>
    );
  }
  return (
    <div className={`bg-zinc-900 flex items-center justify-center opacity-50 ${className}`} style={style}>
      <ImageIcon className="w-8 h-8 text-zinc-700" />
      {children}
    </div>
  );
}

// BrandTag removido — todas as variantes usam SlideHeader como referência padrão.

// ═══════════════════════════════════════════════════════════
// VARIANTE 1 — Dark Stack
// Número gigante + tag pill colorida + texto + imagem inferior arredondada.
// ═══════════════════════════════════════════════════════════
export function BigNumberVariant1({ data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified,
  titleScale, textScale, showMetrics, onActionStart, onTextChange,
  selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo , titleFont, textFont, tagFont}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col p-10 relative overflow-hidden">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1}
        total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar}
        brandColor={brandColor}
        isVerified={isVerified}
        showSlideCounter={showSlideCounter}
        slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={showBrandLogo} />

      <div className="flex-1 flex flex-col justify-center pt-8">
        {/* Número grande */}
        <SmartField field="titulo" {...sp} className="flex items-baseline mb-[-10px]">
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black text-white tracking-tighter leading-none outline-none truncate max-w-full block"
            style={{ fontSize: `${130 * sTitle}px` }}
          >
            {data.titulo}
          </span>
        </SmartField>

        {/* Tag pill */}
        <SmartField field="tag" {...sp} className="mb-8">
          <div
            className="px-6 py-2 inline-block self-start rounded-md shadow-2xl"
            style={{fontFamily: titleFont,  backgroundColor: brandColor }}
          >
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="font-tag font-bold text-white text-[12px] tracking-[0.3em] uppercase outline-none block"
            >
              {data.tag || 'LABEL'}
            </span>
          </div>
        </SmartField>

        {/* Texto apoio */}
        <SmartField field="texto_apoio" {...sp} className="mb-8 max-w-[95%]">
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-zinc-300 outline-none line-clamp-3 overflow-hidden"
            style={{ fontSize: `${18 * sText}px`, lineHeight: 1.6 }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>

        {/* Imagem arredondada inferior */}
        <SmartField
          field="imagem" {...sp}
          className="w-full flex-1 min-h-[120px] rounded-[2rem] overflow-hidden relative shadow-2xl ring-1 ring-white/5"
        >
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 2 — Phantom Center
// Número centralizado com ghost gigante atrás (sem imagem).
// ═══════════════════════════════════════════════════════════
export function BigNumberVariant2({ data, index, slideCount, brandColor, brandHandle, showBrandHandle, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo , titleFont, textFont, tagFont}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full bg-[#080808] flex flex-col items-center justify-center p-10 relative overflow-hidden text-center">
      {/* Ghost gigante */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none font-text font-black text-white leading-none tracking-tighter z-0"
        style={{fontFamily: tagFont,  fontSize: '300px' }}
      >
        {data.titulo}
      </div>

      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1}
        total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar}
        brandColor={brandColor}
        isVerified={isVerified}
        showSlideCounter={showSlideCounter}
        slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={showBrandLogo} />

      {/* Número colorido com glow */}
      <SmartField field="titulo" {...sp} className="relative z-10 mb-8">
        <span
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
          className="font-text font-black tracking-tighter leading-none outline-none block"
          style={{
            fontSize: `${100 * sTitle}px`,
            color: brandColor,
            textShadow: `0 0 40px ${brandColor}66`,
          }}
        >
          {data.titulo}
        </span>
      </SmartField>

      {/* Tag border pill */}
      <SmartField field="tag" {...sp} className="relative z-10 mb-6">
        <span
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
          className="font-tag font-bold text-white text-[14px] tracking-[0.4em] uppercase border border-white/20 px-6 py-2 rounded-full outline-none inline-block"
        >
          {data.tag || 'LABEL'}
        </span>
      </SmartField>

      {/* Texto apoio */}
      <SmartField field="texto_apoio" {...sp} className="relative z-10 max-w-[80%]">
        <p
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
          className="font-text text-zinc-400 outline-none"
          style={{ fontSize: `${20 * sText}px` }}
        >
          {data.texto_apoio}
        </p>
      </SmartField>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 3 — Color Block
// Bloco colorido superior com número + área escura inferior com texto.
// ═══════════════════════════════════════════════════════════
export function BigNumberVariant3({ data, index, slideCount, brandColor, brandHandle, showBrandHandle, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo , titleFont, textFont, tagFont}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col overflow-hidden relative">
      {/* Bloco colorido superior */}
      <div
        className="w-full h-[45%] p-10 flex flex-col items-end justify-center relative shrink-0"
        style={{fontFamily: tagFont,  backgroundColor: brandColor }}
      >
        <SmartField field="titulo" {...sp} className="w-full text-right">
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-text font-black text-white tracking-tighter leading-none outline-none block"
            style={{ fontSize: `${110 * sTitle}px` }}
          >
            {data.titulo}
          </span>
        </SmartField>
      </div>

      {/* Área escura inferior */}
      <div className="flex-1 p-10 flex flex-col justify-center bg-[#050505] relative shrink-0">
        <SmartField field="tag" {...sp} className="mb-4">
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            className="font-tag font-black text-[12px] tracking-widest text-zinc-500 uppercase outline-none block"
          >
            {data.tag || 'LABEL'}
          </span>
        </SmartField>

        <SmartField field="texto_apoio" {...sp}>
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-white outline-none"
            style={{ fontSize: `${22 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>

      {/* Brand tag no topo */}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1}
        total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar}
        brandColor={brandColor}
        isVerified={isVerified}
        showSlideCounter={showSlideCounter}
        slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={showBrandLogo} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 4 — Glass Card
// Número outline sutil atrás + card glassmorphic centralizado.
// ═══════════════════════════════════════════════════════════
export function BigNumberVariant4({ data, index, slideCount, brandColor, brandHandle, showBrandHandle, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo , titleFont, textFont, tagFont}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col p-10 overflow-hidden relative items-center justify-center text-center">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1}
        total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar}
        brandColor={brandColor}
        isVerified={isVerified}
        showSlideCounter={showSlideCounter}
        slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={showBrandLogo} />

      {/* Número outline fantasma */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-full text-center pointer-events-none">
        <span
          className="font-text font-black text-transparent tracking-tighter leading-none block outline-none"
          style={{ fontSize: `${200 * sTitle}px`, WebkitTextStroke: '2px rgba(255, 255, 255, 0.05)' }}
        >
          {data.titulo}
        </span>
      </div>

      {/* Card glassmorphic */}
      <div className="relative z-10 bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-white/5 w-full">
        <SmartField field="tag" {...sp} className="mb-4">
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            className="font-text font-bold text-[12px] tracking-[0.4em] uppercase outline-none block"
            style={{fontFamily: tagFont,  color: brandColor }}
          >
            {data.tag || 'LABEL'}
          </span>
        </SmartField>

        <SmartField field="texto_apoio" {...sp}>
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-white outline-none"
            style={{ fontSize: `${22 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 5 — Side Panel
// Número colorido à esquerda + painel de conteúdo à direita.
// ═══════════════════════════════════════════════════════════
export function BigNumberVariant5({ data, index, slideCount, brandColor, brandHandle, showBrandHandle, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo , titleFont, textFont, tagFont}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full bg-[#080808] flex overflow-hidden relative">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1}
        total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar}
        brandColor={brandColor}
        isVerified={isVerified}
        showSlideCounter={showSlideCounter}
        slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={showBrandLogo} />

      {/* Número à esquerda */}
      <div className="w-1/2 h-full flex items-center justify-end p-6 relative z-10">
        <SmartField field="titulo" {...sp}>
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-text font-black tracking-tighter leading-none outline-none block text-right"
            style={{ fontSize: `${120 * sTitle}px`, color: brandColor }}
          >
            {data.titulo}
          </span>
        </SmartField>
      </div>

      {/* Painel direito */}
      <div 
        className="w-1/2 h-full flex flex-col items-start justify-center p-6 border-l border-white/5"
        style={{fontFamily: textFont,  backgroundColor: brandColor }}
      >
        <SmartField field="tag" {...sp} className="mb-4">
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            className="font-tag font-bold text-white text-[10px] tracking-widest uppercase outline-none block"
          >
            {data.tag || 'LABEL'}
          </span>
        </SmartField>

        <SmartField field="texto_apoio" {...sp} className="mb-8">
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-white/90 outline-none text-left"
            style={{ fontSize: `${16 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>

        {/* Imagem reduzida */}
        <SmartField field="imagem" {...sp}
          className="w-full h-28 rounded-2xl overflow-hidden relative shadow-xl ring-1 ring-black/5"
        >
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 6 — Circle Badge
// Número em círculo pequeno + tag + card de texto destacado.
// ═══════════════════════════════════════════════════════════
export function BigNumberVariant6({ data, index, slideCount, brandColor, brandHandle, showBrandHandle, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo , titleFont, textFont, tagFont}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col p-10 overflow-hidden relative">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1}
        total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar}
        brandColor={brandColor}
        isVerified={isVerified}
        showSlideCounter={showSlideCounter}
        slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={showBrandLogo} />

      {/* Imagem de fundo com opacidade */}
      <div className="absolute inset-0 pointer-events-none">
        <ImageBg
          data={data}
          className="absolute inset-0 opacity-20"
        />
      </div>

      <div className="flex-1 flex flex-col justify-center relative z-10">
        {/* Badge circular + tag */}
        <div className="flex gap-6 items-center mb-8">
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center shrink-0 border-4 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            style={{fontFamily: tagFont,  borderColor: '#050505', backgroundColor: brandColor }}
          >
            <SmartField field="titulo" {...sp}>
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
                className="font-text font-black text-white tracking-tighter leading-none outline-none"
                style={{ fontSize: `${40 * sTitle}px` }}
              >
                {data.titulo}
              </span>
            </SmartField>
          </div>

          <SmartField field="tag" {...sp} className="flex-1">
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="font-tag font-bold text-[18px] tracking-[0.2em] uppercase text-white outline-none block"
            >
              {data.tag || 'LABEL'}
            </span>
          </SmartField>
        </div>

        {/* Card de texto */}
        <div 
          className="p-8 rounded-3xl border border-white/10 shadow-2xl"
          style={{fontFamily: tagFont,  backgroundColor: brandColor }}
        >
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text text-white outline-none"
              style={{ fontSize: `${20 * sText}px` }}
            >
              {data.texto_apoio}
            </p>
          </SmartField>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 7 — Texture Fill
// Número com fundo da imagem via background-clip + texto abaixo.
// ═══════════════════════════════════════════════════════════
export function BigNumberVariant7({ data, index, slideCount, brandColor, brandHandle, showBrandHandle, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo , titleFont, textFont, tagFont}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  const numberStyle = data.imageUrl
    ? {
        fontSize: `${180 * sTitle}px`,
        backgroundImage: `url(${data.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: `center ${data.imagePosition ?? 50}%`,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
      }
    : {
        fontSize: `${180 * sTitle}px`,
        color: brandColor,
      };

  return (
    <div className="w-full h-full bg-[#020202] flex flex-col p-10 overflow-hidden relative justify-center items-center text-center">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1}
        total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar}
        brandColor={brandColor}
        isVerified={isVerified}
        showSlideCounter={showSlideCounter}
        slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={showBrandLogo} />

      {/* Número com textura de imagem */}
      <SmartField field="titulo" {...sp} className="w-full mb-4">
        <span
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
          className="font-text font-black tracking-tighter leading-none outline-none block"
          style={numberStyle}
        >
          {data.titulo}
        </span>
      </SmartField>

      <SmartField field="tag" {...sp} className="mb-6">
        <span
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
          className="font-tag font-bold text-[14px] tracking-[0.4em] uppercase outline-none inline-block"
          style={{fontFamily: tagFont,  color: brandColor }}
        >
          {data.tag || 'LABEL'}
        </span>
      </SmartField>

      <SmartField field="texto_apoio" {...sp} className="max-w-[80%] mx-auto">
        <p
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
          className="font-text text-zinc-400 outline-none"
          style={{ fontSize: `${18 * sText}px` }}
        >
          {data.texto_apoio}
        </p>
      </SmartField>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 8 — Outline Float
// Número outline colorido flutuando + imagem + texto inferior.
// ═══════════════════════════════════════════════════════════
export function BigNumberVariant8({ data, index, slideCount, brandColor, brandHandle, showBrandHandle, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo , titleFont, textFont, tagFont}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full bg-[#080808] flex flex-col p-10 relative overflow-hidden">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1}
        total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar}
        brandColor={brandColor}
        isVerified={isVerified}
        showSlideCounter={showSlideCounter}
        slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={showBrandLogo} />

      {/* Número outline flutuando à direita */}
      <div className="absolute top-1/4 -right-10 z-20 pointer-events-none">
        <SmartField field="titulo" {...sp}>
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-text font-black text-transparent tracking-tighter leading-none outline-none block"
            style={{
              fontSize: `${160 * sTitle}px`,
              WebkitTextStroke: `3px ${brandColor}`,
            }}
          >
            {data.titulo}
          </span>
        </SmartField>
      </div>

      {/* Contenúdo inferior */}
      <div className="flex-1 flex flex-col justify-end pt-8 relative z-10 -translate-y-[60px]">
        {/* Imagem */}
        <SmartField field="imagem" {...sp}
          className="w-[80%] h-56 rounded-2xl overflow-hidden relative shadow-2xl mb-8 border border-white/10"
        >
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>

        <SmartField field="tag" {...sp} className="mb-2">
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            className="font-tag font-bold text-white text-[10px] tracking-[0.3em] uppercase outline-none block"
          >
            {data.tag || 'LABEL'}
          </span>
        </SmartField>

        <SmartField field="texto_apoio" {...sp}>
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-zinc-300 outline-none"
            style={{ fontSize: `${18 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 9 — Sidebar Ribbon
// Faixa lateral colorida com número rotacionado + texto à direita.
// ═══════════════════════════════════════════════════════════
export function BigNumberVariant9({ data, index, slideCount, brandColor, brandHandle, showBrandHandle, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo , titleFont, textFont, tagFont}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full bg-[#050505] flex overflow-hidden relative">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1}
        total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar}
        brandColor={brandColor}
        isVerified={isVerified}
        showSlideCounter={showSlideCounter}
        slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={showBrandLogo} />

      {/* Faixa lateral colorida */}
      <div
        className="w-24 h-full flex items-center justify-center border-r border-white/5 shrink-0"
        style={{fontFamily: tagFont,  backgroundColor: brandColor }}
      >
        <SmartField 
          field="titulo" 
          {...sp}
          className="origin-center w-[500px] text-center"
          position={{ ...data.positions?.titulo, rotation: 270 }}
        >
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-text font-black text-white tracking-tighter outline-none inline-block whitespace-nowrap"
            style={{ fontSize: `${90 * sTitle}px` }}
          >
            {data.titulo}
          </span>
        </SmartField>
      </div>

      {/* Conteúdo à direita */}
      <div className="flex-1 flex flex-col justify-center p-10 relative">
        {/* Imagem de fundo com baixa opacidade */}
        <SmartField field="imagem" {...sp} className="absolute inset-0 pointer-events-none">
          <ImageBg data={data} className="absolute inset-0 opacity-10" />
        </SmartField>

        <SmartField field="tag" {...sp} className="mb-6 relative z-10">
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            className="font-tag font-bold text-[12px] tracking-[0.4em] uppercase text-zinc-500 outline-none block"
          >
            {data.tag || 'LABEL'}
          </span>
        </SmartField>

        <SmartField field="texto_apoio" {...sp} className="relative z-10">
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-white outline-none leading-relaxed"
            style={{ fontSize: `${24 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 10 — Magazine Split
// Imagem superior semitransparente + número sobreposto + bloco de cor inferior.
// ═══════════════════════════════════════════════════════════
export function BigNumberVariant10({ data, index, slideCount, brandColor, brandHandle, showBrandHandle, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo , titleFont, textFont, tagFont}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden relative">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1}
        total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar}
        brandColor={brandColor}
        isVerified={isVerified}
        showSlideCounter={showSlideCounter}
        slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={showBrandLogo} />

      {/* Metade superior — imagem */}
      <SmartField field="imagem" {...sp} className="h-1/2 w-full relative shrink-0">
        <ImageBg data={data} className="absolute inset-0 opacity-30" />
      </SmartField>

      {/* Metade inferior — bloco de cor */}
      <div
        className="h-1/2 w-full p-10 flex flex-col justify-end shrink-0"
        style={{fontFamily: tagFont,  backgroundColor: brandColor }}
      >
        <SmartField field="texto_apoio" {...sp}>
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-black outline-none font-bold"
            style={{ fontSize: `${22 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>

      {/* Número sobreposto na junção */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 z-50">
        <SmartField field="titulo" {...sp}>
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-text font-black text-white tracking-tighter leading-none outline-none drop-shadow-2xl"
            style={{ fontSize: `${140 * sTitle}px` }}
          >
            {data.titulo}
          </h2>        </SmartField>
      </div>

      {/* Tag no canto */}
      <div className="absolute top-[45%] right-10 z-10">
        <SmartField field="tag" {...sp}>
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            className="font-title font-black text-[12px] uppercase tracking-widest text-white/50 outline-none block"
          >
            {data.tag || 'LABEL'}
          </span>
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 11 — Bento Grid
// Grid 2×2 com número em card colorido + tag + texto em cards separados.
// ═══════════════════════════════════════════════════════════
export function BigNumberVariant11({ data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified,
  titleScale, textScale, showMetrics, onActionStart, onTextChange,
  selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo , titleFont, textFont, tagFont}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full bg-[#020202] flex flex-col p-10 relative overflow-hidden">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1}
        total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar}
        brandColor={brandColor}
        isVerified={isVerified}
        showSlideCounter={showSlideCounter}
        slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={showBrandLogo} />

      <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-4 pt-16">
        {/* Card número — topo full width */}
        <div
          className="col-span-2 row-span-1 rounded-[2rem] flex items-center justify-center relative overflow-hidden"
          style={{fontFamily: textFont,  backgroundColor: brandColor }}
        >
          <div className="absolute inset-0 bg-black/10" />
          <SmartField field="titulo" {...sp} className="relative z-10 w-full text-center">
            <h2
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black text-white tracking-tighter outline-none"
              style={{ fontSize: `${120 * sTitle}px`, lineHeight: '0.8' }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>

        {/* Card tag */}
        <div className="col-span-1 row-span-1 bg-[#0A0A0A] rounded-[2rem] p-6 border border-white/5 flex flex-col justify-center">
          <SmartField field="tag" {...sp}>
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="font-tag font-bold text-[10px] tracking-[0.4em] uppercase text-zinc-500 outline-none block"
            >
              {data.tag || 'LABEL'}
            </span>
          </SmartField>
        </div>

        {/* Card texto */}
        <div className="col-span-1 row-span-1 bg-zinc-900 rounded-[2rem] p-6 border border-white/5 flex flex-col justify-center">
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text text-zinc-300 outline-none text-sm"
              style={{ fontSize: `${12 * sText}px` }}
            >
              {data.texto_apoio}
            </p>
          </SmartField>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 12 — Glass List
// Número gigante lateral + card de texto glassmorphic vertical
// ═══════════════════════════════════════════════════════════
export function BigNumberVariant12(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full bg-[#050505] flex relative overflow-hidden p-12">
      <SlideHeader {...props} index={index + 1} total={slideCount} hideDot={true} />
      
      {/* Background Decorativo */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 blur-[120px] opacity-20 rounded-full" style={{fontFamily: titleFont,  backgroundColor: brandColor }} />

      <div className="flex-1 flex items-center relative z-10 gap-8 mt-12">
        <SmartField field="titulo" {...sp} className="shrink-0">
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black tracking-tighter leading-none outline-none block"
            style={{ fontSize: `${160 * sTitle}px`, color: brandColor, textShadow: `0 20px 40px ${brandColor}40` }}
          >
            {data.titulo}
          </span>
        </SmartField>

        <div className="flex-1 bg-surface-input/30 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
          <SmartField field="tag" {...sp} className="mb-4">
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="font-tag font-black text-[10px] tracking-[0.4em] uppercase text-zinc-500 outline-none block"
            >
              {data.tag || 'INSIGHT'}
            </span>
          </SmartField>

          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text text-white italic leading-relaxed outline-none break-words max-w-full"
              style={{ fontSize: `${22 * sText}px` }}
            >
              "{data.texto_apoio}"
            </p>
          </SmartField>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 13 — Elegant Glow
// Número centralizado com preenchimento branco e glow externo
// ═══════════════════════════════════════════════════════════
export function BigNumberVariant13(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full bg-[#080808] flex flex-col items-center justify-center p-12 relative overflow-hidden text-center">
      <SlideHeader {...props} index={index + 1} total={slideCount} hideDot={true} />
      
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{fontFamily: titleFont,  backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />

      <div className="relative mb-12">
        <div className="absolute inset-0 blur-[60px] opacity-40 rounded-full" style={{ backgroundColor: brandColor }} />
        <SmartField field="titulo" {...sp} className="relative z-10">
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-text font-black text-white tracking-tighter leading-none outline-none block italic"
            style={{ fontSize: `${180 * sTitle}px` }}
          >
            {data.titulo}
          </span>
        </SmartField>
      </div>

      <SmartField field="tag" {...sp} className="mb-6">
        <span
          contentEditable suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
          className="font-tag font-black text-[14px] tracking-[0.5em] uppercase outline-none block"
          style={{fontFamily: tagFont,  color: brandColor }}
        >
          {data.tag || 'HIGHLIGHT'}
        </span>
      </SmartField>

      <SmartField field="texto_apoio" {...sp} className="max-w-[85%]">
        <p
          contentEditable suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
          className="font-text text-zinc-400 outline-none leading-relaxed"
          style={{ fontSize: `${20 * sText}px` }}
        >
          {data.texto_apoio}
        </p>
      </SmartField>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 14 — Texture Number Light
// Número preenchido com imagem (bg-clip) em fundo claro + tag + texto.
// ═══════════════════════════════════════════════════════════
export function BigNumberVariant14(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  const numberStyle = data.imageUrl
    ? {
        fontSize: `${150 * sTitle}px`,
        backgroundImage: `url(${data.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: `center ${data.imagePosition ?? 50}%`,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
        WebkitTextStroke: '1px rgba(0, 0, 0, 0.1)',
      }
    : {
        fontSize: `${150 * sTitle}px`,
        color: brandColor,
      };

  return (
    <div 
      className="w-full h-full bg-zinc-100 flex flex-col p-10 overflow-hidden relative justify-center"
      style={{ 
        borderTop: `10px solid ${brandColor}`,
        borderBottom: `10px solid ${brandColor}`
      }}
    >
      <SlideHeader {...props} index={index + 1} total={slideCount} hideDot={false} />

      <SmartField field="titulo" {...sp} className="mb-4">
        <span
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
          className="font-text font-black tracking-tighter leading-none outline-none block"
          style={numberStyle}
        >
          {data.titulo}
        </span>
      </SmartField>

      <SmartField field="tag" {...sp} className="mb-4">
        <span
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
          className="font-tag font-bold text-[12px] tracking-[0.4em] uppercase text-black outline-none block"
        >
          {data.tag || 'RESULTADO'}
        </span>
      </SmartField>

      <SmartField field="texto_apoio" {...sp}>
        <p
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
          className="font-text text-zinc-600 outline-none break-words max-w-full"
          style={{ fontSize: `${20 * sText}px` }}
        >
          {data.texto_apoio}
        </p>
      </SmartField>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 15 — Dark Outline Float
// Número outline colorido flutuando + card dark com imagem + texto.
// ═══════════════════════════════════════════════════════════
export function BigNumberVariant15(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full bg-[#080808] flex flex-col p-10 overflow-hidden relative justify-center items-center">
      <SlideHeader {...props} index={index + 1} total={slideCount} hideDot={false} />

      {/* Número outline flutuando centralizado */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none w-full text-center">
        <SmartField field="titulo" {...sp}>
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-text font-black text-transparent tracking-tighter leading-none outline-none"
            style={{ fontSize: `${180 * sTitle}px`, WebkitTextStroke: `4px ${brandColor}` }}
          >
            {data.titulo}
          </span>
        </SmartField>
      </div>

      {/* Card escuro com imagem e texto */}
      <div className="bg-[#050505] p-8 border border-white/10 z-10 mt-32 w-full shadow-2xl relative">
        {/* Miniatura de imagem */}
        <SmartField
          field="imagem"
          {...sp}
          className="w-16 h-16 overflow-hidden mb-6 absolute -top-8 right-8 shadow-xl"
        >
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>

        <SmartField field="tag" {...sp} className="mb-4">
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            className="font-tag font-bold text-[10px] tracking-widest uppercase text-zinc-500 outline-none block"
          >
            {data.tag || 'RESULTADO'}
          </span>
        </SmartField>

        <SmartField field="texto_apoio" {...sp}>
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-white outline-none text-lg break-words max-w-full"
            style={{ fontSize: `${18 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 16 — Light Color Drop
// Fundo branco + número colorido em destaque + card de texto.
// ═══════════════════════════════════════════════════════════
export function BigNumberVariant16(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full bg-white flex flex-col p-10 relative overflow-hidden text-black">
      <SlideHeader {...props} index={index + 1} total={slideCount} hideDot={false} />

      <div className="flex-1 flex flex-col justify-center items-center">
        <SmartField field="titulo" {...sp} className="mb-6 w-full text-center">
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-text font-black tracking-tighter leading-none outline-none block text-center drop-shadow-sm"
            style={{ fontSize: `${150 * sTitle}px`, color: brandColor }}
          >
            {data.titulo}
          </span>
        </SmartField>

        <div className="bg-[#FAFAFA] border border-zinc-100 p-8 w-full text-center shadow-lg">
          <SmartField field="tag" {...sp} className="mb-4">
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="font-tag font-bold text-[10px] tracking-widest uppercase text-zinc-400 outline-none block"
            >
              {data.tag || 'RESULTADO'}
            </span>
          </SmartField>

          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text text-zinc-800 outline-none font-medium break-words max-w-full"
              style={{ fontSize: `${18 * sText}px` }}
            >
              {data.texto_apoio}
            </p>
          </SmartField>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 17 — Ghost Watermark
// Número watermark gigante semitransparente + tag pill colorida + número menor.
// ═══════════════════════════════════════════════════════════
export function BigNumberVariant17(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full bg-[#F9F9F9] flex flex-col p-10 relative overflow-hidden text-black">
      <SlideHeader {...props} index={index + 1} total={slideCount} hideDot={false} />

      {/* Watermark gigante decorativo */}
      <div className="absolute top-1/4 -right-10 z-0 pointer-events-none opacity-5">
        <span
          className="font-text font-black tracking-tighter leading-none"
          style={{ fontSize: `${220 * sTitle}px`, color: brandColor }}
        >
          {data.titulo}
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-end pt-8 relative z-10 pb-10">
        <SmartField field="tag" {...sp} className="mb-4 self-start">
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            className="font-text font-bold text-white text-[10px] tracking-[0.3em] uppercase px-5 py-2 shadow-md outline-none inline-block"
            style={{fontFamily: tagFont,  backgroundColor: brandColor }}
          >
            {data.tag || 'RESULTADO'}
          </span>
        </SmartField>

        <SmartField field="titulo" {...sp} className="mb-4">
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black text-zinc-900 tracking-tighter leading-none outline-none"
            style={{ fontSize: `${90 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>

        <SmartField field="texto_apoio" {...sp}>
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-zinc-500 outline-none break-words max-w-full"
            style={{ fontSize: `${20 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 18 — Glow Centered
// Número centralizado com glow colorido + tag pill frosted.
// ═══════════════════════════════════════════════════════════
export function BigNumberVariant18(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full bg-white flex flex-col items-center justify-center p-10 relative overflow-hidden text-center text-black">
      <SlideHeader {...props} index={index + 1} total={slideCount} hideDot={false} />

      {/* Glow de fundo */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 opacity-10 blur-3xl pointer-events-none rounded-full"
        style={{fontFamily: textFont,  backgroundColor: brandColor }}
      />

      <SmartField field="titulo" {...sp} className="relative z-10 mb-8">
        <span
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
          className="font-title font-black tracking-tighter leading-none outline-none block"
          style={{ fontSize: `${130 * sTitle}px`, color: brandColor }}
        >
          {data.titulo}
        </span>
      </SmartField>

      <SmartField field="tag" {...sp} className="relative z-10">
        <span
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
          className="font-tag font-bold text-zinc-800 text-[12px] tracking-[0.4em] uppercase border border-zinc-200 px-8 py-3 bg-white/80 backdrop-blur-md shadow-sm outline-none inline-block"
        >
          {data.tag || 'RESULTADO'}
        </span>
      </SmartField>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 19 — Color Block Split
// Painel superior colorido com número gigante + painel escuro inferior com tag e texto.
// ═══════════════════════════════════════════════════════════
export function BigNumberVariant19(props) {
  const { data, index, slideCount, brandColor, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-[#050505]">
      {/* Painel superior colorido com número */}
      <div
        className="h-[55%] w-full flex items-center justify-center relative p-10 shrink-0"
        style={{fontFamily: tagFont,  backgroundColor: brandColor }}
      >
        <SlideHeader {...props} index={index + 1} total={slideCount} hideDot={true} />
        <SmartField field="titulo" {...sp} className="w-full text-center">
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black text-white tracking-tighter leading-none outline-none block"
            style={{ fontSize: `${150 * sTitle}px` }}
          >
            {data.titulo}
          </span>
        </SmartField>
      </div>

      {/* Painel inferior escuro com tag e texto */}
      <div className="h-[45%] w-full flex flex-col justify-center p-10 relative shrink-0">
        <SmartField field="tag" {...sp} className="mb-4">
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            className="font-tag font-bold text-[12px] tracking-widest uppercase text-white/50 outline-none block"
          >
            {data.tag || 'RESULTADO'}
          </span>
        </SmartField>
        <SmartField field="texto_apoio" {...sp}>
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-white outline-none leading-relaxed break-words max-w-full"
            style={{ fontSize: `${22 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 20 — Image Wash Card
// Fundo imagem semiopaco + card branco arredondado inferior com número colorido e texto.
// ═══════════════════════════════════════════════════════════
export function BigNumberVariant20(props) {
  const { data, index, slideCount, brandColor, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-[#050505] relative">
      <SlideHeader {...props} index={index + 1} total={slideCount} hideDot={true} />

      {/* Imagem de fundo semiopaca */}
      <SmartField field="imagem" {...sp} className="absolute inset-0 h-[65%] w-full pointer-events-none">
        <ImageBg data={data} className="absolute inset-0 opacity-40" />
      </SmartField>

      {/* Card branco arredondado inferior */}
      <div className="absolute bottom-0 left-0 w-full h-[48%] bg-white p-10 flex flex-col justify-center rounded-t-[2rem]">
        <div className="flex items-center gap-6 mb-6">
          <SmartField field="titulo" {...sp} className="shrink-0">
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-text font-black tracking-tighter leading-none outline-none block"
              style={{ fontSize: `${90 * sTitle}px`, color: brandColor }}
            >
              {data.titulo}
            </span>
          </SmartField>
          <SmartField field="tag" {...sp} className="flex-1">
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="font-tag font-black text-[12px] tracking-widest uppercase text-zinc-400 outline-none block"
            >
              {data.tag || 'RESULTADO'}
            </span>
          </SmartField>
        </div>
        <SmartField field="texto_apoio" {...sp}>
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text font-bold text-zinc-900 outline-none leading-snug break-words max-w-full"
            style={{ fontSize: `${18 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 21 — Sidebar Ribbon Light
// Faixa lateral colorida com label rotacionado + número gigante e texto em fundo claro.
// ═══════════════════════════════════════════════════════════
export function BigNumberVariant21(props) {
  const { data, index, slideCount, brandColor, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-row overflow-hidden bg-white text-black">
      {/* Faixa lateral colorida */}
      <div
        className="w-[15%] h-full flex items-center justify-center relative shrink-0"
        style={{fontFamily: titleFont,  backgroundColor: brandColor }}
      >
        <SmartField
          field="tag"
          {...sp}
          className="origin-center w-[500px] text-center"
          position={{ ...data.positions?.tag, rotation: 270 }}
        >
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            className="font-text font-bold text-white tracking-[0.3em] uppercase outline-none inline-block whitespace-nowrap"
            style={{fontFamily: textFont,  fontSize: '12px' }}
          >
            {data.tag || 'RESULTADO'}
          </span>
        </SmartField>
      </div>

      {/* Área de conteúdo principal */}
      <div className="w-[85%] h-full flex flex-col justify-center p-12 relative">
        <SlideHeader {...props} index={index + 1} total={slideCount} hideDot={false} />

        <SmartField field="titulo" {...sp} className="mb-4 mt-8">
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black tracking-tighter leading-none outline-none block text-zinc-950"
            style={{ fontSize: `${160 * sTitle}px` }}
          >
            {data.titulo}
          </span>
        </SmartField>

        <div className="w-12 h-1 bg-zinc-200 mb-6" />

        <SmartField field="texto_apoio" {...sp}>
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-zinc-500 outline-none leading-relaxed break-words max-w-full"
            style={{ fontSize: `${22 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 22 — Image Over Color
// Metade superior com imagem + metade inferior colorida com número sobreposto e texto bold.
// ═══════════════════════════════════════════════════════════
export function BigNumberVariant22(props) {
  const { data, index, slideCount, brandColor, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col relative overflow-hidden">
      <SlideHeader {...props} index={index + 1} total={slideCount} hideDot={true} />

      {/* Metade superior — imagem */}
      <SmartField field="imagem" {...sp} className="h-[50%] w-full relative overflow-hidden shrink-0">
        <ImageBg data={data} className="absolute inset-0" />
        <div className="absolute inset-0 bg-black/10" />
      </SmartField>

      {/* Metade inferior colorida com número sobreposto */}
      <div
        className="h-[50%] w-full relative flex flex-col p-10 justify-end shrink-0"
        style={{fontFamily: textFont,  backgroundColor: brandColor }}
      >
        {/* Número sobreposto na junção */}
        <div className="absolute -top-24 left-10 z-20 pointer-events-none">
          <span
            className="font-text font-black text-white tracking-tighter leading-none block drop-shadow-2xl"
            style={{ fontSize: `${180 * sTitle}px` }}
          >
            {data.titulo}
          </span>
        </div>
        {/* Número editável (SmartField) — invisível, sincroniza o valor */}
        <SmartField field="titulo" {...sp} className="absolute -top-24 left-10 z-30 opacity-0 pointer-events-auto">
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-text font-black text-white tracking-tighter leading-none outline-none block"
            style={{ fontSize: `${180 * sTitle}px` }}
          >
            {data.titulo}
          </span>
        </SmartField>

        <SmartField field="tag" {...sp} className="mb-4">
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            className="font-tag font-black text-[12px] tracking-[0.4em] uppercase text-white/60 outline-none block"
          >
            {data.tag || 'RESULTADO'}
          </span>
        </SmartField>

        <SmartField field="texto_apoio" {...sp} className="max-w-[90%]">
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text font-black text-white outline-none leading-[1.1] uppercase break-words"
            style={{ fontSize: `${32 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 23 — Editorial Card Float
// Painel colorido superior com número + card flutuante centralizado + imagem inferior.
// ═══════════════════════════════════════════════════════════
export function BigNumberVariant23(props) {
  const { data, index, slideCount, brandColor, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full bg-white flex flex-col relative overflow-hidden">
      <SlideHeader {...props} index={index + 1} total={slideCount} hideDot={false} />

      {/* Painel superior colorido com badge de edição + número */}
      <div
        className="h-[45%] w-full flex flex-col p-10 justify-center relative shrink-0"
        style={{fontFamily: tagFont,  backgroundColor: brandColor }}
      >
        <SmartField field="badge_text" {...sp} className="absolute top-8 left-10">
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
            className="font-text font-black text-white bg-white/20 px-4 py-1 text-[10px] tracking-widest uppercase outline-none inline-block"
          >
            {data.badge_text || 'VOL. 01'}
          </span>
        </SmartField>

        <div className="mt-8">
          <SmartField field="titulo" {...sp}>
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black text-white tracking-tighter leading-none outline-none block"
              style={{ fontSize: `${150 * sTitle}px` }}
            >
              {data.titulo}
            </span>
          </SmartField>
        </div>
      </div>

      {/* Card flutuante centralizado */}
      <div className="absolute top-[40%] left-10 right-10 z-20 bg-white p-6 shadow-2xl">
        <SmartField field="tag" {...sp} className="mb-1">
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            className="font-tag font-black text-[10px] tracking-[0.4em] uppercase outline-none block"
            style={{fontFamily: titleFont,  color: brandColor }}
          >
            {data.tag || 'RESULTADO'}
          </span>
        </SmartField>
        <SmartField field="texto_apoio" {...sp}>
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text font-black text-zinc-900 outline-none leading-tight uppercase break-words max-w-full"
            style={{ fontSize: `${24 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>

      {/* Imagem inferior */}
      <SmartField field="imagem" {...sp} className="flex-1 w-full relative overflow-hidden">
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// REGISTRO DE VARIANTES
// ═══════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════
// VARIANTE 24 — Rounded Card Float
// Fundo claro com ghost watermark + imagem em card arredondado + card flutuante com número e tag.
// ═══════════════════════════════════════════════════════════
export function BigNumberVariant24({ data, index, slideCount, brandColor, brandHandle, showBrandHandle, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo , titleFont, textFont, tagFont}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full bg-[#F5F5F5] flex flex-col p-10 relative overflow-hidden">
      <SlideHeader
        data={data} slideIndex={index} onActionStart={onActionStart}
        selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar}
        brandColor={brandColor} isVerified={isVerified}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={false} brandLogo={brandLogo} showBrandLogo={showBrandLogo}
      />

      {/* Ghost watermark */}
      <div className="absolute top-10 left-0 right-0 flex flex-col opacity-[0.08] pointer-events-none select-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <SmartField key={i} field="titulo" {...sp} className="w-full">
            <span
              className="font-text font-black text-transparent tracking-tighter leading-none whitespace-nowrap block"
              style={{ fontSize: '100px', WebkitTextStroke: `2px ${brandColor}` }}
            >
              {data.titulo} {data.titulo} {data.titulo}
            </span>
          </SmartField>
        ))}
      </div>

      <div className="flex-1 flex flex-col relative z-10 pt-6">
        {/* Imagem em card arredondado */}
        <SmartField
          field="imagem" {...sp}
          className="w-full h-[55%] rounded-[3rem] overflow-hidden shadow-2xl relative shrink-0"
        >
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>

        {/* Card flutuante com número e tag */}
        <div className="flex-1 flex flex-col justify-center items-center text-center p-6 bg-white mt-[-2rem] mx-6 shadow-xl rounded-2xl relative z-20">
          <SmartField field="titulo" {...sp} className="mb-2">
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black tracking-tighter leading-none outline-none block"
              style={{ fontSize: `${80 * sTitle}px`, color: brandColor }}
            >
              {data.titulo}
            </span>
          </SmartField>

          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text font-bold text-zinc-500 outline-none text-xs tracking-widest uppercase break-words max-w-full"
              style={{ fontSize: `${12 * sText}px` }}
            >
              {data.texto_apoio}
            </p>
          </SmartField>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 25 — Image Over Color Bold
// Imagem superior fullwidth + bloco colorido inferior com número gigante sobreposto e texto bold.
// ═══════════════════════════════════════════════════════════
export function BigNumberVariant25({ data, index, slideCount, brandColor, brandHandle, showBrandHandle, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo , titleFont, textFont, tagFont}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full bg-white flex flex-col relative overflow-hidden">
      <SlideHeader
        data={data} slideIndex={index} onActionStart={onActionStart}
        selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar}
        brandColor={brandColor} isVerified={isVerified}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={false} brandLogo={brandLogo} showBrandLogo={showBrandLogo}
      />

      {/* Imagem superior */}
      <SmartField field="imagem" {...sp} className="h-[60%] w-full relative overflow-hidden shrink-0">
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>

      {/* Bloco colorido inferior */}
      <div className="h-[40%] w-full relative flex flex-col p-10 justify-center shrink-0" style={{fontFamily: textFont,  backgroundColor: brandColor }}>
        {/* Número gigante sobreposto */}
        <div className="absolute -top-20 left-10 z-20 pointer-events-none">
          <SmartField field="titulo" {...sp}>
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-text font-black text-white tracking-tighter leading-none outline-none block drop-shadow-2xl"
              style={{ fontSize: `${180 * sTitle}px` }}
            >
              {data.titulo}
            </span>
          </SmartField>
        </div>

        <div className="mt-12">
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text font-black text-white/90 outline-none leading-tight uppercase break-words max-w-full"
              style={{ fontSize: `${28 * sText}px` }}
            >
              {data.texto_apoio}
            </p>
          </SmartField>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 26 — Minimal Footer Number
// Imagem fullwidth + barra inferior branca com label, título e número colorido alinhados.
// ═══════════════════════════════════════════════════════════
export function BigNumberVariant26({ data, index, slideCount, brandColor, brandHandle, showBrandHandle, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo , titleFont, textFont, tagFont}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full bg-white flex flex-col relative overflow-hidden">
      <SlideHeader
        data={data} slideIndex={index} onActionStart={onActionStart}
        selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar}
        brandColor={brandColor} isVerified={isVerified}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={false} brandLogo={brandLogo} showBrandLogo={showBrandLogo}
      />

      {/* Imagem fullwidth */}
      <SmartField field="imagem" {...sp} className="flex-1 w-full relative">
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>

      {/* Barra inferior */}
      <div className="h-[25%] w-full bg-white border-t border-zinc-100 flex items-center justify-between px-10 shrink-0">
        <div className="flex flex-col gap-1 min-w-0 flex-1 pr-4">
          <SmartField field="tag" {...sp}>
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="font-text font-black text-[10px] tracking-[0.4em] uppercase text-zinc-400 outline-none block"
            >
              {data.tag || 'RESULTADO'}
            </span>
          </SmartField>

          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text font-black text-zinc-950 outline-none leading-none uppercase break-words max-w-full"
              style={{ fontSize: `${22 * sText}px` }}
            >
              {data.texto_apoio}
            </p>
          </SmartField>
        </div>

        <SmartField field="titulo" {...sp} className="shrink-0">
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-text font-black tracking-tighter leading-none outline-none block"
            style={{ fontSize: `${110 * sTitle}px`, color: brandColor }}
          >
            {data.titulo}
          </span>
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 27 — Bordered Dark
// Fundo escuro com bordas coloridas no topo e rodapé + badge outline + número gigante + texto.
// ═══════════════════════════════════════════════════════════
export function BigNumberVariant27({ data, index, slideCount, brandColor, brandHandle, showBrandHandle, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo , titleFont, textFont, tagFont}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col relative overflow-hidden p-12">
      {/* Borda colorida topo */}
      <div className="absolute top-0 left-0 w-full h-4 z-10" style={{fontFamily: textFont,  backgroundColor: brandColor }} />
      {/* Borda colorida rodapé */}
      <div className="absolute bottom-0 left-0 w-full h-4 z-10" style={{ backgroundColor: brandColor }} />

      <SlideHeader
        data={data} slideIndex={index} onActionStart={onActionStart}
        selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar}
        brandColor={brandColor} isVerified={isVerified}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={showBrandLogo}
      />

      <div className="flex-1 flex flex-col justify-center items-start">
        {/* Badge outline */}
        <SmartField field="tag" {...sp} className="mb-6">
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            className="font-tag font-black text-white text-[14px] tracking-[0.5em] uppercase px-6 py-2 border-2 outline-none inline-block"
            style={{fontFamily: tagFont,  borderColor: brandColor }}
          >
            {data.tag || 'RESULTADO'}
          </span>
        </SmartField>

        {/* Número gigante */}
        <SmartField field="titulo" {...sp} className="mb-8">
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black tracking-tighter leading-none outline-none block"
            style={{ fontSize: `${220 * sTitle}px`, color: brandColor }}
          >
            {data.titulo}
          </span>
        </SmartField>

        {/* Texto de apoio */}
        <SmartField field="texto_apoio" {...sp} className="max-w-full">
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text font-black text-white outline-none leading-tight uppercase break-words max-w-full"
            style={{ fontSize: `${32 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>
    </div>
  );
}

export const BIGNUMBER_VARIANT_COMPONENTS = {
  1: BigNumberVariant1,
  2: BigNumberVariant2,
  3: BigNumberVariant3,
  4: BigNumberVariant4,
  5: BigNumberVariant5,
  6: BigNumberVariant6,
  7: BigNumberVariant7,
  8: BigNumberVariant8,
  9: BigNumberVariant9,
  10: BigNumberVariant10,
  11: BigNumberVariant11,
  12: BigNumberVariant12,
  13: BigNumberVariant13,
  14: BigNumberVariant14,
  15: BigNumberVariant15,
  16: BigNumberVariant16,
  17: BigNumberVariant17,
  18: BigNumberVariant18,
  19: BigNumberVariant19,
  20: BigNumberVariant20,
  21: BigNumberVariant21,
  22: BigNumberVariant22,
  23: BigNumberVariant23,
  24: BigNumberVariant24,
  25: BigNumberVariant25,
  26: BigNumberVariant26,
  27: BigNumberVariant27,
};

export const BIGNUMBER_VARIANT_META = [
  { 
    id: 0, 
    name: 'Original', 
    description: 'Número + tag + texto + imagem inferior',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_bignumber-variants0.png'
  },
  { 
    id: 1, 
    name: 'Dark Stack', 
    description: 'Número grande + tag pill + imagem arredondada',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_bignumber-variants1.png'
  },
  { 
    id: 2, 
    name: 'Phantom', 
    description: 'Número central com ghost gigante atrás',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_bignumber-variants2.png'
  },
  { 
    id: 3, 
    name: 'Color Block', 
    description: 'Bloco colorido superior + texto escuro abaixo',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_bignumber-variants3.png'
  },
  { 
    id: 4, 
    name: 'Glass Card', 
    description: 'Número outline sutil + card glassmorphic',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_bignumber-variants4.png'
  },
  { 
    id: 5, 
    name: 'Side Panel', 
    description: 'Número à esquerda + painel de texto',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_bignumber-variants5.png'
  },
  { 
    id: 6, 
    name: 'Circle Badge', 
    description: 'Número em círculo + tag + card de texto',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_bignumber-variants6.png'
  },
  { 
    id: 7, 
    name: 'Texture Fill', 
    description: 'Número preenchido com textura da imagem',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_bignumber-variants7.png'
  },
  { 
    id: 8, 
    name: 'Outline Float', 
    description: 'Número outline flutuando + imagem inferior',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_bignumber-variants8.png'
  },
  { 
    id: 9, 
    name: 'Sidebar', 
    description: 'Faixa lateral colorida com número rotacionado',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_bignumber-variants9.png'
  },
  { 
    id: 10, 
    name: 'Magazine', 
    description: 'Imagem superior + número sobreposto + cor',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_bignumber-variants10.png'
  },
  { 
    id: 11, 
    name: 'Bento Grid', 
    description: 'Grid com número, tag e texto em cards',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_bignumber-variants11.png'
  },
  { 
    id: 12, 
    name: 'Glass List', 
    description: 'Número lateral + card glassmorphic vertical',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_bignumber-variants12.png'
  },
  { 
    id: 13, 
    name: 'Elegant Glow', 
    description: 'Número central branco com glow da marca',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_bignumber-variants13.png'
  },
  {
    id: 14,
    name: 'Texture Number',
    description: 'Número preenchido com textura de imagem em fundo claro',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_bignumber-variants14.png'
  },
  {
    id: 15,
    name: 'Dark Outline Float',
    description: 'Número outline flutuando + card escuro com imagem',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_bignumber-variants15.png'
  },
  {
    id: 16,
    name: 'Light Color Drop',
    description: 'Fundo branco + número colorido + card de texto',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_bignumber-variants16.png'
  },
  {
    id: 17,
    name: 'Ghost Watermark',
    description: 'Watermark gigante decorativo + tag pill + número menor',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_bignumber-variants17.png'
  },
  {
    id: 18,
    name: 'Glow Centered',
    description: 'Número centralizado com glow colorido + tag frosted',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_bignumber-variants18.png'
  },
  {
    id: 19,
    name: 'Color Block Split',
    description: 'Painel superior colorido com número + painel escuro com tag e texto',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_bignumber-variants19.png'
  },
  {
    id: 20,
    name: 'Image Wash Card',
    description: 'Fundo imagem semiopaco + card branco inferior com número e texto',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_bignumber-variants20.png'
  },
  {
    id: 21,
    name: 'Sidebar Ribbon Light',
    description: 'Faixa lateral colorida rotacionada + número gigante + texto claro',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_bignumber-variants21.png'
  },
  {
    id: 22,
    name: 'Image Over Color',
    description: 'Imagem superior + bloco colorido com número sobreposto e texto bold',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_bignumber-variants22.png'
  },
  {
    id: 23,
    name: 'Editorial Card Float',
    description: 'Painel colorido + card flutuante central + imagem inferior',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_bignumber-variants23.png'
  },
  {
    id: 24,
    name: 'Rounded Card Float',
    description: 'Ghost watermark + imagem em card arredondado + card flutuante com número',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_bignumber-variants24.png'
  },
  {
    id: 25,
    name: 'Image Over Color Bold',
    description: 'Imagem superior + bloco colorido com número gigante sobreposto e texto bold',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_bignumber-variants25.png'
  },
  {
    id: 26,
    name: 'Minimal Footer Number',
    description: 'Imagem fullwidth + barra inferior com label, título e número colorido',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_bignumber-variants26.png'
  },
  {
    id: 27,
    name: 'Bordered Dark',
    description: 'Fundo escuro com bordas coloridas + badge outline + número gigante',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_bignumber-variants27.png'
  },
];


