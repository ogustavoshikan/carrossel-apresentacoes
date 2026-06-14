import React from 'react';

// =========================================================================
// PARSER DE GRADIENTES NATIVO
// =========================================================================

export const isGradient = (color: string): boolean =>
  !!color && (color.indexOf('linear-gradient') >= 0 || color.indexOf('radial-gradient') >= 0);

export const isLinearGradient = (color: string): boolean =>
  !!color && color.indexOf('linear-gradient') >= 0;

export const isRadialGradient = (color: string): boolean =>
  !!color && color.indexOf('radial-gradient') >= 0;

export const parseColor = (color: string): { rotation: number; stops: Array<{ offset: number; color: string }> } => {
  if (!isLinearGradient(color)) {
    if (isRadialGradient(color)) {
      return { rotation: 0, stops: parseRadialColor(color).stops };
    }
    return {
      rotation: 0,
      stops: [
        { offset: 0, color },
        { offset: 1, color },
      ],
    };
  }

  // Captura o ângulo (ex: 90deg ou to bottom)
  const angleMatch = color.match(/linear-gradient\((-?\d+(?:\.\d+)?deg|to\s+[a-z\s]+)/i);
  let rotation = 90;
  if (angleMatch) {
    const angleStr = angleMatch[1];
    if (angleStr.includes('deg')) {
      rotation = parseFloat(angleStr);
    } else {
      if (angleStr.includes('to right')) rotation = 90;
      else if (angleStr.includes('to bottom')) rotation = 180;
      else if (angleStr.includes('to left')) rotation = 270;
      else if (angleStr.includes('to top')) rotation = 0;
    }
  }

  // Captura as paradas de cores em hexadecimal
  const hexColors = color.match(/#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}/g) || ['#FFFFFF', '#000000'];
  return {
    rotation,
    stops: [
      { offset: 0, color: hexColors[0] },
      { offset: 1, color: hexColors[1] || hexColors[0] }
    ]
  };
};

export const parseRadialColor = (color: string): { stops: Array<{ offset: number; color: string }> } => {
  const hexColors = color.match(/#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}/g) || ['#FFFFFF', '#000000'];
  return {
    stops: [
      { offset: 0, color: hexColors[0] },
      { offset: 1, color: hexColors[1] || hexColors[0] }
    ]
  };
};

// =========================================================================
// FUNÇÕES UTILITÁRIAS PARA CONVERSÃO DE CORES (HSV <-> RGB <-> HEX)
// =========================================================================

export function hexToRgb(hex: string) {
  if (!hex || typeof hex !== 'string') return { r: 255, g: 255, b: 255 };
  let c = hex.replace(/^#/, '');
  if (c.length === 3) {
    c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
  }
  const num = parseInt(c, 16);
  if (isNaN(num)) {
    return { r: 255, g: 255, b: 255 };
  }
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

export function rgbToHex(r: number, g: number, b: number) {
  if (isNaN(r) || isNaN(g) || isNaN(b)) return '#FFFFFF';
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

export function rgbToHsv(r: number, g: number, b: number) {
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return { h: 0, s: 0, v: 100 };
  }
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const v = max;
  const d = max - min;
  s = max === 0 ? 0 : d / max;
  if (max !== min) {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: h * 360, s: s * 100, v: v * 100 };
}

export function hsvToRgb(h: number, s: number, v: number) {
  h /= 360; s /= 100; v /= 100;
  let r = 0, g = 0, b = 0;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

export function hsvToHex(h: number, s: number, v: number) {
  const { r, g, b } = hsvToRgb(h, s, v);
  return rgbToHex(r, g, b);
}

// Visual helper to render type icons (vanilla SVG)
export const getBgIcon = (type: string) => {
  if (type === 'linear') {
    return (
      <svg className="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="4" cy="4" r="1.5" className="opacity-20" />
        <circle cx="12" cy="4" r="1.5" className="opacity-40" />
        <circle cx="20" cy="4" r="1.5" className="opacity-60" />
        <circle cx="4" cy="12" r="1.5" className="opacity-40" />
        <circle cx="12" cy="12" r="1.5" className="opacity-60" />
        <circle cx="20" cy="12" r="1.5" className="opacity-80" />
        <circle cx="4" cy="20" r="1.5" className="opacity-60" />
        <circle cx="12" cy="20" r="1.5" className="opacity-80" />
        <circle cx="20" cy="20" r="1.5" className="opacity-100" fill="currentColor" />
      </svg>
    );
  }
  if (type === 'radial') {
    return (
      <svg className="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" strokeDasharray="3 3" />
        <circle cx="12" cy="12" r="6" strokeDasharray="2 2" />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      </svg>
    );
  }
  // Solid
  return (
    <svg className="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m14 2 8 8L10 22H2v-8L14 2Z" />
      <path d="m5 11 9 9" />
      <path d="m19 15-4-4" />
    </svg>
  );
};
