import React from 'react';
import { Sparkles, SlidersHorizontal } from 'lucide-react';
import { LAYOUT_META } from '../../lib/layout-templates';

/**
 * Mini wireframes SVG — reutilizados do AddSlidePopover, compactados para sidebar.
 */
const LAYOUT_ICONS = {
  cover: (
    <svg viewBox="0 0 40 50" fill="none" className="w-full h-full">
      <rect width="40" height="50" rx="3" fill="#1a1a2e" />
      <rect x="4" y="4" width="32" height="24" rx="2" fill="#2a2a4e" />
      <rect x="8" y="32" width="24" height="4" rx="1" fill="#5b5bdb" />
      <rect x="12" y="39" width="16" height="2.5" rx="1" fill="#3a3a5e" />
      <rect x="14" y="43" width="12" height="2" rx="1" fill="#2a2a4e" />
    </svg>
  ),
  'content-split': (
    <svg viewBox="0 0 40 50" fill="none" className="w-full h-full">
      <rect width="40" height="50" rx="3" fill="#1a1a2e" />
      <rect x="4" y="4" width="32" height="20" rx="2" fill="#2a2a4e" />
      <rect x="6" y="28" width="10" height="2.5" rx="1" fill="#5b5bdb" />
      <rect x="4" y="33" width="32" height="3" rx="1" fill="#3a3a5e" />
      <rect x="4" y="38" width="28" height="2.5" rx="1" fill="#3a3a5e" />
      <rect x="4" y="43" width="20" height="2.5" rx="1" fill="#3a3a5e" />
    </svg>
  ),
  'big-number': (
    <svg viewBox="0 0 40 50" fill="none" className="w-full h-full">
      <rect width="40" height="50" rx="3" fill="#1a1a2e" />
      <rect x="4" y="4" width="32" height="14" rx="2" fill="#2a2a4e" />
      <rect x="8" y="22" width="24" height="12" rx="2" fill="#5b5bdb" opacity="0.4" />
      <rect x="12" y="25" width="16" height="6" rx="1" fill="#5b5bdb" />
      <rect x="8" y="38" width="24" height="2.5" rx="1" fill="#3a3a5e" />
      <rect x="10" y="43" width="20" height="2" rx="1" fill="#2a2a4e" />
    </svg>
  ),
  quote: (
    <svg viewBox="0 0 40 50" fill="none" className="w-full h-full">
      <rect width="40" height="50" rx="3" fill="#1a1a2e" />
      <text x="7" y="22" fontSize="18" fill="#5b5bdb" fontFamily="serif">"</text>
      <rect x="8" y="24" width="24" height="2.5" rx="1" fill="#4a4a7e" />
      <rect x="8" y="29" width="20" height="2.5" rx="1" fill="#4a4a7e" />
      <rect x="8" y="34" width="22" height="2.5" rx="1" fill="#4a4a7e" />
      <rect x="14" y="41" width="12" height="2" rx="1" fill="#3a3a5e" />
    </svg>
  ),
  comparison: (
    <svg viewBox="0 0 40 50" fill="none" className="w-full h-full">
      <rect width="40" height="50" rx="3" fill="#1a1a2e" />
      <rect x="4" y="6" width="32" height="3" rx="1" fill="#5b5bdb" />
      <rect x="4" y="14" width="32" height="6" rx="1" fill="#2a2a4e" />
      <rect x="4" y="22" width="32" height="6" rx="1" fill="#3b1f3b" />
      <rect x="24" y="23.5" width="10" height="3" rx="1" fill="#c084fc" />
      <rect x="4" y="30" width="32" height="6" rx="1" fill="#2a2a4e" />
      <rect x="4" y="38" width="32" height="6" rx="1" fill="#3b1f3b" />
      <rect x="24" y="39.5" width="10" height="3" rx="1" fill="#c084fc" />
    </svg>
  ),
  list: (
    <svg viewBox="0 0 40 50" fill="none" className="w-full h-full">
      <rect width="40" height="50" rx="3" fill="#1a1a2e" />
      <rect x="4" y="5" width="24" height="3" rx="1" fill="#5b5bdb" />
      <circle cx="8" cy="17" r="2.5" fill="#5b5bdb" />
      <rect x="13" y="15.5" width="22" height="2" rx="1" fill="#3a3a5e" />
      <circle cx="8" cy="25" r="2.5" fill="#5b5bdb" />
      <rect x="13" y="23.5" width="18" height="2" rx="1" fill="#3a3a5e" />
      <circle cx="8" cy="33" r="2.5" fill="#5b5bdb" />
      <rect x="13" y="31.5" width="20" height="2" rx="1" fill="#3a3a5e" />
      <circle cx="8" cy="41" r="2.5" fill="#5b5bdb" />
      <rect x="13" y="39.5" width="16" height="2" rx="1" fill="#3a3a5e" />
    </svg>
  ),
  cta: (
    <svg viewBox="0 0 40 50" fill="none" className="w-full h-full">
      <rect width="40" height="50" rx="3" fill="#1a1a2e" />
      <rect x="8" y="8" width="24" height="4" rx="1" fill="#5b5bdb" />
      <rect x="4" y="16" width="32" height="2.5" rx="1" fill="#3a3a5e" />
      <rect x="6" y="21" width="28" height="2.5" rx="1" fill="#3a3a5e" />
      <rect x="8" y="33" width="24" height="9" rx="3" fill="#5b5bdb" />
      <rect x="12" y="36" width="16" height="3" rx="1" fill="#fff" opacity="0.7" />
    </svg>
  ),
};

/** Layouts que são fixos (não editáveis pelo usuário) */
const FIXED_LAYOUTS = ['cover', 'cta'];
/** Layouts do miolo (editáveis pelo usuário) */
const MIOLO_LAYOUTS = LAYOUT_META.filter((l) => !FIXED_LAYOUTS.includes(l.key));

/**
 * LayoutSelector — Painel de seleção de layouts para geração via IA.
 *
 * Props:
 *  - layoutSelection { mode, layouts } — estado atual
 *  - setLayoutSelection — setter do estado
 *  - slideCount {number} — total de slides a gerar
 *  - brandColor {string} — cor primária
 */
export default function LayoutSelector({ layoutSelection, setLayoutSelection, slideCount, brandColor }) {
  const isManual = layoutSelection.mode === 'manual';

  // Total de slides do miolo (sem cover e cta)
  const mioloCount = Math.max(0, slideCount - 2);

  // Soma dos layouts selecionados
  const totalSelected = Object.values(layoutSelection.layouts || {}).reduce((a, b) => a + b, 0);
  const isExact = totalSelected === mioloCount;
  const isOver = totalSelected > mioloCount;

  function setMode(mode) {
    setLayoutSelection((prev) => ({ ...prev, mode }));
  }

  function setQty(key, value) {
    const qty = Math.max(0, parseInt(value) || 0);
    setLayoutSelection((prev) => ({
      ...prev,
      layouts: { ...prev.layouts, [key]: qty },
    }));
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Toggle: IA vs Manual */}
      <div className="flex gap-1 p-1 bg-surface-input rounded-xl border border-border-subtle">
        <button
          onClick={() => setMode('ai')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
            !isManual
              ? 'bg-surface-card text-white shadow border border-border-hover'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Sparkles className="w-3 h-3" />
          IA Decide
        </button>
        <button
          onClick={() => setMode('manual')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
            isManual
              ? 'bg-surface-card text-white shadow border border-border-hover'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <SlidersHorizontal className="w-3 h-3" />
          Manual
        </button>
      </div>

      {/* Modo IA — mensagem informativa */}
      {!isManual && (
        <p className="text-[10px] text-zinc-500 text-center leading-relaxed px-1">
          A IA selecionará os melhores layouts para o seu briefing.
        </p>
      )}

      {/* Modo Manual — grid de layouts */}
      {isManual && (
        <div className="flex flex-col gap-2">
          {/* Layouts fixos (informativos) */}
          <div className="flex gap-2">
            {[
              { key: 'cover', label: 'Capa' },
              { key: 'cta', label: 'CTA' },
            ].map(({ key, label }) => (
              <div
                key={key}
                className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/5 opacity-40"
              >
                <div className="w-5 h-6 shrink-0">{LAYOUT_ICONS[key]}</div>
                <div className="flex-1">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">
                    {label}
                  </p>
                  <p className="text-[8px] text-zinc-600">Fixo</p>
                </div>
                <span className="text-[10px] font-mono text-zinc-600">1</span>
              </div>
            ))}
          </div>

          {/* Divisor com label do miolo */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-white/5" />
            <span className="text-[9px] uppercase tracking-widest text-zinc-600 font-bold">
              Miolo ({mioloCount} slides)
            </span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          {/* Layouts editáveis do miolo */}
          <div className="flex flex-col gap-1.5">
            {MIOLO_LAYOUTS.map(({ key, label }) => {
              const qty = layoutSelection.layouts?.[key] ?? 0;
              return (
                <div
                  key={key}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-input border border-border-subtle"
                >
                  <div className="w-5 h-6 shrink-0 opacity-80">{LAYOUT_ICONS[key]}</div>
                  <span className="flex-1 text-[10px] font-bold text-zinc-300 uppercase tracking-wide">
                    {label}
                  </span>

                  {/* Stepper compacto */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setQty(key, qty - 1)}
                      disabled={qty === 0}
                      className="w-5 h-5 flex items-center justify-center rounded bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white text-[11px] font-bold disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                    >
                      −
                    </button>
                    <span className="w-5 text-center text-xs font-mono text-white">{qty}</span>
                    <button
                      onClick={() => setQty(key, qty + 1)}
                      className="w-5 h-5 flex items-center justify-center rounded bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white text-[11px] font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contador / validação */}
          <div
            className={`flex items-center justify-between px-3 py-2 rounded-lg border text-[10px] font-bold transition-colors ${
              isExact
                ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-400'
                : isOver
                ? 'bg-red-950/30 border-red-800/40 text-red-400'
                : 'bg-surface-input border-border-subtle text-zinc-500'
            }`}
          >
            <span>Total do miolo</span>
            <span>
              {totalSelected} / {mioloCount}
              {isExact && ' ✓'}
              {isOver && ' — Excedeu!'}
            </span>
          </div>

          {/* Aviso se não está exato */}
          {!isExact && !isOver && totalSelected > 0 && (
            <p className="text-[9px] text-zinc-600 text-center leading-relaxed">
              Distribua os {mioloCount - totalSelected} slide(s) restante(s) entre os layouts acima.
            </p>
          )}
          {isOver && (
            <p className="text-[9px] text-red-500/80 text-center leading-relaxed">
              Reduza a seleção ou aumente o total de slides a gerar.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
