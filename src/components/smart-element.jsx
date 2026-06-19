import React, { useRef, useState, useEffect } from 'react';
import { Move, GripVertical, RotateCw } from 'lucide-react';
import { useSelectedElements } from '../lib/selection-context';

/**
 * Componente isolado para proteger a edição RTF do React Reconciliation
 */
const SafeEditable = React.forwardRef(({ html, tagName: Tag, onHtmlBlur, isEditing, externalOnKeyDown, dangerouslySetInnerHTML, ...props }, forwardedRef) => {
  const localRef = useRef(null);
  const ref = forwardedRef || localRef;

  useEffect(() => {
    if (ref.current && document.activeElement !== ref.current) {
      if (ref.current.innerHTML !== html) {
        ref.current.innerHTML = html;
      }
    }
  }, [html, ref]);

  return (
    <Tag
      {...props}
      ref={ref}
      onKeyDown={(e) => {
         if (isEditing && (e.ctrlKey || e.metaKey)) {
             const key = e.key.toLowerCase();
             if (['b', 'i', 'u'].includes(key)) {
                 e.preventDefault();
                 if (key === 'b') document.execCommand('bold', false, null);
                 if (key === 'i') document.execCommand('italic', false, null);
                 if (key === 'u') document.execCommand('underline', false, null);
             }
         }
         if (externalOnKeyDown) externalOnKeyDown(e);
      }}
      onBlur={(e) => {
         if (onHtmlBlur) onHtmlBlur(e, ref.current.innerHTML);
         if (props.onBlur) props.onBlur(e);
      }}
    />
  );
});/**
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
  style: externalStyle,
}) {
  const elRef = useRef(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [isEditing, setIsEditing] = useState(false);

  const pos = position;
  const inverseScale = 1 / (pos.scale || 1);

  useEffect(() => {
    if (!isSelected) setIsEditing(false);
  }, [isSelected]);

  useEffect(() => {
    if (showMetrics && elRef.current) {
      setDims({
        w: Math.round(elRef.current.offsetWidth * pos.scale),
        h: Math.round(elRef.current.offsetHeight * pos.scale),
      });
    }
  }, [showMetrics, pos.scale, pos.x, pos.y, children]);

  const selectedElements = useSelectedElements();
  const isMultiSelected = selectedElements.has(`${slideIndex}:${field}`);
  const isActive = isSelected || isMultiSelected;

  return (
      <div
          className={`group/smart relative ${className || ''}`}
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${pos.scale}) rotate(${pos.rotation || 0}deg)`,
            zIndex: isActive ? 60 : (showMetrics ? 50 : 40),
            transformOrigin: 'center center',
            // Quando a largura é controlada por resize, altura deve ser auto para
            // expandir para baixo conforme o texto quebra de linha.
            ...(pos.width
              ? { width: `${pos.width}px`, minWidth: 'min-content', maxWidth: 'none', height: 'auto' }
              : (field?.toLowerCase().includes('imagem') || field?.toLowerCase().includes('logo'))
                ? {}
                : { width: 'fit-content' }),
            ...externalStyle,
          }}
          ref={elRef}
          id={`smart-${slideIndex}-${field}`}
          onClick={(e) => {
            e.stopPropagation();
            if (onSelectElement) onSelectElement(slideIndex, field);
          }}
        >
      {/* Métricas */}
      {showMetrics && (
        <div 
          className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[var(--color-brand)] text-white text-[10px] font-mono font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap pointer-events-none z-[60] border border-[var(--color-brand)] opacity-90 backdrop-blur-sm"
          style={{ transform: `translateX(-50%) scale(${inverseScale})`, transformOrigin: 'bottom center' }}
        >
          W: {dims.w}px | H: {dims.h}px | S: {pos.scale.toFixed(2)}x
        </div>
      )}

      {/* Handles BOTTOM (Drag + Rotate) */}
      <div 
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1.5 opacity-0 group-hover/smart:opacity-100 z-50 transition-opacity"
        style={{ transform: `translateX(-50%) scale(${inverseScale})`, transformOrigin: 'top center' }}
      >
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
          className="w-6 h-6 bg-zinc-800 hover:bg-zinc-700 text-rose-500 rounded-full cursor-move flex items-center justify-center shadow-xl border border-zinc-600 pointer-events-auto transition-transform hover:scale-110 active:scale-95"
          title="Mover"
        >
          <Move size={12} />
        </div>
        <div
          onMouseDown={(e) => {
            e.stopPropagation();
            if (onSelectElement) onSelectElement(slideIndex, field);
            onActionStart(e, slideIndex, field, 'rotate');
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            if (onSelectElement) onSelectElement(slideIndex, field);
            onActionStart(e, slideIndex, field, 'rotate');
          }}
          className="w-6 h-6 bg-zinc-800 hover:bg-zinc-700 text-blue-400 rounded-full cursor-default flex items-center justify-center shadow-xl border border-zinc-600 pointer-events-auto transition-transform hover:scale-110 active:scale-95"
          title="Rotacionar"
        >
          <RotateCw size={12} />
        </div>
      </div>

      {/* Canvas-Like Drag Overlay (Intercepts clicks for moving) */}
      {!isEditing && (
         <div 
           className="absolute inset-0 z-20 cursor-move pointer-events-auto"
           title="Mova live, ou dê DUPLO CLIQUE para digitar texto"
           onDoubleClick={(e) => {
             e.stopPropagation();
             setIsEditing(true);
             const x = e.clientX;
             const y = e.clientY;
             
             // Move cursor sync without triggering strict re-renders inside inner text
             setTimeout(() => {
               const ta = elRef.current?.querySelector('textarea, input, [contenteditable]');
               if (ta) {
                   ta.focus();
                   try {
                       if (document.caretPositionFromPoint) {
                           const pos = document.caretPositionFromPoint(x, y);
                           if (pos) {
                               const sel = window.getSelection();
                               sel.collapse(pos.offsetNode, pos.offset);
                           }
                       } else if (document.caretRangeFromPoint) {
                           const range = document.caretRangeFromPoint(x, y);
                           if (range) {
                               const sel = window.getSelection();
                               sel.removeAllRanges();
                               sel.addRange(range);
                           }
                       }
                   } catch(err) {
                       // Silently fail if coordinates are invalid, just keeps normal focus
                   }
               }
             }, 10);
           }}
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
         />
      )}

      {/* Conteúdo */}
      <div
        data-smart-content="true"
        className={`w-full h-full outline-none transition-colors relative z-10 ${
          isActive
            ? 'outline outline-2 outline-offset-4 outline-[var(--color-brand)] bg-[var(--color-brand)]/5 ring-4 ring-black/20 rounded-sm'
            : showMetrics
              ? 'outline outline-1 outline-dashed outline-[var(--color-brand)]/50 bg-[var(--color-brand)]/10'
              : 'hover:outline hover:outline-1 hover:outline-dashed hover:outline-[var(--color-brand)]/50'
        }`}
        style={pos.width ? { height: 'auto', minWidth: 'min-content' } : {}}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
             const isEditable = child.props.contentEditable;
             
             const mergedStyle = {
                ...child.props.style,
                color: pos.color || child.props.style?.color,
                backgroundColor: pos.bgColor || child.props.style?.backgroundColor,
                fontWeight: pos.bold ? '900' : child.props.style?.fontWeight,
                fontStyle: pos.italic ? 'italic' : child.props.style?.fontStyle,
                textDecoration: pos.underline ? 'underline' : child.props.style?.textDecoration,
                textTransform: pos.uppercase ? 'uppercase' : child.props.style?.textTransform,
                textAlign: pos.align || child.props.style?.textAlign,
                lineHeight: pos.lineHeight !== undefined ? pos.lineHeight : child.props.style?.lineHeight,
                letterSpacing: pos.letterSpacing !== undefined ? `${pos.letterSpacing}px` : child.props.style?.letterSpacing,
                ...(pos.width ? {
                  maxWidth: 'none',
                  minWidth: 'min-content',
                  height: 'auto',
                  minHeight: 'auto',
                  overflow: 'visible',
                  WebkitLineClamp: 'unset',
                  lineClamp: 'unset',
                  whiteSpace: 'pre-wrap',
                  textOverflow: 'clip',
                } : {}),
             };
             
             if (isEditable) {
                 const Tag = child.type;
                 // Extraímos onBlur e onKeyDown para não causar loop
                 const { onBlur: originalOnBlur, onKeyDown: originalOnKeyDown, children: originalChildren, ...restProps } = child.props;
                 
                 return (
                     <SafeEditable
                         tagName={Tag}
                         html={typeof originalChildren === 'string' ? originalChildren : (restProps.dangerouslySetInnerHTML?.__html || '')}
                         isEditing={isEditing}
                         externalOnKeyDown={originalOnKeyDown}
                         {...restProps}
                         style={mergedStyle}
                         onHtmlBlur={(e, rawHtml) => {
                             setIsEditing(false); // Retorna a camada de proteção Canva
                             if (originalOnBlur) {
                                 const fakeEvent = {
                                     ...e,
                                     currentTarget: {
                                         ...e.currentTarget,
                                         innerText: rawHtml
                                     }
                                 };
                                 // Usamos call para manter o this flexível (opcional)
                                 originalOnBlur(fakeEvent);
                             }
                         }}
                     />
                 );
             } else {
                 return React.cloneElement(child, {
                     style: mergedStyle
                 });
             }
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
        className="absolute top-1/2 -right-3 -translate-y-1/2 w-3 h-8 bg-zinc-700 hover:bg-[var(--color-brand)] rounded-full cursor-ew-resize opacity-0 group-hover/smart:opacity-100 flex items-center justify-center z-50 shadow-lg border border-zinc-600 pointer-events-auto transition-colors"
        style={{ transform: `translateY(-50%) scale(${inverseScale})`, transformOrigin: 'center left' }}
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
        className="absolute -top-2 -left-2 w-3 h-3 bg-[var(--color-brand)] rounded-full cursor-nwse-resize opacity-0 group-hover/smart:opacity-100 shadow border-2 border-zinc-900 z-50 pointer-events-auto"
        style={{ transform: `scale(${inverseScale})`, transformOrigin: 'bottom right' }}
        title="Redimensionar escala"
      />
    </div>
  );
}

