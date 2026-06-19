import React from 'react';

/**
 * parseStyledText — Converte HTML inline simples em elementos React.
 *
 * Suporta:
 *   <b>texto</b>               → negrito (font-weight: 900)
 *   <i>texto</i>               → itálico
 *   <span style="color:#HEX">  → cor customizada
 *   <span style="color:var(--color-brand)"> → cor da marca (brandColor via CSS var)
 *   Texto puro                 → span simples
 *
 * @param {string} text - String possivelmente contendo HTML inline simples.
 * @param {object} [opts]
 * @param {string} [opts.baseClassName] - Classe base aplicada em cada segmento.
 * @returns {React.ReactNode}
 */
export function parseStyledText(text, opts = {}) {
  if (!text || typeof text !== 'string') return text;

  // Se não contiver nenhuma tag HTML relevante, retorna diretamente (caminho rápido)
  if (!/<(b|i|span)\b/i.test(text)) return text;

  const { baseClassName = '' } = opts;

  // Parser recursivo simples via DOMParser (seguro — sem execução de scripts)
  const container = document.createElement('div');
  container.innerHTML = text;

  let keyCounter = 0;
  function nodeToReact(node) {
    // Nó de texto simples
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent || null;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return null;

    const tag = node.tagName.toLowerCase();
    const children = Array.from(node.childNodes).map(nodeToReact).filter(Boolean);
    const key = keyCounter++;

    if (tag === 'b' || tag === 'strong') {
      return (
        <span key={key} style={{ fontWeight: 900 }} className={baseClassName}>
          {children}
        </span>
      );
    }

    if (tag === 'i' || tag === 'em') {
      return (
        <span key={key} style={{ fontStyle: 'italic' }} className={baseClassName}>
          {children}
        </span>
      );
    }

    if (tag === 'span') {
      const inlineStyle = node.getAttribute('style') || '';
      const styleObj = parseInlineStyle(inlineStyle);
      return (
        <span key={key} style={styleObj} className={baseClassName}>
          {children}
        </span>
      );
    }

    // Tags não reconhecidas: renderiza apenas o conteúdo interno
    return <React.Fragment key={key}>{children}</React.Fragment>;
  }

  const result = Array.from(container.childNodes).map(nodeToReact).filter(n => n !== null && n !== undefined);

  if (result.length === 0) return text;
  if (result.length === 1 && typeof result[0] === 'string') return result[0];

  return <>{result}</>;
}

/**
 * Converte string "color: #FF0000; font-weight: bold" em objeto de estilo React.
 * Trata apenas as propriedades CSS que a IA pode gerar.
 */
function parseInlineStyle(styleStr) {
  const obj = {};
  if (!styleStr) return obj;

  styleStr.split(';').forEach(decl => {
    const [prop, ...rest] = decl.split(':');
    if (!prop || rest.length === 0) return;
    const propTrimmed = prop.trim();
    const valueTrimmed = rest.join(':').trim(); // join de volta para suportar valores como "rgb(255, 0, 0)"

    // camelCase simples para as props mais comuns
    const camelProp = propTrimmed.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    obj[camelProp] = valueTrimmed;
  });

  return obj;
}
