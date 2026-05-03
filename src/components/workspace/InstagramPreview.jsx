import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  Home,
  Search,
  PlusSquare,
  Clapperboard
} from 'lucide-react';
import { cn } from '../../lib/utils';
import SlideRenderer from '../slide-renderer';

/**
 * InstagramPreview — Visualizador de posts/carrosséis do Instagram de altíssima fidelidade.
 * Baseado nas instruções do guia "Visualizador Instagram Premium (Mockup iPhone)".
 */
export default function InstagramPreview({ 
  isOpen, 
  onClose, 
  slides, 
  brandHandle, 
  brandAvatar, 
  isVerified,
  brandColor,
  brandLogo,
  showBrandHandle,
  showBrandLogo,
  titleScale,
  textScale,
  titleFont,
  textFont,
  tagFont,
  showSlideCounter,
  slideCounterPosition
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [clock, setClock] = useState('9:41');
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showBigHeart, setShowBigHeart] = useState(false);
  const [lastTap, setLastTap] = useState(0);
  
  const scrollRef = useRef(null);
  const heartTimeoutRef = useRef(null);

  // Atualização do Relógio (Simulando iOS)
  useEffect(() => {
    const updateTime = () => {
      const timeStr = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      setClock(timeStr);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Resetar estados ao abrir
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setIsLiked(false);
      setIsBookmarked(false);
      if (scrollRef.current) scrollRef.current.scrollLeft = 0;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const width = e.target.offsetWidth;
    if (width > 0) {
      const index = Math.round(scrollLeft / width);
      if (index !== currentIndex) {
        setCurrentIndex(index);
      }
    }
  };

  const scrollTo = (index) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * scrollRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleDoubleTap = () => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;

    if (tapLength < 300 && tapLength > 0) {
      // Double Tap detected
      setShowBigHeart(false);
      // Trigger reflow for animation
      setTimeout(() => {
        setShowBigHeart(true);
        if (!isLiked) setIsLiked(true);
        
        if (heartTimeoutRef.current) clearTimeout(heartTimeoutRef.current);
        heartTimeoutRef.current = setTimeout(() => setShowBigHeart(false), 800);
      }, 10);
      setLastTap(0);
    } else {
      setLastTap(currentTime);
    }
  };

  return (
    <div className="fixed inset-0 z-[20000] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-300 p-4 overflow-hidden">
      {/* Botão de Fechar Superior */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-3 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all z-[20100]"
        title="Fechar Pré-visualização"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Container Centralizado para iPhone e Controles Externos */}
      <div className="relative flex items-center justify-center w-full h-full max-h-screen gap-4 lg:gap-8">
        
        {/* Setas de Navegação Externas - Esquerda */}
        {slides.length > 1 && (
          <button 
            onClick={() => scrollTo(currentIndex - 1)}
            disabled={currentIndex === 0}
            className={cn(
                "p-3 bg-white/5 hover:bg-white/10 text-white rounded-full border border-white/10 backdrop-blur-md transition-all z-[20050] hidden md:flex active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed",
                currentIndex === 0 && "cursor-default"
            )}
            title="Slide Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* iPhone Chassis (Proporções exatas: 400x850) */}
        <div 
          className="relative scale-[0.6] sm:scale-[0.8] lg:scale-[0.9] xl:scale-100 transition-transform duration-500 shrink-0"
          style={{
            width: '400px',
            height: '850px',
            background: '#000',
            borderRadius: '60px',
            boxShadow: '0 0 0 2px #333, 0 0 0 6px #1a1a1a, 0 0 0 8px #000, 0 40px 80px rgba(0,0,0,0.5), inset 0 0 10px rgba(255,255,255,0.1)',
            padding: '12px'
          }}
        >
          {/* Dynamic Island */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-[20px] z-50 flex items-center justify-between px-3 shadow-[inset_0_0_2px_rgba(255,255,255,0.2)]">
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-800 border-[0.5px] border-neutral-700"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] opacity-0"></div>
          </div>

          {/* iPhone Screen Content */}
          <div className="w-full h-full bg-white rounded-[48px] overflow-hidden relative flex flex-col shadow-[inset_0_0_0_2px_#000]">
            
            {/* Status Bar */}
            <div className="h-[54px] pt-2.5 px-6 flex justify-between items-center text-[15px] font-semibold text-black z-40 relative">
              <span className="tracking-tight ml-2">{clock}</span>
              <div className="flex gap-1.5 items-center mr-1">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                  <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                  <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                  <line x1="12" y1="20" x2="12.01" y2="20"></line>
                </svg>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12h4l2-9 4 18 2-9h4"></path>
                  <path d="M21 12h-4l-2 9-4-18-2 9H3"></path>
                </svg>
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"></path>
                  <path d="M21 10h1v4h-1z"></path>
                </svg>
              </div>
            </div>

            {/* Main App Area */}
            <div className="flex-1 overflow-y-auto hide-scrollbar bg-white relative pb-20 select-none">
              
              {/* IG Header */}
              <div className="flex justify-between items-center px-4 py-2 sticky top-0 bg-white/95 backdrop-blur z-30">
                <div className="text-xl font-bold tracking-tight flex items-center gap-1 cursor-pointer">
                  Workspace
                  <ChevronLeft className="w-4 h-4 mt-1 rotate-[-90deg]" />
                </div>
                <div className="flex gap-5 items-center">
                  <Heart className="w-6 h-6" />
                  <div className="relative">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Post Article */}
              <article className="mt-2">
                {/* Post Header */}
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 cursor-pointer hover:scale-105 transition-transform">
                      <div className="bg-white p-[2px] rounded-full">
                        {brandAvatar ? (
                          <img src={brandAvatar} className="w-8 h-8 rounded-full object-cover" alt="Profile" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-neutral-200" />
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <span className="text-[13px] font-semibold text-black cursor-pointer hover:text-neutral-600 lowercase tracking-tight">
                          {brandHandle?.replace(/\s+/g, '').toLowerCase() || 'seu.perfil'}
                        </span>
                        {isVerified && <BadgeCheck className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />}
                      </div>
                      <span className="text-[11px] text-neutral-500 font-medium -mt-0.5">Preview Criador</span>
                    </div>
                  </div>
                  <button className="p-2 hover:opacity-50 transition-opacity">
                    <MoreHorizontal className="w-5 h-5 text-black" />
                  </button>
                </div>

                {/* Content Area (Slides Carousel) */}
                <div 
                  className="relative w-full aspect-[4/5] bg-neutral-100 overflow-hidden"
                  onClick={handleDoubleTap}
                >
                  {/* Big Heart Animation */}
                  <Heart 
                    className={cn(
                      "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 text-white/90 fill-white/90 z-40 drop-shadow-[0_4px_15_rgba(0,0,0,0.3)] transition-all pointer-events-none scale-0 opacity-0",
                      showBigHeart && "animate-[like-pop_0.8s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]"
                    )}
                  />

                  {/* Slides Track */}
                  <div 
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar h-full"
                  >
                    {slides.map((slide, idx) => (
                      <div key={idx} className="min-w-full h-full snap-start flex items-center justify-center bg-white relative">
                          <div 
                            className="w-[400px] h-[500px] shrink-0 transform origin-center"
                            style={{ transform: 'scale(0.92)' }}
                          >
                             <SlideRenderer 
                                data={slide} 
                                index={idx + 1}
                                slideCount={slides.length}
                                brandHandle={brandHandle}
                                showBrandHandle={showBrandHandle}
                                brandAvatar={brandAvatar}
                                brandLogo={brandLogo}
                                showBrandLogo={showBrandLogo}
                                brandColor={brandColor}
                                isVerified={isVerified}
                                titleScale={titleScale}
                                textScale={textScale}
                                titleFont={titleFont}
                                textFont={textFont}
                                tagFont={tagFont}
                                showSlideCounter={showSlideCounter}
                                slideCounterPosition={slideCounterPosition}
                             />
                          </div>
                      </div>
                    ))}
                  </div>

                  {/* Carousel Indicator Overlay (Instagram style) */}
                  {slides.length > 1 && (
                    <div className="absolute top-3.5 right-3.5 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-full text-white text-[10px] font-bold tracking-widest z-20">
                      {currentIndex + 1}/{slides.length}
                    </div>
                  )}
                </div>

                {/* Engagement Controls */}
                <div className="flex justify-between items-center px-3 py-2 mt-1">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setIsLiked(!isLiked)}
                      className="hover:opacity-50 transition-transform active:scale-90 text-black"
                    >
                      <Heart className={cn("w-[26px] h-[26px]", isLiked ? "fill-red-500 text-red-500 animate-[heart-pop_0.45s_cubic-bezier(0.175,0.885,0.32,1.275)]" : "text-black")} />
                    </button>
                    <button className="hover:opacity-50 transition-transform active:scale-90 text-black">
                      <MessageCircle className="w-[24px] h-[24px]" />
                    </button>
                    <button className="hover:opacity-50 transition-transform active:scale-90 text-black">
                      <Send className="w-[24px] h-[24px]" />
                    </button>
                  </div>
                  
                  {/* Dots Pagination */}
                  {slides.length > 1 && (
                    <div className="flex gap-1.5 items-center justify-center flex-1 pr-6">
                      {slides.map((_, idx) => (
                        <div 
                          key={idx}
                          className={cn(
                            "w-1.5 h-1.5 rounded-full transition-colors duration-300",
                            idx === currentIndex ? "bg-blue-500" : "bg-neutral-300"
                          )}
                        />
                      ))}
                    </div>
                  )}
                  
                  <button 
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className="hover:opacity-50 transition-transform active:scale-90 text-black"
                  >
                    <Bookmark className={cn("w-[24px] h-[24px]", isBookmarked ? "fill-black" : "text-black")} />
                  </button>
                  </div>

                  {/* Likes Stack Section */}
                  <div className="px-3 py-1 flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                    <div className="w-[18px] h-[18px] rounded-full border border-white bg-neutral-200 overflow-hidden shrink-0">
                      <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop" className="w-full h-full object-cover" alt="User 1" />
                    </div>
                    <div className="w-[18px] h-[18px] rounded-full border border-white bg-neutral-300 overflow-hidden shrink-0">
                      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop" className="w-full h-full object-cover" alt="User 2" />
                    </div>
                    <div className="w-[18px] h-[18px] rounded-full border border-white bg-neutral-400 overflow-hidden shrink-0">
                      <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=50&h=50&fit=crop" className="w-full h-full object-cover" alt="User 3" />
                    </div>
                  </div>
                  <span className="text-[13px] font-medium tracking-tight text-black">
                    Curtido por <span className="font-bold">gustavo.design</span> e <span className="font-bold">outras pessoas</span>
                  </span>
                  </div>

                  {/* Caption Section */}
                  <div className="px-3 pb-4">
                    <div className="text-[13px] leading-[18px]">
                      <span className="font-bold mr-1 cursor-pointer lowercase text-black">{brandHandle?.replace(/\s+/g, '').toLowerCase() || 'seu.perfil'}</span>
                      <span className="text-neutral-800">
                         Transforme seu conhecimento em carrosséis incríveis com o Carrossel Studio! ✨🚀 
                         Arraste para o lado e veja como ficou esse design. #marketing #design #socialmedia
                      </span>
                    </div>
                  <div className="text-[12px] text-zinc-500 font-medium mt-1 cursor-pointer">Ver todos os 42 comentários</div>
                  <div className="text-[10px] text-neutral-400 uppercase tracking-tighter mt-1 font-medium">Há 2 horas</div>
                </div>
              </article>

              <div className="h-6"></div>
            </div>

            {/* Bottom App Navigation (Tab Bar) */}
            <div className="absolute bottom-0 w-full h-[85px] bg-white/85 backdrop-blur-[20px] border-t border-black/10 flex justify-between px-8 pt-3 pb-8 z-40 text-black/90">
               <button className="hover:scale-110 transition-transform"><Home className="w-6 h-6 fill-current" /></button>
               <button className="hover:scale-110 transition-transform"><Search className="w-6 h-6" /></button>
               <button className="hover:scale-110 transition-transform"><PlusSquare className="w-6 h-6" /></button>
               <button className="hover:scale-110 transition-transform"><Clapperboard className="w-6 h-6" /></button>
               <button className="hover:scale-110 transition-transform">
                  <div className="w-7 h-7 rounded-full bg-neutral-200 border border-black/5 overflow-hidden flex items-center justify-center">
                      {brandAvatar ? (
                          <img src={brandAvatar} className="w-full h-full object-cover" alt="User" />
                      ) : (
                          <div className="w-full h-full bg-neutral-300" />
                      )}
                  </div>
               </button>
            </div>
            
            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-black rounded-full z-50"></div>
          </div>
        </div>

        {/* Setas de Navegação Externas - Direita */}
        {slides.length > 1 && (
          <button 
            onClick={() => scrollTo(currentIndex + 1)}
            disabled={currentIndex === slides.length - 1}
            className={cn(
                "p-3 bg-white/5 hover:bg-white/10 text-white rounded-full border border-white/10 backdrop-blur-md transition-all z-[20050] hidden md:flex active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed",
                currentIndex === slides.length - 1 && "cursor-default"
            )}
            title="Próximo Slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Texto de Ajuda (Posicionado no rodapé da tela) */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-max text-center hidden sm:block z-[20100]">
            <div className="text-white/30 text-[10px] font-bold tracking-[0.2em] uppercase">
                {slides.length > 1 
                  ? "Modo Carrossel • Utilize as setas laterais para navegar" 
                  : "Post Único • Visualização de Alta Fidelidade"}
            </div>
        </div>

      </div>

      {/* Estilos customizados para animações e scroll */}
      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes like-pop {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
            15% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
            30% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            70% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
        }

        @keyframes heart-pop {
            0% { transform: scale(1); }
            25% { transform: scale(1.2); }
            50% { transform: scale(0.95); }
            100% { transform: scale(1); }
        }
      `}} />
    </div>
  );
}
