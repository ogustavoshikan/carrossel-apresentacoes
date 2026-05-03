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
function SmartField({ data, index, field, showMetrics, onActionStart, selectedElement, onSelectElement, className, style, children }) {
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
      style={style}
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
export function SplitVariant1({ data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
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
            <div className="h-[2px] w-8" style={{ backgroundColor: brandColor }} />
            <SmartField field="tag" {...sp}>
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
                className="inline-block font-tag font-bold text-[11px] tracking-[0.4em] uppercase outline-none -translate-y-[2px]"
                style={{fontFamily: tagFont,  color: brandColor }}
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
  selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo , titleFont, textFont, tagFont}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex relative overflow-hidden" style={{fontFamily: textFont,  backgroundColor: brandColor || '#050505' }}>
      {/* Imagem lateral esquerda */}
      <SmartField field="imagem" {...sp}
        className="w-[45%] h-full relative z-10"
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
        hideDot={true} brandLogo={brandLogo} showBrandLogo={showBrandLogo} />

        <div className="mb-6 mt-10">
          <SmartField field="tag" {...sp}>
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="px-3 py-1 border border-white/10 rounded font-tag text-[10px] tracking-widest outline-none inline-block"
              style={{fontFamily: tagFont,  color: '#ffffff', backgroundColor: 'rgba(10, 10, 10, 0.15)' }}
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
  selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo , titleFont, textFont, tagFont}) {
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
      <div className="w-full h-1/2 p-10 pt-24 flex flex-col justify-center border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2 mb-4 shrink-0">
          <div className="h-[2px] min-h-[2px] w-8 shrink-0" style={{fontFamily: textFont,  backgroundColor: brandColor }} />
          <SmartField field="tag" {...sp}>
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="inline-block font-tag font-bold text-[10px] tracking-[0.4em] uppercase outline-none -translate-y-[2px]"
              style={{fontFamily: tagFont,  color: brandColor }}
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
export function SplitVariant4({ data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
  titleScale, textScale, showMetrics, onActionStart, onTextChange,
  selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo , titleFont, textFont, tagFont}) {
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
        hideDot={true} brandLogo={brandLogo} showBrandLogo={showBrandLogo} />

      <div className="flex-1 grid grid-cols-2 grid-rows-3 gap-4 pt-12">
        {/* Card Titulo — topo full width */}
        <div className="col-span-2 row-span-1 bg-[#0A0A0A] rounded-3xl p-6 border border-white/5 flex flex-col justify-center">
          <SmartField field="tag" {...sp} className="mb-2">
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="font-tag font-black text-[9px] uppercase tracking-widest text-zinc-500 outline-none"
            >
              {data.tag || 'TAG'}
            </span>
          </SmartField>

          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black text-white leading-tight outline-none break-words"
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
          style={{fontFamily: titleFont,  background: `linear-gradient(to bottom, #0A0A0A, #000)` }}
        >
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-text italic text-zinc-400 outline-none leading-relaxed"
              style={{ fontSize: `${13 * sText}px` }}
            >
              {data.texto_apoio}
            </p>
          </SmartField>

          <div
            className="mt-4 w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={{fontFamily: textFont,  backgroundColor: brandColor }}
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
export function SplitVariant5({ data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
  titleScale, textScale, showMetrics, onActionStart, onTextChange,
  selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo , titleFont, textFont, tagFont}) {
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
        hideDot={true} brandLogo={brandLogo} showBrandLogo={showBrandLogo} />

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
            className="font-title font-black tracking-tighter leading-none outline-none break-words"
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
              className="font-text font-bold text-black outline-none text-sm leading-snug"
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
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
              className="font-tag font-black text-[10px] tracking-[0.3em] uppercase outline-none px-4 py-1.5 rounded-full border"
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full p-6 flex flex-col overflow-hidden bg-[#FAFAFA] relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} counterBg="#EDEDED" handleColor="#1A1A1A" counterColor="#1A1A1A" brandAvatar={brandAvatar}
        hideDot={true}
      />
      
      <div className="w-full shrink-0" style={{fontFamily: titleFont,  height: '13px' }} />
      <SmartField field="imagem" {...sp} className="w-full h-[40%] rounded-2xl overflow-hidden shadow-lg mb-6 shrink-0 bg-zinc-300 relative border border-black/5 mt-4">
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center gap-4 mb-4 shrink-0">
          <SmartField field="tag" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="text-white font-tag font-bold px-2 py-0.5 rounded text-[11px] shrink-0 outline-none uppercase tracking-wide"
              style={{fontFamily: tagFont,  backgroundColor: brandColor }}
            >
              {data.tag || 'TAG'}
            </span>
          </SmartField>
          
          <SmartField field="titulo" {...sp} className="flex-1 min-w-0">
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black text-[#1a1a1a] tracking-tight leading-[1.1] outline-none break-words"
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
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 9 — Circle Top 
// Imagem oval superior com container glassmorphism logo abaixo
// ═══════════════════════════════════════════════════════════
export function SplitVariant9(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full p-6 flex flex-col overflow-hidden relative bg-[#F4F4F5]">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} counterBg="#EDEDED" handleColor="#1A1A1A" counterColor="#1A1A1A" brandAvatar={brandAvatar}
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  
  return (
    <div className="w-full h-full p-6 flex flex-col overflow-hidden bg-[#E8E8E8] relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} counterBg="#EDEDED" handleColor="#1A1A1A" counterColor="#1A1A1A" brandAvatar={brandAvatar}
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
              className="font-tag font-bold text-zinc-400 text-[10px] tracking-widest uppercase outline-none"
            >
              {data.tag || `VOL. 0${index + 1}`}
            </span>
          </SmartField>
          
          <svg className="w-3 h-3" style={{fontFamily: titleFont,  color: brandColor }} fill="currentColor" viewBox="0 0 24 24">
             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full p-6 flex flex-col overflow-hidden relative bg-[#FAFAFA]">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} counterBg="#EDEDED" handleColor="#1A1A1A" counterColor="#1A1A1A" brandAvatar={brandAvatar}
        hideDot={true}
      />
      
      <div className="w-full shrink-0" style={{fontFamily: textFont,  height: '13px' }} />
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full p-6 flex flex-col overflow-hidden items-center text-white relative" style={{fontFamily: titleFont,  backgroundColor: brandColor }}>
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
      
      <SmartField field="imagem" {...sp} className="w-48 h-48 rounded-full overflow-hidden shrink-0 border-4 border-white/20 relative mb-6 shadow-2xl">
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full relative overflow-hidden bg-white">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} counterBg="#EDEDED" handleColor="#1A1A1A" counterColor="#1A1A1A" brandAvatar={brandAvatar}
        hideDot={true}
      />
      <div className="absolute inset-0 p-6 flex flex-col border-8" style={{fontFamily: textFont,  borderColor: brandColor }}>
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
            style={{fontFamily: tagFont,  color: brandColor }}
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
// VARIANTE 14 — Floating Image Offset
// Container flutuante offset com imagem estendida estilo magazine.
// ═══════════════════════════════════════════════════════════
export function SplitVariant14(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
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
            className="font-tag font-black text-[10px] uppercase tracking-widest outline-none"
            style={{fontFamily: tagFont,  color: brandColor }}
          >
            {data.tag || 'TAG'}
          </span>
        </SmartField>
        
        <SmartField field="titulo" {...sp} className="mb-2 shrink-0 min-w-0">
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-title font-black text-[#1a1a1a] leading-tight outline-none break-words"
            style={{ fontSize: `${22 * sTitle}px` }}
          >
            {data.titulo}
          </h2>
        </SmartField>
        
        <SmartField field="texto_apoio" {...sp} className="flex-1 overflow-hidden">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-text text-zinc-600 leading-snug outline-none line-clamp-4"
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full p-6 flex flex-col overflow-hidden bg-[#FAFAFA] relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} counterBg="#EDEDED" handleColor="#1A1A1A" counterColor="#1A1A1A" brandAvatar={brandAvatar}
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
            className="font-tag text-[10px] font-bold tracking-widest uppercase outline-none"
            style={{fontFamily: titleFont,  color: brandColor }}
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full p-6 flex flex-col overflow-hidden bg-[#FAFAFA] relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} counterBg="#EDEDED" handleColor="#1A1A1A" counterColor="#1A1A1A" brandAvatar={brandAvatar}
        hideDot={true}
      />
      
      <div className="w-full h-[45%] shrink-0 relative mb-8 mt-[26px]">
        <div className="absolute -bottom-3 -right-3 w-24 h-24 rounded-br-[90px] z-0" style={{fontFamily: textFont,  backgroundColor: brandColor }} />
        <SmartField field="imagem" {...sp} className="relative w-full h-full bg-zinc-300 rounded-br-[80px] rounded-tl-xl overflow-hidden shadow-lg z-10 border-4 border-white">
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>
      </div>
      
      <div className="flex-1 flex flex-col min-h-0 pl-2 pt-[10px]">
        <SmartField field="tag" {...sp} className="mb-2 shrink-0">
          <span
             contentEditable suppressContentEditableWarning
             onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
             className="font-tag font-bold text-[10px] uppercase tracking-widest text-zinc-500 outline-none"
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
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
          <div className="w-2 h-2 rounded-full" style={{fontFamily: titleFont,  backgroundColor: brandColor }} />
          <SmartField field="tag" {...sp}>
            <span
               contentEditable suppressContentEditableWarning
               onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
               className="inline-block font-tag font-bold text-[10px] uppercase tracking-widest text-zinc-400 outline-none -translate-y-[2px]"
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-white relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} brandAvatar={brandAvatar}
        hideDot={true}
      />
      
      <div className="w-full h-[50%] shrink-0 relative border-b-8" style={{fontFamily: titleFont,  borderColor: brandColor }}>
        <SmartField field="imagem" {...sp} className="w-full h-full bg-zinc-300 relative overflow-hidden">
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>
      </div>
      
      <div className="flex-1 p-8 flex flex-col min-h-0 bg-white shadow-[inset_0_10px_30px_rgba(0,0,0,0.03)] z-10">
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full p-6 flex flex-col overflow-hidden bg-[#FAFAFA] relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} brandAvatar={brandAvatar} counterBg="#EDEDED" handleColor="#1A1A1A" counterColor="#1A1A1A"
        hideDot={true}
      />
      
      <div className="flex-1 flex flex-col min-h-0 justify-center pb-4 mt-6">
        <div className="flex items-center gap-3 mb-3 shrink-0">
          <SmartField field="tag" {...sp} className="-translate-y-[2px]">
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="border-2 font-tag font-bold px-2 py-0.5 rounded text-[11px] shrink-0 uppercase tracking-widest outline-none"
              style={{fontFamily: titleFont,  color: brandColor, borderColor: brandColor }}
            >
              {data.tag || 'TAG'}
            </span>
          </SmartField>
          
          <SmartField field="titulo" {...sp} className="flex-1 min-w-0">
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black text-[#1a1a1a] tracking-tight leading-[1.1] outline-none break-words"
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full p-6 flex flex-col overflow-hidden relative bg-[#FAFAFA]">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} brandAvatar={brandAvatar} counterBg="#EDEDED" handleColor="#1A1A1A" counterColor="#1A1A1A"
        hideDot={true}
      />
      
      <div className="flex-1 flex flex-col z-10 min-h-0 pt-12">
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex bg-[#FAFAFA] relative">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} brandAvatar={brandAvatar} counterBg="#EDEDED" handleColor="#1A1A1A" counterColor="#1A1A1A"
        hideDot={true}
      />
      <div className="w-14 h-full shrink-0 flex flex-col items-center py-6 shadow-xl z-10" style={{fontFamily: textFont,  backgroundColor: brandColor }}>
        <span className="font-text font-black text-[10px] transform -rotate-90 origin-center whitespace-nowrap mt-20 tracking-[0.3em] text-white uppercase">
          {data.tag || 'VOL 09'}
        </span>
        <div className="w-px h-16 bg-white/30 mt-auto mb-4" />
        <span className="font-text font-bold text-xs text-white">
          {index + 1}
        </span>
      </div>
      
      <div className="flex-1 flex flex-col h-full p-6 relative z-20 pb-8">
        
        <div className="flex-1 min-h-0 flex flex-col justify-center mb-6 pl-2">
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#FAFAFA]">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} brandAvatar={brandAvatar} counterBg="#EDEDED" handleColor="#1A1A1A" counterColor="#1A1A1A"
        hideDot={true}
      />
      <div className="absolute inset-0 p-6 flex flex-col">
        <div className="relative z-10 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl w-[90%] border border-white/50 mb-auto mt-6 ml-auto shrink-0 flex flex-col">
          <SmartField field="tag" {...sp} className="mb-2 text-right">
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            className="font-tag font-black text-[10px] uppercase tracking-widest outline-none block"
            style={{fontFamily: titleFont,  color: brandColor }}
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
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
            style={{fontFamily: titleFont,  color: brandColor }}
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden bg-[#FAFAFA] p-6">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} brandAvatar={brandAvatar} counterBg="#EDEDED" handleColor="#1A1A1A" counterColor="#1A1A1A"
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
              className="font-tag font-black text-[10px] uppercase tracking-widest outline-none"
              style={{fontFamily: titleFont,  color: brandColor }}
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#FAFAFA]">
      <SlideHeader {...props} slideIndex={index} index={index + 1} total={slideCount} brandAvatar={brandAvatar} counterBg="#EDEDED" handleColor="#1A1A1A" counterColor="#1A1A1A"
        hideDot={true}
      />
      <div className="absolute inset-0 p-6 flex flex-col">
        <div className="absolute top-10 right-[-40px] w-64 h-64 rounded-full opacity-[0.06] z-0 pointer-events-none" style={{fontFamily: textFont,  backgroundColor: brandColor }} />
        
        <div className="flex-1 flex flex-col z-10 min-h-0 pt-8 w-[85%] pr-4 relative">
          <SmartField field="tag" {...sp} className="mb-2">
          <span
             contentEditable suppressContentEditableWarning
             onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
             className="font-tag font-bold text-[10px] tracking-widest uppercase text-zinc-500 outline-none"
          >
            {data.tag || 'TAG'}
          </span>
        </SmartField>
        
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
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

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-[24px] py-3 shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-white/20" style={{fontFamily: titleFont,  backgroundColor: brandColor, paddingLeft: '18px', paddingRight: '18px' }}>
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

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-6 py-2 rounded-full shadow-lg z-10 border border-zinc-200">
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
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

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[85%] bg-white/95 backdrop-blur-sm pt-1 pb-6 px-6 rounded-2xl shadow-2xl flex flex-col items-center text-center z-10 border border-white/50">
        <SmartField field="tag" {...sp} className="mb-2">
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            className="font-tag font-bold text-[10px] uppercase tracking-widest outline-none"
            style={{fontFamily: titleFont,  color: brandColor }}
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
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

      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 py-4 px-6 z-10 shadow-2xl flex flex-col items-center text-center border-y-[6px] border-white" style={{fontFamily: textFont,  backgroundColor: brandColor }}>
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

      <div className="absolute bottom-6 right-6 max-w-[55%] bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-2xl z-20 border border-white/50">
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
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

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-[24px] shadow-2xl border-2 border-white/20" style={{fontFamily: textFont,  backgroundColor: brandColor, paddingLeft: '20px', paddingRight: '20px', paddingTop: '10px', paddingBottom: '10px' }}>
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

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-6 py-2 rounded-full shadow-lg z-10 border border-zinc-200">
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, brandAvatar, isVerified, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
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

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-[24px] shadow-2xl border-2 border-white/20" style={{fontFamily: textFont,  backgroundColor: brandColor, paddingLeft: '20px', paddingRight: '20px', paddingTop: '11px', paddingBottom: '11px' }}>
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

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-6 py-2 rounded-full shadow-lg z-10 border border-zinc-200">
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
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
      <div className="w-full flex-1 p-8 flex flex-col justify-center relative z-10" style={{fontFamily: textFont,  backgroundColor: brandColor }}>
        <div className="mb-2 shrink-0">
          <SmartField field="badge_text" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="font-tag font-bold text-[10px] uppercase tracking-[0.2em] text-white/70 outline-none"
            >
              {data.badge_text || '13'}
            </span>
          </SmartField>
        </div>
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
// VARIANTE 33 — Side Brand Panel
// Imagem lateral 75% + painel lateral da cor da marca 25%.
// ═══════════════════════════════════════════════════════════
export function SplitVariant33(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
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

        <div className="mt-auto relative z-10 p-5 rounded-2xl border border-white/10" style={{fontFamily: titleFont,  backgroundColor: brandColor }}>
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
      <div className="w-[25%] h-full flex flex-col justify-center items-center z-10" style={{fontFamily: textFont,  backgroundColor: brandColor }}>
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col p-8 overflow-hidden relative" style={{fontFamily: tagFont,  backgroundColor: brandColor, color: 'white' }}>
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

      <div className="flex-1 bg-black/20 backdrop-blur-sm rounded-3xl p-5 border border-white/20 relative z-10">
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
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
        <ImageBg data={data} className="absolute inset-0 opacity-90" />
      </div>
      <div className="flex-1 w-full p-8 flex flex-col justify-center relative z-10" style={{fontFamily: textFont,  backgroundColor: brandColor }}>
        <div className="mb-2 shrink-0">
          <SmartField field="badge_text" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="font-tag font-bold text-[10px] uppercase tracking-widest text-white/60 outline-none"
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
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
      <div className="h-[60%] w-full p-6 flex flex-col shrink-0 relative z-10 rounded-b-[40px]" style={{fontFamily: titleFont,  backgroundColor: brandColor }}>
        <div className="flex-1 w-full bg-zinc-900 rounded-[28px] overflow-hidden shadow-inner border-[6px] border-white relative mt-2">
          <SmartField field="imagem" {...sp} className="w-full h-full">
            <ImageBg data={data} className="absolute inset-0" />
          </SmartField>
        </div>
      </div>
      <div className="flex-1 w-full p-8 flex flex-col justify-center text-center relative z-0">
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
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
      <div className="w-[40%] h-full p-6 flex flex-col justify-center relative z-10 shadow-[10px_0_30px_rgba(0,0,0,0.5)]" style={{fontFamily: textFont,  backgroundColor: brandColor }}>
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
      </div>
      <SmartField field="imagem" {...sp} className="w-[60%] h-full relative z-0">
        <ImageBg data={data} className="absolute inset-0 opacity-90" />
        <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-white/50 max-w-[85%]">
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden text-white relative" style={{fontFamily: titleFont,  backgroundColor: brandColor }}>
      <SlideHeader 
        {...props} 
        slideIndex={index} 
        index={index + 1} 
        total={slideCount} 
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true} 
      />
      <SmartField field="imagem" {...sp} className="w-full relative shrink-0 z-0 border-b-[8px]" style={{ height: 'calc(35% + 35px)', borderColor: brandColor }}>
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
      <div className="flex-1 w-full p-8 flex flex-col justify-center relative z-10">
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col p-6 overflow-hidden relative bg-white">
      <SlideHeader {...props} index={index + 1} total={slideCount} hideDot handleColor="#1A1A1A" counterColor="#1A1A1A" counterBg="#EDEDED" />

      <div className="flex flex-1 mt-4 gap-4">
        <SmartField field="imagem" {...sp} className="w-[45%] h-[80%] rounded-[24px] overflow-hidden shadow-lg relative shrink-0 z-10 mt-10">
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>
        <div className="w-[55%] h-full flex flex-col justify-center pr-2">
          <div className="mb-2 shrink-0">
            <SmartField field="badge_text" {...sp}>
              <span
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
                className="font-tag font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded text-white inline-block outline-none"
                style={{fontFamily: tagFont,  backgroundColor: brandColor }}
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
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
      <SmartField field="imagem" {...sp} className="w-full h-[65%] relative shrink-0">
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
      <div className="flex-1 w-full p-8 flex flex-col justify-center relative z-10 border-t-[12px] border-white" style={{fontFamily: textFont,  backgroundColor: brandColor }}>
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
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
      <div className="w-[30%] h-full flex flex-col justify-center items-center p-6 shrink-0 relative z-10" style={{fontFamily: textFont,  backgroundColor: brandColor }}>
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
        <SmartField field="imagem" {...sp} className="w-full h-[45%] rounded-[25px] overflow-hidden shadow-xl mb-6 mt-12 relative shrink-0 bg-zinc-200">
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
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
      <SmartField field="imagem" {...sp} className="w-full h-[55%] relative shrink-0">
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
      <div className="flex-1 w-full p-10 flex flex-col justify-center relative -mt-[47px] bg-white rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
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
        <div className="absolute bottom-10 right-10 w-12 h-1" style={{fontFamily: titleFont,  backgroundColor: brandColor }}></div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 43 — MASSIVE BRAND FRAME
// Moldura robusta com produto centralizado.
// ═══════════════════════════════════════════════════════════
export function SplitVariant43(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
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
        <div className="w-full h-[50%] bg-white rounded-[25px] relative">
          <SmartField field="imagem" {...sp} className="w-full h-full rounded-[25px] overflow-hidden relative">
            <ImageBg data={data} className="absolute inset-0" />
          </SmartField>
        </div>
        <div className="flex-1 flex flex-col justify-center py-8">
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
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
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
      <SmartField field="imagem" {...sp} className="w-full h-[55%] relative shrink-0">
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
      <div className="flex-1 w-full p-8 flex flex-col justify-center relative z-10 border-t-[16px] bg-zinc-50" style={{fontFamily: textFont,  borderColor: brandColor }}>
        <div className="mb-4 mt-2 shrink-0">
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
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 45 — FRAMED HERO
// Imagem emoldurada no centro superior.
// ═══════════════════════════════════════════════════════════
export function SplitVariant45(props) {
  const { data, index, slideCount, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
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
      <SmartField field="imagem" {...sp} className="w-full h-[45%] bg-white rounded-[25px] overflow-hidden mt-[39px] relative">
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
      <div className="flex-1 flex flex-col justify-center py-8">
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
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 46 — CARD ASCEND
// Texto sobreposto à imagem com profundidade.
// ═══════════════════════════════════════════════════════════
export function SplitVariant46(props) {
  const { data, index, slideCount, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
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

      <div className="relative z-20 flex flex-col px-8 py-[22px] justify-center mx-[30px] mb-8 rounded-[25px]" style={{fontFamily: textFont,  backgroundColor: brandColor }}>
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
  const { data, index, slideCount, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
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
      <SmartField field="imagem" {...sp} className="w-full h-[50%] rounded-[30px] overflow-hidden shadow-lg mb-6 shrink-0 relative mt-[30px]">
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
      <div className="flex-1 flex flex-col min-h-0 px-2">
        <div className="shrink-0 mb-3">
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
  const { data, index, slideCount, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
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
      <SmartField field="imagem" {...sp} className="w-full h-[45%] shrink-0 relative z-0">
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
      <div className="flex-1 relative z-40 flex flex-col p-8 pt-10 mt-[-20px] bg-white rounded-t-[30px] shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
        <div className="absolute -top-8 left-8 w-16 h-16 rounded-full border-4 border-white bg-zinc-200 overflow-hidden shadow-xl shrink-0 z-50">
          {brandAvatar ? (
            <img src={brandAvatar} className="w-full h-full object-cover" alt="Avatar" />
          ) : (
            <div className="w-full h-full bg-zinc-400" />
          )}
        </div>
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
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 49 — HERO SHOT PROFILE
// Imagem de topo com overlay e base na cor da marca com avatar.
// ═══════════════════════════════════════════════════════════
export function SplitVariant49(props) {
  const { data, index, slideCount, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, brandColor , titleFont, textFont, tagFont} = props;
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
      <SmartField field="imagem" {...sp} className="w-full h-[55%] shrink-0 relative">
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
      <div className="flex-1 flex flex-col p-8 justify-center relative border-t-[12px] border-white" style={{fontFamily: textFont,  backgroundColor: brandColor }}>
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
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 50 — AUTHOR BADGE TOP
// Imagem de topo com badge de autor flutuante na transição.
// ═══════════════════════════════════════════════════════════
export function SplitVariant50(props) {
  const { data, index, slideCount, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
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
      <SmartField field="imagem" {...sp} className="w-full h-[55%] relative shrink-0 z-0">
        <ImageBg data={data} className="absolute inset-0" />
        <div className="absolute -bottom-6 right-8 p-2 rounded-2xl shadow-xl flex items-center gap-3 z-20" style={{fontFamily: titleFont,  backgroundColor: brandColor }}>
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
  const { data, index, slideCount, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
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
      <SmartField field="imagem" {...sp} className="w-full shrink-0 relative bg-zinc-200 shadow-md mt-[46px] rounded-[24px] overflow-hidden mb-5" style={{ height: 'calc(40% + 25px)' }}>
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
      <div className="flex items-center gap-3 mb-4 shrink-0 mt-[30px]">
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
              style={{fontFamily: titleFont,  color: brandColor }}
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
  const { data, index, slideCount, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden items-center justify-center p-8 text-white relative" style={{fontFamily: textFont,  backgroundColor: brandColor || '#18181b' }}>
      <SlideHeader 
        {...props} 
        slideIndex={index} 
        index={index + 1} 
        total={slideCount} 
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true} 
      />
      <SmartField field="imagem" {...sp} className="w-[85%] aspect-square max-h-[45%] rounded-[40px] bg-zinc-800 relative mb-6 mt-8 border-4 border-white shrink-0 overflow-hidden">
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
  const { data, index, slideCount, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
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
        <div className="absolute bottom-0 left-0 w-full h-1 z-10" style={{fontFamily: textFont,  backgroundColor: brandColor }}></div>
      </div>
      <div className="flex-1 p-8 flex flex-col justify-center relative text-zinc-900 z-10">
        <div className="absolute top-0 left-8 -translate-y-1/2 px-4 py-1 text-white font-bold text-[10px] tracking-widest uppercase" style={{ backgroundColor: brandColor }}>
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
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 54 — MODERNIST TOP
// Foco na imagem superior com base autoritária.
// ═══════════════════════════════════════════════════════════
export function SplitVariant54(props) {
  const { data, index, slideCount, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
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
      <div className="flex items-center gap-4 mb-8 mt-4 shrink-0" style={{fontFamily: textFont,  transform: 'translateY(10px)' }}>
        <div className="w-12 h-1" style={{ backgroundColor: brandColor }}></div>
        <SmartField field="tag" {...sp}>
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            className="font-tag font-black text-[10px] leading-none tracking-[0.3em] uppercase outline-none -translate-y-[2px] inline-block"
            style={{fontFamily: tagFont,  color: brandColor }}
          >
            {data.tag || 'DESIGN'}
          </span>
        </SmartField>
      </div>
      <SmartField field="imagem" {...sp} className="w-full h-[40%] bg-zinc-200 rounded-2xl overflow-hidden relative mb-8 shadow-inner shrink-0">
        <ImageBg data={data} className="absolute inset-0" />
      </SmartField>
      <div className="flex-1 flex flex-col">
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
  const { data, index, slideCount, brandHandle, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
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
      <div className="w-full flex-1 p-8 flex flex-col justify-center relative z-10" style={{fontFamily: textFont,  backgroundColor: brandColor }}>
        <div className="mb-2 shrink-0 mt-6">
          <SmartField field="tag" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="font-bold text-[10px] uppercase tracking-[0.3em] text-white/70 outline-none"
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
      <SmartField field="imagem" {...sp} className="w-full h-[45%] relative shrink-0 z-0">
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
  const { data, index, slideCount, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
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
      <div className="relative z-10 w-[85%] bg-white rounded-br-[60px] p-8 pb-10 flex flex-col border-b-[8px] border-r-[8px]" style={{ borderColor: brandColor }}>
        <div className="mt-6 mb-4 shrink-0">
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
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            className="font-black text-[10px] tracking-widest uppercase bg-black/50 backdrop-blur px-3 py-1 rounded outline-none"
          >
            {data.tag || '17'}
          </span>
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
  const { data, index, slideCount, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
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
  const { data, index, slideCount, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
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
        <div className="h-[55%] flex flex-col justify-center p-8 bg-white min-h-0">
          <div className="mb-3 shrink-0 mt-4">
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
  const { data, index, slideCount, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
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
      <div className="h-[50%] w-full p-8 flex flex-col justify-center text-center relative z-10" style={{ backgroundColor: brandColor }}>
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1a1a1a] text-white px-6 py-4 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] z-[70] border-[4px] rotate-3" style={{ borderColor: brandColor }}>
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
  const { data, index, slideCount, brandHandle, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
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
      <div className="h-[55%] w-full p-8 flex flex-col justify-center relative z-10 border-b-[6px] border-white" style={{ backgroundColor: brandColor }}>
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
  const { data, index, slideCount, brandHandle, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
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
              style={{fontFamily: titleFont,  color: brandColor }}
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
        <div className="absolute bottom-0 right-0 w-[90%] h-[90%] z-0 border-4 border-white shadow-lg" style={{fontFamily: textFont,  backgroundColor: brandColor }}></div>
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
  const { data, index, slideCount, brandHandle, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
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
      <div className="w-full h-[40%] flex flex-col justify-center p-8 relative z-10 shadow-lg" style={{ backgroundColor: brandColor }}>
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
      <div className="flex-1 w-full flex flex-col relative">
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
        <div className="w-full shrink-0 px-8 pb-8 flex" style={{ height: 'calc(50% + 60px)', fontFamily: textFont,  transform: 'translateY(35px)' }}>
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
  const { data, index, slideCount, brandHandle, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
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
        <SmartField field="imagem" {...sp} className="flex-1 rounded-3xl overflow-hidden shadow-2xl my-6 relative bg-zinc-200" style={{ width: 'calc(100% + 10px)', marginLeft: '-5px' }}>
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>
      </div>
      <div className="w-[45%] h-full flex flex-col justify-center p-10 shrink-0 relative z-10 shadow-[-20px_0_50px_rgba(0,0,0,0.1)]" style={{ backgroundColor: brandColor }}>
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
// VARIANTE 64 — BLOCK TEXT BRAND
// ═══════════════════════════════════════════════════════════
export function SplitVariant64(props) {
  const { data, index, slideCount, brandHandle, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col p-8 overflow-hidden relative" style={{fontFamily: titleFont,  backgroundColor: brandColor }}>
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

      <div className="w-full shrink-0 z-10 relative" style={{ height: 'calc(35% + 40px)', fontFamily: textFont,  transform: 'translateY(-20px)' }}>
        <SmartField field="imagem" {...sp} className="w-full h-full bg-white rounded-[32px] shadow-2xl relative overflow-hidden border-4 border-white/20">
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
  const { data, index, slideCount, brandHandle, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col p-10 overflow-hidden relative bg-white" style={{ borderTop: `10px solid ${brandColor}`, borderBottom: `10px solid ${brandColor}` }}>
      <SlideHeader 
        {...props} 
        slideIndex={index} 
        index={index + 1} 
        total={slideCount} 
        brandAvatar={brandAvatar}
        brandColor={brandColor}
        hideDot={true} 
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
      
      <div className="w-full h-[175px] bg-zinc-100 rounded-3xl overflow-hidden relative shadow-inner shrink-0 flex">
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
  const { data, index, slideCount, brandHandle, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
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
        
        <div className="w-full h-[210px] bg-zinc-100 rounded-2xl overflow-hidden relative border border-zinc-200 shrink-0">
          <SmartField field="imagem" {...sp} className="w-full h-full">
            <ImageBg data={data} className="absolute inset-0" />
          </SmartField>
        </div>
      </div>
      
      <div className="w-16 h-full shrink-0 flex flex-col items-center justify-center relative select-none pointer-events-none" style={{fontFamily: textFont,  backgroundColor: brandColor }}>
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
  const { data, index, slideCount, brandHandle, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
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
      <div className="w-full h-[45%] p-8 flex flex-col justify-center relative z-20 shrink-0" style={{fontFamily: textFont,  backgroundColor: brandColor }}>
        <div className="mt-6">
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
      
      <div className="flex-1 w-full p-10 flex flex-col justify-center relative z-10 bg-white">
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
        <div className="w-full aspect-video bg-zinc-100 rounded-[32px] overflow-hidden relative border-2 border-zinc-50 shrink-0 -translate-y-[18px]">
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
  const { data, index, slideCount, brandHandle, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
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
      <div className="w-full h-[45%] flex flex-col justify-center p-8 relative z-10 bg-zinc-50 border-b-[16px] shrink-0" style={{fontFamily: textFont,  borderColor: brandColor }}>
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
  const { data, index, slideCount, brandHandle, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col p-8 relative" style={{fontFamily: textFont,  backgroundColor: brandColor }}>
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
        <SmartField field="imagem" {...sp} className="w-full h-full bg-zinc-900 rounded-[24px] overflow-hidden relative border-[6px] border-white">
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
  const { data, index, slideCount, brandHandle, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
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
        
        <div className="border-l-4 pl-4" style={{fontFamily: textFont,  borderColor: brandColor }}>
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
      
      <div className="h-[45%] w-full relative z-0 shrink-0">
        <SmartField field="imagem" {...sp} className="w-full h-full block">
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>
        <div className="absolute top-0 left-0 w-full h-4 z-50" style={{fontFamily: textFont,  backgroundColor: brandColor }}></div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 71 — Author Bottom Image
// Header + Avatar/Texto no topo + Imagem na base.
// ═══════════════════════════════════════════════════════════
export function SplitVariant71(props) {
  const { data, index, slideCount, brandHandle, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
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
            <img src={brandAvatar || ""} className="w-full h-full object-cover" alt="Avatar"/>
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
      <div className="flex-1 w-full relative z-0 flex">
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
  const { data, index, slideCount, brandHandle, brandColor, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
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
              className="font-bold text-[10px] tracking-widest text-zinc-400 uppercase font-tag outline-none"
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
              style={{ color: brandColor, fontSize: `${42 * sTitle}px` }}
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
              className="text-[#1a1a1a] font-bold leading-snug font-text outline-none"
              style={{ fontSize: `${15 * sText}px` }}
            >
              {data.texto_apoio}
            </p>
          </SmartField>
        </div>
      </div>
      <SmartField field="imagem" {...sp} className="w-[85%] h-[40%] rounded-tr-[50px] rounded-bl-[50px] overflow-hidden shadow-2xl shrink-0 bg-zinc-200 relative ml-auto border-4 mt-4" style={{ borderColor: brandColor }}>
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
  const { data, index, slideCount, brandColor, brandAvatar, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
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
      <div className="flex-1 flex flex-col p-8 pt-10 justify-center relative border-b-8 border-white" style={{fontFamily: titleFont,  backgroundColor: brandColor }}>
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
            <img src={brandAvatar || ""} className="w-full h-full object-cover" alt="Avatar"/>
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
      <div className="w-full h-[45%] shrink-0 relative bg-zinc-200 flex">
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
  const { data, index, slideCount, brandHandle, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
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
      <div className="w-full h-[50%] shrink-0 relative bg-zinc-200 mt-2 z-0">
        <SmartField field="imagem" {...sp} className="w-full h-full">
          <ImageBg data={data} className="absolute inset-0" />
        </SmartField>
      </div>

      {/* Camada de Overlay para Elementos que devem flutuar sobre tudo */}
      <div className="absolute inset-0 pointer-events-none z-[1000]">
        <div className="absolute left-8 bottom-[calc(50%-20px-8px)] pointer-events-auto p-2 rounded-2xl shadow-xl flex items-center gap-3" style={{fontFamily: titleFont,  backgroundColor: brandColor }}>
          <div className="w-10 h-10 rounded-xl bg-zinc-300 overflow-hidden shrink-0 border-2" style={{ borderColor: brandColor }}>
            <img src={brandAvatar || ""} className="w-full h-full object-cover" alt="Avatar"/>
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
  const { data, index, slideCount, brandAvatar, brandColor, titleScale, textScale, showMetrics, onActionStart, onTextChange, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="w-full h-full flex flex-col bg-zinc-50 p-6 relative" style={{ borderBottom: `10px solid ${brandColor}` }}>
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
            <img src={brandAvatar || ""} className="w-full h-full object-cover" alt="Avatar"/>
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
      <SmartField field="imagem" {...sp} className="w-full h-[45%] rounded-[24px] overflow-hidden mt-4 shrink-0 relative bg-zinc-200 shadow-md">
        <ImageBg data={data} className="absolute inset-0" />
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
};

export const SPLIT_VARIANT_META = [
  { id: 0, name: 'Original', description: 'Layout padrão com imagem arredondada', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split0.png' },
  { id: 1, name: 'Hero Top', description: 'Imagem grande superior + texto abaixo', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split1.png' },
  { id: 2, name: 'Side Split', description: 'Imagem lateral + texto na direita', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split2 (1).png' },
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
  { id: 32, name: 'Brand Base Split', description: 'Imagem superior 50% + base sólida da cor da marca 50%', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split32.png' },
  { id: 33, name: 'Side Brand Panel', description: 'Imagem lateral 75% + painel lateral da cor da marca 25%', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split33.png' },
  { id: 34, name: 'Brand Window', description: 'Imagem emoldurada em janela central sobre fundo de marca', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split34.png' },
  { id: 35, name: 'Brand Base Solid', description: 'Variante de contraste puro com base sólida da cor da marca', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split35.png' },
  { id: 36, name: 'Image In Brand', description: 'Imagem emoldurada por cor sólida com texto na base', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split36.png' },
  { id: 37, name: 'Corte Vertical', description: 'Bloco de cor esquerdo com impacto fotográfico', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split37.png' },
  { id: 38, name: 'Imagem no Topo', description: 'Corte horizontal perfeito entre imagem e fundo limpo', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split38.png' },
  { id: 39, name: 'Branco e Puro', description: 'Caixa branca rigorosa com imagem enquadrada', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split39.png' },
  { id: 40, name: 'Foco Superior', description: 'Foco superior com base sólida da marca', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split40.png' },
  { id: 41, name: 'Enquadramento', description: 'Lateral sólida de cor pura que emoldura o produto', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split41.png' },
  { id: 42, name: 'Geometria Pura', description: 'Intersecção entre imagem e identidade geométrica', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split42.png' },
  { id: 43, name: 'Massive Frame', description: 'Moldura robusta com produto centralizado', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split43.png' },
  { id: 44, name: 'Full Bleed Base', description: 'Imagem no topo com base de texto sólida', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split44.png' },
  { id: 45, name: 'Framed Hero', description: 'Imagem emoldurada no centro superior', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split45.png' },
  { id: 46, name: 'Card Ascend', description: 'Texto sobreposto à imagem com profundidade', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split46.png' },
  { id: 47, name: 'Author Top', description: 'Layout editorial com avatar e handle', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split47.png' },
  { id: 48, name: 'Profile Cover', description: 'Imagem de topo com avatar flutuante', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split48.png' },
  { id: 49, name: 'Hero Shot Profile', description: 'Imagem de topo com base na cor da marca e avatar', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split49.png' },
  { id: 50, name: 'Author Badge Top', description: 'Imagem de topo com badge de autor flutuante', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split50.png' },
  { id: 51, name: 'Author Minimal Split', description: 'Imagem em card arredondado com avatar e tag minimalista', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split51.png' },
  { id: 52, name: 'Author Floating', description: 'Imagem flutuante centralizada com avatar e texto em destaque', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split52.png' },
  { id: 53, name: 'Sharp Brand Split', description: 'Divisão precisa entre imagem e cor da marca', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split53.png' },
  { id: 54, name: 'Modernist Top', description: 'Design minimalista com foco na imagem superior', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split54.png' },
  { id: 55, name: 'Solid Brand Top', description: 'Bloco sólido de cor da marca no topo', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split55.png' },
  { id: 56, name: 'Brand Card Overlay', description: 'Cartão brutalista sobreposto a imagem', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split56.png' },
  { id: 57, name: 'Massive Brand Top', description: 'Topo massivo de cor da marca (60%)', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split57.png' },
  { id: 58, name: 'Brand Sidebar Reverse', description: 'Barra lateral sólida com conteúdo à direita', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split58.png' },
  { id: 59, name: 'Brand Stamp Drop', description: 'Topo de cor da marca com selo central', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split59.png' },
  { id: 60, name: 'Hard Solid Top', description: 'Fundo de cor sólida marcante com linha de corte exata', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split60.png' },
  { id: 61, name: 'Solid Rigid Drop', description: 'Estrutura rígida onde a tipografia engole a área nobre', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split61.png' },
  { id: 62, name: 'Brand Header Sharp', description: 'Topo massivo que garante a força da marca', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split62.png' },
  { id: 63, name: 'Inverted Brand Sidebar', description: 'Texto ancorado à direita em um bloco de cor impenetrável', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split63.png' },
  { id: 64, name: 'Block Text Brand', description: 'O conteúdo domina 80% da tela com janela técnica', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split64.png' },
  { id: 65, name: 'Floating Text Brand', description: 'O texto flutua com autoridade sobre um campo de cor puro', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split65.png' },
  { id: 66, name: 'Brand Pillar Text', description: 'O texto é ancorado por um pilar lateral de cor sólida', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split66.png' },
  { id: 67, name: 'Offset Brand Header', description: 'Cabeçalho massivo com deslocamento técnico', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split67.png' },
  { id: 68, name: 'Cinematic Base', description: 'Base fotográfica com tipografia editorial superior', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split68.png' },
  { id: 69, name: 'Brutal Offset', description: 'Layout brutalista com janela de imagem deslocada', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split69.png' },
  { id: 70, name: 'Clean Inject', description: 'Design limpo com injeção de cor na base técnica', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split70.png' },
  { id: 71, name: 'Author Bottom Image', description: 'Avatar e texto no topo com imagem na base', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split71.png' },
  { id: 72, name: 'Author Split Bottom', description: 'Texto no topo com imagem deslocada na base', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split72.png' },
  { id: 73, name: 'Author Edge Bot', description: 'Texto sobre cor da marca com imagem na base', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split73.png' },
  { id: 74, name: 'Author Badge Bottom', description: 'Texto no topo com imagem e badge de autor', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split74-cop.png' },
  { id: 75, name: 'Author Modern Reverse', description: 'Texto no topo com avatar e imagem arredondada', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/designs_split75.png' },
];



