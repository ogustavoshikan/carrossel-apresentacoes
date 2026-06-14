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
  Instagram
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
  onInstagramPreview,
  onEditInCanvas
}) {
  return (
    <div className="relative z-20 flex items-center justify-between bg-surface-dark/40 border-b border-white/5 p-2 w-full font-sans">
      
      {/* Esquerda: Badge Metadados e Pré-visualização */}
      <div className="flex justify-start pl-2 gap-2">
        <span className="flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-zinc-400 px-3 py-2.5 rounded-xl shrink-0">
          {slides.length} {slides.length === 1 ? 'Slide' : 'Slides'}
        </span>
        
        <button
          onClick={onInstagramPreview}
          className="group flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest py-2.5 px-3 rounded-xl bg-transparent hover:bg-zinc-900/80 text-zinc-400 hover:text-white transition-all"
          title="Ver como ficaria no Instagram"
        >
          <Instagram className="w-3.5 h-3.5 group-hover:text-pink-500 transition-colors" />
          <span>Pré-visualizar</span>
        </button>
      </div>

      {/* Direita: Controles e Ações */}
      <div className="flex items-center gap-1 sm:gap-2 pr-1">
        {/* Preview Final */}
        <button
          onClick={() => { setViewMode('visual'); setShowMetrics(false); }}
          className={cn(
            'flex items-center justify-center gap-2 py-2.5 px-2 sm:px-3 rounded-xl outline-none ring-0 border-none transition-none text-[10px] font-black uppercase tracking-widest',
            viewMode === 'visual' && !showMetrics
              ? 'bg-zinc-900 text-white'
              : 'text-white/30 hover:text-white/60 hover:bg-zinc-900/80'
          )}
        >
          <span>Preview Final</span>
        </button>

        {/* Estrutura */}
        <button
          onClick={() => setViewMode('text')}
          className={cn(
            'flex items-center justify-center gap-2 py-2.5 px-2 sm:px-3 rounded-xl outline-none ring-0 border-none transition-none text-[10px] font-black uppercase tracking-widest',
            viewMode === 'text'
              ? 'bg-zinc-900 text-white'
              : 'text-white/30 hover:text-white/60 hover:bg-zinc-900/80'
          )}
        >
          <span>Estrutura</span>
        </button>

        {/* Raio-X */}
        <button
          onClick={() => { setViewMode('visual'); setShowMetrics(true); }}
          className={cn(
            'flex items-center justify-center gap-2 py-2.5 px-2 sm:px-3 rounded-xl outline-none ring-0 border-none transition-none text-[10px] font-black uppercase tracking-widest',
            viewMode === 'visual' && showMetrics
              ? 'bg-zinc-900'
              : 'text-white/30 hover:text-white/60 hover:bg-zinc-900/80'
          )}
          style={
            viewMode === 'visual' && showMetrics
              ? { color: brandColor }
              : {}
          }
        >
          <span>Raio-X</span>
        </button>

        <div className="w-px h-4 bg-white/10 mx-1"></div>

        {/* Copiar */}
        <button
          onClick={onCopyAll}
          className="flex items-center justify-center gap-2 py-2.5 px-2 sm:px-3 rounded-xl outline-none ring-0 border-none transition-none text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white/60 hover:bg-zinc-900/80"
        >
          <span>
            {copiedIndex === 'all' ? 'Copiado' : 'Copiar'}
          </span>
        </button>

        {/* Editar no Canvas */}
        <button
          onClick={onEditInCanvas}
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl outline-none ring-0 border-none transition-all text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-zinc-900/80"
          title="Editar este carrossel de forma avançada no Canvas"
        >
          <Zap className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span>Editar no Canvas</span>
        </button>

        {/* Export */}
        {viewMode === 'visual' && slides.length > 0 && (
          <button
            onClick={onExportAll}
            disabled={isExporting}
            className="flex items-center justify-center gap-2 py-2.5 px-3 sm:px-4 rounded-xl transition-all disabled:opacity-50 hover:brightness-110 text-[10px] font-black uppercase tracking-widest text-white"
            style={{ backgroundColor: brandColor }}
          >
            {isExporting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            <span>
              {isExporting ? 'Exportando' : 'Exportar'}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

