import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import SmartElement from '../smart-element';
import SlideHeader from '../slide-header';

function SmartField({ data, index, field, showMetrics, onActionStart, selectedElement, onSelectElement, className, style, children, rotation, forceX, forceY, forceWidth, forceScale }) {
  const basePos = data.positions?.[field] || { x: 0, y: 0, scale: 1 };
  const pos = { ...basePos };
  if (rotation !== undefined && basePos.rotation === undefined) {
    pos.rotation = rotation;
  }
  if (forceX !== undefined) {
    pos.x = forceX;
  }
  if (forceY !== undefined) {
    pos.y = forceY;
  }
  if (forceWidth !== undefined) {
    pos.width = forceWidth;
  }
  if (forceScale !== undefined) {
    pos.scale = forceScale;
  }
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

function getCorsSafeUrl(url) {
  if (!url || typeof url !== 'string') return url;
  if (
    url.includes('unsplash.com') ||
    url.includes('images.weserv.nl') ||
    url.startsWith('/') ||
    url.startsWith('data:') ||
    url.startsWith('blob:')
  ) {
    return url;
  }
  return `https://images.weserv.nl/?url=${encodeURIComponent(url)}`;
}

function ImageBg({ data, imageUrl, imagePosition, imagePositionX, imageScale, className = '', style = {}, children }) {
  const rawUrl = imageUrl !== undefined ? imageUrl : data?.imageUrl;
  const url = getCorsSafeUrl(rawUrl);
  const posY = imagePosition !== undefined ? imagePosition : (data?.imagePosition ?? 50);
  const posX = imagePositionX !== undefined ? imagePositionX : (data?.imagePositionX ?? 50);
  const scale = imageScale !== undefined ? imageScale : (data?.imageScale ?? 1);

  if (url) {
    return (
      <div
        className={`bg-cover ${className}`}
        style={{
          backgroundImage: `url("${url}")`,
          backgroundPosition: `${posX}% ${posY}%`,
          transform: `scale(${scale})`,
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

// ============================================================
// CONTEÚDO EXTRA — VARIANTE 252 (Template 7: Refresh)
// ============================================================
export function ContentExtraVariant252(props) {
  const {
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const colorBg = data.backgroundColor || "#FF7A00";
  const colorText = data.textColor || "#FFFFFF";
  const description = data.texto_apoio || "Além de refrescante, o suco\nde laranja contribui para a\n<b>hidratação</b> e deixa o\n<b>consumo de líquidos\nmuito mais prazeroso.</b>";
  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=2000&auto=format&fit=crop";

  const formatText = (text) => {
    if (!text) return "";
    return text.replace(/\\n/g, '<br />').replace(/\n/g, '<br />');
  };

  return (
    <div
      id="tpl-refresh"
      className="w-full h-full relative flex flex-col bg-zinc-950 overflow-hidden z-0 font-sans transition-colors duration-300"
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />

      {/* Imagem de Fundo Completa */}
      <SmartField field="imagem" {...sp} className="absolute inset-0 w-full h-full z-0">
        {imageUrl && (
          <ImageBg data={data} imageUrl={imageUrl} className="w-full h-full" />
        )}
      </SmartField>

      {/* Caixa de Destaque Lateral Direita (Superior) */}
      <div
        className="absolute top-[8%] right-0 w-[88%] rounded-l-[34px] py-[20px] pl-[27px] pr-[20px] flex flex-col justify-center text-right z-10 shadow-xl transition-colors"
        style={{ backgroundColor: colorBg }}
      >
        {/* Descrição */}
        <SmartField field="texto_apoio" {...sp} className="w-full">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
            id="out-refresh-desc"
            className="font-sans text-[44px] font-light leading-[1.35] drop-shadow-sm outline-none"
            style={{ color: colorText, fontSize: `${13.7 * sText}px` }}
            dangerouslySetInnerHTML={{ __html: formatText(description) }}
          ></p>
        </SmartField>
      </div>

      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor="#ffffff" counterColor="#ffffff" counterBg="rgba(0,0,0,0.1)" />
    </div>
  );
}

// ============================================================
// CONTEÚDO EXTRA — VARIANTE 253 (Template 12: Fidelize)
// ============================================================
export function ContentExtraVariant253(props) {
  const {
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const colorBg = data.backgroundColor || "#f15b88";
  const colorText = data.textColor || "#ffffff";
  const colorAccent = data.accentColor || brandColor || "#f15b88";

  const title1 = data.titulo || "May Bittencourt";
  const title2 = data.subtitulo || brandHandle || "@maybittencourtdoceria";
  const description = data.texto_apoio || "Como\nfidelizar\no seu\ncliente\nneste\nNatal";
  const footer = data.badge_text || "Arraste pra o lado";
  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=2000&auto=format&fit=crop";
  const logoUrl = data.logoUrl || brandAvatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop";

  const formatText = (text) => {
    if (!text) return "";
    return text.replace(/\\n/g, '<br />').replace(/\n/g, '<br />');
  };

  return (
    <div
      id="tpl-fidelize"
      className="w-full h-full relative overflow-hidden z-0 font-sans transition-colors duration-300"
      style={{ backgroundColor: colorBg }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
      `}} />

      {/* Imagem de Fundo Completa */}
      <SmartField field="imagem" {...sp} className="absolute inset-0 w-full h-full z-0">
        {imageUrl && (
          <ImageBg data={data} imageUrl={imageUrl} className="w-full h-full" />
        )}
      </SmartField>

      {/* Faixa Vertical Direita (Strip) */}
      <div
        className="t-strip absolute right-0 top-0 h-full w-[6%] z-10 shadow-lg rounded-l-[19px]"
        style={{ backgroundColor: colorText }}
      ></div>

      {/* Header com Avatar/Logo e Identificação */}
      <div className="t-header-area absolute top-[18px] left-0 w-full flex justify-center items-center gap-[5px] z-20">
        <SmartField field="logoUrl" {...sp} className="shrink-0">
          {logoUrl && (
            <img
              id="out-fidelize-logo"
              src={getCorsSafeUrl(logoUrl)}
              className="w-[23px] h-[23px] rounded-full object-cover border-[1.2px] border-white shadow-sm"
              alt="Avatar"
              crossOrigin="anonymous"
            />
          )}
        </SmartField>
        <div className="flex flex-col">
          <SmartField field="titulo" {...sp} className="leading-none">
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerHTML)}
              id="out-fidelize-title1"
              className="t-header-title font-sans font-bold leading-none mb-[2px] outline-none inline-block font-sans"
              style={{ color: colorText, fontSize: `${8.1 * sTitle}px` }}
              dangerouslySetInnerHTML={{ __html: formatText(title1) }}
            ></span>
          </SmartField>
          <SmartField field="subtitulo" {...sp} className="leading-none">
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'subtitulo', e.currentTarget.innerHTML)}
              id="out-fidelize-title2"
              className="t-header-sub font-sans font-light leading-none opacity-90 outline-none inline-block font-sans"
              style={{ color: colorText, fontSize: `${6.2 * sText}px` }}
              dangerouslySetInnerHTML={{ __html: formatText(title2) }}
            ></span>
          </SmartField>
        </div>
      </div>

      {/* Área da Descrição Central/Superior */}
      <div className="t-desc-area absolute top-[15%] right-[10%] w-[80%] flex flex-col items-end z-20 text-right">
        <SmartField field="texto_apoio" {...sp} className="w-full flex justify-end">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
            id="out-fidelize-desc"
            className="t-desc font-serif font-black leading-[0.95] drop-shadow-md outline-none"
            style={{ color: colorText, fontSize: `${38.9 * sTitle}px` }}
            dangerouslySetInnerHTML={{ __html: formatText(description) }}
          ></p>
        </SmartField>
      </div>

      {/* Aba inferior com o Texto de Footer */}
      <div
        className="t-tab absolute bottom-[28%] right-[6%] rounded-l-[19px] py-[6px] pl-[19px] pr-[14px] flex items-center z-10 shadow-md"
        style={{ backgroundColor: colorText }}
      >
        <SmartField field="badge_text" {...sp}>
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerHTML)}
            id="out-fidelize-footer"
            className="t-footer font-sans font-semibold uppercase outline-none font-sans"
            style={{ color: colorAccent, letterSpacing: '2px', fontSize: `${6.8 * sText}px` }}
            dangerouslySetInnerHTML={{ __html: formatText(footer) }}
          ></p>
        </SmartField>
      </div>

      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor="#ffffff" counterColor="#ffffff" counterBg="rgba(0,0,0,0.1)" />
    </div>
  );
}

// ============================================================
// CONTEÚDO EXTRA — VARIANTE 254 (Template 13: May Option)
// ============================================================
export function ContentExtraVariant254(props) {
  const {
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const colorBg = data.backgroundColor || "#fff0f5";
  const colorText = data.textColor || "#d84b79";
  const colorAccent = data.accentColor || brandColor || "#d84b79";

  const title1 = data.titulo || "3ª OPÇÃO";
  const title2 = data.subtitulo || brandHandle || "@maybittencourt.doceria";
  const description = data.texto_apoio || "Tingir o confeito\n(geralmente o leite\nem pó, açúcar ou\ncoco ralado).";
  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1509365465994-3e61c56cb3c0?q=80&w=2000&auto=format&fit=crop";

  const formatText = (text) => {
    if (!text) return "";
    return text.replace(/\\n/g, '<br />').replace(/\n/g, '<br />');
  };

  return (
    <div
      id="tpl-option"
      className="w-full h-full relative flex flex-col overflow-hidden z-0 font-sans transition-colors duration-300"
      style={{ backgroundColor: colorBg }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
      `}} />

      {/* Imagem de Fundo Completa */}
      <SmartField field="imagem" {...sp} className="absolute inset-0 w-full h-full z-0">
        {imageUrl && (
          <ImageBg data={data} imageUrl={imageUrl} className="w-full h-full" />
        )}
      </SmartField>

      {/* Linha Vertical Dourada de Efeito */}
      <div
        className="absolute left-[28%] top-0 w-[1.5px] h-full bg-gradient-to-b from-[#e5c158]/40 via-[#e5c158] to-[#e5c158]/40 z-0 t-gold-line shadow-[0_0_1.5px_rgba(229,193,88,0.5)]"
      ></div>

      {/* Identificação Superior (Title 2) */}
      <div className="absolute top-[18px] left-0 w-full flex justify-center z-10 t-top-div">
        <SmartField field="subtitulo" {...sp}>
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'subtitulo', e.currentTarget.innerHTML)}
            id="out-option-title2"
            className="t-title2 font-sans font-medium tracking-wide outline-none font-sans"
            style={{ color: colorText, fontSize: `${8.1 * sText}px` }}
            dangerouslySetInnerHTML={{ __html: formatText(title2) }}
          ></span>
        </SmartField>
      </div>

      {/* Container Centralizado para o Card */}
      <div className="absolute inset-0 flex items-center justify-end pr-[6%] pl-[32%] z-10 t-card-wrap">
        <div
          className="t-card relative w-full border-[2px] rounded-[9px] py-[25px] px-[15px] shadow-lg flex flex-col items-center justify-center text-center"
          style={{ backgroundColor: colorBg, borderColor: colorAccent }}
        >
          {/* Pill superior (Aba indicativa do card com Title 1) */}
          <div
            className="t-pill absolute -top-[12.4px] left-1/2 -translate-x-1/2 px-[16px] py-[6px] rounded-[6px] shadow-sm flex items-center justify-center whitespace-nowrap"
            style={{ backgroundColor: colorAccent }}
          >
            <SmartField field="titulo" {...sp}>
              <span
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerHTML)}
                id="out-option-title1"
                className="t-title1 font-serif font-bold text-white tracking-wide outline-none"
                style={{ color: '#ffffff', fontSize: `${15.5 * sTitle}px` }}
                dangerouslySetInnerHTML={{ __html: formatText(title1) }}
              ></span>
            </SmartField>
          </div>

          {/* Conteúdo do Card (Descrição) */}
          <SmartField field="texto_apoio" {...sp} className="w-full">
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
              id="out-option-desc"
              className="t-desc font-serif leading-[1.25] outline-none"
              style={{ color: colorText, fontSize: `${19.3 * sText}px` }}
              dangerouslySetInnerHTML={{ __html: formatText(description) }}
            ></p>
          </SmartField>
        </div>
      </div>

      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor="#ffffff" counterColor="#ffffff" counterBg="rgba(0,0,0,0.1)" />
    </div>
  );
}

// ============================================================
// CONTEÚDO EXTRA — VARIANTE 255 (Template 8: BNI Card)
// ============================================================
export function ContentExtraVariant255(props) {
  const {
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const colorBg = data.backgroundColor || "#E3000F";
  const colorText = data.textColor || "#000000";
  const colorAccent = data.accentColor || "#E3000F";

  const title1 = data.titulo || "REDE CERTA GERA";
  const title2 = data.subtitulo || "RECEITA RECORRENTE.";
  const list1 = data.texto_apoio || "No BNI, seu capital social vira <b>equity mensurável</b>. Seu grupo de parceiros indica clientes qualificados semanalmente, <b>substituindo a sorte pela prospecção técnica</b>.";
  const list2 = data.badge_text || "Com exclusividade de segmento, não há concorrência interna, e os clientes recebidos têm <b>retenção superior aos canais tradicionais</b>.";
  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?q=80&w=2000&auto=format&fit=crop";
  const logoUrl = data.logoUrl || brandAvatar || "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/BNI_logo.svg/1024px-BNI_logo.svg.png";

  const formatText = (text) => {
    if (!text) return "";
    return text.replace(/\\n/g, '<br />').replace(/\n/g, '<br />');
  };

  return (
    <div
      id="tpl-bni"
      className="w-full h-full relative flex bg-white overflow-hidden transition-colors duration-300 z-0 font-sans"
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />

      {/* Sidebar de Destaque */}
      <div className="t-sidebar w-[25%] h-full z-0 shrink-0" style={{ backgroundColor: colorBg }} />

      {/* Área de Conteúdo principal */}
      <div className="absolute inset-0 w-full h-full flex flex-col pt-[8%] pl-[30%] pr-[6%] z-10">
        
        {/* Logo */}
        <SmartField field="logoUrl" {...sp} className="self-start mb-[6%] shrink-0">
          {logoUrl && (
            <img
              id="out-bni-logo"
              src={getCorsSafeUrl(logoUrl)}
              className="h-[24px] object-contain"
              alt="Logo"
              crossOrigin="anonymous"
            />
          )}
        </SmartField>

        {/* Título Linha 1 */}
        <SmartField field="titulo" {...sp} className="mb-[2px] leading-none">
          <h1
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerHTML)}
            id="out-bni-title1"
            className="t-title1 font-sans font-black uppercase tracking-tight outline-none inline-block"
            style={{ color: colorText, fontSize: `${17.2 * sTitle}px` }}
            dangerouslySetInnerHTML={{ __html: formatText(title1) }}
          ></h1>
        </SmartField>

        {/* Título Linha 2 Destaque */}
        <SmartField field="subtitulo" {...sp} className="mb-[6%] leading-none">
          <h1
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'subtitulo', e.currentTarget.innerHTML)}
            id="out-bni-title2"
            className="t-title2 font-sans font-black uppercase tracking-tight outline-none inline-block"
            style={{ color: colorAccent, fontSize: `${17.2 * sTitle}px` }}
            dangerouslySetInnerHTML={{ __html: formatText(title2) }}
          ></h1>
        </SmartField>

        {/* Card 1 */}
        <div className="t-card bg-white rounded-xl shadow-md border border-gray-100 p-4 mb-3 w-[110%] -ml-[10%] relative z-20">
          <SmartField field="texto_apoio" {...sp} className="w-full">
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
              id="out-bni-list1"
              className="t-desc font-sans font-medium leading-snug outline-none"
              style={{ color: colorText, fontSize: `${10.4 * sText}px` }}
              dangerouslySetInnerHTML={{ __html: formatText(list1) }}
            ></p>
          </SmartField>
        </div>

        {/* Card 2 */}
        <div className="t-card bg-white rounded-xl shadow-md border border-gray-100 p-4 w-[110%] -ml-[10%] relative z-20">
          <SmartField field="badge_text" {...sp} className="w-full">
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerHTML)}
              id="out-bni-list2"
              className="t-desc font-sans font-medium leading-snug outline-none"
              style={{ color: colorText, fontSize: `${10.4 * sText}px` }}
              dangerouslySetInnerHTML={{ __html: formatText(list2) }}
            ></p>
          </SmartField>
        </div>

      </div>

      {/* Imagem Flutuante */}
      <SmartField field="imagem" {...sp} className="absolute bottom-[6%] -left-[10%] w-[80%] z-30 pointer-events-auto">
        {imageUrl && (
          <img
            id="out-bni-img"
            src={getCorsSafeUrl(imageUrl)}
            className="w-full object-contain drop-shadow-2xl"
            alt="Image"
            crossOrigin="anonymous"
          />
        )}
      </SmartField>

      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor="#000000" counterColor="#000000" counterBg="rgba(0,0,0,0.05)" />
    </div>
  );
}

// ============================================================
// CONTEÚDO EXTRA — VARIANTE 256 (Template 9: Bubble)
// ============================================================
export function ContentExtraVariant256(props) {
  const {
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const colorBg = data.backgroundColor || "#bdf0fd";
  const colorText = data.textColor || "#1a1a1a";
  const colorAccent = data.accentColor || "#ccff00";

  const title1 = data.titulo || "Want To Get Involved?";
  const description = data.texto_apoio || "Join our Bubble on\nCampus Community!";
  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2000&auto=format&fit=crop";

  const formatText = (text) => {
    if (!text) return "";
    return text.replace(/\\n/g, '<br />').replace(/\n/g, '<br />');
  };

  return (
    <div
      id="tpl-bubble"
      className="w-full h-full relative flex flex-col items-center pt-12 pb-6 px-6 z-0 overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: colorBg }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />

      {/* Sparkles SVG */}
      <svg
        className="absolute top-8 left-6 w-6 h-6 z-10 t-sparkle"
        fill={colorAccent}
        viewBox="0 0 24 24"
        style={{ color: colorAccent }}
      >
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" stroke="black" strokeWidth="1" />
      </svg>
      
      <svg
        className="absolute top-20 right-6 w-5 h-5 z-10 t-sparkle"
        fill={colorAccent}
        viewBox="0 0 24 24"
        style={{ color: colorAccent }}
      >
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" stroke="black" strokeWidth="1" />
      </svg>

      {/* Título */}
      <SmartField field="titulo" {...sp} className="z-10 leading-tight tracking-tight text-center">
        <h1
          contentEditable suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerHTML)}
          id="out-bubble-title1"
          className="t-title1 font-sans font-black outline-none inline-block"
          style={{ color: colorText, fontSize: `${22.4 * sTitle}px` }}
          dangerouslySetInnerHTML={{ __html: formatText(title1) }}
        ></h1>
      </SmartField>

      {/* Descrição */}
      <SmartField field="texto_apoio" {...sp} className="z-10 leading-snug text-center mt-2">
        <p
          contentEditable suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
          id="out-bubble-desc"
          className="t-desc font-sans font-medium outline-none inline-block"
          style={{ color: colorText, fontSize: `${14.4 * sText}px` }}
          dangerouslySetInnerHTML={{ __html: formatText(description) }}
        ></p>
      </SmartField>

      {/* Container da Imagem com o Cursor Flutuante */}
      <div className="relative w-full flex-1 mt-6 z-10">
        
        {/* Cursor SVG */}
        <svg
          className="absolute -top-5 right-2 w-10 h-10 z-20 t-cursor"
          fill={colorAccent}
          viewBox="0 0 24 24"
          style={{ color: colorAccent }}
        >
          <path d="M4 0L24 10L14 13L19 22L15 24L10 15L4 20V0Z" stroke="black" strokeWidth="1.5" />
        </svg>

        {/* Imagem usando ImageBg para compatibilidade e segurança */}
        <SmartField field="imagem" {...sp} className="w-full h-full">
          {imageUrl && (
            <ImageBg
              data={data}
              imageUrl={imageUrl}
              className="w-full h-full rounded-[1rem] shadow-lg border-2 border-[#1a1a1a]"
            />
          )}
        </SmartField>
      </div>

      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor={colorText} counterColor={colorText} counterBg="rgba(0,0,0,0.05)" />
    </div>
  );
}

// ============================================================
// CONTEÚDO EXTRA — VARIANTE 257 (Template 10: Quote Highlight)
// ============================================================
export function ContentExtraVariant257(props) {
  const {
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const colorBg = data.backgroundColor || "#F94C66";
  const colorText = data.textColor || "#ffffff";
  const colorAccent = data.accentColor || "#ffffff";

  const title1 = data.titulo || "May Bittencourt";
  const title2 = data.subtitulo || brandHandle || "@maybittencourtdoceria";
  const description = data.texto_apoio || "Montar o cardápio de Natal\nnão é uma tarefa fácil, requer\nmuitos <b>testes, pesquisas de\ntendências, precificação,\nembalagens, compra de\ninsumos e divulgação!</b>";
  const footer = data.badge_text || "Arraste pra o lado";
  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=2000&auto=format&fit=crop";
  const logoUrl = data.logoUrl || brandAvatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop";

  const formatText = (text) => {
    if (!text) return "";
    let formatted = text.replace(/\\n/g, '<br />').replace(/\n/g, '<br />');
    
    // Substitui a tag <b> por um visual destacado na citação usando estilos inline
    const highlightStyle = `style="background-color: ${colorText}; color: ${colorBg}; font-weight: 800;"`;
    formatted = formatted.replace(/<b>(.*?)<\/b>/g, `<span class="t-highlight px-1.5 py-0.5 rounded-sm box-decoration-clone leading-relaxed" ${highlightStyle}>$1</span>`);
    formatted = formatted.replace(/<strong>(.*?)<\/strong>/g, `<span class="t-highlight px-1.5 py-0.5 rounded-sm box-decoration-clone leading-relaxed" ${highlightStyle}>$1</span>`);
    return formatted;
  };

  return (
    <div
      id="tpl-quote"
      className="w-full h-full relative flex flex-col overflow-hidden transition-colors duration-300 z-0 font-sans"
      style={{ backgroundColor: colorBg }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
      `}} />

      {/* Área Superior (Citação e Autor) */}
      <div className="px-8 pt-10 pb-6 relative z-10 flex flex-col t-top-area">
        
        {/* Autor */}
        <div className="flex items-center gap-3 mb-6">
          <SmartField field="logoUrl" {...sp} className="shrink-0">
            {logoUrl && (
              <img
                id="out-quote-logo"
                src={getCorsSafeUrl(logoUrl)}
                className="w-10 h-10 rounded-full object-cover border-[1.5px] border-white shadow-sm"
                alt="Avatar"
                crossOrigin="anonymous"
              />
            )}
          </SmartField>

          <div className="flex flex-col">
            <SmartField field="titulo" {...sp} className="leading-none">
              <span
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerHTML)}
                id="out-quote-title1"
                className="t-title1 font-sans font-bold text-[13.6px] leading-none mb-[2px] outline-none inline-block"
                style={{ color: colorText, fontSize: `${13.6 * sTitle}px` }}
                dangerouslySetInnerHTML={{ __html: formatText(title1) }}
              ></span>
            </SmartField>

            <SmartField field="subtitulo" {...sp} className="leading-none">
              <span
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'subtitulo', e.currentTarget.innerHTML)}
                id="out-quote-title2"
                className="t-title2 font-sans font-light text-[10.4px] leading-none tracking-wide outline-none inline-block"
                style={{ color: `${colorText}E6`, fontSize: `${10.4 * sText}px` }}
                dangerouslySetInnerHTML={{ __html: formatText(title2) }}
              ></span>
            </SmartField>
          </div>
        </div>

        {/* Texto da Citação (Description) */}
        <SmartField field="texto_apoio" {...sp} className="w-full">
          <div
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
            id="out-quote-desc"
            className="t-desc font-serif text-[20px] leading-[1.45] outline-none"
            style={{ color: colorText, fontSize: `${20 * sText}px` }}
            dangerouslySetInnerHTML={{ __html: formatText(description) }}
          ></div>
        </SmartField>

        {/* Footer */}
        <div className="mt-5 flex items-center gap-1.5 t-footer-wrap self-start">
          <SmartField field="badge_text" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerHTML)}
              id="out-quote-footer"
              className="t-footer font-sans font-medium text-[10.4px] border-b pb-0.5 outline-none inline-block"
              style={{ color: colorAccent, borderColor: `${colorAccent}80`, fontSize: `${10.4 * sText}px` }}
              dangerouslySetInnerHTML={{ __html: formatText(footer) }}
            ></span>
          </SmartField>
          
          <svg
            className="w-3 h-3 t-arrow"
            fill="none"
            stroke={colorAccent}
            strokeWidth="2"
            viewBox="0 0 24 24"
            style={{ color: colorAccent }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>

      </div>

      {/* Imagem de Fundo (Área Inferior) */}
      <div className="relative flex-1 w-full z-0">
        <SmartField field="imagem" {...sp} className="absolute inset-0 w-full h-full">
          {imageUrl && (
            <ImageBg
              data={data}
              imageUrl={imageUrl}
              className="w-full h-full object-cover object-top"
            />
          )}
        </SmartField>
      </div>

      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor={colorText} counterColor={colorText} counterBg="rgba(255,255,255,0.15)" />
    </div>
  );
}



// ============================================================
// CONTEÚDO EXTRA — VARIANTE 258 (Template: Alerta de Post)
// ============================================================
export function ContentExtraVariant258(props) {
  const {
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const colorBg = data.backgroundColor || "#331f13";
  const colorText = data.textColor || "#ffffff";
  const colorAccent = data.accentColor || "#f0bd84";

  const title1 = data.titulo || "TEM POST NOVO\nNO FEED";
  const tag = data.tag || "Atenção!";
  const handle = data.subtitulo || brandHandle || "@suapadaria";
  const profile = data.logoUrl || brandAvatar || "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=200&auto=format&fit=crop";
  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1080&auto=format&fit=crop";
  const description = data.texto_apoio || "Vá até o nosso perfil para conferir a\nreceita completa do dia!";
  const badgeText = data.badge_text || "Clique Aqui";

  const formatText = (text) => {
    if (!text) return "";
    return text.replace(/\\n/g, '<br />').replace(/\n/g, '<br />');
  };

  return (
    <div
      id="tpl_new_post_alert"
      className="w-full h-full relative flex flex-col items-center py-10 px-8 z-0 overflow-hidden font-sans"
      style={{ backgroundColor: colorBg }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-display { font-family: 'Montserrat', sans-serif; }
      `}} />

      {/* Top Text */}
      <div className="w-full text-center z-10 mb-3">
        <SmartField field="tag" {...sp} className="leading-none">
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerHTML)}
            className="font-sans font-bold uppercase tracking-[0.2em] outline-none inline-block"
            style={{ color: colorAccent, fontSize: `${12.6 * sTitle}px` }}
            dangerouslySetInnerHTML={{ __html: formatText(tag) }}
          ></h2>
        </SmartField>
        <div className="mt-1">
          <SmartField field="titulo" {...sp} className="leading-[1.1] tracking-tighter">
            <h1
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerHTML)}
              className="font-display font-black outline-none inline-block"
              style={{ color: colorText, fontSize: `${28.8 * sTitle}px` }}
              dangerouslySetInnerHTML={{ __html: formatText(title1) }}
            ></h1>
          </SmartField>
        </div>
      </div>

      {/* Phone Mockup Container */}
      <div className="relative w-[75%] h-[50%] z-10 my-auto flex items-center justify-center">
        {/* Glow Effect Behind Phone */}
        <div className="absolute inset-0 blur-[40px] opacity-25 transform scale-90 rounded-full" style={{ backgroundColor: colorAccent }}></div>
        
        {/* Phone Frame (CSS pure) */}
        <div className="w-full h-full bg-black rounded-[1.8rem] p-1.5 shadow-[0_15px_30px_rgba(0,0,0,0.5)] border-[4px] relative z-10 flex flex-col overflow-hidden" style={{ borderColor: `${colorAccent}99` }}>
          {/* Top Notch/Dynamic Island */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[35%] h-3.5 bg-black rounded-b-[0.6rem] z-30" style={{ backgroundColor: `${colorAccent}99` }}></div>
          
          {/* Instagram Header Mockup */}
          <div className="w-full h-[25px] bg-white flex items-center px-1.5 z-20 shrink-0">
            <div className="w-3.5 h-3.5 rounded-full overflow-hidden mr-1 border border-gray-200 shrink-0">
              {profile && (
                <img
                  src={getCorsSafeUrl(profile)}
                  className="w-full h-full object-cover"
                  alt="Avatar"
                  crossOrigin="anonymous"
                />
              )}
            </div>
            <SmartField field="subtitulo" {...sp} className="leading-none">
              <span
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'subtitulo', e.currentTarget.innerText)}
                className="font-sans font-semibold text-black outline-none inline-block"
                style={{ fontSize: `${8 * sText}px` }}
              >
                {handle}
              </span>
            </SmartField>
          </div>
          
          {/* Image inside Phone */}
          <div className="w-full flex-1 relative bg-zinc-900 overflow-hidden">
            <SmartField field="imagem" {...sp} className="w-full h-full">
              {imageUrl && (
                <ImageBg
                  data={data}
                  imageUrl={imageUrl}
                  className="w-full h-full"
                />
              )}
            </SmartField>
          </div>
        </div>

        {/* "Tap Here" Floating Sticker */}
        <div className="absolute -bottom-4 -right-4 z-30 transform rotate-[-10deg]">
          <div className="bg-white px-3 py-1.5 rounded-full shadow-2xl border-2 flex items-center gap-1" style={{ borderColor: colorAccent }}>
            <SmartField field="badge_text" {...sp} className="leading-none">
              <span
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerText)}
                className="font-sans font-black uppercase tracking-tight outline-none inline-block"
                style={{ color: colorBg, fontSize: `${13.6 * sText}px` }}
              >
                {badgeText}
              </span>
            </SmartField>
          </div>
          {/* Arrow SVG pointing up-left */}
          <svg className="absolute -top-7 -left-3.5 w-8 h-8 transform rotate-[-45deg] drop-shadow-md" style={{ color: colorText }} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="w-full text-center z-10 mt-3 pb-2">
        <SmartField field="texto_apoio" {...sp} className="leading-[1.3]">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
            className="font-sans font-light outline-none"
            style={{ color: colorText, fontSize: `${12.6 * sText}px` }}
            dangerouslySetInnerHTML={{ __html: formatText(description) }}
          ></p>
        </SmartField>
      </div>

      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor={colorText} counterColor={colorText} counterBg="rgba(255,255,255,0.08)" />
    </div>
  );
}

// ============================================================
// CONTEÚDO EXTRA — VARIANTE 259 (Template: Caixa Presente)
// ============================================================
export function ContentExtraVariant259(props) {
  const {
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const colorBg = data.backgroundColor || "#fcb116";
  const colorText = data.textColor || "#331f13";
  const colorAccent = data.accentColor || "#eb1c24";

  const logoUrl = data.logoUrl || brandLogo || brandAvatar || "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/256px-React-icon.svg.png";
  const subtitle = data.subtitulo || "Caixa Presente";
  const title1 = data.titulo || "PÃO DE QUEIJO";
  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?q=80&w=800&auto=format&fit=crop";
  const badgeText = data.badge_text || "NOVO\nSABOR";
  const description = data.texto_apoio || "Uma seleção exclusiva dos nossos <b>melhores pães de queijo</b> recheados. O presente perfeito para qualquer hora do dia.";
  const cta = data.slide_call || "COMPRAR AGORA";

  const formatText = (text) => {
    if (!text) return "";
    return text.replace(/\\n/g, '<br />').replace(/\n/g, '<br />');
  };

  return (
    <div
      id="tpl_caixa_pao"
      className="w-full h-full relative flex flex-col px-8 py-10 z-0 overflow-hidden font-sans transition-colors duration-300"
      style={{ backgroundColor: colorBg }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-display { font-family: 'Montserrat', sans-serif; }
      `}} />

      {/* Logo superior com filtro de cor opcional */}
      <div className="w-full flex justify-center z-10 mb-2 mt-4 shrink-0">
        <SmartField field="logoUrl" {...sp} className="h-[36px]">
          {logoUrl && (
            <img
              id="tpl_caixa_logo"
              src={getCorsSafeUrl(logoUrl)}
              className="h-full object-contain filter drop-shadow-sm"
              style={{ filter: "brightness(0) saturate(100%) invert(18%) sepia(85%) saturate(3015%) hue-rotate(349deg) brightness(85%) contrast(97%)" }}
              alt="Logo"
              crossOrigin="anonymous"
            />
          )}
        </SmartField>
      </div>

      {/* Título e Kicker */}
      <div className="w-full text-center z-10 mb-2 shrink-0">
        <SmartField field="subtitulo" {...sp} className="leading-none">
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'subtitulo', e.currentTarget.innerText)}
            className="font-sans font-bold tracking-widest uppercase mb-1 outline-none inline-block font-sans"
            style={{ color: colorText, fontSize: `${13 * sTitle}px` }}
          >
            {subtitle}
          </h2>
        </SmartField>
        <div className="leading-none">
          <SmartField field="titulo" {...sp}>
            <h1
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerHTML)}
              className="font-display font-black leading-none tracking-tighter outline-none inline-block"
              style={{ color: colorAccent, fontSize: `${34.2 * sTitle}px` }}
              dangerouslySetInnerHTML={{ __html: formatText(title1) }}
            ></h1>
          </SmartField>
        </div>
      </div>

      {/* Imagem Box com Molduras Rotacionadas e Badge */}
      <div className="relative w-full flex-1 flex justify-center items-center z-10 my-2">
        {/* Molduras Rotacionadas (efeito 3D) */}
        <div className="absolute w-[80%] h-[80%] rounded-[1.5rem] shadow-lg transform rotate-[-2deg]" style={{ backgroundColor: colorText }}></div>
        <div className="absolute w-[80%] h-[80%] rounded-[1.5rem] shadow-lg transform rotate-[2deg] bg-white"></div>
        
        {/* Moldura Interna com Imagem */}
        <div className="relative w-[75%] h-[75%] rounded-[1.2rem] overflow-hidden border-2 border-white shadow-inner">
          <SmartField field="imagem" {...sp} className="w-full h-full">
            {imageUrl && (
              <ImageBg
                data={data}
                imageUrl={imageUrl}
                className="w-full h-full"
              />
            )}
          </SmartField>
        </div>

        {/* Badge flutuante redondo */}
        <div className="absolute top-4 right-2 w-14 h-14 rounded-full flex items-center justify-center transform rotate-[15deg] shadow-lg border-2 border-white" style={{ backgroundColor: colorAccent }}>
          <SmartField field="badge_text" {...sp} className="leading-none">
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerHTML)}
              className="font-display font-black text-white text-center inline-block outline-none"
              style={{ fontSize: `${11.5 * sText}px` }}
              dangerouslySetInnerHTML={{ __html: formatText(badgeText) }}
            ></span>
          </SmartField>
        </div>
      </div>

      {/* Descrição */}
      <div className="w-full text-center z-10 mt-2 mb-2 px-4 shrink-0">
        <SmartField field="texto_apoio" {...sp} className="leading-[1.3] tracking-tight">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
            className="font-sans font-medium outline-none"
            style={{ color: colorText, fontSize: `${13.6 * sText}px` }}
            dangerouslySetInnerHTML={{ __html: formatText(description) }}
          ></p>
        </SmartField>
      </div>

      {/* Botão de Ação */}
      <div className="w-full flex justify-center z-10 shrink-0">
        <div className="rounded-full px-5 py-2 flex items-center shadow-md border-2" style={{ backgroundColor: colorText, borderColor: colorText }}>
          <SmartField field="slide_call" {...sp} className="leading-none">
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'slide_call', e.currentTarget.innerText)}
              className="font-sans font-bold outline-none inline-block font-sans"
              style={{ color: colorBg, fontSize: `${11.5 * sText}px` }}
            >
              {cta}
            </span>
          </SmartField>
        </div>
      </div>

      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor={colorText} counterColor={colorText} counterBg="rgba(0,0,0,0.05)" />
    </div>
  );
}

// ============================================================
// CONTEÚDO EXTRA — VARIANTE 260 (Template: Quote Minimalista)
// ============================================================
export function ContentExtraVariant260(props) {
  const {
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const colorBg = data.backgroundColor || "#361718";
  const colorText = data.textColor || "#ffffff";
  const colorAccent = data.accentColor || "#f0bd84";

  const description = data.texto_apoio || "Os ingredientes de <span style=\"color: var(--text-accent);\">qualidade</span> são apenas o começo. O verdadeiro segredo é o <span style=\"color: var(--text-accent);\">processo artesanal</span> que respeita o tempo da massa.";
  const author = data.titulo || "Chef Roberta";
  const role = data.subtitulo || "Mestre Padeira";
  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1080&auto=format&fit=crop";
  const logoUrl = data.logoUrl || brandLogo || brandAvatar || "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/256px-React-icon.svg.png";

  const formatText = (text) => {
    if (!text) return "";
    let formatted = text.replace(/\\n/g, '<br />').replace(/\n/g, '<br />');
    // Substitui var(--text-accent) pela cor dinâmica colorAccent
    formatted = formatted.replace(/var\(--text-accent\)/g, colorAccent);
    return formatted;
  };

  return (
    <div
      id="tpl_quote_minimal"
      className="w-full h-full relative flex flex-col px-8 py-10 z-0 overflow-hidden font-sans transition-colors duration-300"
      style={{ backgroundColor: colorBg }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
      `}} />

      {/* Quote e Autor Area */}
      <div className="w-full relative z-10 pt-4 pb-4">
        {/* Ícone de Aspas Gigante */}
        <div className="absolute -top-6 -left-3 opacity-20 pointer-events-none z-0">
          <span className="font-serif font-black text-[120px] leading-none text-white">"</span>
        </div>

        {/* Texto da Citação */}
        <SmartField field="texto_apoio" {...sp} className="relative z-10 leading-[1.3] tracking-tight">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
            className="font-sans font-medium outline-none"
            style={{ color: colorText, fontSize: `${20.8 * sText}px` }}
            dangerouslySetInnerHTML={{ __html: formatText(description) }}
          ></p>
        </SmartField>

        {/* Autor e Cargo */}
        <div className="mt-4 leading-none">
          <SmartField field="titulo" {...sp} className="leading-none">
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
              className="font-sans font-bold tracking-wide outline-none inline-block font-sans"
              style={{ color: colorText, fontSize: `${13 * sTitle}px` }}
            >
              {author}
            </p>
          </SmartField>
          <div className="mt-0.5 leading-none">
            <SmartField field="subtitulo" {...sp} className="leading-none">
              <p
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'subtitulo', e.currentTarget.innerText)}
                className="font-sans font-light tracking-widest uppercase opacity-80 outline-none inline-block font-sans"
                style={{ color: colorText, fontSize: `${9.3 * sText}px` }}
              >
                {role}
              </p>
            </SmartField>
          </div>
        </div>
      </div>

      {/* Imagem Box com Logo no Canto Inferior Direito */}
      <div className="w-full flex-1 relative z-10 mt-3 rounded-[1rem] overflow-hidden shadow-xl border border-white/10">
        <SmartField field="imagem" {...sp} className="w-full h-full">
          {imageUrl && (
            <ImageBg
              data={data}
              imageUrl={imageUrl}
              className="w-full h-full"
            />
          )}
        </SmartField>
        {/* Overlay do degradê */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
        
        {/* Logo */}
        <div className="absolute bottom-4 right-4 z-20 h-6 shrink-0">
          <SmartField field="logoUrl" {...sp} className="h-full">
            {logoUrl && (
              <img
                id="tpl_quote_logo"
                src={getCorsSafeUrl(logoUrl)}
                className="h-full object-contain filter brightness-0 invert opacity-90 drop-shadow-md"
                alt="Logo"
                crossOrigin="anonymous"
              />
            )}
          </SmartField>
        </div>
      </div>

      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor={colorText} counterColor={colorText} counterBg="rgba(255,255,255,0.08)" />
    </div>
  );
}



// ============================================================
// CONTEÚDO EXTRA — VARIANTE 261 (Template: Padrão Brutalista)
// ============================================================
export function ContentExtraVariant261(props) {
  const {
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const colorBg = data.backgroundColor || "#f5ebdc";
  const colorText = data.textColor || "#502314";

  const title = data.titulo || "BK MILANESA";
  const description = data.texto_apoio || "Imagens meramente ilustrativas. TM & © 2024 Sua Marca.\nTodos os direitos reservados.";
  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=1080&auto=format&fit=crop";

  const formatText = (text) => {
    if (!text) return "";
    return text.replace(/\\n/g, '<br />').replace(/\n/g, '<br />');
  };

  return (
    <div
      id="tpl_pattern_brutalist"
      className="w-full h-full relative flex flex-col justify-between overflow-hidden font-sans"
      style={{ backgroundColor: colorBg }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Alfa+Slab+One&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-slab { font-family: 'Alfa Slab One', serif; }
      `}} />

      {/* Background repetido de texto */}
      <div className="absolute inset-0 flex flex-col justify-center gap-1.5 z-0 pointer-events-none py-10 select-none overflow-hidden">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="flex items-center justify-center whitespace-nowrap gap-8 w-[120%] -ml-[10%] shrink-0">
            <span
              className="font-slab uppercase leading-none opacity-90 tracking-tight"
              style={{ color: colorText, fontSize: `${57.6 * sTitle}px` }}
            >
              {title} {title}
            </span>
          </div>
        ))}
      </div>

      {/* Produto no Centro flutuante */}
      <div className="absolute bottom-[-5%] left-1/2 transform -translate-x-1/2 w-[110%] h-[75%] z-10 flex items-end justify-center pointer-events-none">
        <SmartField field="imagem" {...sp} className="w-full h-full pointer-events-auto">
          {imageUrl && (
            <img
              id="tpl_pattern_product"
              src={getCorsSafeUrl(imageUrl)}
              className="w-full h-full object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.4)]"
              alt="Product"
              crossOrigin="anonymous"
            />
          )}
        </SmartField>
      </div>

      {/* Disclaimer do Rodapé */}
      <div className="absolute bottom-10 left-0 w-full px-8 flex justify-between items-end z-20">
        <SmartField field="texto_apoio" {...sp} className="max-w-[150px] leading-tight text-left">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
            id="tpl_pattern_disclaimer"
            className="font-sans text-[6.5px] font-normal opacity-80 outline-none"
            style={{ color: colorText, fontSize: `${6.5 * sText}px` }}
            dangerouslySetInnerHTML={{ __html: formatText(description) }}
          ></p>
        </SmartField>
      </div>

      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor={colorText} counterColor={colorText} counterBg="rgba(0,0,0,0.05)" />
    </div>
  );
}

// ============================================================
// CONTEÚDO EXTRA — VARIANTE 262 (Template: Corp. Checklist)
// ============================================================
export function ContentExtraVariant262(props) {
  const {
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const colorBg = data.backgroundColor || "#E3000F";
  const colorText = data.textColor || "#FFFFFF";

  const logoUrl = data.logoUrl || brandAvatar || "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/BNI_logo.svg/1024px-BNI_logo.svg.png";
  const title1 = data.titulo || "SUA EMPRESA TERÁ\nVOZ EXCLUSIVA?";
  const description = data.texto_apoio || "A expansão traz uma <b>regra de ouro</b>:\napenas uma autoridade por segmento na mesa.";
  const list1 = data.list_item_1 || "<b>Blindagem:</b> Ocupe o seu espaço antes do seu concorrente.";
  const list2 = data.list_item_2 || "<b>Previsibilidade:</b> Um sistema que gera parcerias e indicações auditáveis semanalmente.";
  const list3 = data.list_item_3 || "<b>Conexão:</b> Acesso direto à nossa rede de +20 mil empresários no Brasil.";

  const formatText = (text) => {
    if (!text) return "";
    return text.replace(/\\n/g, '<br />').replace(/\n/g, '<br />');
  };

  return (
    <div
      id="template_corp_checklist"
      className="w-full h-full relative font-sans flex flex-col px-8 py-10 transition-colors duration-300 z-0"
      style={{ backgroundColor: colorBg }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800;900&family=Oswald:wght@300;400;500;700;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-oswald { font-family: 'Oswald', sans-serif; }
      `}} />

      {/* Logo */}
      <div className="w-full flex justify-center mb-6 mt-4 shrink-0">
        <SmartField field="logoUrl" {...sp} className="h-[27.2px]">
          {logoUrl && (
            <img
              id="tcc-logo"
              src={getCorsSafeUrl(logoUrl)}
              className="h-full w-auto object-contain"
              alt="Logo"
              crossOrigin="anonymous"
            />
          )}
        </SmartField>
      </div>

      {/* Title */}
      <div className="w-full flex flex-col mb-4 shrink-0 text-left">
        <SmartField field="titulo" {...sp} className="leading-[1.1] tracking-tighter">
          <h1
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerHTML)}
            id="tcc-title"
            className="font-oswald font-normal uppercase outline-none inline-block font-oswald"
            style={{ color: colorText, fontSize: `${31.1 * sTitle}px` }}
            dangerouslySetInnerHTML={{ __html: formatText(title1) }}
          ></h1>
        </SmartField>
      </div>

      {/* Desc */}
      <div className="w-full mb-6 shrink-0 text-left">
        <SmartField field="texto_apoio" {...sp} className="leading-[1.4]">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
            id="tcc-desc"
            className="font-sans font-normal outline-none"
            style={{ color: colorText, fontSize: `${17.5 * sText}px` }}
            dangerouslySetInnerHTML={{ __html: formatText(description) }}
          ></p>
        </SmartField>
      </div>

      {/* Cards de Checklist */}
      <div className="w-full flex flex-col gap-4">
        {/* Card 1 */}
        <div className="relative bg-white rounded-xl shadow-md p-3.5 pl-6 text-left">
          <div className="absolute top-1.5 left-1.5 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5 drop-shadow-sm shrink-0" fill="none" viewBox="0 0 24 24" stroke={colorBg} strokeWidth="4" style={{ color: colorBg, width: '18px', height: '18px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <SmartField field="list_item_1" {...sp} className="w-full leading-[1.3]">
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'list_item_1', e.currentTarget.innerHTML)}
              id="tcc-list1"
              className="text-black font-normal outline-none"
              style={{ fontSize: `${13.6 * sText}px` }}
              dangerouslySetInnerHTML={{ __html: formatText(list1) }}
            ></p>
          </SmartField>
        </div>

        {/* Card 2 */}
        <div className="relative bg-white rounded-xl shadow-md p-3.5 pl-6 text-left">
          <div className="absolute top-1.5 left-1.5 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5 drop-shadow-sm shrink-0" fill="none" viewBox="0 0 24 24" stroke={colorBg} strokeWidth="4" style={{ color: colorBg, width: '18px', height: '18px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <SmartField field="list_item_2" {...sp} className="w-full leading-[1.3]">
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'list_item_2', e.currentTarget.innerHTML)}
              id="tcc-list2"
              className="text-black font-normal outline-none"
              style={{ fontSize: `${13.6 * sText}px` }}
              dangerouslySetInnerHTML={{ __html: formatText(list2) }}
            ></p>
          </SmartField>
        </div>

        {/* Card 3 */}
        <div className="relative bg-white rounded-xl shadow-md p-3.5 pl-6 text-left">
          <div className="absolute top-1.5 left-1.5 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5 drop-shadow-sm shrink-0" fill="none" viewBox="0 0 24 24" stroke={colorBg} strokeWidth="4" style={{ color: colorBg, width: '18px', height: '18px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <SmartField field="list_item_3" {...sp} className="w-full leading-[1.3]">
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'list_item_3', e.currentTarget.innerHTML)}
              id="tcc-list3"
              className="text-black font-normal outline-none"
              style={{ fontSize: `${13.6 * sText}px` }}
              dangerouslySetInnerHTML={{ __html: formatText(list3) }}
            ></p>
          </SmartField>
        </div>
      </div>

      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor={colorText} counterColor={colorText} counterBg="rgba(0,0,0,0.05)" />
    </div>
  );
}

// ============================================================
// CONTEÚDO EXTRA — VARIANTE 263 (Template: Corp. Palestrante)
// ============================================================
export function ContentExtraVariant263(props) {
  const {
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const colorBg = data.backgroundColor || "#FFFFFF";
  const colorAccent = data.accentColor || "#E3000F";

  const logoUrl = data.logoUrl || brandAvatar || "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/BNI_logo.svg/1024px-BNI_logo.svg.png";
  const title = data.titulo || "NIGRO FALA EM\nEQUITY. <b>E VOCÊ?</b>";
  const desc1 = data.texto_apoio || "No BNI, seu <b>capital social</b> vira <b>equity mensurável</b>. Seu grupo de parceiros indica clientes qualificados semanalmente, substituindo a sorte pela <b>prospecção técnica.</b>";
  const desc2 = data.badge_text || "Com exclusividade de segmento, não há concorrência interna, e os clientes recebidos têm retenção superior aos canais tradicionais.";
  const imageProduct = data.imageUrl || "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-confident-businessman-in-suit-png-image_10204780.png";

  const formatText = (text, isTitle = false) => {
    if (!text) return "";
    let formatted = text.replace(/\\n/g, '<br />').replace(/\n/g, '<br />');
    if (isTitle) {
      // Pinta as tags <b> com a cor secundária (colorAccent)
      const bStyle = `style="color: ${colorAccent}; font-weight: inherit;"`;
      formatted = formatted.replace(/<b>(.*?)<\/b>/g, `<b ${bStyle}>$1</b>`);
      formatted = formatted.replace(/<strong>(.*?)<\/strong>/g, `<b ${bStyle}>$1</b>`);
    }
    return formatted;
  };

  return (
    <div
      id="template_corp_speaker"
      className="w-full h-full relative font-sans overflow-hidden transition-colors duration-300 z-0 font-sans"
      style={{ backgroundColor: colorBg }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800;900&family=Oswald:wght@300;400;500;700;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-oswald { font-family: 'Oswald', sans-serif; }
      `}} />

      {/* Faixa lateral decorativa de destaque */}
      <div className="absolute top-0 right-0 w-[15%] h-[55%] z-0 transition-colors duration-300" style={{ backgroundColor: colorAccent }}></div>

      {/* Logo */}
      <div className="absolute top-[8%] left-0 w-full flex justify-center z-10">
        <SmartField field="logoUrl" {...sp} className="h-[25.2px]">
          {logoUrl && (
            <img
              id="tcs-logo"
              src={getCorsSafeUrl(logoUrl)}
              className="h-full w-auto object-contain"
              alt="Logo"
              crossOrigin="anonymous"
            />
          )}
        </SmartField>
      </div>

      {/* Title */}
      <div className="absolute top-[21%] left-[8%] w-[80%] z-10 text-left">
        <SmartField field="titulo" {...sp} className="leading-[1.05] tracking-tighter">
          <h1
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerHTML)}
            id="tcs-title"
            className="font-oswald font-black uppercase text-black outline-none inline-block font-oswald"
            style={{ fontSize: `${35 * sTitle}px` }}
            dangerouslySetInnerHTML={{ __html: formatText(title, true) }}
          ></h1>
        </SmartField>
      </div>

      {/* Descrições (Cards) */}
      <div className="absolute top-[42%] left-[8%] w-[65%] flex flex-col gap-3.5 z-10 text-left">
        {/* Card 1 */}
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100/50 relative overflow-hidden">
          <SmartField field="texto_apoio" {...sp} className="w-full leading-[1.5]">
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
              id="tcs-desc1"
              className="text-black font-normal outline-none"
              style={{ fontSize: `${13.2 * sText}px` }}
              dangerouslySetInnerHTML={{ __html: formatText(desc1) }}
            ></p>
          </SmartField>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100/50 relative overflow-hidden">
          <SmartField field="badge_text" {...sp} className="w-full leading-[1.5]">
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'badge_text', e.currentTarget.innerHTML)}
              id="tcs-desc2"
              className="text-black font-normal outline-none"
              style={{ fontSize: `${13.2 * sText}px` }}
              dangerouslySetInnerHTML={{ __html: formatText(desc2) }}
            ></p>
          </SmartField>
        </div>
      </div>

      {/* Palestrante (Recorte) */}
      <div className="absolute bottom-0 right-[-10%] w-[65%] h-[80%] z-20 flex items-end justify-end pointer-events-none drop-shadow-2xl">
        <SmartField field="imagem" {...sp} className="w-full h-full pointer-events-auto">
          {imageProduct && (
            <img
              id="tcs-image-product"
              src={getCorsSafeUrl(imageProduct)}
              className="w-full max-h-full object-contain object-bottom"
              alt="Speaker"
              crossOrigin="anonymous"
            />
          )}
        </SmartField>
      </div>

      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor="#000000" counterColor="#000000" counterBg="rgba(0,0,0,0.05)" />
    </div>
  );
}



// ============================================================
// CONTEÚDO EXTRA — VARIANTE 264 (Template: Divisão Diagonal Clássica)
// ============================================================
export function ContentExtraVariant264(props) {
  const {
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const colorBg = data.backgroundColor || "#ffffff";
  const colorText = data.textColor || "#111827";
  const colorAccent = data.accentColor || brandColor || "#ec4899";

  const title1 = data.titulo || "Bolo Red Velvet\nSupremo";
  const tag = data.tag || "Novidade";
  const description = data.texto_apoio || "Massa aveludada com um toque de cacau e recheio cremoso de cream cheese. A combinação perfeita para adoçar o seu dia.";
  const cta = data.slide_call || "Encomende Já";
  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1616031037011-08bc3e8631bc?q=80&w=800&auto=format&fit=crop";

  const formatText = (text) => {
    if (!text) return "";
    return text.replace(/\\n/g, '<br />').replace(/\n/g, '<br />');
  };

  return (
    <div
      id="template1"
      className="w-full h-full relative flex overflow-hidden font-sans"
      style={{ backgroundColor: colorBg }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-display { font-family: 'Montserrat', sans-serif; }
      `}} />

      {/* Metade Esquerda (Imagem com Clip Path) */}
      <div
        className="w-[55%] h-full relative z-10 shrink-0"
        style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)' }}
      >
        <SmartField field="imagem" {...sp} className="w-full h-full">
          {imageUrl && (
            <ImageBg data={data} imageUrl={imageUrl} className="w-full h-full" />
          )}
        </SmartField>
        {/* Overlay colorido sutil */}
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundColor: colorAccent }}></div>
      </div>

      {/* Metade Direita (Texto) */}
      <div className="w-[55%] h-full absolute right-0 flex flex-col justify-center px-8 z-0 text-left">
        <div className="w-[85%] ml-auto pr-2">
          {/* Tag */}
          <SmartField field="tag" {...sp} className="mb-2 block leading-none">
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="font-sans font-bold tracking-widest uppercase outline-none inline-block font-sans"
              style={{ color: colorAccent, fontSize: `${6.5 * sText}px` }}
            >
              {tag}
            </span>
          </SmartField>

          {/* Título */}
          <SmartField field="titulo" {...sp} className="mb-4 block leading-tight">
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerHTML)}
              className="font-display font-bold outline-none inline-block"
              style={{ color: colorText, fontSize: `${25.9 * sTitle}px` }}
              dangerouslySetInnerHTML={{ __html: formatText(title1) }}
            ></h2>
          </SmartField>

          {/* Descrição */}
          <SmartField field="texto_apoio" {...sp} className="mb-6 block leading-relaxed">
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
              className="font-serif outline-none"
              style={{ color: `${colorText}B3`, fontSize: `${8.6 * sText}px` }}
              dangerouslySetInnerHTML={{ __html: formatText(description) }}
            ></p>
          </SmartField>

          {/* Botão CTA */}
          <SmartField field="slide_call" {...sp} className="inline-block">
            <div
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'slide_call', e.currentTarget.innerText)}
              className="text-white inline-block px-5 py-2.5 rounded-full font-bold outline-none font-sans"
              style={{ backgroundColor: colorAccent, fontSize: `${8.6 * sText}px` }}
            >
              {cta}
            </div>
          </SmartField>
        </div>
      </div>

      {/* Elementos Decorativos de Fundo */}
      <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full mix-blend-multiply filter blur-xl opacity-20 pointer-events-none" style={{ backgroundColor: `${colorAccent}33` }}></div>
      <div className="absolute top-20 right-20 w-24 h-24 rounded-full mix-blend-multiply filter blur-xl opacity-10 pointer-events-none" style={{ backgroundColor: `${colorAccent}33` }}></div>

      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor={colorText} counterColor={colorText} counterBg="rgba(0,0,0,0.05)" />
    </div>
  );
}

// ============================================================
// CONTEÚDO EXTRA — VARIANTE 265 (Template: O Clássico - Palavra Vazando)
// ============================================================
export function ContentExtraVariant265(props) {
  const {
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const colorBg = data.backgroundColor || "#ffe4e6";
  const colorText = data.textColor || "#111827";
  const colorAccent = data.accentColor || brandColor || "#ec4899";

  const title1 = data.titulo || "O autêntico\n<b>sabor</b> da\ninfância.";
  const backgroundWord = data.badge_text || "BRIGADEIRO";
  const tag = data.tag || "Favorito";
  const description = data.texto_apoio || "Feito com chocolate belga e muito carinho. O docinho que não pode faltar em nenhuma comemoração.";
  const cta = data.slide_call || "Fazer Encomenda";
  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1548907040-4d42b52125b0?q=80&w=800&auto=format&fit=crop";

  const formatText = (text, isTitle = false) => {
    if (!text) return "";
    let formatted = text.replace(/\\n/g, '<br />').replace(/\n/g, '<br />');
    if (isTitle) {
      // Pinta as tags <b> com a cor de destaque (colorAccent)
      const bStyle = `style="color: ${colorAccent};"`;
      formatted = formatted.replace(/<b>(.*?)<\/b>/g, `<span ${bStyle}>$1</span>`);
      formatted = formatted.replace(/<strong>(.*?)<\/strong>/g, `<span ${bStyle}>$1</span>`);
    }
    return formatted;
  };

  return (
    <div
      id="template1"
      className="w-full h-full relative flex overflow-hidden font-sans transition-colors duration-300"
      style={{ backgroundColor: colorBg }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-display { font-family: 'Montserrat', sans-serif; }
      `}} />

      {/* Palavra Gigante ao Fundo */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none tracking-tighter opacity-10 whitespace-nowrap">
        <SmartField field="badge_text" {...sp}>
          <span
            className="font-display font-black uppercase text-center block"
            style={{ color: colorAccent, fontSize: `${80.6 * sTitle}px` }}
          >
            {backgroundWord}
          </span>
        </SmartField>
      </div>

      {/* Coluna Texto */}
      <div className="w-1/2 h-full flex flex-col justify-center pl-8 pr-4 z-10 text-left">
        <div className="mb-4 block">
          <SmartField field="tag" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
              className="text-white text-[7.2px] font-bold px-3 py-1 rounded uppercase tracking-widest outline-none inline-block font-sans"
              style={{ backgroundColor: colorAccent, fontSize: `${7.2 * sText}px` }}
            >
              {tag}
            </span>
          </SmartField>
        </div>

        <SmartField field="titulo" {...sp} className="mb-4 block leading-tight">
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerHTML)}
            className="font-display font-bold outline-none inline-block"
            style={{ color: colorText, fontSize: `${25.9 * sTitle}px` }}
            dangerouslySetInnerHTML={{ __html: formatText(title1, true) }}
          ></h2>
        </SmartField>

        <SmartField field="texto_apoio" {...sp} className="mb-6 block leading-relaxed">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
            className="font-serif outline-none"
            style={{ color: `${colorText}E6`, fontSize: `${8.6 * sText}px` }}
            dangerouslySetInnerHTML={{ __html: formatText(description) }}
          ></p>
        </SmartField>

        <div>
          <SmartField field="slide_call" {...sp}>
            <button
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'slide_call', e.currentTarget.innerText)}
              className="border-2 px-5 py-2.5 font-bold uppercase transition-colors duration-300 outline-none font-sans"
              style={{ borderColor: colorAccent, color: colorAccent, fontSize: `${8.6 * sText}px` }}
            >
              {cta}
            </button>
          </SmartField>
        </div>
      </div>

      {/* Coluna Imagem */}
      <div className="w-1/2 h-full p-8 z-10 flex items-center justify-center">
        <div className="w-full h-[75%] rounded-[1.8rem] overflow-hidden shadow-2xl relative">
          <SmartField field="imagem" {...sp} className="w-full h-full">
            {imageUrl && (
              <ImageBg data={data} imageUrl={imageUrl} className="w-full h-full" />
            )}
          </SmartField>
        </div>
      </div>

      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor={colorText} counterColor={colorText} counterBg="rgba(0,0,0,0.05)" />
    </div>
  );
}

// ============================================================
// CONTEÚDO EXTRA — VARIANTE 266 (Template: Party People)
// ============================================================
export function ContentExtraVariant266(props) {
  const {
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const colorBg = data.backgroundColor || "#ffffff";
  const colorAccent = data.accentColor || brandColor || "#ec4899";
  const colorText = data.textColor || "#ffffff";

  const title1 = data.titulo || "SABOR INCRÍVEL";
  const subtitle = data.subtitulo || "SEU NOME AQUI";
  const tag = data.tag || "A MELHOR DOCERIA PARA CELEBRAÇÕES";
  const description = data.texto_apoio || "FAÇA SUA ENCOMENDA";
  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1000&auto=format&fit=crop";

  const formatText = (text) => {
    if (!text) return "";
    return text.replace(/\\n/g, '<br />').replace(/\n/g, '<br />');
  };

  return (
    <div
      id="template1"
      className="w-full h-full relative flex overflow-hidden font-sans transition-colors duration-300 z-0"
      style={{ backgroundColor: colorBg }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800;900&family=Oswald:wght@300;400;500;700;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-retro { font-family: 'Oswald', sans-serif; }
      `}} />

      {/* Imagem de Fundo (Quase toda a tela) */}
      <div className="absolute right-0 top-0 w-[88%] h-full z-0">
        <SmartField field="imagem" {...sp} className="w-full h-full">
          {imageUrl && (
            <ImageBg data={data} imageUrl={imageUrl} className="w-full h-full" />
          )}
        </SmartField>
      </div>

      {/* Faixa Lateral Sólida */}
      <div className="absolute left-0 top-0 w-[24%] h-full z-10 transition-colors" style={{ backgroundColor: colorAccent }}></div>

      {/* Texto Gigante Rotacionado com Efeito Overlap */}
      <div
        className="absolute left-[-28.8px] bottom-[20%] z-20 transform -rotate-90 origin-bottom-left w-[486px] text-left"
      >
        <SmartField field="titulo" {...sp} className="leading-none">
          <h1
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            className="font-retro font-black tracking-tight leading-none m-0 uppercase drop-shadow-2xl outline-none select-all"
            style={{ fontSize: `${77.7 * sTitle}px`, color: colorText, mixBlendMode: 'difference' }}
          >
            {title1}
          </h1>
        </SmartField>
      </div>

      {/* Texto Superior Flutuante */}
      <div className="absolute top-10 right-8 z-30 text-right">
        <SmartField field="tag" {...sp}>
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            className="font-sans font-bold tracking-widest drop-shadow-md outline-none"
            style={{ color: colorText, fontSize: `${7.2 * sText}px` }}
          >
            {tag}
          </p>
        </SmartField>
      </div>

      {/* Card Inferior Direito */}
      <div className="absolute bottom-10 right-8 z-30 bg-white px-6 py-4 shadow-xl border border-gray-100 flex flex-col text-left">
        <SmartField field="subtitulo" {...sp} className="leading-tight mb-1">
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'subtitulo', e.currentTarget.innerText)}
            className="font-retro outline-none"
            style={{ color: colorAccent, fontSize: `${18 * sTitle}px` }}
          >
            {subtitle}
          </h2>
        </SmartField>
        <SmartField field="texto_apoio" {...sp} className="leading-tight">
          <h3
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
            className="font-retro opacity-90 outline-none"
            style={{ color: colorAccent, fontSize: `${14.4 * sText}px` }}
          >
            {description}
          </h3>
        </SmartField>
      </div>

      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor="#ffffff" counterColor="#ffffff" counterBg="rgba(0,0,0,0.2)" />
    </div>
  );
}

// ============================================================
// CONTEÚDO EXTRA — VARIANTE 267 (Template 2: Cinnamon Roll)
// ============================================================
export function ContentExtraVariant267(props) {
  const {
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const colorBg = data.backgroundColor || "#d41d4b";
  const colorAccent = data.accentColor || brandColor || "#7cb3c2"; // Usado para a canela azul
  
  const badgeText = data.tag || "do forno para o seu coração";
  const title1 = data.titulo || "ROLO DE";
  const title2 = data.subtitulo || "canela";
  const circularText = data.badge_text || "• O CÉU É COMO CANELA • O CÉU É";
  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1621236378699-8597ffc34f24?q=80&w=800&auto=format&fit=crop";
  const description = data.texto_apoio || "Massa fofinha, recheio de canela quentinho e cobertura cremosa. Simples assim, inesquecível.";
  
  const footerLeft = data.list_item_1 || "Doce Memória";
  const footerCenter = data.list_item_2 || "Feito com Amor";
  const footerRight = data.list_item_3 || brandHandle || "Doce Memória";

  const formatText = (text) => {
    if (!text) return "";
    return text.replace(/\\n/g, '<br />').replace(/\n/g, '<br />');
  };

  return (
    <div
      id="tpl_cinnamon"
      className="w-full h-full absolute inset-0 bg-[#d41d4b] flex flex-col items-center justify-start overflow-hidden transition-colors duration-300 font-sans"
      style={{ backgroundColor: colorBg, containerType: 'inline-size' }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-cursive { font-family: 'Dancing Script', cursive; }
        .text-cinnamonCream { color: #f9ebe0; }
        .text-cinnamonBlue { color: ${colorAccent}; }
        .animate-spin-slow { animation: spin 20s linear infinite; }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />

      <div className="mt-[10cqw] z-20">
        <SmartField field="tag" {...sp}>
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            id="tpl_cinnamon_badge"
            className="text-[3cqw] font-bold text-white tracking-wide lowercase outline-none"
          >
            {badgeText}
          </span>
        </SmartField>
      </div>

      <div className="relative flex flex-col items-center mt-[4cqw] z-20 w-full">
        <SmartField field="titulo" {...sp}>
          <h1
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            id="tpl_cinnamon_title1"
            className="font-sans font-black text-cinnamonCream leading-[0.8] tracking-tight uppercase outline-none"
            style={{ fontSize: `${22 * sTitle}cqw`, textShadow: "0 4px 15px rgba(0,0,0,0.15)" }}
          >
            {title1}
          </h1>
        </SmartField>

        <SmartField field="subtitulo" {...sp} className="absolute -bottom-[7cqw] -right-[1cqw] transform -rotate-3 z-30">
          <h2
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'subtitulo', e.currentTarget.innerText)}
            id="tpl_cinnamon_title2"
            className="font-cursive text-cinnamonBlue leading-none drop-shadow-md outline-none"
            style={{ fontSize: `${28 * sTitle}cqw` }}
          >
            {title2}
          </h2>
        </SmartField>
      </div>

      <div className="relative w-[85cqw] h-[75cqw] mt-[2cqw] flex items-center justify-center z-10">
        <svg className="absolute -left-[1cqw] top-[20cqw] w-[14cqw] h-[14cqw] text-cinnamonCream drop-shadow-sm" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round">
          <line x1="20" y1="50" x2="40" y2="50" />
          <line x1="28" y1="28" x2="43" y2="43" />
          <line x1="50" y1="20" x2="50" y2="40" />
        </svg>

        <div className="absolute right-[1cqw] top-[18cqw] w-[26cqw] h-[26cqw] z-30 flex items-center justify-center drop-shadow-xl">
          <svg className="absolute inset-0 w-full h-full text-cinnamonBlue animate-spin-slow" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 2.5 L55.5 8.5 L63.5 6 L67 13 L75 13 L76.5 21 L83.5 23 L82.5 31 L88.5 34.5 L85 41.5 L89.5 48.5 L84 54.5 L86.5 62 L79.5 65.5 L79.5 73.5 L71.5 75 L69 82 L61.5 81 L56.5 87 L50 82.5 L43.5 87 L38.5 81 L31 82 L28.5 75 L20.5 73.5 L20.5 65.5 L13.5 62 L16 54.5 L10.5 48.5 L15 41.5 L11.5 34.5 L17.5 31 L16.5 23 L23.5 21 L25 13 L33 13 L36.5 6 L44.5 8.5 Z" />
          </svg>
          <svg className="absolute inset-0 w-full h-full text-cinnamonCream animate-spin-slow" viewBox="0 0 100 100">
            <path id="textCircle" d="M 50, 18 a 32,32 0 1,1 0,64 a 32,32 0 1,1 0,-64" fill="none" />
            <text fontSize="6.5" fontWeight="700" fill="currentColor" letterSpacing="1">
              <textPath id="tpl_cinnamon_circular" href="#textCircle" startOffset="0%">
                {circularText}
              </textPath>
            </text>
          </svg>
          <svg id="tpl_cinnamon_heart" className="relative z-10 w-[8cqw] h-[8cqw]" style={{ color: colorBg }} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>

        <SmartField field="imagem" {...sp} className="w-[90%] h-[90%] flex items-center justify-center z-20 scale-110">
          {imageUrl && (
            <img
              id="tpl_cinnamon_img"
              src={getCorsSafeUrl(imageUrl)}
              crossOrigin="anonymous"
              className="w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
              alt="Cinnamon Roll"
            />
          )}
        </SmartField>
      </div>

      <SmartField field="texto_apoio" {...sp} className="w-[85%] mt-[1cqw] z-20 text-center">
        <p
          contentEditable suppressContentEditableWarning
          onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
          id="tpl_cinnamon_desc"
          className="font-serif text-cinnamonCream leading-[1.4] drop-shadow-sm outline-none"
          style={{ fontSize: `${5 * sText}cqw` }}
          dangerouslySetInnerHTML={{ __html: formatText(description) }}
        ></p>
      </SmartField>

      <div className="absolute bottom-[6cqw] w-full px-[8cqw] flex justify-between items-center z-20">
        <SmartField field="list_item_1" {...sp}>
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'list_item_1', e.currentTarget.innerText)}
            id="tpl_cinnamon_footer1_left"
            className="text-[2.2cqw] font-bold text-white uppercase tracking-wider outline-none"
          >
            {footerLeft}
          </span>
        </SmartField>

        <svg className="w-[2.2cqw] h-[2.2cqw] text-white shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>

        <SmartField field="list_item_2" {...sp}>
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'list_item_2', e.currentTarget.innerText)}
            id="tpl_cinnamon_footer2"
            className="text-[2.2cqw] font-bold text-white uppercase tracking-wider outline-none"
          >
            {footerCenter}
          </span>
        </SmartField>

        <svg className="w-[2.2cqw] h-[2.2cqw] text-white shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>

        <SmartField field="list_item_3" {...sp}>
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'list_item_3', e.currentTarget.innerText)}
            id="tpl_cinnamon_footer1_right"
            className="text-[2.2cqw] font-bold text-white uppercase tracking-wider outline-none"
          >
            {footerRight}
          </span>
        </SmartField>
      </div>

      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor="#ffffff" counterColor="#ffffff" counterBg="rgba(0,0,0,0.15)" />
    </div>
  );
}

// ============================================================
// CONTEÚDO EXTRA — VARIANTE 268 (Template 15: LAB5)
// ============================================================
export function ContentExtraVariant268(props) {
  const {
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const colorBg = data.backgroundColor || brandColor || "#ce143c";
  const title = data.titulo || "Lab5";
  const subtitle = data.subtitulo || "by ISM";
  const description = data.texto_apoio || "O motor da inovação<br>na confeitaria e doceria.";
  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=800&auto=format&fit=crop";

  const formatText = (text) => {
    if (!text) return "";
    return text.replace(/\\n/g, '<br />').replace(/\n/g, '<br />');
  };

  return (
    <div
      id="tpl_lab5"
      className="absolute inset-0 w-full h-full flex flex-col overflow-hidden font-sans"
      style={{ containerType: 'inline-size' }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />

      <div className="absolute inset-0 h-[65%] z-10">
        <SmartField field="imagem" {...sp} className="w-full h-full">
          {imageUrl && (
            <img
              id="tpl_lab5_img"
              src={getCorsSafeUrl(imageUrl)}
              crossOrigin="anonymous"
              className="w-full h-full object-cover object-center"
              alt="Lab5 Visual"
            />
          )}
        </SmartField>
      </div>

      <div
        id="tpl_lab5_bg"
        className="absolute bottom-0 left-0 w-full h-[45%] z-20 flex flex-col justify-center px-[8cqw] transition-colors duration-300"
        style={{ backgroundColor: colorBg }}
      >
        <svg
          className="absolute bottom-[99%] left-0 w-[101%] h-[15cqw] transition-colors duration-300 -ml-[0.5%]"
          id="tpl_lab5_wave"
          viewBox="0 0 100 20"
          preserveAspectRatio="none"
          fill="currentColor"
          style={{ color: colorBg }}
        >
          <path d="M0,10 C20,20 40,20 60,10 C80,0 90,0 100,5 L100,20 L0,20 Z" />
        </svg>

        <div className="relative z-30 -mt-[5cqw] text-left">
          <div className="flex items-baseline">
            <SmartField field="titulo" {...sp} className="leading-[0.8] tracking-tighter">
              <h1
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
                id="tpl_lab5_title"
                className="font-sans font-black text-white drop-shadow-md outline-none"
                style={{ fontSize: `${20 * sTitle}cqw` }}
              >
                {title}
              </h1>
            </SmartField>

            <SmartField field="subtitulo" {...sp} className="ml-[2cqw] tracking-tight leading-none">
              <h2
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'subtitulo', e.currentTarget.innerText)}
                id="tpl_lab5_badge"
                className="font-sans font-bold text-white drop-shadow-md outline-none"
                style={{ fontSize: `${7 * sTitle}cqw` }}
              >
                {subtitle}
              </h2>
            </SmartField>
          </div>

          <SmartField field="texto_apoio" {...sp} className="mt-[4cqw] w-[85%] leading-[1.2]">
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
              id="tpl_lab5_desc"
              className="font-sans font-medium text-white drop-shadow-sm outline-none"
              style={{ fontSize: `${4.5 * sText}cqw` }}
              dangerouslySetInnerHTML={{ __html: formatText(description) }}
            ></p>
          </SmartField>
        </div>

        <div className="absolute bottom-[8cqw] right-[8cqw] w-[12cqw] h-[12cqw] bg-white rounded-full flex items-center justify-center shadow-lg z-30">
          <svg
            id="tpl_lab5_arrow"
            className="w-[6cqw] h-[6cqw] transition-colors duration-300"
            style={{ color: colorBg }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor="#ffffff" counterColor="#ffffff" counterBg="rgba(0,0,0,0.2)" />
    </div>
  );
}

// ============================================================
// CONTEÚDO EXTRA — VARIANTE 269 (Template 14: SUCESSO)
// ============================================================
export function ContentExtraVariant269(props) {
  const {
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const colorBg = data.backgroundColor || "#f4f4f4";
  const colorAccent = data.accentColor || brandColor || "#d80c3a";

  const title = data.titulo || "Do conceito<br/>ao sucesso,<br/>a gente<br/>adoça o<br/>caminho.";
  const description = data.texto_apoio || "O Lab5 by ISM é o ponto de encontro entre quem cria, desenvolve e transforma a confeitaria e doceria.";
  
  const iconText1 = data.list_item_1 || "Conexões<br/>que geram<br/>negócios";
  const iconText2 = data.list_item_2 || "Ideias que<br/>viram<br/>produtos";
  const iconText3 = data.list_item_3 || "Soluções<br/>em sintonia<br/>com o futuro";
  const iconText4 = data.list_item_4 || "Impacto real<br/>na indústria<br/>doce";
  
  const subtitle = data.subtitulo || "Lab5 <span class=\"font-medium text-[4cqw]\">by ISM</span>";
  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=800&auto=format&fit=crop";

  const formatText = (text) => {
    if (!text) return "";
    return text.replace(/\\n/g, '<br />').replace(/\n/g, '<br />');
  };

  return (
    <div
      id="tpl_sucesso"
      className="absolute inset-0 w-full h-full flex flex-col overflow-hidden text-gray-900 font-sans transition-colors duration-300"
      style={{ backgroundColor: colorBg, containerType: 'inline-size' }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />

      <div className="absolute top-0 right-0 w-[60cqw] h-[75cqw] z-10 flex justify-end">
        <div
          className="absolute inset-y-0 left-0 w-[20cqw] z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to right, ${colorBg} 0%, ${colorBg}cc 40%, transparent 100%)`
          }}
        />
        <SmartField field="imagem" {...sp} className="w-full h-full">
          {imageUrl && (
            <img
              id="tpl_sucesso_img"
              src={getCorsSafeUrl(imageUrl)}
              crossOrigin="anonymous"
              className="w-full h-full object-cover object-left"
              alt="Sucesso Visual"
            />
          )}
        </SmartField>
      </div>

      <div className="absolute top-[8cqw] left-[6cqw] w-[55%] z-20 flex flex-col items-start text-left">
        <SmartField field="titulo" {...sp} className="leading-[0.95] tracking-tight">
          <h1
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerHTML)}
            id="tpl_sucesso_title"
            className="font-sans font-black outline-none transition-colors duration-300"
            style={{ color: colorAccent, fontSize: `${9.5 * sTitle}cqw` }}
            dangerouslySetInnerHTML={{ __html: formatText(title) }}
          ></h1>
        </SmartField>

        <SmartField field="texto_apoio" {...sp} className="mt-[4cqw] pr-[2cqw] leading-[1.3]">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
            id="tpl_sucesso_desc"
            className="font-sans text-gray-800 font-medium outline-none"
            style={{ fontSize: `${3.8 * sText}cqw` }}
            dangerouslySetInnerHTML={{ __html: formatText(description) }}
          ></p>
        </SmartField>
      </div>

      <div
        id="tpl_sucesso_bottom_bg"
        className="absolute bottom-0 left-0 w-full h-[38cqw] z-30 flex flex-col justify-end transition-colors duration-300"
        style={{ backgroundColor: colorAccent }}
      >
        <svg
          className="absolute bottom-[99%] left-0 w-[110%] h-[20cqw] transition-colors duration-300 -ml-[5%]"
          id="tpl_sucesso_wave"
          viewBox="0 0 100 20"
          preserveAspectRatio="none"
          fill="currentColor"
          style={{ color: colorAccent }}
        >
          <path d="M0,20 L0,15 C20,25 45,-5 100,10 L100,20 Z" />
        </svg>

        <div className="px-[4cqw] pb-[12cqw] w-full grid grid-cols-4 gap-[2cqw] items-start relative z-10">
          <div className="flex flex-col items-center text-center">
            <svg className="w-[6cqw] h-[6cqw] text-white mb-[1.5cqw]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            <SmartField field="list_item_1" {...sp} className="leading-[1.2]">
              <span
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'list_item_1', e.currentTarget.innerHTML)}
                id="tpl_sucesso_icon1"
                className="font-sans font-bold text-white outline-none"
                style={{ fontSize: `${2.2 * sText}cqw` }}
                dangerouslySetInnerHTML={{ __html: formatText(iconText1) }}
              ></span>
            </SmartField>
          </div>

          <div className="flex flex-col items-center text-center">
            <svg className="w-[6cqw] h-[6cqw] text-white mb-[1.5cqw]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.829 1.58-2.083a4.5 4.5 0 10-7.66 0c.922.254 1.58 1.1 1.58 2.083v.192" />
            </svg>
            <SmartField field="list_item_2" {...sp} className="leading-[1.2]">
              <span
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'list_item_2', e.currentTarget.innerHTML)}
                id="tpl_sucesso_icon2"
                className="font-sans font-bold text-white outline-none"
                style={{ fontSize: `${2.2 * sText}cqw` }}
                dangerouslySetInnerHTML={{ __html: formatText(iconText2) }}
              ></span>
            </SmartField>
          </div>

          <div className="flex flex-col items-center text-center">
            <svg className="w-[6cqw] h-[6cqw] text-white mb-[1.5cqw]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            </svg>
            <SmartField field="list_item_3" {...sp} className="leading-[1.2]">
              <span
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'list_item_3', e.currentTarget.innerHTML)}
                id="tpl_sucesso_icon3"
                className="font-sans font-bold text-white outline-none"
                style={{ fontSize: `${2.2 * sText}cqw` }}
                dangerouslySetInnerHTML={{ __html: formatText(iconText3) }}
              ></span>
            </SmartField>
          </div>

          <div className="flex flex-col items-center text-center">
            <svg className="w-[6cqw] h-[6cqw] text-white mb-[1.5cqw]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
            <SmartField field="list_item_4" {...sp} className="leading-[1.2]">
              <span
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'list_item_4', e.currentTarget.innerHTML)}
                id="tpl_sucesso_icon4"
                className="font-sans font-bold text-white outline-none"
                style={{ fontSize: `${2.2 * sText}cqw` }}
                dangerouslySetInnerHTML={{ __html: formatText(iconText4) }}
              ></span>
            </SmartField>
          </div>
        </div>

        <div className="absolute bottom-[4cqw] left-0 w-full px-[6cqw] flex justify-between items-center">
          <SmartField field="subtitulo" {...sp} className="tracking-tight text-white leading-none">
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'subtitulo', e.currentTarget.innerHTML)}
              id="tpl_sucesso_badge"
              className="font-sans font-black outline-none"
              style={{ fontSize: `${6 * sTitle}cqw` }}
              dangerouslySetInnerHTML={{ __html: formatText(subtitle) }}
            ></span>
          </SmartField>

          <div className="w-[8cqw] h-[8cqw] rounded-full border-[0.3cqw] border-white flex items-center justify-center text-white shrink-0">
            <svg className="w-[4cqw] h-[4cqw] ml-[0.5cqw]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>

      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor="#1a1a1a" counterColor="#1a1a1a" counterBg="rgba(0,0,0,0.05)" />
    </div>
  );
}

// ============================================================
// CONTEÚDO EXTRA — VARIANTE 270 (Template 13: Brownie)
// ============================================================
export function ContentExtraVariant270(props) {
  const {
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const colorBg = data.backgroundColor || "#ffffff";
  const colorAccent = data.accentColor || brandColor || "#d80c3a";
  const colorSecondary = data.secondaryColor || "#3e2723"; // marrom escuro do brownie

  const badgeText = data.tag || "Comiê";
  const title1 = data.titulo || "BROWNIE";
  const title2 = data.subtitulo || "IRRESISTÍVEL DO COMEÇO";
  const title3 = data.texto_apoio || "ao último pedaço!";
  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop";

  const iconText1 = data.list_item_1 || "MUITO<br>CHOCOLATE";
  const iconText2 = data.list_item_2 || "FEITO<br>COM AMOR";
  const iconText3 = data.list_item_3 || "RECEITA<br>ARTESANAL";

  const footerText = data.slide_call || "Garanta o <b>seu!</b>";

  const formatText = (text, highlightColor) => {
    if (!text) return "";
    let formatted = text.replace(/\\n/g, '<br />').replace(/\n/g, '<br />');
    if (highlightColor) {
      const spanStyle = `style="color: ${highlightColor};"`;
      formatted = formatted.replace(/<b>(.*?)<\/b>/g, `<span ${spanStyle}>$1</span>`);
      formatted = formatted.replace(/<strong>(.*?)<\/strong>/g, `<span ${spanStyle}>$1</span>`);
    }
    return formatted;
  };

  return (
    <div
      id="tpl_brownie"
      className="absolute inset-0 w-full h-full flex flex-col items-center overflow-hidden text-gray-900 font-sans transition-colors duration-300 bg-white"
      style={{ backgroundColor: colorBg, containerType: 'inline-size' }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-cursive { font-family: 'Dancing Script', cursive; }
      `}} />

      {/* Elementos abstratos de decoração desfocados */}
      <div className="absolute top-[10cqw] left-[6cqw] w-[7cqw] h-[7cqw] rounded-sm transform -rotate-12 opacity-80 blur-[1px]" style={{ backgroundColor: colorSecondary }}></div>
      <div className="absolute top-[35cqw] right-[4cqw] w-[8cqw] h-[8cqw] rounded-sm transform rotate-45 opacity-90 blur-[1.5px]" style={{ backgroundColor: colorSecondary }}></div>

      <div className="mt-[8cqw] z-20">
        <SmartField field="tag" {...sp}>
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            id="tpl_brownie_badge"
            className="font-cursive text-[8cqw] leading-none transition-colors duration-300 outline-none"
            style={{ color: colorAccent }}
          >
            {badgeText}
          </span>
        </SmartField>
      </div>

      <div className="flex flex-col items-center mt-[4cqw] w-full z-20">
        <SmartField field="titulo" {...sp}>
          <h1
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerText)}
            id="tpl_brownie_t1"
            className="font-sans font-black leading-[0.8] tracking-tight uppercase transition-colors duration-300 outline-none"
            style={{ color: colorAccent, fontSize: `${25.7 * sTitle}cqw` }}
          >
            {title1}
          </h1>
        </SmartField>

        <div className="px-[4cqw] py-[1.2cqw] rounded-[0.8cqw] mt-[2cqw] drop-shadow-md" style={{ backgroundColor: colorSecondary }}>
          <SmartField field="subtitulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'subtitulo', e.currentTarget.innerText)}
              id="tpl_brownie_t2"
              className="font-sans font-black text-[5cqw] leading-none text-white tracking-wide uppercase outline-none"
            >
              {title2}
            </h2>
          </SmartField>
        </div>

        <div className="flex items-center gap-[2cqw] mt-[2.5cqw]">
          <svg className="w-[5cqw] h-[5cqw] transition-colors duration-300 shrink-0" id="tpl_brownie_spark_l" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: colorAccent }}>
            <path d="M10 6 L5 8 M12 12 L4 12 M10 18 L5 16"/>
          </svg>

          <SmartField field="texto_apoio" {...sp}>
            <h3
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerText)}
              id="tpl_brownie_t3"
              className="font-cursive leading-none transition-colors duration-300 outline-none"
              style={{ color: colorAccent, fontSize: `${13 * sText}cqw` }}
            >
              {title3}
            </h3>
          </SmartField>

          <svg className="w-[5cqw] h-[5cqw] transition-colors duration-300 shrink-0" id="tpl_brownie_spark_r" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: colorAccent }}>
            <path d="M14 6 L19 8 M12 12 L20 12 M14 18 L19 16"/>
          </svg>
        </div>
      </div>

      <div className="relative w-full h-[45cqw] mt-[4cqw] flex items-center justify-center z-10">
        <SmartField field="imagem" {...sp} className="w-[95%] h-full flex items-center justify-center">
          {imageUrl && (
            <img
              id="tpl_brownie_img"
              src={getCorsSafeUrl(imageUrl)}
              crossOrigin="anonymous"
              className="w-full h-full object-contain drop-shadow-2xl"
              alt="Brownie"
            />
          )}
        </SmartField>
      </div>

      <div className="w-[85%] flex justify-between items-start mt-[6cqw] z-20 text-left">
        <div className="flex flex-col items-center flex-1">
          <svg id="tpl_brownie_icon1_svg" className="w-[8cqw] h-[8cqw] transition-colors duration-300 mb-[2cqw] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: colorAccent }}>
            <rect x="5" y="2" width="14" height="20" rx="1"/>
            <path d="M5 8h14M5 14h14M12 2v20"/>
          </svg>
          <SmartField field="list_item_1" {...sp} className="leading-[1.2] text-center w-full">
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'list_item_1', e.currentTarget.innerHTML)}
              id="tpl_brownie_icon1"
              className="font-sans font-bold text-[2.5cqw] uppercase transition-colors duration-300 outline-none block"
              style={{ color: colorAccent }}
              dangerouslySetInnerHTML={{ __html: formatText(iconText1) }}
            ></span>
          </SmartField>
        </div>

        <div className="w-[0.2cqw] h-[8cqw] mt-[1cqw] transition-colors duration-300 shrink-0" id="tpl_brownie_div1" style={{ backgroundColor: colorAccent }}></div>

        <div className="flex flex-col items-center flex-1">
          <svg id="tpl_brownie_icon2_svg" className="w-[8cqw] h-[8cqw] transition-colors duration-300 mb-[2cqw] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: colorAccent }}>
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
          <SmartField field="list_item_2" {...sp} className="leading-[1.2] text-center w-full">
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'list_item_2', e.currentTarget.innerHTML)}
              id="tpl_brownie_icon2"
              className="font-sans font-bold text-[2.5cqw] uppercase transition-colors duration-300 outline-none block"
              style={{ color: colorAccent }}
              dangerouslySetInnerHTML={{ __html: formatText(iconText2) }}
            ></span>
          </SmartField>
        </div>

        <div className="w-[0.2cqw] h-[8cqw] mt-[1cqw] transition-colors duration-300 shrink-0" id="tpl_brownie_div2" style={{ backgroundColor: colorAccent }}></div>

        <div className="flex flex-col items-center flex-1">
          <svg id="tpl_brownie_icon3_svg" className="w-[8cqw] h-[8cqw] transition-colors duration-300 mb-[2cqw] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: colorAccent }}>
            <path d="M12 11 L 16 3 L 18 4 L 14 11" />
            <path d="M12 11 L 14 4 L 16 5 L 13 11" />
            <circle cx="17.5" cy="3.5" r="1.5" />
          </svg>
          <SmartField field="list_item_3" {...sp} className="leading-[1.2] text-center w-full">
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'list_item_3', e.currentTarget.innerHTML)}
              id="tpl_brownie_icon3"
              className="font-sans font-bold text-[2.5cqw] uppercase transition-colors duration-300 outline-none block"
              style={{ color: colorAccent }}
              dangerouslySetInnerHTML={{ __html: formatText(iconText3) }}
            ></span>
          </SmartField>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[18cqw] z-20 flex items-end justify-center overflow-visible">
        <svg
          className="absolute bottom-0 w-full h-[12cqw] transition-colors duration-300"
          id="tpl_brownie_wave"
          viewBox="0 0 100 20"
          preserveAspectRatio="none"
          fill="currentColor"
          style={{ color: colorAccent }}
        >
          <path d="M0,20 L100,20 L100,10 Q50,0 0,10 Z" />
        </svg>
        <div className="relative z-30 mb-[4cqw] bg-white px-[8cqw] py-[1.5cqw] rounded-md shadow-lg">
          <SmartField field="slide_call" {...sp}>
            <span
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'slide_call', e.currentTarget.innerHTML)}
              id="tpl_brownie_footer"
              className="font-sans font-bold text-[4cqw] text-gray-900 outline-none"
              dangerouslySetInnerHTML={{ __html: formatText(footerText, colorAccent) }}
            ></span>
          </SmartField>
        </div>
      </div>

      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor="#1a1a1a" counterColor="#1a1a1a" counterBg="rgba(0,0,0,0.05)" />
    </div>
  );
}

// ============================================================
// CONTEÚDO EXTRA — VARIANTE 271 (Template 12: Pedido)
// ============================================================
export function ContentExtraVariant271(props) {
  const {
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo
  } = props;

  const sTitle = titleScale / 100;
  const sText = textScale / 100;
  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const colorBg = data.backgroundColor || "#ffffff";
  const colorAccent = data.accentColor || brandColor || "#d80c3a";

  const badgeText = (data.tag === 'EXTRA' || !data.tag) ? "Mari Confeitaria" : data.tag;
  const title = data.titulo || "E VOCÊ?<br/>FEZ SEU<br/>PEDIDO<br/><b>DE HOJE?</b>";
  const circularText = data.badge_text || "FEITO COM CARINHO • PARA ADOÇAR SUA VIDA •";
  const letterCenter = data.subtitulo || brandHandle ? brandHandle.charAt(1).toUpperCase() : "C";
  const description = data.texto_apoio || "Doce é carinho.<br/>Compartilhe mais<br/>momentos assim!";
  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800&auto=format&fit=crop";

  const formatText = (text) => {
    if (!text) return "";
    return text.replace(/\\n/g, '<br />').replace(/\n/g, '<br />');
  };

  const formatTitle = (text, highlightColor) => {
    if (!text) return "";
    let formatted = text.replace(/\\n/g, '<br />').replace(/\n/g, '<br />');
    const spanStyle = `class="inline-block px-[2cqw] py-[1cqw] text-white mt-[1cqw]" style="background-color: ${highlightColor};"`;
    formatted = formatted.replace(/<b>(.*?)<\/b>/g, `<span ${spanStyle}>$1</span>`);
    formatted = formatted.replace(/<strong>(.*?)<\/strong>/g, `<span ${spanStyle}>$1</span>`);
    return formatted;
  };

  return (
    <div
      id="tpl_pedido"
      className="absolute inset-0 w-full h-full flex flex-col overflow-hidden text-gray-900 bg-white font-sans transition-colors duration-300"
      style={{ backgroundColor: colorBg, containerType: 'inline-size' }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-cursive { font-family: 'Dancing Script', cursive; }
        .animate-spin-slow { animation: spin 20s linear infinite; }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />

      <svg 
        viewBox="0 0 1080 1350" 
        className="absolute inset-0 w-full h-full select-none pointer-events-none z-0 transition-colors duration-300"
        id="tpl_pedido_bottom_wave"
        style={{ color: colorAccent }}
      >
        <path 
          d="M 441 1350 C 682 1109, 885 1385, 1080 1077 L 1080 1230 C 947 1380, 690 1312, 616 1350 Z" 
          fill="currentColor" 
        />
      </svg>

      <div className="absolute top-[6cqw] right-[6cqw] w-[20cqw] h-[20cqw] z-20 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full transition-colors duration-300" id="tpl_pedido_circle_text" viewBox="0 0 100 100" style={{ color: colorAccent }}>
          <path id="circlePathPedido" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
          <text fontSize="10.5" fontWeight="700" fill="currentColor" letterSpacing="1">
            <textPath href="#circlePathPedido" startOffset="0%" id="tpl_pedido_circular">
              {circularText}
            </textPath>
          </text>
        </svg>
        <div className="w-[10cqw] h-[10cqw] rounded-full transition-colors duration-300 flex items-center justify-center" id="tpl_pedido_circle_center" style={{ backgroundColor: colorAccent }}>
          <SmartField field="subtitulo" {...sp}>
            <h2
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'subtitulo', e.currentTarget.innerText)}
              className="font-cursive text-[6cqw] text-white outline-none"
            >
              {letterCenter}
            </h2>
          </SmartField>
        </div>
      </div>

      <div className="absolute top-[18cqw] left-[8cqw] w-[60%] z-20 flex flex-col items-start text-left">
        <SmartField field="tag" {...sp} className="leading-none mb-[3cqw]">
          <h2 id="tpl_pedido_badge" className="font-cursive text-[9cqw] transition-colors duration-300 outline-none" style={{ color: colorAccent }}>
            {badgeText}
          </h2>
        </SmartField>

        <SmartField field="titulo" {...sp} className="leading-[0.95] tracking-tight uppercase">
          <h1
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerHTML)}
            id="tpl_pedido_title"
            className="font-sans font-black transition-colors duration-300 outline-none"
            style={{ fontSize: `${15 * sTitle}cqw`, color: colorAccent }}
            dangerouslySetInnerHTML={{ __html: formatTitle(title, colorAccent) }}
          ></h1>
        </SmartField>

        <svg className="w-[60cqw] h-[4cqw] mt-[5cqw] -ml-[6.5cqw] transition-colors duration-300" id="tpl_pedido_wave_sep" viewBox="0 0 245 20" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" style={{ color: colorAccent }}>
          <path d="M5,10 Q20,20 35,10 T65,10 T95,10 T125,10 T155,10 T185,10 T215,10 T240,4" />
        </svg>
      </div>

      <div className="absolute bottom-[8cqw] left-[8cqw] w-[50%] z-20 flex flex-col items-start text-left">
        <div id="tpl_pedido_icon_bg" className="w-[8cqw] h-[8cqw] rounded-xl rounded-bl-sm flex items-center justify-center mb-[4cqw] transition-colors duration-300 shrink-0" style={{ backgroundColor: colorAccent }}>
          <svg className="w-[4cqw] h-[4cqw] text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        <SmartField field="texto_apoio" {...sp} className="leading-[1.3] font-bold">
          <p
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'texto_apoio', e.currentTarget.innerHTML)}
            id="tpl_pedido_desc"
            className="font-sans transition-colors duration-300 outline-none"
            style={{ color: colorAccent, fontSize: `${4.8 * sText}cqw` }}
            dangerouslySetInnerHTML={{ __html: formatText(description) }}
          ></p>
        </SmartField>
      </div>

      <div className="absolute top-[25cqw] right-[0cqw] w-[55cqw] h-[75cqw] z-10 flex items-center justify-center">
        <SmartField field="imagem" {...sp} className="w-full h-full flex items-center justify-center">
          {imageUrl && (
            <img
              id="tpl_pedido_img"
              src={getCorsSafeUrl(imageUrl)}
              crossOrigin="anonymous"
              className="w-full h-full object-contain object-right drop-shadow-2xl"
              alt="Pedido Visual"
            />
          )}
        </SmartField>
      </div>

      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor="#1a1a1a" counterColor="#1a1a1a" counterBg="rgba(0,0,0,0.05)" />
    </div>
  );
}

// ============================================================
// CONTEÚDO EXTRA — VARIANTE 272 (Template 11: SLIDE V6)
// ============================================================
export function ContentExtraVariant272(props) {
  const {
    data, index, slideCount, brandHandle, showBrandHandle, brandColor, isVerified, brandAvatar,
    titleScale, textScale, showMetrics, onActionStart, onTextChange,
    selectedElement, onSelectElement, showSlideCounter, slideCounterPosition, brandLogo, showBrandLogo
  } = props;

  if (data && data.positions) {
    data.positions.tag = { x: 0, y: 0, scale: 1 };
    data.positions.titulo = { x: 0, y: 0, scale: 1 };
    data.positions.subtitulo = { x: 0, y: 0, scale: 1 };
  }

  const sTitle = 1;
  const sText = 1;

  const sp = { data, index, showMetrics, onActionStart, selectedElement, onSelectElement, onTextChange };

  const colorBg = data.backgroundColor || "#ffffff";
  const colorAccent = data.accentColor || brandColor || "#ce143c";

  const tagText = (data.tag === 'EXTRA' || !data.tag) ? "5" : data.tag;
  const title = data.titulo || "PEQUENA QUANTIDADE,<br/>GRANDE RESULTADO.";
  
  const iconText1 = data.subtitulo || "R$";
  
  const topic1 = data.list_item_1 || "Mais lucro<br/>por unidade.";
  const topic2 = data.list_item_2 || "Produção mais<br/>rápida e eficiente.";
  const topic3 = data.list_item_3 || "Clientes satisfeitos<br/>e que voltam sempre.";
  
  const imageUrl = data.imageUrl || "https://images.unsplash.com/photo-1548848221-0c2e497ed557?q=80&w=1000&auto=format&fit=crop";

  const formatText = (text) => {
    if (!text) return "";
    return text.replace(/\\n/g, '<br />').replace(/\n/g, '<br />');
  };

  const formatTitle272 = (text, highlightColor) => {
    if (!text) return "";
    let formatted = text.replace(/\\n/g, '<br />').replace(/\n/g, '<br />');
    
    // Substitui marcas de negrito por cor de destaque
    formatted = formatted.replace(/<b>(.*?)<\/b>/g, `<span style="color: ${highlightColor}">$1</span>`);
    formatted = formatted.replace(/<strong>(.*?)<\/strong>/g, `<span style="color: ${highlightColor}">$1</span>`);
    
    // Se não tiver estilo de cor explícito, colore a segunda linha/última parte da quebra
    if (!formatted.includes('style="color:') && !formatted.includes("style='color:")) {
      if (formatted.includes('<br />')) {
        const parts = formatted.split('<br />');
        const lastIdx = parts.length - 1;
        parts[lastIdx] = `<span style="color: ${highlightColor}">${parts[lastIdx]}</span>`;
        formatted = parts.join('<br />');
      } else if (formatted.includes('<br/>')) {
        const parts = formatted.split('<br/>');
        const lastIdx = parts.length - 1;
        parts[lastIdx] = `<span style="color: ${highlightColor}">${parts[lastIdx]}</span>`;
        formatted = parts.join('<br/>');
      }
    }
    return formatted;
  };

  return (
    <div
      id="tpl_slide_v6"
      className="absolute inset-0 w-full h-full overflow-hidden text-gray-900 bg-white font-sans transition-colors duration-300"
      style={{ backgroundColor: colorBg, containerType: 'inline-size' }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />

      <div id="tpl_slide_v6_bottomstrip" className="absolute bottom-0 left-0 w-full h-[4cqw] transition-colors duration-300 z-20" style={{ backgroundColor: colorAccent }}></div>

      <div className="absolute top-[12cqw] right-[8cqw] z-20 leading-none">
        <SmartField field="tag" {...sp} forceX={0} forceY={0} forceScale={1}>
          <span
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'tag', e.currentTarget.innerText)}
            id="tpl_slide_v6_badge"
            className="font-sans font-black text-[30cqw] leading-[0.8] tracking-tighter transition-colors duration-300 outline-none"
            style={{ color: colorAccent }}
          >
            {tagText}
          </span>
        </SmartField>
      </div>

      <div className="absolute top-[12cqw] left-[8cqw] w-[84%] z-20 flex flex-col items-start text-left">
        <SmartField field="titulo" {...sp} forceX={0} forceY={0} forceScale={1} className="leading-[1.0] tracking-tight uppercase">
          <h1
            contentEditable suppressContentEditableWarning
            onBlur={(e) => onTextChange(index, 'titulo', e.currentTarget.innerHTML)}
            id="tpl_slide_v6_title"
            className="font-sans font-black text-gray-900 outline-none"
            style={{ fontSize: `${7.2 * sTitle}cqw` }}
            dangerouslySetInnerHTML={{ __html: formatTitle272(title, colorAccent) }}
          ></h1>
        </SmartField>
        <div id="tpl_slide_v6_divider" className="w-[8cqw] h-[0.5cqw] mt-[2.5cqw] transition-colors duration-300" style={{ backgroundColor: colorAccent }}></div>
      </div>

      <div className="absolute top-[42cqw] left-[8cqw] w-[45%] flex flex-col gap-[3.5cqw] z-20 text-left">
        <div className="flex items-center gap-[3cqw]">
          <div
            id="tpl_slide_v6_icon1_ring"
            className="w-[8.5cqw] h-[8.5cqw] rounded-full border-[0.3cqw] flex items-center justify-center shrink-0 transition-colors duration-300 bg-white"
            style={{ borderColor: colorAccent }}
          >
            <SmartField field="subtitulo" {...sp} forceX={0} forceY={0} forceScale={1}>
              <span
                contentEditable suppressContentEditableWarning
                onBlur={(e) => onTextChange(index, 'subtitulo', e.currentTarget.innerText)}
                id="tpl_slide_v6_icon1_text"
                className="font-sans font-black text-[3cqw] transition-colors duration-300 outline-none"
                style={{ color: colorAccent }}
              >
                {iconText1}
              </span>
            </SmartField>
          </div>
          <SmartField field="list_item_1" {...sp} className="leading-[1.2] font-medium shrink-0">
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'list_item_1', e.currentTarget.innerHTML)}
              id="tpl_slide_v6_topic1"
              className="font-sans text-gray-800 outline-none"
              style={{ fontSize: `${4 * sText}cqw` }}
              dangerouslySetInnerHTML={{ __html: formatText(topic1) }}
            ></p>
          </SmartField>
        </div>

        <div className="flex items-center gap-[3cqw]">
          <div
            id="tpl_slide_v6_icon2_ring"
            className="w-[8.5cqw] h-[8.5cqw] rounded-full border-[0.3cqw] flex items-center justify-center shrink-0 transition-colors duration-300 bg-white"
            style={{ borderColor: colorAccent }}
          >
            <svg id="tpl_slide_v6_icon2_svg" className="w-[4cqw] h-[4cqw] transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ color: colorAccent }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <SmartField field="list_item_2" {...sp} className="leading-[1.2] font-medium shrink-0">
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'list_item_2', e.currentTarget.innerHTML)}
              id="tpl_slide_v6_topic2"
              className="font-sans text-gray-800 outline-none"
              style={{ fontSize: `${4 * sText}cqw` }}
              dangerouslySetInnerHTML={{ __html: formatText(topic2) }}
            ></p>
          </SmartField>
        </div>

        <div className="flex items-center gap-[3cqw]">
          <div
            id="tpl_slide_v6_icon3_ring"
            className="w-[8.5cqw] h-[8.5cqw] rounded-full border-[0.3cqw] flex items-center justify-center shrink-0 transition-colors duration-300 bg-white"
            style={{ borderColor: colorAccent }}
          >
            <svg id="tpl_slide_v6_icon3_svg" className="w-[4cqw] h-[4cqw] transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ color: colorAccent }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <SmartField field="list_item_3" {...sp} className="leading-[1.2] font-medium shrink-0">
            <p
              contentEditable suppressContentEditableWarning
              onBlur={(e) => onTextChange(index, 'list_item_3', e.currentTarget.innerHTML)}
              id="tpl_slide_v6_topic3"
              className="font-sans text-gray-800 outline-none"
              style={{ fontSize: `${4 * sText}cqw` }}
              dangerouslySetInnerHTML={{ __html: formatText(topic3) }}
            ></p>
          </SmartField>
        </div>
      </div>

      <div className="absolute bottom-[6cqw] right-0 w-[46cqw] h-[52cqw] z-10 flex items-end justify-end">
        <SmartField field="imagem" {...sp} className="w-full h-full flex items-center justify-center">
          {imageUrl && (
            <img
              id="tpl_slide_v6_img"
              src={getCorsSafeUrl(imageUrl)}
              crossOrigin="anonymous"
              className="w-full h-full object-contain object-right-bottom drop-shadow-2xl"
              alt="Slide V6 Visual"
            />
          )}
        </SmartField>
      </div>

      <SlideHeader data={data} slideIndex={index} onActionStart={onActionStart} selectedElement={selectedElement} onSelectElement={onSelectElement}
        index={index + 1} total={slideCount}
        brandHandle={brandHandle} showBrandHandle={showBrandHandle}
        brandColor={brandColor} isVerified={isVerified} brandAvatar={brandAvatar}
        showSlideCounter={showSlideCounter} slideCounterPosition={slideCounterPosition}
        hideDot={true} brandLogo={brandLogo} showBrandLogo={false}
        handleColor="#1a1a1a" counterColor="#1a1a1a" counterBg="rgba(0,0,0,0.05)" />
    </div>
  );
}

export const CONTENT_EXTRA_VARIANT_COMPONENTS = {
  252: ContentExtraVariant252,
  253: ContentExtraVariant253,
  254: ContentExtraVariant254,
  255: ContentExtraVariant255,
  256: ContentExtraVariant256,
  257: ContentExtraVariant257,
  258: ContentExtraVariant258,
  259: ContentExtraVariant259,
  260: ContentExtraVariant260,
  261: ContentExtraVariant261,
  262: ContentExtraVariant262,
  263: ContentExtraVariant263,
  264: ContentExtraVariant264,
  265: ContentExtraVariant265,
  266: ContentExtraVariant266,
  267: ContentExtraVariant267,
  268: ContentExtraVariant268,
  269: ContentExtraVariant269,
  270: ContentExtraVariant270,
  271: ContentExtraVariant271,
  272: ContentExtraVariant272,
};

export const CONTENT_EXTRA_VARIANT_META = [
  { id: 252, name: 'Refresh', description: 'Layout Refresh com caixa de destaque lateral direita superior e imagem de fundo inteira', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--7.png' },
  { id: 253, name: 'Fidelize', description: 'Layout Fidelize com header de avatar, faixa vertical direita e aba inferior de footer', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--12.png' },
  { id: 254, name: 'May Option', description: 'Layout May Option com linha vertical dourada, card centralizado e pill superior indicativo', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--13.png' },
  { id: 255, name: 'BNI Card', description: 'Layout BNI Card com barra lateral esquerda destacada, logo e dois cards sobrepostos com imagem flutuante', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--8.png' },
  { id: 256, name: 'Bubble', description: 'Layout Bubble com sparkles e cursor em destaque, título centralizado e imagem em destaque', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--9.png' },
  { id: 257, name: 'Quote Highlight', description: 'Layout Quote com autor destacado, citação no topo com marcação especial e imagem de fundo inferior', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--10.png' },
  { id: 258, name: 'Alerta de Post', description: 'Layout Alerta de Post com mockup de celular interativo mostrando o post do feed e adesivo flutuante', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--11.png' },
  { id: 259, name: 'Caixa Presente', description: 'Layout Caixa Presente com logo superior, produto em moldura rotacionada 3D e badge flutuante', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--12.png' },
  { id: 260, name: 'Quote Minimalista', description: 'Layout Quote Minimalista com aspas gigantes de fundo, autor com cargo destacado e produto abaixo com logo', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--13.png' },
  { id: 261, name: 'Padrão Brutalista', description: 'Layout Padrão Brutalista com textos em repetição ao fundo na diagonal e produto/PNG centralizado', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--7.png' },
  { id: 262, name: 'Corp. Checklist', description: 'Layout Corp. Checklist corporativo com logo central, título em destaque e três cards com ícone check', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--8.png' },
  { id: 263, name: 'Corp. Palestrante', description: 'Layout Corp. Palestrante com faixa lateral, título grande, dois cards de texto e palestrante/PNG destacado à direita', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--9.png' },
  { id: 264, name: 'Divisão Diagonal', description: 'Layout Divisão Diagonal Clássica com a metade esquerda em clip-path de imagem e metade direita com texto editável', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--10.png' },
  { id: 265, name: 'Clássico Vazando', description: 'Layout O Clássico com palavra gigante em marca d\'água de fundo, imagem enquadrada com cantos arredondados e texto ao lado', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--11.png' },
  { id: 266, name: 'Party People', description: 'Layout Party People com faixa lateral sólida, título gigante rotacionado na vertical sobreposto e card de informações sobre a imagem', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--12.png' },
  { id: 267, name: 'Cinnamon Roll', description: 'Layout Cinnamon Roll com texto arqueado rotativo, badge inferior, imagens e rodapé duplo com corações', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--12.png' },
  { id: 268, name: 'LAB5 (Novo)', description: 'Layout LAB5 com topo de imagem inteira de fundo e base colorida ondulada com botão seta', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--7.png' },
  { id: 269, name: 'Sucesso', description: 'Layout Sucesso com topo de imagem lateral integrada e base colorida em onda contendo 4 cards de ícone', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--8.png' },
  { id: 270, name: 'Brownie', description: 'Layout Brownie com fundo decorado, título marcante em destaque, rodapé ondulado e caixas flutuantes', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--12.png' },
  { id: 271, name: 'Pedido', description: 'Layout Pedido com texto arqueado, subtítulo centralizado, base ondulada e imagem em foco à direita', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split_extra271.png' },
  { id: 272, name: 'Slide V6', description: 'Layout Slide V6 com marca d\'água numérica, faixa em rodapé, lista vertical com ícones e imagem à direita', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split_extra272.png' },
];

