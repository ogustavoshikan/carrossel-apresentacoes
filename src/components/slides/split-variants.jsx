import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import SmartElement from '../smart-element';
import SlideHeader, { SlideFooterPlaceholder } from '../slide-header';

// ============================================================
// ALICE STUDIO — SPLIT VARIANTS (1-5)
// Cada variante recebe as mesmas props do SlideContentSplit e
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

// ═══════════════════════════════════════════════════════════
// VARIANTE 1 — Hero Top
// Imagem arredondada no topo + tag + título + texto abaixo.
// Inspirado no layout do arquivo original (Variante 1).
// ═══════════════════════════════════════════════════════════
export function SplitVariant1({
  data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified,
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
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor}
        isVerified={isVerified}
        showSlideCounter={showSlideCounter}
        slideCounterPosition={slideCounterPosition}

              />

      <div className="flex-1 flex flex-col justify-center pt-8 overflow-hidden">
        {/* Imagem arredondada */}
        <SmartField field="imagem" {...sp}
          className="relative w-full h-48 shrink-0 rounded-[2rem] overflow-hidden mb-4 ring-1 ring-white/10 shadow-2xl"
        >
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>

        {/* Tag + título + texto */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 mb-2 shrink-0">
            <div className="h-[2px] w-8" style={{ backgroundColor: brandColor }} />
            <SmartField field="tag" {...sp}>
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
                className="font-outfit font-bold text-[11px] tracking-[0.4em] uppercase outline-none"
                style={{ color: brandColor }}
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
              className="font-outfit font-black text-white tracking-tighter outline-none"
              style={{ fontSize: `${28 * sTitle}px`, lineHeight: 1.1 }}
            >
              {data.titulo}
            </h2>
          </SmartField>

          <SmartField field="texto_apoio" {...sp} className="min-h-0 overflow-hidden">
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-playfair text-zinc-400 outline-none leading-relaxed line-clamp-4"
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
export function SplitVariant2({
  data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified,
  titleScale, textScale, showMetrics, onActionStart, onTextChange,
  selectedElement, onSelectElement, showSlideCounter, slideCounterPosition,
}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full bg-[#050505] flex relative overflow-hidden">
      {/* Imagem lateral esquerda */}
      <SmartField field="imagem" {...sp}
        className="w-[45%] h-full relative border-r border-white/10 shadow-[20px_0_40px_rgba(0,0,0,0.5)] z-10"
      >
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>

      {/* Conteúdo direito */}
      <div className="w-[55%] h-full p-10 flex flex-col justify-center relative z-0">
        <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
          index={index + 1}
          total={slideCount}
          brandHandle={brandHandle} showBrandHandle={showBrandHandle}
          brandColor={brandColor}
          isVerified={isVerified}
          showSlideCounter={showSlideCounter}
          slideCounterPosition={slideCounterPosition}

              />

        <div className="mb-6 mt-10">
          <SmartField field="tag" {...sp}>
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="px-3 py-1 bg-white/5 border border-white/10 rounded font-outfit text-[10px] tracking-widest text-zinc-400 outline-none inline-block"
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
            className="font-outfit font-black text-white leading-[1.1] outline-none break-words"
            style={{ fontSize: `${28 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>

        <SmartField field="texto_apoio" {...sp}>
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-playfair text-zinc-400 outline-none leading-relaxed"
            style={{ fontSize: `${14 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 3 — Text Top
// Conteúdo de texto na metade superior + imagem na inferior.
// Inspirado no layout do arquivo original (Variante 3).
// ═══════════════════════════════════════════════════════════
export function SplitVariant3({
  data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified,
  titleScale, textScale, showMetrics, onActionStart, onTextChange,
  selectedElement, onSelectElement, showSlideCounter, slideCounterPosition,
}) {
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
        showSlideCounter={showSlideCounter}
        slideCounterPosition={slideCounterPosition}

              />

      {/* Bloco superior: texto */}
      <div className="w-full h-1/2 p-10 pt-24 flex flex-col justify-center border-b border-white/10 shrink-0">
        <SmartField field="tag" {...sp} className="mb-4">
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            className="font-outfit font-bold text-[10px] tracking-[0.4em] uppercase outline-none"
            style={{ color: brandColor }}
          >
            {data.tag || 'TAG'}
          </span>
        </SmartField>

        <SmartField field="titulo" {...sp} className="mb-4">
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black text-white tracking-tighter leading-tight outline-none break-words"
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
            className="font-playfair text-zinc-400 outline-none"
            style={{ fontSize: `${14 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>

      {/* Bloco inferior: imagem */}
      <SmartField field="imagem" {...sp} className="w-full h-1/2 relative shrink-0">
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 4 — Bento Grid
// Grid 2×3 com card título (topo), card imagem e card texto.
// Inspirado no layout do arquivo original (Variante 4).
// ═══════════════════════════════════════════════════════════
export function SplitVariant4({
  data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified,
  titleScale, textScale, showMetrics, onActionStart, onTextChange,
  selectedElement, onSelectElement, showSlideCounter, slideCounterPosition,
}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col p-8 relative overflow-hidden">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1}
        total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor}
        isVerified={isVerified}
        showSlideCounter={showSlideCounter}
        slideCounterPosition={slideCounterPosition}

              />

      <div className="flex-1 grid grid-cols-2 grid-rows-3 gap-4 pt-12 overflow-hidden">
        {/* Card Titulo — topo full width */}
        <div className="col-span-2 row-span-1 bg-[#0A0A0A] rounded-3xl p-6 border border-white/5 flex flex-col justify-center">
          <SmartField field="tag" {...sp} className="mb-2">
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="font-outfit font-black text-[9px] uppercase tracking-widest text-zinc-500 outline-none"
            >
              {data.tag || 'TAG'}
            </span>
          </SmartField>

          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-outfit font-black text-white leading-tight outline-none break-words"
              style={{ fontSize: `${24 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>

        {/* Card Imagem */}
        <SmartField field="imagem" {...sp}
          className="col-span-1 row-span-2 rounded-3xl overflow-hidden relative shadow-inner border border-white/10"
        >
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>

        {/* Card Texto */}
        <div
          className="col-span-1 row-span-2 rounded-3xl p-6 border border-white/5 flex flex-col justify-center"
          style={{ background: `linear-gradient(to bottom, #0A0A0A, #000)` }}
        >
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-playfair italic text-zinc-400 outline-none leading-relaxed"
              style={{ fontSize: `${13 * sText}px` }}
            >
              {data.texto_apoio}
            </p>
          </SmartField>

          <div
            className="mt-4 w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: brandColor }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M7 7h10v10" /><path d="M7 17 17 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 5 — Brutalist
// Estilo brutalista: bordas grossas, alto contraste, preto/cinza.
// Inspirado no layout do arquivo original (Variante 5).
// ═══════════════════════════════════════════════════════════
export function SplitVariant5({
  data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified,
  titleScale, textScale, showMetrics, onActionStart, onTextChange,
  selectedElement, onSelectElement, showSlideCounter, slideCounterPosition,
}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full bg-[#E5E5E5] flex flex-col overflow-hidden text-black border-8 border-black">
      {/* Bloco superior: título */}
      <div className="h-1/2 w-full bg-black p-8 text-white relative flex flex-col justify-end border-b-8 border-black">
        <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
          index={index + 1}
          total={slideCount}
          brandHandle={brandHandle} showBrandHandle={showBrandHandle}
          brandColor={brandColor}
          isVerified={isVerified}
          showSlideCounter={showSlideCounter}
          slideCounterPosition={slideCounterPosition}

              />

        <div className="absolute top-8 right-8">
          <SmartField field="tag" {...sp}>
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="font-mono font-bold text-xs bg-white text-black px-2 py-1 uppercase outline-none inline-block"
            >
              {data.tag || 'TAG'}
            </span>
          </SmartField>
        </div>

        <SmartField field="titulo" {...sp}>
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black tracking-tighter leading-none outline-none break-words"
            style={{ fontSize: `${42 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>
      </div>

      {/* Bloco inferior: texto + imagem */}
      <div className="h-1/2 w-full flex relative">
        <div className="w-1/2 p-6 flex flex-col justify-center border-r-8 border-black">
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-outfit font-bold text-black outline-none text-sm leading-snug"
              style={{ fontSize: `${12 * sText}px` }}
            >
              {data.texto_apoio}
            </p>
          </SmartField>
        </div>

        <SmartField field="imagem" {...sp}
          className="w-1/2 relative border-l-8 border-black overflow-hidden"
        >
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 7 — Fashion Overlap
// Card de texto central com imagem circular pequena sobreposta
// ═══════════════════════════════════════════════════════════
export function SplitVariant7(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full bg-[#0A0A0A] flex flex-col p-10 justify-center items-center relative overflow-hidden">
      <SlideHeader {...props} index={index + 1} total={slideCount} />
      
      <div className="relative w-full max-w-[440px] mt-12">
        {/* Card Principal */}
        <div className="bg-white rounded-[2.5rem] p-12 shadow-2xl relative z-0">
          <SmartField field="tag" {...sp} className="mb-6">
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="font-outfit font-black text-[10px] tracking-[0.3em] uppercase outline-none px-4 py-1.5 rounded-full border"
              style={{ color: brandColor, borderColor: `${brandColor}40` }}
            >
              {data.tag || 'EXCLUSIVE'}
            </span>
          </SmartField>

          <SmartField field="titulo" {...sp} className="mb-6">
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-playfair font-bold text-zinc-900 leading-tight outline-none italic break-words"
              style={{ fontSize: `${32 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>

          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-outfit font-medium text-zinc-500 text-sm leading-relaxed outline-none"
              style={{ fontSize: `${14 * sText}px` }}
            >
              {data.texto_apoio}
            </p>
          </SmartField>
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full p-6 flex flex-col overflow-hidden bg-[#FAFAFA]">
      <SlideHeader {...props} index={index + 1} total={slideCount} />
      
      <SmartField field="imagem" {...sp} className="w-full h-[40%] rounded-2xl overflow-hidden shadow-lg mb-6 shrink-0 bg-zinc-300 relative border border-black/5 mt-4">
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-start gap-4 mb-4 shrink-0">
          <SmartField field="tag" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="text-white font-outfit font-bold px-2 py-0.5 rounded text-[11px] shrink-0 outline-none uppercase tracking-wide"
              style={{ backgroundColor: brandColor }}
            >
              {data.tag || 'TAG'}
            </span>
          </SmartField>
          
          <SmartField field="titulo" {...sp} className="flex-1 min-w-0">
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-outfit font-black text-[#1a1a1a] tracking-tight leading-[1.1] outline-none break-words"
              style={{ fontSize: `${24 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
        </div>
        
        <SmartField field="texto_apoio" {...sp} className="flex-1 overflow-hidden">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-playfair text-zinc-700 leading-snug outline-none line-clamp-6"
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
// VARIANTE 9 — Circle Top 
// Imagem oval superior com container glassmorphism logo abaixo
// ═══════════════════════════════════════════════════════════
export function SplitVariant9(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full p-6 flex flex-col overflow-hidden relative bg-[#F4F4F5]">
      <SlideHeader {...props} index={index + 1} total={slideCount} />
      
      <SmartField field="imagem" {...sp} className="w-[85%] h-[40%] mx-auto mt-6 rounded-[5rem] overflow-hidden shadow-2xl mb-8 shrink-0 bg-zinc-300 relative border-4 border-white">
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
      
      <div className="flex-1 flex flex-col items-center text-center min-h-0 bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
        <SmartField field="titulo" {...sp} className="w-full shrink-0 mb-3">
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black tracking-tight leading-[1.1] outline-none break-words"
            style={{ color: brandColor, fontSize: `${22 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>
        
        <SmartField field="texto_apoio" {...sp} className="w-full flex-1 overflow-hidden">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-playfair text-zinc-700 leading-snug outline-none line-clamp-5"
            style={{ fontSize: `${14 * sText}px` }}
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  
  return (
    <div className="w-full h-full p-6 flex flex-col overflow-hidden bg-[#E8E8E8] relative">
      <SlideHeader {...props} index={index + 1} total={slideCount} />
      
      <div className="w-[90%] mx-auto bg-white p-3 shadow-xl flex flex-col shrink-0 mb-8 mt-4 rotate-[-2deg] border border-black/5 z-10">
        <SmartField field="imagem" {...sp} className="w-full aspect-square relative mb-3 overflow-hidden bg-zinc-200">
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>
        
        <div className="flex justify-between items-center px-2">
          <SmartField field="tag" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="font-outfit font-bold text-zinc-400 text-[10px] tracking-widest uppercase outline-none"
            >
              {data.tag || `VOL. 0${index + 1}`}
            </span>
          </SmartField>
          
          <svg className="w-3 h-3" style={{ color: brandColor }} fill="currentColor" viewBox="0 0 24 24">
             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col min-h-0 px-4 mt-2">
        <SmartField field="titulo" {...sp} className="shrink-0 mb-3">
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black text-[#1a1a1a] tracking-tight leading-[1.1] outline-none break-words"
            style={{ fontSize: `${26 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>
        <SmartField field="texto_apoio" {...sp} className="flex-1 overflow-hidden">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-playfair text-zinc-600 leading-relaxed italic outline-none line-clamp-5"
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full p-6 flex flex-col overflow-hidden relative bg-[#FAFAFA]">
      <SlideHeader {...props} index={index + 1} total={slideCount} />
      
      <SmartField field="imagem" {...sp} className="w-full h-[50%] shrink-0 relative border border-black/5 mt-4">
         <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
      
      <div className="flex-1 flex flex-col min-h-0 bg-white p-6 rounded-tr-[2.5rem] -mt-10 relative z-10 shadow-[0_-15px_30px_rgba(0,0,0,0.06)] border-t border-r border-white">
        <div className="flex items-center gap-2 mb-3 mt-1 shrink-0">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: brandColor }} />
          <SmartField field="tag" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="font-outfit font-bold text-xs text-zinc-400 tracking-wider uppercase outline-none"
            >
              {data.tag || 'TAG'}
            </span>
          </SmartField>
        </div>
        
        <SmartField field="titulo" {...sp} className="mb-3 shrink-0">
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black text-[#1a1a1a] leading-[1.1] outline-none break-words"
            style={{ fontSize: `${24 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>
        
        <SmartField field="texto_apoio" {...sp} className="flex-1 overflow-hidden">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-playfair text-zinc-600 leading-snug outline-none line-clamp-4"
            style={{ fontSize: `${14 * sText}px` }}
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full p-6 flex flex-col overflow-hidden items-center text-white" style={{ backgroundColor: brandColor }}>
      <SlideHeader {...props} index={index + 1} total={slideCount} />
      
      <SmartField field="titulo" {...sp} className="mt-8 mb-6 w-full shrink-0">
        <h2
          contentEditable suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
          className="font-outfit font-black leading-tight outline-none break-words text-center"
          style={{ fontSize: `${28 * sTitle}px` }}
        >
          {data.titulo}
        </h2>
      </SmartField>
      
      <SmartField field="imagem" {...sp} className="w-48 h-48 rounded-full overflow-hidden shrink-0 border-4 border-white/20 relative mb-6 shadow-2xl">
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
      
      <SmartField field="texto_apoio" {...sp} className="flex-1 min-h-0 w-full">
        <p
          contentEditable suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
          className="font-playfair text-white/80 leading-snug outline-none line-clamp-5 text-center"
          style={{ fontSize: `${15 * sText}px` }}
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

export const SPLIT_VARIANT_COMPONENTS = {
  1: SplitVariant1,
  2: SplitVariant2,
  3: SplitVariant3,
  4: SplitVariant4,
  5: SplitVariant5,
  7: SplitVariant7,
  8: SplitVariant8,
  9: SplitVariant9,
  10: SplitVariant10,
  11: SplitVariant11,
  12: SplitVariant12,
};

export const SPLIT_VARIANT_META = [
  { id: 0, name: 'Original', description: 'Layout padrão com imagem arredondada' },
  { id: 1, name: 'Hero Top', description: 'Imagem grande superior + texto abaixo' },
  { id: 2, name: 'Side Split', description: 'Imagem lateral + texto na direita' },
  { id: 3, name: 'Text Top', description: 'Texto superior + imagem inferior' },
  { id: 4, name: 'Bento Grid', description: 'Grid bento com três células' },
  { id: 5, name: 'Brutalist', description: 'Estilo brutalista com bordas grossas' },
  { id: 7, name: 'Fashion Overlap', description: 'Card branco com foto circular sobreposta' },
  { id: 8, name: 'Image Top Split', description: 'Imagem superior rounded + header + conteúdo horizontal' },
  { id: 9, name: 'Circle Top', description: 'Imagem oval superior com container glassmorphism logo abaixo' },
  { id: 10, name: 'Polaroid Tilt', description: 'Layout minimalista com estilo polaroid inclinada' },
  { id: 11, name: 'Overlap Card', description: 'Imagem de fundo com card de texto subindo e sobrepondo' },
  { id: 12, name: 'Dark Centered', description: 'Layout centralizado com círculo e foco na cor da marca' },
];


