import React from 'react';
import {
  Settings,
  Settings2,
  Lightbulb,
  BadgeCheck,
  Loader2,
  Send,
  AlertCircle,
  Sparkles,
  Upload,
} from 'lucide-react';
import { FONT_SCALE_RANGE, SLIDE_COUNT_RANGE } from '../../lib/design-tokens';

/**
 * ConfigSidebar — Sidebar de configurações do Alice Studio.
 * Contém: Alice Setup (handle, cor, verificado, fontes) + Master Prompt + geração.
 */
export default function ConfigSidebar({
  // Brand state
  brandHandle,
  setBrandHandle,
  isVerified,
  setIsVerified,
  gradientColor1,
  setGradientColor1,
  titleSizeScale,
  setTitleSizeScale,
  textSizeScale,
  setTextSizeScale,
  // Prompt state
  theme,
  setTheme,
  slideCount,
  setSlideCount,
  // Actions
  onGenerate,
  isGenerating,
  error,
  setIsSettingsOpen,
}) {
  return (
    <aside className="w-full lg:w-96 border-r border-border-subtle bg-surface-dark p-6 lg:p-8 flex flex-col gap-8 overflow-y-auto custom-scrollbar z-40 relative">
      <div className="space-y-6">
        {/* === Section: Alice Setup === */}
        <h3 className="alice-section-title">
          <Settings2 className="w-4 h-4" style={{ color: gradientColor1 }} />
          Alice Setup
        </h3>

        <div className="space-y-4">
          {/* Handle + Verified */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="alice-label">Handle (Arroba)</label>
              <input
                type="text"
                value={brandHandle}
                onChange={(e) => setBrandHandle(e.target.value)}
                className="alice-input"
              />
            </div>
            <div>
              <label className="alice-label">Selo Verified</label>
              <button
                onClick={() => setIsVerified(!isVerified)}
                className={`w-full h-[38px] rounded-lg border text-[11px] uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 ${
                  isVerified
                    ? ''
                    : 'bg-surface-input border-border-subtle text-zinc-500'
                }`}
                style={
                  isVerified
                    ? {
                        backgroundColor: `${gradientColor1}20`,
                        borderColor: `${gradientColor1}50`,
                        color: gradientColor1,
                      }
                    : {}
                }
              >
                <BadgeCheck className="w-4 h-4" /> {isVerified ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          {/* Cor + Fontes (bloqueado) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="alice-label">Cor Destaque</label>
              <div className="flex gap-2 items-center bg-surface-input border border-border-subtle p-1.5 rounded-lg">
                <input
                  type="color"
                  value={gradientColor1}
                  onChange={(e) => setGradientColor1(e.target.value)}
                  className="w-6 h-6 rounded cursor-pointer bg-transparent border-0 p-0"
                />
                <span className="text-[10px] font-mono text-zinc-400 uppercase">
                  {gradientColor1}
                </span>
              </div>
            </div>
            <div>
              <label className="alice-label">Fontes Extras</label>
              <button
                onClick={() =>
                  alert(
                    'As fontes primárias da Alice (Outfit/Playfair) já estão otimizadas para conversão. Não estrague meu design, Mr. Gustavo.'
                  )
                }
                className="w-full h-[38px] bg-surface-input border border-border-subtle rounded-lg text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
              >
                Bloqueado
              </button>
            </div>
          </div>

          {/* Scale: Título */}
          <div>
            <label className="alice-label">
              Tamanho Título: {titleSizeScale}%
            </label>
            <input
              type="range"
              min={FONT_SCALE_RANGE.min}
              max={FONT_SCALE_RANGE.max}
              value={titleSizeScale}
              onChange={(e) => setTitleSizeScale(e.target.value)}
              className="alice-range"
            />
          </div>

          {/* Scale: Texto */}
          <div>
            <label className="alice-label">
              Tamanho Texto: {textSizeScale}%
            </label>
            <input
              type="range"
              min={FONT_SCALE_RANGE.min}
              max={FONT_SCALE_RANGE.max}
              value={textSizeScale}
              onChange={(e) => setTextSizeScale(e.target.value)}
              className="alice-range"
            />
          </div>
        </div>

        <div className="h-px bg-white/5 w-full" />

        {/* === Section: Master Prompt === */}
        <div className="space-y-4">
          <label className="alice-section-title">
            <Lightbulb className="w-4 h-4" style={{ color: gradientColor1 }} />
            Master Prompt
          </label>
          <textarea
            className="alice-textarea h-32"
            placeholder="Descreva a estratégia. Ex: 5 motivos polêmicos sobre a confeitaria gourmet tradicional..."
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          />

          {/* Slide Count */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="alice-label mb-0">Slides a Gerar</label>
              <span
                className="font-bold px-2 py-0.5 rounded text-xs"
                style={{
                  backgroundColor: `${gradientColor1}20`,
                  color: gradientColor1,
                }}
              >
                {slideCount}
              </span>
            </div>
            <input
              type="range"
              min={SLIDE_COUNT_RANGE.min}
              max={SLIDE_COUNT_RANGE.max}
              value={slideCount}
              onChange={(e) => setSlideCount(parseInt(e.target.value))}
              className="alice-range"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 p-4 bg-red-950/30 border border-red-900/50 rounded-xl flex items-start gap-3 text-red-400 text-xs font-mono">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={onGenerate}
            disabled={isGenerating}
            className="alice-btn-primary mt-6"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Processando...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" /> Start AI
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-white/5">
        <button 
          onClick={() => setIsSettingsOpen(true)}
          className="w-full flex items-center justify-center gap-2 p-3 rounded-lg border border-border-subtle bg-surface-input hover:border-white/20 hover:text-white transition-colors group"
        >
          <Settings className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
          <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 group-hover:text-white transition-colors">Adapters & API</span>
        </button>
      </div>
    </aside>
  );
}
