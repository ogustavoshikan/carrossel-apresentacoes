import React, { useState, useCallback } from 'react';
import { ChevronUp, ChevronDown, Cake } from 'lucide-react';
import { useDragResize } from './hooks/useDragResize';
import { generateCarouselContent, generateImageWithAI } from './services/ai';
import { exportAllToPNG, exportSlideToPNG } from './services/export';
import { copyToClipboard } from './lib/clipboard';
import { BRAND_DEFAULTS, SLIDE_COUNT_RANGE } from './lib/design-tokens';

// Componentes
import ConfigSidebar from './components/sidebar/ConfigSidebar';
import WorkspaceToolbar from './components/workspace/WorkspaceToolbar';
import VisualPreview from './components/workspace/VisualPreview';
import TextEditor from './components/workspace/TextEditor';
import { EmptyState, LoadingState } from './components/workspace/EmptyState';
import SettingsModal from './components/SettingsModal';

export default function App() {
  // ========================================
  // STATE
  // ========================================

  const [theme, setTheme] = useState('');
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

  // Brand Customization
  const [brandHandle, setBrandHandle] = useState(BRAND_DEFAULTS.handle);
  const [isVerified, setIsVerified] = useState(BRAND_DEFAULTS.isVerified);
  const [gradientColor1, setGradientColor1] = useState(BRAND_DEFAULTS.gradientColor1);
  const [titleSizeScale, setTitleSizeScale] = useState(100);
  const [textSizeScale, setTextSizeScale] = useState(100);
  const [cardBorderRadius, setCardBorderRadius] = useState(0);
  const [imageBorderRadius, setImageBorderRadius] = useState(40);
  const [isExporting, setIsExporting] = useState(false);
  const [titleFont, setTitleFont] = useState(BRAND_DEFAULTS.titleFont);
  const [textFont, setTextFont] = useState(BRAND_DEFAULTS.textFont);
  const [appLogoUrl, setAppLogoUrl] = useState(() => localStorage.getItem('alice_app_logo') || '');

  // Drag & Resize hook
  const { handleActionStart, resetSlidePositions } = useDragResize(slides, setSlides);

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
      // Re-indexar a propriedade \`slide\`
      return newSlides.map((s, idx) => ({ ...s, slide: idx + 1 }));
    });
    // Limpar o array selecionado para prevenir referências mortas
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

  const handleImagePosition = useCallback((index, value) => {
    setSlides((prev) => prev.map((s, i) => (i === index ? { ...s, imagePosition: value } : s)));
  }, []);

  const handleImageScale = useCallback((index, value) => {
    setSlides((prev) => prev.map((s, i) => (i === index ? { ...s, imageScale: value } : s)));
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
      const parsedSlides = await generateCarouselContent(theme, slideCount, textProvider, textModel, apiKey);
      setSlides(parsedSlides);
    } catch (err) {
      console.error(err);
      setError('Deu ruim na geração. Alice cansou, tente de novo.');
    } finally {
      setIsGenerating(false);
    }
  }, [theme, slideCount]);

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
      className="min-h-screen bg-surface-base text-zinc-100 font-sans flex flex-col overflow-hidden"
      style={dynamicStyles}
    >
      {/* Google Fonts (dinâmico — carrega as fontes selecionadas pelo usuário) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=${titleFont.replace(/ /g, '+')}:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,700;1,800&family=${textFont.replace(/ /g, '+')}:ital,wght@0,400;0,500;0,700;0,900;1,400;1,500;1,700&display=swap');
      `}</style>

      {/* NAVBAR */}
      <div className={`transition-all duration-300 ease-in-out origin-top border-b border-border-subtle bg-surface-card/80 backdrop-blur-3xl z-[100] relative flex flex-col ${isNavbarOpen ? 'h-20' : 'h-0 overflow-hidden border-transparent'}`}>
        <nav className="h-20 px-8 flex flex-wrap items-center justify-between shrink-0">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-outfit font-black text-base transition-transform group-hover:rotate-6 text-white overflow-hidden"
                style={appLogoUrl ? {} : {
                  backgroundColor: gradientColor1,
                  boxShadow: `0 0 20px ${gradientColor1}40`,
                }}
              >
                {appLogoUrl ? (
                  <img src={appLogoUrl} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <Cake className="w-5 h-5" />
                )}
              </div>
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

          <div className="flex items-center gap-6 mt-4 sm:mt-0">
          </div>
        </nav>
      </div>

      {/* NAVBAR TOGGLE BUTTON */}
      <button 
        onClick={() => setIsNavbarOpen(!isNavbarOpen)}
        className="absolute top-0 right-1/2 translate-x-1/2 lg:right-10 lg:translate-x-0 z-[110] bg-surface-card/90 border border-border-subtle border-t-0 rounded-b-xl px-4 py-1.5 text-zinc-500 hover:text-white transition-colors shadow-2xl backdrop-blur-md"
      >
        {isNavbarOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {/* MAIN LAYOUT */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Sidebar */}
        <ConfigSidebar
          brandHandle={brandHandle}
          setBrandHandle={setBrandHandle}
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
          slideCount={slideCount}
          setSlideCount={setSlideCount}
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
          titleFont={titleFont}
          setTitleFont={setTitleFont}
          textFont={textFont}
          setTextFont={setTextFont}
        />

        {/* Workspace */}
        <main 
          className="flex-1 bg-surface-primary relative flex flex-col p-4 md:p-8 overflow-y-auto overflow-x-hidden"
          onClick={() => setSelectedElement(null)}
        >
          <SettingsModal 
            isOpen={isSettingsOpen} 
            onClose={() => setIsSettingsOpen(false)} 
            brandColor={gradientColor1}
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
                  onCopySlide={handleCopySlide}
                  onExportSlide={handleExportSlide}
                  onResetPositions={resetSlidePositions}
                  onRemoveSlide={handleRemoveSlide}
                  onDuplicateSlide={handleDuplicateSlide}
                  onMoveSlide={handleMoveSlide}
                  copiedIndex={copiedIndex}
                  selectedElement={selectedElement}
                  isExporting={isExporting}
                  onSelectElement={(index, field) => setSelectedElement({ slideIndex: index, field })}
                />
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
