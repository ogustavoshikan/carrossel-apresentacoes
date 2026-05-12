import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
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
const Typewriter = ({ phrases, brandColor }) => {
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
      <span className="font-bold text-sm tracking-widest uppercase" style={{ color: brandColor }}>
        {phrases[index].substring(0, subIndex)}
      </span>
      <span className="ml-1 w-[2px] h-4 bg-white animate-pulse" />
    </span>
  );
};

/** Converte hex + alpha em rgba para usar em inline styles */
const hexToRgba = (hex, alpha) => {
  if (!hex || hex.length < 7) return `rgba(222, 30, 77, ${alpha})`;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/**
 * @name HeroCarousel
 * @description Carrossel automático 3D premium para exibir designs recentes na Home.
 */
const HeroCarousel = ({ brandColor = '#DE1E4D' }) => {
  const images = [
    "https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/TIAJOANABRIGADEIROS_slide_1%20(10).png",
    "https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/TIAJOANABRIGADEIROS_slide_1%20(7).png",
    "https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/TIAJOANABRIGADEIROS_slide_1%20(5).png"
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full max-w-[300px] lg:max-w-[340px] aspect-[4/5]" style={{ perspective: '1200px' }}>
      {images.map((src, index) => {
        let offset = index - activeIndex;
        if (offset < 0) offset += images.length;

        return (
          <div
            key={index}
            className="absolute inset-0 rounded-[2rem] overflow-hidden border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] origin-bottom-right"
            style={{
              transform: `
                translateX(${offset === 0 ? 0 : offset === 1 ? 40 : 20}px)
                translateY(${offset === 0 ? 0 : offset === 1 ? -20 : -40}px)
                translateZ(${offset * -100}px)
                rotate(${offset === 0 ? 0 : offset === 1 ? 6 : -3}deg)
              `,
              zIndex: 30 - offset,
              opacity: offset === 2 ? 0.4 : 1,
              filter: `blur(${offset === 0 ? 0 : offset * 2}px)`
            }}
          >
            <img src={src} alt={`Template Visual Preview ${index + 1}`} className="w-full h-full object-cover" />
            <div
              className="absolute inset-0 bg-black transition-opacity duration-1000"
              style={{ opacity: offset === 0 ? 0 : 0.4 }}
            />
          </div>
        );
      })}
      <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full blur-[40px] pointer-events-none" style={{ backgroundColor: hexToRgba(brandColor, 0.30) }} />
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[40px] pointer-events-none" style={{ backgroundColor: 'rgba(255,255,255,0.10)' }} />
    </div>
  );
};

export default function Home({ onStartProject, brandColor = '#DE1E4D' }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [galleryBtnHovered, setGalleryBtnHovered] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [createCardHovered, setCreateCardHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const internalSlogans = [
    "Sua autoridade visual automatizada.",
    "Crie carrosséis em menos de 1 minuto.",
    "Posts prontos com um único comando.",
    "Design de alta performance para o Instagram."
  ];

  const recentProjects = [
    { title: "Designs de Capa", slides: 46, tag: "Cover", delay: "0", image: "https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/TIAJOANABRIGADEIROS_slide_1%20(10).png", imageMiddle: "https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/TIAJOANABRIGADEIROS_slide_1%20(7).png", imageBack: "https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/TIAJOANABRIGADEIROS_slide_1%20(5).png" },
    { title: "Content Split", slides: 31, tag: "Split", delay: "100", image: "https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/layout2_image1.png", imageMiddle: "https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/layout2_image2.png", imageBack: "https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/layout2_image3.png" },
    { title: "Listas Criativas", slides: 30, tag: "Lista", delay: "200", image: "https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/layout3_image1_oficial.png", imageMiddle: "https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/layout3_image2.png", imageBack: "https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/layout3_image3.png" },
    { title: "Layouts de CTA", slides: 18, tag: "CTA", delay: "300", image: "https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Layout4_image1.png", imageMiddle: "https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/layout4_image2.png", imageBack: "https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/layout4_image3.png" }
  ];

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 text-white font-sans selection:bg-[color:var(--color-brand)]/30 relative w-full overflow-hidden">


      
      {/* Background Ambience */}
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] blur-[200px] pointer-events-none rounded-full" style={{ backgroundColor: hexToRgba(brandColor, 0.10) }} />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] blur-[150px] pointer-events-none rounded-full" style={{ backgroundColor: hexToRgba(brandColor, 0.05) }} />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PScwIDAgMjAwIDIwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48ZmlsdGVyIGlkPSduJz48ZmVUdXJidWxlbmNlIHR5cGU9J2ZyYWN0YWxOb2lzZScgYmFzZUZyZXF1ZW5jeT0nMC42NScgbnVtT2N0YXZlcz0nMycgc3RpdGNoVGlsZXM9J3N0aXRjaCcvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbHRlcj0ndXJsKCNuKScvPjwvc3ZnPg==')] opacity-20 pointer-events-none mix-blend-overlay" />

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden relative z-10 scroll-smooth">
        <div className="min-h-full flex flex-col pt-4 px-8 pb-8 lg:pt-6 lg:px-12 lg:pb-12 xl:pt-8 xl:px-16 xl:pb-16 max-w-[1600px] mx-auto gap-12">
          
          {/* Top Bar - Data & Status */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 animate-fade-in-down">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase mb-1">
                  {currentTime.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </p>
                <h2 className="text-white/90 text-sm font-medium tracking-wide">
                  Bem-vindo de volta, <span className="text-white font-bold">Criador.</span>
                </h2>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2 bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-full shadow-inner">
                <Activity size={14} className="animate-pulse" style={{ color: brandColor }} />
                <span className="text-[10px] font-bold tracking-widest text-white/70 uppercase">Sistema Operacional</span>
                <div className="h-4 w-px bg-white/20" />
                <span className="text-[10px] font-black" style={{ color: brandColor }}>TM</span>
              </div>
            </div>
          </header>

          {/* Imposing Title */}
          <div className="w-full relative">
            <h1 
              className="text-[50px] md:text-[70px] font-black text-white tracking-tighter uppercase leading-none whitespace-nowrap overflow-hidden text-ellipsis"
            >
              CARROSSEL <span style={{ color: brandColor }}>STUDIO</span>.
            </h1>
            <div className="mt-6 flex items-center gap-4 border-b border-white/10 pb-8">
               <Typewriter phrases={internalSlogans} brandColor={brandColor} />
            </div>
          </div>

          {/* Mantra & Hero Carousel Section */}
          <section className="relative w-full rounded-[2rem] bg-black/50 border border-white/10 backdrop-blur-md overflow-hidden group p-10 lg:p-16">
            {/* Efeitos decorativos do Hero */}
            <div
              className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-50 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none"
              style={{ background: `radial-gradient(circle, ${hexToRgba(brandColor, 0.20)} 0%, transparent 70%)` }}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Esquerda: Texto e Call to Action */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-8"
                  style={{ backgroundColor: hexToRgba(brandColor, 0.10), border: `1px solid ${hexToRgba(brandColor, 0.30)}` }}
                >
                  <Sparkles size={12} style={{ color: brandColor }} />
                  <span className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: brandColor }}>Mantra Operacional</span>
                </div>

                <h3 className="text-4xl lg:text-5xl font-black text-white tracking-tighter uppercase leading-[1.1] mb-6">
                  Nunca Comece<br />
                  <span style={{ color: brandColor }}>Do Zero.</span>
                </h3>

                <p className="text-white/50 text-base lg:text-lg font-light leading-relaxed max-w-xl">
                  Utilize os templates da marca, injete a inteligência artificial para adaptação de copy e pule direto para a finalização e exportação. <strong className="text-white font-medium">Produtividade é lucro.</strong>
                </p>

                {/* Botão reposicionado abaixo do texto */}
                <button
                  onClick={onStartProject}
                  className="mt-10 w-full lg:w-[280px] group/btn relative overflow-hidden bg-white text-black px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all duration-150"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3 group-hover/btn:text-white transition-colors duration-150">
                    <Play size={16} className="fill-black group-hover/btn:fill-white transition-colors duration-150" />
                    Novo Projeto no Studio
                  </span>
                  <div
                    className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-150 z-0"
                    style={{ backgroundColor: brandColor }}
                  />
                </button>
              </div>

              {/* Direita: Hero Carousel Automático 3D */}
              <div className="lg:col-span-5 flex justify-center w-full pr-8">
                <HeroCarousel brandColor={brandColor} />
              </div>

            </div>
          </section>

          {/* Showcase / Projetos Recentes (Visual Cards) */}
          <section className="space-y-8">
            <div className="flex justify-between items-end px-2 border-b border-white/5 pb-4">
              <div>
                <h3 className="text-2xl font-black text-white tracking-tighter uppercase">Capacidade <span style={{ color: brandColor }}>Criativa</span></h3>
                <p className="text-white/40 text-xs mt-1 font-light">Explorador de templates e designs recentes.</p>
              </div>
              <button
                className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors"
                style={{ color: galleryBtnHovered ? brandColor : 'rgba(255,255,255,0.40)' }}
                onMouseEnter={() => setGalleryBtnHovered(true)}
                onMouseLeave={() => setGalleryBtnHovered(false)}
                onClick={() => onStartProject('designs')}
              >
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
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Card 4:5 Container */}
                  <div
                    className="relative aspect-[4/5] rounded-3xl bg-black/50 backdrop-blur-md border overflow-hidden mb-6 transition-colors duration-150"
                    style={{ borderColor: hoveredCard === idx ? hexToRgba(brandColor, 0.50) : 'rgba(255,255,255,0.10)' }}
                  >
                    
                    {/* Fake Slides flutuando dentro do card */}
                    <div className="absolute inset-0 flex items-center justify-center p-8 perspective-[1000px]">
                      {/* Slide Fundo */}
                      <div className="absolute w-3/4 h-3/4 bg-[#1A1A1A] rounded-xl border border-[#FFFFFF]/5 shadow-xl -rotate-6 translate-x-4 opacity-50 group-hover:-rotate-12 group-hover:translate-x-8 transition-all duration-150 overflow-hidden">
                        {item.imageBack && (
                          <img src={item.imageBack} alt={`${item.title} Fundo`} className="w-full h-full object-cover" />
                        )}
                      </div>
                      
                      {/* Slide Meio */}
                      <div className="absolute w-3/4 h-3/4 bg-[#222222] rounded-xl border border-[#FFFFFF]/10 shadow-xl rotate-3 -translate-x-2 opacity-80 group-hover:rotate-6 group-hover:-translate-x-6 transition-all duration-150 overflow-hidden">
                        {item.imageMiddle && (
                          <img src={item.imageMiddle} alt={`${item.title} Meio`} className="w-full h-full object-cover" />
                        )}
                      </div>
                      
                      {/* Slide Principal/Frente */}
                      <div className={cn(
                        'absolute w-3/4 h-3/4 bg-gradient-to-br from-zinc-700 to-zinc-900 rounded-xl border border-white/20 z-10 flex flex-col group-hover:scale-105 transition-all duration-150 overflow-hidden',
                        !item.image && 'p-4'
                      )}>
                        {item.image ? (
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <>
                            {/* Simulação de conteúdo do slide */}
                            <div className="w-8 h-8 rounded-full mb-auto flex items-center justify-center" style={{ backgroundColor: hexToRgba(brandColor, 0.20) }}>
                               <LayoutGrid size={12} style={{ color: brandColor }} />
                            </div>
                            <div className="space-y-2 w-full">
                              <div className="h-2 w-3/4 bg-white/20 rounded-full" />
                              <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                              <div className="h-8 w-full rounded-lg mt-4" style={{ backgroundColor: hexToRgba(brandColor, 0.10), border: `1px solid ${hexToRgba(brandColor, 0.20)}` }} />
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Overlay de Hover */}
                    <div
                      className="absolute inset-0 transition-opacity duration-150 flex flex-col justify-end p-6 z-20"
                      style={{
                        background: `linear-gradient(to top, ${hexToRgba(brandColor, 0.90)}, ${hexToRgba(brandColor, 0.20)}, transparent)`,
                        opacity: hoveredCard === idx ? 1 : 0,
                      }}
                    >
                      <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-150">
                        <button className="w-full py-3 bg-white text-black rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2">
                          <Plus size={14} /> Abrir no Studio
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Info do Card */}
                  <div className="flex justify-between items-start px-2">
                    <div>
                      <h4 className="text-white font-bold text-base tracking-tight mb-1">{item.title}</h4>
                      <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase flex items-center gap-2">
                        <Layers size={10} /> {item.slides} Slides
                      </p>
                    </div>
                    <span className="px-2 py-1 rounded bg-zinc-900 border border-white/5 text-[9px] font-bold uppercase tracking-wider text-white/60">
                      {item.tag}
                    </span>
                  </div>
                </div>
              ))}
              
              {/* Card Extra para Criar do Zero */}
              <div 
                className="snap-center shrink-0 w-[280px] lg:w-[320px] group cursor-pointer flex flex-col justify-center"
                onClick={onStartProject}
                onMouseEnter={() => setCreateCardHovered(true)}
                onMouseLeave={() => setCreateCardHovered(false)}
              >
                 <div
                   className="relative aspect-[4/5] rounded-3xl bg-black/50 backdrop-blur-md border-2 border-dashed flex flex-col items-center justify-center gap-4 transition-all duration-150 mb-6"
                   style={{
                     borderColor: createCardHovered ? hexToRgba(brandColor, 0.50) : 'rgba(255,255,255,0.10)',
                     backgroundColor: createCardHovered ? hexToRgba(brandColor, 0.05) : '#00000075',
                   }}
                 >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-150"
                      style={{
                        backgroundColor: createCardHovered ? brandColor : '#222222',
                        transform: createCardHovered ? 'scale(1.1)' : 'scale(1)',
                      }}
                    >
                      <Plus size={24} className="text-white" />
                    </div>
                    <span
                      className="text-xs font-bold uppercase tracking-widest transition-colors"
                      style={{ color: createCardHovered ? '#FFFFFF' : 'rgba(255,255,255,0.50)' }}
                    >Novo Carrossel</span>
                 </div>
              </div>

            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
