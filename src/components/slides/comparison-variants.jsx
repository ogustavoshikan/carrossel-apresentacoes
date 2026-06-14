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

function TextWrapper({ 
  field, 
  index, 
  onTextChange, 
  as: Component = 'div', 
  className, 
  style, 
  children, 
  // Destructure and ignore these to prevent passing them to the DOM
  data,
  onActionStart,
  selectedElement,
  onSelectElement,
  ...props 
}) {
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

function sanitizeUnsplashUrl(url) {
  if (!url || typeof url !== 'string' || !url.includes('unsplash.com')) return url;
  // Se a URL contém 'q=' mas não tem '?', e tem o ID do Unsplash, insere o '?' antes do 'q='
  if (url.includes('q=') && !url.includes('?')) {
    return url.replace('q=', '?q=');
  }
  return url;
}

function ImageBg({ data, className = '', style = {}, children }) {
  const imageUrl = sanitizeUnsplashUrl(data.imageUrl);
  if (imageUrl) {
    return (
      <div
        className={`bg-cover ${className}`}
        style={{
          backgroundImage: `url(${imageUrl})`,
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
          className={`font-text font-black ${color} tracking-tighter outline-none ${align} ${className}`}
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
        <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={props.slideCount} brandHandle={props.brandHandle} showBrandHandle={props.showBrandHandle} brandColor={props.brandColor} isVerified={props.isVerified} showSlideCounter={props.showSlideCounter} slideCounterPosition={props.slideCounterPosition} brandAvatar={props.brandAvatar} hideDot={true} counterBg="#EDEDED" handleColor="#1a1a1a" counterColor="#1a1a1a" brandLogo={props.brandLogo} showBrandLogo={props.showBrandLogo} />
        <SmartEl {...sp} field="titulo">
          <TextWrapper {...sp} as="h2" field="titulo" className="font-black text-[#1a1a1a] leading-tight tracking-tighter uppercase mt-2 mb-2 translate-y-[6px]" style={{ fontFamily: titleFont, fontSize: `${28 * sTitle}px` }}>
            {data.titulo || 'TÍTULO DA COMPARAÇÃO'}
          </TextWrapper>
        </SmartEl>
      </div>
      <div className="flex-1 flex w-full relative z-0 items-stretch">
        <div className="flex-1 p-6 pt-10 text-[#1A1A1A] flex flex-col items-center justify-start overflow-hidden" style={{ backgroundColor: '#EBE9E1' }}>
          <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mb-6 shrink-0 mx-auto">
            <X className="w-4 h-4" />
          </div>
          <SmartEl {...sp} field="tag" className="w-full flex-1 min-h-0">
            <TextWrapper {...sp} as="p" field="tag" className="leading-relaxed font-medium text-center whitespace-pre-wrap px-4" style={{ fontFamily: textFont, fontSize: `${18 * sText}px`, color: '#1A1A1A' }}>
              {data.tag || (data.items?.[0]?.value && data.items?.[0]?.value !== 'Qualidade comum' ? data.items[0].value : 'O COMUM\nUsa achocolatado cheio de açúcar e gordura vegetal hidrogenada.')}
            </TextWrapper>
          </SmartEl>
        </div>
        
        <div className="flex-1 p-6 pt-10 text-white flex flex-col items-center justify-start overflow-hidden" style={{ backgroundColor: gradientColor1 }}>
          <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center mb-6 shrink-0 mx-auto">
            <Check className="w-4 h-4" />
          </div>
          <SmartEl {...sp} field="texto_apoio" className="w-full flex-1 min-h-0">
            <TextWrapper {...sp} as="p" field="texto_apoio" className="leading-relaxed font-medium text-center whitespace-pre-wrap px-4" style={{ fontFamily: textFont, fontSize: `${18 * sText}px` }}>
              {data.texto_apoio || (data.items?.[1]?.value && data.items?.[1]?.value !== 'Excelência garantida' ? data.items[1].value : 'O PREMIUM\nUsa cacau 100% belga e manteiga de verdade, derretendo na boca.')}
            </TextWrapper>
          </SmartEl>
        </div>

        {/* Badge VS Centralizado de forma robusta */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <SmartEl {...sp} field="badge_text" className="pointer-events-auto">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl border-4" style={{ borderColor: brandColor }}>
              <TextWrapper {...sp} as="div" field="badge_text" className="font-black text-sm uppercase tracking-tighter text-[#1A1A1A]">
                {data.badge_text || 'VS'}
              </TextWrapper>
            </div>
          </SmartEl>
        </div>
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
  const sTitle = titleScale / 100;
  const gradientColor1 = brandColor;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden relative rounded-slide">
      <div className="absolute top-0 left-0 w-full p-10 z-50">
        <SlideHeader data={props.data} slideIndex={props.index} onActionStart={props.onActionStart} selectedElement={props.selectedElement} onSelectElement={props.onSelectElement} index={(props.index || 0) + 1} total={props.slideCount} brandHandle={props.brandHandle} showBrandHandle={props.showBrandHandle} brandColor={props.brandColor} isVerified={props.isVerified} showSlideCounter={props.showSlideCounter} slideCounterPosition={props.slideCounterPosition} brandAvatar={props.brandAvatar} hideDot={true} counterBg="#EDEDED" handleColor="#1a1a1a" counterColor="#1a1a1a" brandLogo={props.brandLogo} showBrandLogo={props.showBrandLogo} />
      </div>
      <div className="h-1/2 w-full p-8 flex flex-col justify-center text-center pb-12" style={{ backgroundColor: '#ffffff' }}>
        <div className="flex items-center justify-center gap-2 mb-3 mt-4">
          <X className="w-4 h-4 text-red-500" />
          <SmartEl {...sp} field="badge_text">
            <TextWrapper {...sp} as="span" field="badge_text" className="text-zinc-500 font-bold text-[15px] tracking-widest uppercase" style={{ display: 'inline-block', transform: 'translateY(-2px)' }}>
              {data.badge_text || 'NÃO FAÇA ASSIM'}
            </TextWrapper>
          </SmartEl>
        </div>
        <SmartEl {...sp} field="tag">
          <TextWrapper {...sp} as="p" field="tag" className="text-black leading-snug font-medium whitespace-pre-wrap px-10" style={{ fontFamily: textFont, fontSize: `${19 * sText}px` }}>
            {data.tag || (data.items?.[0]?.value && data.items?.[0]?.value !== 'Qualidade comum' ? data.items[0].value : 'EXPECTATIVA\nBolo perfeitamente reto, com andares alinhados e firmes.')}
          </TextWrapper>
        </SmartEl>
      </div>
      <div className="h-1/2 w-full p-8 flex flex-col justify-center text-center pt-12" style={{ backgroundColor: gradientColor1 }}>
        <div className="flex items-center justify-center gap-2 mb-3">
          <Check className="w-4 h-4 text-white" />
          <SmartEl {...sp} field="cta_text">
            <TextWrapper {...sp} as="span" field="cta_text" className="text-white/70 font-bold text-[15px] tracking-widest uppercase" style={{ display: 'inline-block', transform: 'translateY(-2px)' }}>
              {data.cta_text || 'FAÇA ASSIM'}
            </TextWrapper>
          </SmartEl>
        </div>
        <SmartEl {...sp} field="texto_apoio">
          <TextWrapper {...sp} as="p" field="texto_apoio" className="text-white leading-snug font-medium whitespace-pre-wrap px-10" style={{ fontFamily: textFont, fontSize: `${19 * sText}px` }}>
            {data.texto_apoio || (data.items?.[1]?.value && data.items?.[1]?.value !== 'Excelência garantida' ? data.items[1].value : 'REALIDADE\nBolo torto e instável se não usar a estrutura interna correta.')}
          </TextWrapper>
        </SmartEl>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-1.5 rounded-full z-20 border-4 flex items-center justify-center shadow-xl" style={{ borderColor: brandColor }}>
        <SmartEl {...sp} field="titulo">
          <TextWrapper {...sp} as="h2" field="titulo" className="font-black text-[#1A1A1A] leading-none text-center tracking-tighter uppercase whitespace-pre-wrap" style={{ fontFamily: titleFont, fontSize: `${24 * sTitle}px` }}>
            {data.titulo || 'EXPECTATIVA VS\nREALIDADE'}
          </TextWrapper>
        </SmartEl>
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
        <SlideHeader data={props.data} slideIndex={props.index} onActionStart={props.onActionStart} selectedElement={props.selectedElement} onSelectElement={props.onSelectElement} index={(props.index || 0) + 1} total={props.slideCount} brandHandle={props.brandHandle} showBrandHandle={props.showBrandHandle} brandColor={props.brandColor} isVerified={props.isVerified} showSlideCounter={props.showSlideCounter} slideCounterPosition={props.slideCounterPosition} brandAvatar={props.brandAvatar} hideDot={true} brandLogo={props.brandLogo} showBrandLogo={props.showBrandLogo} />
      </div>
      <div className="absolute top-24 left-0 w-full z-30 px-6 flex justify-center">
        <SmartEl {...sp} field="titulo" className="text-center bg-white/90 backdrop-blur py-3 px-6 rounded-full shadow-lg border border-white/50 inline-block mx-auto max-w-[90%] relative">
          <TextWrapper {...sp} as="h2" field="titulo" className="font-black text-[#1a1a1a] leading-none uppercase tracking-tighter" style={{ fontFamily: titleFont, fontSize: `${26 * sText}px` }}>
            {data.titulo || 'TÍTULO DA COMPARAÇÃO'}
          </TextWrapper>
        </SmartEl>
      </div>
      <div className="flex w-full h-full">
        <div className="w-1/2 h-full relative flex items-end p-5 pb-12 overflow-hidden bg-zinc-300">
          <div className="absolute inset-0 bg-cover bg-left blur-[8px] grayscale-[50%] opacity-70 scale-110" style={{ backgroundImage: `url(${imgUrl})` }} />
          <div className="absolute inset-0 bg-black/40" />
          <SmartEl {...sp} field="tag" className="z-10 w-full">
            <TextWrapper {...sp} as="p" field="tag" className="text-white/80 leading-snug font-medium text-center whitespace-pre-wrap drop-shadow-md" style={{ fontFamily: textFont, fontSize: `${18 * sText}px` }}>
              {data.tag || (data.items?.[0]?.value) || 'ESTADO ATUAL OU PROBLEMA COMUM'}
            </TextWrapper>
          </SmartEl>
        </div>
        <div className="w-1/2 h-full relative flex items-end p-5 pb-12 overflow-hidden bg-zinc-800 shadow-[-20px_0_40px_rgba(0,0,0,0.5)] z-10 border-l-4 border-white">
          <div className="absolute inset-0 bg-cover bg-right" style={{ backgroundImage: `url(${imgUrl})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <SmartEl {...sp} field="texto_apoio" className="z-10 w-full">
            <TextWrapper {...sp} as="p" field="texto_apoio" className="text-white font-bold leading-snug text-center whitespace-pre-wrap drop-shadow-xl" style={{ fontFamily: textFont, fontSize: `${18 * sText}px` }}>
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
    <div className="w-full h-full flex flex-col justify-center items-center relative rounded-slide" style={{ backgroundColor: bgBase }}>
      <div className="absolute top-0 left-0 w-full p-10 z-50">
        <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={props.slideCount} brandHandle={props.brandHandle} showBrandHandle={props.showBrandHandle} brandColor={props.brandColor} isVerified={props.isVerified} showSlideCounter={props.showSlideCounter} slideCounterPosition={props.slideCounterPosition} brandAvatar={props.brandAvatar} hideDot={true} counterBg="#EDEDED" handleColor="#1a1a1a" counterColor="#1a1a1a" brandLogo={props.brandLogo} showBrandLogo={props.showBrandLogo} />
      </div>
      <SmartEl {...sp} field="titulo" className="absolute top-[41px] text-center w-full px-6">
        <TextWrapper {...sp} as="h2" field="titulo" className="font-black text-[#1a1a1a] leading-tight uppercase tracking-widest" style={{ fontFamily: titleFont, fontSize: `${29 * sTitle}px` }}>
          {data.titulo || 'TÍTULO DA COMPARAÇÃO'}
        </TextWrapper>
      </SmartEl>
      <div className="flex w-full h-[50%] mt-20">
        <div className="w-1/2 flex flex-col items-center justify-start p-4 text-center border-r border-zinc-300 min-h-0">
          <SmartEl {...sp} field="badge_text" className="mb-4 shrink-0">
            <TextWrapper {...sp} as="span" field="badge_text" className="font-black text-6xl text-zinc-300 opacity-50 uppercase">
              {data.badge_text || 'X'}
            </TextWrapper>
          </SmartEl>
          <SmartEl {...sp} field="tag">
            <TextWrapper {...sp} as="p" field="tag" className="text-zinc-600 font-medium leading-snug" style={{ fontFamily: textFont, fontSize: `${18 * sText}px` }}>
              {data.tag || (data.items?.[0]?.value) || 'ESTADO ATUAL OU PROBLEMA COMUM'}
            </TextWrapper>
          </SmartEl>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-start p-4 text-center min-h-0">
          <SmartEl {...sp} field="cta_text" className="mb-4 shrink-0 shadow-sm">
            <TextWrapper {...sp} as="span" field="cta_text" className="font-black text-6xl uppercase" style={{ color: gradientColor1 }}>
              {data.cta_text || '✓'}
            </TextWrapper>
          </SmartEl>
          <SmartEl {...sp} field="texto_apoio">
            <TextWrapper {...sp} as="p" field="texto_apoio" className="text-[#1a1a1a] font-bold leading-snug" style={{ fontFamily: textFont, fontSize: `${18 * sText}px` }}>
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
    <div className="w-full h-full flex flex-col bg-black text-white rounded-slide relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden rounded-slide">
        <div className="flex w-full h-full">
          <div className="w-1/2 h-full bg-white" />
          <div className="w-1/2 h-full" style={{ backgroundColor: gradientColor1 }} />
        </div>
      </div>
      <div className="p-10 shrink-0 relative z-10">
        <SlideHeader data={props.data} slideIndex={props.index} onActionStart={props.onActionStart} selectedElement={props.selectedElement} onSelectElement={props.onSelectElement} index={(props.index || 0) + 1} total={props.slideCount} brandHandle={props.brandHandle} showBrandHandle={props.showBrandHandle} brandColor={props.brandColor} isVerified={props.isVerified} showSlideCounter={props.showSlideCounter} slideCounterPosition={props.slideCounterPosition} brandAvatar={props.brandAvatar} hideDot={true} brandLogo={props.brandLogo} showBrandLogo={props.showBrandLogo} />
        <SmartEl {...sp} field="titulo">
          <TextWrapper {...sp} as="h2" field="titulo" className="font-black leading-tight tracking-tighter uppercase mt-2 mb-2 text-center translate-y-[20px]" style={{ fontFamily: titleFont, fontSize: `${28 * sTitle}px`, color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            {data.titulo || 'TÍTULO DA COMPARAÇÃO'}
          </TextWrapper>
        </SmartEl>
      </div>
      <div className="flex-1 flex w-full relative z-10">
        <div className="w-1/2 h-full p-6 pt-10 flex flex-col items-center">
          <X className="w-8 h-8 text-[#1A1A1A] mb-6 shrink-0" />
          <SmartEl {...sp} field="tag" className="flex-1 w-full">
            <TextWrapper {...sp} as="p" field="tag" className="leading-relaxed font-medium text-center whitespace-pre-wrap text-[#1A1A1A]" style={{ fontFamily: textFont, fontSize: `${13 * sText}px` }}>
              {data.tag || (data.items?.[0]?.value) || 'ESTADO ATUAL OU PROBLEMA COMUM'}
            </TextWrapper>
          </SmartEl>
        </div>
        <div className="w-1/2 h-full p-6 pt-10 flex flex-col items-center">
          <Check className="w-8 h-8 text-white mb-6 shrink-0" />
          <SmartEl {...sp} field="texto_apoio" className="flex-1 w-full">
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
      <div className="h-1/2 w-full relative shrink-0 bg-[#ffffff]">
        <div className="absolute top-0 left-0 w-full p-10 z-50">
          <SlideHeader data={props.data} slideIndex={props.index} onActionStart={props.onActionStart} selectedElement={props.selectedElement} onSelectElement={props.onSelectElement} index={(props.index || 0) + 1} total={props.slideCount} brandHandle={props.brandHandle} showBrandHandle={props.showBrandHandle} brandColor={props.brandColor} isVerified={props.isVerified} showSlideCounter={props.showSlideCounter} slideCounterPosition={props.slideCounterPosition} brandAvatar={props.brandAvatar} hideDot={true} counterBg="#EDEDED" handleColor="#1a1a1a" counterColor="#1a1a1a" brandLogo={props.brandLogo} showBrandLogo={props.showBrandLogo} />
        </div>
        <div className="relative z-10 p-6 h-full flex flex-col justify-end text-center pb-10">
          <X className="w-6 h-6 text-white/30 mx-auto mb-2" />
          <SmartEl {...sp} field="tag">
            <TextWrapper {...sp} as="p" field="tag" className="text-[#1A1A1A] leading-snug font-medium whitespace-pre-wrap" style={{ fontFamily: textFont, fontSize: `${14 * sText}px` }}>
              {data.tag || (data.items?.[0]?.value) || 'ESTADO ATUAL OU PROBLEMA COMUM'}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>
      <div className="h-1/2 w-full relative shrink-0" style={{ backgroundColor: brandColor }}>
        <div className="absolute inset-0 bg-cover bg-center mix-blend-multiply opacity-50" style={{ backgroundImage: `url(${imgUrl})`, backgroundPosition: `${data.imagePositionX ?? 50}% ${data.imagePosition ?? 50}%` }} />
        <div className="relative z-10 p-6 h-full flex flex-col justify-start text-center pt-10">
          <Check className="w-6 h-6 text-white mx-auto mb-2" />
          <SmartEl {...sp} field="texto_apoio">
            <TextWrapper {...sp} as="p" field="texto_apoio" className="text-white leading-snug font-bold whitespace-pre-wrap" style={{ fontFamily: textFont, fontSize: `${14 * sText}px` }}>
              {data.texto_apoio || (data.items?.[1]?.value) || 'SUA SOLUÇÃO OU ESTADO DESEJADO'}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#ffffff] px-6 py-3 rounded-full shadow-2xl z-20 border-4" style={{ borderColor: brandColor }}>
        <SmartEl {...sp} field="badge_text">
          <TextWrapper {...sp} as="h2" field="badge_text" className="font-black text-[#000000] leading-none text-center tracking-tighter uppercase" style={{ fontFamily: titleFont, fontSize: `${16 * sText}px` }}>
            {data.badge_text || 'VS'}
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
    <div className="w-full h-full flex flex-col justify-center items-center relative bg-black text-white rounded-slide">
      <div className="absolute top-0 left-0 w-full p-10 z-50">
        <SlideHeader data={props.data} slideIndex={props.index} onActionStart={props.onActionStart} selectedElement={props.selectedElement} onSelectElement={props.onSelectElement} index={(props.index || 0) + 1} total={props.slideCount} brandHandle={props.brandHandle} showBrandHandle={props.showBrandHandle} brandColor={props.brandColor} isVerified={props.isVerified} showSlideCounter={props.showSlideCounter} slideCounterPosition={props.slideCounterPosition} brandAvatar={props.brandAvatar} hideDot={true} brandLogo={props.brandLogo} showBrandLogo={props.showBrandLogo} />
      </div>
      <SmartEl {...sp} field="titulo" className="absolute top-[46px] text-center w-full px-6">
        <TextWrapper {...sp} as="h2" field="titulo" className="font-black leading-tight uppercase tracking-widest" style={{ fontFamily: titleFont, fontSize: `${22 * sTitle}px`, color: brandColor }}>
          {data.titulo || 'TÍTULO DA COMPARAÇÃO'}
        </TextWrapper>
      </SmartEl>
      <div className="flex w-full h-[50%] mt-20">
        <div className="w-1/2 flex flex-col items-center justify-start p-4 text-center border-r border-[#222] min-h-0">
          <SmartEl {...sp} field="badge_text" className="mb-4 shrink-0">
            <TextWrapper {...sp} as="span" field="badge_text" className="font-black text-6xl text-[#222] uppercase">
              {data.badge_text || 'X'}
            </TextWrapper>
          </SmartEl>
          <SmartEl {...sp} field="tag">
            <TextWrapper {...sp} as="p" field="tag" className="text-white/50 font-medium leading-snug whitespace-pre-wrap" style={{ fontFamily: textFont, fontSize: `${13 * sText}px` }}>
              {data.tag || (data.items?.[0]?.value) || 'ESTADO ATUAL OU PROBLEMA COMUM'}
            </TextWrapper>
          </SmartEl>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-start p-4 text-center min-h-0">
          <SmartEl {...sp} field="cta_text" className="mb-4 shrink-0 drop-shadow-lg">
            <TextWrapper {...sp} as="span" field="cta_text" className="font-black text-6xl uppercase" style={{ color: brandColor }}>
              {data.cta_text || '✓'}
            </TextWrapper>
          </SmartEl>
          <SmartEl {...sp} field="texto_apoio">
            <TextWrapper {...sp} as="p" field="texto_apoio" className="text-white font-bold leading-snug whitespace-pre-wrap" style={{ fontFamily: textFont, fontSize: `${13 * sText}px` }}>
              {data.texto_apoio || (data.items?.[1]?.value) || 'SUA SOLUÇÃO OU ESTADO DESEJADO'}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>
    </div>
  );
}



export function ComparisonVariant2(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const items = data.items || [];
  const normalItems = items.filter(it => !it.highlight).slice(0, 5);
  const highlightItems = items.filter(it => it.highlight).slice(0, 5);
  
  const mercadoLabel = normalItems[0]?.label || 'O COMUM';
  const brandLabel = highlightItems[0]?.label || 'O PREMIUM';

  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  return (
    <div className="w-full h-full flex flex-row relative rounded-slide items-stretch">
      <div className="flex-1 h-full p-8 pt-32 flex flex-col border-r border-black/20" style={{ backgroundColor: '#ffffff' }}>
        <h3 contentEditable suppressContentEditableWarning className="font-text font-black text-zinc-600 tracking-widest uppercase text-xs mb-8">{mercadoLabel}</h3>
        <div className="space-y-6 flex-1 overflow-hidden">
          {normalItems.map((item, i) => (
            <div key={i} className="pb-4 border-b border-black/10 last:border-0">
              <span 
                contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(item) !== -1 ? items.indexOf(item) : items.length, 'value', e.currentTarget.innerText)}
                className="block font-title text-[#000000] text-lg leading-tight"
                style={{fontFamily: textFont }}
              >
                {item.value || 'Qualidade comum'}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 h-full p-8 pt-32 flex flex-col" style={{ backgroundColor: brandColor }}>
        <h3 contentEditable suppressContentEditableWarning className="font-title font-black text-black/50 tracking-widest uppercase text-xs mb-8 line-clamp-1">{brandLabel}</h3>
        <div className="space-y-6 flex-1 overflow-hidden">
          {highlightItems.map((item, i) => (
            <div key={i} className="pb-4 border-b border-black/10 last:border-0">
              <span 
                contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(item) !== -1 ? items.indexOf(item) : items.length, 'value', e.currentTarget.innerText)}
                className="block font-tag font-bold text-white text-lg leading-tight drop-shadow-md"
                style={{fontFamily: textFont }}
              >
                {item.value || 'Excelência garantida'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Badge VS Centralizado de forma robusta */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <SmartEl {...sp} field="badge_text" className="pointer-events-auto">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl border-4" style={{ borderColor: brandColor }}>
            <TextWrapper {...sp} as="div" field="badge_text" className="font-black text-[10px] uppercase text-[#1A1A1A]">
              {data.badge_text || 'VS'}
            </TextWrapper>
          </div>
        </SmartEl>
      </div>

      <div className="absolute top-0 left-0 w-full p-8 z-50">
        <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={props.slideCount} brandHandle={props.brandHandle} showBrandHandle={props.showBrandHandle} brandColor={props.brandColor} isVerified={props.isVerified} showSlideCounter={props.showSlideCounter} slideCounterPosition={props.slideCounterPosition} brandAvatar={props.brandAvatar} hideDot={true} brandLogo={props.brandLogo} showBrandLogo={props.showBrandLogo} />
      </div>
    </div>
  );
}


export function ComparisonVariant5(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const items = data.items || [];
  const normalItems = items.filter(it => !it.highlight);
  const highlightItems = items.filter(it => it.highlight);

  const mercadoLabel = normalItems[0]?.label || 'Mercado';
  const brandLabel = highlightItems[0]?.label || brandHandle || 'Carrossel Standard';

  return (
    <div className="w-full h-full bg-[#E5E5E5] flex flex-col p-10 pb-10 relative text-black rounded-slide">
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={slideCount} brandHandle={brandHandle} showBrandHandle={showBrandHandle} brandColor="#000000" isVerified={isVerified} showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition} brandAvatar={props.brandAvatar} hideDot={true} brandLogo={props.brandLogo} showBrandLogo={props.showBrandLogo} />
      
      <div className="flex-1 flex flex-col pt-20 pb-12 relative">
        <ComparisonTitle 
          data={data} index={index} scale={sTitle} 
          onActionStart={onActionStart} onTextChange={onTextChange} 
          selectedElement={selectedElement} onSelectElement={onSelectElement}
          wrapperClasses="mb-10 text-center shrink-0" color="text-black"
        />

        <div className="relative flex-1">
          <div className="absolute top-0 left-4 right-12 bottom-20 bg-white border border-black/10 rounded-3xl p-8 shadow-md transform -rotate-3 z-0 blur-[1px] flex flex-col gap-4 opacity-50 overflow-hidden">
            <h4 contentEditable suppressContentEditableWarning className="font-title font-black text-xs tracking-widest uppercase text-zinc-400">{mercadoLabel}</h4>
            {normalItems.map((item, i) => (
              <span key={i} contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(item), 'value', e.currentTarget.innerText)} className="font-tag italic text-zinc-500 text-sm border-b border-black/5 pb-2">{item.value}</span>
            ))}
          </div>
          <div className="absolute top-20 left-12 right-4 bottom-0 bg-black rounded-3xl p-8 shadow-2xl z-10 flex flex-col gap-4 transform rotate-2 overflow-hidden">
            <h4 contentEditable suppressContentEditableWarning className="font-title font-black text-xs tracking-widest uppercase text-white" style={{fontFamily: tagFont,  color: brandColor }}>{brandLabel}</h4>
            {highlightItems.map((item, i) => (
              <span key={i} contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(item), 'value', e.currentTarget.innerText)} className="font-title font-bold text-white text-lg border-b border-white/10 pb-4">{item.value}</span>
            ))}
          </div>
        </div>
      </div>
      <SlideFooterPlaceholder />
    </div>
  );
}

export function ComparisonVariant6(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const items = data.items || [];
  
  const leftItems = items.filter(it => !it.highlight);
  const rightItems = items.filter(it => it.highlight);
  const rowCount = Math.max(leftItems.length, rightItems.length);

  return (
    <div className="w-full h-full bg-white flex flex-col p-10 pb-10 relative overflow-hidden rounded-slide" style={{ borderBottom: `10px solid ${brandColor}` }}>
      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={props.slideCount} brandHandle={props.brandHandle} showBrandHandle={props.showBrandHandle} brandColor={props.brandColor} isVerified={props.isVerified} showSlideCounter={props.showSlideCounter} slideCounterPosition={props.slideCounterPosition} brandAvatar={props.brandAvatar} hideDot={true} counterBg="#EDEDED" handleColor="#1a1a1a" counterColor="#1a1a1a" brandLogo={props.brandLogo} showBrandLogo={props.showBrandLogo} />
      
      <div className="flex-1 flex flex-col justify-start pt-16 pb-8">
        <div className="mb-10 shrink-0">
          <SmartElement slideIndex={index} field="titulo" position={data.positions?.titulo || {x:0, y:0, scale:1}} onActionStart={onActionStart} isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'} onSelectElement={onSelectElement}>
            <h2 
              contentEditable suppressContentEditableWarning onBlur={(e) => onTextChange && onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-title font-black text-[#1A1A1A] tracking-tighter outline-none border-l-4 pl-4"
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
                <span className="font-title font-black text-[10px] tracking-widest uppercase text-zinc-600">
                  <span contentEditable suppressContentEditableWarning onBlur={(e) => left && onItemChange && onItemChange(index, items.indexOf(left) !== -1 ? items.indexOf(left) : items.length, 'label', e.currentTarget.innerText)}>{left?.label || 'Comum'}</span> vs <span contentEditable suppressContentEditableWarning onBlur={(e) => right && onItemChange && onItemChange(index, items.indexOf(right) !== -1 ? items.indexOf(right) : items.length, 'label', e.currentTarget.innerText)} style={{fontFamily: titleFont,  color: brandColor }}>{right?.label || 'Premium'}</span>
                </span>
                {left && (
                  <span contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(left) !== -1 ? items.indexOf(left) : items.length, 'value', e.currentTarget.innerText)} className="font-text text-zinc-500 text-base line-through decoration-zinc-700 decoration-2">{left.value}</span>
                )}
                {right && (
                  <span contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(right) !== -1 ? items.indexOf(right) : items.length, 'value', e.currentTarget.innerText)} className="font-text font-bold text-white text-xl" style={{fontFamily: textFont,  color: brandColor }}>{right.value}</span>
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

export function ComparisonVariant9(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const items = data.items || [];
  const normalItems = items.filter(it => !it.highlight);
  const highlightItems = items.filter(it => it.highlight);
  
  return (
    <div className="w-full h-full flex relative rounded-slide" style={{ backgroundColor: brandColor }}>
      <div className="absolute top-0 left-0 w-full p-10 z-50">
        <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement} index={index + 1} total={props.slideCount} brandHandle={props.brandHandle} showBrandHandle={props.showBrandHandle} brandColor={props.brandColor} isVerified={props.isVerified} showSlideCounter={props.showSlideCounter} slideCounterPosition={props.slideCounterPosition} brandAvatar={props.brandAvatar} hideDot={true} brandLogo={props.brandLogo} showBrandLogo={props.showBrandLogo} />
      </div>
      <div className="absolute inset-0 bg-white clip-diagonal z-0" style={{ clipPath: 'polygon(0px 0px, 45% 0px, 55% 100%, 0px 100%)' }}></div>
      
      <div className="absolute inset-0 z-10 flex flex-col p-10 pt-20 pointer-events-none">
        <ComparisonTitle 
          data={data} index={index} scale={sTitle} 
          onActionStart={onActionStart} onTextChange={onTextChange} 
          selectedElement={selectedElement} onSelectElement={onSelectElement}
          wrapperClasses="mb-10 text-center pointer-events-auto"
          color="text-[#1A1A1A]"
        />

        <div className="flex-1 flex pointer-events-auto">
          <div className="w-1/2 pr-6 flex flex-col gap-5 items-end text-right pt-16">
            {normalItems.map((item, i) => (
              <div key={i} className="w-full">
                <h4 contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(item), 'label', e.currentTarget.innerText)} className="font-title font-black text-[9px] uppercase tracking-widest text-zinc-600 mb-1">{item.label}</h4>
                <p 
                  contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(item), 'value', e.currentTarget.innerText)}
                  className="font-text text-zinc-400 text-sm"
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
          <div className="w-1/2 pl-6 flex flex-col gap-6 items-start text-left pt-2 pb-4">
            {highlightItems.map((item, i) => (
              <div key={i} className="w-full drop-shadow-xl z-20">
                <h4 contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(item), 'label', e.currentTarget.innerText)} className="font-title font-black text-[9px] uppercase tracking-widest mb-1" style={{fontFamily: textFont,  color: brandColor }}>{item.label}</h4>
                <p 
                  contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(item), 'value', e.currentTarget.innerText)}
                  className="font-text font-bold text-white text-base"
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

export function ComparisonVariant11(props) {
  const { data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, titleScale, onActionStart, onTextChange, onItemChange, selectedElement, onSelectElement, showSlideCounter, slideCounterPosition , titleFont, textFont, tagFont} = props;
  const sTitle = titleScale / 100;
  const items = data.items || [];
  
  let leftItems = items.filter(it => !it.highlight);
  let rightItems = items.filter(it => it.highlight);
  while (leftItems.length < 3) leftItems.push({ label: 'Categoria', value: 'Falha' });
  while (rightItems.length < 3) rightItems.push({ label: 'Categoria', value: 'Solução', highlight: true });
  leftItems = leftItems.slice(0, 3);
  rightItems = rightItems.slice(0, 3);
  const rowCount = 3;

  return (
    <div className="w-full h-full bg-[#E5E5E5] flex flex-col p-10 pb-10 relative text-black rounded-slide">
      <div className="absolute top-0 left-0 w-full p-10 z-50">
        <SlideHeader data={props.data} slideIndex={props.index} onActionStart={props.onActionStart} selectedElement={props.selectedElement} onSelectElement={props.onSelectElement} index={(props.index || 0) + 1} total={props.slideCount} brandHandle={props.brandHandle} showBrandHandle={props.showBrandHandle} brandColor={props.brandColor} isVerified={props.isVerified} showSlideCounter={props.showSlideCounter} slideCounterPosition={props.slideCounterPosition} brandAvatar={props.brandAvatar} hideDot={true} counterBg="#EDEDED" brandLogo={props.brandLogo} showBrandLogo={props.showBrandLogo} />
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
                  <span contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(left) !== -1 ? items.indexOf(left) : items.length, 'value', e.currentTarget.innerText)} className="font-text font-bold text-black/30 text-xl uppercase tracking-wider line-through decoration-red-500 decoration-4 block w-[70%]">
                    {left.value}
                  </span>
                </div>
              )}
              {right && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-2/3 flex justify-end pointer-events-auto">
                  <span contentEditable suppressContentEditableWarning onBlur={(e) => onItemChange && onItemChange(index, items.indexOf(right) !== -1 ? items.indexOf(right) : items.length, 'value', e.currentTarget.innerText)} className="font-text italic font-bold text-2xl transform -rotate-2 text-right drop-shadow-sm pr-2" style={{fontFamily: textFont,  color: brandColor }}>
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

// ═══════════════════════════════════════════════════════════
// VARIANTE 25 — Split Monolith Centered
// Lado esquerdo liso, lado direito com background de imagem e mix-blend
// ═══════════════════════════════════════════════════════════
export function ComparisonVariant25(props) {
  const { data, index, brandColor, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const imgB = data.imageUrl2 || data.imageUrl;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  return (
    <div className="w-full h-full flex flex-row relative text-white bg-[#050505] overflow-hidden rounded-slide">
      <div className="absolute top-0 left-0 w-full p-10 z-50">
        <SlideHeader {...props} index={index + 1} total={props.slideCount} hideDot={true} />
      </div>

      <div className="w-1/2 h-full p-8 flex flex-col justify-center relative z-0 bg-[#ffffff]">
        <SmartEl {...sp} field="tag">
          <TextWrapper {...sp} as="span" field="tag" className="font-bold tracking-[0.2em] text-[10px] uppercase mb-4 block" style={{ fontFamily: textFont, color: '#050505' }}>
            {data.tag || 'O COMUM'}
          </TextWrapper>
        </SmartEl>
        <SmartEl {...sp} field="titulo_a">
          <TextWrapper {...sp} as="h3" field="titulo_a" className="font-black uppercase tracking-tighter mb-4 leading-[0.9] text-[#1A1A1A]" style={{ fontFamily: titleFont, fontSize: `${34 * sTitle}px` }}>
            {data.titulo_a || data.titulo || 'TÍTULO A'}
          </TextWrapper>
        </SmartEl>
        <SmartEl {...sp} field="texto_a">
          <TextWrapper {...sp} as="p" field="texto_a" className="font-medium leading-relaxed pr-6 text-[#1A1A1A]" style={{ fontFamily: textFont, fontSize: `${13 * sText}px` }}>
            {data.texto_a || (data.items?.[0]?.value) || 'Texto de apoio da primeira opção.'}
          </TextWrapper>
        </SmartEl>
      </div>

      <div className="w-1/2 h-full p-8 flex flex-col justify-center relative z-10 shadow-[-20px_0_40px_rgba(0,0,0,0.5)]" style={{ backgroundColor: brandColor }}>
        <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30" style={{ backgroundImage: `url(${imgB})`, backgroundPosition: `${data.imagePositionX2 ?? 50}% ${data.imagePosition2 ?? 50}%` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--brandColor)] via-[var(--brandColor)] to-transparent opacity-80" style={{ '--brandColor': brandColor }}></div>
        <div className="relative z-20">
          <SmartEl {...sp} field="cta_text">
            <TextWrapper {...sp} as="span" field="cta_text" className="font-bold tracking-[0.2em] text-[10px] text-white/70 uppercase mb-4 block drop-shadow-md" style={{ fontFamily: textFont }}>
              {data.cta_text || 'O PREMIUM'}
            </TextWrapper>
          </SmartEl>
          <SmartEl {...sp} field="titulo_b">
            <TextWrapper {...sp} as="h3" field="titulo_b" className="font-black uppercase tracking-tighter mb-4 leading-[0.9] text-white drop-shadow-xl" style={{ fontFamily: titleFont, fontSize: `${34 * sTitle}px` }}>
              {data.titulo_b || 'TÍTULO B'}
            </TextWrapper>
          </SmartEl>
          <SmartEl {...sp} field="texto_b">
            <TextWrapper {...sp} as="p" field="texto_b" className="text-white/90 font-medium leading-relaxed drop-shadow-md" style={{ fontFamily: textFont, fontSize: `${13 * sText}px` }}>
              {data.texto_b || (data.items?.[1]?.value) || 'Texto de apoio da segunda opção.'}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-[#050505] rounded-full w-14 h-14 flex items-center justify-center font-black text-sm z-30 shadow-2xl border-4" style={{ borderColor: brandColor }}>
        <SmartEl {...sp} field="badge_text">
          <TextWrapper {...sp} field="badge_text" style={{ fontFamily: titleFont }}>
            {data.badge_text || 'VS'}
          </TextWrapper>
        </SmartEl>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 26 — Split Monolith Cards
// Dois lados com cards de imagem no topo e textos na base
// ═══════════════════════════════════════════════════════════
export function ComparisonVariant26(props) {
  const { data, index, brandColor, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const imgA = data.imageUrl;
  const imgC = data.imageUrl2 || data.imageUrl;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  return (
    <div className="w-full h-full flex flex-row relative text-white bg-[#050505] overflow-hidden rounded-slide">
      <div className="absolute top-0 left-0 w-full p-10 z-50">
        <SlideHeader {...props} index={index + 1} total={props.slideCount} hideDot={true} />
      </div>

      <div className="w-1/2 h-full p-8 pb-12 flex flex-col justify-end relative z-0 bg-[#ffffff]">
        <div className="absolute top-20 left-4 right-4 h-40 rounded-[35px] overflow-hidden bg-zinc-900">
          <ImageBg data={data} className="w-full h-full" />
        </div>
        <div className="absolute top-[252px] left-0 w-full flex justify-center z-20">
          <SmartEl {...sp} field="tag">
            <TextWrapper {...sp} as="span" field="tag" className="font-bold tracking-[0.2em] text-[10px] uppercase" style={{ fontFamily: textFont, color: '#050505' }}>
              {data.tag || 'O COMUM'}
            </TextWrapper>
          </SmartEl>
        </div>
        <div className="mt-auto">
          <SmartEl {...sp} field="titulo_a">
            <TextWrapper {...sp} as="h3" field="titulo_a" className="font-black uppercase tracking-tighter mb-4 leading-[0.9] text-[#1A1A1A]" style={{ fontFamily: titleFont, fontSize: `${34 * sTitle}px` }}>
              {data.titulo_a || data.titulo || 'TÍTULO A'}
            </TextWrapper>
          </SmartEl>
          <SmartEl {...sp} field="texto_a">
            <TextWrapper {...sp} as="p" field="texto_a" className="font-medium leading-relaxed pr-6 text-[#1A1A1A]" style={{ fontFamily: textFont, fontSize: `${13 * sText}px` }}>
              {data.texto_a || (data.items?.[0]?.value) || 'Texto de apoio da primeira opção.'}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>

      <div className="w-1/2 h-full p-8 pb-12 flex flex-col justify-end relative z-10" style={{ backgroundColor: brandColor }}>
        <div className="absolute top-20 left-4 right-4 h-40 rounded-[35px] overflow-hidden z-20 bg-black" style={{ boxShadow: '0 25px 50px -12px rgba(255, 255, 255, 0.1)' }}>
          <ImageBg data={{ ...data, imageUrl: imgC, imagePosition: data.imagePosition2, imageScale: data.imageScale2 }} className="w-full h-full" />
        </div>
        <div className="absolute top-[252px] left-0 w-full flex justify-center z-20">
          <SmartEl {...sp} field="cta_text">
            <TextWrapper {...sp} as="span" field="cta_text" className="font-bold tracking-[0.2em] text-[10px] text-white uppercase drop-shadow-md" style={{ fontFamily: textFont }}>
              {data.cta_text || 'O PREMIUM'}
            </TextWrapper>
          </SmartEl>
        </div>
        <div className="relative z-20 mt-auto">
          <SmartEl {...sp} field="titulo_b">
            <TextWrapper {...sp} as="h3" field="titulo_b" className="font-black uppercase tracking-tighter mb-4 leading-[0.9] text-white drop-shadow-xl" style={{ fontFamily: titleFont, fontSize: `${34 * sTitle}px` }}>
              {data.titulo_b || 'TÍTULO B'}
            </TextWrapper>
          </SmartEl>
          <SmartEl {...sp} field="texto_b">
            <TextWrapper {...sp} as="p" field="texto_b" className="text-white/90 font-medium leading-relaxed drop-shadow-md" style={{ fontFamily: textFont, fontSize: `${13 * sText}px` }}>
              {data.texto_b || (data.items?.[1]?.value) || 'Texto de apoio da segunda opção.'}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 27 — Vanguard Split
// Divisão em cruz com imagens e textos alternados
// ═══════════════════════════════════════════════════════════
export function ComparisonVariant27(props) {
  const { data, index, brandColor, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const imgB = data.imageUrl2 || data.imageUrl;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  return (
    <div className="w-full h-full flex flex-col relative bg-[#050505] text-white overflow-hidden rounded-slide">
      <div className="absolute top-0 left-0 w-full p-10 z-50">
        <SlideHeader {...props} index={index + 1} total={props.slideCount} hideDot={true} counterBg="#EDEDED" handleColor="#1a1a1a" counterColor="#1a1a1a" />
      </div>

      <div className="h-1/2 w-full flex flex-row relative z-0">
        <div className="w-1/2 h-full relative overflow-hidden bg-zinc-900 flex items-center justify-center">
          <ImageBg data={data} className="w-full h-full" />
        </div>
        <div className="w-1/2 h-full p-8 pl-10 flex flex-col justify-center bg-[#ffffff]">
          <SmartEl {...sp} field="tag">
            <TextWrapper {...sp} as="span" field="tag" className="font-bold tracking-[0.2em] text-[10px] uppercase mb-2 block" style={{ fontFamily: textFont, color: '#050505' }}>
              {data.tag || 'O COMUM'}
            </TextWrapper>
          </SmartEl>
          <SmartEl {...sp} field="titulo_a">
            <TextWrapper {...sp} as="h3" field="titulo_a" className="font-black uppercase tracking-tighter mb-3 leading-[0.9] text-[#1A1A1A]" style={{ fontFamily: titleFont, fontSize: `${28 * sTitle}px` }}>
              {data.titulo_a || data.titulo || 'TÍTULO A'}
            </TextWrapper>
          </SmartEl>
          <SmartEl {...sp} field="texto_a">
            <TextWrapper {...sp} as="p" field="texto_a" className="font-medium leading-relaxed pr-2 text-[#1A1A1A]" style={{ fontFamily: textFont, fontSize: `${12 * sText}px` }}>
              {data.texto_a || (data.items?.[0]?.value) || 'Texto de apoio da primeira opção.'}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>

      <div className="h-1/2 w-full flex flex-row relative z-10" style={{ backgroundColor: brandColor }}>
        <div className="w-1/2 h-full p-8 pr-10 flex flex-col justify-center items-end text-right relative z-10">
          <SmartEl {...sp} field="cta_text">
            <TextWrapper {...sp} as="span" field="cta_text" className="font-bold tracking-[0.2em] text-[10px] text-white/80 uppercase mb-2 block" style={{ fontFamily: textFont }}>
              {data.cta_text || 'O PREMIUM'}
            </TextWrapper>
          </SmartEl>
          <SmartEl {...sp} field="titulo_b">
            <TextWrapper {...sp} as="h3" field="titulo_b" className="font-black uppercase tracking-tighter mb-3 leading-[0.9] text-white" style={{ fontFamily: titleFont, fontSize: `${28 * sTitle}px` }}>
              {data.titulo_b || 'TÍTULO B'}
            </TextWrapper>
          </SmartEl>
          <SmartEl {...sp} field="texto_b">
            <TextWrapper {...sp} as="p" field="texto_b" className="text-white/90 font-medium leading-relaxed pl-2" style={{ fontFamily: textFont, fontSize: `${12 * sText}px` }}>
              {data.texto_b || (data.items?.[1]?.value) || 'Texto de apoio da segunda opção.'}
            </TextWrapper>
          </SmartEl>
        </div>
        <div className="w-1/2 h-full relative overflow-hidden bg-black flex items-center justify-center">
          <ImageBg data={{ ...data, imageUrl: imgB, imagePosition: data.imagePosition2, imageScale: data.imageScale2 }} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 28 — Cinematic Duel
// Divisão vertical com imagens de fundo e cards em glassmorphism
// ═══════════════════════════════════════════════════════════
export function ComparisonVariant28(props) {
  const { data, index, brandColor, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const imgA = data.imageUrl;
  const imgB = data.imageUrl2 || data.imageUrl;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  return (
    <div className="w-full h-full flex flex-col relative bg-black overflow-hidden rounded-slide">
      <div className="absolute top-0 left-0 w-full p-10 z-50">
        <SlideHeader {...props} index={index + 1} total={props.slideCount} hideDot={true} />
      </div>

      <div className="w-full h-1/2 relative flex flex-col justify-end p-8 pb-10 overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 z-0">
          <ImageBg data={data} className="w-full h-full" />
        </div>
        <div className="relative z-10 w-[80%] bg-black/40 px-5 pt-2 pb-4 flex flex-col justify-center items-start text-left backdrop-blur-md rounded-2xl border border-white/10 -translate-x-2 translate-y-4">
          <SmartEl {...sp} field="tag">
            <TextWrapper {...sp} as="span" field="tag" className="font-bold tracking-[0.2em] text-[9px] text-white/80 uppercase mb-1 block" style={{ fontFamily: textFont }}>
              {data.tag || 'O COMUM'}
            </TextWrapper>
          </SmartEl>
          <SmartEl {...sp} field="titulo_a">
            <TextWrapper {...sp} as="h3" field="titulo_a" className="font-black uppercase tracking-tighter leading-[0.9] text-white" style={{ fontFamily: titleFont, fontSize: `${32 * sTitle}px` }}>
              {data.titulo_a || data.titulo || 'TÍTULO A'}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>

      <div className="w-full h-1/2 relative flex flex-col justify-end p-8 pb-10 overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 z-0">
          <ImageBg data={{ ...data, imageUrl: imgB, imagePosition: data.imagePosition2, imageScale: data.imageScale2 }} className="w-full h-full" />
        </div>
        <div className="relative z-10 w-[80%] ml-auto text-right flex flex-col items-end bg-black/40 p-4 backdrop-blur-md rounded-2xl border border-white/10 translate-x-2 translate-y-4">
          <SmartEl {...sp} field="cta_text">
            <TextWrapper {...sp} as="span" field="cta_text" className="font-bold tracking-[0.2em] text-[9px] text-white uppercase mb-2 block" style={{ fontFamily: textFont, color: brandColor }}>
              {data.cta_text || 'O PREMIUM'}
            </TextWrapper>
          </SmartEl>
          <SmartEl {...sp} field="titulo_b">
            <TextWrapper {...sp} as="h3" field="titulo_b" className="font-black uppercase tracking-tighter mb-2 leading-[0.9] text-white" style={{ fontFamily: titleFont, fontSize: `${32 * sTitle}px` }}>
              {data.titulo_b || 'TÍTULO B'}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 29 — Rect Rivalry
// Fundo claro com duas imagens quadradas lado a lado
// ═══════════════════════════════════════════════════════════
export function ComparisonVariant29(props) {
  const { data, index, brandColor, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const imgB = data.imageUrl2 || data.imageUrl;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  return (
    <div className="w-full h-full flex flex-col relative bg-[#FDFBF7] text-[#1a1a1a] overflow-hidden rounded-slide">
      <div className="absolute top-0 left-0 w-full p-10 z-50">
        <SlideHeader {...props} index={index + 1} total={props.slideCount} hideDot={true} counterBg="#EFECE6" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 mt-4 relative gap-4">

        {/* Linha das imagens */}
        <div className="w-full flex flex-row gap-4 relative">
          <div className="w-1/2 aspect-square rounded-2xl overflow-hidden shadow-sm bg-zinc-200">
            <ImageBg data={data} className="w-full h-full" />
          </div>
          <div className="w-1/2 aspect-square rounded-2xl overflow-hidden bg-zinc-100" style={{ boxShadow: `0 25px 50px -12px ${brandColor}26` }}>
            <ImageBg data={{ ...data, imageUrl: imgB, imagePosition: data.imagePosition2, imageScale: data.imageScale2 }} className="w-full h-full" />
          </div>
          {/* Badge VS */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white px-4 py-2 rounded-xl z-30 text-[10px] font-black shadow-lg border-[3px] border-[#ffffff]" style={{ fontFamily: titleFont, backgroundColor: brandColor }}>
            <SmartEl {...sp} field="badge_text">
              <TextWrapper {...sp} field="badge_text" className="uppercase">
                {data.badge_text || 'VS'}
              </TextWrapper>
            </SmartEl>
          </div>
        </div>

        {/* Linha dos textos */}
        <div className="w-full flex flex-row gap-4">
          <div className="w-1/2 text-center px-2">
            <SmartEl {...sp} field="tag">
              <TextWrapper {...sp} as="span" field="tag" className="font-bold tracking-[0.2em] text-[10px] text-zinc-400 uppercase mb-2 block" style={{ fontFamily: textFont }}>
                {data.tag || 'O COMUM'}
              </TextWrapper>
            </SmartEl>
            <SmartEl {...sp} field="titulo_a">
              <TextWrapper {...sp} as="h3" field="titulo_a" className="font-black uppercase tracking-tighter mb-2 leading-[0.9]" style={{ fontFamily: titleFont, fontSize: `${28 * sTitle}px` }}>
                {data.titulo_a || data.titulo || 'TÍTULO A'}
              </TextWrapper>
            </SmartEl>
            <SmartEl {...sp} field="texto_a">
              <TextWrapper {...sp} as="p" field="texto_a" className="text-zinc-500 font-medium leading-relaxed" style={{ fontFamily: textFont, fontSize: `${11 * sText}px` }}>
                {data.texto_a || (data.items?.[0]?.value) || 'Texto de apoio da primeira opção.'}
              </TextWrapper>
            </SmartEl>
          </div>
          <div className="w-1/2 text-center px-2">
            <SmartEl {...sp} field="cta_text">
              <TextWrapper {...sp} as="span" field="cta_text" className="font-bold tracking-[0.2em] text-[10px] uppercase mb-2 block" style={{ fontFamily: textFont, color: brandColor }}>
                {data.cta_text || 'O PREMIUM'}
              </TextWrapper>
            </SmartEl>
            <SmartEl {...sp} field="titulo_b">
              <TextWrapper {...sp} as="h3" field="titulo_b" className="font-black uppercase tracking-tighter mb-2 leading-[0.9]" style={{ fontFamily: titleFont, fontSize: `${28 * sTitle}px` }}>
                {data.titulo_b || 'TÍTULO B'}
              </TextWrapper>
            </SmartEl>
            <SmartEl {...sp} field="texto_b">
              <TextWrapper {...sp} as="p" field="texto_b" className="text-zinc-500 font-bold leading-relaxed" style={{ fontFamily: textFont, fontSize: `${11 * sText}px` }}>
                {data.texto_b || (data.items?.[1]?.value) || 'Texto de apoio da segunda opção.'}
              </TextWrapper>
            </SmartEl>
          </div>
        </div>

      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 30 — Pure Base
// Empilhamento vertical com imagens quadradas e textos laterais alternados
// ═══════════════════════════════════════════════════════════
export function ComparisonVariant30(props) {
  const { data, index, brandColor, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const imgB = data.imageUrl2 || data.imageUrl;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden rounded-slide bg-white">
      <div className="absolute top-0 left-0 w-full p-10 z-50">
        <SlideHeader {...props} index={index + 1} total={props.slideCount} hideDot={true} counterBg="#EDEDED" handleColor="#1a1a1a" counterColor="#1a1a1a" />
      </div>

      <div className="h-1/2 w-full bg-white flex items-center justify-center relative p-8 z-0">
        <div className="w-[50%] aspect-square rounded-[30px] overflow-hidden relative z-10 bg-zinc-100" style={{ boxShadow: `0 25px 50px -12px ${brandColor}26` }}>
          <ImageBg data={data} className="w-full h-full" />
        </div>
        <div className="flex-1 pl-8 flex flex-col justify-center text-left">
          <SmartEl {...sp} field="titulo_a">
            <TextWrapper {...sp} as="h3" field="titulo_a" className="font-black uppercase tracking-tighter mb-3 leading-[0.9] text-[#1a1a1a]" style={{ fontFamily: titleFont, fontSize: `${26 * sTitle}px` }}>
              {data.titulo_a || data.titulo || 'TÍTULO A'}
            </TextWrapper>
          </SmartEl>
          <SmartEl {...sp} field="texto_a">
            <TextWrapper {...sp} as="p" field="texto_a" className="text-zinc-600 font-medium leading-relaxed" style={{ fontFamily: textFont, fontSize: `${12 * sText}px` }}>
              {data.texto_a || (data.items?.[0]?.value) || 'Texto de apoio da primeira opção.'}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>

      <div className="h-1/2 w-full flex items-center justify-center relative p-8 z-10" style={{ backgroundColor: brandColor }}>
        <div className="flex-1 pr-8 flex flex-col justify-center text-right items-end">
          <SmartEl {...sp} field="titulo_b">
            <TextWrapper {...sp} as="h3" field="titulo_b" className="font-black uppercase tracking-tighter mb-3 leading-[0.9] text-white" style={{ fontFamily: titleFont, fontSize: `${26 * sTitle}px` }}>
              {data.titulo_b || 'TÍTULO B'}
            </TextWrapper>
          </SmartEl>
          <SmartEl {...sp} field="texto_b">
            <TextWrapper {...sp} as="p" field="texto_b" className="text-white/90 font-medium leading-relaxed" style={{ fontFamily: textFont, fontSize: `${12 * sText}px` }}>
              {data.texto_b || (data.items?.[1]?.value) || 'Texto de apoio da segunda opção.'}
            </TextWrapper>
          </SmartEl>
        </div>
        <div className="w-[50%] aspect-square rounded-[30px] overflow-hidden relative z-10 bg-black" style={{ boxShadow: '0 25px 50px -12px #ffffff14' }}>
          <ImageBg data={{ ...data, imageUrl: imgB, imagePosition: data.imagePosition2, imageScale: data.imageScale2 }} className="w-full h-full" />
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-[#ffffff] text-[#1A1A1A] rounded-full flex items-center justify-center font-black text-sm shadow-2xl border-[4px] z-30" style={{ borderColor: brandColor }}>
        <SmartEl {...sp} field="badge_text">
          <TextWrapper {...sp} field="badge_text" className="uppercase" style={{ fontFamily: titleFont }}>
            {data.badge_text || 'VS'}
          </TextWrapper>
        </SmartEl>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 31 — Clean Contrast
// Lado a lado com imagens quadradas grandes e fundo contrastante
// ═══════════════════════════════════════════════════════════
export function ComparisonVariant31(props) {
  const { data, index, brandColor, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const imgB = data.imageUrl2 || data.imageUrl;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  return (
    <div className="w-full h-full flex flex-row relative overflow-hidden rounded-slide bg-white">
      <div className="absolute top-0 left-0 w-full p-10 z-50">
        <SlideHeader {...props} index={index + 1} total={props.slideCount} hideDot={true} />
      </div>

      <div className="w-1/2 h-full flex flex-col items-center justify-center p-[30px] border-r border-zinc-200 relative z-0">
        <div className="w-full aspect-square rounded-[30px] overflow-hidden mb-8 bg-zinc-100" style={{ boxShadow: `0 25px 50px -12px ${brandColor}26` }}>
          <ImageBg data={data} className="w-full h-full" />
        </div>
        <div className="text-center w-full px-2">
          <SmartEl {...sp} field="titulo_a">
            <TextWrapper {...sp} as="h3" field="titulo_a" className="font-black uppercase tracking-tighter mb-3 leading-[0.9] text-[#1a1a1a]" style={{ fontFamily: titleFont, fontSize: `${24 * sTitle}px` }}>
              {data.titulo_a || data.titulo || 'TÍTULO A'}
            </TextWrapper>
          </SmartEl>
          <SmartEl {...sp} field="texto_a">
            <TextWrapper {...sp} as="p" field="texto_a" className="text-zinc-600 font-medium leading-relaxed" style={{ fontFamily: textFont, fontSize: `${12 * sText}px` }}>
              {data.texto_a || (data.items?.[0]?.value) || 'Texto de apoio da primeira opção.'}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>

      <div className="w-1/2 h-full flex flex-col items-center justify-center p-[30px] -translate-y-[3px] relative z-10" style={{ backgroundColor: brandColor }}>
        <div className="w-full aspect-square rounded-[30px] overflow-hidden shadow-2xl mb-8 bg-black">
          <ImageBg data={{ ...data, imageUrl: imgB, imagePosition: data.imagePosition2, imageScale: data.imageScale2 }} className="w-full h-full" />
        </div>
        <div className="text-center w-full px-2">
          <SmartEl {...sp} field="titulo_b">
            <TextWrapper {...sp} as="h3" field="titulo_b" className="font-black uppercase tracking-tighter mb-3 leading-[0.9] text-white" style={{ fontFamily: titleFont, fontSize: `${24 * sTitle}px` }}>
              {data.titulo_b || 'TÍTULO B'}
            </TextWrapper>
          </SmartEl>
          <SmartEl {...sp} field="texto_b">
            <TextWrapper {...sp} as="p" field="texto_b" className="text-white/90 font-medium leading-relaxed" style={{ fontFamily: textFont, fontSize: `${12 * sText}px` }}>
              {data.texto_b || (data.items?.[1]?.value) || 'Texto de apoio da segunda opção.'}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#ffffff] text-[#1A1A1A] rounded-full flex items-center justify-center font-black text-[10px] shadow-2xl border-4 z-30" style={{ borderColor: brandColor }}>
        <SmartEl {...sp} field="badge_text">
          <TextWrapper {...sp} field="badge_text" className="uppercase" style={{ fontFamily: titleFont }}>
            {data.badge_text || 'VS'}
          </TextWrapper>
        </SmartEl>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 32 — Clean Stack
// Empilhamento vertical minimalista com tags de apoio
// ═══════════════════════════════════════════════════════════
export function ComparisonVariant32(props) {
  const { data, index, brandColor, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const imgB = data.imageUrl2 || data.imageUrl;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden rounded-slide bg-white">
      <div className="absolute top-0 left-0 w-full p-10 z-50">
        <SlideHeader {...props} index={index + 1} total={props.slideCount} hideDot={true} counterBg="#EDEDED" handleColor="#1a1a1a" counterColor="#1a1a1a" />
      </div>

      <div className="h-1/2 w-full bg-[#FDFBF7] flex flex-col items-center justify-center relative p-8 z-0">
        <div className="w-[45%] aspect-square rounded-[32px] overflow-hidden mb-4 bg-zinc-200" style={{ boxShadow: `0 25px 50px -12px ${brandColor}26` }}>
          <ImageBg data={data} className="w-full h-full" />
        </div>
        <div className="text-center w-full">
          <SmartEl {...sp} field="titulo_a">
            <TextWrapper {...sp} as="h3" field="titulo_a" className="font-black uppercase tracking-tighter mb-1 leading-[0.9] text-[#1a1a1a]" style={{ fontFamily: titleFont, fontSize: `${22 * sTitle}px` }}>
              {data.titulo_a || data.titulo || 'TÍTULO A'}
            </TextWrapper>
          </SmartEl>
          <SmartEl {...sp} field="tag">
            <TextWrapper {...sp} as="span" field="tag" className="font-bold tracking-[0.2em] text-[9px] text-zinc-500 uppercase" style={{ fontFamily: textFont }}>
              {data.tag || 'O COMUM'}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>

      <div className="h-1/2 w-full flex flex-col items-center justify-center relative p-8 z-10" style={{ backgroundColor: brandColor }}>
        <div className="w-[45%] aspect-square rounded-[32px] overflow-hidden mb-4 bg-black" style={{ boxShadow: '0 25px 50px -12px #ffffff14' }}>
          <ImageBg data={{ ...data, imageUrl: imgB, imagePosition: data.imagePosition2, imageScale: data.imageScale2 }} className="w-full h-full" />
        </div>
        <div className="text-center w-full">
          <SmartEl {...sp} field="titulo_b">
            <TextWrapper {...sp} as="h3" field="titulo_b" className="font-black uppercase tracking-tighter mb-1 leading-[0.9] text-white drop-shadow-sm" style={{ fontFamily: titleFont, fontSize: `${22 * sTitle}px` }}>
              {data.titulo_b || 'TÍTULO B'}
            </TextWrapper>
          </SmartEl>
          <SmartEl {...sp} field="cta_text">
            <TextWrapper {...sp} as="span" field="cta_text" className="font-bold tracking-[0.2em] text-[9px] text-white/70 uppercase" style={{ fontFamily: textFont }}>
              {data.cta_text || 'O PREMIUM'}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#ffffff] text-[#1A1A1A] rounded-full flex items-center justify-center font-black text-[10px] shadow-2xl border-4 z-30" style={{ borderColor: brandColor }}>
        <SmartEl {...sp} field="badge_text">
          <TextWrapper {...sp} field="badge_text" className="uppercase" style={{ fontFamily: titleFont }}>
            {data.badge_text || 'VS'}
          </TextWrapper>
        </SmartEl>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 33 — Balanced Stack
// Layout horizontal em empilhamento vertical com tags e textos de apoio
// ═══════════════════════════════════════════════════════════
export function ComparisonVariant33(props) {
  const { data, index, brandColor, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const imgB = data.imageUrl2 || data.imageUrl;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden rounded-slide bg-white">
      <div className="absolute top-0 left-0 w-full p-10 z-50">
        <SlideHeader {...props} index={index + 1} total={props.slideCount} hideDot={true} counterBg="#EDEDED" handleColor="#1a1a1a" counterColor="#1a1a1a" />
      </div>

      <div className="h-1/2 w-full bg-[#FDFBF7] flex flex-row items-center justify-center p-8 gap-6 relative z-0">
        <div className="w-[45%] aspect-square rounded-[32px] overflow-hidden bg-zinc-200" style={{ boxShadow: `0 25px 50px -12px ${brandColor}26` }}>
          <ImageBg data={data} className="w-full h-full" />
        </div>
        <div className="flex-1 flex flex-col justify-center text-left">
          <SmartEl {...sp} field="tag">
            <TextWrapper {...sp} as="span" field="tag" className="font-bold tracking-[0.2em] text-[9px] text-zinc-500 uppercase mb-2 block" style={{ fontFamily: textFont }}>
              {data.tag || 'O COMUM'}
            </TextWrapper>
          </SmartEl>
          <SmartEl {...sp} field="titulo_a">
            <TextWrapper {...sp} as="h3" field="titulo_a" className="font-black uppercase tracking-tighter mb-2 leading-[0.9] text-[#1a1a1a]" style={{ fontFamily: titleFont, fontSize: `${24 * sTitle}px` }}>
              {data.titulo_a || data.titulo || 'TÍTULO A'}
            </TextWrapper>
          </SmartEl>
          <SmartEl {...sp} field="texto_a">
            <TextWrapper {...sp} as="p" field="texto_a" className="text-zinc-600 font-medium leading-relaxed" style={{ fontFamily: textFont, fontSize: `${11 * sText}px` }}>
              {data.texto_a || (data.items?.[0]?.value) || 'Texto de apoio da primeira opção.'}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>

      <div className="h-1/2 w-full flex flex-row items-center justify-center p-8 gap-6 relative z-10" style={{ backgroundColor: brandColor }}>
        <div className="flex-1 flex flex-col justify-center text-right items-end">
          <SmartEl {...sp} field="cta_text">
            <TextWrapper {...sp} as="span" field="cta_text" className="font-bold tracking-[0.2em] text-[9px] text-white/70 uppercase mb-2 block" style={{ fontFamily: textFont }}>
              {data.cta_text || 'O PREMIUM'}
            </TextWrapper>
          </SmartEl>
          <SmartEl {...sp} field="titulo_b">
            <TextWrapper {...sp} as="h3" field="titulo_b" className="font-black uppercase tracking-tighter mb-2 leading-[0.9] text-white" style={{ fontFamily: titleFont, fontSize: `${24 * sTitle}px` }}>
              {data.titulo_b || 'TÍTULO B'}
            </TextWrapper>
          </SmartEl>
          <SmartEl {...sp} field="texto_b">
            <TextWrapper {...sp} as="p" field="texto_b" className="text-white/90 font-medium leading-relaxed" style={{ fontFamily: textFont, fontSize: `${11 * sText}px` }}>
              {data.texto_b || (data.items?.[1]?.value) || 'Texto de apoio da segunda opção.'}
            </TextWrapper>
          </SmartEl>
        </div>
        <div className="w-[45%] aspect-square rounded-[32px] overflow-hidden bg-black" style={{ boxShadow: '0 25px 50px -12px #ffffff14' }}>
          <ImageBg data={{ ...data, imageUrl: imgB, imagePosition: data.imagePosition2, imageScale: data.imageScale2 }} className="w-full h-full" />
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#ffffff] text-[#1A1A1A] rounded-full flex items-center justify-center font-black text-[10px] shadow-2xl border-4 z-30" style={{ borderColor: brandColor }}>
        <SmartEl {...sp} field="badge_text">
          <TextWrapper {...sp} field="badge_text" className="uppercase" style={{ fontFamily: titleFont }}>
            {data.badge_text || 'VS'}
          </TextWrapper>
        </SmartEl>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 34 — Offset Stack
// Empilhamento vertical com imagens e textos em offset lateral
// ═══════════════════════════════════════════════════════════
export function ComparisonVariant34(props) {
  const { data, index, brandColor, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const imgB = data.imageUrl2 || data.imageUrl;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden rounded-slide bg-white">
      <div className="absolute top-0 left-0 w-full p-10 z-50">
        <SlideHeader {...props} index={index + 1} total={props.slideCount} hideDot={true} counterBg="#EDEDED" handleColor="#1a1a1a" counterColor="#1a1a1a" />
      </div>

      <div className="h-1/2 w-full bg-[#FDFBF7] flex flex-col justify-end p-8 pb-10 relative z-0">
        <div className="w-full flex items-center gap-6">
          <div className="w-[45%] aspect-square rounded-[32px] overflow-hidden bg-zinc-200" style={{ boxShadow: `0 25px 50px -12px ${brandColor}26` }}>
            <ImageBg data={data} className="w-full h-full" />
          </div>
          <div className="w-[55%] flex flex-col">
            <SmartEl {...sp} field="tag">
              <TextWrapper {...sp} as="span" field="tag" className="font-bold tracking-[0.2em] text-[9px] text-zinc-500 uppercase mb-2 block" style={{ fontFamily: textFont }}>
                {data.tag || 'O COMUM'}
              </TextWrapper>
            </SmartEl>
            <SmartEl {...sp} field="titulo_a">
              <TextWrapper {...sp} as="h3" field="titulo_a" className="font-black uppercase tracking-tighter mb-2 leading-[0.9] text-[#1a1a1a]" style={{ fontFamily: titleFont, fontSize: `${22 * sTitle}px` }}>
                {data.titulo_a || data.titulo || 'TÍTULO A'}
              </TextWrapper>
            </SmartEl>
            <SmartEl {...sp} field="texto_a">
              <TextWrapper {...sp} as="p" field="texto_a" className="text-zinc-600 font-medium leading-relaxed pr-2" style={{ fontFamily: textFont, fontSize: `${11 * sText}px` }}>
                {data.texto_a || (data.items?.[0]?.value) || 'Texto de apoio da primeira opção.'}
              </TextWrapper>
            </SmartEl>
          </div>
        </div>
      </div>

      <div className="h-1/2 w-full flex flex-col justify-start p-8 pt-10 relative z-10" style={{ backgroundColor: brandColor }}>
        <div className="w-full flex items-center gap-6">
          <div className="w-[55%] flex flex-col text-right items-end">
            <SmartEl {...sp} field="cta_text">
              <TextWrapper {...sp} as="span" field="cta_text" className="font-bold tracking-[0.2em] text-[9px] text-white/70 uppercase mb-2 block" style={{ fontFamily: textFont }}>
                {data.cta_text || 'O PREMIUM'}
              </TextWrapper>
            </SmartEl>
            <SmartEl {...sp} field="titulo_b">
              <TextWrapper {...sp} as="h3" field="titulo_b" className="font-black uppercase tracking-tighter mb-2 leading-[0.9] text-white drop-shadow-sm" style={{ fontFamily: titleFont, fontSize: `${22 * sTitle}px` }}>
                {data.titulo_b || 'TÍTULO B'}
              </TextWrapper>
            </SmartEl>
            <SmartEl {...sp} field="texto_b">
              <TextWrapper {...sp} as="p" field="texto_b" className="text-white/90 font-medium leading-relaxed pl-2" style={{ fontFamily: textFont, fontSize: `${11 * sText}px` }}>
                {data.texto_b || (data.items?.[1]?.value) || 'Texto de apoio da segunda opção.'}
              </TextWrapper>
            </SmartEl>
          </div>
          <div className="w-[45%] aspect-square rounded-[32px] overflow-hidden bg-black" style={{ boxShadow: '0 25px 50px -12px #ffffff14' }}>
            <ImageBg data={{ ...data, imageUrl: imgB, imagePosition: data.imagePosition2, imageScale: data.imageScale2 }} className="w-full h-full" />
          </div>
        </div>
      </div>


    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 35 — Diagonal Clash
// Divisão diagonal agressiva com clip-path e imagens integradas
// ═══════════════════════════════════════════════════════════
export function ComparisonVariant35(props) {
  const { data, index, brandColor, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const imgB = data.imageUrl2 || data.imageUrl;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  return (
    <div className="w-full h-full relative overflow-hidden bg-black text-white rounded-slide">
      <div className="absolute top-0 left-0 w-full p-10 z-50">
        <SlideHeader {...props} index={index + 1} total={props.slideCount} hideDot={true} />
      </div>

      <div className="absolute inset-0 z-0 bg-zinc-900" style={{ clipPath: 'polygon(0 0, 65% 0, 35% 100%, 0 100%)' }}>
        <ImageBg data={data} className="w-full h-full opacity-30 grayscale" />
        <div className="absolute top-[40%] left-8 w-[45%]">
          <SmartEl {...sp} field="titulo_a">
            <TextWrapper {...sp} as="h3" field="titulo_a" className="font-black uppercase tracking-tighter mb-2 leading-[0.9] text-white" style={{ fontFamily: titleFont, fontSize: `${30 * sTitle}px` }}>
              {data.titulo_a || data.titulo || 'TÍTULO A'}
            </TextWrapper>
          </SmartEl>
          <SmartEl {...sp} field="texto_a">
            <TextWrapper {...sp} as="p" field="texto_a" className="text-zinc-400 font-medium leading-relaxed" style={{ fontFamily: textFont, fontSize: `${11 * sText}px` }}>
              {data.texto_a || (data.items?.[0]?.value) || 'Texto de apoio da primeira opção.'}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>

      <div className="absolute inset-0 z-10" style={{ clipPath: 'polygon(65% 0, 100% 0, 100% 100%, 35% 100%)', backgroundColor: brandColor }}>
        <ImageBg data={{ ...data, imageUrl: imgB, imagePosition: data.imagePosition2, imageScale: data.imageScale2 }} className="w-full h-full" />
        <div className="absolute bottom-12 right-8 w-[45%] text-right flex flex-col items-end">
          <SmartEl {...sp} field="titulo_b">
            <TextWrapper {...sp} as="h3" field="titulo_b" className="font-black uppercase tracking-tighter mb-2 leading-[0.9] text-white drop-shadow-lg" style={{ fontFamily: titleFont, fontSize: `${30 * sTitle}px` }}>
              {data.titulo_b || 'TÍTULO B'}
            </TextWrapper>
          </SmartEl>
          <SmartEl {...sp} field="texto_b">
            <TextWrapper {...sp} as="p" field="texto_b" className="text-white/80 font-medium leading-relaxed drop-shadow-md" style={{ fontFamily: textFont, fontSize: `${11 * sText}px` }}>
              {data.texto_b || (data.items?.[1]?.value) || 'Texto de apoio da segunda opção.'}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 36 — Dynamic Cards
// Cards rotacionados e sobrepostos com fundo claro
// ═══════════════════════════════════════════════════════════
export function ComparisonVariant36(props) {
  const { data, index, brandColor, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const imgB = data.imageUrl2 || data.imageUrl;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  return (
    <div className="w-full h-full p-8 flex flex-col overflow-hidden relative rounded-slide" style={{ backgroundColor: brandColor }}>
      <div className="absolute top-0 left-0 w-full p-10 z-50">
        <SlideHeader {...props} index={index + 1} total={props.slideCount} hideDot={true} counterBg="#EFECE6" />
      </div>

      <div className="mt-12 mb-4 shrink-0 text-center relative z-10">
        <SmartEl {...sp} field="titulo">
          <TextWrapper {...sp} as="h2" field="titulo" className="font-black text-[#ffffff] leading-none uppercase tracking-tighter" style={{ fontFamily: titleFont, fontSize: `${28 * sTitle}px` }}>
            {data.titulo || 'VERSUS'}
          </TextWrapper>
        </SmartEl>
      </div>

      <div className="flex-1 flex items-center justify-center gap-2 relative min-h-0">
        {/* Card A */}
        <div className="w-1/2 flex flex-col items-center gap-2 rotate-[-4deg] -translate-x-2">
          <div className="w-full h-[60%] bg-white rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.1)] relative overflow-hidden border-[3px] border-white" style={{ aspectRatio: '3/4' }}>
            <ImageBg data={data} className="w-full h-full grayscale opacity-60" />
          </div>
          <SmartEl {...sp} field="titulo_a">
            <TextWrapper {...sp} as="p" field="titulo_a" className="text-[#f9f5f5] text-[10px] font-black uppercase tracking-widest text-center" style={{ fontFamily: titleFont }}>
              {data.titulo_a || 'OPÇÃO A'}
            </TextWrapper>
          </SmartEl>
        </div>

        {/* Badge VS */}
        <div className="absolute z-30 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-2xl border-4" style={{ borderColor: brandColor }}>
          <SmartEl {...sp} field="badge_text">
            <TextWrapper {...sp} field="badge_text" className="font-black text-[10px]" style={{ color: '#1A1A1A', fontFamily: titleFont }}>
              {data.badge_text || 'VS'}
            </TextWrapper>
          </SmartEl>
        </div>

        {/* Card B */}
        <div className="w-1/2 flex flex-col items-center gap-2 rotate-[4deg] translate-x-2 z-20">
          <div className="w-full bg-white rounded-2xl relative overflow-hidden border-[3px] border-white" style={{ aspectRatio: '3/4', boxShadow: '0 25px 50px -12px #ffffff1a' }}>
            <ImageBg data={{ ...data, imageUrl: imgB, imagePosition: data.imagePosition2, imageScale: data.imageScale2 }} className="w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>
          <SmartEl {...sp} field="titulo_b">
            <TextWrapper {...sp} as="p" field="titulo_b" className="text-[#f9f5f5] text-[10px] font-black uppercase tracking-widest text-center" style={{ fontFamily: titleFont }}>
              {data.titulo_b || 'OPÇÃO B'}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 37 — Bold Vertical
// Empilhamento vertical com grandes cards e títulos destacados
// ═══════════════════════════════════════════════════════════
export function ComparisonVariant37(props) {
  const { data, index, brandColor, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const imgB = data.imageUrl2 || data.imageUrl;
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden rounded-slide">
      <div className="absolute top-0 left-0 w-full p-10 z-50">
        <SlideHeader {...props} index={index + 1} total={props.slideCount} hideDot={true} counterBg="#EDEDED" handleColor="#1a1a1a" counterColor="#1a1a1a" />
      </div>

      <div className="h-1/2 w-full relative shrink-0 bg-[#EBE9E1] flex flex-col items-center justify-end p-8 pb-4 z-0">
        <div className="w-full text-center mb-3">
          <SmartEl {...sp} field="titulo_a">
            <TextWrapper {...sp} as="h2" field="titulo_a" className="font-black text-[#1a1a1a] leading-none uppercase tracking-tighter" style={{ fontFamily: titleFont, fontSize: `${20 * sTitle}px` }}>
              {data.titulo_a || 'OPÇÃO A'}
            </TextWrapper>
          </SmartEl>
        </div>
        <div className="w-full rounded-[25px] relative overflow-hidden border border-white" style={{ height: '181px' }}>
          <ImageBg data={data} className="w-full h-full" />
        </div>
      </div>

      <div className="h-1/2 w-full relative z-20 p-8 pt-4 flex flex-col justify-start" style={{ backgroundColor: brandColor }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 rounded-full bg-[#ffffff] text-[#1A1A1A] flex items-center justify-center shadow-2xl" style={{ width: '50px', height: '50px', border: `4px solid ${brandColor}` }}>
          <SmartEl {...sp} field="badge_text">
            <TextWrapper {...sp} field="badge_text" className="font-black text-sm" style={{ fontFamily: titleFont }}>
              {data.badge_text || 'VS'}
            </TextWrapper>
          </SmartEl>
        </div>
        <div className="w-full rounded-[25px] relative overflow-hidden mb-3 border border-white" style={{ height: '181px' }}>
          <ImageBg data={{ ...data, imageUrl: imgB, imagePosition: data.imagePosition2, imageScale: data.imageScale2 }} className="w-full h-full" />
        </div>
        <div className="w-full text-center mt-auto">
          <SmartEl {...sp} field="titulo_b">
            <TextWrapper {...sp} as="h2" field="titulo_b" className="font-black text-white leading-none uppercase tracking-tighter" style={{ fontFamily: titleFont, fontSize: `${20 * sTitle}px` }}>
              {data.titulo_b || 'OPÇÃO B'}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 38 — Waffle Clash (Cheese Waffles Before/After)
// Lado a lado assimétrico com imagens flutuantes e ghost text
// ═══════════════════════════════════════════════════════════
export function ComparisonVariant38(props) {
  const { data, index, brandColor, brandHandle, isVerified, slideCount, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const bgBase = data.bgColor || '#f2722b'; 
  const accentColor = brandColor || '#fab818'; 
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  const imgLeftMain = sanitizeUnsplashUrl(data.imageUrl) || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop";
  const imgLeftSmall = sanitizeUnsplashUrl(data.imageUrl3) || "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop";
  const imgRight = sanitizeUnsplashUrl(data.imageUrl2) || "https://images.unsplash.com/photo-1459789034005-ba29c5783491?q=80&w=600&auto=format&fit=crop";

  return (
    <div className="relative w-full h-full flex font-outfit select-none overflow-hidden rounded-slide shadow-2xl" style={{ backgroundColor: bgBase }}>
      
      {/* Slide Header flutuando no topo */}
      <div className="absolute top-0 left-0 w-full p-10 z-50 pointer-events-none">
        <SlideHeader 
          data={data} 
          slideIndex={index} 
          onActionStart={onActionStart} 
          selectedElement={selectedElement} 
          onSelectElement={onSelectElement} 
          index={index + 1} 
          total={slideCount} 
          brandHandle={brandHandle} 
          showBrandHandle={props.showBrandHandle} 
          brandColor={brandColor} 
          isVerified={isVerified} 
          showSlideCounter={props.showSlideCounter} 
          slideCounterPosition={props.slideCounterPosition} 
          brandAvatar={props.brandAvatar} 
          hideDot={true} 
          counterBg="rgba(255,255,255,0.2)" 
          handleColor="#ffffff" 
          counterColor="#ffffff" 
          brandLogo={props.brandLogo} 
          showBrandLogo={props.showBrandLogo} 
          className="pointer-events-auto"
        />
      </div>

      {/* Metade Esquerda: BEFORE */}
      <div className="w-[50%] h-full flex flex-col justify-between py-10 px-4 relative border-r-[1px] border-black/10" style={{ backgroundColor: bgBase }}>
        
        {/* Ghost text background */}
        <div className="absolute left-0 top-0 bottom-0 w-6 flex items-center justify-center pointer-events-none overflow-visible z-0">
          <div className="-rotate-90 whitespace-nowrap text-[90px] font-black tracking-tighter text-black/5 uppercase" style={{ fontFamily: titleFont }}>
            {data.titulo_a || 'CHEESE'}
          </div>
        </div>

        {/* Cabeçalho */}
        <div className="text-center z-10 mt-10">
          <SmartEl {...sp} field="titulo_a">
            <TextWrapper {...sp} as="h2" field="titulo_a" className="text-white font-black leading-none uppercase tracking-tighter outline-none" style={{ fontFamily: titleFont, fontSize: `${30 * sTitle}px` }}>
              {data.titulo_a || 'CHEESE'}
            </TextWrapper>
          </SmartEl>
        </div>

        {/* Prato de Ingredientes */}
        <div className="relative w-[85%] aspect-square mx-auto my-auto flex items-center justify-center z-10">
          {/* Prato principal */}
          <div className="w-full h-full rounded-2xl overflow-hidden border border-black/10 bg-white/95 shadow-xl relative p-1">
            <img 
              src={imgLeftMain} 
              className="w-full h-full object-cover object-bottom rounded-xl" 
              alt="Ingredients before" 
            />
          </div>
        </div>

        {/* Botão Retangular: BEFORE */}
        <div className="flex justify-center z-10">
          <SmartEl {...sp} field="tag">
            <div className="bg-white px-8 py-2.5 shadow-md border border-black/5 rounded-[10px]">
              <TextWrapper {...sp} as="span" field="tag" className="font-black text-[13px] tracking-widest uppercase outline-none" style={{ color: bgBase, fontFamily: textFont }}>
                {data.tag || 'BEFORE'}
              </TextWrapper>
            </div>
          </SmartEl>
        </div>

      </div>

      {/* Metade Direita: AFTER */}
      <div className="w-[50%] h-full flex flex-col justify-between py-10 px-4 relative" style={{ backgroundColor: accentColor }}>
        
        {/* Ghost text background */}
        <div className="absolute right-0 top-0 bottom-0 w-6 flex items-center justify-center pointer-events-none overflow-visible z-0">
          <div className="rotate-90 whitespace-nowrap text-[90px] font-black tracking-tighter text-black/5 uppercase" style={{ fontFamily: titleFont }}>
            {data.titulo_b || 'WAFFLES'}
          </div>
        </div>

        {/* Cabeçalho */}
        <div className="text-center z-10 mt-10">
          <SmartEl {...sp} field="titulo_b">
            <TextWrapper {...sp} as="h2" field="titulo_b" className="text-white font-black leading-none uppercase tracking-tighter outline-none" style={{ fontFamily: titleFont, fontSize: `${30 * sTitle}px` }}>
              {data.titulo_b || 'WAFFLES'}
            </TextWrapper>
          </SmartEl>
        </div>

        {/* Waffle Pronto com decorativos */}
        <div className="relative w-[85%] aspect-square mx-auto my-auto flex items-center justify-center z-10">
          <div className="absolute inset-[-10px] rounded-full border-2 border-dashed border-white/20" />
          
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/80 bg-white/90 shadow-2xl relative p-1">
            <img 
              src={imgRight} 
              className="w-full h-full object-cover rounded-full" 
              alt="Waffle finished" 
            />
          </div>
        </div>

        {/* Botão Retangular: AFTER */}
        <div className="flex justify-center z-10">
          <SmartEl {...sp} field="texto_apoio">
            <div className="bg-white px-8 py-2.5 shadow-md border border-black/5 rounded-[10px]">
              <TextWrapper {...sp} as="span" field="texto_apoio" className="font-black text-[13px] tracking-widest uppercase outline-none" style={{ color: accentColor, fontFamily: textFont }}>
                {data.texto_apoio || 'AFTER'}
              </TextWrapper>
            </div>
          </SmartEl>
        </div>

      </div>

    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 39 — Sweet Rival (Cheap & Luxurious Cakes)
// Dual Squircles com tipografia editorial de luxo
// ═══════════════════════════════════════════════════════════
export function ComparisonVariant39(props) {
  const { data, index, brandColor, brandHandle, isVerified, slideCount, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const bgBase = data.bgColor || '#48332a'; 
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  const imgLeft = sanitizeUnsplashUrl(data.imageUrl) || "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop";
  const imgRight = sanitizeUnsplashUrl(data.imageUrl2) || "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=600&auto=format&fit=crop";

  return (
    <div className="relative w-full h-full flex flex-col justify-between py-10 px-6 font-outfit select-none overflow-hidden rounded-slide shadow-2xl border border-white/10 text-[#ecdccb]" style={{ backgroundColor: bgBase }}>
      
      {/* Linhas cruzadas no fundo sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Slide Header flutuando no topo */}
      <div className="absolute top-0 left-0 w-full p-8 z-50 pointer-events-none">
        <SlideHeader 
          data={data} 
          slideIndex={index} 
          onActionStart={onActionStart} 
          selectedElement={selectedElement} 
          onSelectElement={onSelectElement} 
          index={index + 1} 
          total={slideCount} 
          brandHandle={brandHandle} 
          showBrandHandle={props.showBrandHandle} 
          brandColor={brandColor} 
          isVerified={isVerified} 
          showSlideCounter={props.showSlideCounter} 
          slideCounterPosition={props.slideCounterPosition} 
          brandAvatar={props.brandAvatar} 
          hideDot={true} 
          counterBg="rgba(255,255,255,0.1)" 
          handleColor="#ecdccb" 
          counterColor="#ecdccb" 
          brandLogo={props.brandLogo} 
          showBrandLogo={props.showBrandLogo} 
          className="pointer-events-auto"
        />
      </div>

      {/* Header: CHEAP AND LUXURIOUS */}
      <div className="relative z-10 text-center mt-6 flex flex-col items-center">
        {/* Linha/Selo Superior */}
        <div className="text-[#ecdccb] mb-2 mt-4">
          <svg className="w-8 h-8 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/>
            <path d="M3 20h18" strokeWidth="2"/>
          </svg>
        </div>
        
        <SmartEl {...sp} field="titulo">
          <TextWrapper {...sp} as="h2" field="titulo" className="font-serif text-white font-bold tracking-[0.05em] uppercase leading-none text-center outline-none" style={{ fontSize: `${25 * sTitle}px`, fontFamily: titleFont }}>
            {data.titulo || 'CHEAP AND LUXURIOUS'}
          </TextWrapper>
        </SmartEl>
      </div>

      {/* Dois Squircles Simétricos no Centro (Cake slices) */}
      <div className="relative z-10 grid grid-cols-2 gap-4 px-2 my-auto">
        
        {/* Squircle 1 */}
        <div className="relative aspect-square rounded-[2rem] bg-[#33221b]/80 border border-[#ecdccb]/10 p-2.5 flex items-center justify-center shadow-xl hover:scale-[1.02] transition-transform duration-500">
          <div className="w-full h-full rounded-[1.65rem] overflow-hidden relative">
            <img 
              src={imgLeft} 
              className="w-full h-full object-cover" 
              alt="Squircle Left" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Squircle 2 */}
        <div className="relative aspect-square rounded-[2rem] bg-[#33221b]/80 border border-[#ecdccb]/10 p-2.5 flex items-center justify-center shadow-xl hover:scale-[1.02] transition-transform duration-500">
          <div className="w-full h-full rounded-[1.65rem] overflow-hidden relative">
            <img 
              src={imgRight} 
              className="w-full h-full object-cover" 
              alt="Squircle Right" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

      </div>

      {/* Seção Inferior: Slogan e Botões */}
      <div className="relative z-10 flex flex-col items-center">
        
        <SmartEl {...sp} field="tag" className="mb-4">
          <TextWrapper {...sp} as="p" field="tag" className="text-white text-[11px] font-bold tracking-[0.25em] uppercase text-center outline-none" style={{ fontSize: `${11 * sText}px`, fontFamily: textFont }}>
            {data.tag || 'CHOOSE YOUR FAVORITE CAKES'}
          </TextWrapper>
        </SmartEl>

        {/* Linha do Rodapé com os Textos laterais e Botão Central */}
        <div className="w-full flex justify-between items-center gap-2">
          <SmartEl {...sp} field="subtitulo" className="max-w-[85px]">
            <TextWrapper {...sp} as="span" field="subtitulo" className="text-[8px] font-bold text-[#ecdccb]/60 uppercase tracking-widest text-left leading-tight block outline-none" style={{ fontFamily: textFont }}>
              {data.subtitulo || 'GET 30% DISCOUNT ONLY FOR TODAY'}
            </TextWrapper>
          </SmartEl>

          <SmartEl {...sp} field="cta_text">
            <button 
              className="hover:bg-[#DE1E4D] hover:text-white font-serif italic font-bold px-7 py-3 rounded-full text-xs shadow-[0_8px_20px_rgba(0,0,0,0.3)] transition-all uppercase whitespace-nowrap animate-pulse"
              style={{ backgroundColor: brandColor || '#FAF1EA', color: brandColor ? '#ffffff' : '#3c1d0f' }}
            >
              <TextWrapper {...sp} as="span" field="cta_text" className="outline-none">
                {data.cta_text || 'SHOP NOW'}
              </TextWrapper>
            </button>
          </SmartEl>

          <SmartEl {...sp} field="texto_apoio" className="max-w-[85px]">
            <TextWrapper {...sp} as="span" field="texto_apoio" className="text-[8px] font-bold text-[#ecdccb]/60 uppercase tracking-widest text-right leading-tight block outline-none" style={{ fontFamily: textFont }}>
              {data.texto_apoio || 'GET 30% DISCOUNT ONLY FOR TODAY'}
            </TextWrapper>
          </SmartEl>
        </div>

      </div>

    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 40 — Showcase Grid (Charity Bakes)
// Quad-grid de imagens com card central e detalhes do evento
// ═══════════════════════════════════════════════════════════
export function ComparisonVariant40(props) {
  const { data, index, brandColor, brandHandle, isVerified, slideCount, titleScale, textScale, onActionStart, onTextChange, selectedElement, onSelectElement, titleFont, textFont } = props;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const bgBase = data.bgColor || '#d0bfaa'; 
  const sp = { data, index, onActionStart, selectedElement, onSelectElement, onTextChange };

  const img1 = sanitizeUnsplashUrl(data.imageUrl) || "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop";
  const img2 = sanitizeUnsplashUrl(data.imageUrl2) || "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=600&auto=format&fit=crop";
  const img3 = sanitizeUnsplashUrl(data.imageUrl3) || "https://images.unsplash.com/photo-1586985289688-ca9cf4993ec0?q=80&w=600&auto=format&fit=crop";
  const img4 = sanitizeUnsplashUrl(data.imageUrl4) || "https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=600&auto=format&fit=crop";

  return (
    <div className="relative w-full h-full flex flex-col justify-between py-4 px-4 font-outfit select-none overflow-hidden rounded-slide shadow-2xl border border-white/10 text-[#2d1b13]" style={{ backgroundColor: bgBase }}>
      
      {/* Slide Header flutuando no topo do container central */}
      <div className="absolute top-2 left-0 w-full px-8 z-50 pointer-events-none">
        <SlideHeader 
          data={data} 
          slideIndex={index} 
          onActionStart={onActionStart} 
          selectedElement={selectedElement} 
          onSelectElement={onSelectElement} 
          index={index + 1} 
          total={slideCount} 
          brandHandle={brandHandle} 
          showBrandHandle={props.showBrandHandle} 
          brandColor={brandColor} 
          isVerified={isVerified} 
          showSlideCounter={props.showSlideCounter} 
          slideCounterPosition={props.slideCounterPosition} 
          brandAvatar={props.brandAvatar} 
          hideDot={true} 
          counterBg="rgba(0,0,0,0.1)" 
          handleColor="#2d1b13" 
          counterColor="#2d1b13" 
          brandLogo={props.brandLogo} 
          showBrandLogo={props.showBrandLogo} 
          className="pointer-events-auto"
        />
      </div>

      {/* Grid Superior de Imagens */}
      <div className="grid grid-cols-2 gap-2 h-[26%] mt-6">
        <div className="relative overflow-hidden w-full h-full rounded-2xl border border-black/5 bg-zinc-100">
          <img 
            src={img1} 
            className="w-full h-full object-cover" 
            alt="Showcase 1" 
          />
        </div>
        <div className="relative overflow-hidden w-full h-full rounded-2xl border border-black/5 bg-zinc-100">
          <img 
            src={img2} 
            className="w-full h-full object-cover" 
            alt="Showcase 2" 
          />
        </div>
      </div>

      {/* Banner Central Tipográfico */}
      <div className="flex-1 my-2 flex flex-col justify-center items-center px-4 relative z-10 text-center">
        <SmartEl {...sp} field="subtitulo">
          <TextWrapper {...sp} as="p" field="subtitulo" className="text-[12.5px] text-[#553c2f] font-light tracking-wide leading-none mb-1 outline-none" style={{ fontFamily: textFont, fontSize: `${12.5 * sText}px` }}>
            {data.subtitulo || 'Bakery sale for a cause'}
          </TextWrapper>
        </SmartEl>

        <SmartEl {...sp} field="titulo">
          <TextWrapper {...sp} as="h2" field="titulo" className="font-title font-black text-[#2d1b13] leading-[0.95] tracking-tight uppercase my-1 select-none outline-none" style={{ fontSize: `${34 * sTitle}px`, fontFamily: titleFont, fontWeight: 900 }}>
            {data.titulo || 'CHARITY BAKES'}
          </TextWrapper>
        </SmartEl>

        <div className="flex flex-col gap-1.5 mt-3 text-[#2d1b13]">
          <SmartEl {...sp} field="tag">
            <TextWrapper {...sp} as="p" field="tag" className="text-[12px] font-bold tracking-[0.05em] leading-none flex items-center justify-center gap-1.5 outline-none" style={{ fontFamily: textFont, fontSize: `${12 * sText}px` }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 opacity-85">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg> 
              {data.tag || 'SAT & SUN, 9 a.m. to 1 p.m.'}
            </TextWrapper>
          </SmartEl>
          
          <SmartEl {...sp} field="texto_apoio">
            <TextWrapper {...sp} as="p" field="texto_apoio" className="opacity-80 text-[11px] font-light leading-none mt-1 flex items-center justify-center gap-1.5 outline-none" style={{ fontFamily: textFont, fontSize: `${11 * sText}px` }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 opacity-70">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg> 
              {data.texto_apoio || 'City market, City center'}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>

      {/* Grid Inferior de Imagens */}
      <div className="grid grid-cols-2 gap-2 h-[26%]">
        <div className="relative overflow-hidden w-full h-full rounded-2xl border border-black/5 bg-zinc-100">
          <img 
            src={img3} 
            className="w-full h-full object-cover" 
            alt="Showcase 3" 
          />
        </div>
        <div className="relative overflow-hidden w-full h-full rounded-2xl border border-black/5 bg-zinc-100">
          <img 
            src={img4} 
            className="w-full h-full object-cover" 
            alt="Showcase 4" 
          />
        </div>
      </div>

    </div>
  );
}

// ==========================================
// EXPORTS & METADATA
// ==========================================

export const COMPARISON_VARIANT_COMPONENTS = {
  2: ComparisonVariant2,
  5: ComparisonVariant5,
  6: ComparisonVariant6,
  9: ComparisonVariant9,
  11: ComparisonVariant11,
  13: ComparisonVariant13,
  14: ComparisonVariant14,
  16: ComparisonVariant16,
  19: ComparisonVariant19,
  20: ComparisonVariant20,
  22: ComparisonVariant22,
  23: ComparisonVariant23,
  25: ComparisonVariant25,
  26: ComparisonVariant26,
  27: ComparisonVariant27,
  28: ComparisonVariant28,
  29: ComparisonVariant29,
  30: ComparisonVariant30,
  31: ComparisonVariant31,
  32: ComparisonVariant32,
  33: ComparisonVariant33,
  34: ComparisonVariant34,
  35: ComparisonVariant35,
  36: ComparisonVariant36,
  37: ComparisonVariant37,
  38: ComparisonVariant38,
  39: ComparisonVariant39,
  40: ComparisonVariant40,
};

export const COMPARISON_VARIANT_META = [
  {
    id: 2,
    nome: 'Split View',
    badge: null,
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Comparacao/comparison-variants--2.png'
  },
  {
    id: 5,
    nome: 'Cartões',
    badge: null,
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Comparacao/comparison-variants--5.png'
  },
  {
    id: 6,
    nome: 'Strike Bold',
    badge: null,
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Comparacao/comparison-variants--6.png'
  },
  {
    id: 9,
    nome: 'Diagonal',
    badge: null,
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Comparacao/comparison-variants--9.png'
  },
  {
    id: 11,
    nome: 'Correção',
    badge: 'PRO',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Comparacao/comparison-variants--11.png'
  },
  {
    id: 13,
    nome: 'VS Central',
    badge: 'NEW',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Comparacao/comparison-variants--13.png'
  },
  {
    id: 14,
    nome: 'VS Stack',
    badge: 'NEW',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Comparacao/comparison-variants--14.png'
  },
  {
    id: 16,
    nome: 'Photo Split',
    badge: 'NEW',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Comparacao/comparison-variants--16.png'
  },
  {
    id: 19,
    nome: 'Minimal VS',
    badge: 'NEW',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Comparacao/comparison-variants--19.png'
  },
  {
    id: 20,
    nome: 'Dark Split',
    badge: 'NEW',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Comparacao/comparison-variants--20.png'
  },
  {
    id: 22,
    nome: 'Split Img',
    badge: 'NEW',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Comparacao/comparison-variants--22.png'
  },
  {
    id: 23,
    nome: 'Giant Check',
    badge: 'NEW',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Comparacao/comparison-variants--23.png'
  },
  {
    id: 25,
    nome: 'Split Mono',
    badge: 'NEW',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Comparacao/comparison-variants--25.png'
  },
  {
    id: 26,
    nome: 'Mono Cards',
    badge: 'NEW',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Comparacao/comparison-variants--26.png'
  },
  {
    id: 27,
    nome: 'Vanguard',
    badge: 'NEW',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Comparacao/comparison-variants--27.png'
  },
  {
    id: 28,
    nome: 'Cinematic',
    badge: 'NEW',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Comparacao/comparison-variants--28.png'
  },
  {
    id: 29,
    nome: 'Rect Rival',
    badge: 'NEW',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Comparacao/comparison-variants--29.png'
  },
  {
    id: 30,
    nome: 'Pure Base',
    badge: 'NEW',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Comparacao/comparison-variants--30.png'
  },
  {
    id: 31,
    nome: 'Clean Contrast',
    badge: 'NEW',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Comparacao/comparison-variants--31.png'
  },
  {
    id: 32,
    nome: 'Clean Stack',
    badge: 'NEW',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Comparacao/comparison-variants--32.png'
  },
  {
    id: 33,
    nome: 'Balanced Stack',
    badge: 'NEW',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Comparacao/comparison-variants--33.png'
  },
  {
    id: 34,
    nome: 'Offset Stack',
    badge: 'NEW',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Comparacao/comparison-variants--34.png'
  },
  {
    id: 35,
    nome: 'Diagonal Clash',
    badge: 'NEW',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Comparacao/comparison-variants--35.png'
  },
  {
    id: 36,
    nome: 'Dynamic Cards',
    badge: 'NEW',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Comparacao/comparison-variants--36.png'
  },
  {
    id: 37,
    nome: 'Bold Vertical',
    badge: 'NEW',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Comparacao/comparison-variants--37.png'
  },
  {
    id: 38,
    nome: 'Waffle Clash',
    badge: 'NEW',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Comparacao/comparison-variants--38.png'
  },
  {
    id: 39,
    nome: 'Sweet Rival',
    badge: 'NEW',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Comparacao/comparison-variants--39.png'
  },
  {
    id: 40,
    nome: 'Showcase Grid',
    badge: 'NEW',
    thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Comparacao/comparison-variants--40.png'
  },
];


