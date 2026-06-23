import React, { useEffect } from 'react';
import SlideCover from './slides/SlideCover';
import SlideContentSplit from './slides/SlideContentSplit';
import SlideBigNumber from './slides/SlideBigNumber';
import SlideQuote from './slides/SlideQuote';
import SlideComparison from './slides/SlideComparison';
import SlideList from './slides/SlideList';
import SlideCTA from './slides/SlideCTA';
import SlideSequence from './slides/SlideSequence';
import SlideContentExtra from './slides/SlideContentExtra';

/**
 * SlideRenderer — Mapeia o layout do slide para o componente correto.
 * Substitui o switch/case monolítico de renderVisualCard.
 */

import SmartElement from './smart-element';

const LAYOUT_MAP = {
  'cover': SlideCover,
  'cover-18': SlideCover,
  'cover-19': SlideCover,
  'cover-20': SlideCover,
  'cover-21': SlideCover,
  'cover-22': SlideCover,
  'cover-23': SlideCover,
  'cover-24': SlideCover,
  'cover-25': SlideCover,
  'cover-26': SlideCover,
  'cover-27': SlideCover,
  'cover-28': SlideCover,
  'cover-29': SlideCover,
  'cover-30': SlideCover,
  'cover-31': SlideCover,
  'cover-32': SlideCover,
  'cover-33': SlideCover,
  'cover-34': SlideCover,
  'cover-35': SlideCover,
  'cover-36': SlideCover,
  'cover-37': SlideCover,
  'cover-38': SlideCover,
  'cover-39': SlideCover,
  'cover-40': SlideCover,
  'cover-41': SlideCover,
  'cover-42': SlideCover,
  'cover-43': SlideCover,
  'cover-44': SlideCover,
  'content-split': SlideContentSplit,
  'big-number': SlideBigNumber,
  'quote': SlideQuote,
  'comparison': SlideComparison,
  'list': SlideList,
  'cta': SlideCTA,
  'cta-extra': SlideCTA,
  'sequence': SlideSequence,
  'content-extra': SlideContentExtra,
};


export default function SlideRenderer({
  data,
  index,
  slideCount,
  brandHandle,
  showBrandHandle,
  brandAvatar,
  brandLogo,
  showBrandLogo,
  brandColor,
  isVerified,
  titleScale,
  textScale,
  titleFont: globalTitleFont,
  textFont: globalTextFont,
  tagFont: globalTagFont,
  headerFont: globalHeaderFont,
  showMetrics,
  onActionStart,
  onTextChange,
  onItemChange,
  selectedElement,
  onSelectElement,
  showSlideCounter,
  slideCounterPosition,
}) {
  const Component = LAYOUT_MAP[data.layout];
  if (!Component) return null;

  // Efeito colateral para injeção dinâmica de imagem de fundo personalizada
  useEffect(() => {
    const slideCard = document.getElementById(`slide-card-${index}`);
    if (!slideCard) return;

    const rendererWrapper = slideCard.querySelector('div:first-child');
    if (!rendererWrapper) return;

    // A div raiz da variante real é a primeira div filha de rendererWrapper
    const variantDiv = rendererWrapper.querySelector('div:first-child') || rendererWrapper;

    const bgId = `custom-bg-${index}`;

    if (data.enableCustomBg && data.customBgImage) {
      let customBgDiv = variantDiv.querySelector(`#${bgId}`);
      if (!customBgDiv) {
        customBgDiv = document.createElement("div");
        customBgDiv.setAttribute("id", bgId);
        customBgDiv.setAttribute("class", "absolute inset-0 w-full h-full pointer-events-none");
        customBgDiv.style.backgroundSize = "cover";
        customBgDiv.style.backgroundPosition = "center";
        customBgDiv.style.zIndex = "0";
        variantDiv.insertBefore(customBgDiv, variantDiv.firstChild);
      }
      customBgDiv.style.backgroundImage = `url(${data.customBgImage})`;
      customBgDiv.style.opacity = `${(data.customBgOpacity ?? 100) / 100}`;
    } else {
      const existing = variantDiv.querySelector(`#${bgId}`);
      if (existing) {
        existing.remove();
      }
    }
  }, [
    data.enableCustomBg, 
    data.customBgImage, 
    data.customBgOpacity, 
    index, 
    data.layout, 
    data.splitVariantIndex, 
    data.coverVariantIndex, 
    data.bigNumberVariantIndex, 
    data.quoteVariantIndex, 
    data.comparisonVariantIndex, 
    data.listVariantIndex, 
    data.ctaVariantIndex, 
    data.sequenceVariantIndex,
    data.contentExtraVariantIndex
  ]);

  // Efeito colateral para injeção dinâmica de ruído estritamente no background da variante (primeiro filho)
  useEffect(() => {
    // 1. Caso o ruído esteja inativo, ou seja a Variante 76 (que já tem o seu próprio ruído hardcoded), ou o alvo seja o slide inteiro ('all')
    if (
      !data.enableNoise || 
      (data.noiseTarget === 'all') || 
      (data.layout === 'content-split' && data.splitVariantIndex === 76)
    ) {
      const existing = document.getElementById(`noise-svg-global-${index}`);
      if (existing) existing.remove();
      return;
    }

    // 2. Buscamos a div raiz da variante para injetar o ruído como primeiro filho
    const slideCard = document.getElementById(`slide-card-${index}`);
    if (!slideCard) return;

    // A div da variante é a primeira div filha direta dentro do slide-card
    const variantDiv = slideCard.querySelector('div:first-child');
    if (!variantDiv) return;

    // 3. Verifica e insere a textura de ruído — deposita apenas grãos, sem repintar o fundo
    let noiseSvg = variantDiv.querySelector(`#noise-svg-global-${index}`);
    if (!noiseSvg) {
      noiseSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      noiseSvg.setAttribute("id", `noise-svg-global-${index}`);
      noiseSvg.setAttribute("class", "absolute inset-0 w-full h-full pointer-events-none");
      noiseSvg.setAttribute("viewBox", "0 0 1088 1358");
      noiseSvg.style.mixBlendMode = "normal";
      noiseSvg.style.zIndex = "1"; // Acima do background sólido, abaixo de todos os textos, tags, imagens e contadores
      variantDiv.insertBefore(noiseSvg, variantDiv.firstChild);
    }

    // Atualiza a opacidade do ruído de forma dinâmica (preservando o padrão de 100% de intensidade)
    noiseSvg.style.opacity = `${(data.noiseOpacity ?? 100) / 100}`;

    // fill="transparent": não repinta o fundo — apenas deposita os grãos de ruído por cima
    noiseSvg.innerHTML = `
      <defs>
        <filter id="noiseFilter-global-${index}" x="0" y="0" width="1088" height="1358" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="2 2" stitchTiles="stitch" numOctaves="3" result="noise" seed="9064" />
          <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
          <feComponentTransfer in="alphaNoise" result="coloredNoise1">
            <feFuncA type="discrete" tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "/>
          </feComponentTransfer>
          <feFlood flood-color="rgba(0, 0, 0, 0.25)" result="color1Flood" />
          <feComposite operator="in" in2="coloredNoise1" in="color1Flood" result="color1" />
          <feMerge>
            <feMergeNode in="color1" />
          </feMerge>
        </filter>
      </defs>
      <rect width="1088" height="1358" fill="transparent" filter="url(#noiseFilter-global-${index})" />
    `;
  }, [data.enableNoise, data.noiseTarget, data.noiseOpacity, index, data.layout, data.splitVariantIndex, data.contentExtraVariantIndex]);

  // Variáveis de fonte específicas do slide ou globais
  const slideStyles = {
    '--font-title': data.titleFont || globalTitleFont,
    '--font-text': data.textFont || globalTextFont,
    '--font-tag': data.tagFont || globalTagFont || globalTitleFont,
    '--font-header': globalHeaderFont,
  };

  return (
    <div className="w-full h-full relative" style={slideStyles}>
      <Component
        data={data}
        index={index}
        slideCount={slideCount}
        brandHandle={brandHandle}
        showBrandHandle={showBrandHandle}
        brandAvatar={brandAvatar}
        brandLogo={brandLogo}
        showBrandLogo={showBrandLogo}
        brandColor={brandColor}
        isVerified={isVerified}
        titleScale={titleScale}
        textScale={textScale}
        titleFont={data.titleFont || globalTitleFont}
        textFont={data.textFont || globalTextFont}
        tagFont={data.tagFont || globalTagFont || globalTitleFont}
        showMetrics={showMetrics}
        onActionStart={onActionStart}
        onTextChange={onTextChange}
        onItemChange={onItemChange}
        selectedElement={selectedElement}
        onSelectElement={onSelectElement}
        showSlideCounter={showSlideCounter}
        slideCounterPosition={slideCounterPosition}
      />

      {/* Camada de Imagem/SVG Overlay (No Topo) */}
      {data.enableSvgOverlay && data.svgOverlayContent && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-30 flex items-center justify-center">
          <SmartElement
            slideIndex={index}
            field="svgOverlay"
            position={data.positions?.svgOverlay || { x: 0, y: 0, scale: 1, rotation: 0 }}
            showMetrics={showMetrics}
            onActionStart={onActionStart}
            isSelected={selectedElement?.slideIndex === index && selectedElement?.field === 'svgOverlay'}
            onSelectElement={onSelectElement}
          >
            <img 
              src={data.svgOverlayContent} 
              className="pointer-events-auto object-contain select-none transition-opacity duration-150" 
              style={{ 
                opacity: (data.svgOverlayOpacity ?? 100) / 100,
                width: '240px',
                height: 'auto',
                maxWidth: '1088px',
                maxHeight: '1358px'
              }}
              alt="Overlay Imagem/SVG" 
            />
          </SmartElement>
        </div>
      )}

      {/* Camada Global de Ruído/Grão (Sobre todo o slide) */}
      {data.enableNoise && data.noiseTarget === 'all' && !(data.layout === 'content-split' && data.splitVariantIndex === 76) && (
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none z-[100]" 
          style={{ opacity: (data.noiseOpacity ?? 100) / 100 }}
          viewBox="0 0 1088 1358"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id={`noiseFilter-global-${index}`} x="0" y="0" width="1088" height="1358" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="2 2" stitchTiles="stitch" numOctaves="3" result="noise" seed="9064" />
              <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
              <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                <feFuncA type="discrete" tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "/>
              </feComponentTransfer>
              <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood" />
              <feComposite operator="in" in2="coloredNoise1" in="color1Flood" result="color1" />
              <feMerge>
                <feMergeNode in="color1" />
              </feMerge>
            </filter>
          </defs>
          {/* fill transparent: não sobrepõe cor de fundo — apenas deposita grão por cima do slide */}
          <rect width="1088" height="1358" fill="transparent" filter={`url(#noiseFilter-global-${index})`} />
        </svg>
      )}

      {/* Camada Global de Clones (Duplicação T5.3) */}
      {data.clonedFields && data.clonedFields.length > 0 && (
         <div className="absolute inset-0 pointer-events-none overflow-hidden z-40">
           {data.clonedFields.map(clone => {
             const Tag = clone.type;
             const posKey = clone.id;
             const isSel = selectedElement?.slideIndex === index && selectedElement?.field === posKey;
             
             return (
               <div key={posKey} className="absolute left-0 top-0">
                 <SmartElement
                    slideIndex={index}
                    field={posKey}
                    position={data.positions?.[posKey] || {x: 0, y: 0, scale: 1, rotation: 0}}
                    showMetrics={showMetrics}
                    onActionStart={onActionStart}
                    isSelected={isSel}
                    onSelectElement={onSelectElement}
                 >
                    <Tag
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => onTextChange(index, posKey, e.currentTarget.innerText)}
                      className={`${clone.className} pointer-events-auto`}
                      style={clone.style}
                      // Não injetamos style direto aqui porque o próprio SmartElement 
                      // aplica cloneElement nas props.style para os componentes (cor, size, line-height)
                    >
                      {data[posKey] !== undefined ? data[posKey] : ''}
                    </Tag>
                 </SmartElement>
               </div>
             );
           })}
         </div>
      )}
    </div>
  );
}
