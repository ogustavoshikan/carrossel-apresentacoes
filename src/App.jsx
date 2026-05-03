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
import { FloatingChat } from './components/FloatingChat';
import ConfigSidebar from './components/sidebar/ConfigSidebar';
import WorkspaceToolbar from './components/workspace/WorkspaceToolbar';
import VisualPreview from './components/workspace/VisualPreview';
import TextEditor from './components/workspace/TextEditor';
import { EmptyState, LoadingState } from './components/workspace/EmptyState';
import SettingsModal from './components/SettingsModal';
import InstagramPreview from './components/workspace/InstagramPreview';
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
  const [studioActiveTab, setStudioActiveTab] = useState('ajustes');
  const [theme, setTheme] = useState('');
  const [contextUrls, setContextUrls] = useState([]);
  const [creativeContext, setCreativeContext] = useState(() => {
    try {
      const saved = localStorage.getItem('cs_creative_context');
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
  const [isInstagramPreviewOpen, setIsInstagramPreviewOpen] = useState(false);

  const [selectedElement, setSelectedElement] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [layoutSelection, setLayoutSelection] = useState({
    mode: 'ai', // 'ai' | 'manual'
    layouts: {}, // { 'content-split': 2, 'big-number': 1, ... }
  });

  // Brand Customization
  const [brandHandle, setBrandHandle] = useState(BRAND_DEFAULTS.handle);
  const [showBrandHandle, setShowBrandHandle] = useState(true);
  const [brandAvatar, setBrandAvatar] = useState(null);
  const [brandLogo, setBrandLogo] = useState(() => localStorage.getItem('cs_brand_logo') || null);
  const [showBrandLogo, setShowBrandLogo] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (brandLogo) {
      localStorage.setItem('cs_brand_logo', brandLogo);
    } else {
      localStorage.removeItem('cs_brand_logo');
    }
  }, [brandLogo]);

  useEffect(() => {
    // Configurações padrão para Geração de Imagem via OpenRouter
    if (!localStorage.getItem('cs_image_model_provider')) {
      localStorage.setItem('cs_image_model_provider', 'openrouter');
      localStorage.setItem('cs_image_model_id', 'google/gemini-2.5-flash-image');
    }

    // Configurações padrão para Texto via OpenRouter (Gemini Flash Lite Free)
    if (!localStorage.getItem('cs_text_model_provider')) {
      localStorage.setItem('cs_text_model_provider', 'openrouter');
      localStorage.setItem('cs_text_model_id', 'google/gemini-2.0-flash-lite:free');
    }

    getFavorites().then(setFavorites).catch(console.error);
  }, []);
  
  const [favoritePrompt, setFavoritePrompt] = useState({ isOpen: false, slideIndex: null, defaultName: '', resolve: null });
  const [isVerified, setIsVerified] = useState(BRAND_DEFAULTS.isVerified);
  const [gradientColor1, setGradientColor1] = useState(BRAND_DEFAULTS.gradientColor1);
  const [titleSizeScale, setTitleSizeScale] = useState(65);
  const [textSizeScale, setTextSizeScale] = useState(70);
  const [cardBorderRadius, setCardBorderRadius] = useState(0);
  const [imageBorderRadius, setImageBorderRadius] = useState(40);
  const [isExporting, setIsExporting] = useState(false);
  const [titleFont, setTitleFont] = useState(BRAND_DEFAULTS.titleFont);
  const [textFont, setTextFont] = useState(BRAND_DEFAULTS.textFont);
  const [tagFont, setTagFont] = useState(BRAND_DEFAULTS.titleFont); // Default tag font is same as title font initially
  const [appLogoUrl, setAppLogoUrl] = useState(() => localStorage.getItem('cs_app_logo') || '');

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

  // Gerenciamento dinâmico de fontes (Google Fonts) com CORS
  useEffect(() => {
    // Coleta todas as fontes únicas em uso (globais + individuais de cada slide)
    const fontsInUse = new Set([titleFont, textFont, tagFont]);
    if (Array.isArray(slides)) {
      slides.forEach(s => {
        if (s.titleFont) fontsInUse.add(s.titleFont);
        if (s.textFont) fontsInUse.add(s.textFont);
        if (s.tagFont) fontsInUse.add(s.tagFont);
      });
    }

    const families = Array.from(fontsInUse).map(f => {
      const name = f.replace(/ /g, '+');
      return `family=${name}:wght@400;500;700;800;900`;
    }).join('&');
    
    if (families) {
      const url = `https://fonts.googleapis.com/css2?${families}&display=swap`;
      let link = document.getElementById('dynamic-google-fonts');
      if (!link) {
        link = document.createElement('link');
        link.id = 'dynamic-google-fonts';
        link.rel = 'stylesheet';
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      }
      link.href = url;
    }
  }, [titleFont, textFont, tagFont, slides]);

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

  const handleAddSlide = useCallback((layoutType, insertIndex, variantIndex = 0) => {
    setSlides(prev => {
      const currentSlides = Array.isArray(prev) ? prev : [];
      // Se não houver slides, o insertIndex deve ser obrigatoriamente 0
      const targetIndex = currentSlides.length === 0 ? 0 : insertIndex;
      const newSlide = createSlideFromTemplate(layoutType, targetIndex + 1, variantIndex);
      
      if (!newSlide) return currentSlides;
      
      const newSlides = [...currentSlides];
      // Garante que o index de inserção não ultrapasse o tamanho do array
      const finalIndex = Math.min(Math.max(0, targetIndex), newSlides.length);
      
      newSlides.splice(finalIndex, 0, newSlide);
      
      // Re-indexar todos os slides para manter a ordem correta na propriedade 'slide'
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

  const handleImageUpload = useCallback((index, event, slot = 1) => {
    const file = event.target.files[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    const urlField = slot === 1 ? 'imageUrl' : `imageUrl${slot}`;
    const posField = slot === 1 ? 'imagePosition' : `imagePosition${slot}`;
    setSlides((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [urlField]: objectUrl, [posField]: 50 } : s))
    );
  }, []);

  const [isInjecting, setIsInjecting] = useState(false);

  const handleInjectSlide = async (rawText, layoutKey, clearInput) => {
    setIsInjecting(true);
    setError('');
    
    // get API details via same schema as handleGenerate
    const provider = localStorage.getItem('cs_text_model_provider');
    const modelId = localStorage.getItem('cs_text_model_id');

    if (!provider || !modelId) {
      setError('Erro: Configure um modelo de Texto para Injeção (Engrenagem superior).');
      setIsInjecting(false);
      return;
    }

    const apiKey = localStorage.getItem(`cs_${provider}_api_key`);
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

   const handleInsertFavorite = useCallback((favoriteSlideData, insertIndex) => {
    setSlides(prev => {
       const newSlide = JSON.parse(JSON.stringify(favoriteSlideData));
       const newSlides = [...prev];
       newSlides.splice(insertIndex, 0, newSlide);
       return newSlides.map((s, idx) => ({ ...s, slide: idx + 1 }));
    });
  }, []);

   const handleRemoveFavorite = useCallback(async (id) => {    try {
      await removeFavorite(id);
      const updated = await getFavorites();
      setFavorites(updated);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleImagePosition = useCallback((index, value, slot = 1) => {
    const field = slot === 1 ? 'imagePosition' : `imagePosition${slot}`;
    setSlides((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  }, []);

  const handleImageScale = useCallback((index, value, slot = 1) => {
    const field = slot === 1 ? 'imageScale' : `imageScale${slot}`;
    setSlides((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  }, []);

  const handleRemoveImage = useCallback((index, slot = 1) => {
    const urlField = slot === 1 ? 'imageUrl' : `imageUrl${slot}`;
    const posField = slot === 1 ? 'imagePosition' : `imagePosition${slot}`;
    const scaleField = slot === 1 ? 'imageScale' : `imageScale${slot}`;
    setSlides((prev) =>
      prev.map((s, i) =>
        i === index ? { ...s, [urlField]: null, [posField]: 50, [scaleField]: 1 } : s
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

  const handleSequenceVariantChange = useCallback((slideIndex, variantIndex) => {
    setSlides(prev => prev.map((s, i) =>
      i === slideIndex ? { ...s, sequenceVariantIndex: variantIndex } : s
    ));
  }, []);

  const handleImageFromUrl = useCallback((index, url, slot = 1) => {
    if (!url) return;
    const urlField = slot === 1 ? 'imageUrl' : `imageUrl${slot}`;
    const posField = slot === 1 ? 'imagePosition' : `imagePosition${slot}`;
    setSlides((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [urlField]: url, [posField]: 50 } : s))
    );
  }, []);

  const handleGenerateImage = useCallback(
    async (index, prompt) => {
      setLoadingImages((prev) => ({ ...prev, [index]: true }));
      try {
        const imageProvider = localStorage.getItem('cs_image_model_provider');
        const imageModel = localStorage.getItem('cs_image_model_id');
        
        if (!imageProvider || !imageModel) {
          setError('Erro: Configure um modelo de Imagem para prosseguir.');
          setLoadingImages((prev) => ({ ...prev, [index]: false }));
          return;
        }
        
        const apiKey = localStorage.getItem(`cs_${imageProvider}_api_key`);
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

    const textProvider = localStorage.getItem('cs_text_model_provider');
    const textModel = localStorage.getItem('cs_text_model_id');

    if (!textProvider || !textModel) {
      setError('Erro: Configure um modelo de Texto para prosseguir.');
      return;
    }
    
    const apiKey = localStorage.getItem(`cs_${textProvider}_api_key`);
    if (!apiKey) {
      setError(`Erro: Chave API ausente para o provedor ${textProvider}.`);
      return;
    }

    setIsGenerating(true);
    setError('');
    setSlides([]);

    try {
      const parsedSlides = await generateCarouselContent(
        theme, slideCount, textProvider, textModel, apiKey, layoutSelection, creativeContext, contextUrls
      );
      
      // Geração Automática de Imagens via IA (se configurado)
      const imageProvider = localStorage.getItem('cs_image_model_provider');
      const imageModel = localStorage.getItem('cs_image_model_id');
      const imageApiKey = localStorage.getItem(`cs_${imageProvider}_api_key`);

      if (imageProvider && imageModel && imageApiKey && imageProvider !== 'unsplash') {
        setSlides(parsedSlides); // Mostra o texto primeiro
        
        const slidesWithAIImages = await Promise.all(parsedSlides.map(async (s, idx) => {
          const isImageLayout = ['cover', 'content-split', 'big-number'].includes(s.layout);
          if (isImageLayout && s.sugestao_visual) {
            try {
              setLoadingImages(prev => ({ ...prev, [idx]: true }));
              const aiImageUrl = await generateImageWithAI(s.sugestao_visual, imageProvider, imageModel, imageApiKey);
              return { ...s, imageUrl: aiImageUrl };
            } catch (err) {
              console.error(`Erro na imagem do slide ${idx}:`, err);
              return s;
            } finally {
              setLoadingImages(prev => ({ ...prev, [idx]: false }));
            }
          }
          return s;
        }));
        setSlides(slidesWithAIImages);
      } else {
        setSlides(parsedSlides);
      }
    } catch (err) {
      console.error(err);
      setError('Deu ruim na geração. O Studio cansou, tente de novo.');
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

  const dynamicStyles = {
    '--color-brand': gradientColor1,
    '--color-brand-glow': `${gradientColor1}40`,
    '--font-title': titleFont,
    '--font-text': textFont,
    '--font-tag': tagFont,
    '--radius-slide': `${cardBorderRadius}px`,
    '--radius-inner': `${imageBorderRadius * 0.8}px`,
    '--radius-sm': `${imageBorderRadius * 0.6}px`,
  };

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
        comingSoonData={comingSoonData}
        appLogoUrl={appLogoUrl}
        brandColor={gradientColor1}
      />

      {/* VIEW CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {view === 'home' ? (
          <div key="home" className="flex-1 flex flex-col animate-page-transition h-full">
            <Home 
              onStartProject={(tab) => {
                setView('studio');
                setStudioActiveTab(typeof tab === 'string' ? tab : 'ajustes');
              }} 
              brandColor={gradientColor1} 
            />
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

            {/* STUDIO WORKSPACE LAYOUT */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative group/layout">
              {/* Secondary Sidebar (Properties/Config) */}
              <div 
                className={`flex shrink-0 transition-all duration-150 ease-in-out overflow-hidden ${isSidebarCollapsed ? 'w-0' : ''}`}
                style={{ width: isSidebarCollapsed ? 0 : sidebarWidth }}
              >
                <ConfigSidebar
                  width={sidebarWidth}
                  activeTab={studioActiveTab}
                  setActiveTab={setStudioActiveTab}
                  brandHandle={brandHandle}
                  setBrandHandle={setBrandHandle}
                  showBrandHandle={showBrandHandle}
                  setShowBrandHandle={setShowBrandHandle}
                  brandAvatar={brandAvatar}
                  setBrandAvatar={setBrandAvatar}
                  brandLogo={brandLogo}
                  setBrandLogo={setBrandLogo}
                  showBrandLogo={showBrandLogo}
                  setShowBrandLogo={setShowBrandLogo}
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
                  contextUrls={contextUrls}
                  setContextUrls={setContextUrls}
                  creativeContext={creativeContext}
                  setCreativeContext={(newCtx) => {
                    setCreativeContext(newCtx);
                    localStorage.setItem('cs_creative_context', JSON.stringify(newCtx));
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
                  tagFont={tagFont}
                  setTagFont={setTagFont}
                  favorites={favorites}
                  onUseFavorite={handleUseFavorite}
                  onRemoveFavorite={handleRemoveFavorite}
                  onInjectSlide={handleInjectSlide}
                  isInjecting={isInjecting}
                  onAddSlide={handleAddSlide}
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
                className={`cs-collapse-btn opacity-0 group-hover/layout:opacity-100 transition-opacity duration-150 ${isSidebarCollapsed ? 'collapsed opacity-100' : ''}`}
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
                className={`cs-resize-handle group ${isResizingSidebar ? 'cs-resize-handle-active' : ''} ${isSidebarCollapsed ? 'pointer-events-none opacity-0' : ''}`}
                style={{ '--color-handle': isResizingSidebar ? gradientColor1 : undefined }}
              />

              {/* Workspace */}
              <main 
                className="flex-1 bg-[#0a0a0a] relative flex flex-col px-4 md:px-8 pb-4 md:pb-8 pt-0 overflow-y-auto overflow-x-hidden custom-scrollbar"
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
                    if (url) localStorage.setItem('cs_app_logo', url);
                    else localStorage.removeItem('cs_app_logo');
                  }}
                />
                <InstagramPreview
                  isOpen={isInstagramPreviewOpen}
                  onClose={() => setIsInstagramPreviewOpen(false)}
                  slides={slides}
                  brandHandle={brandHandle}
                  brandAvatar={brandAvatar}
                  isVerified={isVerified}
                  brandColor={gradientColor1}
                  brandLogo={brandLogo}
                  showBrandHandle={showBrandHandle}
                  showBrandLogo={showBrandLogo}
                  titleScale={titleSizeScale}
                  textScale={textSizeScale}
                  titleFont={titleFont}
                  textFont={textFont}
                  tagFont={tagFont}
                  showSlideCounter={showSlideCounter}
                  slideCounterPosition={slideCounterPosition}
                />
                {slides.length === 0 && !isGenerating ? (
                  <EmptyState brandColor={gradientColor1} />
                ) : isGenerating ? (
                  <LoadingState brandColor={gradientColor1} />
                ) : (
                  <div className="space-y-3 max-w-full">
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
                      onInstagramPreview={() => setIsInstagramPreviewOpen(true)}
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
                        brandLogo={brandLogo}
                        showBrandLogo={showBrandLogo}
                        brandColor={gradientColor1}
                        isVerified={isVerified}
                        titleScale={titleSizeScale}
                        textScale={textSizeScale}
                        titleFont={titleFont}
                        textFont={textFont}
                        tagFont={tagFont}
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
                        onAddFavorite={handleInsertFavorite}
                        favorites={favorites}
                        onCoverVariantChange={handleCoverVariantChange}
                        onSplitVariantChange={handleSplitVariantChange}
                        onBigNumberVariantChange={handleBigNumberVariantChange}
                        onQuoteVariantChange={handleQuoteVariantChange}
                        onComparisonVariantChange={handleComparisonVariantChange}
                        onCtaVariantChange={handleCtaVariantChange}
                        onListVariantChange={handleListVariantChange}
                        onSequenceVariantChange={handleSequenceVariantChange}
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

      {/* AI Assistant Chat */}
      {view === 'studio' && <FloatingChat />}
    </div>
  );
}
