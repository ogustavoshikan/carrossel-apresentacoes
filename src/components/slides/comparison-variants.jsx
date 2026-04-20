import React from 'react';
import { CheckCircle2, X, Check, Image as ImageIcon } from 'lucide-react';
import SmartElement from '../smart-element';
import SlideHeader, { SlideFooterPlaceholder } from '../slide-header';

// ==========================================
// HELPERS
// ==========================================

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

// Apelido para SmartField usado em algumas variantes novas
const SmartEl = SmartField;

function TextWrapper({ field, index, onTextChange, as: Component = 'div', className, style, children, ...props }) {
  return (
    <Component
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => onTextChange && onTextChange(index, field, e.currentTarget.innerText)}
      className={`outline-none ${className || ''}`}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
}

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

const ComparisonTitle = ({ data, index, scale, onActionStart, onTextChange, selectedElement, onSelectElement, align = 'text-left', color = 'text-white', wrapperClasses = 'mb-10 text-center shrink-0', className = '' }) => {
  return (
    <div className={wrapperClasses}>
      <SmartElement
        slideIndex={index}
        field="titulo"
        position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
        onActionStart={onActionStart}
        isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
        onSelectElement={onSelectElement}
      >
        <h2
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onTextChange && onTextChange(index, 'titulo', e.currentTarget.innerText)}
          className={`font-outfit font-black ${color} tracking-tighter outline-none ${align} ${className}`}
          style={{ fontSize: `${36 * scale}px` }}
        >
          {data.titulo || 'TÍTULO DA COMPARAÇÃO'}
        </h2>
      </SmartElement>
    </div>
  );
};

// ==========================================
// VARIANTS
// ==========================================

// ═══════════════════════════════════════════════════════════
// VARIANTE 13 — VS Central Box
// Título superior com blocos split e ícones X/Check
// ═══════════════════════════════════════════════════════════
export function ComparisonVariant13(props) {
  const { data, index, slideCount, brandColor, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const bgBase = data.bgColor || '#ffffff';
  const gradientColor1 = brandColor;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden rounded-slide" style={{ backgroundColor: bgBase }}>
      <div className="p-10 pb-2 shrink-0 text-center relative z-10 bg-white">
        <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={props.slideCount} brandHandle={props.brandHandle} showBrandHandle={props.showBrandHandle} brandColor={props.brandColor} isVerified={props.isVerified} showSlideCounter={props.showSlideCounter} slideCounterPosition={props.slideCounterPosition} />
        <SmartEl {...sp} field="titulo">
          <TextWrapper {...sp} as="h2" field="titulo" className="font-black text-[#1a1a1a] leading-tight tracking-tighter uppercase mt-2 mb-2 translate-y-[6px]" style={{ fontFamily: titleFont, fontSize: `${28 * sTitle}px` }}>
            {data.titulo || 'TÍTULO DA COMPARAÇÃO'}
          </TextWrapper>
        </SmartEl>
      </div>
      <div className="flex-1 flex w-full relative z-0">
        <div className="w-1/2 h-full bg-zinc-900 p-6 pt-10 text-white flex flex-col">
          <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mb-6 shrink-0 mx-auto">
            <X className="w-4 h-4" />
          </div>
          <SmartEl {...sp} field="tag" className="flex-1 overflow-hidden">
            <TextWrapper {...sp} as="p" field="tag" className="leading-relaxed font-medium text-center whitespace-pre-wrap" style={{ fontFamily: textFont, fontSize: `${13 * sText}px` }}>
              {data.tag || (data.items?.[0]?.value) || 'ESTADO ATUAL OU PROBLEMA COMUM'}
            </TextWrapper>
          </SmartEl>
        </div>
        <div className="w-1/2 h-full p-6 pt-10 text-white flex flex-col" style={{ backgroundColor: gradientColor1 }}>
          <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center mb-6 shrink-0 mx-auto">
            <Check className="w-4 h-4" />
          </div>
          <SmartEl {...sp} field="texto_apoio" className="flex-1 overflow-hidden">
            <TextWrapper {...sp} as="p" field="texto_apoio" className="leading-relaxed font-medium text-center whitespace-pre-wrap" style={{ fontFamily: textFont, fontSize: `${13 * sText}px` }}>
              {data.texto_apoio || (data.items?.[1]?.value) || 'SUA SOLUÇÃO OU ESTADO DESEJADO'}
            </TextWrapper>
          </SmartEl>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl font-black text-xs" style={{ fontFamily: titleFont, color: gradientColor1 }}>VS</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 14 — Comparison Vertical Floating
// Blocos empilhados com título centralizado em card
// ═══════════════════════════════════════════════════════════
export function ComparisonVariant14(props) {
  const { data, index, brandColor, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sText = textScale / 100;
  const gradientColor1 = brandColor;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden relative rounded-slide">
      <div className="absolute top-0 left-0 w-full p-10 z-50">
        <SlideHeader data={props.data} slideIndex={props.index} onActionStart={props.onActionStart} selectedElement={props.selectedElement} onSelectElement={props.onSelectElement} index={(props.index || 0) + 1} total={props.slideCount} brandHandle={props.brandHandle} showBrandHandle={props.showBrandHandle} brandColor={props.brandColor} isVerified={props.isVerified} showSlideCounter={props.showSlideCounter} slideCounterPosition={props.slideCounterPosition} />
      </div>
      <div className="h-1/2 w-full bg-zinc-900 p-8 flex flex-col justify-center text-center pb-12">
        <div className="flex items-center justify-center gap-2 mb-3">
          <X className="w-4 h-4 text-red-500 opacity-80" />
          <span className="text-zinc-500 font-bold text-[10px] tracking-widest uppercase" style={{ fontFamily: titleFont }}>NÃO FAÇA ASSIM</span>
        </div>
        <SmartEl {...sp} field="tag">
          <TextWrapper {...sp} as="p" field="tag" className="text-white leading-snug font-medium whitespace-pre-wrap" style={{ fontFamily: textFont, fontSize: `${15 * sText}px` }}>
            {data.tag || (data.items?.[0]?.value) || 'DESCRIÇÃO DO PROBLEMA OU ESTADO ATUAL'}
          </TextWrapper>
        </SmartEl>
      </div>
      <div className="h-1/2 w-full p-8 flex flex-col justify-center text-center pt-12" style={{ backgroundColor: gradientColor1 }}>
        <div className="flex items-center justify-center gap-2 mb-3">
          <Check className="w-4 h-4 text-white opacity-80" />
          <span className="text-white/70 font-bold text-[10px] tracking-widest uppercase" style={{ fontFamily: titleFont }}>FAÇA ASSIM</span>
        </div>
        <SmartEl {...sp} field="texto_apoio">
          <TextWrapper {...sp} as="p" field="texto_apoio" className="text-white leading-snug font-medium whitespace-pre-wrap" style={{ fontFamily: textFont, fontSize: `${15 * sText}px` }}>
            {data.texto_apoio || (data.items?.[1]?.value) || 'SUA SOLUÇÃO OU ESTADO DESEJADO'}
          </TextWrapper>
        </SmartEl>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-8 py-3 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-10 w-[85%] border-4 border-zinc-900 flex items-center justify-center">
        <SmartEl {...sp} field="titulo">
          <TextWrapper {...sp} as="h2" field="titulo" className="font-black text-[#1a1a1a] leading-none text-center tracking-tighter uppercase" style={{ fontFamily: titleFont, fontSize: `${18 * sText}px` }}>
            {data.titulo || 'TÍTULO DA COMPARAÇÃO'}
          </TextWrapper>
        </SmartEl>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 15 — Comparison Card List
// Lista de cards com ícones e cores contrastantes
// ═══════════════════════════════════════════════════════════
export function ComparisonVariant15(props) {
  const { data, index, slideCount, brandColor, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const bgBase = data.bgColor || '#ffffff';
  const gradientColor1 = brandColor;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  return (
    <div className="w-full h-full p-10 flex flex-col overflow-hidden rounded-slide" style={{ backgroundColor: bgBase }}>
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={props.slideCount} brandHandle={props.brandHandle} showBrandHandle={props.showBrandHandle} brandColor={props.brandColor} isVerified={props.isVerified} showSlideCounter={props.showSlideCounter} slideCounterPosition={props.slideCounterPosition} />
      <SmartEl {...sp} field="titulo" className="mb-8 shrink-0 text-center">
        <TextWrapper {...sp} as="h2" field="titulo" className="font-black text-[#1a1a1a] leading-tight uppercase tracking-tighter relative top-[60px]" style={{ fontFamily: titleFont, fontSize: `${28 * sTitle}px` }}>
          {data.titulo || 'TÍTULO DA COMPARAÇÃO'}
        </TextWrapper>
      </SmartEl>
      <div className="flex-1 flex flex-col justify-center gap-6 min-h-0">
        <div className="flex items-start gap-4 p-6 bg-red-50 rounded-2xl border border-red-100 shadow-sm shrink-0">
          <div className="bg-red-500 rounded-full p-1.5 shrink-0 mt-1">
            <X className="w-4 h-4 text-white" />
          </div>
          <SmartEl {...sp} field="tag" className="flex-1 overflow-hidden">
            <TextWrapper {...sp} as="p" field="tag" className="text-red-900 leading-snug font-medium whitespace-pre-wrap" style={{ fontFamily: textFont, fontSize: `${14 * sText}px` }}>
              {data.tag || (data.items?.[0]?.value) || 'ESTADO ATUAL OU PROBLEMA COMUM'}
            </TextWrapper>
          </SmartEl>
        </div>
        <div className="flex items-start gap-4 p-6 rounded-2xl border shadow-md shrink-0" style={{ backgroundColor: `${brandColor}10`, borderColor: `${brandColor}30` }}>
          <div className="rounded-full p-1.5 shrink-0 mt-1" style={{ backgroundColor: gradientColor1 }}>
            <Check className="w-4 h-4 text-white" />
          </div>
          <SmartEl {...sp} field="texto_apoio" className="flex-1 overflow-hidden">
            <TextWrapper {...sp} as="p" field="texto_apoio" className="leading-snug font-bold whitespace-pre-wrap" style={{ color: '#1a1a1a', fontFamily: textFont, fontSize: `${14 * sText}px` }}>
              {data.texto_apoio || (data.items?.[1]?.value) || 'SUA SOLUÇÃO OU ESTADO DESEJADO'}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 16 — Comparison Photo Split Blur
// Divisão por imagem com blur na esquerda e foco na direita
// ═══════════════════════════════════════════════════════════
export function ComparisonVariant16(props) {
  const { data, index, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sText = textScale / 100;
  const bgBase = data.bgColor || '#ffffff';
  const imgUrl = data.imageUrl;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden rounded-slide" style={{ backgroundColor: bgBase }}>
      <div className="absolute top-0 left-0 w-full p-10 z-50">
        <SlideHeader data={props.data} slideIndex={props.index} onActionStart={props.onActionStart} selectedElement={props.selectedElement} onSelectElement={props.onSelectElement} index={(props.index || 0) + 1} total={props.slideCount} brandHandle={props.brandHandle} showBrandHandle={props.showBrandHandle} brandColor={props.brandColor} isVerified={props.isVerified} showSlideCounter={props.showSlideCounter} slideCounterPosition={props.slideCounterPosition} />
      </div>
      <div className="absolute top-24 left-0 w-full z-30 px-6 flex justify-center">
        <SmartEl {...sp} field="titulo" className="text-center bg-white/90 backdrop-blur py-3 px-6 rounded-full shadow-lg border border-white/50 inline-block mx-auto max-w-[90%] relative">
          <TextWrapper {...sp} as="h2" field="titulo" className="font-black text-[#1a1a1a] leading-none uppercase tracking-tighter" style={{ fontFamily: titleFont, fontSize: `${20 * sText}px` }}>
            {data.titulo || 'TÍTULO DA COMPARAÇÃO'}
          </TextWrapper>
        </SmartEl>
      </div>
      <div className="flex w-full h-full">
        <div className="w-1/2 h-full relative flex items-end p-5 pb-12 overflow-hidden bg-zinc-300">
          <div className="absolute inset-0 bg-cover bg-left blur-[8px] grayscale-[50%] opacity-70 scale-110" style={{ backgroundImage: `url(${imgUrl})` }} />
          <div className="absolute inset-0 bg-black/40" />
          <SmartEl {...sp} field="tag" className="z-10 w-full">
            <TextWrapper {...sp} as="p" field="tag" className="text-white/80 leading-snug font-medium text-center whitespace-pre-wrap drop-shadow-md" style={{ fontFamily: textFont, fontSize: `${13 * sText}px` }}>
              {data.tag || (data.items?.[0]?.value) || 'ESTADO ATUAL OU PROBLEMA COMUM'}
            </TextWrapper>
          </SmartEl>
        </div>
        <div className="w-1/2 h-full relative flex items-end p-5 pb-12 overflow-hidden bg-zinc-800 shadow-[-20px_0_40px_rgba(0,0,0,0.5)] z-10 border-l-4 border-white">
          <div className="absolute inset-0 bg-cover bg-right" style={{ backgroundImage: `url(${imgUrl})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <SmartEl {...sp} field="texto_apoio" className="z-10 w-full">
            <TextWrapper {...sp} as="p" field="texto_apoio" className="text-white font-bold leading-snug text-center whitespace-pre-wrap drop-shadow-xl" style={{ fontFamily: textFont, fontSize: `${13 * sText}px` }}>
              {data.texto_apoio || (data.items?.[1]?.value) || 'SUA SOLUÇÃO OU ESTADO DESEJADO'}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 17 — Comparison Slanted Luxury
// Fundo escuro com recorte diagonal e tÃ­tulo grande
// ═══════════════════════════════════════════════════════════
export function ComparisonVariant17(props) {
  const { data, index, brandColor, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const gradientColor1 = brandColor;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  return (
    <div className="w-full h-full relative overflow-hidden rounded-slide" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="absolute top-0 right-0 w-[150%] h-[150%] origin-top-right rotate-[-30deg] translate-x-[20%] translate-y-[-10%]" style={{ backgroundColor: gradientColor1 }} />
      <div className="absolute top-0 left-0 w-full p-10 z-50">
        <SlideHeader data={props.data} slideIndex={props.index} onActionStart={props.onActionStart} selectedElement={props.selectedElement} onSelectElement={props.onSelectElement} index={(props.index || 0) + 1} total={props.slideCount} brandHandle={props.brandHandle} showBrandHandle={props.showBrandHandle} brandColor={props.brandColor} isVerified={props.isVerified} showSlideCounter={props.showSlideCounter} slideCounterPosition={props.slideCounterPosition} />
      </div>
      <div className="absolute inset-0 flex flex-col p-8 z-10">
        <SmartEl {...sp} field="titulo" className="mb-auto">
          <TextWrapper {...sp} as="h2" field="titulo" className="font-black text-white leading-none uppercase tracking-tighter drop-shadow-lg" style={{ fontFamily: titleFont, fontSize: `${36 * sTitle}px` }}>
            {data.titulo || 'TÍTULO DA COMPARAÇÃO'}
          </TextWrapper>
        </SmartEl>
        <div className="flex w-full h-[60%] items-end pb-8">
          <div className="w-1/2 pr-6">
            <X className="w-6 h-6 text-white/50 mb-3" />
            <SmartEl {...sp} field="tag" className="overflow-hidden">
              <TextWrapper {...sp} as="p" field="tag" className="text-white/70 font-medium leading-snug" style={{ fontFamily: textFont, fontSize: `${13 * sText}px` }}>
                {data.tag || (data.items?.[0]?.value) || 'ESTADO ATUAL OU PROBLEMA COMUM'}
              </TextWrapper>
            </SmartEl>
          </div>
          <div className="w-1/2 pl-6">
            <Check className="w-6 h-6 text-white mb-3" />
            <SmartEl {...sp} field="texto_apoio" className="overflow-hidden">
              <TextWrapper {...sp} as="p" field="texto_apoio" className="text-white font-bold leading-snug drop-shadow-md" style={{ fontFamily: textFont, fontSize: `${13 * sText}px` }}>
                {data.texto_apoio || (data.items?.[1]?.value) || 'SUA SOLUÇÃO OU ESTADO DESEJADO'}
              </TextWrapper>
            </SmartEl>
          </div>
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-[#1a1a1a] font-black px-4 py-2 rounded-full shadow-2xl z-20 border-4 border-[#1a1a1a]" style={{ fontFamily: titleFont }}>VS</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 18 — Comparison Glass Glow
// Cards com blur sobre fundo com glow da cor da marca
// ═══════════════════════════════════════════════════════════
export function ComparisonVariant18(props) {
  const { data, index, slideCount, brandColor, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const gradientColor1 = brandColor;
  const imgUrl = data.imageUrl;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center p-6 bg-black overflow-hidden rounded-slide">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity blur-[3px] scale-110" style={{ backgroundImage: `url(${imgUrl})`, backgroundPosition: 'center 50%' }} />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="absolute top-0 left-0 w-full p-10 z-50">
        <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={props.slideCount} brandHandle={props.brandHandle} showBrandHandle={props.showBrandHandle} brandColor={props.brandColor} isVerified={props.isVerified} showSlideCounter={props.showSlideCounter} slideCounterPosition={props.slideCounterPosition} />
      </div>
      <SmartEl {...sp} field="titulo" className="mb-6 z-10 w-full text-center mt-12 shrink-0">
        <TextWrapper {...sp} as="h2" field="titulo" className="font-black text-white leading-tight uppercase tracking-tighter drop-shadow-xl" style={{ fontFamily: titleFont, fontSize: `${32 * sTitle}px` }}>
          {data.titulo || 'TÍTULO DA COMPARAÇÃO'}
        </TextWrapper>
      </SmartEl>
      <div className="w-full flex flex-col gap-4 z-10 flex-1 min-h-0 justify-center pb-8">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex items-center gap-4 shadow-lg ml-[-10px] mr-[10px] shrink-0">
          <div className="bg-red-500/20 p-2 rounded-full shrink-0">
            <X className="w-4 h-4 text-red-400" />
          </div>
          <SmartEl {...sp} field="tag" className="flex-1 overflow-hidden">
            <TextWrapper {...sp} as="p" field="tag" className="text-white/80 leading-snug font-medium" style={{ fontFamily: textFont, fontSize: `${13 * sText}px` }}>
              {data.tag || (data.items?.[0]?.value) || 'ESTADO ATUAL OU PROBLEMA COMUM'}
            </TextWrapper>
          </SmartEl>
        </div>
        <div className="bg-white/95 backdrop-blur-md border p-5 rounded-2xl flex items-center gap-4 shadow-[0_20px_40px_rgba(0,0,0,0.5)] ml-[10px] mr-[-10px] z-20 shrink-0" style={{ borderColor: gradientColor1 }}>
          <div className="p-2 rounded-full shrink-0" style={{ backgroundColor: gradientColor1 }}>
            <Check className="w-4 h-4 text-white" />
          </div>
          <SmartEl {...sp} field="texto_apoio" className="flex-1 overflow-hidden">
            <TextWrapper {...sp} as="p" field="texto_apoio" className="text-[#1a1a1a] leading-snug font-bold" style={{ fontFamily: textFont, fontSize: `${13 * sText}px` }}>
              {data.texto_apoio || (data.items?.[1]?.value) || 'SUA SOLUÇÃO OU ESTADO DESEJADO'}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 19 — Comparison Minimal VS
// Ãcones gigantes de X e Check com divisÃ³ria fina
// ═══════════════════════════════════════════════════════════
export function ComparisonVariant19(props) {
  const { data, index, slideCount, brandColor, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const bgBase = data.bgColor || '#ffffff';
  const gradientColor1 = brandColor;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center overflow-hidden relative rounded-slide" style={{ backgroundColor: bgBase }}>
      <div className="absolute top-0 left-0 w-full p-10 z-50">
        <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={props.slideCount} brandHandle={props.brandHandle} showBrandHandle={props.showBrandHandle} brandColor={props.brandColor} isVerified={props.isVerified} showSlideCounter={props.showSlideCounter} slideCounterPosition={props.slideCounterPosition} />
      </div>
      <SmartEl {...sp} field="titulo" className="absolute top-[66px] text-center w-full px-6">
        <TextWrapper {...sp} as="h2" field="titulo" className="font-black text-[#1a1a1a] leading-tight uppercase tracking-widest" style={{ fontFamily: titleFont, fontSize: `${22 * sTitle}px` }}>
          {data.titulo || 'TÍTULO DA COMPARAÇÃO'}
        </TextWrapper>
      </SmartEl>
      <div className="flex w-full h-[50%] mt-20">
        <div className="w-1/2 flex flex-col items-center justify-start p-4 text-center border-r border-zinc-300 min-h-0">
          <span className="font-black text-6xl text-zinc-300 mb-4 opacity-50 shrink-0" style={{ fontFamily: titleFont }}>X</span>
          <SmartEl {...sp} field="tag" className="overflow-hidden">
            <TextWrapper {...sp} as="p" field="tag" className="text-zinc-600 font-medium leading-snug" style={{ fontFamily: textFont, fontSize: `${13 * sText}px` }}>
              {data.tag || (data.items?.[0]?.value) || 'ESTADO ATUAL OU PROBLEMA COMUM'}
            </TextWrapper>
          </SmartEl>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-start p-4 text-center min-h-0">
          <span className="font-black text-6xl mb-4 shadow-sm shrink-0" style={{ color: gradientColor1, fontFamily: titleFont }}>✓</span>
          <SmartEl {...sp} field="texto_apoio" className="overflow-hidden">
            <TextWrapper {...sp} as="p" field="texto_apoio" className="text-[#1a1a1a] font-bold leading-snug" style={{ fontFamily: textFont, fontSize: `${13 * sText}px` }}>
              {data.texto_apoio || (data.items?.[1]?.value) || 'SUA SOLUÇÃO OU ESTADO DESEJADO'}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 20 — Comparison Dark Split
// Split vertical em fundo preto com cores contrastantes
// ═══════════════════════════════════════════════════════════
export function ComparisonVariant20(props) {
  const { data, index, slideCount, brandColor, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const gradientColor1 = brandColor;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-black text-white rounded-slide">
      <div className="p-10 shrink-0 relative z-10">
        <SlideHeader data={props.data} slideIndex={props.index} onActionStart={props.onActionStart} selectedElement={props.selectedElement} onSelectElement={props.onSelectElement} index={(props.index || 0) + 1} total={props.slideCount} brandHandle={props.brandHandle} showBrandHandle={props.showBrandHandle} brandColor={props.brandColor} isVerified={props.isVerified} showSlideCounter={props.showSlideCounter} slideCounterPosition={props.slideCounterPosition} />
        <SmartEl {...sp} field="titulo">
          <TextWrapper {...sp} as="h2" field="titulo" className="font-black leading-tight tracking-tighter uppercase mt-2 mb-2 text-center translate-y-[20px]" style={{ fontFamily: titleFont, fontSize: `${28 * sTitle}px` }}>
            {data.titulo || 'TÍTULO DA COMPARAÇÃO'}
          </TextWrapper>
        </SmartEl>
      </div>
      <div className="flex-1 flex w-full relative z-0">
        <div className="w-1/2 h-full bg-[#0a0a0a] p-6 pt-10 flex flex-col items-center">
          <X className="w-8 h-8 text-white/50 mb-6 shrink-0" />
          <SmartEl {...sp} field="tag" className="flex-1 overflow-hidden w-full">
            <TextWrapper {...sp} as="p" field="tag" className="leading-relaxed font-medium text-center whitespace-pre-wrap text-white/50" style={{ fontFamily: textFont, fontSize: `${13 * sText}px` }}>
              {data.tag || (data.items?.[0]?.value) || 'ESTADO ATUAL OU PROBLEMA COMUM'}
            </TextWrapper>
          </SmartEl>
        </div>
        <div className="w-1/2 h-full p-6 pt-10 flex flex-col items-center" style={{ backgroundColor: gradientColor1 }}>
          <Check className="w-8 h-8 text-white mb-6 shrink-0" />
          <SmartEl {...sp} field="texto_apoio" className="flex-1 overflow-hidden w-full">
            <TextWrapper {...sp} as="p" field="texto_apoio" className="leading-relaxed font-bold text-center whitespace-pre-wrap text-white" style={{ fontFamily: textFont, fontSize: `${13 * sText}px` }}>
              {data.texto_apoio || (data.items?.[1]?.value) || 'SUA SOLUÇÃO OU ESTADO DESEJADO'}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 21 — Comparison Dark Box
// Cards escuros com acento na cor da marca
// ═══════════════════════════════════════════════════════════
export function ComparisonVariant21(props) {
  const { data, index, slideCount, brandColor, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-black text-white p-10 rounded-slide">
      <SlideHeader data={props.data} slideIndex={props.index} onActionStart={props.onActionStart} selectedElement={props.selectedElement} onSelectElement={props.onSelectElement} index={(props.index || 0) + 1} total={props.slideCount} brandHandle={props.brandHandle} showBrandHandle={props.showBrandHandle} brandColor={props.brandColor} isVerified={props.isVerified} showSlideCounter={props.showSlideCounter} slideCounterPosition={props.slideCounterPosition} />
      <SmartEl {...sp} field="titulo" className="mb-8 text-center shrink-0">
        <TextWrapper {...sp} as="h2" field="titulo" className="font-black leading-tight uppercase tracking-tighter relative top-[60px]" style={{ fontFamily: titleFont, fontSize: `${28 * sTitle}px` }}>
          {data.titulo || 'TÍTULO DA COMPARAÇÃO'}
        </TextWrapper>
      </SmartEl>
      <div className="flex-1 flex flex-col gap-6 min-h-0 justify-center">
        <div className="border border-[#222] bg-[#050505] p-6 rounded-2xl flex gap-4 items-start shrink-0 shadow-lg">
          <div className="bg-[#111] rounded-full p-2">
            <X className="w-4 h-4 text-white/50" />
          </div>
          <SmartEl {...sp} field="tag" className="flex-1 overflow-hidden">
            <TextWrapper {...sp} as="p" field="tag" className="text-white/50 leading-snug font-medium whitespace-pre-wrap" style={{ fontFamily: textFont, fontSize: `${14 * sText}px` }}>
              {data.tag || (data.items?.[0]?.value) || 'ESTADO ATUAL OU PROBLEMA COMUM'}
            </TextWrapper>
          </SmartEl>
        </div>
        <div className="p-6 rounded-2xl flex gap-4 items-start shadow-2xl shrink-0" style={{ backgroundColor: brandColor }}>
          <div className="bg-white/20 rounded-full p-2">
            <Check className="w-4 h-4 text-white" />
          </div>
          <SmartEl {...sp} field="texto_apoio" className="flex-1 overflow-hidden">
            <TextWrapper {...sp} as="p" field="texto_apoio" className="text-white leading-snug font-bold whitespace-pre-wrap" style={{ fontFamily: textFont, fontSize: `${14 * sText}px` }}>
              {data.texto_apoio || (data.items?.[1]?.value) || 'SUA SOLUÇÃO OU ESTADO DESEJADO'}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 22 — Comparison Split Image Dark
// Título central com imagem de fundo e overlay escuro
// ═══════════════════════════════════════════════════════════
export function ComparisonVariant22(props) {
  const { data, index, slideCount, brandColor, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sText = textScale / 100;
  const imgUrl = data.imageUrl;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  return (
    <div className="w-full h-full relative overflow-hidden bg-black text-white flex flex-col rounded-slide">
      <div className="h-1/2 w-full relative shrink-0">
        <div className="absolute inset-0 bg-cover bg-center opacity-40 grayscale" style={{ backgroundImage: `url(${imgUrl})`, backgroundPosition: 'center 50%' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black" />
        <div className="absolute top-0 left-0 w-full p-10 z-50">
          <SlideHeader data={props.data} slideIndex={props.index} onActionStart={props.onActionStart} selectedElement={props.selectedElement} onSelectElement={props.onSelectElement} index={(props.index || 0) + 1} total={props.slideCount} brandHandle={props.brandHandle} showBrandHandle={props.showBrandHandle} brandColor={props.brandColor} isVerified={props.isVerified} showSlideCounter={props.showSlideCounter} slideCounterPosition={props.slideCounterPosition} />
        </div>
        <div className="relative z-10 p-6 h-full flex flex-col justify-end text-center pb-10">
          <X className="w-6 h-6 text-white/30 mx-auto mb-2" />
          <SmartEl {...sp} field="tag">
            <TextWrapper {...sp} as="p" field="tag" className="text-white/50 leading-snug font-medium whitespace-pre-wrap" style={{ fontFamily: textFont, fontSize: `${14 * sText}px` }}>
              {data.tag || (data.items?.[0]?.value) || 'ESTADO ATUAL OU PROBLEMA COMUM'}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>
      <div className="h-1/2 w-full relative shrink-0" style={{ backgroundColor: brandColor }}>
        <div className="absolute inset-0 bg-cover bg-center mix-blend-multiply opacity-50" style={{ backgroundImage: `url(${imgUrl})`, backgroundPosition: 'center 50%' }} />
        <div className="relative z-10 p-6 h-full flex flex-col justify-start text-center pt-10">
          <Check className="w-6 h-6 text-white mx-auto mb-2" />
          <SmartEl {...sp} field="texto_apoio">
            <TextWrapper {...sp} as="p" field="texto_apoio" className="text-white leading-snug font-bold whitespace-pre-wrap" style={{ fontFamily: textFont, fontSize: `${14 * sText}px` }}>
              {data.texto_apoio || (data.items?.[1]?.value) || 'SUA SOLUÇÃO OU ESTADO DESEJADO'}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-6 py-3 rounded-full shadow-2xl z-20 border border-[#333]">
        <SmartEl {...sp} field="titulo">
          <TextWrapper {...sp} as="h2" field="titulo" className="font-black text-white leading-none text-center tracking-tighter uppercase" style={{ fontFamily: titleFont, fontSize: `${16 * sText}px` }}>
            {data.titulo || 'TÍTULO DA COMPARAÇÃO'}
          </TextWrapper>
        </SmartEl>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 23 — Comparison Giant Check Dark
// Ícones gigantes sobre fundo preto
// ═══════════════════════════════════════════════════════════
export function ComparisonVariant23(props) {
  const { data, index, slideCount, brandColor, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center overflow-hidden relative bg-black text-white rounded-slide">
      <div className="absolute top-0 left-0 w-full p-10 z-50">
        <SlideHeader data={props.data} slideIndex={props.index} onActionStart={props.onActionStart} selectedElement={props.selectedElement} onSelectElement={props.onSelectElement} index={(props.index || 0) + 1} total={props.slideCount} brandHandle={props.brandHandle} showBrandHandle={props.showBrandHandle} brandColor={props.brandColor} isVerified={props.isVerified} showSlideCounter={props.showSlideCounter} slideCounterPosition={props.slideCounterPosition} />
      </div>
      <SmartEl {...sp} field="titulo" className="absolute top-[46px] text-center w-full px-6">
        <TextWrapper {...sp} as="h2" field="titulo" className="font-black leading-tight uppercase tracking-widest" style={{ fontFamily: titleFont, fontSize: `${22 * sTitle}px`, color: brandColor }}>
          {data.titulo || 'TÍTULO DA COMPARAÇÃO'}
        </TextWrapper>
      </SmartEl>
      <div className="flex w-full h-[50%] mt-20">
        <div className="w-1/2 flex flex-col items-center justify-start p-4 text-center border-r border-[#222] min-h-0">
          <span className="font-black text-6xl text-[#222] mb-4 shrink-0" style={{ fontFamily: titleFont }}>X</span>
          <SmartEl {...sp} field="tag" className="overflow-hidden">
            <TextWrapper {...sp} as="p" field="tag" className="text-white/50 font-medium leading-snug whitespace-pre-wrap" style={{ fontFamily: textFont, fontSize: `${13 * sText}px` }}>
              {data.tag || (data.items?.[0]?.value) || 'ESTADO ATUAL OU PROBLEMA COMUM'}
            </TextWrapper>
          </SmartEl>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-start p-4 text-center min-h-0">
          <span className="font-black text-6xl mb-4 shrink-0 drop-shadow-lg" style={{ color: brandColor, fontFamily: titleFont }}>✓</span>
          <SmartEl {...sp} field="texto_apoio" className="overflow-hidden">
            <TextWrapper {...sp} as="p" field="texto_apoio" className="text-white font-bold leading-snug whitespace-pre-wrap" style={{ fontFamily: textFont, fontSize: `${13 * sText}px` }}>
              {data.texto_apoio || (data.items?.[1]?.value) || 'SUA SOLUÇÃO OU ESTADO DESEJADO'}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 24 — Comparison Minimalist Accent
// Bordas laterais coloridas para diferenciação
// ═══════════════════════════════════════════════════════════
export function ComparisonVariant24(props) {
  const { data, index, slideCount, brandColor, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const imgUrl = data.imageUrl;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  return (
    <div className="w-full h-full relative overflow-hidden bg-black flex flex-col text-white rounded-slide">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${imgUrl})`, backgroundPosition: 'center 50%' }} />
        <div className="absolute inset-0 bg-black/80" />
      </div>
      <div className="relative z-10 flex-1 flex flex-col p-8 justify-center">
        <div className="absolute top-0 left-0 w-full p-10 z-50">
          <SlideHeader data={props.data} slideIndex={props.index} onActionStart={props.onActionStart} selectedElement={props.selectedElement} onSelectElement={props.onSelectElement} index={(props.index || 0) + 1} total={props.slideCount} brandHandle={props.brandHandle} showBrandHandle={props.showBrandHandle} brandColor={props.brandColor} isVerified={props.isVerified} showSlideCounter={props.showSlideCounter} slideCounterPosition={props.slideCounterPosition} />
        </div>
        <SmartEl {...sp} field="titulo" className="mb-8 text-center shrink-0">
          <TextWrapper {...sp} as="h2" field="titulo" className="font-black text-white leading-tight uppercase tracking-tighter" style={{ fontFamily: titleFont, fontSize: `${28 * sTitle}px` }}>
            {data.titulo || 'TÍTULO DA COMPARAÇÃO'}
          </TextWrapper>
        </SmartEl>
        <div className="flex flex-col gap-8 min-h-0">
          <div className="border-l-2 border-[#333] pl-6 shrink-0 opacity-50">
            <X className="w-5 h-5 text-white mb-2" />
            <SmartEl {...sp} field="tag">
              <TextWrapper {...sp} as="p" field="tag" className="text-white leading-snug font-medium whitespace-pre-wrap" style={{ fontFamily: textFont, fontSize: `${14 * sText}px` }}>
                {data.tag || (data.items?.[0]?.value) || 'ESTADO ATUAL OU PROBLEMA COMUM'}
              </TextWrapper>
            </SmartEl>
          </div>
          <div className="border-l-4 pl-6 shrink-0" style={{ borderColor: brandColor }}>
            <Check className="w-6 h-6 mb-2" style={{ color: brandColor }} />
            <SmartEl {...sp} field="texto_apoio">
              <TextWrapper {...sp} as="p" field="texto_apoio" className="text-white font-bold leading-snug whitespace-pre-wrap" style={{ fontFamily: textFont, fontSize: `${15 * sText}px` }}>
                {data.texto_apoio || (data.items?.[1]?.value) || 'SUA SOLUÇÃO OU ESTADO DESEJADO'}
              </TextWrapper>
            </SmartEl>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ComparisonVariant1(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
    const items = data.items || [];
    const normalItems = items.filter(it => !it.highlight);
    const highlightItems = items.filter(it => it.highlight);
    
    // Constrói a lista de 4 itens (Cinza, Destaque, Cinza, Destaque)
    const displayItems = [
      { item: normalItems[0] || { label: 'Mercado', value: 'Padrão Comum', highlight: false }, originalIndex: items.indexOf(normalItems[0]) },
      { item: highlightItems[0] || { label: 'Premium', value: 'Sua Solução Elite', highlight: true }, originalIndex: items.indexOf(highlightItems[0]) },
      { item: normalItems[1] || { label: 'Mercado', value: 'Limitação do Setor', highlight: false }, originalIndex: items.indexOf(normalItems[1]) },
      { item: highlightItems[1] || { label: 'Premium', value: 'Diferencial Exclusivo', highlight: true }, originalIndex: items.indexOf(highlightItems[1]) }
    ];

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col p-10 pb-10 relative rounded-slide">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={props.slideCount} brandHandle={props.brandHandle} showBrandHandle={props.showBrandHandle} brandColor={props.brandColor} isVerified={props.isVerified} showSlideCounter={props.showSlideCounter} slideCounterPosition={props.slideCounterPosition}

              />
      
      <div className="flex-1 flex flex-col justify-start pt-5 pb-8">
        <ComparisonTitle 
          data={data} index={index} scale={sTitle} 
          onActionStart={onActionStart} onTextChange={onTextChange} 
          selectedElement={selectedElement} onSelectElement={onSelectElement}
          wrapperClasses="mb-3 shrink-0"
          className="text-white"
        />

        <div className="space-y-3 overflow-hidden flex-1 pr-2 flex flex-col justify-center">
          {displayItems.map((obj, i) => {
            const { item, originalIndex } = obj;
            const targetIndex = originalIndex !== -1 ? originalIndex : items.length + i;
            
            return (
              <div 
                key={i} 
                className={`flex justify-between items-center p-4 rounded-2xl border transition-all ${
                  item.highlight ? 'shadow-2xl' : 'bg-surface-input/30 border-white/5 opacity-50'
                }`}
                style={item.highlight ? { backgroundColor: `${brandColor}15`, borderColor: `${brandColor}40` } : {}}
              >
                <div className="flex flex-col w-full">
                  <span 
                    contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, targetIndex, 'label', e.currentTarget.innerText)}
                    className={`font-outfit font-black text-[9px] tracking-widest uppercase block ${!item.highlight ? 'text-zinc-500' : ''}`}
                    style={item.highlight ? { color: brandColor } : {}}
                  >
                    {item.label}
                  </span>
                  <span 
                    contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, targetIndex, 'value', e.currentTarget.innerText)}
                    className={`font-playfair text-base block truncate line-clamp-2 ${item.highlight ? 'text-white font-bold' : 'text-zinc-400 italic'}`}
                  >
                    {item.value}
                  </span>
                </div>
                {item.highlight && (
                  <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: brandColor }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <SlideFooterPlaceholder />
    </div>
  );
}

export function ComparisonVariant2(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [];
  const normalItems = items.filter(it => !it.highlight).slice(0, 5);
  const highlightItems = items.filter(it => it.highlight).slice(0, 5);
  
  const mercadoLabel = normalItems[0]?.label || 'Mercado';
  const brandLabel = highlightItems[0]?.label || brandHandle || 'Sua Marca';

  return (
    <div className="w-full h-full flex flex-row relative rounded-slide">
      <div className="w-1/2 h-full bg-zinc-900 p-8 pt-28 flex flex-col border-r border-black/20">
        <h3 contentEditable suppressContentEditableWarning className="font-outfit font-black text-zinc-600 tracking-widest uppercase text-xs mb-8">{mercadoLabel}</h3>
        <div className="space-y-6 flex-1 overflow-hidden">
          {normalItems.map((item, i) => (
            <div key={i} className="pb-4 border-b border-white/5">
              <span 
                contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(item) !== -1 ? items.indexOf(item) : items.length, 'value', e.currentTarget.innerText)}
                className="block font-playfair text-zinc-400 text-lg leading-tight"
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/2 h-full p-8 pt-28 flex flex-col" style={{ backgroundColor: brandColor }}>
        <h3 contentEditable suppressContentEditableWarning className="font-outfit font-black text-black/50 tracking-widest uppercase text-xs mb-8 line-clamp-1">{brandLabel}</h3>
        <div className="space-y-6 flex-1 overflow-hidden">
          {highlightItems.map((item, i) => (
            <div key={i} className="pb-4 border-b border-black/10">
              <span 
                contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(item) !== -1 ? items.indexOf(item) : items.length, 'value', e.currentTarget.innerText)}
                className="block font-playfair font-bold text-white text-lg leading-tight drop-shadow-md"
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#020202] rounded-full flex items-center justify-center font-outfit font-black text-white border-4 border-[#020202] z-10 text-xs shrink-0">VS</div>
      <div className="absolute top-0 left-0 w-full p-8">
        <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={props.slideCount} brandHandle={props.brandHandle} showBrandHandle={props.showBrandHandle} brandColor={props.brandColor} isVerified={props.isVerified} showSlideCounter={props.showSlideCounter} slideCounterPosition={props.slideCounterPosition}

              />
      </div>
      {/* Title is hidden in this variant as per layout, but we could add if needed. Keeping true to mockup. */}
    </div>
  );
}

export function ComparisonVariant3(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [];
  const midPoint = Math.ceil(items.length / 2);
  const leftItems = items.filter(it => !it.highlight);
  const rightItems = items.filter(it => it.highlight);
  // Match row by row
  const rowCount = Math.max(leftItems.length, rightItems.length);

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col p-10 pb-10 relative rounded-slide">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={props.slideCount} brandHandle={props.brandHandle} showBrandHandle={props.showBrandHandle} brandColor={props.brandColor} isVerified={props.isVerified} showSlideCounter={props.showSlideCounter} slideCounterPosition={props.slideCounterPosition}

              />
      
      <div className="flex-1 flex flex-col justify-start pt-16 pb-8">
        <ComparisonTitle 
          data={data} index={index} scale={sTitle} 
          onActionStart={onActionStart} onTextChange={onTextChange} 
          selectedElement={selectedElement} onSelectElement={onSelectElement}
          wrapperClasses="mb-10 text-center shrink-0"
        />

        <div className="bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-2 flex-1 shadow-2xl flex flex-col justify-start">
          {Array.from({ length: rowCount }).map((_, i) => {
            const left = leftItems[i];
            const right = rightItems[i];
            const leftIndex = items.indexOf(left);
            const rightIndex = items.indexOf(right);

            return (
              <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 gap-4 shrink-0">
                <div className="flex-1 text-right">
                  {left && (
                    <span 
                      contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, leftIndex, 'value', e.currentTarget.innerText)}
                      className="font-playfair text-zinc-500 text-sm"
                    >
                      {left.value}
                    </span>
                  )}
                </div>
                <div className="w-px h-8 bg-surface-input/30 shrink-0"></div>
                <div className="flex-1 text-left">
                  {right && (
                    <span 
                      contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, rightIndex, 'value', e.currentTarget.innerText)}
                      className="font-outfit font-bold text-white text-base" style={{ color: brandColor }}
                    >
                      {right.value}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <SlideFooterPlaceholder />
    </div>
  );
}

export function ComparisonVariant4(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [];
  
  let baseNormal = items.filter(i => !i.highlight);
  let baseHighlight = items.filter(i => i.highlight);
  while (baseNormal.length < 2) baseNormal.push({ label: 'Categoria', value: 'Texto comum' });
  while (baseHighlight.length < 2) baseHighlight.push({ label: 'Destaque', value: 'Texto destaque', highlight: true });
  const itemsDisp = [baseNormal[0], baseHighlight[0], baseNormal[1], baseHighlight[1]];

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col p-10 pb-10 relative rounded-slide">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={props.slideCount} brandHandle={props.brandHandle} showBrandHandle={props.showBrandHandle} brandColor={props.brandColor} isVerified={props.isVerified} showSlideCounter={props.showSlideCounter} slideCounterPosition={props.slideCounterPosition}

              />
      
      <div className="flex-1 flex flex-col justify-start pt-16 pb-8">
        <ComparisonTitle 
          data={data} index={index} scale={sTitle} 
          onActionStart={onActionStart} onTextChange={onTextChange} 
          selectedElement={selectedElement} onSelectElement={onSelectElement}
          wrapperClasses="mb-8 shrink-0" align="text-left"
        />

        <div className="grid grid-cols-2 gap-4 flex-1 overflow-hidden pr-1">
          {itemsDisp.map((item, i) => (
            <div 
              key={i} 
              className={`p-4 rounded-2xl h-full flex flex-col items-center justify-center text-center overflow-hidden border ${item.highlight ? 'bg-white text-black shadow-xl' : 'bg-transparent text-white border-white/20'}`}
              style={item.highlight ? { borderColor: 'white' } : {}}
            >
              <span 
                contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(item), 'label', e.currentTarget.innerText)}
                className={`font-outfit font-black text-[9px] tracking-widest uppercase mb-2 ${item.highlight ? '' : 'text-zinc-500'}`}
                style={item.highlight ? { color: brandColor } : {}}
              >
                {item.label}
              </span>
              <span 
                contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(item), 'value', e.currentTarget.innerText)}
                className={`font-playfair text-sm leading-snug ${item.highlight ? 'font-bold' : 'italic text-zinc-400'}`}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      <SlideFooterPlaceholder />
    </div>
  );
}

export function ComparisonVariant5(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [];
  const normalItems = items.filter(it => !it.highlight);
  const highlightItems = items.filter(it => it.highlight);

  const mercadoLabel = normalItems[0]?.label || 'Mercado';
  const brandLabel = highlightItems[0]?.label || brandHandle || 'Alice Standard';

  return (
    <div className="w-full h-full bg-[#E5E5E5] flex flex-col p-10 pb-10 relative text-black rounded-slide">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandColor="#000000" isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}

              />
      
      <div className="flex-1 flex flex-col pt-20 pb-12 relative">
        <ComparisonTitle 
          data={data} index={index} scale={sTitle} 
          onActionStart={onActionStart} onTextChange={onTextChange} 
          selectedElement={selectedElement} onSelectElement={onSelectElement}
          wrapperClasses="mb-10 text-center shrink-0" color="text-black"
        />

        <div className="relative flex-1">
          <div className="absolute top-0 left-4 right-12 bottom-20 bg-white border border-black/10 rounded-3xl p-8 shadow-md transform -rotate-3 z-0 blur-[1px] flex flex-col gap-4 opacity-50 overflow-hidden">
            <h4 contentEditable suppressContentEditableWarning className="font-outfit font-black text-xs tracking-widest uppercase text-zinc-400">{mercadoLabel}</h4>
            {normalItems.map((item, i) => (
              <span key={i} contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(item), 'value', e.currentTarget.innerText)} className="font-playfair italic text-zinc-500 text-sm border-b border-black/5 pb-2">{item.value}</span>
            ))}
          </div>
          <div className="absolute top-20 left-12 right-4 bottom-0 bg-black rounded-3xl p-8 shadow-2xl z-10 flex flex-col gap-4 transform rotate-2 overflow-hidden">
            <h4 contentEditable suppressContentEditableWarning className="font-outfit font-black text-xs tracking-widest uppercase text-white" style={{ color: brandColor }}>{brandLabel}</h4>
            {highlightItems.map((item, i) => (
              <span key={i} contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(item), 'value', e.currentTarget.innerText)} className="font-playfair font-bold text-white text-lg border-b border-white/10 pb-4">{item.value}</span>
            ))}
          </div>
        </div>
      </div>
      <SlideFooterPlaceholder />
    </div>
  );
}

export function ComparisonVariant6(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [];
  
  const leftItems = items.filter(it => !it.highlight);
  const rightItems = items.filter(it => it.highlight);
  const rowCount = Math.max(leftItems.length, rightItems.length);

  return (
    <div className="w-full h-full bg-[#020202] flex flex-col p-10 pb-10 relative overflow-hidden rounded-slide">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={props.slideCount} brandHandle={props.brandHandle} showBrandHandle={props.showBrandHandle} brandColor={props.brandColor} isVerified={props.isVerified} showSlideCounter={props.showSlideCounter} slideCounterPosition={props.slideCounterPosition}

              />
      
      <div className="flex-1 flex flex-col justify-start pt-16 pb-8">
        <div className="mb-10 shrink-0">
          <SmartElement slideIndex={index} field="titulo" position={data.positions?.titulo || {x:0, y:0, scale:1}} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement}>
            <h2 
              contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange && onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-outfit font-black text-white tracking-tighter outline-none border-l-4 pl-4"
              style={{ fontSize: `${36 * sTitle}px`, borderColor: brandColor }}
            >
              {data.titulo}
            </h2>
          </SmartElement>
        </div>

        <div className="space-y-6 flex-1 overflow-hidden pr-2">
          {Array.from({ length: rowCount }).map((_, i) => {
            const left = leftItems[i];
            const right = rightItems[i];
            return (
              <div key={i} className="flex flex-col gap-2">
                <span className="font-outfit font-black text-[10px] tracking-widest uppercase text-zinc-600">
                  <span contentEditable suppressContentEditableWarning onBlur={(e) => left && onItemChange && onItemChange(index, items.indexOf(left) !== -1 ? items.indexOf(left) : items.length, 'label', e.currentTarget.innerText)}>{left?.label || 'Comum'}</span> vs <span contentEditable suppressContentEditableWarning onBlur={(e) => right && onItemChange && onItemChange(index, items.indexOf(right) !== -1 ? items.indexOf(right) : items.length, 'label', e.currentTarget.innerText)} style={{ color: brandColor }}>{right?.label || 'Premium'}</span>
                </span>
                {left && (
                  <span contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(left) !== -1 ? items.indexOf(left) : items.length, 'value', e.currentTarget.innerText)} className="font-playfair text-zinc-500 text-base line-through decoration-zinc-700 decoration-2">{left.value}</span>
                )}
                {right && (
                  <span contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(right) !== -1 ? items.indexOf(right) : items.length, 'value', e.currentTarget.innerText)} className="font-playfair font-bold text-white text-xl" style={{ color: brandColor }}>{right.value}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <SlideFooterPlaceholder />
    </div>
  );
}

export function ComparisonVariant7(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [];
  
  let leftItems = items.filter(it => !it.highlight);
  let rightItems = items.filter(it => it.highlight);
  while (leftItems.length < 3) leftItems.push({ label: 'Categoria', value: 'Adicione...' });
  while (rightItems.length < 3) rightItems.push({ label: 'Categoria', value: 'Adicione...', highlight: true });
  leftItems = leftItems.slice(0, 3);
  rightItems = rightItems.slice(0, 3);
  const rowCount = 3;
  
  const mercadoLabel = leftItems[0]?.label || 'Mercado';
  const brandLabel = rightItems[0]?.label || brandHandle || 'Alice';

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col p-10 pb-10 relative rounded-slide">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={props.slideCount} brandHandle={props.brandHandle} showBrandHandle={props.showBrandHandle} brandColor={props.brandColor} isVerified={props.isVerified} showSlideCounter={props.showSlideCounter} slideCounterPosition={props.slideCounterPosition}

              />
      
      <div className="flex-1 flex flex-col justify-start pt-16 pb-8">
        <ComparisonTitle 
          data={data} index={index} scale={sTitle} 
          onActionStart={onActionStart} onTextChange={onTextChange} 
          selectedElement={selectedElement} onSelectElement={onSelectElement}
          wrapperClasses="mb-8 text-center shrink-0"
        />

        <div className="flex-1 overflow-hidden text-sm border border-white/10 rounded-2xl bg-zinc-900/50 flex flex-col">
          <div className="flex border-b border-white/10 bg-black/40 shrink-0">
            <div contentEditable suppressContentEditableWarning className="w-1/2 p-4 text-center font-outfit font-bold text-[10px] uppercase tracking-widest text-zinc-500">{mercadoLabel}</div>
            <div contentEditable suppressContentEditableWarning className="w-1/2 p-4 text-center font-outfit font-bold text-[10px] uppercase tracking-widest text-white border-l border-white/10" style={{ backgroundColor: `${brandColor}20`, color: brandColor }}>{brandLabel}</div>
          </div>
          <div className="overflow-hidden flex-1">
            {Array.from({ length: rowCount }).map((_, i) => {
              const left = leftItems[i];
              const right = rightItems[i];
              return (
                <div key={i} className="flex border-b border-white/5 last:border-0 items-stretch h-1/3 min-h-[60px] bg-black/40">
                  <div className="w-1/2 p-2 px-4 text-center flex items-center justify-center gap-2">
                    {left && (
                      <>
                        <X className="w-4 h-4 text-zinc-600 shrink-0" />
                        <span contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(left) !== -1 ? items.indexOf(left) : items.length, 'value', e.currentTarget.innerText)} className="font-playfair text-zinc-400 text-sm">{left.value}</span>
                      </>
                    )}
                  </div>
                  <div className="w-1/2 p-2 px-4 text-center border-l border-white/5 flex items-center justify-center gap-2" style={{ backgroundColor: `${brandColor}20` }}>
                    {right && (
                      <>
                        <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: brandColor }} />
                        <span contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(right) !== -1 ? items.indexOf(right) : items.length, 'value', e.currentTarget.innerText)} className="font-playfair font-bold text-white text-sm">{right.value}</span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <SlideFooterPlaceholder />
    </div>
  );
}

export function ComparisonVariant8(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [];
  const normalItems = items.filter(it => !it.highlight);
  const highlightItems = items.filter(it => it.highlight);
  const mercadoLabel = normalItems[0]?.label || 'Mercado';
  const brandLabel = highlightItems[0]?.label || brandHandle || 'Padrão';

  return (
    <div className="w-full h-full bg-[#080808] flex flex-col p-10 pb-10 relative rounded-slide">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={props.slideCount} brandHandle={props.brandHandle} showBrandHandle={props.showBrandHandle} brandColor={props.brandColor} isVerified={props.isVerified} showSlideCounter={props.showSlideCounter} slideCounterPosition={props.slideCounterPosition}

              />
      
      <ComparisonTitle 
        data={data} index={index} scale={sTitle} 
        onActionStart={onActionStart} onTextChange={onTextChange} 
        selectedElement={selectedElement} onSelectElement={onSelectElement}
        wrapperClasses="mb-6 shrink-0 mt-8 z-20" align="text-left"
      />

      <div className="flex-1 relative overflow-hidden mt-4">
        <div className="absolute top-0 left-0 w-[85%] bottom-28 bg-zinc-900 border border-zinc-700 rounded-3xl p-6 shadow-md z-0 opacity-60 overflow-hidden">
          <h4 contentEditable suppressContentEditableWarning className="font-outfit font-bold text-xs uppercase tracking-widest text-zinc-500 mb-4">{mercadoLabel}</h4>
          <ul className="space-y-3">
            {normalItems.map((item, i) => (
              <li key={i} contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(item), 'value', e.currentTarget.innerText)} className="font-playfair text-zinc-400 text-sm">• {item.value}</li>
            ))}
          </ul>
        </div>
        <div className="absolute top-28 right-0 w-[85%] bottom-0 rounded-3xl p-6 shadow-2xl z-10 flex flex-col" style={{ backgroundColor: brandColor }}>
          <h4 contentEditable suppressContentEditableWarning className="font-outfit font-black text-xs uppercase tracking-widest text-black/50 mb-4 shrink-0">{brandLabel}</h4>
          <ul className="space-y-4 overflow-hidden flex-1">
            {highlightItems.map((item, i) => (
              <li key={i} className="flex gap-2 items-start">
                <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                <span className="font-playfair font-bold text-white text-base leading-snug">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <SlideFooterPlaceholder />
    </div>
  );
}

export function ComparisonVariant9(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [];
  const normalItems = items.filter(it => !it.highlight);
  const highlightItems = items.filter(it => it.highlight);
  
  return (
    <div className="w-full h-full bg-[#050505] flex relative rounded-slide">
      <div className="absolute top-0 left-0 w-full p-10 z-50">
        <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={props.slideCount} brandHandle={props.brandHandle} showBrandHandle={props.showBrandHandle} brandColor={props.brandColor} isVerified={props.isVerified} showSlideCounter={props.showSlideCounter} slideCounterPosition={props.slideCounterPosition}

              />
      </div>
      <div className="absolute inset-0 bg-zinc-900 clip-diagonal z-0" style={{ clipPath: 'polygon(0px 0px, 45% 0px, 55% 100%, 0px 100%)' }}></div>
      
      <div className="absolute inset-0 z-10 flex flex-col p-10 pt-20 pointer-events-none">
        <ComparisonTitle 
          data={data} index={index} scale={sTitle} 
          onActionStart={onActionStart} onTextChange={onTextChange} 
          selectedElement={selectedElement} onSelectElement={onSelectElement}
          wrapperClasses="mb-10 text-center pointer-events-auto"
        />

        <div className="flex-1 flex pointer-events-auto">
          <div className="w-1/2 pr-6 flex flex-col gap-5 items-end text-right pt-16">
            {normalItems.map((item, i) => (
              <div key={i} className="w-full">
                <h4 contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(item), 'label', e.currentTarget.innerText)} className="font-outfit font-black text-[9px] uppercase tracking-widest text-zinc-600 mb-1">{item.label}</h4>
                <p 
                  contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(item), 'value', e.currentTarget.innerText)}
                  className="font-playfair text-zinc-400 text-sm"
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
          <div className="w-1/2 pl-6 flex flex-col gap-6 items-start text-left pt-2 pb-4">
            {highlightItems.map((item, i) => (
              <div key={i} className="w-full drop-shadow-xl z-20">
                <h4 contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(item), 'label', e.currentTarget.innerText)} className="font-outfit font-black text-[9px] uppercase tracking-widest mb-1" style={{ color: brandColor }}>{item.label}</h4>
                <p 
                  contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(item), 'value', e.currentTarget.innerText)}
                  className="font-playfair font-bold text-white text-base"
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ComparisonVariant10(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [];
  const normalItems = items.filter(it => !it.highlight);
  const highlightItems = items.filter(it => it.highlight);
  
  const mercadoLabel = normalItems[0]?.label || 'Mercado';
  const brandLabel = highlightItems[0]?.label || brandHandle || 'Alice Mode';

  return (
    <div className="w-full h-full bg-[#080808] flex flex-col p-10 pb-10 relative items-center text-center rounded-slide">
      <div className="absolute top-0 left-0 w-full p-10 z-50 text-left">
        <SlideHeader data={props.data} slideIndex={props.index} onActionStart={props.onActionStart} selectedElement={props.selectedElement} onSelectElement={props.onSelectElement} index={(props.index || 0) + 1} total={props.slideCount} brandHandle={props.brandHandle} showBrandHandle={props.showBrandHandle} brandColor={props.brandColor} isVerified={props.isVerified} showSlideCounter={props.showSlideCounter} slideCounterPosition={props.slideCounterPosition} />
      </div>
      
      <ComparisonTitle 
        data={data} index={index} scale={sTitle} 
        onActionStart={onActionStart} onTextChange={onTextChange} 
        selectedElement={selectedElement} onSelectElement={onSelectElement}
        wrapperClasses="mb-10 shrink-0 mt-8"
      />

      <div className="w-64 h-12 bg-[#050505] rounded-full border border-white/10 flex items-center p-1 mb-8 shadow-inner shrink-0">
        <div contentEditable suppressContentEditableWarning className="flex-1 text-[10px] font-outfit font-bold uppercase tracking-widest text-zinc-600 px-2 leading-tight">{mercadoLabel}</div>
        <div contentEditable suppressContentEditableWarning className="flex-1 h-full rounded-full flex items-center justify-center text-[10px] font-outfit font-bold uppercase tracking-widest text-white shadow-md px-2 leading-tight" style={{ backgroundColor: brandColor }}>{brandLabel}</div>
      </div>
      
      <div className="w-full flex-1 bg-surface-input/30 border border-white/10 rounded-3xl p-8 pb-12 flex flex-col justify-start gap-4">
        {highlightItems.map((item, i) => (
          <div key={i} className="flex items-center gap-4 text-left">
            <CheckCircle2 className="w-6 h-6 shrink-0" style={{ color: brandColor }} />
            <span 
              contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(item), 'value', e.currentTarget.innerText)}
              className="font-playfair font-bold text-white text-lg"
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
      <SlideFooterPlaceholder />
    </div>
  );
}

export function ComparisonVariant11(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [];
  
  let leftItems = items.filter(it => !it.highlight);
  let rightItems = items.filter(it => it.highlight);
  while (leftItems.length < 3) leftItems.push({ label: 'Categoria', value: 'Falha Comum' });
  while (rightItems.length < 3) rightItems.push({ label: 'Categoria', value: 'Solução', highlight: true });
  leftItems = leftItems.slice(0, 3);
  rightItems = rightItems.slice(0, 3);
  const rowCount = 3;

  return (
    <div className="w-full h-full bg-[#E5E5E5] flex flex-col p-10 pb-10 relative text-black rounded-slide">
      <div className="absolute top-0 left-0 w-full p-10 z-50">
        <SlideHeader data={props.data} slideIndex={props.index} onActionStart={props.onActionStart} selectedElement={props.selectedElement} onSelectElement={props.onSelectElement} index={(props.index || 0) + 1} total={props.slideCount} brandHandle={props.brandHandle} showBrandHandle={props.showBrandHandle} brandColor={props.brandColor} isVerified={props.isVerified} showSlideCounter={props.showSlideCounter} slideCounterPosition={props.slideCounterPosition} />
      </div>
      
      <ComparisonTitle 
        data={data} index={index} scale={sTitle} 
        onActionStart={onActionStart} onTextChange={onTextChange} 
        selectedElement={selectedElement} onSelectElement={onSelectElement}
        wrapperClasses="mb-12 shrink-0 mt-4 z-10" align="text-left" color="text-black"
      />

      <div className="flex-1 flex flex-col justify-center space-y-4 pt-2 pb-6 overflow-visible">
        {Array.from({ length: rowCount }).map((_, i) => {
          const left = leftItems[i];
          const right = rightItems[i];
          return (
            <div key={i} className="relative w-full border-b border-black/10 pb-4 pt-4 flex flex-col flex-shrink-0 min-h-[4.5rem] justify-center">
              {left && (
                <div className="w-full relative z-0">
                  <span contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(left) !== -1 ? items.indexOf(left) : items.length, 'value', e.currentTarget.innerText)} className="font-outfit font-bold text-black/30 text-xl uppercase tracking-wider line-through decoration-red-500 decoration-4 block w-[70%]">
                    {left.value}
                  </span>
                </div>
              )}
              {right && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-2/3 flex justify-end pointer-events-auto">
                  <span contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(right) !== -1 ? items.indexOf(right) : items.length, 'value', e.currentTarget.innerText)} className="font-playfair italic font-bold text-2xl transform -rotate-2 text-right drop-shadow-sm pr-2" style={{ color: brandColor }}>
                    {right.value}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <SlideFooterPlaceholder />
    </div>
  );
}

// ==========================================
// EXPORTS & METADATA
// ==========================================

export const COMPARISON_VARIANT_COMPONENTS = {
  1: ComparisonVariant1,
  2: ComparisonVariant2,
  3: ComparisonVariant3,
  4: ComparisonVariant4,
  5: ComparisonVariant5,
  6: ComparisonVariant6,
  7: ComparisonVariant7,
  8: ComparisonVariant8,
  9: ComparisonVariant9,
  10: ComparisonVariant10,
  11: ComparisonVariant11,
  13: ComparisonVariant13,
  14: ComparisonVariant14,
  15: ComparisonVariant15,
  16: ComparisonVariant16,
  17: ComparisonVariant17,
  18: ComparisonVariant18,
  19: ComparisonVariant19,
  20: ComparisonVariant20,
  21: ComparisonVariant21,
  22: ComparisonVariant22,
  23: ComparisonVariant23,
  24: ComparisonVariant24,
};

export const COMPARISON_VARIANT_META = [
  { id: 0, nome: 'Original', badge: 'Padrão' },
  { id: 1, nome: 'Elegante', badge: null },
  { id: 2, nome: 'Split View', badge: null },
  { id: 3, nome: 'Tabela', badge: null },
  { id: 4, nome: 'Grid Mode', badge: null },
  { id: 5, nome: 'Cartões', badge: null },
  { id: 6, nome: 'Strike Bold', badge: null },
  { id: 7, nome: 'Specs', badge: 'PRO' },
  { id: 8, nome: 'Pop Out', badge: null },
  { id: 9, nome: 'Diagonal', badge: null },
  { id: 10, nome: 'Toggle', badge: null },
  { id: 11, nome: 'Correção', badge: 'PRO' },
  { id: 13, nome: 'VS Central', badge: 'NEW' },
  { id: 14, nome: 'VS Stack', badge: 'NEW' },
  { id: 15, nome: 'Check List', badge: 'NEW' },
  { id: 16, nome: 'Photo Split', badge: 'NEW' },
  { id: 17, nome: 'Slanted Lux', badge: 'NEW' },
  { id: 18, nome: 'Glass Glow', badge: 'NEW' },
  { id: 19, nome: 'Minimal VS', badge: 'NEW' },
  { id: 20, nome: 'Dark Split', badge: 'NEW' },
  { id: 21, nome: 'Dark Box', badge: 'NEW' },
  { id: 22, nome: 'Split Img', badge: 'NEW' },
  { id: 23, nome: 'Giant Check', badge: 'NEW' },
  { id: 24, nome: 'Min Accent', badge: 'NEW' },
];


