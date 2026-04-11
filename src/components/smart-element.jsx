import React, { useRef, useState, useEffect } from 'react';
import { Move, GripVertical } from 'lucide-react';

/**
 * SmartElement — Wrapper drag/resize para elementos editáveis dos slides.
 * Mostra handles de drag (move) e resize (scale) ao hover.
 * Mostra métricas (W/H/Scale) quando showMetrics está ativo.
 *
 * @param {object} props
 * @param {number} props.slideIndex - Índice do slide
 * @param {string} props.field - Nome do campo (titulo, texto_apoio, tag, etc.)
 * @param {object} props.position - { x, y, scale } do elemento
 * @param {boolean} props.showMetrics - Mostrar métricas de dimensões
 * @param {function} props.onActionStart - Callback para iniciar drag/resize
 * @param {string} [props.className] - Classes adicionais
 * @param {React.ReactNode} props.children
 */
export default function SmartElement({
  slideIndex,
  field,
  position = { x: 0, y: 0, scale: 1 },
  showMetrics,
  onActionStart,
  className,
  children,
  isSelected,
  onSelectElement,
}) {
  const elRef = useRef(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  const pos = position;

  useEffect(() => {
    if (showMetrics && elRef.current) {
      setDims({
        w: Math.round(elRef.current.offsetWidth * pos.scale),
        h: Math.round(elRef.current.offsetHeight * pos.scale),
      });
    }
  }, [showMetrics, pos.scale, pos.x, pos.y, children]);

  return (
      <div
        id={`smart-${slideIndex}-${field}`}
        ref={elRef}
        onClick={(e) => {
          e.stopPropagation();
          if (onSelectElement) onSelectElement(slideIndex, field);
        }}
        className={`group relative transition-all ${className || ''}`}
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px) scale(${pos.scale})`,
          zIndex: showMetrics ? 50 : 40,
          transformOrigin: 'center center',
          ...(pos.width ? { width: `${pos.width}px`, maxWidth: 'none' } : {}),
        }}
      >
      {/* Métricas */}
      {showMetrics && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[var(--color-brand)] text-white text-[10px] font-mono font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap pointer-events-none z-[60] border border-[var(--color-brand)] opacity-90 backdrop-blur-sm">
          W: {dims.w}px | H: {dims.h}px | S: {pos.scale.toFixed(2)}x
        </div>
      )}

      {/* Handle DRAG — top-left */}
      <div
        onMouseDown={(e) => {
          e.stopPropagation();
          if (onSelectElement) onSelectElement(slideIndex, field);
          onActionStart(e, slideIndex, field, 'drag');
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
          if (onSelectElement) onSelectElement(slideIndex, field);
          onActionStart(e, slideIndex, field, 'drag');
        }}
        className="absolute -top-3 -left-3 w-6 h-6 bg-zinc-800 text-rose-500 rounded-full cursor-move opacity-0 group-hover:opacity-100 flex items-center justify-center z-50 shadow-lg border border-zinc-700 pointer-events-auto"
      >
        <Move size={12} />
      </div>

      {/* Conteúdo */}
      <div
        className={`w-full h-full outline-none transition-all ${
          isSelected 
            ? 'outline outline-2 outline-offset-4 outline-[var(--color-brand)] bg-[var(--color-brand)]/5 ring-4 ring-black/20 rounded-sm'
            : showMetrics
              ? 'outline outline-1 outline-dashed outline-[var(--color-brand)]/50 bg-[var(--color-brand)]/10'
              : 'hover:outline hover:outline-1 hover:outline-dashed hover:outline-[var(--color-brand)]/50'
        }`}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              style: {
                ...child.props.style,
                color: pos.color || child.props.style?.color,
                backgroundColor: pos.bgColor || child.props.style?.backgroundColor,
                fontWeight: pos.bold ? '900' : child.props.style?.fontWeight,
                fontStyle: pos.italic ? 'italic' : child.props.style?.fontStyle,
                textDecoration: pos.underline ? 'underline' : child.props.style?.textDecoration,
                textTransform: pos.uppercase ? 'uppercase' : child.props.style?.textTransform,
                textAlign: pos.align || child.props.style?.textAlign,
                ...(pos.width ? { maxWidth: 'none' } : {}),
              },
            });
          }
          return child;
        })}
      </div>

      {/* Handle RESIZE WIDTH — lateral direita */}
      <div
        onMouseDown={(e) => {
          e.stopPropagation();
          if (onSelectElement) onSelectElement(slideIndex, field);
          onActionStart(e, slideIndex, field, 'resize-width');
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
          if (onSelectElement) onSelectElement(slideIndex, field);
          onActionStart(e, slideIndex, field, 'resize-width');
        }}
        className="absolute top-1/2 -right-3 -translate-y-1/2 w-3 h-8 bg-zinc-700 hover:bg-[var(--color-brand)] rounded-full cursor-ew-resize opacity-0 group-hover:opacity-100 flex items-center justify-center z-50 shadow-lg border border-zinc-600 pointer-events-auto transition-colors"
        title="Redimensionar largura"
      >
        <GripVertical size={8} className="text-zinc-400" />
      </div>

      {/* Handle RESIZE SCALE — canto inferior direito */}
      <div
        onMouseDown={(e) => {
          e.stopPropagation();
          if (onSelectElement) onSelectElement(slideIndex, field);
          onActionStart(e, slideIndex, field, 'resize');
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
          if (onSelectElement) onSelectElement(slideIndex, field);
          onActionStart(e, slideIndex, field, 'resize');
        }}
        className="absolute -bottom-2 -right-2 w-4 h-4 bg-[var(--color-brand)] rounded-full cursor-nwse-resize opacity-0 group-hover:opacity-100 shadow border-2 border-zinc-900 z-50 pointer-events-auto"
        title="Redimensionar escala"
      />
    </div>
  );
}
