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
      className={`bg-cover transition-all duration-500 ${className}`}
      style={{ 
        backgroundImage: `url("${data.imageUrl}")`,
        backgroundPosition: `${data.imagePositionX ?? 50}% ${data.imagePosition ?? 50}%`,
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
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-col bg-[#fdf9f3] text-[#1a1a1a] relative overflow-hidden">
      <SlideHeader 
        {...props} 
        slideIndex={index} 
        index={step} 
        total={slideCount} 
        hideDot={true} 
        handleColor={data.handleColor || "#ffffff"} 
        counterColor={data.counterColor || "#ffffff"} 
        counterBg={data.counterBg || "rgb(10 10 10 / 0.3)"} 
      />
      <div className="w-full h-[45%] flex flex-col justify-between p-8 relative transition-colors duration-500" style={{ backgroundColor: brandColor }}>
        
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
              className="font-black text-white leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-title"
              style={{ fontSize: `${69.23 * sTitle}px` }}
            >
              {data.titulo || 'PASSO\nDESCRIÇÃO'}
            </TextWrapper>
          </SmartEl>
          
          <span className="font-light text-white/40 text-6xl tracking-tighter leading-none font-text ml-4 select-none">
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
            className="text-[#1a1a1a] font-medium leading-relaxed w-[90%] font-text"
            style={{ fontSize: `${25.71 * sText}px` }}
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
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };
  
  const trackerPosition = 20 + ((step - 1) / Math.max(slideCount - 1, 1)) * 60;

  return (
    <div className="w-full h-full flex flex-row bg-white text-[#1a1a1a] relative overflow-hidden">
      <SlideHeader 
        {...props} 
        slideIndex={index} 
        index={step} 
        total={slideCount} 
        hideDot={true} 
        handleColor={data.handleColor || "#1a1a1a"} 
        counterColor={data.counterColor || "#ffffff"} 
        counterBg={data.counterBg || "rgb(10 10 10 / 0.3)"} 
      />
      <div className="flex-1 h-full p-8 pr-12 flex flex-col justify-center relative z-0">
        

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
            className="font-black leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-text"
            style={{ fontSize: `${69.23 * sTitle}px`, color: '#1a1a1a' }}
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
            className="text-zinc-600 font-medium leading-relaxed w-[95%] font-text"
            style={{ fontSize: `${25.71 * sText}px` }}
          >
            {data.texto_apoio || 'A descrição do processo ou etapa que está sendo apresentada neste slide.'}
          </TextWrapper>
        </SmartEl>
      </div>

      <div 
        className="w-[22%] h-full relative z-10 transition-colors duration-500 shadow-[-10px_0_30px_rgba(0,0,0,0.05)]"
        style={{fontFamily: textFont,  backgroundColor: brandColor }}
      >
        
        
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
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-col bg-[#050505] text-white relative overflow-hidden">
      <SlideHeader 
        {...props} 
        slideIndex={index} 
        index={step} 
        total={slideCount} 
        hideDot={true} 
        handleColor={data.handleColor || "#71717a"} 
        counterColor={data.counterColor || "#a1a1aa"} 
        counterBg={data.counterBg || "#080808"} 
      />
      <div 
        className="absolute top-0 right-0 w-[100px] h-[100px] flex flex-col items-center justify-center rounded-bl-[40px] shadow-[-10px_10px_30px_rgba(0,0,0,0.5)] transition-colors duration-500 z-10"
        style={{ backgroundColor: brandColor }}
      >
        <span className="font-bold text-[10px] tracking-widest text-white/60 uppercase mb-1 font-text select-none">
          PASSO
        </span>
        <span className="font-black text-4xl text-white leading-none font-text select-none">
          0{step}
        </span>
      </div>

      <div className="flex-1 p-10 pt-12 flex flex-col justify-center relative z-0">
        

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
            className="font-black leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-title"
            style={{ fontSize: `${69.23 * sTitle}px` }}
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
            className="text-white/80 font-medium leading-relaxed w-[90%] font-text"
            style={{ fontSize: `${25.71 * sText}px` }}
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
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  // Mock de passos para a barra inferior
  const totalSteps = Math.max(slideCount, 5);
  const stepsToShow = Array.from({ length: totalSteps }, (_, i) => i + 1).slice(0, 5);

  return (
    <div className="w-full h-full flex flex-col bg-[#FDFBF7] text-[#1a1a1a] relative overflow-hidden">
      <SlideHeader 
        {...props} 
        slideIndex={index} 
        index={step} 
        total={slideCount} 
        hideDot={true} 
        handleColor={data.handleColor || "#1a1a1a"} 
        counterColor={data.counterColor || "#1a1a1a"} 
        counterBg={data.counterBg || "#EDEDED"} 
      />

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
            className="font-black leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-text"
            style={{ fontSize: `${69.23 * sTitle}px`, color: brandColor }}
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
            className="text-zinc-600 font-medium leading-relaxed w-[95%] font-text"
            style={{ fontSize: `${25.71 * sText}px` }}
          >
            {data.texto_apoio || 'O desfecho ou a conclusão da sequência, focando no resultado final.'}
          </TextWrapper>
        </SmartEl>
      </div>

      <div 
        className="h-[20%] w-full flex items-end px-8 pb-8 gap-3 relative z-10 shadow-[0_-20px_40px_rgba(0,0,0,0.1)] transition-colors duration-500"
        style={{ backgroundColor: brandColor }}
      >
        {stepsToShow.map((i) => (
          <div key={i} className="flex-1 flex flex-col gap-2.5">
            <div 
              className={`h-[4px] w-full rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${i === step ? "opacity-100 scale-100" : "opacity-40 scale-95"}`}
              style={{fontFamily: textFont,  backgroundColor: "#ffffff" }}
            />
            <span 
              className={`font-black text-[11px] uppercase tracking-widest transition-colors duration-500 font-text ${i === step ? "text-white" : "text-white/30"}`}
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
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  const tabs = [1, 2, 3, 4, 5];

  return (
    <div className="w-full h-full flex flex-col bg-[#FDFBF7] text-[#1a1a1a] relative overflow-hidden">
      <SlideHeader 
        {...props} 
        slideIndex={index} 
        index={step} 
        total={slideCount} 
        hideDot={true} 
        handleColor={data.handleColor || "#1a1a1a"} 
        counterColor={data.counterColor || "#1a1a1a"} 
        counterBg={data.counterBg || "#EDEDED"} 
      />
      <div className="flex w-full h-[12%] border-b border-zinc-200">
        {tabs.map((i) => (
          <div 
            key={i} 
            className={`flex-1 flex items-center justify-center border-t-[6px] transition-all duration-300 ${i === step ? "bg-white shadow-sm" : "bg-transparent"}`}
            style={{ borderColor: i === step ? brandColor : "transparent" }}
          >
            <span className={`font-black text-[14px] font-text ${i === step ? "text-[#1a1a1a]" : "text-zinc-300"}`}>
              0{i}
            </span>
          </div>
        ))}
      </div>

      <div className="flex-1 p-10 flex flex-col justify-center relative bg-white">
        

        

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
            className="font-black leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-text"
            style={{ fontSize: `${69.23 * sTitle}px`, color: '#1a1a1a' }}
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
            className="text-zinc-600 font-medium leading-relaxed w-[95%] font-text"
            style={{ fontSize: `${24.28 * sText}px` }}
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
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-col bg-[#050505] text-white relative overflow-hidden">
      <SlideHeader 
        {...props} 
        slideIndex={index} 
        index={step} 
        total={slideCount} 
        hideDot={true} 
        handleColor={data.handleColor || "#71717a"} 
        counterColor={data.counterColor || "#a1a1aa"} 
        counterBg={data.counterBg || "#080808"} 
      />
      <div 
        className="absolute right-[-10%] top-1/2 -translate-y-1/2 font-black opacity-[0.15] select-none pointer-events-none transition-all duration-700 font-text"
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
            className="font-black leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-text"
            style={{ fontSize: `${69.23 * sTitle}px` }}
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
            className="text-white/80 font-medium leading-relaxed w-full font-text"
            style={{ fontSize: `${22.85 * sText}px` }}
          >
            {data.texto_apoio || 'O amador foca apenas na cobertura. O confeiteiro profissional entende a alma do produto.'}
          </TextWrapper>
        </SmartEl>
      </div>

      
    </div>
  );
}

/**
 * COLEÇÃO: 7. The Vertical Split
 */
export function SequenceVariant7(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-row bg-white text-[#1a1a1a] relative overflow-hidden">
      <SlideHeader 
        {...props} 
        slideIndex={index} 
        index={step} 
        total={slideCount} 
        hideDot={true} 
        handleColor={data.handleColor || "#1a1a1a"} 
        counterColor={data.counterColor || "#ffffff"} 
        counterBg={data.counterBg || "rgb(10 10 10 / 0.3)"} 
      />
      <div className="w-[60%] h-full p-10 flex flex-col justify-center relative z-0 border-r border-zinc-100">
        

        

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
            className="text-zinc-700 font-medium leading-relaxed w-[95%] font-text"
            style={{ fontSize: `${14 * sText}px` }}
          >
            {data.texto_apoio || 'O amador foca apenas na cobertura. O confeiteiro profissional entende a alma do produto.'}
          </TextWrapper>
        </SmartEl>
      </div>

      <div 
        className="w-[40%] h-full p-8 flex flex-col justify-between text-right relative z-10 transition-colors duration-500"
        style={{fontFamily: textFont,  backgroundColor: brandColor }}
      >
        <span className="font-black text-white/40 text-7xl leading-none font-text select-none">
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
            className="font-black text-white leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-text"
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
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (step / 5) * circumference;

  return (
    <div className="w-full h-full flex flex-col bg-[#111] text-white relative overflow-hidden">
      <SlideHeader 
        {...props} 
        slideIndex={index} 
        index={step} 
        total={slideCount} 
        hideDot={true} 
        handleColor={data.handleColor || "#71717a"} 
        counterColor={data.counterColor || "#a1a1aa"} 
        counterBg={data.counterBg || "#080808"} 
      />
      

      <div className="flex-1 p-10 pt-12 flex flex-col justify-center relative z-10">
        

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
            className="font-black leading-[0.9] uppercase tracking-tighter whitespace-pre-line text-white font-title"
            style={{ fontSize: `${69.23 * sTitle}px` }}
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
            className="text-white/80 font-light leading-relaxed w-[90%] font-text"
            style={{ fontSize: `${22.85 * sText}px` }}
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
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-row bg-[#FDFBF7] text-[#1a1a1a] relative overflow-hidden">
      <SlideHeader 
        {...props} 
        slideIndex={index} 
        index={step} 
        total={slideCount} 
        hideDot={true} 
        handleColor={data.handleColor || "#1a1a1a"} 
        counterColor={data.counterColor || "#1a1a1a"} 
        counterBg={data.counterBg || "#EDEDED"} 
      />
      <div 
        className="absolute top-0 right-[-10%] w-[60%] h-full opacity-30 z-0 pointer-events-none transition-colors duration-700 blur-[80px]"
        style={{fontFamily: textFont,  backgroundColor: brandColor }}
      />

      <div className="flex-1 h-full p-10 flex flex-col justify-center relative z-10 w-[70%]">
        

        

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
            className="font-black leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-text"
            style={{ fontSize: `${63.07 * sTitle}px`, color: '#1a1a1a' }}
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
            className="text-zinc-600 font-medium leading-relaxed w-[95%] font-text"
            style={{ fontSize: `${21.42 * sText}px` }}
          >
            {data.texto_apoio || 'O amador foca apenas na cobertura. O confeiteiro profissional entende a alma do produto.'}
          </TextWrapper>
        </SmartEl>
      </div>

      <div className="w-[30%] h-full flex flex-col items-end justify-between p-8 relative z-10">
        <div className="w-8 h-8 rounded-full border border-zinc-300 flex items-center justify-center">
          <span className="font-bold text-[10px] text-[#1a1a1a] font-text select-none">
            {step}/5
          </span>
        </div>
        <span className="font-black text-8xl leading-none text-[#1a1a1a]/40 drop-shadow-sm font-text select-none">
          0{step}
        </span>
      </div>
    </div>
  );
}

/**
 * COLEÇÃO: 10. The Editorial Spine
 */
export function SequenceVariant10(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-row bg-[#0A0A0A] text-white relative overflow-hidden">
      <SlideHeader 
        {...props} 
        slideIndex={index} 
        index={step} 
        total={slideCount} 
        hideDot={true} 
        handleColor={data.handleColor || "#71717a"} 
        counterColor={data.counterColor || "#a1a1aa"} 
        counterBg={data.counterBg || "#080808"} 
      />
      <div className="w-[75%] h-full p-10 flex flex-col justify-center relative z-10">
        

        <div className="w-8 h-[2px] mb-8" style={{fontFamily: textFont,  backgroundColor: brandColor }} />
        
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
            className="font-black leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-title"
            style={{ fontSize: `${69.23 * sTitle}px` }}
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
            className="text-white/80 font-light leading-relaxed w-[95%] font-text"
            style={{ fontSize: `${21.42 * sText}px` }}
          >
            {data.texto_apoio || 'O amador foca apenas na cobertura. O confeiteiro profissional entende a alma do produto.'}
          </TextWrapper>
        </SmartEl>
      </div>

      <div className="w-[25%] h-full flex items-center justify-center border-l border-white/10 relative z-10 bg-[#111]">
        <div 
          className="absolute top-0 right-0 w-full h-[6px] transition-all duration-700" 
          style={{fontFamily: textFont,  backgroundColor: step === slideCount ? brandColor : "transparent" }}
        />
        <span 
          className="font-black text-2xl uppercase tracking-[0.3em] whitespace-nowrap -rotate-90 origin-center transition-colors duration-500 font-text select-none"
          style={{fontFamily: textFont,  color: brandColor }}
        >
          ETAPA 0{step}
        </span>
      </div>
    </div>
  );
}

/**
 * COLEÇÃO: 11. The Image Anchor
 */
export function SequenceVariant11(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-col bg-[#FDFBF7] text-[#1a1a1a] relative overflow-hidden">
      <SlideHeader 
        {...props} 
        slideIndex={index} 
        index={step} 
        total={slideCount} 
        hideDot={true} 
        handleColor={data.handleColor || "#1a1a1a"} 
        counterColor={data.counterColor || "#1a1a1a"} 
        counterBg={data.counterBg || "#EDEDED"} 
      />
      <div className="w-full h-[45%] relative z-0">
        <ImageBg data={data} className="w-full h-full">
           <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
        </ImageBg>
        
      </div>

      <div className="absolute top-[45%] left-0 w-full h-[10px] z-10 -translate-y-1/2" style={{ backgroundColor: brandColor }} />

      <div className="absolute top-[45%] right-8 -translate-y-1/2 z-20">
        <div 
          className="px-6 py-2 rounded-full text-white shadow-xl flex items-center justify-center transition-colors duration-500"
          style={{ backgroundColor: brandColor }}
        >
          <span className="font-black text-[14px] uppercase tracking-widest font-text select-none">
            PASSO 0{step}
          </span>
        </div>
      </div>

      <div className="flex-1 p-10 pt-12 flex flex-col justify-center relative z-10 bg-[#FDFBF7]">
        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-5"
        >
          <TextWrapper 
            {...tw} 
            as="h2" 
            field="titulo" 
            className="font-black leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-title"
            style={{ fontSize: `${67.69 * sTitle}px`, color: '#1a1a1a' }}
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
            className="text-zinc-600 font-medium leading-relaxed w-[95%] font-text"
            style={{ fontSize: `${20 * sText}px` }}
          >
            {data.texto_apoio || 'O amador foca apenas na cobertura. O confeiteiro profissional entende a alma do produto.'}
          </TextWrapper>
        </SmartEl>
      </div>
    </div>
  );
}

/**
 * COLEÇÃO: 12. The Image Split (Editorial)
 */
export function SequenceVariant12(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-row bg-white text-[#1a1a1a] relative overflow-hidden">
      <SlideHeader 
        {...props} 
        slideIndex={index} 
        index={step} 
        total={slideCount} 
        hideDot={true} 
        handleColor={data.handleColor || "#1a1a1a"} 
        counterColor={data.counterColor || "#1a1a1a"} 
        counterBg={data.counterBg || "#EDEDED"} 
      />
      <div className="w-[45%] h-full relative z-0 border-r border-zinc-100">
        <ImageBg data={data} className="w-full h-full" />
      </div>

      <div className="absolute top-0 left-[45%] w-[4px] h-full bg-zinc-100 z-10">
        <div 
          className="w-full transition-all duration-700 ease-in-out" 
          style={{ 
            height: `${(step / Math.max(slideCount, 1)) * 100}%`,
            backgroundColor: brandColor 
          }}
        />
      </div>

      <div className="w-[55%] h-full p-10 pl-12 flex flex-col justify-center relative z-10 bg-white">
        

        <span className="font-black text-6xl text-zinc-100 mb-2 leading-none font-text select-none">
          0{step}
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
            className="font-black leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-text"
            style={{ fontSize: `${53.85 * sTitle}px`, color: '#1a1a1a' }}
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
            className="text-zinc-600 font-medium leading-relaxed w-[95%] font-text"
            style={{ fontSize: `${20 * sText}px` }}
          >
            {data.texto_apoio || 'O amador foca apenas na cobertura. O confeiteiro profissional entende a alma do produto.'}
          </TextWrapper>
        </SmartEl>
      </div>
    </div>
  );
}

/**
 * COLEÇÃO: 13. The Cinematic Step
 */
export function SequenceVariant13(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-col text-white relative overflow-hidden">
      <SlideHeader 
        {...props} 
        slideIndex={index} 
        index={step} 
        total={slideCount} 
        hideDot={true} 
        handleColor={data.handleColor || "#71717a"} 
        counterColor={data.counterColor || "#a1a1aa"} 
        counterBg={data.counterBg || "#080808"} 
      />
      <div className="absolute inset-0 z-0 scale-105">
        <ImageBg data={data} className="w-full h-full" />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

      

      <div className="flex-1 p-8 pb-12 flex flex-col justify-end relative z-20">
        <div className="flex items-center gap-4 mb-4">
          <div 
            className="font-black text-4xl leading-none transition-colors duration-500 font-text select-none"
            style={{fontFamily: textFont,  color: brandColor }}
          >
            0{step}.
          </div>
          <div className="h-px flex-1 bg-white/20" />
        </div>

        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-4"
        >
          <TextWrapper 
            {...tw} 
            as="h2" 
            field="titulo" 
            className="font-black leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-text"
            style={{ fontSize: `${53.85 * sTitle}px` }}
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
            className="text-white/80 font-light leading-relaxed w-full font-text"
            style={{ fontSize: `${20 * sText}px` }}
          >
            {data.texto_apoio || 'O amador foca apenas na cobertura. O confeiteiro profissional entende a alma do produto.'}
          </TextWrapper>
        </SmartEl>
      </div>
    </div>
  );
}

/**
 * COLEÇÃO: 14. The Image Frame
 */
export function SequenceVariant14(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-col bg-[#fdf9f3] text-[#1a1a1a] relative p-8 overflow-hidden">
      <SlideHeader 
        {...props} 
        slideIndex={index} 
        index={step} 
        total={slideCount} 
        hideDot={true} 
        handleColor={data.handleColor || "#1a1a1a"} 
        counterColor={data.counterColor || "#1a1a1a"} 
        counterBg={data.counterBg || "#EDEDED"} 
      />
      

      <div className="w-[85%] h-[40%] mt-8 mx-auto relative z-10">
        <div 
          className="absolute top-3 left-3 w-full h-full rounded-2xl transition-colors duration-500" 
          style={{fontFamily: textFont,  backgroundColor: brandColor }}
        />
        <div className="absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden border-2 border-white shadow-xl bg-zinc-100">
          <ImageBg data={data} className="w-full h-full" />
        </div>
        <div 
          className="absolute -bottom-4 -right-4 w-12 h-12 bg-[#1a1a1a] text-white rounded-full flex items-center justify-center font-black text-lg shadow-lg border-[3px] border-[#fdf9f3] font-text select-none"
        >
          {step}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end pt-8 pb-4 relative z-10 w-[90%] mx-auto text-center">
        <SmartEl 
          slideIndex={index} 
          field="tag" 
          position={data.positions?.tag || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'tag'}
          onSelectElement={onSelectElement}
          className="mb-2"
        >
          <TextWrapper 
            {...tw} 
            as="span" 
            field="tag" 
            className="text-[10px] font-bold tracking-widest uppercase"
            style={{fontFamily: titleFont,  color: brandColor }}
          >
            {data.tag || 'DICA'}
          </TextWrapper>
        </SmartEl>

        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-4"
        >
          <TextWrapper 
            {...tw} 
            as="h2" 
            field="titulo" 
            className="font-black leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-text"
            style={{ fontSize: `${53.85 * sTitle}px`, color: '#1a1a1a' }}
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
            className="text-zinc-600 font-medium leading-relaxed w-full font-text"
            style={{ fontSize: `${21.43 * sText}px` }}
          >
            {data.texto_apoio || 'O amador foca apenas na cobertura. O confeiteiro profissional entende a alma do produto.'}
          </TextWrapper>
        </SmartEl>
      </div>
    </div>
  );
}

/**
 * COLEÇÃO: 15. The Magazine Bleed
 */
export function SequenceVariant15(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-col bg-white text-[#1a1a1a] relative overflow-hidden">
      <SlideHeader 
        {...props} 
        slideIndex={index} 
        index={step} 
        total={slideCount} 
        hideDot={true} 
        handleColor={data.handleColor || "#1a1a1a"} 
        counterColor={data.counterColor || "#1a1a1a"} 
        counterBg={data.counterBg || "#EDEDED"} 
      />
      <div className="w-full h-[50%] relative z-0">
        <ImageBg data={data} className="w-full h-full" />
        
      </div>

      <div className="flex-1 flex flex-row z-10">
        <div 
          className="w-[30%] flex items-center justify-center border-r border-zinc-200 transition-colors duration-500 bg-zinc-50"
          style={{fontFamily: textFont,  color: brandColor }}
        >
          <span className="font-black text-6xl leading-none font-text select-none">
            0{step}
          </span>
        </div>

        <div className="w-[70%] p-8 flex flex-col justify-center">
          <SmartEl 
            slideIndex={index} 
            field="titulo" 
            position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
            onActionStart={onActionStart}
            isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
            onSelectElement={onSelectElement}
            className="mb-4"
          >
            <TextWrapper 
              {...tw} 
              as="h2" 
              field="titulo" 
              className="font-black leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-text"
              style={{ fontSize: `${69.23 * sTitle}px`, color: '#1a1a1a' }}
            >
              {(data.titulo || 'A ESCOLHA\nDOS GRÃOS').replace(" ", "\n")}
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
              className="text-zinc-600 font-medium leading-relaxed w-[95%] font-text"
              style={{ fontSize: `${21.43 * sText}px` }}
            >
              {data.texto_apoio || 'O amador foca apenas na cobertura. O confeiteiro profissional entende a alma do produto.'}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>
    </div>
  );
}

/**
 * COLEÇÃO: 16. The Anchor Bottom
 */
export function SequenceVariant16(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-col bg-[#FDFBF7] text-[#1a1a1a] relative overflow-hidden">
      <SlideHeader 
        {...props} 
        slideIndex={index} 
        index={step} 
        total={slideCount} 
        hideDot={true} 
        handleColor={data.handleColor || "#1a1a1a"} 
        counterColor={data.counterColor || "#1a1a1a"} 
        counterBg={data.counterBg || "#EDEDED"} 
      />
      <div className="flex-1 p-8 pt-12 flex flex-col justify-start">
        

        

        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-4"
        >
          <TextWrapper 
            {...tw} 
            as="h2" 
            field="titulo" 
            className="font-black leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-text"
            style={{ fontSize: `${69.23 * sTitle}px` }}
          >
            {(data.titulo || 'A ESCOLHA\nDOS GRÃOS').replace(" ", "\n")}
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
            className="text-zinc-600 font-medium leading-relaxed w-[90%] font-text"
            style={{ fontSize: `${21.43 * sText}px` }}
          >
            {data.texto_apoio || 'O amador foca apenas na cobertura. O confeiteiro profissional entende a alma do produto.'}
          </TextWrapper>
        </SmartEl>
      </div>

      <div className="w-full h-[35%] flex flex-col justify-between p-8 relative transition-colors duration-500" style={{fontFamily: textFont,  backgroundColor: brandColor }}>
        <div className="absolute top-0 left-0 h-[3px] bg-white/20 w-full z-0">
          <div 
            className="h-full bg-white transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{ width: `${(step / Math.max(slideCount, 1)) * 100}%` }}
          />
        </div>
        
        <div className="mt-auto flex justify-between items-end z-10 w-full">
          <span className="font-bold tracking-widest text-[10px] text-white/60 uppercase mb-2 font-text select-none">
            Fase Atual
          </span>
          <span className="font-light text-white/40 text-7xl tracking-tighter leading-none font-text select-none">
            0{step}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * COLEÇÃO: 17. The Corner Bottom
 */
export function SequenceVariant17(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-col bg-[#050505] text-white relative overflow-hidden">
      <SlideHeader 
        {...props} 
        slideIndex={index} 
        index={step} 
        total={slideCount} 
        hideDot={true} 
        handleColor={data.handleColor || "#71717a"} 
        counterColor={data.counterColor || "#a1a1aa"} 
        counterBg={data.counterBg || "#080808"} 
      />
      <div className="flex-1 p-10 pt-12 flex flex-col justify-start relative z-0">
        

        

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
            className="font-black leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-title"
            style={{ fontSize: `${53.85 * sTitle}px` }}
          >
            {(data.titulo || 'A ESCOLHA\nDOS GRÃOS').replace(" ", "\n")}
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
            className="text-white/80 font-medium leading-relaxed w-[90%] font-text"
            style={{ fontSize: `${21.43 * sText}px` }}
          >
            {data.texto_apoio || 'O amador foca apenas na cobertura. O confeiteiro profissional entende a alma do produto.'}
          </TextWrapper>
        </SmartEl>
      </div>

      <div 
        className="absolute bottom-0 right-0 w-[120px] h-[120px] flex flex-col items-center justify-center rounded-tl-[40px] shadow-[-10px_-10px_30px_rgba(0,0,0,0.5)] transition-colors duration-500 z-10"
        style={{fontFamily: textFont,  backgroundColor: brandColor }}
      >
        <span className="font-bold text-[10px] tracking-widest text-white/60 uppercase mb-1 font-text select-none">
          PASSO
        </span>
        <span className="font-black text-5xl text-white leading-none font-text select-none">
          0{step}
        </span>
      </div>
    </div>
  );
}

/**
 * COLEÇÃO: 18. The Split Bottom
 */
export function SequenceVariant18(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-row bg-white text-[#1a1a1a] relative overflow-hidden">
      <SlideHeader 
        {...props} 
        slideIndex={index} 
        index={step} 
        total={slideCount} 
        hideDot={true} 
        handleColor={data.handleColor || "#1a1a1a"} 
        counterColor={data.counterColor || "#ffffff"} 
        counterBg={data.counterBg || "rgb(10 10 10 / 0.3)"} 
      />
      <div className="w-[60%] h-full p-10 flex flex-col justify-center relative z-0 border-r border-zinc-100">
        

        

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
            className="text-zinc-700 font-medium leading-relaxed w-[95%] font-text"
            style={{ fontSize: `${24.28 * sText}px` }}
          >
            {data.texto_apoio || 'O amador foca apenas na cobertura. O confeiteiro profissional entende a alma do produto.'}
          </TextWrapper>
        </SmartEl>
      </div>

      <div 
        className="w-[40%] h-full p-8 flex flex-col justify-between text-right relative z-10 transition-colors duration-500"
        style={{fontFamily: textFont,  backgroundColor: brandColor }}
      >
        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mt-4"
        >
          <TextWrapper 
            {...tw} 
            as="h2" 
            field="titulo" 
            className="font-black text-white leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-text"
            style={{ fontSize: `${53.85 * sTitle}px` }}
          >
            {(data.titulo || 'A ESCOLHA\nDOS GRÃOS').replace(" ", "\n")}
          </TextWrapper>
        </SmartEl>

        <span className="font-black text-white/40 text-[90px] leading-[0.75] -mr-2 font-text select-none">
          0{step}
        </span>
      </div>
    </div>
  );
}

/**
 * COLEÇÃO: 19. The Cinematic Panel
 */
export function SequenceVariant19(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-col relative bg-[#0A0A0A] text-white overflow-hidden">
      <SlideHeader 
        {...props} 
        slideIndex={index} 
        index={step} 
        total={slideCount} 
        hideDot={true} 
        handleColor={data.handleColor || "#71717a"} 
        counterColor={data.counterColor || "#a1a1aa"} 
        counterBg={data.counterBg || "#080808"} 
      />
      <div className="w-full h-[50%] relative z-0">
        <ImageBg data={data} className="w-full h-full">
           <div className="absolute inset-0 bg-black/10" />
        </ImageBg>
        
      </div>

      <div className="absolute top-[50%] left-8 -translate-y-1/2 z-20 flex items-center">
        <div 
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-colors duration-500 border-4 border-[#0A0A0A]"
          style={{fontFamily: textFont,  backgroundColor: brandColor }}
        >
          <span className="font-black text-[16px] text-white font-text select-none">
            0{step}
          </span>
        </div>
      </div>

      <div className="flex-1 p-8 pt-12 flex flex-col justify-end relative z-10">
        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-4"
        >
          <TextWrapper 
            {...tw} 
            as="h2" 
            field="titulo" 
            className="font-black leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-title"
            style={{ fontSize: `${53.85 * sTitle}px` }}
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
            className="text-white/80 font-light leading-relaxed w-full font-text"
            style={{ fontSize: `${21.43 * sText}px` }}
          >
            {data.texto_apoio || 'O amador foca apenas na cobertura. O confeiteiro profissional entende a alma do produto.'}
          </TextWrapper>
        </SmartEl>
      </div>
    </div>
  );
}

/**
 * COLEÇÃO: 20. The Ghost Light
 */
export function SequenceVariant20(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-col bg-[#FDFBF7] text-[#1a1a1a] relative overflow-hidden">
      <SlideHeader 
        {...props} 
        slideIndex={index} 
        index={step} 
        total={slideCount} 
        hideDot={true} 
        handleColor={data.handleColor || "#1a1a1a"} 
        counterColor={data.counterColor || "#1a1a1a"} 
        counterBg={data.counterBg || "#EDEDED"} 
      />
      <div 
        className="absolute right-[-10%] top-1/2 -translate-y-1/2 font-black opacity-[0.15] select-none pointer-events-none transition-all duration-700 font-text"
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
            className="font-black leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-text"
            style={{ fontSize: `${53.85 * sTitle}px`, color: '#1a1a1a' }}
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
            className="text-zinc-600 font-medium leading-relaxed w-full font-text"
            style={{ fontSize: `${20 * sText}px` }}
          >
            {data.texto_apoio || 'O amador foca apenas na cobertura. O confeiteiro profissional entende a alma do produto.'}
          </TextWrapper>
        </SmartEl>
      </div>

      
    </div>
  );
}

/**
 * COLEÇÃO: 21. The Orbital Light
 */
export function SequenceVariant21(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (step / 5) * circumference;

  return (
    <div className="w-full h-full flex flex-col bg-[#FDFBF7] text-[#1a1a1a] relative overflow-hidden">
      <SlideHeader 
        {...props} 
        slideIndex={index} 
        index={step} 
        total={slideCount} 
        hideDot={true} 
        handleColor={data.handleColor || "#1a1a1a"} 
        counterColor={data.counterColor || "#1a1a1a"} 
        counterBg={data.counterBg || "#EDEDED"} 
      />
      

      <div className="flex-1 p-10 pt-16 flex flex-col justify-start relative z-10">
        

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
            className="font-black leading-[0.9] uppercase tracking-tighter whitespace-pre-line text-[#1a1a1a] font-text"
            style={{ fontSize: `${53.85 * sTitle}px` }}
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
            className="text-zinc-600 font-medium leading-relaxed w-[90%] font-text"
            style={{ fontSize: `${21.43 * sText}px` }}
          >
            {data.texto_apoio || 'O amador foca apenas na cobertura. O confeiteiro profissional entende a alma do produto.'}
          </TextWrapper>
        </SmartEl>
      </div>

      
    </div>
  );
}

/**
 * COLEÇÃO: 22. The Clean Polaroid
 */
export function SequenceVariant22(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-col bg-white text-[#1a1a1a] relative overflow-hidden">
      <SlideHeader 
        {...props} 
        slideIndex={index} 
        index={step} 
        total={slideCount} 
        hideDot={true} 
        handleColor={data.handleColor || "#1a1a1a"} 
        counterColor={data.counterColor || "#1a1a1a"} 
        counterBg={data.counterBg || "#EDEDED"} 
      />
      <div 
        className="absolute top-0 left-0 w-full h-[6px] z-20 transition-colors duration-500" 
        style={{fontFamily: textFont,  backgroundColor: brandColor }}
      />
      
      <div className="w-full h-[50%] relative overflow-hidden bg-zinc-200">
        <ImageBg data={data} className="w-full h-full" />
      </div>

      <div className="flex-1 p-8 flex flex-col justify-end relative z-10 bg-white">
        <div className="flex items-center gap-3 mb-6">
          
          <div className="h-px flex-1 bg-zinc-200" />
          
        </div>

        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-4"
        >
          <TextWrapper 
            {...tw} 
            as="h2" 
            field="titulo" 
            className="font-black leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-text"
            style={{ fontSize: `${53.85 * sTitle}px`, color: '#1a1a1a' }}
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
            className="text-zinc-600 font-medium leading-relaxed w-[95%] font-text"
            style={{ fontSize: `${21.43 * sText}px` }}
          >
            {data.texto_apoio || 'O amador foca apenas na cobertura. O confeiteiro profissional entende a alma do produto.'}
          </TextWrapper>
        </SmartEl>
      </div>
    </div>
  );
}

/**
 * COLEÇÃO: 23. The Single Frame
 */
export function SequenceVariant23(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-col bg-[#FDFBF7] text-[#1a1a1a] relative p-8 overflow-hidden">
      <SlideHeader 
        {...props} 
        slideIndex={index} 
        index={step} 
        total={slideCount} 
        hideDot={true} 
        handleColor={data.handleColor || "#1a1a1a"} 
        counterColor={data.counterColor || "#1a1a1a"} 
        counterBg={data.counterBg || "#EDEDED"} 
      />
      

      <div className="w-[85%] h-[40%] mt-8 mx-auto relative z-10">
        <div className="absolute top-0 left-0 w-full h-full rounded-xl overflow-hidden border-[6px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
          <ImageBg data={data} className="w-full h-full" />
        </div>
        <div 
          className="absolute -bottom-5 right-6 px-5 py-2 text-white rounded-full flex items-center justify-center font-black text-[11px] uppercase tracking-widest shadow-xl transition-colors duration-500 font-text select-none"
          style={{fontFamily: textFont,  backgroundColor: brandColor }}
        >
          Passo 0{step}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end pt-8 pb-4 relative z-10 w-[90%] mx-auto">
        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-4"
        >
          <TextWrapper 
            {...tw} 
            as="h2" 
            field="titulo" 
            className="font-black leading-[0.9] uppercase tracking-tighter font-text"
            style={{ fontSize: `${53.85 * sTitle}px`, color: '#1a1a1a' }}
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
            className="text-zinc-600 font-medium leading-relaxed w-full font-text"
            style={{ fontSize: `${21.43 * sText}px` }}
          >
            {data.texto_apoio || 'O amador foca apenas na cobertura. O confeiteiro profissional entende a alma do produto.'}
          </TextWrapper>
        </SmartEl>
      </div>
    </div>
  );
}

/**
 * COLEÇÃO: 24. The Elevated Base
 */
export function SequenceVariant24(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-col bg-white text-[#1a1a1a] relative overflow-hidden">
      <SlideHeader 
        {...props} 
        slideIndex={index} 
        index={step} 
        total={slideCount} 
        hideDot={true} 
        handleColor={data.handleColor || "#1a1a1a"} 
        counterColor={data.counterColor || "#1a1a1a"} 
        counterBg={data.counterBg || "#EDEDED"} 
      />
      <div className="absolute top-0 left-0 w-full h-[3px] bg-zinc-100 z-20">
        <div 
          className="h-full transition-all duration-700 ease-in-out shadow-[0_0_10px_currentColor]" 
          style={{ 
            width: `${(step / Math.max(slideCount, 1)) * 100}%`,
            backgroundColor: brandColor,
            color: brandColor
          }}
        />
      </div>

      <div className="w-full h-[55%] relative z-0">
        <ImageBg data={data} className="w-full h-full" />
        
      </div>

      <div 
        className="w-[85%] mx-auto bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] p-8 flex flex-col -mt-12 relative z-10 border border-zinc-100 mb-8 flex-1 justify-center"
      >
        <div className="flex items-center gap-4 mb-4">
          <span 
            className="font-black text-3xl font-text select-none"
            style={{fontFamily: textFont,  color: brandColor }}
          >
            0{step}.
          </span>
          <div className="h-px flex-1 bg-zinc-100" />
        </div>

        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-4"
        >
          <TextWrapper 
            {...tw} 
            as="h2" 
            field="titulo" 
            className="font-black leading-[0.9] uppercase tracking-tighter font-text"
            style={{ fontSize: `${53.85 * sTitle}px`, color: '#1a1a1a' }}
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
            className="text-zinc-500 font-medium leading-relaxed font-text"
            style={{ fontSize: `${21.43 * sText}px` }}
          >
            {data.texto_apoio || 'O amador foca apenas na cobertura. O confeiteiro profissional entende a alma do produto.'}
          </TextWrapper>
        </SmartEl>
      </div>
    </div>
  );
}

/**
 * COLEÇÃO: 25. The Tab Bottom
 */
export function SequenceVariant25(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  const tabs = [1, 2, 3, 4, 5];

  return (
    <div className="w-full h-full flex flex-col bg-[#FDFBF7] text-[#1a1a1a] relative overflow-hidden">
      <SlideHeader 
        {...props} 
        slideIndex={index} 
        index={step} 
        total={slideCount} 
        hideDot={true} 
        handleColor={data.handleColor || "#1a1a1a"} 
        counterColor={data.counterColor || "#1a1a1a"} 
        counterBg={data.counterBg || "#EDEDED"} 
      />
      <div className="flex-1 p-10 flex flex-col justify-center relative bg-white">
        

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
            className="font-black leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-text"
            style={{ fontSize: `${53.85 * sTitle}px`, color: '#1a1a1a' }}
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
            className="text-zinc-600 font-medium leading-relaxed w-[95%] font-text"
            style={{ fontSize: `${21.43 * sText}px` }}
          >
            {data.texto_apoio || 'O amador foca apenas na cobertura. O confeiteiro profissional entende a alma do produto.'}
          </TextWrapper>
        </SmartEl>
      </div>

      <div className="flex w-full h-[12%] border-t border-zinc-200">
        {tabs.map((i) => (
          <div 
            key={i} 
            className={`flex-1 flex items-center justify-center border-b-[6px] transition-all duration-300 ${i === step ? "bg-white shadow-sm z-10" : "bg-transparent"}`}
            style={{fontFamily: textFont,  borderColor: i === step ? brandColor : "transparent" }}
          >
            <span className={`font-black text-[14px] font-text ${i === step ? "text-[#1a1a1a]" : "text-zinc-300"}`}>
              0{i}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * COLEÇÃO: 26. The Float Top
 */
export function SequenceVariant26(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-col bg-[#FDFBF7] text-[#1a1a1a] p-8 relative overflow-hidden">
      <SlideHeader 
        {...props} 
        slideIndex={index} 
        index={step} 
        total={slideCount} 
        hideDot={true} 
        handleColor={data.handleColor || "#1a1a1a"} 
        counterColor={data.counterColor || "#1a1a1a"} 
        counterBg={data.counterBg || "#EDEDED"} 
      />
      

      <div className="w-full h-[45%] mt-8 rounded-2xl overflow-hidden shadow-2xl relative z-10 bg-zinc-100">
        <ImageBg data={data} className="w-full h-full" />
      </div>

      <div className="flex-1 flex flex-col justify-end pt-8 pb-2 relative z-10 w-full">
        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-4"
        >
          <TextWrapper 
            {...tw} 
            as="h2" 
            field="titulo" 
            className="font-black leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-text"
            style={{ fontSize: `${53.85 * sTitle}px`, color: '#1a1a1a' }}
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
            className="text-zinc-600 font-medium leading-relaxed w-full font-text"
            style={{ fontSize: `${21.43 * sText}px` }}
          >
            {data.texto_apoio || 'O amador foca apenas na cobertura. O confeiteiro profissional entende a alma do produto.'}
          </TextWrapper>
        </SmartEl>
      </div>
    </div>
  );
}

/**
 * COLEÇÃO: 27. The Float Bottom
 */
export function SequenceVariant27(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-col bg-[#FDFBF7] text-[#1a1a1a] p-8 relative overflow-hidden">
      <SlideHeader 
        {...props} 
        slideIndex={index} 
        index={step} 
        total={slideCount} 
        hideDot={true} 
        handleColor={data.handleColor || "#1a1a1a"} 
        counterColor={data.counterColor || "#1a1a1a"} 
        counterBg={data.counterBg || "#EDEDED"} 
      />
      <div className="flex-1 flex flex-col justify-start pt-4 pb-4 relative z-10 w-full">
        <div className="flex justify-between items-center mb-8">
          
        </div>

        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-4"
        >
          <TextWrapper 
            {...tw} 
            as="h2" 
            field="titulo" 
            className="font-black leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-text"
            style={{ fontSize: `${53.85 * sTitle}px`, color: '#1a1a1a' }}
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
            className="text-zinc-600 font-medium leading-relaxed w-full font-text"
            style={{ fontSize: `${21.43 * sText}px` }}
          >
            {data.texto_apoio || 'O amador foca apenas na cobertura. O confeiteiro profissional entende a alma do produto.'}
          </TextWrapper>
        </SmartEl>
      </div>

      <div className="w-full h-[45%] mb-4 rounded-2xl overflow-hidden shadow-2xl relative z-10 bg-zinc-100">
        <ImageBg data={data} className="w-full h-full" />
      </div>
    </div>
  );
}

/**
 * COLEÇÃO: 28. The Editorial Capsule
 */
export function SequenceVariant28(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-row bg-white text-[#1a1a1a] relative overflow-hidden">
      <SlideHeader 
        {...props} 
        slideIndex={index} 
        index={step} 
        total={slideCount} 
        hideDot={true} 
        handleColor={data.handleColor || "#1a1a1a"} 
        counterColor={data.counterColor || "#1a1a1a"} 
        counterBg={data.counterBg || "#EDEDED"} 
      />
      <div 
        className="w-[35%] h-full transition-colors duration-500 relative z-0"
        style={{fontFamily: textFont,  backgroundColor: brandColor }}
      />
      <div className="w-[65%] h-full bg-[#FDFBF7] relative z-0" />

      <div className="absolute top-1/2 left-[35%] -translate-x-1/2 -translate-y-1/2 w-[45%] h-[75%] rounded-[100px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-[8px] border-white z-10 bg-zinc-100">
        <ImageBg data={data} className="w-full h-full" />
      </div>

      

      <div className="absolute top-1/2 right-6 -translate-y-1/2 w-[48%] flex flex-col z-20">
        

        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-4"
        >
          <TextWrapper 
            {...tw} 
            as="h2" 
            field="titulo" 
            className="font-black leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-text"
            style={{ fontSize: `${53.85 * sTitle}px`, color: '#1a1a1a' }}
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
            className="text-zinc-600 font-medium leading-relaxed w-full font-text"
            style={{ fontSize: `${20 * sText}px` }}
          >
            {data.texto_apoio || 'O amador foca apenas na cobertura. O confeiteiro profissional entende a alma do produto.'}
          </TextWrapper>
        </SmartEl>
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
  9: SequenceVariant10,
  10: SequenceVariant11,
  11: SequenceVariant12,
  12: SequenceVariant13,
  13: SequenceVariant14,
  14: SequenceVariant15,
  15: SequenceVariant16,
  16: SequenceVariant17,
  17: SequenceVariant18,
  18: SequenceVariant19,
  19: SequenceVariant20,
  20: SequenceVariant21,
  21: SequenceVariant22,
  22: SequenceVariant23,
  23: SequenceVariant24,
  24: SequenceVariant25,
  25: SequenceVariant26,
  26: SequenceVariant27,
  27: SequenceVariant28,
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
  { id: 9, name: 'Editorial Spine', badge: 'NEW' },
  { id: 10, name: 'Image Anchor', badge: 'NEW' },
  { id: 11, name: 'Editorial Split', badge: 'NEW' },
  { id: 12, name: 'Cinematic Step', badge: 'NEW' },
  { id: 13, name: 'Image Frame', badge: 'NEW' },
  { id: 14, name: 'Magazine Bleed', badge: 'NEW' },
  { id: 15, name: 'Anchor Bottom', badge: 'NEW' },
  { id: 16, name: 'Corner Bottom', badge: 'NEW' },
  { id: 17, name: 'Split Bottom', badge: 'NEW' },
  { id: 18, name: 'Cinematic Panel', badge: 'NEW' },
  { id: 19, name: 'Ghost Light', badge: 'NEW' },
  { id: 20, name: 'Orbital Light', badge: 'NEW' },
  { id: 21, name: 'Clean Polaroid', badge: 'NEW' },
  { id: 22, name: 'Single Frame', badge: 'NEW' },
  { id: 23, name: 'Elevated Base', badge: 'NEW' },
  { id: 24, name: 'Tab Bottom', badge: 'NEW' },
  { id: 25, name: 'Float Top', badge: 'NEW' },
  { id: 26, name: 'Float Bottom', badge: 'NEW' },
  { id: 27, name: 'Editorial Capsule', badge: 'NEW' },
];
