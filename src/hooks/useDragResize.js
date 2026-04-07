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
    let currentX, currentY, currentScale;

    const handleMouseMove = (e) => {
      if (!actionInfo) return;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const dx = clientX - actionInfo.startX;
      const dy = clientY - actionInfo.startY;

      let newX = actionInfo.origX;
      let newY = actionInfo.origY;
      let newScale = actionInfo.origScale;

      if (actionInfo.type === 'drag') {
        newX += dx;
        newY += dy;
      } else if (actionInfo.type === 'resize') {
        const scaleDelta = (dx + dy) * 0.005;
        newScale = Math.max(0.3, actionInfo.origScale + scaleDelta);
      }

      currentX = newX;
      currentY = newY;
      currentScale = newScale;

      // BYPASS REACT: Manipular DOM diretamente para zerar re-renders colaterais (60fps suave)
      const targetElement = document.getElementById(`smart-${actionInfo.index}-${actionInfo.field}`);
      if (targetElement) {
        targetElement.style.transform = `translate(${newX}px, ${newY}px) scale(${newScale})`;
        
        // Calcular W/H reais do elemento visual original e escalar
        const w = Math.round(targetElement.offsetWidth * newScale);
        const h = Math.round(targetElement.offsetHeight * newScale);

        // Atualizar Info-Tag sob o slide
        const metricsTag = document.getElementById(`metrics-${actionInfo.index}`);
        if (metricsTag) {
          metricsTag.innerText = `[ X:${Math.round(newX)} Y:${Math.round(newY)} | W:${w} H:${h} S:${newScale.toFixed(2)}x ]`;
        }
      }
    };

    const handleMouseUp = () => {
      if (!actionInfo) return;
      
      // Quando soltar, injeta no estado global para persistência Real
      if (currentX !== undefined || currentY !== undefined || currentScale !== undefined) {
        setSlides((prev) =>
          prev.map((s, i) => {
            if (i === actionInfo.index) {
              const pos = s.positions?.[actionInfo.field] || { x: 0, y: 0, scale: 1 };
              return {
                ...s,
                positions: {
                  ...(s.positions || {}),
                  [actionInfo.field]: {
                    ...pos,
                    x: currentX !== undefined ? currentX : pos.x,
                    y: currentY !== undefined ? currentY : pos.y,
                    scale: currentScale !== undefined ? currentScale : pos.scale,
                  },
                },
              };
            }
            return s;
          })
        );
      }
      
      setActionInfo(null);
      currentX = undefined;
      currentY = undefined;
      currentScale = undefined;
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
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const slide = slides[index];
      const pos = slide.positions?.[field] || { x: 0, y: 0, scale: 1 };

      setActionInfo({
        type,
        index,
        field,
        startX: clientX,
        startY: clientY,
        origX: pos.x,
        origY: pos.y,
        origScale: pos.scale || 1,
      });
    },
    [slides]
  );

  const resetSlidePositions = useCallback(
    (index) => {
      setSlides((prev) => prev.map((s, i) => (i === index ? { ...s, positions: {} } : s)));
    },
    [setSlides]
  );

  return { actionInfo, handleActionStart, resetSlidePositions };
}
