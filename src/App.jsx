import React, { useState, useCallback, useEffect } from 'react';
import { ChevronUp, ChevronDown, Cake, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDragResize } from './hooks/useDragResize';
import { generateCarouselContent, generateImageWithAI, generateSingleSlideContent } from './services/ai';
import { exportAllToPNG, exportSlideToPNG } from './services/export';
import { copyToClipboard } from './lib/clipboard';
import { BRAND_DEFAULTS, SLIDE_COUNT_RANGE } from './lib/design-tokens';
import { createSlideFromTemplate } from './lib/layout-templates';
import { LAYOUT_META } from './lib/layout-templates';
import { getFavorites, saveFavorite, removeFavorite } from './lib/favorites';

// Componentes
import ConfigSidebar from './components/sidebar/ConfigSidebar';
import WorkspaceToolbar from './components/workspace/WorkspaceToolbar';
import VisualPreview from './components/workspace/VisualPreview';
import TextEditor from './components/workspace/TextEditor';
import { EmptyState, LoadingState } from './components/workspace/EmptyState';
import SettingsModal from './components/SettingsModal';
import FavoriteNameModal from './components/workspace/FavoriteNameModal';
import SplashScreen from './components/SplashScreen';
import SplashScreenCinematic from './components/SplashScreenCinematic';
import Home from './components/Home';
import GlobalSidebar from './components/GlobalSidebar';
import ComingSoon from './components/workspace/ComingSoon';

export default function App() {
  // ========================================
  // STATE
  // ========================================

  const [view, setView] = useState('home'); // 'home' | 'studio' | 'coming-soon'
  const [theme, setTheme] = useState('');
  const [creativeContext, setCreativeContext] = useState(() => {
    try {
      const saved = localStorage.getItem('alice_creative_context');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [slides, setSlides] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [viewMode, setViewMode] = useState('visual');
  const [showMetrics, setShowMetrics] = useState(false);
  const [loadingImages, setLoadingImages] = useState({});
  const [slideCount, setSlideCount] = useState(SLIDE_COUNT_RANGE.default);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(true);
  const [selectedElement, setSelectedElement] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Seleção de layouts (Fase 4)
  const [layoutSelection, setLayoutSelection] = useState({
    mode: 'ai', // 'ai' | 'manual'
    layouts: {}, // { 'content-split': 2, 'big-number': 1, ... }
  });

  // Brand Customization
  const [brandHandle, setBrandHandle] = useState(BRAND_DEFAULTS.handle);
  const [showBrandHandle, setShowBrandHandle] = useState(true);
  const [brandAvatar, setBrandAvatar] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getFavorites().then(setFavorites).catch(console.error);
  }, []);
  
  const [favoritePrompt, setFavoritePrompt] = useState({ isOpen: false, slideIndex: null, defaultName: '', resolve: null });
  const [isVerified, setIsVerified] = useState(BRAND_DEFAULTS.isVerified);
  const [gradientColor1, setGradientColor1] = useState(BRAND_DEFAULTS.gradientColor1);
  const [titleSizeScale, setTitleSizeScale] = useState(70);
  const [textSizeScale, setTextSizeScale] = useState(70);
  const [cardBorderRadius, setCardBorderRadius] = useState(0);
  const [imageBorderRadius, setImageBorderRadius] = useState(40);
  const [isExporting, setIsExporting] = useState(false);
  const [titleFont, setTitleFont] = useState(BRAND_DEFAULTS.titleFont);
  const [textFont, setTextFont] = useState(BRAND_DEFAULTS.textFont);
  const [appLogoUrl, setAppLogoUrl] = useState(() => localStorage.getItem('alice_app_logo') || '');

  // Contador de slides
  const [showSlideCounter, setShowSlideCounter] = useState(true);
  const [slideCounterPosition, setSlideCounterPosition] = useState('top-right');

  const [sidebarWidth, setSidebarWidth] = useState(452);
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
  const [splashStep, setSplashStep] = useState(1);
  const [comingSoonData, setComingSoonData] = useState({ icon: null, label: 'Em breve' });

  const handleComingSoon = useCallback((icon, label) => {
    setComingSoonData({ icon, label });
    setView('coming-soon');
  }, []);

  // Drag & Resize hook
  const { handleActionStart, resetSlidePositions } = useDragResize(slides, setSlides);

  // Sidebar Resize Logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizingSidebar) return;
      // Impede seleção de texto durante o drag
      e.preventDefault();
      const newWidth = e.clientX;
      if (newWidth >= 300 && newWidth <= 800) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizingSidebar(false);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };

    if (isResizingSidebar) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizingSidebar]);

  // Teclado: Movimentação de elementos selecionados com as setas (2px por vez)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedElement) return;
      
      const active = document.activeElement;
      if (active && (
         active.tagName === 'INPUT' || 
         active.tagName === 'TEXTAREA' || 
         active.isContentEditable
      )) {
        return; // não movimentar se o usuário estiver digitando
      }

      const { slideIndex, field } = selectedElement;
      const step = 2; // incremento de 2px definido nos requisitos
      let dx = 0;
      let dy = 0;

      if (e.key === 'ArrowUp') dy = -step;
      else if (e.key === 'ArrowDown') dy = step;
      else if (e.key === 'ArrowLeft') dx = -step;
      else if (e.key === 'ArrowRight') dx = step;
      else return;

      e.preventDefault(); // impede o scroll

      setSlides((prev) => {
        const newSlides = [...prev];
        const slide = { ...newSlides[slideIndex] };
        const positions = { ...(slide.positions || {}) };
        const currentPos = positions[field] || { x: 0, y: 0, scale: 1, rotation: 0 };
        
        positions[field] = {
           ...currentPos,
           x: (currentPos.x || 0) + dx,
           y: (currentPos.y || 0) + dy
        };
        
        slide.positions = positions;
        newSlides[slideIndex] = slide;
        return newSlides;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElement, setSlides]);


  // ========================================
  // CSS CUSTOM PROPERTIES (dinâmicas)
  // ========================================

  const dynamicStyles = {
    '--color-brand': gradientColor1,
    '--color-brand-glow': `${gradientColor1}40`,
    '--font-title': `'${titleFont}', sans-serif`,
    '--font-text': `'${textFont}', serif`,
    '--radius-slide': `${cardBorderRadius}px`,
    '--radius-inner': `${imageBorderRadius * 0.8}px`,
    '--radius-sm': `${imageBorderRadius * 0.6}px`,
  };

  // ========================================
  // HANDLERS
  // ========================================

  const handleSlideTextChange = useCallback((index, field, value) => {
    setSlides((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  }, []);

  const handleRemoveSlide = useCallback((index) => {
    setSlides(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleDuplicateSlide = useCallback((index) => {
    setSlides(prev => {
      const clonedSlide = JSON.parse(JSON.stringify(prev[index]));
      const newSlides = [...prev];
      newSlides.splice(index + 1, 0, clonedSlide);
      return newSlides;
    });
  }, []);

  const handleMoveSlide = useCallback((fromIndex, toIndex) => {
    setSlides(prev => {
      if (toIndex < 0 || toIndex >= prev.length) return prev;
      const newSlides = [...prev];
      const [movedItem] = newSlides.splice(fromIndex, 1);
      newSlides.splice(toIndex, 0, movedItem);
      // Re-indexar a propriedade `slide`
      return newSlides.map((s, idx) => ({ ...s, slide: idx + 1 }));
    });
    // Limpar o array selecionado para prevenir referências mortas
    setSelectedElement(null);
  }, []);

  const handleAddSlide = useCallback((layoutType, insertIndex) => {
    setSlides(prev => {
      const newSlide = createSlideFromTemplate(layoutType, insertIndex + 1);
      if (!newSlide) return prev;
      const newSlides = [...prev];
      // insertIndex aponta para a posição APÓS o slide de referência
      newSlides.splice(insertIndex, 0, newSlide);
      // Re-indexar todos os slides
      return newSlides.map((s, idx) => ({ ...s, slide: idx + 1 }));
    });
    setSelectedElement(null);
  }, []);

  const handleSlideItemChange = useCallback((slideIndex, itemIndex, field, value) => {
    setSlides((prev) =>
      prev.map((s, i) => {
        if (i === slideIndex) {
          const newItems = [...(s.items || [])];
          newItems[itemIndex] = { ...newItems[itemIndex], [field]: value };
          return { ...s, items: newItems };
        }
        return s;
      })
    );
  }, []);

  const handleImageUpload = useCallback((index, event) => {
    const file = event.target.files[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setSlides((prev) =>
      prev.map((s, i) => (i === index ? { ...s, imageUrl, imagePosition: 50 } : s))
    );
  }, []);

  const [isInjecting, setIsInjecting] = useState(false);

  const handleInjectSlide = async (rawText, layoutKey, clearInput) => {
    setIsInjecting(true);
    setError('');
    
    // get API details via same schema as handleGenerate
    const provider = localStorage.getItem('alice_text_model_provider');
    const modelId = localStorage.getItem('alice_text_model_id');

    if (!provider || !modelId) {
      setError('Erro: Configure um modelo de Texto para Injeção (Engrenagem superior).');
      setIsInjecting(false);
      return;
    }

    const apiKey = localStorage.getItem(`alice_${provider}_api_key`);
    if (!apiKey) {
      setError(`Chave da API ausente para o provedor ${provider}. Verifique as configurações.`);
      setIsInjecting(false);
      return;
    }

    try {
      const generatedSlide = await generateSingleSlideContent(rawText, layoutKey, provider, modelId, apiKey);
      
      setSlides(prev => {
        const lastIsCta = prev.length > 0 && prev[prev.length - 1].layout === 'cta';
        const newArray = [...prev];
        if (lastIsCta) {
          // Injeta ANTES do CTA
          newArray.splice(newArray.length - 1, 0, generatedSlide);
        } else {
           // Se nao houver cta fixo no fin, poe no fin
          newArray.push(generatedSlide);
        }
        
        // Corrige numbering
        return newArray.map((s, i) => ({ ...s, slide: i + 1 }));
      });

      if (clearInput) clearInput();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Erro ao gerar o Slide Direto.');
      setTimeout(() => setError(''), 4000);
    } finally {
      setIsInjecting(false);
    }
  };

  const handleFavoriteSlide = useCallback((index) => {
    return new Promise((resolve) => {
       const slideToSave = slides[index];
       const defaultName = slideToSave.title || slideToSave.text || `Layout ${slideToSave.layout || 'Básico'}`;
       setFavoritePrompt({
          isOpen: true,
          slideIndex: index,
          defaultName,
          resolve
       });
    });
  }, [slides]);

  const confirmFavorite = async (customName) => {
     const { slideIndex, resolve } = favoritePrompt;
     setFavoritePrompt({ isOpen: false, slideIndex: null, defaultName: '', resolve: null });

     if (!customName) {
        resolve(false);
        return;
     }

     const slideToSave = slides[slideIndex];
     const finalSlide = { ...slideToSave, customFavoriteName: customName };

     try {
       await saveFavorite(finalSlide);
       const updated = await getFavorites();
       setFavorites(updated);
       resolve(true); // Retorna sucesso pro spinner
     } catch (e) {
       console.error(e);
       setError("Erro ao favoritar slide.");
       setTimeout(() => setError(''), 3000);
       resolve(false);
     }
  };

  const cancelFavorite = () => {
    if (favoritePrompt.resolve) favoritePrompt.resolve(false);
    setFavoritePrompt({ isOpen: false, slideIndex: null, defaultName: '', resolve: null });
  };

  const handleUseFavorite = useCallback((favoriteSlideData) => {
    setSlides(prev => {
       const newSlide = JSON.parse(JSON.stringify(favoriteSlideData)); 
       const newSlides = [...prev, newSlide];
       return newSlides.map((s, idx) => ({ ...s, slide: idx + 1 }));
    });
  }, []);

  const handleRemoveFavorite = useCallback(async (id) => {
    try {
      await removeFavorite(id);
      const updated = await getFavorites();
      setFavorites(updated);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleImagePosition = useCallback((index, value) => {
    setSlides((prev) => prev.map((s, i) => (i === index ? { ...s, imagePosition: value } : s)));
  }, []);

  const handleImageScale = useCallback((index, value) => {
    setSlides((prev) => prev.map((s, i) => (i === index ? { ...s, imageScale: value } : s)));
  }, []);

  const handleRemoveImage = useCallback((index) => {
    setSlides((prev) =>
      prev.map((s, i) =>
        i === index ? { ...s, imageUrl: null, imagePosition: 50, imageScale: 1 } : s
      )
    );
  }, []);

  const handleCoverVariantChange = useCallback((slideIndex, variantIndex) => {
    setSlides(prev => prev.map((s, i) =>
      i === slideIndex ? { ...s, coverVariantIndex: variantIndex } : s
    ));
  }, []);

  const handleSplitVariantChange = useCallback((slideIndex, variantIndex) => {
    setSlides(prev => prev.map((s, i) =>
      i === slideIndex ? { ...s, splitVariantIndex: variantIndex } : s
    ));
  }, []);

  const handleBigNumberVariantChange = useCallback((slideIndex, variantIndex) => {
    setSlides(prev => prev.map((s, i) =>
      i === slideIndex ? { ...s, bigNumberVariantIndex: variantIndex } : s
    ));
  }, []);

  const handleQuoteVariantChange = useCallback((slideIndex, variantIndex) => {
    setSlides(prev => prev.map((s, i) =>
      i === slideIndex ? { ...s, quoteVariantIndex: variantIndex } : s
    ));
  }, []);

  const handleComparisonVariantChange = useCallback((slideIndex, variantIndex) => {
    setSlides(prev => prev.map((s, i) =>
      i === slideIndex ? { ...s, comparisonVariantIndex: variantIndex } : s
    ));
  }, []);

  const handleCtaVariantChange = useCallback((slideIndex, variantIndex) => {
    setSlides(prev => prev.map((s, i) =>
      i === slideIndex ? { ...s, ctaVariantIndex: variantIndex } : s
    ));
  }, []);

  const handleListVariantChange = useCallback((slideIndex, variantIndex) => {
    setSlides(prev => prev.map((s, i) =>
      i === slideIndex ? { ...s, listVariantIndex: variantIndex } : s
    ));
  }, []);

  const handleImageFromUrl = useCallback((index, url) => {
    if (!url) return;
    setSlides((prev) =>
      prev.map((s, i) => (i === index ? { ...s, imageUrl: url, imagePosition: 50 } : s))
    );
  }, []);

  const handleGenerateImage = useCallback(
    async (index, prompt) => {
      setLoadingImages((prev) => ({ ...prev, [index]: true }));
      try {
        const imageProvider = localStorage.getItem('alice_image_model_provider');
        const imageModel = localStorage.getItem('alice_image_model_id');
        
        if (!imageProvider || !imageModel) {
          setError('Erro: Configure um modelo de Imagem para prosseguir.');
          setLoadingImages((prev) => ({ ...prev, [index]: false }));
          return;
        }
        
        const apiKey = localStorage.getItem(`alice_${imageProvider}_api_key`);
        if (!apiKey) {
          setError(`Erro: Chave API ausente para o provedor ${imageProvider}.`);
          setLoadingImages((prev) => ({ ...prev, [index]: false }));
          return;
        }

        const imageUrl = await generateImageWithAI(prompt, imageProvider, imageModel, apiKey);
        setSlides((prev) =>
          prev.map((s, i) => (i === index ? { ...s, imageUrl, imagePosition: 50 } : s))
        );
      } catch (err) {
        console.error(err);
        setError('Erro ao gerar imagem. A IA tá de greve, faz upload manual.');
      } finally {
        setLoadingImages((prev) => ({ ...prev, [index]: false }));
      }
    },
    []
  );

  const handleGenerate = useCallback(async () => {
    if (!theme.trim()) {
      setError('Digite um tema primeiro. Não sou telepata, Mr. Gustavo.');
      return;
    }

    const textProvider = localStorage.getItem('alice_text_model_provider');
    const textModel = localStorage.getItem('alice_text_model_id');

    if (!textProvider || !textModel) {
      setError('Erro: Configure um modelo de Texto para prosseguir.');
      return;
    }
    
    const apiKey = localStorage.getItem(`alice_${textProvider}_api_key`);
    if (!apiKey) {
      setError(`Erro: Chave API ausente para o provedor ${textProvider}.`);
      return;
    }

    setIsGenerating(true);
    setError('');
    setSlides([]);

    try {
      const parsedSlides = await generateCarouselContent(
        theme, slideCount, textProvider, textModel, apiKey, layoutSelection, creativeContext
      );
      setSlides(parsedSlides);
    } catch (err) {
      console.error(err);
      setError('Deu ruim na geração. Alice cansou, tente de novo.');
    } finally {
      setIsGenerating(false);
    }
  }, [theme, slideCount, creativeContext]);

  const handleExportAll = useCallback(async () => {
    setIsExporting(true);
    try {
      await exportAllToPNG(slides, brandHandle);
    } catch (err) {
      console.error('Erro ao exportar:', err);
      setError('Deu BO na hora de gerar os PNGs. O navegador arregou.');
    } finally {
      setIsExporting(false);
    }
  }, [slides, brandHandle]);

  const handleExportSlide = useCallback(async (index) => {
    setIsExporting(true);
    try {
      await exportSlideToPNG(index, brandHandle);
    } catch (err) {
      console.error(`Erro ao exportar slide ${index}:`, err);
      setError(`Deu BO na hora de exportar o slide ${index + 1}.`);
    } finally {
      setIsExporting(false);
    }
  }, [brandHandle]);

  const handleCopySlide = useCallback(
    (index) => {
      const slide = slides[index];
      const text = `Headline: ${slide.titulo}\nTexto: ${slide.texto_apoio}`;
      copyToClipboard(text).then(() => {
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      });
    },
    [slides]
  );

  const handleCopyAll = useCallback(() => {
    const allText = slides
      .map((s) => `[Slide ${s.slide} - ${s.layout}]\nHeadline: ${s.titulo}\nTexto: ${s.texto_apoio}\n`)
      .join('\n---\n\n');
    copyToClipboard(allText).then(() => {
      setCopiedIndex('all');
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  }, [slides]);

  // ========================================
  // RENDER
  // ========================================

  return (
    <div
      className="h-screen bg-[#050505] text-[#FFFFFF] font-sans flex overflow-hidden relative"
      style={dynamicStyles}
    >
      {splashStep < 3 && <div className="fixed inset-0 z-[9998] bg-[#0d0d0d]" />}
      {splashStep === 1 && <SplashScreen onComplete={() => setSplashStep(2)} />}
      {splashStep === 2 && <SplashScreenCinematic onComplete={() => setSplashStep(3)} />}
      
      {/* GLOBAL NAVIGATION BAR (Premium) */}
      <GlobalSidebar 
        currentView={view} 
        onNavigate={setView} 
        onOpenSettings={() => setIsSettingsOpen(true)} 
        onComingSoon={handleComingSoon}
        appLogoUrl={appLogoUrl}
        brandColor={gradientColor1}
      />

      {/* VIEW CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {view === 'home' ? (
          <div key="home" className="flex-1 flex flex-col animate-page-transition h-full">
            <Home onStartProject={() => setView('studio')} brandColor={gradientColor1} />
          </div>
        ) : view === 'coming-soon' ? (
          <ComingSoon 
            key="coming-soon"
            onBack={() => setView('studio')} 
            brandColor={gradientColor1} 
            icon={comingSoonData.icon} 
            label={comingSoonData.label} 
          />
        ) : (
          <div key="studio" className="flex-1 flex flex-col animate-page-transition h-full">
            {/* Favorite Modal */}
            <FavoriteNameModal 
              isOpen={favoritePrompt.isOpen}
              defaultName={favoritePrompt.defaultName}
              onConfirm={confirmFavorite}
              onCancel={cancelFavorite}
              brandColor={gradientColor1}
            />

            {/* Google Fonts */}
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=${titleFont.replace(/ /g, '+')}:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,700;1,800&family=${textFont.replace(/ /g, '+')}:ital,wght@0,400;0,500;0,700;0,900;1,400;1,500;1,700&display=swap');
            `}</style>

            {/* NAVBAR (Studio Only) */}
            <div className={`transition-all duration-150 ease-in-out origin-top border-b border-[#FFFFFF]/5 bg-[#000000]/80 backdrop-blur-3xl z-[100] relative flex flex-col ${isNavbarOpen ? 'h-20' : 'h-0 overflow-hidden border-transparent'}`}>
              <nav className="h-20 px-8 flex flex-wrap items-center justify-between shrink-0">
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-4 group cursor-pointer" onClick={() => setView('home')}>
                    <div className="flex flex-col">
                      <span className="font-outfit font-black text-lg tracking-tighter leading-none uppercase text-white">
                        Carrossel <span style={{ color: gradientColor1 }}>Studio</span>
                      </span>
                      <span className="text-[10px] font-bold text-zinc-500 tracking-widest mt-1 uppercase">
                        Sistema inteligente para criação de carrosséis de alta performance
                      </span>
                    </div>
                  </div>
                </div>
              </nav>
            </div>

            {/* NAVBAR TOGGLE BUTTON */}
            <button 
              onClick={() => setIsNavbarOpen(!isNavbarOpen)}
              className="absolute top-0 right-1/2 translate-x-1/2 lg:right-10 lg:translate-x-0 z-[110] bg-surface-card/90 border border-border-subtle border-t-0 rounded-b-xl px-4 py-1.5 text-zinc-500 hover:text-white transition-colors shadow-lg backdrop-blur-md"
            >
              {isNavbarOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {/* STUDIO WORKSPACE LAYOUT */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative group/layout">
              {/* Secondary Sidebar (Properties/Config) */}
              <div 
                className={`flex shrink-0 transition-all duration-150 ease-in-out overflow-hidden ${isSidebarCollapsed ? 'w-0' : ''}`}
                style={{ width: isSidebarCollapsed ? 0 : sidebarWidth }}
              >
                <ConfigSidebar
                  width={sidebarWidth}
                  brandHandle={brandHandle}
                  setBrandHandle={setBrandHandle}
                  showBrandHandle={showBrandHandle}
                  setShowBrandHandle={setShowBrandHandle}
                  brandAvatar={brandAvatar}
                  setBrandAvatar={setBrandAvatar}
                  isVerified={isVerified}
                  setIsVerified={setIsVerified}
                  gradientColor1={gradientColor1}
                  setGradientColor1={setGradientColor1}
                  titleSizeScale={titleSizeScale}
                  setTitleSizeScale={setTitleSizeScale}
                  textSizeScale={textSizeScale}
                  setTextSizeScale={setTextSizeScale}
                  cardBorderRadius={cardBorderRadius}
                  setCardBorderRadius={setCardBorderRadius}
                  imageBorderRadius={imageBorderRadius}
                  setImageBorderRadius={setImageBorderRadius}
                  theme={theme}
                  setTheme={setTheme}
                  creativeContext={creativeContext}
                  setCreativeContext={(newCtx) => {
                    setCreativeContext(newCtx);
                    localStorage.setItem('alice_creative_context', JSON.stringify(newCtx));
                  }}
                  slideCount={slideCount}
                  setSlideCount={setSlideCount}
                  layoutSelection={layoutSelection}
                  setLayoutSelection={setLayoutSelection}
                  onGenerate={handleGenerate}
                  isGenerating={isGenerating}
                  error={error}
                  setIsSettingsOpen={setIsSettingsOpen}
                  selectedElement={selectedElement}
                  setSelectedElement={setSelectedElement}
                  slides={slides}
                  setSlides={setSlides}
                  onImageUpload={handleImageUpload}
                  onImagePosition={handleImagePosition}
                  onImageScale={handleImageScale}
                  onRemoveImage={handleRemoveImage}
                  titleFont={titleFont}
                  setTitleFont={setTitleFont}
                  textFont={textFont}
                  setTextFont={setTextFont}
                  favorites={favorites}
                  onUseFavorite={handleUseFavorite}
                  onRemoveFavorite={handleRemoveFavorite}
                  onInjectSlide={handleInjectSlide}
                  isInjecting={isInjecting}
                  showSlideCounter={showSlideCounter}
                  setShowSlideCounter={setShowSlideCounter}
                  slideCounterPosition={slideCounterPosition}
                  setSlideCounterPosition={setSlideCounterPosition}
                  onComingSoon={handleComingSoon}
                />
              </div>

              {/* Toggle Sidebar Button */}
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className={`alice-collapse-btn opacity-0 group-hover/layout:opacity-100 transition-opacity duration-150 ${isSidebarCollapsed ? 'collapsed opacity-100' : ''}`}
                style={{ 
                  left: isSidebarCollapsed ? '0' : `${sidebarWidth}px`,
                }}
                title={isSidebarCollapsed ? "Expandir Painel" : "Recolher Painel"}
              >
                {isSidebarCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
              </button>

              {/* Resize Handle */}
              <div 
                onMouseDown={() => !isSidebarCollapsed && setIsResizingSidebar(true)}
                className={`alice-resize-handle group ${isResizingSidebar ? 'alice-resize-handle-active' : ''} ${isSidebarCollapsed ? 'pointer-events-none opacity-0' : ''}`}
                style={{ '--color-handle': isResizingSidebar ? gradientColor1 : undefined }}
              />

              {/* Workspace */}
              <main 
                className="flex-1 bg-[#0a0a0a] relative flex flex-col p-4 md:p-8 overflow-y-auto overflow-x-hidden custom-scrollbar"
                onClick={() => setSelectedElement(null)}
              >
                <SettingsModal 
                  isOpen={isSettingsOpen} 
                  onClose={() => setIsSettingsOpen(false)} 
                  brandColor={gradientColor1}
                  onBrandColorChange={setGradientColor1}
                  appLogoUrl={appLogoUrl}
                  onLogoChange={(url) => {
                    setAppLogoUrl(url);
                    if (url) localStorage.setItem('alice_app_logo', url);
                    else localStorage.removeItem('alice_app_logo');
                  }}
                />
                {slides.length === 0 && !isGenerating ? (
                  <EmptyState brandColor={gradientColor1} />
                ) : isGenerating ? (
                  <LoadingState brandColor={gradientColor1} />
                ) : (
                  <div className="space-y-6 max-w-full">
                    <WorkspaceToolbar
                      slides={slides}
                      viewMode={viewMode}
                      setViewMode={setViewMode}
                      showMetrics={showMetrics}
                      setShowMetrics={setShowMetrics}
                      onExportAll={handleExportAll}
                      onCopyAll={handleCopyAll}
                      isExporting={isExporting}
                      copiedIndex={copiedIndex}
                      brandColor={gradientColor1}
                    />

                    {viewMode === 'text' ? (
                      <TextEditor
                        slides={slides}
                        brandColor={gradientColor1}
                        onTextChange={handleSlideTextChange}
                        onImageUpload={handleImageUpload}
                        onImagePosition={handleImagePosition}
                        onImageScale={handleImageScale}
                        onGenerateImage={handleGenerateImage}
                        loadingImages={loadingImages}
                      />
                    ) : (
                      <VisualPreview
                        slides={slides}
                        slideCount={slideCount}
                        brandHandle={brandHandle}
                        showBrandHandle={showBrandHandle}
                        brandAvatar={brandAvatar}
                        brandColor={gradientColor1}
                        isVerified={isVerified}
                        titleScale={titleSizeScale}
                        textScale={textSizeScale}
                        showMetrics={showMetrics}
                        onActionStart={handleActionStart}
                        onTextChange={handleSlideTextChange}
                        onItemChange={handleSlideItemChange}
                        onImageUpload={handleImageUpload}
                        onImagePosition={handleImagePosition}
                        onImageScale={handleImageScale}
                        onRemoveImage={handleRemoveImage}
                        onImageFromUrl={handleImageFromUrl}
                        onCopySlide={handleCopySlide}
                        onExportSlide={handleExportSlide}
                        onResetPositions={resetSlidePositions}
                        onRemoveSlide={handleRemoveSlide}
                        onDuplicateSlide={handleDuplicateSlide}
                        onFavoriteSlide={handleFavoriteSlide}
                        onMoveSlide={handleMoveSlide}
                        onAddSlide={handleAddSlide}
                        onCoverVariantChange={handleCoverVariantChange}
                        onSplitVariantChange={handleSplitVariantChange}
                        onBigNumberVariantChange={handleBigNumberVariantChange}
                        onQuoteVariantChange={handleQuoteVariantChange}
                        onComparisonVariantChange={handleComparisonVariantChange}
                        onCtaVariantChange={handleCtaVariantChange}
                        onListVariantChange={handleListVariantChange}
                        copiedIndex={copiedIndex}
                        selectedElement={selectedElement}
                        isExporting={isExporting}
                        onSelectElement={(index, field) => setSelectedElement({ slideIndex: index, field })}
                        showSlideCounter={showSlideCounter}
                        slideCounterPosition={slideCounterPosition}
                      />
                    )}
                  </div>
                )}
              </main>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

