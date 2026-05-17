import { useState, useEffect, useCallback } from 'react';

/**
 * Hook para gerenciar drag e resize de elementos nos slides.
 * Extraído do motor de interação do monólito (linhas 68-143).
 *
 * @returns {{ actionInfo, handleActionStart, resetSlidePositions, setSlides props }}
 */
export function useDragResize(slides, setSlides, selectedElements = new Set()) {
  const [actionInfo, setActionInfo] = useState(null);

  useEffect(() => {
    // Variáveis de trabalho: CADA TIPO só escreve as suas próprias.
    // drag        → currentX, currentY (nunca toca em scale/width)
    // resize      → currentScale        (nunca toca em x/y/width)
    // resize-width→ currentWidth        (nunca toca em x/y/scale)
    // rotate      → currentRotation     (nunca toca nas demais)
    let currentX, currentY, currentScale, currentWidth, currentRotation;

    const handleMouseMove = (e) => {
      if (!actionInfo) return;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const dx = clientX - actionInfo.startX;
      const dy = clientY - actionInfo.startY;

      const targetElement = document.getElementById(`smart-${actionInfo.index}-${actionInfo.field}`);
      if (!targetElement) return;

      if (actionInfo.type === 'drag') {
        let newX = actionInfo.origX + dx;
        let newY = actionInfo.origY + dy;

        // BOUNDS: clamp para não ultrapassar as bordas do slide
        if (actionInfo.constraints) {
          const { minX, maxX, minY, maxY } = actionInfo.constraints;
          newX = Math.max(minX, Math.min(maxX, newX));
          newY = Math.max(minY, Math.min(maxY, newY));
        }

        currentX = newX;
        currentY = newY;
        // scale mantida do que já existe, sem tocar
        targetElement.style.transform = `translate(${newX}px, ${newY}px) scale(${actionInfo.origScale}) rotate(${actionInfo.origRotation || 0}deg)`;

        // Mover todos os demais elementos da multi-seleção com o mesmo delta
        selectedElements.forEach(key => {
          const [si, ...fieldParts] = key.split(':');
          const field = fieldParts.join(':');
          if (si === String(actionInfo.index) && field === actionInfo.field) return; // pula o principal
          const otherEl = document.getElementById(`smart-${si}-${field}`);
          if (!otherEl) return;
          const slideIdx = parseInt(si);
          const otherPos = slides[slideIdx]?.positions?.[field] || { x: 0, y: 0, scale: 1, rotation: 0 };
          const ox = (otherPos.x || 0) + dx;
          const oy = (otherPos.y || 0) + dy;
          otherEl.style.transform = `translate(${ox}px, ${oy}px) scale(${otherPos.scale || 1}) rotate(${otherPos.rotation || 0}deg)`;
        });

        const metricsTag = document.getElementById(`metrics-${actionInfo.index}`);
        if (metricsTag) {
          const w = Math.round(targetElement.offsetWidth * actionInfo.origScale);
          const h = Math.round(targetElement.offsetHeight * actionInfo.origScale);
          metricsTag.innerText = `[ X:${Math.round(newX)} Y:${Math.round(newY)} | W:${w} H:${h} ]`;
        }

        // Atualização em tempo real nos inputs do ConfigSidebar
        const inputX = document.getElementById('config-pos-x');
        if (inputX) inputX.value = Math.round(newX);
        const inputY = document.getElementById('config-pos-y');
        if (inputY) inputY.value = Math.round(newY);

      } else if (actionInfo.type === 'resize') {
        const scaleDelta = -(dx + dy) * 0.005;
        const newScale = Math.max(0.3, actionInfo.origScale + scaleDelta);

        currentScale = newScale;
        // x/y mantidos do que já existe, sem tocar
        targetElement.style.transform = `translate(${actionInfo.origX}px, ${actionInfo.origY}px) scale(${newScale}) rotate(${actionInfo.origRotation || 0}deg)`;

        const metricsTag = document.getElementById(`metrics-${actionInfo.index}`);
        if (metricsTag) {
          const w = Math.round(targetElement.offsetWidth * newScale);
          const h = Math.round(targetElement.offsetHeight * newScale);
          metricsTag.innerText = `[ W:${w} H:${h} S:${newScale.toFixed(2)}x ]`;
        }

      } else if (actionInfo.type === 'resize-width') {
        const MIN_WIDTH = 80;
        const boundedMax = actionInfo.constraints?.maxWidth || (actionInfo.slideWidth || 9999);
        const newWidth = Math.max(MIN_WIDTH, Math.min(boundedMax, actionInfo.origWidth + (dx / actionInfo.origScale)));

        currentWidth = newWidth;
        targetElement.style.width = `${newWidth}px`;
        targetElement.style.maxWidth = 'none';
        
        // Remove a restrição visual em tempo real no elemento interno (Tailwind max-w classes)
        const innerTextChild = targetElement.querySelector('h1, h2, h3, h4, p, span');
        if (innerTextChild) {
          innerTextChild.style.maxWidth = 'none';
        }

        // --- COMPENSAÇÃO DE ALINHAMENTO (UX Fix) ---
        // Se o elemento estiver dentro de um flexbox centralizado (ex: items-center ou justify-center), 
        // aumentar a largura empurra a borda esquerda e a direita ao mesmo tempo. 
        // Para garantir que o redimensionador estique "apenas para a direita" (mantendo a esquerda imóvel),
        // aplicamos metade do delta na translação de X.
        const parent = targetElement.parentElement;
        if (parent) {
          const pStyle = window.getComputedStyle(parent);
          const isFlexColCenter = pStyle.display === 'flex' && pStyle.flexDirection.includes('column') && pStyle.alignItems === 'center';
          const isFlexRowCenter = pStyle.display === 'flex' && pStyle.flexDirection.includes('row') && pStyle.justifyContent === 'center';
          
          if (isFlexColCenter || isFlexRowCenter) {
            const widthDiff = newWidth - actionInfo.origWidth;
            currentX = actionInfo.origX + (widthDiff / 2);
            targetElement.style.transform = `translate(${currentX}px, ${actionInfo.origY}px) scale(${actionInfo.origScale}) rotate(${actionInfo.origRotation || 0}deg)`;
          }
        }

        const metricsTag = document.getElementById(`metrics-${actionInfo.index}`);
        if (metricsTag) {
          metricsTag.innerText = `[ W:${Math.round(newWidth)}px ]`;
        }
      } else if (actionInfo.type === 'rotate') {
         const elRect = targetElement.getBoundingClientRect();
         const centerX = elRect.left + elRect.width / 2;
         const centerY = elRect.top + elRect.height / 2;
         
         const dxStart = actionInfo.startX - centerX;
         const dyStart = actionInfo.startY - centerY;
         const dxCurrent = clientX - centerX;
         const dyCurrent = clientY - centerY;

         const angleStart = Math.atan2(dyStart, dxStart) * 180 / Math.PI;
         const angleCurrent = Math.atan2(dyCurrent, dxCurrent) * 180 / Math.PI;

         let newRotation = (actionInfo.origRotation || 0) + (angleCurrent - angleStart);
         
         // Snap to 45 deg intervals se aproximar muito
         if (Math.abs(newRotation % 90) < 5) {
             newRotation = Math.round(newRotation / 90) * 90;
         } else if (Math.abs(newRotation % 45) < 3) {
             newRotation = Math.round(newRotation / 45) * 45;
         }

         currentRotation = newRotation;
         targetElement.style.transform = `translate(${actionInfo.origX}px, ${actionInfo.origY}px) scale(${actionInfo.origScale}) rotate(${newRotation}deg)`;

         const metricsTag = document.getElementById(`metrics-${actionInfo.index}`);
         if (metricsTag) {
           metricsTag.innerText = `[ R:${newRotation.toFixed(0)}° ]`;
         }
      }
    };

    const handleMouseUp = () => {
      if (!actionInfo) return;

      // Só persiste o que realmente mudou nesta ação
      const changed = currentX !== undefined || currentY !== undefined || currentScale !== undefined || currentWidth !== undefined || currentRotation !== undefined;

      if (changed) {
        const finalX = currentX;
        const finalY = currentY;
        const finalScale = currentScale;
        const finalWidth = currentWidth;
        const finalRotation = currentRotation;

        // Calcular delta de posição para propagar para os demais elementos selecionados
        const deltaX = (finalX !== undefined && actionInfo.type === 'drag') ? finalX - actionInfo.origX : 0;
        const deltaY = (finalY !== undefined && actionInfo.type === 'drag') ? finalY - actionInfo.origY : 0;

        setSlides((prev) => {
          const newSlides = prev.map((s, i) => {
            if (i !== actionInfo.index) return s;
            const pos = s.positions?.[actionInfo.field] || {};
            const updatedPos = { x: 0, y: 0, scale: 1, ...pos };

            if (finalX !== undefined) updatedPos.x = finalX;
            if (finalY !== undefined) updatedPos.y = finalY;
            if (finalScale !== undefined) updatedPos.scale = finalScale;
            if (finalWidth !== undefined) updatedPos.width = finalWidth;
            if (finalRotation !== undefined) updatedPos.rotation = finalRotation;

            if (updatedPos.x === undefined || isNaN(updatedPos.x)) updatedPos.x = 0;
            if (updatedPos.y === undefined || isNaN(updatedPos.y)) updatedPos.y = 0;
            if (updatedPos.scale === undefined || isNaN(updatedPos.scale)) updatedPos.scale = 1;

            return {
              ...s,
              positions: { ...(s.positions || {}), [actionInfo.field]: updatedPos },
            };
          });

          // Persistir delta nos demais elementos da multi-seleção (somente drag)
          if (actionInfo.type === 'drag' && (deltaX !== 0 || deltaY !== 0)) {
            selectedElements.forEach(key => {
              const [si, ...fieldParts] = key.split(':');
              const field = fieldParts.join(':');
              if (si === String(actionInfo.index) && field === actionInfo.field) return;
              const slideIdx = parseInt(si);
              if (slideIdx < 0 || slideIdx >= newSlides.length) return;
              const slide = { ...newSlides[slideIdx] };
              const pos = slide.positions?.[field] || {};
              const updatedPos = { x: 0, y: 0, scale: 1, ...pos };
              updatedPos.x = (updatedPos.x || 0) + deltaX;
              updatedPos.y = (updatedPos.y || 0) + deltaY;
              slide.positions = { ...(slide.positions || {}), [field]: updatedPos };
              newSlides[slideIdx] = slide;
            });
          }

          return newSlides;
        });
      }

      setActionInfo(null);
      currentX = undefined;
      currentY = undefined;
      currentScale = undefined;
      currentWidth = undefined;
      currentRotation = undefined;
    };

    if (actionInfo) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleMouseMove, { passive: false });
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [actionInfo, setSlides, slides, selectedElements]);

  const handleActionStart = useCallback(
    (e, index, field, type) => {
      if (!e.touches && e.button !== 0) return;
      e.preventDefault();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const slide = slides[index];
      const pos = slide.positions?.[field] || { x: 0, y: 0, scale: 1 };

      const el = document.getElementById(`smart-${index}-${field}`);
      const slideCard = document.getElementById(`slide-card-${index}`);

      let constraints = null;
      let origWidth = pos.width || (el ? el.offsetWidth : 200);
      let slideWidth = slideCard ? slideCard.offsetWidth : 9999;

      if ((type === 'drag' || type === 'resize-width') && el && slideCard) {
        const MARGIN = 12; // px mínimos visíveis na borda
        const slideRect = slideCard.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();

        // Posição natural do elemento no slide SEM transform:
        // elRect.left já inclui translate(pos.x) — desconta para obter o "left natural"
        const elNaturalLeft = elRect.left - slideRect.left - pos.x;
        const elNaturalTop  = elRect.top  - slideRect.top  - pos.y;
        const scale = pos.scale || 1;
        const elW = el.offsetWidth  * scale;
        const elH = el.offsetHeight * scale;

        // Limite máximo de largura CSS (anulando o scale para o tamanho base) antes de bater na borda
        const availableSpaceToSlideEdge = slideRect.width - (elRect.left - slideRect.left) - MARGIN;
        const maxCSSWidth = availableSpaceToSlideEdge / scale;

        const bottomMargin = (field === 'handle' || field === 'counter') ? 2 : MARGIN;

        constraints = {
          minX: -(elNaturalLeft) + MARGIN,
          maxX: slideRect.width  - elNaturalLeft - elW - MARGIN,
          minY: -(elNaturalTop)  + MARGIN,
          maxY: slideRect.height - elNaturalTop  - elH - bottomMargin,
          maxWidth: maxCSSWidth,
        };
      }

      setActionInfo({
        type,
        index,
        field,
        startX: clientX,
        startY: clientY,
        origX: pos.x,
        origY: pos.y,
        origScale: pos.scale || 1,
        origRotation: pos.rotation || 0,
        origWidth,
        slideWidth,
        constraints,
      });
    },
    [slides]
  );

  const resetSlidePositions = useCallback(
    (index) => {
      // Propriedades de formatação de texto que NÃO devem ser zeradas
      const TEXT_PROPS = ['color', 'bgColor', 'bold', 'italic', 'underline', 'uppercase', 'align', 'fontSize'];

      setSlides((prev) =>
        prev.map((s, i) => {
          if (i !== index) return s;

          // Zera x/y/scale de cada campo, preservando formatações de texto
          const newPositions = {};
          for (const [field, props] of Object.entries(s.positions || {})) {
            const preserved = {};
            for (const key of TEXT_PROPS) {
              if (props[key] !== undefined) preserved[key] = props[key];
            }
            if (Object.keys(preserved).length > 0) {
              newPositions[field] = preserved;
            }
          }

          // Limpar o transform e width do DOM diretamente (o hook escreve diretamente no DOM)
          for (const field of Object.keys(s.positions || {})) {
            const el = document.getElementById(`smart-${index}-${field}`);
            if (el) {
              el.style.transform = '';
              el.style.width = '';
              el.style.maxWidth = '';
              
              const innerTextChild = el.querySelector('h1, h2, h3, h4, p, span');
              if (innerTextChild) {
                innerTextChild.style.maxWidth = '';
              }
            }
          }

          // Remover propriedades de imagem (Y e Scale) mas clonar o resto do slide
          const { imagePosition, imageScale, ...restSlide } = s;

          return { ...restSlide, positions: newPositions };
        })
      );
    },
    [setSlides]
  );

  return { actionInfo, handleActionStart, resetSlidePositions };
}
