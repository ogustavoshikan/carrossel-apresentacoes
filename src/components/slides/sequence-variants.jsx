import React from 'react';
import SmartElement from '../smart-element';
import SlideHeader from '../slide-header';

// ─── Helper: ImageBg ────────────────────────────────────────
function ImageBg({ data, className = '', style = {}, children }) {
  if (!data?.imageUrl) return children || null;
  
  const rawScale = data.imageScale ?? 1;
  const scale = rawScale > 5 ? rawScale / 100 : rawScale;
  
  return (
    <div 
      className={`bg-cover bg-center transition-all duration-500 ${className}`}
      style={{ 
        backgroundImage: `url("${data.imageUrl}")`,
        backgroundPosition: `center ${data.imagePosition ?? 50}%`,
        transform: `scale(${scale})`,
        ...style 
      }}
    >
      {children}
    </div>
  );
}

const SmartEl = SmartElement;

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

// ==========================================
// VARIANTS
// ==========================================

/**
 * COLEÇÃO: 1. The Anchor Progress
 */
export function SequenceVariant1(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-col bg-[#FDFBF7] text-[#1a1a1a] relative overflow-hidden">
      <div className="w-full h-[45%] flex flex-col justify-between p-8 relative transition-colors duration-500" style={{ backgroundColor: brandColor }}>
        <SlideHeader {...props} index={step} hideDot={true} brandColor="#ffffff" counterBg="rgba(255,255,255,0.2)" />
        
        <div className="flex justify-between items-end z-10 mt-auto">
          <SmartEl 
            slideIndex={index} 
            field="titulo" 
            position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
            onActionStart={onActionStart}
            isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
            onSelectElement={onSelectElement}
            className="flex-1"
          >
            <TextWrapper 
              {...tw} 
              as="h2" 
              field="titulo" 
              className="font-black text-white leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-outfit"
              style={{ fontSize: `${40 * sTitle}px` }}
            >
              {data.titulo || 'PASSO\nDESCRIÇÃO'}
            </TextWrapper>
          </SmartEl>
          
          <span className="font-light text-white/40 text-6xl tracking-tighter leading-none font-outfit ml-4 select-none">
            0{step}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 h-[3px] bg-white/20 w-full z-0">
          <div 
            className="h-full bg-white transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{ width: `${(step / Math.max(slideCount, 1)) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex-1 p-8 flex flex-col justify-center">
        <SmartEl 
          slideIndex={index} 
          field="texto_apoio" 
          position={data.positions?.texto_apoio || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
        >
          <TextWrapper 
            {...tw} 
            as="p" 
            field="texto_apoio" 
            className="text-zinc-600 font-medium leading-relaxed w-[90%] font-playfair"
            style={{ fontSize: `${15 * sText}px` }}
          >
            {data.texto_apoio || 'O conteúdo detalhado do passo atual da sua sequência explicativa.'}
          </TextWrapper>
        </SmartEl>
      </div>
    </div>
  );
}

/**
 * COLEÇÃO: 2. The Bridge Flow
 */
export function SequenceVariant2(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };
  
  const trackerPosition = 20 + ((step - 1) / Math.max(slideCount - 1, 1)) * 60;

  return (
    <div className="w-full h-full flex flex-row bg-white text-[#1a1a1a] relative overflow-hidden">
      <div className="flex-1 h-full p-8 pr-12 flex flex-col justify-center relative z-0">
        <div className="absolute top-0 left-0 w-full">
           <SlideHeader {...props} index={step} hideDot={true} />
        </div>

        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-6 mt-12"
        >
          <TextWrapper 
            {...tw} 
            as="h2" 
            field="titulo" 
            className="font-black leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-outfit"
            style={{ fontSize: `${42 * sTitle}px`, color: '#1a1a1a' }}
          >
            {data.titulo || 'A ESCOLHA\nDOS GRÃOS'}
          </TextWrapper>
        </SmartEl>

        <SmartEl 
          slideIndex={index} 
          field="texto_apoio" 
          position={data.positions?.texto_apoio || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
        >
          <TextWrapper 
            {...tw} 
            as="p" 
            field="texto_apoio" 
            className="text-zinc-600 font-medium leading-relaxed w-[95%] font-playfair"
            style={{ fontSize: `${14 * sText}px` }}
          >
            {data.texto_apoio || 'A descrição do processo ou etapa que está sendo apresentada neste slide.'}
          </TextWrapper>
        </SmartEl>
      </div>

      <div 
        className="w-[22%] h-full relative z-10 transition-colors duration-500 shadow-[-10px_0_30px_rgba(0,0,0,0.05)]"
        style={{ backgroundColor: brandColor }}
      >
        <div className="absolute top-8 w-full flex justify-center">
          <span className="font-mono text-white/60 text-xs font-medium font-outfit">
            0{step}/0{slideCount}
          </span>
        </div>
        
        <div 
          className="absolute left-[-10px] w-5 h-5 bg-white border-[3px] rounded-full flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-md"
          style={{ 
            top: `${trackerPosition}%`,
            borderColor: brandColor
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: brandColor }} />
        </div>
      </div>
    </div>
  );
}

/**
 * COLEÇÃO: 3. The Minimal Corner
 */
export function SequenceVariant3(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-col bg-[#050505] text-white relative overflow-hidden">
      <div 
        className="absolute top-0 right-0 w-[100px] h-[100px] flex flex-col items-center justify-center rounded-bl-[40px] shadow-[-10px_10px_30px_rgba(0,0,0,0.5)] transition-colors duration-500 z-10"
        style={{ backgroundColor: brandColor }}
      >
        <span className="font-bold text-[10px] tracking-widest text-white/60 uppercase mb-1 font-outfit select-none">
          PASSO
        </span>
        <span className="font-black text-4xl text-white leading-none font-outfit select-none">
          0{step}
        </span>
      </div>

      <div className="flex-1 p-10 pt-12 flex flex-col justify-center relative z-0">
        <div className="absolute top-0 left-0 w-full">
           <SlideHeader {...props} index={step} hideDot={true} brandColor="#ffffff" />
        </div>

        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-8 mt-12"
        >
          <TextWrapper 
            {...tw} 
            as="h2" 
            field="titulo" 
            className="font-black leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-outfit"
            style={{ fontSize: `${44 * sTitle}px` }}
          >
            {data.titulo || 'O PONTO\nPERFEITO'}
          </TextWrapper>
        </SmartEl>

        <div className="w-12 h-1 bg-zinc-800 mb-6 rounded-full" />

        <SmartEl 
          slideIndex={index} 
          field="texto_apoio" 
          position={data.positions?.texto_apoio || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
        >
          <TextWrapper 
            {...tw} 
            as="p" 
            field="texto_apoio" 
            className="text-white/80 font-medium leading-relaxed w-[90%] font-playfair"
            style={{ fontSize: `${15 * sText}px` }}
          >
            {data.texto_apoio || 'Explicação técnica ou teórica sobre esta fase específica do conteúdo.'}
          </TextWrapper>
        </SmartEl>
      </div>
    </div>
  );
}

/**
 * COLEÇÃO: 4. The Editorial Base
 */
export function SequenceVariant4(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  // Mock de passos para a barra inferior
  const totalSteps = Math.max(slideCount, 5);
  const stepsToShow = Array.from({ length: totalSteps }, (_, i) => i + 1).slice(0, 5);

  return (
    <div className="w-full h-full flex flex-col bg-[#FDFBF7] text-[#1a1a1a] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full">
         <SlideHeader {...props} index={step} hideDot={true} />
      </div>

      <div className="flex-1 p-10 flex flex-col justify-center">
        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-6"
        >
          <TextWrapper 
            {...tw} 
            as="h2" 
            field="titulo" 
            className="font-black leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-outfit"
            style={{ fontSize: `${42 * sTitle}px`, color: brandColor }}
          >
            {data.titulo || 'A EXPERIÊNCIA\nFINAL'}
          </TextWrapper>
        </SmartEl>

        <SmartEl 
          slideIndex={index} 
          field="texto_apoio" 
          position={data.positions?.texto_apoio || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
        >
          <TextWrapper 
            {...tw} 
            as="p" 
            field="texto_apoio" 
            className="text-zinc-600 font-medium leading-relaxed w-[95%] font-playfair"
            style={{ fontSize: `${14 * sText}px` }}
          >
            {data.texto_apoio || 'O desfecho ou a conclusão da sequência, focando no resultado final.'}
          </TextWrapper>
        </SmartEl>
      </div>

      <div className="h-[20%] bg-[#111] w-full flex items-end px-8 pb-8 gap-3 relative z-10 shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
        {stepsToShow.map((i) => (
          <div key={i} className="flex-1 flex flex-col gap-2.5">
            <div 
              className={`h-[4px] w-full rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${i === step ? "opacity-100 scale-100" : "opacity-20 scale-95"}`}
              style={{ backgroundColor: i === step ? brandColor : "#ffffff" }}
            />
            <span 
              className={`font-black text-[11px] uppercase tracking-widest transition-colors duration-500 font-outfit ${i === step ? "text-white" : "text-white/30"}`}
            >
              Fase 0{i}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * COLEÇÃO: 5. The Editorial Tab
 */
export function SequenceVariant5(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  const tabs = [1, 2, 3, 4, 5];

  return (
    <div className="w-full h-full flex flex-col bg-[#FDFBF7] text-[#1a1a1a] relative overflow-hidden">
      <div className="flex w-full h-[12%] border-b border-zinc-200">
        {tabs.map((i) => (
          <div 
            key={i} 
            className={`flex-1 flex items-center justify-center border-t-[6px] transition-all duration-300 ${i === step ? "bg-white shadow-sm" : "bg-transparent"}`}
            style={{ borderColor: i === step ? brandColor : "transparent" }}
          >
            <span className={`font-black text-[14px] font-outfit ${i === step ? "text-[#1a1a1a]" : "text-zinc-300"}`}>
              0{i}
            </span>
          </div>
        ))}
      </div>

      <div className="flex-1 p-10 flex flex-col justify-center relative bg-white">
        <div className="absolute top-0 left-0 w-full opacity-0 pointer-events-none">
           <SlideHeader {...props} index={step} hideDot={true} />
        </div>

        <span className="font-bold tracking-[0.2em] text-[10px] text-zinc-400 uppercase mb-4 font-outfit select-none">
          @{brandHandle}
        </span>

        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-6"
        >
          <TextWrapper 
            {...tw} 
            as="h2" 
            field="titulo" 
            className="font-black leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-outfit"
            style={{ fontSize: `${42 * sTitle}px`, color: '#1a1a1a' }}
          >
            {data.titulo || 'A ESCOLHA\nDOS GRÃOS'}
          </TextWrapper>
        </SmartEl>

        <SmartEl 
          slideIndex={index} 
          field="texto_apoio" 
          position={data.positions?.texto_apoio || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
        >
          <TextWrapper 
            {...tw} 
            as="p" 
            field="texto_apoio" 
            className="text-zinc-600 font-medium leading-relaxed w-[95%] font-playfair"
            style={{ fontSize: `${15 * sText}px` }}
          >
            {data.texto_apoio || 'O amador foca apenas na cobertura. O confeiteiro profissional entende a alma do produto.'}
          </TextWrapper>
        </SmartEl>
      </div>
    </div>
  );
}

/**
 * COLEÇÃO: 6. The Ghost Typo
 */
export function SequenceVariant6(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-col bg-[#050505] text-white relative overflow-hidden">
      <div 
        className="absolute right-[-10%] top-1/2 -translate-y-1/2 font-black opacity-[0.15] select-none pointer-events-none transition-all duration-700 font-outfit"
        style={{ 
          fontSize: "320px", 
          color: "transparent", 
          WebkitTextStroke: `3px ${brandColor}`,
          lineHeight: "0.8"
        }}
      >
        {step}
      </div>

      <div className="flex-1 p-10 flex flex-col justify-center relative z-10 w-[85%]">
        <div className="absolute top-0 left-0 w-full">
           <SlideHeader {...props} index={step} hideDot={true} brandColor="#ffffff" />
        </div>

        <span className="font-bold tracking-[0.2em] text-[10px] text-zinc-500 uppercase mb-4 font-outfit select-none">
          @{brandHandle}
        </span>

        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-6"
        >
          <TextWrapper 
            {...tw} 
            as="h2" 
            field="titulo" 
            className="font-black leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-outfit"
            style={{ fontSize: `${42 * sTitle}px` }}
          >
            {data.titulo || 'A ESCOLHA\nDOS GRÃOS'}
          </TextWrapper>
        </SmartEl>

        <SmartEl 
          slideIndex={index} 
          field="texto_apoio" 
          position={data.positions?.texto_apoio || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
        >
          <TextWrapper 
            {...tw} 
            as="p" 
            field="texto_apoio" 
            className="text-white/80 font-medium leading-relaxed w-full font-playfair"
            style={{ fontSize: `${15 * sText}px` }}
          >
            {data.texto_apoio || 'O amador foca apenas na cobertura. O confeiteiro profissional entende a alma do produto.'}
          </TextWrapper>
        </SmartEl>
      </div>

      <div className="absolute bottom-8 left-10 flex items-center gap-2 z-10">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: brandColor }} />
        <span className="font-bold text-[10px] uppercase tracking-[0.2em] text-white/50 font-outfit">
          FASE 0{step} DE 05
        </span>
      </div>
    </div>
  );
}

/**
 * COLEÇÃO: 7. The Vertical Split
 */
export function SequenceVariant7(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-row bg-white text-[#1a1a1a] relative overflow-hidden">
      <div className="w-[60%] h-full p-10 flex flex-col justify-center relative z-0 border-r border-zinc-100">
        <div className="absolute top-0 left-0 w-full">
           <SlideHeader {...props} index={step} hideDot={true} />
        </div>

        <span className="font-bold tracking-[0.2em] text-[10px] text-zinc-400 uppercase mb-4 font-outfit select-none">
          @{brandHandle}
        </span>

        <SmartEl 
          slideIndex={index} 
          field="texto_apoio" 
          position={data.positions?.texto_apoio || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
        >
          <TextWrapper 
            {...tw} 
            as="p" 
            field="texto_apoio" 
            className="text-zinc-700 font-medium leading-relaxed w-[95%] font-playfair"
            style={{ fontSize: `${14 * sText}px` }}
          >
            {data.texto_apoio || 'O amador foca apenas na cobertura. O confeiteiro profissional entende a alma do produto.'}
          </TextWrapper>
        </SmartEl>
      </div>

      <div 
        className="w-[40%] h-full p-8 flex flex-col justify-between text-right relative z-10 transition-colors duration-500"
        style={{ backgroundColor: brandColor }}
      >
        <span className="font-black text-white/40 text-7xl leading-none font-outfit select-none">
          0{step}
        </span>

        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
        >
          <TextWrapper 
            {...tw} 
            as="h2" 
            field="titulo" 
            className="font-black text-white leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-outfit"
            style={{ fontSize: `${32 * sTitle}px` }}
          >
            {(data.titulo || 'A ESCOLHA DOS GRÃOS').replace(" ", "\n")}
          </TextWrapper>
        </SmartEl>
      </div>
    </div>
  );
}

/**
 * COLEÇÃO: 8. The Orbital Step
 */
export function SequenceVariant8(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (step / 5) * circumference;

  return (
    <div className="w-full h-full flex flex-col bg-[#111] text-white relative overflow-hidden">
      <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-20">
        <span className="font-bold tracking-[0.2em] text-[10px] text-zinc-500 uppercase font-outfit select-none">
          @{brandHandle}
        </span>

        <div className="relative flex items-center justify-center w-[64px] h-[64px]">
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle cx="32" cy="32" r={radius} fill="none" stroke="#333" strokeWidth="2" />
            <circle 
              cx="32" cy="32" r={radius} fill="none" stroke={brandColor} strokeWidth="3"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-700 ease-in-out drop-shadow-md"
              strokeLinecap="round"
            />
          </svg>
          <span className="font-black text-lg text-white font-outfit select-none">
            {step}
          </span>
        </div>
      </div>

      <div className="flex-1 p-10 pt-28 flex flex-col justify-center relative z-10">
        <div className="absolute top-0 left-0 w-full">
           <SlideHeader {...props} index={step} hideDot={true} brandColor="#ffffff" />
        </div>

        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-8"
        >
          <TextWrapper 
            {...tw} 
            as="h2" 
            field="titulo" 
            className="font-black leading-[0.9] uppercase tracking-tighter whitespace-pre-line text-white font-outfit"
            style={{ fontSize: `${46 * sTitle}px` }}
          >
            {(data.titulo || 'A ESCOLHA DOS GRÃOS').replace(" ", "\n")}
          </TextWrapper>
        </SmartEl>

        <SmartEl 
          slideIndex={index} 
          field="texto_apoio" 
          position={data.positions?.texto_apoio || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
        >
          <TextWrapper 
            {...tw} 
            as="p" 
            field="texto_apoio" 
            className="text-white/80 font-light leading-relaxed w-[90%] font-playfair"
            style={{ fontSize: `${15 * sText}px` }}
          >
            {data.texto_apoio || 'O amador foca apenas na cobertura. O confeiteiro profissional entende a alma do produto.'}
          </TextWrapper>
        </SmartEl>
      </div>
    </div>
  );
}

/**
 * COLEÇÃO: 9. The Luminous Edge
 */
export function SequenceVariant9(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-row bg-[#FDFBF7] text-[#1a1a1a] relative overflow-hidden">
      <div 
        className="absolute top-0 right-[-10%] w-[60%] h-full opacity-30 z-0 pointer-events-none transition-colors duration-700 blur-[80px]"
        style={{ backgroundColor: brandColor }}
      />

      <div className="flex-1 h-full p-10 flex flex-col justify-center relative z-10 w-[70%]">
        <div className="absolute top-0 left-0 w-full">
           <SlideHeader {...props} index={step} hideDot={true} />
        </div>

        <span className="font-bold tracking-[0.2em] text-[10px] text-zinc-400 uppercase mb-6 font-outfit select-none">
          @{brandHandle}
        </span>

        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-6"
        >
          <TextWrapper 
            {...tw} 
            as="h2" 
            field="titulo" 
            className="font-black leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-outfit"
            style={{ fontSize: `${42 * sTitle}px`, color: '#1a1a1a' }}
          >
            {(data.titulo || 'A ESCOLHA DOS GRÃOS').replace(" ", "\n")}
          </TextWrapper>
        </SmartEl>

        <SmartEl 
          slideIndex={index} 
          field="texto_apoio" 
          position={data.positions?.texto_apoio || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
        >
          <TextWrapper 
            {...tw} 
            as="p" 
            field="texto_apoio" 
            className="text-zinc-600 font-medium leading-relaxed w-[95%] font-playfair"
            style={{ fontSize: `${14 * sText}px` }}
          >
            {data.texto_apoio || 'O amador foca apenas na cobertura. O confeiteiro profissional entende a alma do produto.'}
          </TextWrapper>
        </SmartEl>
      </div>

      <div className="w-[30%] h-full flex flex-col items-end justify-between p-8 relative z-10">
        <div className="w-8 h-8 rounded-full border border-zinc-300 flex items-center justify-center">
          <span className="font-bold text-[10px] text-[#1a1a1a] font-outfit select-none">
            {step}/5
          </span>
        </div>
        <span className="font-black text-8xl leading-none text-[#1a1a1a]/40 drop-shadow-sm font-outfit select-none">
          0{step}
        </span>
      </div>
    </div>
  );
}

// ==========================================
// EXPORTS & METADATA
// ==========================================

export const SEQUENCE_VARIANT_COMPONENTS = {
  0: SequenceVariant1,
  1: SequenceVariant2,
  2: SequenceVariant3,
  3: SequenceVariant4,
  4: SequenceVariant5,
  5: SequenceVariant6,
  6: SequenceVariant7,
  7: SequenceVariant8,
  8: SequenceVariant9,
};

export const SEQUENCE_VARIANT_META = [
  { id: 0, name: 'Anchor Progress', badge: 'NEW' },
  { id: 1, name: 'Bridge Flow', badge: 'NEW' },
  { id: 2, name: 'Minimal Corner', badge: 'NEW' },
  { id: 3, name: 'Editorial Base', badge: 'NEW' },
  { id: 4, name: 'Editorial Tab', badge: 'NEW' },
  { id: 5, name: 'Ghost Typo', badge: 'NEW' },
  { id: 6, name: 'Vertical Split', badge: 'NEW' },
  { id: 7, name: 'Orbital Step', badge: 'NEW' },
  { id: 8, name: 'Luminous Edge', badge: 'NEW' },
];
