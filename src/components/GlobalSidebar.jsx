import React from 'react';
import { 
  Home as HomeIcon,
  LayoutGrid,
  Sparkles,
  Image as ImageIcon,
  Settings,
  Layers
} from 'lucide-react';

/**
 * @name SidebarItem
 * @description Item individual da barra lateral com estados de hover e active premium.
 */
const SidebarItem = ({ icon: Icon, label, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className="group flex flex-col items-center justify-center w-full relative py-3 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none"
  >
    {isActive && (
      <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#DE1E4D] rounded-full shadow-[0_0_15px_#DE1E4D] z-10" />
    )}
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-150
      ${isActive 
        ? 'bg-gradient-to-br from-[#222222] to-[#111111] text-[#FFFFFF] shadow-lg border border-[#DE1E4D]/30' 
        : 'bg-transparent text-[#FFFFFF]/40 hover:bg-surface-input/50 hover:text-[#FFFFFF] border border-transparent'}
    `}>
      <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
    </div>
    <span className={`text-[9px] mt-2 font-bold tracking-[0.15em] transition-colors duration-150 uppercase
      ${isActive ? 'text-[#DE1E4D]' : 'text-[#FFFFFF]/30 group-hover:text-[#FFFFFF]/60'}
    `}>
      {label}
    </span>
  </button>
);

/**
 * @name GlobalSidebar
 * @description Barra lateral principal do ecossistema Alice Studio.
 */
const GlobalSidebar = ({ currentView, onNavigate, onOpenSettings, onComingSoon }) => {
  return (
    <aside className="w-24 border-r border-[#FFFFFF]/5 bg-[#000000]/95 flex flex-col items-center justify-between py-8 z-[200] relative h-full shrink-0">
      {/* Logo / Home Trigger */}
      <div 
        onClick={() => onNavigate('home')}
        className="w-12 h-12 bg-gradient-to-br from-[#DE1E4D] to-[#8A1230] rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(222,30,77,0.4)] border border-[#FFFFFF]/20 cursor-pointer hover:scale-110 active:scale-95 transition-all duration-150"
      >
        <Layers size={24} className="text-[#FFFFFF]" />
      </div>
      
      {/* Primary Navigation */}
      <nav className="flex flex-col gap-4 w-full mt-12 flex-1">
        <SidebarItem 
          icon={HomeIcon} 
          label="Início" 
          isActive={currentView === 'home'} 
          onClick={() => onNavigate('home')} 
        />
        <SidebarItem 
          icon={LayoutGrid} 
          label="Studio" 
          isActive={currentView === 'studio'} 
          onClick={() => onNavigate('studio')} 
        />
        <SidebarItem 
          icon={Sparkles} 
          label="Auto-Post" 
          isActive={currentView === 'autopost'} 
          onClick={() => onComingSoon(Sparkles, 'Auto-Post')} 
        />
        
        <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#FFFFFF]/10 to-transparent mx-auto my-4" />
        
        <SidebarItem 
          icon={ImageIcon} 
          label="Mídia" 
          isActive={currentView === 'media'} 
          onClick={() => onComingSoon(ImageIcon, 'Mídia Assets')} 
        />
      </nav>

      {/* Footer / Settings */}
      <div className="w-full">
        <SidebarItem 
          icon={Settings} 
          label="Ajustes" 
          isActive={false} 
          onClick={onOpenSettings} 
        />
      </div>
    </aside>
  );
};

export default GlobalSidebar;

