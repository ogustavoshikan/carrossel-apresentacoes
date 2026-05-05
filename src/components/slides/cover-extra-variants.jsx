import React from 'react';
import { BadgeCheck, ArrowRight, Sparkles, MoveUpRight, Quote } from 'lucide-react';
import { Image as ImageIcon } from 'lucide-react';
import SmartElement from '../smart-element';
import SlideHeader from '../slide-header';

// ============================================================
// CARROSSEL STUDIO — COVER EXTRA VARIANTS (101-104)
// Capas extras com estilos, fontes e layouts alternativos.
// Cada variante recebe as mesmas props do SlideCover.
// IDs: 101+ para não colidir com COVER_VARIANT_COMPONENTS.
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
          backgroundPosition: `${data.imagePositionX ?? 50}% ${data.imagePosition ?? 50}%`,
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
// EXTRA VARIANTE 101 — Moldura Editorial
// Foco em elegância de revista. Margens grossas e texto vazando.
// Background claro [#EBE9E1], fonte Playfair, texto "TOP 5" em destaque
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant101({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#EBE9E1] overflow-hidden flex flex-col p-4">
      {/* Moldura interna decorativa */}
      <div className="absolute inset-0 border-[16px] border-[#EBE9E1] z-20 pointer-events-none" />
      <div
        className="absolute inset-4 border z-20 pointer-events-none"
        style={{ borderColor: `${brandColor}33` }}
      />

      {/* Imagem superior (65%) */}
      <div className="relative w-full h-[65%] overflow-hidden rounded-t-sm shrink-0">
        <ImageBg data={data} className="absolute inset-0" />
      </div>

      {/* Bloco de texto inferior */}
      <div className="relative flex-1 bg-[#EBE9E1] pt-6 pb-2 flex flex-col justify-between z-30">
        {/* Título de impacto — vaza para cima sobre a imagem */}
        <SmartField field="titulo" {...sp}>
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-playfair font-black text-[#1a1a1a] leading-[0.8] tracking-tighter absolute -top-[18px] left-2 drop-shadow-xl outline-none"
            style={{ fontSize: `${85 * sTitle}px` }}
          >
            {data.titulo || 'TOP 5'}
          </h2>
        </SmartField>

        <SmartField field="texto_apoio" {...sp}>
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-outfit text-zinc-600 font-medium text-[11px] max-w-[160px] uppercase tracking-widest mt-8 ml-3 leading-relaxed outline-none break-words"
            style={{ fontSize: '11px' }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>

        <div className="flex justify-between items-end px-3">
          <span className="font-outfit font-bold text-[9px] text-[#1a1a1a] uppercase tracking-[0.2em] opacity-60">
            @{brandHandle || 'seuhandle'}
          </span>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
            style={{ backgroundColor: brandColor }}
          >
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* SlideHeader invisível (para manter compatibilidade) */}
      <SlideHeader
        data={data} slideIndex={index} index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={false}
        showSlideCounter={false}
        brandAvatar={brandAvatar} brandColor={brandColor} isVerified={isVerified}
        brandLogo={brandLogo} showBrandLogo={showBrandLogo}
        onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        hideDot={true}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// EXTRA VARIANTE 102 — Swiss Vertical
// Layout assimétrico. Forte contraste lateral. Design de poster europeu.
// Fundo escuro, faixa lateral colorida com título rotacionado 90°
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant102({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#1a1a1a] overflow-hidden flex">
      {/* Faixa lateral esquerda colorida (32%) */}
      <div
        className="w-[32%] h-full flex flex-col justify-between relative z-10 border-r border-[#1a1a1a]/20"
        style={{ backgroundColor: brandColor }}
      >
        <div className="p-4">
          {isVerified && <BadgeCheck className="w-5 h-5 text-white/90" />}
        </div>

        {/* Título rotacionado 90° */}
        <SmartField field="titulo" {...sp}>
          <div className="absolute bottom-6 left-6 w-[300px] origin-bottom-left -rotate-90">
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-outfit font-black text-[#EBE9E1] tracking-tighter whitespace-nowrap leading-none outline-none"
              style={{ fontSize: `${51 * sTitle}px` }}
            >
              {data.titulo || 'TOP 5'}
            </h2>
          </div>
        </SmartField>

        <span className="font-outfit font-bold text-white/40 text-[8px] tracking-[0.4em] uppercase absolute top-6 left-1/2 -translate-x-1/2 rotate-90 origin-left">
          Deslize
        </span>
      </div>

      {/* Imagem à direita (68%) */}
      <div className="w-[68%] h-full relative overflow-hidden">
        <ImageBg data={data} className="absolute inset-0" />
        <div
          className="absolute inset-0 bg-gradient-to-r to-transparent mix-blend-multiply"
          style={{ backgroundImage: `linear-gradient(to right, ${brandColor}33, transparent)` }}
        />
      </div>

      {/* Handle badge no topo direito */}
      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/10 z-20">
        <span className="font-outfit text-[8px] text-white tracking-[0.2em] uppercase font-bold">
          @{brandHandle || 'seuhandle'}
        </span>
      </div>

      {/* SlideHeader invisível */}
      <SlideHeader
        data={data} slideIndex={index} index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={false}
        showSlideCounter={false}
        brandAvatar={brandAvatar} brandColor={brandColor} isVerified={isVerified}
        brandLogo={brandLogo} showBrandLogo={showBrandLogo}
        onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        hideDot={true}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// EXTRA VARIANTE 103 — Ingresso Premium (Ticket)
// Imagem inteira com card flutuante estilo ticket.
// Fundo escuro, card bicolor com divisória pontilhada
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant103({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      {/* Imagem de fundo com overlay */}
      <ImageBg data={data} className="absolute inset-0 opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/40 to-transparent" />

      {/* Handle no topo centralizado */}
      <div className="absolute top-6 w-full flex justify-center z-10 opacity-80">
        <span className="font-outfit font-bold text-white text-[9px] tracking-[0.3em] uppercase bg-black/40 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
          @{brandHandle || 'seuhandle'}
        </span>
      </div>

      {/* O Ticket Card */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[88%] bg-[#EBE9E1] rounded-xl p-0 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex overflow-hidden z-10">
        {/* Lado esquerdo colorido — CTA rotacionado */}
        <div
          className="w-[22%] flex flex-col justify-center items-center relative py-6"
          style={{ backgroundColor: brandColor }}
        >
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#1a1a1a] rounded-full" />
          <span className="font-outfit font-bold text-white text-[10px] tracking-widest uppercase -rotate-90 whitespace-nowrap">
            Deslize <ArrowRight className="w-3 h-3 inline-block rotate-90 ml-1" />
          </span>
        </div>

        {/* Lado direito — conteúdo do ticket */}
        <div
          className="w-[78%] p-5 relative bg-white border-l-2 border-dashed"
          style={{ borderColor: `${brandColor}33` }}
        >
          <div className="absolute -top-3 -left-3 w-6 h-6 bg-[#1a1a1a] rounded-full" />
          <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-[#1a1a1a] rounded-full" />

          <div className="flex items-center gap-1 mb-2">
            <Sparkles className="w-3 h-3" style={{ color: brandColor }} />
            <span
              className="font-outfit font-bold text-[8px] tracking-[0.2em] uppercase"
              style={{ color: brandColor }}
            >
              Seleção Exclusiva
            </span>
          </div>

          <SmartField field="titulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-playfair font-black text-[#1a1a1a] leading-none mb-3 outline-none"
              style={{ fontSize: `${53 * sTitle}px` }}
            >
              {data.titulo || 'TOP 5'}
            </h2>
          </SmartField>

          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-outfit text-zinc-500 text-[10px] uppercase tracking-wide leading-snug font-medium outline-none break-words max-w-full"
              style={{ fontSize: '10px' }}
            >
              {data.texto_apoio}
            </p>
          </SmartField>
        </div>
      </div>

      {/* SlideHeader invisível */}
      <SlideHeader
        data={data} slideIndex={index} index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={false}
        showSlideCounter={false}
        brandAvatar={brandAvatar} brandColor={brandColor} isVerified={isVerified}
        brandLogo={brandLogo} showBrandLogo={showBrandLogo}
        onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        hideDot={true}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// EXTRA VARIANTE 104 — Grid Tipográfico
// Divide a tela de forma matemática. Muito moderno, foto menor.
// Background claro, borda colorida, grid 2x3
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant104({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div
      className="relative w-full h-full bg-[#EBE9E1] overflow-hidden flex flex-col p-4 border-[6px]"
      style={{ borderColor: brandColor }}
    >
      {/* Header com handle */}
      <div className="flex justify-between items-center px-2 pt-1 pb-3">
        <span
          className="font-outfit font-black text-[11px] tracking-widest uppercase"
          style={{ color: brandColor }}
        >
          @{brandHandle || 'seuhandle'}
        </span>
      </div>

      {/* Grid principal */}
      <div className="w-full flex-1 grid grid-cols-2 grid-rows-3 gap-3 min-h-0">
        {/* Imagem principal — ocupa 2 cols × 2 rows */}
        <div className="col-span-2 row-span-2 rounded-xl overflow-hidden relative shadow-inner ring-1 ring-black/5">
          <ImageBg data={data} className="absolute inset-0" />
        </div>

        {/* Bloco de título com brandColor */}
        <div
          className="rounded-xl flex items-center justify-center p-4 relative overflow-hidden shadow-md"
          style={{ backgroundColor: brandColor }}
        >
          <div className="absolute -right-4 -bottom-4 opacity-20">
            <BadgeCheck className="w-24 h-24 text-white" />
          </div>
          <SmartField field="titulo" {...sp} className="relative z-10">
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-playfair italic font-bold text-[#EBE9E1] relative z-10 outline-none leading-none"
              style={{ fontSize: `${45 * sTitle}px` }}
            >
              {data.titulo || 'Top 5'}
            </h2>
          </SmartField>
        </div>

        {/* Bloco de ação escuro */}
        <div className="bg-[#1a1a1a] rounded-xl p-4 flex flex-col justify-between shadow-md">
          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-outfit text-[#EBE9E1]/80 font-medium uppercase tracking-widest leading-relaxed outline-none break-words max-w-full"
              style={{ fontSize: '10px' }}
            >
              {data.texto_apoio}
            </p>
          </SmartField>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center self-end"
            style={{ backgroundColor: '#EBE9E1' }}
          >
            <ArrowRight className="w-4 h-4 text-[#1a1a1a]" />
          </div>
        </div>
      </div>

      {/* SlideHeader invisível */}
      <SlideHeader
        data={data} slideIndex={index} index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={false}
        showSlideCounter={false}
        brandAvatar={brandAvatar} brandColor={brandColor} isVerified={isVerified}
        brandLogo={brandLogo} showBrandLogo={showBrandLogo}
        onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        hideDot={true}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// EXTRA VARIANTE 105 — O Arco Clássico
// Arquitetura pura. O arco traz uma suavidade que contrasta com a tipografia dura.
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant105({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#EBE9E1] overflow-hidden flex flex-col p-5">
      <div className="flex justify-between items-center w-full z-20 mb-4 px-1">
        <span className="font-outfit font-bold tracking-[0.2em] text-[9px] text-[#1a1a1a] uppercase">@{brandHandle || 'seuhandle'}</span>
        {isVerified && <BadgeCheck className="w-4 h-4" style={{ color: brandColor }} />}
      </div>

      <div className="w-full flex-1 relative flex flex-col items-center min-h-0">
        {/* O Arco */}
        <div className="w-[90%] h-[75%] rounded-t-[1000px] overflow-hidden relative shadow-inner ring-1 ring-black/10 shrink-0">
          <ImageBg data={data} className="absolute inset-0" />
        </div>
        
        {/* Título Sobreposto */}
        <div className="absolute bottom-10 w-full flex flex-col items-center text-center z-30">
          <div className="bg-[#EBE9E1] px-6 py-2 rounded-full border shadow-lg transform -translate-y-1/2" style={{ borderColor: `${brandColor}33` }}>
            <SmartField field="badge_text" {...sp}>
              <span 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
                className="font-outfit font-black text-[10px] tracking-[0.3em] uppercase outline-none" style={{ color: brandColor }}>
                {data.badge_text || 'O Supremo'}
              </span>
            </SmartField>
          </div>
          <SmartField field="titulo" {...sp}>
            <h2 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-playfair font-black text-[#1a1a1a] leading-[0.8] tracking-tighter mt-2 outline-none break-words"
              style={{ fontSize: `${85 * sTitle}px` }}>
              {data.titulo || 'TOP 5'}
            </h2>
          </SmartField>
        </div>
      </div>

      <div className="w-full pt-4 flex justify-between items-end border-t border-[#1a1a1a]/10 mt-2 px-1 pb-1">
        <SmartField field="texto_apoio" {...sp}>
          <p 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-outfit text-zinc-500 font-medium text-[9px] max-w-[140px] uppercase tracking-widest leading-relaxed outline-none break-words">
            {data.texto_apoio || 'A SELEÇÃO QUE VOCÊ MERECE'}
          </p>
        </SmartField>
        <div className="flex items-center gap-1">
          <span className="font-outfit font-bold text-[#1a1a1a] text-[9px] uppercase tracking-widest">Ver</span>
          <MoveUpRight className="w-3 h-3 text-[#1a1a1a]" />
        </div>
      </div>

      <SlideHeader
        data={data} slideIndex={index} index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={false}
        showSlideCounter={false}
        brandAvatar={brandAvatar} brandColor={brandColor} isVerified={false}
        brandLogo={brandLogo} showBrandLogo={showBrandLogo}
        onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        hideDot={true}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// EXTRA VARIANTE 106 — Split Horizontal Brutalista
// Metade imagem, metade bloco sólido. Direto ao ponto.
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant106({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#101010] overflow-hidden flex flex-col">
      <div className="h-[55%] w-full relative overflow-hidden shrink-0">
        <ImageBg data={data} className="absolute inset-0" />
        
        <div className="absolute top-5 left-5 right-5 flex justify-between items-start z-20">
          <span className="font-outfit font-bold tracking-[0.2em] text-[9px] text-white/80 uppercase px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
            @{brandHandle || 'seuhandle'}
          </span>
          {isVerified && <BadgeCheck className="w-4 h-4 text-white/80" />}
        </div>
      </div>

      <div className="h-[45%] w-full bg-[#101010] p-6 flex flex-col justify-between relative z-10 border-t-[8px]" style={{ borderTopColor: brandColor }}>
        <div className="absolute top-[42px] left-6">
          <SmartField field="titulo" {...sp}>
            <h2 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-playfair font-black text-[#EBE9E1] leading-[0.85] tracking-tighter outline-none break-words"
              style={{ fontSize: `${75 * sTitle}px` }}>
              {data.titulo || 'TOP 5'}
            </h2>
          </SmartField>
        </div>

        <div className="mt-auto w-full flex flex-col gap-4">
          <div className="w-12 h-[2px]" style={{ backgroundColor: brandColor }}></div>
          <div className="flex justify-between items-end">
            <SmartField field="texto_apoio" {...sp}>
              <p 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                className="font-outfit text-zinc-400 text-[11px] max-w-[160px] uppercase tracking-widest leading-relaxed outline-none break-words">
                {data.texto_apoio || 'A SELEÇÃO QUE VOCÊ MERECE'}
              </p>
            </SmartField>
            <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: brandColor }}>
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>

      <SlideHeader
        data={data} slideIndex={index} index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={false}
        showSlideCounter={false}
        brandAvatar={brandAvatar} brandColor={brandColor} isVerified={false}
        brandLogo={brandLogo} showBrandLogo={showBrandLogo}
        onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        hideDot={true}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// EXTRA VARIANTE 107 — O Número Gigante (Overlay)
// Tipografia atuando como textura de fundo.
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant107({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#EBE9E1] overflow-hidden flex flex-col items-center justify-center p-4">
      
      {/* Número gigante ao fundo */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
        <span className="font-playfair font-black text-[#1a1a1a] text-[35rem] leading-none opacity-[0.03] select-none -translate-y-12">
          {data.badge_text?.charAt(0) || '5'}
        </span>
      </div>

      <div className="absolute top-5 left-5 flex items-center gap-2 z-20">
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: brandColor }}></div>
        <span className="font-outfit font-bold text-[#1a1a1a] text-[9px] tracking-[0.2em] uppercase">@{brandHandle || 'seuhandle'}</span>
      </div>

      <div className="relative w-[85%] flex flex-col items-center z-10 mt-8">
        <div className="w-full aspect-square rounded-full overflow-hidden shadow-2xl ring-4 ring-white mb-6 relative z-10 shrink-0">
          <ImageBg data={data} className="absolute inset-0" />
        </div>
        
        <div className="text-center relative z-20 bg-[#EBE9E1]/80 backdrop-blur-sm px-6 py-3 rounded-2xl w-[110%]">
          <SmartField field="titulo" {...sp}>
            <h2 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-playfair font-black text-[#1a1a1a] leading-none mb-2 outline-none break-words"
              style={{ fontSize: `${45 * sTitle}px` }}>
              {data.titulo || 'O TOP 5'}
            </h2>
          </SmartField>
          <SmartField field="texto_apoio" {...sp}>
            <p 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-outfit text-zinc-500 text-[9px] uppercase tracking-[0.2em] font-bold outline-none break-words">
              {data.texto_apoio || 'ROLE PARA DESCOBRIR'}
            </p>
          </SmartField>
        </div>
      </div>

      <div className="absolute bottom-5 right-5 z-20">
         <ArrowRight className="w-5 h-5 text-[#1a1a1a]" />
      </div>

      <SlideHeader
        data={data} slideIndex={index} index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={false}
        showSlideCounter={false}
        brandAvatar={brandAvatar} brandColor={brandColor} isVerified={isVerified}
        brandLogo={brandLogo} showBrandLogo={showBrandLogo}
        onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        hideDot={true}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// EXTRA VARIANTE 108 — O Bloco Citação
// Menos é mais. Foco na autoridade, com a foto servindo apenas de base.
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant108({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col" style={{ backgroundColor: brandColor }}>
      
      <div className="absolute inset-0 h-[60%] z-0">
        <ImageBg data={data} className="absolute inset-0 mix-blend-multiply opacity-80" />
        <div className="absolute inset-0 opacity-50" style={{ background: `linear-gradient(to bottom, transparent, ${brandColor})` }} />
      </div>

      <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
        
        <div className="flex justify-between items-center w-full">
          <span className="font-outfit font-black tracking-[0.2em] text-[10px] text-white/90 uppercase border border-white/20 px-3 py-1 rounded-sm backdrop-blur-sm">
            {brandHandle || 'seuhandle'}
          </span>
          {isVerified && <BadgeCheck className="w-5 h-5 text-white/90" />}
        </div>

        <div className="bg-[#EBE9E1] rounded-xl p-6 shadow-2xl relative mt-auto">
          <div className="absolute -top-5 right-6 w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center shadow-lg">
            <Quote className="w-4 h-4 text-white" fill="currentColor" />
          </div>
          
          <SmartField field="titulo" {...sp}>
            <h2 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-playfair font-black text-[#1a1a1a] leading-[0.9] tracking-tighter mb-4 outline-none break-words"
              style={{ fontSize: `${40 * sTitle}px` }}>
              {data.titulo || 'A Seleção Top 5'}
            </h2>
          </SmartField>
          
          <SmartField field="texto_apoio" {...sp}>
            <p 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-outfit text-zinc-600 text-[12px] leading-relaxed mb-6 font-medium outline-none break-words max-w-full">
              {data.texto_apoio || 'A curadoria definitiva para quem não aceita menos que a excelência.'}
            </p>
          </SmartField>

          <div className="flex items-center gap-3 border-t border-zinc-200 pt-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${brandColor}22` }}>
              <ArrowRight className="w-4 h-4" style={{ color: brandColor }} />
            </div>
            <span className="font-outfit font-bold text-[#1a1a1a] text-[10px] uppercase tracking-widest">Deslizar</span>
          </div>
        </div>
        
      </div>

      <SlideHeader
        data={data} slideIndex={index} index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={false}
        showSlideCounter={false}
        brandAvatar={brandAvatar} brandColor={brandColor} isVerified={false}
        brandLogo={brandLogo} showBrandLogo={showBrandLogo}
        onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        hideDot={true}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MAPEAMENTO E METADADOS
// ═══════════════════════════════════════════════════════════

export const COVER_EXTRA_VARIANT_COMPONENTS = {
  101: CoverExtraVariant101,
  102: CoverExtraVariant102,
  103: CoverExtraVariant103,
  104: CoverExtraVariant104,
  105: CoverExtraVariant105,
  106: CoverExtraVariant106,
  107: CoverExtraVariant107,
  108: CoverExtraVariant108,
};

export const COVER_EXTRA_VARIANT_META = [
  {
    id: 101,
    name: 'Moldura Editorial',
    description: 'Elegância de revista com margens grossas e título vazando',
    thumbnailUrl: '',
  },
  {
    id: 102,
    name: 'Swiss Vertical',
    description: 'Layout assimétrico estilo poster europeu com faixa lateral',
    thumbnailUrl: '',
  },
  {
    id: 103,
    name: 'Ingresso Premium',
    description: 'Imagem full com card flutuante estilo ticket bicolor',
    thumbnailUrl: '',
  },
  {
    id: 104,
    name: 'Grid Tipográfico',
    description: 'Layout matemático com foto e blocos coloridos em grid',
    thumbnailUrl: '',
  },
  {
    id: 105,
    name: 'O Arco Clássico',
    description: 'Arquitetura pura. O arco traz suavidade contra a tipografia dura',
    thumbnailUrl: '',
  },
  {
    id: 106,
    name: 'Split Brutalista',
    description: 'Metade imagem, metade bloco sólido. Direto ao ponto',
    thumbnailUrl: '',
  },
  {
    id: 107,
    name: 'Número Gigante',
    description: 'Tipografia atuando como textura de fundo overlay',
    thumbnailUrl: '',
  },
  {
    id: 108,
    name: 'Bloco Citação',
    description: 'Foco na autoridade, imagem servindo como base',
    thumbnailUrl: '',
  },
];
