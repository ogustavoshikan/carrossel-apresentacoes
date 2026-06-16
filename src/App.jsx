import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ChevronUp, ChevronDown, Cake, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDragResize } from './hooks/useDragResize';
import { generateCarouselContent, generateImageWithAI, generateSingleSlideContent } from './services/ai';
import { exportAllToPNG, exportSlideToPNG } from './services/export';
import { copyToClipboard } from './lib/clipboard';
import { BRAND_DEFAULTS, SLIDE_COUNT_RANGE, SYSTEM_FONTS, GOOGLE_FONTS_WEIGHTS } from './lib/design-tokens';
import { createSlideFromTemplate } from './lib/layout-templates';
import { LAYOUT_META } from './lib/layout-templates';
import { getFavorites, saveFavorite, removeFavorite } from './lib/favorites';
import { SelectionContext } from './lib/selection-context';

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
import SplashScreenIntro from './components/SplashScreenIntro';
import SplashScreenCinematic from './components/SplashScreenCinematic';
import Home from './components/Home';
import GlobalSidebar from './components/GlobalSidebar';
import ComingSoon from './components/workspace/ComingSoon';
import { CanvasEditorPage } from './components/editor/CanvasEditorPage';

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
  // Multi-seleção de SmartElements (Ctrl+A, Shift+Click)
  const [selectedElements, setSelectedElements] = useState(new Set());
  const isShiftHeldRef = useRef(false);
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
  const [headerFont, setHeaderFont] = useState(BRAND_DEFAULTS.headerFont);
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
  const { handleActionStart, resetSlidePositions } = useDragResize(slides, setSlides, selectedElements);

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
    const fontsInUse = new Set([titleFont, textFont, tagFont, headerFont]);
    if (Array.isArray(slides)) {
      slides.forEach(s => {
        if (s.titleFont) fontsInUse.add(s.titleFont);
        if (s.textFont) fontsInUse.add(s.textFont);
        if (s.tagFont) fontsInUse.add(s.tagFont);
      });
    }

    const families = Array.from(fontsInUse)
      .filter(f => f && !SYSTEM_FONTS.includes(f))
      .map(f => {
        const name = f.replace(/ /g, '+');
        const weights = GOOGLE_FONTS_WEIGHTS[f] || '400;700';
        return `family=${name}:wght@${weights}`;
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
  }, [titleFont, textFont, tagFont, headerFont, slides]);

  // Teclado: Movimentação de elementos selecionados com as setas (2px por vez)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const active = document.activeElement;
      const isTyping = active && (
        active.tagName === 'INPUT' ||
        active.tagName === 'TEXTAREA' ||
        active.isContentEditable
      );

      // Ctrl+A — Selecionar todos os SmartElements visiveis no canvas
      if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
        const isInSidebarField = active && (
          active.tagName === 'INPUT' || active.tagName === 'TEXTAREA'
        );
        if (isInSidebarField) return;
        e.preventDefault();
        const all = document.querySelectorAll('[id^="smart-"]');
        const keys = new Set();
        all.forEach(el => {
          // ID: smart-{slideIndex}-{field}
          const withoutPrefix = el.id.slice('smart-'.length);
          const dash = withoutPrefix.indexOf('-');
          if (dash > -1) {
            keys.add(`${withoutPrefix.substring(0, dash)}:${withoutPrefix.substring(dash + 1)}`);
          }
        });
        setSelectedElements(keys);
        return;
      }

      // Escape — Limpar seleção (pai + multi-seleção)
      if (e.key === 'Escape') {
        setSelectedElement(null);
        setSelectedElements(new Set());
        return;
      }

      // Movimentação com setas — só quando há elemento selecionado
      if (!selectedElement) return;
      if (isTyping) return; // não movimentar se o usuário estiver digitando

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

        // Conjunto de elementos a mover: selectedElements (multi) ou apenas o pai
        const targets = selectedElements.size > 0 ? selectedElements : new Set([`${slideIndex}:${field}`]);

        targets.forEach(key => {
          const [si, ...fieldParts] = key.split(':');
          const f = fieldParts.join(':');
          const idx = parseInt(si);
          if (idx < 0 || idx >= newSlides.length) return;
          const slide = { ...newSlides[idx] };
          const positions = { ...(slide.positions || {}) };
          const currentPos = positions[f] || { x: 0, y: 0, scale: 1, rotation: 0 };
          positions[f] = {
            ...currentPos,
            x: (currentPos.x || 0) + dx,
            y: (currentPos.y || 0) + dy,
          };
          slide.positions = positions;
          newSlides[idx] = slide;
        });

        return newSlides;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElement, selectedElements, slides, setSlides]);

  // Rastrear tecla Shift para multi-seleção de elementos
  useEffect(() => {
    const onKeyDown = (e) => { if (e.key === 'Shift') isShiftHeldRef.current = true; };
    const onKeyUp   = (e) => { if (e.key === 'Shift') isShiftHeldRef.current = false; };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);


  // ========================================
  // HANDLERS
  // ========================================

  const handleSlideTextChange = useCallback((index, field, value) => {
    setSlides((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  }, []);

  const handleRemoveSlide = useCallback((index) => {
    setSlides(prev => prev.filter((_, i) => i !== index));
    setSelectedElements(new Set());
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
    // Limpar seleções para prevenir referências mortas
    setSelectedElement(null);
    setSelectedElements(new Set());
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

  const handleImagePositionX = useCallback((index, value, slot = 1) => {
    const field = slot === 1 ? 'imagePositionX' : `imagePositionX${slot}`;
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
        setError('Não foi possível gerar a imagem. Faça o upload manualmente ou tente novamente.');
      } finally {
        setLoadingImages((prev) => ({ ...prev, [index]: false }));
      }
    },
    []
  );

  const handleGenerate = useCallback(async () => {
    if (!theme.trim()) {
      setError('Insira um tema antes de gerar o carrossel.');
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
    setSelectedElements(new Set());

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
      setError('Falha ao gerar o carrossel. Verifique sua conexão ou chave de API e tente novamente.');
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
      setError('Erro ao exportar os slides. Tente novamente ou reduza o número de slides.');
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
      setError(`Erro ao exportar o slide ${index + 1}. Tente novamente.`);
    } finally {
      setIsExporting(false);
    }
  }, [brandHandle]);

  const handleCopySlide = useCallback(
    (index) => {
      const slide = slides[index];
      const stripTags = (str) => (str ? str.replace(/<[^>]*>/g, '') : '');
      const text = `Headline: ${stripTags(slide.titulo)}\nTexto: ${stripTags(slide.texto_apoio)}`;
      copyToClipboard(text).then(() => {
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      });
    },
    [slides]
  );

  const handleCopyAll = useCallback(() => {
    const stripTags = (str) => (str ? str.replace(/<[^>]*>/g, '') : '');
    const allText = slides
      .map((s) => `[Slide ${s.slide} - ${s.layout}]\nHeadline: ${stripTags(s.titulo)}\nTexto: ${stripTags(s.texto_apoio)}\n`)
      .join('\n---\n\n');
    copyToClipboard(allText).then(() => {
      setCopiedIndex('all');
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  }, [slides]);

  const handleEditInCanvas = useCallback(() => {
    if (!slides || slides.length === 0) {
      alert('Não há slides ativos para editar no Canvas.');
      return;
    }

    // Função interna para conversão de cores RGB/RGBA do DOM para HEX
    const rgbToHex = (rgb) => {
      if (!rgb) return '#FFFFFF';
      if (rgb.startsWith('#')) return rgb;
      const match = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/);
      if (!match) return '#FFFFFF';
      const r = parseInt(match[1], 10);
      const g = parseInt(match[2], 10);
      const b = parseInt(match[3], 10);
      return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    };

    try {
      // Converte o carrossel do Studio para a estrutura compatível com o OpenPolotno
      const canvasJson = {
        width: 1080,
        height: 1350,
        pages: slides.map((slide, index) => {
          let children = [];
          let background = '#0D0D11';

          // ───────── FLUXO A: DOM PARSER DINÂMICO (FIDELIDADE 100% PARA 300+ VARIANTES) ─────────
          const slideDom = document.getElementById(`slide-card-${index}`);
          if (slideDom) {
            try {
              const rect = slideDom.getBoundingClientRect();
              const scaleX = 1080 / rect.width;
              const scaleY = 1350 / rect.height;

              // Extrai cor de fundo computada do slide-card ou do primeiro filho
              const computedBg = window.getComputedStyle(slideDom).backgroundColor;
              if (computedBg && computedBg !== 'rgba(0, 0, 0, 0)' && computedBg !== 'transparent') {
                background = rgbToHex(computedBg);
              } else {
                const firstChild = slideDom.firstElementChild;
                if (firstChild) {
                  const childBg = window.getComputedStyle(firstChild).backgroundColor;
                  if (childBg && childBg !== 'rgba(0, 0, 0, 0)' && childBg !== 'transparent') {
                    background = rgbToHex(childBg);
                  }
                }
              }

              // Função auxiliar para identificar se um nó faz parte da interface de edição/arraste do Studio
              const isUiControl = (el) => {
                let curr = el;
                while (curr && curr !== slideDom) {
                  const title = curr.getAttribute('title');
                  if (title && (
                    title.includes('Mover') || 
                    title.includes('Rotacionar') || 
                    title.includes('Redimensionar') || 
                    title.includes('Mova live')
                  )) {
                    return true;
                  }
                  const className = curr.className || '';
                  if (typeof className === 'string' && (
                    className.includes('cursor-move') ||
                    className.includes('cursor-ew-resize') ||
                    className.includes('cursor-nwse-resize') ||
                    className.includes('group-hover/smart') ||
                    className.includes('pointer-events-none') ||
                    className.includes('lucide')
                  )) {
                    // Mas permite SVGs normais decorativos
                    if (curr.tagName.toLowerCase() === 'svg' && !curr.closest('.pointer-events-none') && !curr.closest('.lucide')) {
                      // Permitido
                    } else {
                      return true;
                    }
                  }
                  curr = curr.parentElement;
                }
                return false;
              };

              // 1. Extrair Elementos Gráficos (Retângulos / Contornos / Linhas)
              const divs = slideDom.querySelectorAll('div');
              divs.forEach((div, divIdx) => {
                if (div === slideDom) return;
                if (isUiControl(div)) return; // Ignora controles do Studio

                const style = window.getComputedStyle(div);
                const bgColor = style.backgroundColor;
                const border = style.borderStyle;
                const strokeColor = style.borderColor;
                const strokeWidth = parseFloat(style.borderWidth) || 0;
                const borderRadius = parseFloat(style.borderRadius) || 0;
                const opacity = parseFloat(style.opacity) || 1;

                const hasBg = bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent';
                const hasBorder = border && border !== 'none' && strokeWidth > 0;

                // Captura apenas caixas gráficas reais (com fundo ou borda visível)
                if (hasBg || hasBorder) {
                  const divRect = div.getBoundingClientRect();
                  const w = divRect.width * scaleX;
                  const h = divRect.height * scaleY;

                  // Ignora o retângulo cheio que serve apenas como fundo redundante
                  const isFullSize = Math.abs(w - 1080) < 15 && Math.abs(h - 1350) < 15;
                  if (isFullSize && hasBg && rgbToHex(bgColor) === background) {
                    return;
                  }

                  if (w > 2 && h > 2) {
                    const x = (divRect.left - rect.left) * scaleX;
                    const y = (divRect.top - rect.top) * scaleY;

                    children.push({
                      id: `dom-shape-${index}-${divIdx}-${Date.now()}`,
                      type: 'figure',
                      x: Math.round(x),
                      y: Math.round(y),
                      width: Math.round(w),
                      height: Math.round(h),
                      fill: hasBg ? rgbToHex(bgColor) : 'transparent',
                      stroke: hasBorder ? rgbToHex(strokeColor) : undefined,
                      strokeWidth: hasBorder ? Math.round(strokeWidth * scaleX) : undefined,
                      cornerRadius: Math.round(borderRadius * scaleX),
                      opacity: opacity
                    });
                  }
                }
              });

              // 2. Extrair Imagens (Tags img)
              const imgs = slideDom.querySelectorAll('img');
              imgs.forEach((img, imgIdx) => {
                if (isUiControl(img)) return; // Ignora controles do Studio

                const imgRect = img.getBoundingClientRect();
                const x = (imgRect.left - rect.left) * scaleX;
                const y = (imgRect.top - rect.top) * scaleY;
                const w = imgRect.width * scaleX;
                const h = imgRect.height * scaleY;

                const style = window.getComputedStyle(img);
                const borderRadius = parseFloat(style.borderRadius) || 0;

                children.push({
                  id: `dom-img-${index}-${imgIdx}-${Date.now()}`,
                  type: 'image',
                  x: Math.round(x),
                  y: Math.round(y),
                  width: Math.round(w),
                  height: Math.round(h),
                  src: img.src,
                  cornerRadius: Math.round(borderRadius * scaleX)
                });
              });

              // Extrair Imagens de Fundo (Divs com background-image)
              divs.forEach((div, bgIdx) => {
                if (isUiControl(div)) return; // Ignora controles do Studio

                const style = window.getComputedStyle(div);
                const bgImg = style.backgroundImage;
                if (bgImg && bgImg !== 'none' && bgImg.startsWith('url')) {
                  const divRect = div.getBoundingClientRect();
                  const x = (divRect.left - rect.left) * scaleX;
                  const y = (divRect.top - rect.top) * scaleY;
                  const w = divRect.width * scaleX;
                  const h = divRect.height * scaleY;
                  const borderRadius = parseFloat(style.borderRadius) || 0;

                  // Evita duplicações
                  if (!children.some(child => child.type === 'image' && Math.abs(child.x - x) < 5 && Math.abs(child.y - y) < 5)) {
                    const match = bgImg.match(/^url\(["']?([^"']+)["']?\)$/);
                    const imgSrc = match ? match[1] : bgImg.slice(4, -1).replace(/"/g, "");

                    children.push({
                      id: `dom-bgimg-${index}-${bgIdx}-${Date.now()}`,
                      type: 'image',
                      x: Math.round(x),
                      y: Math.round(y),
                      width: Math.round(w),
                      height: Math.round(h),
                      src: imgSrc,
                      cornerRadius: Math.round(borderRadius * scaleX)
                    });
                  }
                }
              });

              // 3. Extrair Elementos de Texto (Sem fragmentar palavras/linhas e sem duplicar)
              const processedTextEl = new Set();
              
              // Primeiro, selecionamos todos os elementos editáveis reais
              const editables = Array.from(slideDom.querySelectorAll('[contenteditable]'));
              // Depois outros elementos textuais comuns que não são editáveis diretos
              const others = Array.from(slideDom.querySelectorAll('h1, h2, h3, h4, h5, p, span, li, a, .font-title, .font-text, .font-tag'));
              
              // Removemos referências duplicadas que estão presentes em ambas as listas
              const allTextNodes = Array.from(new Set([...editables, ...others]));

              allTextNodes.forEach((txt, txtIdx) => {
                if (isUiControl(txt)) return; // Ignora controles do Studio
                if (processedTextEl.has(txt)) return; // Evita reprocessar o mesmo elemento

                // Ignora elementos invisíveis ou com dimensões zeradas
                const style = window.getComputedStyle(txt);
                if (style.display === 'none' || style.visibility === 'hidden' || parseFloat(style.opacity) === 0) {
                  return;
                }

                const txtRect = txt.getBoundingClientRect();
                if (txtRect.width === 0 || txtRect.height === 0) {
                  return;
                }

                // Evita capturar elementos filhos de contêineres de texto que já processamos de forma consolidada
                let isDescendant = false;
                processedTextEl.forEach(parent => {
                  if (parent !== txt && parent.contains(txt)) {
                    isDescendant = true;
                  }
                });
                if (isDescendant) return;

                const textStr = txt.innerText || txt.textContent || '';
                const cleanText = textStr.trim().replace(/[\r\n]+/g, '\n');
                if (!cleanText) return;

                const x = (txtRect.left - rect.left) * scaleX;
                const y = (txtRect.top - rect.top) * scaleY;
                const w = txtRect.width * scaleX;

                const color = style.color;
                const fontSize = parseFloat(style.fontSize) || 16;
                const fontWeight = style.fontWeight;
                const fontStyle = style.fontStyle;
                const fontFamily = style.fontFamily;
                const textAlign = style.textAlign;
                const textTransform = style.textTransform;
                const lineHeight = style.lineHeight;

                let resolvedFamily = fontFamily.split(',')[0].replace(/['"]/g, '').trim();
                if (resolvedFamily.toLowerCase().includes('outfit')) resolvedFamily = 'Outfit';
                else if (resolvedFamily.toLowerCase().includes('playfair')) resolvedFamily = 'Playfair Display';
                else if (resolvedFamily.toLowerCase().includes('inter')) resolvedFamily = 'Inter';

                // Resolução precisa e de alta fidelidade do font-weight do CSS
                let resolvedWeight = 'normal';
                if (fontWeight) {
                  const parsedWeight = parseInt(fontWeight, 10);
                  if (!isNaN(parsedWeight)) {
                    resolvedWeight = parsedWeight.toString();
                  } else {
                    const weightStr = fontWeight.toString().toLowerCase();
                    if (weightStr === 'bold' || weightStr === 'bolder') resolvedWeight = 'bold';
                    else resolvedWeight = weightStr;
                  }
                }

                // Resolução do line-height relativo seguro (Konva exige multiplicador. Fallback a 1.15 se for fora do comum)
                let resolvedLineHeight = 1.15;
                if (lineHeight && lineHeight !== 'normal') {
                  const parsedLineHeight = parseFloat(lineHeight);
                  if (!isNaN(parsedLineHeight) && fontSize > 0) {
                    const ratio = parseFloat((parsedLineHeight / fontSize).toFixed(3));
                    if (ratio >= 0.8 && ratio <= 1.4) {
                      resolvedLineHeight = ratio; // Usa a proporção computada real caso esteja nos limites aceitáveis
                    }
                  }
                }

                // Se o texto for curto, de linha única e sem quebras explícitas, garantimos uma largura generosa mínima de 400px para que NUNCA quebre para a vertical
                let resolvedWidth = Math.round(w * 1.05 + 15);
                if (!cleanText.includes('\n') && cleanText.length < 50) {
                  resolvedWidth = Math.max(resolvedWidth, 400); 
                }

                children.push({
                  id: `dom-text-${index}-${txtIdx}-${Date.now()}`,
                  type: 'text',
                  x: Math.round(x),
                  y: Math.round(y),
                  width: resolvedWidth,
                  text: textTransform === 'uppercase' ? cleanText.toUpperCase() : cleanText,
                  fontSize: Math.round(fontSize * scaleX * 1.02),
                  fontFamily: resolvedFamily,
                  fontWeight: resolvedWeight,
                  fontStyle: fontStyle === 'italic' ? 'italic' : 'normal',
                  fill: rgbToHex(color),
                  align: textAlign || 'left',
                  lineHeight: resolvedLineHeight
                });

                processedTextEl.add(txt);
              });

              // 4. Extrair Elementos de SVG Inline (Ícones decorativos, aspas, selo verificado, etc.)
              const svgs = slideDom.querySelectorAll('svg');
              svgs.forEach((svg, svgIdx) => {
                if (isUiControl(svg)) return; // Ignora SVGs de controles da UI do Studio

                const svgRect = svg.getBoundingClientRect();
                const w = svgRect.width * scaleX;
                const h = svgRect.height * scaleY;

                if (w > 2 && h > 2) {
                  const x = (svgRect.left - rect.left) * scaleX;
                  const y = (svgRect.top - rect.top) * scaleY;

                  try {
                    const serializer = new XMLSerializer();
                    let svgString = serializer.serializeToString(svg);
                    if (!svgString.includes('http://www.w3.org/2000/svg')) {
                      svgString = svgString.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
                    }

                    const svgDataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);

                    children.push({
                      id: `dom-svg-${index}-${svgIdx}-${Date.now()}`,
                      type: 'image',
                      x: Math.round(x),
                      y: Math.round(y),
                      width: Math.round(w),
                      height: Math.round(h),
                      src: svgDataUrl
                    });
                  } catch (svgErr) {
                    console.warn('Erro ao serializar SVG inline:', svgErr);
                  }
                }
              });

            } catch (err) {
              console.warn('Falha ao usar DOM Parser dinâmico reativo, usando fallback:', err);
            }
          }

          // ───────── FLUXO B: FALLBACK ESTÁTICO POR CÓDIGO (SE O DOM NÃO ESTIVER DISPONÍVEL) ─────────
          if (children.length === 0) {
            const createText = (textString, field, fontSize, defaultX, defaultY, defaultWidth, defaultHeight, color = '#FFFFFF', weight = 'normal', align = 'left', style = {}) => {
              if (!textString) return null;
              const cleanText = textString.replace(/<[^>]*>/g, '');
              const pos = slide.positions?.[field] || {};
              return {
                id: `text-${field}-${index}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
                type: 'text',
                x: pos.x !== undefined ? pos.x : defaultX,
                y: pos.y !== undefined ? pos.y : defaultY,
                width: pos.width || defaultWidth,
                height: pos.height || defaultHeight,
                text: cleanText,
                fontSize: pos.fontSize || fontSize,
                fontFamily: field === 'titulo' || field === 'title' ? (titleFont || 'Outfit') : (textFont || 'Inter'),
                fontWeight: weight,
                fill: color,
                align: align,
                lineHeight: 1.2,
                ...style
              };
            };

            const layout = slide.layout || '';
            const coverVar = parseInt(slide.coverVariantIndex || 0, 10);
            const splitVar = parseInt(slide.splitVariantIndex || 0, 10);
            const comparisonVar = parseInt(slide.comparisonVariantIndex || 0, 10);
            const ctaVar = parseInt(slide.ctaVariantIndex || 0, 10);

            if (layout.startsWith('cover') || index === 0) {
              if (coverVar === 4 || coverVar === 0) {
                children.push({ id: `cover4-outer-bg-${index}`, type: 'figure', x: 0, y: 0, width: 1080, height: 1350, fill: '#E5E5E5' });
                children.push({ id: `cover4-inner-card-${index}`, type: 'figure', x: 16, y: 16, width: 1048, height: 1318, fill: '#000000', stroke: '#FFFFFF', strokeWidth: 12 });
                const imgUrl = slide.image || slide.imageUrl || '/thumbnails/Pagina%20inicio/TIAJOANABRIGADEIROS_slide_10%20(6).png';
                const imgPos = slide.positions?.['image'] || slide.positions?.['imagem'] || {};
                children.push({ id: `cover4-img-${index}`, type: 'image', x: imgPos.x !== undefined ? imgPos.x : 28, y: imgPos.y !== undefined ? imgPos.y : 28, width: imgPos.width || 1024, height: imgPos.height || 1294, src: imgUrl, opacity: 0.95 });
                children.push({ id: `cover4-overlay-${index}`, type: 'figure', x: 28, y: 28, width: 1024, height: 1294, fill: '#000000', opacity: 0.5 });
                children.push({ id: `cover4-badge-bg-${index}`, type: 'figure', x: 420, y: 120, width: 240, height: 45, fill: '#FFFFFF' });
                const badgeEl = createText(slide.tag || slide.badge_text || 'EDITORIAL', 'badge_text', 16, 420, 130, 240, 30, '#000000', '900', 'center');
                const titleEl = createText(slide.titulo || slide.title || 'Título da Capa', 'titulo', 60, 100, 680, 880, 260, '#FFFFFF', '900', 'center');
                const bodyEl = createText(slide.texto_apoio || slide.body_text || slide.desc || 'Subtítulo da capa', 'texto_apoio', 24, 140, 980, 800, 120, '#E4E4E7', 'normal', 'center', { fontStyle: 'italic', fontFamily: textFont || 'Playfair Display' });
                if (badgeEl) children.push(badgeEl);
                if (titleEl) children.push(titleEl);
                if (bodyEl) children.push(bodyEl);
              } else {
                const imgUrl = slide.image || slide.imageUrl || '/thumbnails/Pagina%20inicio/TIAJOANABRIGADEIROS_slide_10%20(6).png';
                const imgPos = slide.positions?.['image'] || slide.positions?.['imagem'] || {};
                children.push({ id: `cover1-img-${index}`, type: 'image', x: imgPos.x !== undefined ? imgPos.x : 0, y: imgPos.y !== undefined ? imgPos.y : 0, width: imgPos.width || 1080, height: imgPos.height || 750, src: imgUrl });
                children.push({ id: `cover1-rect-${index}`, type: 'figure', x: 0, y: 750, width: 1080, height: 600, fill: gradientColor1 || '#DE1E4D' });
                const badgeEl = createText(slide.tag || slide.badge_text || 'EDITORIAL EXCLUSIVO', 'badge_text', 20, 100, 80, 880, 40, '#FFFFFF', 'bold', 'left');
                const titleEl = createText(slide.titulo || slide.title || 'Título da Capa', 'titulo', 64, 100, 800, 880, 220, '#FFFFFF', '900', 'left');
                const bodyEl = createText(slide.texto_apoio || slide.body_text || slide.desc || 'Subtítulo da capa', 'texto_apoio', 28, 100, 1030, 880, 100, '#FFFFFF', 'normal', 'left', { opacity: 0.9 });
                const footerEl = createText(slide.social || slide.social_text || brandHandle || '@carrossel.studio', 'footer', 22, 100, 1180, 880, 40, '#FFFFFF', 'bold', 'left');
                if (badgeEl) children.push(badgeEl);
                if (titleEl) children.push(titleEl);
                if (bodyEl) children.push(bodyEl);
                if (footerEl) children.push(footerEl);
              }
            } else if (layout.startsWith('comparison')) {
              const titleEl = createText(slide.titulo || slide.title || 'Design Poluído vs. Design de Elite', 'titulo', 48, 80, 100, 920, 80, '#FFFFFF', '900', 'center');
              const subtitleEl = createText(slide.texto_apoio || slide.body_text || 'Descubra a diferença de impacto de carrosséis no feed', 'texto_apoio', 22, 80, 170, 920, 50, '#A1A1AA', 'normal', 'center');
              if (titleEl) children.push(titleEl);
              if (subtitleEl) children.push(subtitleEl);
              children.push({ id: `comp-card-wrong-${index}`, type: 'figure', x: 80, y: 280, width: 430, height: 800, fill: '#17171C', stroke: '#EF4444', strokeWidth: 2, cornerRadius: 24 });
              const wrongTitleEl = createText('Design Amador', 'wrong-title', 32, 120, 330, 350, 60, '#EF4444', '900', 'left');
              const wrongBodyEl = createText('❌ Excesso de textos e parágrafos colados.\n\n❌ Tipografias diferentes em cada slide.\n\n❌ Cores saturadas que geram cansaço visual.\n\n❌ Elementos desalinhados e margens zeradas.', 'wrong-body', 22, 120, 420, 350, 580, '#A1A1AA', 'normal', 'left');
              if (wrongTitleEl) children.push(wrongTitleEl);
              if (wrongBodyEl) children.push(wrongBodyEl);
              children.push({ id: `comp-card-right-${index}`, type: 'figure', x: 570, y: 280, width: 430, height: 800, fill: '#17171C', stroke: '#10B981', strokeWidth: 2, cornerRadius: 24 });
              const rightTitleEl = createText('Estilo Profissional', 'right-title', 32, 610, 330, 350, 60, '#10B981', '900', 'left');
              const rightBodyEl = createText('✓ Mensagem direta e parágrafos curtos.\n\n✓ Tipografia unificada e de leitura limpa.\n\n✓ Paleta cromática elegante (luxo/dark).\n\n✓ Alinhamento geométrico perfeito e respiros.', 'right-body', 22, 610, 420, 350, 580, '#E4E4E7', 'normal', 'left');
              if (rightTitleEl) children.push(rightTitleEl);
              if (rightBodyEl) children.push(rightBodyEl);
              const footerEl = createText(slide.social || slide.social_text || brandHandle || '@carrossel.studio', 'footer', 22, 80, 1190, 920, 40, gradientColor1 || '#DE1E4D', 'bold', 'center');
              if (footerEl) children.push(footerEl);
            } else if (layout.startsWith('showcase') || layout.startsWith('split-grid') || layout.startsWith('grid') || splitVar === 77) {
              if (splitVar === 77 || layout.startsWith('showcase')) {
                children.push({ id: `showcase77-bg-${index}`, type: 'figure', x: 0, y: 0, width: 1080, height: 1350, fill: '#FFFFFF' });
                const img1 = slide.image || slide.imageUrl || "https://i.etsystatic.com/20175028/r/il/18277f/3011567563/il_fullxfull.3011567563_2hoz.jpg";
                const img2 = slide.imageUrl2 || "https://truffle-assets.tastemadecontent.net/84cnzp0itw1q_4NzdqDzoWcA2OkSe8yiEgW_trufas-de-chocolate_landscapeThumbnail_pt.jpeg";
                const img3 = slide.imageUrl3 || "https://www.oetker.com.br/assets/recipes/assets/859bf909fb554fcca25fb90af3155117/1272x764/trufas-de-chocolate-com-leite-de-coco-e-avel.webp";
                const img4 = slide.imageUrl4 || "https://static.wixstatic.com/media/0d72ca_e9ed1f55b3ef46c1ae8a01652b9c762f~mv2_d_1365_2048_s_2.jpg/v1/fit/w_500,h_500,q_90/file.jpg";
                children.push({ id: `showcase77-img1-${index}`, type: 'image', x: 0, y: 0, width: 536, height: 380, src: img1 });
                children.push({ id: `showcase77-img2-${index}`, type: 'image', x: 544, y: 0, width: 536, height: 380, src: img2 });
                children.push({ id: `showcase77-img3-${index}`, type: 'image', x: 0, y: 850, width: 536, height: 380, src: img3 });
                children.push({ id: `showcase77-img4-${index}`, type: 'image', x: 544, y: 850, width: 536, height: 380, src: img4 });
                const subtitleEl = createText(slide.subtitulo || 'Bakery sale for a cause', 'subtitulo', 22, 80, 480, 920, 40, '#1A1A1A', 'normal', 'center');
                const titleEl = createText(slide.titulo || slide.title || 'CHARITY BAKES', 'titulo', 60, 80, 530, 920, 160, '#1A1A1A', '900', 'center');
                const bodyEl = createText(slide.texto_apoio || slide.body_text || slide.desc || 'City market, City center', 'texto_apoio', 22, 80, 720, 920, 40, '#1A1A1A', 'normal', 'center');
                if (subtitleEl) children.push(subtitleEl);
                if (titleEl) children.push(titleEl);
                if (bodyEl) children.push(bodyEl);
              } else {
                const tagEl = createText(slide.tag || slide.badge_text || 'PORTFÓLIO E GALERIA', 'tag', 20, 80, 100, 920, 40, '#F59E0B', 'bold', 'left');
                const titleEl = createText(slide.titulo || slide.title || 'Vitrine de Resultados', 'titulo', 48, 80, 150, 920, 80, '#FFFFFF', '900', 'left');
                if (tagEl) children.push(tagEl);
                if (titleEl) children.push(titleEl);
                const imgUrl = slide.image || slide.imageUrl || '/thumbnails/TIAJOANABRIGADEIROS_slide_1%20(5).png';
                const imgPos = slide.positions?.['image'] || slide.positions?.['imagem'] || {};
                children.push({ id: `showcase-card-${index}`, type: 'figure', x: imgPos.x !== undefined ? imgPos.x : 80, y: imgPos.y !== undefined ? imgPos.y : 260, width: imgPos.width || 920, height: imgPos.height || 620, fill: '#18181B', stroke: '#F59E0B', strokeWidth: 1, cornerRadius: 24 });
                children.push({ id: `showcase-img-${index}`, type: 'image', x: (imgPos.x !== undefined ? imgPos.x : 80) + 20, y: (imgPos.y !== undefined ? imgPos.y : 260) + 20, width: (imgPos.width || 920) - 40, height: (imgPos.height || 620) - 40, src: imgUrl, cornerRadius: 16 });
                children.push({ id: `showcase-badge-bg-${index}`, type: 'figure', x: (imgPos.x !== undefined ? imgPos.x : 80) + 60, y: (imgPos.y !== undefined ? imgPos.y : 260) + 60, width: 180, height: 50, fill: '#F59E0B', cornerRadius: 10 });
                children.push({ id: `showcase-badge-text-${index}`, type: 'text', x: (imgPos.x !== undefined ? imgPos.x : 80) + 60, y: (imgPos.y !== undefined ? imgPos.y : 260) + 72, width: 180, height: 30, text: 'DESTAQUE', fontSize: 18, fontFamily: 'Inter', fontWeight: 'bold', fill: '#000000', align: 'center' });
                const bodyEl = createText(slide.texto_apoio || slide.body_text || slide.desc || 'Descrição do showcase', 'texto_apoio', 28, 80, 940, 920, 140, '#A1A1AA', 'normal', 'center');
                if (bodyEl) children.push(bodyEl);
                const footerEl = createText(slide.social || slide.social_text || brandHandle || '@carrossel.studio', 'footer', 22, 80, 1190, 920, 40, gradientColor1 || '#DE1E4D', 'bold', 'center');
                if (footerEl) children.push(footerEl);
              }
            } else if (layout.startsWith('cta') || index === slides.length - 1) {
              if (ctaVar === 22 || ctaVar === 0) {
                children.push({ id: `cta22-left-bg-${index}`, type: 'figure', x: 0, y: 0, width: 1000, height: 1350, fill: gradientColor1 || '#DE1E4D' });
                children.push({ id: `cta22-right-bar-${index}`, type: 'figure', x: 1000, y: 0, width: 80, height: 1350, fill: '#000000', opacity: 0.15 });
                for (let i = 0; i < 4; i++) {
                  children.push({ id: `cta22-decor-dot-${index}-${i}`, type: 'figure', x: 1025, y: 200 + i * 150, width: 30, height: 30, fill: 'transparent', stroke: '#FFFFFF', strokeWidth: 2, opacity: 0.5 });
                }
                const titleEl = createText(slide.titulo || slide.title || 'QUER CRIAR CARROSSÉIS QUE VENDEM NO AUTOMÁTICO?', 'titulo', 46, 80, 300, 840, 300, '#FFFFFF', '900', 'left');
                const bodyEl = createText(slide.texto_apoio || slide.body_text || slide.desc || 'Destrave a sua biblioteca premium do Carrossel Studio hoje mesmo e crie designs refinados que transformam seguidores em clientes.', 'texto_apoio', 24, 80, 650, 840, 200, '#FFFFFF', 'normal', 'left', { opacity: 0.9 });
                const saveEl = createText('NÃO ESQUEÇA DE SALVAR', 'save_text', 14, 80, 1100, 840, 40, '#FFFFFF', 'bold', 'left', { opacity: 0.6 });
                if (titleEl) children.push(titleEl);
                if (bodyEl) children.push(bodyEl);
                if (saveEl) children.push(saveEl);
              } else {
                children.push({ id: `cta-stripe-${index}`, type: 'figure', x: 60, y: 180, width: 8, height: 980, fill: gradientColor1 || '#DE1E4D' });
                const tagEl = createText(slide.tag || slide.badge_text || 'ÚLTIMA OPORTUNIDADE', 'tag', 22, 120, 180, 840, 40, gradientColor1 || '#DE1E4D', 'bold', 'left');
                const titleEl = createText(slide.titulo || slide.title || 'Título da Ação', 'titulo', 58, 120, 240, 840, 240, '#FFFFFF', '900', 'left');
                const bodyEl = createText(slide.texto_apoio || slide.body_text || slide.desc || 'Texto persuasivo de fechamento', 'texto_apoio', 30, 120, 510, 840, 140, '#D4D4D8', 'normal', 'left');
                if (tagEl) children.push(tagEl);
                if (titleEl) children.push(titleEl);
                if (bodyEl) children.push(bodyEl);
                children.push({ id: `cta-btn-${index}`, type: 'figure', x: 120, y: 710, width: 460, height: 100, fill: gradientColor1 || '#DE1E4D', cornerRadius: 12 });
                children.push({ id: `cta-btn-txt-${index}`, type: 'text', x: 120, y: 745, width: 460, height: 40, text: 'DESTRAVAR ACESSO ➜', fontSize: 24, fontFamily: 'Inter', fontWeight: 'bold', fill: '#FFFFFF', align: 'center' });
                const footerEl = createText((slide.social || slide.social_text || brandHandle || '@carrossel.studio') + ' • Design Inteligente', 'footer', 24, 120, 1120, 840, 40, '#A1A1AA', 'bold', 'left');
                if (footerEl) children.push(footerEl);
              }
            } else {
              if (splitVar === 1 || layout.startsWith('content-split')) {
                const imgUrl = slide.image || slide.imageUrl || '/thumbnails/TIAJOANABRIGADEIROS_slide_1%20(7).png';
                const imgPos = slide.positions?.['image'] || slide.positions?.['imagem'] || {};
                children.push({ id: `split1-img-${index}`, type: 'image', x: imgPos.x !== undefined ? imgPos.x : 80, y: imgPos.y !== undefined ? imgPos.y : 160, width: imgPos.width || 920, height: imgPos.height || 350, src: imgUrl, cornerRadius: 32 });
                children.push({ id: `split1-line-${index}`, type: 'figure', x: 80, y: 560, width: 40, height: 3, fill: gradientColor1 || '#DE1E4D' });
                const tagEl = createText(slide.tag || slide.badge_text || 'PASSO 01 DE 05', 'tag', 14, 130, 550, 400, 40, gradientColor1 || '#DE1E4D', 'bold', 'left', { letterSpacing: 0.4 });
                const titleEl = createText(slide.titulo || slide.title || 'Domine a Regra do Respiro Visual', 'titulo', 44, 80, 600, 920, 140, '#FFFFFF', '900', 'left');
                const bodyEl = createText(slide.texto_apoio || slide.body_text || slide.desc || 'Espaço em branco não é espaço desperdiçado, é respiro. É o que permite aos olhos do leitor descansarem e focarem no que realmente importa.', 'texto_apoio', 24, 80, 760, 920, 420, '#A1A1AA', 'normal', 'left', { lineHeight: 1.5 });
                if (tagEl) children.push(tagEl);
                if (titleEl) children.push(titleEl);
                if (bodyEl) children.push(bodyEl);
                const footerEl = createText(slide.social || slide.social_text || brandHandle || '@carrossel.studio', 'footer', 22, 80, 1210, 400, 40, gradientColor1 || '#DE1E4D', 'bold', 'left');
                if (footerEl) children.push(footerEl);
              } else {
                const tagEl = createText(slide.tag || slide.badge_text || 'PASSO 01 DE 05', 'tag', 20, 80, 100, 500, 40, '#38BDF8', 'bold', 'left');
                const titleEl = createText(slide.titulo || slide.title || 'Título do Slide', 'titulo', 48, 80, 160, 500, 160, '#FFFFFF', '900', 'left');
                if (tagEl) children.push(tagEl);
                if (titleEl) children.push(titleEl);
                children.push({ id: `split-hr-${index}`, type: 'figure', x: 80, y: 340, width: 120, height: 3, fill: '#38BDF8', opacity: 0.8 });
                const bodyEl = createText(slide.texto_apoio || slide.body_text || slide.desc || 'Texto explicativo do slide', 'texto_apoio', 30, 80, 380, 500, 520, '#D4D4D8', 'normal', 'left');
                if (bodyEl) children.push(bodyEl);
                const imgUrl = slide.image || slide.imageUrl || '/thumbnails/TIAJOANABRIGADEIROS_slide_1%20(7).png';
                const imgPos = slide.positions?.['image'] || slide.positions?.['imagem'] || {};
                children.push({ id: `split-img-${index}`, type: 'image', x: imgPos.x !== undefined ? imgPos.x : 620, y: imgPos.y !== undefined ? imgPos.y : 180, width: imgPos.width || 380, height: imgPos.height || 900, src: imgUrl, cornerRadius: 24 });
                const footerEl = createText(slide.social || slide.social_text || brandHandle || '@carrossel.studio', 'footer', 22, 80, 1210, 400, 40, gradientColor1 || '#DE1E4D', 'bold', 'left');
                if (footerEl) children.push(footerEl);
              }
            }
          }

          return {
            id: `page-${index}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            background: background,
            children: children.filter(Boolean)
          };
        })
      };

      // Salva o snapshot convertido no localStorage para a ponte temporária
      localStorage.setItem('cs_canvas_temp_bridge', JSON.stringify(canvasJson));
      
      // Também adiciona na lista de projetos salvos do usuário para persistência
      const saved = localStorage.getItem('cs_canvas_projects');
      const savedProjects = saved ? JSON.parse(saved) : [];
      const newProject = {
        name: `Importado - ${slides.length} slides (${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })})`,
        date: new Date().toLocaleString('pt-BR'),
        json: canvasJson
      };
      
      localStorage.setItem('cs_canvas_projects', JSON.stringify([newProject, ...savedProjects]));

      // Redireciona a visualização para o Canvas avançado
      setView('canvas');
    } catch (err) {
      console.error('Falha ao exportar design do Studio para o Canvas:', err);
      alert('Houve um problema ao preparar a transição para o Canvas avançado.');
    }
  }, [slides, gradientColor1, brandHandle, titleFont, textFont, setView]);

  const dynamicStyles = {
    '--color-brand': gradientColor1,
    '--color-brand-glow': `${gradientColor1}40`,
    '--font-title': titleFont,
    '--font-text': textFont,
    '--font-tag': tagFont,
    '--font-header': headerFont,
    '--radius-slide': `${cardBorderRadius}px`,
    '--radius-inner': `${imageBorderRadius * 0.8}px`,
    '--radius-sm': `${imageBorderRadius * 0.6}px`,
  };

  return (
    <div
      className="h-screen bg-[#050505] text-[#FFFFFF] font-sans flex overflow-hidden relative"
      style={dynamicStyles}
    >
      {splashStep < 3 && <div className="fixed inset-0 z-[9998] bg-[#080808]" />}
      {splashStep === 1 && <SplashScreenIntro onFinished={() => setSplashStep(2)} />}
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
        ) : view === 'canvas' ? (
          <CanvasEditorPage 
            key="canvas"
            onBack={() => setView('studio')} 
            brandColor={gradientColor1} 
          />
        ) : (
          <SelectionContext.Provider value={selectedElements}>
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
                  onImagePositionX={handleImagePositionX}
                  onImageScale={handleImageScale}
                  onRemoveImage={handleRemoveImage}
                  titleFont={titleFont}
                  setTitleFont={setTitleFont}
                  textFont={textFont}
                  setTextFont={setTextFont}
                  tagFont={tagFont}
                  setTagFont={setTagFont}
                  headerFont={headerFont}
                  setHeaderFont={setHeaderFont}
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
                onClick={() => {
                  setSelectedElement(null);
                  setSelectedElements(new Set());
                }}
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
                      onEditInCanvas={handleEditInCanvas}
                    />

                    {viewMode === 'text' ? (
                      <TextEditor
                        slides={slides}
                        slideCount={slides.length}
                        brandColor={gradientColor1}
                        brandHandle={brandHandle}
                        showBrandHandle={showBrandHandle}
                        brandAvatar={brandAvatar}
                        brandLogo={brandLogo}
                        showBrandLogo={showBrandLogo}
                        isVerified={isVerified}
                        titleScale={titleSizeScale}
                        textScale={textSizeScale}
                        titleFont={titleFont}
                        textFont={textFont}
                        tagFont={tagFont}
                        showSlideCounter={showSlideCounter}
                        slideCounterPosition={slideCounterPosition}
                        onTextChange={handleSlideTextChange}
                        onImageUpload={handleImageUpload}
                        onImagePosition={handleImagePosition}
                        onImagePositionX={handleImagePositionX}
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
                        headerFont={headerFont}
                        showMetrics={showMetrics}
                        onActionStart={handleActionStart}
                        onTextChange={handleSlideTextChange}
                        onItemChange={handleSlideItemChange}
                        onImageUpload={handleImageUpload}
                        onImagePosition={handleImagePosition}
                        onImagePositionX={handleImagePositionX}
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
                        onSelectElement={(index, field) => {
                          const key = `${index}:${field}`;
                          if (isShiftHeldRef.current) {
                            // Shift+Click: toggle elemento na multi-seleção
                            setSelectedElements(prev => {
                              const next = new Set(prev);
                              if (next.has(key)) next.delete(key);
                              else next.add(key);
                              return next;
                            });
                            // Atualiza o elemento foco para o último clicado
                            setSelectedElement({ slideIndex: index, field });
                          } else {
                            // Click simples: seleciona só este elemento
                            setSelectedElement({ slideIndex: index, field });
                            setSelectedElements(new Set([key]));
                          }
                        }}
                        showSlideCounter={showSlideCounter}
                        slideCounterPosition={slideCounterPosition}
                      />
                    )}
                  </div>
                )}
              </main>
            </div>
          </div>
          </SelectionContext.Provider>
        )}
      </div>

      {/* AI Assistant Chat */}
      {view === 'studio' && <FloatingChat />}
    </div>
  );
}
