import React from 'react';
import { cn } from '../../lib/utils';
import {
  Eye,
  FileText,
  Zap,
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
    <div className="relative mt-2 z-20 flex items-center justify-between bg-black border border-white/5 p-2 rounded-[20px] w-full font-sans">
      
      {/* Esquerda: Badge Metadados */}
      <div className="flex justify-start pl-2">
        <span className="flex items-center justify-center text-[11px] font-medium text-zinc-400 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full tracking-wide">
          {slides.length} {slides.length === 1 ? 'Slide' : 'Slides'}
        </span>
      </div>

      {/* Direita: Controles e Ações */}
      <div className="flex items-center gap-1 sm:gap-2 pr-1">
        {/* Preview Final */}
        <button
          onClick={() => { setViewMode('visual'); setShowMetrics(false); }}
          className={cn(
            'flex items-center justify-center gap-2 text-[11px] font-medium py-1.5 px-2 sm:px-3 rounded-full transition-colors border transition-all',
            viewMode === 'visual' && !showMetrics
              ? 'bg-white/10 text-white border-white/10'
              : 'bg-transparent hover:bg-white/5 text-zinc-400 hover:text-zinc-200 border-transparent hover:border-white/5'
          )}
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="hidden sm:inline-block">Preview Final</span>
        </button>

        {/* Estrutura */}
        <button
          onClick={() => setViewMode('text')}
          className={cn(
            'flex items-center justify-center gap-2 text-[11px] font-medium py-1.5 px-2 sm:px-3 rounded-full transition-colors border transition-all',
            viewMode === 'text'
              ? 'bg-white/10 text-white border-white/10'
              : 'bg-transparent hover:bg-white/5 text-zinc-400 hover:text-zinc-200 border-transparent hover:border-white/5'
          )}
        >
          <FileText className="w-3.5 h-3.5" />
          <span className="hidden sm:inline-block">Estrutura</span>
        </button>

        {/* Raio-X */}
        <button
          onClick={() => { setViewMode('visual'); setShowMetrics(true); }}
          className={cn(
            'flex items-center justify-center gap-2 text-[11px] font-medium py-1.5 px-2 sm:px-3 rounded-full transition-colors border transition-all',
            viewMode === 'visual' && showMetrics
              ? 'border-transparent'
              : 'bg-transparent hover:bg-white/5 text-zinc-400 hover:text-zinc-200 border-transparent hover:border-white/5'
          )}
          style={
            viewMode === 'visual' && showMetrics
              ? { backgroundColor: `${brandColor}20`, color: brandColor, borderColor: `${brandColor}30` }
              : {}
          }
        >
          <Zap className="w-3.5 h-3.5" />
          <span className="hidden sm:inline-block">Raio-X</span>
        </button>

        <div className="w-px h-4 bg-white/10 mx-1"></div>

        {/* Copiar */}
        <button
          onClick={onCopyAll}
          className="flex items-center justify-center gap-2 text-[11px] font-medium bg-transparent hover:bg-white/5 text-zinc-400 hover:text-zinc-200 py-1.5 px-2 sm:px-3 rounded-full transition-colors border border-transparent hover:border-white/5"
        >
          {copiedIndex === 'all' ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
          <span className="hidden sm:inline-block">
            {copiedIndex === 'all' ? 'Copiado' : 'Copiar'}
          </span>
        </button>

        {/* Export */}
        {viewMode === 'visual' && slides.length > 0 && (
          <button
            onClick={onExportAll}
            disabled={isExporting}
            className="flex items-center justify-center gap-2 text-[11px] font-bold text-white py-1.5 px-3 sm:px-4 rounded-full transition-all disabled:opacity-50 hover:brightness-110"
            style={{ backgroundColor: brandColor }}
          >
            {isExporting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline-block">
              {isExporting ? 'Exportando' : 'Exportar'}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

