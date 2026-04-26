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
      <div className="flex-1 flex justify-start pl-2">
        <span className="flex items-center justify-center text-[11px] font-medium text-zinc-400 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full tracking-wide">
          {slides.length} {slides.length === 1 ? 'Slide' : 'Slides'}
        </span>
      </div>

      {/* Centro: Controles de visualização */}
      <div className="flex-[2] sm:flex-1 flex justify-center shrink-0">
        <div className="flex items-center bg-white/5 p-1 rounded-full border border-white/5">
          <button
            onClick={() => { setViewMode('visual'); setShowMetrics(false); }}
            className={cn(
              'flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-[11px] font-medium transition-all',
              viewMode === 'visual' && !showMetrics
                ? 'bg-white/10 text-white'
                : 'text-zinc-500 hover:text-zinc-300'
            )}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline-block">Preview Final</span>
          </button>

          <button
            onClick={() => setViewMode('text')}
            className={cn(
              'flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-[11px] font-medium transition-all',
              viewMode === 'text'
                ? 'bg-white/10 text-white'
                : 'text-zinc-500 hover:text-zinc-300'
            )}
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline-block">Estrutura</span>
          </button>

          <button
            onClick={() => { setViewMode('visual'); setShowMetrics(true); }}
            className={cn(
              'flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-[11px] font-medium transition-all',
              viewMode === 'visual' && showMetrics
                ? 'text-white'
                : 'text-zinc-500 hover:text-zinc-300'
            )}
            style={
              viewMode === 'visual' && showMetrics
                ? { backgroundColor: `${brandColor}30`, color: brandColor }
                : {}
            }
          >
            <Zap className="w-3.5 h-3.5" />
            <span className="hidden sm:inline-block">Raio-X</span>
          </button>
        </div>
      </div>

      {/* Direita: Ações de saída e utilitários */}
      <div className="flex-1 flex justify-end gap-1 sm:gap-2 pr-1 shrink-0">
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
              {isExporting ? 'Exportando' : 'Export'}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

