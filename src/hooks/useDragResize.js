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
    const handleMouseMove = (e) => {
      if (!actionInfo) return;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const dx = clientX - actionInfo.startX;
      const dy = clientY - actionInfo.startY;

      setSlides((prev) =>
        prev.map((s, i) => {
          if (i === actionInfo.index) {
            const pos = s.positions?.[actionInfo.field] || { x: 0, y: 0, scale: 1 };

            if (actionInfo.type === 'drag') {
              return {
                ...s,
                positions: {
                  ...(s.positions || {}),
                  [actionInfo.field]: {
                    ...pos,
                    x: actionInfo.origX + dx,
                    y: actionInfo.origY + dy,
                  },
                },
              };
            } else if (actionInfo.type === 'resize') {
              const scaleDelta = (dx + dy) * 0.005;
              const newScale = Math.max(0.3, actionInfo.origScale + scaleDelta);
              return {
                ...s,
                positions: {
                  ...(s.positions || {}),
                  [actionInfo.field]: { ...pos, scale: newScale },
                },
              };
            }
          }
          return s;
        })
      );
    };

    const handleMouseUp = () => {
      if (actionInfo) setActionInfo(null);
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
