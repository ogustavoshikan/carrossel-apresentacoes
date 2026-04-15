import React from 'react';
import { Sparkles, ArrowLeft } from 'lucide-react';

/**
 * @name ComingSoon
 * @description Tela centralizada para funcionalidades em desenvolvimento.
 */
const ComingSoon = ({ onBack, brandColor = '#DE1E4D', icon: Icon = Sparkles, label = "Em breve" }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#050505] relative overflow-hidden animate-page-transition">
      {/* Efeito de fundo */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none"
        style={{ backgroundColor: brandColor }}
      />
      
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <div 
          className="w-20 h-20 rounded-3xl flex items-center justify-center mb-8 shadow-lg border border-white/10"
          style={{ backgroundColor: `${brandColor}15` }}
        >
          <Icon size={40} style={{ color: brandColor }} />
        </div>
        
        <h2 className="text-4xl md:text-5xl font-outfit font-black uppercase tracking-tighter text-white mb-4">
          {label}<span style={{ color: brandColor }}>!</span>
        </h2>
        
        <p className="text-zinc-500 max-w-md text-sm md:text-base font-medium leading-relaxed mb-12">
          Estamos finalizando os ajustes desta funcionalidade premium para garantir a melhor experiência de criação para você.
        </p>
        
        <button
          onClick={onBack}
          className="flex items-center gap-3 px-8 py-4 bg-surface-input/30 hover:bg-surface-input/50 border border-white/10 rounded-2xl text-white font-bold uppercase tracking-widest text-xs transition-all hover:scale-105 active:scale-95 group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Voltar para o Studio
        </button>
      </div>
      
      {/* Grid decorativo */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
    </div>
  );
};

export default ComingSoon;
