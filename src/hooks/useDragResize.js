import { useState, useEffect, useCallback } from 'react';

/**
 * Hook para gerenciar drag e resize de elementos nos slides.
 * Extraído do motor de interação do monólito (linhas 68-143).
 *
 * @returns {{ actionInfo, handleActionStart, resetSlidePositions, setSlides props }}
 */
export function useDragResize(slides, setSlides) {
  const [actionInfo, setActionInfo] = useState(null);

  useEffect(() => {
    // Variáveis de trabalho: CADA TIPO só escreve as suas próprias.
    // drag        → currentX, currentY (nunca toca em scale/width)
    // resize      → currentScale        (nunca toca em x/y/width)
    // resize-width→ currentWidth        (nunca toca em x/y/scale)
    let currentX, currentY, currentScale, currentWidth;

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
        targetElement.style.transform = `translate(${newX}px, ${newY}px) scale(${actionInfo.origScale})`;

        const metricsTag = document.getElementById(`metrics-${actionInfo.index}`);
        if (metricsTag) {
          const w = Math.round(targetElement.offsetWidth * actionInfo.origScale);
          const h = Math.round(targetElement.offsetHeight * actionInfo.origScale);
          metricsTag.innerText = `[ X:${Math.round(newX)} Y:${Math.round(newY)} | W:${w} H:${h} ]`;
        }

      } else if (actionInfo.type === 'resize') {
        const scaleDelta = (dx + dy) * 0.005;
        const newScale = Math.max(0.3, actionInfo.origScale + scaleDelta);

        currentScale = newScale;
        // x/y mantidos do que já existe, sem tocar
        targetElement.style.transform = `translate(${actionInfo.origX}px, ${actionInfo.origY}px) scale(${newScale})`;

        const metricsTag = document.getElementById(`metrics-${actionInfo.index}`);
        if (metricsTag) {
          const w = Math.round(targetElement.offsetWidth * newScale);
          const h = Math.round(targetElement.offsetHeight * newScale);
          metricsTag.innerText = `[ W:${w} H:${h} S:${newScale.toFixed(2)}x ]`;
        }

      } else if (actionInfo.type === 'resize-width') {
        const MIN_WIDTH = 80;
        const maxWidth = actionInfo.slideWidth || 9999;
        const newWidth = Math.max(MIN_WIDTH, Math.min(maxWidth, actionInfo.origWidth + dx));

        currentWidth = newWidth;
        targetElement.style.width = `${newWidth}px`;

        const metricsTag = document.getElementById(`metrics-${actionInfo.index}`);
        if (metricsTag) {
          metricsTag.innerText = `[ W:${Math.round(newWidth)}px ]`;
        }
      }
    };

    const handleMouseUp = () => {
      if (!actionInfo) return;

      // Só persiste o que realmente mudou nesta ação
      const changed = currentX !== undefined || currentY !== undefined || currentScale !== undefined || currentWidth !== undefined;

      if (changed) {
        setSlides((prev) =>
          prev.map((s, i) => {
            if (i !== actionInfo.index) return s;
            const pos = s.positions?.[actionInfo.field] || { x: 0, y: 0, scale: 1 };
            const updatedPos = { ...pos };

            if (currentX     !== undefined) updatedPos.x     = currentX;
            if (currentY     !== undefined) updatedPos.y     = currentY;
            if (currentScale !== undefined) updatedPos.scale = currentScale;
            if (currentWidth !== undefined) updatedPos.width = currentWidth;

            return {
              ...s,
              positions: { ...(s.positions || {}), [actionInfo.field]: updatedPos },
            };
          })
        );
      }

      setActionInfo(null);
      currentX = undefined;
      currentY = undefined;
      currentScale = undefined;
      currentWidth = undefined;
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
  }, [actionInfo, setSlides]);

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

      if (type === 'drag' && el && slideCard) {
        const MARGIN = 12; // px mínimos visíveis na borda
        const slideRect = slideCard.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();

        // Posição natural do elemento no slide SEM transform:
        // elRect.left já inclui translate(pos.x) — desconta para obter o "left natural"
        const elNaturalLeft = elRect.left - slideRect.left - pos.x;
        const elNaturalTop  = elRect.top  - slideRect.top  - pos.y;
        const elW = el.offsetWidth  * (pos.scale || 1);
        const elH = el.offsetHeight * (pos.scale || 1);

        constraints = {
          minX: -(elNaturalLeft) + MARGIN,
          maxX: slideRect.width  - elNaturalLeft - elW - MARGIN,
          minY: -(elNaturalTop)  + MARGIN,
          maxY: slideRect.height - elNaturalTop  - elH - MARGIN,
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
