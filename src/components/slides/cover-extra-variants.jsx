import React from 'react';
import { BadgeCheck, ArrowRight, Sparkles, MoveUpRight, Quote, MoveRight, Maximize2, Zap, Hexagon, Component, Fingerprint, ScanLine, Store, Gem, Maximize, Layers, ListTree, ScanBarcode, Receipt, CircleDashed, Columns3, Cake, Diamond, Sparkle, CornerRightDown, ArrowDownRight, Asterisk, Plus, Shapes, AlignLeft, Hash, Ticket, LayoutGrid, Wind, Feather, FeatherIcon, Circle, Crown, Play, Minimize2, ChevronRight, ArrowUpRight } from 'lucide-react';
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
            className="font-outfit text-zinc-600 font-medium text-[11px] max-w-[160px] uppercase tracking-widest mt-[48px] ml-3 leading-relaxed outline-none break-words"
            style={{ fontSize: '11px' }}
          >
            {data.texto_apoio}
          </p>
        </SmartField>

        <div className="mt-2 px-3">
          <div className="border-t border-[#1a1a1a]/10 translate-y-[4px]" />
          <div className="flex justify-between items-end pt-4">
            <span className="font-outfit font-bold text-[9px] text-[#1a1a1a] uppercase tracking-[0.2em] opacity-60">
              @{brandHandle || 'seuhandle'}
            </span>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg translate-y-[5px]"
              style={{ backgroundColor: brandColor }}
            >
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
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
        className="w-[32%] h-full flex flex-col justify-between relative z-10 border-r border-[#1a1a1a]/40"
        style={{ backgroundColor: brandColor }}
      >
        <div className="p-4 h-12">
          {isVerified && <BadgeCheck className="w-5 h-5 text-white/90" />}
        </div>

        {/* Título centralizado na barra lateral */}
        <div className="flex-1 flex flex-col justify-center px-4 w-full">
          <div className="w-[3rem] h-[0.1875rem] bg-white mb-4" />
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
        <span className="font-outfit text-[8px] text-white tracking-[0.2em] uppercase font-bold relative -top-[5px]">
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
        <div 
          className="col-span-2 row-span-2 rounded-xl overflow-hidden relative shadow-inner ring-1 ring-black/5"
          style={{ border: '4px solid rgba(255, 255, 255, 0.3)' }}
        >
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
        <div 
          className="w-[90%] h-[75%] rounded-t-[1000px] overflow-hidden relative shadow-inner ring-1 ring-black/10 shrink-0"
          style={{ border: '4px solid rgba(255, 255, 255, 0.3)' }}
        >
          <ImageBg data={data} className="absolute inset-0" />
        </div>
        
        {/* Título Sobreposto */}
        <div className="absolute bottom-10 w-full flex flex-col items-center text-center z-30">
          <div className="bg-[#EBE9E1] px-6 py-2 rounded-full border shadow-lg transform -translate-y-1/2" style={{ borderColor: `${brandColor}33` }}>
            <SmartField field="badge_text" {...sp}>
              <span 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
                className="font-outfit font-black text-[10px] tracking-[0.3em] uppercase outline-none relative -top-1" style={{ color: brandColor }}>
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
            className="font-outfit font-medium text-[9px] max-w-[140px] uppercase tracking-widest leading-relaxed outline-none break-words"
            style={{ color: '#57575d' }}>
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
            <div className="w-10 h-10 rounded-full flex items-center justify-center " style={{ backgroundColor: brandColor }}>
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
      {/* Grid Lines (Copiado da Variante 113) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute left-[15%] top-0 bottom-0 w-[1px] bg-[#1a1a1a]/10"></div>
        <div className="absolute left-[85%] top-0 bottom-0 w-[1px] bg-[#1a1a1a]/10"></div>
        <div className="absolute top-[20%] left-0 right-0 h-[1px] bg-[#1a1a1a]/10"></div>
        <div className="absolute top-[80%] left-0 right-0 h-[1px] bg-[#1a1a1a]/10"></div>
      </div>

      {/* Número gigante ao fundo */}      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
        <span className="font-playfair font-black text-[#1a1a1a] text-[35rem] leading-none opacity-[0.03] select-none -translate-y-12">
          {data.badge_text?.charAt(0) || '5'}
        </span>
      </div>

      <div className="absolute top-5 left-5 flex items-center gap-2 z-20">
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: brandColor }}></div>
        <span className="font-outfit font-bold text-[#1a1a1a] text-[9px] tracking-[0.2em] uppercase">@{brandHandle || 'seuhandle'}</span>
      </div>

      <div className="relative w-[85%] flex flex-col items-center z-10 mt-8">
        <div 
          className="w-full aspect-square rounded-full overflow-hidden ring-4 ring-white mb-6 relative z-10 shrink-0"
          style={{ 
            boxShadow: `0 25px 50px -12px ${brandColor}40`,
            border: '4px solid rgba(255, 255, 255, 0.3)'
          }}
        >
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
          <div 
            className="w-full h-[60%] rounded-xl overflow-hidden mb-6 transform -translate-x-12 shrink-0 relative z-10"
            style={{ 
              border: '3px solid rgb(206 206 206 / 25%)',
              boxShadow: `0 20px 25px -5px ${brandColor}33, 0 8px 10px -6px ${brandColor}33`
            }}
          >
            <ImageBg data={data} className="absolute inset-0" />
          </div>
          <div className="mt-auto">
            <div className="mb-4" style={{ width: '3rem', height: '2px', backgroundColor: brandColor }}></div>
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
              <div className="p-3 rounded-lg " style={{ backgroundColor: '#1a1a1a' }}>
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
      
      <div 
        className="w-full aspect-[4/2.8] rounded-2xl overflow-hidden relative mb-10 shrink-0"
        style={{ 
          filter: `drop-shadow(0 25px 25px ${brandColor}40)`,
          border: '4px solid rgba(255, 255, 255, 0.3)'
        }}
      >
        <ImageBg data={data} className="absolute inset-0" />
        <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl"></div>
      </div>

      <div className="w-full flex justify-between items-center border-t border-zinc-300 pt-6 mt-auto">
        <SmartField field="texto_apoio" {...sp}>
          <p 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-outfit text-[9px] uppercase tracking-[0.2em] outline-none break-words"
            style={{ color: '#57575d' }}>
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
            className="w-12 h-12 rounded-full border-2 flex items-center justify-center "
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
          <div 
            className="w-[85%] aspect-square relative rounded-full overflow-hidden ring-1 ring-[#1a1a1a]/20"
            style={{ 
              boxShadow: `0 25px 50px -12px ${brandColor}40`,
              border: '4px solid rgba(255, 255, 255, 0.3)'
            }}
          >
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
        <div className="absolute top-4 left-6">
          <SmartField field="badge_text" {...sp}>
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="font-outfit font-black text-[#1a1a1a] text-[9px] tracking-[0.4em] uppercase outline-none break-words"
            >
              {data.badge_text || 'VOL. 01'}
            </span>
          </SmartField>
        </div>
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
      
      <div className="h-[50%] w-full relative overflow-hidden rounded-[8px] ring-1 ring-[#1a1a1a]/10">
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

        <div className="w-full">
          <div className="mb-4" style={{ width: '22rem', height: '1px', backgroundColor: 'rgb(26 26 26 / 0.1)' }}></div>
          <div className="flex justify-between items-end w-full">
            <span className="font-outfit font-bold text-[#1a1a1a]/50 text-[10px] uppercase tracking-[0.3em]">@{brandHandle || 'seuhandle'}</span>
            <div className="w-8 h-8 flex items-center justify-center rounded-sm translate-y-[4px]" style={{ backgroundColor: brandColor }}>
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
    <div className="relative w-full h-full overflow-hidden flex flex-col mx-auto p-2" style={{ backgroundColor: brandColor }}>
      <div className="w-full flex-1 border border-white/20 rounded-xl relative overflow-hidden flex flex-col p-6">
        
        <div className="flex justify-between items-start w-full relative z-20">
          <span className="font-outfit font-black text-white text-[11px] tracking-widest uppercase">
            @{brandHandle || 'seuhandle'}
          </span>
          <Store className="w-5 h-5 text-white/70" />
          </div>
        <div 
          className="absolute top-[20%] right-[-10%] w-[80%] aspect-square rounded-full overflow-hidden shadow-2xl ring-8 z-10 " 
          style={{ '--tw-ring-color': brandColor, border: '4px solid #ffffffb3' }}
        >
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
        <div 
          className="w-[65%] aspect-square relative overflow-hidden z-10"
          style={{ 
            boxShadow: `0 25px 50px -12px ${brandColor}40`,
            border: '3px solid rgba(255, 255, 255, 0.2)'
          }}
        >
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
        <div className="w-8 h-8 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center ">
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
    <div className="relative w-full h-full bg-[#EBE9E1] overflow-hidden flex flex-col mx-auto p-2 ring-1 ring-black/10">
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
        <div 
          className="absolute right-[25px] top-[15%] w-[85%] aspect-square bg-zinc-200 z-10 rounded-[20px] overflow-hidden"
          style={{ 
            boxShadow: `0 25px 50px -12px ${brandColor}40`,
            border: '4px solid #ffffff4d'
          }}
        >
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
          <div className="h-[1px] mb-4" style={{ width: '22rem', backgroundColor: 'rgb(0 0 0 / 0.1)' }}></div>
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
    <div className="relative w-full h-full bg-white overflow-hidden flex flex-col mx-auto p-4">
      
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
      
      <div className="w-[20%] h-full flex flex-col justify-between py-8 px-4 border-r border-[#1a1a1a]/10 z-10 bg-[#EBE9E1] shrink-0">
        <BadgeCheck className="w-5 h-5 mx-auto" style={{ color: brandColor }} />

        <div className="flex-1 flex items-center justify-center relative">
          <SmartField field="badge_text" {...sp}>
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
              className="font-outfit font-black text-[#1a1a1a] text-[11px] tracking-[0.4em] uppercase -rotate-90 whitespace-nowrap outline-none origin-center inline-block min-w-max translate-x-[2px]">
              {data.badge_text || 'A SELEÇÃO'}
            </span>
          </SmartField>
        </div>

        <ArrowRight className="w-5 h-5 text-[#1a1a1a] mx-auto" />
      </div>

      <div className="w-[80%] h-full relative overflow-hidden flex flex-col">
        <div className="h-[75%] w-full relative shrink-0">
          <ImageBg data={data} className="absolute inset-0" />
        </div>
        
        <div className="flex-1 flex flex-col justify-center px-6 relative" style={{ backgroundColor: brandColor }}>
          <div className="absolute top-0 left-6 w-12 h-1 bg-white"></div>
          <SmartField field="titulo" {...sp}>
            <h2 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-playfair font-black text-[#EBE9E1] leading-none tracking-tighter -mt-2 outline-none break-words"
              style={{ fontSize: `${64 * sTitle}px` }}>
              {data.titulo || 'TOP 5'}
            </h2>
          </SmartField>
          <span className="font-outfit text-white text-[8px] tracking-[0.2em] uppercase mt-1">
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
        <ImageBg data={data} className="absolute inset-0 mix-blend-luminosity opacity-99" />
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
        <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 w-full p-5 rounded-xl flex justify-between items-center z-20">
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
      
      <div 
        className="h-[65%] w-full relative overflow-hidden rounded-b-[40px] z-10 shrink-0"
        style={{ boxShadow: `0 10px 15px -3px ${brandColor}33, 0 4px 6px -4px ${brandColor}33` }}
      >
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
            <SmartField field="texto_apoio" {...sp} className="pointer-events-auto">
              <span 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                className="font-outfit text-zinc-500 text-[8px] uppercase tracking-[0.2em] outline-none break-words mb-1 relative -top-[15px]">
                {data.texto_apoio || 'A SELEÇÃO QUE VOCÊ MERECE'}
              </span>
            </SmartField>
            <span className="font-outfit font-bold text-[#1a1a1a] text-[10px] uppercase tracking-widest">@{brandHandle || 'seuhandle'}</span>
          </div>
          <div className="w-10 h-10 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center shrink-0">
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
    <div className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center p-6 mx-auto" style={{ backgroundColor: brandColor }}>
      
      <div className="absolute top-6 w-full px-6 flex justify-between items-center z-20 pointer-events-none">
        <BadgeCheck className="w-5 h-5 text-white" />
        <SmartField field="badge_text" {...sp} className="pointer-events-auto">
          <span 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
            className="font-outfit font-bold text-white text-[9px] tracking-[0.3em] uppercase outline-none break-words">
            {data.badge_text || 'Editorial'}
          </span>
        </SmartField>
      </div>

      <div className="w-[70%] h-[75%] rounded-t-full rounded-b-full overflow-hidden relative z-10 shrink-0 mt-4" style={{ border: '4px solid rgb(255 255 255)', boxShadow: `0 0 60px color-mix(in srgb, ${brandColor}, white 35%)` }}>
        <ImageBg data={data} className="absolute inset-0 opacity-90 " />
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
        <span className="font-outfit text-white text-[8px] tracking-[0.4em] uppercase">@{brandHandle || 'seuhandle'}</span>
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
      
      <div className="h-[25%] w-full flex flex-col justify-end p-6 bg-[#EBE9E1] shrink-0">
        <div className="flex items-center justify-between mb-[10px] pointer-events-none">
          <div className="flex items-center gap-2">
            <div className="w-8 h-[1px]" style={{ backgroundColor: brandColor }}></div>
            <SmartField field="badge_text" {...sp} className="pointer-events-auto">
              <span 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
                className="font-outfit font-bold text-[9px] uppercase tracking-[0.2em] outline-none break-words inline-block"
                style={{ color: brandColor, transform: 'translateY(-2px)' }}>
                {data.badge_text || 'A Coleção'}
              </span>
            </SmartField>
          </div>
          {isVerified && <BadgeCheck className="w-4 h-4" style={{ color: brandColor }} />}
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

      <div className="h-[45%] w-full relative overflow-hidden bg-black flex items-center shadow-inner shrink-0" style={{ borderBottom: '8px solid #ffffff' }}>
        <ImageBg data={data} className="absolute inset-0" />
      </div>

      <div className="flex-1 w-full p-6 flex flex-col justify-between shrink-0" style={{ backgroundColor: brandColor }}>
        <SmartField field="texto_apoio" {...sp}>
          <p 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-outfit text-white/70 text-[11px] leading-relaxed max-w-[200px] uppercase tracking-widest font-medium outline-none break-words">
            {data.texto_apoio || 'A SELEÇÃO QUE VOCÊ MERECE'}
          </p>
        </SmartField>
        
        <div className="flex flex-col gap-4 w-full">
          <div className="h-[1px] mx-auto" style={{ width: '22rem', backgroundColor: 'rgb(255 255 255 / 0.2)' }}></div>
          <div className="flex justify-between items-end w-full pointer-events-none">
            <span className="font-outfit font-bold text-white/40 text-[9px] tracking-[0.3em] uppercase">@{brandHandle || 'seuhandle'}</span>
            <ArrowDownRight className="w-5 h-5 text-white/80" />
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
    <div className="relative w-full h-full bg-[#DE1E4D] overflow-hidden flex flex-col p-2 mx-auto border-[6px] border-[#DE1E4D]" style={{ backgroundColor: brandColor, borderColor: brandColor }}>
      
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

        <div className="absolute right-5 top-24 w-28 aspect-[3/4] bg-zinc-300 z-10 overflow-hidden" style={{ boxShadow: `10px 10px 0px ${brandColor}` }}>
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
      <div className="w-[40%] h-full relative overflow-hidden z-10 border-r border-black/10 shrink-0">
        <ImageBg data={data} className="absolute inset-0 h-full" />
      </div>

      {/* Bloco de Texto Claro */}
      <div className="w-[60%] h-full bg-[#ebe9e1] p-6 flex flex-col justify-between relative shrink-0">
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
            <div className="w-8 h-8 rounded-full border border-[#1A1A1A] flex items-center justify-center shrink-0 translate-y-[5px]">
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

      <div className="relative z-10 w-[90%] aspect-[3/4] bg-[#EBE9E1] rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden">
        
        <div className="h-[40%] w-full relative overflow-hidden">
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
    <div className="relative w-full h-full bg-[#EBE9E1] overflow-hidden flex flex-col mx-auto">
      
      <div className="h-1/2 w-full flex border-b-4 border-[#CECECE]">
        <div className="w-[20%] h-full flex flex-col items-center justify-between p-4 border-r-2 border-[#CECECE]" style={{ backgroundColor: brandColor }}>
          <LayoutGrid className="w-5 h-5 text-white" />
          <SmartField field="badge_text" {...sp} className="relative z-10">
            <span 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="font-outfit font-black text-white text-[11px] uppercase tracking-[0.2em] -rotate-90 whitespace-nowrap block w-max outline-none mb-16">
              {data.badge_text || 'EDIÇÃO 38'}
            </span>
          </SmartField>
        </div>
        <div className="w-[80%] h-full relative overflow-hidden">
          <ImageBg data={data} className="absolute inset-0" />
        </div>
      </div>

      <div className="h-1/2 w-full bg-[#EBE9E1] flex flex-col justify-between p-6 relative">
        <div className="absolute top-0 right-6 w-16 h-16 flex items-center justify-center rounded-b-xl shadow-lg" style={{ backgroundColor: brandColor }}>
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

        <div className="flex justify-between items-end w-full border-t-2 border-[#1a1a1a33] pt-3 pointer-events-none">
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
          <Store className="w-5 h-5" style={{ color: '#57575db3' }} />
          <SmartField field="badge_text" {...sp}>
            <span 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="font-outfit font-bold text-[9px] uppercase tracking-[0.4em] outline-none"
              style={{ color: '#57575db3' }}>
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
              className="font-outfit text-[9px] uppercase tracking-[0.3em] mt-8 max-w-[180px] leading-relaxed outline-none break-words"
              style={{ color: '#57575d' }}>
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
      
      <div className="h-[55%] w-full relative overflow-hidden z-0 pointer-events-none">
        <ImageBg data={data} className="absolute inset-0" />
      </div>

      <div className="h-[45%] w-full p-6 flex flex-col justify-end relative z-10 border-t-[8px]" style={{ backgroundColor: '#FDF3F3', borderTopColor: brandColor }}>
        
        <div className="absolute z-20 flex flex-col gap-4" style={{ top: '30px', left: '24px' }}>
          <SmartField field="titulo" {...sp}>
            <h2 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-playfair font-black text-[#1a1a1a] leading-[0.8] tracking-tighter drop-shadow-2xl outline-none break-words"
              style={{ fontSize: `${96 * sTitle}px` }}>
              {data.titulo || 'TOP 5'}
            </h2>
          </SmartField>
          <SmartField field="texto_apoio" {...sp} className="pointer-events-auto">
            <span 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-outfit font-medium text-zinc-600 text-[8px] uppercase tracking-[0.3em] outline-none">
              {data.texto_apoio || 'Experiência Premium'}
            </span>
          </SmartField>
        </div>

        <div className="w-full flex justify-between items-end border-t border-black/10 pt-4 mt-12 pointer-events-none">
          <span className="font-outfit font-bold text-[#1a1a1a]/50 text-[10px] uppercase tracking-widest">
            @{brandHandle || 'seuhandle'}
          </span>
          <div className="bg-black/5 p-2 rounded backdrop-blur-md translate-y-[7px]">
            <ArrowDownRight className="w-5 h-5 text-[#1a1a1a]/80" />
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
        <ImageBg data={data} className="absolute inset-0 " />
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

        <div className="mt-8 flex items-center gap-2 bg-white/10 px-5 py-2 rounded-full border border-white/20 pointer-events-none">
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
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center " style={{ borderColor: brandColor }}>
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

      <div 
        className="w-[85%] flex-1 rounded-t-full overflow-hidden relative z-10"
        style={{ 
          border: '3px solid rgba(255, 255, 255, 0.3)',
          boxShadow: `0 20px 25px -5px ${brandColor}33, 0 8px 10px -6px ${brandColor}33` 
        }}
      >
        <ImageBg data={data} className="absolute inset-0" />
      </div>

      <div className="w-full flex flex-col items-center text-center mt-8 z-10">
        <SmartField field="titulo" {...sp}>
          <h2 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-playfair font-normal text-[#1a1a1a] leading-none tracking-tight mb-3 outline-none break-words" style={{ fontSize: `${71 * sTitle}px` }}>
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
      
      <div 
        className="absolute top-8 right-6 w-[75%] h-[55%] bg-zinc-200 overflow-hidden z-10 rounded-[14px]"
        style={{ 
          border: '3px solid rgba(255, 255, 255, 0.3)',
          boxShadow: `0 20px 25px -5px ${brandColor}33, 0 8px 10px -6px ${brandColor}33`
        }}
      >
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
            <div className="w-8 h-8 rounded-full border border-zinc-400 flex items-center justify-center ">
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
        <ImageBg data={data} className="absolute inset-0 opacity-50 " />
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
              <span className="font-outfit font-light text-white/70 text-[9px] uppercase tracking-[0.2em] ">
                Iniciar Experiência
              </span>
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm ">
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
        
        <div 
          className="w-full h-[65%] relative overflow-hidden bg-zinc-100 mb-6 z-10 rounded-[10px]"
          style={{ border: '3px solid rgb(206 206 206 / 25%)' }}
        >
          <ImageBg data={data} className="absolute inset-0 mix-blend-multiply " />
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

      <div className="relative z-10 bg-[#FDFBF7] p-3 pb-8 rounded shadow-[0_20px_40px_rgba(0,0,0,0.08)] transform -rotate-1 w-[75%]">
        
        <div className="w-full aspect-[4/5] relative overflow-hidden bg-zinc-100 z-10">
          <ImageBg data={data} className="absolute inset-0 opacity-90 " />
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
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm ">
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
// EXTRA VARIANTE 148 — THE GLASSMORPHISM
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant148({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="group relative w-full h-full bg-zinc-900 overflow-hidden flex flex-col justify-between" style={{ isolation: 'isolate' }}>
      <ImageBg data={data} className="absolute inset-0 transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/90" />
      
      <div className="relative z-20 p-6 flex justify-between items-center w-full">
        <div className="relative overflow-hidden rounded-full border border-white/10">
          <div className="absolute inset-0 backdrop-blur-md bg-black/40" />
          <span className="relative z-10 font-outfit font-bold tracking-widest text-[10px] text-white/80 px-3 py-1.5 uppercase block">
            @{brandHandle || 'seuhandle'}
          </span>
        </div>
        {isVerified && (
          <BadgeCheck className="w-5 h-5" style={{ color: brandColor }} />
        )}
      </div>

      <div className="relative z-10 px-6 pb-12 w-full">
        <div className="relative rounded-2xl shadow-2xl overflow-hidden border border-white/20">
          {/* Camada de Blur isolada para evitar bug no download (html-to-image) */}
          <div className="absolute inset-0 backdrop-blur-xl bg-black/40" />
          
          {/* Linha decorativa superior */}
          <div className="absolute top-0 left-0 w-full h-1 z-10" style={{ background: `linear-gradient(to right, transparent, ${brandColor}, transparent)` }} />
          
          <div className="relative z-10 p-8">
            <SmartField field="titulo" {...sp}>
              <h2 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
                className="font-outfit font-black leading-none text-white mb-3 outline-none break-words"
                style={{ fontSize: `${40 * sTitle}px` }}
              >
                {data.titulo || 'O TOP 5 QUE SEU FDS'}
              </h2>
            </SmartField>

            <SmartField field="texto_apoio" {...sp}>
              <p 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                className="font-playfair italic text-white/80 outline-none break-words"
                style={{ fontSize: `${20 * sText}px` }}
              >
                {data.texto_apoio || 'merece.'}
              </p>
            </SmartField>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex justify-between items-center border-t border-white/10 backdrop-blur-md">
        <span className="font-outfit text-[10px] font-semibold tracking-widest uppercase text-white/70">
          Deslize para adoçar o dia
        </span>
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center transform group-hover:translate-x-1 transition-transform">
          <ArrowRight className="w-4 h-4 text-black" strokeWidth={2.5} />
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
// EXTRA VARIANTE 150 — THE BOLD BRUTALIST
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant150({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="group relative w-full h-full overflow-hidden flex flex-col p-4 border-[8px]" style={{ backgroundColor: brandColor, borderColor: brandColor }}>
      <div className="flex justify-between items-center px-2 py-3" style={{ backgroundColor: brandColor }}>
        <span className="font-outfit font-black text-white text-xs tracking-widest uppercase border border-white/30 px-2 py-1 rounded-sm">
          @{brandHandle || 'seuhandle'}
        </span>
        {isVerified && (
          <BadgeCheck className="w-5 h-5 text-[#fdfbf7]" fill="currentColor" stroke="black" />
        )}
      </div>

      <div className="relative flex-1 bg-zinc-900 rounded-t-full overflow-hidden mt-2 ring-4 ring-[#fdfbf7]">
        <ImageBg data={data} className="absolute inset-0 transition-all duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        
        <div className="absolute bottom-5 left-0 w-full text-center px-4">
          <SmartField field="titulo" {...sp}>
            <h2 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-outfit font-black text-[#fdfbf7] uppercase flex flex-col items-center leading-[0.8] outline-none break-words"
              style={{ fontSize: `${60 * sTitle}px` }}
            >
              {data.titulo || 'TOP 5'}
            </h2>
          </SmartField>

          <SmartField field="texto_apoio" {...sp}>
            <span 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="inline-block text-xl mt-2 tracking-[0.3em] font-medium bg-[#fdfbf7] px-4 py-1 rounded-full whitespace-nowrap transform -rotate-2 outline-none break-words"
              style={{ color: brandColor, fontSize: `${20 * sText}px` }}
            >
              {data.texto_apoio || 'O QUE VC MERECE'}
            </span>
          </SmartField>
        </div>
      </div>

      <div className="bg-[#fdfbf7] mt-4 rounded-xl p-4 flex justify-center items-center relative">
        <span className="font-outfit font-bold text-black text-[11px] uppercase tracking-widest text-center">
          Deslize para adoçar o dia
        </span>
        <div className="absolute right-4 w-8 h-8 rounded flex items-center justify-center transform group-hover:translate-x-1 transition-transform" style={{ backgroundColor: brandColor }}>
          <ArrowRight className="w-4 h-4 text-white" />
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
// EXTRA VARIANTE 151 — THE CINEMATIC
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant151({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="group relative w-full h-full bg-black overflow-hidden shadow-2xl ring-1 ring-zinc-800">
      <ImageBg 
        data={data} 
        className="absolute inset-0 opacity-60 scale-105 group-hover:scale-100 transition-transform duration-1000 blur-[2px] group-hover:blur-0" 
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
      
      <div className="absolute inset-0 flex flex-col items-center justify-between p-10 z-20">
        <div className="w-full flex justify-center items-center gap-3 opacity-60">
          <div className="h-[1px] w-6 bg-white/30" />
          <span className="font-outfit font-light tracking-[0.3em] text-[9px] text-white uppercase">
            @{brandHandle || 'seuhandle'}
          </span>
          <div className="h-[1px] w-6 bg-white/30" />
        </div>

        <div className="text-center w-full flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-6 backdrop-blur-md">
            <span className="font-cormorant font-bold text-2xl text-white italic">V</span>
          </div>
          
          <SmartField field="titulo" {...sp}>
            <h2 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-cormorant font-normal text-white mb-4 leading-tight outline-none break-words"
              style={{ fontSize: `${36 * sTitle}px` }}
            >
              {data.titulo || 'A Seleção Especial'}
            </h2>
          </SmartField>

          <SmartField field="texto_apoio" {...sp}>
            <p 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-outfit font-light text-zinc-400 text-xs tracking-widest uppercase max-w-[200px] outline-none break-words"
              style={{ fontSize: `${12 * sText}px` }}
            >
              {data.texto_apoio || 'Que o seu fds exige.'}
            </p>
          </SmartField>
        </div>

        <div className="flex flex-col items-center gap-4 cursor-pointer group/btn">
          <span className="font-outfit text-[10px] tracking-[0.2em] text-white/50 uppercase transition-colors group-hover/btn:text-white">
            Deslize para adoçar o dia
          </span>
          <div className="w-10 h-[1px] bg-white/20 relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full w-full transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 ease-out"
              style={{ backgroundColor: brandColor }}
            />
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
// EXTRA VARIANTE 152 — THE POLAROID
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant152({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="group relative w-full h-full bg-zinc-800 overflow-hidden shadow-2xl ring-1 ring-white/10 p-6 flex items-center justify-center">
      <ImageBg 
        data={data} 
        className="absolute inset-0 opacity-40 blur-[12px] scale-125" 
      />
      <div className="absolute inset-0 bg-black/40" />
      
      <div 
        className="absolute w-[75%] aspect-[3/4] rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.6)] -rotate-6 transform transition-transform duration-700 group-hover:-rotate-12 opacity-60 overflow-hidden" 
        style={{ 
          backgroundColor: '#ffffff',
          backgroundImage: `linear-gradient(${brandColor}66, ${brandColor}66)`
        }}
      />
      
      <div className="relative w-[85%] bg-[#F9F6F0] p-3 pb-12 rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.5)] rotate-3 transform transition-transform duration-700 group-hover:rotate-0 flex flex-col z-10">
        
        <div className="w-full aspect-[4/5] bg-zinc-200 overflow-hidden relative shadow-inner ring-1 ring-black/5">
          <ImageBg data={data} className="absolute inset-0" />
          <div 
            className="absolute top-2 left-2 text-white font-outfit font-black text-[11px] px-2.5 py-1 rounded-sm uppercase tracking-widest shadow-md"
            style={{ backgroundColor: brandColor }}
          >
            TOP 5
          </div>
        </div>

        <div className="absolute bottom-2 left-0 w-full text-center px-4 flex flex-col items-center justify-center h-10">
          <SmartField field="titulo" {...sp}>
            <h2 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-cormorant font-bold italic text-black leading-tight outline-none break-words"
              style={{ fontSize: `${40 * sTitle}px` }}
            >
              {data.titulo || 'Que seu fds exige'}
            </h2>
          </SmartField>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 z-30">
        <div 
          className="text-white px-5 py-2.5 rounded-full font-outfit text-[10px] font-bold uppercase tracking-widest shadow-xl flex items-center gap-2 cursor-pointer transform hover:scale-105 transition-transform ring-2 ring-white/10"
          style={{ backgroundColor: brandColor }}
        >
          Deslizar <ArrowRight className="w-3 h-3" />
        </div>
      </div>

      <div className="absolute top-6 left-6 z-30 opacity-60">
        <span className="font-outfit font-bold tracking-widest text-[9px] text-white uppercase drop-shadow-md">
          @{brandHandle || 'seuhandle'}
        </span>
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
// EXTRA VARIANTE 153 — THE TACTILE LIGHT
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant153({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="group relative w-full h-full bg-[#FAF8F5] overflow-hidden shadow-2xl ring-1 ring-zinc-200 flex flex-col items-center justify-between p-6">
      <div className="w-full flex justify-between items-center z-10">
        <span className="font-outfit font-bold tracking-widest text-[9px] text-[#2C2C2C] uppercase bg-white px-3 py-1.5 rounded-full shadow-sm border border-zinc-100">
          @{brandHandle || 'seuhandle'}
        </span>
        {isVerified && (
          <BadgeCheck className="w-5 h-5" style={{ color: brandColor }} />
        )}
      </div>

      <div className="relative w-3/4 aspect-square mt-4 mb-2 z-10">
        <div 
          className="absolute inset-0 rounded-t-full rounded-b-3xl transform translate-y-3 translate-x-2 blur-sm opacity-20"
          style={{ backgroundColor: brandColor }}
        />
        <div className="relative w-full h-full rounded-t-full rounded-b-3xl overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] ring-4 ring-white transition-transform duration-700 group-hover:scale-105">
          <ImageBg data={data} className="absolute inset-0" />
        </div>
        <div 
          className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-xl rotate-12 group-hover:rotate-0 transition-transform"
          style={{ backgroundColor: brandColor }}
        >
          <Sparkles className="w-5 h-5" />
        </div>
      </div>

      <div className="w-full text-center flex flex-col items-center z-10">
        <SmartField field="badge_text" {...sp}>
          <h3 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
            className="font-outfit font-black text-sm tracking-[0.2em] uppercase mb-2 outline-none break-words relative -top-[15px]"
            style={{ color: brandColor, fontSize: `${20 * sText}px` }}
          >
            {data.badge_text || 'Seleção Exclusiva'}
          </h3>
        </SmartField>

        <SmartField field="titulo" {...sp}>
          <h2 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-cormorant font-bold text-[#2C2C2C] leading-[0.9] italic mb-6 outline-none break-words"
            style={{ fontSize: `${44 * sTitle}px` }}
          >
            {data.titulo || 'O Top Cinco Do Final De Semana'}
          </h2>
        </SmartField>

        <div className="flex items-center gap-3 cursor-pointer group/btn">
          <span className="font-outfit font-semibold text-[#5a5a5a] text-xs uppercase tracking-widest transition-colors group-hover/btn:text-[#DE1E4D]">
            Deslize para adoçar o dia
          </span>
          <div 
            className="w-8 h-8 rounded-full border border-zinc-300 flex items-center justify-center transition-all group-hover/btn:border-transparent group-hover/btn:text-white"
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = brandColor; e.currentTarget.style.borderColor = brandColor; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = '#d4d4d8'; }}
          >
            <ArrowRight className="w-3 h-3 text-black" />
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
// EXTRA VARIANTE 154 — THE SPLIT SWISS
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant154({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="group relative w-full h-full bg-[#EBE9E1] overflow-hidden shadow-2xl ring-1 ring-white/10 flex flex-col">
      <div className="relative h-[55%] w-full overflow-hidden">
        <ImageBg data={data} className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
      </div>

      {/* Linha divisória branca */}
      <div className="h-[8px] w-full bg-white z-20" />
      
      <div className="relative h-[45%] w-full p-6 flex flex-col justify-between" style={{ backgroundColor: brandColor }}>
        <div className="flex justify-between items-center w-full border-b border-white/20 pb-4">
          <span className="font-outfit font-bold tracking-widest text-[10px] text-white uppercase">
            @{brandHandle || 'seuhandle'}
          </span>
          {isVerified && (
            <BadgeCheck className="w-4 h-4 text-white" />
          )}
        </div>

        <div className="flex justify-between items-end w-full">
          <SmartField field="texto_apoio" {...sp}>
            <p 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-outfit font-light text-white/90 tracking-widest uppercase max-w-[140px] leading-relaxed outline-none break-words"
              style={{ fontSize: `${14 * sText}px` }}
            >
              {data.texto_apoio || 'QUE O SEU FINAL DE SEMANA MERECE'}
            </p>
          </SmartField>

          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full cursor-pointer hover:bg-white/20 transition-colors">
            <span className="font-outfit font-bold text-[10px] uppercase tracking-widest text-white">Deslizar</span>
            <ArrowRight className="w-3 h-3 text-white" />
          </div>
        </div>
      </div>

      <div className="absolute top-[55%] left-6 -translate-y-1/2 z-10 pointer-events-none mt-[90px]">
        <SmartField field="titulo" {...sp}>
          <h2 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black leading-[0.85] tracking-tighter text-[#EBE9E1] drop-shadow-2xl mix-blend-difference outline-none break-words"
            style={{ fontSize: `${72 * sTitle}px` }}
          >
            {data.titulo || 'TOP 5'}
          </h2>
        </SmartField>
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
// EXTRA VARIANTE 156 — THE ORGANIC ARCH
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant156({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="group relative w-full h-full bg-[#F9F6F0] overflow-hidden shadow-2xl ring-1 ring-white/10 p-4">
      <div className="w-full h-full border rounded-t-[120px] rounded-b-2xl overflow-hidden relative flex flex-col" style={{ borderColor: `${brandColor}33` }}>
        <div className="relative h-[50%] w-full bg-zinc-200 overflow-hidden">
          <ImageBg data={data} className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110" />
        </div>

        <div className="flex-1 bg-[#F9F6F0] flex flex-col items-center justify-between p-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <Sparkles className="w-5 h-5" style={{ color: brandColor }} />
            <SmartField field="titulo" {...sp}>
              <h2 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
                className="font-cormorant font-bold text-[#2C2C2C] leading-none uppercase outline-none break-words"
                style={{ fontSize: `${58 * sTitle}px` }}
              >
                {data.titulo || (
                  <>
                    Top <span className="italic" style={{ color: brandColor }}>Five</span>
                  </>
                )}
              </h2>
            </SmartField>
          </div>

          <SmartField field="texto_apoio" {...sp}>
            <p 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-outfit text-[#5A5A5A] font-bold tracking-[0.2em] uppercase max-w-[180px] leading-relaxed outline-none break-words relative -top-[20px]"
              style={{ fontSize: `${13 * sText}px` }}
            >
              {data.texto_apoio || 'QUE O SEU FINAL DE SEMANA MERECE'}
            </p>
          </SmartField>

          <div className="w-full flex justify-between items-center pt-4 border-t" style={{ borderColor: `${brandColor}1A` }}>
            <span className="font-outfit font-bold text-[8px] tracking-widest text-[#2C2C2C] uppercase">
              @{brandHandle || 'seuhandle'}
            </span>
            <div className="flex items-center gap-1 cursor-pointer group/btn">
              <span className="font-outfit font-bold text-[9px] tracking-widest uppercase transition-colors" style={{ color: brandColor }}>
                Deslize para adoçar o dia
              </span>
              <ChevronRight className="w-3 h-3 transform group-hover/btn:translate-x-1 transition-transform" style={{ color: brandColor }} />
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
// EXTRA VARIANTE 157 — THE BENTO EDITORIAL
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant157({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="group relative w-full h-full bg-[#111] overflow-hidden shadow-2xl ring-1 ring-white/10 p-3 grid grid-cols-2 grid-rows-4 gap-3">
      <div className="col-span-2 row-span-3 bg-zinc-900 rounded-xl overflow-hidden relative shadow-inner">
        <ImageBg data={data} className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        
        <div className="absolute bottom-6 left-6 right-6">
          <SmartField field="titulo" {...sp}>
            <h2 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-outfit font-black text-white leading-[0.9] tracking-tighter uppercase mb-2 outline-none break-words"
              style={{ fontSize: `${48 * sTitle}px` }}
            >
              {data.titulo || (
                <>
                  TOP 5 <br/><span style={{ color: brandColor }}>DO FDS</span>
                </>
              )}
            </h2>
          </SmartField>

          <SmartField field="texto_apoio" {...sp}>
            <p 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-playfair italic text-white/80 leading-tight outline-none break-words"
              style={{ fontSize: `${18 * sText}px` }}
            >
              {data.texto_apoio || 'A seleção que você realmente merece saborear.'}
            </p>
          </SmartField>
        </div>

        <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md rounded-full px-3 py-1 border border-white/10">
          <span className="font-outfit text-white text-[10px] font-bold tracking-widest">VOL. 0{index + 1}</span>
        </div>
      </div>

      <div className="col-span-1 row-span-1 bg-white/5 border border-white/10 rounded-xl flex flex-col items-center justify-center backdrop-blur-sm p-4 text-center hover:bg-white/10 transition-colors">
        <Crown className="w-5 h-5 mb-1" style={{ color: brandColor }} />
        <span className="font-outfit font-bold tracking-widest text-[8px] text-white/70 uppercase leading-tight">
          @{brandHandle || 'seuhandle'}
        </span>
      </div>

      <div 
        className="col-span-1 row-span-1 rounded-xl flex items-center justify-center cursor-pointer group/cta shadow-xl hover:opacity-90 transition-all relative overflow-hidden"
        style={{ backgroundColor: brandColor }}
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/cta:translate-y-0 transition-transform duration-300" />
        <div className="relative flex items-center gap-2">
          <span className="font-outfit font-bold text-white text-[10px] uppercase tracking-widest">Deslizar</span>
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center group-hover/cta:translate-x-1 transition-transform">
            <ChevronRight className="w-4 h-4 stroke-[3]" style={{ color: brandColor }} />
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
// EXTRA VARIANTE 159 — THE FLOATING TYPO
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant159({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="group relative w-full h-full bg-[#0c0c0c] overflow-hidden shadow-2xl ring-1 ring-white/10 flex items-center justify-center p-6">
      <div className="absolute inset-0 opacity-50 blur-[10px] scale-110 pointer-events-none transition-opacity duration-700">
        <ImageBg data={data} className="w-full h-full object-cover" />
      </div>
      
      <h2 
        className="absolute z-0 font-cormorant font-black text-white leading-none opacity-20 -translate-y-12 group-hover:scale-110 transition-transform duration-1000 select-none"
        style={{ fontSize: `${320 * sTitle}px`, color: brandColor }}
      >
        5
      </h2>

      <div className="relative z-10 w-[70%] aspect-[4/5] bg-zinc-900 shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden rounded-md ring-1 ring-white/20 transform -rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-all duration-700">
        <ImageBg data={data} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="absolute z-20 bottom-20 left-[64px]">
        <SmartField field="titulo" {...sp}>
          <h2 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black text-white leading-[0.8] uppercase tracking-tighter drop-shadow-2xl outline-none break-words"
            style={{ fontSize: `${68 * sTitle}px` }}
          >
            {data.titulo || (
              <>
                O Top <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-rose-300" style={{ backgroundImage: `linear-gradient(to right, ${brandColor}, #fda4af)`, fontSize: `${80 * sTitle}px` }}>
                  Cinco
                </span>
              </>
            )}
          </h2>
        </SmartField>
      </div>

      <div className="absolute top-6 right-6 z-30">
        <div className="relative overflow-hidden rounded-full border border-white/10 px-4 py-2">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
          <span className="relative font-outfit font-bold tracking-[0.2em] text-[8px] text-white uppercase">
            @{brandHandle || 'seuhandle'}
          </span>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 z-30 cursor-pointer group/btn">
        <div 
          className="relative w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:opacity-90 transition-all shadow-xl overflow-hidden" 
          style={{ backgroundColor: brandColor }}
        >
          <div className="absolute inset-0 backdrop-blur-xl bg-white/10" />
          <ArrowRight className="relative z-10 w-5 h-5 text-white" />
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
// EXTRA VARIANTE 160 — Scrapbook Lux
// Design de colagem elegante com moldura polaroid e padrões.
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant160({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="group relative w-full h-full bg-[#F4F1EB] overflow-hidden flex flex-col p-6">
      {/* Padrão de pontos de fundo */}
      <div 
        className="absolute inset-0 opacity-50" 
        style={{
          backgroundImage: 'radial-gradient(rgb(213, 213, 213) 1px, transparent 1px)', 
          backgroundSize: '16px 16px'
        }}
      ></div>

      {/* Header do Scrapbook */}
      <div className="relative z-20 w-full flex justify-between items-start mb-2">
        <div className="bg-[#1a1a1a] text-white font-outfit font-black text-[9px] px-3 py-1 uppercase tracking-widest transform -rotate-3 shadow-md">
          EST. 2026
        </div>
        <span className="font-outfit font-bold text-[10px] tracking-[0.2em] uppercase bg-white/50 px-2 py-0.5 rounded-sm backdrop-blur-sm" style={{ color: brandColor }}>
          {brandHandle || 'SEUHANDLE'}
        </span>
      </div>

      {/* Moldura Polaroid da Imagem */}
      <div 
        className="relative z-10 w-[90%] aspect-square bg-white p-3 pb-12 transform rotate-2 group-hover:rotate-0 transition-transform duration-700 mx-auto mt-6"
        style={{ 
          boxShadow: `15px 15px 40px ${brandColor}33`
        }}
      >
        {/* Fita adesiva decorativa */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-7 bg-white/40 backdrop-blur-md border border-white/60 shadow-sm transform -rotate-2 z-30"></div>
        
        <div className="w-full h-full relative overflow-hidden bg-zinc-100 ring-1 ring-black/5">
          <ImageBg data={data} className="absolute inset-0 transition-transform duration-700 group-hover:scale-110" />
        </div>

        {/* Texto manuscrito na base da polaroid */}
        <div className="absolute bottom-3 left-0 w-full text-center opacity-80">
          <SmartField field="badge_text" {...sp}>
            <span 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="font-caveat text-2xl text-zinc-800 font-bold -rotate-2 inline-block outline-none"
            >
              {data.badge_text || 'o melhor do fds!'}
            </span>
          </SmartField>
        </div>
      </div>

      {/* Conteúdo inferior */}
      <div className="relative z-20 mt-auto flex flex-col">
        <SmartField field="titulo" {...sp}>
          <h2 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-playfair font-black text-[#1a1a1a] leading-[0.8] tracking-tighter -ml-1 outline-none"
            style={{ fontSize: `${72 * sTitle}px` }}
          >
            {data.titulo || 'TOP 5'}
          </h2>
        </SmartField>

        <div className="flex justify-between items-end mt-4">
          <SmartField field="texto_apoio" {...sp}>
            <p 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-outfit text-[#8A8275] text-[10px] font-medium tracking-[0.1em] uppercase max-w-[130px] leading-snug outline-none break-words"
            >
              {data.texto_apoio || 'QUE O SEU FINAL DE SEMANA MERECE'}
            </p>
          </SmartField>

          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform shadow-lg"
            style={{ 
              backgroundColor: brandColor,
              boxShadow: `0 10px 20px ${brandColor}4D`
            }}
          >
            <ArrowRight className="w-5 h-5" />
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
// EXTRA VARIANTE 162 — Swiss Grid
// Funcionalismo suíço. Bordas pesadas e grid rigoroso.
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant162({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="group relative w-full h-full bg-[#EBE9E1] overflow-hidden flex flex-col border-[3px] border-black">
      <div className="flex-1 flex min-h-0">
        {/* Barra Lateral Esquerda com Título Vertical */}
        <div className="w-[25%] bg-black flex items-center justify-center p-4">
          <SmartField field="titulo" {...sp} className="w-full">
            <h2 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-outfit font-black text-[#EBE9E1] uppercase -rotate-90 whitespace-nowrap leading-none outline-none"
              style={{ fontSize: `${48 * sTitle}px` }}
            >
              {data.titulo || 'TOP 5'}
            </h2>
          </SmartField>
        </div>

        {/* Área da Imagem Central */}
        <div className="flex-1 relative bg-white border-l-[3px] border-black overflow-hidden">
          <ImageBg data={data} className="w-full h-full transition-transform duration-700 group-hover:scale-105" />
          
          {/* Badge de Verificação / Ícone */}
          <div className="absolute top-4 right-4 bg-black p-2 shadow-lg">
            <ArrowDownRight className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Rodapé do Grid */}
      <div className="h-[25%] flex bg-white border-t-[3px] border-black">
        <div className="flex-1 p-4 flex flex-col justify-between border-r-[3px] border-black overflow-hidden">
          <span className="font-mono text-[10px] uppercase font-bold text-black truncate">
            {brandHandle || 'SEUHANDLE'}
          </span>
          <SmartField field="texto_apoio" {...sp}>
            <p 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-outfit text-[9px] uppercase tracking-widest text-zinc-600 max-w-[120px] outline-none break-words"
            >
              {data.texto_apoio || 'QUE O SEU FINAL DE SEMANA MERECE'}
            </p>
          </SmartField>
        </div>
        
        {/* Bloco de CTA */}
        <div 
          className="w-[30%] flex items-center justify-center cursor-pointer transition-colors group/cta"
          style={{ backgroundColor: brandColor }}
        >
          <ArrowRight className="w-8 h-8 text-white group-hover/cta:translate-x-1 transition-transform" />
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
// EXTRA VARIANTE 163 — Typographic Noise
// Fundo escuro com marquee tipográfico e imagem em destaque.
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant163({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  const marqueeText = (data.titulo || 'TOP 5').toUpperCase() + ' ';
  const repeatedText = Array(10).fill(marqueeText).join('');

  return (
    <div className="group relative w-full h-full overflow-hidden flex items-center justify-center">
      {/* Shielded Background Layers */}
      <div className="absolute -inset-10 bg-white z-0" />
      <div 
        className="absolute -inset-10 z-0" 
        style={{ backgroundColor: brandColor + '40' }} 
      />

      {/* Background Marquee */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex flex-col justify-center gap-2 z-10">
        {[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5].map((delay, i) => (
          <div 
            key={i} 
            className="whitespace-nowrap font-outfit font-black text-5xl transform -skew-x-12 animate-[marquee_10s_linear_infinite]" 
            style={{ 
              animationDelay: `${delay}s`, 
              animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
              color: brandColor
            }}
          >
            {repeatedText}
          </div>
        ))}
      </div>

      <div className="relative w-full h-full flex items-center justify-center p-6 z-20">
        {/* Main Image Container */}
        <div 
          className="relative w-full aspect-square rounded-[40px] overflow-hidden p-1"
          style={{ backgroundColor: brandColor, boxShadow: `0 0 50px ${brandColor}4D` }}
        >
          <div className="w-full h-full rounded-[36px] overflow-hidden relative group-hover:scale-[0.98] transition-transform duration-500 bg-zinc-800">
            <ImageBg data={data} className="absolute inset-0 w-full h-full" />
          </div>
        </div>

        {/* Bottom Floating Bar */}
        <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center z-20 bg-black/40 backdrop-blur-md border border-white/10 p-3 rounded-2xl">
          <span className="font-outfit font-bold text-[10px] text-white tracking-widest uppercase truncate max-w-[150px]">
            {brandHandle || 'SEUHANDLE'}
          </span>
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center cursor-pointer">
            <ArrowRight className="w-3 h-3 text-black" />
          </div>
        </div>

        {/* Hidden Text Edit */}
        <div className="absolute top-4 left-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 p-2 rounded">
          <SmartField field="titulo" {...sp}>
             <h2 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
                className="text-white text-xs font-mono outline-none"
              >
                {data.titulo || 'TOP 5'}
              </h2>
          </SmartField>
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
// EXTRA VARIANTE 164 — Split Bold
// Divisão horizontal forte, cor sólida vibrante e tipografia bold.
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant164({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="group relative w-full h-full overflow-hidden shadow-2xl flex flex-col" style={{ backgroundColor: brandColor }}>
      <div className="h-[35%] w-full flex flex-col justify-center px-8 relative">
        <span className="font-mono text-[9px] text-white/70 absolute top-6 left-8">
          {brandHandle || 'SEUHANDLE'}
        </span>
        <SmartField field="titulo" {...sp}>
          <h2 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-outfit font-black text-white uppercase tracking-tighter leading-none mt-4 outline-none break-words"
            style={{ fontSize: `${60 * sTitle}px` }}
          >
            {data.titulo || 'TOP 5'}
          </h2>
        </SmartField>
        <SmartField field="texto_apoio" {...sp}>
          <p 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-playfair italic text-white/90 text-sm mt-2 outline-none break-words"
          >
            {data.texto_apoio || 'QUE O SEU FINAL DE SEMANA MERECE'}
          </p>
        </SmartField>
        <div className="w-16 h-1 bg-white/40 mt-4" />
      </div>
      
      <div className="h-[65%] w-full bg-zinc-900 relative border-t-8 border-white overflow-hidden">
        <ImageBg data={data} className="absolute inset-0 w-full h-full" />
        
        <div className="absolute bottom-6 right-6 z-20 cursor-pointer hover:scale-105 transition-transform group/cta">
          <div className="relative overflow-hidden rounded-full border border-white/10 px-5 py-2.5 shadow-xl">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
            <div className="relative flex items-center gap-2 text-white font-outfit text-[10px] font-bold uppercase">
              Deslizar <ArrowRight className="w-4 h-4" />
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
// EXTRA VARIANTE 165 — Vogue Food
// Estilo editorial de luxo, com imagem full e tipografia Cormorant.
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant165({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="group relative w-full h-full bg-black overflow-hidden flex flex-col justify-between p-6">
      <div className="absolute inset-0 opacity-80 bg-zinc-900">
        <ImageBg data={data} className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-700" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none"></div>
      
      <div className="relative z-10 w-full text-center mt-2 flex flex-col items-center">
        <SmartField field="titulo" {...sp}>
          <h1 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-cormorant font-black text-white leading-[0.8] tracking-tighter uppercase drop-shadow-2xl outline-none break-words"
            style={{ fontSize: `${88 * sTitle}px` }}
          >
            {data.titulo || 'TOP 5'}
          </h1>
        </SmartField>
        
        <SmartField field="badge_text" {...sp}>
          <p 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
            className="font-outfit text-white/90 text-[10px] tracking-[0.3em] uppercase mt-4 drop-shadow-md outline-none"
            style={{ color: brandColor }}
          >
            {data.badge_text || 'The Weekend Edition'}
          </p>
        </SmartField>
      </div>
      
      <div className="relative z-10 flex justify-between items-end w-full mt-auto">
        <div className="flex flex-col">
          <span 
            className="font-outfit font-bold text-white text-[10px] px-2 py-1 uppercase w-fit mb-1"
            style={{ backgroundColor: brandColor }}
          >
            {brandHandle || 'SEUHANDLE'}
          </span>
          <SmartField field="texto_apoio" {...sp}>
            <span 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-playfair italic text-white/90 text-sm drop-shadow-md outline-none max-w-[200px] block"
            >
              {data.texto_apoio || 'QUE O SEU FINAL DE SEMANA MERECE'}
            </span>
          </SmartField>
        </div>
        
        <div className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center bg-black/40 backdrop-blur-sm cursor-pointer group-hover:bg-white/20 transition-colors">
          <ArrowRight className="w-4 h-4 text-white" />
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
// EXTRA VARIANTE 167 — Golden Hour
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant167({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
  <div className="group relative w-full h-full bg-[#EAE0D5] rounded-2xl overflow-hidden shadow-2xl flex flex-col p-6">
    <div className="absolute top-0 right-0 w-[150%] h-[150%] bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.6)_0%,transparent_50%)] pointer-events-none"></div>
    
    <div className="w-full flex justify-between items-center z-10">
      <span className="font-outfit font-bold text-[#8B7355] text-[8px] tracking-[0.3em] uppercase bg-white/50 px-3 py-1 rounded-full">
        {brandHandle || 'SEUHANDLE'}
      </span>
      <Sparkles className="w-4 h-4" style={{ color: brandColor }} />
    </div>
    
    <div className="relative z-10 w-full flex-1 flex flex-col justify-center items-center my-6">
      <div 
        className="w-full aspect-[4/3] rounded-lg overflow-hidden relative group-hover:scale-105 transition-transform duration-700"
        style={{ 
          border: '4px solid rgba(255, 255, 255, 0.3)',
          boxShadow: `0 15px 35px ${brandColor}40`
        }}
      >
        <ImageBg data={data} className="absolute inset-0 w-full h-full" />
      </div>
    </div>
    
    <div className="relative z-10 flex justify-between items-end w-full border-t pt-4" style={{ borderTopColor: 'rgba(16, 16, 16, 0.15)' }}>
      <div>
        <SmartField field="titulo" {...sp}>
          <h2 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-cormorant font-bold uppercase leading-none tracking-widest mb-1 outline-none break-words"
            style={{ fontSize: `${48 * sTitle}px`, color: '#101010' }}
          >
            {data.titulo || 'TOP 5'}
          </h2>
        </SmartField>
        <SmartField field="texto_apoio" {...sp}>
          <span 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-playfair italic text-xs outline-none"
            style={{ color: '#101010' }}
          >
            {data.texto_apoio || 'Exclusivo de Fim de Semana'}
          </span>
        </SmartField>
      </div>
      <div 
        className="w-8 h-8 rounded-full flex items-center justify-center text-[#EAE0D5] shadow-lg cursor-pointer hover:scale-110 transition-transform"
        style={{ backgroundColor: brandColor }}
      >
        <ArrowRight className="w-4 h-4" />
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
// EXTRA VARIANTE 172 — THE EDITORIAL SPLIT
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant172({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-zinc-900 overflow-hidden flex flex-col">
      
      {/* Top Image Block */}
      <div className="h-[53%] w-full relative overflow-hidden shrink-0 border-b-[8px] border-white">
         <ImageBg data={data} className="absolute inset-0" />
         <div className="absolute inset-0 bg-black/10 pointer-events-none" />
         
         {/* Author Tag flutuando na imagem */}
         <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 z-10">
           {brandAvatar && <img src={brandAvatar} className="w-4 h-4 rounded-full object-cover grayscale" alt="Author" />}
           <span className="text-white font-outfit text-[8px] uppercase tracking-widest font-bold">@{brandHandle || 'seuhandle'}</span>
         </div>
      </div>

      {/* Bottom Text Block */}
      <div className="flex-1 p-6 flex flex-col justify-center relative z-10" style={{ backgroundColor: brandColor }}>

         <div className="mt-4">
           <SmartField field="badge_text" {...sp}>
             <span 
               contentEditable suppressContentEditableWarning
               onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
               className="text-white/70 font-outfit text-[9px] uppercase tracking-[0.2em] font-bold block mb-2 outline-none">
               {data.badge_text || 'O Veredito'}
             </span>
           </SmartField>
           
           <SmartField field="titulo" {...sp}>
             <h2 
               contentEditable suppressContentEditableWarning
               onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
               className="font-outfit text-white font-black uppercase leading-[0.85] tracking-tighter outline-none break-words"
               style={{ fontSize: `${50 * sTitle}px` }}
             >
               {data.titulo || 'Absoluto'}
             </h2>
           </SmartField>
           
           <SmartField field="texto_apoio" {...sp}>
             <p 
               contentEditable suppressContentEditableWarning
               onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
               className="font-serif italic text-white/90 text-sm mt-3 leading-snug outline-none break-words max-w-[90%]">
               {data.texto_apoio || 'Quando o visual dispensa qualquer tipo de legenda persuasiva.'}
             </p>
           </SmartField>
         </div>

         <div className="absolute bottom-6 right-6 w-10 h-10 border border-white/30 rounded-full flex items-center justify-center">
           <ArrowRight className="w-4 h-4 text-white" />
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
// EXTRA VARIANTE 176 — THE ORGANIC OVERLAP
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant176({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-zinc-950 overflow-hidden flex flex-col">
      {/* Background Image */}
      <div className="absolute inset-0 h-[65%] w-full shrink-0">
         <ImageBg data={data} className="absolute inset-0" />
         <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>

      <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
        <SmartField field="badge_text" {...sp}>
          <span 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
            className="bg-black/50 backdrop-blur-md text-white font-outfit text-[8px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-white/20 outline-none block">
            {data.badge_text || 'Premium Series'}
          </span>
        </SmartField>
        {isVerified && <BadgeCheck className="w-5 h-5 text-white/90" />}
      </div>

      {/* O "Card" com Curva Dinâmica */}
      <div className="relative mt-auto h-[45%] w-full z-20">
         <div className="absolute inset-0 bg-white rounded-tr-[4rem] flex flex-col justify-end p-8 pb-10">
           
           {/* Floating Action Button (FAB) */}
           <div 
             className="absolute -top-6 right-8 w-14 h-14 rounded-full flex items-center justify-center"
             style={{ backgroundColor: brandColor, boxShadow: `0 10px 20px ${brandColor}66` }}
           >
              <ArrowRight className="w-6 h-6 text-white" />
           </div>

           <div className="-translate-y-[15px]">
             <SmartField field="texto_apoio" {...sp}>
               <p 
                 contentEditable suppressContentEditableWarning
                 onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                 className="font-outfit text-[9px] font-bold uppercase tracking-[0.2em] mb-2 outline-none break-words"
                 style={{ color: brandColor }}>
                 {data.texto_apoio || 'A Nova Assinatura'}
               </p>
             </SmartField>
             <SmartField field="titulo" {...sp}>
               <h2 
                 contentEditable suppressContentEditableWarning
                 onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
                 className="font-outfit text-zinc-900 font-black uppercase leading-none tracking-tighter outline-none break-words"
                 style={{ fontSize: `${45 * sTitle}px` }}
               >
                 {data.titulo || 'Elegância\nOrgânica'}
               </h2>
             </SmartField>
             <div className="w-full h-[1px] bg-gradient-to-r from-zinc-200 to-transparent mt-5" />
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
// EXTRA VARIANTE 183 — THE PROFILE SPLIT
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant183({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-zinc-950 overflow-hidden flex flex-col">
      {/* Top Half Image */}
      <div className="h-[52%] w-full relative overflow-hidden shrink-0">
         <ImageBg data={data} className="absolute inset-0" />
         <div className="absolute top-6 left-6 flex items-center gap-2 pointer-events-none">
           <Sparkles className="w-4 h-4" style={{ color: brandColor }} />
           <span className="text-white font-outfit text-[9px] uppercase tracking-[0.3em] font-bold">Premium</span>
         </div>
      </div>

      {/* Bottom Half Content */}
      <div className="flex-1 bg-white relative p-6 pt-10 flex flex-col justify-end z-10">
         {/* Avatar quebrando a linha */}
         <div className="absolute -top-8 left-6">
             {brandAvatar ? (
               <img src={brandAvatar} className="w-14 h-14 rounded-full object-cover border-[4px] border-white shadow-2xl" alt="Author" />
             ) : (
               <div className="w-14 h-14 rounded-full bg-zinc-100 border-[4px] border-white shadow-2xl" />
             )}
         </div>

         <div className="-translate-y-[25px]"><div className="mb-2">
            <SmartField field="badge_text" {...sp}>
              <span 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
                className="font-outfit text-[10px] font-black uppercase tracking-widest outline-none block"
                style={{ color: brandColor }}
              >
                {data.badge_text || 'Dicas do Especialista'}
              </span>
            </SmartField>
         </div>
         <SmartField field="titulo" {...sp}>
           <h2 
             contentEditable suppressContentEditableWarning
             onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
             className="font-outfit text-[#1A1A1A] font-black uppercase leading-[0.9] tracking-tighter outline-none break-words"
             style={{ fontSize: `${50 * sTitle}px` }}
           >
             {data.titulo || 'Segredo\nRevelado'}
           </h2>
         </SmartField></div>
         
         <div className="mt-5 pt-5 border-t border-zinc-200 flex justify-between items-center">
            <SmartField field="texto_apoio" {...sp}>
              <p 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                className="font-serif italic text-[#52525b] text-[13px] outline-none break-words flex-1 pr-4">
                {data.texto_apoio || 'O toque sutil que transforma.'}
              </p>
            </SmartField>
            <MoveUpRight className="w-5 h-5 text-zinc-600 shrink-0" />
         </div>
      </div>

      <SlideHeader
        data={data} slideIndex={index} index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={false}
        showSlideCounter={false}
        brandAvatar={null} brandColor={brandColor} isVerified={isVerified}
        brandLogo={brandLogo} showBrandLogo={showBrandLogo}
        onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        hideDot={true}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// EXTRA VARIANTE 185 — THE SPLIT PIVOT
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant185({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-zinc-950 overflow-hidden flex">
      {/* Bloco Sólido Esquerdo */}
      <div 
        className="w-[55%] p-6 flex flex-col justify-center relative z-10"
        style={{ backgroundColor: brandColor }}
      >
        <span className="absolute top-4 left-4 text-white/10 font-outfit font-black text-[120px] leading-none -z-10 tracking-tighter select-none pointer-events-none">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="mb-auto">
           <SmartField field="badge_text" {...sp}>
             <span 
               contentEditable suppressContentEditableWarning
               onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
               className="text-white/80 font-outfit text-[8px] uppercase tracking-[0.3em] font-bold outline-none block">
               {data.badge_text || 'Nova Coleção'}
             </span>
           </SmartField>
        </div>
        <div>
          <SmartField field="titulo" {...sp}>
            <h2 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-outfit text-white font-black uppercase leading-[0.85] tracking-tighter mb-4 outline-none break-words"
              style={{ fontSize: `${55 * sTitle}px` }}
            >
              {data.titulo || 'Título\nGourmet'}
            </h2>
          </SmartField>
          <SmartField field="texto_apoio" {...sp}>
            <p 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-serif italic text-white/90 text-[13px] leading-relaxed max-w-[90%] outline-none break-words">
              {data.texto_apoio || 'Subtítulo que não ofende a inteligência do consumidor premium.'}
            </p>
          </SmartField>
        </div>
      </div>
      
      {/* Imagem Direita */}
      <div className="flex-1 h-full relative shrink-0">
        <ImageBg data={data} className="absolute inset-0" />
      </div>

      {/* O Botão de Intersecção */}
      <div 
        className="absolute left-[55%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center z-20 pointer-events-none border-[3px]"
        style={{
          '--tw-shadow': '0 5px 10px rgb(0 0 0 / 15%)',
          '--tw-shadow-colored': '0 10px 20px var(--tw-shadow-color)',
          boxShadow: 'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)',
          borderColor: brandColor
        }}
      >
         <ArrowRight style={{ color: brandColor }} className="w-5 h-5" />
      </div>

      <SlideHeader
        data={data} slideIndex={index} index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={false}
        showSlideCounter={false}
        brandAvatar={null} brandColor={brandColor} isVerified={isVerified}
        brandLogo={brandLogo} showBrandLogo={showBrandLogo}
        onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        hideDot={true}
      />
    </div>
  );
}


// ═══════════════════════════════════════════════════════════
// EXTRA VARIANTE 187 — THE MINIMAL PILLAR
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant187({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#F4F4F0] overflow-hidden flex">
      {/* O Pilar da Marca */}
      <div 
        className="w-14 h-full flex flex-col items-center py-8 shadow-[10px_0_20px_rgba(0,0,0,0.05)] z-20 shrink-0"
        style={{ backgroundColor: brandColor }}
      >
         <div className="w-1 h-8 bg-white/70 rounded-full" />
         <div className="flex-1 flex flex-col items-center justify-center pointer-events-none">
           <span className="text-white font-outfit text-[9px] uppercase tracking-[0.4em] -rotate-90 whitespace-nowrap font-bold">
             {showBrandHandle ? `@${brandHandle}` : 'Brand'}
           </span>
         </div>
         <Plus className="w-4 h-4 text-white/70" />
      </div>

      {/* Área de Conteúdo */}
      <div className="flex-1 relative flex flex-col justify-center overflow-hidden">
         <div className="absolute top-6 left-6 right-6 h-[45%] rounded-2xl overflow-hidden">
            <ImageBg data={data} className="absolute inset-0" />
         </div>
         
         <div className="relative z-10 px-6 mt-[133px] w-full">
            <SmartField field="titulo" {...sp}>
              <h2 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
                className="text-zinc-900 font-outfit font-black uppercase leading-[0.8] tracking-tighter outline-none break-words"
                style={{ fontSize: `${55 * sTitle}px` }}
              >
                {data.titulo || 'Puro\nCacau'}
              </h2>
            </SmartField>
            <div className="mt-5 flex items-start gap-3">
               <div className="w-4 h-[1px] bg-zinc-400 mt-2 shrink-0" />
               <SmartField field="texto_apoio" {...sp}>
                 <p 
                   contentEditable suppressContentEditableWarning
                   onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                   className="font-serif normal text-zinc-500 text-[13px] max-w-[140px] leading-relaxed outline-none break-words">
                   {data.texto_apoio || 'A definição absoluta do que é premium no seu feed.'}
                 </p>
               </SmartField>
            </div>
         </div>

         <div className="absolute bottom-6 right-6 flex items-center gap-2 opacity-90 pointer-events-none">
            <span className="font-outfit text-zinc-400 text-[9px] uppercase tracking-widest font-bold">Deslize</span>
            <ChevronRight className="w-4 h-4" style={{ color: brandColor }} />
         </div>
      </div>

      <SlideHeader
        data={data} slideIndex={index} index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={false}
        showSlideCounter={false}
        brandAvatar={null} brandColor={brandColor} isVerified={false}
        brandLogo={brandLogo} showBrandLogo={showBrandLogo}
        onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        hideDot={true}
      />
    </div>
  );
}





// ═══════════════════════════════════════════════════════════
// EXTRA VARIANTE 200 — EDITORIAL HIGH-FASHION
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant200({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  return (
    <div className="relative w-full h-full bg-[#EAE8E3] overflow-hidden flex">
      <div 
        className="w-14 flex flex-col items-center justify-between py-6 z-10 shrink-0 pointer-events-none"
        style={{ backgroundColor: brandColor }}
      >
         <span className="text-white/80 font-outfit font-bold text-[10px] -rotate-90 whitespace-nowrap mt-12 tracking-[0.3em] uppercase">
           Edição {String(index + 1).padStart(2, '0')}
         </span>
         <div className="w-1 h-12 bg-white/70 rounded-full" />
      </div>
      <div className="flex-1 relative overflow-hidden shrink-0">
        <ImageBg data={data} className="absolute inset-0" />
        <div className="absolute bottom-0 left-0 p-5 z-10">
           <SmartField field="titulo" {...sp}>
             <h2 
               contentEditable suppressContentEditableWarning
               onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
               className="font-outfit text-white font-black uppercase leading-[0.9] tracking-tighter outline-none break-words"
               style={{ fontSize: `${65 * sTitle}px` }}
             >
               {data.titulo || `Alto\nPadrão`}
             </h2>
           </SmartField>
           <div className="mt-4 flex items-center gap-3 backdrop-blur-md bg-black/20 w-fit px-3 py-1.5 rounded-full border border-white/20">
              <SmartField field="badge_text" {...sp}>
                <span 
                  contentEditable suppressContentEditableWarning
                  onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
                  className="text-white font-outfit text-[9px] uppercase tracking-widest font-medium outline-none block"
                >
                  {data.badge_text || 'Deslize para ver'}
                </span>
              </SmartField>
              <div className="bg-white rounded-full p-1 pointer-events-none">
                <ChevronRight className="w-3 h-3 text-black" strokeWidth={3} />
              </div>
           </div>
        </div>
      </div>

      <SlideHeader
        data={data} slideIndex={index} index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={false}
        showSlideCounter={false}
        brandAvatar={null} brandColor={brandColor} isVerified={isVerified}
        brandLogo={brandLogo} showBrandLogo={showBrandLogo}
        onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        hideDot={true}
      />
    </div>
  );
}

// Auxiliar para extrair o texto limpo das spans editáveis de forma robusta
function extractTextFromSpansHtml(htmlString) {
  if (!htmlString) return '';
  if (!htmlString.includes('<') && !htmlString.includes('>')) {
    return htmlString.trim();
  }
  try {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    const spans = tempDiv.getElementsByTagName('span');
    if (spans.length > 0) {
      const texts = [];
      for (let i = 0; i < spans.length; i++) {
        const txt = spans[i].textContent || spans[i].innerText || '';
        if (txt.trim()) {
          texts.push(txt.trim());
        }
      }
      return texts.join('\n');
    }
    const textLines = tempDiv.innerText || tempDiv.textContent || '';
    return textLines.split('\n').map(line => line.trim()).filter(Boolean).join('\n');
  } catch (err) {
    return htmlString.replace(/<[^>]+>/g, '\n')
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .join('\n');
  }
}

// ═══════════════════════════════════════════════════════════
// EXTRA VARIANTE 201 — MINHA CONFEITARIA
// ═══════════════════════════════════════════════════════════
function sanitizeTextExtra201(value, defaultVal, templateDefaults = []) {
  if (value === undefined || value === null) {
    return defaultVal;
  }

  let text = '';
  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      text = value.map(item => {
        if (typeof item === 'object' && item !== null) {
          return item.text || item.value || JSON.stringify(item);
        }
        return String(item);
      }).join('\n');
    } else {
      text = value.text || value.value || value.content || '';
      if (!text) {
        try {
          const str = String(value);
          if (str !== '[object Object]') {
            text = str;
          } else {
            text = '';
          }
        } catch (e) {
          text = '';
        }
      }
    }
  } else {
    text = String(value);
  }

  // Se o texto contiver HTML, extrair apenas o texto das spans
  if (text.includes('<') && text.includes('>')) {
    text = extractTextFromSpansHtml(text);
  }

  text = text.trim();

  const isObjectString = text === '[object Object]' || 
                         text.includes('[object Object]') || 
                         text.toLowerCase().includes('[object') || 
                         text.toLowerCase().includes('object, object') ||
                         text.toLowerCase() === 'object';
                         
  const isTemplateDefault = templateDefaults.some(d => d.toLowerCase().trim() === text.toLowerCase().trim());

  if (!text || isObjectString || isTemplateDefault) {
    return defaultVal;
  }

  return text;
}

export function CoverExtraVariant201({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  // Fallbacks de imagem solicitados no arquivo de texto
  const defaultImage = "https://tudosobrebrigadeirogourmet.com/wp-content/uploads/2016/11/13-receitas-de-brigadeiros-gourmet-faceis.webp";
  const bgData = { ...data, imageUrl: data.imageUrl || defaultImage };

  // Suporte a pílulas de texto baseadas no texto_apoio ou fallback do layout original
  const textApoioDefault = "Por que escolher a\nConfeitaria da Mari\npara seu";
  
  // Sanitização ultra robusta para texto_apoio e titulo
  const rawTextApoio = sanitizeTextExtra201(data.texto_apoio, textApoioDefault, [
    'Subtítulo descritivo e convidativo',
    'Subtítulo descritivo',
    'Descrição detalhada e envolvente do conteúdo deste slide.'
  ]);
  
  const pilulas = rawTextApoio ? rawTextApoio.split('\n') : [];
  const pilulasHtml = pilulas.map(p => 
    `<span class="bg-[#FAF6F0] text-[#3d1c13] text-[35px] font-extrabold px-1.5 py-0 leading-[1.0] rounded-md shadow-md tracking-tight whitespace-nowrap">${p}</span>`
  ).join('\n');

  const rawTitulo = sanitizeTextExtra201(data.titulo, 'Evento Corporativo?', [
    'TOP 5', 
    'TÍTULO DE IMPACTO', 
    'TÍTULO DE\nIMPACTO', 
    'TÍTULO DE\r\nIMPACTO',
    'TÍTULO DE IMPACTO DO PRODUTO',
    'Título do Conteúdo'
  ]);

  // Tratamento de exibição do nome do logotipo do cabeçalho
  const logoMainWord = brandHandle ? (brandHandle.toLowerCase().includes('confeitaria') ? 'Confeitaria' : brandHandle) : 'Confeitaria';
  const logoSubWord = brandHandle ? (brandHandle.toLowerCase().includes('confeitaria') ? `da ${brandHandle.replace(/confeitaria/gi, '').replace(/da|do|de/gi, '').trim()}` : '') : 'da Mari';

  return (
    <div className="relative w-full h-full bg-[#3d1c13] flex flex-col justify-between overflow-hidden font-outfit text-white">
      {/* Círculos de fundo sutil */}
      <div className="absolute top-[-10%] left-[-10%] w-[120%] aspect-square rounded-full border border-white/5 pointer-events-none flex items-center justify-center">
        <div className="w-[80%] aspect-square rounded-full border border-white/5 flex items-center justify-center">
          <div className="w-[60%] aspect-square rounded-full border border-white/5" />
        </div>
      </div>

      {/* Top Header Logo */}
      <div className="relative z-10 flex flex-col items-center pt-[17px] shrink-0">
        {brandLogo && showBrandLogo ? (
          <div className="w-10 h-10 rounded-full overflow-hidden mb-1">
            <img src={brandLogo} alt="Logo" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8 text-amber-500 fill-current" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="6 6" />
              <circle cx="50" cy="50" r="25" className="text-[#DE1E4D]" />
              <circle cx="50" cy="50" r="10" fill="#fff" />
            </svg>
            <div className="text-left">
              <h1 className="text-[11px] font-black tracking-widest leading-none uppercase">{logoMainWord}</h1>
              {logoSubWord && (
                <p className="text-[9px] font-light tracking-wider leading-none text-zinc-300 mt-0.5">{logoSubWord}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Middle Typographic Block */}
      <div className="relative z-10 px-6 flex flex-col items-center text-center justify-center flex-1 min-h-0 mt-[-10px] pb-4">
        <SmartField field="texto_apoio" {...sp}>
          <div 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => {
              const cleanedText = extractTextFromSpansHtml(e.currentTarget.innerText);
              onTextChange(index, 'texto_apoio', cleanedText);
            }}
            className="flex flex-col gap-[7px] items-center outline-none cursor-text select-text"
            style={{ transform: `scale(${sText})` }}
            dangerouslySetInnerHTML={{ __html: pilulasHtml }}
          />
        </SmartField>
        
        <SmartField field="titulo" {...sp}>
          <h2 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-playfair italic text-white leading-none mt-0.5 drop-shadow-md outline-none cursor-text select-text break-words max-w-[340px]"
            style={{ fontSize: `${60 * sTitle}px` }}
          >
            {rawTitulo}
          </h2>
        </SmartField>
      </div>

      {/* Badge posicionado exatamente na linha divisória */}
      <div className="absolute bottom-[50%] left-1/2 z-20" style={{ transform: 'translate(-50%, 50%)' }}>
        <SmartField field="badge_text" {...sp}>
          <div className="bg-white text-black px-3 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-md">
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => {
                let text = e.currentTarget.innerText.trim();
                text = text.replace(/,?\s*\[object Object\]/gi, '').trim();
                onTextChange(index, 'badge_text', text);
              }}
              className="outline-none cursor-text select-text"
            >
              {(() => {
                let txt = data.badge_text;
                if (typeof txt === 'object' && txt !== null) {
                  txt = txt.text || txt.value || '';
                }
                if (typeof txt !== 'string') {
                  txt = String(txt || '');
                }
                txt = txt.replace(/,?\s*\[object Object\]/gi, '').trim();
                return txt || 'Passe para o lado';
              })()}
            </span>
            <ArrowRight className="w-3 h-3 text-[#DE1E4D] shrink-0" />
          </div>
        </SmartField>
      </div>

      {/* Bottom Team/Chef Photo Container */}
      <div className="h-[50%] w-full relative mt-auto border-t-2 border-[#FAF6F0]/20 shrink-0 overflow-hidden">
        <ImageBg data={bgData} className="w-full h-full object-cover" />
      </div>

      <SlideHeader
        data={data} slideIndex={index} index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
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
// EXTRA VARIANTE 202 — POST BRANCO CLÁSSICO
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant202({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  // Imagens padrão/fallback
  const defaultImage = "https://confeitarparavender.com.br/wp-content/uploads/2025/07/Sabores-de-brigadeiro-mais-vendidos.jpg";
  const bgData = { ...data, imageUrl: data.imageUrl || defaultImage };

  const defaultAvatar = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop";
  const avatarUrl = brandAvatar || defaultAvatar;

  const authorName = brandHandle || 'Post Branco Clássico';
  const authorUsername = brandHandle ? `@${brandHandle.toLowerCase().replace(/@/g, '')}` : '@postbrancoclassico';

  return (
    <div className="relative w-full h-full bg-white flex flex-col justify-between p-6 font-outfit text-zinc-900 border border-zinc-200 overflow-hidden">
      {/* Header Autor */}
      <div 
        className="flex items-center gap-3 relative z-10 shrink-0"
        style={{ transform: 'translate(16px, 35px)' }}
      >
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-zinc-100 shadow-sm relative shrink-0">
          <img 
            src={avatarUrl} 
            className="w-full h-full object-cover" 
            alt={authorName} 
          />
        </div>
        <div className="text-left">
          <h3 className="font-bold text-sm tracking-tight leading-tight flex items-center gap-1">
            {authorName} {isVerified && <BadgeCheck className="w-4 h-4 text-white shrink-0" style={{ fill: brandColor }} />}
          </h3>
          {showBrandHandle && (
            <p className="text-zinc-500 text-xs mt-0.5 leading-none">{authorUsername}</p>
          )}
        </div>
      </div>

      {/* Main Question & Alert Block */}
      <div className="flex flex-col gap-2 text-left relative z-10 mt-[40px] pl-[16px]">
        <SmartField field="titulo" {...sp}>
          <h2 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="text-[25px] font-black leading-tight tracking-tight text-black outline-none cursor-text select-text break-words max-w-[340px]"
            style={{ fontSize: `${25 * sTitle}px` }}
          >
            {data.titulo || '6 sinais de que seu bolo vai afundar antes mesmo de sair do forno'}
          </h2>
        </SmartField>
        
        <SmartField field="texto_apoio" {...sp}>
          <p 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="text-[#0a0a0a] text-xs leading-relaxed font-light mt-[10px] outline-none cursor-text select-text break-words max-w-[340px]"
            style={{ fontSize: `${21 * sText}px` }}
          >
            {data.texto_apoio || 'Seu bolo cresce lindo, mas depois de sair do forno ele afunda no meio?\nO problema quase nunca é o forno!'}
          </p>
        </SmartField>
      </div>

      {/* Bottom Cake Image Block */}
      <div 
        className="rounded-[10px] overflow-hidden relative shadow-inner border border-zinc-100 shrink-0 mb-8 ml-[16px]"
        style={{ height: 'calc(48% - 40px)', width: 'calc(100% - 30px)' }}
      >
        <ImageBg data={bgData} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
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
// EXTRA VARIANTE 204 — Croissant / Bakery Sale
// Capa premium com círculo central emoldurado, códigos promocionais verticais e tipografia outline repetida no background.
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant204({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  const accent = brandColor || '#af704c';

  return (
    <div className="relative w-full h-full bg-[#f1ede9] overflow-hidden flex flex-col justify-between py-8 px-6 font-outfit select-none shrink-0">
      
      {/* TEXTO DE OUTLINE REPETIDO ATRÁS (50% OFF) */}
      <div className="absolute inset-y-12 inset-x-0 flex flex-col justify-center items-center pointer-events-none z-0 opacity-80 shrink-0" style={{ transform: 'translateY(55px)' }}>
        <span className="text-[82px] font-black leading-none tracking-tighter select-none uppercase shrink-0" 
              style={{ fontFamily: '"Poppins", "Inter", sans-serif', WebkitTextStroke: `1.2px ${accent}66`, color: 'transparent' }}>
          {data.badge_text || '50% OFF'}
        </span>
        <span className="text-[82px] font-black leading-none tracking-tighter select-none uppercase shrink-0" 
              style={{ fontFamily: '"Poppins", "Inter", sans-serif', marginTop: '-10px', WebkitTextStroke: `1.2px ${accent}66`, color: 'transparent' }}>
          {data.badge_text || '50% OFF'}
        </span>
        <span className="text-[82px] font-black leading-none tracking-tighter select-none uppercase shrink-0" 
              style={{ fontFamily: '"Poppins", "Inter", sans-serif', marginTop: '-10px', WebkitTextStroke: `1.2px ${accent}66`, color: 'transparent' }}>
          {data.badge_text || '50% OFF'}
        </span>
        <span className="text-[82px] font-black leading-none tracking-tighter select-none uppercase shrink-0" 
              style={{ fontFamily: '"Poppins", "Inter", sans-serif', marginTop: '-10px', WebkitTextStroke: `1.2px ${accent}66`, color: 'transparent' }}>
          {data.badge_text || '50% OFF'}
        </span>
        <span className="text-[82px] font-black leading-none tracking-tighter select-none uppercase shrink-0" 
              style={{ fontFamily: '"Poppins", "Inter", sans-serif', marginTop: '-10px', WebkitTextStroke: `1.2px ${accent}66`, color: 'transparent' }}>
          {data.badge_text || '50% OFF'}
        </span>
      </div>

      {/* Top Text Block */}
      <div className="relative z-10 text-center shrink-0">
        <SmartField field="titulo" {...sp}>
          <h2 contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="text-[80px] leading-none font-black tracking-tight uppercase outline-none break-words max-w-full"
              style={{ fontSize: `${80 * sTitle}px`, color: accent, transform: 'translateY(-5px)' }}>
            {data.titulo || 'BAKERY SALE'}
          </h2>
        </SmartField>
        
        {/* Caramel horizontal stripe */}
        <SmartField field="texto_apoio" {...sp} className="w-full mt-2 inline-block">
          <div contentEditable suppressContentEditableWarning
               onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
               className="text-[#f1ede9] text-[14.5px] font-bold tracking-[0.25em] py-0.5 px-4 rounded-xs shadow-sm uppercase w-full outline-none break-words"
               style={{ backgroundColor: accent, transform: 'translateY(-5px)' }}>
            {data.texto_apoio || 'UP TO 50% OFF ON CROISSANTS'}
          </div>
        </SmartField>
      </div>

      {/* Center Plate and Croissant */}
      <div className="relative z-10 w-[70%] aspect-square mx-auto my-auto flex items-center justify-center shrink-0">
        <div className="absolute w-[85%] h-[85%] bg-black/10 blur-xl rounded-full translate-y-4 shrink-0" />
        <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/40 bg-white shadow-xl relative shrink-0">
          <ImageBg data={data} className="w-full h-full absolute inset-0 shrink-0">
            {!data.imageUrl && (
              <img 
                src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop" 
                className="w-full h-full object-cover scale-110" 
                alt="Croissant Fallback" 
              />
            )}
          </ImageBg>
        </div>
      </div>

      {/* Promo codes banners nas laterais */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 border text-[8px] font-bold tracking-[0.25em] py-3.5 px-1 bg-[#f1ede9]/90 backdrop-blur-xs rounded-sm shadow-xs uppercase [writing-mode:vertical-lr] rotate-180 pointer-events-none shrink-0" 
           style={{ borderColor: accent, color: accent }}>
        PROMO CODE - {data.badge_text || 'BAKE50'}
      </div>

      <div className="absolute right-3 top-1/2 -translate-y-1/2 border text-[8px] font-bold tracking-[0.25em] py-3.5 px-1 bg-[#f1ede9]/90 backdrop-blur-xs rounded-sm shadow-xs uppercase [writing-mode:vertical-lr] pointer-events-none shrink-0" 
           style={{ borderColor: accent, color: accent }}>
        PROMO CODE - {data.badge_text || 'BAKE50'}
      </div>

      <SlideHeader
        data={data} slideIndex={index} index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        showBrandLogo={showBrandLogo} brandLogo={brandLogo}
        showSlideCounter={false}
        brandAvatar={brandAvatar} brandColor={brandColor} isVerified={isVerified}
        onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        hideDot={true}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// EXTRA VARIANTE 205 — Macarons / Spring Sale
// Capa fashion com macarons decorativos em perspectiva, card central com borda fina e selo circular de especialista no topo.
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant205({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = (titleScale || 100) / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  const accent = brandColor || '#ff6b6b';
  const bgImg = data.imageUrl || "https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=800&auto=format&fit=crop";
  const avatarImg = brandAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop";

  const cleanText = (str) => {
    if (!str) return '';
    return str
      .replace(/<[^>]*>/g, '') // remove tags HTML como <br>
      .replace(/&nbsp;/g, '')  // remove &nbsp;
      .replace(/&#8203;/g, '') // remove zero-width space
      .trim();
  };

  const hasTitle = cleanText(data.titulo);
  const hasTextApoio = cleanText(data.texto_apoio);
  const hasBadgeText = cleanText(data.badge_text);

  return (
    <div className="relative w-full h-full bg-[#f6ebdf] flex flex-col justify-center items-center font-outfit p-4 select-none shrink-0">
      
      {/* Elementos espalhados no fundo (Macarons/Flores) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-4 -left-4 w-28 h-28 rounded-full overflow-hidden opacity-90 rotate-[-12deg] shadow-lg">
          <img src={bgImg} className="w-full h-full object-cover" alt="Macaron 1" />
        </div>
        <div className="absolute top-10 -right-8 w-24 h-24 rounded-full overflow-hidden opacity-80 rotate-[45deg] shadow-lg">
          <img src={bgImg} className="w-full h-full object-cover grayscale" alt="Macaron 2" />
        </div>
        <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full overflow-hidden opacity-95 rotate-[24deg] shadow-lg">
          <img src={bgImg} className="w-full h-full object-cover scale-125" alt="Macaron 3" />
        </div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full overflow-hidden opacity-95 shadow-xl">
          <img src={bgImg} className="w-full h-full object-cover scale-110" alt="Macaron 4" />
        </div>
      </div>

      {/* Card Central com Borda */}
      <div className="relative w-[92%] bg-white/95 backdrop-blur-md rounded-[2.5rem] py-5 px-6 border border-white flex flex-col items-center text-center z-10"
           style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.25)' }}>
        <div className="absolute inset-3 border border-zinc-200/60 rounded-[2rem] pointer-events-none" />

        {/* Avatar Superior */}
        <div className="absolute -top-8 w-16 h-16 rounded-full p-1 bg-white shadow-lg border border-zinc-100 flex items-center justify-center">
          <img 
            src={avatarImg} 
            className="w-full h-full rounded-full object-cover border border-zinc-100" 
            alt="Especialista" 
          />
        </div>

        <div className="mt-4 flex flex-col items-center w-full">
          <span className="text-zinc-500 text-[10px] tracking-[0.3em] font-bold uppercase mb-2 transform translate-y-[19px]">
            SPECIAL OFFER
          </span>
          
          <SmartField field="titulo" {...sp}>
            <h2 contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
                className="text-zinc-950 font-black text-4xl leading-none uppercase tracking-tight flex items-center justify-center gap-1.5 outline-none break-words max-w-full"
                style={{ fontSize: `${40 * sTitle}px`, transform: 'translateY(20px)' }}>
              {!hasTitle ? (
                <>
                  <span className="italic font-bold" style={{ color: accent }}>- SPRING</span>
                  <span> SALE -</span>
                </>
              ) : data.titulo}
            </h2>
          </SmartField>

          <SmartField field="texto_apoio" {...sp} className="w-full mt-4">
            <p contentEditable suppressContentEditableWarning
               onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
               className="text-zinc-800 text-[11px] font-bold tracking-widest uppercase outline-none break-words max-w-full"
               style={{ transform: 'translateY(17px)' }}>
              {!hasTextApoio ? 'DESCONTOS DE ATÉ 50%' : data.texto_apoio}
            </p>
          </SmartField>
        </div>

        {/* Botão de Ação */}
        <SmartField field="badge_text" {...sp} className="absolute -bottom-[37px] z-20">
          <div className="text-white px-8 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.25em] transition-colors cursor-pointer flex items-center gap-2 border-2 border-white"
               style={{ backgroundColor: accent }}>
            <span contentEditable suppressContentEditableWarning
                  onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
                  className="outline-none break-words min-w-[50px] inline-block">
              {!hasBadgeText ? 'COMPRE AGORA' : data.badge_text}
            </span>
            <ArrowRight className="w-3 h-3 shrink-0" />
          </div>
        </SmartField>
      </div>

      <SlideHeader
        data={data} slideIndex={index} index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        showBrandLogo={showBrandLogo} brandLogo={brandLogo}
        showSlideCounter={false}
        brandAvatar={brandAvatar} brandColor={brandColor} isVerified={isVerified}
        onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        hideDot={true}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// EXTRA VARIANTE 206 — Birthday Sale / Collage
// Grade de collage de luxo com slots superior e inferior para fotos elegantes e banner central geométrico com brilhos.
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant206({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  const accent = brandColor || '#fbbf24';

  const img0 = data.imageUrl || "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop";
  const img1 = "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=600&auto=format&fit=crop";
  const img2 = "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=600&auto=format&fit=crop";
  const img3 = "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=600&auto=format&fit=crop";
  const img4 = data.imageUrl || "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop";
  const img5 = "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=600&auto=format&fit=crop";

  return (
    <div className="relative w-full h-full bg-white flex flex-col justify-between py-2 px-2 font-outfit select-none shrink-0">
      
      {/* Grid Superior (3 fotos de doces) */}
      <div className="grid grid-cols-3 gap-1.5 h-[28%] rounded-t-2xl overflow-hidden shrink-0">
        <div className="relative overflow-hidden w-full h-full border border-black/5 bg-zinc-100 shrink-0">
          <img src={img0} className="w-full h-full object-cover" alt="Bolo 1" />
        </div>
        <div className="relative overflow-hidden w-full h-full border border-black/5 bg-zinc-100 shrink-0">
          <img src={img1} className="w-full h-full object-cover" alt="Bolo 2" />
        </div>
        <div className="relative overflow-hidden w-full h-full border border-black/5 bg-zinc-100 shrink-0">
          <img src={img2} className="w-full h-full object-cover" alt="Bolo 3" />
        </div>
      </div>

      {/* Banner Central com Detalhes Geométricos e Brilhos */}
      <div className="flex-1 my-2 flex flex-col justify-center items-center px-4 relative z-10 text-center shrink-0">
        
        {/* Brilhos SVG Geométricos */}
        <div className="absolute left-6 top-1/2 opacity-80 animate-pulse" style={{ color: accent, transform: 'translateY(calc(-50% + 40px))' }}>
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/>
          </svg>
        </div>
        <div className="absolute right-6 top-1/2 opacity-80 animate-pulse" style={{ color: accent, transform: 'translateY(calc(-50% - 40px))' }}>
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/>
          </svg>
        </div>

        <SmartField field="badge_text" {...sp}>
          <span contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
                className="text-[10px] md:text-[11px] text-zinc-600 font-bold tracking-[0.35em] uppercase block mb-2 outline-none break-words max-w-full">
            {data.badge_text || 'SPECIAL FOR YOU'}
          </span>
        </SmartField>

        <SmartField field="titulo" {...sp}>
          <h2 contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-serif text-[#1e1b4b] text-3xl md:text-[2.6rem] font-black tracking-normal leading-none uppercase my-1 outline-none break-words max-w-full"
              style={{ fontSize: `${55 * sTitle}px` }}>
            {data.titulo || 'BIRTHDAY SALE'}
          </h2>
        </SmartField>

        <SmartField field="texto_apoio" {...sp} className="mt-2.5">
          <p contentEditable suppressContentEditableWarning
             onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
             className="text-zinc-800 text-[11px] md:text-xs font-bold tracking-[0.2em] uppercase outline-none break-words max-w-full">
            {data.texto_apoio || '25% OFF ON ALL ITEMS'}
          </p>
        </SmartField>
      </div>

      {/* Grid Inferior (3 fotos de doces) */}
      <div className="grid grid-cols-3 gap-1.5 h-[28%] rounded-b-2xl overflow-hidden shrink-0">
        <div className="relative overflow-hidden w-full h-full border border-black/5 bg-zinc-100 shrink-0">
          <img src={img3} className="w-full h-full object-cover" alt="Bolo 4" />
        </div>
        <div className="relative overflow-hidden w-full h-full border border-black/5 bg-zinc-100 shrink-0">
          <img src={img4} className="w-full h-full object-cover" alt="Bolo 5" />
        </div>
        <div className="relative overflow-hidden w-full h-full border border-black/5 bg-zinc-100 shrink-0">
          <img src={img5} className="w-full h-full object-cover" alt="Bolo 6" />
        </div>
      </div>

      <SlideHeader
        data={data} slideIndex={index} index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        showBrandLogo={showBrandLogo} brandLogo={brandLogo}
        showSlideCounter={false}
        brandAvatar={brandAvatar} brandColor={brandColor} isVerified={isVerified}
        onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        hideDot={true}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// EXTRA VARIANTE 207 — Mundo Cupcakes
// Visualização com fundo rosa, banner chamativo, cupcakes flutuantes e rodapé alinhado.
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant207({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  const cupcakeImg = data.imageUrl || "https://images.unsplash.com/photo-1587668178277-295251f900ce?q=80&w=600&auto=format&fit=crop";

  const badgeVal = (typeof data.badge_text === 'string' ? data.badge_text : '') || 'Mari Confeitaria';
  
  const titleText = (typeof data.titulo === 'string' ? data.titulo : '') || 'TÍTULO DE IMPACTO';
  const ctaText = (typeof data.texto_apoio === 'string' ? data.texto_apoio : '') || 'SUBTÍTULO DE IMPACTO';

  return (
    <div className="relative w-full h-full bg-[#FAF1EA] flex flex-col font-outfit select-none overflow-hidden shrink-0">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Lobster&family=Charmonman:wght@700&display=swap');
        .font-lobster { font-family: 'Lobster', cursive; }
      `}} />

      {/* Top Logo */}
      <div className="relative z-20 mt-6 flex justify-center w-full">
        <SmartField field="badge_text" {...sp}>
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
            className="font-lobster text-[#ff2a85] text-[28px] drop-shadow-sm leading-none outline-none cursor-text select-text"
          >
            {badgeVal}
          </span>
        </SmartField>
      </div>

      {/* Pink Banner */}
      <div className="absolute top-[16%] left-0 w-full bg-gradient-to-r from-[#ff1778] to-[#ff3d91] py-4 flex flex-col items-center justify-center z-10 shadow-lg shrink-0">
        <SmartField field="titulo" {...sp}>
          <h1
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="outline-none cursor-text select-text text-white font-black tracking-tighter uppercase text-center whitespace-pre-line"
            style={{ transform: `scale(${sTitle})`, fontSize: `${60 * sTitle}px`, lineHeight: 0.95 }}
          >
            {titleText}
          </h1>
        </SmartField>
        {/* Fake Lens Flare no Banner */}
        <div className="absolute top-0 right-[15%] w-24 h-24 bg-white opacity-25 blur-2xl rounded-full mix-blend-overlay pointer-events-none" />
      </div>

      {/* Bottom Pink Blobs / Waves */}
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[160%] h-[35%] bg-[#ff1778] z-0 rounded-t-[50%] pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-25%] w-[60%] h-[25%] bg-[#ff1778] z-0 rounded-t-[50%] pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-25%] w-[60%] h-[25%] bg-[#ff1778] z-0 rounded-t-[50%] pointer-events-none" />





      {/* CTA Badge */}
      <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 bg-white px-6 py-2.5 rounded-[10px] shadow-[0_10px_20px_rgba(255,23,120,0.4)] z-40 whitespace-nowrap">
        <SmartField field="texto_apoio" {...sp}>
          <span 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="text-[#ff1778] text-[15px] font-medium tracking-wide outline-none cursor-text select-text whitespace-pre-line"
            style={{ transform: `scale(${sText})` }}
          >
            {ctaText}
          </span>
        </SmartField>
      </div>

      {/* SlideHeader para compatibilidade com handles/verificação */}
      <SlideHeader
        data={data} slideIndex={index} index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
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
// EXTRA VARIANTE 208 — Páscoa Grid
// Ovos emoldurados em grid de 4 quadrantes, selo central e tipografia refinada.
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant208({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  const defaultImg1 = "https://images.unsplash.com/photo-1588661642828-577bf64871e8?q=80&w=600&auto=format&fit=crop";
  const defaultImg2 = "https://images.unsplash.com/photo-1617466547610-cd388e6be0b1?q=80&w=600&auto=format&fit=crop";
  const defaultImg3 = "https://images.unsplash.com/photo-1549488344-c7eb0751a44e?q=80&w=600&auto=format&fit=crop";

  const img1 = data.imageUrl || defaultImg1;
  const img2 = data.imageUrl2 || defaultImg2;
  const img3 = data.imageUrl3 || defaultImg3;

  const topTag = (typeof data.badge_text === 'string' ? data.badge_text : '') || 'Celebre do seu jeito';

  const titleText = (typeof data.titulo === 'string' ? data.titulo : '') || 'FELIZ\nPÁSCOA';
  const titleLines = titleText.split('\n');
  const t1 = titleLines[0] || 'FELIZ';
  const t2 = titleLines[1] || 'PÁSCOA';

  const footText = (typeof data.texto_apoio === 'string' ? data.texto_apoio : '') || 'CALLEBAUT®\nBELGIUM 1911';
  const footLines = footText.split('\n');
  const brand = footLines[0] || 'CALLEBAUT®';
  const subBrand = footLines[1] || 'BELGIUM 1911';

  return (
    <div className="relative w-full h-full bg-[#3d2c29] grid grid-cols-2 grid-rows-2 font-outfit select-none overflow-hidden shrink-0">
      
      {/* Grid Top Left (Ovo Rústico) */}
      <div className="relative w-full h-full overflow-hidden bg-black z-0">
        <img 
          src={img1} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms]" 
          alt="Chocolate Ovo 1" 
          style={{
            backgroundPosition: `${data.imagePositionX ?? 50}% ${data.imagePosition ?? 50}%`,
            transform: `scale(${data.imageScale ?? 1})`,
          }}
        />
      </div>

      {/* Grid Top Right (Metade Ovo) */}
      <div className="relative w-full h-full overflow-hidden bg-[#111] z-0">
        <img 
          src={img2} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms]" 
          alt="Chocolate Ovo 2" 
        />
      </div>

      {/* Grid Bottom Left (Text Block Marrom) */}
      <div 
        className="relative w-full h-full flex flex-col items-start justify-center p-6 z-10"
        style={{ backgroundColor: brandColor || '#3d2c29' }}
      >
        
        {/* Tag Cursiva */}
        <div 
          className="bg-transparent border-[1.5px] border-white px-4 py-1.5 mb-5 shadow-sm"
          style={{ borderRadius: '10px' }}
        >
          <SmartField field="badge_text" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="font-serif italic text-white text-[13px] tracking-wide block whitespace-nowrap outline-none cursor-text select-text"
            >
              {topTag}
            </span>
          </SmartField>
        </div>

        {/* Título Principal Amarelo Mostarda / Dourado Claro */}
        <SmartField field="titulo" {...sp}>
          <div 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="flex flex-col items-start leading-[1.05] tracking-tight text-[#f1cd93] outline-none cursor-text select-text"
            style={{ transform: `scale(${sTitle})` }}
          >
            <span className="font-black text-[38px]">{t1}</span>
            <span className="font-black text-[38px]">{t2}</span>
          </div>
        </SmartField>

        {/* Logo Callebaut Mock (Rodapé Esquerdo) */}
        <div className="absolute bottom-6 left-6 flex flex-col items-start">
           <SmartField field="texto_apoio" {...sp}>
             <div 
               contentEditable suppressContentEditableWarning
               onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
               className="flex flex-col items-start outline-none cursor-text select-text"
               style={{ transform: `scale(${sText})` }}
             >
               <span className="font-bold text-[#f1cd93] text-[9.5px] tracking-wider leading-none uppercase">{brand}</span>
               <span className="font-medium text-[#f1cd93]/70 text-[6px] tracking-[0.25em] leading-tight uppercase mt-0.5">{subBrand}</span>
             </div>
           </SmartField>
        </div>

      </div>

      {/* Grid Bottom Right (Torta Fundo Cinza/Pedra) */}
      <div className="relative w-full h-full overflow-hidden bg-[#222] z-0">
        <img 
          src={img3} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms]" 
          alt="Torta Sobremesa" 
        />
      </div>

      {/* Selo Central (Círculo sobreposto nas 4 partes) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
        <div className="w-[60px] h-[60px] bg-[#e9c7a7] rounded-full flex items-center justify-center p-1 border-[1.5px] border-[#3d2c29]">
           <div className="w-full h-full rounded-full border border-[#3d2c29] flex items-center justify-center relative overflow-hidden bg-transparent">
             {brandLogo && (
               <img src={brandLogo} className="w-full h-full object-cover" alt="Logo da Marca" />
             )}
           </div>
        </div>
      </div>

      <SlideHeader
        data={data} slideIndex={index} index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
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
// EXTRA VARIANTE 209 — Chocolate Instagramável
// Fundo terracota, imagem de alta definição no split superior e tipografia arrojada.
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant209({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  const pastryImg = data.imageUrl || "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?q=80&w=800&auto=format&fit=crop";

  const titleText = (typeof data.titulo === 'string' ? data.titulo : '') || 'O PODER DO CHOCOLATE\n“INSTAGRAMÁVEL”';
  const titleLines = titleText.split('\n');
  const topText = titleLines[0] || 'O PODER DO CHOCOLATE';
  const highlightText = titleLines[1] || '“INSTAGRAMÁVEL”';

  const descText = (typeof data.texto_apoio === 'string' ? data.texto_apoio : '') || 'Alguns chocolates vendem\nantes mesmo da primeira mordida';

  const badgeText = (typeof data.badge_text === 'string' ? data.badge_text : '') || 'CALLEBAUT®\nBELGIUM 1911';
  const badgeLines = badgeText.split('\n');
  const brand = badgeLines[0] || 'CALLEBAUT®';
  const subBrand = badgeLines[1] || 'BELGIUM 1911';

  return (
    <div className="relative w-full h-full flex flex-col font-outfit select-none overflow-hidden bg-white shrink-0">
      
      {/* Imagem Superior (Split 55%) */}
      <div className="h-[55%] w-full relative bg-[#eedfcc] overflow-hidden shrink-0">
        <img 
          src={pastryImg} 
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[1500ms]" 
          alt="Chocolate Pastry" 
          style={{
            backgroundPosition: `${data.imagePositionX ?? 50}% ${data.imagePosition ?? 50}%`,
            transform: `scale(${data.imageScale ?? 1})`,
          }}
        />
      </div>

      {/* Bloco Inferior Sólido (Terracota) */}
      <div className="flex-1 bg-[#8c3527] px-8 py-8 flex flex-col justify-between relative z-10 w-full">

        {/* Bloco de Títulos Superior */}
        <SmartField field="titulo" {...sp}>
          <div 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="flex flex-col items-start mt-2 outline-none cursor-text select-text"
            style={{ transform: `scale(${sTitle})` }}
          >
            <h3 className="text-[#f2e1c3] text-[20px] font-light tracking-[0.05em] uppercase leading-none mb-1.5">
              {topText}
            </h3>
            <h1 className="text-[#f2e1c3] text-[40px] font-black tracking-tighter leading-none uppercase -ml-2">
              {highlightText}
            </h1>
          </div>
        </SmartField>

        {/* Rodapé: Descrição + Logo Callebaut */}
        <div className="flex justify-between items-end w-full mb-1">
          
          {/* Texto Descritivo */}
          <SmartField field="texto_apoio" {...sp}>
            <p 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="text-[#f2e1c3] text-[15px] font-light leading-[1.3] tracking-wide text-left outline-none cursor-text select-text break-words max-w-[200px]"
              style={{ transform: `scale(${sText})` }}
            >
              {descText.split('\n').map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </p>
          </SmartField>

          {/* Logo Section */}
          <div className="flex flex-col items-center pl-2 shrink-0">
            {/* Ícone das espirais celtas - Recriação fiel em SVG */}
            <div className="w-8 h-8 flex items-center justify-center mb-1.5">
               <svg className="w-full h-full text-[#f2e1c3] fill-current" viewBox="0 0 100 100">
                 <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.2" />
                 <path d="M 50 15 C 65 15, 75 25, 75 40 C 75 55, 60 65, 45 65 C 30 65, 20 50, 30 40" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                 <path d="M 85 65 C 85 80, 75 90, 60 90 C 45 90, 35 75, 45 60 C 55 45, 70 50, 80 60" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                 <path d="M 15 65 C 15 50, 25 40, 40 40 C 55 40, 65 55, 55 70 C 45 85, 30 80, 20 70" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                 <circle cx="35" cy="38" r="4" />
                 <circle cx="70" cy="55" r="4" />
                 <circle cx="35" cy="68" r="4" />
               </svg>
            </div>
            <SmartField field="badge_text" {...sp}>
              <div 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
                className="flex flex-col items-center outline-none cursor-text select-text"
              >
                <span className="font-bold text-[#f2e1c3] text-[9.5px] tracking-widest leading-none uppercase">
                  {brand}
                </span>
                <span className="font-light text-[#f2e1c3]/80 text-[6.5px] tracking-[0.25em] leading-tight uppercase mt-1">
                  {subBrand}
                </span>
              </div>
            </SmartField>
          </div>

        </div>

      </div>

      <SlideHeader
        data={data} slideIndex={index} index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
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
// EXTRA VARIANTE 210 — Bolos da Semana
// Estética vintage e retrô com listras de fundo, relevo, botão 3D e cursor.
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant210({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  const boloImg = data.imageUrl || "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=600&auto=format&fit=crop";
  const mainTitle = (typeof data.titulo === 'string' ? data.titulo : '') || 'Bolos da Semana';

  const badgeVal = (typeof data.badge_text === 'string' ? data.badge_text : '') || '#38\nALASKA';
  const badgeLines = badgeVal.split('\n');
  const bolosSemanaNumber = badgeLines[0] || '#38';
  const bolosSemanaName = badgeLines[1] || 'ALASKA';

  const descText = (typeof data.texto_apoio === 'string' ? data.texto_apoio : '') || 'BOLO BRANCO, RECHEIO DE CREME GELADO COM MORANGOS E MOUSSE BRANCA COM MORANGOS, COBERTURA DE MARSHMALLOW E MORANGOS.';

  const handleVal = brandHandle || 'appsodie.com.br';

  return (
    <div className="relative w-full h-full bg-[#FAF1EA] flex flex-col font-outfit select-none overflow-hidden shrink-0">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Alfa+Slab+One&family=Charmonman:wght@700&family=Lobster&family=League+Gothic&display=swap');
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-display { font-family: 'Alfa Slab One', cursive; }
        .font-hand { font-family: 'Charmonman', cursive; }
        .font-lobster { font-family: 'Lobster', cursive; }
        .font-gothic { font-family: 'League Gothic', sans-serif; }
        
        /* Efeito de listras verticais pro fundo */
        .bg-stripes-210 {
          background-color: #f5e4c3;
          background-image: repeating-linear-gradient(90deg, transparent, transparent 35px, #e8c99b 35px, #e8c99b 70px);
        }
        
        /* Efeito inset pra palavra SEMANA vazada */
        .text-inset-shadow-210 {
           color: #f5e4c3;
           text-shadow: 1px 1px 2px rgba(0,0,0,0.3), inset 2px 2px 5px rgba(0,0,0,0.5);
           -webkit-text-stroke: 1px #8b0000;
        }
      `}} />

      {/* SlideHeader invisível para compatibilidade */}
      <SlideHeader
        brandHandle={brandHandle}
        brandColor={brandColor}
        brandAvatar={brandAvatar}
        isVerified={isVerified}
        index={index + 1}
        className="opacity-0 absolute top-0 pointer-events-none"
      />

      {/* Slide Real da Capa 53 */}
      <div className="relative w-full h-full bg-stripes-210 flex flex-col font-outfit overflow-hidden p-4">
        
        {/* Borda Dupla Vermelha */}
        <div className="absolute inset-3 border-2 border-[#8b0000] rounded-sm pointer-events-none z-20" />
        <div className="absolute inset-4 border border-[#8b0000]/50 rounded-sm pointer-events-none z-20" />

        {/* Top: "Bolos da Semana" em fonte cursiva grossa vermelha */}
        <div className="relative z-10 w-full text-center mt-6 drop-shadow-md">
          <SmartField field="titulo" {...sp}>
            <h1 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-hand text-[#8b0000] text-[48px] leading-[0.8] font-bold tracking-tight outline-none cursor-text select-text"
              style={{ transform: `scale(${sTitle})` }}
            >
              {mainTitle}
            </h1>
          </SmartField>
        </div>

        {/* Left Side: Number & Name */}
        <div className="absolute left-6 top-[25%] z-20 flex flex-col drop-shadow-md">
          <SmartField field="badge_text" {...sp}>
            <div 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
              className="flex flex-col items-start outline-none cursor-text select-text"
            >
              <span className="font-gothic text-[#8b0000] text-[58px] leading-[0.8] tracking-tighter">
                {bolosSemanaNumber}
              </span>
              <span className="font-gothic text-[#8b0000] text-[42px] leading-[0.85] tracking-tighter">
                {bolosSemanaName}
              </span>
            </div>
          </SmartField>
        </div>

        {/* Main Image: O Bolo de Morango */}
        <div className="relative z-10 w-[120%] -ml-[10%] mt-8 flex items-center justify-center">
           <img 
             src={boloImg} 
             className="w-full h-auto drop-shadow-[0_15px_15px_rgba(0,0,0,0.3)] filter sepia-[0.2] contrast-125 transition-transform duration-700" 
             alt="Bolo Alaska"
             style={{
               objectPosition: `${data.imagePositionX ?? 50}% ${data.imagePosition ?? 50}%`,
               transform: `scale(${data.imageScale ?? 1})`,
             }}
           />
        </div>

        {/* Bottom Elements: URL Button, Desc Box, Big Inset Text */}
        <div className="absolute bottom-10 left-0 w-full px-6 flex flex-col items-center z-30">
           
           <div className="flex justify-between items-end w-full gap-2 relative">
              {/* Fake 3D URL Button with Arrow Cursor */}
              <div className="relative mb-2">
                 <div className="bg-gradient-to-b from-[#fce96a] to-[#d69f20] border-[1.5px] border-[#8b0000] rounded-full px-3 py-1 flex items-center gap-1.5 shadow-[2px_2px_0px_#8b0000]">
                    <div className="bg-[#8b0000] text-[#fce96a] text-[6px] font-bold px-1 rounded-sm uppercase tracking-widest">
                       www
                    </div>
                    <span className="font-bold text-[#8b0000] text-[12px] tracking-tight pr-4">
                       {handleVal}
                    </span>
                 </div>
                 {/* Mouse cursor simulado */}
                 <div className="absolute -bottom-4 right-0 w-6 h-6 bg-yellow-400 border border-[#8b0000] transform rotate-[-25deg] shadow-sm flex items-center justify-center" style={{ clipPath: 'polygon(0 0, 100% 40%, 60% 60%, 40% 100%)' }}>
                    <div className="w-full h-full bg-yellow-400" />
                 </div>
              </div>

              {/* Descrição Caixa Borda Arredondada */}
              <div className="bg-[#f5e4c3] border-[1.5px] border-[#8b0000] rounded-xl px-3 py-2 w-[55%] shadow-[2px_2px_0px_#8b0000]">
                <SmartField field="texto_apoio" {...sp}>
                   <p 
                     contentEditable suppressContentEditableWarning
                     onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                     className="text-[#8b0000] font-bold text-[8px] leading-[1.2] text-center tracking-tight outline-none cursor-text select-text"
                     style={{ transform: `scale(${sText})` }}
                   >
                      {descText}
                   </p>
                </SmartField>
              </div>
           </div>

           {/* Giant SEMANA inset shadow text na base */}
           <div className="w-full flex justify-center mt-2">
              <span className="font-gothic text-[82px] tracking-tighter leading-[0.7] text-inset-shadow-210 uppercase">
                 Semana
              </span>
           </div>
        </div>

      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// EXTRA VARIANTE 211 — Azeites Trigopane
// Layout split moderno com metade salada e metade bloco de cor sólida dourada com subtítulo branco que se estende.
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant211({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  const azeiteTitle = (typeof data.titulo === 'string' ? data.titulo : '') || 'AZEITES';
  const azeiteSub = (typeof data.badge_text === 'string' ? data.badge_text : '') || 'Seu guia rápido sobre os\ntipos de azeites e suas\nutilizações culinárias.';
  const azeiteDesc = (typeof data.texto_apoio === 'string' ? data.texto_apoio : '') || 'Você chega na\nprateleira do mercado\ne bate aquela dúvida:\nqual azeite levar? A\ndiferença vai muito\nalém do preço! Salve\neste post para não\nerrar na próxima\ncompra.';
  
  const cleanLogo = (brandHandle || 'Trigopane').replace('@', '');
  const saladImg = data.imageUrl || "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop";

  return (
    <div className="relative w-full h-full flex flex-col font-outfit select-none overflow-hidden shrink-0">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Alfa+Slab+One&family=Charmonman:wght@700&family=Lobster&family=League+Gothic&display=swap');
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-display { font-family: 'Alfa Slab One', cursive; }
        .font-hand { font-family: 'Charmonman', cursive; }
        .font-lobster { font-family: 'Lobster', cursive; }
        .font-gothic { font-family: 'League Gothic', sans-serif; }
      `}} />

      {/* SlideHeader invisível para compatibilidade */}
      <SlideHeader
        brandHandle={brandHandle}
        brandColor={brandColor}
        brandAvatar={brandAvatar}
        isVerified={isVerified}
        index={index + 1}
        className="opacity-0 absolute top-0 pointer-events-none"
      />

      <div className="relative w-full h-full flex overflow-hidden" style={{ backgroundColor: brandColor || '#c3a436' }}>
        
        {/* METADE DIREITA: Imagem da Salada/Azeite */}
        <div className="absolute right-0 top-0 w-[55%] h-full">
           <img 
             src={saladImg} 
             className="w-full h-full object-cover transition-transform duration-[1500ms]" 
             alt="Salada com Azeite" 
             style={{
               objectPosition: `${data.imagePositionX ?? 50}% ${data.imagePosition ?? 50}%`,
               transform: `scale(${data.imageScale ?? 1})`,
             }}
           />
           {/* Leve sombra interna na borda esquerda da imagem para separar da cor sólida */}
           <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
        </div>

        {/* METADE ESQUERDA: Bloco de Cor Sólida e Textos */}
        <div className="relative w-[45%] h-full flex flex-col pt-12 pb-8 z-10">
          
          {/* Título Gigante */}
          <div className="pl-6 w-[200%] relative z-20">
            <SmartField field="titulo" {...sp}>
              <h1 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
                className="font-outfit font-black text-[56px] leading-[0.8] tracking-tighter text-white uppercase drop-shadow-sm outline-none cursor-text select-text"
                style={{ transform: `scale(${sTitle})`, transformOrigin: 'left center' }}
              >
                {azeiteTitle}
              </h1>
            </SmartField>
          </div>

          {/* Bloco Branco de Subtítulo (Sobrepondo a imagem) */}
          <div className="mt-6 ml-6 bg-white w-[160%] py-4 px-5 shadow-lg relative z-20">
            <SmartField field="badge_text" {...sp}>
              <p 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
                className="font-outfit text-[#222] text-[12px] font-medium leading-[1.3] whitespace-pre-line tracking-tight outline-none cursor-text select-text"
              >
                {azeiteSub}
              </p>
            </SmartField>
          </div>

          {/* Parágrafo Alinhado à Direita (dentro do bloco de fundo) */}
          <div className="mt-6 px-3 flex-1 flex flex-col items-end text-right">
            <SmartField field="texto_apoio" {...sp}>
              <p 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                className="font-outfit text-white text-[11.5px] font-light leading-[1.3] whitespace-pre-line opacity-95 outline-none cursor-text select-text"
                style={{ transform: `scale(${sText})`, transformOrigin: 'right center' }}
              >
                {azeiteDesc}
              </p>
            </SmartField>
          </div>

          {/* Logo Trigopane no Rodapé */}
          <div className="pl-4 mt-auto">
            <div className="bg-[#b31b2c] w-[110px] h-10 flex flex-col justify-center rounded-r-full shadow-md relative overflow-hidden transition-all duration-300">
              {/* Fake brush stroke yellow line */}
              <div className="absolute bottom-1.5 left-2 w-[85%] h-1 bg-[#fde160] transform -rotate-2 rounded-full opacity-90" />
              
              <span className="font-serif italic font-bold text-white text-[18px] ml-4 drop-shadow-sm relative z-10 leading-none pb-1">
                {cleanLogo}
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// EXTRA VARIANTE 212 — Template Side Pill (Destaque Lateral)
// Design premium assimétrico com pílula lateral e destaque de produto.
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant212({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  const finalBgColor = brandColor || '#E85382';
  const finalSecColor = '#B02055'; // Cor secundária original
  
  const finalTitle = data.titulo || 'Como\nfidelizar\no seu\ncliente\nneste\nNatal';
  const finalAuthorName = data.texto_apoio || 'May Bittencourt';
  const finalAuthorHandle = brandHandle || '@maybittencourtdoceria';
  const finalBadgeText = data.slide_call || 'Arraste pra o lado';
  const finalAvatarUrl = brandAvatar || 'https://randomuser.me/api/portraits/women/44.jpg';

  return (
    <div 
      id="tpl_side_pill" 
      className="w-full h-full relative overflow-hidden select-none"
      style={{ 
        '--color-bg': finalBgColor,
        '--color-secondary': finalSecColor,
        backgroundColor: 'var(--color-bg)',
        fontFamily: '"Inter", sans-serif'
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
      `}} />

      {/* SlideHeader invisível para compatibilidade (ocultando elementos desnecessários) */}
      <SlideHeader
        data={data}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandHandle={brandHandle}
        brandColor={brandColor}
        brandAvatar={brandAvatar}
        isVerified={isVerified}
        showBrandHandle={false}
        showSlideCounter={false}
        showBrandLogo={false}
        hideDot={true}
      />

      {/* Pill Lateral Direita (Branca translúcida para criar o tom rosa claro perfeito sobre o fundo) */}
      <div 
        className="absolute top-0 right-0 w-[48px] h-full rounded-l-[20px] shadow-[-4px_0_10px_rgba(0,0,0,0.05)] bg-white/95 z-[5]"
      />
      
      {/* Área de Conteúdo (88% da largura esquerda) */}
      <div className="w-[352px] h-full relative z-20">
        
        {/* Header do Autor (Logo e Perfil) */}
        <div className="absolute top-[40px] w-full flex justify-center items-center gap-3">
          {finalAvatarUrl && (
            <img 
              id="tsp-logo" 
              src={finalAvatarUrl} 
              crossOrigin="anonymous"
              className="w-8 h-8 rounded-full object-cover shadow-sm"
              alt="Logo"
            />
          )}
          <div className="flex flex-col justify-center">
            <SmartField field="texto_apoio" {...sp} maxCustomWidth={250}>
              <span 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
                className="text-[11px] font-bold text-white leading-none tracking-wide outline-none cursor-text select-text block"
                style={{ fontSize: `${11 * sText}px` }}
              >
                {finalAuthorName}
              </span>
            </SmartField>
            <span id="tsp-desc" className="text-[9px] font-light text-white/80 leading-tight mt-0.5">
              {finalAuthorHandle}
            </span>
          </div>
        </div>

        {/* Título Principal */}
        <div className="absolute top-[70px] right-[40px] text-right max-w-[85%] z-20 drop-shadow-md">
          <SmartField field="titulo" {...sp} maxCustomWidth={299}>
            <h1 
              id="tsp-title1" 
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-serif font-semibold leading-[0.95] text-white m-0 outline-none cursor-text select-text whitespace-pre-line"
              style={{ fontSize: `${55 * sTitle}px` }}
            >
              {finalTitle}
            </h1>
          </SmartField>
        </div>

        {/* Badge Flutuante */}
        {finalBadgeText && (
          <div className="absolute top-[340px] right-[60px] z-30">
            <div 
              className="bg-white/90 backdrop-blur-sm rounded-lg px-5 py-2 shadow-lg flex items-center gap-3 border-l-2"
              style={{ borderColor: 'var(--color-bg)' }}
            >
              <SmartField field="slide_call" {...sp} maxCustomWidth={180}>
                <span 
                  contentEditable suppressContentEditableWarning
                  onBlur={(e) => onTextChange(index, 'slide_call', e.currentTarget.innerText)}
                  className="font-bold uppercase tracking-widest whitespace-nowrap outline-none cursor-text select-text block"
                  style={{ color: 'var(--color-secondary)', fontSize: `${10 * sText}px` }}
                >
                  {finalBadgeText}
                </span>
              </SmartField>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// EXTRA VARIANTE 213 — Template Corp Fórum (Corporate Forum)
// Capa corporativa institucional com formas geométricas e imagem de destaque inferior.
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant213({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };
  const [logoError, setLogoError] = React.useState(false);

  const finalBgColor = '#F5F5F5'; // Fundo fixo cinza claro
  const finalSecColor = brandColor || '#E3000F'; // Cor secundária é a cor da marca

  const finalTitle = data.titulo || 'O PRIMEIRO\nFÓRUM DE\n<b>NETWORKING\nPROFISSIONAL</b>\nDE SERGIPE.';
  const finalDesc = data.texto_apoio || 'O evento que reuniu lideranças para transformar a economia real do estado.';
  const finalImageUrl = data.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1080';
  const finalLogoUrl = brandLogo || 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/BNI_logo.svg/1024px-BNI_logo.svg.png';
  const finalBadgeText = data.slide_call || 'Deslize para o lado';

  return (
    <div 
      id="tpl_corp_forum" 
      className="w-full h-full relative overflow-hidden flex flex-col justify-between select-none bg-[#F5F5F5]"
      style={{ 
        '--color-bg': finalBgColor,
        '--color-secondary': finalSecColor,
        backgroundColor: 'var(--color-bg)',
        fontFamily: '"Inter", sans-serif'
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800;900&family=Oswald:wght@300;400;500;700;900&display=swap');
        .font-oswald {
          font-family: 'Oswald', sans-serif;
        }
        #tcf-title b {
          color: var(--color-secondary);
          font-weight: inherit;
        }
        #tcf-title span {
          color: var(--color-secondary);
        }
      `}} />

      {/* SlideHeader invisível para compatibilidade (ocultando elementos redundantes) */}
      <SlideHeader
        data={data}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandHandle={brandHandle}
        brandColor={brandColor}
        brandAvatar={brandAvatar}
        isVerified={isVerified}
        showBrandHandle={false}
        showSlideCounter={false}
        showBrandLogo={false}
        hideDot={true}
      />

      {/* Formas Geométricas do Fundo (Lado Direito) */}
      <div 
        className="absolute top-0 right-0 w-[28%] h-[60%] z-0 transition-colors duration-300"
        style={{ backgroundColor: 'var(--color-secondary)' }}
      />
      <div 
        className="absolute top-0 right-[28%] w-[25%] h-[28%] z-0 rounded-tl-[40px] transition-colors duration-300"
        style={{ backgroundColor: 'var(--color-secondary)' }}
      />

      {/* Logo no Canto Superior Direito */}
      {showBrandLogo && finalLogoUrl && !logoError && (
        <div className="absolute top-[50px] right-[25px] z-10 w-[72px] flex justify-center">
          <img 
            id="tcf-logo" 
            src={finalLogoUrl} 
            crossOrigin="anonymous"
            onError={() => setLogoError(true)}
            className="w-full h-auto object-contain max-h-[30px]" 
            alt="Logo"
          />
        </div>
      )}

      {/* Bloco de Textos e Conteúdo (Lado Esquerdo) */}
      <div className="absolute top-[50px] left-[32px] w-[240px] z-10 flex flex-col">
        <SmartField field="titulo" {...sp} maxCustomWidth={240}>
          <h1 
            id="tcf-title" 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerHTML)}
            className="text-[45px] font-black leading-[1] uppercase text-black tracking-tighter font-oswald m-0 outline-none cursor-text select-text"
            style={{ fontSize: `${52 * sTitle}px` }}
            dangerouslySetInnerHTML={{ __html: finalTitle.replace(/\\n/g, '<br />').replace(/\n/g, '<br />') }}
          />
        </SmartField>
        
        <SmartField field="texto_apoio" {...sp} maxCustomWidth={240}>
          <p 
            id="tcf-desc" 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
            className="mt-6 font-bold text-gray-500 uppercase leading-[1.3] w-[95%] tracking-wide m-0 outline-none cursor-text select-text"
            style={{ fontSize: `${19 * sText}px` }}
            dangerouslySetInnerHTML={{ __html: finalDesc.replace(/\\n/g, '<br />').replace(/\n/g, '<br />') }}
          />
        </SmartField>

        {/* Indicador de Deslize */}
        {finalBadgeText && (
          <div className="mt-8 flex items-center gap-3">
            <SmartField field="slide_call" {...sp} maxCustomWidth={180}>
              <span 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'slide_call', e.currentTarget.innerText)}
                className="font-bold text-black uppercase tracking-wider outline-none cursor-text select-text block"
                style={{ fontSize: `${13 * sText}px` }}
              >
                {finalBadgeText}
              </span>
            </SmartField>
            <div 
              className="w-6 h-6 rounded-full border-[1.5px] border-black flex items-center justify-center shrink-0"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-3 h-3 text-black" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="3"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Imagem de Fundo (Parte Inferior 40%) */}
      {finalImageUrl && (
        <div className="absolute bottom-0 left-0 w-full h-[42%] z-20 shadow-2xl overflow-hidden">
          <img 
            id="tcf-image" 
            src={finalImageUrl} 
            crossOrigin="anonymous"
            className="w-full h-full object-cover border-t-4 border-white transition-transform duration-700" 
            alt="Destaque"
            style={{
              objectPosition: `${data.imagePositionX ?? 50}% ${data.imagePosition ?? 50}%`,
              transform: `scale(${data.imageScale ?? 1})`,
              transformOrigin: 'center center',
            }}
          />
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// EXTRA VARIANTE 214 — Template Corp Notícias (Corporate News)
// Template de notícias institucionais com header sólido, tipografia marcante e imagem inferior.
// ═══════════════════════════════════════════════════════════
export function CoverExtraVariant214({
  data, index, brandColor, brandHandle, showBrandHandle, brandAvatar,
  isVerified, titleScale, textScale, showMetrics, onActionStart,
  onTextChange, selectedElement, onSelectElement, brandLogo, showBrandLogo, slideCount
}) {
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement };

  const finalBgColor = '#FFFFFF'; // Fundo fixo branco
  const finalSecColor = brandColor || '#E3000F'; // Cor secundária é a cor da marca

  const finalTitle = data.titulo || '100 EMPRESÁRIOS.\nUMA MESA.\n<b>NEGÓCIOS REAIS.</b>';
  const finalSubtitle = data.badge_text || 'NOTÍCIAS';
  const finalImageUrl = data.imageUrl || 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1080';
  const finalLogoUrl = brandLogo || 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/BNI_logo.svg/1024px-BNI_logo.svg.png';
  const finalBadgeText = data.slide_call || 'Deslize para o lado';

  return (
    <div 
      id="tpl_corp_news" 
      className="w-full h-full relative overflow-hidden flex flex-col select-none bg-white"
      style={{ 
        '--color-bg': finalBgColor,
        '--color-secondary': finalSecColor,
        backgroundColor: 'var(--color-bg)',
        fontFamily: '"Inter", sans-serif'
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800;900&family=Oswald:wght@300;400;500;700;900&display=swap');
        .font-oswald {
          font-family: 'Oswald', sans-serif;
        }
        #tcn-title b {
          color: var(--color-secondary);
          font-weight: inherit;
        }
        #tcn-title span {
          color: var(--color-secondary);
        }
      `}} />

      {/* SlideHeader invisível para compatibilidade (ocultando elementos redundantes) */}
      <SlideHeader
        data={data}
        slideIndex={index}
        index={index + 1}
        total={slideCount}
        brandHandle={brandHandle}
        brandColor={brandColor}
        brandAvatar={brandAvatar}
        isVerified={isVerified}
        showBrandHandle={false}
        showSlideCounter={false}
        showBrandLogo={false}
        hideDot={true}
      />

      {/* Header Superior */}
      <div 
        className="w-full flex flex-col z-20 transition-colors duration-300 shrink-0"
        style={{ backgroundColor: 'var(--color-secondary)' }}
      >
        {showBrandLogo && finalLogoUrl && (
          <div className="h-[55px] flex items-center justify-center pt-[16.2px] pb-[8.1px]">
            <img 
              id="tcn-logo" 
              src={finalLogoUrl} 
              crossOrigin="anonymous"
              className="h-[65%] w-auto object-contain max-h-[60px]" 
              alt="Logo"
            />
          </div>
        )}
        
        {finalSubtitle && (
          <div className="w-full bg-black/20 py-[3.48px] text-center">
            <SmartField field="badge_text" {...sp}>
              <span 
                id="tcn-subtitle" 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
                className="text-white text-[12.44px] font-bold tracking-[0.25em] uppercase outline-none cursor-text select-text block"
              >
                {finalSubtitle}
              </span>
            </SmartField>
          </div>
        )}
      </div>

      {/* Bloco de Textos (Meio) */}
      <div className="flex-1 flex flex-col justify-center px-[86.4px] relative z-10 mt-[21.6px] min-h-0">
        <SmartField field="titulo" {...sp}>
          <h1 
            id="tcn-title" 
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerHTML)}
            className="text-[56px] font-black leading-[0.95] uppercase text-black tracking-tighter font-oswald mb-[64.8px] m-0 outline-none cursor-text select-text"
            style={{ transform: `scale(${sTitle})`, transformOrigin: 'left center' }}
            dangerouslySetInnerHTML={{ __html: finalTitle.replace(/\\n/g, '<br />').replace(/\n/g, '<br />') }}
          />
        </SmartField>
        
        {finalBadgeText && (
          <div className="flex items-center gap-[21.6px]">
            <SmartField field="slide_call" {...sp}>
              <span 
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'slide_call', e.currentTarget.innerText)}
                className="text-[10px] font-bold text-black uppercase tracking-wider outline-none cursor-text select-text block"
              >
                {finalBadgeText}
              </span>
            </SmartField>
            <div 
              className="w-[54px] h-[54px] rounded-full border-[3.24px] border-black flex items-center justify-center shrink-0"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-[27px] h-[27px]" 
                style={{ color: 'var(--color-secondary)' }}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="3"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Imagem de Fundo (Parte Inferior 50%) */}
      {finalImageUrl && (
        <div className="w-full h-[44%] shrink-0 relative z-0 overflow-hidden">
          <img 
            id="tcn-image" 
            src={finalImageUrl} 
            crossOrigin="anonymous"
            className="w-full h-full object-cover transition-transform duration-700" 
            alt="Notícia"
            style={{
              objectPosition: `${data.imagePositionX ?? 50}% ${data.imagePosition ?? 50}%`,
              transform: `scale(${data.imageScale ?? 1})`,
              transformOrigin: 'center center',
            }}
          />
        </div>
      )}
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
  115: CoverExtraVariant115,
  116: CoverExtraVariant116,
  117: CoverExtraVariant117,
  118: CoverExtraVariant118,
  119: CoverExtraVariant119,
  120: CoverExtraVariant120,
  121: CoverExtraVariant121,
  123: CoverExtraVariant123,
  126: CoverExtraVariant126,
  127: CoverExtraVariant127,
  128: CoverExtraVariant128,
  129: CoverExtraVariant129,
  130: CoverExtraVariant130,
  131: CoverExtraVariant131,
  132: CoverExtraVariant132,
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
  150: CoverExtraVariant150,
  151: CoverExtraVariant151,
  152: CoverExtraVariant152,
  153: CoverExtraVariant153,
  154: CoverExtraVariant154,
  156: CoverExtraVariant156,
  157: CoverExtraVariant157,
  159: CoverExtraVariant159,
  160: CoverExtraVariant160,
  162: CoverExtraVariant162,
  163: CoverExtraVariant163,
  164: CoverExtraVariant164,
  165: CoverExtraVariant165,
  167: CoverExtraVariant167,
  172: CoverExtraVariant172,
  176: CoverExtraVariant176,
  183: CoverExtraVariant183,
  185: CoverExtraVariant185,
  187: CoverExtraVariant187,
  200: CoverExtraVariant200,
  201: CoverExtraVariant201,
  202: CoverExtraVariant202,
  204: CoverExtraVariant204,
  205: CoverExtraVariant205,
  206: CoverExtraVariant206,
  207: CoverExtraVariant207,
  208: CoverExtraVariant208,
  209: CoverExtraVariant209,
  210: CoverExtraVariant210,
  211: CoverExtraVariant211,
  212: CoverExtraVariant212,
  213: CoverExtraVariant213,
  214: CoverExtraVariant214,
};

export const COVER_EXTRA_VARIANT_META = [
  {
    id: 101,
    name: 'Moldura Editorial',
    description: 'Elegância de revista com margens grossas e título vazando',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras101.png',
  },
  {
    id: 102,
    name: 'Swiss Vertical',
    description: 'Layout assimétrico estilo poster europeu com faixa lateral',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras102.png',
  },
  {
    id: 103,
    name: 'Ingresso Premium',
    description: 'Imagem full com card flutuante estilo ticket bicolor',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras103.png',
  },
  {
    id: 104,
    name: 'Grid Tipográfico',
    description: 'Layout matemático com foto e blocos coloridos em grid',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras104.png',
  },
  {
    id: 105,
    name: 'O Arco Clássico',
    description: 'Arquitetura pura. O arco traz suavidade contra a tipografia dura',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras105.png',
  },
  {
    id: 106,
    name: 'Split Brutalista',
    description: 'Metade imagem, metade bloco sólido. Direto ao ponto',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras106.png',
  },
  {
    id: 107,
    name: 'Número Gigante',
    description: 'Tipografia atuando como textura de fundo overlay',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras107.png',
  },
  {
    id: 108,
    name: 'Bloco Citação',
    description: 'Foco na autoridade, imagem servindo como base',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras108.png',
  },
  {
    id: 109,
    name: 'The Overlap',
    description: 'Tensão entre a imagem e o bloco de texto lateral em colunas',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras109.png',
  },
  {
    id: 110,
    name: 'Fashion Headline',
    description: 'Serifado pesado, foto pequena, elegância e respiro',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras110.png',
  },
  {
    id: 111,
    name: 'Geometric Inset',
    description: 'Blocos de cores sólidos e recortes bruscos com geometria forte',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras111.png',
  },
  {
    id: 112,
    name: 'Brutalist List',
    description: 'Foco em tipografia de impacto com imagem de detalhe na base',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras112.png',
  },
  {
    id: 113,
    name: 'The Blueprint',
    description: 'Foco em linhas finas dividindo o espaço matematicamente',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras113.png',
  },
  {
    id: 115,
    name: 'Gallery Crop',
    description: 'Imagem esmagada, tipografia espremida. Estilo editorial fashion',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras115.png',
  },
  {
    id: 116,
    name: 'Red Monolith',
    description: 'Impacto visual máximo com bloco de cor agressiva',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras116.png',
  },
  {
    id: 117,
    name: 'Minimalist Window',
    description: 'Respiração pura. Espaço em branco massivo como sinal de luxo.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras117.png',
  },
  {
    id: 118,
    name: 'Diagonal Cut',
    description: 'Brutalismo requintado. Divisão agressiva da tela.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras118.png',
  },
  {
    id: 119,
    name: 'Magazine Overlay',
    description: 'Tipografia gigante como textura sobre foto em ecrã inteiro.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras119.png',
  },
  {
    id: 120,
    name: 'The Spec Sheet',
    description: 'Design de dados com grids e linhas (Ficha Técnica).',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras120.png',
  },
  {
    id: 121,
    name: 'The Editorial Split',
    description: 'Assimetria agressiva com barra lateral brutalista.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras121.png',
  },
  {
    id: 123,
    name: 'The Moodboard',
    description: 'Múltiplas imagens em grelha criando narrativa visual.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras123.png',
  },
  {
    id: 126,
    name: 'The Museum Frame',
    description: 'Uso extremo de espaço negativo. Limpo.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras126.png',
  },
  {
    id: 127,
    name: 'The Offset Grid',
    description: 'Divisão 30/70. Tensão visual assimétrica.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras127.png',
  },
  {
    id: 128,
    name: 'The Dramatic Canvas',
    description: 'Escuridão total. Contraste brutal.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras128.png',
  },
  {
    id: 129,
    name: 'The Staggered Type',
    description: 'Tipografia gigante desalinhada invadindo a imagem.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras129.png',
  },
  {
    id: 130,
    name: 'The Architecture',
    description: 'Moldura em formato de pílula centralizada elegante.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras130.png',
  },
  {
    id: 131,
    name: 'The Letterbox',
    description: 'Faixa de imagem horizontal formato wide cinema.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras131.png',
  },
  {
    id: 132,
    name: 'The Brutalist Stamp',
    description: 'Tipografia matemática focada e layout em formato selo.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras132.png',
  },
  {
    id: 134,
    name: 'The Archive File',
    description: 'Estética de documentação de museu. Linhas finas, dados e categorização.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras134.png',
  },
  {
    id: 135,
    name: 'The Vertical Slice',
    description: 'Divisão extrema da tela. 30% imagem, 70% tipografia agressiva.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras135.png',
  },
  {
    id: 136,
    name: 'The Crimson Monogram',
    description: 'Fundo escuro dramático. Símbolos gigantes mascarados pela imagem.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras136.png',
  },
  {
    id: 137,
    name: 'The Floating Ticket',
    description: 'Fundo desfocado dramático, card central estéril e super detalhado.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras137.png',
  },
  {
    id: 138,
    name: 'The Brutalist Grid',
    description: 'Linhas duras, divisão 4-way, blocos de cor agressivos.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras138.png',
  },
  {
    id: 139,
    name: 'The Negative Space',
    description: '70% de espaço em branco absoluto. Luxo através da ausência.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras139.png',
  },
  {
    id: 140,
    name: 'The Intersecting Mask',
    description: 'Texto gigante a cruzar o limite entre a imagem e o fundo escuro.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras140.png',
  },
  {
    id: 141,
    name: 'The Soft Glass',
    description: 'Foco em glassmorphism. Sem bordas duras, apenas luz e desfoque.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras141.png',
  },
  {
    id: 142,
    name: 'The Quiet Luxury',
    description: 'Tipografia delicada, gradiente invisível, espaço para a imagem respirar.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras142.png',
  },
  {
    id: 143,
    name: 'The Organic Arch',
    description: 'Curvas orgânicas, leveza e fundos claros focados em layout de arco.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras143.png',
  },
  {
    id: 144,
    name: 'The Fine Print',
    description: 'Assimetria elegante, linhas ultra-finas (hairlines) como guias estruturais.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras144.png',
  },
  {
    id: 145,
    name: 'The Cinematic Title',
    description: 'Elegância de ecrã prateado. Escuro, misterioso, com a imagem a fundir-se no vazio.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras145.png',
  },
  {
    id: 146,
    name: 'The Gallery Plaque',
    description: 'Inspirado nas descrições minimalistas ao lado de quadros em museus.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras146.png',
  },
  {
    id: 147,
    name: 'The Floating Polaroid',
    description: 'Delicadeza absoluta. Sombra suave, rotação impercetível, vazio imenso.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras147.png',
  },
  {
    id: 148,
    name: 'The Glassmorphism',
    description: 'Fundo desfocado com card central flutuante e luz neon.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras-148.png',
  },
  {
    id: 150,
    name: 'The Bold Brutalist',
    description: 'Design agressivo, cores vibrantes e tipografia de impacto.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras150.png',
  },
  {
    id: 151,
    name: 'The Cinematic',
    description: 'Layout dramático com foco central e desfoque suave.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras151.png',
  },
  {
    id: 152,
    name: 'The Polaroid',
    description: 'Estética retrô com foto em moldura polaroid flutuante.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras152.png',
  },
  {
    id: 153,
    name: 'The Tactile Light',
    description: 'Design orgânico com curvas suaves e elementos táteis.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras153.png',
  },
  {
    id: 154,
    name: 'The Split Swiss',
    description: 'Assimetria moderna com bloco de cor sólido e tipografia mix-blend.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras154.png',
  },
  {
    id: 156,
    name: 'The Organic Arch',
    description: 'Elegância orgânica com moldura em arco e detalhes em dourado.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras156.png',
  },
  {
    id: 157,
    name: 'The Bento Editorial',
    description: 'Layout em grade estilo bento com destaque para o título e CTA.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras157.png',
  },
  {
    id: 159,
    name: 'The Floating Typo',
    description: 'Imagem em moldura flutuante com numeral gigante ao fundo.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras159.png',
  },
  {
    id: 160,
    name: 'Scrapbook Lux',
    description: 'Design de colagem elegante com moldura polaroid e padrões.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras160.png',
  },
  {
    id: 162,
    name: 'Swiss Grid',
    description: 'Funcionalismo suíço. Bordas pesadas e grid rigoroso.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras162.png',
  },
  {
    id: 163,
    name: 'Typographic Noise',
    description: 'Fundo escuro com marquee tipográfico e imagem em destaque.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras163.png',
  },
  {
    id: 164,
    name: 'Split Bold',
    description: 'Divisão horizontal forte, cor sólida vibrante e tipografia bold.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras164.png',
  },
  {
    id: 165,
    name: 'Vogue Food',
    description: 'Estilo editorial de luxo, com imagem full e tipografia Cormorant.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras165.png',
  },
  {
    id: 167,
    name: 'Golden Hour',
    description: 'Tons terrosos, reflexos sutis e design flutuante.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras167.png',
  },
  {
    id: 172,
    name: 'The Editorial Split',
    description: 'Corte brutal horizontal, texto esmagando a imagem',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras-172.png',
  },
  {
    id: 176,
    name: 'The Organic Overlap',
    description: 'Card inferior arredondado avançando sobre o background fotográfico.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras176.png',
  },
  {
    id: 183,
    name: 'The Profile Split',
    description: 'Divisão dramática de imagem, com avatar quebrando a fronteira.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras183.png',
  },
  {
    id: 185,
    name: 'The Split Pivot',
    description: 'Bloco rígido esquerdo preenchido com a cor da marca com botão intersectando a imagem.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras185.png',
  },
  {
    id: 187,
    name: 'The Minimal Pillar',
    description: 'Pilar estreito esquerdo comportando o @handle, com imagem deslocada.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras187.png',
  },


  {
    id: 200,
    name: 'Editorial High-Fashion',
    description: 'Faixa lateral colorida servindo como base estrutural com imagem ao lado contendo degradê dark no fundo.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras200.png',
  },
  {
    id: 201,
    name: 'Minha Confeitaria',
    description: 'Capa corporativa refinada de chocolate com circles concêntricos de fundo e pílulas de texto empilhadas.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras201.png',
  },
  {
    id: 202,
    name: 'Post Branco Clássico',
    description: 'Capa educacional/autoridade elegante com avatar superior, título de impacto e fotografia na base.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras202.png',
  },
  {
    id: 204,
    name: 'Bakery Sale (Croissant)',
    description: 'Capa premium com círculo central emoldurado, códigos promocionais verticais e tipografia outline repetida no background.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras204.png',
  },
  {
    id: 205,
    name: 'Spring Sale (Macaron)',
    description: 'Capa fashion com macarons decorativos em perspectiva, card central com borda fina e selo circular de especialista no topo.',
    thumbnailUrl: '',
  },
  {
    id: 206,
    name: 'Birthday Sale (Collage)',
    description: 'Grade de collage de luxo com slots superior e inferior para fotos elegantes e banner central geométrico com brilhos.',
    thumbnailUrl: '',
  },
  {
    id: 207,
    name: 'Mundo Cupcakes',
    description: 'Visualização com fundo rosa, banner chamativo, cupcakes flutuantes e rodapé alinhado.',
    thumbnailUrl: '/thumbnails/Thumbnails%20Capas%20Extras/capas_extras207.png',
  },
  {
    id: 208,
    name: 'Páscoa Grid (Celebre do seu jeito)',
    description: 'Ovos emoldurados em grid de 4 quadrantes, selo central e tipografia refinada.',
    thumbnailUrl: '',
  },
  {
    id: 209,
    name: 'Chocolate Instagramável',
    description: 'Fundo terracota, imagem de alta definição no split superior e tipografia arrojada.',
    thumbnailUrl: '',
  },
  {
    id: 210,
    name: 'Bolos da Semana',
    description: 'Estética vintage e retrô com listras de fundo, relevo, botão 3D e cursor.',
    thumbnailUrl: '',
  },
  {
    id: 211,
    name: 'Azeites Trigopane',
    description: 'Layout split moderno com metade salada e metade bloco de cor sólida dourada com subtítulo branco que se estende.',
    thumbnailUrl: '',
  },
  {
    id: 212,
    name: 'Side Pill (Destaque Lateral)',
    description: 'Design premium assimétrico com pílula lateral e destaque de produto.',
    thumbnailUrl: '',
  },
  {
    id: 213,
    name: 'Corp Fórum',
    description: 'Capa corporativa institucional com formas geométricas e imagem de destaque inferior.',
    thumbnailUrl: '',
  },
  {
    id: 214,
    name: 'Corp Notícias',
    description: 'Template de notícias institucionais com header sólido, tipografia marcante e imagem inferior.',
    thumbnailUrl: '',
  },
];
