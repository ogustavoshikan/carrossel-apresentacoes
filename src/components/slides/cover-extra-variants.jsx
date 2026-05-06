import React from 'react';
import { BadgeCheck, ArrowRight, Sparkles, MoveUpRight, Quote, MoveRight, Maximize2, Zap, Hexagon, Component, Fingerprint, ScanLine, Store, Gem, Maximize, Layers, ListTree, ScanBarcode, Receipt, CircleDashed, Columns3, Cake, Diamond, Sparkle, CornerRightDown, ArrowDownRight, Asterisk, Plus, Shapes } from 'lucide-react';
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
      <div
        className="absolute inset-4 border z-40 pointer-events-none rounded-[10px]"
        style={{ borderColor: `${brandColor}33` }}
      />

      {/* Imagem superior (65%) */}
      <div className="relative w-full h-[65%] overflow-hidden rounded-[10px] shrink-0 z-10">
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
              style={{ fontSize: `${75 * sTitle}px` }}>
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
        <ImageBg data={data} className="absolute inset-0" />
      </div>

      <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
        
        <div className="flex justify-between items-center w-full">
          <span className="font-outfit font-black tracking-[0.2em] text-[10px] text-white/90 uppercase border border-white/20 px-3 py-1 rounded-sm backdrop-blur-sm">
            {brandHandle || 'seuhandle'}
          </span>
          {isVerified && <BadgeCheck className="w-5 h-5 text-white/90" />}
        </div>

        <div className="bg-[#EBE9E1] rounded-xl p-6 shadow-2xl relative mt-auto border-[3px]" style={{ borderColor: '#000000b8' }}>
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
// EXTRA VARIANTE 109 — The Overlap (Colunas)
// Tensão entre a imagem e o bloco de texto lateral.
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant109({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#EBE9E1] overflow-hidden flex flex-col mx-auto">
      <div className="flex flex-1 w-full h-full">
        {/* Left column */}
        <div className="w-[15%] h-full bg-[#1a1a1a] flex flex-col items-center justify-between py-8 shrink-0">
          <div className="w-1.5 h-1.5 rounded-full relative z-20" style={{ backgroundColor: brandColor }}></div>
          <SmartField field="badge_text" {...sp} className="w-max overflow-visible relative z-20">
            <span 
              contentEditable suppressContentEditableWarning
              onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="font-outfit font-bold text-white/20 text-[8px] tracking-[0.4em] uppercase -rotate-90 inline-block whitespace-nowrap min-w-max origin-center outline-none">
              {data.badge_text || 'ESTABELECIDO 2024'}
            </span>
          </SmartField>
          <div className="w-1.5 h-1.5 rounded-full relative z-20" style={{ backgroundColor: brandColor }}></div>
        </div>
        {/* Right column */}
        <div className="flex-1 relative flex flex-col p-8">
          <div className="w-full h-[60%] rounded-xl overflow-hidden shadow-xl mb-6 transform -translate-x-12 shrink-0 relative z-10">
            <ImageBg data={data} className="absolute inset-0" />
          </div>
          <div className="mt-auto">
            <SmartField field="titulo" {...sp}>
              <h2 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
                className="font-playfair font-black text-[#1a1a1a] leading-[0.8] tracking-tighter mb-4 outline-none break-words"
                style={{ fontSize: `${55 * sTitle}px` }}>
                {data.titulo || 'TOP FIVE'}
              </h2>
            </SmartField>
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="font-outfit text-zinc-400 text-[8px] uppercase tracking-widest mb-1">
                  @{brandHandle || 'seuhandle'}
                </span>
                <SmartField field="texto_apoio" {...sp}>
                  <p 
                    contentEditable suppressContentEditableWarning
                    onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                    className="font-outfit text-zinc-500 text-[10px] uppercase tracking-widest leading-relaxed max-w-[140px] outline-none break-words">
                    {data.texto_apoio || 'A SELEÇÃO QUE VOCÊ MERECE'}
                  </p>
                </SmartField>
              </div>
              <div className="p-3 rounded-lg transition-colors" style={{ backgroundColor: '#1a1a1a' }}>
                <MoveRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
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
// EXTRA VARIANTE 110 — The Fashion Headline
// Serifado pesado, foto pequena, muito "ar" (luxo).
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant110({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div 
      className="relative w-full h-full bg-[#EBE9E1] overflow-hidden flex flex-col items-center p-10 border-t-[12px]"
      style={{ borderTopColor: brandColor }}
    >
      <div className="flex items-center gap-1 mb-10">
        <span className="font-outfit font-bold text-[9px] tracking-[0.5em] uppercase" style={{ color: brandColor }}>
          @{brandHandle || 'seuhandle'}
        </span>
        {isVerified && <BadgeCheck className="w-3 h-3" style={{ color: brandColor }} />}
      </div>
      
      <SmartField field="titulo" {...sp} className="w-full text-center">
        <h2 
          contentEditable suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
          className="font-playfair font-black text-[#1a1a1a] leading-[0.7] tracking-tighter text-center mb-8 italic outline-none break-words"
          style={{ fontSize: `${80 * sTitle}px` }}>
          {data.titulo || 'Top 5'}
        </h2>
      </SmartField>
      
      <div className="w-full aspect-[4/2.8] rounded-2xl overflow-hidden shadow-2xl relative mb-10 shrink-0">
        <ImageBg data={data} className="absolute inset-0" />
        <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl"></div>
      </div>

      <div className="w-full flex justify-between items-center border-t border-zinc-300 pt-6 mt-auto">
        <SmartField field="texto_apoio" {...sp}>
          <p 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-outfit text-zinc-400 text-[9px] uppercase tracking-[0.2em] outline-none break-words">
            {data.texto_apoio || 'A SELEÇÃO QUE VOCÊ MERECE'}
          </p>
        </SmartField>
        <div className="flex gap-1 shrink-0">
          {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full" style={{ backgroundColor: brandColor }}></div>)}
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
// EXTRA VARIANTE 111 — The Geometric Inset
// Blocos de cores sólidos e recortes bruscos.
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant111({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#faf7f2] overflow-hidden flex flex-col">
      <div 
        className="absolute top-0 left-0 w-full h-[30%] p-6 flex justify-between items-start z-0"
        style={{ backgroundColor: brandColor }}
      >
        <BadgeCheck className="w-6 h-6 text-white" />
        <SmartField field="badge_text" {...sp}>
          <span 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
            className="font-outfit font-black text-white/50 text-[10px] tracking-widest uppercase outline-none break-words">
            {data.badge_text || 'EDITION 001'}
          </span>
        </SmartField>
      </div>

      <div className="relative z-10 mt-[15%] px-6 shrink-0">
        <div 
          className="w-full aspect-[4/3] rounded-xl overflow-hidden relative"
          style={{ boxShadow: `0 30px 60px ${brandColor}33, 0 0 0 4px #e6e6e5` }}
        >
          <ImageBg data={data} className="absolute inset-0" />
        </div>
      </div>

      <div className="flex-1 p-8 flex flex-col justify-end z-20">
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
             <SmartField field="titulo" {...sp} className="relative -top-10">
                <h2 
                  contentEditable suppressContentEditableWarning
                  onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
                  className="font-playfair font-black text-[#1a1a1a] leading-[0.8] tracking-tighter mb-4 outline-none break-words"
                  style={{ fontSize: `${80 * sTitle}px` }}>
                  {data.titulo || 'TOP 5'}
                </h2>
              </SmartField>             <p className="font-outfit text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-bold">
               @{brandHandle || 'seuhandle'}
             </p>
          </div>
          <div 
            className="w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all"
            style={{ borderColor: brandColor, color: brandColor }}
          >
            <Maximize2 className="w-5 h-5" />
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
// EXTRA VARIANTE 112 — The Brutalist List
// Foco total em tipografia de impacto com imagem de detalhe.
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant112({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div 
      className="relative w-full h-full overflow-hidden flex flex-col p-2"
      style={{ backgroundColor: brandColor }}
    >
      <div className="flex-1 bg-[#EBE9E1] rounded-xl p-8 flex flex-col relative overflow-hidden">
        
        <div 
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: brandColor }}
        ></div>

        <div className="flex justify-between items-center mb-12">
          <SmartField field="badge_text" {...sp}>
            <span 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="font-outfit font-black text-[#1a1a1a] text-[11px] tracking-widest uppercase border-b-2 outline-none"
              style={{ borderBottomColor: brandColor }}>
              {data.badge_text || 'MENU'}
            </span>
          </SmartField>
          <Store className="w-4 h-4" style={{ color: brandColor }} fill="currentColor" />
        </div>

        <SmartField field="titulo" {...sp}>
          <h2 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-playfair font-black text-[#1a1a1a] tracking-tighter mb-8 outline-none break-words"
            style={{ 
              fontSize: `${90 * sTitle}px`, 
              whiteSpace: 'pre-wrap', 
              lineHeight: '0.77',
              width: 'min-content',
              display: 'block'
            }}>
            {data.titulo || `OS
TOP
5.`}
          </h2>
        </SmartField>

        <div className="space-y-2 mb-10 w-full">
          <div className="h-[1px] w-full bg-[#1a1a1a]/10"></div>
          <SmartField field="texto_apoio" {...sp}>
            <p 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-outfit text-[#1a1a1a] text-[10px] font-bold tracking-[0.3em] uppercase outline-none break-words">
              {data.texto_apoio || 'A SELEÇÃO QUE VOCÊ MERECE'}
            </p>
          </SmartField>
        </div>

        <div className="mt-auto flex gap-4 items-end w-full relative z-10">
          <div className="w-24 h-24 rounded-lg overflow-hidden shadow-lg border-2 border-white ring-1 ring-black/5 relative shrink-0">
            <ImageBg data={data} className="absolute inset-0" />
          </div>
          <div className="flex-1 bg-[#1a1a1a] rounded-lg p-4 flex justify-between items-center">
            <span className="font-outfit font-bold text-white text-[10px] uppercase tracking-widest">Descobrir</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </div>
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
// MAPEAMENTO E METADADOS
// ═══════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════
// EXTRA VARIANTE 113 — The Blueprint (Linhas Arquitetônicas)
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant113({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#EBE9E1] overflow-hidden flex flex-col mx-auto border border-[#1a1a1a]/10">
      {/* Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute left-[15%] top-0 bottom-0 w-[1px] bg-[#1a1a1a]/10"></div>
        <div className="absolute left-[85%] top-0 bottom-0 w-[1px] bg-[#1a1a1a]/10"></div>
        <div className="absolute top-[20%] left-0 right-0 h-[1px] bg-[#1a1a1a]/10"></div>
        <div className="absolute top-[80%] left-0 right-0 h-[1px] bg-[#1a1a1a]/10"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full p-6 justify-between">
        <div className="flex justify-between items-center w-full">
          <SmartField field="badge_text" {...sp}>
            <span 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="font-outfit font-black text-[#1a1a1a] text-[9px] tracking-[0.4em] uppercase outline-none break-words">
              {data.badge_text || 'VOL. 01'}
            </span>
          </SmartField>
          <Store className="w-4 h-4" style={{ color: brandColor }} fill="currentColor" />
        </div>

        <div className="w-full flex-1 flex items-center justify-center py-8">
          <div className="w-[85%] aspect-square relative rounded-full overflow-hidden ring-1 ring-[#1a1a1a]/20 shadow-2xl transition-transform duration-700">
             <ImageBg data={data} className="absolute inset-0" />
             <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
          </div>
        </div>

        <div className="text-center bg-[#EBE9E1] relative z-20 py-2">
          <SmartField field="titulo" {...sp}>
            <h2 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-playfair font-black text-[#1a1a1a] leading-none tracking-tighter mb-2 outline-none break-words"
              style={{ fontSize: `${60 * sTitle}px` }}>
              {data.titulo || 'TOP 5'}
            </h2>
          </SmartField>
          <p className="font-outfit text-zinc-500 text-[9px] uppercase tracking-[0.3em] font-bold">
            @{brandHandle || 'seuhandle'}
          </p>
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
// EXTRA VARIANTE 114 — The Wax Seal (Selo de Cera)
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant114({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#1a1a1a] overflow-hidden flex flex-col items-center p-8 mx-auto">
      <div className="absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-40 pointer-events-none" style={{ backgroundColor: brandColor }}></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white blur-[80px] opacity-10 pointer-events-none"></div>

      <div className="w-full flex justify-between items-start mb-16 relative z-10">
        <Fingerprint className="w-8 h-8" strokeWidth={1} style={{ color: brandColor }} />
        <SmartField field="badge_text" {...sp}>
          <span 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
            className="font-outfit font-light text-white/50 text-[10px] tracking-[0.2em] uppercase border border-white/10 px-3 py-1 rounded-full outline-none break-words">
            {data.badge_text || 'Edição Limitada'}
          </span>
        </SmartField>
      </div>
      
      <SmartField field="titulo" {...sp}>
        <h2 
          contentEditable suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
          className="font-playfair font-normal text-[#EBE9E1] leading-[0.9] text-center mb-12 relative z-10 italic outline-none break-words"
          style={{ fontSize: `${60 * sTitle}px` }}>
          {data.titulo || 'A Seleção\nPremium.'}
        </h2>
      </SmartField>
      
      {/* O Selo (Imagem Pequena) */}
      <div className="relative z-10 mt-auto flex flex-col items-center">
        <div 
          className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-offset-4 ring-offset-[#1a1a1a] shadow-[0_0_40px_rgba(222,30,77,0.4)] mb-8 transition-transform duration-700"
          style={{ '--tw-ring-color': brandColor, boxShadow: `0 0 40px ${brandColor}66` }}
        >
          <ImageBg data={data} className="absolute inset-0" />
        </div>
        
        <div className="flex items-center gap-3">
          <span className="font-outfit font-bold text-white/80 text-[10px] uppercase tracking-widest">@{brandHandle || 'seuhandle'}</span>
          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: brandColor }}></div>
          <SmartField field="texto_apoio" {...sp}>
            <span 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-outfit font-bold text-white/80 text-[10px] uppercase tracking-widest outline-none break-words">
              {data.texto_apoio || 'Top 5'}
            </span>
          </SmartField>
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
// EXTRA VARIANTE 115 — The Gallery Crop
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant115({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#EBE9E1] overflow-hidden flex flex-col mx-auto border-8 border-white">
      <div className="h-[25%] bg-[#EBE9E1] flex flex-col justify-end p-6 relative">
        <BadgeCheck className="absolute top-4 right-4 w-5 h-5" style={{ color: brandColor }} />
        <SmartField field="titulo" {...sp}>
          <h2 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black text-[#1a1a1a] leading-none tracking-tighter uppercase outline-none break-words"
            style={{ fontSize: `${55 * sTitle}px` }}>
            {data.titulo || 'O TOP 5'}
          </h2>
        </SmartField>
      </div>
      
      <div className="h-[40%] w-full relative overflow-hidden rounded-[8px] ring-1 ring-[#1a1a1a]/10">
        <ImageBg data={data} className="absolute inset-0" />
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent mix-blend-overlay"
          style={{ backgroundImage: `linear-gradient(to right, transparent, ${brandColor}1A, transparent)` }}
        />
      </div>

      <div className="h-[35%] bg-[#EBE9E1] p-6 flex flex-col justify-between">
        <SmartField field="texto_apoio" {...sp}>
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-playfair italic text-[#1A1A1A] text-[18px] leading-snug outline-none break-words">
            {data.texto_apoio || '"A experiência definitiva que o seu final de semana exige."'}
          </p>
        </SmartField>

        <div className="flex justify-between items-end w-full">
          <span className="font-outfit font-bold text-[#1a1a1a]/50 text-[10px] uppercase tracking-[0.3em]">@{brandHandle || 'seuhandle'}</span>
          <div className="w-8 h-8 flex items-center justify-center rounded-sm transition-colors" style={{ backgroundColor: brandColor }}>
            <ArrowRight className="w-4 h-4 text-white" />
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
// EXTRA VARIANTE 116 — The Red Monolith
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant116({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col mx-auto p-4" style={{ backgroundColor: brandColor }}>
      <div className="w-full flex-1 border border-white/20 rounded-xl relative overflow-hidden flex flex-col p-6">
        
        <div className="flex justify-between items-start w-full relative z-20">
          <span className="font-outfit font-black text-white text-[11px] tracking-widest uppercase">
            @{brandHandle || 'seuhandle'}
          </span>
          <Store className="w-5 h-5 text-white/70" />
          </div>
        <div className="absolute top-[20%] right-[-10%] w-[80%] aspect-square rounded-full overflow-hidden shadow-2xl ring-8 z-10 transition-transform duration-700" style={{ '--tw-ring-color': brandColor }}>
          <ImageBg data={data} className="absolute inset-0" />
        </div>

        <div className="mt-auto relative z-20 w-[80%]">
          <SmartField field="badge_text" {...sp}>
            <div 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="bg-[#1a1a1a] text-white font-outfit text-[9px] uppercase tracking-[0.3em] font-bold px-3 py-1.5 inline-block mb-4 rounded-sm outline-none break-words">
              {data.badge_text || 'A Seleção'}
            </div>
          </SmartField>
          <SmartField field="titulo" {...sp}>
            <h2 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-playfair font-black text-white leading-[0.8] tracking-tighter drop-shadow-lg outline-none break-words"
              style={{ fontSize: `${80 * sTitle}px` }}>
              {data.titulo || 'TOP\n5.'}
            </h2>
          </SmartField>
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
// EXTRA VARIANTE 117 — The Minimalist Window
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant117({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#EBE9E1] overflow-hidden flex flex-col justify-between p-8 mx-auto ring-1 ring-black/5">
      
      <div className="flex justify-between items-start w-full relative z-20">
        <div className="flex flex-col gap-1">
          <SmartField field="badge_text" {...sp}>
            <span 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="font-outfit font-black text-[#1a1a1a] text-[10px] tracking-[0.3em] uppercase outline-none break-words">
              {data.badge_text || 'VOL. 05'}
            </span>
          </SmartField>
          <SmartField field="texto_apoio" {...sp}>
            <span 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-outfit text-zinc-500 text-[8px] tracking-[0.2em] uppercase outline-none break-words">
              {data.texto_apoio || 'Edição Limitada'}
            </span>
          </SmartField>
        </div>
        <Store className="w-4 h-4" style={{ color: brandColor }} />
        </div>
      {/* A "Janela" */}
      <div className="w-full flex justify-center items-center my-auto relative z-10">
        <div className="w-[65%] aspect-square relative overflow-hidden shadow-2xl z-10">
           <ImageBg data={data} className="absolute inset-0" />
        </div>
        {/* Moldura descentrada para criar tensão visual */}
        <div 
          className="absolute w-[65%] aspect-square border -translate-x-3 translate-y-3 z-0 pointer-events-none"
          style={{ borderColor: `${brandColor}4D` }}
        />
      </div>

      <div className="w-full flex items-end justify-between border-t border-[#1a1a1a]/10 pt-4 relative z-20">
        <div>
          <SmartField field="titulo" {...sp}>
            <h2 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-playfair font-black text-[#1a1a1a] leading-none mb-1 outline-none break-words"
              style={{ fontSize: `${40 * sTitle}px` }}>
              {data.titulo || 'O TOP 5'}
            </h2>
          </SmartField>
          <p className="font-outfit text-[#1a1a1a]/60 text-[9px] uppercase tracking-widest font-medium">@{brandHandle || 'seuhandle'}</p>
        </div>
        <div className="w-8 h-8 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center transition-colors">
          <ArrowRight className="w-4 h-4 text-[#1a1a1a]" />
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
// EXTRA VARIANTE 118 — The Diagonal Cut
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant118({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#1a1a1a] overflow-hidden flex flex-col mx-auto">
      
      {/* Metade Imagem */}
      <div className="absolute inset-0 z-0">
        <ImageBg data={data} className="absolute inset-0 opacity-80 mix-blend-luminosity" />
      </div>

      {/* Corte Diagonal em CSS puro via Polygon */}
      <div 
        className="absolute inset-0 z-10 [clip-path:polygon(0_70%,100%_55%,100%_100%,0_100%)] flex flex-col justify-end p-6"
        style={{ backgroundColor: brandColor }}
      >        <div className="flex flex-col relative z-20">
          <SmartField field="badge_text" {...sp}>
            <span 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="font-outfit font-black text-white/90 text-[10px] tracking-[0.3em] uppercase mb-2 outline-none break-words">
              {data.badge_text || 'A Seleção Definitiva'}
            </span>
          </SmartField>
          <SmartField field="titulo" {...sp}>
            <h2 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-playfair font-black text-[#EBE9E1] leading-[0.8] tracking-tighter mb-4 outline-none break-words"
              style={{ fontSize: `${75 * sTitle}px` }}>
              {data.titulo || 'TOP 5'}
            </h2>
          </SmartField>
          <div className="flex items-center gap-3 w-fit bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
            <span className="font-outfit font-bold text-white text-[10px] uppercase tracking-widest">Deslizar</span>
            <MoveRight className="w-3 h-3 text-white" />
          </div>
        </div>
      </div>

      {/* Header sobre a imagem */}
      <div className="relative z-20 flex justify-between items-start p-6 w-full">
        <span className="font-outfit font-bold tracking-[0.2em] text-[9px] text-[#EBE9E1] uppercase bg-black/40 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
          @{brandHandle || 'seuhandle'}
        </span>
        <Store className="w-5 h-5 text-white/80" />
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
// EXTRA VARIANTE 119 — The Magazine Overlay
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant119({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#EBE9E1] overflow-hidden flex flex-col mx-auto ring-1 ring-black/10">
      
      <div className="absolute inset-0 z-0">
        <ImageBg data={data} className="absolute inset-0" />
        <div className="absolute inset-0 bg-[#EBE9E1]/20 mix-blend-color" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent via-[10%] to-black" />
      </div>

      <div className="relative z-20 flex-1 flex flex-col justify-between p-6">
        <div className="flex justify-between items-center w-full">
          <Store className="w-5 h-5 text-white" />
          <SmartField field="badge_text" {...sp}>
            <span 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="font-outfit font-bold text-white text-[9px] tracking-[0.3em] uppercase outline-none break-words">
              {data.badge_text || 'Editorial'}
            </span>
          </SmartField>
        </div>

        <div className="w-full flex flex-col items-center text-center pb-2">
          <span 
            className="text-white font-outfit font-bold px-3 py-1 rounded-full text-[9px] tracking-widest uppercase mb-4 shadow-lg"
            style={{ backgroundColor: brandColor }}
          >
            @{brandHandle || 'seuhandle'}
          </span>
          <SmartField field="titulo" {...sp}>
            <h3 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-playfair italic font-medium text-[#EBE9E1] leading-snug mb-4 px-4 outline-none break-words"
              style={{ fontSize: `${45 * sTitle}px` }}>
              {data.titulo || 'A curadoria perfeita para o seu final de semana.'}
            </h3>
          </SmartField>
          <div className="w-12 h-[1px] bg-white/40 mb-4"></div>
          <div className="flex items-center gap-2">
            <SmartField field="texto_apoio" {...sp} className="relative -top-[2px]">
              <span 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                className="font-outfit font-bold text-white/80 text-[10px] uppercase tracking-widest outline-none break-words">
                {data.texto_apoio || 'Ler Artigo'}
              </span>
            </SmartField>
            <ArrowRight className="w-4 h-4 text-white" />
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
// EXTRA VARIANTE 120 — The Spec Sheet
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant120({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#EBE9E1] overflow-hidden flex flex-col mx-auto p-4 ring-1 ring-black/10">
      <div className="w-full h-full border border-[#1a1a1a]/20 rounded-xl flex flex-col overflow-hidden relative z-10">
        
        {/* Imagem Superior */}
        <div className="w-full h-[55%] relative overflow-hidden border-b border-[#1a1a1a]/20 shrink-0">
          <ImageBg data={data} className="absolute inset-0" />
          <div className="absolute top-4 right-4 bg-[#EBE9E1] px-2 py-1 flex items-center justify-center rounded shadow-sm">
             <Store className="w-4 h-4 text-[#1a1a1a]" />
          </div>
          </div>
        {/* Grelha de Dados (Ficha Técnica) */}
        <div className="flex-1 bg-[#EBE9E1] grid grid-cols-2 grid-rows-3 relative">
          <div className="col-span-2 row-span-1 border-b border-[#1a1a1a]/10 flex items-center px-4 justify-between bg-[#1a1a1a] text-[#EBE9E1]">
             <span className="font-outfit font-bold text-[10px] tracking-[0.2em] uppercase">Ref: {(brandHandle || 'seuhandle').substring(0, 10)}</span>
             <SmartField field="badge_text" {...sp}>
               <span 
                 contentEditable suppressContentEditableWarning
                 onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
                 className="font-outfit font-black text-[10px] tracking-widest uppercase outline-none break-words"
                 style={{ color: brandColor }}>
                 {data.badge_text || 'Série TOP 5'}
               </span>
             </SmartField>
          </div>
          
          <div className="col-span-1 row-span-1 border-b border-r border-[#1a1a1a]/10 flex flex-col justify-center px-4">
             <span className="font-outfit text-zinc-400 text-[8px] uppercase tracking-widest">Padrão</span>
             <span className="font-playfair font-bold text-[#1a1a1a] text-[16px]">Premium</span>
          </div>
          <div 
            className="col-span-1 row-span-1 border-b border-[#1a1a1a]/10 flex flex-col justify-center px-4"
            style={{ backgroundColor: `${brandColor}0D` }} 
          >
             <span className="font-outfit text-zinc-400 text-[8px] uppercase tracking-widest">Edição</span>
             <SmartField field="texto_apoio" {...sp}>
               <span 
                 contentEditable suppressContentEditableWarning
                 onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                 className="font-playfair font-bold text-[16px] outline-none break-words"
                 style={{ color: brandColor }}>
                 {data.texto_apoio || 'Fim de Semana'}
               </span>
             </SmartField>
          </div>
          
          <div className="col-span-2 row-span-1 flex items-center justify-between px-4 pb-1">
             <SmartField field="titulo" {...sp}>
               <h2 
                 contentEditable suppressContentEditableWarning
                 onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
                 className="font-playfair font-black text-[#1a1a1a] leading-none outline-none break-words"
                 style={{ fontSize: `${30 * sTitle}px` }}>
                 {data.titulo || 'A Seleção.'}
               </h2>
             </SmartField>
             <div className="w-8 h-8 rounded-full border border-[#1a1a1a] flex items-center justify-center shrink-0">
               <ArrowRight className="w-4 h-4 text-[#1a1a1a]" />
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
// EXTRA VARIANTE 121 — The Editorial Split
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant121({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#EBE9E1] overflow-hidden flex mx-auto ring-1 ring-black/5">
      
      {/* Barra Lateral Brutalista */}
      <div 
        className="w-[15%] h-full border-r border-[#1a1a1a]/10 flex flex-col items-center py-6 justify-between relative z-10 shrink-0"
        style={{ backgroundColor: brandColor }}
      >
        <BadgeCheck className="w-5 h-5 text-white" />
        <div className="h-full flex items-center justify-center">
          <SmartField field="badge_text" {...sp}>
            <span 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
              className="inline-block min-w-max font-outfit font-black text-white/80 text-[10px] tracking-[0.4em] uppercase -rotate-90 whitespace-nowrap outline-none origin-center translate-x-[2px]">
              {data.badge_text || 'Vol. 08'}
            </span>
          </SmartField>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 h-full relative p-6 flex flex-col justify-between overflow-hidden">
        
        <div className="flex justify-end w-full relative z-20">
          <Store className="w-5 h-5 text-[#1a1a1a]/40" />
        </div>

        {/* Imagem Descentrada */}
        <div className="absolute right-[25px] top-[15%] w-[85%] aspect-square bg-zinc-200 shadow-2xl z-10 rounded-[20px] overflow-hidden">
          <ImageBg data={data} className="absolute inset-0" />
        </div>

        {/* Tipografia Sobreposta */}
        <div className="relative z-20 mt-auto pb-4">
          <SmartField field="titulo" {...sp}>
            <h2 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-playfair font-black text-[#1a1a1a] leading-[0.8] tracking-tighter drop-shadow-[0_5px_15px_rgba(235,233,225,0.8)] outline-none break-words"
              style={{ fontSize: `${80 * sTitle}px` }}>
              {data.titulo || 'TOP 5'}
            </h2>
          </SmartField>
          <div className="mt-6 flex items-center justify-between">
            <span className="font-outfit font-bold text-[#1a1a1a] text-[9px] uppercase tracking-widest bg-white/50 backdrop-blur-md px-3 py-1 rounded-full">
              @{brandHandle || 'seuhandle'}
            </span>
            <ArrowRight className="w-4 h-4" style={{ color: brandColor }} />
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
// EXTRA VARIANTE 122 — The Void Circle
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant122({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#0a0a0a] overflow-hidden flex flex-col justify-between p-6 mx-auto border border-white/5">
      
      <div className="flex justify-between items-start w-full relative z-20">
        <SmartField field="badge_text" {...sp}>
          <span 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
            className="font-outfit font-bold text-white/60 text-[9px] tracking-[0.3em] uppercase outline-none break-words">
            {data.badge_text || 'Especial'}
          </span>
        </SmartField>
        <CircleDashed className="w-4 h-4 animate-[spin_10s_linear_infinite]" style={{ color: brandColor }} />
      </div>

      {/* O Círculo Central */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] aspect-square rounded-full overflow-hidden ring-1 ring-white/10 shadow-2xl z-10"
      >
        <ImageBg data={data} className="absolute inset-0 opacity-80" />
      </div>

      {/* Tipografia Flutuante */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-20 pointer-events-none">
        <SmartField field="titulo" {...sp}>
          <h2 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-playfair italic font-medium text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] pointer-events-auto outline-none break-words"
            style={{ fontSize: `${50 * sTitle}px` }}>
            {data.titulo || 'A Seleção'}
          </h2>
        </SmartField>
      </div>

      <div className="w-full flex justify-between items-end relative z-20">
        <SmartField field="texto_apoio" {...sp}>
          <div 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-outfit font-black text-[3rem] leading-none tracking-tighter outline-none break-words"
            style={{ color: brandColor }}>
            {data.texto_apoio || '5.'}
          </div>
        </SmartField>
        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md">
          <span className="font-outfit font-bold text-white text-[9px] uppercase tracking-widest">Descobrir</span>
          <MoveRight className="w-3 h-3 text-white" />
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
// EXTRA VARIANTE 123 — The Moodboard
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant123({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#EBE9E1] overflow-hidden flex flex-col mx-auto ring-1 ring-black/10">
      
      {/* Área de Tipografia */}
      <div className="h-[45%] w-full p-6 flex flex-col justify-between bg-[#EBE9E1] relative z-10 shrink-0">
        <div className="flex justify-between items-center w-full">
          <span className="font-outfit font-black text-[#1a1a1a] text-[10px] tracking-[0.2em] uppercase border-b border-[#1a1a1a] pb-1">
            @{brandHandle || 'seuhandle'}
          </span>
          <Store className="w-5 h-5" style={{ color: brandColor }} />
        </div>
        
        <div>
          <SmartField field="titulo" {...sp}>
            <h2 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-playfair font-black text-[#1a1a1a] leading-[0.85] tracking-tighter outline-none break-words"
              style={{ fontSize: `${64 * sTitle}px` }}>
              {data.titulo || 'TOP 5'}
            </h2>
          </SmartField>
          <SmartField field="badge_text" {...sp}>
            <p 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="font-outfit text-zinc-500 text-[10px] uppercase tracking-widest mt-2 outline-none break-words">
              {data.badge_text || 'ESPECIAL'}
            </p>
          </SmartField>
        </div>
      </div>

      {/* Grelha de Imagens (Moodboard) */}
      <div className="flex-1 w-full grid grid-cols-3 gap-1 p-1 bg-[#1a1a1a]/5 relative">
        <div className="col-span-1 h-full relative overflow-hidden rounded-bl-xl">
          <ImageBg data={data} className="absolute inset-0" />
        </div>
        <div className="col-span-1 h-full relative overflow-hidden">
          <ImageBg data={data} className="absolute inset-0" />
          <div className="absolute inset-0 mix-blend-multiply" style={{ backgroundColor: `${brandColor}33` }} />
        </div>
        <div className="col-span-1 h-full relative overflow-hidden rounded-br-xl">
          <ImageBg data={data} className="absolute inset-0" />
        </div>
      </div>
      
      {/* Botão flutuante */}
      <div 
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[#EBE9E1] px-4 py-2 rounded-full shadow-xl flex items-center justify-center gap-2 z-20"
        style={{ backgroundColor: brandColor }}
      >
        <span className="font-outfit font-bold text-[9px] uppercase tracking-widest leading-none">Deslize</span>
        <ArrowRight className="w-3 h-3" />
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
// EXTRA VARIANTE 124 — The Michelin Receipt
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant124({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#EBE9E1] overflow-hidden flex flex-col items-center justify-center p-6 mx-auto">
      
      {/* O "Recibo" */}
      <div 
        className="w-full h-full bg-white rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex flex-col relative overflow-hidden filter drop-shadow-xl border-t-[8px] z-10"
        style={{ borderColor: brandColor }}
      >
        
        {/* Detalhe de picote no fundo via CSS */}
        <div className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-transparent via-transparent to-transparent" style={{ backgroundImage: 'radial-gradient(circle at 5px 10px, transparent 6px, #EBE9E1 7px)', backgroundSize: '15px 15px', backgroundPosition: '-5px 10px', backgroundRepeat: 'repeat-x', bottom: '-8px' }}></div>

        <div className="p-6 flex-1 flex flex-col relative pb-8">
          <div className="flex justify-center mb-6 shrink-0">
            <Receipt className="w-8 h-8 text-[#1a1a1a]" strokeWidth={1} />
          </div>

          <div className="text-center border-b-2 border-dashed border-zinc-200 pb-6 mb-6 shrink-0">
            <h2 className="font-outfit font-black text-[#1a1a1a] text-2xl tracking-[0.2em] uppercase mb-1 truncate">
              {brandHandle || 'seuhandle'}
            </h2>
            <SmartField field="badge_text" {...sp}>
              <p 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
                className="font-playfair italic text-zinc-500 text-sm outline-none break-words">
                {data.badge_text || 'Ordem de Serviço #005'}
              </p>
            </SmartField>
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <div className="flex justify-between items-center font-outfit text-xs text-zinc-600">
              <span className="uppercase tracking-widest">Item</span>
              <span className="uppercase tracking-widest">Qtd</span>
            </div>
            
            <div className="flex justify-between items-center">
              <SmartField field="titulo" {...sp}>
                <span 
                  contentEditable suppressContentEditableWarning
                  onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
                  className="font-playfair font-bold text-[#1a1a1a] outline-none break-words line-clamp-2"
                  style={{ fontSize: `${18 * sTitle}px` }}>
                  {data.titulo || 'A Seleção Perfeita'}
                </span>
              </SmartField>
              <span className="font-playfair font-bold text-[#1a1a1a] text-lg pl-2">05</span>
            </div>
            
            <div className="flex justify-between items-center font-outfit text-xs text-zinc-400">
              <SmartField field="texto_apoio" {...sp}>
                <span 
                  contentEditable suppressContentEditableWarning
                  onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                  className="outline-none break-words">
                  {data.texto_apoio || 'Experiência Premium'}
                </span>
              </SmartField>
              <span>100%</span>
            </div>
          </div>

          <div className="border-t-2 border-dashed border-zinc-200 pt-6 mt-auto text-center shrink-0">
            <div className="w-full h-12 relative overflow-hidden rounded mb-4">
               <ImageBg data={data} className="absolute inset-0 grayscale opacity-50" />
            </div>
            <p 
              className="font-outfit font-bold text-[10px] uppercase tracking-[0.3em] flex justify-center items-center gap-2"
              style={{ color: brandColor }}
            >
              Deslize para Consumir <ArrowRight className="w-3 h-3" />
            </p>
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
// EXTRA VARIANTE 125 — THE MACRO TYPE
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant125({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#EBE9E1] overflow-hidden flex flex-col justify-center mx-auto ring-1 ring-black/5">
      
      <div className="absolute top-6 left-6 flex items-center gap-2 z-20">
        <Sparkle className="w-4 h-4" style={{ color: brandColor }} />
        <SmartField field="badge_text" {...sp}>
          <span 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
            className="font-outfit font-bold text-[#1a1a1a] text-[9px] tracking-[0.3em] uppercase outline-none break-words">
            {data.badge_text || 'Volume 25'}
          </span>
        </SmartField>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center mt-12">
        <SmartField field="titulo" {...sp} className="pointer-events-auto">
          <h2 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-playfair font-black text-[#1a1a1a] leading-[0.65] tracking-tighter text-center outline-none break-words"
            style={{ fontSize: `${135 * sTitle}px`, marginLeft: '-1rem' }}>
            {data.titulo || 'TOP\n5'}
          </h2>
        </SmartField>
      </div>

      <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45%] h-[55%] rounded-full overflow-hidden shadow-2xl ring-4 ring-[#EBE9E1] z-20">
        <ImageBg data={data} className="absolute inset-0" />
      </div>

      <div className="absolute bottom-6 w-full px-6 flex justify-between items-end z-20 pointer-events-none">
        <span className="font-outfit font-bold text-[#1a1a1a] text-[10px] tracking-widest uppercase bg-white/50 px-3 py-1.5 rounded-full backdrop-blur-md">
          @{brandHandle || 'seuhandle'}
        </span>
        <div className="flex flex-col items-end gap-2">
          <ArrowRight className="w-5 h-5" style={{ color: brandColor }} />
        </div>
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
// EXTRA VARIANTE 126 — THE MUSEUM FRAME
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant126({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-white overflow-hidden flex flex-col mx-auto p-6">
      
      <div className="w-full h-full border border-zinc-200 flex flex-col p-5 relative z-10">
        
        <div className="flex justify-between items-center w-full mb-6">
          <SmartField field="badge_text" {...sp}>
            <span 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="font-outfit font-medium text-zinc-400 text-[8px] tracking-[0.2em] uppercase outline-none break-words">
              {data.badge_text || 'Exposição Especial'}
            </span>
          </SmartField>
          <Diamond className="w-3 h-3 text-[#1a1a1a]" />
        </div>

        <div className="w-full aspect-[4/5] relative overflow-hidden shadow-sm">
          <ImageBg data={data} className="absolute inset-0" />
        </div>

        <div className="mt-auto pt-6 flex flex-col items-center text-center">
          <SmartField field="titulo" {...sp}>
            <h2 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-playfair italic font-bold text-[#1a1a1a] leading-none mb-2 outline-none break-words"
              style={{ fontSize: `${36 * sTitle}px` }}>
              {data.titulo || 'O Top 5'}
            </h2>
          </SmartField>
          <div className="w-8 h-[1px] mb-3" style={{ backgroundColor: brandColor }}></div>
          <SmartField field="texto_apoio" {...sp}>
            <p 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-outfit text-zinc-500 text-[8px] tracking-[0.3em] uppercase font-bold outline-none break-words">
              {data.texto_apoio || 'A SELEÇÃO QUE VOCÊ MERECE'}
            </p>
          </SmartField>
        </div>

        <span className="absolute left-[-3.5rem] top-1/2 -translate-y-1/2 -rotate-90 font-outfit text-zinc-300 text-[8px] tracking-[0.4em] uppercase whitespace-nowrap">
          @{brandHandle || 'seuhandle'}
        </span>
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
// EXTRA VARIANTE 127 — THE OFFSET GRID
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant127({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#EBE9E1] overflow-hidden flex mx-auto ring-1 ring-black/5">
      
      <div className="w-[30%] h-full flex flex-col justify-between py-8 px-4 border-r border-[#1a1a1a]/10 z-10 bg-[#EBE9E1] shrink-0">
        <BadgeCheck className="w-5 h-5 mx-auto" style={{ color: brandColor }} />
        
        <div className="flex-1 flex items-center justify-center relative">
          <SmartField field="badge_text" {...sp}>
            <span 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
              className="font-outfit font-black text-[#1a1a1a] text-[11px] tracking-[0.4em] uppercase -rotate-90 whitespace-nowrap outline-none origin-center inline-block min-w-max translate-x-[2px]">
              {data.badge_text || 'A SELEÇÃO'}
            </span>
          </SmartField>
        </div>

        <ArrowRight className="w-5 h-5 text-[#1a1a1a] mx-auto" />
      </div>

      <div className="w-[70%] h-full relative overflow-hidden flex flex-col">
        <div className="h-[75%] w-full relative shrink-0">
          <ImageBg data={data} className="absolute inset-0" />
        </div>
        
        <div className="flex-1 bg-[#1a1a1a] flex flex-col justify-center px-6 relative">
          <div className="absolute top-0 left-6 w-12 h-1" style={{ backgroundColor: brandColor }}></div>
          <SmartField field="titulo" {...sp}>
            <h2 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-playfair font-black text-[#EBE9E1] leading-none tracking-tighter -mt-2 outline-none break-words"
              style={{ fontSize: `${64 * sTitle}px` }}>
              {data.titulo || 'TOP 5'}
            </h2>
          </SmartField>
          <span className="font-outfit text-zinc-500 text-[8px] tracking-[0.2em] uppercase mt-1">
            @{brandHandle || 'seuhandle'}
          </span>
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
// EXTRA VARIANTE 128 — THE DRAMATIC CANVAS
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant128({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#0a0a0a] overflow-hidden flex flex-col justify-between p-6 mx-auto ring-1 ring-white/10">
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ImageBg data={data} className="absolute inset-0 mix-blend-luminosity opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-transparent opacity-80" />
      </div>

      <div className="relative z-10 flex justify-between items-start w-full">
        <span className="font-outfit font-bold text-white text-[10px] tracking-widest uppercase border border-white/20 px-3 py-1 rounded-sm backdrop-blur-md">
          @{brandHandle || 'seuhandle'}
        </span>
        <Maximize2 className="w-4 h-4 text-white/50" />
      </div>

      <div className="relative z-10 w-full mt-auto flex flex-col items-center">
        <SmartField field="badge_text" {...sp}>
          <h2 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
            className="font-playfair font-black text-transparent bg-clip-text text-[12rem] leading-[0.7] tracking-tighter drop-shadow-2xl outline-none"
            style={{ backgroundImage: `linear-gradient(to bottom, ${brandColor}, #333333)` }}>
            {data.badge_text || '5'}
          </h2>
        </SmartField>
        
        <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 w-full p-5 rounded-xl mt-4 flex justify-between items-center z-20">
          <div>
            <SmartField field="titulo" {...sp}>
              <h3 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
                className="font-playfair italic font-medium text-white text-xl mb-1 outline-none break-words">
                {data.titulo || 'A Seleção Definitiva'}
              </h3>
            </SmartField>
            <SmartField field="texto_apoio" {...sp}>
              <p 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                className="font-outfit text-zinc-500 text-[9px] uppercase tracking-widest outline-none break-words">
                {data.texto_apoio || 'Deslize para ver mais'}
              </p>
            </SmartField>
          </div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg shrink-0" style={{ backgroundColor: brandColor, boxShadow: `0 0 20px ${brandColor}66` }}>
            <CornerRightDown className="w-5 h-5 text-white -rotate-90" />
          </div>
        </div>
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

export const COVER_EXTRA_VARIANT_COMPONENTS = {
  101: CoverExtraVariant101,
  102: CoverExtraVariant102,
  103: CoverExtraVariant103,
  104: CoverExtraVariant104,
  105: CoverExtraVariant105,
  106: CoverExtraVariant106,
  107: CoverExtraVariant107,
  108: CoverExtraVariant108,
  109: CoverExtraVariant109,
  110: CoverExtraVariant110,
  111: CoverExtraVariant111,
  112: CoverExtraVariant112,
  113: CoverExtraVariant113,
  114: CoverExtraVariant114,
  115: CoverExtraVariant115,
  116: CoverExtraVariant116,
  117: CoverExtraVariant117,
  118: CoverExtraVariant118,
  119: CoverExtraVariant119,
  120: CoverExtraVariant120,
  121: CoverExtraVariant121,
  122: CoverExtraVariant122,
  123: CoverExtraVariant123,
  124: CoverExtraVariant124,
  125: CoverExtraVariant125,
  126: CoverExtraVariant126,
  127: CoverExtraVariant127,
  128: CoverExtraVariant128,
  129: CoverExtraVariant129,
  130: CoverExtraVariant130,
  131: CoverExtraVariant131,
  132: CoverExtraVariant132,
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
  {
    id: 109,
    name: 'The Overlap',
    description: 'Tensão entre a imagem e o bloco de texto lateral em colunas',
    thumbnailUrl: '',
  },
  {
    id: 110,
    name: 'Fashion Headline',
    description: 'Serifado pesado, foto pequena, elegância e respiro',
    thumbnailUrl: '',
  },
  {
    id: 111,
    name: 'Geometric Inset',
    description: 'Blocos de cores sólidos e recortes bruscos com geometria forte',
    thumbnailUrl: '',
  },
  {
    id: 112,
    name: 'Brutalist List',
    description: 'Foco em tipografia de impacto com imagem de detalhe na base',
    thumbnailUrl: '',
  },
  {
    id: 113,
    name: 'The Blueprint',
    description: 'Foco em linhas finas dividindo o espaço matematicamente',
    thumbnailUrl: '',
  },
  {
    id: 114,
    name: 'The Wax Seal',
    description: 'Menos imagem, mais autoridade. Estilo selo de cera',
    thumbnailUrl: '',
  },
  {
    id: 115,
    name: 'Gallery Crop',
    description: 'Imagem esmagada, tipografia espremida. Estilo editorial fashion',
    thumbnailUrl: '',
  },
  {
    id: 116,
    name: 'Red Monolith',
    description: 'Impacto visual máximo com bloco de cor agressiva',
    thumbnailUrl: '',
  },
  {
    id: 117,
    name: 'Minimalist Window',
    description: 'Respiração pura. Espaço em branco massivo como sinal de luxo.',
    thumbnailUrl: '',
  },
  {
    id: 118,
    name: 'Diagonal Cut',
    description: 'Brutalismo requintado. Divisão agressiva da tela.',
    thumbnailUrl: '',
  },
  {
    id: 119,
    name: 'Magazine Overlay',
    description: 'Tipografia gigante como textura sobre foto em ecrã inteiro.',
    thumbnailUrl: '',
  },
  {
    id: 120,
    name: 'The Spec Sheet',
    description: 'Design de dados com grids e linhas (Ficha Técnica).',
    thumbnailUrl: '',
  },
  {
    id: 121,
    name: 'The Editorial Split',
    description: 'Assimetria agressiva com barra lateral brutalista.',
    thumbnailUrl: '',
  },
  {
    id: 122,
    name: 'The Void Circle',
    description: 'Foco central com imagem circular e fundo escuro.',
    thumbnailUrl: '',
  },
  {
    id: 123,
    name: 'The Moodboard',
    description: 'Múltiplas imagens em grelha criando narrativa visual.',
    thumbnailUrl: '',
  },
  {
    id: 124,
    name: 'The Michelin Receipt',
    description: 'Estética de fatura/ticket de luxo.',
    thumbnailUrl: '',
  },
  {
    id: 125,
    name: 'The Macro Type',
    description: 'Letras gigantes quebrando as margens.',
    thumbnailUrl: '',
  },
  {
    id: 126,
    name: 'The Museum Frame',
    description: 'Uso extremo de espaço negativo. Limpo.',
    thumbnailUrl: '',
  },
  {
    id: 127,
    name: 'The Offset Grid',
    description: 'Divisão 30/70. Tensão visual assimétrica.',
    thumbnailUrl: '',
  },
  {
    id: 128,
    name: 'The Dramatic Canvas',
    description: 'Escuridão total. Contraste brutal.',
    thumbnailUrl: '',
  },
  {
    id: 129,
    name: 'The Staggered Type',
    description: 'Tipografia gigante desalinhada invadindo a imagem.',
    thumbnailUrl: '',
  },
  {
    id: 130,
    name: 'The Architecture',
    description: 'Moldura em formato de pílula centralizada elegante.',
    thumbnailUrl: '',
  },
  {
    id: 131,
    name: 'The Letterbox',
    description: 'Faixa de imagem horizontal formato wide cinema.',
    thumbnailUrl: '',
  },
  {
    id: 132,
    name: 'The Brutalist Stamp',
    description: 'Tipografia matemática focada e layout em formato selo.',
    thumbnailUrl: '',
  },
];
