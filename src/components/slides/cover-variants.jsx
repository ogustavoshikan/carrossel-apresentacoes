import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import SmartElement from '../smart-element';

// ============================================================
// ALICE STUDIO — COVER VARIANTS (1-10)
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
        <div className="absolute -top-32 left-10">
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
          <div className="w-20 h-[3px] bg-white/50 mb-8" />
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

      <BrandTag brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} />

      <div className="relative z-10 flex-1 flex flex-col justify-end p-10 pb-16">
        <div className="mb-6">
          <span
            className="text-[10px] font-outfit font-black tracking-[0.4em] uppercase"
            style={{ color: brandColor }}
          >
            ALICE V3.2
          </span>
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

      <BrandTag brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} />

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
      <div className="flex-1 border-[12px] border-white bg-black relative flex flex-col overflow-hidden">
        <ImageBg data={data} className="absolute inset-0 opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />

        <BrandTag brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} />

        <div className="relative z-10 px-10 pb-10 pt-24 flex-1 flex flex-col justify-between items-center text-center">
          <div>
            <span className="px-4 py-1.5 bg-white text-black font-outfit font-black text-[10px] tracking-[0.4em] uppercase inline-block">
              EDITORIAL
            </span>
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
        <BrandTag brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} />
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
export function CoverVariant6({ data, index, brandColor, brandHandle, showBrandHandle, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#050505] flex flex-col overflow-hidden p-8 pt-20">
      <BrandTag brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} />

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
export function CoverVariant7({ data, index, brandColor, brandHandle, showBrandHandle, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-zinc-950 flex flex-col p-10 overflow-hidden items-center justify-center">
      <ImageBg data={data} className="absolute inset-0 opacity-20 blur-xl scale-110" />

      <BrandTag brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} />

      {/* Polaroid Card */}
      <div className="w-[85%] aspect-[3/4] bg-white p-4 rounded-xl shadow-2xl rotate-[-4deg] relative z-10 flex flex-col">
        <ImageBg
          data={data}
          className="w-full flex-1 rounded-md"
          style={{ backgroundSize: 'cover' }}
        />
        <div className="h-16 w-full flex items-center justify-center">
          <span className="font-playfair italic text-black/40 text-xs">Fig 01. The Approach</span>
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
          <span
            className="inline-block px-4 py-2 bg-black text-white font-outfit font-black text-[10px] tracking-widest uppercase border border-white/20 rounded-md"
            style={{ color: brandColor }}
          >
            NEW INSIGHT
          </span>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 8 — Acento Lateral
// Texto centrado com borda lateral colorida
// ═══════════════════════════════════════════════════════════
export function CoverVariant8({ data, index, brandColor, brandHandle, showBrandHandle, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden p-10 justify-center">
      <ImageBg data={data} className="absolute inset-0 opacity-30 blur-lg scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />

      <BrandTag brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} />

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
export function CoverVariant9({ data, index, brandColor, brandHandle, showBrandHandle, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
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

      <BrandTag brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} />

      {/* White Card */}
      <div
        className="relative z-10 bg-white text-black p-10 rounded-[2rem] w-full overflow-hidden border-2"
        style={{ borderColor: brandColor, boxShadow: `0 30px 60px ${brandColor}33` }}
      >
        <ImageBg data={data} className="absolute inset-0 opacity-15" />

        <div className="relative z-10">
          <div className="mb-6">
            <span
              className="font-outfit font-black text-[12px] uppercase tracking-widest"
              style={{ color: brandColor }}
            >
              DESTAQUE
            </span>
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
export function CoverVariant10({ data, index, brandColor, brandHandle, showBrandHandle, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement }) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#050505] flex flex-col overflow-hidden">
      <ImageBg data={data} className="absolute inset-0 opacity-40 blur-md scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

      <BrandTag brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandAvatar={brandAvatar} brandColor={brandColor} />

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
// REGISTRO DE VARIANTES
// ═══════════════════════════════════════════════════════════

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
];

