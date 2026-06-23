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

export const CONTENT_EXTRA_VARIANT_COMPONENTS = {
  252: ContentExtraVariant252,
  253: ContentExtraVariant253,
  254: ContentExtraVariant254,
};

export const CONTENT_EXTRA_VARIANT_META = [
  { id: 252, name: 'Refresh', description: 'Layout Refresh com caixa de destaque lateral direita superior e imagem de fundo inteira', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--7.png' },
  { id: 253, name: 'Fidelize', description: 'Layout Fidelize com header de avatar, faixa vertical direita e aba inferior de footer', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--12.png' },
  { id: 254, name: 'May Option', description: 'Layout May Option com linha vertical dourada, card centralizado e pill superior indicativo', thumbnailUrl: '/thumbnails/Thumbnails%20Conteudo/designs_split--13.png' },
];
