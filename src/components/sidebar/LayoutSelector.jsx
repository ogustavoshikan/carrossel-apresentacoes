import React, { useState, useCallback } from 'react';
import { Sparkles, SlidersHorizontal, Plus, Star, X, Type, Shuffle } from 'lucide-react';
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
/**
 * Gera distribuição balanceada e aleatória — espelho da função em ai.js,
 * usada aqui para mostrar a prévia visual ao usuário.
 */
function buildAutoLayoutDistribution(mioloCount) {
  if (mioloCount <= 0) return {};
  const pool = [
    'content-split',
    'content-split',
    'big-number',
    'quote',
    'list',
    'comparison',
  ];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const result = {};
  for (let i = 0; i < mioloCount; i++) {
    const key = pool[i % pool.length];
    result[key] = (result[key] || 0) + 1;
  }
  return result;
}

export default function LayoutSelector({ layoutSelection = {}, setLayoutSelection, slideCount, brandColor, favorites = [], onUseFavorite, onRemoveFavorite, onInjectSlide, isInjecting }) {
  const [directLayout, setDirectLayout] = useState('content-split');
  const [directText, setDirectText] = useState('');
  const isManual = layoutSelection?.mode === 'manual';
  const isAutoMode = layoutSelection?.mode === 'auto' || !layoutSelection?.mode || layoutSelection?.mode === 'ai';

  // Total de slides do miolo (sem cover e cta)
  const mioloCount = Math.max(0, slideCount - 2);

  // Gera/re-gera a distribuição automática
  const handleShuffleAuto = useCallback(() => {
    const dist = buildAutoLayoutDistribution(mioloCount);
    setLayoutSelection((prev) => ({ ...prev, mode: 'auto', layouts: dist }));
  }, [mioloCount, setLayoutSelection]);

  // Ao entrar no modo auto pela primeira vez, gera a distribuição
  const handleSetAutoMode = useCallback(() => {
    const dist = buildAutoLayoutDistribution(mioloCount);
    setLayoutSelection({ mode: 'auto', layouts: dist });
  }, [mioloCount, setLayoutSelection]);

  // Sincroniza a distribuição automática ao montar (modo ai/auto com layouts vazio)
  // ou quando slideCount muda enquanto em modo auto
  React.useEffect(() => {
    if (isAutoMode && mioloCount > 0 && Object.keys(layoutSelection.layouts || {}).length === 0) {
      const dist = buildAutoLayoutDistribution(mioloCount);
      setLayoutSelection((prev) => ({ ...prev, mode: 'auto', layouts: dist }));
    }
  }, [mioloCount]); // eslint-disable-line react-hooks/exhaustive-deps

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
      {/* Toggle: Auto / Manual / Direto / Favs */}
      <div className="grid grid-cols-4 gap-1 p-1 bg-surface-input rounded-xl border border-border-subtle">
        <button
          onClick={handleSetAutoMode}
          className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-2 rounded-lg text-[8px] sm:text-[9px] font-bold uppercase tracking-wider transition-all border ${
            isAutoMode
              ? 'bg-surface-card text-white shadow border-border-hover'
              : 'text-zinc-500 hover:text-zinc-300 border-transparent'
          }`}
        >
          <Sparkles className="w-3 h-3 shrink-0" />
          <span className="truncate">Auto</span>
        </button>
        <button
          onClick={() => setMode('manual')}
          className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-2 rounded-lg text-[8px] sm:text-[9px] font-bold uppercase tracking-wider transition-all border ${
            layoutSelection.mode === 'manual'
              ? 'bg-surface-card text-white shadow border-border-hover'
              : 'text-zinc-500 hover:text-zinc-300 border-transparent'
          }`}
        >
          <SlidersHorizontal className="w-3 h-3 shrink-0" />
          <span className="truncate">Manual</span>
        </button>
        <button
          onClick={() => setMode('direct')}
          className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-2 rounded-lg text-[8px] sm:text-[9px] font-bold uppercase tracking-wider transition-all border ${
            layoutSelection.mode === 'direct'
              ? 'bg-surface-card text-white shadow border-border-hover'
              : 'text-zinc-500 hover:text-zinc-300 border-transparent'
          }`}
        >
          <Type className="w-3 h-3 shrink-0" />
          <span className="truncate">Direto</span>
        </button>
        <button
          onClick={() => setMode('favorites')}
          className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-2 rounded-lg text-[8px] sm:text-[9px] font-bold uppercase tracking-wider transition-all border ${
            layoutSelection.mode === 'favorites'
              ? 'bg-surface-card text-white shadow border-border-hover'
              : 'text-zinc-500 hover:text-zinc-300 border-transparent'
          }`}
        >
          <Star className="w-3 h-3 shrink-0" />
          <span className="truncate px-0.5">Favs {favorites.length > 0 && `(${favorites.length})`}</span>
        </button>
      </div>

      {/* Modo Auto — prévia visual da distribuição */}
      {isAutoMode && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-0.5">
            <p className="text-[10px] text-zinc-500 leading-relaxed">
              Distribuição gerada para <span className="text-zinc-300 font-bold">{mioloCount}</span> slide{mioloCount !== 1 ? 's' : ''} do miolo.
            </p>
            <button
              onClick={handleShuffleAuto}
              title="Regerar distribuição"
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-surface-input border border-border-subtle hover:border-border-hover text-zinc-400 hover:text-white transition-colors text-[9px] font-bold uppercase tracking-wider shrink-0"
            >
              <Shuffle className="w-3 h-3" />
              <span>Regerar</span>
            </button>
          </div>

          {/* Cards visuais dos layouts sorteados */}
          {mioloCount > 0 ? (
            <div className="grid grid-cols-3 gap-1.5">
              {Object.entries(layoutSelection.layouts || {}).filter(([, qty]) => qty > 0).map(([key, qty]) => {
                const meta = LAYOUT_META.find((m) => m.key === key);
                return (
                  <div
                    key={key}
                    className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-surface-input border border-border-subtle"
                  >
                    <div className="w-7 h-9 shrink-0 opacity-80">{LAYOUT_ICONS[key]}</div>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-300 text-center leading-tight">
                      {meta?.label || key}
                    </span>
                    <span
                      className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md"
                      style={{ color: brandColor, backgroundColor: `${brandColor}20` }}
                    >
                      {qty}x
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-[10px] text-zinc-600 text-center py-2">
              Aumente o número de slides para ver a distribuição.
            </p>
          )}
          <p className="text-[9px] text-zinc-600 text-center leading-relaxed">
            A IA adaptará o conteúdo de cada slide ao layout sorteado. Use “Regerar” para variar a combinação.
          </p>
        </div>
      )}

      {/* Modo Manual — grid de layouts */}
      {isManual && (
        <div className="flex flex-col gap-2">
          {/* Layouts fixos (informativos) */}
          <div className="flex gap-2">
            {[
              { key: 'cover', label: 'Capa', desc: 'Abertura' },
              { key: 'cta', label: 'CTA', desc: 'Fechamento' },
            ].map(({ key, label, desc }) => (
              <div
                key={key}
                className="flex-[0.5] flex flex-col items-center justify-between p-3 rounded-xl bg-white/3 border border-white/5 opacity-50"
              >
                 <div className="w-8 h-10 shrink-0 mb-3">{LAYOUT_ICONS[key]}</div>
                 <div className="text-center w-full">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">{label}</p>
                    <p className="text-[8px] text-zinc-600 mb-2">{desc}</p>
                    <div className="w-full flex justify-between items-center text-[10px] font-mono border-t border-white/5 pt-1">
                       <span className="text-zinc-600">FX</span>
                       <span className="text-zinc-500 font-bold">1</span>
                    </div>
                 </div>
              </div>
            ))}
          </div>

          {/* Divisor com label do miolo */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-surface-input/50" />
            <span className="text-[9px] uppercase tracking-widest text-zinc-600 font-bold">
              Miolo ({mioloCount} slides)
            </span>
            <div className="flex-1 h-px bg-surface-input/50" />
          </div>

          {/* Layouts editáveis do miolo */}
          <div className="grid grid-cols-2 gap-2">
            {MIOLO_LAYOUTS.map(({ key, label, description }) => {
              const qty = layoutSelection.layouts?.[key] ?? 0;
              return (
                <div
                  key={key}
                  className="flex flex-col gap-3 p-3 rounded-xl bg-surface-input border border-border-subtle group hover:border-border-hover transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-10 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
                      {LAYOUT_ICONS[key]}
                    </div>
                    <div className="flex-1 flex flex-col pt-0.5">
                      <span className="text-[9px] font-bold text-zinc-300 uppercase tracking-widest leading-none mb-1.5">
                        {label}
                      </span>
                      <span className="text-[8px] text-zinc-500 leading-snug line-clamp-2" title={description}>
                        {description}
                      </span>
                    </div>
                  </div>

                  {/* Stepper compacto */}
                  <div className="flex items-center justify-between mt-auto border-t border-white/5 pt-2">
                    <span className="text-[9px] font-mono text-zinc-600 tracking-widest">QTD</span>
                    <div className="flex items-center gap-1 bg-black/20 rounded-md p-0.5 border border-white/5">
                      <button
                        onClick={() => setQty(key, qty - 1)}
                        disabled={qty === 0}
                        className="w-5 h-5 flex items-center justify-center rounded-md bg-surface-input/50 hover:bg-surface-input/50 text-zinc-400 hover:text-white text-xs font-bold disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                      >
                        −
                      </button>
                      <span className="w-5 text-center text-[10px] font-mono text-white">{qty}</span>
                      <button
                        onClick={() => setQty(key, qty + 1)}
                        className="w-5 h-5 flex items-center justify-center rounded-md bg-surface-input/50 hover:bg-surface-input/50 text-zinc-400 hover:text-white text-xs font-bold transition-colors"
                      >
                        +
                      </button>
                    </div>
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

      {/* Modo Injeção Direta */}
      {layoutSelection.mode === 'direct' && (
        <div className="flex flex-col gap-3 mt-1 animate-in fade-in">
          <p className="text-[10px] text-zinc-500 text-center leading-relaxed px-1">
            Selecione o layout alvo e insira seu texto manualmente. Adicionaremos este slide gerado pela IA ao fim do Carrossel.
          </p>

          {/* Grid Simplificado de Seleção */}
          <div className="grid grid-cols-4 sm:grid-cols-4 gap-2">
            {LAYOUT_META.map((meta) => {
              const Icon = LAYOUT_ICONS[meta.key];
              const isSelected = directLayout === meta.key;
              return (
                <div key={meta.key} className="flex flex-col items-center gap-1">
                  <div
                    onClick={() => setDirectLayout(meta.key)}
                    className={`w-full aspect-[3/4] rounded-lg p-3 flex items-center justify-center cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-brand/10 border-brand/50 shadow-[0_0_15px_-3px_rgba(var(--brand-rgb),0.3)]'
                        : 'bg-surface-input border-border-subtle hover:border-white/20'
                    }`}
                  >
                    <div className={`w-full h-full flex items-center justify-center opacity-80 ${isSelected ? 'opacity-100' : 'opacity-60'} transition-opacity`}>
                       {Icon}
                    </div>
                  </div>
                  <span className={`text-[8px] uppercase tracking-widest font-bold truncate w-full text-center ${isSelected ? 'text-white' : 'text-zinc-500'}`}>
                    {meta.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col border border-border-subtle focus-within:border-brand/40 bg-surface-input rounded-xl overflow-hidden transition-colors mt-2">
            <textarea
              className="w-full h-24 bg-transparent resize-none outline-none p-3 text-xs text-white placeholder:text-zinc-600 focus:placeholder:text-zinc-500 transition-colors"
              placeholder="Cole seu texto aqui e a IA fará a formatação mágica para o layout escolhido..."
              value={directText}
              onChange={(e) => setDirectText(e.target.value)}
            />
            <div className="p-2 border-t border-border-subtle bg-black/20 flex justify-end">
              <button
                onClick={() => onInjectSlide && onInjectSlide(directText, directLayout, () => setDirectText(''))}
                disabled={!directText.trim() || isInjecting}
                className="flex items-center gap-2 px-4 py-2 bg-brand hover:bg-brand-hover text-white rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isInjecting ? (
                  <>
                    <div className="w-3 h-3 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                     <Sparkles className="w-3 h-3" />
                     Injetar Slide
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modo Favoritos */}
      {layoutSelection.mode === 'favorites' && (
        <div className="flex flex-col gap-3 mt-1">
           {favorites.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-6 bg-surface-input/50 rounded-xl border border-white/10 text-center gap-3">
                 <Star className="w-6 h-6 text-yellow-500/30" />
                 <p className="text-[10px] text-zinc-500">Você ainda não favoritou nenhum slide. Utilize a estrela amarela na visualização para salvar seus favoritos.</p>
              </div>
           ) : (
              <div className="grid grid-cols-2 gap-2">
                 {favorites.map(fav => (
                    <div key={fav.id} className="relative group flex flex-col bg-surface-input border border-border-subtle rounded-xl overflow-hidden hover:border-border-hover transition-colors">
                       <div 
                         className="h-20 bg-cover bg-center w-full"
                         style={{ backgroundImage: fav.slideData.imageUrl ? `url(${fav.slideData.imageUrl})` : 'none', backgroundColor: '#18181b' }}
                       >
                         {!fav.slideData.imageUrl && (
                           <div className="w-full h-full flex items-center justify-center text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                             {fav.slideData.layout}
                           </div>
                         )}
                       </div>
                       
                       <div className="p-2 border-t border-white/5 bg-zinc-950/40">
                         <span className="text-[9px] uppercase text-zinc-400 tracking-widest block text-center truncate">
                            {fav.slideData.customFavoriteName || fav.slideData.title || fav.slideData.text || 'Favorito'}
                         </span>
                       </div>

                       {/* Hover Overlay */}
                       <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                         <button 
                            onClick={(e) => { e.preventDefault(); onUseFavorite && onUseFavorite(fav.slideData); }}
                            className="bg-emerald-600/20 text-emerald-500 hover:bg-emerald-500 hover:text-white p-2 rounded-full transition-colors border border-emerald-500/30 font-bold"
                            title="Inserir Slide Canvas"
                         >
                           <Plus className="w-4 h-4" />
                         </button>
                         <button 
                            onClick={(e) => { e.preventDefault(); onRemoveFavorite && onRemoveFavorite(fav.id); }}
                            className="bg-red-950/40 text-red-500 hover:bg-red-600 hover:text-white p-2 rounded-full transition-colors border border-red-500/30"
                            title="Remover Favorito"
                         >
                           <X className="w-4 h-4" />
                         </button>
                       </div>
                    </div>
                 ))}
              </div>
           )}
        </div>
      )}
    </div>
  );
}

