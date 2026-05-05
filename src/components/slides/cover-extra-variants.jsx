import React from 'react';
import { BadgeCheck, ArrowRight, Sparkles } from 'lucide-react';
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
            className="font-playfair font-black text-[#1a1a1a] leading-[0.8] tracking-tighter absolute -top-12 left-2 drop-shadow-xl outline-none"
            style={{ fontSize: `${80 * sTitle}px` }}
          >
            {data.titulo || 'TOP 5'}
          </h2>
        </SmartField>

        <SmartField field="texto_apoio" {...sp}>
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-outfit text-zinc-600 font-medium text-[11px] max-w-[160px] uppercase tracking-widest mt-8 ml-3 leading-relaxed outline-none break-words"
            style={{ fontSize: `${11 * sText}px` }}
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
              style={{ fontSize: `${48 * sTitle}px` }}
            >
              {data.titulo || 'TOP 5'}
            </h2>
          </SmartField>

          <SmartField field="texto_apoio" {...sp}>
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              className="font-outfit text-zinc-500 text-[10px] uppercase tracking-wide leading-snug font-medium outline-none break-words max-w-full"
              style={{ fontSize: `${10 * sText}px` }}
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
              style={{ fontSize: `${40 * sTitle}px` }}
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
              style={{ fontSize: `${10 * sText}px` }}
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
// MAPEAMENTO E METADADOS
// ═══════════════════════════════════════════════════════════

export const COVER_EXTRA_VARIANT_COMPONENTS = {
  101: CoverExtraVariant101,
  102: CoverExtraVariant102,
  103: CoverExtraVariant103,
  104: CoverExtraVariant104,
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
];
