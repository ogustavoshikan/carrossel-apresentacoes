import React from 'react';
import { cn } from '../lib/utils';
import { 
  Home as HomeIcon,
  LayoutGrid,
  Sparkles,
  Image as ImageIcon,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

/**
 * @name SidebarItem
 * @description Item individual da barra lateral com estados de hover e active premium.
 */
const SidebarItem = ({ icon: Icon, label, isActive, onClick, brandColor }) => (
  <button 
    onClick={onClick}
    className="group flex flex-col items-center justify-center w-full relative py-3 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none"
  >
    <div 
      className={cn(
        'w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-150',
        isActive
          ? 'bg-gradient-to-br from-[#222222] to-[#111111] text-white shadow-lg border border-transparent'
          : 'bg-transparent text-white/40 hover:bg-white/5 hover:text-white border border-transparent'
      )}
    >
      <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
    </div>
    <span className={cn(
      "text-[9px] mt-2 font-bold tracking-[0.15em] transition-colors duration-150 uppercase",
      isActive ? "text-white" : "text-white/40 group-hover:text-white"
    )}>
      {label}
    </span>
  </button>
);

/**
 * @name GlobalSidebar
 * @description Barra lateral principal do ecossistema Carrossel Studio com suporte a recolhimento.
 */
const GlobalSidebar = ({ currentView, onNavigate, onOpenSettings, onComingSoon, comingSoonData, appLogoUrl, brandColor }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(() => {
    return localStorage.getItem('cs_sidebar_collapsed') === 'true';
  });

  const toggleCollapse = () => {
    setIsCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('cs_sidebar_collapsed', String(next));
      return next;
    });
  };

  return (
    <aside 
      className={cn(
        "border-r border-[#FFFFFF]/5 bg-[#000000]/95 flex flex-col items-center justify-between z-[200] relative h-full shrink-0 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-0 py-0 border-r-0" : "w-24 py-8"
      )}
    >
      {/* Botão de Recolher/Expandir posicionado fora do menu, no centro vertical da linha direita */}
      <button
        onClick={toggleCollapse}
        className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#111111] border border-[#FFFFFF]/15 flex items-center justify-center text-[#FFFFFF]/70 hover:text-white hover:bg-[#222222] shadow-lg transition-all duration-150 cursor-pointer z-[250] outline-none active:scale-90"
        title={isCollapsed ? "Expandir Menu" : "Recolher Menu"}
        style={{
          boxShadow: `0 0 10px rgba(0,0,0,0.5)`
        }}
      >
        {isCollapsed ? (
          <ChevronRight size={12} strokeWidth={2.5} />
        ) : (
          <ChevronLeft size={12} strokeWidth={2.5} />
        )}
      </button>

      {/* Conteúdo da Sidebar envolvido em contêiner de largura fixa com transição de opacidade */}
      <div 
        className={cn(
          "w-24 flex flex-col items-center justify-between h-full transition-all duration-300 ease-in-out",
          isCollapsed ? "opacity-0 pointer-events-none scale-90 w-0 overflow-hidden" : "opacity-100 scale-100"
        )}
      >
        {/* Logo / Home Trigger */}
        <div 
          onClick={() => onNavigate('home')}
          className="w-12 h-12 rounded-xl flex items-center justify-center font-outfit font-black text-xl tracking-tighter text-white overflow-hidden cursor-pointer hover:scale-110 active:scale-95 transition-all duration-150"
          style={appLogoUrl ? {} : {
            backgroundColor: brandColor || '#DE1E4D',
            boxShadow: `0 0 20px ${brandColor ? brandColor + '40' : 'rgba(222,30,77,0.4)'}`,
          }}
        >
          {appLogoUrl ? (
            <img src={appLogoUrl} alt="Logo" className="w-full h-full object-cover" />
          ) : (
            <span className="select-none">CS</span>
          )}
        </div>
        
        {/* Primary Navigation */}
        <nav className="flex flex-col gap-4 w-full mt-12 flex-1">
          <SidebarItem 
            icon={HomeIcon} 
            label="Início" 
            isActive={currentView === 'home'} 
            onClick={() => onNavigate('home')} 
            brandColor={brandColor}
          />
          <SidebarItem 
            icon={LayoutGrid} 
            label="Studio" 
            isActive={currentView === 'studio'} 
            onClick={() => onNavigate('studio')} 
            brandColor={brandColor}
          />
          <SidebarItem 
            icon={Sparkles} 
            label="Canvas" 
            isActive={currentView === 'canvas'} 
            onClick={() => onNavigate('canvas')} 
            brandColor={brandColor}
          />
          
          <div className="w-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-auto my-4" />
          
          <SidebarItem 
            icon={ImageIcon} 
            label="Mídia" 
            isActive={currentView === 'media' || (currentView === 'coming-soon' && comingSoonData?.label === 'Mídia Assets')} 
            onClick={() => onComingSoon(ImageIcon, 'Mídia Assets')} 
            brandColor={brandColor}
          />
        </nav>

        {/* Footer / Settings */}
        <div className="w-full">
          <SidebarItem 
            icon={Settings} 
            label="Ajustes" 
            isActive={false} 
            onClick={onOpenSettings} 
            brandColor={brandColor}
          />
        </div>
      </div>
    </aside>
  );
};

export default GlobalSidebar;

