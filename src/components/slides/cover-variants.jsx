import React from 'react';
import { Image as ImageIcon, ArrowRight, ArrowUp, BadgeCheck, ChevronRight, Sparkles, Heart, MessageCircle, Send, Bookmark, Star, Store } from 'lucide-react';
import SmartElement from '../smart-element';
import SlideHeader from '../slide-header';

// ============================================================
// ALICE STUDIO — COVER VARIANTS (1-22)
// Cada variante recebe as mesmas props do SlideCover e renderiza
// um layout visual diferente, preservando dados dinâmicos.
// ============================================================

// ─── Helper: SmartField ──────────────────────────────────────
// Encapsula o boilerplate do SmartElement para campos editáveis.
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

// ─── Helper: TextWrapper ────────────────────────────────────
function TextWrapper({ field, index, onTextChange, as: Component = 'div', className, style, children, ...props }) {
  return (
    <Component
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => onTextChange(index, field, e.currentTarget.innerText)}
      className={`outline-none ${className || ''}`}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
}

// ─── Helper: ImageBg ────────────────────────────────────────
// Renderiza o background de imagem ou placeholder.
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
// Badge do handle de marca no topo do slide.
function BrandTag({ brandHandle, showBrandHandle, brandAvatar, brandColor, isVerified, hideDot = false }) {
  if (showBrandHandle === false) return null;
  return (
    <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-50 pointer-events-none">
      <div className="flex items-center gap-3">
        {brandAvatar ? (
          <img src={brandAvatar} alt="avatar" className="w-5 h-5 rounded-full object-cover" />
        ) : !hideDot ? (
          <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: brandColor }} />
        ) : null}
        <div className="flex items-center gap-1.5">
          <span className="font-outfit font-black tracking-[0.25em] text-[10px] uppercase text-zinc-500 truncate">
            {brandHandle ? (brandHandle.startsWith('@') ? brandHandle : `@${brandHandle}`) : '@studio'}
          </span>
          {isVerified && (
            <BadgeCheck className="w-3.5 h-3.5 shrink-0" style={{ color: brandColor }} />
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 1 — Color Split
// Imagem superior + bloco de cor inferior com título sobreposto
// ═══════════════════════════════════════════════════════════
export function CoverVariant1({ data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#080808] flex flex-col overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[55%] overflow-hidden">
        <ImageBg data={data} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/10 to-transparent" />
      </div>

      <div className="flex-1 mt-[55%] p-10 flex flex-col justify-between relative" style={{ backgroundColor: brandColor }}>
        <div className="absolute top-[12px] left-10">
          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-outfit font-black text-white tracking-tighter drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] whitespace-pre-line outline-none"
              style={{ fontSize: `${85 * sTitle}px`, lineHeight: 0.85 }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>

        <div className="mt-20 flex-1 flex flex-col justify-end">
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-playfair italic text-white max-w-[320px] mb-6 outline-none"
              style={{ fontSize: `${30 * sText}px`, lineHeight: 1.1 }}
            >
              {data.texto_apoio}
            </p>
          </SmartField>
          <div className="w-20 h-[3px] bg-surface-input/300 mb-8" />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 2 — Cinemático
// Imagem full-bleed com texto inferior e gradient
// ═══════════════════════════════════════════════════════════
export function CoverVariant2({ data, index, brandColor, brandHandle, showBrandHandle, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#050505] overflow-hidden flex flex-col">
      <ImageBg data={data} className="absolute inset-0 opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

      <div className="relative z-10 flex-1 flex flex-col justify-end p-10 pb-16">
        <div className="mb-6">
          <SmartField field="studio_text" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'studio_text', e.currentTarget.innerText)}
              className="text-[10px] font-outfit font-black tracking-[0.4em] uppercase outline-none block"
              style={{ color: brandColor }}
            >
              {data.studio_text || 'STUDIO'}
            </span>
          </SmartField>
        </div>

        <SmartField field="titulo" {...sp}>
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="text-white font-outfit font-black tracking-tighter leading-[0.9] outline-none"
            style={{ fontSize: `${80 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>

        <div className="mt-6">
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="text-zinc-300 font-playfair italic outline-none"
              style={{ fontSize: `${22 * sText}px` }}
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
// VARIANTE 3 — Blur Editorial
// Background desfocado + barra de acento + border-left
// ═══════════════════════════════════════════════════════════
export function CoverVariant3({ data, index, brandColor, brandHandle, showBrandHandle, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full flex flex-col p-10 overflow-hidden bg-[#050505]">
      <ImageBg data={data} className="absolute inset-0 opacity-40 blur-md scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

      <div className="flex-1 flex flex-col justify-end relative z-10">
        <div className="w-16 h-2 mb-8" style={{ backgroundColor: brandColor }} />

        <SmartField field="titulo" {...sp}>
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="text-white font-outfit font-black tracking-tighter leading-[0.85] outline-none drop-shadow-lg"
            style={{ fontSize: `${85 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>

        <div className="mt-8">
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="text-zinc-300 font-playfair italic outline-none border-l-2 border-white/30 pl-6"
              style={{ fontSize: `${24 * sText}px` }}
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
// VARIANTE 4 — Moldura Editorial
// Background claro com moldura branca e estilo magazine
// ═══════════════════════════════════════════════════════════
export function CoverVariant4({ data, index, brandColor, brandHandle, showBrandHandle, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#E5E5E5] flex flex-col overflow-hidden p-4">
      <div className="flex-1 border-[12px] border-white bg-black relative flex flex-col">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <ImageBg data={data} className="absolute inset-0 opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />
        </div>

        <div className="relative z-10 px-10 pb-10 pt-24 flex-1 flex flex-col justify-between items-center text-center">
          <div>
            <SmartField field="badge_text" {...sp}>
              <span
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
                className="px-4 py-1.5 bg-white text-black font-outfit font-black text-[10px] tracking-[0.4em] uppercase inline-block outline-none"
              >
                {data.badge_text || 'EDITORIAL'}
              </span>
            </SmartField>
          </div>

          <div className="w-full">
            <SmartField field="titulo" {...sp}>
              <h2
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
                className="text-white font-outfit font-black tracking-tighter leading-none outline-none drop-shadow-2xl mx-auto"
                style={{ fontSize: `${60 * sTitle}px` }}
              >
                {data.titulo}
              </h2>
            </SmartField>

            <div className="mt-6">
              <SmartField field="texto_apoio" {...sp}>
                <p
                  contentEditable suppressContentEditableWarning
                  onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                  className="text-white/90 font-playfair italic outline-none mx-auto max-w-[80%]"
                  style={{ fontSize: `${20 * sText}px` }}
                >
                  {data.texto_apoio}
                </p>
              </SmartField>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 5 — Rounded Split
// Imagem superior + bloco de cor arredondado inferior
// ═══════════════════════════════════════════════════════════
export function CoverVariant5({ data, index, brandColor, brandHandle, showBrandHandle, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-[#050505]">
      <div className="h-[60%] w-full relative">
        <ImageBg data={data} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
      </div>

      <div
        className="h-[40%] w-full flex flex-col justify-center p-10 relative z-10 -mt-10 rounded-t-[3rem]"
        style={{ backgroundColor: brandColor }}
      >
        <SmartField field="titulo" {...sp}>
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="text-white font-outfit font-black tracking-tighter leading-[0.9] outline-none"
            style={{ fontSize: `${65 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>

        <div className="mt-4">
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="text-white/80 font-playfair outline-none"
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
// VARIANTE 6 — Arco
// Imagem em container arch-shaped + texto centralizado
// ═══════════════════════════════════════════════════════════
export function CoverVariant6({ data, index, brandColor, brandHandle, showBrandHandle, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#050505] flex flex-col overflow-hidden p-8 pt-20">
      <BrandTag 
        brandHandle={brandHandle} 
        showBrandHandle={showBrandHandle} 
        brandAvatar={brandAvatar} 
        brandColor={brandColor} 
        isVerified={isVerified}
        hideDot={true}
      />

      <div
        className="w-full h-1/2 rounded-t-full rounded-b-[2rem] overflow-hidden relative border-b-4"
        style={{ boxShadow: `0 20px 50px ${brandColor}4D` }}
      >
        <ImageBg data={data} className="absolute inset-0" />
      </div>

      <div className="flex-1 flex flex-col justify-center items-center text-center mt-8">
        <div className="w-full">
          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="text-white font-outfit font-black tracking-tighter leading-[0.9] outline-none mb-4"
              style={{ fontSize: `${60 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>

        <SmartField field="texto_apoio" {...sp}>
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="text-zinc-400 font-playfair italic outline-none max-w-[90%]"
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
// VARIANTE 7 — Polaroid
// Card estilo foto instantânea com título sobreposto
// ═══════════════════════════════════════════════════════════
export function CoverVariant7({ data, index, brandColor, brandHandle, showBrandHandle, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-zinc-950 flex flex-col p-10 overflow-hidden items-center justify-center">
      <ImageBg data={data} className="absolute inset-0 opacity-20 blur-xl scale-110" />

      <BrandTag 
        brandHandle={brandHandle} 
        showBrandHandle={showBrandHandle} 
        brandAvatar={brandAvatar} 
        brandColor={brandColor} 
        isVerified={isVerified}
        hideDot={true}
      />

      {/* Polaroid Card */}
      <div className="w-[85%] aspect-[3/4] bg-white p-4 rounded-xl shadow-2xl rotate-[-4deg] relative z-10 flex flex-col">
        <ImageBg
          data={data}
          className="w-full flex-1 rounded-md"
          style={{ backgroundSize: 'cover' }}
        />
        <div className="h-16 w-full flex items-center justify-center">
          <SmartField field="contexto_dado" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'contexto_dado', e.currentTarget.innerText)}
              className="font-playfair italic text-black/40 text-xs outline-none"
            >
              {data.contexto_dado || 'Fig 01. The Approach'}
            </span>
          </SmartField>
        </div>
      </div>

      <div className="absolute bottom-16 left-8 right-8 z-20">
        <SmartField field="titulo" {...sp}>
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="text-white font-outfit font-black tracking-tighter leading-[0.9] outline-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
            style={{ fontSize: `${70 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>

        <div className="mt-4">
          <SmartField field="badge_text" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="inline-block px-4 py-2 bg-black text-white font-outfit font-black text-[10px] tracking-widest uppercase border border-white/20 rounded-md outline-none"
              style={{ color: brandColor }}
            >
              {data.badge_text || 'NEW INSIGHT'}
            </span>
          </SmartField>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 8 — Acento Lateral
// Texto centrado com borda lateral colorida
// ═══════════════════════════════════════════════════════════
export function CoverVariant8({ data, index, brandColor, brandHandle, showBrandHandle, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden p-10 justify-center">
      <ImageBg data={data} className="absolute inset-0 opacity-30 blur-lg scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />

      <BrandTag 
        brandHandle={brandHandle} 
        showBrandHandle={showBrandHandle} 
        brandAvatar={brandAvatar} 
        brandColor={brandColor} 
        isVerified={isVerified}
        hideDot={true}
      />

      <div className="relative z-10 mt-16">
        <div className="mb-6">
          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="text-white font-outfit font-black tracking-tighter leading-[0.9] outline-none drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]"
              style={{ fontSize: `${65 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>

        <SmartField field="texto_apoio" {...sp}>
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="text-zinc-300 font-playfair italic outline-none border-l-2 pl-4"
            style={{ fontSize: `${18 * sText}px`, borderColor: brandColor }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 9 — Spotlight Card
// Fundo com texto watermark + card branco central
// ═══════════════════════════════════════════════════════════
export function CoverVariant9({ data, index, brandColor, brandHandle, showBrandHandle, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#080808] flex flex-col overflow-hidden p-10 justify-center items-center text-center">
      {/* Watermark Background */}
      <div className="absolute inset-0 flex flex-col justify-center items-center overflow-hidden pointer-events-none opacity-[0.03]">
        {[...Array(5)].map((_, i) => (
          <h2 key={i} className="font-outfit font-black text-white whitespace-nowrap leading-none tracking-tighter" style={{ fontSize: '180px' }}>
            {data.titulo}
          </h2>
        ))}
      </div>

      <BrandTag 
        brandHandle={brandHandle} 
        showBrandHandle={showBrandHandle} 
        brandAvatar={brandAvatar} 
        brandColor={brandColor} 
        isVerified={isVerified}
        hideDot={true}
      />

      {/* White Card */}
      <div
        className="relative z-10 bg-white text-black p-10 rounded-[2rem] w-full border-2"
        style={{ borderColor: brandColor, boxShadow: `0 30px 60px ${brandColor}33` }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit]">
          <ImageBg data={data} className="absolute inset-0 opacity-15" />
        </div>

        <div className="relative z-10">
          <div className="mb-6">
            <SmartField field="badge_text" {...sp}>
              <span
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
                className="font-outfit font-black text-[12px] uppercase tracking-widest outline-none block"
                style={{ color: brandColor }}
              >
                {data.badge_text || 'DESTAQUE'}
              </span>
            </SmartField>
          </div>

          <div className="mb-6">
            <SmartField field="titulo" {...sp}>
              <h2
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
                className="font-outfit font-black tracking-tighter leading-[0.9] outline-none"
                style={{ fontSize: `${60 * sTitle}px` }}
              >
                {data.titulo}
              </h2>
            </SmartField>
          </div>

          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-playfair italic text-zinc-800 font-bold outline-none"
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
// VARIANTE 10 — Bottom Minimal
// Background desfocado + texto inferior centralizado
// ═══════════════════════════════════════════════════════════
export function CoverVariant10({ data, index, brandColor, brandHandle, showBrandHandle, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#050505] flex flex-col overflow-hidden">
      <ImageBg data={data} className="absolute inset-0 opacity-40 blur-md scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

      <BrandTag 
        brandHandle={brandHandle} 
        showBrandHandle={showBrandHandle} 
        brandAvatar={brandAvatar} 
        brandColor={brandColor} 
        isVerified={isVerified}
        hideDot={true}
      />

      <div className="mt-auto relative z-20 p-10 pb-16 text-center">
        <div className="mb-4">
          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="text-white font-outfit font-black tracking-tighter leading-none outline-none drop-shadow-xl"
              style={{ fontSize: `${65 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>

        <SmartField field="texto_apoio" {...sp}>
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="text-zinc-300 font-playfair italic outline-none max-w-[90%] mx-auto"
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
// VARIANTE 11 — Luxury Frame
// Imagem dentro de moldura com sombra profunda e título sobreposto
// ═══════════════════════════════════════════════════════════
export function CoverVariant11({ data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-black flex flex-col items-center justify-center p-12 overflow-hidden text-center">
      {data.imageUrl && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.08]">
          <ImageBg data={data} className="absolute inset-0" />
        </div>
      )}
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-full h-full z-0 opacity-20 blur-[100px] pointer-events-none" style={{ backgroundColor: brandColor }} />
      
      <div className="relative z-10 w-full aspect-square bg-white p-6 shadow-[0_50px_100px_rgba(0,0,0,0.8)] rounded-sm flex flex-col">
        <div className="flex-1 overflow-hidden relative">
          <ImageBg data={data} className="absolute inset-0" />
        </div>
        <div className="h-12 flex items-center justify-center pt-4">
          <SmartField field="studio_text" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'studio_text', e.currentTarget.innerText)}
              className="font-playfair italic text-zinc-400 text-[10px] tracking-widest uppercase outline-none"
            >
              {data.studio_text || 'Alice Studio Premium Editorial'}
            </span>
          </SmartField>
        </div>
      </div>

      <div className="absolute bottom-20 left-0 w-full px-8 z-20 pointer-events-none">
        <SmartField field="titulo" {...sp} className="pointer-events-auto">
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black text-white tracking-tighter drop-shadow-2xl outline-none leading-[0.8]"
            style={{ fontSize: `${80 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 12 — Diagonal Slice
// Divisão diagonal dinâmica entre cor e imagem
// ═══════════════════════════════════════════════════════════
export function CoverVariant12({ data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-black flex flex-col overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ImageBg data={data} className="absolute inset-0" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div 
        className="absolute inset-0 z-10 origin-bottom-left -rotate-[15deg] translate-y-1/2 h-[150%] w-[150%]"
        style={{ backgroundColor: brandColor }}
      />

      <div className="relative z-20 flex-1 flex flex-col justify-end p-12 pb-20">
        <SmartField field="titulo" {...sp}>
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="text-white font-outfit font-black tracking-tighter leading-none outline-none mb-6 drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
            style={{ fontSize: `${90 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>

        <div className="w-16 h-1 bg-white/40 mb-6" />

        <SmartField field="texto_apoio" {...sp}>
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="text-white/90 font-playfair italic outline-none max-w-[280px]"
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
// VARIANTE 13 — Bold Overlay
// Título sobreposto com mix-blend e badge de marca
// ═══════════════════════════════════════════════════════════
export function CoverVariant13({ data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-[#020202] relative">
      <div className="h-[55%] w-full shrink-0 bg-zinc-900 relative">
        <ImageBg data={data} className="absolute inset-0" />
      </div>
      <div className="h-[45%] w-full p-6 flex flex-col justify-between shrink-0" style={{ backgroundColor: brandColor }}>
        <div className="flex items-center gap-1.5 border-b border-white/20 pb-2 shrink-0 w-full">
          <span className="font-outfit font-bold tracking-widest text-[10px] text-white uppercase">
            {brandHandle || '@studio'}
          </span>
          <BadgeCheck className="w-3.5 h-3.5 text-white" />
        </div>
        <div className="flex justify-between items-center shrink-0 relative z-20">
          <SmartField field="texto_apoio" {...sp} className="max-w-[140px]">
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-outfit font-light text-white/90 text-[11px] tracking-widest uppercase leading-none outline-none"
            >
              {data.texto_apoio}
            </p>
          </SmartField>
          <div className="flex items-center gap-2 bg-surface-input/30 px-4 py-1.5 rounded-full">
            <SmartField field="cta_text" {...sp}>
              <span
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)}
                className="font-outfit font-bold text-[10px] uppercase tracking-widest text-white leading-none mt-[1px] outline-none"
              >
                {data.cta_text || 'Deslize'}
              </span>
            </SmartField>
            <ArrowRight className="w-3 h-3 text-white" />
          </div>
        </div>
      </div>
      <div className="absolute top-[calc(58%+90px)] left-6 -translate-y-1/2 z-30 w-[85%]">
        <SmartField field="titulo" {...sp}>
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black leading-[0.85] tracking-tighter text-[#EBE9E1] drop-shadow-2xl mix-blend-difference whitespace-pre-line outline-none"
            style={{ fontSize: `${52 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 14 — Top Block
// Título superior em bloco de cor com imagem inferior
// ═══════════════════════════════════════════════════════════
export function CoverVariant14({ data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={{ backgroundColor: brandColor }}>
      <div className="flex-1 p-8 flex flex-col justify-center relative z-10">
        <div className="w-12 h-1.5 bg-white/50 mb-8 shrink-0" />
        <SmartField field="titulo" {...sp} className="mb-4 w-full shrink-0">
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black leading-[0.85] tracking-tighter text-white uppercase whitespace-pre-line outline-none"
            style={{ fontSize: `${64 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>
        <SmartField field="texto_apoio" {...sp} className="shrink-0">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="text-white/80 tracking-widest text-[11px] uppercase font-bold font-outfit outline-none"
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>
      <div className="w-full h-[30%] bg-zinc-900 relative shrink-0 border-t-8 border-[#EBE9E1]">
        <ImageBg data={data} className="absolute inset-0" />
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur px-3 py-1 rounded text-white text-[9px] font-bold tracking-widest font-outfit uppercase">
          {brandHandle || '@studio'}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 15 — Center Card
// Imagem superior e card centralizado com título
// ═══════════════════════════════════════════════════════════
export function CoverVariant15({ data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full p-4 flex flex-col overflow-hidden" style={{ backgroundColor: brandColor }}>
      <div className="flex-1 flex flex-col relative bg-[#020202]">
        <div className="w-full h-[65%] shrink-0 bg-zinc-300 relative border-b border-zinc-300 overflow-hidden">
          <ImageBg data={data} className="absolute inset-0" />
        </div>
        <div className="flex-1 flex flex-col justify-center items-center text-center p-6 bg-white relative z-10 shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
          <SmartField field="texto_apoio" {...sp} className="mb-3 shrink-0">
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-outfit font-bold tracking-widest text-[10px] uppercase outline-none"
              style={{ color: brandColor }}
            >
              {data.texto_apoio}
            </span>
          </SmartField>
          <SmartField field="titulo" {...sp} className="shrink-0 w-full">
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-outfit font-black text-[#1a1a1a] leading-tight uppercase outline-none"
              style={{ fontSize: `${36 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 16 — Bottom Gradient
// Imagem full com gradient colorido e título centralizado
// ═══════════════════════════════════════════════════════════
export function CoverVariant16({ data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full relative overflow-hidden bg-black flex flex-col justify-end p-8">
      <div className="absolute inset-0 z-0">
        <ImageBg data={data} className="absolute inset-0 opacity-80" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, #000 0%, ${brandColor}60 40%, transparent 100%)` }} />
      </div>
      <div className="relative z-10 w-full flex flex-col items-center text-center">
        <SmartField field="texto_apoio" {...sp}>
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="text-white font-outfit tracking-[0.3em] uppercase text-[10px] font-bold mb-4 block outline-none"
          >
            {data.texto_apoio}
          </span>
        </SmartField>
        <SmartField field="titulo" {...sp} className="w-full mb-8">
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black text-white leading-tight tracking-tighter whitespace-pre-line drop-shadow-xl outline-none"
            style={{ fontSize: `${56 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>
        <div className="w-full h-px bg-white/30 mb-4" />
        <div className="flex justify-between items-center w-full">
          <span className="font-outfit font-bold tracking-widest text-[9px] text-white/70 uppercase">
            {brandHandle || '@studio'}
          </span>
          <div className="flex items-center gap-1 text-[#b5adae]">
            <SmartField field="cta_text" {...sp}>
              <span
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)}
                className="inline-block font-outfit font-bold text-[9px] uppercase tracking-widest outline-none -translate-y-[2px]"
              >
                {data.cta_text || 'Arrasta'}
              </span>
            </SmartField>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 17 — Minimal Side
// Divisão lateral com título e imagem
// ═══════════════════════════════════════════════════════════
export function CoverVariant17({ data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex overflow-hidden bg-[#EBE9E1]">
      <div className="w-[55%] h-full p-6 flex flex-col justify-between shrink-0 relative z-10 bg-[#EBE9E1]">
        <div className="flex flex-col gap-1 items-start">
          <SmartField field="studio_text" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'studio_text', e.currentTarget.innerText)}
              className="font-outfit font-black text-[10px] uppercase tracking-widest outline-none"
              style={{ color: brandColor }}
            >
              {data.studio_text || 'Studio System'}
            </span>
          </SmartField>
          <div className="w-8 h-[2px]" style={{ backgroundColor: brandColor }} />
        </div>
        <div className="flex flex-col justify-center flex-1">
          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-outfit font-black text-[#1a1a1a] leading-[0.9] tracking-tighter whitespace-pre-line mb-4 outline-none"
              style={{ fontSize: `${48 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="text-zinc-500 font-outfit font-bold tracking-widest text-[9px] uppercase outline-none"
            >
              {data.texto_apoio}
            </p>
          </SmartField>
        </div>
        <span className="font-outfit font-bold tracking-widest text-[9px] text-zinc-400 uppercase">
          {brandHandle || '@studio'}
        </span>
      </div>
      <div className="w-[45%] h-full shrink-0 bg-zinc-200">
        <ImageBg data={data} className="w-full h-full" />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// REGISTRO DE VARIANTES
// ═══════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════
// VARIANTE 18 — Glassmorphism Center
// Card central com backdrop blur sobre imagem com glow
// ═══════════════════════════════════════════════════════════
export function CoverVariant18({ data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const slideData = data;
  const imgUrl = data.imageUrl || 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80';
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full relative overflow-hidden bg-black flex flex-col justify-center items-center p-6">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-luminosity" style={{ backgroundImage: `url(${imgUrl})`, backgroundPosition: 'center 50%' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-[90px] opacity-60" style={{ backgroundColor: brandColor }} />
      </div>
      <div className="relative z-10 w-full bg-surface-input/30 backdrop-blur-md border rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl" style={{ borderColor: `${brandColor}50` }}>
        <SmartField field="texto_apoio" {...sp} className="mb-4">
          <TextWrapper {...tw} as="span" field="texto_apoio" className="text-white font-outfit tracking-[0.2em] uppercase text-[10px] font-bold py-1.5 px-4 rounded-full bg-black/50 shadow-inner border border-white/10" style={{ color: brandColor }}>
            {slideData.texto_apoio}
          </TextWrapper>
        </SmartField>
        <SmartField field="titulo" {...sp} className="w-full">
          <TextWrapper {...tw} as="h2" field="titulo" className="font-outfit font-black text-white leading-[1] tracking-tighter whitespace-pre-line drop-shadow-lg" style={{ fontSize: `${42 * sTitle}px` }}>
            {slideData.titulo}
          </TextWrapper>
        </SmartField>
      </div>
      <div className="absolute bottom-8 w-full px-8 flex justify-between items-center z-10">
        <span className="font-outfit font-bold tracking-widest text-[10px] text-white drop-shadow uppercase">{brandHandle || '@studio'}</span>
        <ArrowRight className="w-5 h-5 text-white drop-shadow" />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 19 — Arch Featured
// Imagem em arco superior com badge central
// ═══════════════════════════════════════════════════════════
export function CoverVariant19({ data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const slideData = data;
  const imgUrl = data.imageUrl || 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80';
  const bgBase = '#ffffff';
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full p-6 flex flex-col overflow-hidden" style={{ backgroundColor: bgBase }}>
      <div className="w-full flex-1 rounded-t-full rounded-b-xl overflow-hidden bg-zinc-300 relative shadow-inner mb-6 border-[6px]" style={{ borderColor: brandColor }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${imgUrl})`, backgroundPosition: 'center 50%' }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white rounded-t-xl text-[10px] font-bold uppercase tracking-widest font-outfit" style={{ color: brandColor }}>
          <SmartField field="badge_text" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="px-4 py-1.5 block outline-none"
            >
              {data.badge_text || 'Featured'}
            </span>
          </SmartField>
        </div>
      </div>
      <div className="w-full flex flex-col items-center text-center shrink-0 mb-4">
        <SmartField field="titulo" {...sp} className="w-full mb-2">
          <TextWrapper {...tw} as="h2" field="titulo" className="font-outfit font-black text-[#1a1a1a] leading-[1] tracking-tight whitespace-pre-line" style={{ fontSize: `${38 * sTitle}px` }}>
            {slideData.titulo}
          </TextWrapper>
        </SmartField>
        <SmartField field="texto_apoio" {...sp}>
          <TextWrapper {...tw} as="span" field="texto_apoio" className="font-outfit tracking-[0.2em] uppercase text-[9px] font-bold" style={{ color: brandColor }}>
            {slideData.texto_apoio}
          </TextWrapper>
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 20 — Rotating Polaroid
// Foto rotacionada com padrão de fundo e badge flutuante
// ═══════════════════════════════════════════════════════════
export function CoverVariant20({ data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const slideData = data;
  const imgUrl = data.imageUrl || 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80';
  const bgBase = '#ffffff';
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full p-6 flex flex-col items-center justify-center relative overflow-hidden" style={{ backgroundColor: bgBase }}>
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#1a1a1a 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
      <div className="bg-white p-4 pb-12 shadow-2xl rotate-2 w-[90%] relative z-10 flex flex-col">
        <div className="w-full aspect-[4/5] bg-zinc-200 relative mb-5 border border-zinc-100">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${imgUrl})`, backgroundPosition: 'center 50%' }} />
        </div>
        <SmartField field="titulo" {...sp}>
          <TextWrapper {...tw} as="h2" field="titulo" className="font-outfit font-black text-center text-[#1a1a1a] leading-[1.1] tracking-tighter" style={{ fontSize: `${28 * sTitle}px` }}>
            {slideData.titulo}
          </TextWrapper>
        </SmartField>
      </div>
      <div className="absolute bottom-10 left-10 z-20 rotate-[-4deg]">
        <SmartField field="texto_apoio" {...sp}>
          <TextWrapper {...tw} as="span" field="texto_apoio" className="font-outfit text-white px-4 py-1.5 font-bold text-[10px] uppercase tracking-[0.2em] shadow-lg" style={{ backgroundColor: brandColor }}>
            {slideData.texto_apoio}
          </TextWrapper>
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 21 — Diagonal Edge
// Imagem superior diagonal com título gigante inferior
// ═══════════════════════════════════════════════════════════
export function CoverVariant21({ data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const slideData = data;
  const imgUrl = data.imageUrl || 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80';
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full relative overflow-hidden" style={{ backgroundColor: brandColor }}>
      <div className="absolute top-0 right-0 w-[150%] h-[65%] bg-black origin-top-right -rotate-12 z-0 overflow-hidden shadow-2xl border-b-[12px] border-white">
        <div className="absolute inset-0 bg-cover bg-center opacity-80 rotate-12 scale-150" style={{ backgroundImage: `url(${imgUrl})`, backgroundPosition: 'center 50%' }} />
      </div>
      <div className="relative z-10 w-full h-full p-8 flex flex-col justify-end pb-12">
        <SmartField field="titulo" {...sp} className="w-full shrink-0 mb-4">
          <TextWrapper {...tw} as="h2" field="titulo" className="font-outfit font-black leading-[0.8] tracking-tighter text-white uppercase whitespace-pre-line drop-shadow-md" style={{ fontSize: `${72 * sTitle}px` }}>
            {slideData.titulo}
          </TextWrapper>
        </SmartField>
        <div className="flex items-center gap-4">
          <div className="w-8 h-1 bg-white shrink-0" />
          <SmartField field="texto_apoio" {...sp} className="shrink-0">
            <TextWrapper {...tw} as="p" field="texto_apoio" className="font-outfit text-white tracking-[0.3em] text-[10px] font-bold uppercase max-w-[260px]">
              {slideData.texto_apoio}
            </TextWrapper>
          </SmartField>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 22 — Header Minimal
// Header padrão + título gigante centrado com glow lateral
// ═══════════════════════════════════════════════════════════
export function CoverVariant22({ data, index, brandColor, brandHandle, showBrandHandle, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, slideCount }) {
  const sTitle = titleScale / 100;
  const slideData = data;
  const bgBase = '#ffffff';
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full p-8 flex flex-col justify-between overflow-hidden relative" style={{ backgroundColor: bgBase }}>
      <BrandTag 
        brandHandle={brandHandle} 
        showBrandHandle={showBrandHandle} 
        brandAvatar={brandAvatar} 
        brandColor={brandColor} 
        isVerified={isVerified}
        hideDot={true}
      />
      <div className="flex-1 flex flex-col justify-center relative mt-4">
        <div className="absolute -left-4 top-1/4 w-32 h-32 rounded-full blur-[60px] z-0 opacity-50" style={{ backgroundColor: brandColor }} />
        <SmartField field="titulo" {...sp} className="mb-6 z-10">
          <TextWrapper {...tw} as="h2" field="titulo" className="font-outfit font-black text-[#1a1a1a] leading-[0.85] tracking-tighter uppercase break-words" style={{ fontSize: `${80 * sTitle}px` }}>
            {slideData.titulo}
          </TextWrapper>
        </SmartField>
        <SmartField field="texto_apoio" {...sp} className="z-10">
          <TextWrapper {...tw} as="p" field="texto_apoio" className="font-outfit font-bold tracking-[0.3em] uppercase text-[12px]" style={{ color: brandColor }}>
            {slideData.texto_apoio}
          </TextWrapper>
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// REGISTRO DE VARIANTES
// ═══════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════
// VARIANTE 23 — Vertical Split
// Split vertical com handle rotacionado e imagem blend
// ═══════════════════════════════════════════════════════════
export function CoverVariant23({ data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const slideData = data;
  const imgUrl = data.imageUrl || 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80';
  const bgBase = '#ffffff';
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-row overflow-hidden relative" style={{ backgroundColor: bgBase }}>
      <div className="w-[45%] h-full shrink-0 flex flex-col justify-between p-6 z-10" style={{ backgroundColor: brandColor, color: 'white' }}>
        <span className="font-outfit font-bold text-[10px] tracking-widest uppercase transform -rotate-90 origin-top-left translate-y-[200px]">{brandHandle || '@studio'}</span>
        <div className="w-8 h-[2px] bg-white mb-8" />
      </div>
      <div className="w-[55%] h-full shrink-0 relative bg-zinc-800 z-0">
        <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{ backgroundImage: `url(${imgUrl})`, backgroundPosition: 'center 50%' }} />
      </div>
      <div className="absolute top-1/2 left-[10%] -translate-y-1/2 mt-[-10px] z-20 w-[80%] translate-x-[7px]">
        <SmartField field="texto_apoio" {...sp} className="mb-4 mt-[-48px]">
          <TextWrapper {...tw} as="p" field="texto_apoio" className="text-white font-outfit font-bold tracking-[0.2em] text-[11px] uppercase bg-black/50 inline-block px-3 py-1 rounded whitespace-pre-line max-w-[420px]">
            {slideData.texto_apoio}
          </TextWrapper>
        </SmartField>
        <SmartField field="titulo" {...sp} className="-translate-y-[5px]">
          <TextWrapper {...tw} as="h2" field="titulo" className="font-outfit font-black leading-[0.9] tracking-tighter uppercase whitespace-pre-line text-white drop-shadow-2xl" style={{ fontSize: `${64 * sTitle}px` }}>
            {slideData.titulo}
          </TextWrapper>
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 24 — Grid Process
// Estilo técnico com grid, badge numerado e imagem inferior
// ═══════════════════════════════════════════════════════════
export function CoverVariant24({ data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const slideData = data;
  const imgUrl = data.imageUrl || 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80';
  const bgBase = '#ffffff';
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full p-6 flex flex-col overflow-hidden" style={{ backgroundColor: bgBase }}>
      <div className="flex-1 border-2 flex flex-col p-6 relative" style={{ borderColor: brandColor }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `linear-gradient(${brandColor} 1px, transparent 1px), linear-gradient(90deg, ${brandColor} 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
        </div>
        <div className="flex justify-between items-center mb-auto relative z-10 shrink-0">
          <SmartField field="slide_call" {...sp}>
            <div
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'slide_call', e.currentTarget.innerText)}
              className="w-12 h-12 rounded-full border-4 flex items-center justify-center font-outfit font-bold text-xs outline-none"
              style={{ borderColor: brandColor, color: brandColor }}
            >
              {data.slide_call || '01'}
            </div>
          </SmartField>
          <SmartField field="badge_text" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="font-outfit font-bold tracking-widest text-[9px] uppercase outline-none"
              style={{ color: brandColor }}
            >
              {data.badge_text || 'O PROCESSO'}
            </span>
          </SmartField>
        </div>
        <div className="relative z-10 shrink-0 mb-6">
          <SmartField field="titulo" {...sp}>
            <TextWrapper {...tw} as="h2" field="titulo" className="font-outfit font-black leading-[0.8] tracking-tighter uppercase break-words" style={{ color: brandColor, fontSize: `${80 * sTitle}px` }}>
              {slideData.titulo}
            </TextWrapper>
          </SmartField>
        </div>
        <div className="w-full h-[30%] shrink-0 bg-zinc-300 relative border-t-2" style={{ borderColor: brandColor }}>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${imgUrl})`, backgroundPosition: 'center 50%' }} />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 25 — Frosted Float
// Card com glassmorphism flutuando sobre imagem desfocada
// ═══════════════════════════════════════════════════════════
export function CoverVariant25({ data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const slideData = data;
  const imgUrl = data.imageUrl || 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80';
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full relative overflow-hidden bg-zinc-900 flex flex-col items-center justify-center p-6">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center opacity-70 blur-sm scale-110" style={{ backgroundImage: `url(${imgUrl})`, backgroundPosition: 'center 50%' }} />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative z-10 w-full h-[75%] bg-surface-input/30 backdrop-blur-xl border border-white/20 rounded-[2rem] shadow-2xl flex flex-col justify-between p-8">
        <div className="flex justify-between items-center w-full">
          <span className="font-outfit font-bold tracking-widest text-[9px] text-white/90 uppercase">{brandHandle || '@studio'}</span>
          <div className="w-8 h-[1px] bg-surface-input/300" />
        </div>
        <div className="flex flex-col items-center text-center">
          <SmartField field="texto_apoio" {...sp} className="mb-4">
            <TextWrapper {...tw} as="span" field="texto_apoio" className="text-white font-outfit tracking-[0.3em] uppercase text-[10px] font-bold px-3 py-1 rounded-full border border-white/20 bg-surface-input/30">
              {slideData.texto_apoio}
            </TextWrapper>
          </SmartField>
          <SmartField field="titulo" {...sp} className="w-full">
            <TextWrapper {...tw} as="h2" field="titulo" className="font-outfit font-black text-white leading-tight tracking-tighter whitespace-pre-line drop-shadow-xl" style={{ fontSize: `${48 * sTitle}px` }}>
              {slideData.titulo}
            </TextWrapper>
          </SmartField>
        </div>
        <div className="flex justify-center items-center w-full">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white backdrop-blur-md border border-white/10 shadow-lg" style={{ backgroundColor: brandColor }}>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 26 — Overlay Volume
// Bloco superior de cor com blend e imagem inferior P&B
// ═══════════════════════════════════════════════════════════
export function CoverVariant26({ data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const slideData = data;
  const imgUrl = data.imageUrl || 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80';
  const bgBase = '#ffffff';
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden relative" style={{ backgroundColor: bgBase }}>
      <div className="w-full h-[55%] relative shrink-0 z-0" style={{ backgroundColor: brandColor }}>
        <div className="absolute top-6 left-6 w-[80%] flex justify-between items-center z-20">
          <SmartField field="badge_text" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="font-outfit font-black text-[10px] uppercase tracking-widest text-white border border-white/30 px-2 py-1 outline-none inline-block"
            >
              {data.badge_text || 'VOL. 14'}
            </span>
          </SmartField>
          <span className="font-outfit font-bold tracking-widest text-[9px] text-white/80 uppercase">
            @{brandHandle || 'studio'}
          </span>
        </div>
        <div className="absolute inset-0 z-10 opacity-20 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 20% 150%, white 0%, transparent 60%)' }} />
      </div>
      <div className="w-full h-[45%] bg-zinc-300 relative shrink-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${imgUrl})`, backgroundPosition: 'center 50%' }} />
      </div>
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full px-6 z-30">
        <SmartField field="titulo" {...sp}>
          <TextWrapper {...tw} as="h2" field="titulo" className="font-outfit font-black leading-[0.8] tracking-tighter uppercase whitespace-pre-line text-white drop-shadow-2xl" style={{ fontSize: `${70 * sTitle}px` }}>
            {slideData.titulo}
          </TextWrapper>
        </SmartField>
        <SmartField field="texto_apoio" {...sp} className="mt-4">
          <TextWrapper {...tw} as="p" field="texto_apoio" className="font-outfit text-[#1a1a1a] font-black tracking-[0.2em] text-[12px] uppercase bg-white inline-block px-4 py-1.5 shadow-xl">
            {slideData.texto_apoio}
          </TextWrapper>
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 27 — Slanted New
// Recorte diagonal superior com badge Sparkles e footer
// ═══════════════════════════════════════════════════════════
export function CoverVariant27({ data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const slideData = data;
  const imgUrl = data.imageUrl || 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80';
  const bgBase = '#ffffff';
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden relative" style={{ backgroundColor: bgBase }}>
      <div className="absolute inset-0 z-0 bg-zinc-800" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 65%, 0 85%)' }}>
        <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{ backgroundImage: `url(${imgUrl})`, backgroundPosition: 'center 50%' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
      </div>
      <div className="relative z-10 w-full h-full p-8 flex flex-col justify-between">
        <div className="flex justify-between items-center w-full">
          <div className="text-white flex items-center justify-center">
            <Sparkles className="w-4 h-4 fill-current" />
          </div>
          <SmartField field="badge_text" {...sp}>
            <div
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white font-outfit font-bold text-[9px] tracking-widest uppercase outline-none"
            >
              {data.badge_text || 'Novo'}
            </div>
          </SmartField>
        </div>
        <div className="flex flex-col items-end text-right mt-auto mb-10">
          <SmartField field="texto_apoio" {...sp} className="mb-2">
            <TextWrapper {...tw} as="span" field="texto_apoio" className="font-outfit text-zinc-900 bg-[#dBdBdB] px-2 py-0.5 rounded-[2px] font-bold tracking-[0.3em] uppercase text-[10px]">
              {slideData.texto_apoio}
            </TextWrapper>
          </SmartField>
          <SmartField field="titulo" {...sp} className="w-full">
            <TextWrapper {...tw} as="h2" field="titulo" className="font-outfit font-black text-[#1a1a1a] leading-[0.85] tracking-tighter uppercase whitespace-pre-line" style={{ fontSize: `${60 * sTitle}px` }}>
              {slideData.titulo}
            </TextWrapper>
          </SmartField>
        </div>
        <div className="flex items-center gap-4 border-t-2 pt-4" style={{ borderColor: brandColor }}>
          <span className="font-outfit font-bold tracking-widest text-[9px] uppercase" style={{ color: brandColor }}>
            @{brandHandle || 'studio'}
          </span>
          <div className="flex-1" />
          <SmartField field="contexto_dado" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'contexto_dado', e.currentTarget.innerText)}
              className="font-outfit font-bold text-[9px] uppercase outline-none"
            >
              {data.contexto_dado || '2026'}
            </span>
          </SmartField>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// REGISTRO DE VARIANTES
// ═══════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════
// VARIANTE 28
// ═══════════════════════════════════════════════════════════
export function CoverVariant28({ data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const slideData = data;
  const bgBase = '#ffffff';
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex relative overflow-hidden" style={{ backgroundColor: bgBase }}>
      <div className="w-[60%] h-full p-8 pb-16 flex flex-col justify-between relative z-10">
        <div className="shrink-0">
          <span className="font-bold tracking-[0.15em] text-[10px] text-zinc-500 uppercase font-outfit">
            @{brandHandle || 'studio'}
          </span>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <SmartField field="titulo" {...sp} className="mb-6 shrink-0">
            <TextWrapper {...tw} as="h2" field="titulo" className="font-black text-[#1a1a1a] leading-[0.9] tracking-tighter uppercase font-outfit" style={{ fontSize: `${34 * sTitle}px` }}>
              {slideData.titulo}
            </TextWrapper>
          </SmartField>
          <SmartField field="texto_apoio" {...sp} className="shrink-0">
            <TextWrapper {...tw} as="p" field="texto_apoio" className="text-zinc-700 leading-snug font-medium font-outfit" style={{ fontSize: `${16 * sText}px` }}>
              {slideData.texto_apoio}
            </TextWrapper>
          </SmartField>
        </div>
      </div>
      <div className="absolute bottom-6 left-6 flex flex-col z-20 font-bold text-[10px] uppercase tracking-widest text-[#1a1a1a] font-outfit">
        <SmartField field="cta_text" {...sp}>
          <div
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)}
            className="outline-none whitespace-pre-line"
          >
            {data.cta_text || 'Arraste para o lado\ne descubra'}
          </div>
        </SmartField>
        <div className="flex items-center gap-1 mt-1">
          <ArrowRight className="w-4 h-4 text-[#1a1a1a]" />
        </div>
      </div>
      <div className="absolute right-0 top-0 w-[45%] h-full bg-zinc-200 z-0 overflow-hidden shadow-[-10px_0_30px_rgba(0,0,0,0.1)]">
        <ImageBg data={data} className="absolute inset-0" />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 29
// ═══════════════════════════════════════════════════════════
export function CoverVariant29({ data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const slideData = data;
  const bgBase = '#ffffff';
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden" style={{ backgroundColor: bgBase }}>
      <div className="absolute top-8 left-8 text-[10px] text-zinc-500 font-bold tracking-widest uppercase z-20 font-outfit">
        @{brandHandle || 'studio'}
      </div>
      <div className="w-full h-full flex pt-16 pb-8 pl-6 pr-6">
        <div className="w-[52%] h-full pb-8 pr-4">
          <div className="w-full h-full rounded-2xl overflow-hidden bg-zinc-200 relative shadow-lg">
            <ImageBg data={data} className="absolute inset-0" />
          </div>
        </div>
        <div className="w-[48%] h-full flex flex-col justify-center pl-2">
          <SmartField field="titulo" {...sp} className="mb-6">
            <TextWrapper {...tw} as="h2" field="titulo" className="font-black text-[#1a1a1a] leading-[0.9] tracking-tighter uppercase font-outfit" style={{ fontSize: `${32 * sTitle}px` }}>
              {slideData.titulo}
            </TextWrapper>
          </SmartField>
          <div className="flex gap-2 items-center mb-6">
            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: brandColor }} />
            <SmartField field="tag" {...sp}>
              <TextWrapper {...tw} as="p" field="tag" className="text-zinc-600 leading-snug font-medium font-outfit" style={{ fontSize: `${14 * sText}px` }}>
                {slideData.tag || 'Sua Tag Aqui'}
              </TextWrapper>
            </SmartField>
          </div>
          <SmartField field="texto_apoio" {...sp}>
            <TextWrapper {...tw} as="p" field="texto_apoio" className="text-[#1a1a1a] font-bold leading-snug font-outfit" style={{ fontSize: `${15 * sText}px` }}>
              {slideData.texto_apoio}
            </TextWrapper>
          </SmartField>
        </div>
      </div>
      <div className="absolute bottom-8 right-8 flex items-center gap-2">
        <SmartField field="cta_text" {...sp}>
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)}
            className="font-bold text-[10px] uppercase tracking-widest text-zinc-500 font-outfit outline-none inline-block -translate-y-[3px]"
          >
            {data.cta_text || 'Arraste'}
          </span>
        </SmartField>
        <ArrowRight className="w-4 h-4 text-zinc-500" />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 30
// ═══════════════════════════════════════════════════════════
export function CoverVariant30({ data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const slideData = data;
  const bgBase = '#ffffff';
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex relative overflow-hidden" style={{ backgroundColor: bgBase }}>
      <div className="absolute left-0 top-0 bottom-0 w-[30%] bg-zinc-300 z-0">
        <ImageBg data={data} className="absolute inset-0" />
      </div>
      <div className="w-full h-full pl-[30%] flex flex-col z-10">
        <div className="p-6 shrink-0">
          <span className="font-bold tracking-[0.15em] text-[10px] text-zinc-500 uppercase font-outfit">
            @{brandHandle || 'studio'}
          </span>
        </div>
        <div className="flex-1 flex flex-col justify-center px-8 text-center">
          <SmartField field="titulo" {...sp} className="mb-8">
            <TextWrapper {...tw} as="h2" field="titulo" className="font-black text-[#1a1a1a] leading-[0.95] tracking-tighter uppercase font-outfit" style={{ fontSize: `${30 * sTitle}px` }}>
              {slideData.titulo}
            </TextWrapper>
          </SmartField>
          <SmartField field="texto_apoio" {...sp} className="flex flex-col gap-4 text-left pl-4 border-l-2" style={{ borderColor: brandColor }}>
            <TextWrapper {...tw} as="div" field="texto_apoio" className="text-zinc-700 leading-snug font-medium whitespace-pre-wrap font-outfit" style={{ fontSize: `${14 * sText}px` }}>
              {slideData.texto_apoio}
            </TextWrapper>
          </SmartField>
        </div>
        <div className="p-6 shrink-0 flex justify-end">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-[#1a1a1a]/20">
            <Heart className="w-4 h-4 text-[#1a1a1a]" />
            <MessageCircle className="w-4 h-4 text-[#1a1a1a]" />
            <Send className="w-4 h-4 text-[#1a1a1a]" />
            <Bookmark className="w-4 h-4 text-[#1a1a1a] ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 31
// ═══════════════════════════════════════════════════════════
export function CoverVariant31({ data, index, brandColor, brandHandle, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const slideData = data;
  const bgBase = '#ffffff';
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex overflow-hidden" style={{ backgroundColor: bgBase }}>
      <div className="w-[55%] h-full p-6 flex flex-col justify-center relative z-10">
        <span className="font-bold tracking-[0.15em] text-[10px] text-zinc-500 uppercase absolute top-6 left-6 font-outfit">
          @{brandHandle || 'studio'}
        </span>
        <SmartField field="titulo" {...sp} className="mb-6 mt-6 shrink-0 relative top-[96px]">
          <TextWrapper {...tw} as="h2" field="titulo" className="font-black leading-[0.9] tracking-tighter uppercase font-outfit" style={{ color: brandColor, fontSize: `${32 * sTitle}px` }}>
            {slideData.titulo}
          </TextWrapper>
        </SmartField>
        <div className="flex flex-col gap-4 flex-1 overflow-hidden min-h-0 justify-center">
          <div className="flex gap-3 items-start shrink-0">
            <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm" style={{ backgroundColor: `${brandColor}20`, color: brandColor }}>
              <Star className="w-3 h-3" fill="currentColor" />
            </div>
            <SmartField field="item1" {...sp}>
               <TextWrapper {...tw} as="p" field="item1" className="text-zinc-800 leading-snug font-medium font-outfit" style={{ fontSize: `${13 * sText}px` }}>
                  {slideData.item1 || 'Entrega com segurança, sem coração na mão durante o trajeto.'}
               </TextWrapper>
            </SmartField>
          </div>
          <div className="flex gap-3 items-start shrink-0">
            <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm" style={{ backgroundColor: `${brandColor}20`, color: brandColor }}>
              <Star className="w-3 h-3" fill="currentColor" />
            </div>
            <SmartField field="item2" {...sp}>
               <TextWrapper {...tw} as="p" field="item2" className="text-zinc-800 leading-snug font-medium font-outfit" style={{ fontSize: `${13 * sText}px` }}>
                  {slideData.item2 || 'Ganhe a confiança do cliente e valorize seu trabalho sempre.'}
               </TextWrapper>
            </SmartField>
          </div>
          <div className="flex gap-3 items-start shrink-0">
            <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm" style={{ backgroundColor: `${brandColor}20`, color: brandColor }}>
              <Star className="w-3 h-3" fill="currentColor" />
            </div>
            <SmartField field="item3" {...sp}>
               <TextWrapper {...tw} as="p" field="item3" className="text-zinc-800 leading-snug font-medium font-outfit" style={{ fontSize: `${13 * sText}px` }}>
                  {slideData.item3 || 'Foque em crescer e faturar trabalhando diretamente de casa.'}
               </TextWrapper>
            </SmartField>
          </div>
        </div>
        <div className="mt-auto pt-4 flex items-center gap-2 shrink-0">
          <SmartField field="cta_text" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)}
              className="font-bold text-[9px] uppercase tracking-widest text-zinc-500 font-outfit outline-none"
            >
              {data.cta_text || 'Arraste para o lado e descubra'}
            </span>
          </SmartField>
          <ArrowRight className="w-3 h-3 text-zinc-500" />
        </div>
      </div>
      <div className="w-[45%] h-full bg-zinc-200 relative shrink-0">
        <ImageBg data={data} className="absolute inset-0" />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 32
// ═══════════════════════════════════════════════════════════
export function CoverVariant32({ data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const slideData = data;
  const bgBase = '#ffffff';
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden" style={{ backgroundColor: bgBase }}>
      <div className="absolute inset-0 z-0 flex flex-col opacity-20 pointer-events-none select-none overflow-hidden leading-[0.85] text-center pt-8">
        <div className="font-black uppercase whitespace-nowrap font-outfit" style={{ color: brandColor, fontSize: `${60 * sTitle}px` }}>{slideData.titulo}</div>
        <div className="font-black uppercase whitespace-nowrap font-outfit" style={{ color: brandColor, fontSize: `${60 * sTitle}px` }}>{slideData.titulo}</div>
        <div className="font-black uppercase whitespace-nowrap font-outfit" style={{ color: brandColor, fontSize: `${60 * sTitle}px` }}>{slideData.titulo}</div>
        <div className="font-black uppercase whitespace-nowrap font-outfit" style={{ color: brandColor, fontSize: `${60 * sTitle}px` }}>{slideData.titulo}</div>
        <div className="font-black uppercase whitespace-nowrap font-outfit" style={{ color: brandColor, fontSize: `${60 * sTitle}px` }}>{slideData.titulo}</div>
        <div className="font-black uppercase whitespace-nowrap font-outfit" style={{ color: brandColor, fontSize: `${60 * sTitle}px` }}>{slideData.titulo}</div>
      </div>
      <div className="relative z-10 flex-1 flex flex-col justify-end p-6">
        <div className="w-full h-[55%] rounded-t-3xl rounded-b-xl overflow-hidden shadow-2xl bg-zinc-200 relative border-4 border-white mb-4">
          <ImageBg data={data} className="absolute inset-0" />
        </div>
        <div className="bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg flex justify-between items-center">
          <SmartField field="texto_apoio" {...sp} className="flex-1">
            <TextWrapper {...tw} as="p" field="texto_apoio" className="font-bold text-[#1a1a1a] leading-tight font-outfit" style={{ fontSize: `${12 * sText}px` }}>
              {slideData.texto_apoio}
            </TextWrapper>
          </SmartField>
          <div className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center ml-4 shadow-md" style={{ backgroundColor: brandColor }}>
            <Store className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 33 — Gradient Footer
// Imagem superior + rodapé colorido com divisória
// ═══════════════════════════════════════════════════════════
export function CoverVariant33({ data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const slideData = data;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-black">
      <div className="h-[45%] w-full relative shrink-0">
        <ImageBg data={data} className="absolute inset-0" />
      </div>
      <div className="flex-1 w-full p-8 flex flex-col justify-center relative" style={{ backgroundColor: brandColor }}>
        <SmartField field="titulo" {...sp} className="w-full mb-3 shrink-0">
          <TextWrapper {...tw} as="h2" field="titulo" className="font-outfit font-black text-white leading-[0.85] tracking-tighter uppercase" style={{ fontSize: `${52 * sTitle}px` }}>
            {slideData.titulo}
          </TextWrapper>
        </SmartField>
        <div className="w-full h-px bg-white/80 mb-4 shrink-0" />
        <SmartField field="texto_apoio" {...sp} className="w-full mb-8">
          <TextWrapper {...tw} as="p" field="texto_apoio" className="text-white font-playfair font-medium italic leading-snug tracking-wide" style={{ fontSize: `${18 * sText}px` }}>
            {slideData.texto_apoio}
          </TextWrapper>
        </SmartField>
        <div className="absolute bottom-6 right-6 flex items-center gap-1.5 z-20">
          <SmartField field="cta_text" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)}
              className="font-outfit font-bold text-[10px] uppercase tracking-widest text-white outline-none inline-block -translate-y-[3px]"
            >
              {data.cta_text || 'ARRASTA'}
            </span>
          </SmartField>
          <ArrowRight className="w-3.5 h-3.5 text-white" />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 34 — Center Focus
// Imagem full bg com opacity e gradient + texto centralizado
// ═══════════════════════════════════════════════════════════
export function CoverVariant34({ data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, slideCount, brandHandle, brandAvatar, isVerified }) {
  const sTitle = titleScale / 100;
  const slideData = data;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full relative overflow-hidden bg-black">
      <div className="absolute inset-0 opacity-60">
        <ImageBg data={data} className="absolute inset-0" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-8">
        <SlideHeader 
          {...sp} 
          slideIndex={index}
          index={index + 1} 
          total={slideCount} 
          brandHandle={brandHandle}
          brandAvatar={brandAvatar}
          brandColor={brandColor}
          isVerified={isVerified}
          showSlideCounter={false}
          hideDot={true}
          dark 
        />
        <div className="flex-1 flex flex-col justify-center items-center text-center mt-12">
          <SmartField field="titulo" {...sp} className="w-full mb-4">
            <TextWrapper {...tw} as="h2" field="titulo" className="font-outfit font-black text-white leading-none tracking-tighter uppercase drop-shadow-2xl" style={{ fontSize: `${56 * sTitle}px` }}>
              {slideData.titulo}
            </TextWrapper>
          </SmartField>
          <SmartField field="texto_apoio" {...sp}>
            <TextWrapper {...tw} as="p" field="texto_apoio" className="text-white/80 font-outfit font-medium tracking-widest uppercase text-[10px]">
              {slideData.texto_apoio}
            </TextWrapper>
          </SmartField>
        </div>
        <div className="w-full flex justify-center pb-4">
          <div className="bg-white/20 backdrop-blur-md border border-white/30 px-6 py-3 rounded-full flex items-center gap-3">
            <SmartField field="cta_text" {...sp}>
              <span
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)}
                className="font-outfit font-bold text-[10px] uppercase tracking-widest text-white outline-none inline-block -translate-y-[2px]"
              >
                {data.cta_text || 'Arraste para o lado e descubra'}
              </span>
            </SmartField>
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 35 — Curve Card
// Imagem superior + card branco inferior com topo arredondado
// ═══════════════════════════════════════════════════════════
export function CoverVariant35({ data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const slideData = data;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full relative overflow-hidden bg-black">
      <div className="absolute inset-0 z-0 h-[70%]">
        <ImageBg data={data} className="absolute inset-0" />
      </div>
      <div className="absolute bottom-0 w-full h-[40%] bg-white rounded-t-[40px] p-8 flex flex-col justify-center z-10 shadow-[0_-20px_40px_rgba(0,0,0,0.3)]">
        <SmartField field="texto_apoio" {...sp} className="mb-2">
          <TextWrapper {...tw} as="p" field="texto_apoio" className="font-outfit font-bold text-[10px] uppercase tracking-widest" style={{ color: brandColor }}>
            {slideData.texto_apoio}
          </TextWrapper>
        </SmartField>
        <SmartField field="titulo" {...sp} className="w-full">
          <TextWrapper {...tw} as="h2" field="titulo" className="font-outfit font-black text-[#1a1a1a] leading-none tracking-tight uppercase" style={{ fontSize: `${38 * sTitle}px` }}>
            {slideData.titulo}
          </TextWrapper>
        </SmartField>
      </div>
      <div className="absolute bottom-[calc(35%+4px)] right-8 z-20 flex items-center gap-4 -translate-y-[4px]">
        <SmartField field="cta_text" {...sp}>
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)}
            className="font-outfit font-bold text-[10px] uppercase tracking-widest text-white drop-shadow-md outline-none"
          >
            {data.cta_text || 'DESLIZE'}
          </span>
        </SmartField>
        <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl text-white border-2 border-white" style={{ backgroundColor: brandColor }}>
          <ArrowRight className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 36 — Magazine Split
// Texto à esquerda e imagem à direita com botão flutuante
// ═══════════════════════════════════════════════════════════
export function CoverVariant36({ data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const slideData = data;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex overflow-hidden bg-[#EBE9E1]">
      <div className="w-[55%] h-full p-8 flex flex-col justify-center z-10">
        <SmartField field="titulo" {...sp} className="mb-4">
          <TextWrapper {...tw} as="h2" field="titulo" className="font-outfit font-black text-[#1a1a1a] leading-[0.85] tracking-tighter uppercase" style={{ fontSize: `${42 * sTitle}px` }}>
            {slideData.titulo}
          </TextWrapper>
        </SmartField>
        <SmartField field="texto_apoio" {...sp} className="w-full">
          <TextWrapper {...tw} as="p" field="texto_apoio" className="font-outfit text-zinc-600 font-medium leading-snug" style={{ fontSize: `${14 * sText}px` }}>
            {slideData.texto_apoio}
          </TextWrapper>
        </SmartField>
      </div>
      <div className="w-[45%] h-full relative z-0">
        <ImageBg data={data} className="absolute inset-0" />
        <div className="absolute bottom-6 -left-8 bg-white shadow-xl px-5 py-2.5 rounded-full flex items-center gap-2 border border-zinc-100 z-20">
          <SmartField field="cta_text" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)}
              className="font-outfit font-bold text-[9px] uppercase tracking-widest text-[#1a1a1a] outline-none inline-block -translate-y-[3px]"
            >
              {data.cta_text || 'CONFIRA AQUI'}
            </span>
          </SmartField>
          <ArrowRight className="w-3 h-3 text-[#1a1a1a]" />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 37 — Modern Frame
// Fundo colorido com card de imagem central e botões minimalistas
// ═══════════════════════════════════════════════════════════
export function CoverVariant37({ data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, brandHandle }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const slideData = data;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-col p-6 overflow-hidden" style={{ backgroundColor: brandColor }}>
      <div className="w-full flex justify-between items-center mb-6">
        <span className="font-outfit font-bold text-[10px] uppercase tracking-widest text-white/80">
          {brandHandle ? `@${brandHandle.replace('@','')}` : '@STUDIO'}
        </span>
      </div>
      <div className="w-full flex-1 bg-zinc-200 rounded-3xl overflow-hidden shadow-2xl relative border-4 border-white/20 mb-6">
        <ImageBg data={data} className="absolute inset-0" />
      </div>
      <div className="w-full flex justify-between items-end pb-2">
        <div className="flex-1">
          <SmartField field="titulo" {...sp} className="mb-1">
            <TextWrapper {...tw} as="h2" field="titulo" className="font-outfit font-black text-white leading-none tracking-tight uppercase" style={{ fontSize: `${28 * sTitle}px` }}>
              {slideData.titulo}
            </TextWrapper>
          </SmartField>
          <SmartField field="texto_apoio" {...sp}>
            <TextWrapper {...tw} as="p" field="texto_apoio" className="font-outfit text-white/80 text-[12px] font-medium leading-snug" style={{ fontSize: `${12 * sText}px` }}>
              {slideData.texto_apoio}
            </TextWrapper>
          </SmartField>
        </div>
        <div className="shrink-0 ml-4 flex items-center gap-2">
          <SmartField field="cta_text" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)}
              className="font-outfit font-bold text-[10px] uppercase tracking-widest text-white outline-none inline-block -translate-y-[2px]"
            >
              {data.cta_text || 'VER MAIS'}
            </span>
          </SmartField>
          <div className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 38 — Gradient Bottom
// Imagem full bleed com gradient inferior e tags/título alinhados
// ═══════════════════════════════════════════════════════════
export function CoverVariant38({ data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const slideData = data;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full relative overflow-hidden bg-black text-white">
      <div className="absolute inset-0 z-0">
        <ImageBg data={data} className="absolute inset-0 opacity-70" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="relative z-10 h-full w-full flex flex-col justify-end p-8 pb-24">
        <SmartField field="tag" {...sp} className="mb-3">
          <TextWrapper {...tw} as="span" field="tag" className="font-outfit font-bold text-[10px] tracking-[0.2em] uppercase" style={{ color: brandColor }}>
            {slideData.tag || 'DESTAQUE'}
          </TextWrapper>
        </SmartField>
        <SmartField field="titulo" {...sp} className="w-full mb-3">
          <TextWrapper {...tw} as="h2" field="titulo" className="font-outfit font-black leading-[0.9] tracking-tighter uppercase text-white drop-shadow-xl" style={{ fontSize: `${48 * sTitle}px` }}>
            {slideData.titulo}
          </TextWrapper>
        </SmartField>
        <SmartField field="texto_apoio" {...sp} className="w-[85%]">
          <TextWrapper {...tw} as="p" field="texto_apoio" className="font-outfit text-zinc-300 font-medium leading-snug" style={{ fontSize: `${15 * sText}px` }}>
            {slideData.texto_apoio}
          </TextWrapper>
        </SmartField>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-xl border border-white/20 px-8 py-2.5 rounded-full flex items-center gap-3 z-20 shadow-2xl shrink-0 w-max whitespace-nowrap">
        <SmartField field="cta_text" {...sp} className="whitespace-nowrap">
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)}
            className="font-outfit font-bold text-[10px] uppercase tracking-widest text-white whitespace-nowrap outline-none inline-block -translate-y-[3px]"
          >
            {data.cta_text || 'Arraste para o lado e descubra'}
          </span>
        </SmartField>
        <ArrowRight className="w-4 h-4 text-white shrink-0" />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 39 — Side Strip
// Imagem lateral com faixa de marca e título centrado
// ═══════════════════════════════════════════════════════════
export function CoverVariant39({ data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const slideData = data;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex overflow-hidden bg-zinc-900">
      <div className="flex-1 relative h-full flex flex-col justify-center p-8 min-w-0">
        <div className="absolute inset-0 z-0">
          <ImageBg data={data} className="absolute inset-0 opacity-40 mix-blend-luminosity" />
        </div>
        <div className="relative z-10 w-full">
          <SmartField field="titulo" {...sp} className="w-full mb-4">
            <TextWrapper {...tw} as="h2" field="titulo" className="font-outfit font-black text-white leading-none tracking-tighter uppercase drop-shadow-2xl" style={{ fontSize: `${48 * sTitle}px` }}>
              {slideData.titulo}
            </TextWrapper>
          </SmartField>
          <SmartField field="texto_apoio" {...sp} className="w-[90%]">
            <TextWrapper {...tw} as="p" field="texto_apoio" className="text-zinc-400 font-outfit font-medium leading-snug" style={{ fontSize: `${14 * sText}px` }}>
              {slideData.texto_apoio}
            </TextWrapper>
          </SmartField>
        </div>
      </div>
      <div className="w-16 shrink-0 h-full flex flex-col items-center justify-center shadow-2xl z-20 relative" style={{ backgroundColor: brandColor }}>
        <div className="flex items-center gap-3 transform rotate-90 origin-center absolute top-1/2 -translate-y-1/2 whitespace-nowrap w-max min-w-max">
          <SmartField field="cta_text" {...sp} className="whitespace-nowrap">
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)}
              className="font-outfit font-bold text-[10px] uppercase tracking-[0.2em] text-white outline-none whitespace-nowrap"
            >
              {data.cta_text || 'Arraste para o lado e descubra'}
            </span>
          </SmartField>
          <ArrowUp className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 40 — Floating Card Center
// Imagem superior e card flutuante centralizado
// ═══════════════════════════════════════════════════════════
export function CoverVariant40({ data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const slideData = data;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden bg-white">
      <div className="h-[65%] w-full relative shrink-0">
        <ImageBg data={data} className="absolute inset-0" />
      </div>
      <div className="flex-1 w-full shrink-0" style={{ backgroundColor: brandColor }} />
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 w-[85%] bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/50 z-10">
        <SmartField field="titulo" {...sp} className="mb-2">
          <TextWrapper {...tw} as="h2" field="titulo" className="font-outfit font-black text-[#1a1a1a] leading-tight uppercase tracking-tighter" style={{ fontSize: `${32 * sTitle}px` }}>
            {slideData.titulo}
          </TextWrapper>
        </SmartField>
        <SmartField field="texto_apoio" {...sp}>
          <TextWrapper {...tw} as="p" field="texto_apoio" className="text-zinc-600 font-outfit font-medium leading-snug" style={{ fontSize: `${14 * sText}px` }}>
            {slideData.texto_apoio}
          </TextWrapper>
        </SmartField>
      </div>
      <div className="absolute bottom-6 right-6 flex items-center gap-2 z-20 text-white shrink-0">
        <SmartField field="cta_text" {...sp}>
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)}
            className="font-outfit font-bold text-[10px] uppercase tracking-widest outline-none inline-block -translate-y-[3px]"
          >
            {data.cta_text || 'Arraste'}
          </span>
        </SmartField>
        <ArrowRight className="w-4 h-4" />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 41 — Slanted Banner
// Faixa diagonal sobre imagem grayscale
// ═══════════════════════════════════════════════════════════
export function CoverVariant41({ data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const slideData = data;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full relative overflow-hidden bg-zinc-200">
      <div className="absolute inset-0 z-0">
        <ImageBg data={data} className="absolute inset-0 grayscale opacity-80" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-black/30" />
      <div className="absolute top-16 -left-8 w-[120%] -rotate-6 bg-[#1a1a1a] py-6 px-12 z-10 shadow-2xl border-y-4" style={{ borderColor: brandColor }}>
        <SmartField field="titulo" {...sp}>
          <TextWrapper {...tw} as="h2" field="titulo" className="font-outfit font-black text-white leading-none uppercase tracking-tighter" style={{ fontSize: `${42 * sTitle}px` }}>
            {slideData.titulo}
          </TextWrapper>
        </SmartField>
      </div>
      <div className="absolute bottom-0 left-0 w-full p-8 z-20 flex justify-between items-end">
        <div className="bg-[#1a1a1a] px-5 py-3 border-l-4 shadow-xl flex items-center gap-3 shrink-0" style={{ borderColor: brandColor }}>
          <SmartField field="cta_text" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)}
              className="font-outfit font-black text-[11px] uppercase tracking-widest text-white whitespace-nowrap outline-none inline-block -translate-y-[2px]"
            >
              {data.cta_text || 'Arraste para o lado e descubra'}
            </span>
          </SmartField>
          <ArrowRight className="w-5 h-5 shrink-0" style={{ color: brandColor }} />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 42 — Upper Frame Title
// Título superior emoldurado e rodapé branco minimalista
// ═══════════════════════════════════════════════════════════
export function CoverVariant42({ data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const slideData = data;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full p-4 bg-white flex flex-col relative overflow-hidden">
      <div className="flex-1 w-full bg-zinc-100 relative overflow-hidden rounded-t-lg">
        <ImageBg data={data} className="absolute inset-0" />
        <div className="absolute top-0 left-0 w-full p-6 bg-gradient-to-b from-black/60 to-transparent z-10">
          <SmartField field="titulo" {...sp}>
            <TextWrapper {...tw} as="h2" field="titulo" className="font-outfit font-black text-white leading-none uppercase tracking-tighter drop-shadow-lg" style={{ fontSize: `${38 * sTitle}px` }}>
              {slideData.titulo}
            </TextWrapper>
          </SmartField>
        </div>
      </div>
      <div className="h-20 w-full flex items-center justify-between px-2 shrink-0 bg-white z-20">
        <SmartField field="texto_apoio" {...sp} className="flex-1 overflow-hidden pr-4 min-w-0">
          <TextWrapper {...tw} as="p" field="texto_apoio" className="text-zinc-800 font-outfit font-bold uppercase tracking-widest text-[9px] truncate">
            {slideData.texto_apoio}
          </TextWrapper>
        </SmartField>
        <div className="flex items-center gap-2 shrink-0 px-4 py-2 rounded-full border border-zinc-200 shadow-sm whitespace-nowrap">
          <SmartField field="cta_text" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)}
              className="font-outfit font-black text-[9px] uppercase tracking-[0.2em] text-[#1a1a1a] outline-none inline-block -translate-y-[2px]"
            >
              {data.cta_text || 'Arraste'}
            </span>
          </SmartField>
          <ArrowRight className="w-3 h-3 text-[#1a1a1a] shrink-0" />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 43 — Repeat Text Focus
// Texto repetido ao fundo com card de imagem central e badge
// ═══════════════════════════════════════════════════════════
export function CoverVariant43({ data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, brandHandle }) {
  const sTitle = titleScale / 100;
  const slideData = data;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden justify-center items-center p-6 bg-white">
      <div className="absolute inset-0 z-0 flex flex-col justify-center opacity-20 pointer-events-none select-none leading-[0.8] text-center overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="font-outfit font-black uppercase whitespace-nowrap" style={{ color: brandColor, fontSize: `${70 * sTitle}px` }}>
            {slideData.titulo}
          </div>
        ))}
      </div>
      <div className="relative z-10 w-[85%] aspect-[3/4] bg-zinc-200 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden border-[6px] border-white shrink-0">
        <ImageBg data={data} className="absolute inset-0" />
      </div>
      <div className="absolute bottom-8 right-8 bg-white px-5 py-2.5 rounded-full shadow-xl z-20 flex items-center gap-2 border border-zinc-100">
        <span className="font-outfit font-bold text-[10px] tracking-widest uppercase" style={{ color: brandColor }}>
          @{brandHandle ? brandHandle.replace('@','') : 'STUDIO'}
        </span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 44 — Floating Bubbles
// Bolhas flutuantes com imagem e texto lateral elegante
// ═══════════════════════════════════════════════════════════
export function CoverVariant44({ data, index, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, slideCount, brandHandle, brandAvatar, isVerified }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const slideData = data;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full relative overflow-hidden bg-white">
      <SlideHeader 
        {...sp} 
        slideIndex={index}
        index={index + 1} 
        total={slideCount} 
        brandHandle={brandHandle}
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        isVerified={isVerified}
        showSlideCounter={false}
        hideDot={true}
      />
      
      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full border-8 border-white/60 shadow-xl overflow-hidden bg-zinc-100 z-0">
        <ImageBg data={data} className="w-full h-full" style={{ backgroundPosition: 'center 50%' }} />
      </div>
      <div className="absolute top-[30%] -right-16 w-56 h-56 rounded-full border-[10px] border-white/60 shadow-2xl overflow-hidden bg-zinc-100 z-0">
        <ImageBg data={data} className="w-full h-full" style={{ backgroundPosition: 'center 100%' }} />
      </div>
      <div className="absolute -bottom-20 right-4 w-64 h-64 rounded-full border-[12px] border-white/60 shadow-2xl overflow-hidden bg-zinc-100 z-0">
        <ImageBg data={data} className="w-full h-full" style={{ backgroundPosition: 'center 0%' }} />
      </div>
      <div className="absolute -bottom-10 left-10 w-32 h-32 rounded-full border-4 border-white/60 shadow-lg overflow-hidden bg-zinc-100 opacity-60 blur-[1px] z-0">
        <ImageBg data={data} className="w-full h-full" style={{ backgroundPosition: 'center 50%' }} />
      </div>

      <div className="absolute top-[40%] left-8 w-[70%] z-20">
        <SmartField field="titulo" {...sp} className="mb-6">
          <TextWrapper {...tw} as="h2" field="titulo" className="font-playfair font-medium leading-tight italic text-[#1a1a1a]" style={{ fontSize: `${36 * sTitle}px` }}>
            {slideData.titulo}
          </TextWrapper>
        </SmartField>
        
        <SmartField field="texto_apoio" {...sp}>
          <TextWrapper {...tw} as="p" field="texto_apoio" className="font-outfit leading-snug font-medium text-zinc-500" style={{ fontSize: `${14 * sText}px` }}>
            {slideData.texto_apoio}
          </TextWrapper>
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 45 — Vertical Mirror CTA
// Split vertical com CTA de arraste
// ═══════════════════════════════════════════════════════════
export function CoverVariant45(props) {
  const { data, index, brandColor, titleScale, onTextChange, showMetrics, onActionStart, selectedElement, onSelectElement, slideCount, brandHandle, brandAvatar, isVerified } = props;
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full relative overflow-hidden bg-zinc-100">
      <div className="grid grid-cols-2 w-full h-full gap-1 z-0">
        <div className="bg-zinc-800 overflow-hidden relative">
          <ImageBg data={data} className="absolute inset-0" />
        </div>
        <div className="bg-zinc-800 overflow-hidden relative">
          <ImageBg data={data} className="absolute inset-0" style={{ transform: 'scaleX(-1)' }} />
        </div>
      </div>

      <div className="absolute inset-0 z-30 pointer-events-none [&>*]:pointer-events-auto mix-blend-difference">
         <SlideHeader 
          {...props} 
          slideIndex={index} 
          index={index + 1} 
          total={slideCount} 
          brandHandle={brandHandle}
          brandAvatar={brandAvatar}
          brandColor={brandColor}
          isVerified={isVerified}
          showSlideCounter={false} 
          hideDot={true}
        />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-[24px] px-10 py-4 shadow-2xl border-2 border-white/20" style={{ backgroundColor: brandColor }}>
        <SmartField field="titulo" {...sp}>
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black text-white leading-none tracking-tighter text-center uppercase outline-none break-words"
            style={{ fontSize: `${32 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-zinc-900/90 backdrop-blur px-8 py-2.5 rounded-full shadow-2xl z-10 flex items-center gap-3 border border-zinc-700 w-max whitespace-nowrap">
        <SmartField field="cta_text" {...sp} className="whitespace-nowrap">
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)}
            className="text-white font-outfit font-bold text-[10px] tracking-widest uppercase outline-none whitespace-nowrap inline-block -translate-y-[3px]"
          >
            {data.cta_text || 'Arraste para o lado e descubra'}
          </span>
        </SmartField>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 46 — Horizontal Mirror CTA
// Split horizontal com CTA de arraste
// ═══════════════════════════════════════════════════════════
export function CoverVariant46(props) {
  const { data, index, brandColor, titleScale, onTextChange, showMetrics, onActionStart, selectedElement, onSelectElement, slideCount, brandHandle, brandAvatar, isVerified } = props;
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full relative overflow-hidden bg-zinc-100">
      <div className="grid grid-rows-2 w-full h-full gap-1 z-0">
        <div className="bg-zinc-800 overflow-hidden relative">
          <ImageBg data={data} className="absolute inset-0" />
        </div>
        <div className="bg-zinc-800 overflow-hidden relative">
          <ImageBg data={data} className="absolute inset-0" style={{ transform: 'scaleY(-1)' }} />
        </div>
      </div>

      <div className="absolute inset-0 z-30 pointer-events-none [&>*]:pointer-events-auto mix-blend-difference">
         <SlideHeader 
          {...props} 
          slideIndex={index} 
          index={index + 1} 
          total={slideCount} 
          brandHandle={brandHandle}
          brandAvatar={brandAvatar}
          brandColor={brandColor}
          isVerified={isVerified}
          showSlideCounter={false} 
          hideDot={true}
        />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-[24px] px-10 py-4 shadow-2xl border-2 border-white/20" style={{ backgroundColor: brandColor }}>
        <SmartField field="titulo" {...sp}>
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black text-white leading-none tracking-tighter text-center uppercase outline-none break-words"
            style={{ fontSize: `${32 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-zinc-900/90 backdrop-blur px-8 py-2.5 rounded-full shadow-2xl z-10 flex items-center gap-3 border border-zinc-700 w-max whitespace-nowrap">
        <SmartField field="cta_text" {...sp} className="whitespace-nowrap">
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'cta_text', e.currentTarget.innerText)}
            className="text-white font-outfit font-bold text-[10px] tracking-widest uppercase outline-none whitespace-nowrap inline-block -translate-y-[3px]"
          >
            {data.cta_text || 'Arraste para o lado e descubra'}
          </span>
        </SmartField>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </div>
    </div>
  );
}

export const COVER_VARIANT_COMPONENTS = {
  1: CoverVariant1,
  2: CoverVariant2,
  3: CoverVariant3,
  4: CoverVariant4,
  5: CoverVariant5,
  6: CoverVariant6,
  7: CoverVariant7,
  8: CoverVariant8,
  9: CoverVariant9,
  10: CoverVariant10,
  11: CoverVariant11,
  12: CoverVariant12,
  13: CoverVariant13,
  14: CoverVariant14,
  15: CoverVariant15,
  16: CoverVariant16,
  17: CoverVariant17,
  18: CoverVariant18,
  19: CoverVariant19,
  20: CoverVariant20,
  21: CoverVariant21,
  22: CoverVariant22,
  23: CoverVariant23,
  24: CoverVariant24,
  25: CoverVariant25,
  26: CoverVariant26,
  27: CoverVariant27,
  28: CoverVariant28,
  29: CoverVariant29,
  30: CoverVariant30,
  31: CoverVariant31,
  32: CoverVariant32,
  33: CoverVariant33,
  34: CoverVariant34,
  35: CoverVariant35,
  36: CoverVariant36,
  37: CoverVariant37,
  38: CoverVariant38,
  39: CoverVariant39,
  40: CoverVariant40,
  41: CoverVariant41,
  42: CoverVariant42,
  43: CoverVariant43,
  44: CoverVariant44,
  45: CoverVariant45,
  46: CoverVariant46,
};

export const COVER_VARIANT_META = [
  { id: 0, name: 'Original', description: 'Layout padrão' },
  { id: 1, name: 'Color Split', description: 'Imagem + bloco de cor' },
  { id: 2, name: 'Cinemático', description: 'Full-bleed com gradient' },
  { id: 3, name: 'Blur Editorial', description: 'Fundo blur + barra de acento' },
  { id: 4, name: 'Moldura', description: 'Estilo editorial emoldurado' },
  { id: 5, name: 'Rounded Split', description: 'Bloco arredondado de cor' },
  { id: 6, name: 'Arco', description: 'Imagem em arco + texto central' },
  { id: 7, name: 'Polaroid', description: 'Card estilo foto instantânea' },
  { id: 8, name: 'Acento Lateral', description: 'Borda lateral colorida' },
  { id: 9, name: 'Spotlight', description: 'Card branco com watermark' },
  { id: 10, name: 'Bottom Minimal', description: 'Texto inferior minimalista' },
  { id: 11, name: 'Luxury Frame', description: 'Moldura branca com sombra profunda' },
  { id: 12, name: 'Diagonal Slice', description: 'Corte diagonal dinâmico' },
  { id: 13, name: 'Bold Overlay', description: 'Título com mix-blend e badge' },
  { id: 14, name: 'Top Block', description: 'Bloco de cor superior e imagem' },
  { id: 15, name: 'Center Card', description: 'Imagem superior e card central' },
  { id: 16, name: 'Bottom Gradient', description: 'Imagem full com gradient colorido' },
  { id: 17, name: 'Minimal Side', description: 'Divisão lateral limpa' },
  { id: 18, name: 'Glassmorphism Center', description: 'Card com blur sobre glow' },
  { id: 19, name: 'Arch Featured', description: 'Imagem em arco com badge' },
  { id: 20, name: 'Rotating Polaroid', description: 'Polaroid com padrão radial' },
  { id: 21, name: 'Diagonal Edge', description: 'Corte diagonal com título gigante' },
  { id: 22, name: 'Header Minimal', description: 'Título uppercase com glow lateral' },
  { id: 23, name: 'Vertical Split', description: 'Split vertical com handle rotacionado' },
  { id: 24, name: 'Grid Process', description: 'Estilo técnico com grid e badge' },
  { id: 25, name: 'Frosted Float', description: 'Card flutuante com blur intenso' },
  { id: 26, name: 'Overlay Volume', description: 'Bloco superior blend sobre imagem' },
  { id: 27, name: 'Slanted New', description: 'Recorte diagonal com ícone Sparkles' },
  { id: 28, name: 'Right Image Text Left', description: 'Imagem à direita com texto à esquerda' },
  { id: 29, name: 'Framed Left Image', description: 'Imagem emoldurada com tags à direita' },
  { id: 30, name: 'Social Icons Overlay', description: 'Layout com barra de ícones de redes sociais' },
  { id: 31, name: 'List Bullet Stars', description: 'Imagem com lista de destaques' },
  { id: 32, name: 'Repeated Text Background', description: 'Fundo com texto repetido e card inferior' },
  { id: 33, name: 'Gradient Footer', description: 'Imagem superior com rodapé colorido e divisória' },
  { id: 34, name: 'Center Focus', description: 'Fundo escuro com texto centralizado e header' },
  { id: 35, name: 'Curve Card', description: 'Card branco inferior com topo arredondado' },
  { id: 36, name: 'Magazine Split', description: 'Texto à esquerda e imagem à direita estilo revista' },
  { id: 37, name: 'Modern Frame', description: 'Fundo colorido com card de imagem central' },
  { id: 38, name: 'Gradient Bottom', description: 'Imagem full com gradient e tags inferiores' },
  { id: 39, name: 'Side Strip', description: 'Imagem lateral com faixa de marca vertical' },
  { id: 40, name: 'Floating Card Center', description: 'Imagem superior e card flutuante centralizado' },
  { id: 41, name: 'Slanted Banner', description: 'Faixa diagonal sobre imagem grayscale' },
  { id: 42, name: 'Upper Frame Title', description: 'Título superior emoldurado e rodapé branco minimalista' },
  { id: 43, name: 'Repeat Text Focus', description: 'Texto repetido ao fundo com card de imagem central' },
  { id: 44, name: 'Floating Bubbles', description: 'Bolhas flutuantes com imagem e texto lateral elegante' },
  { id: 45, name: 'Vertical Mirror CTA', description: 'Split vertical com CTA de arraste' },
  { id: 46, name: 'Horizontal Mirror CTA', description: 'Split horizontal com CTA de arraste' },
];





