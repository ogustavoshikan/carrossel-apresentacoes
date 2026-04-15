import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import SmartElement from '../smart-element';
import SlideHeader, { SlideFooterPlaceholder } from '../slide-header';

// ============================================================
// ALICE STUDIO — BIG-NUMBER VARIANTS (1-11)
// Cada variante recebe as mesmas props do SlideBigNumber e
// renderiza um layout visual diferente, preservando dados dinâmicos.
// ============================================================

// ─── Helper: SmartField ──────────────────────────────────────
function SmartField({ data, index, field, showMetrics, onActionStart, selectedElement, onSelectElement, className, children }) {
  const pos = data.positions?.[field] || { x: 0, y: 0, scale: 1 };
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

// ─── Helper: BrandTag ───────────────────────────────────────
function BrandTag({ brandHandle, showBrandHandle, brandAvatar, brandColor }) {
  if (showBrandHandle === false) return null;
  return (
    <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-50 pointer-events-none">
      <div className="flex items-center gap-3">
        {brandAvatar ? (
          <img src={brandAvatar} alt="avatar" className="w-5 h-5 rounded-full object-cover" />
        ) : (
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: brandColor }} />
        )}
        <span className="font-outfit font-black tracking-[0.25em] text-[10px] uppercase text-zinc-500">
          {brandHandle || '@studio'}
        </span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 1 — Dark Stack
// Número gigante + tag pill colorida + texto + imagem inferior arredondada.
// ═══════════════════════════════════════════════════════════
export function BigNumberVariant1({
  data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified,
  titleScale, textScale, showMetrics, onActionStart, onTextChange,
  selectedElement, onSelectElement, showSlideCounter, slideCounterPosition,
}) {
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

              />

      <div className="flex-1 flex flex-col justify-center pt-8 overflow-hidden">
        {/* Número grande */}
        <SmartField field="titulo" {...sp} className="flex items-baseline mb-[-10px]">
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black text-white tracking-tighter leading-none outline-none truncate max-w-full block"
            style={{ fontSize: `${130 * sTitle}px` }}
          >
            {data.titulo}
          </span>
        </SmartField>

        {/* Tag pill */}
        <SmartField field="tag" {...sp} className="mb-8">
          <div
            className="px-6 py-2 inline-block self-start rounded-md shadow-2xl"
            style={{ backgroundColor: brandColor }}
          >
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="font-outfit font-bold text-white text-[12px] tracking-[0.3em] uppercase outline-none block"
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
            className="font-playfair text-zinc-300 outline-none line-clamp-3 overflow-hidden"
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 2 — Phantom Center
// Número centralizado com ghost gigante atrás (sem imagem).
// ═══════════════════════════════════════════════════════════
export function BigNumberVariant2({ data, index, brandColor, brandHandle, showBrandHandle, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full bg-[#080808] flex flex-col items-center justify-center p-10 relative overflow-hidden text-center">
      {/* Ghost gigante */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none font-outfit font-black text-white leading-none tracking-tighter z-0"
        style={{ fontSize: '300px' }}
      >
        {data.titulo}
      </div>

      <BrandTag brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} />

      {/* Número colorido com glow */}
      <SmartField field="titulo" {...sp} className="relative z-10 mb-8">
        <span
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
          className="font-outfit font-black tracking-tighter leading-none outline-none block"
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
          className="font-outfit font-bold text-white text-[14px] tracking-[0.4em] uppercase border border-white/20 px-6 py-2 rounded-full outline-none inline-block"
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
          className="font-playfair text-zinc-400 outline-none"
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
export function BigNumberVariant3({ data, index, brandColor, brandHandle, showBrandHandle, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col overflow-hidden relative">
      {/* Bloco colorido superior */}
      <div
        className="w-full h-[45%] p-10 flex flex-col items-end justify-center relative shrink-0"
        style={{ backgroundColor: brandColor }}
      >
        <SmartField field="titulo" {...sp} className="w-full text-right">
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black text-white tracking-tighter leading-none outline-none block"
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
            className="font-outfit font-black text-[12px] tracking-widest text-zinc-500 uppercase outline-none block"
          >
            {data.tag || 'LABEL'}
          </span>
        </SmartField>

        <SmartField field="texto_apoio" {...sp}>
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-playfair text-white outline-none"
            style={{ fontSize: `${22 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>

      {/* Brand tag no topo */}
      <BrandTag brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 4 — Glass Card
// Número outline sutil atrás + card glassmorphic centralizado.
// ═══════════════════════════════════════════════════════════
export function BigNumberVariant4({ data, index, brandColor, brandHandle, showBrandHandle, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col p-10 overflow-hidden relative items-center justify-center text-center">
      <BrandTag brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} />

      {/* Número outline fantasma */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-full text-center pointer-events-none">
        <span
          className="font-outfit font-black text-transparent tracking-tighter leading-none block outline-none"
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
            className="font-outfit font-bold text-[12px] tracking-[0.4em] uppercase outline-none block"
            style={{ color: brandColor }}
          >
            {data.tag || 'LABEL'}
          </span>
        </SmartField>

        <SmartField field="texto_apoio" {...sp}>
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-playfair text-white outline-none"
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
export function BigNumberVariant5({ data, index, brandColor, brandHandle, showBrandHandle, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full bg-[#080808] flex overflow-hidden relative">
      <BrandTag brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} />

      {/* Número à esquerda */}
      <div className="w-1/2 h-full flex items-center justify-end p-6 relative z-10">
        <SmartField field="titulo" {...sp}>
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black tracking-tighter leading-none outline-none block text-right"
            style={{ fontSize: `${120 * sTitle}px`, color: brandColor }}
          >
            {data.titulo}
          </span>
        </SmartField>
      </div>

      {/* Painel direito */}
      <div className="w-1/2 h-full flex flex-col items-start justify-center p-6 bg-zinc-900 border-l border-white/5">
        <SmartField field="tag" {...sp} className="mb-4">
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            className="font-outfit font-bold text-white text-[10px] tracking-widest uppercase outline-none block"
          >
            {data.tag || 'LABEL'}
          </span>
        </SmartField>

        <SmartField field="texto_apoio" {...sp} className="mb-8">
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-playfair text-zinc-400 outline-none text-left"
            style={{ fontSize: `${16 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>

        {/* Imagem reduzida */}
        <SmartField field="imagem" {...sp}
          className="w-full h-28 rounded-2xl overflow-hidden relative"
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
export function BigNumberVariant6({ data, index, brandColor, brandHandle, showBrandHandle, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col p-10 overflow-hidden relative">
      <BrandTag brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} />

      {/* Imagem de fundo com opacidade */}
      <SmartField field="imagem" {...sp}
        className="absolute top-0 right-0 w-full h-full pointer-events-none"
      >
        <ImageBg
          data={data}
          className="absolute inset-0 opacity-20"
        />
      </SmartField>

      <div className="flex-1 flex flex-col justify-center relative z-10">
        {/* Badge circular + tag */}
        <div className="flex gap-6 items-center mb-8">
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center shrink-0 border-4 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            style={{ borderColor: '#050505', backgroundColor: brandColor }}
          >
            <SmartField field="titulo" {...sp}>
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
                className="font-outfit font-black text-white tracking-tighter leading-none outline-none"
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
              className="font-outfit font-bold text-[18px] tracking-[0.2em] uppercase text-white outline-none block"
            >
              {data.tag || 'LABEL'}
            </span>
          </SmartField>
        </div>

        {/* Card de texto */}
        <div className="bg-[#0A0A0A] p-8 rounded-3xl border border-white/10">
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-playfair text-zinc-300 outline-none"
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
export function BigNumberVariant7({ data, index, brandColor, brandHandle, showBrandHandle, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
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
      <BrandTag brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} />

      {/* Número com textura de imagem */}
      <SmartField field="titulo" {...sp} className="w-full mb-4">
        <span
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
          className="font-outfit font-black tracking-tighter leading-none outline-none block"
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
          className="font-outfit font-bold text-[14px] tracking-[0.4em] uppercase outline-none inline-block"
          style={{ color: brandColor }}
        >
          {data.tag || 'LABEL'}
        </span>
      </SmartField>

      <SmartField field="texto_apoio" {...sp} className="max-w-[80%] mx-auto">
        <p
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
          className="font-playfair text-zinc-400 outline-none"
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
export function BigNumberVariant8({ data, index, brandColor, brandHandle, showBrandHandle, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full bg-[#080808] flex flex-col p-10 relative overflow-hidden">
      <BrandTag brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} />

      {/* Número outline flutuando à direita */}
      <div className="absolute top-1/4 -right-10 z-20 pointer-events-none">
        <SmartField field="titulo" {...sp}>
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black text-transparent tracking-tighter leading-none outline-none block"
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
      <div className="flex-1 flex flex-col justify-end pt-8 relative z-10">
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
            className="font-outfit font-bold text-white text-[10px] tracking-[0.3em] uppercase outline-none block"
          >
            {data.tag || 'LABEL'}
          </span>
        </SmartField>

        <SmartField field="texto_apoio" {...sp}>
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-playfair text-zinc-300 outline-none"
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
export function BigNumberVariant9({ data, index, brandColor, brandHandle, showBrandHandle, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full bg-[#050505] flex overflow-hidden relative">
      <BrandTag brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} />

      {/* Faixa lateral colorida */}
      <div
        className="w-24 h-full flex items-center justify-center border-r border-white/5 shrink-0"
        style={{ backgroundColor: brandColor }}
      >
        <SmartField field="titulo" {...sp}
          className="transform -rotate-90 origin-center w-[500px] text-center"
        >
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black text-white tracking-tighter outline-none inline-block whitespace-nowrap"
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
            className="font-outfit font-bold text-[12px] tracking-[0.4em] uppercase text-zinc-500 outline-none block"
          >
            {data.tag || 'LABEL'}
          </span>
        </SmartField>

        <SmartField field="texto_apoio" {...sp} className="relative z-10">
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-playfair text-white outline-none leading-relaxed"
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
export function BigNumberVariant10({ data, index, brandColor, brandHandle, showBrandHandle, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden relative">
      <BrandTag brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} />

      {/* Metade superior — imagem */}
      <SmartField field="imagem" {...sp} className="h-1/2 w-full relative shrink-0">
        <ImageBg data={data} className="absolute inset-0 opacity-30" />
        <div className="absolute inset-0 bg-[#050505]/50" />
      </SmartField>

      {/* Metade inferior — bloco de cor */}
      <div
        className="h-1/2 w-full p-10 flex flex-col justify-end shrink-0"
        style={{ backgroundColor: brandColor }}
      >
        <SmartField field="texto_apoio" {...sp}>
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-playfair text-black outline-none font-bold"
            style={{ fontSize: `${22 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>

      {/* Número sobreposto na junção */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 z-10">
        <SmartField field="titulo" {...sp}>
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black text-white tracking-tighter leading-none outline-none drop-shadow-2xl"
            style={{ fontSize: `${140 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>
      </div>

      {/* Tag no canto */}
      <div className="absolute top-[45%] right-10 z-10">
        <SmartField field="tag" {...sp}>
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            className="font-outfit font-black text-[12px] uppercase tracking-widest text-white/50 outline-none block"
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
export function BigNumberVariant11({
  data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified,
  titleScale, textScale, showMetrics, onActionStart, onTextChange,
  selectedElement, onSelectElement, showSlideCounter, slideCounterPosition,
}) {
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

              />

      <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-4 pt-16">
        {/* Card número — topo full width */}
        <div
          className="col-span-2 row-span-1 rounded-[2rem] flex items-center justify-center relative overflow-hidden"
          style={{ backgroundColor: brandColor }}
        >
          <div className="absolute inset-0 bg-black/10" />
          <SmartField field="titulo" {...sp} className="relative z-10 w-full text-center">
            <h2
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-outfit font-black text-white tracking-tighter outline-none"
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
              className="font-outfit font-bold text-[10px] tracking-[0.4em] uppercase text-zinc-500 outline-none block"
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
              className="font-playfair text-zinc-300 outline-none text-sm"
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full bg-[#050505] flex relative overflow-hidden p-12">
      <SlideHeader {...props} index={index + 1} total={slideCount} />
      
      {/* Background Decorativo */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 blur-[120px] opacity-20 rounded-full" style={{ backgroundColor: brandColor }} />

      <div className="flex-1 flex items-center relative z-10 gap-8 mt-12">
        <SmartField field="titulo" {...sp} className="shrink-0">
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black tracking-tighter leading-none outline-none block"
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
              className="font-outfit font-black text-[10px] tracking-[0.4em] uppercase text-zinc-500 outline-none block"
            >
              {data.tag || 'INSIGHT'}
            </span>
          </SmartField>

          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-playfair text-white italic leading-relaxed outline-none break-words max-w-full"
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full bg-[#080808] flex flex-col items-center justify-center p-12 relative overflow-hidden text-center">
      <SlideHeader {...props} index={index + 1} total={slideCount} />
      
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />

      <div className="relative mb-12">
        <div className="absolute inset-0 blur-[60px] opacity-40 rounded-full" style={{ backgroundColor: brandColor }} />
        <SmartField field="titulo" {...sp} className="relative z-10">
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black text-white tracking-tighter leading-none outline-none block italic"
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
          className="font-outfit font-black text-[14px] tracking-[0.5em] uppercase outline-none block"
          style={{ color: brandColor }}
        >
          {data.tag || 'HIGHLIGHT'}
        </span>
      </SmartField>

      <SmartField field="texto_apoio" {...sp} className="max-w-[85%]">
        <p
          contentEditable suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
          className="font-playfair text-zinc-400 outline-none leading-relaxed"
          style={{ fontSize: `${20 * sText}px` }}
        >
          {data.texto_apoio}
        </p>
      </SmartField>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// REGISTRO DE VARIANTES
// ═══════════════════════════════════════════════════════════

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
};

export const BIGNUMBER_VARIANT_META = [
  { id: 0,  name: 'Original',      description: 'Número + tag + texto + imagem inferior' },
  { id: 1,  name: 'Dark Stack',    description: 'Número grande + tag pill + imagem arredondada' },
  { id: 2,  name: 'Phantom',       description: 'Número central com ghost gigante atrás' },
  { id: 3,  name: 'Color Block',   description: 'Bloco colorido superior + texto escuro abaixo' },
  { id: 4,  name: 'Glass Card',    description: 'Número outline sutil + card glassmorphic' },
  { id: 5,  name: 'Side Panel',    description: 'Número à esquerda + painel de texto' },
  { id: 6,  name: 'Circle Badge',  description: 'Número em círculo + tag + card de texto' },
  { id: 7,  name: 'Texture Fill',  description: 'Número preenchido com textura da imagem' },
  { id: 8,  name: 'Outline Float', description: 'Número outline flutuando + imagem inferior' },
  { id: 9,  name: 'Sidebar',       description: 'Faixa lateral colorida com número rotacionado' },
  { id: 10, name: 'Magazine',      description: 'Imagem superior + número sobreposto + cor' },
  { id: 11, name: 'Bento Grid',    description: 'Grid com número, tag e texto em cards' },
  { id: 12, name: 'Glass List',    description: 'Número lateral + card glassmorphic vertical' },
  { id: 13, name: 'Elegant Glow',  description: 'Número central branco com glow da marca' },
];


