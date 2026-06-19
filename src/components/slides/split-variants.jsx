import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import SmartElement from '../smart-element';
import SlideHeader, { SlideFooterPlaceholder } from '../slide-header';

// ============================================================
// CARROSSEL STUDIO — SPLIT VARIANTS (1-5)
// Cada variante recebe as mesmas props do SlideContentSplit e
// renderiza um layout visual diferente, preservando dados dinâmicos.
// ============================================================

function SmartField({ data, index, field, showMetrics, onActionStart, selectedElement, onSelectElement, className, style, children, rotation, forceX, forceY }) {
  const basePos = data.positions?.[field] || { x: 0, y: 0, scale: 1 };
  const pos = { ...basePos };
  if (rotation !== undefined && basePos.rotation === undefined) {
    pos.rotation = rotation;
  }
  if (forceX !== undefined) {
    pos.x = forceX;
  }
  if (forceY !== undefined) {
    pos.y = forceY;
  }
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
      style={style}
    >
      {children}
    </SmartElement>
  );
}

// ─── Helper: TextWrapper ────────────────────────────────────
function TextWrapper({ 
  field, 
  index, 
  onTextChange, 
  as: Component = 'div', 
  className, 
  style, 
  children, 
  // Destructure and ignore these to prevent passing them to the DOM
  data,
  onActionStart,
  selectedElement,
  onSelectElement,
  ...props 
}) {
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

function getCorsSafeUrl(url) {
  if (!url || typeof url !== 'string') return url;
  if (
    url.includes('unsplash.com') ||
    url.includes('images.weserv.nl') ||
    url.startsWith('/') ||
    url.startsWith('data:') ||
    url.startsWith('blob:')
  ) {
    return url;
  }
  return `https://images.weserv.nl/?url=${encodeURIComponent(url)}`;
}

// ─── Helper: ImageBg ────────────────────────────────────────
// Aceita props explícitas (imageUrl, imagePosition, imageScale) ou
// faz fallback para data.imageUrl para compatibilidade retroativa.
function ImageBg({ data, imageUrl, imagePosition, imagePositionX, imageScale, className = '', style = {}, children }) {
  const rawUrl = imageUrl !== undefined ? imageUrl : data?.imageUrl;
  const url = getCorsSafeUrl(rawUrl);
  const posY = imagePosition !== undefined ? imagePosition : (data?.imagePosition ?? 50);
  const posX = imagePositionX !== undefined ? imagePositionX : (data?.imagePositionX ?? 50);
  const scale = imageScale !== undefined ? imageScale : (data?.imageScale ?? 1);

  if (url) {
    return (
      <div
        className={`bg-cover ${className}`}
        style={{
          backgroundImage: `url("${url}")`,
          backgroundPosition: `${posX}% ${posY}%`,
          transform: `scale(${scale})`,
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

// ═══════════════════════════════════════════════════════════
// VARIANTE 1 — Hero Top
// Imagem arredondada no topo + tag + título + texto abaixo.
// Inspirado no layout do arquivo original (Variante 1).
// ═══════════════════════════════════════════════════════════
export function SplitVariant1({ data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
  titleScale, textScale, showMetrics, onActionStart, onTextChange,
  selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo, titleFont, textFont, tagFont }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col p-10 relative overflow-hidden">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1}
        total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor}
        isVerified={isVerified}
        brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter}
        slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={showBrandLogo}
        handleColor="#636363"
        counterColor="#636363"
        counterBg="#080808" />

      <div className="flex-1 flex flex-col justify-center pt-8">
        {/* Imagem arredondada */}
        <SmartField field="imagem" {...sp}
          className="relative w-full h-48 shrink-0 rounded-[2rem] overflow-hidden mb-4 ring-1 ring-white/10 shadow-2xl"
        >
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>

        {/* Tag + título + texto */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-2 shrink-0">
            <div className="h-[2px] w-5" style={{ backgroundColor: brandColor }} />
            <SmartField field="tag" {...sp}>
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
                className="inline-block font-tag font-bold text-[11px] tracking-[0.4em] uppercase outline-none -translate-y-[2px]"
                style={{ fontFamily: tagFont, color: brandColor }}
              >
                {data.tag || 'TAG'}
              </span>
            </SmartField>
          </div>

          <SmartField field="titulo" {...sp} className="mb-2 shrink-0">
            <h2
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black text-white tracking-tighter outline-none"
              style={{ fontSize: `${28 * sTitle}px`, lineHeight: 1.1 }}
            >
              {data.titulo}
            </h2>
          </SmartField>

          <SmartField field="texto_apoio" {...sp} className="min-h-0">
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text text-zinc-400 outline-none leading-relaxed line-clamp-8"
              style={{ fontSize: `${16 * sText}px` }}
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
// VARIANTE 2 — Side Split
// Imagem lateral esquerda 45% + conteúdo de texto na direita 55%.
// Inspirado no layout do arquivo original (Variante 2).
// ═══════════════════════════════════════════════════════════
export function SplitVariant2({ data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
  titleScale, textScale, showMetrics, onActionStart, onTextChange,
  selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo, titleFont, textFont, tagFont }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex relative overflow-hidden" style={{ fontFamily: textFont, backgroundColor: brandColor || '#050505' }}>
      {/* Imagem lateral esquerda */}
      <SmartField field="imagem" {...sp}
        className="w-[50%] h-full relative z-10 border-r-[3px] overflow-hidden"
        style={{ borderRightColor: '#54545452', borderRightStyle: 'solid' }}
      >
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>

      {/* Conteúdo direito */}
      <div className="w-[50%] h-full p-10 flex flex-col justify-center relative z-0">
        <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
          index={index + 1}
          total={slideCount}
          brandHandle={brandHandle} showBrandHandle={false}
          brandColor={brandColor}
          isVerified={isVerified}
          brandAvatar={brandAvatar}
          showSlideCounter={showSlideCounter}
          slideCounterPosition={slideCounterPosition}
          hideDot={true} brandLogo={brandLogo} showBrandLogo={showBrandLogo} />

        <div className="mb-6 mt-10">
          <SmartField field="tag" {...sp}>
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="px-3 py-1 border border-white/20 rounded font-tag text-[10px] tracking-widest outline-none inline-block"
              style={{ fontFamily: tagFont, color: '#ffffff', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              {data.tag || 'TAG'}
            </span>
          </SmartField>
        </div>

        <SmartField field="titulo" {...sp} className="mb-6 w-full">
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black text-white leading-[1.1] outline-none break-words"
            style={{ fontSize: `${28 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>

        <div className="flex flex-col">
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text font-bold outline-none leading-relaxed"
              style={{ fontSize: `${14 * sText}px`, color: '#ffffff' }}
            >
              {data.texto_apoio}
            </p>
          </SmartField>

          <div
            className="shrink-0 mt-4"
            style={{
              width: '3rem',
              height: '0.25rem',
              backgroundColor: 'rgba(255, 255, 255, 0.8)'
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 3 — Text Top
// Conteúdo de texto na metade superior + imagem na inferior.
// Inspirado no layout do arquivo original (Variante 3).
// ═══════════════════════════════════════════════════════════
export function SplitVariant3({ data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
  titleScale, textScale, showMetrics, onActionStart, onTextChange,
  selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo, titleFont, textFont, tagFont }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-[#050505] relative">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1}
        total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor}
        isVerified={isVerified}
        brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter}
        slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={showBrandLogo}
        handleColor="#636363"
        counterColor="#636363"
        counterBg="#080808" />

      {/* Bloco superior: texto */}
      <div className="w-full h-1/2 p-10 pt-[115px] flex flex-col justify-start border-b-[8px] shrink-0" style={{ borderColor: brandColor }}>
        <div className="">
          <div className="flex items-center gap-2 mb-4 shrink-0">
            <div className="h-[2px] min-h-[2px] w-5 shrink-0" style={{ fontFamily: textFont, backgroundColor: brandColor }} />
            <SmartField field="tag" {...sp}>
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
                className="inline-block font-tag font-bold text-[10px] tracking-[0.4em] uppercase outline-none -translate-y-[3px]"
                style={{ fontFamily: tagFont, color: brandColor }}
              >
                {data.tag || 'TAG'}
              </span>
            </SmartField>
          </div>

          <SmartField field="titulo" {...sp} className="mb-4">
            <h2
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black text-white tracking-tighter leading-tight outline-none break-words"
              style={{ fontSize: `${34 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>

          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text text-zinc-400 outline-none"
              style={{ fontSize: `${14 * sText}px` }}
            >
              {data.texto_apoio}
            </p>
          </SmartField>
        </div>
      </div>

      {/* Bloco inferior: imagem */}
      <SmartField field="imagem" {...sp} className="w-full h-1/2 relative shrink-0 overflow-hidden">
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
    </div>
  );
}



// ═══════════════════════════════════════════════════════════
// VARIANTE 7 — Fashion Overlap
// Card de texto central com imagem circular pequena sobreposta
// ═══════════════════════════════════════════════════════════
export function SplitVariant7(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full bg-black flex flex-col p-10 justify-center items-center relative overflow-hidden">
      {data.imageUrl && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.08]">
          <ImageBg data={data} className="absolute inset-0" />
        </div>
      )}
      <div className="absolute inset-0 z-30 pointer-events-none [&>*]:pointer-events-auto mix-blend-difference opacity-90">
        <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} brandAvatar={brandAvatar}
          hideDot={true}
        />
      </div>

      <div className="relative w-full max-w-[440px] z-20">
        {/* Card Principal */}
        <div
          className="bg-white rounded-[2.5rem] p-12 shadow-2xl relative z-0"
          style={{ border: '3px solid rgb(73 73 73 / 80%)' }}
        >
          <div className="-translate-y-[20px]">
            <SmartField field="tag" {...sp} className="mb-6">
              <span
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
                className="font-tag font-black text-[10px] tracking-[0.3em] uppercase outline-none px-4 py-1.5 rounded-[8px] border"
                style={{ color: brandColor, borderColor: `${brandColor}40` }}
              >
                {data.tag || 'EXCLUSIVE'}
              </span>
            </SmartField>

            <SmartField field="titulo" {...sp} className="mb-6">
              <h2
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
                className="font-title font-bold text-zinc-900 leading-tight outline-none italic break-words"
                style={{ fontSize: `${32 * sTitle}px` }}
              >
                {data.titulo}
              </h2>
            </SmartField>

            <SmartField field="texto_apoio" {...sp}>
              <p
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                className="font-text font-medium text-zinc-500 text-sm leading-relaxed outline-none"
                style={{ fontSize: `${14 * sText}px` }}
              >
                {data.texto_apoio}
              </p>
            </SmartField>
          </div>
        </div>

        {/* Imagem Flutuante */}
        <SmartField field="imagem" {...sp} className="absolute -top-12 -right-6 w-32 h-32 rounded-full overflow-hidden border-[6px] border-white shadow-2xl z-10">
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 8 — Image Top Split
// Imagem superior rounded + header + conteúdo horizontal
// ═══════════════════════════════════════════════════════════
export function SplitVariant8(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full p-6 flex flex-col overflow-hidden bg-[#FAFAFA] relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} counterBg="#EDEDED" handleColor="#1A1A1A" counterColor="#1A1A1A" brandAvatar={brandAvatar}
        hideDot={true}
      />

      <div className="translate-y-[10px] flex flex-col flex-1 min-h-0">
        <div className="w-full shrink-0" style={{ fontFamily: titleFont, height: '13px' }} />
        <SmartField field="imagem" {...sp}
          className="w-full h-[45%] rounded-2xl overflow-hidden mb-6 shrink-0 bg-zinc-300 relative border border-black/5 mt-4"
          style={{ boxShadow: `0 10px 15px -3px ${brandColor}26, 0 4px 6px -2px ${brandColor}26` }}
        >
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>

        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center gap-4 mb-4 shrink-0">
            <SmartField field="tag" {...sp}>
              <span
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
                className="text-white font-tag font-bold px-2 py-0.5 rounded text-[11px] shrink-0 outline-none uppercase tracking-wide"
                style={{ fontFamily: tagFont, backgroundColor: brandColor }}
              >
                {data.tag || 'TAG'}
              </span>
            </SmartField>

            <SmartField field="titulo" {...sp} className="flex-1 min-w-0">
              <h2
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
                className="font-title font-black text-[#1a1a1a] tracking-tight leading-[1.1] outline-none break-words translate-y-[2px]"
                style={{ fontSize: `${24 * sTitle}px` }}
              >
                {data.titulo}
              </h2>
            </SmartField>
          </div>

          <SmartField field="texto_apoio" {...sp} className="flex-1 min-h-0">
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text text-zinc-700 leading-snug outline-none"
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
// VARIANTE 9 — Circle Top 
// Imagem oval superior com container glassmorphism logo abaixo
// ═══════════════════════════════════════════════════════════
export function SplitVariant9(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full p-6 pb-0 flex flex-col overflow-hidden relative bg-[#F4F4F5]">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} counterBg="#EDEDED" handleColor="#1A1A1A" counterColor="#1A1A1A" brandAvatar={brandAvatar}
        hideDot={true}
      />

      <SmartField field="imagem" {...sp}
        className="w-[85%] h-[40%] mx-auto mt-6 rounded-[5rem] overflow-hidden mb-8 shrink-0 bg-zinc-300 relative top-[10px] border-4 border-white"
        style={{
          boxShadow: `0 25px 50px -12px ${brandColor}26`
        }}
      >
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>

      <div className="flex-1 flex flex-col items-center text-center min-h-0 pt-8 px-12 pb-10 rounded-t-[3rem] border-t border-x border-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] relative overflow-hidden">
        {/* Camada de Blur isolada para evitar bug no download PNG */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-md -z-10" />
        <SmartField field="titulo" {...sp} className="w-full shrink-0 mb-3">
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black tracking-tight leading-[1.1] outline-none break-words"
            style={{ color: brandColor, fontSize: `${22 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>

        <SmartField field="texto_apoio" {...sp} className="w-full flex-1 min-h-0">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-zinc-700 leading-snug outline-none"
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
// VARIANTE 10 — Polaroid Tilt
// Layout minimalista com estilo polaroid inclinada
// ═══════════════════════════════════════════════════════════
export function SplitVariant10(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full p-6 flex flex-col overflow-hidden bg-[#E8E8E8] relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} counterBg="#EDEDED" handleColor="#1A1A1A" counterColor="#1A1A1A" brandAvatar={brandAvatar}
        hideDot={true}
      />

      <div
        className="w-[82%] mx-auto bg-white p-3 flex flex-col shrink-0 mb-4 mt-8 rotate-[-2deg] border border-black/5 z-10"
        style={{ boxShadow: `0 20px 25px -5px ${brandColor}33, 0 8px 10px -6px ${brandColor}33` }}
      >
        <SmartField field="imagem" {...sp} className="w-full aspect-square relative mb-3 overflow-hidden bg-zinc-200">
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>

        <div className="flex justify-between items-center px-2">
          <SmartField field="tag" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="font-tag font-bold text-zinc-400 text-[10px] tracking-widest uppercase outline-none"
            >
              {data.tag || `VOL. 0${index + 1}`}
            </span>
          </SmartField>

          <svg className="w-3 h-3" style={{ fontFamily: titleFont, color: brandColor }} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0 px-4 -mt-1">
        <SmartField field="titulo" {...sp} className="shrink-0 mb-3">
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black text-[#1a1a1a] tracking-tight leading-[1.1] outline-none break-words"
            style={{ fontSize: `${26 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>
        <SmartField field="texto_apoio" {...sp} className="flex-1">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-zinc-600 leading-relaxed italic outline-none line-clamp-5"
            style={{ fontSize: `${15 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 11 — Overlap Card
// Imagem de fundo com card de texto subindo e sobrepondo
// ═══════════════════════════════════════════════════════════
export function SplitVariant11(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full p-6 flex flex-col overflow-hidden relative bg-[#FAFAFA]">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} counterBg="#EDEDED" handleColor="#1A1A1A" counterColor="#1A1A1A" brandAvatar={brandAvatar}
        hideDot={true}
      />

      <div className="w-full shrink-0" style={{ fontFamily: textFont, height: '13px' }} />
      <SmartField field="imagem" {...sp} className="w-full h-[50%] shrink-0 relative z-0 border border-black/5 mt-4 overflow-hidden">
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>

      <div className="flex-1 flex flex-col min-h-0 bg-white p-6 rounded-tr-[2.5rem] -mt-10 relative z-[70] shadow-[0_-15px_30px_rgba(0,0,0,0.06)] border-t border-r border-white">
        <div className="flex items-center gap-2 mb-3 mt-1 shrink-0">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: brandColor }} />
          <SmartField field="tag" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="font-tag font-bold text-xs text-zinc-400 tracking-wider uppercase outline-none"
            >
              {data.tag || 'TAG'}
            </span>
          </SmartField>
        </div>

        <SmartField field="titulo" {...sp} className="mb-3 shrink-0">
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black text-[#1a1a1a] leading-[1.1] outline-none break-words"
            style={{ fontSize: `${24 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>

        <SmartField field="texto_apoio" {...sp} className="flex-1 min-h-0">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-zinc-600 leading-snug outline-none"
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
// VARIANTE 12 — Dark Centered
// Layout centralizado com círculo e foco na cor da marca
// ═══════════════════════════════════════════════════════════
export function SplitVariant12(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full p-6 flex flex-col overflow-hidden items-center text-white relative" style={{ fontFamily: titleFont, backgroundColor: brandColor, borderBottom: '10px solid #ffffff' }}>
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} brandAvatar={brandAvatar}
        hideDot={true}
      />

      <SmartField field="titulo" {...sp} className="mt-8 mb-6 w-full shrink-0">
        <h2
          contentEditable suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
          className="font-title font-black leading-tight outline-none break-words text-center"
          style={{ fontSize: `${28 * sTitle}px` }}
        >
          {data.titulo}
        </h2>
      </SmartField>

      <SmartField field="imagem" {...sp} className="w-48 h-48 rounded-full overflow-hidden shrink-0 border-[5px] border-white relative mb-6 shadow-2xl">
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>

      <SmartField field="texto_apoio" {...sp} className="flex-1 min-h-0 w-full">
        <p
          contentEditable suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
          className="font-text text-white/80 leading-snug outline-none text-center"
          style={{ fontSize: `${18 * sText}px` }}
        >
          {data.texto_apoio}
        </p>
      </SmartField>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 13 — Thin Border Split
// Layout com bordas grossas coloridas, imagem central retangular e tipografia limpa.
// ═══════════════════════════════════════════════════════════
export function SplitVariant13(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full relative overflow-hidden bg-white">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} counterBg="#EDEDED" handleColor="#1A1A1A" counterColor="#1A1A1A" brandAvatar={brandAvatar}
        hideDot={true}
      />
      <div className="absolute inset-0 p-6 flex flex-col border-8" style={{ fontFamily: textFont, borderColor: brandColor }}>
        <div className="flex justify-between items-end mb-4 shrink-0 mt-[26px]">
          <SmartField field="titulo" {...sp} className="flex-1 min-w-0">
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black text-[#1a1a1a] leading-tight outline-none break-words"
              style={{ fontSize: `${26 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>

          <SmartField field="tag" {...sp} className="ml-4 shrink-0">
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="font-tag font-black text-3xl opacity-20 uppercase outline-none"
              style={{ fontFamily: tagFont, color: brandColor }}
            >
              {data.tag || 'TAG'}
            </span>
          </SmartField>
        </div>

        <SmartField field="imagem" {...sp} className="w-full h-[45%] shrink-0 relative mb-4 border border-zinc-300 bg-zinc-300 overflow-hidden rounded-[10px]">
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>

        <SmartField field="texto_apoio" {...sp} className="flex-1 min-h-0">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-zinc-800 leading-relaxed font-medium outline-none"
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
// VARIANTE 15 — Arch Top View
// Header arredondado de formato longo + texto centralizado.
// ═══════════════════════════════════════════════════════════
export function SplitVariant15(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full p-6 flex flex-col overflow-hidden bg-[#FAFAFA] relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} counterBg="#EDEDED" handleColor="#1A1A1A" counterColor="#1A1A1A" brandAvatar={brandAvatar}
        hideDot={true}
      />

      <SmartField field="imagem" {...sp}
        className="w-full h-[55%] bg-zinc-300 rounded-t-[150px] rounded-b-xl overflow-hidden mb-6 mt-[26px] relative shrink-0 border-4 border-white"
        style={{ boxShadow: `0 10px 15px -3px ${brandColor}26, 0 4px 6px -4px ${brandColor}26` }}
      >
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>

      <div className="flex-1 flex flex-col items-center text-center min-h-0 pt-[10px]">
        <SmartField field="tag" {...sp} className="mb-2 shrink-0">
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            className="font-tag text-[10px] font-bold tracking-widest uppercase outline-none"
            style={{ fontFamily: titleFont, color: brandColor }}
          >
            {data.tag || 'TAG'}
          </span>
        </SmartField>

        <SmartField field="titulo" {...sp} className="mb-3 shrink-0 min-w-0 w-full">
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black text-[#1a1a1a] leading-tight outline-none break-words"
            style={{ fontSize: `${26 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>

        <SmartField field="texto_apoio" {...sp} className="w-[90%] flex-1 min-h-0">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-zinc-700 leading-relaxed outline-none"
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
// VARIANTE 16 — Frame Box Bottom Right
// Frame destacado na extremidade com decorativo colorido inferior direito.
// ═══════════════════════════════════════════════════════════
export function SplitVariant16(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full p-6 flex flex-col overflow-hidden bg-[#FAFAFA] relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} counterBg="#EDEDED" handleColor="#1A1A1A" counterColor="#1A1A1A" brandAvatar={brandAvatar}
        hideDot={true}
      />

      <div className="w-full h-[45%] shrink-0 relative mb-8 mt-[45px]">
        <div className="absolute -bottom-3 -right-3 w-24 h-24 rounded-br-[90px] z-0" style={{ fontFamily: textFont, backgroundColor: brandColor }} />
        <SmartField field="imagem" {...sp}
          className="relative w-full h-full bg-zinc-300 rounded-br-[80px] rounded-tl-xl overflow-hidden z-10 border-4 border-white"
          style={{ boxShadow: `0 10px 15px -3px ${brandColor}26, 0 4px 6px -2px ${brandColor}26` }}
        >
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>
      </div>

      <div className="flex-1 flex flex-col min-h-0 pl-2 pt-[10px]">
        <SmartField field="tag" {...sp} className="mb-2 shrink-0">
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            className="text-white font-tag font-bold px-2 py-0.5 rounded text-[11px] shrink-0 outline-none uppercase tracking-wide"
            style={{ fontFamily: tagFont, backgroundColor: brandColor }}
          >
            {data.tag || 'TAG'}
          </span>
        </SmartField>

        <SmartField field="titulo" {...sp} className="mb-3 shrink-0 min-w-0">
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black text-[#1a1a1a] leading-tight outline-none break-words"
            style={{ fontSize: `${28 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>

        <SmartField field="texto_apoio" {...sp} className="flex-1 min-h-0">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-zinc-700 leading-snug outline-none"
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
// VARIANTE 17 — Diagonal Z-Index Shift
// Design levemente inclinado (-rotate) superpondo foto sobre fundo escuro.
// ═══════════════════════════════════════════════════════════
export function SplitVariant17(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full p-6 flex flex-col overflow-hidden relative justify-center bg-black">
      {data.imageUrl && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.08]">
          <ImageBg data={data} className="absolute inset-0" />
        </div>
      )}
      <div className="absolute inset-0 z-30 pointer-events-none [&>*]:pointer-events-auto mix-blend-difference opacity-90">
        <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} brandAvatar={brandAvatar}
          hideDot={true}
        />
      </div>

      <SmartField field="imagem" {...sp}
        className="w-[90%] h-[40%] mx-auto bg-zinc-300 rounded-2xl relative z-10 transform -rotate-3 shrink-0 border border-zinc-700 mt-[36px] overflow-hidden"
        style={{ boxShadow: `0 25px 50px -12px ${brandColor}26` }}
      >
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>

      <div className="w-[95%] mx-auto bg-white p-6 rounded-2xl relative z-20 shadow-2xl transform rotate-1 -mt-4 flex-1 flex flex-col min-h-0 mb-6">
        <div className="flex items-center gap-3 mb-3 shrink-0">
          <SmartField field="tag" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="border-2 font-tag font-bold px-2 py-0.5 rounded text-[11px] shrink-0 uppercase tracking-widest outline-none"
              style={{ fontFamily: tagFont, color: brandColor, borderColor: brandColor }}
            >
              {data.tag || 'TAG'}
            </span>
          </SmartField>
        </div>

        <SmartField field="titulo" {...sp} className="mb-2 shrink-0 min-w-0">
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black text-[#1a1a1a] leading-tight outline-none break-words"
            style={{ fontSize: `${24 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>

        <SmartField field="texto_apoio" {...sp} className="flex-1 min-h-0">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-zinc-600 leading-snug outline-none"
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
// VARIANTE 18 — Edge-to-Edge Half Split
// Metade imagem total e metade texto contínuo no rodapé.
// ═══════════════════════════════════════════════════════════
export function SplitVariant18(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-white relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} brandAvatar={brandAvatar}
        hideDot={true}
      />

      <div className="w-full h-[50%] shrink-0 relative border-b-[8px] border-solid" style={{ borderColor: brandColor }}>
        <SmartField field="imagem" {...sp} className="w-full h-full bg-zinc-300 relative overflow-hidden">
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>
      </div>

      <div className="flex-1 p-8 flex flex-col min-h-0 bg-white shadow-[inset_0_10px_30px_rgba(0,0,0,0.03)] z-10">
        <div className="flex items-center gap-3 mb-3 shrink-0">
          <SmartField field="tag" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="border-2 font-tag font-bold px-2 py-0.5 rounded text-[11px] shrink-0 uppercase tracking-widest outline-none"
              style={{ fontFamily: tagFont, color: brandColor, borderColor: brandColor }}
            >
              {data.tag || 'dica'}
            </span>
          </SmartField>
        </div>

        <SmartField field="titulo" {...sp} className="mb-4 shrink-0 min-w-0 w-full">
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black text-[#1a1a1a] leading-tight outline-none break-words"
            style={{ fontSize: `${26 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>

        <SmartField field="texto_apoio" {...sp} className="flex-1 min-h-0 w-full">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-zinc-600 leading-relaxed font-medium outline-none w-full"
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
// VARIANTE 19 — Reverse Rounded
// ═══════════════════════════════════════════════════════════
export function SplitVariant19(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full p-6 flex flex-col overflow-hidden bg-[#FAFAFA] relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} brandAvatar={brandAvatar} counterBg="#EDEDED" handleColor="#1A1A1A" counterColor="#1A1A1A"
        hideDot={true}
      />

      <div className="flex-1 flex flex-col min-h-0 justify-center pb-4 mt-[4px]">
        <div className="flex items-center gap-3 mb-3 shrink-0">
          <SmartField field="tag" {...sp} className="-translate-y-[2px]">
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="border-2 font-tag font-bold px-2 py-0.5 rounded text-[11px] shrink-0 uppercase tracking-widest outline-none"
              style={{ fontFamily: titleFont, color: brandColor, borderColor: brandColor }}
            >
              {data.tag || 'TAG'}
            </span>
          </SmartField>

          <SmartField field="titulo" {...sp} className="flex-1 min-w-0">
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black text-[#1a1a1a] tracking-tight leading-[1.1] outline-none break-words translate-y-[2px]"
              style={{ fontSize: `${24 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>

        <SmartField field="texto_apoio" {...sp} className="min-h-0">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-zinc-700 leading-snug outline-none"
            style={{ fontSize: `${18 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>

      <SmartField field="imagem" {...sp}
        className="w-full h-[50%] rounded-2xl overflow-hidden shrink-0 bg-zinc-300 relative border border-black/5 mt-auto"
        style={{ boxShadow: `0 10px 15px -3px ${brandColor}26, 0 4px 6px -2px ${brandColor}26` }}
      >
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 20 — Reverse Background
// ═══════════════════════════════════════════════════════════
export function SplitVariant20(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full relative overflow-hidden bg-black flex flex-col">
      <div className="absolute inset-0 z-0">
        <SmartField field="imagem" {...sp} className="w-full h-full">
          <ImageBg data={data} className="absolute inset-0" />
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        </SmartField>
      </div>

      <div className="relative z-10 w-full p-6 flex flex-col h-full justify-between pointer-events-none">
        <div className="pointer-events-auto mix-blend-difference">
          <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} brandAvatar={brandAvatar}
            hideDot={true}
          />
        </div>

        <div
          className="bg-white/95 p-[17px] rounded-3xl shrink-0 pointer-events-auto"
          style={{
            boxShadow: `0 25px 50px -12px ${brandColor}26`,
            border: '3px solid rgb(0 0 0 / 10%)'
          }}
        >
          <SmartField field="titulo" {...sp} className="mb-2 w-full">
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black tracking-tight leading-[1.1] outline-none break-words"
              style={{ color: brandColor, fontSize: `${22 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>

          <SmartField field="texto_apoio" {...sp} className="min-h-0">
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text text-zinc-800 leading-snug outline-none"
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
// VARIANTE 21 — Float Bottom Right
// ═══════════════════════════════════════════════════════════
export function SplitVariant21(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full p-6 flex flex-col overflow-hidden relative bg-[#FAFAFA]">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} brandAvatar={brandAvatar} counterBg="#EDEDED" handleColor="#1A1A1A" counterColor="#1A1A1A"
        hideDot={true}
      />

      <div className="flex-1 flex flex-col z-10 min-h-0 pt-[43px]">
        <div className="flex items-center gap-3 mb-3 shrink-0">
          <SmartField field="tag" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="border-2 font-tag font-bold px-2 py-0.5 rounded text-[11px] shrink-0 uppercase tracking-widest outline-none"
              style={{ fontFamily: tagFont, color: brandColor, borderColor: brandColor }}
            >
              {data.tag || 'dica'}
            </span>
          </SmartField>
        </div>

        <SmartField field="titulo" {...sp} className="mb-4 w-[80%]">
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black text-[#1a1a1a] leading-[1.1] outline-none break-words"
            style={{ fontSize: `${32 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>

        <SmartField field="texto_apoio" {...sp} className="w-[70%] min-h-0">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-zinc-600 leading-snug outline-none"
            style={{ fontSize: `${18 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>

      <div className="absolute bottom-6 right-6 z-0" style={{ width: 'calc(55% + 40px)', height: 'calc(40% + 20px)' }}>
        <SmartField field="imagem" {...sp}
          className="relative w-full h-full rounded-[25px] overflow-hidden bg-zinc-300 border-4 border-white"
          style={{ boxShadow: `0 25px 50px -12px ${brandColor}33` }}
        >
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 22 — Vertical Bar
// ═══════════════════════════════════════════════════════════
export function SplitVariant22(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex bg-[#FAFAFA] relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} brandAvatar={brandAvatar} counterBg="#EDEDED" handleColor="#1A1A1A" counterColor="#1A1A1A"
        hideDot={true}
      />
      <div className="w-14 h-full shrink-0 flex flex-col items-center py-6 shadow-xl z-10" style={{ fontFamily: textFont, backgroundColor: brandColor }}>
        <span className="font-text font-black text-[10px] transform -rotate-90 origin-center whitespace-nowrap mt-20 tracking-[0.3em] text-white uppercase">
          {data.tag || 'VOL 09'}
        </span>
        <div className="w-px h-16 bg-white/30 mt-auto mb-4" />
        <span className="font-text font-bold text-xs text-white">
          {index + 1}
        </span>
      </div>

      <div className="flex-1 flex flex-col h-full p-6 relative z-20 pb-8">

        <div className="flex-1 min-h-0 flex flex-col justify-start pt-24 mb-6 pl-2">
          <div style={{ width: '2.5rem', height: '3px', backgroundColor: brandColor }} className="mb-6 shrink-0" />

          <SmartField field="titulo" {...sp} className="mb-3">
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black text-[#1a1a1a] leading-[1.1] outline-none break-words"
              style={{ fontSize: `${24 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>

          <SmartField field="texto_apoio" {...sp} className="min-h-0">
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text text-zinc-600 leading-snug outline-none"
              style={{ fontSize: `${18 * sText}px` }}
            >
              {data.texto_apoio}
            </p>
          </SmartField>
        </div>

        <SmartField field="imagem" {...sp}
          className="w-full bg-zinc-300 mt-auto relative shrink-0 rounded-xl overflow-hidden border-4 border-white"
          style={{ height: 'calc(35% + 35px)', boxShadow: `0 20px 25px -5px ${brandColor}26, 0 8px 10px -6px ${brandColor}26` }}
        >
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 23 — Glass Offset Bottom
// ═══════════════════════════════════════════════════════════
export function SplitVariant23(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#FAFAFA]">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} brandAvatar={brandAvatar} counterBg="#EDEDED" handleColor="#1A1A1A" counterColor="#1A1A1A"
        hideDot={true}
      />
      <div className="absolute inset-0 p-6 flex flex-col">
        <div className="relative z-10 bg-white/95 p-6 rounded-2xl shadow-xl w-[90%] border border-white/50 mb-auto mt-6 ml-auto shrink-0 flex flex-col">
          <SmartField field="tag" {...sp} className="mb-2 text-right">
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="font-tag font-black text-[10px] uppercase tracking-widest outline-none block"
              style={{ fontFamily: titleFont, color: brandColor }}
            >
              {data.tag || 'TAG'}
            </span>
          </SmartField>

          <SmartField field="titulo" {...sp} className="mb-2 text-right w-full">
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black text-[#1a1a1a] leading-[1.1] outline-none break-words"
              style={{ fontSize: `${22 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>

          <SmartField field="texto_apoio" {...sp} className="text-right min-h-0">
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text text-zinc-600 leading-snug outline-none"
              style={{ fontSize: `${18 * sText}px` }}
            >
              {data.texto_apoio}
            </p>
          </SmartField>
        </div>

        <SmartField field="imagem" {...sp} className="w-[85%] h-[45%] bg-zinc-300 absolute bottom-6 left-6 rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-0">
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 24 — Center Arch Bottom
// ═══════════════════════════════════════════════════════════
export function SplitVariant24(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full p-6 flex flex-col overflow-hidden bg-[#FAFAFA] relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} brandAvatar={brandAvatar} counterBg="#EDEDED" handleColor="#1A1A1A" counterColor="#1A1A1A"
        hideDot={true}
      />

      <div className="flex-1 flex flex-col items-center text-center justify-center pt-8 pb-4 min-h-0">
        <SmartField field="tag" {...sp} className="mb-2 shrink-0">
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            className="text-[10px] font-tag font-bold tracking-widest uppercase outline-none"
            style={{ fontFamily: titleFont, color: brandColor }}
          >
            {data.tag || 'TAG'}
          </span>
        </SmartField>

        <SmartField field="titulo" {...sp} className="mb-3 shrink-0 w-full">
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black text-[#1a1a1a] leading-[1.1] outline-none break-words"
            style={{ fontSize: `${26 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>

        <SmartField field="texto_apoio" {...sp} className="w-[90%] flex-1 min-h-0">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-zinc-700 leading-relaxed outline-none"
            style={{ fontSize: `${18 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>

      <SmartField field="imagem" {...sp}
        className="w-full h-[50%] bg-zinc-300 rounded-b-[100px] rounded-t-xl overflow-hidden mt-auto relative shrink-0 border-b-8 border-white"
        style={{ boxShadow: `0 10px 15px -3px ${brandColor}33, 0 4px 6px -2px ${brandColor}33` }}
      >
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 25 — Dark Gradient Bottom
// ═══════════════════════════════════════════════════════════
export function SplitVariant25(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden bg-[#FAFAFA] p-6">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} brandAvatar={brandAvatar} counterBg="#EDEDED" handleColor="#1A1A1A" counterColor="#1A1A1A"
        hideDot={true}
      />

      <div className="flex-1 flex flex-col justify-start items-center gap-4 mt-12 pt-[19px]">
        {/* Card de Imagem (A "moldura" que o usuário mencionou) */}
        <SmartField field="imagem" {...sp}
          className="w-[90%] rounded-3xl overflow-hidden bg-zinc-900 relative shrink-0 border-4 border-white"
          style={{
            height: 'calc(38% + 45px)',
            boxShadow: `0 10px 15px -3px ${brandColor}26, 0 4px 6px -2px ${brandColor}26`
          }}
        >
          <ImageBg data={data} className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        </SmartField>

        {/* Card de Texto (O "retângulo flutuante" centralizado) */}
        <div
          className="w-[90%] bg-white p-8 rounded-3xl flex flex-col justify-center text-center relative z-10"
          style={{
            boxShadow: `0 25px 50px -12px ${brandColor}26`,
            border: '3px solid rgb(229 229 229)'
          }}
        >
          <SmartField field="tag" {...sp} className="mb-2 shrink-0">
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="font-tag font-black text-[10px] uppercase tracking-widest outline-none"
              style={{ fontFamily: titleFont, color: brandColor }}
            >
              {data.tag || 'TAG'}
            </span>
          </SmartField>

          <SmartField field="titulo" {...sp} className="mb-3 shrink-0 w-full">
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black text-[#1a1a1a] leading-tight outline-none break-words"
              style={{ fontSize: `${24 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>

          <SmartField field="texto_apoio" {...sp} className="min-h-0">
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text text-zinc-600 leading-snug outline-none line-clamp-3 overflow-hidden"
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
// VARIANTE 26 — Float Color Circle
// ═══════════════════════════════════════════════════════════
export function SplitVariant26(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#FAFAFA]">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} brandAvatar={brandAvatar} counterBg="#EDEDED" handleColor="#1A1A1A" counterColor="#1A1A1A"
        hideDot={true}
      />
      <div className="absolute inset-0 p-6 flex flex-col">
        <div className="absolute top-10 right-[-40px] w-64 h-64 rounded-full opacity-[0.06] z-0 pointer-events-none" style={{ fontFamily: textFont, backgroundColor: brandColor }} />

        <div className="flex-1 flex flex-col z-10 min-h-0 pt-[42px] w-[85%] pr-4 relative">
          <div className="flex items-center gap-3 mb-3 shrink-0">
            <SmartField field="tag" {...sp}>
              <span
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
                className="border-2 font-tag font-bold px-2 py-0.5 rounded text-[11px] shrink-0 uppercase tracking-widest outline-none"
                style={{ fontFamily: tagFont, color: brandColor, borderColor: brandColor }}
              >
                {data.tag || 'dica'}
              </span>
            </SmartField>
          </div>

          <SmartField field="titulo" {...sp} className="mb-4 w-full">
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black text-[#1a1a1a] leading-[1.1] outline-none break-words"
              style={{ fontSize: `${28 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>

          <SmartField field="texto_apoio" {...sp} className="min-h-0">
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text text-zinc-600 leading-relaxed font-medium outline-none"
              style={{ fontSize: `${18 * sText}px` }}
            >
              {data.texto_apoio}
            </p>
          </SmartField>
        </div>

        <SmartField field="imagem" {...sp}
          className="w-[95%] bg-zinc-300 mt-auto ml-auto relative z-10 rounded-2xl overflow-hidden border-4 border-white"
          style={{ height: 'calc(45% + 20px)', boxShadow: `0 25px 50px -12px ${brandColor}40` }}
        >
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 27 — Grid Mirror 4-Way
// Grid 2×2 com 4 imagens independentes (slots 1–4)
// ═══════════════════════════════════════════════════════════
export function SplitVariant27(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  // Cada quadrante usa seu próprio slot, com fallback para imageUrl
  const slots = [
    { imageUrl: data.imageUrl, imagePosition: data.imagePosition, imageScale: data.imageScale },
    { imageUrl: data.imageUrl2 || data.imageUrl, imagePosition: data.imagePosition2 ?? data.imagePosition, imageScale: data.imageScale2 ?? data.imageScale },
    { imageUrl: data.imageUrl3 || data.imageUrl, imagePosition: data.imagePosition3 ?? data.imagePosition, imageScale: data.imageScale3 ?? data.imageScale },
    { imageUrl: data.imageUrl4 || data.imageUrl, imagePosition: data.imagePosition4 ?? data.imagePosition, imageScale: data.imageScale4 ?? data.imageScale },
  ];
  const transforms = [{}, {}, {}, {}];

  return (
    <div className="w-full h-full relative overflow-hidden bg-zinc-100">
      <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-1 z-0">
        {slots.map((slot, i) => (
          <div key={i} className="bg-zinc-800 overflow-hidden relative">
            <ImageBg
              imageUrl={slot.imageUrl}
              imagePosition={slot.imagePosition}
              imageScale={slot.imageScale}
              className="absolute inset-0"
              style={transforms[i]}
            />
          </div>
        ))}
      </div>

      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} brandAvatar={brandAvatar}
        hideDot={true}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-[24px] py-2 shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-white/20" style={{ fontFamily: titleFont, backgroundColor: brandColor, paddingLeft: '14px', paddingRight: '14px' }}>
        <SmartField field="titulo" {...sp}>
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black text-white leading-none tracking-tighter text-center uppercase outline-none break-words"
            style={{ fontSize: `${32 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 px-6 py-2 rounded-full shadow-lg z-10 border border-zinc-200">
        <SmartField field="texto_apoio" {...sp}>
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-zinc-800 font-bold text-[10px] tracking-widest uppercase outline-none"
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 28 — Split Side Mirror
// 2 colunas com 2 imagens independentes (slots 1 e 2)
// ═══════════════════════════════════════════════════════════
export function SplitVariant28(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  const img2 = data.imageUrl2 || data.imageUrl;
  const pos2 = data.imagePosition2 ?? data.imagePosition;
  const scale2 = data.imageScale2 ?? data.imageScale;

  return (
    <div className="w-full h-full flex relative overflow-hidden bg-zinc-900">
      <div className="w-1/2 h-full relative overflow-hidden">
        <ImageBg data={data} className="absolute inset-0" />
      </div>
      <div className="w-1/2 h-full relative overflow-hidden border-l border-white/10">
        <ImageBg
          imageUrl={img2}
          imagePosition={pos2}
          imageScale={scale2}
          className="absolute inset-0"
        />
      </div>

      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} brandAvatar={brandAvatar}
        hideDot={true}
      />

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[82%] bg-white/95 pt-1 pb-5 px-5 rounded-2xl flex flex-col items-center text-center z-10 border border-white/50"
        style={{ boxShadow: `0 25px 50px -12px ${brandColor}26` }}
      >
        <SmartField field="tag" {...sp} className="mb-2">
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            className="font-tag font-bold text-[10px] uppercase tracking-widest outline-none"
            style={{ fontFamily: titleFont, color: brandColor }}
          >
            {data.tag || 'EXCLUSIVE'}
          </span>
        </SmartField>
        <SmartField field="titulo" {...sp} className="mb-2 w-full">
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black text-[#1a1a1a] leading-tight outline-none break-words"
            style={{ fontSize: `${24 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>
        <SmartField field="texto_apoio" {...sp} className="w-full">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-zinc-600 leading-snug font-medium outline-none"
            style={{ fontSize: `${13 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 29 — Horizontal Mirror Strip
// 2 linhas com 2 imagens independentes (slots 1 e 2)
// ═══════════════════════════════════════════════════════════
export function SplitVariant29(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  const img2 = data.imageUrl2 || data.imageUrl;
  const pos2 = data.imagePosition2 ?? data.imagePosition;
  const scale2 = data.imageScale2 ?? data.imageScale;

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden bg-zinc-900">
      <div className="w-full h-1/2 relative overflow-hidden">
        <ImageBg data={data} className="absolute inset-0" />
      </div>
      <div className="w-full h-1/2 relative overflow-hidden border-t border-white/10">
        <ImageBg
          imageUrl={img2}
          imagePosition={pos2}
          imageScale={scale2}
          className="absolute inset-0"
        />
      </div>

      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 py-[14px] px-6 z-10 flex flex-col items-center text-center border-y-[6px] border-white" style={{ fontFamily: textFont, backgroundColor: brandColor, boxShadow: `0 25px 50px -12px ${brandColor}26` }}>
        <SmartField field="titulo" {...sp} className="w-full">
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black text-white leading-none tracking-tight uppercase outline-none break-words"
            style={{ fontSize: `${32 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>
      </div>

      <div className="absolute bottom-6 right-6 max-w-[55%] bg-white/95 px-4 py-3 rounded-xl z-20 border border-white/50" style={{ boxShadow: `0 10px 25px -5px ${brandColor}26` }}>
        <SmartField field="texto_apoio" {...sp}>
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-zinc-800 font-bold text-[11px] leading-snug outline-none"
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>

      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} brandAvatar={brandAvatar}
        hideDot={true}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 30 — Vertical Mirror Pill
// 2 colunas com 2 imagens independentes (slots 1 e 2)
// ═══════════════════════════════════════════════════════════
export function SplitVariant30(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  const img2 = data.imageUrl2 || data.imageUrl;
  const pos2 = data.imagePosition2 ?? data.imagePosition;
  const scale2 = data.imageScale2 ?? data.imageScale;

  return (
    <div className="w-full h-full relative overflow-hidden bg-zinc-100">
      <div className="grid grid-cols-2 w-full h-full gap-1 z-0">
        <div className="bg-zinc-800 overflow-hidden relative">
          <ImageBg data={data} className="absolute inset-0" />
        </div>
        <div className="bg-zinc-800 overflow-hidden relative">
          <ImageBg
            imageUrl={img2}
            imagePosition={pos2}
            imageScale={scale2}
            className="absolute inset-0"
          />
        </div>
      </div>

      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} brandAvatar={brandAvatar}
        hideDot={true}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-[24px] border-2 border-white/20" style={{ fontFamily: textFont, backgroundColor: brandColor, paddingLeft: '20px', paddingRight: '20px', paddingTop: '10px', paddingBottom: '10px', boxShadow: `0 25px 50px -12px ${brandColor}26` }}>
        <SmartField field="titulo" {...sp}>
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black text-white leading-none tracking-tighter text-center uppercase outline-none break-words"
            style={{ fontSize: `${32 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 px-6 py-2 rounded-full z-10 border border-zinc-200" style={{ boxShadow: `0 10px 15px -3px ${brandColor}26, 0 4px 6px -2px ${brandColor}26` }}>
        <SmartField field="texto_apoio" {...sp}>
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-[#1a1a1a] font-bold text-[10px] tracking-widest uppercase outline-none"
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 31 — Horizontal Mirror Pill
// 2 linhas com 2 imagens independentes (slots 1 e 2)
// ═══════════════════════════════════════════════════════════
export function SplitVariant31(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  const img2 = data.imageUrl2 || data.imageUrl;
  const pos2 = data.imagePosition2 ?? data.imagePosition;
  const scale2 = data.imageScale2 ?? data.imageScale;

  return (
    <div className="w-full h-full relative overflow-hidden bg-zinc-100">
      <div className="grid grid-rows-2 w-full h-full gap-1 z-0">
        <div className="bg-zinc-800 overflow-hidden relative">
          <ImageBg data={data} className="absolute inset-0" />
        </div>
        <div className="bg-zinc-800 overflow-hidden relative">
          <ImageBg
            imageUrl={img2}
            imagePosition={pos2}
            imageScale={scale2}
            className="absolute inset-0"
          />
        </div>
      </div>

      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} brandAvatar={brandAvatar}
        hideDot={true}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-[24px] border-2 border-white/20" style={{ fontFamily: textFont, backgroundColor: brandColor, paddingLeft: '20px', paddingRight: '20px', paddingTop: '11px', paddingBottom: '11px', boxShadow: `0 25px 50px -12px ${brandColor}26` }}>
        <SmartField field="titulo" {...sp}>
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black text-white leading-none tracking-tighter text-center uppercase outline-none break-words"
            style={{ fontSize: `${32 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 px-6 py-2 rounded-full z-10 border border-zinc-200" style={{ boxShadow: `0 10px 15px -3px ${brandColor}26, 0 4px 6px -2px ${brandColor}26` }}>
        <SmartField field="texto_apoio" {...sp}>
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-[#1a1a1a] font-bold text-[10px] tracking-widest uppercase outline-none"
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 32 — Brand Base Split
// Imagem superior 50% + base sólida da cor da marca 50%.
// ═══════════════════════════════════════════════════════════
export function SplitVariant32(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-black text-white relative">
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true}
      />
      <div className="w-full h-[50%] relative shrink-0 z-0">
        <ImageBg data={data} className="absolute inset-0" />
      </div>

      <div className="w-full h-2 bg-white z-20 relative -mt-[1px]" />

      <div className="w-full flex-1 p-8 flex flex-col justify-center relative z-10 -mt-[2px]" style={{ fontFamily: textFont, backgroundColor: brandColor, boxShadow: `0 -2px 0 ${brandColor}` }}>
        <div style={{ transform: 'translateY(-25px)', height: '180px' }} className="flex flex-col justify-start">
          <div className="mb-6 shrink-0">
            <SmartField field="badge_text" {...sp}>
              <span
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
                className="font-tag font-bold text-[10px] uppercase tracking-[0.2em] text-white border border-white/60 px-2.5 py-1 rounded-[8px] outline-none"
              >
                {data.badge_text || '13'}
              </span>
            </SmartField>
          </div>

          <SmartField field="detalhe" {...sp} className="mb-4 shrink-0">
            <div style={{ width: '3rem', height: '0.25rem', backgroundColor: 'rgba(255, 255, 255, 0.8)' }} />
          </SmartField>

          <div className="mb-4 shrink-0">
            <SmartField field="titulo" {...sp}>
              <h2
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
                className="font-title font-black leading-[0.9] tracking-tighter uppercase drop-shadow-md outline-none"
                style={{ fontSize: `${36 * sTitle}px` }}
              >
                {data.titulo}
              </h2>
            </SmartField>
          </div>
          <div className="flex-1">
            <SmartField field="texto_apoio" {...sp}>
              <p
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                className="font-text font-medium leading-relaxed text-white/90 outline-none"
                style={{ fontSize: `${23 * sText}px` }}
              >
                {data.texto_apoio}
              </p>
            </SmartField>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 33 — Side Brand Panel
// Imagem lateral 75% + painel lateral da cor da marca 25%.
// ═══════════════════════════════════════════════════════════
export function SplitVariant33(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex overflow-hidden bg-black text-white relative">
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true}
      />
      <div className="w-[75%] h-full relative z-0 flex flex-col p-6">
        <ImageBg data={data} className="absolute inset-0" />

        <div className="mt-auto relative z-10 p-5 rounded-2xl border border-white/10" style={{ fontFamily: titleFont, backgroundColor: brandColor }}>
          <div className="mb-2 shrink-0">
            <SmartField field="titulo" {...sp}>
              <h2
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
                className="font-title font-black leading-tight uppercase outline-none text-white"
                style={{ fontSize: `${22 * sTitle}px` }}
              >
                {data.titulo}
              </h2>
            </SmartField>
          </div>
          <div>
            <SmartField field="texto_apoio" {...sp}>
              <p
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                className="font-text font-medium leading-snug text-white/90 outline-none"
                style={{ fontSize: `${13 * sText}px` }}
              >
                {data.texto_apoio}
              </p>
            </SmartField>
          </div>
        </div>
      </div>
      <div className="w-[25%] h-full flex flex-col justify-center items-center z-10" style={{ fontFamily: textFont, backgroundColor: brandColor, borderLeft: '3px solid rgb(93 93 93 / 30%)' }}>
        <div className="transform rotate-90 whitespace-nowrap">
          <SmartField field="badge_text" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="font-tag font-black uppercase tracking-widest text-[28px] text-white outline-none"
            >
              {data.badge_text || '14'}
            </h2>
          </SmartField>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 34 — Brand Window
// Imagem emoldurada em janela central sobre fundo de marca.
// ═══════════════════════════════════════════════════════════
export function SplitVariant34(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col p-8 overflow-hidden relative" style={{ fontFamily: tagFont, backgroundColor: brandColor, color: 'white' }}>
      <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" />
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true}
      />

      <div className="w-full mt-4 shrink-0 relative z-10 text-center">
        <SmartField field="titulo" {...sp}>
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black leading-none tracking-tighter uppercase drop-shadow-lg outline-none"
            style={{ fontSize: `${38 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>
      </div>

      <div className="w-[90%] mx-auto aspect-[4/3] rounded-[32px] overflow-hidden my-6 border-[6px] border-white relative z-20 shrink-0 bg-zinc-900">
        <SmartField field="imagem" {...sp} className="w-full h-full">
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>
      </div>

      <div className="flex-1 rounded-3xl p-5 border border-white/20 relative z-10 overflow-hidden">
        {/* Camada de Blur isolada para evitar bug no download PNG */}
        <div className="absolute inset-0 backdrop-blur-sm -z-10" style={{ backgroundColor: 'rgb(255 255 255 / 10%)' }} />
        <div className="w-full h-full text-center flex items-center justify-center">
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text font-bold leading-relaxed text-white/95 outline-none"
              style={{ fontSize: `${14 * sText}px` }}
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
// VARIANTE 35 — Brand Base Solid
// Variante de contraste puro com base sólida da cor da marca.
// ═══════════════════════════════════════════════════════════
export function SplitVariant35(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-black text-white relative">
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true}
      />
      <div className="h-[50%] w-full relative shrink-0 z-0">
        <ImageBg data={data} className="absolute inset-0 opacity-100" />
      </div>

      <div className="w-full h-0 border-t-[8px] border-white z-20" />

      <div className="flex-1 w-full px-8 pb-8 pt-[17px] flex flex-col justify-center relative z-10" style={{ fontFamily: textFont, backgroundColor: brandColor }}>
        <div className="mb-6 shrink-0">
          <SmartField field="badge_text" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="font-tag font-bold text-[10px] uppercase tracking-widest text-white border border-white/60 px-2.5 py-1 rounded-[8px] outline-none"
            >
              {data.badge_text || '16'}
            </span>
          </SmartField>
        </div>
        <div className="mb-4 shrink-0">
          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black leading-[0.95] tracking-tighter uppercase drop-shadow-md text-white outline-none"
              style={{ fontSize: `${32 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>
        <div className="flex-1">
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text font-medium leading-relaxed text-white/90 outline-none"
              style={{ fontSize: `${15 * sText}px` }}
            >
              {data.texto_apoio}
            </p>
          </SmartField>
          <SmartField field="decoracao" {...sp}>
            <div style={{ width: '3rem', height: '0.25rem', backgroundColor: 'rgba(255, 255, 255, 0.2)' }} className="mt-4 shrink-0" />
          </SmartField>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 36 — Image In Brand
// Imagem emoldurada por cor sólida com texto na base.
// ═══════════════════════════════════════════════════════════
export function SplitVariant36(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-white text-black relative">
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true}
      />
      <div className="h-[60%] w-full p-6 flex flex-col shrink-0 relative z-10 rounded-b-[40px]" style={{ fontFamily: titleFont, backgroundColor: brandColor }}>
        <div className="mx-auto bg-zinc-900 rounded-[28px] overflow-hidden shadow-inner border-[6px] border-white relative mt-2" style={{ width: 'calc(100% - 10px)', height: 'calc(100% - 20px)', transform: 'translateY(25px)' }}>
          <SmartField field="imagem" {...sp} className="w-full h-full">
            <ImageBg data={data} className="absolute inset-0" />
          </SmartField>
        </div>
      </div>
      <div className="flex-1 w-full p-8 flex flex-col justify-start pt-[95px] text-center relative z-0" style={{ marginTop: '-55px' }}>
        <div style={{ width: '4rem', height: '0.1875rem', backgroundColor: brandColor }} className="mx-auto mb-4 shrink-0" />
        <div className="mb-3 shrink-0">
          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black leading-tight tracking-tighter uppercase outline-none"
              style={{ color: brandColor, fontSize: `${28 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>
        <div>
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text font-medium leading-relaxed text-zinc-600 outline-none"
              style={{ fontSize: `${14 * sText}px` }}
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
// VARIANTE 37 — HARD SIDE SPLIT
// Bloco de cor esquerdo, sem gradiente, impacto fotográfico.
// ═══════════════════════════════════════════════════════════
export function SplitVariant37(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex relative overflow-hidden bg-black text-white">
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true}
      />
      <div className="w-[40%] h-full p-6 flex flex-col justify-center relative z-10" style={{ fontFamily: textFont, backgroundColor: brandColor, borderRight: '3px solid rgb(93 93 93 / 30%)', boxShadow: '10px 0 30px rgba(0,0,0,0.5)' }}>
        <div className="mb-4 shrink-0">
          <SmartField field="badge_text" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="font-tag font-bold text-[10px] uppercase tracking-widest text-white/70 outline-none"
            >
              {data.badge_text || '19'}
            </span>
          </SmartField>
        </div>
        <div className="w-full mb-4 shrink-0">
          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black leading-[0.9] tracking-tighter uppercase drop-shadow-md text-white outline-none"
              style={{ fontSize: `${32 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>
        <div style={{ width: '3rem', height: '0.25rem', backgroundColor: 'rgba(255, 255, 255, 0.8)' }} className="mb-4 shrink-0" />
      </div>
      <SmartField field="imagem" {...sp} className="w-[60%] h-full relative z-0 overflow-hidden">
        <ImageBg data={data} className="absolute inset-0 opacity-90" />
        <div
          className="absolute bottom-6 right-6 bg-white/95 p-4 rounded-xl border border-white/50 max-w-[85%]"
          style={{ boxShadow: `0 25px 50px -12px ${brandColor}40` }}
        >
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text font-medium leading-snug text-[#1a1a1a] outline-none"
              style={{ fontSize: `${13 * sText}px` }}
            >
              {data.texto_apoio}
            </p>
          </SmartField>
        </div>
      </SmartField>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 38 — SHARP TOP IMAGE
// Corte horizontal perfeito entre imagem e fundo limpo.
// ═══════════════════════════════════════════════════════════
export function SplitVariant38(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden text-white relative" style={{ fontFamily: titleFont, backgroundColor: brandColor }}>
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true}
      />
      <SmartField field="imagem" {...sp} className="w-full relative shrink-0 z-0 border-b-[8px] border-white overflow-hidden" style={{ height: 'calc(40% + 15px)' }}>
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
      <div className="flex-1 w-full p-8 flex flex-col justify-center relative z-10" style={{ marginTop: '-25px' }}>
        <div className="w-full mb-4 shrink-0 mt-6">
          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black leading-[0.95] tracking-tighter uppercase text-white outline-none"
              style={{ fontSize: `${38 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>
        <div className="flex-1">
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text font-medium leading-relaxed text-white outline-none"
              style={{ fontSize: `${15 * sText}px` }}
            >
              {data.texto_apoio}
            </p>
          </SmartField>
          <SmartField field="detalhe" {...sp} className="mt-4 shrink-0">
            <div style={{ width: '4rem', height: '0.25rem', backgroundColor: 'rgba(255, 255, 255, 0.8)' }} />
          </SmartField>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 39 — CLEAN EDGE BOX
// Caixa branca rigorosa com imagem perfeitamente enquadrada.
// ═══════════════════════════════════════════════════════════
export function SplitVariant39(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col p-6 overflow-hidden relative bg-white">
      <SlideHeader {...props} index={index + 1} total={slideCount} hideDot handleColor="#1A1A1A" counterColor="#1A1A1A" counterBg="#EDEDED" />

      <div className="flex flex-1 mt-4 gap-4">
        <SmartField field="imagem" {...sp}
          className="w-[47%] h-[80%] rounded-[24px] overflow-hidden relative shrink-0 z-10 mt-10"
          style={{
            boxShadow: `0 10px 15px -3px ${brandColor}33, 0 4px 6px -2px ${brandColor}33`,
            border: '3px solid rgba(255, 255, 255, 0.3)'
          }}
        >
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>
        <div className="w-[53%] h-full flex flex-col justify-center pr-2 pl-[10px]">
          <div className="mb-2 shrink-0">
            <SmartField field="badge_text" {...sp}>
              <span
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
                className="font-tag font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded text-white inline-block outline-none"
                style={{ fontFamily: tagFont, backgroundColor: brandColor }}
              >
                {data.badge_text || '21'}
              </span>
            </SmartField>
          </div>
          <div className="w-full mb-4 shrink-0">
            <SmartField field="titulo" {...sp}>
              <h2
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
                className="font-title font-black leading-[0.95] tracking-tighter uppercase text-[#1a1a1a] outline-none"
                style={{ fontSize: `${28 * sTitle}px` }}
              >
                {data.titulo}
              </h2>
            </SmartField>
          </div>
          <div>
            <SmartField field="texto_apoio" {...sp}>
              <p
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                className="font-text font-medium leading-snug text-zinc-600 outline-none"
                style={{ fontSize: `${14 * sText}px` }}
              >
                {data.texto_apoio}
              </p>
            </SmartField>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 40 — SHARP BRAND FOOTER
// Foco superior com base sólida da marca sustentando a narrativa.
// ═══════════════════════════════════════════════════════════
export function SplitVariant40(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-white text-black relative">
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true}
      />
      <SmartField field="imagem" {...sp} className="w-full h-[60%] relative shrink-0 overflow-hidden">
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
      <div className="flex-1 w-full p-8 flex flex-col justify-center relative z-10 border-t-[8px] border-white" style={{ fontFamily: textFont, backgroundColor: brandColor }}>
        <div style={{ width: '3rem', height: '0.25rem', backgroundColor: 'rgba(255, 255, 255, 0.8)' }} className="mb-4 shrink-0" />
        <div className="mb-3 shrink-0">
          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black leading-none tracking-tighter uppercase text-white outline-none"
              style={{ fontSize: `${38 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>
        <div className="flex-1">
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text font-medium leading-relaxed text-white/90 outline-none"
              style={{ fontSize: `${15 * sText}px` }}
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
// VARIANTE 41 — BRAND SIDEBAR FRAME
// Lateral sólida de cor pura que emoldura o produto.
// ═══════════════════════════════════════════════════════════
export function SplitVariant41(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex overflow-hidden bg-white relative">
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true}
        handleColor="#1A1A1A"
        counterColor="#1A1A1A"
        counterBg="#EDEDED"
      />
      <div className="w-[25%] h-full flex flex-col justify-center items-center p-6 shrink-0 relative z-10" style={{ fontFamily: textFont, backgroundColor: brandColor, borderRight: '3px solid rgb(93 93 93 / 30%)' }}>
        <div className="transform -rotate-90 origin-center whitespace-nowrap">
          <SmartField field="badge_text" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="font-tag font-black text-4xl tracking-tighter text-white/30 uppercase outline-none"
            >
              {data.badge_text || '23'}
            </span>
          </SmartField>
        </div>
      </div>
      <div className="flex-1 h-full flex flex-col p-8 relative">
        <SmartField field="imagem" {...sp}
          className="w-full h-[45%] rounded-[25px] overflow-hidden mb-6 mt-12 relative shrink-0 bg-zinc-200"
          style={{
            boxShadow: `0 10px 15px -3px ${brandColor}26, 0 4px 6px -2px ${brandColor}26`,
            border: '2px solid rgb(255 255 255 / 80%)'
          }}
        >
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>
        <div className="mb-4 shrink-0">
          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black leading-tight tracking-tighter uppercase text-[#1a1a1a] outline-none"
              style={{ fontSize: `${30 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>
        <div className="flex-1">
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="text-zinc-600 font-text font-medium leading-relaxed outline-none"
              style={{ fontSize: `${14 * sText}px` }}
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
// VARIANTE 42 — CROSS SECTION BRAND
// Intersecção entre imagem e identidade geométrica.
// ═══════════════════════════════════════════════════════════
export function SplitVariant42(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-white relative">
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true}
      />
      <SmartField field="imagem" {...sp} className="w-full h-[55%] relative shrink-0 overflow-hidden" style={{ borderBottom: `8px solid ${brandColor}` }}>
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
      <div className="flex-1 w-full p-10 flex flex-col justify-start pt-[75px] relative -mt-[47px] bg-white rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
        <div className="">
          <div className="flex items-center gap-3 mb-3 shrink-0">
            <SmartField field="tag" {...sp}>
              <span
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
                className="border-2 font-tag font-bold px-2 py-0.5 rounded text-[11px] shrink-0 uppercase tracking-widest outline-none"
                style={{ fontFamily: tagFont, color: brandColor, borderColor: brandColor }}
              >
                {data.tag || 'DICA'}
              </span>
            </SmartField>
          </div>
          <div className="mb-4 shrink-0">
            <SmartField field="titulo" {...sp}>
              <h2
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
                className="font-title font-black leading-none tracking-tighter uppercase text-[#1a1a1a] outline-none"
                style={{ fontSize: `${36 * sTitle}px` }}
              >
                {data.titulo}
              </h2>
            </SmartField>
          </div>
          <div>
            <SmartField field="texto_apoio" {...sp}>
              <p
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                className="text-zinc-600 font-text font-medium leading-relaxed outline-none"
                style={{ fontSize: `${16 * sText}px` }}
              >
                {data.texto_apoio}
              </p>
            </SmartField>
          </div>
        </div>
        <div className="absolute bottom-10 right-10 w-12 h-1" style={{ fontFamily: titleFont, backgroundColor: brandColor }}></div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 43 — MASSIVE BRAND FRAME
// Moldura robusta com produto centralizado.
// ═══════════════════════════════════════════════════════════
export function SplitVariant43(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden p-8 relative" style={{ backgroundColor: brandColor }}>
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true}
      />
      <div className="flex-1 flex flex-col mt-6">
        <div className="w-full h-[50%] bg-white rounded-[25px] relative" style={{ transform: 'translateY(15px)', border: '3px solid rgb(203 203 203 / 30%)' }}>
          <SmartField field="imagem" {...sp} className="w-full h-full rounded-[25px] overflow-hidden relative">
            <ImageBg data={data} className="absolute inset-0" />
          </SmartField>
        </div>
        <div className="flex-1 flex flex-col justify-center py-8">
          <div className="mb-4 shrink-0">
            <SmartField field="tag" {...sp}>
              <span
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
                className="font-tag font-bold text-[10px] uppercase tracking-[0.2em] text-white border border-white px-2.5 py-1 rounded-[8px] outline-none"
              >
                {data.tag || 'DICA'}
              </span>
            </SmartField>
          </div>
          <div className="mb-4">
            <SmartField field="titulo" {...sp}>
              <h2
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
                className="font-title font-black leading-[0.85] tracking-tighter uppercase text-white outline-none"
                style={{ fontSize: `${44 * sTitle}px` }}
              >
                {data.titulo}
              </h2>
            </SmartField>
          </div>
          <div>
            <SmartField field="texto_apoio" {...sp}>
              <p
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                className="font-text font-bold leading-tight uppercase tracking-widest outline-none"
                style={{ fontSize: `${14 * sText}px`, color: '#ededed' }}
              >
                {data.texto_apoio}
              </p>
            </SmartField>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 44 — FULL BLEED BASE
// Imagem no topo com base de texto sólida.
// ═══════════════════════════════════════════════════════════
export function SplitVariant44(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-white text-black relative">
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true}
      />
      <SmartField field="imagem" {...sp} className="w-full h-[55%] relative shrink-0 overflow-hidden">
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
      <div className="flex-1 w-full p-8 flex flex-col justify-center relative z-10 border-t-[8px] bg-zinc-50" style={{ fontFamily: textFont, borderColor: brandColor }}>
        <div className="relative -top-[45px]">
          <div className="mb-4 shrink-0">
            <div className="mb-2 shrink-0">
              <SmartField field="tag" {...sp}>
                <span
                  contentEditable suppressContentEditableWarning
                  onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
                  className="font-tag font-bold text-[11px] uppercase tracking-widest outline-none"
                  style={{ color: brandColor }}
                >
                  {data.tag || 'DICA'}
                </span>
              </SmartField>
            </div>
            <SmartField field="titulo" {...sp}>
              <h2
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
                className="font-title font-black leading-none tracking-tighter uppercase text-[#1a1a1a] outline-none"
                style={{ fontSize: `${38 * sTitle}px` }}
              >
                {data.titulo}
              </h2>
            </SmartField>
          </div>
          <div className="flex-1">
            <SmartField field="texto_apoio" {...sp}>
              <p
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                className="font-text font-bold leading-relaxed text-zinc-600 outline-none"
                style={{ fontSize: `${15 * sText}px` }}
              >
                {data.texto_apoio}
              </p>
            </SmartField>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 45 — FRAMED HERO
// Imagem emoldurada no centro superior.
// ═══════════════════════════════════════════════════════════
export function SplitVariant45(props) {
  const { data, index, slideCount, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden p-8 bg-zinc-100 relative">
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true}
        handleColor="#1A1A1A"
        counterColor="#1A1A1A"
        counterBg="#EDEDED"
      />
      <SmartField field="imagem" {...sp} className="w-full h-[45%] bg-white rounded-[25px] overflow-hidden mt-[39px] relative" style={{ border: '4px solid rgba(255, 255, 255, 0.3)' }}>
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
      <div className="flex-1 flex flex-col justify-center py-8">
        <div className="relative -top-[10px]">
          <div className="flex items-center gap-3 mb-3 shrink-0 relative -top-[3px]">
            <SmartField field="tag" {...sp}>
              <span
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
                className="border-2 font-tag font-bold px-2 py-0.5 rounded text-[11px] shrink-0 uppercase tracking-widest outline-none"
                style={{ fontFamily: tagFont, color: brandColor, borderColor: brandColor }}
              >
                {data.tag || 'DICA'}
              </span>
            </SmartField>
          </div>
          <div className="mb-4">
            <SmartField field="titulo" {...sp}>
              <h2
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
                className="font-title font-black leading-[0.9] tracking-tighter uppercase text-[#1a1a1a] outline-none"
                style={{ fontSize: `${36 * sTitle}px` }}
              >
                {data.titulo}
              </h2>
            </SmartField>
          </div>
          <div>
            <SmartField field="texto_apoio" {...sp}>
              <p
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                className="font-text font-medium leading-relaxed text-zinc-600 outline-none"
                style={{ fontSize: `${16 * sText}px` }}
              >
                {data.texto_apoio}
              </p>
            </SmartField>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 46 — CARD ASCEND
// Texto sobreposto à imagem com profundidade.
// ═══════════════════════════════════════════════════════════
export function SplitVariant46(props) {
  const { data, index, slideCount, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-black relative">
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true}
      />

      <div className="absolute inset-0 z-0">
        <SmartField field="imagem" {...sp} className="w-full h-full relative">
          {data.imageUrl ? (
            <ImageBg data={data} className="absolute inset-0" />
          ) : (
            <div className="w-full h-full bg-black flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-zinc-800" />
            </div>
          )}
        </SmartField>
      </div>

      <div className="flex-1 pointer-events-none" />

      <div className="relative z-20 flex flex-col px-8 py-[22px] justify-center mx-[30px] mb-8 rounded-[25px]" style={{ fontFamily: textFont, backgroundColor: brandColor, border: '2px solid rgb(107 107 107 / 50%)' }}>
        <div className="mb-3">
          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black leading-[0.9] tracking-tighter uppercase text-white outline-none"
              style={{ fontSize: `${32 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>
        <div>
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text font-medium leading-snug text-white/90 outline-none"
              style={{ fontSize: `${15 * sText}px` }}
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
// VARIANTE 47 — AUTHOR TOP IMAGE
// Layout editorial com avatar e handle do autor.
// ═══════════════════════════════════════════════════════════
export function SplitVariant47(props) {
  const { data, index, slideCount, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full p-6 flex flex-col overflow-hidden bg-white relative">
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true}
        handleColor="#1A1A1A"
        counterColor="#1A1A1A"
        counterBg="#EDEDED"
      />
      <SmartField field="imagem" {...sp} className="w-full h-[50%] rounded-[30px] overflow-hidden mb-6 shrink-0 relative mt-[30px]" style={{ boxShadow: `0 20px 40px ${brandColor}33`, border: '4px solid rgba(255, 255, 255, 0.3)' }}>
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
      <div className="flex-1 flex flex-col min-h-0 px-2">
        <div className="shrink-0 mb-1">
          <div className="flex items-center gap-3 mb-3 shrink-0">
            <SmartField field="tag" {...sp}>
              <span
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
                className="border-2 font-tag font-bold px-2 py-0.5 rounded text-[11px] shrink-0 uppercase tracking-widest outline-none"
                style={{ fontFamily: tagFont, color: brandColor, borderColor: brandColor }}
              >
                {data.tag || 'DICA'}
              </span>
            </SmartField>
          </div>
          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black text-[#1a1a1a] leading-tight tracking-tight outline-none"
              style={{ fontSize: `${28 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>
        <div className="flex-1">
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text text-zinc-600 leading-relaxed font-medium outline-none"
              style={{ fontSize: `${15 * sText}px` }}
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
// VARIANTE 48 — PROFILE COVER TOP
// Imagem de topo com avatar flutuante e container de texto.
// ═══════════════════════════════════════════════════════════
export function SplitVariant48(props) {
  const { data, index, slideCount, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-white relative">
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true}
      />
      <SmartField field="imagem" {...sp} className="w-full h-[50%] shrink-0 relative z-0">
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
      <div className="flex-1 relative z-40 flex flex-col p-8 pt-10 mt-[-20px] bg-white rounded-t-[30px] shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
        <div className="absolute -top-8 left-8 w-16 h-16 rounded-full border-4 border-white bg-zinc-200 overflow-hidden shrink-0 z-50" style={{ boxShadow: `0 10px 20px ${brandColor}26` }}>
          {brandAvatar ? (
            <img src={brandAvatar} className="w-full h-full object-cover" alt="Avatar" />
          ) : (
            <div className="w-full h-full bg-zinc-400" />
          )}
        </div>
        <div className="relative top-[10px]">
          <div className="mb-3">
            <SmartField field="titulo" {...sp}>
              <h2
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
                className="font-title font-black text-[#1a1a1a] leading-[0.9] tracking-tight outline-none"
                style={{ fontSize: `${32 * sTitle}px` }}
              >
                {data.titulo}
              </h2>
            </SmartField>
          </div>
          <div className="flex-1">
            <SmartField field="texto_apoio" {...sp}>
              <p
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                className="font-text text-zinc-600 leading-snug font-medium outline-none"
                style={{ fontSize: `${15 * sText}px` }}
              >
                {data.texto_apoio}
              </p>
            </SmartField>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 49 — HERO SHOT PROFILE
// Imagem de topo com overlay e base na cor da marca com avatar.
// ═══════════════════════════════════════════════════════════
export function SplitVariant49(props) {
  const { data, index, slideCount, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, brandColor, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden relative">
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true}
      />
      <SmartField field="imagem" {...sp} className="w-full h-[50%] shrink-0 relative overflow-hidden">
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
      <div className="flex-1 flex flex-col p-8 justify-start pt-[40px] relative border-t-[8px] border-white" style={{ fontFamily: textFont, backgroundColor: brandColor }}>
        <div className="">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shrink-0 shadow-lg bg-zinc-300">
              {brandAvatar ? (
                <img src={brandAvatar} className="w-full h-full object-cover" alt="Avatar" />
              ) : (
                <img src="" className="w-full h-full object-cover" alt="Avatar" />
              )}
            </div>
            <div>
              <SmartField field="badge_text" {...sp}>
                <span
                  contentEditable suppressContentEditableWarning
                  onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
                  className="font-tag font-bold text-xs text-white uppercase tracking-wider outline-none"
                >
                  {data.badge_text || 'CHEF'}
                </span>
              </SmartField>
            </div>
          </div>
          <div className="mb-2">
            <SmartField field="titulo" {...sp}>
              <h2
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
                className="font-title font-black text-white leading-none tracking-tight outline-none"
                style={{ fontSize: `${34 * sTitle}px` }}
              >
                {data.titulo}
              </h2>
            </SmartField>
          </div>
          <div className="flex-1">
            <SmartField field="texto_apoio" {...sp}>
              <p
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                className="font-text text-white/90 leading-snug font-medium outline-none"
                style={{ fontSize: `${15 * sText}px` }}
              >
                {data.texto_apoio}
              </p>
            </SmartField>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 50 — AUTHOR BADGE TOP
// Imagem de topo com badge de autor flutuante na transição.
// ═══════════════════════════════════════════════════════════
export function SplitVariant50(props) {
  const { data, index, slideCount, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-white relative">
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true}
      />
      <SmartField field="imagem" {...sp} className="w-full h-[55%] relative shrink-0 z-0 overflow-hidden">
        <ImageBg data={data} className="absolute inset-0" />
        <div className="absolute -bottom-6 right-8 p-2 rounded-2xl shadow-xl flex items-center gap-3 z-20" style={{ fontFamily: titleFont, backgroundColor: brandColor }}>
          <div className="w-10 h-10 rounded-xl bg-zinc-300 overflow-hidden border-2" style={{ borderColor: brandColor }}>
            {brandAvatar ? (
              <img src={brandAvatar} crossOrigin="anonymous" className="w-full h-full object-cover" alt="Avatar" />
            ) : (
              <img src="" crossOrigin="anonymous" className="w-full h-full object-cover" alt="Avatar" />
            )}
          </div>
          <div className="pr-3">
            <SmartField field="badge_text" {...sp}>
              <span
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
                className="font-tag font-black text-[10px] text-white uppercase tracking-wider outline-none"
              >
                {data.badge_text || 'TÉCNICA'}
              </span>
            </SmartField>
          </div>
        </div>
      </SmartField>
      <div className="flex-1 flex flex-col p-8 pt-10 min-h-0 z-10">
        <div className="mb-3 shrink-0">
          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black text-[#1a1a1a] leading-tight tracking-tight outline-none"
              style={{ fontSize: `${28 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>
        <div className="flex-1">
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text text-zinc-600 leading-relaxed font-medium outline-none"
              style={{ fontSize: `${15 * sText}px` }}
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
// VARIANTE 51 — AUTHOR MINIMAL SPLIT
// Imagem em card arredondado com avatar e tag minimalista.
// ═══════════════════════════════════════════════════════════
export function SplitVariant51(props) {
  const { data, index, slideCount, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-zinc-50 p-6 relative">
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true}
        handleColor="#1A1A1A"
        counterColor="#1A1A1A"
        counterBg="#EDEDED"
      />
      <SmartField field="imagem" {...sp} className="w-full shrink-0 relative bg-zinc-200 mt-[46px] rounded-[24px] overflow-hidden mb-5" style={{ height: 'calc(40% + 25px)', filter: `drop-shadow(0 4px 6px ${brandColor}33)`, border: '4px solid rgba(255, 255, 255, 0.3)' }}>
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
      <div className="flex items-center gap-3 mb-4 shrink-0 mt-[10px]">
        <div className="w-8 h-8 rounded-full bg-zinc-300 overflow-hidden border border-white shadow-sm">
          {brandAvatar ? (
            <img src={brandAvatar} crossOrigin="anonymous" className="w-full h-full object-cover" alt="Avatar" />
          ) : (
            <img src="" crossOrigin="anonymous" className="w-full h-full object-cover" alt="Avatar" />
          )}
        </div>
        <div>
          <SmartField field="badge_text" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="font-tag font-bold text-xs uppercase tracking-wide outline-none"
              style={{ fontFamily: titleFont, color: brandColor }}
            >
              {data.badge_text || 'BASTIDORES'}
            </span>
          </SmartField>
        </div>
      </div>
      <div className="flex-1 flex flex-col min-h-0">
        <div className="mb-2 shrink-0">
          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black text-[#1a1a1a] leading-tight outline-none"
              style={{ fontSize: `${26 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>
        <div className="flex-1">
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text text-zinc-600 leading-relaxed font-medium outline-none"
              style={{ fontSize: `${14 * sText}px` }}
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
// VARIANTE 52 — AUTHOR FLOATING
// Imagem flutuante centralizada com avatar e texto em destaque.
// ═══════════════════════════════════════════════════════════
export function SplitVariant52(props) {
  const { data, index, slideCount, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden items-center justify-center p-8 text-white relative" style={{ fontFamily: textFont, backgroundColor: brandColor || '#18181b' }}>
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true}
      />
      <SmartField field="imagem" {...sp} className="w-[95%] aspect-square max-h-[50%] rounded-[40px] bg-zinc-800 relative mb-6 mt-8 border-4 border-white shrink-0 overflow-hidden">
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
      <div className="flex flex-col items-center text-center flex-1 min-h-0">
        <div className="w-10 h-10 rounded-full border-2 border-zinc-700 bg-zinc-800 overflow-hidden mb-3 shrink-0">
          {brandAvatar ? (
            <img src={brandAvatar} crossOrigin="anonymous" className="w-full h-full object-cover" alt="Avatar" />
          ) : (
            <img src="" crossOrigin="anonymous" className="w-full h-full object-cover" alt="Avatar" />
          )}
        </div>
        <div className="mb-2 shrink-0">
          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black leading-tight outline-none"
              style={{ fontSize: `${24 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>
        <div className="flex-1 w-full">
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text leading-snug outline-none"
              style={{ fontSize: `${14 * sText}px`, color: '#ededed' }}
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
// VARIANTE 53 — SHARP BRAND SPLIT
// Divisão entre imagem e cor da marca com impacto visual.
// ═══════════════════════════════════════════════════════════
export function SplitVariant53(props) {
  const { data, index, slideCount, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-white relative">
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true}
      />
      <div className="w-full h-[50%] relative shrink-0 z-0 bg-zinc-200">
        <SmartField field="imagem" {...sp} className="w-full h-full relative z-0 overflow-hidden">
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>
        <div className="absolute bottom-0 left-0 w-full h-1 z-10" style={{ fontFamily: textFont, backgroundColor: brandColor }}></div>
      </div>
      <div className="flex-1 p-8 flex flex-col justify-start pt-[40px] relative text-zinc-900 z-10" style={{ borderTop: `8px solid ${brandColor}` }}>
        <div className="absolute top-0 left-8 -translate-y-1/2 px-4 py-[0.45rem] text-white font-bold text-[10px] tracking-widest uppercase rounded-[8px]" style={{ backgroundColor: brandColor }}>
          <SmartField field="badge_text" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="outline-none"
            >
              {data.badge_text || 'ESTRUTURA'}
            </span>
          </SmartField>
        </div>
        <div className="">
          <div className="mb-4">
            <SmartField field="titulo" {...sp}>
              <h2
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
                className="font-title font-black leading-none tracking-tighter uppercase outline-none whitespace-pre-line"
                style={{ fontSize: `${42 * sTitle}px` }}
              >
                {data.titulo}
              </h2>
            </SmartField>
          </div>
          <div>
            <SmartField field="texto_apoio" {...sp}>
              <p
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                className="font-text text-zinc-500 leading-relaxed font-bold outline-none"
                style={{ fontSize: `${16 * sText}px` }}
              >
                {data.texto_apoio}
              </p>
            </SmartField>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 54 — MODERNIST TOP
// Foco na imagem superior com base autoritária.
// ═══════════════════════════════════════════════════════════
export function SplitVariant54(props) {
  const { data, index, slideCount, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col p-8 bg-zinc-50 overflow-hidden relative">
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true}
        handleColor="#1A1A1A"
        counterColor="#1A1A1A"
        counterBg="#EDEDED"
      />
      <SmartField field="imagem" {...sp} className="w-full h-[45%] bg-zinc-200 rounded-2xl overflow-hidden relative mb-8 shadow-inner shrink-0" style={{ border: '4px solid rgba(255, 255, 255, 0.3)' }}>
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-4 mb-4 shrink-0" style={{ fontFamily: textFont }}>
          <div className="w-[2.5rem] h-1" style={{ backgroundColor: brandColor }}></div>
          <SmartField field="tag" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="font-tag font-black text-[10px] leading-none tracking-[0.3em] uppercase outline-none -translate-y-[2px] inline-block"
              style={{ fontFamily: tagFont, color: brandColor }}
            >
              {data.tag || 'DESIGN'}
            </span>
          </SmartField>
        </div>
        <div className="mb-4">
          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black text-zinc-900 leading-[0.9] tracking-tighter uppercase outline-none whitespace-pre-line"
              style={{ fontSize: `${38 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>
        <div className="flex-1">
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text text-zinc-600 leading-relaxed font-medium outline-none"
              style={{ fontSize: `${17 * sText}px` }}
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
// VARIANTE 55 — SOLID BRAND TOP
// Bloco sólido de cor da marca no topo + imagem na base.
// ═══════════════════════════════════════════════════════════
export function SplitVariant55(props) {
  const { data, index, slideCount, brandHandle, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-black text-white relative">
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true}
      />
      <div className="w-full flex-1 p-8 flex flex-col justify-center relative z-10" style={{ fontFamily: textFont, backgroundColor: brandColor }}>
        <div className="mb-2 shrink-0 mt-6 -translate-y-[10px]">
          <SmartField field="tag" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="font-bold text-[10px] uppercase tracking-[0.3em] text-white/70 outline-none border border-white/60 px-2.5 py-1 rounded-[8px]"
            >
              {data.tag || '16'}
            </span>
          </SmartField>
        </div>
        <div className="mb-4 shrink-0">
          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-black leading-[0.9] tracking-tighter uppercase outline-none"
              style={{ fontSize: `${38 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>
        <SmartField field="texto_apoio" {...sp}>
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-medium leading-relaxed text-white/90 outline-none"
            style={{ fontSize: `${15 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>
      <div className="w-full h-[8px] bg-white shrink-0 z-20" />
      <SmartField field="imagem" {...sp} className="w-full h-[50%] relative shrink-0 z-0 overflow-hidden">
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 56 — BRAND CARD OVERLAY
// Cartão brutalista sobreposto a imagem de fundo.
// ═══════════════════════════════════════════════════════════
export function SplitVariant56(props) {
  const { data, index, slideCount, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full relative flex flex-col">
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true}
      />
      <div className="absolute inset-0 z-0 overflow-hidden">
        <SmartField field="imagem" {...sp} className="w-full h-full">
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>
      </div>
      <div className="relative z-10 w-full bg-white rounded-br-[40px] p-8 pb-10 flex flex-col border-b-[8px] border-r-[8px]" style={{ borderColor: brandColor }}>
        <div style={{ width: '3rem', height: '0.25rem', backgroundColor: brandColor }} className="mt-4 mb-4 shrink-0" />
        <div className="mb-4 shrink-0">
          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-black leading-none tracking-tighter uppercase outline-none"
              style={{ color: brandColor, fontSize: `${34 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>
        <SmartField field="texto_apoio" {...sp}>
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-medium leading-snug text-[#1a1a1a] outline-none"
            style={{ fontSize: `${14 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>

      <div className="absolute bottom-6 right-6 z-10 flex flex-col items-end gap-2 text-white">
        <SmartField field="tag" {...sp}>
          <div className="relative px-3 py-1 rounded overflow-hidden">
            {/* Camada de Blur isolada para evitar bug no download PNG */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur -z-10" />
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="font-black text-[10px] tracking-widest uppercase outline-none relative z-10"
            >
              {data.tag || '17'}
            </span>
          </div>
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 57 — MASSIVE BRAND TOP
// Topo massivo de cor da marca (60%) + imagem na base.
// ═══════════════════════════════════════════════════════════
export function SplitVariant57(props) {
  const { data, index, slideCount, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-black text-white relative">
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true}
      />
      <div className="h-[60%] w-full p-8 flex flex-col justify-center relative z-10" style={{ backgroundColor: brandColor }}>
        <div className="mb-4 shrink-0 mt-4">
          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-black leading-[0.95] tracking-tighter uppercase text-white outline-none"
              style={{ fontSize: `${38 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>
        <SmartField field="texto_apoio" {...sp}>
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-medium leading-relaxed text-white/90 outline-none"
            style={{ fontSize: `${15 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>
        <div className="absolute bottom-0 right-8 translate-y-1/2 px-3 py-1.5 rounded-lg border border-white/20 z-50" style={{ backgroundColor: '#1A1A1A' }}>
          <SmartField field="tag" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="font-bold text-[10px] uppercase tracking-widest text-white/80 outline-none"
            >
              {data.tag || '16'}
            </span>
          </SmartField>
        </div>
      </div>
      <div className="flex-1 w-full relative shrink-0 z-0 flex">
        <SmartField field="imagem" {...sp} className="w-full h-full relative overflow-hidden">
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 58 — BRAND SIDEBAR REVERSE
// Barra lateral sólida + conteúdo à direita (texto topo, imagem base).
// ═══════════════════════════════════════════════════════════
export function SplitVariant58(props) {
  const { data, index, slideCount, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex overflow-hidden bg-[#EBE9E1] relative">
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true}
        handleColor="#1A1A1A"
        counterColor="#1A1A1A"
        counterBg="#EDEDED"
      />
      <div className="w-16 h-full shrink-0 flex flex-col items-center justify-center py-6 z-20" style={{ backgroundColor: brandColor }}>
        <div className="transform -rotate-90 origin-center whitespace-nowrap">
          <SmartField field="tag" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="font-black text-xl tracking-[0.2em] text-white uppercase drop-shadow-sm outline-none"
            >
              {data.tag || '17'}
            </span>
          </SmartField>
        </div>
      </div>
      <div className="flex-1 flex flex-col h-full relative z-10">
        <div className="h-[50%] flex flex-col justify-center p-8 bg-white min-h-0">
          <div style={{ width: '3rem', height: '0.25rem', backgroundColor: brandColor }} className="mb-4 shrink-0 mt-4" />
          <div className="mb-3 shrink-0">
            <SmartField field="titulo" {...sp}>
              <h2
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
                className="font-black text-[#1a1a1a] leading-tight uppercase tracking-tighter outline-none"
                style={{ fontSize: `${28 * sTitle}px` }}
              >
                {data.titulo}
              </h2>
            </SmartField>
          </div>
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="text-zinc-600 font-medium leading-snug outline-none"
              style={{ fontSize: `${14 * sText}px` }}
            >
              {data.texto_apoio}
            </p>
          </SmartField>
        </div>
        <div className="flex-1 w-full bg-zinc-300 relative shrink-0 border-t-4 border-white shadow-inner overflow-hidden flex">
          <SmartField field="imagem" {...sp} className="w-full h-full">
            <ImageBg data={data} className="absolute inset-0" />
          </SmartField>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 59 — BRAND STAMP DROP
// Topo de cor da marca + selo central + imagem na base.
// ═══════════════════════════════════════════════════════════
export function SplitVariant59(props) {
  const { data, index, slideCount, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-black text-white relative">
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true}
      />
      <div className="h-[50%] w-full p-8 flex flex-col justify-center text-center relative z-10 border-b-[8px] border-white" style={{ backgroundColor: brandColor }}>
        <div className="mb-4 shrink-0 mt-6">
          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-black leading-tight tracking-tighter uppercase drop-shadow-md text-white outline-none"
              style={{ fontSize: `${34 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>
        <SmartField field="texto_apoio" {...sp} className="w-[90%] mx-auto">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-bold leading-relaxed text-white/90 outline-none"
            style={{ fontSize: `${14 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>
      <div className="flex-1 w-full relative shrink-0 z-0 overflow-hidden flex">
        <SmartField field="imagem" {...sp} className="w-full h-full">
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white px-6 py-4 rounded-3xl z-[70] border-[4px] rotate-3" style={{ backgroundColor: brandColor, borderColor: 'rgb(255, 255, 255)', boxShadow: `0 20px 40px ${brandColor}33` }}>
        <SmartField field="tag" {...sp}>
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            className="font-black text-xl text-center tracking-tighter uppercase outline-none"
          >
            {data.tag || '18'}
          </h2>
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 60 — HARD SOLID TOP
// ═══════════════════════════════════════════════════════════
export function SplitVariant60(props) {
  const { data, index, slideCount, brandHandle, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-black text-white relative">
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true}
      />
      <div className="h-[50%] w-full p-8 flex flex-col justify-center relative z-10 border-b-[8px] border-white" style={{ backgroundColor: brandColor }}>
        <div className="mb-3 shrink-0 mt-4">
          <SmartField field="tag" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="font-text font-bold text-[10px] uppercase tracking-widest text-white/70 outline-none"
            >
              {data.tag || '19'}
            </span>
          </SmartField>
        </div>
        <div className="mb-4 shrink-0">
          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black leading-[0.9] tracking-tighter uppercase text-white outline-none"
              style={{ fontSize: `${40 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>
        <SmartField field="texto_apoio" {...sp}>
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text font-medium leading-relaxed text-white/90 outline-none"
            style={{ fontSize: `${14 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>
      <div className="flex-1 w-full relative shrink-0 z-0 overflow-hidden flex">
        <SmartField field="imagem" {...sp} className="w-full h-full">
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 61 — SOLID RIGID DROP
// ═══════════════════════════════════════════════════════════
export function SplitVariant61(props) {
  const { data, index, slideCount, brandHandle, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-white text-black p-6 relative">
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        handleColor="#1A1A1A"
        counterColor="#1A1A1A"
        counterBg="#EDEDED"
        hideDot={true}
      />
      <div className="w-full flex-1 flex flex-col pt-2 relative z-10" style={{ marginTop: '30px' }}>
        <div className="mb-2 shrink-0 mt-4">
          <SmartField field="tag" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="font-tag font-black text-[10px] uppercase tracking-widest outline-none"
              style={{ fontFamily: titleFont, color: brandColor }}
            >
              {data.tag || '21'}
            </span>
          </SmartField>
        </div>
        <div className="w-[90%] mb-4 shrink-0">
          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black leading-[0.85] tracking-tighter uppercase outline-none"
              style={{ color: '#1A1A1A', fontSize: `${44 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>
        <SmartField field="texto_apoio" {...sp} className="w-[95%]">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text font-medium leading-relaxed text-zinc-600 outline-none"
            style={{ fontSize: `${14 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>

      <div className="w-full h-[45%] relative z-0 shrink-0 mt-2">
        <div
          className="absolute bottom-0 right-0 w-[90%] h-[90%] z-0 border-4 border-white"
          style={{
            fontFamily: textFont,
            backgroundColor: brandColor,
            boxShadow: `15px 15px 40px ${brandColor}4D`
          }}
        ></div>
        <div className="absolute top-0 left-0 w-[90%] h-[90%] z-10 border-4 border-white shadow-md overflow-hidden bg-zinc-200 flex">
          <SmartField field="imagem" {...sp} className="w-full h-full">
            <ImageBg data={data} className="absolute inset-0" />
          </SmartField>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 62 — BRAND HEADER SHARP
// ═══════════════════════════════════════════════════════════
export function SplitVariant62(props) {
  const { data, index, slideCount, brandHandle, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-white text-black relative">
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true}
      />
      <div
        className="w-full h-[40%] flex flex-col justify-center p-8 relative z-10"
        style={{
          backgroundColor: brandColor,
          boxShadow: `0 10px 30px ${brandColor}33`
        }}
      >
        <div className="mt-6 shrink-0">
          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black leading-none tracking-tighter uppercase text-white outline-none"
              style={{ fontSize: `${42 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>
      </div>
      <div className="flex-1 w-full flex flex-col justify-start relative">
        <div className="p-8 pb-4 shrink-0">
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text font-medium leading-relaxed text-zinc-700 outline-none"
              style={{ fontSize: `${16 * sText}px` }}
            >
              {data.texto_apoio}
            </p>
          </SmartField>
        </div>
        <div className="w-full shrink-0 px-8 pb-8 flex mt-auto" style={{ height: 'calc(50% + 60px)', fontFamily: textFont, transform: 'translateY(35px)' }}>
          <SmartField field="imagem" {...sp} className="w-full h-full rounded-2xl overflow-hidden relative shadow-inner border-4 border-zinc-100 bg-zinc-200">
            <ImageBg data={data} className="absolute inset-0" />
          </SmartField>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 63 — INVERTED BRAND SIDEBAR
// ═══════════════════════════════════════════════════════════
export function SplitVariant63(props) {
  const { data, index, slideCount, brandHandle, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex overflow-hidden bg-white relative">
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        handleColor="#1A1A1A"
        counterColor="#1A1A1A"
        counterBg="#EDEDED"
        hideDot={true}
      />
      <div className="flex-1 h-full flex flex-col p-8 relative">
        <SmartField
          field="imagem"
          {...sp}
          className="flex-1 rounded-3xl overflow-hidden my-6 relative bg-zinc-200"
          style={{
            width: 'calc(100% + 14px)',
            marginLeft: '-7px',
            boxShadow: `0 25px 50px -12px ${brandColor}40`
          }}
        >
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>
      </div>
      <div className="w-[47%] h-full flex flex-col justify-center p-10 shrink-0 relative z-10 shadow-[-20px_0_50px_rgba(0,0,0,0.1)]" style={{ backgroundColor: brandColor }}>
        <div className="mb-6">
          <SmartField field="tag" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="font-tag font-black text-sm tracking-widest text-white/50 uppercase outline-none"
            >
              {data.tag || '23'}
            </span>
          </SmartField>
        </div>
        <div className="mb-6">
          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black leading-[0.9] tracking-tighter uppercase text-white outline-none"
              style={{ fontSize: `${36 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>
        <SmartField field="texto_apoio" {...sp}>
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-white/90 font-medium leading-relaxed outline-none"
            style={{ fontSize: `${17 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 64 — BLOCK TEXT BRAND
// ═══════════════════════════════════════════════════════════
export function SplitVariant64(props) {
  const { data, index, slideCount, brandHandle, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col p-8 overflow-hidden relative" style={{ fontFamily: titleFont, backgroundColor: brandColor }}>
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true}
      />

      <div className="flex-1 flex flex-col justify-center my-6">
        <div className="mb-4">
          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black leading-[0.85] tracking-tighter uppercase text-white outline-none"
              style={{ fontSize: `${48 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>
        <SmartField field="texto_apoio" {...sp}>
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-white/90 font-bold leading-relaxed tracking-wide uppercase outline-none"
            style={{ fontSize: `${15 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>

      <div className="w-full shrink-0 z-10 relative" style={{ height: 'calc(40% + 40px)', fontFamily: textFont, transform: 'translateY(-20px)' }}>
        <SmartField field="imagem" {...sp} className="w-full h-full bg-white rounded-[25px] shadow-2xl relative overflow-hidden border-4 border-white/20">
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 65 — FLOATING TEXT BRAND
// ═══════════════════════════════════════════════════════════
export function SplitVariant65(props) {
  const { data, index, slideCount, brandHandle, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col p-10 overflow-hidden relative bg-white" style={{ borderBottom: `10px solid ${brandColor}` }}>
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true}
        handleColor="#1A1A1A"
        counterColor="#1A1A1A"
        counterBg="#EDEDED"
      />

      <div className="flex-1 flex flex-col justify-center items-center text-center relative z-10">
        <div className="mb-6">
          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black leading-[0.8] tracking-tighter uppercase outline-none"
              style={{ color: brandColor, fontSize: `${46 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>

        <div className="w-[90%]">
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text font-medium leading-relaxed text-zinc-500 outline-none"
              style={{ fontSize: `${16 * sText}px` }}
            >
              {data.texto_apoio}
            </p>
          </SmartField>
        </div>
      </div>

      <div className="w-full h-[200px] bg-zinc-100 rounded-3xl overflow-hidden relative shadow-inner shrink-0 flex border-[4px] border-[rgb(205,205,205,0.3)]">
        <SmartField field="imagem" {...sp} className="w-full h-full">
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 66 — BRAND PILLAR TEXT
// ═══════════════════════════════════════════════════════════
export function SplitVariant66(props) {
  const { data, index, slideCount, brandHandle, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex bg-white relative">
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true}
      />
      <div className="flex-1 h-full flex flex-col p-8 relative">
        <div className="flex-1 flex flex-col justify-center">
          <div className="mb-4">
            <SmartField field="titulo" {...sp}>
              <h2
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
                className="font-title font-black leading-none tracking-tighter uppercase text-[#1a1a1a] outline-none"
                style={{ fontSize: `${38 * sTitle}px` }}
              >
                {data.titulo}
              </h2>
            </SmartField>
          </div>

          <div className="w-[90%]">
            <SmartField field="texto_apoio" {...sp}>
              <p
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                className="font-text font-medium leading-relaxed text-zinc-600 border-l-4 pl-6 outline-none"
                style={{ borderColor: brandColor, fontSize: `${16 * sText}px` }}
              >
                {data.texto_apoio}
              </p>
            </SmartField>
          </div>
        </div>

        <div className="w-full h-[170px] bg-zinc-100 rounded-2xl overflow-hidden relative border-[3px] border-[rgb(205,205,205,0.3)] shrink-0">
          <SmartField field="imagem" {...sp} className="w-full h-full">
            <ImageBg data={data} className="absolute inset-0" />
          </SmartField>
        </div>
      </div>

      <div className="w-[4rem] h-full shrink-0 flex flex-col items-center justify-center relative select-none pointer-events-none" style={{ fontFamily: textFont, backgroundColor: brandColor }}>
        <span className="font-text font-black text-white/30 text-2xl rotate-90 whitespace-nowrap tracking-[0.2em] uppercase">
          {data.tag || 'ESTRUTURA'}
        </span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 67 — OFFSET BRAND HEADER
// ═══════════════════════════════════════════════════════════
export function SplitVariant67(props) {
  const { data, index, slideCount, brandHandle, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col bg-white relative">
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true}
      />
      <div className="w-full h-[45%] p-8 flex flex-col justify-center relative z-20 shrink-0" style={{ fontFamily: textFont, backgroundColor: brandColor }}>
        <div className="mt-6">
          <div className="w-16 h-1 mb-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }} />
          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black leading-[0.8] tracking-tighter uppercase text-white outline-none"
              style={{ fontSize: `${48 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>
      </div>

      <div className="flex-1 w-full p-10 flex flex-col justify-start pt-[45px] relative z-10 bg-white">
        <div className="mb-6 -translate-y-[20px]">
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text font-medium leading-relaxed text-zinc-600 outline-none"
              style={{ fontSize: `${18 * sText}px` }}
            >
              {data.texto_apoio}
            </p>
          </SmartField>
        </div>
        <div className="w-full aspect-video bg-zinc-100 rounded-[32px] overflow-hidden relative border-2 border-zinc-50 shrink-0 -translate-y-[18px] mt-auto">
          <SmartField field="imagem" {...sp} className="w-full h-full">
            <ImageBg data={data} className="absolute inset-0" />
          </SmartField>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 68 — CINEMATIC BASE
// ═══════════════════════════════════════════════════════════
export function SplitVariant68(props) {
  const { data, index, slideCount, brandHandle, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col bg-white text-black relative">
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        handleColor="#1A1A1A"
        counterColor="#1A1A1A"
        counterBg="#EDEDED"
        hideDot={true}
      />
      <div className="w-full h-[50%] flex flex-col justify-center p-8 relative z-10 bg-zinc-50 border-b-[8px] shrink-0" style={{ fontFamily: textFont, borderColor: brandColor }}>
        <div className="mt-6 shrink-0">
          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black leading-[0.85] tracking-tighter uppercase text-[#1a1a1a] outline-none"
              style={{ fontSize: `${40 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>
        <div className="mt-4">
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text font-bold leading-relaxed text-zinc-500 uppercase tracking-widest outline-none"
              style={{ fontSize: `${14 * sText}px` }}
            >
              {data.texto_apoio}
            </p>
          </SmartField>
        </div>
      </div>
      <div className="flex-1 w-full flex relative z-0">
        <SmartField field="imagem" {...sp} className="w-full h-full">
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 69 — BRUTAL OFFSET
// ═══════════════════════════════════════════════════════════
export function SplitVariant69(props) {
  const { data, index, slideCount, brandHandle, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col p-8 relative" style={{ fontFamily: textFont, backgroundColor: brandColor }}>
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true}
      />

      <div className="w-full h-[40%] flex flex-col justify-center relative z-10 mt-2">
        <div className="mb-4">
          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black leading-[0.8] tracking-tighter uppercase text-white drop-shadow-xl outline-none"
              style={{ fontSize: `${46 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>
        <div>
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text font-medium leading-relaxed text-white/90 outline-none"
              style={{ fontSize: `${16 * sText}px` }}
            >
              {data.texto_apoio}
            </p>
          </SmartField>
        </div>
      </div>

      <div className="flex-1 w-full flex">
        <SmartField field="imagem" {...sp} className="w-full h-[calc(100%-30px)] bg-zinc-900 rounded-[24px] overflow-hidden relative border-[6px] border-white">
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 70 — CLEAN INJECT
// ═══════════════════════════════════════════════════════════
export function SplitVariant70(props) {
  const { data, index, slideCount, brandHandle, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col bg-zinc-50 relative">
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        handleColor="#1A1A1A"
        counterColor="#1A1A1A"
        counterBg="#EDEDED"
        hideDot={true}
      />
      <div className="flex-1 w-full flex flex-col p-10 justify-center z-10">
        <div className="mt-8 mb-4">
          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black leading-[0.85] tracking-tighter uppercase text-[#1a1a1a] outline-none"
              style={{ fontSize: `${42 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>

        <div className="border-l-4 pl-4" style={{ fontFamily: textFont, borderColor: brandColor }}>
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text font-bold leading-relaxed text-zinc-600 outline-none"
              style={{ fontSize: `${15 * sText}px` }}
            >
              {data.texto_apoio}
            </p>
          </SmartField>
        </div>
      </div>

      <div className="h-[50%] w-full relative z-0 shrink-0 overflow-hidden">
        <SmartField field="imagem" {...sp} className="w-full h-full block">
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>
        <div className="absolute top-0 left-0 w-full h-[10px] z-50" style={{ fontFamily: textFont, backgroundColor: brandColor }}></div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 71 — Author Bottom Image
// Header + Avatar/Texto no topo + Imagem na base.
// ═══════════════════════════════════════════════════════════
export function SplitVariant71(props) {
  const { data, index, slideCount, brandHandle, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col bg-zinc-50 relative">
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        handleColor="#1A1A1A"
        counterColor="#1A1A1A"
        counterBg="#EDEDED"
        hideDot={true}
      />
      <div className="w-full h-[55%] flex flex-col p-8 pt-20 relative z-10">
        <div className="flex items-center gap-3 mb-4 shrink-0">
          <div className="w-12 h-12 rounded-full bg-zinc-300 overflow-hidden shrink-0 shadow-md border-2 border-white">
            <img src={brandAvatar || ""} className="w-full h-full object-cover" alt="Avatar" />
          </div>
          <div className="flex flex-col">
            <SmartField field="tag" {...sp}>
              <span
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
                className="font-black text-[#1a1a1a] uppercase text-[11px] tracking-wider font-tag outline-none"
              >
                {data.tag || 'AUTHOR'}
              </span>
            </SmartField>
            <span className="text-[10px] text-zinc-500 font-medium font-tag">{brandHandle || '@username'}</span>
          </div>
        </div>
        <div className="mb-3 shrink-0">
          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-black text-[#1a1a1a] leading-[0.9] tracking-tight uppercase font-title outline-none"
              style={{ fontSize: `${38 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>
        <div className="flex-1">
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="text-zinc-600 leading-snug font-medium font-text outline-none"
              style={{ fontSize: `${16 * sText}px` }}
            >
              {data.texto_apoio}
            </p>
          </SmartField>
        </div>
      </div>
      <div className="flex-1 w-full relative z-0 flex overflow-hidden">
        <SmartField field="imagem" {...sp} className="w-full h-full">
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 72 — Author Split Bottom
// Header + Texto no topo + Imagem deslocada na base com avatar.
// ═══════════════════════════════════════════════════════════
export function SplitVariant72(props) {
  const { data, index, slideCount, brandHandle, brandColor, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col bg-white p-6 relative">
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        handleColor="#1A1A1A"
        counterColor="#1A1A1A"
        counterBg="#EDEDED"
        hideDot={true}
      />
      <div className="flex-1 flex flex-col pt-4 min-h-0 z-10 mt-[35px]">
        <div className="mb-2">
          <SmartField field="tag" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="font-bold text-[10px] tracking-widest uppercase font-tag outline-none"
              style={{ color: brandColor }}
            >
              {data.tag || brandHandle || '@SEUPERFIL'}
            </span>
          </SmartField>
        </div>
        <div className="mb-3 shrink-0">
          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-black leading-[0.85] tracking-tighter font-title outline-none"
              style={{ color: '#1A1A1A', fontSize: `${42 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>
        <div className="flex-1">
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="text-[#52525b] font-bold leading-snug font-text outline-none"
              style={{ fontSize: `${15 * sText}px` }}
            >
              {data.texto_apoio}
            </p>
          </SmartField>
        </div>
      </div>
      <SmartField
        field="imagem"
        {...sp}
        className="w-[85%] h-[40%] rounded-tr-[50px] rounded-bl-[50px] overflow-hidden shrink-0 bg-zinc-200 relative ml-auto border-4 mt-4"
        style={{
          borderColor: brandColor,
          boxShadow: `0 25px 50px -12px ${brandColor}26`
        }}
      >
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 73 — Author Edge Bot
// Texto sobre fundo de cor da marca + Imagem na base (45%).
// ═══════════════════════════════════════════════════════════
export function SplitVariant73(props) {
  const { data, index, slideCount, brandColor, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col relative">
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true}
      />
      <div className="flex-1 flex flex-col p-8 pt-10 justify-center relative border-b-8 border-white" style={{ fontFamily: titleFont, backgroundColor: brandColor }}>
        <div className="mb-3 mt-8 shrink-0">
          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-black text-white leading-none tracking-tight uppercase font-title outline-none"
              style={{ fontSize: `${38 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>
        <div className="flex-1">
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="text-white/80 font-medium leading-snug font-text outline-none"
              style={{ fontSize: `${16 * sText}px` }}
            >
              {data.texto_apoio}
            </p>
          </SmartField>
        </div>
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/20">
          <div className="w-8 h-8 rounded-full bg-white overflow-hidden shrink-0">
            <img src={brandAvatar || ""} className="w-full h-full object-cover" alt="Avatar" />
          </div>
          <SmartField field="tag" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="font-bold text-xs text-white uppercase tracking-widest font-tag outline-none"
            >
              {data.tag || 'CHEF'}
            </span>
          </SmartField>
        </div>
      </div>
      <div className="w-full h-[45%] shrink-0 relative bg-zinc-200 flex overflow-hidden">
        <SmartField field="imagem" {...sp} className="w-full h-full">
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 74 — Author Badge Bottom
// Texto no topo + Imagem na base com badge de autor flutuante.
// ═══════════════════════════════════════════════════════════
export function SplitVariant74(props) {
  const { data, index, slideCount, brandHandle, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col bg-white relative overflow-visible">
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        handleColor="#1A1A1A"
        counterColor="#1A1A1A"
        counterBg="#EDEDED"
        hideDot={true}
      />
      <div className="flex-1 flex flex-col p-8 pb-4 min-h-0 justify-center mt-6">
        <div className="mb-2 shrink-0">
          <SmartField field="tag" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="font-bold text-[10px] tracking-widest text-zinc-400 uppercase font-tag outline-none"
            >
              {data.tag || 'SEGREDO'}
            </span>
          </SmartField>
        </div>
        <div className="mb-3 shrink-0">
          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-black text-[#1a1a1a] leading-tight font-title outline-none"
              style={{ fontSize: `${28 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>
        <div className="flex-1">
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="text-zinc-600 leading-relaxed font-medium font-text outline-none"
              style={{ fontSize: `${15 * sText}px` }}
            >
              {data.texto_apoio}
            </p>
          </SmartField>
        </div>
      </div>
      <div className="w-full h-[50%] shrink-0 relative bg-zinc-200 mt-2 z-0 overflow-hidden">
        <SmartField field="imagem" {...sp} className="w-full h-full">
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>
      </div>

      {/* Camada de Overlay para Elementos que devem flutuar sobre tudo */}
      <div className="absolute inset-0 pointer-events-none z-[1000]">
        <div className="absolute left-8 bottom-[calc(50%-20px-8px)] pointer-events-auto p-2 rounded-2xl shadow-xl flex items-center gap-3" style={{ fontFamily: titleFont, backgroundColor: brandColor }}>
          <div className="w-10 h-10 rounded-xl bg-zinc-300 overflow-hidden shrink-0 border-2" style={{ borderColor: brandColor }}>
            <img src={brandAvatar || ""} className="w-full h-full object-cover" alt="Avatar" />
          </div>
          <span className="pr-3 font-black text-[10px] text-white uppercase tracking-wider font-tag">{brandHandle || 'AUTHOR'}</span>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 75 — Author Modern Reverse
// Texto no topo com avatar + Imagem arredondada na base (45%).
// ═══════════════════════════════════════════════════════════
export function SplitVariant75(props) {
  const { data, index, slideCount, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col bg-zinc-50 p-6 relative">
      <SlideHeader
        {...props}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        handleColor="#1A1A1A"
        counterColor="#1A1A1A"
        counterBg="#EDEDED"
        hideDot={true}
      />
      <div className="flex-1 flex flex-col pt-4 min-h-0 mt-[35px]">
        <div className="flex items-center gap-3 mb-4 shrink-0">
          <div className="w-8 h-8 rounded-full bg-zinc-300 overflow-hidden shadow-sm shrink-0">
            <img src={brandAvatar || ""} className="w-full h-full object-cover" alt="Avatar" />
          </div>
          <SmartField field="tag" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="font-bold text-xs text-zinc-500 uppercase tracking-wide font-tag outline-none"
            >
              {data.tag || 'MODERNO'}
            </span>
          </SmartField>
        </div>
        <div className="mb-2 shrink-0">
          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-black text-[#1a1a1a] leading-tight font-title outline-none"
              style={{ fontSize: `${26 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>
        <div className="flex-1">
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="text-zinc-600 leading-relaxed font-medium font-text outline-none"
              style={{ fontSize: `${14 * sText}px` }}
            >
              {data.texto_apoio}
            </p>
          </SmartField>
        </div>
      </div>
      <SmartField
        field="imagem"
        {...sp}
        className="w-full h-[48%] rounded-[24px] overflow-hidden mt-4 shrink-0 relative bg-zinc-200 border-[3px] border-[rgba(255,255,255,0.3)]"
        style={{
          boxShadow: `0 20px 40px -10px ${brandColor}33`
        }}
      >
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 76 — Fast Company Edition
// Layout brutalista-editorial com noise filter, numeral gigante
// e card centralizado com estrela de 4 pontas
// ═══════════════════════════════════════════════════════════
export function SplitVariant76(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const bgBase = data.bgColor || brandColor || '#fa0542';
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  return (
    <div className="relative w-full h-full flex flex-col justify-between py-8 font-outfit select-none overflow-hidden rounded-slide shadow-2xl border border-white/10" style={{ backgroundColor: bgBase }}>
      

      {/* O NÚMERO GIGANTE FLUTUANTE NO FUNDO - SUBIDO PARA -top-36 */}
      <div className="absolute -top-56 -left-14 text-[680px] font-serif normal font-medium text-white/[0.05] pointer-events-none select-none leading-none z-[2]">
        {data.badge_text || (index + 1)}
      </div>

      {/* Header: Número + Título Principal (Linha horizontal removida) */}
      <div className="relative z-10 flex gap-0 mt-8 items-start px-0">
        
        {/* Container Esquerdo para Número */}
        <div className="flex flex-col relative w-[80px]">
           <span className="font-serif italic text-white text-[58px] leading-[0.7] select-none font-medium pl-[22px] relative z-10" style={{ WebkitTextStroke: '1.5px #ffffff', color: 'transparent' }}>
             {data.badge_text || `${index + 1}.`}
           </span>
        </div>

        <SmartField field="titulo" data={data} index={index} {...sp}>
          <h2 className="font-serif text-white font-bold leading-snug tracking-tight text-left flex-1 filter drop-shadow-sm pr-6 mt-2.5 outline-none" style={{ fontFamily: titleFont, fontSize: `${20 * sTitle}px` }}>
             {data.titulo || 'Quando uma marca deve usar a força dos influencers?'}
          </h2>
        </SmartField>
      </div>

      {/* Card Neo-Brutalista Central */}
      <div className="relative z-10 w-[94%] bg-white rounded-r-[1.5rem] border-t-[1.5px] border-r-[1.5px] border-b-[1.5px] border-l-0 border-zinc-950 shadow-[6px_6px_0px_rgba(0,0,0,1)] text-left my-auto py-6 pr-6 pl-8 ml-0">
        
        {/* Estrela de 4 pontas preta */}
        <div className="absolute top-4 left-[-12px] bg-white text-zinc-950 z-20">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C12 6.62742 6.62742 12 0 12C6.62742 12 12 17.3726 12 24C12 17.3726 17.3726 12 24 12C17.3726 12 12 6.62742 12 0Z" />
          </svg>
        </div>

        <SmartField field="texto_apoio" data={data} index={index} {...sp}>
          <p className="text-zinc-950 font-outfit leading-relaxed font-normal outline-none" style={{ fontFamily: textFont, fontSize: `${12 * sText}px` }}>
            {data.texto_apoio || 'Os modelos de negócios evoluíram e se ampliaram. Somam-se a isso a penetração das redes sociais e a importância dos influenciadores. Na minha opinião, não vejo "quando" mas sim "como usar". Cabe ter clareza dos objetivos para guiar a estratégia, a plataforma social a ser utilizada, o tipo de influenciador, o jeito de construir a mensagem e a conexão com eles.'}
          </p>
        </SmartField>
      </div>

      {/* Footer: BRAND & ARRASTE */}
      <div className="relative z-10 w-full flex justify-between items-center pt-2 px-6">
        
        {/* Centered Brand Logo */}
        <div className="flex-1 text-center font-serif text-[12.5px] tracking-[0.08em] text-white/95 font-black uppercase">
          {brandHandle ? brandHandle.replace('@', '') : 'FAST COMPANY'}
          <span className="block font-outfit text-[8px] tracking-[0.25em] font-medium text-white/80 mt-[1px]">BRASIL</span>
        </div>

        {/* Arraste Pill on Right */}
        <div className="absolute bottom-1.5 right-6 bg-white text-zinc-950 px-4 py-1.5 rounded-full text-[10.5px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg hover:bg-zinc-100 transition-colors cursor-pointer border border-zinc-200">
          <span>Arraste</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-zinc-950">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>

      </div>

    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 77 — Showcase Grid (Charity Bakes Split)
// Quad-grid de imagens gastronômicas com card de evento central
// ═══════════════════════════════════════════════════════════
export function SplitVariant77(props) {
  const { data, index, brandColor, brandHandle, isVerified, slideCount, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const bgBase = data.bgColor || '#ffffff'; 
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  const img1 = getCorsSafeUrl(data.imageUrl || "https://i.etsystatic.com/20175028/r/il/18277f/3011567563/il_fullxfull.3011567563_2hoz.jpg");
  const img2 = getCorsSafeUrl(data.imageUrl2 || "https://truffle-assets.tastemadecontent.net/84cnzp0itw1q_4NzdqDzoWcA2OkSe8yiEgW_trufas-de-chocolate_landscapeThumbnail_pt.jpeg");
  const img3 = getCorsSafeUrl(data.imageUrl3 || "https://www.oetker.com.br/assets/recipes/assets/859bf909fb554fcca25fb90af3155117/1272x764/trufas-de-chocolate-com-leite-de-coco-e-avel.webp");
  const img4 = getCorsSafeUrl(data.imageUrl4 || "https://static.wixstatic.com/media/0d72ca_e9ed1f55b3ef46c1ae8a01652b9c762f~mv2_d_1365_2048_s_2.jpg/v1/fit/w_500,h_500,q_90/file.jpg");

  return (
    <div className="relative w-full h-full flex flex-col justify-between font-outfit select-none overflow-hidden rounded-slide shadow-2xl text-[#1A1A1A]" style={{ backgroundColor: bgBase }}>
      
      {/* Slide Header flutuando no topo */}
      <div className="absolute top-2 left-0 w-full px-8 z-50 pointer-events-none">
        <SlideHeader 
          data={data} 
          slideIndex={index} 
          onActionStart={onActionStart} 
          selectedElement={selectedElement} 
          onSelectElement={onSelectElement} 
          index={index + 1} 
          total={slideCount} 
          brandHandle={brandHandle} 
          showBrandHandle={props.showBrandHandle} 
          brandColor={brandColor} 
          isVerified={isVerified} 
          showSlideCounter={props.showSlideCounter} 
          slideCounterPosition={props.slideCounterPosition} 
          brandAvatar={props.brandAvatar} 
          hideDot={true} 
          counterBg="rgba(0,0,0,0.1)" 
          handleColor="#1A1A1A" 
          counterColor="#1A1A1A" 
          brandLogo={props.brandLogo} 
          showBrandLogo={props.showBrandLogo} 
          className="pointer-events-auto"
        />
      </div>

      {/* Grid Superior de Imagens */}
      <div className="grid grid-cols-2 gap-2 h-[calc(28%+14px)] w-full">
        <SmartField field="imagem" data={data} index={index} {...sp} className="relative overflow-hidden w-full h-full rounded-none bg-zinc-100 shadow-md">
          <img 
            src={img1} 
            crossOrigin="anonymous"
            className="w-full h-full object-cover" 
            alt="Showcase 1" 
          />
        </SmartField>
        <SmartField field="imagem2" data={data} index={index} {...sp} className="relative overflow-hidden w-full h-full rounded-none bg-zinc-100 shadow-md">
          <img 
            src={img2} 
            crossOrigin="anonymous"
            className="w-full h-full object-cover" 
            alt="Showcase 2" 
          />
        </SmartField>
      </div>

      {/* Banner Central Tipográfico */}
      <div className="flex-1 py-4 flex flex-col justify-center items-center px-6 relative z-10 text-center">
        <SmartField field="subtitulo" data={data} index={index} {...sp}>
          <TextWrapper {...sp} as="p" field="subtitulo" className="text-[12.5px] text-[#1A1A1A] font-light tracking-wide leading-none mb-1 outline-none" style={{ fontFamily: textFont, fontSize: `${17 * sText}px` }}>
            {data.subtitulo || 'Bakery sale for a cause'}
          </TextWrapper>
        </SmartField>

        <SmartField field="titulo" data={data} index={index} {...sp}>
          <TextWrapper {...sp} as="h2" field="titulo" className="font-display font-bold text-[#1A1A1A] leading-[0.95] tracking-tight uppercase my-1 select-none outline-none" style={{ fontSize: `${60 * sTitle}px`, fontFamily: titleFont }}>
            {data.titulo || 'CHARITY BAKES'}
          </TextWrapper>
        </SmartField>

        <div className="flex flex-col gap-1.5 mt-3 text-[#1A1A1A]">
          <SmartField field="texto_apoio" data={data} index={index} {...sp}>
            <TextWrapper {...sp} as="p" field="texto_apoio" className="opacity-80 text-[11px] font-light leading-none mt-1 flex items-center justify-center gap-1.5 outline-none" style={{ fontFamily: textFont, fontSize: `${21 * sText}px` }}>
              {data.texto_apoio || 'City market, City center'}
            </TextWrapper>
          </SmartField>
        </div>
      </div>

      {/* Grid Inferior de Imagens */}
      <div className="grid grid-cols-2 gap-2 h-[calc(28%+14px)] w-full">
        <SmartField field="imagem3" data={data} index={index} {...sp} className="relative overflow-hidden w-full h-full rounded-none bg-zinc-100 shadow-md">
          <img 
            src={img3} 
            crossOrigin="anonymous"
            className="w-full h-full object-cover" 
            alt="Showcase 3" 
          />
        </SmartField>
        <SmartField field="imagem4" data={data} index={index} {...sp} className="relative overflow-hidden w-full h-full rounded-none bg-zinc-100 shadow-md">
          <img 
            src={img4} 
            crossOrigin="anonymous"
            className="w-full h-full object-cover" 
            alt="Showcase 4" 
          />
        </SmartField>
      </div>

    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 78 — Studio Doceria Kit Festa (Capa 16)
// ═══════════════════════════════════════════════════════════
export function SplitVariant78(props) {
  const { data, index, brandColor, brandHandle, isVerified, slideCount, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  const img1 = getCorsSafeUrl(data.imageUrl || "https://images.unsplash.com/photo-1562777717-b61eb8f16b28?q=80&w=600&auto=format&fit=crop");

  return (
    <div className="relative w-full h-full flex flex-col justify-between font-outfit select-none overflow-hidden rounded-slide shadow-2xl text-white bg-white">
      {/* Slide Header flutuando no topo */}
      <div className="absolute top-2 left-0 w-full px-8 z-50 pointer-events-none">
        <SlideHeader 
          data={data} 
          slideIndex={index} 
          onActionStart={onActionStart} 
          selectedElement={selectedElement} 
          onSelectElement={onSelectElement} 
          index={index + 1} 
          total={slideCount} 
          brandHandle={brandHandle} 
          showBrandHandle={props.showBrandHandle} 
          brandColor={brandColor} 
          isVerified={isVerified} 
          showSlideCounter={props.showSlideCounter} 
          slideCounterPosition={props.slideCounterPosition} 
          brandAvatar={props.brandAvatar} 
          hideDot={true} 
          counterBg="rgba(0,0,0,0.1)" 
          handleColor="#5e4104" 
          counterColor="#5e4104" 
          brandLogo={props.brandLogo} 
          showBrandLogo={props.showBrandLogo} 
          className="pointer-events-auto"
        />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Alfa+Slab+One&family=Charmonman:wght@700&display=swap');
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .font-display { font-family: 'Alfa Slab One', cursive; }
        .font-hand { font-family: 'Charmonman', cursive; }
      `}} />

      {/* ================= CAPA 16: STUDIO DOCERIA - KIT FESTA ================= */}
      <div className="relative w-full h-full flex font-outfit select-none overflow-hidden bg-white">
        
        {/* LEFT PANEL: Amarelo Mostarda (Dinâmico com brandColor) */}
        <div className="w-[51%] h-full flex flex-col items-center justify-start pt-14 pb-8 relative z-10 px-3 text-center" style={{ backgroundColor: brandColor || '#dfa828' }}>
          
          {/* SVG Pattern: Gotas/Folhas no canto inferior (proporções preservadas via wrapper de 48%) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <svg viewBox="0 0 1026.6 1350" preserveAspectRatio="none" className="absolute inset-y-0 left-0 h-full w-[208.33%] max-w-none pointer-events-none" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0 1020 C 15 1025, 96 1040, 78 1169 L 76 1169 C 72 1120, 15 1112, 0 1100 Z" fill="#ffd9e233" />
              <path d="M 0 1116 C 22 1129, 79 1149, 58 1224 L 54 1233 C 25 1268, -5 1208, 0 1194 Z" fill="#ffd9e233" />
              <path d="M 8 1248 C 20 1282, 56 1302, 53 1343 L 52 1341 C 11 1279, -32 1322, 0 1216 Z" fill="#ffd9e233" />
              <path d="M 157 1041 C 209 1117, 111 1191, 98 1135 L 99 1131 C 108 1100, 155 1076, 146 1023 Z" fill="#ffd9e233" />
              <path d="M 57 1050 C 38 1027, 58 1010, 64 1017 L 65 1019 C 71 1035, 64 1027, 71 1063 Z" fill="#ffd9e233" />
              <path d="M 96 1133 C 133 1033, 90 1021, 76 1049 L 76 1049 C 73 1079, 98 1090, 94 1133 Z" fill="#ffd9e233" />
              <path d="M 120 1087 C 160 1037, 131 1009, 118 1030 L 122 1027 C 107 1034, 127 1060, 119 1084 Z" fill="#ffd9e233" />
              <path d="M 180 1089 C 233 1032, 190 1007, 176 1026 L 179 1023 C 150 1039, 192 1070, 179 1086 Z" fill="#ffd9e233" />
              <path d="M 214 1184 C 249 1277, 185 1283, 180 1260 L 180 1254 C 180 1242, 218 1228, 211 1185 Z" fill="#ffd9e233" />
              <path d="M 219 1283 C 298 1348, 193 1430, 171 1413 L 186 1398 C 176 1369, 257 1342, 217 1284 Z" fill="#ffd9e233" />
              <path d="M 285 1118 C 329 1244, 262 1253, 258 1218 L 258 1214 C 262 1181, 284 1162, 283 1118 Z" fill="#ffd9e233" />
              <path d="M 303 1194 C 348 1307, 255 1274, 290 1238 L 295 1230 C 284 1246, 307 1222, 301 1194 Z" fill="#ffd9e233" />
              <path d="M 268 1060 C 308 1214, 206 1216, 221 1161 L 225 1153 C 248 1126, 266 1111, 266 1060 Z" fill="#ffd9e233" />
              <path d="M 302 1277 C 329 1394, 206 1353, 281 1308 L 261 1324 C 285 1298, 304 1308, 297 1276 Z" fill="#ffd9e233" />
              <path d="M 256 1029 C 252 1178, 164 1160, 181 1102 L 188 1091 C 210 1066, 246 1057, 252 1031 Z" fill="#ffd9e233" />
              <path d="M 210 1068 C 223 1040, 255 1041, 240 1025 L 243 1031 C 236 1009, 211 1020, 208 1068 Z" fill="#ffd9e233" />
              <path d="M 231 1137 C 193 1200, 174 1154, 191 1150 L 193 1149 C 216 1145, 216 1143, 230 1135 Z" fill="#ffd9e233" />
              <path d="M 176 1117 C 181 1179, 123 1158, 156 1137 L 152 1140 C 161 1133, 167 1129, 174 1116 Z" fill="#ffd9e233" />
              <path d="M 410 1237 C 461 1375, 317 1385, 374 1308 L 378 1304 C 416 1265, 405 1256, 407 1237 Z" fill="#ffd9e233" />
              <path d="M 440 1152 C 498 1226, 375 1253, 403 1206 L 406 1204 C 446 1188, 443 1170, 437 1153 Z" fill="#ffd9e233" />
              <path d="M 289 1028 C 323 1072, 381 1089, 410 1059 L 415 1050 C 431 985, 334 1045, 314 1036 Z" fill="#ffd9e233" />
              <path d="M 459 1296 C 449 1350, 536 1416, 412 1397 L 420 1385 C 423 1344, 449 1318, 457 1296 Z" fill="#ffd9e233" />
              <path d="M 275 1024 C 267 1116, 360 1213, 388 1142 L 388 1139 C 386 1086, 316 1081, 289 1041 Z" fill="#ffd9e233" />
              <path d="M 301 1143 C 301 1226, 372 1297, 400 1262 L 402 1258 C 410 1214, 347 1206, 313 1160 Z" fill="#ffd9e233" />
              <path d="M 312 1313 C 308 1408, 400 1502, 425 1431 L 425 1428 C 423 1375, 353 1352, 327 1334 Z" fill="#ffd9e233" />
              <path d="M 241 1195 C 208 1254, 248 1326, 290 1299 L 293 1295 C 305 1269, 251 1261, 244 1216 Z" fill="#ffd9e233" />
              <path d="M 302 1339 C 275 1358, 306 1473, 348 1446 L 351 1442 C 363 1416, 309 1408, 302 1363 Z" fill="#ffd9e233" />
              <path d="M 316 1308 C 321 1235, 320 1295, 321 1230 L 340 1254 C 386 1293, 362 1366, 317 1314 Z" fill="#ffd9e233" />
              <path d="M 417 1340 C 387 1360, 377 1366, 388 1369 L 395 1371 C 402 1374, 409 1368, 418 1341 Z" fill="#ffd9e233" />
              <path d="M 519 1320 C 519 1359, 529 1350, 475 1350 L 472 1350 C 453 1312, 472 1277, 474 1254 Z" fill="#ffd9e233" />
              <path d="M 471 1131 C 441 1190, 471 1239, 493 1218 L 494 1216 C 503 1188, 481 1198, 474 1153 Z" fill="#ffd9e233" />
              <path d="M 355 1085 C 387 1118, 435 1113, 446 1101 L 450 1096 C 464 1050, 397 1090, 374 1086 Z" fill="#ffd9e233" />
              <path d="M 388 1115 C 421 1145, 450 1162, 465 1137 L 467 1134 C 475 1098, 430 1114, 407 1115 Z" fill="#ffd9e233" />
              <path d="M 424 1067 C 477 1047, 493 1072, 510 1064 L 518 1059 C 536 1004, 453 1011, 422 1064 Z" fill="#ffd9e233" />
              <path d="M 462 1071 C 466 1079, 502 1109, 519 1096 L 519 1077 C 520 1040, 514 1096, 463 1068 Z" fill="#ffd9e233" />
              <path d="M 504 1104 C 507 1104, 521 1113, 519 1111 L 519 1096 C 520 1099, 512 1104, 505 1101 Z" fill="#ffd9e233" />
              <path d="M 325 1166 C 353 1193, 424 1209, 434 1168 L 434 1161 C 415 1114, 375 1197, 326 1165 Z" fill="#ffd9e233" />
              <path d="M 453 1080 C 476 1106, 476 1156, 519 1156 L 519 1118 C 494 1116, 480 1086, 454 1079 Z" fill="#ffd9e233" />
              <path d="M 480 1144 C 480 1146, 490 1176, 519 1198 L 519 1164 C 499 1162, 490 1152, 482 1143 Z" fill="#ffd9e233" />
              <path d="M 488 1182 C 485 1184, 499 1187, 519 1224 L 519 1201 C 507 1194, 541 1216, 490 1181 Z" fill="#ffd9e233" />
              <path d="M 425 1335 C 435 1292, 437 1316, 465 1270 L 468 1264 C 494 1207, 416 1158, 423 1335 Z" fill="#ffd9e233" />
              <path d="M 519 1296 C 519 1253, 519 1277, 519 1256 L 519 1246 C 518 1191, 428 1228, 519 1298 Z" fill="#ffd9e233" />
              <path d="M 83 1199 C 79 1142, 108 1150, 112 1160 L 113 1163 C 114 1175, 94 1177, 85 1199 Z" fill="#ffd9e233" />
              <path d="M 69 1311 C 40 1170, 196 1119, 207 1199 L 207 1202 C 191 1271, 94 1205, 71 1311 Z" fill="#ffd9e233" />
              <path d="M 77 1350 C 75 1229, 172 1237, 188 1283 L 189 1289 C 188 1324, 153 1325, 119 1350 Z" fill="#ffd9e233" />
              <path d="M 150 1350 C 159 1342, 174 1334, 186 1309 L 190 1303 C 203 1289, 233 1310, 213 1350 Z" fill="#ffd9e233" />
              <path d="M 37 1247 C 58 1238, 65 1300, 62 1327 L 58 1326 C 65 1305, 5 1263, 39 1246 Z" fill="#ffd9e233" />
              <path d="M -3 1355 C 0 1310, 24 1322, 33 1333 L 32 1332 C 77 1373, 10 1345, -3 1354 Z" fill="#ffd9e233" />
              <path d="M 26 1427 C 22 1370, 51 1378, 55 1388 L 56 1391 C 57 1403, 54 1398, 28 1427 Z" fill="#ffd9e233" />
            </svg>
          </div>

          {/* Top Text Group */}
          <div className="flex flex-col items-center relative z-10 w-full mt-3">
            <SmartField field="bellaTitle1" data={data} index={index} {...sp}>
              <TextWrapper {...sp} as="h3" field="bellaTitle1" className="text-white font-bold text-[14px] leading-none mb-1.5 tracking-tight w-full whitespace-nowrap outline-none" style={{ fontSize: `${32 * sText}px` }}>
                {data.bellaTitle1 || "Procurando o"}
              </TextWrapper>
            </SmartField>

            <SmartField field="titulo" data={data} index={index} {...sp}>
              <TextWrapper {...sp} as="h1" field="titulo" className="text-white font-display text-[26px] leading-[0.95] tracking-tight w-full whitespace-nowrap outline-none" style={{ fontSize: `${50 * sTitle}px` }}>
                {data.titulo || "Kit Festa"}
              </TextWrapper>
            </SmartField>

            <SmartField field="bellaTitle3" data={data} index={index} {...sp}>
              <TextWrapper {...sp} as="h3" field="bellaTitle3" className="text-white font-bold text-[15px] leading-none mt-1 tracking-tight w-full whitespace-nowrap outline-none" style={{ fontSize: `${32 * sText}px` }}>
                {data.bellaTitle3 || "ideal?"}
              </TextWrapper>
            </SmartField>
          </div>

          {/* CTA Bottom (Nos chame no direct!) - Colocado no lugar do texto_apoio */}
          <div className="relative z-10 py-1.5 px-1 mt-6 mb-5 w-[85%]">
            <SmartField field="bellaBottomText" data={data} index={index} {...sp}>
              <TextWrapper {...sp} as="p" field="bellaBottomText" className="text-white font-black text-[10px] uppercase tracking-widest leading-snug outline-none" style={{ fontSize: `${20 * sText}px` }}>
                {data.bellaBottomText || "NOS CHAME NO DIRECT!"}
              </TextWrapper>
            </SmartField>
          </div>

          {/* Logo posicionado acima do padrão de gotas/folhas da base */}
          <div className="relative z-20 mt-4 mb-24 flex flex-col items-center justify-center">
            <SmartField field="bellaLogoText" data={data} index={index} {...sp}>
              <TextWrapper {...sp} as="h2" field="bellaLogoText" className="font-hand text-white text-[40px] leading-[0.6] tracking-tight pr-2 outline-none">
                {data.bellaLogoText || "Studio"}
              </TextWrapper>
            </SmartField>
            <span className="font-black text-white text-[9px] tracking-[0.25em] uppercase mt-1">
              Confeitaria
            </span>
          </div>

        </div>

        {/* RIGHT PANEL: Imagem Completa */}
        <SmartField field="imagem" data={data} index={index} {...sp} className="flex-1 h-full relative overflow-hidden bg-zinc-100">
          <img 
            src={img1} 
            crossOrigin="anonymous"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
            alt="Naked Cake" 
          />
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 79 — Tortas Variadas (Capa 31)
// ═══════════════════════════════════════════════════════════
export function SplitVariant79(props) {
  const { data, index, brandColor, brandHandle, isVerified, slideCount, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  return (
    <div className="relative w-full h-full flex flex-col justify-between font-outfit select-none overflow-hidden rounded-slide shadow-2xl text-[#3a2829] bg-[#fcaebb]">
      {/* Slide Header flutuando no topo */}
      <div className="absolute top-2 left-0 w-full px-8 z-50 pointer-events-none">
        <SlideHeader 
          data={data} 
          slideIndex={index} 
          onActionStart={onActionStart} 
          selectedElement={selectedElement} 
          onSelectElement={onSelectElement} 
          index={index + 1} 
          total={slideCount} 
          brandHandle={brandHandle} 
          showBrandHandle={props.showBrandHandle} 
          brandColor={brandColor} 
          isVerified={isVerified} 
          showSlideCounter={props.showSlideCounter} 
          slideCounterPosition={props.slideCounterPosition} 
          brandAvatar={props.brandAvatar} 
          hideDot={true} 
          counterBg="rgba(0,0,0,0.1)" 
          handleColor="#3a2829" 
          counterColor="#3a2829" 
          brandLogo={props.brandLogo} 
          showBrandLogo={props.showBrandLogo} 
          className="pointer-events-auto"
        />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Lobster&family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Alfa+Slab+One&family=Charmonman:wght@700&display=swap');
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-display { font-family: 'Alfa Slab One', cursive; }
        .font-hand { font-family: 'Charmonman', cursive; }
        .font-lobster { font-family: 'Lobster', cursive; }
      `}} />

      <div className="relative w-full h-full bg-[#de1e4d] flex flex-col font-outfit select-none overflow-hidden text-[#3a2829]">
        
        {/* Typography Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6 z-20 mt-[-5%] min-h-0">
          <SmartField field="tag" data={data} index={index} {...sp}>
            <TextWrapper {...sp} as="h2" field="tag" className="text-[20px] font-semibold tracking-tight text-[#3a2829] leading-none mb-1 outline-none" style={{ fontSize: `${40 * sText}px` }}>
              {data.tag || "Venha provar nossas"}
            </TextWrapper>
          </SmartField>

          <SmartField field="titulo" data={data} index={index} {...sp}>
            <TextWrapper {...sp} as="h1" field="titulo" className="font-lobster text-[36px] tracking-wide text-[#3a2829] leading-none mb-4 drop-shadow-sm outline-none" style={{ fontSize: `${42 * sTitle}px` }}>
              {data.titulo || "Tortas variadas"}
            </TextWrapper>
          </SmartField>

          <SmartField field="texto_apoio" data={data} index={index} {...sp} className="min-h-0">
            <TextWrapper {...sp} as="p" field="texto_apoio" className="text-[12px] font-medium leading-snug max-w-[240px] text-[#3a2829]/90 outline-none" style={{ fontSize: `${25 * sText}px` }}>
              {data.texto_apoio || "Desde as tradicionais tortas de frutas até as opções mais cremosas."}
            </TextWrapper>
          </SmartField>
        </div>

        {/* Footer */}
        <div className="w-full px-4 pb-6 mt-auto shrink-0">
          <div className="flex items-center justify-between">
            
            {/* Left: WhatsApp */}
            <div className="flex items-center gap-1.5 flex-1">
              <div className="w-[18px] h-[18px] border-2 border-[#3a2829] rounded-full flex items-center justify-center">
                <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24"><path d="M12.031 21.171l-1.353-.086c-1.84-.117-3.567-.803-5.02-1.996L4.544 20l.965-1.127c-1.168-1.405-1.802-3.136-1.83-4.945-.04-2.584 1.057-4.986 2.92-6.505C8.423 5.926 10.984 5.3 13.56 5.67c2.563.367 4.78 1.776 6.096 3.967 1.309 2.18 1.488 4.793.491 7.127-.991 2.32-2.906 4.08-5.32 4.908-1.597.545-3.342.6-4.966.155l-1.83-.5z" /></svg>
              </div>
              <div className="flex flex-col leading-[1]">
                <span className="text-[7.5px] font-medium text-[#3a2829]">WhatsApp</span>
                <SmartField field="tortaVarPhone" data={data} index={index} {...sp}>
                  <TextWrapper {...sp} as="span" field="tortaVarPhone" className="text-[8.5px] font-black tracking-tight outline-none">
                    {data.tortaVarPhone || "84 9 9999 0000"}
                  </TextWrapper>
                </SmartField>
              </div>
            </div>

            {/* Center: Address */}
            <div className="flex items-center gap-1 flex-[1.2] border-l border-[#3a2829]/20 pl-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px] text-[#3a2829] shrink-0">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div className="flex flex-col leading-[1]">
                <SmartField field="tortaVarAddress1" data={data} index={index} {...sp}>
                  <TextWrapper {...sp} as="span" field="tortaVarAddress1" className="text-[7.5px] font-medium text-[#3a2829] truncate max-w-[90px] outline-none">
                    {data.tortaVarAddress1 || "Rua Antônio Carlos Barreto"}
                  </TextWrapper>
                </SmartField>
                <SmartField field="tortaVarAddress2" data={data} index={index} {...sp}>
                  <TextWrapper {...sp} as="span" field="tortaVarAddress2" className="text-[7.5px] font-medium text-[#3a2829] truncate max-w-[90px] outline-none">
                    {data.tortaVarAddress2 || "Bairro Paulo Freire"}
                  </TextWrapper>
                </SmartField>
              </div>
            </div>
            
            {/* Right: Logos */}
            <div className="flex items-center gap-1.5 pl-2 flex-[0.8] justify-end">
              <span className="font-display italic text-[11px] tracking-tighter text-[#3a2829]">iFood</span>
              <div className="leading-none text-center">
                <span className="text-[5px] font-black block text-[#3a2829]">UBER</span>
                <span className="text-[7px] font-black block text-[#3a2829]">eats</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 80 — Bolo de Cenoura (Capa 21)
// ═══════════════════════════════════════════════════════════
export function SplitVariant80(props) {
  const { data, index, brandColor, brandHandle, isVerified, slideCount, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  const img1 = getCorsSafeUrl(data.imageUrl || "https://images.unsplash.com/photo-1600626333392-202605332717?q=80&w=600&auto=format&fit=crop");

  return (
    <div className="relative w-full h-full flex flex-col justify-between font-outfit select-none overflow-hidden rounded-slide shadow-2xl text-[#402c25] bg-[#f8f5ee]">
      {/* Slide Header flutuando no topo */}
      <div className="absolute top-2 left-0 w-full px-8 z-50 pointer-events-none">
        <SlideHeader 
          data={data} 
          slideIndex={index} 
          onActionStart={onActionStart} 
          selectedElement={selectedElement} 
          onSelectElement={onSelectElement} 
          index={index + 1} 
          total={slideCount} 
          brandHandle={brandHandle} 
          showBrandHandle={props.showBrandHandle} 
          brandColor={brandColor} 
          isVerified={isVerified} 
          showSlideCounter={props.showSlideCounter} 
          slideCounterPosition={props.slideCounterPosition} 
          brandAvatar={props.brandAvatar} 
          hideDot={true} 
          counterBg="rgba(0,0,0,0.1)" 
          handleColor="#402c25" 
          counterColor="#402c25" 
          brandLogo={props.brandLogo} 
          showBrandLogo={props.showBrandLogo} 
          className="pointer-events-auto"
        />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Alfa+Slab+One&family=Charmonman:wght@700&display=swap');
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-display { font-family: 'Alfa Slab One', cursive; }
        .font-hand { font-family: 'Charmonman', cursive; }
      `}} />

      {/* Background Graphics & Big 'C' */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <span className="absolute -top-10 -left-10 text-[20rem] font-outfit font-bold text-[#f29020] opacity-10 leading-none select-none">C</span>
        {/* Formas Orgânicas Pequenas */}
        <svg className="absolute top-20 right-10 w-16 h-16 text-[#c5d833]" viewBox="0 0 100 100" fill="currentColor">
          <path d="M30,10 Q50,0 70,10 Q90,20 90,50 Q90,80 70,90 Q50,100 30,90 Q10,80 10,50 Q10,20 30,10 Z" />
        </svg>
        <svg className="absolute bottom-32 left-10 w-12 h-12 text-[#f29020]" viewBox="0 0 100 100" fill="currentColor">
          <path d="M20,30 Q40,10 60,30 Q80,50 80,70 Q80,90 60,90 Q40,90 20,70 Q0,50 20,30 Z" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col h-full p-6 mt-6">
        <div className="mt-8 shrink-0">
          <SmartField field="titulo" data={data} index={index} {...sp}>
            <TextWrapper {...sp} as="h1" field="titulo" className="font-serif text-[#402c25] text-[2.5rem] font-bold leading-tight tracking-tight outline-none" style={{ fontSize: `${40 * sTitle}px` }}>
              {data.titulo || "BOLO DE CENOURA"}
            </TextWrapper>
          </SmartField>

          <SmartField field="subtitulo" data={data} index={index} {...sp}>
            <TextWrapper {...sp} as="h2" field="subtitulo" className="font-serif text-[#402c25] text-lg font-normal leading-tight mt-2 outline-none" style={{ fontSize: `${18 * sText}px` }}>
              {data.subtitulo || "Com cobertura crocante de chocolate"}
            </TextWrapper>
          </SmartField>
        </div>

        {/* Organic Image Container */}
        <div className="relative flex-1 my-6 min-h-0">
          <SmartField field="imagem" data={data} index={index} {...sp} className="absolute top-1/2 right-0 transform -translate-y-1/2 w-[85%] aspect-[4/5] bg-[#c5d833] rounded-[4rem_2rem_5rem_3rem] overflow-hidden border-4 border-[#f29020] shadow-lg">
            <img src={img1} className="w-full h-full object-cover" alt="Bolo de Cenoura" />
          </SmartField>

          {/* Sticker */}
          <div className="absolute top-1/4 right-[55%] bg-[#f29020] text-white px-4 py-2 rounded-full transform -rotate-12 shadow-md flex items-center gap-1">
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 12h20M2 12l5-5M2 12l5 5" />
            </svg>
            <SmartField field="cenouraSticker" data={data} index={index} {...sp}>
              <TextWrapper {...sp} as="span" field="cenouraSticker" className="text-xs font-bold tracking-wide whitespace-nowrap outline-none">
                {data.cenouraSticker || "Receita no forno!"}
              </TextWrapper>
            </SmartField>
          </div>
        </div>

        {/* Bottom Block */}
        <div className="bg-[#f29020] p-5 rounded-2xl flex items-center justify-between relative z-10 shrink-0">
          <SmartField field="texto_apoio" data={data} index={index} {...sp} className="max-w-[60%]">
            <TextWrapper {...sp} as="p" field="texto_apoio" className="text-white text-xs font-medium leading-snug outline-none" style={{ fontSize: `${12 * sText}px` }}>
              {data.texto_apoio || "A torta perfeita para o seu café da tarde. Simples, fofinha e irresistível!"}
            </TextWrapper>
          </SmartField>
          <SmartField field="cenouraBtn" data={data} index={index} {...sp}>
            <TextWrapper {...sp} as="button" field="cenouraBtn" className="bg-[#c5d833] text-white font-outfit font-bold text-xs px-5 py-2.5 rounded-full uppercase tracking-wider hover:bg-[#b0c22a] transition-colors outline-none">
              {data.cenouraBtn || "VER RECEITA"}
            </TextWrapper>
          </SmartField>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 81 — Qual Favorito (Capa 36)
// ═══════════════════════════════════════════════════════════
export function SplitVariant81(props) {
  const { data, index, brandColor, brandHandle, isVerified, slideCount, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  const img1 = getCorsSafeUrl(data.imageUrl || "https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=600&auto=format&fit=crop");
  const img2 = getCorsSafeUrl(data.imageUrl2 || "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=600&auto=format&fit=crop");
  const img3 = getCorsSafeUrl(data.imageUrl3 || "https://blogdeconfeitaria.com/wp-content/uploads/2024/10/brigadeiro-leite-ninho-com-nutella.jpg");

  return (
    <div className="relative w-full h-full flex flex-col justify-between font-outfit select-none overflow-hidden rounded-slide shadow-2xl bg-[#1dbdb2] text-[#5c2d1b]">
      {/* Slide Header flutuando no topo */}
      <div className="absolute top-2 left-0 w-full px-8 z-50 pointer-events-none">
        <SlideHeader 
          data={data} 
          slideIndex={index} 
          onActionStart={onActionStart} 
          selectedElement={selectedElement} 
          onSelectElement={onSelectElement} 
          index={index + 1} 
          total={slideCount} 
          brandHandle={brandHandle} 
          showBrandHandle={props.showBrandHandle} 
          brandColor={brandColor} 
          isVerified={isVerified} 
          showSlideCounter={props.showSlideCounter} 
          slideCounterPosition={props.slideCounterPosition} 
          brandAvatar={props.brandAvatar} 
          hideDot={true} 
          counterBg="rgba(0,0,0,0.1)" 
          handleColor="#5c2d1b" 
          counterColor="#5c2d1b" 
          brandLogo={props.brandLogo} 
          showBrandLogo={props.showBrandLogo} 
          className="pointer-events-auto"
        />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Lobster&family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Alfa+Slab+One&family=Charmonman:wght@700&display=swap');
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-display { font-family: 'Alfa Slab One', cursive; }
        .font-hand { font-family: 'Charmonman', cursive; }
        .font-lobster { font-family: 'Lobster', cursive; }
      `}} />

      {/* Fundo com textura "noise" pesada simulando papel */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40 mix-blend-color-burn" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      {/* Fita Laranja Inferior */}
      <div className="absolute bottom-0 w-full h-[15%] bg-[#ff5e4d] z-0" />

      {/* Arroba e Header */}
      <div className="relative z-10 w-full text-center mt-8">
        <SmartField field="favArroba" data={data} index={index} {...sp}>
          <TextWrapper {...sp} as="span" field="favArroba" className="text-white text-[10px] font-medium tracking-wide outline-none">
            {data.favArroba || brandHandle || "@comamorconfeito"}
          </TextWrapper>
        </SmartField>
      </div>

      {/* Título Principal (Estilo Retro Rounded) */}
      <div className="relative z-20 flex flex-col items-center justify-center mt-6 mb-4">
         <SmartField field="favTitle1" data={data} index={index} {...sp}>
           <TextWrapper {...sp} as="h2" field="favTitle1" className="font-display text-[#fcf0d1] text-[36px] leading-[0.8] tracking-wider transform -rotate-2 outline-none" style={{ WebkitTextStroke: '2.5px #ab4a2c', textShadow: '2px 3px 0px #ab4a2c', fontSize: `${36 * sTitle}px` }}>
             {data.favTitle1 || "Qual o seu"}
           </TextWrapper>
         </SmartField>
         <SmartField field="titulo" data={data} index={index} {...sp}>
           <TextWrapper {...sp} as="h1" field="titulo" className="font-display text-[#fcf0d1] text-[48px] leading-[0.85] tracking-tight transform -rotate-2 -ml-2 outline-none" style={{ WebkitTextStroke: '2.5px #ab4a2c', textShadow: '3px 4px 0px #ab4a2c', fontSize: `${48 * sTitle}px` }}>
             {data.titulo || "FAVORITO?"}
           </TextWrapper>
         </SmartField>
      </div>

      {/* Card Central (Amarelo Pastel) */}
      <div className="relative z-20 flex-1 flex flex-col items-center w-full px-5 mt-2 min-h-0">
         <div className="w-full bg-[#fdf5cc] border-[2px] border-[#5c2d1b] rounded-3xl pb-10 pt-6 px-3 shadow-sm relative">
            
            {/* Grid dos 3 Itens */}
            <div className="flex justify-between items-start gap-1">
              
              {/* Item 1 */}
              <div className="flex flex-col items-center flex-1">
                 <div className="w-[65px] h-[65px] relative mb-2 flex items-center justify-center">
                    {/* SVG Starburst Azul */}
                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-[#1dbdb2]" fill="currentColor" stroke="#ff5e4d" strokeWidth="4">
                       <path d="M50 2 L58 18 L75 14 L77 31 L94 36 L85 50 L94 64 L77 69 L75 86 L58 82 L50 98 L42 82 L25 86 L23 69 L6 64 L15 50 L6 36 L23 31 L25 14 L42 18 Z" />
                    </svg>
                    {/* Imagem Redonda */}
                    <SmartField field="imagem" data={data} index={index} {...sp} className="relative z-10 w-[75%] h-[75%] rounded-full overflow-hidden border-2 border-white/50 bg-white">
                      <img src={img1} className="w-full h-full object-cover" alt="Macarons" />
                    </SmartField>
                 </div>
                 <SmartField field="favItem1" data={data} index={index} {...sp}>
                   <TextWrapper {...sp} as="p" field="favItem1" className="text-[11px] font-outfit text-[#5c2d1b] leading-tight text-center font-medium whitespace-pre-line outline-none" style={{ fontSize: `${11 * sText}px` }}>
                     {data.favItem1 || "Macarons\nmacios"}
                   </TextWrapper>
                 </SmartField>
              </div>

              {/* Item 2 */}
              <div className="flex flex-col items-center flex-1">
                 <div className="w-[65px] h-[65px] relative mb-2 flex items-center justify-center">
                    {/* SVG Starburst Azul */}
                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-[#1dbdb2]" fill="currentColor" stroke="#ff5e4d" strokeWidth="4">
                       <path d="M50 2 L58 18 L75 14 L77 31 L94 36 L85 50 L94 64 L77 69 L75 86 L58 82 L50 98 L42 82 L25 86 L23 69 L6 64 L15 50 L6 36 L23 31 L25 14 L42 18 Z" />
                    </svg>
                    {/* Imagem Redonda */}
                    <SmartField field="imagem2" data={data} index={index} {...sp} className="relative z-10 w-[75%] h-[75%] rounded-full overflow-hidden border-2 border-white/50 bg-white">
                      <img src={img2} className="w-full h-full object-cover scale-125" alt="Cookie" />
                    </SmartField>
                 </div>
                 <SmartField field="favItem2" data={data} index={index} {...sp}>
                   <TextWrapper {...sp} as="p" field="favItem2" className="text-[11px] font-outfit text-[#5c2d1b] leading-tight text-center font-medium whitespace-pre-line outline-none" style={{ fontSize: `${11 * sText}px` }}>
                     {data.favItem2 || "Cookies\ncrocantes"}
                   </TextWrapper>
                 </SmartField>
              </div>

              {/* Item 3 */}
              <div className="flex flex-col items-center flex-1">
                 <div className="w-[65px] h-[65px] relative mb-2 flex items-center justify-center">
                    {/* SVG Starburst Azul */}
                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-[#1dbdb2]" fill="currentColor" stroke="#ff5e4d" strokeWidth="4">
                       <path d="M50 2 L58 18 L75 14 L77 31 L94 36 L85 50 L94 64 L77 69 L75 86 L58 82 L50 98 L42 82 L25 86 L23 69 L6 64 L15 50 L6 36 L23 31 L25 14 L42 18 Z" />
                    </svg>
                    {/* Imagem Redonda */}
                    <SmartField field="imagem3" data={data} index={index} {...sp} className="relative z-10 w-[75%] h-[75%] rounded-full overflow-hidden border-2 border-white/50 bg-white">
                      <img src={img3} className="w-full h-full object-cover scale-150" alt="Brigadeiro" />
                    </SmartField>
                 </div>
                 <SmartField field="favItem3" data={data} index={index} {...sp}>
                   <TextWrapper {...sp} as="p" field="favItem3" className="text-[11px] font-outfit text-[#5c2d1b] leading-tight text-center font-medium whitespace-pre-line outline-none" style={{ fontSize: `${11 * sText}px` }}>
                     {data.favItem3 || "Brigadeiros\ncremosos"}
                   </TextWrapper>
                 </SmartField>
              </div>

            </div>

            {/* Botão de CTA flutuando sobre a borda inferior do card */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
               <SmartField field="favBtn" data={data} index={index} {...sp}>
                 <TextWrapper {...sp} as="button" field="favBtn" className="bg-[#ab4a2c] text-white px-6 py-2.5 rounded-2xl text-[12px] font-outfit tracking-wide hover:scale-105 transition-transform border border-[#5c2d1b] outline-none">
                   {data.favBtn || "Deixa nos comentários!"}
                 </TextWrapper>
               </SmartField>
            </div>
         </div>
      </div>

      {/* Rodapé na Fita Laranja */}
      <div className="relative z-20 flex justify-between items-center w-full px-6 pb-6 mt-auto shrink-0">
         <SmartField field="favContact" data={data} index={index} {...sp} className="flex-1 text-left">
           <TextWrapper {...sp} as="span" field="favContact" className="text-white text-[8px] font-light tracking-wide opacity-90 outline-none">
             {data.favContact || "(11) 1234-5678 - telefone e whatsapp"}
           </TextWrapper>
         </SmartField>
         <div className="h-4 w-[1px] bg-white opacity-40 mx-2 shrink-0" />
         <SmartField field="favAddress" data={data} index={index} {...sp} className="flex-1 text-right">
           <TextWrapper {...sp} as="span" field="favAddress" className="text-white text-[8px] font-light tracking-wide opacity-90 outline-none">
             {data.favAddress || "Rua do Doce, n° 105"}
           </TextWrapper>
         </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 82 — Lembrete Cheesecake (Capa 38)
// ═══════════════════════════════════════════════════════════
export function SplitVariant82(props) {
  const { data, index, brandColor, brandHandle, isVerified, slideCount, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  const img1 = getCorsSafeUrl(data.imageUrl || "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=600&auto=format&fit=crop");
  const imgMorango = "https://images.unsplash.com/photo-1518015527376-7871b6d05f32?q=80&w=200&auto=format&fit=crop";

  return (
    <div className="relative w-full h-full flex flex-col justify-between font-outfit select-none overflow-hidden rounded-slide shadow-2xl text-[#d94a6b] bg-[#fde5ec]">
      {/* Slide Header flutuando no topo */}
      <div className="absolute top-2 left-0 w-full px-8 z-50 pointer-events-none">
        <SlideHeader 
          data={data} 
          slideIndex={index} 
          onActionStart={onActionStart} 
          selectedElement={selectedElement} 
          onSelectElement={onSelectElement} 
          index={index + 1} 
          total={slideCount} 
          brandHandle={brandHandle} 
          showBrandHandle={props.showBrandHandle} 
          brandColor={brandColor} 
          isVerified={isVerified} 
          showSlideCounter={props.showSlideCounter} 
          slideCounterPosition={props.slideCounterPosition} 
          brandAvatar={props.brandAvatar} 
          hideDot={true} 
          counterBg="rgba(0,0,0,0.1)" 
          handleColor="#d94a6b" 
          counterColor="#d94a6b" 
          brandLogo={props.brandLogo} 
          showBrandLogo={props.showBrandLogo} 
          className="pointer-events-auto"
        />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Lobster&family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Alfa+Slab+One&family=Charmonman:wght@700&display=swap');
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-display { font-family: 'Alfa Slab One', cursive; }
        .font-hand { font-family: 'Charmonman', cursive; }
        .font-lobster { font-family: 'Lobster', cursive; }
      `}} />

      {/* Background Blobs Corners (Ondas do Topo e da Base) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Ondas do Topo (Desce -> Sobe -> Desce -> Sobe) */}
        <svg className="absolute top-0 left-0 w-full h-[9%] text-[#ef3d76] opacity-80" viewBox="0 0 1000 100" fill="currentColor" preserveAspectRatio="none">
          <path d="M 0,0 L 1000,0 L 1000,80 C 950,80 916,20 833,20 C 750,20 716,80 666,80 C 583,80 550,20 500,20 C 416,20 383,80 333,80 C 250,80 216,20 166,20 C 83,20 50,80 0,80 Z" />
        </svg>
        {/* Ondas da Base (Sobe -> Desce -> Sobe -> Desce) */}
        <svg className="absolute bottom-0 left-0 w-full h-[9%] text-[#ef3d76] opacity-80" viewBox="0 0 1000 100" fill="currentColor" preserveAspectRatio="none">
          <path d="M 0,100 L 1000,100 L 1000,20 C 950,20 916,80 833,80 C 750,80 716,20 666,20 C 583,20 550,80 500,80 C 416,80 383,20 333,20 C 250,20 216,80 166,80 C 83,80 50,20 0,20 Z" />
        </svg>
      </div>

      {/* Card Central Branco */}
      <div 
        style={{ width: 'calc(82% - 14px)', top: '68.8px' }}
        className="relative z-20 h-[63%] bg-white rounded-xl shadow-[0_25px_55px_rgba(0,0,0,0.12)] p-6 pb-0 flex flex-col items-start overflow-hidden mx-auto my-auto mt-6 mb-4 shrink-0"
      >
        
        {/* Header: Logo e Arroba */}
        <div className="flex items-center gap-3 mb-4 w-full shrink-0">
          <div className="w-9 h-9 bg-[#fde5ec] border border-[#ef3d76]/20 rounded-full flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden">
             <span className="font-lobster text-[#ef3d76] text-xs z-10">C</span>
             <svg className="absolute w-full h-full text-[#ef3d76] opacity-30" viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM11 19.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.22.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
             </svg>
          </div>
          <div className="flex flex-col items-start relative -top-[5px]">
            <SmartField field="lembreteLogo" data={data} index={index} {...sp}>
              <TextWrapper {...sp} as="span" field="lembreteLogo" className="font-display text-[#ef3d76] text-xl tracking-tight leading-none mb-0.5 mt-[9px] relative top-[5px] inline-block outline-none">
                {data.lembreteLogo || "Mari Confeitaria"}
              </TextWrapper>
            </SmartField>
            <SmartField field="lembreteArroba" data={data} index={index} {...sp}>
              <TextWrapper {...sp} as="span" field="lembreteArroba" className="font-outfit text-zinc-400 text-[10px] font-medium tracking-wide outline-none">
                {data.lembreteArroba || brandHandle || "@comie_bomboniere"}
              </TextWrapper>
            </SmartField>
          </div>
        </div>

        {/* Texto Principal (Mix Bold / Light) */}
        <div className="w-full text-left mb-5 shrink-0">
          <p className="text-[15px] font-medium leading-[1.25] tracking-tight text-[#f77e9e]" style={{ fontSize: `${23 * sText}px` }}>
            <SmartField field="titulo" data={data} index={index} {...sp} className="inline">
              <TextWrapper {...sp} as="span" field="titulo" className="outline-none whitespace-pre-line">
                {data.titulo || "Lembrete rápido: o doce que você não para de pensar está aqui na Comiê"}
              </TextWrapper>
            </SmartField>
          </p>
        </div>

        {/* Imagem do Cheesecake (Com Overlap para baixo) */}
        <SmartField field="imagem" data={data} index={index} {...sp} className="relative w-[110%] -ml-[5%] h-32 mt-2 bg-zinc-100 rounded-t-xl overflow-hidden shadow-inner flex-1 min-h-0">
          <img 
            src={img1} 
            crossOrigin="anonymous"
            className="w-full h-full object-cover object-bottom" 
            alt="Cheesecake" 
          />
        </SmartField>

      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 83 — Bella Vontade Doce (Capa 46)
// ═══════════════════════════════════════════════════════════
export function SplitVariant83(props) {
  const { data, index, brandColor, brandHandle, isVerified, slideCount, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  const img1 = getCorsSafeUrl(data.imageUrl || "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=600&auto=format&fit=crop");

  return (
    <div className="relative w-full h-full flex flex-col justify-between font-outfit select-none overflow-hidden rounded-slide shadow-2xl text-white bg-[#00a8a8]">
      {/* Slide Header flutuando no topo */}
      <div className="absolute top-2 left-0 w-full px-8 z-50 pointer-events-none">
        <SlideHeader 
          data={data} 
          slideIndex={index} 
          onActionStart={onActionStart} 
          selectedElement={selectedElement} 
          onSelectElement={onSelectElement} 
          index={index + 1} 
          total={slideCount} 
          brandHandle={brandHandle} 
          showBrandHandle={props.showBrandHandle} 
          brandColor={brandColor} 
          isVerified={isVerified} 
          showSlideCounter={props.showSlideCounter} 
          slideCounterPosition={props.slideCounterPosition} 
          brandAvatar={props.brandAvatar} 
          hideDot={true} 
          counterBg="rgba(0,0,0,0.1)" 
          handleColor="#white" 
          counterColor="#white" 
          brandLogo={props.brandLogo} 
          showBrandLogo={props.showBrandLogo} 
          className="pointer-events-auto"
        />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Lobster&family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Alfa+Slab+One&family=Charmonman:wght@700&display=swap');
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-display { font-family: 'Alfa Slab One', cursive; }
        .font-hand { font-family: 'Charmonman', cursive; }
        .font-lobster { font-family: 'Lobster', cursive; }
      `}} />

      {/* Top Split Background (Turquoise & Magenta) */}
      <div className="absolute top-0 left-0 w-full h-[55%] bg-[#55c5c5] z-0 overflow-hidden shrink-0">
         {/* Bloco Magenta Angulado */}
         <div className="absolute top-[-20%] left-[-30%] w-[100%] h-[150%] bg-[#e6007e] transform rotate-[15deg] z-0" />
         
         {/* Gotas de Chocolate Flutuantes (Simuladas) */}
         <div className="absolute top-[8%] right-[25%] w-5 h-5 bg-[#3a2012] rounded-full blur-[1.5px] opacity-90 shadow-sm" />
         <div className="absolute top-[25%] left-[8%] w-4 h-4 bg-[#3a2012] rounded-full blur-[1px] opacity-80 shadow-sm" />
         <div className="absolute bottom-[20%] right-[10%] w-6 h-6 bg-[#3a2012] rounded-full blur-[2px] opacity-90 transform -rotate-12 shadow-md" />
      </div>

      {/* Main Image: Cookie/Pie on Bamboo Board */}
      <div className="relative z-10 w-full h-[55%] flex items-end justify-center mt-[-4%] shrink-0">
         {/* Contêiner da tábua rotacionado sutilmente */}
         <SmartField field="imagem" data={data} index={index} {...sp} className="w-[125%] ml-[-5%] overflow-hidden">
            <img 
              src={img1} 
              crossOrigin="anonymous"
              className="w-full h-full object-cover object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)] transform -rotate-2" 
              alt="Cookie Pie on Board" 
            />
         </SmartField>
      </div>

      {/* Bottom Content Area */}
      <div className="relative z-20 flex-1 flex items-center justify-between px-6 pb-4 min-h-0 bg-[#00a8a8]">
         
         {/* Left Side: Typography */}
         <div className="flex flex-col flex-[1.2] items-start pt-2 min-w-0">
            <SmartField field="titulo" data={data} index={index} {...sp} className="w-full">
              <TextWrapper {...sp} as="h1" field="titulo" className="font-outfit font-black text-[34px] leading-[0.9] tracking-tighter text-white drop-shadow-sm mb-2 outline-none whitespace-pre-line" style={{ fontSize: `${34 * sTitle}px` }}>
                {data.titulo || "VONTADE\nDE DOCE?"}
              </TextWrapper>
            </SmartField>
            <SmartField field="subtitulo" data={data} index={index} {...sp} className="w-full">
              <TextWrapper {...sp} as="h2" field="subtitulo" className="font-serif font-bold text-[#442614] text-[26px] leading-[0.95] tracking-tight outline-none whitespace-pre-line" style={{ fontSize: `${26 * sText}px` }}>
                {data.subtitulo || "A Bella vai\naté você!"}
              </TextWrapper>
            </SmartField>
         </div>

         {/* Vertical Divider */}
         <div className="w-[1.5px] bg-white h-[65%] mx-3 opacity-90 rounded-full shrink-0" />

         {/* Right Side: CTA & Logo */}
         <div className="flex flex-col flex-1 items-end justify-between h-full pt-4 pb-2 min-w-0">
            <SmartField field="texto_apoio" data={data} index={index} {...sp} className="w-full text-right mb-auto min-h-0">
              <TextWrapper {...sp} as="p" field="texto_apoio" className="font-outfit font-light text-[#442614] text-[13.5px] leading-[1.2] text-right whitespace-pre-line tracking-tight outline-none" style={{ fontSize: `${13.5 * sText}px` }}>
                {data.texto_apoio || "Clique no link\nda bio e peça agora!"}
              </TextWrapper>
            </SmartField>
            
            {/* Logo "Bella Doceria" */}
            <div className="flex flex-col items-center mt-4 shrink-0">
               <SmartField field="bellaVontadeLogo" data={data} index={index} {...sp}>
                 <TextWrapper {...sp} as="span" field="bellaVontadeLogo" className="font-lobster text-white text-[32px] leading-none drop-shadow-sm tracking-wide outline-none">
                   {data.bellaVontadeLogo || "Bella"}
                 </TextWrapper>
               </SmartField>
               <SmartField field="bellaVontadeLogoSub" data={data} index={index} {...sp}>
                 <TextWrapper {...sp} as="span" field="bellaVontadeLogoSub" className="font-outfit font-black text-white text-[6.5px] tracking-[0.35em] uppercase mt-0.5 outline-none">
                   {data.bellaVontadeLogoSub || "DOCERIA"}
                 </TextWrapper>
               </SmartField>
            </div>
         </div>

      </div>
    </div>
  );
}

export function SplitVariant84(props) {
  const { data, index, brandColor, brandHandle, isVerified, slideCount, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sText = textScale / 100;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  const img1 = getCorsSafeUrl(data.imageUrl || "https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=600&auto=format&fit=crop");
  const img2 = getCorsSafeUrl(data.imageUrl2 || "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=600&auto=format&fit=crop");
  const img3 = getCorsSafeUrl(data.imageUrl3 || "https://images.unsplash.com/photo-1505394033-7303e47a76c5?q=80&w=600&auto=format&fit=crop");
  const img4 = getCorsSafeUrl(data.imageUrl4 || "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=600&auto=format&fit=crop");

  return (
    <div className="relative w-full h-full bg-[#f64c1c] flex flex-col font-outfit select-none overflow-hidden rounded-slide shadow-2xl text-white">
      {/* Slide Header flutuando no topo */}
      <div className="absolute top-2 left-0 w-full px-8 z-40 pointer-events-none">
        <SlideHeader 
          data={data} 
          slideIndex={index} 
          onActionStart={onActionStart} 
          selectedElement={selectedElement} 
          onSelectElement={onSelectElement} 
          index={index + 1} 
          total={slideCount} 
          brandHandle={brandHandle} 
          showBrandHandle={props.showBrandHandle} 
          brandColor={brandColor} 
          isVerified={isVerified} 
          showSlideCounter={props.showSlideCounter} 
          slideCounterPosition={props.slideCounterPosition} 
          brandAvatar={props.brandAvatar} 
          hideDot={true} 
          counterBg="rgba(0,0,0,0.15)" 
          handleColor="white" 
          counterColor="white" 
          brandLogo={props.brandLogo} 
          showBrandLogo={props.showBrandLogo} 
          className="pointer-events-auto"
        />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Alfa+Slab+One&family=Charmonman:wght@700&family=Lobster&display=swap');
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-display { font-family: 'Alfa Slab One', cursive; }
        .font-hand { font-family: 'Charmonman', cursive; }
        .font-lobster { font-family: 'Lobster', cursive; }
      `}} />

      {/* Pílula Central Absoluta com Z-Index alto */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 bg-[#f64c1c] text-white px-5 py-2.5 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
        <SmartField field="subtitulo" data={data} index={index} {...sp}>
          <TextWrapper {...sp} as="span" field="subtitulo" className="font-bold text-[16px] tracking-wide block leading-none outline-none text-center" style={{ fontSize: `${16 * sText}px`, fontFamily: textFont }}>
            {data.subtitulo || "Qual o melhor?"}
          </TextWrapper>
        </SmartField>
      </div>

      {/* Logo Branco Flutuante (Centralizado Horizontalmente, ancorado ao Topo) */}
      <div className="absolute top-[52px] left-1/2 -translate-x-1/2 bg-white rounded-b-2xl px-3 pb-2.5 pt-2 shadow-lg z-30 flex items-center justify-center gap-1.5 border-b border-x border-black/5">
        <div className="w-[30px] h-[30px] relative shrink-0">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="#3c1d0f" />
            <circle cx="50" cy="50" r="35" fill="#fcaebb" />
            <circle cx="50" cy="50" r="15" fill="#f64c1c" />
            <circle cx="50" cy="25" r="4" fill="#fcae12" />
            <circle cx="50" cy="75" r="4" fill="#fcae12" />
            <circle cx="25" cy="50" r="4" fill="#fcae12" />
            <circle cx="75" cy="50" r="4" fill="#fcae12" />
          </svg>
        </div>
        <div className="flex flex-col text-left shrink-0">
          <SmartField field="halloweenLogoTop" data={data} index={index} {...sp}>
            <TextWrapper {...sp} as="span" field="halloweenLogoTop" className="text-[#3c1d0f] font-bold text-[8px] leading-none tracking-tight uppercase outline-none">
              {data.halloweenLogoTop || "Mari"}
            </TextWrapper>
          </SmartField>
          <SmartField field="halloweenLogoBottom" data={data} index={index} {...sp}>
            <TextWrapper {...sp} as="span" field="halloweenLogoBottom" className="text-[#3c1d0f] font-normal text-[8px] leading-none tracking-tight outline-none mt-0.5">
              {data.halloweenLogoBottom || "Confeita"}
            </TextWrapper>
          </SmartField>
        </div>
      </div>

      {/* Top Half Grid */}
      <div className="flex w-full h-[50%]">
        {/* Quadrante 1 */}
        <div className="w-1/2 h-full relative border-r border-b border-white/20 bg-zinc-800">
          <SmartField field="imagem" data={data} index={index} {...sp} className="w-full h-full z-0">
            <img src={img1} crossOrigin="anonymous" className="w-full h-full object-cover opacity-90" alt="Cake 1" />
          </SmartField>
          <div className="absolute top-3 left-3 bg-[#f64c1c] text-white w-8 h-8 rounded-br-2xl rounded-tl-md flex items-center justify-center shadow-md z-30 pointer-events-none">
            <span className="font-black text-xl">1</span>
          </div>
        </div>
        {/* Quadrante 2 */}
        <div className="w-1/2 h-full relative border-b border-white/20 bg-zinc-800">
          <SmartField field="imagem2" data={data} index={index} {...sp} className="w-full h-full z-0">
            <img src={img2} crossOrigin="anonymous" className="w-full h-full object-cover opacity-90" alt="Cake 2" />
          </SmartField>
          <div className="absolute top-3 right-3 bg-[#f64c1c] text-white w-8 h-8 rounded-bl-2xl rounded-tr-md flex items-center justify-center shadow-md z-30 pointer-events-none">
            <span className="font-black text-xl">2</span>
          </div>
        </div>
      </div>

      {/* Bottom Half Grid */}
      <div className="flex w-full h-[50%]">
        {/* Quadrante 3 */}
        <div className="w-1/2 h-full relative border-r border-white/20 bg-zinc-800">
          <SmartField field="imagem3" data={data} index={index} {...sp} className="w-full h-full z-0">
            <img src={img3} crossOrigin="anonymous" className="w-full h-full object-cover opacity-90" alt="Cake 3" />
          </SmartField>
          <div className="absolute top-3 left-3 bg-[#f64c1c] text-white w-8 h-8 rounded-tr-2xl rounded-bl-md flex items-center justify-center shadow-md z-30 pointer-events-none">
            <span className="font-black text-xl">3</span>
          </div>
        </div>
        {/* Quadrante 4 */}
        <div className="w-1/2 h-full relative bg-zinc-800">
          <SmartField field="imagem4" data={data} index={index} {...sp} className="w-full h-full z-0">
            <img src={img4} crossOrigin="anonymous" className="w-full h-full object-cover opacity-90" alt="Cake 4" />
          </SmartField>
          <div className="absolute top-3 right-3 bg-[#f64c1c] text-white w-8 h-8 rounded-tl-2xl rounded-br-md flex items-center justify-center shadow-md z-30 pointer-events-none">
            <span className="font-black text-xl">4</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SplitVariant85(props) {
  const { data, index, brandColor, brandHandle, isVerified, slideCount, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  const img1 = getCorsSafeUrl(data.imageUrl || "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=600&auto=format&fit=crop");

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between font-montserrat select-none overflow-hidden text-[#432311] py-8 rounded-slide shadow-2xl bg-[#efede7]">
      {/* Slide Header flutuando no topo */}
      <div className="absolute top-2 left-0 w-full px-8 z-50 pointer-events-none">
        <SlideHeader 
          data={data} 
          slideIndex={index} 
          onActionStart={onActionStart} 
          selectedElement={selectedElement} 
          onSelectElement={onSelectElement} 
          index={index + 1} 
          total={slideCount} 
          brandHandle={brandHandle} 
          showBrandHandle={props.showBrandHandle} 
          brandColor={brandColor} 
          isVerified={isVerified} 
          showSlideCounter={props.showSlideCounter} 
          slideCounterPosition={props.slideCounterPosition} 
          brandAvatar={props.brandAvatar} 
          hideDot={true} 
          counterBg="rgba(0,0,0,0.06)" 
          handleColor="#432311" 
          counterColor="#432311" 
          brandLogo={props.brandLogo} 
          showBrandLogo={props.showBrandLogo} 
          className="pointer-events-auto"
        />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Alfa+Slab+One&family=Charmonman:wght@700&family=Lobster&family=League+Gothic&family=Montserrat:wght@400;600;800;900&display=swap');
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-display { font-family: 'Alfa Slab One', cursive; }
        .font-hand { font-family: 'Charmonman', cursive; }
        .font-lobster { font-family: 'Lobster', cursive; }
        .font-gothic { font-family: 'League Gothic', sans-serif; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
      `}} />

      {/* Padrões de Mandalas Simulados (SVGs de Fundo para textura) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-0">
         {/* Center */}
         <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64" viewBox="0 0 100 100" fill="currentColor">
           <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="15 10"/>
           <circle cx="50" cy="50" r="25" fill="currentColor" />
         </svg>
         {/* Top Left */}
         <svg className="absolute -top-10 -left-10 w-48 h-48" viewBox="0 0 100 100" fill="currentColor">
           <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="20 15"/>
           <circle cx="50" cy="50" r="15" fill="currentColor" />
         </svg>
         {/* Top Right */}
         <svg className="absolute -top-10 -right-10 w-48 h-48" viewBox="0 0 100 100" fill="currentColor">
           <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="20 15"/>
           <circle cx="50" cy="50" r="15" fill="currentColor" />
         </svg>
      </div>

      {/* Elementos Blurry (Blocos de Chocolate Fora de Foco) */}
      <div className="absolute top-0 left-[-15%] w-32 h-32 bg-[#432311] rotate-12 blur-[6px] opacity-90 shadow-2xl z-10 pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-10%] w-40 h-40 bg-[#432311] -rotate-12 blur-[8px] opacity-90 shadow-2xl z-10 pointer-events-none" />

      {/* Header: Logo da Luana */}
      <div className="relative z-20 flex flex-col items-center mt-6">
        <div className="flex items-center justify-center gap-2">
          <div className="w-[38px] h-[38px] relative shrink-0">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-sm">
              <circle cx="50" cy="50" r="45" fill="#3c1d0f" />
              <circle cx="50" cy="50" r="35" fill="#fcaebb" />
              <circle cx="50" cy="50" r="15" fill="#e9582d" />
              <circle cx="50" cy="25" r="4" fill="#fcae12" />
              <circle cx="50" cy="75" r="4" fill="#fcae12" />
              <circle cx="25" cy="50" r="4" fill="#fcae12" />
              <circle cx="75" cy="50" r="4" fill="#fcae12" />
            </svg>
          </div>
          <div className="flex flex-col text-left justify-center pt-0.5 shrink-0">
            <SmartField field="halloweenLogoTop" data={data} index={index} {...sp}>
              <TextWrapper {...sp} as="span" field="halloweenLogoTop" className="text-[#3c1d0f] font-bold text-[10.5px] leading-none tracking-tight outline-none">
                {data.halloweenLogoTop || "Confeitaria"}
              </TextWrapper>
            </SmartField>
            <SmartField field="halloweenLogoBottom" data={data} index={index} {...sp}>
              <TextWrapper {...sp} as="span" field="halloweenLogoBottom" className="text-[#3c1d0f] font-normal text-[10px] leading-none tracking-tight outline-none mt-0.5">
                {data.halloweenLogoBottom || "da Luana"}
              </TextWrapper>
            </SmartField>
          </div>
        </div>
      </div>

      {/* Título Principal Bicolor com Linhas Horizontais */}
      <div className="relative z-20 flex flex-col items-center mt-3 mb-2 w-full px-6 text-center">
        <div className="flex items-center w-full justify-center gap-3">
           <div className="h-[3.5px] w-12 bg-[#432311] rounded-full shrink-0" />
           <SmartField field="titulo" data={data} index={index} {...sp} className="shrink-0">
             <TextWrapper {...sp} as="h1" field="titulo" className="font-montserrat font-black text-[38px] leading-none tracking-tight text-[#432311] outline-none" style={{ fontSize: `${38 * sTitle}px` }}>
               {data.titulo || "TORTA"}
             </TextWrapper>
           </SmartField>
           <div className="h-[3.5px] w-12 bg-[#432311] rounded-full shrink-0" />
        </div>
        <SmartField field="titulo2" data={data} index={index} {...sp} className="w-full mt-1">
          <TextWrapper {...sp} as="h1" field="titulo2" className="font-montserrat font-black text-[36px] leading-[0.8] tracking-tight text-[#e9582d] outline-none" style={{ fontSize: `${36 * sTitle}px` }}>
            {data.titulo2 || "INTENSA"}
          </TextWrapper>
        </SmartField>
      </div>

      {/* Imagem Central Arredondada (Bolo Texturizado) */}
      <div className="relative z-20 w-[88%] aspect-[4/3] rounded-[2rem] overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.15)] bg-white">
        <SmartField field="imagem" data={data} index={index} {...sp} className="w-full h-full">
          <img 
            src={img1} 
            className="w-full h-full object-cover object-bottom" 
            alt="Fatia de Torta Intensa" 
            crossOrigin="anonymous"
          />
        </SmartField>
      </div>

      {/* Textos Inferiores (Descrição + Destaque) */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 mt-4">
         <SmartField field="subtitulo" data={data} index={index} {...sp} className="w-full">
           <TextWrapper {...sp} as="p" field="subtitulo" className="font-montserrat font-semibold text-[13.5px] leading-[1.3] text-[#432311] mb-4 outline-none" style={{ fontSize: `${13.5 * sText}px` }}>
             {data.subtitulo || "Sabor intenso de chocolate e base crocante de biscoito transformam essa sobremesa em um clássico familiar que atravessa gerações."}
           </TextWrapper>
         </SmartField>
         
         <SmartField field="texto_apoio" data={data} index={index} {...sp} className="w-full">
           <TextWrapper {...sp} as="h3" field="texto_apoio" className="font-montserrat font-extrabold text-[18px] leading-[1.1] tracking-tight text-[#e9582d] whitespace-pre-line outline-none" style={{ fontSize: `${18 * sText}px` }}>
             {data.texto_apoio || "Todo mundo adora essa\ntorta de chocolate!"}
           </TextWrapper>
         </SmartField>
      </div>
    </div>
  );
}

export function SplitVariant86(props) {
  const { data, index, brandColor, brandHandle, isVerified, slideCount, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  const img1 = getCorsSafeUrl(data.imageUrl || "https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=600&auto=format&fit=crop");

  return (
    <div className="relative w-full h-full bg-[#FAF1EA] flex flex-col justify-between font-outfit select-none overflow-hidden rounded-slide shadow-2xl text-zinc-800">
      {/* Slide Header flutuando no topo */}
      <div className="absolute top-2 left-0 w-full px-8 z-40 pointer-events-none">
        <SlideHeader 
          data={data} 
          slideIndex={index} 
          onActionStart={onActionStart} 
          selectedElement={selectedElement} 
          onSelectElement={onSelectElement} 
          index={index + 1} 
          total={slideCount} 
          brandHandle={brandHandle} 
          showBrandHandle={props.showBrandHandle} 
          brandColor={brandColor} 
          isVerified={isVerified} 
          showSlideCounter={props.showSlideCounter} 
          slideCounterPosition={props.slideCounterPosition} 
          brandAvatar={props.brandAvatar} 
          hideDot={true} 
          counterBg="rgba(0,0,0,0.1)" 
          handleColor="#333" 
          counterColor="#333" 
          brandLogo={props.brandLogo} 
          showBrandLogo={props.showBrandLogo} 
          className="pointer-events-auto"
        />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Alfa+Slab+One&family=Charmonman:wght@700&family=Lobster&display=swap');
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-display { font-family: 'Alfa Slab One', cursive; }
        .font-hand { font-family: 'Charmonman', cursive; }
        .font-lobster { font-family: 'Lobster', cursive; }
      `}} />

      {/* Imagem Superior */}
      <div className="h-[48%] w-full relative bg-zinc-200 shrink-0">
        <SmartField field="imagem" data={data} index={index} {...sp} className="w-full h-full">
          <img 
            src={img1} 
            className="absolute inset-0 w-full h-full object-cover object-center" 
            alt="Product Image" 
            crossOrigin="anonymous" 
          />
        </SmartField>
      </div>

      {/* Área Inferior com linhas rosas laterais */}
      <div className="flex-1 bg-white p-6 relative flex flex-col justify-center items-center text-center">
        {/* Linhas Laterais Rosas */}
        <div className="absolute left-6 top-6 bottom-6 w-[1.5px] bg-[#d56b82]/40 rounded-full pointer-events-none" />
        <div className="absolute right-6 top-6 bottom-6 w-[1.5px] bg-[#d56b82]/40 rounded-full pointer-events-none" />
        
        <div className="w-full px-6 flex flex-col items-center">
          <SmartField field="titulo" data={data} index={index} {...sp} className="w-full">
            <TextWrapper {...sp} as="h2" field="titulo" className="font-serif text-[#333] text-[34px] font-bold leading-none outline-none text-center" style={{ fontSize: `${34 * sTitle}px`, fontFamily: titleFont }}>
              {data.titulo || "Charity Bake Sale"}
            </TextWrapper>
          </SmartField>
          
          <SmartField field="subtitulo" data={data} index={index} {...sp} className="w-full mt-2">
            <TextWrapper {...sp} as="p" field="subtitulo" className="text-zinc-500 font-light text-[12px] tracking-wide outline-none text-center" style={{ fontSize: `${12 * sText}px`, fontFamily: textFont }}>
              {data.subtitulo || "come and taste the best cake"}
            </TextWrapper>
          </SmartField>
          
          <div className="w-8 h-[1px] bg-zinc-200 my-4 shrink-0" />
          
          <SmartField field="texto_apoio" data={data} index={index} {...sp} className="w-full">
            <TextWrapper {...sp} as="p" field="texto_apoio" className="text-[#333] font-outfit font-medium text-xs tracking-wider uppercase outline-none text-center" style={{ fontSize: `${12 * sText}px` }}>
              {data.texto_apoio || "09 AM-05 PM January 22-24"}
            </TextWrapper>
          </SmartField>
        </div>
      </div>
    </div>
  );
}

export function SplitVariant87(props) {
  const { data, index, brandColor, brandHandle, isVerified, slideCount, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  const img1 = getCorsSafeUrl(data.imageUrl || "https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=600&auto=format&fit=crop");

  return (
    <div className="relative w-full h-full bg-[#efe7cc] flex flex-col font-outfit select-none overflow-hidden rounded-slide shadow-2xl text-[#3d2b1f]">
      {/* Slide Header flutuando no topo */}
      <div className="absolute top-2 left-0 w-full px-8 z-40 pointer-events-none">
        <SlideHeader 
          data={data} 
          slideIndex={index} 
          onActionStart={onActionStart} 
          selectedElement={selectedElement} 
          onSelectElement={onSelectElement} 
          index={index + 1} 
          total={slideCount} 
          brandHandle={brandHandle} 
          showBrandHandle={props.showBrandHandle} 
          brandColor={brandColor} 
          isVerified={isVerified} 
          showSlideCounter={props.showSlideCounter} 
          slideCounterPosition={props.slideCounterPosition} 
          brandAvatar={props.brandAvatar} 
          hideDot={true} 
          counterBg="rgba(0,0,0,0.1)" 
          handleColor="#3d2b1f" 
          counterColor="#3d2b1f" 
          brandLogo={props.brandLogo} 
          showBrandLogo={props.showBrandLogo} 
          className="pointer-events-auto"
        />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Alfa+Slab+One&family=Charmonman:wght@700&family=Lobster&display=swap');
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-display { font-family: 'Alfa Slab One', cursive; }
        .font-hand { font-family: 'Charmonman', cursive; }
        .font-lobster { font-family: 'Lobster', cursive; }
      `}} />

      {/* Metade Superior: Imagem com Corte Seco Fiel ao Original */}
      <div className="h-[56%] w-full relative overflow-hidden bg-[#222] shrink-0">
        <SmartField field="imagem" data={data} index={index} {...sp} className="w-full h-full">
          <img 
            src={img1} 
            crossOrigin="anonymous"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-95" 
            alt="Cinnamon Rolls" 
          />
        </SmartField>
      </div>

      {/* Pílula Laranja Fixada Exatamente no Meio do Eixo (Corte) */}
      <div className="absolute top-[56%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full flex justify-center px-4 pointer-events-none">
        <div className="bg-[#f6921e] text-white px-5 py-[10px] rounded-full shadow-sm pointer-events-auto">
          <SmartField field="titulo" data={data} index={index} {...sp}>
            <TextWrapper {...sp} as="span" field="titulo" className="text-[13.5px] font-black uppercase tracking-wide block text-center whitespace-nowrap outline-none" style={{ fontSize: `${13.5 * sTitle}px`, fontFamily: titleFont }}>
              {data.titulo || "HOMEMADE CINNAMON ROLLS"}
            </TextWrapper>
          </SmartField>
        </div>
      </div>

      {/* Metade Inferior: Textos e Botão */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-8 pt-8 pb-4 bg-[#efe7cc]">
        <SmartField field="subtitulo" data={data} index={index} {...sp} className="w-full">
          <TextWrapper {...sp} as="p" field="subtitulo" className="text-[#3d2b1f] text-[13px] font-normal leading-[1.35] max-w-[270px] outline-none text-center" style={{ fontSize: `${13 * sText}px`, fontFamily: textFont }}>
            {data.subtitulo || "Start your morning with a delicious coffee-infused twist on the classic breakfast favorite."}
          </TextWrapper>
        </SmartField>

        {/* Onda Laranja Desenhada em Curva de Bézier Fiel */}
        <div className="my-5 text-[#f6921e] shrink-0">
          <svg width="65" height="12" viewBox="0 0 100 15" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 5,7.5 Q 12.5,0 20,7.5 T 35,7.5 T 50,7.5 T 65,7.5 T 80,7.5 T 95,7.5" />
          </svg>
        </div>

        <SmartField field="texto_apoio" data={data} index={index} {...sp} className="w-full">
          <TextWrapper {...sp} as="span" field="texto_apoio" className="text-[#3d2b1f] font-black text-[16px] tracking-widest uppercase outline-none cursor-pointer block text-center" style={{ fontSize: `${16 * sText}px` }}>
            {data.texto_apoio || "ORDER NOW"}
          </TextWrapper>
        </SmartField>
      </div>
    </div>
  );
}

export function SplitVariant88(props) {
  const { data, index, brandColor, brandHandle, isVerified, slideCount, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  const img1 = getCorsSafeUrl(data.imageUrl || "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=600&auto=format&fit=crop");

  return (
    <div className="relative w-full h-full flex flex-col justify-between font-outfit select-none overflow-hidden rounded-slide shadow-2xl bg-[#BF7ADD]">
      
      {/* 1. O Fundo em SVG nativo para manter as elipses e proporções exatas do Figma */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1088 1358" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="filter1_n_0_1" x="-51" y="0" width="1206" height="1350" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feTurbulence type="fractalNoise" baseFrequency="2 2" stitchTiles="stitch" numOctaves="3" result="noise" seed="9064" />
              <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
              <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                <feFuncA type="discrete" tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "/>
              </feComponentTransfer>
              <feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped" />
              <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood" />
              <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
              <feMerge result="effect1_noise_0_1">
                <feMergeNode in="shape" />
                <feMergeNode in="color1" />
              </feMerge>
            </filter>
          </defs>
          {/* Fundo base lilás com filtro de ruído */}
          <rect width="1088" height="1358" fill="#BF7ADD" filter="url(#filter1_n_0_1)" />
          {/* Elipse decorativa central inferior */}
          <ellipse cx="552" cy="895" rx="603" ry="178" fill="#32024F" />
          {/* Retângulo da base */}
          <rect x="0" y="823" width="1088" height="555" rx="11" fill="#32024F" />


        </svg>
      </div>

      {/* 2. Slide Header flutuando no topo com Z-Index alto */}
      <div className="absolute top-2 left-0 w-full px-8 z-50 pointer-events-none">
        <SlideHeader 
          data={data} 
          slideIndex={index} 
          onActionStart={onActionStart} 
          selectedElement={selectedElement} 
          onSelectElement={onSelectElement} 
          index={index + 1} 
          total={slideCount} 
          brandHandle={brandHandle} 
          showBrandHandle={props.showBrandHandle} 
          brandColor={brandColor} 
          isVerified={isVerified} 
          showSlideCounter={props.showSlideCounter} 
          slideCounterPosition={props.slideCounterPosition} 
          brandAvatar={props.brandAvatar} 
          hideDot={true} 
          counterBg="rgba(255,255,255,0.15)" 
          handleColor="white" 
          counterColor="white" 
          brandLogo={props.brandLogo} 
          showBrandLogo={props.showBrandLogo} 
          className="pointer-events-auto"
        />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Alfa+Slab+One&family=Charmonman:wght@700&family=Lobster&display=swap');
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-display { font-family: 'Alfa Slab One', cursive; }
        .font-hand { font-family: 'Charmonman', cursive; }
        .font-lobster { font-family: 'Lobster', cursive; }
      `}} />

      {/* 3. Badge no Topo Esquerdo */}
      <div className="absolute top-[8.5%] left-[10.5%] z-20 px-5 py-2.5 bg-[#EFD08D] rounded-full flex items-center justify-center shadow-md">
        <SmartField field="texto_apoio" data={data} index={index} {...sp}>
          <TextWrapper {...sp} as="span" field="texto_apoio" className="font-outfit font-black text-[#32024F] text-[13px] tracking-widest uppercase outline-none whitespace-nowrap" style={{ fontSize: `${13 * sText}px` }}>
            {data.texto_apoio || "BAKERY"}
          </TextWrapper>
        </SmartField>
      </div>

      {/* 4. Imagem Central do Produto */}
      <div className="absolute top-[18.9%] left-[24.3%] w-[51.2%] h-[47%] z-20 flex items-center justify-center">
        <SmartField field="imagem" data={data} index={index} {...sp} className="w-full h-full rounded-2xl overflow-hidden">
          <img 
            src={img1} 
            crossOrigin="anonymous" 
            className="w-full h-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.4)]" 
            alt="Chocolate Product" 
          />
        </SmartField>
      </div>

      {/* 5. Área de Textos Inferior (sobreposta ao fundo roxo escuro) */}
      <div className="absolute top-[67%] left-0 w-full h-[33%] z-20 flex flex-col items-center justify-start text-center px-12 pt-4">
        
        {/* Título Principal */}
        <div className="w-full mb-3">
          <SmartField field="titulo" data={data} index={index} {...sp} className="w-full">
            <TextWrapper {...sp} as="h2" field="titulo" className="font-serif text-white text-[48px] font-bold leading-none tracking-tight outline-none" style={{ fontSize: `${48 * sTitle}px`, fontFamily: titleFont }}>
              {data.titulo || "CHARITY BAKE SALE"}
            </TextWrapper>
          </SmartField>
        </div>

        {/* Subtítulo */}
        <div className="w-full">
          <SmartField field="subtitulo" data={data} index={index} {...sp} className="w-full">
            <TextWrapper {...sp} as="p" field="subtitulo" className="font-outfit text-white/90 text-[22px] font-semibold tracking-wider uppercase outline-none" style={{ fontSize: `${22 * sText}px`, fontFamily: textFont }}>
              {data.subtitulo || "HOMEMADE CHOCOLATE"}
            </TextWrapper>
          </SmartField>
        </div>

      </div>

    </div>
  );
}

export function SplitVariant89(props) {
  const { 
    data, index, brandColor, brandHandle, isVerified, slideCount, 
    titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement,
    titleFont, textFont, tagFont
  } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  const imgUrl = getCorsSafeUrl(data.imageUrl || "https://images.unsplash.com/photo-1587241321921-91a834d6d191?q=80&w=600&auto=format&fit=crop");

  return (
    <div className="w-full h-full bg-[#f9f9f9] flex flex-col justify-between py-6 font-outfit select-none overflow-hidden text-[#333] relative rounded-slide">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap');
      `}} />

      {/* Slide Header */}
      <div className="absolute top-2 left-0 w-full px-8 z-50 pointer-events-none">
        <SlideHeader 
          data={data} 
          slideIndex={index} 
          onActionStart={onActionStart} 
          selectedElement={selectedElement} 
          onSelectElement={onSelectElement} 
          index={index + 1} 
          total={slideCount} 
          brandHandle={brandHandle} 
          showBrandHandle={props.showBrandHandle} 
          brandColor={brandColor} 
          isVerified={isVerified} 
          showSlideCounter={props.showSlideCounter} 
          slideCounterPosition={props.slideCounterPosition} 
          brandAvatar={props.brandAvatar} 
          hideDot={true} 
          counterBg="rgba(0,0,0,0.05)" 
          handleColor="#4a592d" 
          counterColor="#4a592d" 
          brandLogo={props.brandLogo} 
          showBrandLogo={props.showBrandLogo} 
          className="pointer-events-auto"
        />
      </div>

      {/* Top Content */}
      <div className="text-center mt-8 relative z-20 shrink-0">
        <SmartField field="titulo" data={data} index={index} {...sp}>
          <TextWrapper {...sp} as="h1" field="titulo" className="font-serif text-[40px] font-bold leading-none tracking-tight text-[#4a592d] outline-none" style={{ fontSize: `${40 * sTitle}px`, fontFamily: titleFont }}>
            {data.titulo || "Torta de limão"}
          </TextWrapper>
        </SmartField>
        <SmartField field="subtitulo" data={data} index={index} {...sp} className="mt-1">
          <TextWrapper {...sp} as="h2" field="subtitulo" className="font-serif text-[18px] font-normal leading-none text-[#4a592d] outline-none" style={{ fontSize: `${18 * sText}px`, fontFamily: textFont }}>
            {data.subtitulo || "com merengue"}
          </TextWrapper>
        </SmartField>
      </div>

      {/* Center Content: Image & Description Box */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 -mt-2">
        {/* Main Image */}
        <div className="relative w-[110%] -ml-[5%] aspect-[4/3] flex items-center justify-center">
          <SmartField field="imagem" data={data} index={index} {...sp} className="w-full h-full">
            <img 
              src={imgUrl} 
              crossOrigin="anonymous" 
              className="w-full h-full object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.15)] scale-110" 
              alt="Torta de Limão com Merengue" 
            />
          </SmartField>
        </div>

        {/* Description Box with Button */}
        <div className="w-[88%] bg-white rounded-3xl shadow-[0_5px_20px_rgba(0,0,0,0.08)] p-5 pt-6 -mt-12 relative z-20 flex flex-col items-center border border-zinc-100">
          <SmartField field="texto_apoio" data={data} index={index} {...sp} className="w-full">
            <TextWrapper {...sp} as="p" field="texto_apoio" className="text-center text-[13px] leading-relaxed font-normal text-[#555] outline-none" style={{ fontSize: `${13 * sText}px`, fontFamily: textFont }}>
              {data.texto_apoio || "Massa amanteigada crocante, recheio cremoso e azedinho na medida certa, finalizada com um merengue maçaricado super leve e saboroso."}
            </TextWrapper>
          </SmartField>

          <SmartField field="tag" data={data} index={index} {...sp} className="mt-4">
            <TextWrapper {...sp} as="button" field="tag" className="bg-[#c4d646] text-white font-outfit font-bold text-xs px-6 py-3 rounded-full uppercase tracking-wider hover:bg-[#b3c535] transition-colors shadow-md outline-none block" style={{ fontSize: `${12 * sText}px`, fontFamily: tagFont }}>
              {data.tag || "FAÇA SUA ENCOMENDA"}
            </TextWrapper>
          </SmartField>
        </div>
      </div>

      {/* Bottom Decoration (Lemons SVG placeholder) */}
      <div className="absolute bottom-0 left-0 w-full h-[20%] pointer-events-none overflow-hidden z-0">
        <svg className="absolute bottom-[-10%] left-[-15%] w-[60%] h-auto text-[#c4d646] opacity-90" viewBox="0 0 200 200" fill="currentColor">
          <path d="M100,100 C120,80 150,80 170,100 C190,120 190,150 170,170 C150,190 120,190 100,170 C80,150 80,120 100,100 Z" />
          <circle cx="60" cy="140" r="30" fill="#f2e205" />
          <circle cx="140" cy="60" r="25" fill="#f2e205" />
          <path d="M40,180 Q60,160 80,180 Q100,200 80,220" stroke="currentColor" strokeWidth="4" fill="none"/>
        </svg>
        <svg className="absolute bottom-[-5%] right-[-10%] w-[50%] h-auto text-[#f2e205] opacity-95" viewBox="0 0 200 200" fill="currentColor">
          <circle cx="100" cy="100" r="50" />
          <path d="M140,120 C160,100 190,100 210,120 C230,140 230,170 210,190" fill="#c4d646" />
        </svg>
      </div>
    </div>
  );
}

export function SplitVariant90(props) {
  const { 
    data, index, brandColor, brandHandle, isVerified, slideCount, 
    titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement,
    titleFont, textFont, tagFont
  } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  return (
    <div className="w-full h-full bg-[#fdfafb] flex flex-col font-outfit select-none overflow-hidden text-zinc-900 relative rounded-slide">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Alfa+Slab+One&family=Charmonman:wght@700&display=swap');
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-display { font-family: 'Alfa Slab One', cursive; }
        .font-hand { font-family: 'Charmonman', cursive; }
        .text-outline-pink-v90 { 
          -webkit-text-stroke: 4px #ff2a70; 
          color: transparent; 
        }
      `}} />

      {/* Slide Header */}
      <div className="absolute top-2 left-0 w-full px-8 z-50 pointer-events-none">
        <SlideHeader 
          data={data} 
          slideIndex={index} 
          onActionStart={onActionStart} 
          selectedElement={selectedElement} 
          onSelectElement={onSelectElement} 
          index={index + 1} 
          total={slideCount} 
          brandHandle={brandHandle} 
          showBrandHandle={props.showBrandHandle} 
          brandColor={brandColor} 
          isVerified={isVerified} 
          showSlideCounter={props.showSlideCounter} 
          slideCounterPosition={props.slideCounterPosition} 
          brandAvatar={props.brandAvatar} 
          hideDot={true} 
          counterBg="rgba(0,0,0,0.05)" 
          handleColor="#ff2a70" 
          counterColor="#ff2a70" 
          brandLogo={props.brandLogo} 
          showBrandLogo={props.showBrandLogo} 
          className="pointer-events-auto"
        />
      </div>

      {/* Radial Gradient Background (Soft Pink center to white) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#ffe1ed_0%,transparent_70%)] pointer-events-none z-0 opacity-70" />

      {/* Floating Chocolate Chunks (Blurred) */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <div className="absolute top-[12%] right-[10%] w-8 h-8 bg-[#5A3825] rounded-sm transform rotate-[25deg] blur-[2px] opacity-90 shadow-lg" />
        <div className="absolute top-[25%] left-[5%] w-6 h-6 bg-[#5A3825] rounded-sm transform -rotate-12 blur-[4px] opacity-80" />
        <div className="absolute bottom-[18%] right-[5%] w-10 h-10 bg-[#5A3825] rounded-sm transform rotate-45 blur-[5px] opacity-80" />
      </div>

      {/* Gigantic Repeated Background Text (Hollow Pink) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 w-full overflow-hidden space-y-[-2rem]">
        {[...Array(4)].map((_, i) => {
          const bgWord = (data.subtitulo || "BROWNIE").trim().split(/\s+/)[0] || "BROWNIE";
          return (
            <div key={i} className="text-[85px] font-display text-outline-pink-v90 uppercase leading-[0.8] tracking-tighter whitespace-nowrap opacity-100 select-none">
              {bgWord}
            </div>
          );
        })}
      </div>

      {/* Top Content: Logo & Pink Badge */}
      <div className="relative z-20 flex flex-col items-center mt-8 gap-6 shrink-0">
        {/* Fake Logo */}
        <SmartField field="tag" data={data} index={index} {...sp}>
          <TextWrapper {...sp} as="div" field="tag" className="font-hand text-[#ff2a70] text-3xl font-bold tracking-tight drop-shadow-sm outline-none" style={{ fontFamily: tagFont }}>
            {data.tag || "Comiê"}
          </TextWrapper>
        </SmartField>

        {/* Pink Rectangular Badge */}
        <div className="bg-[#ff2a70] text-white px-5 py-1.5 shadow-[0_8px_15px_rgba(255,42,112,0.3)]">
          <SmartField field="titulo" data={data} index={index} {...sp}>
            <TextWrapper {...sp} as="span" field="titulo" className="text-[26px] font-display leading-none uppercase tracking-tighter block mt-1 outline-none" style={{ fontSize: `${26 * sTitle}px`, fontFamily: titleFont }}>
              {data.titulo || "CHEGOU A VEZ DO"}
            </TextWrapper>
          </SmartField>
        </div>
      </div>

      {/* Main Subject: Tooltip (Image Removed) */}
      <div className="relative z-30 flex-1 flex flex-col items-center justify-center w-full mt-2">
        <div className="relative z-10">
          {/* Tooltip Dialog Box Pointing Up */}
          <div className="bg-white px-5 py-2 rounded-sm shadow-xl z-20 whitespace-nowrap relative">
            <SmartField field="texto_apoio" data={data} index={index} {...sp}>
              <TextWrapper {...sp} as="span" field="texto_apoio" className="text-[#ff2a70] text-sm font-semibold tracking-wide outline-none" style={{ fontSize: `${14 * sText}px`, fontFamily: textFont }}>
                {data.texto_apoio || "Faça seu pedido hoje"}
              </TextWrapper>
            </SmartField>
            {/* CSS Triangle (Arrow pointing up) */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-transparent border-b-white" />
          </div>
        </div>
      </div>

      {/* Bottom Pink Curve */}
      <div className="absolute bottom-[-15%] left-0 w-[150%] h-[25%] bg-[#ff2a70] rounded-t-[100%] -translate-x-[15%] z-20 pointer-events-none" />
    </div>
  );
}

export function SplitVariant91(props) {
  const { 
    data, index, brandColor, brandHandle, isVerified, slideCount, 
    titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement,
    titleFont, textFont, tagFont
  } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  return (
    <div className="w-full h-full bg-[#fdfafb] flex flex-col font-outfit select-none overflow-hidden text-zinc-900 relative rounded-slide">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Alfa+Slab+One&family=Charmonman:wght@700&display=swap');
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-display { font-family: 'Alfa Slab One', cursive; }
        .font-hand { font-family: 'Charmonman', cursive; }
        .text-outline-pink-v91 { 
          -webkit-text-stroke: 4px #ff2a70; 
          color: transparent; 
        }
      `}} />

      {/* Slide Header */}
      <div className="absolute top-2 left-0 w-full px-8 z-50 pointer-events-none">
        <SlideHeader 
          data={data} 
          slideIndex={index} 
          onActionStart={onActionStart} 
          selectedElement={selectedElement} 
          onSelectElement={onSelectElement} 
          index={index + 1} 
          total={slideCount} 
          brandHandle={brandHandle} 
          showBrandHandle={props.showBrandHandle} 
          brandColor={brandColor} 
          isVerified={isVerified} 
          showSlideCounter={props.showSlideCounter} 
          slideCounterPosition={props.slideCounterPosition} 
          brandAvatar={props.brandAvatar} 
          hideDot={true} 
          counterBg="rgba(0,0,0,0.05)" 
          handleColor="#ff2a70" 
          counterColor="#ff2a70" 
          brandLogo={props.brandLogo} 
          showBrandLogo={props.showBrandLogo} 
          className="pointer-events-auto"
        />
      </div>

      {/* Radial Gradient Background (Soft Pink center to white) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#ffe1ed_0%,transparent_70%)] pointer-events-none z-0 opacity-70" />

      {/* Floating Chocolate Chunks (Blurred) */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <div className="absolute top-[12%] right-[10%] w-8 h-8 bg-[#5A3825] rounded-sm transform rotate-[25deg] blur-[2px] opacity-90 shadow-lg" />
        <div className="absolute top-[25%] left-[5%] w-6 h-6 bg-[#5A3825] rounded-sm transform -rotate-12 blur-[4px] opacity-80" />
        <div className="absolute bottom-[18%] right-[5%] w-10 h-10 bg-[#5A3825] rounded-sm transform rotate-45 blur-[5px] opacity-80" />
      </div>

      {/* Gigantic Repeated Background Text (Hollow Pink) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 w-full overflow-hidden space-y-[-2rem]">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="text-[85px] font-display text-outline-pink-v91 uppercase leading-[0.8] tracking-tighter whitespace-nowrap opacity-100 select-none">
            {data.titulo || "CUPCAKE"}
          </div>
        ))}
      </div>

      {/* Top Content: Logo */}
      <div className="relative z-20 flex flex-col items-center mt-8 gap-6 shrink-0">
        <SmartField field="tag" data={data} index={index} {...sp}>
          <TextWrapper {...sp} as="div" field="tag" className="font-hand text-[#ff2a70] text-3xl font-bold tracking-tight drop-shadow-sm outline-none" style={{ fontFamily: tagFont }}>
            {data.tag || "Doçura"}
          </TextWrapper>
        </SmartField>
      </div>

      {/* Main Subject: Tooltip (Image Removed) */}
      <div className="relative z-30 flex-1 flex flex-col items-center justify-center w-full mt-2">
        <div className="relative z-10">
          {/* Tooltip Dialog Box Pointing Up */}
          <div className="bg-white px-5 py-2 rounded-sm shadow-xl z-20 whitespace-nowrap relative">
            <SmartField field="subtitulo" data={data} index={index} {...sp}>
              <TextWrapper {...sp} as="span" field="subtitulo" className="text-[#ff2a70] text-sm font-semibold tracking-wide outline-none" style={{ fontSize: `${14 * sTitle}px`, fontFamily: textFont }}>
                {data.subtitulo || "Peça a sua hoje"}
              </TextWrapper>
            </SmartField>
            {/* CSS Triangle (Arrow pointing up) */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-transparent border-b-white" />
          </div>
        </div>
      </div>

      {/* Bottom Pink Curve & Button */}
      <div className="absolute bottom-0 left-0 w-full h-[25%] z-20 pointer-events-none">
        <div className="absolute bottom-[-15%] left-0 w-[150%] h-full bg-[#ff2a70] rounded-t-[100%] -translate-x-[15%]" />
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-auto">
          <SmartField field="texto_apoio" data={data} index={index} {...sp}>
            <TextWrapper {...sp} as="button" field="texto_apoio" className="bg-white text-[#ff2a70] font-outfit font-bold text-xs px-8 py-3 rounded-full uppercase tracking-wider hover:bg-zinc-100 transition-colors shadow-md outline-none block" style={{ fontSize: `${12 * sText}px`, fontFamily: textFont }}>
              {data.texto_apoio || "ORDER NOW"}
            </TextWrapper>
          </SmartField>
        </div>
      </div>
    </div>
  );
}

export function SplitVariant92(props) {
  const { 
    data, index, brandColor, brandHandle, isVerified, slideCount, 
    titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement,
    titleFont, textFont, tagFont
  } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  const imgUrl = getCorsSafeUrl(data.imageUrl || "https://images.unsplash.com/photo-1615756402431-7299066060c5?q=80&w=200&auto=format&fit=crop");

  const tagLines = (data.tag || "Não sabe o que pedir?\nEntão vai de...").split('\n');
  const tag1 = tagLines[0] || "";
  const tag2 = tagLines[1] || "";

  const titleLines = (data.titulo || "Briga\ndeiro").split('\n');
  const title1 = titleLines[0] || "";
  const title2 = titleLines[1] || "";

  const tooltipLines = (data.texto_apoio || "Brigadeiro\nTradicional").split('\n');
  const tool1 = tooltipLines[0] || "";
  const tool2 = tooltipLines[1] || "";

  return (
    <div className="w-full h-full bg-[#ff7a7a] flex flex-col justify-between font-outfit select-none overflow-hidden text-[#ffebe4] relative rounded-slide">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Lobster&family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Alfa+Slab+One&family=Charmonman:wght@700&display=swap');
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-display { font-family: 'Alfa Slab One', cursive; }
        .font-hand { font-family: 'Charmonman', cursive; }
        .font-lobster { font-family: 'Lobster', cursive; }
      `}} />

      {/* Slide Header */}
      <div className="absolute top-2 left-0 w-full px-8 z-50 pointer-events-none">
        <SlideHeader 
          data={data} 
          slideIndex={index} 
          onActionStart={onActionStart} 
          selectedElement={selectedElement} 
          onSelectElement={onSelectElement} 
          index={index + 1} 
          total={slideCount} 
          brandHandle={brandHandle} 
          showBrandHandle={props.showBrandHandle} 
          brandColor={brandColor} 
          isVerified={isVerified} 
          showSlideCounter={props.showSlideCounter} 
          slideCounterPosition={props.slideCounterPosition} 
          brandAvatar={props.brandAvatar} 
          hideDot={true} 
          counterBg="rgba(255,255,255,0.15)" 
          handleColor="#ffebe4" 
          counterColor="#ffebe4" 
          brandLogo={props.brandLogo} 
          showBrandLogo={props.showBrandLogo} 
          className="pointer-events-auto"
        />
      </div>

      {/* Fundo suave com radial gradient rosa mais claro */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,#ff9696_0%,transparent_60%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,#ff9696_0%,transparent_60%)] pointer-events-none z-0" />

      {/* Top Text (Não sabe o que pedir?) */}
      <div className="relative z-20 mt-12 ml-6">
        <SmartField field="tag" data={data} index={index} {...sp}>
          <TextWrapper {...sp} as="div" field="tag" className="text-[11px] font-normal leading-tight outline-none" style={{ fontFamily: tagFont }}>
            <p className="text-[11px] font-normal leading-tight">{tag1}</p>
            {tag2 && <p className="text-[11px] font-bold leading-tight">{tag2}</p>}
          </TextWrapper>
        </SmartField>
      </div>

      {/* Main Title (Briga deiro) */}
      <div className="relative z-10 pl-5 mt-1">
        <SmartField field="titulo" data={data} index={index} {...sp}>
          <TextWrapper {...sp} as="h1" field="titulo" className="font-serif text-[4.2rem] leading-[0.8] tracking-[-0.03em] font-medium text-[#ffebe4] drop-shadow-sm outline-none" style={{ fontSize: `${67.2 * sTitle}px`, fontFamily: titleFont }}>
            {title1}<br/>{title2}
          </TextWrapper>
        </SmartField>
      </div>

      {/* The Brigadeiro Question Mark Graphic */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {[
          { top: '8%', left: '46%' },
          { top: '4%', left: '63%' },
          { top: '10%', left: '79%' },
          { top: '23%', left: '85%' },
          { top: '35%', left: '74%' },
          { top: '45%', left: '60%' },
          { top: '58%', left: '55%' },
          { top: '75%', left: '53%' } // The Dot
        ].map((pos, idx) => (
          <div 
            key={idx} 
            className="absolute w-14 h-14 rounded-full shadow-[0_8px_15px_rgba(0,0,0,0.3)] bg-[#2a130c] border-[3px] border-[#1a0a05] flex items-center justify-center overflow-hidden transform transition-transform duration-500 hover:scale-110 pointer-events-auto"
            style={{ top: pos.top, left: pos.left }}
          >
            <img 
              src={imgUrl} 
              crossOrigin="anonymous"
              alt="Brigadeiro" 
              className="w-full h-full object-cover opacity-90 mix-blend-screen"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,#2a130c_120%)]" />
          </div>
        ))}

        {/* Tooltip para o Brigadeiro Tradicional */}
        <div className="absolute top-[61%] left-[75%] flex items-center">
          <SmartField field="texto_apoio" data={data} index={index} {...sp}>
            <TextWrapper {...sp} as="div" field="texto_apoio" className="text-left text-[#ffebe4] outline-none" style={{ fontSize: `${12 * sText}px`, fontFamily: textFont }}>
              <span className="block text-[9px] font-bold uppercase tracking-wider">{tool1}</span>
              {tool2 && <span className="block text-[8px] font-light uppercase tracking-wider opacity-90">{tool2}</span>}
            </TextWrapper>
          </SmartField>
        </div>
      </div>

      {/* Bottom Footer (Logo & Button) */}
      <div className="relative z-30 flex justify-between items-center mb-6 px-6 mt-auto pointer-events-auto">
        <div className="flex flex-col items-center">
          <SmartField field="subtitulo" data={data} index={index} {...sp}>
            <TextWrapper {...sp} as="span" field="subtitulo" className="font-lobster text-[#ffebe4] text-[26px] leading-none drop-shadow-sm outline-none" style={{ fontFamily: titleFont }}>
              {data.subtitulo || "Saboralia"}
            </TextWrapper>
          </SmartField>
          <span className="text-[5px] font-black uppercase tracking-[0.3em] opacity-80 mt-1">
            Confeitaria
          </span>
        </div>

        {/* Peça Agora Button */}
        <button className="bg-[#6b3127] text-white font-outfit font-bold text-[10px] px-6 py-2.5 rounded-full shadow-[0_5px_15px_rgba(107,49,39,0.4)] hover:bg-[#52251d] transition-colors pointer-events-auto">
          Peça agora!
        </button>
      </div>
    </div>
  );
}

export function SplitVariant93(props) {
  const { 
    data, index, brandColor, brandHandle, isVerified, slideCount, 
    titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement,
    titleFont, textFont, tagFont
  } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  const imgUrl = getCorsSafeUrl(data.imageUrl || "https://images.unsplash.com/photo-1527515862127-a4fc05baf7a5?q=80&w=600&auto=format&fit=crop");
  const flyingDonutUrl = getCorsSafeUrl("https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=600&auto=format&fit=crop");

  const titleLines = (data.titulo || "E VOCÊ?\nFEZ SEU\nPEDIDO\nDE HOJE?").split('\n');
  const line1 = titleLines[0] || "";
  const line2 = titleLines[1] || "";
  const line3 = titleLines[2] || "";
  const line4 = titleLines[3] || "";

  return (
    <div className="w-full h-full bg-[#fdf5f7] flex font-outfit select-none overflow-hidden text-[#ff4b82] relative rounded-slide">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Lobster&family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Alfa+Slab+One&family=Charmonman:wght@700&display=swap');
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-display { font-family: 'Alfa Slab One', cursive; }
        .font-hand { font-family: 'Charmonman', cursive; }
        .font-lobster { font-family: 'Lobster', cursive; }
        .text-outline-pink-light-v93 { -webkit-text-stroke: 3px #ff4b82; color: transparent; }
      `}} />

      {/* Slide Header */}
      <div className="absolute top-2 left-0 w-full px-8 z-50 pointer-events-none">
        <SlideHeader 
          data={data} 
          slideIndex={index} 
          onActionStart={onActionStart} 
          selectedElement={selectedElement} 
          onSelectElement={onSelectElement} 
          index={index + 1} 
          total={slideCount} 
          brandHandle={brandHandle} 
          showBrandHandle={props.showBrandHandle} 
          brandColor={brandColor} 
          isVerified={isVerified} 
          showSlideCounter={props.showSlideCounter} 
          slideCounterPosition={props.slideCounterPosition} 
          brandAvatar={props.brandAvatar} 
          hideDot={true} 
          counterBg="rgba(0,0,0,0.05)" 
          handleColor="#ff4b82" 
          counterColor="#ff4b82" 
          brandLogo={props.brandLogo} 
          showBrandLogo={props.showBrandLogo} 
          className="pointer-events-auto"
        />
      </div>

      {/* Fundo com texto vazado lateral rotacionado ("DONUT") */}
      <div className="absolute top-[89%] right-0 text-[65px] font-black leading-none opacity-10 pointer-events-none rotate-0 whitespace-nowrap text-outline-pink-light-v93 select-none">
        <SmartField field="subtitulo" data={data} index={index} {...sp}>
          <TextWrapper {...sp} as="span" field="subtitulo" className="outline-none">
            {data.subtitulo || "DONUT"}
          </TextWrapper>
        </SmartField>
      </div>

      {/* Left Side: Donuts Stack Vertical */}
      <div className="w-[40%] h-full relative z-10 shadow-[10px_0_25px_rgba(0,0,0,0.15)] bg-white overflow-hidden">
        <SmartField field="imagem" data={data} index={index} {...sp} className="w-full h-full">
          <img 
            src={imgUrl} 
            crossOrigin="anonymous"
            className="w-full h-full object-cover" 
            alt="Donuts Stack Vertical" 
          />
        </SmartField>
      </div>

      {/* Right Side: Tipografia Agressiva */}
      <div className="w-[60%] h-full flex flex-col justify-center items-start pl-5 pr-3 relative z-20">

        {/* Logo Comiê (Topo centralizado no próprio bloco) */}
        <div className="absolute top-12 left-0 w-full flex justify-center pointer-events-auto">
          <SmartField field="tag" data={data} index={index} {...sp}>
            <TextWrapper {...sp} as="div" field="tag" className="font-lobster text-[28px] tracking-widest text-[#ff4b82] drop-shadow-sm outline-none" style={{ fontFamily: tagFont }}>
              {data.tag || "Comiê"}
            </TextWrapper>
          </SmartField>
        </div>

        {/* Mini donut flutuante borrado no canto superior direito */}
        <img 
          src={flyingDonutUrl} 
          crossOrigin="anonymous"
          className="absolute top-[18%] right-2 w-8 h-8 object-cover rounded-full shadow-md blur-[1px] rotate-12 opacity-90" 
          alt="Mini donut blur" 
        />

        {/* Bloco de Texto Ultra-Bold Esmagado */}
        <div className="flex flex-col items-start w-full mt-10 space-y-[-2px] pointer-events-auto">
          <SmartField field="titulo" data={data} index={index} {...sp} className="w-full">
            <TextWrapper {...sp} as="div" field="titulo" className="outline-none" style={{ fontSize: `${34 * sTitle}px`, fontFamily: titleFont }}>
              <h2 className="text-[34px] font-black leading-[0.9] uppercase tracking-tighter w-full text-left" style={{ fontSize: 'inherit' }}>
                {line1}
              </h2>
              {line2 && (
                <h2 className="text-[34px] font-black leading-[0.9] uppercase tracking-tighter w-full text-left" style={{ fontSize: 'inherit' }}>
                  {line2}
                </h2>
              )}
              {line3 && (
                <h2 className="text-[34px] font-black leading-[0.9] uppercase tracking-tighter w-full text-left" style={{ fontSize: 'inherit' }}>
                  {line3}
                </h2>
              )}
              {/* Linha 4 com Background Sólido */}
              {line4 && (
                <div className="bg-[#ff4b82] text-white px-2 py-0 mt-2 -ml-1 shadow-sm block w-fit">
                  <h2 className="text-[34px] font-black leading-[0.95] uppercase tracking-tighter pt-1 pb-[1px]" style={{ fontSize: 'inherit' }}>
                    {line4}
                  </h2>
                </div>
              )}
            </TextWrapper>
          </SmartField>
        </div>

      </div>
    </div>
  );
}

export function SplitVariant94(props) {
  const { 
    data, index, brandColor, brandHandle, isVerified, slideCount, 
    titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement,
    titleFont, textFont, tagFont
  } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  const descLines = (data.texto_apoio || "Um pedaço\nde felicidade\ncom bastante\nchocolate.\nna sua casa!").split('\n');

  // Determinar cores do gradiente com base na brandColor
  const getGradientColors = (color) => {
    let c1 = "#8ac1e6";
    let c2 = "rgba(85, 138, 165, 0.7)";

    if (color) {
      if (color.startsWith('#')) {
        const cleanHex = color.replace('#', '');
        let r, g, b;
        if (cleanHex.length === 3) {
          r = parseInt(cleanHex[0] + cleanHex[0], 16);
          g = parseInt(cleanHex[1] + cleanHex[1], 16);
          b = parseInt(cleanHex[2] + cleanHex[2], 16);
        } else if (cleanHex.length === 6) {
          r = parseInt(cleanHex.substring(0, 2), 16);
          g = parseInt(cleanHex.substring(2, 4), 16);
          b = parseInt(cleanHex.substring(4, 6), 16);
        }
        if (r !== undefined && g !== undefined && b !== undefined) {
          c1 = `rgba(${r}, ${g}, ${b}, 1)`;
          c2 = `rgba(${r}, ${g}, ${b}, 0.7)`;
          return { c1, c2 };
        }
      }
      if (color.startsWith('rgb')) {
        const rgbValues = color.match(/\d+/g);
        if (rgbValues && rgbValues.length >= 3) {
          const r = rgbValues[0];
          const g = rgbValues[1];
          const b = rgbValues[2];
          c1 = `rgba(${r}, ${g}, ${b}, 1)`;
          c2 = `rgba(${r}, ${g}, ${b}, 0.7)`;
          return { c1, c2 };
        }
      }
      c1 = color;
      c2 = color;
    }
    return { c1, c2 };
  };

  const { c1: gradColor1, c2: gradColor2 } = getGradientColors(brandColor);

  return (
    <div 
      className="w-full h-full flex flex-col font-outfit select-none overflow-hidden text-white relative rounded-slide"
      style={{ background: `linear-gradient(145deg, ${gradColor1} 0%, ${gradColor2} 100%)` }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Lobster&family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Alfa+Slab+One&family=Charmonman:wght@700&display=swap');
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-display { font-family: 'Alfa Slab One', cursive; }
        .font-hand { font-family: 'Charmonman', cursive; }
        .font-lobster { font-family: 'Lobster', cursive; }
      `}} />

      {/* Slide Header */}
      <div className="absolute top-2 left-0 w-full px-8 z-50 pointer-events-none">
        <SlideHeader 
          data={data} 
          slideIndex={index} 
          onActionStart={onActionStart} 
          selectedElement={selectedElement} 
          onSelectElement={onSelectElement} 
          index={index + 1} 
          total={slideCount} 
          brandHandle={brandHandle} 
          showBrandHandle={props.showBrandHandle} 
          brandColor={brandColor} 
          isVerified={isVerified} 
          showSlideCounter={props.showSlideCounter} 
          slideCounterPosition={props.slideCounterPosition} 
          brandAvatar={props.brandAvatar} 
          hideDot={true} 
          counterBg="rgba(255,255,255,0.2)" 
          handleColor="#ffffff" 
          counterColor="#ffffff" 
          brandLogo={props.brandLogo} 
          showBrandLogo={props.showBrandLogo} 
          className="pointer-events-auto"
        />
      </div>

      {/* Main Card (Split Pink/Cream) */}
      <div className="absolute top-1/2 left-[7.5%] w-[85%] h-[68%] -translate-y-1/2 rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.25)] flex flex-col z-10 pointer-events-auto">
        
        {/* Top Pink Section */}
        <div className="bg-[#fe4eb3] h-[45%] p-5 flex flex-col justify-center">
          <SmartField field="titulo" data={data} index={index} {...sp}>
            <TextWrapper {...sp} as="h2" field="titulo" className="text-[24px] font-bold leading-[1.1] tracking-tight text-white whitespace-pre-line drop-shadow-sm outline-none" style={{ fontSize: `${24 * sTitle}px`, fontFamily: titleFont }}>
              {data.titulo || "Brownie de\nchocolate!"}
            </TextWrapper>
          </SmartField>
        </div>
        
        {/* Bottom Cream Section */}
        <div className="bg-[#f8f4e2] flex-1 p-5 pt-6 flex flex-col justify-start">
          <SmartField field="texto_apoio" data={data} index={index} {...sp}>
            <TextWrapper {...sp} as="div" field="texto_apoio" className="text-[#2a6878] text-[16px] font-normal leading-[1.35] tracking-tight outline-none" style={{ fontSize: `${16 * sText}px`, fontFamily: textFont }}>
              {descLines.map((line, idx) => {
                 if (idx === 1 || idx === 3) return <span key={idx} className="font-bold block">{line}</span>;
                 return <span key={idx} className="block">{line}</span>;
              })}
            </TextWrapper>
          </SmartField>
        </div>

      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-20 px-1 opacity-90 pointer-events-auto">
        
        {/* Pink Pie Logo */}
        <div className="flex items-center gap-1.5 flex-1">
          <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
            <path d="M12 2a5 5 0 0 0-5 5v2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2V7a5 5 0 0 0-5-5zm0 2a3 3 0 0 1 3 3v2H9V7a3 3 0 0 1 3-3zm-7 9h14v2H5v-2zm2 4h10v3a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-3z" />
          </svg>
          <SmartField field="tag" data={data} index={index} {...sp}>
            <TextWrapper {...sp} as="span" field="tag" className="text-[11px] font-bold tracking-widest lowercase mt-0.5 outline-none" style={{ fontFamily: tagFont }}>
              {data.tag || "pink pie"}
            </TextWrapper>
          </SmartField>
        </div>

        {/* Delivery Logos */}
        <div className="flex items-center gap-1.5 flex-[0.8] justify-center text-white">
          <span className="font-display italic text-[13px] tracking-tighter text-white">iFood</span>
          <div className="leading-[0.8] text-center border-l border-white/40 pl-1.5 ml-0.5">
            <span className="text-[5px] font-black block">UBER</span>
            <span className="text-[7px] font-black block">eats</span>
          </div>
        </div>

      </div>

    </div>
  );
}


export function SplitVariant95(props) {
  const { 
    data, index, brandColor, brandHandle, isVerified, slideCount, 
    titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement,
    titleFont, textFont, tagFont
  } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  const imgUrl = getCorsSafeUrl(data.imageUrl || "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=400&auto=format&fit=crop");

  const leftLines = (data.tag || "Fresh\nStrawberry").split('\n');
  const left1 = leftLines[0] || "";
  const left2 = leftLines[1] || "";

  const rightLines = (data.texto_apoio || "Black\nChocolate").split('\n');
  const right1 = rightLines[0] || "";
  const right2 = rightLines[1] || "";

  return (
    <div className="w-full h-full bg-[#fcdced] flex flex-col items-center font-outfit select-none overflow-hidden text-[#1a1a1a] relative rounded-slide">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Lobster&family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Alfa+Slab+One&family=Charmonman:wght@700&display=swap');
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-display { font-family: 'Alfa Slab One', cursive; }
        .font-hand { font-family: 'Charmonman', cursive; }
        .font-lobster { font-family: 'Lobster', cursive; }
      `}} />

      {/* Slide Header */}
      <div className="absolute top-2 left-0 w-full px-8 z-50 pointer-events-none">
        <SlideHeader 
          data={data} 
          slideIndex={index} 
          onActionStart={onActionStart} 
          selectedElement={selectedElement} 
          onSelectElement={onSelectElement} 
          index={index + 1} 
          total={slideCount} 
          brandHandle={brandHandle} 
          showBrandHandle={props.showBrandHandle} 
          brandColor={brandColor} 
          isVerified={isVerified} 
          showSlideCounter={props.showSlideCounter} 
          slideCounterPosition={props.slideCounterPosition} 
          brandAvatar={props.brandAvatar} 
          hideDot={true} 
          counterBg="rgba(0,0,0,0.05)" 
          handleColor="#1a1a1a" 
          counterColor="#1a1a1a" 
          brandLogo={props.brandLogo} 
          showBrandLogo={props.showBrandLogo} 
          className="pointer-events-auto"
        />
      </div>

      {/* Background Ondas (Rosa mais escuro na base) */}
      <div className="absolute bottom-0 left-0 w-full h-[45%] bg-[#ec7ba3] z-0" />
      {/* Divisor em SVG para a onda */}
      <svg className="absolute top-[54%] left-0 w-full h-12 text-[#ec7ba3] z-0 transform -translate-y-[90%]" preserveAspectRatio="none" viewBox="0 0 1440 320" fill="currentColor">
        <path d="M0,160L80,144C160,128,320,96,480,106.7C640,117,800,171,960,176C1120,181,1280,139,1360,117.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
      </svg>

      {/* Textos de Cabeçalho */}
      <div className="relative z-20 flex flex-col items-center mt-10">
        <SmartField field="subtitulo" data={data} index={index} {...sp}>
          <TextWrapper {...sp} as="h2" field="subtitulo" className="font-hand text-[32px] tracking-tight text-[#1a1a1a] drop-shadow-sm mb-[-12px] outline-none" style={{ fontFamily: tagFont }}>
            {data.subtitulo || "Today's Special"}
          </TextWrapper>
        </SmartField>

        <SmartField field="titulo" data={data} index={index} {...sp}>
          <TextWrapper {...sp} as="h1" field="titulo" className="font-serif font-black text-[62px] leading-none tracking-tighter text-[#1a1a1a] outline-none" style={{ fontSize: `${62 * sTitle}px`, fontFamily: titleFont }}>
            {data.titulo || "Ice Cream"}
          </TextWrapper>
        </SmartField>
      </div>

      {/* Elemento Central: Copo e Guardanapo */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center w-full mt-2">
        
        {/* Anotações e Setas (SVGs customizados) */}
        {/* Esquerda */}
        <div className="absolute top-[35%] left-[8%] flex flex-col items-center pointer-events-auto">
          <svg className="w-16 h-12 text-[#1a1a1a] mb-1" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M60 40 Q 30 10 5 30" strokeLinecap="round" />
            <path d="M5 30 L 15 25 M 5 30 L 12 37" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <SmartField field="tag" data={data} index={index} {...sp}>
            <TextWrapper {...sp} as="span" field="tag" className="font-hand text-[18px] leading-tight text-center text-[#1a1a1a] whitespace-pre-line mt-[-5px] outline-none" style={{ fontFamily: tagFont }}>
              {left1}
              {left2 && <span className="block">{left2}</span>}
            </TextWrapper>
          </SmartField>
        </div>

        {/* Direita */}
        <div className="absolute top-[38%] right-[8%] flex flex-col items-center pointer-events-auto">
          <svg className="w-16 h-12 text-[#1a1a1a] mb-1" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 25 Q 35 5 60 25" strokeLinecap="round" />
            <path d="M60 25 L 50 20 M 60 25 L 55 33" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <SmartField field="texto_apoio" data={data} index={index} {...sp}>
            <TextWrapper {...sp} as="span" field="texto_apoio" className="font-hand text-[18px] leading-tight text-center text-[#1a1a1a] whitespace-pre-line mt-[-5px] outline-none" style={{ fontFamily: tagFont }}>
              {right1}
              {right2 && <span className="block">{right2}</span>}
            </TextWrapper>
          </SmartField>
        </div>

        {/* Copo */}
        <div className="relative flex flex-col items-center w-[55%] mt-2 z-10 hover:-translate-y-2 transition-transform duration-700">
          
          {/* Guardanapo sob o copo */}
          <div className="absolute bottom-[-15px] w-[140%] h-12 bg-white/95 rounded-sm shadow-[0_15px_15px_rgba(200,60,100,0.3)] transform -rotate-2 z-0 skew-x-12" />
          <div className="absolute bottom-[-8px] w-[130%] h-8 bg-white rounded-sm shadow-md transform rotate-1 z-0 skew-x-[-12deg]" />

          {/* Imagem do copo cortada verticalmente */}
          <div className="relative w-full aspect-[2/3] z-10 drop-shadow-xl overflow-visible">
            <SmartField field="imagem" data={data} index={index} {...sp} className="w-full h-full">
              <img 
                src={imgUrl} 
                crossOrigin="anonymous"
                className="w-full h-full object-cover object-bottom" 
                style={{ 
                  WebkitMaskImage: 'polygon(0% 15%, 15% 0%, 85% 0%, 100% 15%, 90% 100%, 10% 100%)',
                  maskImage: 'polygon(0% 15%, 15% 0%, 85% 0%, 100% 15%, 90% 100%, 10% 100%)'
                }}
                alt="Ice Cream Cup" 
              />
            </SmartField>
          </div>
        </div>
      </div>

      {/* Botão de Rodapé */}
      <div className="relative z-30 mb-8 mt-4 pointer-events-auto">
        <button className="bg-[#1c1c1c] text-[#fcdced] font-serif font-bold text-[14px] px-8 py-3 rounded-full hover:bg-black transition-colors shadow-lg tracking-wide">
          Order Now
        </button>
      </div>

    </div>
  );
}

export function SplitVariant210({
  data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
  titleScale, textScale, showMetrics, onActionStart, onTextChange,
  selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo
}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  const cursoLabel = data.tag || "CURSO DE";
  const titleText = data.titulo || "Mini caseirinhos\nGourmet";
  const titleLines = titleText.split('\n');
  const cursoTitle1 = titleLines[0] || '';
  const cursoTitle2 = titleLines[1] || '';

  const inscricoesText = data.sub_titulo || "Inscrições";
  const abertasText = data.badge_text || "Abertas";

  const authorData = data.texto_apoio || "Chef Valeria Miranda\n@chefvaleriamiranda";
  const authorLines = authorData.split('\n');
  const cursoAuthorName = authorLines[0] || '';
  const cursoAuthorHandle = authorLines[1] || '';

  const imgBox = data.imageUrl || "https://images.unsplash.com/photo-1612203985729-70726954388c?q=80&w=600&auto=format&fit=crop";
  const imgKinder = "https://images.unsplash.com/photo-1621304598583-9b0d2d3460f9?q=80&w=400&auto=format&fit=crop";
  const avatarImage = brandAvatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop";

  return (
    <div className="relative w-full h-full bg-[#e81b85] flex flex-col font-outfit select-none overflow-hidden text-white">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
        .font-lobster { font-family: 'Lobster', cursive; }
        .text-stroke-curso { -webkit-text-stroke: 7px #e81b85; paint-order: stroke fill; }
        .text-stroke-curso-thin { -webkit-text-stroke: 3px #e81b85; paint-order: stroke fill; }
      `}} />

      {/* Fundo Azul Claro Base */}
      <div className="absolute inset-0 bg-[#98cbf1] z-0 pointer-events-none" />

      {/* Máscara Magenta */}
      <div className="absolute inset-0 bg-[#e81b85] z-10" />

      {/* Imagem Superior Direita (Bolo na Caixa) */}
      <div className="absolute top-0 right-0 w-[60%] h-[55%] bg-[#98cbf1] rounded-bl-[80px] z-10 overflow-hidden shadow-[-5px_5px_15px_rgba(0,0,0,0.1)] transition-transform duration-700 origin-top-right">
        <ImageBg imageUrl={imgBox} className="w-full h-full" />
      </div>

      {/* Imagem Inferior Direita (Chocolate/Wafer) */}
      <div className="absolute bottom-0 right-0 w-[35%] h-[35%] bg-[#98cbf1] rounded-tl-[50px] z-10 overflow-hidden shadow-[-5px_-5px_15px_rgba(0,0,0,0.1)] transition-transform duration-700 origin-bottom-right flex items-center justify-center">
        <ImageBg imageUrl={imgKinder} className="w-[120%] h-[120%]" />
      </div>

      {/* Área de Conteúdo Tipográfico */}
      <div className="relative z-20 flex flex-col pt-[28%] px-5 h-full">
        
        {/* Badge "CURSO DE" & Título Script */}
        <div className="flex flex-col items-start ml-2 relative">
          <SmartField field="tag" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="bg-[#00aeeF] text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-[3px] absolute -top-3 left-[28%] z-30 shadow-md outline-none cursor-text select-text"
            >
              {cursoLabel}
            </span>
          </SmartField>
            
          <div className="relative z-20">
            <SmartField field="titulo" {...sp}>
              <h2 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
                className="font-lobster text-[46px] leading-[0.85] text-white text-stroke-curso-thin drop-shadow-md outline-none cursor-text select-text whitespace-pre-wrap"
                style={{ fontSize: `${46 * sTitle}px` }}
              >
                {cursoTitle1}<br/>{cursoTitle2}
              </h2>
            </SmartField>
          </div>
        </div>

        {/* Texto Gigante "INSCRIÇÕES" */}
        <div className="mt-4 -ml-2 relative z-30">
          <SmartField field="sub_titulo" {...sp}>
            <h1 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'sub_titulo', e.currentTarget.innerText)}
              className="font-outfit font-black text-[56px] leading-[0.8] text-white tracking-tighter text-stroke-curso drop-shadow-lg outline-none cursor-text select-text"
              style={{ fontSize: `${56 * sTitle}px` }}
            >
              {inscricoesText}
            </h1>
          </SmartField>
        </div>

        {/* Caixa Verde "ABERTAS" */}
        <div className="relative mt-2 -ml-3 z-40">
          <div className="bg-[#00c814] px-5 pt-1.5 pb-0 rounded-2xl shadow-[0_10px_20px_rgba(0,200,20,0.4)] inline-block relative">
            <SmartField field="badge_text" {...sp}>
              <h1 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
                className="font-outfit font-black text-[62px] leading-[0.85] text-white tracking-tighter drop-shadow-sm outline-none cursor-text select-text"
                style={{ fontSize: `${62 * sTitle}px` }}
              >
                {abertasText}
              </h1>
            </SmartField>
            
            {/* Selo Checkmark */}
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#00c814] rounded-full flex items-center justify-center z-50">
              <div className="absolute inset-[-4px] border-[2px] border-dashed border-white rounded-full opacity-80" />
              <div className="w-full h-full bg-[#00c814] rounded-full border-2 border-white flex items-center justify-center relative z-10">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé: Avatar e Info do Autor */}
        <div className="absolute bottom-10 left-5 z-20 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-md shrink-0">
            <img src={avatarImage} className="w-full h-full object-cover" alt="Author" />
          </div>
          <SmartField field="texto_apoio" {...sp}>
            <div 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="flex flex-col outline-none cursor-text select-text text-left"
              style={{ fontSize: `${11 * sText}px` }}
            >
              <span className="font-outfit font-bold text-[11px] leading-tight text-white tracking-wide" style={{ fontSize: 'inherit' }}>
                {cursoAuthorName}
              </span>
              <span className="font-outfit font-light text-[10px] leading-tight text-white/90 tracking-wide" style={{ fontSize: `${10/11 * 11 * sText}px` }}>
                {cursoAuthorHandle}
              </span>
            </div>
          </SmartField>
        </div>

      </div>

      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={false}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={showBrandLogo}
        handleColor="#ffffff" counterColor="#ffffff" counterBg="#e81b85" />
    </div>
  );
}

export function SplitVariant211({
  data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
  titleScale, textScale, showMetrics, onActionStart, onTextChange,
  selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo
}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  const crepeTag = data.tag || "CREPE LA CASA";
  const titleLines = (data.titulo || "ESSE CREPE DEVERIA VIR COM\nAVISO DE\nRISCO").split('\n');
  const t1 = titleLines[0] || '';
  const t2 = titleLines[1] || '';
  const t3 = titleLines[2] || '';

  const crepeBoxText = data.texto_apoio || "PORQUE\nVOCÊ NÃO VAI\nCONSEGUIR\nPARAR NO\nPRIMEIRO.";

  const imgHeld = data.imageUrl || "https://images.unsplash.com/photo-1598215438188-7517c222ba81?q=80&w=600&auto=format&fit=crop";
  const imgCorner = "https://images.unsplash.com/photo-1589304010639-6cb8f1e58288?q=80&w=400&auto=format&fit=crop";

  return (
    <div className="relative w-full h-full bg-[#ffbd00] flex flex-col font-outfit select-none overflow-hidden text-[#6b0c19]">
      
      {/* Fundo com Textura de Ondas Suaves */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-10" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,40 C50,20 150,60 200,40 L200,200 L0,200 Z' fill='%23000000' opacity='0.2'/%3E%3Cpath d='M0,80 C50,60 150,100 200,80 L200,200 L0,200 Z' fill='%23000000' opacity='0.2'/%3E%3Cpath d='M0,120 C50,100 150,140 200,120 L200,200 L0,200 Z' fill='%23000000' opacity='0.2'/%3E%3C/svg%3E")`, backgroundSize: '150% 150%', backgroundPosition: 'center' }} 
      />

      {/* Elemento de Canto Superior Direito (Corte) */}
      <div className="absolute -top-6 -right-6 w-36 h-36 bg-white z-10 transform rotate-12 rounded-2xl shadow-[-5px_5px_15px_rgba(107,12,25,0.15)] overflow-hidden border-4 border-[#ffbd00]">
        <ImageBg imageUrl={imgCorner} className="w-[120%] h-[120%]" />
      </div>

      {/* Tag Superior */}
      <div className="relative z-20 flex justify-center mt-8">
        <SmartField field="tag" {...sp}>
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            className="border-[1.5px] border-[#6b0c19] text-[#6b0c19] px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest bg-transparent backdrop-blur-sm outline-none cursor-text select-text"
          >
            {crepeTag}
          </span>
        </SmartField>
      </div>

      {/* Tipografia Central Garrafal */}
      <div className="relative z-20 flex flex-col items-center text-center mt-8 px-4 w-full">
        <SmartField field="titulo" {...sp}>
          <div 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="flex flex-col items-center outline-none whitespace-pre-wrap cursor-text select-text"
          >
            <h3 className="font-outfit font-black text-[13px] tracking-wide text-[#6b0c19] mb-1" style={{ fontSize: `${13 * sTitle}px` }}>
              {t1}
            </h3>
            
            <div className="flex flex-col items-center mt-[-5px]">
              <h1 className="font-outfit font-black text-[62px] leading-[0.8] tracking-tighter text-[#6b0c19]" style={{ fontSize: `${62 * sTitle}px` }}>
                {t2}
              </h1>
              
              {/* Efeito Risco Duplo (Preenchido + Contorno Offset) */}
              <div className="relative w-full flex justify-center h-[75px] mt-1">
                {/* Stroke de Fundo (Branco) */}
                <span className="absolute top-[4px] left-[52%] -translate-x-1/2 font-outfit font-black text-[70px] leading-[0.8] tracking-tighter text-transparent z-0" 
                      style={{ WebkitTextStroke: '3px white', fontSize: `${70 * sTitle}px` }}>
                  {t3}
                </span>
                {/* Texto Principal */}
                <span className="absolute top-0 left-1/2 -translate-x-1/2 font-outfit font-black text-[70px] leading-[0.8] tracking-tighter text-[#6b0c19] z-10"
                      style={{ fontSize: `${70 * sTitle}px` }}>
                  {t3}
                </span>
              </div>
            </div>
          </div>
        </SmartField>
      </div>

      {/* Imagem Principal do Crepe (Base) */}
      <div className="absolute bottom-[-10%] left-[-15%] w-[120%] h-[60%] z-10 flex items-end justify-start pointer-events-none">
        <div className="relative w-full h-full transform -rotate-[8deg] drop-shadow-[0_20px_35px_rgba(0,0,0,0.4)]">
          <ImageBg 
            imageUrl={imgHeld}
            className="w-full h-full rounded-tr-[4rem]" 
            style={{ WebkitMaskImage: 'radial-gradient(circle, black 80%, transparent 95%)', maskImage: 'radial-gradient(circle, black 80%, transparent 95%)' }}
          />
        </div>
      </div>

      {/* Caixa Lateral Direita "Porque..." */}
      <div className="absolute bottom-[28%] right-5 bg-[#6b0c19] text-[#ffbd00] pl-5 pr-8 py-4 rounded-tl-[1.5rem] rounded-br-[1.5rem] shadow-xl z-30">
        <SmartField field="texto_apoio" {...sp}>
          <p 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-outfit font-bold text-[11px] leading-[1.3] tracking-wide text-left whitespace-pre-line outline-none cursor-text select-text"
            style={{ fontSize: `${11 * sText}px` }}
          >
            {crepeBoxText}
          </p>
        </SmartField>
      </div>

      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={false}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={showBrandLogo}
        handleColor="#6b0c19" counterColor="#6b0c19" counterBg="#ffbd00" />
    </div>
  );
}

export function SplitVariant212({
  data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
  titleScale, textScale, showMetrics, onActionStart, onTextChange,
  selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo
}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  const bgYellow = brandColor || "#e0aa00";
  const accentYellow = brandColor || "#fcae12";

  const logoText = data.sub_titulo || "Casa de Bolos";

  const titleData = data.titulo || "Brownie\nsimples|Brownie\nc/ nozes|Brownie\nc/ pistache";
  const itemsTitles = titleData.split('|');
  const b1Title = itemsTitles[0] || "Brownie\nsimples";
  const b2Title = itemsTitles[1] || "Brownie\nc/ nozes";
  const b3Title = itemsTitles[2] || "Brownie\nc/ pistache";

  const pricesData = data.texto_apoio || "50|55|60";
  const itemsPrices = pricesData.split('|');
  const b1Price = itemsPrices[0] || "50";
  const b2Price = itemsPrices[1] || "55";
  const b3Price = itemsPrices[2] || "60";

  const img1 = data.imageUrl || "https://tudosobrebrigadeirogourmet.com/wp-content/uploads/2016/11/13-receitas-de-brigadeiros-gourmet-faceis.webp";
  const img2 = "https://i.pinimg.com/736x/61/06/75/61067590c49ec4fdb7fa7605648060a9.jpg";
  const img3 = "https://minhasreceitinhas.com.br/wp-content/uploads/2023/04/receitas-de-docinhos-caseiros-dia-das-maes-1.jpg";

  const updateTitleItem = (itemIdx, newText) => {
    const arr = [b1Title, b2Title, b3Title];
    arr[itemIdx] = newText.replace(/\|/g, ''); // Evitar que o pipe quebre o split
    onTextChange(index, 'titulo', arr.join('|'));
  };

  const updatePriceItem = (itemIdx, newText) => {
    const arr = [b1Price, b2Price, b3Price];
    arr[itemIdx] = newText.replace(/\|/g, '');
    onTextChange(index, 'texto_apoio', arr.join('|'));
  };

  return (
    <div className="relative w-full h-full bg-[#fcaebb] flex flex-col font-outfit select-none overflow-hidden text-[#432311]">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
        .font-lobster { font-family: 'Lobster', cursive; }
        .text-shadow-dark { text-shadow: 1px 2px 4px rgba(0,0,0,0.8); }
      `}} />

      <div className="absolute inset-0 z-0" style={{ backgroundColor: bgYellow }} />
      <div className="absolute inset-0 flex flex-col z-10">
        
        {/* Bloco 1 */}
        <div className="flex-[1.2] relative bg-[#fffdfb] overflow-hidden border-b-[3px]" style={{ borderColor: brandColor }}>
          
          {/* Top Header Card */}
          <div className="absolute top-0 left-0 w-full h-[30%] flex items-center justify-center border-b-[5px] z-20" style={{ backgroundColor: accentYellow, borderColor: brandColor }}>
             <div className="absolute top-[-10px] w-48 h-20 bg-[#33180c] rounded-full blur-[10px] opacity-20" />
             <div className="relative flex flex-col items-center mt-3 drop-shadow-[0_4px_4px_rgba(51,24,12,0.8)]">
               
               <div className="bg-white px-3 py-1 rounded border shadow-sm transform -rotate-2 flex flex-col items-center" style={{ borderColor: brandColor }}>
                 <SmartField field="sub_titulo" {...sp}>
                   <div className="outline-none text-center">
                     <span 
                       contentEditable suppressContentEditableWarning
                       onBlur={(e) => {
                         onTextChange(index, 'sub_titulo', e.currentTarget.innerText);
                       }}
                       className="font-lobster text-[#d95229] text-[18px] leading-none drop-shadow-sm pr-1 cursor-text select-text"
                     >
                       {logoText}
                     </span>
                   </div>
                 </SmartField>
               </div>

             </div>
          </div>

          <ImageBg imageUrl={img1} className="w-full h-full" />

          {/* Text & Price Info */}
          <div className="absolute bottom-4 right-4 text-right flex flex-col items-end drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
             <SmartField field="titulo" {...sp}>
               <span 
                 contentEditable suppressContentEditableWarning
                 onBlur={(e) => updateTitleItem(0, e.currentTarget.innerText)}
                 className="font-lobster text-white text-[32px] leading-[0.85] tracking-wide text-shadow-dark mb-1 block outline-none cursor-text select-text whitespace-pre-wrap"
                 style={{ fontSize: `${32 * sTitle}px` }}
               >
                 {b1Title}
               </span>
             </SmartField>
          </div>
        </div>

        {/* Bloco 2 */}
        <div className="flex-1 relative bg-[#e5dfd3] overflow-hidden border-b-[3px]" style={{ borderColor: brandColor }}>
          <ImageBg imageUrl={img2} className="w-full h-full" />
          
          <div className="absolute bottom-4 left-4 text-left flex flex-col items-start drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
             <SmartField field="titulo" {...sp}>
               <span 
                 contentEditable suppressContentEditableWarning
                 onBlur={(e) => updateTitleItem(1, e.currentTarget.innerText)}
                 className="font-lobster text-white text-[32px] leading-[0.85] tracking-wide text-shadow-dark mb-1 block outline-none cursor-text select-text whitespace-pre-wrap"
                 style={{ fontSize: `${32 * sTitle}px` }}
               >
                 {b2Title}
               </span>
             </SmartField>
          </div>
        </div>

        {/* Bloco 3 */}
        <div className="flex-1 relative bg-[#f1f0ee] overflow-hidden">
          <ImageBg imageUrl={img3} className="w-full h-full" />
          
          <div className="absolute bottom-4 right-4 text-right flex flex-col items-end drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
             <SmartField field="titulo" {...sp}>
               <span 
                 contentEditable suppressContentEditableWarning
                 onBlur={(e) => updateTitleItem(2, e.currentTarget.innerText)}
                 className="font-lobster text-white text-[32px] leading-[0.85] tracking-wide text-shadow-dark mb-1 block outline-none cursor-text select-text whitespace-pre-wrap"
                 style={{ fontSize: `${32 * sTitle}px` }}
               >
                 {b3Title}
               </span>
             </SmartField>
          </div>
        </div>

      </div>

      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={false}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={showBrandLogo}
        handleColor="#33180c" counterColor="#33180c" counterBg={accentYellow} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 213 — Dia das Mães
// ═══════════════════════════════════════════════════════════
export function SplitVariant213(props) {
  const {
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  const titleScript = data.tag !== undefined ? data.tag : "Receitas que vão bombar";
  const titleMain = data.titulo || "NO DIA DAS MÃES!";
  const subtitle = data.texto_apoio !== undefined ? data.texto_apoio : "Material exclusivo com criações pensadas para vender mais, produzir melhor e encantar seus clientes";
  const ctaText = data.badge_text !== undefined ? data.badge_text : "Baixe agora no link da bio";
  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80";
  
  const primaryColor = brandColor || "#99001f";

  return (
    <div 
      id="tpl-mothers_day" 
      className="template-card w-full h-full flex flex-col relative bg-white justify-between p-0 overflow-hidden"
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
        .font-script { font-family: 'Playfair Display', serif; }
        .shadow-\\[0_24px_50px_rgba\\(0\\2c 0\\2c 0\\2c 0\\.35\\)\\] {
          --tw-shadow: 0 10px 25px rgb(0 0 0 / 25%);
          --tw-shadow-colored: 0 24px 50px var(--tw-shadow-color);
          box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
        }
      `}} />

      {/* Painel Superior com Fundo Vermelho e Arco Côncavo */}
      <div 
        id="md_top_panel" 
        className="relative w-full h-[62%] shrink-0 flex flex-col justify-start text-center pt-[38px] px-[32px] z-10 text-white" 
        style={{ backgroundColor: primaryColor }}
      >
        {/* Título Script Manuscrito */}
        <SmartField field="tag" {...sp} className="relative z-20">
          <h3 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            id="md_title_script_lbl" 
            className="font-script text-white outline-none cursor-text select-text text-center text-stroke-none"
            style={{ fontSize: `${45.9 * sTitle}px`, lineHeight: 1 }}
          >
            {titleScript}
          </h3>
        </SmartField>

        {/* Título de Impacto Secundário */}
        <SmartField field="titulo" {...sp} className="relative z-20 mt-[3px]">
          <h2 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            id="md_title_main_lbl" 
            className="font-sans font-black uppercase text-white tracking-tight leading-[1.1] outline-none cursor-text select-text text-center"
            style={{ fontSize: `${45 * sTitle}px` }}
          >
            {titleMain}
          </h2>
        </SmartField>

        {/* Curva em Arco Concavo de Transição para o Branco */}
        <div className="absolute left-0 right-0 -bottom-[1px] h-[46px] overflow-hidden pointer-events-none">
          <svg viewBox="0 0 1440 120" className="absolute bottom-0 w-full h-[46px] text-white fill-current" preserveAspectRatio="none">
            <path d="M0,0 C360,120 1080,120 1440,0 L1440,120 L0,120 Z"></path>
          </svg>
        </div>
      </div>

      {/* Parte Inferior Branca de Detalhes */}
      <div className="relative flex-1 shrink-0 bg-white flex flex-col justify-between p-[27px] text-zinc-800 z-10">
        {/* Subtítulo de Apoio no Meio */}
        <div className="w-full text-center mt-[60px] px-[22px] z-10">
          <SmartField field="texto_apoio" {...sp}>
            <p 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              id="md_subtitle_lbl" 
              className="text-zinc-600 font-medium tracking-wide leading-relaxed max-w-[90%] mx-auto outline-none cursor-text select-text"
              style={{ fontSize: `${19 * sText}px` }}
            >
              {subtitle}
            </p>
          </SmartField>
        </div>

        {/* Botão CTA elegante de rodapé */}
        {ctaText && (
          <div className="w-full flex justify-center mt-auto pb-[11px] z-10">
            <SmartField field="badge_text" {...sp}>
              <div 
                id="md_cta_btn" 
                className="text-white rounded-full px-[32px] py-[13.5px] font-extrabold flex items-center gap-[11px] shadow-xl transition-all duration-300 outline-none cursor-text select-text" 
                style={{ backgroundColor: primaryColor }}
              >
                <span 
                  contentEditable suppressContentEditableWarning
                  onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
                  id="md_cta_lbl"
                  style={{ fontSize: `${15.12 * sText}px`, letterSpacing: '0.05em' }}
                >
                  {ctaText}
                </span>
              </div>
            </SmartField>
          </div>
        )}
      </div>

      {/* Card Central de Mockup Flutuante com Sombra Forte (O livro físico) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[220px] z-20 pointer-events-none flex items-center justify-center">
        <SmartField field="imagem" {...sp} className="w-full h-full rounded-[10px] shadow-[0_24px_50px_rgba(0,0,0,0.35)] border border-black/5 flex items-center justify-center pointer-events-auto">
          <ImageBg data={data} imageUrl={imageUrl} className="w-full h-full rounded-[8px]" />
        </SmartField>
      </div>

      {/* SlideHeader para manter a assinatura visual do Carrossel Studio */}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={showBrandLogo}
        handleColor={showSlideCounter && slideCounterPosition === 'top' ? "#ffffff" : "#636363"} 
        counterColor="#636363" counterBg="#ffffff" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 214 — Orange Routine
// ═══════════════════════════════════════════════════════════
export function SplitVariant214(props) {
  const {
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  const helperPhrase = data.tag !== undefined ? data.tag : "Um copo de suco de laranja por dia pode";
  const impactTitle = data.titulo || "MUDAR A\nSUA ROTINA";
  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80";
  
  const backgroundColor = brandColor || "#ff9000";
  const textColor = "#fdfcf7";
  const archHeightPercent = 58;

  return (
    <div 
      id="tpl-orange_routine" 
      className="w-full h-full flex flex-col relative p-0 justify-between overflow-hidden"
      style={{ backgroundColor, color: textColor }}
    >
      {/* Conteúdo do Topo (Textos e Ícone) */}
      <div className="w-full flex flex-col pt-[43px] px-[43px] text-center z-10">
        
        {/* Frase Auxiliar Superior */}
        {helperPhrase && (
          <SmartField field="tag" {...sp} className="mb-[16px]">
            <p 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              id="or_title1_lbl" 
              className="font-medium tracking-wide opacity-90 leading-tight outline-none cursor-text select-text"
              style={{ fontSize: `${21 * sText}px` }}
            >
              {helperPhrase}
            </p>
          </SmartField>
        )}

        {/* Título Gigante Principal */}
        <SmartField field="titulo" {...sp}>
          <h2 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            id="or_title2_lbl" 
            className="font-sans font-black uppercase whitespace-pre-line tracking-tight leading-none outline-none cursor-text select-text text-center"
            style={{ fontSize: `${60 * sTitle}px` }}
          >
            {impactTitle}
          </h2>
        </SmartField>
      </div>

      {/* Painel em Arco Portal (Sangramento total inferior) */}
      <SmartField field="imagem" {...sp} 
        className="relative w-full overflow-hidden rounded-t-[90px] bg-zinc-200 shrink-0 border-t border-white" 
        style={{ height: `${archHeightPercent}%` }}
      >
        <ImageBg data={data} imageUrl={imageUrl} className="absolute inset-0" />
      </SmartField>

      {/* SlideHeader para manter a assinatura visual do Carrossel Studio */}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={showBrandLogo}
        handleColor="#ffffff" counterColor="#ffffff" counterBg={backgroundColor} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 215 — Recipe Swipe (Recipe Red)
// ═══════════════════════════════════════════════════════════
export function SplitVariant215(props) {
  const {
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  const title = data.titulo || "Bolo Gelado de Chocolate com Coco";
  const subtitle = data.texto_apoio !== undefined ? data.texto_apoio : "Receita: Mavalério";
  const tagText = data.tag !== undefined ? data.tag : "Receita";
  const actionText = data.badge_text !== undefined ? data.badge_text : "arraste para\no lado";
  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=1080&auto=format&fit=crop";
  
  const backgroundColor = brandColor || "#e20613";
  const tagBackgroundColor = "#ffdf59";
  const tagTextColor = "#8a1c14";

  return (
    <div 
      id="tpl-recipe_swipe" 
      className="w-full h-full relative flex flex-col overflow-hidden transition-all duration-300"
      style={{ backgroundColor }}
    >
      {/* Seção da Imagem Superior com Borda Arredondada */}
      <SmartField field="imagem" {...sp}
        className="w-[calc(100%-12px)] h-[calc(58%-10px)] relative rounded-tr-[45px] overflow-hidden bg-white shadow-xl z-10 transition-all duration-300 border-b border-r border-white"
      >
        <ImageBg data={data} imageUrl={imageUrl} className="absolute inset-0 w-full h-full" />
      </SmartField>

      {/* Seção Inferior de Textos e Rodapé */}
      <div className="flex-1 flex flex-col p-[24px] relative z-20 justify-between">
        <div className="space-y-[6px]">
          <SmartField field="titulo" {...sp} className="w-[95%]">
            <h1 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-sans font-bold text-white leading-[1.1] tracking-tight outline-none text-left whitespace-pre-line"
              style={{ fontSize: `${37 * sTitle}px` }}
            >
              {title}
            </h1>
          </SmartField>
          {subtitle && (
            <SmartField field="texto_apoio" {...sp}>
              <p 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                className="font-sans text-white/90 font-light outline-none text-left whitespace-pre-line"
                style={{ fontSize: `${19 * sText}px` }}
              >
                {subtitle}
              </p>
            </SmartField>
          )}
        </div>

        {/* Footer (Botão Swipe + Logo) */}
        <div className="flex justify-between items-end mt-auto">
          
          {/* Botão Pill 'Arraste' */}
          {actionText && (
            <SmartField field="badge_text" {...sp}>
              <div className="border border-white/80 rounded-[24px] pl-[20px] pr-[40px] py-[12px] flex items-center gap-[10px] bg-gradient-to-r from-white/10 to-transparent shadow-lg backdrop-blur-sm">
                <svg className="w-[20px] h-[20px] text-white shrink-0 pointer-events-none" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
                <p 
                  contentEditable suppressContentEditableWarning
                  onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
                  className="font-sans text-white leading-tight font-medium tracking-wide outline-none whitespace-pre-line"
                  style={{ fontSize: `${12 * sText}px` }}
                >
                  {actionText}
                </p>
              </div>
            </SmartField>
          )}
          
          {/* Logo com Auto-White Filter */}
          {showBrandLogo && brandLogo && (
            <img 
              src={brandLogo} 
              className="h-[40px] object-contain drop-shadow-md pb-[4px]" 
              style={{ filter: 'brightness(0) invert(1)' }} 
              crossOrigin="anonymous" 
              alt="Logo"
            />
          )}
        </div>
      </div>

      {/* SlideHeader para manter a assinatura visual do Carrossel Studio */}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor="#ffffff" counterColor="#ffffff" counterBg={backgroundColor} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 216 — Clean Tweet
// ═══════════════════════════════════════════════════════════
export function SplitVariant216(props) {
  const { 
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo 
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const name = data.tag || "Bruna Rebelo";
  const handle = brandHandle || "@brunarebelo";
  const title = data.titulo || "5 sinais de que seu brigadeiro vai cristalizar antes de ir para a forminha";
  const description = data.texto_apoio || "O seu doce fica arenoso ou duro muito rápido? O erro quase nunca é a marca do leite condensado, mas sim a técnica de cocção!";
  const footerLeft = data.badge_text || "ESTÚDIO DE CONFEITARIA";
  
  const avatarUrl = brandAvatar || "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=150";
  const imageUrl = data.imageUrl || "https://tudosobrebrigadeirogourmet.com/wp-content/uploads/2018/02/ganhar-dinheiro-vendendo-brigadeiro.webp";
  const accentColor = brandColor || "#DE1E4D";

  return (
    <div id="container-clean" className="w-full h-full bg-white text-zinc-950 p-6 flex flex-col justify-between transition-all duration-300 relative select-none">
      
      <div className="space-y-4">
        {/* Header com Perfil */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-zinc-200 shrink-0">
            <img src={avatarUrl} crossOrigin="anonymous" className="w-full h-full object-cover" alt="Avatar" />
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-1">
              <SmartField field="tag" {...sp}>
                <span 
                  contentEditable suppressContentEditableWarning
                  onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
                  className="font-sans font-extrabold text-sm tracking-tight text-zinc-900 outline-none block"
                >
                  {name}
                </span>
              </SmartField>
              {isVerified && (
                <svg className="w-4 h-4 text-emerald-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              )}
            </div>
            <span className="text-xs text-zinc-500 font-medium block">{handle}</span>
          </div>
        </div>

        {/* Manchete Impactante */}
        <SmartField field="titulo" {...sp}>
          <h2 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-sans font-extrabold leading-snug text-zinc-950 tracking-tight outline-none"
            style={{ fontSize: `${20 * sTitle}px` }}
          >
            {title}
          </h2>
        </SmartField>

        {/* Texto Descritivo */}
        <SmartField field="texto_apoio" {...sp}>
          <p 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="text-zinc-600 font-normal leading-relaxed outline-none"
            style={{ fontSize: `${12 * sText}px` }}
          >
            {description}
          </p>
        </SmartField>
      </div>

      {/* Imagem do Doce */}
      <SmartField field="imagem" {...sp} className="relative flex-1 min-h-[180px] rounded-2xl overflow-hidden border border-zinc-100/80 mt-4 shadow-inner">
        <ImageBg data={data} imageUrl={imageUrl} className="absolute inset-0 w-full h-full transition-all duration-500 transform hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      </SmartField>

      {/* Rodapé Sutil do Post */}
      <div className="mt-4 pt-3 border-t border-zinc-100 flex justify-between items-center text-[10px] font-bold text-zinc-400 tracking-wider">
        <SmartField field="badge_text" {...sp}>
          <span 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
            className="outline-none block"
          >
            {footerLeft}
          </span>
        </SmartField>
        <span className="flex items-center gap-1 uppercase" style={{ color: accentColor }}>
          ARRASTA PARA O LADO
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
          </svg>
        </span>
      </div>

      {/* SlideHeader do Carrossel Studio integrado de forma sutil no topo para numeração de página */}
      <div className="absolute top-2 right-6 pointer-events-none">
        <SlideHeader 
          data={data} 
          slideIndex={index} 
          onActionStart={onActionStart} 
          selectedElement={selectedElement} 
          onSelectElement={onSelectElement} 
          index={index + 1} 
          total={slideCount} 
          brandHandle={brandHandle} 
          showBrandHandle={false} 
          brandColor={brandColor} 
          isVerified={false} 
          showSlideCounter={showSlideCounter} 
          slideCounterPosition={slideCounterPosition} 
          brandAvatar={brandAvatar} 
          hideDot={true} 
          counterBg="rgba(0,0,0,0.05)" 
          handleColor="transparent" 
          counterColor="#9ca3af" 
          brandLogo={brandLogo} 
          showBrandLogo={false} 
          className="pointer-events-auto"
        />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 217 — Choux Lab (4 Quadrantes)
// ═══════════════════════════════════════════════════════════
export function SplitVariant217(props) {
  const { 
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, 
    titleScale, textScale, showMetrics, onActionStart, onTextChange, 
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo 
  } = props;

  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const q1Img = data.imageUrl || "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80";
  const q2Img = data.imageUrl2 || "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=600&q=80";
  const q3Img = data.imageUrl3 || "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80";
  const q4Img = data.imageUrl4 || "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80";

  const q1Text = data.q1Text !== undefined ? data.q1Text : "chouxcotorta";
  const q2Text = data.q2Text !== undefined ? data.q2Text : "cream cheese da casa";
  const q3Text = data.q3Text !== undefined ? data.q3Text : "doce de leite de ovelha";
  const q4Text = data.q4Text !== undefined ? data.q4Text : "choux cream";

  return (
    <div id="tpl-choux_lab" className="w-full h-full grid grid-cols-2 grid-rows-2 relative transition-all duration-300 overflow-hidden bg-black select-none">
      {/* Overlay de Ruído Geral */}
      <div id="noise-overlay" className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] z-20"></div>

      {/* Quadrante 1 (Top-Left) */}
      <div className="relative overflow-hidden flex items-center justify-center border-r border-b border-white/5 group">
        <SmartField field="imagem" {...sp} className="absolute inset-0 w-full h-full">
          <ImageBg data={data} imageUrl={q1Img} imagePosition={data.imagePosition} imageScale={data.imageScale} className="absolute inset-0 w-full h-full transition-transform duration-700 scale-100 group-hover:scale-105" />
        </SmartField>
        <div id="q1_overlay_div" className="absolute inset-0 bg-black/15 transition-opacity duration-300 pointer-events-none"></div>
        <SmartField field="q1Text" {...sp} className="relative z-10 px-4">
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'q1Text', e.currentTarget.innerText)}
            className="text-white font-sans text-sm font-medium text-center filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] outline-none block"
            style={{ fontSize: `${14 * sTitle}px` }}
          >
            {q1Text}
          </span>
        </SmartField>
      </div>

      {/* Quadrante 2 (Top-Right) */}
      <div className="relative overflow-hidden flex items-center justify-center border-b border-white/5 group">
        <SmartField field="imagem2" {...sp} className="absolute inset-0 w-full h-full">
          <ImageBg data={data} imageUrl={q2Img} imagePosition={data.imagePosition2 ?? data.imagePosition} imageScale={data.imageScale2 ?? data.imageScale} className="absolute inset-0 w-full h-full transition-transform duration-700 scale-100 group-hover:scale-105" />
        </SmartField>
        <div id="q2_overlay_div" className="absolute inset-0 bg-black/25 transition-opacity duration-300 pointer-events-none"></div>
        <SmartField field="q2Text" {...sp} className="relative z-10 px-4">
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'q2Text', e.currentTarget.innerText)}
            className="text-white font-sans text-sm font-medium text-center filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] outline-none block"
            style={{ fontSize: `${14 * sTitle}px` }}
          >
            {q2Text}
          </span>
        </SmartField>
      </div>

      {/* Quadrante 3 (Bottom-Left) */}
      <div className="relative overflow-hidden flex items-center justify-center border-r border-white/5 group">
        <SmartField field="imagem3" {...sp} className="absolute inset-0 w-full h-full">
          <ImageBg data={data} imageUrl={q3Img} imagePosition={data.imagePosition3 ?? data.imagePosition} imageScale={data.imageScale3 ?? data.imageScale} className="absolute inset-0 w-full h-full transition-transform duration-700 scale-100 group-hover:scale-105" />
        </SmartField>
        <div id="q3_overlay_div" className="absolute inset-0 bg-black/15 transition-opacity duration-300 pointer-events-none"></div>
        <SmartField field="q3Text" {...sp} className="relative z-10 px-4">
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'q3Text', e.currentTarget.innerText)}
            className="text-white font-sans text-sm font-medium text-center filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] outline-none block"
            style={{ fontSize: `${14 * sTitle}px` }}
          >
            {q3Text}
          </span>
        </SmartField>
      </div>

      {/* Quadrante 4 (Bottom-Right) */}
      <div className="relative overflow-hidden flex items-center justify-center group">
        <SmartField field="imagem4" {...sp} className="absolute inset-0 w-full h-full">
          <ImageBg data={data} imageUrl={q4Img} imagePosition={data.imagePosition4 ?? data.imagePosition} imageScale={data.imageScale4 ?? data.imageScale} className="absolute inset-0 w-full h-full transition-transform duration-700 scale-100 group-hover:scale-105" />
        </SmartField>
        <div id="q4_overlay_div" className="absolute inset-0 bg-black/10 transition-opacity duration-300 pointer-events-none"></div>
        <SmartField field="q4Text" {...sp} className="relative z-10 px-4">
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'q4Text', e.currentTarget.innerText)}
            className="text-white font-sans text-sm font-medium text-center filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] outline-none block"
            style={{ fontSize: `${14 * sTitle}px` }}
          >
            {q4Text}
          </span>
        </SmartField>
      </div>

      {/* SlideHeader do Carrossel Studio */}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor="#ffffff" counterColor="#ffffff" counterBg="rgba(0,0,0,0.3)" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 218 — Açaí Grid Showcase
// ═══════════════════════════════════════════════════════════
export function SplitVariant218(props) {
  const { 
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, 
    titleScale, textScale, showMetrics, onActionStart, onTextChange, 
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo 
  } = props;

  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  const bgColor = brandColor || '#f2d022';
  const texture = data.texture !== undefined ? data.texture : true;
  const padding = data.padding !== undefined ? data.padding : 8;
  const gap = data.gap !== undefined ? data.gap : 6;
  const radius = data.radius !== undefined ? data.radius : 0;

  const defaultImages = [
    'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=400',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400',
    'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=400',
    'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=400',
    'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400',
    'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=400',
    'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=400',
    'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=400',
    'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400',
    'https://images.unsplash.com/photo-1517881917430-e70dfb3610aa?auto=format&fit=crop&w=400',
    'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400',
    'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=400'
  ];

  const gridImages = Array.from({ length: 12 }).map((_, i) => {
    const key = i === 0 ? 'imageUrl' : `imageUrl${i + 1}`;
    return data[key] || defaultImages[i];
  });

  const linenStyle = texture ? {
    backgroundImage: `
      repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 4px),
      repeating-linear-gradient(90deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 4px),
      repeating-linear-gradient(0deg, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 2px, transparent 2px, transparent 6px),
      repeating-linear-gradient(90deg, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 2px, transparent 2px, transparent 6px)
    `
  } : {};

  return (
    <div 
      className="w-full h-full relative flex items-center justify-center transition-all duration-300 overflow-hidden"
      style={{ 
        backgroundColor: bgColor,
        ...linenStyle
      }}
    >
      {/* Wrapper para controlar a margem interna (Padding) dinamicamente */}
      <div 
        className="w-full h-full flex items-center justify-center"
        style={{ padding: `${padding}%` }}
      >
        {/* Grid 3x4 de Imagens */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            width: '100%',
            height: '100%',
            gap: `${gap}px`
          }}
        >
          {gridImages.map((imgSrc, i) => {
            const fieldName = i === 0 ? 'imagem' : `imagem${i + 1}`;
            return (
              <div 
                key={i} 
                className="w-full h-full overflow-hidden bg-neutral-800/10 relative"
                style={{ borderRadius: `${radius}px` }}
              >
                <SmartField field={fieldName} {...sp} className="absolute inset-0 w-full h-full">
                  <ImageBg 
                    data={data} 
                    imageUrl={imgSrc} 
                    imagePosition={data[`imagePosition${i === 0 ? '' : i + 1}`]} 
                    imageScale={data[`imageScale${i === 0 ? '' : i + 1}`]} 
                    className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none" 
                  />
                </SmartField>
              </div>
            );
          })}
        </div>
      </div>

      {/* SlideHeader do Carrossel Studio */}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor="#1a1a1a" counterColor="#1a1a1a" counterBg="rgba(255,255,255,0.4)" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 219 — Tributo Curvo
// ═══════════════════════════════════════════════════════════
export function SplitVariant219(props) {
  const { 
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, 
    titleScale, textScale, showMetrics, onActionStart, onTextChange, 
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo 
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const bgColor = brandColor || data.bgColor || '#ea580c';
  const lines = data.lines !== undefined ? data.lines : true;
  const topSmallText = data.tag !== undefined ? data.tag : '15/3 - DIA DO CONSUMIDOR';
  const topMainText = data.titulo || 'AGRADECEMOS A CADA UM DOS NOSSOS CONSUMIDORES';
  const bottomText = data.texto_apoio || 'Sem o apoio e parceria de vocês, nossa jornada não seria possível';
  const brandText = brandHandle || data.badge_text || 'gourmet lab';
  const iconType = data.iconType || 'stars_users';

  // Dicionário de ilustrações SVG reativas ao tema
  const vectorIllustrations = {
    stars_users: (
      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Três Estrelas no Topo */}
        <polygon points="50,6 53,16 63,16 55,22 58,32 50,26 42,32 45,22 37,16 47,16" fill="white"/>
        <polygon points="30,14 32.5,21 39.5,21 34,25.5 36,32.5 30,28 24,32.5 26,25.5 20.5,21 27.5,21" fill="white" opacity={0.8}/>
        <polygon points="70,14 72.5,21 79.5,21 74,25.5 76,32.5 70,28 64,32.5 66,25.5 60.5,21 67.5,21" fill="white" opacity={0.8}/>
        
        {/* Corações de Parceria Laterais */}
        <path d="M12,40 C8,35 2,38 2,44 C2,50 12,56 12,56 C12,56 22,50 22,44 C22,38 16,35 12,40 Z" fill="none" stroke="white" strokeWidth={2}/>
        <path d="M18,52 C15,48 11,50 11,54 C11,58 18,62 18,62 C18,62 25,58 25,54 C25,50 21,48 18,52 Z" fill="none" stroke="white" strokeWidth={1.5} opacity={0.7}/>
        
        <path d="M88,40 C84,35 78,38 78,44 C78,50 88,56 88,56 C88,56 98,50 98,44 C98,38 92,35 88,40 Z" fill="none" stroke="white" strokeWidth={2}/>
        <path d="M82,52 C79,48 75,50 75,54 C75,58 82,62 82,62 C82,62 89,58 89,54 C89,50 85,48 82,52 Z" fill="none" stroke="white" strokeWidth={1.5} opacity={0.7}/>

        {/* Clientes Centralizados */}
        <circle cx="50" cy="46" r="11" fill="white"/>
        <path d="M32,74 C32,60 40,54 50,54 C60,54 68,60 68,74 Z" fill="white"/>
        
        {/* Cliente Esquerdo */}
        <circle cx="34" cy="52" r="8" fill="white" opacity={0.9}/>
        <path d="M20,74 C20,64 26,60 34,60 C38,60 41,61 43,63" stroke="white" strokeWidth={4} strokeLinecap="round" fill="none" opacity={0.9}/>
        <path d="M20,74 C20,64 26,60 34,60 C36,60 39,61 41,62" fill="white" opacity={0.9}/>

        {/* Cliente Direito */}
        <circle cx="66" cy="52" r="8" fill="white" opacity={0.9}/>
        <path d="M80,74 C80,64 74,60 66,60 C62,60 59,61 57,63" stroke="white" strokeWidth={4} strokeLinecap="round" fill="none" opacity={0.9}/>
        <path d="M80,74 C80,64 74,60 66,60 C64,60 61,61 59,62" fill="white" opacity={0.9}/>
      </svg>
    ),
    gourmet_chef: (
      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Brilhos e Estrelas */}
        <polygon points="20,25 22,30 27,30 23,33 25,38 20,35 15,38 17,33 13,30 18,30" fill="white"/>
        <polygon points="80,25 82,30 87,30 83,33 85,38 80,35 75,38 77,33 73,30 78,30" fill="white"/>
        <polygon points="50,5 52,10 57,10 53,13 55,18 50,15 45,18 47,13 43,10 48,10" fill="white"/>

        {/* Chapéu de Chef Elegante */}
        <path d="M30,55 C25,55 22,48 27,42 C22,35 32,25 40,30 C45,20 55,20 60,30 C68,25 78,35 73,42 C78,48 75,55 70,55 Z" fill="white"/>
        <rect x="33" y="53" width="34" height="12" rx="4" fill="white" stroke={bgColor} strokeWidth={2}/>
        <line x1="42" y1="53" x2="42" y2="65" stroke={bgColor} strokeWidth={1.5}/>
        <line x1="50" y1="53" x2="50" y2="65" stroke={bgColor} strokeWidth={1.5}/>
        <line x1="58" y1="53" x2="58" y2="65" stroke={bgColor} strokeWidth={1.5}/>

        {/* Talheres cruzados festivos */}
        <path d="M35,78 L45,68" stroke="white" strokeWidth={3} strokeLinecap="round"/>
        <path d="M65,78 L55,68" stroke="white" strokeWidth={3} strokeLinecap="round"/>
      </svg>
    ),
    sweet_celebration: (
      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Balão de Amor Superior */}
        <path d="M50,12 C46,4 32,4 32,16 C32,28 50,40 50,40 C50,40 68,28 68,16 C68,4 54,4 50,12 Z" fill="white"/>
        
        {/* Prato do Bolo */}
        <line x1="20" y1="75" x2="80" y2="75" stroke="white" strokeWidth={4} strokeLinecap="round"/>
        <path d="M35,75 L42,88 L58,88 L65,75" fill="white" opacity={0.9}/>

        {/* Bolo de 2 Andares */}
        <rect x="28" y="52" width="44" height="23" rx="3" fill="white"/>
        <rect x="35" y="36" width="30" height="16" rx="2" fill="white" opacity={0.95}/>
        
        {/* Velinhas acesas */}
        <line x1="50" y1="36" x2="50" y2="28" stroke="white" strokeWidth={2}/>
        <path d="M50,28 C50,28 48,25 50,22 C52,25 50,28 50,28 Z" fill={bgColor}/>

        {/* Detalhes de Confeitos com a cor dinâmica de fundo */}
        <circle cx="34" cy="62" r="2.5" fill={bgColor}/>
        <circle cx="45" cy="64" r="2.5" fill={bgColor}/>
        <circle cx="56" cy="61" r="2.5" fill={bgColor}/>
        <circle cx="66" cy="63" r="2.5" fill={bgColor}/>
      </svg>
    )
  };

  return (
    <div className="w-full h-full relative flex flex-col justify-between bg-white transition-all duration-300 select-none overflow-hidden">
      
      {/* Linhas Geométricas Sutis de Fundo (Fundo Branco do Rodapé) */}
      {lines && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
          <div className="absolute w-[120px] h-[120px] border border-neutral-400 rotate-[15deg] left-[-20px] bottom-[10%]"></div>
          <div className="absolute w-[180px] h-[180px] border border-neutral-400 rotate-[-12deg] right-[-40px] bottom-[-20px]"></div>
          <div className="absolute w-[150px] h-[150px] border border-neutral-400 rotate-[45deg] left-[25%] bottom-[-50px]"></div>
        </div>
      )}

      {/* Cúpula Colorida Superior (Arco Orgânico) */}
      <div 
        className="w-full h-[68%] relative flex flex-col items-center justify-between py-[12%] px-[8%] text-center z-10 transition-all duration-300" 
        style={{ 
          backgroundColor: bgColor, 
          borderRadius: '0 0 50% 50% / 0 0 22% 22%' 
        }}
      >
        {/* Tag Superior */}
        <SmartField field="tag" {...sp}>
          <span 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            className="text-[10px] font-extrabold uppercase tracking-widest text-white/90 outline-none block"
            style={{ fontSize: `${10 * sText}px` }}
          >
            {topSmallText}
          </span>
        </SmartField>
        
        {/* Ilustração Vetorial Dinâmica Centralizada */}
        <div className="w-24 h-24 my-auto flex items-center justify-center text-white">
          {vectorIllustrations[iconType] || vectorIllustrations.stars_users}
        </div>

        {/* Texto de Gratidão Principal */}
        <SmartField field="titulo" {...sp} className="max-w-[90%]">
          <h2 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="text-white font-extrabold leading-tight tracking-tight uppercase outline-none"
            style={{ fontSize: `${20 * sTitle}px` }}
          >
            {topMainText}
          </h2>
        </SmartField>
      </div>

      {/* Conteúdo de Rodapé (Fundo Branco) */}
      <div className="h-[32%] w-full flex flex-col justify-between items-center text-center px-[8%] pb-[8%] pt-[4%] z-10 relative">
        {/* Frase de Parceria */}
        <SmartField field="texto_apoio" {...sp} className="max-w-[85%] my-auto">
          <p 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="text-neutral-500 font-semibold leading-relaxed outline-none"
            style={{ fontSize: `${12 * sText}px` }}
          >
            {bottomText}
          </p>
        </SmartField>
        
        {/* Logo Textual da Assinatura */}
        <SmartField field="badge_text" {...sp}>
          <div className="flex items-center gap-1.5 justify-center">
            <span 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="font-extrabold text-sm tracking-tight text-neutral-800 outline-none block"
            >
              {brandText}
            </span>
            {/* Logo Dot */}
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500"></span>
          </div>
        </SmartField>
      </div>

      {/* SlideHeader do Carrossel Studio */}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor="#ffffff" counterColor="#ffffff" counterBg="rgba(255,255,255,0.2)" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 220 — Cupcake Retro (Doçura)
// ═══════════════════════════════════════════════════════════
export function SplitVariant220(props) {
  const { 
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo 
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const title1 = data.titulo || "Doces Retrô";
  const description = data.texto_apoio || "Coleção Exclusiva Anos 70";
  const cta = data.badge_text !== undefined ? data.badge_text : "Peça o Seu!";
  
  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=1080&auto=format&fit=crop";
  const backgroundColor = brandColor || data.backgroundColor || "#ec4899";
  const backgroundColorLight = data.backgroundColorLight || "#f9a8d4";
  const accentColor = data.accentColor || "#facc15";
  const textColor = data.textColor || "#ffffff";
  const footerColor = data.footerColor || "#0f172a";

  return (
    <div 
      id="tpl-cupcake" 
      className="w-full h-full relative overflow-hidden flex flex-col select-none transition-all duration-300 font-sans"
      style={{ background: `radial-gradient(circle, ${backgroundColorLight} 0%, ${backgroundColor} 100%)` }}
    >
      {/* Estilos locais para garantir independência de CSS global */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Pacifico&family=Inter:wght@300;400;600;800&display=swap');
        
        .font-bebas { font-family: 'Bebas Neue', sans-serif; }
        .font-pacifico { font-family: 'Pacifico', cursive; }
        .font-sans { font-family: 'Inter', sans-serif; }

        @keyframes float-slow {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-12px) rotate(5deg); }
        }
        @keyframes float-mid {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-8px) rotate(-6deg); }
        }
        @keyframes bounce-subtle {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-6px) scale(1.03); }
        }
        
        .animate-float-1 { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-2 { animation: float-mid 5s ease-in-out infinite; }
        .animate-bounce-subtle { animation: bounce-subtle 3s ease-in-out infinite; }
        
        .text-stroke-1 {
            -webkit-text-stroke: 1.5px currentColor;
            color: transparent;
        }
      `}} />

      {/* Text Repeating Background */}
      <div 
        className="absolute inset-x-0 top-12 flex flex-col items-center justify-center select-none pointer-events-none opacity-20 font-bebas tracking-wide leading-none text-stroke-1"
        style={{ color: textColor }}
      >
        <div className="text-[5.5rem] tracking-widest">CUPCAKE</div>
        <div className="text-[5.5rem] tracking-widest mt-[-0.8rem]">CUPCAKE</div>
        <div className="text-[5.5rem] tracking-widest mt-[-0.8rem]">CUPCAKE</div>
      </div>

      {/* Floaty Chocolates (Vetor SVG) */}
      <svg 
        className="absolute top-24 left-8 w-12 h-12 animate-float-1 pointer-events-none opacity-70" 
        viewBox="0 0 24 24" 
        fill="currentColor"
        style={{ color: backgroundColorLight }}
      >
        <path d="M12 2C11.5 2 10 3 10 5s1 3 2 3 2-1 2-3-1.5-3-2-3zm-5 5c-1 0-2 1-2 2.5s1 2.5 2 2.5c.5 0 1-.2 1.4-.5.5.9 1.4 1.5 2.6 1.5s2.1-.6 2.6-1.5c.4.3.9.5 1.4.5 1 0 2-1 2-2.5S18 7 17 7h-10zm-3 8c0 2 2 4 4.5 4h5c2.5 0 4.5-2 4.5-4H4z"/>
      </svg>
      <svg 
        className="absolute bottom-32 right-8 w-10 h-10 animate-float-2 pointer-events-none opacity-60" 
        viewBox="0 0 24 24" 
        fill="currentColor"
        style={{ color: backgroundColorLight }}
      >
        <path d="M12 2C11.5 2 10 3 10 5s1 3 2 3 2-1 2-3-1.5-3-2-3zm-5 5c-1 0-2 1-2 2.5s1 2.5 2 2.5c.5 0 1-.2 1.4-.5.5.9 1.4 1.5 2.6 1.5s2.1-.6 2.6-1.5c.4.3.9.5 1.4.5 1 0 2-1 2-2.5S18 7 17 7h-10zm-3 8c0 2 2 4 4.5 4h5c2.5 0 4.5-2 4.5-4H4z"/>
      </svg>

      {/* Main Image Frame */}
      <SmartField field="imagem" {...sp} className="absolute left-8 right-8 top-16 bottom-[130px] bg-white rounded-[2rem] shadow-2xl p-4 flex flex-col border-4 border-white overflow-hidden">
        <ImageBg data={data} imageUrl={imageUrl} className="w-full h-full rounded-[1.5rem]" />
      </SmartField>

      {/* Bouncy Badge / Tag */}
      {cta && (
        <SmartField field="badge_text" {...sp} className="absolute top-12 right-6 animate-bounce-subtle z-20">
          <div 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
            className="text-slate-900 px-4 py-2 font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl border-2 border-slate-900 flex items-center justify-center transform rotate-12 outline-none"
            style={{ backgroundColor: accentColor }}
          >
            {cta}
          </div>
        </SmartField>
      )}

      {/* Base Curve & CTA Section */}
      <div 
        className="absolute inset-x-0 bottom-0 h-[110px] flex flex-col items-center justify-center text-center rounded-t-[2.5rem] shadow-[0_-15px_30px_rgba(0,0,0,0.3)] z-10 px-8"
        style={{ 
          backgroundColor: footerColor, 
          borderTop: `4px solid ${accentColor}`
        }}
      >
        <SmartField field="titulo" {...sp}>
          <h2 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-pacifico leading-tight outline-none"
            style={{ color: textColor, fontSize: `${24 * sTitle}px` }}
          >
            {title1}
          </h2>
        </SmartField>
        <SmartField field="texto_apoio" {...sp} className="mt-0.5">
          <p 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-bold tracking-widest uppercase lbl-description outline-none"
            style={{ color: backgroundColorLight, fontSize: `${10 * sText}px` }}
          >
            {description}
          </p>
        </SmartField>
      </div>

      {/* SlideHeader do Carrossel Studio */}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor="#ffffff" counterColor="#ffffff" counterBg="rgba(0,0,0,0.2)" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 221 — Feedback (Prova Social)
// ═══════════════════════════════════════════════════════════
export function SplitVariant221(props) {
  const { 
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo 
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const brand = data.tag || brandHandle || "ANA ROSA";
  const brandSub = data.badge_text || "CONFEITARIA";
  const titleBg = data.favTitle1 || "FEEDBACK";
  const titleFg = data.titulo || "de clientes";
  const text = data.texto_apoio || "BOA TARDE, ANA! TUDO BEM?!\nQUERIA TE AGRADECER PELO BOLO... ALÉM DE LINDO, SUPER SABOROSO! QUATRO LEITES COM MORANGO É MINHA PAIXÃO, MAS ESSE MARTA ROCHA ESTÁ ROUBANDO MEU CORAÇÃO!!\nRECOMENDO SEMPRE!! PARABÉNS PELO SEU TRABALHO! E OBRIGADA!!";
  const name = data.favName || "Rithiely Knoth";
  
  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1080&auto=format&fit=crop";
  const backgroundColor = brandColor || data.backgroundColor || "#e61159";
  const boxColor = data.boxColor || "#ff85b3";

  // Conversão rápida de hex para rgb para opacidade
  const hexToRgb = (hex) => {
    if (!hex) return "255, 133, 179";
    const cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
      const r = parseInt(cleanHex[0] + cleanHex[0], 16);
      const g = parseInt(cleanHex[1] + cleanHex[1], 16);
      const b = parseInt(cleanHex[2] + cleanHex[2], 16);
      return `${r}, ${g}, ${b}`;
    }
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return `${r}, ${g}, ${b}`;
  };

  const rgbBoxColor = hexToRgb(boxColor);

  return (
    <div 
      id="tpl_feedback" 
      className="w-full h-full relative overflow-hidden flex select-none transition-all duration-300"
      style={{ backgroundColor }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Great+Vibes&family=Montserrat:wght@400;700&family=Inter:wght@400;700&display=swap');
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-script { font-family: 'Great Vibes', cursive; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-display { font-family: 'Montserrat', sans-serif; }
      `}} />

      {/* Lado Esquerdo: Imagem com Borda Arredondada Estilizada */}
      <SmartField field="imagem" {...sp} className="w-[58%] h-full relative p-8 shrink-0">
        <div className="w-full h-full relative overflow-hidden bg-white rounded-tl-[1rem] rounded-tr-[5rem] rounded-bl-[5rem] rounded-br-[1rem] shadow-[10px_0_30px_rgba(0,0,0,0.2)] border-[8px] border-white z-10">
          <ImageBg data={data} imageUrl={imageUrl} className="w-full h-full" />
        </div>
      </SmartField>

      {/* Lado Direito: Conteúdo e Texto */}
      <div className="w-[48%] h-full absolute right-0 top-0 flex flex-col pt-16 pr-12 pb-16 pl-4 z-20">
        
        {/* Header / Logo Area */}
        <div className="flex flex-col items-center justify-center w-full mb-12 relative z-20">
          <svg className="w-12 h-12 mb-2 text-white/80" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-5.5V9.5C10 8.67 10.67 8 11.5 8h1c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5h-1c-.83 0-1.5-.67-1.5-1.5zm2-6.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"/>
          </svg>
          <SmartField field="tag" {...sp}>
            <h3 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="text-white text-2xl font-cinzel tracking-[0.15em] leading-none mb-1 outline-none block text-center"
            >
              {brand}
            </h3>
          </SmartField>
          <div className="flex items-center gap-2 text-white/80">
            <div className="w-4 h-[1px] bg-white/50"></div>
            <SmartField field="badge_text" {...sp}>
              <span 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
                className="text-xs font-sans tracking-[0.2em] font-light uppercase outline-none block"
              >
                {brandSub}
              </span>
            </SmartField>
            <div className="w-4 h-[1px] bg-white/50"></div>
          </div>
        </div>

        {/* Título "Feedback de clientes" Sobreposto */}
        <div className="relative flex items-center justify-center mb-10 ml-[-4rem] z-20">
          <SmartField field="favTitle1" {...sp} className="absolute -top-4 w-[120%] text-center left-[-10%] select-none">
            <h2 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'favTitle1', e.currentTarget.innerText)}
              className="font-cinzel font-black tracking-widest uppercase outline-none"
              style={{ color: `rgba(${rgbBoxColor}, 0.3)`, fontSize: `${70 * sTitle}px` }}
            >
              {titleBg}
            </h2>
          </SmartField>
          <h2 
            className="font-cinzel font-black tracking-widest uppercase absolute -top-4 w-[120%] text-center left-[-10%] select-none pointer-events-none" 
            style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.7)', fontSize: `${70 * sTitle}px` }}
          >
            {titleBg}
          </h2>
          
          <SmartField field="titulo" {...sp} className="z-10 pb-4 mt-6 transform -rotate-2">
            <h1 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-script text-white drop-shadow-md outline-none block leading-none text-center"
              style={{ fontSize: `${80 * sTitle}px` }}
            >
              {titleFg}
            </h1>
          </SmartField>
        </div>

        {/* Balão de Depoimento */}
        <div 
          id="tpl_feedback_box" 
          className="w-[115%] ml-[-15%] flex-1 rounded-[3rem] shadow-xl p-8 relative flex flex-col justify-center border-[3px] border-white/20 z-20"
          style={{ backgroundColor: boxColor }}
        >
          <SmartField field="texto_apoio" {...sp} className="w-full">
            <p 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="text-white font-sans font-bold text-center uppercase tracking-wide outline-none whitespace-pre-line leading-relaxed"
              style={{ fontSize: `${16 * sText}px` }}
            >
              {text}
            </p>
          </SmartField>

          {/* Assinatura do Nome */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-full flex justify-center items-end h-20">
            <SmartField field="favName" {...sp} className="z-30 mr-4 shrink-0">
              <div 
                className="text-white px-8 py-3 rounded-full shadow-lg border-[4px] border-white"
                style={{ backgroundColor }}
              >
                <span 
                  contentEditable suppressContentEditableWarning
                  onBlur={(e) => onTextChange(index, 'favName', e.currentTarget.innerText)}
                  className="font-display font-bold tracking-tight outline-none block"
                  style={{ fontSize: `${20 * sTitle}px` }}
                >
                  {name}
                </span>
              </div>
            </SmartField>
            
            <svg className="w-16 h-16 text-white drop-shadow-md z-10 shrink-0" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
          </div>
        </div>
        
      </div>

      {/* SlideHeader do Carrossel Studio */}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        handleColor="#ffffff" counterColor="#ffffff" counterBg="rgba(0,0,0,0.2)" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 222 — Festa Junina / Card Base
// ═══════════════════════════════════════════════════════════
export function SplitVariant222(props) {
  const { 
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo 
  } = props;

  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const desc = data.texto_apoio || "Durante essa época, a demanda por doces de festa junina, shots de licor artesanal e bolos no pote dispara, e o desafio para quem produz é embalar um alto volume de unidades por dia, <span class='font-bold text-[#c92a2a]'>mantendo o padrão, a qualidade e a segurança do produto.</span>";
  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1000&auto=format&fit=crop";
  const colorAccent = brandColor || data.accentColor || "#c92a2a";
  const colorBg = data.backgroundColor || "#ffffff";

  // Substitui a cor de destaque original no texto formatado com HTML pela cor dinâmica configurada
  const processedDesc = desc.replace(/#c92a2a/g, colorAccent);

  // Converte a cor de fundo hexadecimal para RGBA com 90% de opacidade para simular o white/90 com blur
  const hexToRgba = (hex, alpha) => {
    if (!hex) return `rgba(255, 255, 255, ${alpha})`;
    const cleanHex = hex.replace('#', '');
    let r, g, b;
    if (cleanHex.length === 3) {
      r = parseInt(cleanHex[0] + cleanHex[0], 16);
      g = parseInt(cleanHex[1] + cleanHex[1], 16);
      b = parseInt(cleanHex[2] + cleanHex[2], 16);
    } else {
      r = parseInt(cleanHex.substring(0, 2), 16);
      g = parseInt(cleanHex.substring(2, 4), 16);
      b = parseInt(cleanHex.substring(4, 6), 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div 
      id="template_09" 
      className="w-full h-full relative overflow-hidden flex select-none font-sans transition-all duration-300"
      style={{ backgroundColor: colorBg }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Pacifico&family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />

      {/* Imagem de Fundo (Preenchendo tudo) */}
      <SmartField field="imagem" {...sp} className="absolute inset-0 w-full h-full">
        <ImageBg data={data} imageUrl={imageUrl} className="absolute inset-0 w-full h-full" />
      </SmartField>

      {/* Elementos Decorativos (Círculos no Fundo com mix-blend-multiply e blur) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 overflow-hidden mix-blend-multiply">
        <div 
          id="t9-circle1" 
          className="absolute rounded-full bg-slate-400/50 blur-sm"
          style={{ width: '350px', height: '350px', top: '-100px', left: '100px' }}
        ></div>
        <div 
          id="t9-circle2" 
          className="absolute rounded-full bg-slate-400/40 blur-sm"
          style={{ width: '250px', height: '250px', top: '100px', left: '350px' }}
        ></div>
        <div 
          id="t9-circle3" 
          className="absolute rounded-full bg-rose-400/40 blur-sm"
          style={{ width: '450px', height: '450px', top: '350px', left: '-100px' }}
        ></div>
      </div>

      {/* Card Flutuante Inferior */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-[42%] backdrop-blur-md z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex items-center justify-center p-8 px-12"
        style={{ 
          backgroundColor: hexToRgba(colorBg, 0.9),
          borderRadius: '3rem 3rem 0 0'
        }}
      >
        <SmartField field="texto_apoio" {...sp} className="w-full">
          <p 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
            className="font-sans text-[#4a4a4a] text-center font-light leading-relaxed outline-none"
            style={{ fontSize: `${18 * sText}px` }}
            dangerouslySetInnerHTML={{ __html: processedDesc }}
          />
        </SmartField>
      </div>

      {/* SlideHeader do Carrossel Studio */}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor="#ffffff" counterColor="#ffffff" counterBg="rgba(0,0,0,0.2)" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 223 — Empreendedor
// ═══════════════════════════════════════════════════════════
export function SplitVariant223(props) {
  const { 
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo 
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const title2 = data.titulo || "Mesmo aos pequenos empreendedores,\né possível profissionalizar a produção\npara obter um resultando consistente\ne trazer credibilidade à marca.";
  const desc = data.texto_apoio || "Com uma seladora manual e selos\nde proteção (plástico ou alumínio), as\nembalagens ficam seguras, padronizadas\ne com uma boa apresentação.";
  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1589363460779-cbdf170e1239?q=80&w=1000";
  
  const colorBg = data.backgroundColor || "#eceae6";
  const colorAccent = brandColor || data.accentColor || "#3d3d3d";

  // Converte a cor de fundo hexadecimal para RGBA com 95% de opacidade para simular a translucidez com blur
  const hexToRgba = (hex, alpha) => {
    if (!hex) return `rgba(236, 234, 230, ${alpha})`;
    const cleanHex = hex.replace('#', '');
    let r, g, b;
    if (cleanHex.length === 3) {
      r = parseInt(cleanHex[0] + cleanHex[0], 16);
      g = parseInt(cleanHex[1] + cleanHex[1], 16);
      b = parseInt(cleanHex[2] + cleanHex[2], 16);
    } else {
      r = parseInt(cleanHex.substring(0, 2), 16);
      g = parseInt(cleanHex.substring(2, 4), 16);
      b = parseInt(cleanHex.substring(4, 6), 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div 
      id="template_10" 
      className="w-full h-full relative overflow-hidden flex select-none bg-white font-sans transition-all duration-300"
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />

      {/* Imagem de Fundo */}
      <SmartField field="imagem" {...sp} className="absolute inset-0 w-full h-full">
        <ImageBg data={data} imageUrl={imageUrl} className="absolute inset-0 w-full h-full" />
      </SmartField>

      {/* Elementos Decorativos (Círculos no Fundo com mix-blend-multiply e blur) */}
      <div className="absolute bottom-0 right-0 w-full h-full pointer-events-none z-10 overflow-hidden mix-blend-multiply">
        <div 
          id="t10-circle1" 
          className="absolute rounded-full bg-stone-400/40 blur-md"
          style={{ width: '450px', height: '450px', bottom: '-100px', right: '50px' }}
        ></div>
        <div 
          id="t10-circle2" 
          className="absolute rounded-full bg-rose-900/20 blur-md"
          style={{ width: '550px', height: '550px', bottom: '150px', right: '-150px' }}
        ></div>
      </div>

      {/* Card Flutuante Superior */}
      <div 
        id="t10-card" 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[92%] backdrop-blur-md z-20 shadow-[0_10px_30px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center p-8 pb-10"
        style={{ 
          backgroundColor: hexToRgba(colorBg, 0.95),
          borderRadius: '0 0 3rem 3rem'
        }}
      >
        <SmartField field="titulo" {...sp} className="mb-4">
          <p 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-sans text-center outline-none whitespace-pre-line"
            style={{ color: colorAccent, fontSize: `${18 * sTitle}px`, lineHeight: '1.4' }}
          >
            {title2}
          </p>
        </SmartField>
        <SmartField field="texto_apoio" {...sp}>
          <p 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-sans font-bold text-center outline-none whitespace-pre-line"
            style={{ color: colorAccent, fontSize: `${20 * sText}px`, lineHeight: '1.4' }}
          >
            {desc}
          </p>
        </SmartField>
      </div>

      {/* SlideHeader do Carrossel Studio */}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor="#ffffff" counterColor="#ffffff" counterBg="rgba(0,0,0,0.2)" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 224 — Sundae (Red Box)
// ═══════════════════════════════════════════════════════════
export function SplitVariant224(props) {
  const { 
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo 
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const title1 = data.titulo || "MIX DE\nACOMPANHAMENTOS";
  const desc = data.texto_apoio || "Muitas vezes, sorvetes e açaí vêm\ncom um mix de acompanhamentos\n(pedaços de frutas, granolas ou\ngranulados), que <b>não podem ser\ntriturados pelo sistema de dosagem.</b>\nPor isso, exigem dosadores específicos.";
  const imageUrl = data.imageUrl || "https://png.pngtree.com/png-vector/20231020/ourmid/pngtree-sundae-ice-cream-with-chocolate-syrup-png-image_10237731.png";
  
  const colorAccent = brandColor || data.accentColor || "#d6102c";
  const colorBg = data.backgroundColor || "#ffffff";

  return (
    <div 
      id="template_11" 
      className="w-full h-full relative overflow-hidden flex select-none font-sans transition-all duration-300"
      style={{ backgroundColor: colorBg }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />

      {/* Caixa de Destaque Superior (Red Box) */}
      <div 
        id="t11-red-box" 
        className="absolute top-0 left-0 w-full h-[70%] flex flex-col items-center justify-start z-10 shadow-lg px-8 pt-16"
        style={{ 
          backgroundColor: colorAccent,
          borderRadius: '0 0 4rem 4rem'
        }}
      >
        <SmartField field="titulo" {...sp} className="mb-4">
          <h1 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-sans font-black text-white text-center uppercase outline-none whitespace-pre-line"
            style={{ fontSize: `${32 * sTitle}px`, lineHeight: '1.2' }}
          >
            {title1}
          </h1>
        </SmartField>

        <SmartField field="texto_apoio" {...sp}>
          <p 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
            className="font-sans font-light text-white text-center outline-none whitespace-pre-line"
            style={{ fontSize: `${16 * sText}px`, lineHeight: '1.4' }}
            dangerouslySetInnerHTML={{ __html: desc }}
          />
        </SmartField>
      </div>

      {/* Container da Imagem Central/Produto */}
      <SmartField field="imagem" {...sp} className="absolute left-1/2 -translate-x-1/2 z-20 flex justify-center w-[300px] bottom-[30px]">
        {imageUrl ? (
          <img 
            src={getCorsSafeUrl(imageUrl)} 
            crossOrigin="anonymous" 
            className="w-full object-contain drop-shadow-2xl max-h-[300px]" 
            alt="Sundae" 
          />
        ) : (
          <div className="w-40 h-40 bg-zinc-900/10 flex items-center justify-center rounded-full">
            <ImageIcon className="w-8 h-8 text-zinc-400" />
          </div>
        )}
      </SmartField>

      {/* SlideHeader do Carrossel Studio */}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor="#ffffff" counterColor="#ffffff" counterBg="rgba(0,0,0,0.2)" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 225 — Açaí Textura
// ═══════════════════════════════════════════════════════════
export function SplitVariant225(props) {
  const { 
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo 
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const title1 = data.titulo || "TEXTURA";
  const desc = data.texto_apoio || "A alta viscosidade do açaí e\ndo sorvete demanda <b>dosadores\npotentes e precisos para garantir\num peso final exato</b>, sem variações\nque causem prejuízo ao produtor\nou ao consumidor.";
  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1590165482129-1b8b27698780?q=80&w=1000&auto=format&fit=crop";
  const colorBg = data.backgroundColor || "#ffffff";
  const colorAccent = brandColor || data.accentColor || "#d6102c";
  const borderColor = data.borderColor || "#fde047";

  return (
    <div 
      id="template_12" 
      className="w-full h-full relative overflow-hidden flex flex-col items-center justify-center p-4 select-none font-sans transition-all duration-300"
      style={{ backgroundColor: colorBg }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />

      {/* Caixa de Destaque Central */}
      <div 
        id="t12-red-box" 
        className="relative w-[90%] shadow-xl flex flex-col items-center mt-20"
        style={{ 
          backgroundColor: colorAccent,
          borderRadius: '24px',
          paddingTop: '96px',
          paddingBottom: '40px',
          paddingLeft: '32px',
          paddingRight: '32px'
        }}
      >
        {/* Container da Imagem do Produto (Círculo sobreposto) */}
        <SmartField field="imagem" {...sp} className="absolute left-1/2 -translate-x-1/2 aspect-square flex justify-center drop-shadow-xl z-20"
          style={{ 
            width: '180px',
            height: '180px',
            top: '-80px'
          }}
        >
          {imageUrl ? (
            <img 
              id="t12-img" 
              src={getCorsSafeUrl(imageUrl)} 
              crossOrigin="anonymous"
              className="w-full h-full object-cover rounded-full border-solid" 
              style={{
                borderColor: borderColor,
                borderWidth: '6px'
              }}
              alt="Açaí"
            />
          ) : (
            <div className="w-full h-full bg-zinc-900/10 flex items-center justify-center rounded-full">
              <ImageIcon className="w-8 h-8 text-zinc-400" />
            </div>
          )}
        </SmartField>

        {/* Título Principal */}
        <SmartField field="titulo" {...sp} className="w-full mb-6">
          <h1 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerHTML)}
            className="font-sans font-black text-white text-center uppercase tracking-wide outline-none whitespace-pre-line"
            style={{ fontSize: `${32 * sTitle}px` }}
            dangerouslySetInnerHTML={{ __html: title1.replace(/\n/g, '<br />') }}
          />
        </SmartField>

        {/* Descrição / Texto */}
        <SmartField field="texto_apoio" {...sp} className="w-full">
          <p 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
            className="font-sans font-light text-white text-center outline-none whitespace-pre-line"
            style={{ fontSize: `${17.6 * sText}px`, lineHeight: '1.4' }}
            dangerouslySetInnerHTML={{ __html: desc.replace(/\n/g, '<br />') }}
          />
        </SmartField>
      </div>

      {/* SlideHeader do Carrossel Studio */}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor="#ffffff" counterColor="#ffffff" counterBg="rgba(0,0,0,0.2)" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 226 — Benefícios (Curva)
// ═══════════════════════════════════════════════════════════
export function SplitVariant226(props) {
  const { 
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo 
  } = props;

  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const desc = data.texto_apoio || "Consumido diariamente,\no suco de laranja auxilia as defesas\ndo corpo e <b>ajuda a proteger</b> contra\n<b>gripes e resfriados.</b>";
  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=1000&auto=format&fit=crop";
  const colorBg = data.backgroundColor || "#ff7500";
  const colorAccent = brandColor || data.accentColor || "#ffffff";

  return (
    <div 
      id="template_13" 
      className="w-full h-full relative overflow-hidden flex select-none font-sans transition-all duration-300"
      style={{ backgroundColor: colorBg }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />

      {/* Imagem Superior com Curva */}
      <SmartField field="imagem" {...sp} className="absolute top-0 left-0 w-full h-[65%] overflow-hidden z-10 bg-white"
        style={{ 
          borderBottomLeftRadius: '50% 20%', 
          borderBottomRightRadius: '50% 20%' 
        }}
      >
        <ImageBg data={data} imageUrl={imageUrl} className="w-full h-full" />
      </SmartField>

      {/* Área Inferior */}
      <div 
        id="t13-bottom" 
        className="absolute bottom-0 left-0 w-full h-[35%] flex items-center justify-center z-20 p-8"
      >
        {/* Box com contorno */}
        <div 
          id="t13-outline-box" 
          className="w-[95%] text-center flex flex-col justify-center border"
          style={{ 
            borderColor: colorAccent,
            borderRadius: '40px',
            padding: '32px 16px',
            borderWidth: '2px',
            borderStyle: 'solid'
          }}
        >
          {/* Descrição / Benefícios */}
          <SmartField field="texto_apoio" {...sp} className="w-full">
            <p 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
              className="font-sans font-light tracking-wide text-center outline-none whitespace-pre-line"
              style={{ 
                color: colorAccent,
                fontSize: `${19.2 * sText}px`,
                lineHeight: '1.4'
              }}
              dangerouslySetInnerHTML={{ __html: desc.replace(/\n/g, '<br />') }}
            />
          </SmartField>
        </div>
      </div>

      {/* SlideHeader do Carrossel Studio */}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor="#ffffff" counterColor="#ffffff" counterBg="rgba(0,0,0,0.2)" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 227 — Tropisuco
// ═══════════════════════════════════════════════════════════
export function SplitVariant227(props) {
  const { 
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo 
  } = props;

  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const title1 = data.titulo || "O irmão ciumento que\nnão divide o irmão,\n<b>e nem o Tropisuco</b>";
  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=1000&auto=format&fit=crop";
  const colorBg = data.backgroundColor || "#f47920";
  const colorAccent = brandColor || data.accentColor || "#ffffff";

  return (
    <div 
      id="template_15" 
      className="w-full h-full relative overflow-hidden flex flex-col select-none font-sans transition-all duration-300"
      style={{ 
        backgroundColor: colorBg,
        padding: '20px 24px 32px 24px'
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />

      {/* Container da Imagem Central */}
      <SmartField field="imagem" {...sp} className="w-full flex-1 overflow-hidden shadow-sm relative z-10"
        style={{ 
          borderRadius: '40px'
        }}
      >
        <ImageBg data={data} imageUrl={imageUrl} className="w-full h-full" />
      </SmartField>
      
      {/* Área de Rodapé */}
      <div 
        className="w-full shrink-0 flex items-end justify-between z-10"
        style={{ 
          paddingTop: '24px', 
          paddingLeft: '4px', 
          paddingRight: '4px' 
        }}
      >
        {/* Título Principal */}
        <SmartField field="titulo" {...sp} className="w-[80%]">
          <h1 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerHTML)}
            className="font-sans font-light outline-none"
            style={{ 
              color: colorAccent,
              fontSize: `${25.6 * sTitle}px`,
              lineHeight: '1.05',
              letterSpacing: '-0.8px'
            }}
            dangerouslySetInnerHTML={{ __html: title1.replace(/\n/g, '<br />') }}
          />
        </SmartField>

        {/* Logo Laranja / Suco */}
        <div className="w-[20%] flex justify-end pb-1">
          <svg 
            id="t15-logo" 
            viewBox="0 0 100 100" 
            className="drop-shadow-sm"
            style={{ 
              width: '56px', 
              height: '56px',
              fill: colorAccent 
            }}
          >
            <circle cx="50" cy="70" r="26" />
            <path d="M47,43 Q20,35 30,15 Q48,25 47,43 Z" />
            <path d="M53,43 Q80,25 70,5 Q52,15 53,43 Z" />
          </svg>
        </div>
      </div>

      {/* SlideHeader do Carrossel Studio */}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor="#ffffff" counterColor="#ffffff" counterBg="rgba(0,0,0,0.2)" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 228 — Ice Cream Info
// ═══════════════════════════════════════════════════════════
export function SplitVariant228(props) {
  const { 
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo 
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const title1 = data.titulo || "BAIXA\nTEMPERATURA";
  const title2 = data.subtitulo || "O QUE EXIGE UM FLUXO CONTÍNUO\n E RÁPIDO DE DOSAGEM.";
  const extra1 = data.texto_apoio || "O produto precisa ser envasado\n em baixas temperaturas <strong class='font-bold text-black'>para\n manter sua consistência ideal</strong> e\n evitar o descongelamento parcial";
  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1556910103-1c02745a872e?auto=format&fit=crop&w=1000";
  const colorBg = data.backgroundColor || "#ffffff";
  const colorAccent = brandColor || data.accentColor || "#d61a3c";

  return (
    <div 
      id="template_19" 
      className="w-full h-full relative overflow-hidden flex flex-col justify-center px-10 gap-6 select-none font-sans transition-all duration-300"
      style={{ backgroundColor: colorBg }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />

      {/* Título Principal */}
      <SmartField field="titulo" {...sp} className="w-full">
        <h1 
          contentEditable suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerHTML)}
          className="font-sans font-black uppercase leading-tight tracking-tight outline-none whitespace-pre-line"
          style={{ color: colorAccent, fontSize: `${36 * sTitle}px` }}
          dangerouslySetInnerHTML={{ __html: title1.replace(/\n/g, '<br />') }}
        />
      </SmartField>
      
      {/* Container da Imagem Central */}
      <SmartField field="imagem" {...sp} className="w-full h-[192px] rounded-2xl border-[2.5px] overflow-hidden shrink-0 shadow-sm"
        style={{ borderColor: colorAccent }}
      >
        <ImageBg data={data} imageUrl={imageUrl} className="w-full h-full" />
      </SmartField>
      
      {/* Bloco de Textos Descritivos */}
      <div id="t19-text-block" className="flex flex-col gap-4">
        {/* Descrição Longa */}
        <SmartField field="texto_apoio" {...sp} className="w-full">
          <p 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
            className="font-sans text-neutral-800 leading-[1.4] font-light outline-none whitespace-pre-line"
            style={{ fontSize: `${19.2 * sText}px` }}
            dangerouslySetInnerHTML={{ __html: extra1.replace(/\n/g, '<br />') }}
          />
        </SmartField>
        {/* Destaque Final */}
        <SmartField field="subtitulo" {...sp} className="w-full">
          <p 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'subtitulo', e.currentTarget.innerHTML)}
            className="font-sans font-bold uppercase tracking-wide outline-none whitespace-pre-line"
            style={{ color: colorAccent, fontSize: `${16.8 * sText}px` }}
            dangerouslySetInnerHTML={{ __html: title2.replace(/\n/g, '<br />') }}
          />
        </SmartField>
      </div>

      {/* SlideHeader do Carrossel Studio */}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor="#ffffff" counterColor="#ffffff" counterBg="rgba(0,0,0,0.2)" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 229 — Conteúdo
// ═══════════════════════════════════════════════════════════
export function SplitVariant229(props) {
  const { 
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo 
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const title1 = data.titulo || "CONTEÚDO PROGRAMÁTICO";
  const title2 = data.subtitulo || "Cocada de Verão";
  const extra1 = data.subtitulo2 || data.extra1 || "Poderia Ser Um Bolo de Rolo";
  const desc = data.texto_apoio || "• Crocante de limão\n• Biscuit de coco torrado\n• Geleia de abacaxi e Caramelo de coco\n• Mousse de coco com limão\n• Glaçagem branca e gourmet\n• Decoração de chocolate";
  const extra2 = data.extra2 || "• Crocante de amêndoas\n• Biscuit genoise\n• Geleia de goiaba\n• Mousse de goiaba\n• Glaçagem rosa\n• Decoração de chocolate";
  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=600";
  const imageUrl2 = data.imageUrl2 || "https://images.unsplash.com/photo-1514845585565-df0abf4d048d?auto=format&fit=crop&w=600";
  const colorBg = data.backgroundColor || "#fdbf0f";
  const colorAccent = brandColor || data.accentColor || "#ffffff";

  return (
    <div 
      id="template_20" 
      className="w-full h-full relative overflow-hidden flex flex-col px-8 py-10 gap-6 select-none font-sans transition-all duration-300"
      style={{ backgroundColor: colorBg }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />

      {/* Ícone de Culinária Superior */}
      <div 
        id="t20-icon" 
        className="w-8 h-8 border flex items-center justify-center shrink-0"
        style={{ borderColor: colorAccent }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          style={{ color: colorAccent }}
        >
          <path d="M2 12h20"/>
          <path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/>
          <path d="M4 8h16"/>
          <path d="M12 2v2"/>
          <path d="m9 2 .5 2"/>
          <path d="m15 2-.5 2"/>
        </svg>
      </div>

      {/* Seção do Título Principal */}
      <div className="mb-2">
        <SmartField field="titulo" {...sp} className="w-full">
          <h1 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-sans font-medium tracking-wide uppercase outline-none"
            style={{ color: colorAccent, fontSize: `${26 * sTitle}px` }}
          >
            {title1}
          </h1>
        </SmartField>
        <div 
          id="t20-line" 
          className="h-[1.5px] w-[80%] mt-2 opacity-60"
          style={{ backgroundColor: colorAccent }}
        ></div>
      </div>

      {/* Bloco de Conteúdo 1 */}
      <div className="flex flex-col gap-2.5">
        <SmartField field="subtitulo" {...sp} className="w-full">
          <h2 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'subtitulo', e.currentTarget.innerText)}
            className="font-sans font-medium outline-none"
            style={{ color: colorAccent, fontSize: `${20 * sText}px` }}
          >
            {title2}
          </h2>
        </SmartField>
        <div className="flex gap-4 items-center">
          <SmartField field="imagem" {...sp} className="w-[45%] aspect-square shrink-0 shadow-md">
            <ImageBg data={data} imageUrl={imageUrl} className="w-full h-full" />
          </SmartField>
          <SmartField field="texto_apoio" {...sp} className="flex-1">
            <div 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
              className="font-sans leading-[1.7] font-light outline-none whitespace-pre-line"
              style={{ color: colorAccent, fontSize: `${12.8 * sText}px` }}
              dangerouslySetInnerHTML={{ __html: desc.replace(/\n/g, '<br />') }}
            ></div>
          </SmartField>
        </div>
      </div>

      {/* Bloco de Conteúdo 2 */}
      <div className="flex flex-col gap-2.5">
        <SmartField field="subtitulo2" {...sp} className="w-full">
          <h2 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'subtitulo2', e.currentTarget.innerText)}
            className="font-sans font-medium outline-none"
            style={{ color: colorAccent, fontSize: `${20 * sText}px` }}
          >
            {extra1}
          </h2>
        </SmartField>
        <div className="flex gap-4 items-center">
          <SmartField field="imageUrl2" {...sp} className="w-[45%] aspect-square shrink-0 shadow-md">
            {imageUrl2 ? (
              <img 
                src={getCorsSafeUrl(imageUrl2)} 
                crossOrigin="anonymous" 
                className="w-full h-full object-cover" 
                alt="Conteúdo 2" 
              />
            ) : (
              <div className="w-full h-full bg-zinc-900/10 flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-zinc-400" />
              </div>
            )}
          </SmartField>
          <SmartField field="extra2" {...sp} className="flex-1">
            <div 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'extra2', e.currentTarget.innerHTML)}
              className="font-sans leading-[1.7] font-light outline-none whitespace-pre-line"
              style={{ color: colorAccent, fontSize: `${12.8 * sText}px` }}
              dangerouslySetInnerHTML={{ __html: extra2.replace(/\n/g, '<br />') }}
            ></div>
          </SmartField>
        </div>
      </div>

      {/* SlideHeader do Carrossel Studio */}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor="#ffffff" counterColor="#ffffff" counterBg="rgba(0,0,0,0.2)" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 230 — Corporate
// ═══════════════════════════════════════════════════════════
export function SplitVariant230(props) {
  const { 
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo 
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const title1 = data.titulo || "Agentes de IA\nem milissegundos.\nMas quem fecha\no contrato?";
  const title2 = data.subtitulo || "82%";
  const extra1 = data.extra1 || "BNI";
  const desc = data.texto_apoio || "A Apple acaba de lançar <strong class='font-bold'>agentes de IA ultra-rápidos</strong>. Processam dados em milissegundos. Automatizam tarefas complexas. <strong class='font-bold'>Mas o mercado de alto ticket continua exigindo algo que nenhum chip produz: confiança humana.</strong>";
  const extra2 = data.extra2 || "dos contratos B2B de alto ticket são\nfechados por indicação pessoal";
  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000";
  const colorBg = data.backgroundColor || "#f4f4f6";
  const colorAccent = brandColor || data.accentColor || "#e11b22";

  return (
    <div 
      id="template_21" 
      className="w-full h-full relative overflow-hidden flex select-none bg-white font-sans transition-all duration-300"
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@300;400;500;600;700;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-display { font-family: 'Archivo Black', sans-serif; }
      `}} />

      {/* Imagem de Fundo Lateral (Direita) */}
      <SmartField field="imagem" {...sp} className="absolute top-0 right-0 w-[42%] h-full z-0">
        <ImageBg data={data} imageUrl={imageUrl} className="w-full h-full" />
      </SmartField>

      {/* Painel de Fundo da Esquerda */}
      <div 
        id="t21-bg" 
        className="absolute top-0 left-0 w-[65%] h-full z-10" 
        style={{ backgroundColor: colorBg }}
      ></div>
      
      {/* Container de Conteúdo Esquerdo */}
      <div className="relative z-10 w-[65%] h-full flex flex-col justify-center px-8">
        {/* Logo / Badge */}
        <SmartField field="extra1" {...sp} className="absolute top-8 left-8">
          <div 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'extra1', e.currentTarget.innerText)}
            className="font-display font-black text-[28px] tracking-tighter outline-none"
            style={{ color: colorAccent }}
          >
            {extra1}
          </div>
        </SmartField>

        {/* Título Principal */}
        <SmartField field="titulo" {...sp} className="w-full mb-4">
          <h1 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerHTML)}
            className="font-sans font-bold leading-[1.1] text-black tracking-tight outline-none whitespace-pre-line"
            style={{ fontSize: `${30 * sTitle}px` }}
            dangerouslySetInnerHTML={{ __html: title1.replace(/\n/g, '<br />') }}
          />
        </SmartField>

        {/* Descrição Longa */}
        <SmartField field="texto_apoio" {...sp} className="w-full pr-4">
          <p 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
            className="font-sans leading-relaxed text-black font-medium outline-none whitespace-pre-line"
            style={{ fontSize: `${12.8 * sText}px` }}
            dangerouslySetInnerHTML={{ __html: desc.replace(/\n/g, '<br />') }}
          />
        </SmartField>
      </div>

      {/* Card de Estatística Inferior */}
      <div 
        id="t21-stat-card" 
        className="absolute bottom-10 left-8 w-[82%] bg-white rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.15)] flex items-center p-4 gap-4 z-20 border border-neutral-100"
      >
        {/* Número de Destaque */}
        <SmartField field="subtitulo" {...sp} className="shrink-0">
          <span 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'subtitulo', e.currentTarget.innerText)}
            className="font-display font-black text-[56px] text-black leading-none tracking-tighter outline-none"
          >
            {title2}
          </span>
        </SmartField>
        {/* Texto descritivo da estatística */}
        <SmartField field="extra2" {...sp} className="flex-1">
          <span 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'extra2', e.currentTarget.innerHTML)}
            className="font-sans text-[12px] leading-[1.3] text-black font-medium outline-none whitespace-pre-line block"
            dangerouslySetInnerHTML={{ __html: extra2.replace(/\n/g, '<br />') }}
          />
        </SmartField>
      </div>

      {/* SlideHeader do Carrossel Studio */}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor="#ffffff" counterColor="#ffffff" counterBg="rgba(0,0,0,0.2)" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 231 — Açaí Textura Premium
// ═══════════════════════════════════════════════════════════
export function SplitVariant231(props) {
  const { 
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo 
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const title1 = data.titulo || "TEXTURA";
  const desc = data.texto_apoio || "A alta viscosidade do açaí e\ndo sorvete demanda <b>dosadores\npotentes e precisos para garantir\num peso final exato</b>, sem variações\nque causem prejuízo ao produtor\nou ao consumidor.";
  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1590165482129-1b8b27698780?q=80&w=1000&auto=format&fit=crop";
  const colorBg = data.backgroundColor || "#ffffff";
  const colorAccent = brandColor || data.accentColor || "#d6102c";
  const borderColor = data.borderColor || "#fde047";

  return (
    <div 
      id="template_12" 
      className="w-full h-full relative overflow-hidden flex flex-col items-center justify-center p-4 select-none font-sans transition-all duration-300"
      style={{ backgroundColor: colorBg }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />

      {/* Caixa de Destaque Central */}
      <div 
        id="t12-red-box" 
        className="relative w-[90%] shadow-xl flex flex-col items-center mt-20"
        style={{ 
          backgroundColor: colorAccent,
          borderRadius: '24px',
          paddingTop: '96px',
          paddingBottom: '40px',
          paddingLeft: '32px',
          paddingRight: '32px'
        }}
      >
        {/* Container da Imagem do Produto (Círculo sobreposto) */}
        <SmartField field="imagem" {...sp} className="absolute left-1/2 -translate-x-1/2 aspect-square flex justify-center drop-shadow-xl z-20"
          style={{ 
            width: '180px',
            height: '180px',
            top: '-80px'
          }}
        >
          {imageUrl ? (
            <img 
              id="t12-img" 
              src={getCorsSafeUrl(imageUrl)} 
              crossOrigin="anonymous"
              className="w-full h-full object-cover rounded-full border-solid" 
              style={{
                borderColor: borderColor,
                borderWidth: '6px'
              }}
              alt="Açaí"
            />
          ) : (
            <div className="w-full h-full bg-zinc-900/10 flex items-center justify-center rounded-full">
              <ImageIcon className="w-8 h-8 text-zinc-400" />
            </div>
          )}
        </SmartField>

        {/* Título Principal */}
        <SmartField field="titulo" {...sp} className="w-full mb-6">
          <h1 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerHTML)}
            className="font-sans font-black text-white text-center uppercase tracking-wide outline-none whitespace-pre-line"
            style={{ fontSize: `${32 * sTitle}px` }}
            dangerouslySetInnerHTML={{ __html: title1.replace(/\n/g, '<br />') }}
          />
        </SmartField>

        {/* Descrição / Texto */}
        <SmartField field="texto_apoio" {...sp} className="w-full">
          <p 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
            className="font-sans font-light text-white text-center outline-none whitespace-pre-line"
            style={{ fontSize: `${17.6 * sText}px`, lineHeight: '1.4' }}
            dangerouslySetInnerHTML={{ __html: desc.replace(/\n/g, '<br />') }}
          />
        </SmartField>
      </div>

      {/* SlideHeader do Carrossel Studio */}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor="#ffffff" counterColor="#ffffff" counterBg="rgba(0,0,0,0.2)" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 232 — Template Promo Páscoa
// ═══════════════════════════════════════════════════════════
export function SplitVariant232(props) {
  const { 
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo 
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1541744573515-478c90ff39ef?q=80&w=1080&auto=format&fit=crop";
  const title = data.titulo || "O Ranking de\nPáscoa já começou!";
  const subtitle = data.texto_apoio || "Garanta o seu lugar entre\nos 2.000 premiados.";
  const colorBg = data.backgroundColor || "#f8eee1";
  const colorText = data.textColor || "#311b11";

  return (
    <div 
      id="tpl_promo_pascoa" 
      className="w-full h-full relative overflow-hidden flex flex-col select-none font-sans transition-all duration-300"
      style={{ backgroundColor: colorBg }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />

      {/* Área da imagem superior */}
      <SmartField field="imagem" {...sp} className="w-full h-[62%] relative z-10 rounded-b-[32px] overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
        <ImageBg data={data} imageUrl={imageUrl} className="w-full h-full" />
      </SmartField>

      {/* Conteúdo inferior de texto e elementos de design */}
      <div className="w-full h-[38%] flex flex-col items-center justify-center text-center px-8 relative z-0">
        {/* Estrela SVG Decorativa */}
        <div className="absolute left-[8%] top-[20%] pointer-events-none opacity-80">
          <svg width="24" height="24" viewBox="0 0 24 24" fill={colorText} xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/>
          </svg>
        </div>

        {/* Título Principal */}
        <SmartField field="titulo" {...sp} className="w-full mb-2">
          <h1 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerHTML)}
            className="font-serif font-black leading-[1.1] tracking-tight outline-none whitespace-pre-line"
            style={{ fontSize: `${34 * sTitle}px`, color: colorText }}
            dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, '<br />') }}
          />
        </SmartField>

        {/* Subtítulo */}
        <SmartField field="texto_apoio" {...sp} className="w-full">
          <h2 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
            className="font-sans font-light leading-[1.2] tracking-tight outline-none whitespace-pre-line"
            style={{ fontSize: `${22 * sText}px`, color: colorText }}
            dangerouslySetInnerHTML={{ __html: subtitle.replace(/\n/g, '<br />') }}
          />
        </SmartField>
      </div>

      {/* SlideHeader do Carrossel Studio */}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor={colorText} counterColor={colorText} counterBg="rgba(0,0,0,0.05)" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 233 — Restaurante Trio
// ═══════════════════════════════════════════════════════════
export function SplitVariant233(props) {
  const { 
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo 
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const title = data.titulo || 'KOTORI';
  const handle = data.extra1 || brandHandle || '@KOTORI.SP';
  const address = data.extra2 || 'R. Cônego Eugênio Leite, 639 - Pinheiros';
  const hours = data.texto_apoio || 'Ter. a sex.: 19h-23h / Sáb.: 12h-16h e 19h-23h';
  
  const imageUrl1 = data.imageUrl || 'https://images.unsplash.com/photo-1615361200141-f45040f367be?q=80&w=1080&auto=format&fit=crop';
  const imageUrl2 = data.imageUrl2 || 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1080&auto=format&fit=crop';
  const imageUrl3 = data.imageUrl3 || 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1080&auto=format&fit=crop';
  
  const colorBg = data.backgroundColor || '#9e4b32';
  const colorText = data.textColor || '#f4ebd9';
  const colorCircle1 = data.extraColor || '#c07452';
  const colorCircle2 = data.extraColor2 || '#8a3e26';

  return (
    <div 
      id="tpl_restaurant_trio" 
      className="w-full h-full relative overflow-hidden flex flex-col select-none font-sans transition-all duration-300"
      style={{ backgroundColor: colorBg }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-display { font-family: 'Montserrat', sans-serif; }
      `}} />

      {/* Círculos Decorativos de Fundo */}
      <div 
        className="absolute -bottom-16 -right-16 w-[350px] h-[350px] rounded-full border-[40px] opacity-80 pointer-events-none z-0" 
        style={{ borderColor: colorCircle1 }}
      ></div>
      <div 
        className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full border-[60px] opacity-80 pointer-events-none z-0" 
        style={{ borderColor: colorCircle2 }}
      ></div>

      {/* Conteúdo de Texto Superior */}
      <div className="w-full pt-12 px-8 pb-4 z-10 flex flex-col">
        <div className="flex items-baseline gap-3 mb-2 flex-wrap">
          <SmartField field="titulo" {...sp} className="shrink-0">
            <h1 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-display font-black leading-none tracking-tighter uppercase outline-none" 
              style={{ fontSize: `${48 * sTitle}px`, color: colorText }}
            >
              {title}
            </h1>
          </SmartField>
          
          <SmartField field="extra1" {...sp} className="shrink-0">
            <span 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'extra1', e.currentTarget.innerText)}
              className="font-sans font-bold text-[16px] tracking-wide outline-none" 
              style={{ color: colorText }}
            >
              {handle}
            </span>
          </SmartField>
        </div>

        <SmartField field="extra2" {...sp} className="w-full mb-1">
          <p 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'extra2', e.currentTarget.innerText)}
            className="font-sans font-light text-[16px] tracking-wide outline-none whitespace-pre-line" 
            style={{ color: colorText }}
          >
            {address}
          </p>
        </SmartField>

        <SmartField field="texto_apoio" {...sp} className="w-full">
          <p 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-serif italic font-light text-[14px] tracking-wide outline-none whitespace-pre-line" 
            style={{ color: colorText }}
          >
            {hours}
          </p>
        </SmartField>
      </div>

      {/* Imagens (Trio Vertical) */}
      <div className="flex-1 w-full px-8 pb-8 flex flex-col gap-3 z-10 min-h-0">
        <SmartField field="imagem" {...sp} className="w-full h-[28%] overflow-hidden bg-black/10 rounded-sm shadow-md">
          <ImageBg data={data} imageUrl={imageUrl1} className="w-full h-full" />
        </SmartField>
        <SmartField field="imagem2" {...sp} className="w-full h-[32%] overflow-hidden bg-black/10 rounded-sm shadow-md">
          <ImageBg data={data} imageUrl={imageUrl2} className="w-full h-full" />
        </SmartField>
        <SmartField field="imagem3" {...sp} className="w-full flex-1 overflow-hidden bg-black/10 rounded-sm shadow-md">
          <ImageBg data={data} imageUrl={imageUrl3} className="w-full h-full" />
        </SmartField>
      </div>

      {/* SlideHeader do Carrossel Studio */}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor={colorText} counterColor={colorText} counterBg="rgba(0,0,0,0.1)" />
    </div>
  );
}


// ═══════════════════════════════════════════════════════════
// VARIANTE 234 — Mosaico 3x3
// ═══════════════════════════════════════════════════════════
export function SplitVariant234(props) {
  const { 
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo 
  } = props;

  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const text = data.titulo || "12 itens\nprodução\n<span class=\"font-bold\">artesanal</span>\npadaria\n<span class=\"font-bold\">Nauta</span>";
  const colorBg = data.backgroundColor || "#e86b24";
  const colorText = data.textColor || "#ffffff";

  const img1 = data.imageUrl || "https://images.unsplash.com/photo-1509365465994-3e8412e84d4b?q=80&w=400&auto=format&fit=crop";
  const img2 = data.imageUrl2 || "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=400&auto=format&fit=crop";
  const img3 = data.imageUrl3 || "https://images.unsplash.com/photo-1626844131082-256783844137?q=80&w=400&auto=format&fit=crop";
  const img4 = data.imageUrl4 || "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=400&auto=format&fit=crop";
  const img5 = data.imageUrl5 || "https://images.unsplash.com/photo-1612203985729-70726954388c?q=80&w=400&auto=format&fit=crop";
  const img6 = data.imageUrl6 || "https://images.unsplash.com/photo-1551106652-a5bcf4b29ce6?q=80&w=400&auto=format&fit=crop";
  const img7 = data.imageUrl7 || "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=400&auto=format&fit=crop";
  const img8 = data.imageUrl8 || "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400&auto=format&fit=crop";

  return (
    <div 
      id="tpl_grid_center_text" 
      className="w-full h-full relative overflow-hidden flex flex-col select-none font-sans transition-all duration-300"
      style={{ backgroundColor: colorBg }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />

      <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-0" style={{ backgroundColor: colorBg }}>
        {/* Linha 1 */}
        <SmartField field="imagem" {...sp} className="w-full h-full overflow-hidden bg-white">
          <ImageBg data={data} imageUrl={img1} className="w-full h-full mix-blend-multiply opacity-95" />
        </SmartField>
        <SmartField field="imagem2" {...sp} className="w-full h-full overflow-hidden bg-white">
          <ImageBg data={data} imageUrl={img2} className="w-full h-full mix-blend-multiply opacity-95" />
        </SmartField>
        <SmartField field="imagem3" {...sp} className="w-full h-full overflow-hidden bg-white">
          <ImageBg data={data} imageUrl={img3} className="w-full h-full mix-blend-multiply opacity-95" />
        </SmartField>

        {/* Linha 2 */}
        <SmartField field="imagem4" {...sp} className="w-full h-full overflow-hidden bg-white">
          <ImageBg data={data} imageUrl={img4} className="w-full h-full mix-blend-multiply opacity-95" />
        </SmartField>
        
        <div className="w-full h-full flex items-center justify-center p-3 text-center bg-transparent z-10">
          <SmartField field="titulo" {...sp} className="w-full">
            <p 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerHTML)}
              className="font-sans leading-[1] tracking-tighter outline-none whitespace-pre-line block" 
              style={{ fontSize: `${20 * sTitle}px`, color: colorText }}
              dangerouslySetInnerHTML={{ __html: text.replace(/\\n/g, '<br />').replace(/\n/g, '<br />') }}
            />
          </SmartField>
        </div>
        
        <SmartField field="imagem5" {...sp} className="w-full h-full overflow-hidden bg-white">
          <ImageBg data={data} imageUrl={img5} className="w-full h-full mix-blend-multiply opacity-95" />
        </SmartField>

        {/* Linha 3 */}
        <SmartField field="imagem6" {...sp} className="w-full h-full overflow-hidden bg-white">
          <ImageBg data={data} imageUrl={img6} className="w-full h-full mix-blend-multiply opacity-95" />
        </SmartField>
        <SmartField field="imagem7" {...sp} className="w-full h-full overflow-hidden bg-white">
          <ImageBg data={data} imageUrl={img7} className="w-full h-full mix-blend-multiply opacity-95" />
        </SmartField>
        <SmartField field="imagem8" {...sp} className="w-full h-full overflow-hidden bg-white">
          <ImageBg data={data} imageUrl={img8} className="w-full h-full mix-blend-multiply opacity-95" />
        </SmartField>
      </div>

      {/* SlideHeader do Carrossel Studio */}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor={colorText} counterColor={colorText} counterBg="rgba(0,0,0,0.1)" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 235 — Promo Plataforma
// ═══════════════════════════════════════════════════════════
export function SplitVariant235(props) {
  const { 
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo 
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const bgImg = data.imageUrl || "https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?q=80&w=1080&auto=format&fit=crop";
  const product = data.imageUrl2 || "https://images.unsplash.com/photo-1600189020473-b2585f6e85d9?q=80&w=800&auto=format&fit=crop";
  const logo = data.imageUrl3 || brandLogo || "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/256px-React-icon.svg.png";
  
  const title1 = data.titulo || "Pão de queijo";
  const title2 = data.subtitulo || "Solves everything.";
  const tag1 = data.extra1 || "FAST";
  const tag2 = data.extra2 || "HOT";
  const tag3 = data.extra3 || "FRESH.";
  const cta = data.extra4 || "Order now.";
  const price = data.extra5 || "2,95";
  const currency = data.extra6 || "€";
  const colorBottom = brandColor || data.backgroundColor2 || "#6104e8";

  return (
    <div 
      id="tpl_promo_plataforma" 
      className="w-full h-full relative overflow-hidden flex flex-col select-none font-sans transition-all duration-300"
      style={{ backgroundColor: '#ffffff' }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@700;800;900&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-display { font-family: 'Montserrat', sans-serif; }
      `}} />

      {/* Top Image Area */}
      <SmartField field="imagem" {...sp} className="w-full h-[65%] relative z-0">
        <ImageBg data={data} imageUrl={bgImg} className="w-full h-full" />
      </SmartField>

      {/* Bottom Solid Color Area */}
      <div 
        className="w-full h-[35%] relative z-10 flex px-8 items-center justify-end" 
        style={{ backgroundColor: colorBottom }}
      >
        {/* Floating Platform (Left) */}
        <div className="absolute left-6 bottom-[15%] w-[45%] h-auto z-20">
          <div className="relative w-full pb-[15%]">
            <div className="absolute bottom-0 w-full h-[16px] rounded-full bg-black/20 blur-md"></div>
            <div className="absolute bottom-[4px] w-full h-full bg-gradient-to-t from-white/10 to-transparent rounded-t-[24px] opacity-50"></div>
            
            {/* Product PNG */}
            <SmartField field="imagem2" {...sp} className="w-[90%] mx-auto relative z-20">
              <img 
                id="tpl_plat_product" 
                src={getCorsSafeUrl(product)} 
                className="w-full object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.4)] transform -translate-y-[10%]" 
                crossOrigin="anonymous"
                alt="Produto"
              />
            </SmartField>
            
            {/* Price Pill */}
            <div 
              className="absolute bottom-0 -right-4 rounded-full px-3 py-1 flex items-baseline gap-0.5 shadow-lg border border-white/10 z-30"
              style={{ backgroundColor: brandColor || '#a35dd7' }}
            >
              <SmartField field="extra6" {...sp} className="shrink-0">
                <span 
                  contentEditable suppressContentEditableWarning
                  onBlur={(e) => onTextChange(index, 'extra6', e.currentTarget.innerText)}
                  className="font-sans font-bold text-white text-[10px] outline-none"
                >
                  {currency}
                </span>
              </SmartField>
              <SmartField field="extra5" {...sp} className="shrink-0">
                <span 
                  contentEditable suppressContentEditableWarning
                  onBlur={(e) => onTextChange(index, 'extra5', e.currentTarget.innerText)}
                  className="font-display font-black text-white text-[20px] leading-none tracking-tighter outline-none"
                >
                  {price}
                </span>
              </SmartField>
            </div>
          </div>
        </div>

        {/* Right Text Content */}
        <div className="w-[48%] flex flex-col pt-4">
          <SmartField field="titulo" {...sp} className="w-full mb-1">
            <h2 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerHTML)}
              className="font-sans font-bold text-white leading-[1.1] tracking-tight outline-none whitespace-pre-line"
              style={{ fontSize: `${22 * sTitle}px` }}
              dangerouslySetInnerHTML={{ __html: title1.replace(/\\n/g, '<br />').replace(/\n/g, '<br />') }}
            />
          </SmartField>
          
          <SmartField field="subtitulo" {...sp} className="w-full mb-2">
            <h1 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'subtitulo', e.currentTarget.innerHTML)}
              className="font-serif italic font-medium text-[#e0e565] leading-[1.0] tracking-tighter drop-shadow-sm outline-none whitespace-pre-line"
              style={{ fontSize: `${30 * sTitle}px` }}
              dangerouslySetInnerHTML={{ __html: title2.replace(/\\n/g, '<br />').replace(/\n/g, '<br />') }}
            />
          </SmartField>
          
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <SmartField field="extra1" {...sp}>
              <span 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'extra1', e.currentTarget.innerText)}
                className="font-sans font-bold text-[10px] text-white tracking-wider uppercase outline-none"
              >
                {tag1}
              </span>
            </SmartField>
            <span className="w-[1px] h-3 bg-white/30"></span>
            <SmartField field="extra2" {...sp}>
              <span 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'extra2', e.currentTarget.innerText)}
                className="font-sans font-bold text-[10px] text-white tracking-wider uppercase outline-none"
              >
                {tag2}
              </span>
            </SmartField>
            <span className="w-[1px] h-3 bg-white/30"></span>
            <SmartField field="extra3" {...sp}>
              <span 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'extra3', e.currentTarget.innerText)}
                className="font-sans font-bold text-[10px] text-white tracking-wider uppercase outline-none"
              >
                {tag3}
              </span>
            </SmartField>
          </div>
          
          <SmartField field="extra4" {...sp} className="w-full">
            <p 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'extra4', e.currentTarget.innerHTML)}
              className="font-sans font-bold text-white tracking-tight outline-none whitespace-pre-line"
              style={{ fontSize: `${16 * sText}px` }}
              dangerouslySetInnerHTML={{ __html: cta.replace(/\\n/g, '<br />').replace(/\n/g, '<br />') }}
            />
          </SmartField>
        </div>
      </div>

      {/* Logo (Top Right) */}
      <SmartField field="imagem3" {...sp} className="absolute top-10 right-10 h-8 z-30">
        {logo ? (
          <img 
            id="tpl_plat_logo" 
            src={getCorsSafeUrl(logo)} 
            className="h-full object-contain filter brightness-0 invert drop-shadow-md" 
            crossOrigin="anonymous"
            alt="Logo"
          />
        ) : (
          <div className="h-full w-8 bg-white/10 rounded" />
        )}
      </SmartField>

      {/* SlideHeader do Carrossel Studio */}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor="#ffffff" counterColor="#ffffff" counterBg="rgba(255,255,255,0.1)" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 236 — Rotina Suco
// ═══════════════════════════════════════════════════════════
export function SplitVariant236(props) {
  const { 
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo 
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const topText = data.titulo || "Pronto para beber, fácil de encontrar\ne simples de incluir na rotina:";
  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1527661591450-b4dca88926d1?q=80&w=1080&auto=format&fit=crop";
  const bottomText = data.texto_apoio || "seja no <span class=\"font-bold\" style=\"color: var(--text-bottom-bold);\">café da manhã</span>, na saída\ncom os <span class=\"font-bold\" style=\"color: var(--text-bottom-bold);\">amigos</span> ou nos\nencontros de <span class=\"font-bold\" style=\"color: var(--text-bottom-bold);\">família</span>.";
  
  const colorBg = data.backgroundColor || "#0a4b2c";
  const colorTopText = data.textColor || "#ffffff";
  const colorBottomLight = data.extraColor || "#fad570";
  const colorBottomBold = brandColor || data.accentColor || "#e88912";

  return (
    <div 
      id="tpl_juice_routine" 
      className="w-full h-full relative overflow-hidden flex flex-col items-center justify-between py-12 px-8 select-none font-sans transition-all duration-300"
      style={{ backgroundColor: colorBg }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />

      {/* Texto Superior */}
      <div className="w-full text-center z-10 pt-4">
        <SmartField field="titulo" {...sp} className="w-full">
          <p 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerHTML)}
            className="font-sans font-light leading-[1.15] tracking-tight outline-none whitespace-pre-line block" 
            style={{ fontSize: `${20 * sTitle}px`, color: colorTopText }}
            dangerouslySetInnerHTML={{ __html: topText.replace(/\\n/g, '<br />').replace(/\n/g, '<br />') }}
          />
        </SmartField>
      </div>

      {/* Imagem Central e Vetor de Fruta */}
      <div className="relative w-full h-[52%] flex items-center justify-center z-10 my-2">
        {/* Folha/Vetor Decorativo no topo do container */}
        <div className="absolute -top-[20px] left-1/2 transform -translate-x-1/2 z-20 drop-shadow-md pointer-events-none">
          <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 35 C 20 35, 10 60, 10 80 C 10 100, 30 115, 50 115 C 70 115, 90 100, 90 80 C 90 60, 80 35, 50 35 Z" fill={colorBottomLight}/>
            <path d="M55 30 C 55 10, 75 5, 85 5 C 85 25, 65 30, 55 30 Z" fill="#ffffff"/>
            <path d="M45 32 C 30 28, 15 15, 20 5 C 40 10, 50 22, 45 32 Z" fill="#996238"/>
          </svg>
        </div>
        
        {/* Container da Imagem */}
        <SmartField field="imagem" {...sp} className="w-full h-full rounded-[24px] overflow-hidden shadow-2xl relative border border-black/10">
          <ImageBg data={data} imageUrl={imageUrl} className="w-full h-full" />
        </SmartField>
      </div>

      {/* Texto Inferior */}
      <div className="w-full text-center z-10 pb-4">
        <SmartField field="texto_apoio" {...sp} className="w-full">
          <p 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
            className="font-sans leading-[1.15] tracking-tight outline-none whitespace-pre-line block" 
            style={{ '--text-bottom-bold': colorBottomBold, color: colorBottomLight, fontSize: `${19 * sText}px` }}
            dangerouslySetInnerHTML={{ __html: bottomText.replace(/\\n/g, '<br />').replace(/\n/g, '<br />') }}
          />
        </SmartField>
      </div>

      {/* SlideHeader do Carrossel Studio */}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor={colorTopText} counterColor={colorTopText} counterBg="rgba(0,0,0,0.1)" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 237 — Promo Páscoa (ID 237)
// ═══════════════════════════════════════════════════════════
export function SplitVariant237(props) {
  const { 
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo 
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1541744573515-478c90ff39ef?q=80&w=1080&auto=format&fit=crop";
  const title = data.titulo || "O Ranking de\nPáscoa já começou!";
  const subtitle = data.texto_apoio || "Garanta o seu lugar entre\nos 2.000 premiados.";
  const colorBg = data.backgroundColor || "#f8eee1";
  const colorText = data.textColor || "#311b11";

  return (
    <div 
      id="tpl_promo_pascoa" 
      className="w-full h-full relative overflow-hidden flex flex-col select-none font-sans transition-all duration-300"
      style={{ backgroundColor: colorBg }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />

      {/* Área da imagem superior */}
      <SmartField field="imagem" {...sp} className="w-full h-[62%] relative z-10 rounded-b-[32px] overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
        <ImageBg data={data} imageUrl={imageUrl} className="w-full h-full" />
      </SmartField>

      {/* Conteúdo inferior de texto e elementos de design */}
      <div className="w-full h-[38%] flex flex-col items-center justify-center text-center px-8 relative z-0">
        {/* Estrela SVG Decorativa */}
        <div className="absolute left-[8%] top-[20%] pointer-events-none opacity-80">
          <svg width="24" height="24" viewBox="0 0 24 24" fill={colorText} xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/>
          </svg>
        </div>

        {/* Título Principal */}
        <SmartField field="titulo" {...sp} className="w-full mb-2">
          <h1 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerHTML)}
            className="font-serif font-black leading-[1.1] tracking-tight outline-none whitespace-pre-line"
            style={{ fontSize: `${34 * sTitle}px`, color: colorText }}
            dangerouslySetInnerHTML={{ __html: title.replace(/\\n/g, '<br />').replace(/\n/g, '<br />') }}
          />
        </SmartField>

        {/* Subtítulo */}
        <SmartField field="texto_apoio" {...sp} className="w-full">
          <h2 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
            className="font-sans font-light leading-[1.2] tracking-tight outline-none whitespace-pre-line"
            style={{ fontSize: `${22 * sText}px`, color: colorText }}
            dangerouslySetInnerHTML={{ __html: subtitle.replace(/\\n/g, '<br />').replace(/\n/g, '<br />') }}
          />
        </SmartField>
      </div>

      {/* SlideHeader do Carrossel Studio */}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor={colorText} counterColor={colorText} counterBg="rgba(0,0,0,0.05)" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 238 — Promo Benefícios
// ═══════════════════════════════════════════════════════════
export function SplitVariant238(props) {
  const { 
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo 
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1080&auto=format&fit=crop";
  const badgeUrl = data.imageUrl2 || brandLogo || "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/256px-React-icon.svg.png";
  const title = data.titulo || "Por que\napostar\n<span style=\"box-shadow: inset 0 -22px 0 var(--accent);\">no NY Roll?</span>";
  
  const t1 = data.extra1 || "Segurança";
  const d1 = data.extra2 || "Resultados padronizados e alta qualidade.";
  const t2 = data.extra3 || "Agilidade";
  const d2 = data.extra4 || "Performance para as horas de maior demanda.";
  const t3 = data.extra5 || "Lucratividade";
  const d3 = data.extra6 || "Item visualmente incrível e com alto valor agregado.";
  
  const colorBg = data.backgroundColor || "#11065e";
  const colorAccent = brandColor || data.accentColor || "#ff5400";

  return (
    <div 
      id="tpl_promo_benefits" 
      className="w-full h-full relative overflow-hidden flex flex-col select-none font-sans transition-all duration-300"
      style={{ 
        '--bg-main': colorBg, 
        '--accent': colorAccent,
        backgroundColor: 'var(--bg-main)'
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />

      {/* Image Area */}
      <SmartField field="imagem" {...sp} className="absolute top-0 left-0 w-[84%] h-[64%] bg-white">
        <ImageBg data={data} imageUrl={imageUrl} className="w-full h-full shadow-[0_10px_30px_rgba(0,0,0,0.4)]" />
      </SmartField>

      {/* Left Title Area */}
      <div className="absolute bottom-[12%] left-[8%] w-[42%] z-10">
        <SmartField field="titulo" {...sp} className="w-full">
          <h1 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerHTML)}
            className="font-sans font-bold leading-[1.25] text-white tracking-tight outline-none whitespace-pre-line"
            style={{ fontSize: `${26 * sTitle}px` }}
            dangerouslySetInnerHTML={{ __html: title.replace(/\\n/g, '<br />').replace(/\n/g, '<br />') }}
          />
        </SmartField>
      </div>

      {/* Right Orange Box */}
      <div 
        className="absolute bottom-0 right-4 w-[46%] h-[58%] z-20 px-6 py-6 flex flex-col justify-center gap-4 shadow-[-15px_15px_30px_rgba(0,0,0,0.25)]" 
        style={{ backgroundColor: 'var(--accent)' }}
      >
        {/* Badge */}
        <SmartField field="imagem2" {...sp} className="absolute -top-[15%] right-[8%] w-16 h-16 z-30">
          {badgeUrl ? (
            <img 
              id="tpl_promo_badge" 
              src={getCorsSafeUrl(badgeUrl)} 
              className="w-full h-full object-contain drop-shadow-xl" 
              style={{ filter: 'brightness(0) invert(1)' }} 
              crossOrigin="anonymous"
              alt="Selo"
            />
          ) : (
            <div className="w-full h-full bg-white/10 rounded-full" />
          )}
        </SmartField>

        {/* Item 1 */}
        <div className="flex flex-col gap-0.5">
          <SmartField field="extra1" {...sp} className="w-full">
            <h3 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'extra1', e.currentTarget.innerText)}
              className="font-sans font-bold text-white leading-none outline-none"
              style={{ fontSize: `${16 * sText}px` }}
            >
              {t1}
            </h3>
          </SmartField>
          <SmartField field="extra2" {...sp} className="w-full">
            <p 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'extra2', e.currentTarget.innerText)}
              className="font-sans text-white/95 leading-tight font-light outline-none"
              style={{ fontSize: `${12 * sText}px` }}
            >
              {d1}
            </p>
          </SmartField>
        </div>

        {/* Item 2 */}
        <div className="flex flex-col gap-0.5">
          <SmartField field="extra3" {...sp} className="w-full">
            <h3 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'extra3', e.currentTarget.innerText)}
              className="font-sans font-bold text-white leading-none outline-none"
              style={{ fontSize: `${16 * sText}px` }}
            >
              {t2}
            </h3>
          </SmartField>
          <SmartField field="extra4" {...sp} className="w-full">
            <p 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'extra4', e.currentTarget.innerText)}
              className="font-sans text-white/95 leading-tight font-light outline-none"
              style={{ fontSize: `${12 * sText}px` }}
            >
              {d2}
            </p>
          </SmartField>
        </div>

        {/* Item 3 */}
        <div className="flex flex-col gap-0.5">
          <SmartField field="extra5" {...sp} className="w-full">
            <h3 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'extra5', e.currentTarget.innerText)}
              className="font-sans font-bold text-white leading-none outline-none"
              style={{ fontSize: `${16 * sText}px` }}
            >
              {t3}
            </h3>
          </SmartField>
          <SmartField field="extra6" {...sp} className="w-full">
            <p 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'extra6', e.currentTarget.innerText)}
              className="font-sans text-white/95 leading-tight font-light outline-none"
              style={{ fontSize: `${12 * sText}px` }}
            >
              {d3}
            </p>
          </SmartField>
        </div>
      </div>

      {/* SlideHeader do Carrossel Studio */}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor="#ffffff" counterColor="#ffffff" counterBg="rgba(0,0,0,0.2)" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 239 — Promo Panettone
// ═══════════════════════════════════════════════════════════
export function SplitVariant239(props) {
  const { 
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo 
  } = props;

  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1543362906-acfc16c67564?q=80&w=1080&auto=format&fit=crop";
  const text = data.titulo || "Serão <span class=\"font-bold\">1.000</span> premiados nesta edição, mil histórias de conquista.<br><span class=\"font-bold text-[52px] tracking-tighter\">Mil revendedores realizando desejos!</span>";
  const colorBg = data.backgroundColor || "#f9ede2";
  const colorText = data.textColor || "#2b1810";

  return (
    <div 
      id="tpl_promo_panettone" 
      className="w-full h-full relative overflow-hidden flex flex-col items-center px-8 pt-12 select-none font-sans transition-all duration-300"
      style={{ 
        '--bg-main': colorBg, 
        '--text-main': colorText,
        backgroundColor: 'var(--bg-main)'
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />

      {/* Top Text Box */}
      <div 
        className="w-full border-2 rounded-[24px] px-8 py-6 flex flex-col justify-center text-center z-10 relative bg-transparent" 
        style={{ borderColor: 'var(--text-main)' }}
      >
        <SmartField field="titulo" {...sp} className="w-full">
          <p 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerHTML)}
            className="font-serif leading-[1.2] tracking-tight outline-none whitespace-pre-line" 
            style={{ fontSize: `${18 * sTitle}px`, color: 'var(--text-main)' }}
            dangerouslySetInnerHTML={{ __html: text.replace(/\\n/g, '<br />').replace(/\n/g, '<br />') }}
          />
        </SmartField>
      </div>

      {/* Spacer */}
      <div className="h-6 w-full shrink-0"></div>

      {/* Bottom Image */}
      <div className="w-full flex-1 relative overflow-hidden rounded-t-[24px] z-10 shadow-[0_-5px_20px_rgba(0,0,0,0.08)]">
        <SmartField field="imagem" {...sp} className="w-full h-full">
          <ImageBg data={data} imageUrl={imageUrl} className="w-full h-full" />
        </SmartField>
      </div>

      {/* SlideHeader do Carrossel Studio */}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor={colorText} counterColor={colorText} counterBg="rgba(0,0,0,0.05)" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 240 — Vitrine Produto
// ═══════════════════════════════════════════════════════════
export function SplitVariant240(props) {
  const { 
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo 
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1620189507195-68309c04c4d0?q=80&w=1080&auto=format&fit=crop";
  const t1 = data.extra1 || "CAIXA";
  const th = data.extra2 || "CORAÇÃO";
  const t2 = data.extra3 || "DIAMOND";
  const body = data.texto_apoio || "A caixa mede 14,3 x 3,5 cm (LxA) e possui capacidade para 200g. Acompanha forma plástica modelo coração lapidado.";
  const swipe = data.extra4 || "arrasta pro lado";
  
  const colorBg = data.backgroundColor || "#e8a274";
  const colorText = data.textColor || "#3a1e0b";
  const colorHigh = brandColor || data.accentColor || "#f5e4c3";

  return (
    <div 
      id="tpl_product_box" 
      className="w-full h-full relative overflow-hidden flex flex-col pt-12 px-8 pb-8 select-none font-sans transition-all duration-300"
      style={{ backgroundColor: colorBg }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;500;600;700&display=swap');
        .font-display { font-family: 'Anton', sans-serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />

      {/* Imagem do Produto (Centralizada com Sombra) */}
      <div className="w-full h-[58%] flex justify-center items-start z-10 relative">
        <SmartField field="imagem" {...sp} className="w-[90%] h-full relative">
          <ImageBg data={data} imageUrl={imageUrl} className="w-full h-full shadow-[0_10px_20px_rgba(0,0,0,0.15)]" />
        </SmartField>
      </div>

      {/* Área de Textos */}
      <div className="w-full mt-4 flex flex-col z-20">
        {/* Título Multi-Cor com Transformação Vertical */}
        <h1 
          className="font-display font-black uppercase leading-none tracking-tighter origin-left transform scale-y-125 mb-4 flex gap-2 flex-wrap"
          style={{ fontSize: `${28 * sTitle}px` }}
        >
          <SmartField field="extra1" {...sp} className="shrink-0">
            <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'extra1', e.currentTarget.innerText)} style={{ color: colorText }} className="outline-none">{t1}</span>
          </SmartField>
          <SmartField field="extra2" {...sp} className="shrink-0">
            <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'extra2', e.currentTarget.innerText)} style={{ color: colorHigh }} className="outline-none">{th}</span>
          </SmartField>
          <SmartField field="extra3" {...sp} className="shrink-0">
            <span contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange(index, 'extra3', e.currentTarget.innerText)} style={{ color: colorText }} className="outline-none">{t2}</span>
          </SmartField>
        </h1>
        
        {/* Descrição */}
        <SmartField field="texto_apoio" {...sp} className="w-full">
          <p 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
            className="font-sans font-medium leading-[1.3] outline-none whitespace-pre-line" 
            style={{ fontSize: `${14 * sText}px`, color: colorText }}
            dangerouslySetInnerHTML={{ __html: body.replace(/\\n/g, '<br />').replace(/\n/g, '<br />') }}
          />
        </SmartField>
      </div>

      {/* Indicador de Swipe (Arraste pro lado) */}
      <div 
        className="absolute bottom-6 right-8 flex items-center gap-1.5 z-30 opacity-90 pointer-events-none" 
        style={{ color: colorText }}
      >
        <svg className="w-4 h-4 transform -rotate-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-5-5m0 0l-5 5m5-5v12"></path>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 11V6a3 3 0 016 0v2"></path>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 11v6a5 5 0 01-10 0V8"></path>
        </svg>
        <SmartField field="extra4" {...sp} className="shrink-0 pointer-events-auto">
          <span 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'extra4', e.currentTarget.innerText)}
            className="font-sans font-medium tracking-wide outline-none text-[10px]"
          >
            {swipe}
          </span>
        </SmartField>
      </div>

      {/* SlideHeader do Carrossel Studio */}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor={colorText} counterColor={colorText} counterBg="rgba(0,0,0,0.05)" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 241 — Produto Split
// ═══════════════════════════════════════════════════════════
export function SplitVariant241(props) {
  const { 
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo 
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const imageUrl = data.imageUrl || "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Heart%20with%20ribbon/3D/heart_with_ribbon_3d.png";
  const title = data.titulo || "Lata de Coração\ncom bombons <span class=\"italic font-light\">100g</span>";
  const body = data.texto_apoio || "Lata em formato de coração\ncom 8 bombons nos sabores avelã e doce de leite.";
  
  const colorTop = data.backgroundColor2 || "#faeadb";
  const colorBottom = brandColor || data.backgroundColor || "#7a3623";
  const colorText = data.textColor || "#fdf3e7";

  return (
    <div 
      id="tpl_product_split" 
      className="w-full h-full relative overflow-hidden flex flex-col select-none font-sans transition-all duration-300"
      style={{ backgroundColor: colorBottom }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
      `}} />

      {/* Top Section (Fundo Claro com Borda Arredondada Inferior) */}
      <div 
        className="w-full h-[65%] relative z-10 flex items-center justify-center rounded-b-[32px] shadow-sm"
        style={{ backgroundColor: colorTop }}
      >
        {/* Imagem do Produto */}
        <SmartField field="imagem" {...sp} className="w-[85%] h-[85%] relative z-10 flex justify-center items-center">
          <img 
            id="tpl_product_split_img" 
            src={getCorsSafeUrl(imageUrl)} 
            className="w-full h-full object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.25)]" 
            crossOrigin="anonymous"
            alt="Produto"
          />
        </SmartField>
        
        {/* Estrela Quatro Pontas Centralizada */}
        <svg 
          className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-10 h-10 z-20 drop-shadow-md pointer-events-none" 
          style={{ color: colorBottom }}
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z"/>
        </svg>
      </div>
      
      {/* Bottom Section (Fundo Escuro) */}
      <div className="w-full h-[35%] relative z-0 flex flex-col items-center justify-center px-8 pt-6 pb-4 text-center">
        {/* Título Serifado */}
        <SmartField field="titulo" {...sp} className="w-full mb-2">
          <h1 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerHTML)}
            className="font-serif font-bold leading-[1.1] outline-none whitespace-pre-line" 
            style={{ fontSize: `${24 * sTitle}px`, color: colorText }}
            dangerouslySetInnerHTML={{ __html: title.replace(/\\n/g, '<br />').replace(/\n/g, '<br />') }}
          />
        </SmartField>
        
        {/* Descrição */}
        <SmartField field="texto_apoio" {...sp} className="w-full">
          <p 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
            className="font-sans text-[32px] font-normal leading-[1.4] w-[90%] outline-none whitespace-pre-line block animate-none" 
            style={{ fontSize: `${12.8 * sText}px`, color: colorText }}
            dangerouslySetInnerHTML={{ __html: body.replace(/\\n/g, '<br />').replace(/\n/g, '<br />') }}
          />
        </SmartField>
      </div>

      {/* SlideHeader do Carrossel Studio */}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor={colorText} counterColor={colorText} counterBg="rgba(255,255,255,0.05)" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 242 — Passo a Passo
// ═══════════════════════════════════════════════════════════
export function SplitVariant242(props) {
  const { 
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo 
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const imageUrl = data.imageUrl || "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Man%20cook/3D/man_cook_3d.png";
  const logoUrl = data.imageUrl2 || brandLogo || "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/256px-React-icon.svg.png";
  const watermark = data.extra1 || "Delatte";
  const number = data.extra2 || "1";
  const tag = data.extra3 || "1º Erro";
  const title = data.titulo || "Usar\nchocolate\nbaixa\nqualidade";
  
  const colorBg = data.backgroundColor || "#e8e6e1";
  const colorAccent = brandColor || data.accentColor || "#c21010";

  const watermarkHtml = `${watermark}<br />${watermark}<br />${watermark}`;

  return (
    <div 
      id="tpl_listicle_step" 
      className="w-full h-full relative overflow-hidden flex select-none font-sans transition-all duration-300"
      style={{ backgroundColor: colorBg }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />

      {/* Watermark Background */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-[0.03] z-0 transform -rotate-12 scale-125">
        <span 
          id="tpl_listicle_watermark" 
          className="font-sans font-black text-black tracking-tighter leading-none text-center select-none"
          style={{ fontSize: '90px' }}
          dangerouslySetInnerHTML={{ __html: watermarkHtml.replace(/\\n/g, '<br />').replace(/\n/g, '<br />') }}
        />
      </div>

      {/* Logo */}
      <SmartField field="imagem2" {...sp} className="absolute top-8 w-full flex justify-center z-20 h-10">
        {logoUrl ? (
          <img 
            id="tpl_listicle_logo" 
            src={getCorsSafeUrl(logoUrl)} 
            className="h-full object-contain drop-shadow-md" 
            crossOrigin="anonymous"
            alt="Logo"
          />
        ) : (
          <div className="h-full w-10 bg-white/10 rounded" />
        )}
      </SmartField>

      {/* Giant Number Background */}
      <div className="absolute top-[8%] left-4 z-10 w-[120px] flex justify-center">
        <SmartField field="extra2" {...sp} className="w-full text-center">
          <span 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'extra2', e.currentTarget.innerText)}
            className="font-sans font-black leading-none tracking-tighter outline-none block" 
            style={{ color: colorAccent, textShadow: '0 5px 15px rgba(0,0,0,0.08)', fontSize: `${240 * sTitle}px` }}
          >
            {number}
          </span>
        </SmartField>
      </div>

      {/* Floating Tag */}
      <div className="absolute top-[18%] left-12 bg-white px-3 py-1 shadow-md transform -rotate-2 z-40 border border-neutral-100">
        <SmartField field="extra3" {...sp} className="w-full">
          <span 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'extra3', e.currentTarget.innerText)}
            className="font-sans font-black tracking-tight outline-none block" 
            style={{ color: colorAccent, fontSize: `${16 * sText}px` }}
          >
            {tag}
          </span>
        </SmartField>
      </div>

      {/* 3D Character */}
      <SmartField field="imagem" {...sp} className="absolute bottom-[-2%] left-[-8%] w-[200px] h-[250px] z-30">
        <img 
          id="tpl_listicle_img" 
          src={getCorsSafeUrl(imageUrl)} 
          className="w-full h-full object-contain drop-shadow-[10px_10px_20px_rgba(0,0,0,0.25)]" 
          crossOrigin="anonymous"
          alt="Personagem"
        />
      </SmartField>

      {/* Title Content */}
      <div className="absolute top-[32%] left-[42%] z-20 w-[55%] pl-2">
        <SmartField field="titulo" {...sp} className="w-full">
          <h1 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerHTML)}
            className="font-sans font-black leading-[1.05] tracking-tight outline-none whitespace-pre-line" 
            style={{ fontSize: `${30 * sTitle}px`, color: colorAccent }}
            dangerouslySetInnerHTML={{ __html: title.replace(/\\n/g, '<br />').replace(/\n/g, '<br />') }}
          />
        </SmartField>
      </div>

      {/* Carousel Dots */}
      <div className="absolute bottom-8 right-8 flex gap-2 z-20">
        <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: colorAccent }}></div>
        <div className="w-3 h-3 rounded-full border-[1.5px] bg-transparent" style={{ borderColor: colorAccent }}></div>
        <div className="w-3 h-3 rounded-full border-[1.5px] bg-transparent" style={{ borderColor: colorAccent }}></div>
      </div>

      {/* SlideHeader do Carrossel Studio */}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor={colorAccent} counterColor={colorAccent} counterBg="rgba(0,0,0,0.05)" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 246 — Portfólio Agência iPhone
// ═══════════════════════════════════════════════════════════
export function SplitVariant246(props) {
  const { 
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo 
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1540324155974-7523202daa3f?q=80&w=1080&auto=format&fit=crop";
  const bg1Url = data.imageUrl2 || "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop";
  const bg2Url = data.imageUrl3 || "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=600&auto=format&fit=crop";
  const logoUrl = data.imageUrl4 || brandLogo || "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/256px-React-icon.svg.png";
  
  const title = data.titulo || "PRECISA DE POSTS CATIVANTES E ESTRATÉGIAS SOB MEDIDA?";
  const body = data.texto_apoio || "Vamos elevar sua presença online para o próximo nível. Não espere mais, dê o primeiro passo para o sucesso hoje mesmo!";
  const cta = data.extra1 || "VAMOS ABRIR ESSA PORTA JUNTOS!";
  const phone = data.extra2 || "62 98230-4734";
  
  const colorBg = brandColor || data.backgroundColor || "#e64f22";
  const colorText = data.textColor || "#ffffff";

  return (
    <div 
      id="tpl_agency_mockup_246" 
      className="w-full h-full relative overflow-hidden flex select-none font-sans transition-all duration-300"
      style={{ 
        '--bg-main': colorBg,
        backgroundColor: 'var(--bg-main)'
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Montserrat:wght@800;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-display { font-family: 'Montserrat', sans-serif; }
      `}} />

      {/* Lado Esquerdo: Mockups Flutuantes */}
      <div className="w-[52%] h-full relative z-20">
        
        {/* Post Fundo 1 (Canto Superior Esq) */}
        <SmartField field="imagem2" rotation={350} {...sp} className="absolute -top-[12%] left-[10%] w-[130px] rounded-[16px] bg-white shadow-lg transform rotate-[350deg] p-1 pb-4 z-0 opacity-90">
          <ImageBg data={data} imageUrl={bg1Url} className="w-full aspect-square rounded-[12px]" />
          <div className="absolute bottom-1.5 left-2.5 flex gap-1">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
          </div>
        </SmartField>

        {/* Post Fundo 2 (Canto Inferior Esq) */}
        <SmartField field="imagem3" rotation={350} {...sp} className="absolute -bottom-[55%] left-[45%] w-[120px] rounded-[16px] bg-white shadow-lg transform rotate-[350deg] p-1 pb-4 z-0 opacity-90">
          <ImageBg data={data} imageUrl={bg2Url} className="w-full aspect-square rounded-[12px]" />
          <div className="absolute bottom-1.5 left-2.5 flex gap-1">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
          </div>
        </SmartField>

        {/* iPhone Mockup Principal */}
        <div className="absolute top-1/2 left-[62%] transform -translate-x-1/2 -translate-y-1/2 w-[155px] h-[310px] bg-gray-900 rounded-[28px] shadow-2xl border-[2px] border-gray-300 z-50 flex flex-col items-center justify-center rotate-[-10deg]">
          {/* Tela do iPhone */}
          <div className="w-[94%] h-[97%] bg-white rounded-[24px] relative overflow-hidden flex flex-col">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[45px] h-[10px] bg-gray-900 rounded-b-lg z-30"></div>

            {/* Mini Instagram UI - Header */}
            <div className="pt-4 pb-1.5 px-2.5 flex items-center gap-1.5 border-b border-gray-100 bg-white z-20">
              <div className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="w-10 h-1 bg-gray-200 rounded mb-0.5"></div>
                <div className="w-6 h-0.5 bg-gray-100 rounded"></div>
              </div>
            </div>

            {/* Mini Instagram UI - Imagem Principal */}
            <SmartField field="imagem" {...sp} className="w-full flex-1 relative bg-gray-50">
              <ImageBg data={data} imageUrl={imageUrl} className="absolute inset-0 w-full h-full" />
            </SmartField>

            {/* Mini Instagram UI - Footer */}
            <div className="p-2.5 flex justify-between items-center bg-white z-20 border-t border-gray-100">
              <div className="flex gap-1.5">
                <svg className="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <svg className="w-3.5 h-3.5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
              </div>
              <svg className="w-3.5 h-3.5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Lado Direito: Textos e Call to Action */}
      <div className="w-[48%] h-full flex flex-col justify-center pr-6 pl-4 relative z-10">
        <SmartField field="titulo" {...sp} className="w-full">
          <h1 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerHTML)}
            className="font-display font-black text-white leading-[1.05] tracking-tighter uppercase drop-shadow-sm outline-none whitespace-pre-line"
            style={{ fontSize: `${20 * sTitle}px` }}
            dangerouslySetInnerHTML={{ __html: title.replace(/\\n/g, '<br />').replace(/\\n/g, '<br />') }}
          />
        </SmartField>
        
        <SmartField field="texto_apoio" {...sp} className="w-full mt-4">
          <p 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
            className="font-sans text-white/95 font-light leading-snug outline-none whitespace-pre-line"
            style={{ fontSize: `${11 * sText}px` }}
            dangerouslySetInnerHTML={{ __html: body.replace(/\\n/g, '<br />').replace(/\\n/g, '<br />') }}
          />
        </SmartField>

        {/* CTA Box */}
        <SmartField field="extra1" {...sp} className="mt-6">
          <div className="border-[2px] border-white rounded-[16px] py-1.5 px-3 w-fit hover:bg-white hover:text-black transition-colors duration-300 cursor-default">
            <span 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'extra1', e.currentTarget.innerText)}
              className="font-sans font-medium text-white uppercase tracking-wider text-inherit outline-none text-[10px]"
            >
              {cta}
            </span>
          </div>
        </SmartField>

        {/* Contato */}
        <div className="mt-4 flex flex-col gap-1">
          <span className="font-sans text-[8px] text-white/80 uppercase tracking-widest font-semibold">ENTRE EM CONTATO:</span>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
            </svg>
            <SmartField field="extra2" {...sp} className="shrink-0 mt-0.5">
              <span 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'extra2', e.currentTarget.innerText)}
                className="font-display font-bold text-white tracking-tight leading-none outline-none text-[16px]"
              >
                {phone}
              </span>
            </SmartField>
          </div>
        </div>

        {/* Logo */}
        <SmartField field="imagem4" {...sp} className="absolute bottom-6 right-8 h-8 z-30">
          {logoUrl ? (
            <img 
              id="tpl_agency_logo_246" 
              src={getCorsSafeUrl(logoUrl)} 
              className="h-full object-contain drop-shadow-md" 
              style={{ filter: 'brightness(0) invert(1)' }}
              crossOrigin="anonymous"
              alt="Logo"
            />
          ) : (
            <div className="h-full w-8 bg-white/10 rounded" />
          )}
        </SmartField>

      </div>

      {/* SlideHeader do Carrossel Studio */}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor={colorText} counterColor={colorText} counterBg="rgba(255,255,255,0.08)" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 247 — Portfólio Agência Mockup
// ═══════════════════════════════════════════════════════════
export function SplitVariant247(props) {
  const { 
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo 
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1540324155974-7523202daa3f?q=80&w=1080&auto=format&fit=crop";
  const bg1Url = data.imageUrl2 || "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop";
  const bg2Url = data.imageUrl3 || "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=600&auto=format&fit=crop";
  const logoUrl = data.imageUrl4 || brandLogo || "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/256px-React-icon.svg.png";
  
  const title = data.titulo || "PRECISA DE POSTS CATIVANTES E ESTRATÉGIAS SOB MEDIDA?";
  const body = data.texto_apoio || "Vamos elevar sua presença online para o próximo nível. Não espere mais, dê o primeiro passo para o sucesso hoje mesmo!";
  const cta = data.extra1 || "VAMOS ABRIR ESSA PORTA JUNTOS!";
  const phone = data.extra2 || "62 98230-4734";
  
  const colorBg = brandColor || data.backgroundColor || "#e64f22";
  const colorText = data.textColor || "#ffffff";

  return (
    <div 
      id="tpl_agency_mockup_247" 
      className="w-full h-full relative overflow-hidden flex select-none font-sans transition-all duration-300"
      style={{ 
        '--bg-main': colorBg,
        backgroundColor: 'var(--bg-main)'
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Montserrat:wght@800;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-display { font-family: 'Montserrat', sans-serif; }
      `}} />

      {/* Lado Esquerdo: Mockups Flutuantes */}
      <div className="w-[52%] h-full relative z-20">

        {/* iPhone Mockup Principal */}
        <div className="absolute top-1/2 left-[55%] transform -translate-x-1/2 -translate-y-1/2 w-[155px] h-[310px] bg-gray-900 rounded-[28px] shadow-2xl border-[2px] border-gray-300 z-20 flex flex-col items-center justify-center -rotate-[15deg]">
          {/* Tela do iPhone */}
          <div className="w-[94%] h-[97%] bg-white rounded-[24px] relative overflow-hidden flex flex-col">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[45px] h-[10px] bg-gray-900 rounded-b-lg z-30"></div>

            {/* Mini Instagram UI - Header */}
            <div className="pt-4 pb-1.5 px-2.5 flex items-center gap-1.5 border-b border-gray-100 bg-white z-20">
              <div className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="w-10 h-1 bg-gray-200 rounded mb-0.5"></div>
                <div className="w-6 h-0.5 bg-gray-100 rounded"></div>
              </div>
            </div>

            {/* Mini Instagram UI - Imagem Principal */}
            <SmartField field="imagem" {...sp} className="w-full flex-1 relative bg-gray-50">
              <ImageBg data={data} imageUrl={imageUrl} className="absolute inset-0 w-full h-full" />
            </SmartField>

            {/* Mini Instagram UI - Footer */}
            <div className="p-2.5 flex justify-between items-center bg-white z-20 border-t border-gray-100">
              <div className="flex gap-1.5">
                <svg className="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <svg className="w-3.5 h-3.5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
              </div>
              <svg className="w-3.5 h-3.5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Lado Direito: Textos e Call to Action */}
      <div className="w-[48%] h-full flex flex-col justify-center pr-6 pl-4 relative z-10">
        <SmartField field="titulo" {...sp} className="w-full">
          <h1 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerHTML)}
            className="font-display font-black text-white leading-[1.05] tracking-tighter uppercase drop-shadow-sm outline-none whitespace-pre-line"
            style={{ fontSize: `${20 * sTitle}px` }}
            dangerouslySetInnerHTML={{ __html: title.replace(/\\n/g, '<br />').replace(/\\n/g, '<br />') }}
          />
        </SmartField>
        
        <SmartField field="texto_apoio" {...sp} className="w-full mt-4">
          <p 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
            className="font-sans text-white/95 font-light leading-snug outline-none whitespace-pre-line"
            style={{ fontSize: `${11 * sText}px` }}
            dangerouslySetInnerHTML={{ __html: body.replace(/\\n/g, '<br />').replace(/\\n/g, '<br />') }}
          />
        </SmartField>

        {/* CTA Box */}
        <SmartField field="extra1" {...sp} className="mt-6">
          <div className="border-[2px] border-white rounded-[16px] py-1.5 px-3 w-fit hover:bg-white hover:text-black transition-colors duration-300 cursor-default">
            <span 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'extra1', e.currentTarget.innerText)}
              className="font-sans font-medium text-white uppercase tracking-wider text-inherit outline-none text-[10px]"
            >
              {cta}
            </span>
          </div>
        </SmartField>

        {/* Contato */}
        <div className="mt-4 flex flex-col gap-1">
          <span className="font-sans text-[8px] text-white/80 uppercase tracking-widest font-semibold">ENTRE EM CONTATO:</span>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
            </svg>
            <SmartField field="extra2" {...sp} className="shrink-0 mt-0.5">
              <span 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'extra2', e.currentTarget.innerText)}
                className="font-display font-bold text-white tracking-tight leading-none outline-none text-[16px]"
              >
                {phone}
              </span>
            </SmartField>
          </div>
        </div>

        {/* Logo */}
        <SmartField field="imagem4" {...sp} className="absolute bottom-6 right-8 h-8 z-30">
          {logoUrl ? (
            <img 
              id="tpl_agency_logo_247" 
              src={getCorsSafeUrl(logoUrl)} 
              className="h-full object-contain drop-shadow-md" 
              style={{ filter: 'brightness(0) invert(1)' }}
              crossOrigin="anonymous"
              alt="Logo"
            />
          ) : (
            <div className="h-full w-8 bg-white/10 rounded" />
          )}
        </SmartField>

      </div>

      {/* SlideHeader do Carrossel Studio */}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor={colorText} counterColor={colorText} counterBg="rgba(255,255,255,0.08)" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 248 — Social Meme (Estilo Confeitunes)
// ═══════════════════════════════════════════════════════════
export function SplitVariant248(props) {
  const { 
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo 
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const colorBg = data.backgroundColor || "#aa131c";
  const colorCard = data.backgroundColor2 || "#ffffff";
  const authorName = data.extra1 || brandHandle || "Confeitunes";
  const authorHandle = data.extra2 || (brandHandle ? "@" + brandHandle.replace("@", "") : "@confeitunes");
  const verified = isVerified !== false;
  const mainText = data.titulo || "Quando falo que hoje é o último dia para encomendas de Natal";
  const subText = data.subtitulo || "Meus Clientes:";
  const footerText = data.texto_apoio || "Embalagens limitadas.\nConfira os sabores disponíveis e reserve agora mesmo pelo link azul na bio do perfil.";
  const avatarUrl = data.imageUrl2 || brandAvatar || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='%23e11d48'><circle cx='50' cy='50' r='50'/><text x='50' y='58' font-size='32' font-family='sans-serif' font-weight='bold' fill='white' text-anchor='middle'>C</text></svg>";
  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=600";

  return (
    <div 
      id="tpl_social_meme_248" 
      className="w-full h-full relative overflow-hidden flex flex-col justify-between select-none p-6 box-border transition-all duration-300"
      style={{ 
        backgroundColor: colorBg
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');
        .font-sans-meme { font-family: 'Plus Jakarta Sans', sans-serif; }
        .text-shadow-premium {
          text-shadow: 0 2px 8px rgba(0,0,0,0.25);
        }
      `}} />

      {/* Card Branco Estilo Tweet / Post Social */}
      <div 
        id="meme-card" 
        className="rounded-[24px] p-5 shadow-xl flex flex-col gap-4 box-border font-sans-meme"
        style={{ backgroundColor: colorCard }}
      >
        {/* Header do Autor do Post */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <SmartField field="imagem2" {...sp} className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 shrink-0">
              <img 
                id="meme-preview-avatar" 
                className="w-full h-full object-cover" 
                src={getCorsSafeUrl(avatarUrl)} 
                crossOrigin="anonymous"
                alt="Avatar" 
              />
            </SmartField>
            
            <div className="flex flex-col justify-center leading-tight">
              <div className="flex items-center gap-1.5">
                <SmartField field="extra1" {...sp} className="shrink-0">
                  <span 
                    contentEditable suppressContentEditableWarning
                    onBlur={(e) => onTextChange(index, 'extra1', e.currentTarget.innerText)}
                    className="font-extrabold text-[#111827] text-[13px] tracking-tight outline-none"
                  >
                    {authorName}
                  </span>
                </SmartField>
                
                {verified && (
                  <svg 
                    id="meme-display-verified" 
                    className="h-3.5 w-3.5 text-sky-500 flex-shrink-0" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M6.267 3.455a.75.75 0 00-.708-.523 4.25 4.25 0 00-4.25 4.25 1.25 1.25 0 01-.15.584.75.75 0 00.323.978l1.58.825a.75.75 0 001.037-.323 1.25 1.25 0 011.666-.667.75.75 0 00.978-.323l.825-1.58a1.25 1.25 0 01.584-.15.75.75 0 00.978-.323l.825-1.58a.75.75 0 00-.323-.978 1.25 1.25 0 01-.15-.584zm5.111.455a.75.75 0 01.708.523 4.25 4.25 0 014.25 4.25c0 .2.05.39.15.584a.75.75 0 01-.323.978l-1.58.825a.75.75 0 01-1.037-.323 1.25 1.25 0 01-1.666-.667.75.75 0 00.978-.323l.825-1.58a1.25 1.25 0 01.584-.15.75.75 0 00.978-.323l.825-1.58a.75.75 0 00-.323-.978 1.25 1.25 0 01-.15-.584z" clipRule="evenodd" />
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                )}
              </div>
              <SmartField field="extra2" {...sp} className="shrink-0 mt-0.5">
                <span 
                  contentEditable suppressContentEditableWarning
                  onBlur={(e) => onTextChange(index, 'extra2', e.currentTarget.innerText)}
                  className="text-[10px] text-gray-500 font-medium outline-none"
                >
                  {authorHandle}
                </span>
              </SmartField>
            </div>
          </div>
        </div>

        {/* Textos do Post */}
        <div className="flex flex-col gap-1.5">
          <SmartField field="titulo" {...sp} className="w-full">
            <p 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerHTML)}
              className="text-gray-800 font-bold text-[13px] leading-[1.35] tracking-tight m-0 outline-none whitespace-pre-line block"
              style={{ fontSize: `${13 * sTitle}px` }}
              dangerouslySetInnerHTML={{ __html: mainText.replace(/\\n/g, '<br />').replace(/\n/g, '<br />') }}
            />
          </SmartField>
          {subText && (
            <SmartField field="subtitulo" {...sp} className="w-full">
              <p 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'subtitulo', e.currentTarget.innerHTML)}
                className="text-gray-600 font-semibold text-[11px] m-0 outline-none whitespace-pre-line block"
                style={{ fontSize: `${11 * sText}px` }}
                dangerouslySetInnerHTML={{ __html: subText.replace(/\\n/g, '<br />').replace(/\n/g, '<br />') }}
              />
            </SmartField>
          )}
        </div>

        {/* Imagem Meme Principal */}
        <SmartField field="imagem" {...sp} className="w-full h-[180px] rounded-[12px] overflow-hidden border border-gray-100 relative">
          <ImageBg data={data} imageUrl={imageUrl} className="w-full h-full" />
        </SmartField>
      </div>

      {/* Rodapé Texto Fora do Card */}
      <div className="text-center px-4 font-sans-meme">
        <SmartField field="texto_apoio" {...sp} className="w-full">
          <p 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
            className="text-white text-[10px] font-semibold tracking-wide leading-[1.45] m-0 text-shadow-premium outline-none whitespace-pre-line block"
            dangerouslySetInnerHTML={{ __html: footerText.replace(/\\n/g, '<br />').replace(/\n/g, '<br />') }}
          />
        </SmartField>
      </div>

      {/* SlideHeader do Carrossel Studio */}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor="#ffffff" counterColor="#ffffff" counterBg="rgba(0,0,0,0.1)" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 243 — Convite Negócios BNI
// ═══════════════════════════════════════════════════════════
export function SplitVariant243(props) {
  const { 
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo 
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1080&auto=format&fit=crop";
  const logoUrl = data.imageUrl2 || brandLogo || "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/256px-React-icon.svg.png";
  const title = data.titulo || "SUA EMPRESA ENTRA EM CAMPO OU CONTINUARÁ NO BANCO DE RESERVAS?";
  const body = data.texto_apoio || "Proteja o seu mercado na sua região e garanta a exclusividade da sua cadeira antes que o seu principal concorrente o faça. <span class=\"font-bold text-black\">Visite uma reunião de negócios de elite como convidado.</span>";
  const cta = data.extra2 || "Comente <span class=\"font-black tracking-wide\">NEGÓCIOS</span> aqui embaixo e nós enviamos o seu convite exclusivo no seu direct.";
  const colorCta = brandColor || data.accentColor || "#d81b21";

  return (
    <div 
      id="tpl_business_invite" 
      className="w-full h-full relative overflow-hidden flex flex-col items-center select-none font-sans transition-all duration-300"
      style={{ 
        '--bg-cta': colorCta
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Montserrat:wght@800;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-display { font-family: 'Montserrat', sans-serif; }
      `}} />

      {/* Background Img */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <ImageBg data={data} imageUrl={imageUrl} className="w-full h-full" />
      </div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/80 z-10 pointer-events-none"></div>

      {/* Top Logo */}
      <div className="absolute top-10 left-0 w-full flex justify-center z-20 pointer-events-none">
        <SmartField field="imagem2" {...sp} forceX={0} forceY={0} className="h-8 pointer-events-auto flex justify-center items-center">
          {logoUrl ? (
            <img 
              id="tpl_business_logo" 
              src={getCorsSafeUrl(logoUrl)} 
              className="h-full object-contain drop-shadow-lg" 
              style={{ filter: 'brightness(0) invert(1)' }}
              crossOrigin="anonymous"
              alt="Logo"
            />
          ) : (
            <div className="h-full w-10 bg-white/10 rounded" />
          )}
        </SmartField>
      </div>

      {/* Main White Card */}
      <div className="relative z-20 w-[84%] bg-white rounded-[16px] shadow-2xl flex flex-col items-center pt-8 px-6 pb-14 mt-auto mb-[22%]">
          {/* Título Principal */}
          <SmartField field="titulo" {...sp} className="w-full mb-3">
            <h1 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerHTML)}
              className="font-display font-black uppercase text-black leading-[1.15] text-center outline-none"
              style={{ fontSize: `${28 * sTitle}px` }}
              dangerouslySetInnerHTML={{ __html: title.replace(/\\n/g, '<br />').replace(/\n/g, '<br />') }}
            />
          </SmartField>

          {/* Corpo do Texto */}
          <SmartField field="texto_apoio" {...sp} className="w-full">
            <p 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
              className="font-sans text-gray-800 text-center leading-[1.45] outline-none"
              style={{ fontSize: `${18 * sText}px` }}
              dangerouslySetInnerHTML={{ __html: body.replace(/\\n/g, '<br />').replace(/\n/g, '<br />') }}
            />
          </SmartField>

          {/* Botão CTA */}
          <div 
            className="absolute -bottom-7 w-[95%] rounded-[16px] py-3 px-4 shadow-lg flex items-center justify-center border-[3px] border-white" 
            style={{ backgroundColor: colorCta }}
          >
            <SmartField field="extra2" {...sp} className="w-full flex justify-center">
              <p 
                id="tpl_business_cta" 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'extra2', e.currentTarget.innerHTML)}
                className="font-sans text-white leading-tight text-center font-light outline-none"
                style={{ fontSize: `${18 * sText}px` }}
                dangerouslySetInnerHTML={{ __html: cta.replace(/\\n/g, '<br />').replace(/\n/g, '<br />') }}
              />
            </SmartField>
          </div>
      </div>

      {/* SlideHeader do Carrossel Studio */}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor="#ffffff" counterColor="#ffffff" counterBg="rgba(0,0,0,0.2)" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 244 — Citação Negócios
// ═══════════════════════════════════════════════════════════
export function SplitVariant244(props) {
  const { 
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo 
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=1080&auto=format&fit=crop";
  const logoUrl = data.imageUrl2 || brandLogo || "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/256px-React-icon.svg.png";
  const p1 = data.titulo || "Se é o mais inteligente da mesa, <span class=\"font-black text-black\">está na mesa errada.</span> O sucesso nos negócios não é um evento isolado, é uma <span class=\"font-black text-black\">consequência do meio</span> em que se move.";
  const p2 = data.texto_apoio || "No BNI, não oferecemos apenas contatos; oferecemos um <span class=\"font-black text-black\">conselho consultivo</span> formado por empresários que já chegaram onde pretende chegar.";
  
  const colorCard = data.backgroundColor2 || "#ffffff";
  const colorText = data.textColor || "#111827";

  return (
    <div 
      id="tpl_business_quote" 
      className="w-full h-full relative overflow-hidden flex flex-col items-center justify-center select-none font-sans transition-all duration-300"
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />

      {/* Background Img */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <ImageBg data={data} imageUrl={imageUrl} className="w-full h-full" />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/60 z-10 pointer-events-none"></div>

      {/* Top Logo */}
      <div className="absolute top-10 left-0 w-full flex justify-center z-20 pointer-events-none">
        <SmartField field="imagem2" {...sp} forceX={0} forceY={0} className="h-8 pointer-events-auto flex justify-center items-center">
          {logoUrl ? (
            <img 
              id="tpl_business_quote_logo" 
              src={getCorsSafeUrl(logoUrl)} 
              className="h-full object-contain drop-shadow-md" 
              crossOrigin="anonymous"
              alt="Logo"
            />
          ) : (
            <div className="h-full w-10 bg-white/10 rounded" />
          )}
        </SmartField>
      </div>

      {/* Main White Card */}
      <div 
        id="tpl_business_quote_card" 
        className="relative z-20 w-[84%] rounded-[24px] shadow-2xl flex flex-col p-6"
        style={{ backgroundColor: colorCard, marginTop: '35px' }}
      >
        <SmartField field="titulo" {...sp} className="w-full mb-4">
          <p 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerHTML)}
            className="font-sans leading-[1.5] tracking-tight outline-none whitespace-pre-line"
            style={{ fontSize: `${23 * sTitle}px`, color: colorText }}
            dangerouslySetInnerHTML={{ __html: p1.replace(/\\n/g, '<br />').replace(/\n/g, '<br />') }}
          />
        </SmartField>
        
        <SmartField field="texto_apoio" {...sp} className="w-full">
          <p 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
            className="font-sans leading-[1.5] tracking-tight outline-none whitespace-pre-line"
            style={{ fontSize: `${23 * sText}px`, color: colorText }}
            dangerouslySetInnerHTML={{ __html: p2.replace(/\\n/g, '<br />').replace(/\n/g, '<br />') }}
          />
        </SmartField>
      </div>

      {/* SlideHeader do Carrossel Studio */}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor="#ffffff" counterColor="#ffffff" counterBg="rgba(0,0,0,0.2)" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 245 — Corp Split Card
// ═══════════════════════════════════════════════════════════
export function SplitVariant245(props) {
  const { 
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo 
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?q=80&w=1080&auto=format&fit=crop";
  const logoUrl = data.imageUrl2 || brandLogo || "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/256px-React-icon.svg.png";
  const title = data.titulo || "CAMPANHAS NÃO<br>RESOLVEM <span style=\"color: var(--accent);\">FALTA<br>DE CONFIANÇA.</span>";
  const body = data.texto_apoio || "No marketing, o <span class=\"font-bold\">custo de aquisição (CAC)</span> dispara quando o cliente não conhece a sua entrega. Pode ter o <span class=\"font-bold\">melhor criativo</span> do mercado, mas se a primeira reunião for 'fria', <span class=\"font-bold\">o ciclo de vendas</span> será longo e desgastante. O mercado de <span class=\"font-bold\">serviços premium</span> exige algo que o <span class=\"font-bold\">tráfego pago não compra: o aval prévio.</span>";
  
  const colorBg = data.backgroundColor || "#f8f9fa";
  const colorAccent = brandColor || data.accentColor || "#cf2027";

  return (
    <div 
      id="tpl_corp_split_card" 
      className="w-full h-full relative overflow-hidden flex flex-col select-none font-sans transition-all duration-300"
      style={{ 
        '--accent': colorAccent, 
        '--bg-top': colorBg,
        backgroundColor: 'var(--bg-top)'
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;700;900&family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-display { font-family: 'Oswald', sans-serif; }
        #tpl_corp_split_card h1 b {
          color: var(--accent);
          font-weight: inherit;
        }
        #tpl_corp_split_card h1 span {
          color: var(--accent);
        }
      `}} />

      {/* Grid Pattern Background */}
      <div 
        className="absolute top-0 left-0 w-full h-[65%] pointer-events-none opacity-[0.12] z-0" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 30 0 L 0 0 0 30' fill='none' stroke='%23000000' stroke-width='0.5'/%3E%3C/svg%3E")`, 
          backgroundSize: '30px 30px', 
          backgroundPosition: 'center' 
        }}
      />

      {/* Top Half */}
      <div className="w-full h-[65%] flex flex-col items-center pt-8 px-8 z-10">
        {/* Logo */}
        <SmartField field="imagem2" {...sp} className="h-8 object-contain mb-4 z-20">
          {logoUrl ? (
            <img 
              id="tpl_corp_logo" 
              src={getCorsSafeUrl(logoUrl)} 
              className="h-full object-contain drop-shadow-sm" 
              crossOrigin="anonymous"
              alt="Logo"
            />
          ) : (
            <div className="h-full w-8 bg-black/10 rounded" />
          )}
        </SmartField>
        
        {/* Main Title */}
        <SmartField field="titulo" {...sp} className="w-full z-20">
          <h1 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerHTML)}
            className="font-display font-black leading-[1] text-center uppercase tracking-tighter text-black outline-none whitespace-pre-line m-0" 
            style={{ fontSize: `${52 * sTitle}px` }}
            dangerouslySetInnerHTML={{ __html: title.replace(/\\n/g, '<br />').replace(/\n/g, '<br />') }}
          />
        </SmartField>
      </div>

      {/* Bottom Half (Image) */}
      <SmartField field="imagem" {...sp} className="w-full h-[35%] relative z-0">
        <ImageBg data={data} imageUrl={imageUrl} className="w-full h-full" />
      </SmartField>

      {/* Floating White Card */}
      <div className="absolute top-[38%] left-1/2 transform -translate-x-1/2 w-[85%] bg-white rounded-[16px] shadow-xl border border-gray-100 px-5 py-4 z-50">
        <SmartField field="texto_apoio" {...sp} className="w-full">
          <p 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
            className="font-sans leading-[1.5] text-gray-900 tracking-tight outline-none"
            style={{ fontSize: `${19.5 * sText}px` }}
            dangerouslySetInnerHTML={{ __html: body.replace(/\\n/g, '<br />').replace(/\n/g, '<br />') }}
          />
        </SmartField>
      </div>

      {/* SlideHeader do Carrossel Studio */}
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor="#ffffff" counterColor="#ffffff" counterBg="rgba(0,0,0,0.2)" />
    </div>
  );
}
// ═══════════════════════════════════════════════════════════
// REGISTRO DE VARIANTES
// ═══════════════════════════════════════════════════════════

export const SPLIT_VARIANT_COMPONENTS = {
  1: SplitVariant1,
  2: SplitVariant2,
  3: SplitVariant3,
  7: SplitVariant7,
  8: SplitVariant8,
  9: SplitVariant9,
  10: SplitVariant10,
  11: SplitVariant11,
  12: SplitVariant12,
  13: SplitVariant13,
  15: SplitVariant15,
  16: SplitVariant16,
  17: SplitVariant17,
  18: SplitVariant18,
  19: SplitVariant19,
  20: SplitVariant20,
  21: SplitVariant21,
  22: SplitVariant22,
  23: SplitVariant23,
  24: SplitVariant24,
  25: SplitVariant25,
  26: SplitVariant26,
  27: SplitVariant27,
  28: SplitVariant28,
  29: SplitVariant29,
  30: SplitVariant30,
  31: SplitVariant31,
  32: SplitVariant32,
  33: SplitVariant33,
  34: SplitVariant34,
  35: SplitVariant35,
  36: SplitVariant36,
  37: SplitVariant37,
  38: SplitVariant38,
  39: SplitVariant39,
  40: SplitVariant40,
  41: SplitVariant41,
  42: SplitVariant42,
  43: SplitVariant43,
  44: SplitVariant44,
  45: SplitVariant45,
  46: SplitVariant46,
  47: SplitVariant47,
  48: SplitVariant48,
  49: SplitVariant49,
  50: SplitVariant50,
  51: SplitVariant51,
  52: SplitVariant52,
  53: SplitVariant53,
  54: SplitVariant54,
  55: SplitVariant55,
  56: SplitVariant56,
  57: SplitVariant57,
  58: SplitVariant58,
  59: SplitVariant59,
  60: SplitVariant60,
  61: SplitVariant61,
  62: SplitVariant62,
  63: SplitVariant63,
  64: SplitVariant64,
  65: SplitVariant65,
  66: SplitVariant66,
  67: SplitVariant67,
  68: SplitVariant68,
  69: SplitVariant69,
  70: SplitVariant70,
  71: SplitVariant71,
  72: SplitVariant72,
  73: SplitVariant73,
  74: SplitVariant74,
  75: SplitVariant75,
  76: SplitVariant76,
  77: SplitVariant77,
  78: SplitVariant78,
  79: SplitVariant79,
  80: SplitVariant80,
  81: SplitVariant81,
  82: SplitVariant82,
  83: SplitVariant83,
  84: SplitVariant84,
  85: SplitVariant85,
  86: SplitVariant86,
  87: SplitVariant87,
  88: SplitVariant88,
  89: SplitVariant89,
  90: SplitVariant90,
  91: SplitVariant91,
  92: SplitVariant92,
  93: SplitVariant93,
  94: SplitVariant94,
  95: SplitVariant95,
  210: SplitVariant210,
  211: SplitVariant211,
  212: SplitVariant212,
  213: SplitVariant213,
  214: SplitVariant214,
  215: SplitVariant215,
  216: SplitVariant216,
  217: SplitVariant217,
  218: SplitVariant218,
  219: SplitVariant219,
  220: SplitVariant220,
  221: SplitVariant221,
  222: SplitVariant222,
  223: SplitVariant223,
  224: SplitVariant224,
  225: SplitVariant225,
  226: SplitVariant226,
  227: SplitVariant227,
  228: SplitVariant228,
  229: SplitVariant229,
  230: SplitVariant230,
  231: SplitVariant231,
  232: SplitVariant232,
  233: SplitVariant233,
  234: SplitVariant234,
  235: SplitVariant235,
  236: SplitVariant236,
  237: SplitVariant237,
  238: SplitVariant238,
  239: SplitVariant239,
  240: SplitVariant240,
  241: SplitVariant241,
  242: SplitVariant242,
  243: SplitVariant243,
  244: SplitVariant244,
  245: SplitVariant245,
  246: SplitVariant246,
  247: SplitVariant247,
  248: SplitVariant248,
};

export const SPLIT_VARIANT_META = [
  { id: 0, name: 'Original', description: 'Layout padrão com imagem arredondada', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--0.png' },
  { id: 1, name: 'Hero Top', description: 'Imagem grande superior + texto abaixo', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--1.png' },
  { id: 2, name: 'Side Split', description: 'Imagem lateral + texto na direita', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--2.png' },
  { id: 3, name: 'Text Top', description: 'Texto superior + imagem inferior', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--3.png' },
  { id: 7, name: 'Fashion Overlap', description: 'Card branco com foto circular sobreposta', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--7.png' },
  { id: 8, name: 'Image Top Split', description: 'Imagem superior rounded + header + conteúdo horizontal', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--8.png' },
  { id: 9, name: 'Circle Top', description: 'Imagem oval superior com container glassmorphism logo abaixo', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--9.png' },
  { id: 10, name: 'Polaroid Tilt', description: 'Layout minimalista com estilo polaroid inclinada', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--10.png' },
  { id: 11, name: 'Overlap Card', description: 'Imagem de fundo com card de texto subindo e sobrepondo', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--11.png' },
  { id: 12, name: 'Dark Centered', description: 'Layout centralizado com círculo e foco na cor da marca', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--12.png' },
  { id: 13, name: 'Thin Border Split', description: 'Layout formatado com bordas perimetrais', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--13.png' },
  { id: 15, name: 'Arch View', description: 'Imagem com arcos estilizados ao topo', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--15.png' },
  { id: 16, name: 'Frame Bottom Card', description: 'Frame destacado inferior direito na imagem', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--16.png' },
  { id: 17, name: 'Diagonal Shift', description: 'Containers rotacionados de forma dinâmica', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--17.png' },
  { id: 18, name: 'Edge Half View', description: 'Divisão exata do slide em blocos fluídos', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--18.png' },
  { id: 19, name: 'Reverse Rounded', description: 'Imagem inferior com campos alinhados', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--19.png' },
  { id: 20, name: 'Reverse Background', description: 'Fundo escuro em toda tela com card inferior', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--20.png' },
  { id: 21, name: 'Float Bottom Right', description: 'Texto flutuante com imagem reduzida direita', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--21.png' },
  { id: 22, name: 'Vertical Bar', description: 'Barra lateral de cor e texto justificado', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--22.png' },
  { id: 23, name: 'Glass Offset Bottom', description: 'Container glass alinhado com imagem solta', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--23.png' },
  { id: 24, name: 'Center Arch Bottom', description: 'Arco invertido centralizado', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--24.png' },
  { id: 25, name: 'Dark Gradient Bottom', description: 'Bordas e gradiente inferior em foto', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--25.png' },
  { id: 26, name: 'Float Color Circle', description: 'Círculo de cor e text frame na direita superior', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--26.png' },
  { id: 27, name: 'Grid Mirror', description: 'Grid 2x2 com espelhamento 4-way', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split---27.png' },
  { id: 28, name: 'Split Side Mirror', description: 'Split vertical em 2 lados espelhados', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--28.png' },
  { id: 29, name: 'Horizontal Strip', description: 'Split horizontal com fita central', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split---29.png' },
  { id: 30, name: 'Vertical Mirror Pill', description: '2 colunas verticais com título central pill', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split---30.png' },
  { id: 31, name: 'Horizontal Mirror Pill', description: '2 linhas horizontais com título central pill', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split---31.png' },
  { id: 32, name: 'Brand Base Split', description: 'Imagem superior 50% + base sólida da cor da marca 50%', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--32.png' },
  { id: 33, name: 'Side Brand Panel', description: 'Imagem lateral 75% + painel lateral da cor da marca 25%', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--33.png' },
  { id: 34, name: 'Brand Window', description: 'Imagem emoldurada em janela central sobre fundo de marca', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--34.png' },
  { id: 35, name: 'Brand Base Solid', description: 'Variante de contraste puro com base sólida da cor da marca', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--35.png' },
  { id: 36, name: 'Image In Brand', description: 'Imagem emoldurada por cor sólida com texto na base', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--36.png' },
  { id: 37, name: 'Corte Vertical', description: 'Bloco de cor esquerdo com impacto fotográfico', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split---37.png' },
  { id: 38, name: 'Imagem no Topo', description: 'Corte horizontal perfeito entre imagem e fundo limpo', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--38.png' },
  { id: 39, name: 'Branco e Puro', description: 'Caixa branca rigorosa com imagem enquadrada', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--39.png' },
  { id: 40, name: 'Foco Superior', description: 'Foco superior com base sólida da marca', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--40.png' },
  { id: 41, name: 'Enquadramento', description: 'Lateral sólida de cor pura que emoldura o produto', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--41.png' },
  { id: 42, name: 'Geometria Pura', description: 'Intersecção entre imagem e identidade geométrica', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--42.png' },
  { id: 43, name: 'Massive Frame', description: 'Moldura robusta com produto centralizado', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--43.png' },
  { id: 44, name: 'Full Bleed Base', description: 'Imagem no topo com base de texto sólida', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--44.png' },
  { id: 45, name: 'Framed Hero', description: 'Imagem emoldurada no centro superior', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--45.png' },
  { id: 46, name: 'Card Ascend', description: 'Texto sobreposto à imagem com profundidade', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--46.png' },
  { id: 47, name: 'Author Top', description: 'Layout editorial com avatar e handle', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--47.png' },
  { id: 48, name: 'Profile Cover', description: 'Imagem de topo com avatar flutuante', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--48.png' },
  { id: 49, name: 'Hero Shot Profile', description: 'Imagem de topo com base na cor da marca e avatar', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--49.png' },
  { id: 50, name: 'Author Badge Top', description: 'Imagem de topo com badge de autor flutuante', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--50.png' },
  { id: 51, name: 'Author Minimal Split', description: 'Imagem em card arredondado com avatar e tag minimalista', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--51.png' },
  { id: 52, name: 'Author Floating', description: 'Imagem flutuante centralizada com avatar e texto em destaque', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--52.png' },
  { id: 53, name: 'Sharp Brand Split', description: 'Divisão precisa entre imagem e cor da marca', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--53.png' },
  { id: 54, name: 'Modernist Top', description: 'Design minimalista com foco na imagem superior', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--54.png' },
  { id: 55, name: 'Solid Brand Top', description: 'Bloco sólido de cor da marca no topo', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--55.png' },
  { id: 56, name: 'Brand Card Overlay', description: 'Cartão brutalista sobreposto a imagem', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--56.png' },
  { id: 57, name: 'Massive Brand Top', description: 'Topo massivo de cor da marca (60%)', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--57.png' },
  { id: 58, name: 'Brand Sidebar Reverse', description: 'Barra lateral sólida com conteúdo à direita', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--58.png' },
  { id: 59, name: 'Brand Stamp Drop', description: 'Topo de cor da marca com selo central', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--59.png' },
  { id: 60, name: 'Hard Solid Top', description: 'Fundo de cor sólida marcante com linha de corte exata', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--60.png' },
  { id: 61, name: 'Solid Rigid Drop', description: 'Estrutura rígida onde a tipografia engole a área nobre', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--61.png' },
  { id: 62, name: 'Brand Header Sharp', description: 'Topo massivo que garante a força da marca', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--62.png' },
  { id: 63, name: 'Inverted Brand Sidebar', description: 'Texto ancorado à direita em um bloco de cor impenetrável', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--63.png' },
  { id: 64, name: 'Block Text Brand', description: 'O conteúdo domina 80% da tela com janela técnica', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--64.png' },
  { id: 65, name: 'Floating Text Brand', description: 'O texto flutua com autoridade sobre um campo de cor puro', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--65.png' },
  { id: 66, name: 'Brand Pillar Text', description: 'O texto é ancorado por um pilar lateral de cor sólida', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--66.png' },
  { id: 67, name: 'Offset Brand Header', description: 'Cabeçalho massivo com deslocamento técnico', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--67.png' },
  { id: 68, name: 'Cinematic Base', description: 'Base fotográfica com tipografia editorial superior', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--68.png' },
  { id: 69, name: 'Brutal Offset', description: 'Layout brutalista com janela de imagem deslocada', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--69.png' },
  { id: 70, name: 'Clean Inject', description: 'Design limpo com injeção de cor na base técnica', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--70.png' },
  { id: 71, name: 'Author Bottom Image', description: 'Avatar e texto no topo com imagem na base', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--71.png' },
  { id: 72, name: 'Author Split Bottom', description: 'Texto no topo com imagem deslocada na base', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--72.png' },
  { id: 73, name: 'Author Edge Bot', description: 'Texto sobre cor da marca com imagem na base', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--73.png' },
  { id: 74, name: 'Author Badge Bottom', description: 'Texto no topo com imagem e badge de autor', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--74.png' },
  { id: 75, name: 'Author Modern Reverse', description: 'Texto no topo com avatar e imagem arredondada', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--75.png' },
  { id: 76, name: 'Fast Company', description: 'Layout brutalista com injeção de textura granulada e card flutuante', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--76.png' },
  { id: 77, name: 'Showcase Grid', description: 'Grade de 4 fotos reativas e banner central do Charity Bakes', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split77.png' },
  { id: 78, name: 'Studio Doceria - Kit Festa', description: 'Layout amarelo e rosa mostarda para kits festivos', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--78.png' },
  { id: 79, name: 'Tortas Variadas', description: 'Design rosa com recorte circular e rodapé de contato', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--79.png' },
  { id: 80, name: 'Bolo de Cenoura', description: 'Estilo rústico moderno com sticker e base laranja', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--80.png' },
  { id: 81, name: 'Qual o seu Favorito?', description: 'Card com 3 itens gastronômicos e estrela starburst', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--81.png' },
  { id: 82, name: 'Lembrete Cheesecake', description: 'Card flutuante com morangos e cheesecake estourado', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split82.png' },
  { id: 83, name: 'Bella Vontade Doce', description: 'Split angulado magenta e turquesa com fatia de torta', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--83.png' },
  { id: 84, name: 'Mari Confeita Grid', description: 'Grade 2x2 com números e logo centralizado flutuante' },
  { id: 85, name: 'Torta Intensa', description: 'Mandala de fundo com chocolate flutuante e imagem central' },
  { id: 86, name: 'Charity Sale', description: 'Layout branco com linhas rosas laterais e imagem superior' },
  { id: 87, name: 'Cinnamon Rolls', description: 'Corte seco com pílula de título central e onda de divisão' },
  { id: 88, name: 'Chocolate Community', description: 'Estilo chocolate figma com elipse roxa e base escura' },
  { id: 89, name: 'Torta de Limão', description: 'Layout com merengue maçaricado, caixa de descrição e limões em SVG' },
  { id: 90, name: 'Brownie Promo', description: 'Letreiro gigante vazado pink hot, tooltip no brownie e curva na base' },
  { id: 91, name: 'Cupcake Box', description: 'Tema rosa vibrante com letreiro vazado cupcake, tooltip e caixa flutuante' },
  { id: 92, name: 'Brigadeiro Question', description: 'Forminhas de brigadeiro flutuantes em ponto de interrogação sobre fundo coral' },
  { id: 93, name: 'Pedido de Hoje', description: 'Split vertical com imagem à esquerda e tipografia brutalista à direita' },
  { id: 94, name: 'Pink B', description: 'Fundo azul, card bicolor rosa e creme e imagem de brownie rotacionada' },
  { id: 95, name: 'Ice Cream Special', description: 'Ondas rosas na base, anotações caligráficas com setas e sorvete em copo geométrico' },
  { id: 210, name: 'Curso Inscrições (Infoproduto)', description: 'Estética magenta de lançamento com layout de blocos arredondados e box verde destacado.' },
  { id: 211, name: 'Crepe Aviso de Risco', description: 'Design amarelo e vinho marcante com contorno offset na palavra central e caixa informativa.' },
  { id: 212, name: '3 Bolos', description: 'Layout 3-tier para brownies com tags de preços e cabeçalho vintage em estilo cartoon.' },
  { id: 213, name: 'Day M', description: 'Arco côncavo superior com mockup flutuante centralizado e botão de chamada de ação.', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split213.png' },
  { id: 214, name: 'Orange Routine', description: 'Design minimalista com ícone geométrico e painel em arco portal com sangramento total.', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split214.png' },
  { id: 215, name: 'Recipe Red', description: 'Layout de receita com imagem superior de canto arredondado e badge de destaque.', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split215.png' },
  { id: 216, name: 'Clean Tweet', description: 'Layout no formato de tweet com imagem interna e assinatura do perfil.', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split216.png' },
  { id: 217, name: 'Choux Lab (4 Quadrantes)', description: 'Grid com 4 fotos e rótulos de texto independentes.', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split217.png' },
  { id: 218, name: 'Açaí Grid Showcase', description: 'Grelha 3x4 com textura de tecido e cantos arredondados ajustáveis.', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split218.png' },
  { id: 219, name: 'Tributo Curvo', description: 'Cúpula curva superior colorida com ilustrações vetoriais dinâmicas.', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split219.png' },
  { id: 220, name: 'Cupcake Retro (Doçura)', description: 'Design vintage com imagem moldurada, textos grandes estilizados e chocolates flutuantes.', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split220.png' },
  { id: 221, name: 'Feedback (Prova Social)', description: 'Layout de depoimento com imagem arredondada deslocada e balão de texto em destaque.', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split221.png' },
  { id: 222, name: 'Festa Junina (Card Base)', description: 'Layout de Festa Junina com imagem de fundo, círculos e card flutuante inferior.', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split222.png' },
  { id: 223, name: 'Empreendedor', description: 'Layout editorial com imagem de fundo e caixa flutuante superior contendo dois parágrafos de texto.', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split223.png' },
  { id: 224, name: 'Sundae (Red Box)', description: 'Caixa de destaque superior colorida com texto e imagem centralizada de produto na base.', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split224.png' },
  { id: 225, name: 'Açaí Textura', description: 'Caixa vermelha centralizada sobreposta por imagem circular de produto com borda amarela.', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split225.png' },
  { id: 226, name: 'Benefícios (Curva)', description: 'Layout com imagem superior em arco e caixa de texto inferior contornada.', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split226.png' },
  { id: 227, name: 'Tropisuco', description: 'Imagem emoldurada centralizada com título na base e logo do copo de suco.', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split227.png' },
  { id: 228, name: 'Ice Cream Info', description: 'Layout vertical com título em destaque, imagem central e bloco descritivo inferior.', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split228.png' },
  { id: 229, name: 'Conteúdo', description: 'Layout de conteúdo programático com ícone de culinária, dois blocos e duas fotos com listas.', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split229.png' },
  { id: 230, name: 'Corporate', description: 'Layout editorial com corte de imagem na direita, badge superior e card de estatística inferior.', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--230.png' },
  { id: 231, name: 'Açaí Textura Premium', description: 'Caixa vermelha centralizada sobreposta por imagem circular de produto com borda amarela.', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--225.png' },
  { id: 232, name: 'Promo Páscoa', description: 'Imagem superior rounded com estrela decorativa e base de texto.', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--232.png' },
  { id: 233, name: 'Restaurante Trio', description: 'Trio vertical de imagens com círculos decorativos de fundo e letreiro superior.', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--233.png' },
  { id: 234, name: 'Mosaico 3x3', description: 'Grade 3x3 de fotos com bloco central de texto descritivo.', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split234.png' },
  { id: 235, name: 'Promo Plataforma', description: 'Imagem de fundo com plataforma flutuante de produto e pílula de preço.', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split235.png' },
  { id: 236, name: 'Rotina Suco', description: 'Estrutura vertical com imagem em arco, vetor de folha decorativo e textos focados.', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split236.png' },
  { id: 237, name: 'Promo Páscoa Premium', description: 'Imagem superior rounded com estrela decorativa e base de texto (ID 237).', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--232.png' },
  { id: 238, name: 'Promo Benefícios', description: 'Bloco de imagem e box lateral orange com tópicos e badge sobrepostos.', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split238.png' },
  { id: 239, name: 'Promo Panettone', description: 'Caixa de contorno com texto superior e imagem arredondada na base.', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split239.png' },
  { id: 240, name: 'Vitrine Produto', description: 'Imagem centralizada com sombra e título tricolor estilizado em letras garrafais.', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split240.png' },
  { id: 241, name: 'Produto Split', description: 'Top section de cantos arredondados contendo produto sobre estrela decorativa e base escura.', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split241.png' },
  { id: 242, name: 'Passo a Passo', description: 'Design com personagem 3D flutuante, número gigante de fundo, tag e bolinhas de carrossel.', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split242.png' },
  { id: 243, name: 'Convite Negócios BNI', description: 'Fundo escuro fotográfico com cartão centralizado branco de convite e botão de chamada destacado.', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split243.png' },
  { id: 244, name: 'Citação Negócios', description: 'Layout editorial com logo no topo, dois parágrafos destacados em caixa central e imagem de fundo.', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split244.png' },
  { id: 245, name: 'Corp Split Card', description: 'Design quadriculado com título Anton, imagem na base e cartão flutuante de texto ao centro.', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split245.png' },
  { id: 246, name: 'Portfólio Agência iPhone', description: 'Mockups flutuantes com um iPhone em destaque contendo o feed do Instagram.', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split246.png' },
  { id: 247, name: 'Portfólio Agência Mockup', description: 'Estrutura de mockups de posts flutuantes e iPhone com feed dinâmico.', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split247.png' },
  { id: 248, name: 'Social Meme (Confeitunes)', description: 'Card de post estilo tweet com avatar, nome de usuário, verificado, texto do meme e imagem interna.', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split248.png' },
];
