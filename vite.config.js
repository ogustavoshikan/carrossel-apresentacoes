import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      'openpolotno': path.resolve(__dirname, './docs/Estudo_OpenPolotno_Repo'),
    },
  },
  server: {
    proxy: {
      '/serpapi': {
        target: 'https://serpapi.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/serpapi/, ''),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Chunk isolado para cada família de variantes pesadas
          if (id.includes('cover-extra-variants'))  return 'variants-cover-extra';
          if (id.includes('cover-variants'))         return 'variants-cover';
          if (id.includes('split-variants'))         return 'variants-split';
          if (id.includes('cta-extra-variants'))     return 'variants-cta-extra';
          if (id.includes('cta-variants'))           return 'variants-cta';
          if (id.includes('bignumber-variants'))     return 'variants-bignumber';
          if (id.includes('comparison-variants'))    return 'variants-comparison';
          if (id.includes('quote-variants'))         return 'variants-quote';
          if (id.includes('list-variants'))          return 'variants-list';
          if (id.includes('sequence-variants'))      return 'variants-sequence';
          // Dependências externas em chunk separado (melhor cache)
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) return 'vendor-react';
          if (id.includes('node_modules/lucide-react'))  return 'vendor-lucide';
          if (id.includes('node_modules/framer-motion')) return 'vendor-framer';
        },
      },
    },
  },
});
