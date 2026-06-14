import React from 'react';
import { observer } from 'mobx-react-lite';
import { ArrowLeft, ChevronDown, Pipette, UploadCloud } from 'lucide-react';
import Konva from 'konva';
import {
  isLinearGradient,
  isRadialGradient,
  isGradient,
  parseColor,
  parseRadialColor,
  hexToRgb,
  rgbToHsv,
  hsvToHex,
  getBgIcon
} from './colorUtils';

interface ColorPickerPanelProps {
  store: any;
  onBack: () => void;
  brandColor?: string;
  targetProperty?: string;
}

export const ColorPickerPanel: React.FC<ColorPickerPanelProps> = observer(({
  store,
  onBack,
  brandColor = '#DE1E4D',
  targetProperty = 'background',
}) => {
  const [showColorBgTypeDropdown, setShowColorBgTypeDropdown] = React.useState(false);
  const [activeStopIndex, setActiveStopIndex] = React.useState<number>(0);
  const [hsv, setHsv] = React.useState({ h: 0, s: 0, v: 100 });
  const [hexInput, setHexInput] = React.useState('#FFFFFF');

  if (!store || !store.pages || store.pages.length === 0) return null;

  const activePage = store.pages[0];
  const activeElement = store.selectedElements?.[0];

  const currentColor = targetProperty === 'background'
    ? (activePage?.background || '#FFFFFF')
    : (activeElement ? (activeElement[targetProperty] || '#FFFFFF') : '#FFFFFF');

  const presetColors = [
    '#000000', '#555555', '#888888', '#CCCCCC', '#FFFFFF',
    '#8B5A2B', '#EF4444', '#F97316', '#FACC15', '#FDE047',
    '#4ADE80', '#22C55E', '#22D3EE', '#3B82F6', '#4F46E5',
    '#1D4ED8', '#8B5CF6', '#C084FC', '#EC4899'
  ];

  const bgType = isLinearGradient(currentColor)
    ? 'linear'
    : isRadialGradient(currentColor)
      ? 'radial'
      : 'solid';

  const rotationValue = isLinearGradient(currentColor)
    ? parseColor(currentColor).rotation
    : 90;

  const stopsInfo = (isLinearGradient(currentColor) || isRadialGradient(currentColor))
    ? parseGradientStops(currentColor)
    : { color1: currentColor, color2: '#000000' };

  function parseGradientStops(gradStr: string) {
    if (isLinearGradient(gradStr)) {
      const { stops } = parseColor(gradStr);
      return { color1: stops[0]?.color || '#ffffff', color2: stops[1]?.color || '#000000' };
    }
    if (isRadialGradient(gradStr)) {
      const { stops } = parseRadialColor(gradStr);
      return { color1: stops[0]?.color || '#ffffff', color2: stops[1]?.color || '#000000' };
    }
    return { color1: '#ffffff', color2: '#000000' };
  }

  const handleBgTypeChange = (type: 'solid' | 'linear' | 'radial') => {
    convertBackgroundTo(type);
    setActiveStopIndex(0);
  };

  const handleRotationSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rot = parseInt(e.target.value);
    if (isLinearGradient(currentColor)) {
      const { color1, color2 } = stopsInfo;
      updateCurrentColor(`linear-gradient(${rot}deg, ${color1} 0%, ${color2} 100%)`);
    }
  };

  const convertBackgroundTo = (type: 'solid' | 'linear' | 'radial') => {
    const current = currentColor || '#FFFFFF';
    const isImg = !isGradient(current) && !Konva.Util.colorToRGBA(current);

    if (type === 'solid') {
      if (isGradient(current)) {
        const { stops } = parseColor(current);
        updateCurrentColor(stops[0]?.color || '#FFFFFF');
      } else if (isImg) {
        updateCurrentColor('#FFFFFF');
      }
    } else if (type === 'linear') {
      if (isLinearGradient(current)) return;
      if (isRadialGradient(current)) {
        const { stops } = parseRadialColor(current);
        const c1 = stops[0]?.color || '#FFFFFF';
        const c2 = stops[1]?.color || '#000000';
        updateCurrentColor(`linear-gradient(90deg, ${c1} 0%, ${c2} 100%)`);
      } else {
        const base = isImg ? '#FFFFFF' : current;
        updateCurrentColor(`linear-gradient(90deg, ${base} 0%, #000000 100%)`);
      }
    } else if (type === 'radial') {
      if (isRadialGradient(current)) return;
      if (isLinearGradient(current)) {
        const { stops } = parseColor(current);
        const c1 = stops[0]?.color || '#FFFFFF';
        const c2 = stops[1]?.color || '#000000';
        updateCurrentColor(`radial-gradient(circle, ${c1} 0%, ${c2} 100%)`);
      } else {
        const base = isImg ? '#FFFFFF' : current;
        updateCurrentColor(`radial-gradient(circle, ${base} 0%, #000000 100%)`);
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

  const getActiveColor = () => {
    if (isLinearGradient(currentColor)) {
      const { stops } = parseColor(currentColor);
      return stops[activeStopIndex]?.color || '#FFFFFF';
    }
    if (isRadialGradient(currentColor)) {
      const { stops } = parseRadialColor(currentColor);
      return stops[activeStopIndex]?.color || '#FFFFFF';
    }
    return currentColor;
  };

  const activeColor = getActiveColor();

  const updateCurrentColor = (newHex: string) => {
    if (targetProperty === 'background') {
      if (isGradient(newHex)) {
        activePage.set({ background: newHex });
      } else if (isLinearGradient(currentColor)) {
        const parsed = parseColor(currentColor);
        const c1 = activeStopIndex === 0 ? newHex : (parsed.stops[0]?.color || '#FFFFFF');
        const c2 = activeStopIndex === 1 ? newHex : (parsed.stops[1]?.color || '#000000');
        activePage.set({ background: `linear-gradient(${parsed.rotation}deg, ${c1} 0%, ${c2} 100%)` });
      } else if (isRadialGradient(currentColor)) {
        const parsed = parseRadialColor(currentColor);
        const c1 = activeStopIndex === 0 ? newHex : (parsed.stops[0]?.color || '#FFFFFF');
        const c2 = activeStopIndex === 1 ? newHex : (parsed.stops[1]?.color || '#000000');
        activePage.set({ background: `radial-gradient(circle, ${c1} 0%, ${c2} 100%)` });
      } else {
        activePage.set({ background: newHex });
      }
    } else {
      store.history.transaction(() => {
        store.selectedElements.forEach((el: any) => {
          if (isGradient(newHex)) {
            el.set({ [targetProperty]: newHex });
          } else if (isLinearGradient(currentColor)) {
            const parsed = parseColor(currentColor);
            const c1 = activeStopIndex === 0 ? newHex : (parsed.stops[0]?.color || '#FFFFFF');
            const c2 = activeStopIndex === 1 ? newHex : (parsed.stops[1]?.color || '#000000');
            el.set({ [targetProperty]: `linear-gradient(${parsed.rotation}deg, ${c1} 0%, ${c2} 100%)` });
          } else if (isRadialGradient(currentColor)) {
            const parsed = parseRadialColor(currentColor);
            const c1 = activeStopIndex === 0 ? newHex : (parsed.stops[0]?.color || '#FFFFFF');
            const c2 = activeStopIndex === 1 ? newHex : (parsed.stops[1]?.color || '#000000');
            el.set({ [targetProperty]: `radial-gradient(circle, ${c1} 0%, ${c2} 100%)` });
          } else {
            el.set({ [targetProperty]: newHex });
          }
        });
      });
    }
  };

  React.useEffect(() => {
    if (activeColor.startsWith('#')) {
      const currentHexFromHsv = hsvToHex(hsv.h, hsv.s, hsv.v);
      if (activeColor.toUpperCase() !== currentHexFromHsv.toUpperCase()) {
        const rgb = hexToRgb(activeColor);
        const derived = rgbToHsv(rgb.r, rgb.g, rgb.b);
        setHsv(derived);
      }
    }
  }, [activeColor]);

  React.useEffect(() => {
    setHexInput(activeColor);
  }, [activeColor]);

  React.useEffect(() => {
    if (!showColorBgTypeDropdown) return;
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.color-bg-type-dropdown-container')) {
        setShowColorBgTypeDropdown(false);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [showColorBgTypeDropdown]);

  const handleSatValMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const updatePosition = (clientX: number, clientY: number) => {
      const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
      const y = Math.max(0, Math.min(rect.height, clientY - rect.top));
      const s = Math.round((x / rect.width) * 100);
      const v = Math.round((1 - y / rect.height) * 100);
      setHsv(prev => ({ ...prev, s, v }));
      const newHex = hsvToHex(hsv.h, s, v);
      updateCurrentColor(newHex);
    };

    updatePosition(e.clientX, e.clientY);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      updatePosition(moveEvent.clientX, moveEvent.clientY);
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleHueMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const updatePosition = (clientX: number) => {
      const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
      const h = Math.round((x / rect.width) * 360);
      setHsv(prev => ({ ...prev, h }));
      const newHex = hsvToHex(h, hsv.s, hsv.v);
      updateCurrentColor(newHex);
    };

    updatePosition(e.clientX);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      updatePosition(moveEvent.clientX);
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const openEyeDropper = async () => {
    if (typeof window !== 'undefined' && 'EyeDropper' in window) {
      try {
        const eyeDropper = new (window as any).EyeDropper();
        const result = await eyeDropper.open();
        updateCurrentColor(result.sRGBHex);
      } catch (err) {
        console.warn('EyeDropper cancelado ou falhou:', err);
      }
    } else {
      alert('Seletor de cores conta-gotas não suportado neste navegador. Digite a cor em hexadecimal.');
    }
  };

  return (
    <div className="cs-design-properties-container w-[310px] border border-gray-200 rounded-2xl shadow-lg p-6 flex flex-col gap-5 font-sans select-none animate-page-transition h-full" style={{ backgroundColor: '#FAFAFA', overflow: 'visible' }}>
      
      {/* Header do Sub-painel (Fixo) */}
      <div className="pb-3 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
        <button 
          onClick={onBack} 
          className="text-gray-400 hover:text-gray-800 transition-colors p-1 hover:bg-gray-100 rounded-lg outline-none cursor-pointer"
          title="Voltar ao Design"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h2 
          className="text-sm font-semibold tracking-wide cs-text-primary"
          style={{
            color: '#403f5d',
            fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            fontWeight: 700
          }}
        >
          Cor
        </h2>
        <div className="w-6" />
      </div>

      {/* 1. Tipo de Fundo (Fixo) */}
      <div className="flex items-center justify-between relative flex-shrink-0">
        <span className="text-[13px] font-normal text-gray-400">Tipo</span>
        <div className="relative color-bg-type-dropdown-container">
          <button 
            onClick={() => {
              setShowColorBgTypeDropdown(!showColorBgTypeDropdown);
            }}
            className="border border-gray-200 hover:border-gray-300 rounded-xl px-4 py-2 bg-white shadow-sm flex items-center gap-2.5 cs-bg-type-btn cursor-pointer font-sans outline-none min-w-[145px] justify-between text-xs font-bold text-gray-900"
          >
            <div className="flex items-center gap-2">
              {bgType === 'solid' ? getBgIcon('solid') : null}
              {bgType === 'linear' ? getBgIcon('linear') : null}
              {bgType === 'radial' ? getBgIcon('radial') : null}
              <span>
                {bgType === 'solid' ? 'Sólido' : bgType === 'linear' ? 'Linear' : 'Radial'}
              </span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${showColorBgTypeDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showColorBgTypeDropdown && (
            <div 
              className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-[99998] py-1.5 animate-page-transition"
              style={{ zIndex: 99998 }}
            >
              <button
                onClick={() => {
                  handleBgTypeChange('solid');
                  setShowColorBgTypeDropdown(false);
                }}
                className="w-full px-4 py-2.5 text-left hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-2 border-none bg-transparent cursor-pointer font-sans"
              >
                {getBgIcon('solid')}
                Cor sólida
              </button>

              <button
                onClick={() => {
                  handleBgTypeChange('linear');
                  setShowColorBgTypeDropdown(false);
                }}
                className="w-full px-4 py-2.5 text-left hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-2 border-none bg-transparent cursor-pointer font-sans"
              >
                {getBgIcon('linear')}
                Linear
              </button>

              <button
                onClick={() => {
                  handleBgTypeChange('radial');
                  setShowColorBgTypeDropdown(false);
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

      {/* Conteúdo Rolável do Sub-painel (Com Scroll) */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-5 pr-1 -mr-2" style={{ overflowX: 'visible' }}>
        
        {/* 2. Seleção de Slots de Cor (Sólido ou Degradê) */}
        {bgType === 'solid' ? (
          <div className="flex items-center justify-between bg-white border-2 border-sky-400 rounded-xl px-4 py-3 shadow-sm flex-shrink-0">
            <span className="text-xs text-sky-600 font-bold">Cor</span>
            <div className="w-6 h-6 rounded-md border border-gray-200 shadow-sm" style={{ backgroundColor: currentColor }} />
          </div>
        ) : (
          <div className="flex flex-col gap-2 flex-shrink-0">
            {/* Cor 1 */}
            <div 
              onClick={() => setActiveStopIndex(0)}
              className={`flex items-center justify-between bg-white border rounded-xl px-4 py-3 shadow-sm cursor-pointer transition-all ${activeStopIndex === 0 ? 'border-2 border-sky-400' : 'border-gray-150 hover:border-gray-300'}`}
            >
              <span className={`text-xs ${activeStopIndex === 0 ? 'text-sky-600 font-bold' : 'text-gray-400 font-medium'}`}>Cor 1</span>
              <div className="w-6 h-6 rounded-md border border-gray-200 shadow-sm" style={{ backgroundColor: stopsInfo.color1 }} />
            </div>

            {/* Cor 2 */}
            <div 
              onClick={() => setActiveStopIndex(1)}
              className={`flex items-center justify-between bg-white border rounded-xl px-4 py-3 shadow-sm cursor-pointer transition-all ${activeStopIndex === 1 ? 'border-2 border-sky-400' : 'border-gray-150 hover:border-gray-300'}`}
            >
              <span className={`text-xs ${activeStopIndex === 1 ? 'text-sky-600 font-bold' : 'text-gray-400 font-medium'}`}>Cor 2</span>
              <div className="w-6 h-6 rounded-md border border-gray-200 shadow-sm" style={{ backgroundColor: stopsInfo.color2 }} />
            </div>

            {/* Controle de Ângulo (apenas para Linear) */}
            {bgType === 'linear' && (
              <div className="flex flex-col gap-1.5 mt-2 bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex-shrink-0">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-gray-400">Ângulo de rotação</span>
                  <span className="font-bold text-gray-900">{rotationValue}°</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="360" 
                  value={rotationValue} 
                  onChange={handleRotationSliderChange}
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
        )}

        {/* 3. Seletor Sat/Val (HSV) */}
        <div 
          onMouseDown={handleSatValMouseDown}
          className="w-full rounded-xl relative overflow-hidden cursor-crosshair shadow-inner border border-gray-200 flex-shrink-0"
          style={{ backgroundColor: `hsl(${hsv.h}, 100%, 50%)`, height: '130px', flexShrink: 0 }}
        >
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #fff, transparent)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent, #000)' }} />
          
          <div 
            className="absolute w-3.5 h-3.5 -ml-1.5 -mt-1.5 bg-white border border-gray-400 rounded-full shadow-md pointer-events-none"
            style={{ left: `${hsv.s}%`, top: `${100 - hsv.v}%` }}
          />
        </div>

        {/* 4. Barra deslizante de Hue */}
        <div 
          onMouseDown={handleHueMouseDown}
          className="w-full rounded-full relative cursor-pointer shadow-inner border border-gray-200 flex-shrink-0"
          style={{ background: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)', height: '12px', flexShrink: 0 }}
        >
          <div 
            className="absolute w-3.5 h-3.5 -mt-[1px] bg-white border border-gray-400 rounded-full shadow-md pointer-events-none"
            style={{ left: `calc(${(hsv.h / 360) * 100}% - 7px)` }}
          />
        </div>

        {/* 5. Hexadecimal Input & Conta-gotas */}
        <div className="flex gap-2 flex-shrink-0">
          <div className="flex-1 relative flex items-center">
            <span className="absolute left-4 text-xs text-gray-400 font-medium">#</span>
            <input 
              type="text" 
              value={hexInput.replace('#', '')} 
              onChange={(e) => {
                const val = '#' + e.target.value;
                setHexInput(val);
                if (/^#[0-9A-F]{6}$/i.test(val) || /^#[0-9A-F]{3}$/i.test(val)) {
                  updateCurrentColor(val);
                }
              }}
              placeholder="FFFFFF"
              className="w-full border border-gray-200 hover:border-gray-300 focus:border-sky-500 rounded-xl pl-8 pr-4 py-2 text-xs font-mono font-bold text-gray-900 bg-white shadow-sm outline-none transition-all uppercase"
            />
          </div>
          <button 
            onClick={openEyeDropper}
            className="border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 rounded-xl p-2.5 transition-colors shadow-sm outline-none flex items-center justify-center cursor-pointer"
            title="Capturar cor da tela"
          >
            <Pipette className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* 6. Kits de marca */}
        <div className="flex flex-col gap-2 pt-2 border-t border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-extrabold text-gray-400 tracking-wider">KITS DE MARCA</span>
            <span className="text-xs">👑</span>
          </div>
          <button className="w-full border border-dashed border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 rounded-xl py-3 px-4 flex items-center justify-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-700 transition-all shadow-sm outline-none cursor-pointer">
            <UploadCloud className="w-4 h-4 text-gray-400" />
            Adicionar kit de marca
          </button>
        </div>

        {/* 7. No meu design */}
        {getColorsInUse().length > 0 && (
          <div className="flex flex-col gap-2 pt-2 border-t border-gray-100 flex-shrink-0">
            <span className="text-[10px] font-extrabold text-gray-400 tracking-wider">NO MEU DESIGN</span>
            <div className="flex flex-wrap gap-2">
              {getColorsInUse().map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    updateCurrentColor(color);
                    setHexInput(color);
                  }}
                  className="w-6 h-6 rounded-md border border-gray-200 shadow-sm transition-transform active:scale-90 outline-none cursor-pointer"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}

        {/* 8. Predefinições */}
        <div className="flex flex-col gap-2 pt-2 border-t border-gray-100 flex-shrink-0">
          <span className="text-[10px] font-extrabold text-gray-400 tracking-wider">PREDEFINIÇÃO</span>
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(5, 24px)', 
              gap: '6px 5px'
            }}
          >
            {presetColors.map((color, idx) => (
              <button
                key={idx}
                onClick={() => {
                  updateCurrentColor(color);
                  setHexInput(color);
                }}
                className="w-6 h-6 rounded-md border border-gray-200 shadow-sm transition-transform active:scale-90 outline-none cursor-pointer"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

      </div>

    </div>
  );
});
