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
      className={`bg-cover ${className}`}
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
    <div className="w-full h-full flex flex-col bg-[#FAF7F2] text-[#1a1a1a] relative overflow-hidden">
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
      <div className="w-full h-[45%] flex flex-col justify-between p-8 relative " style={{ backgroundColor: brandColor }}>
        
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
            className="h-full bg-white "
            style={{ width: `${(step / Math.max(slideCount, 1)) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex-1 p-8 flex flex-col justify-center">
        <div 
          className="mb-8" 
          style={{ 
            width: '200px', 
            height: '1px', 
            backgroundColor: 'rgb(228 228 231 / var(--tw-bg-opacity, 1))' 
          }} 
        />
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
 * COLEÇÃO: 3. The Minimal Corner
 */
export function SequenceVariant3(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-col bg-[#FAF7F2] text-[#1a1a1a] relative overflow-hidden">
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
        className="absolute top-0 right-0 w-[100px] h-[100px] flex flex-col items-center justify-center rounded-bl-[40px] z-10 overflow-hidden"
        style={{ boxShadow: `-10px 10px 30px ${brandColor}4D` }}
      >
        <div 
          className="absolute inset-0 opacity-90 z-0"
          style={{ backgroundColor: brandColor }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center">
          <span className="font-bold text-[10px] tracking-widest text-white/60 uppercase mb-1 font-text select-none">
            PASSO
          </span>
          <span className="font-black text-4xl text-white leading-none font-text select-none">
            0{step}
          </span>
        </div>
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
            className="font-black leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-title text-[#1a1a1a]"
            style={{ fontSize: `${69.23 * sTitle}px` }}
          >
            {data.titulo || 'O PONTO\nPERFEITO'}
          </TextWrapper>
        </SmartEl>

        <div className="w-12 h-1 bg-zinc-200 mb-6 rounded-full" />

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
    <div className="w-full h-full flex flex-col bg-[#FAF7F2] text-[#1a1a1a] relative overflow-hidden">
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
        <div 
          className="mb-6" 
          style={{ 
            width: '3rem', 
            height: '0.25rem', 
            backgroundColor: 'rgb(228 228 231 / var(--tw-bg-opacity, 1))' 
          }} 
        />
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
            className="font-black leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-text text-[#1A1A1A]"
            style={{ fontSize: `${69.23 * sTitle}px` }}
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
            className="text-[#1A1A1A] font-medium leading-relaxed w-[95%] font-text"
            style={{ fontSize: `${25.71 * sText}px` }}
          >
            {data.texto_apoio || 'O desfecho ou a conclusão da sequência, focando no resultado final.'}
          </TextWrapper>
        </SmartEl>
      </div>

      <div 
        className="h-[20%] w-full flex items-end px-8 pb-8 gap-3 relative z-10 "
        style={{ backgroundColor: brandColor, boxShadow: `0 -20px 40px ${brandColor}33` }}
      >
        {stepsToShow.map((i) => (
          <div key={i} className="flex-1 flex flex-col gap-2.5">
            <div 
              className={`h-[4px] w-full rounded-full ${i === step ? "opacity-100 scale-100" : "opacity-40 scale-95"}`}
              style={{fontFamily: textFont,  backgroundColor: "#ffffff" }}
            />
            <span 
              className={`font-black text-[11px] uppercase tracking-widest font-text ${i === step ? "text-white" : "text-white/30"}`}
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
            className={`flex-1 flex items-center justify-center border-t-[6px] ${i === step ? "bg-white shadow-sm" : "bg-transparent"}`}
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
          field="tag" 
          position={data.positions?.tag || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'tag'}
          onSelectElement={onSelectElement}
          className="mb-4 self-start"
        >
          <TextWrapper 
            {...tw} 
            as="span" 
            field="tag" 
            className="text-white font-bold px-2 py-0.5 rounded text-[11px] outline-none uppercase tracking-wide"
            style={{fontFamily: tagFont,  backgroundColor: brandColor }}
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
            className="text-[#1a1a1a] font-medium leading-relaxed w-[95%] font-text"
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
        className="absolute right-[-10%] top-1/2 -translate-y-1/2 font-black opacity-[0.15] select-none pointer-events-none font-text"
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
        <div 
          className="mb-6" 
          style={{ 
            width: '2rem', 
            height: '0.16rem', 
            backgroundColor: brandColor 
          }} 
        />
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
      <div className="w-[60%] h-full p-10 flex flex-col justify-center relative z-0 border-r border-zinc-100 bg-[#faf7f2]">
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
            className="font-black text-[#1a1a1a] leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-text"
            style={{ fontSize: `${50 * sTitle}px` }}
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
            className="text-zinc-700 font-medium leading-relaxed w-[95%] font-text"
            style={{ fontSize: `${19 * sText}px` }}
          >
            {data.texto_apoio || 'O amador foca apenas na cobertura. O confeiteiro profissional entende a alma do produto.'}
          </TextWrapper>
        </SmartEl>
      </div>

      <div 
        className="w-[40%] h-full p-8 flex flex-col justify-between text-right relative z-10 "
        style={{fontFamily: textFont,  backgroundColor: brandColor }}
      >
        <span className="font-black text-white/40 text-7xl leading-none font-text select-none">
          0{step}
        </span>
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
        className="absolute top-0 right-[-10%] w-[60%] h-full opacity-30 z-0 pointer-events-none blur-[80px]"
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
          className="absolute top-0 right-0 w-full h-[6px] " 
          style={{fontFamily: textFont,  backgroundColor: step === slideCount ? brandColor : "transparent" }}
        />
        <span 
          className="font-black text-2xl uppercase tracking-[0.3em] whitespace-nowrap -rotate-90 origin-center font-text select-none"
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
    <div className="w-full h-full flex flex-col bg-[#faf7f2] text-[#1a1a1a] relative overflow-hidden">
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

      <div className="absolute top-[49%] left-0 w-full h-[8px] z-10 -translate-y-1/2" style={{ backgroundColor: brandColor }} />

      <div className="absolute top-[49%] right-8 -translate-y-1/2 z-20">
        <div 
          className="px-6 py-2 rounded-full text-white shadow-xl flex items-center justify-center "
          style={{ backgroundColor: brandColor }}
        >
          <span className="font-black text-[14px] uppercase tracking-widest font-text select-none">
            PASSO 0{step}
          </span>
        </div>
      </div>

      <div className="flex-1 p-10 pt-0 flex flex-col justify-center relative z-10 bg-[#faf7f2]">
        <div 
          className="mb-6" 
          style={{ 
            width: '3rem', 
            height: '0.25rem', 
            backgroundColor: 'rgb(228 228 231 / var(--tw-bg-opacity, 1))' 
          }} 
        />
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
      <div className="w-[50%] h-full relative z-0 border-r border-zinc-100">
        <ImageBg data={data} className="w-full h-full" />
      </div>

      <div className="absolute top-0 left-[50%] w-[4px] h-full bg-zinc-100 z-10">
        <div 
          className="w-full " 
          style={{ 
            height: `${(step / Math.max(slideCount, 1)) * 100}%`,
            backgroundColor: brandColor 
          }}
        />
      </div>

      <div className="w-[50%] h-full p-10 pl-7 flex flex-col justify-center relative z-10 bg-white">
        

        <span 
          className="font-black text-6xl mb-2 leading-none font-text select-none opacity-40"
          style={{ color: brandColor }}
        >
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
            style={{ fontSize: `${52 * sTitle}px`, color: '#1a1a1a' }}
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
        <div 
          className="mt-6" 
          style={{ 
            width: '3rem', 
            height: '0.25rem', 
            backgroundColor: 'rgb(228 228 231 / var(--tw-bg-opacity, 1))' 
          }} 
        />
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
        handleColor={data.handleColor || "#ffffff"} 
      />      <div className="absolute inset-0 z-0 scale-105">
        <ImageBg data={data} className="w-full h-full" />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

      

      <div className="flex-1 p-8 pb-12 flex flex-col justify-end relative z-20">
        <div className="flex items-center gap-4 mb-4">
          <div 
            className="font-black text-4xl leading-none font-text select-none"
            style={{fontFamily: textFont,  color: brandColor }}
          >
            0{step}.
          </div>
          <div className="h-px flex-1 bg-white/20 translate-y-[4px]" />
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
    <div className="w-full h-full flex flex-col bg-[#faf7f2] text-[#1a1a1a] relative p-8 overflow-hidden">
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
          className="absolute top-3 left-3 w-full h-full rounded-2xl " 
          style={{fontFamily: textFont,  backgroundColor: brandColor }}
        />
        <div 
          className="absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden border-2 border-white bg-zinc-100"
          style={{ boxShadow: `0 20px 40px ${brandColor}33` }}
        >
          <ImageBg data={data} className="w-full h-full" />
        </div>
        <div 
          className="absolute -bottom-4 -right-4 w-12 h-12 bg-[#ffffff] text-[#1A1A1A] rounded-full flex items-center justify-center font-black text-lg shadow-lg border-[3px] font-text select-none"
          style={{ borderColor: brandColor }}
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
    <div className="w-full h-full flex flex-col bg-[#faf7f2] text-[#1a1a1a] relative overflow-hidden">
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
      <div className="w-full h-[45%] relative z-0 bg-zinc-100 flex items-center justify-center overflow-hidden">
        <ImageBg data={data} className="w-full h-full" />
      </div>

      <div className="w-full h-[10px] z-10" style={{ backgroundColor: brandColor }} />

      <div className="h-[55%] flex flex-row z-10">
        <div 
          className="w-[30%] flex items-center justify-center border-r border-zinc-200 bg-zinc-50"
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
    <div className="w-full h-full flex flex-col bg-[#faf7f2] text-[#1a1a1a] relative overflow-hidden">
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

      <div className="w-full h-[35%] flex flex-col justify-between p-8 relative " style={{fontFamily: textFont,  backgroundColor: brandColor }}>
        <div className="absolute top-0 left-0 h-[3px] bg-white/20 w-full z-0">
          <div 
            className="h-full bg-white "
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
    <div className="w-full h-full flex flex-col bg-[#faf7f2] text-[#1a1a1a] relative overflow-hidden">
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
      <div className="flex-1 p-10 pt-[128px] flex flex-col justify-start relative z-0">
        

        

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
            className="font-black leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-title text-[#1a1a1a]"
            style={{ fontSize: `${53.85 * sTitle}px` }}
          >
            {(data.titulo || 'A ESCOLHA\nDOS GRÃOS').replace(" ", "\n")}
          </TextWrapper>
        </SmartEl>

        <div className="w-12 h-1 bg-zinc-200 mb-6 rounded-full" />

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
            style={{ fontSize: `${21.43 * sText}px` }}
          >
            {data.texto_apoio || 'O amador foca apenas na cobertura. O confeiteiro profissional entende a alma do produto.'}
          </TextWrapper>
        </SmartEl>
      </div>

      <div 
        className="absolute bottom-0 right-0 w-[120px] h-[120px] flex flex-col items-center justify-center rounded-tl-[30px] shadow-[-10px_-10px_30px_rgba(0,0,0,0.1)] z-10 overflow-hidden"
      >
        <div 
          className="absolute inset-0 opacity-90 z-0"
          style={{ backgroundColor: brandColor }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center">
          <span className="font-bold text-[10px] tracking-widest text-white/60 uppercase mb-1 font-text select-none">
            PASSO
          </span>
          <span className="font-black text-5xl text-white leading-none font-text select-none">
            0{step}
          </span>
        </div>
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
      <div className="w-[60%] h-full p-10 flex flex-col justify-center relative z-0 border-r border-zinc-100 bg-[#faf7f2]">
        <div 
          className="mb-6 rounded-full" 
          style={{ 
            width: '3rem', 
            height: '0.25rem', 
            backgroundColor: 'rgb(228 228 231 / var(--tw-bg-opacity, 1))' 
          }} 
        />
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
            className="font-black text-[#1a1a1a] leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-text"
            style={{ fontSize: `${53.85 * sTitle}px` }}
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
            className="text-zinc-700 font-medium leading-relaxed w-[95%] font-text"
            style={{ fontSize: `${24.28 * sText}px` }}
          >
            {data.texto_apoio || 'O amador foca apenas na cobertura. O confeiteiro profissional entende a alma do produto.'}
          </TextWrapper>
        </SmartEl>
      </div>

      <div 
        className="w-[40%] h-full p-8 flex flex-col justify-end text-right relative z-10 "
        style={{fontFamily: textFont,  backgroundColor: brandColor }}
      >
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
      <div className="w-full h-[50%] relative z-0 bg-zinc-800 flex items-center justify-center overflow-hidden">
        <ImageBg data={data} className="w-full h-full">
           <div className="absolute inset-0 bg-black/10" />
        </ImageBg>
      </div>

      <div className="w-full h-[7px] absolute top-[50%] -translate-y-1/2 z-10" style={{ backgroundColor: brandColor }} />

      <div className="absolute top-[50%] left-8 -translate-y-1/2 z-20 flex items-center">
        <div 
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.5)] border-4 border-[#0A0A0A]"
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
    <div className="w-full h-full flex flex-col bg-[#faf7f2] text-[#1a1a1a] relative overflow-hidden">
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
        className="absolute right-[-10%] top-1/2 -translate-y-1/2 font-black opacity-[0.15] select-none pointer-events-none font-text"
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
        className="absolute bottom-0 left-0 w-full h-[6px] z-20 " 
        style={{fontFamily: textFont,  backgroundColor: brandColor }}
      />
      
      <div className="w-full h-[calc(50%+80px)] relative overflow-hidden bg-zinc-200 flex items-center justify-center">
        <ImageBg data={data} className="w-full h-full" />
      </div>

      <div className="flex-1 p-8 pt-6 flex flex-col justify-start relative z-10 bg-white">
        <SmartEl 
          slideIndex={index} 
          field="tag" 
          position={data.positions?.tag || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'tag'}
          onSelectElement={onSelectElement}
          className="mb-4 self-start"
        >
          <TextWrapper 
            {...tw} 
            as="span" 
            field="tag" 
            className="text-white font-bold px-2 py-0.5 rounded text-[11px] outline-none uppercase tracking-wide"
            style={{fontFamily: tagFont,  backgroundColor: brandColor }}
          >
            {data.tag || 'DICA'}
          </TextWrapper>
        </SmartEl>

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
        <div 
          className="absolute top-0 left-0 w-full h-full rounded-xl overflow-hidden border-[6px] border-white bg-zinc-100 flex items-center justify-center"
          style={{ boxShadow: `0 20px 50px ${brandColor}26` }}
        >
          <ImageBg data={data} className="w-full h-full" />
        </div>
        <div 
          className="absolute -bottom-5 right-6 px-5 py-2 text-white rounded-full flex items-center justify-center font-black text-[11px] uppercase tracking-widest shadow-xl font-text select-none"
          style={{fontFamily: textFont,  backgroundColor: brandColor }}
        >
          Passo 0{step}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end pt-8 pb-4 relative z-10 w-[90%] mx-auto">
        <div 
          className="mb-6 rounded-full" 
          style={{ 
            width: '3rem', 
            height: '0.25rem', 
            backgroundColor: 'rgb(228 228 231 / var(--tw-bg-opacity, 1))' 
          }} 
        />
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
          className="h-full shadow-[0_0_10px_currentColor]" 
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
        <div 
          className="mb-6 rounded-full" 
          style={{ 
            width: '3rem', 
            height: '0.25rem', 
            backgroundColor: 'rgb(228 228 231 / var(--tw-bg-opacity, 1))' 
          }} 
        />
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
            className={`flex-1 flex items-center justify-center border-b-[6px] ${i === step ? "bg-white shadow-sm z-10" : "bg-transparent"}`}
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
      

      <div 
        className="w-full h-[45%] mt-8 rounded-2xl overflow-hidden relative z-10 bg-zinc-100 flex items-center justify-center"
      >
        <ImageBg data={data} className="w-full h-full" />
      </div>

      <div className="flex-1 flex flex-col justify-end pt-8 pb-2 relative z-10 w-full">
        <div 
          className="mb-6 rounded-full" 
          style={{ 
            width: '3rem', 
            height: '0.25rem', 
            backgroundColor: 'rgb(228 228 231 / var(--tw-bg-opacity, 1))' 
          }} 
        />
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

      <div className="w-full h-[45%] mb-4 rounded-2xl overflow-hidden shadow-2xl relative z-10 bg-zinc-100 flex items-center justify-center">
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
        className="w-[35%] h-full relative z-0"
        style={{fontFamily: textFont,  backgroundColor: brandColor }}
      />
      <div className="w-[65%] h-full bg-[#faf7f2] relative z-0" />

      <div className="absolute top-1/2 left-[35%] -translate-x-[calc(50%+15px)] -translate-y-1/2 w-[45%] h-[75%] rounded-[100px] overflow-hidden border-[3px] border-white z-10 bg-zinc-100 flex items-center justify-center">
        <ImageBg data={data} className="w-full h-full" />
      </div>

      

      <div className="absolute top-1/2 right-6 -translate-y-1/2 w-[48%] flex flex-col z-20">
        <div 
          className="mb-6 rounded-full ml-[45px]" 
          style={{ 
            width: '3rem', 
            height: '0.25rem', 
            backgroundColor: brandColor 
          }} 
        />

        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-4 ml-[45px]"
        >
          <TextWrapper 
            {...tw} 
            as="h2" 
            field="titulo" 
            className="font-black leading-[0.9] uppercase tracking-tighter whitespace-pre-line font-text"
            style={{ fontSize: `${48.85 * sTitle}px`, color: '#1a1a1a' }}
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
          className="ml-[45px]"
        >
          <TextWrapper 
            {...tw} 
            as="p" 
            field="texto_apoio" 
            className="text-zinc-600 font-medium leading-relaxed w-full font-text"
            style={{ fontSize: `${21 * sText}px` }}
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

export function SequenceVariant29(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-8">
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
      <div className="absolute inset-0">
        <ImageBg data={data} className="absolute inset-0 w-full h-full opacity-40" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle, transparent 0%, rgb(10 10 10 / 70%) 90%)' }}></div>
      </div>
      <div className="relative z-10 flex flex-col items-center text-center w-full">
        <svg className="w-6 h-6 mb-6 transition-colors duration-500" style={{ color: brandColor }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 20h20"/><path d="M12 4l-4 8H4l6 6 2-4 2 4 6-6h-4z"/>
        </svg>
        <span className="font-bold tracking-[0.2em] text-[10px] uppercase text-white/50 mb-4 font-text">Fase 0{step}</span>
        
        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-6 w-full flex justify-center"
        >
          <TextWrapper 
            {...tw} 
            as="h3" 
            field="titulo" 
            className="font-black italic leading-none font-title line-clamp-3"
            style={{ fontSize: `${48 * sTitle}px` }}
          >
            {data.titulo || 'TITULO AQUI'}
          </TextWrapper>
        </SmartEl>

        <SmartEl 
          slideIndex={index} 
          field="texto_apoio" 
          position={data.positions?.texto_apoio || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
          className="w-full flex justify-center"
        >
          <TextWrapper 
            {...tw} 
            as="p" 
            field="texto_apoio" 
            className="text-white/60 font-medium leading-relaxed w-[95%] font-text break-words"
            style={{ fontSize: `${13 * sText}px` }}
          >
            {data.texto_apoio || 'Sua descrição detalhada vai aqui...'}
          </TextWrapper>
        </SmartEl>

        <div className="mt-12 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md cursor-pointer hover:bg-white/5 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </div>
      </div>
    </div>
  );
}

export function SequenceVariant30(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#050505] text-white flex flex-col justify-end p-8">
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
      <div className="absolute top-0 left-0 w-full h-[75%]">
        <ImageBg data={data} className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
      </div>
      <div className="relative z-10 w-full pt-10 border-t border-white/10">
        <div className="absolute -top-[3px] left-0 w-12 h-1.5 transition-colors duration-500" style={{ backgroundColor: brandColor }}></div>
        <span className="font-title italic text-6xl text-white/10 absolute right-0 bottom-full translate-y-1/2">0{step}</span>
        
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
            as="h3" 
            field="titulo" 
            className="font-black uppercase tracking-tighter leading-[1] text-white font-text line-clamp-2"
            style={{ fontSize: `${34 * sTitle}px` }}
          >
            {data.titulo || 'TITULO AQUI'}
          </TextWrapper>
        </SmartEl>

        <div className="flex gap-4">
          <div className="w-px bg-white/20 min-h-full shrink-0"></div>
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
              className="text-white/70 font-medium leading-relaxed font-title break-words max-w-full"
              style={{ fontSize: `${14 * sText}px` }}
            >
              {data.texto_apoio || 'Sua descrição detalhada vai aqui...'}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>
    </div>
  );
}

export function SequenceVariant31(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full relative overflow-hidden bg-black flex flex-col justify-end p-6">
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
      <div className="absolute inset-0 z-0">
        <ImageBg data={data} className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
      <div className="relative z-10 w-full rounded-[25px] text-white shadow-2xl overflow-hidden border border-white/20" style={{ backgroundColor: brandColor, paddingTop: '24.5px', paddingBottom: '24.5px' }}>
        <div className="absolute inset-0 -z-10 backdrop-blur-2xl" />
        <div className="relative px-6">
          <div className="flex justify-between items-center mb-6">
            <span className="font-bold tracking-[0.2em] text-[9px] uppercase text-white/60 font-text">{brandHandle || '@STUDIO_PREMIUM'}</span>
            <div className="px-3 py-1 rounded-full text-white font-black text-xs transition-colors duration-500 shadow-md font-text relative -left-2" style={{ backgroundColor: brandColor, border: '1px solid #ffffff' }}>0{step}</div>
          </div>

          <SmartEl 
            slideIndex={index} 
            field="titulo" 
            position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
            onActionStart={onActionStart}
            isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
            onSelectElement={onSelectElement}
            className="mb-3 w-full"
          >
            <TextWrapper 
              {...tw} 
              as="h3" 
              field="titulo" 
              className="font-black uppercase tracking-tighter leading-[1] font-text line-clamp-3 w-full"
              style={{ fontSize: `${40 * sTitle}px` }}
            >
              {data.titulo || 'TITULO AQUI'}
            </TextWrapper>
          </SmartEl>

          <SmartEl 
            slideIndex={index} 
            field="texto_apoio" 
            position={data.positions?.texto_apoio || { x: 0, y: 0, scale: 1 }}
            onActionStart={onActionStart}
            isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
            onSelectElement={onSelectElement}
            className="w-full"
          >
            <TextWrapper 
              {...tw} 
              as="p" 
              field="texto_apoio" 
              className="text-white/80 font-medium leading-relaxed font-title break-words w-full"
              style={{ fontSize: `${18 * sText}px` }}
            >
              {data.texto_apoio || 'Sua descrição detalhada vai aqui...'}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>
    </div>
  );
}

export function SequenceVariant32(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement , titleFont, textFont, tagFont} = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden bg-[#FFFFFF]">
      <SlideHeader 
        {...props} 
        slideIndex={index} 
        index={step} 
        total={slideCount} 
        hideDot={true} 
        handleColor={data.handleColor || "#1A1A1A"} 
        counterColor={data.counterColor || "#1A1A1A"} 
        counterBg={data.counterBg || "rgb(10 10 10 / 0.1)"} 
      />
      <div className="h-[25%] w-full p-6 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-[1px] transition-colors duration-500" style={{ backgroundColor: brandColor }}></div>
          <span className="font-bold tracking-[0.2em] text-[8px] uppercase text-[#1A1A1A]/60 font-text">A COLEÇÃO</span>
        </div>
        <h3 className="font-black text-[55px] leading-none tracking-tight text-[#1A1A1A] font-title">0{step}.</h3>
      </div>
      <div className="h-[45%] w-full relative z-10 border-y border-black/5 shadow-sm">
        <ImageBg data={data} className="absolute inset-0 w-full h-full" />
      </div>
      <div className="h-[35%] w-full p-6 flex flex-col justify-between transition-colors duration-500 text-white" style={{ backgroundColor: brandColor }}>
        
        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="w-[90%]"
        >
          <TextWrapper 
            {...tw} 
            as="h4" 
            field="titulo" 
            className="font-bold uppercase tracking-widest leading-tight font-text line-clamp-2"
            style={{ fontSize: `${38 * sTitle}px` }}
          >
            {data.titulo || 'TITULO AQUI'}
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
            className="text-white/80 font-medium leading-relaxed line-clamp-2 font-title break-words max-w-full"
            style={{ fontSize: `${21 * sText}px` }}
          >
            {data.texto_apoio || 'Sua descrição detalhada vai aqui...'}
          </TextWrapper>
        </SmartEl>

        <div className="flex justify-between items-center mt-2 opacity-60">
          <span className="font-bold tracking-[0.2em] text-[8px] uppercase font-text">{brandHandle || '@STUDIO_PREMIUM'}</span>
          <div style={{transform: 'rotate(45deg)'}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></div>
        </div>
      </div>
    </div>
  );
}

export function SequenceVariant33(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full bg-[#F4F1ED] flex relative text-[#1A1A1A] overflow-hidden">
      <div className="w-12 h-full transition-colors duration-500 flex flex-col items-center justify-between py-6" style={{ backgroundColor: brandColor }}>
        <div className="w-4 h-4 text-white/80" style={{border: '1px solid currentColor'}}></div>
        <span className="text-white font-bold text-[9px] tracking-[0.3em] uppercase -rotate-90 whitespace-nowrap font-text">EDIÇÃO 0{step}</span>
        <div className="w-1 h-1 rounded-full bg-white/50"></div>
      </div>
      <div className="flex-1 flex flex-col relative p-6 pt-10">
        <div className="absolute top-0 right-8 rounded-b-xl shadow-md flex items-end justify-center pb-2 pt-4 w-12 h-14 transition-colors duration-500 z-20" style={{ backgroundColor: brandColor }}>
          <span className="text-white font-black text-xl leading-none font-title">{step}</span>
        </div>

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
            as="h3" 
            field="titulo" 
            className="font-black tracking-tight mb-6 mt-4 font-title"
            style={{ fontSize: `${40 * sTitle}px` }}
          >
            {data.titulo || 'TITULO AQUI'}
          </TextWrapper>
        </SmartEl>

        <div className="w-full flex-1 rounded-xl overflow-hidden shadow-sm relative z-10 border border-black/5 mb-6">
          <ImageBg data={data} className="w-full h-full absolute inset-0" />
        </div>
        <div className="border-t border-[#1A1A1A]/10 pt-4 flex justify-between items-end">
          
          <SmartEl 
            slideIndex={index} 
            field="texto_apoio" 
            position={data.positions?.texto_apoio || { x: 0, y: 0, scale: 1 }}
            onActionStart={onActionStart}
            isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
            onSelectElement={onSelectElement}
            className="w-[70%]"
          >
            <TextWrapper 
              {...tw} 
              as="p" 
              field="texto_apoio" 
              className="text-[#1A1A1A]/70 font-medium leading-relaxed font-text"
              style={{ fontSize: `${16 * sText}px` }}
            >
              {data.texto_apoio || 'Sua descrição detalhada vai aqui...'}
            </TextWrapper>
          </SmartEl>
          
          <span className="font-bold tracking-[0.2em] text-[8px] uppercase text-black/40 font-text">ABRIR ↗</span>
        </div>
      </div>
    </div>
  );
}

export function SequenceVariant34(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full bg-[#F5F2ED] flex relative text-[#1A1A1A] overflow-hidden">
      <div className="w-[20%] h-full flex flex-col justify-between items-center py-8 border-r border-black/5 relative z-10">
        <span className="font-title italic text-3xl text-black/20 mt-4">0{step}</span>
        <div className="w-px h-16 transition-colors duration-500" style={{backgroundColor: brandColor}}></div>
      </div>
      <div className="w-[80%] h-full p-8 flex flex-col justify-center relative">
        <div className="absolute top-8 right-8">
          <span className="font-bold tracking-[0.2em] text-[8px] uppercase text-black/30 font-text">{brandHandle || '@STUDIO_PREMIUM'}</span>
        </div>
        <div className="w-full h-[45%] rounded-xl overflow-hidden mb-8 shadow-sm border border-white/50 relative">
          <ImageBg data={data} className="w-full h-full absolute inset-0" />
          <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm">
            <div style={{ color: 'rgba(0,0,0,0.6)' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -left-12 top-2 w-6 h-px transition-colors duration-500" style={{backgroundColor: brandColor}}></div>
          
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
              as="h3" 
              field="titulo" 
              className="font-black uppercase tracking-tighter mb-4 leading-[1] font-text"
              style={{ fontSize: `${26 * sTitle}px` }}
            >
              {data.titulo || 'TITULO AQUI'}
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
              className="font-medium text-black/70 leading-relaxed pr-2 font-title"
              style={{ fontSize: `${13 * sText}px` }}
            >
              {data.texto_apoio || 'Sua descrição detalhada vai aqui...'}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>
    </div>
  );
}

export function SequenceVariant35(props) {
  // Same as 34 but allowing standalone export if user wants variants separated
  return <SequenceVariant34 {...props} />;
}

// ==========================================
// EXPORTS & METADATA
// ==========================================

export function SequenceVariant36(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full bg-white p-5 relative flex flex-col text-[#1A1A1A]">
      <div className="w-full h-full border border-black/10 p-6 flex flex-col relative">
        <div className="absolute top-0 right-8 w-px h-10 transition-colors duration-500" style={{backgroundColor: brandColor}}></div>
        <div className="flex justify-between items-center mb-6 relative z-10">
          <span className="text-white font-bold text-[9px] tracking-widest px-3 py-1 uppercase shadow-sm transition-colors duration-500 font-text" style={{backgroundColor: brandColor}}>
            0{step}
          </span>
          <span className="font-bold tracking-[0.2em] text-[8px] uppercase text-black/30 font-text">ETAPA</span>
        </div>
        <div className="w-full aspect-square mb-6 rounded-sm overflow-hidden border border-black/5 shadow-sm relative">
          <ImageBg data={data} className="w-full h-full absolute inset-0 grayscale-[20%]" />
        </div>
        <div className="flex-1 flex flex-col justify-center text-center px-2">
          
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
              as="h3" 
              field="titulo" 
              className="font-black italic mb-3 leading-none font-title"
              style={{ fontSize: `${28 * sTitle}px` }}
            >
              {data.titulo || 'TITULO AQUI'}
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
              className="text-black/60 leading-relaxed font-medium font-text"
              style={{ fontSize: `${12 * sText}px` }}
            >
              {data.texto_apoio || 'Sua descrição detalhada vai aqui...'}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>
    </div>
  );
}

export function SequenceVariant37(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full bg-[#F5F2ED] flex flex-col relative text-[#1A1A1A]">
      <div className="p-8 pb-4 flex justify-between items-start">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 block mb-2 font-text">PASSO 0{step}</span>
          
          <SmartEl 
            slideIndex={index} 
            field="titulo" 
            position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
            onActionStart={onActionStart}
            isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
            onSelectElement={onSelectElement}
            className="w-[80%]"
          >
            <TextWrapper 
              {...tw} 
              as="h3" 
              field="titulo" 
              className="font-black uppercase tracking-tighter leading-[1] font-text"
              style={{ fontSize: `${30 * sTitle}px` }}
            >
              {data.titulo || 'TITULO AQUI'}
            </TextWrapper>
          </SmartEl>
        </div>
        <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center shrink-0">
          <span className="font-title italic text-xl">0{step}</span>
        </div>
      </div>
      <div className="flex-1 p-8 pt-0 flex flex-col">
        
        <SmartEl 
          slideIndex={index} 
          field="texto_apoio" 
          position={data.positions?.texto_apoio || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
          className="mb-6"
        >
          <TextWrapper 
            {...tw} 
            as="p" 
            field="texto_apoio" 
            className="text-[#1A1A1A]/70 font-medium leading-relaxed font-title"
            style={{ fontSize: `${14 * sText}px` }}
          >
            {data.texto_apoio || 'Sua descrição detalhada vai aqui...'}
          </TextWrapper>
        </SmartEl>

        <div className="mt-auto w-full h-[55%] rounded-2xl overflow-hidden shadow-sm border border-black/5 relative">
          <ImageBg data={data} className="w-full h-full absolute inset-0" />
          <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>
      </div>
      <div className="absolute bottom-4 left-8 right-8 flex justify-between items-center z-10">
        <span className="font-bold tracking-[0.2em] text-[8px] uppercase text-white drop-shadow-md font-text">{brandHandle || '@STUDIO_PREMIUM'}</span>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full transition-colors duration-500" style={{ backgroundColor: brandColor }}></div>
          <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
        </div>
      </div>
    </div>
  );
}

export function SequenceVariant38(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full bg-[#F5F2ED] relative overflow-hidden flex flex-col p-8 text-[#1A1A1A]">
      <div className="absolute right-0 top-[20%] w-[40%] h-[1px] transition-colors duration-500" style={{ backgroundColor: brandColor }}></div>
      <div className="flex justify-between items-center mb-8 relative z-20">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full transition-colors duration-500" style={{ backgroundColor: brandColor }}></div>
          <div className="w-2 h-2 rounded-full bg-black/10"></div>
        </div>
        <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-black/40 font-text">{brandHandle || '@STUDIO_PREMIUM'}</span>
      </div>
      <div className="w-[85%] flex-1 relative z-10 rounded-sm overflow-hidden shadow-[20px_20px_60px_rgba(0,0,0,0.1)] mb-8 border-[6px] border-white">
        <ImageBg data={data} className="w-full h-full absolute inset-0" />
        <div className="absolute inset-0 mix-blend-overlay opacity-20 transition-colors duration-500" style={{ backgroundColor: brandColor }}></div>
      </div>
      <div className="self-end text-right w-[80%] relative z-20 flex flex-col items-end">
        <h3 className="font-black leading-[0.85] tracking-tighter mb-2 font-title" style={{ fontSize: `${54 * sTitle}px` }}>0{step}</h3>
        
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
            className="text-[#1A1A1A]/60 italic font-medium leading-relaxed font-title text-right"
            style={{ fontSize: `${13 * sText}px` }}
          >
            {data.texto_apoio || 'Sua descrição detalhada vai aqui...'}
          </TextWrapper>
        </SmartEl>
      </div>
    </div>
  );
}

export function SequenceVariant39(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full bg-white p-4 text-[#1A1A1A]">
      <div className="w-full h-full border border-black/10 flex flex-col relative p-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-black/30 font-text">EXPOSIÇÃO ESPECIAL</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-black/30"><path d="M12 2L22 12L12 22L2 12Z"/></svg>
        </div>
        <div className="w-full flex-1 mb-8 relative">
          <ImageBg data={data} className="w-full h-full absolute inset-0" />
          <div className="absolute top-1/2 -left-3 -translate-y-1/2 -rotate-90">
            <span className="text-[7px] font-bold uppercase tracking-widest text-white mix-blend-difference font-text">{brandHandle || '@STUDIO_PREMIUM'}</span>
          </div>
        </div>
        <div className="text-center flex flex-col items-center">
          <h3 className="font-black italic leading-none mb-3 font-title" style={{ fontSize: `${42 * sTitle}px` }}>0{step}</h3>
          
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
              as="p" 
              field="titulo" 
              className="font-bold uppercase tracking-[0.2em] text-black/50 font-text text-center"
              style={{ fontSize: `${9 * sText}px` }}
            >
              {data.titulo || 'TITULO AQUI'}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// NEW VARIANTS 39-42 (SequenceVariant40-43)
// ==========================================

export function SequenceVariant40(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full bg-[#F5F2ED] flex relative overflow-hidden text-[#1A1A1A]">
      <div className="w-[18%] h-full flex flex-col items-center justify-between py-8 transition-colors duration-500 z-10 shadow-xl" style={{ backgroundColor: brandColor }}>
        <div className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center bg-white/10"><div style={{ color: 'white' }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div></div>
        <div className="flex-1 flex items-center justify-center">
          <span className="text-white font-bold text-[10px] tracking-[0.3em] uppercase -rotate-90 whitespace-nowrap font-text">VOL. 0{step}</span>
        </div>
      </div>
      <div className="w-[82%] h-full p-6 flex flex-col relative">
        <div className="absolute top-6 right-6 text-black/20"><div style={{ width: '20px', height: '20px', backgroundColor: 'currentColor' }}></div></div>
        <div className="w-full h-[65%] mt-6 rounded-[32px] overflow-hidden shadow-lg border border-black/5 relative">
          <ImageBg data={data} className="w-full h-full absolute inset-0" />
        </div>
        <div className="flex-1 flex flex-col justify-end pb-4">
          <h3 className="font-black leading-[0.9] tracking-tight mb-2 font-title" style={{ fontSize: `${40 * sTitle}px` }}>0{step}</h3>
          
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
              as="p" 
              field="titulo" 
              className="font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/60 font-text"
              style={{ fontSize: `${10 * sText}px` }}
            >
              {data.titulo || 'TITULO AQUI'}
            </TextWrapper>
          </SmartEl>

          <div className="flex justify-between items-end mt-auto">
            <span className="font-bold tracking-[0.2em] text-[8px] uppercase text-black/40 font-text">{brandHandle || '@STUDIO_PREMIUM'}</span>
            <div style={{ color: brandColor }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SequenceVariant41(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full bg-[#F4F1ED] p-8 flex flex-col items-center relative text-[#1A1A1A] overflow-hidden">
      <div className="w-full flex justify-center items-center gap-2 mb-8 mt-2">
        <span className="font-bold tracking-[0.2em] text-[8px] uppercase text-[#1A1A1A]/50 font-text">{brandHandle || '@STUDIO_PREMIUM'}</span>
        <div style={{ color: '#1A1A1A', opacity: 0.3 }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
      </div>
      <h3 className="font-black italic mb-6 leading-none tracking-tighter font-title" style={{ fontSize: `${56 * sTitle}px` }}>0{step}</h3>
      <div className="w-[90%] flex-1 rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)] mb-8 border border-black/5 relative">
        <ImageBg data={data} className="w-full h-full absolute inset-0" />
      </div>
      <div className="w-full flex justify-between items-end border-t border-[#1A1A1A]/10 pt-4">
        
        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="w-[60%]"
        >
          <TextWrapper 
            {...tw} 
            as="p" 
            field="titulo" 
            className="text-[#1A1A1A]/60 font-semibold uppercase tracking-[0.15em] leading-relaxed font-text"
            style={{ fontSize: `${9 * sText}px` }}
          >
            {data.titulo || 'TITULO AQUI'}
          </TextWrapper>
        </SmartEl>

        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full transition-colors duration-500" style={{ backgroundColor: brandColor }}></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]/20"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]/20"></div>
        </div>
      </div>
    </div>
  );
}

export function SequenceVariant42(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full bg-[#1A1A1A] relative flex flex-col overflow-hidden">
      <div className="h-[60%] w-full relative">
        <ImageBg data={data} className="w-full h-full absolute inset-0" />
        <div className="absolute top-6 left-6 z-20 border border-white/20 px-3 py-1 bg-black/30 backdrop-blur-md">
          <span className="font-bold tracking-[0.2em] text-[8px] uppercase text-white/90 font-text">{brandHandle || '@STUDIO_PREMIUM'}</span>
        </div>
        <div className="absolute top-6 right-6 w-6 h-6 rounded-full border border-white/40 flex items-center justify-center bg-black/20 backdrop-blur-md"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
      </div>
      <div className="h-[40%] w-full transition-colors duration-500 relative" style={{ backgroundColor: brandColor }}></div>
      <div className="absolute bottom-6 left-6 right-6 bg-[#F4F1ED] rounded-xl p-6 shadow-xl border border-black/5 z-10 flex flex-col">
        <div className="absolute -top-5 right-6 w-10 h-10 bg-[#1A1A1A] rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white font-title text-3xl leading-none mt-2">"</span>
        </div>
        <h3 className="font-black tracking-tight mb-2 text-[#1A1A1A] font-title" style={{ fontSize: `${32 * sTitle}px` }}>0{step}</h3>
        
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
            as="p" 
            field="titulo" 
            className="text-[#1A1A1A]/70 font-medium leading-relaxed font-text"
            style={{ fontSize: `${12 * sText}px` }}
          >
            {data.titulo || 'TITULO AQUI'}
          </TextWrapper>
        </SmartEl>

        <div className="flex items-center gap-3 mt-auto">
          <div className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-500 bg-black/5">
            <div style={{ color: brandColor }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></div>
          </div>
          <span className="text-[9px] font-bold uppercase tracking-widest text-[#1A1A1A]/60 font-text">Deslizar</span>
        </div>
      </div>
    </div>
  );
}

export function SequenceVariant43(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full bg-[#0A0A0A] relative overflow-hidden flex flex-col text-white">
      <div className="absolute top-6 left-6 z-20">
        <span className="font-bold tracking-[0.2em] text-[8px] uppercase text-white/80 bg-black/40 backdrop-blur px-2 py-1 rounded font-text">{brandHandle || '@STUDIO_PREMIUM'}</span>
      </div>
      <div className="w-full h-[52%] relative">
        <ImageBg data={data} className="w-full h-full absolute inset-0" />
      </div>
      <div className="w-full h-2 transition-colors duration-500" style={{ backgroundColor: brandColor }}></div>
      <div className="flex-1 flex flex-col justify-center px-8 relative">
        <h3 className="font-black leading-[1] mb-4 tracking-tight text-white/90 font-title" style={{ fontSize: `${48 * sTitle}px` }}>0{step}</h3>
        <div className="w-8 h-[2px] mb-4 bg-white/20"></div>
        
        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="w-[80%]"
        >
          <TextWrapper 
            {...tw} 
            as="p" 
            field="titulo" 
            className="text-white/60 font-semibold uppercase tracking-[0.15em] leading-relaxed font-text"
            style={{ fontSize: `${10 * sText}px` }}
          >
            {data.titulo || 'TITULO AQUI'}
          </TextWrapper>
        </SmartEl>

        <div className="absolute bottom-8 right-8 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg transition-colors duration-500 cursor-pointer hover:opacity-90" style={{ backgroundColor: brandColor }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// EXPORTS & METADATA
// ==========================================

export function SequenceVariant44(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full bg-[#F4F1ED] p-5 relative overflow-hidden flex flex-col text-[#1A1A1A]">
      <div className="w-full h-[60%] rounded-2xl overflow-hidden shadow-sm border border-black/5 relative">
        <ImageBg data={data} className="w-full h-full absolute inset-0" />
      </div>
      <div className="flex-1 flex flex-col pt-6 relative">
        <h3 className="font-black leading-[1] mb-2 tracking-tight text-[#111] font-title" style={{ fontSize: `${46 * sTitle}px` }}>0{step}</h3>
        
        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="w-[85%]"
        >
          <TextWrapper 
            {...tw} 
            as="p" 
            field="titulo" 
            className="text-[#111]/70 font-semibold uppercase tracking-[0.15em] leading-relaxed font-text"
            style={{ fontSize: `${11 * sText}px` }}
          >
            {data.titulo || 'TITULO AQUI'}
          </TextWrapper>
        </SmartEl>

        <div className="absolute bottom-2 left-0">
          <span className="font-bold tracking-[0.2em] text-[8px] uppercase text-black/30 font-text">{brandHandle || '@STUDIO_PREMIUM'}</span>
        </div>
        <div className="absolute bottom-0 right-0 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg transition-colors duration-500 cursor-pointer hover:opacity-90" style={{ backgroundColor: brandColor }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </div>
      </div>
    </div>
  );
}

export function SequenceVariant45(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full bg-white relative overflow-hidden flex flex-col p-8 text-[#050505]">
      <div className="flex justify-between items-center mb-6">
        <span className="font-bold tracking-[0.2em] text-[9px] uppercase text-black/30 font-text">{brandHandle || '@STUDIO_PREMIUM'}</span>
        <div className="h-[3px] w-12 rounded-full transition-colors duration-500" style={{ backgroundColor: brandColor }}></div>
      </div>
      <div className="relative z-10 w-full h-[45%] rounded-[32px] overflow-hidden mb-8 shadow-xl border border-black/5 relative">
        <ImageBg data={data} className="w-full h-full absolute inset-0 opacity-90" />
      </div>
      <div className="relative z-10 text-center flex-1 flex flex-col justify-center items-center">
        <span className="text-[11px] font-black uppercase mb-3 block tracking-[0.2em] transition-colors duration-500 font-text" style={{ color: brandColor }}>ESTÁGIO 0{step}</span>
        
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
            as="h3" 
            field="titulo" 
            className="font-black uppercase tracking-tighter mb-4 leading-[0.9] font-text text-center"
            style={{ fontSize: `${34 * sTitle}px` }}
          >
            {data.titulo || 'TITULO AQUI'}
          </TextWrapper>
        </SmartEl>

        <SmartEl 
          slideIndex={index} 
          field="texto_apoio" 
          position={data.positions?.texto_apoio || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
          className="w-[95%]"
        >
          <TextWrapper 
            {...tw} 
            as="p" 
            field="texto_apoio" 
            className="text-black/60 font-medium leading-relaxed font-title text-center"
            style={{ fontSize: `${14 * sText}px` }}
          >
            {data.texto_apoio || 'Sua descrição detalhada vai aqui...'}
          </TextWrapper>
        </SmartEl>
      </div>
    </div>
  );
}

export function SequenceVariant46(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full bg-white p-4 relative flex flex-col">
      <div className="absolute top-8 left-8 z-20">
        <span className="font-bold tracking-[0.2em] text-[9px] uppercase text-white mix-blend-difference drop-shadow-md font-text">{brandHandle || '@STUDIO_PREMIUM'}</span>
      </div>
      <div className="w-full h-[60%] relative">
        <ImageBg data={data} className="w-full h-full absolute inset-0 rounded-t-[24px]" />
      </div>
      <div className="flex-1 bg-[#F9F9F9] rounded-b-[24px] p-8 border border-t-0 border-black/5 flex flex-col justify-center relative overflow-hidden">
        <div className="w-16 h-1.5 absolute top-0 left-8 transition-colors duration-500" style={{ backgroundColor: brandColor }}></div>
        <div className="flex justify-between items-end relative z-10">
          <div className="w-[75%] flex flex-col">
            
            <SmartEl 
              slideIndex={index} 
              field="titulo" 
              position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
              onActionStart={onActionStart}
              isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
              onSelectElement={onSelectElement}
              className="mb-2"
            >
              <TextWrapper 
                {...tw} 
                as="h3" 
                field="titulo" 
                className="font-black uppercase tracking-tighter leading-[0.9] text-[#050505] font-text"
                style={{ fontSize: `${30 * sTitle}px` }}
              >
                {data.titulo || 'TITULO AQUI'}
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
                className="text-[#050505]/70 font-medium leading-relaxed font-title"
                style={{ fontSize: `${13 * sText}px` }}
              >
                {data.texto_apoio || 'Sua descrição detalhada vai aqui...'}
              </TextWrapper>
            </SmartEl>

          </div>
          <span className="font-black text-6xl leading-[0.8] transition-colors duration-500 font-text" style={{ color: brandColor }}>0{step}</span>
        </div>
      </div>
    </div>
  );
}

export function SequenceVariant47(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full bg-[#FDFBF7] p-8 flex flex-col items-center justify-center relative text-[#050505]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black text-[280px] opacity-[0.03] select-none pointer-events-none transition-colors duration-500 font-text" style={{ color: brandColor }}>0{step}</div>
      <div className="absolute top-6 w-full text-center">
        <span className="font-bold tracking-[0.2em] text-[9px] uppercase text-black/30 font-text">{brandHandle || '@STUDIO_PREMIUM'}</span>
      </div>
      <div className="w-48 h-64 rounded-full overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-10 border-[6px] border-white mb-6 relative">
        <ImageBg data={data} className="w-full h-full absolute inset-0" />
      </div>
      <div className="z-10 text-center bg-white p-6 pb-8 rounded-[32px] shadow-xl w-[90%] relative border border-black/5 flex flex-col items-center">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white text-[10px] tracking-widest font-black uppercase transition-colors duration-500 shadow-md font-text" style={{ backgroundColor: brandColor }}>PASSO 0{step}</div>
        
        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mt-3 mb-2"
        >
          <TextWrapper 
            {...tw} 
            as="h3" 
            field="titulo" 
            className="font-black uppercase tracking-tighter leading-[0.9] font-text text-center"
            style={{ fontSize: `${26 * sTitle}px` }}
          >
            {data.titulo || 'TITULO AQUI'}
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
            className="text-[#050505]/60 font-medium leading-relaxed font-title text-center"
            style={{ fontSize: `${13 * sText}px` }}
          >
            {data.texto_apoio || 'Sua descrição detalhada vai aqui...'}
          </TextWrapper>
        </SmartEl>

      </div>
    </div>
  );
}

// ==========================================
// EXPORTS & METADATA
// ==========================================

export function SequenceVariant48(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-row bg-white text-[#050505] overflow-hidden">
      <div className="w-[55%] h-full p-8 flex flex-col justify-center relative">
        <div className="absolute top-8 left-8">
          <span className="font-bold tracking-[0.2em] text-[9px] uppercase text-black/30 font-text">{brandHandle || '@STUDIO_PREMIUM'}</span>
        </div>
        <div className="relative z-10 pt-4">
          <span className="font-black text-[80px] leading-[0.8] block mb-2 transition-colors duration-500 font-text" style={{ color: brandColor }}>0{step}.</span>
          
          <SmartEl 
            slideIndex={index} 
            field="titulo" 
            position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
            onActionStart={onActionStart}
            isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
            onSelectElement={onSelectElement}
            className="mb-3"
          >
            <TextWrapper 
              {...tw} 
              as="h3" 
              field="titulo" 
              className="font-black uppercase tracking-tighter leading-[0.9] font-text"
              style={{ fontSize: `${45 * sTitle}px`, color: '#1A1A1A' }}
            >
              {data.titulo || 'TITULO AQUI'}
            </TextWrapper>
          </SmartEl>

          <SmartEl 
            slideIndex={index} 
            field="texto_apoio" 
            position={data.positions?.texto_apoio || { x: 0, y: 0, scale: 1 }}
            onActionStart={onActionStart}
            isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
            onSelectElement={onSelectElement}
            className="pr-4"
          >
            <TextWrapper 
              {...tw} 
              as="p" 
              field="texto_apoio" 
              className="text-[#1A1A1A]/70 font-medium leading-relaxed font-title"
              style={{ fontSize: `${21 * sText}px` }}
            >
              {data.texto_apoio || 'Sua descrição detalhada vai aqui...'}
            </TextWrapper>
          </SmartEl>

        </div>
      </div>
      <div className="w-[45%] h-full p-4 pl-0 py-4 relative z-0" style={{ marginLeft: '-12px', width: 'calc(45% + 12px)' }}>
        <div className="w-full h-full rounded-[14px] overflow-hidden shadow-lg border border-black/5 relative">
          <ImageBg data={data} className="w-full h-full absolute inset-0" />
        </div>
      </div>
    </div>
  );
}

export function SequenceVariant49(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full bg-black relative flex flex-col overflow-hidden">
      <div className="h-[65%] w-full relative">
        <ImageBg data={data} className="w-full h-full absolute inset-0 opacity-80" />
        <div className="absolute top-8 right-8 z-20">
          <span className="font-bold tracking-[0.2em] text-[9px] uppercase text-white/80 drop-shadow-md font-text">{brandHandle || '@STUDIO_PREMIUM'}</span>
        </div>
      </div>
      <div className="h-[45%] w-full absolute bottom-0 rounded-tl-[60px] p-10 flex flex-col justify-center transition-colors duration-500 shadow-[0_-20px_40px_rgba(0,0,0,0.3)]" style={{ backgroundColor: brandColor }}>
        <span className="font-black text-2xl mb-2 text-white/80 font-text">0{step}</span>
        
        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-3"
        >
          <TextWrapper 
            {...tw} 
            as="h3" 
            field="titulo" 
            className="font-black uppercase tracking-tighter leading-[0.9] text-white font-text"
            style={{ fontSize: `${34 * sTitle}px` }}
          >
            {data.titulo || 'TITULO AQUI'}
          </TextWrapper>
        </SmartEl>

        <SmartEl 
          slideIndex={index} 
          field="texto_apoio" 
          position={data.positions?.texto_apoio || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
          className="w-[95%]"
        >
          <TextWrapper 
            {...tw} 
            as="p" 
            field="texto_apoio" 
            className="text-white/90 font-medium leading-relaxed font-title"
            style={{ fontSize: `${14 * sText}px` }}
          >
            {data.texto_apoio || 'Sua descrição detalhada vai aqui...'}
          </TextWrapper>
        </SmartEl>
      </div>
    </div>
  );
}

export function SequenceVariant50(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full bg-[#0a0a0a] text-white relative flex flex-col justify-center p-12 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ImageBg data={data} className="w-full h-full absolute inset-0 opacity-[0.45]" />
      </div>
      <div className="absolute top-8 left-12 z-20">
        <span className="font-bold tracking-[0.2em] text-[9px] uppercase text-white/40 font-text">{brandHandle || '@STUDIO_PREMIUM'}</span>
      </div>
      <div className="absolute left-0 top-[25%] bottom-[25%] w-2 transition-colors duration-500 z-10 shadow-[5px_0_20px_rgba(0,0,0,0.5)]" style={{ backgroundColor: brandColor }}></div>
      <div className="relative z-10">
        <span className="font-black text-lg mb-2 block text-white/30 font-text">ETAPA 0{step}</span>
        
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
            as="h3" 
            field="titulo" 
            className="font-black uppercase tracking-tighter leading-[0.9] text-white font-text"
            style={{ fontSize: `${46 * sTitle}px` }}
          >
            {data.titulo || 'TITULO AQUI'}
          </TextWrapper>
        </SmartEl>

        <SmartEl 
          slideIndex={index} 
          field="texto_apoio" 
          position={data.positions?.texto_apoio || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
          className="w-[95%]"
        >
          <TextWrapper 
            {...tw} 
            as="p" 
            field="texto_apoio" 
            className="text-white/60 font-medium leading-relaxed font-title"
            style={{ fontSize: `${15 * sText}px` }}
          >
            {data.texto_apoio || 'Sua descrição detalhada vai aqui...'}
          </TextWrapper>
        </SmartEl>
      </div>
    </div>
  );
}

export function SequenceVariant51(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-col relative bg-white text-white">
      <div className="h-[55%] w-full relative bg-black overflow-hidden">
        <ImageBg data={data} className="w-full h-full absolute inset-0 opacity-90" />
        <div className="absolute top-8 left-8 z-20">
          <span className="font-bold tracking-[0.2em] text-[9px] uppercase text-white drop-shadow-md font-text">{brandHandle || '@STUDIO_PREMIUM'}</span>
        </div>
      </div>
      <div className="w-full h-2 bg-white z-20 shrink-0"></div>
      <div className="h-[45%] w-full p-10 flex flex-col justify-center relative transition-colors duration-500" style={{ backgroundColor: brandColor }}>
        <span className="font-black text-8xl absolute -top-12 right-8 drop-shadow-xl text-white/90 font-text">0{step}.</span>
        
        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-3 relative z-10"
        >
          <TextWrapper 
            {...tw} 
            as="h3" 
            field="titulo" 
            className="font-black uppercase tracking-tighter leading-[0.9] font-text"
            style={{ fontSize: `${48 * sTitle}px` }}
          >
            {data.titulo || 'TITULO AQUI'}
          </TextWrapper>
        </SmartEl>

        <SmartEl 
          slideIndex={index} 
          field="texto_apoio" 
          position={data.positions?.texto_apoio || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
          className="relative z-10 w-[90%]"
        >
          <TextWrapper 
            {...tw} 
            as="p" 
            field="texto_apoio" 
            className="text-white/90 font-medium leading-relaxed font-title"
            style={{ fontSize: `${19 * sText}px` }}
          >
            {data.texto_apoio || 'Sua descrição detalhada vai aqui...'}
          </TextWrapper>
        </SmartEl>
      </div>
    </div>
  );
}

export function SequenceVariant52(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col p-8 justify-center bg-black">
      <div className="absolute inset-0 z-0">
        <ImageBg data={data} className="w-full h-full absolute inset-0 blur-2xl scale-125 opacity-40" />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      <div className="absolute top-8 right-8 z-20">
        <span className="font-bold tracking-[0.2em] text-[9px] uppercase text-white/60 font-text">{brandHandle || '@STUDIO_PREMIUM'}</span>
      </div>
      <div className="relative z-10 text-left mt-auto pb-10">
        <div className="flex flex-col gap-4">
          <div className="w-12 h-1.5 transition-colors duration-500" style={{ backgroundColor: brandColor }}></div>
          <span className="font-black text-6xl text-white/20 leading-none absolute -top-16 left-0 font-text">0{step}</span>
          
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
              as="h3" 
              field="titulo" 
              className="font-black uppercase tracking-tighter leading-[0.9] text-white drop-shadow-md font-text"
              style={{ fontSize: `${42 * sTitle}px` }}
            >
              {data.titulo || 'TITULO AQUI'}
            </TextWrapper>
          </SmartEl>

          <div className="flex gap-4 items-start mt-2">
            <div className="w-1 h-full min-h-[40px] transition-colors duration-500 opacity-60" style={{ backgroundColor: brandColor }}></div>
            
            <SmartEl 
              slideIndex={index} 
              field="texto_apoio" 
              position={data.positions?.texto_apoio || { x: 0, y: 0, scale: 1 }}
              onActionStart={onActionStart}
              isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
              onSelectElement={onSelectElement}
              className="w-[85%]"
            >
              <TextWrapper 
                {...tw} 
                as="p" 
                field="texto_apoio" 
                className="text-white/80 font-medium leading-relaxed italic font-title"
                style={{ fontSize: `${14 * sText}px` }}
              >
                {data.texto_apoio || 'Sua descrição detalhada vai aqui...'}
              </TextWrapper>
            </SmartEl>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SequenceVariant53(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full bg-[#09090b] text-white relative flex flex-col items-center p-6 pt-10 overflow-hidden">
      <div className="absolute top-6 left-6 z-20">
        <span className="font-bold tracking-[0.2em] text-[9px] uppercase text-white/50 font-text">{brandHandle || '@STUDIO_PREMIUM'}</span>
      </div>
      <div className="w-[85%] h-[50%] relative rounded-t-[150px] overflow-hidden border-b-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)]" style={{ borderColor: brandColor }}>
        <ImageBg data={data} className="w-full h-full absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-80"></div>
        <div className="absolute top-0 left-0 w-full h-full mix-blend-multiply opacity-30 transition-colors duration-500" style={{ backgroundColor: brandColor }}></div>
      </div>
      <div className="absolute top-[48%] bg-[#09090b] border px-6 py-2 rounded-full shadow-2xl transition-colors duration-500" style={{ borderColor: brandColor }}>
        <span className="font-black text-xl leading-none text-white font-text">0{step}</span>
      </div>
      <div className="mt-12 text-center w-[90%] flex flex-col items-center">
        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-3"
        >
          <TextWrapper 
            {...tw} 
            as="h3" 
            field="titulo" 
            className="font-black uppercase tracking-tighter leading-[0.9] text-white font-text"
            style={{ fontSize: `${32 * sTitle}px` }}
          >
            {data.titulo || 'TITULO AQUI'}
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
            className="text-white/60 font-medium leading-relaxed italic font-title"
            style={{ fontSize: `${13 * sText}px` }}
          >
            {data.texto_apoio || 'Sua descrição detalhada vai aqui...'}
          </TextWrapper>
        </SmartEl>
      </div>
    </div>
  );
}

export function SequenceVariant54(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full bg-[#050505] relative overflow-hidden flex flex-col p-4">
      <div className="absolute inset-0 z-0">
        <ImageBg data={data} className="w-full h-full absolute inset-0 opacity-70" />
      </div>
      <div className="absolute top-8 right-8 z-10 bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5 shadow-sm">
        <span className="font-bold tracking-[0.2em] text-[9px] uppercase text-white font-text">{brandHandle || '@STUDIO_PREMIUM'}</span>
      </div>
      <div className="mt-auto relative z-10 w-full bg-white rounded-[32px] p-8 pb-10 shadow-2xl flex flex-col border-b-[5px] border-t transition-colors duration-500" style={{ borderColor: brandColor }}>
        <div className="absolute -top-6 left-8 bg-white text-[#1A1A1A] rounded-2xl px-5 py-2 shadow-xl border-2 transition-colors duration-500" style={{ borderColor: brandColor }}>
          <span className="font-black text-2xl leading-none font-text">0{step}</span>
        </div>
        
        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-3 pt-4"
        >
          <TextWrapper 
            {...tw} 
            as="h3" 
            field="titulo" 
            className="font-black uppercase tracking-tighter leading-[0.9] text-[#050505] font-text"
            style={{ fontSize: `${32 * sTitle}px` }}
          >
            {data.titulo || 'TITULO AQUI'}
          </TextWrapper>
        </SmartEl>

        <SmartEl 
          slideIndex={index} 
          field="texto_apoio" 
          position={data.positions?.texto_apoio || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
          className="w-[95%]"
        >
          <TextWrapper 
            {...tw} 
            as="p" 
            field="texto_apoio" 
            className="text-[#050505]/70 font-bold leading-relaxed font-title"
            style={{ fontSize: `${12 * sText}px` }}
          >
            {data.texto_apoio || 'Sua descrição detalhada vai aqui...'}
          </TextWrapper>
        </SmartEl>
      </div>
    </div>
  );
}

export function SequenceVariant55(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full bg-[#050505] relative overflow-hidden flex flex-col p-4">
      <div className="absolute inset-0 z-0">
        <ImageBg data={data} className="w-full h-full absolute inset-0 opacity-60" />
      </div>
      <div className="absolute top-8 right-8 z-10 bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5 shadow-sm">
        <span className="font-bold tracking-[0.2em] text-[9px] uppercase text-white font-text">{brandHandle || '@STUDIO_PREMIUM'}</span>
      </div>
      <div className="mt-auto relative z-10 w-full bg-white rounded-[32px] p-8 pb-10 shadow-2xl flex flex-col border-b-8 transition-colors duration-500" style={{ borderColor: brandColor }}>
        <div className="absolute -top-6 left-8 bg-[#050505] text-white rounded-2xl px-5 py-2 shadow-xl border-2 border-white">
          <span className="font-black text-2xl leading-none font-text">0{step}</span>
        </div>
        
        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-3 pt-4"
        >
          <TextWrapper 
            {...tw} 
            as="h3" 
            field="titulo" 
            className="font-black uppercase tracking-tighter leading-[0.9] text-[#050505] font-text"
            style={{ fontSize: `${32 * sTitle}px` }}
          >
            {data.titulo || 'TITULO AQUI'}
          </TextWrapper>
        </SmartEl>

        <SmartEl 
          slideIndex={index} 
          field="texto_apoio" 
          position={data.positions?.texto_apoio || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
          className="w-[95%]"
        >
          <TextWrapper 
            {...tw} 
            as="p" 
            field="texto_apoio" 
            className="text-[#050505]/70 font-bold leading-relaxed font-title"
            style={{ fontSize: `${12 * sText}px` }}
          >
            {data.texto_apoio || 'Sua descrição detalhada vai aqui...'}
          </TextWrapper>
        </SmartEl>
      </div>
    </div>
  );
}

export function SequenceVariant56(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-row bg-[#FDFBF7] text-[#1A1A1A] p-4 relative overflow-hidden">
      <div className="absolute -right-10 top-10 font-black text-[250px] opacity-5 select-none pointer-events-none transition-colors duration-500 font-text" style={{ color: brandColor }}>{step}</div>
      <div className="w-[45%] h-full rounded-[14px] overflow-hidden relative shadow-lg">
        <ImageBg data={data} className="w-full h-full absolute inset-0" />
      </div>
      <div className="h-max self-center bg-white rounded-[24px] px-6 py-8 z-10 border flex flex-col" style={{ width: 'calc(65% - 30px)', marginLeft: '-49px', borderColor: `${brandColor}4D`, '--tw-shadow': '0 10px 30px -17px rgb(222 30 77 / 60%)', '--tw-shadow-colored': '0 25px 50px -12px var(--tw-shadow-olor)', boxShadow: 'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)' }}>
        <div className="flex justify-between items-center mb-6">
          <span className="font-bold tracking-[0.2em] text-[8px] uppercase text-black/40 font-text">{brandHandle || '@STUDIO_PREMIUM'}</span>
        </div>
        
        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-3 w-full"
        >
          <TextWrapper 
            {...tw} 
            as="h3" 
            field="titulo" 
            className="font-black uppercase tracking-tighter leading-[0.9] font-text w-full"
            style={{ fontSize: `${36 * sTitle}px` }}
          >
            {data.titulo || 'TITULO AQUI'}
          </TextWrapper>
        </SmartEl>

        <SmartEl 
          slideIndex={index} 
          field="texto_apoio" 
          position={data.positions?.texto_apoio || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
          className="w-full"
        >
          <TextWrapper 
            {...tw} 
            as="p" 
            field="texto_apoio" 
            className="text-black/70 font-bold leading-relaxed font-title w-full"
            style={{ fontSize: `${18 * sText}px` }}
          >
            {data.texto_apoio || 'Sua descrição detalhada vai aqui...'}
          </TextWrapper>
        </SmartEl>
      </div>
    </div>
  );
}

export function SequenceVariant57(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-col relative bg-[#050505] text-white">
      <div className="w-full h-[51%] relative">
        <ImageBg data={data} className="w-full h-full absolute inset-0" />
      </div>
      <div className="w-full h-2 bg-white z-0 shrink-0"></div>
      <div className="w-full h-[49%] p-8 pt-10 flex flex-col justify-center relative transition-colors duration-700" style={{ backgroundColor: brandColor }}>
        <div className="absolute -top-6 left-8 bg-[#FDFBF7] text-[#1A1A1A] px-5 py-2 shadow-xl border-b-4 border-[#1A1A1A] rounded-[12px] z-30">
          <span className="font-black text-2xl leading-none font-text">PASSO 0{step}</span>
        </div>
        
        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-3"
        >
          <TextWrapper 
            {...tw} 
            as="h3" 
            field="titulo" 
            className="font-black uppercase tracking-tighter leading-[0.9] text-white font-text"
            style={{ fontSize: `${45 * sTitle}px` }}
          >
            {data.titulo || 'TITULO AQUI'}
          </TextWrapper>
        </SmartEl>

        <SmartEl 
          slideIndex={index} 
          field="texto_apoio" 
          position={data.positions?.texto_apoio || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
          className="w-[95%]"
        >
          <TextWrapper 
            {...tw} 
            as="p" 
            field="texto_apoio" 
            className="text-white/90 font-medium leading-relaxed drop-shadow-sm font-title"
            style={{ fontSize: `${21 * sText}px` }}
          >
            {data.texto_apoio || 'Sua descrição detalhada vai aqui...'}
          </TextWrapper>
        </SmartEl>

        <div className="absolute bottom-6 right-8">
          <span className="font-bold tracking-[0.2em] text-[8px] uppercase text-white/50 drop-shadow-md font-text">{brandHandle || '@STUDIO_PREMIUM'}</span>
        </div>
      </div>
    </div>
  );
}

export function SequenceVariant58(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full flex flex-row relative bg-[#FDFBF7] text-[#050505] overflow-hidden">
      <div className="w-[60%] h-full p-8 pt-10 flex flex-col justify-start relative z-10">
        <span className="font-bold tracking-[0.2em] text-[10px] uppercase text-[#050505]/40 mb-auto font-text">{brandHandle || '@STUDIO_PREMIUM'}</span>
        
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
            as="h3" 
            field="titulo" 
            className="font-black text-[36px] uppercase tracking-tighter leading-[0.9] text-[#1A1A1A] font-text"
            style={{ fontSize: `${60 * sTitle}px` }}
          >
            {data.titulo || 'TITULO AQUI'}
          </TextWrapper>
        </SmartEl>

        <SmartEl 
          slideIndex={index} 
          field="texto_apoio" 
          position={data.positions?.texto_apoio || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
          className="w-[90%]"
        >
          <TextWrapper 
            {...tw} 
            as="p" 
            field="texto_apoio" 
            className="text-[#1A1A1A]/80 font-bold leading-relaxed font-title"
            style={{ fontSize: `${21 * sText}px` }}
          >
            {data.texto_apoio || 'Sua descrição detalhada vai aqui...'}
          </TextWrapper>
        </SmartEl>

        <div className="mt-auto">
          <div className="w-12 h-1 transition-colors duration-500" style={{ backgroundColor: brandColor }}></div>
        </div>
      </div>
      <div className="w-[40%] h-full transition-colors duration-700 relative z-0 flex items-center shadow-[-20px_0_40px_rgba(0,0,0,0.05)]" style={{ backgroundColor: brandColor }}>
        <span className="font-black text-[220px] leading-none text-[#FDFBF7] opacity-[0.15] absolute -left-[75px] select-none pointer-events-none drop-shadow-sm font-text">{step}</span>
      </div>
    </div>
  );
}

export function SequenceVariant59(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#050505] text-[#050505]">
      <div className="absolute inset-0 z-0 h-[65%]">
        <ImageBg data={data} className="w-full h-full absolute inset-0 grayscale opacity-80" />
      </div>
      <div className="absolute top-8 left-8 z-10">
        <span className="font-bold tracking-[0.2em] text-[10px] uppercase text-white shadow-black drop-shadow-md font-text">{brandHandle || '@STUDIO_PREMIUM'}</span>
      </div>
      <div className="absolute bottom-6 left-6 right-6 bg-[#FDFBF7] p-8 pb-10 shadow-2xl z-10 flex flex-col justify-center border-t-4" style={{ borderColor: brandColor }}>
        <span className="font-black text-7xl absolute -top-10 right-6 drop-shadow-lg transition-colors duration-500 font-text" style={{ color: brandColor }}>0{step}.</span>
        
        <SmartEl 
          slideIndex={index} 
          field="titulo" 
          position={data.positions?.titulo || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'titulo'}
          onSelectElement={onSelectElement}
          className="mb-3 pt-4"
        >
          <TextWrapper 
            {...tw} 
            as="h3" 
            field="titulo" 
            className="font-black uppercase tracking-tighter leading-[0.9] text-[#050505] font-text"
            style={{ fontSize: `${32 * sTitle}px` }}
          >
            {data.titulo || 'TITULO AQUI'}
          </TextWrapper>
        </SmartEl>

        <SmartEl 
          slideIndex={index} 
          field="texto_apoio" 
          position={data.positions?.texto_apoio || { x: 0, y: 0, scale: 1 }}
          onActionStart={onActionStart}
          isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'texto_apoio'}
          onSelectElement={onSelectElement}
          className="w-[85%]"
        >
          <TextWrapper 
            {...tw} 
            as="p" 
            field="texto_apoio" 
            className="text-[#050505]/80 font-bold leading-relaxed font-title"
            style={{ fontSize: `${13 * sText}px` }}
          >
            {data.texto_apoio || 'Sua descrição detalhada vai aqui...'}
          </TextWrapper>
        </SmartEl>
      </div>
    </div>
  );
}

export function SequenceVariant60(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full bg-[#FDFBF7] text-[#050505] relative p-8 overflow-hidden">
      <div className="absolute top-8 left-8 z-20">
        <span className="font-bold tracking-[0.2em] text-[10px] uppercase text-[#050505]/40 font-text">{brandHandle || '@STUDIO_PREMIUM'}</span>
      </div>
      <div className="absolute top-12 right-4 w-28 h-36 rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.2)] rotate-[8deg] border-[6px] border-white z-10">
        <ImageBg data={data} className="w-full h-full absolute inset-0" />
      </div>
      <div className="absolute bottom-24 right-16 w-24 h-24 rounded-full overflow-hidden shadow-2xl -rotate-[15deg] border-[4px] border-white z-0">
        <ImageBg data={data} className="w-full h-full absolute inset-0 grayscale opacity-80" />
      </div>
      <div className="absolute bottom-6 left-6 w-36 h-24 rounded-xl overflow-hidden shadow-lg -rotate-[4deg] border-[6px] border-white z-10">
        <ImageBg data={data} className="w-full h-full absolute inset-0" />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 pointer-events-none p-6">
        <div className="bg-white/85 backdrop-blur-xl p-8 rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.1)] border border-white w-[90%] relative overflow-hidden pointer-events-auto">
          <div className="absolute top-0 left-0 w-full h-2 transition-colors duration-500" style={{ backgroundColor: brandColor }}></div>
          <span className="font-black text-3xl mb-3 block font-text" style={{ color: brandColor }}>{step}/{slideCount || 3}</span>
          
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
              as="h3" 
              field="titulo" 
              className="font-black uppercase tracking-tighter leading-[0.9] font-text"
              style={{ fontSize: `${28 * sTitle}px` }}
            >
              {data.titulo || 'TITULO AQUI'}
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
              className="text-[#050505]/80 font-bold leading-relaxed mx-auto w-[90%] font-title"
              style={{ fontSize: `${12 * sText}px` }}
            >
              {data.texto_apoio || 'Sua descrição detalhada vai aqui...'}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>
    </div>
  );
}

export function SequenceVariant61(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full bg-white text-[#050505] relative flex flex-row shadow-inner">
      <div className="w-[45%] h-full relative overflow-hidden">
        <ImageBg data={data} className="w-full h-full absolute inset-0" />
        <div className="absolute top-6 left-6 z-20">
          <span className="font-bold tracking-[0.2em] text-[10px] uppercase text-white drop-shadow-md font-text">{brandHandle || '@STUDIO_PREMIUM'}</span>
        </div>
      </div>
      <div className="w-[55%] h-full p-8 pl-6 flex flex-col justify-center relative">
        <span className="absolute -left-[45px] top-[20%] font-black text-[70px] leading-none drop-shadow-xl font-text" style={{ color: brandColor }}>0{step}.</span>
        <div className="relative z-10 pt-12">
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
              as="h3" 
              field="titulo" 
              className="font-black uppercase tracking-tighter leading-[0.9] font-text"
              style={{ fontSize: `${55 * sTitle}px`, color: '#1A1A1A' }}
            >
              {data.titulo || 'TITULO AQUI'}
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
              className="text-[#1A1A1A]/80 font-medium leading-relaxed font-title"
              style={{ fontSize: `${21 * sText}px` }}
            >
              {data.texto_apoio || 'Sua descrição detalhada vai aqui...'}
            </TextWrapper>
          </SmartEl>
        </div>
      </div>
    </div>
  );
}

export function SequenceVariant62(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full bg-[#050505] text-white p-8 relative overflow-hidden flex flex-col justify-center">
      <div className="absolute inset-0 z-0 opacity-20">
        <ImageBg data={data} className="w-full h-full absolute inset-0" />
      </div>
      <div className="absolute top-8 left-8 z-20">
        <span className="font-bold tracking-[0.2em] text-[10px] uppercase text-white/50 font-text">{brandHandle || '@STUDIO_PREMIUM'}</span>
      </div>
      <div className="absolute right-[-30px] top-1/2 -translate-y-1/2 flex flex-col gap-0 pointer-events-none opacity-40 z-0">
        <span className="font-black text-[130px] leading-[0.75] font-text" style={{ WebkitTextStroke: `2px ${brandColor}`, color: 'transparent' }}>0{step}</span>
        <span className="font-black text-[130px] leading-[0.75] font-text" style={{ WebkitTextStroke: `2px ${brandColor}`, color: 'transparent' }}>0{step}</span>
        <span className="font-black text-[130px] leading-[0.75] font-text" style={{ WebkitTextStroke: `2px ${brandColor}`, color: 'transparent' }}>0{step}</span>
        <span className="font-black text-[130px] leading-[0.75] text-white font-text">0{step}</span>
      </div>
      <div className="w-[75%] relative z-10 bg-[#050505]/60 backdrop-blur-md p-6 rounded-2xl border border-white/5 shadow-2xl ml-0">
        <span className="font-bold tracking-[0.2em] text-[10px] uppercase mb-4 block font-text" style={{ color: brandColor }}>ETAPA 0{step}</span>
        
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
            as="h3" 
            field="titulo" 
            className="font-black uppercase tracking-tighter leading-[0.9] text-white font-text"
            style={{ fontSize: `${32 * sTitle}px` }}
          >
            {data.titulo || 'TITULO AQUI'}
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
            className="text-white/80 font-medium leading-relaxed font-title"
            style={{ fontSize: `${13 * sText}px` }}
          >
            {data.texto_apoio || 'Sua descrição detalhada vai aqui...'}
          </TextWrapper>
        </SmartEl>
      </div>
    </div>
  );
}

export function SequenceVariant63(props) {
  const { data, index, slideCount, brandHandle, brandColor, titleScale, textScale, onTextChange, onActionStart, selectedElement, onSelectElement, titleFont, textFont, tagFont } = props;
  const step = index + 1;
  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const tw = { index, onTextChange };

  return (
    <div className="w-full h-full bg-[#FDFBF7] text-[#050505] relative overflow-hidden p-8 flex flex-col">
      <div className="absolute inset-0 z-0 opacity-10">
        <ImageBg data={data} className="w-full h-full absolute inset-0" />
      </div>
      <div className="absolute top-8 left-8 z-20">
        <span className="font-bold tracking-[0.2em] text-[10px] uppercase text-[#050505]/40 font-text">{brandHandle || '@STUDIO_PREMIUM'}</span>
      </div>
      <div className="absolute -top-12 -right-8 font-black text-[180px] leading-none select-none drop-shadow-xl z-0 transition-colors duration-500 rotate-[12deg] font-text" style={{ color: brandColor }}>
        {step}
      </div>
      <div className="flex-1 flex flex-col justify-end items-start text-left w-[85%] z-10 pb-8">
        <div className="w-16 h-[4px] mb-8 transition-colors duration-500" style={{ backgroundColor: brandColor }}></div>
        <span className="font-black text-xl mb-2 opacity-30 font-text">PASSO 0{step}</span>
        
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
            as="h3" 
            field="titulo" 
            className="font-black uppercase tracking-tighter leading-[0.9] text-[#050505] font-text"
            style={{ fontSize: `${38 * sTitle}px` }}
          >
            {data.titulo || 'TITULO AQUI'}
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
            className="text-[#050505]/80 font-bold leading-relaxed font-title"
            style={{ fontSize: `${14 * sText}px` }}
          >
            {data.texto_apoio || 'Sua descrição detalhada vai aqui...'}
          </TextWrapper>
        </SmartEl>
      </div>
    </div>
  );
}

export const SEQUENCE_VARIANT_COMPONENTS = {
  0: SequenceVariant1,
  2: SequenceVariant3,
  3: SequenceVariant4,
  4: SequenceVariant5,
  5: SequenceVariant6,
  6: SequenceVariant7,
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
  21: SequenceVariant22,
  22: SequenceVariant23,
  23: SequenceVariant24,
  24: SequenceVariant25,
  25: SequenceVariant26,
  26: SequenceVariant27,
  27: SequenceVariant28,
  28: SequenceVariant29,
  29: SequenceVariant30,
  30: SequenceVariant31,
  31: SequenceVariant32,
  32: SequenceVariant33,
  36: SequenceVariant37,
  39: SequenceVariant40,
  41: SequenceVariant42,
  42: SequenceVariant43,
  44: SequenceVariant45,
  45: SequenceVariant46,
  46: SequenceVariant47,
  47: SequenceVariant48,
  48: SequenceVariant49,
  49: SequenceVariant50,
  50: SequenceVariant51,
  51: SequenceVariant52,
  52: SequenceVariant53,
  53: SequenceVariant54,
  54: SequenceVariant55,
  55: SequenceVariant56,
  56: SequenceVariant57,
  57: SequenceVariant58,
  58: SequenceVariant59,
  59: SequenceVariant60,
  60: SequenceVariant61,
  61: SequenceVariant62,
  62: SequenceVariant63,
};

export const SEQUENCE_VARIANT_META = [
  { id: 0, name: 'Anchor Progress', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence0.png' },
  { id: 2, name: 'Minimal Corner', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence4.png' },
  { id: 3, name: 'Editorial Base', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence1.png' },
  { id: 4, name: 'Editorial Tab', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence3.png' },
  { id: 5, name: 'Ghost Typo', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence5.png' },
  { id: 6, name: 'Vertical Split', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence6.png' },
  { id: 8, name: 'Luminous Edge', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence8.png' },
  { id: 9, name: 'Editorial Spine', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence9.png' },
  { id: 10, name: 'Image Anchor', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence10.png' },
  { id: 11, name: 'Editorial Split', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence11.png' },
  { id: 12, name: 'Cinematic Step', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence12.png' },
  { id: 13, name: 'Image Frame', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence-13.png' },
  { id: 14, name: 'Magazine Bleed', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence14.png' },
  { id: 15, name: 'Anchor Bottom', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence15.png' },
  { id: 16, name: 'Corner Bottom', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence16.png' },
  { id: 17, name: 'Split Bottom', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence17.png' },
  { id: 18, name: 'Cinematic Panel', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence18.png' },
  { id: 19, name: 'Ghost Light', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence19.png' },
  { id: 21, name: 'Clean Polaroid', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence21.png' },
  { id: 22, name: 'Single Frame', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence22.png' },
  { id: 23, name: 'Elevated Base', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence23.png' },
  { id: 24, name: 'Tab Bottom', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence24.png' },
  { id: 25, name: 'Float Top', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence25.png' },
  { id: 26, name: 'Float Bottom', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence26.png' },
  { id: 27, name: 'Editorial Capsule', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence27.png' },
  { id: 28, name: 'Obsidian Glow', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence28.png' },
  { id: 29, name: 'Midnight Gradient', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence29.png' },
  { id: 30, name: 'Frosted Narrative', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence30.png' },
  { id: 31, name: 'Block Footer', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence31.png' },
  { id: 32, name: 'Vertical Tab', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence32.png' },
  { id: 36, name: 'Refined Step', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence36.png' },
  { id: 39, name: 'Sidebar Volume', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence39.png' },
  { id: 41, name: 'Overlap Quote', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence41.png' },
  { id: 42, name: 'Dark Divider', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence42.png' },
  { id: 44, name: 'Clean Accent', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence44.png' },
  { id: 45, name: 'Editorial Canvas', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence45.png' },
  { id: 46, name: 'Ethereal Float', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence46.png' },
  { id: 47, name: 'Light Split', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence47.png' },
  { id: 48, name: 'Soft Block', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence48.png' },
  { id: 49, name: 'Side Accent', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence49.png' },
  { id: 50, name: 'Swiss Split', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence50.png' },
  { id: 51, name: 'Blur Reveal', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence51.png' },
  { id: 52, name: 'Cinematic Arch', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence52.png' },
  { id: 53, name: 'Soft Frame', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence53.png' },
  { id: 54, name: 'Soft Frame Alt', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence54.png' },
  { id: 55, name: 'Floating Pillar', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence55.png' },
  { id: 56, name: 'Horizon Image', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence56.png' },
  { id: 57, name: 'Split Bleed', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence57.png' },
  { id: 58, name: 'Glass Overlap', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence58.png' },
  { id: 59, name: 'Orbiting Gallery', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence59.png' },
  { id: 60, name: 'Editorial Cut', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence60.png' },
  { id: 61, name: 'Echo Effect', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence61.png' },
  { id: 62, name: 'Outcast', badge: 'NEW', thumbnailUrl: 'https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Thumbnails%20Sequencias/designs_sequence62.png' },
];
