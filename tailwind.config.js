/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'var(--color-brand)',
        },
        surface: {
          base: '#020202',
          primary: '#030303',
          card: '#080808',
          input: '#0A0A0A',
          dark: '#050505',
          slide: '#050505',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.05)',
          hover: 'rgba(255, 255, 255, 0.10)',
        },
      },
      fontFamily: {
        outfit: ['var(--font-title)', 'sans-serif'],
        playfair: ['var(--font-text)', 'serif'],
        title: ['var(--font-title)', 'sans-serif'],
        text: ['var(--font-text)', 'serif'],
        tag: ['var(--font-tag)', 'sans-serif'],
        header: ['var(--font-header)', 'sans-serif'],
      },
      borderRadius: {
        slide: 'var(--radius-slide, 2.5rem)',
        'slide-inner': 'var(--radius-inner, 2rem)',
        'slide-sm': 'var(--radius-sm, 1.5rem)',
      },
      fontSize: {
        'cover-title': ['120px', { lineHeight: '0.8', letterSpacing: '-0.05em', fontWeight: '900' }],
        'slide-title': ['32px', { lineHeight: '1.1', letterSpacing: '-0.05em', fontWeight: '900' }],
        'slide-body': ['18px', { lineHeight: '1.6' }],
        'big-number': ['130px', { lineHeight: '1', letterSpacing: '-0.05em', fontWeight: '900' }],
        'quote-text': ['36px', { lineHeight: '1.2', letterSpacing: '-0.025em', fontWeight: '700' }],
        'label-xs': ['10px', { letterSpacing: '0.25em', fontWeight: '900' }],
        'label-sm': ['11px', { letterSpacing: '0.3em', fontWeight: '900' }],
        'label-md': ['12px', { letterSpacing: '0.3em', fontWeight: '700' }],
        'tag': ['11px', { letterSpacing: '0.4em', fontWeight: '700' }],
      },
      spacing: {
        'slide-pad': '2.5rem',
        'slide-pad-sm': '1.5rem',
      },
      boxShadow: {
        'slide': '0 40px 80px -20px rgba(0, 0, 0, 0.8)',
        'brand-glow': '0 0 20px var(--color-brand-glow)',
      },
    },
  },
  plugins: [],
};
