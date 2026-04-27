import React from 'react';
import { cn } from '../lib/utils';
import { 
  Home as HomeIcon,
  LayoutGrid,
  Sparkles,
  Image as ImageIcon,
  Settings,
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
 * @description Barra lateral principal do ecossistema Carrossel Studio.
 */
const GlobalSidebar = ({ currentView, onNavigate, onOpenSettings, onComingSoon, comingSoonData, appLogoUrl, brandColor }) => {
  return (
    <aside className="w-24 border-r border-[#FFFFFF]/5 bg-[#000000]/95 flex flex-col items-center justify-between py-8 z-[200] relative h-full shrink-0">
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
          label="Auto-Post" 
          isActive={currentView === 'autopost' || (currentView === 'coming-soon' && comingSoonData?.label === 'Auto-Post')} 
          onClick={() => onComingSoon(Sparkles, 'Auto-Post')} 
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
    </aside>
  );
};

export default GlobalSidebar;

