import React, { useState, useCallback } from 'react';
import { useDragResize } from './hooks/useDragResize';
import { generateCarouselContent, generateImageWithAI } from './services/ai';
import { exportAllToPNG } from './services/export';
import { copyToClipboard } from './lib/clipboard';
import { BRAND_DEFAULTS, SLIDE_COUNT_RANGE } from './lib/design-tokens';

// Componentes
import ConfigSidebar from './components/sidebar/ConfigSidebar';
import WorkspaceToolbar from './components/workspace/WorkspaceToolbar';
import VisualPreview from './components/workspace/VisualPreview';
import TextEditor from './components/workspace/TextEditor';
import { EmptyState, LoadingState } from './components/workspace/EmptyState';

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

  // Brand Customization
  const [brandHandle, setBrandHandle] = useState(BRAND_DEFAULTS.handle);
  const [isVerified, setIsVerified] = useState(BRAND_DEFAULTS.isVerified);
  const [gradientColor1, setGradientColor1] = useState(BRAND_DEFAULTS.gradientColor1);
  const [titleSizeScale, setTitleSizeScale] = useState(100);
  const [textSizeScale, setTextSizeScale] = useState(100);
  const [isExporting, setIsExporting] = useState(false);

  // Drag & Resize hook
  const { handleActionStart, resetSlidePositions } = useDragResize(slides, setSlides);

  // ========================================
  // CSS CUSTOM PROPERTIES (dinâmicas)
  // ========================================

  const dynamicStyles = {
    '--color-brand': gradientColor1,
    '--color-brand-glow': `${gradientColor1}40`,
    '--font-title': `'${BRAND_DEFAULTS.titleFont}', sans-serif`,
    '--font-text': `'${BRAND_DEFAULTS.textFont}', serif`,
  };

  // ========================================
  // HANDLERS
  // ========================================

  const handleSlideTextChange = useCallback((index, field, value) => {
    setSlides((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
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

  const handleGenerateImage = useCallback(
    async (index, prompt) => {
      setLoadingImages((prev) => ({ ...prev, [index]: true }));
      try {
        const apiKey = '';
        const imageUrl = await generateImageWithAI(prompt, apiKey);
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

    setIsGenerating(true);
    setError('');
    setSlides([]);

    try {
      const apiKey = '';
      const parsedSlides = await generateCarouselContent(theme, slideCount, apiKey);
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
      {/* Google Fonts (dinâmico) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=${BRAND_DEFAULTS.titleFont.replace(/ /g, '+')}:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,700;1,800&family=${BRAND_DEFAULTS.textFont.replace(/ /g, '+')}:ital,wght@0,400;0,500;0,700;0,900;1,400;1,500;1,700&display=swap');
      `}</style>

      {/* NAVBAR */}
      <nav className="h-20 border-b border-border-subtle bg-surface-card/80 backdrop-blur-3xl px-8 flex flex-wrap items-center justify-between z-[100] relative">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-outfit font-black text-base transition-transform group-hover:rotate-6 text-white"
              style={{
                backgroundColor: gradientColor1,
                boxShadow: `0 0 20px ${gradientColor1}40`,
              }}
            >
              A
            </div>
            <div className="flex flex-col">
              <span className="font-outfit font-black text-lg tracking-tighter leading-none uppercase text-white">
                Alice <span style={{ color: gradientColor1 }}>Studio</span>
              </span>
              <span className="text-[10px] font-bold text-zinc-500 tracking-[0.4em] mt-1 uppercase">
                v3.2 Final
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 mt-4 sm:mt-0">
          <div className="hidden lg:flex items-center gap-4 px-6 py-2 bg-white/5 rounded-full border border-border-hover">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            <span className="text-label-xs font-outfit text-white uppercase">
              Safe Zones Verified
            </span>
          </div>
        </div>
      </nav>

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
          theme={theme}
          setTheme={setTheme}
          slideCount={slideCount}
          setSlideCount={setSlideCount}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          error={error}
        />

        {/* Workspace */}
        <main className="flex-1 bg-surface-primary relative flex flex-col p-4 md:p-8 overflow-y-auto overflow-x-hidden">
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
                  onGenerateImage={handleGenerateImage}
                  loadingImages={loadingImages}
                />
              ) : (
                <VisualPreview
                  slides={slides}
                  slideCount={slideCount}
                  brandHandle={brandHandle}
                  brandColor={gradientColor1}
                  titleScale={titleSizeScale}
                  textScale={textSizeScale}
                  showMetrics={showMetrics}
                  onActionStart={handleActionStart}
                  onTextChange={handleSlideTextChange}
                  onItemChange={handleSlideItemChange}
                  onImageUpload={handleImageUpload}
                  onImagePosition={handleImagePosition}
                  onCopySlide={handleCopySlide}
                  onResetPositions={resetSlidePositions}
                  copiedIndex={copiedIndex}
                />
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
