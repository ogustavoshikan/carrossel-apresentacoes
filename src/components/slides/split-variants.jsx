import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import SmartElement from '../smart-element';
import SlideHeader, { SlideFooterPlaceholder } from '../slide-header';

// ============================================================
// CARROSSEL STUDIO — SPLIT VARIANTS (1-5)
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
// Aceita props explícitas (imageUrl, imagePosition, imageScale) ou
// faz fallback para data.imageUrl para compatibilidade retroativa.
function ImageBg({ data, imageUrl, imagePosition, imageScale, className = '', style = {}, children }) {
  const url = imageUrl !== undefined ? imageUrl : data?.imageUrl;
  const pos = imagePosition !== undefined ? imagePosition : (data?.imagePosition ?? 50);
  const scale = imageScale !== undefined ? imageScale : (data?.imageScale ?? 1);

  if (url) {
    return (
      <div
        className={`bg-cover ${className}`}
        style={{
          backgroundImage: `url(${url})`,
          backgroundPosition: `center ${pos}%`,
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
export function SplitVariant1({
  data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
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
        brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter}
        slideCounterPosition={slideCounterPosition}
        hideDot={true}
      />

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
            <div className="h-[2px] w-8" style={{ backgroundColor: brandColor }} />
            <SmartField field="tag" {...sp}>
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
                className="inline-block font-outfit font-bold text-[11px] tracking-[0.4em] uppercase outline-none -translate-y-[2px]"
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

          <SmartField field="texto_apoio" {...sp} className="min-h-0">
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-playfair text-zinc-400 outline-none leading-relaxed line-clamp-8"
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
  data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
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
          brandHandle={brandHandle} showBrandHandle={false}
          brandColor={brandColor}
          isVerified={isVerified}
          brandAvatar={brandAvatar}
          showSlideCounter={showSlideCounter}
          slideCounterPosition={slideCounterPosition}
        hideDot={true}
      />

        <div className="mb-6 mt-10">
          <SmartField field="tag" {...sp}>
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="px-3 py-1 bg-surface-input/30 border border-white/10 rounded font-outfit text-[10px] tracking-widest text-zinc-400 outline-none inline-block"
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
  data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
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
        brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter}
        slideCounterPosition={slideCounterPosition}
        hideDot={true}
      />

      {/* Bloco superior: texto */}
      <div className="w-full h-1/2 p-10 pt-24 flex flex-col justify-center border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2 mb-4 shrink-0">
          <div className="h-[2px] min-h-[2px] w-8 shrink-0" style={{ backgroundColor: brandColor }} />
          <SmartField field="tag" {...sp}>
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="inline-block font-outfit font-bold text-[10px] tracking-[0.4em] uppercase outline-none -translate-y-[2px]"
              style={{ color: brandColor }}
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
  data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
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
        brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter}
        slideCounterPosition={slideCounterPosition}
        hideDot={true}
      />

      <div className="flex-1 grid grid-cols-2 grid-rows-3 gap-4 pt-12">
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
  data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
  titleScale, textScale, showMetrics, onActionStart, onTextChange,
  selectedElement, onSelectElement, showSlideCounter, slideCounterPosition,
}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full bg-[#E5E5E5] relative overflow-hidden text-black">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1}
        total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor}
        isVerified={isVerified}
        brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter}
        slideCounterPosition={slideCounterPosition}
        hideDot={true}
      />

      {/* Bloco superior: título */}
      <div className="absolute inset-0 flex flex-col border-8 border-black z-0 pointer-events-none [&>*]:pointer-events-auto">
      <div className="h-1/2 w-full bg-black p-8 text-white relative flex flex-col justify-end border-b-8 border-black">

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
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 7 — Fashion Overlap
// Card de texto central com imagem circular pequena sobreposta
// ═══════════════════════════════════════════════════════════
export function SplitVariant7(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full p-6 flex flex-col overflow-hidden bg-[#FAFAFA] relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} counterBg="#EDEDED" brandAvatar={brandAvatar}
        hideDot={true}
      />
      
      <div className="w-full shrink-0" style={{ height: '13px' }} />
      <SmartField field="imagem" {...sp} className="w-full h-[40%] rounded-2xl overflow-hidden shadow-lg mb-6 shrink-0 bg-zinc-300 relative border border-black/5 mt-4">
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center gap-4 mb-4 shrink-0">
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
        
        <SmartField field="texto_apoio" {...sp} className="flex-1 min-h-0">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-playfair text-zinc-700 leading-snug outline-none"
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
// VARIANTE 9 — Circle Top 
// Imagem oval superior com container glassmorphism logo abaixo
// ═══════════════════════════════════════════════════════════
export function SplitVariant9(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full p-6 flex flex-col overflow-hidden relative bg-[#F4F4F5]">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} counterBg="#EDEDED" brandAvatar={brandAvatar}
        hideDot={true}
      />
      
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
        
        <SmartField field="texto_apoio" {...sp} className="w-full flex-1 min-h-0">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-playfair text-zinc-700 leading-snug outline-none"
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  
  return (
    <div className="w-full h-full p-6 flex flex-col overflow-hidden bg-[#E8E8E8] relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} counterBg="#EDEDED" brandAvatar={brandAvatar}
        hideDot={true}
      />
      
      <div className="w-[82%] mx-auto bg-white p-3 shadow-xl flex flex-col shrink-0 mb-4 mt-8 rotate-[-2deg] border border-black/5 z-10">
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
      
      <div className="flex-1 flex flex-col min-h-0 px-4 -mt-1">
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
        <SmartField field="texto_apoio" {...sp} className="flex-1">
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full p-6 flex flex-col overflow-hidden relative bg-[#FAFAFA]">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} counterBg="#EDEDED" brandAvatar={brandAvatar}
        hideDot={true}
      />
      
      <div className="w-full shrink-0" style={{ height: '13px' }} />
      <SmartField field="imagem" {...sp} className="w-full h-[50%] shrink-0 relative z-0 border border-black/5 mt-4">
         <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
      
      <div className="flex-1 flex flex-col min-h-0 bg-white p-6 rounded-tr-[2.5rem] -mt-10 relative z-[70] shadow-[0_-15px_30px_rgba(0,0,0,0.06)] border-t border-r border-white">
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
        
        <SmartField field="texto_apoio" {...sp} className="flex-1 min-h-0">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-playfair text-zinc-600 leading-snug outline-none"
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full p-6 flex flex-col overflow-hidden items-center text-white relative" style={{ backgroundColor: brandColor }}>
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} brandAvatar={brandAvatar}
        hideDot={true}
      />
      
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
          className="font-playfair text-white/80 leading-snug outline-none text-center"
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full relative overflow-hidden bg-white">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} counterBg="#EDEDED" brandAvatar={brandAvatar}
        hideDot={true}
      />
      <div className="absolute inset-0 p-6 flex flex-col border-8" style={{ borderColor: brandColor }}>
        <div className="flex justify-between items-end mb-4 shrink-0 mt-[26px]">
          <SmartField field="titulo" {...sp} className="flex-1 min-w-0">
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black text-[#1a1a1a] leading-tight outline-none break-words"
            style={{ fontSize: `${26 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>
        
        <SmartField field="tag" {...sp} className="ml-4 shrink-0">
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            className="font-outfit font-black text-3xl opacity-20 uppercase outline-none"
            style={{ color: brandColor }}
          >
            {data.tag || 'TAG'}
          </span>
        </SmartField>
      </div>
      
      <SmartField field="imagem" {...sp} className="w-full h-[35%] shrink-0 relative mb-4 border border-zinc-300 bg-zinc-300 overflow-hidden">
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
      
      <SmartField field="texto_apoio" {...sp} className="flex-1 min-h-0">
        <p
          contentEditable suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
          className="font-playfair text-zinc-800 leading-relaxed font-medium outline-none"
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
// VARIANTE 14 — Floating Image Offset
// Container flutuante offset com imagem estendida estilo magazine.
// ═══════════════════════════════════════════════════════════
export function SplitVariant14(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full p-6 pt-12 flex flex-col relative overflow-hidden bg-[#FAFAFA]">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} className="relative z-20" counterBg="#EDEDED" brandAvatar={brandAvatar}
        hideDot={true}
      />
      
      <SmartField field="imagem" {...sp} className="w-[85%] h-[45%] bg-zinc-300 absolute top-20 right-6 rounded-3xl overflow-hidden shadow-xl border-4 border-white z-0 mt-2">
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
      
      <div className="relative z-10 mt-[70%] bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl w-[90%] border border-white/50 flex flex-col shrink-0 flex-1 min-h-0 mb-6">
        <SmartField field="tag" {...sp} className="mb-2 shrink-0">
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            className="font-outfit font-black text-[10px] uppercase tracking-widest outline-none"
            style={{ color: brandColor }}
          >
            {data.tag || 'TAG'}
          </span>
        </SmartField>
        
        <SmartField field="titulo" {...sp} className="mb-2 shrink-0 min-w-0">
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black text-[#1a1a1a] leading-tight outline-none break-words"
            style={{ fontSize: `${22 * sTitle}px` }}
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
// VARIANTE 15 — Arch Top View
// Header arredondado de formato longo + texto centralizado.
// ═══════════════════════════════════════════════════════════
export function SplitVariant15(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full p-6 flex flex-col overflow-hidden bg-[#FAFAFA] relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} counterBg="#EDEDED" brandAvatar={brandAvatar}
        hideDot={true}
      />
      
      <SmartField field="imagem" {...sp} className="w-full h-[45%] bg-zinc-300 rounded-t-[100px] rounded-b-xl overflow-hidden shadow-lg mb-6 mt-[26px] relative shrink-0">
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
      
      <div className="flex-1 flex flex-col items-center text-center min-h-0 pt-[10px]">
        <SmartField field="tag" {...sp} className="mb-2 shrink-0">
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            className="font-outfit text-[10px] font-bold tracking-widest uppercase outline-none"
            style={{ color: brandColor }}
          >
            {data.tag || 'TAG'}
          </span>
        </SmartField>
        
        <SmartField field="titulo" {...sp} className="mb-3 shrink-0 min-w-0 w-full">
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black text-[#1a1a1a] leading-tight outline-none break-words"
            style={{ fontSize: `${26 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>
        
        <SmartField field="texto_apoio" {...sp} className="w-[90%] flex-1 min-h-0">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-playfair text-zinc-700 leading-relaxed outline-none"
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full p-6 flex flex-col overflow-hidden bg-[#FAFAFA] relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} counterBg="#EDEDED" brandAvatar={brandAvatar}
        hideDot={true}
      />
      
      <div className="w-full h-[45%] shrink-0 relative mb-8 mt-[26px]">
        <div className="absolute -bottom-3 -right-3 w-24 h-24 rounded-br-[90px] z-0" style={{ backgroundColor: brandColor }} />
        <SmartField field="imagem" {...sp} className="relative w-full h-full bg-zinc-300 rounded-br-[80px] rounded-tl-xl overflow-hidden shadow-lg z-10 border-4 border-white">
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>
      </div>
      
      <div className="flex-1 flex flex-col min-h-0 pl-2 pt-[10px]">
        <SmartField field="tag" {...sp} className="mb-2 shrink-0">
          <span
             contentEditable suppressContentEditableWarning
             onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
             className="font-outfit font-bold text-[10px] uppercase tracking-widest text-zinc-500 outline-none"
          >
            {data.tag || 'TAG'}
          </span>
        </SmartField>
        
        <SmartField field="titulo" {...sp} className="mb-3 shrink-0 min-w-0">
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black text-[#1a1a1a] leading-tight outline-none break-words"
            style={{ fontSize: `${28 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>
        
        <SmartField field="texto_apoio" {...sp} className="flex-1 min-h-0">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-playfair text-zinc-700 leading-snug outline-none"
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
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
      
      <SmartField field="imagem" {...sp} className="w-[90%] h-[40%] mx-auto bg-zinc-300 rounded-2xl relative z-10 shadow-2xl transform -rotate-3 shrink-0 border border-zinc-700 mt-[26px] overflow-hidden">
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
      
      <div className="w-[95%] mx-auto bg-white p-6 rounded-2xl relative z-20 shadow-2xl transform rotate-1 -mt-4 flex-1 flex flex-col min-h-0 mb-6">
        <div className="flex items-center gap-2 mb-3 shrink-0">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: brandColor }} />
          <SmartField field="tag" {...sp}>
            <span
               contentEditable suppressContentEditableWarning
               onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
               className="inline-block font-outfit font-bold text-[10px] uppercase tracking-widest text-zinc-400 outline-none -translate-y-[2px]"
            >
              {data.tag || 'TAG'}
            </span>
          </SmartField>
        </div>
        
        <SmartField field="titulo" {...sp} className="mb-2 shrink-0 min-w-0">
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black text-[#1a1a1a] leading-tight outline-none break-words"
            style={{ fontSize: `${24 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>
        
        <SmartField field="texto_apoio" {...sp} className="flex-1 min-h-0">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-playfair text-zinc-600 leading-snug outline-none"
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-white relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} brandAvatar={brandAvatar}
        hideDot={true}
      />
      
      <div className="w-full h-[50%] shrink-0 relative border-b-8" style={{ borderColor: brandColor }}>
        <SmartField field="imagem" {...sp} className="w-full h-full bg-zinc-300 relative overflow-hidden">
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>
      </div>
      
      <div className="flex-1 p-8 flex flex-col min-h-0 bg-white shadow-[inset_0_10px_30px_rgba(0,0,0,0.03)] z-10">
        <SmartField field="titulo" {...sp} className="mb-4 shrink-0 min-w-0 w-full">
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black text-[#1a1a1a] leading-tight outline-none break-words"
            style={{ fontSize: `${26 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>
        
        <SmartField field="texto_apoio" {...sp} className="flex-1 min-h-0 w-full">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-playfair text-zinc-600 leading-relaxed font-medium outline-none w-full"
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full p-6 flex flex-col overflow-hidden bg-[#FAFAFA] relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} brandAvatar={brandAvatar} counterBg="#EDEDED"
        hideDot={true}
      />
      
      <div className="flex-1 flex flex-col min-h-0 justify-center pb-4 mt-6">
        <div className="flex items-center gap-3 mb-3 shrink-0">
          <SmartField field="tag" {...sp} className="-translate-y-[2px]">
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="border-2 font-outfit font-bold px-2 py-0.5 rounded text-[11px] shrink-0 uppercase tracking-widest outline-none"
              style={{ color: brandColor, borderColor: brandColor }}
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
        
        <SmartField field="texto_apoio" {...sp} className="min-h-0">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-playfair text-zinc-700 leading-snug outline-none"
            style={{ fontSize: `${18 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>
      
      <SmartField field="imagem" {...sp} className="w-full h-[40%] rounded-2xl overflow-hidden shadow-lg shrink-0 bg-zinc-300 relative border border-black/5 mt-auto">
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 20 — Reverse Background
// ═══════════════════════════════════════════════════════════
export function SplitVariant20(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
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
        
        <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/20 shrink-0 pointer-events-auto">
          <SmartField field="titulo" {...sp} className="mb-2 w-full">
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-outfit font-black tracking-tight leading-[1.1] outline-none break-words"
              style={{ color: brandColor, fontSize: `${22 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
          
          <SmartField field="texto_apoio" {...sp} className="min-h-0">
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-playfair text-zinc-800 leading-snug outline-none"
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full p-6 flex flex-col overflow-hidden relative bg-[#FAFAFA]">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} brandAvatar={brandAvatar} counterBg="#EDEDED"
        hideDot={true}
      />
      
      <div className="flex-1 flex flex-col z-10 min-h-0 pt-12">
        <SmartField field="titulo" {...sp} className="mb-4 w-[80%]">
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black text-[#1a1a1a] leading-[1.1] outline-none break-words"
            style={{ fontSize: `${32 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>
        
        <SmartField field="texto_apoio" {...sp} className="w-[70%] min-h-0">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-playfair text-zinc-600 leading-snug outline-none"
            style={{ fontSize: `${18 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>
      
      <div className="absolute bottom-6 right-6 w-[55%] h-[40%] z-0">
        <SmartField field="imagem" {...sp} className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl bg-zinc-300 border-4 border-white">
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex bg-[#FAFAFA] relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} brandAvatar={brandAvatar} counterBg="#EDEDED"
        hideDot={true}
      />
      <div className="w-14 h-full shrink-0 flex flex-col items-center py-6 shadow-xl z-10" style={{ backgroundColor: brandColor }}>
        <span className="font-outfit font-black text-[10px] transform -rotate-90 origin-center whitespace-nowrap mt-20 tracking-[0.3em] text-white uppercase">
          {data.tag || 'VOL 09'}
        </span>
        <div className="w-px h-16 bg-white/30 mt-auto mb-4" />
        <span className="font-outfit font-bold text-xs text-white">
          {index + 1}
        </span>
      </div>
      
      <div className="flex-1 flex flex-col h-full p-6 relative z-20 pb-8">
        
        <div className="flex-1 min-h-0 flex flex-col justify-center mb-6 pl-2">
          <SmartField field="titulo" {...sp} className="mb-3">
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-outfit font-black text-[#1a1a1a] leading-[1.1] outline-none break-words"
              style={{ fontSize: `${24 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
          
          <SmartField field="texto_apoio" {...sp} className="min-h-0">
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-playfair text-zinc-600 leading-snug outline-none"
              style={{ fontSize: `${18 * sText}px` }}
            >
              {data.texto_apoio}
            </p>
          </SmartField>
        </div>
        
        <SmartField field="imagem" {...sp} className="w-full h-[35%] bg-zinc-300 mt-auto relative shrink-0 shadow-xl rounded-xl overflow-hidden border-4 border-white">
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#FAFAFA]">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} brandAvatar={brandAvatar} counterBg="#EDEDED"
        hideDot={true}
      />
      <div className="absolute inset-0 p-6 flex flex-col">
        <div className="relative z-10 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl w-[90%] border border-white/50 mb-auto mt-6 ml-auto shrink-0 flex flex-col">
          <SmartField field="tag" {...sp} className="mb-2 text-right">
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            className="font-outfit font-black text-[10px] uppercase tracking-widest outline-none block"
            style={{ color: brandColor }}
          >
            {data.tag || 'TAG'}
          </span>
        </SmartField>
        
        <SmartField field="titulo" {...sp} className="mb-2 text-right w-full">
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black text-[#1a1a1a] leading-[1.1] outline-none break-words"
            style={{ fontSize: `${22 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>
        
        <SmartField field="texto_apoio" {...sp} className="text-right min-h-0">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-playfair text-zinc-600 leading-snug outline-none"
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full p-6 flex flex-col overflow-hidden bg-[#FAFAFA] relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} brandAvatar={brandAvatar} counterBg="#EDEDED"
        hideDot={true}
      />
      
      <div className="flex-1 flex flex-col items-center text-center justify-center pt-8 pb-4 min-h-0">
        <SmartField field="tag" {...sp} className="mb-2 shrink-0">
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            className="text-[10px] font-outfit font-bold tracking-widest uppercase outline-none"
            style={{ color: brandColor }}
          >
            {data.tag || 'TAG'}
          </span>
        </SmartField>
        
        <SmartField field="titulo" {...sp} className="mb-3 shrink-0 w-full">
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black text-[#1a1a1a] leading-[1.1] outline-none break-words"
            style={{ fontSize: `${26 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>
        
        <SmartField field="texto_apoio" {...sp} className="w-[90%] flex-1 min-h-0">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-playfair text-zinc-700 leading-relaxed outline-none"
            style={{ fontSize: `${18 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>
      
      <SmartField field="imagem" {...sp} className="w-full h-[40%] bg-zinc-300 rounded-b-[100px] rounded-t-xl overflow-hidden shadow-lg mt-auto relative shrink-0 border-b-8 border-white">
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 25 — Dark Gradient Bottom
// ═══════════════════════════════════════════════════════════
export function SplitVariant25(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden bg-[#FAFAFA] p-6">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} brandAvatar={brandAvatar} counterBg="#EDEDED"
        hideDot={true}
      />
      
      <div className="flex-1 flex flex-col justify-start items-center gap-4 mt-12 pt-16">
        {/* Card de Imagem (A "moldura" que o usuário mencionou) */}
        <SmartField field="imagem" {...sp} className="w-[90%] h-[38%] rounded-3xl overflow-hidden shadow-xl bg-zinc-900 relative shrink-0 border-4 border-white">
          <ImageBg data={data} className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        </SmartField>

        {/* Card de Texto (O "retângulo flutuante" centralizado) */}
        <div className="w-[90%] bg-white p-8 rounded-3xl shadow-2xl border border-zinc-100 flex flex-col justify-center text-center relative z-10">
          <SmartField field="tag" {...sp} className="mb-2 shrink-0">
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="font-outfit font-black text-[10px] uppercase tracking-widest outline-none"
              style={{ color: brandColor }}
            >
              {data.tag || 'TAG'}
            </span>
          </SmartField>
          
          <SmartField field="titulo" {...sp} className="mb-3 shrink-0 w-full">
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-outfit font-black text-[#1a1a1a] leading-tight outline-none break-words"
              style={{ fontSize: `${24 * sTitle}px` }}
            >
              {data.titulo}
            </h2>
          </SmartField>
          
          <SmartField field="texto_apoio" {...sp} className="min-h-0">
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-playfair text-zinc-600 leading-snug outline-none line-clamp-3 overflow-hidden"
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#FAFAFA]">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} brandAvatar={brandAvatar} counterBg="#EDEDED"
        hideDot={true}
      />
      <div className="absolute inset-0 p-6 flex flex-col">
        <div className="absolute top-10 right-[-40px] w-64 h-64 rounded-full opacity-[0.06] z-0 pointer-events-none" style={{ backgroundColor: brandColor }} />
        
        <div className="flex-1 flex flex-col z-10 min-h-0 pt-8 w-[85%] pr-4 relative">
          <SmartField field="tag" {...sp} className="mb-2">
          <span
             contentEditable suppressContentEditableWarning
             onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
             className="font-outfit font-bold text-[10px] tracking-widest uppercase text-zinc-500 outline-none"
          >
            {data.tag || 'TAG'}
          </span>
        </SmartField>
        
        <SmartField field="titulo" {...sp} className="mb-4 w-full">
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black text-[#1a1a1a] leading-[1.1] outline-none break-words"
            style={{ fontSize: `${28 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>
        
        <SmartField field="texto_apoio" {...sp} className="min-h-0">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-playfair text-zinc-600 leading-relaxed font-medium outline-none"
            style={{ fontSize: `${18 * sText}px` }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>
      </div>
      
      <SmartField field="imagem" {...sp} className="w-[85%] h-[40%] bg-zinc-300 mt-auto ml-auto relative z-10 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  // Cada quadrante usa seu próprio slot, com fallback para imageUrl
  const slots = [
    { imageUrl: data.imageUrl,  imagePosition: data.imagePosition,  imageScale: data.imageScale },
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

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-[24px] px-10 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-white/20" style={{ backgroundColor: brandColor }}>
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

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-6 py-2 rounded-full shadow-lg z-10 border border-zinc-200">
        <SmartField field="texto_apoio" {...sp}>
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-outfit text-zinc-800 font-bold text-[10px] tracking-widest uppercase outline-none"
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
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

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[85%] bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl flex flex-col items-center text-center z-10 border border-white/50">
        <SmartField field="tag" {...sp} className="mb-2">
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            className="font-outfit font-bold text-[10px] uppercase tracking-widest outline-none"
            style={{ color: brandColor }}
          >
            {data.tag || 'EXCLUSIVE'}
          </span>
        </SmartField>
        <SmartField field="titulo" {...sp} className="mb-2 w-full">
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black text-[#1a1a1a] leading-tight outline-none break-words"
            style={{ fontSize: `${24 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>
        <SmartField field="texto_apoio" {...sp} className="w-full">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-outfit text-zinc-600 leading-snug font-medium outline-none"
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
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

      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 p-6 z-10 shadow-2xl flex flex-col items-center text-center border-y-[6px] border-white" style={{ backgroundColor: brandColor }}>
        <SmartField field="titulo" {...sp} className="w-full">
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black text-white leading-none tracking-tight uppercase outline-none break-words"
            style={{ fontSize: `${32 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>
      </div>

      <div className="absolute bottom-6 right-6 max-w-[55%] bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-2xl z-20 border border-white/50">
        <SmartField field="texto_apoio" {...sp}>
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-outfit text-zinc-800 font-bold text-[11px] leading-snug outline-none"
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
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

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-6 py-2 rounded-full shadow-lg z-10 border border-zinc-200">
        <SmartField field="texto_apoio" {...sp}>
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-outfit text-[#1a1a1a] font-bold text-[10px] tracking-widest uppercase outline-none"
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
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

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-6 py-2 rounded-full shadow-lg z-10 border border-zinc-200">
        <SmartField field="texto_apoio" {...sp}>
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-outfit text-[#1a1a1a] font-bold text-[10px] tracking-widest uppercase outline-none"
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
  13: SplitVariant13,
  14: SplitVariant14,
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
};

export const SPLIT_VARIANT_META = [
  { id: 0, name: 'Original', description: 'Layout padrão com imagem arredondada', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split0.png' },
  { id: 1, name: 'Hero Top', description: 'Imagem grande superior + texto abaixo', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split1.png' },
  { id: 2, name: 'Side Split', description: 'Imagem lateral + texto na direita', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split2.png' },
  { id: 3, name: 'Text Top', description: 'Texto superior + imagem inferior', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split3.png' },
  { id: 4, name: 'Bento Grid', description: 'Grid bento com três células', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split4.png' },
  { id: 5, name: 'Brutalist', description: 'Estilo brutalista com bordas grossas', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split5.png' },
  { id: 7, name: 'Fashion Overlap', description: 'Card branco com foto circular sobreposta', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split7.png' },
  { id: 8, name: 'Image Top Split', description: 'Imagem superior rounded + header + conteúdo horizontal', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split8.png' },
  { id: 9, name: 'Circle Top', description: 'Imagem oval superior com container glassmorphism logo abaixo', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split9.png' },
  { id: 10, name: 'Polaroid Tilt', description: 'Layout minimalista com estilo polaroid inclinada', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split10.png' },
  { id: 11, name: 'Overlap Card', description: 'Imagem de fundo com card de texto subindo e sobrepondo', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split11.png' },
  { id: 12, name: 'Dark Centered', description: 'Layout centralizado com círculo e foco na cor da marca', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split12.png' },
  { id: 13, name: 'Thin Border Split', description: 'Layout formatado com bordas perimetrais', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split13.png' },
  { id: 14, name: 'Floating Element', description: 'Texto em card flutuante deslocado', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split14.png' },
  { id: 15, name: 'Arch View', description: 'Imagem com arcos estilizados ao topo', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split15.png' },
  { id: 16, name: 'Frame Bottom Card', description: 'Frame destacado inferior direito na imagem', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split16.png' },
  { id: 17, name: 'Diagonal Shift', description: 'Containers rotacionados de forma dinâmica', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split17.png' },
  { id: 18, name: 'Edge Half View', description: 'Divisão exata do slide em blocos fluídos', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split18.png' },
  { id: 19, name: 'Reverse Rounded', description: 'Imagem inferior com campos alinhados', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split19.png' },
  { id: 20, name: 'Reverse Background', description: 'Fundo escuro em toda tela com card inferior', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split20.png' },
  { id: 21, name: 'Float Bottom Right', description: 'Texto flutuante com imagem reduzida direita', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split21.png' },
  { id: 22, name: 'Vertical Bar', description: 'Barra lateral de cor e texto justificado', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split22.png' },
  { id: 23, name: 'Glass Offset Bottom', description: 'Container glass alinhado com imagem solta', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split23.png' },
  { id: 24, name: 'Center Arch Bottom', description: 'Arco invertido centralizado', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split24.png' },
  { id: 25, name: 'Dark Gradient Bottom', description: 'Bordas e gradiente inferior em foto', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split25.png' },
  { id: 26, name: 'Float Color Circle', description: 'Círculo de cor e text frame na direita superior', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split26.png' },
  { id: 27, name: 'Grid Mirror', description: 'Grid 2x2 com espelhamento 4-way', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split27.png' },
  { id: 28, name: 'Split Side Mirror', description: 'Split vertical em 2 lados espelhados', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split28.png' },
  { id: 29, name: 'Horizontal Strip', description: 'Split horizontal com fita central', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split29.png' },
  { id: 30, name: 'Vertical Mirror Pill', description: '2 colunas verticais com título central pill', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split30.png' },
  { id: 31, name: 'Horizontal Mirror Pill', description: '2 linhas horizontais com título central pill', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split31.png' },
];



