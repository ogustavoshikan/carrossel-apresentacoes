import React from 'react';
import { Target, Loader2 } from 'lucide-react';

/**
 * EmptyState — Estado vazio ou loading do workspace.
 */
export function EmptyState({ brandColor }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-border-subtle rounded-3xl text-zinc-700">
      <Target className="w-16 h-16 mb-4 opacity-20" />
      <p className="font-outfit font-black uppercase tracking-widest text-xs">
        Waiting for prompt, Mr. Gustavo.
      </p>
    </div>
  );
}

/**
 * LoadingState — Estado de geração em andamento.
 */
export function LoadingState({ brandColor }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center border border-border-subtle rounded-3xl bg-surface-dark shadow-inner">
      <Loader2
        className="w-12 h-12 animate-spin mb-6"
        style={{ color: brandColor }}
      />
      <p className="font-outfit text-zinc-500 text-xs uppercase tracking-widest animate-pulse font-black">
        Alice is writing...
      </p>
    </div>
  );
}
