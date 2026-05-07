import React from 'react';
import { BadgeCheck, ArrowRight, Sparkles, MoveUpRight, Quote, MoveRight, Maximize2, Zap, Hexagon, Component, Fingerprint, ScanLine, Store, Gem, Maximize, Layers, ListTree, ScanBarcode, Receipt, CircleDashed, Columns3, Cake, Diamond, Sparkle, CornerRightDown, ArrowDownRight, Asterisk, Plus, Shapes, AlignLeft, Hash, Ticket, LayoutGrid, Wind, Feather, FeatherIcon, Circle, Crown, Play, Minimize2 } from 'lucide-react';
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
        className="absolute inset-4 border z-20 pointer-events-none rounded-[10px]"
        style={{ borderColor: `${brandColor}33` }}
      />

      {/* Imagem superior (65%) */}
      <div className="relative w-full h-[65%] overflow-hidden rounded-[10px] shrink-0">
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
        <div className="p-4 h-12">
          {isVerified && <BadgeCheck className="w-5 h-5 text-white/90" />}
        </div>

        {/* Título centralizado na barra lateral */}
        <div className="flex-1 flex flex-col justify-center px-4 w-full">
          <SmartField field="titulo" {...sp}>
            <div className="w-full">
              <h2
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
                className="font-outfit font-black text-[#EBE9E1] tracking-tighter leading-tight outline-none break-words"
                style={{ fontSize: `${42 * sTitle}px` }}
              >
                {data.titulo || 'TOP 5'}
              </h2>
            </div>
          </SmartField>
        </div>

        <div className="w-full flex justify-center pb-6">
          <span className="font-outfit font-bold text-white/60 text-[9px] tracking-[0.2em] uppercase">
            Deslize →
          </span>
        </div>
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
      >
        <div className="flex flex-col relative z-20">
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

      {/* Linha de divisão (Borda 3px) */}
      <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" preserveAspectRatio="none">
        <line x1="0" y1="70%" x2="100%" y2="55%" stroke="white" strokeWidth="3" />
      </svg>

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

// ═══════════════════════════════════════════════════════════
// EXTRA VARIANTE 129 — THE STAGGERED TYPE
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant129({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#EBE9E1] overflow-hidden flex flex-col mx-auto border border-[#1a1a1a]/5">
      
      <div className="h-[65%] w-full relative overflow-hidden rounded-b-[40px] shadow-lg z-10 shrink-0">
        <ImageBg data={data} className="absolute inset-0" />
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        
        <div className="absolute top-[16px] left-5 flex items-center gap-2 bg-[#EBE9E1]/90 backdrop-blur px-3 py-1.5 rounded-full z-20">
          <Asterisk className="w-3 h-3" style={{ color: brandColor }} />
          <SmartField field="badge_text" {...sp}>
            <span 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="font-outfit font-bold text-[#1a1a1a] text-[9px] tracking-[0.2em] uppercase outline-none break-words relative -top-[3px] leading-none">
              {data.badge_text || 'V. 29'}
            </span>
          </SmartField>
        </div>
      </div>

      <div className="flex-1 relative bg-[#EBE9E1] p-6 flex flex-col justify-end z-0">
        <div className="absolute top-[12px] left-4 z-20 w-[90%]">
          <SmartField field="titulo" {...sp}>
            <h2 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-playfair font-black text-[#1a1a1a] leading-[0.7] tracking-tighter drop-shadow-xl outline-none break-words"
              style={{ fontSize: `${90 * sTitle}px` }}>
              {data.titulo || 'TOP\n5'}
            </h2>
          </SmartField>
        </div>

        <div className="flex justify-between items-end w-full relative z-30 mt-auto pointer-events-none">
          <div className="flex flex-col">
            <span className="font-outfit font-bold text-[#1a1a1a] text-[10px] uppercase tracking-widest mb-1">@{brandHandle || 'seuhandle'}</span>
            <SmartField field="texto_apoio" {...sp} className="pointer-events-auto">
              <span 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                className="font-outfit text-zinc-500 text-[8px] uppercase tracking-[0.2em] outline-none break-words">
                {data.texto_apoio || 'A SELEÇÃO QUE VOCÊ MERECE'}
              </span>
            </SmartField>
          </div>
          <div className="w-10 h-10 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center transition-all shrink-0">
            <ArrowRight className="w-4 h-4 text-[#1a1a1a]" />
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
// EXTRA VARIANTE 130 — THE ARCHITECTURE
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant130({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#1a1a1a] overflow-hidden flex flex-col items-center justify-center p-6 mx-auto">
      
      <div className="absolute top-6 w-full px-6 flex justify-between items-center z-20 pointer-events-none">
        <BadgeCheck className="w-5 h-5 text-white/50" />
        <SmartField field="badge_text" {...sp} className="pointer-events-auto">
          <span 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
            className="font-outfit font-bold text-white/50 text-[9px] tracking-[0.3em] uppercase outline-none break-words">
            {data.badge_text || 'Editorial'}
          </span>
        </SmartField>
      </div>

      <div className="w-[70%] h-[75%] rounded-t-full rounded-b-full overflow-hidden relative shadow-2xl ring-1 ring-white/10 z-10 shrink-0 mt-4">
        <ImageBg data={data} className="absolute inset-0 opacity-90 hover:opacity-100 transition-opacity" />
      </div>

      <div className="absolute bottom-16 w-full flex flex-col items-center z-20">
        <div className="bg-[#EBE9E1] px-8 py-3 rounded-full shadow-2xl flex items-center gap-3">
          <SmartField field="titulo" {...sp}>
            <h2 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-playfair font-black text-[#1a1a1a] leading-none outline-none break-words text-center"
              style={{ fontSize: `${30 * sTitle}px` }}>
              {data.titulo || 'TOP 5'}
            </h2>
          </SmartField>
        </div>
      </div>

      <div className="absolute bottom-5 w-full text-center pointer-events-none">
        <span className="font-outfit text-zinc-500 text-[8px] tracking-[0.4em] uppercase">@{brandHandle || 'seuhandle'}</span>
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
// EXTRA VARIANTE 131 — THE LETTERBOX
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant131({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#EBE9E1] overflow-hidden flex flex-col mx-auto ring-1 ring-black/10">
      
      <div className="h-[30%] w-full flex flex-col justify-end p-6 bg-[#EBE9E1] shrink-0">
        <div className="flex items-center gap-2 mb-[10px] pointer-events-none">
          <div className="w-8 h-[1px]" style={{ backgroundColor: brandColor }}></div>
          <SmartField field="badge_text" {...sp} className="pointer-events-auto">
            <span 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="font-outfit font-bold text-[9px] uppercase tracking-[0.2em] outline-none break-words"
              style={{ color: brandColor }}>
              {data.badge_text || 'A Coleção'}
            </span>
          </SmartField>
        </div>
        <SmartField field="titulo" {...sp}>
          <h2 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-playfair font-black text-[#1a1a1a] leading-none tracking-tighter outline-none break-words"
            style={{ fontSize: `${68 * sTitle}px` }}>
            {data.titulo || 'O Top Cinco.'}
          </h2>
        </SmartField>
      </div>

      <div className="h-[40%] w-full relative overflow-hidden bg-black flex items-center shadow-inner shrink-0">
        <ImageBg data={data} className="absolute inset-0 opacity-80" />
      </div>

      <div className="flex-1 w-full bg-[#1a1a1a] p-6 flex flex-col justify-between shrink-0">
        <SmartField field="texto_apoio" {...sp}>
          <p 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-outfit text-white/70 text-[11px] leading-relaxed max-w-[200px] uppercase tracking-widest font-medium outline-none break-words">
            {data.texto_apoio || 'A SELEÇÃO QUE VOCÊ MERECE'}
          </p>
        </SmartField>
        
        <div className="flex justify-between items-end w-full pointer-events-none">
          <span className="font-outfit font-bold text-white/40 text-[9px] tracking-[0.3em] uppercase">@{brandHandle || 'seuhandle'}</span>
          <ArrowDownRight className="w-5 h-5 text-white/80" />
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
// EXTRA VARIANTE 132 — THE BRUTALIST STAMP
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant132({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#DE1E4D] overflow-hidden flex flex-col p-6 mx-auto border-[6px] border-[#DE1E4D]" style={{ backgroundColor: brandColor, borderColor: brandColor }}>
      
      <div className="w-full h-full bg-[#EBE9E1] rounded-xl flex flex-col relative overflow-hidden shadow-inner p-5 z-10">
        
        <div className="flex justify-between items-center border-b border-[#1a1a1a]/10 pb-3 mb-6 pointer-events-none">
          <SmartField field="badge_text" {...sp} className="pointer-events-auto">
            <span 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="font-outfit font-black text-[#1a1a1a] text-[10px] tracking-[0.3em] uppercase outline-none break-words">
              {data.badge_text || 'DOC. 32'}
            </span>
          </SmartField>
          <Plus className="w-4 h-4" style={{ color: brandColor }} />
        </div>

        <div className="flex flex-col gap-2 relative z-20">
          <SmartField field="titulo" {...sp}>
            <h2 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-outfit font-black text-[#1a1a1a] leading-[0.85] tracking-tighter uppercase outline-none break-words"
              style={{ fontSize: `${64 * sTitle}px` }}>
              {data.titulo || 'A\nSELE\nÇÃO.'}
            </h2>
          </SmartField>
        </div>

        <div className="absolute right-5 top-24 w-28 aspect-[3/4] bg-zinc-300 z-10" style={{ boxShadow: `10px 10px 0px ${brandColor}` }}>
          <ImageBg data={data} className="absolute inset-0" />
        </div>

        <div className="mt-auto pt-6 border-t border-[#1a1a1a]/10 w-full flex justify-between items-end pointer-events-none">
          <div>
             <SmartField field="texto_apoio" {...sp} className="pointer-events-auto">
               <div 
                 contentEditable suppressContentEditableWarning
                 onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                 className="font-playfair italic font-bold text-3xl mb-1 outline-none break-words"
                 style={{ color: brandColor }}>
                 {data.texto_apoio || 'Top 5'}
               </div>
             </SmartField>
             <span className="font-outfit text-zinc-500 text-[8px] uppercase tracking-[0.2em] font-bold">@{brandHandle || 'seuhandle'}</span>
          </div>
          <div className="w-8 h-8 bg-[#1a1a1a] text-white flex items-center justify-center rounded shrink-0">
            <ArrowRight className="w-4 h-4" />
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
// EXTRA VARIANTE 133 — THE TORN TYPOGRAPHY
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant133({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#EBE9E1] overflow-hidden flex flex-col justify-center mx-auto ring-1 ring-black/5">
      
      <div className="absolute top-6 w-full px-6 flex justify-between items-center z-20 pointer-events-none">
        <SmartField field="badge_text" {...sp} className="pointer-events-auto">
          <span 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
            className="font-outfit font-black text-[#1a1a1a] text-[10px] tracking-[0.3em] uppercase outline-none break-words">
            {data.badge_text || 'Fase XI'}
          </span>
        </SmartField>
        <Sparkles className="w-4 h-4" style={{ color: brandColor }} />
      </div>

      {/* Tipografia de Fundo (Massiva e intencionalmente cortada) */}
      <div className="absolute top-[15%] -left-8 z-0">
        <SmartField field="titulo" {...sp}>
          <h2 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-playfair font-black text-[#1a1a1a] leading-[0.75] tracking-tighter opacity-90 outline-none break-words"
            style={{ fontSize: `${12 * sTitle}rem` }}>
            {data.titulo || 'TO\nP5'}
          </h2>
        </SmartField>
      </div>

      {/* Bloco de Imagem Assímetrico */}
      <div className="absolute right-0 bottom-24 w-[75%] h-[55%] bg-zinc-200 shadow-2xl z-10 border-l-[12px] border-b-[12px] border-[#EBE9E1] origin-bottom-right shrink-0">
        <ImageBg data={data} className="absolute inset-0" />
      </div>

      {/* Footer Flutuante */}
      <div className="absolute bottom-6 left-6 z-20">
        <div className="px-4 py-2 flex items-center gap-4 shadow-lg pointer-events-none" style={{ backgroundColor: brandColor }}>
          <div>
            <SmartField field="texto_apoio" {...sp} className="pointer-events-auto">
              <p 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                className="font-playfair italic text-white text-[14px] leading-none mb-1 outline-none break-words">
                {data.texto_apoio || 'A Seleção'}
              </p>
            </SmartField>
            <p className="font-outfit font-bold text-white/80 text-[8px] uppercase tracking-widest">@{brandHandle || 'seuhandle'}</p>
          </div>
          <div className="w-6 h-6 bg-white flex items-center justify-center shrink-0">
            <ArrowRight className="w-3 h-3" style={{ color: brandColor }} />
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
// EXTRA VARIANTE 134 — THE ARCHIVE FILE
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant134({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#F7F5F0] overflow-hidden flex flex-col mx-auto border border-zinc-300">
      
      <div className="flex-1 p-6 flex flex-col relative z-10">
        
        {/* Header Falso */}
        <div className="flex justify-between items-start border-b border-zinc-300 pb-4 mb-6 pointer-events-none">
          <div className="flex items-center gap-2">
            <Store className="w-4 h-4 text-zinc-400" />
            <SmartField field="badge_text" {...sp} className="pointer-events-auto">
              <span 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
                className="font-outfit text-zinc-500 text-[9px] tracking-[0.2em] uppercase outline-none break-words">
                {data.badge_text || 'Index #034'}
              </span>
            </SmartField>
          </div>
          <span className="font-outfit font-black text-[#1a1a1a] text-[9px] tracking-[0.3em] uppercase bg-zinc-200 px-2 py-1">
            {brandHandle || 'seuhandle'}
          </span>
        </div>

        <div className="flex-1 flex flex-col">
          <SmartField field="titulo" {...sp}>
            <h2 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-playfair font-black text-[#1a1a1a] leading-none mb-4 outline-none break-words"
              style={{ fontSize: `${48 * sTitle}px` }}>
              {data.titulo || 'A Curadoria\nEspecial.'}
            </h2>
          </SmartField>
          
          {/* Metadados Falsos */}
          <div className="grid grid-cols-2 gap-4 mb-6 border-l-2 pl-4" style={{ borderColor: brandColor }}>
            <div>
              <p className="font-outfit text-zinc-400 text-[8px] uppercase tracking-widest">Lote</p>
              <p className="font-outfit font-bold text-[#1a1a1a] text-xs">TOP 5</p>
            </div>
            <div>
              <p className="font-outfit text-zinc-400 text-[8px] uppercase tracking-widest">Categoria</p>
              <p className="font-outfit font-bold text-[#1a1a1a] text-xs">Premium</p>
            </div>
          </div>

          {/* Imagem Polaróide */}
          <div className="mt-auto w-full bg-white p-3 shadow-md border border-zinc-100 shrink-0">
            <div className="w-full aspect-[4/3] bg-zinc-200 relative overflow-hidden">
              <ImageBg data={data} className="absolute inset-0 mix-blend-multiply opacity-90" />
            </div>
            <div className="mt-3 flex justify-between items-center px-1 pointer-events-none">
              <SmartField field="texto_apoio" {...sp} className="pointer-events-auto">
                <span 
                  contentEditable suppressContentEditableWarning
                  onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                  className="font-outfit text-zinc-400 text-[8px] uppercase tracking-widest outline-none break-words">
                  {data.texto_apoio || 'Deslize para abrir'}
                </span>
              </SmartField>
              <ArrowRight className="w-3 h-3 text-[#1a1a1a]" />
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
// EXTRA VARIANTE 135 — THE VERTICAL SLICE
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant135({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#ebe9e1] overflow-hidden flex mx-auto border border-zinc-300">
      
      {/* Slice da Imagem */}
      <div className="w-[35%] h-full relative overflow-hidden z-10 border-r border-black/10 shrink-0">
        <ImageBg data={data} className="absolute inset-0 h-full" />
      </div>

      {/* Bloco de Texto Claro */}
      <div className="w-[65%] h-full bg-[#ebe9e1] p-6 flex flex-col justify-between relative shrink-0">
        <div className="flex justify-end pointer-events-none">
          <AlignLeft className="w-5 h-5 text-[#1A1A1A]" />
        </div>

        <div className="flex flex-col">
          <SmartField field="badge_text" {...sp}>
            <span 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="font-outfit text-[10px] tracking-[0.3em] font-bold uppercase mb-4 outline-none break-words"
              style={{ color: brandColor }}>
              {data.badge_text || 'Apenas os Melhores'}
            </span>
          </SmartField>
          <SmartField field="titulo" {...sp}>
            <h2 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-playfair font-black text-[#1A1A1A] leading-[0.8] tracking-tighter outline-none break-words"
              style={{ fontSize: `${4.2 * sTitle}rem` }}>
              {data.titulo || 'TOP\nCINCO'}
            </h2>
          </SmartField>
        </div>

        <div className="flex flex-col gap-4 pointer-events-none">
          <div className="w-full h-[1px] bg-black/10"></div>
          <div className="flex justify-between items-end">
            <span className="font-outfit font-medium text-[#1A1A1A] text-[8px] tracking-[0.2em] uppercase">
              @{brandHandle || 'seuhandle'}
            </span>
            <div className="w-8 h-8 rounded-full border border-[#1A1A1A] flex items-center justify-center shrink-0">
              <ArrowRight className="w-4 h-4 text-[#1A1A1A]" />
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
// EXTRA VARIANTE 136 — THE CRIMSON MONOGRAM
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant136({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col justify-center items-center p-6 mx-auto border border-white/10" style={{ backgroundColor: brandColor }}>
      
      {/* Fundo escuro misturado */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-transparent to-black/50 pointer-events-none" />
      
      {/* Numeral Gigante como Máscara de Fundo */}
      <div className="absolute inset-0 flex items-center justify-center z-10 overflow-hidden pointer-events-none">
        <SmartField field="badge_text" {...sp} className="pointer-events-auto">
          <h2 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
            className="font-playfair font-black text-white/[0.03] text-[35rem] leading-none select-none outline-none break-words">
            {data.badge_text || '5'}
          </h2>
        </SmartField>
      </div>

      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20 pointer-events-none">
        <div className="bg-[#1a1a1a] px-3 py-1 rounded-sm shadow-md">
          <span className="font-outfit font-black text-white text-[9px] tracking-[0.3em] uppercase">
            {brandHandle || 'seuhandle'}
          </span>
        </div>
        <Hash className="w-5 h-5 text-white/50" />
      </div>

      {/* Imagem Central Elevada */}
      <div className="relative z-20 w-[80%] aspect-square mt-4 mb-8 shrink-0 translate-y-[40px]">
        <div className="absolute inset-0 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] ring-1 ring-white/20 overflow-hidden">
          <ImageBg data={data} className="absolute inset-0" />
        </div>
        {/* Etiqueta Flutuante */}
        <div className="absolute -bottom-4 -right-4 bg-[#EBE9E1] px-5 py-3 rounded-lg shadow-xl border border-zinc-200">
           <SmartField field="titulo" {...sp}>
             <h3 
               contentEditable suppressContentEditableWarning
               onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
               className="font-playfair font-black text-[#1a1a1a] leading-none outline-none break-words"
               style={{ fontSize: `${24 * sTitle}px` }}>
               {data.titulo || 'Top 5.'}
             </h3>
           </SmartField>
        </div>
      </div>

      <div className="relative z-20 w-full mt-auto flex justify-between items-end border-t border-white/20 pt-4 pointer-events-none">
        <SmartField field="texto_apoio" {...sp} className="pointer-events-auto">
          <p 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-outfit text-white/70 text-[9px] uppercase tracking-widest font-medium max-w-[150px] outline-none break-words">
            {data.texto_apoio || 'A SELEÇÃO QUE VOCÊ MERECE'}
          </p>
        </SmartField>
        <div className="flex items-center gap-2 shrink-0">
          <span className="font-outfit font-bold text-white text-[10px] uppercase tracking-widest">Explorar</span>
          <CornerRightDown className="w-4 h-4 text-[#EBE9E1] -rotate-90" />
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
// EXTRA VARIANTE 137 — THE FLOATING TICKET
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant137({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#1a1a1a] overflow-hidden flex items-center justify-center mx-auto">
      
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <ImageBg data={data} className="absolute inset-0 scale-125 blur-xl opacity-60" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 w-[80%] aspect-[3/4] bg-[#EBE9E1] rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden">
        
        <div className="h-[40%] w-full relative">
          <ImageBg data={data} className="absolute inset-0" />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded shadow-sm">
            <Ticket className="w-4 h-4 text-[#1a1a1a]" />
          </div>
        </div>

        <div className="flex-1 p-5 flex flex-col justify-between bg-[radial-gradient(#d4d4d4_1px,transparent_1px)] [background-size:16px_16px]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <SmartField field="badge_text" {...sp}>
                <span 
                  contentEditable suppressContentEditableWarning
                  onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
                  className="text-white font-outfit font-black text-[8px] px-2 py-0.5 uppercase tracking-widest outline-none" style={{ backgroundColor: brandColor }}>
                  {data.badge_text || 'Passe VIP'}
                </span>
              </SmartField>
            </div>
            <SmartField field="titulo" {...sp}>
              <h2 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
                className="font-playfair font-black text-[#1a1a1a] leading-none outline-none break-words" style={{ fontSize: `${36 * sTitle}px` }}>
                {data.titulo || 'TOP 5'}
              </h2>
            </SmartField>
            <SmartField field="texto_apoio" {...sp}>
              <p 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                className="font-outfit text-zinc-500 text-[9px] uppercase tracking-widest mt-2 outline-none break-words">
                {data.texto_apoio || 'A SELEÇÃO QUE VOCÊ MERECE'}
              </p>
            </SmartField>
          </div>

          <div className="border-t border-dashed border-[#1a1a1a]/20 pt-3 mt-4 flex justify-between items-end pointer-events-none">
            <span className="font-outfit font-bold text-[#1a1a1a] text-[9px] uppercase tracking-[0.2em]">@{brandHandle || 'seuhandle'}</span>
            <ArrowRight className="w-4 h-4" style={{ color: brandColor }} />
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
// EXTRA VARIANTE 138 — THE BRUTALIST GRID
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant138({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#EBE9E1] overflow-hidden flex flex-col mx-auto border-[8px] border-[#1a1a1a]">
      
      <div className="h-1/2 w-full flex border-b-4 border-[#1a1a1a]">
        <div className="w-[40%] h-full flex flex-col justify-between p-4 border-r-4 border-[#1a1a1a]" style={{ backgroundColor: brandColor }}>
          <LayoutGrid className="w-5 h-5 text-[#1a1a1a]" />
          <SmartField field="badge_text" {...sp} className="relative z-10 w-max overflow-visible">
            <span 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="font-outfit font-black text-[#1a1a1a] text-[11px] uppercase tracking-[0.2em] -rotate-90 origin-bottom-left ml-4 mb-8 whitespace-nowrap inline-block outline-none">
              {data.badge_text || 'EDIÇÃO 38'}
            </span>
          </SmartField>
        </div>
        <div className="w-[60%] h-full relative overflow-hidden">
          <ImageBg data={data} className="absolute inset-0 grayscale" />
        </div>
      </div>

      <div className="h-1/2 w-full bg-[#EBE9E1] flex flex-col justify-between p-6 relative">
        <div className="absolute top-0 right-6 w-16 h-16 bg-[#1a1a1a] flex items-center justify-center rounded-b-xl shadow-lg">
          <span className="font-playfair font-black text-[#EBE9E1] text-3xl">5</span>
        </div>

        <div className="mt-4">
          <SmartField field="titulo" {...sp}>
            <h2 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-playfair font-black text-[#1a1a1a] leading-[0.9] uppercase tracking-tighter outline-none break-words" style={{ fontSize: `${48 * sTitle}px` }}>
              {data.titulo || 'A SELEÇÃO.'}
            </h2>
          </SmartField>
        </div>

        <div className="flex justify-between items-end w-full border-t-2 border-[#1a1a1a] pt-3 pointer-events-none">
          <span className="font-outfit font-bold text-[#1a1a1a] text-[10px] tracking-[0.3em] uppercase">@{brandHandle || 'seuhandle'}</span>
          <div className="flex items-center gap-1">
            <span className="font-outfit font-bold text-[10px] uppercase tracking-widest" style={{ color: brandColor }}>Abrir</span>
            <MoveUpRight className="w-3 h-3" style={{ color: brandColor }} />
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
// EXTRA VARIANTE 139 — THE NEGATIVE SPACE
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant139({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#F9F7F2] overflow-hidden flex flex-col mx-auto ring-1 ring-black/5">
      
      <div className="flex-1 p-8 flex flex-col relative">
        
        <div className="flex justify-between items-start w-full">
          <Store className="w-5 h-5 text-zinc-300" />
          <SmartField field="badge_text" {...sp}>
            <span 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="font-outfit font-bold text-zinc-300 text-[9px] uppercase tracking-[0.4em] outline-none">
              {data.badge_text || 'Respire'}
            </span>
          </SmartField>
        </div>

        <div className="mt-12">
          <SmartField field="titulo" {...sp}>
            <h2 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-playfair font-black text-[#1a1a1a] leading-[0.8] tracking-tighter outline-none break-words"
              style={{ fontSize: `${80 * sTitle}px` }}>
              {data.titulo || 'O TOP Cinco.'}
            </h2>
          </SmartField>
          <SmartField field="texto_apoio" {...sp}>
            <p 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-outfit text-zinc-400 text-[9px] uppercase tracking-[0.3em] mt-8 max-w-[180px] leading-relaxed outline-none break-words">
              {data.texto_apoio || 'A SELEÇÃO QUE VOCÊ MERECE'}
            </p>
          </SmartField>
        </div>

        <div 
          className="absolute bottom-6 right-6 w-[45%] aspect-[3/4] bg-zinc-200 overflow-hidden -rotate-3 rounded-[10px]"
          style={{ boxShadow: `0 20px 25px -5px ${brandColor}33, 0 8px 10px -6px ${brandColor}33` }}>
          <ImageBg data={data} className="absolute inset-0" />
        </div>

        <div className="absolute bottom-8 left-8 pointer-events-none">
          <div className="w-10 h-10 rounded-full border border-zinc-300 flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-[#1a1a1a]" />
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
// EXTRA VARIANTE 140 — THE INTERSECTING MASK
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant140({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#050505] overflow-hidden flex flex-col mx-auto ring-1 ring-white/10">
      
      <div className="h-[65%] w-full relative overflow-hidden z-0 pointer-events-none">
        <ImageBg data={data} className="absolute inset-0 opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-90" />
      </div>

      <div className="h-[35%] w-full bg-[#050505] p-6 flex flex-col justify-end relative z-10">
        
        <SmartField field="titulo" {...sp} className="absolute -top-16 left-6 z-20">
          <h2 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-playfair font-black text-white leading-[0.8] tracking-tighter drop-shadow-2xl outline-none break-words"
            style={{ fontSize: `${96 * sTitle}px` }}>
            {data.titulo || 'TOP 5'}
          </h2>
        </SmartField>

        <div className="w-full flex justify-between items-end border-t border-white/20 pt-4 mt-12 pointer-events-none">
          <div className="flex flex-col gap-1">
            <span className="font-outfit font-bold text-white/50 text-[10px] uppercase tracking-widest">
              @{brandHandle || 'seuhandle'}
            </span>
            <SmartField field="texto_apoio" {...sp} className="pointer-events-auto">
              <span 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                className="font-outfit font-medium text-zinc-400 text-[8px] uppercase tracking-[0.3em] outline-none">
                {data.texto_apoio || 'Experiência Premium'}
              </span>
            </SmartField>
          </div>
          <div className="bg-white/10 p-2 rounded backdrop-blur-md">
            <ArrowDownRight className="w-5 h-5 text-white/80" />
          </div>
        </div>
      </div>
      
      <div className="absolute top-6 right-6 z-20 pointer-events-none">
        <Layers className="w-5 h-5 text-white/40" />
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
// EXTRA VARIANTE 141 — THE SOFT GLASS
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant141({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#EBE9E1] overflow-hidden flex items-center justify-center mx-auto border border-black/5">
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ImageBg data={data} className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110" />
        <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />
      </div>

      <div className="relative z-10 w-[85%] bg-white/20 backdrop-blur-xl border border-white/40 p-8 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.1)] flex flex-col items-center text-center">
        
        <Sparkles className="w-4 h-4 text-white/90 mb-6" strokeWidth={1.5} />
        
        <SmartField field="titulo" {...sp}>
          <h2 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-playfair font-normal italic text-white leading-[0.9] mb-4 drop-shadow-sm outline-none break-words"
            style={{ fontSize: `${56 * sTitle}px` }}>
            {data.titulo || 'O Top Cinco.'}
          </h2>
        </SmartField>
        
        <div className="w-12 h-[1px] bg-white/50 mb-6"></div>
        
        <SmartField field="texto_apoio" {...sp}>
          <p 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-outfit text-white/90 text-[9px] uppercase tracking-[0.3em] font-medium leading-relaxed outline-none break-words">
            {data.texto_apoio || 'A SELEÇÃO QUE VOCÊ MERECE'}
          </p>
        </SmartField>

        <div className="mt-8 flex items-center gap-2 bg-white/10 px-5 py-2 rounded-full cursor-pointer transition-colors border border-white/20 pointer-events-none">
          <span className="font-outfit font-bold text-white text-[9px] uppercase tracking-widest">Descobrir</span>
          <ArrowRight className="w-3 h-3 text-white" />
        </div>
      </div>

      <div className="absolute bottom-6 w-full text-center z-10 pointer-events-none">
        <span className="font-outfit text-white/60 text-[8px] tracking-[0.4em] uppercase drop-shadow-md">@{brandHandle || 'seuhandle'}</span>
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
// EXTRA VARIANTE 142 — THE QUIET LUXURY
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant142({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#050505] overflow-hidden flex flex-col mx-auto ring-1 ring-white/5">
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ImageBg data={data} className="absolute inset-0 opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col h-full p-8 justify-end">
        
        <div className="flex flex-col gap-2 mb-6">
          <SmartField field="badge_text" {...sp}>
            <span 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="font-outfit font-light text-white/60 text-[10px] tracking-[0.4em] uppercase border-l pl-3 outline-none" style={{ borderColor: brandColor }}>
              {data.badge_text || 'A Seleção Definitiva'}
            </span>
          </SmartField>
          <SmartField field="titulo" {...sp}>
            <h2 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-playfair font-normal text-white leading-[1] tracking-tight outline-none break-words" style={{ fontSize: `${64 * sTitle}px` }}>
              {data.titulo || 'Top 5.'}
            </h2>
          </SmartField>
        </div>

        <div className="flex justify-between items-end w-full border-t border-white/10 pt-5 mt-2 pointer-events-none">
          <span className="font-outfit font-medium text-white/40 text-[9px] tracking-[0.2em] uppercase">
            @{brandHandle || 'seuhandle'}
          </span>
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-colors" style={{ borderColor: brandColor }}>
            <ArrowRight className="w-3 h-3 text-white/70" strokeWidth={1.5} style={{ color: brandColor }} />
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
// EXTRA VARIANTE 143 — THE ORGANIC ARCH
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant143({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#F7F5F0] overflow-hidden flex flex-col items-center p-6 mx-auto border border-zinc-200">
      
      <div className="w-full flex justify-between items-center mb-6 z-10 pointer-events-none">
        <BadgeCheck className="w-4 h-4 text-zinc-400" strokeWidth={1.5} />
        <span className="font-outfit font-medium text-zinc-400 text-[8px] tracking-[0.3em] uppercase">
          Editorial
        </span>
      </div>

      <div className="w-[85%] flex-1 rounded-t-full overflow-hidden relative shadow-md ring-1 ring-black/5 z-10">
        <ImageBg data={data} className="absolute inset-0" />
      </div>

      <div className="w-full flex flex-col items-center text-center mt-8 z-10">
        <SmartField field="titulo" {...sp}>
          <h2 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-playfair font-normal text-[#1a1a1a] leading-none tracking-tight mb-3 outline-none break-words" style={{ fontSize: `${36 * sTitle}px` }}>
            {data.titulo || 'O Top Cinco.'}
          </h2>
        </SmartField>
        
        <SmartField field="texto_apoio" {...sp}>
          <p 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-outfit text-zinc-500 text-[9px] uppercase tracking-[0.2em] max-w-[200px] leading-relaxed outline-none break-words">
            {data.texto_apoio || 'A SELEÇÃO QUE VOCÊ MERECE'}
          </p>
        </SmartField>

        <div className="mt-6 flex items-center gap-2 pointer-events-none">
          <span className="font-outfit font-medium text-[#1a1a1a] text-[9px] uppercase tracking-widest border-b border-transparent pb-0.5">
            Deslizar para ler
          </span>
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
// EXTRA VARIANTE 144 — THE FINE PRINT
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant144({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#EBE9E1] overflow-hidden flex flex-col mx-auto border border-zinc-300/50">
      
      <div className="absolute top-8 right-6 w-[75%] h-[55%] bg-zinc-200 shadow-xl overflow-hidden z-10 rounded-[14px]">
        <ImageBg data={data} className="absolute inset-0" />
      </div>

      <div className="absolute top-[60%] left-6 right-6 h-[1px] bg-zinc-300 z-0"></div>
      <div className="absolute top-6 bottom-6 left-12 w-[1px] bg-zinc-300 z-0"></div>

      <div className="relative z-20 h-full flex flex-col justify-between p-8 pointer-events-none">
        
        <div className="bg-[#EBE9E1]/80 backdrop-blur-sm w-fit pr-4 pb-4">
          <Feather className="w-5 h-5 text-[#DE1E4D]" strokeWidth={1} style={{ color: brandColor }} />
        </div>

        <div className="mt-auto bg-[#EBE9E1]/90 backdrop-blur-md pt-6 pr-6 -ml-4 pl-4 rounded-tr-3xl pointer-events-auto">
          <SmartField field="titulo" {...sp}>
            <h2 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-playfair font-normal text-[#1a1a1a] leading-[0.9] tracking-tighter mb-4 outline-none break-words" style={{ fontSize: `${75 * sTitle}px` }}>
              {data.titulo || 'A Nossa Seleção.'}
            </h2>
          </SmartField>
          
          <div className="flex items-center gap-4 pointer-events-none">
            <div className="w-8 h-8 rounded-full border border-zinc-400 flex items-center justify-center transition-colors">
              <ArrowRight className="w-3 h-3 text-[#1a1a1a]" strokeWidth={1.5} />
            </div>
            <span className="font-outfit text-zinc-500 text-[8px] uppercase tracking-[0.3em] font-medium">
              @{brandHandle || 'seuhandle'}
            </span>
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
// EXTRA VARIANTE 145 — THE CINEMATIC TITLE
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant145({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#0c0a09] overflow-hidden flex flex-col mx-auto ring-1 ring-white/5">
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ImageBg data={data} className="absolute inset-0 opacity-50 transition-all duration-1000 ease-in-out" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-[#0c0a09]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a09]/50 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center p-8 pb-2">
        <div className="pointer-events-none mt-2">
          <Crown className="w-5 h-5 text-[#DE1E4D]/80" strokeWidth={1.5} style={{ color: brandColor }} />
        </div>

        <div className="flex-1 flex flex-col items-center justify-end text-center w-full pb-0">
          <SmartField field="badge_text" {...sp}>
            <span 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="inline-block font-outfit text-white/50 text-[8px] tracking-[0.5em] uppercase mb-[15px] border-b border-white/10 pb-2 outline-none break-words">
              {data.badge_text || 'A Obra-Prima'}
            </span>
          </SmartField>
          
          <SmartField field="titulo" {...sp}>
            <h2 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-playfair font-normal text-white leading-[0.9] tracking-tight mb-8 outline-none break-words"
              style={{ fontSize: `${74 * sTitle}px` }}>
              {data.titulo || 'O Top Cinco.'}
            </h2>
          </SmartField>
          
          <div className="flex flex-col items-center gap-4 pointer-events-none">
            <div className="flex items-center gap-3">
              <span className="font-outfit font-light text-white/70 text-[9px] uppercase tracking-[0.2em] transition-colors">
                Iniciar Experiência
              </span>
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm transition-colors">
                <ArrowRight className="w-3 h-3 text-white" strokeWidth={1.5} />
              </div>
            </div>
            
            <span className="font-outfit font-medium text-white/30 text-[8px] tracking-widest uppercase">
              @{brandHandle || 'seuhandle'}
            </span>
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
// EXTRA VARIANTE 146 — THE GALLERY PLAQUE
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant146({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#FDFBF7] overflow-hidden shadow-sm border border-zinc-200 flex flex-col mx-auto p-6">
      
      <div className="flex-1 w-full bg-[#FDFBF7] relative">
        
        <div className="w-full h-[65%] relative overflow-hidden bg-zinc-100 mb-6 transition-shadow duration-700 ease-out z-10 rounded-[10px]">
          <ImageBg data={data} className="absolute inset-0 mix-blend-multiply transition-transform duration-1000" />
        </div>

        <div className="flex flex-col border-l-[1px] border-zinc-300 pl-4 ml-2">
          <SmartField field="badge_text" {...sp}>
            <span 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="font-outfit text-zinc-400 text-[8px] uppercase tracking-[0.3em] font-medium mb-1 outline-none break-words">
              {data.badge_text || 'Peça N° 05'}
            </span>
          </SmartField>
          
          <SmartField field="titulo" {...sp}>
            <h2 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-playfair font-medium text-[#1a1a1a] leading-none tracking-tight mb-2 outline-none break-words"
              style={{ fontSize: `${55 * sTitle}px` }}>
              {data.titulo || 'A Seleção.'}
            </h2>
          </SmartField>
          
          <SmartField field="texto_apoio" {...sp}>
            <p 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-outfit text-zinc-500 text-[9px] uppercase tracking-widest leading-relaxed max-w-[200px] outline-none break-words">
              {data.texto_apoio || 'A SELEÇÃO QUE VOCÊ MERECE'}
            </p>
          </SmartField>
        </div>

      </div>

      <div className="flex justify-between items-end w-full pt-4 pointer-events-none">
        <span className="font-outfit font-light text-zinc-400 text-[9px] tracking-[0.2em] uppercase">
          @{brandHandle || 'seuhandle'}
        </span>
        <div className="flex items-center gap-2">
          <span className="font-outfit font-medium text-[#DE1E4D] text-[9px] uppercase tracking-widest" style={{ color: brandColor }}>
            Deslizar
          </span>
          <ArrowRight className="w-3 h-3 text-[#DE1E4D]" style={{ color: brandColor }} />
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
// EXTRA VARIANTE 147 — THE FLOATING POLAROID
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant147({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#EBE9E1] overflow-hidden flex flex-col justify-center items-center mx-auto ring-1 ring-black/5">
      
      <div className="absolute top-8 left-8 pointer-events-none">
        <Feather className="w-4 h-4 text-zinc-300" strokeWidth={1} style={{ color: brandColor }} />
      </div>

      <div className="relative z-10 bg-[#FDFBF7] p-3 pb-8 rounded shadow-[0_20px_40px_rgba(0,0,0,0.08)] transform -rotate-1 transition-all duration-700 ease-out w-[75%]">
        
        <div className="w-full aspect-[4/5] relative overflow-hidden bg-zinc-100 z-10">
          <ImageBg data={data} className="absolute inset-0 opacity-90 transition-opacity duration-700" />
        </div>
        
        <div className="absolute bottom-[-2px] left-0 w-full text-center">
          <SmartField field="titulo" {...sp}>
            <h2 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-playfair font-medium text-[#1a1a1a] outline-none break-words"
              style={{ fontSize: `${38 * sTitle}px` }}>
              {data.titulo || 'O Top 5'}
            </h2>
          </SmartField>
        </div>

      </div>

      <div className="absolute bottom-8 w-full px-8 flex justify-between items-center z-20 pointer-events-none">
        <span className="font-outfit font-medium text-zinc-400 text-[8px] uppercase tracking-[0.3em]">
          @{brandHandle || 'seuhandle'}
        </span>
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm transition-shadow">
          <ArrowRight className="w-3 h-3 text-[#1a1a1a]" />
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
// EXTRA VARIANTE 148 — THE ZENITH
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant148({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#1a1a1a] overflow-hidden flex flex-col mx-auto border border-[#2a2a2a]">
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2a2a2a] via-[#1a1a1a] to-[#1a1a1a] z-0 pointer-events-none" />

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between p-8">
        
        <div className="flex justify-between items-center w-full pointer-events-none">
          <Minimize2 className="w-4 h-4 text-white/30" strokeWidth={1} />
          <span className="font-outfit text-white/30 text-[8px] tracking-[0.4em] uppercase">Edição Final</span>
        </div>

        <div className="flex flex-col items-center w-full">
          <div className="w-[50%] aspect-[1/2] rounded-full relative overflow-hidden shadow-[0_0_50px_rgba(222,30,77,0.1)] ring-1 ring-white/10 mb-8 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] z-10">
            <ImageBg data={data} className="absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-80 pointer-events-none" />
          </div>

          <SmartField field="titulo" {...sp}>
            <h2 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-playfair font-normal text-[#EBE9E1] leading-none tracking-tight text-center outline-none break-words"
              style={{ fontSize: `${48 * sTitle}px` }}>
              {data.titulo || 'TOP 5.'}
            </h2>
          </SmartField>
        </div>

        <div className="w-full flex flex-col items-center gap-4 pointer-events-none">
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/20 to-transparent"></div>
          <span className="font-outfit font-light text-white/50 text-[9px] uppercase tracking-widest transition-colors">
            Explorar Coleção
          </span>
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
  133: CoverExtraVariant133,
  134: CoverExtraVariant134,
  135: CoverExtraVariant135,
  136: CoverExtraVariant136,
  137: CoverExtraVariant137,
  138: CoverExtraVariant138,
  139: CoverExtraVariant139,
  140: CoverExtraVariant140,
  141: CoverExtraVariant141,
  142: CoverExtraVariant142,
  143: CoverExtraVariant143,
  144: CoverExtraVariant144,
  145: CoverExtraVariant145,
  146: CoverExtraVariant146,
  147: CoverExtraVariant147,
  148: CoverExtraVariant148,
};

export const COVER_EXTRA_VARIANT_META = [
  {
    id: 101,
    name: 'Moldura Editorial',
    description: 'Elegância de revista com margens grossas e título vazando',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras101.png',
  },
  {
    id: 102,
    name: 'Swiss Vertical',
    description: 'Layout assimétrico estilo poster europeu com faixa lateral',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras102.png',
  },
  {
    id: 103,
    name: 'Ingresso Premium',
    description: 'Imagem full com card flutuante estilo ticket bicolor',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras103.png',
  },
  {
    id: 104,
    name: 'Grid Tipográfico',
    description: 'Layout matemático com foto e blocos coloridos em grid',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras104.png',
  },
  {
    id: 105,
    name: 'O Arco Clássico',
    description: 'Arquitetura pura. O arco traz suavidade contra a tipografia dura',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras105.png',
  },
  {
    id: 106,
    name: 'Split Brutalista',
    description: 'Metade imagem, metade bloco sólido. Direto ao ponto',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras106.png',
  },
  {
    id: 107,
    name: 'Número Gigante',
    description: 'Tipografia atuando como textura de fundo overlay',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras107.png',
  },
  {
    id: 108,
    name: 'Bloco Citação',
    description: 'Foco na autoridade, imagem servindo como base',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras108.png',
  },
  {
    id: 109,
    name: 'The Overlap',
    description: 'Tensão entre a imagem e o bloco de texto lateral em colunas',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras109.png',
  },
  {
    id: 110,
    name: 'Fashion Headline',
    description: 'Serifado pesado, foto pequena, elegância e respiro',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras110.png',
  },
  {
    id: 111,
    name: 'Geometric Inset',
    description: 'Blocos de cores sólidos e recortes bruscos com geometria forte',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras111.png',
  },
  {
    id: 112,
    name: 'Brutalist List',
    description: 'Foco em tipografia de impacto com imagem de detalhe na base',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras112.png',
  },
  {
    id: 113,
    name: 'The Blueprint',
    description: 'Foco em linhas finas dividindo o espaço matematicamente',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras113.png',
  },
  {
    id: 114,
    name: 'The Wax Seal',
    description: 'Menos imagem, mais autoridade. Estilo selo de cera',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras114.png',
  },
  {
    id: 115,
    name: 'Gallery Crop',
    description: 'Imagem esmagada, tipografia espremida. Estilo editorial fashion',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras115.png',
  },
  {
    id: 116,
    name: 'Red Monolith',
    description: 'Impacto visual máximo com bloco de cor agressiva',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras116.png',
  },
  {
    id: 117,
    name: 'Minimalist Window',
    description: 'Respiração pura. Espaço em branco massivo como sinal de luxo.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras117.png',
  },
  {
    id: 118,
    name: 'Diagonal Cut',
    description: 'Brutalismo requintado. Divisão agressiva da tela.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras118.png',
  },
  {
    id: 119,
    name: 'Magazine Overlay',
    description: 'Tipografia gigante como textura sobre foto em ecrã inteiro.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras119.png',
  },
  {
    id: 120,
    name: 'The Spec Sheet',
    description: 'Design de dados com grids e linhas (Ficha Técnica).',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras120.png',
  },
  {
    id: 121,
    name: 'The Editorial Split',
    description: 'Assimetria agressiva com barra lateral brutalista.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras121.png',
  },
  {
    id: 122,
    name: 'The Void Circle',
    description: 'Foco central com imagem circular e fundo escuro.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras122.png',
  },
  {
    id: 123,
    name: 'The Moodboard',
    description: 'Múltiplas imagens em grelha criando narrativa visual.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras123.png',
  },
  {
    id: 124,
    name: 'The Michelin Receipt',
    description: 'Estética de fatura/ticket de luxo.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras124.png',
  },
  {
    id: 125,
    name: 'The Macro Type',
    description: 'Letras gigantes quebrando as margens.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras125.png',
  },
  {
    id: 126,
    name: 'The Museum Frame',
    description: 'Uso extremo de espaço negativo. Limpo.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras126.png',
  },
  {
    id: 127,
    name: 'The Offset Grid',
    description: 'Divisão 30/70. Tensão visual assimétrica.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras127.png',
  },
  {
    id: 128,
    name: 'The Dramatic Canvas',
    description: 'Escuridão total. Contraste brutal.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras128.png',
  },
  {
    id: 129,
    name: 'The Staggered Type',
    description: 'Tipografia gigante desalinhada invadindo a imagem.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras129.png',
  },
  {
    id: 130,
    name: 'The Architecture',
    description: 'Moldura em formato de pílula centralizada elegante.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras130.png',
  },
  {
    id: 131,
    name: 'The Letterbox',
    description: 'Faixa de imagem horizontal formato wide cinema.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras131.png',
  },
  {
    id: 132,
    name: 'The Brutalist Stamp',
    description: 'Tipografia matemática focada e layout em formato selo.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras132.png',
  },
  {
    id: 133,
    name: 'The Torn Typography',
    description: 'A imagem bloqueia intencionalmente a leitura da tipografia gigante.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras133.png',
  },
  {
    id: 134,
    name: 'The Archive File',
    description: 'Estética de documentação de museu. Linhas finas, dados e categorização.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras134.png',
  },
  {
    id: 135,
    name: 'The Vertical Slice',
    description: 'Divisão extrema da tela. 30% imagem, 70% tipografia agressiva.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras135.png',
  },
  {
    id: 136,
    name: 'The Crimson Monogram',
    description: 'Fundo escuro dramático. Símbolos gigantes mascarados pela imagem.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras136.png',
  },
  {
    id: 137,
    name: 'The Floating Ticket',
    description: 'Fundo desfocado dramático, card central estéril e super detalhado.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras137.png',
  },
  {
    id: 138,
    name: 'The Brutalist Grid',
    description: 'Linhas duras, divisão 4-way, blocos de cor agressivos.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras138.png',
  },
  {
    id: 139,
    name: 'The Negative Space',
    description: '70% de espaço em branco absoluto. Luxo através da ausência.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras139.png',
  },
  {
    id: 140,
    name: 'The Intersecting Mask',
    description: 'Texto gigante a cruzar o limite entre a imagem e o fundo escuro.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras140.png',
  },
  {
    id: 141,
    name: 'The Soft Glass',
    description: 'Foco em glassmorphism. Sem bordas duras, apenas luz e desfoque.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras141.png',
  },
  {
    id: 142,
    name: 'The Quiet Luxury',
    description: 'Tipografia delicada, gradiente invisível, espaço para a imagem respirar.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras142.png',
  },
  {
    id: 143,
    name: 'The Organic Arch',
    description: 'Curvas orgânicas, leveza e fundos claros focados em layout de arco.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras143.png',
  },
  {
    id: 144,
    name: 'The Fine Print',
    description: 'Assimetria elegante, linhas ultra-finas (hairlines) como guias estruturais.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras144.png',
  },
  {
    id: 145,
    name: 'The Cinematic Title',
    description: 'Elegância de ecrã prateado. Escuro, misterioso, com a imagem a fundir-se no vazio.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras145.png',
  },
  {
    id: 146,
    name: 'The Gallery Plaque',
    description: 'Inspirado nas descrições minimalistas ao lado de quadros em museus.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras146.png',
  },
  {
    id: 147,
    name: 'The Floating Polaroid',
    description: 'Delicadeza absoluta. Sombra suave, rotação impercetível, vazio imenso.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras147.png',
  },
  {
    id: 148,
    name: 'The Zenith',
    description: 'O ápice do minimalismo. Uma pílula central. Apenas o essencial.',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Capas%20Extras/capas_extras148.png',
  },
];
