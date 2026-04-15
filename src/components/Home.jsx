import React, { useState, useEffect } from 'react';
import { 
  Home as HomeIcon,
  LayoutGrid,
  Sparkles,
  Image as ImageIcon,
  Settings,
  Plus,
  Clock,
  ArrowRight,
  Activity,
  Layers,
  ChevronRight,
  Play
} from 'lucide-react';

/**
 * @name Typewriter
 * @description Efeito de escrita premium.
 */
const Typewriter = ({ phrases }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === phrases[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2500);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % phrases.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 30 : 60);
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, phrases]);

  return (
    <span className="inline-flex items-center">
      <span className="text-[#DE1E4D] font-bold text-sm tracking-widest uppercase">
        {phrases[index].substring(0, subIndex)}
      </span>
      <span className="ml-1 w-[2px] h-4 bg-[#FFFFFF] animate-pulse" />
    </span>
  );
};

export default function Home({ onStartProject }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const internalSlogans = [
    "Sincronizado com os guias da marca.",
    "Bancos de dados de copy carregados.",
    "Sistema de aprovação pronto.",
    "Otimizando fluxo de produção..."
  ];

  const recentProjects = [
    { title: "Lançamento Dark", slides: 8, tag: "Template", delay: "0" },
    { title: "Oferta Expressa", slides: 3, tag: "Recente", delay: "100" },
    { title: "Dicas de UX/UI", slides: 10, tag: "Conceito", delay: "200" },
    { title: "Manifesto da Marca", slides: 5, tag: "Rascunho", delay: "300" }
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#050505] text-[#FFFFFF] font-sans selection:bg-[#DE1E4D]/30 relative w-full overflow-hidden">


      
      {/* Background Ambience */}
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-[#DE1E4D]/10 blur-[200px] pointer-events-none rounded-full" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#DE1E4D]/5 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden relative z-10 scroll-smooth">
        <div className="min-h-full flex flex-col p-8 lg:p-12 xl:p-16 max-w-[1600px] mx-auto gap-12">
          
          {/* Top Bar - Data & Status */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 animate-fade-in-down">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-[#FFFFFF]/40 text-[10px] font-bold tracking-[0.2em] uppercase mb-1">
                  {currentTime.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </p>
                <h2 className="text-[#FFFFFF]/90 text-sm font-medium tracking-wide">
                  Bem-vindo de volta, <span className="text-[#FFFFFF] font-bold">Criador.</span>
                </h2>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2 bg-[#111111]/80 backdrop-blur-md border border-[#FFFFFF]/10 rounded-full shadow-inner">
                <Activity size={14} className="text-[#DE1E4D] animate-pulse" />
                <span className="text-[10px] font-bold tracking-widest text-[#FFFFFF]/70 uppercase">Sistema Operacional</span>
                <div className="h-4 w-px bg-[#FFFFFF]/20" />
                <span className="text-[#DE1E4D] text-[10px] font-black">TM</span>
              </div>
            </div>
          </header>

          {/* Imposing Title */}
          <div className="w-full relative">
            <h1 className="text-[50px] md:text-[70px] font-black text-[#FFFFFF] tracking-tighter uppercase leading-none whitespace-nowrap overflow-hidden text-ellipsis drop-shadow-2xl">
              CARROSSEL <span className="text-[#DE1E4D]">STUDIO</span>.
            </h1>
            <div className="mt-6 flex items-center gap-4 border-b border-[#FFFFFF]/10 pb-8">
               <Typewriter phrases={internalSlogans} />
            </div>
          </div>

          {/* Mantra & Hero CTA */}
          <section className="relative w-full rounded-[2rem] bg-gradient-to-br from-[#1A1A1A] to-[#050505] border border-[#FFFFFF]/10 overflow-hidden group p-10 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl">
            {/* Efeitos decorativos do Hero */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#DE1E4D]/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-50 group-hover:opacity-80 transition-opacity duration-150" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />

            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#DE1E4D]/10 border border-[#DE1E4D]/30 rounded-full mb-8">
                <Sparkles size={12} className="text-[#DE1E4D]" />
                <span className="text-[#DE1E4D] text-[9px] font-bold tracking-[0.2em] uppercase">Mantra Operacional</span>
              </div>
              
              <h3 className="text-4xl lg:text-5xl font-black text-[#FFFFFF] tracking-tighter uppercase leading-[1.1] mb-6">
                Nunca Comece<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DE1E4D] to-[#FF4D79]">Do Zero.</span>
              </h3>
              
              <p className="text-[#FFFFFF]/50 text-base lg:text-lg font-light leading-relaxed max-w-xl">
                Utilize os templates da marca, injete a inteligência artificial para adaptação de copy e pule direto para a finalização e exportação. <strong className="text-[#FFFFFF] font-medium">Produtividade é lucro.</strong>
              </p>
            </div>

            <div className="relative z-10 shrink-0 w-full lg:w-auto flex flex-col items-center gap-4">
              <button 
                onClick={onStartProject}
                className="w-full lg:w-[280px] group/btn relative overflow-hidden bg-[#FFFFFF] text-[#000000] px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all duration-150 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <Play size={16} className="fill-black" />
                  Novo Projeto no Studio
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#DE1E4D] to-[#8A1230] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-150 z-0" />
                <span className="absolute z-10 inset-0 flex items-center justify-center gap-3 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-150 text-white">
                  <Play size={16} className="fill-white" />
                  Iniciar Criação
                </span>
              </button>
            </div>
          </section>

          {/* Showcase / Projetos Recentes (Visual Cards) */}
          <section className="space-y-8">
            <div className="flex justify-between items-end px-2 border-b border-[#FFFFFF]/5 pb-4">
              <div>
                <h3 className="text-2xl font-black text-[#FFFFFF] tracking-tighter uppercase">Capacidade <span className="text-[#DE1E4D]">Criativa</span></h3>
                <p className="text-[#FFFFFF]/40 text-xs mt-1 font-light">Explorador de templates e designs recentes.</p>
              </div>
              <button className="group flex items-center gap-2 text-[#FFFFFF]/40 hover:text-[#DE1E4D] text-[10px] font-bold uppercase tracking-widest transition-colors">
                Ver Galeria Completa
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Horizontal Scroll de Cards 4:5 */}
            <div className="flex gap-8 overflow-x-auto pb-12 pt-4 px-2 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
              
              {recentProjects.map((item, idx) => (
                <div 
                  key={idx} 
                  className="snap-center shrink-0 w-[280px] lg:w-[320px] group cursor-pointer"
                  style={{ animationDelay: `${item.delay}ms` }}
                  onClick={onStartProject}
                >
                  {/* Card 4:5 Container */}
                  <div className="relative aspect-[4/5] rounded-3xl bg-[#0A0A0A] border border-[#FFFFFF]/10 overflow-hidden mb-6 group-hover:border-[#DE1E4D]/50 transition-colors duration-150 shadow-2xl">
                    
                    {/* Fake Slides flutuando dentro do card */}
                    <div className="absolute inset-0 flex items-center justify-center p-8 perspective-[1000px]">
                      {/* Slide Fundo */}
                      <div className="absolute w-3/4 h-3/4 bg-[#1A1A1A] rounded-xl border border-[#FFFFFF]/5 shadow-xl -rotate-6 translate-x-4 opacity-50 group-hover:-rotate-12 group-hover:translate-x-8 transition-all duration-150" />
                      
                      {/* Slide Meio */}
                      <div className="absolute w-3/4 h-3/4 bg-[#222222] rounded-xl border border-[#FFFFFF]/10 shadow-xl rotate-3 -translate-x-2 opacity-80 group-hover:rotate-6 group-hover:-translate-x-6 transition-all duration-150" />
                      
                      {/* Slide Principal/Frente */}
                      <div className="absolute w-3/4 h-3/4 bg-gradient-to-br from-[#333333] to-[#111111] rounded-xl border border-[#FFFFFF]/20 shadow-2xl z-10 flex flex-col p-4 group-hover:scale-105 transition-all duration-150">
                        {/* Simulação de conteúdo do slide */}
                        <div className="w-8 h-8 bg-[#DE1E4D]/20 rounded-full mb-auto flex items-center justify-center">
                           <LayoutGrid size={12} className="text-[#DE1E4D]" />
                        </div>
                        <div className="space-y-2 w-full">
                          <div className="h-2 w-3/4 bg-[#FFFFFF]/20 rounded-full" />
                          <div className="h-2 w-1/2 bg-[#FFFFFF]/10 rounded-full" />
                          <div className="h-8 w-full bg-[#DE1E4D]/10 rounded-lg mt-4 border border-[#DE1E4D]/20" />
                        </div>
                      </div>
                    </div>

                    {/* Overlay de Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#DE1E4D]/90 via-[#DE1E4D]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex flex-col justify-end p-6 z-20">
                      <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-150">
                        <button className="w-full py-3 bg-[#FFFFFF] text-[#000000] rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2">
                          <Plus size={14} /> Abrir no Studio
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Info do Card */}
                  <div className="flex justify-between items-start px-2">
                    <div>
                      <h4 className="text-[#FFFFFF] font-bold text-base tracking-tight mb-1">{item.title}</h4>
                      <p className="text-[#FFFFFF]/40 text-[10px] font-bold tracking-widest uppercase flex items-center gap-2">
                        <Layers size={10} /> {item.slides} Slides
                      </p>
                    </div>
                    <span className="px-2 py-1 rounded bg-[#222222] border border-[#FFFFFF]/5 text-[9px] font-bold uppercase tracking-wider text-[#FFFFFF]/60">
                      {item.tag}
                    </span>
                  </div>
                </div>
              ))}
              
              {/* Card Extra para Criar do Zero */}
              <div 
                className="snap-center shrink-0 w-[280px] lg:w-[320px] group cursor-pointer flex flex-col justify-center"
                onClick={onStartProject}
              >
                 <div className="relative aspect-[4/5] rounded-3xl border-2 border-dashed border-[#FFFFFF]/10 flex flex-col items-center justify-center gap-4 hover:border-[#DE1E4D]/50 hover:bg-[#DE1E4D]/5 transition-all duration-150 mb-6">
                    <div className="w-16 h-16 rounded-full bg-[#222222] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#DE1E4D] transition-all duration-150">
                      <Plus size={24} className="text-[#FFFFFF]" />
                    </div>
                    <span className="text-[#FFFFFF]/50 text-xs font-bold uppercase tracking-widest group-hover:text-[#FFFFFF]">Criar Avulso</span>
                 </div>
              </div>

            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

