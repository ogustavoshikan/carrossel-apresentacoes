import React from 'react';
import { observer } from 'mobx-react-lite';
import { Paintbrush, HelpCircle, ArrowLeft, ChevronDown } from 'lucide-react';
import Konva from 'konva';
import { ColorPickerPanel } from './ColorPickerPanel';
import {
  isGradient,
  isLinearGradient,
  isRadialGradient,
  parseColor,
  parseRadialColor,
  hexToRgb,
  getBgIcon
} from './colorUtils';

// =========================================================================
// COMPONENTE PRINCIPAL
// =========================================================================

interface DesignPropertiesPanelProps {
  store: any;
  projectTitle: string;
  onTitleChange: (newTitle: string) => void;
  brandColor?: string;
}

export const DesignPropertiesPanel: React.FC<DesignPropertiesPanelProps> = observer(({
  store,
  projectTitle,
  onTitleChange,
  brandColor = '#DE1E4D',
}) => {
  const [subPanel, setSubPanel] = React.useState<'main' | 'color'>('main');
  const [showSizeDropdown, setShowSizeDropdown] = React.useState(false);
  const [showBgTypeDropdown, setShowBgTypeDropdown] = React.useState(false);
  const [showGradationSubmenu, setShowGradationSubmenu] = React.useState(false);
  const [showColorBgTypeDropdown, setShowColorBgTypeDropdown] = React.useState(false);
  const [showFoldsDropdown, setShowFoldsDropdown] = React.useState(false);
  const foldsDropdownRef = React.useRef<HTMLDivElement>(null);
  const sizeDropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (sizeDropdownRef.current && !sizeDropdownRef.current.contains(e.target as Node)) {
        setShowSizeDropdown(false);
      }
    };
    if (showSizeDropdown) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showSizeDropdown]);

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (foldsDropdownRef.current && !foldsDropdownRef.current.contains(e.target as Node)) {
        setShowFoldsDropdown(false);
      }
    };
    if (showFoldsDropdown) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showFoldsDropdown]);

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const container = document.querySelector('.cs-design-properties-container');
      if (container && !container.contains(e.target as Node)) {
        const target = e.target as HTMLElement;
        if (target.closest('[class*="bp5-popover"]') || target.closest('[class*="bp5-portal"]') || target.closest('.color-bg-type-dropdown-container')) {
          return;
        }
        setSubPanel('main');
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  React.useEffect(() => {
    const scrollableDivs = document.querySelectorAll('.cs-design-properties-container .overflow-y-auto');
    scrollableDivs.forEach(div => {
      div.scrollTop = 0;
    });
  }, [subPanel]);

  // Sub-painéis e navegação

  if (!store || !store.pages || store.pages.length === 0) return null;

  const activePage = store.pages[0];
  const currentBackground = activePage.background || '#FFFFFF';

  // Recommended styling colors
  const stylesPalette = ['#000000', '#FBCFE8', '#E4E4E7', '#FEF08A', '#EF4444'];

  const sizes = [
    { name: 'Instagram Portrait', w: 1080, h: 1350, desc: '1080 × 1350 px' },
    { name: 'Instagram Quadrado', w: 1080, h: 1080, desc: '1080 × 1080 px' },
    { name: 'Story / Reels', w: 1080, h: 1920, desc: '1080 × 1920 px' },
    { name: 'A4 Imprimir', w: 794, h: 1123, desc: '21 cm × 29,7 cm' },
  ];

  const presetColors = [
    '#000000', '#555555', '#888888', '#CCCCCC', '#FFFFFF',
    '#8B5A2B', '#EF4444', '#F97316', '#FACC15', '#FDE047',
    '#4ADE80', '#22C55E', '#22D3EE', '#3B82F6', '#4F46E5',
    '#1D4ED8', '#8B5CF6', '#C084FC', '#EC4899'
  ];

  const foldOptions = [
    { value: 'none', label: 'Nenhum', icon: (className: string) => (
      <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="12" height="12" rx="1" strokeDasharray="2 2" />
        <line x1="2" y1="2" x2="14" y2="14" />
      </svg>
    )},
    { value: 'diptych-h', label: 'Díptico (horizontal)', icon: (className: string) => (
      <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="12" height="12" rx="1" />
        <line x1="2" y1="8" x2="14" y2="8" />
      </svg>
    )},
    { value: 'diptych-v', label: 'Díptico (vertical)', icon: (className: string) => (
      <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="12" height="12" rx="1" />
        <line x1="8" y1="2" x2="8" y2="14" />
      </svg>
    )},
    { value: 'triptych-h', label: 'Tríptico (horizontal)', icon: (className: string) => (
      <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="12" height="12" rx="1" />
        <line x1="2" y1="6" x2="14" y2="6" />
        <line x1="2" y1="10" x2="14" y2="10" />
      </svg>
    )},
    { value: 'triptych-v', label: 'Tríptico (vertical)', icon: (className: string) => (
      <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="12" height="12" rx="1" />
        <line x1="5.3" y1="2" x2="5.3" y2="14" />
        <line x1="10.7" y1="2" x2="10.7" y2="14" />
      </svg>
    )},
    { value: 'quad-h', label: 'Quatro painéis (horizontal)', icon: (className: string) => (
      <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="12" height="12" rx="1" />
        <line x1="2" y1="5" x2="14" y2="5" />
        <line x1="2" y1="8" x2="14" y2="8" />
        <line x1="2" y1="11" x2="14" y2="11" />
      </svg>
    )},
    { value: 'quad-v', label: 'Quatro painéis (vertical)', icon: (className: string) => (
      <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="12" height="12" rx="1" />
        <line x1="5" y1="2" x2="5" y2="14" />
        <line x1="8" y1="2" x2="8" y2="14" />
        <line x1="11" y1="2" x2="11" y2="14" />
      </svg>
    )}
  ];

  const currentSizeName = () => {
    const w = store.width;
    const h = store.height;
    const found = sizes.find(s => s.w === w && s.h === h);
    return found ? found.name : 'Customizado';
  };

  const handleSizeSelect = (w: number, h: number) => {
    store.setSize(w, h);
    setShowSizeDropdown(false);
  };

  const getBackgroundTypeLabel = () => {
    if (isLinearGradient(currentBackground)) return 'Degradê linear';
    if (isRadialGradient(currentBackground)) return 'Degradê radial';
    if (currentBackground.startsWith('#') || !currentBackground.includes('/')) {
      return 'Cor sólida';
    }
    return 'Imagem de fundo';
  };

  const convertBackgroundTo = (type: 'solid' | 'linear' | 'radial') => {
    const current = activePage.background || '#FFFFFF';
    const isImg = !isGradient(current) && !Konva.Util.colorToRGBA(current);

    if (type === 'solid') {
      if (isGradient(current)) {
        const { stops } = parseColor(current);
        activePage.set({ background: stops[0]?.color || '#FFFFFF' });
      } else if (isImg) {
        activePage.set({ background: '#FFFFFF' });
      }
    } else if (type === 'linear') {
      if (isLinearGradient(current)) return;
      if (isRadialGradient(current)) {
        const { stops } = parseRadialColor(current);
        const c1 = stops[0]?.color || '#FFFFFF';
        const c2 = stops[1]?.color || '#000000';
        activePage.set({ background: `linear-gradient(90deg, ${c1} 0%, ${c2} 100%)` });
      } else {
        const base = isImg ? '#FFFFFF' : current;
        activePage.set({ background: `linear-gradient(90deg, ${base} 0%, #000000 100%)` });
      }
    } else if (type === 'radial') {
      if (isRadialGradient(current)) return;
      if (isLinearGradient(current)) {
        const { stops } = parseColor(current);
        const c1 = stops[0]?.color || '#FFFFFF';
        const c2 = stops[1]?.color || '#000000';
        activePage.set({ background: `radial-gradient(circle, ${c1} 0%, ${c2} 100%)` });
      } else {
        const base = isImg ? '#FFFFFF' : current;
        activePage.set({ background: `radial-gradient(circle, ${base} 0%, #000000 100%)` });
      }
    }
  };

  const getColorsInUse = () => {
    const colors = new Set<string>();
    if (activePage.background && !isGradient(activePage.background) && activePage.background.startsWith('#')) {
      colors.add(activePage.background.toUpperCase());
    } else if (activePage.background && isGradient(activePage.background)) {
      const { stops } = parseColor(activePage.background);
      stops.forEach(s => {
        if (s.color.startsWith('#')) colors.add(s.color.toUpperCase());
      });
    }
    
    store.pages.forEach((page: any) => {
      page.children.forEach((el: any) => {
        if (el.fill && typeof el.fill === 'string' && el.fill.startsWith('#')) colors.add(el.fill.toUpperCase());
        if (el.stroke && typeof el.stroke === 'string' && el.stroke.startsWith('#')) colors.add(el.stroke.toUpperCase());
        if (el.color && typeof el.color === 'string' && el.color.startsWith('#')) colors.add(el.color.toUpperCase());
      });
    });
    return Array.from(colors).slice(0, 10);
  };

  React.useEffect(() => {
    if (!showBgTypeDropdown) return;
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.bg-type-dropdown-container')) {
        setShowBgTypeDropdown(false);
        setShowGradationSubmenu(false);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [showBgTypeDropdown]);

  // =========================================================================
  // SUB-PANEL: COLOR SELECTOR (COMPONETIZADO)
  // =========================================================================
  if (subPanel === 'color') {
    return (
      <ColorPickerPanel
        store={store}
        onBack={() => setSubPanel('main')}
        brandColor={brandColor}
      />
    );
  }

  // =========================================================================
  // MAIN PANEL: DESIGN PROPERTIES
  // =========================================================================

  const handleStyleColorClick = (color: string) => {
    activePage.set({ background: color });
  };

  return (
    <div className="cs-design-properties-container w-[310px] border border-gray-200 rounded-2xl shadow-lg p-6 flex flex-col gap-6 font-sans select-none animate-page-transition h-full" style={{ backgroundColor: '#FAFAFA', overflow: 'visible' }}>
      
      {/* 1. Header do Painel (Fixo) */}
      <div className="text-center pb-3 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
        <div className="w-5" />
        <h2 
          className="text-sm font-semibold tracking-wide cs-text-primary"
          style={{
            color: '#403f5d',
            fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            fontWeight: 700
          }}
        >
          Design
        </h2>
        <button 
          onClick={() => store.openSidePanel('more')} 
          className="text-gray-400 hover:text-gray-600 transition-colors"
          title="Ajuda"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Seção Tamanho (Fixo) */}
      <div className="flex items-center justify-between relative flex-shrink-0">
        <span className="text-[13px] font-normal text-gray-400">Tamanho</span>
        <div className="relative" ref={sizeDropdownRef}>
          <button 
            onClick={() => setShowSizeDropdown(!showSizeDropdown)}
            className="border border-gray-200 hover:border-gray-300 rounded-xl px-4 py-2 text-right cs-bg-type-btn bg-white shadow-sm flex flex-col items-end min-w-[140px] cursor-pointer"
          >
            <span 
              className="text-xs font-semibold cs-text-primary"
              style={{
                color: '#403f5d',
                fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                fontWeight: 700
              }}
            >
              {currentSizeName()}
            </span>
            <span className="text-[10px] text-gray-400 font-medium">{store.width} × {store.height} px</span>
          </button>
          
          {showSizeDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-30 py-1.5 animate-page-transition">
              {sizes.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSizeSelect(s.w, s.h)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex flex-col transition-colors border-none bg-transparent cursor-pointer font-sans"
                >
                  <span className="text-xs font-bold text-gray-900">{s.name}</span>
                  <span className="text-[10px] text-gray-400 font-medium">{s.desc}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3. Seção Imagem de fundo (Fixo) */}
      <div className="flex flex-col gap-3 flex-shrink-0">
        <div className="flex items-center justify-between relative">
          <span className="text-[13px] font-normal text-gray-400">Imagem de fundo</span>
          <div className="relative bg-type-dropdown-container">
            <button 
              onClick={() => {
                setShowBgTypeDropdown(!showBgTypeDropdown);
                setShowGradationSubmenu(false);
              }}
              className="border border-gray-200 hover:border-gray-300 rounded-xl px-4 py-2 bg-white shadow-sm flex items-center gap-2.5 cs-bg-type-btn cursor-pointer font-sans outline-none min-w-[145px] justify-between text-xs font-bold text-gray-900"
            >
              <div className="flex items-center gap-2">
                {getBackgroundTypeLabel() === 'Imagem de fundo' ? <Paintbrush className="w-3.5 h-3.5 text-gray-400" /> : null}
                {getBackgroundTypeLabel() === 'Cor sólida' ? getBgIcon('solid') : null}
                {getBackgroundTypeLabel() === 'Degradê linear' ? getBgIcon('linear') : null}
                {getBackgroundTypeLabel() === 'Degradê radial' ? getBgIcon('radial') : null}
                <span>{getBackgroundTypeLabel()}</span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${showBgTypeDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showBgTypeDropdown && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-[99998] py-1.5 animate-page-transition"
                style={{ zIndex: 99998 }}
              >
                <button
                  onClick={() => {
                    convertBackgroundTo('solid');
                    setShowBgTypeDropdown(false);
                    setShowGradationSubmenu(false);
                  }}
                  className="w-full px-4 py-2.5 text-left hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-2 border-none bg-transparent cursor-pointer font-sans"
                >
                  {getBgIcon('solid')}
                  Cor sólida
                </button>

                <div 
                  className="relative"
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setShowGradationSubmenu(true)}
                  onMouseLeave={(e) => {
                    const related = e.relatedTarget as HTMLElement;
                    if (!related || !related.closest('.gradation-submenu-container')) {
                      setShowGradationSubmenu(false);
                    }
                  }}
                >
                  <button
                    className={`w-full px-4 py-2.5 text-left hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center justify-between border-none bg-transparent cursor-pointer font-sans ${showGradationSubmenu ? 'bg-gray-50' : ''}`}
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="7" height="7" x="3" y="3" rx="1" />
                        <rect width="7" height="7" x="14" y="3" rx="1" />
                        <rect width="7" height="7" x="3" y="14" rx="1" />
                        <rect width="7" height="7" x="14" y="14" rx="1" />
                      </svg>
                      Gradação
                    </div>
                    <span className="text-gray-400 font-normal font-sans text-xs">{"›"}</span>
                  </button>

                  {showGradationSubmenu && (
                    <div 
                      className="gradation-submenu-container absolute right-full mr-2 top-0 w-36 bg-white border border-gray-200 rounded-xl shadow-xl z-[99999] py-1.5 animate-page-transition"
                      style={{ position: 'absolute', right: '100%', marginRight: '8px', top: '0px', zIndex: 99999 }}
                      onMouseEnter={() => setShowGradationSubmenu(true)}
                      onMouseLeave={() => setShowGradationSubmenu(false)}
                    >
                      <button
                        onClick={() => {
                          convertBackgroundTo('linear');
                          setShowBgTypeDropdown(false);
                          setShowGradationSubmenu(false);
                        }}
                        className="w-full px-4 py-2.5 text-left hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-2 border-none bg-transparent cursor-pointer font-sans"
                      >
                        {getBgIcon('linear')}
                        Linear
                      </button>

                      <button
                        onClick={() => {
                          convertBackgroundTo('radial');
                          setShowBgTypeDropdown(false);
                          setShowGradationSubmenu(false);
                        }}
                        className="w-full px-4 py-2.5 text-left hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-2 border-none bg-transparent cursor-pointer font-sans"
                      >
                        {getBgIcon('radial')}
                        Radial
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Conteúdo Rolável do Painel Principal (Com Scroll) */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-6 pr-1 -mr-2" style={{ overflowX: 'visible' }}>

        {/* Seletor de Cor Sólida */}
        <div 
          onClick={() => {
            if (getBackgroundTypeLabel() === 'Imagem de fundo') {
              convertBackgroundTo('solid');
            }
            setSubPanel('color');
          }}
          className="flex items-center justify-between bg-white border border-gray-150 hover:border-gray-300 rounded-xl px-4 py-3 shadow-sm cursor-pointer transition-all flex-shrink-0"
        >
          <span className="text-xs text-gray-400 font-normal">Cor</span>
          <div className="relative flex items-center">
            <div 
              className="w-6 h-6 rounded-md border border-gray-200 shadow-sm cursor-pointer transition-transform active:scale-95"
              style={{ 
                background: currentBackground.startsWith('linear') || currentBackground.startsWith('radial') 
                  ? currentBackground 
                  : currentBackground.startsWith('#') || !currentBackground.includes('/') 
                    ? currentBackground 
                    : '#FFFFFF' 
              }}
            />
          </div>
        </div>

        {/* 4. Estilos */}
        <div className="flex items-center justify-between flex-shrink-0">
          <span className="text-[13px] font-normal text-gray-400">Estilos</span>
          <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-2.5 py-1.5 shadow-sm">
            {stylesPalette.map((color, idx) => (
              <button
                key={idx}
                onClick={() => handleStyleColorClick(color)}
                className="w-3.5 h-3.5 rounded-full border border-gray-300 shadow-sm transition-transform active:scale-90 outline-none cursor-pointer"
                style={{ backgroundColor: color }}
              />
            ))}
            <button 
              onClick={() => store.openSidePanel('background')}
              className="w-3.5 h-3.5 rounded-full border border-dashed border-gray-300 flex items-center justify-center text-[10px] text-gray-400 hover:border-gray-400 active:scale-90 bg-transparent outline-none cursor-pointer"
            >
              +
            </button>
          </div>
        </div>

        {/* 6. Seção Título */}
        <div className="flex flex-col gap-2 pt-2 border-t border-gray-100 flex-shrink-0">
          <span 
            className="text-xs font-semibold tracking-wide cs-text-primary"
            style={{
              color: '#403f5d',
              fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
              fontWeight: 700
            }}
          >
            Título
          </span>
          <input 
            type="text" 
            value={projectTitle} 
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Título do design"
            className="w-full border border-gray-200 hover:border-gray-300 focus:border-sky-500 rounded-xl px-4 py-2.5 text-xs font-semibold bg-white shadow-sm outline-none transition-all cs-text-primary placeholder:font-normal"
            style={{
              color: '#403f5d',
              fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
              fontWeight: 700
            }}
          />
        </div>

        {/* 7. Seção Esquema */}
        <div className="flex flex-col gap-4 pt-2 border-t border-gray-100 flex-shrink-0">
          <span 
            className="text-xs font-semibold tracking-wide cs-text-primary"
            style={{
              color: '#403f5d',
              fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
              fontWeight: 700
            }}
          >
            Esquema
          </span>
          
          {/* Grelha (Grid) */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-normal">Grelha</span>
              <button 
                onClick={() => store.toggleGrid()}
                className="w-11 h-6 flex items-center rounded-full p-1 transition-all duration-300 outline-none cursor-pointer"
                style={{ 
                  backgroundColor: store.gridVisible ? brandColor : '#E4E4E7'
                }}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-all duration-300 ${store.gridVisible ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Slider de Tamanho da Grelha */}
            {store.gridVisible && (
              <div className="flex flex-col gap-1.5 pl-2 mt-1">
                <div className="flex items-center justify-between text-[11px] text-gray-400 font-medium">
                  <span>Tamanho da grelha</span>
                  <span className="font-bold text-gray-700">{store.gridSize || 30}px</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="100" 
                  value={store.gridSize || 30} 
                  onChange={(e) => store.setGridSize(Number(e.target.value))}
                  className="w-full rounded-lg appearance-none cursor-pointer"
                  style={{ 
                    background: (() => {
                      const rgb = hexToRgb(brandColor);
                      return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`;
                    })(),
                    accentColor: brandColor,
                    height: '6px'
                  }}
                />
              </div>
            )}
          </div>

          {/* Dobras */}
          <div className="flex items-center justify-between relative" ref={foldsDropdownRef}>
            <span className="text-xs text-gray-400 font-normal">Dobras</span>
            <button 
              onClick={() => setShowFoldsDropdown(!showFoldsDropdown)}
              className="flex items-center gap-1.5 text-xs font-bold text-gray-900 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm hover:border-gray-300 cs-bg-type-btn active:scale-95 outline-none cursor-pointer"
            >
              {(() => {
                const currentOpt = foldOptions.find(o => o.value === (store.foldsType || 'none'));
                return (
                  <>
                    {currentOpt?.icon("w-3.5 h-3.5 text-gray-500")}
                    <span>{currentOpt?.label || 'Nenhum'}</span>
                  </>
                );
              })()}
              <span className="text-gray-400 text-[8px] ml-0.5">▼</span>
            </button>

            {/* Menu Dropdown de Dobras */}
            {showFoldsDropdown && (
              <div className="absolute right-0 top-full mt-1.5 w-60 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 z-[9999] flex flex-col max-h-64 overflow-y-auto">
                {foldOptions.map((opt) => {
                  const isSelected = (store.foldsType || 'none') === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => {
                        store.setFoldsType(opt.value);
                        setShowFoldsDropdown(false);
                      }}
                      className={`flex items-center justify-between px-4 py-2.5 text-xs text-left w-full hover:bg-gray-50 transition-colors border-none outline-none cursor-pointer ${
                        isSelected ? 'font-bold' : 'text-gray-700 font-medium'
                      }`}
                      style={isSelected ? { color: brandColor, backgroundColor: `${brandColor}0D` } : {}}
                    >
                      <div className="flex items-center gap-2.5">
                        {opt.icon(`w-4 h-4 ${isSelected ? '' : 'text-gray-400'}`)}
                        <span>{opt.label}</span>
                      </div>
                      {isSelected && <span className="text-xs" style={{ color: brandColor }}>✓</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Transbordo (Bleed) */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-normal">Transbordo</span>
              <button 
                onClick={() => {
                  const targetState = !store.bleedVisible;
                  store.toggleBleed();
                  if (targetState && (!activePage.bleed || activePage.bleed === 0)) {
                    activePage.set({ bleed: 20 });
                  }
                }}
                className="w-11 h-6 flex items-center rounded-full p-1 transition-all duration-300 outline-none cursor-pointer"
                style={{ 
                  backgroundColor: store.bleedVisible ? brandColor : '#E4E4E7'
                }}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-all duration-300 ${store.bleedVisible ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Slider de Tamanho do Transbordo (0px a 150px) */}
            {store.bleedVisible && (
              <div className="flex flex-col gap-1.5 pl-2 mt-1">
                <div className="flex items-center justify-between text-[11px] text-gray-400 font-medium">
                  <span>Tamanho do transbordo</span>
                  <span className="font-bold text-gray-700">{activePage.bleed || 0}px</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="150" 
                  value={activePage.bleed || 0} 
                  onChange={(e) => activePage.set({ bleed: Number(e.target.value) })}
                  className="w-full rounded-lg appearance-none cursor-pointer"
                  style={{ 
                    background: (() => {
                      const rgb = hexToRgb(brandColor);
                      return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`;
                    })(),
                    accentColor: brandColor,
                    height: '6px'
                  }}
                />
              </div>
            )}
          </div>

        </div>

        {/* 8. Rodapé de Autoria */}
        <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-100 mt-auto flex-shrink-0">
          <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-600 overflow-hidden flex items-center justify-center text-[9px] font-bold">
            CS
          </span>
          <span className="text-[10px] text-gray-400 font-medium">
            Criado por <strong className="text-gray-500 font-bold">Carrossel Studio</strong>
          </span>
        </div>

      </div>

    </div>
  );
});
