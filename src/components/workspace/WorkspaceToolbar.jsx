import React from 'react';
import {
  Ruler,
  Download,
  Copy,
  CheckCircle2,
  Loader2,
} from 'lucide-react';

/**
 * WorkspaceToolbar — Barra de ferramentas superior do workspace.
 * Contém: contagem de slides, tabs preview/texto, raio-X, export e copiar.
 */
export default function WorkspaceToolbar({
  slides,
  viewMode,
  setViewMode,
  showMetrics,
  setShowMetrics,
  onExportAll,
  onCopyAll,
  isExporting,
  copiedIndex,
  brandColor,
}) {
  return (
    <div className="flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center bg-surface-card border border-border-subtle p-4 rounded-2xl shadow-xl z-20 relative">
      <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
        <span className="text-white font-outfit font-black tracking-widest bg-surface-input px-4 py-2 rounded-lg text-label-xs uppercase border border-border-hover">
          {slides.length} Slides
        </span>

        <div className="flex bg-surface-input rounded-xl p-1 border border-border-subtle">
          <button
            onClick={() => setViewMode('visual')}
            className={`alice-tab ${viewMode === 'visual' ? 'alice-tab-active' : 'alice-tab-inactive'}`}
          >
            Preview Final
          </button>
          <button
            onClick={() => setViewMode('text')}
            className={`alice-tab ${viewMode === 'text' ? 'alice-tab-active' : 'alice-tab-inactive'}`}
          >
            Estrutura/Texto
          </button>
        </div>

        {viewMode === 'visual' && (
          <div className="flex bg-surface-input rounded-xl p-1 border border-border-subtle ml-auto xl:ml-0">
            <button
              onClick={() => setShowMetrics(!showMetrics)}
              className={`alice-tab flex items-center gap-1.5 ${
                showMetrics ? '' : 'bg-transparent alice-tab-inactive border border-transparent'
              }`}
              style={
                showMetrics
                  ? {
                      backgroundColor: `${brandColor}20`,
                      borderColor: `${brandColor}50`,
                      color: brandColor,
                    }
                  : {}
              }
              title="Mostrar dimensões reais para padronização"
            >
              <Ruler className="w-3.5 h-3.5" /> Raio-X
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 w-full xl:w-auto">
        {viewMode === 'visual' && slides.length > 0 && (
          <button
            onClick={onExportAll}
            disabled={isExporting}
            className="flex-1 xl:flex-none flex items-center justify-center gap-2 text-label-xs uppercase text-white py-2.5 px-6 rounded-xl transition-all disabled:opacity-50 font-black whitespace-nowrap shadow-xl hover:brightness-110"
            style={{ backgroundColor: brandColor }}
          >
            {isExporting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            {isExporting ? 'Exporting...' : 'Export High-Res'}
          </button>
        )}
        <button
          onClick={onCopyAll}
          className="flex-1 xl:flex-none flex items-center justify-center gap-2 text-label-xs uppercase bg-surface-input hover:bg-surface-input/50 text-white py-2.5 px-6 rounded-xl transition-colors whitespace-nowrap border border-border-hover font-bold"
        >
          {copiedIndex === 'all' ? (
            <CheckCircle2 className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          {copiedIndex === 'all' ? 'Copiado!' : 'Copiar Textos'}
        </button>
      </div>
    </div>
  );
}



