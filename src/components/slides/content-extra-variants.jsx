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
];

